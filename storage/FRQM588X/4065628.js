jQuery(function($j) {
      var formState = {
          overrideBackends: false,
          backends: {}
      };
      
      // Name of the cookie
      var cookieName;
      
      // Mostly just for debugging, store the cookie string value here
      // rather than in the sub-function scope
      var cookieStr;
      
      // An object representation of the cookie.  This is converted from the
      // XML cookie value on init.  The form controls will manipulate this,
      // and when the user clicks "Go", this will be converted back into
      // XML.
      var cookieObj;

      ///////////////////////////////////////////////////////////////////////////////
      function cbChanged(event) {
          //console.info("Event caught: " + event);
          var target = $j(event.target);
          var id = target.attr("id");
          var value = target.attr("value");
          var checked = target.attr("checked");
          /*console.info("target id: '" + id + 
                       "', value: '" + value + 
                       "', checked: '" + checked + "'");*/
          
          
          if (id == "besetsel-cb") {
              if (checked) {
                  $j("#besetsel-sel").removeAttr("disabled");
                  besetSelFormToObj();
              }
              else {
                  $j("#besetsel-sel").attr("disabled", 1);
                  delete cookieObj.besetName;
              }
          }
          else if (id == "besetsel-sel") {
              besetSelFormToObj();
          }
          else {
              var m;
              if (m = id.match(/besetsel-be-(.*?)-cb/)) {
                  var backend = m[1];
                  //console.info(">>>backend checkbox:  " + backend);
                  if (checked) {
                      $j("#besetsel-be-" + backend + "-text").removeAttr("disabled");
                      beUrlFormToObj(backend);
                  }
                  else {
                      $j("#besetsel-be-" + backend + "-text").attr("disabled", 1);
                      delete cookieObj.backendUrls[backend];
                  }
              }
              else if (m = id.match(/besetsel-be-(.*?)-text/)) {
                  backend = m[1];
                  //console.info(">>>backend text:  " + backend);
                  beUrlFormToObj(backend);
              }
          }
          
          // PMC-11784 and PMC-11785.
          // This fixes a nasty IE bug.  It causes a slight flash when the user
          // clicks a checkbox, but it works.
          if (jQuery.browser.msie){
              target.hide();
              window.setTimeout( function(){ target.show();}, 0 );
          }
          
      }

      ///////////////////////////////////////////////////////////////////////////////
      // besetSelFormToObj()
      // This is called by a couple of event handlers and decodes the
      // currently selected BESet (in the drop-down form) and sets the
      // cookieObj.besetName accordingly.

      function besetSelFormToObj()
      {
          cookieObj.besetName = $j("#besetsel-sel").val();
      }

      ///////////////////////////////////////////////////////////////////////////////
      // beUrlFormToObj(backend)
      // This is similar, and takes care of reading the text value from the
      // form and stuffing it into the object

      function beUrlFormToObj(backend) {
          var value = $j("#besetsel-be-" + backend + "-text").attr("value");
          if (value) cookieObj.backendUrls[backend] = value;
      }

      ///////////////////////////////////////////////////////////////////////////////
      function init() {
          if ($j("#besetsel-form").length < 1)
          {
              return;
          }
          
          cookieName = $j("#besetsel-form").attr("cookieName");
          cookieObj = cookieXmlToJson(cookieName);
          initFormState();

          // Set event handers
          $j("#besetsel-form .besetsel-control").change(function(event) {
              cbChanged(event);
          });
          $j("#besetsel-go-button").click(function(event) {
              goButton(event);
          });
          $j("#besetsel-reset-button").click(function(event) {
              resetButton(event);
          });
          
          // This "pullout" might be empty, in the case of the BESet being
          // selected by path segment instead of cookie.  In that case, the
          // tab acts as a watermark, just to identify the BESet, and we
          // don't want to allow it to be "pulled out".  So we'll set the
          // width to 0 in that case.
          var w = $j("#besetsel-go-button").length > 0 ? "400px" : "0px";

          // Put it into the sidecontent pullout
          $j("#besetsel-form").sidecontent({
              /*classmodifier: "besetsel",*/
              attachto: "rightside",
              width: w,
              opacity: "0.8",
              pulloutpadding: "5",
              textdirection: "vertical",
              clickawayclose: 0,
              titlenoupper: 1
          });
          
          var pulloutColor = $j("#besetsel-form").attr("pulloutColor");
          //alert("color is " + pulloutColor);
          $j("#besetsel-form").data("pullout").css("background-color", pulloutColor || '#663854');
          
          if ($j("#besetsel-go-button").size() > 0) {
              $j("#besetsel-form").data("pullout").css({
                  "border-top": "ridge gray 5px",
                  "border-bottom": "ridge gray 5px",
                  "border-left": "ridge gray 5px"
              });
          }
      }

      ///////////////////////////////////////////////////////////////////////////////
      // goButton(event)
      // Handle the user-click of the "Go!" button.
      
      function goButton(event) {
          // Convert the object into XML
          var cookieXml = "<Backends><BESet" + ( cookieObj.besetName ? (" name='" + cookieObj.besetName + "'>") : ">" );
          for (var backend in cookieObj.backendUrls) {
              //console.info("+++ backend " + backend);
              cookieXml += 
                "<Backend name='" + backend + "'>" + xmlEscape(cookieObj.backendUrls[backend]) + "</Backend>";
          }
          cookieXml += "</BESet></Backends>";
          //console.info(cookieXml);
          
          // Set the cookie
          document.cookie = cookieName + "=" + encodeURIComponent(cookieXml) +
                            "; max-age=604800" +
                            "; path=/" +
                            "; domain=nih.gov";
          // Reload the page
          window.location.reload();
      }
      
      ///////////////////////////////////////////////////////////////////////////////
      // resetButton(event)
      // Handle the user-click of the "Reset" button.
      // Does the same thing as "Go!", but sets the cookie to the empty string.

      function resetButton(event) {
          // Clear the cookie
          document.cookie = cookieName + "=" + 
                            "; max-age=604800" +
                            "; path=/" +
                            "; domain=nih.gov";
          // Reload the page
          window.location.reload();
      }
      
      ///////////////////////////////////////////////////////////////////////////////
      function xmlEscape(str) {
          str = str.replace(/\&/g, '&amp;')
                   .replace(/\</g, '&lt;')
                   .replace(/\>/g, '&gt;')
                   .replace(/\"/g, '&quot;')
                   .replace(/\'/g, '&apos;');
          return str;
      }

      ///////////////////////////////////////////////////////////////////////////////
      // This function reads the cookie value and initializes the form state
      // Don't assume anything about the form state -- redo everything.
      function initFormState() {

          var besetName = cookieObj.besetName;

          if (!besetName) {
              $j("#besetsel-cb").removeAttr("checked");
              $j("#besetsel-sel").attr("disabled", 1);
          }
          else {
              var selBESet = $j("#besetsel-opt-" + besetName);
              if (selBESet.length != 0) {
                  $j("#besetsel-cb").attr("checked", 1);
                  $j("#besetsel-sel").removeAttr("disabled");
                  selBESet.attr("selected", 1);
              }
              else {
                  $j("#besetsel-cb").removeAttr("checked");
                  $j("#besetsel-sel").attr("disabled", 1);
              }
          }
          
          // Foreach backend in the form
          $j(".besetsel-be-cb").each(function(i) {
              var id = $j(this).attr("id");
              var beName = id.match(/besetsel-be-(.*?)-cb/)[1];
              //console.info("### backend, id is '" + id + "', beName is '" + beName + "'");
              if (!beName) return;
              
              // See if there's a corresponding element in the cookie
              if (!cookieObj.backendUrls ||
                  !cookieObj.backendUrls[beName]) {
                  //console.info("Didn't find " + beName);
                  $j("#besetsel-be-" + beName + "-cb").removeAttr("checked");
                  $j("#besetsel-be-" + beName + "-text").attr("disabled", 1);
              }
              else {
                  //console.info("Found " + beName);
                  $j("#besetsel-be-" + beName + "-cb").attr("checked", 1);
                  var textbox = $j("#besetsel-be-" + beName + "-text");
                  textbox.removeAttr("disabled");
                  textbox.attr("value", cookieObj.backendUrls[beName]);
              }
          });
      }
      
      ///////////////////////////////////////////////////////////////////////////////
      // This gets the value of the <snapshot>_beset cookie, which is in XML, and turns it
      // from this:
      //   <BESet name='test'>
      //     <BackendUrl backend='tagserver' url='bingo'/>
      //     ...
      //   </BESet>
      // Into this (note that everything is optional):
      //   { besetName: 'test',
      //     backendUrls: {
      //         tagserver: 'bingo', ... }
      //   }
      // If there is no cookie set or parsing fails, this returns {}.
      
      function cookieXmlToJson(cookieName) {
          var cookieObj = {
              backendUrls: {}
          };

          cookieStr = getCookie(cookieName);
          //console.info("cookie value is '" + cookieStr + "'");

          // Parse XML
          try {
              var cookieXml = $j(cookieStr);
          }
          catch(err) {
              return cookieObj;
          }
          
          var besetElem = cookieXml.find('BESet');
          if (besetElem.length == 0) {
              // No valid cookie value found.
              return cookieObj;
          }
          
          var besetName = besetElem.attr("name");
          if (besetName) {
              cookieObj.besetName = besetName; 
          }
          
          var backends = besetElem.find("backend");
          if (backends.length != 0) {
              backends.each(function (i) {
                  var e = $j(backends[i]);
                  cookieObj.backendUrls[e.attr("name")] = e.text();
                  //console.info("Setting " + e.attr("backend") + ": " + e.attr("url"));
              })
          }
          
          return cookieObj;
      }

      ///////////////////////////////////////////////////////////////////////////////
      function getCookie(name) {
          var allCookies = document.cookie;
          //console.info("allCookies = " + allCookies);
          var pos = allCookies.indexOf(name + "=");
          if (pos != -1) {
              var start = pos + (name + "=").length;
              var end = allCookies.indexOf(";", start);
              if (end == -1) end = allCookies.length;
              return decodeURIComponent(allCookies.substring(start, end)); 
          }
          return "";
      }
        
    init();
    
});



;
(function($)
{
	// This script was written by Steve Fenton
	// http://www.stevefenton.co.uk/Content/Jquery-Side-Content/
	// Feel free to use this jQuery Plugin
	// Version: 3.0.2
	
	var classModifier = "";
	var sliderCount = 0;
	var sliderWidth = "400px";
	
	var attachTo = "rightside";
	
	var totalPullOutHeight = 0;
	
	function CloseSliders (thisId) {
		// Reset previous sliders
		for (var i = 0; i < sliderCount; i++) {
			var sliderId = classModifier + "_" + i;
			var pulloutId = sliderId + "_pullout";
			
			// Only reset it if it is shown
			if ($("#" + sliderId).width() > 0) {

				if (sliderId == thisId) {
					// They have clicked on the open slider, so we'll just close it
					showSlider = false;
				}

				// Close the slider
				$("#" + sliderId).animate({
					width: "0px"
				}, 100);
				
				// Reset the pullout
				if (attachTo == "leftside") {
					$("#" + pulloutId).animate({
						left: "0px"
					}, 100);
				} else {
					$("#" + pulloutId).animate({
						right: "0px"
					}, 100);
				}
			}
		}
	}
	
	function ToggleSlider () {
		var rel = $(this).attr("rel");

		var thisId = classModifier + "_" + rel;
		var thisPulloutId = thisId + "_pullout";
		var showSlider = true;
		
		if ($("#" + thisId).width() > 0) {
			showSlider = false;
		}

        CloseSliders(thisId);
		
		if (showSlider) {
			// Open this slider
			$("#" + thisId).animate({
				width: sliderWidth
			}, 250);
			
			// Move the pullout
			if (attachTo == "leftside") {
				$("#" + thisPulloutId).animate({
					left: sliderWidth
				}, 250);
			} else {
				$("#" + thisPulloutId).animate({
					right: sliderWidth
				}, 250);
			}
		}
		
		return false;
	};

	$.fn.sidecontent = function (settings) {
	
		var config = {
			classmodifier: "sidecontent",
			attachto: "rightside",
			width: "300px",
			opacity: "0.8",
			pulloutpadding: "5",
			textdirection: "vertical",
			clickawayclose: false
		};
		
		if (settings) {
			$.extend(config, settings);
		}
		
		return this.each(function () {
		
			$This = $(this);
			
			// Hide the content to avoid flickering
			$This.css({ opacity: 0 });
			
			classModifier = config.classmodifier;
			sliderWidth = config.width;
			attachTo = config.attachto;
			
			var sliderId = classModifier + "_" + sliderCount;
			var sliderTitle = config.title;
			
			// Get the title for the pullout
			sliderTitle = $This.attr("title");
			
			// Start the totalPullOutHeight with the configured padding
			if (totalPullOutHeight == 0) {
				totalPullOutHeight += parseInt(config.pulloutpadding);
			}

			if (config.textdirection == "vertical") {
				var newTitle = "";
				var character = "";
				for (var i = 0; i < sliderTitle.length; i++) {
					character = sliderTitle.charAt(i).toUpperCase();
					if (character == " ") {
						character = "&nbsp;";
					}
					newTitle = newTitle + "<span>" + character + "</span>";
				}
				sliderTitle = newTitle;
			}
			
			// Wrap the content in a slider and add a pullout			
			$This.wrap('<div class="' + classModifier + '" id="' + sliderId + '"></div>').wrap('<div style="width: ' + sliderWidth + '"></div>');
            var pullout = $('<div class="' + classModifier + 'pullout" id="' + sliderId + '_pullout" rel="' + sliderCount + '">' + sliderTitle + '</div>').insertBefore($("#" + sliderId));
            
            // Store reference to the tab element in parent 
            $This.data('pullout', pullout);
			
			if (config.textdirection == "vertical") {
				$("#" + sliderId + "_pullout span").css({
					display: "block",
					textAlign: "center"
				});
			}
			
			// Hide the slider
			$("#" + sliderId).css({
				position: "absolute",
				overflow: "hidden",
				top: "0",
				width: "0px",
				zIndex: "1",
				opacity: config.opacity
			});
			
			// For left-side attachment
			if (attachTo == "leftside") {
				$("#" + sliderId).css({
					left: "0px"
				});
			} else {
				$("#" + sliderId).css({
					right: "0px"
				});
			}
			
			// Set up the pullout
			$("#" + sliderId + "_pullout").css({
				position: "absolute",
				top: totalPullOutHeight + "px",
				zIndex: "1000",
				cursor: "pointer",
				opacity: config.opacity
			})
			
			$("#" + sliderId + "_pullout").live("click", ToggleSlider);
			
			var pulloutWidth = $("#" + sliderId + "_pullout").width();
			
			// For left-side attachment
			if (attachTo == "leftside") {
				$("#" + sliderId + "_pullout").css({
					left: "0px",
					width: pulloutWidth + "px"
				});
			} else {
				$("#" + sliderId + "_pullout").css({
					right: "0px",
					width: pulloutWidth + "px"
				});
			}
			
			totalPullOutHeight += parseInt($("#" + sliderId + "_pullout").height());
			totalPullOutHeight += parseInt(config.pulloutpadding);
			
			var suggestedSliderHeight = totalPullOutHeight + 30;
			if (suggestedSliderHeight > $("#" + sliderId).height()) {
				$("#" + sliderId).css({
					height: suggestedSliderHeight + "px"
				});
			}
			
			if (config.clickawayclose) {
				$("body").click( function () {
					CloseSliders("");
				});
			}
			
			// Put the content back now it is in position
			$This.css({ opacity: 1 });
			
			sliderCount++;
		});
		
		return this;
	};
})(jQuery);
;
/* Override this file with one containing code that belongs on every page of your application */


;
jQuery(function($) {
    // Set event listener to scroll the nav poppers to the current page when opened
    $("#source-link-top, #source-link-bottom").bind(
        "ncbipopperopencomplete",
        function() {
            var dest = $(this).attr('href');
            var selected_link = $(dest).find('.current-toc-entry');

            if (selected_link.length > 0) 
            {
                $(dest).scrollTo(selected_link, { offset: -100, duration:  400 });
            }
        }
    );  
});


;
(function($){

    $(function() {    

        var theSearchInput = $("#term");
        var originalTerm = $.trim(theSearchInput.val());
        var theForm = jQuery("form").has(theSearchInput);
        var dbNode = theForm.find("#database");
        var currDb = dbNode.val();
        var sbConfig = {};
        try{
            sbConfig = eval("({" + theSearchInput.data("sbconfig") + "})");
        }catch(e){}
        var defaultSubmit =  sbConfig.ds == "yes";
        var searched = false;
        var dbChanged = null; //since db.change is triggered as a work around for JSL-2067 
        var searchModified = false; //this is used to allow searching when something esle changed on the page with out the term changing
    
        if(!$.ncbi)
            $.extend($,{ncbi:{}});
        if(!$.ncbi.searchbar)
            $.extend($.ncbi,{searchbar:{}});
            
        $.extend($.ncbi.searchbar,
            (function(){
                //*****************private ******************/
               function doSearchPing() {
                   try{
                    var cVals = ncbi.sg.getInstance()._cachedVals;
                    var searchDetails = {}
                    searchDetails["jsEvent"] = "search";
                    var app = cVals["ncbi_app"];
                    var db = cVals["ncbi_db"];
                    var pd = cVals["ncbi_pdid"];
                    var pc = cVals["ncbi_pcid"];
                    var sel = dbNode[0];
                    var searchDB = sel.options[sel.selectedIndex].value;
                    var searchText = theSearchInput[0].value;
                    if( app ){ searchDetails["ncbi_app"] = app.value; }
                    if( db ){ searchDetails["ncbi_db"] = db.value; }
                    if( pd ){ searchDetails["ncbi_pdid"] = pd.value; }
                    if( pc ){ searchDetails["ncbi_pcid"] = pc.value; }
                    if( searchDB ){ searchDetails["searchdb"] = searchDB;}
                    if( searchText ){ searchDetails["searchtext"] = searchText;}
                    ncbi.sg.ping( searchDetails );
                   }catch(e){
                       console.log(e);
                   }
                }
                function getSearchUrl(term){
                    var url = "";
                    if (typeof(NCBISearchBar_customSearchUrl) == "function") 
                            url = NCBISearchBar_customSearchUrl();
                    if (!url) {
                        var searchURI = dbNode.find("option:selected").data("search_uri");
                        url = searchURI ?  searchURI.replace('$',term) : 
                             "/" + dbNode.val() + "/" + ( term !="" ? "?term=" + term : "");
                        }
                    return url;
                }
            
                return {
                    //*****************exposed attributes and functions ******************/
                    'theSearchInput':theSearchInput,
                    'theForm':theForm,
                    'dbNode':dbNode,
                    'searched':searched,
                    'setSearchModified':function() { searchModified = true; },
                    'setSearchUnmodified':function() { searchModified = false; },
                    'searchModified':function(){return searchModified;},
                    'doSearch':function(e){
                           e.stopPropagation();
                           e.preventDefault();
                           //checking for the searched flag is necessary because the autocompelete control fires on enter key, the form submit also fires on enter key
                           if(searched == false){
                               searched = true;
                               theForm.find('input[type="hidden"][name^="p$"]').attr('disabled', 'disabled');
                               //$("input[name]").not(jQuery(".search_form *")).attr('disabled', 'disabled');
                               if (defaultSubmit)
                                   $.ncbi.searchbar.doSearchPing();
                               else {
                                   var term = $.trim(theSearchInput.val());
                                   if (dbChanged || searchModified || term !== originalTerm){
                                       $.ncbi.searchbar.doSearchPing();
                                       var searchUrl = $.ncbi.searchbar.getSearchUrl(encodeURIComponent(term).replace(/%20/g,'+'));
                                       var doPost = (term.length  > 2000) ? true : false; 
                                       if (doPost){
                                           if (e.data.usepjs){
                                               Portal.$send('PostFrom',{"theForm":theForm,"term":term,"targetUrl":searchUrl.replace(/\?.*/,'')});
                                           }
                                           else{
                                               theForm.attr('action',searchUrl.replace(/\?.*/,''));
                                               theForm.attr('method','post');
                                           }
                                       }
                                       else {
                                           window.location = searchUrl;
                                       }
                                   }
                                   else{ //if (term !== originalTerm){
                                       searched = false;
                                   }
                               }
                           }
                    },
                    'onDbChange':function(e){
                         if (dbChanged === null)
                             dbChanged = false;
                         else
                             dbChanged = true;
                         var optionSel = $(e.target).find("option:selected");
                         var dict = optionSel.data("ac_dict");
                         if (dict){
                             //theSearchInput.ncbiautocomplete("option","isEnabled",true).ncbiautocomplete("option","dictionary",dict);
                             theSearchInput.ncbiautocomplete({
                                    isEnabled: true,
                                    dictionary: dict
                                });
                             theSearchInput.attr("title","Search " + optionSel.text() + ". Use up and down arrows to choose an item from the autocomplete.");
                         }
                         else{
                           theSearchInput.ncbiautocomplete("turnOff",true);
                           theSearchInput.attr("title", "Search " + optionSel.text());
                         }
                         if (defaultSubmit)
                            theForm.attr('action','/' + dbNode.val() + '/');  
                    },
                    'doSearchPing':function(){
                        doSearchPing();
                    },
                    'getSearchUrl':function(term){
                        return getSearchUrl(term);
                    }
                    
                };//end of return 
             })() //end of the self executing anon
        );//end of $.extend($.ncbi.searchbar
    
         function initSearchBar(usepjs){
            //enable the controls for the back button
            theForm.find('input[type="hidden"][name^="p$"]').removeAttr('disabled');
             if (usepjs)
                 portalSearchBar();
         }
         
        
    
        function portalSearchBar(){
            
            Portal.Portlet.NcbiSearchBar = Portal.Portlet.extend ({
                init:function(path,name,notifier){
                    this.base (path, name, notifier);
                },
                send:{
                    "Cmd":null,
                    "Term":null
                },
                "listen":{
                    "PostFrom":function(sMessage,oData,sSrc){
                        this.postForm(oData.theForm,oData.term,oData.targetUrl);
                    }
                },
                "postForm":function(theForm,term,targetUrl){
                       //console.log('targetUrl = ' + targetUrl);
                       theForm.attr('action',targetUrl);
                       theForm.attr('method','post');
                       this.send.Cmd({
                            'cmd' : 'Go'
                        });
                           this.send.Term({
                            'term' : term
                        });
                        Portal.requestSubmit();
                },
                'getPortletPath':function(){
                    return this.realpath + '.Entrez_SearchBar';
                }
            });
    
        }//portalSearchBar
        


         //portal javascript is required to make a POST when the rest of the app uses portal forms 
         var usepjs = sbConfig.pjs == "yes"; 
         //console.log('sbConfig',sbConfig);
         initSearchBar(usepjs);
         
         dbNode.on("change",$.ncbi.searchbar.onDbChange);
        
        theForm.on("submit",{'usepjs':usepjs},$.ncbi.searchbar.doSearch);
        theSearchInput.on("ncbiautocompleteenter ncbiautocompleteoptionclick", function(){theForm.submit();});
        //a work around for JSL-2067
        dbNode.trigger("change");
        //iOS 8.02 changed behavior on autofocus, should probably check other mobile devices too
        if (sbConfig.afs == "yes" && !/(iPad|iPhone|iPod)/g.test(navigator.userAgent) ){ 
            window.setTimeout(function(){
                try{
                    var size= originalTerm.length;
                    if (size == 0 || /\s$/.test(originalTerm))
                        theSearchInput.focus()[0].setSelectionRange(size, size);
                    else
                        theSearchInput.focus().val(originalTerm + " ")[0].setSelectionRange(size+1, size+1);
                }
                catch(e){} //setSelectionRange not defined in IE8
            },1);
        }
        
        //set the query changed flag true after a few seconds, still prevents scripted clicking or stuck enter key
        window.setTimeout(function(){$.ncbi.searchbar.setSearchModified();},2000);
         
     });//End of DOM Ready

})(jQuery);

/*
a call back for the 'Turn off' link at the bottom of the auto complete list
*/
function NcbiSearchBarAutoComplCtrl(){
    jQuery("#term").ncbiautocomplete("turnOff",true);
    if (typeof(NcbiSearchBarSaveAutoCompState) == 'function')
        NcbiSearchBarSaveAutoCompState();
 }

 



;
(function ($){
    
    $.fn.waitUntilExists    = function (callback) {
        var selector = this.selector;
        var interval = window.setInterval(function () { 
            var found= $(selector);
            if (found.size() < 1)
            {
                return;
            }
            
            window.clearInterval(interval);
            found.each(callback);
        }, 10);
        
        return $(this.selector);
    }
    
    $('#pubmed_favoritesad').waitUntilExists(function () {
        
        /*JSL-1460: Temporary fix before JIG 1.12 is out*/
        $('#pubmed_favoritesad .ui-ncbisetswitch').addClass('ltd-hover');
        
        //Check if article is favorite
        checkFavStatus();
        
        //When drop-down arrow is clicked
        jQuery("#pubmed_favoritesad .ui-ncbisetswitch-button").live('click',function(){
            //console.log('fav down arrow clicked.');
            var link = this;
            jQuery.ui.jig.requiresLoginURL = "/account/signin/?inlinelogin=true&p$debugoutput=off";
            jQuery.ui.jig.requiresLogin( function(name, requiredLogin ){ 
                LoginCallBack(name, requiredLogin);
                
                //Fetch list of collections
                if(jQuery("#pubmed_favoritesad").hasClass('empty')){
                    try{
                        checkFavStatus();
                        jQuery("div.colloading").show();
                        fetchFavContent(link);
                    }catch(err){
                        console.log(err);
                    }
                }
            });
            
        });
        
        //Event handler for "create collection" link, using "send to" menu
        jQuery("#pubmed_favoritesad .ui-ncbisetswitch-create-collection").on('click', function(){
            jQuery("#dest_AddToCollections").click();
            jQuery("#submenu_AddToCollections .button_apply").click();
        });
        
        //Event handler for click on Favorite/Collection
        jQuery(".collink").on('click', function(event){
            toggleItem(event);
        });
        
        //Event handler repeated - why?
        //for the first click is missed otherwise
        jQuery(".collink").live('click', function(event){
            toggleItem(event);
        });
    });//end initFavorites


    function getAjaxUrl(actionName,IdsFromResult){
        var db = $('#pubmed_favoritesad').data('db') || 'pubmed',
            ajaxUrl = '/pubmed/?p$l=AjaxServer';
            
        ajaxUrl = ajaxUrl + '&p$rq=AjaxServer.DiscoAdC.DiscoSectionCol.Pubmed_FavoritesAdHelper:' + actionName + '&Db='+db;
        return ajaxUrl + (IdsFromResult ? '&IdsFromResult=' + IdsFromResult : '');
    }
    
    function makeAjaxCall(url,data,async){
        async = (typeof async == 'undefined') ? true : async;
        return $.ajax({
            url:url,
            timeout:10000,
            type:'POST',
            dataType:'html',
            async:async,
            data:data
        });
    }
    
    function checkFavStatus(){
        if(($("#myncbiusername").text() != '') && ($("#favList").hasClass('blind'))){
            var ajaxUrl = getAjaxUrl('FetchFav_XHR',$("#absid").val());
            var ajaxCall = makeAjaxCall(ajaxUrl,{},false);
           ajaxCall.done( function(data){
                try{
                    fetchFavResponder(eval('(' + data + ')'));
               }catch(e){
                   console.log(e);
               }
            });//end ajaxCall.done
        }
    }//end chechFavStatus
    
    function fetchFavResponder(JSONobj){
        if((JSONobj.mid == '') || (JSONobj.mid == '0')){
            return; 
        }
        
        if((($("#favList").attr('colid')=== undefined) || ($("#favList").attr('colid') == ''))
        && JSONobj.favid != ''){
            jQuery("#favList").attr('colid', JSONobj.favid);
        }
        
        if((JSONobj.status != undefined) && (JSONobj.status != '')){
            if(JSONobj.status == 'present'){
                jQuery('#favList').html(jQuery('#favList').html().replace('Add to Favorites', 'Favorite'));
                jQuery('#favList span.star').addClass('active');
            }else{
                if(jQuery('#favList').text().indexOf('Add to Favorites') == -1)
                    jQuery('#favList').html(jQuery('#favList').html().replace('Favorite', 'Add to Favorites'));
                jQuery('#favList span.star').removeClass('active');
            }
            jQuery("#favList").removeClass('blind');
        }    
    }//end fetchFavResponder
    
    //callback function for JIG login
    function LoginCallBack(name,requiredLogin){
    }
    
    function fetchFavContent(link){
        var ajaxUrl = getAjaxUrl('Favorites_FetchContent_XHR',$("#absid").val());
        
        function ajaxDoneC(_link){
            return function (data){
                try{
                    fetchFavContentResponder(eval('(' + data + ')'),_link);
               }catch(e){
                   console.log(e);
               }
            }
        }
       
        var ajaxCall = makeAjaxCall(ajaxUrl);
       ajaxCall.done(
          ajaxDoneC(link)
        );//end ajaxCall.done
        
        ajaxCall.always(function(){
           $("div.colloading").hide(); 
        });
        
    }//end fetchFavContent
    
    function fetchFavContentResponder(JSONobj,link){
    try{
        if((JSONobj.mid == '') || (JSONobj.mid == '0')){
	            //alert("Looks like you are not logged in. \nPlease refresh the page and try again.");
	            loginagain();
	            jQuery("div.colloading").hide();
	            jQuery(link).click();
	            return; 
	        }
	        if(JSONobj.content && JSONobj.content != ''){
                jQuery("#favUL").prepend(JSONobj.content);
                jQuery("#pubmed_favoritesad").removeClass('empty');
		    }
		    jQuery("div.colloading").hide();
		    
		    //For favorites collection
	        if((JSONobj.status != undefined) && (JSONobj.status != '')){
	            if(JSONobj.status == 'present'){
	                jQuery('#favList').html(jQuery('#favList').html().replace('Add to Favorites', 'Favorite'));
    	            jQuery('#favList span.star').addClass('active');
    	            jQuery('#favUL li.favorite').addClass('starred');
    	        }else if(JSONobj.status == 'absent'){
    	            if(jQuery('#favList').text().indexOf('Add to Favorites') == -1)
    	                jQuery('#favList').html(jQuery('#favList').html().replace('Favorite', 'Add to Favorites'));
    	            jQuery('#favList span.star').removeClass('active');
    	            jQuery('#favUL li.favorite').removeClass('starred');
    	        }
    	        jQuery("#favList").removeClass('blind');
	        }
	        
	        //JSL-1762 - Add pinger click event for Favorites pull-down
            function starredSet() { 
                var link = jQuery(this); 
                var isBeingSelected = !link.parent().hasClass("starred");
                link.attr("ref", "star=" + isBeingSelected );
            } 
            jQuery("#favUL a").click(starredSet); 
            
	        var theLinks = jQuery("#favUL")[0].getElementsByTagName("a");
            if(typeof ncbi !== "undefined" && typeof ncbi.sg  !== "undefined" && typeof ncbi.sg.scanLinks !== "undefined" ){
                 ncbi.sg.scanLinks( Array.prototype.slice.call(theLinks,0));
            } 
            
        }catch(error){
            console.log(error);
            jQuery("div.colloading").hide();
	    } 
    }//end fetchFavContentResponder
    
    function loginagain(){
        jQuery("#myncbiusername").hide().find("#mnu").text(''); 
	    jQuery("#sign_in").show();
	    jQuery("#sign_out").hide();
    }
    
    function toggleItem(event){
        event.preventDefault();
        //console.log('toggleItem');
        var link = $(event.target);
        var colname = link.text();
        var colid = link.attr('colid');
        if(colid == '') 
            colid = jQuery("#favList").attr('colid');
        jQuery.ui.jig.requiresLoginURL = "/account/signin/?inlinelogin=true&p$debugoutput=off";
        jQuery.ui.jig.requiresLogin( function(name, requiredLogin ){ 
	        LoginCallBack(name, requiredLogin);
	        
            //Fetch list of collections
            checkFavStatus();
            try{
                var ajaxUrl = getAjaxUrl('Toggle_XHR');
                
                var firstAuthor = jQuery("#maincontent .abstract .auths a")[0];
                var title = jQuery("#maincontent .abstract h1")[0];
                
                var ajaxDoneC = (function (_link){
                    return function (data){
                        try{
                            toggleResponder(eval('(' + data + ')'),_link);
                       }catch(e){
                           console.log(e);
                       }
                    }
                })(link);
                
                var ajaxCall = makeAjaxCall(ajaxUrl,{
                        'IdsFromResult' : jQuery("#absid").val(),
                        'Title': jQuery(title).text(),
                        'Author': jQuery(firstAuthor).text(),
                        'Date': jQuery("#absdate").val(),
                        'ColId': colid
                    });
               ajaxCall.done(
                  ajaxDoneC
                );//end ajaxCall.done
                
                ajaxCall.fail(function(){
                    ajaxFailC(link)
                });
                function ajaxFailC(_link){
                    return function(){
                        _link.addClass('collink');
                    }
                }
            }catch(err){
                console.log(err);
                link.addClass('collink');
            }
	    });
        
    }
    
    function toggleResponder(JSONobj, link){
	     try{
	        if((JSONobj.mid == '') || (JSONobj.mid == '0')){
	            //alert("Looks like you are not logged in. \nPlease refresh the page and try again.");
	            link.addClass('collink');
	            loginagain();
	            link.click();
	            return; 
	        }
	        
	        //For favorites collection
	        if((JSONobj.status != undefined) && (JSONobj.status != '') && 
	          (link.attr('colid') == jQuery("#favList").attr('colid'))){
	            if(JSONobj.status == 'added'){
	                jQuery('#favList').html(jQuery('#favList').html().replace('Add to Favorites', 'Favorite'));
    	            jQuery('#favList span.star').addClass('active');
    	            jQuery('#favUL li.favorite').addClass('starred');
    	        }else if(JSONobj.status == 'removed'){
	                if(jQuery('#favList').text().indexOf('Add to Favorites') == -1)
    	                jQuery('#favList').html(jQuery('#favList').html().replace('Favorite', 'Add to Favorites'));
    	            jQuery('#favList span.star').removeClass('active');
    	            jQuery('#favUL li.favorite').removeClass('starred');
    	        }
    	        jQuery("#favList").removeClass('blind');
	        }
	        //For other collections
	        else if (JSONobj.status != ''){
	            if(JSONobj.status == 'added')
    	            link.parent().addClass('starred');
    	        else if(JSONobj.status == 'removed')
    	            link.parent().removeClass('starred');
	        } 
	        //if no status is returned (smth's wrong)
	        else {
	            //console.log("no status returned");
	            //set the star back to original status
	            //if(uargs.colname == 'Favorites'){
	            if(link.text() == 'Favorites'){
    	            if(jQuery('#favList span.star').hasClass('active')){
    	                if(jQuery('#favList').text().indexOf('Add to Favorites') == -1)
        	                jQuery('#favList').html(jQuery('#favList').html().replace('Favorite', 'Add to Favorites'));
    	                jQuery('#favList span.star').removeClass('active');
    	            }else{
    	                jQuery('#favList').html(jQuery('#favList').html().replace('Add to Favorites', 'Favorite'));
    	                jQuery('#favList span.star').addClass('active')
    	            }
    	        }
	        }
		    link.addClass('collink');
	    }catch(error){
	        console.log(error);
	        link.addClass('collink');
	    }
	}

    
})(jQuery);




;
jQuery(function($) {
    $('div.portlet, div.section').each(function() {
        PageSectionInit(this);
    });
});    
    
function PageSectionInit(element) {
    var post_url = '/myncbi/session-state/',
        $ = jQuery,
        self = $(element),
        anchor = self.find('a.portlet_shutter'),
        content = self.find('div.portlet_content, div.sensor_content');

    // we need an id on the body, make one if it doesn't exist already
    // then set toggles attr on anchor to point to body
    var id = content.attr('id') || $.ui.jig._generateId('portlet_content');
    
    // Check if attribute is present
    if (anchor.attr('toggles'))
    {
        // Already initialized
        return;
    }
    
    anchor.attr('toggles', id);
    content.attr('id', id);

    // initialize jig toggler with proper configs, then remove some classes that interfere with 
    // presentation
    var togglerOpen = anchor.hasClass('shutter_closed')  ?  false  :  true; 

    anchor.ncbitoggler({
        isIcon: false,
        initOpen: togglerOpen 
    })
        .removeClass('ui-ncbitoggler-no-icon')
        .removeClass('ui-widget');

    // get rid of ncbitoggler css props that interfere with portlet styling, this is hack
    // we should change how this works for next jig release
    anchor.css('position', 'absolute')
        .css('padding', 0 );

    // trigger an event with the id of the node when closed
    anchor.bind( 'ncbitogglerclose', function() {
        anchor.addClass('shutter_closed');
        
        $.post(post_url, { section_name: anchor.attr('pgsec_name'), new_section_state: 'true' });
    });

    anchor.bind('ncbitoggleropen', function() {
        anchor.removeClass('shutter_closed');
        $.post(post_url, { section_name: anchor.attr('pgsec_name'), new_section_state: 'false' });
    });

    /* Popper for brieflink */
    self.find('li.brieflinkpopper').each( function(){
        var $this = $( this );
        var popper = $this.find('a.brieflinkpopperctrl') ;
        var popnode = $this.find('div.brieflinkpop');
        var popid = popnode.attr('id') || $.ui.jig._generateId('brieflinkpop');
        popnode.attr('id', popid);
        popper.ncbipopper({
            destSelector: "#" + popid,
            destPosition: 'top right', 
            triggerPosition: 'middle left', 
            hasArrow: true, 
            arrowDirection: 'right',
            isTriggerElementCloseClick: false,
            adjustFit: 'none',
            openAnimation: 'none',
            closeAnimation: 'none',
            delayTimeout : 130
        });
    });    
        
} // end each loop

;
(function( $ ){ // pass in $ to self exec anon fn
    // on page ready
    $( function() {
    
        // Initialize popper
        $('li.ralinkpopper').each( function(){
            var $this = $( this );
            var popper = $this;
            var popnode = $this.find('div.ralinkpop');
            var popid = popnode.attr('id') || $.ui.jig._generateId('ralinkpop');
            popnode.attr('id', popid);
            popper.ncbipopper({
                destSelector: "#" + popid,
                destPosition: 'top right', 
                triggerPosition: 'middle left', 
                hasArrow: true, 
                arrowDirection: 'right',
                isTriggerElementCloseClick: false,
                adjustFit: 'none',
                openAnimation: 'none',
                closeAnimation: 'none',
                delayTimeout : 130
            });
        }); // end each loop
        
    });// end on page ready

})( jQuery );


function historyDisplayState(cmd)
{
    var post_url = '/myncbi/session-state/';

    if (cmd == 'ClearHT')
    {
        if (!confirm('Are you sure you want to delete all your saved Recent Activity?'))
        {
            return;
        }
    }

    var ajax_request = jQuery.post(post_url, { history_display_state: cmd })
        .complete(function(jqXHR, textStatus) {    
        
            var htdisplay = jQuery('#HTDisplay');
            var ul = jQuery('#activity');

            if (cmd == 'HTOn') 
            { 
                // so that the following msg will show up
                htdisplay.removeClass();
                
                if (jqXHR.status == 408) 
                { 
                    htdisplay.html("<p class='HTOn'>Your browsing activity is temporarily unavailable.</p>");
                    return;
                }
                
                if (htdisplay.find('#activity li').length > 0)
                {
                    ul.removeClass('hide');    
                }
                else
                {
                    htdisplay.addClass('HTOn');
                }
                
            }         
            else if (cmd == 'HTOff') 
            {                         
                ul.addClass('hide'); 
                htdisplay.removeClass().addClass('HTOff');    // make "Activity recording is turned off." and the turnOn link show up             
            }
            else if (cmd == 'ClearHT') 
            { 
                if (htdisplay.attr('class') == '') 
                {                 
                    htdisplay.addClass('HTOn');  // show "Your browsing activity is empty." message                                  

                    ul.removeClass().addClass('hide'); 
                    ul.html('');
                }
            } 
        });

}


;
jQuery(function($) {
    DiscoveryColumnAjaxLoader('/pmc/discovery/', '#ajax-portlets');    
});

function DiscoveryColumnAjaxLoader(url, target)
{
    var $ = jQuery,
        loading_indicator = '/portal/portal3rc.fcgi/4018218/img/3631476',
        container = $(target);
        
    container
        .html('<img src="'+loading_indicator+'" align="absmiddle" alt="Loading..."/> Loading portlets...')
        .load(url, container.data(), function(response, status, xhr) {

            if (status == "error") 
            {
                container.html("");
                return;
            }
            
            // Once loaded
            
            container.find('div.portlet').each(function() {
                PageSectionInit(this);
            });
            
            jQuery.ui.jig.scan(this);
            
            // @TODO make sections collapsible
            
            CitedRefBlocks();
            
            
        });   
            
}

