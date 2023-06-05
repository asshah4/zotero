if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (UpsellCollectionsAjaxController == null) var UpsellCollectionsAjaxController = {};
UpsellCollectionsAjaxController._path = '/dwr';
UpsellCollectionsAjaxController.getUpsellCollection = function(p0, callback) {
  dwr.engine._execute(UpsellCollectionsAjaxController._path, 'UpsellCollectionsAjaxController', 'getUpsellCollection', p0, callback);
}

function getUpsellCollection(pii) { 
	
     UpsellCollectionsAjaxController.getUpsellCollection(pii,setpriceCollex);    
}