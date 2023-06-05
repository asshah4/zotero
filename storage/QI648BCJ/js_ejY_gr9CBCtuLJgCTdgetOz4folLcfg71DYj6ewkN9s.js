/**
 * This function returns the current matching Breakpoint layout using
 * enquire.js. Falls back to legacy Drupal.omega.getCurrentLayout();
 *
 * An example where this is used is the onActivate method for clueTip popups.
 */
 
Drupal.highwireResponsive = Drupal.highwireResponsive || {};
 
(function($) {

  var current = 'mobile';
  var previous = 'mobile';
  var order = [];
  var index = 0;
  var breakpointsReady = false;

  /**
   * Fired when breakpoint matches
   */
  var breakpointMatch = function(key){
    previous = current || 'mobile';
    current = key;
    triggerTransition();
  }

  /**
   * Fired when breakpoint unmatches
   */
  var breakpointUnmatch = function(key){
    previous = key;
    var i = order.indexOf(key);
    current = order[i-1] || 'mobile';
    triggerTransition();
  }

  /**
   * Return the current layout for the page, based on Breakpoint media queries.
   * Fall back to legacy Drupal.omega.getCurrentLayout().
   *
   * @return
   *   A string matching the current breakpoint layout name based on viewport size.
   */
  Drupal.highwireResponsive.getCurrentLayout = function () {
    if (breakpointsReady) {
      return current;
    }
    else if (typeof Drupal.omega != 'undefined') {
      return Drupal.omega.getCurrentLayout(); // See omega-mediaqueries.js in the Omega theme
    }
  };
  
  /**
   * Return previous layout state
   * Fall back to legacy Drupal.omega.getPreviousLayout().
   * 
   * @return
   *  A string matching the previous breakpoint layout name based on viewport size.
   */
  Drupal.highwireResponsive.getPreviousLayout = function () {
    if (breakpointsReady) { 
      return previous;
    }
    else if (typeof Drupal.omega != 'undefined') {
      return Drupal.omega.getPreviousLayout(); // See omega-mediaqueries.js in the Omega theme
    }
  };
  
 /**
  *  This adds responsive body classes, i.e. hw-responsive-layout-narrow 
  *  This also adds a global trigger event which fires on the transition, similar to Omega's resize.responsivelayout event.
  *
  *  // Example
  *  $('body').bind('highwireResponsiveLayoutTransition', function(e, d) {
  *    if(d.from != d.to) {
  *      // Do something when transitioning between any mediaquery state
  *    }
  *  });
  */
  var triggerTransition = function() {
    $('body').removeClass('hw-responsive-layout-' + previous).addClass('hw-responsive-layout-' + current); 
    $.event.trigger('highwireResponsiveLayoutTransition', {from: previous, to: current});
  }

  Drupal.behaviors.highwireResponsiveMediaQueries = {
    attach: function (context, settings) {
      if (typeof Drupal.settings.highwireResponsive != 'undefined' &&  Drupal.settings.highwireResponsive.enquire_enabled === 1 && Drupal.settings.highwireResponsive.breakpoints_configured === 1) {
        if (typeof Drupal.settings.highwireResponsive.breakpoints != 'undefined') {
          breakpointsReady = true;
        }
      }
      /**
       * Setup and register enquire.js callbacks based on breakpoints
       * If Breakpoints are configured but no match is made, this will often return 'mobile'.
       * This is done to support mobile-first design - in practice you shouldn't be
       * defining a "mobile" media query as it should be assumed to be the default.
       */
      if (breakpointsReady) {
        // Breakpoints should be defined in order of smallest to largest
        var breakpoints = Drupal.settings.highwireResponsive.breakpoints;
        $.each(breakpoints, function( key, value ) {
          order[index] = key;
          index++;
          enquire.register(value, {
            match : function() {
              breakpointMatch(key);
            },
            unmatch : function() {
              breakpointUnmatch(key);
            }
          });

        });
        // Trigger transition on initial page load
        $(window).bind('load', function(){
          triggerTransition();
        });
      }
    }
  };

})(jQuery); ;
