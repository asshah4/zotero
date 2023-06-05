/*
  Copyright (c) 2009 Open Lab, http://www.open-lab.com/
  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/**
   * options.tags an object array [{tag:"tag1",freq:1},{tag:"tag2",freq:2}, {tag:"tag3",freq:3},{tag:"tag4",freq:4} ].
   * options.jsonUrl an url returning a json object array in the same format of options.tag. The url will be called with
   *                              "search" parameter to be used server side to filter results
   * option.autoFilter true/false  default=true when active show only matching tags, "false" should be used for server-side filtering
   * option.autoStart true/false  default=false when active dropdown will appear entering field, otherwise when typing
   * options.sortBy "frequency"|"tag"|"none"  default="tag"
   * options.tagSeparator default="," any separator char as space, comma, semicolumn
   * options.boldify true/false default trrue boldify the matching part of tag in dropdown
   *
   * options.suggestedTags callback an object array like ["sugtag1","sugtag2","sugtag3"]
   * options.suggestedTagsPlaceHolder  jquery proxy for suggested tag placeholder. When placeholder is supplied (hence unique), tagField should be applied on a single input
   *                          (something like  $("#myTagFiled").tagField(...) will works fine: $(":text").tagField(...) probably not!)
   */

(function($){
jQuery.fn.tagInput = function(options) {
  // --------------------------  start default option values --------------------------
  if (!options.tags && !options.jsonUrl) {
    options.tags = [ { tag:"tag1", freq:1 }, { tag:"tag2", freq:2 }, { tag:"tag3", freq:3 }, { tag:"tag4", freq:4 } ];
  }

  if (typeof(options.tagSeparator) == "undefined")
    options.tagSeparator = ",";

  if (typeof(options.autoFilter) == "undefined")
    options.autoFilter = true;

  if (typeof(options.autoStart) == "undefined")
    options.autoStart = false;

  if (typeof(options.boldify) == "undefined")
    options.boldify = true;

  if (typeof(options.sortBy) == "undefined")
    options.sortBy = "tag";

  if (typeof(options.freqKey) == "undefined")
    options.freqKey = "freq";

  // --------------------------  end default option values --------------------------

	var theInput;

    // --------------------------  SELECT TAGS BASING ON USER INPUT --------------------------
    var delayedSelectTagFromInput= function(){
      var element = $(this);
      $().stopTime("suggTagRefresh");
      $().oneTime(400, "suggTagRefresh", function() {
        selectSuggTagFromInput(theInput);
      });

    };

    var selectSuggTagFromInput = function (theInput) {
      var val = theInput.val();
      options.suggestedTagsPlaceHolder.find(".tag").each(function(){
        var el = $(this);
        var tag=el.text();

        //check if already present
        if (containsTag(val,tag)) {
          el.addClass("tagUsed");
        } else {
          el.removeClass("tagUsed");
        }
      });

    };




    // --------------------------  INPUT FOCUS --------------------------
    var tagInputFocus = function () {
      theDiv = $("#__tagInputDiv");
      // check if the result box exists
      if (theDiv.size() <= 0) {
        //create the div
        theDiv = $("<div id='__tagInputDiv' class='tagInputDiv' style='width:" + theInput.get(0).clientWidth + ";display:none; '></div>");
        theInput.after(theDiv);
        theDiv.css({left:theInput.position().left, top:theInput.position().top+theInput.outerHeight(true)});
      }
      if (options.autoStart)
        tagInputRefreshDiv(theInput, theDiv);
    };


    // --------------------------  INPUT BLUR --------------------------
    var tagInputBlur = function () {
      // reformat string
      theDiv = $("#__tagInputDiv");
      theInput.val(refurbishTags(theInput.val()));

      theDiv.fadeOut(200, function() {
        theDiv.remove();
      });
    };


    // --------------------------  INPUT KEYBOARD --------------------------
    var tagInputKey = function (e) {
//     if (typeof theDiv == 'undefined') {
//	e.preventDefault();
//	return;
//      }
      var rows = theDiv.find("div.tagInputLine");
      var rowNum = rows.index(theDiv.find("div.tagInputSel"));

      var ret = true;
      switch (e.which) {
        case 38: //up arrow
          rowNum = (rowNum < 1 ? 0 : rowNum - 1 );
          tagInputHLSCR(rows.eq(rowNum), true);
          break;

        case 40: //down arrow
          rowNum = (rowNum < rows.size() - 1 ? rowNum + 1 : rows.size() - 1 );
          tagInputHLSCR(rows.eq(rowNum), false);
          break;

        case 9: //tab
        case 13: //enter
          if (theDiv.is(":visible")){
            var theRow = rows.eq(rowNum);
            tagInputClickRow(theRow);
	    // For some reason need to refocus the input to get future events
	    theInput.blur();
	    theInput.val(theInput.val());
	    theInput.focus();

	    e.preventDefault();
            ret = false;
          }
          break;

        case 27: //esc
          theDiv.fadeOut(200);
          break;

        default:
          $(document).stopTime("tagInputRefresh");
          $(document).oneTime(400, "tagInputRefresh", function() {
            tagInputRefreshDiv();
          });
          break;
      }
      return ret;
    };


    // --------------------------  TAG DIV HIGHLIGHT AND SCROLL --------------------------
    var tagInputHLSCR = function(theRowJQ, isUp) {
      if (theRowJQ.size() > 0) {
        var div = theDiv.get(0);
        var theRow = theRowJQ.get(0);
        if (isUp) {
          if (theDiv.scrollTop() > theRow.offsetTop) {
            theDiv.scrollTop(theRow.offsetTop);
          }
        } else {
          if ((theRow.offsetTop + theRow.offsetHeight) > (div.scrollTop + div.offsetHeight)) {
            div.scrollTop = theRow.offsetTop + theRow.offsetHeight - div.offsetHeight;
          }
        }
        theDiv.find("div.tagInputSel").removeClass("tagInputSel");
        theRowJQ.addClass("tagInputSel");
      }
    };


    // --------------------------  TAG LINE CLICK --------------------------
    var tagInputClickRow = function(theRow) {
      var oldVal = theInput.val().trim();
      var lastComma = oldVal.lastIndexOf(options.tagSeparator);
      var sep= lastComma<=0? (""):(options.tagSeparator+ (options.tagSeparator==" "?"":" "));
      var newVal = (oldVal.substr(0, lastComma) + sep + theRow.find(".tagInputLineTag").text()).trim();
      theInput.val(newVal + " ");
      theDiv.hide().remove();
      $().oneTime(200, function() {
	theInput.blur()
	theInput.val(theInput.val());
	theInput.focus();
      });

    };


    // --------------------------  REFILL TAG BOX --------------------------
    var tagInputRefreshDiv = function () {

      var lastComma = theInput.val().lastIndexOf(options.tagSeparator);
      var search = theInput.val().substr(lastComma + 1).trim();


      // --------------------------  FILLING THE DIV --------------------------
      var fillingCallbak = function(tags) {
        if (options.sortBy == "frequency") {
          tags = tags.sort(function (a, b) {
            if (a[options.freqKey] < b[options.freqKey])
              return 1;
            if (a[options.freqKey] > b[options.freqKey])
              return -1;
            return 0;
          });

        } else if (options.sortBy == "tag") {
          tags = tags.sort(function (a, b) {
            if (a.tag < b.tag)
              return -1;
            if (a.tag > b.tag)
              return 1;
            return 0;
          });
        }

        for (var i in tags) {
          var el = tags[i];
	  var matchPos = el.tag.toLocaleLowerCase().indexOf(search.toLocaleLowerCase());
          var matches = matchPos >= 0;
          if (!options.autoFilter || matches) {
            var line = $("<div class='tagInputLine'></div>");
            var tag = el.tag;
            if (options.boldify && matches) {
//              tag = "<b>" + tag.substring(0, search.length) + "</b>" + tag.substring(search.length);
              tag = tag.substring(0,matchPos)+"<b>" + tag.substring(matchPos, matchPos+search.length) + "</b>" + tag.substring(matchPos+search.length);
            }

            line.append("<div class='tagInputLineTag'>" + tag + "</div>");
            if (el[options.freqKey])
              line.append("<div class='tagInputLineFreq'>" + el[options.freqKey] + "</div>");
            theDiv.append(line);
          }
        }
        if (theDiv.html()!=""){
          theDiv.fadeIn("fast");
        }

        theDiv.find("div:first").addClass("tagInputSel");


        theDiv.find(".tagInputLine").bind("mouseover", function() {
		var rows = theDiv.find("div.tagInputLine");
		var rowNum = rows.index($(this));
		tagInputHLSCR(rows.eq(rowNum), false);

	});


        theDiv.find("div.tagInputLine").bind("click", function(e) {
		tagInputClickRow($(this));
        });
      };


      if (search != "" || options.autoStart) {
        theDiv.html("");

        if (options.tags)
          fillingCallbak(options.tags);
        else{
          var data = {search:search};
          $.getJSON(options.jsonUrl, data, fillingCallbak );
        }
      } else {
        theDiv.fadeOut(200);
      }
    };

    // --------------------------  CLEAN THE TAG LIST FROM EXTRA SPACES, DOUBLE COMMAS ETC. --------------------------
    var refurbishTags = function (tagString) {
      var splitted = tagString.split(options.tagSeparator);
      var res = "";
      var first = true;
      for (var i = 0; i < splitted.length; i++) {
        if (splitted[i].trim() != "") {
          if (first) {
            first = false;
            res = res + splitted[i].trim();
          } else {
            res = res + options.tagSeparator+ (options.tagSeparator==" "?"":" ") + splitted[i].trim();
          }
        }
      }
      return (res + " ");
    };

    // --------------------------  TEST IF TAG IS PRESENT --------------------------
    var containsTag=function (tagString,tag){
      var splitted = tagString.split(options.tagSeparator);
      var res="";
      var found=false;
      tag=tag.trim();
      for(i = 0; i < splitted.length; i++){
        var testTag=splitted[i].trim();
        if (testTag==tag){
          found=true;
          break;
        }
      }
      return found;
    };



  this.each(function() {

    theInput = $(this);
    var theDiv;

    theInput.addClass("tagInput");
    theInput.tagOptions=options;

    var suggestedTagsPlaceHolder=options.suggestedTagsPlaceHolder;
    //create suggested tags place if the case
    if (options.suggestedTags){
      if (!suggestedTagsPlaceHolder){
        //create a placeholder
        var stl=$("<div class='tagInputSuggestedTags'><span class='label'>suggested tags: </span><span class='tagInputSuggestedTagList'></span></div>");
        suggestedTagsPlaceHolder=stl.find(".tagInputSuggestedTagList");
        theInput.after(stl);
      }

      //fill with suggestions
      for (var i=0; i<options.suggestedTags.length; i++) {
	var e = options.suggestedTags[i];
	var t = e.tag;
	var c;
	if (e.tag.charAt(0) == "*") {
		c= "ptag tag";
	} else {
		c= "tag";
	}

/*
	if (e.tag.charAt(0) == "*") {
		t = "*<b>"+e.tag.charAt(1)+"</b>"+e.tag.substring(2);
	} else {
		t = "<b>"+e.tag.charAt(0)+"</b>"+e.tag.substring(1);
	}
*/
	if (e.suggested) {
		suggestedTagsPlaceHolder.append($("<span class='"+c+"'><span class='suggested'>" + t + "</span></span>"));
	} else {
		suggestedTagsPlaceHolder.append($("<span class='"+c+"'>" + t + "</span>"));
	}
      }
//      for (var tag in options.suggestedTags) {
//        suggestedTagsPlaceHolder.append($("<span class='tag'>" + options.suggestedTags[tag] + "</span>"));
//      }

      // bind click on suggestion tags
      suggestedTagsPlaceHolder.find(".tag").click(function() {
        var element = $(this);
        var val = theInput.val();
        var tag = element.text();

        //check if already present
	var re;
	if (tag.charAt(0)=="*") {
	        re = new RegExp("\\"+tag + "\\b","g");
	} else {
		re = new RegExp(tag + "\\b","g");
	}
        if (containsTag(val, tag)) {
          val = val.replace(re, ""); //remove all the tag
          element.removeClass("tagUsed");
        } else {
          val = val + options.tagSeparator + tag;
          element.addClass("tagUsed");
        }
	theInput.focus();
        theInput.val(refurbishTags(val));
//        selectSuggTagFromInput();

      });
      selectSuggTagFromInput(theInput);

    }




    // --------------------------  INPUT BINDINGS --------------------------
    $(this).bind("focus", tagInputFocus).bind("blur", tagInputBlur).bind("keydown", tagInputKey);
    if (options.suggestedTags)
      $(this).bind("keyup",delayedSelectTagFromInput) ;


  });
  return this;
};
})(jQuery);




