$(document).ready(function() {
  post("researcher.php", "", function(req) {
    var res = req.responseText;
    alert(res);
   var jsonObj = JSON.parse(res);
   jsonObj.studies.forEach(function(data) {
      var newRow = document.createElement("tr");
      var tdStudy = document.createElement("td");
      tdStudy.innerHTML = data.title;
      var tdTimeframe = document.createElement("td");
      tdTimeframe.innerHTML = data.startDate + " - " + data.endDate;
      var tdSubscribed = document.createElement("td");
      tdSubscribed.innerHTML = "0";     
      var tdInterested = document.createElement("td");
      tdInterested.innerHTML = "0";       
      newRow.appendChild(tdStudy);
      newRow.appendChild(tdTimeframe);
      newRow.appendChild(tdSubscribed);
      newRow.appendChild(tdInterested);
      $(".main-researcher>table")[0].appendChild(newRow);
   });
  });
});

/*
    post(url, params, fn)
    Input: location of resource, parameters to send, callback function
*/
function post(url, params, fn) {
  var req = new XMLHttpRequest();
  req.open("POST", url, true);

  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  req.onreadystatechange = function() {
    if(req.readyState === 4 && req.status === 200) {
      fn(req);
    }
  }
  req.send(params);
}