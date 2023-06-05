//Clears the txtKeywords textbox on focus if txtKeywords have default text and enables Search button
function clearAdvancedText(obj) {
    if (obj != null && getAdvancedButton() != null && getAdvancedSearch() != null && getHfldAdvanceKeywords() != null && getTxtVolume() != null && getTxtIssue().value != null && getTxtPageNumber().value != null) {
        if ((getAdvancedSearch().value == "Enter Keywords" && getHfldAdvanceKeywords().value == 'disableButton') || (getTxtVolume().value == '' || getTxtIssue().value == '' || getTxtPageNumber().value == '')) {
            //Explicitly check if the onfocus() method is called on txtKeywords textbox
            if (obj == getAdvancedSearch() && (getAdvancedSearch().value == "Enter Keywords" || getAdvancedSearch().value == "Search All Journals") && getHfldAdvanceKeywords().value == 'disableButton') {
                getAdvancedSearch().value = '';
                getHfldAdvanceKeywords().value = 'enableButton';
            }
            getAdvancedButton().disabled = false;
        }
    }
}
//On blur, if txtKeywords textbox is empty, default text is added and Search button is disabled
function defaultAdvancedText(obj) {
    if (obj != null && getAdvancedButton() != null && getAdvancedSearch() != null && getHfldAdvanceKeywords() != null && getTxtVolume() != null && getTxtIssue().value != null && getTxtPageNumber().value != null) {
        if ((trimDefaultAdvancedText(getAdvancedSearch().value) != "" && getHfldAdvanceKeywords().value == 'enableButton') || trimDefaultAdvancedText(getTxtVolume().value) != '' || trimDefaultAdvancedText(getTxtIssue().value) != '' || trimDefaultAdvancedText(getTxtPageNumber().value) != '') {
            getAdvancedButton().disabled = false;
        }
        else {
            getAdvancedButton().disabled = true;
            getTxtVolume().value = '';
            getTxtIssue().value = '';
            getTxtPageNumber().value = '';
        }
        //Explicitly check if the onblur() method is called on txtKeywords textbox to set default text
        if (obj == getAdvancedSearch() && trimDefaultAdvancedText(getAdvancedSearch().value) == "" && getHfldAdvanceKeywords().value == 'enableButton') {
            if (getContextJournalType() == "") {
                getAdvancedSearch().value = 'Search All Journals';
            }
            else {
                getAdvancedSearch().value = "Enter Keywords";
            }
            getHfldAdvanceKeywords().value = 'disableButton';
        }
    }
}

function citationTextChange() {

    if (typeof getTxtIssue == 'function' && typeof getTxtVolume == 'function' && typeof getTxtPageNumber == 'function') {

        if (getTxtIssue() != null && getTxtVolume() != null && getTxtPageNumber() != null) {
            
            getTxtIssue().disabled = trimDefaultAdvancedText(getTxtVolume().value) == '';
            if (getTxtIssue().disabled) {
                getTxtIssue().style.backgroundColor = "#CCC";
                getTxtIssue().value = '';
            }
            else {
                getTxtIssue().style.backgroundColor = "#FFF";
            }
            getTxtPageNumber().disabled = trimDefaultAdvancedText(getTxtIssue().value) == '';
            if (getTxtPageNumber().disabled) {
                getTxtPageNumber().style.backgroundColor = "#CCC";
                getTxtPageNumber().value = '';
            }
            else {
                getTxtPageNumber().style.backgroundColor = "#FFF";
            }
        }
    }
}

function trimDefaultAdvancedText(val) {
    var trimmedText = val.replace(/^\s+/, '');
    trimmedText = trimmedText.replace(/\s+$/, '');

    return trimmedText;
}

