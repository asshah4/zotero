//SOLR Global Functions:

//DSM Search
function doDSMSolrSearch(queryText, isMobile) {
    var searchMaxAllowChars = ($("#hfSolrMaxAllowSearchChar") ? $("#hfSolrMaxAllowSearchChar").val() : null);
    //Search DSM
    if (($.trim(queryText) == "") || (queryText == null) || (queryText == "Search DSM")) {
        alert('Please enter a term to search');
        return false;
    } else if (searchMaxAllowChars != null && queryText.length > 1 && queryText.length > parseInt(searchMaxAllowChars)) {
        alert("Please enter a search term containing 1 to " +searchMaxAllowChars+" characters");
        return false;
    }

    var urlPrefix = '';
    urlPrefix = isMobile == true ? "/mobile/solrSearchResults.aspx" : "/solr/searchresults.aspx";
    
    //ToDo:There is no reason to tag BookDisplayNames
    var booksIdParms = "&restypeid=1&fl_IsDsmBook=true&SearchSourceType=1";

    queryText = encodeURIComponent(queryText);

    window.location.href = urlPrefix + "?q=" + queryText + booksIdParms;

}

//Do Search
function doSolrSearch(queryText, searchScope, isMobile) {
    var searchMaxAllowChars = ($("#hfSolrMaxAllowSearchChar") ? $("#hfSolrMaxAllowSearchChar").val() : null);
    //ToDo:Revisit this validation check when book search is implemented. we can probably combine book validation or handle them differently.
    if (($.trim(queryText) == "") || (queryText == null) || (queryText == "Enter Search Term" || queryText == "Search PsychiatryOnline" || queryText == "Search Journal" || queryText == "Search News")) {
        alert('Please enter a term to search');
        return false;
    } else if (searchMaxAllowChars != null && queryText.length > 1 && queryText.length > parseInt(searchMaxAllowChars)) {
        alert("Please enter a search term containing 1 to " + searchMaxAllowChars + " characters");
        return false;
    }
    
    //Check if this is Journal or Book
    var resourcePrefix = searchScope.substr(0, 1).toUpperCase();

    queryText = encodeURIComponent(queryText);

    switch (resourcePrefix) {
        case 'J':       //Journal
            searchJournals(queryText, searchScope, isMobile);
            break;
        case 'B':       //Book
            //ToDo:Implement this feature
            searchBooks(queryText, searchScope, isMobile);
            break;
        default:
            //default to Journals
            searchJournals(queryText, searchScope, isMobile);
            break;
    }
}

//SOLR: Perform search against Journals
function searchJournals(queryText, journalId, isMobile) {

    //alert('MOBILE ' + isMobile);
    var urlPrefix = '';
    urlPrefix = isMobile == true ? "/mobile/solrSearchResults.aspx" : "/solr/searchresults.aspx";

    var journalMappings = [["J13", "The American Journal of Psychiatry"],
                                ["J17", "Academic Psychiatry"],
                                ["J18", "Psychiatric Services"],
                                ["J21", "FOCUS"],
                                ["J61", "Psychiatric News"],
                                ["J62", "The Journal of Neuropsychiatry and Clinical Neurosciences"]];

    if (journalId == null || journalId == '' || journalId == "J*") {
        //No Journal is specified - Search is done across all journals.
        //for Stats purposes, we need to pass in all the journalIDs.
        //STATS:instead of passing in all the Journal IDs, just pass allJournals=1 in the querystring
        var journalIdParms = "&allJournals=1&restypeid=3";
        if ($("#hiddenGlobalSearchSiteURL").val() == undefined) {
            //window.location.href = "/solr/searchresults.aspx?q=" + queryText + journalIdParms; //+ boostQueryParm; //new
            window.location.href = urlPrefix + "?q=" + queryText + journalIdParms + "&SearchSourceType=1"; //+ boostQueryParm; //new
        } else {
            //window.location.href = $("#hiddenGlobalSearchSiteURL").val() + "solr/searchresults.aspx?q=" + queryText + journalIdParms + "&SearchSourceType=1";  
            window.location.href = $("#hiddenGlobalSearchSiteURL").val() + urlPrefix + "?q=" + queryText + journalIdParms + "&SearchSourceType=1";  
        }

    } else {
        //microsite
        var journalIdParm = "&fd_JournalID=" + journalId.substr(1, journalId.length); //new

        //For ArticleType Facet to display and because of the dependency between facets [ArticleTypeDisplayName] and [JournalDisplayName], we must pass JournalDisplayName as well!
        var journalDisplayName = "";
        // = [ToDo:To identify an item based on a key, find a better way to avoid the loop! JQuery's grep function or other alternatives?
        for (var index = 0; index < journalMappings.length; index++) {
            if (journalMappings[index][0] == journalId) {
                journalDisplayName = journalMappings[index][1];
                break;
            }
        }

        //Encode the JournalDisplayName to make sure DisplayNames which have "&" or "-" or other characters are intrepreted correctly.
        var journalFacetName = "&f_JournalDisplayName=" + encodeURIComponent(journalDisplayName);

        //window.location.href = "/solr/searchresults.aspx?q=" + queryText + journalIdParm + journalFacetName + "&SearchSourceType=3"; //  + boostQueryParm; //new
        window.location.href = urlPrefix + "?q=" + queryText + journalIdParm + journalFacetName + "&SearchSourceType=3"; //  + boostQueryParm; //new
    }
}

