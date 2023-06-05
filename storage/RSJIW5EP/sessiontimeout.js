/// <reference name="MicrosoftAjax.js"/>

function startSessionTimeout() {
    $get("openPopupTimeoutId").value = setTimeout(openSessionTimeoutPopup, sessionTimeout - warningInterval);
    $get("endSessionTimeoutId").value = setTimeout(endSession, sessionTimeout);
}

function openSessionTimeoutPopup() {
    window.open("/_layouts/1033/oaks.journals/error/sessiontimeout.html", "sessionTimeoutPopup", "width=615,height=238;location=no;menubar=no;scroll=no");
}

function endSession() 
{
    window.location = sessionEndUrl;
}
