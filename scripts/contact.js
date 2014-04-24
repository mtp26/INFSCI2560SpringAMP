function displayContact(jsonObj)
{
  // Should only return one study per ID, but just to make sure
  var study = jsonObj.studies[0];

  $("#studytitle").val(study.title);
  $("#studyid").val(study.studyId);

  var researcherFullName = study.researcherFirstName + " " + study.researcherLastName;
  $(".researcher").html(researcherFullName);
  $(".researcherLastName").html(study.researcherLastName);

  // Populate hidden fields for researcher information
  $("#researcheremail").val(study.researcherEmail);
  $("#researchername").val(researcherFullName);

  // Default text for the message
  var messageText = "Dear " + researcherFullName + ",\n\nPlease send me more information about " + study.title + ".";
  $("#message").val(messageText);
}

$(document).ready(function() {
  studyId = getURLParam("studyId");
  searchById(studyId, displayContact);
});
