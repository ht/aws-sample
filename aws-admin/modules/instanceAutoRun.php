<?php

//$ctltype = $_POST["CTLTYPE"];
//$insid = $_POST["INSTANCEID"];

$ctltype='DisableAutoRunTest';
$insid ='i-d2d314d1';

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


if($ctltype == 'DisableAutoRunTest')
{

	$response = true;



	// Get the response from a call to the DescribeImages operation.
	$response = $ec2->describe_instances();

	//print_r($response);
	
/*%******************************************************************************************%*/
// THE LONG WAY

	$instances = array();

	// Loop through the response...
	foreach ($response->body->reservationSet->item as $item)
	{
		// Stringify the value
		$debug_val =  $item->instancesSet;
		foreach($item->instancesSet->item as $item2)
		{
			$tag_name = '';
			$tag_type = '';
			$tag_desc = '';
			$tag_st = '';
			$tag_ed = '';
			foreach ($item->instancesSet->item->tagSet->item as $tags)
			{
				if($tags->key == 'Name')
					$tag_name = (string)$tags->value;
				if($tags->key == 'Type')
					$tag_type = (string)$tags->value;
				if($tags->key == 'Desc')
					$tag_desc = (string)$tags->value;
				if($tags->key == 'St')
					$tag_st = (string)$tags->value;
				if($tags->key == 'Ed')
					$tag_ed = (string)$tags->value;

			}
			$autorun = (bool)file_exists('c:/test/'.(string)$item2->instanceId.'.txt');
			
			$state = (string)$item2->instanceState->name;
			if($state=='stopped') $state ='';
			array_push($instances,
				array('instanceId'=>(string)$item2->instanceId
				,'instanceState'=>$state
				,'placement'=>(string)$item2->placement->availabilityZone
				,'tag_name'=>$tag_name
				,'tag_type'=>$tag_type
				,'tag_desc'=>$tag_desc
				,'tag_st'=>$tag_st
				,'tag_ed'=>$tag_ed
				,'privateIp'=>(string)$item2->privateIpAddress
				,'cpu'=>(string)$item2->instanceType
				,'autorun'=>(string)!$autorun
				,'vpcId'=>(string)$item2->vpcId
				)
			);

			$pathroot = 'c:/test/';
			if(file_exists($pathroot.(string)$item2->instanceId.'.txt')){
				//do nothing
			}
			else{
				$nowtime = date('H:i');
			//echo $nowtime;
				if($tag_st=='' or $tag_st=='00:00'){
				}
				else{
			//echo $tag_st;
				
					if($tag_ed<>'' & ($nowtime<$tag_ed & $nowtime>$tag_st) & $state==''){
			//echo 'startins';
						$response = $ec2->start_instances((string)$item2->instanceId);
					
					}
				}
				
				if($tag_ed=='' or $tag_ed=='00:00'){
				}
				else{
				//$tag_ed = '01:00';
			//echo $tag_st;
			//echo $tag_ed;
			//echo $nowtime;
					if($tag_ed<$tag_st){
						//$nowtime = ('24' + substr($nowtime,1,2)).':'.substr($nowtime,3,2);
			//echo $nowtime;
						
					}
					if($tag_ed<>'' & !($nowtime>$tag_st & $nowtime<$tag_ed) & $state=='running'){
			//echo 'stopins';
						$response = $ec2->stop_instances((string)$item2->instanceId);
					
					}
				}
			

			}

		}

	}

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
