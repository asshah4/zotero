/*******************************************************************************
This JavaScript file contains all the Shindig APIs which have been inherited 
or newly written in order to customize Sciverse Gadgets functionalty.  
 ******************************************************************************/
 
shindig.SciverseContainer = function(){
	shindig.IfrContainer.call(this);
	this.view_ = 'profile';
}

shindig.SciverseContainer.inherits(shindig.IfrContainer);
shindig.container = new shindig.SciverseContainer();

var terms;

shindig.SciverseGadget = function(opt_params) {
  shindig.BaseIfrGadget.call(this, opt_params);
  //this.setServerBase("http://dvc7665:25785/gadgets/");
 this.setServerBase(sciverseObj.smapiVars.serverBaseURL+"/"); // default tomcat gadget server
};

shindig.SciverseGadget.inherits(shindig.BaseIfrGadget);
shindig.IfrContainer.prototype.gadgetClass = shindig.SciverseGadget;

shindig.SciverseGadget.prototype.queryIfrGadgetType_ = function() {
	
	var gadget = this;
    var subClass = shindig.IfrGadget;
    for (var name in subClass) if (subClass.hasOwnProperty(name)) {
      this[name] = subClass[name];
    
    }
   };
/**
 * Gets the HTML element that is the chrome of a gadget into which the cotnent
 * of the gadget can be rendered. 
 * @param {Object} gadget Gadget instance
 * @param {Object} location variable
 * @return {Object} HTML element that is the chrome for the given gadget
 */

shindig.FloatLeftLayoutManager.prototype.getGadgetChrome =
    function(gadget, location) {
	
  var layoutRoot = document.getElementById(this.layoutRootId_);
  
  if (layoutRoot) {
    var chrome = document.createElement('div');
    chrome.id = gadget.location + '_' + gadget.sciverseId_;
    chrome.className = 'containerApplOver';
        /* For gadgets with userpref startMeinvisible=y */
    if (gadget.isStartMeInvisible){
   
   chrome.className='containerApplOver invisible';
  
    }
        
    layoutRoot.appendChild(chrome);
    return chrome;
    
  } else {
    return null;
  }
};

/**
 * Gets the HTML element into which the cotnent
 * of the gadget debug window can be rendered. 
 * @param {Object} gadget Gadget instance
 * @param {Object} location variable
 * @return {Object} HTML element that is the chrome for 
 * the gadget debug window of the given gadget
 */

shindig.FloatLeftLayoutManager.prototype.getGadgetDebugChrome =
    function(gid,location) {
  var layoutRoot = document.getElementById(this.layoutRootId_);
  if (layoutRoot) {
    var debugArea = document.createElement('textarea');
    debugArea.id = location + '_debug_'+gid;
    //debugArea.rows='3';
    //debugArea.cols='28';
    debugArea.style.width="97%"; 
    debugArea.style.textAlign="center";
    debugArea.readonly='readonly';
    layoutRoot.appendChild(debugArea);
    return debugArea;
  } else {
    return null;
  }
};

/**
 * Renders a gadget using ifr.
 * @param {Object} gadget Gadget object
 */
shindig.IfrContainer.prototype.renderGadget = function(gadget, view, url, chrome) { 
  if (view == 'canvas') {   
	    jQuery('#'+sciverseObj.contextInfo.pageContentDivTagName).hide();
     	sgf.startTimer('canvas', 'canvas', gadget.id);
  		gadget.renderCanvas(url);
	    } else if (view == 'sciverseResultsView') {
	  	sgf.startTimer(gadget.sciverseId_, gadget.location, gadget.id);
	  	gadget.renderResultsView(chrome, url);
  } /* Change for AMP11-1 : Hoover
  
   New clause for hoover view, gets executed when 
   renderGadget is called with view argument as hoover*/
  else if (view == 'hover') {
  
	  	sgf.startTimer(gadget.sciverseId_, gadget.location, gadget.id);
	  	gadget.renderHooverView(chrome, url);	  	
  } else { 
	    var chrome = this.layoutManager.getGadgetChrome(gadget);
	    log(gadget.sciverseId_, gadget.location, 'chrome created'); 
	   	sgf.startTimer(gadget.sciverseId_, gadget.location, gadget.id);
	   	log(gadget.sciverseId_, gadget.location, 'timer created');
	  	gadget.render(chrome);
	  	log(gadget.sciverseId_, gadget.location, 'gadget rendered');
	  	log(gadget.sciverseId_, gadget.location, gadgets.json.stringify(sciverseObj.contextInfo));
  }
};
/* This function gets fired just 
 * before the rendergadget call is made*/
var sgf = sgf || {};

sgf.startTimer = function(chromeid, location, gid){
	if (typeof(timers_) == 'undefined' || timers_ == null){
		timers_ = new Array();
	}
	timers_[location+chromeid] = setTimeout("sgf.timeout('"+chromeid+"', '"+ location+"', '"+gid+"')",sciverseObj.smapiVars.gadgetLoadTimeout);
	
};


/* This function gets fired  
 * inside the startTimer function and prints the time 
 * out message in the gadget chrome
 */
 
sgf.timeout = function(chromeid, location, gid){
	//jQuery('#'+location+'_'+chromeid).remove();
	if(toolbarOrientation=='vertical'){
	var toolbarHeight = parseInt(jQuery('#sciverse_toolbar').height()-7);
	jQuery('#toggleImg').css('height',toolbarHeight+'px' );}
	
	
	jQuery('#Controls_'+gid).css('display', 'none');
	jQuery('#Close_'+gid).css('display', '');
	jQuery('#maincontremote_iframe_'+gid).css('height','125px')
	jQuery('#maincontremote_iframe_'+gid).html("Gadget timed out while loading");	
	log(chromeid,location, 'Gadget timedout while loading.');
	
}

/* This function gets fired  
 * on gadget onload event
 * and clear the time out
 */

sgf.killTimer = function(chromeid, location) {
	clearTimeout(timers_[location+chromeid]);
	log(chromeid,location, 'Timer Killed');
	//load the toolbar hide/show image once the iframe has loaded 
	if(!sciverseObj.contextInfo.toolbarState){
		var toolbarHeight = parseInt(jQuery('#sciverse_toolbar').height()-7);
		jQuery('#toggleImg').css('height',toolbarHeight+'px' );
	}
};

/* This function renders the gadget in profile view
 */
