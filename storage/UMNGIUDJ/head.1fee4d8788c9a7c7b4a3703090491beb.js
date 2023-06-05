jQuery.noConflict();


function show_search_help() {
	window.open("/search_help","search_help",config="height=650,width=550,toolbar=no,menubar=no,scrollbars=yes,resizable=yes");
}

function search_modal() {
	try {
		jQuery("#dialog").dialog('open');
		jQuery("#q").focus().select();
	} catch (err) {
		location.href="/search_all.adp";
	}
}

function submit_search() {
	var q = jQuery("#search_form").serialize();
	setUIOption("lastsearch", jQuery("#q").val());
	location.href="/search/all?"+q;
	return false;
}

function menu_on (item) {
	jQuery(item).css({ "background-image": "url('"+GLOBAL.imgRoot+"/menu/body-hi.png')"})
}

function menu_off (item) {
	jQuery(item).css({ "background-image": "url('"+GLOBAL.imgRoot+"/menu/body.png')"})
}

// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser)
function getInternetExplorerVersion() {
	var rv = -1; // Return value assumes failure
	if (navigator.appName == 'Microsoft Internet Explorer') {
		var ua = navigator.userAgent;
		var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null) {
			rv = parseFloat( RegExp.$1 );
		}
	}
	return rv;
}

function IE6() {
	var ie = getInternetExplorerVersion();
	return (ie > 0 && ie <=6);
}

function IE() {
	var ie = getInternetExplorerVersion();
	return (ie > 0);
}


function modifyQS(key,val) {
	var params = getQueryStringParams();
	delete(params[key]);
	var s = "";
	for (var k in params) {
		if (k) {
			s+=k+"="+params[k]+"&";
		}
	}
	s += key+"="+val;
	return s;

}

function appendQS(s) {
	var h = location.href;
	if (h.indexOf("?") == -1) {
		return h + "?" + s;
	} else {
		return h + "&" + s;
	}
}


String.prototype.trim = function(){
	return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""))
}

String.prototype.startsWith = function(str) {
	return (this.match("^"+str)==str)
}

String.prototype.endsWith = function(str) {
	return (this.match(str+"$")==str)
}

function trim (s) {
    var a = s.replace(/^\s+/, '');
    return a.replace(/\s+$/, '');
}


function getSelText() {
	var txt = '';
	if (window.getSelection) {
		txt = window.getSelection();
	} else if (document.getSelection)  { // FireFox
		txt = document.getSelection();
	} else if (document.selection) { // IE 6/7
		txt = document.selection.createRange().text;
	}
	if (txt) {
		txt = txt.toString().toLowerCase();
		txt = txt.replace(/[^\w]+/g, " ");
		txt = txt.replace(/^\s+/, '');
		txt = txt.replace(/\s+$/, '');
		txt = txt.replace(/\s+/g,' ');
	}
	return txt; // trim(txt);
}

function goSearch() {
	var t = getSelText();
	if (!t || t == "") {
		// No "global" search page to go to :-(
		return false;
	}
	location.href = "/search/all?q="+encodeURIComponent(t);
	return true;
}


jQuery.contextMenu.defaults({
	menuStyle : {
		border: "1px solid #cccccc",
		padding: "5px",
		backgroundColor : "#e8f2ff"
	},
	itemStyle : {
		padding: "0px",
		border: "none",
		backgroundColor: "#e8f2ff",
		lineHeight: "2",
		textDecoration: 'none'
	},
	itemHoverStyle: {
		border: "none",
		backgroundColor: "#e8f2ff",
		textDecoration: 'underline'
	},
	shadow: true,
	onContextMenu: function(e) {
		return true;
	}

});

var UI_OPTIONS_COOKIE = 'ui_options';
var UI_OPTIONS_COOKIE_OPTS = { path: '/', expires: 365, domain: GLOBAL.cookieDomain};
var UI_OPTIONS = jQuery.cookie(UI_OPTIONS_COOKIE);
if (UI_OPTIONS) {
	UI_OPTIONS = jQuery.secureEvalJSON(UI_OPTIONS);
} else {
	UI_OPTIONS = { ignore : "me" };
}
var UI_OPTIONS_CHANGED = false;

function getUIOption(key, def) {
	if (def==undefined) {
		def = false;
	}
	var v = UI_OPTIONS[key];
	var ret = (v==undefined) ? def : v;
	return ret;
}

function setUIOption(key, val) {
	UI_OPTIONS[key] = val;
	var json = jQuery.toJSON(UI_OPTIONS);
	jQuery.cookie(UI_OPTIONS_COOKIE, json, UI_OPTIONS_COOKIE_OPTS );
	jQuery("#ui_val").text(json);
	UI_OPTIONS_CHANGED = true;
	saveUI(key +" => "+val);
}

