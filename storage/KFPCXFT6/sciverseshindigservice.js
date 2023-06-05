/*******************************************************************************
This JavaScript File contains the Sciverse APIs . Gadgets can interact with the
container through these APIs and request information about the page
 ******************************************************************************/
 
 /* variables to hold hoover view dimension constants */
 var HOOVER_HEIGHT_DEFAULT=200;
 var HOOVER_WIDTH_DEFAULT=300;
 var HOOVER_MINIMUM_HEIGHT=120;
 var HOOVER_MINIMUM_WIDTH=180;
 var HOOVER_MAX_HEIGHT=600;
 var HOOVER_MAX_WIDTH=800;
 
shindig.SciverseService = function() {
	shindig.IfrGadgetService.call(this);
	gadgets.rpc.register('invokeResultsView', this.invokeResultsView);
	gadgets.rpc.register('getContextInfo', this.getContextInfo);
	gadgets.rpc.register('getAllResults', this.getAllResults);
	gadgets.rpc.register('getResults', this.getResults);
	gadgets.rpc.register('getArticleContent', this.getArticleContent);
	gadgets.rpc.register('getPageUrl', this.getPageUrl);
	gadgets.rpc.register('showHoverView', this.showHoverView);
	gadgets.rpc.register('closeHover', this.closeHover);
	gadgets.rpc.register('closeAllMyHovers', this.closeAllHovers);
	gadgets.rpc.register('linkText', this.linkText);
	gadgets.rpc.register('makeMeInvisible', this.makeMeInvisible);
	gadgets.rpc.register('makeMeVisible', this.makeMeVisible);	
	gadgets.rpc.register('suggest', this.returnQuerySuggestions);
	gadgets.rpc.register('subscribe', this.subscribe);
}
shindig.SciverseService.inherits(shindig.IfrGadgetService);



shindig.SciverseService.prototype.getPageUrl = function (){
	return document.location.href;

}
shindig.SciverseService.prototype.getArticleContent = function (){
	if (jQuery(".svBigBox").length > 0) {
		return jQuery(".svBigBox").html();
	}
	return null;
}

/* extended requestNavigateTo metod . This is used as a service by gadgets to navigate to different views */
shindig.IfrGadgetService.prototype.requestNavigateTo = function(view, opt_params) {

  	var id = shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
  	var gadget = shindig.container.getGadget(id);

  	if (view == 'canvas') {
  		gadget.openCanvasView(opt_params);
  		return;
  	}
};

/* This is overidden method. Used to set the preferences by gadgets itself */
shindig.IfrGadgetService.prototype.setUserPref = function (editToken, name, value) {
    var id = shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
    var gadget = shindig.container.getGadget(id);
    for (var i = 1, j = arguments.length; i < j; i += 2) {
        gadget.userPrefs[arguments[i]].value = arguments[i + 1];
    }
    gadget.saveUserPrefs();
};


/* Sciverse Service to invoke Resultsview from a gadget.
 * Takes the resultID and viewParams(optional) as input params
 */

shindig.SciverseService.prototype.invokeResultsView = function(divId, viewParams) {

	if (jQuery('#resultsView_' + divId).length == 0) {
		alert("Invalid location");
		return false;
	}

	var id = shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
	var gadget = shindig.container.getGadget(id);

	//show the div under the selected result
	jQuery('#resultsView_' + divId).show();
	var resultsViewRoot = 'resultsView_' + divId;

	//check if the requesting app is already running in result view mode
	if(jQuery('#resultsView'+divId + '_'+gadget.sciverseId_).length!==0){
    return false;
    }


	//Create a new float left layout manager with the above div as the layout root
	shindig.container.layoutManager = new shindig.FloatLeftLayoutManager(
			resultsViewRoot);

	//Create a new gadget and populate it with the specUrl and title from the current gadget
	var newgadget = shindig.container.createGadget( {
		specUrl :gadget.specUrl,
		title :gadget.title,
		userPrefs:this.userPrefs,
		requiresPubSub2:this.requiresPubSub2
	});
	newgadget.sciverseId_ = gadget.sciverseId_;
    newgadget.iconURL=gadget.iconURL;
	newgadget.location = 'resultsView'+divId;
	//Add gadget
	shindig.container.addGadget(newgadget);

	var resultsViewChrome = shindig.container.layoutManager
			.getGadgetChrome(newgadget);

	//Build the frame url with the correct view name and any view params
	newgadget.prepareGadgetForView('sciverseResultsView', resultsViewChrome,
			viewParams);

};

