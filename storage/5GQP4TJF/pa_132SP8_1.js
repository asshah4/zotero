
var SDPA={init:function(){$(window).load(SDPA.sendPage());$(window).load(SDPA.sendResources(3000));$(window).unload(SDPA.sendResources(0));},sendPage:function(){var e=window.performance;var t="";t+="cpc=SD";t+="&key="+encodeURIComponent(SDM.pageTransKey);t+="&pagetype="+SDM.pageType;t+="&sds="+SDM.sds;t+="&tid="+SDM.tid;if(SDM.tm.ahm!==undefined){t+="&ahm="+SDM.tm.ahm}
if(SDM.tm.chm!==undefined){t+="&chm="+SDM.tm.chm}
if(document.location.href){t+="&href="+encodeURIComponent(document.location.href)}
if(document.documentElement.clientWidth&&document.documentElement.clientHeight){t+="&winHeight="+document.documentElement.clientHeight;t+="&winWidth="+document.documentElement.clientWidth}
t+="&domCount="+document.getElementsByTagName("*").length;if(window.optimizely!=undefined){var n=window.optimizely.data.state.activeExperiments;var r=n.length;var i="&oexp=";for(var s=0;s<r;s++){if(s+1<r){i+=n[s]+"|"}else{i+=n[s]}}
t+=i}
t+="&ud="+SDM.ud;if(window.performance!=undefined){if(e.timing){var o=e.timing;if(o.loadEventEnd>0){for(var u in o){t+="&"+u+"="+o[u]}
if(typeof chrome!="undefined"&&chrome.loadTimes()){t+="&msFirstPaint="+SDPA.toInt(chrome.loadTimes().firstPaintTime*1e3)}
var a=SDM.pru+"/pageReport?"+t;$("#sdpa").append('<img style="display:none" src="'+a+'">')}else{setTimeout(SDPA.sendPage,100)}}}else{var a=SDM.pru+"/pageReport?"+t;$("#sdpa").append('<img style="display:none" src="'+a+'">')}},toInt:function(e){return Math.round(Number(e)).toString()},ec:[0],sendResources:function(tmOut){var ec=SDPA.ec;if(window.performance!=undefined){var e=window.performance;if(e.timing){var t=e.timing}
if(typeof e.getEntries!="undefined"){var n=e.getEntries().length;SDPA.ec.push(n);ecl=SDPA.ec.length-1;if(SDPA.ec[ecl]!=SDPA.ec[ecl-1]&&(t.loadEventEnd+tmOut<Date.now()||t.loadEventEnd==0)){setTimeout(SDPA.sendResources,500)}else{var ifr=$('iframe');var ifc=0;var r=t.navigationStart;var i=t.responseStart-r;var s=t.domInteractive-r;var o=t.loadEventEnd-r;var u=window.performance.getEntries();var a=[];a.push({ent:n,sds:SDM.sds,tid:SDM.tid,ns:r,ttfb:i,pgi:s,pgl:o});for(var f=0;f<n;f++){var urlName=u[f].name.match(/^https?\:\/\/([^\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/i)
if(urlName==null){console.log("pa.js : urlName is null. skipping...");continue;}
var sh=urlName[2].split('/')
if(sh.length>3){var pth=sh[1]+'/'+sh[2];}else if(sh.length>2){var pth=sh[1];}else{var pth='';}
a.push({i:f,tm:SDPA.toInt(u[f].startTime)+"|"+SDPA.toInt(u[f].responseStart)+"|"+SDPA.toInt(u[f].duration),t:u[f].initiatorType,h:urlName[1],p:pth});if(u[f].initiatorType==='iframe'){var ifn=ifr[ifc].src.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);if(ifn[1]=="www.sciencedirect.com"){ifo=ifr[ifc].contentWindow.window.performance.getEntries();for(ic=0;ic<ifo.length;ic++){a.push({i:f,ifr:ic,tm:SDPA.toInt(ifo[ic].startTime)+"|"+SDPA.toInt(ifo[ic].responseStart)+"|"+SDPA.toInt(ifo[ic].duration),t:ifo[ic].initiatorType,h:ifo[ic].name.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1]});}
ifc++;}else{ifc++;}}}
var l=encodeURI(JSON.stringify(a));var c=SDM.pru+"/resource?"+l;$("#sdpa").append('<img style="display:none" src="'+c+'">')}}}}}