var priority_instance;
var priority_value;

// Add to init funcs (run in head-ads.js)
// This is a hook for future use of LabJS
__init__.push({
	name: "article.js",
	func: function(){
		jQuery("body").addClass("force-scrollbars");

		jQuery("#export-menu").click(
			function() {
				jQuery("#export").toggle();
			}
		);

		jQuery("#export div").addClass("export-item");
		jQuery("#export a").addClass("tipsy-hint-e");
		jQuery("#article-manage a").addClass("nohilight").tipsy({gravity:"s"});

		jQuery("#toread").stars({
			captionEl: jQuery("#toread_descr"),
			callback: function(ui, type, value){
				updatePriority(value);
			},
			cancelTitle: "I've already read it",
			cancelValue: 0,
			cancelShow: true,
			showTitles: false
		});
		priority_instance = jQuery("#toread").data("stars");
		priority_value = priority_instance ? priority_instance.options.value : null; // Get current Value
		init_clexpand();
		fixFileLinkouts();
		SPRINGER.load();
		DEEPDYVE.load();

		// code to select citation on click (for cut and paste);
		var e = jQuery("#citation dl:first");
		if (e.length) {
			e.wrap("<span id='the_citation' />");
		} else {
			jQuery("#citation-plain span:first").wrap("<span id='the_citation' />");
		}
		jQuery("#the_citation").click(function() {
			selectText("the_citation");
		});


		jQuery("a.fancybox").click(function(){
			var e = jQuery(this);
			var m = e.metadata();
			var index = 0;
			if (m && m.idx) {
				index = m.idx;

			}
			fancyPreview(jQuery("#fancyBoxPreview"), index);
			return false;
		});

		setupArticleTags();
		setupTags();

		setupCito();

		/****** CiTO ******/

		jQuery(".cito").click(function(){
			selectText(this);
		});

		var cito = getCitoCookie();
		if (cito) {
			jQuery("#citoTargetTitle").text(cito.title).attr("href",cito.href);

			if (cito.user_article_id == ARTICLE.user_article_id) {
				jQuery("#selectCitoDiv").hide();
				jQuery("#citoIsTarget").show();
			} else {
				jQuery("#selectCitoDiv").show();
				jQuery("#citoSetAsTarget").show();
			}
		} else {
			jQuery("#citoSetAsTarget").show();
		}

		jQuery(".edit").each(
			function() {
				var elem = jQuery(this);
				var data = elem.metadata();
				var submitData = {article_id : data.article_id, username: data.username, userfile_id: data.userfile_id};
				elem.editable("/personal_pdf_rename", {
						tooltip    : "Doubleclick to edit...",
						event      : "dblclick",
						style      : "inherit",
						method	   : "POST",
						submitdata : submitData,
						callback   : function(value) {
							var elem = jQuery(this);
							elem.closest("div").find("a")
								.attr("href","/pdf/user/"+data.username+"/article/"+data.article_id+"/"+value);
						}
				});
				elem.tipsy({gravity: 'n'});
			}
		);

		if (getUIOption('userfile_keep_name', 1)) {
			jQuery("#keep_name").attr("checked",true);
		}

		/*jQuery("#citation-plain").hover(
			function() {jQuery("#show-citation").show()},
			function() {jQuery("#show-citation").hide()}
		);*/

		// Funny (jQuery?) Bug.   The buttons/selected aren't rendered
		// if the div is hidden

		var params = getQueryStringParams();
		jQuery("#citation-div").hide();

		if (params["skipurl"] && params["skipurl"][0] == "true") {
			jQuery("#citation-show-url").attr("checked",true);
		}


		if (params["citation_format"] || params["skipurl"]) {
			showCitation();
		}


		jQuery("#show-citation").click(function() {
			showCitation();
		});


		jQuery(".pdf-annotate").click(
			function() {
				annotate(jQuery(this));
			}
		);

		/*
		jQuery("#likes-div").position({
				of: jQuery( "#maindiv" ),
				my: "left top",
				at: "left top",
				offset: "0 -16"
		});
		*/

	}
});

var citationLoaded = false;
function showCitation () {
	jQuery("#citation-div").toggle();
	if (citationLoaded) {
		return;
	}
	jQuery("#citation").text("Loading");

	var skipurl="false";
	if (jQuery("#citation-show-url:checked").length > 0) {
		skipurl="true";
	}

	jQuery("#citation").load("/go_citation?article_id="+ARTICLE.article_id+"&username"+ARTICLE.username+"&group_id="+ARTICLE.group_id+"&skipurl="+skipurl+" #citation span");

	citationLoaded = true;
}


