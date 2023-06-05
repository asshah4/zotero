/***************************
* POPUP.JS
****************************/

/**************************************
* ERIC popup window code
*
* @author: Chris Balduino
* @date: 8/06
* @description: This code creates a popup windows for use on the ERIC project
****************************************/
jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
                return this.bind('mouseenter mouseover focusin', fnOver).bind('mouseleave mouseout focusout', fnOut);
        }
}); 
$.fn.textNodes = function() {
  var ret = [];
  this.contents().each( function() {
    var fn = arguments.callee;
      if ( this.nodeType == 3 || $.nodeName(this, "br") ) 
        ret.push( this );
      else $(this).contents().each(fn);
  });
  return $(ret);
}

function popUpSecurity(URL)
{
    day = new Date();
    id = day.getTime();
    popWin = window.open(URL, 'ERICPopUp', 'toolbar=0,scrollbars=1,location=0,status=1,menubar=0,resizable=1,width=300,height=200');
    popWin.focus();
}

function BIOpopUp(URL)
{
 day = new Date();
 id = day.getTime();
 eval("BIOpage" + id + " = window.open(URL, 'ERICBioPopUp', 'toolbar=0,scrollbars=1,location=0,status=1,menubar=0,resizable=0,width=550,height=550').focus();");
}

var popwin;
function popUp(URL)
{
 day = new Date();
 id = day.getTime();
 popWin = window.open(URL, 'ERICPopUp', 'toolbar=0,scrollbars=1,location=0,status=1,menubar=0,resizable=1,width=750,height=550');
 popWin.focus();
}

function popUpExt(URL)
{
  newURL = "/ERICWebPortal/popUps/openURL.jsp?link=" + escape(URL);
  popWin = window.open(newURL, 'ERICPopUp', 'toolbar=0,scrollbars=1,location=0,status=1,menubar=0,resizable=1,width=550,height=300');
  popWin.focus();
} 

function popUpThesaurus(URL) {
    var popWin;
        day = new Date();
        id = day.getTime();
        popWin = window.open(URL, 'ERICThesaurusPopUp', 'toolbar=0,scrollbars=1,location=0,status=1,menubar=0,resizable=1,width=800,height=550');
        popWin.focus();
}

function popUpJn(URL) {
    var popWin;
        day = new Date();
        id = day.getTime();
        popWin = window.open(URL, 'ERICJournalPopUp', 'toolbar=0,scrollbars=1,location=0,status=1,menubar=0,resizable=1,width=800,height=550');
        popWin.focus();
}
function checkDescriptor(j)
{
        var labelname ='ERICExtSearch_SearchType_' + j;
        var dropdown  = document.getElementById(labelname);
        if ( !dropdown ) return;
        var SelValue = ' ';
        for  (var i=0; i < dropdown.length; i++) {
			if (dropdown[i].selected) {
				SelValue = dropdown[i].value;
                break;
			}
		}
        
        var iconname = "ERICExtSearch_descriptor_" + j;
        if (SelValue == "de"){
            document.getElementById(iconname).style.display='block';
        	document.getElementById(iconname+"jn").style.display='none';
        }
        else
        	
        	if(SelValue == "jn"){
	            document.getElementById(iconname+"jn").style.display='block';
        		document.getElementById(iconname).style.display='none';
        	}
	        else 
	        {
	            document.getElementById("ERICExtSearch_descriptor_" + j).style.display='none';
	            if(document.getElementById("ERICExtSearch_descriptor_" + j+"jn")!=null){
	            document.getElementById("ERICExtSearch_descriptor_" + j+"jn").style.display='none';
	            }
	        }
}


/***************************
* SCRIPTS.JS
****************************/

/*******************************
* Scripts
*
*******************************/

