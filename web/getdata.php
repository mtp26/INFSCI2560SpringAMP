<?php
  
  $data = file("data.txt");
  $dataArray = array();
  $index = 0;
  foreach($data as $line) {   
    $dataArray[$index++] = trim($line);             
  }

  print("{\n");
  print("  \"studies\": [\n");
  for($i = 0; $i < count($dataArray); $i++) {
    print("  {\n");
    print("    \"title\": \"".$dataArray[$i++]."\",\n");
    print("    \"shortInfo\": \"".$dataArray[$i++]."\",\n");
    print("    \"startDate\": \"".$dataArray[$i++]."\",\n");
    print("    \"endDate\": \"".$dataArray[$i++]."\",\n");
    print("    \"longInfo\": \"".$dataArray[$i]."\"\n");
    if($i == count($dataArray)-1) {
      print("  }\n  ]\n");
    } else {
      print("  },\n");
    }
  }
  print("}");

?>
