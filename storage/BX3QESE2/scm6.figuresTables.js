$(document).ready(function () {
    var easyLoad = false;
    if ($.browser.msie && (parseInt($.browser.version, 10) === 7 || parseInt($.browser.version, 10) === 8) && window.location.pathname.toLowerCase() == '/content.aspx')
        easyLoad = true;

    if (!isMobile && !easyLoad) {
        labelCaptionDisplay($('div.contentBody.tableSection').has('a.popUpTable'), 'table');
        labelCaptionDisplay($('div.contentBody.figureSection').has('a.popUpFigure'), 'figure');

        /*removing inline table from tab3*/
        //$('#tab3').find('.inlineDisplayTable').parent('.contentBody').remove();

        //Enable Figure Enlarger
        var pagename = $('.wrapper').attr('class');
        switch (pagename) {
            case 'wrapper articlePage':
                $('.inlineFigure').figureEnlarger({
                    maxWidth: 548,
                    minWidth: 180
                });
                break;

            case 'wrapper contentPage':
                $('.inlineFigure').figureEnlarger({
                    maxWidth: 530,
                    minWidth: 180
                });
                break;

            case 'mainContainer wrapper myalertPage':
                $('.inlineFigure').figureEnlarger({
                    maxWidth: 530,
                    minWidth: 180
                });
                break;
        }

        /*****************************************************************************************************************************/
        /* abstract figure rotator */
        /***************************/
        var numberFigures = $('#tab2 .inlineFigureImageContainer').length; //check to see if there are any figures and how many

        //hide the figure rotator if there are no images
        if (numberFigures == '0') {
            $('.figureRotatorContainer').hide();
        } else {
           	$('.figureRotator').show();
            $('#tab2 .inlineFigureImageContainer').each(function () {
                var abstractFigureVar = $(this).find('.btnImageEnlarger').html();
                var html = $(this).parents('.inlineFigure').find('.figureLabel').text();
                var figureLink = $(this).parents('.inlineFigureImage').children('.figureLinks').children('a.viewLargeImage').attr('href');
                $('<li><a class="rotatorFigLink" style="cursor:pointer;">' + abstractFigureVar + '</a></li>').clone().appendTo('.figureRotator ul');
            });

            //can be removed once we have regular thumbnails
            if ($(".figureRotator ul li").size() <= 3) $(".figNext, .figPrev").addClass('disabled');
            else $(".figPrev").addClass('disabled');
            $(".figureRotator").jCarouselLite({
                btnNext: ".figNext",
                btnPrev: ".figPrev",
                mouseWheel: true,
                visible: 3,
                circular: false
            });
        }
    } // End Mobile Exception
});

function labelCaptionDisplay(sel, type) {
    $(sel).each(function () {
        if ($(this).find('.inlineFigureImage').length > 1) {
            $(this).find('.inlineFigureImage').css('float', 'none');
        }

        if ($(this).find('.' + type + 'Legend').children('.GraphicCell').length > 0) {
            $(this).find('.inlineFigure').prepend($(this).find('.' + type + 'Legend').children('.GraphicCell'));
        }

        if (type == 'table') {
            $(this).prepend($(this).find('.tableContainer').children('a'));

            //            $(this).siblings('.figureDescription').find('.tableDialog').prepend($(this).clone());
            //            $(this).siblings('.figureDescription').prepend(this);

            //            /*Fix for Focus DTD 3*/
            //            $(this).clone().prependTo($(this).parents('.tableDialog'));
            //            $(this).prependTo($(this).parents('.figureDescription'));

            //            if ($(this).parent('.GraphicCell').length != 0) {
            //                $(this).siblings('.inlineFigureImage').find('.tableDialog').prepend($(this).clone());
            //                $(this).parents('.inlineFigure').prepend(this);
            //            }

            //            /* Handling Inline Tables */
            //            var inlineTable = $(this).find('.inlineDisplayTable');
            //            if ($(inlineTable).length) {
            //                $(inlineTable).parents('.tableContainer').unwrap();
            //                $(this).empty().append(inlineTable).removeClass('.' + type + 'Section');
            //            }
        }

        var legend = $(this).find('.' + type + 'Legend');
        var footer = $(this).find('.' + type + 'Foot');
        var label = $(this).find('.' + type + 'Label');
        var caption = $(this).find('.' + type + 'Caption');

        if ($(legend).length == 0) {
            $(this).find('.' + type + 'Dialog').prepend($(this).find('.' + type + 'Caption').clone());
            $(this).find('.' + type + 'Dialog').prepend($(this).find('.' + type + 'Label').clone());

            //$(label).parents('.inlineFigure').find('.figureDescription').find('.tableDialog').prepend($(label).clone());
            //$(label).parents('.inlineFigure').find('.figureDescription').prepend($(label).clone());
            //if ($(label).parent('.GraphicCell').length != 0) {
            //    $(label).siblings('.inlineFigureImage').find('.tableDialog').prepend($(label).clone());
            //    $(label).parents('.inlineFigure').prepend($(label).clone());
            //}
        } else {
            $(this).find('.' + type + 'Dialog').prepend($(this).find('.' + type + 'Legend').clone());

            //$(figureLegend).parent('.inlineFigure').find('.figureLinks').find('.figureDialog').append($(figureLegend).clone());
            //$(figureLegend).parent('.inlineFigure').find('.figureDescription:eq(0)').append($(figureLegend).clone());
            //if ($(figureLegend).parents('.myalertPage').length) {
            //    $(figureLegend).parents('.nodeWrapInner').find('.figureDialog').append($(figureLegend).clone());
            //}
        }

        if ($(footer).parents('.inlineDisplayTable').length == 0) {
            $(this).find('.' + type + 'Dialog').append($(this).find('.' + type + 'Foot'));
            //$(this).parents('.inlineDisplayTable').append($(footer).clone());
        }
        //        if ($(footer).parent('.GraphicCell').length != 0) {
        //            $(footer).siblings('.inlineFigureImage').find('.tableDialog').append($(footer).clone());
        //            $(footer).parents('.inlineFigure').prepend($(footer).clone());
        //        }

        /*Table Title displaying on .tableSection*/
        var tableTitle = $(this).find('.tableTitle');
        var bookTableTitle = $(this).find('.bookTableTitle');

        if (bookTableTitle.length > 0) {
            bookTableTitle.clone().prependTo($(bookTableTitle).parents('.tTable'));
            bookTableTitle.prependTo($(bookTableTitle).parents('.figureDescription'));
        }

        if (tableTitle.length > 0) {
            if (tableTitle.parents('.myalertPage').length) {
                tableTitle.parents('.sectionTitle').prepend($(tableTitle).clone());
            }
        }
    });
}