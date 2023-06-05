(function ($) {
    $.fn.figureEnlarger = function (options) {

        //1) check if whether it is called from article page or book page
        var iArticleid = null;
        var iBookid = null;
        // These values are set on widgetFigureDisplay user control
        if ($get('hfBookID') != null && $get('hfBookID').value != '') {
            iBookid = $get('hfBookID').value;

        }
        if ($get('hfArticleID') != null && $get('hfArticleID').value != '0') {
            iArticleid = $get('hfArticleID').value;
        }

        //2) check if content is freeview
        var isFreeView = ($("#articleAuthenticationDetection").text() == "1") ? true : false;
        //alert(isFreeView);
        //3) check if user is authenticated and authorized to view this content
        var authenticatedUser = ($("#authenticationDetection").text() == "1") ? true : false;
        var userHasSubscriptionToResource = null;
        if ($get('hfUserHasAccessToResource') == null && $get('hfUserHasSubscriptionToResource') != null) {
            userHasSubscriptionToResource = $get('hfUserHasSubscriptionToResource').value;
        } else if ($get('hfUserHasAccessToResource') != null) {
            userHasSubscriptionToResource = $get('hfUserHasAccessToResource').value;
        }
        //4) if user is authenticated and not authorized pass content id to signin popup url in query string
        var popupurl = null;
        // now we need popup B. pass article id or bookid to popup url
        if (iBookid != null && $get('hfSigninPopupPath') != null) {
            popupurl = $get('hfSigninPopupPath').value + '?bookId=' + iBookid.toString();
        } else if (iArticleid != null && $get('hfSigninPopupPath') != null) {
            popupurl = $get('hfSigninPopupPath').value + '?articleID=' + iArticleid.toString();
        }

        var settings = {
            maxWidth: 540,
            minWidth: 180,
            button_close: "/Images/buttons/b_imgclose.gif",
            button_expand: "/Images/buttons/b_imgexpand.gif"
        };

        var obj = $(this);

        if (options) {
            $.extend(settings, options);
        }


        $(obj).find('.enlargeImage').click(function (e) {
            if (userHasSubscriptionToResource == "true" || isFreeView == true) {
                // user has subscription to resource.
                //alert("enlargeImage freeview");
                e.preventDefault();
                figureEnlarger1(this, 'button');
            }
            else {
                // user doesn't have access to resource
                // launch Sign In Popup - that will display appropriate message plus with an option to subscribe.
                //  alert("else");
                var url = popupurl;
                openPopupWindow(url);
            }
        });

        $(obj).find('.contentFigures').click(function (e) {
            if (userHasSubscriptionToResource == "true" || isFreeView == true) {
                // user has subscription to resource.
                //alert("contentfigures freeview");
                e.preventDefault();
                //figureEnlarger1(this, 'button');
                if ($(this).parents('.ui-dialog').length < 1)
                    figureEnlarger1(this, 'image');
            }
            else {
                // user doesn't have access to resource
                // launch Sign In Popup - that will display appropriate message plus with an option to subscribe.
                //   alert("else");
                // check if user is logged in. If user is logged in then we have to show popupB. We need to pass articleid or bookid in the query sstring
                var url = popupurl;
                openPopupWindow(url);
            }
        });



        // NOTE - a copy of [.enlargeImage.click] is made to cater to specific functionality on the WidgetFigure Display.
        // This is done to make sure the existing logic is not broken.
        $(obj).find('.contentFiguresWidgetFigureDisplay').click(function (e) {
            // Invoked from the Figures Tab section of the Article Page.
            // Only Subscribed Users are allowed to enlarge Figures.

            //            var userHasSubscriptionToResource;
            //            // userHasSubscriptionToResource = $get('hfUserHasSubscriptionToResource').value;
            //            userHasSubscriptionToResource = $get('hfUserHasAccessToResource').value;

            if (userHasSubscriptionToResource == "true" || isFreeView == true) {
                // alert("contentfigureswidgetfiguredisplay freeview");
                e.preventDefault();
                if ($(this).parents('.ui-dialog').length < 1)
                    figureEnlarger1(this, 'image');
            }
            else {
                // user doesn't have access to resource
                // launch Sign In Popup - that will display appropriate message plus with an option to subscribe.
                var url = popupurl;
                openPopupWindow(url);
            }
        });

        function figureEnlarger1(me, control) {
            var figWidth;
            switch (control) {
                case 'button':
                    figWidth = $(me).siblings('.inlineFigureImageContainer').width();
                    var handle = $(me).parent('.inlineFigureImage');

                    if (figWidth == settings.minWidth) {
                        buttonClickAnimate(me, handle, settings.button_close, settings.maxWidth);
                    } else {
                        buttonClickAnimate(me, handle, settings.button_expand, settings.minWidth);
                    }
                    break;

                case 'image':
                    figWidth = $(me).width();

                    if (figWidth == settings.minWidth) {
                        var srcvalue = $(me).attr("src")
                        srcvalue = srcvalue.replace("s_", "m_");
                        $(me).attr("src", srcvalue);
                        imageClickAnimate(me, settings.button_close, settings.maxWidth);
                    } else {
                        imageClickAnimate(me, settings.button_expand, settings.minWidth);
                    }
                    break;
            }
        }

        //mainHandle = contentFigures
        //sel = inlineFigureImage
        //img = button_close
        //imgWidth = image width
        function buttonClickAnimate(mainHandle, sel, img, imgWidth) {
            var srcvalue = $(sel).find('.inlineFigureImageContainer').find('.contentFigures').attr("src")
            srcvalue = srcvalue.replace("s_", "m_");
            $(sel).find('.inlineFigureImageContainer').find('.contentFigures').attr("src", srcvalue);
            $(sel).find('.inlineFigureImageContainer').find('.contentFigures').animate({ width: imgWidth + 'px' }, { duration: 600, complete: function () { equalHeight($(".eqColumn")); } });
            $(sel).find('.inlineFigureImageContainer').animate({ width: imgWidth + 'px' }, 600, function () { });
            $(sel).animate({ width: imgWidth + 18 + 'px' }, 600, function () { });

            if ($(mainHandle).parents('.tableSection')) {
                if (imgWidth == settings.maxWidth) {
                    $(sel).siblings('.figureDescription').css('float', 'none').css('width', '560px'); //.css({ 'float': 'none' }, { 'width': '560px' });
                } else {
                    if ($(sel).parents('.contentPage').length == 0) {
                        $(sel).siblings('.figureDescription').css('float', 'right').css('width', '365px'); //.css({ 'float': 'right' }, { 'width': '335px' });
                    } else {
                        $(sel).siblings('.figureDescription').css('float', 'right').css('width', '335px'); //.css({ 'float': 'right' }, { 'width': '335px' });
                    }
                }
            }

            $(mainHandle).children('.btnImageEnlarger').css("background", "url('" + img + "') no-repeat");
            return false;
        }

        //sel = enlargeImage
        function imageClickAnimate(sel, img, imgWidth) {
            $(sel).animate({ width: imgWidth + 'px' }, { duration: 600, complete: function () { equalHeight($(".eqColumn")); } });
            $(sel).parents('.inlineFigureImageContainer').animate({ width: imgWidth + 'px' }, 600, function () { });
            $(sel).parents('.inlineFigureImage').animate({ width: imgWidth + 18 + 'px' }, 600, function () { });
            $(sel).parents('.inlineFigureImage').find('.enlargeImage').find('.btnImageEnlarger').css("background", "url('" + img + "')");

            if ($(sel).parents('.tableSection')) {
                if (imgWidth == settings.maxWidth) {
                    $(sel).parents('.inlineFigureImage').siblings('.figureDescription').css('float', 'none').css('width', '560px'); //.css({ 'float': 'none' }, { 'width': '560px' });
                } else {
                    if ($(sel).parents('.contentPage').length == 0) {
                        $(sel).parents('.inlineFigureImage').siblings('.figureDescription').css('float', 'right').css('width', '365px'); //.css({ 'float': 'right' }, { 'width': '335px' });
                    } else {
                        $(sel).parents('.inlineFigureImage').siblings('.figureDescription').css('float', 'right').css('width', '335px'); //.css({ 'float': 'right' }, { 'width': '335px' });
                    }
                }
            }

            return false;
        }
    }
})(jQuery);