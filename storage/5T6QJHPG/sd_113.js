// Lazy Loader
jQuery.fn.lazyLoad = function( cfg ){

    // Internal function used to implement `_.throttle` and `_.debounce`.
    var limit = function(func, wait, debounce) {
        var timeout;
        return function() {
          var context = this, args = arguments;
          var throttler = function() {
            timeout = null;
            func.apply(context, args);
          };
          if (debounce) clearTimeout(timeout);
          if (debounce || !timeout) timeout = setTimeout(throttler, wait);
        };
    };
    
    var plugin = {
      objs:[],
      buffer: cfg.buffer?cfg.buffer:50, // 50 pixels by default
      batchSize: cfg.batchSize?cfg.batchSize:1, // 1 is the default batch size.
      callback: cfg.intoView?cfg.intoView:function(obj,idx){},
      screenTop: $(window).scrollTop(),
      screenHeight:$(window).height(),
      debounce: function(func, wait) { return limit(func, wait, true); },      
      calculateView: function(){
  
        if( plugin.applyPatch() ){ // patch for IE
            plugin.buffer += 500;
            plugin.screenTop = $( "html" ).scrollTop() - plugin.buffer;
        }else{
            plugin.screenTop = $( window ).scrollTop() - plugin.buffer;
        }
        var screenBot = plugin.screenTop + $(window).height() + plugin.buffer;
        var batch = [];
        var objs = [];
        $.each( plugin.objs, function(){
                
          if( this.top > plugin.screenTop &&
              this.top < screenBot ){                        
            batch.push( this );            
            if( plugin.batchSize == 1 ){            
              plugin.callback( batch );
              batch = [];
            }else{              
              if( batch.length == plugin.batchSize ){
                plugin.callback( batch ); // call callback to handle batch.
                batch = []; // clear the batch and start collecting again.
              }
            }
          }else{
            objs.push( this );
          }          
        });       
        if( batch ){ plugin.callback( batch ); } // run any remainder in batch
        plugin.objs = objs;
      },
      loadAll:function(){
          
          //if( plugin.batchSize==1){ // batch is default so load all items.
              plugin.callback( plugin.objs );    
          //}else{ // use the specified batchsize to load all elements.
            //  for( var i=0;i<plugin.objs.length;i++){
            //    plugin.callback(  plugin.objs.slice(i, plugin.batchSize)  );
           //   }
          //}
                  
      },
      loadOne:function(id){
        if (id > 0){
           plugin.callback( plugin.objs,id); 
        }
      },
      applyPatch:function(){
          return ($.browser.msie && $.browser.version < 9)
      }
    }
    
    var elements = this;    
    $.each( elements, function(){
       if( plugin.applyPatch() ){ // patch IE     
           var top = this.offsetTop;
           //alert( "IE top: " + top );
           plugin.objs.push({"top":top,"el":this});    
       }else{
           //alert( "Other tops: " + $(this).offset().top ) ;
           plugin.objs.push({"top":$(this).offset().top,"el":this});
       }
       
    });
    
    // clean up signal to eliminate noise
    var lazyResize = plugin.debounce(plugin.calculateView,300);
   
    // clean up signal to eliminate noise
    var lazyScroll = plugin.debounce(plugin.calculateView, 300);
    
    $(window).resize( lazyResize );
    $(window).scroll( lazyScroll );
    
    plugin.calculateView();
    
    return plugin;
}  

// end of Lazy Loader

var LoginBox = {
  getStyleObj: function(elem,parent) {
    if (document.layers) {
      if (parent) {return "document."+parent+".document."+elem;}
      else { return "document."+elem + ".style";}
    }
    else if (document.all) {return "document.all."+elem + ".style";}
    else if (document.getElementById) {return "document.getElementById('"+elem+"').style";}
  },
  flipLogin: function (e,button){
    var t = eval(LoginBox.getStyleObj(e));
    var u = document.getElementById("loginPlus");
    var v = document.getElementById("userPlus");
    var userbox = document.getElementById("userBox");
    var j = document.getElementById("loginPlusScript");
    if(button == null){
      if (t.display=="none"){
        t.display = 'block';
        j.className = 'minus';
      }
      else{
        t.display = 'none';
        j.className = 'plus';
      }
    }
    else if (button == "userPlus" ) {
      if (t.display=="none" ){
        t.display = 'block';
        v.className = 'userMinus';
      }
      else{
        t.display = 'none';
        v.className = 'userPlus';
      }
    }
    else{
      if (t.display=="none" ){
        t.display = 'block';
        userbox.style.display ='none';
        v.className = 'userPlus';
      }
      else{
        t.display = 'none';
      }
    }
  }
}//LoginBox

var SubscriptionSummary = {
  init: function() {
    $(".popupSummary").click(function(event) {
      var t = $(event.currentTarget);
      openSummary(t.attr("summaryURL"),
                  event,
                  t.attr("summaryImgName"));
    });
  }
} //SubscriptionSummary
$(document).ready(function() {SubscriptionSummary.init();});

//BEGIN subscriptionSummary.html
function findPosX(obj) {
  var curLeft = 0;
  if(obj.offsetParent) {
    while(1) {
      curLeft += obj.offsetLeft;
      if(!obj.offsetParent) { break; }
      obj = obj.offsetParent;
    }  
  }
  else if(obj.x) {
    curLeft += obj.x;
  }
  return curLeft;
}

function openSummary(url, event, imgId) {
  var subDiv = document.getElementById("subscriptionSummary");
  if(subDiv) {
    subDiv.innerHTML = '<b>LOADING....<\/b>';
    $("#subscriptionSummary").load(url);
    subDiv.style.position = "absolute";

    var imgIcon = document.getElementById(imgId);
    var offset = $("#"+imgId).offset();
    subDiv.style.display = "block";
    subDiv.style.top = (offset.top + 10) + 'px';
    subDiv.style.left = (offset.left - 310) + 'px';
    if(BrowserDetect.browser =="Explorer"){
          if(BrowserDetect.version == "6"){
              subDiv.style.left = (offset.left -320) + 'px';
          }
    }
  }
}

function closeSummary() {
  var subDiv = document.getElementById("subscriptionSummary");
  if(subDiv) {
    subDiv.style.display = "none";
  }
}

var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
        this.version = this.searchVersion(navigator.userAgent)
            || this.searchVersion(navigator.appVersion)
            || "an unknown version";
        this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
        for (var i=0;i<data.length;i++)    {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
                if (dataString.indexOf(data[i].subString) != -1)
                    return data[i].identity;
            }
            else if (dataProp)
                return data[i].identity;
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },
  dataBrowser: [
    { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
    {    string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb" },
    { string: navigator.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version" },
    { prop: window.opera, identity: "Opera" },
    { string: navigator.vendor, subString: "iCab", identity: "iCab" },
    { string: navigator.vendor, subString: "KDE", identity: "Konqueror"    },
    { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
    { string: navigator.vendor, subString: "Camino", identity: "Camino" },
    // for newer Netscapes (6+)
    {    string: navigator.userAgent, subString: "Netscape", identity: "Netscape" },
    { string: navigator.userAgent, subString: "MSIE", identity: "Explorer", versionSearch: "MSIE" },
    { string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv" },
    // for older Netscapes (4-)
    { string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla" }
    ],
    dataOS : [
    { string: navigator.platform, subString: "Win", identity: "Windows" },
    { string: navigator.platform, subString: "Mac", identity: "Mac" },
    { string: navigator.userAgent, subString: "iPhone", identity: "iPhone/iPod" },
    { string: navigator.platform, subString: "Linux", identity: "Linux" }
  ]
};
BrowserDetect.init();
//END subscriptionSummary.html

//START bottom.js
//Auto complete in quicksearch
function sortInit() {
  var navBox = jQuery("#navBox");
//  navBox.children().css("cursor", "move");
  navBox.sortable({ axis: "y",
                    opacity: 0.6
                 });
  navBox.disableSelection();
  navBox.bind("sortstop", function(event,ui) {
    var url = SD_SORTURL + "?" + navBox.sortable("serialize");
    jQuery.get(url);
  });
}
///////////////////////////
var QuickSearch = {
  getElementsByClassName: function(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
      oElement = arrElements[i];
      if(oRegExp.test(oElement.className)){
        arrReturnElements.push(oElement);
      }
    }
    return (arrReturnElements);
  }, //getElementsByClassName

  clearQSForm: function() {
    document.qkSrch.qs_tak.value="";
    document.qkSrch.qs_author.value="";
    document.qkSrch.qs_title.value="";
    document.qkSrch.qs_vol.value="";
    document.qkSrch.qs_issue.value="";
    document.qkSrch.qs_pages.value="";
  }, //clearQSForm

  changeFields: function(event) {
    var quckSrch = QuickSearch.getElementsByClassName(document, 'td', 'toggleQukSrch');
    if(event.currentTarget.value == "i") {
      jQuery(".toggleQukSrch").css('display', 'none');
      document.getElementById("fieldLabel").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;Images";
      document.getElementById("qs_all").title = "e.g. figures, tables, videos etc";
      if (document.getElementById("qs_all").value == "") {
        document.getElementById("qs_all").value = "e.g. figures, tables, videos etc";
        document.getElementById("qs_all").style.color ="#9b9b9b";
      }
      document.getElementById("volField").style.display = "none";
      document.getElementById("qs_vol").style.display = "none";
      document.getElementById("issueField").style.display = "none";
      document.getElementById("qs_issue").style.display = "none";
      document.getElementById("pageField").style.display = "none";
      document.getElementById("qs_pages").style.display = "none";
      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
        document.getElementById("submit_search").style.marginLeft = "7px";
      }
    }
    else {
      jQuery(".toggleQukSrch").css('display', '');
      document.getElementById("fieldLabel").innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;All Fields";
      document.getElementById("qs_all").title = "For Example. Heart Attack and Behaviour";
      if (document.getElementById("qs_all").value == "e.g. figures, tables, videos etc") {
        document.getElementById("qs_all").value = ""; 
        document.getElementById("qs_all").style.color ="#000000";
      }
      document.getElementById("volField").style.display = "";
      document.getElementById("qs_vol").style.display = "";
      document.getElementById("issueField").style.display = "";
      document.getElementById("qs_issue").style.display = "";
      document.getElementById("pageField").style.display = "";
      document.getElementById("qs_pages").style.display = "";
      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
        document.getElementById("submit_search").style.marginLeft = "14px";
      }
    }
  }, //changeFields

  clearValues: function() {
    if (document.getElementById("Images").checked ==  true) {
        if (document.getElementById("qs_all").value == "e.g. figures, tables, videos etc") {
            document.getElementById("qs_all").value = "";
            document.getElementById("qs_all").style.color ="#000000";
        }
    }
  }, //clearValues

  setValues: function() {
    if (document.getElementById("Images").checked ==  true) { 
      if (document.getElementById("qs_all").value == "") {
        document.getElementById("qs_all").value = "e.g. figures, tables, videos etc";
        document.getElementById("qs_all").style.color ="#9b9b9b";
      }
    }
  } //setValues
}; //QuickSearch
////////////////////////////


function autoCompleteInit() {
  jQuery(document).ready(function() {sdAutoComplete('qs_title','qsPub_autoComp','/' + SD_URL_QUALIFIER + '/jfind/auto');});
}

function sdAutoComplete(inputField, outputField, serviceURL) {
  jQuery(".qsRadio").click(QuickSearch.changeFields);
  jQuery(".qsImgBlurFocus").blur(QuickSearch.setValues);
  jQuery(".qsImgBlurFocus").focus(QuickSearch.clearValues);

//  jQuery(".qsRadio").each(function() { $(this).click(QuickSearch.changeFields);});
  $( "#" + inputField ).autocomplete(
    { 
      minLength:2,
      source: function(req,resp) {
        $.post(serviceURL,{ qs_title:req.term }, function(data){
          var list = []
          $(data).find("li").each(function(i,e){ list.push({ label:$(e).text() });});
          resp( list );
        })
      },
      open: function(event, ui) { $("ul.ui-autocomplete").css("z-index", 101); }
    });
}
              
function ccAutoComplete(inputField, outputField, validCostCodes) {
  $("#"+inputField).autocomplete({
    minLength:2,
    source:validCostCodes
  });

  //var costcode_list = new Autocompleter.Local(inputField,outputField,validCostCodes,{ minChars:2, partialSearch:false }) 
}

function openNS(url, width, height) {
    if ((navigator.appName == "Microsoft Internet Explorer") &&
        (parseFloat(navigator.appVersion) < 4 ))
    {
        return false;
    }
     
    if (!width) var width = 600;
    if (!height) var height = 400;

    var newX=width,newY=height,xOffset=10,yOffset=10;
    var parms = 'width=' + newX +
            ',height=' + newY +
            ',screenX='+ xOffset +
            ',screenY=' + yOffset +
            ',status=yes,toolbar=yes,menubar=yes' +
            ',scrollbars=yes,resizable=yes,location=yes';
    nsWin = window.open(url,'displayWindow',parms);
    nsWin.focus();
    return false;
}
var figCaption;
function openStrippedNS(url, figElem) {
    if ((navigator.appName == "Microsoft Internet Explorer") &&
        (parseFloat(navigator.appVersion) < 4 ))
    {
        return false;
    }

    var ih = document.getElementById(figElem);

    var xOffset=25,yOffset=25;
    var parms = 'left='+ xOffset +
            ',top=' + yOffset +
            ',status=yes,toolbar=no,menubar=no' +
            ',scrollbars=yes,resizable=yes,location=no';
             if(ih != null )
			 {
			   figCaption = ih.innerHTML;
             }
			 else {
			        figCaption = "";
				  } 
    nsWin = window.open(url,'displayWindow',parms);
    nsWin.focus();

    return false;
}


function openPopup(url, windowName, width, height) {
  if ((navigator.appName == "Microsoft Internet Explorer") &&
    (parseFloat(navigator.appVersion) < 4 )) { return false; }
     
  var xOffset=25,yOffset=25;
  var parms = 'width=' + width +
        ',height=' + height +
        ',left=' + xOffset +
        ',top=' + yOffset +
        ',status=no,toolbar=no,menubar=no' +
        ',scrollbars=yes,resizable=yes';
  var displayName = windowName;

  nsWin = window.open(url, displayName, parms);
  nsWin.focus();
  return false;
}

function openTableWindow(tabledivId){
 var tbltada;
 tbltada = document.getElementById(tabledivId).innerHTML;
 openTable(tbltada)
}
function openTable(data){
    if ((navigator.appName == "Microsoft Internet Explorer") &&
        (parseFloat(navigator.appVersion) < 4 ))
    {
        return false;
    }

    var xOffset=25,yOffset=25;
    var parms = 'left='+ xOffset +
            ',top=' + yOffset +
            ',status=yes,toolbar=no,menubar=no' +
            ',scrollbars=yes,resizable=yes,location=no';
    nsWin = window.open('','displayWindow',parms);
        var dataRep = trimCaptionText(data);

    nsWin.document.writeln(dataRep);
    nsWin.focus();
    return false;
}

function checkAd(adDiv) {
  var imgChildren = adDiv.find("img");
  var count = imgChildren.length;
  for(var c=0; c<count; c++) {
    var cc = imgChildren[c].attributes["height"];
    if(imgChildren[c].height > 1 && imgChildren[c].width > 1) {
      return true;
    }
  }
  var objChildren = adDiv.find("object");
  if(objChildren.length > 0) {
    return true;
  }
  var embedChildren = adDiv.find("embed");
  if(embedChildren.length > 0) {
    return true;
  }
  return false;
}

function monitorAd(adLocation, adHold, ad) {
  var totalTime = 5000;
  var checkTime = 1000;
  var foundAd = false;
  var checkCount = 1;
  
  var doCheck = function() {
    if(foundAd==true) {
      checkCount = totalTime/checkTime + 1;
      return;
    }
    else {
      foundAd = checkAd(ad);
    }
    
    if(checkCount*checkTime <= totalTime && foundAd==false) {
      checkCount++;
      setTimeout(doCheck, checkTime);
    }
  }
  doCheck();

  if(foundAd == true) {
    var locationElement = document.getElementById(adLocation);
    var holdingElement = document.getElementById(adHold);
    if(locationElement && holdingElement) {
      locationElement.appendChild(holdingElement);
      holdingElement.style.display='inline';
    }
  }
  else {
  }
  
}

var Ads = {
  init: function() {
    $(document).ready(function() {displayAds();});
  }
};


function displayAds2() {
  var l = jQuery("#leaderboard2");
  var s = jQuery("#skyscraper2");
  var b = jQuery("#boombox2");
  if(l.length == 1) { monitorAd("leaderboard", "leaderboard2", l); }
  if(s.length == 1) { monitorAd("skyscraper", "skyscraper2", s); }
  if(b.length == 1) { monitorAd("boombox", "boombox2", b); }
}

function displayAds() {
  var lbZone = document.getElementById('leaderboard');
  var lbContent = document.getElementById('leaderboard2');
  if(lbZone && lbContent) {
    lbZone.appendChild(lbContent);
    lbContent.style.display='inline';
  }
  var skyZone = document.getElementById('skyscraper');
  var skyContent = document.getElementById('skyscraper2');
  if(skyZone && skyContent) {
    skyZone.appendChild(skyContent);
    skyContent.style.display='inline';
  }
  var boomZone = document.getElementById('boombox');
  var boomContent = document.getElementById('boombox2');
  if(boomZone && boomContent) {
    boomZone.appendChild(boomContent);
    boomContent.style.display='inline';
  } 
}
//START bottom.js

//START article.js

//infoBubble.js
var OPAC = 0;
var frameWidth = 10;
var textboxFig = 0;
var InfoBubble = {

//  typeVals:["Art", "Ref", "Cited"],
  typeVals:["Art", "Ref"],
  bubblesArtFilled:0,
  bubblesRefFilled:0,
  bubblesCiteFilled:1,
  bubbleTimeout: 1000,
  bubbleShowDelay: 300,
  currentBubble: null,
  currentLink: null,
  showTimerID: null,
  hideTimerID: null,

  init: function() {
    jQuery('#mlktArt .mlktContentBody').prepend("<div id='mlktArtListBubbles'></div>");
    jQuery('#mlktRef .mlktContentBody').prepend("<div id='mlktRefListBubbles'></div>");
    jQuery('#mlktCited .mlktContentBody').prepend("<div id='mlktCitedListBubbles'></div>");
    for(var typeIndex=0; typeIndex<InfoBubble.typeVals.length; typeIndex++) {
      var typeVal = InfoBubble.typeVals[typeIndex];
      var tdIndex = 1;
      var td = jQuery('#mlkt'+typeVal+'TD_' + tdIndex);
      jQuery('td[id^=mlkt'+typeVal+'TD_]').each(function(i,e) {
        $(e).bind('mouseover', {tv:typeVal, ti:i+1}, function(event) {
          InfoBubble.get(SD_PII, event.data.tv, event.data.ti);
        });
        $(e).mouseout(function() {
          InfoBubble.timeout();
        });
      });
    }
  }, //init

  get: function(pii, typeVal, bubbleNum) {
    if(typeVal == "Art" && InfoBubble.bubblesArtFilled == 1) {
      InfoBubble.show('infoBubbleArt_'+bubbleNum, 'mlktLinkArt_'+bubbleNum);
      return;
    }
    else if(typeVal == "Ref" && InfoBubble.bubblesRefFilled == 1) {
      InfoBubble.show('infoBubbleRef_'+bubbleNum, 'mlktLinkRef_'+bubbleNum);
      return;
    }
    else if(typeVal == "Cite" && InfoBubble.bubblesCiteFilled == 1) {
      InfoBubble.show('infoBubbleCite_'+bubbleNum, 'mlktLinkCite_'+bubbleNum);
      return;
    }
    if(typeVal == "Art") { InfoBubble.bubblesArtFilled = 1; }
    if(typeVal == "Ref") { InfoBubble.bubblesRefFilled = 1; }
    if(typeVal == "Cite") { InfoBubble.bubblesCiteFilled = 1; }

    var bubbleList = jQuery('#mlkt'+typeVal+'ListBubbles');
    bubbleList.load(
      SD_URL_PREFIX +'/mlkt/bubble/'+SD_PII+'/'+typeVal,
      function() {
            var i=1;
            var infoBubble = jQuery('#infoBubble'+typeVal+'_' + i);
            var iTD = jQuery('#mlkt'+typeVal+'TD_' + i);
            //Move the individual bubbles to the correct link locations
            while(infoBubble.length>0 && iTD.length>0) {
              iTD.append(infoBubble);
              infoBubble = jQuery('#infoBubble'+typeVal+'_' + ++i);
              iTD = jQuery('#mlkt'+typeVal+'TD_' + i);
            }
            
            if(typeVal == "Art") { InfoBubble.bubblesArtFilled = 1; }
            if(typeVal == "Ref") { InfoBubble.bubblesRefFilled = 1; }
            InfoBubble.show('infoBubble'+typeVal+'_'+bubbleNum, 
                            'mlktLink'+typeVal+'_'+bubbleNum);
            bubbleList.remove();
      }
    ); //load
  }, //get

  show:function(bubID, linkID) {
    var delay = function() { 
      InfoBubble.showInner(bubID, linkID);
    };
    clearTimeout(this.hideTimerID);
    this.hideTimerID=null;
    this.showTimerID = setTimeout(delay, this.bubbleShowDelay);
    return;
  },

  showInner: function(aID, bID) {
    var aBubble = jQuery('#'+aID);
    var bLink = jQuery('#'+bID);
    if(aBubble && aBubble.length==1 && aBubble!=this.currentBubble) {
      //Hide currentBubble if there is one
      this.hide(true);

      //Set styling of link and bubble
      bLink.toggleClass("mlktLinkOn mlktLinkOff");
      aBubble.toggleClass("infobubble infobubbleOn");

      //Keep track of the link and bubble
      this.currentBubble = aBubble
      this.currentLink = bLink;
    }

    this.bubbleLaunching = false;
    if(this.hideTimerID) {
      clearTimeout(this.hideTimerID);
      this.hideTimerID = null;
    }
  },

  hide: function(force) {
    if(this.currentBubble && this.currentBubble.length==1) {
    
      //Set styling of link and bubble
      this.currentLink.toggleClass("mlktLinkOn mlktLinkOff");
      this.currentBubble.toggleClass("infobubbleOn infobubble");

      //Clear the link and bubble
      this.currentBubble = null;
      this.currentLink = null;
      
      if(this.hideTimerID) {
        clearTimeout(this.hideTimerID);
        this.hideTimerID = null;
      }
    }
  },

  timeout: function() {
    //This is where the hide really starts
    //Make sure the user stays outside the bubble/link for 1 second
    if(this.hideTimerID) {
      clearTimeout(this.hideTimerID);
      this.hideTimerID=null;
    }
    if(this.showTimerID) {
      clearTimeout(this.showTimerID);
      this.showTimerID=null;
    }
    this.hideTimerID = setTimeout('InfoBubble.hide()', this.bubbleTimeout);
  }

} //InfoBubble


//BEGIN rememberMe.html
//END rememberMe.html

//BEGIN effects.js
function hideModalBox()
{
  document.getElementById("modalBoxDisplay").style.display="none";
};

function setCenterAlign() {
  var msgBox = document.getElementById('modalWindowMsgBox');
  var winWidth = getWindowWidth();
  var winHeight = getWindowHeight();
  var top = (winHeight - msgBox.offsetHeight)/2;
  var left = (winWidth - msgBox.offsetWidth)/2;
  msgBox.style.top = top + 'px';
  msgBox.style.left = left + 'px';
  document.getElementById('modalWindow').style.height = winHeight + "px";
}

function getWindowHeight() {
  var myHeight = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myHeight = window.innerHeight;
  } else if( document.documentElement &&
    ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 6 compatible
    myHeight = document.body.clientHeight;
  }
  return myHeight;
}

function getWindowWidth() {
  var myWidth = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
  }
  else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
  }
  else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
   //IE 6 compatible
   myWidth = document.body.clientWidth;
  }
  return myWidth;
};
//END effects.js

function toggleMLKT(uoi, imgDefault, imgFlip, urlPrefix) {
  var mlktItems = document.getElementById('mlkt');
  if(mlktItems.style.display == "none") {
    var mlktList = document.getElementById('mlktList');
    mlktItems.style.display = '';
    document.getElementById('mlktArrow').src = imgDefault;
    if(mlktList.innerHTML.length == 0) {
      mlktList.innerHTML = '<b>LOADING...</b>';
      $('#mlktList').load( urlPrefix+'/mlkt/2/'+uoi );
    }
    else {
      $.get(urlPrefix+'/mlkt/1');
    }
  }
  else {
    mlktItems.style.display = 'none';
    document.getElementById('mlktArrow').src = imgFlip;
    $.get(urlPrefix+'/mlkt/0');
  }
}

