_satellite.pushAsyncScript(function(event, target, $variables){
  var nejmID = _satellite.getVar('userID');

var aam_dpid;
if ( _satellite.configurationSettings.settings.isStaging ) {
  aam_dpid = '19784';
} else {
  aam_dpid = '20839';
}
if(nejmID){
//	document.write('<script src="//mmsngaa.demdex.net/event?d_dpid=19784&dpuuid=nejmID></script>');
  var aam_sync = document.createElement("IMG");
  aam_sync.style.width = "0px";
  aam_sync.style.height = "0px";
  aam_sync.src = "http://mmsngaa.demdex.net/event?d_dpid="+aam_dpid+"&d_dpuuid="+nejmID;
  document.body.appendChild(aam_sync);

}
var jwatchID = _satellite.getVar('jwUserIDInUrl'); 
var aam_dpid;
if ( _satellite.configurationSettings.settings.isStaging ) {
  aam_dpid = '21013';
} else {
  aam_dpid = '21014';
}

if(jwatchID){
//	document.write('<script src="//mmsngaa.demdex.net/event?d_dpid=19784&dpuuid=nejmID></script>');
  var aam_sync = document.createElement("IMG");
  aam_sync.style.width = "0px";
  aam_sync.style.height = "0px";
  aam_sync.src = "http://mmsngaa.demdex.net/event?d_dpid="+aam_dpid+"&d_dpuuid="+jwatchID;
  document.body.appendChild(aam_sync);

}


});
