<?php

//$dmid = $_POST["domain"];

$dmid = 'test';

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

		$sdb = new AmazonSDB();
		$sdb->set_region(AmazonSDB::REGION_APAC_NE1);

		$domain = $sdb->create_domain($dmid);

		if ($domain->isOK())
		{
			


			

			$i = 0;

			do
			{
				list($micro, $Unixtime) = explode(" ", microtime());
				$sec = $micro + date("s", $Unixtime); // •b"s"‚Æƒ}ƒCƒNƒ•b‚ğ‘«‚·
				$ts = (string)date("Ymd g:i:", $Unixtime).$sec;

				$itemid = (string)time().$sec;

				$item = 
						array(
							'commodityid'	=> 'Clothes',
							'prefix' 		=> 'abc',
							'logtype'		=> 'ERROR',
							'appkeyid'		=> 'Cathair Sweater',
							'message'		=> 'Siamese',
							'data'			=> null,
							'logtime'		=> $ts
						);

			
				// Add a batch of item-key-values to your domain
				$add_attributes = $sdb->put_attributes($dmid,(string)$itemid,$item);
				$i=$i+1;
			}while($i<100000);
			
			

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
