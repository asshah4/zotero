/************************************************************************/
/*Authors:      Subash Maharjan (subashm@silverchair.com)               */
/*              Tim Wood (timw@silverchair.com)                         */
/*Date:         2/8/2011                                                */
/*Project:      Silverchair Content Management 6.0 (SCM6)               */
/*Company:      Silverchair Science + Communications                    */
/*Filename:     scm6.popup.dialog.js                                    */
/*Description:  It creates JQuery popup dialog box:                     */
/*              2. Email Dialog:                                        */
/*              3. Table Dialog:                                        */
/*              4. Figure Dialog:                                       */
/*                      a: inline article figures                       */
/*                      a: figures from carousel                        */
/*              5. Alerts Dialog:                                       */
/*              6. Recommend Dialog:                                    */
/*              7. Get Citation Dialog:                                 */
/************************************************************************/

jQuery(function ($) {
    // temp fix to solve IE7 performance issue
    var easyLoad = false;
    if ($.browser.msie && (parseInt($.browser.version, 10) === 7 || parseInt($.browser.version, 10) === 8) && window.location.pathname.toLowerCase() == '/content.aspx')
        easyLoad = true;

    /********************************************/
    /*      Default Dialog Popup Settings       */
    /********************************************/
    var dialogOptions = {
        autoOpen: false,
        width: 750,
        height: 600,
        closeText: "X Close",
        modal: true,
        zIndex: 9999
    };
    /*  deleted easyload for ptint functionality to work in IE-8  */

    /*Print this option in figure and table dialog*/
    $('.printThis').live('click', function (e) {
        e.preventDefault();
        var printWindow = buildpage(this, '.ui-dialog', '.ui-dialog-content', false);
        openPrintWindow(printWindow, true);
    });


    //Creates a popup Dialog
    function createPopupDialog(linkSelector, dialogSelector, extendOptions) {
        $(linkSelector).each(function () {
            var $popupDialog = $(this).siblings(dialogSelector); // associate to table dialog

            $(this).click(function (e) {


                e.preventDefault();
                $popupDialog.dialog('open');
                //                if (linkSelector == '.popUpFigure') {
                //                    var downloadPPTLink = $(this).siblings('.downloadSlide').attr('href');
                //                    var newLink = '<a class="printThis"><img src="' + image.icon_print + '" alt="" style="vertical-align:middle;"/>&#160;Print</a>&#160;&#160;<a href="' + downloadPPTLink + '" class="downloadThis">Download as Powerpoint Slide</a>&#160;&#160;';
                //                    $popupDialog.parents('.ui-dialog').find('.ui-dialog-title').empty().append(newLink);
                //                }
                if (linkSelector == '.popUpTable' | linkSelector == '.popUpFigure') {
                    var downloadPPTLink = $(this).siblings('.downloadSlide').attr('href');
                    var newLink;
                    newLink = '<a class="printThis"><img src="' + image.icon_print + '" alt="" style="vertical-align:middle;"/>&#160;Print</a>';
                    if (downloadPPTLink.length)
                        newLink += '&#160;&#160;<a href="' + downloadPPTLink + '" class="downloadThis">Download as Powerpoint Slide</a>&#160;&#160;';
                    //newLink = '<a class="printThis"><img src="' + image.icon_print + '" alt="" style="vertical-align:middle;"/>&#160;Print</a>&#160;&#160;<a href="' + downloadPPTLink + '" class="downloadThis">Download as Powerpoint Slide</a>&#160;&#160;';
                    $popupDialog.parents('.ui-dialog').find('.ui-dialog-title').empty().append(newLink);
                }
            });
        });

        var tmpOptions = {};
        $.extend(tmpOptions, dialogOptions, extendOptions); // extend options
        $(dialogSelector).dialog(tmpOptions); // create table dialog modals

        if (!easyLoad)
            createDialogTitle(dialogSelector);
    }

    /*add Title to popup*/
    function createDialogTitle(thisDialog) {
        var uiDialogTitle = $(thisDialog).siblings('.ui-dialog-titlebar').find('.ui-dialog-title');

        switch (thisDialog) {
            //            case '.tableDialog':                  
            //                var printIcon = '<a class="printThis"><img src="' + image.icon_print + '" alt="" style="vertical-align:middle;"/>&#160;Print</a>&#160;&#160;';                  
            //                uiDialogTitle.append(printIcon);                  
            //                break;                  
            case '.emailPopupDialog':
                var emailDialogTitle = '<a class="sendEmailButton" onClick="validateForm()">Send Email</a>';
                uiDialogTitle.prepend(emailDialogTitle);
                break;
            case '.recommendDialog':
                var recommendDialogTitle = '<a class="recommendNow" onClick="validateForm()">Recommend Now</a>';
                uiDialogTitle.append(recommendDialogTitle);
                break;
            case '.alertPopupDialogCollection':
            case '.alertPopupDialog':
                var alertTitle = 'User Alerts';
                uiDialogTitle.prepend(alertTitle);
                break;
        }

        $(thisDialog).append($(document).find('#Form1').find('.disclosures .copyrightInfo:first').clone());
    }
    $('#copyrightID').append($(document).find('#Form1').find('.disclosures .copyrightInfo:first').clone());


    /*Table Dialog*/
    //createPopupDialog('.popUpTable', '.tableDialog', { modal: false });

    /*Figure Dialog*/
    /*
    if ($('.popUpFigure').length > 0) {
    var popUpFigure = $('.figureDialog'), popUpFigureCount = popUpFigure.length, i = 0; //, copyrightText = $(document).find('#Form1').find('.copyright:first').clone();

    popUpFigure.each(function (i) {
    var figDesc = $(this).parents('.inlineFigureImage').siblings('.figureDescription').clone();
    var me = $(this);

    var bigImage = $(this).children('img').width();
    $(me).parents('.inlineFigure').children('.inlineFigureImage').each(function () {
    $(me).append(figDesc);
    $(this).children('img').css('width', '180px');
    });

    //TODO: make the popup dialog's height auto; so that in case of small height images wont have extra space at bottom
    if (! --popUpFigureCount) {
    createPopupDialog('.popUpFigure', '.figureDialog', {
    modal: false,
    open: function () {
    if (bigImage < 400) {
    $('.figureDialog').css({ "height": "auto" });
    } else {
    $('.figureDialog').css({ "height": "500px" });
    }
    }
    });
    }
    });
    } else if ($("#showImageCarousel").length) {
    var figureRotator = $('.rotatorFigLink'), figureRotatorCount = figureRotator.length;
    figureRotator.each(function (i) {
    $(this).siblings('.rotatorFigLinkDialog').prepend("<br /><br />").prepend($("img", this).clone());
    if (! --figureRotatorCount) createPopupDialog('.rotatorFigLink', '.rotatorFigLinkDialog');
    });
    }
    */

    /*populate figure carousel*/
    //    if ($("#articleAuthenticationDetection").text() == "1") {
    //        /** image carousel popup images if user is logged in **/
    //        if ($('#tab2').find('.popUpFigure').length) {
    //            $('.rotatorFigLink').live('click', (function (e) {
    //                e.preventDefault();
    //                var id = $('.rotatorFigLink').index(this);
    //                $('.popUpFigure:eq(' + id + ')').trigger(e);
    //            }));
    //        }
    //    }



    if (!easyLoad) {
        $('.rotatorFigLink').live('click', (function (e) {
            e.preventDefault();
            if ($("#articleAuthenticationDetection").text() == "1") {
                /** image carousel popup images if user is logged in **/
                if ($('#tab2').find('.popUpFigure').length) {
                    var id = $('.rotatorFigLink').index(this);
                    $('.popUpFigure:eq(' + id + ')').trigger(e);
                }
            }
        }));
    }

    /*Recomment this form dialog*/
    if (!easyLoad) {

        //createPopupDialog('.popUpTable', '.tableDialog', { modal: false });

        createPopupDialog('.recommendThis', '.recommendDialog', {
            open: function () {
                $('.recommendDialog').css('height', '450px');
            }
        });

        /*Disclosure Popup*/
        createPopupDialog('.disclosureLink', '.disclosureText', {
            width: 500,
            open: function () {
                $(this).parents('.ui-dialog').find('.ui-dialog-title').html('<b>Article Information</b>');
                $('.disclosureText').css({ 'height': 'auto', 'padding-right': '10px' });
            }
        });

        /*My account - edit passowrd popup*/
        $('.editPasswordButton').click(function () {
            $('.editPasswordDialog').dialog({
                width: 400,
                open: function () {
                    $('.editPasswordDialog').css('height', 'auto');
                    $(".cancelButton").live("click", function () {
                        $(this).dialog('close');
                    });
                },
                buttons: {
                    "Edit Password": function () {
                        $('#<%=btnUpdatePassword.ClientID%>').attr(); //.trigger('click');
                    },
                    "Cancel": function () {
                        $(this).dialog('close');
                    }
                }
            });
        });
    }

    /*======================================================================================================*/
    /*                                              ALERT MODEL                                             */
    /*======================================================================================================*/
    // hide this div by default
    $('.alertPopupDialogCollection').hide();

    /****************************************************/
    /*      TOOLBOX FEATURES: USER PERSONALIZATION      */
    /****************************************************/
    var isalert = false;

    function openSignInPopup() {
        var w = 800;
        var h = 400;
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        var popupParms = ',top=' + top + ',left=' + left;
        if (isalert == true) {
            window.open("../signinpopup.aspx?alerts=true", "mywindow", "menubar=0,resizable=0,width=800,height=400" + popupParms);
        } else if (articleId != null) {
            window.open("../signinpopup.aspx?articleID=" + articleId.toString(), "mywindow", "menubar=0,resizable=0,width=800,height=400" + popupParms);
        } else {
            window.location.href = "../signin.aspx";
        }

    };

    var showAlertModal = false;
    var showGetCitationModal = false;
    var showSendEmailModal = false;
    var showShareThisModal = false;
    var showCollectionAlertModal = false;
    var showDataSupplementModal = false;
    var articleId = null;

    // Beginning of Toolbox Feature: Show dataSupplement
    showDataSupplementModal = ($("#hfDataSupplement").val() == "1") ? true : false;
    var url = window.location.pathname;
    var myPageName = url.substring(url.lastIndexOf('/') + 1).toLowerCase();
    articleId = $("#hfArticleId").val();
    if (showDataSupplementModal || myPageName == "issue.aspx") {
        createPopupDialog('.dataSupplementLink', '.dataSupplementDialog', {
            open: function () {
                $(this).parents('.ui-dialog').find('.ui-dialog-title').html('Supplemental Content');
                $(this).parent().appendTo("form");
                $('.dataSupplementDialog').css('height', 'auto');

                var currDialog = $(this);
                $(".closeDialog", this).live("click", function (e) {
                    e.preventDefault();
                    currDialog.dialog('close');
                });
            }
        });
    }
    else {
        $('.dataSupplementLink').click(function () {
            // Login is required to access this feature.
            isalert = true;
            openSignInPopup();
        });
    }
    // End of Toolbox Feature: Show DataSupplement

    // Beginning of Toolbox Feature: User Alerts
    if (!easyLoad) {
        showAlertModal = ($("#hfAlerts").val() == "1") ? true : false;
        if (showAlertModal) {
            createPopupDialog('.showAlerts', '.alertPopupDialog', {
                open: function () {
                    $(this).parents('.ui-dialog').find('.ui-dialog-title').html('User Alerts');
                    $('.userAlertPopupProgressBar').hide();
                },
                width: 400,
                height: 200
            });
        }
        else {
            $('.showAlerts').click(function () {
                // Login is required to access this feature.
                isalert = true;
                openSignInPopup();
            });
        }
    }

    //Collection Alerts on Issues and FacetedBrowse pages
    if (!easyLoad) {
        showCollectionAlertModal = ($("#hfCollectionAlerts").val() == "1") ? true : false;
        if (showCollectionAlertModal) {
            $('.alertPopupDialogCollection').show();
            createPopupDialog('.showCollectionAlerts', '.alertPopupDialogCollection', {
                open: function () {
                    $(this).parents('.ui-dialog').find('.ui-dialog-title').html('User Alerts');
                    $(".alertPopupValidationMessage").html(''); // clear any text in the validation message placeholder.
                    $('.userAlertPopupProgressBar').hide();
                }
            });
        }
        else {
            $('.alertPopupDialogCollection').hide();
            $('.showCollectionAlerts').click(function () {
                // Login is required to access this feature.
                isalert = true;
                openSignInPopup();
            });
        }
    }
    // End of Toolbox Feature: User Alerts

    // Beginning of Toolbox Feature: Get Citation
    //showGetCitationModal = ((freeViewResource && personalUserIsLoggedOn) || (personalUserIsLoggedOn && accessToResource && (jQuery.inArray(permIDGetCitation, permissionIDs) >= 0)));
    if (!easyLoad) { // no citation for content.aspx
        showGetCitationModal = ($("#hfGetCitation").val() == "1") ? true : false;
        if (showGetCitationModal) {
            createPopupDialog('.getCitation', '.getCitationPopupDialog', {
                width: 300,
                open: function () {
                    $(this).parents('.ui-dialog').find('.ui-dialog-title').html('Get Citation');
                    $('.getCitationPopupDialog').css({ "height": "auto" });
                }
            })
        }
        else {
            $('.getCitation').click(function () {
                // Login is required to access this feature.
                isalert = true;
                openSignInPopup();
            });
        }
    }
    // End of Toolbox Feature: Get Citation

    // Beginning of Toolbox Feature: Send Email
    //showSendEmailModal = ((freeViewResource && personalUserIsLoggedOn) || (personalUserIsLoggedOn && accessToResource && (jQuery.inArray(permIDSendEmail, permissionIDs) >= 0)));
    if (easyLoad) {
        $('#aimgEmail').parent().css('display', 'none'); //hide email
    } else {
        showSendEmailModal = ($("#hfEmail").val() == "1") ? true : false;
        if (showSendEmailModal) {
            createPopupDialog('.sendEmail', '.emailPopupDialog', {
                open: function () {
                    $(this).parents('.ui-dialog').find('.ui-dialog-title').html('Email');
                    $(this).parent().appendTo("form");
                    $('.emailPopupDialog').css('height', 'auto');

                    var journalName = $('.contentHeaderContainer').children('.journalName').text();     //JOURNAL NAME
                    $('.emailPopupDialog').find('.logoBrand').empty().css('width', '720px').append('<img src="/images/backgrounds/masthead_' + journalName + '.jpg" alt=""/>');
                    $('#journalShortName').text(journalName);

                    var currDialog = $(this);
                    $(".closeDialog", this).live("click", function (e) {
                        e.preventDefault();
                        currDialog.dialog('close');
                    });
                },
                width: 740,
                resizable: false
            });
        }
        else {
            $('.sendEmail').click(function () {
                // Login is required to access this feature.
                isalert = true;
                openSignInPopup();
            });
        }
    }
    // End of Toolbox Feature: Send Email

    // Beginning of Toolbox Feature: Share This
    //showShareThisModal = ((freeViewResource && personalUserIsLoggedOn) || (personalUserIsLoggedOn && accessToResource && (jQuery.inArray(permIDShareThis, permissionIDs) >= 0)));
    showShareThisModal = ($("#hfShareThis").val() == "1") ? true : false;
    if (showShareThisModal) {
        // TODO: What to do? Unknown at this point!
    }
    else {
        $('.shareThis').click(function () {
            // Login is required to access this feature.
            openSignInPopup();
        });
    }
    // End of Toolbox Feature: Share This


    /*===============================================================================================*/
    /**                     Prints Article page and Book Content Page Section                       **/
    /**                  Print is unlike the rest because it opens a new window                     **/
    /*===============================================================================================*/

    $('.printMenu').click(function () {
        $("div.contentContainer").hide();
        $(".tabNav div a").removeClass("selected");
        $(".tabNav .atab:nth-child(1) a").addClass("selected").show();
        $("#tab1").show();
        var pageContent = buildpage(this, '.mainContainer', '.contentBodyContainer');     //build html page
        openPrintWindow(pageContent, false);                                           //opens up the window to print; with print dialog
    });

    function buildpage(selector, parentSelector, findContent, loop) {
        var content = $(selector).parents(parentSelector).find(findContent).clone();
        var loop = (loop == undefined) ? true : loop;
        var contentHeader = $('.contentHeaderContainer').clone();
        var journalName = $(contentHeader).children('.journalName').text();         //JOURNAL NAME
        var pageWrapper = $('.pageContentHolder').find('.wrapper').attr('class');   //Options: Article = articlePage, Book = contentPage
        var html = "";
        html += printMastHead(journalName, pageWrapper);
        html += printHeader(journalName, contentHeader);
        html += printContentBody(loop, content, pageWrapper);
        html += printFooter(selector, pageWrapper);

        return html;
    }

    function printMastHead(journalName, pageWrapper) {
        var html = "";
        html += '<link href="CSS/global.css" type="text/css" rel="stylesheet"/>';
        if (journalName == 'PN') {
            html += '<link href="CSS/newsArticle.less" type="text/css" rel="stylesheet"/>';
            html += '<link href="CSS/PN/pn.news.print.css" type="text/css" rel="stylesheet"/>';

            if (useRedesignPsychNews != null && useRedesignPsychNews == true) {
                html += '<link href="CSS/PN/pn.redesign.news.print.less" type="text/css" rel="stylesheet"/>';
            }

        } else {
            html += '<link href="CSS/content.css" type="text/css" rel="stylesheet"/>';
            html += '<link href="CSS/content/content.print.css" type="text/css" rel="stylesheet"/>';
            html += '<link href="CSS/pol.popUpDialog.css" type="text/css" rel="stylesheet"/>';
        }

        html += '<script type="text/javascript" language="javascript" src="JS/ads.js"></script>';
        html += '</head><body><div class="printPage"/>';

        if (pageWrapper == 'wrapper articlePage') {
            if (journalName == 'PN') {
                if (useRedesignPsychNews != null && useRedesignPsychNews == true) {
                    html += '<div id="printHeader"><img src="/Images/backgrounds/logo_psychnews.png" alt="" /></div>';
                }

            } else {
                html += '<div id="printHeader"><img src="/images/masthead_print_' + journalName + '.jpg" alt="" /></div>';
            }
            //html += '<div id="printHeader"><img src="/images/masthead_print_' + journalName + '.jpg" alt="" /></div>';
        }
        if (pageWrapper == 'wrapper contentPage') {
            html += '<div id="printHeader"><img src="/images/masthead_print_POL.gif" alt="" /></div>';
        }
        html += '<div class="clearAll"></div>';
        return html;
    }

    function printHeader(journalName, contentHeader) {
        var html = "";
        var thisWidth = '720';
        var toPrint = $(contentHeader).children('.contentSection').clone();     //Article Type, Article Date
        html += $('<div id="printPage"/>').append(toPrint).html();

        toPrint = $(contentHeader).find('div.aTitle').clone();              //Article Title

        // Sometimes the Title is floated to the right (like for books) and ends up making the print page look funny.
        // So, overriding that attribute.
        $(toPrint).css({ 'float': 'none', 'width': thisWidth });
        html += $('<div id="printPage"/>').append(toPrint).html();

        toPrint = $(contentHeader).children('.authorSectionBold').clone();  //Article Author
        html += $('<div id="printPage"/>').append(toPrint).html();

        toPrint = $(contentHeader).children('.authorSection').clone();      //Article Author
        html += $('<div id="printPage"/>').append(toPrint).html();
        if (journalName != 'PN') {
            toPrint = $('.disclosureText').clone().css('border', 'none');       // disclosure content
            html += $('<div id="printPage"/>').append(toPrint).html();
        }
        toPrint = $(contentHeader).children('.aShortDesc').clone();         //Article short description
        html += $('<div id="printPage"/>').append(toPrint).html();

        return html;
    }

    function printContentBody(loop, content, pageWrapper) {
        var contentBody = ($(content).find('#tab1').length > 0) ? $(content).find('#tab1').clone() : "";                             //CONTENT BODY
        var commentSection = ($(content).find('#tab9').find('.comments').length > 0) ? $(content).find('#tab9').find('.comments').clone() : "";        //CONTENT SECTION
        var tableIndex = 0;
        var tableDialog = $('.tableSection').find('.tableDialog');
        var html = "";

        //For Psychiatric News - Abstract-teaser
        var absTeaser = $('.abstract-teaser').clone();
        html += $('<div id="printPage"/>').append(absTeaser).html();

        //Looping through all section of Article Tab
        if (loop) {
            $(contentBody).find('.contentSectionTab').each(function () {
                var sectionTitle = $(this).find('.contentJump').find('h2').clone();
                html += $('<div id="printPage"/>').append(sectionTitle).html();

                //Loop until there is contentBody Section; includes all the content sections
                $(this).find('.contentBody').each(function () {
                    //Setup for article page
                    if (pageWrapper == 'wrapper articlePage') {
                        var myChildren = $(this).children();
                        var wrapperClass = $(this).attr('class');

                        if ((wrapperClass == 'contentBody figureSection') || (wrapperClass == 'contentBody tableSection')) {
                            var printArticleSection = printContentSection(this, wrapperClass, tableDialog, tableIndex);
                            html += $('<div id="printPage"/>').append('<p/>').append(printArticleSection).html();
                            if (wrapperClass == 'contentBody tableSection') tableIndex++;
                        } else if (wrapperClass == 'contentBody newsFigureSection') {
                            html += $('<div id="printPage"/>').append($(this).clone()).html();
                        } else {
                            $(myChildren).each(function () {
                                var wrapperClass = $(this).attr('class');
                                var printArticleSection = printContentSection(this, wrapperClass, tableDialog, tableIndex);
                                html += $('<div id="printPage"/>').append('<p/>').append(printArticleSection).html();
                                if (wrapperClass == 'contentBody tableSection') tableIndex++;
                            });
                        }
                    }

                    //Setup for book content page
                    if (pageWrapper == 'wrapper contentPage') {
                        $(this).find('.contentSection').each(function () {
                            var myChildren = $(this).children();

                            if ($(myChildren).attr('class') == 'paragraphSection') {
                                var wrapperClass = $(this).attr('class');
                                var printArticleSection = printContentSection(this, wrapperClass, tableDialog, tableIndex);
                                html += $('<div id="printPage"/>').append('<p/>').append(printArticleSection).html();
                            } else {
                                $(myChildren).each(function () {
                                    var wrapperClass = $(this).attr('class');
                                    var printBookSection = printContentSection(this, wrapperClass, tableDialog, tableIndex);
                                    html += $('<div id="printPage"/>').append('<p/>').append(printBookSection).html();
                                    if (wrapperClass == 'contentBody tableSection') tableIndex++;
                                });
                            }
                        });
                    }

                });
            });

            //commentsTab
            if (commentSection != "") {
                if ($.trim($(commentSection)[0].innerHTML) != "") {
                    html += '<h2>User Comments</h2>';
                    html += $('<div id="printPage"/>').append(commentSection).html();
                }
            }
        } else {
            html += $('<div id="printPage"/>').append(content.css('height', 'auto')).html();
        }

        return html;
    }

    //Print all the contentSections from contentSectionTab
    function printContentSection(sel, myclass, tableDialog, tableIndex) {
        var thisSection;
        if (myclass == 'contentBody figureSection') {
            thisSection = $('<div id="printPage"/>').append('<p/>').append($(sel).find('.inlineFigure').children('.figureLabel').clone()).html();
            thisSection += $('<div id="printPage"/>').append($(sel).find('.inlineFigure').children('.figureLegend').clone()).html();
            thisSection += $('<div id="printPage"/>').append('<p/>').append($(sel).find('.contentFigures').clone()).html()

        } else if (myclass == 'contentBody tableSection') {
            if ($(tableDialog)[tableIndex] != undefined) {
                var tableContainer = $(tableDialog)[tableIndex].innerHTML;
                thisSection = $(tableContainer).clone();
            }
            thisSection = $(tableContainer).clone();
        } else {
            thisSection = $(sel).clone();
        }

        return thisSection;
    }

    function printFooter(selector, pageWrapper) {
        var html = "";
        var currentYear = (new Date).getFullYear();
        var toPrint = $(selector).parents('#Form1').siblings().find('.disclosureText .copyrightInfo:first'); //copyright information

        if (toPrint.length == 0) {
            html += '<div class="copyrightInfo">Copyright ©' + currentYear + ' American Psychiatric Association </div>';
        } else {
            html += $('<div id="printPage"/>').append(toPrint).html();
        }

        html += '<div class="clearAll"></div>';

        return html;
    }

    //opens the print dialog
    function openPrintWindow(html, bool) {
        var w = 760;
        var h = 400;
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);

        var tblWindow = window.open('', 'Table', 'width=' + w + ', height=' + h + ', scrollbars=1, resizable=1, top=' + top + ', left=' + left);

        tblWindow.document.open();
        tblWindow.document.write(html);
        tblWindow.document.close();

        tblWindow.print();
        if (!$.browser.webkit) { // protect against CHROME crash when canceling print dialog
            // if (closeMe == true) tblWindow.close();
        }
    }

    $('a.tablereflinks').live("click", function () {
        $('.ui-icon-closethick').trigger('click');
        $('#scm6MainContent_Articletab').trigger('click');
        var jump = $(this).attr('href').replace("#", "");
        var anchor = $('a[name="' + jump + '"]');
        // check if there is more than 1 anchor tag with this name
        // possible because of figures inline on article tab, but they also 
        // exist in the figure tab (using the same code and therefore have the same anchor tag name)
        if (anchor.length > 1) {
            for (var i = 0; i < anchor.length; i++) {
                //check to see if anchor is visible and scroll to the first one that is
                if (IsElementVisible.isVisible(anchor[i])) {
                    var newPosition = $(anchor[i]).offset();
                    window.scrollTo(newPosition.left, newPosition.top);
                    return false; // cancel default action
                }
            }
        } else {
            return true; // if there is only one link, use default action
        }
        return true;
    });
});