//SOLR: Perform search against Book
function searchBooks(queryText, bookId, isMobile) {
    
    var urlPrefix = '';
    urlPrefix = isMobile == true ? "/mobile/solrSearchResults.aspx" : "/solr/searchresults.aspx";

    //List of Books that are searchable.
    var bookMappings = [["B2", "Manual of Clinical Psychopharmacology"],
                        ["B3", "The American Psychiatric Publishing Textbook of Psychiatry"],
                        ["B4", "Gabbard's Treatments of Psychiatric Disorders"],
                        ["B19", "The American Psychiatric Publishing Textbook of Geriatric Psychiatry"],
                        ["B20", "Cases From DSM-IV-TR® Casebook and Its Treatment Companion"],
                        ["B21", "DSM-IV-TR® Handbook of Differential Diagnosis"],
                        ["B22", "DSM-IV-TR® Diagnostic and Statistical Manual of Mental Disorders"],
                        ["B23", "Helping Parents, Youth, and Teachers Understand Medications"],
                        ["B24", "Dulcan's Textbook of Child and Adolescent Psychiatry"],
                        ["B25", "Textbook of Psychotherapeutic Treatments"],
                        ["B26", "The American Psychiatric Publishing Textbook of Substance Abuse Treatment"],
                        ["B27", "What Your Patients Need to Know About Psychiatric Medications"],
                        ["B28", "APA Practice Guidelines"],
                        ["B29", "The American Psychiatric Publishing Textbook of Psychopharmacology"],
                        ["B30", "Textbook of Traumatic Brain Injury"],
                        ["B556", "Diagnostic and Statistical Manual of Mental Disorders, 5th Edition"]];

    //Check if global book search or single book search
    if (bookId == null || bookId == '' || bookId == "B*") {
        //Search All Books
        var bookIdParms = "&allBooks=1&restypeid=1";

        if ($("#hiddenGlobalSearchSiteURL").val() == undefined) {
            window.location.href = urlPrefix + "?q=" + queryText + bookIdParms + "&SearchSourceType=1";
        } else {
            window.location.href = $("#hiddenGlobalSearchSiteURL").val() + urlPrefix + "?q=" + queryText + bookIdParms + "&SearchSourceType=1";
        }
    } else {
        //Specific Book Search
        var bookIdParm = "&restypeid=1&fd_BookID=" + bookId.substr(1, bookId.length);
        window.location.href = urlPrefix + "?q=" + queryText + bookIdParm;

        var bookDisplayName = "";
        for (var index = 0; index < bookMappings.length; index++) {
            if (bookMappings[index][0] == bookId) {
                bookDisplayName = bookMappings[index][1];
                break;
            }
        }

        //ToDo:There is no reason to tag BookDisplayNames:
        //Encode the JournalDisplayName to make sure DisplayNames which have "&" or "-" or other characters are intrepreted correctly.
        var bookFacetName = "&f_BookDisplayName=" + encodeURIComponent(bookDisplayName);

        window.location.href = urlPrefix + "?q=" + queryText + bookIdParm + bookFacetName + "&SearchSourceType=3"; //
    }
}