/*******************************************************************************
 * This JavaScript file containes all the utility methods used by applications
 * for loading the gadgets on their respective pages.
 ******************************************************************************/

var isKeyEventURLExists;
var isUserPrefURLExists;
var isGadgetRemoveURLExists;
var toolbarOrientation;
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

/* Code changes for EMBAPP Starts - 12/02/2010 */
var truncateURL;
if(browserVersion.indexOf('IE')>0){
	truncateURL = true;
}
/* Code changes for EMBAPP Ends - 12/02/2010 */

/*
 * This Function is called from the displaygadgetsHome() function. It in turn
 * calls the shindig APIs to render the gadgets on the homepage
 */
function renderGadgetsHome(locationDivId) {
    // validate if 3 columns to render the gadgets are present on the page
    if (jQuery('#column0').length == 0 || jQuery('#column1').length == 0 || jQuery('#column2').length == 0) {
        return false;
    }
    isUserEntitled();
    isKeyEventURLAvailable();
    isUserPrefURLAvailable();
    isGadgetRemoveURLAvailable();
   isAppManageEnabled(locationDivId);
    populateHelpIconPath();
    var gadgetHeightFromPrefs;

    if (!isUserEntitledtoGadgets) {
        jQuery('#ErrormessageDiv').css('display', 'block');
        jQuery('#ErrormessageDiv').html('You currently have no applications');

    }
    // call processMetadata to populate the user preferences in the variable
    // gadgetPrefs
    processMetadata();
    
    //vinay-begin
	gadgets.pubsub2router.init( {
      onSubscribe: function(topic, container) {
        return true;
      },
      onUnsubscribe: function(topic, container) {
        log(container.getClientID() + " unsubscribes from topic '" + topic + "'");
      },
      onPublish: function(topic, data, pcont, scont) {
        return true;
      }
    });    
    //vinay-end
        
    var columnNo = -1;
    //create the Layout Manager
    shindig.container.layoutManager = new shindig.FloatLeftLayoutManager();

    // loop through the gadgetInfo object of sciverse JSON for gadget details
    jQuery.each(
    sciverseObj.gadgetInfo, function (index, g) {
        /*Code for Change Request to handle the following scenarios
        1. when the given gadget does not support hover view
        2. when the gadget has userpref startMeInvisible=y */
		var isHoverViewAvailable = false;
		var isStartMeInvisible = false;
		if (typeof(g.gadgetMetadata) != 'undefined' && g.gadgetMetadata != null && typeof(g.gadgetMetadata.views) != 'undefined' && g.gadgetMetadata.views != null) {
		    for (var k in g.gadgetMetadata.views) {
		        if (k == 'hover') {
		        	isHoverViewAvailable = true;
		        	break;
		        }
		    }
		}
    
        jQuery.each(g.location, function (index, locationId) {
            if (locationDivId == locationId) {
                //assign the column id to the gadget 
                columnNo = columnNo + 1;
                if (columnNo % 3 == 0) {
                    columnNo = 0;
                }
                shindig.container.layoutManager.layoutRootId_ = 'column' + columnNo;
                if (typeof(g.gadgetMetadata) != 'undefined' && g.gadgetMetadata != null) {
                    gadgetHeightFromPrefs = (typeof(g.gadgetMetadata.height) != 'undefined' && g.gadgetMetadata.height != null && g.gadgetMetadata.height != 0) ? g.gadgetMetadata.height : null;
                }
                // check if debug flag is set and if true, create
                // the debug window for the gadget
                if (debug) debugArea = shindig.container.layoutManager.getGadgetDebugChrome(g.gadgetId, g.location);
                // if userPrefs are null, then create a new Array object
                if (gadgetPrefs[g.url].uprefObj == null) {
                    userPrefs = new Array();
                } else {
                    userPrefs = gadgetPrefs[g.url].uprefObj;
                }
                
                // if user updates the invisible preference to 'y', set the the falg isStartMeInvisible to TRUE
                if (typeof(userPrefs) != 'undefined' && userPrefs != null && typeof(userPrefs.startMeInvisible) != 'undefined' && userPrefs.startMeInvisible!=null) {
				    if (userPrefs.startMeInvisible.value == 'y') isStartMeInvisible = true;
				}                
                
                // call creategadget API of Shindig and pass title ,
                // url and user preferences
                var gadget = shindig.container.createGadget({
                    specUrl: g.url,
                    title: g.gadgetName,
                    userPrefs: userPrefs,
                    height: gadgetHeightFromPrefs,
                    requiresPubSub2: g.requiresPubSub2 //vinay
                });
                // populate gadget variable with additional info
                gadget.sciverseId_ = g.gadgetId;
                //Added for Closing the gadgets based on its state.Iterate the closed array object using location index.
                 if(g.closed[index] == "true"){
                     	gadget.closed_ = true;
				  }else{
		      			gadget.closed_ = false;
                 }                 
                gadget.location = locationId;
                gadget.iconURL = (g.gadgetIcon == null || g.gadgetIcon == '') ? gadgetIconPath + '/netbase.gif' : g.gadgetIcon;
                gadget.removable = g.removable;
                gadget.hasUserPrefs = gadgetPrefs[g.url].hasUserPrefs;
                gadget.isHoverViewAvailable=isHoverViewAvailable;
                gadget.isStartMeInvisible=isStartMeInvisible;
                // add the gadget
                shindig.container.addGadget(gadget);
                // render the gadget on the page
                shindig.container.renderGadget(gadget);
                 var gadgetState = (gadget.closed_) ? 'close' : 'open';
                
                 if (isStartMeInvisible) 
                 	{gadgetState += "|invisible";}
	             else 
	             	{gadgetState += "|visible";}
                
                ajaxKeyEventLog('gadget', 'displayGadget', g.gadgetId, sciverseObj.contextInfo.pageType, '', 'PageView', false, gadgetState, '',locationId)
            }
        });
    });
    truncateGadgetTitleAsNecessary();
}
/*
 * This Function is called from the displayGadgets() function. It in turn
 * calls the shindig APIs to render the gadgets on the ResultsPage
 */

