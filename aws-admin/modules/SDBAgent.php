<?php
require_once '../../awssdk4php/sdk.class.php';

//require_once("sdk.class.php");
//require_once("CommonException.php");

class SDBException extends Exception {
}


/**
 * SDBAgent クラス
 */
class SDBAgent {
	private $__sdb;
	private $__currentDomain;

	/**
	 * @constructor
	 */
	public function __construct($domain, $region=AmazonSDB::REGION_APAC_NE1, $config=null)
	{
		if ($config != null) {
			$this->__sdb = new AmazonSDB($config);
		} else {
			$this->__sdb = new AmazonSDB();
		}

		$this->setRegion($region);
		$this->useDomain($domain);
	}

	/**
	 * リージョンの変更
	 * @param {?} $region リージョン
	 */
	public function setRegion($region)
	{
		$this->__sdb->set_region($region);
	}

	/**
	 * ドメインの切り替え
	 */
	public function useDomain($domain)
	{
		$this->__currentDomain = $domain;
	}

	protected function _getdomainname()
	{
		return $this->__currentDomain;
	}
	
	/**
	 * put メソッドのエイリアス
	 * @param {string} $key
	 * @param {array} $val
	 * @param {boolean} $flag
	 */
	public function put($key, $val, $replace=true)
	{
		$res = $this->__sdb->create_domain($this->__currentDomain);

		if ($res->isOk()) {
			$res = $this->__sdb->put_attributes(
				$this->__currentDomain,
				$key, $val, $replace
			);
			
		}

		return $res->isOk();
	}

	/**
	 * アイテムの取得
	 * @param {string} $key
	 */
	public function get($key)
	{
		$res = $this->__sdb->get_attributes($this->__currentDomain, $key);
		if ($res->isOk()) {
			$ret = array();
			foreach ($res->body->GetAttributesResult->Attribute as $attr) {
				$ret[(string)$attr->Name] = (string)$attr->Value;
			}

			return $ret;
		} else {
			/**
			 * TODO throw Exception.
			 */
			return null;
		}
	}

	/**
	 * put メソッドのエイリアス
	 * @param {string} $key
	 * @param {array} $val
	 * @param {boolean} $flag
	 */
	public function insert($key, $val, $replace=true)
	{
		$this->put($key, $val, $replace);
	}
}



/**
 * SDBAgentLogger クラス
 */
class SDBAgentLogger extends SDBAgent {

	/**
	 * レベル値定数定義
	 */
	const DEBUG = 1;
	const INFO  = 2;
	const WARN  = 3;
	const ERROR = 4;
	const FATAL = 5;

	/**
	 * レベル値とラベルのマップ
	 */
	private $__levelMap = array(
		self::DEBUG => 'DEBUG',
		self::INFO  => 'INFO',
		self::WARN  => 'WARN',
		self::ERROR => 'ERROR',
		self::FATAL => 'FATAL'
	);

	private $__applicationId;
	private $__curritemId;

	public function __construct($appid, $domain, $region=AmazonSDB::REGION_APAC_NE1, $config=null)
	{
		parent::__construct($domain, $region, $config);
		$this->__applicationId = $appid;
	}

	protected function _logImpl($level, $assoc)
	{
	
	
		list($micro, $Unixtime) = explode(" ", microtime());
		$sec = $micro + date("s", $Unixtime); // 秒"s"とマイクロ秒を足す
		$ts = (string)date("Ymd g:i:", $Unixtime).$sec;

		$itemid = (string)time().$sec;
		
		$this->__curritemId = $itemid;
	
	
		$assoc['logtype'] = $this->__levelMap[$level];
		$assoc['timestamp'] = date(DATE_RFC822);
		$this->put($itemid, $assoc);
	}
	
	protected function _getitemid()
	{
		return $this->__curritemId;
	}
	
	
	public function DEBUG($assoc)
	{
		$this->_logImpl(self::DEBUG, $assoc);
	}

	public function INFO($assoc)
	{
		$this->_logImpl(self::INFO, $assoc);
	}

	public function WARN($assoc)
	{
		$this->_logImpl(self::WARN, $assoc);
	}

	public function ERROR($assoc)
	{
		$this->_logImpl(self::ERROR, $assoc);
	}

	public function FATAL($assoc)
	{
		$this->_logImpl(self::FATAL, $assoc);
	}
}


/**
 * GMOSDBAgentLogger クラス
 */
class GMOSDBAgentLogger extends SDBAgentLogger {

	const GMOBUCKET = 'gmologger';
	
	protected function _logImpl($level, $assoc)
	{
		parent::_logImpl($level, $assoc);
		
		$itemid = $this->_getitemid();
		$dmid = $this->_getdomainname();
		
		var_dump($level);
		
		if($level == SDBAgentLogger::ERROR){
			//S3へ登録
			$s3 = new AmazonS3();

			$bucketName = self::GMOBUCKET;
			
			$bucketList = $s3->listBuckets();
			$bucketfound = false;
			$uploadName = $dmid."_data_".$itemid.".json";

			foreach ($bucketList->body->Buckets->Bucket() as $bucketListName) {
				var_dump($bucketListName);
				echo $bucketListName->Name;
				
				if ($bucketListName->Name == $bucketName)	{
					$bucketfound = true;
					break;
				}
			}
			if (!$bucketfound) {
				//echo "s3 not found.";
				//throw exception
			

			}
	 
			if ($bucketfound) { // if bucket exists upload file
				// Put our file (also with public read access)
				if ($s3->create_object($bucketName,$uploadName,array(
						"body"        => $assoc['data'],  
						"acl"         => AmazonS3::ACL_AUTH_READ,
						"contentType" => "text/javascript",
						"curlopts"    => array(CURLOPT_SSL_VERIFYPEER => false))
						)
				) {
					$info = $s3->get_object($bucketName, $uploadName);
					//var_dump($info);
					
				} else {
					//throw exception
				}
			}

			
			$assoc['s3path'] = $bucketName.'::'.$uploadName;
		
		}
		
		var_dump($assoc);
		var_dump($itemid);
		

		$this->put($itemid, $assoc);
	}
	

}
