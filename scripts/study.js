function getURLParam(inparam)
{
  var url = window.location.search.substring(1);
  var urlVars = url.split('&');
  for (var i = 0; i < urlVars.length; ++i) 
  {
    var param = urlVars[i].split('=');
    if (param[0] === inparam) 
    {
      return param[1];
    }
  }
}

//var studyTitle = document.getElementById("title");
//testp.innerHTML = getURLParam("test2");
//testp.innerHTML = window.location.search.substring(1);

function displayStudy(jsonObj)
{
  $(".title").html(jsonObj);
}

$(document).ready(function() {
  studyId = getURLParam("studyId");
  searchById(studyId, displayStudy);
});
