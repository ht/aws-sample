<?php

	$dmid = 'gmoreglogger';//$_GET["domain"];
	$region = 'sdb.ap-northeast-1.amazonaws.com';//$_GET["region"];
	

	$pass = null;
	if(isset($_POST["pass"])){
		//json形式のストリング
		$pass =  $_POST["pass"];
		
	}

	$resend = null;
	if(isset($_POST["resend"])){
		//json形式のストリング
		$resend =  $_POST["resend"];
		
	}
	
	if($resend==""){
		echo json_encode(array(
		'success'=>true,
		'items'=>"no json data")
		
		);
		exit;
	
	}

	if($pass!="1234"){
		echo json_encode(array(
		'success'=>true,
		'items'=>"not match password")
		
		);
		exit;
	
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


	date_default_timezone_set("Asia/Tokyo");

	$url = "http://10.250.2.100/gmoservice/relay_server/REG_C10000Sub.php";

	$ch=curl_init();
	curl_setopt ($ch,CURLOPT_URL,$url);
	curl_setopt ($ch,CURLOPT_POST,1);

	//postするデータ
	$post = array("json"=>$resend);
	//$post = array();
	
//var_dump($resend);
	curl_setopt ($ch,CURLOPT_POSTFIELDS,$post);
	curl_setopt ($ch,CURLOPT_SSL_VERIFYPEER,FALSE);
	curl_setopt ($ch,CURLOPT_RETURNTRANSFER, 1);

	$rsl = curl_exec($ch);
	curl_close ($ch);

	echo json_encode(array(
	'success'=>true,
	'items'=>$rsl)
	
	);

/*%******************************************************************************************%*/
// HELPER FUNCTIONS




?>
