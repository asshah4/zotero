function alertMessage(){
	//alert();
}

function MM_goToURL() { //v3.0
  var i, args=MM_goToURL.arguments; document.MM_returnValue = false;
  for (i=0; i<(args.length-1); i+=2) eval(args[i]+".location='"+args[i+1]+"'");
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
  var h = window.open(theURL,winName,features);
  h.focus();
}

/*
function MM_openBrWindow(theURL,winName,features, title) { //v4.0
  var h = window.open(theURL,winName,features);
  h.document.title = title;
  h.focus();
}
*/
function MM_popupMsg(msg) { //v1.0
  alert(msg);
}

function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

function printPage() { print(document); }

/* 
	@description Sets the value of sortBy and sortOrder properties
	of the given form, then submits the form to the server
	@author jcg
*/
function MM_sort(formName, sortby, sortorder) {
	var form = window.document.forms[formName];

	if (form.sortBy.value == sortby) { // toggle if the same orderBy
		if (sortorder=="") form.sortOrder.value = "0";
		else if (sortorder=="0") form.sortOrder.value = "1";
		else if (sortorder=="1") form.sortOrder.value = "0";
	} else { // default orderBy is 0 or ASC
		form.sortOrder.value = "0";
	}

	form.sortBy.value = sortby;
	form.submit();
}

	function MM_sort2(formName, sortby, sortorder, popup) {
		var form = window.document.forms[formName];
		if (form.sortBy.value == sortby) { // toggle if the same orderBy
			if (sortorder=="") form.sortOrder.value = "0";
			else if (sortorder=="0") form.sortOrder.value = "1";
			else if (sortorder=="1") form.sortOrder.value = "0";
		} else { // default orderBy is 0 or ASC
			form.sortOrder.value = "0";
		}
		form.sortBy.value = sortby;
		form.popup.value = popup;
		form.submit();
	}

/* 
	@description toggles all the check boxes in a form.
	@author gta
*/
function checkAll(param,formname){
	var ml = eval('document.'+formname);
	var len = ml.elements.length;
    var status = false;
    switch (param){
    case 'deleteLastTenSearches':
       if(ml.selectAllLastTen.checked){      
			 status=true;
		}
		break;
    case 'deleteParameters':
       if(ml.selectAllParam.checked){      
			 status=true;
		}
		break;
	case 'deleteResults':
       if(ml.selectAll.checked){      
			 status=true;
		}
		break;
	case 'deleteBookmarks':
       if(ml.selectAll.checked){      
			 status=true;
		}
		break;
	case 'deleteArticles':
       if(ml.selectAll.checked){      
			 status=true;
		}
		break;
	case 'toView':
        if(ml.toViewAll.checked){     
			status=true;
		}
		if(ml.toViewAllTop.checked){      
			 status=true;
		}
		break;
	case 'toBasket':
        if(ml.toBasketAll.checked){      
			 status=true;
		}
        if(ml.toBasketAllTop.checked){      
			 status=true;
		}	
		break;
	case 'exportFields':
        if(ml.selectAll.checked){
			status=true;
		}
    }
    
    for (var i = 0; i < len; i++) {
    	var e = ml.elements[i];
	    if (e.name == param && !e.disabled) { 
	    	e.checked = status;
		}
	}
	
return true;
}

function checkAtLeastOne(param,formname)
{
 //check if at least one checkbox is selected
    var ml = eval('document.'+formname);
	var len = ml.elements.length;
    for (var i = 0; i < len; i++) {
	         var e = ml.elements[i];
	         if (e.name == param) { 
				 if(e.checked){
					// alert ('e.checked='+e.checked);
				    return true;
				 }
				}
	   }

   return false;
}

function checkOne(param,formname,displaytext)
{
	//check if at least one checkbox is selected
	var checkboxes = document.getElementsByName(param);
	for (var i = 0; i < checkboxes.length; i++)
		{
		if (checkboxes[i].checked)
			{
			return true;
			}
		}
	alert(displaytext);
	return false;
}