function mlktHover(hoverOver, imgPrefix) {
  var mlktItems = document.getElementById('mlkt');
  var mlktImg = document.getElementById('mlktArrow');
  if(mlktItems.style.display == "none") {
    if(hoverOver == 1) {
      mlktImg.src = imgPrefix + 'btn_arrow_down_on.gif';
    }
    else {
      mlktImg.src = imgPrefix + 'btn_arrow_down_off.gif';
    }
  }
  else {
    if(hoverOver == 1) {
      mlktImg.src = imgPrefix + 'btn_arrow_up_on.gif';
    }
    else {
      mlktImg.src = imgPrefix + 'btn_arrow_up_off.gif';
    }
  }
}
function isNotNumber (o) {
  if (o == -1) {
     return true;
  }
  return isNaN (o-0);
}
function getNumber(str) {
   if(!str) {
      return -1;
   }
   var i=0;
   while(i < str.length) {
      var charat = str.charAt(i);
      if (!isNotNumber(charat)) {
         if (charat != "0") {
           return str.substring(i);
         }
      }
      i++;
   }
}
// referenceBubble.js
var RefPreview = {
  previewTimeout: 1,
  currentPreview: null,
  timeoutPreviewID: null,
  
  init: function() {
    $(".refPreviewAnchor").mouseover(function(event) {
      RefPreview.showRef(event, $(this).attr("refID"), $(this).attr("refCount"));
    });
    $(".refPreviewAnchor").mouseout(function() {RefPreview.hideRef();});
  },
  showRef: function(event, elemId, boxId) {
    var id = -1;
    var target = (event.currentTarget) ? event.currentTarget : event.srcElement;
    if (target.innerHTML) {
       var firtChar = target.innerHTML.charAt(0);
       if (firtChar == "[") {
           id = target.innerHTML.substringBetween("[","]");
           if (isNotNumber(id)) {
              id = getNumber(elemId); 
           }
       } else if (firtChar == "(") {
           id = target.innerHTML.substringBetween("(",")");
           if (isNotNumber(id)) {
              id = getNumber(elemId);
            }
       } else if (!isNotNumber(target.innerHTML)) {
           id = target.innerHTML;
       } else {
           id = getNumber(elemId);
       }
    }
    if (id > 0) {
       lazyRefs.loadOne(id);
    }
    var disableFade = 0;
    if(this.currentPreview) {
      disableFade = 1;
    }
    var refPrev = document.getElementById(boxId);
    var reference = document.getElementById(elemId);
    if(reference == null || reference.innerHTML.length <= 0) { return; }

    if (document.getElementById('refCon') != null) {
      var d = document.getElementById('refCon');
      d.parentNode.removeChild( d );
    }

    var newSpan = document.createElement("span");
    newSpan.setAttribute('id', 'refCon');
    newSpan.innerHTML = reference.innerHTML;
    refPrev.appendChild(newSpan);

    if(refPrev != this.currentPreview) {
      this.hide();
      if(disableFade == 0) {
        refPrev.style.filter = 'alpha(opacity=0)';
        refPrev.style.opacity = 0;
      }
      else {
        refPrev.style.filter = '';
        refPrev.style.opacity = '';
      }
      var x = 0;
      var y = 0;
      var maxX;
      var maxY;

      refPrev.style.position="absolute";
      refPrev.style.display = "block";
      var divX = refPrev.offsetWidth;
      var divY = refPrev.offsetHeight;

      if (document.all && !window.opera) {
        if (document.documentElement && document.documentElement.scrollTop) {
          maxX = document.documentElement.clientWidth + document.documentElement.scrollLeft - divX;
          maxY = document.documentElement.clientHeight + document.documentElement.scrollTop - divY;
          y = event.clientY + document.documentElement.scrollTop - 340;
          x = event.clientX + document.documentElement.scrollLeft + 15;
        }
        else {
          maxX = document.body.clientWidth + document.body.scrollLeft - divX;
          maxY = document.body.clientHeight + document.body.scrollTop - divY;
          y = event.clientY + document.body.scrollTop - 340 ; 
          x = event.clientX + document.body.scrollLeft + 15;
        }
      }
      else {
        maxX = window.innerWidth + window.pageXOffset - divX;
        maxY = window.innerHeight + window.pageYOffset - divY;
        y = event.pageY - 340;
        x = event.pageX + 15;
      }

      if (x > maxX) {
        x = maxX - 25;
      }
      if (y > maxY) {
        y = maxY - 30;
      }

      refPrev.style.top = y + "px";
      refPrev.style.left = x + "px";

      this.currentPreview = refPrev;
      if(disableFade == 0) {
        setTimeout('RefPreview.fadeIn()',100);
        OPAC = 0;
      }
    }

    if(this.timeoutPreviewID) {
      clearTimeout(this.timeoutPreviewID);
    }
  }, //showRef

  hide: function() {
    if(this.currentPreview) {
      this.currentPreview.style.display = 'none';
      this.currentPreview = null;
      if(this.timeoutPreviewID) {
        clearTimeout(this.timeoutPreviewID);
      }
    }
  },

  hideRef: function() {
    if(OPAC == 0) {
      RefPreview.hide();
    }
    else {
      this.timeoutPreviewID = setTimeout('RefPreview.hide()', this.previewTimeout * 2000);
    }
  },

  fadeIn: function() {
    if(this.currentPreview) {
      OPAC = OPAC + .10;
      OPAC = (OPAC>1)?1:OPAC;
      this.currentPreview.style.filter = 'alpha(opacity='+parseInt(100*OPAC)+')';
      this.currentPreview.style.opacity = OPAC;
      if(OPAC<1) {
        setTimeout('RefPreview.fadeIn()',25);
      }
    }
  }
}
$(document).ready(function() {RefPreview.init();});

// resizableImages.js
//_____________  The following arrays are synched with each other...
var resizableImages = new Array();
var resizableImageBaseWidth = new Array();
var resizableImageLinks = new Array();
//_____________ End of synched arrays

var resizableRefsInitilized = 0;
var NaturalWidthSupported = 0;


// RESIZE_CLIENT_ADJUST_PX
//   -- reflects the amount of space for the FAT TAB Inner div
//      and misc margins (...).
var RESIZE_CLIENT_ADJUST_PX = 405;

function setNaturalWidthSupported(inResizableImage) {
  if (inResizableImage.naturalWidth)
  {
    NaturalWidthSupported = 1;
  } else {
    NaturalWidthSupported = 0;
  }
}

function getBaseWidth(inImage) {
  var baseWidth = 0;
  if (inImage.naturalWidth) {
    baseWidth = inImage.naturalWidth;
  }
  else {
    var imageTargetWidth;
    var imgClone = inImage.cloneNode(0);
    inImage.className = '';
    inImage.style.width = 'auto';
    inImage.style.height = 'auto';
    inImage.style.borderWidth = '0';
    inImage.style.padding = '0';
    inImage.removeAttribute('width');
    inImage.removeAttribute('height');
    baseWidth = parseInt(inImage.width);
    if((parseInt(document.body.clientWidth)- RESIZE_CLIENT_ADJUST_PX) <  baseWidth) {
      imageTargetWidth = parseInt(document.body.clientWidth)-RESIZE_CLIENT_ADJUST_PX;
    }
    else {
      imageTargetWidth = baseWidth;
    }
    inImage.setAttribute('width' , '' + imageTargetWidth + 'px' );
    inImage.setAttribute('height', 'auto' );
    inImage.setAttribute('height', imgClone.getAttribute('height') );
    inImage.style.width = "" + imageTargetWidth + "px";
    inImage.style.height = 'auto';
    inImage.className = imgClone.className ;
    inImage.style.padding = imgClone.style.padding ;
    inImage.style.borderWidth=  imgClone.style.borderWidth ;
  }
  return(baseWidth);
}

function initResizableRefs() {
  if (! resizableRefsInitilized)
  {
    var resizableContainers;
    var currentResizableImages; // should be collection of 1
    var currentResizableLinks; // should be collection of 1

    resizableContainers = getElementsByClassName(document,
                                                 'DIV',
                                                 'sizeImgBox');
    for(var k=0;k<resizableContainers.length;k++)
    {
      currentResizableImages = getElementsByClassName(resizableContainers[k],
                                                      'IMG',
                                                      'sizeImg');
      currentResizableLinks  = getElementsByClassName(resizableContainers[k],
                                                      'DIV',
                                                      'sizeImgLink');
      if ((currentResizableImages.length > 0) &&
          (currentResizableLinks.length > 0))
      {
        resizableImages.push(currentResizableImages[0]);
        resizableImageLinks.push(currentResizableLinks[0]);
        resizableImageBaseWidth.push(
                       getBaseWidth(currentResizableImages[0],
                                    resizableContainers[k]));
        if (resizableImages.length == 1)
        {
          setNaturalWidthSupported(currentResizableImages[0]);
        }
      }
    }
  }
  resizableRefsInitilized = 1;
}

function setVisibilityOfResizableImageLinks() {
  var currentResizableImage;
  var currentResizableLink;

  initResizableRefs();
  for(var k=0;k<resizableImageLinks.length;k++)
  {
    if ((parseInt(document.body.clientWidth)-RESIZE_CLIENT_ADJUST_PX)
        < resizableImageBaseWidth[k])
    {
      resizableImageLinks[k].style.display = "inline"; // for scaled img
    }
    else
    {
      resizableImageLinks[k].style.display = "none";   // for full img
    }
  }
}

function resizeImages() {
  initResizableRefs();
  if ( ! NaturalWidthSupported)
  {
    var currentResizableImage;
    var currentResizableLink;
    for(var k=0;k<resizableImages.length;k++)
    {
      if ((parseInt(document.body.clientWidth)-RESIZE_CLIENT_ADJUST_PX)
          < resizableImageBaseWidth[k])
      {
        targetWidth = parseInt(document.body.clientWidth)
                      - RESIZE_CLIENT_ADJUST_PX;
      }
      else
      {
        targetWidth = resizableImageBaseWidth[k];
      }
      if (targetWidth <= 0)
      {
         targetWidth = 5;
      }
      resizableImages[k].style.width = "" + targetWidth + "px";
    }
  }
}

function resizeImgs() {
  setVisibilityOfResizableImageLinks();
  resizeImages();
}

// scrollableTables.js
//_____________  The following arrays are synched with each other...
var scrollableTableDivs = new Array();
var scrollableTables = new Array();
var scrollableTableLinks = new Array();
//_____________ End of synched arrays

var scrollableTableRefsInitilized = 0;

// EXTERNAL: RESIZE_CLIENT_ADJUST_PX  -- Defined in resizableTable
//   -- reflects the amount of space for the FAT TAB Inner div
//      and misc margins (...).
// var RESIZE_CLIENT_ADJUST_PX = 395;

function initScrollableTableRefs() {
  if (! scrollableTableRefsInitilized) {
    var scrollableTableContainers;
    var currentScrollableTableDivs; // should be collection of 1
    var currentScrollableTables; // Want first (outermost table)
    var currentScrollableTableLinks; // should be collection of 1
    var currentScrollableImg;

    scrollableTableContainers = getElementsByClassName(document,
                                                     'DIV',
                                                     'tblScrollBox');
    for(var k=0;k<scrollableTableContainers.length;k++)
    {
      currentScrollableTableDivs = getElementsByClassName(
                                                  scrollableTableContainers[k],
                                                  'DIV',
                                                  'tblScroll');
      currentScrollableTableLinks = getElementsByClassName(
                                                  scrollableTableContainers[k],
                                                  'DIV',
                                                  'tblScrollLink');
      if ((currentScrollableTableDivs.length > 0) &&
          (currentScrollableTableLinks.length > 0))
      {
        currentScrollableTables = getElementsByClassName(
                                                  currentScrollableTableDivs[0],
                                                  'TABLE',
                                                  '*');
        if (currentScrollableTables.length > 0) {
          scrollableTableDivs.push(currentScrollableTableDivs[0]);
          scrollableTables.push(currentScrollableTables[0]);
          scrollableTableLinks.push(currentScrollableTableLinks[0]);
        }
        currentScrollableImg = getElementsByClassName(
                                                  currentScrollableTableDivs[0],
                                                  'IMG',
                                                  '*');
        if(currentScrollableImg.length > 0){
          scrollableTableDivs.push(currentScrollableTableDivs[0]);
          scrollableTables.push(currentScrollableImg[0]);
          scrollableTableLinks.push(currentScrollableTableLinks[0]);
        }
      } 
    }
  }
  scrollableTableRefsInitilized = 1;
}

function setVisibilityOfScrollableTableLinks() {
  initScrollableTableRefs();

  for(var k=0;k<scrollableTableLinks.length;k++) {
    if (scrollableTableDivs[k].offsetWidth < scrollableTables[k].offsetWidth) {
      scrollableTableLinks[k].style.display = "inline"; // Scrolled Table
    } else {
      scrollableTableLinks[k].style.display = "none";   // Full Table
    }
  }
}

function resetScrollableTables() {
  setVisibilityOfScrollableTableLinks();
}

/*nction getElementsByClassName(oElm,strTagName,strClassName){

    return $(
}*/

// tabChanges.js
function getElementsByClassName(oElm, strTagName, strClassName){
  var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = new Array();
  strClassName = strClassName.replace(/\-/g, "\\-");
  var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
  var oElement;
  for(var i=0; i<arrElements.length; i++){
   oElement = arrElements[i];
   if(oRegExp.test(oElement.className)){
    arrReturnElements.push(oElement);
   }
  }
  return (arrReturnElements);
}

function hideElementsByClassName(className, tag)  {
  var all = getElementsByClassName(document, tag, className);
  for(var k=0;k<all.length;k++) {
    all[k].style.display = "none";
  }
}

function showElementsByClassName(className, tag, startIndex)  {
  var all = getElementsByClassName(document, tag, className);
  var idx =0;
  if (startIndex!=null){
   idx = 1;
   }
  for(var k=idx;k<all.length;k++) {
    all[k].style.display = "inline";
  }
}

function hideTextBox(className, tag)  {
  var all = getElementsByClassName(document, tag, className);
  for(var k=0;k<all.length;k++) {
    all[k].style.display = "none";
  }
}

function showTextBox(className, tag)  {
  var all = getElementsByClassName(document, tag, className);
  for(var k=0;k<all.length;k++) {
    all[k].style.display = "block";
  }
}

var graphTabOffLink_OnLoad = "";
var refTabOffLink_OnLoad = "";
var authorVitaeKeyLink_OnLoad = "";
function enableTabs() {
  var all;
  var k;
  var figCnt;
  var refCnt;
  figCnt = getElementsByClassName(document, 'DIV', 'graphText');
  refCnt = getElementsByClassName(document, 'SPAN', 'referenceText');
  if (figCnt != 0 && document.getElementById('figTabCnt') != null)
  {
    document.getElementById('figTabCnt').textContent = " ("+figCnt.length+")";
    document.getElementById('figTabCnt').innerText = " ("+figCnt.length+")";

    document.getElementById('figTabvCnt').textContent = " ("+figCnt.length+")";
    document.getElementById('figTabvCnt').innerText = " ("+figCnt.length+")"; 
  }
  if (refCnt != 0 && document.getElementById('referenceTabCnt') != null)
  {
    document.getElementById('referenceTabCnt').textContent = " ("+refCnt.length+")";
    document.getElementById('referenceTabCnt').innerText = " ("+refCnt.length+")";

    document.getElementById('referenceTabvCnt').textContent = " ("+refCnt.length+")";
    document.getElementById('referenceTabvCnt').innerText = " ("+refCnt.length+")";
  }
  
  var graphTabOffLink = document.getElementById('graphTabOffLinkNode');
  var refTabOffLink = document.getElementById('refTabOffLinkNode');
  var authorVitaeKeyLink = document.getElementById('authorVitaeKeyLinkNode');

  if (graphTabOffLink)
  {
    if (graphTabOffLink_OnLoad != "")
    {
      graphTabOffLink.href = graphTabOffLink_OnLoad;
      all = getElementsByClassName(graphTabOffLink, 'SPAN', 'disabledTabLink');
      for(k=0;k<all.length;k++)
      {
        all[k].className = ""; // remove disabledTabLink class
      }
    }
  }

  if (refTabOffLink)
  {
    if (refTabOffLink_OnLoad != "")
    {
      refTabOffLink.href = refTabOffLink_OnLoad;
      all = getElementsByClassName(refTabOffLink, 'SPAN', 'disabledTabLink');
      for(k=0;k<all.length;k++)
      {
        all[k].className = ""; // remove disabledTabLink class
      }
    }
  }

  if (authorVitaeKeyLink)
  {
    if (authorVitaeKeyLink_OnLoad != "")
    {
      authorVitaeKeyLink.onclick = new Function(authorVitaeKeyLink_OnLoad);
      for(k=0;k<all.length;k++)
      {
        all[k].className = ""; // remove disabledTabLink class
      }
    }
  }
}

function loadUnsubArticle() {
changeView('unsubTab');
resizeImgs();
resetScrollableTables();
enableTabs();
}

function changeView(tab) {
  if(tab == 'graphTab') {
    showElementsByClassName('graphText', 'div');
    showElementsByClassName('graphTextOnly', 'div',1);
    hideElementsByClassName('refText *', 'div');
    hideElementsByClassName('articleText *', 'div');
    hideElementsByClassName('articleText_indent', 'div');
    hideElementsByClassName('articleText authorsNoEnt', 'div');
    hideElementsByClassName('svKeywords', 'div');
    hideElementsByClassName('refMsg', 'div');
    hideElementsByClassName('pdfExcerpt', 'div');
    hideElementsByClassName('unentitledMSG', 'div');
    hideElementsByClassName('artFooterContent', 'div');
    showTextBox('textboxdefault', 'div');
    showTextBox('textboxdefaultfig', 'div');
    hideTextBox('textboxRef', 'div');
  }
  else if(tab == 'refTab') {
    showElementsByClassName('refText *', 'div');
    hideElementsByClassName('articleText *', 'div');
    hideElementsByClassName('articleText_indent', 'div');
    hideElementsByClassName('articleText authorsNoEnt', 'div');
    hideElementsByClassName('svKeywords', 'div');
    hideElementsByClassName('graphText', 'div');
    hideElementsByClassName('graphTextOnly', 'div');
    showElementsByClassName('refMsg', 'div');
    hideElementsByClassName('pdfExcerpt', 'div');
    hideElementsByClassName('unentitledMSG', 'div');
    hideElementsByClassName('artFooterContent', 'div');
    hideTextBox('textboxdefault', 'div');
    hideTextBox('textboxdefaultfig', 'div');
    hideTextBox('textboxRef', 'div');
  }
  else if(tab == 'unsubTab'){
    showElementsByClassName('articleText *', 'div');
    showElementsByClassName('articleText_indent', 'div');
    showElementsByClassName('articleText authorsNoEnt', 'div');
    showElementsByClassName('svKeywords', 'div');
    hideElementsByClassName('graphText', 'div');
    hideElementsByClassName('graphTextOnly', 'div');
    hideElementsByClassName('refText *', 'div');
    hideElementsByClassName('refMsg', 'div');
    showElementsByClassName('pdfExcerpt', 'div');
    showElementsByClassName('artFooterContent', 'div');
    showElementsByClassName('unentitledMSG', 'div');
    hideTextBox('textboxdefaultfig', 'div');
    hideTextBox('textboxdefault', 'div');
    hideTextBox('textboxRef', 'div');
  }
  else {
    showElementsByClassName('articleText *', 'div');
    showElementsByClassName('articleText_indent', 'div');
    showElementsByClassName('articleText authorsNoEnt', 'div');
    showElementsByClassName('svKeywords', 'div');
    showElementsByClassName('graphText', 'div');
    hideElementsByClassName('graphTextOnly', 'div');
    showElementsByClassName('refText *', 'div');
    hideElementsByClassName('refMsg', 'div');
    showElementsByClassName('pdfExcerpt', 'div');
    showElementsByClassName('artFooterContent', 'div');
    showElementsByClassName('unentitledMSG', 'div');
    hideTextBox('textboxdefaultfig', 'div');
    showTextBox('textboxdefault', 'div');
    showTextBox('textboxRef', 'div');
  }
  showElementsByClassName('embedModule', 'div');
  MMCvArtTabSwitch(tab); // Multimedia viewer
}

function flip(e){
  var menustyle = eval(getStyleObj(e))
  if (menustyle.display=="none"){
    menustyle.display=''
  }
  else{
    menustyle.display="none"
  }
}
function getStyleObj(elem,parent) {
  if (document.layers) {
    if (parent) {
      return "document."+parent+".document."+elem;
    } else {
      return "document."+elem + ".style";
    }
  } else if (document.all) {
    return "document.all."+elem + ".style";
  } else if (document.getElementById) {
    return "document.getElementById('"+elem+"').style";
  }
}

function toggleTabs(tabSelected, keyEvent) {

  var absTabOn = $('#absTabOn'); 
  var absTabOff = $('#absTabOff');
  var fullTabOn = $('#fullTabOn');
  var fullTabOff = $('#fullTabOff');
  var graphTabOn = $('#graphTabOn');
  var graphTabOff = $('#graphTabOff');
  var refTabOn = $('#refTabOn');
  var refTabOff = $('#refTabOff');

  if (tabSelected == 'unsubTab') {
    if (absTabOff) { absTabOff.removeClass('On');absTabOff.addClass('Off'); }
    if (absTabOn) { absTabOn.removeClass('Off');absTabOn.addClass('On'); }
    if(fullTabOn) { fullTabOn.removeClass('On');fullTabOn.addClass('Off'); }
    if(fullTabOff) { fullTabOff.removeClass('Off');fullTabOff.addClass('On'); }
    if(graphTabOn) { graphTabOn.removeClass('On');graphTabOn.addClass('Off'); }
    if(graphTabOff) { graphTabOff.removeClass('Off');graphTabOff.addClass('On'); }
    if(refTabOn) { refTabOn.removeClass('On');refTabOn.addClass('Off'); }
    if(refTabOff) { refTabOff.removeClass('Off');refTabOff.addClass('On'); }
  }
  if (tabSelected == 'fullTab') {
    if (fullTabOn) { fullTabOn.removeClass('Off');fullTabOn.addClass('On'); }
    if (fullTabOff) { fullTabOff.removeClass('On');fullTabOff.addClass('Off'); }
    if(graphTabOn) { graphTabOn.removeClass('On');graphTabOn.addClass('Off');}
    if(graphTabOff) { graphTabOff.removeClass('Off');graphTabOff.addClass('On'); }
    if(refTabOff) { refTabOff.removeClass('Off');refTabOff.addClass('On');}
    if(refTabOn) { refTabOn.removeClass('On');refTabOn.addClass('Off');} 
  }
  if (tabSelected == 'graphTab') {
    if(absTabOn) { absTabOn.removeClass('On');absTabOn.addClass('Off'); }
    if(absTabOff) { absTabOff.removeClass('Off');absTabOff.addClass('On'); }
    if(fullTabOn) { fullTabOn.removeClass('On');fullTabOn.addClass('Off'); }
    if(fullTabOff) { fullTabOff.removeClass('Off');fullTabOff.addClass('On'); }
    if (graphTabOff) { graphTabOff.removeClass('On');graphTabOff.addClass('Off'); }
    if (graphTabOn) { graphTabOn.removeClass('Off');graphTabOn.addClass('On'); }
    if(refTabOn) { refTabOn.removeClass('On');refTabOn.addClass('Off'); }
    if(refTabOff) { refTabOff.removeClass('Off');refTabOff.addClass('On'); }
    createEvent (tabSelected, keyEvent);
  }
  if (tabSelected == 'refTab') {
    if(absTabOn) { absTabOn.removeClass('On');absTabOn.addClass('Off'); }
    if(absTabOff) { absTabOff.removeClass('Off');absTabOff.addClass('On'); }
    if(fullTabOn) { fullTabOn.removeClass('On');fullTabOn.addClass('Off');}
    if(fullTabOff) { fullTabOff.removeClass('Off');fullTabOff.addClass('On'); }
    if(graphTabOn) { graphTabOn.removeClass('On');graphTabOn.addClass('Off'); }
    if(graphTabOff) { graphTabOff.removeClass('Off');graphTabOff.addClass('On'); }
    if (refTabOff) { refTabOff.removeClass('On');refTabOff.addClass('Off'); }
    if (refTabOn) { refTabOn.removeClass('Off'); refTabOn.addClass('On');}
    // get all the references loaded if the user clicks on the tab.
    if (lazyRefs != null) {
       lazyRefs.loadAll();
    }
    createEvent (tabSelected, keyEvent);
  }
  if (tabSelected == 'vitaeLink') {
    if (fullTabOn) { fullTabOn.removeClass('Off');fullTabOn.addClass('On'); }
    if (fullTabOff) { fullTabOff.removeClass('On');fullTabOff.addClass('Off'); }
    if(graphTabOn) { graphTabOn.removeClass('On');graphTabOn.addClass('Off');}
    if(graphTabOff) { graphTabOff.removeClass('Off');graphTabOff.addClass('On'); }
    if(refTabOff) { refTabOff.removeClass('Off');refTabOff.addClass('On');}
    if(refTabOn) { refTabOn.removeClass('On');refTabOn.addClass('Off');}
    createEvent (tabSelected, keyEvent);
    tabSelected = 'fullTab';
  }
  
  setFigSelection (tabSelected);

  changeView(tabSelected);
  ArticleFocus.focusArticle(0);
  // To anchor if present in the URL.
  var hash = location.hash;
  if( hash ) {
    location.hash = hash;
  }
}

function createEvent (tabSelected, keyEvent) {
  if (tabSelected == 'graphTab') {
    if (document.getElementById('figevent') == null) {
      $.post( keyEvent );
      var figTabKey = document.createElement('div');
      figTabKey.setAttribute('id', 'figevent');
      document.getElementById('graphTabOn').appendChild(figTabKey)
    }
  }
  if (tabSelected == 'refTab') {
    if (document.getElementById('refevent') == null) {
       $.post( keyEvent );
      var refTabKey = document.createElement('div')
      refTabKey.setAttribute('id', 'refevent');
      document.getElementById('refTabOn').appendChild(refTabKey)
    }
  }

  if (tabSelected == 'vitaeLink') {
    if (document.getElementById('vitaeevent') == null) {
        $.post( keyEvent );
       var vitaeKey = document.createElement('div')
       vitaeKey.setAttribute('id', 'vitaeevent');
       document.getElementById('authorVitaeKeyLinkNode').appendChild(vitaeKey)
     }
   }
}

function setFigSelection (tabSelected) {
  if (tabSelected == 'graphTab') {
    var graphTabKey = document.createElement('div')
    graphTabKey.setAttribute('id', 'figSelect');
    document.getElementById('graphTabOn').appendChild(graphTabKey)

    var imgThumb = document.getElementById('imgToggle');
    var figThumb = document.getElementById('figToggle');
    if (imgThumb != null || figThumb != null) {
      // Hide article thumbnail, full size image links
      imgThumb.style.display = 'none';
      // Show the figure thumbnail, full size image links
      figThumb.style.display = '';
    }
  }
  else {
    if (document.getElementById('figSelect') != null) {
      var d = document.getElementById('figSelect');
      d.parentNode.removeChild( d );

      var imgThumb = document.getElementById('imgToggle');
      var figThumb = document.getElementById('figToggle');
      if (imgThumb != null || figThumb != null) {
        // Hide article thumbnail, full size image links
        figThumb.style.display = 'none';
        // Show the figure thumbnail, full size image links
        imgThumb.style.display = '';
      }
    }
  }
}

function MMCvImageDimensions()
{ this.width=0;
  this.height=0;
}
function MMCvComponent(componentID,articleImageURL,thumbURL,imageWidth,imageHeight)
{
  this.articleImageURL = articleImageURL;
  this.thumbURL = thumbURL;
  this.imageWidth = imageWidth;
  this.imageHeight = imageHeight;
  this.myID = componentID;
  this.myType = -1;
  this.sourceNode = null;
  this.MMCvNode = null;
  this.sourceDimensions = new MMCvImageDimensions();
  this.MMCvFlashVars = null;
}
function MMCvContentExists()
{ var exists = 0;
  if (MMCvComponents[MMCvVIDEO].length
    || MMCvComponents[MMCvAUDIO].length
    || MMCvComponents[MMCvOTHER].length)
  { exists = 1; }
  return exists;
}
function DetectFlashVer(reqMajorVer, reqMinorVer, reqRelease)
{
  var version = swfobject.getFlashPlayerVersion();
  var versionMajor      = version.major;
  var versionMinor      = version.minor;
  var versionRevision   = version.release; 
  if (versionMajor == 0 ) {
   return "no_flash";
  } else if (versionMajor != 0) {
   if (versionMajor > parseFloat(reqMajorVer)) {
    return "supported";
   } else if (versionMajor == parseFloat(reqMajorVer)) {
    if (versionMinor > parseFloat(reqMinorVer))
     return "supported";
    else if (versionMinor == parseFloat(reqMinorVer)) {
     if (versionRevision >= parseFloat(reqRelease)){
      return "supported";
     }else{ 
      return "version_mismatch";
     } 
    } else {
     return  "version_mismatch";
    }
   }
  }
}
function MMCvArtTabSwitch(inTabName)
{ if (MMCvContentExists())
  {
   if (('graphTab' == inTabName)
     || ('refTab' == inTabName))
   { MMCvHide(); }
   else 
   { MMCvShow(); }
  }
}
function bookmarkKE(domain) {
  var url;
  url = bookMarkEventURL;
  url += domain;
  $.get(url);
}
function getDomain(str)
{
  var startPattern = null;
  if ( str.match("http://") ) {
    startPattern = "http://";
  } else if( str.match("https://") ) {
    startPattern = "https://";
  }
  if (startPattern != null) {
    var i = str.indexOf(startPattern);
    var endPattern = "/";
    var j = str.indexOf(endPattern, i+startPattern.length);
    var domain = str.substring(i+startPattern.length, j);
    return domain;
  } else {
    return null;
  }
}
function bookmarkEvent(event){
  var url;
  if (navigator.userAgent.indexOf("MSIE")!=-1) {
    if (event.srcElement != '') {
      if(event.srcElement == '[object]'){
        url = event.srcElement.parentNode.href+'';
      } else {
        url = event.srcElement+'';
      }
    } else { 
      //will get the action from the form element
      url = event.srcElement.nextSibling.nextSibling.action;
    }
  } else {
    if (event.target != '') {
      if (event.target == '[object HTMLImageElement]'){
        url= event.target.parentNode.href+'';
      } else {
        url= event.target+'';
      }
    } else {
      //will get the action from the form element
      url = event.target.nextSibling.nextSibling.action;
    }
  } 
  if( url != null){
    var domain = getDomain(url);
    if (domain !=null){
      bookmarkKE(domain);
    }
  } 
}


