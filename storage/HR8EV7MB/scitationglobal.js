<!--

/*
Global functions for Scitation
Paolo Vaca
pvaca@aip.org
Updated:Feb 10 2005

Jul 07 2005
:added PopUpFull for author select popup

*/

function updateSpie(url) {
    if (opener && !opener.closed)
        opener.location=url;
    else {
		var spie = window.open(url,'SPIEDL','menubar,toolbar,location,directories,status,scrollbars,resizable,dependent,width=800,height=600,left=0,top=0');
        opener = spie;
    }
   opener.focus(); 
}

function updateOpener() {
    opener.location.href = opener.location.href;
}

function openWindow(baseURL) {
	openPopup = window.open(baseURL,'open_window','menubar,toolbar,location,directories,status,scrollbars,resizable,dependent,width=800,height=600,left=0,top=0');
    openPopup.focus(); 
}

function openWindowCustom(baseURL,w,h) {
	openPopup = window.open(baseURL,'open_window','width='+w+',height='+h+',toolbars=0,scrollbars=1,location=no,statusbars=0,menubar=0,resize=no,top=50,left=50');
    openPopup.focus(); 
}

// rightslink popup
function PopUpRL(location) {
	Rightslink = window.open(location, 'Rightslink', 'location=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=700,height=560');
    Rightslink.focus(); 
}


function HR (element) {
    newClassName="unChecked" 
     if (element.checked) { newClassName="Checked" }
    while (element.tagName.toUpperCase() != 'TR' && element != null)
        element = document.all ? element.parentElement : element.parentNode;
    element.className = newClassName
}


function PopUp(W,H,anchor,source) {
    helppop = window.open('/jhtml/scitation/popups/popup_open.jsp?anchor=' + escape(anchor) + '&contentSource=' + escape(source),'newwin','width='+W+',height='+H+',toolbars=0,scrollbars=0,location=no,statusbars=0,menubar=0,resize=no,top=50,left=50');
	helppop.moveTo(50,50);
    helppop.focus();        // Put help window on top.
}

function PopUpFull(W,H,anchor,source) {
    helppop = window.open('/jhtml/scitation/popups/popup_open.jsp?anchor=' + escape(anchor) + '&contentSource=' + escape(source),'newwin','width='+W+',height='+H+',menubar,toolbar,location,directories,status,scrollbars,resizable,dependent,width=800,height=600,left=0,top=0');
	helppop.moveTo(50,50);
    helppop.focus();        // Put help window on top.
}

///date
months = new Array();
months[1] = "January";  months[7] = "July";
months[2] = "February"; months[8] = "August";
months[3] = "March";    months[9] = "September";
months[4] = "April";    months[10] = "October";
months[5] = "May";      months[11] = "November";
months[6] = "June";     months[12] = "December";

months2 = new Array();
months2[1] = "Jan"; months2[7] = "Jul";
months2[2] = "Feb"; months2[8] = "Aug";
months2[3] = "Mar"; months2[9] = "Sep";
months2[4] = "Apr"; months2[10] = "Oct";
months2[5] = "May"; months2[11] = "Nov";
months2[6] = "Jun"; months2[12] = "Dec";

days = new Array();
days[1] = "Sunday";    days[5] = "Thursday";
days[2] = "Monday";    days[6] = "Friday";
days[3] = "Tuesday";   days[7] = "Saturday";
days[4] = "Wednesday";

days2 = new Array();
days2[1] = "Sun"; days2[5] = "Thu";
days2[2] = "Mon"; days2[6] = "Fri";
days2[3] = "Tue"; days2[7] = "Sat";
days2[4] = "Wed";

todaysdate = new Date();
date  = todaysdate.getDate();
day  = todaysdate.getDay() + 1;
month = todaysdate.getMonth() + 1;
yy = todaysdate.getYear();
year = (yy < 1000) ? yy + 1900 : yy;
year2 = 2000 - year; year2 = (year2 < 10) ? "0" + year2 : year2;

dateline = days[day] + ", " + months[month] + " " + date + ", " + year;







//-->