/*********************************
* function showHide
* IN: object ID (or an array of IDs)
*
* this function is used to toggle
* the visibility of a page element
**********************************/
function showHide(objIds,dispType) {
	if(isArray(objIds)){
		for(var i=0; i<objIds.length; i++){
			var objRef=document.getElementById(objIds[i]);
			if (objRef.style.display=='none') {
				objRef.style.display=dispType;
			} else {
				objRef.style.display='none';
			}
		}
	}
	else {	
		var objRef=document.getElementById(objIds);
		if (objRef.style.display=='none') {
			objRef.style.display=dispType;
		} else {
			objRef.style.display='none';
		}
	}
	
}



/*********************************
* function initNav
*
* This function sets the current state of the navigation
*********************************/
function initNav(navID) {
	var navItem = document.getElementById(navID);
	var navText = navItem.innerHTML;
	var leftSide = "<span id='navSelectedLeft'></span>";
	var rightSide = "<span id='navSelectedRight'></span>";

	navItem.innerHTML = leftSide + navText + rightSide;
	//navItem.innerHTML = "<span id='navSelectedLeft'><span id='navSelectedRight'>" + navText + "</span></span>";
	navItem.className = "selected";
}


/*********************************
* function initTabStrip
*
* This function sets the current state of the navigation
*********************************/
function initTabStrip(tabID) {
	var tabItem = document.getElementById(tabID);
	var tabText = tabItem.innerHTML;
	var leftSide = "<span class='tabSelectedLeft'></span>";
	var rightSide = "<span class='tabSelectedRight'></span>";

	tabItem.innerHTML = leftSide + tabText + rightSide;
	tabItem.className = "selected";
	var links = tabItem.getElementsByTagName("a");
	links[0].className = "selected";
}


/****************************
* function isArray
* IN: any variable
* OUT: bool
*
* This function returns true if the variable
* that was passed in is an array 
*******************************/
function isArray(myVar) {	
	var tempType = typeof myVar;
	//alert(tempType);

	if (tempType == "string")
		return false;
	else
		return true;
}


/**************************************
* function browserDetect
*
***************************************/
function browserDetect() {
	var agt=navigator.userAgent.toLowerCase();
	
	if (agt.indexOf("safari") != -1) {
		document.write("<link href='/ERICWebPortal/resources/css/styles_safari.css' rel='stylesheet' type='text/css' />");
	}
}
browserDetect();

/***************************
* TOOLTIP.JS
****************************/

/*******************************
* ERIC Scripts
*
* General JavaScript functions
* and variables used in the ERIC
* site
*
* @author: CSC - netXperience Team
*******************************/

/*******************************
* global vars
*******************************/
var timeoutRef = null;
var timeoutRefClose = null;
var tempTitle = null;
var pageLeftMargin = null;
var delayTime = 100; //delay to show/hide tooltip in milliseconds
var hideDelayTime = 1500;
var wWidth = document.documentElement.clientWidth; //tooltip reposition measure
var pageWidth = 995;
var correctX = 10; //pixel measure to reposition tooltip help
var shadow = 1; //display tooltip shadow



