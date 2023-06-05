//infoBubble.js
var OPAC = 0;
var aFrame;
var frameWidth = 10;
var textboxFig = 0;
var InfoBubble = {

  bubbleTimeout: 1,
  currentBubble: null,
  timeoutBubbleID: null,
  currentLink: null,

  show: function(aID, bID,fID) {
    var disableFade = 0;
    if(this.currentBubble) {
      disableFade = 1;
    }
    var aBubble = document.getElementById(aID);
    aFrame=document.getElementById(fID);
    if(aBubble && aBubble != this.currentBubble) {
      this.hide();
      var aBubbleLink = document.getElementById(bID);
      aBubbleLink.style.background = '#efefef ';
      aBubbleLink.style.border = '1px solid #E4E4E4';
      aBubbleLink.style.margin = '3px 5px 3px 5px';
      this.currentLink = aBubbleLink;
      aBubble.style.display = 'block';
      var heightFromTop = findPosY(aBubble) - document.body.scrollTop;
      if(getWindowHeight() < (aBubble.offsetHeight + heightFromTop)) {
        aBubble.style.top = (getWindowHeight() - (aBubble.offsetHeight + heightFromTop)) - 5;
      }
      else {
        if(heightFromTop < 0) {
          aBubble.style.top = (Math.abs(heightFromTop)) + 5;
        }
        else {
          aBubble.style.top = 0;
        }
      }
      if(aFrame){
        aFrame.style.top  = aBubble.offsetTop + "px";
        aFrame.style.left = -(aBubble.offsetWidth+frameWidth) + "px";
        aFrame.style.width = aBubble.offsetWidth + "px";
        aFrame.style.height = aBubble.offsetHeight + "px";
        aFrame.style.display = "block";
        this.currentFrame = aFrame;
      }
      this.currentBubble = aBubble;
   }

    if(this.timeoutBubbleID) {
      clearTimeout(this.timeoutBubbleID);
    }
  },

  hide: function() {
    if(this.currentBubble) {
      this.currentLink.style.background = '#FFFFFF';
      this.currentLink.style.border = '1px solid #FFFFFF';
      this.currentLink.style.margin ='3px 5px 3px 5px';
      this.currentBubble.style.display = 'none';
      if(aFrame){
        this.currentFrame.style.display = 'none';
      }
      this.currentBubble.style.top = 0;
      this.currentBubble = null;
      if(this.timeoutBubbleID) {
        clearTimeout(this.timeoutBubbleID);
      }
    }
  },

  timeout: function() {
      this.timeoutBubbleID = setTimeout('InfoBubble.hide()', this.bubbleTimeout * 1000);
  },

  fadeIn: function() {
    if(this.currentBubble) {
      OPAC = OPAC + .10;
      OPAC = (OPAC>1)?1:OPAC;
      this.currentBubble.style.filter = 'alpha(opacity='+parseInt(100*OPAC)+')';
      this.currentBubble.style.opacity = OPAC;
      if(OPAC<1) {
        setTimeout('InfoBubble.fadeIn()',25);
      }
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

function getWindowHeight() {
  var windowHeight=0;
  if(typeof(window.innerHeight) == 'number') {
    windowHeight = window.innerHeight;
  }
  else {
    if(document.documentElement && document.documentElement.clientHeight) {
      windowHeight = document.documentElement.clientHeight;
    }
    else {
      if(document.body && document.body.clientHeight) {
        windowHeight = document.body.clientHeight;
      }
    }
  }
  return windowHeight;
}

function toggleMLKT(uoi, imgDefault, imgFlip, urlPrefix) {
  var mlktItems = document.getElementById('mlkt');
  if(mlktItems.style.display == "none") {
    var mlktList = document.getElementById('mlktList');
    mlktItems.style.display = '';
    document.getElementById('mlktArrow').src = imgDefault;
    if(mlktList.innerHTML.length == 0) {
      mlktList.innerHTML = '<b>LOADING...</b>';

      new Ajax.Updater('mlktList', urlPrefix+'/mlkt/2/'+uoi, {method:'get'});
    }
    else {
      new Ajax.Request(urlPrefix+'/mlkt/1', {method:'get'});
    }
  }
  else {
    mlktItems.style.display = 'none';
    document.getElementById('mlktArrow').src = imgFlip;
    new Ajax.Request(urlPrefix+'/mlkt/0', {method:'get'});
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

// referenceBubble.js
var RefPreview = {

  previewTimeout: 1,
  currentPreview: null,
  timeoutPreviewID: null,

  showRef: function(event, elemId, boxId) {
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
        } else {
          maxX = document.body.clientWidth + document.body.scrollLeft - divX;
          maxY = document.body.clientHeight + document.body.scrollTop - divY;

          y = event.clientY + document.body.scrollTop - 340 ; 
          x = event.clientX + document.body.scrollLeft + 15;
        }
      } else {
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
  },

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
  if (inImage.naturalWidth)
  {
    baseWidth = inImage.naturalWidth;
  } else {
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
    if ((parseInt(document.body.clientWidth)- RESIZE_CLIENT_ADJUST_PX)
        <  baseWidth)
    {
      imageTargetWidth = parseInt(document.body.clientWidth)-
                         RESIZE_CLIENT_ADJUST_PX;
    }
    else
    {
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

function showElementsByClassName(className, tag)  {
  var all = getElementsByClassName(document, tag, className);
  for(var k=0;k<all.length;k++) {
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
function enableTabs()
{
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
    showElementsByClassName('graphTextOnly', 'div');
    hideElementsByClassName('refText', 'div');
    hideElementsByClassName('articleText', 'div');
    hideElementsByClassName('refMsg', 'div');
    hideElementsByClassName('pdfExcerpt', 'div');
    showTextBox('textboxdefault', 'div');
    showTextBox('textboxdefaultfig', 'div');
    hideTextBox('textboxRef', 'div');
  }
  else if(tab == 'refTab') {
    showElementsByClassName('refText', 'div');
    hideElementsByClassName('articleText', 'div');
    hideElementsByClassName('graphText', 'div');
    hideElementsByClassName('graphTextOnly', 'div');
    showElementsByClassName('refMsg', 'div');
    hideElementsByClassName('pdfExcerpt', 'div');
    hideTextBox('textboxdefault', 'div');
    hideTextBox('textboxdefaultfig', 'div');
    hideTextBox('textboxRef', 'div');
  }
  else {
    showElementsByClassName('articleText', 'div');
    showElementsByClassName('graphText', 'div');
    hideElementsByClassName('graphTextOnly', 'div');
    showElementsByClassName('refText', 'div');
    hideElementsByClassName('refMsg', 'div');
    showElementsByClassName('pdfExcerpt', 'div');
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

  var absTabOn = $('absTabOn'); 
  var absTabOff = $('absTabOff');
  var fullTabOn = $('fullTabOn');
  var fullTabOff = $('fullTabOff');
  var graphTabOn = $('graphTabOn');
  var graphTabOff = $('graphTabOff');
  var refTabOn = $('refTabOn');
  var refTabOff = $('refTabOff');

  if (tabSelected == 'unsubTab') {
    if (absTabOff) { absTabOff.removeClassName('On');absTabOff.addClassName('Off'); }
    if (absTabOn) { absTabOn.removeClassName('Off');absTabOn.addClassName('On'); }
    if(fullTabOn) { fullTabOn.removeClassName('On');fullTabOn.addClassName('Off'); }
    if(fullTabOff) { fullTabOff.removeClassName('Off');fullTabOff.addClassName('On'); }
    if(graphTabOn) { graphTabOn.removeClassName('On');graphTabOn.addClassName('Off'); }
    if(graphTabOff) { graphTabOff.removeClassName('Off');graphTabOff.addClassName('On'); }
    if(refTabOn) { refTabOn.removeClassName('On');refTabOn.addClassName('Off'); }
    if(refTabOff) { refTabOff.removeClassName('Off');refTabOff.addClassName('On'); }
  }
  if (tabSelected == 'fullTab') {
    if (fullTabOn) { fullTabOn.removeClassName('Off');fullTabOn.addClassName('On'); }
    if (fullTabOff) { fullTabOff.removeClassName('On');fullTabOff.addClassName('Off'); }
    if(graphTabOn) { graphTabOn.removeClassName('On');graphTabOn.addClassName('Off');}
    if(graphTabOff) { graphTabOff.removeClassName('Off');graphTabOff.addClassName('On'); }
    if(refTabOff) { refTabOff.removeClassName('Off');refTabOff.addClassName('On');}
    if(refTabOn) { refTabOn.removeClassName('On');refTabOn.addClassName('Off');} 
  }
  if (tabSelected == 'graphTab') {
    if(absTabOn) { absTabOn.removeClassName('On');absTabOn.addClassName('Off'); }
    if(absTabOff) { absTabOff.removeClassName('Off');absTabOff.addClassName('On'); }
    if(fullTabOn) { fullTabOn.removeClassName('On');fullTabOn.addClassName('Off'); }
    if(fullTabOff) { fullTabOff.removeClassName('Off');fullTabOff.addClassName('On'); }
    if (graphTabOff) { graphTabOff.removeClassName('On');graphTabOff.addClassName('Off'); }
    if (graphTabOn) { graphTabOn.removeClassName('Off');graphTabOn.addClassName('On'); }
    if(refTabOn) { refTabOn.removeClassName('On');refTabOn.addClassName('Off'); }
    if(refTabOff) { refTabOff.removeClassName('Off');refTabOff.addClassName('On'); }
    createEvent (tabSelected, keyEvent);
  }
  if (tabSelected == 'refTab') {
    if(absTabOn) { absTabOn.removeClassName('On');absTabOn.addClassName('Off'); }
    if(absTabOff) { absTabOff.removeClassName('Off');absTabOff.addClassName('On'); }
    if(fullTabOn) { fullTabOn.removeClassName('On');fullTabOn.addClassName('Off');}
    if(fullTabOff) { fullTabOff.removeClassName('Off');fullTabOff.addClassName('On'); }
    if(graphTabOn) { graphTabOn.removeClassName('On');graphTabOn.addClassName('Off'); }
    if(graphTabOff) { graphTabOff.removeClassName('Off');graphTabOff.addClassName('On'); }
    if (refTabOff) { refTabOff.removeClassName('On');refTabOff.addClassName('Off'); }
    if (refTabOn) { refTabOn.removeClassName('Off'); refTabOn.addClassName('On');}
    createEvent (tabSelected, keyEvent);
  }
  if (tabSelected == 'vitaeLink') {
    if (fullTabOn) { fullTabOn.removeClassName('Off');fullTabOn.addClassName('On'); }
    if (fullTabOff) { fullTabOff.removeClassName('On');fullTabOff.addClassName('Off'); }
    if(graphTabOn) { graphTabOn.removeClassName('On');graphTabOn.addClassName('Off');}
    if(graphTabOff) { graphTabOff.removeClassName('Off');graphTabOff.addClassName('On'); }
    if(refTabOff) { refTabOff.removeClassName('Off');refTabOff.addClassName('On');}
    if(refTabOn) { refTabOn.removeClassName('On');refTabOn.addClassName('Off');}
    createEvent (tabSelected, keyEvent);
    tabSelected = 'fullTab';
  }
  
  setFigSelection (tabSelected);

  changeView(tabSelected);
  focusArticle(0);
  // To anchor if present in the URL.
  var hash = location.hash;
  if( hash ) {
    location.hash = hash;
  }
}

function createEvent (tabSelected, keyEvent) {
  if (tabSelected == 'graphTab') {
    if (document.getElementById('figevent') == null) {
      new Ajax.Request(keyEvent);
      var figTabKey = document.createElement('div')
      figTabKey.setAttribute('id', 'figevent');
      document.getElementById('graphTabOn').appendChild(figTabKey)
    }
  }
  if (tabSelected == 'refTab') {
    if (document.getElementById('refevent') == null) {
      new Ajax.Request(keyEvent);
      var refTabKey = document.createElement('div')
      refTabKey.setAttribute('id', 'refevent');
      document.getElementById('refTabOn').appendChild(refTabKey)
    }
  }

  if (tabSelected == 'vitaeLink') {
    if (document.getElementById('vitaeevent') == null) {
       new Ajax.Request(keyEvent);
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
<!--
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
var MMCvDocLabel = "article";
var isAAI2Disabled = "";
var videoPlayerUrl = "";
var audioPlayerUrl = "";
var dummyImageUrl = "";
var flashPlayerVersion = DetectFlashVer("9","0","0");
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
  new Ajax.Request(url, {method:'get'});
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
function focusArticle(focusOn) {
  var imgToolBox = $('imgToggleBox');
  var artTabs = $('artTabs');
  var articleBody = $('articleBody');
  var focusEnable = $Id('focusOn');
  var focusDisable = $Id('focusOff'); 
  var articleFade = $Id('articleFade');
  if(isFadeOn || focusOn) {
    articleFade.style.display='inline';
    articleFade.style.height = 1050 + 'px';
    var maxheight = parseInt(document.body.scrollHeight);
    articleFade.style.height = (maxheight+20)+'px';
    articleFade.style.width = (parseInt(document.body.scrollWidth))+'px';
    artTabs.addClassName('articleTabsNoFade');
    if (imgToolBox != null) {
      imgToolBox.addClassName('imgToogleNoFade');
    }
    articleBody.addClassName('articleNoFade');
    focusEnable.style.display = 'inline';
    focusDisable.style.display = 'none';

    var url;
    url = focusKeyEventURL;
    new Ajax.Request(url, {method:'get'});
    isFadeOn = 1;
  }
  else {
    articleFade.style.height = '0px';
    articleFade.style.display='none';
    artTabs.removeClassName('articleTabsNoFade');
    if (imgToolBox != null) {
      imgToolBox.removeClassName('imgToogleNoFade');
    }
    articleBody.removeClassName('articleNoFade');
    focusEnable.style.display = 'none';
    focusDisable.style.display = 'inline';
    isFadeOn = 0;
  }
}
var focusOpac=0;
function setOpacInc() {
  var articleFade = $Id('articleFade');
  focusOpac = focusOpac + 20;
  focusOpac = (focusOpac>80)?80 :focusOpac;
  articleFade.style.filter = 'alpha(opacity='+focusOpac+')';
  articleFade.style.opacity = focusOpac/100;
  if(focusOpac<80) {
    setTimeout('setOpacInc()',62.5);
  }
}
function setOpacDec() {
  var articleFade = $Id('articleFade');
  focusOpac = focusOpac - 20;
  focusOpac = (focusOpac>0)?focusOpac :0;
  articleFade.style.filter = 'alpha(opacity='+focusOpac+')';
  articleFade.style.opacity = focusOpac/100;
  if (focusOpac > 0) {
    setTimeout('setOpacDec()',62.5);
  }
  else {
    focusArticle(0);
  }
}
function fadeIn(eID) {
  focusArticle(1);
  isFadeOn = 1;
  setOpacInc();
}
function fadeOut(eID) {
  isFadeOn = 0;
  setOpacDec();
}
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
            tabWidth += $(tab[i].id).getDimensions().width;
          }
        }
        if ($('TabOff') != null) {
          tabWidth += 63;
        }else {
           tabWidth -= 40;
        }
      }else {
        for(var i =0 ; i < numTabs; i++) {
            tabWidth += $(tab[i].id).getDimensions().width;
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
  document.getElementById('artTabs').style.width = resizePage.currWidth;
  var  winWidth = document.viewport.getWidth();
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
var isNextBioOn = '';
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
 if(c.style.visibility=="visible")
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

function clearAuthTimeout()
{
   if(hoverId != null) {
      clearTimeout(hoverId);
      clearTimeout(timerIdAuth);
      document.getElementById('authorLinkHover').style.display = "block";
   }
}

function closeAuth()
{
   if (timerId != null) {
      clearTimeout(timerId);
   }

   if (timerIdAuth != null) {
      clearTimeout(timerIdAuth);
   }

   hoverId = setTimeout("closeAuthHover()", 200);
}


function closeAuthHover()
{
  document.getElementById('authorLinkHover').style.display = "none";
}

function displayAuth (url,obj)
{

  if (hoverId != null) {
     clearTimeout(hoverId);
  }
  
  linkBufObj = obj;
  var str = 'displayAuthHover("'+url+'")';
  timerIdAuth =  setTimeout(str, 200);
  timerId = setTimeout('displayErrorMsg("'+obj+'")', 10000);
}

function displayErrorMsg(obj)
{
  clearTimeout(timerId);
  ajaxReq.transport.onreadystatechange = Prototype.emptyFunction;
  // abort the XHR
  ajaxReq.transport.abort();
  //update the request counter
  Ajax.activeRequestCount--;
  var d = document.getElementById('authorLinkHover');

  if(d.length < 1) { return; }
  d.innerHTML = '<div style=\"padding:7px;\"><div style=\"font-style:italic;font-size:11px;color:#000000;\">Author details are not currently available</div><div style=\"border-bottom:1px solid #cccccc;line-height:1px;margin-bottom:3px;\"></div><div style=\"font-style:italic;text-align:right;font-size:11px;color:#cccccc;\">Provided by Scopus</div></div>';
}

var objAuth = new Object();

function displayAuthHover(url)
{
  if (ajaxReq != null) {
    ajaxReq.transport.onreadystatechange = Prototype.emptyFunction;
    // abort the XHR
    ajaxReq.transport.abort();
    //update the request counter
    Ajax.activeRequestCount--;
  }
  var d = document.getElementById('authorLinkHover');
  if(d.length < 1) { return; }
  assignPosition(d);
  d.style.display="block";

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

  document.getElementById('authorLinkHover').innerHTML = '<div style="padding: 7px;"><div style="margin-bottom:7px; font-size: 12px;"><span  style="color: #999999;">Articles (...)</span><span style="margin-left: 5px; margin-right: 5px;">|</span><span style="color: #999999;">References (...)</span><span style="margin-left: 5px; margin-right: 5px;">|</span><span style="color: #999999;">Cited by (...)</span></div><div style="margin-bottom: 7px; font-size: 11px;"><span style="color: #999999;">Author profile</span>&nbsp;of&nbsp;'+ authorName +'</div><div style="border-bottom: 1px solid rgb(204, 204, 204); line-height: 1px; margin-bottom: 3px;"></div><div style="font-style: italic; text-align: right; font-size: 11px; color: rgb(204, 204, 204);">Provided by Scopus</div></div>';
}
    
  //for performance
  if (resText.length > 0) {
     clearTimeout(timerId);
     var d = document.getElementById('authorLinkHover');
     if(d.length < 1) { return; }
     d.innerHTML=resText;
     assignPosition(d);
     return;
  }

  ajaxReq = new Ajax.Request(url, { 
    method: 'get', 
    onSuccess: function(response) { 
      var d = $('authorLinkHover');
      clearTimeout(timerId);
      if(d.length < 1) { return; }
      objAuth["'"+authId+"'"] = response.responseText;
      d.innerHTML=response.responseText;
      assignPosition(d);
    }
  });

}

function assignPosition(d)
{
  if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
     d.style.left = Number(linkBufObj.offsetLeft + 22) + "px";
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
      d.style.top = findPosY(linkBufObj) + linkBufObj.offsetHeight + 8 + "px";
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
       d.style.top = posNext +  linkBufObj.offsetHeight + 8 + "px";
     }
     d.style.display = "block";

  } else {
     d.style.left = Number(linkBufObj.offsetLeft + 22) + "px";
     d.style.top = findPosY(linkBufObj) + linkBufObj.offsetHeight + 5 + "px";
     d.style.display = "block";

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
//-->