function checkOneDelete(param,formname,displaytext){	
	if (checkOne(param,formname,displaytext)){		
		return confirm('Are you sure you want to delete?');		 
	} else {
		return false;
	}
}

function validateMultipleEntry(param,formname,displaytext) {
	var field = eval('document.'+formname+'.'+param);
	var separator = ",";
	var tokens = new Array();
	var issueId;

	tokens = tokenize(field.value, separator);

    if (tokens.length == 0 || tokens[0] == "") {
		alert(displaytext);
		return false;
	}

	for(var i=0; i<tokens.length; i++) {
		issueId = trim(tokens[i]);
		
		if (!isValidNumber(issueId)) {
			alert(tokens[i] + ' is not a number.');
			return false;
		}		
	}
	
	return true;
}

function validateArray(param,formname,displaytext){
	var field = eval('document.'+formname+'.'+param);
	var issueId;
   
	for(var i=0; i<field.length; i++) {
		data = field[i].value;
		
		if (data != ""){
			if (!isValidNumber(data)) {
				alert(field[i].value + ' is not a number.');
				return false;
			}
			return true;
		}		
	}
	alert(displaytext);
	return false;
} 

function validateSubno(param,formname,displaytext){
	var field = eval('document.'+formname+'.'+param);
	var issueId;
   	data = field.value;
		if (data != ""){
			if (!isValidNumber(data)) {
				alert(field.value + ' is not a number.');
				return false;
			}
			return true;
		}		
	alert(displaytext);
	return false;
}

function included(temp, compId) {
	var componentIds = tokenize(temp, ',');
	var len = componentIds.length;
		
	//alert('componentIds len: ' + len);
	for(var i=0; i<len; i++) {
		if (compId == componentIds[i]) {
			return true;
		} 
	}

	return false;
}

	function wasAdded(form, componentfield, componentIdValue) {
		var ml = form;
		var len = ml.elements.length;

		for (var i = 0; i < len; i++) {
			var elem = ml.elements[i].name;
			
			if (elem.indexOf(componentfield) > -1) {
				var newElem = ml.elements[i];
				if (newElem.value == componentIdValue) {
					return true;
				}
			}
		}
		
		return false;
	}


function tokenize(input, separator) {
	var indexOfSeparator = input.indexOf(separator);
	var index = 0;

	var tokens = new Array();
	
	if (indexOfSeparator > -1) {
		while(input.length > 0) {
			temp = input.substring(0, indexOfSeparator);
			//alert("temp: " + temp);
			
			if (temp != '' || temp.length > 0) {
				tokens[index] = temp;
				index++;
			}
			
			input = input.substring(temp.length + 1, input.length);
			//alert("input: " + input);
			
			indexOfSeparator = input.indexOf(separator);

			if (indexOfSeparator == -1) {
				if (input != '' || input.length > 0) {
					tokens[index] = input;
				}
				break;
			}
		}
	} else {
		temp = input;
		tokens[index] = temp;
	}
	
	return tokens;
}


function validateInputDate(elem) {
	var input = elem.value;
	var len = input.length;
	
	var day;
	var month;
	var year;

	if (len == 8) {
		input = '0' + input;
		len = input.length;
	}

	if (len == 0) {
		return true;
	} else if (len < 9 || len > 9) {
		return false;
	} else {
		day = input.substring(0, 2);
		month = input.substring(2, 5);
		year = input.substring(5, len);

		return isInputDateValid(day, convertMonth(month), year);
	}
}
function convertMonthToInt(month){
	if(month.toUpperCase() == 'JAN') return 0;
	if(month.toUpperCase() == 'FEB') return 1;
	if(month.toUpperCase() == 'MAR') return 2;
	if(month.toUpperCase() == 'APR') return 3;
	if(month.toUpperCase() == 'MAY') return 4;
	if(month.toUpperCase() == 'JUN') return 5;
	if(month.toUpperCase() == 'JUL') return 6;
	if(month.toUpperCase() == 'AUG') return 7;
	if(month.toUpperCase() == 'SEP') return 8;
	if(month.toUpperCase() == 'OCT') return 9;
	if(month.toUpperCase() == 'NOV') return 10;
	if(month.toUpperCase() == 'DEC') return 11;
	return 0;
	
}