/*****************************
* function applyHelpTooltips
*
* This function steps through
* all of the SPAN tags that contain
* the class "helpTooltip" or "howTooltip and builds the
* DIV to create the tooltip effect
*
* NOTE: SPAN tags were chosen as the flagging
* element because a tooltip may need to appear within a P
* tag, in which case a DIV would result in invalid
* XHTML.
*****************************/
function applyHelpTooltips(scope) {
	//var helpSpans = document.getElementById(scope).getElementsByTagName("SPAN");
	$('#' + scope + ' span.howTooltip').wrapInner('<a href="#" class="noLink" />');
	$('#' + scope + ' span.helpTooltip').not(':has(a)').wrapInner('<a href="#" class="noLink" />');
	var helpSpans = jQuery('#' + scope).find('span');
	window.helpSpanEach = jQuery('#' + scope).find('span');
	for(i=0; i<helpSpans.length; i++){
		if(helpSpans[i].className == "helpTooltip" || helpSpans[i].className == "howTooltip"){
			//create parent tooltip container
			var tooltipContainer = document.createElement("SPAN");
			tooltipContainer.style.display = "none";
			tooltipContainer.id = "tip"+i;
			tooltipContainer.className = "tooltipContainer";
			
			if(shadow == 1){
				var tooltipShadow = document.createElement("SPAN");
				tooltipShadow.className = "tooltipShadow";
				tooltipContainer.appendChild(tooltipShadow);
				//helpSpans[i].appendChild(tooltipShadow);
			}
			
			var tooltipContentWrapper = document.createElement("SPAN");
			tooltipContentWrapper.className = "tooltipContentWrapper";
						
			//SET UP TOOLTIP MAIN CONTENT AREA
			var tooltipContent = document.createElement("SPAN");
			tooltipContent.className = "tooltipContent";
			if(helpSpans[i].className == "helpTooltip")
				tooltipContent.innerHTML = helpSpans[i].title;
			
			//ADD TITLE TO TIP WINDOW
			var howTitle = document.createElement("DIV");
			if(helpSpans[i].className == "howTooltip"){
				howTitle.className = "howTitle";
				howTitle.innerHTML = "How Do I...";
			}
			else if(helpSpans[i].className == "helpTooltip")
				howTitle.className = "helpTitle";			
			tooltipContentWrapper.appendChild(howTitle);
			
			if(helpSpans[i].className == "howTooltip"){
				//CHECK FOR ANY ADDITIONAL TOOLTIP LINKS
				var howTopics = helpSpans[i].getElementsByTagName("SPAN");
				//var howTopics = helpSpans[i].find('span');
				var topicList = document.createElement("UL"); //create topic parent list
				topicList.className = "helpList";
				
				
				for(j=0; j<howTopics.length; j=j+2){
					var topicItem = document.createElement("LI"); //create topic list item
					var topicItemContent = document.createElement("P");
									
					var moreLinks = howTopics[j].getElementsByTagName("SPAN")[0]; //get link content for topic
					if(moreLinks.className == "tooltipLink"){
						var firstFound = false; //flag for converting topic text to help link
						var spacer = document.createElement("SPAN");
						spacer.innerHTML = "&nbsp;<span class='pipe'>|</span> "; //tooltip separater element
						
						topicLinks = moreLinks.getElementsByTagName("A");					
						
						for(k=0; k<topicLinks.length; ){
							if(!firstFound){
								//topicLinks[k].html(howTopics[j].title);
								var t = document.createElement('div');
								t.innerHTML = howTopics[j].title;
								topicLinks[k].innerHTML = "";
								topicLinks[k].appendChild(t);
								//topicLinks[k].innerHTML = howTopics[j].title; //set help link text
								firstFound = true;
							}
							else
								topicItemContent.appendChild(spacer);
	
							topicItemContent.appendChild(topicLinks[k]);					
						}
					}
					
					topicItem.appendChild(topicItemContent); //append content to list item
					topicList.appendChild(topicItem); //add list item to full list
				}
				
				tooltipContent.appendChild(topicList);//add full list to tooltip bubble
				
				//REMOVE ALT AND TITLE TAGS TO PREVENT BROWSER TOOLTIP FROM APPEARING
				var nestedImages = helpSpans[i].getElementsByTagName("IMG");
				for(k=0; k<nestedImages.length; k++){
					nestedImages[k].title="";
				}
			}
			else if(helpSpans[i].className == "helpTooltip"){			
				//check for any additional tooltip links
				var moreLinks = helpSpans[i].getElementsByTagName("SPAN");
				for(j=0; j<moreLinks.length; j++){
					if(moreLinks[j].className == "tooltipLink"){
						var linkContent = document.createElement("SPAN");
						linkContent.innerHTML = moreLinks[j].innerHTML;
						linkContent.style.display = "block";
						linkContent.className = "tooltipLink";					
						tooltipContent.appendChild(linkContent);
					}
				}
							
				
				//remove alt and title tags to prevent browser tooltip from appearing
				var nestedImages = helpSpans[i].getElementsByTagName("IMG");
				for(k=0; k<nestedImages.length; k++){
					nestedImages[k].title="";
					if(nestedImages[k].parentNode.href != null){
						nestedImages[k].parentNode.className = "imageTip";
					}
				}
			}		
						
			//add the content to the parent container
			tooltipContentWrapper.appendChild(tooltipContent);
			tooltipContainer.appendChild(tooltipContentWrapper);
			
/*			var wrapper = document.createElement('a');
			wrapper.className = "noLink";
			myId = "tip" + i;
			alert(myId);
			var myDiv = document.getElementById(myId); 
			wrapper.appendChild(myDiv.cloneNode(true)); 
			myDiv.parentNode.replaceChild(wrapper, myDiv);*/
			//if mouse is over tooltip bubble, prevent it from disappearing
			tooltipContainer.onmouseover = clearHide;
						
			//add iframe for IE correction
			if(navigator.appVersion.indexOf("MSIE 6") > -1){
				var tooltipFrame = document.createElement("IFRAME");
				tooltipFrame.className = "tooltipFix";
				tooltipFrame.src = "/ERICWebPortal/resources/html/iframe_fix.html";
				//tooltipFrame.frameBorder = 0;
				tooltipContainer.appendChild(tooltipFrame);
				//tooltipShadow.style.height = tooltipShadow.parentNode.offsetHeight;
				
			}
			
			//add the tooltip to the page element it applies to
			helpSpans[i].insertBefore(tooltipContainer,helpSpans[i].childNodes[0]);
			helpSpans[i].appendChild(tooltipContainer);
			helpSpans[i].onmouseover = showHelp; //assign mouseover event
			helpSpans[i].onClick = showHelp; //assign mouseover event
			helpSpans[i].ontab = showHelp; //assign mouseover event
			//helpSpans[i].onmouseout = hideHelp; //assign mouseout event
		}
	}
}
$(function() {
	$(helpSpanEach).hover( function() {
		clearTimeout($(this).timeoutRefClose);
		var tooltip = $(this).find('span.tooltipContainer');
		var frameBG = $(this).find("IFRAME");
		var toolTipHeight = tooltip.height();
		$(this).timeoutRef = setTimeout(function(){  tooltip.css('display','inline'); checkBounds2(tooltip); if(navigator.appVersion.indexOf("MSIE 6") > -1){ frameBG.css('height',toolTipHeight); }  },delayTime);
		tempTitle = $(this).attr('title');
		$(this).attr('title','');
	}, function() {
		clearTimeout($(this).timeoutRef);
		var tooltip = $(this).find('span.tooltipContainer');
		if ( tooltip.parent().hasClass('howTooltip') ) {
			hideDelayTime = 10000;
		} else {
			hideDelayTime = 1500;
		}
		$(this).timeoutRefClose = setTimeout(function(){  tooltip.css('display','none'); tooltip.css('','') },hideDelayTime);
		$(this).attr('title',tempTitle);
	});
});
function inspect(obj, maxLevels, level)
{
  var str = '', type, msg;

    // Start Input Validations
    // Don't touch, we start iterating at level zero
    if(level == null)  level = 0;

    // At least you want to show the first level
    if(maxLevels == null) maxLevels = 1;
    if(maxLevels < 1)     
        return '<font color="red">Error: Levels number must be > 0</font>';
    // We start with a non null object
    if(obj == null)
    return '<font color="red">Error: Object <b>NULL</b></font>';
    // End Input Validations
    // Each Iteration must be indented
    str += '<ul>';
    // Start iterations for all objects in obj
    for(property in obj)
    {
      try
      {
          // Show "property" and "type property"
          type =  typeof(obj[property]);
          str += '<li>(' + type + ') ' + property + 
                 ( (obj[property]==null)?(': <b>null</b>'):('')) + '</li>';
          // We keep iterating if this property is an Object, non null
          // and we are inside the required number of levels
          if((type == 'object') && (obj[property] != null) && (level+1 < maxLevels))
          str += inspect(obj[property], maxLevels, level+1);
      }
      catch(err)
      {
        // Is there some properties in obj we can't access? Print it red.
        if(typeof(err) == 'string') msg = err;
        else if(err.message)        msg = err.message;
        else if(err.description)    msg = err.description;
        else                        msg = 'Unknown';
        str += '<li><font color="red">(Error) ' + property + ': ' + msg +'</font></li>';
      }
    }
      // Close indent
      str += '</ul>';
    return str;
}
/***************************
* function showHelp
*
* This function handles the delay
* and display of the help tooltip
***************************/
function showHelp(scope) {
	clearTimeout(this.timeoutRefClose);
	var cNodes = this.childNodes;
	var tooltip = cNodes[cNodes.length-1];
	//var tooltip = cNodes[0];
		
	var frameBG = this.getElementsByTagName("IFRAME");
	
	this.timeoutRef = setTimeout(function(){  tooltip.style.display = "inline"; checkBounds(tooltip); if(navigator.appVersion.indexOf("MSIE 6") > -1){ frameBG[0].style.height = tooltip.offsetHeight; }  },delayTime);
	tempTitle = this.title;
	this.title = "";
	
}


