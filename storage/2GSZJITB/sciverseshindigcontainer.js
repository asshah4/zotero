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
  shindig.IfrGadget.call(this, opt_params);
  this.setServerBase(sciverseObj.smapiVars.serverBaseURL+"/"); // default tomcat gadget server
  };

shindig.SciverseGadget.inherits(shindig.IfrGadget);
shindig.IfrContainer.prototype.gadgetClass = shindig.SciverseGadget;

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
    debugArea.rows='3';
    debugArea.cols='28';
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
     	startTimer('canvas', 'canvas');
  		gadget.renderCanvas(url);
	    } else if (view == 'sciverseResultsView') {
	  	startTimer(gadget.sciverseId_, gadget.location);
	  	gadget.renderResultsView(chrome, url);
  } else { 
	    var chrome = this.layoutManager.getGadgetChrome(gadget);
	    log(gadget.sciverseId_, gadget.location, 'chrome created'); 
	   	startTimer(gadget.sciverseId_, gadget.location);
	   	log(gadget.sciverseId_, gadget.location, 'timer created');
	  	gadget.render(chrome);
	  	log(gadget.sciverseId_, gadget.location, 'gadget rendered');
	  	log(gadget.sciverseId_, gadget.location, gadgets.json.stringify(sciverseObj.contextInfo));
  }
};
/* This function gets fired just 
 * before the rendergadget call is made*/

function startTimer(chromeid, location){
	if (typeof(timers_) == 'undefined' || timers_ == null){
		timers_ = new Array();
	}
	timers_[location+chromeid] = setTimeout("timeout('"+chromeid+"', '"+ location +"')",sciverseObj.smapiVars.gadgetLoadTimeout);
	
};


/* This function gets fired  
 * inside the startTimer function and prints the time 
 * out message in the gadget chrome
 */
 
function timeout(chromeid, location){
	//return false;
	jQuery('#'+location+'_'+chromeid).remove();
	//jQuery('#pleaseWait').remove();
	if(Toolbarorientation=='vertical'){
	var toolbarHeight = parseInt(jQuery('#sciverse_toolbar').height()-7);
	jQuery('#toggleImg').css('height',toolbarHeight+'px' );}
	log(chromeid,location, 'Gadget timedout while loading.');
}

/* This function gets fired  
 * on gadget onload event
 * and clear the time out
 */

function killTimer(chromeid, location) {
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
    });
  }
};
/* This function renders the gadget's main content in profile view
 */
