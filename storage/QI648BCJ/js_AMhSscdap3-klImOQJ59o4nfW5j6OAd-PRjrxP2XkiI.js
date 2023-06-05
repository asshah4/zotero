/**
 * Highwire OpenURL
 *
 * Copyright (c) HighWire Press, Inc
 * This software is open-source licensed under the GNU Public License Version 2
 * or later. The full license is available in the LICENSE.TXT file at the root
 * of this repository.
 */

(function ($) {
  Drupal.behaviors.highwire_openurl = { attach: function (context, settings) {
    if ($('.cit-ref-sprinkles-open-url').length > 0) {
      // Get the insitutional OpenURL branding data
      var id = '';
      if ("apath" in Drupal.settings.highwire) {
        id = '?apath=' + encodeURIComponent(Drupal.settings.highwire.apath);
      }
      $.getJSON(

        Drupal.settings.basePath + 'highwire/openurl_branding' + id,
        function(data){
          if(data){
            // Add to Drupal.settings in case we have another use for it
            Drupal.settings.highwireOpenurl = data;

            // Not all journals have OpenURL implementations
            if (data.base_url === null) {
              $('.cit-ref-sprinkles-open-url').hide();
            }
            else {
              // Update each link to show institutional branding
              $('.cit-ref-sprinkles-open-url').each(function(){
                var $link = $(this);
                $link.once('insertImage', function(){
                  var branding = Drupal.settings.highwireOpenurl;
                  var href = $link.attr('href');
                  var placeholder = '';
                  var queryKey = '';

                  // Check if this is content from old markup server.
                  if (href.indexOf('{openurl}') != -1) {
                    // Set placeholder accordingly.
                    placeholder = '{openurl}';
                    // The href from the old markup server is encoded twice, so decode twice.
                    href = decodeURIComponent(href);
                    href = decodeURIComponent(href);
                  }
                  // Check if this is content from the new markup server.
                  // @see JIRA ticket: GP-86
                  else if (href.indexOf('urn:openurl:') != -1) {
                    // Set placeholdet text and query key accordingly.
                    placeholder = 'urn:openurl:';
                    queryKey = '';
                  }
                  // Update openURL link with new href and text.
                  href = href.replace('?query=','?'); 
                  href = href.replace(placeholder, Drupal.settings.basePath + 'highwire/openurl' + queryKey); 
                  var openurl_link = href + '&redirect_url=' + branding.base_url;
                  $link.attr('href', openurl_link.replace(/\+/g,  " "));
                  $link.text(branding.link_text);
                  if(branding.image){
                    $link.prepend('<img src="' + branding.image + '"/>');
                  }
                });
              });
            }
          }
        }
      );
    }
  }}
})(jQuery);
;
/**
 * @file
 * HW PDF tab treatment.
 *
 * Copyright (c) HighWire Press, Inc.
 * This software is open-source licensed under the GNU Public License Version 2 or later
 * The full license is available in the LICENSE.TXT file at the root of this repository
 */
(function ($) {
  Drupal.behaviors.highwire_panels_ajax_tab = {
    attach: function (context, settings) {
      $('a.panels-ajax-tab-tab', context, settings).once('hw-panels-ajax-tabs-once', function() {
        if (typeof(settings.highwire_panel_tabs) != "undefined") {
          for (var i = settings.highwire_panel_tabs.length -1; i >= 0; i--) {
            var panel_name = settings.highwire_panel_tabs[i].panel_name;
            if ($(this).data('panel-name') == panel_name) {
              $(this).unbind('click').attr('target', '_blank');
            }
          }
        }
      });
      $('a.highwire-article-nav-jumplink', context, settings).once('hw-panels-ajax-tabs-once', function() {
        if (typeof(settings.highwire_panel_tabs) != "undefined") {
          var panel_ajax_tab = settings.highwire_panel_tabs.panel_ajax_tab;
          if ($(this).data('panel-ajax-tab') == panel_ajax_tab) {
            $(this).unbind('click').attr('target', '_blank');
          }
        }
      });
    }
  };
})(jQuery);
;
/**
 * @file
 *
 * Behaviors for sticky pane style
 */