function saveUI(s) {
	// The UI_OPTIONS_CHANGED flag is a legacy from when this func was
	// call via the unload event (which turned out to be unreliable)
	// Keep for now - no harm
	if (s) {
		LOG("saveui: "+s);
	} else {
		LOG("saveui");
	}
	if (UI_OPTIONS_CHANGED) {
		UI_OPTIONS_CHANGED=false;
		// On home page (only?) this get's called twice - the ajax, not this func.
		jQuery.get("/saveui");
	}
}


function setPublicants(){
	xOffset = 2;
	yOffset = 28;
	jQuery("a.publicant").after("<span class='publicant'>&dagger;</span>");
	jQuery(".publicant").hover(
		function(e){
			this.t = this.title;
			this.title = "";
			jQuery("body").append("<p id='tooltip'>This user is an author of the article.</p>");
			jQuery("#tooltip")
				.css("top",(e.pageY - yOffset) + "px")
				.css("left",(e.pageX + xOffset) + "px")
				.css("z-index","999")
				.css("position","absolute")
				.fadeIn("fast");
		},
		function(){
			this.title = this.t;
			jQuery("#tooltip").remove();
		}
	);
	jQuery(".publicant").mousemove(
		function(e){
			jQuery("#tooltip")
				.css("top",(e.pageY - yOffset) + "px")
				.css("left",(e.pageX + xOffset) + "px");
		}
	);
};

/**
 * Manage expandable sections, via cookies
 */

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	} else {
		var expires = "";
	}
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') {
			c = c.substring(1,c.length);
		}
		if (c.indexOf(nameEQ) == 0) {
			return c.substring(nameEQ.length,c.length);
		}
	}
	return null;
}

function clexpand(basename) {
	var d = document.getElementById(basename+"-body");
	if (d.style.display=="none") {
		clexpand_open(basename);
	} else {
		clexpand_collapse(basename);
	}
}

function clexpand_open(basename, save) {
	var d = document.getElementById(basename+"-body");
	if (d) {
		d.style.display = 'block';
		if (jQuery(d).hasClass("store-state")) {
			if (typeof save == "undefined" || save) {
				setUIOption("clexpand-article-"+basename, "open");
			}
		}
	}
	var i = document.getElementById(basename+"-arrow");
	if (i) {
		i.src = GLOBAL.staticRoot+"/img/arrow-open.gif";
	}
}

function clexpand_collapse(basename, save) {
	var d = document.getElementById(basename+"-body");
	if (d) {
		d.style.display = 'none';
		if (jQuery(d).hasClass("store-state")) {
			if (typeof save == "undefined" || save) {
				setUIOption("clexpand-article-"+basename, "collapsed");
			}
		}
	}
	var i = document.getElementById(basename+"-arrow");
	if (i) {
		i.src = GLOBAL.staticRoot+"/img/arrow-collapsed.gif";
	}
}


function clexpand_to_cookie(basename) {
	var d = document.getElementById(basename+"-body");
	if (d==null) {
		return;
	}
	if (!jQuery(d).hasClass("store-state")) {
		return;
	}
	//var c = readCookie("clexpand-article-"+basename);
	var c = getUIOption("clexpand-article-"+basename);
	if (!c) {
		c = "collapsed";
	}
	if (c=="open") {
		clexpand_open(basename,false);
	} else if (c=="collapsed") {
		clexpand_collapse(basename,false);
	}
}


function googleTracker(s) {
	if (typeof urchinTracker != "undefined") {
		if (s) {
			urchinTracker(s);
		} else {
			urchinTracker();
		}
	} else if (typeof _gat != "undefined") {
		var pageTracker = _gat._getTracker(GOOGLE_AC);
		if (s) {
			pageTracker._trackPageview(s);
		} else {
			pageTracker._trackPageview();
		}
	}
}


var init_tags;


// there's a different function showTags used elsewhere!
function displayTags() {
	jQuery("#tagsbox").show();
	jQuery("#tagsbox").css("display","block");
	populateTagsTable();
	jQuery(".contentonly").bind("mouseenter", function() {
		undisplayTags();
	});
}

function undisplayTags() {
	jQuery("#tagsbox").hide();
	jQuery("#tagsbox").css("display","none");
	jQuery(".contentonly").unbind("mouseenter");
}

function tag_search_key_up() {
	var f = document.right_tag_search.q.value;
	filter_tags(f);
}

//direct clone of misc_make_match_str (misc.tcl)

