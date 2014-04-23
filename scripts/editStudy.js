$(document).ready(function() {
  $("#studySubmit").click(function() {
   // var id = $("input#studyId").val();
    var title = $("input#title_input").val();
    var startDate = $("input#start_date_input").val();
    var endDate = $("input#end_date_input").val();
    var length = $("input#session_length_input").val();
    var pubCal = $("input#public_cal").val();
    var privCal = $("input#private_cal").val();
    var irb = $("input#irb_input").val();
    var payType = $("input#pay_type").val();
    var payAmt = $("input#pay_value_input").val();
    var keywords = $("input#keywords_input").val();
    var desc = $("input#description_input").val();
    var age_elig = "\"age_elig\":\"" + $("input[name=age_elig]:checked").map(
      function() {return this.value;}).get().join("," ) + "\"";
    var gender_elig = "\"gender_elig\":\"" + $("input[name=gender_elig]:checked").map(
      function() {return this.value;}).get().join("," ) + "\"";
    var lang_elig = "\"lang_elig\":\"" + $("input[name=lang_elig]:checked").map(
      function() {return this.value;}).get().join("," ) + "\"";
    var vision_elig = "\"vision_elig\":\"" + $("input[name=vision_elig]:checked").map(
      function() {return this.value;}).get().join("," ) + "\"";
    var education_elig = "\"education_elig\":\"" + $("input[name=education_elig]:checked").map(
      function() {return this.value;}).get().join("," ) + "\"";
    var experience_elig = "\"experience_elig\":\"" + $("input[name=experience_elig]:checked").map(
      function() {return this.value;}).get().join("," ) + "\"";
    var cit_elig = "\"cit_elig\":\"" + $("input[name=cit_elig]:checked").map(
      function() {return this.value;}).get().join("," ) + "\"";
    var other_elig = "\"other_elig\":\"" + $("input[name=gender_elig]").val() + "\"";

    var eligibility = "{\"eligibility\":{" + age_elig + "," + gender_elig + "," + lang_elig + "," +
      vision_elig + "," + education_elig + "," + experience_elig + "," + cit_elig + "," + other_elig + "}}";
    window.close();
   // alert(id);
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