/*******************************************************************************
 * This JavaScript file containes all the utility methods used by applications
 * for loading the gadgets on their respective pages.
 ******************************************************************************/

var isKeyEventURLExists;
var isUserPrefURLExists;
var isGadgetRemoveURLExists;
var Toolbarorientation;
var toolbarWidth;
var tbWidthwithoutImage;

var submenuID;
var submenuID1;
var subMenuIdBuf;
var debug = false; // flag for debug mode
if (document.location.href.indexOf('debug=y') > 0)
	debug = true;
var gadgetPrefs = {};// variable to store user preferences
var sciverseObj;    //variable to store parsed sciverse object
var isUserEntitledtoGadgets;
/* varibales to hold the gadgetutils path */
var gadgetIconPath;
var gadgetJSPath;
var gadgetHTMLPath;

/* To store Metadata varibales*/
var userPrefs;
var browserVersion =navigator.appVersion;
var MSIE7Flag;
if (browserVersion.indexOf('MSIE 7.0')>0){MSIE7Flag=true;}
/*
 * This Function is called from the displaygadgetsHome() function. It in turn
 * calls the shindig APIs to render the gadgets on the homepage
 */
 
 
 
function renderGadgetsHome() {
	// validate if 3 columns to render the gadgets are present on the page
	if (jQuery('#column0').length == 0 || jQuery('#column1').length == 0
			|| jQuery('#column2').length == 0) {
		return false;
	}
	isUserEntitled();
	isKeyEventURLAvailable();
    isUserPrefURLAvailable();
    isGadgetRemoveURLAvailable();
	isAppManageEnabled();
	populateHelpIconPath();
	var gadgetHeightFromPrefs;
	
   	if(!isUserEntitledtoGadgets){
		jQuery('#ErrormessageDiv').css('display','block');
		jQuery('#ErrormessageDiv').html('You currently have no applications');
		
	}
	// call processMetadata to populate the user preferences in the variable
	// gadgetPrefs
	processMetadata();
	var columnNo = -1;
	//create the Layout Manager
	shindig.container.layoutManager = new shindig.FloatLeftLayoutManager();
	
	// loop through the gadgetInfo object of sciverse JSON for gadget details
		jQuery.each(
					sciverseObj.gadgetInfo,
					function(index, g) {
					
						//assign the column id to the gadget 
							columnNo = columnNo + 1;
							if(columnNo%3==0){columnNo=0;}
							shindig.container.layoutManager.layoutRootId_ = 'column'+columnNo;
							if (typeof(g.gadgetMetadata) != 'undefined' && g.gadgetMetadata != null) {
							    gadgetHeightFromPrefs = (typeof(g.gadgetMetadata.height) != 'undefined' && g.gadgetMetadata.height != null && g.gadgetMetadata.height != 0) ? g.gadgetMetadata.height : null;
							}
							// check if debug flag is set and if true, create
							// the debug window for the gadget
							if (debug)
								debugArea = shindig.container.layoutManager
										.getGadgetDebugChrome(g.gadgetId, g.location);
							// if userPrefs are null, then create a new Array object
							if(gadgetPrefs[g.url].uprefObj == null) {
								userPrefs = new Array();
							} else {
								userPrefs = gadgetPrefs[g.url].uprefObj;
							}
							// call creategadget API of Shindig and pass title ,
							// url and user preferences
							var gadget = shindig.container.createGadget( {
								specUrl :g.url,
								title :g.gadgetName,
								userPrefs :userPrefs,
								height:gadgetHeightFromPrefs
							});
							// populate gadget variable with additional info
							gadget.sciverseId_ = g.gadgetId;
							gadget.closed_ = g.closed;
							gadget.location = g.location;
							gadget.iconURL =(g.gadgetIcon==null||g.gadgetIcon=='') ? gadgetIconPath+'/netbase.gif' : g.gadgetIcon;
							gadget.removable=g.removable;
							gadget.hasUserPrefs = gadgetPrefs[g.url].hasUserPrefs;
							// add the gadget
							shindig.container.addGadget(gadget);
							// render the gadget on the page
							shindig.container.renderGadget(gadget);
							var gadgetState=(g.closed) ? 'close' : 'open';
					
						ajaxKeyEventLog('gadget','displayGadget',g.gadgetId,sciverseObj.contextInfo.pageType,'','PageView',false,gadgetState,'')
					});
					truncateGadgetTitleAsNecessary();
					
}
/*
 * This Function is called from the displayGadgets() function. It in turn
 * calls the shindig APIs to render the gadgets on the ResultsPage
 */