(function ($) {
  Drupal.behaviors.aapStickyPanel = {
    attach: function(context, settings) {

      /**
       * Apply sticky style to an individual element.
       */
      var stickIt = function (windowTop, distance, stickyTop, offsetBottom, stickyEl) {
        var bottomPos = windowTop + distance + $(stickyEl).height(); // verify footer overlap
        if (windowTop >= stickyTop-distance && offsetBottom >= bottomPos) {
          $(stickyEl).addClass("fixed").css({"top":distance});
        } else if (offsetBottom < bottomPos) { //stick to bottom on overlap
          $(stickyEl).addClass("fixed").css({"top": (offsetBottom-windowTop-$(stickyEl).height())});
        } else {
          $(stickyEl).removeClass("fixed");
        }
      }

      /**
       * Smooth scroll to anchor link position
       */
      var smoothScroll = function(container, stickyEl) {
        $(stickyEl).find('a').click(function(event){
          var hash = this.hash;
          // Check if it exists and avoid double scroll when active
          if ($(hash)[0] && (hash !== window.location.hash)) {
            event.preventDefault();
            var hashTop =  $(hash).position().top + $(container).offset().top - 10;
            $(container).animate({ scrollTop: hashTop}, 750, function(){
            //  window.location.hash = hash;           
            });
          }
        });
      }

      /**
       * Explicitly set width for an element
       */
      var setWidth = function(stickyEl) {
        var w = $(stickyEl).parent().width();
        $(stickyEl).width(w);
      }

      /**
       * Highlight active hash links
       */
      var highlightActive = function(windowTop, container, stickyEl) {
        $(stickyEl).find('a').each(function(index, link) {
          var hash = this.hash;
          if ($(hash)[0]) {
            var elementTop = $(hash).position().top;
            console.log(hash + ' : ' + elementTop + ' ::: ' + windowTop); 
            if(windowTop > elementTop && window.location.hash !== hash) {
              $(stickyEl).find('a').removeClass('active-hash');             
              $(this).addClass('active-hash');
            }
            else {
              $(this).removeClass('active-hash');
            }
          }
        });
      }

      /**
       * Find all sticky panes on the page and apply the style
       */
      var panes = $('.aap-sticky-panel');
      panes.each(function(index){
        var $this = $(this);
        
        // First explicitly set the width
        setWidth($this);
        
        // Get the scrolling container, usually just $('window')
        var container = String($this.attr('data-sticky-window'));
        
        //If container is not a selector we need to check
        if(container.toLowerCase() == 'window'){
          container = window; 
        }
        
        // Calculate when to stick it using offsets. 
        var stickyTop = $this.offset().top;
        
        // Get the desired sticky distance from the HTML attribute
         var distance = parseInt($this.attr('data-sticky-distance'));
        
        // Get the height of elements below sticky element
        var offsetBottomEle = String($this.attr('data-sticky-bottom'));
        var offsetBottom = $(offsetBottomEle).offset().top;
        
        // Add smooth scroll for anchor links
        smoothScroll(container, $this);
        
        // Adjust Sticky element on page load & fix position on scroll event
        $(container).bind("scroll load", function() {
          var windowTop = $(container).scrollTop();
          // AAPPROTTF-281: Always try and stick regardless of container/window limits
          /*
          if($this.height() <= $(container).height()) {
            stickIt(windowTop, distance, stickyTop, offsetBottom, $this);
          }
          */
          stickIt(windowTop, distance, stickyTop, offsetBottom, $this);
          
          highlightActive(windowTop, container, $this);
        });
         
        // Because of the way we set the width, we have to reset it if browser width changes.
        var resizeTimer;
        $(window).resize(function() {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(setWidth($this), 150);
        });

        // The hashchange event dynamically updates all the active links when it changes
        $(window).on('hashchange', function() {
          var hash = location.hash;
          $this.find('a').each(function(){
            var that = $(this)[0];
            if (that.hash === hash) {
             // $(this).addClass('active-hash');
            }
            else {
            //  $(this).removeClass('active-hash');            
            }
          });
        });
        $(window).trigger('hashchange');

      });
     
    }
  };
})(jQuery);
;
/**
 * @file
 *
 * Behaviors for building a responsive menu 
 */
