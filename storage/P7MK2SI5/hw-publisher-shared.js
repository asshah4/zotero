gSiteOptions.suppressFloatingAbsOnThumbnails = 1;

$(document).ready(function() {        
        $('li.has-thumbnail, div.has-thumbnail').each ( function() {
            var thumbnail = $(this).find('img.cit-thumbnail');
            var thumbnailUrl = thumbnail.attr('src');
            // Visual Overview image is the first in figs
            var abstractGraphic = thumbnailUrl.substring(0, thumbnailUrl.indexOf('/embed/')) + "/F1.medium.gif";
            var absUrl = $(this).find('ul.cit-views a[rel=abstract]').attr("href");
            
            thumbnail.wrap("<a href='" + absUrl + "' />");

            thumbnail.mouseover(function() {
                var popupTop = thumbnail.offset().top;
                var popupLeft = thumbnail.offset().left + thumbnail.width() + 1;

                $("body").append('<div class="visualOverviewPopup" style="position:absolute;text-align:left;z-index:999;top:'+popupTop+'px;left:'+popupLeft+'px;"><img src="'+abstractGraphic+'"/></div>');
               
            }).mouseout(function(){
                $('div.visualOverviewPopup').remove();
            });
        })
	$('div.flag-option').find('#mtgabs-option').click(function() {
        $(":radio[id='mtgabs-option']").attr('checked', false);
        $(this).attr('checked', true);
        });

});