/* Sciverse Service to return contextInfo to a gadget.
 * Returns : sciverse.contextInfo JSON object
 */

shindig.SciverseService.prototype.getContextInfo = function() {
	return sciverseObj.contextInfo;
};

/* Sciverse Service to return the current Result List to a gadget.
 * Returns : resultList javascript object
 */

shindig.SciverseService.prototype.getAllResults = function() {
	    	return resultList;
};

/* Sciverse Service to return the list of selected results to a gadget.
 *Input Parameters:array containing indices of the results to be returned
 *Returns : resultList javascript object
 */

shindig.SciverseService.prototype.getResults = function(resultID_args) {
	var selectedResultArr = [];
	var resultID_var;
	for ( var i = 0; i<resultID_args.length; i++) {
		resultID_var = resultID_args[i];
		selectedResultArr[i] = resultList[resultID_var];
	}
	return selectedResultArr;
};

/*
 * The service is implemented in a generic way so gadgets can subscribe to any channel.
 * It initializes the listener array
 * Appsbarchannel: query
 */
shindig.SciverseService.prototype.subscribe = function(channel, callback){
		if (typeof(listeners) == 'undefined' || listeners == null) return;
		jQuery('#satab').show();
		var id = shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
   		var gadget = shindig.container.getGadget(id);
   		var gState =(gadget.closed_) ? 'close' : 'open';
	    var listener = listeners[channel];
		var l = new Object();
		l.frame = this.f;
		l.callback = callback;
		if (!listener){
			listeners[channel] = new Array(l);
				
			ajaxKeyEventLog(gadget.title, 'displayGadget', gadget.sciverseId_, '','','PageView','',gState,'');
		}else {
			listeners[channel].push(l);	
			ajaxKeyEventLog(gadget.title, 'displayGadget', gadget.sciverseId_, '','','PageView','',gState,'');
		}
		return;
	};
	
/**
* This function will put the suggestions returned by the gadget to the autocomplete
* This function is invoked by the gadget
**/
shindig.SciverseService.prototype.returnQuerySuggestions = function(suggestionsArray, gpin){
	if (pin != gpin || suggestionsArray.length == 0) return;//checking if the responce is for the current pin
		
	var id = shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);//to be replaced with the method to get the gadget Id
   	var gadget = shindig.container.getGadget(id);
   		
	for (var i =0;i< suggestionsArray.length; i++){
		var suggestObject = new Object();
		suggestObject.icon = gadget.iconURL;
		suggestObject.text = suggestionsArray[i];
		suggestObject.gadgetId = gadget.sciverseId_;	
		suggestObject.gadgetTitle = gadget.title;			
		suggestions.push(suggestObject);//array which holds the suggestions from other gadgets
	}
	
	jQuery('#suggestions').show();
	var list = jQuery('#suggestions ul');
	list.empty();
	for (var i=0; i< suggestions.length; i++){
		var li= jQuery('<li />').html('<img src="'+suggestions[i].icon +'" title="'+suggestions[i].gadgetTitle+'" class=appIcon style="position: relative;" />&nbsp;&nbsp; ' +  suggestions[i].text)
			.addClass(i%2 == 0 ? "ac_even" : "ac_odd")
			.appendTo(list)[0];	
		jQuery.data(li, "ac_data", suggestions[i].gadgetId+","+suggestions[i].text);
	}		
	
	var sOffset = jQuery('#suggestions').offset();
	var sOffsetHeight = jQuery('#suggestions').attr('offsetHeight');
	//alert(sOffset.top+sOffsetHeight);
	jQuery('#satab').css({top: sOffset.top+sOffsetHeight, "z-index":300});
	
	
};	

 /**
 * This feature enable the gadget to hide its iframe
 **/