(function( $ ){
	var settings = {
		initial_tags: "",
		form_element_name: "tags",
		all_libraries: null,
		initial_libraries: [],
		showTags: false,
		onShowTags: null,
		all_tags: null
	};

	// Removes redundant elements from the array
	var uniq = function(a) {
		var r = new Array();
		o:for(var i = 0, n = a.length; i < n; i++) {
			for (var x = 0, y = r.length; x < y; x++) {
				if (r[x].tag==a[i].tag) continue o;
			}
			r[r.length] = a[i];
		}
		return r;
	}

	var methods = {
		init: function(options) {
			var $this = $(this);

			if ( options ) {
				$.extend( settings, options );
			}

			var input_element = jQuery("<input type='text'/>")
				.attr("name",settings.form_element_name)
				.attr("value",settings.initial_tags)
				.attr("autocomplete","off")
				.addClass("tagInput")
				.css({width:"450px"});


			var show_all_tags_button = jQuery("<input type='button'/>")
				.attr("value",settings.showTags ? "Hide all tags" : "Show all tags")
				.data("state",settings.showTags)
				.click(function() {
					$$ = $(this);
					if ($$.data("state")) {
						$$.data("state",false);
						$$.attr("value", "Show all tags");
						existingtags_div.hide();
					} else {
						$$.data("state",true);
						$$.attr("value", "Hide all tags");
						existingtags_div.show();
					}
					if (typeof onShowTags != 'undefined' && onShowTags) {
						onShowTags($$.data("state"));
					}
				}).button();


			var suggest_tags_button =  jQuery("<input type='button'/>")
				.attr("value","Suggest tags")
				.css("display","none")
				.click(function() {
					alert("Suggest tags");
				}).button();

			var existingtags_div = jQuery("<div />")
				.addClass("existingtags");
			if (!settings.showTags) {
				existingtags_div.css("display","none");
			}

			var tagInputSuggestedTags_div = jQuery("<div />")
				.addClass("tagInputSuggestedTags");

			existingtags_div.append(tagInputSuggestedTags_div);

			var tagList_div = jQuery("<span />").addClass("tagInputSuggestedTagList")

			tagInputSuggestedTags_div
				.append(jQuery("<span />").addClass("label"))
				.css("width","100%")
				.append(tagList_div);


			$this.append(input_element)
				.append("&nbsp;")
				.append(show_all_tags_button)
				.append(suggest_tags_button)
				.append(existingtags_div);

			$this.data("elements", {
				show_all_tags_button:		show_all_tags_button,
				suggest_tags_button:		suggest_tags_button,
				input_element:			input_element,
				tagInputSuggestedTags_div:	tagInputSuggestedTags_div,
				tagList_div:			tagList_div
			});

			if (settings.all_tags) {
				$this.data("tags",settings.all_tags);
				methods.setTags(settings.initial_libraries, $this);
			} else {
				var qs = "";
				//if (settings.all_libraries) {
				//	qs += "?"+$.param( {"library": settings.all_libraries},true);
				//}

				jQuery.getJSON("/go_users_tags_list.json"+qs)
					.success(function(data){
						if (!(data && data.status == "ok")) {
							return
						}

						$this.data("tags",data.tags);
						methods.setTags(settings.initial_libraries, $this);
					});
			}
		},

		setTags: function(which, $this) {
			if (!$this) {
				$this = $(this);
			}

			var theTags = [];
			var t = $this.data("tags");
			for (i=0; i<which.length; i++) {
			//	alert(which[i] + "::"+ $.toJSON( t[which[i]]));
				if (t && t[which[i]]) {
					theTags = theTags.concat(t[which[i]]);
				}
			}

			theTags.sort(function(a,b) {
				var x = a.tag, y=b.tag;
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});

			theTags = uniq(theTags);

			var suggestedTags = theTags;

			var tagList_div = $this.data("elements").tagList_div;
			tagList_div.empty();
			var input_element = $this.data("elements").input_element;
			input_element.unbind().tagInput({
				tags:theTags,
				sortBy:"frequency",
				suggestedTags:suggestedTags,
				tagSeparator:" ",
				autoFilter:true,
				autoStart:false,
				suggestedTagsPlaceHolder: tagList_div,
				boldify:true,
				freqKey:"count"
			});
			input_element.focus();
		}
	};

	$.fn.tagedit = function(method) {
		// Method calling logic
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
		}
	};

})( jQuery );