function reloadCitation() {
	jQuery('#citation-form').submit();
}

function clearSelection (id) {
	var e = jQuery(id);
	var t = e.val();
	e.val("");
	e.val(t+ " ");
	e.focus();
}


function getAnnotator() {
	var base = jQuery("#fancybox-inner");
	return _getAnnotator(base);
}

function _getAnnotator(base) {
	var e =  base.find("object").get(0);
	if (!(e && e.getMarkList)) {
		e = base.find("embed").get(0);
	}

	return (e && e.getMarkList) ? e : null;
}

var annotations = null;

function syncAnnotations(userfile_id) {
	var annotator = getAnnotator();
	if (!annotator) {
		alert("No marks");
		return;
	}
	annotations = annotator.getMarkList();

	var x = [];
	for (var i=0; i<annotations.length; i++) {
		if (annotations[i]) {
			x.push(annotations[i]);
		}
	}

	var text = jQuery.toJSON(x);

	LOG(text);

	jQuery.ajax({
		url: "/pdf_annotate_save",
		data: {userfile_id : userfile_id, annotations: text},
		dataType: 'jsonp',
		success: function(data) {
			if (data && data.status && data.status=="ok") {
				// alert("SYNC OK");
			} else {
				alert("Unable to save annotations (data error)");
			}
		},
		error: function() {
			alert("Unable to save annotations (error)");
		}

	});

	annotations = null;


}


function annotate(which) {
	annotations = null;
	var meta = which.metadata();
	jQuery.ajax({
		url: "/pdf_annotate_load?userfile_id="+meta.userfile_id+"&callback=?",
		dataType: 'json',
		success: function(data) {
			if (data && data.status && data.status=="ok") {
				annotations = data.annotations;
				_annotate(which);
			} else {
				alert("Unable to load annotations (data error) "+jQuery.toJSON(data));
			}
		},
		error: function() {
			alert("Unable to load annotations (error)");
		}

	});
}



function _annotate(which) {

	var meta = which.metadata();
	var userfile_id = meta.userfile_id;
	var swfurl = "/pdf_annotate_loadswf/"+meta.url;

	var params = {
		Scale			: 0.6,
		ZoomTransition		: "easeOut",
		ZoomTime		: 0.5,
		ZoomInterval		: 0.1,
		FitPageOnLoad		: false,
		FitWidthOnLoad		: true,
		PrintEnabled		: true,
		AnnotationsAuthorVisible: true,
		AnnotationsAuthor	: "Erik",
		AnnotationsCategories	: "Internal;External;Other",
		AnnotationsCheckBoxLabel: "Post to CMS",
		localeChain		: "en_US",
		SwfFile			: swfurl
	};


	var w = Math.round(jQuery(window).width()*0.8);
	var h = Math.round(jQuery(window).height()*0.8);


	LOG("DIMS: "+w+"x"+h);

	var fb = [];
	fb.push({
		'height'	: h,
		'width'		: w,
		'href'		: GLOBAL.staticRoot+'/FlexPaperViewer_Annotations.swf',
		'swf'		: {flashvars: jQuery.param(params), allowfullscreen:true}
	});

	jQuery.fancybox(fb,
		{
			'speedIn'	: 100,
			'speedOut'	: 100,
			'overlayShow'	: true,
			'cyclic'	: true,
			'modal'		: false,
			'padding'       : 20,
			'titlePosition' : "outside",
			'title'         : "Esc to Exit",
			'hideOnOverlayClick' : true,
			'onCleanup'     : function() {
				syncAnnotations(userfile_id);
			}
		}
	);
}

function onDocumentLoaded(totalPages){
	// alert("Loaded " + totalPages + " " + annotations);
	if (annotations) {
		//setTimeout("loadAnnotations()",2000);
		loadAnnotations();
	}
}

function loadAnnotations() {
	//annotations = [{"selection_text": "Shiek bin Baz and his like refuse to accept the radio","has_selection": true,"color": "#fffc15","selection_info": "1;3771;3824"}];
	//annotations = [{has_selection: false,color: '#fffc15',selection_info:"1;128;174"}];
	//return;
	if (!annotations || annotations.length==0) {
		return;
	}
	var a = getAnnotator();
	if (a) {
		a.addMarks(annotations);
		//alert(JSON.stringify(annotations));
	} else {
		alert("Unable to set marks");
	}
}


