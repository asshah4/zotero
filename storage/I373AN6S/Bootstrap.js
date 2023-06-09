var ensightenOptions = {
    client: 'npg',
    clientId: 322,
    space: 'prod',
    isPublicSpace: 1,
    serverComponentLocation: 'nexus.ensighten.com/npg/prod/serverComponent.php',
    staticJavscriptPath: 'nexus.ensighten.com/npg/prod/code/',
    ns: 'Bootstrapper',
    nexus: "nexus.ensighten.com",
    scUseCacheBuster: "true"
};

if ( !window[ensightenOptions.ns] ) {
window[ensightenOptions.ns]=function(d){var c={},b={};c.version="1.4.1";c.nexus=d.nexus||"nexus.ensighten.com";c.options={interval:d.interval||100,erLoc:d.errorLocation||c.nexus+"/error/e.gif",scLoc:d.serverComponentLocation||c.nexus+"/"+d.client+"/serverComponent.php",sjPath:d.staticJavscriptPath||c.nexus+"/"+d.client+"/code/",alLoc:d.alertLocation||c.nexus+"/alerts/a.gif",space:d.space,isPublicSpace:d.isPublicSpace,client:d.client,clientId:d.clientId,scUseCacheBuster:d.scUseCacheBuster};c.ruleList=
[];c.exceptionList=[];c.ensightenVariables={};c.test=function(a){if(!a.executionData.hasRun){for(var b=0;b<a.dependencies.length;b++)if(!1===a.dependencies[b]())return;a.execute()}};b.currentRuleId=-1;b.currentDeploymentId=-1;b.reportedErrors=[];b.reportedAlerts=[];b.AF=[];b._serverTime="";b._clientIP="";b.getServerComponent=function(a){b.insertScript(window.location.protocol+"//"+c.options.scLoc,!1,a||!0,c.options.scUseCacheBuster)};b.setVariable=function(a,b){c.ensightenVariables[a]=b};b.getVariable=
function(a){return a in c.ensightenVariables?c.ensightenVariables[a]:null};b.testAll=function(){for(var a=0;a<c.ruleList.length;a++)c.test(c.ruleList[a])};b.executionState={DOMParsed:!1,DOMLoaded:!1,conditionalRules:!1};b.reportException=function(a){a.timestamp=(new Date).getTime();c.exceptionList.push(a);a=b.imageRequest(window.location.protocol+"//"+c.options.erLoc+"?msg="+a.message+"&lnn="+(a.lineNumber||a.line)+"&fn="+(a.fileName||a.sourceURL)+"&cid="+c.options.clientId+"&client="+c.options.client+
"&space="+c.options.space+"&rid="+b.currentRuleId+"&did="+b.currentDeploymentId);a.timestamp=(new Date).getTime();this.reportedErrors.push(a)};b.Rule=function(a){this.execute=function(){this.executionData.hasRun=!0;this.executionData.runTime.push(new Date);b.currentRuleId=this.id;b.currentDeploymentId=this.deploymentId;try{this.code()}catch(a){window[ensightenOptions.ns].reportException(a)}finally{b.testAll()}};this.id=a.id;this.deploymentId=a.deploymentId;this.dependencies=a.dependencies||[];this.code=
a.code;this.executionData={hasRun:!1,runTime:[]}};b.registerRule=function(a){if(b.getRule(a.id)&&-1!==a.id)return!1;c.ruleList.push(a);b.testAll();return!0};b.getRule=function(a){for(var b=0;b<c.ruleList.length;b++)if(c.ruleList[b].id===a)return c.ruleList[b];return!1};b.hasRuleRun=function(a){return(a=b.getRule(a))?a.executionData.hasRun:!1};c.toTwoChar=function(a){return(2===a.toString().length?"":"0")+a};b.Alert=function(a){var b=new Date,b=b.getFullYear()+"-"+c.toTwoChar(b.getMonth())+"-"+c.toTwoChar(b.getDate())+
" "+c.toTwoChar(b.getHours())+":"+c.toTwoChar(b.getMinutes())+":"+c.toTwoChar(b.getSeconds());this.severity=a.severity||1;this.date=b;this.subject=a.subject||"";this.type=a.type||1;this.ruleId=a.ruleId||-1};b.generateAlert=function(a){a=b.imageRequest(window.location.protocol+"//"+c.options.alLoc+"?d="+a.date+"&su="+a.subject+"&se="+a.severity+"&t="+a.type+"&cid="+c.options.clientId+"&client="+c.options.client+"&space="+c.options.space+"&rid="+b.currentRuleId+"&did="+b.currentDeploymentId);a.timestamp=
(new Date).getTime();this.reportedAlerts.push(a)};b.imageRequest=function(a){var b=new Image(0,0);b.src=a;return b};b.insertScript=function(a,b,e,l){var f=document.getElementsByTagName("script"),d;l=void 0!==l?l:!0;if(void 0!==b?b:1)for(d=0;d<f.length;d++)if(f[d].src===a&&f[d].readyState&&/loaded|complete/.test(f[d].readyState))return;if(e){e=!0==e&&"object"==typeof window._ensSCData?window._ensSCData:e;b=Math.random()*("1E"+(10*Math.random()).toFixed(0));f=window.location.href;if("object"===typeof e)for(d in e){d=
~f.indexOf("#")?f.slice(f.indexOf("#"),f.length):"";f=f.slice(0,d.length?f.length-d.length:f.length);f+=~f.indexOf("?")?"&":"?";for(k in e)f+=k+"="+e[k]+"&";f=f.slice(0,-1)+d;break}a+="?";l&&(a+="r="+b+"&");a+="ClientID="+c.options.clientId+"&PageID="+encodeURIComponent(f)}var g=document,h=a,j=g.head||g.getElementsByTagName("head");setTimeout(function(){if("item"in j){if(!j[0]){setTimeout(arguments.callee,25);return}j=j[0]}var a=g.createElement("script");a.src=h;a.onload=a.onerror=function(){this.addEventListener&&
(this.readyState="loaded")};j.insertBefore(a,j.firstChild)},0)};b.loadScriptCallback=function(a,b){var e=document.getElementsByTagName("script"),c,f=e[0];for(c=0;c<e.length;c++)if(e[c].src===a&&e[c].readyState&&/loaded|complete/.test(e[c].readyState))try{b()}catch(d){window[ensightenOptions.ns].reportException(d)}finally{return}e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=a;e.onerror=function(){this.addEventListener&&(this.readyState="loaded")};e.onload=e.onreadystatechange=
function(){if(!this.readyState||"complete"===this.readyState||"loaded"===this.readyState){this.onload=this.onreadystatechange=null;this.addEventListener&&(this.readyState="loaded");try{b.call(this)}catch(a){window[ensightenOptions.ns].reportException(a)}}};f.parentNode.insertBefore(e,f)};b.unobtrusiveAddEvent=function(a,b,e){try{var c=a[b]?a[b]:function(){};a[b]=function(){e.apply(this,arguments);return c.apply(this,arguments)}}catch(f){window[ensightenOptions.ns].reportException(f)}};b.anonymous=
function(a,c){return function(){try{b.currentRuleId=c?c:"anonymous",a()}catch(e){window[ensightenOptions.ns].reportException(e)}}};b.setCurrentRuleId=function(a){b.currentRuleId=a};b.setCurrentDeploymentId=function(a){b.currentDeploymentId=a};b.bindImmediate=function(a,c,e){if("function"===typeof a)a=new b.Rule({id:c||-1,deploymentId:e,dependencies:[],code:a});else if("object"!==typeof a)return!1;b.registerRule(a)};b.bindDOMParsed=function(a,c,e){if("function"===typeof a)a=new b.Rule({id:c||-1,deploymentId:e,
dependencies:[function(){return window[ensightenOptions.ns].executionState.DOMParsed}],code:a});else if("object"!==typeof a)return!1;b.registerRule(a)};b.bindDOMLoaded=function(a,c,e){if("function"===typeof a)a=new b.Rule({id:c||-1,deploymentId:e,dependencies:[function(){return window[ensightenOptions.ns].executionState.DOMLoaded}],code:a});else if("object"!==typeof a)return!1;b.registerRule(a)};b.bindPageSpecificCompletion=function(a,c,e){if("function"===typeof a)a=new b.Rule({id:c||-1,deploymentId:e,
dependencies:[function(){return window[ensightenOptions.ns].executionState.conditionalRules}],code:a});else if("object"!==typeof a)return!1;b.registerRule(a)};b.checkHasRun=function(a){if(0===a.length)return!0;for(var c,e=0;e<a.length;++e)if(c=b.getRule(parseInt(a[e],10)),!c||!c.executionData.hasRun)return!1;return!0};b.bindDependencyImmediate=function(a,c,e,d){var f=[];f.push(function(){return window[ensightenOptions.ns].checkHasRun(e)});if("function"===typeof a)a=new b.Rule({id:c||-1,deploymentId:d,
dependencies:f,code:a});else if("object"!==typeof a)return!1;b.registerRule(a)};b.bindDependencyDOMLoaded=function(a,c,e,d){var f=[];f.push(function(){return window[ensightenOptions.ns].executionState.DOMLoaded});f.push(function(){return window[ensightenOptions.ns].checkHasRun(e)});if("function"===typeof a)a=new b.Rule({id:c||-1,deploymentId:d,dependencies:f,code:a});else if("object"!==typeof a)return!1;b.registerRule(a)};b.bindDependencyDOMParsed=function(a,c,e,d){var f=[];f.push(function(){return window[ensightenOptions.ns].executionState.DOMParsed});
f.push(function(){return window[ensightenOptions.ns].checkHasRun(e)});if("function"===typeof a)a=new b.Rule({id:c||-1,deploymentId:d,dependencies:f,code:a});else if("object"!==typeof a)return!1;b.registerRule(a)};b.bindDependencyPageSpecificCompletion=function(a,c,e,d){var f=[];f.push(function(){return window[ensightenOptions.ns].executionState.conditionalRules});f.push(function(){return window[ensightenOptions.ns].checkHasRun(e)});if("function"===typeof a)a=new b.Rule({id:c||-1,deploymentId:d,dependencies:f,
code:a});else if("object"!==typeof a)return!1;b.registerRule(a)};b.callOnDOMParsed=function(){window[ensightenOptions.ns].executionState.DOMParsed=!0;window[ensightenOptions.ns].testAll()};b.callOnDOMLoaded=function(){window[ensightenOptions.ns].executionState.DOMParsed=!0;window[ensightenOptions.ns].executionState.DOMLoaded=!0;window[ensightenOptions.ns].testAll()};b.callOnPageSpecificCompletion=function(){for(var a=document.getElementsByTagName("script"),b=0,c=a.length;b<c;b++)if(a[b].src.match(/\.ensighten\.com\/(.+?)\/code\/.*/i)&&
!("loaded"==a[b].readyState||"complete"==a[b].readyState)){setTimeout(window[ensightenOptions.ns].callOnPageSpecificCompletion,50);return}setTimeout(function(){window[ensightenOptions.ns].executionState.conditionalRules=!0;window[ensightenOptions.ns].testAll()},1)};b.hasDOMParsed=function(){return window[ensightenOptions.ns].executionState.DOMParsed};b.hasDOMLoaded=function(){return window[ensightenOptions.ns].executionState.DOMLoaded};b.hasPageSpecificCompletion=function(){return window[ensightenOptions.ns].executionState.conditionalRules};
b.new_fArray=function(){var a=[],b=!1,c=!1;return{add:function(d){b&&!c?d():"function"==typeof d&&(a[a.length]=d)},exec:function(){c=!0;do{var d=a;a=[];b=!0;for(var f=0;f<d.length;f++)try{d[f].call(window)}catch(g){window[ensightenOptions.ns].reportException(g)}}while(0<a.length);c=!1},haveRun:function(){return b}}};c.timer=null;d=function(a,b){return function(){a.apply(b,arguments)}};window.console||(window.console={});var g=window.console;if(!g.log)if(window.log4javascript){var h=log4javascript.getDefaultLogger();
g.log=d(h.info,h);g.debug=d(h.debug,h);g.info=d(h.info,h);g.warn=d(h.warn,h);g.error=d(h.error,h)}else g.log=function(){};g.debug||(g.debug=g.log);g.info||(g.info=g.log);g.warn||(g.warn=g.log);g.error||(g.error=g.log);document.addEventListener?(-1<navigator.userAgent.indexOf("AppleWebKit/")?c.timer=window.setInterval(function(){/loaded|complete/.test(document.readyState)&&(clearInterval(c.timer),b.callOnDOMParsed())},50):document.addEventListener("DOMContentLoaded",b.callOnDOMParsed,!1),window.addEventListener("load",
b.callOnDOMLoaded,!1)):(setTimeout(function(){var a=window.document;(function(){try{if(!document.body)throw"continue";a.documentElement.doScroll("left")}catch(b){setTimeout(arguments.callee,15);return}window[ensightenOptions.ns].callOnDOMParsed()})()},1),window.attachEvent("onload",function(){window[ensightenOptions.ns].callOnDOMLoaded()}));window.setInterval(b.testAll,c.options.interval);return b}(ensightenOptions);

    
Bootstrapper.bindImmediate(function(){Bootstrapper.myLog=function(a){if(window.console){console.log(a);}};Bootstrapper.Cookies=new function(){var hosts=['.nature.com','.scientificamerican.com'];for(var i=0;i<hosts.length;i++){var tempRegex=new RegExp(hosts[i]);if(document.location.host.match(tempRegex)){this.defaultDomain=hosts[i];}}
this._cookies={};this.build=function(){for(var c=document.cookie.split("; "),a=0;a<c.length;a++)this._cookies[c[a].slice(0,c[a].indexOf("="))]=c[a].slice(c[a].indexOf("=")+1)};this.get=function(c,a,f){this.build();var g=this._cookies[c];if(arguments.length==1)return g;else for(var g=g.split(f||"&"),d=0,b=g.length;d<b;d++)if(g[d].indexOf(a+"=")==0)return g[d].slice((a+"=").length,g[d].length)};this.modCookie=function(c,a,f,g){document.cookie=c+"="+a+(f?";expires="+f:"")+";domain="+(g?g:this.defaultDomain)+";path=/"};this.set=function(c,a,f,g){if(arguments.length==4){for(var d="",b=0;b<a.length;b++)d+=(b!=0?f:"")+a[b].join("=");this.modCookie(c,d,g)}else if(arguments.length==3)if(typeof a=="object")if(typeof f=="object"){d="";for(b=0;b<a.length;b++)d+=(b!=0?"&":"")+a[b].join("=");this.modCookie(c,d,f)}else{d="";for(b=0;b<a.length;b++)d+=(b!=0?f:"")+a[b].join("=");this.modCookie(c,d)}else this.modCookie(c,a,f);else if(typeof a=="object"){d="";for(b=0;b<a.length;b++)d+=(b!=0?"&":"")+a[b].join("=");this.modCookie(c,d)}else this.modCookie(c,a)};this.addValue=function(c,a,f,g){this.build();var d=this._cookies[c]||"";if(arguments.length==4){for(var b="",e=0;e<a.length;e++)b+=(d==""&&e==0?"":f)+a[e].join("=");this.modCookie(c,d+b,g)}else if(arguments.length==3)if(typeof a=="object")if(typeof f=="object"){b="";for(e=0;e<a.length;e++)b+=(d==""&&e==0?"":"&")+a[e].join("=");this.modCookie(c,d+b,f)}else{b="";for(e=0;e<a.length;e++)b+=(d==""&&e==0?"":f)+a[e].join("=");this.modCookie(c,d+b)}else this.modCookie(c,d+a,f);else if(typeof a=="object"){b="";for(e=0;e<a.length;e++)b+=(d==""&&e==0?"":"&")+a[e].join("=");this.modCookie(c,d+b)}else this.modCookie(c,d+a)};this.remove=function(c,a){this.build();if(this._cookies[c]){var f=(new Date).toGMTString();this.modCookie(c,"",f,a)}};this.check=function(c,a){this.build();return arguments.length==2?this.get(c).match(a+"=")?!0:!1:this._cookies[c]?!0:!1};this.build()};Bootstrapper.linkTracker=(function(){var _private={links:{},pushTrack:function(name,fn){if(typeof name!='string'){return false;}
this.links[name]=this.links[name]||[];if(typeof fn=='function'){this.links[name].push(fn);}
return true;},callTrack:function(name){if(typeof name!='string'){return false;}
var l=_private.links[name];if(typeof l=='object'&&l.length){for(var i=0;i<l.length;i++){l[i].call(this);}}},debug:function(name,ref){if(window.location.search.match(/debugger=true/)){console.log('::linkTracker - Name:'+name);console.log('::linkTracker - Scope:'+ref);}}},_public={addLink:function(name,fn){return _private.pushTrack(name,fn);},addTracking:function(name,fn){return _private.pushTrack(name,fn);},getLink:function(name){return _private.links[name];},track:function(name,ref){var $this=ref||window;_private.debug(name,$this);return _private.callTrack.call($this,name);}};return _public;})();Bootstrapper.ajaxListener=(function(){var listeners={},listener=function(a,b){var detected=[],selector=a||function(){},attach=b||function(node){};return function(){if(typeof selector=='function'&&typeof attach=='function'){var n=selector();if(typeof n=='object'){if(typeof n.length!='undefined'){for(var i=n.length-1;i>=0;i--){for(var j=0;j<detected.length;j++){if(n[i]==detected[j]){n.splice(i,1);}}}
for(var i=0;i<n.length;detected.push(n[i++]));for(var i=0;i<n.length;attach.call(n[i],n[i++]));}else{for(var i=0;i<detected.length;i++){if(n==detected[i]){return;}}
detected.push(n);attach.call(n,n);}}}}},_public={create:function(x,y){do{var a=parseInt(Math.random()*100000)+''}while(listeners[a]);listeners[a]=listener(x,y);}}
setInterval(function(){for(key in listeners){listeners[key]();}},500);return _public;})();Bootstrapper.getElementsByClassName=function(){var root=document,className='',partial=false;for(var i=0;i<arguments.length;i++){if(typeof arguments[i]=='object'){root=arguments[i];}else if(typeof arguments[i]=='string'){className=arguments[i];}else{partial=arguments[i];}}
var elements=root.getElementsByTagName('*');var retElements=[],needle=partial?new RegExp(className):new RegExp('^'+className+'$');for(var i=0;i<elements.length;i++){var tempClass=(elements[i].className||'').split(' ');for(var j=0;j<tempClass.length;j++){if(tempClass[j].match(needle)){retElements.push(elements[i]);}}}
return retElements;}},151770,136502);Bootstrapper.bindDependencyImmediate(function(){if(window.location.hostname==='www.nature.com'){if(window.location.pathname.match(/^\/natureconferences\/(sidds|b2b20|spad20)13\/(index|program|speakers|organizers|ext_adv_council|sponsors|about|location|registration|abstract|contact)\.html$/)||window.location.pathname.match(/^\/content\/nature\/impact_HOLIDAY(1|2)\/index\.html$/)||window.location.pathname.match(/^\/ecommerce\/subscribe\.action$/)){Bootstrapper.MVT.push({x:'/HTML/BODY',t:'wt',base:'//www.nature.com/super/scripts/webtrends/wt_capi.js'});}}},191529,[191299],155616,[155833]);Bootstrapper.bindImmediate(function(){Bootstrapper.dataManager=(function(){var _private={data:{},add:function(o){if(typeof o=='object'&&o.id){this.data[o.id]=o;}},getObj:function(i){if(i){return _private.data[i];}
return _private.data;},getDataLayer:function(i){var retObj={};var dataObj=this.data[i].data;for(key in dataObj){try{if(typeof dataObj[key].get=='string'){var d=eval(dataObj[key].get);if(typeof dataObj[key].mod=='string'&&dataObj[key].mod!==''){var m="(function(){ return "+(dataObj[key].mod===''?"this":dataObj[key].mod)+";})";retObj[key]=eval(m).call(d);}else if(typeof dataObj[key].mod=='function'){retObj[key]=dataObj[key].mod.call(d,d);}else{retObj[key]=d;}}else if(typeof dataObj[key].get=='function'){var d=dataObj[key].get();if(typeof dataObj[key].mod=='string'&&dataObj[key].mod!==''){var m="(function(){ return "+(dataObj[key].mod===''?"this":dataObj[key].mod)+";})";retObj[key]=eval(m).call(d);}else if(typeof dataObj[key].mod=='function'){retObj[key]=dataObj[key].mod.call(d,d);}else{retObj[key]=d;}}}catch(e){retObj[key]=null;}}
return retObj;},getAllData:function(){var data=this.data,retObj={_d:{}};for(var key in data){retObj._d[key]={};var d=this.getDataLayer(key);for(var k in d){retObj[k]=d[k];retObj._d[key][k]=d[k];}}
return retObj;},getData:function(i){if(i){return this.getDataLayer(i);}else{return this.getAllData();}},addDataElement:function(layerId,name,o){if(typeof this.data[layerId]=='object'&&typeof name=='string'&&typeof o=='object'){var d=this.data[layerId];d.data[name]=o;}}},_public={push:function(dl){_private.add(dl);},getObj:function(i){return _private.getObj(i);},getData:function(i){return _private.getData(i);},addDataElement:function(layerId,name,o){return _private.addDataElement(layerId,name,o);}};return _public;})();},191343,155832);Bootstrapper.bindImmediate(function(){Bootstrapper.getElementXPath=function(e){var n=e;var p='';while(n!=document.getElementsByTagName('html')[0]){var t='/'+n.tagName;if(n.id!=''){t+='#'+n.id;p=t+p}else{var c=1;_n=n.previousSibling;while(_n!=null){if(n.tagName==_n.tagName){c++}_n=_n.previousSibling}p=t+(c!=1?'['+c+']':'')+p}n=n.parentNode}return Bootstrapper.getMinXPath('/HTML'+p)};Bootstrapper.getMinXPath=function(path){var p=path.split('/'),lastId=0;for(var i=0;i<p.length;i++){if(~p[i].indexOf('#')){lastId=i}}for(var i=lastId;i>0;i--){if(!~p[i].indexOf('#')&&!p[i].match(/^(html|body)/i)){p.splice(i,1)}}return p.join('/')};Bootstrapper.getElementByXPathStep=function(d,a){var c=~a.indexOf("#")?a.split("#")[1]:"",e=c?0:~a.indexOf("[")?parseInt(a.match(/\[(\d+)\]/)[1]):0,f=(c?a.split("#")[0]:e?a.split("[")[0]:a).toLowerCase();if(d==document&&f=="html"&&e==0){return document.getElementsByTagName("html")[0]}if(~a.indexOf("#")){return document.getElementById(a.split("#")[1])}var b=d.firstChild;if(!b){return null}for(var g=0,e=e!=0?e-1:e;b;){if(b.nodeType==1){if(b.tagName.toLowerCase()==f&&c!=""&&b.id==c){return b}else if(b.tagName.toLowerCase()==f&&g==e&&c==""){return b}else{b.tagName.toLowerCase()==f&&g++}}b=b.nextSibling}};Bootstrapper.getElementByXPath=function(d,n){for(var d=d.split("/"),a=Bootstrapper.getElementByXPathStep(n||document,d[1]),c=2;c<d.length;c++){if(a==null){return null}a=Bootstrapper.getElementByXPathStep(a,d[c])}return a};Bootstrapper.MVT=function(){var g={},h={split:function(b,a){var c=[];do{var d=b.shift(),e=[],f=[d];(e=d.x.split("/")).shift();for(d=b.length-1;-1<d;d--){var g=b[d].x.split("/");g.shift();g[0]==e[0]&&(f.push(b[d]),b.splice(d,1))}c.push(f)}while(0<b.length);for(d=0;d<c.length;d++)e=this.getCommon(c[d]),i.traverse(a,e,c[d])},getCommon:function(b){for(var a=[],c=0;c<b.length;a.push(b[c++].x));if(1==a.length)return a[0];for(c=0;c<a.length;(a[c]=a[c++].split("/")).shift());b=a[0];for(c=1;c<a.length;c++){for(var d=0;d<a[c].length;d++)if(a[0][d]!=a[c][d]){var e=d;break}if(e)break}return"/"+b.slice(0,e).join("/")},tests:[]},i={hidden:[],getTimeout:function(){return 5},addModule:function(b,a){g[b]=a},swap:function(b,a){g[a.t].swap(b,a)},start:function(b){for(var a=0;a<b.length;a++)g[b[a].t].init(b[a]);a=h.getCommon(b);"/"==a&&h.split(b,document);this.traverse(document,a,b)},init:function(){if(h.tests.length){this.start(h.tests)}},push:function(o){if(typeof o=='object'){h.tests.push(o);Bootstrapper.MVT.hidden.push(o)}},injectCSS:function(x){var s,d=document;if('\v'=='v'){s=d.createStyleSheet();s.cssText=x}else{s=d.createElement('style');s.type="text/css";s.innerHTML=x;d.getElementsByTagName('head')[0].appendChild(s)}return s},traverse:function(b,a,c){if(1==c.length&&c[0].x==a)var d=!0;for(var e=0;e<c.length;c[e].x=c[e++].x.slice(a.length));(a=a.split("/")).shift();for(e=0;e<a.length;e++){var f=Bootstrapper.getElementByXPathStep(b,a[e]);if(null!=f){Bootstrapper.swapNodes=Bootstrapper.swapNodes||[];Bootstrapper.swapNodes.push(f);try{f.oldStyle=f.style.display,f.style.display="none",b.style.display=b.oldStyle}catch(g){}b=f}else{a="/"+a.slice(e).join("/");for(e=0;e<c.length;c[e].x=a+c[e++].x);Bootstrapper.hasDOMParsed()||setTimeout(function(a,b,c){return function(){Bootstrapper.MVT.traverse(a,b,c)}}(b,a,c),25);return}}d?this.swap(b,c[0]):h.split(c,b)}};return i}();Bootstrapper._getServerComponent=Bootstrapper.getServerComponent;Bootstrapper.getServerComponent=function(){Bootstrapper.MVT.init();Bootstrapper._getServerComponent.apply(Bootstrapper,arguments)};Bootstrapper.MVT.addModule("xp",{init:function(a){},swap:function(a,b){var d=0;if(b.p=='replace'){if(!a.tagName.toUpperCase().match(/IMG|INPUT|TEXTAREA/)){a.innerHTML=b.c;d=a}}else{d=document.createElement('div');d.className='ensContent';d.innerHTML=b.c;if(b.p=='prepend'){if(a.firstChild!==null){a.insertBefore(d,a.firstChild)}else{d=0}}else if(b.p=='append'){a.appendChild(d,a)}else if(b.p=='element'){if(a.parentNode!==null){a.parentNode.replaceChild(d,a)}else{d=0}}else if(b.p=='before'){if(a.parentNode===null){a.parentNode.insertBefore(d,a)}else{d=0}}else if(b.p=='after'){if(a.parentNode==null){if(a.nextSibling!==null){a.parentNode.appendChild(d)}else{a.parentNode.insertBefore(d,a.nextSibling)}}else{d=0}}}try{if(d){for(var s=d.getElementsByTagName("script"),l=s.length,i=0;i<l;i++){if(s[i].src){var l=document.createElement('script');l.src=s[i].src;l.type=s[i].type;s[i].parentNode.replaceChild(d,s[i])}else{Function("try{"+s[i].text+"}catch(e){}")()}}}}catch(e){}a.style.display=a.oldStyle}});Bootstrapper.MVT._traverse=Bootstrapper.MVT.traverse;Bootstrapper.MVT.traverse=function(b,a,c){if(document.body&&typeof(WTOptimize)!='undefined'&&c.length>1){for(i=0;i<c.length;i++){if(c[i].t=='wt'){Bootstrapper.MVT.swap(b,c[i]);c.splice(i,1)}}}Bootstrapper.MVT._traverse(b,a,c)};Bootstrapper.MVT.addModule("wt",{init:function(a){if(typeof(Bootstrapper.MVT.capi)=='undefined'){document.write('<scr'+'ipt type="text/javascript" src="'+a.base+'"></sc'+'ript>');Bootstrapper.MVT.capi=1}},swap:function(a,b){if(typeof(WTOptimize)=='undefined'){setTimeout(function(){Bootstrapper.MVT.swap(a,b)},10)}else{b.o=b.o||{};b.p=b.p||{};var dbg=(~window.location.href.indexOf('ensightenDebug'))?true:false,isE=function(o){for(i in o){return false}return true},ta=(typeof(b.a)!='undefined'&&b.a!='')?'"'+b.a+'",':'',pobj='',n=navigator.userAgent||navigator.vendor||window.opera,p=(!!n.match(/MSIE 6|MSIE 7|MSIE 8/i))?2000:0;Bootstrapper.MVT.wtime=Bootstrapper.MVT.wtime||4000+p;if(dbg){console.log('swap: '+(b.a||'testAlias undefined'))}if(typeof(Bootstrapper.MVT.wtdone)=='undefined'){Bootstrapper.MVT.isMobile=(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))){return true}else{return false}})(n);if(dbg){Bootstrapper.time=new Date().getTime();console.log("* WTO initiated : "+Bootstrapper.time)}var addHandler=function(e){WTOptimize.addEventHandler(WTEvent[e],function(event){document.body.style.display="block";if(dbg){var time=new Date().getTime();console.log("* WTO "+e+" : "+time+" | elapsed:"+(parseInt(time)-parseInt(Bootstrapper.time)));Bootstrapper.time=time}})},onE=['DONE','INVALID','ABORT'];for(i=0;i<onE.length;i++){addHandler(onE[i])}Bootstrapper.MVT.wtime=(Bootstrapper.MVT.isMobile)?20000:((typeof(b.o['s_pageTimeout'])!='undefined')?b.o['s_pageTimeout']:Bootstrapper.MVT.wtime);setTimeout(function(){document.body.style.display="block"},Bootstrapper.MVT.wtime);Bootstrapper.MVT.wtdone=1}if(!isE(b.p)){b.o['data']=b.p}b.o['s_pageTimeout']=Bootstrapper.MVT.wtime;b.o['s_pageDisplayMode']='none';b.o['s_pageMode']='head';if(dbg){for(i in b.o){if(typeof(b.o[i])=='object'){pobj+=','+i+':{';for(j in b.o[i]){pobj+=',"'+j+'":"'+b.o[i][j]+'"'};pobj+='}'}else{pobj+=','+i+':"'+b.o[i]+'"'}};pobj=pobj.replace(/\{\,/g,'{');console.log(('* WTOptimize.setup('+ta+'{'+((pobj!='')?pobj:'')+'});').replace(/\{\,/g,'{')+' # '+new Date().getTime())}eval('WTOptimize.setup('+ta+'b.o)')}}});Bootstrapper.MVT.WTOconversion=function(b){b.o=b.o||{};b.p=b.p||{};var dbg=(~window.location.href.indexOf('ensightenDebug'))?true:false,isE=function(o){for(i in o){return false}return true},ta=(typeof(b.a)!='undefined'&&b.a!='')?'"'+b.a+'",':'',pobj='';if(typeof(Bootstrapper.MVT.capi)=='undefined'){var s=document.createElement('script');s.type='text/javascript';s.src=b.base;document.getElementsByTagName('head')[0].appendChild(s);Bootstrapper.MVT.capi=1}if(typeof(WTOptimize)=='undefined'){setTimeout(function(){Bootstrapper.MVT.WTOconversion(b)},10)}else{if(!isE(b.p)){b.o['data']=b.p}b.o['conversionPoint']='header';b.o['beacon']=true;b.o['cookieInspection']=false;WTOptimize.addEventHandler(WTEvent['PAGEVIEW'],function(event){Bootstrapper.MVT.wtPageView=1;if(dbg){for(i in b.o){if(typeof(b.o[i])=='object'){pobj+=','+i+':{';for(j in b.o[i]){pobj+=',"'+j+'":"'+b.o[i][j]+'"'};pobj+='}'}else{pobj+=','+i+':"'+b.o[i]+'"'}};pobj=pobj.replace(/\{\,/g,'{');console.log(('* WTOptimize.conversion('+ta+'{'+((pobj!='')?pobj:'')+'});').replace(/\{\,/g,'{')+' # '+new Date().getTime())}eval('WTOptimize.conversion('+ta+'b.o)')});if(typeof(Bootstrapper.MVT.wtConversion)=='undefined'){Bootstrapper.bindDOMLoaded(function(){setTimeout(function(){if(typeof(Bootstrapper.MVT.wtPageView)=='undefined'){var c=(function(){for(i in WTOptimize){if(typeof(WTOptimize[i]['s_eventHandlers'])!='undefined'){return i}}return''})();try{var px=WTOptimize[c].s_eventHandlers.pageview.success;for(i=0,l=px.length;i<l;i++){px[i].call(window)}}catch(e){if(dbg){console.log('* WTOptimize Conversion Error *')}}}},250)});Bootstrapper.MVT.wtConversion=1}}};Bootstrapper.VTconfig=Bootstrapper.VTconfig||{};Bootstrapper.VTconfig['MVT']=this.deploymentId;},191299,155833);Bootstrapper.globalRuleList='151770;191529;191343;191299';Bootstrapper.globalDeploymentList='136502;155616;155832;155833';
	Bootstrapper.getServerComponent(Bootstrapper.getExtraParams ? Bootstrapper.getExtraParams() : undefined);
}