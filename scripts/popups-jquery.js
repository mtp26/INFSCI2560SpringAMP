$(document).ready(function() {
	
	// Load Data 
//	var title = jsonObj.title;
//	var studyLen = jsonObj.length;
//	var compVal = jsonObj.compensationAmount;
//	var compType = jsonObj.compensationType;
//	var desc = jsonObj.description;
//	var startDate = jsonObj.startDate;
//	var endDate = jsonObj.endDate;
//	var irb = jsonObj.ibr;
//	var rName = jsonObj.firstName + " " + jsonObj.lastName;
//	var rEmail = jsonObj.email;
//	var rPhone = jsonObj.phoneNumber;
	
	
	// Set Eligibility
	var age = $("input[name=age_elig]:checked").length;
	var gender = $("input[name=gender_elig]:checked").length;
	var lang = $("input[name=lang_elig]:checked").length;
	var vision = $("input[name=vision_elig]:checked").length;
	var edu = $("input[name=education_elig]:checked").length;
	var exp = $("input[name=experience_elig]:checked").length;
	var cit = $("input[name=cit_elig]:checked").length;
	
	$("#age_count").html(age + " restrictions in age category" );
	$("#gender_count").html(gender + " restrictions in age category" );
	$("#lang_count").html(lang + " restrictions in age category" );
	$("#vision_count").html(vision + " restrictions in age category" );
	$("#edu_count").html(edu + " restrictions in age category" );
	$("#exp_count").html(exp + " restrictions in age category" );
	$("#cit_count").html(cit + " restrictions in age category" );
	
	// causes onclick events to fail??
//	post("popupResearcher.php", "", function(req) {
//		var res = req.responseText;
//		var jsonObj = JSON.parse(res);
//		var name = jsonObj.researcher.firstName + " " + jsonObj.researcher.lastName;
//		var phone = jsonObj.phone;
//		var email = jsonObj.email;
//			
//		if ($res = $con->query($query)) {
//			while ($row = $res->fetch_assoc()) {
//				$("#pi_name").val(name);
//				$("#pi_phone").val(phone);
//				$("#pi_email").val(email);
//			}
//		}
//	});
	
	// Calendar Help
	$('#help_toggle').click(function(){
		$('#cal_help').toggle();
	});
	
	// Eligibility Restrictions
	
	// Age
	$('#age_label').click(function() {
		$('#age_table').toggle();
		age = $("input[name=age_elig]:checked").length;
		$("#age_count").html(age + " restrictions in age category" );
	});
	// Gender
	$('#gender_label').click(function() {
		$('#gender_table').toggle();
		gender = $("input[name=gender_elig]:checked").length;
		$("#gender_count").html(gender + " restrictions in gender category" );
	});
	// Language
	$('#lang_label').click(function() {
		$('#lang_table').toggle();
		lang = $("input[name=lang_elig]:checked").length;
		$("#lang_count").html(lang + " restrictions in gender category" );
	});
	// Vision 
	$('#vision_label').click(function() {
		$('#vision_table').toggle();
		vision = $("input[name=vision_elig]:checked").length;
		$("#vision_count").html(vision + " restrictions in gender category" );
	});
	// Education
	$('#edu_label').click(function() {
		$('#edu_table').toggle();
		edu = $("input[name=education_elig]:checked").length;
		$("#edu_count").html(edu + " restrictions in gender category" );
	});
	// Experience
	$('#exp_label').click(function() {
		$('#exp_table').toggle();
		exp = $("input[name=experience_elig]:checked").length;
		$("#exp_count").html(exp + " restrictions in gender category" );
	});
	// Citizenship
	$('#cit_label').click(function() {
		$('#cit_table').toggle();
		cit = $("input[name=cit_elig]:checked").length;
		$("#cit_count").html(cit + " restrictions in gender category" );
	});
	// Other
	$('#other_label').click(function() {
		$('#other_table').toggle();
	});

});

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
