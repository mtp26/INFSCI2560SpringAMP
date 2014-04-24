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

  function runInsert($con, $query)
  {
    if($res = $con->query($query)) {
      $id = $con->insert_id;
      return $id;
    } else {
      return false;
    }
  }

  // Check to see if a participant exists
  function checkParticipant($con, $email) {
    $result = runQuery($con, "select participantId from Participant where email ='" . $email ."'");

    if ($result == false)
    {
      return false; 
    } else {
      return $result['participantId'];
    }
  }

  // Check to see if a participant is already participating in a study
  function checkParticipating($con, $partId, $studyId) {
    $result = runQuery($con, "select participantId from Participating where studyId =" . $studyId . " and participantId =" .$partId);
    
    if ($result == false)
    {
      return false; 
    } else {
      return true;
    }
  }

  // Add participant
  function addParticipant($con, $email, $fname, $lname) {
    runInsert($con, "insert into Participant(firstName, lastName, email) values ('".$fname."','".$lname."','".$email."');");
  }

  // Add participant link to study
  function addParticipating($con, $participantId, $studyId) {
    runInsert($con, "insert into Participating(participantId, studyId) values (".$participantId.",".$studyId.");");
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
  $researcherFullName = $_POST['researchername'];

  // Add contact information to message
  $message = $message."\n\nFrom: ".$fname." ".$lname." <".$emailFrom.">\n";

  // Set preformatted email subject so that the researcher can easily filter messages
  $subject = $studyId.": ".$studyTitle." -- From: ".$emailFrom;

  if ($interested == 1)
  {
    // Append interest to bottom of the message
    $message = $message."\n\nInterested in participating\n";

    if ($partId = checkParticipant($con, $emailFrom))
    {
      // Participant exists already exists
      if (!checkParticipating($con, $partId, $studyId))
      {
        // Participant does not exist in study
        addParticipating($con, $partId, $studyId);
      }
    } else {
      // Participant does not exist, insert contact information into database
      addParticipant($con, $emailFrom, $fname, $lname); 
      $partId = checkParticipant($con, $emailFrom);
      addParticipating($con, $partId, $studyId);
    }
  }

  // Send mail
  mail($emailTo, $subject, $message);
  echo "Thank you for contacting ".$researcherFullName;
  echo "<script>window.close();</script>";
?>