shindig.SciverseService.prototype.makeMeInvisible = function() {
	var id = shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
  	var gadget = shindig.container.getGadget(id);
   	var gState =(gadget.closed_) ? 'close' : 'open';
	//jQuery('#'+this.f).parent().parent().addClass('invisible');
   	if (gadget.requiresPubSub2) {
   		jQuery('#'+this.f).parent().parent().parent().addClass('invisible');
   		jQuery('#'+this.f).css("visibility", "hidden");
   	} else {
   		jQuery('#'+this.f).parent().parent().addClass('invisible');
   	}
    		
	gState += '|invisible';
	ajaxKeyEventLog(gadget.title, 'displayGadget', gadget.sciverseId_, '','','PageView','',gState,'');
};

/**
 * This feature enable the gadget to reveal itself
 **/
shindig.SciverseService.prototype.makeMeVisible = function() {
	var id = shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
  	var gadget = shindig.container.getGadget(id);
   	var gState =(gadget.closed_) ? 'close' : 'open';
	
	//jQuery('#'+this.f).parent().parent().removeClass('invisible');
   	if (gadget.requiresPubSub2) {
   		jQuery('#'+this.f).parent().parent().parent().removeClass('invisible');
   		jQuery('#'+this.f).css("visibility", "");
   	} else {
   		jQuery('#'+this.f).parent().parent().removeClass('invisible');	
   	}
	gState += '|visible';
	ajaxKeyEventLog(gadget.title, 'displayGadget', gadget.sciverseId_, '','','PageView','',gState,'');
};


/**
* Code Changes for HOOVER Starts - 12/08/2010
*/

/* map to keep track of number of hoovers created by a gadget
key:calling gadget frame id
value: number of hoovers created by the calling gadget*/
var gHooversMap = {};

