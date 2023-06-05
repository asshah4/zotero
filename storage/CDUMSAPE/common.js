var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};

function debug_alert( message ) {
	return alert( message );
}

function MM_preloadImages() { //v3.0
  var d=document;
  if(d.images){
    if(!d.MM_p)
      d.MM_p=new Array();
  var i,j=d.MM_p.length,a=MM_preloadImages.arguments;
  for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){
      d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];
    }
  }
  defineHiddenInput(0, "", null);
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr;
  for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++)
    x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;
  if(!d) d=document;
  if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);
  }
  if(!(x=d[n])&&d.all)
    x=d.all[n];
  for (i=0;!x&&i<d.forms.length;i++)
    x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++)
    x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById)
    x=d.getElementById(n);

  return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments;
  document.MM_sr=new Array;
  for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null) {
     document.MM_sr[j++]=x;
     if(!x.oSrc)
       x.oSrc=x.src;
       x.src=a[i+2];
   }
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function confirmLink(warning_txt, url_1, url_2) {

	if (confirm(warning_txt))
		return url_1;
	else
		return url_2;
}

function JavaScriptTest() {
   document.forms[0].JavaScript.value="Yes";
}

function noenter() {
	return !(window.event && (window.event.keyCode == 13));
}

function set_new_window_props() {
    var winprops;

    var win_w = parseInt(screen.width * .85);
    var win_h = parseInt(screen.height * .70);

    winprops = 'height='+ win_h +',width='+ win_w +',top=70,left=60,toolbar=yes,menubar=yes,'+
               'resizable=yes,scrollbars=yes,status=no';

	return winprops;
}

//Open new browser window
// NOTE: This won't work in IE if the winName has spaces in it.
function openBrWindow(theURL,winName,features) {
		if(typeof features !='object'){
			features=set_new_window_props();
		}

		newWindow = window.open(theURL,winName,features);
		if (newWindow != null && !newWindow.closed)
		{
			newWindow.focus();
		}

        return false;
}

// open a new window. not using openBrWindow because of a quirk.
function open_window (name, url, props) {
  var newwindow;
  var is_safari = navigator.userAgent.indexOf('Safari')>0;

  if (is_safari) {
      newwindow = window.open("", name, props);
      if (newwindow != null) { newwindow.close(); };
  }

  newwindow = window.open(url, name, props);

  if (window.focus) { newwindow.focus(); }

  return false;
}

// NOTE: This won't work in IE if the winName has spaces in it.
function open_location(theURL,winName,features) {
    if(winName.length){
        return openBrWindow(theURL,winName,'');
    }else{
        return true;
    }
}

function go_to_url( url ) {
    if(url.length){
    	window.location = url;
    	return true;
    } else {
    	return false;
    }
}

// display Help in new window
function show_help(url) {
	return openBrWindow(url,'Help');
}

function open_opac(winName) {
    var theURLobject =  document.getElementById('opac');
    var theURL = theURLobject.value;
    if(winName.length){
        return openBrWindow(theURL,winName,'');
    }else{
        window.location.replace(theURL);
    }
}

function open_ncbi(winName, theURL) {
    if(winName.length){
        return openBrWindow(theURL,winName,'');
    }else{
        window.location.replace(theURL);
    }
}

//for Quick Search  from home page
//If textbox has "Enter a topic search" do nothing
//If textbox is empty display "Enter a topic search"
//If textbox has a term , search it
function submit_quicksearch_go() {
   var quicksearch = document.forms[0].qs_topic.value;
   if(quicksearch.length > 0)
   {
      if(quicksearch == "Enter a topic")
      {
         return false;
      }
      else
      {
        return true;
      }
   }
   else
   {
      document.forms[0].qs_topic.value="Enter a topic";
      return false;
   }
}
// ########################################
// ------------ UPWS related  -------------
// ########################################

function winsize() {
  var h, w;
  if (document.all) {
     h = Math.round(document.body.clientHeight * (0.81));
     w = Math.round(document.body.clientWidth);
  } else {
     h = Math.round(document.height * (0.81));
     w = Math.round(document.width);
  }
  document.GeneralSearch_input_form.winh.value = h;
  document.GeneralSearch_input_form.winw.value = w;
}

//------------- summary : go to page -------------
function check_the_input(pg_num, len) {
    var flag = true;
    var val = "1234567890, ";
    for(i = 0; i < len; i++) {
        var letter = pg_num.charAt(i);
        if(val.indexOf(letter) != -1)
            continue;
        flag = false;
        break;
    }
    return flag;
}

function process_input(pg_num, len) {
    var flag1 = 0;
    var flag2 = 0;
    num = new String();
    for(i = 0; i < len; i++) {
        var letter = pg_num.charAt(i);
        if(letter == " ") {
            if(flag1 == 1) { flag1 = flag1 + 1; }
            continue;
        }
        else if(letter == ",") {
            if(flag2 == 1) { flag2 = flag2 + 1; }
            continue;
        }
        else {
            if(flag1 == 0) { flag1 = 1; }
            else if(flag1 == 2) { flag1 = 0; return false; }
            if(flag2 == 0) { flag2 = 1; }
            else if(flag2 == 3) { flag2 = 0; return false; }
            num1 = new String(letter);
            num = num.concat(num1);
        }
    }
    return num;
}
function process_page_number(pg_num, max) {
    var len = pg_num.length;
    var error_msg = document.getElementById('pleaseEnterANumberMsg');
    if(!check_the_input(pg_num, len)) {
        alert(error_msg.value);
        return false;
    }
    pg_num = process_input(pg_num, len);
    if(pg_num <= 0) {
        alert(error_msg.value);
        return false;
    }

    return pg_num;
}

function mark_then_navigate( page_input, max ) {

  update_mark_list( 'add' );

  // could use summary_records_form.action instead of null below
  return go_to_page( page_input, max, null );
}

function go_to_page(page_input, max, paging_action, bowserBackLink, lastPage, sortAction, sortSelect, showFirstPage, pageSizeAction, pageSizSelect) {
    var pg_num = page_input.value;
    pg_num = process_page_number(pg_num, max);
    if(pg_num > 0) {
        page_input.value = pg_num;
        //always submit the records form instead of the navigation form to save checkboxes, if needed
        var paging_url = document.forms["summary_records_form"].getAttribute("paging_url");
        if (paging_url) {
		    window.location = paging_url + pg_num;
		}
		else {
		    handle_nav( null, pg_num, paging_action, bowserBackLink, lastPage, sortAction, sortSelect, showFirstPage, pageSizeAction, pageSizSelect);
		}
    }
    else {
        page_input.select();
    }
	return false;
}



function confirm_new_session(url) {
	if (confirm('This will clear all your forms and inputs and start a new session. Click OK to continue.\n\n\nNote: To continue with your current session, click "New Search" link.')) {
	   location.href = url + "/new_session";
	}
}

function INSPEC_PreParse(form)
{
//debug_alert("Form name  = "+form);
	var input1=document.forms[form].elements["value(input1)"];
    var input1Value=input1.value;
//debug_alert("input1Value = "+input1Value);

    var newInput1Value = input1Value.replace(/>=/g, "=GTE ");
    newInput1Value = newInput1Value.replace(/<=/g, "=LTE ");
    newInput1Value = newInput1Value.replace(/>/g, "=GT ");
    newInput1Value = newInput1Value.replace(/</g, "=LT ");

    document.forms[form].elements["value(input1)"].value=newInput1Value;
}


function check_form_inputs (form, action) {
	mergeMultiSelects();

  try {
	 var search_mode = document.forms[form].elements["search_mode"].value;
	 var product_code = document.forms[form].elements["product"].value;

	if ((search_mode == "GeneralSearch" ||
			search_mode == "UA_GeneralSearch" ||
	   		search_mode == "AdvancedSearch" ||
			search_mode == "CitedReferenceSearch")
		&& action != "savePreferences" )
		{
			var valid_inputs = false;
			var numVals = false;

			if(product_code == "INSPEC" && search_mode == "GeneralSearch") {
			 	numVals = parse_INSPEC_special_fields(form, action);
			}

			if(!numVals){
				valid_inputs = parse_search_inputs(form);
				//the search should work if only numbers are entered for INSPEC.
				if( !valid_inputs ){
					return false;
				}
			}
			if(product_code == "INSPEC" && search_mode == "AdvancedSearch") {
			 	INSPEC_PreParse(form);
			}
		}
		else if(search_mode == "CompoundSearch"){
			var notice = document.getElementById("input_invalid_notice");
			var invalid_input = true;
			for (i=0; i<document.forms[form].elements.length; i++) {
		      var e = document.forms[form].elements[i];
		      if ( (e.type == "text" || e.type == "textarea")
		      		&& !(e.name == "formSimilarityMin" ||e.name == "formSimilarityMax")){
		      	trim_input(e);
		      	if(e.value.length>0){
		      		invalid_input = false;
		      		break;
		      	}
		      }
		      if (e.name == "molecule") {
		        trim_input(e);
//debug_alert ("name: " + e.name + " value: " + e.value + " structure: " + e.structure);
		        if (e.value.length>0) {
		          invalid_input = false;
		      	  break;
		      	}
		      }
		    }
		    if(invalid_input){
		    	if(notice != null)
			    	show_client_error("client_input_error",notice.value);
		      	return false;
		    }
		}
		else if(search_mode == "CitedPatentSearch" && action != "savePreferences"){
		    var notice = document.getElementById("input_invalid_notice");
			var invalid_input = true;
		    var exp_notice = "Search Error: Patent search term could be found in more than one family (unique patent number required for Expand option) ";
		    var expand = false;
		    var wildcard = false;

		    for (i=0; i<document.forms[form].elements.length; i++) {
		      var e = document.forms[form].elements[i];
//debug_alert ("name: " + e.name + " value: " + e.value);
		      if (e.name == "value(input1)"){
		      	trim_input(e);
		      	if(e.value.indexOf("*") >= 0 || e.value.indexOf("?") >= 0){
		      		wildcard = true;
		      	}
		      }
		      if (e.name == "value(select1)") {
		        trim_input(e);
		      	if(e.value == "CX"){
		      		expand = true;
		      	}
		      }
		      if (e.type == "text" || e.type == "textarea") {
		      	trim_input(e);
		      	if(e.value.length>0){
		      		invalid_input = false;
		      	}
		      }
		    }
		    if(wildcard && expand){
		    	if(exp_notice != null)
			    	show_client_error("client_input_error",exp_notice);
		      	return false;
		    }
		    if(invalid_input){
		    	if(notice != null)
			    	show_client_error("client_input_error",notice.value);
		      	return false;
		    }
		}

	    document.forms[form].action.value = action;
   } catch (e) {
    ;
   }
   return true;
}