function $Id(id){return document.getElementById(id);}
var isFadeOn = 0;
var focusOpac=0;
var ArticleFocus = {
  init: function(id) {
    jQuery('#focusOn').click(function() {
      ArticleFocus.fadeOut('articleFade');
    });
    jQuery('#focusOff').click(function() {
      ArticleFocus.fadeIn('articleFade');
    });
  },

  focusArticle: function(focusOn) {
    var imgToolBox = $('#imgToggleBox');
    var artTabs = $('#artTabs');
    var articleBody = $('#articleBody');
    var focusEnable = $Id('focusOn');
    var focusDisable = $Id('focusOff'); 
    var articleFade = $Id('articleFade');
    if(isFadeOn || focusOn) {
      articleFade.style.display='inline';
      articleFade.style.height = 1050 + 'px';
      var maxheight = parseInt(document.body.scrollHeight);
      articleFade.style.height = (maxheight+20)+'px';
      articleFade.style.width = (parseInt(document.body.scrollWidth))+'px';
      artTabs.addClass('articleTabsNoFade');
      if (imgToolBox != null) {
        imgToolBox.addClass('imgToogleNoFade');
      }
      articleBody.addClass('articleNoFade');
      focusEnable.style.display = 'inline';
      focusDisable.style.display = 'none';

      var url;
      url = focusKeyEventURL;
      $.get(url);
      isFadeOn = 1;
    }
    else {
      articleFade.style.height = '0px';
      articleFade.style.display='none';
      artTabs.removeClass('articleTabsNoFade');
      if (imgToolBox != null) {
        imgToolBox.removeClass('imgToogleNoFade');
      }
      articleBody.removeClass('articleNoFade');
      focusEnable.style.display = 'none';
      focusDisable.style.display = 'inline';
      isFadeOn = 0;
    }
  },

  setOpacInc: function() {
    var articleFade = $Id('articleFade');
    focusOpac = focusOpac + 20;
    focusOpac = (focusOpac>80)?80 :focusOpac;
    articleFade.style.filter = 'alpha(opacity='+focusOpac+')';
    articleFade.style.opacity = focusOpac/100;
    if(focusOpac<80) {
      setTimeout('ArticleFocus.setOpacInc()',62.5);
    }
  },

  setOpacDec: function() {
    var articleFade = $Id('articleFade');
    focusOpac = focusOpac - 20;
    focusOpac = (focusOpac>0)?focusOpac :0;
    articleFade.style.filter = 'alpha(opacity='+focusOpac+')';
    articleFade.style.opacity = focusOpac/100;
    if (focusOpac > 0) {
      setTimeout('ArticleFocus.setOpacDec()',62.5);
    }
    else {
      ArticleFocus.focusArticle(0);
    }
  },
  fadeIn: function(eID) {
    ArticleFocus.focusArticle(1);
    isFadeOn = 1;
    ArticleFocus.setOpacInc();
  },
  fadeOut: function(eID) {
    isFadeOn = 0;
    ArticleFocus.setOpacDec();
  }
};


var resizePage = {
  currWidth: null,
  init: function() {
    var tabs = document.getElementById('artTabs');
    var tab = getElementsByClassName(tabs, 'DIV', 'On');
    var tabWidth = 0;
    var numTabs = tab.length;
    var appVer_b = /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent);
      var appVer = new Number(RegExp.$1);
      if(navigator.appName =="Netscape" && appVer == 2) {
        tab = tabs.getElementsByTagName('DIV');
        for(var i =0 ; i < tab.length; i++) {
          if (tab[i].id != "" ) {
            //tabWidth += $(tab[i].id).getDimensions().width;
            tabWidth += $("#" + tab[i].id).width();
          }
        }
        if ($('#TabOff') != null) {
          tabWidth += 63;
        }else {
           tabWidth -= 40;
        }
      }else {
        for(var i =0 ; i < numTabs; i++) {
            //tabWidth += $(tab[i].id).getDimensions().width;
            tabWidth += $("#"+tab[i].id).width();
        }
      }
      this.currWidth = tabWidth + 40;
    }
}
function resizeTabs() {

  var featureRow = getElementsByClassName(document,'LI','featureCount');
  var fCnt =  featureRow.length;
  featureRow[fCnt-1].style.background = "none";

  if (document.all && (document.body.scrollHeight > 32000)) {
    var focusIcon = document.getElementById('focusButton');
    focusIcon.style.display = 'none';
  }
  resizePage.init();
  document.getElementById('artTabs').style.width = resizePage.currWidth + 50;
  //var  winWidth = document.viewport.getWidth();
  var  winWidth = $(document).width();
  var currWidth = resizePage.currWidth + 410; 
  if (winWidth < currWidth ) {
     document.getElementById('articlePage').style.width = resizePage.currWidth + 400;
  }else {
    document.getElementById('articlePage').style.width = '100%';
  }
}

function resizeWindow() {
checkWidget();
resizeImgs(); 
resetScrollableTables(); 
resizeTabs();
}

// Reflect
/* to restore original html */
var articleHtml = '';
//var isNextBioOn = '';
var isReflectOn = '';
var super_ref="";
var sub_ref="";
var reflectHtmlProcessing = '';
var highlightKeyWdsMenu = '';
var htmlLength = '';
var highlite="";
var lodingref="false";
var outflage="false";
var outcount=0;
var shr='';
var reflectTimer = '';
function HighlightKeyWdsMenu() {
  var self = this;
  this.sup = document.getElementById('highLight_attach_menu_parent');
  this.higLytOnPadVal = '64px';
  this.higLytOffPadVal = '79px';
  this.statusImg = '';
  this.highlite="true";
  this.updateMenuText = function(highLytOn) {
    if (highLytOn == "true") {
      if(document.getElementById('linktext').innerHTML != null) {
         document.getElementById('linktext').innerHTML = '';
         document.getElementById('linktext').innerHTML = "Highlight keywords on";
         var pBorder =  document.getElementById('highLight_attach_menu_parent');
         if (pBorder) {
           pBorder.style.paddingRight=self.higLytOnPadVal;
         }
      }
    } else {
      if(document.getElementById('linktext').innerHTML != null) {
        document.getElementById('linktext').innerHTML = '';
        document.getElementById('linktext').innerHTML = "Highlight keywords";
        var pBorder =  document.getElementById('highLight_attach_menu_parent');
        if (pBorder) {
           pBorder.style.paddingRight=self.higLytOffPadVal;
        }
      }
   }
  };

  this.reflectStatusupdate = function(statusText) {
   if (statusText == "processing"){
      document.getElementById('ReflectText').style.display = 'inline';
      document.getElementById('ReflectText').style.fontSize = '12px';
      document.getElementById('ReflectText').style.color =  "#555555";
      document.getElementById('ReflectText').firstChild.nodeValue = " loading ";
      document.getElementById('reflectThrobber').style.display='inline';
      document.getElementById('reflectMainText').style.fontWeight = 'bold';
      highlite="false";
      self.updateMenuText(highlite);
      if (self.sup.addEventListener && self.sup.compareDocumentPosition) {
          self.sup.removeEventListener("mouseout",self.mouseLeaveHandler,false);
       }
        else if (self.sup.attachEvent) {
          for(var x=0; x < outcount;x++)
            {
             self.sup.detachEvent("onmouseleave",this.at_hide);
            }
         }
    lodingref="true";
   } else if(statusText == "success") {
      document.getElementById('reflectThrobber').style.display='none';
      document.getElementById('ReflectText').style.display = 'none';
      highlite="true";
      self.updateMenuText(highlite);
      self.outListener();
   } else if(statusText == "error") {
      document.getElementById('reflectThrobber').style.display='none';
      document.getElementById('ReflectText').style.color = "#ff0000";
      document.getElementById('ReflectText').firstChild.nodeValue = " service unavailable";
      document.getElementById('ReflectText').style.fontSize = '12px';
      document.getElementById('ReflectText').style.display = 'inline';
      document.getElementById('reflectmenu').disabled = true;
      document.getElementById('reflectmenu').style.opacity='0.4';
      document.getElementById('reflectMainText').style.color ="#555555";
      document.getElementById('reflectMainText').style.fontWeight = 'normal';
      document.getElementById('reflectSubText').style.color ="#555555";
      document.getElementById('noHighLight').checked="checked";
      highlite="false";
      self.updateMenuText(highlite);
      self.outListener();
    } else if(statusText == "NoReflectMatching") {
      document.getElementById('reflectThrobber').style.display='none';
      document.getElementById('ReflectText').style.display = 'none';
      document.getElementById('reflectmenu').disabled = true;
      document.getElementById('reflectmenu').style.opacity='0.4';
      document.getElementById('reflectMainText').style.color ="#555555";
      document.getElementById('reflectMainText').style.fontWeight = 'normal';
      document.getElementById('reflectSubText').firstChild.nodeValue = "no proteins and chemicals to highlight";
      document.getElementById('reflectSubText').style.color ="#555555";
      document.getElementById('noHighLight').checked="checked";
      highlite="false";
      self.updateMenuText(highlite);
      self.outListener();
   }
  };
  this.showBorders = function () {
      var pBorder =  document.getElementById('highLight_attach_menu_parent');
      if (pBorder) {
        pBorder.style.borderLeft = '1px solid #9b9b9b';
        pBorder.style.borderRight = '1px solid #9b9b9b';
        pBorder.style.borderTop = '1px solid #9b9b9b';
        self.statusImg= document.getElementById('state_image');
        self.statusImg.src="/scidirimg/minus.gif";
        self.statusImg.alt="close menu";
        self.updateMenuText(highlite);
      }
    };

    this.hideBorders = function() {
      var pBorder =  document.getElementById('highLight_attach_menu_parent');
      if (pBorder) {
        pBorder.style.border = 'none';
        self.statusImg=document.getElementById('state_image');
        self.statusImg.src="/scidirimg/plus.gif";
        self.statusImg.alt="open menu";
        var featureCountLi = getElementsByClassName(document,'LI','featureCount');
        for (i=0;i<featureCountLi.length;i++){
         if(featureCountLi[i].id == "highLight_attach_menu_parent"){
           featureCountLi[i-1].style.display =  "inline";
           featureCountLi[i-1].style.marginRight = '0px';
           break;
         }
        }
      }
    };

    this.at_show_aux = function(p, c)
    {
      var parent =  document.getElementById('highLight_attach_menu_parent');
      c.style.visibility = "visible";
      self.showBorders();
    };
    this.at_show = function()
    {
      var p = super_ref;
      var c = sub_ref;
      self.at_show_aux(p, c);
      clearTimeout(c["at_timeout"]);
    };

    this.at_hide = function()
    {
      var p = super_ref;
      var c = sub_ref;
      c["at_timeout"] = setTimeout("document.getElementById('"+c.id+"').style.visibility = 'hidden'", 10);
      var parent =  document.getElementById('highLight_attach_menu_parent');
      self.hideBorders();
    } ;
    this.outListener = function() {
        if (self.sup.addEventListener && self.sup.compareDocumentPosition) {
            self.sup.addEventListener("mouseout", self.mouseLeaveHandler, false);
        }
        else if (self.sup.attachEvent) {
            self.sup.attachEvent("onmouseleave", this.at_hide);
            outcount++;
        }
    };
    this.mouseLeaveHandler = function(ev) {
        var relPos = self.sup.compareDocumentPosition(ev.relatedTarget);
        if ((relPos & self.sup.DOCUMENT_POSITION_CONTAINED_BY) == 0)
            self.at_hide();
    };
    this.at_click = function()
    {
      if(articleHtml == '') {
        articleHtml = document.getElementById('articleContent').innerHTML;
      }
      var p = super_ref;
      var c =sub_ref;
      if (c.style.visibility != "visible") {
        var totWidth = document.getElementById('highLight_attach_menu_parent').parentNode.offsetWidth;
        var featureCountLi =  getElementsByClassName(document,'LI','featureCount');
        var bufWidth = 0;
        var bufTest = 0;
        var excede=0;
        var lastWidth=0;
        for (i=0;i<featureCountLi.length;i++){
          excede=0;
          bufTest = bufWidth;
          if(featureCountLi[i].offsetWidth >= 150){
            bufWidth += featureCountLi[i].getElementsByTagName("a")[0].offsetWidth +7;
            lastWidth= featureCountLi[i].getElementsByTagName("a")[0].offsetWidth +7;
          }else{
            bufWidth += featureCountLi[i].offsetWidth;
            lastWidth=featureCountLi[i].offsetWidth;
          }
          if(bufWidth >= totWidth){
            bufWidth = lastWidth;
            excede=1;
          }
          if(featureCountLi[i].id == "highLight_attach_menu_parent"){
            if(excede==1){
              if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
                featureCountLi[i-1].style.display =  "inline";
              } else {
                featureCountLi[i-1].style.display =  "inline-block";
              }
              featureCountLi[i-1].style.marginRight = Math.abs(totWidth - bufTest)-3+ "px";
            }
            break;
           }
        }
        self.at_show_aux(p, c);
        self.statusImg= document.getElementById('state_image');
        self.statusImg.src="/scidirimg/minus.gif";
        self.statusImg.alt="close menu";
        if(lodingref=="false"){
         self.outListener();
        }
      }
      else {
        c.style.visibility = "hidden";
        self.statusImg=document.getElementById('state_image');
        self.statusImg.src="/scidirimg/plus.gif";
        self.statusImg.alt="open menu";
        self.hideBorders();
      }
      return false;
    };
}
// This function will verify whether widget is open or not when window is resized.
function checkWidget()
{
 var menuChldElemnt = "highLight_attach_menu_child";
 if (isNextBioOn || isReflectOn) {
     menuChldElemnt = "highLight_attach_menu_child_no_nextBio";
   if (isNextBioOn && isReflectOn) {
     menuChldElemnt = "highLight_attach_menu_child";
 }
}
 var c=document.getElementById(menuChldElemnt);
 if( (c != null) && (c.style.visibility=="visible") )
 {
   c.style.visibility = "hidden";
   highlightKeyWdsMenu.statusImg=document.getElementById('state_image');
   highlightKeyWdsMenu.statusImg.src="/scidirimg/plus.gif";
   highlightKeyWdsMenu.statusImg.alt="open menu";
   highlightKeyWdsMenu.hideBorders();
  }
}
function at_attach(parent, child, showtype, position, cursor)
{
  highlightKeyWdsMenu = new HighlightKeyWdsMenu();
  var p = document.getElementById(parent);
  var c = document.getElementById(child);
  super_ref=p;
  sub_ref=c;
  p.style.cursor="pointer";
  switch (showtype)
  {
    case "click":
     p.onclick     = highlightKeyWdsMenu.at_click;
      break;
    case "hover":
      break;
  }
   if(isNextBioOn) {
         highlite="true";
         highlightKeyWdsMenu.updateMenuText(highlite);
         document.getElementById('nextbioMainText').style.fontWeight = 'bold';
    } else {
        highlite="false";
        highlightKeyWdsMenu.updateMenuText(highlite);
     }

}

Array.prototype.getOccur = function (value)
{
  var occur = new Array();
  var idx = 0;
  for (var i=0;i<this.length;i++) {
    if (this[i] == value) {
      occur[idx]= i;
      idx = idx +1;
    }
  }
  return occur;
}
Array.prototype.getUnique = function () {
  var o = new Object();
  var i, e;
  for (i = 0; e = this[i]; i++) {o[e] = 1};
    var a = new Array();
    for (e in o) {a.push (e)};
    return a;
}
function calcPosOfDivs(value) {
  var PosOfDivs = new Array();
  PosOfDivs = []; 
  var arrofid = 0;
  var tobeIgnored = "false";
  var divElements = document.getElementById('articleContent').getElementsByTagName('DIV');
  for (var i = 0; i < divElements.length; i++) {
    if (divElements.item(i).tagName == 'DIV') {
      if (divElements.item(i).className == "toBeIgnored") {
        tobeIgnored = "true";
      }
      if (divElements.item(i).className == "refText") {
        break;
      }
      if((tobeIgnored == "true") && 
         (divElements.item(i).className == value)) {
        if (divElements.item(i).innerHTML) {
             PosOfDivs[arrofid] = i;
             arrofid = arrofid + 1;
        }
      }
    }
  }
  return PosOfDivs;
}

function ReflectHtmlProcessing() {
  var self = this;
  this.processDivs = new Array();
  this.delimtr = '###';

  this.genarateHTMLFrReflect = function (currentElement) {
      var articleHTML = '';
      self.processDivs = [];
      if (currentElement == null) {
        return articleHTML;
      }
      var tagName=currentElement.tagName;
      var divName = currentElement.className;
      var i=0;
      var idx = 0;
      var forReflect = false;

      var currentElementChild=currentElement.childNodes[i];
      while(currentElementChild) {
        var divname = currentElementChild.className;
        var innerTagName = currentElementChild.tagName;
        if(innerTagName == 'DIV') {
            if (divname == "toBeIgnored") {
              forReflect = true;
            }
            if ( (divname == "embedAPCModule") ||
                 (divname == "pdfExcerpt") ) {
                i++;
                currentElementChild=currentElement.childNodes[i];
                continue;
            }
            if (divname == "refText") {
              break;
            }
            if ( divname && (forReflect == true)) {
              var innerHtml = currentElementChild.innerHTML;
              if (innerHtml.length > 0) {
                   self.processDivs[idx] = divname;
                   idx = idx +1;
                   articleHTML = articleHTML + self.delimtr + innerHtml;
              }
            }
        }
        i++;
        currentElementChild=currentElement.childNodes[i];
      }
      if(articleHTML != null) {
        return articleHTML;
      }
    };
    this.updateReflectedHTML = function(currentElement) {
      if(currentElement == null) {
        return;
      }
      var processedDivs = new Array();
      processedDivs = [];
      var firstdelimtr = currentElement.substr(0,self.delimtr.length);
      if (firstdelimtr == self.delimtr) {
        currentElement = currentElement.substr(self.delimtr.length);
      }
      var innerHtml = currentElement.split(self.delimtr);
      if (innerHtml.length != self.processDivs.length) {
         return ;
      }

      processedDivs = self.processDivs.getUnique();
      var divElements = document.getElementById('articleContent').getElementsByTagName('DIV');

      for (var i=0;i<processedDivs.length;i++) {
        var occurences = self.processDivs.getOccur(processedDivs[i]);
        var docDivPos = calcPosOfDivs(processedDivs[i]);
        if (docDivPos.length != occurences.length) {
         continue;
        } 
        for (idxStart=0;idxStart<occurences.length;idxStart++) {
           var docIdx = docDivPos[idxStart];
           var reflectIdx = occurences[idxStart];
           divElements[docIdx].innerHTML = innerHtml[reflectIdx]; 
        }
      }
    };
}

function ajaxRequest(url, postParam) {
  shr = new SWFHttpRequest();
  shr.open( 'POST', url );
  reflectTimer = setTimeout("shr.abort(); highlightKeyWdsMenu.reflectStatusupdate('error');" ,reflectTimeOut);
  shr.onreadystatechange = function(){
    if (this.readyState!=4) return;
    if (this.status==200) {
      if (reflectTimer) {
         clearTimeout(reflectTimer);
      }
      var response = shr.responseText;
      var delimtr = '###';
      var idx = response.indexOf(delimtr);
      if (idx != -1) {
        var headerData = response.substring(0, idx);
        var bodyData = response.substring(idx + delimtr.length);
        var reflectedHtml = bodyData.length;
        // Reflect might not find appropriate matching words
        if ((reflectedHtml - htmlLength) < 10) {
          highlightKeyWdsMenu.reflectStatusupdate('NoReflectMatching');
        } else {
          Reflect.appendScriptsToHeader(headerData);
          reflectHtmlProcessing.updateReflectedHTML(bodyData);
          highlightKeyWdsMenu.reflectStatusupdate('success');
        }
      }
    } else {
        highlightKeyWdsMenu.reflectStatusupdate('error');
    }
  };
  shr.send( postParam );
}

function reflectPOSTAjaxRequest(reflectPostUrl) {
  //SD11-2 ARTSPEED only pull in overlib when we need to
  //did not make sense to include in sdX.js
  var hd = document.getElementsByTagName("head")[0];
  var st = document.createElement('script');
  st.src = SD_REFLECT_OVERLIB;
  hd.appendChild(st);

  reflectHtmlProcessing = new ReflectHtmlProcessing();
  removeNextBioHighlighting();
  highlightKeyWdsMenu.reflectStatusupdate('processing');

  var htmlCode = reflectHtmlProcessing.genarateHTMLFrReflect(document.getElementById('articleContent'));
  htmlLength = htmlCode.length;
  var emptyHead = '<HEAD></HEAD>';
  var postField = emptyHead +  htmlCode;
  var hrefT = location.href;
  var tmppostParams = 'document='+encodeURIComponent(postField)+'&URI='+encodeURIComponent(hrefT)+'&autodetectDOI='+encodeURIComponent('0');
  var postParams = 'SDProxyParam=' + encodeURIComponent(tmppostParams);
  ajaxRequest(reflectPostUrl,postParams);
}

function removeReflectHighlight(){
  if(isReflectOn) {
    document.getElementById('reflectMainText').style.fontWeight = 'normal';
    document.getElementById('reflectThrobber').style.display='none';
    document.getElementById('ReflectText').style.display = 'none';
    if(articleHtml) {
      document.getElementById('articleContent').innerHTML = articleHtml;
    }
  }
}
function removeNextBioHighlighting() {
  if(isNextBioOn) {
    nbApi.disableHl(); 
    document.getElementById('nextbioMainText').style.fontWeight = 'normal';
    document.getElementById('nextBioThrobber').style.display='none';
  }
}
function enableNextBioHighlighting(){
  removeReflectHighlight();
  if(lodingref=="true" && outflage=="false"){
    highlightKeyWdsMenu.outListener();
    outflage="true";
  }
  if(isNextBioOn) {
    document.getElementById('nextBioThrobber').style.display='inline';
    nbApi.enableHl();
    document.getElementById('nextbioMainText').style.fontWeight = 'bold';
    highlite="true";
    highlightKeyWdsMenu.updateMenuText(highlite);
    document.getElementById('nextBioThrobber').style.display='none';
  }
}
function removeHighlighting() {
  removeReflectHighlight();
  removeNextBioHighlighting();
  if(lodingref=="true" && outflage=="false"){
    highlightKeyWdsMenu.outListener();
    outflage="true";
  }
  document.getElementById('noHighLight').checked = true;
  highlite="false";
  highlightKeyWdsMenu.updateMenuText(highlite);
}
// End Reflect

//Author Hover start
var ajaxReq;
var hoverId;
var timerId;
var linkBufObj;
var authId;
var timerIdAuth;

function clearAuthTimeout() {
   if(hoverId != null) {
      clearTimeout(hoverId);
      clearTimeout(timerIdAuth);
      document.getElementById('authorLinkHover').style.display = "block";
   }
}

function closeAuth() {
   if (timerId != null) {
      clearTimeout(timerId);
   }

   if (timerIdAuth != null) {
      clearTimeout(timerIdAuth);
   }

   hoverId = setTimeout("closeAuthHover()", 300);
}


function closeAuthHover() {
  document.getElementById('authorLinkHover').style.display = "none";
}

function displayAuth (url,obj) {
  if (hoverId != null) {
     clearTimeout(hoverId);
  }
  
  linkBufObj = obj;
  var str = 'displayAuthHover("'+url+'")';
  timerIdAuth =  setTimeout(str, 300);
  timerId = setTimeout('displayErrorMsg("'+obj+'")', 10000);
}

function displayErrorMsg(obj) {
  clearTimeout(timerId);
  var d = $('#authorLinkHover');
  if(d.length < 1) { return; }
  d.html("<div style=\"padding:7px;\"><div style=\"font-style:italic;font-size:11px;color:#000000;\">Author details are not currently available</div><div style=\"border-bottom:1px solid #cccccc;line-height:1px;margin-bottom:3px;\"></div><div style=\"font-style:italic;text-align:right;font-size:11px;color:#cccccc;\">Provided by Scopus</div></div>");
}

var objAuth = new Object();

var AuthorHover = {
  init: function() {
    var ps = $(".authHoverAnchor")
    ps.mouseover(function(event) {
      var t = $(event.currentTarget);
      displayAuth(t.attr("authHoverURL"), event.currentTarget);
    });
    ps.mouseout(function(event) {
      closeAuth();
    });
  }
} //AuthorHover
$(document).ready(function() {AuthorHover.init();});

function displayAuthHover(url) {
  var d = $('#authorLinkHover');
  if(d.length < 1) { return; }
  assignPosition(d);
  d.css("display", "block");

  var temp = url.split("/");
  authName = temp[4];
  
  var decodeAuthName = decodeURIComponent(authName);

  var temp1, authFullName;
  if (decodeAuthName.indexOf(",") != -1) {
    var temp1 = decodeAuthName.split(", ");
    var lastName = temp1[0];
    var firstName = temp1[1];
    authFullName = firstName + " " + lastName;
  } else {
    authFullName = decodeAuthName;
  }
  var authNameEncoded = encodeURIComponent(authFullName);

  temp[4] = authNameEncoded;
  var finalURL = temp[0]+"/"+temp[1]+"/"+temp[2]+"/"+temp[3]+"/"+temp[4]; 
  var decodeUrl = decodeURIComponent(finalURL);
  
  //Get author name from url
  var startAuthPos = decodeUrl.lastIndexOf("/");
  var authorName = decodeUrl.substring(startAuthPos+1);
      
  //Get author id from url
  var endPos = finalURL.lastIndexOf("/");
  var startPos = finalURL.lastIndexOf("/", endPos-1);

  authId = finalURL.substring(startPos+1, endPos);

  var resText = "";
  if (objAuth["'"+authId+"'"] != null && objAuth["'"+authId+"'"].length > 0) {
     resText = objAuth["'"+authId+"'"];
  }
   
  if (resText.length == 0) {
    $('#authorLinkHover').html("<div style=\"padding: 7px;\"><div style=\"margin-bottom:7px; font-size: 12px;\"><span  style=\"color: #999999;\">Articles (...)</span><span style=\"margin-left: 5px; margin-right: 5px;\">|</span><span style=\"color: #999999;\">References (...)</span><span style=\"margin-left: 5px; margin-right: 5px;\">|</span><span style=\"color: #999999;\">Cited by (...)</span></div><div style=\"margin-bottom: 7px; font-size: 11px;\"><span style=\"color: #999999;\">Author profile</span>&nbsp;of&nbsp;"+ authorName +"</div><div style=\"border-bottom: 1px solid rgb(204, 204, 204); line-height: 1px; margin-bottom: 3px;\"></div><div style=\"font-style: italic; text-align: right; font-size: 11px; color: rgb(204, 204, 204);\">Provided by Scopus</div></div>");
  }
    
  //for performance
  if (resText.length > 0) {
     clearTimeout(timerId);
     var d = $('#authorLinkHover');
     if(d.length < 1) { return; }
     d.html(resText);
     assignPosition(d);
     return;
  }

  ajaxReq = new $.get(url, function(response) { 
      var d = $('#authorLinkHover');
      clearTimeout(timerId);
      if(d.length < 1) { return; }
      objAuth["'"+authId+"'"] = response.responseText;
      d.html(response);
      assignPosition(d);
    });
} //displayAuthHover()

