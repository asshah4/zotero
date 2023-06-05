

function toggleList(id){
    if(document.getElementById) {
        var le = document.getElementById(id);
        le.style.display = (le.style.display == 'none') ? 'block' : 'none';
    }
}


//javascript check for quick search box

function jump2form(d) {
	d.searchStr.select();
	d.searchStr.focus();
}
function jump2formAdv(d) {
	d.key.select();
	d.key.focus();
}
function isblank(s) {
	for(var i = 0; i < s.length; i++) {
		var c = s.charAt(i);
		if ((c != ' ') && (c != '\n') && (c != '\t')) {
			return false;
		}
	}
	return true;
}

function searchformcheck(d) {
	var e = d.searchStr.value;
	if ((e == null) || (e == "") || (e == "<search>") || isblank(e)) {
		alert("Please enter word and click 'Search'.");
		jump2form(d);
		return false;
	}
	else {
		return true;
	}
	return false;
}

function searchformcheckAdv(d) {
	var e = d.key.value;
	if ((e == null) || (e == "") || (e == "<search>") || isblank(e)) {
		alert("Please enter word and click 'Search'.");
		jump2formAdv(d);
		return false;
	}
	else {
		return true;
	}
	return false;
}

/*function keywordFilled(d) {
	var s = d.value;
	if (s == "Enter Any Word")			
	d.value = "";
	d.style.color="black";
}*/

function keywordFilled() {
	var s = document.search_form.possible1.value;
	if (s == "Enter Any Word")			
	document.search_form.possible1.value = "";
}


/*submitting form */

 
function submitForm()
{
  // Hide the code in first div tag
  document.getElementById('formDiv').style.display = 'none';
 
  // Display code in second div tag
  document.getElementById('please-wait').style.display = 'block';
 
}

//**********************************************//





//Used to open a printer friendly window 
function openPrinterFriendlyWindow(url) { 
// openPrinterFriendly spawns a window with the printer friendly version of this page 
var x = 660; var y = 480; 

if (navigator.appVersion.indexOf("Mac") > 0) { 
openWindow(url, "width=" + x + ",height=" + y + ",toolbar=yes,resizable=yes,scrollbars=yes"); 
} else { openWindow(url, "width=" + x + ",height=" + y + ",status=yes,menubar=yes,toolbar=yes,resizable=yes,scrollbars=yes"); 
} 
} 

//Opens a window 

function openWindow(url, optionString) { 
window.open(url, "", optionString); 
} 
//closes a window 

function closeWindow() { 
window.close(); 
}