//Function to parse the search inputs across general search
//Advanced search, cited reference search and all products search
//for invalid inputs(noinput or just spaces)
function parse_search_inputs(form){
	var field_count_ele = document.forms[form].elements["fieldCount"];
	var i;
	var valid_inputs = false;
	var multi_select = false;
	var field_count = 0;

	//for Advanced search
	var search_mode = document.forms[form].elements["search_mode"].value;
	if(search_mode == "AdvancedSearch") {
		field_count = document.forms[form].elements["value(limitCount)"].value;
		if(field_count == null) { field_count = 1; }
	}
	
	//For all other searches Including general_search,cited_reference_search, Collections search.
	else{
		field_count = field_count_ele.value;
	}

	try {
		//loop through rows
		for (i=1; i<=field_count; i++) {
			var fieldInput = document.getElementById('value(input' + i + ')');
			if(fieldInput == null) { continue; }

			var fieldType = fieldInput.type;

			if(fieldType == "text" || fieldType == "textarea"  ){
				trim_input(fieldInput);
				//Checking for atleast one valid input.
				if(!valid_inputs && fieldInput.value.length != 0)
					valid_inputs = true;
			}
			else if(fieldType == "select-multiple"){
				multi_select = true;
			}
		}
	} catch (e) {
	 ;
	}

	var notice = document.getElementById("input_invalid_notice");
	var notice_limits = document.getElementById("input_invalid_notice_limits");

	if(!valid_inputs && multi_select)
		show_client_error("client_input_error", notice.value + notice_limits.value);
	else if(!valid_inputs)
		show_client_error("client_input_error", notice.value);

	return valid_inputs;
}



function parse_INSPEC_special_fields (form, action) {

	var field_count = document.forms[form].elements["fieldCount"].value;
	var tbl = document.getElementById('search_table');
	var i;
	var numVals=false;

	//loop through rows
	for (i=1; i<=field_count; i++) {
		var trow = document.getElementById('searchrow' + i);

		var values = "";
		var fieldSelect = document.getElementById('select' + i);
		var idx = fieldSelect.selectedIndex;
  		var id = fieldSelect.options[idx].id;
  		var val_selected = fieldSelect.value;

		//handle special parsing for numqty and chemical searches
		if(id.match("NQ_")) {
			values = parse_INSPEC_numqty_double_inputs(form, i);
		} else if (val_selected.match("CH")) {
			parse_INSPEC_chemical_input(form, i, id);
		} else {};

		//for numqty, get the generic hidden, value(inputX),
		//clone it, change the id and name to match the row number
		//paste the new appended value inside and append the new input clone to that row

		if(values != "" && values != " ") {
			var inputX = document.getElementById('value(inputX)');
			var inputX_clone = inputX.cloneNode(true);
			inputX_clone.id = ('value(input' + i + ')');
			inputX_clone.name = ('value(input' + i + ')');
			inputX_clone.value = values;
			trow.appendChild(inputX_clone);
			numVals = true;
		}
	}
	return numVals;
}

function parse_INSPEC_numqty_double_inputs (form, rowIndex) {

	//Find the two inputs, if they have values, paste them together with a space between.
	// If only mininum value exist, put "GTE " bofore the value.
	// If only maximum value exist, put "LTE " bofore the value.
	var values = "";
	var minValue = "";
	var maxValue = "";
	var haveMinValue=false;
	var haveMaxValue=false;

	var numqty_el_1 = document.getElementById('value(double_input_1_row' + rowIndex + ')');
	trim_input(numqty_el_1);
	if(numqty_el_1 != null && numqty_el_1.value != "") {
		minValue = numqty_el_1.value;
		haveMinValue=true;
	}

	var numqty_el_2 = document.getElementById('value(double_input_2_row' + rowIndex + ')');
	trim_input(numqty_el_2);
	if(numqty_el_2 != null && numqty_el_2.value != "") {
		maxValue = numqty_el_2.value;
		haveMaxValue=true;
	}

	if ( haveMinValue==true && haveMaxValue==true) {
		values = minValue + " " + maxValue;
	}
	else if (haveMinValue==true){
		    values = "GTE " + minValue;
	}
	else if (haveMaxValue==true) {
		    values = "LTE " + maxValue;
	}

	return values;

}//end function parse_INSPEC_numqty_double_inputs

function change_select(select, selectValue )
{
//debug_alert("fn change_select is called. selectValue= "+ selectValue);
//debug_alert("get selection: "+select.length);
	var match=0;

	if (select != null) {
		for (i=0; i<select.length; i++) {
			if (select.options[i].value==selectValue) {
				select.options[i].selected = true;
				match=1;
				break;
			}
		}
	}
//debug_alert("match value is "+ match);
	return match;
}

function parse_INSPEC_chemical_input (form, rowIndex, id) {
	var values = "";

	//Get the user input and the role (from the select option id).
	//Put these two together with a backslash between into the input value.
	var chem_input = document.getElementById('value(input' + rowIndex + ')');
	if(chem_input.value != "") {
		var chem_role_array = new Array();
    	chem_role_array = id.split("_");
    	var selected_chem_role = chem_role_array[0];
    	if(selected_chem_role == "all") { return; }

    	if(!chem_input.value.match("/")){
    		 chem_input.value = chem_input.value + "/" + selected_chem_role;
    	}
    }
    return true;

}//end function parse_INSPEC_chemical_input

// ------ on Search Input page: -----
// -- automatically control selection of the radio buttons for year/week select boxes --

function select_week_button(idx) {
  if (! idx.length) idx = 0;

  document.GeneralSearch_input_form.period[idx].checked = true;
  return true;
}

function select_year_range_button(idx) {
  if (! idx.length) idx = 1;

  document.GeneralSearch_input_form.period[idx].checked = true;
  return true;
}

function do_all_named_checkboxes( form, id, checked ) {

  var found = false;

  if ( form ) {

    var value = checked
//debug_alert('value is '+(value == false ? 'false' : 'true'));
    var i;

    for (i=0; i<form.elements.length; i++) {
      var e = form.elements[i];
      if (e.tagName == "INPUT" && e.type == "checkbox" &&
	  e.name == id) {
			e.checked = value;
			found = true;
      }
    }
    if(!checked){
    	var selectedRecsObj=form.selectedRecs;
    	//don't assume that "selectedRecs" is there for all pages
    	if(selectedRecsObj !=null){
    		form.selectedRecs.value=0;
    	}
    }
  }

  return found;
}

function select_named_checkboxes( list ) {

  var found = false;

  if ( typeof( list ) == 'object' ) {

    for (i=0; i<list.length; i++) {
      var e = document.getElementById( list[i] );
      if (e && e.tagName == "INPUT" && e.type == "checkbox") {

	e.checked = true;
      }
    }
  }

  return found;
}

function check_summary_records_form_inputs(id) {
	var f = document.summary_records_form;

	var i;
	var hasInput = false;

	for (i=0; i<f.elements.length; i++) {
		var e = f.elements[i];
		if (e.tagName == "INPUT" && e.type == "checkbox" &&
			e.name == id && e.checked)
		{
			hasInput = true;
			break;
		}
	}

	if(!hasInput){
		try{
			var selRecs = f.selectedRecs.value;
			if(selRecs>0){
				hasInput=true;
			}
		}catch(e){
			;
		}
	}

	if (!hasInput) {
		var errorMessage = document.getElementById('quickOutputSelectAtLeastOneCheckbox').value;
		alert(errorMessage);
	}
	return hasInput;
}

function set_refine_or_exclude (form_name, refSwitch) {
	if(form_name == null){
		return false;
	}

	var f = document.forms[form_name];
	var excludeElement=document.forms[form_name].elements["exclude"];
	
	if(excludeElement != null) {
		if (refSwitch == 'exclude') {
			excludeElement.value = "exclude";
		} else {
			excludeElement.value = "";
		}
	}
	
	return true;
}

function check_refine_inputs(form1, form2) {
//debug_alert("call check_refine_inputs");
	var hasInput = check_refine_form(form1);
	if( !hasInput){
		hasInput = check_refine_form(form2);
	}

	if (!hasInput) {
		var errorMessage = document.getElementById('refineSelectAtLeastOneCheckbox').value;
		alert(errorMessage);
	}else{
		merge_input_forms(form1,form2);
	}

	return hasInput;
}

function check_refine_form(form_name) {
	if(form_name == null){
		return false;
	}

	var f = document.forms[form_name];

	var i;
	var hasInput = false;

	var swsElement=document.getElementById('sws');
	if(swsElement !=null){
		trim_input(swsElement);
		var swsVal=swsElement.value;
		if(swsVal.length >0){
			hasInput = true;
	 	}
	}

	if(! hasInput){
		var refineSelectionElements=document.getElementsByName('refineSelection');
		if(refineSelectionElements !=null){
			for (i=0; i< refineSelectionElements.length; i++){
				var refineSelectionElement=refineSelectionElements[i];
				if(refineSelectionElement.checked){
					hasInput=true;

					break;
				}
			}
		}
	}

	return hasInput;
}

function merge_input_forms(form1, form2) {
//debug_alert("We are going to merge forms "+form1+" and "+form2);
	if(form1 == null){
		return;
	}

	if(form2 == null){
		return;
	}

	var f1 = document.forms[form1];
	if(f1 == null){
//debug_alert (form1 +" is null");
		return;
	}

	var f2 = document.forms[form2];
	if(f2 == null){
//debug_alert (form2 +" is null");

		return;
	}

	var f2ElementsNum=f2.elements.length;

	var i;

	var wrappingDiv=document.createElement("wrappingDiv");
	wrappingDiv.style.visibility="hidden";
	f1.appendChild(wrappingDiv);

	for (i=0; i<f2ElementsNum; i++) {
		var e =f2.elements[i];

		var tagName=e.tagName;
		var type=e.type;
		var name=e.name;
		var value=e.value;

		var newE=e.cloneNode(true);
		wrappingDiv.appendChild(newE);

		if(type == "checkbox"){
			var checked=e.checked;

			var total=f1.elements.length;
			f1.elements[total-1].checked=e.checked;
		}

		var brE=document.createElement("br");
		wrappingDiv.appendChild(brE);
	}
}

function click_ra_more(){
  var clickRaMoreMsg = document.getElementById('clickRaMore').value;

  var hasInput=check_refine_form("refine_form");
  if(! hasInput){
	  hasInput=check_refine_form("refine_more_form");
  }

  if(hasInput){
	  return confirm(clickRaMoreMsg);
  }

  return true;
}

