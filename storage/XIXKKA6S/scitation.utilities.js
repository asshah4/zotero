/**
* Global javascript functions all programs reference.
* Page last optimized by C. West 10/4/10
*/

String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };
String.prototype.checkempty = function() {
	if((this == null) || (this == "") || isblank(this))
		return false;
	else
		return true;
};

function AQSlistener(autName, domainname, searchcoden, x, y, articleInfo,searchalias) { 
	var winWidth = $(window).width(); 
	var popupWidth = $("#singlePreview").width(); 
	if(x+popupWidth > winWidth) x = winWidth - popupWidth - 50; 
	$("#singlePreview").css({'left': x,'top':y+5});
	$("#singlePreview").show();
	$("#singlePreview .previewbody").html("Loading...");
	
	var autUrl = autName.replace(new RegExp(" ", "g"), "+");

	var aqsFaceturl = "/FEWebservices/FacetsWebservice?possible1="+autUrl+"&possible1zone=author&key="+searchcoden+"&facettype=meta-pacs-text&facetorder=count&facetcount=5&submit=facet&sortby=newestdate";
    var template = $('#aqsTemplate').html();
    var cleanName = autName.replace(new RegExp(" ", "g"), "+");
    
    template = template.replace(new RegExp("AUTHORURLTOKEN", "gi"),cleanName);
    template = template.replace(new RegExp("AUTHORNAME", "gi"),autName);
    
    $("#singlePreview .previewbody").html(template);

    // Setup This Journal Url
    var thisJournal = $('#aqsTemplate #mlsearchUrlDefault').attr('href');
    if(thisJournal) {
	    thisJournal = thisJournal.replace(new RegExp("AUTHORURLTOKEN", "gi"),cleanName);
	    thisJournal = thisJournal.replace(new RegExp("AUTHORNAME", "gi"),autName);
    
	    renderUniPhy(autName,articleInfo);
	    renderAddedAuthorFacetData(autName,autUrl,aqsFaceturl,domainname,searchcoden,thisJournal,searchalias);
    }
    return false;
}

function renderUniPhy(autName,articleInfo)
{
	var returnDOM = "";
	//alert("/FEWebservices/UniphyWebService?" + articleInfo + "&mode=GetAuthors");
	$.ajax({
    	type: "post",
    	url: "/FEWebservices/UniphyWebService?" + articleInfo + "&mode=GetAuthors",
    	success: function(response) {
    		var xml = $(response);
    		var authorid = "";
    		var thumbnailloc = "";
    		$.each(xml.find( "Author" ), function(i,thisauthor){
    			
    			var lastname =  $(thisauthor).find( "LastName" ).text();
    			var firstname =  $(thisauthor).find( "FirstName" ).text();
    			if((autName.indexOf(lastname) >= 0) && ((autName.indexOf(firstname) >= 0)))
    			{
    				authorid = $(thisauthor).find( "UniPHYId" ).text();
    				thumbnailloc = $(thisauthor).find( "Thumbnail" ).text();
    			}
    		});
    		if(authorid != "0" && authorid != "")
    		{
    			returnDOM += "<div id=\"Uniphy_wrapper\"><h3>More Information about <strong>"+ autName +"</strong></h3>";
    			returnDOM += "<div class=\"Uniphy_link\"><a href=\"http://www.aipuniphy.org/AuthorDetailsGateway.aspx?auid=" + authorid + "\"><img src=\"/img/aqs/author_up.png\" style=\"height:15px\" alt =\"\" /> &nbsp;AIP UniPHY Profile</a></div></div>";
    		}
    		if(thumbnailloc != "")
    			returnDOM += "<img src=\""+thumbnailloc+"\" class=\"uniphy_thumbnail\">";
    		$("#singlePreview .previewbody").prepend(returnDOM);
		},
    	error: function(){
    	}    	
    });
}

function renderAddedAuthorFacetData(autName,autUrl,aqsFaceturl,domainname,searchcoden,thisJournal,searchalias)
{
	var returnDOM = "";
	$.getJSON(aqsFaceturl, function(data) 
	    {
			if (data != null)
	          {
	      		  var metapacs = "meta-pacs-text";
	    		  if(data.facetCollection[metapacs] != null)
	    		  {
	    			  returnDOM += "<div class=\"popup_aqstitle looklikelink\" onclick=\"$('#popup_author_facets').show(); $(this).hide();\"><img src=\"/img/icons/add.png\" style=\"position:relative; top:3px;\" alt=\"Show More Info\"> Explore more research from \""+autName+"\" (this journal)</a></div>";
	    			  returnDOM += "<div id=\"popup_author_facets\" style=\"display:none;\">";
	    			  returnDOM += "<p class=\"popup_aqstitle\">Popular Topics by "+autName+" from this Journal</p><ul>";
		    	      if(data.facetCollection[metapacs] != null && data.facetCollection[metapacs].length)
		              {
			        	  $.each(data.facetCollection[metapacs], function(i,facet){
			        		  returnDOM += "<li><a href=\""+ thisJournal + "&meta-pacs-text="+(facet.term).replace(new RegExp(' ', 'g'), '+')+"\">" + facet.term + "</a> ("+facet.count+")</li>";
			              })
		              } else {
		            	  returnDOM += "<li><a href=\"" + thisJournal + "&meta-pacs-text="+(data.facetCollection[metapacs].term).replace(new RegExp(' ', 'g'), '+')+"\">" + data.facetCollection[metapacs].term + "</a> ("+data.facetCollection[metapacs].count+")</li>";
		              }
		    	      returnDOM += "</ul><p class=\"popup_aqstitle\">Recently Published Articles by "+autName+" ( <a href=\""+thisJournal+"\">View all "+data.facetCollection.journalcount+"</a> ) from this Journal</p><ul>";
		        	  if(data.facetCollection.articles.length)
		              {
			        	  $.each(data.facetCollection.articles, function(i,facet){
			        		  returnDOM += "<li><a href=\""+facet.link+"\">" + facet.title + "</a></p>";
			              })
		              } else {
		            	  returnDOM += "<li><a href=\""+data.facetCollection.articles.link+"\">" + data.facetCollection.articles.title + "</a></li>";
		              }
		        	  returnDOM += "</ul>";
		        	  returnDOM += "</div>";
	    		  }
	    		  $("#singlePreview .previewbody").append(returnDOM);
	          }
	    });  	
}


jQuery.fn.fadeToggle = function(speed, easing, callback) { return this.animate({opacity: 'toggle'}, speed, easing, callback); }; 
       
// ********************************************************** start
//  handles the quick search functionality

function checkThisInput(thisinput, checkagainstthis) {
	if($(thisinput).val() == checkagainstthis)
	{
		$(thisinput).val("");
		$(thisinput).css("color","#000000");
	} else if($(thisinput).val() == "")
	{
		$(thisinput).val(checkagainstthis);
		$(thisinput).css("color","#ccc");
	}
}

function updateSearchPullDown(thisclick, displayelem)
{
	$(displayelem + " img:first-child").attr("src", "/img/aqs/searchicon-" + $(thisclick).attr('rel') + ".png");
	$("#searchzone").val($(thisclick).attr('rel'));
}

