/**
 * Highwire Article access indicator
 *
 * Copyright (c) 2010-2011 Board of Trustees, Leland Stanford Jr. University
 * This software is open-source licensed under the GNU Public License Version 2 or later
 * The full license is available in the LICENSE.TXT file at the root of this repository
 */
(function ($) {
  // Store our function as a property of Drupal.behaviors.
  Drupal.behaviors.highwire_article_citation_tooltip = {
    attach: function (context, settings) {
      $('div.highwire-article-citation.tooltip-enable', context).once('highwire_article_citation_tooltip', function() {
        $(this).cluetip({
          onActivate: function(event) {
            // Disable for mobile
            var activate = true;
            if (Drupal.highwireResponsive) {
              var currentLayout = Drupal.highwireResponsive.getCurrentLayout();
              activate = currentLayout !== 'mobile' ? true : false;
            }
            return activate;
          },
          arrows: true,
          cursor: 'pointer',
          sticky: true,
          mouseOutClose: 'both',
          closePosition: 'none',
          positionBy: 'topBottom',
          snapToEdge: true,
          cluetipClass: 'abstract-popup',
          hoverClass: 'abstract-popup-hover',
          dropShadow: false,
          width: 750,
          height: 250,
          onShow: function($cluetip) { 
            var cPath = $(this).children('.highwire-cite').data('cpath');
            $cluetip.find('.highwire-markup').wrap('<a href="'+cPath+'"></a>');
          }
        });
      });
    }
  };
}(jQuery));
;