/***************************
* function hideHelp
*
* This function handles the hiding
* of the tooltip when the mouse rolls
* off of an active piece of content
****************************/
function hideHelp(scope) {
	clearTimeout(this.timeoutRef);
	var cNodes = this.childNodes;
	//var tooltip = cNodes[0];	
	var tooltip = cNodes[cNodes.length-1];
	//alert('hide');
	this.timeoutRefClose = setTimeout(function(){  tooltip.style.display = "none"; tooltip.style.marginLeft = "" },delayTime);
	this.title = tempTitle;
}


/****************************
* function clearHide
* 
* This function clears the timeout
* variable that controls the hiding of
* a tooltip when you mouseout of
* a help item
****************************/
function clearHide() {
	clearTimeout(timeoutRefClose);
}


/**************************
* function checkBounds
* IN: object reference
*
* This function checks to see if
* a tooltip popup will appear beyond the 
* bounds of the page area and corrects
* the placement if necessary
***************************/
function checkBounds(objRef){
	
	if(pageLeftMargin == null)
		pageLeftMargin = document.getElementById("pageContainer").offsetLeft;
		//alert(pageLeftMargin);
	var positionX = objRef.parentNode.offsetWidth;
	//alert(positionX);
	objRef.style.marginLeft = -(positionX) + "px"; //reposition below parent help text	
	objRightEdge = objRef.offsetLeft + objRef.offsetWidth; //check its right edge to keep it on screen
	
	maxRight = pageWidth + pageLeftMargin;
	
	/*if(objRightEdge > wWidth){
		newMargin = objRightEdge - wWidth;
		objRef.style.marginLeft = -(positionX + newMargin + correctX) + "px";
	}*/
	if(objRightEdge > maxRight){
		newMargin = objRightEdge - maxRight;
		objRef.style.marginLeft = -(positionX + newMargin + correctX) + "px";
	}
}