function isInputDateValid(day, month, year) {

	if (!isValidNumber(day) || !isValidNumber(year)) {
		return false;
	}

	if (month < 1 || month > 12) {
		return false;
	}

	if (day < 1 || day > 31) {
    	return false;
	}
    
    if ((month == 4 || month == 6 || month == 9 || month == 11) &&
    	(day == 31)) {
		return false;
	}
    
    if (month == 2) {
    	var leap = (year % 4 == 0 &&
        (year % 100 != 0 || year % 400 == 0));

		if (day>29 || (day == 29 && !leap)) {
        	return false;
		}
	}
	return true;
}

function isValidNumber(sText) {
	var PNum = new String(sText);
	var regex = /[^0-9]/;
	return !regex.test(PNum);
}

function isAllDigits(argvalue) {
	argvalue = argvalue.toString();
    var validChars = "0123456789.";
    var startFrom = 0;
        
    if (argvalue.substring(0, 2) == "0x") {
    	validChars = "0123456789abcdefABCDEF";
        startFrom = 2;
	} else if (argvalue.charAt(0) == "0") {
       	validChars = "01234567";
        startFrom = 1;
	} else if (argvalue.charAt(0) == "-") {
       	startFrom = 1;
	}
                
	for (var n = startFrom; n < argvalue.length; n++) {
       	if (validChars.indexOf(argvalue.substring(n, n+1)) == -1) return false;
	}
	return true;
}

function isInRange(argValue, min, max) {
	var isValid = true;
	var fValue = parseFloat(argValue);
	var fMin = parseFloat(min);
	var fMax = parseFloat(max);
		
	if (!(fValue >= fMin && fValue <= fMax)) {
		isValid = false;
	}
		
	return isValid;
}


function convertMonth(month) {
	var monthValue = -1;
				
	var months = new Array();
	months[0] = 'Jan';
	months[1] = 'Feb';
	months[2] = 'Mar';
	months[3] = 'Apr';
	months[4] = 'May';
	months[5] = 'Jun';
	months[6] = 'Jul';
	months[7] = 'Aug';
	months[8] = 'Sep';
	months[9] = 'Oct';
	months[10] = 'Nov';
	months[11] = 'Dec';
	
	for (i = 0; i<months.length; i++) {
		if (months[i].toUpperCase() == month.toUpperCase()) {
			monthValue = (i + 1);
			break;
		}
	}

	if ((monthValue > 0) && (monthValue < 10)) {
		monthValue = '0' + monthValue;
	}
				
	//alert('monthValue: ' + monthValue);
	return monthValue;
}

function setAllCheckBoxes(displaytext){

	var issue = document.getElementsByName("issue");
	var forthcoming = document.getElementsByName("forthcoming");
	var len = issue.length;
	var len2 = forthcoming.length;
	
		for (var i = 0; i < len; i++) {
	         var e = issue[i];
	         
	         var indexOfSeparator = e.value.indexOf("-");
			 var temp = e.value.substring(0, indexOfSeparator);

	         	if (temp == displaytext) { 
					e.checked = true;
				}
		}
		
		if (document.manageContentAlertsForm.typeForthcoming.checked){
			for (var i = 0; i < len2; i++) {
		         var e = forthcoming[i];
		         
		         var indexOfSeparator = e.value.indexOf("-");
				 var temp = e.value.substring(0, indexOfSeparator);
	
		         	if (temp == displaytext) { 
						e.checked = true;
					}
			}
		}
}

function isEmpty(elem) {
	return (elem == null || trim(elem.value) == '');
}