shindig.SciverseGadget.prototype.render = function(chrome) {
  if (chrome) {
    var gadget = this;
    this.getContent(function(content) {
      	chrome.innerHTML = content;
      	if(this.requiresPubSub2 === true)	gadget.oaaIframeId = gadget.finishRender(); //vinay
    });
  }
};
/* This function renders the gadget's main content in profile view
 */
shindig.IfrGadget.getMainContent = function(continuation) {
	var aboutAppLink=sciverseObj.smapiVars.gadgetDetailPage+"/"+this.sciverseId_;
	var iframeId = this.getIframeId();
	var content = '';
	var zone = this.location;
	var failureStatus = false;
	var iframeWidth;
	var height_;
	if (typeof(this.height) != 'undefined' && this.height != null) {
	    height_ = this.height;
	}
	else {
	    height_ = ''
	}
	if(MSIE7Flag){
		if(toolbarWidth==null||toolbarWidth==''){
		iframeWidth='100%';
		}
		else{
			if(toolbarOrientation.toLowerCase()=='vertical'){
				iframeWidth=parseInt(tbWidthwithoutImage,10)-15;
				iframeWidth+='px';
			}
			else{
				iframeWidth=parseInt(toolbarWidth,10)-15;
				iframeWidth+='px';
			}
		}
	}
	else{
		if (toolbarWidth == null || toolbarWidth == '') {
		    iframeWidth = '100%';
		}
		else {
		    iframeWidth = '99.5%';
		}
	}
	//Code changes for EMBAPP Starts - 21/11/2010 
	var gadgetBorder = '';
	var gadgetTopBorder = '';
	if (typeof(this.includeBorder) != 'undefined' && !this.includeBorder) {
	    gadgetBorder = 'none';
	} else {
	    gadgetBorder = 'solid';
	}
	if (this.includeBorder && !this.includeTitle) {
	    gadgetTopBorder = '1px solid #FEC76D';
	}
	if (this.closed_) {
	    var state = 'none';
	} else {
	    state = '';
	}
	content += '<div id="maincont' + iframeId + '" style="display:' + state + ';border-style:' + gadgetBorder + ' ;border-top:' + gadgetTopBorder + '" class="containerAppDetails">';
	content += '<iframe id="' + iframeId + '"onload="sgf.killTimer(\'' + this.sciverseId_ + '\', \'' + this.location + '\');" name="' + iframeId + '"  src="' + (state == "none" ? '' : this.getIframeUrl()) + '"' + ' style=" align: left;text-align: left;"' + '" frameborder="no"  scrolling="auto" height="' + height_ + '" width="' + iframeWidth + '"' + '></iframe>';
	content += '</div>';
	gadgets.rpc.setRelayUrl(iframeId, this.serverBase_ + this.rpcRelay);
	//Code changes for EMBAPP ends - 30/11/2010 
	gadgets.rpc.setAuthToken(iframeId, this.rpcToken);
	log(this.sciverseId_, 'got frame content');
	continuation(content);
};
/* This function renders the gadget's titlebar content in profile view
 */
shindig.SciverseGadget.prototype.getTitleBarContent = function (continuation) {
    //Code changes for EMBAPP Starts - 21/11/2010 
    if (this.includeTitle == false) {
        continuation('');
        return;
    }
    //Code changes for EMBAPP ends - 30/11/2010 
    var gtitle;
    if (this.title) gtitle = this.title;
    else gtitle = 'title';

    var content = '';
    var state = gadgetIconPath + '/close.gif';
    var title = 'Close this application';
    var decide;
    var leftEdgeUrl;
    var bodyUrl;
    var rightEdgeUrl;
    var appTitClass;
    if (this.closed_) {
        state = gadgetIconPath + '/open.gif';
        title = 'Open this application';
        decide = true;

        appheaderClass = 'boxGrey';
        appTitClass = "elsevierTimeL";
    }
    else {
        decide = false;

        appheaderClass = 'boxYellow';
        appTitClass = "elsevierTimeLOver";
    }
    content += '<div id="footer' + this.cssClassTitleBar + '-' + this.id + '" class="curveBoxleftNormal ' + appheaderClass + '" >';
    content += '<img src="' + this.iconURL + '"  border="none" class="headingGadgetIcon" title="' + this.title + '">';
    content += '<h3 id="GadgetName' + this.id + '" class="' + appTitClass + ' truncateTitle">' + gtitle + '</h3>' +
    '<div id="Controls_'+this.id+'"class="Controls" align="right">' + '<ul  class="menu">';
    content += '<li><a href="javascript:void(0);" id="button-' + this.getUserPrefsDialogId() + '" onclick="shindig.container.getGadget(' + this.id + ').openMenuOptions();return false;" ><img style="border: 0;" src="' + gadgetIconPath + '/options.gif"' + ' alt="Open/Close Options" title="open options"></a></li>';
    content += '<li> <a href="javascript:void(0);" onclick="shindig.container.getGadget(' + this.id + ').openCanvasView();"><img style="border: 0px;" src="' + gadgetIconPath + '/canvas.gif" title="open application to full-screen mode"/></a></li>';
    content += '<li> <a href="javascript:void(0);" onclick="shindig.container.getGadget(' + this.id + ').handleToggle(this);"><img id="img_' + this.id + '" style="border: 0px;" src="' + state + '" title="' + title + '"/></a></li>';
    content += '<ul class="submenu" id="sb-' + this.getUserPrefsDialogId() + '"></ul>';
    content += '</ul>';
    content += '</div>';
    
	//this is for timeout close
	content += '<div id="Close_'+this.id+'" class="Controls_close" style="display:none;"><a href="javascript:shindig.container.getGadget('+this.id+').closeGadget();"><img  src="'+gadgetIconPath+'/close_hoover.gif" title="Close" /></a></div>';
    
    content += '</div>';
    log(this.sciverseId_, 'got title bar content');
    continuation(content);
};

shindig.SciverseGadget.prototype.closeGadget = function(){
	//alert("closeGadget iframeid: " + this.getIframeId());
	jQuery('#maincont'+this.getIframeId()).parent().remove();
}

/* This function loads the gadget's 
 *user preference dialogue content in profile view
 */
shindig.SciverseGadget.prototype.getUserPrefsDialogContent = function(continuation) {
  continuation('<div id="' + this.getUserPrefsDialogId() +'"  style="display: none;z-index: 10; left: 0px;top:0px;border: 1px solid #e2cda2;border-top:0px ;font: smaller;background-color:#feffd3; width:99%;font-weight:bold;"></div>');
};

