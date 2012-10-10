<?php
	$pass = '1235325';
	
		session_start();
	
	$ret = array();
	if (isset($_SESSION['pass']) && $_SESSION['pass'] == $pass) {
		echo '1';
	} else {
		//$_SESSION['pass'] = $pass;
		echo '0';
	}
?>
