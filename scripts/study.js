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
  $.each(jsonObj.studies, function(i, item)
  {
    // Need to calculate hours here
    $(".length").html(item.length);
    $(".compensationAmount").html(item.compensationAmount);
    $(".compensationType").html(item.compensationType);
    $(".title").html(item.title);
    $(".startDate").html(item.startDate);
    $(".endDate").html(item.startDate);
    $(".description").html(item.description);
  });
}

$(document).ready(function() {
  studyId = getURLParam("studyId");
  searchById(studyId, displayStudy);
});
