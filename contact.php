<?php
 
  // Setup database connection
  $hs = "mysql.rosta-farzan.net";
  $un = "grp1";
  $pw = "d6q7pY";
  $db = "inf2560_g1";  

  $con = new mysqli($hs, $un, $pw, $db);

  function runQuery($con, $query)
  {
    if($res = $con->query($query)) {
      $row = $res->fetch_assoc();
      return $row;
    } else {
      return false;
    }
  }

  // Check to see if a participant exists
  function checkParticipant($con, $email, $studyId) {
    $result = runQuery($con, "select * from Participant p, Participating pg where p.email ='" . $email ."' 
                              and studyId='" .$studyId. "' and p.participantId = pg.participantId");
    if ($result == false)
    {
      return false; 
    } else {
      return true;
    }
  }

  
  if (checkParticipant($con, 'test.com', 1))
  {
    // Participant exists already for this study, do nothing
    echo "Participant exists!";
  } else {
    // Participant does not exist, insert contact information into database
    echo "Participant does not exist";
  }

  $toAddress = "maxblaze@gmail.com";
  $subject = "test";
  $message = "Message";

  // Send mail
  // mail($toAddress, $subject, $message);
  //echo "Thank you for contacting us!";
?>
