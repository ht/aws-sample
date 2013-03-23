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
error_reporting(-1);

// Set HTML headers
header("Content-type: text/html; charset=utf-8");

	try
	{
		require_once 'SDBAgent.php';

		// Include the SDK



		$sdb = new GMOSDBAgentLogger('app0001','sample01');
		$item = 
				array(
					'commodityid'	=> 'Clothes',
					'prefix' 		=> 'abc',
					'message'		=> 'Siamese',
					'data'			=> 'error_json_data'
				);
			

		var_dump($item);
		
		if($sdb->ERROR($item)){



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