function renderGadgets() {
      isUserEntitled();
	isKeyEventURLAvailable();
    isUserPrefURLAvailable();
    isGadgetRemoveURLAvailable();
	isAppManageEnabled();
	populateHelpIconPath();
	
	var gadgetHeightFromPrefs;
	
	//Display HelpText in case the user is not entitled to any application
	if (!isUserEntitledtoGadgets){
		jQuery('#rptoolbar').css('text-align','center');
		jQuery('#rptoolbar').html('You currently have no applications');
		if (Toolbarorientation=='vertical'){onLoadToolbarStateVertical();}
	         else   {onLoadToolbarStateHorizontal();}	
	}
		if (Toolbarorientation=='vertical'){onLoadToolbarStateVertical();}
	         else   {onLoadToolbarStateHorizontal();}	
	
	// call processMetadata to populate the user preferences in the variable
	// gadgetPrefs
	processMetadata();
	// Create a new float left layout manager and pass the layout root
	shindig.container.layoutManager = new shindig.FloatLeftLayoutManager(
			'rptoolbar');
			
	// loop through the gadgetInfo object of sciverse JSON for gadget details
		jQuery.each(sciverseObj.gadgetInfo, function(index, g) {
				
					// check if debug flag is set and if true, create the debug
					// window for the gadget
				if (debug)debugArea = shindig.container.layoutManager.getGadgetDebugChrome(g.gadgetId, g.location);
				if (typeof(g.gadgetMetadata) != 'undefined' && g.gadgetMetadata != null) {
				    gadgetHeightFromPrefs = (typeof(g.gadgetMetadata.height) != 'undefined' && g.gadgetMetadata.height != null && g.gadgetMetadata.height != 0) ? g.gadgetMetadata.height : null;
				}
				// if userPrefs are null, then create a new Array object
				if(gadgetPrefs[g.url].uprefObj == null) {
					userPrefs = new Array();
				} else {
					userPrefs = gadgetPrefs[g.url].uprefObj;
				}
					// call creategadget API of Shindig and pass title , url and
					// user preferences
					var gadget = shindig.container
							.createGadget( {
								specUrl :g.url,
								title :g.gadgetName,
								userPrefs :userPrefs,
								height:gadgetHeightFromPrefs
							});
					// populate gadget variable with additional info
					gadget.sciverseId_ = g.gadgetId;
					gadget.closed_ = g.closed;
					gadget.location = g.location;
					gadget.removable = g.removable;
					gadget.iconURL =(g.gadgetIcon==null||g.gadgetIcon=='') ? gadgetIconPath+'/netbase.gif' : g.gadgetIcon;
					
					gadget.hasUserPrefs = gadgetPrefs[g.url].hasUserPrefs;

					log(gadget.sciverseId_, gadget.location, 'gadget created');
					// Add the gadget by calling addGadget() shindig API
					shindig.container.addGadget(gadget);
					log(gadget.sciverseId_, gadget.location, 'gadget added');
					// render the gadget by calling renderGadget() shindig API
					shindig.container.renderGadget(gadget);
					var gadgetState=(g.closed) ? 'close' : 'open';
					ajaxKeyEventLog('gadget','displayGadget',g.gadgetId,sciverseObj.contextInfo.pageType,'','PageView',false,gadgetState,'')
			});
			
	 truncateGadgetTitleAsNecessary();      
};

/*
 * This function populates the gadgetPrefs variable with gadget user preferences
 */