function assignPosition(d)
{
  if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
     d.css("left", Number(linkBufObj.offsetLeft + 22) + "px");
     var linkId = linkBufObj.id;
     var linkNum = linkId.substring(9,linkId.length);
     var numPrev = Number(linkNum) - 1;
     var numPrevs = Number(linkNum) - 2;
     var numNext = Number(linkNum) + 1;
     var prevEle = document.getElementById("authname_" + numPrev);
     var nextEle = document.getElementById("authname_" + numNext);
     var prevestEle = document.getElementById("authname_" + numPrevs);
     var posPrev;
     var posNext;
     if(prevEle != null){
      posPrev = findPosY(prevEle);
     } else {
      posPrev = findPosY(linkBufObj);
     }
     if(posPrev ==  findPosY(linkBufObj)){
      d.css("top", findPosY(linkBufObj) + linkBufObj.offsetHeight + 8 + "px");
     } else {
       if(nextEle != null){
        posNext = findPosY(nextEle);
       } else {
        if(prevestEle != null && posPrev == findPosY(prevestEle) ){
         posNext  = findPosY(linkBufObj) + 27;
        } else {
         posNext  = findPosY(linkBufObj);
        }
       }
       d.css("top", posNext + linkBufObj.offsetHeight + 8 + "px");
     }
     d.css("display", "block");

  } else {
     d.css("left", Number(linkBufObj.offsetLeft + 22) + "px");
     d.css("top", findPosY(linkBufObj) + linkBufObj.offsetHeight + 5 + "px");
     d.css("display", "block");
  }
}

function textBoxCE(textObj,imptr)
{
var child=document.getElementById(textObj);
var imgChild=document.getElementById(imptr);
if(child.style.display=="none")
  {
   child.style.display="block";
   imgChild.src="/scidirimg/minus.gif";
  }
 else{
   child.style.display="none";
   imgChild.src="/scidirimg/plus.gif";
  }
}

function toggleFigLblMMCStyling()
{
  var restylableContainers;
  var currentReStylableDivs;
  var currentLabelDivs;

  restylableContainers = getElementsByClassName(document,
                                                'DIV',
                                                'textboxdefault');

  for(var k=0;k<restylableContainers.length;k++) {
    currentLabelDivs = getElementsByClassName(restylableContainers[k],
                                              'SPAN',
                                              'nodefault');

    if (currentLabelDivs.length == 0) {
      restylableContainers[k].style.background = 'none';
      restylableContainers[k].style.border = '0 none';
      restylableContainers[k].style.margin = '0 0 0 15px';
    }
  }
}

function findPosY(obj) {
  var curtop = 0;
  if(obj.offsetParent) {
    while(1) {
      curtop += obj.offsetTop;
      if(!obj.offsetParent) { break; }
        obj = obj.offsetParent;
      }
  }
  else if(obj.y) {
    curtop += obj.y;
  }
  return curtop;
}
//Auth hover End

//ARTSPEED
//Article Citation
function submitCitation(actionUrl) {
document.forms["citationInfo"].action = actionUrl; 
document.forms["citationInfo"].submit(); 
}
//Article Refer to by link
function populateRelLinks() {
var refLink = document.getElementById("refersToAndReferredToBy");

$.ajax(
   {
      url: refLinkURL,
      type: 'GET',
      error: function() 
      {
         refLink.innerHTML = ' ';
      },
      success: function(res) {
        refLink.innerHTML = res;
      }
   });
}
//Reference resolution
var ajaxRefResol;
var ajaxCitedByUpdate;
function updateCitedByCounts(citedByCounts,isHoover,start,count) {
 citedByCounts = citedByCounts.substring(0,citedByCounts.length-1);
  var updateCitedUrl = updatedCitedBy + citedByCounts;

  ajaxCitedByUpdate = new $.ajax({
       url: updateCitedUrl,
       type: 'GET',
       async : isHoover,
       error: function() {
          $(".citedBy_").each(function(){
             $(this).html("");
          });
       },
       success: function(res) {
         var citedBy = decodeURIComponent(res);
         if (citedBy != null) {
            this.$citedByDiv = $('<div></div>')
              .hide()
              .append($(citedBy)
           );
           $(".citedBy_").each(function(){
              if(myXabsCounts[this.id]) {
                 if( this.innerHTML.match('Cited By in Scopus') == null) {
                  $(this).html( myXabsCounts[this.id]);
                 }
              }
           });
           $(".citedBy_").each(function(){
               var v = parseInt(getNumber(this.id));
               var end = parseInt(start)+parseInt(count);
               if ( (v != -1) && (v >= start) && (v < end)) {
                   if(!myXabsCounts[this.id]) {
                      $(this).html("");
                   }
               }
           });

         }
       }
   });
}
String.prototype.substringBetween = function (string1, string2) {
    if ((this.indexOf(string1, 0) == -1) || (this.indexOf(string2, this.indexOf(string1, 0)) == -1)) {
        return (-1);
    } else {
        return this.substring((this.indexOf(string1, 0) + string1.length), (this.indexOf(string2, this.indexOf(string1, 0))));
    }
};

var lazyRefs = null;

function refResolve() {
    
   lazyRefs = $(".refPlaceHolder").lazyLoad({               
          batchSize:50,
          intoView:function(objs,idx){
            if( objs ){
                if( objs[0] ){
                    var start = $(objs[0].el).attr("id").substring(3);
                    if(!start) {
                      start = 1;
                    }
                    var count = objs.length;
                    if (idx) {
                       resolveRefs(idx,1);
                    } else {
                       resolveRefs( start, count );
                    }
                }
            }
          }
   });
   
   
}

function resolveRefs( start, count ){
    
     var url = refResolvePath + "&_refRangeStart="+start+"&_refRangeCount="+count;
     var isHoover = true;
     if (count == 1) {
       isHoover = false;
     }
     ajaxRefResol = new $.ajax({
             url: url,
             type: 'GET',
             async : isHoover,
             error: function() {
                 $(".refPlaceHolder").each(function(){
                     $(this).html(' <span style="color:red;"> [SD-008]<\/span>');
                  });
                 return;
              },
              success: function(res) {
                var refMap = decodeURIComponent(res);
                var citedBySCEids = refMap.substringBetween("#","^");
                var tmp = "#"+citedBySCEids+"^";
                refMap = refMap.replace(tmp,"");
                if (refMap != null) {
                   this.$OuterDiv = $('<div></div>')
                      .hide()
                      .append($(refMap)
                   );
                   $(".refPlaceHolder").each(function(){
                      if (myMap[this.id]) {
                        if(this.innerHTML.match('/science?') == null){
                            $(this).html(myMap[this.id] );
                        }
                      }
                    });
                   // update Cited by counts
                   updateCitedByCounts(citedBySCEids,isHoover,start,count);
                }               
                // shut the spinner down for no data 
                $(".refPlaceHolder").each(function(){
                   var v = parseInt(getNumber(this.id));
                   var end = parseInt(start)+parseInt(count);
                   if ( (v != -1) && (v >= start) && (v < end)) {
                      if (!myMap[this.id]) {
                         $(this).html("");
                      }
                    }
                });                  
             }              
     });
}


//Reference resolution End
//END article.js

//START ensureChkBoxSelected
function ensureChkBoxSelected(form) {
  var rc=false;
  var selectedDocList = form.art;
  var msg = "Please select one or more articles to purchase.";
  var msg2 = "You have added too many articles to your shopping cart.  The maximum number of articles you may add to your shopping cart is 20.  Please review your selection and select the appropriate articles to be added.";
  
  var checkBoxCounter = 0;

  if (typeof(selectedDocList) != "undefined" || selectedDocList != null) {
     for (var i = 0; i < selectedDocList.length; i++) {
         if (selectedDocList[i].checked) {
            rc = true;
            checkBoxCounter = checkBoxCounter + 1;
         }
     }
  }
  else {
    msg = "There are no articles to purchase.";
  }
  if (!rc) {
    alert(msg);
  }
  else if(checkBoxCounter > 20) {
    alert(msg2);
    return false;
  }
  return rc;
}

//END ensureChkBoxSelected

//START previewWindow.js
function closePreview(artID, imgID, defImg, labelID) {
    var imgEle = document.getElementById(imgID);
    var labelEle = document.getElementById(labelID);
    if (imgEle) {
        imgEle.src = defImg;
        imgEle.alt = "Open";
        imgEle.title = "Open";
    }
    if (labelEle){
                labelEle.innerHTML = "Show preview";
            }
    var artDiv = document.getElementById(artID);
    if (artDiv) {
        artDiv.style.display = "none";
    }
}

function openPreview(artID, targetURL, absID, id2, id3, imgID, defImg, 
                     flipToImg, labelID, remLnks) {
    var artDiv = document.getElementById(artID);
    if (artDiv) {
        if (artDiv.style.display == "block") {
            return closePreview(artID, imgID, defImg, labelID);
        }
        else {
            var imgEle = document.getElementById(imgID);
            var labelEle = document.getElementById(labelID);
            if (imgEle) {
                imgEle.src = flipToImg;
                imgEle.alt = "Close";
                imgEle.title = "Close";
            }
            if (labelEle){
                labelEle.innerHTML = "Close preview";
            }
            getContent(targetURL, artID, id2, id3);
        }
    }

    var absDiv = document.getElementById(absID);
    if(absDiv) {
        absDiv.style.display = "block";
        var absURLOn = document.getElementById(absID+"-on");
        var absURLOff = document.getElementById(absID+"-off");
        if(absURLOn) { absURLOn.style.display="none"; }
        if(absURLOff) { absURLOff.style.display=""; }
    }
    
}

