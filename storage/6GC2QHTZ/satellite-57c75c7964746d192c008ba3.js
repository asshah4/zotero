if (_satellite.getDataElement('Order - Subtotal')) {
  window.optimizely = window.optimizely || [];
  window.optimizely.push(['trackEvent', 'purchase_complete', {'revenue': parseFloat(_satellite.getDataElement('Order - Subtotal')) * 100}]);
}