function addTextWithExtras(text_field_default_extras, iteration)
{
	try {

  		//add "extras" (so far only MEDLINE does this and it is for a radio group)
  		var extras = document.getElementById(text_field_default_extras);
  		var extrasclone = extras.cloneNode(true);
  		extrasclone.id = 'RadsNChecksContainer' + iteration;
  		return extrasclone;

	} catch (e) {
  	;
 	}
}

function addSearchRow(config, imgpath, text_field_default_extras)
{
 try {
  var fcount = document.getElementById('fieldCount');
  var maxcount = document.getElementById('max_field_count');
  var notice = document.getElementById('max_field_notice').value;

  //limit the number of rows added
  if((parseInt(fcount.value) + 1) > (parseInt(maxcount.value))){
     alert(notice);
  	return false;
  }

  var tbl = document.getElementById('search_table');
  var lastRow = tbl.rows.length;
  var iteration = lastRow-1;

  var row = tbl.insertRow(iteration);
  row.id = 'searchrow' + iteration;

  //add the boolean operator
  var cell0 = row.insertCell(0);
  cell0.align = "center";
  cell0.vAlign = "top";
  //cell0.width = "6%";
  cell0.noWrap = "nowrap";
  var bool = document.getElementById('value(bool_1_2)');
  var boolclone = bool.cloneNode(true);
  boolclone.name= 'value(bool_' + (iteration-1) + '_' + (iteration) + ')';
  boolclone.id= 'value(bool_' + (iteration-1) + '_' + (iteration) + ')';
  boolclone.value ="AND";
  cell0.appendChild(boolclone);

  //add the text input
  var cell1 = row.insertCell(1);
  cell1.vAlign = "top";
  //cell1.width = "63%";
  var elcontainer = document.createElement('div');
  elcontainer.id = 'container(input' + iteration + ')';
  var el = document.getElementById('text_field_default');
  var elclone = el.cloneNode(true);
  elclone.name = 'value(input' + iteration + ')';
  elclone.id = 'value(input' + iteration + ')';
  elclone.value = "";
  elcontainer.appendChild(elclone);

  //so far, this is used for MEDLINE radio and checkbox groups, but could be used for other elements
  //in this location.
  if(text_field_default_extras != null && text_field_default_extras.length > 0) {
  	var extra_text_element = addTextWithExtras(text_field_default_extras, iteration);
  }

  //add the appropriate example text
  var example = document.getElementById('TS_example');
  var exampleclone = example.cloneNode(true);
  exampleclone.id = "example" + iteration;

  cell1.appendChild(elcontainer);
  if(extra_text_element != null) {
  	cell1.appendChild(extra_text_element);
  }
  cell1.appendChild(exampleclone);

  //add the explanatory "in" text
  var cell2 = row.insertCell(2);
  cell2.vAlign = "top";
  //cell2.width = "30%";
  cell2.noWrap = "nowrap";
  var inText = document.getElementById('in1');
  var inclone = inText.cloneNode(true);
  inclone.id = 'in' + iteration;
  cell2.appendChild(inclone);

  //add the field select dropdown
  var foo = document.getElementById('select1');
  var clonesel;

  //make IE happy since it cannot clone 'select's correctly
  if (navigator.appVersion.indexOf("MSIE")!=-1) {
    var ohtml          = foo.outerHTML.replace(/select1/g, "select" + iteration );
    clonesel           = document.createElement(ohtml);
  } else {
    clonesel           = foo.cloneNode(true);
  clonesel.name = 'value(select' + iteration + ')';
  clonesel.id = 'select' + iteration;
  }
  //default back to 'Topic' for all browsers
  var ihtml          = foo.innerHTML.replace(/selected/, "");
  // IE7 breaks w/o the non-breaking spaces below
  clonesel.innerHTML = "&nbsp;&nbsp;" + ihtml;
  cell2.innerHTML += "&nbsp;";
  cell2.appendChild(clonesel);
  cell2.innerHTML += "&nbsp;&nbsp;&nbsp;";

  // Safari 1.3 and 2.x set the name wrong after it is appended to cell2
  var foo2 = document.getElementById('select'+iteration);
  foo2.name = 'value(select' + iteration + ')';

  // alert('cloned select: '+clonesel.name+';'+clonesel.id+';'+clonesel.innerHTML);

  var cell3 = row.insertCell(3);
  cell3.vAlign = "top";
  cell3.align = "left";
  var saicon = document.getElementById('saicon1');
  var cloneimg;
  cloneimg = saicon.cloneNode(true);
  cloneimg.name = 'saicon' + iteration;
  cloneimg.id = 'saicon' + iteration;
  //always test with topic code: TS
  var isTopicSA = isActivateSA("TS", config);
  if (isTopicSA != '') {
    cloneimg.src = imgpath + "/sa_icon.gif";
	cloneimg.width = 18;
	cloneimg.title = "Access the search aid";
  } else {
	cloneimg.src = imgpath + "/spacer.gif";
	cloneimg.width = 0;
	cloneimg.title = null;
  }
  cell3.appendChild(cloneimg);

  var cell4 = row.insertCell(4);
  var sahid1 = document.getElementById('value(hidInput1)');
  var sahid2 = document.getElementById('value(hidShowIcon1)');
  var clonehid0, clonehid1, clonehid2;
  clonehid1 = sahid1.cloneNode(true);
  clonehid2 = sahid2.cloneNode(true);
  clonehid1.name = 'value(hidInput' + iteration + ')';
  clonehid1.id = 'value(hidInput' + iteration + ')';
  clonehid2.name = 'value(hidShowIcon' + iteration + ')';
  clonehid2.id = 'value(hidShowIcon' + iteration + ')';
  clonehid1.value = isTopicSA;
  if (isTopicSA != '') {
	clonehid2.value = "1";
  } else {
	clonehid2.value = "0";
  }
  cell4.appendChild(clonehid1);
  cell4.appendChild(clonehid2);

  fcount.value = parseInt(fcount.value) + 1;
 } catch (e) {
  ;
 }
}

function searchFieldChanged(fieldselect,imgpath,config)
{
  try {
  	var fieldnum = (fieldselect.id).substring(6);
  	var input_element = document.getElementById("value(input" + fieldnum + ")");

  	//handle search limits
  	var idx = fieldselect.selectedIndex;
  	var id = fieldselect.options[idx].id;
	var val = fieldselect.value;
	var switch_element_id = "";

	if(id == val + "_" + "search_limit") {
		switch_element_id = val + "Drop";
		swapSearchElements(fieldnum, val, switch_element_id, null);
	} else if (id.match("double_inputs")) {
		switch_element_id = "double_input";
		swapSearchElements(fieldnum, val, switch_element_id, null);
	} else if (id.match("radio_group")) {
		//special additions for MEDLINE. Other prods may have something similar in the future.
		switch_element_id = val + "Radios";
		swapSearchElements(fieldnum, val, switch_element_id, null);
	} else if (id.match("checkbox_group")) {
		//special additions for MEDLINE. Other prods may have something similar in the future.
		switch_element_id = val + "Checks";
		swapSearchElements(fieldnum, val, switch_element_id, null);
	} else {
		if(input_element != null) {

			if ( (input_element.type == "select-multiple") || (input_element.type == "select-one")) {
				switch_element_id = "text_field_default";
				swapSearchElements(fieldnum, val, switch_element_id, null);
			}
		} else {
				switch_element_id = "text_field_default";
				swapSearchElements(fieldnum, val, switch_element_id, null);
		}
	}

	//special checks and radios for MEDLINE. Other products may use them later.
	//Always clear out the container for these if we are switching to a search field or a limit or
	//anything other than a check or radio group.
	if( (!switch_element_id.match("Checks")) && (!switch_element_id.match("Radios")) ) {
		var special_group_container = document.getElementById("RadsNChecksContainer" + fieldnum);
		if(special_group_container != null) {
			special_group_container.innerHTML = "";
		}
	}

    swapExample(val, fieldnum);

	defineHiddenInput(fieldnum,imgpath, config);
  } catch (e) {
   ;
  }
}

function swapExample(field_name, fieldnum)
{
//debug_alert("fn swapExample is called.");
	var newexample = document.getElementById(field_name + "_example");
	var oldexample = document.getElementById("example" + fieldnum);
	oldexample.innerHTML = newexample.innerHTML;
}

function swapSearchElements(rownum, val, switch_element_id, selected)
{
	if(switch_element_id.match("double_input")) {
		//special handling here
		swapWithDoubleInputs(rownum, switch_element_id, "", "");
		return false;
	}

	if( (switch_element_id.match("Radios")) || (switch_element_id.match("Checks")) ) {
		//special handling here
		addRadsNChecksGroup(rownum, switch_element_id, "", "");
		//after adding the radio or check element, we must also swap the input container
		switch_element_id = "text_field_default";
	}

	var sf_drop_hidden = document.getElementById(switch_element_id);
	var sf_drop_clone = sf_drop_hidden.cloneNode(true);
	sf_drop_clone.name = "value(input" + rownum + ")";
	sf_drop_clone.id = "value(input" + rownum + ")";
	//alert("sf drop clone id: " + sf_drop_clone.id);

	// Get IE to select the first value in a limits select box
	if((selected == null) && (switch_element_id.match(val + "Drop"))) {
		sf_drop_clone.selectedIndex = 0;
	// If we have a selected value (or a comma separated list), reselect it/them
	} else if (selected != null) {
		selectMultiSelects(sf_drop_clone, selected);
	}

	var input_container = document.getElementById("container(input" + rownum + ")");
	input_container.innerHTML = "";
	input_container.appendChild(sf_drop_clone);

	return true;
}

function swapWithDoubleInputs(rownum, switch_element_id, input1, input2)
{
//debug_alert("fn swapWithDoubleInputs is called.");
	var sf_doubles_hidden_1 = document.getElementById(switch_element_id + "_" + 1);
	var sf_doubles_clone_1 = sf_doubles_hidden_1.cloneNode(true);
	sf_doubles_clone_1.name = "value(" + switch_element_id + "_" + 1 + "_row" + rownum + ")";
	sf_doubles_clone_1.id = "value(" + switch_element_id + "_" + 1 + "_row" + rownum + ")";
  	sf_doubles_clone_1.value=input1;

  	var toText = document.getElementById('to_el');
  	var to_el_clone = toText.cloneNode(true);
  	to_el_clone.id = 'to_el' + rownum;

	var sf_doubles_hidden_2 = document.getElementById(switch_element_id + "_" + 2);
	var sf_doubles_clone_2 = sf_doubles_hidden_2.cloneNode(true);
	sf_doubles_clone_2.name = "value(" +  switch_element_id + "_" + 2 + "_row" + rownum + ")";
	sf_doubles_clone_2.id = "value(" + switch_element_id + "_" + 2 + "_row" + rownum + ")";
	sf_doubles_clone_2.value=input2;

	var input_container = document.getElementById("container(input" + rownum + ")");
	input_container.innerHTML = "";
	input_container.appendChild(sf_doubles_clone_1);
	input_container.appendChild(to_el_clone);
	input_container.appendChild(sf_doubles_clone_2);
}


