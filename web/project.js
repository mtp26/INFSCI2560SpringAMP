$(document).ready(function() {
  $('.mainScrollBox>div').click(function() {

       alert(this.id + " " + this.innerHTML);
   $('#a1').show();
});

});

function closeit(id) {
   $('#'+id).hide();
};


var $jsonObj;
function search() {
   var url = "getdata.php";

   get(url, function(req) {
      var res = req.responseText;
      //alert(res);
      jsonObj = JSON.parse(res);
      jsonObj.studies.forEach(function(data) {
      addNewStudy($("#mainScrollBox div").length, 
        data.title, data.shortInfo, data.startDate, data.endDate, data.longInfo);
      });
     // alert(jsonObj);
    
   });
}

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