/*******************************************************************************
 * CiTO
 */
function setCitoCookie() {
	var cito = {
		article_id : ARTICLE.article_id,
		user_article_id : ARTICLE.user_article_id,
		title: jQuery("#article_title").text(),
		href: location.pathname
	};
	jQuery.cookie("cito", jQuery.toJSON(cito), { path: '/', domain: GLOBAL.cookieDomain} );
	jQuery("#selectCitoDiv").hide();
	jQuery("#citoSetAsTarget").hide();
	jQuery("#citoIsTarget").show();

}


function getCitoCookie() {
	var cookie = jQuery.cookie("cito");
	if (!cookie) {
		return null;
	}
	return jQuery.secureEvalJSON(cookie);
}


function addCitoTag(doReverse) {
	var cito = getCitoCookie();
	if (!cito) {
		alert("Error - no CiTO target set");
		return;
	}

	var val = jQuery("#citoSelection").val();
	if (val=="--") {
		return;
	}

	var reverseFlag = 'n';
	jQuery("#cite-forward-type").text(val);
	jQuery("#cito-reverse input:eq(0)").focus();
	if (val=="cites") {
		if (!doReverse) {
			jQuery("#cite-reverse-type").text("isCitedBy");
			jQuery("#cito-reverse").show();
			return;
		} else {
			reverseFlag = doReverse;
		}
	} else if (val=="isCitedBy") {
		if (!doReverse) {
			jQuery("#cite-reverse-type").text("cites");
			jQuery("#cito-reverse").show();
			return;
		} else {
			reverseFlag = doReverse;
		}
	}


	var params = {
			"this_user_article_id": ARTICLE.user_article_id,
			"that_article_id":      cito.article_id,
			"this_article_id":      ARTICLE.article_id,
			"that_user_article_id": cito.user_article_id,
			"reverse":              reverseFlag,
			"cito_code":            val,
			"from" :                location.pathname
	};

	//alert(jQuery.toJSON(params));
	//return;

	jQuery.post('/add_cito_tags.json.do', params,
		function(data) {
			if (data && data.status && data.status=="ok") {
				jQuery("#cito-tag-updated").show().fadeOut(2000);
				location.reload();
			}
		}
	);
}

var qTipOpts = {
	content: null,
	show: 'mouseover',
	hide: { when: 'mouseout', fixed: true, delay: 150 },
	style: {
		width: 700,
		padding: 5,
		background: '#E8F2FF'
	},
	position: {
		corner: {
			target: 'bottomLeft',
			tooltip: 'topLeft'
		},
		adjust: {
			screen: true,
			y: 4
		}
	}
};


function setupCito() {
	var cites = [];

	var re = /^(?:cites|cito)--(\w+)--(\d+)$/;

	jQuery("#articleTagList .tag").each(function() {
		var t = jQuery(this);
		if (re.exec(t.text()) != null) {
			var c = {
				type : 	RegExp.$1,
				article_id : RegExp.$2
			};
			cites.push(c);
		}
	});

	// This is only the camel-case names
	var nameMap = {
		agreeswith: "agreesWith",
		citesasauthority: "citesAsAuthority",
		citesasmetadatadocument: "citesAsMetadataDocument",
		citesassourcedocument: "citesAsSourceDocument",
		citesforinformation: "citesForInformation",
		disagreeswith: "disagreesWith",
		iscitedby: "isCitedBy",
		obtainsbackgroundfrom: "obtainsBackgroundFrom",
		obtainssupportfrom: "obtainsSupportFrom",
		sharesauthorswith: "sharesAuthorsWith",
		usesdatafrom: "usesDataFrom",
		usesmethodin: "usesMethodIn"
	}


	if (cites.length > 0) {
		var div = jQuery("#citesList");
		div.empty();
		for (var i=0; i<cites.length; i++) {
			var c = cites[i];
			var t = nameMap[c.type] || c.type;
			div.append("<a href='/article/"+c.article_id+"'>"+t+"</a>&nbsp;");
			div.append("<a class='plain mini-popup {article_id:"+c.article_id+" }'>"+
				"<img src='"+GLOBAL.imgRoot+"/arrow-collapsed.gif' /></a>&nbsp;");
		}
		jQuery("#cites").show();
		jQuery(".mini-popup").live('mouseover', function()  {
			var e = jQuery(this);
			if (!e.data('init'))  {
				e.data('init', true);
				var m = e.metadata();
				var absDiv = jQuery("<div>Please Wait...</div>");
				qTipOpts.content = absDiv;
				absDiv.load("/article-popup.adp?article_id="+m.article_id+"&src_username="+ARTICLE.username+" .main", function() {
					qTipOpts.content = absDiv;
					e.qtip(qTipOpts);
					e.trigger('mouseover');

					var api = e.qtip("api");
					var d = api.elements.content;
					d.find(".item-abstract").show();
					d.find(".posted-by").hide();
					d.find(".item-icons").hide();
				});
			}
		});
	} else {
		if (ARTICLE.is_owner != "1") {
			jQuery("#cites").hide();
		}
	}
}