/*
	This service creates the hover view when invoked by a gadget. 
	Input Param: 1.view parameters json object containing data specific to view e.g. link text term
	             2. a location json   containing height,width and x,y coordinates of the hoover view gadget to be rendered.
*/
shindig.SciverseService.prototype.showHoverView = function (viewParams, location) {
      /* check if the calling gadget is already in gHooversMap map
         if not: create an entry with value as 0
         else: increment the value mapped to the key i.e. iframe id
      */
    if (typeof(gHooversMap[this.f]) == 'undefined' || gHooversMap[this.f] == null) {
        gHooversMap[this.f] = 0;
    } else {
        gHooversMap[this.f] += 1;
    }

      /*  hoover index variable taken from the hoover map for current hoover.
            It will be used in assigning div ID to current hoover*/
    var hooverIndex = gHooversMap[this.f];

    var hooverId = 'hoover_' + this.f + "_" + hooverIndex; // hoover id variable to be assigned as hoover ID
    jQuery('#' + hooverId).remove();
    //create hoover div to render hoover view
    var hooverDiv = document.createElement("div");
    //assign hoover Id containing hoover Index from gHooversMap
    hooverDiv.id = hooverId;
    hooverDiv.style.position = "absolute";
    var isLocationDefined=false;
    if(typeof(location) != 'undefined' && location!= '' || location != null)isLocationDefined=true;
    var isXCordinateDefined=false;
     if (isLocationDefined && typeof(location.x) != 'undefined' && location.x != '' || location.x != null)isXCordinateDefined=true;
    var isYCordinateDefined=false;
     if (isLocationDefined && typeof(location.y) != 'undefined' && location.y != '' || location.y != null)isYCordinateDefined=true; 
      /*check if calling gadget has passed any preferred height for hoover window
      and if not, pass default height as default height provided in UI */
    var hooverFrameHeight;
    if (isLocationDefined && typeof(location.height) != 'undefined' && location.height != '' || location.height != null) {
         /* if height passed by the gadget is less than the minimum allowed height,
          pass the default minimum height as gadget height*/
        if(location.height<HOOVER_MINIMUM_HEIGHT){
        hooverFrameHeight=HOOVER_MINIMUM_HEIGHT;
        }
         /* if height passed by the gadget is less than the maximum allowed height,
          pass the default maximum height as gadget height*/
        else if(location.height>HOOVER_MAX_HEIGHT){
        hooverFrameHeight=HOOVER_MAX_HEIGHT;
        }
        else {
        hooverFrameHeight = location.height;
        }
    }
    else {
        hooverFrameHeight = HOOVER_HEIGHT_DEFAULT;
    }
      /*check if calling gadget has passed any preferred width for hoover window
      and if not, pass default width as default width provided in UI*/
    var hooverFrameWidth;
    if (isLocationDefined && typeof(location.width) != 'undefined' && location.width != '' || location.width != null) {
        /* if width passed by the gadget is less than the minimum allowed width,
          pass the default minimum width as gadget width*/
        if(location.width<HOOVER_MINIMUM_WIDTH){
        hooverFrameWidth=HOOVER_MINIMUM_WIDTH;
        }
         /* if width passed by the gadget is less than the maximum allowed width,
          pass the default maximum width as gadget width*/
        else if(location.width>HOOVER_MAX_WIDTH){
        hooverFrameWidth=HOOVER_MAX_WIDTH;
        }
        else {
        hooverFrameWidth = location.width;
        }
       
    }
    else {
        hooverFrameWidth = HOOVER_WIDTH_DEFAULT;
    }
    
    var screenScrollHeight = jQuery(window).scrollTop(); // variable to hold screen scroll height
    var screenScrollWidth = jQuery(window).scrollLeft(); // variable to hold screen scroll width
    var viewportWidth = jQuery(window).width(); // viewport width
    var viewportHeight = jQuery(window).height(); // viewport height
    // defining and calculating hoover div's default coordinates when no coordinates have been specified by calling gadget
    var hooverDefaultLeft;
    var hooverDefaultTop;
    if(!isXCordinateDefined && !isYCordinateDefined){
     hooverDefaultLeft = viewportWidth / 2;
    hooverDefaultLeft = hooverDefaultLeft - (hooverFrameWidth / 2); // loads hoover in the centre of the window
     hooverDefaultTop = viewportHeight / 2;
    hooverDefaultTop = hooverDefaultTop + screenScrollHeight -  2*(hooverFrameHeight/3 );
    }
    var adjustedXCoordinate;
    var adjustedYCoordinate;
    var diffyBottom;
    var diffxRight;
    var diffxLeft;
    var diffyTop;
    if(isXCordinateDefined&&isYCordinateDefined){
     adjustedXCoordinate = location.x +8; // variable to hold x coordinate of the hoover view div
     adjustedYCoordinate = location.y; // variable to hold y coordinate of the hoover view div
    /*variables to calculate hoover position according to the link text click*/
     diffyBottom = (viewportHeight + screenScrollHeight) - (location.y + hooverFrameHeight); // is >0 if there is enough space for hoover to render below the link text clicked
     diffxRight = viewportWidth - (location.x + hooverFrameWidth); // is >0 if there is enough space for hoover to render to the right of the link text clicked
     diffxLeft = location.x - hooverFrameWidth - screenScrollWidth; // is >0 if there is enough space for hoover to render to the left of the link text clicked
     diffyTop = location.y - hooverFrameHeight - screenScrollHeight; // is >0 if there is enough space for hoover to render above the link text clicked
      /*if there is not enough space between clicked text and screen bottom, 
      render hoover div above the text
      */
    if (diffyBottom < 0) {
        adjustedYCoordinate = location.y - (hooverFrameHeight );
    }
      /*if there is not enough space between clicked text and screen top as well as bottom, 
      render hoover div below the text
      */
    if (diffyTop < 0 && diffyBottom < 0) {
        adjustedYCoordinate = location.y;
    }
      /*if there is not enough space between clicked text and screen's right edge, 
      render hoover div to the left of text
      */
    if (diffxRight < 0) {
        adjustedXCoordinate = location.x - (hooverFrameWidth + 46);
    }
      /*if there is not enough space between clicked text and sscreen's right edge as well as
      screen's left  edge,render hoover div below towards the right of the text
      */
    if (diffxLeft < 0 && diffxRight < 0) {

        adjustedXCoordinate = location.x + 20;
    }
    }
    // pass the adjusted coordinates as hoover div top attribute
    hooverDiv.style.left = (isLocationDefined && isXCordinateDefined && adjustedXCoordinate ? adjustedXCoordinate : hooverDefaultLeft) + 'px';; //left+'px';
    hooverDiv.style.top = (isLocationDefined && isYCordinateDefined && adjustedYCoordinate ? adjustedYCoordinate : hooverDefaultTop) + 'px'; //top+'px';
    document.body.appendChild(hooverDiv);
    // create a new layout manager and pass hoover div ID as a parameter      
    shindig.container.layoutManager = new shindig.FloatLeftLayoutManager(hooverId);
    var id = shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
    var gadget = shindig.container.getGadget(id);
    if(!gadget.isHoverViewAvailable){
    alert("Hover view is not available in gadget xml.");
    return;}
    // call create gadget, add gadget and prepareGadgetForView() to render the hoover view
    var hooverGadget = shindig.container.createGadget({
        'height': hooverFrameHeight-25,
        specUrl: gadget.specUrl,
        title: gadget.title,
        userPrefs: (gadgetPrefs[gadget.specUrl].uprefObj != null ? gadgetPrefs[gadget.specUrl].uprefObj : null),
        requiresPubSub2: gadget.requiresPubSub2
    });
    hooverGadget.sciverseId_ = gadget.id;
    hooverGadget.closed_ = gadget.closed;
    hooverGadget.iconURL = gadget.iconURL;
    hooverGadget.location = 'hoover';
    hooverGadget.locationOnPage = 'hoover';
    hooverGadget.hasUserPrefs = gadgetPrefs[gadget.specUrl].hasUserPrefs;
    hooverGadget.hooverIndex = hooverIndex;
    hooverGadget.pinPosition = 'absolute';
    shindig.container.addGadget(hooverGadget);
    hooverGadget.prepareGadgetForView('hover', hooverDiv, viewParams);
    // assign css attributes to hoover div according to the width and height passed by the calling gadget
    var isQuirk=checkCompliance();
    var isQuirkFlag=false;;
    if(isQuirk=='Quirks'){isQuirkFlag=true;}
     jQuery('#' + hooverId).css({
       'width': hooverFrameWidth ? (hooverFrameWidth) : HOOVER_WIDTH_DEFAULT+'px',
        /*The height of this DIV will be calculated dynamically during the createGadget()
        if the browser is in standard mode and will be passed if it is in quirks mode*/
        'height': isQuirkFlag ? (hooverFrameHeight) :'',
        'padding': '0px',
        'margin': '0px',
        'z-index':'60'
    });
    // call jquery resizable and pass minimum height and width for resize
    jQuery('#' + hooverId).resizable({
        minHeight: HOOVER_MINIMUM_HEIGHT,
        minWidth: HOOVER_MINIMUM_WIDTH,
        // resize start event 
        start: function (event, ui) {
                  /*
                  * create a temporary  empty div and append it to body. This div will overlay the whole window
                  * when resizing starts. This way it is ensured that onmouseout event which invokes resizable stop,
                  * happens on a container div instead of the various iframes present on the page. This div will be removed in resizable stop  
                  */
            
             var tempOverLayDiv = jQuery('<div style="background:#000;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);opacity:0;">&nbsp;</div>');
            jQuery('body').prepend(tempOverLayDiv[0]);
            tempOverLayDiv[0].id = 'temp_OverLayDiv';
            tempOverLayDiv.css({
                position: 'absolute'
            });
            tempOverLayDiv.css({
                top: 0,
                left: 0
            });
            tempOverLayDiv.css('z-index', '1009');
            tempOverLayDiv.height(2 * (jQuery(document).height()));
            tempOverLayDiv.width('100%');
            var isQuirk=checkCompliance();
            if(isQuirk=='Quirks' && truncateURL ){
            jQuery('#' + hooverGadget.getIframeId()).parent().css('position','absolute');
           }
        },
        resize: function (event, ui) { // to be executed while resize is happening
            /* change the main content div and iframe height as the resize is done by the user*/
           
            var frameHeight = (jQuery('#' + hooverId).height() - jQuery('#hoover-' + hooverGadget.id).height());
            jQuery('#' + hooverGadget.getIframeId()).parent().css('height', frameHeight + 'px');
            jQuery('#' + hooverGadget.getIframeId()).css({
                'height': frameHeight + 'px',
                'margin': '0px'
            });
        },
        stop: function (event, ui) {
            jQuery('#temp_OverLayDiv').remove(); // remove the temporary overlay div created in resize start
             if (hooverGadget.pinPosition == 'fixed') hooverGadget.togglePin();
        }
    });
    //assign  image url for resize icon in hoover
    jQuery('#'+hooverId).children('.ui-icon').css('background-image','url('+gadgetIconPath+'/ui-icons_222222_256x240.png)');
    // invoke jquery draggable on the hoover view div and with handle as hoover view titlebar
    jQuery('#' + hooverId).draggable({
        handle: '#hoover-' + hooverGadget.id,
        'containment': 'parent',
        start: function (event, ui) {
                  /*
                  * create a temporary  empty div and append it to body. This div will overlay the whole window
                  * when dragging starts. This way it is ensured that onmouseout event which invokes draggable stop,
                  * happens on a container div instead of the various iframes present on the page. This div will be removed in draggable stop  
                  */
            
            var tempOverLayDiv = jQuery('<div></div>');
            jQuery('body').prepend(tempOverLayDiv[0]);
            tempOverLayDiv[0].id = 'temp_OverLayDiv';
            tempOverLayDiv.css({
                position: 'absolute'
            });
            tempOverLayDiv.css({
                top: 0,
                left: 0
            });
            tempOverLayDiv.css('z-index', '1009');
            tempOverLayDiv.height(2 * (jQuery(window).height()));
            tempOverLayDiv.width('100%');
        },
       stop: function (event, ui) {
            jQuery('#temp_OverLayDiv').remove(); // remove the temporary overlay div created in draggable start             
        }
       
    });
    return hooverIndex;
};

