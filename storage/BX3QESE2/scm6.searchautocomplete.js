var solrURL = "/solr/SolrSearchAutoSuggest"; // This needs to go into the web.config
var siteRootUrl = window.location.protocol + '//' + window.location.host; // This variable should replace baseURL below.
var isBookSearch = false;
var isJournalSearch = false;
var isAllJournals = false;
var isAllBooks = false;
var solrSwitch = $("#hfIsSolrSearchEnabled").val();
var isSolrSearchEnabled = false;
isSolrSearchEnabled = solrSwitch == "1" ? true : false;
var isDsmPage = $("#hfIsDsmBook").val() == 'true'?true:false;

var minCharsRequiredForAutoSuggest = $("#hfSolrAutoSuggestMinimumCharactersLength").val();

function bind(scope, fn) {
    return function () {
       // alert("change");
        fn.apply(scope, arguments);
    };
}

// Auto Complete Class
function AutoCompleteWidget(searchInputControlId, searchInputHintControlId, autoCompleteResultsControlId, isMicrosite, siteFilterDropDownSelectID) {
  this.searchInputControlId = document.getElementById(searchInputControlId);
  this.searchInputHintControlId = document.getElementById(searchInputHintControlId);
  this.autoCompleteResultsControlId = document.getElementById(autoCompleteResultsControlId);
  this.isMicrosite = isMicrosite;
   // alert(siteFilterDropDownSelectID);
  
    this.siteFilterDropDownSelectID = document.getElementById(siteFilterDropDownSelectID) == null ? null : document.getElementById(siteFilterDropDownSelectID);
     //   alert(siteFilterDropDownSelectID);
     // alert(this.siteFilterDropDownSelectID);
   if(siteFilterDropDownSelectID !== null && this.siteFilterDropDownSelectID !== null) {
      var selectedContentId = $(this.siteFilterDropDownSelectID, 'option:selected').attr('value');
      if (selectedContentId.indexOf('*') > -1 && selectedContentId.indexOf("J") > -1) {
          isAllJournals = true;
      } else if (selectedContentId.indexOf('*') > -1 && selectedContentId.indexOf("B") > -1) {
          isAllBooks = true;
      }
    if(this.siteFilterDropDownSelectID) {
        this.siteFilterDropDownSelectID.addEventListener("change", bind(this, this.filterSuggestions), false);
    }
  } else {
     // alert("hi");
    this.siteFilterDropDownSelectID = false;
  }

  //event Listeners
  if(this.searchInputControlId !==null) {
    this.searchInputControlId.addEventListener("keydown", bind(this, this.interceptKeys), false);
    this.searchInputControlId.addEventListener("input", bind(this, this.evaluateTerms), false);
  }
};

AutoCompleteWidget.prototype = {
    solrUrl: solrURL,
    baseURL: siteRootUrl,
    inputTerms: false,
    termsArray: false,
    baseTerms: false,
    terms: false,
    results: [],
    selectedResult: -1,
    contentID: false,
    isSearching: false,
    noResultsFound: false
};

AutoCompleteWidget.prototype.filterSuggestions = function() {
   this.selectedResult = -1; // Reset location in drop down list
    if (this.siteFilterDropDownSelectID) {
        isAllJournals = false;
        isAllBooks = false;
        var selectedContentId = $(this.siteFilterDropDownSelectID, 'option:selected').attr('value');
      if (selectedContentId.indexOf('*') > -1 && selectedContentId.indexOf("J") > -1) {
          isAllJournals = true;
      } else if (selectedContentId.indexOf('*') > -1 && selectedContentId.indexOf("B") > -1) {
          isAllBooks = true;
      }
    }
     
    // If we have something typed in, go ahead and get suggestions
    if(this.inputTerms.length >= minCharsRequiredForAutoSuggest) {
        this.getSuggestions();
    }
};