//new func for MEDLINE. New addition to the General Search for mesh mapping
//This func adds this control to the page following the same paradigm as above functions:
//copy from a hidden control on the page and paste in the proper location after renaming for the row number.
function addRadsNChecksGroup(rownum, switch_element_id, input1, input2)
{
	var radsNchecks_hidden = document.getElementById(switch_element_id);
	var radsNchecks_clone = radsNchecks_hidden.cloneNode(true);
	radsNchecks_clone.id = switch_element_id + rownum;

	var radsNchecks_container = document.getElementById("RadsNChecksContainer" + rownum);
	radsNchecks_container.innerHTML = "";
	radsNchecks_container.innerHTML = radsNchecks_clone.innerHTML;
}

function toggle_limit_settings(value)
{
  try {
     if (value=="show") {
          document.getElementById('showLimits').style.display = "block";
          document.getElementById('currentSettings').style.display = "none";
	      document.getElementById('hideLimitsLabel').style.display = "block";
          document.getElementById('changeLimitsLabel').style.display = "none";
          document.getElementById('limitStatus').value = 'expanded';
     }
     else {
          document.getElementById('showLimits').style.display = "none";
          document.getElementById('currentSettings').style.display = "block";
          document.getElementById('hideLimitsLabel').style.display = "none";
          document.getElementById('changeLimitsLabel').style.display = "block";
		  document.getElementById('limitStatus').value = 'collapsed';
     }
   } catch (e) {
     ;
   }
}

function more_hide(id)
{
	el = document.getElementById(id);
	if (el.style.display == 'none')
	{
		el.style.display = '';
		el = document.getElementById('more'+id);
		el.innerHTML = '[hide]';
	} else {
		el.style.display = 'none';
		el = document.getElementById('more'+id);
		el.innerHTML = '[more]';
	}
}

function toggleRefineResultsPanel(showSrc, hideSrc, showClass, hideClass,
                                  alt_text_hide, alt_text_show,
				  title_text_hide, title_text_show) {

	var field = 'refine_panel';
	var td_name = 'summary_left_td';
	var tr  = document.getElementById(field);
	var td  = document.getElementById(td_name);
	var img = document.getElementById(field + "_img");


	if (tr.style.display == 'none') {
		img.src = showSrc;
		img.alt = alt_text_hide;
		img.title = title_text_hide;
		tr.style.display = '';
		if ( td && showClass != null ) {
			td.className=showClass;
		}
		ra_showRefinePanel(field);
	} else {
		img.src = hideSrc;
		img.alt = alt_text_show;
		img.title = title_text_show;
		tr.style.display = 'none';
		if ( td && hideClass != null ) {
			td.className=hideClass;
		}
		ra_hideRefinePanel(field);
	}

}

function check_all(list) {

    if(typeof list != 'object') {
        return false;
    }

    var len = list.length;

    if (typeof len == 'undefined') {
        list.checked = true;
        return false;
    }

    for(i = 0; i < len; i++) {
        list[i].checked = true;
    }
    return false;
}


//initial use is for deleting search history sets.
//could be used for other situations of this kind.
function list_selected_checks (list) {
	if(typeof list != 'object') {
        return false;
    }

    var len = list.length;
    var selectedSets = new Array();

    if (typeof len == 'undefined') {
        len = 1;
    }

    for(i = 0; i < len; i++) {
        if(list[i].checked == true) {
        	selectedSets.push(list[i].value);
        }
    }

    return selectedSets;
}



function daisy_mc_submit(value,maxAllowed){

   var UTCount = document.summary_records_form.selectedClusterCount.value;
   var error_msg = document.getElementById('selectAtLeastOneDAISYSet');
   	var error_msg_exceed = document.getElementById('daisyExceededMaxAllowedRecs');
   if ( UTCount > 0 ){

		//below verification part was moved FROM "verifyUTCount" 
		if( UTCount > maxAllowed)
		{
		    alert(error_msg_exceed.value);
		    return false;
	    //above verification part was moved FROM "verifyUTCount"
		}else{
		    document.summary_records_form.action=value;
		}
 		
   }
   else{
        alert(error_msg.value);
        return false;
   }


}

function submit_form( form ) {
  // if ( form )  {
//debug_alert('gotta form');
  //   form.submit();
  // }
  // else {
  //for( var i=0;i<document.forms["summary_records_form"].elements.length;i++){
  	//if(document.forms["summary_records_form"].elements[i].type == 'hidden')
	  //	alert(document.forms["summary_records_form"].elements[i].name+": "+
  		//		document.forms["summary_records_form"].elements[i].value);
  //}
  document.forms["summary_records_form"].submit();
  // }
  return true;
}

function submit_summary_form( form_action, id, search_mode ) {

  var checked = true;
  if ( id && id.length > 0 ) {
      checked = check_summary_records_form_inputs( id );
//debug_alert("got back checked="+checked);
  }

  if ( checked == true ) {
      // form containing summary recs
      var summary_records_form = document.forms["summary_records_form"];

//debug_alert("got a form? "+(summary_records_form?"yes":"no"));

    if ( search_mode && search_mode.length > 0 ) {
	  summary_records_form.elements["search_mode"].value = search_mode;
    }
      // NOTE: this will fail on IE if a form element named "action" exists
      //   quick fix: remove the form element & add ?action=xxx to the
      //              form action string
      //document.forms["summary_records_form"].action = form_action;
      summary_records_form.action = form_action;

//debug_alert("set form action: "+ summary_records_form.getAttribute("action"));
  }
//debug_alert("returning with "+checked);

  if ( checked == true ) {
    mergeMultiSelects();
  }

  return checked;
}

function get_url_components( form ) {
  var qid_src = form.elements["qid"];
  if ( qid_src == null ) {
    qid_src = form.elements["parentQid"];
  }
  var qid = qid_src.value;
  var sid = form.SID.value;
  var product = form.product.value;
  var mode = form.search_mode.value;

  var parms = "qid="  + qid + "&SID=" + sid + "&product=" + product +
    "&search_mode=" + mode;

  return parms;
}

function submit_go_to_page(page_input, max, paging_action, bowserBackLink, lastPage, sortAction, sortSelect, showFirstPage, pageSizeAction, pageSizSelect) {
    var pg_num = page_input.value;
    pg_num = process_page_number(pg_num, max);
    if(pg_num > 0) {
        page_input.value = pg_num;
        //always submit the records form instead of the navigation form to save checkboxes, if needed
		submit_handle_nav( null, pg_num, paging_action, bowserBackLink, lastPage, sortAction, sortSelect, showFirstPage, pageSizeAction, pageSizSelect);
    }
    else {
        page_input.select();
    }
	return false;
}

function submit_handle_nav(summary_nav_form, page_number, paging_action, browserBackLink, lastPage, sortAction, sortSelect, showFirstPage, pageSizeAction, pageSizeSelect) {
//debug_alert('in submit_handle_nav');
	mergeMultiSelects();

//debug_alert('did merging');
	// form containing summary recs
	var summary_records_form = document.forms["summary_records_form"];

	if ( summary_nav_form ) {
	  var page_element = summary_nav_form.elements.page;
	  page_element.value = page_number;
//debug_alert('got form & set page '+page_number);
	}

	//save the page element from the navigation form into the results form as a hidden value.
	//change the action to something that will handle navigation
	//submit the results form instead of the nav form that called this method.
	//this is done so that elements on the results, such as checkboxes can be retained and used.
	document.forms["summary_records_form"].elements["page"].value = page_number;
//debug_alert('we just set page.value to '+page_number);
//debug_alert('and it is '+document.forms["summary_records_form"].elements["page"].value );
	if ( paging_action && paging_action.length > 0 ) {
//05_28_08	  document.forms["summary_records_form"].action = paging_action;
		document.forms["summary_records_form"].setAttribute("action",paging_action);
//		if (action_att)
//		{
//debug_alert('action att obtained ' + action_att);
//		action_att.value=paging_action;
//		}
	  
//debug_alert('set paging action '+paging_action);
	} else {
	  document.forms["summary_records_form"].elements["redirect_url"].value =
		document.forms["summary_records_form"].getAttribute("paging_url") +
		page_number;
//debug_alert('setting redirect url for page '+page_number);
	}

	if (browserBackLink != null ){
	    var location= browserBackLink + page_number;
//	    var location= browserBackLink + lastPage;
	    if (sortAction !=null) {
	     	location += "&action=" + sortAction;
	     	if (sortSelect  !=null ) {
	     	   		location += "&sortBy=" + sortSelect;
	     	 }
	    }
	 if (pageSizeAction !=null) {
	     	location += "&action=" + pageSizeAction;
	     	if (pageSizeSelect  !=null ) {
	     	   		location += "&pageSize=" + pageSizeSelect;
	     	 }
			if (showFirstPage !=null) {
	     	   		location += "&showFirstPage=" + showFirstPage;
					document.forms["summary_records_form"].elements.showFirstPage.value="1";
	     	 }  
	    }

	document.forms["summary_records_form"].submit();    
//debug_alert("location:" + window.location);
	return false;
    }  else {
	document.forms["summary_records_form"].submit();
//debug_alert("window location:" + window.location);
	return false;
    }
}