shindig.SciverseService.prototype.closeHover = function(hooverId){
	if (typeof(hooverId) == 'undefined' || hooverId == null) return;
	
	var frameName = this.f;
	if (jQuery('#hoover_'+frameName+'_'+hooverId).length > 0) {
    	jQuery('#hoover_'+frameName+'_'+hooverId).remove();
    }
}


/*
This Service removes all the hover windows created by the gadget 
*/
shindig.SciverseService.prototype.closeAllHovers = function () {
    var frameName = this.f;
    var objs = jQuery('body>div').filter(function (index) {
        return this.id.indexOf(frameName) > 0; //return all hoovers (divs) created by this gadget/frame
    });
    jQuery.each(objs, function (index, obj) {
        jQuery('#' + obj.id).remove();
    });
};
/**
* Code Changes for HOOVER Ends - 12/08/2010
*/


/**
* Code Changes for Link TEXT Starts - 12/07/2010
*/

var termListeners = {};
var allCategories = {'author':'svAuthor','title':'svTitle','keywords':'svKeyWords','abstract':'svAbstract','article':'svArticle','references':'svRefs','all':'svBigBox'};
/**
 This service will link the terms specified in the gadget.
 */
shindig.SciverseService.prototype.linkText = function (terms, categories, frequency, occurence) { //terms is an array
    termListeners = {};
    var termsString = '';
    var termsCount = {};
    var termsToLink = new Array();
   for (var t=0;t<terms.length;t++) {
        if (!isListener(this.f, terms[t].toLowerCase())) {
            termsToLink.push(terms[t]);
        }
    }
    if (termsToLink.length > 0) {
        if (frequency != 'undefined' && (frequency == 'first' || frequency == 'every')) {
            if (frequency == 'first') {
                occurence = 1;
            }
            if(occurence=='undefined'||occurence==''||occurence==null){
            occurence = 1;
            }
             /* If all is present in categories, link the terms in complete article*/
           var iframeID=this.f;
            if ( jQuery("#"+iframeID).parents('svDoNotLink').length==0  ) { 
            
            if (jQuery.inArray('all', categories) != -1) {
            		iterateHTMLElements(jQuery('.'+allCategories['all']), termsToLink, this.f, frequency, occurence, termsCount);					
	        } else {
                   for (var c = 0; c < categories.length; c++) {
                    iterateHTMLElements(jQuery('.' + allCategories[categories[c]]), termsToLink, this.f, frequency, occurence, termsCount);
                }
            }
            }
        } else {
            alert('Invalid frequency. Frequency can only be either first or every');
        }
    }

    jQuery('.linkText').unbind();
    jQuery('.linkText').click(function (event) {
     jQuery(this).css('text-decoration','none');
       notifyGadgets(jQuery(this).text(),event);
	    });
	 jQuery('.linkText').mouseover(function (event) {
     jQuery(this).css('text-decoration','underline');
     	    });
	    jQuery('.linkText').mouseout(function (event) {
        jQuery(this).css('text-decoration','none');
          	    });


};

