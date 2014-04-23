<?php
  session_start();
  
    if(!isset($_SESSION['rId'])) {
      print("{\"redirect\":\"login.html\"}");
    } else if(isset($_SESSION['studies'])) {
      print("{\"data\":".$_SESSION['studies']);
      print(", \"researcher\":{");
      print("\"firstName\": \"".$_SESSION['firstName']."\",");
      print("\"lastName\": \"".$_SESSION['lastName']."\"");
      print("}}");
    } else {
      print("{\"data\":{\"studies\":{}}");
      print(", \"researcher\":{");
      print("\"firstName\": \"".$_SESSION['firstName']."\",");
      print("\"lastName\": \"".$_SESSION['lastName']."\"");
      print("}}");
    }
      
  
?>