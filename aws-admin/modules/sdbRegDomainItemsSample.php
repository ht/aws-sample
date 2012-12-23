<?php

//$dmid = $_POST["domain"];

$dmid = 'sample01';

//	ini_set( 'error_reporting', E_ERROR );	


$sampleitems='
{
"items":[{"commodityid":1,"prefix":test,"message":hoge,"data":datahoge1,
}
';
/*%******************************************************************************************%*/
// SETUP

// Enable full-blown error reporting. http://twitter.com/rasmus/status/7448448829
//error_reporting(-1);

// Set HTML headers
header("Content-type: text/html; charset=utf-8");

	try
	{

		// Include the SDK
		require_once '../../awssdk4php/sdk.class.php';


		date_default_timezone_set("Asia/Tokyo");
		$s3 = new AmazonS3();
		//$s3->set_region(Amazon::REGION_APAC_NE1);

		$sdb = new AmazonSDB(array("default_cache_config" => "c:\tmp"));
		//$sdb->set_region(AmazonSDB::REGION_APAC_NE1);

		$domain = $sdb->create_domain($dmid);

		if ($domain->isOK())
		{
			
			list($micro, $Unixtime) = explode(" ", microtime());
			$sec = $micro + date("s", $Unixtime); // •b"s"‚Æƒ}ƒCƒNƒ•b‚ð‘«‚·
			$ts = (string)date("Ymd g:i:", $Unixtime).$sec;

			$itemid = (string)time().$sec;

/*
S3‚É•Û‘¶
*/

			$bucketName = 'gmologger';
			
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
			

			}
	 
			if ($bucketfound) { // if bucket exists upload file
				// Put our file (also with public read access)
				if ($s3->create_object($bucketName,$uploadName,array(
						"body"        => "json_test_data",  
						"acl"         => AmazonS3::ACL_AUTH_READ,
						"contentType" => "text/javascript",
						"curlopts"    => array(CURLOPT_SSL_VERIFYPEER => false))
						)
				) {
				    //"test_json_data", $bucketName, $uploadName, AmazonS3::ACL_AUTH_READ)) {
					echo "S3::putObjectString(): Copy backup to {$bucketName}/".$uploadName."<p>\n";

					// Get object info
					$info = $s3->get_object($bucketName, $uploadName);
					//var_dump($info);
					
				} else {
					echo "S3::putObjectFile(): Failed to copy file\n";
				}
			}



			
			$item = 
					array(
						'commodityid'	=> 'Clothes',
						'prefix' 		=> 'abc',
						'logtype'		=> 'ERROR',
						'appkeyid'		=> 'Cathair Sweater',
						'message'		=> 'Siamese',
						'data'			=> $uploadName,
						'logtime'		=> $ts
					);
/*
				array(
					"{$itemid}" => array(
						'commodityid'	=> 'Clothes',
						'prefix' 		=> 'abc',
						'logtype'		=> 'ERROR',
						'appkeyid'		=> 'Cathair Sweater',
						'message'		=> 'Siamese',
						'data'			=> 'err_json_datas',
						'logtime'		=> $ts
					));
*/			
			// Add a batch of item-key-values to your domain
			$add_attributes = $sdb->put_attributes($dmid,(string)$itemid,$item);
			

		}


		if($item){



			echo json_encode(array('success'=>true,'items'=>$item));
			
		}
		else
		{
			echo json_encode(array('success'=>true,'items'=>array()));
		};



	}
	catch (Exception $e) {
			var_dump($e);
			echo json_encode(array('success'=>false,'items'=>array()));
				
				
	}

/*%******************************************************************************************%*/
// HELPER FUNCTIONS
		
?>