function launchsearch(searchProgram, idprefix)
{
	if(!idprefix) idprefix ="";
    var codenkey = $("#" + idprefix + "key").val();
    var CP_Style = $("#" + idprefix + "CP_Style").val();
    // document.getElementById("searchpanelform")
    if (searchtype=="searchin")
    {
        var squeryval = $("#" + idprefix + "searchfield").val();
        var searchzoneval = $("#" + idprefix + "searchzone").val();
        if(squeryval!="" && squeryval!="enter search here...")
        {
        	
            if(searchzoneval == "4") // Scitation search
            {
                var scicoden = "FREESR";
                if (searchProgram == "verity" && codenkey != null) scicoden = codenkey;
                var urltogo = "http://scitation.aip.org/vsearch/servlet/VerityServlet?KEY="+scicoden+"&possible1="+squeryval+"&smode=results&possible1zone=article&maxdisp=10";
                window.open(urltogo, "_self");
                return false;
            }
            else if(searchzoneval == "5") // SPIN search
            {
                var urltogo = "http://scitation.aip.org/vsearch/servlet/VerityServlet?KEY=SPIN&possible1="+squeryval+"&smode=results&possible1zone=article&maxdisp=10";
                window.open(urltogo, "_self");
                return false;
            }
            else if(searchzoneval == "6") // Scitopia
            {
                var urltogo = "http://www.scitopia.org/scitopia/?expression="+squeryval;
                window.open(urltogo, "_self");
                return false;
            }
            else if(searchzoneval == "7") // PubMed
            {
                var urltogo = "http://www.ncbi.nlm.nih.gov/sites/entrez?term="+squeryval;
                window.open(urltogo, "_self");
                return false;
            }
            else if(searchzoneval == "8") // Google SCHOLAR
            {
                 var urltogo = "http://scholar.google.com/scholar?q="+squeryval;
                 window.open(urltogo, "_self");
                 return false;
            }
            else if(searchzoneval == "9") // All within the Society
            {
                $("#" + idprefix + "key").val($("#" + idprefix + "societykey").val() + "_ALL");
                $("#" + idprefix + "searchzone").val("2"); 
                $("#" + idprefix + "q").attr("value", squeryval);
                $("#" + idprefix + "searchpanelform").attr("action", $("#" + idprefix + "searchpanelform").attr("action") + "?q=" + squeryval);
                $("#" + idprefix + "searchtype").attr("value", searchtype);
                $("#" + idprefix + "searchpanelform").submit();                
            }
            else if(searchzoneval == "10") // Volumes and/or Keywords
            {
            	// was proceedings.aip.org
            	var urltogo = "http://scitation.aip.org/servlet/Searchcat?queryText="+squeryval+"&SEARCH-.x=0&SEARCH-.y=0&collection=CONFPROC&ResultMaxDocs=200"; 
                window.open(urltogo, "_self");
                return false;            
            } else {
                $("#" + idprefix + "q").attr("value", squeryval);
                $("#" + idprefix + "searchpanelform").attr("action", $("#" + idprefix + "searchpanelform").attr("action") + "?q=" + squeryval);
                $("#" + idprefix + "searchtype").attr("value", searchtype);
                $("#" + idprefix + "searchpanelform").submit();
            }
        } else { 
            $("#" + idprefix + "AIP_SearchPanel_Error").html("You need to enter a query value");
            if ($("#" + idprefix + "AIP_SearchPanel_Error").is(':hidden'))
                $("#" + idprefix + "AIP_SearchPanel_Error").fadeToggle();
                
        }
    }
    /* Searching by Volume and Page parameters ----------------- */
    if (searchtype=="volpage")
    { 
        var volval = $("#" + idprefix + "vol").val();
        var pgval = $("#" + idprefix + "pg").val();
        var rootcoden = $("#coden").val();
        if(volval!="" && pgval!="")
        {
            var posturl = "http://link.aip.org/link/?" + rootcoden + "/"+volval+"/"+pgval;
            window.open(posturl,"_self");
        } else if(CP_Style=="true" && volval!="")
        {
        	// was proceedings.aip.org
        	var posturl = "http://scitation.aip.org/servlet/Searchcat?volume="+volval+"&SEARCH-97.x=0&SEARCH-97.y=0&collection=CONFPROC&ResultMaxDocs=300";
        	window.open(posturl,"_self");
        } else {
            $("#" + idprefix + "AIP_SearchPanel_Error").html("You need to enter a value for Volume and Page");
            if ($("#" + idprefix + "AIP_SearchPanel_Error").is(':hidden'))
                $("#" + idprefix + "AIP_SearchPanel_Error").fadeToggle();
        }
    }
    /* Searching by DOI parameters ----------------------------- */
    if (searchtype=="doi")
    {
        var doival = $("#" + idprefix + "doi").val();
        if(doival!="" && doival!="enter doi... (ie:10.1063/1.3441405)")
        {
            var posturl = "http://link.aip.org/link/doi/" + doival;
            //alert(posturl);
            window.open(posturl,"_blank");
        } else {
            $("#" + idprefix + "AIP_SearchPanel_Error").html("You need to enter a DOI value");
            if ($("#" + idprefix + "AIP_SearchPanel_Error").is(':hidden'))
                $("#" + idprefix + "AIP_SearchPanel_Error").fadeToggle();
        }
    }
    /* Searching by citation parameters (inprogress) ----------------------------- */
    if (searchtype=="citation")
    {
        var citval = $("#" + idprefix + "cit").val();
        var alias = $("#" + idprefix + "alias").val();
        if(citval!="" && citval!="enter citation...")
        {
            $.get("/FEWebservices/CitationResolverWebservice", { citation:citval }, 
                   function(data){
                        if (data.trim() != "" && data.trim() != "null")
                        {
                            window.open(data,"_self");
                        }
                        else
                        {
                            $("#" + idprefix + "AIP_SearchPanel_Error").html("Sorry, the citation could not be resolved.");
                            if ($("#" + idprefix + "AIP_SearchPanel_Error").is(':hidden'))
                                $("#" + idprefix + "AIP_SearchPanel_Error").fadeToggle();
                        }
            } );            
        } else {
            $("#" + idprefix + "AIP_SearchPanel_Error").html("You need to enter a valid Article Citation");
            if ($("#" + idprefix + "AIP_SearchPanel_Error").is(':hidden'))
                $("#" + idprefix + "AIP_SearchPanel_Error").fadeToggle();
        }
    }        
    return false;
}

function switchsearchtab(tabid, searchdivid) {
    if (searchdivid != searchtype)
    {
        searchtype = searchdivid;
        if ($("#AIP_SearchPanel_Error").is(':visible'))
           closeSearchError();
        $(".searchtab").removeClass("selectedtab");
        $(tabid).addClass("selectedtab");
        $(".search_content_pane").hide();
        $("#search_"+searchdivid).fadeToggle();
    }
    return false; 
}
                    
// ********************************************************** end

function isblank(s)
{
    for(var i = 0; i < s.length; i++) 
    {
        var c = s.charAt(i);
        if ((c != ' ') && (c != '\n') && (c != '\t'))
            return false;
    }
    return true;
}

