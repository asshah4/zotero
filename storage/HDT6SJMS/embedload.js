<!--
var EMBED_APA = 0;
var EMBED_APB = 1;
var EMBED_APC = 2;
var EMBED_SRA = 3;
var EMBED_SRB = 4;
var containerIFrameHTMLUrl = "";
var conatainerIFrameJSUrl = "";
var CommnsIFrameJSUrl = "";

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
  this.moduleWidth         = moduleWidth;
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
      myFrame.style.width = mySDeItem.moduleWidth;
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
          this.containerFrame.style.height = this.myStatusDiv.offsetHeight;
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
               this.myFrame.style.height = newHeight;
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
            this.containerFrame.style.height = height;
         } 
         else
         {
            this.containerFrame.style.height = newHeight;
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
            this.containerFrame.style.height = 100;
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

//-->