/* This function cancels the   
 *user preference dialogue box and hides it in profile view
 */
 shindig.SciverseGadget.prototype.handleCancelUserPrefs = function() {

var failureStatus=false;
 jQuery('#'+this.getUserPrefsDialogId()).slideToggle();
 
  ajaxKeyEventLog(this.title,'cancelGadgetPreferences',this.sciverseId_,'landingPage','','SubmitAction',failureStatus,'','',this.location);
};
 


 /* 
  This function is used to toggle the gadget 
  */
shindig.SciverseGadget.prototype.handleToggle = function(imgObject) {
	if (jQuery('#'+this.getUserPrefsDialogId()).css('display')=='block')
	 {jQuery('#'+this.getUserPrefsDialogId()).slideToggle();}
	  
 var isImg = false;

 var keyEventType = 'SubmitAction';
 var eventName = '';
 var failureStatus = false;
 if (jQuery(imgObject).children()[0] != null && jQuery(imgObject).children()[0].tagName == 'IMG') isImg = true;
 //vinay-begin
  var frameId = "";
 if (this.requiresPubSub2){
	frameId = this.oaaIframeId;
 }else {
 	frameId = this.getIframeId();
 }
 //vinay-end
  var gadgetIframe = document.getElementById(frameId);//vinay
  if (gadgetIframe) {      
    var display = jQuery('#maincont'+this.getIframeId()).css('display');
    if (display == 'none'){
    	if (jQuery('#'+frameId).attr('src') == '') {//vinay
    		jQuery('#'+frameId).attr('src', this.getIframeUrl());//vinay
    	}
    		jQuery('#img_'+this.id).attr('src',gadgetIconPath+'/close.gif');
    		jQuery('#img_'+this.id).attr('title', 'Close this application');
    		jQuery('#footer' + this.cssClassTitleBar + '-' + this.id).removeClass('boxGrey');
    		jQuery('#footer' + this.cssClassTitleBar + '-' + this.id).addClass('boxYellow');
				/*jQuery('#body' + this.cssClassTitleBar + '-' + this.id).css('background-image',
				'url('+gadgetIconPath+'/curvebody.gif)');
				jQuery('#' + this.cssClassTitleBar + '-' + this.id).css('background-image',
				'url('+gadgetIconPath+'/curveRight.gif)');*/
    		
    		jQuery('#GadgetName'+this.id).css('font-weight', 'bold');
    		

    }else{

	    	jQuery('#img_'+this.id).attr('src', gadgetIconPath+'/open.gif');
	    	jQuery('#img_'+this.id).attr('title', 'Open this application');
	    	jQuery('#footer' + this.cssClassTitleBar + '-' + this.id).removeClass('boxYellow');
    		jQuery('#footer' + this.cssClassTitleBar + '-' + this.id).addClass('boxGrey');
	    //	jQuery('#footer' + this.cssClassTitleBar + '-' + this.id).removeClass('boxYellow').addClass('boxGrey'));
	    	/*jQuery('#footer' + this.cssClassTitleBar + '-' + this.id).css('background-image',
				'url('+gadgetIconPath+'/curveLeftNormal.gif)');
				jQuery('#body' + this.cssClassTitleBar + '-' + this.id).css('background-image',
				'url('+gadgetIconPath+'/curveBodyNormal.gif)');
				jQuery('#' + this.cssClassTitleBar + '-' + this.id).css('background-image',
				'url('+gadgetIconPath+'/curveRightNormal.gif)');*/
	    	
    	jQuery('#GadgetName'+this.id).css('font-weight', 'normal');
    	
    } 
	jQuery('#maincont'+this.getIframeId()).slideToggle('normal',function () {
	var toolbarHeight=parseInt(jQuery("#sciverse_toolbar").height(),10)-7;
	toolbarHeight+='px';
	jQuery('#toggleImg').css('height', toolbarHeight);
	}); 

	if(isImg){	
		var imgCloseFlag=this.closed_;
		if(imgCloseFlag){
			eventName = 'openGadget';
			this.closed_=false; 
		}else 
		{
			eventName = 'closeGadget';
			this.closed_=true; 
		}	
		if( jQuery('#sb-'+this.getUserPrefsDialogId()).css('display')=='block')jQuery('#sb-'+this.getUserPrefsDialogId()).toggle();
	}
	if (!isImg) {	 
		var closeFlag=this.closed_;
		if(closeFlag){
			eventName = 'openGadget';
			this.closed_=false
		}else 
		{
			eventName = 'closeGadget';
			this.closed_=true;
		}		
		this.openMenuOptions();		
	}
  }
  
	this.saveGadgetState(eventName,keyEventType,failureStatus);
		
};

/* This function makes the ajax call
 * to the gadget state action bean to save 
 * the gadget state in the session
 */
 
shindig.SciverseGadget.prototype.saveGadgetState = function (eventName, keyEventType, failureStatus) {
    var pageName = sciverseObj.contextInfo.pageType;
    var f_gadgetOpen = '';
    var f_gadgetState = '';
    if (this.closed_) {
        f_gadgetOpen = 'N';
         f_gadgetState='close|visible';
    } else {
        f_gadgetOpen = 'Y';
        f_gadgetState='open|visible';
    }
    var zone = this.location;
    var req = "gadgetDefinition=" + this.specUrl + "&" + "location=" + this.location + "&" + "gadgetOpen=" + f_gadgetOpen;
    req += "&" + "eventName=" + eventName + "&" + "keyEventType=" + keyEventType + "&" + "zone=" + zone;
    req += "&" + "failureStatus=" + failureStatus + "&" + "pageName=" + pageName + "&" + "isKeyEventURLAvailble=" + isKeyEventURLExists;
    req += "&" + "gadgetId=" + this.sciverseId_ + "&" + "moduleName=gadget" + "&" + "gadgetState=" + f_gadgetState;

    jQuery.ajax({
        type: 'GET',
        url: sciverseObj.smapiVars.gadgetStateURL + "?",
        async: true,
        data: req
    });


}
/* This function loads  the menu options dropdown for the gadget
 */

