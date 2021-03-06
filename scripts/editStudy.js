/*jslint browser: true*/
/*global $, jQuery, alert*/
var actiontype = "add";
var studyId = "";

$(document).ready(function() {
  var id = getURLParam("id");
  if(id) {
    searchById(id, displayStudy);
    actiontype = "edit";
    studyId = id;
  }
  
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

    var desc = $("textarea#description_input").val();

    var age_elig = "\"Elig_Age\": \"0\"";
    var gender_elig = "\"Elig_Gen\": \"0\"";
    var lang_elig = "\"Elig_Lang\": \"0\"";
    var vision_elig = "\"Elig_Vision\": \"0\"";
    var education_elig = "\"Elig_Edu\": \"0\"";
    var exp_elig = "\"Elig_Exp\": \"0\"";
    var cit_elig = "\"Elig_Cit\": \"0\"";


    if($("input[name=Elig_Age]:checked").size() > 0) {
      age_elig = "\"Elig_Age\":\"" + $("input[name=Elig_Age]:checked").map(
        function() {return this.value;}).get().join(" " ) + "\"";
    }

    if($("input[name=Elig_Gen]:checked").size() > 0) {
      gender_elig = "\"Elig_Gen\":\"" + $("input[name=Elig_Gen]:checked").map(
        function() {return this.value;}).get().join(" " ) + "\"";
    }

    if($("input[name=Elig_Lang]:checked").size() > 0) {
      lang_elig = "\"Elig_Lang\":\"" + $("input[name=Elig_Lang]:checked").map(
        function() {return this.value;}).get().join(" " ) + "\"";
    }

    if($("input[name=Elig_Vision]:checked").size() > 0) {
      vision_elig = "\"Elig_Vision\":\"" + $("input[name=Elig_Vision]:checked").map(
        function() {return this.value;}).get().join(" " ) + "\"";
    }

    if($("input[name=Elig_Edu]:checked").size() > 0) {
      education_elig = "\"Elig_Edu\":\"" + $("input[name=Elig_Edu]:checked").map(
        function() {return this.value;}).get().join(" " ) + "\"";
    }

    if($("input[name=Elig_Exp]:checked").size() > 0) {
      exp_elig = "\"Elig_Exp\":\"" + $("input[name=Elig_Exp]:checked").map(
        function() {return this.value;}).get().join(" " ) + "\"";
    }

    if($("input[name=Elig_Cit]:checked").size() > 0) {
      cit_elig = "\"Elig_Cit\":\"" + $("input[name=Elig_Cit]:checked").map(
        function() {return this.value;}).get().join(" " ) + "\"";
    }
      
    var other_elig = "\"Elig_Other\":\"" + $("textarea#Elig_Other").val() + "\"";


    var eligibility = "{" + age_elig + "," + gender_elig + "," + lang_elig + "," +
      vision_elig + "," + education_elig + "," + exp_elig + "," + cit_elig + "," + other_elig + "}";
   addStudy(title, length, payAmt, payType, eligibility, desc, startDate, endDate, 1,irb, pubCal, privCal, keywords, actiontype, studyId);
//    window.close();
   // alert(id);
  });
});

// Get parameters from URL
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

/*
    addStudyTest
    Add a static mock study
    **** Needs to be removed once front end is complete ****
*/
function addStudyTest() {
  addStudy("Test", "30", "$50", "Cash", "{\"r1\":\"No rats\",\"r2\":\"21 years or older\"}", "None", "2015-02-02", "2015-03-03", 1, "ibrnumber");
}

/*
    addStudy(params...)
    Input: All study information
    Output: None
    Performs call to post the study details
*/
function addStudy(title, length, compAmt, compType, eligibility, description, startDate, endDate, ownerId,ibr, pubCal, privCal, keywords, type, id) {
  var url = "../addStudy.php";
  var params = "title="+title+"&length="+length+"&compAmount="+compAmt+"&compType="+compType+"&elig="+eligibility+"&desc="+description+"&startDate="+startDate+"&endDate="+endDate+"&ownerId="+ownerId+"&ibr="+ibr+"&pubCal="+pubCal+"&privCal="+privCal+"&keywords="+keywords+"&qtype="+type+"&id="+id;
  console.log(params);
  post(url, params, function(req) {
    var res = req.responseText.split(":");
    if("Success" == res[0]) {
      alert("Successfully added study, have a nice day");
      // Clear boxes and alert success
      window.close();
    }
    else if("Error" == res[0]) {
      alert("Error, unable to add study " + res[1]);
      // Alert error, don't clear box
    }
  });
}

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

/*
    get(url, fn)
    Input: location of resource, callback function
    **** Will be removed at some point, convert all to POST ****
*/
function get(url, fn) {
  var req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.onreadystatechange = function() {
    if(req.readyState === 4 && req.status === 200) {
      fn(req);
    }
  }
  req.send(null);
}

function searchById(id, func) {
   var jsonObj;
   var url = "../getdatadb.php?type=studies&id="+id;
   get(url, function(req) {
      var res = req.responseText;
      jsonObj = JSON.parse(res);
      func(jsonObj);
   });
}

function displayStudy(jsonObj)
{
  // Should only return one study per ID, but just to make sure

  var study = jsonObj.studies[0];
  $("input#title_input").val(study.title);
  $("input#start_date_input").val(study.startDate);
  $("input#end_date_input").val(study.endDate);
  $("input#session_length_input").val(study.length);
  $("input#public_cal").val(study.calPub);
  $("input#private_cal").val(study.calPriv);
  $("input#irb_input").val(study.IBR);
  $("input#pay_type").val(study.compensationType);
  $("input#pay_value_input").val(study.compensationAmount);
  $("input#keywords_input").val(study.keywords);
  $("textarea#description_input").val(study.description);
  $("input#pi_name").val(study.researcherFirstName + " " + study.researcherLastName);
  $("input#pi_phone").val(study.researcherPhone);
  $("input#pi_email").val(study.researcherEmail);

  var elig = JSON.parse(study.eligibility);
  $.each(elig, function(key, val) {
    val = val.split(" ");
    $.each(val, function(k, v) {
      $("input[name="+key+"][value="+v+"]").attr("checked",true);
    });
    if(val[0] != "0") {
      var n = key.split("_");
      n = n[n.length-1].toLowerCase();
      $("#" + n + "_count").html(val.length + " restrictions in " + n + " category");
    }
  });
}

//input[name=age_elig][value=1]