function processMetadata() {

    //function to populate metaData for gadgets
    getMetadataFromShindig();
    var prefs;

    for (var i = 0; i <= sciverseObj.gadgetInfo.length - 1; i++) {
        var ps = '{';
        gadgetPrefs[sciverseObj.gadgetInfo[i].url] = null;
        gadgetPrefs[sciverseObj.gadgetInfo[i].url] = {};
        gadgetPrefs[sciverseObj.gadgetInfo[i].url].uprefObj = null;
        gadgetPrefs[sciverseObj.gadgetInfo[i].url].hasUserPrefs = false;
        if (sciverseObj.gadgetInfo[i].gadgetMetadata) {
            if (typeof(sciverseObj.gadgetInfo[i].gadgetMetadata) != 'undefined' && sciverseObj.gadgetInfo[i].gadgetMetadata !== null) {
                prefs = sciverseObj.gadgetInfo[i].gadgetMetadata.userPrefs;
                for (var p in prefs) {
                    if (sgf.isPrefInContextInfo(p)) {
                        var up = '"' + p + '":{"name":"' + p + '", "value":"' + escape(sciverseObj.contextInfo[p]) + '","datatype":"hidden"}';
                        if (ps == '{') ps += up;
                        else ps += ', ' + up;
                    } else {
                        var prefValue = prefs[p]['default'];
                        if (sciverseObj.gadgetInfo[i].userPreferences) {
                            var storedPref = sciverseObj.gadgetInfo[i].userPreferences;
                            prefValue = storedPref[p].value;
                        }
                        var up = '"' + p + '":{"name":"' + p + '", "value":"' + prefValue + '","datatype":"' + prefs[p].type + '"}';
                        if (ps == '{') ps += up;
                        else ps += ', ' + up;
                    }
                    //}
                } //for p in prefs                               
            }
            ps += '}';

            if (ps != '{}') { // non empty user prefs
                // check if there are any non-hidden type prefs
                var uprefs = gadgets.json.parse(ps);
                var hasUserPrefs = false;
                for (var up in uprefs) {
                    if (uprefs[up].datatype != 'hidden') {
                        hasUserPrefs = true;
                        break;
                    }
                }
                gadgetPrefs[sciverseObj.gadgetInfo[i].url].uprefObj = uprefs;
                gadgetPrefs[sciverseObj.gadgetInfo[i].url].hasUserPrefs = hasUserPrefs;
            }
        } // if gadgetMetadata                           
    }
}

var sgf = sgf || {};
sgf.isPrefInContextInfo = function(pref){
      for (var c in sciverseObj.contextInfo){
            if (pref == c) {
                  return true;
            }
      }
      return false;
};

/*

This function calculates the maximum allowed width for gadget title 
and assigns ellipsis when that limit is reached. 


*/
function truncateGadgetTitleAsNecessary() {
    var ellipsArray = jQuery(".truncateTitle");
    var titleElementWidth = jQuery('.truncateTitle').width();
    if(typeof(titleElementWidth) != 'undefined' && titleElementWidth != 0) {
	    var titleLength = Math.floor(titleElementWidth / 7);
	    for (i = 0; i < ellipsArray.length; i++) {
	        var t = jQuery(ellipsArray[i]).text();
	        if (t.length > titleLength) {
	            jQuery(ellipsArray[i]).text(t.substring(0, (titleLength - 3)) + '...');
	        }
	    }
	}	
}
/*This function calls shindig metadata service and populates
 * the metadata for gadgets 
*/ 
function getMetadataFromShindig(){

	var gadgetparams=new Array();
	var moduleId = 0;
	for (var i = 0; i <= sciverseObj.gadgetInfo.length - 1; i++) {
	    if (sciverseObj.gadgetInfo[i].url != '' && !sciverseObj.gadgetInfo[i].gadgetMetadata) {
	        gadgetparams[moduleId] = ({
	            url: sciverseObj.gadgetInfo[i].url
	        });
	        moduleId++;
	    }
	}
	if(gadgetparams.length==0){return false;}
		
	  var request = {
	    context: {country: "US", language: "en", view: "profile", container: "default"},
	    gadgets: gadgetparams
	   
	  };	
		var req = gadgets.json.stringify(request);

		jQuery.ajax({
			type: 'POST',
			url: sciverseObj.smapiVars.metadataService,
			async: false,
			data: req,
			success: function(response) {
				var data = gadgets.json.parse(response);
				if (gadgets.json.stringify(data)=='{}'){return false;}
				if(data.gadgets) {
					var gadgetList= data.gadgets;
					for ( var j = 0, gadget; gadget = gadgetList[j]; j++) {
                         for(var i=0; i< sciverseObj.gadgetInfo.length; i++){
                               if(sciverseObj.gadgetInfo[i].url==gadgetList[j].url){
                                     sciverseObj.gadgetInfo[i].gadgetMetadata = gadget;
                                     break;
                               }
                         }   
					}
				}
			}
			});
}
/*
 * This function is called onload of HOmepage. It in turn loads the toolbar HTML
 * and calls renderGadgetsHome @param {Object} sciverse object @param {Object}
 * div id of the toolbar holder div
 */