shindig.SciverseGadget.prototype.openMenuOptions = function() {		
	var aboutAppLink=sciverseObj.smapiVars.gadgetDetailPage+"/"+this.sciverseId_;
	var failureStatus=false;
	var i_closeFlag=this.closed_;
	
	var id;
	id="sb-";
	id+= this.getUserPrefsDialogId();
	
	var parentEle = jQuery("#"+id).parent();
	var parentPos = jQuery(parentEle).position();
	var liEle = jQuery(parentEle).find("li");
	var controlEle = jQuery('#'+id);
	controlEle.toggle();
	var builtMenu='';
	
	if (!i_closeFlag) builtMenu += '<li><a href="javascript:void(0);"onclick="shindig.container.getGadget('+ this.id + ').handleToggle(this);">Turn Off</a></li>';
	else builtMenu += '<li><a href="javascript:void(0);"onclick="shindig.container.getGadget('+this.id + ').handleToggle(this);">Turn On</a></li>';
	if (isUserPrefURLExists && this.hasUserPrefs) {
		builtMenu += '<li><a href="javascript:void(0);" onclick="shindig.container.getGadget('+this.id+').handleOpenUserPrefsDialog();">Edit preferences</a></li>';
	}
	if(isGadgetRemoveURLExists) {
		builtMenu += '<li><a href="#" onclick="shindig.container.getGadget(' + this.id + ').handleRemove();return false;">Remove</a></li>';
	}
	builtMenu += '<li><a href="javascript:void(0);" onclick="openAboutPage(\''+aboutAppLink+'\',\''+failureStatus+'\',\''+this.sciverseId_+'\',\''+this.gadgetName+'\',\''+this.location+'\');shindig.container.getGadget(' + this.id + ').togglesubmenu();" >About this app</a></li>';
	controlEle.html(builtMenu);
	controlEle.css({'top':Number(parentPos.top+10)+'px','left':Number(parentPos.left-controlEle.outerWidth()-5)+'px'});
     var isQuirk =checkCompliance();  
	if(isQuirk=='Quirks'&& truncateURL ){	
	var liPos = jQuery(liEle[0]).position();
	controlEle.css('left',Number(liPos.left-controlEle.outerWidth()-5)+'px');		
	}   
	jQuery(subMenuIdBuf).unbind("clickoutside");
	submenuID='#sb-'+this.getUserPrefsDialogId();
	if(submenuID1 !== submenuID){
	jQuery(submenuID1).hide(); 
	}
	submenuID1='#sb-'+this.getUserPrefsDialogId();
	subMenuIdBuf = "#button-"+this.getUserPrefsDialogId();
	
	jQuery("#button-"+this.getUserPrefsDialogId()).bind( "clickoutside", function(event){
	
	jQuery(submenuID1).hide(); 
});
	 
};




/* function to hide.unhide options dropdown menu in titlebar*/
shindig.SciverseGadget.prototype.togglesubmenu = function() {
	jQuery('#sb-'+this.getUserPrefsDialogId()).toggle();	
};



shindig.SciverseGadget.prototype.getUserPrefs = function() {
  return this.userPrefs;
};


shindig.SciverseGadget.prototype.resizeUserPrefsDialog = function(){
	var id = this.getUserPrefsDialogId();

	jQuery("#"+id).css('width', '100%');
	jQuery("#"+id).css('height', '100%');
};

/*
 *This function loads the user preferences
 * by creating a HTML element on the basis 
 * of user preferences supplied to the gadget
 */
shindig.SciverseGadget.prototype.handleOpenUserPrefsDialog = function() {
	
    var gadget = this;
	terms = new Array();
    var igCallbackName = 'ig_callback_' + this.id;	
    window[igCallbackName] = function(userPrefsDialogContent) {
      gadget.userPrefsDialogContentLoaded = true;	 
      gadget.buildUserPrefsDialog(userPrefsDialogContent);
      gadget.showUserPrefsDialog();
         };

	var script = document.createElement('script');

	script.src = sciverseObj.smapiVars.gadgetPrefDialogboxURL+'?mid=' + this.id +
        '&output=js' + this.getUserPrefsParams() +  '&url=' + this.specUrl;
      
    document.body.appendChild(script);
    if (this.closed_){shindig.container.getGadget(this.id).handleToggle(this);}
    else{jQuery('#sb-'+this.getUserPrefsDialogId()).toggle();}
    //jQuery('#sb-'+this.getUserPrefsDialogId()).toggle();
    ajaxKeyEventLog(this.title,'editGadgetPreferences',this.sciverseId_,'editPreferences','','SubmitAction',false,'','',this.location);
};

function removeItemsFromList(removeID) {
    jQuery('#' + removeID).remove();
}

function addItemsToList(id) {
    var element = document.getElementById(id).value;

    terms.push(element);
    var newListItem = document.createElement("li");
    //newdiv.id = 'listPref_' + id;
    //var listId = newdiv.id;
	//newdiv.innerHTML = element + "<input type=\"button\" name=remove value=remove onclick=removeItemsFromList(\"" + listId + "\")>";
	newListItem.innerHTML = '<li style="margin-left:20px;">'+element+'</li>';
    var container = document.getElementById("listItemsUL");
    container.appendChild(newListItem);
};

/*
 *This function saves the user preferences
 * by creating a HTML element on the basis 
 * of user preferences supplied to the gadget
 */
shindig.SciverseGadget.prototype.handleSaveUserPrefs = function() {
   jQuery('#'+this.getUserPrefsDialogId()).slideToggle();
  var numFields = document.getElementById('m_' + this.id +
      '_numfields').value;
    
  for (var i = 0; i < numFields; i++) {
    var input = document.getElementById('m_' + this.id + '_' + i);
    var userPrefNamePrefix = 'm_' + this.id + '_up_';
    var userPrefName = input.name.substring(userPrefNamePrefix.length);
    var userPrefValue = input.value;
    if (typeof(this.userPrefs[userPrefName]) == 'undefined' && userPrefName.indexOf('list') < 0 ){
    	var o = new Object();
    	o.name = userPrefName;
    	o.value = userPrefValue;
    	this.userPrefs[userPrefName] = o;
    }  else {
		if(userPrefName.indexOf('list') > 0) {
			var userPref = userPrefName.substring(0,userPrefName.indexOf('_list'));
			if(typeof(this.userPrefs[userPref]) != 'undefined') {
				var lastSavedPrefs = new Array();			
				lastSavedPrefs.push(this.userPrefs[userPref].value);
				for(var k=0;k<terms.length;k++) {
					lastSavedPrefs.push(terms[k]);
				}
				this.userPrefs[userPref].value = lastSavedPrefs;	   		
			} else {
				var prefs = new Array();
				for(var k=0;k<terms.length;k++) {
					prefs.push(terms[k]);
				}
				this.userPrefs[userPref].value = prefs;
			}
	   	}	  	
	  	else if(input.type == 'checkbox') {
	    	this.userPrefs[userPrefName].value = input.checked;
    	}
    	else if(input.type == 'text' || input.type == 'hidden' || input.type == 'select-one') {
	   		this.userPrefs[userPrefName].value = userPrefValue;    
	   	}
   	}
  }
  this.saveUserPrefs();
  this.refresh();
};

