// Copied From Live 12:30PM 09/25/09
// Last Updated 1:30PM 11/2/09 By PM
function regcloseUSMDvalidate2(state) {
	toggleregmonth(state);
}
function regcloseall(state) {
	toggleregprofession(state);
	toggleregdegree(state);
	toggleregcountrypractice(state);
	toggleregsecurityQ(state);
	toggleregspecialty(state);
	toggleregattendmed(state);
	toggleregmedschool(state);
	toggleregspecialization(state);
	toggleregmedschoolcountry(state);	
	toggleregmonth(state);
	toggleregpracticesetting(state);	
	toggleregoccupation(state);	
	}

function profilecloseall(state) {
	toggleregsecurityQ(state);
	togglemailingstate(state);
	togglelicensestate(state);	
	togglemailingcountry(state);
	toggleregprofession(state);
	toggleregdegree(state);
	toggleregspecialty(state);
	togglespecialtytopic(state);
	toggleofficestate(state);
	toggleregcountrypractice(state);
	toggleofficecountry(state);
	toggleregspecialization(state);
	toggleregmedschoolcountry(state);
	toggleregpracticesetting(state);
	toggleregoccupation(state);	
	togglelicensestate(state);
	}
function cmeprofilecloseall(state) {	
	togglemailingstate(state);
	togglelicensestate(state);
	togglemailingcountry(state);	
	}
function honorariaprofilecloseall(state) {
	togglemailingstate(state);
	togglemailingcountry(state);
	toggleofficestate(state);
	toggleofficecountry(state);
	}
function honorariaprofilecloseall2(state) {
	togglemailingstate(state);
	togglemailingcountry(state);
	}
	
function cleartextinput(id, val) {
	var textinputval = val;
	var textinputid = id;
	if (document.getElementById(textinputid) &&
		document.getElementById(textinputid).value == textinputval) {
		document.getElementById(textinputid).value = "";
		}
	}
function nouserinput(id, val) {
	var textinputval = val;
	var textinputid = id;
	if (document.getElementById(textinputid) &&
		document.getElementById(textinputid).value == "") {
		document.getElementById(textinputid).value = textinputval;
		}
	}

function pad(maxlen, ch, o, post) {
	var len = $(o).val().length;
	if (len >= maxlen) return;

	var chBanner="";
	
	for (var i=0; i< (maxlen-len); i++) {
		chBanner += ch;
	}
	if (!post) {
		$(o).val(chBanner + $(o).val());
	} else {
		$(o).val($(o).val() + chBanner);
	}
	
}

