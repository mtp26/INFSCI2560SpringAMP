<?php
header('Content-type:application/rss+xml');

$hs = "mysql.rosta-farzan.net";
$un = "grp1";
$pw = "d6q7pY";
$db = "inf2560_g1";  
$input = $_GET['studyId'];

$query = "SELECT * FROM Study,Researcher WHERE Study.ownerId = Researcher.researcherId and studyId = $input";

$con = new mysqli($hs, $un, $pw, $db);
if($con->connect_errno > 0) {
	echo 'Cannot connect to database ['.$con->connect_error.']';
} 
else {
	if(!$res = $con->query($query)) {
		echo 'Error running query [' . $con->error . ']';
	} 
	else {
		$i = 0;
		$studies = array();
		while($row = $res->fetch_assoc()) {
			$studies[$i]['studyId'] = $row['studyId'];
			$studies[$i]['title'] = $row['title'];
			$studies[$i]['studyLength'] = $row['length'];
			$studies[$i]['compensationAmount'] = $row['compensationAmount'];
			$studies[$i]['compensationType'] = $row['compensationType'];
			$studies[$i]['eligibility'] = stripSlashes($row['eligibility']);
			$studies[$i]['description'] = $row['description'];
			$studies[$i]['startDate'] = $row['startDate'];
			$studies[$i]['endDate'] = $row['endDate'];
			$studies[$i]['IBR'] = $row['ibr'];
			$studies[$i]['keywords'] = getKeywords($con, $row['studyId']);
			$studies[$i]['researcherId'] = $row['researcherId'];
			$studies[$i]['researcherFirstName'] = $row['firstName'];
			$studies[$i]['researcherLastName'] = $row['lastName'];
			$studies[$i]['researcherEmail'] = $row['email'];
			$studies[$i]['researcherPhone'] = $row['phoneNumber'];
			$studies[$i]['calPriv'] = $row['calPriv'];
			$studies[$i]['calPub'] = $row['calPub'];
			$i++;
		}
	}
	$jsonRes = json_encode($studies);
	print "{\"studies\":$jsonRes}";
}

	?>