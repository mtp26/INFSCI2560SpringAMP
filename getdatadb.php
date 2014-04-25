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

  } else if('participants' == $type) {
  
    // Get participants for a particular study
    $studyId = $_GET['id'];
    $query = "select * from Participant p, Participating pg where pg.studyId='$studyId' and p.participantId = pg.participantId";
    //$query = "select k.keyword from Keywords k, KeywordMatch km where km.studyId='$id' and km.keywordId = k.keywordId";
    $con = new mysqli($hs, $un, $pw, $db);
    if($con->connect_errno > 0) {
      echo 'Cannot connect to database ['.$con->connect_error.']';
    } else {
      if(!$res = $con->query($query)) {
        echo 'Error running query [' . $con->error . ']';
      } else {
        $i = 0;
        $participants = array();
        while($row = $res->fetch_assoc()) {
          $participants[$i]['firstName'] = $row['firstName'];
          $participants[$i]['lastName'] = $row['lastName'];
          $participants[$i]['email'] = $row['email'];
          $i++;
        }
        $jsonRes = json_encode($participants);
        print "{\"participants\":$jsonRes}";
      }
    }

  } else if('studies' == $type) {

  $query = "select * from Study,Researcher where Study.ownerId = Researcher.researcherId and ";
  
  $start = $_GET['start'];
  $end = $_GET['end'];
  $keyword = $_GET['keyword'];
  $compType = $_GET['compType'];
  $compMin = $_GET['compMin'];
  $compMax = $_GET['compMax'];
  $lenMin = $_GET['lenMin'];
  $lenMax = $_GET['lenMax'];
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
  
  if($compMin) {
    $query .= " and compensationAmount >= $compMin";
  }

  if($compMax) {
    $query .= " and compensationAmount <= $compMax";
  }

  if($compType) {
    $query .= " and compensationType = '$compType'";
  }
 
  if($lenMin) {
    $query .= " and length >= $lenMin";
  }

  if($lenMax) {
    $query .= " and length <= $lenMax";
  }
  
  // Perform secondary query on previous resultset to limit overhead of like
  if($keyword) {
    $query = "select * from ($query) q where q.description like '%$keyword%' or q.title like '%$keyword%' or q.studyId in (select studyId from KeywordMatch, Keywords where KeywordMatch.keywordId = Keywords.keywordId and keyword = '$keyword')";
  }
  if($id) {
    $query = "select * from Study, Researcher where studyId = '$id' and Study.ownerId = Researcher.researcherId";
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
        $studies[$i]['calPriv'] = $row['CalPriv'];
        $studies[$i]['calPub'] = $row['calPub'];
        $i++;
      }
      $jsonRes = json_encode($studies);
      print "{\"studies\":$jsonRes}";
    }
  }
 }

function getKeywords($con, $id) {
  $keywords = "";
  $query = "select k.keyword from Keywords k, KeywordMatch km where km.studyId='$id' and km.keywordId = k.keywordId";
  if($res = $con->query($query)) {
    while($row = $res->fetch_assoc()) {
      $keywords .=$row['keyword'].":";
    }
  }
  return $keywords;
  }


?>