function openContentPopupDialog(me, e, dialogSelector) {
    var $contentDialog = $(me).siblings(dialogSelector);
    // use a clone so that we can destroy it afterwards
    $contentDialog.find('.tableFoot').each(function () {
	    $(this).find('.clearfix p').removeClass('para highlighted').addClass('para');
    });
    var $popupDialog = $contentDialog.clone().insertAfter($contentDialog);

    $popupDialog.dialog({
        width: $(window).width() * (3 / 4),
        height: $(window).height() * (9 / 10),
        position: [($(window).width() / 2) - (630 / 2), 150],
        closeText: "X Close",
        modal: true,
        zIndex: 9999,
        close: function (ev, ui) { $(this).dialog('destroy'); }
    });
    $popupDialog.css("overflow-y", "auto");
    // add download/copyright

    finishContentPopupDialog($(me), $popupDialog);

}


function openFigurePopupDialog(me, e) {
    var $figureDialog = $(me).siblings('.figureDialog').length > 0 ? $(me).siblings('.figureDialog') : $(me).siblings('.tableDialog');
    // use a clone so that we can destroy it afterwards
    var $popupDialog = $figureDialog.clone().insertAfter($figureDialog);

    var figDesc = $(me).parents('.inlineFigureImage').siblings('.figureDescription').clone();
    var bigImage = $(me).children('img').width();
    $(me).parents('.inlineFigure').children('.inlineFigureImage').each(function () {
        $(me).append(figDesc);
        $(this).children('img').css('width', '180px');
    });

    $popupDialog.dialog({
        width: $(window).width() / 2,
        height: $(window).height() / 2,
        position: [($(window).width() / 2) - (630 / 2), 150],
        closeText: "X Close",
        modal: true,
        zIndex: 9999,

        close: function (ev, ui) { $(this).dialog('destroy'); }
    });

    finishContentPopupDialog($(me), $popupDialog);
}