shindig.DefaultUserPrefStore.prototype.getPrefs = function (gadget) {};

/*
 * This function calls the user preference action 
 * bean and saves the user preferences, 
 * entered by the user in session.
 */
shindig.DefaultUserPrefStore.prototype.savePrefs = function(gadget) { 
	var reqPrefs=gadgets.json.stringify(gadget.userPrefs);
	
	var eventName = 'saveGadgetPreferences';
	var zone = gadget.location;
	var failureStatus = false;
	
	var req="userPreferences="+reqPrefs+"&";
	req+="location="+gadget.location+"&";
	req+="originPage="+sciverseObj.contextInfo.pageType+"&";
	req+="gadgetDefinition="+gadget.specUrl+"&";
	req+="eventName="+eventName+"&";
	req+="gadgetId="+gadget.sciverseId_+"&";
	req+="gadgetName="+gadget.title+"&";
	req+="zone="+zone+"&";
	req+="pageName="+sciverseObj.contextInfo.pageType+"&";
	req+="failureStatus="+failureStatus+"&";
	req+="isKeyEventURLAvailble="+isKeyEventURLExists;
	if(isUserPrefURLExists){
		jQuery.ajax({
					type: 'GET',
					url: sciverseObj.smapiVars.gadgetUserPrefsURL+"?",
					async: true,
					data: req});
	}
};

/*
 * This function is called when the user 
 * selects to remove the gadget from his 
 * profile
 */
shindig.SciverseGadget.prototype.handleRemove = function() {
	if(this.removable){
		var answer = confirm("Are you sure that you want to permanently delete this application?");
		if(answer){
 			jQuery('#'+this.location+'_'+this.sciverseId_).remove();
 			if(toolbarOrientation=='vertical'){
	var toolbarHeight = parseInt(jQuery('#sciverse_toolbar').height()-7);
	jQuery('#toggleImg').css('height',toolbarHeight+'px' );
	}
 			this.removeFromCSAS();
		}
		else{ 
			jQuery('#sb-'+this.getUserPrefsDialogId()).toggle();
		}
	}
	else{
		alert("You cannot remove this application. It is provided for you by SciVerse or your institution.")
		jQuery('#sb-'+this.getUserPrefsDialogId()).toggle();
	}
};
/*
 * This function is called within the handleRemove() function
 * when user selects to remove the gadget from his 
 * profile . It makes an ajax call to GadgetStateActionBean to remove
 * this gadget from the user's profile
 */
shindig.SciverseGadget.prototype.removeFromCSAS = function() {
	var pageName=sciverseObj.contextInfo.pageType;
	var eventName = 'removeGadget';
	var keyEventType = 'SubmitAction';
	var zone = this.location;
	var failureStatus = false;
	var req="gadgetId="+this.sciverseId_+"&"+"moduleName="+this.title+"&"+"eventName="+eventName+"&"+"location="+this.location;
		req+="&"+"zone="+zone+"&"+"keyEventType="+keyEventType+"&"+"failureStatus="+failureStatus+"&"+"isKeyEventURLAvailble="+isKeyEventURLExists+"&"+"pageName="+pageName;
	
	jQuery.ajax({
				type: 'GET',
				url: sciverseObj.smapiVars.removeGadgetURL +"?",
				async: true,
				data: req});
};

/*shindig.SciverseGadget.prototype.showGadgetInView = function(view, url, chrome, location){	
		shindig.container.renderGadget(this, view, url, chrome, location);
};*/

shindig.SciverseGadget.prototype.openCanvasView = function(viewParams){

    var canvasDiv = document.createElement('div');
    canvasDiv.id='canvas';
   
    jQuery('#'+sciverseObj.contextInfo.pageContentDivTagName).parent().prepend('<div id=canvas></div><div class="clear"></div>');
  

    shindig.container.layoutManager = new shindig.FloatLeftLayoutManager(canvasDiv.id);	
	var canvasGadget = shindig.container.createGadget({specUrl: this.specUrl, title: this.title ,userPrefs:this.userPrefs, requiresPubSub2:this.requiresPubSub2});
	canvasGadget.sciverseId_ = this.sciverseId_;
	canvasGadget.closed_ = this.closed_;	
	canvasGadget.location = this.location;
	canvasGadget.iconURL =(this.iconURL==null||this.iconURL=='') ? gadgetIconPath+'/netbase.gif' : this.iconURL;

	shindig.container.addGadget(canvasGadget);
	canvasGadget.prepareGadgetForView('canvas', canvasDiv, viewParams); 
	ajaxKeyEventLog('gadget', 'openCanvas', this.sciverseId_, '', '',
			'SubmitAction', false,'','',this.location);
};

shindig.SciverseGadget.prototype.prepareGadgetForView = function(view, chrome, viewParams) {;
	var url = this.getIframeUrl();
	url = buildViewUrl(url, view, viewParams);
	//this.showGadgetInView(view, url, chrome);
	shindig.container.renderGadget(this, view, url, chrome, location);  

};
/*Function to restore the canvas view*/
shindig.SciverseGadget.prototype.closeCanvas = function(imgObject) {
	var isImg = false;
 var keyEventType = 'SubmitAction';
 var eventName = '';
 var failureStatus = false;
 if (jQuery(imgObject).children()[0] != null && jQuery(imgObject).children()[0].tagName == 'IMG') isImg = true;
	if(isImg){eventName='closeCanvas';}
	else{eventName='openCanvas';}
	jQuery("#canvas").children().remove();
	jQuery("#canvas").remove();
	jQuery('#'+sciverseObj.contextInfo.pageContentDivTagName).show();
	
	
	
	if( jQuery('#sb-'+this.getUserPrefsDialogId()).css('display')=='block')jQuery('#sb-'+this.getUserPrefsDialogId()).toggle();
	ajaxKeyEventLog(this.title,eventName,this.sciverseId_,'landingPage','',keyEventType,failureStatus,'','',this.location);

}

/* utility function to build the view url*/
function buildViewUrl(url, view, opt_params){

  var prevView = getUrlParam("view", url);
  if (prevView) {
    var url = url.replace("view=" + prevView, "view=" + view);
  } else {
    url += '&view=' + encodeURIComponent(view);
  }

  if (opt_params) {
    var paramStr = gadgets.json.stringify(opt_params);
    if (paramStr.length > 0) {
      url += '&view-params=' + encodeURIComponent(paramStr);
    }
  }
	return url;
};

/**
 * Simple utility function to get a URL param
 */
