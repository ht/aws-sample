<?php

//$dmid = $_POST["domain"];

$dmid = 'songs';

	ini_set( 'error_reporting', E_ERROR );	

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
//$sdb->set_region(AmazonSDB::REGION_APAC_NE1);

$dmitems = array();


	// Use a SELECT expression to query the data.
// Notice the use of backticks around the domain name.
$results = $sdb->select("SELECT * FROM `{$dmid}`");

// Get all of the <Item> nodes in the response
$items = $results->body->Item();



// Re-structure the data so access is easier (see helper function below)
$data = reorganize_data($items);

if($data){

	echo json_encode(array('success'=>true,'items'=>$data));
	
}
else
{
	echo json_encode(array('success'=>true,'items'=>$dmitems));
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
