<?php



ini_set( 'error_reporting', E_ERROR );	


/*%******************************************************************************************%*/
// SETUP

// Enable full-blown error reporting. http://twitter.com/rasmus/status/7448448829
//error_reporting(-1);

// Set HTML headers
header("Content-type: text/html; charset=utf-8");

	try
	{

		$op = $_POST["op"];
		$dmid = $_POST["domain"];
		$region = $_POST["region"];

		// Include the SDK
		require_once '../../awssdk4php/sdk.class.php';

		$sdb = new AmazonSDB();
		$sdb->set_region($region);
		$domain = null;
		$rslt = null;
		if($op=='CreateDomain')
		{
			$domain = $sdb->create_domain($dmid);
			$rslt = 'created';
		}

		if($op=='DeleteDomain')
		{
			$domain = $sdb->delete_domain($dmid);
			$rslt = 'deleted';
		}


		if($domain){



			echo json_encode(array('success'=>true,'items'=>$rslt));
			
		}
		else
		{
			echo json_encode(array('success'=>true,'items'=>$rslt));
		};



	}
	catch (Exception $e) {
			var_dump($e);
			echo json_encode(array('success'=>false,'items'=>false));
				
				
	}

/*%******************************************************************************************%*/
// HELPER FUNCTIONS
		
?>