function fix_regexp(m) {
	LOG("fix_regexp:pre :"+m);
	var anchor_0 = false;
	var anchor_1= false;
	m = trim(m)
	if (m.charAt(0) == "^") {
		anchor_0=true
	}
	if (m.charAt(m.length-1) == "$") {
		anchor_1=true
	}
	m  = m.replace(/[^?%*:a-zA-Z0-9_-]/g, "");
	m  = m.replace(/[*]/g, "[*]");
	m  = m.replace(/[%]+/g, ".*");
	m  = m.replace(/[?]/g, ".");

	if (anchor_0) {
		m = "^"+m;
	}
	if (anchor_1) {
		m = m +"$"
	}
	LOG("fix_regexp:post:"+m);
	return m

}


function filter_tags(search) {
	if (!search || search=="") {
		search = "^";
	}

	search = fix_regexp(search);

	var re = new RegExp(search);
	jQuery("#navright .tag, #navright .ptag").each(function() {
		var e = jQuery(this);
		var t = e.text();
		var f = re.test(t);
		var tr = e.closest("tr");
		if (tr.length) {
			tr.toggle(f);
		} else {
			e.toggle(f);
		}
	});
	return;
}


function fancyPreview(which, index) {

	LOG("fancyPreview:start:"+(typeof index)+":"+index);

	if (typeof index == "undefined") {
		index = 0;
	}

	var meta = which.metadata();
	var arr = meta.userfiles;

	var tFancy = arr.length;
	var fancyTitle;
	if (tFancy==1) {
		fancyTitle = "Esc to Exit";
	} else {
		fancyTitle = "Esc to Exit. Navigate using &larr; &rarr; keys or click on frame border.";
	}

	var fb = [];
	for (var i=0; i<tFancy; i++) {
		var e = arr[i];
		var type = e.type;
		var link = e.link;

		if (type == "pdf") {
			var params = "&Scale=0.6&ZoomTransition=easeOut&ZoomTime=0.5&ZoomInterval=0.1&FitPageOnLoad=false&FitWidthOnLoad=true&PrintEnabled=true";

			var w = Math.round(jQuery(window).width()*0.8);
			var h = Math.round(jQuery(window).height()*0.8);


			LOG("DIMS: "+w+"x"+h);
			fb.push({
				'height'	: h,
				'width'		: w,
				'href'		: GLOBAL.jsRoot+'/FlexPaperViewer.swf',
				'swf'		: {flashvars: "SwfFile="+encodeURIComponent(e.swfurl)+params, allowfullscreen:true}
			});
		} else {
			fb.push({'href'          : link});
		}
	}

	jQuery.fancybox(fb,
		{
			'speedIn'	: 100,
			'speedOut'	: 100,
			'overlayShow'	: true,
			'cyclic'	: true,
			'modal'		: false,
			'padding'       : 20,
			'titlePosition' : "outside",
			'title'         : fancyTitle,
			'hideOnOverlayClick' : true,
			'index'		: index
		}
	);

}


function tagsBoxResize(save) {
	var tagsBoxWidth = jQuery("#navright").width();
	jQuery(".contentonly").css("margin-right",(tagsBoxWidth+30)+"px");
	if (save) {
		setUIOption("tagsBoxWidth",tagsBoxWidth);
	}
	adjustTagsDims();
}

function adjustTagsDims() {
	var tagsBoxWidth = jQuery("#navright").width();
	jQuery("#taglist .tag_l").css("width",(tagsBoxWidth-40)+"px");
	jQuery("#navright").css("height",null);
}


GLOBAL.showTagsState = getUIOption("showTagsState", false);

function toggleShowTagsState() {
	GLOBAL.showTagsState = !GLOBAL.showTagsState;
	jQuery("#tags-pins-on").toggle(GLOBAL.showTagsState);
	jQuery("#tags-pins-off").toggle(!GLOBAL.showTagsState);
	setUIOption("showTagsState",GLOBAL.showTagsState);
}


function ptq(q) {
/* parse the query */
/* semicolons are nonstandard but we accept them */
	var x = q.replace(/;/g, '&').split('&'), i, name, t;
	/* q changes from string version of query to object */
	for (q={}, i=0; i<x.length; i++) {
		t = x[i].split('=', 2);
		name = unescape(t[0]);
		if (!q[name]) {
			q[name] = [];
		}
		if (t.length > 1) {
			q[name][q[name].length] = unescape(t[1]);
		} else {
			q[name][q[name].length] = true;
		}
	}
	return q;
}

function qs_param() {
	return ptq(location.search.substring(1).replace(/\+/g, ' '));
}

var getQueryStringParams = qs_param;

function facebook_login(response) {
	if (!response.session) {
		return;
	}
	var p = qs_param();
	var from = "";
	if (p["from"]) {
		from = p["from"][0]
		window.location.href=from;
	} else if (window.location.pathname=="/login") {
		window.location.href = "/";
	} else {
		window.location.reload();
	}
}