/**
 This method will iterate over the html elements and link the terms
 based on the specified frequency and occurence 
 */

function iterateHTMLElements(elem, lstTerms, frame, frequency, occurence, termsCount) {


	//Make a jquery selection pattern for css classes to be ignored.
	var classesToIgnore = 'svDoNotLink';
	if (sciverseObj.contextInfo["LinkTextClassesToIgnore"]) {
		classesToIgnore += ','+sciverseObj.contextInfo["LinkTextClassesToIgnore"];
	}
	var classSelector = '';
	var cti = classesToIgnore.split(',');
	for (var c=0; c< cti.length; c++){
		var cl = cti[c];
		//make the selection pattern as: '[class*="reflect_"],[class*="nbApiHighlight"]'
		if (classSelector == '') classSelector = '[class*=\"' + cl + '\"]';
		else classSelector += ',' + '[class*=\"' + cl + '\"]';
	}
	
	//alert(classSelector);
	
	var textNodes = sgf.getTextNodesIn(jQuery(elem).get(0)); //Using jquery for DOM traversal had a huge negative performance with IE only ... so, just use the regular DOM methods for it.
    for (var i = 0, len = textNodes.length; i < len; i++) {
        var textNode = jQuery(textNodes[i]);
        var text = textNode.text();
        //var parent = textNode.parent();
        var temp;
        var buffer = new BufferText('');
        var termsString = ''; /* Converting terms array to string concatenated with  | */
        for (var term =0; term < lstTerms.length; term++) {
            if (!(termsCount[lstTerms[term].toLowerCase()] >= 1)) {
                termsCount[lstTerms[term].toLowerCase()] = 0;
            }
            termsString = termsString + '|' + '\\b'+lstTerms[term]+'\\b';//match full words only - hence surround with \b regexp
        }
        termsString = termsString.substr(1, termsString.length);

        /* creating regular expression to match any of the terms*/
        patternSelector = new PatternSelector(text, termsString, 'ig');

        while (patternSelector.findPattern()) {
            temp = document.createElement('div');
            var currentTerm = patternSelector.getMatchedPattern();
            var currentTermLowerCase = currentTerm.toLowerCase();
            termsCount[currentTermLowerCase] += 1;

			/* If frequency is first and the term is already linked
             or if the occurence is not correct donot link the term*/
            if (termsCount[currentTermLowerCase] % occurence != 0 || (frequency == 'first' && termsCount[currentTermLowerCase] > 1)) {
                patternSelector.appendReplacement(buffer, patternSelector.getMatchedPattern());
            } else {
                if (termListeners[currentTermLowerCase] && !isListener(frame, currentTermLowerCase)) {
                    termListeners[currentTermLowerCase].push(frame);
                    
                } else if (jQuery(textNode.parents('a')).length == 0 && jQuery(textNode.parents(classSelector)).length == 0) {
                	//link only if none of the ancestors are an <a> node
                	// OR none have one of the css classes to be ignored ... these come from the variable: classSelector above
                    patternSelector.appendReplacement(buffer, "<a class='linkText' onmouseover=\"className='linkTextClicked';\" onmouseout=\"className='linkText';\" href='javascript:void(0);' style='cursor:pointer;cursor:hand;'>" + currentTerm + "</a>");


                    if (!isListener(frame, currentTermLowerCase)) {
                        termListeners[currentTermLowerCase] = new Array();
                        termListeners[currentTermLowerCase].push(frame);
                        //alert(frame + " is a listener of " + term);
                        //alert(term + " linked in " + jQuery(parent).attr('tagName') + " :: " + text);							
                    }
                }
            }
        }

        //alert('Text node before inner html is'+textNode.innerText+'text is 'textNode.text());
        if (buffer.toString().length > 0) {
            temp.innerHTML = patternSelector.appendTail(buffer);
            //alert('Text node after inner html is'+textNode.innerText);
            jQuery(textNode).before(jQuery(temp).contents());
            jQuery(textNode).remove();
        }
    }
}

