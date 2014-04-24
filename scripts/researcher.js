$("html").hide();
post("researcher.php", "", function(req) {
    var res = req.responseText;
   var jsonObj = JSON.parse(res);
   if(jsonObj.redirect) {
     window.location = 'login.html';
   } 
   $("html").show();
});

$(document).ready(function() {
  $("html").show();
  post("researcher.php", "", function(req) {
    var res = req.responseText;
   var jsonObj = JSON.parse(res);
   var name = jsonObj.researcher.firstName + " " + jsonObj.researcher.lastName;
   $("#mainTitle").html("My Studies " + name);
   $("#logoutId").html(name + "(<a href='#' onclick='logout();'>Logout</a>)");
  
   jsonObj.data.studies.forEach(function(data) {
      var newRow = document.createElement("tr");
      var tdStudy = document.createElement("td");
      tdStudy.innerHTML = "<a href='web/EditStudy.html?id=" + data.studyId + "' onclick=\"return !window.open(this.href, 'Add/Edit Study', 'width=800,height=700')\" target='_blank'>" +data.title +"</a>";
      var tdTimeframe = document.createElement("td");
      tdTimeframe.innerHTML = data.startDate + "&mdash;" + data.endDate;
      var tdInterested = document.createElement("td");
      tdInterested.innerHTML = "<a href=\"web/UserList.html?id=" + data.studyId + "\" onclick=\"return !window.open(this.href, 'User List', 'width=200,height=300')\" target=\"_blank\">"+data.numParticipating+"</a>";     

      newRow.appendChild(tdStudy);
      newRow.appendChild(tdTimeframe);
      newRow.appendChild(tdInterested);
      $(".main-researcher>table")[0].appendChild(newRow);
   });
  });
});

function logout() {
  $.get("logout.php",null);
  window.location = "login.html";
}

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
