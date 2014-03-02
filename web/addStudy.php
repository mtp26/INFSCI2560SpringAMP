<?php
  $title = $_POST['title'];
  $shortInfo = $_POST['shortInfo'];
  $startDate = $_POST['startDate'];
  $endDate = $_POST['endDate'];
  $longInfo = $_POST['longInfo']; 
 
  $file = fopen("data.txt", "a");

  if(flock($file, LOCK_EX)) {
    fwrite($file, PHP_EOL.$title.PHP_EOL);
    fwrite($file, $shortInfo.PHP_EOL);
    fwrite($file, $startDate.PHP_EOL);
    fwrite($file, $endDate.PHP_EOL);
    fwrite($file, $longInfo);
    fflush($file);
    flock($file, LOCK_UN);
    print("Success");
  } else {
    print("Error:Unable To Open File");
  }


?>