//only call it once dialog has been initialised
function finishContentPopupDialog(dialoglink, popupDialog) {
    // add download link
    var downloadPPTLink = dialoglink.siblings('.downloadSlide').attr('href');

    var newLink;
    newLink = '<a class="printThis"><img src="' + image.icon_print + '" alt="" style="vertical-align:middle;"/>&#160;Print</a>';


    if (downloadPPTLink != undefined && downloadPPTLink.length)
        newLink += '&#160;&#160;<a href="' + downloadPPTLink + '" class="downloadThis">Download as Powerpoint Slide</a>&#160;&#160;';

    popupDialog.parents('.ui-dialog').find('.ui-dialog-title').empty().append(newLink);

    // add copyright
    popupDialog.append($(document).find('#Form1').find('.disclosures .copyrightInfo:first').clone());

}

/**
* Author: Jason Farrell
* Author URI: http://useallfive.com/
*
* Description: Handles all things involving element visibility.
* Package URL: https://github.com/UseAllFive/ua5-js-utils
* Usage:
* var my_element = document.getElementById('my-element');
* //-- Returns true/false
* VISIBILITY.isVisible(my_element);
*/
var IsElementVisible = (function () {
    /**
    * Checks if a DOM element is visible. Takes into
    * consideration its parents and overflow.
    *
    * @param (el) the DOM element to check if is visible
    *
    * These params are optional that are sent in recursively,
    * you typically won't use these:
    *
    * @param (t) Top corner position number
    * @param (r) Right corner position number
    * @param (b) Bottom corner position number
    * @param (l) Left corner position number
    * @param (w) Element width number
    * @param (h) Element height number
    */
    function _isVisible(el, t, r, b, l, w, h) {
        var p = el.parentNode,
VISIBLE_PADDING = 2;

        //-- Return true for document node
        if (9 === p.nodeType) {
            return true;
        }

        //-- Return false if our element is invisible
        if (
'0' === _getStyle(el, 'opacity') ||
'none' === _getStyle(el, 'display') ||
'hidden' === _getStyle(el, 'visibility')
) {
            return false;
        }
        if (
'undefined' === typeof (t) ||
'undefined' === typeof (r) ||
'undefined' === typeof (b) ||
'undefined' === typeof (l) ||
'undefined' === typeof (w) ||
'undefined' === typeof (h)
) {
            t = el.offsetTop;
            l = el.offsetLeft;
            b = t + el.offsetHeight;
            r = l + el.offsetWidth;
            w = el.offsetWidth;
            h = el.offsetHeight;
        }
        //-- If we have a parent, let's continue:
        if (p) {
            //-- Check if the parent can hide its children. Also, only check offset parents.
            if (('hidden' === _getStyle(p, 'overflow') || 'scroll' === _getStyle(p, 'overflow')) && el.offsetParent === p) {
                //-- Only check if the offset is different for the parent
                if (
                //-- If the target element is to the right of the parent elm
l + VISIBLE_PADDING > p.offsetWidth + p.scrollLeft ||
                //-- If the target element is to the left of the parent elm
l + w - VISIBLE_PADDING < p.scrollLeft ||
                //-- If the target element is under the parent elm
t + VISIBLE_PADDING > p.offsetHeight + p.scrollTop ||
                //-- If the target element is above the parent elm
t + h - VISIBLE_PADDING < p.scrollTop
) {
                    //-- Our target element is out of bounds:
                    return false;
                }
            }
            //-- Add the offset parent's left/top coords to our element's offset:
            if (el.offsetParent === p) {
                l += p.offsetLeft;
                t += p.offsetTop;
            }
            //-- Let's recursively check upwards:
            return _isVisible(p, t, r, b, l, w, h);
        }
        return true;
    }

    //-- Cross browser method to get style properties:
    function _getStyle(el, property) {
        if (window.getComputedStyle) {
            return document.defaultView.getComputedStyle(el)[property];
        }
        if (el.currentStyle) {
            return el.currentStyle[property];
        }
    }

    return {
        'getStyle': _getStyle,
        'isVisible': _isVisible
    }

})();