function getUrlParam(name, url) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    if (results == null) {
        return "";
    } else {
        return results[1];
    }
};

var canvasUrl = '';
/*Function to load the canvas view */
shindig.SciverseGadget.prototype.getCanvasContent = function(url, continuation) {
	canvasUrl = url;
  shindig.callAsyncAndJoin([
      this.getCanvasTitleBarContent, this.getCanvasMainContent], function(results) {
        continuation(results.join(''));
      }, this);
};

/*Function to load the titlebar of the gadget in  canvas view */
shindig.SciverseGadget.prototype.getCanvasTitleBarContent = function (continuation) {
    if (this.includeChrome == false) {
        continuation('');
        return;
    }
    var gtitle;
    if (this.title) gtitle = this.title;
    else gtitle = 'title';
    var content = '<div id="footer' + this.cssClassTitleBar + '-' + this.id + '" class="curveBoxRight boxYellow" >';
    content += '<img src="' + this.iconURL + '"  border="none" class="headingGadgetIcon" title="' + this.title + '">';
    content += '<h3 id="GadgetName' + this.id + '" class="elsevierTimeLOver">' + gtitle + '</h3>' + '<div class="CanvasControls">' + '<ul>';
    content += '<li> <a href="javascript:void(0);" onclick="shindig.container.getGadget(' + this.id + ').closeCanvas(this);"><img id="img_' + this.id + '" style="border: 0px;" src="' + gadgetIconPath + '/restore.gif" title="Minimize this application"/></a></li>';
    content += '</ul>';
    content += '</div>';
    content += '<div class="clear"></div>';
    content += '</div>';
    continuation(content);
};

/*Function to load the main content of the gadget in  canvas view */
//shindig.SciverseGadget.prototype.getCanvasMainContent = function(continuation) {
shindig.IfrGadget.getCanvasMainContent = function(continuation) {
  var iframeId = this.getIframeId();
  var aboutAppLink=sciverseObj.smapiVars.gadgetDetailPage+"?appId="+this.sciverseId_;
  var content='<div id="maincont'+iframeId+'" class="containerAppDetailsCanvas" style="height:100%"';//vinay
      content+=(this.height ? ' style="height: '+this.height+'px;"' : '') +
      '><iframe id="'+iframeId+'" onload="sgf.killTimer(\'canvas\', \'canvas\')" name="'+iframeId+'" class="'+this.cssClassGadget +
      '" src="'+ canvasUrl +
      '" frameborder="no" scrolling="auto" height="100%" width="100%"></iframe>';//vinay
	content+='</div>';  
    continuation(content);

  gadgets.rpc.setRelayUrl(iframeId, this.serverBase_ + this.rpcRelay);
  gadgets.rpc.setAuthToken(iframeId, this.rpcToken);
};

/*This function calls the getCanvasContent function to load canvas view */
shindig.SciverseGadget.prototype.renderCanvas = function(url){
    this.getCanvasContent(url, function(content) {
      jQuery('#canvas').html(content);
     // if (canvasGadget.requiresPubSub2 == true)canvasGadget.finishRender(url); //vinay
      
    });
       if (this.requiresPubSub2 == true)this.finishRender(url); //vinay
};

/*Function to load the ICSResults view */
shindig.SciverseGadget.prototype.renderResultsView = function(chrome, url){
	this.getResultsViewContent(url, chrome, function(content) {
		chrome.innerHTML = content;
		//if (this.requiresPubSub2 == true) resultsViewGadget.finishRender(url);//vinay
	});
	if (this.requiresPubSub2 == true) this.finishRender(url);//vinay
};
/*This function gets called withing the renderResultsView function to load ICSResults view */
shindig.SciverseGadget.prototype.getResultsViewContent = function(url, chrome, continuation) {
  this.resultsViewUrl = url;
  this.resultsViewChrome = chrome;
  var iframeId = this.getIframeId();
  gadgets.rpc.setRelayUrl(iframeId, this.serverBase_ + this.rpcRelay);
  gadgets.rpc.setAuthToken(iframeId, this.rpcToken);  
  shindig.callAsyncAndJoin([this.getResultsViewTitleBarContent, this.getResultsViewMainContent], 
  		function(results) {
        	continuation(results.join(''));
      	}, this);
};
/*Function to load the titlebar of the gadget in  ICSResults view */
shindig.SciverseGadget.prototype.getResultsViewTitleBarContent = function(continuation) {
	var gtitle;
	  if (this.title) gtitle = this.title;
	  else gtitle = 'title';
	var content='';
	continuation(content);          
};

/*Function to load the maincontent of the gadget in  ICSResults view */
//shindig.SciverseGadget.prototype.getResultsViewMainContent = function(continuation) {
shindig.IfrGadget.getResultsViewMainContent = function(continuation) {
	var iframeId = this.getIframeId();//vinay
	  var content='';
	content += '<div id="mainCon' + iframeId +'" class="containerAppDetailsRes"  > ';//vinay
	content += '<iframe id="'+this.getIframeId()+'" onload="sgf.killTimer(\''+this.sciverseId_+'\', \''+this.location+'\');" name="'+this.getIframeId()+'"  src="'+ this.resultsViewUrl +
		'" frameborder="no" scrolling="auto" width="100%"></iframe></div>';
	content+='</div>';
	continuation(content);
};
	
/*Function to close the gadget in ICSResults view */
shindig.SciverseGadget.prototype.closeResultView = function(){
	jQuery('#footer_res_gadgets-gadget-title-bar-'+this.id).parent().remove();
};

/*Changes for AMP11-1: Hoover*/
 
 /*function to render gadget in hoover view. */
