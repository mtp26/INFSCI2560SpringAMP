var lengthFilter = "";
var compAmtFilter = "";
var compTypeFilter = "";
var startDateFilter = "";
var endDateFilter = "";
var filter = false;

var keywordStore = "";

// Template variables for search results
var searchRowTemplate = "";
var searchDetailedTemplate = ""; 


// Helper functions

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
    closeit(id)
    Input: HTML object id
    Output: None
    Hides provided id
*/
function closeit(id) {
   $('#'+id).hide();
};



function searchById(id, func) {
   var jsonObj;
   var url = "getdatadb.php?type=studies&id="+id;
   get(url, function(req) {
      var res = req.responseText;
      jsonObj = JSON.parse(res);
      func(jsonObj);
   });
}

// Adds a new row to the search results
function addSearchResult(study)
{
  // Do a deep copy of the row templates
  //var resultRow = jQuery.extend(true, {}, searchRowTemplate);
  //var resultDetailed = jQuery.extend(true, {}, searchDetailedTemplate);
  var resultRow = searchRowTemplate.clone(true);
  var resultDetailed = searchDetailedTemplate.clone(true);

  $(".length", resultRow).html(study.studyLength);
  $(".compensationAmount", resultRow).html(study.compensationAmount);
  $(".compensationType", resultRow).html(study.compensationType);
  $(".title", resultRow).html(study.title);
  $(".startDate", resultRow).html(study.startDate);
  $(".endDate", resultRow).html(study.endDate);


  $(".length", resultDetailed).html(study.studyLength);
  $(".compensationAmount", resultDetailed).html(study.compensationAmount);
  $(".compensationType", resultDetailed).html(study.compensationType);
  $(".title", resultDetailed).html(study.title);
  $(".startDate", resultDetailed).html(study.startDate);
  $(".endDate", resultDetailed).html(study.startDate);

  $(".startDate", resultDetailed).html(study.startDate);
  
  $(".endDate", resultDetailed).html(study.startDate);
  $(".description", resultDetailed).html(study.description);

  $(".pubCal", resultDetailed).attr("href", study.calPub);

  $(".researcherFirstName", resultDetailed).html(study.researcherFirstName);
  $(".researcherLastName", resultDetailed).html(study.researcherLastName);

  $(".researcherEmail", resultDetailed).attr("href", "mailto:" + study.researcherEmail);
  $(".researcherEmail", resultDetailed).html(study.researcherEmail);
  $(".researcherPhone", resultDetailed).html(study.researcherPhone);

  // Keyword parsing and display
  var keywordsStr = study.keywords.slice(0,-1);
  var keywords = study.keywords.split(":");
  $.each(keywords, function(ind, val) {
    var keyword = $('<a>').attr("href", "").append(val);
    keyword.addClass("keyword");
    keyword.click( function(event) { 
      event.preventDefault();
      search(val);
    });
    
    $(".keywords", resultDetailed).append(keyword);
    $(".keywords", resultDetailed).append(" ");
  });

  // Subscription link
  $(".subscribe", resultDetailed).attr("href", "rss.php?studyId=" + study.studyId);

  // Detailed view (expanded) link
  $(".detailedview", resultDetailed).click(function() {
      $(this).attr("href", "study.html?studyId=" + study.studyId);
      $(this).attr("target", "_blank");
      window.open("study.html?studyId=" + study.studyId, study.title, "width=800, height=600");
  });

  // Eligibility parsing
  eligibility = jQuery.parseJSON(study.eligibility);
  $(".eligibility", resultRow).html(eligibility.Elig_Other);
  $(".eligibility", resultDetailed).html(eligibility.Elig_Other);

  // Finally add the results to the table
  $("#searchResults").append(resultRow);
  $("#searchResults").append(resultDetailed);


  // Hide/show study details
  var detailedResults = $(".box").parent('td').parent("tr").hide();
  $("a.title").click(function(event) {
    event.preventDefault();
    detailedResults.hide();
    $(this).parent('td').parent('tr').next().show();
  }); 
}

// Remove all results from the search table
function clearSearchResults()
{
  // Remove all results
  $("#searchHeader").hide();
  $("#searchResults").find("tr:gt(0)").remove();

  // Show that there are no results
  $("#noresults").show();
}

/*
    search()
    Input: Current none
    Output: Keyword 
    Gets study data from storage and adds to the document
*/

function search(keywordin) {
   
   var jsonObj;
   var url = "getdatadb.php?type=studies";
  
   if (arguments.length == 0)
   {
     var keyword = (filter)?"":($("#wordSearch").val());
     filter = false;
     if(keyword != "") {
      url += "&keyword=" + keyword;
     }
   } else {
      url += "&keyword=" + keywordin;
   }

   if(startDateFilter != "") {
     url += "&start=" + startDateFilter;
   }
   if(endDateFilter != "") {
     url += "&end=" + endDateFilter;
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
      clearSearchResults();

      if (jsonObj.studies.length == null)
      {
          alert(jsonObj.studies.length);
          $("#searchHeader").hide();
          $("#noresults").show();
      } else {
          jsonObj.studies.forEach(function(data) {
            $("#searchHeader").show();
            $("#noresults").hide();
            addSearchResult(data);
          });
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
$(document).ready(function(){

// Save template and remove all search results and header
searchRowTemplate = $("#searchRowTemplate").removeAttr("id").clone(true);
searchDetailedTemplate = $("#searchDetailedTemplate").removeAttr("id").clone(true);
$("#searchDetailedTemplate").remove();
$("#searchRowTemplate").remove();
$("#noresults").hide();

// Show all studies by default
clearSearchResults();
search();

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