function handle_nav(summary_nav_form, page_number, paging_action, browserBackLink, lastPage, sortAction, sortSelect, showFirstPage, pageSizeAction, pageSizeSelect) {
//debug_alert('in handle nav');
	mergeMultiSelects();

//debug_alert('did merging');
	// form containing summary recs
	var summary_records_form = document.forms["summary_records_form"];

	if ( summary_nav_form ) {
	  var page_element = summary_nav_form.elements.page;
	  page_element.value = page_number;
//debug_alert('got form & set page '+page_number);
	}

	//save the page element from the navigation form into the results form as a hidden value.
	//change the action to something that will handle navigation
	//submit the results form instead of the nav form that called this method.
	//this is done so that elements on the results, such as checkboxes can be retained and used.
	document.forms["summary_records_form"].elements["page"].value = page_number;
//debug_alert('we just set page.value to '+page_number);
//debug_alert('and it is '+document.forms["summary_records_form"].elements["page"].value );
	if ( paging_action && paging_action.length > 0 ) {
//05_28_08	  document.forms["summary_records_form"].action = paging_action;
		document.forms["summary_records_form"].setAttribute("action",paging_action);
//		if (action_att)
//		{
//debug_alert('action att obtained ' + action_att);
//		action_att.value=paging_action;
//		}
	  
//debug_alert('set paging action '+paging_action);
	} else {
	  document.forms["summary_records_form"].elements["redirect_url"].value =
		document.forms["summary_records_form"].getAttribute("paging_url") +
		page_number;
//debug_alert('setting redirect url for page '+page_number);
	}

	if (browserBackLink != null ){
	    var location= browserBackLink + page_number;
//	    var location= browserBackLink + lastPage;
	    if (sortAction !=null) {
	     	location += "&action=" + sortAction;
	     	if (sortSelect  !=null ) {
	     	   		location += "&sortBy=" + sortSelect;
	     	 }
	    }
	 if (pageSizeAction !=null) {
	     	location += "&action=" + pageSizeAction;
	     	if (pageSizeSelect  !=null ) {
	     	   		location += "&pageSize=" + pageSizeSelect;
	     	 }
			if (showFirstPage !=null) {
	     	   		location += "&showFirstPage=" + showFirstPage;
					document.forms["summary_records_form"].elements.showFirstPage.value="1";
	     	 }  
	    }

	window.location = location;
//	document.forms["summary_records_form"].submit();    
//debug_alert("locaion:" + window.location);
	return false;
    }  else {
    var count_new_items_marked = 0;
    count_new_items_marked = summary_records_form.count_new_items_marked.value;
    if (count_new_items_marked == 0) {
		disable_auto_submit();
	}
	document.forms["summary_records_form"].submit();
	
//debug_alert("window locaion:" + window.location);
	return false;
    }
    

}//end function handle_nav


function handle_sort(summary_sort_form, page_number, browserBackLink, lastPage, action, sortSelect, showFirstPage) {
	if (browserBackLink != null ){
	    var location= browserBackLink + lastPage;
//debug_alert("Location 1:" + location);

	    if (action !=null) {
	     	location +=  "&action=" + action;
//debug_alert("Location 2:" + location);
	     	if (sortSelect  != null) { 
	     	   		location  += "&sortBy=" + sortSelect;
			if (showFirstPage !=null) {
	     	   		location += "&showFirstPage=" + showFirstPage;
	     	 }  
//debug_alert("Location 3:" + location);
		   }
	    }

		
//debug_alert("Final location:" + location);  
	    if (summary_sort_form != null) {
//debug_alert("submit the form and update window location");
//			summary_sort_form.submit();
		}
		window.location = location;
//debug_alert("Final window locaion:" + window.location);  
		return false;
    }  else {
	    if (summary_sort_form != null) {
//debug_alert("submit the form directly");
			summary_sort_form.submit();
		} else {
//debug_alert("No form to submit");
		}
	}
	return false;

}


function verifyUTCount( curUTCount, elemid, maxAllowed) {

  	//debug_alert(document.summary_records_form.selected_uts.value);

	//debug_alert("max is " + maxAllowed);
	previousUTCount = document.summary_records_form.selectedClusterCount.value
	var sel_checkbox = document.getElementById(elemid);
	var error_msg = document.getElementById('daisyExceededMaxAllowedRecs');

   var curr_sel = 0;
   if(sel_checkbox.checked)
   {
        curr_sel = eval(previousUTCount) + curUTCount;
   }
   else
   {
        curr_sel = eval(previousUTCount) - curUTCount;
   }

   /*below verification part is moved TO "view record" button 
   if(curr_sel > maxAllowed)
   {
         alert(error_msg.value);
         sel_checkbox.checked = false;
         curr_sel = curr_sel - curUTCount;
   }
   above verification part is moved TO "view record" button*/ 


    if ( curr_sel < 0 ){
      curr_sel = 0;
    }
    document.summary_records_form.selectedClusterCount.value = curr_sel;
}


// This function is used on the Cited References Summary Page
function do_RR_action ( search ) {

    // Form containing 'Related Record' button and hidden element: all_summary_IDs
    var cited_references_form = document.forms["summary_records_form"];

    // Pass the all_summary_IDs to Related Records Page
    var path = "Related.do?";

    // Complete URL for Related Records Action
    var url = path + search;

    // Replace form action with URL
    cited_references_form.action = url;

    window.location = url;
//    return true;
    return false;

}

//call RAMore.do action with required params
//currently only used by the RA sort
function do_RAMore_sort_action ( sort_select, search_params ) {

    //set the selected sort as a hidden value and submit the form with the params sent.
    var refine_more_form = document.forms["refine_more_form"];
    var more_sort_hidden = refine_more_form.elements["more_sort_order"];
    
    if(sort_select.value == "alpha") {
    	more_sort_hidden.value = "alpha";
    } else {
    	more_sort_hidden.value = "default";
    }

    // Pass the all_summary_IDs to Related Records Page
    var path = "RAMore.do?";

    // Complete URL
    var url = path + search_params;

    // Replace form action with URL
    //06_05_08 refine_more_form.action = url;
    window.location=url + "&more_sort_order=" + sort_select.value ;
    return true;
}

function update_signin_and_quick_output(format, redirect_url, return_url) {
	// First take care of quick output
	update_quick_output(format);
	
	// Now save data and signin
	//alert("update_signin_and_quick_output: format: "+format+"   redirect_url="+redirect_url);
	
	// form containing top 'Print', 'Email', etc. buttons plus summary recs
	var form = document.forms["summary_records_form"];

	// Full Record Page
    if (form == null) {
    	//alert("update_signin_and_quick_output: no summary form (full record) ");
    	form = document.forms["full_record_form"];
    	
    	form.elements["next_mode"].value = form.elements["mode"].value;
    	form.elements["mode"].value = "saveDataAndSignIn";
    	//alert("update_signin_and_quick_output: next_mode: "+form.elements["next_mode"].value + "   mode: "+form.elements["mode"].value);
    	if (return_url != null) {
    		redirect_url += "&rurl="+return_url;
    	}
    	form.elements["redirect_url"].value = redirect_url;
    	
    // Summary Page
    } else {
    	// form containing summary records		
    	var mode = form.elements["mode"].value;
    	form.elements["next_mode"].value = mode;
    	form.elements["mode"].value = "saveDataAndSignIn";
    	if (return_url != null) {
    		redirect_url += "&rurl="+return_url;
    	}
    	form.elements["redirect_url"].value = redirect_url;
    	//alert("update_signin_and_quick_output: next_mode: "+form.elements["next_mode"].value + " mode: "+form.elements["mode"].value);
    	
    	// Now change form containing the bottom quick output widgets
    	form = document.forms["summary_output_form"];
    	if (form != null) {
    		form.elements["next_mode"].value = mode;
    		form.elements["mode"].value = "saveDataAndSignIn";
    		form.elements["redirect_url"].value = redirect_url;
    		//alert("update_signin_and_quick_output: (summary_output_form) setting next_mode: "+form.elements["next_mode"].value+ " mode: "+form.elements["mode"].value);
    	} else {
    		//alert("update_signin_and_quick_output: no summary output form");
    	}
    }
	
}

function update_quick_output(format) {
	// form containing top 'Print', 'Email', etc. buttons plus summary recs
	var summary_records_form = document.forms["summary_records_form"];

	// form containing the bottom quick output widgets
	var summary_output_form = document.forms["summary_output_form"];

	// get all selected records on page
	var selectedIdsArray = new Array();

    var dont_populate_summary_records_form = document.getElementById("dont_populate_summary_records_form");
	
	// Summary Page
    if (summary_records_form != null) {
    	//alert("update_quick_output: (summary) format: "+format);
    
	    if (summary_records_form.marked_list_candidates != null)
	    {
	    	//alert("update_quick_output: marked_list_candidates: "+summary_records_form.marked_list_candidates);
	    	summary_records_form.mode.value = "quickOutput";
			summary_output_form.mode.value = "quickOutput";
	    	var allSummaryIdsArray = new Array();
	
	        try {
		        // BUG:600,601,619 : for single record summary page and single record selection.
	        	// summary_records_form.marked_list_candidates.length turns to be undefined when
	        	// there is only record in the summary page. The following condition
	        	// checks for single record and whether its selected or not before sumitted.
		        if( summary_records_form.marked_list_candidates.type == "checkbox") {
		        	var val = summary_records_form.marked_list_candidates.value;
		        	if(summary_records_form.marked_list_candidates.checked == true) {
			      	        selectedIdsArray.push(val);
			        }
			        allSummaryIdsArray.push(val);
		        }
		        else{
			        for( var i=0; i<summary_records_form.marked_list_candidates.length; i++){
		      		    var val = summary_records_form.marked_list_candidates[i].value;
			    	    if(summary_records_form.marked_list_candidates[i].checked == true) {
			      	        selectedIdsArray.push(val);
			            }
			            allSummaryIdsArray.push(val);
			        }
				}
	
		        // 2nd radio button means send all records on page to mark list
		       if (summary_output_form.record_select_type[1].checked == true) {
		    	   selectedIdsArray = allSummaryIdsArray;
		       }
	        } catch (e) {
	         ;
	        }
	
		    var fields = "";
	
	        try  {
			    if (summary_output_form.qo_fields.type == "hidden") {
			    	// Authors, Title, Source plus Abstract
			    	var abstractBox = document.forms["summary_output_form"].elements["abstract"].checked;
			    	if (abstractBox == true) {
			    		fields = "BibAbs";
			    	}
			    	// Authors, Title, Source
			    	else {
			    		fields = "Bib";
			    	}
			    } else if (summary_output_form.qo_fields[0].checked == true) {
			    	// Authors, Title, Source plus Abstract
			    	var abstractBox = document.forms["summary_output_form"].elements["abstract"].checked;
			    	//if (summary_output_form.abstract.checked == true) {
			    	if (abstractBox == true) {
			    		fields = "BibAbs";
			    	}
			    	// Authors, Title, Source
			    	else {
			    		fields = "Bib";
			    	}
			    }
			    else if (summary_output_form.qo_fields[1].checked == true) {
			    	// Full Record plus Cited Reference
			    	// Fix for Bug #1339.
			    	if (summary_output_form.citedref != null && summary_output_form.citedref.checked == true) {
			    		fields = "Full";
			    	}
			    	// Full Record
			    	else {
			    		fields = "FullNoCitRef";
			    	}
			    }
	        } catch (e) {
	          // use try/catch to continue execution leaving fields as undefined, in case of exception.
	          ;
	        }
	
		    // Copy values to hidden elements in both forms for submission
		    document.forms["summary_output_form"].elements["selectedIds"].value  = selectedIdsArray.join(";");
			document.forms["summary_output_form"].elements["format"].value = format;
			document.forms["summary_output_form"].elements["fields"].value = fields;
	
	        // no need to create and copy variables to summary records form if we do not have
	        // quick output buttons on that form.
	        if (dont_populate_summary_records_form == null) {
		        document.forms["summary_records_form"].elements["selectedIds"].value = selectedIdsArray.join(";");
	    		document.forms["summary_records_form"].elements["format"].value = format;
			    document.forms["summary_records_form"].elements["fields"].value = fields;
	
			    // Add value from the bottom form's 'Step 1' radio selections
			    // (select, all, range) to hidden in top form
			    for (var i=0; i < summary_output_form.record_select_type.length; i++)	{
	   			    if (summary_output_form.record_select_type[i].checked) {
			          document.forms["summary_records_form"].elements["record_select_type"].value =
			      	    summary_output_form.record_select_type[i].value;
	      		    }
	   		    }
	
				try {	// in the event we dont have a summary_output_form as in cited ref pages
	   		    // Add value from the bottom form's 'Step 3' save options
			    // (text, html, reference, etc.) to hidden in top form
			    document.forms["summary_records_form"].elements["mark_to"].value =
				    document.forms["summary_output_form"].elements["mark_to"].value;
	
			    document.forms["summary_records_form"].elements["mark_from"].value =
				    document.forms["summary_output_form"].elements["mark_from"].value;
				} catch (e) {
	          	;
	        	}
	        }
		}
	}
	// Full record page
	else {
		//alert("update_quick_output: (full_record) format: "+format);
      var full_record_form = document.forms["full_record_form"];
	  var fields = "";

	    if (full_record_form.qo_fields[0].checked == true) {
	    	// Authors, Title, Source plus Abstract
	    	var abstractBox = document.forms["full_record_form"].elements["abstract"].checked;
	    	//if (full_record_form.abstract.checked == true) {
	    	if (abstractBox == true) {
	    		fields = "BibAbs";
	    	}
	    	// Authors, Title, Source
	    	else {
	    		fields = "Bib";
	    	}
	    }
	    else if (full_record_form.qo_fields[1].checked == true) {
		    // BugNo: 1432 display of Citedreferences on fullrecord page.
	      	if (full_record_form.citedref != null && full_record_form.citedref.checked == true) {
		    	fields = "Full";
	    	}
	    	else {
	    		fields = "FullNoCitRef";
	    	}
	    }
		document.forms["full_record_form"].elements["format"].value = format;
		document.forms["full_record_form"].elements["fields"].value = fields;

	}
}//end update_quick_output


