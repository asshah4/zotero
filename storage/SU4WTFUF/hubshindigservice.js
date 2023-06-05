/*******************************************************************************
This JavaScript File contains only ICS related APIs . Gadgets can interact with the 
container through these APIs and request information about the page 
 ******************************************************************************/
shindig.HUBService = function() {
	shindig.IfrGadgetService.call(this);

	gadgets.rpc.register('executeSearch', this.executeSearch);
}
shindig.HUBService.inherits(shindig.IfrGadgetService);

/* 
	ICS Service to execute a new search from a gadget.
	Input Parameters:search query URL ready to be appended to SciverseQueryUrl  
*/

shindig.HUBService.prototype.executeSearch = function(searchConditions) {
	if(typeof(searchConditions) == 'undefined' || searchConditions == null || searchConditions == "") {
		return;
	}	
	var url = sciverseObj.smapiVars.searchQueryURL;
	url+='?st=('+searchConditions+')';
	window.location = url;
};

shindig.IfrContainer.prototype.HUBService = new shindig.HUBService();