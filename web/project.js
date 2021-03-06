$(document).ready(function() {


});

/*
    closeit(id)
    Input: HTML object id
    Output: None
    Hides provided id
*/
function closeit(id) {
   $('#'+id).hide();
};

/*
    addStudyTest
    Add a static mock study
    **** Needs to be removed once front end is complete ****
*/
function addStudyTest() {
   addStudy("TestStudy", "There is no info", "never", "tomorrow", "null");
}

/*
    addStudy(params...)
    Input: All study information
    Output: None
    Performs call to post the study details
*/
function addStudy(title, shortInfo, startDate, endDate, longInfo) {
  var url = "addStudy.php";
  var params = "title="+title+"&shortInfo="+shortInfo+"&startDate="+startDate+"&endDate="+endDate+"&longInfo="+longInfo;
  //alert(params);
  post(url, params, function(req) {
    var res = req.responseText.split(":");
    //alert(res);
    if("Success" == res[0]) {
      alert("Successfully added study, have a nice day");
      // Clear boxes and alert success
    }
    else if("Error" == res[0]) {
      alert("Error, unable to add study " + res[1]);
      // Alert error, don't clear box
    }
  });
}

/*
    search()
    Input: Current none
    Output: None
    Gets study data from storage and adds to the document
*/
function search() {
   var $jsonObj
   var url = "getdata.php";

   get(url, function(req) {
      var res = req.responseText;
      jsonObj = JSON.parse(res);
      jsonObj.studies.forEach(function(data) {
      addNewStudy($("#mainScrollBox div").length, 
        data.title, data.shortInfo, data.startDate, data.endDate, data.longInfo);
      });
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


function addNewStudy(id, title, shortInfo, startDate, endDate, longInfo) {

   var scrollDiv = "<div id=scr" + id + ">" + title + "</div>";
   var titleDiv = "<div class=\"title\">" + title + "</div>\n";
   var shortInfoDiv = "<div class=\"shortInfo\">" + shortInfo + "</div>\n";
   var startDateDiv = "<div class=\"startDate\">" + startDate + "</div>\n";
   var endDateDiv = "<div class=\"EndDate\">" + endDate + "</div>\n";
   var longInfoDiv = "<div class=\"longInfo\">" + longInfo + "</div>\n";
   var closeButton = "<button class=\"closeButton\" onclick=\"closeit(\'study" + id + "\')\">Close</button>\n";
   var applyButton = "<button class=\"closeButton\">Apply</button>\n";
   var studyDiv = "<div id=study" + id + " class=\"overlay\">\n" + 
      titleDiv + shortInfoDiv + startDateDiv + endDateDiv + longInfoDiv + applyButton + closeButton +
      "</div>"; 

   $("#mainScrollBox").append(scrollDiv);
   $("#studies").append(studyDiv);

   $('#scr'+id).click(function() {
     $('#study'+id).show();
   });
}