function disable_auto_submit() {

  // form containing summary recs and checkboxes
  var summary_records_form = document.forms["summary_records_form"];

  if ( summary_records_form ) {
	summary_records_form.setAttribute('auto_submit_url',null);
//debug_alert('nulled out auto_submit_url');
//debug_alert('and it is '+summary_records_form.getAttribute('auto_submit_url'));
  }

  return true;
}


function auto_submit_markedlist( redirect_url ) {

  // form containing summary recs and checkboxes
  var summary_records_form = document.forms["summary_records_form"];
  var count_new_items_marked = 0;
  
  if ( summary_records_form ) {
	//Making sure AutoSubmit to honor the currently selected records on the page.
	mark_selected_records_onpage('add');

	if ( redirect_url && redirect_url.length > 0 ) {
	  //summary_records_form.elements["redirect_url"].value = redirect_url;
	  var redirectUrlObj= summary_records_form.elements["redirect_url"];
	  if(redirectUrlObj !=null){
	  	redirectUrlObj.value=redirect_url;
	  }

//debug_alert('setting redirect url');
	  // summary_records_form.submit();
	} else {
		// This works even for undefined, empty, null, nonnumeric, or NaN values.
		count_new_items_marked = summary_records_form.count_new_items_marked.value;
		if (count_new_items_marked > 0) {
	  		postAsyncForm( 'summary_records_form', 'auto_submit_url' );
		}
	}
  }
  // just in case
  disable_auto_submit();
  
  return false;
}

function auto_submit_checkboxes( redirect_url ) {
  // form containing summary recs and checkboxes
  var summary_records_form = document.forms["summary_records_form"];
//debug_alert('In auto_submit_checkboxes');

  if ( summary_records_form ) {
//debug_alert('Calling postAsyncForm');
	postAsyncCheckboxForm( 'summary_records_form', 'auto_submit_url' );
  }

  return false;
}

// Update the marked list for quick output
function update_mark_list(format) {

	// form containing top 'Print','Add to MarkedList' 'Email', etc. buttons plus summary recs
	var summary_records_form = document.forms["summary_records_form"];

	var mark_id = null;
	if(summary_records_form != null)
		mark_id=summary_records_form.mark_id;

	// form containing the bottom quick output widgets
	var summary_output_form = document.forms["summary_output_form"];

	// get all selected records on page
	var selectedIdsArray = new Array();
	
    // Summary Page
    if(summary_records_form != null) {

	    if (mark_id != null && (mark_id.value == 'RXN' || mark_id.value == 'CPD')) {
			var selected_range=0;
	
			if (format == "add_page") {
			   for( var i=0; i<summary_records_form.marked_list_candidates.length; i++){
			       summary_records_form.marked_list_candidates[i].checked = true;
			   }
			   format = "add";
			}
	
			for( var i=0; i<summary_records_form.marked_list_candidates.length; i++){
				if(summary_records_form.marked_list_candidates[i].checked == true){
					var val = summary_records_form.marked_list_candidates[i].value;
					selectedIdsArray.push(val);
				}
			}
			summary_records_form.selectedIds.value = selectedIdsArray.join(";");
			selected_range = selectedIdsArray.length;
	
			summary_records_form.mode.value = "addToMark";
			summary_records_form.count_new_items_marked.value = selected_range;
	
		}
		else if (summary_records_form.marked_list_candidates != null)
	    {
	    	
	    	//new code for usage reporting
			var selected_range=0;
	
			if (format == "add_page") {
			   for( var i=0; i<summary_records_form.marked_list_candidates.length; i++){
			       summary_records_form.marked_list_candidates[i].checked = true;
			   }
			   format = "add";
			}
	
	    	if (summary_output_form.record_select_type[0].checked == true) {
	    	   mark_selected_records_onpage(format);
	    	   return;
	        }
	        else if (summary_output_form.record_select_type[1].checked == true) {
		    	for( var i=0; i<summary_records_form.marked_list_candidates.length; i++){
					var val = summary_records_form.marked_list_candidates[i].value;
					selectedIdsArray.push(val);
				}
	
			    // Copy values to hidden elements in both forms for submission
			    summary_output_form.selectedIds.value  = selectedIdsArray.join(";");
				summary_records_form.selectedIds.value = selectedIdsArray.join(";");
				selected_range = selectedIdsArray.length;
			}
	        else if (summary_output_form.record_select_type[2].checked == true) {
				summary_records_form.mark_to.value =summary_output_form.mark_to.value;
				summary_records_form.mark_from.value =summary_output_form.mark_from.value;
	
				selected_range = summary_records_form.mark_to.value - summary_records_form.mark_from.value + 1;
			}
	
			if(format == "add") {
				summary_output_form.mode.value = "addToMark";
				summary_records_form.mode.value = "addToMark";
			}
			// code for usage reporting
			summary_output_form.count_new_items_marked.value = selected_range;
			summary_records_form.count_new_items_marked.value = selected_range;
			// Add value from the bottom form's 'Step 1' radio selections
			// (select, all, range) to hidden in top form
			for (var i=1; i < summary_output_form.record_select_type.length; i++)	{
	 			if (summary_output_form.record_select_type[i].checked) {
		        	summary_records_form.record_select_type.value =summary_output_form.record_select_type[i].value;
	     		}
			}
		}
	}
	// Full record page
	else {
      	var full_record_form = document.forms["full_record_form"];

		if(format == "add") {
    		document.forms["full_record_form"].elements["mode"].value = "addToMark";
    		document.forms["full_record_form"].elements["count_new_items_marked"].value = "1";
    	}
	}
}

function get_named_inputs( input_name ) {

  var results = new Array();
  var summary_records_form = document.forms["summary_records_form"];

  if (summary_records_form != null &&
	  summary_records_form.elements[input_name] != null)
    {
      var type = summary_records_form.elements[input_name].type;
      if ( type == "hidden" || type == "checkbox" ) {
		results[0] = summary_records_form.elements[input_name];
	  } else {
		results = summary_records_form.elements[input_name];
	  }
	}

  return results;
}

function get_markedlist_checkboxes() {

  var results = new Array();
  var summary_records_form = document.forms["summary_records_form"];

  if (summary_records_form != null &&
	  summary_records_form.marked_list_candidates != null)
    {
// BUG:600,601,619 : for single record summary page and single record selection.
// summary_records_form.marked_list_candidates.length turns to be undefined when
// there is only record in the summary page. The following condition
// checks for single record and whether its selected or not before sumitted.
	  if( summary_records_form.marked_list_candidates.type == "checkbox") {
		results[0] = summary_records_form.marked_list_candidates;
	  } else {
		results = summary_records_form.marked_list_candidates;
	  }
	}

  return results;
}

