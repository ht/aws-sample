<?php

//$dmid = $_POST["domain"];

//$dmid = 'songs';
//$uploadName = 'sample01_data_135452300020.830195.json';

//$uploadName = $_GET['errinfo'];
$s3path = $_GET['s3path'];

	ini_set( 'error_reporting', E_ERROR );	

/*%******************************************************************************************%*/
// SETUP

// Enable full-blown error reporting. http://twitter.com/rasmus/status/7448448829
//error_reporting(-1);

// Set HTML headers
header("Content-type: text/html; charset=utf-8");

	try
	{
		$uploadName = split("::",$s3path);
		$uploadName = $uploadName[1];
		
		$bucketName = split("::",$s3path);
		$bucketName = $bucketName[0];
		
		//$bucketName = 'gmologger';
		
//echo $bucketName;
//echo $uploadName;

		// Include the SDK
		require_once '../../awssdk4php/sdk.class.php';
		
		date_default_timezone_set("Asia/Tokyo");
		$s3 = new AmazonS3();

//gmologger::sample01_data_135452300020.830195.json

		
		$bucketList = $s3->listBuckets();
		$bucketfound = false;

		foreach ($bucketList->body->Buckets->Bucket() as $bucketListName) {
			//var_dump($bucketListName);
//			echo $bucketListName->Name;
			
			if ($bucketListName->Name == $bucketName)	{
				$bucketfound = true;
				break;
			}
		}

		if ($bucketfound) { // if bucket exists upload file
			$info = $s3->get_object($bucketName, $uploadName);
			//var_dump($info);
			if($info->status == 200){
				echo json_encode(array('success'=>true,'items'=>array(array('body'=>$info->body))
				));
			}
			else
			{
				echo json_encode(array('success'=>true,'items'=>array(array('body'=>"notfound"))
				));
			
			}
		}
		else{
			echo json_encode(array('success'=>true,'items'=>array(array('body'=>"notfound"))));
		
		}




	}
	catch (Exception $e) {
				
			echo json_encode(array('success'=>false,'items'=>array()));
				
				
	}

/*%******************************************************************************************%*/
// HELPER FUNCTIONS
		
?>
