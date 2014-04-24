<?php
  session_start();
  $hs = "mysql.rosta-farzan.net";
  $un = "grp1";
  $pw = "d6q7pY";
  $db = "inf2560_g1"; 

  $con = new mysqli($hs, $un, $pw, $db);
  $rId =& $_SESSION['rId'];
  $query = "SELECT * FROM Researcher WHERE Researcher.researcherId = $rId";
  
if ($res = $con->query($query)) {
	while ($row = $res->fetch_assoc()){
        print("{\"researcher\":{");
        print("\"firstName\": \"".$_SESSION['firstName']."\",");
        print("\"lastName\": \"".$_SESSION['lastName']."\"},");
		print("\"phone\": \"".$row['phone']."\",");		
		print("\"email\": \"".$row['email']."\"");
        print("}");
	}
}
      
  
?>