/*******************************/
/*  plugin: firebug logging    */
/*******************************/
jQuery.fn.log = function (msg) { if ($.browser.mozilla && $.browser.version >= 5) { console.log("%s: %o", msg, this); return this; } };

var curDate = new Date();
var debug = 0;
/*******************************/
/*     script img config       */
/*******************************/
var image = {};
image.icon_table = "/Images/icons/icon_table.gif";
image.icon_print = "/images/icons/toolbox_icon_print.png";
image.icon_download = "/images/icons/b_download.png";
image.button_close = "/Images/buttons/b_imgclose.gif";
image.button_expand = "/Images/buttons/b_imgexpand.gif";
image.ajax_loader = "/Images/multimedia/ajax-loader.gif";
image.triangle_open = "/images/mobile/m_triangle_open.gif";
image.triangle = "/images/mobile/m_triangle.gif";
image.ad_placeholder_leaderboard = "/Images/ads/ad_placeholder_leaderboard.gif";

/*******************************/
/*      z-index config         */
/*******************************/
var zIndex = {};
zIndex.portlet = {};
zIndex.portlet.flyout_active = 500;
zIndex.portlet.flyout_inactive = 0;
/*******************************/
/*      isMobile config        */
/*******************************/
var isMobile = ($(".mobileDetection").css("text-transform") == "uppercase" || jQuery.url().param('mobile') == curDate.getFullYear() + pad2((curDate.getMonth() + 1)) + pad2(curDate.getDate())) ? true : false; // TODO: current CSS3 for browser detection - alt method?
//if ($.cookie('IsMobile')) { $().log('mobile cookie detected'); }
$().log((isMobile) ? 'mobile device detected' : 'mobile device not detected');

/*******************************/
/*    isAuthenticated config   */
/*******************************/
var isAuthenticated = ($("#authenticationDetection").text() == "1") ? true : false; // check if user is authenticated
$().log((isAuthenticated) ? 'authenticated' : 'not authenticated');

/*******************************/
/*      global JS load         */
/*******************************/
relativeFile = jQuery.url().attr("relative");
$(document).ready(function () {
    $("#globalNav li,.siteSubHead ul li").each(function () {
        if ($("a", this).url().attr("relative") == relativeFile) {
            $(this).addClass("selected");
        }
    });
    if (!isMobile) {

    	/***************************/
    	/*     article rotator     */
    	/***************************/
    	$(".articleRotator").each(function () {
    		$thisRotator = $(this);
    		listL = $thisRotator.find('ul li').length;
    		if (listL == 0) {
    			$thisRotator.hide();
    		} else {
    			var gotoBTN = new Array();
    			$thisRotator.find('ul li').each(function (i, v) {
    				$thisRotator.find(".gotoBTN").append('<span class="' + i + '"></span>');
    				gotoBTN.push(".gotoBTN ." + i);
    				if (i == listL - 1) {
    					$thisRotator.find(".gotoBTN span").eq(0).addClass("selected");
    					$thisRotator.find('.articleCarousel').jCarouselLite({
    						btnNext: ".b_carousel_next",
    						btnPrev: ".b_carousel_prev",
    						mouseWheel: true,
    						visible: 1,
    						btnGo: gotoBTN,
    						circular: true,
    						auto: 6000,
    						speed: 500,
    						afterEnd: function (a) {
    							var curIndex = $(a[0]).index();
    							if (curIndex == 0) curIndex = listL - 1;
    							else if (curIndex == listL + 1) curIndex = 0;
    							else curIndex = curIndex - 1;
    							$thisRotator.find(".gotoBTN span").removeClass("selected").eq(curIndex).addClass("selected");
    						}
    					});
    				}
    			});
    		}
    	});

    	var numberArticles = $('.figureRotator ul li').length; //check to see if there are any figures and how many

    	//hide the figure rotator if there are no images
    	if (numberArticles == '0') {
    		$('.figureRotator').hide();
    	} else {
    		$('.figureRotator').show();
    		$(".figureRotator").jCarouselLite({
    			btnNext: ".figNext",
    			btnPrev: ".figPrev",
    			mouseWheel: true,
    			visible: 3,
    			circular: false
    		});
    		if ($(".figureRotator ul li").size() <= 3) {
    			$(".figNext, .figPrev").addClass('disabled');
    		} else {
    			$(".figPrev").addClass('disabled');
    		}
    	}

    	if ($.cookie('search_autosuggest') != "" && $.cookie('search_autosuggest') != null) {
            $(".searchCriteria .autosuggest a").addClass("hidden");
            $('.searchCriteria .autosuggest a[state!="' + $.cookie('search_autosuggest') + '"]').removeClass("hidden");
        }

        $(".searchCriteria .autosuggest a").click(function (e) {
            e.preventDefault(); // prevent link from being clicked until we've attached cookie
            $(".searchCriteria .autosuggest a").toggleClass("hidden");
            $.cookie('search_autosuggest', $(this).attr("state"));
            // window.location = $(this).attr("href"); // renenable href event now that cookie is set
        });

        // equalize column heights in the content wrapper based on content & side column
        if ($(".eqColumn")[0]) setTimeout("equalHeight($('.eqColumn'))", 1); // setTimeout to stall page load
    }
});



/*******************************/
/*      global functions       */
/*******************************/
function equalHeight(group, setMinHeight, targetProperty) {
    var targetProperty = (targetProperty) ? targetProperty : 'min-height';
    var setMinHeight = (!setMinHeight) ? 0 : setMinHeight;
    tallest = setMinHeight;
    group.css(targetProperty, '');
    group.each(function () {
        thisHeight = $(this).height();
        if (thisHeight > tallest) {
            tallest = thisHeight;
        }
    });
    //group.height(tallest);
    group.css(targetProperty, tallest + "px").log("equalHeight: " + tallest + "px");
}
function in_array(needle, haystack, argStrict) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: vlado houba
    // +   input by: Billy
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    var key = '',
        strict = !!argStrict;

    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }

    return false;
}


// use vertical_tabContentHeight('.vTabs ul','.vtabContent');
// JBJS vertical_tabContentHeight('.verticalTab ul','.vtabContent');
function vertical_contentHeight(tabs, content, pad) {
    pad = (!pad) ? 0 : parseInt(pad);
    if ($(tabs).height() > $(content).height()) {
        $(content).height($(tabs).height() + pad);
        
    }
}
function pad2(n) {
    return (parseInt(n.toString()) < 10 ? '0' : '') + n.toString()
}