function checkEmail(emailStr) {
	if (emailStr.length == 0) {
    	return true;
	}
	
    var emailPat=/^(.+)@(.+)$/;
    var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
    var validChars="\[^\\s" + specialChars + "\]";
    var quotedUser="(\"[^\"]*\")";
    var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
    var atom=validChars + '+';
    var word="(" + atom + "|" + quotedUser + ")";
    var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
    var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
    var matchArray=emailStr.match(emailPat);
    if (matchArray == null) {
    	return false;
	}
    var user=matchArray[1];
    var domain=matchArray[2];
    if (user.match(userPat) == null) {
    	return false;
	}
    var IPArray = domain.match(ipDomainPat);
	if (IPArray != null) {
    	for (var i = 1; i <= 4; i++) {
        	if (IPArray[i] > 255) {
            	return false;
			}
		}
		return true;
	}
	
	var domainArray=domain.match(domainPat);
	if (domainArray == null) {
		return false;
	}
	var atomPat=new RegExp(atom,"g");
	var domArr=domain.match(atomPat);
	var len=domArr.length;
	if ((domArr[domArr.length-1].length < 2) ||
		(domArr[domArr.length-1].length > 3)) {
		return false;
	}
	if (len < 2) {
		return false;
	}
	return true;
}
            
function validateManageCitation(formname, cmd) {
	var field = eval('document.'+formname);
	/*
	if ('Add' == cmd) {
		if (isEmpty(field.addArticleComponentId)) {
			alert('Article Component ID is required.');
			field.addArticleComponentId.focus();
			return false;
		}
		if (isEmpty(field.addEmailAddress)) {
			alert('Email Address is required.');
			field.addEmailAddress.focus();
			return false;
		} else if (!checkEmail(field.addEmailAddress.value)) {
			alert('Email Address is invalid.');
			field.addEmailAddress.focus();
			return false;
		}
	} else {
	*/
		var elem = new Array();
		var ctr = 0;
		elem = field.elements;
		for (i=0; i<elem.length; i++) {
			if (elem[i].name.indexOf('emailAddress') > -1) {
				if (isEmpty(elem[i])) {
					alert('Email Address is required.');
					elem[i].focus();
					return false;
				} else if (!checkEmail(elem[i].value)) {
					alert('Email Address is invalid.');
					elem[i].focus();
					return false;
				}
			}
		}
		return confirm('Are you sure you want to make these changes?');
	//}
	//return true;
}

function validateManageContent(formname){
	var field = eval('document.'+formname);

	if (field.type[0].checked){
		field.issueFrequency.value = '';		
	}
	
	if (field.type[1].checked){
		if (field.issueFrequency.value == ''){
			alert('Please input number of days.');
			field.issueFrequency.focus();
			return false;
		}else{
			if (!isValidNumber(field.issueFrequency.value)) {
				alert(field.issueFrequency.value + ' is not a number.');
				field.issueFrequency.focus();
				return false;
			}
		}	
	}
	
	if (field.typeForthcoming.checked){
		if (field.forthcomingFrequency.value == ''){
			alert('Please input number of days.');
			field.issueFrequency.focus();
			return false;
		}else{
			if (!isValidNumber(field.forthcomingFrequency.value)) {
				alert(field.forthcomingFrequency.value + ' is not a number.');
				field.forthcomingFrequency.focus();
				return false;
			}
		}
	}else{
		field.forthcomingFrequency.value = '';
	}
	
	return confirm('Are you sure you want to make these changes?');

}

//added by rjc 022205
function MM_sort_consortiaOwnIP(formName, ownSortBy, ownSortOrder) {
	var form = window.document.forms[formName];
	if (form.ownSortBy.value == ownSortBy) { // toggle if the same orderBy
		if (ownSortOrder=="") form.ownSortOrder.value = "0";
		else if (ownSortOrder=="0") form.ownSortOrder.value = "1";
		else if (ownSortOrder=="1") form.ownSortOrder.value = "0";
	} else { // default orderBy is 0 or ASC
		form.ownSortOrder.value = "0";
	}
	form.ownSortBy.value = ownSortBy;
	form.submit();
}

//added by rjc 022205
function MM_sort_consortiaOrgIP(formName, orgSortBy, orgSortOrder) {
	var form = window.document.forms[formName];
	if (form.orgSortBy.value == orgSortBy) { // toggle if the same orderBy
		if (orgSortOrder=="") form.orgSortOrder.value = "0";
		else if (orgSortOrder=="0") form.orgSortOrder.value = "1";
		else if (orgSortOrder=="1") form.orgSortOrder.value = "0";
	} else { // default orderBy is 0 or ASC
		form.orgSortOrder.value = "0";
	}
	form.orgSortBy.value = orgSortBy;
	form.submit();
}

