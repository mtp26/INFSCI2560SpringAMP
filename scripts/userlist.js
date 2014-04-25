function getParticipants(id, func) {
   var jsonObj;
   var url = "getdatadb.php?type=participants&id="+id;
   get(url, function(req) {
      var res = req.responseText;
      jsonObj = JSON.parse(res);
      func(jsonObj);
   });
}

function displayParticipants(jsonObj)
{
  jsonObj.participants.forEach(function (participant) {
    $("#user_list").append($('<tr>').append('<td><a href="mailto:' + participant.email + '">' + participant.email + '</a></td>' + 
                             '<td>' + participant.firstName + " " + participant.lastName + '</td>'));
  });
}

$(document).ready(function() {
  studyId = getURLParam("studyId");
  getParticipants(studyId, displayParticipants);
});
