$(document).ready(function() {
  $("#loginButton").click(function() {
    post("login.php", "email="+$("#loginEmail").val()+"&password="+$("#loginPassword").val(), function(req) {
      //alert(req.responseText);
      var res = req.responseText.split(":");
      if(res[0] == "pass") {
        window.location="researcher.html";
      } else {        
        $("#error").text(res);
      }
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