/**
 * jQuery Autocomplete plugin 1.1
 *
 * Copyright (c) 2009 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id: jquery.autocomplete.js 15 2009-08-22 10:30:27Z joern.zaefferer $
 *
 * Note: This is the ReedEslevier modified version used as part of the Sciverse Gadget Framework.
 *
 */

var channels = {};
var listeners = {};	
var suggestions = {};
var pin = 0;
var sgf = sgf || {};
var toggleData;

;(function(jQuery) {

jQuery.fn.extend({
	autocomplete: function(options){
		try {
			sgf.createSearchAssistTab(this, options);
			if (options.isSearchAssistActive == 'false')  return;
			
			options = jQuery.extend({}, jQuery.Autocompleter.defaults, options);			
			return this.each(function() {
				new jQuery.Autocompleter(this, options);
			});
		}
		catch(e){
			alert("error: " + e);
		}
	},
	unautocomplete: function() {
		return this.trigger("unautocomplete");
	}
});

jQuery.Autocompleter = function(input, options){
	var KEY = {
		UP: 38,
		DOWN: 40,
		DEL: 46,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		COMMA: 188,
		PAGEUP: 33,
		PAGEDOWN: 34,
		BACKSPACE: 8
	};
	// Create $ object for input element
	var $input = jQuery(input).attr("autocomplete", "off").addClass(options.inputClass);
		
	var config = {
		mouseDownOnSelect: false,
		publishAgain: function(){			
			publish();
		}
	};
	var select = jQuery.Autocompleter.Select(input, options, config, selectCurrent);

	var hasFocus = 0;
	var lastKeyPressCode;
	var timeout;
	var blockSubmit;
	
	// prevent form submit in opera when selecting with return key
	jQuery.browser.opera && jQuery(input.form).bind("submit.autocomplete", function() {
		if (blockSubmit) {
			blockSubmit = false;
			return false;
		}
	});
		
	// only opera doesn't trigger keydown multiple times while pressed, others don't work with keypress at all
	$input.bind((jQuery.browser.opera ? "keypress" : "keydown") + ".autocomplete", function(event) {
		// a keypress means the input has focus
		// avoids issue where input had focus before the autocomplete was applied
		hasFocus = 1;					
		lastKeyPressCode = event.keyCode;	
		switch(event.keyCode) {		
			case KEY.UP:
				event.preventDefault();
				if ( select.visible() ) {
					select.prev();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.DOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.next();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEUP:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageUp();
				} else {
					onChange(0, true);
				}
				break;
				
			case KEY.PAGEDOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageDown();
				} else {
					onChange(0, true);
				}
				break;
			
			// matches also semicolon
			case options.multiple && jQuery.trim(options.multipleSeparator) == "," && KEY.COMMA:
			case KEY.TAB:
			case KEY.RETURN:
				if( selectCurrent() ) {
					// stop default to prevent a form submit, Opera needs special handling
					event.preventDefault();
					blockSubmit = true;					
					return false;
				}
				break;
				
			case KEY.ESC:
				select.hide();
				break;
				
			default:
				clearTimeout(timeout);				
				timeout = setTimeout(publish, options.delay);
				break;
		}						
	}).focus(function(){
		// track whether the field has focus, we shouldn't process any
		// results if the field no longer has focus
		hasFocus++;
	}).blur(function(){
		hasFocus = 0;
		if (!config.mouseDownOnSelect) {
			hideSuggestions();
		}
	}).click(function() {
		// show select when clicking in a focused field
		if ( hasFocus++ > 1 && !select.visible() ) {
			onChange(0, true);
		}
	}).bind("unautocomplete", function() {
		select.unbind();
		$input.unbind((jQuery.browser.opera ? "keypress" : "keydown") + ".autocomplete");
		jQuery(input.form).unbind(".autocomplete");
	});	
	
	function publish(){
		// Condition is added to check if the Search-assist is ON/OFF
		//if(isSearchAssistEnabled == 'true'){
			var channel = 'query';
			var data = jQuery(input).val();
			if ((data.length >= options.minChars)) {
				suggestions = [];
				if (channels[channel] == null) channels[channel] = channel;
				var subscribers = listeners[channel];
				if (subscribers == null ) {					
					return;
				}
				pin += 1;			
				for (var i = 0;i < subscribers.length; i++){
					var sub = subscribers[i];					
					gadgets.rpc.call(sub.frame, sub.callback, null, data, pin);
				}
				select.display();
				// To display when there are no suggestings returned
				var lists = jQuery('#suggestions ul');
				lists.empty();
				var li= jQuery('<li />').html('No suggestions.Please continue typing your query').appendTo(lists);
				select.show();
				
				var sOffset = jQuery('#suggestions').offset();
				var sOffsetHeight = jQuery('#suggestions').attr('offsetHeight');
				//alert(sOffset.top+sOffsetHeight);
				jQuery('#satab').css({top: sOffset.top+sOffsetHeight, "z-index":300});	
			}
			else {
				hideSuggestions();
			}
		//}
	};
	
	function hideSuggestions(){
		clearTimeout(timeout);
		if (jQuery('#suggestions').length == 1) jQuery('#suggestions').hide();
		jQuery('#satab').css({top: jQuery(input).offset().top+jQuery(input).attr("offsetHeight"), "z-index":300});
	}	
	
	function selectCurrent() {
		var selected = select.selected();
		if( !selected )
			return false;
		var commaIndex = selected.indexOf(',');
		var gid = selected.substring(0, commaIndex);
		var val = selected.substring(commaIndex+1);
		jQuery(input).focus().val(val);	
		config.publishAgain();
		return true;
	}	
	function onChange(crap, skipPrevCheck) {
		if( lastKeyPressCode == KEY.DEL ) {
			select.hide();
			return;
		}
		
		var currentValue = $input.val();
		
		if ( !skipPrevCheck && currentValue == previousValue )
			return;
		
		previousValue = currentValue;
		
		currentValue = lastWord(currentValue);
		if ( currentValue.length >= options.minChars) {
			$input.addClass(options.loadingClass);
			if (!options.matchCase)
				currentValue = currentValue.toLowerCase();			
		} else {
			//stopLoading();
			select.hide();
		}
	};
	
	function trimWords(value) {
		if (!value)
			return [""];
		if (!options.multiple)
			return [jQuery.trim(value)];
		return jQuery.map(value.split(options.multipleSeparator), function(word) {
			return jQuery.trim(value).length ? jQuery.trim(word) : null;
		});
	}
	
	function lastWord(value) {
		if ( !options.multiple )
			return value;
		var words = trimWords(value);
		if (words.length == 1) 
			return words[0];
		var cursorAt = jQuery(input).selection().start;
		if (cursorAt == value.length) {
			words = trimWords(value)
		} else {
			words = trimWords(value.replace(value.substring(cursorAt), ""));
		}
		return words[words.length - 1];
	}	
}; //end Autocompleter

jQuery.Autocompleter.Select = function(input, options, config, select){
	var CLASSES = {
		ACTIVE: "ac_over"
	};

	var listItems,
		active = -1,
		needsInit = true,
		element,
		list;

	function init(){
		if (!needsInit) return;
		
		jQuery('#suggestions').remove();
		
		var offset = jQuery(input).offset();		
		element = jQuery("<div id='suggestions'></div>")
			.hide()
			.addClass("ac_results")
			.css({"position":"absolute",width:jQuery(input).width(), top: offset.top+jQuery(input).attr("offsetHeight"),
				left:offset.left})
			.appendTo(document.body);

		list = jQuery("<ul/>").appendTo(element).mouseover( function(event) {
				if(target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
		            active = jQuery("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
				    jQuery(target(event)).addClass(CLASSES.ACTIVE);            
		        }
			}).click(function(event) {
			//Populates the serach box with the user selected suggestion
				jQuery(target(event)).addClass(CLASSES.ACTIVE);
				select();
				listItems = list.find('li');
				var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
				var sval = selected && selected.length && jQuery.data(selected[0], "ac_data");	
				var commaIndex = sval.indexOf(',');
				var gid = sval.substring(0, commaIndex);
				var val = sval.substring(commaIndex+1);
				
				//On select of any suggestion keep the selected-value & gadget-id
				//into separate hidden form-fields in BSF
				jQuery('#selectedSuggestion').val(val);
				jQuery('#selectedGadget').val(gid);
				
				var hrefIndex = val.indexOf('href');
				if(hrefIndex > 0) {
					var lastIndex = val.lastIndexOf('\'');
					var subStr = val.substring(hrefIndex+6,lastIndex);
					window.open(subStr);
					jQuery(input).focus().val('');
				}
				else {
					jQuery(input).focus().val(val);			
				}
				if (jQuery('#suggestions').length == 1){ jQuery('#suggestions').hide();}
				config.publishAgain();
				return false;
			}).mousedown(function() {
				config.mouseDownOnSelect = true;
			}).mouseup(function() {
				config.mouseDownOnSelect = false;
			}).mouseout(function(event){
				if(event.target.nodeName.toUpperCase() == 'UL') jQuery(event.target).delay(1000).queue(function() {
					jQuery('#suggestions').hide();
					jQuery('#satab').css({top: jQuery(input).offset().top+jQuery(input).attr("offsetHeight"), "z-index":300});})
			}).mouseover(function(event){
				jQuery(this).clearQueue()
			});		
		needsInit = false;
	}
	function target(event) {
		var element = event.target;
		while(element && element.tagName != "LI")
			element = element.parentNode;
		// more fun with IE, sometimes event.target is empty, just ignore it then
		if(!element)
			return [];
		return element;
	}
	function moveSelect(step) {
		listItems = list.find("li");
		listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
		movePosition(step);
        var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
        if(options.scroll) {
            var offset = 0;
            listItems.slice(0, active).each(function() {
				offset += this.offsetHeight;
			});
            if((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
            } else if(offset < list.scrollTop()) {
                list.scrollTop(offset);
            }
        }
	};
	
	function movePosition(step) {
		listItems = list.find("li");
		active += step;
		if (active < 0) {
			active = listItems.size() - 1;
		} else if (active >= listItems.size()) {
			active = 0;
		}
	}
		
	return {
		display: function(){
			init();
		},
		next: function() {
			moveSelect(1);
		},
		prev: function() {
			moveSelect(-1);
		},
		pageUp: function() {
			if (active != 0 && active - 8 < 0) {
				moveSelect( -active );
			} else {
				moveSelect(-8);
			}
		},
		pageDown: function() {
			if (active != listItems.size() - 1 && active + 8 > listItems.size()) {
				moveSelect( listItems.size() - 1 - active );
			} else {
				moveSelect(8);
			}
		},
		hide: function() {
			element && element.hide();
			listItems && listItems.removeClass(CLASSES.ACTIVE);
			active = -1;
		},
		visible : function() {
			return element && element.is(":visible");
		},
		current: function() {
			return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
		},
		show: function() {
			var offset = jQuery(input).offset();
			element.css({
				width: typeof options.width == "string" || options.width > 0 ? options.width : jQuery(input).width(),
				top: offset.top + input.offsetHeight,
				left: offset.left
			}).show();
            if(options.scroll) {
                list.scrollTop(0);
                list.css({
					maxHeight: options.scrollHeight,
					overflow: 'auto'
				});
				
                if(jQuery.browser.msie && typeof document.body.style.maxHeight === "undefined") {
					var listHeight = 0;
					listItems.each(function() {
						listHeight += this.offsetHeight;
					});
					var scrollbarsVisible = listHeight > options.scrollHeight;
                    list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight );
					if (!scrollbarsVisible) {
						// IE doesn't recalculate width when scrollbar disappears
						listItems.width( list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")) );
					}
                }
                
            }
		},
		selected: function() {
			var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
			return selected && selected.length && jQuery.data(selected[0], "ac_data");
		},
		emptyList: function (){
			list && list.empty();
		},
		unbind: function() {
			element && element.empty();
		}				
	};
};//end Autocompleter.Select

jQuery.Autocompleter.defaults = {
	inputClass: "ac_input",
	resultsClass: "ac_results",
	loadingClass: "ac_loading",
	minChars: 2,
	delay: 400,	
	max: 100,	
	width: 0,
	scroll: true
};

})(jQuery);


sgf.createSearchAssistTab = function(input, options){
	var offset = jQuery(input).offset();
	/*var width = options.width>=1?options.width:jQuery(input).width()+2;
	var top = options.top>=0?options.top:offset.top+jQuery(input).attr("offsetHeight");
	var left= options.left>=0?options.left:offset.left-1;
	var container = options.container?options.container:document.body;*/
	if (jQuery('#satab').length == 0){
		var sa = "";
		sa += "<div id='satab' style='align: right;position:absolute;z-index: 200;display:  none;margin:0px;padding:0px;' title='Search Assistance'>";
		//sa += "<div id='suggestions'></div>";
		sa += "<div class='searchAssistTab'>";
		sa += "	<div style='padding-top: 7px;'></div>";
		sa += "	<div id='searchAssist' style='display: none;'>";
		sa += "		Search Assist: ";
		sa += "		<span id='onSpan'>";
		sa += "			<a id='onLink' href='javascript:void(0);'>";
		sa += "				On";
		sa += "			</a>";
		sa += "		</span> | ";
		sa += "		<span id='offSpan' >";
		sa += "			<a id='offLink' href='javascript:void(0);'>";
		sa += "				Off";
		sa += "			</a>";
		sa += "		</span>";
		sa += "		<br/>";
		sa += "		<span class='linkActiv'><a href='javascript:void(0)' id='activateDeactivateLink'>Click here to </a></span>";
		sa += "	</div>";
		sa += "</div>";
		sa += "<div id='searchAssistHandle' onclick='sgf.showHideSearchAssist();' class='searchAssistHandleDown'></div>";
		sa += "</div>";
		var saElement = jQuery(sa)
			.css({"z-index":100,position:"absolute",width:(jQuery(input).width() + 2), top: offset.top+jQuery(input).attr("offsetHeight"), left:(offset.left - 1)});
		jQuery(saElement).appendTo(document.body);
		//alert("satab width: " + (jQuery(input).parent('.ui-wrapper').width() + 2));
	
	
	//To prevent duplicate bindings, unbind all event handlers first, then bind only the required ones later
	jQuery('#onLink').unbind();	
	jQuery('#offLink').unbind();	
	jQuery('#activateDeactivateLink').unbind();
	
	if (options.isSearchAssistActive == 'true'){
		jQuery('#onSpan').addClass('inactiveSearchAssist').removeClass("activeSearchAssist");
		jQuery('#offSpan').addClass('activeSearchAssist').removeClass("inactiveSearchAssist");
		jQuery('#activateDeactivateLink').append('Deactivate');
		jQuery('#onLink').removeAttr('href');
		jQuery('#offLink').bind("click",{input: input, isActive:'false',height:options.scrollHeight},sgf.activateSearchAssist);
		jQuery('#offLink').attr('href', 'javascript:void(0);');
		jQuery('#activateDeactivateLink').bind("click",{input: input, isActive:'false',height:options.scrollHeight},sgf.activateSearchAssist);	
		jQuery('#offLink').data('height',options.scrollHeight);
	}else {
		jQuery('#onSpan').addClass('activeSearchAssist').removeClass("inactiveSearchAssist");
		jQuery('#offSpan').addClass('inactiveSearchAssist').remove("activeSearchAssist");
		jQuery('#activateDeactivateLink').append('Activate');		
		jQuery('#offLink').removeAttr('href');
		jQuery('#onLink').bind("click",{input: input, isActive:'true',height:options.scrollHeight},sgf.activateSearchAssist);		
		jQuery('#onLink').attr('href', 'javascript:void(0);');
		jQuery('#activateDeactivateLink').bind("click",{input: input, isActive:'true',height:options.scrollHeight},sgf.activateSearchAssist);	
		
	}	
	}
}
sgf.activateSearchAssist = function (toggleData){	
	sgf.toggleSearchAssist(toggleData.data.input, toggleData.data.isActive, toggleData.data.height);
	
	if (typeof(sciverseObj.smapiVars.searchAssistTabActivitiesUrl) != 'undefined' && sciverseObj.smapiVars.searchAssistTabActivitiesUrl != '') {
		var keyString 	= "origin="+sciverseObj.contextInfo.pageType+"&searchAssistEnabled="+toggleData.data.isActive+"&_eventName=searchAssistEnabled";	
		eventHandler 	= "searchAssistEnabled";
		jQuery.ajax( {
					type 	:"POST",
					url 	:sciverseObj.smapiVars.searchAssistTabActivitiesUrl+ "?",
					data 	:keyString
		});
	}
}

// This function is used to activate (ON)/ deactivate (OFF) the feature.
sgf.toggleSearchAssist = function(input, isActivate,scrlHeight){
	jQuery('#onLink').unbind();	
	jQuery('#offLink').unbind();
	jQuery('#activateDeactivateLink').unbind('click');
	if(isActivate=='true'){	
		jQuery(input).autocomplete({scrollHeight : scrlHeight,isSearchAssistActive: isActivate});
		jQuery("#offLink").addClass("activeSearchAssist").removeClass("inactiveSearchAssist");
		jQuery("#onLink").addClass("inactiveSearchAssist").removeClass("activeSearchAssist");
		jQuery("#onLink").removeAttr('href');
		jQuery("#offLink").bind("click",{input: input, isActive:'false',height:scrlHeight},sgf.activateSearchAssist);
		jQuery("#offLink").attr('href', 'javascript:void(0);');		
		jQuery("#activateDeactivateLink").html("Click Here to Deactivate");
		jQuery("#activateDeactivateLink").bind("click",{input: input, isActive:'false',height:scrlHeight},sgf.activateSearchAssist);
	}else {
		jQuery(input).unautocomplete();
		jQuery("#offLink").addClass("inactiveSearchAssist").removeClass("activeSearchAssist");
		jQuery("#offLink").removeAttr('href');
		jQuery("#onLink").removeClass("inactiveSearchAssist").addClass("activeSearchAssist");
		jQuery("#onLink").attr('href', 'javascript:void(0);');
		jQuery("#onLink").bind("click",{input: input, isActive:'true',height:scrlHeight},sgf.activateSearchAssist);
		jQuery("#activateDeactivateLink").html("Click Here to Activate");
		jQuery("#activateDeactivateLink").bind("click",{input: input, isActive:'true',height:scrlHeight},sgf.activateSearchAssist);
	}
	//isSearchAssistEnabled = isActivate;	
}

// This function is used to expand/collapse the feature.
sgf.expandSearchAssist = function (isExpanded){	
	if (typeof(sciverseObj.smapiVars.searchAssistTabActivitiesUrl) != 'undefined' && sciverseObj.smapiVars.searchAssistTabActivitiesUrl != '') {
		var keyString 	= "searchAssistExpanded="+isExpanded+"&origin="+sciverseObj.contextInfo.pageType+"&_eventName=searchAssistTabExpanded";
		eventHandler 	= "searchAssistTabExpanded";
		jQuery.ajax( {
				type 	:"POST",
				url 	:sciverseObj.smapiVars.searchAssistTabActivitiesUrl+"?",
				data 	:keyString
		});
	}
}

//This function is used to show and hide the search assist tab on clicking the tab head.
sgf.showHideSearchAssist = function (){
	jQuery("#searchAssist").slideToggle("slow");
	if(jQuery("#searchAssist").height() > 1){
		jQuery("#searchAssistHandle").addClass("searchAssistHandleDown");
		jQuery("#searchAssistHandle").removeClass("searchAssistHandleUp");
		sgf.expandSearchAssist(false);
	}
	else{
		jQuery("#searchAssistHandle").addClass("searchAssistHandleUp");
		jQuery("#searchAssistHandle").removeClass("searchAssistHandleDown");
		sgf.expandSearchAssist(true);

	}	
}