function checkBounds2(objRef){

	if(pageLeftMargin == null)
		pageLeftMargin = document.getElementById("pageContainer").offsetLeft;
	var positionX = objRef.parent().width();
	//alert(positionX);
	objRef.css('margin-left', -(positionX) + "px"); //reposition below parent help text	
	objRightEdge = objRef.offsetLeft + objRef.offsetWidth; //check its right edge to keep it on screen
	maxRight = pageWidth + pageLeftMargin;
	/*if(objRightEdge > wWidth){
		newMargin = objRightEdge - wWidth;
		objRef.style.marginLeft = -(positionX + newMargin + correctX) + "px";
	}*/
	if(objRightEdge > maxRight){
		newMargin = objRightEdge - maxRight;
		objRef.style.marginLeft = -(positionX + newMargin + correctX) + "px";
	}
}

/****************************
* Helper functions for determining
* available window width within the browser
*****************************/
function pageWidth() { return window.innerWidth != null? window.innerWidth: document.body != null? document.body.clientWidth:null; }
function pageHeight() { return window.innerHeight != null? window.innerHeight: document.body != null? document.body.clientHeight:null; }
window.onresize = function() {
	//wWidth = document.documentElement.clientWidth;
	pageLeftMargin = document.getElementById("pageContainer").offsetLeft;
}