function closeSearchError() { 
    if ($("#AIP_SearchPanel_Error").is(':visible'))
        $("#AIP_SearchPanel_Error").fadeToggle(); 
}
function closeADVSearchError() { $("#ADV_SearchPanel_Error").fadeToggle(); }

function highlightterm(mysearchterm,divid, color)
{
    /* only if the term is >= 5 characters will it highlight */
	var browser=navigator.appName;
    if (mysearchterm.length >= 5 && browser.indexOf("Explorer") < 0)
    {
        var htmlinobj = $(divid).html();
        var varName = new RegExp(mysearchterm, "gi");
        if (color=="") color="yellow";
        if($(divid).length >1)
        {
	        for (i = 1; i < $(divid).length; i++)
	        {
	            var htmlinobj = $(divid+":nth("+i+")").html(); 
	            //alert(varName.exec(htmlinobj))
	            ie = (document.all) ? true : false;
	            if (ie) { htmlinobj = htmlinobj.replace(varName,"<span style=\"background-color:"+color+";\">"+mysearchterm+"</span>"); }
	            else {    htmlinobj = htmlinobj.replace(varName,"<span style=\"background-color:"+color+";\">"+varName.exec(htmlinobj)+"</span>"); }
	            $(divid+":nth("+i+")").html(htmlinobj);
	        }
        }
    }
}

function countSelectedByDOM(testdome) {
    return $("."+testdome+" input:checked").size();
}
function countSelected() {
    return $(".selectedrow input:checked").size();
}

/* **********************************************************************************
    Function that manages downloading or viewing a citation from
    selected articles. renders a form based on selection passed though.
*********************************************************************************** */

function constructDLbox(action, domwrapper) {
    $(".boxy-wrapper").html("");
    var allDialogs = [];
    options = $.extend({title: action + " Selected Articles"},{modal:true}, {});
    var domBody = "";

    if (countSelectedByDOM(domwrapper) == 0)
    {
        domBody = "<p>Please Select at least one article</p>";
    }
    else if (countSelectedByDOM(domwrapper) > 20)
    {
        domBody = "<p>You cannot select more then 20 articles.</p>";
    }
    else 
    {
        domBody =   "<div style=\"width:500px;\"><div style=\"width:49%; float:left;\">" +  
                    "<form name=\"myformb\" action=\"http://scitation.aip.org/getabs/servlet/GetCitation\" method=\"get\" onsubmit=\"return downloadarts_action();\">"+
                    "<input type=\"hidden\" name=\"source\" value=\"scitation\" />" +
                    "<input type=\"hidden\" name=\"downloadcitation\" value=\" Go \" />" + 
                    "<input type=\"hidden\" name=\"source\" value=\"scitation\" />";
                    $("."+domwrapper+" input:checked").each(function() {
                        domBody += "<input type=\"hidden\" name=\"SelectCheck\" value=\"" + $(this).val() +"\" />";
                    });
        domBody +=  "<select name=\"fn\" id=\"openselect\" class=\"art-opt-select\">" + 
                        "<option value=\"open_bibtex2\">BibTeX</option>" + 
                        "<option value=\"open_endnote\">EndNote &reg; (generic)</option>" + 
                        "<option value=\"open_isi\">EndNote &reg; (RIS)</option>" + 
                        "<option value=\"open_medline\">Medline</option>" + 
                        "<option value=\"open_aip\">Plain Text</option>" + 
                        "<option value=\"open_refworks\">RefWorks</option>" + 
                        "<option value=\"mysci\">myScitation</option>" + 
                    "</select>" + 
                    "<input type=\"submit\" name=\"Submit\" value=\"Download\" />" + 
                    "</form></div>";
        domBody +=  "<div style=\"width:49%; float:right;\">" +  
                    "<form id=\"myformc\" name=\"myformc\" action=\"http://scitation.aip.org/getabs/servlet/GetCitation\" method=\"get\" onsubmit=\"return viewarts_action('"+domwrapper+"');\">"+
                    "<input type=\"hidden\" name=\"source\" value=\"scitation\" />" +
                    "<input type=\"hidden\" name=\"downloadcitation\" value=\" Go \" />" + 
                    "<input type=\"hidden\" name=\"source\" value=\"scitation\" />";
                    
                    $("."+domwrapper+" input:checked").each(function() {
                        domBody += "<input type=\"hidden\" name=\"SelectCheck\" value=\"" + $(this).val() +"\" />";
                    });
                                    
        domBody +=  "<select name=\"fn\" id=\"viewselect\" class=\"art-opt-select\">" + 
                        "<option value=\"view_coins\">COinS</option>" + 
                        "<option value=\"view_bibtex2\">BibTeX</option>" + 
                        "<option value=\"view_endnote\">EndNote &reg; (generic)</option>" + 
                        "<option value=\"view_isi\">EndNote &reg; (RIS)</option>" + 
                        "<option value=\"view_medline\">Medline</option>" + 
                        "<option value=\"view_aip\">Plain Text</option>" + 
                        "<option value=\"view_refworks\">RefWorks</option>" + 
                    "</select>" + 
                    "<input type=\"submit\" name=\"Submit\" value=\"View\" />" + 
                    "</form></div></div>"; 
    }

    var dialog = new Boxy(domBody, options);
    allDialogs.push(dialog);
    return false;
}


function downloadarts_action()
{
    // IE detection
    if(navigator.userAgent.toLowerCase().indexOf("msie") != -1) { isIE = true; } else { isIE = false; }
    var bname = navigator.appVersion;
    if (bname.indexOf("Safari")<0)
      document.myformb.target='_blank'
   
    if(document.myformb.fn.value == "mysci")
        document.myformb.action = 'http://scitation.aip.org/myscitation/addToMyArticles-submit.do';
    
    document.myformb.submit();
    return false;
}

function viewarts_action(domwrapper)
{
    // IE detection
    document.myformc.action = 'http://scitation.aip.org/getabs/servlet/GetCitation';
    if(navigator.userAgent.toLowerCase().indexOf("msie") != -1) { isIE = true; } else { isIE = false; }
    var bname = navigator.appVersion;
    if (bname.indexOf("Safari")<0)
        document.myformc.target='_blank'
    
    if($("#viewselect").val() == "view_coins")
    {
        var cvipsappend = "";
        $("."+domwrapper+" input:checked").each(function() {
            cvipsappend += "&SelectCheck=" + $(this).val();
        });
        //alert(cvipsappend + "|" + domwrapper);

        var directurl = coinsresolver+"?view=COinS" + cvipsappend;
        
        myArt=window.open(directurl,'COinS','height=600,width=700,scrollbars=yes,resizable=yes,top=30,left=150');
        myArt.focus();
        return false;
    } 
    document.myformc.submit();
    return false;
}

/* **********************************************************************************
    Function created to add selected articles to MyArticles
*********************************************************************************** */