shindig.SciverseGadget.prototype.renderHooverView = function(chrome, url){
	this.getHooverViewContent(url, chrome, function(content) {
		chrome.innerHTML = content;
	});
};
/* function to get hoover view content from different content functions and merge the content in one div  */
shindig.SciverseGadget.prototype.getHooverViewContent = function(url, chrome, continuation) {
  this.resultsViewUrl = url;
  this.resultsViewChrome = chrome;
  var iframeId = this.getIframeId();
  gadgets.rpc.setRelayUrl(iframeId, this.serverBase_ + this.rpcRelay);
  gadgets.rpc.setAuthToken(iframeId, this.rpcToken);  
  shindig.callAsyncAndJoin([this.getHooverViewTitleBarContent, this.getHooverViewMainContent], 
  		function(results) {
        	continuation(results.join(''));
      	}, this);
};
/*function to get hoover view titlebar content */
shindig.SciverseGadget.prototype.getHooverViewTitleBarContent = function (continuation) {
    var content = '<div id="hoover' + '-' + this.id + '" class="boxYellow curveBoxleftNormal hooverTitle" style="cursor: move;">';
    content += '<img src="' + this.iconURL + '"  border="none" class="headingGadgetIcon" title="' + this.title + '">';
    content += '<h3 id="GadgetName' + this.id + '" class="elsevierTimeLOver">' + this.title + '</h3>' + '<div  class="Controls" align="right">' + '<ul  class="menu">';
    content += '<li> <a href="javascript:shindig.container.getGadget(' + this.id + ').togglePin();"><img id="pin_' + this.id + '" src="'+gadgetIconPath+'/pin-up-off.gif" title="Pin" /></a></li>';
    content += '<li> <a href=javascript:shindig.container.getGadget(' + this.id + ').closeHooverView();><img  src="'+gadgetIconPath+'/close_hoover.gif" title="Close" /></a></li>';
    content += '</ul>';
    content += '</div>';
    content += '</div>';
    continuation(content);
};
/*function to get hoover view main content */
shindig.SciverseGadget.prototype.getHooverViewMainContent = function(continuation) {  
  continuation('<div id="hoover_frameDiv_'+this.id+'" class="containerAppDetails" >' +     
      '<iframe id="'+this.getIframeId()+'" onload="sgf.killTimer(\''+this.sciverseId_+'\', \''+this.location+'\');" name="'+this.getIframeId()+'" class="'+this.cssClassGadget +
      '" src="'+ this.resultsViewUrl +
      '" frameborder="no" scrolling="auto" width="100%" height="'+this.height+'"></iframe></div>');
};
/*function to close hoover view */
shindig.SciverseGadget.prototype.closeHooverView = function(){
	jQuery('#hoover-'+this.id).parent().remove();
};
/* function to pin hoover gadget to the viewport */
shindig.SciverseGadget.prototype.togglePin = function() {
	var chromeId = jQuery('#'+this.getIframeId()).parent().parent().attr('id');	
	var hooverDiv =document.getElementById(chromeId);
	var adjustedScrollHeight;
	var browserMode;
	
	if (jQuery('#'+chromeId).css('position') == 'absolute') {
		jQuery('#'+chromeId).css('position', 'fixed');
		// adjust hoover div's top attribute as it's position is being changed from absolute to fixed
		adjustedScrollHeight=parseInt(hooverDiv.style.top,10)-jQuery(window).scrollTop();
		adjustedScrollHeight+="px";
		jQuery('#pin_'+this.id).attr('src', gadgetIconPath+'/pin-dn-off.gif');
		jQuery('#pin_'+this.id).attr('title', 'Un-pin');
		this.pinPosition = 'fixed';	
		browserMode = checkCompliance();
		if(browserMode == "Quirks"){
		if(jQuery('#'+chromeId).attr('lang') == ""){
		//jQuery('#'+chromeId).attr('class', hooverDiv.style.top)
		jQuery('#'+chromeId).css('position', 'absolute');
		jQuery('#'+chromeId).attr('lang',adjustedScrollHeight);
		jQuery(window).scroll(function () {
			var topBuf = jQuery('#'+chromeId).attr('lang');
			var lang = topBuf.substring(0,topBuf.length-2);
			var top = jQuery(document).scrollTop()+Number(lang);
		    jQuery("#"+chromeId).css("top", top+"px"); 
		    });
		    }else{
		         //var topReset =  jQuery('#'+chromeId).attr('class');
		         jQuery('#pin_'+this.id).attr('src', gadgetIconPath+'/pin-up-off.gif');
				 jQuery('#pin_'+this.id).attr('title', 'Pin');
		    	 jQuery(window).unbind("scroll");
		    	 jQuery('#'+chromeId).css('position', 'absolute');
		    	// jQuery('#'+chromeId).css('top',topReset);
		    	 jQuery('#'+chromeId).attr('lang',"");
		    	 this.pinPosition = 'absolute';
		     }
		  }else{
		      jQuery('#'+chromeId).css('top',adjustedScrollHeight);
		     }		
			
		// change pin image to unpin
		
	  }else{
	    browserMode = checkCompliance();	
		jQuery('#'+chromeId).css('position', 'absolute');
		// re-adjust hoover div's top attribute as it's position is being changed from fixed  to absolute
		adjustedScrollHeight=parseInt(hooverDiv.style.top,10)+jQuery(window).scrollTop();
		adjustedScrollHeight+="px";
		jQuery('#'+chromeId).css('top',adjustedScrollHeight);
		this.pinPosition = 'absolute';
		jQuery('#pin_'+this.id).attr('src', gadgetIconPath+'/pin-up-off.gif');
		jQuery('#pin_'+this.id).attr('title', 'Pin');		
	}
};
/*Changes for AMP11-1:Hoover end here */

/*Function to log the messages in debug mode*/
function log(gid, location, text){
	if (debug) {
		jQuery('#'+location+ '_debug_'+gid).append('\n<br>' + text+ "->" + calculateUTCTime());			
	}
};

  function calculateUTCTime() {
	var utcDateTime;
	var d = new Date();
	var utcDate = d.getUTCDate();
	var utcMonth = d.getUTCMonth();
	var utcYear = d.getUTCFullYear();
	var utcHour = d.getUTCHours();
	var utcMin = d.getUTCMinutes();
	var utcSec = d.getUTCSeconds();
	var utcMsc = d.getUTCMilliseconds();
	utcDateTime = utcDate + "-" + utcMonth + "-" + utcYear + " ";
	var a_p = "AM";
	if (utcHour == 0) {
		utcHour = 12;
	}
	if (utcHour > 12) {
		utcHour = utcHour - 12;
		a_p = "PM"
	}
	utcMin = utcMin + "";
	if (utcMin.length == 1) {
		utcMin = "0" + utcMin;
	}
	utcSec = utcSec + "";
	if (utcSec.length == 1) {
		utcSec = "0" + utcSec;
	}
	utcDateTime += utcHour + ":" + utcMin + ":" + utcSec + ":" + utcMsc + " "
			+ a_p;
	return utcDateTime;
};

/* Code changes for EMBAPP Starts - 12/02/2010 */

