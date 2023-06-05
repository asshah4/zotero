_satellite.pushAsyncScript(function(event, target, $variables){
  // mmsDTM - global namespace for all MMS related
window.mmsDTM = window.mmsDTM || {};
window.mmsDTM.mmsLayers = window.mmsDTM.mmsLayers || {};

// Load iPerception Function
window.mmsDTM.mmsLayers.loadiPerception = function() {
  /*Copyright 2011-2015 iPerceptions, Inc. All rights reserved. Do not distribute.iPerceptions provides this code 'as is' without warranty of any kind, either express or implied. */
  window.iperceptionskey = '40fb54c8-c3ce-4e1f-88e3-81c9253bf527';
  (function () {
    var a = document.createElement('script'),
        b = document.getElementsByTagName('body')[0];
    a.type = 'text/javascript';
    a.async = true;
    a.src = '//universal.iperceptions.com/wrapper.js';
    b.appendChild(a);
  })();
};

// NEJM Mobile - Load iPerception all the time
if (_satellite.getVar('pageViewType') === 'mobile') {
  window.mmsDTM.mmsLayers.loadiPerception();
}

});