var sgf = sgf || {};
/*
 * Get all text node descendents of the given node in the DOM
 * (Copied from http://stackoverflow.com/questions/298750/how-do-i-select-text-nodes-with-jquery)
 */
sgf.getTextNodesIn = function(node, includeWhitespaceNodes) {
    var textNodes = [];

    function getTextNodes(node) {
    	if (node == null) return;
        if (node.nodeType == 3) {
            if (includeWhitespaceNodes || !/^\s*$/.test(node.nodeValue)) {
                textNodes.push(node);
            }
        } else {
            for (var i = 0, len = node.childNodes.length; i < len; ++i) {
                getTextNodes(node.childNodes[i]);
            }
        }
    }

    getTextNodes(node);
    return textNodes;
}

shindig.IfrContainer.prototype.SciverseService = new shindig.SciverseService();

function notifyGadgets(term, evt) {
    /*changeLinkTextClass(evt);*/
    var mousePosition = getMouseClickCoordinates(evt);
    var ls = termListeners[term.toLowerCase()];
    for (var i = 0, len = ls.length; i < len; i++) {
        gadgets.rpc.call(ls[i], 'linkTextCallback', null, term, mousePosition.x, mousePosition.y);
    }
};

/* function to remove dotted underline from below the linked text*/
function changeLinkTextClass(e){
if (!e) var e = window.event;
jQuery(e.target).removeClass('linkText');
jQuery(e.target).addClass('linkTextClicked');

};
function isListener(f, t) {
    if (typeof(termListeners[t]) == 'undefined') return false;
    var ls = termListeners[t];
    for (var i = 0, len = ls.length; i < len; i++) {
        if (ls[i] == f) return true;
    }
    return false;
};