//evaluate Terms
AutoCompleteWidget.prototype.evaluateTerms = function() {
  this.resetSelection();
  this.inputTerms = this.searchInputControlId.value.toLowerCase();

  // No search terms. Clear autosuggest / autocomplete out.
  if (this.inputTerms.length === 0) {
    this.noResultsFound = false; // Reset flag so user can try to get suggestions
    this.isSearching = false; // If the user clears their input, then let them try a new search
	this.resetAutoComplete();
	return;
  }
  
  // If the user has typed in more than one character AND
  // 1) we have no results OR
  // 2) We have results, but the user's input has deviated from the first suggestion
  // Go ahead and get a new list of suggestions
  if( this.inputTerms.length >= minCharsRequiredForAutoSuggest && (this.results.length === 0 || this.results[0].value.indexOf(this.inputTerms) === -1) && !this.noResultsFound && !this.isSearching  ) {
    this.getSuggestions();
  }

  if (this.terms.length <= 1 || this.searchInputControlId.value !== this.inputTerms) {
	this.clearHint();
  }
  
};

AutoCompleteWidget.prototype.getJournalURL = function(journalID, journalDisplayName, searchSourceType) {
    if (isJournalSearch) {
        //alert("journals");
        return 'f_JournalDisplayName=' + encodeURIComponent(journalDisplayName.trim()) + searchSourceType +"&restypeid=3";
    } else if(isBookSearch) {
       // alert("books");
        return 'f_BookDisplayName=' + encodeURIComponent( journalDisplayName.trim()) + searchSourceType + "&restypeid=1";
    }
   
};

// Get parameters for main / microsite search query
AutoCompleteWidget.prototype.getJournalParams = function() {
    var searchSourceType = "&SearchSourceType=24"; // SOLRAutoSuggest
   // alert(searchSourceType);
    if (this.siteFilterDropDownSelectID && this.contentID) {
        var journalDisplayName = $('#' + this.siteFilterDropDownSelectID.id +  ' option:selected').text();

       // alert(journalDisplayName);

        return this.getJournalURL(this.contentID,journalDisplayName,searchSourceType);

    }
    
       if(this.isMicrosite && this.contentID) {
           if (isDsmPage) {
               return ("fl_IsDsmBook=true&restypeid=1" +searchSourceType);
           } else {
             var journalDisplayName = $('#hfSolrMicrositeDisplayName').val();
            return this.getJournalURL(this.contentID,journalDisplayName,searchSourceType);          
           }
    }

    if (this.siteFilterDropDownSelectID) {
        if (isAllJournals) { // We want everything; we don't have a specific journal ID right now.
            return ('allJournals=1' + searchSourceType + "&restypeid=3");
        } else if (isAllBooks) {
            return ('allBooks=1' + searchSourceType + "&restypeid=1");
        }
    } else {
        return ('allJournals=1' + searchSourceType + "&restypeid=3");
    }
};

AutoCompleteWidget.prototype.getJournalID = function() {
   var journalID = this.contentID;
   // Parse out j if we have one at start of ID
   if(journalID && (journalID.toLowerCase().substring(0,1) ==='j')) {
       isJournalSearch = true;
       journalID = journalID.substring(1);
   }else if (journalID && (journalID.toLowerCase().substring(0,1) == 'b')) {
       isBookSearch = true;
       journalID = journalID.substring(1);
   }

   return journalID;
};

AutoCompleteWidget.prototype.getJournalJID = function() {
    var journalID = false;
    
    // User on microsite
    if (this.isMicrosite) {
        if($('#hfSolrJournalID').val()) {
            journalID = $('#hfSolrJournalID').val();
        } else if ($('#hfSolrBookID').val()) {
            journalID = $('#hfSolrBookID').val();
        }
    }

    // From site filter
    if (this.siteFilterDropDownSelectID) {
        var jID = $(this.siteFilterDropDownSelectID, 'option:selected').attr('value');
        if(jID.indexOf("*") === -1) { // We want everything; we don't have a specific journal ID right now.
           journalID = jID;
        }
    }
    
    if (journalID) {
         isJournalSearch = false;
         isBookSearch = false;
        var contentId = journalID;
            if(contentId && (contentId.toLowerCase().substring(0,1) ==='j')) {
               isJournalSearch = true;
               //alert("journal");
               journalID = contentId.substring(1);
           }else if (contentId && (contentId.toLowerCase().substring(0,1) == 'b')) {
               isBookSearch = true;
               //alert("book");
               journalID = contentId.substring(1);
           }  
    }
      
  return journalID;
};


