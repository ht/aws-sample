<?php

	$dmid = 'reglogger';//$_GET["domain"];
	$region = 'sdb.ap-northeast-1.amazonaws.com';//$_GET["region"];

	$logtype = null;
	if(isset($_GET["logtype"])){
		//json形式のストリング
		$logtype =  $_GET["logtype"];
		
	}

	$appkeyid = null;
	if(isset($_GET["appkeyid"])){
		//json形式のストリング
		$appkeyid =  $_GET["appkeyid"];
		
	}

	$prefix = null;
	if(isset($_GET["prefix"])){
		//json形式のストリング
		$prefix =  $_GET["prefix"];
		
	}

	$commodityid = null;
	if(isset($_GET["commodityid"])){
		//json形式のストリング
		$commodityid =  $_GET["commodityid"];
		
	}

	$confirm = null;
	if(isset($_GET["confirm"])){
		//json形式のストリング
		$confirm =  $_GET["confirm"];
		
	}

		
	//$dmid = 'songs';


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

	$sdb = new AmazonSDB();
	$sdb->set_region($region);


	$dmitems = array();

	$rrows = array();
	
	
	$sql = "SELECT * FROM `{$dmid}` ";
	$sql = $sql.' where `logtype` !=""';
	if($logtype){
		$sql = $sql.' and `logtype` = "'.$logtype.'"';
	}
	if($appkeyid)	{
		$sql = $sql.' and `appkeyid` = "'.$appkeyid.'"';
	}
	if($prefix)	{
		$sql = $sql.' and `prefix` = "'.$prefix.'"';
	}
	if($commodityid)	{
		$sql = $sql.' and `commodityid` = "'.$commodityid.'"';
	}
	
	if($confirm==="true")	{
		$sql = $sql.' and `confirmflg` is null';
	}
	
	$sql = $sql." LIMIT 25";
	
//var_dump($sql);
	
	do
	{
		$attrs = ($next == null) ? null : array('NextToken' => $next);
		
		$results = $sdb->select($sql,$attrs);
		if($results->isOK())
		{
			// Get all of the <Item> nodes in the response
			$items = $results->body->Item();
			// Re-structure the data so access is easier (see helper function below)
			$data = reorganize_data($items);
			
			$rrows = array_merge($rrows, $data['rows']);
			//var_dump($rrows);

			
			//var_dump($results);
			
	        $next = (String) $results->body->SelectResult->NextToken;
	        //var_dump($next);


		
		}
	}while($next != null);
	
	if($rrows){

		echo json_encode(array(
		'success'=>true,
		'items'=>array('columns'=> $data['columns'],'rows'=>$rrows)
		)
		);
		
	}
	else
	{
		echo json_encode(array('success'=>true,
		'items'=>array(
					'columns' => array(),
					'rows' => array(),
					)
					));
	};

/*%******************************************************************************************%*/
// HELPER FUNCTIONS

	function reorganize_data($items)
	{
		// Collect rows and columns
		$rows = array();
		$columns = array();

		// Loop through each of the items
		foreach ($items as $item)
		{
			// Let's append to a new row
			$row = array();
			$row['id'] = (string) $item->Name;

			// Loop through the item's attributes
			foreach ($item->Attribute as $attribute)
			{
				// Store the column name
				$column_name = (string) $attribute->Name;

				// If it doesn't exist yet, create it.
				if (!isset($row[$column_name]))
				{
					$row[$column_name] = array();
				}

				// Append the new value to any existing values
				// (Remember: Entries can have multiple values)
				//$row[$column_name][] = (string) $attribute->Value;
				$row[$column_name] = (string) $attribute->Value;
				natcasesort($row[$column_name]);

				// If we've not yet collected this column name, add it.
				if (!in_array($column_name, $columns, true))
				{
					$columns[] = $column_name;
				}
			}

			// Append the row we created to the list of rows
			$rows[] = $row;
		}

		// Return both
		return array(
			'columns' => $columns,
			'rows' => $rows,
		);
	}


?>
