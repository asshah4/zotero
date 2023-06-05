function ItemListActionsControl_DisableSubmit() {
    submitButton.disabled = ([ddlActions.selectedIndex] == 0);
}

function InstitutionWrapperControl_ImageMouseOut() {
    UnTip();
}

function InstitutionWrapperControl_ShowRollOverInstitutionsDetails(htmlText, rolloverDisplayMilliseconds) {
    Tip(htmlText, BORDERWIDTH, 0, SHADOW, false, BGCOLOR, '', WIDTH, 0, DELAY, rolloverDisplayMilliseconds);
}

function showExportToCitationPopUpOnclick() {
    $find(showExportToCitationPopUp()).show();
}

function ArticleTools_ShowAddToMyCollectionsPopUp() {
    addToMyCollectionsLinkClicked('');
    showAddToMyCollectionPopUp();
}

function ArticleTools_ShowEmailToColleaguePopUp() {
    addToMyCollectionsLinkClicked('');
    showEmailToColleaguePopUp();
}

function showRightslinkPopUp(url, publisherName, publication, title, publicationDate, author, volumeNum, issueNum, copyright, contentID) {
    var location = url
                + "?publisherName=" + encodeURI(publisherName)
                + "&publication=" + encodeURI(publication)
                + "&title=" + encodeURI(title)
                + "&publicationDate=" + encodeURI(publicationDate)
                + "&author=" + encodeURI(author)
                + "&volumeNum=" + encodeURI(volumeNum)
                + "&issueNum=" + encodeURI(issueNum)
                + "&copyright=" + encodeURI(copyright)
                + "&contentID=" + encodeURI(contentID)
                + "&orderBeanReset=" + encodeURI('True');
    window.open(location, 'Rightslink', 'location=no,toolbar=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=650,height=550');
}

function restoreKeywords() {

    var keywords = getArticleKeywords();
    getKeywordTextID().value = keywords;
    getbtnSearchId().disabled = false;
}

function enableDisableButton() {

    var keywordTextArea = getKeywordTextID();

    if (keywordTextArea.value == null || keywordTextArea.value.trim() == "") {
        getbtnSearchId().disabled = true;
    }
    else {
        getbtnSearchId().disabled = false;
    }
}

function setTextSize(size) {
    getElementReferences();
    textDiv.style.fontSize = size;

    var smallText = document.getElementById('smallText');
    var medText = document.getElementById('medText');
    var largeText = document.getElementById('largeText');

    switch (size) {
        case 'Small':
            smallText.style.textDecoration = 'none';
            smallText.style.fontWeight = 'bold';
            medText.style.textDecoration = 'underline';
            medText.style.fontWeight = 'normal';
            largeText.style.textDecoration = 'underline';
            largeText.style.fontWeight = 'normal';
            break;
        case 'Medium':
            smallText.style.textDecoration = 'underline';
            smallText.style.fontWeight = 'normal';
            medText.style.textDecoration = 'none';
            medText.style.fontWeight = 'bold';
            largeText.style.textDecoration = 'underline';
            largeText.style.fontWeight = 'normal';
            break;
        case 'Large':
            smallText.style.textDecoration = 'underline';
            smallText.style.fontWeight = 'normal';
            medText.style.textDecoration = 'underline';
            medText.style.fontWeight = 'normal';
            largeText.style.textDecoration = 'none';
            largeText.style.fontWeight = 'bold';
            break;
    }
}

// This function is called if flash player component is installed
function setFlashImageProperties(imgUrl) {
    // Get the megazoom.swf url
    if (getSwfUrl() != null && getZoomStep() != null && getZoomStart() != null && getZoomMax() != null && getNavigatorVisibility() != null && getNavigatorMode() != null && getNavigatorSize() != null) {
        var swfUrl = getSwfUrl();
        var zoomStep = getZoomStep();
        var zoomStart = getZoomStart();
        var zoomMax = getZoomMax();
        var navigatorVisibility = getNavigatorVisibility();
        var navigatorMode = getNavigatorMode();
        var navigatorSize = getNavigatorSize();
    }

    var swf = new SWFObject(swfUrl, "ej-box-modal-image-flash", getSWFWidth(), getSWFHeight(), "9.0.0", "#FFFFFF", true)
    swf.addParam("scale", "noscale");
    swf.addParam("salign", "lt");
    swf.addParam("wmode", "transparent");
    swf.addVariable("contentWidth", getSWFWidth())
    swf.addVariable("contentHeight", getSWFHeight())
    swf.addVariable("imageUrl", imgUrl.toString());
    swf.addVariable("imageButton", "false");
    swf.addVariable("zoomMax", zoomMax);
    swf.addVariable("zoomStep", zoomStep);
    swf.addVariable("zoomStart", zoomStart);
    swf.addVariable("navigator", navigatorVisibility);
    swf.addVariable("navigatorSize", navigatorSize);
    swf.addVariable("navigatorMode", navigatorMode);
    swf.write("ej-box-modal-image-flash")
}

