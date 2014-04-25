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

  // Contact the researcher link
  $(".contact-link").click(function(event) {
      event.preventDefault();
      $(this).attr("href", "contact.html?studyId=" + study.studyId);
      $(this).attr("target", "_blank");
      window.open("contact.html?studyId=" + study.studyId, study.title, "width=800, height=600");
  });

  // Eligibility parsing
  eligibility = jQuery.parseJSON(study.eligibility);
  $(".eligibility").html(eligibility.Elig_Other);

  // Build eligibility list
  $(".eligibilitypara").append('<ul>');
  var el = $(".eligibilitypara ul");

  // Age eligibility
  if (!(eligibility.Elig_Age == 0 || eligibility.Elig_Age == null))
  {
    var listText = "";
    var items = eligibility.Elig_Age.split(" ");
    items.forEach(function(item) {
      var val = ""
      switch(parseInt(item))
      {
        case 1:
          val = "&lt 18";
          break;
        case 2:
          val = "18-24";
          break;
        case 3:
          val = "25-32";
          break;
        case 4:
          val = "33-34";
          break;
        case 5:
          val = "45-60";
          break;
        case 6:
          val = "&gt 60";
          break;
        default:
          val = item;
      }
      listText += val + ', ';
    });
    
    // Remove the last comma and space when adding to the list
    el.append('<li>Age: ' + listText.slice(0,-2) + '</li>');
  }

  // Gender eligibility
  if (!(eligibility.Elig_Gen == 0 || eligibility.Elig_Gen == null))
  {
    var listText = "";
    var items = eligibility.Elig_Gen.split(" ");
    items.forEach(function(item) {
      var val = ""
      switch(parseInt(item))
      {
        case 1:
          val = "Male";
          break;
        case 2:
          val = "Female";
          break;
        default:
          val = item;
      }
      listText += val + ', ';
    });
    
    // Remove the last comma and space when adding to the list
    el.append('<li>Gender: ' + listText.slice(0,-2) + '</li>');
  }

  // Language eligibility
  if (!(eligibility.Elig_Lang == 0 || eligibility.Elig_Lang == null))
  {
    var listText = "";
    var items = eligibility.Elig_Lang.split(" ");
    items.forEach(function(item) {
      var val = ""
      switch(parseInt(item))
      {
        case 1:
          val = "Native English";
          break;
        case 2:
          val = "Non-Native English";
          break;
        case 3:
          val = "Bilingual";
          break;
        case 4:
          val = "Other (See study description)";
          break;
        default:
          val = item;
      }
      listText += val + ', ';
    });
    
    // Remove the last comma and space when adding to the list
    el.append('<li>Language: ' + listText.slice(0,-2) + '</li>');
  }

  // Vision eligibility
  if (!(eligibility.Elig_Vision == 0 || eligibility.Elig_Vision== null))
  {
    var listText = "";
    var items = eligibility.Elig_Vision.split(" ");
    items.forEach(function(item) {
      var val = ""
      switch(parseInt(item))
      {
        case 1:
          val = "20/20";
          break;
        case 2:
          val = "Glasses";
          break;
        case 3:
          val = "Contacts";
          break;
        case 4:
          val = "LASIK";
          break;
        case 5:
          val = "Other";
          break;
        default:
          val = item;
      }
      listText += val + ', ';
    });
    
    // Remove the last comma and space when adding to the list
    el.append('<li>Vision: ' + listText.slice(0,-2) + '</li>');
  }

  // Education eligibility
  if (!(eligibility.Elig_Edu == 0 || eligibility.Elig_Edu == null))
  {
    var listText = "";
    var items = eligibility.Elig_Edu.split(" ");
    items.forEach(function(item) {
      var val = ""
      switch(parseInt(item))
      {
        case 1:
          val = "Primary";
          break;
        case 2:
          val = "High School/GED";
          break;
        case 3:
          val = "Some College";
          break;
        case 4:
          val = "Associate's/Certification";
          break;
        case 5:
          val = "Bachelor's";
          break;
        case 6:
          val = "Post-Graduate";
          break;
        default:
          val = item;
      }
      listText += val + ', ';
    });
    
    // Remove the last comma and space when adding to the list
    el.append('<li>Education: ' + listText.slice(0,-2) + '</li>');
  }

  // Experience eligibility
  if (!(eligibility.Elig_Exp == 0 || eligibility.Elig_Exp == null))
  {
    var listText = "";
    var items = eligibility.Elig_Exp.split(" ");
    items.forEach(function(item) {
      var val = ""
      switch(parseInt(item))
      {
        case 1:
          val = "None";
          break;
        case 2:
          val = "No Formal Education";
          break;
        case 3:
          val = "Formal Education";
          break;
        case 4:
          val = "Professional Experience";
          break;
        default:
          val = item;
      }
      listText += val + ', ';
    });
    
    // Add the experience type
    el.append('<li>Experience: ' + listText.slice(0,-2) + ' with ' + eligibility.Elig_Exp_Type + '</li>');
  }

  // Citizenship eligibility
  if (!(eligibility.Elig_Cit == 0 || eligibility.Elig_Cit == null))
  {
    var listText = "";
    var items = eligibility.Elig_Cit.split(" ");
    items.forEach(function(item) {
      var val = ""
      switch(parseInt(item))
      {
        case 1:
          val = "US Citizen";
          break;
        case 2:
          val = "Non-US Citizen";
          break;
        case 3:
          val = "Dual Citizen";
          break;
        case 4:
          val = "Other (See study description)";
          break;
        default:
          val = item;
      }
      listText += val + ', ';
    });
    
    // Add the experience type
    el.append('<li>Citizenship: ' + listText.slice(0,-2) + '</li>');
  }
}

$(document).ready(function() {
  studyId = getURLParam("studyId");
  searchById(studyId, displayStudy);
});
