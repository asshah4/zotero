/* Function to go to selected item in drop down menu */
function GoTo(sel, targetstr)
{
  var index = sel.selectedIndex;
  if (sel.options[index].value != '') {
	 if (targetstr == 'blank') {
	   window.open(sel.options[index].value, 'win1');
	 } else {
	   var frameobj;
	   if ((frameobj = eval(targetstr)) != null)
		 frameobj.location = sel.options[index].value;
	 }
  }
}

function toggleList(heading, list)
{
    if(heading.className.match('.*expanded')) {
        list.style.display='none';
        heading.className='loiListHeading collapsed';
    }
    else {
        list.style.display='block';
        heading.className='loiListHeading expanded';
    }
}

/* Function to open up a new browser window, without a navigation bar */
function newWindow(url)
{
    var new_window;
    var windowProperties;
    windowProperties = "width=750,height=700,top=30,left=230,toolbar=0,menubar=0,resizable=1,scrollbars=yes";
    if(new_window==null) {
       new_window = window.open(url,null,windowProperties);
    } else {
       new_window.document.replace(url);
    }
}

function changeAll(toggle) {
	var boxGroup=document.getElementById("advSearchPubList").getElements("publication");
	updateChecks(boxGroup,toggle);
}

function updateChecks(boxGroup,toggle) {
	var max=boxGroup.length;
	if (toggle=="select") {
		for (var count=0; count < max; count++) {
			boxGroup[count].checked=true;
		}
	}
	else {
		for (var count=0; count < max; count++) {
			boxGroup[count].checked=false;
		}
	}
}

// restricts search by field x and value y
function searchRestrict(aForm, aField, aValue)
{
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = aField;
    input.value = aValue;
    aForm.appendChild(input);

    // reset start page and show results from first page
    var startPage = aForm.startPage;
    if(startPage) startPage.value = 0;

    aForm.submit();
}

// remove input with given value and name
function removeRestrict(aForm, aField, aValue)
{
    var input = aForm[aField];
    if(typeof input == 'undefined' || input == null) {
        return;
    } else if (typeof input.length != 'undefined') {
        var i;
        for (i = 0; i < input.length; i++) {
            var inputLowerCase = input[i].value.toLocaleLowerCase();
            var aValueLowerCase = aValue.toLowerCase();
            if (inputLowerCase == aValueLowerCase) {
                input[i].value = '';
                input[i].parentNode.removeChild(input[i]);
            }
        }
    } else if (input.value.toLowerCase() == aValue.toLowerCase()) {
        input.value = '';
        input.parentNode.removeChild(input);
    }

    // there are also inputs of type field1=author&text1=xName, remove also these instances
    // before submiting form
    for(var j=0; j < aForm.elements.length; j++) {
        var currElement = aForm.elements[j];
        if(currElement.value.toLocaleLowerCase() == aValue.toLocaleLowerCase()) {
            currElement.value = '';
        }
    }
    aForm.submit();
}

function clearInputs(aForm) {
    for(var i=0; i < aForm.elements.length; i++) {
        var elem=aForm.elements[i];
        var elemType = elem.type;

        if(elemType == "text")
            elem.value="";
        else if(elemType == "checkbox")
            elem.checked = "";
        else if(elemType == "radio")
            elem.selected = "";
    }
}
function validateCQSearchInputs(aForm) {
    if (aForm.elements[0].value == 'Enter Search Term' && aForm.elements[1].value == 'Any Author'
            && aForm.elements[2].value == '') {
        aForm.elements[0].value = '';
        aForm.elements[1].value = '';
        aForm.submit();
    }

    for (var i = 0; i < aForm.elements.length; i++) {
        var currInput = aForm.elements[i];
        if (currInput.value == 'Enter Search Term' || currInput.value == 'Any Author') {
            currInput.value = '';
        }
    }
    aForm.submit();
}
function submitQuickSearch(aForm) {
    aForm.submit();
}