// Custom Tracking Code v2.0
//   * From Other Journals - search results page, track impressions/clicks
//   * Only pull impressions for Related Articles on article page that are in view
//      - Track others that aren't when "View More" clicked
//   * Add delay to window.gaTrackEvent function
//   * Keep DOI in mind for connecting page views to events for articles

// http://archinte.jamanetwork.com/article.aspx?articleid=1362942
//   Filter By Topic - Include the topics as events(impressions) on page load
function gaClimbToAncestor(evt,tag,tagAttr,tagAttrVal){
  var e=evt.target||evt.srcElement;
  while( e.tagName &&
         !(e.tagName.toLowerCase() === tag.toLowerCase() &&
           ((typeof tagAttr !== "undefined") ? ((e[tagAttr]) ? e[tagAttr] === tagAttrVal : false) : true)) ){
    e=e.parentElement||e.parentNode;
  }
  return e;
}
// ADD Advertising Interactions TO TRACKING!!!  PDFs and Mailtos
function gaActivityTracking(evt){
  evt = evt || (window.event || "");
  if( evt !== null && typeof evt !== undefined && 
    (((typeof(evt.which) === "number") && (evt.which === 1 || evt.which === 2 || evt.which === 3)) ||
     ((typeof(evt.button) === "number") && (evt.button === 1 || evt.button === 2 || evt.button === 4))) ){
    var a = gaClimbToAncestor(evt,"A"),
        aInnerHTML = (typeof a.innerHTML !== "undefined") ? gaCleanString(a.innerHTML) : "",
        aHref = (typeof a.href !== "undefined") ? a.href : "",
        path = window.location.pathname.toLowerCase(),
        cleanPage = document.domain + path + document.location.search;
    
    // PDF Downloads
    if( aInnerHTML === "PDF" ){
      var articleTitle = "";
      
      // PDF - Article Page
      if( path === "/article.aspx" ){
        articleTitle = window.gaAdjustIOTMTitle(gaGetArticlePageTitle(),"/article.aspx");
      }
      // PDF - Issue Page
      if( path === "/issue.aspx" ){
        articleTitle = window.gaAdjustIOTMTitle(gaGetArticleTitleFromDOM(evt,"DIV","className","top"),"/issue.aspx");
      }
      // PDF - Search Results Page
      if( path === "/searchresults.aspx" ){
        articleTitle = gaGetArticleTitleFromDOM(evt,"DIV","className","articleContent");
      }
      // PDF - Online First Page
      if( path === "/onlinefirst.aspx" ){
        articleTitle = gaGetArticleTitleFromDOM(evt,"DIV","className","top");
      }
      // PDF - Collections Page
      if( path === "/collection.aspx" ){
        articleTitle = gaGetArticleTitleFromDOM(evt,"DIV","className","articleContent");
      }
      
      if( articleTitle !== "" ){
        var articleType = window.gaGetArticleTypeForDownload(path,evt,"DIV","className","articleContent");
        gaTrackEvent('PDF Downloads', gaCleanString(articleTitle), articleType, 0, false);
      }
    }
    
    // Prints
    if( aInnerHTML === "Print" ){
      gaTrackArticlePageTool(aInnerHTML, cleanPage);
    }
    
    // Shares
    if( aInnerHTML === "Share" ){
      gaTrackArticlePageTool(aInnerHTML, cleanPage);
    }
    
    // Email
    if( aInnerHTML === "Email" ){
      gaTrackArticlePageTool(aInnerHTML, cleanPage);
    }
    
    // Offsite Links
    var hrefMatch = aHref.match(/http(s|):\/\/([^\/]*)(\/[^\?]*)(|\?.*)/),
        linkDomain = (hrefMatch !== null) ? hrefMatch[2] : "";
    if( aHref.indexOf("javascript:") === -1 && linkDomain.indexOf("jamanetwork.com") === -1 ){
      gaTrackEvent('Offsite Link', aHref, document.domain+document.location.pathname+document.location.search, 0, true);
    }
    
    // Audio Interactions
    var audioDiv = gaClimbToAncestor(evt,"DIV","className","mejs-inner");
    if( audioDiv !== null && audioDiv !== document ){
      var audioElems = audioDiv.getElementsByTagName("AUDIO"),
          audio = (audioElems.length > 0) ? audioElems[0] : null;
      if( audio !== null ){
        var audioFile = audio.src.replace(/http(s|):\/\//,"");
        if( typeof window.audioFilesPlayed[audioFile] === "undefined" ){
          gaTrackEvent('Audio Play', audio.src.replace(/http(s|):\/\//,""), cleanPage, 0, false);
          window.audioFilesPlayed[audioFile] = true;
        }
      }
    }
  }
}

window.gaGetArticleTypeForDownload = function(page,evt,ancestorTagName,ancestorAttr,ancestorAttrVal){
  var type = "Paid",
      grandParent = gaClimbToAncestor(evt,ancestorTagName,ancestorAttr,ancestorAttrVal);
  if( page === "/article.aspx" ){
    type = (document.getElementById("scm6MainContent_lblFreeArticle") !== null) ? "Free" : "Paid";
  }else{
    type = (window.gaGetElementsByClassName("freeArticle","SPAN",grandParent).length > 0) ? "Free" : "Paid";
  }
  return type;
};

window.gaAdjustIOTMTitle = function(title, page){
  if( title.indexOf("Image of the Month") > -1 ){
    if( page === "/issue.aspx" ){
      var issueInfoElem = document.getElementById("scm6MainContent_dvIssueInfo"),
          issueInfoMatch = (issueInfoElem !== null) ? issueInfoElem.innerHTML.match(/^(([^ ]*) ([^,]*)),.*/) : null;
      if( issueInfoMatch !== null ){
        return issueInfoMatch[2].substring(0,3)+" "+issueInfoMatch[3]+" "+title;
      }
    } else if( page === "/article.aspx" ){
      var articleDate = document.getElementById("scm6MainContent_lblArticleDate");
      if( articleDate !== null ){
        return articleDate.innerHTML+" "+title;
      }
    }
  }
  return title;
};

function gaBindEvent(event,func){
  if( (typeof(func) === "function") && document.body ){
    if( document.body.addEventListener ){
      document.body.addEventListener(event, func, true);
    }else if( document.body.attachEvent ){
      document.body.attachEvent("on"+event, func);
    }
  }
}

function gaInitializeEvents(){
  var e = (navigator.appVersion.indexOf("MSIE") !== -1) ? "click" : "mousedown";
  gaBindEvent(e,gaActivityTracking);
}

setTimeout(gaInitializeEvents,1000);

function gaGetArticleTitleFromDOM(evt,ancestorTagName,ancestorAttr,ancestorAttrVal){
  var grandparent = gaClimbToAncestor(evt,ancestorTagName,ancestorAttr,ancestorAttrVal),
      gpLinks = grandparent.getElementsByTagName("A"),
      numLinks = gpLinks.length, i, currentLink = null;
  for( i = 0; i < numLinks; i++ ){
    currentLink = gpLinks[i];
    if( currentLink.className && currentLink.className === "relatedArticle" ){
      return gaCleanString(currentLink.innerHTML);
    }
  }
  return "";
}

function gaGetArticlePageTitle(){
  var articleTitleElem = document.getElementById("scm6MainContent_lblArticleTitle");
  return (articleTitleElem !== null) ? articleTitleElem.innerHTML : "";
}

function gaTrackArticlePageTool(type, cleanPage){
  var articleTitle = gaGetArticlePageTitle();
  if( articleTitle !== "" ){
    gaTrackEvent(type, articleTitle, cleanPage, 0, false);
  }
}

window.gaCleanString = function(str){
  return str.replace(/\<[^\>]*\>/g,'').replace(/^\s+|\s+$|amp;/g,'').replace(/\&nbsp;/g,'');
}

function gaParseQueryParam(queryString, queryParam){
  var queryStringMatch = queryString.match(new RegExp(queryParam+"=([^&#]*)","i"));
  if( queryStringMatch !== null ){
      return queryStringMatch[1];
  }
  return "";
}
window.gaDelayBrowser = function(href){
  setTimeout(function(){
    window.location.href = href;
  },200);
  return false;
};
window.gaTrackSearchResultFromOtherJournals = function(){
  var fromOtherJournalContainer = document.getElementById("networkSearchContainer");
  if( fromOtherJournalContainer !== null ){
    var fromOtherJournalLinks = fromOtherJournalContainer.getElementsByTagName("A"),
        numLinks = fromOtherJournalLinks.length, i;
    for( i = 0; i < numLinks; i++ ){
      gaTrackEvent("From Other Journals", "Impression", window.gaCleanString(fromOtherJournalLinks[i].innerHTML), 0, true);
      fromOtherJournalLinks[i].oldonclick = fromOtherJournalLinks[i].onclick || function(){};
      fromOtherJournalLinks[i].onclick = function(){
        gaTrackEvent("From Other Journals", "Click", window.gaCleanString(this.innerHTML), 0, false);
        this.oldonclick;
        return window.gaDelayBrowser(this.href);
      }
    }
  }
}
window.gaTrackOnsiteSearch = function(){
  if( window.location.pathname.toLowerCase() === "/searchresults.aspx" ){
    var searchTerm = gaParseQueryParam(document.location.search, "q"),
        numResultsSpan = document.getElementById("spnResults");
    if( numResultsSpan !== null ){
      var numResultsMatch = numResultsSpan.innerHTML.replace(/\<[^\>]*\>/g,'').match(/of (\d*) results/),
      numResults = (numResultsMatch !== null) ? numResultsMatch[1] : "0";
      if( numResults === "0" ){
        var searchContainer = document.getElementById("mainSearchContainer");
        if( searchContainer !== null && searchContainer.innerHTML.toLowerCase().indexOf("no matches found") === -1 ){
          return setTimeout(gaTrackOnsiteSearch,1000);
        }
      }
    }
    gaTrackEvent('Onsite Search', decodeURI(searchTerm), numResults, 0, true);
    window.gaTrackSearchResultFiltering();
    window.gaTrackSearchResultFromOtherJournals();
  }
};
window.gaTrackRelatedArticles = function(){
  var relatedTopics = document.getElementById("divRelatedArticles");
  if( relatedTopics !== null ){
    var relatedTopicLinks = relatedTopics.getElementsByTagName("DIV"),
        numRelatedTopics = relatedTopicLinks.length, i;
    for( i = 0; i < numRelatedTopics; i++ ){
      var topicParent = relatedTopicLinks[i].parentNode || relatedTopicLinks[i].parentElement;
      if( relatedTopicLinks[i].id.indexOf("scm6MainContent_ucRelatedArticles_rptArticleContent_divPortletContentSection") > -1 ){
        if( (relatedTopicLinks[i].className.indexOf('invisible') === -1 || typeof relatedTopicLinks[i].trackLater !== "undefined") &&
            typeof relatedTopicLinks[i].impressionTracked === "undefined" ){
          var linkTitle = relatedTopicLinks[i].getElementsByTagName("A")[0];
          gaTrackEvent("Related Article", "Impression", window.gaCleanString(linkTitle.innerHTML), 0, true);
          relatedTopicLinks[i].impressionTracked = true;
          linkTitle.oldonclick = linkTitle.onclick || function(){};
          linkTitle.onclick = function(){
            window.gaTrackEvent("Related Article", "Click", window.gaCleanString(this.innerHTML), 0, false);
            return window.gaDelayBrowser(this.href);
          };
        } else if( relatedTopicLinks[i].className.indexOf('invisible') > -1 ){
          relatedTopicLinks[i].trackLater = true;
        }
      }
    }
    if( window.articleViewMore === null ){
      window.articleViewMore = document.getElementById("aShowMoreArticles");
      if( window.articleViewMore !== null ){
        window.articleViewMore.oldonclick = window.articleViewMore.onclick || function(){};
        window.articleViewMore.onclick = function(){
          setTimeout(window.gaTrackRelatedArticles,1000);
          this.oldonclick();
          return window.gaDelayBrowser(this.href);
        }
      }
    }
  }
};
window.gaTrackRelatedTopics = function(){
  var relatedTopicLinks = window.gaGetElementsByClassName("filterLinkArticle","A"),
      numLinks = relatedTopicLinks.length, i;
  for( i = 0; i < numLinks; i++ ){
    var linkTitle = relatedTopicLinks[i].innerHTML;
    if( linkTitle.indexOf("All Articles") === -1 ){
      window.gaTrackEvent("Filter Topics", "Impression", window.gaCleanString(linkTitle), 0, true);
    }
  }
};
window.gaTrackRelatedCollections = function(){
  var relatedCollectionsDiv = document.getElementById("divRelatedCollections");
  if( relatedCollectionsDiv !== null ){
    var relatedCollectionsLinks = relatedCollectionsDiv.getElementsByTagName("A");
    for( var i = 0, numLinks = relatedCollectionsLinks.length; i < numLinks; i++ ){
      window.gaTrackEvent("Related Topics", "Impression", window.gaCleanString(relatedCollectionsLinks[i].innerHTML), 0, true);
      relatedCollectionsLinks[i].oldonclick = relatedCollectionsLinks[i].onclick || function(){};
      relatedCollectionsLinks[i].onclick = function(){
        window.gaTrackEvent("Related Topics", "Click", window.gaCleanString(this.innerHTML), 0, false);
        this.oldonclick();
        return window.gaDelayBrowser(this.href);
      };
    }
  }
};
window.gaTrackSeeAlso = function(){
  var seeAlso = document.getElementById("item11");
  if( seeAlso !== null ){
    var seeAlsoLinks = seeAlso.getElementsByTagName("A"),
        numLinks = seeAlsoLinks.length, i;
    for( i = 0; i < numLinks; i++ ){
      var linkTitle = seeAlsoLinks[i].innerHTML;
      gaTrackEvent("Associated Articles", "Impression", window.gaCleanString(linkTitle), 0, true);
      seeAlsoLinks[i].oldonclick = seeAlsoLinks[i].onclick || function(){};
      seeAlsoLinks[i].onclick = function(){
        window.gaTrackEvent("Associated Articles", "Click", window.gaCleanString(this.innerHTML), 0, false);
        this.oldonclick();
        return window.gaDelayBrowser(this.href);
      };
    }
  }
};
window.gaGetElementsByClassName = function(classname, tagname, elem){
  var searchObject = (typeof elem !== "undefined") ? elem : document;
  if( typeof searchObject.getElementsByClassName !== "undefined" ){
    return searchObject.getElementsByClassName(classname);
  } else {
    var elems = searchObject.getElementsByTagName(tagname),
        numElems = elems.length, i,
        retArray = [];
    for( i = 0; i < numElems; i++ ){
      if( elems[i].className.indexOf(classname) > -1 ){
        retArray.push(elems[i]);
      }
    }
    return retArray;
  }
};
window.getElementByTagNameAndField = function(tagName, fieldName, fieldVal, elem){
  var searchObject = (typeof elem !== "undefined") ? elem : document,
      elems = searchObject.getElementsByTagName(tagName),
      numElems = elems.length, i;
  if( fieldName.indexOf("attributes") > -1 ){
    var attrParts = fieldName.split('.'),
        nodeName = attrParts[1];
    for( i = 0; i < numElems; i++ ){
      if( typeof elems[i].attributes !== "undefined" ){
        var numAttributes = elems[i].attributes.length, j;
        for( j = 0; j < numAttributes; j++ ){
          if( elems[i].attributes[j].nodeName === nodeName && elems[i].attributes[j].nodeValue === fieldVal ){
            return elems[i].innerHTML;
          }
        }
      }
    }
  } else {
    for( i = 0; i < numElems; i++ ){
      if( typeof elems[i][fieldName] !== "undefined" && elems[i][fieldName] === fieldVal ){
        return elems[i].innerHTML;
      }
    }
  }
  return null;
};
window.gaReapplySearchFiltering = function(){
  var resultsLoadingElems = window.gaGetElementsByClassName("mask","DIV");
  if( resultsLoadingElems.length > 0 ){
    var resultsLoading = resultsLoadingElems[0];
    if( resultsLoading.style.display === "block" ){
      return setTimeout(gaReapplySearchFiltering,1000);
    }
  }
  setTimeout(window.gaTrackSearchResultFiltering,5000);
};
// Add filter label as Action, move filter name to Label
window.gaTrackSearchResultFiltering = function(){
  var filterCol = document.getElementById("leftFilterColumn");
  if( filterCol !== null ){
    var filterElems = window.gaGetElementsByClassName("fPortlets","DIV",filterCol),
        numFilterElems = filterElems.length, i;
    for( i = 0; i < numFilterElems; i++ ){
      var filterListElems = filterElems[i].getElementsByTagName("LI"),
          numFilterListElems = filterListElems.length,
          filterInputElems = filterElems[i].getElementsByTagName("INPUT"),
          numFilterInputElems = filterInputElems.length,
          filterApplyButton = window.gaGetElementsByClassName("applyButton","DIV",filterElems[i]),
          contentTitle = "", contentNames = [],
          loopElems = [];
      if( numFilterListElems > 0 ){
        var contentTitleElems = window.gaGetElementsByClassName("fpcli-ContentTitle","SPAN",filterElems[i]);
        contentTitle = (contentTitleElems.length === 1) ? contentTitleElems[0].innerHTML : "Unknown",
        j;
        for( j = 0; j < numFilterListElems; j++ ){
          contentNames.push(filterListElems[j].innerHTML.replace(/\([^\)]*\)$/,'').replace(/^\s+|\s+$/g,'').replace(/&amp;/g,'&'));
        }
        loopElems = filterListElems;
      } else if( filterApplyButton.length === 1 ){
        var filterApplyButtonElem = filterApplyButton[0],
            headerDivs = window.gaGetElementsByClassName("left","SPAN",filterElems[i]),
            fromDate = document.getElementById("fromDate1"),
            toDate = document.getElementById("toDate1");
        contentTitle = (headerDivs.length > 0) ? headerDivs[0].innerHTML : "Cannot Parse";
        if( fromDate !== null && toDate !== null ){
          contentNames.push("dateRange");
        }
        loopElems.push(filterApplyButtonElem);
      } else if( numFilterInputElems > 0 ){ // Checkbox Inputs
        var headerDivs = window.gaGetElementsByClassName("left","SPAN",filterElems[i]),
            j;
        contentTitle = (headerDivs.length > 0) ? headerDivs[0].innerHTML : "Unable to Parse";
        for( j = 0; j < numFilterInputElems; j++ ){
          var checkboxID = filterInputElems[j].id,
              checkboxLabel = window.getElementByTagNameAndField("LABEL","attributes.for",checkboxID,filterElems[i]);
          if( checkboxLabel !== null ){
            contentNames.push(checkboxLabel.replace(/\([^\)]*\)$/,'').replace(/^\s+|\s+$/g,'').replace(/&amp;/g,'&'));
          }
        }
        loopElems = filterInputElems;
      }
      var numLoopElems = loopElems.length, j;
      for( j = 0; j < numLoopElems; j++ ){
        loopElems[j].oldonclick = loopElems[j].onclick || function(){};
        loopElems[j].gaHeader = contentTitle;
        loopElems[j].gaName = contentNames[j];
        loopElems[j].onclick = function(){
          if( this.gaName === "dateRange" ){
            this.gaName = (function(){
              var fromDate = document.getElementById("fromDate1"),
                  toDate = document.getElementById("toDate1");
              if( fromDate !== null && toDate !== null ){
                return fromDate.value + " - " + toDate.value;
              }
            })();
          }
          window.gaTrackEvent("Search Filter", this.gaHeader, this.gaName, 0, false);
          setTimeout(gaReapplySearchFiltering,2000);
          this.oldonclick();
          this.onclick = this.oldonclick;
        };
      }
    }
  }
}

window.gaTrackEvent = function(category, action, label, value, noninteractive){
  window.gaTrackJournal("");
  window.gaSetUserIds("");
  window._gaq.push(['_trackEvent', category, action, label, value, noninteractive]);
};

window.gaTrackArticle = function(trackerObj){
  if( location.pathname.toLowerCase() === "/article.aspx" ){
    var contentType = "Full",
        fullContentUnavailable = document.getElementById("scm6MainContent_DivFullContentAvailableMessage") !== null;
    if( fullContentUnavailable ){
      contentType = "Abstract Only";
    } else {
      if( document.getElementById("scm6MainContent_lblFreeArticle") !== null ){
        window.articleAccessFree = "Free";
      } else {
        window.articleAccessFree = "Paid";
      }
    }
    var articleTitle = gaGetArticlePageTitle();
    _gaq.push([trackerObj+'_setCustomVar', 1, ((articleTitle !== "") ? window.gaAdjustIOTMTitle(gaCleanString(articleTitle),"/article.aspx") : "None"), contentType, 3]);
    window.trackArticleAccessEvent = contentType;
    window.articleDOI = (function(){
      var metaElems = document.getElementsByTagName("META"),
          numMetas = metaElems.length, i;
      for( i = 0; i < numMetas; i++ ){
        if( metaElems[i].name === "citation_doi" ){
          return "/article.aspx?doi="+metaElems[i].content;
        }
      }
      return "";
    })();
    var articleType = document.getElementById("scm6MainContent_lblArticleType"),
        deptType = document.getElementById("lblSuperClass");
    articleType = (articleType !== null && articleType.innerHTML !== "") ? articleType.innerHTML : "None";
    deptType = (deptType !== null && deptType.innerHTML !== "") ? deptType.innerHTML : "None";
    _gaq.push([trackerObj+'_setCustomVar', 3, articleType, deptType, 3]);
  }
};

window.gaTrackJournal = function(trackerObj){
  var siteLogo = document.getElementById("siteLogo"),
      siteString = "N/A",
      journalString = "N/A";
  if( siteLogo !== null ){
    siteString = siteLogo.innerHTML.substring(1,siteLogo.innerHTML.length-1).replace(/&amp;/g,'&');
  }
  if( location.pathname.toLowerCase() === "/searchresults.aspx" ){
    var journalMap = {
      "J67": "JAMA: The Journal of the American Medical Association",
      "J68": "JAMA Dermatology",
      "J69": "JAMA Facial Plastic Surgery",
      "J70": "JAMA Psychiatry",
      "J71": "JAMA Internal Medicine",
      "J72": "JAMA Neurology",
      "J73": "JAMA Ophthalmology",
      "J74": "JAMA Otolaryngology—Head & Neck Surgery",
      "J75": "JAMA Pediatrics",
      "J76": "JAMA Surgery",
      "J77": "Disaster Medicine and Public Health Preparedness",
      "J91": "Archives of Neurology And Psychiatry",
      "J*": "All Journals"
    };
    var journalNumber = gaParseQueryParam(document.location.search, "t");
    if( journalNumber !== "" ){
      journalString = journalMap[journalNumber];
    }
  }
  window._gaq.push([trackerObj+'_setCustomVar', 5, journalString, siteString, 3]);
};
window.gaSetUserIds = function(trackerObj){
  window._gaq.push([trackerObj+'_setCustomVar', 2, window.institutionid, window.customerid, 3]);
  window._gaq.push([trackerObj+'_setCustomVar', 4, window.institutionid, window.customerid, 1]);
};

window.cookieDomain = (function(){
  var domainPieces = document.domain.split('.'),
      numPieces = domainPieces.length;
  return ((numPieces >= 2) ? domainPieces[numPieces-2]+'.'+domainPieces[numPieces-1] : document.domain);
})();

window.articleDOI = "";
window.getValueFromInput = function(elemid){
  var elem = document.getElementById(elemid);
  if( elem !== null ){
    return (elem.value) ? elem.value : "Unknown";
  }
  return "Unknown";
};
window.customerid = window.getValueFromInput("cust_id");
window.institutionid = window.getValueFromInput("inst_id");

window.linksWithoutIds = {};

window.climbParentsToId = function(elem){
  elem = elem.parentElement || elem.parentNode;
  if( elem.id ){
    return elem.id;
  } else if( elem.tagName.toLowerCase() === "html" ){
    return "";
  }
  return window.climbParentsToId(elem);
};

window.addIdsToLinks = function(attempts){
  var links = document.links,
      linksFound = 0;
  for( var i = 0, numLinks = links.length; i < numLinks; i++ ){
    if( !links[i].id ){
      var ancestorId = window.climbParentsToId(links[i]),
          linkHrefParts = links[i].href.toLowerCase().match(/\:\/\/(.*)/),
          linkPage = (linkHrefParts !== null) ? linkHrefParts[1] : "NA";
      if( ancestorId === "" ){
        if( !window.linksWithoutIds[linkPage] ){
          window.linksWithoutIds[linkPage] = 1;
        }
        ancestorId = window.linksWithoutIds[linkPage];
        window.linksWithoutIds[linkPage]++;
      }
      links[i].id = linkPage+"-"+ancestorId;
      linksFound++;
    }
  }
  if( linksFound > 0 || links.length === 0 || attempts < 5 ){
    setTimeout((function(){
      return function(){
        window.addIdsToLinks((linksFound === 0) ? ++attempts : attempts);
      }
    })(),1000);
  }
};

window.gaFireEvents = function(){
  /* Fire first 10 immediately */
  var numTotalEvents = window.gaEventQueue.length
  while( window.numEventsFired < numTotalEvents && window.numEventsFired < 10 ){
    var currentEvent = window.gaEventQueue[window.numEventsFired];
    if( currentEvent ){
      window.gaTrackEvent(currentEvent.category, currentEvent.action, currentEvent.label, currentEvent.value, currentEvent.noninteraction);
      window.numEventsFired++;
    }
  }
  /* Queue the rest of the events to fire every second */
  while( window.numEventsFired < numTotalEvents ){
    var currentEvent = window.gaEventQueue[window.numEventsFired],
        eventFactor = window.numEventsFired - 9;
    setTimeout(function(){
      window.gaTrackEvent(currentEvent.category, currentEvent.action, currentEvent.label, currentEvent.value, currentEvent.noninteraction);
    },((eventFactor*1000)+eventFactor)*2);
	window.numEventsFired++;
  }
};

// Base Code
window.gaEventQueue = [];
window.numEventsFired = 0;
window.audioFilesPlayed = {};
window.trackArticleAccessEvent = false;
window.articleAccessFree = "";
window.articleViewMore = null;
window.baseTagFired = false;
function gaCallBaseTag(){
  window._gaq = window._gaq || [];
  var pluginUrl = 
 '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
  window._gaq.push(['_require', 'inpage_linkid', pluginUrl]);
  window._gaq.push(['_setAccount', 'UA-25810650-1']);
  window._gaq.push(['_setDomainName', window.cookieDomain]);
  window.gaTrackArticle("");
  window.gaSetUserIds("");
  window.gaTrackJournal("");
  window._gaq.push(['_trackPageview', window.articleDOI]);
  if( window.trackArticleAccessEvent ){
    _gaq.push(['_trackEvent', 'Article Access', window.trackArticleAccessEvent, window.articleAccessFree, 0, true]);
  }
  // Enterprise Account Pageview
  window._gaq.push(['secondTracker._setAccount', "UA-41194200-1"]);
  window._gaq.push(['secondTracker._setDomainName', window.cookieDomain]);
  window._gaq.push(['secondTracker._trackPageview', window.articleDOI]);
  window.addIdsToLinks(0);
  window.baseTagFired = true;
}

window.gaWaitForBaseTag = function(func){
  if( window.baseTagFired ){
    func();
  }else{
    setTimeout((function(f){
      return function(){
        window.gaWaitForBaseTag(f);
      }
    })(func),1000);
  }
};

window.gaNextElementSibling = function(el){
  do { el = el.nextSibling } while ( el && el.nodeType !== 1 );
  return el;
};

window.gaTrackClickTweets = function(){
  var articleSections = window.gaGetElementsByClassName("article-left").concat(window.gaGetElementsByClassName("article-right"));
  if( articleSections.length && articleSections.length > 0 ){
    for( var i = 0, numArticles = articleSections.length; i < numArticles; i++ ){
      var currentSection = articleSections[i],
          titleElems = window.gaGetElementsByClassName("article-title","DIV",currentSection),
          title = (titleElems.length > 0) ? window.gaCleanString(titleElems[0].innerHTML) : "",
          clickTweets_v1 = window.gaGetElementsByClassName("mytweet","*",currentSection),
          clickTweets_v2 = window.gaGetElementsByClassName("mytweet2","*",currentSection);
      for( var i = 0, numTweets_v1 = clickTweets_v1.length; i < numTweets_v1; i++ ){
        var currentTweetClick = clickTweets_v1[i];
        currentTweetClick._gaTitle = title;
        currentTweetClick.tweetonclick = currentTweetClick.onclick||function(){};
        currentTweetClick.onclick = function(e){
          window.gaTrackEvent("Click to Tweet",this._gaTitle,document.domain+window.location.pathname.toLowerCase()+document.location.search);
          return this.tweetonclick();
        };
      }
      for( var i = 0, numTweets_v2 = clickTweets_v2.length; i < numTweets_v2; i++ ){
        var currentTweetClick = clickTweets_v2[i],
            tweetClickSibling = window.gaNextElementSibling(currentTweetClick);
        currentTweetClick._gaTitle = (tweetClickSibling) ? window.gaCleanString(tweetClickSibling.innerHTML) : title;
        currentTweetClick.tweetonclick = currentTweetClick.onclick||function(){};
        currentTweetClick.onclick = function(e){
          window.gaTrackEvent("Click to Tweet",this._gaTitle,document.domain+window.location.pathname.toLowerCase()+document.location.search);
          return this.tweetonclick();
        };
      }
    }
  } else {
    setTimeout(window.gaTrackClickTweets,200);
  }
};

window.gaTrackCMELinks = function(){
  var linkIdPrefix = "scm6MainContent_ucCMECourses_rptBrowse_lbName_",
      index = 0,
      linkElem = document.getElementById(linkIdPrefix+(index++));
  while( linkElem !== null ){
    if( !linkElem._gaTracked ){
      linkElem.oldonclick = linkElem.onclick || function(){};
      linkElem.onclick = function(e){
        window.gaTrackEvent("CME Browse",window.gaCurrentCMEFilter,this.innerHTML);
        return this.oldonclick(e);
      };
      linkElem._gaTracked = true;
      window.gaCMELinksBound = true;
    }
    linkElem = document.getElementById(linkIdPrefix+(index++));
  }
  if( window.gaCMELinksBinding && window.gaCMELinksBound ){
    clearInterval(window.gaCMELinksBinding);
  } else if( !window.gaCMELinksBound ){
    setTimeout(window.gaTrackCMELinks,200);
  }
};

window.gaCurrentCMEFilter = (function(){
  return (document.URL.indexOf("browsestate=true") > -1) ? "By State" : "By Topic";
})();

window.gaCMELinksBound = false;

window.gaTrackCMECourseFilters = function(){
  var byTopic = document.getElementById("scm6MainContent_ucCMECourses_btnCmeByTopic"),
      byYear = document.getElementById("scm6MainContent_ucCMECourses_btnCmeByYear"),
      byState = document.getElementById("scm6MainContent_ucCMECourses_btnCmeByState");
  if( byTopic !== null && !byTopic._gaTracked ){
    byTopic.oldonclick = byTopic.onclick || function(){};
    byTopic.onclick = function(e){
        window.gaCurrentCMEFilter = "By Topic";
        window.gaTrackEvent("CME Browse","By Topic",null);
        window.gaCMELinksBound = false;
        window.gaCMELinkBinding = setInterval(window.gaTrackCMELinks,200);
        return this.oldonclick(e);
      };
    byTopic._gaTracked = true;
  }
  if( byYear !== null && !byYear._gaTracked ){
    byYear.oldonclick = byYear.onclick || function(){};
    byYear.onclick = function(e){
        window.gaCurrentCMEFilter = "By Year";
        window.gaTrackEvent("CME Browse","By Year",null);
        window.gaCMELinksBound = false;
        window.gaCMELinkBinding = setInterval(window.gaTrackCMELinks,200);
        return this.oldonclick(e);
      };
    byYear._gaTracked = true;
  }
  if( byState !== null && !byState._gaTracked ){
    byState.oldonclick = byState.onclick || function(){};
    byState.onclick = function(e){
        window.gaCurrentCMEFilter = "By State";
        window.gaTrackEvent("CME Browse","By State",null);
        window.gaCMELinksBound = false;
        window.gaCMELinkBinding = setInterval(window.gaTrackCMELinks,200);
        return this.oldonclick(e);
      };
    byState._gaTracked = true;
  }
};

window.gaTrackCMEFiltering = function(){
  if( window.location.pathname.indexOf("cme.asp") > -1 ){
    window.gaCMECourseFilterInterval = setInterval(window.gaTrackCMECourseFilters,500);
    window.gaTrackCMELinks();
  }
};
window.initiateTracking = function(){
  setTimeout(gaCallBaseTag,500);
  setTimeout(gaTrackOnsiteSearch,1000);
  setTimeout(gaTrackRelatedArticles,1000);
  setTimeout(gaTrackRelatedTopics,1000);
  setTimeout(gaTrackSeeAlso,1000);
  setTimeout(gaTrackRelatedCollections,1000);
  setTimeout(window.gaTrackCMEFiltering,1000);
  setTimeout(window.gaTrackClickTweets,1000);
  setTimeout(gaFireEvents,1250);
  window.interstitialFound = false;
  window.interstitialCheck = setInterval(function(){
    if( !window.interstitialFound ){
      var interstitialContainer = document.getElementById("sb-container");
      if( interstitialContainer !== null ){
        if( interstitialContainer.attributes && 
            interstitialContainer.attributes.length >= 2 &&
            interstitialContainer.attributes[1].value.indexOf("visibility: hidden") === -1 ){
          window.gaTrackEvent("Interstitial Fired", window.location.href, "", 0, true);
          window.interstitialFound = true;
        }
      }
    }else{
      clearInterval(window.interstitialCheck);
    }
  },500);
};

/* Logic to fire tracking after the DOM has parsed */
if (document.addEventListener) {
  if ( (navigator.userAgent.indexOf('AppleWebKit/') > -1) ) {
    window.trackingTimer = window.setInterval(function() {
      if (/loaded|complete/.test(document.readyState)) {
        clearInterval(window.trackingTimer);
        window.initiateTracking();
      }
    }, 50);
  } else {
    document.addEventListener("DOMContentLoaded", window.initiateTracking, false);
  }
} else {
  setTimeout(function () {
    var d = window.document;
    (function () {
      try {
        if (!document.body) throw "continue";
        d.documentElement.doScroll('left')
      } catch (e) {
        setTimeout(arguments.callee, 15);
        return
      }
      window.initiateTracking();
    })()
  }, 1);
}

(function () {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();