function displayGadgetsHome(toolBardivID) {
	var divID = toolBardivID;
  	sciverseObj = gadgets.json.parse(sciverse);
  	if(typeof(sciverseObj) == 'undefined' || sciverseObj == false || sciverseObj == '') {
  		if(debug){
  			alert('No data available to render the gadgets');
  		}
  		return false;
  	}
  	
	setGadgetIHSURL();
	// validate if the div to render the gadgets exists on the page
	if ('#' + divID.length == 0) {
		alert("invalid toolbar location");
	} else {
		jQuery('#' + divID).load(gadgetHTMLPath+'/HomePageToolBar.html', function() {
		renderGadgetsHome();
		});
	}
}

/*
 * This function is called onload of ResultsPage. It in turn loads the toolbar
 * HTML and calls renderGadgets @param {Object} sciverse object @param
 * {Object} div id of the toolbar holder div
 */
function displayGadgets(toolBardivID, orientation) {
	var divID = toolBardivID;
  	sciverseObj = gadgets.json.parse(sciverse);
  	
  	if(typeof(sciverseObj) == 'undefined' || sciverseObj == false || sciverseObj == '') {
  		if(debug){
  			alert('No data available to render the gadgets');
  		}
  		return false;
  	}	
	toolbarWidth=parseInt(jQuery('#' + divID).css('width'),10);
	var toolbarImgWidth = 15;
	tbWidthwithoutImage= (toolbarWidth - toolbarImgWidth);
	toolbarWidth+='px';
	tbWidthwithoutImage+='px';
	setGadgetIHSURL();
	// validate if the div to render the gadgets exists on the page
	if ('#' + divID.length == 0) {
		alert("invalid toolbar location")
	} else {
		if (orientation.toLowerCase() == 'vertical') {
		Toolbarorientation=orientation;
			jQuery('#' + divID).load(gadgetHTMLPath+'/ResultPageToolBarVertical.html',
					function() {
						renderGadgets();
					});
		} else if (orientation.toLowerCase() == 'horizontal') {
		Toolbarorientation=orientation;
			jQuery('#' + divID).load(gadgetHTMLPath+'/ResultPageToolBarHorizontal.html',
					function() {
						renderGadgets();
					});
		} else {
			alert("Invalid Orientation");
		}
	}

}
/*
 * Function to load the toolbar (collapsed/shown)in case of horizontal orientation, depending on the value stored
 * in the session
 */
