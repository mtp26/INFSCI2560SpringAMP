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

  // Get POST values
  $fname = $_POST['fname'];
  $lname = $_POST['lname'];
  $message = $_POST['message'];
  $studyId =  $_POST['studyid'];
  $studyTitle =  $_POST['studytitle'];
  $emailFrom  = $_POST['email'];
  $interested = $_POST['interested'];
  $emailTo = $_POST['researcheremail'];

  echo $emailTo;

  // Add contact information to message
  $message."\n\nFrom: ".$emailFrom."\n";

  // Set preformatted email subject so that the researcher can easily filter messages
  $subject = $studyId.": ".$studyTitle." -- From: ".$emailFrom;

  
  if ($interested == 1)
  {
    $message = $message."\n\nInterested in participating\n";

    if (checkParticipant($con, $emailFrom, 1))
    {
      // Participant exists already for this study, do nothing
      echo "Participant exists!";
    } else {
      // Participant does not exist, insert contact information into database
      echo "Participant does not exist";
    }
  }

  // Send mail
  //mail($emailTo, $subject, $message);
  //echo "Thank you for contacting us!";
?>
