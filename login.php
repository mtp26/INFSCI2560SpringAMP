<?php
  session_start();
  $hs = "mysql.rosta-farzan.net";
  $un = "grp1";
  $pw = "d6q7pY";
  $db = "inf2560_g1";  
  
  $password = $_POST['password'];
  $email = $_POST['email'];

  $query = "select researcherId, email, password from Researcher where email='$email'";

  $con = new mysqli($hs, $un, $pw, $db);
  if($con->connect_errno > 0) {
    echo 'Cannot connect to database ['.$con->connect_error.']';
  } else {
    $res = $con->query($query);
    if(!$res) {
      echo 'generic:' . $con->error;
    } else {
      $numRows = $res->num_rows;
      if($numRows == 0) {
        echo 'email:Email does not exist, please re-enter or click Register';
      } else if($numRows == 1) {
        $row = $res->fetch_assoc();
        if($password == $row['password']) {
          echo 'pass';
          $_SESSION['rId'] = $row['researcherId'];
          $_SESSION['studies'] = getStudies($row['researcherId']);
        } else {
          echo 'password:Password incorrect, please re-enter and try again';
        }
      } else {
        echo 'generic:Data issue, please contact system administrator with error code AB23';
      }
    }
  }

  function getStudies($id) {
  $hs = "mysql.rosta-farzan.net";
  $un = "grp1";
  $pw = "d6q7pY";
  $db = "inf2560_g1";  
    $returnVal = "";
    $query = "select * from Study where ownerId = '$id'";
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
        $returnVal = "{\"studies\":$jsonRes}";
      }
    }
    return $returnVal;
  }

?>