function addArticle(domCollect, appendDOM, formid) {
    $(".boxy-wrapper").html("");
    var allDialogs = [];
    options = $.extend({title: "Selected Articles", modal:true});
    var domBody = "";
    var numselected = 0;
    if(domCollect == null)
    {
    	numselected = countSelected();
    	domCollect = "selectedrow";
    }
    else
    {
    	numselected = countSelectedByDOM(domCollect);
    }
    if(appendDOM == null)
    	appendDOM = "adddomtomysci";
    
    if (numselected == 0)
    {
        domBody = "<p>Please Select at least one article</p>";
        var dialog = new Boxy(domBody, options);
        allDialogs.push(dialog);
         return false;
    }
    else if (numselected > 20)
    {
        domBody = "<p>You cannot select more then 20 articles.</p>";
        var dialog = new Boxy(domBody, options);
        allDialogs.push(dialog);
        return false;
    }
    else 
    {
    // automaticlly submit form
    //selection needs to be more specific   
     var appendform = "";
     $("#"+appendDOM).html("");
     $("."+domCollect+" input:checked").each(function() {
     appendform += "<input type=\"hidden\" name=\"SelectCheck\" value=\"" + $(this).val() +"\" />";
         });
         
        domBody += "<input type=\"submit\" value=\"mysci\"/>";
    
    $("#"+appendDOM).append(appendform);
    //alert(formid + "|" + appendform);
    //document[formid].submit();
    if (formid != null)
    	$("#"+formid).submit();
    else
    	document.addToMySci.submit();
    }
    return false;
}

function launchPopUp(uri)
{
    javascript:window.open(uri);
    return false; 
}

/* JSON traversing function for accessing the Related Articles webservice. */
/* ----------------------------------------------------------------------- */
function launchRelatedArticlesListing(count,artid,bodydom,countdom)
{
    //$(bodydom).html("Loading...");
    $(bodydom).show();
    var domBuild = "<ul>";
    var relatedserviceurl = "/FEWebservices/RelatedArticlesWebservice?sortby=relevance&relartcvips="+artid+"&recordspage="+count;
    //alert(relatedserviceurl);
    $.getJSON(relatedserviceurl, function(data) {
    	  if (data != null)
    	  {
	          var countit = 1;
	          var articlecount = data.relatedarticles.count;
	          if (articlecount > 1)
	          {
	              $.each(data.relatedarticles.articles, function(i,article){
	                domBuild = domBuild + "<li><a onclick=\"$(this).tooltip();\" title=\""+article.abstract+"\" href=\""+article.link+"\">" + article.title + "</a><br/>"+article.citation+"</li>\n";
	                countit++;
	                if (countit > count) { return false; }
	              })
	              $(bodydom).html(domBuild + "</ul>");
	              $(countdom).append("(" + articlecount + ")");
	              if (parseInt(articlecount) <= count)
	                  $(".relatedextras").hide();
	          } else if (articlecount == 1){
	              var article = data.relatedarticles.articles;
	              domBuild = domBuild + "<li><a onclick=\"$(this).tooltip();\" title=\""+article.abstract+"\" href=\""+article.link+"\">" + article.title + "</a><br/>"+article.citation+"</li>\n";
	              $(bodydom).html(domBuild + "</ul>");
	              $(countdom).append("(" + articlecount + ")");
	              if (parseInt(articlecount) <= count)
	                  $(".relatedextras").hide();
	          } else {  
	        	  $("#relatedarticles_tab").text("No Related Articles Found");
	              $("#fulltext-tab").hide();
	          }
	    } else {        
	    	$("#relatedarticles_tab").text("No Related Articles Found");
	        $("#fulltext-tab").hide();
	    }
    });
    return false;
}

/* Creates a GoogleMap pop-up for A given address						   */
/* ----------------------------------------------------------------------- */
function launchMapThis(institutionname, googlekey)
{
	institutionname = institutionname.replace("�","-");
	institutionname = institutionname.replace("�","'");
	var newwindow = window.open("/modules/map_this.jsp?inst="+institutionname+"&api="+googlekey,'mapcanvas','height=400,width=500,resizable=yes,toolbar=no,menubar=no,location=no,titlebar=no');
    if (window.focus) {newwindow.focus()}
    return false;
}

UTF8 = {
		encode: function(s){
			for(var c, i = -1, l = (s = s.split("")).length, o = String.fromCharCode; ++i < l;
				s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]
			);
			return s.join("");
		},
		decode: function(s){
			for(var a, b, i = -1, l = (s = s.split("")).length, o = String.fromCharCode, c = "charCodeAt"; ++i < l;
				((a = s[i][c](0)) & 0x80) &&
				(s[i] = (a & 0xfc) == 0xc0 && ((b = s[i + 1][c](0)) & 0xc0) == 0x80 ?
				o(((a & 0x03) << 6) + (b & 0x3f)) : o(128), s[++i] = "")
			);
			return s.join("");
		}
	};

function createGeoMapPlot(institutionname, leftpos, toppos)
{
	geocoder.getLocations(institutionname, addAddressToMap);
	if ($("#mapthiswindow").is(':hidden'))
		$("#mapthiswindow").css({'left': leftpos-5,'top':toppos+10});
	else
		$("#mapthiswindow").animate( { 'left': leftpos-5,'top':toppos+10 }, 250);
	$("#mapthiswindow-title").html(institutionname);
	if ($("#mapthiswindow").is(':hidden'))
		$("#mapthiswindow").show();
}
 
function initializePopupMapEngine(mapid)
{
	try{
		if (GBrowserIsCompatible()) 
		{
			pmap = new GMap2(document.getElementById(mapid));
			geocoder = new GClientGeocoder();
			var customUI = pmap.getDefaultUI();
			customUI.controls.scalecontrol = true;
			InstIcon = new GIcon();
			InstIcon.image = "http://scitation.aip.org/journals/help_system/getabs/plotimage.png";
			InstIcon.iconSize = new GSize(50, 50);	 
			InstIcon.iconAnchor = new GPoint(25, 50);
			pmap.setUI(customUI);		
			pmap.setCenter(new GLatLng(0, 0), 9);
		}
	}
	catch(error){
	
	}
	
	$("#mapthiswindow").hide();
}

function addAddressToMap(response) {
    //alert(response.Placemark);
    if(response.Placemark != null)
    {
    	$("#mapthiscanvas").fadeTo( "slow", "1.0");
    	place = response.Placemark[0];
	    point = new GLatLng(place.Point.coordinates[1],
	                        place.Point.coordinates[0]);

	    marker = new GMarker(point, { icon:InstIcon });
  		pmap.panTo(point);
	    pmap.addOverlay(marker);  
    } else {
    	$("#mapthiscanvas").fadeTo( "slow", "0.4");
    	$("#mapthiswindow-title").prepend("<span style=\"color:red; font-weigth:bold\">Could not map: </span>");
    }
    
    
}

function LaunchModalWindow(clickobj)
{
    var allDialogs = [];
    options = $.extend({title: $(clickobj).attr("title")},{modal:true}, {});
    var dialog = new Boxy(domBody, options);
    allDialogs.push(dialog);
    return false;
}

