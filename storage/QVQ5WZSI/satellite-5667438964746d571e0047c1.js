/*flash_video_receiver JS*/

window.mmsData = window.mmsData || {};
window._sdi = window._sdi || {};
window._sdi.mediaReceiver = function(str) {
  _satellite.notify('mediaReceiver:'+str);  
  if (typeof str === 'string') {      	
        var flashObj = JSON.parse(str),ddFlashEvent;
        window.mmsData.events = window.mmsData.events || [];
        ddFlashEvent = {
            eventInfo: {
                eventName: flashObj.eventName,
                type: 'flash',
                timeStamp: new Date(),
                processed: {
                    googleAnalytics: false,
                    adobeAnalytics: false
                }
            },
            flash: flashObj
        };
        
        window.mmsData.events.push(ddFlashEvent);
        if(window._satellite){ 
          _satellite.notify(flashObj.eventName);
          _satellite.track(flashObj.eventName);
        }
    }
}
window._sdi.mediaEventReader = function(evtName) {
    var i,currEvt;
    if(window.mmsData && window.mmsData.events){
        for (i = 0; i < window.mmsData.events.length; i++){
           currEvt =  window.mmsData.events[i];
            if(currEvt.eventInfo.processed.adobeAnalytics === false && currEvt.eventInfo.eventName === evtName){
                currEvt.eventInfo.processed.adobeAnalytics = true;
                return currEvt.flash;
            }
        }
    }
}
window._sdi.mediaEventTracker = function(evtNum,evtName,so) {
    var eventTarget = evtNum;
    if(window._sdi && window._sdi.mediaEventReader){
        var flashObj = window._sdi.mediaEventReader(evtName);
        if(flashObj){        
            so.events=eventTarget;
            so.linkTrackEvents=eventTarget;
            if(flashObj.mediaTime && typeof flashObj.mediaTime == "number"){
                so.events+=",event62="+Math.round(flashObj.mediaTime);
                so.linkTrackEvents+=",event62";
            }

            so.eVar54 = so.prop48 = flashObj.mediaContent || ''; 
            so.eVar55 = so.prop49 = flashObj.mediaType || '';
            so.eVar56 = so.prop50 = flashObj.mediaScreen || '';
            so.eVar57 = so.prop51 = flashObj.mediaChapter || '';
            so.eVar58 = so.prop52 = flashObj.mediaFormat || '';
            so.eVar60 = so.prop73 = flashObj.mediaId || '';

            so.linkTrackVars="events,eVar54,eVar55,eVar56,eVar57,eVar58,eVar60,prop48,prop49,prop50,prop51,prop52,prop73";
        }
    }
    return so;
}


