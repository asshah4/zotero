/*
* Search UI Client
* Author: Tim Wood (codearachnid) timw@silverchair.com, Eric Greene ericg@silverchair.com
* Description:
* Dependancies: jquery.url.js
*/

var debug = 1;
var ActiveFilterItems = new Array();
var ActiveSortOrder = 0;
var ActiveResultView = 0;

var FilterItemType = '{ "ContentTypeFilter" : "0" , "JournalFilter" : "1", "BookFilter" : "2", "ArticleTypeFilter" : "3", "TopicFilter" : "4", "DateRangeFilter" : "5", "OwnershipFilter" : "6" }';

var searchAction = {};

var domReference = 
{
    filterColumn: ".filterSettings",
    resultColumn: "",
    selectedFilters: ""
};

// url utilities
function URLDecode(s) {
    return unescape(String(s).replace(/\+/g, " "));
}

// date utilities
function getMonthName(monthIndex) {
    return (new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"))[monthIndex];
}
function isValidDate(sText) {
    var reDate = /(?:[1-9]|0[1-9]|1[0-2])\/(?:[1-9]|0[1-9]|[12][0-9]|3[01])\/(?:19|20\d{2})/;
    return reDate.test(sText);
}

// general utilities
Array.prototype.Slice = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

String.prototype.format = function () {
    var s, i;
    s = this;
    i = arguments.length;
    while (i--)
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    return s;
};


// client action hooks
searchAction.preInit =
    function () 
    {
        queryDebug = (jQuery.url().param("d") != undefined) ? jQuery.url().param("d") : "";
        debug = (queryDebug == curDate.getFullYear() + pad2((curDate.getMonth() + 1)) + pad2(curDate.getDate())) ? 2 : 1;
    }

searchAction.preInit();

function removeItemsfromCollection(o) 
{
    var x;

    if(typeof o != "object") 
    {
        o = [o];
    }

    for(x = 0; x < o.length; x++) 
    {
        for(y = 0; y < ActiveFilterItems.length; y++) 
        {
            if (ActiveFilterItems[y].FilterType == o[x]) ActiveFilterItems.Slice(y, y);
        }
    }

    return ActiveFilterItems.length;
}

$.extend({ getUrlVars: function () { var vars = [], hash; var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'); for (var i = 0; i < hashes.length; i++) { hash = hashes[i].split('='); vars.push(hash[0]); vars[hash[0]] = hash[1]; } return vars; }, getUrlVar: function (name) { return $.getUrlVars()[name]; } });

// End Utility Functions

function ContentFilter(i) 
{
    this.FilterOptionItem = i;
}

ContentFilter.prototype.SelectFilter = 
    function (o, c) 
    {
        removeItemsfromCollection(c);
     
        ActiveFilterItems[ActiveFilterItems.length] = new aFilterItem(c, $(o).context.id);
     
        $("#currentPage").val("1");
        doSearch($("#queryText").val(), $("#searchScope").val(), 5, $("#currentPage").val(), $("#pageLength").val(), ActiveFilterItems, ActiveSortOrder, ActiveResultView, true, false);
    }


//------------------------------------------------------------------------------

// Filter Item Object

function FilterItem(filters, i) 
{
    this.FilterType = filters[i].FilterType;
    this.FilterValue = filters[i].FilterValue;
}

// End Filter Item Object

//------------------------------------------------------------------------------

// aFilter Item Object

function aFilterItem(t, v) 
{
    this.FilterType = t;
    this.FilterValue = v;
    this.FilterStartValue = '';
    this.FilterEndValue = '';
    this.FilterOptions = new Array();
}

function aRangeFilterItem(t, s, e) 
{
    this.FilterType = t;
    this.FilterValue = '';
    this.FilterStartValue = s;
    this.FilterEndValue = e;
    this.FilterOptions = new Array();
}

// End aFilter Item Object

//------------------------------------------------------------------------------

// Result Item Object

function ResultItem(item) 
{
    this.Item = item;
}

ResultItem.prototype.formatDate =
    function (date) 
    {
        var d = new Date(date);
        return getMonthName(d.getMonth()) + " " + d.getDate() + ", " + d.getFullYear();
    }

ResultItem.prototype.formatPDFLink = 
    function (link) 
    {
        if (link != null && link.length > 0) {
            // Only render the link directly to the PDF if the intem is free content or if the user is authenticated and subscribed to the current journal
            if ((this.Item.IsFree != null && this.Item.IsFree) || (isAuthenticated != null && isAuthenticated)) {
                return link;
            } else {
                // Otherwise, render the link but have it go to the sign in page
                return "/signin.aspx";
            }
        }
    }

ResultItem.prototype.formatReferences =
    function (references) 
    {
        EditedReferences = [];

        if(references != null) 
        {
            $.each
            (
                references, 
                function (i, val) 
                {
                    xmlDoc = $.parseXML(val);
                    $ref = $(xmlDoc);
                    $return = "";

                    if($ref.find("refitem").length > 0) 
                    {
                        $.each
                        (
                            $ref.find("author"), function (x, author) 
                            {
                                $author = $(author);
                                $return += ($return != "") ? ", " + $author.find("first").text() + " " + $author.find("last").text() : $author.find("first").text() + " " + $author.find("last").text();
                            }
                        );
                    
                        $return += ". " + $ref.find("title").text() + " " + $ref.find("jrnlname").text() + " " + $ref.find("refcitation > year").text() + ";" + $ref.find("refcitation > volume").text() + ": " + $ref.find("refcitation > fpage").text() + "-" + $ref.find("refcitation > lpage").text();
                    }

                    if($ref.find("ref").length > 0) 
                    {
                        $.each
                        (
                            $ref.find("person-group name"),
                            function (x, author) 
                            {
                                $author = $(author);
                                $return += ($return != "") ? ", " + $author.find("given-names").text() + " " + $author.find("surname").text() : $author.find("given-names").text() + " " + $author.find("surname").text();
                            }
                        );
                    
                        $return += ". " + $ref.find("article-title").text() + " " + $ref.find("source").text() + " " + $ref.find("year").text() + ";" + $ref.find("volume").text() + ": " + $ref.find("fpage").text() + "-" + $ref.find("lpage").text();
                    }

                    if($ref.find("bib").length > 0) 
                    {
                        $return += $ref.find("other-ref").text();
                    }

                    EditedReferences.push($return);
                }
            );
        }

        return EditedReferences;
    }

ResultItem.prototype.toResultHtml =
    function () 
    {
        resultContainer = ".searchContentContainer";
    
        //pretify returned obj result for display in markup
        this.Item.PublishedDate = this.formatDate(this.Item.PublishedDate);
        this.Item.PDFLink = this.formatPDFLink(this.Item.PDFLink);
    
        //    this.Item.Scoring = this.formatScoring(this.Item.Scoring);
        //assign result node to markup
        switch(this.Item.ResultType) 
        {
            case 0: // Article Result
                $("#resultArticleNode").tmpl(this.Item).appendTo(resultContainer);
                break;
        
            case 1: // Section Result
                $("#resultSectionNode").tmpl(this.Item).appendTo(resultContainer);
                break;
        
            case 2: // Figure Result
                $("#resultFigureNode").tmpl(this.Item).appendTo(resultContainer);
                break;
        
            case 3: // Author Result
                this.Item.References = (this.Item.References == "undefined") ? [] : this.formatReferences(this.Item.References);
                $("#resultAuthorNode").tmpl(this.Item).appendTo(resultContainer);
                break;
        }
    }

//------------------------------------------------------------------------------

// Search Parameters Object
function SearchParameters(queryText, searchScope, searchSource, currentPage, pageLength, filterArray, sortOrder, resultView, doCacheResults, useCachedResults, webSessionId) 
{
    this.QueryText = queryText;
    this.SearchScope = searchScope;
    this.CurrentPage = currentPage;
    this.PageLength = pageLength;
    this.Filters = new Array();
    this.Filters = filterArray;
    this.SortOrder = sortOrder;
    this.ResultViewOrder = resultView;
    this.SearchSource = searchSource;
    this.DoCacheResults = doCacheResults;
    this.UseCachedResults = useCachedResults;
    this.WebSessionId = webSessionId;
    this.DebugLevel = debug;
}

//Autosuggest Parameters Object
function AutosuggestParameters(queryText) 
{
    this.QueryText = queryText;
}

// End Search Parameters Object

function updateActiveFilter(filterItem, groupID) 
{
    removeItemsfromCollection(groupID);
    
    if(filterItem.FilterType == "DateRangeFilter")
    {
        ActiveFilterItems[ActiveFilterItems.length] = new aRangeFilterItem(groupID, filterItem.FilterStartValue, filterItem.FilterEndValue);
    }
    else 
    {
        ActiveFilterItems[ActiveFilterItems.length] = new aFilterItem(groupID, filterItem.FilterValue);
    }
}

//==============================================================================

searchAction.invalidquery =
    function (q) 
    {
        if(q == null || q.length == 0 || q.length > 200) 
        {
            alert("Queries must be between 1 and 200 characters. Please modify your query and try your search again.");
            return false;
        }

        var invalidCharacters = ["[", "]"];

        for(var x = 0; x < invalidCharacters.length; x++) 
        {
            if(q.indexOf(invalidCharacters[x]) != -1) 
            {
                alert("Query cannot contain brackets. Please modify your query and try your search again.");
                return false;
            }
        }

        return true;
    }

searchAction.preLoad =
    function ()
    {
        showLoading();
    }

    searchAction.postLoad =
    function ()
    {
        hideLoading();
    }

searchAction.run =
    function () 
    {}


var lastQueryText = "";
var lastResultView = 0

//reset all filter listings and page navigation for the search results
function doSearch(queryText, searchScope, searchSource, currentPage, pageLength, filterArray, sortOrder, resultView, doCacheResults, useCachedResults) 
{
    // invalid query handling
    if(!searchAction.invalidquery(queryText)) 
        return;

    searchAction.preLoad();

    if(
        (window.location.pathname.toLowerCase().indexOf("searchresults.aspx") == -1) ||
        (lastQueryText.length > 0 && (URLDecode(queryText) != lastQueryText)) ||
        (window.location.pathname.toLowerCase().indexOf("citation") > 0)
      ) 
    {
        var searchPage = "/searchresults.aspx?q={0}&t={1}&p={2}&s={3}&c=0";
    
        if (isMobile) searchPage = "/mobile" + searchPage;
        if (debug > 1) searchPage = searchPage + "&d=" + jQuery.url().param("d");
        if (jQuery.url().param("journalid") != "") searchPage = searchPage + "&journalid=" + jQuery.url().param("journalid");
        if (isNaN(currentPage)) currentPage = 1;
        
        var url = searchPage.format(escape(queryText), escape(searchScope), escape(currentPage), escape(searchSource));
        
        window.location.href = url;
    }
    else 
    {
        if (isNaN(parseInt(currentPage, 10))) currentPage = 1;
        if (isNaN(parseInt(pageLength, 10))) pageLength = 20;

        queryText = URLDecode(queryText);

        $("#queryText").val(queryText);
        $("#searchScope").val(searchScope);
        $("#currentPage").val(currentPage);
        $("#pageLength").val(pageLength);
        $('#txtSearchTerm').val(queryText);

        var sessionId = $('#sessionId').val();

        if (jQuery.url().param("s") == "19" && filterArray == null) {
            // for authorSearch from advSearch (s=19), add initial authorSearch contentTypeFilter
            filterArray = new Array();
            filterArray[0] = new aFilterItem("0", "u");
        } else if (jQuery.url().param("s") == "19") {
           filterArray[filterArray.length] = new aFilterItem("0", "u");
        } else if (jQuery.url().param("s") == "21" && filterArray == null) {
            // for figure search from advSearch (s=21), add initial figure search contentTypeFilter
            filterArray = new Array();
            filterArray[0] = new aFilterItem("0", "f");
        }

        var searchParams = new SearchParameters(queryText, searchScope, searchSource, currentPage, pageLength, filterArray, sortOrder, resultView, doCacheResults, useCachedResults, sessionId);
        
        $.when(doMainSearch(searchParams, resultView, searchScope, pageLength));

        lastQueryText = queryText;
        lastResultView = resultView;
    }
}

function doMainSearch(searchParams, resultView, searchScope, pageLength)
{
    var xhr = $.ajax
    (
        {
            type: "POST",
            url: "/Services/SearchService.svc/RunSearch",
            data: JSON.stringify(searchParams),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            processData: false,
            success:
                function (d, s, x) 
                {
                    var recordsLeft, remainingRecords, currentPage, pageLength;
                    var lowRecord, highRecord, resultsCount;
                    var nextPageLinkText, previousPageLinkText, shownResultsDescriptionText;
                    var x, y, searchResultsHtml, contentTypesFilterHtml, disambiguatedTermsHtml, noResultOptionsHtml;
                    var booksFilterHtml, journalsFilterHtml, articleTypesFilterHtml, topicsFilterHtml, dateRangeFilter;
                    
                    $(".filterSettings").empty();
                    $("#filterTplLoading").tmpl().appendTo(".filterSettings");

                    resultsCount = (d != null) ? d.ResultsCount : 0;

                    ActiveSortOrder = d.SortOrder

                    if(ActiveSortOrder == 0) 
                    {
                        $("#sortByBestMatchLink").addClass("selected");
                        $("#sortByMostRecentLink").removeClass("selected");
                    }
                    else 
                    {
                        $("#sortByBestMatchLink").removeClass("selected");
                        $("#sortByMostRecentLink").addClass("selected");
                    }

                    //Checking the calledback value for an error message. If so we will translate that into a usable message for the user.
                    if(d.ErrorMessage != null && d.ErrorMessage.length > 0) 
                    {
                        $(".resultsPerPage").hide();
                        
                        $("#searchResultsAd").html("<div class='message error'><p>An error has occurred with the search service, please try your search again later.</p><p>If the problem persists contact technical support.</p></div>");
                     
                        return;
                    }

                    //Clearing elements on the search results page in preparation for population with search results.
                    $('#searchword').html(d.QueryText);

                    //Adjusting the mask overlay height
                    $(".mask").css({ "top": $(".maskColumn").position().top + "px" });
                    
                    $(".searchContentContainer").html("");
                    $("#searchResultsAd").html("");
                    
                    $('#disambiguatedTermsSection').html("");

                    //----------------------------------------------------------

                    //Checking the calledback value for an error message. If so we will translate that into a usable message for the user.
                    if(d.InvalidQuery != null && d.InvalidQuery.length > 0) 
                    {
                        $(".resultsPerPage").hide();
                        
                        $("#searchResultsAd").html("<div class='message error'>" + d.InvalidQuery + "</div>");
                    
                        return;
                    }

                    //Checking the calledback value for a lack of search results. If there are no results, then 
                    //we will translate that into a usable message for the user.
                    if(d.SearchResults == null || d.SearchResults.length == 0) 
                    {
                        showHeaderFilters(d);
                        shownResultsDescriptionText = "<string>0</string> results"
                        $("#spnResults").html(shownResultsDescriptionText);

                        //Showing the no results message to the left of pillowAd
                        $("#searchResultsAd").html("<div class='message alert'><p style='color:black;'>No matches found. Please modify your search term and try again.</p></div>");

                        //$("#spnResults").hide();

                        $("#nextPage").hide();
                        $("#prevPage").hide();
                        $("#resultListHeader").hide();

                    }
                    else 
                    {
                        $(".filterBy").show();

                        currentPage = d.PageNumber;
                        pageLength = d.PageLength;
                        $("#currentPage").val(currentPage);
                        $("#pageLength").val(pageLength);

                        //Calculating the lower bound record index for the search results on the page.
                        lowRecord = ((parseInt(currentPage, 10) - 1) * parseInt(pageLength, 10)) + 1

                        //Calculating the upper bound record index for the search results on the page.
                        highRecord = lowRecord + parseInt(pageLength, 10) - 1;

                        //Ensuring the upper bound does not exceed the index for the last result in the search results.
                        if (highRecord > resultsCount) highRecord = resultsCount;

                        //Calculating the number of records after the current page's records.
                        recordsLeft = resultsCount - (currentPage * pageLength);

                        //Calculating the number of remaining records to show if there are less than 20.
                        remainingRecords = (recordsLeft > 19 ? 20 : recordsLeft);

                        nextPageLinkText = "Next {0} {1}";
                        previousPageLinkText = "Previous {0} {1}";
                        shownResultsDescriptionText = "Showing {0}-{1} of {2} results";

                        //Logging result set statistics to the console.
                        if (debug > 1) $().log("resultsCount: " + resultsCount + " remainingRecords: " + remainingRecords + " recordsLeft: " + recordsLeft + " lowRecord: " + lowRecord + " highRecord: " + highRecord);

                        if(remainingRecords <= 0) 
                        {
                            $("#nextPage").hide();
                        }
                        else 
                        {
                            $("#nextPage").html(nextPageLinkText.format(remainingRecords, "Results"));
                            $("#nextPage").show();
                        };

                        if(currentPage > 1) 
                        {
                            $("#prevPage").show();
                            $("#prevPage").html(previousPageLinkText.format(pageLength, "Results"));
                        }
                        else 
                        {
                            $("#prevPage").hide();
                        }

                        //Setting the values of the paging and record count string and placing them in an HTML element.
                        if(parseInt(resultsCount, 10) == 0) 
                        {
                            $("#spnResults").html("0 results");
                            $("#nextPage").hide();
                            $("#prevPage").hide();
                        }
                        else 
                        {
                            $("#spnResults").html(shownResultsDescriptionText.format(lowRecord, highRecord, resultsCount));
                        }

                        $("#spnResults,.resultsPerPage").show();

                        //loop results object to tpl
                        for(x = 0; x < d.SearchResults.length; ++x) 
                        {
                            (new ResultItem(d.SearchResults[x])).toResultHtml();
                        }

                        $("#spnResults,.resultsPerPage").show();
                    }

                    //----------------------------------------------------------

                    //Setting up the disambiguated terms section HTML from the DisambiguationOptions object
                    //of the SearchResults object.
                    disambiguatedTermsHtml = '';

                    //Setting up the HTML text for every disambiguated term.
                    if (d.DisambiguationOptions != null && d.DisambiguationOptions.length > 0) {
                        disambiguatedTermsHtml += 'Your query matches more than one term. Please select one of the following terms: ';

                        for (var i = 0; i < d.DisambiguationOptions.length; ++i) {
                            disambiguatedTermsHtml += '<a ';
                            disambiguatedTermsHtml += 'id="disambiguatedTermLink' + i + '" ';
                            disambiguatedTermsHtml += 'style="cursor: pointer;" ';
                            disambiguatedTermsHtml += 'onclick="doSearch(\'' + d.DisambiguationOptions[i].Term + '\', \'' + searchScope + '\', 14, 1, \'' + pageLength + '\', new Array(), ActiveSortOrder, ActiveResultView);" ';
                            disambiguatedTermsHtml += '>';
                            disambiguatedTermsHtml += d.DisambiguationOptions[i].Term;
                            if (i < d.DisambiguationOptions.length - 1) {
                                disambiguatedTermsHtml += '</a>; ';
                            } else {
                                disambiguatedTermsHtml += '</a>';
                            }
                        }
                    }

                    //Populating the Disambiguated Terms Section of the search results page with the disambiguated search terms.
                    $('#disambiguatedTermsSection').html(disambiguatedTermsHtml);

                    //----------------------------------------------------------

                    //Setting up the no results options section HTML from the NoResultOptions object
                    //of the SearchResults object.
                    noResultOptionsHtml = '';

                    //Setting up the HTML text for options given in the case of no results returned.
                    if (d.NoResultOptions != null && d.NoResultOptions.length > 0) {
                        noResultOptionsHtml += 'You may want to try one of the following terms for your search: ';

                        for (var i = 0; i < d.NoResultOptions.length; ++i) {
                            noResultOptionsHtml += '<a ';
                            noResultOptionsHtml += 'id="noResultOptionLink' + i + '" ';
                            noResultOptionsHtml += 'style="cursor: pointer;" ';
                            noResultOptionsHtml += 'onclick="doSearch(\'' + d.NoResultOptions[i].Term + '\', \'' + searchScope + '\', 15, 1, \'' + pageLength + '\', new Array(), ActiveSortOrder, ActiveResultView);" ';
                            noResultOptionsHtml += '>';
                            noResultOptionsHtml += d.NoResultOptions[i].Term;
                            if (i < d.NoResultOptions.length - 1) {
                                noResultOptionsHtml += '</a>; ';
                            } else {
                                noResultOptionsHtml += '</a>';
                            }
                        }
                    }

                    //Populating the No Result Options Section of the search results page with the no result search options.
                    $('#noResultOptionsSection').html(noResultOptionsHtml);

                    $("#fpFiltersAvailable").hide();
                    showHeaderFilters(d);

                    $(domReference.filterColumn).empty();

                    // get micrositeID
                    var micrositeId = parseInt($('#micrositeId').val());

                    for(x = 0; x < d.Filters.length; x++) 
                    {
                        filter = d.Filters[x];

                        switch(d.Filters[x].FilterType)
                        {
                            case "ContentTypeFilter":
                                    
                                if(micrositeId == 0) 
                                {
                                    // zw092911: show ContentTypeFilter only from umbrella site; always hide "clear"
                                    filter.clearShow = false;
                                    
                                    $("#filterSimpleList").tmpl(filter).appendTo(domReference.filterColumn);
                                }

                                filter.index = 0;

                                updateActiveFilter(filter, filter.index);

                                break;

                            case "JournalFilter":
                                    
                                filter.clearShow = !isNaN(parseInt(filter.FilterValue)); // use reverse true/false to reset value

                                if(micrositeId > 0) 
                                {
                                    // zw092911: for microsite, this is the top filter, so no "clear"
                                    filter.clearShow = false;
                                }

                                filter.index = 1;
                                    
                                updateActiveFilter(filter, filter.index);
                                    
                                $("#filterSimpleList").tmpl(filter).appendTo(domReference.filterColumn);

                                break;

                            case "BookFilter":
                                    
                                filter.clearShow = !isNaN(parseInt(filter.FilterValue)); // use reverse true/false to reset value
                                filter.index = 2;
                                    
                                updateActiveFilter(filter, filter.index);
                                    
                                $("#filterSimpleList").tmpl(filter).appendTo(domReference.filterColumn);
                                    
                                break;

                            case "ArticleTypeFilter":
                                    
                                filter.clearShow = !isNaN(parseInt(filter.FilterValue)); // use reverse true/false to reset value
                                filter.index = 3;
                                    
                                updateActiveFilter(filter, filter.index);
                                    
                                $("#filterSimpleList").tmpl(filter).appendTo(domReference.filterColumn);
                                    
                                break;

                            case "TopicFilter":
                                    
                                filter.clearShow = !isNaN(parseInt(filter.FilterValue)); // use reverse true/false to reset value
                                    
                                $("#filterCheckList").tmpl(filter).appendTo(domReference.filterColumn);
                                    
                                break;

                            case "DateRangeFilter":

                                if(isDate(filter.FilterStartValue) || isDate(filter.FilterEndValue)) 
                                {
                                    filter.index = 5;
                                    updateActiveFilter(filter, filter.index);
                                    filter.clearShow = true;
                                }

                                $("#filterDateRange").tmpl(filter).appendTo(domReference.filterColumn);
                                $("#fromDate1,#toDate1").datepicker();
                                    
                                filterDateRangeEvents();
                                    
                                break;
                        }
                    }

                    //Add view more functionality on simple list
                    $("ul.filterSimpleListItems li.viewMore").click
                    (
                        function () 
                        {
                            $(this).hide().nextAll().show();
                        }
                    ).nextAll().hide();

                    // hide filers if needed
                    hideFilters(searchScope);

                    headerPostion = $(".searchHeaderContentHolder").position();

                    if ($(window).scrollTop() > headerPostion.top)
                        $(window).scrollTop(headerPostion.top);

                    searchAction.postLoad();
                },

            error:
                function (xhr, ts, et) 
                {},

            complete:
                function (d) 
                {},

            beforeSend:
                function (xhr, s) 
                {}
        }
    );

}

function isDate(sDate) 
{
    var scratch = new Date(sDate);
    return (!(scratch.toString() == "NaN") && !(scratch.toString() == "Invalid Date"));
}

var maskWidgets = new Array("#Div1", "#Div2", "#Div5");

function showLoading() 
{
    if($(".mask").length > 0) 
    {
        var mask = { "width": $(".maskColumn").width(), "height": $(".maskColumn").height() };
        mask.position = $(".maskColumn").position();
        $(".mask").css({ "top": mask.position.top + "px", "left": mask.position.left + "px", "width": mask.width + "px", "height": mask.height + "px" });
        $(maskWidgets).each(function (i, selector) {
            if ($(selector + " div:last").hasClass("widgetMask") == 0) {
                $("<div class='widgetMask'></div>").appendTo($(selector));
                headerHeight = $(selector).find(".portlet-header").height() + 20;
            }
        });
        $(".mask,.widgetMask").fadeIn("slow");
    }
}

function hideLoading()
{
    // POL HEIGHT ADJUSTMENT
    $('.mainContainer').height($('.searchHeaderContentHolder').height() + $('.searchResultContainer').height() + 50);
    $('#leftFilterColumn').height($('.searchResultContainer').height() + 45);
    $("#pageLinks").show();
    $(".mask,.widgetMask").fadeOut("slow");
}

function toggleTopicFilter(o)
{
    $('.searchResultContainer').height('100%');
    $('#leftFilterColumn').height('100%');
    
    var thiS = $(o);

    if(o.checked) 
    {
        $("#topicSelected").val($("#topicSelected").val() + $(o).context.value + ',');
    }
    else 
    {
        var arr = $("#topicSelected").val().split(",");
        var newarr = '';

        for(var x = 0; x < arr.length - 1; x++) 
        {
            if (arr[x] != $(o).context.value) newarr = newarr + arr[x] + ',';
        }
        
        $("#topicSelected").val(newarr);
    }

    removeItemsfromCollection("4");
    
    if ($("#topicSelected").val().length > 0)
        ActiveFilterItems[ActiveFilterItems.length] = new aFilterItem("4", $("#topicSelected").val().slice(0, -1));
    
    $("#currentPage").val("1")
    
    doSearch($("#queryText").val(), $("#searchScope").val(), 6, $("#currentPage").val(), $("#pageLength").val(), ActiveFilterItems, ActiveSortOrder, ActiveResultView, true, false);
}

function showHeaderFilters(d) {
    // zw 092911: hide header filters
    return;
}

function showHeaderFiltersOld(d) 
{
    // old code for header filter
    var filterSelectedItems = "#headerFilterItems";
    var templateSelectedItem = "#filterSelectedItem";   
    var filterItem = {};

    $(filterSelectedItems).empty();

    for(var x = 0; x < d.Filters.length; x++) 
    {
        filterItem = {};

        switch(d.Filters[x].FilterType) 
        {
            case "OwnershipFilter": 
                break; // ignore as selected item in main header
        
            case "DateRangeFilter":
                if(isDate(d.Filters[x].FilterStartValue) && isDate(d.Filters[x].FilterEndValue)) 
                {
                    filterItem.type = d.Filters[x].FilterType;
                    filterItem.name = d.Filters[x].FilterStartValue + "-" + d.Filters[x].FilterEndValue;
                    $(templateSelectedItem).tmpl(filterItem).appendTo(filterSelectedItems);
                }
                
                break;
            
            default:
                for(var y = 0; y < d.Filters[x].FilterOptions.length; y++) 
                {
                    filterItem = {};

                    if(d.Filters[x].FilterOptions[y].ItemChecked == "1" || d.Filters[x].FilterOptions[y].ItemValue == d.Filters[x].FilterValue) 
                    {
                        filterItem.type = d.Filters[x].FilterType;
                        filterItem.name = d.Filters[x].FilterOptions[y].ItemCaption.split(" (")[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
                        filterItem.value = d.Filters[x].FilterOptions[y].ItemValue    // this is passed on mainly for Topic item filter
                        $(templateSelectedItem).tmpl(filterItem).appendTo(filterSelectedItems);
                    }
                }
                
                break;
        }

    }

    if($(filterSelectedItems).children().length > 0) 
        $("<li style='width:auto;'><a href='javascript:clearAllFilters();'>Clear All</a></li>").appendTo(filterSelectedItems);
}

function clearFilter(o, termId) 
{
    var filterType, itemType, searchSource;
    filterType = JSON.parse(FilterItemType);
    itemType = '';
    termId = !termId ? null : termId;

    $('.searchResultContainer').height('100%');
    $('#leftFilterColumn').height('100%');

    $.each
    (
        filterType,
        function (jsonKey, jsonValue) 
        {
            if (jsonKey == o) itemType = jsonValue;
        }
    );

    switch(itemType) 
    {
        case "0": //ContentTypeFilter
            removeItemsfromCollection([itemType, 1, 2, 3]);
            searchSource = 2;
            break;

        case "1": //JournalFilter
            removeItemsfromCollection([itemType, 3]);
            searchSource = 3;

            if ((jQuery.url().param("s") == "19" || jQuery.url().param("s") == "20" || jQuery.url().param("s") == "21") && (jQuery.url().param("t").indexOf(",") > 0)) {
                // if search comes from advSearch with multi-journal selection, use the "t" from queryString to reset searchScope
                $("#searchScope").val(jQuery.url().param("t"));
            } else {
                //reset search scope to all journals, this only applies to umbrella search starts with one particular journal from dropdown
                $("#searchScope").val('J*');
            }

            break;

        case "2": //BookFilter

            removeItemsfromCollection(itemType);
            searchSource = 4;

            if ((jQuery.url().param("s") == "19" || jQuery.url().param("s") == "20" || jQuery.url().param("s") == "21") && (jQuery.url().param("t").indexOf(",") > 0)) {
                // if search comes from advSearch with multi-book selection, use the "t" from queryString to reset searchScope
                $("#searchScope").val(jQuery.url().param("t"));
            } else {
                //zw reset search scope to all books, this only applies to umbrella search starts with one particular book from dropdown
                $("#searchScope").val('B*');
            }

            break;

        case "3": //ArticleTypeFilter
            removeItemsfromCollection(itemType);
            searchSource = 5;
            break;

        case "4": //TopicFilter
            removeItemsfromCollection(itemType);

            if(termId != '' && termId != null) 
            {
                var arr = $("#topicSelected").val().split(",");
                var newarr = '';

                for(var x = 0; x < arr.length - 1; x++) 
                {
                    if (arr[x] != termId) newarr = newarr + arr[x] + ',';
                }
                
                $("#topicSelected").val(newarr);
                ActiveFilterItems[ActiveFilterItems.length] = new aFilterItem(itemType, newarr.slice(0, -1));
            }
            else 
            {
                $("#topicSelected").val('');
            }
            
            searchSource = 6;
            break;

        case "5": //DateRangeFilter
            removeItemsfromCollection(itemType);
            searchSource = 7;
            break;

        case "6": //OwnershipFilter

        default:
            searchSource = 0;
            break;
    }

    $("#currentPage").val("1")

    doSearch($("#queryText").val(), $("#searchScope").val(), searchSource, $("#currentPage").val(), $("#pageLength").val(), ActiveFilterItems, ActiveSortOrder, ActiveResultView, true, false);
}

function clearAllFilters() 
{
    for (var x = 0; x < 7; x++)
        removeItemsfromCollection(x);

    $("#topicSelected").val('');
    $("#currentPage").val('1');

    doSearch($("#queryText").val(), $("#searchScope").val(), 16, $("#currentPage").val(), $("#pageLength").val(), ActiveFilterItems, ActiveSortOrder, ActiveResultView, true, false);
}

function filterDateRangeEvents() 
{
    $('#fpDateRange').find("#clearDateRange").click
    (
        function () 
        {
            clearFilter('DateRangeFilter');
        }
    );

    $('#fromDate1').focus
    (
        function (o) 
        {
            if (this.value == 'mm/dd/yyyy') this.value = '';
        }
    );

    $('#toDate1').focus
    (
        function (o) 
        {
            if (this.value == 'mm/dd/yyyy') this.value = '';
        }
    );

    $('.applyButton').click
    (
        function (o) 
        {
            $('#dateRangeErrorMessagePanel').text('');

            if(!$('#fromDate1').val() || $('#fromDate1').val() == 'mm/dd/yyyy') 
            {
                $('#fromDate1').focus();
                $('#dateRangeErrorMessagePanel').text('Please specify a start date.');
            }
            else if(!$('#toDate1').val() || $('#toDate1').val() == 'mm/dd/yyyy') 
            {
                $('#toDate1').focus();
                $('#dateRangeErrorMessagePanel').text('Please specify an end date.');
            }
            else if(!isValidDate($('#fromDate1').val())) 
            {
                $('#dateRangeErrorMessagePanel').text('Invalid start date specified.');
            }
            else if(!isValidDate($('#toDate1').val())) 
            {
                $('#dateRangeErrorMessagePanel').text('Invalid end date specified.');
            }
            else if(new Date($('#fromDate1').val()).getTime() > new Date($('#toDate1').val()).getTime()) 
            {
                $('#dateRangeErrorMessagePanel').text('The start date must be equal to or earlier than the End Date.');
            }
            else if(new Date($('#fromDate1').val()).getTime() <= new Date($('#toDate1').val()).getTime()) 
            {
                $(this).parents('#selectDateRange').find('.displayDateRange').html("<ul><li>" + $('#fromDate1').val() + "-" + $('#toDate1').val() + "</li></ul>").show();
                $('.dateRange').hide();
                
                removeItemsfromCollection("5");
                
                ActiveFilterItems[ActiveFilterItems.length] = new aRangeFilterItem("5", $('#fromDate1').val(), $('#toDate1').val());
                
                $("#currentPage").val('1');
                doSearch($("#queryText").val(), $("#searchScope").val(), 7, $("#currentPage").val(), $("#pageLength").val(), ActiveFilterItems, ActiveSortOrder, ActiveResultView, true, false);
            }
        }
    );
}

$(document).ready
(
    function () 
    {
        if($.getUrlVar('q') != null) 
            $('input[name$="txtSearchTerm"]').val(unescape($.getUrlVar('q')));
        
        $('#ddlGroup option[value="' + jQuery.url().param('t') + '"]').attr('selected', 'selected');

        $('#sortByBestMatchLink').click
        (
            function (o) 
            {
                ActiveSortOrder = 0;
                $("#currentPage").val("1");
            
                doSearch($("#queryText").val(), $("#searchScope").val(), 10, $("#currentPage").val(), $("#pageLength").val(), ActiveFilterItems, ActiveSortOrder, ActiveResultView, true, false);
            
                $("#sortByBestMatchLink").addClass("selected");
                $("#sortByMostRecentLink").removeClass("selected");
            }
        )

        $('#sortByMostRecentLink').click
        (
            function (o) 
            {
                ActiveSortOrder = 1;
                $("#currentPage").val("1");
            
                doSearch($("#queryText").val(), $("#searchScope").val(), 11, $("#currentPage").val(), $("#pageLength").val(), ActiveFilterItems, ActiveSortOrder, ActiveResultView, true, false);
            
                $("#sortByMostRecentLink").addClass("selected");
                $("#sortByBestMatchLink").removeClass("selected");
            }
        )

        $("#nextPage").unbind('click').click
        (
            function () 
            {
                var currentPage = parseInt($("#currentPage").val(), 10) + 1;
            
                if (currentPage < 2)
                    $("#prevPage").hide();
                else 
                {
                    var pp = "Previous {0} {1}";
                    $("#prevPage").html(pp.format(20, "Results"));
                    $("#prevPage").show();
                }
                
                $("#currentPage").val(currentPage);
                doSearch($("#queryText").val(), $("#searchScope").val(), 9, $("#currentPage").val(), $("#pageLength").val(), ActiveFilterItems, ActiveSortOrder, ActiveResultView, true, false);
            }
        );

        $("#prevPage").unbind('click').click
        (
            function () 
            {
                var currentPage = parseInt($("#currentPage").val(), 10) - 1;
            
                if (currentPage < 2)
                    $("#prevPage").hide();
                else
                    $("#prevPage").show();
            
                $("#currentPage").val(currentPage)
                doSearch($("#queryText").val(), $("#searchScope").val(), 8, $("#currentPage").val(), $("#pageLength").val(), ActiveFilterItems, ActiveSortOrder, ActiveResultView, true, false);
            }
        );
    }
);


function hideFilters(searchScope) {

    //Getting the searchType -- "j" for journals; "b" for books
    var searchType = searchScope.charAt(0).toLowerCase();

    //Checking if the searchType is for books
    if(searchType == "b") 
    {
        //Hiding the Date Range Filter & Sort By Date option
        $("div#fpDateRange").hide();
        $("span#spnResultsSortBy").hide();
    }
    else 
    {
        $("div#fpDateRange").show();
        $("span#spnResultsSortBy").show();
    }

    //Hiding the contentTypeFilter for microsites
    if(searchScope.toLowerCase() != searchType + "*") 
    {
        $("div#fpContentTypeFilter").hide();
    }
}