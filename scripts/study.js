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

function displayStudy(jsonObj)
{
  // Should only return one study per ID, but just to make sure
  var study = jsonObj.studies[0];

  // Need to calculate hours here
  $(".length").html(study.length);
  $(".compensationAmount").html(study.compensationAmount);
  $(".compensationType").html(study.compensationType);
  $(".title").html(study.title);
  $(".startDate").html(study.startDate);
  $(".endDate").html(study.startDate);
  $(".description").html(study.description);

  $(".pubCal").attr("href", study.calPub);

  $(".researcherFirstName").html(study.researcherFirstName);
  $(".researcherLastName").html(study.researcherLastName);

  $(".researcherEmail").attr("href", "mailto:" + study.researcherEmail);
  $(".researcherEmail").html(study.researcherEmail);
  $(".researcherPhone").html(study.researcherPhone);
}

$(document).ready(function() {
  studyId = getURLParam("studyId");
  searchById(studyId, displayStudy);
});
