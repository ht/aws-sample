<?php

$ctltype = $_POST["CTLTYPE"];
$insid = $_POST["INSTANCEID"];

//$ctltype='StartInstance';
//$insid ='i-d2d314d1';

/*%******************************************************************************************%*/
// SETUP

// Enable full-blown error reporting. http://twitter.com/rasmus/status/7448448829
error_reporting(-1);

// Set HTML headers
header("Content-type: text/html; charset=utf-8");

// Include the SDK
require_once '../../awssdk4php/sdk.class.php';


/*%******************************************************************************************%*/
// THE GOALS & PREPARATION

/*
 1. The goal of this exercise is to retrieve a list of all image IDs that are prefixed with "aki-".
2. We should end up with an indexed array of string values (just the image IDs).
*/

// Instantiate the AmazonEC2 class

date_default_timezone_set("Asia/Tokyo");
$ec2 = new AmazonEC2(array("default_cache_config" => "c:\tmp"));
$ec2->set_region(AmazonEC2::REGION_APAC_NE1);

$response = null;

if($ctltype == 'StopInstance')
{
	$response = $ec2->stop_instances($insid);
};

if($ctltype == 'StartInstance')
{
	$response = $ec2->start_instances($insid);
};


if($ctltype == 'DisableAutoRun')
{
	$pathroot = 'c:/test/';
	if(file_exists($pathroot.$insid.'.txt')){
		unlink($pathroot.$insid.'.txt');
	}
	else{
		file_put_contents($pathroot.$insid.'.txt','false');
	}

	$response = true;
};




//print_r($response);

/*%******************************************************************************************%*/
// THE LONG WAY

if($response == null)
{
	echo json_encode(array('success'=>false,'items'=>null));
	
}
else
{
	echo json_encode(array('success'=>true,'items'=>true));
};



?>