function LaunchArticlePrevNext(prevnextdom, x, y)
{
	var winWidth = $(window).width(); 
	var popupWidth = $("#prevnext_floater").width(); 
	if(x+popupWidth > winWidth) x = winWidth - popupWidth - 50; 
	var prevnextcontent = $("#"+prevnextdom).html();
    $("#prevnext_floater").html(prevnextcontent);
    $("#prevnext_floater").css({'left': x, 'top': y+15});
    /* $("#prevnext_floater").animate({"opacity":"1.0", "top":y+15},200); */
    $("#prevnext_floater").animate({"opacity":"1.0"},100);
    $("#prevnext_floater").show();
	return false; 
}

/* JSON traversing function for accessing the Cloud webservice. */
/* ----------------------------------------------------------------------- */
function launchKeywordsCloud(bodydom,key,alias,displaycount,threshold, outboundprogram, startdate, enddate, facetname,searchdes)
{
    if(key == null || key == "")
    	key = "";
    else
    	key = "&key="+key;
    var domBuild = "";
	var domBuild1 = "";
	var dateranger = "";
	if(facetname == "meta-pacs-text")
		displaycount = displaycount/2;
	if(startdate)
		dateranger += "&fromdate="+startdate
	if(enddate)
		dateranger += "&todate="+enddate;
    if(!threshold)
    	threshold = 150;
    var relatedserviceurl = "/FEWebservices/FacetsWebservice?possible1="+key+"&possible1zone=article&facettype="+facetname+"&facetorder=alpha&facetcount="+displaycount+"&submit=facet"+dateranger;
    //alert(relatedserviceurl);
    $.getJSON(relatedserviceurl, function(data) {
    	  if (data != null)
    	  {  
		      var articlecount = parseInt(data.facetCollection.journalcount);
	          var teststring;
	          var outputtext;
	          try {
		      
	        	  if (articlecount > 1)
		          {
		        	  var countHigh = 0;
		        	  var countLow = 10000000;
		              $.each(data.facetCollection[facetname], function(i,metaterm){
		        		  var termcnt = parseInt(metaterm.count)
		        		  if (termcnt > countHigh && (metaterm.term).trim() != "" && (metaterm.term).indexOf("Proceedings") < 0)
		        			  countHigh = termcnt;	
		        		  if (termcnt < countLow && (metaterm.term).trim() != "" && (metaterm.term).indexOf("Proceedings") < 0)
		        			  countLow = termcnt;			        			  
			          })
			          //alert("HIGH:" + countHigh + " | lowsrc:" + countLow);
			          var marginalcompare = threshold * 1.70;
		              var v_facetzone = "";
		              if(facetname == "metakey") v_facetzone = "key";
		              if(facetname == "meta-pacs-text") v_facetzone = "pacs";
		              if(facetname == "exactauthor") v_facetzone = "author";
		              $.each(data.facetCollection[facetname], function(i,facet){
		            	var facettone = "tone";
		            	if((facet.term).trim() != "" && (facet.term).indexOf("Proceedings") < 0)
		            	{
			            	var mysize = parseInt((parseInt(facet.count)-countLow)*100/(countHigh-countLow));
			                if (mysize <= 85) facettone = "toneA";
			            	if (mysize <= 70) facettone = "toneB";
			            	if (mysize <= 55) facettone = "toneC";
			            	if (mysize <= 40) facettone = "toneD";
			            	if (mysize <= 25) facettone = "toneE";
			            	if (mysize <= 10) facettone = "toneF";
			              
			                if(outboundprogram == "verity")
			                	domBuild = domBuild + "<a href=\"http://scitation.aip.org/vsearch/servlet/VerityServlet?KEY=FREESR&possible1="+facet.term+"&possible1zone="+v_facetzone+"&sort=chron&maxdisp=25&threshold=0&smode=strresults\"><span class=\"facetterm "+facettone+"\">" + facet.term + "</span></a>&nbsp;&nbsp;";
			                else
			                	domBuild = domBuild + "<a href=\""+searchdes+"?q="+facet.term+"&searchtype=searchin"+key+"&faceted=faceted&alias="+alias+"&searchzone=2\"><span class=\"facetterm "+facettone+"\">" + facet.term + "</span></a>&nbsp;&nbsp;";
		              	}
		              })
		              $(bodydom).html(domBuild);
		          } else { $(bodydom).html("<p style=\"padding:50px 0px; text-align:center; color:white;\">Sorry, There is no data to display for this criteria</p>");  }

	          } catch(e) { $(bodydom).html("<p style=\"padding:50px 0px; text-align:center; color:white; \">Sorry, There is no data to display for this criteria</p>"); }
	    } else {          
	    	      $(bodydom).html("Could not display");   
	    }
    });
    return false;
}
function toggleTopicCloudDisplay(thisform)
{
    $("#topics_supermenu").slideToggle('fast');
    $("#interactbutton").removeClass("topics_datebar_down");
	var bodydom = $(thisform).find("#bodydom").val();
	$(bodydom).html("<div style=\"text-align:center; padding:50px 0px; color:white;\">Rendering...</div>");
	var threshold = parseInt($(thisform).find("#threshold").val());
	var alias = $(thisform).find("#alias").val();
	var displaycount = parseInt($(thisform).find("#displaycount").val());
	var searchkey = $(thisform).find("#searchkey").val();
	var displayprogram = $(thisform).find("#submitprogram").val();
	var datadisplay = $(thisform).find("#datadisplay").val();
	var searchdes = $(thisform).find("#searchdes").val();
	var startdate = $(thisform).find("#s_year").val() + "-" + (parseInt($(thisform).find("#s_month").val())+1) + "-1";
	var enddate = $(thisform).find("#e_year").val() + "-" + (parseInt($(thisform).find("#e_month").val())+1) + "-1";
	
	launchKeywordsCloud(bodydom, searchkey, alias, displaycount, threshold, displayprogram, startdate, enddate, datadisplay,searchdes);
    return false;
}

function presetDateUpdate(type, clickeddom)
{
    $(".presetlink").css("background-color", "transparent");
    $(clickeddom).css("background-color", "#fffa93");
    var startdate=new Date();
    
    if (type == "all")
    {
    	startdate.setFullYear("1901");
    	startdate.setDate("1");
    	startdate.setMonth("0");
    } else if(type == "lastweek")
    {
    	var startdate = new Date(Date.UTC(y2k(startdate.getYear()),startdate.getMonth(),startdate.getDate(),startdate.getHours(),startdate.getMinutes(),startdate.getSeconds()) - 7*24*60*60*1000);
    } else if(type == "lastmonth")
    {
    	var startdate = new Date(Date.UTC(y2k(startdate.getYear()),startdate.getMonth(),startdate.getDate(),startdate.getHours(),startdate.getMinutes(),startdate.getSeconds()) - 30*24*60*60*1000);
    } else if(type == "lastyear")
    {
    	startdate.setFullYear(startdate.getFullYear() - 1);
    }
    	
    $("#s_month option[value=" + startdate.getMonth() +"]").attr("selected", "true");
    $("#s_day option[value=" + startdate.getDate() +"]").attr("selected", "true");
    $("#s_year option[value=" + startdate.getFullYear() +"]").attr("selected", "true");    
    
    var currentDate=new Date(); 
    $("#e_month option[value=" + currentDate.getMonth() +"]").attr("selected", "true");
    $("#e_day option[value=" + currentDate.getDate() +"]").attr("selected", "true");
    $("#e_year option[value=" + currentDate.getFullYear() +"]").attr("selected", "true");
    return false;
}  

