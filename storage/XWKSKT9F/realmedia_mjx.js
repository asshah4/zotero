// Configuration
var OAS_url ='http://oas.oxfordjournals.org/RealMedia/ads/';
// All possible positions - will be filtered based on placeholders on page
var OAS_listpos = 'Top,Bottom,Right1';
var OAS_query = '?';
var OAS_sitepage = location.hostname + location.pathname;
// End of configuration
var OAS_version = 10;
//var OAS_rn = '001234567890';
//var OAS_rns = '1234567890';
var OAS_rn = new String(Math.random());
var OAS_rns = OAS_rn.substring(2, 11);
var OAS_query = '?';

// OAS library for RealMedia banner delivery
var OAS_LIB = {
	// Initialisation script
	preload: function(e) {
		var HeadNode = document.getElementsByTagName('head')[0];
		var ScriptNodeP = document.createElement('script');
		var StateChanged = function(e) {
			if (ScriptNodeP.readyState === 'complete' || ScriptNodeP.readyState === 'loaded') {
				OAS_LIB.init(e);
			}
		};
		ScriptNodeP.setAttribute('src', 'http://www.oxfordjournals.org/resource/js/caturls.js');
			ScriptNodeP.setAttribute('type', 'text/javascript');
			// Wait until OAS_RICH() has loaded from RealMedia
			if (window.addEventListener) {
				ScriptNodeP.addEventListener('readystatechange', StateChanged, false);
                                ScriptNodeP.addEventListener('load', OAS_LIB.init, false);
			} else if (window.attachEvent) {
				ScriptNodeP.attachEvent('onreadystatechange', StateChanged);
                                ScriptNodeP.attachEvent('onload', OAS_LIB.init);
			}
			HeadNode.appendChild(ScriptNodeP);
	},
	// This method sets the OAS variables for the page and inserts the external RealMedia script into the DOM
	init: function(e) {
		var HeadNode = document.getElementsByTagName('head')[0];
		var ScriptNode = document.createElement('script');
		var SearchTerm = OAS_LIB.getSearchTerm(location.href) || OAS_LIB.getSearchTerm(document.referrer);
		var StateChanged = function(e) {
			if (ScriptNode.readyState === 'complete' || ScriptNode.readyState === 'loaded') {
				OAS_LIB.replacePlaceholders();
			}
		};
		
		OAS_version = 11;
		if (navigator.userAgent.indexOf('Mozilla/3') != -1) {
			OAS_version = 10;
		}
		
		OAS_listpos = OAS_LIB.getAdPositions().join(',');
		
		if (OAS_LIB.isHomePage()) {
			// H2.0
			if (document.getElementById('h20_page')) {
				OAS_sitepage = location.hostname + '/site/index.xhtml';
			// H1.0
			} else {
				OAS_sitepage = location.hostname + '/index.dtl';
			}
		}
		// categorize URL
		if(categorize){
			OAS_sitepage=categorize(OAS_sitepage);
		}
		
		// Search term targetting
		if (SearchTerm) {
			OAS_query = '?' + SearchTerm.replace(' ', '&');
		}
		
		// Insert RealMedia script into DOM and insert banners
		if (OAS_version >= 11) {
			ScriptNode.setAttribute('src', OAS_url + 'adstream_mjx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + OAS_query);
			//ScriptNode.setAttribute('src', 'flash.js');
			ScriptNode.setAttribute('type', 'text/javascript');
			// Wait until OAS_RICH() has loaded from RealMedia
			if (window.addEventListener) {
				ScriptNode.addEventListener('readystatechange', StateChanged, false);
				ScriptNode.addEventListener('load', OAS_LIB.replacePlaceholders, false);
			} else if (window.attachEvent) {
				ScriptNode.attachEvent('onreadystatechange', StateChanged);
				ScriptNode.attachEvent('onload', OAS_LIB.replacePlaceholders);
			}
			HeadNode.appendChild(ScriptNode);
		} else {
			if (window.addEventListener) {
				window.addEventListener('load', OAS_LIB.replacePlaceholders, false);
			} else if (window.attachEvent) {
				window.attachEvent('onload', OAS_LIB.replacePlaceholders);
			}
		}
	},
	
	// OAS_NORMAL() replacement
	// This method inserts a normal advert for the given position inside the placeholder node
	insertNormal: function(PlaceholderNode, Position) {
		var AnchorNode = document.createElement('a');
		var ImageNode = document.createElement('img');
		
		AnchorNode.setAttribute('href', OAS_url + 'click_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + Position + OAS_query);
		
		ImageNode.setAttribute('src', OAS_url + 'adstream_nx.ads?' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + Position + OAS_query);
		ImageNode.style.borderWidth = 0;
		
		AnchorNode.appendChild(ImageNode);
		PlaceholderNode.appendChild(AnchorNode);
	},
	
	// OAS_RICH() replacement
	// This method inserts a rich media advert for the given position inside the placeholder node
	insertRich: function(PlaceholderNode, Position) {
		var CapturedText = '';
		var OrigFunction = document.write;
		var CaptureFunction = function(Text) {
			CapturedText += Text;
		};
		var CapturedTextContainer = document.createElement('div');
		// Execute any embedded code or externally linked scripts
		var ExecuteScripts = function(CapturedText) {
			var ExternalScripts = /<script[^>]+?(?:id=["']([^"']+))?[^>]+?src=["']([^"']+)/gi;
			var HeadNode = document.getElementsByTagName('head')[0];
			var ScriptNode;
			var DivNode = document.createElement('div');
			var EmbeddedScripts = /<script[^>]*>\s*(?:<!--)?\s*([\s\S]*?)\s*(?:\/\/\s*-->)?\s*<\/script>/gi;
			var Match;
			
			// Insert externally linked scripts
			while (Match = ExternalScripts.exec(CapturedText)) {
				ScriptNode = document.createElement('script');
				ScriptNode.setAttribute('src', Match[2]);
				if (Match[1]) {
					ScriptNode.setAttribute('id', Match[1]);
				}
				ScriptNode.setAttribute('type', 'text/javascript');
				HeadNode.appendChild(ScriptNode);
			}
			
			// RealMedia looks for an element called 'FinContent[Position]1' for SWF ads
			// Firefox creates this correctly through the eval below, but IE needs a push
			DivNode.setAttribute('id', 'FinContent' + Position + '1');
			PlaceholderNode.appendChild(DivNode);
			
			// Execute embedded scripts
			while (Match = EmbeddedScripts.exec(CapturedText)) {
				eval(Match[1]);
			}
		}
		
		document.write = CaptureFunction;
		
		if (OAS_RICH) {
			OAS_RICH(Position);
		}
		
		ExecuteScripts(CapturedText);
		PlaceholderNode.innerHTML = CapturedText;
		
		document.write = OrigFunction;
	},
	
	// OAS_AD() replacement
	// This method inserts a banner advert for the given position inside the placeholder node
	insertAd: function(PlaceholderNode, Position) {
		if (OAS_version >= 11 && OAS_RICH) {
			OAS_LIB.insertRich(PlaceholderNode, Position);
		} else {
			OAS_LIB.insertNormal(PlaceholderNode, Position);
		}
	},
	
	// Home page check
	// This method returns true if the visitor is currently viewing a home page, otherwise false
	isHomePage: function() {
		var BodyElement = document.getElementsByTagName('body')[0];
		
		return (BodyElement.className.indexOf('homepage') >= 0);
	},
	
	// Placeholder nodes
	// This method returns the placeholder nodes as an object keyed by position name
	// Placeholder nodes should have IDs of "oas_[position]" and be initially displayed as empty containers with dimensions set through CSS to prevent page jumping
	getPlaceholderNodes: function() {
		var IdPrefix = 'oas_';
		var Positions = OAS_listpos.split(',');
		var TotalPositions = Positions.length;
		var PlaceholderNode;
		var PlaceholderNodes = {};
		var i = 0;
		
		for (i = 0; i < TotalPositions; i++) {
			PlaceholderNode = document.getElementById(IdPrefix + Positions[i].toLowerCase());
			
			if (PlaceholderNode) {
				PlaceholderNodes[Positions[i]] = PlaceholderNode;
			}
		}
		
		return PlaceholderNodes;
	},
	
	// Ad positions
	// This method returns an array of ad positions based on the placeholders present on the page
	getAdPositions: function() {
		var PlaceholderNodes = OAS_LIB.getPlaceholderNodes();
		var Position;
		var AdPositions = [];
		
		for (Position in PlaceholderNodes) {
			if (!PlaceholderNodes.hasOwnProperty(Position)) {
				continue;
			}
			
			AdPositions.push(Position);
		}
		
		return AdPositions;
	},
	
	// Placeholder replacement
	// This method replaces any empty placeholder nodes with banner adverts
	replacePlaceholders: function() {
		var PlaceholderNodes = OAS_LIB.getPlaceholderNodes();
		var Position;
		
		for (Position in PlaceholderNodes) {
			if (!PlaceholderNodes.hasOwnProperty(Position)) {
				continue;
			}
			
			OAS_LIB.insertAd(PlaceholderNodes[Position], Position);
		}
	},
	
	// Search terms
	// This method returns the search terms used within URL specified
	// Currently supports the Journals HighWire and Google search pages
	getSearchTerm: function(Url) {
		// Example: http://services.oxfordjournals.org/cgi/searchresults?fulltext=test
		var HwSearch = /^http:\/\/services\.oxfordjournals\.org\/cgi\/searchresults.*?[?&](?:fulltext|title|titleabstract|author\d)=([^&#]+)/;
		// Example: http://www.google.co.uk/search?q=test
		var GoogleSearch = /^http:\/\/(?:[^.]+\.)?google[^\/]+\/search.*?[?&]q=([^&#]+)/;
		var Matches = Url.match(HwSearch) || Url.match(GoogleSearch);
		
		if (Matches) {
			return unescape(Matches[1]);
		}
		return '';
	}
};

// Load RealMedia script
if (window.addEventListener) {
	window.addEventListener('load', OAS_LIB.preload, false);
} else if (window.attachEvent) {
	window.attachEvent('onload', OAS_LIB.preload);
}
