$(document).ready(function() {
	// Subscription Button
	// Contact - Phone
	// Contact - Email
	// Alert - Session Length Clarification
	
	// Eligibility Restrictions
	
	// Age
	$('#age_label').click(function() {
		$('#age_table').toggle();
		$('#age_count').text($('#age_table > input[type="checkbox"]:checked').length);
	});
	// Gender
	$('#gender_label').click(function() {
		$('#gender_table').toggle();
	});
	// Language
	$('#lang_label').click(function() {
		$('#lang_table').toggle();
	});
	// Vision 
	$('#vision_label').click(function() {
		$('#vision_table').toggle();
	});
	// Education
	$('#edu_label').click(function() {
		$('#edu_table').toggle();
	});
	// Experience
	$('#exp_label').click(function() {
		$('#exp_table').toggle();
	});
	// Citizenship
	$('#cit_label').click(function() {
		$('#cit_table').toggle();
	});
	// Other
	$('#other_label').click(function() {
		$('#other_table').toggle();
	});
});