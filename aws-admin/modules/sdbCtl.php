<?php

//$ctltype = $_POST["CTLTYPE"];
//$insid = $_POST["domain"];

/*%******************************************************************************************%*/
// SETUP

// Enable full-blown error reporting. http://twitter.com/rasmus/status/7448448829
//error_reporting(-1);

// Set HTML headers
header("Content-type: text/html; charset=utf-8");

// Include the SDK
require_once '../../awssdk4php/sdk.class.php';


date_default_timezone_set("Asia/Tokyo");

$sdb = new AmazonSDB(array("default_cache_config" => "c:\tmp"));
$sdb->set_region(AmazonSDB::REGION_APAC_NE1);

$domains = array();

//$domainList = $sdb->get_dmain_list();

$domainList = $sdb->list_domains();
if ($domainList) {


	foreach ($domainList->body->DomainName() as $domainName) {
		
		//var_dump($domainName->value);
		
		$rest = $sdb->domainMetadata($domainName); // returns an array with names
		
		//echo((string)$domainName);
		//echo((string)$rest->body->DomainMetadataResult->ItemCount);
		//var_dump($rest);



		$tm = (string)$rest->body->DomainMetadataResult->Timestamp;
		
		array_push($domains,
			array('domain'=>(string)$domainName
			,'itemcount'=>(string)$rest->body->DomainMetadataResult->ItemCount
			,'itemnamessizebytes'=>(string)$rest->body->DomainMetadataResult->ItemNamesSizeBytes
			,'timestamp'=>(string)date("M j,Y g:iA",$tm)
			)

		);
	}

	echo json_encode(array('success'=>true,'items'=>$domains));
	
}
else
{
	echo json_encode(array('success'=>false,'items'=>$domains));
};



?>
