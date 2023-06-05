(function(){if(typeof ncbi==="undefined")ncbi={};if(ncbi.sg)typeof console!=="undefined"&&console.error&&console.error("The logging JavaScript was added twice in the document. Please include it one time.");else{ncbi.sg=function(){};ncbi.sg.getInstance=function(){if(!ncbi.sg._instance)ncbi.sg._instance=new ncbi.sg;return ncbi.sg._instance};ncbi.sg._instance=null;ncbi.sg._version="23";(function(){var a=navigator.cookieEnabled?true:false;if(typeof navigator.cookieEnabled==="undefined"&&!a){document.cookie=
"testcookie";a=document.cookie.indexOf("testcookie")!==-1?true:false}ncbi.sg.isCookieEnabled=a})();ncbi.sg.appLogIgnore=["ncbi_sessionid","ncbi_clickdisabled"];ncbi.sg.prototype={init:function(){this.isProcessRunning=true;this._setUpMetaTagValues();if(this._cachedVals.ncbi_app&&this._cachedVals.ncbi_app.value.toLowerCase()=="entrez"&&this._cachedVals.ncbi_db&&this._cachedVals.ncbi_db.value.toLowerCase()=="gene"&&this._cachedVals.ncbi_report&&this._cachedVals.ncbi_report.value.toLowerCase()=="full_report")ncbi.sg.isScrollingEnabled=
true;this._setUpPathParts();this._setUpCustomProps();this._addOnScrollListeners();this.send("init");this._sendPrev();this._addPrintPing();this._setBeforeScrollDetails()},_vals:{},_cachedVals:{},_hasInitRun:false,_pathParts:{part1:"",part2:"",part3:"",part4:""},_setUpMetaTagValues:function(){for(var a=document.getElementsByTagName("meta"),b=0;b<a.length;b++){var c=a[b].name;c.indexOf("ncbi_")===0&&this.addEntry(c,a[b].content)}},_setUpCachedMetaTagValues:function(a){for(var b=0;b<a.length;b++){var c=
this._cachedVals[a[b]];c&&this.addEntry(a[b],c.value)}},cachedNames:["ncbi_app","ncbi_db","ncbi_pcid","ncbi_pdid","ncbi_phid","ncbi_sessionid","ncbi_uidlist"],ignoreLengthRestrictions:["jserror","jserrorlocation"],addEntry:function(a,b){if(!(b===undefined||b.length===0)){if(b.length>100&&this.ignoreLengthRestrictions.indexOf(a)===-1)b=b.substr(0,100);this._cachedVals[a]={sProp:a,value:b}}},removeAllEntries:function(){for(var a={},b=this.cachedNames.length,c=0;c<b;c++){var e=this.cachedNames[c],f=
this._cachedVals[e];if(f)a[e]=f}this._cachedVals=a;for(var h in this._pathParts)this._pathParts[h]=""},_setUpCustomProps:function(){var a=this._pathParts.part1,b=this._pathParts.part2.length>0?":"+this._pathParts.part2:"",c=this._pathParts.part3.length>0?":"+this._pathParts.part3:"",e=this._pathParts.part4.length>0?":"+this._pathParts.part4:"";a={pagename:a+b+c,server:window.location.hostname,sitesect2:a+b,subsect3:a+b+c,subsect4:a+b+c+e,heir1:(a+b+c+e).replace(/:/g,"|")};for(var f in a)this.addEntry(f,
a[f]);this._sessionIdCheck();this._staticPageCheck();this._prevHitCheck();this._browserConfigurationSettings();this._hashCheck()},_staticPageCheck:function(){this._cachedVals.ncbi_app&&this._cachedVals.ncbi_app.value.length>0||this.addEntry("ncbi_app","static");this._cachedVals.ncbi_pdid&&this._cachedVals.ncbi_pdid.value.length>0||this.addEntry("ncbi_pdid",(document.title||"unknown").replace(/\s+/g,""))},_sessionIdCheck:function(){if(!(this._cachedVals.ncbi_sessionid&&this._cachedVals.ncbi_sessionid.value.length>
0)){var a="";if(a.length===0){var b=this.getCookie("WebCubbyUser")||this.getCookie("WebEnv");if(b.length>0){b=unescape(b).split("@");if(b.length>1)a=b[b.length-1]}}if(a.length===0)a="NOSESSIONID";this.addEntry("ncbi_sessionid",a)}},getBrowserWidthHeight:function(){var a=this.getViewportWidth(),b=this.getViewportHeight();return{width:a,height:b}},_browserConfigurationSettings:function(){var a=this.getBrowserWidthHeight();this.addEntry("browserwidth",a.width);this.addEntry("browserheight",a.height);
this.addEntry("screenwidth",screen.width);this.addEntry("screenheight",screen.height);this.addEntry("screenavailwidth",screen.availWidth);this.addEntry("screenavailheight",screen.availHeight);if(document&&document.body){var b=document.body.scrollWidth,c=document.body.scrollHeight,e=c>a.height?"true":"false";this.addEntry("canscroll_x",b>a.width?"true":"false");this.addEntry("canscroll_y",e);this.addEntry("scrollheight",b);this.addEntry("scrollwidth",c)}if(screen.colorDepth)this.addEntry("colorDepth",
screen.colorDepth);else screen.pixelDepth&&this.addEntry("colorDepth",screen.pixelDepth)},_hashCheck:function(){var a=window.location.hash;if(a){a=a.replace("#","");this.addEntry("urlhash",a)}(a=window.location.search.match(/[?&]campaign=([^&]*)/))&&this.addEntry("campaign",a[1])},_createPHID:function(){var a=this._cachedVals.ncbi_sessionid.value,b=a.substr(0,15)+"9"+(new Date).getTime().toString(),c=a.length;b+=a.substr(c-(32-b.length),c);a={value:b};this.addEntry("ncbi_phid",b);return a},currentPageHitId:null,
_prevHitCheck:function(){var a=this.getCookie("ncbi_prevPHID"),b=this._cachedVals.ncbi_phid;a.length>0&&this.addEntry("prev_phid",a);if(!b||!b.value||b.value.length===0)b=this._createPHID();this.currentPageHitId=b.value;var c=this;ncbi.sg._hasFocus&&c.setCookie("ncbi_prevPHID",b.value);var e=window.onfocus;window.onfocus=function(f){c.getCookie("ncbi_prevPHID")!==b.value&&c.setCookie("ncbi_prevPHID",b.value);typeof e==="function"&&e(f)}},_setUpPathParts:function(){var a=this._cachedVals.ncbi_app,
b=this._cachedVals.ncbi_db,c=this._cachedVals.ncbi_pdid,e=this._cachedVals.ncbi_pcid;this._pathParts.part1=a!==undefined?a.value:"";this._pathParts.part2=b!==undefined?b.value:"";this._pathParts.part3=c!==undefined?c.value:"";this._pathParts.part4=e!==undefined?e.value:""},getPerfStats:function(){var a=window.performance;if(!a)return{};var b=a.timing;if(b)b={dns:b.domainLookupEnd-b.domainLookupStart,connect:b.connectEnd-b.connectStart,ttfb:b.responseStart-b.connectEnd,basePage:b.responseEnd-b.responseStart,
frontEnd:b.loadEventStart-b.responseEnd};else return{};if(a=a.navigation){b.navType=a.type;b.redirectCount=a.redirectCount}return b},setPerfStats:function(a,b){var c=this.getPerfStats();for(var e in c){var f=c[e];if(f>=0){var h="jsperf_"+e;if(b)a[h]=f;else a.push(h+"="+f)}}},send:function(a,b){var c=[];if(a==="init"){c.push("jsevent=render");ncbi.sg.renderTime=new Date;if(typeof ncbi_startTime!=="undefined"){c.push("jsrendertime="+(ncbi.sg.renderTime-ncbi_startTime));ncbi.sg.loadTime&&c.push("jsloadtime="+
(ncbi.sg.loadTime-ncbi_startTime))}this.setPerfStats(c);c.push("cookieenabled="+(ncbi.sg.isCookieEnabled?"true":"false"))}for(var e in this._cachedVals)ncbi.sg.appLogIgnore.indexOf(e)===-1&&c.push(e+"="+encodeURIComponent(this._cachedVals[e].value));this.sendAl(c.join("&"),b,true);this._hasInitRun=true;var f=this;setTimeout(function(){f.isProcessRunning=false;f.runSGProcess()},300)},_sendPrev:function(){var a=ncbi.sg.getInstance(),b=a.getCookie("clicknext");if(b){ncbi.sg.ping(b);a.setCookie("clicknext",
"")}if(b=a.getCookie("prevsearch")){ncbi.sg.ping(b);a.setCookie("prevsearch","")}if(b=a.getCookie("unloadnext")){ncbi.sg.ping(b);a.setCookie("unloadnext","")}},sendAl:function(a,b,c){if(a.indexOf("jseventms")===-1)a+="&jseventms="+ncbi.sg.getInstance().getMillisecondsSinceSunday();a.match(/jsevent=search/i)&&this.setCookie("prevsearch",a.replace(/jsevent=search(next)?/i,"jsevent=searchnext"),null);a+="&sgVersion="+ncbi.sg._version;var e=window.location.port?":"+window.location.port:"";reqURL=typeof __ncbi_stat_url!==
"undefined"?__ncbi_stat_url+"?"+a:window.location.protocol+"//"+window.location.hostname+e+"/stat?"+a;this.makeAjaxCall(reqURL,function(){typeof b==="function"&&b()},c)},_processingQueue:[],isProcessRunning:false,addSGProcess:function(a){this._processingQueue.push(a)},getSGProcess:function(a){return this._processingQueue.shift(a)},runSGProcess:function(){if(this.isProcessRunning||this._processingQueue.length===0||!this._hasInitRun)return false;this.isProcessRunning=true;this.removeAllEntries();var a=
this.getSGProcess();this._setUpCachedMetaTagValues(a.metadata);this.addEntry("jsevent",a.eventName);for(var b in a.props)this.addEntry(b,a.props[b]);this.send(a.eventName,a.callbackFnc);var c=this;setTimeout(function(){c.isProcessRunning=false;c.runSGProcess()},300)},noteEventData:function(a,b,c,e){this.addSGProcess({eventName:a,props:b,metadata:c,callback:e});this.runSGProcess()},setCookie:function(a,b,c){if(window.sessionStorage)try{sessionStorage.setItem(a,b)}catch(e){}var f=new Date;c!==null&&
f.setDate(f.getDate()+c);document.cookie=a+"="+escape(b)+(c===null?"":"; expires="+f.toGMTString())+"; domain="+escape(".nih.gov")+"; path=/"},getCookie:function(a){var b;if(window.sessionStorage){try{b=sessionStorage.getItem(a)||""}catch(c){b=""}if(b.length>0)return b}if(document.cookie.length>0){b=document.cookie.indexOf(a+"=");if(b!==-1){b=b+a.length+1;a=document.cookie.indexOf(";",b);if(a===-1)a=document.cookie.length;return unescape(document.cookie.substring(b,a))}}return""},getTransport:function(){var a=
null;if(window.XMLHttpRequest)try{a=new XMLHttpRequest;this.getTransport=function(){return new XMLHttpRequest}}catch(b){a=null}if(window.ActiveXObject&&a===null)try{a=new ActiveXObject("Msxml2.XMLHTTP");this.getTransport=function(){return new ActiveXObject("Msxml2.XMLHTTP")}}catch(c){try{a=new ActiveXObject("Microsoft.XMLHTTP");this.getTransport=function(){return new ActiveXObject("Microsoft.XMLHTTP")}}catch(e){a=false}}if(a===null)this.getTransport=function(){return null};return this.getTransport()},
makeAjaxCall:function(a,b,c){var e=this.getTransport();e.open("GET",a,c);if(c)e.onreadystatechange=function(){e.readyState===4&&b(e)};ncbi.sg.lastPing=e;e.send(null)},scrollDetails:{maxScroll_x:0,maxScroll_y:0,currScroll_x:0,currScroll_y:0,hasScrolled:false},scrollEventDetails:{xTenths:0,yTenths:0,xMax:0,yMax:0},_getScrollXYPx:function(){return[window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||
0]},_getScrollXY:function(){var a=this.getViewportHeight(),b=this.getViewportWidth(),c=document.body.scrollHeight,e=document.body.scrollHeight,f=this._getScrollXYPx(),h=Math.round(f[1]/a*10)/10;return{xRel:Math.round(f[0]/b*10)/10,yRel:h,viewportHeight:a,viewportWidth:b,pageHeight:c,pageWidth:e}},_addOnScrollListeners:function(){var a=window.onscroll,b=this;window.onscroll=function(){if(ncbi.sg.isScrollingEnabled){b._setScrollDetails();b.scrollDetails.hasScrolled=true;b._addScrollEvent()}else{b._setScrollDetails();
b.scrollDetails.hasScrolled=true}if(typeof a==="function")return a()}},getViewportHeight:function(){return window.innerHeight?window.innerHeight:document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientHeight:document.body!==null?document.body.clientHeight:"NA"},getViewportWidth:function(){return window.innerWidth?window.innerWidth:document.documentElement&&document.documentElement.clientWidth?document.documentElement.clientWidth:document.body!==null?document.body.clientWidth:
"NA"},_setScrollDetails:function(){this.scrollDetails.currScroll_y=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;this.scrollDetails.currScroll_x=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;this.getViewportWidth();this.getViewportHeight();if(this.scrollDetails.maxScroll_y<this.scrollDetails.currScroll_y)this.scrollDetails.maxScroll_y=this.scrollDetails.currScroll_y;if(this.scrollDetails.maxScroll_x<this.scrollDetails.currScroll_x)this.scrollDetails.maxScroll_x=
this.scrollDetails.currScroll_x},findElementPos:function(a,b,c){var e=0,f=0;if(a.offsetLeft)e+=parseInt(a.offsetLeft);if(a.offsetTop)f+=parseInt(a.offsetTop);if(a.scrollTop&&a.scrollTop>0){f-=parseInt(a.scrollTop);c=true}if(a.scrollLeft&&a.scrollLeft>0){e-=parseInt(a.scrollLeft);b=true}if(a.offsetParent){b=this.findElementPos(a.offsetParent,b,c);e+=b[0];f+=b[1]}else if(a.ownerDocument){var h=a.ownerDocument.defaultView;if(!h&&a.ownerDocument.parentWindow)h=a.ownerDocument.parentWindow;if(h){var r=
h.pageXOffset!==undefined?h.pageXOffset:(a.document.documentElement||a.document.body.parentNode||a.document.body).scrollLeft;a=h.pageYOffset!==undefined?h.pageYOffset:(a.document.documentElement||a.document.body.parentNode||a.document.body).scrollTop;if(!c&&a&&a>0)f-=parseInt(a);if(!b&&r&&r>0)e-=parseInt(r);if(h.frameElement){b=this.findElementPos(h.frameElement);e+=b[0];f+=b[1]}}}return[e,f]},addObjData:function(a,b){for(var c in b)a[c]=b[c]},getJoinedData:function(a){var b=[];for(var c in a)b.push(c+
"="+encodeURIComponent(a[c]));return b.join("&")},addScrollHeadingData:function(a,b){var c=this.scrollEventDetails.headings;if(c){a["numHeadings."+this._scrollOrder+".scrollInfo"]=c.length;for(var e=0;e<c.length;e++){var f=c[e];if(f.visible){var h={};if(f.innerText)h["innerText."+f.index+".headings."+this._scrollOrder+".scrollInfo"]=f.innerText;if(f.id)h["id."+f.index+".headings."+this._scrollOrder+".scrollInfo"]=f.id;h["tagName."+f.index+".headings."+this._scrollOrder+".scrollInfo"]=f.tagName;b=
b?b:1800;this.getJoinedData(a).length+this.getJoinedData(h).length<b&&this.addObjData(a,h)}}}return a},getVisibleHeadings:function(){for(var a=[],b=document.getElementsByTagName("*"),c=-1,e=0;e<b.length;e++){for(var f=b[e],h=false,r=f.tagName.toLowerCase(),k=0;k<7;k++)if(r=="h"+k)h=true;if(h){c+=1;k=this.findElementPos(f);h=k[1];k=k[0];var w=f.offsetHeight,F=f.offsetWidth,G=this.getViewportHeight(),C=this.getViewportWidth(),t={},u=f.getAttribute("id")||f.id;if(u)t.id=u;if(f=(f.getAttribute("innerText")||
f.innerText||f.getAttribute("textContent")||f.textContent).replace(/^\s+|\s+$/g,""))t.innerText=f.substring(0,50);t.index=c;t.tagName=r;if(h+w>=0&&h<=G&&k+F>=0&&k<=C){t.visible=true;a.push(t)}}}return a},_setBeforeScrollDetails:function(a){this._lastScroll=a?a:null;a=this._getScrollXY();var b=a.yRel;this.scrollEventDetails.xTenths=Math.round(a.xRel*10);this.scrollEventDetails.yTenths=Math.round(b*10);this.scrollEventDetails.xMax=Math.max(this.scrollEventDetails.xTenths,this.scrollEventDetails.xMax);
this.scrollEventDetails.yMax=Math.max(this.scrollEventDetails.yTenths,this.scrollEventDetails.yMax);this.scrollEventDetails.headings=this.getVisibleHeadings()},getScrollDetails:function(a,b){if(!ncbi.sg.isScrollingEnabled){this._setScrollDetails();return this.scrollDetails}var c=this.scrollEventDetails;c.tstamp=(new Date).getTime();var e=this._getScrollXY(),f=null;if(b||!this._lastScroll||c.tstamp-this._lastScroll>1E3){this._scrollOrder=this._scrollOrder!=undefined?this._scrollOrder+1:0;b="yTenths."+
this._scrollOrder+".scrollInfo";f="xTenths."+this._scrollOrder+".scrollInfo";var h="maxXTenths."+this._scrollOrder+".scrollInfo",r="maxYTenths."+this._scrollOrder+".scrollInfo",k={};k["duration."+this._scrollOrder+".scrollInfo"]=this._lastScroll?c.tstamp-this._lastScroll:new Date-ncbi.sg.loadTime;k[f]=this.scrollEventDetails.xTenths;k[b]=this.scrollEventDetails.yTenths;k[h]=this.scrollEventDetails.xMax;k[r]=this.scrollEventDetails.yMax;k["viewportHeight.scrollInfo"]=e.viewportHeight;k["viewportWidth.scrollInfo"]=
e.viewportWidth;k["maxPossibleScrollTenthsY."+this._scrollOrder+".scrollInfo"]=Math.round((e.pageHeight/e.viewportHeight-1)*10);k["maxPossibleScrollTenthsX."+this._scrollOrder+".scrollInfo"]=Math.round((e.pageWidth/e.viewportWidth-1)*10);f=k=this.addScrollHeadingData(k,a)}this._setBeforeScrollDetails(c.tstamp);return f},getScrollDetailsAr:function(a,b){var c=[];a=this.getScrollDetails(a,b);for(var e in a)c.push(e+"="+encodeURIComponent(a[e]));return c},addScrollDetailsAr:function(a,b,c){b=this.getScrollDetailsAr(b,
c);for(c=0;c<b.length;c++)a.push(b[c])},addScrollDetails:function(a,b,c){b=this.getScrollDetails(b,c);for(var e in b)a[e]=b[e]},trimScrollDetails:function(){},_addScrollEvent:function(){try{var a=this.getScrollDetails();if(a){a.jsevent="scroll";ncbi.sg.ping(a)}}catch(b){ncbi.sg.getInstance().noteEventData("jserror",{jserror:b.toString(),currenturl:window.location.href},["ncbi_sessionid","ncbi_phid"])}},_addPrintPing:function(){function a(){var e=document.createElement("style");e.type="text/css";var f=
document.createElement("style");f.type="text/css";f.media="print";for(var h=["jsevent=print"],r=0;r<b.cachedNames.length;r++){var k=b.cachedNames[r],w=b._cachedVals[k];w&&k!=="ncbi_sessionid"&&h.push(k+"="+encodeURIComponent(w.value))}h=".print-log { position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden; }.print-log li { list-style-image: url('/stat?"+h.join("&")+"'); }";if(f.styleSheet){f.styleSheet.cssText=h;e.styleSheet.cssText=".print-log { position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden; }"}else{f.appendChild(document.createTextNode(h));
e.appendChild(document.createTextNode(".print-log { position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden; }"))}h=document.getElementsByTagName("head")[0];h.appendChild(f);h.appendChild(e);e=document.createElement("ul");e.className="print-log";f=document.createElement("li");e.appendChild(f);document.body.appendChild(e)}var b=this;if(typeof jQuery!=="undefined")jQuery(a);else{var c=window.onload;window.onload=function(e){c&&c(e);a()}}},getMillisecondsSinceSunday:function(){var a=
new Date,b=new Date;b.setDate(b.getDate()-b.getDay());b.setHours(0);b.setMinutes(0);b.setSeconds(0);b.setMilliseconds(0);return(a-b).toString(36)}};ncbi.sg.lastPing=null;ncbi.sg.hasNotedErrorEvent=false;(function(){function a(){ncbi.sg.getInstance().setCookie("ncbi_prevPHID",ncbi.sg.getInstance().currentPageHitId);if(u.length>0)for(;u.length>0;)e(u.pop());var d={jsevent:"unload",ncbi_pingaction:"unload"};if(typeof ncbi_startTime!=="undefined"){d.ncbi_timeonpage=new Date-ncbi_startTime;if(typeof ncbi_onloadTime!==
"undefined"&&ncbi_onloadTime)d.ncbi_onloadTime=ncbi_onloadTime-ncbi_startTime}var g=ncbi.sg.getInstance();g.setPerfStats(d,true);g.addScrollDetails(d,1800-g.getJoinedData(d).length,true);if(!I){ncbi.sg.ping(d);var i="";for(var l in d)i+=l+"="+(l==="jsevent"?"unloadnext":d[l])+"&";i+="ncbi_phid="+g.currentPageHitId;g.setCookie("unloadnext",i,null)}I=true}function b(d){if(d){if(d.onclick)d.onclick_=d.onclick;if(d.oncontextmenu)d.oncontextmenu_=d.oncontextmenu}}function c(d){for(var g=u.length-1;g>=
-1;g--)if(u[g]===d){u.slice(g,1);break}e(d)}function e(d,g){if(J.indexOf(d.tstamp)===-1){J.push(d.tstamp);L.push(d);f("click",d,g)}}function f(d,g,i){var l=d==="click"?"link":"elem",j=g.link,q=g.evt,n=j.id||"",o=j.name||"",B=j.sid||"",z=j.href||"",v=j.innerText||j.textContent||"";if(v.length>50)v=v.substr(0,50);var x=j.getAttribute?j.getAttribute("ref")||j.ref||"":"",y=j.className?j.className.replace(/^\s?/,"").replace(/\s?$/,"").split(/\s/g).join(",")||"":"";g=[];var A=[],s=j.parentNode;if(s)for(var p=
0;p<6&&s!==null;p++){(parId=s.id)&&g.push(parId);if(parClassName=s.className)A=A.concat(parClassName.split(/\s/));s=s.parentNode}s=ncbi.sg.getInstance();p=s.currentPageHitId||"";var m=[];n.length>0&&m.push(l+"_id="+encodeURIComponent(n));o.length>0&&m.push(l+"_name="+encodeURIComponent(o));B.length>0&&m.push(l+"_sid="+encodeURIComponent(B));z.length>0&&m.push(l+"_href="+encodeURIComponent(z));v.length>0&&m.push(l+"_text="+encodeURIComponent(v));y.length>0&&m.push(l+"_class="+encodeURIComponent(y));
p=s.getBrowserWidthHeight();p.width!==null&&m.push("browserwidth="+encodeURIComponent(p.width));p.height!==null&&m.push("browserheight="+encodeURIComponent(p.height));for(var D in q){p=q[D];p!==undefined&&m.push(D.toLowerCase()+"="+p.toString())}m.push("jsevent="+d);x.length>0&&m.push(x);if(typeof jQuery!=="undefined")if(j=jQuery(j).attr("sg")){j=j.split(/\}\s*,\s*\{/);for(p=0;p<j.length;p++){q=j[p].match(/name\s*:\s*'(.+)',\s*selector\s*:\s*'(.+)'/);if(q.length===3){D="cust_"+q[1];q=jQuery(q[2]).val();
m.push(D+"="+encodeURIComponent(q))}}}if(i&&i.length>0)for(;i.length>0;)m.push(i.shift());g.length>0&&m.push("ancestorId="+g.join(","));A.length>0&&m.push("ancestorClassName="+A.join(",").replace(/\s+/g," ").replace(/(^\s|\s$)/g,""));s.addScrollDetailsAr(m,1800-m.join("&").length,true);if(d==="click"){d=m.join("&").replace("jsevent=click","jsevent=clicknext");p=ncbi.sg.getInstance().currentPageHitId||"";d+="&ncbi_phid="+p;s.setCookie("clicknext",d,null)}ncbi.sg.ping(m,true)}function h(d){var g={};
if(d){if(d.clientX||d.clientY){var i=ncbi.sg.getInstance()._getScrollXYPx();g.evt_coor_x=d.clientX+i[0];g.evt_coor_y=d.clientY+i[1]}else if(d.pageX||d.pageY){g.evt_coor_x=d.pageX;g.evt_coor_y=d.pageY}g.jseventms=ncbi.sg.getInstance().getMillisecondsSinceSunday()}return g}function r(d,g,i){function l(n,o,B,z){function v(A){for(var s=[function(m){if(typeof m.preventDefault==="undefined")m.preventDefault=function(){this.returnValue=false};if(typeof m.stopPropagation==="undefined")m.stopPropagation=function(){this.cancelBubble=
true};return m}(n)],p=0;p<B.length;p++)s.push(B[p]);y=o[A].apply(o,s)}ncbi.sg.getInstance().setCookie("ncbi_prevPHID",ncbi.sg.getInstance().currentPageHitId);var x=h(n);x.iscontextmenu=z==="contextmenu"?"true":"false";x={evt:x,link:o,tstamp:(new Date).getTime(),floodTstamp:(new Date).getTime()};c(x);ncbi.sg.clickTimers&&window.clearTimeout(ncbi.sg.clickTimers);ncbi.sg.clickTimers=window.setTimeout(function(){ncbi.sg.clickTimers=null},300);var y=null;if(z==="click"&&typeof o.onclick_==="function")v("onclick_");
else z==="contextmenu"&&typeof o.oncontextmenu_==="function"&&v("oncontextmenu_");if(y!==null||y!==undefined)return y}for(var j=0;j<10&&g<i;j++){var q=d[g];if(q&&!q._sg){q._sg=true;b(q);q.onclick=function(n){var o=null;o=l(n||window.event,this,arguments,"click");if(o!==null||o!==undefined)return o};q.oncontextmenu=function(n){var o=null;o=l(n||window.event,this,arguments,"contextmenu");if(o!==null||o!==undefined)return o}}g++}g<i&&window.setTimeout(function(){r(d,g,i)},0)}function k(d){for(var g=
[],i=0;i<d.length;i++)g.push(d[i]);return g}function w(){if(ncbi.sg.isClickEnabled){var d=k(document.links);r(d,0,d.length);d=k(document.getElementsByTagName("button"));r(d,0,d.length);d=[];if(typeof jQuery!=="undefined")d=k(jQuery("input[type=button], input[type=submit], input[type=reset]").get());else{var g=k(document.getElementsByTagName("input"));d=[];for(var i=g.length-1;i>=0;){var l=g[i],j=l.type;if(j==="button"||j==="submit"||j==="reset")d.push(l);i--}}d.length>0&&r(d,0,d.length)}}function F(d,
g,i,l){var j={},q=null,n=null;if(typeof g==="string"){q=g;n=i}else{j=h(g);q=i;n=l}if(n){g=typeof n;if(g==="string")n=[n];else if(g==="object"&&!(n instanceof Array)){g=[];for(var o in n)g.push(o+"="+n[o]);n=g}}ncbi.sg.sendElementEvent(q,{link:d,evt:j},n)}function G(d,g){var i=[];if(typeof g==="undefined")g=true;if(typeof d==="object"&&!(d instanceof Array))for(var l in d)i.push(l+"="+encodeURIComponent(d[l]));else if(typeof d==="string")i.push(d);else i=d;d=ncbi.sg.getInstance().currentPageHitId||
"";l=null;if(typeof ncbi.sg.loadTime!=="undefined")l=new Date-ncbi.sg.loadTime;var j=i.join("&");if(j.indexOf("jsevent=clicknext")!==-1||j.indexOf("jsevent=searchnext")!==-1||j.indexOf("jsevent=unloadnext")!==-1){d.length>0&&i.push("next_phid="+encodeURIComponent(d));l!==null&&i.push("next_ncbi_timesinceload="+l)}else{d.length>0&&i.push("ncbi_phid="+encodeURIComponent(d));l!==null&&i.push("ncbi_timesinceload="+l)}ncbi.sg.getInstance().sendAl(i.join("&"),null,g)}var C=window.onerror;window.onerror=
function(d,g,i){if(!ncbi.sg.hasNotedErrorEvent){ncbi.sg.getInstance().noteEventData("jserror",{jserror:d,jserrorlocation:g,jserrorline:i,currenturl:window.location.href},["ncbi_sessionid","ncbi_phid"]);ncbi.sg.hasNotedErrorEvent=true;if(typeof C==="function")return C(d,g,i)}};var t=window.onbeforeunload;window.onbeforeunload=function(d){a();if(typeof t==="function")return t(d)};var u=[],J=[],L=[],I=false;ncbi.sg.sendElementEvent=f;ncbi.sg.clickTimers=[];if(typeof ncbi.sg.isClickEnabled==="undefined"){for(var H=
document.getElementsByTagName("meta"),E=H.length-1,K=true;E>=0;){if(H[E].name.toLowerCase()==="ncbi_clickdisabled"){K=H[E].content.toLowerCase()==="false";break}E--}ncbi.sg.isClickEnabled=K}w();ncbi.sg.scanLinks=function(d){if(d){if(typeof d==="object"&&!(d instanceof Array))d=[d];r(d,0,d.length)}else w()};ncbi.sg.ping=function(d,g,i,l){typeof d==="undefined"||d===null||(typeof d==="object"&&d.nodeName!==undefined?F(d,g,i,l):G(d,g))};ncbi.sg.loadTime=new Date})();if(!Array.prototype.indexOf)Array.prototype.indexOf=
function(a,b){var c=this.length>>>0;b=Number(b)||0;b=b<0?Math.ceil(b):Math.floor(b);if(b<0)b+=c;for(;b<c;b++)if(b in this&&this[b]===a)return b;return-1};(function(){function a(){ncbi_onloadTime=new Date}ncbi_onloadTime=null;if(typeof jQuery!=="undefined")jQuery(window).load(a);else{var b=window.onload;window.onload=function(c){b&&b(c);a()}}})()}})();

;
// This code creates window.console if it doesn't exist.
// It also creates stub functions for those functions that are missing in window.console.
// (Safari implements some but not all of the firebug window.console methods--this implements the rest.)
(function() {
    var names = [ "log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group",
                  "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd" ];

    if (typeof(console) === 'undefined' || typeof console === "function" ) {
      //"typeof function" is needed see PP-769 
      console = {};
    }

    for (var i = 0; i < names.length; ++i) {
       if (typeof(console[names[i]]) === 'undefined') {
          console[names[i]] = function() { return false; };
       }
    }
    ncbi.sg.getInstance().init();                          
})();