function onLoadToolbarStateVertical() {

	var toolbarHeight = parseInt(jQuery('#sciverse_toolbar').height()-7);
	toolbarHeight+='px';  
		
	if (sciverseObj.contextInfo.toolbarState) {
		jQuery('#toggleImg').css('background-image',
				'url('+gadgetIconPath+'/Show-applications.gif)');

		jQuery('#toolbar').css('width', '15px');
		jQuery('#sciverse_toolbar').css('display', 'none');
		jQuery('#toggleImg').css('height', '460px');
		jQuery('#toggleImg').attr('title', 'show');
		jQuery('#toggleImg').css('border-right','1px solid #c7c7c7');
	} else {
		jQuery('#toggleImg').css('background-image',
				'url('+gadgetIconPath+'/Hide-applications.gif)');
		jQuery('#toolbar').css('width', toolbarWidth);
		jQuery('#sciverse_toolbar').css('width', tbWidthwithoutImage);
		jQuery('#sciverse_toolbar').css('display', 'block');
		jQuery('#toggleImg').attr('title', 'hide');
		jQuery('#toggleImg').css('height',toolbarHeight );
		jQuery('#toggleImg').css('border-right','0px');
	}
}


/*
 Function to toggle the toolbar on the results Page
 */
function toggleToolbarVertical() {
	var toolbarState;
	var keyEventType = 'SubmitAction';
	var eventName = '';
	var failureStatus = false;
	
		toolbarHeight+='px';
	if (jQuery('#sciverse_toolbar').css('display') == 'block') {
		jQuery('#toggleImg').css('background-image',
				'url('+gadgetIconPath+'/Show-applications.gif)');

		jQuery('#toolbar').css('width', '15px');
		jQuery('#sciverse_toolbar').css('display', 'none');

	
		jQuery('#toggleImg').attr('title', 'show');

		jQuery('#toggleImg').css('height', '460px');
		jQuery('#toggleImg').css('border-right','1px solid #c7c7c7');
		toolbarState = 'Y';
		eventName = 'closeToolBar';
	} else {
		jQuery('#toggleImg').css('background-image',
				'url('+gadgetIconPath+'/Hide-applications.gif)');

		jQuery('#toolbar').css('width', toolbarWidth);
		jQuery('#sciverse_toolbar').css('width', tbWidthwithoutImage);
		jQuery('#sciverse_toolbar').css('display', 'block');
		var toolbarHeight = (jQuery('#sciverse_toolbar').height()-7)+ "px";
		jQuery('#toggleImg').attr('title', 'hide');
		
		jQuery('#toggleImg').css('height', toolbarHeight);
		jQuery('#toggleImg').css('border-right','0px');
		toolbarState = 'N';
		eventName = 'openToolBar';

	}
	truncateGadgetTitleAsNecessary();
	saveToolBarState(toolbarState, eventName, keyEventType, failureStatus);
}

/*
 * Function to load the toolbar (collapsed/shown) in case of horizontal orientation, depending on the value stored
 * in the session
 */
function onLoadToolbarStateHorizontal() {
	jQuery('#sciverse_toolbar').css('width', toolbarWidth);
	if (sciverseObj.contextInfo.toolbarState) {
		jQuery('#arrowImg').attr('src',gadgetIconPath+'/showDownArrow.gif');
		jQuery('#arrowImg1').attr('src',gadgetIconPath+'/showDownArrow.gif');
		jQuery('#FooterText').text('Show Applications');
		jQuery('#sciverse_toolbar').css('display', 'none');
	} else {
		jQuery('#arrowImg').attr('src',gadgetIconPath+'/hideUpArrow.gif');
		jQuery('#arrowImg1').attr('src',gadgetIconPath+'/hideUpArrow.gif');
		jQuery('#FooterText').text('Hide Applications');
		jQuery('#sciverse_toolbar').css('display', 'block');
	}
}

/*
 Function to toggle the toolbar on the results Page when orientation is horizontal
 */
