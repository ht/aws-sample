<?php

	$type = null;
	if(isset($_GET["type"])){
		//json形式のストリング
		$type=$_GET["type"];
	}
	


/*%******************************************************************************************%*/
// SETUP

	// Enable full-blown error reporting. http://twitter.com/rasmus/status/7448448829
	
	ini_set( 'error_reporting', E_ERROR );	
	//error_reporting(-1);

	// Set HTML headers
	header("Content-type: text/html; charset=utf-8");

	// Include the SDK
	require_once '../../awssdk4php/sdk.class.php';

	$srch = array();

	if($type=='prefix'){
	
		$srch  = array(
				array("vinfo"=>'WMX',"val"=>'WMX'),
				array("vinfo"=>'LTE',"val"=>'LTE'),
				array("vinfo"=>'GLTETEL',"val"=>'GLTETEL'),
				array("vinfo"=>'GLTEKZN',"val"=>'GLTEKZN'),
				array("vinfo"=>'GLTEWEB',"val"=>'GLTEWEB')
				);

	}	
	if($type=='appkeyid'){
	
		$srch  = array(
				array("vinfo"=>'GMO連携',"val"=>'gmoservice'),
				array("vinfo"=>'DB連携',"val"=>'relayserver'),
				array("vinfo"=>'GMOリレー',"val"=>'gmorelay')
				);

	}

	if($type=='commodityid'){
	
		$srch  = array(
					array("vinfo"=>'LTE',"val"=>'43'),
					array("vinfo"=>'WMX',"val"=>'29')
				);

	}


	if($type=='logtype'){
	
		$srch  = array(
					array("vinfo"=>'ERROR',"val"=>'ERROR'),
					array("vinfo"=>'FATAL',"val"=>'FATAL'),
					array("vinfo"=>'INFO',"val"=>'INFO'),
					array("vinfo"=>'WARN',"val"=>'WARN'),
					array("vinfo"=>'DEBUG',"val"=>'DEBUG')
				);

	}
	

	date_default_timezone_set("Asia/Tokyo");
	echo json_encode(array(
						'success'=>true,
						'items'=>$srch
						)
	);

/*%******************************************************************************************%*/
// HELPER FUNCTIONS



?>