/***************************
* function addTopCorners
*
* This function applies the top
* container corner graphics and
* horizontal tile of the tooltip
* box
****************************/
function addTopCorners(container) {
	var extensions = Array("TL","TR");
	
	var top = document.createElement("SPAN");
	top.className = "tooltipTop";
	
	for(var i=0; i<extensions.length; i++){
		var corner = document.createElement("SPAN");
		corner.className = "tooltip"+extensions[i];
		top.appendChild(corner);
	}

	container.appendChild(top);
	return container;
}


/***************************
* function addBottomCorners
*
* This function applies the bottom
* container corner graphics and
* horizontal tile of the tooltip
* box
****************************/
function addBottomCorners(container) {
	var extensions = Array("BL","BR");
	
	var bottom = document.createElement("SPAN");
	bottom.className = "tooltipBottom";
	
	for(var i=0; i<extensions.length; i++){
		var corner = document.createElement("SPAN");
		corner.className = "tooltip"+extensions[i];
		bottom.appendChild(corner);
	}

	container.appendChild(bottom);
	return container;
}
function lookupHelpURL(myURL) {

    base = '/WebHelp/ApplicationHelp_CSH.htm#';
    helpHome = '/WebHelp/ApplicationHelp.htm';
    
    if (myURL == 'help_home'){
        return helpHome;
    }
    if (myURL == 'create_effective'){
        return base + '65';
    }
    if (myURL == 'create_effective_tutorial'){
        return base + '43';
    }
    if (myURL == 'author_search'){
        return base + '10';
    }
    if (myURL == 'author_search_tutorial'){
        return base + '13';
    }
    if (myURL == 'author_search_full_tutorial'){
        return base + '64';
    }
    if (myURL == 'theasurus_search'){
        return base + '11';
    }
    if (myURL == 'theasurus_search_tutorial'){
        return base + '20';
    }
    if (myURL == 'fieldcodes'){
        return base + '59';
    }
    if (myURL == 'metatags'){
        return base + '17';
    }
    if (myURL == 'issn'){
        return base + '21';
    }
    if (myURL == 'issn_tutorial'){
        return base + '22';
    }
    if (myURL == 'boolean_logic'){
        return base + '18';
    }
    if (myURL == 'boolean_logic_tutorial'){
        return base + '19';
    }
    if (myURL == 'clipboard'){
        return base + '3';
    }
    if (myURL == 'clipboard_tutorial'){
        return base + '14';
    }
    if (myURL == 'record_detail'){
        return base + "";
    }
    if (myURL == 'tutorial_landing'){
        return base + "63";
    }
    if (myURL == 'faqs'){
        return base + "56";
    }
    if (myURL == 'interpret_search_results'){
        return base + "41";
    }
    if (myURL == 'search_results_tutorial'){
            return base + "60";
    }
    if (myURL == 'understand_full_text'){
        return base + '4';
    }
    if (myURL == 'understand_full_text_tutorial'){
        return base + '17';
    }
    if (myURL == 'grey_lit'){
        return base + '';
    }
    if (myURL == 'narrative_abstract_guidelines'){
            return base + '15';
    }
    if (myURL == 'structured_abstract_guidelines'){
            return base + '16';
    }    
    if (myURL == 'database_field'){
        return base + '58';
    }    
    if (myURL == 'eric_record_changes'){
        return base + '';
    }    
    if (myURL == 'wildcards'){
        return base + '61';
    }    
    if (myURL == 'eric_thesaurus'){
        return base + '57';
    }    
    if (myURL == 'quotation_marks'){
        return base + '62';
    }
    if (myURL == 'register_myeric'){
        return base + '26';
    }    
    if (myURL == 'searching_eric'){
        return base + '';
    }    
    if (myURL == 'fundamentals_of_searching_tutorials'){
        return base + '60';
    }
    if (myURL == 'help_finding_full_text'){
        return base + '47';
    }
    if (myURL == 'onlinesubmission_step3'){
            return base + '38';
    }
    if (myURL == 'IM_NOT_GETTING_THE_SEARCH_RESULTS_I_EXPECTED'){
                return base + '55';
    }   
    if (myURL == 'FIND_INA_LIBRARY'){
                return base + '5';
    }
    if (myURL == 'REFINING_YOUR_SEARCH'){
                    return base + '50';
    }
    if (myURL == 'REFINING_YOUR_SEARCH_TUTORIAL'){
                    return base + '19';
    }
    if (myURL == 'WHAT_DOES_NA_MEAN_UNDER_PEER_REVIEW'){
                    return base + '52';
    }
    if (myURL == 'PRINT_CLIPBOARD'){
                    return base + '7';
    }
    if (myURL == 'EMAIL_RESULTS'){
                    return base + '8';
    }
    if (myURL == 'EXPORT_RECORDS'){
                    return base + '9';
    }
    if (myURL == 'SAVE2_MYERIC'){
                    return base + '6';
    }
    if (myURL == 'search_thesaurus'){
                    return base + '28';
    }
    if (myURL == 'finding_descriptor'){
                    return base + '23';
    }
    if (myURL == 'full_text_tutorial'){
                    return base + '17';
    }
    if (myURL == 'download_full_text'){
                    return base + '14';
    }
    if (myURL == 'download_full_text_tutorial'){
                    return base + '22';
    }    
	if (myURL == 'full_text_contactus'){
					return base + '49';
	}
	if (myURL == 'format_url'){
	      			return base + '35';
	}   
 	if (myURL == 'peer_reviewed_more'){
	      			return base + '32';
	}
 	if (myURL == 'refine_your_search'){
			return base + '50';
 	}
 	if(myURL=="my_eric"){return base+"29"}
 	if(myURL=="my_eric_tutorial"){return base+"43"}
 	if(myURL=="citations"){return base+"3"}
 	if(myURL=="citations_tutorial"){return base+"44"}
 	if(myURL=="citations_saved"){return base+"36"}
 	if(myURL=="citations_saved_tutorial"){return base+"44"}
 	if(myURL=="submit_work"){return base+"38"}
 	if(myURL=="submit_work_tutorial"){return base+"45"}

    return myURL;
}

