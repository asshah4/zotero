// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (CitationAlertAjaxController == null) var CitationAlertAjaxController = {};
CitationAlertAjaxController._path = '/dwr';
CitationAlertAjaxController.saveCitationAlerts = function(p0, p1, p2, callback) {
	dwr.engine._execute(CitationAlertAjaxController._path, 'CitationAlertAjaxController', 'saveCitationAlerts', p0, p1, p2, callback);
}

function saveCitationAlerts(userId, alertName, alertQuery) {    
	CitationAlertAjaxController.saveCitationAlerts(userId, alertName, alertQuery, setCitationAlertMessage);    
}