function updatePriority(value) {
	jQuery("#to_read_load").show();
	var img = GLOBAL.imgRoot;
	if (value == 0) {
		img = img+"/tick.png";
	} else {
		img = img + "/star"+value+".png";
	}
	jQuery.getJSON("/editpriority.json?user_article_id="+ARTICLE.user_article_id+"&article_id="+ARTICLE.article_id+"&to_read="+value+"&callback=?",
		function(data) {
			jQuery("#to_read_load").hide();
			if (data && data.status && data.status=="ok") {
				var e = jQuery("#to_read_stars");
				e.attr("src",img);
				e.removeAttr("title");
				e.unbind("hover mouseover mouseout");
				priority_value = value;
				clexpand_collapse("priority");
			} else {
				priority_instance.select(priority_value);
			}
		}
	);
}


function updatePrivacy() {
	var privacy = jQuery("#privacy-body input:checked").val();
	jQuery("#privacy-load").show();
	jQuery.getJSON("/editprivacy.json?user_article_id="+ARTICLE.user_article_id+"&privacy="+privacy+"&callback=?",
		function(data) {
			jQuery("#privacy-load").hide();
			if (data && data.status && data.status=="ok") {
				var e = jQuery("#privacy-status");
				if (privacy == "G") {
					e.text("public");
				} else {
					e.text("private");
				}
				clexpand_collapse("privacy");
			}
		}
	);
}


function updateOwnpub() {
	var is_own_pub = jQuery("#is_own_pub:checked").val();
	jQuery("#ownpub-load").show();
	jQuery.getJSON("/editownpub.json?user_article_id="+ARTICLE.user_article_id+"&is_own_pub="+is_own_pub+"&callback=?",
		function(data) {
			jQuery("#ownpub-load").hide();
			if (data && data.status && data.status=="ok") {
				var e = jQuery("#ownpub-status");
				e.text("This is "+ ((is_own_pub == "true") ? "" : "not ")+"one of your publications");
				clexpand_collapse("ownpub");
			}
		}
	);
}


/**
 * BibTeX/RIS
 */
function getBibtex(username,group_id,article_id) {
	var link = jQuery("#bibtex_link");
	if (link.data("loaded")) {
		clexpand('combo');
		return;
	}

	link.data("loaded",true);

	jQuery("#combo-body").load("/combo_rec.adp?username="+username+"&group_id="+group_id+"&article_id="+article_id,
		function (responseText, textStatus, XMLHttpRequest) {
			var title = "Click to select the Record - press ctrl-C to copy to clipboard";
			jQuery("#bibtex span:first").click(
				function () {
					selectText("bibtex_rec");
				}
			).attr("title", title)
				.tipsy({gravity:"s"});

			jQuery("#ris span:first").click(
				function () {
					selectText("ris_rec");
				}
			).attr("title", title)
				.tipsy({gravity:"s"});
			clexpand('combo');
		}
	);
}

function selectText(element) {
	var text;
	if (typeof element == 'string') {
		text = document.getElementById(element);
	} else {
		text = element;
	}
	if (jQuery.browser.msie) {
		var range = document.body.createTextRange();
		range.moveToElementText(text);
		range.select();
	} else if (jQuery.browser.mozilla || jQuery.browser.opera) {
		var selection = window.getSelection();
		var range = document.createRange();
		range.selectNodeContents(text);
		selection.removeAllRanges();
		selection.addRange(range);
	} else if (jQuery.browser.safari) {
		//alert(jQuery(text).html())
		var selection = window.getSelection();
		selection.setBaseAndExtent(text, 0, text, 1);
	}
}