function validatePhone() {

    if (typeof getPhone1Field == 'function' && getPhone1Field != undefined) {
        var txtPhone1 = getPhone1Field();
    }

    if (typeof getPhone2Field == 'function' && getPhone2Field != undefined) {
        var txtPhone2 = getPhone2Field();
    }

    if (typeof getPhone3Field == 'function' && getPhone3Field != undefined) {
        var txtPhone3 = getPhone3Field();
    }

    if (typeof getPhoneType1Field == 'function' && getPhoneType1Field != undefined) {
        var cmbPhoneType1 = getPhoneType1Field();
    }

    if (typeof getPhoneType2Field == 'function' && getPhoneType2Field != undefined) {
        var cmbPhoneType2 = getPhoneType2Field();
    }

    if (typeof getPhoneType3Field == 'function' && getPhoneType3Field != undefined) {
        var cmbPhoneType3 = getPhoneType3Field();
    }
    if (txtPhone1 != null) {
        if (txtPhone1.value != '' && cmbPhoneType1.selectedIndex == 0) {
            alert('Please select phone type for Phone 1');
            cmbPhoneType1.focus();
            return false;
        }
    }
    if (txtPhone2 != null) {
        if (txtPhone2.value != '' && cmbPhoneType2.selectedIndex == 0) {
            alert('Please select phone type for Phone 2');
            cmbPhoneType2.focus();
            return false;
        }
    }
    if (txtPhone3 != null) {
        if (txtPhone3.value != '' && cmbPhoneType3.selectedIndex == 0) {
            alert('Please select phone type for Phone 3');
            cmbPhoneType3.focus();
            return false;
        }
    }
    return true;
}

function controlEnter(obj, event) {
    if (obj != null) {
        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        if (keyCode == 13) {
            var enterButton = document.getElementById(obj)
            if (enterButton != null) {
                enterButton.click();
            }
            return false;
        }
        else {
            return true;
        }
    }
}

//Start My Collections Navigator JS
function afterHeaderClick(gridName, ColID, Btn) {
    rowIndex = ColID.split("_");
    col = rowIndex[2];
    if ((rowIndex[2] == 0) && rowIndex[1] == "c") {
        var col = igtbl_getElementById(ColID);
        if (col.innerText != "") {
            col.style.fontWeight = "bold";
            col.style.textDecoration = "none";
            var index = col.innerHTML.indexOf(';');
            if (index == -1) {
                index = col.innerHTML.indexOf('<');
                col.innerHTML = col.innerHTML.substring(0, index) + "&nbsp;" + col.innerHTML.substring(index);
            }

        }
    }
}

function beforeHeaderClick(gridName, ColID, Btn) {
    rowIndex = ColID.split("_");
    col = rowIndex[2];
    if ((rowIndex[2] == 0) && rowIndex[1] == "c") {
        var col = igtbl_getElementById(ColID);
        col.parentNode.childNodes[0].style.fontWeight = "normal";
        col.parentNode.childNodes[2].style.fontWeight = "normal";
        col.parentNode.childNodes[0].innerText = "Name";
        col.parentNode.childNodes[0].innerHTML = "Name";
        col.parentNode.childNodes[2].innerText = "Modified";
        col.parentNode.childNodes[2].innerHTML = "Modified";
        col.parentNode.childNodes[0].style.textDecoration = "underline";
        col.parentNode.childNodes[2].style.textDecoration = "underline";
    }
}

function onLoadStyle(gridName) {
    //get the grid object from grid id
    var grid = igtbl_getGridById(gridName);
    grid.Element.childNodes[1].childNodes[0].childNodes[0].style.fontWeight = "bold";
    grid.Element.childNodes[1].childNodes[0].childNodes[1].style.cursor = "default";
    grid.Element.childNodes[1].childNodes[0].childNodes[2].style.textDecoration = "underline";
    grid.Element.childNodes[1].childNodes[0].childNodes[0].innerText = "Name <img src='/_layouts/1033/images/OAKS.Journals/icon-sort.gif'></img>";
    grid.Element.childNodes[1].childNodes[0].childNodes[0].innerHTML = "Name <img src='/_layouts/1033/images/OAKS.Journals/icon-sort.gif'></img>";
}
//End of My Collections Navigator JS

