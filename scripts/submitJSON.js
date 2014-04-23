$(document).ready(function(){
	$('#submit_form').click(function(){
		
		var age = "0";
		var gender = "0";
		var lang = "0";
		var vision = "0";
		var edu = "0";
		var exp = "0";
		var cit= "0";
		
		$('#age_table :checkbox:checked').each(function(){
			if (age == "0") {age = this.val();}
			else {
				age = "" + age + this.val();
			}
		});
		
		$('#gender_table :checkbox:checked').each(function(){
			if (gender == "0") {gender = this.val();}
			else {
				gender = "" + gender + this.val();
			}
		});
		
		$('#lang_table :checkbox:checked').each(function(){
			if (lang == "0") {lang = this.val();}
			else {
				lang = "" + lang + this.val();
			}
		});
		
		$('#vision_table :checkbox:checked').each(function(){
			if (vision == "0") {vision = this.val();}
			else {
				vision = "" + vision + this.val();
			}
		});
		
		$('#edu_table :checkbox:checked').each(function(){
			if (edu == "0") {edu = this.val();}
			else {
				edu = "" + edu + this.val();
			}
		});
		
		$('#exp_table :checkbox:checked').each(function(){
			if (exp == "0") {exp = this.val();}
			else {
				exp = "" + exp + this.val();
			}
		});
		
		$('#cit_table :checkbox:checked').each(function(){
			if (cit == "0") {cit = this.val();}
			else {
				cit = "" + cit + this.val();
			}
		});
		
		var newstudy = {
			"title" : $("#title_input").val();, 
			"start_date" : $("#start_date_input").val();, 
			"end_date": $("#end_date_input").val();, 
			"session_length": $("#session_length_input").val();,
			"public_cal" : $("#public_cal").val();,
			"private_cal" : $("#private_cal").val();,
			"irb" : $("#irb_input").val();,
			"pay_type" : $("#pay_type").val();,
			"pay_value" : $("#pay_value_input").val();,
			"keyword" : $("#keywords_input").val();,
			"description" : $("#description_input").val();,
			"eligibility" : 
			[
			{
				"age_elig" : age,
				"gender_elig" : gender,
				"lang_elig" : lang,
				"vision_elig" : vision,
				"education_elig" : edu,
				"experience_elig" : exp,
				"cit_elig" : cit,
				"other_input" : $("#other_input").val();
			}
			]
		}
		

		var json = JSON.stringify(newstudy);
		
        $.ajax({
            type: "POST",
            url: "submitStudy.php",
            data: json,
            dataType: "json"  
        }).fail(function() { 
            alert("Failed to add study."); 
        });

	});
});