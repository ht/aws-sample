<?php

//$ctltype = $_POST["CTLTYPE"];
//$insid = $_POST["domain"];

/*%******************************************************************************************%*/
// SETUP

// Enable full-blown error reporting. http://twitter.com/rasmus/status/7448448829
//error_reporting(-1);
	ini_set( 'error_reporting', E_ERROR );	

// Set HTML headers
header("Content-type: text/html; charset=utf-8");

// Include the SDK
require_once '../../awssdk4php/sdk.class.php';

$regions = array();
/*

array_push($regions,array('regionname'=>'REGION_VIRGINIA','region'=>AmazonSDB::REGION_US_E1));
array_push($regions,array('regionname'=>'REGION_CALIFORNIA','region'=>AmazonSDB::REGION_US_W1));
array_push($regions,array('regionname'=>'REGION_OREGON','region'=>AmazonSDB::REGION_US_W2));
array_push($regions,array('regionname'=>'REGION_IRELAND','region'=>AmazonSDB::REGION_EU_W1));
array_push($regions,array('regionname'=>'REGION_SINGAPORE','region'=>AmazonSDB::REGION_APAC_SE1));
*/

$regions = array(
				array('regionname'=>'REGION_VIRGINIA','region'=>AmazonSDB::REGION_US_E1),
				array('regionname'=>'REGION_CALIFORNIA','region'=>AmazonSDB::REGION_US_W1),
				array('regionname'=>'REGION_OREGON','region'=>AmazonSDB::REGION_US_W2),
				array('regionname'=>'REGION_IRELAND','region'=>AmazonSDB::REGION_EU_W1),
				array('regionname'=>'REGION_SINGAPORE','region'=>AmazonSDB::REGION_APAC_SE1),
				array('regionname'=>'REGION_TOKYO','region'=>AmazonSDB::REGION_APAC_NE1),
				array('regionname'=>'REGION_SAO_PAULO','region'=>AmazonSDB::REGION_SA_E1),
				array('regionname'=>'REGION_SYDNY','region'=>'sdb.ap-southeast-2.amazonaws.com'),
				
			);

echo json_encode(array('success'=>true,'items'=>$regions));
	

?>
