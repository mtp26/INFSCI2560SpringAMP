var lengthFilter = "";
var compAmtFilter = "";
var compTypeFilter = "";
var startDateFilter = "";
var endDateFilter = "";
var filter = false;

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
  addStudy("Test", "30", "$50", "Cash", "{\"r1\":\"No rats\",\"r2\":\"21 years or older\"}", "None", "2015-02-02", "2015-03-03", 1, "ibrnumber");
}

/*
    addStudy(params...)
    Input: All study information
    Output: None
    Performs call to post the study details
*/
function addStudy(title, length, compAmt, compType, eligibility, description, startDate, endDate, ownerId,ibr) {
  var url = "addStudy.php";
  var params = "title="+title+"&length="+length+"&compensationAmount="+compAmt+"&compensationType="+compType+"&eligibility="+eligibility+"&description="+description+"&startDate="+startDate+"&endDate="+endDate+"&ownerId="+ownerId+"&ibr="+ibr;
  console.log(params);
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

function searchById(id, func) {
   var jsonObj;
   var url = "getdatadb.php?type=studies&id="+id;
   get(url, function(req) {
      var res = req.responseText;
      jsonObj = JSON.parse(res);
      func(jsonObj);
   });
}

/*
    search()
    Input: Current none
    Output: None
    Gets study data from storage and adds to the document
*/

function search() {
   
   var jsonObj;
   var url = "getdatadb.php?type=studies";
  
   var keyword = (filter)?"":($("#wordSearch").val());
   filter = false;

   if(keyword != "") {
     url += "&keyword=" + keyword;
   }
   if(startDateFilter != "") {
     url += "&start=" + start;
   }
   if(endDateFilter != "") {
     url += "&end=" + end;
   }
  
   if(lengthFilter != "") {
     var len = lengthFilter.split(":");
     url += "&lenMin=" + len[0] + "&lenMax=" + len[1];
   }

   if(compAmtFilter != "") {
     var comps = compAmtFilter.split(":");
     url += "&compMin=" + comps[0] + "&compMax=" + comps[1];
   }

   if(compTypeFilter != "") {
     url += "&compType=" + compTypeFilter;
   }
   get(url, function(req) {
      var res = req.responseText;
      jsonObj = JSON.parse(res);
      jsonObj.studies.forEach(function(data) {
      //console.log(data.eligibility);
      //var o2 = JSON.parse(data.eligibility);
      //alert(o2.r1);
      //alert(o2.r2);
      addNewStudyTable($("#studies div").length, 
        data.title, data.studyLength, data.compensationAmount + " " + data.compensationType, data.eligibility, data.description, data.startDate, data.endDate);
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

function addNewStudyTable(id, title, length, compensation, eligibility, description, startDate, endDate) {
   var scrollDiv = "<div id=scr" + id + ">" + title + "</div>";
  var scrollDiv = "<tr id=scr" + id + "><td>" + title + "</td><td>" + length + "</td><td>" + compensation + "</td><td>" + eligibility + "</td><td>" + startDate + " to " + endDate + "</td></tr>";

   var titleDiv = "<div class=\"title\">" + title + "</div>\n";
   var lengthDiv = "<div class=\"length\">" + length + "</div>\n";
   var compensationDiv = "<div class=\"compensation\">" + compensation + "</div>\n";
   var eligibilityDiv = "<div class=\"eligibility\">" + eligibility + "</div>\n";
   var descriptionDiv = "<div class=\"description\">" + description + "</div>\n";
   var timeframeDiv = "<div class=\"timeframe\">" + startDate + " to " + endDate + "</div>\n";
   var closeButton = "<button class=\"closeButton\" onclick=\"closeit(\'study" + id + "\')\">Close</button>\n";
   var applyButton = "<button class=\"closeButton\">Apply</button>\n";
   var studyDiv = "<div id=study" + id + " class=\"overlay\">\n" + 
      titleDiv + lengthDiv + compensationDiv + eligibilityDiv + descriptionDiv + timeframeDiv + applyButton + closeButton +
      "</div>"; 

   $("#main>table").append(scrollDiv);
   $("#studies").append(studyDiv);

   $('#scr'+id).click(function() {
     $('#study'+id).show();
   });
}

// Start JQuery

// Hide/show study details
$(document).ready(function(){
  var detailedResults = $(".box").parent('td').parent("tr").hide();
  $("a").click(function(event) {
    event.preventDefault();
    detailedResults.hide();
    $(this).parent('td').parent('tr').next().show();
  }); 

// Apply filter
  $("#filterButton").click(function() {
    lengthFilter = $("#explength").val();
    compAmtFilter = $("#compensationAmount").val();
    compTypeFilter = $("#compensationType").val();
    startDateFilter = $("#startDate").val();
    endDateFilter = $("#startDate").val();
    filter = true;
    search();
  });
});
