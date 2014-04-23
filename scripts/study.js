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
  $(".length").html(study.studyLength/60);
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

  // Keyword parsing and display
  var keywordsStr = study.keywords.slice(0,-1);
  var keywords = study.keywords.split(":");
  $.each(keywords, function(ind, val) {
    var keyword = $('<a>').attr("href", "").append(val);
    $(".keywords").append(keyword);
    $(".keywords").append(" ");
  });

}

$(document).ready(function() {
  studyId = getURLParam("studyId");
  searchById(studyId, displayStudy);
});