function getMouseClickCoordinates(e) {
    var posx = 0;
    var posy = 0;
   posx = jQuery(e.target).offset().left + jQuery(e.target).outerWidth();
   posy=jQuery(e.target).offset().top;
   
    return {
        x: posx,
        y: posy
    };
};







/* This is used to select the given pattern in the text*/
/* pattern is the regular expression */
/* swithces include i - case insensitive, g- global search */
function PatternSelector(text, pattern, switches) {
    this._text = "" + text;
    this._expression = new RegExp(pattern, switches);
    this.reset();
    return;
}

PatternSelector.prototype = {
    
    /*This method will check and append the text to the buffer*/
    _appendText: function (buffer, text) {
    	return ((buffer) ? buffer.append(text) : text);
    },

	/* This method will replace the matched pattern with the replacement text*/
    appendReplacement: function (buffer, replacementText) {
		 
		/*Get the content from previous pattern end to the next pattern beginning*/    	
    	var content = this._text.substring(this._prevPatternEnd, this._text.substring(
        this._prevPatternEnd).indexOf(this._patternMatchList[0]) + this._prevPatternEnd);
		
		/*Add the replacement text to the above content*/
        content = content + replacementText;
        
        return ((this._patternMatchList != null) ? this._appendText(buffer, content) : buffer);
    },

	/* This method will apppend the text present after the last pattern match till the 
	end of the text to the buffer.*/
    appendTail: function (buffer) {
    	return (this._appendText(buffer, this._text.substring(this._prevPatternEnd)));
    },

	/* This method will return true if the pattern is found and false otherwise.
		This will also update the previous pattern's end index.*/
    findPattern: function () {
        this._prevPatternEnd = this._expression.lastIndex;
        this._patternMatchList = this._expression.exec(this._text);
        return (this._patternMatchList != null);
    },

	/*This method will return the current matched pattern.*/
    getMatchedPattern: function (index) {
        return (this._patternMatchList != null ? this._patternMatchList[0] : '');
    },

	/* This method will reset all the values.*/
    reset: function (index) {
        this._patternMatchList = null;
        this._prevPatternEnd = -1;
        return;
    }
}

/*This will create an instance of an empty string array*/
function BufferText(initialString) {
    this.buffer = (typeof(initialString) == "string") ? new Array(initialString) : new Array();
    return;
}

BufferText.prototype = {
	/*This method will add a string into the string array.*/
    append: function (newString) {
        this.buffer.push(newString);
        return (this);
    },
    
    /*This method will join the strings in the array and return a single string.*/
    toString: function () {
        return (this.buffer.join(""));
    }
}


/**
* Code Changes for Link TEXT Ends - 12/07/2010
*/

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
