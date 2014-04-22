<?php

  $hs = "mysql.rosta-farzan.net";
  $un = "grp1";
  $pw = "d6q7pY";
  $db = "inf2560_g1";  
  
  $type = $_GET['type'];

  if('researcherEmail' == $type) {
    
    $con = new mysqli($hs, $un, $pw, $db);
    if($con->connect_errno > 0) {
      echo 'Cannot connect to database ['.$con->connect_error.']';
    } else {
      if(!$res = $con->query($query)) {
        echo 'Error running query [' . $con->error . ']';
      } else {
        $row = $res->fetch_assoc();
        echo $row['email'];
      }
    }



  } else if('studies' == $type) {

  $query = "select * from Study where";
  
  $start = $_GET['start'];
  $end = $_GET['end'];
  $keyword = $_GET['keyword'];
  $id = $_GET['id'];

  // Check if time range query selected
  if($start && $end) {
    $query = $query . " startDate <= date '$end' and endDate >= date '$start'";
  } else if($start) {
    $query = $query . " endDate >= date '$start'";
  } else if($end) {
    $query = $query . " startDate <= date '$end'";
  } else {
    // If not, return all studies that end after today
    $query = $query . ' endDate >= sysdate()';
  }
  
  // Perform secondary query on previous resultset to limit overhead of like
  if($keyword) {
    $query = "select * from ('.$query.') q where q.description like \'%".$keyword."%\'";
  }
  
  if($id) {
    $query = "select * from Study where studyId='$id'";
  }

  $con = new mysqli($hs, $un, $pw, $db);
  if($con->connect_errno > 0) {
    echo 'Cannot connect to database ['.$con->connect_error.']';
  } else {
    if(!$res = $con->query($query)) {
      echo 'Error running query [' . $con->error . ']';
    } else {
      $i = 0;
      $studies = array();
      while($row = $res->fetch_assoc()) {
        $studies[$i]['studyId'] = $row['studyId'];
        $studies[$i]['title'] = $row['title'];
        $studies[$i]['length'] = $row['length'];
        $studies[$i]['compensationAmount'] = $row['compensationAmount'];
        $studies[$i]['compensationType'] = $row['compensationType'];
        $studies[$i]['eligibility'] = stripSlashes($row['eligibility']);
        $studies[$i]['description'] = $row['description'];
        $studies[$i]['startDate'] = $row['startDate'];
        $studies[$i]['endDate'] = $row['endDate'];
        $studies[$i]['IBR'] = $row['ibr'];
        $i++;
      }
      $jsonRes = json_encode($studies);
      print "{\"studies\":$jsonRes}";
    }
  }
 }

?>