function renderGadgets(locationDivId, titleBarReq, borderReq) {
    isUserEntitled();
    isKeyEventURLAvailable();
    isUserPrefURLAvailable();
    isGadgetRemoveURLAvailable();
    isAppManageEnabled(locationDivId);
    populateHelpIconPath();
    var gadgetHeightFromPrefs;

    //Display HelpText in case the user is not entitled to any application
    if (!isUserEntitledtoGadgets) {
        jQuery('#toolbar_' + locationDivId).css('text-align', 'center');
        jQuery('#toolbar_' + locationDivId).html('You currently have no applications');
    }
    if (toolbarOrientation == 'vertical') {
        onLoadToolbarStateVertical(locationDivId);
    }
    else if(toolbarOrientation == 'horizontal') {
        onLoadToolbarStateHorizontal();
    }

    // call processMetadata to populate the user preferences in the variable
    // gadgetPrefs
    processMetadata();
    
    //vinay-begin
	gadgets.pubsub2router.init( {
      onSubscribe: function(topic, container) {
        return true;
      },
      onUnsubscribe: function(topic, container) {
        log(container.getClientID() + " unsubscribes from topic '" + topic + "'");
      },
      onPublish: function(topic, data, pcont, scont) {
        return true;
      }
    });    
    //vinay-end
    //Code changes for EMBAPP Starts - 21/11/2010 
    // Create a new float left layout manager and pass the layout root
    shindig.container.layoutManager = new shindig.FloatLeftLayoutManager();

    // loop through the gadgetInfo object of sciverse JSON for gadget details
    jQuery.each(sciverseObj.gadgetInfo, function (index, g) {
         /*Code for Change Request to handle the following scenarios
        1. when the given gadget does not support hover view
        2. when the gadget has userpref startMeInvisible=y */
		var isHoverViewAvailable = false;
		var isStartMeInvisible = false;
		if (typeof(g.gadgetMetadata) != 'undefined' && g.gadgetMetadata != null && typeof(g.gadgetMetadata.views) != 'undefined' && g.gadgetMetadata.views != null) {
		    for (var k in g.gadgetMetadata.views) {
		        if (k == 'hover') {
		        	isHoverViewAvailable = true;
		        	break;
		        }
		    }
		}
     
        //location array
        jQuery.each(g.location, function (index, locationId) {
            //Check locationDivId and locationId
            if (locationDivId == locationId) {
                if (jQuery('#' + locationDivId).hasClass('sgfShowMyApps') || jQuery('#' + locationDivId).hasClass('sgfHorToolbar') || jQuery('#' + locationDivId).hasClass('sgfVertToolbar')) {
                    shindig.container.layoutManager.layoutRootId_ = 'toolbar_' + locationId;
                }
                else {
                    shindig.container.layoutManager.layoutRootId_ = locationId;
                }
                // check if debug flag is set and if true, create the debug
                // window for the gadget
                if (debug) debugArea = shindig.container.layoutManager.getGadgetDebugChrome(g.gadgetId, locationId);
                if (typeof(g.gadgetMetadata) != 'undefined' && g.gadgetMetadata != null) {
                    gadgetHeightFromPrefs = (typeof(g.gadgetMetadata.height) != 'undefined' && g.gadgetMetadata.height != null && g.gadgetMetadata.height != 0) ? g.gadgetMetadata.height : null;
                }
                // if userPrefs are null, then create a new Array object				
                if (gadgetPrefs[g.url].uprefObj == null) {
                    userPrefs = new Array();
                } else {
                    userPrefs = gadgetPrefs[g.url].uprefObj;
                }
                
                // if user updates the invisible preference to 'y', set the the falg isStartMeInvisible to TRUE
                if (typeof(userPrefs) != 'undefined' && userPrefs != null && typeof(userPrefs.startMeInvisible) != 'undefined' && userPrefs.startMeInvisible!=null) {
				    if (userPrefs.startMeInvisible.value == 'y') isStartMeInvisible = true;
				}                 
                
                // call creategadget API of Shindig and pass title , url and
                // user preferences

                var gadget = shindig.container.createGadget({
                    specUrl: g.url,
                    title: g.gadgetName,
                    userPrefs: userPrefs,
                    height: gadgetHeightFromPrefs,
                    requiresPubSub2: g.requiresPubSub2 //vinay
                });
                // populate gadget variable with additional info
                gadget.sciverseId_ = g.gadgetId;
                 //Added for Closing the gadgets based on its state.Iterate the closed array object using location index.
                 if(g.closed[index] == "true"){
                     	gadget.closed_ = true;
				  }else{
				      	gadget.closed_ = false;
                }                 
                gadget.includeTitle = titleBarReq;
                gadget.includeBorder = borderReq;
                gadget.location = locationId;
                gadget.isHoverViewAvailable=isHoverViewAvailable;
                gadget.isStartMeInvisible=isStartMeInvisible;
                gadget.removable = g.removable;
                gadget.iconURL = (g.gadgetIcon == null || g.gadgetIcon == '') ? gadgetIconPath + '/netbase.gif' : g.gadgetIcon;
                //Code changes for EMBAPP ends - 30/11/2010
                gadget.hasUserPrefs = gadgetPrefs[g.url].hasUserPrefs;
                log(gadget.sciverseId_, gadget.location, 'gadget created');
                // Add the gadget by calling addGadget() shindig API
                shindig.container.addGadget(gadget);
                log(gadget.sciverseId_, gadget.location, 'gadget added');
                // render the gadget by calling renderGadget() shindig API
                shindig.container.renderGadget(gadget);
                var gadgetState = (gadget.closed_) ? 'close' : 'open';
                
                if (isStartMeInvisible) 
                 	{gadgetState += "|invisible";}
	             else 
	             	{gadgetState += "|visible";}
	             	
                ajaxKeyEventLog('gadget', 'displayGadget', g.gadgetId, sciverseObj.contextInfo.pageType, '', 'PageView', false, gadgetState, '',locationId)
            }
        });
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
                    }/** Code changes for EMBAPP Starts  Date 29-Nov-2010 **/ 
                    else if( p == "md5MessageDigest" && sciverseObj.gadgetInfo[i].md5MessageDigest !== null ) {
						 var up = '"' + p + '":{"name":"' + p + '", "value":"' + escape(sciverseObj.gadgetInfo[i].md5MessageDigest) + '","datatype":"hidden"}';
						     if (ps == '{') ps += up;
						     else ps += ', ' + up;                    
                    } 
                    else if( p == "md5TimeStamp" && sciverseObj.gadgetInfo[i].md5TimeStamp !== null ){
	                    var up = '"' + p + '":{"name":"' + p + '", "value":"' + escape(sciverseObj.gadgetInfo[i].md5TimeStamp) + '","datatype":"hidden"}';
	                        if (ps == '{') ps += up;
	                        else ps += ', ' + up;                    
                    } /** Code changes for EMBAPP Ends - Date 29-Nov-2010 **/      
                    else {
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

                //vinay - begin
                //check if this gadget uses the pubsub-2 feature
                //If so, then we use OpenAjax Hub in order to create and manage
				// the iframe.  Otherwise, we create the iframe ourselves.
                var requiresPubSub2 = false;
                var arr = sciverseObj.gadgetInfo[i].gadgetMetadata.features;
                if(typeof(arr) != 'undefined' && arr.length > 0) {
	                for(var f = 0; f < arr.length; f++) {
				      if (arr[f] === "pubsub-2") {
				        requiresPubSub2 = true;
				        break;
				      }
				    }
				}
			    sciverseObj.gadgetInfo[i].requiresPubSub2 = requiresPubSub2;  
			    // vinay -end                                         
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
 * This function is called onload of ResultsPage. It in turn loads the toolbar
 * HTML and calls renderGadgets @param {Object} sciverse object @param
 * {Object} div id of the toolbar holder div
 */
//Code changes for EMBAPP starts - 21/11/2010

function displayGadgets() {
    sciverseObj = gadgets.json.parse(sciverse);
    if (typeof(sciverseObj) == 'undefined' || sciverseObj == false || sciverseObj == '') {
        if (debug) {
            alert('No data available to render the gadgets');
        }
        return false;
    }
    setGadgetIHSURL();
    jQuery.each(sciverseObj.locationsOnPage, function (index, locationDivId) {
        var isClassExists = false;
        var borderReq = true;
        var titlbarReq = true;
        // validate if the div to render the gadgets exists on the page
        if (jQuery('#' + locationDivId).length == 0) {
            //alert("invalid toolbar location")
            return;
        }
        if (jQuery('#' + locationDivId).hasClass('sgfHomePage')) { 
            jQuery('#' + locationDivId).load(gadgetHTMLPath+'/HomePageToolBar.html', function () { 
            jQuery('#iconadd').click(function (event) {  
	            openAddAppPage(event);
	          });
                renderGadgetsHome(locationDivId); 
            }); 
            return;
        }
        if (jQuery('#' + locationDivId).hasClass('sgfVertToolbar') || jQuery('#' + locationDivId).hasClass('sgfHorToolbar') || jQuery('#' + locationDivId).hasClass('sgfShowMyApps')) {
            jQuery('#' + locationDivId).load(gadgetHTMLPath+'/ToolBar.html', function () {
            jQuery('#iconadd').click(function (event) {  
	            openAddAppPage(event);
	          });
                jQuery('#toolbar').attr('id', 'toolbar_' + locationDivId);
                if (jQuery('#' + locationDivId).hasClass('sgfVertToolbar')) {
                    toolbarOrientation = 'vertical';
                    jQuery('#' + locationDivId).children('#toggleImg').css("display", "block");
                    toolbarWidth = parseInt(jQuery('#' + locationDivId).css('width'), 10);
                    var toolbarImgWidth = 15;
                    tbWidthwithoutImage = (toolbarWidth - toolbarImgWidth);
                    toolbarWidth += 'px';
                    tbWidthwithoutImage += 'px';
                }
                if (jQuery('#' + locationDivId).hasClass('sgfHorToolbar')) {
                    toolbarOrientation = 'horizontal';
                    jQuery('#' + locationDivId).children('#toggleImgHorizon').css("display", "block");
                }
                if (jQuery('#' + locationDivId).hasClass('sgfShowMyApps')) {
                    //jQuery('#' + locationDivId).find('#toolbar_' + locationDivId).css('margin-top', '57px');
                    jQuery('#' + locationDivId).find('#toolbarHead').css("display", "block");
                }
                renderGadgets(locationDivId, titlbarReq, borderReq);
            });
        } else {
            if (jQuery('#' + locationDivId).hasClass('sgfNoTitleBar')) {
                titlbarReq = false;
            }
            if (jQuery('#' + locationDivId).hasClass('sgfNoGadgetBorder')) {
                borderReq = false;
            }
            renderGadgets(locationDivId, titlbarReq, borderReq);
        }

    });
    var k =checkCompliance();
	if(k=='Quirks'){jQuery('.Controls ul .submenu').css('left','-75px')};
}
//Code changes for EMBAPP ends - 08/12/2010

/*
 * Function to load the toolbar (collapsed/shown)in case of horizontal orientation, depending on the value stored
 * in the session
 */
function onLoadToolbarStateVertical(locationDivId) {
   jQuery(document).ready(function () {
	    jQuery('#toggleImg').click(function (event) {
	        toggleToolbarVertical(event);
	    });
	});
	var toolbarHeight = parseInt(jQuery('#sciverse_toolbar').height()-7);
	toolbarHeight+='px'; 
	var divObj = jQuery('#'+locationDivId) 
	if (sciverseObj.contextInfo.toolbarState == 'Close') {
		divObj.find('#toggleImg').css('background-image','url('+gadgetIconPath+'/Show-applications.gif)');
		divObj.css('width', '15px');
		divObj.children('#sciverse_toolbar').css('display', 'none');
		divObj.find('#toggleImg').css('height', '460px');
		divObj.find('#toggleImg').attr('title', 'show');
		divObj.find('#toggleImg').css('border-right','1px solid #c7c7c7');
	} else {
		jQuery('#toggleImg').css('background-image','url('+gadgetIconPath+'/Hide-applications.gif)');
		jQuery('#'+locationDivId).css('width', toolbarWidth);
		jQuery('#'+locationDivId).children('#sciverse_toolbar').css('width', tbWidthwithoutImage);
		jQuery('#'+locationDivId).find('#sciverse_toolbar').css('display', 'block');
		jQuery('#'+locationDivId).find('#toggleImg').attr('title', 'hide');
		jQuery('#'+locationDivId).find('#toggleImg').css('height',toolbarHeight );
		jQuery('#'+locationDivId).find('#toggleImg').css('border-right','0px');
	}
}

/*
 Function to toggle the toolbar on the results Page
 */
function toggleToolbarVertical(event) {
    var divID = jQuery(event.target).parent().attr('id');
    var divObj = jQuery('#' + divID);
    var toolbarState;
    var keyEventType = 'SubmitAction';
    var eventName = '';
    var failureStatus = false;
    toolbarHeight += 'px';
    if (divObj.children('#sciverse_toolbar').css('display') == 'block') {
        divObj.find('#toggleImg').css('background-image', 'url(' + gadgetIconPath + '/Show-applications.gif)');
        divObj.css('width', '15px');
        divObj.children('#sciverse_toolbar').css('display', 'none');
        divObj.find('#toggleImg').attr('title', 'show');
        divObj.find('#toggleImg').css('height', '460px');
        divObj.find('#toggleImg').css('border-right', '1px solid #c7c7c7');
        toolbarState = 'Close';
        eventName = 'closeToolBar';
    } else {
        divObj.find('#toggleImg').css('background-image', 'url(' + gadgetIconPath + '/Hide-applications.gif)');
        divObj.css('width', toolbarWidth);
        divObj.children('#sciverse_toolbar').css('width', tbWidthwithoutImage);
        divObj.children('#sciverse_toolbar').css('display', 'block');
        var toolbarHeight = (divObj.children('#sciverse_toolbar').height() - 7) + "px";
        divObj.find('#toggleImg').attr('title', 'hide');
        divObj.find('#toggleImg').css('height', toolbarHeight);
        divObj.find('#toggleImg').css('border-right', '0px');
        toolbarState = 'Open';
        eventName = 'openToolBar';
    }
    truncateGadgetTitleAsNecessary();
    saveToolBarState(toolbarState, eventName, keyEventType, failureStatus,divID);
}

/*
 * Function to load the toolbar (collapsed/shown) in case of horizontal orientation, depending on the value stored
 * in the session
 */

function onLoadToolbarStateHorizontal() {
	jQuery(document).ready(function () {
	jQuery('#toggleImgHorizon').unbind("click");
	    jQuery('#toggleImgHorizon').click(function (event) {
	        toggleToolbarHorizontal(event);
	    });
	});
    if (sciverseObj.contextInfo.toolbarState == 'Close') {
        jQuery('#arrowImg').attr('src', gadgetIconPath + '/showDownArrow.gif');
        jQuery('#arrowImg1').attr('src', gadgetIconPath + '/showDownArrow.gif');
        jQuery('#FooterText').text('Show Applications');
        jQuery('#sciverse_toolbar').css('display', 'none');
    } else {
        jQuery('#arrowImg').attr('src', gadgetIconPath + '/hideUpArrow.gif');
        jQuery('#arrowImg1').attr('src', gadgetIconPath + '/hideUpArrow.gif');
        jQuery('#FooterText').text('Hide Applications');
        jQuery('#sciverse_toolbar').css('display', 'block');
    }
}

/*
 Function to toggle the toolbar on the results Page when orientation is horizontal
 */

function toggleToolbarHorizontal(event) {
    var toolbarState;
    var keyEventType = 'SubmitAction';
    var eventName = '';
    var failureStatus = false;
    var locationID = jQuery(event.target).parent().attr('id');
    if(locationID=='toggleImgHorizon'){
    locationID=jQuery('#'+locationID).parent().attr('id');}
        if (jQuery('#sciverse_toolbar').css('display') == 'block') {
        jQuery('#sciverse_toolbar').slideToggle('normal');
        jQuery('#arrowImg').attr('src', gadgetIconPath + '/showDownArrow.gif');
        jQuery('#arrowImg1').attr('src', gadgetIconPath + '/showDownArrow.gif');
        jQuery('#FooterText').text('Show Applications');
        toolbarState = 'Close';
        eventName = 'closeToolBar';
    } else {
        jQuery('#sciverse_toolbar').slideToggle('normal');
        jQuery('#arrowImg').attr('src', gadgetIconPath + '/hideUpArrow.gif');
        jQuery('#arrowImg1').attr('src', gadgetIconPath + '/hideUpArrow.gif');
        jQuery('#FooterText').text('Hide Applications');
        toolbarState = 'Open';
        eventName = 'openToolBar';
    }
    truncateGadgetTitleAsNecessary();
    if (sciverseObj.smapiVars.toolbarStateURL != null || typeof(sciverseObj.smapiVars.toolbarStateURL) !== 'undefined') saveToolBarState(toolbarState, eventName, keyEventType, failureStatus,locationID);
}

/*
 * Function to call the gadgetState actionbean,
 * through AJAX and save the toolbar state in session
 */

function saveToolBarState(toolbarState, eventName, keyEventType, failureStatus,location) {

    var req = "originPage=" + sciverseObj.contextInfo.pageType + "&" + "toolbarOpen=" + toolbarState + "&" + "eventName=" + eventName + "&" + "pageName=" + sciverseObj.contextInfo.pageType;

    req += "&" + "location=" + sciverseObj.contextInfo.pageType + "&" + "keyEventType=" + keyEventType;
    req += "&" + "zone=" + location + "&" + "failureStatus=" + failureStatus + "&" + "isKeyEventURLAvailble=" + isKeyEventURLExists;

    jQuery.ajax({
        type: 'GET',
        url: sciverseObj.smapiVars.toolbarStateURL + "?",
        async: true,
        data: req
    });
}

/**
 * Function lo log the Key event to GadgetUsageActionBean
 *
 */

ajaxKeyEventLog = function (gadgetName, activity, gadgetID, landingPage, targetURL, eventType, failureStatus, gadgetState, isPartnerIdRequired,location) {
   // var location = sciverseObj.contextInfo.pageType;
    if((gadgetState=='open'||gadgetState=='close')&&activity=='displayGadget'){return;}
    for (var i = 0; i <= arguments.length; i++) {
        if (arguments[i] == null) arguments[i] = '';
    }
    if(location=='undefined'||typeof(location)=='undefined')location='';
    var keyString = "moduleName=" + gadgetName + "&" + "location=" + location + "&" + "eventName=" + activity + "&" + "moduleId=" + gadgetID + "&" + "pageName=" + sciverseObj.contextInfo.pageType + "&" + "zone=" + location + "&" + "failed=" + failureStatus + "&" + "keyEventType=" + eventType + "&" + "partner=" + isPartnerIdRequired + "&" + "gadgetState=" + gadgetState + "&" + "targetURL=" + targetURL;

    if (isKeyEventURLExists) {
        jQuery.ajax({
            type: "GET",
            url: sciverseObj.smapiVars.keyEventURL + "?",
            data: keyString
        });
    }
};
/*
 not a generic function. Being used to log two key events in one go. 
 */

function openAboutPage(aboutAppLink, failureStatus, gadgetId, gadgetName,location) {
	window.open(aboutAppLink);
	ajaxKeyEventLog(gadgetName, 'aboutGadget', gadgetId, 'AboutPage',aboutAppLink, 'outwardLink', failureStatus,'','',location);
}



/*
 function to open application gallery page and log the key event
 */

function openAddAppPage(event) {
      
	var url = sciverseObj.smapiVars.gadgetAddURL;
	var addManageAppLocationId =jQuery(event.target).parents('.sgfShowMyApps').attr("id");	        
	window.location = url;	
	ajaxKeyEventLog(null,  'addGadget', null, 'AppGallery', url,
			'SubmitAction', false,'','',addManageAppLocationId);
}


/*
function to open manage my application page and log the key event
 */

function openManageAppPage(event) {
 
	var url = sciverseObj.smapiVars.gadgetManagePage;
	var addManageAppLocationId =jQuery(event.target).parents('.sgfShowMyApps').attr("id");		
	window.location = url;
	ajaxKeyEventLog(null,  'outwardLink', null, 'AppGallery', url,
			'outwardLink', false,'',true,addManageAppLocationId);
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
			'outwardLink', false,'','','');
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
function isAppManageEnabled(locationDivId) {
    var divObj = jQuery('#' + locationDivId);
  
    if (sciverseObj.contextInfo.individualUser && divObj.hasClass('sgfShowMyApps')||divObj.hasClass('sgfHomePage')) {
     
        jQuery('#addManage').append('&nbsp;|&nbsp; <a id="iconManage" style="cursor:pointer">Manage Applications</a>');
    }
    jQuery('#iconManage').click(function (event) {  
	       openManageAppPage(event);
	    });
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