// Prepare for request to update marked list indicators
function update_markedlist_indicators( mlForm ) {

  if ( ! mlForm )
	return false;

  var candidateForm = null;
  var formName = mlForm.getAttribute('records_form_name');

  if ( formName && formName.length > 0 ) {
	
	candidateForm = document.forms[formName];
  } else {
	candidateForm = document.forms["summary_records_form"];
	if ( ! candidateForm )
	  candidateForm = document.forms["full_record_form"];
  }
  var candidates = new Array();
  if ( candidateForm ) {
//06_05_08	var candidates = new Array();
	var markId = candidateForm.elements["mark_id"];
	if ( markId ) {
		mlForm.elements["mark_id"].value = markId.value;
		var allCandidates = get_named_inputs('ml_indicator_candidates');
		if ( allCandidates.length > 0 ) {
			for ( var i = 0; i < allCandidates.length; ++i ) {
				candidates.push( allCandidates[i].value );
			}
			// unset allCandidates?
			//alert(" candidates= "+candidates.toString());
		} else {
			var currIdx = null;
			var startRec = mlForm.elements["startRec"];
			if ( startRec ) {
	  			currIdx = startRec.value;
			}
			if ( currIdx == null ) {
		  		currIdx = 1;
			}

			var allCheckboxes = get_markedlist_checkboxes();
			if ( allCheckboxes.length > 0 ) {
 			    var indicator, name;

				for ( var i = 0; i < allCheckboxes.length; ++i, ++currIdx ) {
				    name = "ml_indicator_" + currIdx;
					indicator = document.getElementById( name );
	//if ( indicator )
	//alert('indicator '+name+' is '+indicator+' and has:"'+indicator.innerHTML+'"');
	//else
	//alert('indicator '+name+' is null');

					if ( indicator == null || indicator.innerHTML.length == 0 ) {
					   candidates.push( allCheckboxes[i].value );
					   candidates.push( currIdx );
					}
				}
			} else {
			    // full record, most likely
			    //  this could be extended to handle multiple records by
			    //    splitting "selected" on ';' and iterating as is done
			    //    above for allCheckboxes
			    var selected = candidateForm.elements["selectedIds"];
				if ( selected ) {
				  // alert('trying with selected '+selected.value);
				   candidates.push( selected.value );
				   candidates.push( currIdx );
				}
			}
		}
		mlForm.elements["candidates"].value = candidates.join(";");
	}
  }

  return ( candidates.length > 0 );
}

// Update the marked list for quick output
function mark_selected_records_onpage(format){

	var summary_records_form = document.forms["summary_records_form"];
	var summary_output_form = document.forms["summary_output_form"];
	
	// get all selected records on page
	var selectedIdsArray = new Array();
	var mark_id = null;
	if(summary_records_form != null)
		mark_id=summary_records_form.mark_id;

	if(summary_records_form != null && mark_id != null && (mark_id.value == 'RXN' || mark_id.value == 'CPD')) {
		//summary_output_form is not available in WOS-CHEM StructureSearch summary results page.
		summary_output_form = summary_records_form;
	}

	if (summary_records_form != null) {
	
		if(format == "add") {
				summary_output_form.mode.value = "addToMark";
				summary_records_form.mode.value = "addToMark";
		}
		
		if (summary_records_form.marked_list_candidates != null)
    	{
	     try {
		     // BUG:600,601,619 : for single record summary page and single record selection.
		     // summary_records_form.marked_list_candidates.length turns to be undefined when
		     // there is only record in the summary page. The following condition
		     // checks for single record and whether its selected or not before sumitted.
		     if( summary_records_form.marked_list_candidates.type == "checkbox") {
		      	var val = summary_records_form.marked_list_candidates.value;
		      	if(summary_records_form.marked_list_candidates.checked == true) {
		     	    selectedIdsArray.push(val);
		       }
		     }
		     else{
		       for( var i=0; i<summary_records_form.marked_list_candidates.length; i++){
					var val = summary_records_form.marked_list_candidates[i].value;
					if(summary_records_form.marked_list_candidates[i].checked == true) {
					    selectedIdsArray.push(val);
					}
		       }
			 }
	     } catch (e) {
	      ;
	     }

	    // Copy values to hidden elements in both forms for submission
	    try {
		    summary_output_form.selectedIds.value  = selectedIdsArray.join(";");
			summary_records_form.selectedIds.value = selectedIdsArray.join(";");

			//WOS-CHEM Structure Summary does not have the summary_output form.
			if(mark_id != null && mark_id.value != 'RXN' && mark_id.value != 'CPD')
		    	summary_records_form.record_select_type.value = summary_output_form.record_select_type[0].value;
			summary_output_form.count_new_items_marked.value = selectedIdsArray.length;
			summary_records_form.count_new_items_marked.value = selectedIdsArray.length;
		} catch (e) {
		 ;
		}
		}
	}
}

// validate input for quick output
function check_qo_input() {
  if (!check_output_range()) {
      return false;
  }

  return true;
}

function check_ml_input() {
	if (!check_output_range("marked_list")) {
    	return false;
  	}

	return true;
}

// check if from and to values for the range are valid. If not display the appropriate
// message.
function check_output_range(format) {

	// Get form containing top 'Print','Add to MarkedList' 'Email', etc. buttons plus summary recs
	var summary_records_form = document.forms["summary_records_form"];
	// Summary page with no checkboxes (bug 1828)
	if (summary_records_form != null && summary_records_form.marked_list_candidates == null){
			//alert("Quick Output features are not available for this page.");
			var errorMessage = document.getElementById('quickOutputNotAvailable').value;
			alert(errorMessage);
			return false;
		}
		
    var record_select_type_range = document.getElementById("record_select_type_range");

    if (record_select_type_range == null || record_select_type_range.checked == false) {
		//Checking for atleast one checkbox to be selected for quick output.
        if( document.forms["summary_output_form"].elements["selectedIds"].value.length == 0 ){
	    	var no_checks_selected_error = document.getElementById("no_checks_selected_error");

	    	 if (no_checks_selected_error != null) {
	    		alert(no_checks_selected_error.value);
	    		return false;
	    	}
	    }

        return true;
    }

    var mark_from =  document.forms["summary_output_form"].elements["mark_from"];
    var mark_to =  document.forms["summary_output_form"].elements["mark_to"];
    mark_from.value = (mark_from.value).replace(/^\s*|\s*$/g,'');
    mark_to.value = (mark_to.value).replace(/^\s*|\s*$/g,'');

    if (mark_from == null || mark_to == null) {
        return true;
    }

	var regexpr =/\D/;
	if ( regexpr.test(mark_from.value) || regexpr.test(mark_to.value) ) {
		var range_specialchar_error =  document.getElementById("range_specialchar_error");
		if (range_specialchar_error != null) {
            alert (range_specialchar_error.value);
            
            // Modification for bug 4121
            // Leftover invalid range causes problem for navigation.
            // So clean up.
            var summary_output_form = document.forms["summary_output_form"];
            summary_output_form.elements["mark_from"].value = "";
            summary_output_form.elements["mark_to"].value = "";
            
            return false;
        }
	}


    var from = parseInt(mark_from.value);
    var to = parseInt (mark_to.value);

    if ( isNaN(from) || isNaN(to) || (from == 0) || (to == 0) || (from > to) || (from < 0) ) {
        var range_notsequential_error =  document.getElementById("range_notsequential_error");

        if (range_notsequential_error != null) {
            alert (range_notsequential_error.value);
            return false;
        }
    }

    var result_count = document.getElementById("result_count");

    if (result_count != null ) {
        var range_notinset_error =  document.getElementById("range_notinset_error");


        if (result_count !=null && ( (to > result_count.value) || (from > result_count.value) )) {
            if (range_notinset_error != null) {
              alert(range_notinset_error.value);
              return false;
            }
        }
    }

    if ( (to - from) > 499) {
        var range_morethan500_error =  (format == "marked_list")? document.getElementById("ml_range_morethan500_error") :document.getElementById("range_morethan500_error");
        if (range_morethan500_error != null) {
            alert(range_morethan500_error.value);
            return false;
        }
    }


	return true;
}

function set_output_range_option() {
     var record_select_type_range = document.getElementById("record_select_type_range");
     record_select_type_range.checked = true;
     return true;
}

function open_cwc_location(theURL,winName) {
     var win_w = parseInt(screen.width * .85);
     var win_h = parseInt(screen.height * .70);
     winprops = 'height='+win_h+',width='+win_w+',top=70,left=60,directories=yes,location=yes,'+
                'menubar=yes,resizable=yes,scrollbars=yes,status=yes,toolbar=yes';
     newwindow=window.open(theURL, winName, winprops);
     if (window.focus) {newwindow.focus()}
     return false;
}

function handle_nav_final_counts_MovedToAsyncJS(final_hit_count, final_page_count) {

	//declare spans to be changed
	var recs_count_top = document.getElementById('hitCount.top');
	var page_count_top = document.getElementById('pageCount.top');
	var recs_count_bottom = document.getElementById('hitCount.bottom');
	var page_count_bottom = document.getElementById('pageCount.bottom');

	//replace all the ...'s with real values, if needed. Clear it and replace it.
	if (recs_count_top.innerHTML.match(/\.\.\./)) {
			recs_count_top.innerHTML = "";
			recs_count_top.innerHTML = final_hit_count;
	}


	if (page_count_top.innerHTML.match(/\.\.\./)) {
			page_count_top.innerHTML = "";
			page_count_top.innerHTML = final_page_count;
	}


	if (recs_count_bottom.innerHTML.match(/\.\.\./)) {
			recs_count_bottom.innerHTML = "";
			recs_count_bottom.innerHTML = final_hit_count;
	}


	if (page_count_bottom.innerHTML.match(/\.\.\./)) {
			page_count_bottom.innerHTML = "";
			page_count_bottom.innerHTML = final_page_count;
	}

}//end function handle_nav_final_counts

// Function to handle multiple options in a search box
// Params: 1) Selected extended option
//         2) Default option
//		   3) Element ID to toggle
function updateExtendedOption(selectE, defaultE, elemID){
	if (document.getElementById(elemID).value == selectE) {
		document.getElementById(elemID).value = defaultE;
	}
	else {
		document.getElementById(elemID).value = selectE;
	}
}


function initMultiSelectDelimiter() {
	var multiSelectDelimiter = ', ';
	if (document.forms[0].product.value=="MEDLINE") {
		multiSelectDelimiter = ';;';
	}
	return multiSelectDelimiter;
}


// Function to select values in a multiselect box
// Params: 1) Select box object
//         2) String of selected values, delimited by ', '
function selectMultiSelects(select, selected) {
	var multiSelectDelimiter = initMultiSelectDelimiter();

	var match = 0;

	if (selected.length > 0) {
		select.options[0].selected = false;
		var selects = selected.split(multiSelectDelimiter);
		for (i=0; i<select.length; i++) {
			for (j=0; j<selects.length; j++) {
				if (select.options[i].value == selects[j]) {
					select.options[i].selected = true;
					match = 1;
				}
			}
    	}
  	}

  	if (match == 0) {
		select.options[0].selected = true;
  	}
}

// remove unwanted starting and trailing spaces of the input textbox.
function trim_input (val) {
	if(val != null)
		val.value = val.value.replace (/^\s+|\s+$/g, '');
}

//To display the hidden client error messages
function show_client_error(layer,notice) {
    var client_error = document.getElementById(layer);
    if(client_error != null){
	    var display_msg = document.getElementById('client_error_input_message');

		if(client_error.style.display == "none") {
		  display_msg.innerHTML=notice;
		  client_error.style.display='block';
		}
		else{
			display_msg.innerHTML=notice;
		}
	}
    return false;
  }

