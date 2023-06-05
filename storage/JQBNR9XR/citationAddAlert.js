function resetCitationAlertForm() {
	if(document.getElementById('add_alert_field') != null) {
		document.getElementById('add_alert_field').style.display = 'block';	
		document.getElementById('alertnameConfirmation').style.display = 'none';	
		document.getElementById('add_alert_ok_btn_container').style.display = 'none';	
	}
}

function openAddCitationAlertPopup () {
	if (document.getElementById('add_collex_alert_container').style.display == "none" || document.getElementById('add_collex_alert_container').style.display == "") {
		positionAlertPopup();
		document.getElementById('add_collex_alert_container').style.display = 'block';	
	} else { 	
		document.getElementById('add_collex_alert_container').style.display = 'none';
	}
}

function closeAddCitationAlertPopup() {
	document.getElementById('add_collex_alert_container').style.display = 'none';
	resetCitationAlertForm();
}

function positionAlertPopup () {
	document.getElementById('add_collex_alert_container').style.position='absolute';
	var linkleft = document.getElementById('createCitationAlert').offsetLeft;
	var tmpx = (document.documentElement.clientWidth - 1000) / 2;

	if (navigator.appName.indexOf("Microsoft") != -1) {
		if (navigator.appVersion.indexOf("MSIE 6.0") != -1 || navigator.appVersion.indexOf("MSIE 7.0") != -1) {
			linkleft =  linkleft + tmpx + 515;
			document.getElementById('add_collex_alert_container').style.top = document.getElementById("createCitationAlert").offsetTop + 350 + "px";
		} else {
			linkleft =  linkleft + tmpx - 450;
			document.getElementById('add_collex_alert_container').style.top = document.getElementById("createCitationAlert").offsetTop + 10 + "px";
		}
	} else { 
		linkleft =  linkleft + tmpx - 450;
		document.getElementById('add_collex_alert_container').style.top = document.getElementById("createCitationAlert").offsetTop + 10 + "px";
	}

	document.getElementById('add_collex_alert_container').style.left = linkleft + "px";

}

function saveCitationAlert(userId, alertName, alertQuery) {
	saveCitationAlerts(userId, alertName, alertQuery);

	document.getElementById('add_alert_field').style.display = 'none';
	document.getElementById('alertnameConfirmation').style.display = 'block';
	document.getElementById('alertnameConfirmation').innerHTML = '<img src="/images/ajax-loader-small.gif" alt="" hspace="12" />';
	document.getElementById('add_alert_ok_btn_container').style.display = 'block';
	return false;
}

function setCitationAlertMessage(content) {
	if (content == 'true') {
		document.getElementById('alertnameConfirmation').innerHTML = 'The Citation alert has been created';
	} else {
		document.getElementById('alertnameConfirmation').innerHTML = 'Not able to create the Citation alert. Please try later';
	}
}
