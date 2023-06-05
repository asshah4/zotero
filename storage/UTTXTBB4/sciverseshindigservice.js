/*******************************************************************************
This JavaScript File contains the Sciverse APIs . Gadgets can interact with the 
container through these APIs and request information about the page 
 ******************************************************************************/
shindig.SciverseService = function() {
	shindig.IfrGadgetService.call(this);

	gadgets.rpc.register('invokeResultsView', this.invokeResultsView);
	gadgets.rpc.register('getContextInfo', this.getContextInfo);
	gadgets.rpc.register('getAllResults', this.getAllResults);
	gadgets.rpc.register('getResults', this.getResults);
	gadgets.rpc.register('set_pref', this.setUserPref); 
	gadgets.rpc.register('getArticleContent', this.getArticleContent);
	gadgets.rpc.register('getPageUrl', this.getPageUrl);
	
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


/* service to set the user preference from within the gadget*/
shindig.SciverseService.prototype.setUserPref = function(editToken, name,
    value) {
  var id = shindig.container.gadgetService.getGadgetIdFromModuleId(this.f);
  var gadget = shindig.container.getGadget(id);
  
  if (this.userPrefs == null) this.userPrefs = {};
  for (var i = 1, j = arguments.length; i < j; i += 2) {
  	if (typeof(this.userPrefs[arguments[i]]) == 'undefined'){
  		var o = new Object();
  		o.name = arguments[i].name;
  		o.value = arguments[i+1];
  		this.userPrefs[arguments[i]] = o;
  	}else {
    	this.userPrefs[arguments[i]].value = arguments[i + 1];
    }
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
		userPrefs:this.userPrefs
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

shindig.IfrContainer.prototype.SciverseService = new shindig.SciverseService();

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
