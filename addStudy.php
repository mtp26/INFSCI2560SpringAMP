<?php
  
  $hs = "mysql.rosta-farzan.net";
  $un = "grp1";
  $pw = "d6q7pY";
  $db = "inf2560_g1";  
  
  $title = $_POST['title'];
  $length = $_POST['length'];
  $comp = $_POST['compensationAmount'];
  $type = $_POST['compensationType'];
  $elig = $_POST['eligibility'];
  $desc = $_POST['description'];
  $start = $_POST['startDate'];
  $end = $_POST['endDate'];
  $owner = $_POST['ownerId'];
  $ibr = $_POST['ibr'];

  $query = "insert into Study";
  $query .= " (title, length, compensationAmount, compensationType, eligibility, description, startDate, endDate, ownerId, ibr)";
  $query .= " values ('$title', '$length', '$comp', '$type','".addSlashes($elig)."', '$desc', date '$start', date '$end', $owner, '$ibr')";

  $con = new mysqli($hs, $un, $pw, $db);
  if($con->connect_errno > 0) {
    echo 'Cannot connect to database ['.$con->connect_error.']';
  } else {
    if(!$res = $con->query($query)) {
      echo 'Error running query [' . $con->error . ']';
    } else {
      echo Success;
    }
  }



?>