/** 
* This is overridden method of shindig container's getIframeURL().
* This method is used to truncate the iFrameURL max length to 2083 
* if the browser is Internet Explorer only.
* @author: RamaKrishna 
*/
shindig.IfrGadget.getIframeUrl = function() {
	//Add the required parameters of Gadget FrameURL to iframeURL
	var iframeURL = this.serverBase_ + 'ifr?' +
	      'container=' + this.CONTAINER +
	      '&mid=' +  this.id +
	      '&nocache=' + shindig.container.nocache_ +
	      '&country=' + shindig.container.country_ +
	      '&lang=' + shindig.container.language_ +
	      '&view=' + shindig.container.view_ +
	      (this.specVersion ? '&v=' + this.specVersion : '') +
	      (shindig.container.parentUrl_ ? '&parent=' + encodeURIComponent(shindig.container.parentUrl_) : '') +
	      (this.debug ? '&debug=1' : '')+this.getAdditionalParams() ;
	      
	  	  
	      
	  //If the browser is IE, then truncateURL value is true. 
	  //This block of code limits the iFrameURL max length as 2083 
      if(truncateURL) {
			var isURLTruncated = false;
			for(var name in this.getUserPrefs()) {
				var params = '';
				params += '&up_' + encodeURIComponent(name) + '=' +
				    encodeURIComponent(this.getUserPrefValue(name));
				 //2083 is the max length of iFrameURL. 
				 //If the URL is truncated we will have add 'urlMgld=y' to the iFrame URL.
				 //This is 9 characters. So we are verifying for 2074 characters
				 if((iframeURL+params).length < 2074){
				 	iframeURL += params;
				 } else {
				 	isURLTruncated = true;	
				 }
			}
			if(isURLTruncated) {      
			    iframeURL += '&urlMgld=y';  
			}
	} else {
		// If the browser is other than IE, container directly adds all
		// the user prefrences using the default method.
		iframeURL += this.getUserPrefsParams();
	}
	
	iframeURL +=(this.secureToken ? '&st=' + this.secureToken : '') +
	      '&url=' + encodeURIComponent(this.specUrl) +
	      '#rpctoken=' + this.rpcToken +
	      (this.viewParams ?
	          '&view-params=' +  encodeURIComponent(gadgets.json.stringify(this.viewParams)) : '') +
	      (this.hashData ? '&' + this.hashData : '');
return  iframeURL;     
};
/* Code changes for EMBAPP Ends - 12/02/2010 */

//vinay-begin

// ---------
// OAAIfrGadget

shindig.OAAIfrGadget = {
  getMainContent: function(continuation) {
  //alert("OAAIfrGadget.getMainContent");
    //continuation('<div id="' + this.cssClassGadgetContent + '-' + this.id + '" class="' + this.cssClassGadgetContent + '"></div>');
    continuation('<div id="maincont' + this.getIframeId() + '" class="containerAppDetails"></div>');
    
    sgf.killTimer(this.sciverseId_, this.location);
  },
  getCanvasMainContent: function(continuation) {
    continuation('<div id="maincont' + this.getIframeId() + '" class="containerAppDetails"></div>');
    
    sgf.killTimer("canvas", "canvas");
	},
  getResultsViewMainContent: function(continuation) {
  	continuation('<div id="maincont' + this.getIframeId() + '" class="containerAppDetailsRes"></div>');
	    
	sgf.killTimer(this.sciverseId_, this.location);
  },  
  getHooverViewMainContent: function(continuation) {  
    continuation('<div id="maincont' + this.getIframeId() + '" class="box appText"></div>');
    
    sgf.killTimer(this.sciverseId_, this.location);
  },  
  finishRender: function(url) {
  //alert("finishRender url: " + url);
    var iframeAttrs = {
      className: this.cssClassGadget,
      frameborder: "no",
      scrolling: "auto"
    };

    if (this.height) {
      iframeAttrs.height = this.height;
    }else {
    	iframeAttrs.height = 150;
    }
    if (this.width) {
      iframeAttrs.width = this.width;
    }
  	    
    //debugger;
    /*gadgets.pubsub2router.init({onSubscribe: function(){return true;},
    							onPublish: function(){return true;}});*/

   iframeContainer = new OpenAjax.hub.IframeContainer(
      gadgets.pubsub2router.hub,
      this.getIframeId(),
      {
        Container: {
          onSecurityAlert: function( source, alertType) {
          		//alert("Security error for container " + source.getClientID() + " : " + alertType);
                gadgets.error("Security error for container " + source.getClientID() + " : " + alertType);
                //source.getIframe().src = "about:blank"; 
// for debugging
             },
             onConnect: function( container ) {
   //            gadgets.log("++ connected: " + container.getClientID());
   				//alert("++ connected: " + container.getClientID());
            }
        },
        IframeContainer: {
          //parent: document.getElementById(this.cssClassGadgetContent + '-' + this.id),
          parent: document.getElementById("maincont"+this.getIframeId()),
          //uri: this.getIframeUrl(),
          uri: url ? url : this.getIframeUrl(),
          tunnelURI: shindig.uri(this.serverBase_ + this.rpcRelay).resolve(shindig.uri(window.location.href)),
          iframeAttrs: iframeAttrs
        }
      }
    );
    var iframeId = iframeContainer.getIframe().id;
    //alert("oaa iframe id = " + iframeId);
    return iframeId;
  },
  
  getIframeUrl: function() {
    furl = this.serverBase_ + 'ifr?' +
        'container=' + this.CONTAINER +
        '&mid=' +  this.id +
        '&nocache=' + shindig.container.nocache_ +
        '&country=' + shindig.container.country_ +
        '&lang=' + shindig.container.language_ +
        '&view=' + shindig.container.view_ +
        (this.specVersion ? '&v=' + this.specVersion : '') +
        (shindig.container.parentUrl_ ? '&parent=' + encodeURIComponent(shindig.container.parentUrl_) : '') +
        (this.debug ? '&debug=1' : '') +
        this.getAdditionalParams() +
        this.getUserPrefsParams() +
        (this.secureToken ? '&st=' + this.secureToken : '') +
        '&url=' + encodeURIComponent(this.specUrl) +
        '#rpctoken=' + this.rpcToken +
        (this.viewParams ?
            '&view-params=' +  encodeURIComponent(gadgets.json.stringify(this.viewParams)) : '') +
//        (this.hashData ? '&' + this.hashData : '');
        (this.hashData ? '#' + this.hashData : '');
        //alert("pubsub2 frame url: " + furl);
        return furl;
  }
};
//vinay-end
function checkCompliance(){
		var browserMode=document.compatMode;
		var modeBuffer = "";
		if(browserMode){
		if(browserMode=='BackCompat'){
		modeBuffer='Quirks';
		}else if(browserMode=='CSS1Compat'){
		modeBuffer='Standards Compliance';
		}
		return modeBuffer;
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