function toggleregprofession(state) {
	if (document.getElementById && 
		document.getElementById("regprofessionlayer")) {
		var regmenu = document.getElementById("regprofessionlayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenu, state);
	}
}
function toggleregsecurityQ(state) {
	if (document.getElementById && 
		document.getElementById("regsecurityQlayer")) {
		var regmenu = document.getElementById("regsecurityQlayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenu, state);
	}
}

function toggleregdegree(state) {
	if (document.getElementById && 
		document.getElementById("regdegreelayer")) {
		var regmenu = document.getElementById("regdegreelayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenu, state);
	}
}

function toggleregoccupation(state) {
	if (document.getElementById && 
		document.getElementById("regoccupationlayer")) {
		var regmenu = document.getElementById("regoccupationlayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenu, state);
	}
}
function toggleregmonth(state) {
	if (document.getElementById && 
		document.getElementById("regmonthlayer")) {
		var regmenu = document.getElementById("regmonthlayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenu, state);
	}
}

function toggleregspecialty(state) {
	if (document.getElementById && 
		document.getElementById("regspecialtyscrolllayer") &&
		document.getElementById("regspecialtylayer")) {
		var regmenuscroll = document.getElementById("regspecialtyscrolllayer");
		var regmenu = document.getElementById("regspecialtylayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenuscroll, state);
		setElementClass(regmenu, state);
	}
}

function toggleregspecialization(state) {
	if (document.getElementById &&
		document.getElementById("regspecializationscrolllayer") &&
		document.getElementById("regspecializationlayer")) {
		var regmenuscroll = document.getElementById("regspecializationscrolllayer");
		var regmenu = document.getElementById("regspecializationlayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenuscroll, state);
		setElementClass(regmenu, state);
	}
}

function toggleregmedschoolcountry(state) {
	if (document.getElementById &&
		document.getElementById("regmedschoolcountryscrolllayer") &&
		document.getElementById("regmedschoolcountrylayer")) {
		var regmenuscroll = document.getElementById("regmedschoolcountryscrolllayer");
		var regmenu = document.getElementById("regmedschoolcountrylayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenuscroll, state);
		setElementClass(regmenu, state);
	}
}

function togglespecialtytopic(state) {
	if (document.getElementById &&
		document.getElementById("specialtytopiclayer")) {
		var regmenu = document.getElementById("specialtytopiclayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenu, state);
	}
}

function toggleregattendmed(state) {
	if (document.getElementById &&
		document.getElementById("regattendmedlayer")) {
		var regmenu = document.getElementById("regattendmedlayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenu, state);
	}
}

function toggleregmedschool(state) {
	if (document.getElementById &&
		document.getElementById("regmedschoollayer")) {
		var regmenu = document.getElementById("regmedschoollayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenu, state);
	}
}

function toggleregcountrypractice(state) {
	if (document.getElementById &&
		document.getElementById("regcountrypracticescrolllayer") &&
		document.getElementById("regcountrypracticelayer")) {
		var regmenuscroll = document.getElementById("regcountrypracticescrolllayer");
		var regmenu = document.getElementById("regcountrypracticelayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenuscroll, state);
		setElementClass(regmenu, state);
	}
}

function toggleregpracticesetting(state) {
	if (document.getElementById &&
		document.getElementById("regpracticesettingscrolllayer") &&
		document.getElementById("regpracticesettinglayer")) {
		var regmenuscroll = document.getElementById("regpracticesettingscrolllayer");
		var regmenu = document.getElementById("regpracticesettinglayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenuscroll, state);
		setElementClass(regmenu, state);
	}
}

function togglemailingcountry(state) {
	if (document.getElementById &&
		document.getElementById("mailingcountryscrolllayer") &&
		document.getElementById("mailingcountrylayer")) {
		var regmenuscroll = document.getElementById("mailingcountryscrolllayer");
		var regmenu = document.getElementById("mailingcountrylayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenuscroll, state);
		setElementClass(regmenu, state);
	}
}
function toggleofficecountry(state) {
	if (document.getElementById &&
		document.getElementById("officecountryscrolllayer") &&
		document.getElementById("officecountrylayer")) {
		var regmenuscroll = document.getElementById("officecountryscrolllayer");
		var regmenu = document.getElementById("officecountrylayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenuscroll, state);
		setElementClass(regmenu, state);
	}
}

function togglelicensestate(state){
	if (document.getElementById &&
		document.getElementById("licensestatelayer")) {
		var regmenu = document.getElementById("licensestatelayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenu, state);
	}
}

function togglemailingstate(state) {
	if (document.getElementById &&
		document.getElementById("mailingstatelayer")) {
		var regmenu = document.getElementById("mailingstatelayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenu, state);
	}
}
function toggleofficestate(state) {
	if (document.getElementById &&
		document.getElementById("officestatelayer")) {
		var regmenu = document.getElementById("officestatelayer").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenu, state);
	}
}

function toggleusernamehint(state) {
	if (document.getElementById) {
		var regmenu = document.getElementById("usernamehint");
		setElementClass(regmenu, state);		
	}
}
function togglepasswordhint(state) {
	if (document.getElementById) {
		var regmenu = document.getElementById("passwordhint");
		setElementClass(regmenu, state);		
	}
}
function toggledegreecerthint(state) {
	if (document.getElementById) {
		var regmenu = document.getElementById("degreecerthint");
		setElementClass(regmenu, state);		
	}
}
function togglelostpasshint(state) {
	if (document.getElementById) {
		var regmenu = document.getElementById("lostpasshint");
		setElementClass(regmenu, state);		
	}
}
function toggleprofessiontext(prof, value) {
	if (document.getElementById) {
		var swapprofession = prof;
		changeDiv('professiontext', swapprofession);
//		$("#profession").val(value);				
		toggleregprofession('inactive');
		if ($("#pageId") &&
			$("#pageId").val() == "updateBasic") {
			$("#profession").val(value);
			loadProfessionProfilePage(value);
			toggleprofessionpage2('active');

		} else {
			$("#profession").val(value);						
			loadProfessionPage(value);
			toggleprofessionpage2('active');
		}
		
	}
}

function toggleprofessionpage2(state, prof) {
	if (document.getElementById) {
		var regmenu = document.getElementById("professionpage2").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		setElementClass(regmenu, state);
		window.scrollTo(0,550);		
	}
}

function togglehinttext(hint, value) {
	if (document.getElementById) {
		var swaphint = hint;
		changeDiv('securityQtext', swaphint);
		$("#hintQuestion").val(value);		
		toggleregsecurityQ('inactive');
	}
}

function togglecountrypracticetext(countrypractice, value) {
	if (document.getElementById) {
		var swapcountrypractice = countrypractice;
		changeDiv('countrypracticetext', swapcountrypractice);
		$("#country").val(value);
		if (value == "us") {
			$("#isInternational").val("1");
		}
		adjustZipCodeLength(value,"regzippractice");
		toggleregcountrypractice('inactive');
	}
}

function togglepracticesettingtext(practicesetting, value) {
	if (document.getElementById) {
		var swappracticesetting = practicesetting;
		changeDiv('practicesettingtext', swappracticesetting);
		$("#practiceSetting").val(value);
		toggleregpracticesetting('inactive');
	}
}

function togglemailingcountrytext(mailingcountry, value) {
	if (document.getElementById) {
		var swapmailingcountry = mailingcountry;
		changeDiv('mailingcountrytext', swapmailingcountry);
		$("#homeCountry").val(value);
		adjustZipCodeLength(value, "mailingzip");
		togglemailingcountry('inactive');
	}
}
function toggleofficecountrytext(officecountry, value) {
	if (document.getElementById) {
		var swapofficecountry = officecountry;
		changeDiv('officecountrytext', swapofficecountry);
		$("#country").val(value);
		toggleofficecountry('inactive');
	}
}

function toggledegreetext(degree, value) {
	if (document.getElementById) {
		var swapdegree = degree;
		changeDiv('degreetext', swapdegree);
		$("#degree").val(value);
		toggleregdegree('inactive');
	}
}

function toggleoccupationtext(occupation, value) {
	if (document.getElementById) {
		var swapoccupation = occupation;
		changeDiv('occupationtext', swapoccupation);
		$("#occupation").val(value);
		toggleregoccupation('inactive');
	}
}
function togglemonthtext(month, value) {
	if (document.getElementById) {
		var swapmonth = month;
		changeDiv('monthtext', swapmonth);
		$("#mob").val(value);
		toggleregmonth('inactive');
	}
}

function togglespecialtytext(specialty, value) {
	if (document.getElementById) {
		var swapspecialty = specialty;
		changeDiv('specialtytext', swapspecialty);
		$("#specialty").val(value);
		toggleregspecialty('inactive');
		loadspecialization($("#profession").val(), value, 'active');
	}
}

function togglespecialtytopictext(specialtytopic, value) {
	if (document.getElementById) {
		var swapspecialtytopic = specialtytopic;
		changeDiv('specialtytopictext', swapspecialtytopic);
		$("#homePageId").val(value);
		togglespecialtytopic('inactive');
	}
}

function loadspecialization(profvalue, spvalue, state) {

		var regmenu = document.getElementById("specializationpulldown").firstChild;
		while (regmenu.nodeType != 1) {
			regmenu = regmenu.nextSibling;
		}
		loadSpecializationData(profvalue, spvalue, regmenu, state);
}

function togglespecializationtext(specialization, value) {
	if (document.getElementById) {
		var swapspecialization = specialization;
		changeDiv('specializationtext', swapspecialization);
		$("#subSpecialty").val(value);
		toggleregspecialization('inactive');
	}
}

function toggleattendmedtext(attendmed, value) {
	if (document.getElementById) {
		var swapattendmed = attendmed;
		changeDiv('attendmedtext', swapattendmed);
		$("#medSchoolState").val(value);
		toggleregattendmed('inactive');
		if ("00" == value) {
//			loadmedschools("z" + attendmed);
			togglemedschoolcountrypulldown('active');
		}
		else {
			togglemedschoolcountrypulldown('inactive');		
			loadmedschools("a" + attendmed);
		}
	}
}

function togglemedschoolcountrypulldown(state) {
	var regmenu = document.getElementById("medschoolcountrypulldown").firstChild;
	while (regmenu.nodeType != 1) {
		regmenu = regmenu.nextSibling;
	}	
	setElementClass(regmenu, state);	
}

function togglemedschoolcountrytext(medschoolcountry, value) {
	if (document.getElementById) {
		var swapmedschoolcountry = medschoolcountry;
		changeDiv('medschoolcountrytext', medschoolcountry);
		toggleregmedschoolcountry('inactive');
		loadintlmedschools(value);		
	}
}

function togglelicensestatetext(licensestate, value) {
	if (document.getElementById) {
		var swaplicensestate = licensestate;
		changeDiv('licensestatetext', licensestate);
		$("#licenseState").val(value);		
		togglelicensestate('inactive');
	}
}

function togglemailingstatetext(mailingstate, value	) {
	if (document.getElementById) {
		var swapmailingstate = mailingstate;
		changeDiv('mailingstatetext', swapmailingstate);
		$("#homeState").val(value);	
		togglemailingstate('inactive');
	}
}
function toggleofficestatetext(officestate, value) {
	if (document.getElementById) {
		var swapofficestate = officestate;
		changeDiv('officestatetext', swapofficestate);
		$("#state").val(value);
		toggleofficestate('inactive');
	}
}
function togglemedschooltext(medschool, value) {
	if (document.getElementById) {
		var swapmedschool = medschool;
		changeDiv('medschooltext', swapmedschool);
		$("#medSchool").val(value);
		toggleregmedschool('inactive');
	}
}

function loadintlmedschools(value) {
		getIntlMedSchoolsData(value);
}

function loadmedschools(value) {
		getMedSchoolsData(value);
}

function changeDiv(id, str) {
     if(!document.getElementById) return; // Not Supported
     
	 if(document.getElementById) {
	 	document.getElementById(id).innerHTML = str;
     }
}

function getElementClass(element) {
	if (element.getAttribute("class")) {
		return element.getAttribute("class");
	} else if (element.getAttribute("className")) {
		return element.getAttribute("className");
	}
}
function setElementClass(element, classValue) {
	if (element.setAttribute("class", classValue)) {
		element.setAttribute("class", classValue);
	} else if (element.setAttribute("className", classValue)) {
		element.setAttribute("className", classValue);
	}
}

function validateMiddleInitial(o) {
	$("#regminamefield").val($("#regminamefield").val().substr(1));
}

function validateUserName(o) {
	if ($("#regusername").val() != "") {
		validate(o, "validateUserName", "userId", $("#regusername").val());	
	}
}
function validatePassword(o) {
	if ($("#regpassword").val() != "") {
		validate(o, "validatePassword", "password", $("#regpassword").val());	
	}
}
function validateConfirmPassword(o) {
	var confirmPassErr= "<li>\"Password\" and \"Password Confirmation\" do not match.  Please review.</li>";

	if ($("#regpasswordconfirm").val() != "" &&
		$("#regpassword").val() != $("#regpasswordconfirm").val()) {
		handleValidation(o, confirmPassErr);
	}
}
function validateEmail(o) {
	if ($("#regemailaddress").val() != "") {
		validate(o, "validateEmail", "emailAddress", $("#regemailaddress").val());
	}
}
var i=0;
function validateConfirmEmail(o) {
	var confirmEmailErr = "<li>\"Email\" and \"Confirm Email\" do not match. Please review.</li>";
	
	if ($("#regemailaddressconfirm").val() != ""  &&
		$("#regemailaddress").val() != $("#regemailaddressconfirm").val()) {
		
		// Biz needs the control to comeback to first email address. So this hack.
		o = $("#regemailaddress");
		
		handleValidation(o, confirmEmailErr);
	}
	return false;
}
function handleValidation(o, msg, actionMsg, classId) {
	var errMsg = trim(msg);
	var preDesign = "<p><b><ul>";
	var defaultActionMsg = "Return to Form";
	var defaultAlertClass = "regerroralert";
	if (!actionMsg) {
		actionMsg = defaultActionMsg;
	}
	if (!classId) {
		classId = defaultAlertClass;
	}

	var postDesign = "</ul></b></p>"
	var actionDesign = "<div id=\"closeregalert\"><a href=\"javascript:removeregalertlayer('"+$(o).attr("id")+"','regerror1','"+classId+"');\">"+actionMsg+"&nbsp;<b>&nbsp;&#187;</b></a></div>";

	if (actionMsg != "NONE") {
		postDesign += actionDesign;	
	} 
	
	if (errMsg != "") {
		var fmtMsg = preDesign + errMsg + postDesign;
		addregalertlayer(o, "regerror1", fmtMsg, classId);
	}
}

function addregalertlayer(o, alertnum, msgHTML, classId) {
			if (alertnum == "regerror1") {
					$(o).focus();
					var newDiv2 = parent.document.createElement("div");
					newDiv2.setAttribute("id", "regerroralertcover");
					newDiv2.innerHTML = " ";
					var my_div2 = parent.document.getElementById("bodypadding");
					parent.document.body.insertBefore(newDiv2, my_div2);
					var newDiv = parent.document.createElement("div");
					newDiv.setAttribute("id", classId);
					newDiv.innerHTML = msgHTML;
					var my_div = parent.document.getElementById("bodypadding");
					parent.document.body.insertBefore(newDiv, my_div);
			}
			else if (alertnum == "loginerror1") {
				if ((document.getElementById("userId").value != "test") || (document.getElementById("password").value != "test")) {
					document.LoginForm.userId.focus();
					var newDiv2 = parent.document.createElement("div");
					newDiv2.setAttribute("id", "regerroralertcover");
					newDiv2.innerHTML = " ";
					var my_div2 = parent.document.getElementById("bodypadding");
					parent.document.body.insertBefore(newDiv2, my_div2);
					var newDiv = parent.document.createElement("div");
					newDiv.setAttribute("id", "regerroralert");
					newDiv.innerHTML = "<p><b>The Username Password combination is not valid.</b></p><div id=\"closeregalert\"><a href=\"javascript:removeregalertlayer('loginerror1');\">Please Try Again&nbsp;<b>&nbsp;&#187;</b></a></div>";
					var my_div = parent.document.getElementById("bodypadding");
					parent.document.body.insertBefore(newDiv, my_div);
					}
				}
			else {
				alert("Next Error");
				}
	}

function removeregalertlayer(oid, alertnum, classId) {

		var o = "#"+oid;
		if (!classId) {
			classId = "regerroralert";
		}
		
		if (alertnum == "regerror1") {
			var element = document.getElementById(classId);
			if (element) {
				while (element.firstChild) {
					element.removeChild(element.firstChild);
				}
				document.getElementById(classId).id = "";
			}
			var element2 = document.getElementById("regerroralertcover");
			if (element2) {
				while (element2.firstChild) {
					element2.removeChild(element2.firstChild);
				}
				document.getElementById("regerroralertcover").id = "";
			}			
			$(o).focus();
		}
		else if (alertnum == "loginerror1") {
			var element = document.getElementById("regerroralert");
			while (element.firstChild) {
				element.removeChild(element.firstChild);
			}
			if (element) {
				document.getElementById("regerroralert").id = "";
				var element2 = document.getElementById("regerroralertcover");
				while (element2.firstChild) {
					element2.removeChild(element2.firstChild);
				}
			document.getElementById("regerroralertcover").id = "";
			}			
			document.LoginForm.userId.focus();
		}
		else if (alertnum == "regerror2") {
			var element = document.getElementById("regerroralert");
			while (element.firstChild) {
				element.removeChild(element.firstChild);
			}
			document.getElementById("regerroralert").id = "";
			var element2 = document.getElementById("regerroralertcover");
			while (element2.firstChild) {
				element2.removeChild(element2.firstChild);
			}
			document.getElementById("regerroralertcover").id = "";
			document.medmailcreate.medmailaddress.focus();
		}
}

function chooseNewsletterDelivery(btn) {
	togglemedmailaccept("inactive");
	var o = $("#medmailaddress");
	var val = $("#medmailaddress").val();
	makeNewsletterDeliveryChoice(o, val);
}

function togglemedmailaccept(state) {
/*
	if (state == "inactive") {
		$("#medmailaccept").attr("value","Signing Up...");
		$("#medmailaccept").attr("disabled","true");
	} else {
		$("#medmailaccept").attr("value","Sign Up ");
		$("#medmailaccept").attr("disabled","false");
	}
*/
}

function submitMailSignupForm() {
	var o = $("#medmailaddress");

	var val = $("#medmailaddress").val();
	var val2 = $("input[@name=newsletterPreference][@checked]").val();

	removeregalertlayer(o, "regerror1", "medmailsignupalert");
	
	medMailSignUp(val, val2);
/*
Following steps:
1. Check for uniqueness and validity. Break and show error.
2. Ask for newsletter association
2. Begin transaction
2. Create the affilitations in Medscape DB
3. Call PHP Mail bridge
4. Report Error OR success
*/
/*
	if (document.getElementById("medmailaddress").value == "Prefilled") {
					var newDiv2 = parent.document.createElement("div");
					newDiv2.setAttribute("id", "regerroralertcover");
					newDiv2.innerHTML = " ";
					var my_div2 = parent.document.getElementById("bodypadding");
					parent.document.body.insertBefore(newDiv2, my_div2);
					var newDiv = parent.document.createElement("div");
					newDiv.setAttribute("id", "regerroralert");
					newDiv.innerHTML = "<p><b>We're sorry but that Medscape Mail address is already in use.</b></p><div id=\"closeregalert\"><a href=\"javascript:removeregalertlayer('regerror2');\">Please Try Another Address&nbsp;<b>&nbsp;&#187;</b></a></div>";
					var my_div = parent.document.getElementById("bodypadding");
					parent.document.body.insertBefore(newDiv, my_div);
	}
	else if (document.getElementById("medmailaddress").value == "") {
					var newDiv2 = parent.document.createElement("div");
					newDiv2.setAttribute("id", "regerroralertcover");
					newDiv2.innerHTML = " ";
					var my_div2 = parent.document.getElementById("bodypadding");
					parent.document.body.insertBefore(newDiv2, my_div2);
					var newDiv = parent.document.createElement("div");
					newDiv.setAttribute("id", "regerroralert");
					newDiv.innerHTML = "<p><b>We're sorry but that is not a valid email address.</b></p><div id=\"closeregalert\"><a href=\"javascript:removeregalertlayer('regerror2');\">Please Try Another Address&nbsp;<b>&nbsp;&#187;</b></a></div>";
					var my_div = parent.document.getElementById("bodypadding");
					parent.document.body.insertBefore(newDiv, my_div);
	}
	else if (document.getElementById("medmailaddress")) {
					var newDiv2 = parent.document.createElement("div");
					newDiv2.setAttribute("id", "regerroralertcover");
					newDiv2.innerHTML = " ";
					var my_div2 = parent.document.getElementById("bodypadding");
					parent.document.body.insertBefore(newDiv2, my_div2);
					var newDiv = parent.document.createElement("div");
					newDiv.setAttribute("id", "medmailsignupalert");
					newDiv.innerHTML = "<p>To complete the sign up process, review your new Medscape Mail address and tell us where you would like us to deliver your Medscape email newsletters and alerts.</p><form action=\"#\" method=\"post\" id=\"medmailnewsletterdelivery\" name=\"medmailnewsletterdelivery\"><ul><li><input name=\"newsletterdelivery\" type=\"radio\" value=\"medmail\" />schick1977@medscape.com <a href=\"javascript:editmedmailaddress();\">[edit address]</a></li><li><input name=\"newsletterdelivery\" type=\"radio\" value=\"main\" />j.a.schick@webmd.net</li><li><input name=\"newsletterdelivery\" type=\"radio\" value=\"Both\" checked=\"checked\" />Both</li></ul><input name=\"newsletterdeliverybtn\" id=\"newsletterdeliverybtn\" type=\"button\" value=\"Submit\" onclick=\"window.location='Dr_reg_p2_success.html';\" /></form>";
					var my_div = parent.document.getElementById("bodypadding");
					parent.document.body.insertBefore(newDiv, my_div);
	}
*/	
}

function handleMedMailSignUpSuccess(msg) {
	var fmtMsg = trim(msg);
	$("#mailsignuparea").html(fmtMsg);
}
function showMedscapeMailConfirmation() {
			var showConfirmation = document.getElementById("showConfirmation").value;
			var error = document.getElementById("error").value;
			
			if (showConfirmation != null && showConfirmation == "true") {
				var mailId = document.getElementById('medmailaddress').value;
				var newDiv2 = parent.document.createElement("div");
				newDiv2.setAttribute("id", "regerroralertcover");
				newDiv2.innerHTML = " ";
				var my_div2 = parent.document.getElementById("bodypadding");
				parent.document.body.insertBefore(newDiv2, my_div2);
				var newDiv = parent.document.createElement("div");
				newDiv.setAttribute("id", "medmailsignupalert");
				newDiv.innerHTML = "<p>To complete the signup process please click 'Confirm' to accept this address or click the 'Edit' link if you would like to make a change.</p><form action=\"/px/mailsignup.do\" id=\"medmailnewsletterdelivery\" name=\"medmailnewsletterdelivery\" method=\"post\"><input name=\"method\" type=\"hidden\" value=\"confirmCreateAccount\"/><ul><li>" + mailId + "@medscape.com<a href=\"javascript:tempremovelayer('medmailsignupalert');\">[Edit]</a></li></ul><input name=\"newsletterdeliverybtn\" id=\"newsletterdeliverybtn\" type=\"submit\" value=\"Confirm\" /></form>";
				var my_div = parent.document.getElementById("bodypadding");
				parent.document.body.insertBefore(newDiv, my_div);
			} else if (error == "false") {
				var suggestedEmail = document.getElementById("suggestedEmail").value;
				document.getElementById("medmailaddress").value = suggestedEmail;
			}
}
function goBackToPreviousMedscapePageOrMedscapeHome() {
			if (document.referrer != null && document.referrer.indexOf("medscape.com") != -1) {
				history.back();
			} else {
				location.href = "http://www.medscape.com";
			}
}
function tempremovelayer(layerid) {
			var element = document.getElementById(layerid);
			while (element.firstChild) {
				element.removeChild(element.firstChild);
			}
			document.getElementById(layerid).id = "";
			var element2 = document.getElementById("regerroralertcover");
			while (element2.firstChild) {
				element2.removeChild(element2.firstChild);
			}
			document.getElementById("regerroralertcover").id = "";
			document.medmailcreate.medmailaddress.focus();
}
function editmedmailaddress() {
			var element = document.getElementById("medmailsignupalert");
			while (element.firstChild) {
				element.removeChild(element.firstChild);
			}
		document.getElementById("medmailsignupalert").id = "";
			var element2 = document.getElementById("regerroralertcover");
			while (element2.firstChild) {
				element2.removeChild(element2.firstChild);
			}
		document.getElementById("regerroralertcover").id = "";
		document.medmailcreate.medmailaddress.focus();
}
function addspeclistlayer() {
					var newDiv = parent.document.createElement("div");
					newDiv.setAttribute("id", "specsitepop");
					newDiv.innerHTML = "<table id=\"splashspecialties\"><tr valign=\"top\"><td><h3 class=\"heading\">SPECIALTY SITES</h3></td><td><div id=\"closespeclist\"><a href=\"javascript:removespeclistlayer();\">CLOSE&nbsp;<b>&nbsp;X</b></a></div></td></tr><tr valign=\"top\"><td><ul><li>Allergy &amp; Clinical Immunology</li><li>Business of Medicine</li><li>Cardiology</li><li>Critical Care</li><li>Dermatology</li><li>Diabetes &amp; Endocrinology</li><li>Emergency Medicine</li><li>Family Medicine</li><li>Gastroenterology</li><li>General Surgery</li><li>Hematology-Oncology</li><li>HIV/AIDS</li><li>Infectious Diseases</li><li>Internal Medicine</li><li>Lab Medicine</li><li>Med Students</li><li>Medscape Today</li><li>Nephrology</li></ul></td><td><ul><li>Neurology &amp; Neurosurgery</li><li>Nurses</li><li>Ob/Gyn &amp; Women's Health</li><li>Oncology</li><li>Ophthalmology</li><li>Orthopaedics</li><li>Pathology &amp; Lab Medicine</li><li>Pediatrics</li><li>Pharmacists</li><li>Psychiatry &amp; Mental Health</li><li>Public Health &amp; Prevention</li><li>Pulmonary Medicine</li><li>Radiology</li><li>Rheumatology</li><li>Surgery</li><li>Transplantation</li><li>Urology</li><li>Women's Health</li></ul></td></tr></table>";
					var my_div = parent.document.getElementById("bodypadding");
					parent.document.body.insertBefore(newDiv, my_div);
	}

function removespeclistlayer() {
		var element = document.getElementById("specsitepop");
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
		document.getElementById("specsitepop").id = "";
}
function showaddress1(state) {
					var newDiv2 = parent.document.createElement("div");
					newDiv2.setAttribute("id", "regerroralertcover");
					newDiv2.innerHTML = " ";
					var my_div2 = parent.document.getElementById("bodypadding");
					parent.document.body.insertBefore(newDiv2, my_div2);
	if (document.getElementById) {
		var regmenu = document.getElementById("addressalert1");
		setElementClass(regmenu, state);
	}	
}
function showaddress2(state) {
					var newDiv2 = parent.document.createElement("div");
					newDiv2.setAttribute("id", "regerroralertcover");
					newDiv2.innerHTML = " ";
					var my_div2 = parent.document.getElementById("bodypadding");
					parent.document.body.insertBefore(newDiv2, my_div2);
	if (document.getElementById) {
		var regmenu = document.getElementById("addressalert2");
		setElementClass(regmenu, state);
	}	
}

function adjustZipCodeLength(value, oid) {
	var o = "#"+oid;
	if (value) {
		if (value == "us") {
			$(o).attr("maxLength", "5");
		} else {
			$(o).attr("maxLength", "10");
		}
	}
}

function chooseLogin(choice) {
	if (choice) {
			$("#loginChoice").val(choice);
	} else {
		$("#loginChoice").val("3");
	}
	$("#loginchoiceform").submit();   	
}

function handleSubscriptionUpdate(responseText, statusText) {
	   $("#subscriptionresult").html(responseText);
}

function handleLBBChoiceUpdate(responseText, statusText) {
	   $("#lbbupdateresult").html(responseText);
}

function bustFrames(referrerapp, referrerdomain) {
	if((referrerapp) && (referrerdomain)) {
	var referVar = document.referrer;

		if((referVar.indexOf(referrerapp[0])>0 || referVar.indexOf(referrerapp[1])>0) && referVar.indexOf(referrerdomain)>0){
			if (parent.frames.length > 0){
				top.location.replace(document.location);
			}
		}
	} else {
		if (parent.frames.length > 0){
			top.location.replace(document.location);
		}
	
	}
}

function handleValidationFormSubmit() {
	cleartextinput('regday','DD');
	cleartextinput('regyear','YYYY');
	cleartextinput('regssnum','####');
	cleartextinput('regfnamefield','First Name');
	cleartextinput('reglnamefield','Last Name');
	cleartextinput('regyeargrad','YYYY');
}