function validateLogo(form){

	if (trim(document.forms[form].logo.value).length == 0){
		alert("Image file is required");
		return false;
	}	
}

function trim(s){
	return s.replace( /^\s*/, "" ).replace( /\s*$/, "" );
}

function sendCountry(formName){
	var form = document.forms[formName];
	form.action = form.action + "#country";
	form.submit();
}

function evalCountry(formName,countryId) {
	var form = document.forms[formName];
	var action = form.action;
	form.action = action + "?submitCountry=" + countryId + "#country";
	form.submit();
}

// start of javascript
var cjoContext;
function getXMLHttpRequest() {
	var http_request = false;
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		if (http_request.overrideMimeType) {
           	http_request.overrideMimeType('text/xml');
		}
	} else if (window.ActiveXObject) { // IE
       	try {
           	http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
               	http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				alert("error: " + e);
			}
		}
	}
	return http_request;
}

function checkInput(label, elem) {
	if (null == elem.value || '' == elem.value) { return true; }

	var ok = false;
	var http_request = getXMLHttpRequest();
	if (!http_request) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	
	http_request.open("POST", cjoContext + "/validator?input=" + escape(elem.value), true);
	http_request.onreadystatechange = function() {
		if (http_request.readyState == 4) {
			if (http_request.status == 200) {
				// response is either valid / invalid
				if ("invalid" == http_request.responseText) {
					document.getElementById("msg").innerHTML = "<font color='red'>" + label + " is invalid.</font><br><br>";
					elem.value = "";
					elem.focus();
				} else {
					ok = true;
				}
			}
		}
	};
	
	http_request.send(null);
	return ok;
}

function isInputUnique(elem) {
	if (null == elem.value || '' == elem.value) { return true; }

	var ok = false;
	var http_request = getXMLHttpRequest();
	if (!http_request) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	
	http_request.open("POST", cjoContext + "/unique?field=" + escape(elem.name) + '&value=' + escape(elem.value), true);
	http_request.onreadystatechange = function() {
		if (http_request.readyState == 4) {
			if (http_request.status == 200) {
				// response is either valid / invalid
				if ("invalid" == http_request.responseText) {
					document.getElementById(elem.name + "Alert").innerHTML = "<font color='red'>'" + elem.value + "' is already in use.</font><br><br>";
					elem.value = "";
					elem.focus();
				} else {
					document.getElementById(elem.name + "Alert").innerHTML = "";
					ok = true;
				}
			}
		}
	};
	
	http_request.send(null);
	return ok;
}

function isInputUniqueUpdate(elem, memberId) {
	if (null == elem.value || '' == elem.value) { return true; }

	var ok = false;
	var http_request = getXMLHttpRequest();
	if (!http_request) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	
	http_request.open("POST", cjoContext + "/unique?field=" + escape(elem.name) + '&value=' + escape(elem.value) + '&memberId=' + escape(memberId), true);
	http_request.onreadystatechange = function() {
		if (http_request.readyState == 4) {
			if (http_request.status == 200) {
				// response is either valid / invalid
				if ("invalid" == http_request.responseText) {
					document.getElementById(elem.name + "Alert").innerHTML = "<font color='red'>'" + elem.value + "' is already in used.</font><br><br>";
					elem.value = "";
					elem.focus();
				} else {
					document.getElementById(elem.name + "Alert").innerHTML = "";
					ok = true;
				}
			}
		}
	};
	
	http_request.send(null);
	return ok;
}



// since country name is alphabetical, use it as key but display it as description
function Country(description, code) {
	this.description = description;
	this.code = code;
}

function State(code, description) {
	this.code = code;
	this.description = description;
}