/*****************************
* launchHelpApp
*
* This function launches the help
* content and ensures that it opens in the same
* window, even if one instance is already
* open.
******************************/
function launchHelpApp(myURL) {
	myURL=lookupHelpURL(myURL);
	var h = 690;
	var w = 890;
	var winl = (screen.width - w) / 2;
	var wint = ((screen.height - h) / 2) - 20;
	winprops = 'height=' + h + ',width=' + w +',top=' + wint + ',left= ' + winl + ',resizable=1';
	testWindow = window.open(myURL,"ERIC",winprops);
	testWindow.focus();
}


/***************************
function maintainWindow() {	
	mainContent = document.getElementById("mainContentArea");
	
	if(mainContent.offsetWidth)
		//alert(mainContent.offsetWidth);
		if(mainContent.clientWidth < 971)
			mainContent.clientWidth = 971;
	
}

window.onresize = maintainWindow;
*****************************/

/***************************
* MENU.JS
****************************/
var qm_li;
var qm_lo;
var qm_tt;
var qp="parentNode";
var qc="className";

function qm_create(sd,v,l){
	if(!l){
		l=1;
		sd=document.getElementById("qm"+sd);
		sd.onmouseover=function(e){x6(e)};
		document.onmouseover=x2;
		sd.style.zoom=1;
	}
		
	sd.style.zIndex=l;
	var lsp;
	var sp=sd.childNodes;
	for(var i=0;i<sp.length;i++){
		var b=sp[i];
		if(b.tagName=="A"){
			lsp=b;
			b.onmouseover=x0;
			if(l==1&&v){
				b.style.styleFloat="none";
				b.style.cssFloat="none";
			}
		}
		if(b.tagName=="DIV"){
			if(window.showHelp&&!window.XMLHttpRequest)
				sp[i].insertAdjacentHTML("afterBegin","<span style='display:block;font-size:1px;height:0px;width:0px;line-height:0px;visibility:hidden;'></span>");

			if(l >=2){
				lsp.innerHTML = lsp.innerHTML + "<span class=\"arrow\"></span>";
			}
			
			x5("qmparent",lsp,1);
			lsp.cdiv=b;
			b.idiv=lsp;
			new qm_create(b,null,l+1);
		}
	}
};

