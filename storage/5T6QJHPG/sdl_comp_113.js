Array.prototype.contains=function(a){for(var c in this)if(this[c]===a)return!0;return!1};
Loader={debug:new Boolean(!1),debugOn:function(){this.debug=!0},turnStatsOn:new Boolean(!1),statsOn:function(){this.turnStatsOn=!0},code:new String,qCode:function(a){Loader.code+=a},features:[],feature:function(a){Loader.features[a]||(Loader.features[a]={completed:new Boolean(!1),retryCount:0,code:new String,libs:[],callback:function(){},onload:function(a){this.callback=a},require:function(a){a instanceof Array?this.libs=this.libs.concat(a):this.libs.push(a)},load:function(){Loader.loadScripts(this.libs,
this.exec)},exec:function(){for(var c=!1,b=Loader.feature(a).libs,e=0;e<b.length;e++)if(!Loader.loadedLibs.contains(b[e])){c=!0;break}if(c)Loader.feature(a).retryCount<5&&(Loader.feature(a).retryCount++,setTimeout(function(){Loader.feature(a).exec()},100));else if(Loader.feature(a).completed==!1)Loader.feature(a).completed=!0,window.eval(Loader.feature(a).code),Loader.feature(a).callback()},qCode:function(a){this.code+=a}});return Loader.features[a]},timeStamps:[],recordTime:function(a,c){this.timeStamps.push({label:a,
stamp:c?c:(new Date).getTime(),toString:function(){return'{"lbl":"'+this.label+'","ts":"'+this.stamp+'"}'}})},rt:function(a,c){this.recordTime(a,c)},sendStats:function(){if(Loader.turnStatsOn!=!1){var a=Loader.getXHRObject();a.open("POST",SD_URL_PREFIX+"/pageReport",!0);a.setRequestHeader("Content-Type","application/x-www-form-urlencoded");for(var c="",b=0;b<this.timeStamps.length;b++)c+="data="+this.timeStamps[b].toString()+"&";c+="key="+SD_PAGE_TRANS_KEY+"&";c+="pagetype="+SD_PAGE_TYPE;a.send(c)}},
loadedLibs:[],loadingLibs:[],loadScripts:function(a,c){for(var b=a.length,e=[],d=0;d<b;d++)!Loader.loadedLibs.contains(a[d])&&!Loader.loadingLibs.contains(a[d])&&(e.contains(a[d])||e.push(a[d]));for(var b=e.length,f=!1,d=0;d<b;d++)if(Loader.differentDomain(e[d])){f=!0;break}var g=Loader.loadScriptXhrInjection;f&&(g=-1!=navigator.userAgent.indexOf("Firefox")||-1!=navigator.userAgent.indexOf("Opera")?Loader.loadScriptDomElement:Loader.loadScriptDocWrite);if(Loader.debug==!0)g=Loader.loadScriptDomElement;
for(d=0;d<b;d++)Loader.loadingLibs.push(e[d]),g(e[d],c,!0);b===0&&c()},differentDomain:function(a){if(0===a.indexOf("http://")||0===a.indexOf("https://"))return 0!==a.indexOf(document.location.protocol+"://"+document.location.host+"/");return!1},loadScriptDomElement:function(a,c){var b=document.createElement("script");if(b.async===!0)b.async=!1;b.src=a;if(c)b.onloadDone=!1,b.onload=function(){if(!b.onloadDone)b.onloadDone=!0,Loader.loadedLibs.push(a),c()},b.onreadystatechange=function(){if(("loaded"===
b.readyState||"complete"===b.readyState)&&!b.onloadDone)b.onloadDone=!0,Loader.loadedLibs.push(a),c()};document.getElementsByTagName("head")[0].appendChild(b)},loadScriptDocWrite:function(a,c){document.write('<script src="'+a+'" type="text/javascript"><\/script>');Loader.addHandler(window,"load",function(){Loader.loadedLibs.push(a);c()})},queuedScripts:[],loadScriptXhrInjection:function(a,c,b){var e=Loader.queuedScripts.length;b&&(Loader.queuedScripts[e]={response:null,onload:c,done:!1,url:a});var d=
Loader.getXHRObject();d.onreadystatechange=function(){if(d.readyState==4)if(b)Loader.queuedScripts[e].response=d.responseText,Loader.injectScripts();else{var f=document.createElement("script");document.getElementsByTagName("head")[0].appendChild(f);f.text=d.responseText;Loader.loadedLibs.push(a);c&&c()}};d.open("GET",a,!0);d.send("")},injectScripts:function(){for(var a=Loader.queuedScripts.length,c=0;c<a;c++){var b=Loader.queuedScripts[c];if(!b.done)if(b.response){var e=document.createElement("script");
document.getElementsByTagName("head")[0].appendChild(e);e.text=b.response;Loader.loadedLibs.push(b.url);if(b.onload)b.onload();b.done=!0}else break}},executeCode:function(){window.eval(Loader.code)},addHandler:function(a,c,b){a.addEventListener?a.addEventListener(c,b,!1):a.attachEvent&&a.attachEvent("on"+c,b)},getXHRObject:function(){var a=!1;try{a=new XMLHttpRequest}catch(c){for(var b=["Msxml2.XMLHTTP.6.0","Msxml2.XMLHTTP.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"],e=b.length,d=0;d<e;d++){try{a=new ActiveXObject(b[d])}catch(f){continue}break}}finally{return a}},
clear:function(){Loader.queuedScripts=[];Loader.loadedLibs=[];Loader.loadingLibs=[];Loader.timeStamps=[];Loader.code=new String;Loader.features=[]}};