function toggleTopicCloudAdvanced(thisbutton)
{
	if($("#topics_supermenu").is(':hidden'))
		$(thisbutton).addClass('topics_datebar_down');
	else
		$(thisbutton).removeClass('topics_datebar_down');

	$('#topics_supermenu').slideToggle('fast');
}

function LaunchAJAXContentPreview(url, x, y)
{
	var winWidth = $(window).width(); 
	var popupWidth = $("#singlePreview").width(); 
	if(x+popupWidth > winWidth) x = winWidth - popupWidth - 50; 
	$("#singlePreview").css({'left': x,'top':y+5});
	$("#singlePreview").show();
	$("#singlePreview .previewbody").html("Loading...");
	$("#singlePreview .previewbody").load(url);
	return false;
}
function CloseAllContentBrowsers()
{
	$(".browsecontent").hide();
	$(".institution_name").css("background-color","transparent");
	$("#singlePreview").hide();
	$(".dropmenusection").hide();
	return false;
}

function loadTopicBrowser(domplacement, key, count, dateranger, clickeddom, searchdes) 
{  
	
	if(dateranger == null)
		addedparams = "";
	else {
		addedparams = presetDatesOnTopics(dateranger, clickeddom);
	}
	if(count == null || count == 0)
			count = 100; 
    if(key == null || key == ""  || key == " ")
        key = "";
    else
        key = "&key="+key;
	    $(domplacement).html("<p style=\"text-align:center; padding:20px;\"><img src=\"/img/dbt/ajax-loader.gif\" alt=\"Loading...\" /></p>");
	    var domBuild = "";            
	    var sectionalurl = "/FEWebservices/FacetsWebservice?possible1="+key+"&possible1zone=article&facettype=flatsectionheader&facetorder=count&facetcount="+count+"&submit=facet"+addedparams;
	    //alert(sectionalurl);
	    $.getJSON(sectionalurl, function(data) 
	    {
	          if (data != null)
	          {
	        	  if(data.facetCollection.flatsectionheader == null)
	        	  { 
	        		  $(".topic_browser_container").hide();
	        	  } else {
		        	  var ticktock = 0;
		        	  if(data.facetCollection.flatsectionheader.length)
		        	  {
		                  $.each(data.facetCollection.flatsectionheader, function(i,facet){
		                    domBuild = domBuild + "<div class=\"topic_wrapper\"><p class=\"looklikelink topic_section_link\" onclick=\"$('#topicdetail"+ticktock+"').toggle('fast'); renderFacetList('"+facet.term+"','#topicdetail"+ticktock+"', '"+key+"', '"+addedparams+"', '" + searchdes + "')\"><img src=\"/img/icons/add.png\" alt=\"topic bullet\" /> " +facet.term + " ("+facet.count+")</p>";
		                    domBuild = domBuild + "<div id=\"topicdetail"+ticktock+"\" class=\"topicsectional\"><span class=\"loaded\" style=\"display:none;\"></span><div class=\"leftblock\">loading...</div><div class=\"rightblock\"></div></div></div>";
		                    ticktock++;
		                  });
		        	  } else {
		                    domBuild = domBuild + "<div class=\"topic_wrapper\"><p class=\"looklikelink topic_section_link\" onclick=\"$('#topicdetail"+ticktock+"').toggle('fast'); renderFacetList('"+data.facetCollection.flatsectionheader.term+"','#topicdetail"+ticktock+"', '"+key+"', '"+addedparams+"', '" + searchdes + "')\"><img src=\"/img/icons/add.png\" alt=\"topic bullet\" /> " +data.facetCollection.flatsectionheader.term + " ("+data.facetCollection.flatsectionheader.count+")</p>";
		                    domBuild = domBuild + "<div id=\"topicdetail"+ticktock+"\" class=\"topicsectional\"><span class=\"loaded\" style=\"display:none;\"></span><div class=\"leftblock\">loading...</div><div class=\"rightblock\"></div></div></div>";
		        	  }
	                  $(domplacement).html(domBuild);
	        	  }
            }
       });
}
function paintTopicHeader(term, paintdom)
{
	$(paintdom).html("Top 10 Topics Published from " + term);
}
function renderFacetList(facetterm, domplacement, key, addedparams, searchdes) 
{ 
	if(addedparams == null)
		addedparams = "";
	if ($(domplacement + " .loaded").html() == "")
	{
		var sectionalurl = "/FEWebservices/FacetsWebservice?possible1="+key+"&possible1zone=article&facettype=exactauthor&facettype=metakey&facetorder=count&facetcount=10&flatsectionheader="+escape(facetterm)+"&submit=facet" + addedparams;
	    var ldomBuild = "";
	    var rdomBuild = "";
	    //alert(sectionalurl);
	    $.getJSON(sectionalurl, function(data) 
	    {
	          if (data != null)
	          {  
		              if(data.facetCollection.exactauthor.length)
		              {
			        	  $.each(data.facetCollection.exactauthor, function(i,facet){
			            	var authorlink = searchdes + "?q="+facet.term+"&possible1="+facet.term+""+key+"&possible1zone=author&alias="+$('#alias').val()+"&flatsectionheader="+escape(facetterm.replace(/ /g,"+"))+"&faceted=faceted&searchzone=2"+addedparams;
			                ldomBuild = ldomBuild + "<a href=\""+authorlink+"\">"+facet.term+" ("+facet.count+")</a>";
			              });
		              } else {
			            	var authorlink = searchdes + "?q="+data.facetCollection.exactauthor.term+"&possible1="+data.facetCollection.exactauthor.term+""+key+"&possible1zone=author&alias="+$('#alias').val()+"&flatsectionheader="+facetterm.replace(/ /g,"+")+"&faceted=faceted&searchzone=2"+addedparams;
			                ldomBuild = ldomBuild + "<a href=\""+authorlink+"\">"+data.facetCollection.exactauthor.term+" ("+data.facetCollection.exactauthor.count+")</a>";
		              }
		              if(data.facetCollection.metakey.length)
		              {
			              $.each(data.facetCollection.metakey, function(i,facet){
			            	  var kwlink = searchdes + "?q="+facet.term+"&possible1="+facet.term+""+key+"&possible1zone=keywords&alias="+$('#alias').val()+"&flatsectionheader="+escape(facetterm.replace(/ /g,"+"))+"&faceted=faceted&searchzone=2"+addedparams;
			            	  rdomBuild = rdomBuild + "<a href=\""+kwlink+"\">"+facet.term+" ("+facet.count+")</a>";
			              });
		              } else {
		            	  var kwlink = searchdes + "?q="+data.facetCollection.metakey.term+"&possible1="+data.facetCollection.metakey.term+""+key+"&possible1zone=keywords&alias="+$('#alias').val()+"&flatsectionheader="+facetterm.replace(/ /g,"+")+"&faceted=faceted&searchzone=2"+addedparams;
		            	  rdomBuild = rdomBuild + "<a href=\""+kwlink+"\">"+data.facetCollection.metakey.term+" ("+data.facetCollection.metakey.count+")</a>";
		              }
		              $(domplacement + " .leftblock").html(ldomBuild);
		              $(domplacement + " .rightblock").html(rdomBuild);
	        }
	          
	        $(domplacement + " .loaded").html("---");
	   });
	 }
}

