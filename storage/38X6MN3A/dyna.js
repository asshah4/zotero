function loadProfessionPage(value){
	var type = "type=registrationPage";
	$.ajax({
	   type: "GET",
	   url: "getProfessionPage.do",
	   data: type + "&profession=" + escape(value),
	   success: function(pageHTML){
	   		document.getElementById("professionPanel").innerHTML = pageHTML;
//			$("#professionPanel").html(pageHTML);
	   }
	 });
	 
}

function loadProfessionProfilePage(value){
	var type = "type=profilePage";
	$.ajax({
	   type: "GET",
	   url: "getProfessionPage.do",
	   data: type + "&profession=" + escape(value),
	   success: function(pageHTML){
//	   var v = window.open();
//	   v.document.write("-----------------------------------BEGIN-------------------------------------<br>");	   
	   $("#professionPanel").html(pageHTML);
//	   v.document.write($("#professionPanel").html());
//	   v.document.write("-----------------------------------END----------------------------------<br>");	   
			
	   }
	 });
	 
}

function loadSpecializationData(profVal, spVal, regmenu, state) {
	$.ajax({
	   type: "GET",
	   url: "registration/common/specializationControlData.jsp",
	   data: "profession=" + escape(profVal) + "&specialty=" + escape(spVal),
	   success: function(pageHTML){
			$("#specializationData").html(pageHTML);
			
			if ($("td/ul/li", $("#specializationData")).length > 0) {
				setElementClass(regmenu, 'active');
			} else {
				setElementClass(regmenu, 'inactive');
			}
			
	   }
	 });
}

function getMedSchoolsData(stVal) {

	$.ajax({
	   type: "GET",
	   url: "registration/common/medSchoolsControlData.jsp",
	   data: "state=" + escape(stVal),
	   success: function(pageHTML){
		changeDiv('regmedschoollayer', pageHTML);
//		changeDiv('regmedschoolhint', pageHTML);			
	   }
	 });

}

function getIntlMedSchoolsData(ctryVal) {

	$.ajax({
	   type: "GET",
	   url: "registration/common/intlMedSchoolsControlData.jsp",
	   data: "medSchoolCountry=" + escape(ctryVal),
	   success: function(pageHTML){
		changeDiv('regmedschoollayer', pageHTML);
	   }
	 });

}

function validate(o, action, fldName, fldValue) {
	var reqStr = fldName + "=" + escape(fldValue);
	var actionStr = action + ".do";
	
	$.ajax({
	   type: "GET",
	   url: actionStr,
	   data: reqStr,
	   success: function(pageHTML){	   		
			handleValidation(o, pageHTML);
	   }
	 });

}

function sendPass() {
	var o = $("#regemailaddress");
	
	removeregalertlayer(o, 'regerror1');
	
	var localErr = "FirstName/Last name/Email required for getting the Password";
	if ($("#regfnamefield").val() != "" &&
		$("#reglnamefield").val() != "" &&
		$("#regemailaddress").val() != "") {
		var req = "firstName=" + $("#regfnamefield").val() + "&lastName=" + $("#reglnamefield").val() + "&emailAddress=" + $("#regemailaddress").val();
		var passForm = $("#registerform").clone();
		$("#registerform").attr("action", "/px/sendPass.do");
		$("#registerform").submit();
/*		
		$.ajax({
		   type: "GET",
		   url: "sendPass.do",
		   data: req,
		   success: function(pageHTML){	   		
				handleValidation(o, pageHTML);
		   }
		 });
*/		 
	 } else {
	 		handleValidation(o, localErr);
	 }
	
}

function makeNewsletterDeliveryChoice(o, medmailId) {
	var methodParam = "method=chooseNewsletterDelivery";
	var reqStr = methodParam + "&medMailId=" + escape(medmailId);
	var actionStr = "medMailSignUp.do";
	
	$.ajax({
	   type: "GET",
	   url: actionStr,
	   data: reqStr,
	   success: function(pageHTML){
	   		if(pageHTML.indexOf("success") < 0) {
	   			handleValidation(o, pageHTML, "Please Try Another Address");	   		
	   		} else {
				handleValidation(o, pageHTML, "NONE", "medmailsignupalert");
			}
	   }
	 });


}

function medMailSignUp(medmailId, nlchoice) {
	var methodParam = "method=register"
	var reqStr = methodParam + "&medMailId=" + escape(medmailId) + "&newsletterPreference=" + escape(nlchoice);
	var actionStr = "medMailSignUp.do";
	
	$.ajax({
	   type: "GET",
	   url: actionStr,
	   data: reqStr,
	   success: function(pageHTML){	   	
			handleMedMailSignUpSuccess(pageHTML);
	   }
	 });
}

// Removes leading whitespaces
function ltrim( value ) {
	
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
	
}

// Removes ending whitespaces
function rtrim( value ) {
	
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
	
}

// Removes leading and ending whitespaces
function trim( value ) {
	
	return ltrim(rtrim(value));
	
}
