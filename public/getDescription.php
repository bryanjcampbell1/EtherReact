<?php

$servername = "descriptions.etherquiz.io";
$username = "snackman";
$password = "1Lessday!";
$dbname = "descriptions";
/*
$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "descriptions";
*/
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$g=  $_REQUEST["g"]; //gameNumber

$Step1;
$Step2;
$Step3;
$Step4;
$Step5;
$Step6;
$Step7;
$Step8;
$Step9;
$Step10;

$Description = array();

//get all from gameObject where id matches entry
$sql = "SELECT * FROM  `GameObject` WHERE `gameNumber` = '".$g."'";


 if(!$result = $conn->query($sql)){
    die('There was an error running the query [' . $conn->error . ']');
}

//determine how many pics were submitted
while($row = $result->fetch_assoc()){
  $Address  =  $row['winningWallet'] ;
	$Step1  =  $row['A_Text'] ;
	$Step2  =  $row['B_Text'] ;
	$Step3  =  $row['C_Text'] ;
	$Step4  =  $row['D_Text'] ;
	$Step5  =  $row['E_Text'] ;
	$Step6  =  $row['F_Text'] ;
	$Step7  =  $row['G_Text'] ;
	$Step8  =  $row['H_Text'] ;
	$Step9  =  $row['I_Text'] ;
	$Step10 =  $row['J_Text'] ;

	$Description  = array($Address,$Step1,$Step2,$Step3,$Step4,$Step5,$Step6,$Step7,$Step8,$Step9,$Step10);
	//$Description  = array("yo","yo","yo","yo","yo");
}

$jsonArray = json_encode($Description);

echo $jsonArray;

$conn->close();

?>