//Clears the txtKeywords textbox on focus if txtKeywords have default text and enables Search button
function clearNewSearchText(obj) {
    if (obj != null && getNewSearchHfldKeywords() != null && getNewSearchButton() != null) {
        if ((obj.value == 'Enter Keywords' || obj.value == 'Search All Journals') && getNewSearchHfldKeywords().value == 'disableButton') {
            obj.value = '';
            getNewSearchHfldKeywords().value = 'enableButton';
        }
        getNewSearchButton().disabled = false;
    }
}

//On blur, if txtKeywords textbox is empty, default text is added and Search button is disabled
function defaultNewSearchText(obj) {
    if (obj != null && getNewSearchHfldKeywords() != null && getNewSearchButton() != null) {
        if (trimDefaultNewSearchText(obj.value) == "") {
            if (getContextJournalType() == "") {
                obj.value = 'Search All Journals';
            }
            else {
                obj.value = 'Enter Keywords';
            }
            getNewSearchButton().disabled = true;
            getNewSearchHfldKeywords().value = 'disableButton';
        }
    }
}

function trimDefaultNewSearchText(val) {
    var trimmedText = val.replace(/^\s+/, '');
    trimmedText = trimmedText.replace(/\s+$/, '');

    return trimmedText;
}

function search_pageLoad(sender, args) {

    if (getHfldKeywords().value == 'enableButton') {
        getButton().disabled = false;
    }

    if (typeof getHfldAdvanceKeywords == 'function' && getHfldAdvanceKeywords != undefined) {
        if (getAdvancedButton() != null && getTxtVolume() != null && getTxtIssue().value != null && getTxtPageNumber().value != null) {
            if (getHfldAdvanceKeywords().value == 'enableButton' || getTxtVolume().value != '' || getTxtIssue().value != '' || getTxtPageNumber().value != '') {
                getAdvancedButton().disabled = false;
            }
        }
    }
}

//Clears the txtKeywords textbox on focus if txtKeywords have default text and enables Search button
function clearText(obj) {
    if (obj != null && getHfldKeywords() != null && getButton() != null) {
        if ((obj.value == 'Enter Keywords' || obj.value == 'Search All Journals') && getHfldKeywords().value == 'disableButton') {
            obj.value = '';
            getHfldKeywords().value = 'enableButton';
        }
        getButton().disabled = false;
    }
}

//On blur, if txtKeywords textbox is empty, default text is added and Search button is disabled
function defaultText(obj) {
    if (obj != null && getHfldKeywords() != null && getButton() != null) {
        if (trimDefaultText(obj.value) == "") {
            if (getContextJournalType() == "") {
                obj.value = 'Search All Journals';
            }
            else {
                obj.value = 'Enter Keywords';
            }
            getButton().disabled = true;
            getHfldKeywords().value = 'disableButton';
        }
    }
}

function trimDefaultText(val) {
    var trimmedText = val.replace(/^\s+/, '');
    trimmedText = trimmedText.replace(/\s+$/, '');

    return trimmedText;
}

var searchesDiv;
var parentDiv;
var hrefRecent;

function toggleSearchesDiv(id, parentDivId, thisId) {
    hrefRecent = thisId;
    searchesDiv = document.getElementById(id);

    if (searchesDiv.style.display == 'none') {
        searchesDiv.style.display = 'block';
        document.body.onmouseover = hideSearchesDiv;
        hrefRecent.className = 'ej-search-options-recent';
        parentDiv = document.getElementById(parentDivId)
        parentDiv.style.zIndex = 1;
    }
    else {
        hideSearchesDiv();
    }
}
function hideSearchesDiv() {
    if (searchesDiv != null) {
        searchesDiv.style.display = 'none';
    }
    if (parentDiv != null) {
        parentDiv.style.zIndex = 0;
    }
    if (hrefRecent != null) {
        hrefRecent.className = '';
    }

    document.body.onmouseover = null;    // Remove event handler when it's no longer needed
}
Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(ejournals_pageLoad);
Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(search_pageLoad);
Sys.WebForms.PageRequestManager.getInstance().add_pageLoaded(citationTextChange);