//Start Saved Search Grid JS 
function afterHeaderofGridClick(gridName, ColID, Btn) {
    rowIndex = ColID.split("_");
    col = rowIndex[2];
    if ((rowIndex[2] == 0) && rowIndex[1] == "c") {
        var col = igtbl_getElementById(ColID);
        if (col.innerText != "") {
            col.style.fontWeight = "bold";
            col.style.textDecoration = "none";
            var index = col.innerHTML.indexOf(';');
            if (index == -1) {
                index = col.innerHTML.indexOf('<');
                col.innerHTML = col.innerHTML.substring(0, index) + "&nbsp;" + col.innerHTML.substring(index);
            }
        }
    }
}

function beforeHeaderofGridClick(gridName, ColID, Btn) {
    rowIndex = ColID.split("_");
    col = rowIndex[2];
    if ((rowIndex[2] == 0) && rowIndex[1] == "c") {
        var col = igtbl_getElementById(ColID);
        col.parentNode.childNodes[0].style.fontWeight = "normal";
        col.parentNode.childNodes[1].style.fontWeight = "normal";
        col.parentNode.childNodes[0].innerText = "Search Name";
        col.parentNode.childNodes[0].innerHTML = "Search Name";
        col.parentNode.childNodes[1].innerText = "Saved";
        col.parentNode.childNodes[1].innerHTML = "Saved";
        col.parentNode.childNodes[0].style.textDecoration = "underline";
        col.parentNode.childNodes[1].style.textDecoration = "underline";
    }
}

function onLoadofGridStyle(gridName) {
    //get the grid object from grid id
    var grid = igtbl_getGridById(gridName);
    grid.Element.childNodes[1].childNodes[0].childNodes[0].style.fontWeight = "bold";
    grid.Element.childNodes[1].childNodes[0].childNodes[1].style.textDecoration = "underline";
    grid.Element.childNodes[1].childNodes[0].childNodes[2].style.cursor = "default";
    grid.Element.childNodes[1].childNodes[0].childNodes[0].innerText = "Search Name <img src='/_layouts/1033/images/OAKS.Journals/icon-sort.gif'></img>";
    grid.Element.childNodes[1].childNodes[0].childNodes[0].innerHTML = "Search Name <img src='/_layouts/1033/images/OAKS.Journals/icon-sort.gif'></img>";
}
//End of Saved Search Grid JS

//Start Session Timeout Pop up JS
function closeTimeoutPopup() { getTimeoutPopup().hide(); }
//End of Session Timeout Pop up JS

//Start Feedback JS

//Clears the textbox on focus if textbox have default text.
function clearFeedbackText(obj) {
    if (obj != null) {
        if (obj.value == 'Enter your email address' || obj.value == 'Enter your full name' || obj.value == 'Enter your comments') {
            obj.value = '';
        }
    }
}

//On blur, if textbox is empty, default text is added.
function defaultFeedbackText(obj) {
    if (obj != null && getTxtEmailAddress() != null && getTxtFullName() != null && getTxtComments() != null) {
        if (obj.value == "") {
            if (obj == getTxtEmailAddress()) {
                obj.value = 'Enter your email address';
            }
            if (obj == getTxtFullName()) {
                obj.value = 'Enter your full name';
            }
            if (obj == getTxtComments()) {
                obj.value = 'Enter your comments';
            }
        }
    }
}

//Onkeypress,determines the count that is left that can be accepted by the textbox.
function countLeft(field, max) {
    if (field != null && getHfldRemainingCharacterCount() != null && getLbldRemainingCharacterCount() != null) {
        if (field.value.length > max) {
            field.value = field.value.substring(0, max);
        }
        else {
            getHfldRemainingCharacterCount().value = max - field.value.length;
            getLbldRemainingCharacterCount().innerHTML = getHfldRemainingCharacterCount().value;
        }
    }
}

//Onkeyup,determines whether the maximum length of textbox is reached.
function textBoxMaxLength() {
    if (getTxtComments() != null) {
        if (getTxtComments().value.length >= 500) {
            return false;
        }
        return true;
    }
}

//End Feedback JS

//For EULA on Membership

function onEULAChkAcknowledge_Click() {

    var btnVariable = getCompleteRegistrationButton();

    if (btnVariable != null) {

        if (btnVariable.disabled == true) {
            btnVariable.disabled = false;
        }
        else {
            btnVariable.disabled = true;
        }
    }

}
//End of EULA on Membership

function ReverseContentDisplay(d) {
    if (d.length < 1) { return; }
    if (document.getElementById(d).style.display == "none") { document.getElementById(d).style.display = "block"; }
    else { document.getElementById(d).style.display = "none"; }
}