shindig.SciverseGadget.prototype.getMainContent = function(continuation) {

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
			if(Toolbarorientation.toLowerCase()=='vertical'){
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

   if(this.closed_) { var state='none';}else{state='';}
		content += '<div id="maincont'+iframeId+'" style="display:'+state+' ;" class="containerAppDetails">';
 		 content += '<iframe id="'+iframeId+'"onload="killTimer(\''+this.sciverseId_+'\', \''+this.location+'\');" name="'+iframeId+'"  src="'+(state == "none" ? '' : this.getIframeUrl())+ '"' +
	  ' style=" align: left;text-align: left;"' +
      '" frameborder="no"  scrolling="auto" height="'+height_+'" width="'+iframeWidth+'"' +
          '></iframe>';
    	content+='</div>';  
      gadgets.rpc.setRelayUrl(iframeId, this.serverBase_ + this.rpcRelay);
    
  gadgets.rpc.setAuthToken(iframeId, this.rpcToken);
  log(this.sciverseId_, 'got frame content');
  continuation(content);
};
/* This function renders the gadget's titlebar content in profile view
 */
shindig.SciverseGadget.prototype.getTitleBarContent = function(continuation) {

  if (this.includeChrome == false) {
    continuation('');
    return;
  }
  var gtitle;
  if (this.title) gtitle = this.title;
  else gtitle = 'title';
  
  var content = '';
  var state = gadgetIconPath+'/close.gif';
  var title = 'Close this application';
  var decide;
  var leftEdgeUrl;
  var bodyUrl;
  var rightEdgeUrl;
  var appTitClass;
  if (this.closed_) {
  	state = gadgetIconPath+'/open.gif';
  	title = 'Open this application';
  	decide=true;
  	
  	appheaderClass='boxGrey';
    appTitClass="elsevierTimeL";
  }
  else{
	  decide=false;
	 
	  appheaderClass='boxYellow';	
	  	appTitClass="elsevierTimeLOver";
  }
 
  content+='<div id="footer' + this.cssClassTitleBar + '-' + this.id +'" class="curveBoxleftNormal '+appheaderClass+'" >';
  
  content+='<img src="'+this.iconURL+'"  border="none" class="heading" title="'+this.title+'">';
  content+='<h3 id="GadgetName'+this.id+'" class="'+appTitClass+' truncateTitle">'+gtitle +'</h3>'+
   
      '<div class="Controls">' +'<ul  class="menu">';
 
  content += '<li><a href="javascript:void(0);" id="button-'+this.getUserPrefsDialogId()+'" onclick="shindig.container.getGadget(' + this.id +').openMenuOptions();return false;" ><img style="border: 0;" src="'+gadgetIconPath+'/options.gif"' +
      ' alt="Open/Close Options" title="open options"></a></li>';
 
  content += '<li> <a href="javascript:void(0);" onclick="shindig.container.getGadget('+this.id+').openCanvasView();"><img style="border: 0px;" src="'+gadgetIconPath+'/canvas.gif" title="open application to full-screen mode"/></a></li>';
  content += '<li> <a href="javascript:void(0);" onclick="shindig.container.getGadget('+this.id+').handleToggle(this);"><img id="img_'+this.id+'" style="border: 0px;" src="'+state+'" title="'+title+'"/></a></li>';
  content+='<ul class="submenu" id="sb-'+this.getUserPrefsDialogId()+'"></ul>';
  content += '</ul>' ;
  content += '</div>';
  content += '</div>';	  
  
 
 
 
log(this.sciverseId_, 'got title bar content');

  continuation(content);
};
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
 
  ajaxKeyEventLog(this.title,'cancelGadgetPreferences',this.sciverseId_,'landingPage','','SubmitAction',failureStatus,'','');
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
  var gadgetIframe = document.getElementById(this.getIframeId());
  if (gadgetIframe) {      
    var display = jQuery('#maincont'+this.getIframeId()).css('display');
    if (display == 'none'){
    	if (jQuery('#'+this.getIframeId()).attr('src') == '') {
    		jQuery('#'+this.getIframeId()).attr('src', this.getIframeUrl());
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
 
shindig.SciverseGadget.prototype.saveGadgetState=function(eventName,keyEventType,failureStatus){
var pageName=sciverseObj.contextInfo.pageType;
var f_gadgetOpen='';
if(this.closed_){f_gadgetOpen='N'}
else{f_gadgetOpen='Y'}
var zone = this.location;
var req="gadgetDefinition="+this.specUrl+"&"+"location="+this.location+"&"+"gadgetOpen="+f_gadgetOpen;
	req+="&"+"eventName="+eventName+"&"+"keyEventType="+keyEventType+"&"+"zone="+zone;
	req+="&"+"failureStatus="+failureStatus+"&"+"pageName="+pageName+"&"+"isKeyEventURLAvailble="+isKeyEventURLExists;
	req+="&"+"gadgetId="+this.sciverseId_+"&"+"moduleName=gadget";

jQuery.ajax({
			type: 'GET',
			url: sciverseObj.smapiVars.gadgetStateURL +"?",
			async: true,
			data: req});
			

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
	
	
	jQuery('#'+id).toggle();
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
	jQuery("#"+id).html(builtMenu);

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
    ajaxKeyEventLog(this.title,'editGadgetPreferences',this.sciverseId_,'editPreferences','','SubmitAction',false,'','');
};

function removeItemsFromList(removeID) {
    $('#' + removeID).remove();
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
				for(var i=0;i<terms.length;i++) {
					lastSavedPrefs.push(terms[i]);
				}
				this.userPrefs[userPref].value = lastSavedPrefs;	   		
			} else {
				var prefs = new Array();
				for(var i=0;i<terms.length;i++) {
					prefs.push(terms[i]);
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

shindig.DefaultUserPrefStore.prototype.getPrefs = function(gadget) { 
	
};

/*
 * This function calls the user preference action 
 * bean and saves the user preferences, 
 * entered by the user in session.
 */
shindig.DefaultUserPrefStore.prototype.savePrefs = function(gadget) { 
	var reqPrefs=gadgets.json.stringify(gadget.userPrefs);
	
	var eventName = 'saveGadgetPreferences';
	var zone = sciverseObj.gadgetInfo[0].location;
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
 			if(Toolbarorientation=='vertical'){
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
	var canvasGadget = shindig.container.createGadget({specUrl: this.specUrl, title: this.title ,userPrefs:this.userPrefs});
	canvasGadget.sciverseId_ = this.sciverseId_;
	canvasGadget.closed_ = this.closed_;	
	canvasGadget.location = 'resultsView';
	canvasGadget.iconURL =(this.iconURL==null||this.iconURL=='') ? gadgetIconPath+'/netbase.gif' : this.iconURL;

	shindig.container.addGadget(canvasGadget);
	canvasGadget.prepareGadgetForView('canvas', canvasDiv, viewParams); 
	ajaxKeyEventLog('gadget', 'openCanvas', this.sciverseId_, '', '',
			'SubmitAction', false,'','');
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
	ajaxKeyEventLog(this.title,eventName,this.sciverseId_,'landingPage','',keyEventType,failureStatus,'','');

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
shindig.SciverseGadget.prototype.getCanvasTitleBarContent = function(continuation) {

  if (this.includeChrome == false) {
    continuation('');
    return;
  }
  var gtitle;
  if (this.title) gtitle = this.title;
  else gtitle = 'title';
var content='<div id="footer' + this.cssClassTitleBar + '-' + this.id +'" class="curveBoxRight boxYellow" >';
 
 
   content+='<img src="'+this.iconURL+'"  border="none" class="heading" title="'+this.title+'">';
 
   content+='<h3 id="GadgetName'+this.id+'" class="elsevierTimeLOver">'+gtitle +'</h3>'+
    
       '<div class="CanvasControls">' +'<ul>';
  content += '<li> <a href="javascript:void(0);" onclick="shindig.container.getGadget('+this.id+').closeCanvas(this);"><img id="img_'+this.id+'" style="border: 0px;" src="'+gadgetIconPath+'/restore.gif" title="Minimize this application"/></a></li>';
 
   content += '</ul>' ;
   content += '</div>';
      content += '<div class="clear"></div>';
   content += '</div>';	  
   
  continuation(content);
};

/*Function to load the main content of the gadget in  canvas view */
shindig.SciverseGadget.prototype.getCanvasMainContent = function(continuation) {


  var iframeId = this.getIframeId();
  var aboutAppLink=sciverseObj.smapiVars.gadgetDetailPage+"?appId="+this.sciverseId_;
  

  var content='<div class="containerAppDetailsCanvas" style="height:100%"';
      content+=(this.height ? ' style="height: '+this.height+'px;"' : '') +
      '><iframe id="'+iframeId+'" onload="killTimer(\'canvas\', \'canvas\')" name="'+iframeId+'" class="'+this.cssClassGadget +
     
      '" src="'+ canvasUrl +
      '" frameborder="no" scrolling="no" height="100%" width="100%"></iframe>';
      
    content+='</div>';  
      continuation(content);

  gadgets.rpc.setRelayUrl(iframeId, this.serverBase_ + this.rpcRelay);

  gadgets.rpc.setAuthToken(iframeId, this.rpcToken);
};

/*This function calls the getCanvasContent function to load canvas view */
shindig.SciverseGadget.prototype.renderCanvas = function(url){
    this.getCanvasContent(url, function(content) {
      jQuery('#canvas').html(content);
      
    });
};

/*Function to load the ICSResults view */
shindig.SciverseGadget.prototype.renderResultsView = function(chrome, url){
	this.getResultsViewContent(url, chrome, function(content) {
	
		chrome.innerHTML = content;
	});
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
shindig.SciverseGadget.prototype.getResultsViewMainContent = function(continuation) {
	  var content='';
	content += '<div id="mainCon_Res' + this.cssClassTitleBar + '-' + this.id +'" class="containerAppDetailsRes"  > ';
	content += '<iframe id="'+this.getIframeId()+'" onload="killTimer(\''+this.sciverseId_+'\', \''+this.location+'\');" name="'+this.getIframeId()+'"  src="'+ this.resultsViewUrl +
		'" frameborder="no" scrolling="auto" width="100%"></iframe></div>';
	content+='</div>';
	
	continuation(content);
};
	
/*Function to close the gadget in ICSResults view */
shindig.SciverseGadget.prototype.closeResultView = function(){
	jQuery('#footer_res_gadgets-gadget-title-bar-'+this.id).parent().remove();
};


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