/**
 * Restore expandable sections to last view (via cookies)
 */
function init_clexpand() {
	clexpand_to_cookie("vnotes");
	clexpand_to_cookie("posters");
	clexpand_to_cookie("tags");
}

function toggleInlineLayer(whichLayer) {
	jQuery("#"+whichLayer).toggle();
}

/**
 * History (article-posts)
 */

var history_is_loaded = false;
var history_open = false;

function toggle_history() {
	if (!history_is_loaded) {
		history_is_loaded = true;
		jQuery("#history").html("<img src='"+GLOBAL.staticRoot+"/img/ajax-loader-white.gif' />");
		jQuery("#history").load("/article-posts/" + ARTICLE.article_id +" #post_history",
			function(t) {
				var s = jQuery("#history").text();
				s=s.replace(/\s+/g,"");
				if (s.length == 0) {
					jQuery("#history").html("<p><b>This article hasn't been bookmarked yet.</b></p>");
				}
			});
	}
	history_open = !history_open;
	var state = (history_open) ? "open" : "collapsed";
	jQuery('#history-arrow').attr("src", GLOBAL.staticRoot+"/img/arrow-"+state+".gif");
	jQuery("#history").toggle(history_open);
}

/**
 * DeepDyve
 */
var DEEPDYVE = {
	load: function (doi) {
		if (!doi) {
			doi = ARTICLE.doi;
		}
		if (doi != "") {
			var doi = doi.replace(/^http:\/\/[^\/]+\//, "");
			var url = "http://www.deepdyve.com/rental-link?docId="+encodeURIComponent(doi)+
				"&fieldName=journal_doi&format=jsonp&key=citeulike&callback=?";
			jQuery.getJSON(url,
				function(data) {
					if (data && data.status && data.status == 'ok') {
						jQuery("#deepdyve").show();
						var e = jQuery("#dd_href");
						//e.attr("href","/click?cat=DEEPDYVE&url="+encodeURIComponent(data.url));
						e.attr("href",data.url);
						if (data.free=="yes") {
							e.attr("title","View this article for free at DeepDyve");
							e.html("<b>View at DeepDyve</b>");
						}
					}
				}
			);
		}
	}
};

/*******************************************************************************
 * SpringerImages
 */

var SPRINGER = {
	imagePreview : function () {
		var width = 300;
		xOffset = -Math.floor(width/3);
		yOffset = -30;

		jQuery("a.preview").hover(
			function(e){
				this.t = this.title;
				this.title = "";
				var width = "300px";
				var xpos = (e.pageX + xOffset);
				var c = (this.t != "") ? "<br/>" + this.t : "";
				var s = "<p id='preview'><span class='img'><img src='"+ this.rel +"' alt='Image preview' /></span>"+ c +"</p>";
				jQuery("body").append(s);
				// alert(s + " " + jQuery("#preview").length);
				jQuery("#preview img")
					.css("width", width+"px")
					.css("height", "120px");

				jQuery("#preview")
					.css("top", (e.pageY - yOffset) + "px")
					.css("left", xpos + "px")
					.css("z-index","1000")
					.css("width", width)
					.fadeIn("fast");
			},
			function(){
				this.title = this.t;
				jQuery("#preview").remove();
			}
		);
		jQuery("a.preview").mousemove(function(e){
			var xpos = (e.pageX + xOffset);
			jQuery("#preview")
				.css("top", (e.pageY - yOffset) + "px")
				.css("left", xpos + "px");
		});
	},
	load: function () {
		if (ARTICLE.is_springerimages != "1" || ARTICLE.doi == "") {
			return;
		}

		var url = "http://www.springerimages.com/getimages.json?doi="+ARTICLE.doi+"&callback=?";
		jQuery.getJSON(url,
			function(data) {
				var target = jQuery("#springerimages");
				if (data.length) {
					target.show();
					target.html("");
					jQuery("#springerimages_header").show();
				}
				for (i=0; i<data.length; i++) {
					var clone = jQuery("#springerimages_dummy > div").clone(true);
					if (!clone.length) {
						// alert("Oops - no clone");
						break;
					}
					//clone.find("a").attr("href",data[i].uri);
					clone.find("a").attr("href",data[i].uri);
					clone.find(".thumb-img").attr("src",data[i].thumb);
					clone.find("a.preview").attr("title",data[i].caption);
					clone.find("a.preview").attr("rel",data[i].thumb);
					clone.find(".thumbbot a").text(data[i].caption);
					//clone.find("img").attr("title", data[i].caption);

					target.append(clone);
				}
				SPRINGER.imagePreview();
			}
		);
	}
}

/**
 * Disable "file:" links - not launchable anyway
 */
function fixFileLinkouts() {
	jQuery(".linkout").each(
		function() {
			var e = jQuery(this);
			var href = e.attr("href");
			if (/^file:/.exec(href)) {
				e.after("<span>"+href+"</span>").css("color","red");
				e.remove();
			}
			e.click(function() {
				track_click(this);
				return false;
			});
		}
	);
}

function track_click(x) {
	var e = jQuery(x);
	var href = e.attr("href");
	var data = e.metadata();
	if (data && data.track_type) {
		googleTracker('/linkout/'+data.track_type);
	}

	// no need at the moment as we've got urchin tracking this
	if (false) {
		href = "/click?url="+encodeURIComponent(href);
		if (data) {
			if (data.type) {
				href = href + "&type="+encodeURIComponent(data.type);
			}
			if (data.track_type) {
				href = href + "&track_type="+encodeURIComponent(data.track_type);
			}
		}
	}
	document.location.href = href;

}

/*******************************************************************************
 * find similar: extract "terms" using Yahoo API and pump those back into our search.
 */

//
// Convert search string so it's safe for lucene, i.e., convert all special
// chars to space
//
function _luceneSafe(s) {
	if (s) {
		return s.replace(/[\+\-\&\|\!\(\)\{\}\[\]\^\"\~\*\?\:\\]/ig, " ");
	} else {
		return "";
	}

}

function genSimilarSearch() {
	var data = jQuery("#yahooform").serialize();
	jQuery.getJSON("http://search.yahooapis.com/ContentAnalysisService/V1/termExtraction?"+data+"&callback=?",
		function(res) {
			doSimilarSearch(res)
		}
	);
}

//
// Find similar articles.
// res is the object returned by Yahoo, containg all the "terms"
// extracted from the title + abstract
// (Not quite sure why the article title is passed in explicitly again)
//
function doSimilarSearch(res) {
	if (res && res.ResultSet && res.ResultSet.Result) {
		var m = res.ResultSet.Result;
		var s = "";
		for (i=0; i<m.length; i++) {
			s = s + "\""+_luceneSafe(m[i])+"\" ";
		}
		var title = jQuery("#article_title").text()
		var text = _luceneSafe(title)+" "+s;
		jQuery("#search_text").text(text);
		jQuery("#find-similar-form").submit();
	}
}


/*******************************************************************************
 * TAGS
 */


// Tag suggestion using Yahoo API, based on title + abstract
function suggestTags() {
	var data = jQuery("#yahooform").serialize();
	jQuery.getJSON("http://search.yahooapis.com/ContentAnalysisService/V1/termExtraction?"+data+"&callback=?",
		function(res) {
			showTags(res)
		}
	);
}


function showTags(res) {
	var tags = [];
	if (res && res.ResultSet && res.ResultSet.Result) {
		var m = res.ResultSet.Result;
		for (i=0; i<m.length; i++) {
			var t = m[i].toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_-]/g, "");
			tags.push({tag:t, count:0, suggested: 1});
		}
	}
	jQuery("#suggestTagsButton").remove();
	setupTags(tags);
}


function setupArticleTags() {
	var e = jQuery("#articleTagList");
	if (ARTICLE_TAGS) {
		for (var i=0; i<ARTICLE_TAGS.length; i++) {
			var t =ARTICLE_TAGS[i];
			var s=jQuery("<a>"+t+"</a>");

			s.attr("href",ARTICLE.url_stem+"/tag/"+t).addClass(t.charAt(0)=='*'?"ptag":"tag");
			//  hide CiTO tags
			if (t.match(/^cito--/)) {
				s.addClass("citotag");
			}

			e.append(s).append(" ");
		}
	}
}



function setupTags(extraTags) {
		var theTags = GLOBAL.tags;

		if (!theTags) {
			return;
		}

		var hideTags = false
		if (theTags.length > 1000) {
			hideTags = true;
			jQuery("#toomanytags").show();
		}

		if (extraTags) {
			for (var i=0; i<extraTags.length; i++) {
				theTags.push(extraTags[i]);
			}
		}

		theTags.sort(function(a,b) {
			var x = a.tag, y=b.tag;
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});

		var tagsList = jQuery("#tagList");

		tagsList.empty();

		var suggestedTags = null;
		if (hideTags && extraTags) {
			suggestedTags = extraTags;
		} else {
			suggestedTags = theTags;
		}

		jQuery("#tags_id").unbind().tagInput({
			tags:theTags,
			sortBy:"frequency",
			suggestedTags:suggestedTags,
			tagSeparator:" ",
			autoFilter:true,
			autoStart:false,
			suggestedTagsPlaceHolder:tagsList,
			boldify:true,
			freqKey:"count"

		});
		if (!hideTags) {
			jQuery(".tagInputSuggestedTags").css("width","80%");
		}
}

function addtag() {
	var text= jQuery(this).text();
	var old = jQuery("#tags_id").val();
	jQuery("#tags_id").val(old+" "+text);
}

/*******************************************************************************
 * PDFs
 */

function deletepdf(username,article_id,userfile_id) {
	if (confirm("Sure you want to delete your copy of the PDF?")) {
		document.location.href = "/personal_pdf_delete?username=" + username +
			"&article_id=" + article_id +
			"&userfile_id=" + userfile_id;
	}
}


function delete_review(review_id) {
	if (confirm("Sure you want to delete this review?")) {
		document.getElementById("hidden_review_id").value=""+review_id;
		document.getElementById("delete_review").submit();
	}
}


function deletenote(note_id) {
	if (confirm("Sure you want to delete this note?")) {
		document.location.href="/deletenote?note_id="+note_id+"&from="+ARTICLE.url_stem+"/article/"+ARTICLE.article_id;
	}
}


function deletearticle(user_article_id) {
	if (confirm("Sure you want to delete this article and all the notes associated with it from this library?")) {
		document.location.href="/delete?user_article_id="+user_article_id+"&from="+encodeURIComponent(ARTICLE.url_stem);
	}
	return false;
}


function jsmath_popup() {
	var win = window.open('','jsmath_popup','width=600, height=400, toolbar=no, location=no');
	var form = document.getElementById("showtexform");
	win.focus();
	form.submit();
}


function blog_this() {
	jQuery("#blog_form").submit();
	return true;
}

// Check for any "for:xxx" tags and flag that they cannotbe used in groups.
function check_for_tags() {
	if (ARTICLE.group_id == "") {
		return true;
	}
	var tags = jQuery("#tags_id").val();
	if (/for:/i.exec(tags)) {
		jQuery("#no_for_tags").show();
		return false;
	}
	return true;
}

function toggleLikes() {
	jQuery('#likes-div').toggle();
}
/*<SHARING>********************************************************************/

var shareInit = false;
function toggleShare() {
	jQuery('#share').toggle();
	if (shareInit) {
		return;
	}
	initTwitter();
}

function send_msg() {
	var data = jQuery("#conns_frm").serialize();
	jQuery.getJSON("/conn::send_article_notification?"+data,
		function(json){
			jQuery('#status').text("Messages sent");
			jQuery('#share').slideUp(3000,
				function() {
					jQuery('#status').text("");
					jQuery('#article_connections input:checked').attr('disabled', true);
				}
			);
		}
	);
}

/* Twitter */
var twitterInited = false;
function initTwitter() {
	if (twitterInited) {
		return;
	}
	twitterInited = true;

	var s=document.createElement("script");
	s.src=document.location.protocol + '//platform.twitter.com/widgets.js';
	document.body.appendChild(s);
	// wait for widget.js to load
	(function a(){
		if(typeof twttr=='undefined'){
			window.setTimeout(a,200);
		} else {
			jQuery("#tweetulike").show();
		}
	})();
}

/*<END SHARING>*****************************************************************/


function article_like(img) {
	var src=img.src;
	var state = false;
	if (src.match(/unlike.png/)) {
		state = false;
		img.src = GLOBAL.imgRoot+"/like.png";
		img.title="Recommend this article";
	} else {
		state = true;
		img.src = GLOBAL.imgRoot+"/unlike.png";
		img.title="Remove your recommendation";
	}

	var params = {
		state : state,
		owner_user_id : ARTICLE.user_id,
		article_id : ARTICLE.article_id
	};

	jQuery.getJSON(	"/article_like", params);

}