//Get Suggestions
AutoCompleteWidget.prototype.getSuggestions = function() {
  var self = this;
  self.contentID = self.getJournalJID(); // Returns j[ID] or false
  self.isSearching = true;
    var contentFieldName = "";
    var contentFiledValue = "";
    var restypeid = isJournalSearch ? "3":"1";
    if (self.isMicrosite || self.contentID) {
        if (isJournalSearch) {
            contentFieldName = "fl_JournalID";
            contentFiledValue = self.contentID;
        } else {
            if (isDsmPage) {
                contentFieldName = "fl_IsDsmBook";
                contentFiledValue = "true";
            } else {
                contentFieldName = "fl_BookID";
                contentFiledValue = self.contentID;
            }
        }
    }
    var myObj = {};
    if (self.isMicrosite || self.contentID) {
       myObj = {
        "q": self.inputTerms,
        "restypeid": restypeid
    };
        myObj[contentFieldName] = contentFiledValue;
    } else {
        if (this.siteFilterDropDownSelectID) {
                myObj = {
                    "q": self.inputTerms,
                    "restypeid": restypeid
                };
            }
         else {
                 myObj = {
                 "q": self.inputTerms
                };
        }
    }
 

  $.ajax({
	url: self.solrUrl,
	data: myObj,
	success: function(data) {
	    myObj = {};
	  var suggestionData = data.SemanticFilterTopics;
      self.isSearching = false;
	  if (suggestionData.length > 0) {
		self.formatSuggestions(suggestionData);
	  } 
	  else {
        self.noResultsFound = true; // At this point, the user's input didn't find any suggestions. In theory, anything additionally added to their existing search string won't produce results either.
		self.resetAutoComplete();
	  }
	},
	cache: true
  }); 
};

//Format Suggestions
AutoCompleteWidget.prototype.formatSuggestions = function (suggestionData) {
  var suggestions = suggestionData;
  this.results = [];
		
  if(suggestions.length > 0) {
    // Check to see if the user's input changed since we did auto-suggest, and if so, see if it is still relevant
    if(this.inputTerms && suggestions[0].Key.indexOf(this.inputTerms) !== -1) {
	    for (var i=0; i < suggestions.length; i+=1) {
	      var result = { 
		    value: suggestions[i].Key,
		    url: this.baseURL + "/solr/searchresults.aspx?q=" + encodeURIComponent(suggestions[i].Key) + "&" + this.getJournalParams(),
		    position: 'sr' + this.autoCompleteResultsControlId.id + (i + 1),
	      };

          this.results.push(result);
	    };
	
	    this.setHint(suggestions[0].Key);
	    this.appendResults();
    } else {
        // If we are here, the user's input is different such that the suggestion is now invalid
        // Try another query against auto-complete as long as we had some suggestions
        if(!this.noResultsFound && !this.inputTerms) {
            this.getSuggestions();
        }
    }
  }
  else {
	this.resetAutoComplete();
  }
};

//Set Hint
AutoCompleteWidget.prototype.setHint = function(h) {
  if (this.searchInputControlId.value === this.inputTerms) {
	this.searchInputHintControlId.value = h;
  }
};

//Clear Hint
AutoCompleteWidget.prototype.clearHint = function() {
  this.searchInputHintControlId.value = '';
};

//append results
AutoCompleteWidget.prototype.appendResults = function () {
  var listItems = '';

  if ( this.autoCompleteResultsControlId.className !== "term-list") {
	this.autoCompleteResultsControlId.className = "term-list";
  }
  
  for (var i=0; i < this.results.length; i++) {
      var result = this.results[i],
          formattedResult = '<li>'
              + '<a href="'
              + result.url
              + '" id="'
              + result.position
              + '">'
              + this.results[i].value
              + '</a></li>';
	
	listItems += formattedResult;
  }

  this.autoCompleteResultsControlId.innerHTML = listItems;
  
};

//result set list
AutoCompleteWidget.prototype.resetResultsList = function() {
  this.autoCompleteResultsControlId.innerHTML = '';
  this.autoCompleteResultsControlId.className = "term-list hidden";
};

//resetSelection
AutoCompleteWidget.prototype.resetSelection = function() {
  var oldResultId = this.selectedResult !== -1 ? this.results[this.selectedResult].position : false;

  oldResultId ? $('#'+oldResultId).removeClass('active') : false;
  this.selectedResult = -1;  
};