function toggleToolbarHorizontal() {

	var toolbarState;
	var keyEventType = 'SubmitAction';
	var eventName = '';	
	var failureStatus = false;

	if (jQuery('#sciverse_toolbar').css('display') == 'block') {
		jQuery('#sciverse_toolbar').slideToggle('normal');
		jQuery('#arrowImg').attr('src',gadgetIconPath+'/showDownArrow.gif');
		jQuery('#arrowImg1').attr('src',gadgetIconPath+'/showDownArrow.gif');
		jQuery('#FooterText').text('Show Applications');
		toolbarState = 'Y';
		eventName = 'closeToolBar';
	} else {
		jQuery('#sciverse_toolbar').slideToggle('normal');
		jQuery('#arrowImg').attr('src',gadgetIconPath+'/hideUpArrow.gif');
		jQuery('#arrowImg1').attr('src',gadgetIconPath+'/hideUpArrow.gif');
		jQuery('#FooterText').text('Hide Applications');
		toolbarState = 'N';
		eventName = 'openToolBar';
	}
	if(sciverseObj.smapiVars.toolbarStateURL!=null||typeof(sciverseObj.smapiVars.toolbarStateURL)!=='undefined')saveToolBarState(toolbarState, eventName, keyEventType, failureStatus);
}

/*
 * Function to call the gadgetState actionbean,
 * through AJAX and save the toolbar state in session
 */
function saveToolBarState(obj, eventName, keyEventType, failureStatus) {
	var zone;
	if(isUserEntitledtoGadgets){
		zone = sciverseObj.gadgetInfo[0].location;
	}
	else{zone='';}
	var req = "originPage="+sciverseObj.contextInfo.pageType + "&" + "toolbarOpen=" + obj + "&"
			+ "eventName=" + eventName+"&" + "pageName=" + sciverseObj.contextInfo.pageType;

	req += "&" + "location="+sciverseObj.contextInfo.pageType + "&" + "keyEventType=" + keyEventType;
	req += "&" + "zone=" + zone + "&" + "failureStatus=" + failureStatus+"&"+"isKeyEventURLAvailble="+isKeyEventURLExists;

	jQuery.ajax( {
		type :'GET',
		url :sciverseObj.smapiVars.toolbarStateURL+"?",
		async :true,
		data :req
	});
}

/**
 * Function lo log the Key event to GadgetUsageActionBean
 *
 */

ajaxKeyEventLog = function(gadgetName,  activity, gadgetID,
		landingPage, targetURL, eventType, failureStatus,gadgetState,isPartnerIdRequired) {

	var eventHandler = '';
	var zone;
	if(isUserEntitledtoGadgets){
		zone = sciverseObj.gadgetInfo[0].location;
	}
	else{zone='';}
   var location=sciverseObj.contextInfo.pageType;
	for ( var i = 0; i <= arguments.length; i++) {
		if (arguments[i] == null)
			arguments[i] = '';
	}
	
	var keyString = "moduleName=" + gadgetName + "&" + "location=" + location
				+ "&" + "eventName=" + activity + "&" + "moduleId=" + gadgetID
				+ "&" + "pageName=" + sciverseObj.contextInfo.pageType + "&" + "zone=" + zone 
				+ "&" + "failed=" + failureStatus+"&" + "keyEventType=" +  eventType+"&" +"partner=" +  isPartnerIdRequired+"&" + "gadgetState=" + gadgetState+ "&" + "targetURL=" + targetURL;
		//alert(isKeyEventURLAvailable());
	if(isKeyEventURLExists){
		jQuery.ajax( {
			type :"GET",
			url :sciverseObj.smapiVars.keyEventURL+ "?",
			data :keyString
		});}
};

/*
 not a generic function. Being used to log two key events in one go. 
 */

function openAboutPage(aboutAppLink, failureStatus, gadgetId, gadgetName,location) {
	window.open(aboutAppLink);
	ajaxKeyEventLog(gadgetName, 'aboutGadget', gadgetId, 'AboutPage',aboutAppLink, 'outwardLink', failureStatus,'','');
}

/*
 function to open application gallery page and log the key event
 */

function openAddAppPage(location) {

	var url = sciverseObj.smapiVars.gadgetAddURL;
	window.location = url;	
	ajaxKeyEventLog(null,  'addGadget', null, 'AppGallery', url,
			'SubmitAction', false,'','');
}

/*
function to open manage my application page and log the key event
 */

