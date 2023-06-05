/* global definitions, overrides, and functions common to SAGE Publication sites */

gSiteOptions.suppressDockedSearchNav = false;
gSiteOptions.authAffilMatch = 'div.article div.contributors:not(.intlv) ol.affiliation-list';
gSiteOptions.authAffilDisableMultipleMatches = true;

$(document).ready(function() {
	var histLinks = $("div.search-history-links");
	if (histLinks.length) {
		histLinks.css("display","block");
		$("div.search-history-links form input[name='submit']").hide();
		var runForm = $("div.search-history-links div.run-last-search-inputs").parent("form");
		var runSpan = $("div.search-history-links span#srchhist-run-last");
		var editForm = $("div.search-history-links div.edit-last-search-inputs").parent("form");
		var editSpan = $("div.search-history-links span#srchhist-edit-last");
		if (runForm.length && runSpan.length) {
			var linkText = runSpan.attr('title');
			runSpan.replaceWith('<a href="#" id="srchhist-run-last-link">&#171; ' + linkText + '<\/a>')
			$("#srchhist-run-last-link").click(function(e) {
				runForm.find("input[name='submit']").click();
				e.preventDefault();
			});
		}
		if (editForm.length && editSpan.length) {
			var linkText = editSpan.attr('title');
			editSpan.replaceWith('<a href="#" id="srchhist-edit-last-link">' + linkText + '<\/a>')
			$("#srchhist-edit-last-link").click(function(e) {
				editForm.find("input[name='submit']").click();
				e.preventDefault();
			});
		}
	}
	$(".openaccess a[rel='full-text']").text("Free Full Text");
	$(".openaccess a[rel='full-text.pdf']").text("Free Full \(PDF\)");
	updateFormInput("#header-search-label", "#header-input", '', '');
	$('form#portal-qs-form').submit(function(e) {
		return(doSearch("#header-search-label","#header-input"));
	});
	$('form#journal-qs-form,').submit(function(e) {
		return(doSearch("#header-qs-search-label","#header-qs-input"));
	});
  $('form#portal-qs-form').click(function(e) {
		return(doSearch("#header-search-label","#header-input"));
	});
	$('form#journal-qs-form,').click(function(e) {
		return(doSearch("#header-qs-search-label","#header-qs-input"));
	});
	$('form#sagepub-qs-form').submit(function(e) {
		return(doSearch("#header-qs-search-label","#header-qs-input"));
	});
	$('form#sagepub-qs-form,').click(function(e) {
		return(doSearch("#header-qs-search-label","#header-qs-input"));
	});
});

function poptoggle(postid) {
  var whichpost = document.getElementById(postid);
  if (whichpost.className=="expandblock") {
		document.getElementById('p' + postid).src = '/publisher/icons/plus.png';
  	whichpost.className="collapseblock";
  }
  else {
    whichpost.className="expandblock";
		document.getElementById('p' + postid).src = '/publisher/icons/minus.png';
  }
}
function setupCollapsibles() {
  prepCollapsibles("div.content-box div.collapsible, #col-3 .collapsible");
}
function doSearch(labelMatchString,inputMatchString) {
	
	var label =  $(labelMatchString);
	var iStr = 'input'+inputMatchString;
	var input =  $(iStr);
	var text = label.text().toLowerCase();
	var PhqsText = input.val().toLowerCase(); 

	if ((PhqsText == text) || (PhqsText == undefined) || (PhqsText == '')) {
    return false;
  }
	else {
		return true;
	}
}
