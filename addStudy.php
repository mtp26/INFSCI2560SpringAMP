<?php
  session_start();
  $hs = "mysql.rosta-farzan.net";
  $un = "grp1";
  $pw = "d6q7pY";
  $db = "inf2560_g1";  
  
  $title = $_POST['title'];
  $length = $_POST['length'];
  $comp = $_POST['compAmount'];
  $type = $_POST['compType'];
  $elig = $_POST['elig'];
  $desc = $_POST['desc'];
  $start = $_POST['startDate'];
  $end = $_POST['endDate'];
  $owner = $_SESSION['rId'];
  $ibr = $_POST['ibr'];
  $pubCal = $_POST['pubCal'];
  $privCal = $_POST['privCal'];
  $keywords = $_POST['keywords'];
  $qtype = $_POST['qtype'];

  if($qtype == "add") {
    $query = "insert into Study";
    $query .= " (title, length, compensationAmount, compensationType, eligibility, description, startDate, endDate, ownerId, ibr, calPub, calPriv)";
    $query .= " values ('$title', '$length', '$comp', '$type','$elig', '$desc', date '$start', date '$end', '$owner', '$ibr', '$pubCal', '$privCal')";
  } else {
    $id=$_POST['id'];
    $query = "update Study set title='$title', length='$length', compensationAmount='$comp', compensationType='$type', eligibility='$elig', description='$desc', startDate='$start', endDate='$end', ibr='$ibr', calPub='$pubCal', calPriv='$privCal' where studyId = $id";
  }
  $con = new mysqli($hs, $un, $pw, $db);
  if($con->connect_errno > 0) {
    echo 'Cannot connect to database ['.$con->connect_error.']';
  } else {
    if(!$res = $con->query($query)) {
      echo 'Error running query [' . $con->error . ']';
    } else {
      insertKeywords($con->insert_id, $keywords, $con);
      print("Success:"+$con->insert_id);
    }
  }

function insertKeywords($id, $keywordList, $con) {
  $keyArr = explode(",", $keywordList);
  foreach($keyArr as $key) {
    
    preg_replace("/[^A-Za-z]/", '', $key);
    $key = strtolower($key);
    $kid = '';
    $query = "select keywordId from Keywords where keyword='$key'";
    $res = $con->query($query);
    if($res->num_rows > 0) {
      $row = $res->fetch_assoc();
      $kid = $row['keywordId'];
    } else {
      $query = "insert into Keywords (keyword) values ('$key')";
      if($con->query($query)) {
        $kid = $con->insert_id;
      }
    }
    
    if($kid != '') {
      $query = "insert into KeywordMatch (studyId, keywordId) values ($id, $kid)";
      $con->query($query);
      // Assuming these all work, ignoring failures for now.  Logging would be required for this level.
    }
  }
}

?>