(function ($) {
  Drupal.behaviors.aap_responsive_toggle = {
    attach: function(context, settings) {
      // Initialize to true failsafe  
      var noTouch = true;
      noTouch = !$('html').hasClass('modernizr-no-touch') || !$('html').hasClass('no-touch');

      // Mobile Menu toggle
      var groups = $('.aap-responsive-toggle-group:not(.processed)', context);
      groups.each(function(){
        var group = $(this);
        
        group.addClass('processed');
        // Add triggers to the DOM
        group.prepend('<ul class="aap-responsive-toggle-triggers"></ul>');
        var triggers = $('.aap-responsive-toggle-triggers', group);
  
        // Find panes inside this group
        var panes = group.children('.panel-pane');
    
        // For each pane in the group, apply hide/show behaviors.
        panes.each(function(index){
          var pane = $(this);
    
          var title = pane.find('.pane-title').html();
          triggers.append('<li class="trigger-' + index + '">' + title + '</li>');
    
          // Show/hide this pane when trigger element is clicked.
          // @@TODO: This can probably be cleaned up a bit.
          triggers.find('li.trigger-' + index).bind('click', function(e){
            e.preventDefault();
            var noToggle = $('#page').hasClass('js-sidebar-toggle-disabled');
            if (!noToggle) {      
              var paneState = pane.hasClass('expanded');
              var linkState = $(this).hasClass('expanded');
              panes.each(function() { $(this).removeClass('expanded'); });
              triggers.find('li').removeClass('expanded');
        
              if (!paneState) {
                pane.addClass('expanded');
                $(this).addClass('expanded');
                // Focus on form element after click if it exists
                pane.find('#edit-keywords').focus();
              }
              else {
                pane.removeClass('expanded');
                $(this).removeClass('expanded');
              }
              toggleSidebar();
            }
          });

          // Fix for bug where menu items without children have expanded class
          pane.find('ul.menu li.expanded').each(function(){
            var children = $(this).find('ul.menu li').length;
            if (children == 0 || children == null) {
              $(this).removeClass('expanded');
            }
          });
      
          // Submenus expand/collapse
          pane.find('ul.menu > li.expanded > a').click(function(e){
            e.preventDefault();
            var $that = $(this);
            $that.parent('li').toggleClass('show');
          });

        });

         // If clicking outside menu, close it.
        // TODO: instead of noTouch, make a new handler for this
        if(noTouch) {
          $(document).bind('click', function(event) {
            if(!$(event.target).closest(group).length) {
              var noToggle = $('#page').hasClass('js-sidebar-toggle-disabled');
              if(group.children('.panel-pane').hasClass('expanded') && !noToggle) {
                group.find('.aap-responsive-toggle-triggers > li').removeClass('expanded');
                group.children('.panel-pane').removeClass('expanded');
                toggleSidebar();
              }
            }        
          });
        }
        else {
          console.log('touch');
          $(document).bind('touchend', function(event) {
            if(!$(event.target).closest(group).length) {
              var noToggle = $('#page').hasClass('js-sidebar-toggle-disabled');
              if(group.children('.panel-pane').hasClass('expanded') && !noToggle) {
                group.find('.aap-responsive-toggle-triggers > li').removeClass('expanded');
                group.children('.panel-pane').removeClass('expanded');
                toggleSidebar();
              }
            }        
          });        
        }

      });

      // Helper function for toggling the sidebar.
      var toggleSidebar = function(){
        // Toggle sidebar if possible.
        var openMenus = $('.page-side').find('.aap-responsive-toggle-group .expanded').length;
        if (!openMenus) {
          $('#page').addClass('sidebar-closed');
        }
        else {
          $('#page').removeClass('sidebar-closed');
        }
      }


    }
  };
})(jQuery);
;
/**
 * @file
 * AAP Gateway theme behaviors.
 */

(function ($) {
  Drupal.behaviors.aapGatewayThemeScripts = {
    attach: function(context, settings) {
    

      var page = $('#page');

      // If page.animation set by default, assume animations are on
      var animation = $('#page').hasClass('animation');

      // These are elements controlled by aap-mobile-trigger
      var mobileTargets = $('.section-sidebar-first');
      var toggleTrigger = $('.aap-mobile-trigger .highwire-toggle-trigger');
      var quickSearch = $('#block-panels-mini-aap-search-menu-toggle');
      
      // Collapsed menu by default / mobile first hide      
      var expanded = $('.page-side .aap-responsive-toggle-group .expanded');
      expanded.removeClass('expanded');
      
      /**
       * Breakpoints returned by highwire_responsive_breakpoints are available
       * as a JS object: Drupal.settings.highwireResponsive.breakpoints  
       */
      
      // Narrow Range
      enquire.register(Drupal.settings.highwireResponsive.breakpoints.narrow, {
        match : function() {
          // Transitioning from *unmatched* to *matched*
          expanded.removeClass('expanded');
          page.addClass('sidebar-closed').removeClass('js-sidebar-toggle-disabled');
          if (animation) {
            page.addClass('animation');
          }
          mobileTargets.addClass('toggle-target-expanded').removeClass('toggle-target-collapsed');
          toggleTrigger.addClass('toggle-trigger-expanded').removeClass('toggle-trigger-collapsed');
        },
        unmatch : function() {
          // Transitioning from *matched* to *unmatched*
          page.removeClass('animation');
          mobileTargets.addClass('toggle-target-collapsed').removeClass('toggle-target-expanded');
          toggleTrigger.addClass('toggle-trigger-collapsed').removeClass('toggle-trigger-expanded');
        }
      });
      
      /**
       * Use a bit of JS to submit the quicksearch form when the icon is clicked.
       */
      $('.pane-highwire-seach-quicksearch .button-wrapper').click(function(){
        $('.pane-highwire-seach-quicksearch form').submit();
      });
      
      /**
       * Small text adjustment to dynamic contextual menu for Gateway home
       */
      $('#aap-home-links a[href="#aap-research-commentary"]').html('<i class="aap-icon-page-new"></i>Research and Commentary');
      
      
      /**
      * Because we are using a fixed position header, we need to virtually pad
      * anchor link targets so they aren't obscured by the fixed header.
      */
  
      var head_height = $('#section-superheader').height();
      $('a[href*=#]:not([href=#], [href^=#tab])', context).click(function() {
        var id = $(this).attr('href');
        $('html, body').animate({
          scrollTop: $(id).offset().top - head_height
        }, 100);
      });
    }
  }
})(jQuery);
;
