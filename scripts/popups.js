/* Subscription Button */
function subscribe() {
	alert("Thank you for subscribing!");
}

/* Contact - Phone Button */
function getPhone() {
	alert("Researcher: 412-444-4444");
}

/* Contact - Email Button */
function sendEmail() {
	open('mailto:test@example.com?subject=Study_Interest');
}

/* Alert - Session Length Clarification */


/* Age Eligibility */
var ageHidden = true;
function toggleAge() {
	var ele = document.getElementById("age_elig_table");
	if(ageHidden) {
		ageHidden = false
		ele.style.display = "inline";
	}
	else {
		ageHidden = true
		ele.style.display = "none";
	}
}

/* Gender Eligibility */
var genderHidden = true;
function toggleGender() {
	var ele = document.getElementById("gender_elig_table");
	if(genderHidden) {
		genderHidden = false
		ele.style.display = "inline";
	}
	else {
		genderHidden = true
		ele.style.display = "none";
	}
}

/* Language Eligibility */
var langHidden = true;
function toggleLang() {
	var ele = document.getElementById("lang_elig_table");
	if(langHidden) {
		langHidden = false
		ele.style.display = "inline";
	}
	else {
		langHidden = true
		ele.style.display = "none";
	}
}

/* Vision Eligibility */
var visionHidden = true;
function toggleVision() {
	var ele = document.getElementById("vision_elig_table");
	if(visionHidden) {
		visionHidden = false
		ele.style.display = "inline";
	}
	else {
		visionHidden = true
		ele.style.display = "none";
	}
}

/* Education Eligibility */
var educationHidden = true;
function toggleEducation() {
	var ele = document.getElementById("education_elig_table");
	if(educationHidden) {
		educationHidden = false
		ele.style.display = "inline";
	}
	else {
		educationHidden = true
		ele.style.display = "none";
	}
}

/* Experience Eligibility */
var expHidden = true;
function toggleExperience() {
	var ele = document.getElementById("experience_elig_table");
	if(expHidden) {
		expHidden = false
		ele.style.display = "inline";
	}
	else {
		expHidden = true
		ele.style.display = "none";
	}
}

/* Other Eligibility */
var otherHidden = true;
function toggleOther() {
	var ele = document.getElementById("other_elig_input");
	if(otherHidden) {
		otherHidden = false
		ele.style.display = "inline";
	}
	else {
		otherHidden = true
		ele.style.display = "none";
	}
}