jQuery(function() {
	jQuery("#ui_val").html("<pre>"+jQuery.toJSON(UI_OPTIONS)+"</pre><br /><pre>"+jQuery.cookie("context_menu_opts"));
	jQuery("#logout_button").click(saveUI);
	setPublicants();

	jQuery("body").addClass("force-scrollbars");

	try {
		jQuery("#dialog").dialog({
			bgiframe: true,
			autoOpen: false,
			modal: true,
			width: "600px",
			position: ["right", "top"],
			resizable: false,
			draggable: false,
			minHeight: 0,
			buttons: {
				'Search': submit_search,
				'  Help  ': function() {
					show_search_help();
				}
			}
		});
	} catch (err) {
		ERROR(err);
	}

	var q = jQuery("#q").val();
	if (!q) {
		q = getUIOption("lastsearch");
		if (q) {
			jQuery("#q").val(q);
		}
	}

	jQuery(".tipsy-hint").tipsy({gravity:"s"});
	jQuery(".tipsy-hint-s").tipsy({gravity:"s"});
	jQuery(".tipsy-hint-n").tipsy({gravity:"n"});
	jQuery(".tipsy-hint-e").tipsy({gravity:"e"});
	jQuery(".tipsy-hint-w").tipsy({gravity:"w"});

	jQuery(".support-email").text("support09"+"@"+"citeulike"+".org");
	jQuery(".privacy-email").text("privacy"+"@"+"citeulike"+".org");

	var hideLeftAd = (window.name == "citeulike_popup_post");
	if (hideLeftAd) {
		jQuery(".leftindent").css("margin-left", "0px");
		jQuery(".contentmain").css("margin-left", "0px");
		jQuery(".contentonly").css("margin-left", "0px");
		jQuery("#navleft, .menu").hide();
		jkmegamenu.render(jQuery);
	}

	jQuery(document).bind('keydown', 'Ctrl+s', function(){
		if (goSearch()) {
			return false;
		} else {
			// legacy for blog-save page
			jQuery('#button_update').click();
		}
		return false;
	});

	if (!GLOBAL.showTagsState && jQuery("#navright").length != 0) {
		if (jQuery("#tagsbox").length == 0){
			jQuery("#navright").wrap("<div id='tagsbox' style='display:none'></div>");
		}
		if (jQuery(".contentmain").length != 0) {
			jQuery(".contentmain").removeClass("contentmain").addClass("contentonly");
		}
	}

	if (init_tags) {
		init_tags();
	}


	if (GLOBAL.showTagsState && jQuery("#navright").length != 0) {
		var tagsBoxWidth = getUIOption("tagsBoxWidth",250);
		jQuery("#tagsbox").show();
		jQuery("#tagsbox").css("display","block");
		jQuery("#tagbutton").hide();
		jQuery("#navright").css("width",tagsBoxWidth+"px");
		populateTagsTable();
		var realWidth= jQuery("#navright").width();
		jQuery(".contentonly").css("margin-right",(realWidth+30)+"px");
		jQuery("#taglist .tag_l").css("width",(tagsBoxWidth-40)+"px");
		jQuery("#navright").resizable({
			ghost: true,
			handles: 'w',
			stop : function(event, ui) {
				tagsBoxResize(true);
			},
			maxWidth: 600,
			minWidth: 180
		});
	} else {
		jQuery("#tagbutton").mouseenter(displayTags);
		jQuery("#tagbutton").click(displayTags);
	}


	jQuery("#tags-pins").qtip({
		content: jQuery("#always_show_tags_help"),
		show: 'mouseover',
		hide: { when: 'mouseout' },
		style: {
			padding: 5,
			background: '#E8F2FF'
		},
		position: {
			corner: {
				target: 'bottomRight',
				tooltip: 'topRight'
			},
			adjust: {
				screen: true,
				y: 4
			}
		}
	});

	jQuery("#tags-pins").click(toggleShowTagsState);
	jQuery("#tags-pins-on").toggle(GLOBAL.showTagsState);
	jQuery("#tags-pins-off").toggle(!GLOBAL.showTagsState);


	jQuery("input:submit, input:button, input:file, button").button();
	jQuery("button.likes").find(".ui-button-text").css(
		{'background-image':'url('+GLOBAL.imgRoot+'/likes-icon.png)',
		'background-repeat':'no-repeat','padding-left':'32px',
		'background-position':'10px 1px '
		});
	jQuery("button.searchbtn").button("destroy").button({icons: {primary:'ui-icon-search'}});

	if (!IE()) {
		jQuery("select.uiwidget").selectmenu({maxHeight: 150, style: 'popup'});
	}

	LOG("OK - logging started");

});