function getContent(targetURL, updateID, id2, id3) {

    var updateDiv = document.getElementById(updateID);
    if (updateDiv) {
        if(updateDiv.innerHTML.length == 0) {
            updateDiv.innerHTML = '<b>LOADING....</b>';
            targetURL = targetURL.replace(/\#/g,'%23');
            jQuery("#"+updateID).load(targetURL);
        }
        updateDiv.style.display = "block";
    }
    var updateURLOn = document.getElementById(updateID+"-on");
    var updateURLOff = document.getElementById(updateID+"-off");
    if(updateURLOn) { updateURLOn.style.display="none"; }
    if(updateURLOff) { updateURLOff.style.display=""; }

    var div2 = document.getElementById(id2);
    var div3 = document.getElementById(id3);
    if(div2) {
       div2.style.display = "none";
    }
    if(div3) {
       div3.style.display = "none";
    }
    var id2On = document.getElementById(id2+"-on");
    var id2Off = document.getElementById(id2+"-off");
    if(id2On) { id2On.style.display=""; }
    if(id2Off) { id2Off.style.display="none"; }

    var id3On = document.getElementById(id3+"-on");
    var id3Off = document.getElementById(id3+"-off");
    if(id3On) { id3On.style.display=""; }
    if(id3Off) { id3Off.style.display="none"; }
}
//END previewWindow.js

//START fontSizeChanger.js
function fontSizeAdd(elemId, fontURL) {
  var active = getFontStyle(elemId);
  switch (active) {
    case 'font1' :
      setActiveStyle('font2', elemId, fontURL);
      break;
    case 'font2' :
      setActiveStyle('font3', elemId, fontURL);
      break;
    case 'font3' :
      setActiveStyle('font4', elemId, fontURL);
      break;
    case 'font4' :
      setActiveStyle('font5', elemId, fontURL);
      break;
    case 'font5' :
      break;
    default :
      setActiveStyle('font3', elemId, fontURL);
      break;
  }
}

function fontSizeMinus(elemId, fontURL) {
  var active = getFontStyle(elemId);
  switch (active) {
    case 'font5' :
      setActiveStyle('font4', elemId, fontURL);
      break;
    case 'font4' :
      setActiveStyle('font3', elemId, fontURL);
      break;
    case 'font3' :
      setActiveStyle('font2', elemId, fontURL);
      break;
    case 'font2' :
      setActiveStyle('font1', elemId, fontURL);
      break;
    case 'font1' :
       break;
    default :
      setActiveStyle('font3', elemId, fontURL);
      break;
  }
}

function getFontStyle(elemId) {
  var x = document.getElementById(elemId);
  if(!x) {return 'fontDefault';}
  var z = x.className;
  return z;
}

function setActiveStyle(fontClass, elemId, fontURL) {
  var x = document.getElementById(elemId);
  if(!x) {return;}
  var z = x.className;
  if(z != fontClass) {
    var fontId;
    switch (fontClass) {
    case 'font5' :
      fontId = 5;
      break;
    case 'font4' :
      fontId = 4;
      break;
    case 'font3' :
      fontId = 3;
      break;
    case 'font2' :
      fontId = 2;
      break;
    case 'font1' :
      fontId = 1;
      break;
    default :
      fontId = 3;
      break;
    }
    var url = "/" + fontURL + "/fontsize/" + fontId;
    $.get(url);
    x.className=fontClass;
  }
}
document.getElementsByClassName = function(cl) {
var retnode = [];
var myclass = new RegExp('\\b'+cl+'\\b');
var elem = this.getElementsByTagName('*');
                for (var i = 0; i < elem.length; i++) {
                                var classes = elem[i].className;
                                if (myclass.test(classes)) retnode.push(elem[i]);
                }
return retnode;
};

function fontSizeAddIm(elemId, fontURL) {
  var active = getFontStyle(elemId);
  var obj;
  var captObj;
  switch (active) {
    case 'font1' :
      obj = document.getElementsByClassName("height1");
      captObj = document.getElementsByClassName("innerCaption heightCapt1");
      for(j=0;j<obj.length;j++){
        obj[j].className= "height2";
        captObj[j].className= "innerCaption heightCapt2";
      }
      setActiveStyle('font2', elemId, fontURL);
      break;
    case 'font2' :
      obj = document.getElementsByClassName("height2");
      captObj = document.getElementsByClassName("innerCaption heightCapt2");
      for(j=0;j<obj.length;j++){
        obj[j].className= "height3";
        captObj[j].className= "innerCaption heightCapt3";
      }
      setActiveStyle('font3', elemId, fontURL);
      break;
    case 'font3' :
      obj = document.getElementsByClassName("height3");
      captObj = document.getElementsByClassName("innerCaption heightCapt3");
      for(j=0;j<obj.length;j++){
        obj[j].className= "height4";
        captObj[j].className= "innerCaption heightCapt4";
      }
      setActiveStyle('font4', elemId, fontURL);
      break;
    case 'font4' :
      obj = document.getElementsByClassName("height4");
      captObj = document.getElementsByClassName("innerCaption heightCapt4");
      for(j=0;j<obj.length;j++){
        obj[j].className= "height5";
        captObj[j].className= "innerCaption heightCapt5";
      }
      setActiveStyle('font5', elemId, fontURL);
      break;
    case 'font5' :
      break;
    default :
      setActiveStyle('font3', elemId, fontURL);
      break;
  }
}

function fontSizeMinusIm(elemId, fontURL) {
  var active = getFontStyle(elemId);
  var obj;
  var captObj;
  switch (active) {
    case 'font5' :
      obj = document.getElementsByClassName("height5");
      captObj = document.getElementsByClassName("innerCaption heightCapt5");
      for(j=0;j<obj.length;j++){
        obj[j].className= "height4";
        captObj[j].className= "innerCaption heightCapt4";
      }      
      setActiveStyle('font4', elemId, fontURL);
      break;
    case 'font4' :
     obj = document.getElementsByClassName("height4");
     captObj = document.getElementsByClassName("innerCaption heightCapt4");
      for(j=0;j<obj.length;j++){
        obj[j].className= "height3";
        captObj[j].className= "innerCaption heightCapt3";
      }    
      setActiveStyle('font3', elemId, fontURL);
      break;
    case 'font3' :
     obj = document.getElementsByClassName("height3");
     captObj = document.getElementsByClassName("innerCaption heightCapt3");
      for(j=0;j<obj.length;j++){
        obj[j].className= "height2";
        captObj[j].className= "innerCaption heightCapt2";
      }    
      setActiveStyle('font2', elemId, fontURL);
      break;
    case 'font2' :
     obj = document.getElementsByClassName("height2");
     captObj = document.getElementsByClassName("innerCaption heightCapt2");
      for(j=0;j<obj.length;j++){
        obj[j].className= "height1";
        captObj[j].className= "innerCaption heightCapt1";
      }    
      setActiveStyle('font1', elemId, fontURL);
      break;
    case 'font1' :
       break;
    default :
      setActiveStyle('font3', elemId, fontURL);
      break;
  }
}
//END fontSizeChanger.js

//BEGIN embedLoad.js
var EMBED_APA = 0;
var EMBED_APB = 1;
var EMBED_APC = 2;
var EMBED_SRA = 3;
var EMBED_SRB = 4;

var doc = document;

var SDembedItems = new Array();
 SDembedItems[EMBED_APA] = new Array();
 SDembedItems[EMBED_APB] = new Array();
 SDembedItems[EMBED_APC] = new Array();
 SDembedItems[EMBED_SRA] = new Array();
 SDembedItems[EMBED_SRB] = new Array();

function SDeItem(inThirdPartyURL, embedLoc, moduleHeight, 
            moduleWidth, displayBorder, displayScrollBar,
            messaging)
{
  this.myID                = SDembedItems[embedLoc].length;
  this.myThirdPartyURL     = inThirdPartyURL;
  this.embedLocation       = embedLoc;
  this.myFrame             = null;
  this.myTimer             = 0;
  this.myTimeOutMilliSec   = 10000;
  this.moduleHeight        = moduleHeight;
  if (moduleWidth.search("%") != -1) {
     this.moduleWidth         = moduleWidth;
  } else {
     this.moduleWidth         = moduleWidth + "px";
  }
  this.displayBorder       = displayBorder;
  this.displayScrollBar    = displayScrollBar; 
  this.messaging           = messaging;
  this.myStatusDiv         = null;
  this.containerFrame      = null;
}
//_____________________________________________________________________________________

function loadEmbedContent(embedLoc, divID) 
{
   var debug;
   var embedDiv = document.getElementById(divID);
   
   if (SDembedItems[embedLoc].length) 
   {
       embedDiv.style.display = "block";
   }

   if (location.href.indexOf("debug") > 0 )
   { 
      debug = getNamedQueryParameter(location.href, "debug")
   }
   else
   {
      debug = "false";
   }

   for (j=0; j<SDembedItems[embedLoc].length; j++)
   {
      if (SDembedItems[embedLoc][j].messaging == 'Y') 
      {
         loadContainerIFrame(SDembedItems[embedLoc][j].embedLocation,
                             SDembedItems[embedLoc][j].myID,
                             debug,
                             embedDiv);
      } 
      else 
      {
         loadThirdPartyIFrame(SDembedItems[embedLoc][j].myThirdPartyURL,
                              SDembedItems[embedLoc][j].embedLocation,
                              SDembedItems[embedLoc][j].myID,
                              debug,
                              embedDiv);
      }
   } 
}

//____________________________________________________________________________________

function loadContainerIFrame(embedLocation,
                             ID,
                             debug,
                             embedDiv) {

   var mySDeItem = getSDeItem(embedLocation, ID);

   //Outer Div
   var myDiv = document.createElement("div");
   if (ID != 0)
       { myDiv.style.paddingTop = "15px"; }

   //Container IFrame
   var frameIdName = "thirdPartyContainer" + embedLocation;
   frameIdName += ID;
   var myFrame = document.createElement("iframe");
   myFrame.id=frameIdName;
   myFrame.setAttribute("name", frameIdName);
   var containerURL = containerIFrameHTMLUrl;
   containerURL += "?embedLoc="+embedLocation +"&myID=" + ID+"&debug="+debug;
   myFrame.src = containerURL;
   myFrame.marginWidth = 0;
   myFrame.marginHeight = 0;
   myFrame.scrolling="no";
   if (debug == "true")
   {
      myFrame.style.width = mySDeItem.moduleWidth + "px";
      myFrame.style.height = "100px";
   }
   else
   {
      myFrame.style.display = "none";
   }

   if (mySDeItem.displayBorder == 'Y')
   {
      myFrame.style.border = "1px solid #c2c2c2";
   }
   else
   {
      if (navigator.appName == "Microsoft Internet Explorer")
         { myFrame.setAttribute("frameBorder", "0"); } 
      else
         { myFrame.frameBorder = 0; } 
   } 

   myDiv.appendChild(myFrame); 
   if (embedDiv) 
   {
     embedDiv.appendChild(myDiv);
   }

   mySDeItem.containerFrame = myFrame;
}

//_____________________________________________________________________________________

function loadThirdPartyIFrame(thirdPartyURL,
                              embedLocation,
                              ID,
                              debug,
                              embedDiv)
{
   var doc = document;
   var mySDeItem = getSDeItem(embedLocation, ID);
   //Outer Div
   var myDiv = document.createElement("div");

   var myFrame = document.createElement("iframe");

   if (mySDeItem.displayBorder == 'Y')
   {
      myFrame.style.border = "1px solid #c2c2c2";
   }
   else
   {
      if (navigator.appName == "Microsoft Internet Explorer")
         { myFrame.setAttribute("frameBorder", "0"); }
      else
         { myFrame.frameBorder = 0; }
   }

   if (mySDeItem.displayScrollBar == 'Y')
      { myFrame.scrolling = "yes"; }
   else if (mySDeItem.displayScrollBar == 'N')
      { myFrame.scrolling = "no"; }
   else
      { myFrame.scrolling = "auto"; } 

   // For Debug module
   var myStatusDiv;
   if (debug == "true")
   {
      myStatusDiv = document.createElement("div");
   }
   if (myStatusDiv) {
      myDiv.appendChild(myStatusDiv);
      myStatusDiv.id = "thirdPartyStatus";
      if (navigator.appName == "Microsoft Internet Explorer")
      {
         myStatusDiv.style.setAttribute("cssText",
            "height:100px;width:" +mySDeItem.moduleWidth+ ";overflow:auto;"
            + "text-align:left;border:1px solid #c2c2c2;");
      }
      else
      {
         myStatusDiv.setAttribute("style",
            "height:100px;width:" +mySDeItem.moduleWidth+ ";overflow:auto;"
            + "text-align:left;border:1px solid #c2c2c2;");
      }
      mySDeItem.myStatusDiv = myStatusDiv;
   }

   myDiv.appendChild(myFrame);

   if (embedDiv)
   {
      embedDiv.appendChild(myDiv);
   } 

   if (ID != 0)
      { myDiv.style.paddingTop = "15px"; }

   //ThirdParty IFrame
   var frameId = "thirdPartyIframe" + embedLocation;
   frameId += ID;
   myFrame.id = frameId;
   myFrame.setAttribute("name", frameId);
   myFrame.src = thirdPartyURL;
   myFrame.setAttribute("height", mySDeItem.moduleHeight);
   myFrame.setAttribute("width", mySDeItem.moduleWidth);
   myFrame.marginWidth = 0;
   myFrame.marginHeight = 0;
   myFrame.style.display = "none";

   if (navigator.appName == "Microsoft Internet Explorer")
      { myFrame.onreadystatechange= function(e){thirdPartyContentLoaded(e, embedLocation, ID);}; }
   else
      { myFrame.onload = function(e){thirdPartyContentLoaded(e, embedLocation, ID);}; }

   mySDeItem.myFrame = myFrame;

   if (debug == "true") 
   {
      mySDeItem.pushMessage("SD Host created hidden Partner IFrame without"
                    + " messaging interface -  Waiting on Partner content", doc);
   }

   //TimeOut
   mySDeItem.createThirdPartyTimeOut(doc);

}

//_________________________________________________________________________________________________

function thirdPartyContentLoaded(e, embedLoc, id)
{
   var doc = document;
   var mySDeItem = null;
   mySDeItem = getSDeItem(embedLoc, id);
   var loadStatus=null;
   if (e && (typeof e.type != 'undefined'))
   {
      loadStatus = e.type;
   }
   else
   {
      var localEvt = event;
      if (localEvt)
      {
         if (localEvt.srcElement)
         {
            if (localEvt.srcElement.readyState)
            {
               loadStatus = localEvt.srcElement.readyState;
            }
         }
      }
   }
   if (loadStatus)
   {
      if (   ("load"     == loadStatus)
          || ("complete" == loadStatus))
      {
          mySDeItem.cancelThirdPartyTimeOut(doc); 
          mySDeItem.myFrame.style.display = "block";
          mySDeItem.pushMessage("SD Host processed Partner IFrame"
                             + "onLoad event (Partner content displayed).", doc);
      }
   }
}

//____________________________________________________________________________________________________________

function getSDeItem(embedLoc, inID)
{
   var index = -1;
   if ("number" == typeof(inID))
   {
      index = inID;
   }
   else if ("string" == typeof(inID))
   {
      index = parseInt(inID);
   }
   if ((inID >= 0) && (inID < SDembedItems[embedLoc].length))
   {
      return SDembedItems[embedLoc][inID];
   }
   else
   {
      return null;
   }
}

//_____________________________________________________________________________________________

SDeItem.prototype.createThirdPartyTimeOut = function(doc) {
   var self = this;
   this.myTimer = setTimeout(function(){self.handleThirdPartyTimeOut(doc);}, 
                                                            self.myTimeOutMilliSec);
   this.pushMessage( "Timeout for ID " + this.myID + " set for " + self.myTimeOutMilliSec/1000 + " seconds.", doc);
}

//_____________________________________________________________________________________________

SDeItem.prototype.cancelThirdPartyTimeOut = function(doc) {

   if (0 != this.myTimer)
   {
      clearTimeout(this.myTimer);
      this.pushMessage( "Timer cancelled for ID " + this.myID + ".", doc);
   }
}

//____________________________________________________________________________________________

SDeItem.prototype.handleThirdPartyTimeOut = function(doc) {

    if (this.myFrame) {
      this.myFrame.parentNode.removeChild(this.myFrame);
      this.pushMessage("SD Host removed Partner IFrame - TimeOut Occured", doc);
    }

    if (this.containerFrame) 
    {
       if (this.myStatusDiv)
       {
          this.containerFrame.style.height = this.myStatusDiv.offsetHeight + "px";
       }
       else
       {
          this.containerFrame.style.display = "none";
       }
    }
}

//______________________________________________________________________________________________

SDeItem.prototype.pushMessage = function (inMessage, doc, skipBr)
{
if (this.myStatusDiv)
   {
      var message;
      if (skipBr != 1)
      {
         message = "<br/>";
      }
      message += inMessage + "-";
      message += calculateUTCTime();
      var msgSpan = doc.createElement("span");
      this.myStatusDiv.appendChild(msgSpan);
      msgSpan.innerHTML = message;
   }
}

//_______________________________________________________________________________________________

function calculateUTCTime() {
   var utcDateTime;
   var d = new Date();
   var utcDate = d.getUTCDate();
   var utcMonth = d.getUTCMonth();
   var utcYear = d.getUTCFullYear();
   var utcHour = d.getUTCHours();
   var utcMin = d.getUTCMinutes();
   var utcSec = d.getUTCSeconds();
   utcDateTime = utcDate + "-" + utcMonth + "-" + utcYear + " ";
   var a_p = "AM";
   if (utcHour == 0)
   {
      utcHour = 12;
   }
   if (utcHour > 12)
   {
      utcHour = utcHour - 12;
      a_p = "PM"
   }
   utcMin = utcMin + "";
   if (utcMin.length == 1)
   {
      utcMin = "0" + utcMin;
   }
   utcSec = utcSec + "";
   if (utcSec.length == 1)
   {
      utcSec = "0" + utcSec;
   }
   utcDateTime += utcHour + ":" + utcMin + ":"+ utcSec + " " + a_p;
   return utcDateTime;
}

//_____________________________________________________________________________________________

SDeItem.prototype.updateStatus = function(inMessage, doc)
{
   this.cancelThirdPartyTimeOut(doc);
   if ((inMessage.length >= 2) && ("OK" == inMessage.substr(0,2)))
   {
      this.myFrame.style.display = "block";
      this.pushMessage("SD Host Receiving status OK from partner IFrame", doc);
      var newHeight = 0;
      if (inMessage.length > 3)
      {
         var heightString = inMessage.substr(3);
         newHeight = parseInt(heightString);
      }
      if (newHeight > 0)
      {
         this.pushMessage("SD Host Received request for change of height to " 
                          + newHeight + "pixels", doc);
         if (newHeight < this.moduleHeight)
         {
            if (null != this.myFrame)
            {
               this.myFrame.style.height = newHeight + "px";
               this.pushMessage("SD Host resized Partner IFrame to " 
                                 + newHeight + " pixels", doc);

            }
         }
         else
         {
            newHeight = this.moduleHeight;
            this.pushMessage(  "Ignoring resize of height("
                             + newHeight
                             + ") pixels -- MAX is ("
                             + this.moduleHeight
                             + ").", doc);
         }
      }
      if (this.containerFrame)
      {
         if (this.myStatusDiv)
         {
            // 100, here is fixed embed debug window height
            // total container ifreme height is 100 (debug window) +
            // 3rd party height
            var height = 100 + newHeight;
            this.containerFrame.style.height = height + "px";
         } 
         else
         {
            this.containerFrame.style.height = newHeight + "px" ;
         }
      } 
   }
   else if ("NO" == inMessage)
   {
      this.pushMessage("SD Host Receiving status NO from partner IFrame", doc);
      if (this.myFrame)
      {
         this.myFrame.parentNode.removeChild(this.myFrame);
         this.pushMessage("SD Host removed Partner IFrame - on Request.", doc);
      }
      
      if (this.containerFrame)
      {
         if (this.myStatusDiv)
         {
            this.containerFrame.style.height = 100 + "px";
         }
         else
         {
            this.containerFrame.style.display = "none";
         }
      } 
   }
}

//____________________________________________________________________________________________

function getNamedQueryParameter(inURL, inName)
{
   var outParm = "";
   var queryIndex = inURL.indexOf("?");
   var parmIndex = inURL.indexOf(inName, queryIndex+1);
   if (parmIndex > 0)
   {
      parmIndex += inName.length;
      while ((parmIndex >= 0) && ('=' != inURL.charAt(parmIndex)))
      {
         parmIndex = inURL.indexOf(inName, parmIndex+1);
         if (parmIndex > 0)
         {
            parmIndex += inName.length;
         }
      }
      if ('=' == inURL.charAt(parmIndex))
      {
         parmIndex++;
         var endIndex = parmIndex+1;
         while (   (endIndex < inURL.length)
                && ('&' != inURL.charAt(endIndex))
                && ('#' != inURL.charAt(endIndex)))
         {
            endIndex++;
         }
         if (endIndex > parmIndex)
         {
            outParm = inURL.substring(parmIndex,endIndex);
         }
      }
   }
   return outParm;
}
//END embedLoad.js

//BEGIN printArticle.js
function printArticle(pageURL) {

    var displaySetting="toolbar=no,location=no,directories=no,menubar=no,"; 
    displaySetting+="scrollbars=yes,width=650, height=600, left=100, top=25"; 

    var articleHead = document.getElementById("artihead").innerHTML;
    var contentValue = document.getElementById("articleBody").innerHTML; 

    var hideButton = '<div align="right"><input  id="hideButton" type="button" value="Hide Figures" onclick="hideOrShowFigures()">'; 
    var printButton = '<input  id="printButton"  type="button" value="Print" onclick="javascript:printPage()"> </div>';

    var styleType = '<link rel="stylesheet" href="'+pageURL + '/page/static/stylesheets/css_art_v01.css" type="text/css">';

    styleType += '<style type="text/css"> .body{color : #000000 !important;text-decoration : none !important;background : #ffffff !important ;} .articleTitle{Font-Size: 100%!important;}';
    styleType += '.articleHeaderInner a {color : #000000 !important;}';
    styleType += '.articleHeaderInner{margin-right:0px !important;} </style>'; 

    var javaScript = '<script language="javascript" src="'+pageURL + '/page/javascript/printpreview.js" type="text/javascript"></script>';
    var docprint=window.open("","",displaySetting); 
    docprint.document.open(); 
    docprint.document.write('<html><meta http-equiv="Content-Type" content="text/html"; charset="UTF-8"/><meta name="keywords" content="Printer Friendly Article Preview" /><head><title>Print Article</title>'); 
    docprint.document.write('</head><body onLoad="hideImg()">');
    docprint.document.write(styleType);
    docprint.document.write(javaScript);
    docprint.document.write(hideButton);
    docprint.document.write(printButton);
    docprint.document.write(articleHead);
    docprint.document.write(contentValue);          

    docprint.document.write('</body></html>'); 
    docprint.document.close(); 
    docprint.focus(); 
}
//END printArticle.js

//BEGIN collab.js
var collabTimer;
var collabKeyEventURL;
var collabJsStr = "";
var collabCssStr = "";
var collabHtmlStr = "";

function copyCollab() {
  return(collabJsStr + collabHtmlStr);
}
function hideDiv(id) {
  document.getElementById(id).style.display = 'none';
}
function stop2CollabTimeout() {
  clearTimeout(collabTimer);
  document.getElementById("CollabBoxContent").innerHTML = this.copyCollab();
}
function collabKE(targetUrl) {
  var url;
  url = collabKeyEventURL;
  url += targetUrl;

//  new Ajax.Request(url, {method:'get'});
  $.get(url);
}
//END collab.js

//BEGIN reflect_sd.js
//    Reflect JavaScript Library
//    ===========================
//
//    Written by: Sven Haag | EMBL
//    Version: 1.2 from Nov. 24, 2009
//    Homepage: http://reflect.ws
//    Purpose: Reflect a webpage (without using a plugin)

var Reflect = {
  /* Append all given Scripts (JS or CSS) to the document header */
  appendScriptsToHeader : function(headerData) {
    try {
      var headNode = document.getElementsByTagName('head')[0];
  
      //Check if a head node exists. If not append one.
      if(!headNode) 
      { 
        //html page without "head"
        head = document.createElement('head');
        document.appendChild(head);
        headNode = document.getElementsByTagName('head')[0];
      }
      
      //Append all javascript and css files to the html header
      var script = null;
      var strRegex = "https?://[a-zA-Z0-9-_ \+\?\.\(\)\&/~]*(js|css)[\"|']";
      var re = new RegExp(strRegex, "ig");
      var reJS =new RegExp(".js[\"|']", "ig");
      var reCSS = new RegExp(".css[\"|']", "ig");
      var arrMatch = headerData.match(re);
      for(var i=0; i<arrMatch.length; i++)
      {
        script = document.createElement('script');
        script.setAttribute('src', arrMatch[i].substring(0, arrMatch[i].length-1));
        if (arrMatch[i].match(reJS) != null)
        {
          script.setAttribute('type', 'text/javascript');
          headNode.appendChild(script);
        }
        else if (arrMatch[i].match(reCSS) != null)
        {
          script.setAttribute('type', 'text/css');
          headNode.appendChild(script);
        }
      }
    }
    catch (e) {
      if (Reflect.verbose)
        alert('Reflect: Error while appendig scripts to the webpage header:' + '\nError name: ' + e.name + '.\nError message: ' + e.message + '.\nIf this error has occured in the past, please contact us by email: contact@reflect.ws');
    }
  }
};

//END reflect_sd.js
var MMCvVIDEO = 0;
var MMCvAUDIO = 1;
var MMCvOTHER = 2;
var MMC_TYPE_COUNT = 3;
var EXISTING_TAB_COUNT = -1;
var MMCvComponents = new Array();
 MMCvComponents[MMCvVIDEO] = new Array();
 MMCvComponents[MMCvAUDIO] = new Array();
 MMCvComponents[MMCvOTHER] = new Array();
var MMCvCaptionReplaceImg = "";

//BEGIN multimedia.js
var shiftEnabled = 1;
var shiftAmountRemaining = 0;
var shiftAmountPerIteration = 0;
var shiftDirection = 0;
var outComponent = 0;
var inComponent = 0;
var timeoutID1 = 0;
var timeoutID2 = 0;
var MMCvTitleHeaderRow = 0;
var MMCvRow = 0;
var MMCvOuterContainer = 0;
var MMCvTitleObject = 0;
var MMCvRefHovsObject = 0;
var MMCvTabsObject = 0;
var MMCvSelectorObject = 0;
var MMCvViewerObject = 0;
var MMCvViewBackingObject = 0;
var MMCvLABEL = 0;
var MMCvCAPTION = 1;
var MMCvIMAGE = 2;
var MMCvDATA_CNT = 3;
var currentMMCtype = -1;
var currentMMCindex = 0;
var MMCvCSelector = '';
var MMCvCViewerStart = '';
var MMCvCViewerEnd = '';
var MMCvSelectorHTML = new Array();
 MMCvSelectorHTML[MMCvVIDEO] = "";
 MMCvSelectorHTML[MMCvAUDIO] = "";
 MMCvSelectorHTML[MMCvOTHER] = "";
var MMCvSelectorLists = new Array();
 MMCvSelectorLists[MMCvVIDEO] = null;
 MMCvSelectorLists[MMCvAUDIO] = null;
 MMCvSelectorLists[MMCvOTHER] = null;
var MMCvSelectorItems = new Array();
 MMCvSelectorItems[MMCvVIDEO] = null;
 MMCvSelectorItems[MMCvAUDIO] = null;
 MMCvSelectorItems[MMCvOTHER] = null;
var MMCvSelectorCollapseItems = new Array();
 MMCvSelectorCollapseItems[MMCvVIDEO] = null;
 MMCvSelectorCollapseItems[MMCvAUDIO] = null;
 MMCvSelectorCollapseItems[MMCvOTHER] = null;
var MMCvSelectorPrevInactive = null;
var MMCvSelectorPrevActive = null;
var MMCvSelectorNextInactive = null;
var MMCvSelectorNextActive = null;
var audioPlayerWidth = 318;
var audioPlayerHeight = 29;
var videoPlayerWidth = 320;
var videoPlayerHeight = 266;
var reqFlashVersion = "9.0.0";
var videoNoFlashWidth = 318;
var videoNoFlashHeight = 260;
var MMCvBottom = 0;

// MMCv Selector Indexing notes... watch indexing (0..N-1) components vs (1..N) selectors
var gapLSelectorStart = -1;
var gapLSelectorEnd = -1;
var gapRSelectorStart = -1;
var gapRSelectorEnd = -1;
var MMCvSelectorMidWidth = 8;
var MMCinitialized = 0;
var MMCvSizerHTML;
MMCvSizerHTML = '<div style="overflow: hidden; width: 0px; height: 0px;"><div class="MMCvCaption" id="MMCvSizer1">1</div></div>';
var MMCvSizer1 = null;
var MMCvHeight1Prev = 0;
var MMCvHeight1Line = 0;
var MMCvImageMaxHeight = 50;
var MMCvImageMaxWidth = 50;
var MMCvVideoImageMaxHeight = 165; 
var MMCvVideoImageMaxWidth = 320; 
var MMCvHeightImageMax = MMCvImageMaxHeight + 15; // pad
var MMCvVideoCaptionHeight = 36;
var MMCvVideoCaptionHeightMax = MMCvVideoCaptionHeight + 15; //pad
var MMCvCaptionImageReplaceHeight = 30;
var MMCvCaptionImageReplaceWidth = 100;
var MMCvHeightLessPhrase = 0;
var MMCvHeightMorePhrase = 0;
var MMCvHeightLessCaption = 0;
var MMCvHeightStandardCaption = 0;
var MMCvHeightComponentWrapper = 0;
var MMCvWidthComponent = 340;
var MMCvuniqueAnchorIndex = 0;
var currentSourceAnchorName = "";
var MMCvTabHidden = 0;

var flashPlayerVersion = DetectFlashVer("9","0","0");

var MMC = {
  init: function() {
    if(flashPlayerVersion != 'supported') {
      $(".MMCvInstallFP").css('display', 'inline');
      var fpimgs = $(".MMCvInstallFPIMG").each(function() {
          $(this).html("<img src='" + $(this).attr('dImgURL') + "&reason=" + flashPlayerVersion + "' style='display:none'>");
          $(this).css('display', 'inline');
          });
    }
  
    $(".MMCvOTHER").each(function() {
      var mo=$(this);
      MMCvComponents[MMCvOTHER][MMCvComponents[MMCvOTHER].length] = new MMCvComponent(mo.attr("id"),
                                                                                      mo.attr("mmcArticleImageURL"),
                                                                                      mo.attr("mmcImageURL"),
                                                                                      mo.attr("customThumbHeight"),
                                                                                      mo.attr("customThumbWidth")
                                                                                      );
    });
    
    $(".MMCvVIDEO").each(function() {
      var mo = $(this);
      MMCvComponents[MMCvVIDEO][MMCvComponents[MMCvVIDEO].length] = new MMCvComponent(mo.attr("id"),
                                                                                      mo.attr("mmcArticleImageURL"),
                                                                                      mo.attr("mmcImageURL"),
                                                                                      mo.attr("customThumbHeight"),
                                                                                      mo.attr("customThumbWidth")
                                                                                      );
      MMCvComponents[MMCvVIDEO][MMCvComponents[MMCvVIDEO].length-1].MMCvFlashVars = mo.attr("MMCvFlashVars");
    });

    $(".MMCvAUDIO").each(function() {
      var mo = $(this);
      MMCvComponents[MMCvAUDIO][MMCvComponents[MMCvAUDIO].length] = new MMCvComponent(mo.attr("id"),
                                                                                      mo.attr("mmcArticleImageURL"),
                                                                                      mo.attr("mmcImageURL"),
                                                                                      mo.attr("customThumbHeight"),
                                                                                      mo.attr("customThumbWidth")
                                                                                      );
      MMCvComponents[MMCvAUDIO][MMCvComponents[MMCvAUDIO].length-1].MMCvFlashVars = mo.attr("MMCvFlashVars");
    });

   
  } //init
} //MMC


MMCvImageDimensions.prototype.getDimensions = function(inImage)
{
 this.width = 0;
 this.height = 0;
 if (inImage.naturalWidth)
 { this.width = inImage.naturalWidth;
   this.height = inImage.naturalHeight;
 }
 else 
 { //_Save Styling
  var saveClassName = inImage.className;
  var saveStyleWidth = inImage.style.width;
  var saveStyleHeight = inImage.style.height;
  var saveStyleBorderWidth = inImage.style.borderWidth;
  var saveStylepadding = inImage.style.padding;
  var saveAttrWidth = inImage.getAttribute('width');
  var saveAttrHeight = inImage.getAttribute('height');
  //_Remove styling
  inImage.className = '';
  inImage.style.width = 'auto';
  inImage.style.height = 'auto';
  inImage.style.borderWidth = '0';
  inImage.style.padding = '0';
  inImage.removeAttribute('width');
  inImage.removeAttribute('height');
  //_Get real dims 
  this.width = parseInt(inImage.width);
  this.height = parseInt(inImage.height);
  //_Reset styling
  inImage.setAttribute('width', saveAttrWidth );
  inImage.setAttribute('height', saveAttrHeight );
  inImage.style.width = saveStyleWidth;
  inImage.style.height = saveStyleHeight;
  inImage.style.padding = saveStylepadding;
  inImage.style.borderWidth = saveStyleBorderWidth;
  inImage.className = saveClassName;
 }
}

function MMCvHide()
{
 if ((null != MMCvRow) && (!MMCvTabHidden) && (MMCinitialized))
 {
//  MMCvTitleObject.style.display = "none";
  document.getElementById("mmcTL").style.display = "none";
  document.getElementById("mmcTR").style.display = "none";
  document.getElementById("multiMediaContentTitle").style.display = "none";
  MMCvRefHovsObject.style.display = "none";
  MMCvTabsObject.style.display = "none";
  MMCvSelectorObject.style.display = "none";
  MMCvViewerObject.style.display = "none";
  MMCvViewBackingObject.style.display = "none";
  MMCvOuterContainer.style.display = "none";
  MMCvBottom.style.display = "none";
  MMCvTabHidden = 1;
 }
}

function MMCvShow()
{
 if ((null != MMCvRow) && (MMCvTabHidden) && (MMCinitialized))
 {
  document.getElementById("mmcTL").style.display = "block";
  document.getElementById("mmcTR").style.display = "block";
  document.getElementById("multiMediaContentTitle").style.display = "block";
  MMCvOuterContainer.style.display = "block";
//  MMCvTitleObject.style.display = "block";
  MMCvRefHovsObject.style.display = "block";
  MMCvTabsObject.style.display = "block";
  MMCvSelectorObject.style.display = "block";
  MMCvViewBackingObject.style.display = "block";
  MMCvViewerObject.style.display = "block";
  MMCvBottom.style.display = "block";
  MMCvTabHidden = 0;
 }
}

function MMCvSelectorList(typeID, inNode, inIndex)
{
 if ("undefined" == inIndex)
 { inIndex = 0; }
 this.myID = typeID;
 this.MMCvNode = inNode;
 this.currentIndex = inIndex;
}

MMCvComponent.prototype.showSelf = function()
{ 
 if (null != this.MMCvNode)
 { this.MMCvNode.style.left = 0; }
 else
 { this.initialize(1); }
 this.resetCaptionHeight();
}

MMCvComponent.prototype.hideSelf = function()
{
 if (null != this.MMCvNode)
 { this.MMCvNode.style.left = MMCvWidthComponent + "px"; }
}

MMCvComponent.prototype.initialize = function(showSelf)
{
 var sourceAnchors;
 var newNode;
 var newAttribute;
 if ("undefined" == showSelf)
 { showSelf = 0; }
 if (null == this.MMCvNode)
 {
  if (this.myID.indexOf("VIDEO") > -1)
  { this.myType = MMCvVIDEO; }
  else if (this.myID.indexOf("AUDIO") > -1)
  { this.myType = MMCvAUDIO; }
  else
  { this.myType = MMCvOTHER; }
  this.sourceNode = document.getElementById(this.myID).parentNode;
  if (null != this.sourceNode)
  {
   sourceAnchors = getElementsByClassName(this.sourceNode, 'A', 'MMCvANCHOR_SRC');
   if (0 == sourceAnchors.length)
   {
    newNode = document.createElement('a');
    if (null != newNode)
    {
     MMCvuniqueAnchorIndex++;
     var anchorName = "MMCvA_" + MMCvuniqueAnchorIndex;
     newAttribute = document.createAttribute("name");
     if  (null != newAttribute)
     {
      newAttribute.nodeValue = anchorName;
      newNode.setAttributeNode(newAttribute);
      newAttribute = null;
     }
     newNode.id = anchorName;
     newNode.className = 'MMCvANCHOR_SRC';
     this.sourceNode.insertBefore(newNode, this.sourceNode.firstChild);
     newNode = null;
    }
   }
   this.MMCvNode = this.getMyNode();
   if (this.MMCvNode)
   {
    MMCvViewerObject.insertBefore(this.MMCvNode, MMCvViewerObject.firstChild);
    if(!isAAI2Disabled && this.MMCvFlashVars){
     this.embedPlayerWidget();
    }
    if (MMCvHeightStandardCaption > 0)
    { this.resetCaptionHeight(); }
    if (showSelf)
    { this.MMCvNode.style.left = 0; }
   }
  }
 }
}

MMCvComponent.prototype.repositionInnerRefHovs = function (inNode)
{
 var j;
 var refPreviewNode;
 for (j=0; j < inNode.childNodes.length;)
 {
  if (inNode.childNodes[j].nodeType == 1)
  { // Only work on ELEMENT_NODE's
   if (inNode.childNodes[j].className.indexOf("refPreview") >= 0)
   {
    refPreviewNode = inNode.removeChild(inNode.childNodes[j]);
    MMCvRefHovsObject.appendChild(refPreviewNode);
   }
   else
   { this.repositionInnerRefHovs(inNode.childNodes[j]); j++; }
  }
  else
  { j++; }
 }
}

MMCvComponent.prototype.augmentMMCvElementHierarchy = function (inNode)
{
 if (inNode.nodeType != 1) // ELEMENT node
 { return; }
 var prependString = "MMCvUn";
 var idValue = inNode.id;
 var nameValue = inNode.getAttribute("name");
 var index;
 var oldTempContainerNode;
 var newTempContainerNode;
 var replacementNode;
 var innerMMCvRefLinkHTML;
 var inNodeToBeReplaced = 0;
 var replaceImgTblNode = 0;
 var newInnerMMCvRefLinkHTML = "";
 var j;
 if ((null != idValue) && ("" != idValue) && ("undefined" != idValue))
 { inNode.id = prependString + idValue; }
 if ((null != nameValue) && ("" != nameValue) && ("undefined" != nameValue))
 {
  nameValue = prependString + nameValue;
  inNode.removeAttribute('name');
  inNode.setAttribute("name", nameValue);
 }
 if ("A" == inNode.tagName)
 {
  if (inNode.className.indexOf("MMCvREFLINK_SRC") >= 0)
  {
   oldTempContainerNode = document.createElement('div');
   if (null != oldTempContainerNode)
   {
    inNode.parentNode.replaceChild(oldTempContainerNode, inNode);
    oldTempContainerNode.appendChild(inNode);
    innerMMCvRefLinkHTML = oldTempContainerNode.innerHTML;
    index = innerMMCvRefLinkHTML.indexOf("RefPreview.showRef(");
    if (index >= 0)
    {  
     index += 19;  // Length of RefPreview... string
     index = innerMMCvRefLinkHTML.indexOf(",", index);  // Skip parm 1
     if (index >= 0)
     {
      index += 1; 
      index = innerMMCvRefLinkHTML.indexOf(",", index);  // Skip parm 2
      if (index >= 0)
      {
       index += 1;
       while ((' ' == innerMMCvRefLinkHTML.charAt(index))
              || ('    ' == innerMMCvRefLinkHTML.charAt(index)))
       { index++; }
       if  (('"' == innerMMCvRefLinkHTML.charAt(index))
            || ("'" == innerMMCvRefLinkHTML.charAt(index)))
       { index++; } // opening quote
       // found insertionPoint
       newInnerMMCvRefLinkHTML  = innerMMCvRefLinkHTML.substr(0,index);
       newInnerMMCvRefLinkHTML += prependString;
       newInnerMMCvRefLinkHTML += innerMMCvRefLinkHTML.substr(index);
       newTempContainerNode = document.createElement('div');
       newTempContainerNode.innerHTML = newInnerMMCvRefLinkHTML;
       replacementNode = newTempContainerNode.removeChild(
                                          newTempContainerNode.firstChild);
       // newTempContainerNode is now garbage
       inNodeToBeReplaced = 1;
      }
     }
    }
    if (!inNodeToBeReplaced)
    { replacementNode = oldTempContainerNode.removeChild(inNode); }
    oldTempContainerNode.parentNode.replaceChild(replacementNode, 
                                                 oldTempContainerNode);
    inNode = replacementNode;
   }
  }
 }
 else if ("IMG" == inNode.tagName)
 {
  var tNode = inNode.cloneNode(0);
  var tHideDiv = document.createElement('div');
  tHideDiv.style.width = "0";
  tHideDiv.style.height = "0";
  tHideDiv.style.overflow = "hidden";
  tHideDiv.appendChild(tNode);
  MMCvViewerObject.appendChild(tHideDiv);
  var imageDimensions = new MMCvImageDimensions();
  imageDimensions.getDimensions(tNode);
  if ((imageDimensions.width  > MMCvCaptionImageReplaceWidth)
      || (imageDimensions.height > MMCvCaptionImageReplaceHeight))
  { replaceImgTblNode = 1; }
  MMCvViewerObject.removeChild(tHideDiv);
 }
 else if ("TABLE" == inNode.tagName)
 { replaceImgTblNode = 1; }
 if (replaceImgTblNode)
 {
  var newImgNode = document.createElement('img');
  newImgNode.setAttribute('src', MMCvCaptionReplaceImg);
  newImgNode.setAttribute('width', '10');
  newImgNode.setAttribute('height', '9');
  newImgNode.setAttribute('alt', 'other content');
  newImgNode.style.border = '0px';
  var newANode = document.createElement('A');
  newANode.setAttribute('href', currentSourceAnchorName);
  newANode.style.border = "0px";
  newANode.appendChild(newImgNode);
  var parent = inNode.parentNode;
  parent.replaceChild(newANode, inNode);
  return; 
 }
 for (j=0; j < inNode.childNodes.length; j++)
 { this.augmentMMCvElementHierarchy(inNode.childNodes[j]); }
}

MMCvComponent.prototype.getMyNode = function ()
{
 var newNode = null;
 if ((this.myType < 0) || (MMC_TYPE_COUNT <= this.myType))
 { return newNode; }
 var mmcLinkHref = "";
 var mmcImgSrc   = "";
 var mmcImgAlt   = "";
 var mmcImgTitle = "";
 var mmcLinkName = "";
 var mainSrcTableLinks = getElementsByClassName(this.sourceNode, 'TABLE', this.myID);
 var mainSrcLinks = getElementsByClassName(mainSrcTableLinks[0], 'A', 'MMCvLINK');
 if (0 == mainSrcLinks.length)
 { return newNode; }
 var mainSrcMMCs = getElementsByClassName(mainSrcTableLinks[0], 'IMG', 'MMCvIMAGE_SRC');
 var sourceAnchors = getElementsByClassName(this.sourceNode, 'A', 'MMCvANCHOR_SRC');
 mmcLinkHref = mainSrcLinks[0].getAttribute("href");
 mmcLinkHref += "?MMCv=widget";
 mmcLinkName = sourceAnchors[0].name;
 if (mainSrcMMCs.length){
 mmcImgSrc   = mainSrcMMCs[0].getAttribute("src");
 mmcImgAlt   = mainSrcMMCs[0].getAttribute("alt");
 mmcImgTitle = mainSrcMMCs[0].getAttribute("title");
 this.sourceDimensions.getDimensions(mainSrcMMCs[0]);
 var widthScaling = 1;
 var heightScaling = 1;
 var scalingAxis = 'none';
 if (this.sourceDimensions.width > MMCvVideoImageMaxWidth)
 {
  widthScaling = this.sourceDimensions.width / MMCvVideoImageMaxWidth;
  scalingAxis = 'width';
 }
 if (this.sourceDimensions.height > MMCvImageMaxHeight)
 {
  heightScaling = this.sourceDimensions.height / MMCvVideoImageMaxHeight;
  if (heightScaling > widthScaling)
  { scalingAxis = 'height'; }
 }
 }

/*  To check "Thumbnail" image's height, width and to resize it if greater than maximum height, width .
 
   The imageString will be used to display the "Thumbnail/icon" image for the Video content ( without FLV) and to display the icon image in the widget if FLV content exists but not playable. 
   
   Since the "Icon" image will be in (50*50) which is lesser than the "Thumbnail" images maximum height and width . The icon image will not be resized and it will be displayed as it is.

 */

  if (this.imageHeight != '0' && this.imageWidth != '0') {
   videoImageText = "Click image to view video (opens in new window)";
  } else {
   videoImageText = "Click icon to view video (opens in new window)";
  }

  var videoErrorString = '<div style="width: '+ videoNoFlashWidth +'px; height: '+ videoNoFlashHeight +'px;"><div class="MMCvError">';
  videoErrorString += "To view this video, you need to download the <a href='http://get.adobe.com/flashplayer'>latest Adobe&reg; Flash Player</a>.<br><br>";
  videoErrorString += "Note: You can download the original video using the \"Download this Video\" link below or view it in a new window by clicking the video icon below. <br><br>";
  var imageString = "<a onclick=\"openNS('" + mmcLinkHref + "',700,500); return false;\" style=\"cursor:pointer\"><img src='" + mmcImgSrc + "'";
  //var imageString = "<a href=\""+mmcLinkHref+"\" style=\"cursor:pointer\"><img src='" + mmcImgSrc + "'";
 if ("none" != scalingAxis)
 {
  if ("width" == scalingAxis)
  { imageString += " width='" + MMCvVideoImageMaxWidth + "'"; }
  if ("height" == scalingAxis)
  { imageString += " height='" + MMCvVideoImageMaxHeight + "'"; }
 }
 if ("" != mmcImgAlt)
 { imageString += " alt='" + mmcImgAlt + "'"; }
 if ("" != mmcImgTitle)
 { imageString += " title='" + mmcImgTitle + "'"; }
 imageString += " style='border:0px;";
 if ("none" != scalingAxis)
 {
  if ("width" == scalingAxis)
  { imageString += " width: " + MMCvVideoImageMaxWidth + ";" + " height: " + this.sourceDimensions.height/widthScaling +";"; }
  if ("height" == scalingAxis)
  { imageString += " height: " + MMCvVideoImageMaxHeight + ";" + " width: " + this.sourceDimensions.height/heightScaling +";"; } 
 }
 imageString += "'/></a>";
 videoErrorString += imageString;
 videoErrorString += '</div></div>';

 // The message that will be displayed for Audio content, when FlashPlayer is not installed.

 var errorString = 'To listen to this audio, you need to download the <a href="http://get.adobe.com/flashplayer">latest Adobe&reg; Flash Player</a>.<br><br>';
 errorString += "Note: You can download and play the original audio using the \"Download this Audio\" link or by clicking the audio icon below.";

 var noCaptionErrorString = 'To listen to this audio, you need to download the <a href="http://get.adobe.com/flashplayer">latest Adobe&reg; Flash Player</a>.<br><br>';
  noCaptionErrorString += "Note: You can download and play the audio using the \"Download this Audio\" link or by clicking the audio icon below.";


 var audioErrorString = "<div class='MMCvAudioError'>"+errorString+"</div>";

 var componentClassName = "";
 componentClassName = 'MMCv';
 if (MMCvVIDEO == this.myType)
 { componentClassName += 'Video'; }
 else if (MMCvAUDIO == this.myType)
 { componentClassName += 'Audio'; }
 else 
 { componentClassName += 'Other'; }
 componentClassName += 'Component';
 newNode = document.createElement('div');
 if (null == newNode)
 { return newNode; }
 newNode.className = componentClassName;

 var downloadPhrase;
 if(MMCvVIDEO == this.myType)
  {downloadPhrase = "Video";}
 else if (MMCvAUDIO == this.myType)
  {downloadPhrase = "Audio";}
 else
  {downloadPhrase = "File";}

 var captionExists = getElementsByClassName(this.sourceNode, 'SPAN', 'MMCvCAPTION_SRC');

 var htmlString = ""; 
 var flashId = this.myID + "WIDGET";
 if (MMCvVIDEO == this.myType){
  if (this.MMCvFlashVars){
   htmlString += '<div class="MMCvVideoPlayerArea"><div class="MMCvVideoPlayerWrapper"><div id ="'+ flashId +'"  class="MMCvVideoPlayer">'+videoErrorString+'</div></div></div>';
  }else{
   htmlString += '<div class="MMCvVideoImageArea"><div class="MMCvVideoImageWrapper"><div class="MMCvVideoImage">';
   htmlString += imageString + '<br/>';
   htmlString += videoImageText;
   htmlString += '</div></div></div>';
  }
  htmlString += '<div class="MMCvVideoCaptionArea"><div class="MMCvVideoCaptionWrapper"><div class="MMCvVideoCaption"></div></div><div class="MMCvMoreWrapper"><a href="#" class="showMoreMMCvCaption" style="cursor:pointer">More...</a></div><div class="MMCvLessWrapper"><a href="#" class="showLessMMCvCaption" style="cursor:pointer">Less</a></div></div>';
  }else{
   if (!captionExists.length && MMCvAUDIO == this.myType && flashPlayerVersion != "supported" && !isAAI2Disabled) {
    htmlString += '<div class="MMCvAudioErrorNoCaption">'+noCaptionErrorString;
    htmlString += "<br/><br/><a href=\""+mmcLinkHref+"\" onclick=\"openNS('" + mmcLinkHref + "',700,500); return false;\" style=\"cursor:pointer\"><img src='"+ this.articleImageURL +"' border ='0'/></a><br/><br/></div>";
   }else{
    htmlString += '<div class="MMCvAudioOtherWrapper">';
   if ( MMCvAUDIO == this.myType && flashPlayerVersion != "supported" && !isAAI2Disabled) {
    htmlString += audioErrorString; 
   }
   htmlString += '<div class="MMCvCaptionArea"><div class="MMCvCaptionWrapper"><div class="MMCvCaption"></div></div><div class="MMCvMoreWrapper"><a href="#" class="showMoreMMCvCaption" style="cursor:pointer">More...</a></div><div class="MMCvLessWrapper"><a href="#" class="showLessMMCvCaption" style="cursor:pointer">Less</a></div></div><div class="MMCvImageArea"><div class="MMCvImage">';
  if ( MMCvAUDIO == this.myType && flashPlayerVersion != "supported" && !isAAI2Disabled) {
   htmlString += "<a href=\""+mmcLinkHref+"\" onclick=\"openNS('" + mmcLinkHref + "',700,500); return false;\" style=\"cursor:pointer\"><img src='"+ this.articleImageURL +"' border ='0'";
  }else {
   htmlString += "<a href=\""+mmcLinkHref+"\" onclick=\"openNS('" + mmcLinkHref + "',700,500); return false;\" style=\"cursor:pointer\"><img src='"+ this.thumbURL +"' border ='0'";
  }
  if (this.imageHeight != '0' && this.imageWidth != '0'){
   htmlString += "width=\""+ this.imageWidth+ "\" height =\""+ this.imageHeight+"\"/></a></div></div>";
  }else{
   htmlString += "/></a></div></div>";
  }
  if (MMCvAUDIO == this.myType && !isAAI2Disabled && flashPlayerVersion == "supported"){
   htmlString += '<div class="MMCvAudioPlayerWrapper"><div id ="'+flashId+'"  class="MMCvAudioPlayer"></div></div></div>';
  }else{
   htmlString += '</div>';
  }
 }
}
 htmlString +='<div class="MMCvViewDownloadWrapper"><div class="MMCvDownload">' + "<a href = '" + mmcLinkHref + "' onclick=\"openNS('" + mmcLinkHref + "',700,500); return false;\" style=\"cursor:pointer\">Download this "+downloadPhrase+"<\a>" + '</div><div class="MMCvViewWithin">' + "<a href='#" + mmcLinkName + "'>View within " + MMCvDocLabel + '</a></div></div>';
 newNode.innerHTML = htmlString;
 if (MMCvVIDEO == this.myType){
  caption = 'MMCvVideoCaption';
 }else{
  caption = 'MMCvCaption';
 }
 var newCaptionNodes = getElementsByClassName(newNode, 'DIV', caption);
 var newCaptionNode = newCaptionNodes[0];
 // To support DTD data
 var parentNode;
 var parentNodeClass;
 var mainLabels = getElementsByClassName(this.sourceNode, 'SPAN', 'MMCvLABEL_SRC');
 if (mainLabels.length) {
  for (i=0; i < mainLabels.length; i++) 
   {
    parentNode = mainLabels[i].parentNode;
    parentNodeClass = parentNode.getAttribute('class');
    if(!parentNodeClass) { parentNodeClass = parentNode.getAttribute('className'); }
     if (parentNodeClass && parentNodeClass != 'MMCvCAPTION_SRC') {
      var clonedLabelNode =  mainLabels[i].cloneNode(1);
      newCaptionNode.appendChild(clonedLabelNode);
      var spaceNode = document.createTextNode('.\u00A0');
      if (null != spaceNode) {
       newCaptionNode.appendChild(spaceNode);
      }
     }
   }
 }
 var mainCaptions = getElementsByClassName(this.sourceNode, 'SPAN', 'MMCvCAPTION_SRC');
 var mmcLabels;
 var mmcLabelLinks;
 var clonedCaptionNode;
 var newLabelLinkNode;
 var breakElement;
 var i;
 for (i=0; i < mainCaptions.length; i++)
 {
  clonedCaptionNode = mainCaptions[i].cloneNode(1);
  mmcLabels = getElementsByClassName(clonedCaptionNode, 'SPAN', 'MMCvLABEL_SRC');
  if (mmcLabels.length)
  {
   mmcLabelLinks = clonedCaptionNode.getElementsByTagName('A');
   if (0 == mmcLabelLinks.length)
   {
    newLabelLinkNode = document.createElement('a');
    if (null == newLabelLinkNode)
    { return null; }
    newLabelLinkNode.setAttribute('href', mmcLinkHref);
    while (null != mmcLabels[0].firstChild)
    {
     newLabelLinkNode.appendChild( mmcLabels[0].removeChild(mmcLabels[0].firstChild));
    }
    mmcLabels[0].appendChild(newLabelLinkNode);
   } else {
    mmcLabelLinks[0].href = mmcLinkHref;
    mmcLabelLinks[0].onclick = function(){openNS(mmcLinkHref,700,500);return false;};
   }
  }
  currentSourceAnchorName = "#" + mmcLinkName; 
  this.augmentMMCvElementHierarchy(clonedCaptionNode);
  currentSourceAnchorName = "";
  this.repositionInnerRefHovs(clonedCaptionNode);
  newCaptionNode.appendChild(clonedCaptionNode);
 }
 return newNode;
}

MMCvComponent.prototype.resetCaptionHeight = function ()
{
 var captionWrapper;
 var caption;
 if (MMCvVIDEO == this.myType){
  captionWrapper = 'MMCvVideoCaptionWrapper';
  caption = 'MMCvVideoCaption';
 }else{
  captionWrapper = 'MMCvCaptionWrapper';
  caption = 'MMCvCaption';
 }
 var currentMMC = this.MMCvNode;
 var currentCaptionWrapperElements = getElementsByClassName( currentMMC, 'DIV', captionWrapper);
 if (currentCaptionWrapperElements.length)
 {
  var currentCaptionElements = getElementsByClassName( currentCaptionWrapperElements[0], 'DIV', caption);
  if (currentCaptionElements.length)
  {
   var currentLessCaptionElements = getElementsByClassName( currentMMC, 'DIV', 'MMCvLessWrapper');
   if ('block' == currentLessCaptionElements[0].style.display)
   {
    if (currentCaptionElements[0].offsetHeight > MMCvHeightStandardCaption)
    {
     currentCaptionWrapperElements[0].style.height = currentCaptionElements[0].offsetHeight + MMCvHeightLessPhrase;
    }
    else
    {
     currentCaptionWrapperElements[0].style.height = MMCvHeightStandardCaption + "px";
     currentLessCaptionElements[0].style.display = 'none';
    }
   }
   else
   {
    var currentMoreCaptionElements = getElementsByClassName( currentMMC, 'DIV', 'MMCvMoreWrapper');
    if (currentCaptionElements[0].offsetHeight > MMCvHeightStandardCaption)
    {
     currentCaptionWrapperElements[0].style.height = MMCvHeightLessCaption + "px";
     currentMoreCaptionElements[0].style.display = 'block';
    }
    else
    {
     currentCaptionWrapperElements[0].style.height = MMCvHeightStandardCaption + "px";
     currentMoreCaptionElements[0].style.display = 'none';
    }
   }
  }
 }
 return 1;
}

function MMCvGetTitle() {
  var htmlString = '<div id="mmcTL" class="boxTopLeftCorner"></div><div id="multiMediaContentTitle" class="greyHeader">Supplementary content for this ' + MMCvDocLabel + '</div><div id="mmcTR" class="boxTopRightCorner"></div>';
  return htmlString;
}

function MMCvGetFooter() {
  var footImgPath = document.getElementById('footerImgPath').getAttribute('src');
  var htmlString = '<img align="bottom" src="/scidirimg/rc_box_bottom.gif" alt=" ">';
  return htmlString;
}

function MMCvGetTabs() {
 var EXISTING_TAB_COUNT = 0;
 var htmlString = "";
 var activeTab = MMC_TYPE_COUNT; // NOT_SET
 if (MMCvComponents[MMCvVIDEO].length)
 {
  if (MMC_TYPE_COUNT == activeTab)
  { activeTab = MMCvVIDEO; }
  EXISTING_TAB_COUNT++;
 }
 if (MMCvComponents[MMCvAUDIO].length)
 {
  if (MMC_TYPE_COUNT == activeTab)
  { activeTab = MMCvAUDIO; }
  EXISTING_TAB_COUNT++;
 }
 if (MMCvComponents[MMCvOTHER].length)
 {
  if (MMC_TYPE_COUNT == activeTab)
  { activeTab = MMCvOTHER; }
  EXISTING_TAB_COUNT++;
 }

 if (EXISTING_TAB_COUNT >= 2)
 {
  htmlString  = '<div id="multiMediaTabs" class="MMCvTabs">';
  if (MMCvComponents[MMCvVIDEO].length)
  {
   htmlString += '<span id="MMCvVideoTab" class="MMCvTab';
   if (MMCvVIDEO == activeTab)
   { htmlString += 'Active'; }
   htmlString += '"><a onclick="goToMMCvTab(MMCvVIDEO);">Video ('+MMCvComponents[MMCvVIDEO].length+')</a> </span>';
  }
  if (MMCvComponents[MMCvAUDIO].length)
  {
   htmlString += '<span id="MMCvAudioTab" class="MMCvTab';
   if (MMCvAUDIO == activeTab)
   { htmlString += 'Active'; }
   htmlString += '"><a onclick="goToMMCvTab(MMCvAUDIO);">Audio ('+MMCvComponents[MMCvAUDIO].length+')</a> </span>';
  }
  if (MMCvComponents[MMCvOTHER].length)
  {
   htmlString += '<span id="MMCvOtherTab" class="MMCvTab';
   if (MMCvOTHER == activeTab)
   { htmlString += 'Active'; }
   htmlString += '"><a onclick="goToMMCvTab(MMCvOTHER);">Other Files ('+MMCvComponents[MMCvOTHER].length+')</a> </span>';
  }
  htmlString += '</div>';
 }
 else {
   htmlString  = '<div id="multiMediaTabs" class="MMCvNoTabs"></div>';
 }
 return htmlString;
}

function MMCvGetSelector()
{
 var htmlString = '<div id="multiMediaSelector" class="MMCvSelector"></div>';
 return htmlString;
}

function MMCvGetViewerStart()
{
 var htmlString ='<div id="multiMediaViewBacking" class="MMCvViewBacking"><div id="multiMediaViewer" class="MMCvViewer">';
 return htmlString;
}

function MMCvGetViewerEnd()
{
 var htmlString = '</div></div>';
 return htmlString;
}

function MMCvLookForFontChangeEvents()
{
 MMCvHeight1Line = parseInt(MMCvSizer1.offsetHeight);
 if (MMCvHeight1Line != MMCvHeight1Prev) 
 {
  MMCvHeight1Prev = MMCvHeight1Line;
  MMCvCalculateHeights();
  MMCvComponents[currentMMCtype][currentMMCindex].resetCaptionHeight();
  resetContainerHeights(MMCvComponents[currentMMCtype][currentMMCindex].MMCvNode);
  resizeSelectorArrows();
 }
 timeoutID2 = setTimeout("MMCvLookForFontChangeEvents()", 1000);
}

function MMCvCalculateHeights()
{
 var i;
 var j;
 var currentMMC;
 var moreHeightObjectFound = 0;
 var lessHeightObjectFound = 0;
 var viewWithinHeightObjectFound = 0;
 var moreCaptionElements;
 var lessCaptionElements;
 var viewWithinElements;
 var saveSetting;
 var MMCvMorePhraseObject;
 var MMCvLessPhraseObject;
 var MMCvViewWithinPhraseObject;
 var MMCvHeightViewWithinPhrase = 0;
 for (i=0; i < MMC_TYPE_COUNT; i++)
 {
  for (j=0; j < MMCvComponents[i].length; j++)
  {
   MMCvComponents[i][j].initialize();
   if (null != MMCvComponents[i][j].MMCvNode)
   {
    currentMMC = MMCvComponents[i][j].MMCvNode;
    if (!moreHeightObjectFound)
    {
     moreCaptionElements = getElementsByClassName(currentMMC,'DIV','MMCvMoreWrapper');
     if (moreCaptionElements.length)
     {
      MMCvMorePhraseObject = moreCaptionElements[0];
      saveSetting = 'none';
      if (MMCvMorePhraseObject.style.display)
      { saveSetting = MMCvMorePhraseObject.style.display; }
      MMCvMorePhraseObject.style.display = 'block';
      MMCvHeightMorePhrase = MMCvMorePhraseObject.offsetHeight;
      MMCvMorePhraseObject.style.display = saveSetting;
      moreHeightObjectFound = 1;
     }
    }
    if (!lessHeightObjectFound)
    {
     lessCaptionElements = getElementsByClassName(currentMMC,'DIV','MMCvLessWrapper');
     if (lessCaptionElements.length)
     {
      MMCvLessPhraseObject = lessCaptionElements[0];
      saveSetting = 'none';
      if (MMCvLessPhraseObject.style.display)
      { saveSetting = MMCvLessPhraseObject.style.display; }
      MMCvLessPhraseObject.style.display = 'block';
      MMCvHeightLessPhrase = MMCvLessPhraseObject.offsetHeight;
      MMCvLessPhraseObject.style.display = saveSetting;
      lessHeightObjectFound = 1;
     }
    }
    if (!viewWithinHeightObjectFound)
    {
     viewWithinElements = getElementsByClassName(currentMMC,'DIV','MMCvViewWithin');
     if (viewWithinElements.length)
     {
      MMCvViewWithinPhraseObject = viewWithinElements[0];
      MMCvHeightViewWithinPhrase = MMCvViewWithinPhraseObject.offsetHeight;
      viewWithinHeightObjectFound = 1;
     }
    }
    if (moreHeightObjectFound && lessHeightObjectFound )
    {
     i = MMC_TYPE_COUNT-1;
     j = MMCvComponents[i].length-1;
    }
   }
  }
 }
 MMCvHeightStandardCaption = MMCvHeightImageMax;
 return 1;
}

function embedPlayerArticle()
{
 var i;
 for (i=0; i< MMCvComponents[MMCvVIDEO].length; i++)
 {
  if (null != MMCvComponents[MMCvVIDEO][i].MMCvFlashVars)
  {
   var faceId = MMCvComponents[MMCvVIDEO][i].myID + "FLASH";
   var id = MMCvComponents[MMCvVIDEO][i].myID;
   myNode = document.getElementById(id).parentNode;
   var installFlashTag = getElementsByClassName(myNode, "SPAN", "MMCvInstallFP");
   if (installFlashTag.length){
    installFlashTag[0].innerHTML = "To view the video inline, you need to <a href='http://get.adobe.com/flashplayer'>download the latest Adobe&reg; Flash Player</a>. However, you can download and view the video by clicking on the icon below."
   }
   var flashvars = false;
   var params = { menu: "false",
                  play: "false",
          bgcolor: "0xFFF",
                  allowscriptaccess:"always",
                  allowFullScreen:"true",
                  wmode: "opaque",
                  flashvars: MMCvComponents[MMCvVIDEO][i].MMCvFlashVars
                };

   swfobject.embedSWF(videoPlayerUrl
                    , faceId
                    , videoPlayerWidth 
                    , videoPlayerHeight 
                    , reqFlashVersion 
                    , false
                    , flashvars
                    , params);
   }
 }
 for (i=0; i< MMCvComponents[MMCvAUDIO].length; i++)
 {
  if (null != MMCvComponents[MMCvAUDIO][i].MMCvFlashVars)
  {
   var faceId = MMCvComponents[MMCvAUDIO][i].myID + "FLASH";
   var id = MMCvComponents[MMCvAUDIO][i].myID;
   myNode = document.getElementById(id).parentNode;
   var installFlashTag = getElementsByClassName(myNode, "SPAN", "MMCvInstallFP");
   if (installFlashTag.length){
    installFlashTag[0].innerHTML = "To listen to this audio, you need to <a href='http://get.adobe.com/flashplayer'>download the latest Adobe&reg;  Flash Player</a>. However, you can download and play the audio by clicking on the icon below."
   }
   var flashvars = false;
   var params = { menu: "false",
                  play: "false",
                  bgcolor: "0xFFF",
                  allowscriptaccess:"always",
                  wmode: "opaque",
                  flashvars: MMCvComponents[MMCvAUDIO][i].MMCvFlashVars
                };
   swfobject.embedSWF(audioPlayerUrl
                       , faceId
                       , audioPlayerWidth 
                       , audioPlayerHeight 
                       , reqFlashVersion 
                       , false
                       , flashvars
                       , params);
    } 
  }
}

MMCvComponent.prototype.embedPlayerWidget = function()
{
  this.MMCvFlashVars += "&MMCv=widget";
  var i = 0;
  var player = videoPlayerUrl;
  var height = videoPlayerHeight;
  var width = videoPlayerWidth;
  if (MMCvAUDIO == this.myType){
   player = audioPlayerUrl;
   height = audioPlayerHeight;
   width = audioPlayerWidth;
  }
  var faceId = this.myID + "WIDGET";
  var flashvars = false;
  var params = { menu: "false",
                 play: "false",
                 bgcolor: "0xFFF",
                 allowscriptaccess:"always",
                 allowFullScreen:"true",
             wmode: "opaque",
             flashvars: this.MMCvFlashVars
               };
     swfobject.embedSWF(player
                        , faceId
            , width 
            , height
                        , reqFlashVersion 
                        , false
            , flashvars
                        , params );
}
function MMCinit()
{
 if (!MMCinitialized)
 {
  if(!isAAI2Disabled)
  {
   embedPlayerArticle();
  }
  var artBody = document.getElementById('articleBody');
  if (artBody != null)
  {var refHovsObject = document.createElement('div');
   refHovsObject.id = "multiMediaRefHovs";
   refHovsObject.className = "MMCvRefHovs";
   artBody.insertBefore(refHovsObject, artBody.firstChild);
  }
  MMCvBottom = document.getElementById('multiMediaBottom');
  MMCvTitleHeaderRow = document.getElementById('mmcTitleHeader');
  if (null == MMCvTitleHeaderRow)
  { return; }
  MMCvRow = document.getElementById('multiMediaViewerRow');
  if (null == MMCvRow)
  { return; }
  MMCvOuterContainer = document.getElementById('multiMediaViewerOuter');
  if (null == MMCvOuterContainer)
  { return; }
  if (!MMCvContentExists())
  { return; }
  var MMCvTitle = MMCvGetTitle();
  MMCvTitleHeaderRow.innerHTML = MMCvTitle;
  var MMCvFooter = MMCvGetFooter();
  MMCvBottom.innerHTML = MMCvFooter; 
  var MMCvContent = MMCvGetTabs();
  MMCvContent += MMCvGetSelector();
  MMCvContent += MMCvGetViewerStart();
  MMCvContent += MMCvSizerHTML;
  MMCvContent += MMCvGetViewerEnd();
  
  MMCvOuterContainer.innerHTML = MMCvContent;
  MMCvRow.style.display="block";
  MMCvBottom.style.display="block";
  MMCvTitleObject = document.getElementById('multiMediaTitle');
  MMCvRefHovsObject = document.getElementById('multiMediaRefHovs');
  MMCvTabsObject = document.getElementById('multiMediaTabs');
  MMCvSelectorObject = document.getElementById('multiMediaSelector');

  if (null == MMCvSelectorObject)
  { MMCvRow.style.display="none"; return; }
  MMCvViewBackingObject = document.getElementById('multiMediaViewBacking');
  if (null == MMCvViewBackingObject)
  { MMCvRow.style.display="none"; return; }
  MMCvViewerObject = document.getElementById('multiMediaViewer');
  if (null == MMCvViewerObject)
  { MMCvRow.style.display="none"; return; }
  MMCvSizer1 = document.getElementById('MMCvSizer1');
  if (null == MMCvSizer1)
  { MMCvRow.style.display="none"; return; }
  MMCvHeight1Line = parseInt(MMCvSizer1.offsetHeight);
  MMCvHeight1Prev = MMCvHeight1Line;
  MMCvCalculateHeights();
  if (MMCvComponents[MMCvVIDEO].length) { goToMMCvTab(MMCvVIDEO); }
  else if (MMCvComponents[MMCvAUDIO].length) { goToMMCvTab(MMCvAUDIO); }
  else if (MMCvComponents[MMCvOTHER].length) { goToMMCvTab(MMCvOTHER); }
  MMCinitialized = 1;
//  MMCvLookForFontChangeEvents();
 }
}
function getMMCvSelectorHTML(tabID) 
{
 var htmlString = "";
 var j;
 if ("" == MMCvSelectorHTML[tabID])
 {
  if (MMCvComponents[tabID].length)
  {
  htmlString = '<div class="MMCvSelectDiv"><span id="MMCvPrevInactive" class="MMCvSelRover">' + "<img src='/scidirimg/prevArrowInactive.gif' width='28px' height='19px' />" + '</span><span id="MMCvPrevActive" class="MMCvSelRover" style="display: none"><span class="MMCvSelectorItem"><a onmouseover="prevArrowOnMouseOver();" onmouseout="prevArrowOnMouseOut();" onclick="shiftMMCvLeft(); return false;" href="#">' + "<img id='prevArrow' src='/scidirimg/prevArrowActive.gif' width='28px' height='19px' alt='Previous item' title='Previous item' />" + '</a></span></span>';
   for (j=0; j < MMCvComponents[tabID].length; j++)
   {
    if ((MMCvComponents[tabID].length-1) == j )
    {
     htmlString += '<a onclick="expandMMCvRight();" class="MMCvSelectorCollapseItem" style="display: none;"> &#8230</a>'; 
    }
    htmlString += '<span class="MMCvSelectorItem"> <a onclick="goToMMCvComponent(' + j + ');">';
    htmlString += j+1
    htmlString += '</a></span>';
    if (0 == j)
    {
     htmlString += '<a onclick="expandMMCvLeft();" class="MMCvSelectorCollapseItem" style="display: none;"> &#8230</a>';
    }
   }
   htmlString += ' <span id="MMCvNextActive" class="MMCvSelRover"';
   if (1 == MMCvComponents[tabID].length)
   { htmlString += ' style="display: none"'; }
   htmlString += '><span class="MMCvSelectorItem"><a onmouseover="nextArrowOnMouseOver();" onmouseout="nextArrowOnMouseOut();" onclick="shiftMMCvRight(); return false" href="#">' + "<img id='nextArrow' src='/scidirimg/nextArrowActive.gif' width='28px' height='19px' alt='Next item' title='Next item' />" + '</a></span></span><span id="MMCvNextInactive" class="MMCvSelRover"';
   if (1 < MMCvComponents[tabID].length)
   { htmlString += ' style="display: none;"'; }
   htmlString += '>'+"<img src='/scidirimg/nextArrowInactive.gif' width='28px' height='19px' />"+'</span></div>';
   MMCvSelectorHTML[tabID] = htmlString;
  }
 }
 return MMCvSelectorHTML[tabID];
}

function mapMMCvSelectorItems(tabID)
{
 MMCvSelectorItems[tabID] = getElementsByClassName(MMCvSelectorObject, 'SPAN', 'MMCvSelectorItem');
 MMCvSelectorCollapseItems[tabID] = getElementsByClassName(MMCvSelectorObject, 'A', 'MMCvSelectorCollapseItem');
}

function saveSelector()
{
 if ((currentMMCtype >= 0) && (currentMMCtype <= MMC_TYPE_COUNT))
 {
  var selectorObject = MMCvSelectorObject.removeChild(MMCvSelectorObject.firstChild);
  if (null == MMCvSelectorLists[currentMMCtype])
  { MMCvSelectorLists[currentMMCtype] = new MMCvSelectorList(currentMMCtype,selectorObject,currentMMCindex); }
  else
  { MMCvSelectorLists[currentMMCtype].currentIndex = currentMMCindex; }
 }
}

function resizeSelectorArrows()
{
 var vw;
 var parentStyle;
 var parentSize;
 var myStyle;
 var currentSize;
 var factor;
 var targetSize = 17.5;
 var rehide = 0;
 if (document.defaultView)
 {
  vw = document.defaultView;
  if (null != MMCvSelectorPrevActive)
  {
   if ('none' == MMCvSelectorPrevActive.style.display)
   {
    MMCvSelectorPrevActive.style.display = 'inline';
    rehide = 1;
   }
   parentStyle = vw.getComputedStyle(MMCvSelectorPrevActive.parentNode,"");
   parentSize = parseFloat(parentStyle.getPropertyValue("font-size"));
   factor = (targetSize / parentSize) * 100;
   MMCvSelectorPrevActive.style.fontSize = factor + "%";
   if (rehide)
   { MMCvSelectorPrevActive.style.display = 'none'; }
  }
  rehide = 0;
  if (null != MMCvSelectorNextActive)
  {
   if ('none' == MMCvSelectorNextActive.style.display)
   { MMCvSelectorNextActive.style.display = 'inline'; rehide = 1; }
   parentStyle = vw.getComputedStyle(MMCvSelectorNextActive.parentNode,"");
   parentSize = parseFloat(parentStyle.getPropertyValue("font-size"));
   factor = (targetSize / parentSize) * 100;
   MMCvSelectorNextActive.style.fontSize = factor + "%";
   if (rehide)
   { MMCvSelectorNextActive.style.display = 'none'; }
  }
 }
 return 1;
}

function resetSelectorArrows()
{
 MMCvSelectorPrevInactive = document.getElementById('MMCvPrevInactive');
 MMCvSelectorPrevActive = document.getElementById('MMCvPrevActive');
 MMCvSelectorNextInactive = document.getElementById('MMCvNextInactive');
 MMCvSelectorNextActive = document.getElementById('MMCvNextActive');
 resizeSelectorArrows();
}

function showSelector()
{
 if (null == MMCvSelectorLists[currentMMCtype])
 {
  MMCvSelectorObject.innerHTML = getMMCvSelectorHTML(currentMMCtype);
  mapMMCvSelectorItems(currentMMCtype);
  resetSelectorArrows();
  updateMMCvSelectorIndex(-1, 0);
 }
 else
 {
  MMCvSelectorObject.appendChild(MMCvSelectorLists[currentMMCtype].MMCvNode);
  resetSelectorArrows();
  updateMMCvSelectorIndex(MMCvSelectorLists[currentMMCtype].currentIndex,0,1);
 }
}

function indexInMMCvSelectorRange(inIndex)
{
 var inRange = 1;
 if (gapLSelectorStart >= 0)
 {
  if ((gapLSelectorStart <= (inIndex +1)) && ((inIndex +1) <= gapLSelectorEnd) )
  { inRange = 0; }
 }
 if ((inRange) && (gapRSelectorStart >= 0))
 {
  if ((gapRSelectorStart <= (inIndex +1)) && ((inIndex +1) <= gapRSelectorEnd) )
  { inRange = 0; }
 }
 return inRange;
}

function updateMMCvSelectorRange(oldIndex, newIndex)
{
 var componentCount = MMCvComponents[currentMMCtype].length;
 if (componentCount <= (MMCvSelectorMidWidth + 4))
 {
  gapLSelectorStart = -1;
  gapLSelectorEnd   = -1;
  gapRSelectorStart = -1;
  gapRSelectorEnd   = -1;
  return;
 }
 var local_gapLSelectorStart = -1;
 var local_gapLSelectorEnd   = -1;
 var local_gapRSelectorStart = -1;
 var local_gapRSelectorEnd   = -1;
 var startDisplayRange       = 3;
 var endDisplayRange         = MMCvSelectorMidWidth+2;
 if ((oldIndex >= 0) && ((newIndex - oldIndex) < MMCvSelectorMidWidth))
 {
  if (oldIndex < newIndex)
  { startDisplayRange = oldIndex + 1; endDisplayRange = newIndex + 1; }
  else
  { startDisplayRange = newIndex + 1; endDisplayRange = oldIndex + 1; }
  var openWidth = MMCvSelectorMidWidth - (endDisplayRange - startDisplayRange + 1);
  if ((startDisplayRange - openWidth) <= 3)
  {
   local_gapLSelectorStart = -1;
   local_gapLSelectorEnd = -1;
   startDisplayRange = 2;
   endDisplayRange = MMCvSelectorMidWidth+2;
   local_gapRSelectorStart = MMCvSelectorMidWidth+3;
   local_gapRSelectorEnd   = componentCount - 1;
  }
  else if ((endDisplayRange + openWidth) >= (componentCount - 2))
  {
   local_gapLSelectorStart = 2;
   local_gapLSelectorEnd = componentCount - (MMCvSelectorMidWidth + 2);
   startDisplayRange = local_gapLSelectorEnd + 1;
   endDisplayRange = componentCount - 1;
   local_gapRSelectorStart = -1;
   local_gapRSelectorEnd   = -1;
  }
  else
  {
   startDisplayRange -= (openWidth / 2);
   endDisplayRange = startDisplayRange + MMCvSelectorMidWidth - 1;
   local_gapLSelectorStart = 2;
   local_gapLSelectorEnd = startDisplayRange - 1;
   local_gapRSelectorStart = endDisplayRange + 1;
   local_gapRSelectorEnd = componentCount - 1;
  }
 }
 else
 {
  if (newIndex < (MMCvSelectorMidWidth+2))
  {
   startDisplayRange = 2;
   endDisplayRange = MMCvSelectorMidWidth+2;
   local_gapLSelectorStart = -1;
   local_gapLSelectorEnd = -1;
   local_gapRSelectorStart = MMCvSelectorMidWidth+3;
   local_gapRSelectorEnd = componentCount - 1;
  }
  else if (newIndex >= (componentCount - (MMCvSelectorMidWidth + 2)))
  {
   local_gapLSelectorStart = 2;
   local_gapLSelectorEnd = componentCount - (MMCvSelectorMidWidth + 2);
   startDisplayRange = local_gapLSelectorEnd + 1;
   endDisplayRange = componentCount - 1;
   local_gapRSelectorStart = -1;
   local_gapRSelectorEnd = -1;
  }
  else 
  {
   local_gapLSelectorStart = 2;
   local_gapLSelectorEnd = newIndex - (MMCvSelectorMidWidth / 2) - 1;
   startDisplayRange = local_gapLSelectorEnd + 1;
   endDisplayRange = startDisplayRange + MMCvSelectorMidWidth - 1;
   local_gapRSelectorStart = endDisplayRange + 1;
   local_gapRSelectorEnd = componentCount - 1;
  }
 }
 resetSelectorDisplay(local_gapLSelectorStart, local_gapLSelectorEnd, startDisplayRange, endDisplayRange, local_gapRSelectorStart, local_gapRSelectorEnd);
}

function resetSelectorDisplay(in_gapLSelectorStart, in_gapLSelectorEnd, in_startDisplayRange, in_endDisplayRange, in_gapRSelectorStart, in_gapRSelectorEnd)
{
 var i;
 if (in_gapLSelectorStart >= 0)
 {  
  MMCvSelectorCollapseItems[currentMMCtype][0].style.display="inline";
  for (i=2; i <= in_gapLSelectorEnd; i++)
  { MMCvSelectorItems[currentMMCtype][i].style.display="none"; }
 }
 else
 {
  MMCvSelectorCollapseItems[currentMMCtype][0].style.display="none";
 }
 //___ Show links in range.
 for (i=in_startDisplayRange; i <= in_endDisplayRange; i++)
 {
  MMCvSelectorItems[currentMMCtype][i].style.display="inline";
 }
 if (in_gapRSelectorStart >= 0)
 {  
  for (i=in_gapRSelectorStart; i <= (in_gapRSelectorEnd); i++)
  { MMCvSelectorItems[currentMMCtype][i].style.display="none"; }
  MMCvSelectorCollapseItems[currentMMCtype][1].style.display="inline";
 }
 else
 { MMCvSelectorCollapseItems[currentMMCtype][1].style.display="none"; }
 gapLSelectorStart = in_gapLSelectorStart;
 gapLSelectorEnd   = in_gapLSelectorEnd;
 gapRSelectorStart = in_gapRSelectorStart;
 gapRSelectorEnd   = in_gapRSelectorEnd;
}

function expandMMCvLeft()
{
 var componentCount = MMCvComponents[currentMMCtype].length;
 var local_gapLSelectorStart = -1;
 var local_gapLSelectorEnd   = -1;
 var local_gapRSelectorStart = -1;
 var local_gapRSelectorEnd   = -1;
 var endDisplayRange = gapLSelectorEnd;
 var startDisplayRange = endDisplayRange - MMCvSelectorMidWidth + 1;

 if (startDisplayRange <= 3)
 { endDisplayRange += 3 - startDisplayRange; startDisplayRange = 1; }
 else
 { local_gapLSelectorStart = 2; local_gapLSelectorEnd   = startDisplayRange - 1; }
 if (endDisplayRange < (componentCount-2))
 { local_gapRSelectorStart = endDisplayRange + 1; local_gapRSelectorEnd   = componentCount-1; }
 else
 { endDisplayRange = componentCount-1; }
 resetSelectorDisplay(local_gapLSelectorStart, local_gapLSelectorEnd, startDisplayRange, endDisplayRange, local_gapRSelectorStart, local_gapRSelectorEnd);
 goToMMCvComponent(startDisplayRange-1);
}

function expandMMCvRight()
{
 var componentCount = MMCvComponents[currentMMCtype].length;
 var local_gapLSelectorStart = -1;
 var local_gapLSelectorEnd   = -1;
 var local_gapRSelectorStart = -1;
 var local_gapRSelectorEnd   = -1;
 var startDisplayRange = gapRSelectorStart; 
 var endDisplayRange = startDisplayRange + MMCvSelectorMidWidth - 1;
 if (endDisplayRange >= (componentCount - 2))
 { startDisplayRange -= (endDisplayRange - (componentCount-2)); endDisplayRange = componentCount - 1; }
 else
 { local_gapRSelectorStart = endDisplayRange + 1; local_gapRSelectorEnd   = componentCount - 1; }
 if (startDisplayRange > 3)
 { local_gapLSelectorStart = 2; local_gapLSelectorEnd   = startDisplayRange-1; }
 else
 { startDisplayRange = 2; }
 resetSelectorDisplay(local_gapLSelectorStart, local_gapLSelectorEnd, startDisplayRange, endDisplayRange, local_gapRSelectorStart, local_gapRSelectorEnd);
 goToMMCvComponent(startDisplayRange-1);
}

function updateMMCvSelectorIndex(oldIndex, newIndex, resetFlag)
{
 if ("undefined" == resetFlag)
 { resetFlag = 0; }

 if ((null != MMCvSelectorPrevInactive) && (null != MMCvSelectorPrevActive))
 {
  if ((0 == oldIndex) && (0 < newIndex))
  {
   MMCvSelectorPrevInactive.style.display = "none";
   MMCvSelectorPrevActive.style.display = "inline"
  }
  else if ((0 < oldIndex) && (0 == newIndex))
  {
   MMCvSelectorPrevInactive.style.display = "inline";
   MMCvSelectorPrevActive.style.display = "none"
  }
 }

 if ((null != MMCvSelectorNextInactive) && (null != MMCvSelectorNextActive))
 {
  if (((MMCvComponents[currentMMCtype].length-1) == oldIndex) && ((MMCvComponents[currentMMCtype].length-1) > newIndex))
  {
   MMCvSelectorNextInactive.style.display = "none";
   MMCvSelectorNextActive.style.display = "inline"
  }
  else if (((MMCvComponents[currentMMCtype].length-1) > oldIndex) && ((MMCvComponents[currentMMCtype].length-1) == newIndex))
  {
   MMCvSelectorNextInactive.style.display = "inline";
   MMCvSelectorNextActive.style.display = "none"
  }
 }
 if (oldIndex >= 0)
 { MMCvSelectorItems[currentMMCtype][oldIndex+1].style.fontWeight="normal"; }
 if (resetFlag)
 { oldIndex = -1; }
 if ((oldIndex < 0) || (! indexInMMCvSelectorRange(newIndex)))
 { updateMMCvSelectorRange(oldIndex, newIndex); }
 MMCvSelectorItems[currentMMCtype][newIndex+1].style.fontWeight="bold";
}

function getTabObject(tabID) 
{
 var lookForName='';
 if (MMCvVIDEO == tabID)
 { lookForName = 'Video'; }
 else if (MMCvAUDIO == tabID)
 { lookForName = 'Audio'; }
 else if (MMCvOTHER == tabID)
 { lookForName = 'Other'; }
 if ('' == lookForName)
 { return null; }
 var lookForTabName = 'MMCv' + lookForName + 'Tab';
 return document.getElementById(lookForTabName);
}

function swapTabs(tabID) 
{
 if ((currentMMCtype != tabID) && (tabID >= 0) && (tabID <= MMC_TYPE_COUNT))
 {
  if (currentMMCtype >= 0)
  {
   MMCvComponents[currentMMCtype][currentMMCindex].stopPlayer();
   var prevTab = getTabObject(currentMMCtype);
   if (null != prevTab)
   { prevTab.className = 'MMCvTab'; }
  }
  saveSelector();
  if ((currentMMCtype >= 0) && (currentMMCindex >= 0))
  {
   MMCvComponents[currentMMCtype][currentMMCindex].hideSelf();
  }
  currentMMCtype  = tabID;
  currentMMCindex = 0;
  var nextTab = getTabObject(tabID);
  if (null != nextTab)
  { nextTab.className = 'MMCvTabActive'; }
  showSelector();
  MMCvComponents[currentMMCtype][currentMMCindex].showSelf();
 }
}

function goToMMCvTab(tabID) 
{
 if(MMCvVIDEO == tabID){
   MMCvHeightStandardCaption = MMCvVideoCaptionHeightMax;
 }else{
   MMCvHeightStandardCaption = MMCvHeightImageMax;
 }
 if (MMCvHeightStandardCaption < (MMCvHeightMorePhrase + MMCvHeight1Line))
 {  // Force at least one line of caption and more phrase to be visible.
  MMCvHeightStandardCaption = MMCvHeightMorePhrase + MMCvHeight1Line;
 }
 MMCvHeightLessCaption = MMCvHeightStandardCaption - MMCvHeightMorePhrase;
 MMCvHeightComponentWrapper = MMCvHeightStandardCaption;
 swapTabs(tabID);
 MMCvComponents[currentMMCtype][currentMMCindex].resetCaptionHeight();
 resetContainerHeights(MMCvComponents[currentMMCtype][currentMMCindex].MMCvNode);
}

function showMoreMMCvCaption() 
{
 var captionWrapper;
 var caption;
 if (MMCvVIDEO == currentMMCtype) {
   captionWrapper = 'MMCvVideoCaptionWrapper';
   caption = 'MMCvVideoCaption';
 }else{
   captionWrapper = 'MMCvCaptionWrapper';
   caption = 'MMCvCaption';
 }
 var currentMMC = MMCvComponents[currentMMCtype][currentMMCindex].MMCvNode;
 var moreCaptionHeight = 0;
 var currentCaptionElements = getElementsByClassName(currentMMC,'DIV',caption);
 if (currentCaptionElements.length)
 { moreCaptionHeight = currentCaptionElements[0].offsetHeight; }
 var currentCaptionWrapperElements = getElementsByClassName( currentMMC, 'DIV',captionWrapper);
 var currentMoreWrapperElements = getElementsByClassName( currentMMC, 'DIV', 'MMCvMoreWrapper');
 var currentLessWrapperElements = getElementsByClassName( currentMMC, 'DIV', 'MMCvLessWrapper');
 var playerElements = getElementsByClassName(currentMMC, 'DIV', 'MMCvVideoPlayerWrapper');
 var viewerHeight = moreCaptionHeight;
 if (playerElements.length){
   viewerHeight += playerElements[0].offsetHeight;
 }
 var audioElements = getElementsByClassName(currentMMC, 'DIV', 'MMCvAudioPlayerWrapper');
 if (audioElements.length){
   viewerHeight += audioElements[0].offsetHeight;
 }
 var viewWithinElements = getElementsByClassName(currentMMC,'DIV','MMCvViewDownloadWrapper');
 if (viewWithinElements.length){
   viewerHeight += viewWithinElements[0].offsetHeight;
 }
 var videoImage = getElementsByClassName(currentMMC, 'DIV', 'MMCvVideoImageArea');
 if (videoImage.length){
   viewerHeight += videoImage[0].offsetHeight;
 }
 if (currentLessWrapperElements.length)
 {
  currentLessWrapperElements[0].style.display = 'block';
  viewerHeight += currentLessWrapperElements[0].offsetHeight;
 }
 var audioErrorElements = getElementsByClassName(currentMMC, 'DIV', 'MMCvAudioError');
 if (audioErrorElements.length){
   viewerHeight += audioErrorElements[0].offsetHeight;
 }

 MMCvViewerObject.style.height   = viewerHeight + "px";
 var viewBackingHeight = viewerHeight + 3;
 MMCvViewBackingObject.style.height   = viewBackingHeight + "px";
 currentCaptionWrapperElements[0].style.height = moreCaptionHeight + "px";
 currentMoreWrapperElements[0].style.display = 'none';
}

function showLessMMCvCaption() 
{
 var captionWrapper;
 if (MMCvVIDEO == currentMMCtype) {  
   captionWrapper = 'MMCvVideoCaptionWrapper';
 }else{
   captionWrapper = 'MMCvCaptionWrapper';
 }
 var currentMMC = MMCvComponents[currentMMCtype][currentMMCindex].MMCvNode;
 var currentCaptionWrapperElements = getElementsByClassName( currentMMC, 'DIV',captionWrapper);
 var currentMoreWrapperElements = getElementsByClassName( currentMMC, 'DIV', 'MMCvMoreWrapper');
 var currentLessWrapperElements = getElementsByClassName( currentMMC, 'DIV', 'MMCvLessWrapper');
 var playerElements = getElementsByClassName( currentMMC, 'DIV', 'MMCvVideoPlayerWrapper');
 var viewHeight = 0;
 if (playerElements.length){
    viewHeight += playerElements[0].offsetHeight;
 }
 var audioElements = getElementsByClassName( currentMMC, 'DIV', 'MMCvAudioPlayerWrapper');
 if (audioElements.length){
    viewHeight += audioElements[0].offsetHeight;
 }
 var viewWithinElements = getElementsByClassName(currentMMC,'DIV','MMCvViewDownloadWrapper');
 if (viewWithinElements.length){
    viewHeight += viewWithinElements[0].offsetHeight;
 }
 var videoImage =  getElementsByClassName( currentMMC, 'DIV', 'MMCvVideoImageArea');
 if (videoImage.length){
    viewHeight += videoImage[0].offsetHeight;
 }
 var audioErrorElements = getElementsByClassName(currentMMC, 'DIV', 'MMCvAudioError');
 if (audioErrorElements.length){
   viewHeight += audioErrorElements[0].offsetHeight;
 }

 viewHeight += MMCvHeightStandardCaption;
 MMCvViewerObject.style.height = viewHeight + "px";
 var viewBackingHeight = viewHeight + 3;
 MMCvViewBackingObject.style.height = viewBackingHeight + "px";
 currentCaptionWrapperElements[0].style.height = MMCvHeightLessCaption + "px";
 currentMoreWrapperElements[0].style.display = 'block';
 currentLessWrapperElements[0].style.display = 'none';
}

function resetContainerHeights(inComponent) 
{
 var targetViewerHeight = parseInt(inComponent.offsetHeight);
 var viewBackingHeight = targetViewerHeight + 1;
 MMCvViewerObject.style.height = targetViewerHeight + "px";
 MMCvViewBackingObject.style.height = viewBackingHeight + "px";
}

function goToMMCvComponent(newIndex)
{
 if((newIndex < MMCvComponents[currentMMCtype].length) && (newIndex >= 0) && (newIndex != currentMMCindex)){
  if (!isAAI2Disabled && (currentMMCtype==MMCvVIDEO || currentMMCtype==MMCvAUDIO)) { 
   MMCvComponents[currentMMCtype][currentMMCindex].stopPlayer();
   MMCvComponents[currentMMCtype][currentMMCindex].hideSelf();
   MMCvComponents[currentMMCtype][newIndex].initialize();
   MMCvComponents[currentMMCtype][newIndex].resetCaptionHeight();
   inComponent  = MMCvComponents[currentMMCtype][newIndex].MMCvNode;
   outComponent = MMCvComponents[currentMMCtype][currentMMCindex].MMCvNode;
   MMCvComponents[currentMMCtype][newIndex].showSelf();
   updateMMCvSelectorIndex(currentMMCindex, newIndex);
   currentMMCindex = newIndex; 
   resetContainerHeights(inComponent)
  }
  else if (shiftEnabled)
  {
   MMCvComponents[currentMMCtype][newIndex].initialize();
   MMCvComponents[currentMMCtype][newIndex].resetCaptionHeight();
   shiftEnabled            = 0;
   inComponent             = MMCvComponents[currentMMCtype][newIndex].MMCvNode;
   outComponent            = MMCvComponents[currentMMCtype][currentMMCindex].MMCvNode;
   if (null == inComponent)
   { return; }
   if (null == outComponent)
   { return; }
   if (newIndex < currentMMCindex)
   { inComponent.style.left  = -MMCvWidthComponent+"px"; shiftDirection = 1; }
   else
   { inComponent.style.left  = MMCvWidthComponent+"px"; shiftDirection = 0; }
   shiftAmountRemaining    = MMCvWidthComponent;
   shiftAmountPerIteration = 25;
   updateMMCvSelectorIndex(currentMMCindex, newIndex);
   currentMMCindex = newIndex;
   if (parseInt(MMCvViewerObject.offsetHeight) < parseInt(inComponent.offsetHeight))
   {
    resetContainerHeights(inComponent) 
   }
   moveComponents();
  }
 }
}

function shiftMMCvRight() 
{ goToMMCvComponent(currentMMCindex+1); }

function shiftMMCvLeft() 
{ goToMMCvComponent(currentMMCindex-1); }

function moveComponents()
{
 if (shiftAmountRemaining > 0)
 {
  if (shiftAmountRemaining < shiftAmountPerIteration)
  { shiftAmountPerIteration = shiftAmountRemaining; }
  if (shiftDirection == 0)
  {
   outComponent.style.left = parseInt(outComponent.style.left) - shiftAmountPerIteration + "px";
   inComponent.style.left = parseInt(inComponent.style.left) - shiftAmountPerIteration + "px";
  }
  else
  {
   outComponent.style.left = parseInt(outComponent.style.left) + shiftAmountPerIteration + "px";
   inComponent.style.left = parseInt(inComponent.style.left) + shiftAmountPerIteration + "px";
  }
  shiftAmountRemaining -= shiftAmountPerIteration;
 }

 if (shiftAmountRemaining > 0)
 {
  shiftEnabled = 0;
  timeoutID1 = setTimeout("moveComponents()", 25);
 }
 else
 {
  clearTimeout(timeoutID1);
  if (parseInt(MMCvViewerObject.offsetHeight) > parseInt(inComponent.offsetHeight))
  { resetContainerHeights(inComponent) }
  shiftEnabled = 1;
 }
}
function getFlashMovie(id) {
 if (navigator.appName.indexOf ("Microsoft") !=-1) {
  return window[id]
 } else {
  return document[id]
 }
}
MMCvComponent.prototype.stopPlayer =  function() { 
 var flashID = this.myID + "WIDGET";
 var flashMovie = getFlashMovie(flashID); 
 if(flashMovie && flashPlayerVersion=='supported'){
  flashMovie.stopPlayBack();
 }
}

function nextArrowOnMouseOver() {
 var nextButton = document.getElementById("nextArrow");
 nextButton.src = '/scidirimg/nextArrowOnHover.gif';
}

function nextArrowOnMouseOut() {
 var nextButton = document.getElementById("nextArrow");
 nextButton.src = '/scidirimg/nextArrowActive.gif';
}

function prevArrowOnMouseOver() {
 var prevButton = document.getElementById("prevArrow");
 prevButton.src = '/scidirimg/prevArrowOnHover.gif';
}

function prevArrowOnMouseOut() {
 var prevButton = document.getElementById("prevArrow");
 prevButton.src = '/scidirimg/prevArrowActive.gif';
}
//END multimedia.js

//BEGIN adSense.js
function ad_sense_display(google_ads) {

    // code for IE
    if (window.ActiveXObject)
      {
      var doc=new ActiveXObject("Microsoft.XMLDOM");
      doc.async="false";
      doc.loadXML(google_ads);
    }
    // code for Mozilla, Firefox, Opera, etc.
    else {
      var parser=new DOMParser();
      var doc=parser.parseFromString(google_ads,"text/xml");
    }

    // documentElement always represents the root node
    var x=doc.documentElement;

    // parse out ads
    var ads = doc.getElementsByTagName("AD");

    var s = '';
    if (ads.length > 0) {
        s += '<div style="background-color:#FFFFFF; padding-top: 15px; padding-bottom: 15px; padding-left: 5px; padding-right: 5px">'
        s += '<div style="width: 100%;border: 1px solid #CCCCCC; font-family: arial; font-size: 12px;">';
        s += '<div style="padding: 4px; border-bottom: 1px solid #CCCCCC; background-color:#EEEEEE">Sponsored Links</div>';
        var url;
        var visible_url;
        var line1;
        var line2;
        var ad;
        if (ads.length == 1) {
            ad = ads[0];
            /*
             * Partners should adjust text sizes
             * so ads occupy the majority of ad space.
             */
            url = ad.attributes.getNamedItem("url").value;
            visible_url = ad.attributes.getNamedItem("visible_url").value;
            line1 = ad.getElementsByTagName("LINE1").item(0);
            line2 = ad.getElementsByTagName("LINE2").item(0);
            s += '<div style="margin: 5px">';
            s += '<a href="' + url + '" ' +
                            'onmouseout="window.status=\'\'" ' +
                            'onmouseover="window.status=\'go to ' +
                            visible_url + '\'" ' +
                            '>' +
                            line1.firstChild.nodeValue + '</a><br>' +
                            '<span style="color:#000000">' +
                            line2.firstChild.nodeValue + '&nbsp;' +
                            '<br></span>' +
                            '<span style="color:#008000">' +
                            visible_url + '</span><br>';
            s += '</div>';
        } else if (ads.length > 1) {
            /*
             * For text ads, append each ad to the string.
             */
            for(i=0; i < ads.length; ++i) {
                ad = ads[i];
                url = ad.attributes.getNamedItem("url").value;
                visible_url = ad.attributes.getNamedItem("visible_url").value;
                line1 = ad.getElementsByTagName("LINE1").item(0);
                line2 = ad.getElementsByTagName("LINE2").item(0);
                s += '<div style="margin: 5px">';
                s += '<a href="' + url + '" ' +
                                  'onmouseout="window.status=\'\'" ' +
                                  'onmouseover="window.status=\'go to ' +
                                  visible_url + '\'" ' +
                                  '>' +
                                  line1.firstChild.nodeValue + '</a><br>' +
                                  '<span style="color:#000000">' +
                                  line2.firstChild.nodeValue + 
                                  '<br></span>' +
                                  '<span style="color:#008000">' +
                                  visible_url + '</span><br>';
                s += '</div>';

            }
        }
        s += '</div></div>';

    }

    document.write(s);
    return;
}

//END adSense.js
//BEGIN nextBio.js

function createTO(mSec)
{
  testTimer = setTimeout("handleTO()", mSec);
}
function cancelTO()
{
  if(0 != testTimer){
    clearTimeout(testTimer);
    testTimer = 0;
  }
}
function handleTO()
{
  var myFrame = null;
  if(document.all) {
    var myFrame = document.all["tagCloudDummyIframe"];
  }
  else if(document.getElementById) {
    myFrame = document.getElementById("tagCloudDummyIframe");
  }
  if(myFrame) {
    myFrame.parentNode.removeChild(myFrame);
  }
}
function iframeContentLoaded(e)
{
  try {
    var myFrame;
    var myFrameDoc;
    if(document.frames) {
      myFrame = document.frames["tagCloudDummyIframe"];
      if(myFrame) {
        myFrameDoc = myFrame.document;
      }
    }
    else {
      myFrame = document.getElementById("tagCloudDummyIframe");
      if(myFrame) {
        myFrameDoc = myFrame.contentDocument;
      }
    }
    if(myFrameDoc) {
      var loadStatus = ( e && (typeof e.type !== 'undefined')?e.type:myFrameDoc.readyState);
      if(("load" == loadStatus)||("complete" == loadStatus)) {
        // Set timeout 
        createTO(10000);
        nbApi.tagCloudFromPii(
               "nextBioViewer", 
           piiValue,
               searchTerms, 
               function(id, bLoaded){tagCloudCallBack(id, true);},
               null, 
               null, 
               null,
               "tagCloudDummyIframe"
        );
      } 
    } 
  }
  catch(e)
  {}
  return true;
}
function nextBio()
{
  //Third party content 

  var myFrame = document.createElement("iframe");
  myFrame.id="tagCloudDummyIframe";
  myFrame.style.display = 'none';
  myFrame.setAttribute("name", "tagCloudDummyIframe");
  myFrame.onload = iframeContentLoaded;
  myFrame.onreadystatechange = iframeContentLoaded;
  if(!document.frames)
  {
    myFrame.src=iFrameHtml;
  }
  document.getElementById('nextBioViewer').appendChild(myFrame);
}
function tagCloudCallBack(id, bLoaded)
{
  if(bLoaded) {
    cancelTO();
    var nbid = document.getElementById('nextBioViewer');
    if(nbid != null) {
      nbid.style.display = 'block';
      nbid.style.margin = '0 0 20px 0';
    }
  }
}
//END nextBio.js

//BEGIN ggcon.js
function google_ad_request_done(google_ads) {

    var s = '';
    var i;

    if (google_ads.length == 0) {
      return;
    }

    var feedbackURL = '';
    if(google_info != null && google_info.feedback_url.length > 0) {
        feedbackURL = google_info.feedback_url;
    }
    if (google_ads[0].type == "image") {
      s += '<a href="' + google_ads[0].url +
              '" target="_top" title="go to ' + google_ads[0].visible_url +
              '"><img border="0" src="' + google_ads[0].image_url +
              '"width="' + google_ads[0].image_width +
              '"height="' + google_ads[0].image_height + '"></a>';
    } else if (google_ads[0].type == "flash") {
      s += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
              ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"' +
              ' WIDTH="' + google_ad.image_width +
              '" HEIGHT="' + google_ad.image_height + '">' +
              '<PARAM NAME="movie" VALUE="' + google_ad.image_url + '">' +
              '<PARAM NAME="quality" VALUE="high">' +
              '<PARAM NAME="AllowScriptAccess" VALUE="never">' +
              '<EMBED src="' + google_ad.image_url +
              '" WIDTH="' + google_ad.image_width +
              '" HEIGHT="' + google_ad.image_height + 
              '" TYPE="application/x-shockwave-flash"' + 
              ' AllowScriptAccess="never" ' + 
              ' PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED></OBJECT>';
    } else if (google_ads[0].type == "text") {
        s += '<div style="background-color:#FFFFFF; padding-top: 15px; padding-bottom: 15px; padding-left: 5px; padding-right: 5px">'
        s += '<div style="width: 100%;border: 1px solid #CCCCCC; font-family: arial; font-size: 12px;">';
        s += '<div style="padding: 4px; border-bottom: 1px solid #CCCCCC; background-color:#EEEEEE">';
        if(feedbackURL.length > 0) {
          s += '<a href="' + feedbackURL + '" target="_blank">Sponsored Links</a>';
        }
        else {
          s += 'Sponsored Links';
        }
        s += '</div>';
        if (google_ads.length == 1) {
            /*
             * Partners should adjust text sizes
             * so ads occupy the majority of ad space.
             */
            s += '<div style="margin: 5px">';
            s += '<a href="' + google_ads[0].url + '" ' +
                            'onmouseout="window.status=\'\'" ' +
                            'onmouseover="window.status=\'go to ' +
                            google_ads[0].visible_url + '\'" ' +
                            '>' +
                            google_ads[0].line1 + '</a><br>' +
                            '<span style="color:#000000">' +
                            google_ads[0].line2 + '&nbsp;' +
                            google_ads[0].line3 + '<br></span>' +
                            '<span style="color:#008000">' +
                            google_ads[0].visible_url + '</span><br>';
            s += '</div>';
        } else if (google_ads.length > 1) {
            /*
             * For text ads, append each ad to the string.
             */
            for(i=0; i < google_ads.length; ++i) {
                s += '<div style="margin: 5px">';
                s += '<a href="' + google_ads[i].url + '" ' +
                                  'onmouseout="window.status=\'\'" ' +
                                  'onmouseover="window.status=\'go to ' +
                                  google_ads[i].visible_url + '\'" ' +
                                  '>' +
                                  google_ads[i].line1 + '</a><br>' +
                                  '<span style="color:#000000">' +
                                  google_ads[i].line2 + '<br>' +
                                  google_ads[i].line3 + '<br></span>' +
                                  '<span style="color:#008000">' +
                                  google_ads[i].visible_url + '</span><br>';
                s += '</div>';
            }
        }
        s += '</div></div>';
    }

    document.write(s);
    return;
}
//END ggcon.js
//BEGIN pubHomeActions.js
function publicationLink(url, showId, hideId, rsltIndId) {
  $.get(url, function(data) {
         if(data.match(/TRUE/g)) {
           document.getElementById(hideId).style.display = 'none';
           document.getElementById(showId).style.display = 'inline';
           document.getElementById(rsltIndId).style.display = 'none';
         }
         else {
           document.getElementById(rsltIndId).style.display = 'inline';
         }
  });
}

function volumeLink(url, showId, hideId, rsltIndId) {
  $.get(url, function(data) {
      if(data.match(/TRUE/g)) {
        document.getElementById(hideId).style.display = 'none';
        document.getElementById(showId).style.display = 'inline';
        document.getElementById(rsltIndId).style.display = 'none';
      }
      else {
        document.getElementById(rsltIndId).style.display = 'inline';
      }
  });
}

function quickLink(url, rsltIndId, rsltMsgId) {
  $.get(url, function(data) {
      document.getElementById(rsltMsgId).innerHTML = data;
      document.getElementById(rsltIndId).style.display = 'inline';
  });
}


/*  TOOL TIP */
function getElm(eID) {
  return document.getElementById(eID);
}

function show(eID) {
  getElm(eID).style.display='block';
}

function hide(eID) {
  getElm(eID).style.display='none';
  if (eID == 'articleFade') {
      var focusEnable = $Id('focusOn');
      var focusDisable = $Id('focusOff');
      focusDisable.style.display = 'inline';
      focusEnable.style.display = 'none';
  }
}

function setOpacity(eID, opacityLevel) {
  var eStyle = getElm(eID).style;
  eStyle.opacity = opacityLevel / 100;
  eStyle.filter = 'alpha(opacity='+opacityLevel+')';
}

function fadeIn(eID) {
  setOpacity(eID, 0); 
  show(eID); 
  var timer = 0;
  for (var i=1; i<=100; i++) {
    setTimeout("setOpacity('"+eID+"',"+i+")", timer * 2.5);
    timer++;
  }
}

function fadeOut(eID) {
  var timer = 5
  0;
  for (var i=100; i>=1; i--) {
    setTimeout("setOpacity('"+eID+"',"+i+")", timer * 2.5);
    timer++;
  }
  setTimeout("hide('"+eID+"')", 150);
}

function toggle_display_Author(id1,id2)
{
  /* Function called to Expand/Collapse  */
  /* Div to be hidden/displayed */
  var div1 = document.getElementById(id1);
  /* Icon to be changed to plus/minus */
  var img1 = document.getElementById(id2);
  /* For Collapsing */
  if (div1.style.display=='block')
  {
    div1.style.display = 'none';
    img1.src= '/scidirimg/plus.gif';
    img1.title = 'Open';
    img1.alt= 'Open';  
  }
  /* For Expanding  */
  else
  {
    div1.style.display = 'block';
    img1.src= '/scidirimg/minus.gif';
    img1.title='Close';
    img1.alt='Close';
  }
}

function toggle_display(id1,id2)
{
  /* Function called to Expand/Collapse  */
  /* Div to be hidden/displayed */
  var div1 = document.getElementById(id1);
  /* Icon to be changed to plus/minus */
  var img1 = document.getElementById(id2);
  var span1 =  document.getElementById('sp'+id1);
  /* For Collapsing */
  if (div1.style.display == 'block')
  {
    span1.style.fontWeight ='normal';
    div1.style.display = 'none';
    img1.src= '/scidirimg/plus.gif';
    img1.title = 'Open';
    img1.alt= 'Open';  
  }
  /* For Expanding  */
  else
  {
    span1.style.fontWeight='bold';
    div1.style.display = 'block';
    img1.src= '/scidirimg/minus.gif';
    img1.title='Close';
    img1.alt='Close';
  }
}

function toggle_display_AjaxCall(id1,id2)
{
/* Function called to Expand/Collapse and make Ajax call */
 /* Div to be hidden/displayed */
 var div1 = document.getElementById(id1);
 /* Icon to be changed to plus/minus */
 var img1 = document.getElementById(id2);
 /* ID of the branch node */
 var a1 = document.getElementById(id1+'a');
 /* URL of the branch to be processed */
 var url1 = a1.href;
 var img2 = document.getElementById('load'+id1); 
 var span1 =  document.getElementById('sp'+id1);
/* For Collapsing */
 if (div1.style.display == 'block')
 {
  span1.style.fontWeight ='normal';
  div1.style.display = 'none';
  img1.src= '/scidirimg/plus.gif';
  img1.title='Open';
  img1.alt='Open';
 }
 /* For Expanding  */
 else
 {   
 /* If Ajax call has been made already,then display data. */
  if(img2==null && div1.innerHTML != 'Unable to fetch the data')
  {
   span1.style.fontWeight ='bold';
   div1.style.display = 'block';
   img1.src= '/scidirimg/minus.gif';
   img1.title='Close';
   img1.alt='Close';
  } 
  /* If user is clicking for the first time, make an Ajax call. */
  else
  {
   span1.style.fontWeight ='bold';
   div1.style.display = 'block';
   img1.src= '/scidirimg/minus.gif';
   img1.title='Close';
   img1.alt='Close';
   
   $.ajax(
   {
      url: url1,
      type: 'GET',
      error: function() 
      {
         div1.innerHTML = 'Unable to fetch the data';
      },
      success: function(res) {
        div1.innerHTML = res;
      }
   });

  }
 }
}

function toggle_display_GG(id1,id2,c)
{
/* Function called to Expand/Collapse  */
 /* Div to be hidden/displayed */
 var div1 = document.getElementById(id1);
 /* Icon to be changed to plus/minus */
 var img1 = document.getElementById(id2);
 var span1 =  document.getElementById('sp'+id1);
/* For Collapsing */
 if (div1.style.display == 'block')
 {
  span1.style.fontWeight ='normal';
  div1.style.display = 'none';
  img1.src= '/scidirimg/plus.gif';
  img1.title='Open';
  img1.alt='Open';   
 }
 /* For Expanding  */
 else
 { 
  var childs = document.getElementsByName("child"+id1);
  /* Collapse all the children of the node */
  for(var i=0;i<childs.length;i++)
  {
   var divc1 = document.getElementById(childs[i].value);
   var imgc1 = document.getElementById('icon'+childs[i].value);
   var spanc1 = document.getElementById('sp'+childs[i].value);
   spanc1.style.fontWeight = 'normal';
   divc1.style.display = 'none';
   imgc1.src= '/scidirimg/plus.gif';
   imgc1.title='Open';
   imgc1.alt='Open';
  }                                                                                      
                                                                                
  span1.style.fontWeight ='bold';                                                            
  div1.style.display = 'block';
  img1.src= '/scidirimg/minus.gif';
  img1.title='Close';
  img1.alt='Close';
 }
}

//END pubHomeActions.js
//BEGIN pdfDownload.js
function validatePdfDownload(form, type) {

  var total = 0;
  var typeMsg;
  var msg;
  var selectedDocList = form.art;
  if (!selectedDocList) {
    return;
  }
  var numDocs = 1;
  if (selectedDocList.length) {
    numDocs = selectedDocList.length;
  }
  var  max = form.PDF_DDM_MAX.value
  var proceed=true;

  if (numDocs > 1) {
    for (var i = 0; i < numDocs; i++) {
      if (selectedDocList[i].checked || selectedDocList[i].type == "hidden") {
        total += 1;
      }
    }
  } else if (numDocs == 1) {
    // art is a checkbox or a hidden, not an array of such
    if (selectedDocList.checked || selectedDocList.type == 'hidden') {
      total = 1;
    }
  }

  if (total == 0) {
    if (numDocs > max) {
      if (type == "browse") {
        typeMsg = "results list contains";
      } else {
        typeMsg = "search retrieved";
      }
      msg = "Your " + typeMsg + " more than " + max + " documents. However, only the first " + max + " documents can be downloaded. \nSelect OK to download the first " + max + " documents, or Cancel if you do not want to continue.";
      proceed = confirm(msg);
    } else {
      if (type == "browse") {
        typeMsg = "You have " + numDocs + " documents in your result.";
      } else {
        typeMsg = "Your search retrieved " + numDocs + " documents.";
      }
      msg = typeMsg + " \nSelect OK to download the " + numDocs + " document(s), or Cancel if you do not want to continue.";
      proceed = confirm(msg);
    }
  } else if (total > max) {
    msg = "You can download a maximum of " + max + " documents. \nSelect OK to download the first " + max + " documents, or Cancel if you do not want to continue.";
    proceed = confirm(msg);
  }
  if (proceed) {
    var oldTarget = form.target;
    var newWidth=((document.body.clientWidth*90)/100);
    var newHeight=document.body.clientHeight;
    var pdfWin=window.open('','QuosaDDM','width='+newWidth+',height='+newHeight+',resizable=yes,left=50,top=50');
    pdfWin.focus();
    form.target="QuosaDDM";
    form.pdfDownload.value='download';
    form.submit ();
    form.target = oldTarget;
    form.pdfDownload.value='';
  }
  return proceed;
}
//END pdfDownload.js

//BEGIN chat.js
var lpMTagConfig = {
 "lpServer" : "server.lon.liveperson.net",
 "lpNumber" : "41683706",
 "lpProtocol" : (document.location.toString().indexOf("https:")==0) ? "https" : "http"
}
function lpAddMonitorTag(src){if(typeof(src)=="undefined"||typeof(src)=="object"){src=lpMTagConfig.lpMTagSrc?lpMTagConfig.lpMTagSrc:"/hcp/html/mTag.js";}if(src.indexOf("http")!=0){src=lpMTagConfig.lpProtocol+"://"+lpMTagConfig.lpServer+src+"?site="+lpMTagConfig.lpNumber;}else{if(src.indexOf("site=")<0){if(src.indexOf("?")<0)src=src+"?";else src=src+"&";src=src+"site="+lpMTagConfig.lpNumber;}};var s=document.createElement("script");s.setAttribute("type","text/javascript");s.setAttribute("charset","iso-8859-1");s.setAttribute("src",src);document.getElementsByTagName("head").item(0).appendChild(s);}

function lpAddVars(scope,name,value) {
 if (name.indexOf('OrderTotal')!=-1 && (value=='' || value==0)) {   // pass 0 value to all but OrderTotal
 return;
 }
    
 value=lpTrimSpaces(value.toString());
 switch (scope){
  case "page": lpMTagConfig.pageVar[lpMTagConfig.pageVar.length] = escape(name)+"="+escape(value); break;
  case "session": lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = escape(name)+"="+escape(value); break;
  case "visitor": lpMTagConfig.visitorVar[lpMTagConfig.visitorVar.length] = escape(name)+"="+escape(value); break;
 }    
}
function onloadEMT() { 
 var LPcookieLengthTest=document.cookie;
 if (lpMTag.lpBrowser == "IE" && LPcookieLengthTest.length>1900){
  lpMTagConfig.sendCookies=false;
 }
}
function lpTrimSpaces(stringToTrim) {
 return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function lpSendData(varscope,varname,varvalue){
 if(typeof(lpMTag)!="undefined" && typeof(lpMTag.lpSendData)!="undefined") {
  lpMTag.lpSendData(varscope.toUpperCase() +"VAR!"+ varname + "=" + varvalue, true);
 }
}

function ChatInit() {
if (window.attachEvent) window.attachEvent("onload",lpAddMonitorTag);
else window.addEventListener("load",lpAddMonitorTag,false);
lpMTagConfig.db1 = new Object();
lpMTagConfig.db1.busyAction = function (objName) {
 objRef = eval(objName);
 var chatWinURL = objRef.getActionURL("Busy");
 chatWinURL = chatWinURL.replace(/forceOffline/,"SESSIONVAR%21BusyClickOverride");
 window.open(chatWinURL,'Chat'+lpMTagConfig.lpNumber,'width=472,height=320,status=0,resizable=0,menubar=no,scrollbars=no,location=no');
};
lpMTagConfig.db1.offlineAction = function (objName) {
 objRef = eval(objName);
 var chatWinURL = objRef.getActionURL("Offline");
 window.open(chatWinURL,'chat'+lpMTagConfig.lpNumber,'width=472,height=320,status=0,resizable=0,menubar=no,scrollbars=no,location=no');
};
if (typeof(lpMTagConfig.pageVar)=="undefined") {lpMTagConfig.pageVar = new Array();}
if (typeof(lpMTagConfig.sessionVar)=="undefined") {lpMTagConfig.sessionVar = new Array();}
if (typeof(lpMTagConfig.visitorVar)=="undefined") {lpMTagConfig.visitorVar = new Array();}
if (typeof(lpMTagConfig.onLoadCode)=="undefined") {lpMTagConfig.onLoadCode = new Array();}
if(typeof(lpMTagConfig.dynButton)=="undefined") {lpMTagConfig.dynButton=new Array();}
try {
 if (typeof(lpUnit)=="undefined") {var lpUnit="science-direct-english";}
 if(typeof(lpAddVars)!="undefined") {lpAddVars("page","unit",lpUnit);}
 lpMTagConfig.defaultInvite = "chat-"+lpUnit;
}
catch(e){}
lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length] = onloadEMT;
if(typeof(lpMTagConfig.dynButton)!="undefined") {
 lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {"name":"chat-"+lpUnit,"pid":"ChatHeader", 'ovr':'lpMTagConfig.db1'};
}
if(typeof(lpMTagConfig.dynButton)!="undefined") {
 lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {"name":"chat-"+lpUnit+"-1","pid":"ChatFooter", 'ovr':'lpMTagConfig.db1'};
}

}
//END chat.js

//BEGIN googleSearchAds.html
function GoogleSearchTermInit() {
  var pageOptions = {
    'pubId' : 'reed_elsevier_b',
    'query' : googleSearchTerm,
    'adtest': 'on'
  };
  var adblock1 = {
    'container' : 'googleAds'
  };
  new google.ads.search.Ads(pageOptions, adblock1);
}
//END googleSearchAds.html

// BEGIN PDFKing
var ArticleView = {
  init: function() {
    $("#pdfLink").click(function(event) {
      var t = $(event.currentTarget);
      if (t.attr("suggestedarturl")) {
          suggestedArt (t.attr("suggestedarturl"), event);
      }
      if (t.attr("pdfurl")) {
          openPDF (t.attr("pdfurl"), event);
      }
      return true;
    });
  }
}
$(document).ready(function() {ArticleView.init();});

function openPDF(url, event) {
 var newWidth=((document.body.clientWidth*90)/100);
 var newHeight=document.body.clientHeight;
 var pdfWin;
 pdfWin=window.open(url,'newPdfWin','width='+newWidth+',height='+newHeight+',resizable=yes,left=50,top=50');
 pdfWin.focus();
}

function suggestedArt(url, event) {
  var obj = document.getElementById('suggestedPdfList');
  if(obj.length < 1) { return; }
  var ajaxReq = $.get(url, function(response) {
    // Length is checked for 5 since each line in the template
    // will have end of line character for empty responses
    if (response && response.length > 5) {  
      obj.style.display = 'block';
      obj.innerHTML = response;
      var obj1 = document.getElementById('pdfModalWindow');
      obj1.style.display = 'block';
      obj1.style.height = document.body.scrollHeight+"px";
      alignSuggestedArticleBox();
    }
  });
}

function setOptOutFlag(url) {
  try {
    $.post(url);
  } catch (e) {
  }
  closePopup ();
}

function closePopup() {
  document.getElementById('suggestedPdfList').style.display = 'none';
  document.getElementById('pdfModalWindow').style.display = 'none';
}
function showDetails(pii, absUrl){
  var toHide = "trunc_" + pii;
  var toShow = "citation_" + pii;
  var absId = "abs_" + pii;
  hideElementsByClassName('pdfAbs', 'li');
  hideElementsByClassName('citationDetails', 'li');
  showElementsByClassName('wrapperLi', 'li');

  document.getElementById(toHide).style.display = 'none';
  document.getElementById(toShow).style.display = 'block';

  // Retrieve Abstract
  var obj = document.getElementById(absId);
  if(obj.length < 1) { return; }
    if (obj.innerHTML == "") {
      var ajaxReq = $.get(absUrl, function(response) {
        if (response) {
          obj.style.display = 'block';
          obj.innerHTML=response;
          alignSuggestedArticleBox();
        }
      });
    } else {
      obj.style.display = 'block';
      alignSuggestedArticleBox();
    }
}


function alignSuggestedArticleBox() {
  var x=0, y=1;
  var msgBox = document.getElementById('pdfModalWindowMsgBox');
  var winWidth = getWindowWidth();
  var winHeight = getWindowHeight();
  var top = (winHeight - msgBox.offsetHeight)/2;
  var left = (winWidth - msgBox.offsetWidth)/2;
  var pos = getScrollXY();
  if (pos) {
      top = top+pos[y];
      left = left+pos[x];
  }
  msgBox.style.top = top + 'px';
  msgBox.style.left = left + 'px';
}

function getScrollXY() {
  var x=0, y=1;
  var pos = new Array(2);
  var scrOfX = 0, scrOfY = 0;
  if( typeof( window.pageYOffset ) == 'number' ) {
    //Netscape compliant
    scrOfY = window.pageYOffset;
   scrOfX = window.pageXOffset;
  } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
    //DOM compliant
    scrOfY = document.body.scrollTop;
    scrOfX = document.body.scrollLeft;
  } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
    //IE6 standards compliant mode
    scrOfY = document.documentElement.scrollTop;
    scrOfX = document.documentElement.scrollLeft;
  }
  pos[x] = scrOfX;
  pos[y] = scrOfY;

  return pos;
}
// End of PDFKing

$(document).ready(function() {
    $(".showMoreMMCvCaption").live("click", function(ev){showMoreMMCvCaption();ev.preventDefault();});
    $(".showLessMMCvCaption").live("click", function(ev){showLessMMCvCaption();ev.preventDefault();});
	$(".MMCvLABEL_SRC").each(function(i){
		var thisObj = $(this);
		var reqParent = thisObj.parents(".MMCvBOX_SRC");
		var linkObj = reqParent.find(".MMCvLINK");
		if(linkObj.length >0){
			var linkAttr = linkObj.attr('href');
			var thisHtml = thisObj.html();
			thisObj.html('<a href="'+linkAttr+'">'+thisHtml+'</a>');	
		}
	});
})

//Nonserial Index 
var loadsection;
function loadSection(baseUrl,section){
 var endPoint = baseUrl+section;
 var div1 = document.getElementById("indexSection");
 loadsection = new $.ajax(
   {
      url: endPoint,
      type: 'GET',
      error: function() 
      {	    
         div1.innerHTML = '';
      },
      success: function(res) {
	    
        div1.innerHTML = res;
		if($('#'+section).position()!=null){
		  $(window).scrollTop($('#'+section).position().top+330);
		}
      }
   });
}