function openManageAppPage(location) {

	var url = sciverseObj.smapiVars.gadgetManagePage;
	window.location = url;
	ajaxKeyEventLog(null,  'outwardLink', null, 'AppGallery', url,
			'outwardLink', false,'',true);
}
/*
function to open Help page and log the key event
 */

function openHelpPage(location) {
	var helpURL;
	var helpContextPath = sciverseObj.contextInfo.gadgetUtilsURL;
	helpContextPath = helpContextPath.substring(0,helpContextPath.indexOf("gadgets"));
	jQuery.ajax({
		type: 'POST',
		url: helpContextPath+'toolbarHelp',
		async: false,
		data: null,
		success: function(response) {
			helpURL = response;
		}
	});
	window.open(helpURL,'help','resizable=yes,scrollbars=yes,width=760,height=570');
	ajaxKeyEventLog(null,  'outwardLink', null, 'AppGallery', helpURL,
			'outwardLink', false,'','');
}

/*
function to Check if keyEvent URL is available in sciverse object or not
 */
function isKeyEventURLAvailable(){
	if (typeof(sciverseObj.smapiVars.keyEventURL)!=='undefined' && sciverseObj.smapiVars.keyEventURL!=null)
	{
		isKeyEventURLExists=true;
	} else 
	{
		isKeyEventURLExists=false;
	}
}
	
/*
function to Check if UserPref URL is available in sciverse object or not
 */			
function isUserPrefURLAvailable(){
	if (sciverseObj.smapiVars.gadgetUserPrefsURL==null) {
		isUserPrefURLExists=false;
	}
	else{
		isUserPrefURLExists=true;
	}
}
				
/*
function to Check if gadget remove URL is available in sciverse object or not
 */			
function isGadgetRemoveURLAvailable(){
	if (sciverseObj.smapiVars.removeGadgetURL==null) {
		isGadgetRemoveURLExists=false;
	}
	else{
		isGadgetRemoveURLExists=true;
	}
}				
						
/*
function to Check if user has the privileges to manage his apps. 
 */					
function isAppManageEnabled(){
	if(sciverseObj.contextInfo.individualUser){
		jQuery('#addManage').append('&nbsp;|&nbsp; <a onclick="openManageAppPage(sciverseObj.contextInfo.pageType)" style="cursor:pointer">Manage Applications</a>');
	}
}

/*
	Function to set the gadgetUtils URL to access the gadget images, javascript files & common html files
*/
function setGadgetIHSURL() {
		gadgetIconPath =sciverseObj.contextInfo.gadgetUtilsURL+'/images';
		gadgetJSPath = sciverseObj.contextInfo.gadgetUtilsURL+'/js';
		gadgetHTMLPath =sciverseObj.contextInfo.gadgetUtilsURL+'/html';
}			

/*
	This method is to set the absolute path for toolbar help icon. 
*/
	
function populateHelpIconPath() {
	var iconName=jQuery('#HelpImageId').attr('src');
	 jQuery('#HelpImageId').attr('src',gadgetIconPath+'/help_toolbar.gif');
	 jQuery('.iconadd').css('background-image','url('+gadgetIconPath+'/add.gif)');
}	

/* finds out if user has any entitlements sets the flag isUserEntitledtoGadgets accordingly */
function isUserEntitled(){
	if(sciverseObj.gadgetInfo.length==0||sciverseObj.gadgetInfo==''){
		isUserEntitledtoGadgets=false;
	}
	else{
		isUserEntitledtoGadgets=true;
	}
}					
/*******************************************************************************
 * ELSEVIER - SCIENCE CONFIDENTIAL
 * 
 * This document is the property of Elsevier Science (ES), and its contents are
 * proprietary to ES. Reproduction in any form by anyone of the materials
 * contained herein without the permission of ES is prohibited. Finders are
 * asked to return this document to the following Elsevier Science location.
 * 
 * Elsevier Science 360 Park Avenue South, New York, NY 10010-1710
 * 
 * Copyright (c) 2010 by Elsevier Science, a member of the Reed Elsevier plc
 * group. All Rights Reserved.
 ******************************************************************************/

