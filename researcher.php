<?php
  session_start();
  
  if(!isset($_POST['id'])) {
    if(!isset($_SESSION['rId'])) {
      header('Location: login.html');
    } else if(isset($_SESSION['studies'])) {
      print($_SESSION['studies']);
    } else {
      print("\"studies\":{}");
    }
  }
?>