var countryList;
var countryParam;
var stateParam;
function retrieveCountry() {
	var http_request = getXMLHttpRequest();
	if (!http_request) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}

	if (null == countryList || '' == countryList) {
		http_request.open("POST", cjoContext + "/country", true);
		http_request.onreadystatechange = function() {
			if (http_request.readyState == 4) {
				if (http_request.status == 200) {
					countryList = http_request.responseText;
					displayCountry(countryList);
				}
			}
		};
		http_request.send(null);
	} else {
		displayCountry(countryList);
	}
}

function displayCountry(data) {
	var code = '17';
	var myJSONObject = eval('(' + data + ')');
	countryParam = document.getElementById("country");
	for (i=0; i<myJSONObject.country.length;i++) {
		var ctry = new Country();
		ctry = myJSONObject.country[i];
		var new_option;
		new_option              = document.createElement('option');
		new_option.value        = ctry.description;
		new_option.text         = ctry.code;

		if (code == ctry.code) {
			new_option.selected = true;
		}
		countryParam.options.add(new_option);
	}
	
	if (document.all) {
		for (j=0; j<countryParam.length; j++) {
			if (code == countryParam.options[j].value) {
				countryParam.options[j].selected = true;
			}
		}		
	}
}

function retrieveState() {
	clear();
	countryParam = document.getElementById("country");

	var index = countryParam.selectedIndex;
	var code = '17';

	if (index > -1) {
		code = countryParam.options[index].value;
	}
	
	var http_request = getXMLHttpRequest();
	if (!http_request) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}

	http_request.open("POST", cjoContext + "/states?country=" + escape(code), true);
	http_request.onreadystatechange = function() {
		if (http_request.readyState == 4) {
			if (http_request.status == 200) {
				displayState(http_request.responseText);
			}
		}
	};
	http_request.send(null);
}

function displayState(data) {
	stateParam = document.getElementById("state");
	
	var stateList = data;
	
	var myJSONObject = eval('(' + stateList + ')');
	for (i=0; i<myJSONObject.state.length;i++) {
		var ste = new State();
		ste = myJSONObject.state[i];
		var new_option;
		new_option              = document.createElement('option');
		new_option.value        = ste.code;
		new_option.text         = ste.description;

		if (0 == i) {
			new_option.selected = true;
		}
		stateParam.options.add(new_option);
	}
	
	document.getElementById("currentCountry").value = countryParam.options[countryParam.selectedIndex].text;
	document.getElementById("currentState").value = stateParam.options[stateParam.selectedIndex].text;
}

function getState() {
	stateParam = document.getElementById("state");
	document.getElementById("currentState").value = stateParam.options[stateParam.selectedIndex].text;
}

function clear() {
	stateParam = document.getElementById("state");
	var ctr = stateParam.options.length;
	try {
		for (i=0; i<ctr;i++) {
			stateParam.removeChild(stateParam.options[i]);
		}
	} catch(e) {
		again();
	}
}

function again() {
	try {
		clear();
	} catch(e) {
		clear();
	}
}

function checkQuoteInput(label, elem) {
	if (null == elem.value || '' == elem.value) { return true; }

	var ok = false;
	var http_request = getXMLHttpRequest();
	if (!http_request) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	
	http_request.open("POST", cjoContext + "/validator?input=" + escape(elem.value), true);
	http_request.onreadystatechange = function() {
		if (http_request.readyState == 4) {
			if (http_request.status == 200) {
				// response is either valid / invalid
				if ("invalid" == http_request.responseText) {
					document.getElementById(elem.name + "alert").innerHTML = "<font color='red'>" + label + " is invalid.</font>";
					elem.value = "";
					if (elem.type != 'select') {
						elem.focus();
					}
				} else {
					ok = true;
				}
			}
		}
	};
	
	http_request.send(null);
	return ok;
}