function y2k(number) { return (number < 1000) ? number + 1900 : number; }

function presetDatesOnTopics(type, clickeddom)
{
	$(".topicdateranger .looklikelink").removeClass("selected");
    $(clickeddom).addClass("selected");

    var startdate=new Date();
    
    if (type == "all")
    {
    	startdate.setFullYear("1901");
    	startdate.setDate("1");
    	startdate.setMonth("0");
    } else if(type == "lastweek")
    {
    	var startdate = new Date(Date.UTC(y2k(startdate.getYear()),startdate.getMonth(),startdate.getDate(),startdate.getHours(),startdate.getMinutes(),startdate.getSeconds()) - 7*24*60*60*1000);
    } else if(type == "lastmonth")
    {
    	var startdate = new Date(Date.UTC(y2k(startdate.getYear()),startdate.getMonth(),startdate.getDate(),startdate.getHours(),startdate.getMinutes(),startdate.getSeconds()) - 30*24*60*60*1000);
    } else if(type == "lastyear")
    {
    	startdate.setFullYear(startdate.getFullYear() - 1);
    }
    var startdateSTR = startdate.getFullYear() + "-" + (startdate.getMonth()+1) + "-" + startdate.getDate();
    var currentDate=new Date(); 
    var enddateSTR = currentDate.getFullYear() + "-" + (currentDate.getMonth()+1) + "-" + currentDate.getDate();
    var consolidatedreturn = "&fromdate="+startdateSTR+"&todate="+enddateSTR;
    return consolidatedreturn;
} 
function launchMedia(itemobj)
{
    $("#fulltextwrapper_content").html("<div style=\"text-align:center; padding:50px;\"><img src=\"/img/fulltext/ajax-loader.gif\" alt=\"Loading\"/></div>");
	$(".dropmenusection").hide();
	$("#darken").fadeIn('slow');
	$("#fulltextwrapper").fadeIn('slow', function () {
		$("#fulltextwrapper_content").load($(itemobj).attr("href"));
	});
	return false;
}

function launchImage(itemobj)
{
    $("#fulltextwrapper_content").html("<div style=\"text-align:center; padding:50px;\"><img src=\"" + $(itemobj).attr("href") + "\" alt=\"Enlargement\"/></div>");
	$(".dropmenusection").hide();
	$("#darken").fadeIn('slow');
	$("#fulltextwrapper").fadeIn('slow');
	return false;
}



function closeFulltext()
{
    $("#darken").fadeOut('slow');
    $("#fulltextwrapper").fadeOut('slow');
    return false;
}

function addCommas(nStr)
{
   nStr += '';
   x = nStr.split('.');
   x1 = x[0];
   x2 = x.length > 1 ? '.' + x[1] : '';
   var rgx = /(\d+)(\d{3})/;
   while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
   }
   return x1 + x2;
}

function loadOdometer(domtopaint)
{
    var relatedserviceurl = "/FEWebservices/FacetsWebservice?possible1=&possible1zone=article&facettype=meta-pacs-text&facetorder=alpha&facetcount=1&submit=facet";
    //alert(relatedserviceurl);
    $.getJSON(relatedserviceurl, function(data) {
    	  if (data != null)
    	  {  
		      var articlecount = data.facetCollection.journalcount;
		      if (articlecount.length)
		      $(domtopaint).html(addCommas(articlecount));
    	  }
    });
}

/* ----------------------------------------------------------------- */
/* MANIPULATES THE TEXT SIZE OF THE PAGE */
/* ----------------------------------------------------------------- */
function textsize(manipulator)
{
    var newsize = "";
    var currentsize = parseInt($(".canbestyled").css("font-size"));
    if (manipulator == "+" && currentsize < 20)
    {
        newsize = (currentsize + 1) + "px";
    }
    else if (manipulator == "-" && currentsize > 8)
    {
        newsize = (currentsize - 1) + "px";
    }
    else
    {
        newsize = manipulator + "px";
    }
    
    $(".canbestyled").css("font-size",newsize);
    return false;
}

function sendFeedback(thisform) {
	var emailbody = $(thisform).find("#feedbackbody").val();
	var sendername = $(thisform).find("#username").val();
	var affiliation = $(thisform).find("#affiliation").val();
	var useremail = $(thisform).find("#useremail").val();
	var feedbacktype = $(thisform).find("#feedbacktype").val();
	var recaptcha_challenge_field = $(thisform).find("#recaptcha_challenge_field").val();
	var recaptcha_response_field = $(thisform).find("#recaptcha_response_field").val();
	var feedbackresolver = $(thisform).attr('action');
	var usecaptcha = $(thisform).find("#usecaptcha").val();
	var siteid = $(thisform).find("#siteid").val();
	var feedback_type = $(thisform).find("#feedback_type").val();	
	var errortext = "";

	if(emailbody.trim() == "")
		errortext = "<strong>WARNING:</strong> Please explain the reason for your correspondance";
	else if(sendername.trim() == "")
		errortext = "<strong>WARNING:</strong> Please enter your name";
	else if((useremail.trim() == "") || (useremail.indexOf(".") < 0) || (useremail.indexOf("@") < 0))
		errortext = "<strong>WARNING:</strong> Please enter a valid email address";
	else if(usecaptcha=="true" && recaptcha_response_field.trim() == "")
		errortext = "<strong>WARNING:</strong> Please type in the words from the image";
	
	if(errortext != "")
	{
		$(thisform).find(".formerror").html(errortext);
		$(thisform).find(".formerror").show('blind',400);
		return false;
	}
	
    var feedbacksubiturl = feedbackresolver + "?sendtype="+feedbacktype;
    $.post(feedbacksubiturl, { sendername:sendername, useremail:useremail, affiliation:affiliation, feedbackbody:emailbody, recaptcha_response_field:recaptcha_response_field,recaptcha_challenge_field:recaptcha_challenge_field,siteid:siteid,feedback_type:feedback_type,usecaptcha:usecaptcha }, 
		   function(data){
    			if(data.indexOf("invalid captcha") >= 0)
    			{
    				var feedbackformbody = $(thisform).find(".feedbackform_body");
    				$(feedbackformbody).html(data);
    				$(thisform).find(".formerror").html('Your captcha entry was invalid. Please correctly type the two words you see.');
    				$(thisform).find(".formerror").show('blind',400);
    				Recaptcha.reload();
    			} else {
    				var feedbackformsparent = $(thisform);
    				$(feedbackformsparent).html("<div style=\"text-align:center;\"><p><img src=\"/img/ajax-loader-bar.gif\" alt=\"Loading\" /></p><p>Sending...</p></div>");
    				$(feedbackformsparent).html("<div style=\"text-align:center;\">" + data + "</div>");
    			}
	} );
	return false;
}

