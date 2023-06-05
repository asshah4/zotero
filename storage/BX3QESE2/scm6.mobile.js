/************************************************************************/
/*Author:       Tim Wood                                                */
/*Date:         3/28/2011                                               */
/*Project:      Silverchair Content Management 6.0 (SCM6)               */
/*Company:      Silverchair Science + Communications                    */
/*Filename:     scm6.mobile.js                                          */
/*Description:  Global mobile JS - handles all mobile js                */
/*Version:      v1.6                                                    */
/************************************************************************/

/*****************************************
Capture current filename for later use
*****************************************/
var currentNavFile = jQuery.url().attr("file");
currentNavFile = (currentNavFile != null && currentNavFile.length > 0) ? currentNavFile.toLowerCase() : "";
var mobileFireEvent = "";
var atab = jQuery.url().param('atab'); //tab mode

$(document).ready(function () {

    //alert("isMobile: " + isMobile);

    /*****************************************
    Process mobile JS
    *****************************************/
    if (isMobile) {

        /*****************************************
        Associate current page to top level nav item
        *****************************************/
        switch (currentNavFile) {
            case "books.aspx": case "book.aspx":
                mobileNavFile = "/mobile/books.aspx";
                break;
            case "journals.aspx": case "journal.aspx": case "issues.aspx": case "issue.aspx": case "article.aspx":
                mobileNavFile = "/mobile/journals.aspx";
                break;
            case "collections.aspx": case "collection.aspx":
                mobileNavFile = "/mobile/collections.aspx";
                break;
            case "about.aspx":
                mobileNavFile = "/public/about.aspx";
                break;
            case "dsmlibrary.aspx":
                mobileNavFile = "/mobile/dsmlibrary.aspx";
                break;
            case "index.aspx":
                mobileNavFile = "/mobile/index.aspx";
                break;
            default:
                mobileNavFile = "";
                break;
        } // END SWITCH
        /*****************************************
        Assign 'selected' class to proper mobile nav item
        *****************************************/
        if (mobileNavFile != "") {
            $(".mobileNav li").each(function () {
                if ($("a", this).attr("href").toLowerCase() == mobileNavFile) {
                    $(this).addClass("selected");
                }
            });
        } else {
            $(".mobileNav li").removeClass("selected");
        }

        /*****************************************
        Microsite 'selected' nav
        *****************************************/
        if ($("#micrositeHeader").is(":visible")) {
            if (jQuery.url().param('bookid') != undefined) {
                $('.mobileNav li a[href*="/book.aspx?bookid=' + jQuery.url().param('bookid') + '"]').parent().addClass("selected");
            } else {
                $('.mobileNav li a[href*="/' + currentNavFile + '"]').parent().addClass("selected");
            }
        }

        /*****************************************
        Fire events based on page loaded - use inline var to init 
        *****************************************/
        switch (mobileFireEvent) {
            case "home":
                $(".searchSection").show();
                $(".sectionList").each(function () {
                    if ($(this).has("li.viewMore").length) {
                        var cutoff = ($(this).hasClass("topics")) ? 4 : 1;
                        $("> li:eq(" + cutoff + ")", this).nextAll().not(":last").hide();
                    }
                });
                $(".sectionList .viewMore").click(function () {
                    // show hidden line items
                    $(this).hide().siblings("li").show();
                    // scroll to top of list
                    var position = $(this).parent().parent().position();
                    $(document).scrollTop(position.top);
                });
                break;
            case "about":
                $(".staticpagetitle").after($(".mobileview"));
                break;
            case "article": case "newsarticle":

                if (mobileFireEvent != "newsarticle") {
                    //hide sections without a jump link
                    $(".contentSectionTab").filter(":not(:has(.contentJump))").each(function () { $(this).remove() });
                }

                //                $('.contentSectionTab').each(function () {
                //                    var listChild = $(this).find('li');
                //                    $(this).find('.listSection').find('ul').empty().append(listChild);
                //                });

                $("div.contentContainer").hide(); //Hide all content containers
                //grabs tab id from url if present and displays that tab
                if (atab > '0') {
                    $(".tabNav .atab:nth-child(" + atab + ") a").addClass("selected").show(); //Activate first tab
                    $("#tab" + atab).show(); //Show first tab content
                } else {
                    $(".tabNav .atab:nth-child(1) a").addClass("selected").show(); //Activate first tab
                    $("#tab1").show(); //Show first tab content
                }
                //On Click Event
                $(".tabNav div a").click(function () {
                    $(".tabNav div a").removeClass("selected"); //Remove any "active" class
                    $(this).addClass("selected"); //Add "active" class to selected tab
                    $(".contentContainer").hide(); //Hide all tab content

                    var activeTab = $(this).attr("href"); //Find the href attribute value to identify the active tab + content
                    $(activeTab).show(); //show the active ID content

                    // find column heights of content and sidebar and adjust
                    equalHeight($(".eqColumn"));
                    return false;
                });
                // remove recommend this title 
                $(".disclosureLink").click(function () {
                    $(".disclosureText").toggle();
                    $(this).toggleClass("disclosureLinkOpen");
                });

                $(".recommendThis").parent().remove();
                accordianLink("contentJump", "contentBodyWrapper", "contentTypeOpen");

                $(".contentJump:first").addClass("contentTypeOpen").css({ 'background': 'transparent' });
                $(".contentBodyWrapper:first").show();

                //$(".tableSection").prev().hide();
                //$(".tableSection").hide();

                //$(".contentTypeOpen").next().show();
                $(".portlet").each(function () {
                    if ($(this).children().size() < 1) { $(this).remove(); }
                });


                break;
            case "content":
                // THIS IS A HOTFIX FOR Key Points
                $(".contentJump h2:contains('Key Points')").parent().next().find(".paragraphSection").hide();
                $(".contentJump h2:contains('Key Points')").parent().next().find(".tableSection").show();
                // END HOTFIX
                $("#bookReferenceSection").prev().hide();
                //$(".tableSection").hide();
                $(".contentJump").click(function () {
                    $next = $(this).next();
                    if ($next.is(":visible")) {
                        $next.hide();
                        $(".contentJump h2").removeClass('selected');
                    } else {
                        $(".contentJump h2").removeClass('selected');
                        $next.show();
                        $("h2", this).addClass('selected');
                        var position = $(this).position();
                        $(document).scrollTop(position.top);
                    }
                });
                $(".portlet").each(function () {
                    if ($(this).children().size() < 1) { $(this).remove(); }
                });
                break;
            case "collection":
                $(".articleContentContainer:first").wrapInner('<div class="articleContentSplit" />');
                break;
            case "guidelines":
                accordianLink("sectionHead", "sectionContent", "sectionOpen");
                break;
            case "issue":
                accordianLink("articleType", "articleContentWrapper", "articleTypeOpen");
                break;
            case "book":
                var tC = "/images/mobile/img_partarrow_closed.png";
                var tO = "/images/mobile/img_partarrow_open.png";
                $(".partHeader").click(function () {
                    $next = $(this).next();
                    if ($next.is(":visible")) {
                        $next.hide();
                        $(this).find("img").attr("src", tC);
                    } else {
                        $(".bookTOC > li > ul").hide();
                        $(".partHeader").find("img").attr("src", tC);
                        $next.show();
                        $(this).find("img").attr("src", tO);
                        var position = $(this).position();
                        $(document).scrollTop(position.top);
                    }
                });
                break;
            case "issues":
                $(".expandList h2").click(function () {
                    $next = $(this).next();
                    if ($next.is(":visible")) {
                        $next.hide();
                        $(".expandList h2,.expandList label").removeClass('selected');
                    } else {
                        $(".expandList > li > ul,.expandList > li > ul > li > ul").hide();
                        $(".expandList h2,.expandList label").removeClass('selected');
                        $next.show();
                        $(this).addClass('selected');
                        var position = $(this).position();
                        $(document).scrollTop(position.top);
                    }
                });
                $(".expandList label").click(function () {
                    $next = $(this).next();
                    if ($next.is(":visible")) {
                        $next.hide();
                        $(".expandList label").removeClass('selected');
                    } else {
                        $(".expandList > li > ul > li > ul").hide();
                        $(".expandList label").removeClass('selected');
                        if ($next.is(":empty")) {
                            $next.load('/mobile/mobileJournalIssuesByYear.aspx?journalid=' + jQuery.url().param('journalid') + '&year=' + $(this).text(), function () {
                                $next.show();
                            });
                        } else {
                            $next.show();
                        }
                        $(this).addClass('selected');


                    }

                    //alert($(this).text());
                    ///mobile/mobileJournalIssuesByYear.aspx?journalID=13&year=2009
                });
                /*
                $(".expandList h2,.expandList label").click(function () {
                //                    var tC = "/Images/mobile/img_arrow_blue.png";
                //                    var tO = "/Images/mobile/img_arrow_red.png";
                $parent = $(this).parent();
                if ($parent.find("ul").first().is(":visible")) {
                //                        $parent.find("img").attr("src", tC);
                $(this).removeClass('selected');
                $parent.find("ul").hide();
                } else {
                //                        $parent.siblings().find("img").attr("src", tC);
                $parent.siblings().removeClass('selected');
                $parent.siblings().find("ul").hide();
                $parent.find("ul").first().show();
                $(this).addClass('selected');
                //                        $("img", this).first().attr("src", tO);
                        
                }
                });
                */
                break;
            default: break;
        } // END SWITCH

        //Inline Figures and Tables
        $('.contentFigures').each(function () {
            $(this).wrap('<a href="' + $(this).attr("src") + '" target="_blank">');
        });
        $(".inlineFigure:has(.tableIcon)").each(function () {
            if ($('.tableLabel', $(this)).length > 0 && $('.tableCaption', $(this)).length > 0) {
                $(this).prepend('<a href="#" onclick="openTable(event);">' + $('.tableLabel', $(this)).html() + ' ' + $('.tableCaption', $(this)).html() + '</a><br />');
                $($('.tableLabel,.tableCaption'), $(this)).hide();
            }
            else if ($('.bookTableTitle', $(this)).length > 0) {
                $(this).prepend('<a href="#" onclick="openTable(event);">' + $('.bookTableTitle', $(this)).html() + ' ' + '</a><br />');
            }
            else if ($('.tableTitleMinimized', $(this)).length > 0) {
                var html = $('.tableTitleMinimized', $(this)).html();
                var prependHtml = (html == "") ? "View Table" : html;
                $(this).prepend('<a href="#" onclick="openTable(event);">' + prependHtml + ' ' + '</a><br />');
                $($('.tableTitleMinimized'), $(this)).hide();
            }
        });
        $('.figureLinks').hide();

        //Email Form Toggle
        $(".sendEmail, #emailForm .closeDialog").click(function () {
            $("#dvEmailForm").toggle();
            $(this).toggleClass("sendEmailOpen");
        });

        //Search Features
        //Adding the click event handler to the search button.
        $('#btnMobileSearch').click(function (e) {
            e.preventDefault();
            var searchBox = $(this).parents(".searchBoxWrapper");
            var queryText = searchBox.find(".txtSearchTerm").val();
            var searchScope = searchBox.find("#ddlGroup").val();

            //TE-6506: Solr Search Switch
            var solrSwitch = $("#hfIsSolrSearchEnabled").val();
            var isSolrSearchEnabled = true;
            isSolrSearchEnabled = solrSwitch == "1" ? true : false;

            //alert('SOLR is enable ' + isSolrSearchEnabled);

            if (isSolrSearchEnabled) {
                //Solr is ON: 3rd parameter is "isMobile", set this to true.
                doSolrSearch(queryText, searchScope, true);

            } else {
                //Legacy/Windows Search
                //Performing the search.
                doSearch(queryText, searchScope, 1, 1);
            }

            //Performing the search.
            //doSearch(queryText, searchScope, 1, 1);
        });
        $(".toggleSearchCriteria").click(function () {
            var searchCriteria = $(this).siblings(".searchCriteria");
            if (searchCriteria.is(":visible")) {
                searchCriteria.slideUp();
            } else {
                searchCriteria.slideDown();
            }

        });
    }
});
//Opens Inline Tables in a New Window
function openTable(e) {
    var html = '<html><head><link href="/css/mobile/content.css" rel="stylesheet" type="text/css" /></head><body class="tablePopup">';
    var hyperlink = $(e.target.parentNode);
    var table = $(hyperlink).find('.tableDialog').html();
    html += table;
    html += '</body></html>';
    var tblWindow = window.open('');
    tblWindow.document.open();
    tblWindow.document.write(html);
    tblWindow.document.close();
}
/*****************************************
Create HTML to build accordian
*****************************************/
function accordianContentBlocks(actionLink, blockContent, findContent, contentWrapper, openClass, closedClass) {
    $("." + blockContent).each(function () {
        $("." + findContent, this).wrapAll('<div class="' + contentWrapper + '" />');
    });
    $("." + actionLink).addClass(closedClass);
    accordianLink(actionLink, contentWrapper, openClass);
}
function accordianLink(actionLink, contentWrapper, openClass) {
    $("." + actionLink).click(function () {
        $("." + actionLink).removeClass(openClass);
        if ($(this).next().is(":visible")) {
            $(this).next().hide();
        } else {
            //$("." + contentWrapper + ":not(:has(.figureSection))").hide();
            $("." + contentWrapper).hide();
            $(this).next().show();
            $(this).addClass(openClass);
            var position = $(this).position();
            $(document).scrollTop(position.top);
        }
    });
}
function downloadFile(filename, articleid, ispopup) {
    var showpopup = new Boolean(false);
    var url = filename;
    showpopup = ispopup;

    window.open(filename);

//    if (showpopup) {
//        var w = 650;
//        var h = 350;
//        var left = (screen.width / 2) - (w / 2);
//        var top = (screen.height / 2) - (h / 2);
//        var popupParms = ',top=' + top + ',left=' + left;
//        window.open(url, "mywindow", "menubar=0,resizable=1,width=800,height=450" + popupParms);
//    } else {
//        window.location = url;
//        if (articleid != null) {
//            var key = 'Article Tab';
//            this.UserSessionItem = new UserSessionItem("<%=Me.Session.SessionID %>", 0, 0);
//            this.ActionType = new ActionType(1, key);
//            doTracking(this.ActionType, 'PDF is clicked for article id = ' + articleid.toString(), "<%=System.DateTime.Now %>", this.UserSessionItem, (window.location).toString());
//        }
//    }
}