function getQuote(formElem) {
	var ok = true;
	
	clearMessage(formElem);
	
	if (isEmpty(formElem.fname)) {
		document.getElementById(formElem.fname.name + "alert").innerHTML = "<font color='red'>Firstname is required.</font>";
		ok = false;
	} else {
		document.getElementById(formElem.fname.name + "alert").innerHTML = "";
	}
	
	if (isEmpty(formElem.lname)) {
		document.getElementById(formElem.lname.name + "alert").innerHTML = "<font color='red'>Lastname is required.</font>";
		ok = false;
	} else {
		document.getElementById(formElem.lname.name + "alert").innerHTML = "";
	}

	if (isEmpty(formElem.city)) {
		document.getElementById(formElem.city.name + "alert").innerHTML = "<font color='red'>City is required.</font>";
		ok = false;
	} else {
		document.getElementById(formElem.city.name + "alert").innerHTML = "";
	}

	if (isEmpty(formElem.zipcode)) {
		document.getElementById(formElem.zipcode.name + "alert").innerHTML = "<font color='red'>Zipcode is required.</font>";
		ok = false;
	} else {
		document.getElementById(formElem.zipcode.name + "alert").innerHTML = "";
	}

	if (isEmpty(formElem.address)) {
		document.getElementById(formElem.address.name + "alert").innerHTML = "<font color='red'>Address is required.</font>";
		ok = false;
	} else {
		document.getElementById(formElem.address.name + "alert").innerHTML = "";
	}

	if (isEmpty(formElem.email)) {
		document.getElementById(formElem.email.name + "alert").innerHTML = "<font color='red'>Email is required.</font>";
		ok = false;
	} else if (!checkEmail(formElem.email.value)) {
		document.getElementById(formElem.email.name + "alert").innerHTML = "<font color='red'>Email is invalid.</font>";
		ok = false;
	} else {
		document.getElementById(formElem.email.name + "alert").innerHTML = "";
	}

	return ok;
}

function clearMessage(formElem) {
	document.getElementById(formElem.title.name + "alert").innerHTML = "";
	document.getElementById(formElem.fname.name + "alert").innerHTML = "";
	document.getElementById(formElem.lname.name + "alert").innerHTML = "";
	document.getElementById(formElem.organisation.name + "alert").innerHTML = "";
	document.getElementById(formElem.consortium.name + "alert").innerHTML = "";
	document.getElementById(formElem.city.name + "alert").innerHTML = "";
	document.getElementById(formElem.zipcode.name + "alert").innerHTML = "";
	document.getElementById(formElem.address.name + "alert").innerHTML = "";
	document.getElementById(formElem.address2.name + "alert").innerHTML = "";
	document.getElementById(formElem.telephone.name + "alert").innerHTML = "";
	document.getElementById(formElem.email.name + "alert").innerHTML = "";

	document.getElementById(formElem.subscriptionNo.name + "alert").innerHTML = "";
	document.getElementById(formElem.fte.name + "alert").innerHTML = "";
	document.getElementById(formElem.subjectArea.name + "alert").innerHTML = "";
}

function FIGIMAGES2(wid,graphic,label,caption,notes,path,filename,dflag) {
	   var dtext = "Download This Figure.";
	   if(dflag == 'N') {
	   	dtext = "";
	   }
	   var hnd=window.open('',wid,'alwaysRaised=yes,modal=yes,dependent=no,toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=640,height=420,left=0,top=0');
	   hnd.document.write('<html><body><form method="submit"><table border="1"><tr><td><table cellpadding="2">');
	   hnd.document.write('<tr><td style="font-family:verdana,arial,sans-serif;font-size:10pt">');                                                        
	   hnd.document.write(label + " " + caption);
	   hnd.document.write('</td></tr>');
	   hnd.document.write('<tr><td style="font-family:verdana,arial,sans-serif;font-size:10pt">');                                                        
	   hnd.document.write('&nbsp;');
	   hnd.document.write('</td></tr>');
	   hnd.document.write('<tr valign="top" align="center">');
	   hnd.document.write('<td style="font-family:verdana,arial,sans-serif;font-size:10pt"><img src="' + graphic + '" type="gif" border="0"/></td></tr>');
	   hnd.document.write('<tr><td style="font-family:verdana,arial,sans-serif;font-size:10pt">');                                                        
	   hnd.document.write('&nbsp;');
	   hnd.document.write('</td></tr>');
	   hnd.document.write('<tr><td style="font-family:verdana,arial,sans-serif;font-size:10pt">');                                                        
	   hnd.document.write(notes);
	   hnd.document.write('</td></tr>');
	   hnd.document.write('<tr><td style="font-family:verdana,arial,sans-serif;font-size:10pt">');                                                        
	   hnd.document.write("&nbsp;");
	   hnd.document.write('</td></tr>');
	   hnd.document.write('<tr valign="top" align="center"><td style="font-family:verdana,arial,sans-serif;font-size:10pt">');                                                        
	   hnd.document.write('<p><a href="displayFulltext?downloadImage=png&path='+ path +'&filename='+filename+'">'+dtext+'</a></p>');
	   hnd.document.write('</td></tr>');
	   hnd.document.write('<tr><td style="font-family:verdana,arial,sans-serif;font-size:10pt">');                                                        
	   hnd.document.write("&nbsp;");
	   hnd.document.write('</td></tr>');
	   hnd.document.write('<tr valign="bottom"><td align="center"><input type="Button" onClick="window.close()" value="close"/></td></tr></table></td></tr></table></form></body></html>');
	   hnd.document.close();
	   
	}