function createCaptcha(key, id)
{
	//alert("dfhjhsdg");
	Recaptcha.destroy();
	Recaptcha.create(key, id, {
	    theme: 'clean',
	    callback: Recaptcha.focus_response_field					      
	});
	return false;
}
function loadSuperMenu(thisOBJ, loadintoID)
{
	if($(thisOBJ).hasClass("linkselected"))
	{
		$(".entitlelink").removeClass("linkselected");
		if($(thisOBJ).attr('name') != "")
			$("#" + $(thisOBJ).attr('name')).slideToggle('fast');
		else
			$("#" + loadintoID).slideToggle('fast');

		return false;		
	}
	if($(thisOBJ).attr('name') != "" && $("#" + loadintoID).is(':visible'))
		$("#" + loadintoID).slideToggle('fast');
	else
		$("#supermenu_contact").hide('fast');
	$(".entitlelink").removeClass("linkselected");
	$(thisOBJ).addClass("linkselected");
	
	if($(thisOBJ).attr('name') != "")
	{
		if($("#" + $(thisOBJ).attr('name')).is(':hidden'))
			$("#" + $(thisOBJ).attr('name')).slideToggle('fast');
	} else {
		var urltoload = $(thisOBJ).attr("href");
		//$("#" + loadintoID).html("<p style=\"text-align:center\">Loading...</p>");
	
	    $.post(urltoload, 
	 		   function(data){
	    			$("#" + loadintoID + "_body").html(data);
	    			if($("#" + loadintoID).is(':hidden'))
	    				$("#" + loadintoID).slideToggle('fast');
	    			//$("#" + loadintoID).show('blind',400);
	 	} );
	}
	    return false;
}

function closeSuperMenu(thisOBJ)
{
	$(".entitlelink").removeClass("linkselected");
	$(thisOBJ).parent().parent().slideToggle('fast');
	return false;
}
function subscription_formcheck()
{
	var emailA = $("#email").val();
	var errortext = "";
	if(emailA.trim() == "")
		errortext = "<strong>WARNING:</strong> You need to enter your email address";
	else if((emailA.indexOf(".") < 0) || (emailA.indexOf("@") < 0))
		errortext = "<strong>WARNING:</strong> Please enter a valid email address";
	if(errortext != "")
	{
		$(".regformerror").html(errortext);
		$(".regformerror").show('blind',400);
		return false;
	} else {
		return true;
	}
}

// Polopoly Polling
function submitVote(element) {
	var id = $(element).find(".pollId").val();
	var url = $(element).attr("action") + "?" + $(element).serialize();
	popupPollResultWindow(id,url);
	return false;
}

function popupPollResultWindow (id,url) {
	$("#" + id).html("loading...");
	$("#" + id).load(url);
	return false;
}

function allcheckedtest(isall)
{
	if(isall!=null && isall=="results" && $(".alljournalscheck:checked").size() > 0) {
		$(".journalkey").attr("checked", true);
	
	}
	else if(isall!=null && isall=="all")
	{
		if($(".alljournalscheck:checked").size() > 0)
		{
			$(".journalkey").each(function() {
				$(this).attr("checked", true);
			});
			
			$(".addkey").each(function() {
				$(this).attr("checked", false);
			});
		}
		else {
			$(".journalkey, .alljournalscheck").each(function() {
				if($(this).val() != defaultsearchkey)
					$(this).attr("checked", false);
			});
			// need to handle the fact that the default coden is actually the XXX_ALL input
//			if(defaultsearchkey == $(".alljournalscheck").val())
//				$(".journalkey, .alljournalscheck").attr("checked", true);
		}
	} else {
		if($(".journalkey:checked").size() == 0)
			$(".defaultkey").attr("checked", true);
		else if($(".journalkey:checked").size() == $(".journalkey").size())
			$(".alljournalscheck").attr("checked", true);
		else
			$(".alljournalscheck").attr("checked", false);
	}
}

function colleague_formcheck(thisform)
{
	var ce = thisform.colleagueemail.value;
	var cn = thisform.colleaguename.value;
	var se = thisform.senderemail.value;
	var sn = thisform.sendername.value;
	var mes = thisform.sendermessage.value;

	if (!ce.checkempty()) {
		alert("Please enter your colleague's email.");return false;
	}
	if ((ce.indexOf(".") < 0) || (ce.indexOf("@") < 0)) {
		alert("Please enter a valid colleague email address.");return false;
	}
	if (!cn.checkempty()) {
		alert("Please enter your colleague's name.");return false;
	}
	if (!sn.checkempty()) {
		alert("Please enter your name, so that your colleague knows who sent this email.");return false;
	}
	if (!se.checkempty()) {
		alert("Please enter your (the sender) email.");return false;
	}
	if ((se.indexOf(".") < 0) || (se.indexOf("@") < 0)) {
		alert("Please enter a valid email address for yourself.");return false;
	}
	if (mes.length > 200) {
		alert("Message cannot be larger than 200 pixels. You have " + mes.length);return false;
	}
    var appendcvips = ""; 
    $(".selectedrow input:checked").each(function() {
        appendcvips += "&key=article::" + $(this).val();
    });     

	$(thisform).html("<div style=\"text-align:center;\"><p><img src=\"/img/ajax-loader-bar.gif\" alt=\"Loading\" /></p><p>Sending...</p></div>");
    appendcvips = emailresolver + "?action=emailColleague" + appendcvips;
	$.post(appendcvips, { colleagueemail:ce, colleaguename:cn, sendername:sn, senderemail:se, sendermessage:mes }, 
		   function(data){
		   		$(thisform).html("<div style=\"text-align:center;\">" + data + "</div>");
	} );

return false;
}

function dbt_toggleAbstract(artcvips) {
    $("#butop"+artcvips+", #butcl"+artcvips+", #absop"+artcvips+", #abscl"+artcvips).toggle();
}
function dbt_toggleTopic(artcvips) {
    $("#butop"+artcvips+", #butcl"+artcvips+", #topicop"+artcvips+", #topicscl"+artcvips).toggle();
}
function dbt_togglePacs(artcvips) {
    $("#pbutop"+artcvips+", #pbutcl"+artcvips+", #pacsop"+artcvips+", #pacscl"+artcvips).toggle();
}
function hightlightrowaction(rowid) {
	var thisrow = $("#"+rowid);
	if ($(thisrow).hasClass("selectedrow")) {
		$(thisrow).removeClass("selectedrow");
		$(thisrow).addClass("noselectrow");
	} else {
		$(thisrow).addClass("selectedrow");
		$(thisrow).removeClass("noselectrow");
	}
	updateShowCounts();
}
//Function that will update the number of selected articles in real time to the front-end
function updateShowCounts() {
    var howmany = ""; 
    if (countSelected()<1) { howmany = 0; $("#showhidearts").hide(); } else { howmany = countSelected(); $("#showhidearts").show();}
    $("#actionbar-arrow").html(howmany);
}
function showAbstracts()
{
    $(".selectedrow input:checked").each(function() {
    	 dbt_toggleAbstract($(this).val());
    	 dbt_togglePacs($(this).val());
     });
    if (countSelected() == 0)
    {
         $(".noselectrow input").each(function() {
        	 dbt_toggleAbstract($(this).val());
        	 dbt_togglePacs($(this).val());
         });    
     }
	return false;
}