//	Function to combine the selected options in a multi-select box into
//	a single (option[0]) value to be submitted to the server.  This
//	method will check all forms and process all multi-select selects.
//  This method is called from other javascript funcitons that assist in
//  form submittion (search forms, page navigation forms, etc)
function mergeMultiSelects() {
	var multiSelectDelimiter = initMultiSelectDelimiter();

	// Loop through all forms
	for(i=0; i<document.forms.length; i++) {
		var form = document.forms[i];

		// Loop through form elements
		for(j=0; j<form.elements.length; j++) {
			// We only care about multiselect boxes
			if (form.elements[j].type == "select-multiple") {
				var select = form.elements[j];
				var selected = '';

				// Loop through all options in this multi-select box
				for(k=0; k<select.options.length; k++) {
					// If this option is selected, add it to our single string
					if (select.options[k].selected == true) {
						if (selected.length > 0) {
							selected = selected + multiSelectDelimiter + select.options[k].value;
						} else {
							selected = select.options[k].value;
						}
						// Now unselect it
						select.options[k].selected = false;
					}
				}

				// Re-select the first option, and set the value to our delimited string
				select.options[0].value = selected;
				select.options[0].selected = true;
			}
		}
	}
}

//a more generic way of trimming a string
function _trim (str) {
	if(str == null){
		return str;
	}

	var s1 = str.replace (/^\s+|\s+$/g, '');

	return s1;
}


function hide_show(id, status){
	 document.getElementById(id).style.display = status;
}

function is_enter_key (event) {
  var charCode = (event.charCode) ? event.charCode :
        ((event.which) ? event.which : event.keyCode);
  return (charCode == 13 || charCode == 3 );
}

function submit_on_enter (format, objevent) {

  if (! objevent) objevent = event;

  var charcode = objevent.which;
  if (! charcode)
      charcode = objevent.keyCode;

  var is_safari = navigator.userAgent.indexOf('Safari')>0;
  if (is_safari && charcode == 3) charcode = 13;

  if (charcode == 13) {
  	disable_auto_submit();
  	update_mark_list(format);
  	if(check_ml_input()){
	  	document.forms["summary_output_form"].submit();
	  	return false;
  	}
  }
  return true;
}

function check_chem_editions(skip_input_field,action)
  {
  var no_chem_editions_selected_message = document.getElementById("editions_not_selected_error").value;
  var no_ccr_or_ic_message = document.getElementById("no_ccr_or_ic_error").value;
  var no_ccr_message = document.getElementById("no_ccr_error").value;
  var notice = document.getElementById("input_invalid_notice").value;

  var structure_search_form = document.forms["WOS_StructureSearch_input_form"];
  var molecule_form = parent.frames[0].document.forms["moleculeForm"];
  var editions = structure_search_form;
  var ic=0;
  var ccr=0;
  var invalid_input=true;

  structure_search_form.action.value = action;

  for (i=0; i<structure_search_form.elements.length; i++) {
      var e = structure_search_form.elements[i];
      if ( e.type == "text" || e.type == "textarea"){
      	trim_input(e);
      	if(e.value.length>0){
      		invalid_input = false;
      		break;
      	}
      }
    }
    if(invalid_input){
	    try{
	    	var sel=document.getElementById("RXATMOSPHERE");
	    	if(sel != null  && sel.value!="")
	    		invalid_input=false;
	    	if(invalid_input && molecule_form.molecule.value == "" && structure_search_form.molecule.value == ""){
	    		show_client_error("client_input_error",notice);
	      		return false;
	      	}
	    }catch(e){
	    	;
	    }
    }

  for (var i=0; i< editions.length; i++) {
    if (editions[i].value == "CCR")  {
       ccr=1 ;
       if ( editions[i].checked ) {
         ccr=2 ;
         }
       }
    if (editions[i].value == "IC") {
      ic=1 ;
      if (editions[i].checked ) {
        ic=2 ;
        }
      }
    }
  if (ic == 1 && ccr ==1 ||
      ic == 0 && ccr ==1 ||
      ic == 1 && ccr ==0)  {
    if (skip_input_field == "yes") {
      show_client_error("client_input_error", no_chem_editions_selected_message);
    } else {
      show_client_error("client_input_error", no_ccr_or_ic_message);
      }
    return false;
    }

  if (skip_input_field == "yes") return true;

  if (ccr == 1  &&
       (structure_search_form.RXPRESSURE.value.length != 0 ||
        structure_search_form.RXTIME.value.length != 0  ||
        structure_search_form.RXTEMP.value.length != 0   ||
        structure_search_form.RXYIELD.value.length != 0  ||
        structure_search_form.RXOTHER.value.length != 0  ||
        structure_search_form.RXKEYPHRASES.value.length != 0 ||
        structure_search_form.RXCOMMENTS.value.length != 0  ||
        structure_search_form.RXREFLUX.checked ||
        structure_search_form.RXATMOSPHERE.value.length != 0 ) ) {
        	show_client_error("client_input_error", no_ccr_message);
		    return false;
    }
  return true;
  }

function inlinewrap(obj_name)
{
	BrowserDetect.init();
	var span = document.getElementById(obj_name);
	if (BrowserDetect.browser == "Explorer") {
		var temp = span.innerHTML;
		span.innerHTML = "";
		span.innerHTML = '<div style="inline;">' + temp + "</div>";
	}
	span.style.display="inline";
	return true;
}

function providefeedback(url,curr_page)
{
    var form = document.forms[0];
    var winprops;
    var newwindow;
    var winName = 'Cluster_Feedback_Form';
    var win_w = parseInt(screen.width * .80);
    var win_h = parseInt(screen.height * .80);
    var i;

    var c_value = "";

    var curr_sel = document.summary_records_form.selectedClusterCount.value;
    if ( curr_sel < 1){
      var errorMessage = document.getElementById('daisyFeedbackSelectAtLeastOneCheckbox').value;
	  alert(errorMessage);
      //alert("Please select at least 1 set using the checkboxes.");
      return false;
    }
    winprops = 'height='+win_h+',width='+win_w+',top=70,left=60,directories=yes,location=yes,'+'menubar=yes,resizable=yes,scrollbars=yes,status=yes,toolbar=yes';

    newwindow=window.open(url, winName, winprops);

    document.summary_records_form.target=winName;

    handle_nav( null,curr_page,url);

    document.summary_records_form.target=window.name;

    if (window.focus) { newwindow.focus(); }

    return false;
}

function isEmpty(msg)
{
    var form=document.forms[0];
    var check = -1;
    var elem = document.getElementById('Name');

    if(elem.value.length == 0)
    {
        alert(msg);
        elem.focus();
        return false;
    }
    for (i=0; i < form.author_verify.length; i++)
    {
          if(form.author_verify[i].checked)
              check = 1;
    }

    if(check == -1)
    {
        var errorMessage = document.getElementById('daisyFeedbackSelectAreYouAuthor').value;
	    alert(errorMessage);
        //alert("Please indicate whether you are the author of the papers using the radio buttons at the top of the form.");
        form.author_verify[0].focus();
        return false;
    }

    return true;
}

function check_plugin(url){
	var ISI_plugin_installed=plugin_check(url);
	var plugin_param="";
	if(!ISI_plugin_installed)
	{
		plugin_param="&ISIPlugin=false";
	}
	window.location=url+plugin_param;
	return true;
}

function prepare_window_location(window_location) {
//	alert("Assigning window location:" + window_location);
		 return go_to_url(window_location);
//		 return false;
}
//////////Follwoing function is used for right click /////////////////////////////////
function IsAllowedRightClick(o){
   //Business Logic is here
  var allowedLinks=document.getElementsByName("LinksAreAllowedRightClick");
  for (i=0;i<allowedLinks.length;i++) {
       if(o.href.indexOf(allowedLinks[i].value)>(-1)){
          if(o.href.indexOf('&cacheurlFromRightClick=no')<=(-1)){//this is make assure the param only added once
             o.href=o.href+'&cacheurlFromRightClick=no';
          }
          //Only for the link which has been rightclicked,this click handler is added for remove cacheurlFromRightClick
	  if(navigator.appName.indexOf("Microsoft Internet Explorer")>(-1)){
	          addEvent(o, "click",CLHandlerRmCFRC(o));
	  }
	  if(navigator.appName.indexOf("Netscape")>(-1)){
	          o.setAttribute("onclick","javascript:return RmCacheurlFromRightClick(this);");
          }            
          return true;
       }       
  }
  return false;
}
//this function will be revoked for the link which has been rightclicked before
function RmCacheurlFromRightClick(o){
  if(o.href.indexOf('&cacheurlFromRightClick=no')>(-1)){//If there is a right click on this link
     o.href=o.href.replace('&cacheurlFromRightClick=no','');
  }
  return true;
}



function addEvent(obj, eventType, fn)
{
	if (obj.addEventListener)
	{
		obj.addEventListener(eventType, fn, false);
		return true;
	}
	else if (obj.attachEvent)
	{
		var r = obj.attachEvent("on" + eventType, fn);
		return r;
	}
	else
	{
		return false;
	}
}

addEvent(window, "load", function(){
	for (i=0;i<document.links.length;i++) {
	       if(navigator.appName.indexOf("Microsoft Internet Explorer")>(-1)){
	          addEvent(document.links[i], "contextmenu",CTHandler(document.links[i]));
	       }

	       if(navigator.appName.indexOf("Netscape")>(-1)){
	          var lo=document.links[i];
	          lo.setAttribute("oncontextmenu", "javascript:return IsAllowedRightClick(this);");
	       }  
	}
});
 
function displayProd(key){
	var span =  document.getElementById("editions_" + key);
	span.style.display="inline";
	var spanMore =  document.getElementById("editions_more_" + key);
	spanMore.style.display="none";
	var spanHide =  document.getElementById("editions_hide_" + key);
	spanHide.style.display="inline";
}

function undisplayProd(key){
	var span =  document.getElementById("editions_" + key);
	span.style.display="none";
	var spanMore =  document.getElementById("editions_more_" + key);
	spanMore.style.display="inline";
	var spanHide =  document.getElementById("editions_hide_" + key);
	spanHide.style.display="none";
}
 
function CTHandler(o)
{
	return function(){return IsAllowedRightClick(o);}
} 

function CLHandlerRmCFRC(o)
{
	return function(){return RmCacheurlFromRightClick(o);}
} 
//////////ABOVE function is used for right click /////////////////////////////////