// event handler for features not available during beta period
function doNotInBeta(message) { //TODO: rename
	alert(message);
	return false;
}

/**
 * Namespace for DG specific functionality to prevent conflicting
 */
var DG = {
	/**
	 * This references the current doc uri for any page
	 */
	currentDocUri: (function() { // self executing function
		// we are not manipulating the dom here, and this element should be available prior to the script, so we shouldn't have to run this after dom:loaded
		var c = $("currentDocUri");
		if(c) {
			return c.readAttribute("content");
		}
		return null;
	})(),
		
	/**
	 * Handles all the Modules functionality
	 */
	Modules: {
		openClass: 'moduleOpen',
		shutClass: 'moduleShut',
		
		/**
		 * Return true when it was toggled to open, and false if shut
		 * 
		 * @param win (automatically) passed reference to window object for local scoping
		 * @param module an element to toggle its associated module
		 */
		toggle: function(win, module) {
			var Modules = win.DG.Modules; // local scope
			
			module = Modules.module(module); // make sure we have the module, not some child element 
			if(module.hasClassName(Modules.openClass)) {
				Modules.shut(module);
				return false;
			} else {
				Modules.open(module);
				return true;
			}
		}.curry(window),
		
		/**
		 * Shuts a module's sibling modules (and their children)
		 * 
		 * @param win (automatically) passed reference to window object for local scoping
		 * @param module an element to shut its associated sibling modules
		 */
		shutSiblings: function(win, module) {
			var Modules = win.DG.Modules; // local scope
			
			module = Modules.module(module); // make sure we have the module, not some child element
			var shutMe = module.up().select(".moduleOpen").each(function(Modules, module, elm) {
				//console.log("sibling shut: ", module,  elm);
				if (module != elm) {
					Modules.shut(elm);
				}
			}.curry(Modules, module));
			
		}.curry(window),
		
		/**
		 * Shuts a module
		 * 
		 * @param win (automatically) passed reference to window object for local scoping
		 * @param module an element to shut its associated module
		 * @return true if it was closed successfully
		 */
		shut: function(win, module) {
			if(!module) return;
			var Modules = win.DG.Modules; // local scope
			//console.log("shutting: ",  module);
			
			module = Modules.module(module); // make sure we have the module, not some child element
			if(module.hasClassName(Modules.openClass)) { // only want to fire the event when it actually changes
				module.removeClassName(Modules.openClass).addClassName(Modules.shutClass);
				module.fire("module:shut", {module:module}); // fire an event so actions can be taken
				return true;
			}
		}.curry(window),
		
		/**
		 * Opens a module
		 * 
		 * @param win (automatically) passed reference to window object for local scoping
		 * @param module an element to open its associated module
		 * @return true if it was opened successfully
		 */
		open: function(win, module) {
			if(!module) return;
			var Modules = win.DG.Modules; // local scope
			//console.log("opening: ", module);
			
			module = Modules.module(module); // make sure we have the module, not some child element

			var opened = Modules.open(module.up(".module")); // open all ancestor modules (they will be recursively called)
			if(opened || module.hasClassName(Modules.shutClass)) { 
				// only want to fire the event when it actually changes (either a parent, or this node was opened)
				module.removeClassName(Modules.shutClass).addClassName(Modules.openClass);
				module.fire("module:open", {module:module}); // fire an event so actions can be taken
				return true;
			}
		}.curry(window),
		
		/**
		 * Returns the module for an element (either itself, or an ancestor, or null if it is not within a module)
		 * 
		 * @param the element to get the associated module for
		 */
		module: function(elm) {
			if(elm && !elm.hasClassName("module")) {
				//console.log("Finding Module: ", elm, elm.up(".module"));
				return elm.up(".module"); // make sure we are working with the module
			}
			return elm;
		},
		
		/**
		 * Adds the mousedown listener to the elements specified to handle opening and closing base on toggles
		 * 
		 * @param win (automatically) passed reference to window object for local scoping
		 * @param elms a(n) element to add a mousedown listener to that will toggle the module 
		 */
		addListener: function(win, elms) {
			if(!Object.isArray(elms)) {
				elms = new Array(elms); // turn into an array if it is not already
			}
			
			elms.invoke('observe', 'click', function(DG, evt) {
				var el = $(evt.target);
				if(el.hasClassName('stopToggle')) { return true; }
				var isOpen = DG.Modules.toggle(el),
					dataTextOpen = 'data-textopen',
					dataTextShut = 'data-textshut'
				if(isOpen && el.hasAttribute(dataTextOpen)) {
					el.innerHTML = el.readAttribute(dataTextOpen);
				} else if (!isOpen && el.hasAttribute(dataTextShut)) {
					el.innerHTML = el.readAttribute(dataTextShut);
				}
				
                // prevent selecting of the toggle... (which clicking more than once was causing)
				el.addClassName("unselectable");
				
				// invoke external complete callback when module has opened/closed
				(evt.onModuleComplete || Prototype.emptyFunction)();
			}.curry(win.DG));
			
		}.curry(window),
		
		/**
		 * Initializes the Module behavior on pages
		 * 
		 * @param win (automatically) passed reference to window object for local scoping
		 */
		init: function(win) {
			// add listener that will invoke behavior for modules to open or close
			win.DG.Modules.addListener($$('.module .toggle'));
		}.curry(window)
	},
	
	/**
	 * Initialization methods for DG
	 */
	Init: {
		/**
		 * Initializes DG features
		 * 
		 * @param win (automatically) passed reference to window object for local scoping
		 */
		all: function(win) {
			var i = win.DG.Init; // local scope
			i.modules();
		    i.localizeQuickSearchField('q', 'q_value');
		    i.hashEvents();
		    $(win.document).fire("dg:loaded"); // fire this event so other features can know it is safe to load (see dgtoc.js for an example)
		}.curry(window),
		
		/**
		 * Initializes modules
		 */ 
		modules: function(win) {
			win.DG.Modules.init();
		}.curry(window),
		
		/**
		 * Setup quick search localization
		 */ 
		localizeQuickSearchField: function(fieldId, fieladValue) {
			var field = $(fieldId), // the quick search field
				value = field.value = $(fieladValue).innerHTML, // the quick search display value
				// a method to update the field text based on the value's input
				writeTextAndValue = function(e, testText, writeText) {
					if (e.value == testText) {
						e.value = writeText;
						e.writeAttribute('value', writeText);
					}
				}.curry(field),
				// a method that will reset the field text to be "clear" (aka empty)
				clearText = writeTextAndValue.curry(value, '');
			// stop observe events from app.js
		    Event.stopObserving(field, 'focus');
		    Event.stopObserving(field, 'blur');
		
		    field.observe('focus', clearText);
		    field.observe('blur', writeTextAndValue.curry('', value));
		
		    if (field.form) {
		        $(field.form).observe('submit', clearText);
		    }
		},

		/**
		 * Setups the handling of a new event type "hash:changed" that is cross-browser compatible
		 */ 
		hashEvents: function(win) {
			var doc = $(win.document), // local scope
				location = win.location, // local scope
				hashChanged = "hash:changed";
			
			// start monitoring for hash changes
			win.hashChangeTimer = null;
			if ("onhashchange" in win) { // if the onhashchange event exists, tweak it to 
				win.onhashchange = win.hashChangeTimer = function(doc, location) {
			        doc.fire(hashChanged, {hash: "" + location.hash});
			    }.curry(doc, location)
			} else { // event not supported:
				var storedHash = location.hash;
			    win.hashChangeTimer = win.setInterval(function (win, doc) {
					var hash = win.location.hash;
			        if (hash != storedHash) {
			            storedHash = hash;
			            doc.fire("hash:changed", {hash: "" + storedHash});
			        }
			    }.curry(win, doc), 100); // poll every 100 ms
			}
			
			var expandModule = function(win, DG) {
				var module,
					elm,
					shutModuleClass = '.moduleShut',
					hash = win.location.hash;
				
				// is there a hash? is the not hash empty?
				if(hash && !hash.empty()) {
					if(hash.startsWith("#")) {
						hash = hash.substring(1); // clean up to make consistent across all browsers
					}
					elm = $(hash); // find the element by id
					if(!elm) {
						// not found by id? find it by old-school <a name="">
						elm = $$("*[name=" + hash + "]").first();
						if(!elm) {
							return; // no matching elements could be found exit the function
						}
					}
					
					DG.Modules.open(elm); // opens all module up to the current element... 
					elm.scrollTo(); // scroll to the target element
				}
			}.curry(win, DG); // pass win and DG for local scope access
			
			doc.observe(hashChanged, expandModule); // observe hash future hash changes
			expandModule(); // execute it on DOM load as well, so if modules where closed, they will open
		}.curry(window)
	}
};

// setup the initialization
document.observe("dom:loaded", DG.Init.all);



// Cookie functions for use in db entries (and elsewhere)
// http://www.quirksmode.org/js/cookies.html
function createCookie(name,value,days) {
	if(days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}