function displayStudy(jsonObj)
{
  // Should only return one study per ID, but just to make sure
  var study = jsonObj.studies[0];

  $(".length").html(study.studyLength);
  $(".compensationAmount").html(study.compensationAmount);
  $(".compensationType").html(study.compensationType);
  $(".title").html(study.title);
  $(".startDate").html(study.startDate);
  $(".endDate").html(study.endDate);
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
    var keyword = $('<span>').append(val);
    // The keywords on this page will not be clickable 
    $(".keywords").append(keyword);
    $(".keywords").append(" ");
  });

  // Eligibility parsing
  eligibility = jQuery.parseJSON(study.eligibility);
  $(".eligibility").html(eligibility.Elig_Other);
}

$(document).ready(function() {
  studyId = getURLParam("studyId");
  searchById(studyId, displayStudy);
});