function TABIMAGES(wid,graphic,label,caption) {
	   var dtext = "Download This Figure.";
	   if(dflag == 'N') {
	   	dtext = "";
	   }
	 
	   var hnd=window.open('',wid,'alwaysRaised=yes,modal=yes,dependent=no,toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=640,height=420,left=0,top=0');
	   hnd.document.write('<html><body><form method="submit"><table border="1"><tr><td><table cellpadding="2">');
	   hnd.document.write('<tr><td style="font-family:verdana,arial,sans-serif;font-size:10pt">');                                                        
	   hnd.document.write(label + " " + caption);
	   hnd.document.write('</td></tr>');
	   hnd.document.write('<tr valign="top" align="center">');
	   hnd.document.write('<td style="font-family:verdana,arial,sans-serif;font-size:10pt"><img src="' + graphic + '" type="gif" border="0"/></td></tr>');
	   hnd.document.write('<tr><td style="font-family:verdana,arial,sans-serif;font-size:10pt">');                                                        
	   hnd.document.write("&nbsp;");
	   hnd.document.write('</td></tr>');
	   hnd.document.write('<tr><td style="font-family:verdana,arial,sans-serif;font-size:10pt">');                                                        
	   hnd.document.write("&nbsp;");
	   hnd.document.write('</td></tr>');
	   hnd.document.write('<tr valign="bottom"><td align="center"><input type="Button" onClick="window.close()" value="close"/></td></tr></table></td></tr></table></form></body></html>');
	   hnd.document.close();
	   
	}


	function FIGIMAGES(wid,graphic,label,caption) {
	   var dtext = "Download This Figure.";
	   if(dflag == 'N') {
	   	dtext = "";
	   }
	 
	   var hnd=window.open('',wid,'alwaysRaised=yes,modal=yes,dependent=no,toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=640,height=420,left=0,top=0');
	   hnd.document.write('<html><body><form method="submit"><table border="1"><tr><td><table cellpadding="2">');
	   hnd.document.write('<tr><td style="font-family:verdana,arial,sans-serif;font-size:10pt">');                                                        
	   hnd.document.write(label + " " + caption);
	   hnd.document.write('</td></tr>');
	   hnd.document.write('<tr valign="top" align="center">');
	   hnd.document.write('<td style="font-family:verdana,arial,sans-serif;font-size:10pt"><img src="' + graphic + '" type="gif" border="0"/></td></tr>');
	   hnd.document.write('<tr><td style="font-family:verdana,arial,sans-serif;font-size:10pt">');                                                        
	   hnd.document.write("&nbsp;");
	   hnd.document.write('</td></tr>');
	   hnd.document.write('<tr><td style="font-family:verdana,arial,sans-serif;font-size:10pt">');                                                        
	   hnd.document.write("&nbsp;");
	   hnd.document.write('</td></tr>');
	   hnd.document.write('<tr valign="bottom"><td align="center"><input type="Button" onClick="window.close()" value="close"/></td></tr></table></td></tr></table></form></body></html>');
	   hnd.document.close();
	   
	}