//
AutoCompleteWidget.prototype.resetAutoComplete = function() {
  this.resetResultsList();
  this.results = [];
  this.clearHint();
};

AutoCompleteWidget.prototype.completeTerms = function() {
  var start = this.searchInputControlId.selectionStart,
	  end = this.searchInputControlId.selectionEnd,
	  cursorAtEnd = start === end && end === this.inputTerms.length ? true : false;

  if (cursorAtEnd && this.results && this.results.length > 0) {
	this.searchInputControlId.value = this.results[0].value;  
	this.evaluateTerms();
  }
};

//navigateResults
AutoCompleteWidget.prototype.navigateResults = function (move) {
  var newSelection = this.selectedResult + move;
	  oldResultId = this.selectedResult !== -1 ? this.results[this.selectedResult].position : false;
  if (newSelection < this.results.length && newSelection > -1) {
	var newResultId = this.results[newSelection].position;

	oldResultId ? $('#'+oldResultId).removeClass('active') : false;
	$('#'+newResultId).addClass('active');
	
	this.selectedResult += move;
  } 
  else {
    if( !oldResultId && this.results.length > 0) { // Allow user to cycle through suggestions going up
        var newResultId = this.results[(this.results.length - 1)].position;
        $('#'+newResultId).addClass('active');
        this.selectedResult = (this.results.length - 1);
    } else {
	    this.resetSelection();
    }
  }
};
	

// Key Functions
AutoCompleteWidget.prototype.keyFunctions = function(e,keyCode) {

    // Right Arrow or Tab
    if(keyCode === 39 || keyCode === 9) {
        e.preventDefault();
        this.completeTerms();
    }

    // Up Arrow
    if(keyCode === 38) {
        e.preventDefault();
        this.navigateResults(-1);
    }

    // Down Arrow
    if(keyCode === 40) {
        e.preventDefault();
        this.navigateResults(1);   
    }

    // Enter
    if(keyCode === 13) {
        if (this.selectedResult > -1) {
          e.preventDefault();
          var url = $('#' + this.autoCompleteResultsControlId.id + ' .active').attr('href');
          if((autoSuggestRunning!==undefined) && (autoSuggestRunning !==null) && (url !== undefined)) {
            this.searchInputControlId.value = $('#' + this.autoCompleteResultsControlId.id + ' .active').text();
            this.searchInputHintControlId.value = $('#' + this.autoCompleteResultsControlId.id + ' .active').text();  
            autoSuggestRunning = true;

            window.location = url;
          }

	    }
    }
};	

//interceptKeys
AutoCompleteWidget.prototype.interceptKeys = function(e) {
   var userInput = this.searchInputControlId.value.toLowerCase();

   // Check user's current input to see if they have already reached the limit
   // If so, don't bother doing anything.
   if( userInput.length <= 255) {
      this.keyFunctions(e,e.keyCode);
   }
};
var mainSiteAutoCompleteSuggest = null;

var mainSiteAutoCompleteSuggest = null;

var microSiteAutoCompleteSuggest = null;

if ($.browser.msie && $.browser.version === "8.0") {
    $('#umbrellaSiteSearchInputHint').hide();
    $('#topNavSearchInputHint').hide();
    $('#microSiteSearchInputHint').hide();

    $('#umbrellaSiteAutoCompleteResults').hide();
    $('#topNavSearchAutoCompleteResults').hide();
    $('#microSiteAutoCompleteResults').hide();
} else {
  
    if (isSolrSearchEnabled) {
          
    // Search when on umbrella site
    mainSiteAutoCompleteSuggest = new AutoCompleteWidget("globalHeader_txtSearchTerm","umbrellaSiteSearchInputHint","umbrellaSiteAutoCompleteResults",false,'ddlGroup');

    // "Global" (top navigation) search when on microsite
    mainSiteAutoCompleteSuggest = new AutoCompleteWidget("journalHeader_txtSearchTerm2","topNavSearchInputHint","topNavSearchAutoCompleteResults",false,null);

    // Microsite Search when on microsite
    microSiteAutoCompleteSuggest = new AutoCompleteWidget("journalHeader_txtSearchTerm","microSiteSearchInputHint","microSiteAutoCompleteResults",true,null);    
    }
    
}