function x4(a,b){
	return String.fromCharCode(a.charCodeAt(0)-1-(b-(parseInt(b/4)*4)));
};

function x2(e){
	if(qm_li&&!qm_tt)qm_tt=setTimeout("x3()",500);
};

function x3(){
	var a;
	if((a=qm_li)){
		do{
			x1(a);
		}
		while((a=a[qp])&&!qm_a(a))
	}
	
	qm_li=null;
};
		
function qm_a(a){
	if(a[qc].indexOf("qmmc")+1)
		return 1;
};

function x1(a){
	if(window.qmad&&qmad.bhide)
		eval(qmad.bhide);
	a.style.visibility="";
	x5("qmactive",a.idiv);
}

																																														   
function x0(e){
	if(qm_tt){
		clearTimeout(qm_tt);
		qm_tt=null;
	}
	var a=this;
	if(a[qp].isrun)return;
	var go=true;
	while((a=a[qp])&&!qm_a(a)){
		if(a==qm_li)go=false;
	}
	if(qm_li&&go){
		a=this;
		if((!a.cdiv)||(a.cdiv&&a.cdiv!=qm_li))x1(qm_li);
		a=qm_li;
		while((a=a[qp])&&!qm_a(a)){if(a!=this[qp])x1(a);
		else break;
	}
}
var b=this;
if(b.cdiv){
	
	if(b.cdiv.parentNode.id == "qm0"){
		var ax=b.offsetLeft - this.offsetWidth;
		var ay=b.offsetTop + 5;
		if(navigator.appName == "Microsoft Internet Explorer")
			ay += 15;
	}
	else {
		var ax=b.offsetLeft;
		var ay=b.offsetTop-4;	
	}
	
	if(window.mlrunShim == true){
		var Iframe = document.createElement("iframe");
		/*Iframe.setAttribute("src","");
		Iframe.setAttribute("scrolling","no");*/
		Iframe.setAttribute("className","navFix");
		Iframe.style.width = b.cdiv.offsetWidth;		
		Iframe.style.height = b.cdiv.offsetHeight;		
		b.cdiv.appendChild(Iframe.cloneNode(false));
	}
	
	var aw=b.offsetWidth;
	var ah=b.offsetHeight;
		
	if(qm_a(b[qp])&&b.style.styleFloat!="none"&&b.style.cssFloat!="none")aw=0;else ah=0;
	if(!b.cdiv.ismove){
		b.cdiv.style.left=(ax+aw)+"px";
		b.cdiv.style.top=(ay+ah)+"px";
	}
	x5("qmactive",this,1);
	if(window.qmad&&qmad.bvis)eval(qmad.bvis);
	b.cdiv.style.visibility="inherit";
	qm_li=b.cdiv;
	} else  if(!qm_a(b[qp]))qm_li=b[qp];
	else qm_li=null;
	x6(e);
};
function x5(name,b,add){
	var a=b[qc];
	if(add){
		if(a.indexOf(name)==-1)
			b[qc]+=(a?' ':'')+name;
	}
	else {
		b[qc]=a.replace(" "+name,"");
		b[qc]=b[qc].replace(name,"");
	}
};
function x6(e){
	if(!e)e=event;e.cancelBubble=true;
	if(e.stopPropagation)e.stopPropagation();
}