<?php
  session_start();
  
  if(!isset($_POST['id'])) {
    if(!isset($_SESSION['rId'])) {
      header('Location: login.html');
    } else if(isset($_SESSION['studies'])) {
      print("{\"data\":".$_SESSION['studies']);
    } else {
      print("{\"data\":{\"studies\":{}}");
    }
      print(", \"researcher\":{");
      print("\"firstName\": \"".$_SESSION['firstName']."\",");
      print("\"lastName\": \"".$_SESSION['lastName']."\"");
      print("}}");
  }
?>