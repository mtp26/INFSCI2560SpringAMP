function displayContact(jsonObj)
{
  // Should only return one study per ID, but just to make sure
  var study = jsonObj.studies[0];

  $("#studytitle").val(study.title);
  $("#studyid").val(study.studyId);

  var researcherFullName = study.researcherFirstName + " " + study.researcherLastName;
  $(".researcher").html(researcherFullName);
  $(".researcherLastName").html(study.researcherLastName);

  $("#researcheremail").val(study.researcherEmail);

  // Default text for the message
  var messageText = "Dear " + researcherFullName + ",\n\nPlease send me more information about " + study.title + ".";
  $("#message").val(messageText);
}

$(document).ready(function() {
  studyId = getURLParam("studyId");
  searchById(studyId, displayContact);
});
