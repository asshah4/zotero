/*! jQuery v1.9.1 | (c) 2005, 2012 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery.min.map
*/(function(e,t){var n,r,i=typeof t,o=e.document,a=e.location,s=e.jQuery,u=e.$,l={},c=[],p="1.9.1",f=c.concat,d=c.push,h=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,b=function(e,t){return new b.fn.init(e,t,r)},x=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^[\],:{}\s]*$/,E=/(?:^|:|,)(?:\s*\[)+/g,S=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,A=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,j=/^-ms-/,D=/-([\da-z])/gi,L=function(e,t){return t.toUpperCase()},H=function(e){(o.addEventListener||"load"===e.type||"complete"===o.readyState)&&(q(),b.ready())},q=function(){o.addEventListener?(o.removeEventListener("DOMContentLoaded",H,!1),e.removeEventListener("load",H,!1)):(o.detachEvent("onreadystatechange",H),e.detachEvent("onload",H))};b.fn=b.prototype={jquery:p,constructor:b,init:function(e,n,r){var i,a;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof b?n[0]:n,b.merge(this,b.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:o,!0)),C.test(i[1])&&b.isPlainObject(n))for(i in n)b.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(a=o.getElementById(i[2]),a&&a.parentNode){if(a.id!==i[2])return r.find(e);this.length=1,this[0]=a}return this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):b.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),b.makeArray(e,this))},selector:"",length:0,size:function(){return this.length},toArray:function(){return h.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=b.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return b.each(this,e,t)},ready:function(e){return b.ready.promise().done(e),this},slice:function(){return this.pushStack(h.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(b.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:d,sort:[].sort,splice:[].splice},b.fn.init.prototype=b.fn,b.extend=b.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},u=1,l=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},u=2),"object"==typeof s||b.isFunction(s)||(s={}),l===u&&(s=this,--u);l>u;u++)if(null!=(o=arguments[u]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(b.isPlainObject(r)||(n=b.isArray(r)))?(n?(n=!1,a=e&&b.isArray(e)?e:[]):a=e&&b.isPlainObject(e)?e:{},s[i]=b.extend(c,a,r)):r!==t&&(s[i]=r));return s},b.extend({noConflict:function(t){return e.$===b&&(e.$=u),t&&e.jQuery===b&&(e.jQuery=s),b},isReady:!1,readyWait:1,holdReady:function(e){e?b.readyWait++:b.ready(!0)},ready:function(e){if(e===!0?!--b.readyWait:!b.isReady){if(!o.body)return setTimeout(b.ready);b.isReady=!0,e!==!0&&--b.readyWait>0||(n.resolveWith(o,[b]),b.fn.trigger&&b(o).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===b.type(e)},isArray:Array.isArray||function(e){return"array"===b.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if(!e||"object"!==b.type(e)||e.nodeType||b.isWindow(e))return!1;try{if(e.constructor&&!y.call(e,"constructor")&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(n){return!1}var r;for(r in e);return r===t||y.call(e,r)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=b.buildFragment([e],t,i),i&&b(i).remove(),b.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=b.trim(n),n&&k.test(n.replace(S,"@").replace(A,"]").replace(E,"")))?Function("return "+n)():(b.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||b.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&b.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(j,"ms-").replace(D,L)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:v&&!v.call("\ufeff\u00a0")?function(e){return null==e?"":v.call(e)}:function(e){return null==e?"":(e+"").replace(T,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?b.merge(n,"string"==typeof e?[e]:e):d.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(g)return g.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return f.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),b.isFunction(e)?(r=h.call(arguments,2),i=function(){return e.apply(n||this,r.concat(h.call(arguments)))},i.guid=e.guid=e.guid||b.guid++,i):t},access:function(e,n,r,i,o,a,s){var u=0,l=e.length,c=null==r;if("object"===b.type(r)){o=!0;for(u in r)b.access(e,n,u,r[u],!0,a,s)}else if(i!==t&&(o=!0,b.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(b(e),n)})),n))for(;l>u;u++)n(e[u],r,s?i:i.call(e[u],u,n(e[u],r)));return o?e:c?n.call(e):l?n(e[0],r):a},now:function(){return(new Date).getTime()}}),b.ready.promise=function(t){if(!n)if(n=b.Deferred(),"complete"===o.readyState)setTimeout(b.ready);else if(o.addEventListener)o.addEventListener("DOMContentLoaded",H,!1),e.addEventListener("load",H,!1);else{o.attachEvent("onreadystatechange",H),e.attachEvent("onload",H);var r=!1;try{r=null==e.frameElement&&o.documentElement}catch(i){}r&&r.doScroll&&function a(){if(!b.isReady){try{r.doScroll("left")}catch(e){return setTimeout(a,50)}q(),b.ready()}}()}return n.promise(t)},b.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=b.type(e);return b.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=b(o);var _={};function F(e){var t=_[e]={};return b.each(e.match(w)||[],function(e,n){t[n]=!0}),t}b.Callbacks=function(e){e="string"==typeof e?_[e]||F(e):b.extend({},e);var n,r,i,o,a,s,u=[],l=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=u.length,n=!0;u&&o>a;a++)if(u[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,u&&(l?l.length&&c(l.shift()):r?u=[]:p.disable())},p={add:function(){if(u){var t=u.length;(function i(t){b.each(t,function(t,n){var r=b.type(n);"function"===r?e.unique&&p.has(n)||u.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=u.length:r&&(s=t,c(r))}return this},remove:function(){return u&&b.each(arguments,function(e,t){var r;while((r=b.inArray(t,u,r))>-1)u.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?b.inArray(e,u)>-1:!(!u||!u.length)},empty:function(){return u=[],this},disable:function(){return u=l=r=t,this},disabled:function(){return!u},lock:function(){return l=t,r||p.disable(),this},locked:function(){return!l},fireWith:function(e,t){return t=t||[],t=[e,t.slice?t.slice():t],!u||i&&!l||(n?l.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},b.extend({Deferred:function(e){var t=[["resolve","done",b.Callbacks("once memory"),"resolved"],["reject","fail",b.Callbacks("once memory"),"rejected"],["notify","progress",b.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return b.Deferred(function(n){b.each(t,function(t,o){var a=o[0],s=b.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&b.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?b.extend(e,r):r}},i={};return r.pipe=r.then,b.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=h.call(arguments),r=n.length,i=1!==r||e&&b.isFunction(e.promise)?r:0,o=1===i?e:b.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?h.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,u,l;if(r>1)for(s=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&b.isFunction(n[t].promise)?n[t].promise().done(a(t,l,n)).fail(o.reject).progress(a(t,u,s)):--i;return i||o.resolveWith(l,n),o.promise()}}),b.support=function(){var t,n,r,a,s,u,l,c,p,f,d=o.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*"),r=d.getElementsByTagName("a")[0],!n||!r||!n.length)return{};s=o.createElement("select"),l=s.appendChild(o.createElement("option")),a=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t={getSetAttribute:"t"!==d.className,leadingWhitespace:3===d.firstChild.nodeType,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/top/.test(r.getAttribute("style")),hrefNormalized:"/a"===r.getAttribute("href"),opacity:/^0.5/.test(r.style.opacity),cssFloat:!!r.style.cssFloat,checkOn:!!a.value,optSelected:l.selected,enctype:!!o.createElement("form").enctype,html5Clone:"<:nav></:nav>"!==o.createElement("nav").cloneNode(!0).outerHTML,boxModel:"CSS1Compat"===o.compatMode,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,boxSizingReliable:!0,pixelPosition:!1},a.checked=!0,t.noCloneChecked=a.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!l.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}a=o.createElement("input"),a.setAttribute("value",""),t.input=""===a.getAttribute("value"),a.value="t",a.setAttribute("type","radio"),t.radioValue="t"===a.value,a.setAttribute("checked","t"),a.setAttribute("name","t"),u=o.createDocumentFragment(),u.appendChild(a),t.appendChecked=a.checked,t.checkClone=u.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;return d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip,b(function(){var n,r,a,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",u=o.getElementsByTagName("body")[0];u&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",u.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",a=d.getElementsByTagName("td"),a[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===a[0].offsetHeight,a[0].style.display="",a[1].style.display="none",t.reliableHiddenOffsets=p&&0===a[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",t.boxSizing=4===d.offsetWidth,t.doesNotIncludeMarginInBodyOffset=1!==u.offsetTop,e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(o.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(u.style.zoom=1)),u.removeChild(n),n=d=a=r=null)}),n=s=u=l=r=a=null,t}();var O=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,B=/([A-Z])/g;function P(e,n,r,i){if(b.acceptData(e)){var o,a,s=b.expando,u="string"==typeof n,l=e.nodeType,p=l?b.cache:e,f=l?e[s]:e[s]&&s;if(f&&p[f]&&(i||p[f].data)||!u||r!==t)return f||(l?e[s]=f=c.pop()||b.guid++:f=s),p[f]||(p[f]={},l||(p[f].toJSON=b.noop)),("object"==typeof n||"function"==typeof n)&&(i?p[f]=b.extend(p[f],n):p[f].data=b.extend(p[f].data,n)),o=p[f],i||(o.data||(o.data={}),o=o.data),r!==t&&(o[b.camelCase(n)]=r),u?(a=o[n],null==a&&(a=o[b.camelCase(n)])):a=o,a}}function R(e,t,n){if(b.acceptData(e)){var r,i,o,a=e.nodeType,s=a?b.cache:e,u=a?e[b.expando]:b.expando;if(s[u]){if(t&&(o=n?s[u]:s[u].data)){b.isArray(t)?t=t.concat(b.map(t,b.camelCase)):t in o?t=[t]:(t=b.camelCase(t),t=t in o?[t]:t.split(" "));for(r=0,i=t.length;i>r;r++)delete o[t[r]];if(!(n?$:b.isEmptyObject)(o))return}(n||(delete s[u].data,$(s[u])))&&(a?b.cleanData([e],!0):b.support.deleteExpando||s!=s.window?delete s[u]:s[u]=null)}}}b.extend({cache:{},expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(e){return e=e.nodeType?b.cache[e[b.expando]]:e[b.expando],!!e&&!$(e)},data:function(e,t,n){return P(e,t,n)},removeData:function(e,t){return R(e,t)},_data:function(e,t,n){return P(e,t,n,!0)},_removeData:function(e,t){return R(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&b.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),b.fn.extend({data:function(e,n){var r,i,o=this[0],a=0,s=null;if(e===t){if(this.length&&(s=b.data(o),1===o.nodeType&&!b._data(o,"parsedAttrs"))){for(r=o.attributes;r.length>a;a++)i=r[a].name,i.indexOf("data-")||(i=b.camelCase(i.slice(5)),W(o,i,s[i]));b._data(o,"parsedAttrs",!0)}return s}return"object"==typeof e?this.each(function(){b.data(this,e)}):b.access(this,function(n){return n===t?o?W(o,e,b.data(o,e)):null:(this.each(function(){b.data(this,e,n)}),t)},null,n,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){b.removeData(this,e)})}});function W(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(B,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:O.test(r)?b.parseJSON(r):r}catch(o){}b.data(e,n,r)}else r=t}return r}function $(e){var t;for(t in e)if(("data"!==t||!b.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}b.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=b._data(e,n),r&&(!i||b.isArray(r)?i=b._data(e,n,b.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=b.queue(e,t),r=n.length,i=n.shift(),o=b._queueHooks(e,t),a=function(){b.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),o.cur=i,i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return b._data(e,n)||b._data(e,n,{empty:b.Callbacks("once memory").add(function(){b._removeData(e,t+"queue"),b._removeData(e,n)})})}}),b.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?b.queue(this[0],e):n===t?this:this.each(function(){var t=b.queue(this,e,n);b._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&b.dequeue(this,e)})},dequeue:function(e){return this.each(function(){b.dequeue(this,e)})},delay:function(e,t){return e=b.fx?b.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=b.Deferred(),a=this,s=this.length,u=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=b._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(u));return u(),o.promise(n)}});var I,z,X=/[\t\r\n]/g,U=/\r/g,V=/^(?:input|select|textarea|button|object)$/i,Y=/^(?:a|area)$/i,J=/^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,G=/^(?:checked|selected)$/i,Q=b.support.getSetAttribute,K=b.support.input;b.fn.extend({attr:function(e,t){return b.access(this,b.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){b.removeAttr(this,e)})},prop:function(e,t){return b.access(this,b.prop,e,t,arguments.length>1)},removeProp:function(e){return e=b.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,u="string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=b.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,u=0===arguments.length||"string"==typeof e&&e;if(b.isFunction(e))return this.each(function(t){b(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(X," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?b.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e,r="boolean"==typeof t;return b.isFunction(e)?this.each(function(n){b(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var o,a=0,s=b(this),u=t,l=e.match(w)||[];while(o=l[a++])u=r?u:!s.hasClass(o),s[u?"addClass":"removeClass"](o)}else(n===i||"boolean"===n)&&(this.className&&b._data(this,"__className__",this.className),this.className=this.className||e===!1?"":b._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(X," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=b.isFunction(e),this.each(function(n){var o,a=b(this);1===this.nodeType&&(o=i?e.call(this,n,a.val()):e,null==o?o="":"number"==typeof o?o+="":b.isArray(o)&&(o=b.map(o,function(e){return null==e?"":e+""})),r=b.valHooks[this.type]||b.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=b.valHooks[o.type]||b.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(U,""):null==n?"":n)}}}),b.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,u=0>i?s:o?i:0;for(;s>u;u++)if(n=r[u],!(!n.selected&&u!==i||(b.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&b.nodeName(n.parentNode,"optgroup"))){if(t=b(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n=b.makeArray(t);return b(e).find("option").each(function(){this.selected=b.inArray(b(this).val(),n)>=0}),n.length||(e.selectedIndex=-1),n}}},attr:function(e,n,r){var o,a,s,u=e.nodeType;if(e&&3!==u&&8!==u&&2!==u)return typeof e.getAttribute===i?b.prop(e,n,r):(a=1!==u||!b.isXMLDoc(e),a&&(n=n.toLowerCase(),o=b.attrHooks[n]||(J.test(n)?z:I)),r===t?o&&a&&"get"in o&&null!==(s=o.get(e,n))?s:(typeof e.getAttribute!==i&&(s=e.getAttribute(n)),null==s?t:s):null!==r?o&&a&&"set"in o&&(s=o.set(e,r,n))!==t?s:(e.setAttribute(n,r+""),r):(b.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=b.propFix[n]||n,J.test(n)?!Q&&G.test(n)?e[b.camelCase("default-"+n)]=e[r]=!1:e[r]=!1:b.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!b.support.radioValue&&"radio"===t&&b.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!b.isXMLDoc(e),a&&(n=b.propFix[n]||n,o=b.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var n=e.getAttributeNode("tabindex");return n&&n.specified?parseInt(n.value,10):V.test(e.nodeName)||Y.test(e.nodeName)&&e.href?0:t}}}}),z={get:function(e,n){var r=b.prop(e,n),i="boolean"==typeof r&&e.getAttribute(n),o="boolean"==typeof r?K&&Q?null!=i:G.test(n)?e[b.camelCase("default-"+n)]:!!i:e.getAttributeNode(n);return o&&o.value!==!1?n.toLowerCase():t},set:function(e,t,n){return t===!1?b.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&b.propFix[n]||n,n):e[b.camelCase("default-"+n)]=e[n]=!0,n}},K&&Q||(b.attrHooks.value={get:function(e,n){var r=e.getAttributeNode(n);return b.nodeName(e,"input")?e.defaultValue:r&&r.specified?r.value:t},set:function(e,n,r){return b.nodeName(e,"input")?(e.defaultValue=n,t):I&&I.set(e,n,r)}}),Q||(I=b.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&("id"===n||"name"===n||"coords"===n?""!==r.value:r.specified)?r.value:t},set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},b.attrHooks.contenteditable={get:I.get,set:function(e,t,n){I.set(e,""===t?!1:t,n)}},b.each(["width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}})})),b.support.hrefNormalized||(b.each(["href","src","width","height"],function(e,n){b.attrHooks[n]=b.extend(b.attrHooks[n],{get:function(e){var r=e.getAttribute(n,2);return null==r?t:r}})}),b.each(["href","src"],function(e,t){b.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}})),b.support.style||(b.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),b.support.optSelected||(b.propHooks.selected=b.extend(b.propHooks.selected,{get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}})),b.support.enctype||(b.propFix.enctype="encoding"),b.support.checkOn||b.each(["radio","checkbox"],function(){b.valHooks[this]={get:function(e){return null===e.getAttribute("value")?"on":e.value}}}),b.each(["radio","checkbox"],function(){b.valHooks[this]=b.extend(b.valHooks[this],{set:function(e,n){return b.isArray(n)?e.checked=b.inArray(b(e).val(),n)>=0:t}})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}b.event={global:{},add:function(e,n,r,o,a){var s,u,l,c,p,f,d,h,g,m,y,v=b._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=b.guid++),(u=v.events)||(u=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof b===i||e&&b.event.triggered===e.type?t:b.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(w)||[""],l=n.length;while(l--)s=rt.exec(n[l])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),p=b.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=b.event.special[g]||{},d=b.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&b.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=u[g])||(h=u[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),b.event.global[g]=!0;e=null}},remove:function(e,t,n,r,i){var o,a,s,u,l,c,p,f,d,h,g,m=b.hasData(e)&&b._data(e);if(m&&(c=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(s=rt.exec(t[l])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=b.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),u=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));u&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||b.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)b.event.remove(e,d+t[l],n,r,!0);b.isEmptyObject(c)&&(delete m.handle,b._removeData(e,"events"))}},trigger:function(n,r,i,a){var s,u,l,c,p,f,d,h=[i||o],g=y.call(n,"type")?n.type:n,m=y.call(n,"namespace")?n.namespace.split("."):[];if(l=f=i=i||o,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+b.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),u=0>g.indexOf(":")&&"on"+g,n=n[b.expando]?n:new b.Event(g,"object"==typeof n&&n),n.isTrigger=!0,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:b.makeArray(r,[n]),p=b.event.special[g]||{},a||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!a&&!p.noBubble&&!b.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(l=l.parentNode);l;l=l.parentNode)h.push(l),f=l;f===(i.ownerDocument||o)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((l=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(b._data(l,"events")||{})[n.type]&&b._data(l,"handle"),s&&s.apply(l,r),s=u&&l[u],s&&b.acceptData(l)&&s.apply&&s.apply(l,r)===!1&&n.preventDefault();if(n.type=g,!(a||n.isDefaultPrevented()||p._default&&p._default.apply(i.ownerDocument,r)!==!1||"click"===g&&b.nodeName(i,"a")||!b.acceptData(i)||!u||!i[g]||b.isWindow(i))){f=i[u],f&&(i[u]=null),b.event.triggered=g;try{i[g]()}catch(v){}b.event.triggered=t,f&&(i[u]=f)}return n.result}},dispatch:function(e){e=b.event.fix(e);var n,r,i,o,a,s=[],u=h.call(arguments),l=(b._data(this,"events")||{})[e.type]||[],c=b.event.special[e.type]||{};if(u[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=b.event.handlers.call(this,e,l),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((b.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,u),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],u=n.delegateCount,l=e.target;if(u&&l.nodeType&&(!e.button||"click"!==e.type))for(;l!=this;l=l.parentNode||this)if(1===l.nodeType&&(l.disabled!==!0||"click"!==e.type)){for(o=[],a=0;u>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?b(r,this).index(l)>=0:b.find(r,this,null,[l]).length),o[r]&&o.push(i);o.length&&s.push({elem:l,handlers:o})}return n.length>u&&s.push({elem:this,handlers:n.slice(u)}),s},fix:function(e){if(e[b.expando])return e;var t,n,r,i=e.type,a=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new b.Event(a),t=r.length;while(t--)n=r[t],e[n]=a[n];return e.target||(e.target=a.srcElement||o),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,a):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,a,s=n.button,u=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||o,a=i.documentElement,r=i.body,e.pageX=n.clientX+(a&&a.scrollLeft||r&&r.scrollLeft||0)-(a&&a.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(a&&a.scrollTop||r&&r.scrollTop||0)-(a&&a.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&u&&(e.relatedTarget=u===e.target?n.toElement:u),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},click:{trigger:function(){return b.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t}},focus:{trigger:function(){if(this!==o.activeElement&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===o.activeElement&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=b.extend(new b.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?b.event.trigger(i,null,t):b.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},b.removeEvent=o.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},b.Event=function(e,n){return this instanceof b.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&b.extend(this,n),this.timeStamp=e&&e.timeStamp||b.now(),this[b.expando]=!0,t):new b.Event(e,n)},b.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},b.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){b.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;
return(!i||i!==r&&!b.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),b.support.submitBubbles||(b.event.special.submit={setup:function(){return b.nodeName(this,"form")?!1:(b.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=b.nodeName(n,"input")||b.nodeName(n,"button")?n.form:t;r&&!b._data(r,"submitBubbles")&&(b.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),b._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&b.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return b.nodeName(this,"form")?!1:(b.event.remove(this,"._submit"),t)}}),b.support.changeBubbles||(b.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(b.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),b.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),b.event.simulate("change",this,e,!0)})),!1):(b.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!b._data(t,"changeBubbles")&&(b.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||b.event.simulate("change",this.parentNode,e,!0)}),b._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return b.event.remove(this,"._change"),!Z.test(this.nodeName)}}),b.support.focusinBubbles||b.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){b.event.simulate(t,e.target,b.event.fix(e),!0)};b.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),b.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return b().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=b.guid++)),this.each(function(){b.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,b(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){b.event.remove(this,e,r,n)})},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)},trigger:function(e,t){return this.each(function(){b.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?b.event.trigger(e,n,r,!0):t}}),function(e,t){var n,r,i,o,a,s,u,l,c,p,f,d,h,g,m,y,v,x="sizzle"+-new Date,w=e.document,T={},N=0,C=0,k=it(),E=it(),S=it(),A=typeof t,j=1<<31,D=[],L=D.pop,H=D.push,q=D.slice,M=D.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},_="[\\x20\\t\\r\\n\\f]",F="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O=F.replace("w","w#"),B="([*^$|!~]?=)",P="\\["+_+"*("+F+")"+_+"*(?:"+B+_+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+O+")|)|)"+_+"*\\]",R=":("+F+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+P.replace(3,8)+")*)|.*)\\)|)",W=RegExp("^"+_+"+|((?:^|[^\\\\])(?:\\\\.)*)"+_+"+$","g"),$=RegExp("^"+_+"*,"+_+"*"),I=RegExp("^"+_+"*([\\x20\\t\\r\\n\\f>+~])"+_+"*"),z=RegExp(R),X=RegExp("^"+O+"$"),U={ID:RegExp("^#("+F+")"),CLASS:RegExp("^\\.("+F+")"),NAME:RegExp("^\\[name=['\"]?("+F+")['\"]?\\]"),TAG:RegExp("^("+F.replace("w","w*")+")"),ATTR:RegExp("^"+P),PSEUDO:RegExp("^"+R),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+_+"*(even|odd|(([+-]|)(\\d*)n|)"+_+"*(?:([+-]|)"+_+"*(\\d+)|))"+_+"*\\)|)","i"),needsContext:RegExp("^"+_+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+_+"*((?:-\\d)?\\d*)"+_+"*\\)|)(?=[^-]|$)","i")},V=/[\x20\t\r\n\f]*[+~]/,Y=/^[^{]+\{\s*\[native code/,J=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,G=/^(?:input|select|textarea|button)$/i,Q=/^h\d$/i,K=/'|\\/g,Z=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,et=/\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,tt=function(e,t){var n="0x"+t-65536;return n!==n?t:0>n?String.fromCharCode(n+65536):String.fromCharCode(55296|n>>10,56320|1023&n)};try{q.call(w.documentElement.childNodes,0)[0].nodeType}catch(nt){q=function(e){var t,n=[];while(t=this[e++])n.push(t);return n}}function rt(e){return Y.test(e+"")}function it(){var e,t=[];return e=function(n,r){return t.push(n+=" ")>i.cacheLength&&delete e[t.shift()],e[n]=r}}function ot(e){return e[x]=!0,e}function at(e){var t=p.createElement("div");try{return e(t)}catch(n){return!1}finally{t=null}}function st(e,t,n,r){var i,o,a,s,u,l,f,g,m,v;if((t?t.ownerDocument||t:w)!==p&&c(t),t=t||p,n=n||[],!e||"string"!=typeof e)return n;if(1!==(s=t.nodeType)&&9!==s)return[];if(!d&&!r){if(i=J.exec(e))if(a=i[1]){if(9===s){if(o=t.getElementById(a),!o||!o.parentNode)return n;if(o.id===a)return n.push(o),n}else if(t.ownerDocument&&(o=t.ownerDocument.getElementById(a))&&y(t,o)&&o.id===a)return n.push(o),n}else{if(i[2])return H.apply(n,q.call(t.getElementsByTagName(e),0)),n;if((a=i[3])&&T.getByClassName&&t.getElementsByClassName)return H.apply(n,q.call(t.getElementsByClassName(a),0)),n}if(T.qsa&&!h.test(e)){if(f=!0,g=x,m=t,v=9===s&&e,1===s&&"object"!==t.nodeName.toLowerCase()){l=ft(e),(f=t.getAttribute("id"))?g=f.replace(K,"\\$&"):t.setAttribute("id",g),g="[id='"+g+"'] ",u=l.length;while(u--)l[u]=g+dt(l[u]);m=V.test(e)&&t.parentNode||t,v=l.join(",")}if(v)try{return H.apply(n,q.call(m.querySelectorAll(v),0)),n}catch(b){}finally{f||t.removeAttribute("id")}}}return wt(e.replace(W,"$1"),t,n,r)}a=st.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},c=st.setDocument=function(e){var n=e?e.ownerDocument||e:w;return n!==p&&9===n.nodeType&&n.documentElement?(p=n,f=n.documentElement,d=a(n),T.tagNameNoComments=at(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),T.attributes=at(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return"boolean"!==t&&"string"!==t}),T.getByClassName=at(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",e.getElementsByClassName&&e.getElementsByClassName("e").length?(e.lastChild.className="e",2===e.getElementsByClassName("e").length):!1}),T.getByName=at(function(e){e.id=x+0,e.innerHTML="<a name='"+x+"'></a><div name='"+x+"'></div>",f.insertBefore(e,f.firstChild);var t=n.getElementsByName&&n.getElementsByName(x).length===2+n.getElementsByName(x+0).length;return T.getIdNotName=!n.getElementById(x),f.removeChild(e),t}),i.attrHandle=at(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==A&&"#"===e.firstChild.getAttribute("href")})?{}:{href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}},T.getIdNotName?(i.find.ID=function(e,t){if(typeof t.getElementById!==A&&!d){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){return e.getAttribute("id")===t}}):(i.find.ID=function(e,n){if(typeof n.getElementById!==A&&!d){var r=n.getElementById(e);return r?r.id===e||typeof r.getAttributeNode!==A&&r.getAttributeNode("id").value===e?[r]:t:[]}},i.filter.ID=function(e){var t=e.replace(et,tt);return function(e){var n=typeof e.getAttributeNode!==A&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=T.tagNameNoComments?function(e,n){return typeof n.getElementsByTagName!==A?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.NAME=T.getByName&&function(e,n){return typeof n.getElementsByName!==A?n.getElementsByName(name):t},i.find.CLASS=T.getByClassName&&function(e,n){return typeof n.getElementsByClassName===A||d?t:n.getElementsByClassName(e)},g=[],h=[":focus"],(T.qsa=rt(n.querySelectorAll))&&(at(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||h.push("\\["+_+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||h.push(":checked")}),at(function(e){e.innerHTML="<input type='hidden' i=''/>",e.querySelectorAll("[i^='']").length&&h.push("[*^$]="+_+"*(?:\"\"|'')"),e.querySelectorAll(":enabled").length||h.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),h.push(",.*:")})),(T.matchesSelector=rt(m=f.matchesSelector||f.mozMatchesSelector||f.webkitMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&at(function(e){T.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",R)}),h=RegExp(h.join("|")),g=RegExp(g.join("|")),y=rt(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},v=f.compareDocumentPosition?function(e,t){var r;return e===t?(u=!0,0):(r=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t))?1&r||e.parentNode&&11===e.parentNode.nodeType?e===n||y(w,e)?-1:t===n||y(w,t)?1:0:4&r?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return u=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:0;if(o===a)return ut(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?ut(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},u=!1,[0,0].sort(v),T.detectDuplicates=u,p):p},st.matches=function(e,t){return st(e,null,null,t)},st.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Z,"='$1']"),!(!T.matchesSelector||d||g&&g.test(t)||h.test(t)))try{var n=m.call(e,t);if(n||T.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(r){}return st(t,p,null,[e]).length>0},st.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},st.attr=function(e,t){var n;return(e.ownerDocument||e)!==p&&c(e),d||(t=t.toLowerCase()),(n=i.attrHandle[t])?n(e):d||T.attributes?e.getAttribute(t):((n=e.getAttributeNode(t))||e.getAttribute(t))&&e[t]===!0?t:n&&n.specified?n.value:null},st.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},st.uniqueSort=function(e){var t,n=[],r=1,i=0;if(u=!T.detectDuplicates,e.sort(v),u){for(;t=e[r];r++)t===e[r-1]&&(i=n.push(r));while(i--)e.splice(n[i],1)}return e};function ut(e,t){var n=t&&e,r=n&&(~t.sourceIndex||j)-(~e.sourceIndex||j);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function lt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ct(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function pt(e){return ot(function(t){return t=+t,ot(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}o=st.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=st.selectors={cacheLength:50,createPseudo:ot,match:U,find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(et,tt),e[3]=(e[4]||e[5]||"").replace(et,tt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||st.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&st.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return U.CHILD.test(e[0])?null:(e[4]?e[2]=e[4]:n&&z.test(n)&&(t=ft(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){return"*"===e?function(){return!0}:(e=e.replace(et,tt).toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=k[e+" "];return t||(t=RegExp("(^|"+_+")"+e+"("+_+"|$)"))&&k(e,function(e){return t.test(e.className||typeof e.getAttribute!==A&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=st.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!u&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[x]||(m[x]={}),l=c[e]||[],d=l[0]===N&&l[1],f=l[0]===N&&l[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[N,d,f];break}}else if(v&&(l=(t[x]||(t[x]={}))[e])&&l[0]===N)f=l[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[x]||(p[x]={}))[e]=[N,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||st.error("unsupported pseudo: "+e);return r[x]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?ot(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=M.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:ot(function(e){var t=[],n=[],r=s(e.replace(W,"$1"));return r[x]?ot(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:ot(function(e){return function(t){return st(e,t).length>0}}),contains:ot(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:ot(function(e){return X.test(e||"")||st.error("unsupported lang: "+e),e=e.replace(et,tt).toLowerCase(),function(t){var n;do if(n=d?t.getAttribute("xml:lang")||t.getAttribute("lang"):t.lang)return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return Q.test(e.nodeName)},input:function(e){return G.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:pt(function(){return[0]}),last:pt(function(e,t){return[t-1]}),eq:pt(function(e,t,n){return[0>n?n+t:n]}),even:pt(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:pt(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:pt(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:pt(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}};for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[n]=lt(n);for(n in{submit:!0,reset:!0})i.pseudos[n]=ct(n);function ft(e,t){var n,r,o,a,s,u,l,c=E[e+" "];if(c)return t?0:c.slice(0);s=e,u=[],l=i.preFilter;while(s){(!n||(r=$.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),u.push(o=[])),n=!1,(r=I.exec(s))&&(n=r.shift(),o.push({value:n,type:r[0].replace(W," ")}),s=s.slice(n.length));for(a in i.filter)!(r=U[a].exec(s))||l[a]&&!(r=l[a](r))||(n=r.shift(),o.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?st.error(e):E(e,u).slice(0)}function dt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function ht(e,t,n){var i=t.dir,o=n&&"parentNode"===i,a=C++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,s){var u,l,c,p=N+" "+a;if(s){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[x]||(t[x]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,s)||r,l[1]===!0)return!0}}function gt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function mt(e,t,n,r,i){var o,a=[],s=0,u=e.length,l=null!=t;for(;u>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),l&&t.push(s));return a}function yt(e,t,n,r,i,o){return r&&!r[x]&&(r=yt(r)),i&&!i[x]&&(i=yt(i,o)),ot(function(o,a,s,u){var l,c,p,f=[],d=[],h=a.length,g=o||xt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:mt(g,f,e,s,u),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,u),r){l=mt(y,d),r(l,[],s,u),c=l.length;while(c--)(p=l[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?M.call(o,p):f[c])>-1&&(o[l]=!(a[l]=p))}}else y=mt(y===a?y.splice(h,y.length):y),i?i(null,a,y,u):H.apply(a,y)})}function vt(e){var t,n,r,o=e.length,a=i.relative[e[0].type],s=a||i.relative[" "],u=a?1:0,c=ht(function(e){return e===t},s,!0),p=ht(function(e){return M.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==l)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>u;u++)if(n=i.relative[e[u].type])f=[ht(gt(f),n)];else{if(n=i.filter[e[u].type].apply(null,e[u].matches),n[x]){for(r=++u;o>r;r++)if(i.relative[e[r].type])break;return yt(u>1&&gt(f),u>1&&dt(e.slice(0,u-1)).replace(W,"$1"),n,r>u&&vt(e.slice(u,r)),o>r&&vt(e=e.slice(r)),o>r&&dt(e))}f.push(n)}return gt(f)}function bt(e,t){var n=0,o=t.length>0,a=e.length>0,s=function(s,u,c,f,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,T=l,C=s||a&&i.find.TAG("*",d&&u.parentNode||u),k=N+=null==T?1:Math.random()||.1;for(w&&(l=u!==p&&u,r=n);null!=(h=C[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,u,c)){f.push(h);break}w&&(N=k,r=++n)}o&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,o&&b!==v){g=0;while(m=t[g++])m(x,y,u,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=L.call(f));y=mt(y)}H.apply(f,y),w&&!s&&y.length>0&&v+t.length>1&&st.uniqueSort(f)}return w&&(N=k,l=T),x};return o?ot(s):s}s=st.compile=function(e,t){var n,r=[],i=[],o=S[e+" "];if(!o){t||(t=ft(e)),n=t.length;while(n--)o=vt(t[n]),o[x]?r.push(o):i.push(o);o=S(e,bt(i,r))}return o};function xt(e,t,n){var r=0,i=t.length;for(;i>r;r++)st(e,t[r],n);return n}function wt(e,t,n,r){var o,a,u,l,c,p=ft(e);if(!r&&1===p.length){if(a=p[0]=p[0].slice(0),a.length>2&&"ID"===(u=a[0]).type&&9===t.nodeType&&!d&&i.relative[a[1].type]){if(t=i.find.ID(u.matches[0].replace(et,tt),t)[0],!t)return n;e=e.slice(a.shift().value.length)}o=U.needsContext.test(e)?0:a.length;while(o--){if(u=a[o],i.relative[l=u.type])break;if((c=i.find[l])&&(r=c(u.matches[0].replace(et,tt),V.test(a[0].type)&&t.parentNode||t))){if(a.splice(o,1),e=r.length&&dt(a),!e)return H.apply(n,q.call(r,0)),n;break}}}return s(e,p)(r,t,d,n,V.test(e)),n}i.pseudos.nth=i.pseudos.eq;function Tt(){}i.filters=Tt.prototype=i.pseudos,i.setFilters=new Tt,c(),st.attr=b.attr,b.find=st,b.expr=st.selectors,b.expr[":"]=b.expr.pseudos,b.unique=st.uniqueSort,b.text=st.getText,b.isXMLDoc=st.isXML,b.contains=st.contains}(e);var at=/Until$/,st=/^(?:parents|prev(?:Until|All))/,ut=/^.[^:#\[\.,]*$/,lt=b.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};b.fn.extend({find:function(e){var t,n,r,i=this.length;if("string"!=typeof e)return r=this,this.pushStack(b(e).filter(function(){for(t=0;i>t;t++)if(b.contains(r[t],this))return!0}));for(n=[],t=0;i>t;t++)b.find(e,this[t],n);return n=this.pushStack(i>1?b.unique(n):n),n.selector=(this.selector?this.selector+" ":"")+e,n},has:function(e){var t,n=b(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(b.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e,!1))},filter:function(e){return this.pushStack(ft(this,e,!0))},is:function(e){return!!e&&("string"==typeof e?lt.test(e)?b(e,this.context).index(this[0])>=0:b.filter(e,this).length>0:this.filter(e).length>0)},closest:function(e,t){var n,r=0,i=this.length,o=[],a=lt.test(e)||"string"!=typeof e?b(e,t||this.context):0;for(;i>r;r++){n=this[r];while(n&&n.ownerDocument&&n!==t&&11!==n.nodeType){if(a?a.index(n)>-1:b.find.matchesSelector(n,e)){o.push(n);break}n=n.parentNode}}return this.pushStack(o.length>1?b.unique(o):o)},index:function(e){return e?"string"==typeof e?b.inArray(this[0],b(e)):b.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?b(e,t):b.makeArray(e&&e.nodeType?[e]:e),r=b.merge(this.get(),n);return this.pushStack(b.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}}),b.fn.andSelf=b.fn.addBack;function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}b.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return b.dir(e,"parentNode")},parentsUntil:function(e,t,n){return b.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return b.dir(e,"nextSibling")},prevAll:function(e){return b.dir(e,"previousSibling")},nextUntil:function(e,t,n){return b.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return b.dir(e,"previousSibling",n)},siblings:function(e){return b.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return b.sibling(e.firstChild)},contents:function(e){return b.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:b.merge([],e.childNodes)}},function(e,t){b.fn[e]=function(n,r){var i=b.map(this,t,n);return at.test(e)||(r=n),r&&"string"==typeof r&&(i=b.filter(r,i)),i=this.length>1&&!ct[e]?b.unique(i):i,this.length>1&&st.test(e)&&(i=i.reverse()),this.pushStack(i)}}),b.extend({filter:function(e,t,n){return n&&(e=":not("+e+")"),1===t.length?b.find.matchesSelector(t[0],e)?[t[0]]:[]:b.find.matches(e,t)},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!b(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(t=t||0,b.isFunction(t))return b.grep(e,function(e,r){var i=!!t.call(e,r,e);return i===n});if(t.nodeType)return b.grep(e,function(e){return e===t===n});if("string"==typeof t){var r=b.grep(e,function(e){return 1===e.nodeType});if(ut.test(t))return b.filter(t,r,!n);t=b.filter(t,r)}return b.grep(e,function(e){return b.inArray(e,t)>=0===n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Nt=/^(?:checkbox|radio)$/i,Ct=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:b.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(o),Dt=jt.appendChild(o.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,b.fn.extend({text:function(e){return b.access(this,function(e){return e===t?b.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},wrapAll:function(e){if(b.isFunction(e))return this.each(function(t){b(this).wrapAll(e.call(this,t))});if(this[0]){var t=b(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return b.isFunction(e)?this.each(function(t){b(this).wrapInner(e.call(this,t))}):this.each(function(){var t=b(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=b.isFunction(e);return this.each(function(n){b(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){b.nodeName(this,"body")||b(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.appendChild(e)})},prepend:function(){return this.domManip(arguments,!0,function(e){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&this.insertBefore(e,this.firstChild)})},before:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,!1,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=0;for(;null!=(n=this[r]);r++)(!e||b.filter(e,[n]).length>0)&&(t||1!==n.nodeType||b.cleanData(Ot(n)),n.parentNode&&(t&&b.contains(n.ownerDocument,n)&&Mt(Ot(n,"script")),n.parentNode.removeChild(n)));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&b.cleanData(Ot(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&b.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return b.clone(this,e,t)})},html:function(e){return b.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!b.support.htmlSerialize&&mt.test(e)||!b.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(b.cleanData(Ot(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(e){var t=b.isFunction(e);return t||"string"==typeof e||(e=b(e).not(this).detach()),this.domManip([e],!0,function(e){var t=this.nextSibling,n=this.parentNode;n&&(b(this).remove(),n.insertBefore(e,t))})},detach:function(e){return this.remove(e,!0)},domManip:function(e,n,r){e=f.apply([],e);var i,o,a,s,u,l,c=0,p=this.length,d=this,h=p-1,g=e[0],m=b.isFunction(g);if(m||!(1>=p||"string"!=typeof g||b.support.checkClone)&&Ct.test(g))return this.each(function(i){var o=d.eq(i);m&&(e[0]=g.call(this,i,n?o.html():t)),o.domManip(e,n,r)});if(p&&(l=b.buildFragment(e,this[0].ownerDocument,!1,this),i=l.firstChild,1===l.childNodes.length&&(l=i),i)){for(n=n&&b.nodeName(i,"tr"),s=b.map(Ot(l,"script"),Ht),a=s.length;p>c;c++)o=l,c!==h&&(o=b.clone(o,!0,!0),a&&b.merge(s,Ot(o,"script"))),r.call(n&&b.nodeName(this[c],"table")?Lt(this[c],"tbody"):this[c],o,c);if(a)for(u=s[s.length-1].ownerDocument,b.map(s,qt),c=0;a>c;c++)o=s[c],kt.test(o.type||"")&&!b._data(o,"globalEval")&&b.contains(u,o)&&(o.src?b.ajax({url:o.src,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0}):b.globalEval((o.text||o.textContent||o.innerHTML||"").replace(St,"")));l=i=null}return this}});function Lt(e,t){return e.getElementsByTagName(t)[0]||e.appendChild(e.ownerDocument.createElement(t))}function Ht(e){var t=e.getAttributeNode("type");return e.type=(t&&t.specified)+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function Mt(e,t){var n,r=0;for(;null!=(n=e[r]);r++)b._data(n,"globalEval",!t||b._data(t[r],"globalEval"))}function _t(e,t){if(1===t.nodeType&&b.hasData(e)){var n,r,i,o=b._data(e),a=b._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)b.event.add(t,n,s[n][r])}a.data&&(a.data=b.extend({},a.data))}}function Ft(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!b.support.noCloneEvent&&t[b.expando]){i=b._data(t);for(r in i.events)b.removeEvent(t,r,i.handle);t.removeAttribute(b.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),b.support.html5Clone&&e.innerHTML&&!b.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Nt.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}b.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){b.fn[e]=function(e){var n,r=0,i=[],o=b(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),b(o[r])[t](n),d.apply(i,n.get());return this.pushStack(i)}});function Ot(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||b.nodeName(o,n)?s.push(o):b.merge(s,Ot(o,n));return n===t||n&&b.nodeName(e,n)?b.merge([e],s):s}function Bt(e){Nt.test(e.type)&&(e.defaultChecked=e.checked)}b.extend({clone:function(e,t,n){var r,i,o,a,s,u=b.contains(e.ownerDocument,e);if(b.support.html5Clone||b.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(b.support.noCloneEvent&&b.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||b.isXMLDoc(e)))for(r=Ot(o),s=Ot(e),a=0;null!=(i=s[a]);++a)r[a]&&Ft(i,r[a]);if(t)if(n)for(s=s||Ot(e),r=r||Ot(o),a=0;null!=(i=s[a]);a++)_t(i,r[a]);else _t(e,o);return r=Ot(o,"script"),r.length>0&&Mt(r,!u&&Ot(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,u,l,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===b.type(o))b.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),u=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[u]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!b.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!b.support.tbody){o="table"!==u||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)b.nodeName(l=o.childNodes[i],"tbody")&&!l.childNodes.length&&o.removeChild(l)
}b.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),b.support.appendChecked||b.grep(Ot(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===b.inArray(o,r))&&(a=b.contains(o.ownerDocument,o),s=Ot(f.appendChild(o),"script"),a&&Mt(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,u=b.expando,l=b.cache,p=b.support.deleteExpando,f=b.event.special;for(;null!=(n=e[s]);s++)if((t||b.acceptData(n))&&(o=n[u],a=o&&l[o])){if(a.events)for(r in a.events)f[r]?b.event.remove(n,r):b.removeEvent(n,r,a.handle);l[o]&&(delete l[o],p?delete n[u]:typeof n.removeAttribute!==i?n.removeAttribute(u):n[u]=null,c.push(o))}}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+x+")(.*)$","i"),Yt=RegExp("^("+x+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+x+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===b.css(e,"display")||!b.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=b._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=b._data(r,"olddisplay",un(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&b._data(r,"olddisplay",i?n:b.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}b.fn.extend({css:function(e,n){return b.access(this,function(e,n,r){var i,o,a={},s=0;if(b.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=b.css(e,n[s],!1,o);return a}return r!==t?b.style(e,n,r):b.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){var t="boolean"==typeof e;return this.each(function(){(t?e:nn(this))?b(this).show():b(this).hide()})}}),b.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":b.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,u=b.camelCase(n),l=e.style;if(n=b.cssProps[u]||(b.cssProps[u]=tn(l,u)),s=b.cssHooks[n]||b.cssHooks[u],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:l[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(b.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||b.cssNumber[u]||(r+="px"),b.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(l[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{l[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,u=b.camelCase(n);return n=b.cssProps[u]||(b.cssProps[u]=tn(e.style,u)),s=b.cssHooks[n]||b.cssHooks[u],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||b.isNumeric(o)?o||0:a):a},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s.getPropertyValue(n)||s[n]:t,l=e.style;return s&&(""!==u||b.contains(e.ownerDocument,e)||(u=b.style(e,n)),Yt.test(u)&&Ut.test(n)&&(i=l.width,o=l.minWidth,a=l.maxWidth,l.minWidth=l.maxWidth=l.width=u,u=s.width,l.width=i,l.minWidth=o,l.maxWidth=a)),u}):o.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),u=s?s[n]:t,l=e.style;return null==u&&l&&l[n]&&(u=l[n]),Yt.test(u)&&!zt.test(n)&&(i=l.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),l.left="fontSize"===n?"1em":u,u=l.pixelLeft+"px",l.left=i,a&&(o.left=a)),""===u?"auto":u});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=b.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=b.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=b.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=b.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=b.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(b.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function un(e){var t=o,n=Gt[e];return n||(n=ln(e,t),"none"!==n&&n||(Pt=(Pt||b("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=ln(e,t),Pt.detach()),Gt[e]=n),n}function ln(e,t){var n=b(t.createElement(e)).appendTo(t.body),r=b.css(n[0],"display");return n.remove(),r}b.each(["height","width"],function(e,n){b.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(b.css(e,"display"))?b.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,b.support.boxSizing&&"border-box"===b.css(e,"boxSizing",!1,i),i):0)}}}),b.support.opacity||(b.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=b.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===b.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),b(function(){b.support.reliableMarginRight||(b.cssHooks.marginRight={get:function(e,n){return n?b.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!b.support.pixelPosition&&b.fn.position&&b.each(["top","left"],function(e,n){b.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?b(e).position()[n]+"px":r):t}}})}),b.expr&&b.expr.filters&&(b.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!b.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||b.css(e,"display"))},b.expr.filters.visible=function(e){return!b.expr.filters.hidden(e)}),b.each({margin:"",padding:"",border:"Width"},function(e,t){b.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(b.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;b.fn.extend({serialize:function(){return b.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=b.prop(this,"elements");return e?b.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!b(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Nt.test(e))}).map(function(e,t){var n=b(this).val();return null==n?null:b.isArray(n)?b.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),b.param=function(e,n){var r,i=[],o=function(e,t){t=b.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=b.ajaxSettings&&b.ajaxSettings.traditional),b.isArray(e)||e.jquery&&!b.isPlainObject(e))b.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(b.isArray(t))b.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==b.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}b.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){b.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),b.fn.hover=function(e,t){return this.mouseenter(e).mouseleave(t||e)};var mn,yn,vn=b.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Nn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Cn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=b.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=a.href}catch(Ln){yn=o.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(b.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(u){var l;return o[u]=!0,b.each(e[u]||[],function(e,u){var c=u(n,r,i);return"string"!=typeof c||a||o[c]?a?!(l=c):t:(n.dataTypes.unshift(c),s(c),!1)}),l}return s(n.dataTypes[0])||!o["*"]&&s("*")}function Mn(e,n){var r,i,o=b.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&b.extend(!0,e,r),e}b.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,u=e.indexOf(" ");return u>=0&&(i=e.slice(u,e.length),e=e.slice(0,u)),b.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&b.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?b("<div>").append(b.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},b.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){b.fn[t]=function(e){return this.on(t,e)}}),b.each(["get","post"],function(e,n){b[n]=function(e,r,i,o){return b.isFunction(r)&&(o=o||i,i=r,r=t),b.ajax({url:e,type:n,dataType:o,data:r,success:i})}}),b.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Nn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":e.String,"text html":!0,"text json":b.parseJSON,"text xml":b.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?Mn(Mn(e,b.ajaxSettings),t):Mn(b.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,u,l,c,p=b.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?b(f):b.event,h=b.Deferred(),g=b.Callbacks("once memory"),m=p.statusCode||{},y={},v={},x=0,T="canceled",N={readyState:0,getResponseHeader:function(e){var t;if(2===x){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===x?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return x||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return x||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>x)for(t in e)m[t]=[m[t],e[t]];else N.always(e[N.status]);return this},abort:function(e){var t=e||T;return l&&l.abort(t),k(0,t),this}};if(h.promise(N).complete=g.add,N.success=N.done,N.error=N.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=b.trim(p.dataType||"*").toLowerCase().match(w)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?80:443))==(mn[3]||("http:"===mn[1]?80:443)))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=b.param(p.data,p.traditional)),qn(An,p,n,N),2===x)return N;u=p.global,u&&0===b.active++&&b.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Cn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(b.lastModified[o]&&N.setRequestHeader("If-Modified-Since",b.lastModified[o]),b.etag[o]&&N.setRequestHeader("If-None-Match",b.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&N.setRequestHeader("Content-Type",p.contentType),N.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)N.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,N,p)===!1||2===x))return N.abort();T="abort";for(i in{success:1,error:1,complete:1})N[i](p[i]);if(l=qn(jn,p,n,N)){N.readyState=1,u&&d.trigger("ajaxSend",[N,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){N.abort("timeout")},p.timeout));try{x=1,l.send(y,k)}catch(C){if(!(2>x))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,C=n;2!==x&&(x=2,s&&clearTimeout(s),l=t,a=i||"",N.readyState=e>0?4:0,r&&(w=_n(p,N,r)),e>=200&&300>e||304===e?(p.ifModified&&(T=N.getResponseHeader("Last-Modified"),T&&(b.lastModified[o]=T),T=N.getResponseHeader("etag"),T&&(b.etag[o]=T)),204===e?(c=!0,C="nocontent"):304===e?(c=!0,C="notmodified"):(c=Fn(p,w),C=c.state,y=c.data,v=c.error,c=!v)):(v=C,(e||!C)&&(C="error",0>e&&(e=0))),N.status=e,N.statusText=(n||C)+"",c?h.resolveWith(f,[y,C,N]):h.rejectWith(f,[N,C,v]),N.statusCode(m),m=t,u&&d.trigger(c?"ajaxSuccess":"ajaxError",[N,p,c?y:v]),g.fireWith(f,[N,C]),u&&(d.trigger("ajaxComplete",[N,p]),--b.active||b.event.trigger("ajaxStop")))}return N},getScript:function(e,n){return b.get(e,t,n,"script")},getJSON:function(e,t,n){return b.get(e,t,n,"json")}});function _n(e,n,r){var i,o,a,s,u=e.contents,l=e.dataTypes,c=e.responseFields;for(s in c)s in r&&(n[c[s]]=r[s]);while("*"===l[0])l.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in u)if(u[s]&&u[s].test(o)){l.unshift(s);break}if(l[0]in r)a=l[0];else{for(s in r){if(!l[0]||e.converters[s+" "+l[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==l[0]&&l.unshift(a),r[a]):t}function Fn(e,t){var n,r,i,o,a={},s=0,u=e.dataTypes.slice(),l=u[0];if(e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u[1])for(i in e.converters)a[i.toLowerCase()]=e.converters[i];for(;r=u[++s];)if("*"!==r){if("*"!==l&&l!==r){if(i=a[l+" "+r]||a["* "+r],!i)for(n in a)if(o=n.split(" "),o[1]===r&&(i=a[l+" "+o[0]]||a["* "+o[0]])){i===!0?i=a[n]:a[n]!==!0&&(r=o[0],u.splice(s--,0,r));break}if(i!==!0)if(i&&e["throws"])t=i(t);else try{t=i(t)}catch(c){return{state:"parsererror",error:i?c:"No conversion from "+l+" to "+r}}}l=r}return{state:"success",data:t}}b.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return b.globalEval(e),e}}}),b.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),b.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=o.head||b("head")[0]||o.documentElement;return{send:function(t,i){n=o.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var On=[],Bn=/(=)\?(?=&|$)|\?\?/;b.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=On.pop()||b.expando+"_"+vn++;return this[e]=!0,e}}),b.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,u=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return u||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=b.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,u?n[u]=n[u].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||b.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,On.push(o)),s&&b.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}b.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=b.ajaxSettings.xhr(),b.support.cors=!!Rn&&"withCredentials"in Rn,Rn=b.support.ajax=!!Rn,Rn&&b.ajaxTransport(function(n){if(!n.crossDomain||b.support.cors){var r;return{send:function(i,o){var a,s,u=n.xhr();if(n.username?u.open(n.type,n.url,n.async,n.username,n.password):u.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)u[s]=n.xhrFields[s];n.mimeType&&u.overrideMimeType&&u.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)u.setRequestHeader(s,i[s])}catch(l){}u.send(n.hasContent&&n.data||null),r=function(e,i){var s,l,c,p;try{if(r&&(i||4===u.readyState))if(r=t,a&&(u.onreadystatechange=b.noop,$n&&delete Pn[a]),i)4!==u.readyState&&u.abort();else{p={},s=u.status,l=u.getAllResponseHeaders(),"string"==typeof u.responseText&&(p.text=u.responseText);try{c=u.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,l)},n.async?4===u.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},b(e).unload($n)),Pn[a]=r),u.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+x+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n,r,i=this.createTween(e,t),o=Yn.exec(t),a=i.cur(),s=+a||0,u=1,l=20;if(o){if(n=+o[2],r=o[3]||(b.cssNumber[e]?"":"px"),"px"!==r&&s){s=b.css(i.elem,e,!0)||n||1;do u=u||".5",s/=u,b.style(i.elem,e,s+r);while(u!==(u=i.cur()/a)&&1!==u&&--l)}i.unit=r,i.start=s,i.end=o[1]?s+(o[1]+1)*n:n}return i}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=b.now()}function Zn(e,t){b.each(t,function(t,n){var r=(Qn[t]||[]).concat(Qn["*"]),i=0,o=r.length;for(;o>i;i++)if(r[i].call(e,t,n))return})}function er(e,t,n){var r,i,o=0,a=Gn.length,s=b.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,a=0,u=l.tweens.length;for(;u>a;a++)l.tweens[a].run(o);return s.notifyWith(e,[l,o,n]),1>o&&u?n:(s.resolveWith(e,[l]),!1)},l=s.promise({elem:e,props:b.extend({},t),opts:b.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=b.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?s.resolveWith(e,[l,t]):s.rejectWith(e,[l,t]),this}}),c=l.props;for(tr(c,l.opts.specialEasing);a>o;o++)if(r=Gn[o].call(l,e,c,l.opts))return r;return Zn(l,c),b.isFunction(l.opts.start)&&l.opts.start.call(e,l),b.fx.timer(b.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function tr(e,t){var n,r,i,o,a;for(i in e)if(r=b.camelCase(i),o=t[r],n=e[i],b.isArray(n)&&(o=n[1],n=e[i]=n[0]),i!==r&&(e[r]=n,delete e[i]),a=b.cssHooks[r],a&&"expand"in a){n=a.expand(n),delete e[r];for(i in n)i in e||(e[i]=n[i],t[i]=o)}else t[r]=o}b.Animation=b.extend(er,{tweener:function(e,t){b.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,u,l,c,p,f=this,d=e.style,h={},g=[],m=e.nodeType&&nn(e);n.queue||(c=b._queueHooks(e,"fx"),null==c.unqueued&&(c.unqueued=0,p=c.empty.fire,c.empty.fire=function(){c.unqueued||p()}),c.unqueued++,f.always(function(){f.always(function(){c.unqueued--,b.queue(e,"fx").length||c.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[d.overflow,d.overflowX,d.overflowY],"inline"===b.css(e,"display")&&"none"===b.css(e,"float")&&(b.support.inlineBlockNeedsLayout&&"inline"!==un(e.nodeName)?d.zoom=1:d.display="inline-block")),n.overflow&&(d.overflow="hidden",b.support.shrinkWrapBlocks||f.always(function(){d.overflow=n.overflow[0],d.overflowX=n.overflow[1],d.overflowY=n.overflow[2]}));for(i in t)if(a=t[i],Vn.exec(a)){if(delete t[i],u=u||"toggle"===a,a===(m?"hide":"show"))continue;g.push(i)}if(o=g.length){s=b._data(e,"fxshow")||b._data(e,"fxshow",{}),"hidden"in s&&(m=s.hidden),u&&(s.hidden=!m),m?b(e).show():f.done(function(){b(e).hide()}),f.done(function(){var t;b._removeData(e,"fxshow");for(t in h)b.style(e,t,h[t])});for(i=0;o>i;i++)r=g[i],l=f.createTween(r,m?s[r]:0),h[r]=s[r]||b.style(e,r),r in s||(s[r]=l.start,m&&(l.end=l.start,l.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}b.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(b.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?b.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=b.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){b.fx.step[e.prop]?b.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[b.cssProps[e.prop]]||b.cssHooks[e.prop])?b.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},b.each(["toggle","show","hide"],function(e,t){var n=b.fn[t];b.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),b.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=b.isEmptyObject(e),o=b.speed(t,n,r),a=function(){var t=er(this,b.extend({},e),o);a.finish=function(){t.stop(!0)},(i||b._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=b.timers,a=b._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&b.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=b._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=b.timers,a=r?r.length:0;for(n.finish=!0,b.queue(this,e,[]),i&&i.cur&&i.cur.finish&&i.cur.finish.call(this),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}b.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){b.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),b.speed=function(e,t,n){var r=e&&"object"==typeof e?b.extend({},e):{complete:n||!n&&t||b.isFunction(e)&&e,duration:e,easing:n&&t||t&&!b.isFunction(t)&&t};return r.duration=b.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in b.fx.speeds?b.fx.speeds[r.duration]:b.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){b.isFunction(r.old)&&r.old.call(this),r.queue&&b.dequeue(this,r.queue)},r},b.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},b.timers=[],b.fx=rr.prototype.init,b.fx.tick=function(){var e,n=b.timers,r=0;for(Xn=b.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||b.fx.stop(),Xn=t},b.fx.timer=function(e){e()&&b.timers.push(e)&&b.fx.start()},b.fx.interval=13,b.fx.start=function(){Un||(Un=setInterval(b.fx.tick,b.fx.interval))},b.fx.stop=function(){clearInterval(Un),Un=null},b.fx.speeds={slow:600,fast:200,_default:400},b.fx.step={},b.expr&&b.expr.filters&&(b.expr.filters.animated=function(e){return b.grep(b.timers,function(t){return e===t.elem}).length}),b.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){b.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,b.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},b.offset={setOffset:function(e,t,n){var r=b.css(e,"position");"static"===r&&(e.style.position="relative");var i=b(e),o=i.offset(),a=b.css(e,"top"),s=b.css(e,"left"),u=("absolute"===r||"fixed"===r)&&b.inArray("auto",[a,s])>-1,l={},c={},p,f;u?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),b.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(l.top=t.top-o.top+p),null!=t.left&&(l.left=t.left-o.left+f),"using"in t?t.using.call(e,l):i.css(l)}},b.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===b.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),b.nodeName(e[0],"html")||(n=e.offset()),n.top+=b.css(e[0],"borderTopWidth",!0),n.left+=b.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-b.css(r,"marginTop",!0),left:t.left-n.left-b.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||o.documentElement;while(e&&!b.nodeName(e,"html")&&"static"===b.css(e,"position"))e=e.offsetParent;return e||o.documentElement})}}),b.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);b.fn[e]=function(i){return b.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?b(a).scrollLeft():o,r?o:b(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return b.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}b.each({Height:"height",Width:"width"},function(e,n){b.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){b.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return b.access(this,function(n,r,i){var o;return b.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?b.css(n,r,s):b.style(n,r,i,s)},n,a?i:t,a,null)}})}),e.jQuery=e.$=b,"function"==typeof define&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return b})})(window);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e,t){function i(t,i){var a,n,r,o=t.nodeName.toLowerCase();return"area"===o?(a=t.parentNode,n=a.name,t.href&&n&&"map"===a.nodeName.toLowerCase()?(r=e("img[usemap=#"+n+"]")[0],!!r&&s(r)):!1):(/input|select|textarea|button|object/.test(o)?!t.disabled:"a"===o?t.href||i:i)&&s(t)}function s(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var a=0,n=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"1.10.2",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(i,s){return"number"==typeof i?this.each(function(){var t=this;setTimeout(function(){e(t).focus(),s&&s.call(t)},i)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(document):t},zIndex:function(i){if(i!==t)return this.css("zIndex",i);if(this.length)for(var s,a,n=e(this[0]);n.length&&n[0]!==document;){if(s=n.css("position"),("absolute"===s||"relative"===s||"fixed"===s)&&(a=parseInt(n.css("zIndex"),10),!isNaN(a)&&0!==a))return a;n=n.parent()}return 0},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})},removeUniqueId:function(){return this.each(function(){n.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):function(t,i,s){return!!e.data(t,s[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var s=e.attr(t,"tabindex"),a=isNaN(s);return(a||s>=0)&&i(t,!a)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(i,s){function a(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===s?["Left","Right"]:["Top","Bottom"],r=s.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+s]=function(i){return i===t?o["inner"+s].call(this):this.each(function(){e(this).css(r,a(this,i)+"px")})},e.fn["outer"+s]=function(t,i){return"number"!=typeof t?o["outer"+s].call(this,t):this.each(function(){e(this).css(r,a(this,t,!0,i)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(i){return arguments.length?t.call(this,e.camelCase(i)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in document.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),e.extend(e.ui,{plugin:{add:function(t,i,s){var a,n=e.ui[t].prototype;for(a in s)n.plugins[a]=n.plugins[a]||[],n.plugins[a].push([i,s[a]])},call:function(e,t,i){var s,a=e.plugins[t];if(a&&e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType)for(s=0;a.length>s;s++)e.options[a[s][0]]&&a[s][1].apply(e.element,i)}},hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",a=!1;return t[s]>0?!0:(t[s]=1,a=t[s]>0,t[s]=0,a)}})})(jQuery);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e,t){var i=0,s=Array.prototype.slice,n=e.cleanData;e.cleanData=function(t){for(var i,s=0;null!=(i=t[s]);s++)try{e(i).triggerHandler("remove")}catch(a){}n(t)},e.widget=function(i,s,n){var a,r,o,h,l={},u=i.split(".")[0];i=i.split(".")[1],a=u+"-"+i,n||(n=s,s=e.Widget),e.expr[":"][a.toLowerCase()]=function(t){return!!e.data(t,a)},e[u]=e[u]||{},r=e[u][i],o=e[u][i]=function(e,i){return this._createWidget?(arguments.length&&this._createWidget(e,i),t):new o(e,i)},e.extend(o,r,{version:n.version,_proto:e.extend({},n),_childConstructors:[]}),h=new s,h.options=e.widget.extend({},h.options),e.each(n,function(i,n){return e.isFunction(n)?(l[i]=function(){var e=function(){return s.prototype[i].apply(this,arguments)},t=function(e){return s.prototype[i].apply(this,e)};return function(){var i,s=this._super,a=this._superApply;return this._super=e,this._superApply=t,i=n.apply(this,arguments),this._super=s,this._superApply=a,i}}(),t):(l[i]=n,t)}),o.prototype=e.widget.extend(h,{widgetEventPrefix:r?h.widgetEventPrefix:i},l,{constructor:o,namespace:u,widgetName:i,widgetFullName:a}),r?(e.each(r._childConstructors,function(t,i){var s=i.prototype;e.widget(s.namespace+"."+s.widgetName,o,i._proto)}),delete r._childConstructors):s._childConstructors.push(o),e.widget.bridge(i,o)},e.widget.extend=function(i){for(var n,a,r=s.call(arguments,1),o=0,h=r.length;h>o;o++)for(n in r[o])a=r[o][n],r[o].hasOwnProperty(n)&&a!==t&&(i[n]=e.isPlainObject(a)?e.isPlainObject(i[n])?e.widget.extend({},i[n],a):e.widget.extend({},a):a);return i},e.widget.bridge=function(i,n){var a=n.prototype.widgetFullName||i;e.fn[i]=function(r){var o="string"==typeof r,h=s.call(arguments,1),l=this;return r=!o&&h.length?e.widget.extend.apply(null,[r].concat(h)):r,o?this.each(function(){var s,n=e.data(this,a);return n?e.isFunction(n[r])&&"_"!==r.charAt(0)?(s=n[r].apply(n,h),s!==n&&s!==t?(l=s&&s.jquery?l.pushStack(s.get()):s,!1):t):e.error("no such method '"+r+"' for "+i+" widget instance"):e.error("cannot call methods on "+i+" prior to initialization; "+"attempted to call method '"+r+"'")}):this.each(function(){var t=e.data(this,a);t?t.option(r||{})._init():e.data(this,a,new n(r,this))}),l}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:!1,create:null},_createWidget:function(t,s){s=e(s||this.defaultElement||this)[0],this.element=e(s),this.uuid=i++,this.eventNamespace="."+this.widgetName+this.uuid,this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this.bindings=e(),this.hoverable=e(),this.focusable=e(),s!==this&&(e.data(s,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===s&&this.destroy()}}),this.document=e(s.style?s.ownerDocument:s.document||s),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this._create(),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:e.noop,_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){this._destroy(),this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)),this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled"),this.bindings.unbind(this.eventNamespace),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")},_destroy:e.noop,widget:function(){return this.element},option:function(i,s){var n,a,r,o=i;if(0===arguments.length)return e.widget.extend({},this.options);if("string"==typeof i)if(o={},n=i.split("."),i=n.shift(),n.length){for(a=o[i]=e.widget.extend({},this.options[i]),r=0;n.length-1>r;r++)a[n[r]]=a[n[r]]||{},a=a[n[r]];if(i=n.pop(),s===t)return a[i]===t?null:a[i];a[i]=s}else{if(s===t)return this.options[i]===t?null:this.options[i];o[i]=s}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return this.options[e]=t,"disabled"===e&&(this.widget().toggleClass(this.widgetFullName+"-disabled ui-state-disabled",!!t).attr("aria-disabled",t),this.hoverable.removeClass("ui-state-hover"),this.focusable.removeClass("ui-state-focus")),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_on:function(i,s,n){var a,r=this;"boolean"!=typeof i&&(n=s,s=i,i=!1),n?(s=a=e(s),this.bindings=this.bindings.add(s)):(n=s,s=this.element,a=this.widget()),e.each(n,function(n,o){function h(){return i||r.options.disabled!==!0&&!e(this).hasClass("ui-state-disabled")?("string"==typeof o?r[o]:o).apply(r,arguments):t}"string"!=typeof o&&(h.guid=o.guid=o.guid||h.guid||e.guid++);var l=n.match(/^(\w+)\s*(.*)$/),u=l[1]+r.eventNamespace,c=l[2];c?a.delegate(c,u,h):s.bind(u,h)})},_off:function(e,t){t=(t||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,e.unbind(t).undelegate(t)},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){e(t.currentTarget).addClass("ui-state-hover")},mouseleave:function(t){e(t.currentTarget).removeClass("ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){e(t.currentTarget).addClass("ui-state-focus")},focusout:function(t){e(t.currentTarget).removeClass("ui-state-focus")}})},_trigger:function(t,i,s){var n,a,r=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),i.target=this.element[0],a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(r)&&r.apply(this.element[0],[i].concat(s))===!1||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var r,o=n?n===!0||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),r=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),r&&e.effects&&e.effects.effect[o]?s[t](n):o!==t&&s[o]?s[o](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}})})(jQuery);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e){var t=!1;e(document).mouseup(function(){t=!1}),e.widget("ui.mouse",{version:"1.10.2",options:{cancel:"input,textarea,button,select,option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.bind("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).bind("click."+this.widgetName,function(i){return!0===e.data(i.target,t.widgetName+".preventClickEvent")?(e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1):undefined}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),this._mouseMoveDelegate&&e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(i){if(!t){this._mouseStarted&&this._mouseUp(i),this._mouseDownEvent=i;var s=this,n=1===i.which,a="string"==typeof this.options.cancel&&i.target.nodeName?e(i.target).closest(this.options.cancel).length:!1;return n&&!a&&this._mouseCapture(i)?(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){s.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(i)&&this._mouseDelayMet(i)&&(this._mouseStarted=this._mouseStart(i)!==!1,!this._mouseStarted)?(i.preventDefault(),!0):(!0===e.data(i.target,this.widgetName+".preventClickEvent")&&e.removeData(i.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return s._mouseMove(e)},this._mouseUpDelegate=function(e){return s._mouseUp(e)},e(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),i.preventDefault(),t=!0,!0)):!0}},_mouseMove:function(t){return e.ui.ie&&(!document.documentMode||9>document.documentMode)&&!t.button?this._mouseUp(t):this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,t)!==!1,this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){return e(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),!1},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}})})(jQuery);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t,e){function i(t,e,i){return[parseFloat(t[0])*(p.test(t[0])?e/100:1),parseFloat(t[1])*(p.test(t[1])?i/100:1)]}function s(e,i){return parseInt(t.css(e,i),10)||0}function n(e){var i=e[0];return 9===i.nodeType?{width:e.width(),height:e.height(),offset:{top:0,left:0}}:t.isWindow(i)?{width:e.width(),height:e.height(),offset:{top:e.scrollTop(),left:e.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:e.outerWidth(),height:e.outerHeight(),offset:e.offset()}}t.ui=t.ui||{};var a,o=Math.max,r=Math.abs,h=Math.round,l=/left|center|right/,c=/top|center|bottom/,u=/[\+\-]\d+(\.[\d]+)?%?/,d=/^\w+/,p=/%$/,f=t.fn.position;t.position={scrollbarWidth:function(){if(a!==e)return a;var i,s,n=t("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),o=n.children()[0];return t("body").append(n),i=o.offsetWidth,n.css("overflow","scroll"),s=o.offsetWidth,i===s&&(s=n[0].clientWidth),n.remove(),a=i-s},getScrollInfo:function(e){var i=e.isWindow?"":e.element.css("overflow-x"),s=e.isWindow?"":e.element.css("overflow-y"),n="scroll"===i||"auto"===i&&e.width<e.element[0].scrollWidth,a="scroll"===s||"auto"===s&&e.height<e.element[0].scrollHeight;return{width:a?t.position.scrollbarWidth():0,height:n?t.position.scrollbarWidth():0}},getWithinInfo:function(e){var i=t(e||window),s=t.isWindow(i[0]);return{element:i,isWindow:s,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:s?i.width():i.outerWidth(),height:s?i.height():i.outerHeight()}}},t.fn.position=function(e){if(!e||!e.of)return f.apply(this,arguments);e=t.extend({},e);var a,p,m,g,v,_,b=t(e.of),y=t.position.getWithinInfo(e.within),w=t.position.getScrollInfo(y),x=(e.collision||"flip").split(" "),k={};return _=n(b),b[0].preventDefault&&(e.at="left top"),p=_.width,m=_.height,g=_.offset,v=t.extend({},g),t.each(["my","at"],function(){var t,i,s=(e[this]||"").split(" ");1===s.length&&(s=l.test(s[0])?s.concat(["center"]):c.test(s[0])?["center"].concat(s):["center","center"]),s[0]=l.test(s[0])?s[0]:"center",s[1]=c.test(s[1])?s[1]:"center",t=u.exec(s[0]),i=u.exec(s[1]),k[this]=[t?t[0]:0,i?i[0]:0],e[this]=[d.exec(s[0])[0],d.exec(s[1])[0]]}),1===x.length&&(x[1]=x[0]),"right"===e.at[0]?v.left+=p:"center"===e.at[0]&&(v.left+=p/2),"bottom"===e.at[1]?v.top+=m:"center"===e.at[1]&&(v.top+=m/2),a=i(k.at,p,m),v.left+=a[0],v.top+=a[1],this.each(function(){var n,l,c=t(this),u=c.outerWidth(),d=c.outerHeight(),f=s(this,"marginLeft"),_=s(this,"marginTop"),D=u+f+s(this,"marginRight")+w.width,T=d+_+s(this,"marginBottom")+w.height,C=t.extend({},v),M=i(k.my,c.outerWidth(),c.outerHeight());"right"===e.my[0]?C.left-=u:"center"===e.my[0]&&(C.left-=u/2),"bottom"===e.my[1]?C.top-=d:"center"===e.my[1]&&(C.top-=d/2),C.left+=M[0],C.top+=M[1],t.support.offsetFractions||(C.left=h(C.left),C.top=h(C.top)),n={marginLeft:f,marginTop:_},t.each(["left","top"],function(i,s){t.ui.position[x[i]]&&t.ui.position[x[i]][s](C,{targetWidth:p,targetHeight:m,elemWidth:u,elemHeight:d,collisionPosition:n,collisionWidth:D,collisionHeight:T,offset:[a[0]+M[0],a[1]+M[1]],my:e.my,at:e.at,within:y,elem:c})}),e.using&&(l=function(t){var i=g.left-C.left,s=i+p-u,n=g.top-C.top,a=n+m-d,h={target:{element:b,left:g.left,top:g.top,width:p,height:m},element:{element:c,left:C.left,top:C.top,width:u,height:d},horizontal:0>s?"left":i>0?"right":"center",vertical:0>a?"top":n>0?"bottom":"middle"};u>p&&p>r(i+s)&&(h.horizontal="center"),d>m&&m>r(n+a)&&(h.vertical="middle"),h.important=o(r(i),r(s))>o(r(n),r(a))?"horizontal":"vertical",e.using.call(this,t,h)}),c.offset(t.extend(C,{using:l}))})},t.ui.position={fit:{left:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollLeft:s.offset.left,a=s.width,r=t.left-e.collisionPosition.marginLeft,h=n-r,l=r+e.collisionWidth-a-n;e.collisionWidth>a?h>0&&0>=l?(i=t.left+h+e.collisionWidth-a-n,t.left+=h-i):t.left=l>0&&0>=h?n:h>l?n+a-e.collisionWidth:n:h>0?t.left+=h:l>0?t.left-=l:t.left=o(t.left-r,t.left)},top:function(t,e){var i,s=e.within,n=s.isWindow?s.scrollTop:s.offset.top,a=e.within.height,r=t.top-e.collisionPosition.marginTop,h=n-r,l=r+e.collisionHeight-a-n;e.collisionHeight>a?h>0&&0>=l?(i=t.top+h+e.collisionHeight-a-n,t.top+=h-i):t.top=l>0&&0>=h?n:h>l?n+a-e.collisionHeight:n:h>0?t.top+=h:l>0?t.top-=l:t.top=o(t.top-r,t.top)}},flip:{left:function(t,e){var i,s,n=e.within,a=n.offset.left+n.scrollLeft,o=n.width,h=n.isWindow?n.scrollLeft:n.offset.left,l=t.left-e.collisionPosition.marginLeft,c=l-h,u=l+e.collisionWidth-o-h,d="left"===e.my[0]?-e.elemWidth:"right"===e.my[0]?e.elemWidth:0,p="left"===e.at[0]?e.targetWidth:"right"===e.at[0]?-e.targetWidth:0,f=-2*e.offset[0];0>c?(i=t.left+d+p+f+e.collisionWidth-o-a,(0>i||r(c)>i)&&(t.left+=d+p+f)):u>0&&(s=t.left-e.collisionPosition.marginLeft+d+p+f-h,(s>0||u>r(s))&&(t.left+=d+p+f))},top:function(t,e){var i,s,n=e.within,a=n.offset.top+n.scrollTop,o=n.height,h=n.isWindow?n.scrollTop:n.offset.top,l=t.top-e.collisionPosition.marginTop,c=l-h,u=l+e.collisionHeight-o-h,d="top"===e.my[1],p=d?-e.elemHeight:"bottom"===e.my[1]?e.elemHeight:0,f="top"===e.at[1]?e.targetHeight:"bottom"===e.at[1]?-e.targetHeight:0,m=-2*e.offset[1];0>c?(s=t.top+p+f+m+e.collisionHeight-o-a,t.top+p+f+m>c&&(0>s||r(c)>s)&&(t.top+=p+f+m)):u>0&&(i=t.top-e.collisionPosition.marginTop+p+f+m-h,t.top+p+f+m>u&&(i>0||u>r(i))&&(t.top+=p+f+m))}},flipfit:{left:function(){t.ui.position.flip.left.apply(this,arguments),t.ui.position.fit.left.apply(this,arguments)},top:function(){t.ui.position.flip.top.apply(this,arguments),t.ui.position.fit.top.apply(this,arguments)}}},function(){var e,i,s,n,a,o=document.getElementsByTagName("body")[0],r=document.createElement("div");e=document.createElement(o?"div":"body"),s={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},o&&t.extend(s,{position:"absolute",left:"-1000px",top:"-1000px"});for(a in s)e.style[a]=s[a];e.appendChild(r),i=o||document.documentElement,i.insertBefore(e,i.firstChild),r.style.cssText="position: absolute; left: 10.7432222px;",n=t(r).offset().left,t.support.offsetFractions=n>10&&11>n,e.innerHTML="",i.removeChild(e)}()})(jQuery);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e){e.widget("ui.draggable",e.ui.mouse,{version:"1.10.2",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,drag:null,start:null,stop:null},_create:function(){"original"!==this.options.helper||/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},_destroy:function(){this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy()},_mouseCapture:function(t){var i=this.options;return this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0?!1:(this.handle=this._getHandle(t),this.handle?(e(i.iframeFix===!0?"iframe":i.iframeFix).each(function(){e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(e(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(t){var i=this.options;return this.helper=this._createHelper(t),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),i.containment&&this._setContainment(),this._trigger("start",t)===!1?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_mouseDrag:function(t,i){if(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(this._trigger("drag",t,s)===!1)return this._mouseUp({}),!1;this.position=s.position}return this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){var i,s=this,n=!1,a=!1;for(e.ui.ddmanager&&!this.options.dropBehaviour&&(a=e.ui.ddmanager.drop(this,t)),this.dropped&&(a=this.dropped,this.dropped=!1),i=this.element[0];i&&(i=i.parentNode);)i===document&&(n=!0);return n||"original"!==this.options.helper?("invalid"===this.options.revert&&!a||"valid"===this.options.revert&&a||this.options.revert===!0||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,a)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){s._trigger("stop",t)!==!1&&s._clear()}):this._trigger("stop",t)!==!1&&this._clear(),!1):!1},_mouseUp:function(t){return e("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(t){return this.options.handle?!!e(t.target).closest(this.element.find(this.options.handle)).length:!0},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;return s.parents("body").length||s.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s[0]===this.element[0]||/(fixed|absolute)/.test(s.css("position"))||s.css("position","absolute"),s},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();return"absolute"===this.cssPosition&&this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===document.body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.element.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options;if("parent"===n.containment&&(n.containment=this.helper[0].parentNode),("document"===n.containment||"window"===n.containment)&&(this.containment=["document"===n.containment?0:e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,"document"===n.containment?0:e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,("document"===n.containment?0:e(window).scrollLeft())+e("document"===n.containment?document:window).width()-this.helperProportions.width-this.margins.left,("document"===n.containment?0:e(window).scrollTop())+(e("document"===n.containment?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||n.containment.constructor===Array)n.containment.constructor===Array&&(this.containment=n.containment);else{if(i=e(n.containment),s=i[0],!s)return;t="hidden"!==e(s).css("overflow"),this.containment=[(parseInt(e(s).css("borderLeftWidth"),10)||0)+(parseInt(e(s).css("paddingLeft"),10)||0),(parseInt(e(s).css("borderTopWidth"),10)||0)+(parseInt(e(s).css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(e(s).css("borderRightWidth"),10)||0)-(parseInt(e(s).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(e(s).css("borderBottomWidth"),10)||0)-(parseInt(e(s).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=i}},_convertPositionTo:function(t,i){i||(i=this.position);var s="absolute"===t?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(n[0].tagName);return{top:i.top+this.offset.relative.top*s+this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:n.scrollTop())*s,left:i.left+this.offset.relative.left*s+this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:n.scrollLeft())*s}},_generatePosition:function(t){var i,s,n,a,o=this.options,r="absolute"!==this.cssPosition||this.scrollParent[0]!==document&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,h=/(html|body)/i.test(r[0].tagName),l=t.pageX,u=t.pageY;return this.originalPosition&&(this.containment&&(this.relative_container?(s=this.relative_container.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,t.pageX-this.offset.click.left<i[0]&&(l=i[0]+this.offset.click.left),t.pageY-this.offset.click.top<i[1]&&(u=i[1]+this.offset.click.top),t.pageX-this.offset.click.left>i[2]&&(l=i[2]+this.offset.click.left),t.pageY-this.offset.click.top>i[3]&&(u=i[3]+this.offset.click.top)),o.grid&&(n=o.grid[1]?this.originalPageY+Math.round((u-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY,u=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-o.grid[1]:n+o.grid[1]:n,a=o.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX,l=i?a-this.offset.click.left>=i[0]||a-this.offset.click.left>i[2]?a:a-this.offset.click.left>=i[0]?a-o.grid[0]:a+o.grid[0]:a)),{top:u-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():h?0:r.scrollTop()),left:l-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():h?0:r.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(t,i,s){return s=s||this._uiHash(),e.ui.plugin.call(this,t,[i,s]),"drag"===t&&(this.positionAbs=this._convertPositionTo("absolute")),e.Widget.prototype._trigger.call(this,t,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i){var s=e(this).data("ui-draggable"),n=s.options,a=e.extend({},i,{item:s.element});s.sortables=[],e(n.connectToSortable).each(function(){var i=e.data(this,"ui-sortable");i&&!i.options.disabled&&(s.sortables.push({instance:i,shouldRevert:i.options.revert}),i.refreshPositions(),i._trigger("activate",t,a))})},stop:function(t,i){var s=e(this).data("ui-draggable"),n=e.extend({},i,{item:s.element});e.each(s.sortables,function(){this.instance.isOver?(this.instance.isOver=0,s.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=this.shouldRevert),this.instance._mouseStop(t),this.instance.options.helper=this.instance.options._helper,"original"===s.options.helper&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",t,n))})},drag:function(t,i){var s=e(this).data("ui-draggable"),n=this;e.each(s.sortables,function(){var a=!1,o=this;this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,this.instance.offset.click=s.offset.click,this.instance._intersectsWith(this.instance.containerCache)&&(a=!0,e.each(s.sortables,function(){return this.instance.positionAbs=s.positionAbs,this.instance.helperProportions=s.helperProportions,this.instance.offset.click=s.offset.click,this!==o&&this.instance._intersectsWith(this.instance.containerCache)&&e.contains(o.instance.element[0],this.instance.element[0])&&(a=!1),a})),a?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=e(n).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return i.helper[0]},t.target=this.instance.currentItem[0],this.instance._mouseCapture(t,!0),this.instance._mouseStart(t,!0,!0),this.instance.offset.click.top=s.offset.click.top,this.instance.offset.click.left=s.offset.click.left,this.instance.offset.parent.left-=s.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=s.offset.parent.top-this.instance.offset.parent.top,s._trigger("toSortable",t),s.dropped=this.instance.element,s.currentItem=s.element,this.instance.fromOutside=s),this.instance.currentItem&&this.instance._mouseDrag(t)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",t,this.instance._uiHash(this.instance)),this.instance._mouseStop(t,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),s._trigger("fromSortable",t),s.dropped=!1)})}}),e.ui.plugin.add("draggable","cursor",{start:function(){var t=e("body"),i=e(this).data("ui-draggable").options;t.css("cursor")&&(i._cursor=t.css("cursor")),t.css("cursor",i.cursor)},stop:function(){var t=e(this).data("ui-draggable").options;t._cursor&&e("body").css("cursor",t._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i){var s=e(i.helper),n=e(this).data("ui-draggable").options;s.css("opacity")&&(n._opacity=s.css("opacity")),s.css("opacity",n.opacity)},stop:function(t,i){var s=e(this).data("ui-draggable").options;s._opacity&&e(i.helper).css("opacity",s._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(){var t=e(this).data("ui-draggable");t.scrollParent[0]!==document&&"HTML"!==t.scrollParent[0].tagName&&(t.overflowOffset=t.scrollParent.offset())},drag:function(t){var i=e(this).data("ui-draggable"),s=i.options,n=!1;i.scrollParent[0]!==document&&"HTML"!==i.scrollParent[0].tagName?(s.axis&&"x"===s.axis||(i.overflowOffset.top+i.scrollParent[0].offsetHeight-t.pageY<s.scrollSensitivity?i.scrollParent[0].scrollTop=n=i.scrollParent[0].scrollTop+s.scrollSpeed:t.pageY-i.overflowOffset.top<s.scrollSensitivity&&(i.scrollParent[0].scrollTop=n=i.scrollParent[0].scrollTop-s.scrollSpeed)),s.axis&&"y"===s.axis||(i.overflowOffset.left+i.scrollParent[0].offsetWidth-t.pageX<s.scrollSensitivity?i.scrollParent[0].scrollLeft=n=i.scrollParent[0].scrollLeft+s.scrollSpeed:t.pageX-i.overflowOffset.left<s.scrollSensitivity&&(i.scrollParent[0].scrollLeft=n=i.scrollParent[0].scrollLeft-s.scrollSpeed))):(s.axis&&"x"===s.axis||(t.pageY-e(document).scrollTop()<s.scrollSensitivity?n=e(document).scrollTop(e(document).scrollTop()-s.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<s.scrollSensitivity&&(n=e(document).scrollTop(e(document).scrollTop()+s.scrollSpeed))),s.axis&&"y"===s.axis||(t.pageX-e(document).scrollLeft()<s.scrollSensitivity?n=e(document).scrollLeft(e(document).scrollLeft()-s.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<s.scrollSensitivity&&(n=e(document).scrollLeft(e(document).scrollLeft()+s.scrollSpeed)))),n!==!1&&e.ui.ddmanager&&!s.dropBehaviour&&e.ui.ddmanager.prepareOffsets(i,t)}}),e.ui.plugin.add("draggable","snap",{start:function(){var t=e(this).data("ui-draggable"),i=t.options;t.snapElements=[],e(i.snap.constructor!==String?i.snap.items||":data(ui-draggable)":i.snap).each(function(){var i=e(this),s=i.offset();this!==t.element[0]&&t.snapElements.push({item:this,width:i.outerWidth(),height:i.outerHeight(),top:s.top,left:s.left})})},drag:function(t,i){var s,n,a,o,r,h,l,u,c,d,p=e(this).data("ui-draggable"),f=p.options,m=f.snapTolerance,g=i.offset.left,v=g+p.helperProportions.width,y=i.offset.top,b=y+p.helperProportions.height;for(c=p.snapElements.length-1;c>=0;c--)r=p.snapElements[c].left,h=r+p.snapElements[c].width,l=p.snapElements[c].top,u=l+p.snapElements[c].height,g>r-m&&h+m>g&&y>l-m&&u+m>y||g>r-m&&h+m>g&&b>l-m&&u+m>b||v>r-m&&h+m>v&&y>l-m&&u+m>y||v>r-m&&h+m>v&&b>l-m&&u+m>b?("inner"!==f.snapMode&&(s=m>=Math.abs(l-b),n=m>=Math.abs(u-y),a=m>=Math.abs(r-v),o=m>=Math.abs(h-g),s&&(i.position.top=p._convertPositionTo("relative",{top:l-p.helperProportions.height,left:0}).top-p.margins.top),n&&(i.position.top=p._convertPositionTo("relative",{top:u,left:0}).top-p.margins.top),a&&(i.position.left=p._convertPositionTo("relative",{top:0,left:r-p.helperProportions.width}).left-p.margins.left),o&&(i.position.left=p._convertPositionTo("relative",{top:0,left:h}).left-p.margins.left)),d=s||n||a||o,"outer"!==f.snapMode&&(s=m>=Math.abs(l-y),n=m>=Math.abs(u-b),a=m>=Math.abs(r-g),o=m>=Math.abs(h-v),s&&(i.position.top=p._convertPositionTo("relative",{top:l,left:0}).top-p.margins.top),n&&(i.position.top=p._convertPositionTo("relative",{top:u-p.helperProportions.height,left:0}).top-p.margins.top),a&&(i.position.left=p._convertPositionTo("relative",{top:0,left:r}).left-p.margins.left),o&&(i.position.left=p._convertPositionTo("relative",{top:0,left:h-p.helperProportions.width}).left-p.margins.left)),!p.snapElements[c].snapping&&(s||n||a||o||d)&&p.options.snap.snap&&p.options.snap.snap.call(p.element,t,e.extend(p._uiHash(),{snapItem:p.snapElements[c].item})),p.snapElements[c].snapping=s||n||a||o||d):(p.snapElements[c].snapping&&p.options.snap.release&&p.options.snap.release.call(p.element,t,e.extend(p._uiHash(),{snapItem:p.snapElements[c].item})),p.snapElements[c].snapping=!1)}}),e.ui.plugin.add("draggable","stack",{start:function(){var t,i=this.data("ui-draggable").options,s=e.makeArray(e(i.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});s.length&&(t=parseInt(e(s[0]).css("zIndex"),10)||0,e(s).each(function(i){e(this).css("zIndex",t+i)}),this.css("zIndex",t+s.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i){var s=e(i.helper),n=e(this).data("ui-draggable").options;s.css("zIndex")&&(n._zIndex=s.css("zIndex")),s.css("zIndex",n.zIndex)},stop:function(t,i){var s=e(this).data("ui-draggable").options;s._zIndex&&e(i.helper).css("zIndex",s._zIndex)}})})(jQuery);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e){function t(e){return parseInt(e,10)||0}function i(e){return!isNaN(parseInt(e,10))}e.widget("ui.resizable",e.ui.mouse,{version:"1.10.2",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:90,resize:null,start:null,stop:null},_create:function(){var t,i,s,n,a,o=this,r=this.options;if(this.element.addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!r.aspectRatio,aspectRatio:r.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:r.helper||r.ghost||r.animate?r.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.data("ui-resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=r.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),t=this.handles.split(","),this.handles={},i=0;t.length>i;i++)s=e.trim(t[i]),a="ui-resizable-"+s,n=e("<div class='ui-resizable-handle "+a+"'></div>"),n.css({zIndex:r.zIndex}),"se"===s&&n.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[s]=".ui-resizable-"+s,this.element.append(n);this._renderAxis=function(t){var i,s,n,a;t=t||this.element;for(i in this.handles)this.handles[i].constructor===String&&(this.handles[i]=e(this.handles[i],this.element).show()),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)&&(s=e(this.handles[i],this.element),a=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),t.css(n,a),this._proportionallyResize()),e(this.handles[i]).length},this._renderAxis(this.element),this._handles=e(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){o.resizing||(this.className&&(n=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),o.axis=n&&n[1]?n[1]:"se")}),r.autoHide&&(this._handles.hide(),e(this.element).addClass("ui-resizable-autohide").mouseenter(function(){r.disabled||(e(this).removeClass("ui-resizable-autohide"),o._handles.show())}).mouseleave(function(){r.disabled||o.resizing||(e(this).addClass("ui-resizable-autohide"),o._handles.hide())})),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t,i=function(t){e(t).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};return this.elementIsWrapper&&(i(this.element),t=this.element,this.originalElement.css({position:t.css("position"),width:t.outerWidth(),height:t.outerHeight(),top:t.css("top"),left:t.css("left")}).insertAfter(t),t.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_mouseCapture:function(t){var i,s,n=!1;for(i in this.handles)s=e(this.handles[i])[0],(s===t.target||e.contains(s,t.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(i){var s,n,a,o=this.options,r=this.element.position(),h=this.element;return this.resizing=!0,/absolute/.test(h.css("position"))?h.css({position:"absolute",top:h.css("top"),left:h.css("left")}):h.is(".ui-draggable")&&h.css({position:"absolute",top:r.top,left:r.left}),this._renderProxy(),s=t(this.helper.css("left")),n=t(this.helper.css("top")),o.containment&&(s+=e(o.containment).scrollLeft()||0,n+=e(o.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:s,top:n},this.size=this._helper?{width:h.outerWidth(),height:h.outerHeight()}:{width:h.width(),height:h.height()},this.originalSize=this._helper?{width:h.outerWidth(),height:h.outerHeight()}:{width:h.width(),height:h.height()},this.originalPosition={left:s,top:n},this.sizeDiff={width:h.outerWidth()-h.width(),height:h.outerHeight()-h.height()},this.originalMousePosition={left:i.pageX,top:i.pageY},this.aspectRatio="number"==typeof o.aspectRatio?o.aspectRatio:this.originalSize.width/this.originalSize.height||1,a=e(".ui-resizable-"+this.axis).css("cursor"),e("body").css("cursor","auto"===a?this.axis+"-resize":a),h.addClass("ui-resizable-resizing"),this._propagate("start",i),!0},_mouseDrag:function(t){var i,s=this.helper,n={},a=this.originalMousePosition,o=this.axis,r=this.position.top,h=this.position.left,l=this.size.width,u=this.size.height,c=t.pageX-a.left||0,d=t.pageY-a.top||0,p=this._change[o];return p?(i=p.apply(this,[t,c,d]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(i=this._updateRatio(i,t)),i=this._respectSize(i,t),this._updateCache(i),this._propagate("resize",t),this.position.top!==r&&(n.top=this.position.top+"px"),this.position.left!==h&&(n.left=this.position.left+"px"),this.size.width!==l&&(n.width=this.size.width+"px"),this.size.height!==u&&(n.height=this.size.height+"px"),s.css(n),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),e.isEmptyObject(n)||this._trigger("resize",t,this.ui()),!1):!1},_mouseStop:function(t){this.resizing=!1;var i,s,n,a,o,r,h,l=this.options,u=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&e.ui.hasScroll(i[0],"left")?0:u.sizeDiff.height,a=s?0:u.sizeDiff.width,o={width:u.helper.width()-a,height:u.helper.height()-n},r=parseInt(u.element.css("left"),10)+(u.position.left-u.originalPosition.left)||null,h=parseInt(u.element.css("top"),10)+(u.position.top-u.originalPosition.top)||null,l.animate||this.element.css(e.extend(o,{top:h,left:r})),u.helper.height(u.size.height),u.helper.width(u.size.width),this._helper&&!l.animate&&this._proportionallyResize()),e("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(e){var t,s,n,a,o,r=this.options;o={minWidth:i(r.minWidth)?r.minWidth:0,maxWidth:i(r.maxWidth)?r.maxWidth:1/0,minHeight:i(r.minHeight)?r.minHeight:0,maxHeight:i(r.maxHeight)?r.maxHeight:1/0},(this._aspectRatio||e)&&(t=o.minHeight*this.aspectRatio,n=o.minWidth/this.aspectRatio,s=o.maxHeight*this.aspectRatio,a=o.maxWidth/this.aspectRatio,t>o.minWidth&&(o.minWidth=t),n>o.minHeight&&(o.minHeight=n),o.maxWidth>s&&(o.maxWidth=s),o.maxHeight>a&&(o.maxHeight=a)),this._vBoundaries=o},_updateCache:function(e){this.offset=this.helper.offset(),i(e.left)&&(this.position.left=e.left),i(e.top)&&(this.position.top=e.top),i(e.height)&&(this.size.height=e.height),i(e.width)&&(this.size.width=e.width)},_updateRatio:function(e){var t=this.position,s=this.size,n=this.axis;return i(e.height)?e.width=e.height*this.aspectRatio:i(e.width)&&(e.height=e.width/this.aspectRatio),"sw"===n&&(e.left=t.left+(s.width-e.width),e.top=null),"nw"===n&&(e.top=t.top+(s.height-e.height),e.left=t.left+(s.width-e.width)),e},_respectSize:function(e){var t=this._vBoundaries,s=this.axis,n=i(e.width)&&t.maxWidth&&t.maxWidth<e.width,a=i(e.height)&&t.maxHeight&&t.maxHeight<e.height,o=i(e.width)&&t.minWidth&&t.minWidth>e.width,r=i(e.height)&&t.minHeight&&t.minHeight>e.height,h=this.originalPosition.left+this.originalSize.width,l=this.position.top+this.size.height,u=/sw|nw|w/.test(s),c=/nw|ne|n/.test(s);return o&&(e.width=t.minWidth),r&&(e.height=t.minHeight),n&&(e.width=t.maxWidth),a&&(e.height=t.maxHeight),o&&u&&(e.left=h-t.minWidth),n&&u&&(e.left=h-t.maxWidth),r&&c&&(e.top=l-t.minHeight),a&&c&&(e.top=l-t.maxHeight),e.width||e.height||e.left||!e.top?e.width||e.height||e.top||!e.left||(e.left=null):e.top=null,e},_proportionallyResize:function(){if(this._proportionallyResizeElements.length){var e,t,i,s,n,a=this.helper||this.element;for(e=0;this._proportionallyResizeElements.length>e;e++){if(n=this._proportionallyResizeElements[e],!this.borderDif)for(this.borderDif=[],i=[n.css("borderTopWidth"),n.css("borderRightWidth"),n.css("borderBottomWidth"),n.css("borderLeftWidth")],s=[n.css("paddingTop"),n.css("paddingRight"),n.css("paddingBottom"),n.css("paddingLeft")],t=0;i.length>t;t++)this.borderDif[t]=(parseInt(i[t],10)||0)+(parseInt(s[t],10)||0);n.css({height:a.height()-this.borderDif[0]-this.borderDif[2]||0,width:a.width()-this.borderDif[1]-this.borderDif[3]||0})}}},_renderProxy:function(){var t=this.element,i=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||e("<div style='overflow:hidden;'></div>"),this.helper.addClass(this._helper).css({width:this.element.outerWidth()-1,height:this.element.outerHeight()-1,position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(e,t){return{width:this.originalSize.width+t}},w:function(e,t){var i=this.originalSize,s=this.originalPosition;return{left:s.left+t,width:i.width-t}},n:function(e,t,i){var s=this.originalSize,n=this.originalPosition;return{top:n.top+i,height:s.height-i}},s:function(e,t,i){return{height:this.originalSize.height+i}},se:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},sw:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,i,s]))},ne:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},nw:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,i,s]))}},_propagate:function(t,i){e.ui.plugin.call(this,t,[i,this.ui()]),"resize"!==t&&this._trigger(t,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),e.ui.plugin.add("resizable","animate",{stop:function(t){var i=e(this).data("ui-resizable"),s=i.options,n=i._proportionallyResizeElements,a=n.length&&/textarea/i.test(n[0].nodeName),o=a&&e.ui.hasScroll(n[0],"left")?0:i.sizeDiff.height,r=a?0:i.sizeDiff.width,h={width:i.size.width-r,height:i.size.height-o},l=parseInt(i.element.css("left"),10)+(i.position.left-i.originalPosition.left)||null,u=parseInt(i.element.css("top"),10)+(i.position.top-i.originalPosition.top)||null;i.element.animate(e.extend(h,u&&l?{top:u,left:l}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseInt(i.element.css("width"),10),height:parseInt(i.element.css("height"),10),top:parseInt(i.element.css("top"),10),left:parseInt(i.element.css("left"),10)};n&&n.length&&e(n[0]).css({width:s.width,height:s.height}),i._updateCache(s),i._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(){var i,s,n,a,o,r,h,l=e(this).data("ui-resizable"),u=l.options,c=l.element,d=u.containment,p=d instanceof e?d.get(0):/parent/.test(d)?c.parent().get(0):d;p&&(l.containerElement=e(p),/document/.test(d)||d===document?(l.containerOffset={left:0,top:0},l.containerPosition={left:0,top:0},l.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}):(i=e(p),s=[],e(["Top","Right","Left","Bottom"]).each(function(e,n){s[e]=t(i.css("padding"+n))}),l.containerOffset=i.offset(),l.containerPosition=i.position(),l.containerSize={height:i.innerHeight()-s[3],width:i.innerWidth()-s[1]},n=l.containerOffset,a=l.containerSize.height,o=l.containerSize.width,r=e.ui.hasScroll(p,"left")?p.scrollWidth:o,h=e.ui.hasScroll(p)?p.scrollHeight:a,l.parentData={element:p,left:n.left,top:n.top,width:r,height:h}))},resize:function(t){var i,s,n,a,o=e(this).data("ui-resizable"),r=o.options,h=o.containerOffset,l=o.position,u=o._aspectRatio||t.shiftKey,c={top:0,left:0},d=o.containerElement;d[0]!==document&&/static/.test(d.css("position"))&&(c=h),l.left<(o._helper?h.left:0)&&(o.size.width=o.size.width+(o._helper?o.position.left-h.left:o.position.left-c.left),u&&(o.size.height=o.size.width/o.aspectRatio),o.position.left=r.helper?h.left:0),l.top<(o._helper?h.top:0)&&(o.size.height=o.size.height+(o._helper?o.position.top-h.top:o.position.top),u&&(o.size.width=o.size.height*o.aspectRatio),o.position.top=o._helper?h.top:0),o.offset.left=o.parentData.left+o.position.left,o.offset.top=o.parentData.top+o.position.top,i=Math.abs((o._helper?o.offset.left-c.left:o.offset.left-c.left)+o.sizeDiff.width),s=Math.abs((o._helper?o.offset.top-c.top:o.offset.top-h.top)+o.sizeDiff.height),n=o.containerElement.get(0)===o.element.parent().get(0),a=/relative|absolute/.test(o.containerElement.css("position")),n&&a&&(i-=o.parentData.left),i+o.size.width>=o.parentData.width&&(o.size.width=o.parentData.width-i,u&&(o.size.height=o.size.width/o.aspectRatio)),s+o.size.height>=o.parentData.height&&(o.size.height=o.parentData.height-s,u&&(o.size.width=o.size.height*o.aspectRatio))},stop:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.containerOffset,n=t.containerPosition,a=t.containerElement,o=e(t.helper),r=o.offset(),h=o.outerWidth()-t.sizeDiff.width,l=o.outerHeight()-t.sizeDiff.height;t._helper&&!i.animate&&/relative/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l}),t._helper&&!i.animate&&/static/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:h,height:l})}}),e.ui.plugin.add("resizable","alsoResize",{start:function(){var t=e(this).data("ui-resizable"),i=t.options,s=function(t){e(t).each(function(){var t=e(this);t.data("ui-resizable-alsoresize",{width:parseInt(t.width(),10),height:parseInt(t.height(),10),left:parseInt(t.css("left"),10),top:parseInt(t.css("top"),10)})})};"object"!=typeof i.alsoResize||i.alsoResize.parentNode?s(i.alsoResize):i.alsoResize.length?(i.alsoResize=i.alsoResize[0],s(i.alsoResize)):e.each(i.alsoResize,function(e){s(e)})},resize:function(t,i){var s=e(this).data("ui-resizable"),n=s.options,a=s.originalSize,o=s.originalPosition,r={height:s.size.height-a.height||0,width:s.size.width-a.width||0,top:s.position.top-o.top||0,left:s.position.left-o.left||0},h=function(t,s){e(t).each(function(){var t=e(this),n=e(this).data("ui-resizable-alsoresize"),a={},o=s&&s.length?s:t.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(o,function(e,t){var i=(n[t]||0)+(r[t]||0);i&&i>=0&&(a[t]=i||null)}),t.css(a)})};"object"!=typeof n.alsoResize||n.alsoResize.nodeType?h(n.alsoResize):e.each(n.alsoResize,function(e,t){h(e,t)})},stop:function(){e(this).removeData("resizable-alsoresize")}}),e.ui.plugin.add("resizable","ghost",{start:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:s.height,width:s.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass("string"==typeof i.ghost?i.ghost:""),t.ghost.appendTo(t.helper)},resize:function(){var t=e(this).data("ui-resizable");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=e(this).data("ui-resizable");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(){var t=e(this).data("ui-resizable"),i=t.options,s=t.size,n=t.originalSize,a=t.originalPosition,o=t.axis,r="number"==typeof i.grid?[i.grid,i.grid]:i.grid,h=r[0]||1,l=r[1]||1,u=Math.round((s.width-n.width)/h)*h,c=Math.round((s.height-n.height)/l)*l,d=n.width+u,p=n.height+c,f=i.maxWidth&&d>i.maxWidth,m=i.maxHeight&&p>i.maxHeight,g=i.minWidth&&i.minWidth>d,v=i.minHeight&&i.minHeight>p;i.grid=r,g&&(d+=h),v&&(p+=l),f&&(d-=h),m&&(p-=l),/^(se|s|e)$/.test(o)?(t.size.width=d,t.size.height=p):/^(ne)$/.test(o)?(t.size.width=d,t.size.height=p,t.position.top=a.top-c):/^(sw)$/.test(o)?(t.size.width=d,t.size.height=p,t.position.left=a.left-u):(t.size.width=d,t.size.height=p,t.position.top=a.top-c,t.position.left=a.left-u)}})})(jQuery);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(e){var t=0;e.widget("ui.autocomplete",{version:"1.10.2",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,change:null,close:null,focus:null,open:null,response:null,search:null,select:null},pending:0,_create:function(){var t,i,s,n=this.element[0].nodeName.toLowerCase(),a="textarea"===n,o="input"===n;this.isMultiLine=a?!0:o?!1:this.element.prop("isContentEditable"),this.valueMethod=this.element[a||o?"val":"text"],this.isNewMenu=!0,this.element.addClass("ui-autocomplete-input").attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return t=!0,s=!0,i=!0,undefined;t=!1,s=!1,i=!1;var a=e.ui.keyCode;switch(n.keyCode){case a.PAGE_UP:t=!0,this._move("previousPage",n);break;case a.PAGE_DOWN:t=!0,this._move("nextPage",n);break;case a.UP:t=!0,this._keyEvent("previous",n);break;case a.DOWN:t=!0,this._keyEvent("next",n);break;case a.ENTER:case a.NUMPAD_ENTER:this.menu.active&&(t=!0,n.preventDefault(),this.menu.select(n));break;case a.TAB:this.menu.active&&this.menu.select(n);break;case a.ESCAPE:this.menu.element.is(":visible")&&(this._value(this.term),this.close(n),n.preventDefault());break;default:i=!0,this._searchTimeout(n)}},keypress:function(s){if(t)return t=!1,s.preventDefault(),undefined;if(!i){var n=e.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(e){return s?(s=!1,e.preventDefault(),undefined):(this._searchTimeout(e),undefined)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){return this.cancelBlur?(delete this.cancelBlur,undefined):(clearTimeout(this.searching),this.close(e),this._change(e),undefined)}}),this._initSource(),this.menu=e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({input:e(),role:null}).hide().data("ui-menu"),this._on(this.menu.element,{mousedown:function(t){t.preventDefault(),this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur});var i=this.menu.element[0];e(t.target).closest(".ui-menu-item").length||this._delay(function(){var t=this;this.document.one("mousedown",function(s){s.target===t.element[0]||s.target===i||e.contains(i,s.target)||t.close()})})},menufocus:function(t,i){if(this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type)))return this.menu.blur(),this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)}),undefined;var s=i.item.data("ui-autocomplete-item");!1!==this._trigger("focus",t,{item:s})?t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(s.value):this.liveRegion.text(s.value)},menuselect:function(e,t){var i=t.item.data("ui-autocomplete-item"),s=this.previous;this.element[0]!==this.document[0].activeElement&&(this.element.focus(),this.previous=s,this._delay(function(){this.previous=s,this.selectedItem=i})),!1!==this._trigger("select",e,{item:i})&&this._value(i.value),this.term=this._value(),this.close(e),this.selectedItem=i}}),this.liveRegion=e("<span>",{role:"status","aria-live":"polite"}).addClass("ui-helper-hidden-accessible").insertAfter(this.element),this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t||(t=this.element.closest(".ui-front")),t.length||(t=this.document[0].body),t},_initSource:function(){var t,i,s=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(i,s){s(e.ui.autocomplete.filter(t,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(t,n){s.xhr&&s.xhr.abort(),s.xhr=e.ajax({url:i,data:t,dataType:"json",success:function(e){n(e)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){this.term!==this._value()&&(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):this._trigger("search",t)!==!1?this._search(e):undefined},_search:function(e){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var e=this,i=++t;return function(s){i===t&&e.__response(s),e.pending--,e.pending||e.element.removeClass("ui-autocomplete-loading")}},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return"string"==typeof t?{label:t,value:t}:e.extend({label:t.label||t.value,value:t.value||t.label},t)})},_suggest:function(t){var i=this.menu.element.empty();this._renderMenu(i,t),this.isNewMenu=!0,this.menu.refresh(),i.show(),this._resizeMenu(),i.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next()},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,i){var s=this;e.each(i,function(e,i){s._renderItemData(t,i)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,i){return e("<li>").append(e("<a>").text(i.label)).appendTo(t)},_move:function(e,t){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this._value(this.term),this.menu.blur(),undefined):(this.menu[e](t),undefined):(this.search(null,t),undefined)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){(!this.isMultiLine||this.menu.element.is(":visible"))&&(this._move(e,t),t.preventDefault())}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,i){var s=RegExp(e.ui.autocomplete.escapeRegex(i),"i");return e.grep(t,function(e){return s.test(e.label||e.value||e)})}}),e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(e){var t;this._superApply(arguments),this.options.disabled||this.cancelSearch||(t=e&&e.length?this.options.messages.results(e.length):this.options.messages.noResults,this.liveRegion.text(t))}})})(jQuery);/*! jQuery UI - button v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t){var e,i,s,n,a="ui-button ui-widget ui-state-default ui-corner-all",o="ui-state-hover ui-state-active ",r="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",h=function(){var e=t(this).find(":ui-button");setTimeout(function(){e.button("refresh")},1)},l=function(e){var i=e.name,s=e.form,n=t([]);return i&&(i=i.replace(/'/g,"\\'"),n=s?t(s).find("[name='"+i+"']"):t("[name='"+i+"']",e.ownerDocument).filter(function(){return!this.form})),n};t.widget("ui.button",{version:"1.10.2",defaultElement:"<button>",options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset"+this.eventNamespace).bind("reset"+this.eventNamespace,h),"boolean"!=typeof this.options.disabled?this.options.disabled=!!this.element.prop("disabled"):this.element.prop("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var o=this,r=this.options,c="checkbox"===this.type||"radio"===this.type,u=c?"":"ui-state-active",d="ui-state-focus";null===r.label&&(r.label="input"===this.type?this.buttonElement.val():this.buttonElement.html()),this._hoverable(this.buttonElement),this.buttonElement.addClass(a).attr("role","button").bind("mouseenter"+this.eventNamespace,function(){r.disabled||this===e&&t(this).addClass("ui-state-active")}).bind("mouseleave"+this.eventNamespace,function(){r.disabled||t(this).removeClass(u)}).bind("click"+this.eventNamespace,function(t){r.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}),this.element.bind("focus"+this.eventNamespace,function(){o.buttonElement.addClass(d)}).bind("blur"+this.eventNamespace,function(){o.buttonElement.removeClass(d)}),c&&(this.element.bind("change"+this.eventNamespace,function(){n||o.refresh()}),this.buttonElement.bind("mousedown"+this.eventNamespace,function(t){r.disabled||(n=!1,i=t.pageX,s=t.pageY)}).bind("mouseup"+this.eventNamespace,function(t){r.disabled||(i!==t.pageX||s!==t.pageY)&&(n=!0)})),"checkbox"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){return r.disabled||n?!1:undefined}):"radio"===this.type?this.buttonElement.bind("click"+this.eventNamespace,function(){if(r.disabled||n)return!1;t(this).addClass("ui-state-active"),o.buttonElement.attr("aria-pressed","true");var e=o.element[0];l(e).not(e).map(function(){return t(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown"+this.eventNamespace,function(){return r.disabled?!1:(t(this).addClass("ui-state-active"),e=this,o.document.one("mouseup",function(){e=null}),undefined)}).bind("mouseup"+this.eventNamespace,function(){return r.disabled?!1:(t(this).removeClass("ui-state-active"),undefined)}).bind("keydown"+this.eventNamespace,function(e){return r.disabled?!1:((e.keyCode===t.ui.keyCode.SPACE||e.keyCode===t.ui.keyCode.ENTER)&&t(this).addClass("ui-state-active"),undefined)}).bind("keyup"+this.eventNamespace+" blur"+this.eventNamespace,function(){t(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(e){e.keyCode===t.ui.keyCode.SPACE&&t(this).click()})),this._setOption("disabled",r.disabled),this._resetButton()},_determineButtonType:function(){var t,e,i;this.type=this.element.is("[type=checkbox]")?"checkbox":this.element.is("[type=radio]")?"radio":this.element.is("input")?"input":"button","checkbox"===this.type||"radio"===this.type?(t=this.element.parents().last(),e="label[for='"+this.element.attr("id")+"']",this.buttonElement=t.find(e),this.buttonElement.length||(t=t.length?t.siblings():this.element.siblings(),this.buttonElement=t.filter(e),this.buttonElement.length||(this.buttonElement=t.find(e))),this.element.addClass("ui-helper-hidden-accessible"),i=this.element.is(":checked"),i&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.prop("aria-pressed",i)):this.buttonElement=this.element},widget:function(){return this.buttonElement},_destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(a+" "+o+" "+r).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title")},_setOption:function(t,e){return this._super(t,e),"disabled"===t?(e?this.element.prop("disabled",!0):this.element.prop("disabled",!1),undefined):(this._resetButton(),undefined)},refresh:function(){var e=this.element.is("input, button")?this.element.is(":disabled"):this.element.hasClass("ui-button-disabled");e!==this.options.disabled&&this._setOption("disabled",e),"radio"===this.type?l(this.element[0]).each(function(){t(this).is(":checked")?t(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):t(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):"checkbox"===this.type&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if("input"===this.type)return this.options.label&&this.element.val(this.options.label),undefined;var e=this.buttonElement.removeClass(r),i=t("<span></span>",this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(e.empty()).text(),s=this.options.icons,n=s.primary&&s.secondary,a=[];s.primary||s.secondary?(this.options.text&&a.push("ui-button-text-icon"+(n?"s":s.primary?"-primary":"-secondary")),s.primary&&e.prepend("<span class='ui-button-icon-primary ui-icon "+s.primary+"'></span>"),s.secondary&&e.append("<span class='ui-button-icon-secondary ui-icon "+s.secondary+"'></span>"),this.options.text||(a.push(n?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||e.attr("title",t.trim(i)))):a.push("ui-button-text-only"),e.addClass(a.join(" "))}}),t.widget("ui.buttonset",{version:"1.10.2",options:{items:"button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(t,e){"disabled"===t&&this.buttons.button("option",t,e),this._super(t,e)},refresh:function(){var e="rtl"===this.element.css("direction");this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return t(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(e?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(e?"ui-corner-left":"ui-corner-right").end().end()},_destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return t(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy")}})})(jQuery);/*! jQuery UI dialog - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t){var e={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},i={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0};t.widget("ui.dialog",{version:"1.10.2",options:{appendTo:"body",autoOpen:!0,buttons:[],closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",using:function(e){var i=t(this).css(e).offset().top;0>i&&t(this).css("top",e.top-i)}},resizable:!0,show:null,title:null,width:300,beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),this.options.title=this.options.title||this.originalTitle,this._createWrapper(),this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&t.fn.draggable&&this._makeDraggable(),this.options.resizable&&t.fn.resizable&&this._makeResizable(),this._isOpen=!1},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var e=this.options.appendTo;return e&&(e.jquery||e.nodeType)?t(e):this.document.find(e||"body").eq(0)},_destroy:function(){var t,e=this.originalPosition;this._destroyOverlay(),this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),this.uiDialog.stop(!0,!0).remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),t=e.parent.children().eq(e.index),t.length&&t[0]!==this.element[0]?t.before(this.element):e.parent.append(this.element)},widget:function(){return this.uiDialog},disable:t.noop,enable:t.noop,close:function(e){var i=this;this._isOpen&&this._trigger("beforeClose",e)!==!1&&(this._isOpen=!1,this._destroyOverlay(),this.opener.filter(":focusable").focus().length||t(this.document[0].activeElement).blur(),this._hide(this.uiDialog,this.options.hide,function(){i._trigger("close",e)}))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(t,e){var i=!!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;return i&&!e&&this._trigger("focus",t),i},open:function(){var e=this;return this._isOpen?(this._moveToTop()&&this._focusTabbable(),undefined):(this._isOpen=!0,this.opener=t(this.document[0].activeElement),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),this._show(this.uiDialog,this.options.show,function(){e._focusTabbable(),e._trigger("focus")}),this._trigger("open"),undefined)},_focusTabbable:function(){var t=this.element.find("[autofocus]");t.length||(t=this.element.find(":tabbable")),t.length||(t=this.uiDialogButtonPane.find(":tabbable")),t.length||(t=this.uiDialogTitlebarClose.filter(":tabbable")),t.length||(t=this.uiDialog),t.eq(0).focus()},_keepFocus:function(e){function i(){var e=this.document[0].activeElement,i=this.uiDialog[0]===e||t.contains(this.uiDialog[0],e);i||this._focusTabbable()}e.preventDefault(),i.call(this),this._delay(i)},_createWrapper:function(){this.uiDialog=t("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front "+this.options.dialogClass).hide().attr({tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._on(this.uiDialog,{keydown:function(e){if(this.options.closeOnEscape&&!e.isDefaultPrevented()&&e.keyCode&&e.keyCode===t.ui.keyCode.ESCAPE)return e.preventDefault(),this.close(e),undefined;if(e.keyCode===t.ui.keyCode.TAB){var i=this.uiDialog.find(":tabbable"),s=i.filter(":first"),n=i.filter(":last");e.target!==n[0]&&e.target!==this.uiDialog[0]||e.shiftKey?e.target!==s[0]&&e.target!==this.uiDialog[0]||!e.shiftKey||(n.focus(1),e.preventDefault()):(s.focus(1),e.preventDefault())}},mousedown:function(t){this._moveToTop(t)&&this._focusTabbable()}}),this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var e;this.uiDialogTitlebar=t("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),this._on(this.uiDialogTitlebar,{mousedown:function(e){t(e.target).closest(".ui-dialog-titlebar-close")||this.uiDialog.focus()}}),this.uiDialogTitlebarClose=t("<button></button>").button({label:this.options.closeText,icons:{primary:"ui-icon-closethick"},text:!1}).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),this._on(this.uiDialogTitlebarClose,{click:function(t){t.preventDefault(),this.close(t)}}),e=t("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),this._title(e),this.uiDialog.attr({"aria-labelledby":e.attr("id")})},_title:function(t){this.options.title||t.html("&#160;"),t.text(this.options.title)},_createButtonPane:function(){this.uiDialogButtonPane=t("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),this.uiButtonSet=t("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),this._createButtons()},_createButtons:function(){var e=this,i=this.options.buttons;return this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),t.isEmptyObject(i)||t.isArray(i)&&!i.length?(this.uiDialog.removeClass("ui-dialog-buttons"),undefined):(t.each(i,function(i,s){var n,a;s=t.isFunction(s)?{click:s,text:i}:s,s=t.extend({type:"button"},s),n=s.click,s.click=function(){n.apply(e.element[0],arguments)},a={icons:s.icons,text:s.showText},delete s.icons,delete s.showText,t("<button></button>",s).button(a).appendTo(e.uiButtonSet)}),this.uiDialog.addClass("ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog),undefined)},_makeDraggable:function(){function e(t){return{position:t.position,offset:t.offset}}var i=this,s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(s,n){t(this).addClass("ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",s,e(n))},drag:function(t,s){i._trigger("drag",t,e(s))},stop:function(n,a){s.position=[a.position.left-i.document.scrollLeft(),a.position.top-i.document.scrollTop()],t(this).removeClass("ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",n,e(a))}})},_makeResizable:function(){function e(t){return{originalPosition:t.originalPosition,originalSize:t.originalSize,position:t.position,size:t.size}}var i=this,s=this.options,n=s.resizable,a=this.uiDialog.css("position"),o="string"==typeof n?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:s.maxWidth,maxHeight:s.maxHeight,minWidth:s.minWidth,minHeight:this._minHeight(),handles:o,start:function(s,n){t(this).addClass("ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",s,e(n))},resize:function(t,s){i._trigger("resize",t,e(s))},stop:function(n,a){s.height=t(this).height(),s.width=t(this).width(),t(this).removeClass("ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",n,e(a))}}).css("position",a)},_minHeight:function(){var t=this.options;return"auto"===t.height?t.minHeight:Math.min(t.minHeight,t.height)},_position:function(){var t=this.uiDialog.is(":visible");t||this.uiDialog.show(),this.uiDialog.position(this.options.position),t||this.uiDialog.hide()},_setOptions:function(s){var n=this,a=!1,o={};t.each(s,function(t,s){n._setOption(t,s),t in e&&(a=!0),t in i&&(o[t]=s)}),a&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",o)},_setOption:function(t,e){var i,s,n=this.uiDialog;"dialogClass"===t&&n.removeClass(this.options.dialogClass).addClass(e),"disabled"!==t&&(this._super(t,e),"appendTo"===t&&this.uiDialog.appendTo(this._appendTo()),"buttons"===t&&this._createButtons(),"closeText"===t&&this.uiDialogTitlebarClose.button({label:""+e}),"draggable"===t&&(i=n.is(":data(ui-draggable)"),i&&!e&&n.draggable("destroy"),!i&&e&&this._makeDraggable()),"position"===t&&this._position(),"resizable"===t&&(s=n.is(":data(ui-resizable)"),s&&!e&&n.resizable("destroy"),s&&"string"==typeof e&&n.resizable("option","handles",e),s||e===!1||this._makeResizable()),"title"===t&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){var t,e,i,s=this.options;this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),t=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),e=Math.max(0,s.minHeight-t),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-t):"none","auto"===s.height?this.element.css({minHeight:e,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-t)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var e=t(this);return t("<div>").css({position:"absolute",width:e.outerWidth(),height:e.outerHeight()}).appendTo(e.parent()).offset(e.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(e){return t(e.target).closest(".ui-dialog").length?!0:!!t(e.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){var e=this,i=this.widgetFullName;t.ui.dialog.overlayInstances||this._delay(function(){t.ui.dialog.overlayInstances&&this.document.bind("focusin.dialog",function(s){e._allowInteraction(s)||(s.preventDefault(),t(".ui-dialog:visible:last .ui-dialog-content").data(i)._focusTabbable())})}),this.overlay=t("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),this._on(this.overlay,{mousedown:"_keepFocus"}),t.ui.dialog.overlayInstances++}},_destroyOverlay:function(){this.options.modal&&this.overlay&&(t.ui.dialog.overlayInstances--,t.ui.dialog.overlayInstances||this.document.unbind("focusin.dialog"),this.overlay.remove(),this.overlay=null)}}),t.ui.dialog.overlayInstances=0,t.uiBackCompat!==!1&&t.widget("ui.dialog",t.ui.dialog,{_position:function(){var e,i=this.options.position,s=[],n=[0,0];i?(("string"==typeof i||"object"==typeof i&&"0"in i)&&(s=i.split?i.split(" "):[i[0],i[1]],1===s.length&&(s[1]=s[0]),t.each(["left","top"],function(t,e){+s[t]===s[t]&&(n[t]=s[t],s[t]=e)}),i={my:s[0]+(0>n[0]?n[0]:"+"+n[0])+" "+s[1]+(0>n[1]?n[1]:"+"+n[1]),at:s.join(" ")}),i=t.extend({},t.ui.dialog.prototype.options.position,i)):i=t.ui.dialog.prototype.options.position,e=this.uiDialog.is(":visible"),e||this.uiDialog.show(),this.uiDialog.position(i),e||this.uiDialog.hide()}})})(jQuery);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t){var e=5;t.widget("ui.slider",t.ui.mouse,{version:"1.10.2",widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"),this._refresh(),this._setOption("disabled",this.options.disabled),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var e,i,s=this.options,n=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),a="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",o=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),e=n.length;i>e;e++)o.push(a);this.handles=n.add(t(o.join("")).appendTo(this.element)),this.handle=this.handles.eq(0),this.handles.each(function(e){t(this).data("ui-slider-handle-index",e)})},_createRange:function(){var e=this.options,i="";e.range?(e.range===!0&&(e.values?e.values.length&&2!==e.values.length?e.values=[e.values[0],e.values[0]]:t.isArray(e.values)&&(e.values=e.values.slice(0)):e.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({left:"",bottom:""}):(this.range=t("<div></div>").appendTo(this.element),i="ui-slider-range ui-widget-header ui-corner-all"),this.range.addClass(i+("min"===e.range||"max"===e.range?" ui-slider-range-"+e.range:""))):this.range=t([])},_setupEvents:function(){var t=this.handles.add(this.range).filter("a");this._off(t),this._on(t,this._handleEvents),this._hoverable(t),this._focusable(t)},_destroy:function(){this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),this._mouseDestroy()},_mouseCapture:function(e){var i,s,n,a,o,r,h,l,u=this,c=this.options;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:e.pageX,y:e.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(e){var i=Math.abs(s-u.values(e));(n>i||n===i&&(e===u._lastChangedValue||u.values(e)===c.min))&&(n=i,a=t(this),o=e)}),r=this._start(e,o),r===!1?!1:(this._mouseSliding=!0,this._handleIndex=o,a.addClass("ui-state-active").focus(),h=a.offset(),l=!t(e.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:e.pageX-h.left-a.width()/2,top:e.pageY-h.top-a.height()/2-(parseInt(a.css("borderTopWidth"),10)||0)-(parseInt(a.css("borderBottomWidth"),10)||0)+(parseInt(a.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(e,o,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(t){var e={x:t.pageX,y:t.pageY},i=this._normValueFromMouse(e);return this._slide(t,this._handleIndex,i),!1},_mouseStop:function(t){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(t,this._handleIndex),this._change(t,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(t){var e,i,s,n,a;return"horizontal"===this.orientation?(e=this.elementSize.width,i=t.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(e=this.elementSize.height,i=t.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/e,s>1&&(s=1),0>s&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),a=this._valueMin()+s*n,this._trimAlignValue(a)},_start:function(t,e){var i={handle:this.handles[e],value:this.value()};return this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("start",t,i)},_slide:function(t,e,i){var s,n,a;this.options.values&&this.options.values.length?(s=this.values(e?0:1),2===this.options.values.length&&this.options.range===!0&&(0===e&&i>s||1===e&&s>i)&&(i=s),i!==this.values(e)&&(n=this.values(),n[e]=i,a=this._trigger("slide",t,{handle:this.handles[e],value:i,values:n}),s=this.values(e?0:1),a!==!1&&this.values(e,i,!0))):i!==this.value()&&(a=this._trigger("slide",t,{handle:this.handles[e],value:i}),a!==!1&&this.value(i))},_stop:function(t,e){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._trigger("stop",t,i)},_change:function(t,e){if(!this._keySliding&&!this._mouseSliding){var i={handle:this.handles[e],value:this.value()};this.options.values&&this.options.values.length&&(i.value=this.values(e),i.values=this.values()),this._lastChangedValue=e,this._trigger("change",t,i)}},value:function(t){return arguments.length?(this.options.value=this._trimAlignValue(t),this._refreshValue(),this._change(null,0),undefined):this._value()},values:function(e,i){var s,n,a;if(arguments.length>1)return this.options.values[e]=this._trimAlignValue(i),this._refreshValue(),this._change(null,e),undefined;if(!arguments.length)return this._values();if(!t.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(e):this.value();for(s=this.options.values,n=arguments[0],a=0;s.length>a;a+=1)s[a]=this._trimAlignValue(n[a]),this._change(null,a);this._refreshValue()},_setOption:function(e,i){var s,n=0;switch("range"===e&&this.options.range===!0&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),t.isArray(this.options.values)&&(n=this.options.values.length),t.Widget.prototype._setOption.apply(this,arguments),e){case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=0;n>s;s+=1)this._change(null,s);this._animateOff=!1;break;case"min":case"max":this._animateOff=!0,this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_value:function(){var t=this.options.value;return t=this._trimAlignValue(t)},_values:function(t){var e,i,s;if(arguments.length)return e=this.options.values[t],e=this._trimAlignValue(e);if(this.options.values&&this.options.values.length){for(i=this.options.values.slice(),s=0;i.length>s;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(t){if(this._valueMin()>=t)return this._valueMin();if(t>=this._valueMax())return this._valueMax();var e=this.options.step>0?this.options.step:1,i=(t-this._valueMin())%e,s=t-i;return 2*Math.abs(i)>=e&&(s+=i>0?e:-e),parseFloat(s.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var e,i,s,n,a,o=this.options.range,r=this.options,h=this,l=this._animateOff?!1:r.animate,u={};this.options.values&&this.options.values.length?this.handles.each(function(s){i=100*((h.values(s)-h._valueMin())/(h._valueMax()-h._valueMin())),u["horizontal"===h.orientation?"left":"bottom"]=i+"%",t(this).stop(1,1)[l?"animate":"css"](u,r.animate),h.options.range===!0&&("horizontal"===h.orientation?(0===s&&h.range.stop(1,1)[l?"animate":"css"]({left:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({width:i-e+"%"},{queue:!1,duration:r.animate})):(0===s&&h.range.stop(1,1)[l?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&h.range[l?"animate":"css"]({height:i-e+"%"},{queue:!1,duration:r.animate}))),e=i}):(s=this.value(),n=this._valueMin(),a=this._valueMax(),i=a!==n?100*((s-n)/(a-n)):0,u["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[l?"animate":"css"](u,r.animate),"min"===o&&"horizontal"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({width:i+"%"},r.animate),"max"===o&&"horizontal"===this.orientation&&this.range[l?"animate":"css"]({width:100-i+"%"},{queue:!1,duration:r.animate}),"min"===o&&"vertical"===this.orientation&&this.range.stop(1,1)[l?"animate":"css"]({height:i+"%"},r.animate),"max"===o&&"vertical"===this.orientation&&this.range[l?"animate":"css"]({height:100-i+"%"},{queue:!1,duration:r.animate}))},_handleEvents:{keydown:function(i){var s,n,a,o,r=t(i.target).data("ui-slider-handle-index");switch(i.keyCode){case t.ui.keyCode.HOME:case t.ui.keyCode.END:case t.ui.keyCode.PAGE_UP:case t.ui.keyCode.PAGE_DOWN:case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(i.preventDefault(),!this._keySliding&&(this._keySliding=!0,t(i.target).addClass("ui-state-active"),s=this._start(i,r),s===!1))return}switch(o=this.options.step,n=a=this.options.values&&this.options.values.length?this.values(r):this.value(),i.keyCode){case t.ui.keyCode.HOME:a=this._valueMin();break;case t.ui.keyCode.END:a=this._valueMax();break;case t.ui.keyCode.PAGE_UP:a=this._trimAlignValue(n+(this._valueMax()-this._valueMin())/e);break;case t.ui.keyCode.PAGE_DOWN:a=this._trimAlignValue(n-(this._valueMax()-this._valueMin())/e);break;case t.ui.keyCode.UP:case t.ui.keyCode.RIGHT:if(n===this._valueMax())return;a=this._trimAlignValue(n+o);break;case t.ui.keyCode.DOWN:case t.ui.keyCode.LEFT:if(n===this._valueMin())return;a=this._trimAlignValue(n-o)}this._slide(i,r,a)},click:function(t){t.preventDefault()},keyup:function(e){var i=t(e.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(e,i),this._change(e,i),t(e.target).removeClass("ui-state-active"))}}})})(jQuery);/*! jQuery UI menu - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t){t.widget("ui.menu",{version:"1.10.2",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-carat-1-e"},menus:"ul",position:{my:"left top",at:"right top"},role:"menu",blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,this.mouseHandled=!1,this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons",!!this.element.find(".ui-icon").length).attr({role:this.options.role,tabIndex:0}).bind("click"+this.eventNamespace,t.proxy(function(t){this.options.disabled&&t.preventDefault()},this)),this.options.disabled&&this.element.addClass("ui-state-disabled").attr("aria-disabled","true"),this._on({"mousedown .ui-menu-item > a":function(t){t.preventDefault()},"click .ui-state-disabled > a":function(t){t.preventDefault()},"click .ui-menu-item:has(a)":function(e){var i=t(e.target).closest(".ui-menu-item");!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.mouseHandled=!0,this.select(e),i.has(".ui-menu").length?this.expand(e):this.element.is(":focus")||(this.element.trigger("focus",[!0]),this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(e){var i=t(e.currentTarget);i.siblings().children(".ui-state-active").removeClass("ui-state-active"),this.focus(e,i)},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(t,e){var i=this.active||this.element.children(".ui-menu-item").eq(0);e||this.focus(t,i)},blur:function(e){this._delay(function(){t.contains(this.element[0],this.document[0].activeElement)||this.collapseAll(e)})},keydown:"_keydown"}),this.refresh(),this._on(this.document,{click:function(e){t(e.target).closest(".ui-menu").length||this.collapseAll(e),this.mouseHandled=!1}})},_destroy:function(){this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function(){var e=t(this);e.data("ui-menu-submenu-carat")&&e.remove()}),this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")},_keydown:function(e){function i(t){return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}var s,n,a,o,r,h=!0;switch(e.keyCode){case t.ui.keyCode.PAGE_UP:this.previousPage(e);break;case t.ui.keyCode.PAGE_DOWN:this.nextPage(e);break;case t.ui.keyCode.HOME:this._move("first","first",e);break;case t.ui.keyCode.END:this._move("last","last",e);break;case t.ui.keyCode.UP:this.previous(e);break;case t.ui.keyCode.DOWN:this.next(e);break;case t.ui.keyCode.LEFT:this.collapse(e);break;case t.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(e);break;case t.ui.keyCode.ENTER:case t.ui.keyCode.SPACE:this._activate(e);break;case t.ui.keyCode.ESCAPE:this.collapse(e);break;default:h=!1,n=this.previousFilter||"",a=String.fromCharCode(e.keyCode),o=!1,clearTimeout(this.filterTimer),a===n?o=!0:a=n+a,r=RegExp("^"+i(a),"i"),s=this.activeMenu.children(".ui-menu-item").filter(function(){return r.test(t(this).children("a").text())}),s=o&&-1!==s.index(this.active.next())?this.active.nextAll(".ui-menu-item"):s,s.length||(a=String.fromCharCode(e.keyCode),r=RegExp("^"+i(a),"i"),s=this.activeMenu.children(".ui-menu-item").filter(function(){return r.test(t(this).children("a").text())})),s.length?(this.focus(e,s),s.length>1?(this.previousFilter=a,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter):delete this.previousFilter}h&&e.preventDefault()},_activate:function(t){this.active.is(".ui-state-disabled")||(this.active.children("a[aria-haspopup='true']").length?this.expand(t):this.select(t))},refresh:function(){var e,i=this.options.icons.submenu,s=this.element.find(this.options.menus);s.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var e=t(this),s=e.prev("a"),n=t("<span>").addClass("ui-menu-icon ui-icon "+i).data("ui-menu-submenu-carat",!0);s.attr("aria-haspopup","true").prepend(n),e.attr("aria-labelledby",s.attr("id"))}),e=s.add(this.element),e.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","presentation").children("a").uniqueId().addClass("ui-corner-all").attr({tabIndex:-1,role:this._itemRole()}),e.children(":not(.ui-menu-item)").each(function(){var e=t(this);/[^\-\u2014\u2013\s]/.test(e.text())||e.addClass("ui-widget-content ui-menu-divider")}),e.children(".ui-state-disabled").attr("aria-disabled","true"),this.active&&!t.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(t,e){"icons"===t&&this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(e.submenu),this._super(t,e)},focus:function(t,e){var i,s;this.blur(t,t&&"focus"===t.type),this._scrollIntoView(e),this.active=e.first(),s=this.active.children("a").addClass("ui-state-focus"),this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),t&&"keydown"===t.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=e.children(".ui-menu"),i.length&&/^mouse/.test(t.type)&&this._startOpening(i),this.activeMenu=e.parent(),this._trigger("focus",t,{item:e})},_scrollIntoView:function(e){var i,s,n,a,o,r;this._hasScroll()&&(i=parseFloat(t.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(t.css(this.activeMenu[0],"paddingTop"))||0,n=e.offset().top-this.activeMenu.offset().top-i-s,a=this.activeMenu.scrollTop(),o=this.activeMenu.height(),r=e.height(),0>n?this.activeMenu.scrollTop(a+n):n+r>o&&this.activeMenu.scrollTop(a+n-o+r))},blur:function(t,e){e||clearTimeout(this.timer),this.active&&(this.active.children("a").removeClass("ui-state-focus"),this.active=null,this._trigger("blur",t,{item:this.active}))},_startOpening:function(t){clearTimeout(this.timer),"true"===t.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(t)},this.delay))},_open:function(e){var i=t.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(e.parents(".ui-menu")).hide().attr("aria-hidden","true"),e.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(e,i){clearTimeout(this.timer),this.timer=this._delay(function(){var s=i?this.element:t(e&&e.target).closest(this.element.find(".ui-menu"));s.length||(s=this.element),this._close(s),this.blur(e),this.activeMenu=s},this.delay)},_close:function(t){t||(t=this.active?this.active.parent():this.element),t.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false").end().find("a.ui-state-active").removeClass("ui-state-active")},collapse:function(t){var e=this.active&&this.active.parent().closest(".ui-menu-item",this.element);e&&e.length&&(this._close(),this.focus(t,e))},expand:function(t){var e=this.active&&this.active.children(".ui-menu ").children(".ui-menu-item").first();e&&e.length&&(this._open(e.parent()),this._delay(function(){this.focus(t,e)}))},next:function(t){this._move("next","first",t)},previous:function(t){this._move("prev","last",t)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(t,e,i){var s;this.active&&(s="first"===t||"last"===t?this.active["first"===t?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[t+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.children(".ui-menu-item")[e]()),this.focus(i,s)},nextPage:function(e){var i,s,n;return this.active?(this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=t(this),0>i.offset().top-s-n}),this.focus(e,i)):this.focus(e,this.activeMenu.children(".ui-menu-item")[this.active?"last":"first"]())),undefined):(this.next(e),undefined)},previousPage:function(e){var i,s,n;return this.active?(this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=t(this),i.offset().top-s+n>0}),this.focus(e,i)):this.focus(e,this.activeMenu.children(".ui-menu-item").first())),undefined):(this.next(e),undefined)},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(e){this.active=this.active||t(e.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(e,!0),this._trigger("select",e,i)}})})(jQuery);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t,e){function i(){return++n}function s(t){return t.hash.length>1&&decodeURIComponent(t.href.replace(a,""))===decodeURIComponent(location.href.replace(a,""))}var n=0,a=/#.*$/;t.widget("ui.tabs",{version:"1.10.2",delay:300,options:{active:null,collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,activate:null,beforeActivate:null,beforeLoad:null,load:null},_create:function(){var e=this,i=this.options;this.running=!1,this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",i.collapsible).delegate(".ui-tabs-nav > li","mousedown"+this.eventNamespace,function(e){t(this).is(".ui-state-disabled")&&e.preventDefault()}).delegate(".ui-tabs-anchor","focus"+this.eventNamespace,function(){t(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this._processTabs(),i.active=this._initialActive(),t.isArray(i.disabled)&&(i.disabled=t.unique(i.disabled.concat(t.map(this.tabs.filter(".ui-state-disabled"),function(t){return e.tabs.index(t)}))).sort()),this.active=this.options.active!==!1&&this.anchors.length?this._findActive(i.active):t(),this._refresh(),this.active.length&&this.load(i.active)},_initialActive:function(){var i=this.options.active,s=this.options.collapsible,n=location.hash.substring(1);return null===i&&(n&&this.tabs.each(function(s,a){return t(a).attr("aria-controls")===n?(i=s,!1):e}),null===i&&(i=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),(null===i||-1===i)&&(i=this.tabs.length?0:!1)),i!==!1&&(i=this.tabs.index(this.tabs.eq(i)),-1===i&&(i=s?!1:0)),!s&&i===!1&&this.anchors.length&&(i=0),i},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):t()}},_tabKeydown:function(i){var s=t(this.document[0].activeElement).closest("li"),n=this.tabs.index(s),a=!0;if(!this._handlePageNav(i)){switch(i.keyCode){case t.ui.keyCode.RIGHT:case t.ui.keyCode.DOWN:n++;break;case t.ui.keyCode.UP:case t.ui.keyCode.LEFT:a=!1,n--;break;case t.ui.keyCode.END:n=this.anchors.length-1;break;case t.ui.keyCode.HOME:n=0;break;case t.ui.keyCode.SPACE:return i.preventDefault(),clearTimeout(this.activating),this._activate(n),e;case t.ui.keyCode.ENTER:return i.preventDefault(),clearTimeout(this.activating),this._activate(n===this.options.active?!1:n),e;default:return}i.preventDefault(),clearTimeout(this.activating),n=this._focusNextTab(n,a),i.ctrlKey||(s.attr("aria-selected","false"),this.tabs.eq(n).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",n)},this.delay))}},_panelKeydown:function(e){this._handlePageNav(e)||e.ctrlKey&&e.keyCode===t.ui.keyCode.UP&&(e.preventDefault(),this.active.focus())},_handlePageNav:function(i){return i.altKey&&i.keyCode===t.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):i.altKey&&i.keyCode===t.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):e},_findNextTab:function(e,i){function s(){return e>n&&(e=0),0>e&&(e=n),e}for(var n=this.tabs.length-1;-1!==t.inArray(s(),this.options.disabled);)e=i?e+1:e-1;return e},_focusNextTab:function(t,e){return t=this._findNextTab(t,e),this.tabs.eq(t).focus(),t},_setOption:function(t,i){return"active"===t?(this._activate(i),e):"disabled"===t?(this._setupDisabled(i),e):(this._super(t,i),"collapsible"===t&&(this.element.toggleClass("ui-tabs-collapsible",i),i||this.options.active!==!1||this._activate(0)),"event"===t&&this._setupEvents(i),"heightStyle"===t&&this._setupHeightStyle(i),e)},_tabId:function(t){return t.attr("aria-controls")||"ui-tabs-"+i()},_sanitizeSelector:function(t){return t?t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var e=this.options,i=this.tablist.children(":has(a[href])");e.disabled=t.map(i.filter(".ui-state-disabled"),function(t){return i.index(t)}),this._processTabs(),e.active!==!1&&this.anchors.length?this.active.length&&!t.contains(this.tablist[0],this.active[0])?this.tabs.length===e.disabled.length?(e.active=!1,this.active=t()):this._activate(this._findNextTab(Math.max(0,e.active-1),!1)):e.active=this.tabs.index(this.active):(e.active=!1,this.active=t()),this._refresh()},_refresh:function(){this._setupDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-expanded":"false","aria-hidden":"true"}),this.active.length?(this.active.addClass("ui-tabs-active ui-state-active").attr({"aria-selected":"true",tabIndex:0}),this._getPanelForTab(this.active).show().attr({"aria-expanded":"true","aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var e=this;this.tablist=this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role","tablist"),this.tabs=this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({role:"tab",tabIndex:-1}),this.anchors=this.tabs.map(function(){return t("a",this)[0]}).addClass("ui-tabs-anchor").attr({role:"presentation",tabIndex:-1}),this.panels=t(),this.anchors.each(function(i,n){var a,o,r,h=t(n).uniqueId().attr("id"),l=t(n).closest("li"),u=l.attr("aria-controls");s(n)?(a=n.hash,o=e.element.find(e._sanitizeSelector(a))):(r=e._tabId(l),a="#"+r,o=e.element.find(a),o.length||(o=e._createPanel(r),o.insertAfter(e.panels[i-1]||e.tablist)),o.attr("aria-live","polite")),o.length&&(e.panels=e.panels.add(o)),u&&l.data("ui-tabs-aria-controls",u),l.attr({"aria-controls":a.substring(1),"aria-labelledby":h}),o.attr("aria-labelledby",h)}),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role","tabpanel")},_getList:function(){return this.element.find("ol,ul").eq(0)},_createPanel:function(e){return t("<div>").attr("id",e).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy",!0)},_setupDisabled:function(e){t.isArray(e)&&(e.length?e.length===this.anchors.length&&(e=!0):e=!1);for(var i,s=0;i=this.tabs[s];s++)e===!0||-1!==t.inArray(s,e)?t(i).addClass("ui-state-disabled").attr("aria-disabled","true"):t(i).removeClass("ui-state-disabled").removeAttr("aria-disabled");this.options.disabled=e},_setupEvents:function(e){var i={click:function(t){t.preventDefault()}};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(e){var i,s=this.element.parent();"fill"===e?(i=s.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var e=t(this),s=e.css("position");"absolute"!==s&&"fixed"!==s&&(i-=e.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=t(this).outerHeight(!0)}),this.panels.each(function(){t(this).height(Math.max(0,i-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===e&&(i=0,this.panels.each(function(){i=Math.max(i,t(this).height("").height())}).height(i))},_eventHandler:function(e){var i=this.options,s=this.active,n=t(e.currentTarget),a=n.closest("li"),o=a[0]===s[0],r=o&&i.collapsible,h=r?t():this._getPanelForTab(a),l=s.length?this._getPanelForTab(s):t(),u={oldTab:s,oldPanel:l,newTab:r?t():a,newPanel:h};e.preventDefault(),a.hasClass("ui-state-disabled")||a.hasClass("ui-tabs-loading")||this.running||o&&!i.collapsible||this._trigger("beforeActivate",e,u)===!1||(i.active=r?!1:this.tabs.index(a),this.active=o?t():a,this.xhr&&this.xhr.abort(),l.length||h.length||t.error("jQuery UI Tabs: Mismatching fragment identifier."),h.length&&this.load(this.tabs.index(a),e),this._toggle(e,u))},_toggle:function(e,i){function s(){a.running=!1,a._trigger("activate",e,i)}function n(){i.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),o.length&&a.options.show?a._show(o,a.options.show,s):(o.show(),s())}var a=this,o=i.newPanel,r=i.oldPanel;this.running=!0,r.length&&this.options.hide?this._hide(r,this.options.hide,function(){i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),n()}):(i.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),r.hide(),n()),r.attr({"aria-expanded":"false","aria-hidden":"true"}),i.oldTab.attr("aria-selected","false"),o.length&&r.length?i.oldTab.attr("tabIndex",-1):o.length&&this.tabs.filter(function(){return 0===t(this).attr("tabIndex")}).attr("tabIndex",-1),o.attr({"aria-expanded":"true","aria-hidden":"false"}),i.newTab.attr({"aria-selected":"true",tabIndex:0})},_activate:function(e){var i,s=this._findActive(e);s[0]!==this.active[0]&&(s.length||(s=this.active),i=s.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return e===!1?t():this.tabs.eq(e)},_getIndex:function(t){return"string"==typeof t&&(t=this.anchors.index(this.anchors.filter("[href$='"+t+"']"))),t},_destroy:function(){this.xhr&&this.xhr.abort(),this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),this.tabs.add(this.panels).each(function(){t.data(this,"ui-tabs-destroy")?t(this).remove():t(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")}),this.tabs.each(function(){var e=t(this),i=e.data("ui-tabs-aria-controls");i?e.attr("aria-controls",i).removeData("ui-tabs-aria-controls"):e.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(i){var s=this.options.disabled;s!==!1&&(i===e?s=!1:(i=this._getIndex(i),s=t.isArray(s)?t.map(s,function(t){return t!==i?t:null}):t.map(this.tabs,function(t,e){return e!==i?e:null})),this._setupDisabled(s))},disable:function(i){var s=this.options.disabled;if(s!==!0){if(i===e)s=!0;else{if(i=this._getIndex(i),-1!==t.inArray(i,s))return;s=t.isArray(s)?t.merge([i],s).sort():[i]}this._setupDisabled(s)}},load:function(e,i){e=this._getIndex(e);var n=this,a=this.tabs.eq(e),o=a.find(".ui-tabs-anchor"),r=this._getPanelForTab(a),h={tab:a,panel:r};s(o[0])||(this.xhr=t.ajax(this._ajaxSettings(o,i,h)),this.xhr&&"canceled"!==this.xhr.statusText&&(a.addClass("ui-tabs-loading"),r.attr("aria-busy","true"),this.xhr.success(function(t){setTimeout(function(){r.html(t),n._trigger("load",i,h)},1)}).complete(function(t,e){setTimeout(function(){"abort"===e&&n.panels.stop(!1,!0),a.removeClass("ui-tabs-loading"),r.removeAttr("aria-busy"),t===n.xhr&&delete n.xhr},1)})))},_ajaxSettings:function(e,i,s){var n=this;return{url:e.attr("href"),beforeSend:function(e,a){return n._trigger("beforeLoad",i,t.extend({jqXHR:e,ajaxSettings:a},s))}}},_getPanelForTab:function(e){var i=t(e).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i))}})})(jQuery);/*! jQuery UI - v1.10.2 - 2013-03-14
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t){function e(e,i){var s=(e.attr("aria-describedby")||"").split(/\s+/);s.push(i),e.data("ui-tooltip-id",i).attr("aria-describedby",t.trim(s.join(" ")))}function i(e){var i=e.data("ui-tooltip-id"),s=(e.attr("aria-describedby")||"").split(/\s+/),n=t.inArray(i,s);-1!==n&&s.splice(n,1),e.removeData("ui-tooltip-id"),s=t.trim(s.join(" ")),s?e.attr("aria-describedby",s):e.removeAttr("aria-describedby")}var s=0;t.widget("ui.tooltip",{version:"1.10.2",options:{content:function(){var e=t(this).attr("title")||"";return t("<a>").text(e).html()},hide:!0,items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,tooltipClass:null,track:!1,close:null,open:null},_create:function(){this._on({mouseover:"open",focusin:"open"}),this.tooltips={},this.parents={},this.options.disabled&&this._disable()},_setOption:function(e,i){var s=this;return"disabled"===e?(this[i?"_disable":"_enable"](),this.options[e]=i,void 0):(this._super(e,i),"content"===e&&t.each(this.tooltips,function(t,e){s._updateContent(e)}),void 0)},_disable:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0)}),this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.is("[title]")&&e.data("ui-tooltip-title",e.attr("title")).attr("title","")})},_enable:function(){this.element.find(this.options.items).addBack().each(function(){var e=t(this);e.data("ui-tooltip-title")&&e.attr("title",e.data("ui-tooltip-title"))})},open:function(e){var i=this,s=t(e?e.target:this.element).closest(this.options.items);s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),e&&"mouseover"===e.type&&s.parents().each(function(){var e,s=t(this);s.data("ui-tooltip-open")&&(e=t.Event("blur"),e.target=e.currentTarget=this,i.close(e,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._updateContent(s,e))},_updateContent:function(t,e){var i,s=this.options.content,n=this,a=e?e.type:null;return"string"==typeof s?this._open(e,t,s):(i=s.call(t[0],function(i){t.data("ui-tooltip-open")&&n._delay(function(){e&&(e.type=a),this._open(e,t,i)})}),i&&this._open(e,t,i),void 0)},_open:function(i,s,n){function a(t){l.of=t,o.is(":hidden")||o.position(l)}var o,r,h,l=t.extend({},this.options.position);if(n){if(o=this._find(s),o.length)return o.find(".ui-tooltip-content").html(n),void 0;s.is("[title]")&&(i&&"mouseover"===i.type?s.attr("title",""):s.removeAttr("title")),o=this._tooltip(s),e(s,o.attr("id")),o.find(".ui-tooltip-content").html(n),this.options.track&&i&&/^mouse/.test(i.type)?(this._on(this.document,{mousemove:a}),a(i)):o.position(t.extend({of:s},this.options.position)),o.hide(),this._show(o,this.options.show),this.options.show&&this.options.show.delay&&(h=this.delayedShow=setInterval(function(){o.is(":visible")&&(a(l.of),clearInterval(h))},t.fx.interval)),this._trigger("open",i,{tooltip:o}),r={keyup:function(e){if(e.keyCode===t.ui.keyCode.ESCAPE){var i=t.Event(e);i.currentTarget=s[0],this.close(i,!0)}},remove:function(){this._removeTooltip(o)}},i&&"mouseover"!==i.type||(r.mouseleave="close"),i&&"focusin"!==i.type||(r.focusout="close"),this._on(!0,s,r)}},close:function(e){var s=this,n=t(e?e.currentTarget:this.element),a=this._find(n);this.closing||(clearInterval(this.delayedShow),n.data("ui-tooltip-title")&&n.attr("title",n.data("ui-tooltip-title")),i(n),a.stop(!0),this._hide(a,this.options.hide,function(){s._removeTooltip(t(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),e&&"mouseleave"===e.type&&t.each(this.parents,function(e,i){t(i.element).attr("title",i.title),delete s.parents[e]}),this.closing=!0,this._trigger("close",e,{tooltip:a}),this.closing=!1)},_tooltip:function(e){var i="ui-tooltip-"+s++,n=t("<div>").attr({id:i,role:"tooltip"}).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content "+(this.options.tooltipClass||""));return t("<div>").addClass("ui-tooltip-content").appendTo(n),n.appendTo(this.document[0].body),this.tooltips[i]=e,n},_find:function(e){var i=e.data("ui-tooltip-id");return i?t("#"+i):t()},_removeTooltip:function(t){t.remove(),delete this.tooltips[t.attr("id")]},_destroy:function(){var e=this;t.each(this.tooltips,function(i,s){var n=t.Event("blur");n.target=n.currentTarget=s[0],e.close(n,!0),t("#"+i).remove(),s.data("ui-tooltip-title")&&(s.attr("title",s.data("ui-tooltip-title")),s.removeData("ui-tooltip-title"))})}})})(jQuery);/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

+function ($) {
    'use strict';

    // DROPDOWN CLASS DEFINITION
    // =========================

    var backdrop = '.dropdown-backdrop'
    var toggle   = '[data-toggle="dropdown"]'
    var Dropdown = function (element) {
        $(element).on('click.bs.dropdown', this.toggle)
    }

    Dropdown.VERSION = '3.2.0'

    Dropdown.prototype.toggle = function (e) {
        var $this = $(this)

        if ($this.is('.disabled, :disabled')) return

        var $parent  = getParent($this)
        var isActive = $parent.hasClass('open')

        clearMenus()

        if (!isActive) {
            if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
                // if mobile we use a backdrop because click events don't delegate
                $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
            }

            var relatedTarget = { relatedTarget: this }
            $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

            if (e.isDefaultPrevented()) return

            $this.trigger('focus')

            $parent
                .toggleClass('open')
                .trigger('shown.bs.dropdown', relatedTarget)
        }

        return false
    }

    Dropdown.prototype.keydown = function (e) {
        if (!/(38|40|27)/.test(e.keyCode)) return

        var $this = $(this)

        e.preventDefault()
        e.stopPropagation()

        if ($this.is('.disabled, :disabled')) return

        var $parent  = getParent($this)
        var isActive = $parent.hasClass('open')

        if (!isActive || (isActive && e.keyCode == 27)) {
            if (e.which == 27) $parent.find(toggle).trigger('focus')
            return $this.trigger('click')
        }

        var desc = ' li:not(.divider):visible a'
        var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

        if (!$items.length) return

        var index = $items.index($items.filter(':focus'))

        if (e.keyCode == 38 && index > 0)                 index--                        // up
        if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
        if (!~index)                                      index = 0

        $items.eq(index).trigger('focus')
    }

    function clearMenus(e) {
        if (e && e.which === 3) return
        $(backdrop).remove()
        $(toggle).each(function () {
            var $parent = getParent($(this))
            var relatedTarget = { relatedTarget: this }
            if (!$parent.hasClass('open')) return
            $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
            if (e.isDefaultPrevented()) return
            $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
        })
    }

    function getParent($this) {
        var selector = $this.attr('data-target')

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
        }

        var $parent = selector && $(selector)

        return $parent && $parent.length ? $parent : $this.parent()
    }


    // DROPDOWN PLUGIN DEFINITION
    // ==========================

    function Plugin(option) {
        return this.each(function () {
            var $this = $(this)
            var data  = $this.data('bs.dropdown')

            if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    var old = $.fn.dropdown

    $.fn.dropdown             = Plugin
    $.fn.dropdown.Constructor = Dropdown


    // DROPDOWN NO CONFLICT
    // ====================

    $.fn.dropdown.noConflict = function () {
        $.fn.dropdown = old
        return this
    }


    // APPLY TO STANDARD DROPDOWN ELEMENTS
    // ===================================

    $(document)
        .on('click.bs.dropdown.data-api', clearMenus)
        .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
        .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
        .on('keydown.bs.dropdown.data-api', toggle + ', [role="menu"], [role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);

/* =============================================================
 * flatui-Selectpicker v0.0.3
 * ============================================================ */
!function($) {
    var Selectpicker = function(element, options, e) {
        if (e ) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.$element = $(element);
        this.$newElement = null;
        this.button = null;

        //Merge defaults, options and data-attributes to make our options
        this.options = $.extend({}, $.fn.selectpicker.defaults, this.$element.data(), typeof options == 'object' && options);

        //If we have no title yet, check the attribute 'title' (this is missed by jq as its not a data-attribute
        if(this.options.title==null)
            this.options.title = this.$element.attr('title');

        //Expose public methods
        this.val = Selectpicker.prototype.val;
        this.render = Selectpicker.prototype.render;
        this.init();
    };

    Selectpicker.prototype = {

        constructor: Selectpicker,

        init: function (e) {
            var _this = this;
            this.$element.hide();
            this.multiple = this.$element.prop('multiple');


            var classList = this.$element.attr('class') !== undefined ? this.$element.attr('class').split(/\s+/) : '';
            var id = this.$element.attr('id');
            this.$element.after( this.createView() );
            this.$newElement = this.$element.next('.select');
            var select = this.$newElement;
            var menu = this.$newElement.find('.dropdown-menu');
            var menuArrow = this.$newElement.find('.dropdown-arrow');
            var menuA = menu.find('li > a');
            var liHeight = select.addClass('open').find('.dropdown-menu li > a').outerHeight();
            select.removeClass('open');
            var divHeight = menu.find('li .divider').outerHeight(true);
            var selectOffset_top = this.$newElement.offset().top;
            var size = 0;
            var menuHeight = 0;
            var selectHeight = this.$newElement.outerHeight();
            this.button = this.$newElement.find('> button');
            if (id !== undefined) {
                this.button.attr('id', id);
                $('label[for="' + id + '"]').click(function(){ select.find('button#'+id).focus(); })
            }
            for (var i = 0; i < classList.length; i++) {
                if(classList[i] != 'selectpicker') {
                    this.$newElement.addClass(classList[i]);
                }
            }
            //If we are multiple, then add the show-tick class by default
            if(this.multiple) {
                this.$newElement.addClass('select-multiple');
            }
            this.button.addClass(this.options.style);
            menu.addClass(this.options.menuStyle);
            menuArrow.addClass(function() {
                if (_this.options.menuStyle) {
                    return _this.options.menuStyle.replace('dropdown-', 'dropdown-arrow-');
                }
            });
            this.checkDisabled();
            this.checkTabIndex();
            this.clickListener();
            var menuPadding = parseInt(menu.css('padding-top')) + parseInt(menu.css('padding-bottom')) + parseInt(menu.css('border-top-width')) + parseInt(menu.css('border-bottom-width'));
            if (this.options.size == 'auto') {
                function getSize() {
                    var selectOffset_top_scroll = selectOffset_top - $(window).scrollTop();
                    var windowHeight = $(window).innerHeight();
                    var menuExtras = menuPadding + parseInt(menu.css('margin-top')) + parseInt(menu.css('margin-bottom')) + 2;
                    var selectOffset_bot = windowHeight - selectOffset_top_scroll - selectHeight - menuExtras;
                    menuHeight = selectOffset_bot;
                    if (select.hasClass('dropup')) {
                        menuHeight = selectOffset_top_scroll - menuExtras;
                    }
                    menu.css({'max-height' : menuHeight + 'px', 'overflow-y' : 'auto', 'min-height' : liHeight*3 + 'px'});
                }
                getSize();
                $(window).resize(getSize);
                $(window).scroll(getSize);
                if (window.MutationObserver) {
                    new MutationObserver(getSize).observe(this.$element.get(0), {
                        childList: true
                    });
                } else {
                    this.$element.bind('DOMNodeInserted', getSize);
                }
            } else if (this.options.size && this.options.size != 'auto' && menu.find('li').length > this.options.size) {
                var optIndex = menu.find("li > *").filter(':not(.divider)').slice(0,this.options.size).last().parent().index();
                var divLength = menu.find("li").slice(0,optIndex + 1).find('.divider').length;
                menuHeight = liHeight*this.options.size + divLength*divHeight + menuPadding;
                menu.css({'max-height' : menuHeight + 'px', 'overflow-y' : 'scroll'});
            }

            // Listen for updates to the DOM and re render... (Use Mutation Observer when availiable)
            if (window.MutationObserver) {
                new MutationObserver($.proxy(this.reloadLi, this)).observe(this.$element.get(0), {
                    childList: true
                });
            } else {
                this.$element.bind('DOMNodeInserted', $.proxy(this.reloadLi, this));
            }

            this.render();
        },

        createDropdown: function() {
            var drop =
                "<div class='btn-group select'>" +
                    "<button class='btn dropdown-toggle clearfix' data-toggle='dropdown'>" +
                    "<span class='filter-option pull-left'></span>&nbsp;" +
                    "<span class='caret'></span>" +
                    "</button>" +
                    "<span class='dropdown-arrow'></span>" +
                    "<ul class='dropdown-menu' role='menu'>" +
                    "</ul>" +
                    "</div>";

            return $(drop);
        },


        createView: function() {
            var $drop = this.createDropdown();
            var $li = this.createLi();
            $drop.find('ul').append($li);
            return $drop;
        },

        reloadLi: function() {
            //Remove all children.
            this.destroyLi();
            //Re build
            $li = this.createLi();
            this.$newElement.find('ul').append( $li );
            //render view
            this.render();
        },

        destroyLi:function() {
            this.$newElement.find('li').remove();
        },

        createLi: function() {

            var _this = this;
            var _li = [];
            var _liA = [];
            var _liHtml = '';

            this.$element.find('option').each(function(){
                _li.push($(this).text());
            });

            this.$element.find('option').each(function(index) {
                //Get the class and text for the option
                var optionClass = $(this).attr("class") !== undefined ? $(this).attr("class") : '';
                var text =  $(this).text();
                var subtext = $(this).data('subtext') !== undefined ? '<small class="muted">'+$(this).data('subtext')+'</small>' : '';

                //Append any subtext to the main text.
                text+=subtext;

                if ($(this).parent().is('optgroup') && $(this).data('divider') != true) {
                    if ($(this).index() == 0) {
                        //Get the opt group label
                        var label = $(this).parent().attr('label');
                        var labelSubtext = $(this).parent().data('subtext') !== undefined ? '<small class="muted">'+$(this).parent().data('subtext')+'</small>' : '';
                        label += labelSubtext;

                        if ($(this)[0].index != 0) {
                            _liA.push(
                                '<div class="divider"></div>'+
                                    '<dt>'+label+'</dt>'+
                                    _this.createA(text, "opt " + optionClass )
                            );
                        } else {
                            _liA.push(
                                '<dt>'+label+'</dt>'+
                                    _this.createA(text, "opt " + optionClass ));
                        }
                    } else {
                        _liA.push( _this.createA(text, "opt " + optionClass )  );
                    }
                } else if ($(this).data('divider') == true) {
                    _liA.push('<div class="divider"></div>');
                } else if ($(this).data('hidden') == true) {
                    _liA.push('');
                } else {
                    _liA.push( _this.createA(text, optionClass ) );
                }
            });

            if (_li.length > 0) {
                for (var i = 0; i < _li.length; i++) {
                    var $option = this.$element.find('option').eq(i);
                    _liHtml += "<li rel=" + i + ">" + _liA[i] + "</li>";
                }
            }

            //If we dont have a selected item, and we dont have a title, select the first element so something is set in the button
            if(this.$element.find('option:selected').length==0 && !_this.options.title) {
                this.$element.find('option').eq(0).prop('selected', true).attr('selected', 'selected');
            }

            return $(_liHtml);
        },

        createA:function(test, classes) {
            return '<a tabindex="-1" href="#" class="'+classes+'">' +
                '<span class="pull-left">' + test + '</span>' +
                '</a>';

        },

        render:function() {
            var _this = this;

            //Set width of select
            if (this.options.width == 'auto') {
                var ulWidth = this.$newElement.find('.dropdown-menu').css('width');
                this.$newElement.css('width',ulWidth);
            } else if (this.options.width && this.options.width != 'auto') {
                this.$newElement.css('width',this.options.width);
            }

            //Update the LI to match the SELECT
            this.$element.find('option').each(function(index) {
                _this.setDisabled(index, $(this).is(':disabled') || $(this).parent().is(':disabled') );
                _this.setSelected(index, $(this).is(':selected') );
            });



            var selectedItems = this.$element.find('option:selected').map(function(index,value) {
                if($(this).attr('title')!=undefined) {
                    return $(this).attr('title');
                } else {
                    return $(this).text();
                }
            }).toArray();

            //Convert all the values into a comma delimited string
            var title = selectedItems.join(", ");

            //If this is multi select, and the selectText type is count, the show 1 of 2 selected etc..
            if(_this.multiple && _this.options.selectedTextFormat.indexOf('count') > -1) {
                var max = _this.options.selectedTextFormat.split(">");
                if( (max.length>1 && selectedItems.length > max[1]) || (max.length==1 && selectedItems.length>=2)) {
                    title = selectedItems.length +' of ' + this.$element.find('option').length + ' selected';
                }
            }

            //If we dont have a title, then use the default, or if nothing is set at all, use the not selected text
            if(!title) {
                title = _this.options.title != undefined ? _this.options.title : _this.options.noneSelectedText;
            }

            this.$element.next('.select').find('.filter-option').html( title );
        },



        setSelected:function(index, selected) {
            if(selected) {
                this.$newElement.find('li').eq(index).addClass('selected');
            } else {
                this.$newElement.find('li').eq(index).removeClass('selected');
            }
        },

        setDisabled:function(index, disabled) {
            if(disabled) {
                this.$newElement.find('li').eq(index).addClass('disabled');
            } else {
                this.$newElement.find('li').eq(index).removeClass('disabled');
            }
        },

        checkDisabled: function() {
            if (this.$element.is(':disabled')) {
                this.button.addClass('disabled');
                this.button.click(function(e) {
                    e.preventDefault();
                });
            }
        },

        checkTabIndex: function() {
            if (this.$element.is('[tabindex]')) {
                var tabindex = this.$element.attr("tabindex");
                this.button.attr('tabindex', tabindex);
            }
        },

        clickListener: function() {
            var _this = this;

            $('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });



            this.$newElement.on('click', 'li a', function(e){
                var clickedIndex = $(this).parent().index(),
                    $this = $(this).parent(),
                    $select = $this.parents('.select');


                //Dont close on multi choice menu
                if(_this.multiple) {
                    e.stopPropagation();
                }

                e.preventDefault();

                //Dont run if we have been disabled
                if ($select.prev('select').not(':disabled') && !$(this).parent().hasClass('disabled')){
                    //Deselect all others if not multi select box
                    if (!_this.multiple) {
                        $select.prev('select').find('option').removeAttr('selected');
                        $select.prev('select').find('option').eq(clickedIndex).prop('selected', true).attr('selected', 'selected');
                    }
                    //Else toggle the one we have chosen if we are multi selet.
                    else {
                        var selected = $select.prev('select').find('option').eq(clickedIndex).prop('selected');

                        if(selected) {
                            $select.prev('select').find('option').eq(clickedIndex).removeAttr('selected');
                        } else {
                            $select.prev('select').find('option').eq(clickedIndex).prop('selected', true).attr('selected', 'selected');
                        }
                    }


                    $select.find('.filter-option').html($this.text());
                    $select.find('button').focus();

                    // Trigger select 'change'
                    $select.prev('select').trigger('change');
                }

            });

            this.$newElement.on('click', 'li.disabled a, li dt, li .divider', function(e) {
                e.preventDefault();
                e.stopPropagation();
                $select = $(this).parent().parents('.select');
                $select.find('button').focus();
            });

            this.$element.on('change', function(e) {
                _this.render();
            });
        },

        val:function(value) {

            if(value!=undefined) {
                this.$element.val( value );

                this.$element.trigger('change');
                return this.$element;
            } else {
                return this.$element.val();
            }
        }

    };

    $.fn.selectpicker = function(option, event) {
        //get the args of the outer function..
        var args = arguments;
        var value;
        var chain = this.each(function () {
            var $this = $(this),
                data = $this.data('selectpicker'),
                options = typeof option == 'object' && option;

            if (!data) {
                $this.data('selectpicker', (data = new Selectpicker(this, options, event)));
            } else {
                for(var i in option) {
                    data[i]=option[i];
                }
            }

            if (typeof option == 'string') {
                //Copy the value of option, as once we shift the arguments
                //it also shifts the value of option.
                property = option;
                if(data[property] instanceof Function) {
                    [].shift.apply(args);
                    value = data[property].apply(data, args);
                } else {
                    value = data[property];
                }
            }
        });

        if(value!=undefined) {
            return value;
        } else {
            return chain;
        }
    };

    $.fn.selectpicker.defaults = {
        style: null,
        size: 'auto',
        title: null,
        selectedTextFormat : 'values',
        noneSelectedText : 'Nothing selected',
        width: null,
        menuStyle: null,
        toggleSize: null
    }

}(window.jQuery);


$(document).ready(function () {
    $(".customSelect").selectpicker();
});/*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version 3.0.0
 */
(function(e){e(jQuery)})(function(e){function t(e){return e&&e.constructor===Number?e+"px":e}e.fn.bgiframe=function(n){n=e.extend({top:"auto",left:"auto",width:"auto",height:"auto",opacity:true,src:"javascript:false;",conditional:/MSIE 6.0/.test(navigator.userAgent)},n);if(!e.isFunction(n.conditional)){var r=n.conditional;n.conditional=function(){return r}}var i=e('<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'+n.src+'"'+'style="display:block;position:absolute;z-index:-1;"/>');return this.each(function(){var r=e(this);if(n.conditional(this)===false){return}var o=r.children("iframe.bgiframe");var u=o.length===0?i.clone():o;u.css({top:n.top=="auto"?(parseInt(r.css("borderTopWidth"),10)||0)*-1+"px":t(n.top),left:n.left=="auto"?(parseInt(r.css("borderLeftWidth"),10)||0)*-1+"px":t(n.left),width:n.width=="auto"?this.offsetWidth+"px":t(n.width),height:n.height=="auto"?this.offsetHeight+"px":t(n.height),opacity:n.opacity===true?0:undefined});if(o.length===0){r.prepend(u)}})};e.fn.bgIframe=e.fn.bgiframe});/* (c) Atypon
 This provides support for modal dialogs.
 Any link having data-link=modal attribute will trigger a pop up with the content cloned from data-target attribute. */
(function($, window, document, undefined) {

    var ModalDialog = {

        init: function() {
            this.bindUIActions();
        },

        bindUIActions: function() {
            $(document).on("click", "a[data-link=modal]", function(e) {
                ModalDialog.constructModal(e, $(this));
            });
        },

        constructModal: function(e, modal){

            var self = modal,
                id =self.attr('data-target'),
                position = self.attr('data-target-position'),

                lastFocus = self,
                index = 0;

            var pageY, link;
            var fixedPane = '';
            if (document.getElementById("fixedPane") !== null) {
                pageY = e.pageY - $("#fixedPane").height();
                link = $(e.target);
                fixedPane = $(link).parents("#fixedPane").css("position");
            }

            e.preventDefault();
            e.stopPropagation();


            if($(".modal-dialog-mask "+id).length < 1){
                $(".modal-dialog").remove();
                var dataClass = self.attr('data-class'),
                // copy content
                    $content = $(id).clone(),
                // create close button
                    $close = $("<div/>")
                        .addClass('closeBtn')
                        .html("X")
                        .attr("role", "button")
                        .attr("aria-label", "close window")
                        .attr("tabindex", 0)
                        .click(onRemove),
                // create modal dialog
                    complianceId = id.substring(1) + "_compliance",
                    $modal = $("<div/>")
                        .addClass("modal-dialog")
                        .addClass(dataClass)
                        .attr("role", "alertdialog")
                        .attr("aria-describedby", complianceId)
                        .attr("tabindex", -1)
                        .append($close)
                        .append($content),
                // create mask
                    $mask = $("<div/>")
                        .addClass('modal-dialog-mask')
                        .data('modal', $modal)
                        .click(onRemove)
                        .appendTo(document.body);

                //attach onRemove event to a cancelLink if it exists
                $content.find(".cancelLink, .caption a").click(onRemove);
                $content.find(".caption").attr("id", complianceId);

                $modal.data('mask', $mask)
                    .appendTo(document.body);

                if(position != null) {
                    $modal
                        .position({
                            my: position,
                            at: position,
                            of: "#" + $(this).attr('id')
                        });
                } else {
                    if($modal.find(".coverImg") != null && $modal.find(".coverImg").attr("imgSrc") != null && $modal.find("img.largeCoverImg").length == 0){
                        var imgsrc = $modal.find(".coverImg").attr("imgSrc");
                        var $img = $("<img class='largeCoverImg' src='" + imgsrc + "'/>");
                        if($modal.find(".coverImg a").length > 0) {
                            $modal.find(".coverImg a").append($img);
                        }else{
                            $modal.find(".coverImg").append($img);
                        }
                    }
                    if($modal.find("img").length > 0 ){
                        $modal.find("img").load(function(){
                            $modal
                                .position({
                                    my: "center",
                                    at: "center",
                                    of: window
                                });
                            var coverImageContainer = $('.coverImgContainer');
                            if (coverImageContainer.length > 0) {
                                var height = coverImageContainer.height();
                                var dilogHeight = $(".modal-dialog").height();
                                $(".modal-dialog").css("height", dilogHeight + "px");
                                if($('.modal-dialog').height() > window.innerHeight-50){
                                    $('.modal-dialog').css('position','absolute');
                                    $('.modal-dialog').css('top',50);
                                }
                            }
                        });
                    }
                    else{
                        $modal
                            .position({
                                my: "center",
                                at: "center",
                                of: window
                            });
                    }
                }
                var focusableElements = $('.modal-dialog').find(':focusable');

                var x = window.scrollX, y = window.scrollY;
                // set focus to first element in dialog

                $modal.load(function(){
                    focusableElements[0].focus();
                });

                $mask.bgiframe();
                $content.bgiframe();
            }else{
                $(".modal-dialog-mask").show();
                $(".modal-dialog").show();
                $(".modal-dialog-mask").position({my: "center",at: "center",of: window});
            }
            $('body').css("overflow","auto");

            $(".modal-dialog").on("keydown", function(e) {

                if($(".modal-dialog").is(":visible"))
                {
                    if(($(".closeBtn").is(":focus")) && (((e.keyCode || e.which) == $.ui.keyCode.ENTER)))
                    {// Esc = 27
                        e.preventDefault();
                        onRemove(e);
                    }
                    if(((e.keyCode || e.which) == $.ui.keyCode.ESCAPE))
                    {// Esc = 27
                        onRemove(e);
                    }


                    if(e.shiftKey && (e.keyCode || e.which) == $.ui.keyCode.TAB)
                    {
                        prevTab();

                    }
                    else if ((e.keyCode || e.which) == $.ui.keyCode.TAB)
                    { // Tab = 9

                        nextTab();
                    }
                }


                function prevTab() {
                    if (index == 0)
                    {
                        e.preventDefault();
                        focusableElements[focusableElements.length - 1].focus()
                        index = focusableElements.length - 1;
                    } else{
                        index--;
                        e.preventDefault();
                        focusableElements[index].focus();
                    }
                }

                function nextTab() {
                    if(index == focusableElements.length - 1){
                        e.preventDefault();
                        focusableElements[0].focus();
                        index = 0;
                    }else{
                        index++;
                        e.preventDefault();
                        focusableElements[index].focus();
                    }
                }
            });

            function onRemove(e) {
                $(".modal-dialog-mask").remove();
                $(".modal-dialog").remove();
                $('body').css("overflow","auto");

                if (fixedPane === "fixed") {
                    window.scrollTo(0, pageY);
                } else {
                    lastFocus.focus();
                }
            }
        }

    };



    $(document).ready(ModalDialog.init());
    if (window.PB && window.PB.$) {
        // make this module reinitializes in design mode
        window.PB.$(document.documentElement).on("ScopeModified ScopeLoaded", ModalDialog.init());
    }

})(jQuery, window, document);(function($) {
    function init() {
        $(".hoverLayer").each(function() {
            var layer = jQuery(this);
            layer.parent().find(".layerTrigger").add(layer).off("mouseenter mouseleave").hover(function() {
                layer.show()
            }, function() {
                layer.hide()
            });
        });
    }

    $(document).ready(init);
    if (window.PB && window.PB.$) {
        // make this module reinitializes in design mode
        window.PB.$(document.documentElement).on("ScopeModified ScopeLoaded", init);
    }

})(jQuery);var AJAX_CONTENT = {

    loadData : function() {
        function onDataLoaded(html) {
            var $this = this;
            var $html = $("<div>" + $.trim(html) + "</div>");
            $this.data('ajax-content-loaded', true);
            $this.html(html);
            var hideWhenEmpty = $html.find(".hideWhenEmpty");
            if (hideWhenEmpty.length > 0){
                var wrapperWidget = $this.closest("."+$.trim(hideWhenEmpty.html()));
                wrapperWidget.hide();
            }
        }

        function onDataLoadingFailure() {
            $(this).html("<p>No data is available</p>");
        }

        $("[data-ajax-content]").each(function () {
            var container = $(this);
            if (!container.data('ajax-content-loaded')) {
                var data = {};
                var prefix = "ajax";
                var $inputs = $(":input", container);
                var dataArray = $inputs.serializeArray();
                for (var idx  = 0; idx < dataArray.length; ++idx) {
                    var item = dataArray[idx];
                    data[item.name] = item.value;
                }
                var url = container.data('ajax-content');
                $.ajax({
                    type:'POST',
                    dataType:'html',
                    url:url,
                    context:container,
                    data:data,
                    success:onDataLoaded,
                    error:onDataLoadingFailure
                });
            }
        });
    }
};

(function ($) {
    $(document).ready(function() {
        AJAX_CONTENT.loadData()
    });
    if (window.PB && window.PB.$) {
        // make this module reinitializes in design mode
        window.PB.$(document.documentElement).on("WidgetReloaded", AJAX_CONTENT.loadData());
    }
})(jQuery);
/**
* @preserve HTML5 Shiv prev3.7.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
*/
;(function(window, document) {
/*jshint evil:true */
  /** version */
  var version = '3.7.0';

  /** Preset options */
  var options = window.html5 || {};

  /** Used to skip problem elements */
  var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

  /** Not all elements can be cloned in IE **/
  var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i;

  /** Detect whether the browser supports default html5 styles */
  var supportsHtml5Styles;

  /** Name of the expando, to work with multiple documents or to re-shiv one document */
  var expando = '_html5shiv';

  /** The id for the the documents expando */
  var expanID = 0;

  /** Cached data for each document */
  var expandoData = {};

  /** Detect whether the browser supports unknown elements */
  var supportsUnknownElements;

  (function() {
    try {
        var a = document.createElement('a');
        a.innerHTML = '<xyz></xyz>';
        //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
        supportsHtml5Styles = ('hidden' in a);

        supportsUnknownElements = a.childNodes.length == 1 || (function() {
          // assign a false positive if unable to shiv
          (document.createElement)('a');
          var frag = document.createDocumentFragment();
          return (
            typeof frag.cloneNode == 'undefined' ||
            typeof frag.createDocumentFragment == 'undefined' ||
            typeof frag.createElement == 'undefined'
          );
        }());
    } catch(e) {
      // assign a false positive if detection fails => unable to shiv
      supportsHtml5Styles = true;
      supportsUnknownElements = true;
    }

  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a style sheet with the given CSS text and adds it to the document.
   * @private
   * @param {Document} ownerDocument The document.
   * @param {String} cssText The CSS text.
   * @returns {StyleSheet} The style element.
   */
  function addStyleSheet(ownerDocument, cssText) {
    var p = ownerDocument.createElement('p'),
        parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

    p.innerHTML = 'x<style>' + cssText + '</style>';
    return parent.insertBefore(p.lastChild, parent.firstChild);
  }

  /**
   * Returns the value of `html5.elements` as an array.
   * @private
   * @returns {Array} An array of shived element node names.
   */
  function getElements() {
    var elements = html5.elements;
    return typeof elements == 'string' ? elements.split(' ') : elements;
  }

    /**
   * Returns the data associated to the given document
   * @private
   * @param {Document} ownerDocument The document.
   * @returns {Object} An object of data.
   */
  function getExpandoData(ownerDocument) {
    var data = expandoData[ownerDocument[expando]];
    if (!data) {
        data = {};
        expanID++;
        ownerDocument[expando] = expanID;
        expandoData[expanID] = data;
    }
    return data;
  }

  /**
   * returns a shived element for the given nodeName and document
   * @memberOf html5
   * @param {String} nodeName name of the element
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived element.
   */
  function createElement(nodeName, ownerDocument, data){
    if (!ownerDocument) {
        ownerDocument = document;
    }
    if(supportsUnknownElements){
        return ownerDocument.createElement(nodeName);
    }
    if (!data) {
        data = getExpandoData(ownerDocument);
    }
    var node;

    if (data.cache[nodeName]) {
        node = data.cache[nodeName].cloneNode();
    } else if (saveClones.test(nodeName)) {
        node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
    } else {
        node = data.createElem(nodeName);
    }

    // Avoid adding some elements to fragments in IE < 9 because
    // * Attributes like `name` or `type` cannot be set/changed once an element
    //   is inserted into a document/fragment
    // * Link elements with `src` attributes that are inaccessible, as with
    //   a 403 response, will cause the tab/window to crash
    // * Script elements appended to fragments will execute when their `src`
    //   or `text` property is set
    return node.canHaveChildren && !reSkip.test(nodeName) && !node.tagUrn ? data.frag.appendChild(node) : node;
  }

  /**
   * returns a shived DocumentFragment for the given document
   * @memberOf html5
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived DocumentFragment.
   */
  function createDocumentFragment(ownerDocument, data){
    if (!ownerDocument) {
        ownerDocument = document;
    }
    if(supportsUnknownElements){
        return ownerDocument.createDocumentFragment();
    }
    data = data || getExpandoData(ownerDocument);
    var clone = data.frag.cloneNode(),
        i = 0,
        elems = getElements(),
        l = elems.length;
    for(;i<l;i++){
        clone.createElement(elems[i]);
    }
    return clone;
  }

  /**
   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
   * @private
   * @param {Document|DocumentFragment} ownerDocument The document.
   * @param {Object} data of the document.
   */
  function shivMethods(ownerDocument, data) {
    if (!data.cache) {
        data.cache = {};
        data.createElem = ownerDocument.createElement;
        data.createFrag = ownerDocument.createDocumentFragment;
        data.frag = data.createFrag();
    }


    ownerDocument.createElement = function(nodeName) {
      //abort shiv
      if (!html5.shivMethods) {
          return data.createElem(nodeName);
      }
      return createElement(nodeName, ownerDocument, data);
    };

    ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
      'var n=f.cloneNode(),c=n.createElement;' +
      'h.shivMethods&&(' +
        // unroll the `createElement` calls
        getElements().join().replace(/[\w\-:]+/g, function(nodeName) {
          data.createElem(nodeName);
          data.frag.createElement(nodeName);
          return 'c("' + nodeName + '")';
        }) +
      ');return n}'
    )(html5, data.frag);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivDocument(ownerDocument) {
    if (!ownerDocument) {
        ownerDocument = document;
    }
    var data = getExpandoData(ownerDocument);

    if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
      data.hasCSS = !!addStyleSheet(ownerDocument,
        // corrects block display not defined in IE6/7/8/9
        'article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}' +
        // adds styling not present in IE6/7/8/9
        'mark{background:#FF0;color:#000}' +
        // hides non-rendered elements
        'template{display:none}'
      );
    }
    if (!supportsUnknownElements) {
      shivMethods(ownerDocument, data);
    }
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The `html5` object is exposed so that more elements can be shived and
   * existing shiving can be detected on iframes.
   * @type Object
   * @example
   *
   * // options can be changed before the script is included
   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
   */
  var html5 = {

    /**
     * An array or space separated string of node names of the elements to shiv.
     * @memberOf html5
     * @type Array|String
     */
    'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video',

    /**
     * current version of html5shiv
     */
    'version': version,

    /**
     * A flag to indicate that the HTML5 style sheet should be inserted.
     * @memberOf html5
     * @type Boolean
     */
    'shivCSS': (options.shivCSS !== false),

    /**
     * Is equal to true if a browser supports creating unknown/HTML5 elements
     * @memberOf html5
     * @type boolean
     */
    'supportsUnknownElements': supportsUnknownElements,

    /**
     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
     * methods should be overwritten.
     * @memberOf html5
     * @type Boolean
     */
    'shivMethods': (options.shivMethods !== false),

    /**
     * A string to describe the type of `html5` object ("default" or "default print").
     * @memberOf html5
     * @type String
     */
    'type': 'default',

    // shivs the document according to the specified `html5` object options
    'shivDocument': shivDocument,

    //creates a shived element
    createElement: createElement,

    //creates a shived documentFragment
    createDocumentFragment: createDocumentFragment
  };

  /*--------------------------------------------------------------------------*/

  // expose html5
  window.html5 = html5;

  // shiv the document
  shivDocument(document);

  /*------------------------------- Print Shiv -------------------------------*/

  /** Used to filter media types */
  var reMedia = /^$|\b(?:all|print)\b/;

  /** Used to namespace printable elements */
  var shivNamespace = 'html5shiv';

  /** Detect whether the browser supports shivable style sheets */
  var supportsShivableSheets = !supportsUnknownElements && (function() {
    // assign a false negative if unable to shiv
    var docEl = document.documentElement;
    return !(
      typeof document.namespaces == 'undefined' ||
      typeof document.parentWindow == 'undefined' ||
      typeof docEl.applyElement == 'undefined' ||
      typeof docEl.removeNode == 'undefined' ||
      typeof window.attachEvent == 'undefined'
    );
  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Wraps all HTML5 elements in the given document with printable elements.
   * (eg. the "header" element is wrapped with the "html5shiv:header" element)
   * @private
   * @param {Document} ownerDocument The document.
   * @returns {Array} An array wrappers added.
   */
  function addWrappers(ownerDocument) {
    var node,
        nodes = ownerDocument.getElementsByTagName('*'),
        index = nodes.length,
        reElements = RegExp('^(?:' + getElements().join('|') + ')$', 'i'),
        result = [];

    while (index--) {
      node = nodes[index];
      if (reElements.test(node.nodeName)) {
        result.push(node.applyElement(createWrapper(node)));
      }
    }
    return result;
  }

  /**
   * Creates a printable wrapper for the given element.
   * @private
   * @param {Element} element The element.
   * @returns {Element} The wrapper.
   */
  function createWrapper(element) {
    var node,
        nodes = element.attributes,
        index = nodes.length,
        wrapper = element.ownerDocument.createElement(shivNamespace + ':' + element.nodeName);

    // copy element attributes to the wrapper
    while (index--) {
      node = nodes[index];
      node.specified && wrapper.setAttribute(node.nodeName, node.nodeValue);
    }
    // copy element styles to the wrapper
    wrapper.style.cssText = element.style.cssText;
    return wrapper;
  }

  /**
   * Shivs the given CSS text.
   * (eg. header{} becomes html5shiv\:header{})
   * @private
   * @param {String} cssText The CSS text to shiv.
   * @returns {String} The shived CSS text.
   */
  function shivCssText(cssText) {
    var pair,
        parts = cssText.split('{'),
        index = parts.length,
        reElements = RegExp('(^|[\\s,>+~])(' + getElements().join('|') + ')(?=[[\\s,>+~#.:]|$)', 'gi'),
        replacement = '$1' + shivNamespace + '\\:$2';

    while (index--) {
      pair = parts[index] = parts[index].split('}');
      pair[pair.length - 1] = pair[pair.length - 1].replace(reElements, replacement);
      parts[index] = pair.join('}');
    }
    return parts.join('{');
  }

  /**
   * Removes the given wrappers, leaving the original elements.
   * @private
   * @params {Array} wrappers An array of printable wrappers.
   */
  function removeWrappers(wrappers) {
    var index = wrappers.length;
    while (index--) {
      wrappers[index].removeNode();
    }
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document for print.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivPrint(ownerDocument) {
    var shivedSheet,
        wrappers,
        data = getExpandoData(ownerDocument),
        namespaces = ownerDocument.namespaces,
        ownerWindow = ownerDocument.parentWindow;

    if (!supportsShivableSheets || ownerDocument.printShived) {
      return ownerDocument;
    }
    if (typeof namespaces[shivNamespace] == 'undefined') {
      namespaces.add(shivNamespace);
    }

    function removeSheet() {
      clearTimeout(data._removeSheetTimer);
      if (shivedSheet) {
          shivedSheet.removeNode(true);
      }
      shivedSheet= null;
    }

    ownerWindow.attachEvent('onbeforeprint', function() {

      removeSheet();

      var imports,
          length,
          sheet,
          collection = ownerDocument.styleSheets,
          cssText = [],
          index = collection.length,
          sheets = Array(index);

      // convert styleSheets collection to an array
      while (index--) {
        sheets[index] = collection[index];
      }
      // concat all style sheet CSS text
      while ((sheet = sheets.pop())) {
        // IE does not enforce a same origin policy for external style sheets...
        // but has trouble with some dynamically created stylesheets
        if (!sheet.disabled && reMedia.test(sheet.media)) {

          try {
            imports = sheet.imports;
            length = imports.length;
          } catch(er){
            length = 0;
          }

          for (index = 0; index < length; index++) {
            sheets.push(imports[index]);
          }

          try {
            cssText.push(sheet.cssText);
          } catch(er){}
        }
      }

      // wrap all HTML5 elements with printable elements and add the shived style sheet
      cssText = shivCssText(cssText.reverse().join(''));
      wrappers = addWrappers(ownerDocument);
      shivedSheet = addStyleSheet(ownerDocument, cssText);

    });

    ownerWindow.attachEvent('onafterprint', function() {
      // remove wrappers, leaving the original elements, and remove the shived style sheet
      removeWrappers(wrappers);
      clearTimeout(data._removeSheetTimer);
      data._removeSheetTimer = setTimeout(removeSheet, 500);
    });

    ownerDocument.printShived = true;
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  // expose API
  html5.type += ' print';
  html5.shivPrint = shivPrint;

  // shiv for print
  shivPrint(document);

}(this, document));
/*!
 * selectivizr v1.0.2 - (c) Keith Clark, freely distributable under the terms of the MIT license.
 * selectivizr.com
 */
(function(j){function A(a){return a.replace(B,h).replace(C,function(a,d,b){for(var a=b.split(","),b=0,e=a.length;b<e;b++){var s=D(a[b].replace(E,h).replace(F,h))+o,l=[];a[b]=s.replace(G,function(a,b,c,d,e){if(b){if(l.length>0){var a=l,f,e=s.substring(0,e).replace(H,i);if(e==i||e.charAt(e.length-1)==o)e+="*";try{f=t(e)}catch(k){}if(f){e=0;for(c=f.length;e<c;e++){for(var d=f[e],h=d.className,j=0,m=a.length;j<m;j++){var g=a[j];if(!RegExp("(^|\\s)"+g.className+"(\\s|$)").test(d.className)&&g.b&&(g.b===!0||g.b(d)===!0))h=u(h,g.className,!0)}d.className=h}}l=[]}return b}else{if(b=c?I(c):!v||v.test(d)?{className:w(d),b:!0}:null)return l.push(b),"."+b.className;return a}})}return d+a.join(",")})}function I(a){var c=!0,d=w(a.slice(1)),b=a.substring(0,5)==":not(",e,f;b&&(a=a.slice(5,-1));var l=a.indexOf("(");l>-1&&(a=a.substring(0,l));if(a.charAt(0)==":")switch(a.slice(1)){case "root":c=function(a){return b?a!=p:a==p};break;case "target":if(m==8){c=function(a){function c(){var d=location.hash,e=d.slice(1);return b?d==i||a.id!=e:d!=i&&a.id==e}k(j,"hashchange",function(){g(a,d,c())});return c()};break}return!1;case "checked":c=function(a){J.test(a.type)&&k(a,"propertychange",function(){event.propertyName=="checked"&&g(a,d,a.checked!==b)});return a.checked!==b};break;case "disabled":b=!b;case "enabled":c=function(c){if(K.test(c.tagName))return k(c,"propertychange",function(){event.propertyName=="$disabled"&&g(c,d,c.a===b)}),q.push(c),c.a=c.disabled,c.disabled===b;return a==":enabled"?b:!b};break;case "focus":e="focus",f="blur";case "hover":e||(e="mouseenter",f="mouseleave");c=function(a){k(a,b?f:e,function(){g(a,d,!0)});k(a,b?e:f,function(){g(a,d,!1)});return b};break;default:if(!L.test(a))return!1}return{className:d,b:c}}function w(a){return M+"-"+(m==6&&N?O++:a.replace(P,function(a){return a.charCodeAt(0)}))}function D(a){return a.replace(x,h).replace(Q,o)}function g(a,c,d){var b=a.className,c=u(b,c,d);if(c!=b)a.className=c,a.parentNode.className+=i}function u(a,c,d){var b=RegExp("(^|\\s)"+c+"(\\s|$)"),e=b.test(a);return d?e?a:a+o+c:e?a.replace(b,h).replace(x,h):a}function k(a,c,d){a.attachEvent("on"+c,d)}function r(a,c){if(/^https?:\/\//i.test(a))return c.substring(0,c.indexOf("/",8))==a.substring(0,a.indexOf("/",8))?a:null;if(a.charAt(0)=="/")return c.substring(0,c.indexOf("/",8))+a;var d=c.split(/[?#]/)[0];a.charAt(0)!="?"&&d.charAt(d.length-1)!="/"&&(d=d.substring(0,d.lastIndexOf("/")+1));return d+a}function y(a){if(a)return n.open("GET",a,!1),n.send(),(n.status==200?n.responseText:i).replace(R,i).replace(S,function(c,d,b,e,f){return y(r(b||f,a))}).replace(T,function(c,d,b){d=d||i;return" url("+d+r(b,a)+d+") "});return i}function U(){var a,c;a=f.getElementsByTagName("BASE");for(var d=a.length>0?a[0].href:f.location.href,b=0;b<f.styleSheets.length;b++)if(c=f.styleSheets[b],c.href!=i&&(a=r(c.href,d)))c.cssText=A(y(a));q.length>0&&setInterval(function(){for(var a=0,c=q.length;a<c;a++){var b=q[a];if(b.disabled!==b.a)b.disabled?(b.disabled=!1,b.a=!0,b.disabled=!0):b.a=b.disabled}},250)}if(!/*@cc_on!@*/true){var f=document,p=f.documentElement,n=function(){if(j.XMLHttpRequest)return new XMLHttpRequest;try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(a){return null}}(),m=/MSIE (\d+)/.exec(navigator.userAgent)[1];if(!(f.compatMode!="CSS1Compat"||m<6||m>8||!n)){var z={NW:"*.Dom.select",MooTools:"$$",DOMAssistant:"*.$",Prototype:"$$",YAHOO:"*.util.Selector.query",Sizzle:"*",jQuery:"*",dojo:"*.query"},t,q=[],O=0,N=!0,M="slvzr",R=/(\/\*[^*]*\*+([^\/][^*]*\*+)*\/)\s*/g,S=/@import\s*(?:(?:(?:url\(\s*(['"]?)(.*)\1)\s*\))|(?:(['"])(.*)\3))[^;]*;/g,T=/\burl\(\s*(["']?)(?!data:)([^"')]+)\1\s*\)/g,L=/^:(empty|(first|last|only|nth(-last)?)-(child|of-type))$/,B=/:(:first-(?:line|letter))/g,C=/(^|})\s*([^\{]*?[\[:][^{]+)/g,G=/([ +~>])|(:[a-z-]+(?:\(.*?\)+)?)|(\[.*?\])/g,H=/(:not\()?:(hover|enabled|disabled|focus|checked|target|active|visited|first-line|first-letter)\)?/g,P=/[^\w-]/g,K=/^(INPUT|SELECT|TEXTAREA|BUTTON)$/,J=/^(checkbox|radio)$/,v=m>6?/[\$\^*]=(['"])\1/:null,E=/([(\[+~])\s+/g,F=/\s+([)\]+~])/g,Q=/\s+/g,x=/^\s*((?:[\S\s]*\S)?)\s*$/,i="",o=" ",h="$1";(function(a,c){function d(){try{p.doScroll("left")}catch(a){setTimeout(d,50);return}b("poll")}function b(d){if(!(d.type=="readystatechange"&&f.readyState!="complete")&&((d.type=="load"?a:f).detachEvent("on"+d.type,b,!1),!e&&(e=!0)))c.call(a,d.type||d)}var e=!1,g=!0;if(f.readyState=="complete")c.call(a,i);else{if(f.createEventObject&&p.doScroll){try{g=!a.frameElement}catch(h){}g&&d()}k(f,"readystatechange",b);k(a,"load",b)}})(j,function(){for(var a in z){var c,d,b=j;if(j[a]){for(c=z[a].replace("*",a).split(".");(d=c.shift())&&(b=b[d]););if(typeof b=="function"){t=b;U();break}}}})}}})(this);/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();jQuery(function ($) {
    var $primaryNav = $('.primaryNav');
    var hideAllSubMenus = function () {
        $primaryNav.find('ul').hide();
    };
    $primaryNav.find('a').focus(function () {
        var $link = $(this);
        var $menu = $link.is('.expander')
                ? $link.siblings('ul')  // expander is for its sibling
                : $link.closest('ul');  // other links work with their parents
        var isPrimary = $menu.is($primaryNav);
        if (isPrimary || $menu.is(':hidden')) {                                     // link is in primary menu, or sub-menu it belongs to is hidden
            hideAllSubMenus();                                          // hide all sub-menus
            if (!isPrimary)  $menu.show().parentsUntil($primaryNav, 'ul').show();   // show the correct one including its parents
        }
    });

    // How to get gracefully out of the menu?
    var handleGettingOutOfMenu = function () {
        if ($primaryNav.find(':focus').length === 0) {
            hideAllSubMenus();
        }
    };
    var t;
    $primaryNav.focusout(function (e) {
        if (t) clearTimeout(t);
        t = setTimeout(handleGettingOutOfMenu, 500);
    });

    $(".hoverShow a").focus(function(){
        $(".hoverShow").css({'left': '0px', 'top':'auto'});
    });
    $(".hoverShow").focusout(function(){
        $(this).css({'left': '-9999px', 'top':'auto'});
    });
});$(function () {
    $.widget("custom.elautocomplete", $.ui.autocomplete, {
        _renderItem:function (ul, item) {
            return $("<li></li>")
                .data("ui-autocomplete-item", item)
                .append($("<a></a>").html(item.label))
                .appendTo(ul);
        },

        _renderMenu:function (ul, items) {
            var self = this;
            var type = "";
            $.each(items, function (index, item) {
                if (type != '' && item.type != type) {
                    ul.append("<li class='ui-autocomplete-separator'>" + item.type + "</li>");
                }
                type = item.type;

                var payload;
                if (type == 'Result') {
                    payload = {
                        label:item.medicalName,
                        value:item.medicalName
                    }
                }
                if (type == 'Related') {
                    payload = {
                        label:item.medicalName,
                        value:item.medicalName
                    }
                }
                self._renderItem(ul, payload);
            });
        }
    });

    $.widget("custom.journalAutoComplete", $.ui.autocomplete, {
        _renderItem:function (ul, item) {

        return $("<li></li>").data("item.autocomplete", item).append("<a>" + __highlight(item.label, this.term) + "</a>").appendTo(ul);

        }
    });

    $('body').on('change' , 'select[name^="occurrences"]', function(){
         disableIfAuthor(this);
     });

    function __highlight(s, t) {
      var matcher = new RegExp("("+$.ui.autocomplete.escapeRegex(t)+")", "ig" );
      return s.replace(matcher, "<em>$1</em>");
    }



});

function disableIfAuthor(selector){
    name =  $(selector).attr("name");
    name = name.replace("occurrences","");
    disable = false;
    if ($(selector).val() =="author"){
       disable = true;
    }
    var $autoComp = $('input[name="' + "searchText"+ name +'"] .autoComplete');

    if ($autoComp.length > 0  &&  $autoComp.hasclass("ui-autocomplete-input")){
        $autoComp.elautocomplete( "option", "disabled", disable );
    }
}
;// (c) Atypon
// Compact Issue Selector Widget
(function($) {

    var Dropdown = {

        init: function() {
            var $widgets = $(".widget-compact-issue-dropdown-selector");

            if ($widgets.length) {
                $(".widget-compact-issue-dropdown-selector .select-decade")
                    .off()
                    .on('change', Dropdown.onDecadeChanged);
                $(".widget-compact-issue-dropdown-selector .select-volume")
                    .off()
                    .on('change', Dropdown.onVolumeChanged);
                $(".widget-compact-issue-dropdown-selector .go")
                    .off()
                    .click(Dropdown.onGoClicked);
            }
        },

        onDecadeChanged: function() {
            var $decade = $(this),
                $widget = $decade.closest('.widget');
            // Make the correspondent volume dropdown available
            $(".select-volume", $widget).addClass('x-hidden');
            $(".select-volume.id-" + $decade.val(), $widget).removeClass('x-hidden');

            $(".select-issue").addClass("x-hidden");
            $(".select-volume.id-" + $decade.val(), $widget).val("disabled");
            $(".select-issue.id-disabled").removeClass('x-hidden');
        },

        onVolumeChanged: function(event, options) {
            var $volume = $(this),
                $widget = $volume.closest('.widget'),
                $decade = $("select.select-decade", $widget),
                $issues = $(".select-issue.id-" + $volume.val(), $widget),
                $issueDisplayFilter = $volume.closest(".widget-body").find(".issueDisplayFilterFileld");

            if ($issues.length == 0) {
                // Issues in this volume have not been loaded yet.
                Dropdown.selectIssues($widget, 'loading');
                $.ajax({
                    type: 'GET',
                    url: '/pb/widgets/compact-issue-selector/issues/dropdown',
                    dataType: 'text',
                    data: {
                        journalCode: $widget.data('journal-code'),
                        decade: $decade.val(),
                        volume: $volume.val(),
                        issueDisplayFilter: $issueDisplayFilter.val(),
                        format: $widget.data('issue-title-format')
                    },
                    success: Dropdown.onIssuesLoaded,
                    context: $.extend({
                        $widget: $widget,
                        $volume: $volume,
                        volume: $volume.val()
                    }, options)
                });
            } else {
                Dropdown.selectIssues($widget, $volume.val());
            }
        },

        onIssuesLoaded: function(content) {
            var $widget = this.$widget,
                $volume = this.$volume,
                volume = this.volume,
                i;

            if (volume == $volume.val()) {
                $(".select-issue-container", $widget).append(content);
                Dropdown.selectIssues($widget, volume);
            }
        },

        onGoClicked: function() {
            var $go = $(this),
                $widget = $go.closest('.widget'),
                $issue = $(".select-issue:visible", $widget),
                issue = $issue.val();

            if (issue != "")
            {
                window.location = issue;
            }
            else
            { //508 compliance: should be add an error message to notify user.

                var $errorMsg = $widget.find('h5.error');
                if($errorMsg.length == 0)
                {
                    $errorMsg = $('<h5/>')
                        .attr('class', 'error')
                        .attr('role', 'alert')
                        .attr('tabindex', -1)
                        .append('Please select a volume');

                    $widget
                        .find('select.select-volume:visible')
                        .closest('div')
                        .prepend($errorMsg);
                }
                $errorMsg.focus();
            }
        },

        selectIssues: function($widget, volume) {
            $(".select-issue", $widget).addClass('x-hidden');
            $(".select-issue.id-" + volume, $widget).removeClass('x-hidden');
        }
    };

    var Accordion = {

        init: function() {
            var $widgets = $(".widget-compact-issue-accordion-selector");

            if ($widgets.length > 0) {
                $(".widget-compact-issue-accordion-selector .select-decade")
                    .off()
                    .on("change", Accordion.onDecadeChanged)
                    .trigger("change");
                $(".widget-compact-issue-accordion-selector .box > .header")
                    .off()
                    .click(Accordion.onHeaderClicked);
                $(".widget-compact-issue-accordion-selector .volume")
                    .off()
                    .click(Accordion.onVolumeClicked);

                $(".widget-compact-issue-accordion-selector .volume a").click(function(event) {
                    event.stopPropagation();
                })
            }
        },

        onHeaderClicked: function() {
            var $header = $(this),
                $widget = $header.closest(".widget"),
                $decades = $(".decades", $widget);

            $decades.toggle('fast');
            $header.toggleClass("closed");
        },

        onDecadeChanged: function() {
            var $decade = $(this),
                $widget = $decade.closest('.widget');
            $(".decade", $widget).addClass('x-hidden');
            $(".decade.id-" + $decade.val(), $widget).removeClass('x-hidden');
        },

        onVolumeClicked: function(event, options) {
            var $volume = $(this),
                volume = $volume.data('volume'),
                $widget = $volume.closest('.widget'),
                $decade = $(".select-decade", $widget),
                $issues = $(".volumeIssues", $volume),
                $issueDisplayFilter = $volume.closest(".widget-body").find(".issueDisplayFilterFileld"),
                $loading;

            if ($issues.length == 0) {
                $loading = $(".loading", $volume);
                if ($loading.length > 0) {
                    // already loading;
                    return;
                }
                $loading = $("<div/>")
                    .addClass("loading")
                    .text("Loading...");
                $volume.append($loading);
                // check if the issues have been already loaded
                // load issues
                $.ajax({
                    type: 'GET',
                    url: '/pb/widgets/compact-issue-selector/issues/list',
                    dataType: 'text',
                    data: {
                        journalCode: $widget.data('journal-code'),
                        decade: $decade.val(),
                        volume: volume,
                        issueDisplayFilter: $issueDisplayFilter.val(),
                        format: $widget.data('issue-title-format')
                    },
                    success: Accordion.onIssuesLoaded,
                    context: {
                        $widget: $widget,
                        $volume: $volume,
                        volume: volume
                    }
                });
            } else {
                $issues.toggle("fast");
            }
        },

        onIssuesLoaded: function(content) {
            var $widget = this.$widget,
                $volume = this.$volume,
                volume = this.volume;

            if ($(".volumeIssues", $volume).length > 0) {
                return;
            }
            $(".loading", $volume).remove();
            $volume.append($(content));
        }
    };


    function init() {
        Dropdown.init();
        Accordion.init();
    }

    $(document).ready(init);
    if (window.PB && window.PB.$) {
        // make this module reinitializes in design mode
        window.PB.$(document.documentElement).on("ScopeModified ScopeLoaded", init);
    }

})(jQuery);


/* LOI controller */
(function ($) {

    function onIssuesLoaded(text) {
        var $groupBody = this;
        $groupBody.html(text);
    }

    function onIssuesFailedToLoad() {
        var $groupBody = this;
        $groupBody.html("Failed to load");
    }

    function onClick(event) {
        event.preventDefault();
        var currentHash = location.hash;
        if (currentHash == '') {
            location.hash = 'decade=' + $(this).attr('name');
        } else if (currentHash.indexOf($(this).attr('name')) < 0 ){
            location.hash = currentHash + '&' + 'decade=' + $(this).attr('name');
        }
        var ajaxUrl = '/pb/widgets/loi/issues' ;

        if ($(this).attr("name").indexOf('coverIssueSelector') != '-1' ){
            ajaxUrl ='/pb/widgets/cover-issue-selector/loiViewIssues';
        }
        var $groupHeader = $(this);
        var $groupBody = $groupHeader.closest('.group').next();
        if ($groupHeader.is('.expanded')) {
            // we already have content, just hide the body
            $groupHeader.removeClass('expanded').addClass('collapsed');
            $groupBody.hide();
        } else {
            $groupHeader.removeClass('collapsed').addClass('expanded');
            // check if we have content
            if (!$groupBody.children().length) {
                var $loi = $groupHeader.closest('.loi');
                $groupBody.html("<p>Loading...</p>");
                var data = $.extend({
                    pbContext:$loi.data('context'),
                    widgetId: $loi.data('widget-id'),
                    journalCode: $loi.data('journal-code')
                }, $groupBody.data());
                $.ajax({
                    url:ajaxUrl,
                    type:'POST',
                    dataType:'text',
                    data:data,
                    context:$groupBody,
                    success:onIssuesLoaded,
                    error:onIssuesFailedToLoad
                });
            } else {
                $groupBody.show();
            }
        }
    }

    $(document).ready(function () {
        $("body").on('click', ".loi .group a", onClick);
        if (location.hash != '') {
            reloadOpenedDecades();
        }
    });

    function reloadOpenedDecades() {
        var decades = location.hash.substring(1); // removes #
        decades = decades.split('&');
        $.each(decades, function(i){
            var decade = decades[i].split('=');
            if (decade[0] == 'decade') {
                var $decadeElement = $('[name='+decade[1]+']');
                $decadeElement.click();
            }
        });
    }
})(jQuery);
jQuery(document).ready(function ($) {

    function onHtmlLoaded(html) {
        $(this).html(html);
    }

    // check if we need to refresh scopus citation count
    var $scopus = $("#articleToolsScopus");
    if ($scopus.data('outdated')) {
        $.ajax({
            type:'POST',
            dataType:'html',
            url:'/pb/widgets/ArticleTools/scopus',
            data: {
                pii: $scopus.data('pii')
            },
            context:$scopus,
            success:onHtmlLoaded
        });
    }
});

function openAboutImagesAndUsagePupUp(){
  var generator=window.open('','name','height=250,width=550,toolbar=0,menubar=0,resizable=1,scrollbars=yes');

  generator.document.write('<html><head>');
  generator.document.write('</head><body>');
  generator.document.write('<h2>Downloading Images</h2>');
  generator.document.write('<p>Images (including figures) are available for download into Microsoft PowerPoint. Please see the Terms and Conditions below.</p>');
  generator.document.write('<p>You may display, download, or print out images associated with this Site for personal, non-commercial and educational use provided that all copyright and other proprietary notices are kept intact. Educational use refers to classroom teaching, lectures, presentations, rounds, and other instructional activities. You will only display, distribute, or otherwise make such images from the applicable Site(s) available to students or other persons attending in-person presentations, lectures, rounds or other similar instructional activities presented or given by You. To use images in a poster presentation, publication or for any other similar use, permission must be requested through the <a href="http://www.elsevier.com/permissions" target="new">Elsevier Rights Department</a>.</p>');
  generator.document.write('<p>You may not otherwise copy, print, transmit, rent, license, lend, sell or modify any images from this Site or modify or remove any proprietary notices contained therein, or create derivative works based on materials therefrom. You also may not disseminate any portion of the applicable Site(s) subscribed to hereunder through electronic means except as outlined above, including mail lists, electronic bulletin boards or other online communities.</p>');
  generator.document.write('</body></html>');
  generator.document.close();
};(function($) {
    $(document).ready(function() {
        $('body')
            // preview link is clicked
            .on("click.preview", "a.previewLink", function(event) {
                event.preventDefault();
                var $link = $(this),
                    $citation = $link.closest('.articleCitation'),
                    $preview = $('.preview', $citation);

                if ($link.is(".selected")) {
                    $preview.hide();
                    $link.removeClass("selected");
                    $link.text($link.data('label'));
                } else {
                    $preview.show();
                    $link.addClass('selected');
                    var text = $link.text();
                    $link.data('label', text);
                    $link.text($link.data('label-hide') + " " + text);
                }
            })
            // close button is clicked on preview
            .on("click.preview", ".preview .closeBtn", function() {
                var $this = $(this),
                    $citation = $this.closest('.articleCitation'),
                    $preview = $('.preview', $citation),
                    $link = $('.previewLink', $citation);

                $preview.hide();
                $link.removeClass("selected");
                $link.text($link.data('label'));
            });

        $(".articleCitation .checkbox").show();
        $('.submitDropDown').change(function() {
            window.location = $(this).val();
        });
    });
})(jQuery);function changeSort(radio) {
    editSelectedSortType(radio);
    if (radio.checked)  window.location = $(radio).val();

}

/**
 * Atypon namespace - contains utility methods that may be useful in various places
 * @type {*}
 */
var ATYPON = jQuery.extend(ATYPON || {}, function ($) {

    /**
     * @param ids space separated list of ids - for example input form attribute
     * @returns jQuery object with elements selected by Ids
     */
    this.findByIds = function (ids) {
        return $("#" + ids.replace(/\s+/, ',#'));
    };

    /**
     * @param input - {jQuery} for an input, select, button...
     * @returns {jQuery} of the for input belongs to
     */
    this.findForm = function (input) {
        var fi = input.attr("form");                            // inputs can have form attribute linking them to specific form(s) - space separated ids
        return fi ? this.findByIds(fi) : input.closest("form");
    };

    /**
     * Extracts from the URL query string
     * Note: current implementation supports only one value per key
     * @param url
     * @returns {key:value}
     */
    this.parseQueryString = function (url) {
        var query = {};
        url.replace(/([^?=&]+)(=([^&]*))?/g, function ($0, $1, $2, $3) {
            query[$1] = decodeURIComponent(($3 != null)? $3.replace(/\+/g,"%20"):$3);
        });
        return query;
    };

    /**
     * Creates dom element optionally setting specific attributes
     * @param name  required element name
     * @param attributes optional {name:value}
     * @returns {HTMLElement}
     */
    this.createElement = function (name, attributes) {
        var e = document.createElement(name);
        return attributes ? $.extend(e, attributes) : e;
    };

    /**
     * Creates hidden input of given name and value
     * @param name  input name
     * @param value input value
     * @returns {HTMLElement}
     */
    this.createHidden = function (name, value) {
        return this.createElement("input", {type: "hidden", name: name, value: value});
    };

    /**
     * Append to the form hidden fields representing passed parameters
     * @param form {jQuery} form to append to
     * @param params    name value pairs that will become hidden field name and hidden field value
     */
    this.appendHidden = function (form, params) {
        $.each(params, function (n, v) {
            form.append(ATYPON.createHidden(n, v))
        });
    };


    /**
     * Hide all elements with class alterView and then show those elements specified by the selector
     * @param el {jQuery} element to switch wiew on
     * @param selector for elements that should be shown
     * @returns {jQuery} element it self
     */
    this.alterView = function (el, selector) {
        return el.find(".alterView").hide().filter(selector).show();
    };


    var ATYPON = this;
    return ATYPON;
}(jQuery));


(function ($) {
    $(document).ready(function () {

        // toggle all checkboxes in form
        $(".markAll").click(function () {
            var i = $(this);
            if (!i.is(":checkbox")) i = i.find(":checkbox");                    // markAll was not checkbox, try to find it in descendants
            ATYPON.findForm(i).find(':checkbox').prop('checked', i.prop("checked"));   // make all checkboxes the same as the current one
        });

        // links that suppose to submit forms
        $(".formAction").click(function (evt) {
            evt.preventDefault();
            var a = $(this);
            var form = ATYPON.findForm(a);
            var href = a.attr("href");
            var i = href.indexOf("?");
            if (i !== -1) {
                ATYPON.appendHidden(form, ATYPON.parseQueryString(href));
                href = href.substr(0, i);
            }
            form.attr("method","post").attr("action", href).data("submittedWith", $.trim(a.text())).submit();
        });

        // article tools form require at least one checkbox to be checked
        $(".articleToolLinks").removeClass("requiresJS").closest("form").submit(function (evt) {
            var f = $(this);
            if (f.find("input:checked").size() === 0) {
                evt.preventDefault();
                alert('Please select at least one article before clicking on the ' + f.data("submittedWith") + ' link.');
            }
        });

        // dialogs with optional toggle as a sibling
        $(".dialog").each(function () {
            var d = $(this);
            var isDraggable = d.attr("draggable") != 'false';
            var params = {closeOnEscape: true, autoOpen: d.hasClass("opened"),draggable: isDraggable,width:"auto",close:removeDialogErrors};
            var toggle = d.siblings(".toggle");
            if (toggle.length > 0) {
                toggle.click(function (evt) {
                    evt.preventDefault();
                    d.dialog(d.dialog("isOpen") ? "close" : "open");
                }).removeClass("requiresJS");
                var pos = toggle.filter(".dialogPosition").first();
                if (pos.length === 1) {
                    params.position = {of: pos[0], my: pos.attr("data-dialog-position-my") || "right top", at: pos.attr("data-dialog-position-at") || "right bottom"};
                }
            }
            var widget = d.dialog(params).dialog("widget");
            widget.addClass("ui-state-hover");      // hack for close button t be visible
            if (widget.bgiframe) widget.bgiframe(); // add iframe shim for IE
        });

        // The CME placeholder
        $('.more').click(function() {
            $(this).closest("ul").next('.toggle').toggle();
            return false;
        });
        initAutoComplete();
        removeRequireJs();
        removeDublicateTocHeading();
    });
})(jQuery);

function removeDialogErrors(event,ui){
    var isRemoveErrors = $(this).attr("removeErrors") == 'true';
    if(isRemoveErrors){
        $(this).find(".error").remove();
    }
}

function checkSelectedTab(){
    var tabsCollectionId = getURLParameter("tabColId");
    var tabIndex = getURLParameter("tabIdx");
    var $tabCollectionElem  = $("#"+tabsCollectionId);
    var $tabAlertsAnchor = $tabCollectionElem.find("li[data-index ='"+ tabIndex +"'] a");
    if ($tabAlertsAnchor.length){
        $tabAlertsAnchor .trigger("click");
    }

}

function setUrlParam(currentUrl, paramName , paramVal){
    var urlParts = currentUrl.split("?");

    var uriPart = urlParts[0];
    var paramPart;
    var hashPart = currentUrl.split("#")[1];
    if (urlParts[1]){
        paramPart = urlParts[1].split("#")[0];
    }

    if (paramPart.indexOf(paramName) !== -1){
        var re = new RegExp("(&)?"+paramName + "=.*?(&|$)", "i");
        if (paramPart.match(re)) {
            paramPart =  paramPart.replace(re, '$1' + paramName + "=" + paramVal +"&");
        }
    }else if (paramPart){
        paramPart += "&"+paramName+"="+paramVal;
    }else{
        paramPart +=  paramName+"="+paramVal;
    }

    var temp1 = uriPart+"?"+paramPart;
    if (hashPart){
        temp1 = temp1+"#"+hashPart;
    }
    return temp1;
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

function getURLParameterFromString(name, url) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1]
    );
}

function switchToFlv(player) {
    player = $(player).closest('.avPlayer-wrap');
    flvScript = player.find('.avPlayer-alt').html();
    player.find('div:first').html(flvScript);
    player.find('li.switchToFlv').remove();
}

function initAutoComplete(){

    // please include autoCompleteServerUrl.jsp in order for the auto complete to work
    $("input[name ^='searchText'].autoComplete").elautocomplete(searchAutoComplete);
}
var searchCache = {};
var searchAutoComplete ={
        delay: 100,
        source: function(request, response) {
          var q = request.term;
          if (searchCache[q] != null) {
            response(searchCache[q]);
            return;
          }

          $.ajax({
            url: $("input.autoCompleteServerURL").val(),
            dataType: "jsonp",
            data: {
              "q": q
            },
            success: function(data) {
                searchCache[q] = data.results;
              response(data.results);
            }
          });
        },
        minLength: 2,
        open: function() {
          $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        close: function() {
          $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
        }
     }
function confirmRedirection(redirectionUrl,message ){
    var redirect=confirm(message);
    if(redirect == true){
      window.location=  redirectionUrl
    }
}

function removeRequireJs(){
    $(".saveSearchLink").removeClass("requiresJS");
    $("fieldset.facet section").removeClass("requiresJS");
    $(".editSearch").removeClass("requiresJS");
}

function removeDublicateTocHeading(){
    var headerTxt = null;
    var parentClass = null;
    $(".heading.tocSectionHeading").each(function(){
        var currentHeaderText= $(this).text();
        var currentParentClass = $(this).closest("section").attr("class");
        if(currentHeaderText == headerTxt && parentClass == currentParentClass){
            $(this).remove();
        }else{
            headerTxt = currentHeaderText;
            parentClass = currentParentClass;
        }
    });
}

function formToJson(form) {

    var o = {};
    var skinBlock = {};
    var a = form.serializeArray();
    $.each(a, function () {
        if(this.name != "skin" && this.name != "active" && this.name != "inactive" && this.name != "background")
        {
            o[this.name] = this.value || '';
        }
        else
        {
            switch (this.name)
            {
                case "skin":
                    skinBlock["name"] = this.value;
                    break;
                case "active":
                    skinBlock[this.name] = this.value;
                    break;
                case "inactive":
                    skinBlock[this.name] = this.value;
                    break;
                case "background":
                    skinBlock[this.name] = this.value;
                    break;
            }
        }
    });
    o["skin"] = skinBlock;
    return o;
}

function isNullOrEmptyOrWhitespace(val) {
    return val === 'undefined' || val == null || val === '' || val.trim().length < 1;
};$(function() {
    $("input.categoryFilter").on("click", function(){
        $("input[name='categoryFilter']").remove();
        var form = $(this).closest("form");
        var categoryFilter = $("<input name='categoryFilter' type='hidden'/>").val($(this).attr("name"));
        $(form).append(categoryFilter);
        $(form).submit();
    });

    $("select[name='journalFilter']").on("change", function(){
        $(this).closest("form").submit();
    });
});
if (!Object.keys) Object.keys = function(o) {
    if (o !== Object(o))
        throw new TypeError('Object.keys called on a non-object');
    var k=[],p;
    for (p in o){
        if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
    }
    return k;
}

jQuery(document).ready(function() {
    if(typeof CitationSearchNS != 'undefined' && CitationSearchNS.citJrnlType == "1"){
               var journalNames = {} ;
               var valid;
               var unescapedTitle = $('<div/>').html(CitationSearchNS.citJrnTitle).text();
               var $JrnlSelection = $("<input/>").attr({id:'journalSearchFld', value:CitationSearchNS.citJrnTitle, autocomplete:'off'}).addClass('inpt')
                   .on("blur", function(){
                                  if($(this).val()=="No matches found" || $(this).text()=="No matches found") {
                                      $(this).val("");
                                      $(this).text("");
                                  }
                                  var frmtdJrnl = $(this).val().trim().toLowerCase();
                                  valid = false;
                                  $.each(journalNames, function(key, value) {
                                  if (key.toLowerCase() == frmtdJrnl){
                                      valid = true;
                                      $('#seriesIssn').val(journalNames[key]);
                                      return false;
                                  }
                                  });

                                  if (!valid){
                                      $(this).val("");
                                      $('#seriesIssn').val(" ");
                                  }
                              })
                   .attr("value",unescapedTitle)
                   .journalAutoComplete({
                                  source: function(request, response) {
                                      jQuery.getJSON("/action/doSearch", {searchType:"journalLookUp",rows:"10",searchText: request.term, resultType: "json"}, function(json) {
                                          if(Object.keys(json).length == 0){
                                              json["No matches found"] = 0;
                                          }
                                          journalNames = {} ;
                                          $.each(json, function(index ,obj){
                                              journalNames[index] = obj;
                                          });
                                          response( $.map( json, function(key1, val1) {
                                              return val1;
                                          }));
                                      });
                                  },
                                  minLength: 3,
                                  select: function(event, ui) {
                                      if (ui.item.value == 'No matches found') {
                                         jQuery('#seriesIssn').val('');
                                     }else{
                                          jQuery('#seriesIssn').val(journalNames[ui.item.value]);
                                     }
                                  }

                              });

               var $label = $("<label />").addClass('lbl').html("Journal:");
               var $fldSpan =$("<span/>").addClass('fld').append($label).append($JrnlSelection);
               var $hiddenISSN = $("<input/>").attr({type:'hidden', id:'seriesIssn', value:CitationSearchNS.citJrnISSN, name:'seriesISSN'});
               $("#citationSearchFrm").prepend($fldSpan).append($hiddenISSN );
    }

    $('#citationDoiFind').submit(function(ev) {
        ev.preventDefault();
        if ($('#findByCitationDoi').val().length == 0){
            alert("Please enter a DOI before clicking the Find Article button");
            return ;
        }
        jQuery.getJSON("/pb/widgets/citation-finder/PIILookup/", { doi: jQuery('#findByCitationDoi').val()}, function(json) {
            if (json.pii == null || json.pii.length == 0) {
                window.location = "/search/advanced/?hadNoResult=true&doi=" + jQuery('#findByCitationDoi').val();
            } else {
                window.location = '/abstract/' + json.pii;
            }
        });
    });

    $("#citationSearchFrm").submit(function (e) {
        submit = false;
        var $seriesISSN  = $("#srsissn")
        if ($seriesISSN.length) {
            if ($seriesISSN.val().length > 0) {
                submit = true;
            }
        }
        var $journalSearchFld = $("#journalSearchFld");
        if ($journalSearchFld.length) {
            if ($journalSearchFld.val().length > 0) {
                submit = true;
            }
        }

        if (submit) {
            return true;
        } else {
            e.preventDefault();
            alert("Please select a journal before clicking the Find Article(s) button.");
        }
    });

});


function updateEnumSelect(fieldId, enumType)
{
  var sel = document.getElementById(fieldId);
  var currentValue = sel.options[sel.selectedIndex].value;

  var imgelem = document.getElementById("img_" + fieldId);
  var valueInfo = enumValuesMap[enumType].values[currentValue];
  if (valueInfo != null)
  {
      if (imgelem != null && valueInfo.imageUrl != null && valueInfo.imageUrl != "")
        imgelem.src = valueInfo.imageUrl;
      else if (imgelem.src != document.getElementById("BLANKIMAGE").src)
        imgelem.src = document.getElementById("BLANKIMAGE").src;
  }
  else if (imgelem.src != document.getElementById("BLANKIMAGE").src)
    imgelem.src = document.getElementById("BLANKIMAGE").src;
}

function handleEnumValueAdded(fieldId, enumType, valueId, valueName, valueImageUrl)
{
  var valueInfo = { };
    valueInfo['id'] = valueId;
    valueInfo['name'] = valueName;
    valueInfo['imageUrl'] = valueImageUrl;
  if (enumValuesMap[enumType] == null)
    enumValuesMap[enumType] = { };
  enumValuesMap[enumType].values[valueId] = valueInfo;

  var newOption = new Option(valueName, valueId, false, true);
  var elem = document.getElementById(fieldId);
  elem.options[elem.options.length] = newOption;
  updateEnumSelect(fieldId, enumType);
}

function handleSelectedStory(fieldID, storyDoi, storyTitle, storyTypeName)
{
  var currentRefs = document.getElementsByClassName("storyref_" + fieldID);
  var index = currentRefs.length;
  var html = "<tr class='storyref_" + fieldID + "'>";
  html += "<td id='" + fieldID + "_storyreftd" + index + "'>";
  html += "<b>" + unescape(storyTitle) + "<\/b>";
  html += "<br />";
  html += "<i>" + storyTypeName + "<\/i> &nbsp;" + storyDoi;
  html += "<input type='hidden' id='" + fieldID + "_storyrefval" + index + "' name='" + fieldID + "' value='" + storyDoi + "' />";
  html += "<\/td><td>";
  html += "<span id='" + fieldID + "_adddel" + index + "'>";
  html += "<a href='javascript:removeStoryRef(" + '"' + fieldID + '"' + ", " + index + ");'>Remove<\/a>";
  html += "<\/span>";
  html += "<\/td><\/tr>";

  new Insertion.Before(fieldID + "_storyrefcmds", html);
}

function removeStoryRef(fieldID, refIndex)
{
  var tdId = fieldID + "_storyreftd" + refIndex;
  var td = document.getElementById(tdId);
  if (!hasClass(td, "removed"))
    addClass(td, "removed");

  var newHtml = "<a href='javascript:unremoveStoryRef(" + '"' + fieldID + '"' + "," + refIndex + "," + '"' + $("#" + fieldID + "_storyrefval" + refIndex).val()  + '"' + ");'>Undo Remove<\/a>";
  $("#"  +fieldID + "_adddel" + refIndex).html(newHtml) ;

  $( "#" + fieldID + "_storyrefval" + refIndex).val("");
}

function unremoveStoryRef(fieldID, refIndex, doi)
{
  var tdId = fieldID + "_storyreftd" + refIndex;
  var td = document.getElementById(tdId);
  if (hasClass(td, "removed"))
    removeClass(td, "removed");

  $("#" + fieldID + "_storyrefval" + refIndex).val(doi);

  var newHtml = "<a href='javascript:removeStoryRef(" + '"' + fieldID + '"' + "," + refIndex + ");'>Remove<\/a>";
  $("#" + fieldID + "_adddel" + refIndex).html(newHtml);
}

var cancelSubmission = false;

function validateForm()
{
  if (cancelSubmission)
    return true;

try {
  var invalidName = false;
  var nameElem = document.getElementById("storyName");
  var nameVal = nameElem.value;
  if (nameVal == null || nameVal.replace(/\s/g, "") == "")
    invalidName = true;

  var errorFields = new Array();
  for (var fieldID in fields)
  {
      var elem = document.getElementById(fieldID);
      if (!elem)
        continue;

      if (elem.type == "select-one" || elem.type == "select-multiple")
      {
          if (!fields[fieldID].required)
            continue;

          var selectedOne = false;
          for (var index = 0; index < elem.options.length; ++index) {
            if (elem.options[index].selected && elem.options[index].value != "" && elem.options[index].value != "-1") {
                selectedOne = true;
                break;
            }
          }
          if (!selectedOne)
            errorFields.push(fieldID);
      }
      else // handle as text field
      {
          //elem.value = msword2html(elem.value);

          if (!fields[fieldID].required)
            continue;

          var val = (tinyMCE.get(fieldID) != null ? tinyMCE.get(fieldID).getContent() : elem.value);
          if (val == null || val.replace(/\s/g, "") == "")
          {
            errorFields.push(fieldID);
          }
      }

  }

  if (errorFields.length > 0 || invalidName)
  {
      var errMsg = "";

      if (invalidName)
      {
          errMsg += "<p class='error'>The Story Title cannot be empty<\/p>";
      }

      if (errorFields.length > 0) {
          errMsg += "<p class='error'>";
          errMsg = errMsg + "The following fields must be filled-in before submitting the story: ";
          for (var i = 0; i < errorFields.length; ++i)
          {
              if (i > 0) errMsg += ", ";
              errMsg += fields[errorFields[i]].name;
          }
          errMsg += "<\/p><br /><br />";
      }

      document.getElementById("errordiv").innerHTML = errMsg;
      return false;
  }

  // ESCAPE FIELD VALUES PRIOR TO SUBMISSION
  if (typeof msword2html == 'function') for (var fieldID in fields)
  {
      if (fields[fieldID].type == 'html' || fields[fieldID].type == 'text')
      {
          var elem = document.getElementById(fieldID);
          var val = elem.value;

          val = msword2html(val);
          // val = esc(val);

          elem.value = val;
      }
  }

}
catch (err)
{
    alert("An error occurred while trying to validate the form");
    return false;
}

  return true;
}

function esc(str)
{
  if (!str || str == "")
    return "";
  var x = "", y = 0;
  for (var z = 0; z < str.length; z++)
  {
    if (str.charCodeAt(z) > 127)
    {
      if (z - y > 0)
        x += str.substr(y, z - y);

      x += "&#" + str.charCodeAt(z) + ";";
      y = z + 1;
    }
  }

  if (y < str.length)
    x += str.substr(y);

  return x;
}

function validateIntegerField(fieldId)
{
  var integerRegex = /^\d+$/;
  var elem = document.getElementById(fieldId);
  var val = elem.value;

  if (!val || val == "" || integerRegex.test(val))
  {
      return true;
  }
  else
  {
      alert(fields[fieldId].name + " must be an integer value");
      elem.value = "";
      return false;
  }
}

function loadCss(url, title, media) {
var el = document.createElement('link');
el.type = 'text/css';
el.rel = 'stylesheet';
el.href = url;
el.media = media || 'screen';
el.title = title || 'dynamicLoadedSheet';
document.getElementsByTagName("head")[0].appendChild(el);
}

function loadJs(url) {
var el = document.createElement("script");
el.type = "text/javascript";
el.src = url;
document.getElementsByTagName("head")[0].appendChild(el);
}

function loadHours(){
for(i = 1 ; i < 13 ; i++)
  {
    var prefix = "0";
    if(i > 9){
        prefix = "";
    }
    jQuery("#hourSelect").append("<option value='" + prefix + i +"'>" +prefix+i+"</option>")
  }
}

function loadMins(){
    for(i = 0 ; i < 60 ; i++)
    {
        var prefix = "0";
        if(i > 9){
            prefix = "";
        }
        jQuery("#minSelect").append("<option value='" + prefix + i +"'>" +prefix+i+"</option>")
    }
}

function enableDisableTime(checkBox){
  if(!jQuery(checkBox).is(":checked")){
    jQuery(".timeSelect").attr('disabled','disabled')
  }else{
    jQuery(".timeSelect").removeAttr('disabled');
  }
};function onChangeSearchHistory(aForm){
    var index = aForm.history.selectedIndex;
    if (index > 0)
        window.location = aForm.history.options[index].value;
}

function submitSavedSearch(saveForm){
    var $saveForm = $(saveForm);
    var $srchFld = $saveForm.find('#searchSavedQuery');
    var searchSavedQuery = $.trim($srchFld.val());
    if(!searchSavedQuery){
        $saveForm.find('#emptySearchSavedQuery').removeClass('hidden');
        return false;
    }

    return true;
}
;function initIssueCoverSelector(){
    jQuery("div.coverIssueSelectorContainer select.yearSelect").val(jQuery("div.coverIssueSelectorContainer select option:first").val());
    jQuery("div.coverIssueSelectorContainer select.yearSelect").trigger("change");
};

function getIssuesByYear(element){
    jQuery("div.issuesContainer div.content").hide();
    jQuery("div.issuesContainer div.ajaxLoader").show();
    jQuery.ajax({
        type: 'GET',
        url: '/pb/widgets/cover-issue-selector/issues',
        dataType: 'text',
        async:'false',
        data: {
            journalCode: jQuery("input[name='journalCode']").val(),
            issueDisplayFilter: jQuery("input[name='issueDisplayFilter']").val(),
            format:jQuery("input[name='IssueCoverDispformat']").val(),
            year:jQuery(element).val()
        },
        success: fillIssues
    });
}
function getIssuesByVolumeLOIView(element, openArchiveFilter){
    jQuery("div.issuesContainer div.content").hide();
    jQuery("div.issuesContainer div.ajaxLoader").show();
    jQuery.ajax({
        type: 'GET',
        url: '/pb/widgets/cover-issue-selector/loiViewCoverIssues',
        dataType: 'text',
        async:'false',
        data: {
            journalCode: jQuery("input[name='journalCode']").val(),
            issueDisplayFilter: jQuery("input[name='issueDisplayFilter']").val(),
            format:jQuery("input[name='IssueCoverDispformat']").val(),
            volume:element,
            filter:openArchiveFilter
        },
        success: fillIssues
    });
}
function fillIssues(content){
    jQuery("div.issuesContainer div.ajaxLoader").hide();
    jQuery("div.issuesContainer div.content").show();
    jQuery("div.issuesContainer div.content").html(content);
}

jQuery(document).ready(initIssueCoverSelector);
if (window.PB && window.PB.$) {
    // make this module reinitializes in design mode
    window.PB.$(document.documentElement).on("ScopeModified ScopeLoaded", initIssueCoverSelector);
};jQuery(document).ready(function($) {
    var issueSearchDialog = $(".issueSearchDialog").dialog("option", {width:480, height: 95});
    issueSearchDialog
        .find('input[name="searchText"]')
        .attr('aria-labelledby',
            issueSearchDialog
                .parent('.ui-dialog')
                .find('.ui-dialog-title').attr('id'));

    initAutoComplete(".issueSearchDialog input");
});
var dateCount = 0;

jQuery(document).ready(function(){
    var selectedDateType = getParam("selectedSType");
    if(selectedDateType != null && selectedDateType != ""){
        var type =  selectedDateType.split("-");
        if(type[0] == "custom"){
            jQuery("div.dateRangeDiv input[name=dateRange]").attr("checked","checked");
            jQuery("div.dateRangeDiv select[name=dateRange]").val(type[1]);
        }else if(type[0] == "range" ){
            jQuery("input[name=dateRange][value=specific]").attr("checked","checked");
        }
    }
});

 function showHiddenFacet(name){
     jQuery("li.facet"+name+"Hidden").show();
     jQuery("li.facet"+name+"ShowMore").hide();
     jQuery("li.facet"+name+"ShowLess").show();
 }

function hideHiddenFacet(name){
    jQuery("li.facet"+name+"Hidden").hide();
    jQuery("li.facet"+name+"ShowMore").show();
    jQuery("li.facet"+name+"ShowLess").hide();
}

 function submitSearchForm(name,value){
     var hiddenField = "<input type='hidden' value='"+ value +"' name='"+ name +"field' >"
     jQuery("form.hiddenFacetForm").append(hiddenField);
     addFilterParamAndSubmit();

 }

function addFilterParamAndSubmit(){
    if (jQuery('form.hiddenFacetForm input[name="filterModify"]').length){
        jQuery("form.hiddenFacetForm").submit();
    }else{
        var hiddenField = "<input type='hidden' value='true' name='filterModify' >"
        jQuery("form.hiddenFacetForm").append(hiddenField);
        jQuery("form.hiddenFacetForm").submit();
    }
}
 function submitSearchFormWithYear(year1, year2){
     ++dateCount;
     var year2Selector ="";

     if (year2 && year2 != year1){
         year2Selector ="-"+year2;
     }

     if (!year2){
          year2 = year1;
     }

     var dateHiddenField = "<input type='hidden' value='custom' name='dateYear" + (dateCount) +  "field" + "'>" ;
     var yearRange = "<input type='hidden' value='" + year1+year2 + "' name='dateYearRange" + (dateCount) + "field" +"' >";
     var selectedDateSearchType="<input type='hidden' value='range-" + year1+ year2Selector+"' name='selectedSType' >";

     jQuery("form.hiddenFacetForm").append(dateHiddenField);
     jQuery("form.hiddenFacetForm").append(yearRange);
     jQuery("form.hiddenFacetForm").append(selectedDateSearchType);

     addFilterParamAndSubmit();
 }

 function submitSearchFormWithDateRange(selectList){
     var dateRangeValue = jQuery(selectList).val();
     ++dateCount;
     var dateHiddenField = "<input type='hidden' value='range' name='date" + (dateCount) + "field" + "' >";
     var dateRangeHiddenField = "<input type='hidden' value='"+ dateRangeValue +"' name='dateRange" + (dateCount) + "field" +"' />";
     var selectedDateSearchType="<input type='hidden' value='custom-" + dateRangeValue +"' name='selectedSType' >";

     jQuery("form.hiddenFacetForm").append(dateHiddenField);
     jQuery("form.hiddenFacetForm").append(dateRangeHiddenField);
     jQuery("form.hiddenFacetForm").append(selectedDateSearchType);

     addFilterParamAndSubmit();
 }

 function removeFilter(name,value,searchParam){
     if(name!='date' && name!='dateYear'){
         jQuery("form.hiddenFacetForm input[name='"+ name +"'][value='" + value +"']").remove();
     }else{
         var dateCountNumber = 0;
         if(searchParam == "range"){
             var dateRangeValueElm =  jQuery("form.hiddenFacetForm input[name^=dateRange][name*=field][value=" + value + "]");
             var DateTypeElm = jQuery(dateRangeValueElm).prev();
             dateCountNumber = parseInt(jQuery(DateTypeElm).attr("name").substring(4));
             jQuery(DateTypeElm).remove();
             jQuery(dateRangeValueElm).remove();

         }else{
             var FYearElm =  jQuery("form.hiddenFacetForm input[name^=dateYearRange][name*=field][value=" + value + "]");
             var DateTypeElm = jQuery(FYearElm).prev();

             dateCountNumber = parseInt(jQuery(DateTypeElm).attr("name").substring(4));

             jQuery(DateTypeElm).remove();
             jQuery(FYearElm).remove();

         }
         if(dateCountNumber > 0){
             for( i = dateCountNumber+1 ; i <= dateCount  ; i++){
                  jQuery("form.hiddenFacetForm input[name='dateYear" + i + "field" +"']").attr("name","dateYear"+(i-1) + "field");
                  jQuery("form.hiddenFacetForm input[name='dateYearRange" + i + "field" +"']").attr("name","dateYearRange"+(i-1) + "field");
                  jQuery("form.hiddenFacetForm input[name='dateRange" + i + "field" +"']").attr("name","dateRange"+(i-1) + "field");
              }
         }
         dateCount--;
     }
     removeFilterParamAndSubmit();
 }

 function removeAllFilters(){
     jQuery("form.hiddenFacetForm input[filter=true]").remove();
     removeFilterParamAndSubmit();
 }

function removeFilterParamAndSubmit(){
    if (jQuery("form.hiddenFacetForm input[filter=true]").length){
        jQuery("form.hiddenFacetForm").submit();
    }else{
        jQuery('form.hiddenFacetForm input[name="filterModify"]').remove();
        jQuery("form.hiddenFacetForm").submit();
    }
}
function getParam( name )
{
     name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
     var regexS = "[\\?&]"+name+"=([^&#]*)";
     var regex = new RegExp( regexS );
     var results = regex.exec( window.location.href );
     if( results == null )
      return "";
    else
     return results[1];
};jQuery(document).ready(function($){
    $(".iHubLinkContainerX").find(".link a").tooltip({showURL: false});
});
function initCmeExamList(){
    initCmeExamListTabs();
    setGoToExam();
}
function initCmeExamListTabs() {
    jQuery( "#jqTabSet1" ).tabs();
    var jqTabSet = $("#jqTabSet1");
    jqTabSet.find("a[href]").removeAttr('tabindex');
    jqTabSet.find("li").removeAttr('tabindex');
}

// setup event listeners when page is loaded
$(document).ready(initCmeExamList);

if (window.PB && window.PB.$) {
    // re-setup event listeners when the page changes in editing mode
    window.PB.$(document.documentElement).on("ScopeModified ScopeLoaded", initCmeExamList);
}

function setGoToExam(){
    // maintain website code when possible - extract it from the current URL
    var match = /[?&](code=[^&]+)/.exec(location.search);
    var websiteCode = match ? ("&" + match[1]) : "";

    $("a.cmeExamLink").each(function(){
        var $link = $(this);
        var url =  $link.attr("url");
        var mct = getParameterByName("mct",url);
        var meetingid = getParameterByName("meetingid",url);
        var href= "/action/ckCmeExam?mct=" + mct + "&meetingid="+ meetingid + websiteCode;
        if ($link.hasClass("pastExam")) href += "&isPastExam=true";
        $link.attr("href", href);
    })
}

function getParameterByName(name,url){
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

;var curFrmNo = 3;
var opVals =['and','or','not'];
var isAllChecked= true;
var selectedJournals ={};
var  categorySelect;
var journalContainer;

$(document).ready(function() {
    $('#advancedSearchFrm').attr("action", "/action/doSearch").attr("method", "GET");

    var cache = {};
    var journalsCntnr = $('.journalsCntnr');
    limitToSiteScope(journalsCntnr);
    journalContainer = journalsCntnr.clone();

    var $moreFrmFlds = $('#moreFrmFlds');
    if ($moreFrmFlds.length) {
        $moreFrmFlds.css("display","inline-block");
        if (curFrmNo >= 7) $moreFrmFlds.remove();  /*508 compliance note: if you need change the value 7; please change also templates/jsp/_style2/_marlin/pb2/widgets/search/advanced/widget.jsp:94*/
        else $moreFrmFlds.click(function (e){
            e.preventDefault();
            addSearchFldItem(curFrmNo);
            if (curFrmNo >= 7){
                $('#moreFrmFlds').remove();
            }
            curFrmNo++;
        });
    }

    if ($('.selectedJrn').length) {
        isSelectedJournalListEmpty(false);
    }

    if (journalsCntnr.length) {
        checkIfAllChecked();
        journalsCntnr.find("input[type='checkbox'].jrnlISSNChk").change(function () {checkIfAllChecked ;limitToSiteScope(journalsCntnr) });

        $(".toggleJrnlChk").click(function (e){
            e.preventDefault();
            isAllChecked = !isAllChecked;
            journalsCntnr.find("input[type='checkbox'].jrnlISSNChk").prop("checked", isAllChecked);
            limitToSiteScope(journalsCntnr);
        });

        var $formType = $('.formType');
        if ($formType.val && $formType.val()==="categories"){
            journalsCntnr.append('<a class="journalSelectionLayerLink" href="/pb/widgets/advancedSearch/selectJournals/">Select specific journals</a>');
        }
    }


        var focusIndex = 0;
        $(".window").on("keydown", function(e) {
        var focusableElements = $(".window :focusable");
        if($(".window").is(":visible"))
        {

            if(($(".closeBtn").is(":focus")) && ((e.keyCode || e.which) == $.ui.keyCode.ENTER))
            {// Esc = 27
                e.preventDefault();
                //get back to original link.
                $(".journalSelectionLayerLink:first").focus();
                $('#mask, .window').hide();
                $body.css("overflow","auto");
                resetJournalSelectionLayer();
            }

            if((e.keyCode || e.which) == $.ui.keyCode.ESCAPE)
            {// Esc = 27
                //get back to original link.
                $(".journalSelectionLayerLink:first").focus();
                $('#mask, .window').hide();
                $body.css("overflow","auto");
                resetJournalSelectionLayer();
            }


            if(e.shiftKey && (e.keyCode || e.which) == $.ui.keyCode.TAB)
            {
                prevTab();

            }
            else if ((e.keyCode || e.which) == $.ui.keyCode.TAB)
            { // Tab = 9

                nextTab();
            }
        }


        function prevTab() {
            if (focusIndex == 0)
            {
                e.preventDefault();
                focusableElements[focusableElements.length - 1].focus()
                focusIndex = focusableElements.length - 1;
            } else{
                focusIndex--;
                e.preventDefault();
                focusableElements[focusIndex].focus();
            }
        }

        function nextTab() {
            if(focusIndex == focusableElements.length - 1){
                e.preventDefault();
                focusableElements[0].focus();
                focusIndex = 0;
            }else{
                focusIndex++;
                e.preventDefault();
                if (typeof(focusableElements[focusIndex]) !== 'undefined') {
                    focusableElements[focusIndex].focus();
                } else {
                    focusableElements[0].focus();
                    focusIndex = 0;
                }
            }
        }
    });


    var $body = $('body');
    var $catSelect = $('.catSelect');
    var $journalLayerList = $('.journalLayerList');
    if ($catSelect.length || $journalLayerList.length) {
        var $mask = $('#mask');
        $body.on('click', '.journalSelectionLayerLink', function(event){
            event.preventDefault();
            var $w = $(window);
            var $dialog = $('#dialog');
            $dialog.css({top: $w.height() / 2 - $dialog.height() / 2, left: $w.width() / 2 - $dialog.width() / 2}).show();
            $mask.css({'width':'100%','height':$(document).height(), opacity:0.3}).show();
            $body.css("overflow","hidden");

            $dialog.find("a:not([data-description]), input, textarea, select, *[role='button']").filter(":visible:first").focus();
        });


        $('.window .closeBtn').click(function (e) {
            e.preventDefault();
            $('#mask, .window').hide();
            $body.css("overflow","auto");
            resetJournalSelectionLayer();
        });

        $mask.click(function () {
            $(this).hide();
            $('body').css("overflow","auto");
            $('.window').hide();
            resetJournalSelectionLayer();
        });

        $catSelect.change(function (e) {
            var category = $(this).find('option:selected').val();
            if (category && category != 'noCat'){
                $journalLayerList.html("<p>Loading journals from the selected category...</p>");
                jQuery.getJSON("/pb/widgets/advancedSearch/findJrnlsByCat/", { cat: category}, function(json) {
                        $journalLayerList.empty();
                        var isEmpty = true;
                        var length = json.journals.length;
                        for (var i = 0 ; i < length ; i++){
                            JournalInfo = json.journals[i];
                            if (typeof selectedJournals[JournalInfo["title"]] === "undefined") {
                                populateJournalToOptionLayer(JournalInfo["title"], JournalInfo["issn"], JournalInfo["isIIP"]);
                                isEmpty = false;
                            }
                        }
                        if (isEmpty) {
                            populateJournalToOptionLayer();
                        }
                    });
            }
        });


        $journalLayerList.on('click', '.addSlctdJrnl', function(event){
            var $jrnl = $(this);
            var issnVal = $jrnl.data('issn');
            var titleVal = $jrnl.data('title');
            var isIIP = ($jrnl.data('isiip')) ? 'true' : 'false';
            if($("input[name^='metaIssn_"+issnVal+"']").length == 0){
                $jrnl.remove();
                $('#addLink-'+issnVal).append('Added');
                addJournalToSelectedLayer(titleVal, issnVal, isIIP);
                isSelectedJournalListEmpty(false);
                $('.window').focus();
            }else{
                alert("This Journal is already added!");
            }
            return false;
        });


        var searchForJournals = function () {
            var journalTitle = $('#journalTitle').val();
            var $prodVal = $('#prodVal');
            var prodVal = $prodVal.val ? $prodVal.val() : "";
            if (journalTitle.length > 1) {
                jQuery.getJSON("/pb/widgets/advancedSearch/searchJrnlTitle/", { 'journalTitle': journalTitle, 'prodVal': prodVal}, function (json) {
                    $('.journalLayerList').empty();
                    var isEmpty = true;
                    var length = json.journals.length;
                    for (var i = 0 ; i < length ; i++){
                        JournalInfo = json.journals[i];
                            if (typeof selectedJournals[JournalInfo["title"]] === "undefined") {
                                populateJournalToOptionLayer(JournalInfo["title"], JournalInfo["issn"], JournalInfo["isIIP"]);
                                isEmpty = false;
                            }

                    }
                    if (isEmpty) {
                        populateJournalToOptionLayer();
                    }
                });

            }
            return false;
        };

        $('.jrnlSearch').click(searchForJournals);
        $('.searchJournals').submit(searchForJournals);

        $body.on('click', '.removeSlctdJrnl', function(event){
            var $jrnl = $(this);
            $('#slctdJrn'+$jrnl.data('issn')).remove();
            delete selectedJournals[$jrnl.data('title')];
            if ($.isEmptyObject(selectedJournals)) {
                isSelectedJournalListEmpty(true);
            }
        });

        $body.on('click', '.revertToDefault', function(event){
            $('#selectedJournalLayer').empty();
            selectedJournals = {};
            isSelectedJournalListEmpty(true);
        });
    }

    $(".advancedSearchWidget #advancedSearchFrm").submit(function () {
                var $inputs = $('.singleFld .srchTxt');
                for (var n = 0; n < $inputs.length - 1; n++) {
                    var $thisInput = $($inputs[n]);
                    if (($thisInput.val() || "").length === 0 && ($($inputs[n + 1]).val() || "").length !== 0) {
                        alert("Please do not leave any Search Term fields blank before entering additional search terms.");
                        $thisInput.focus();
                        return false;
                    }
                }
                if (($($inputs[0]).val() || "").length === 0){
                    alert("Please specify at least one search term");
                    $inputs[0].focus();
                    return false;
                }

                var dateRadio = document.advancedSearchForm.date;
                for (var i = 0; i < dateRadio.length; i++) {
                    if (dateRadio[i].checked && dateRadio[i].value == 'custom') {
                        var fromYear = document.advancedSearchForm.fYear.value;
                        var toYear = document.advancedSearchForm.lYear.value;

                        var yearRegex = /^[0-9]+$/;

                        if (fromYear != "" && !yearRegex.test(fromYear) ||
                                (toYear != "" && !yearRegex.test(toYear))) {
                            alert("Year needs to be numeric");

                            if (fromYear != "" && !yearRegex.test(fromYear)) {
                                document.advancedSearchForm.fYear.focus();
                            } else {
                                document.advancedSearchForm.lYear.focus();
                            }

                            return false;
                        }

                        if (fromYear.length != 4 || toYear.length != 4) {
                            if (fromYear.length == 0 || toYear.length == 0) {
                                alert("From/To years cannot be left empty");
                            } else {
                                alert("Year needs to be 4 digits");
                            }

                            if (fromYear.length != 4) {
                                document.advancedSearchForm.fYear.focus();
                            } else {
                                document.advancedSearchForm.lYear.focus();
                            }

                            return false;
                        }
                    }
                }

                return true;
            }
    );

    $( '.advancedSearchWidget select[name^="occurrences"]' ).each(function() {
       disableIfAuthor(this);
    });
    if ($("input[name='date']:checked").val() == "custom"){
        toggleSearchRangeDate();
    }else{
        toggleSearchCustomDate();
    }
    $("#journalTitle").after("<input class='jrnlSearch' type='submit' value='Search'/>");
    $("body").on("change", "input[name='date']", function(event){toggleSearchCustomDate(); toggleSearchRangeDate();});

    if($('.advancedSearchFormErrorDiv').is(':visible')) {
        $('.advancedSearchFormErrorDiv:visible').focus();
    }
});

function addSearchFldItem(num){
    var containerDiv = $('<div class="singleFld"/>');
    var id = "#singleFld" + num;
    if($(id).length > 0) {
        containerDiv = $(id);
        containerDiv.removeClass('off-screen');
    }

    var searchTextLabel = $('<label/>').attr('class', 'off-screen').attr('for', 'searchText'+num).html('Search within');
    var searchText =  $('.srchTxt:first').clone().attr('name','searchText'+num).attr('id','searchText'+num).removeClass('required').removeAttr('aria-labelledby');
    searchText.val("");
    if(searchText.hasClass('autoComplete')){
        searchText.elautocomplete(searchAutoComplete);
    }
    var searchSelectLabel = $('<label/>').attr('class', 'off-screen').attr('for', 'occurrences'+num).html("Search within");
    var searchSelect =  $('.occur:first').clone().attr('name','occurrences'+num).attr("id", 'occurrences'+num);

    searchSelect.find('option:eq(0)').attr('selected', true);

    var searchOpLabel = $("<label/>").attr('class', 'off-screen').attr('for', 'op'+(num-1)).html('Boolean search operator');
    var searchOp = $('.operator:first').clone().attr('name','op'+(num-1)).attr('id', 'op'+(num-1));
    searchOp.attr('style', '');
    searchOp.find('option:eq(0)').attr('selected', true);
    searchOpLabel.appendTo(containerDiv);
    searchOp.appendTo(containerDiv);
    searchTextLabel.appendTo(containerDiv);
    searchText.appendTo(containerDiv);
    searchSelectLabel.appendTo(containerDiv);
    searchSelect.appendTo(containerDiv);
    containerDiv.appendTo('#searchFlds');

    searchText.focus();

}
function toggleSearchCustomDate(){
    var $specficDate = $(".specficDate");
    $specficDate.find("span > input, span > select").each(function( index, elem ) {
        // toggle elements
        if ($(elem).attr("type") !=="radio"){
            if ($(elem).attr('disabled')){
                $(elem).removeAttr('disabled');
            }else{
                $(elem).attr('disabled', 'disabled');
            }
        }
        $specficDate.toggleClass("disable");
});}

function toggleSearchRangeDate(){
    $( ".dateRange span > select").each(function( index, elem ) {
        if ($(elem).attr('disabled')){
                $(elem).removeAttr('disabled');
            }else{
                $(elem).attr('disabled', 'disabled');
            }
    });
}
function checkIfAllChecked(){
    var a = $("input[type='checkbox'].jrnlISSNChk");
    isAllChecked = a.length == a.filter(":checked").length;
}
function isSelectedJournalListEmpty(isEmpty){
    if (!isEmpty){
        if ($('.revertToDefault').length == 0 ){
            $('.journalsCntnr').remove();
            var links = $('<div style="display: inline-block" class="addJournalsLinks"/>');
            var addJournals = $('<a class ="journalSelectionLayerLink" href="/pb/widgets/advancedSearch/selectJournals/">Add journals</a>');
            var revertLnk = $('<a class="revertToDefault" href="#">Revert to default</a>');
            links.append(' [ ');
            addJournals.appendTo(links);
            links.append(' ] [ ');
            revertLnk.appendTo(links);
            links.append(' ] ');
            links.appendTo($('.headerLine'));
        }
    }else{
        $('.addJournalsLinks').remove();
        var $formType = $('.formType');
        if ($formType.val && $formType.val()==="categories"){
            journalContainer.append('<a class="journalSelectionLayerLink" href="/pb/widgets/advancedSearch/selectJournals/">Select specific journals</a>');
        }
        $('#selectedJournalLayer').before(journalContainer);
    }

}
function addJournalToSelectedLayer(titleVal, issnVal){
    selectedJournals[titleVal] = issnVal;
    $('#selectedJournalLayer').empty();
    var sortedKeys = [];
    $.each(selectedJournals, function (key){
        sortedKeys.push(key);
    });
    sortedKeys.sort();
    $.each(sortedKeys, function(idx,ttl) {
        var val =   selectedJournals[ttl];
        var singleJrnlContainer = $('<div />', {'class': 'selectedJrn', 'id':'slctdJrn'+val});
        var removeLink = $('<a />', {'href': '#' ,'text':'[-]'  ,'class':'removeSlctdJrnl' ,'data-title': ttl, 'data-issn': val});
        var hiddenField = $('<input />', {'type': 'hidden' , 'name':'seriesISSNFltraddfilter','value':val});
        singleJrnlContainer.append(' ');
        hiddenField.appendTo(singleJrnlContainer);
        removeLink.appendTo(singleJrnlContainer);
        singleJrnlContainer.append(ttl);
        singleJrnlContainer.append(' ');

        singleJrnlContainer.appendTo('#selectedJournalLayer');
    });

}

function populateJournalToOptionLayer(Journaltitle , JournalIssn, isIIP){
    if (Journaltitle == null){
        $('.journalLayerList').append('No matching titles found');
    }else{
        var singleJrnlContainer = $('<div />', {'class': 'singleJrnCntnr'});
        var addLink = $('<a />', {'href': '#' ,'text':'Add'  ,'class':'addSlctdJrnl' ,'data-title': Journaltitle, 'data-issn': JournalIssn, 'data-isIIP': isIIP}) ;
        var addSpan =$('<span />' , {'id':'addLink-'+JournalIssn})   ;
        var titleSpan =$('<span />' , {'class' : 'jrnTitle', 'data-title': Journaltitle }) ;

        titleSpan.append(Journaltitle);
        addLink.appendTo(addSpan);
        singleJrnlContainer.append('[ ');
        addSpan.appendTo(singleJrnlContainer);
        singleJrnlContainer.append(' ] ');
        titleSpan.appendTo(singleJrnlContainer);
        singleJrnlContainer.appendTo('.journalLayerList');}
}

function resetJournalSelectionLayer(){
    $('.catSelect').prop('selectedIndex',0);
    $('#journalSlctTitle').val('');
    $('.journalLayerList').empty();
}

function limitToSiteScope(journalsCntnr){
    var $formType = $('.formType');
    if ($formType.val && $formType.val()==="checkboxes"){
        if (journalsCntnr.find("input[type='checkbox'].jrnlISSNChk:checked").length > 0){
            journalsCntnr.find( "input[name='searchScope']").remove();
        }else{
            if (journalsCntnr.find("input[name='searchScope']").length == 0){
                $('<input>').attr({type: 'hidden',name: 'searchScope', value:'fullSite'}).appendTo(journalsCntnr);
            }
        }
    }
};$(document).ready(function() {
    initAutoComplete(".quickSearchOption input");
    quickSelector = $('.quickSearchOption select[name ="occurrences"]');
    disableIfAuthor(quickSelector);
});

function validateQuickSearchForm()
{
    var searchText = document.quickSearchBar.searchText.value;

    if (!searchText) {
        alert("Please enter a term before submitting your search.");
        return false;
    }

    return true;
}

;function checkSelectedCountry(field) {
    $("input[name='lancet'], input[name='cellPress'], input[name='elsevier'], input[name='carSelectedThParty']").prop('checked', $(field).val() == "US");
    calsCompliance($(field).val());
}

function loadSpecialization(elm,type){
      if(type == "dynamic"){
          var professionCode =  jQuery(elm).val();
          if(professionCode == ""){
              var specialization = jQuery("#specialization");
              specialization.find("option").remove();
              specialization.append('<option value="">Select Specialization</option>');
              specialization.attr("disabled","disabled")
          }else{
              var professionName = jQuery(elm).find("option[value=" + professionCode + "]").text();
              jQuery.ajax({
                  type: 'GET',
                  url: '/pb/widgets/registrationFormController/loadSpecialization',
                  dataType: 'text',
                  async:'false',
                  data: {
                      professionCode: professionCode,
                      professionName:professionName
                  },
                  success: renderSpecialization
              });
          }
      }
  }

  function renderSpecialization(result){
      var specialization = jQuery("#specialization");
      specialization.find("option").remove();
      specialization.append(result);
      specialization.removeAttr("disabled");

      if(specialization.find("option").length == 1){
          specialization.attr("disabled","disabled");
          $('#specializationLiError').hide();
          $('<input>').attr({type: 'hidden', name: 'specialization', value: '-1'}).appendTo(specialization.parent());
          $('#specialization').closest('.errorDiv').addClass('errorDivOk').removeClass('errorDiv');
      }  else {
          $('#specializationLiError').show();
          $('input[name=specialization]').remove();
          $('#specialization').closest('.errorDivOk').addClass('errorDiv').removeClass('errorDivOk');
      }
  }

function checkGradYrMedSchStatus(displayGradYrMedSch){
    if(displayGradYrMedSch == 'true'){
        var countryCode = jQuery("#countryCode").val();
        var profession = jQuery("#profession").val();
        if( countryCode == "US" && (profession == "profile-ha-profession-001" || profession == "profile-ha-profession-002")){
            jQuery("li.gradYrMedSchSection").css("display","list-item")
        }else{
            jQuery("#graduationYear").val("");
            jQuery("#medicalSchool").val("");
            jQuery("li.gradYrMedSchSection").css("display","none")
        }
    }
}

function init() {
    $('#marlinRegForm').submit(function () {
        return !$(this).data("emailCheckFailed") && validateNewPasswordFormValidation() && validateUnica();
    });

    $('.regForm #email').blur(function () {
        var $emailInput = $(this);
        var email = $emailInput.val();
        if (email) {
            var $form = $emailInput.closest('form');
            $.get(
                    '/pb/widgets/registrationFormController/checkEmailAddress',
                    {
                        email: email,
                        redirectUrl: $form.find("input[name=redirectUri]").val(),
                        code: $form.find("input[name=code]").val()
                    },
                    function (result) {
                        if ($emailInput.parent().is(".errorDiv")) {
                            $emailInput.unwrap();
                            $form.find('.emailError').remove();
                        }
                        if (result !== null && $.trim(result) !== "") {
                            $emailInput.wrap("<div class='errorDiv'/>");
                            $form.find('.emailSection').prepend(result);
                            $form.data("emailCheckFailed", true);
                        } else {
                            $form.data("emailCheckFailed", false);
                        }
                    },
                    'text'
            );
        }
    });

    calsCompliance($("#countryCode").val());

    if($("#regErrorList").is(":visible")) {
        $("#regErrorList").focus();
    } else {
        $("#email").focus();
    }
}

// setup event listeners when page is loaded
$(document).ready(function() {
    init();
});

if (window.PB && window.PB.$) {
    // re-setup event listeners when the page changes in editing mode
    window.PB.$(document.documentElement).on("ScopeModified ScopeLoaded", init);
}

function validateNewPasswordFormValidation(){
    var password1 = $("#password11").val();
    if(password1.length < 5){
     showValidationTextForNewPassword("Please enter a password that has at least five (5) characters ");
     return false;
    }else{
     var password2 = $("#password21").val();
     if(password1 != password2){
         showValidationTextForNewPassword("The Password and Confirm Password entries did not match");
         return false;
     }
     else{
        $("li.passwordLengthLi").remove();
     }
    return true;
    }
}

function showValidationTextForNewPassword(validationText){
    var $password = $("div.passwordLength");
    if($password.length == 0){
        var errorDiv = "<li class='passwordLengthLi'><div class='error passwordLength'>" + validationText + "</div></li>";
        $("li.passwordLi").after(errorDiv);
    }else{
        $password.text(validationText);
    }
}

function validateUnica () {
	return ntptSubmitTag(this, 'ev=form-submit&evdetail=user-registration');
}

function calsCompliance(selectedCountry) {
    if (selectedCountry == "38") {
        $("input[name='jPubID']").removeProp('checked');
    }
};$(function() {
    $('#sirPaymentForm').submit(function (e){
        return doBeforeSubmit();
    });
    $("input[type=submit][name='applyCode']").click(function (e){
        var promoCode = $("input[name='promoCode']");
        if (promoCode.length > 0 && (promoCode.val() == "" || promoCode.val() < 0)){
            var form = $(this).closest("form");
            form.parent().find(".error").remove();//clear previous error message(s)
            form.prepend('<h5 class="error">The promo code you entered is not valid</h5>');
            return false;
        }
    });
    function validateInputs(form) {
        var addressFields = ["firstName", "lastName", "countryCode", "address1", "city", "state", "zipCode"];
        var textFields = ["email", "realNumber", "secNumber", "holderName"] ;
        var ccType = "cardType";
        var hasShipping = $(form).find("input[name='shipping_firstName']").length > 0 && !$("#sameAsBilling").is(':checked');
        var invalidForm = false;
        var invalidFieldsList = "";

        for(var i=0; i< addressFields.length; i++){
            var fieldName = addressFields[i];
            removeLeadingTrailingSpaces(form, fieldName);
            var invalidInput = validateInputField(form, fieldName);
            if (invalidInput) {

                invalidFieldsList = invalidFieldsList +
                    "<li>" +
                    "<a href='#" + fieldName + "' title='Go to " + fieldName +"'>" +
                        $('label[for="'+fieldName+'"]').html()  +
                    "</a> " + errorMsg +
                    "</li>";

                errorMsg = "";
            }
            if (hasShipping){
                removeLeadingTrailingSpaces(form, "shipping_"+fieldName);
                var invalidShippingInput = validateInputField(form, "shipping_"+fieldName);
                if (invalidShippingInput) {
                    invalidFieldsList =
                        invalidFieldsList +
                            "<li>Shipping " +
                            "<a href='#" + fieldName + "' title='Go to " + fieldName +"'>" +
                            $('label[for="'+fieldName+'"]').html() +
                            "</a> " +  errorMsg +
                            "</li>";

                    errorMsg = "";
                }
            }
            if (!invalidForm && invalidFieldsList!=""){
                invalidForm = true;
            }
        }

        for(i=0; i< textFields.length; i++){
            fieldName = textFields[i];
            removeLeadingTrailingSpaces(form, fieldName);
            invalidInput = validateInputField(form, fieldName);
            if (invalidInput) {
                invalidFieldsList = invalidFieldsList +
                    "<li>" +
                    "<a href='#" + fieldName + "' title='Go to " + fieldName +"'>" +
                    $('label[for="'+fieldName+'"]').html() +
                    "</a> " + errorMsg +
                    "</li>";
                errorMsg = "";
            }
            if (!invalidForm && invalidInput){
                invalidForm = true;
            }
        }

        // credit card type checking
        invalidInput = validateInputField(form, ccType);
        if (invalidInput) {
            invalidFieldsList = invalidFieldsList +
                "<li>" +
                "<a href='#" + ccType + "' title='Go to " + ccType +"'>" +
                $('label[for="'+ccType+'"]').html() +
                "</a> " + errorMsg +
                "</li>";
            errorMsg = "";
        }
        if (!invalidForm && invalidInput){
            invalidForm = true;
        }

        // check credit card expiration date
        var ccExpMonthDropdown = document.getElementById("expMonth");
        var ccExpYearDropdown = document.getElementById("expYear");

        var ccExpMonth = ccExpMonthDropdown.options[ccExpMonthDropdown.selectedIndex].value;
        var ccExpYear = ccExpYearDropdown.options[ccExpYearDropdown.selectedIndex].value;

        var today = new Date();

        var expDate = new Date();
        expDate.setFullYear(ccExpYear);
        expDate.setMonth(ccExpMonth - 1);
        expDate.setDate(getLastDayOfMonth(ccExpMonth, ccExpYear));

        if (expDate < today) {
            invalidFieldsList = invalidFieldsList +
                "<li>" +
                "<a href='#" + fieldName + "' title='Go to " + fieldName +"'>" +
                $('label[for="'+"expMonth" +'"]').html() +
                "</a>" + " Please select a valid expire date" +
                "</li>";
            invalidForm = true;
        }

        var confirm  = $(form).find("input[name='confirm']");
        if (!confirm.is(":checked")){
            invalidForm = true;
            invalidFieldsList = invalidFieldsList +
                "<li> " +
                "<a href='#confirm' title='Go to confirm field'>" +
                "Confirm checkbox" +
                "</a>" + " Please confirm your information" +
                "</li>";
        }
        if (invalidForm){
            $(".errorBox").html("<h5 class='header'>Please correct the following fields:</h5><ul>"+invalidFieldsList+"</ul>").show().focus();
        }
        return invalidForm;
    }
    var errorMsg = "";
    function validateInputField(form, fieldName){
        var field = $(form).find("[name="+"'"+fieldName+"']");

        if (fieldName == "cardType"){
            ccType = document.getElementById("cardType");
            var ccTypeSelected = ccType.options[ccType.selectedIndex].value;
            if (ccTypeSelected == '-1'){
                errorMsg = "Please select a card type";
                field.addClass("empty").attr('aria-invalid', 'true').focus(function(){$(this).removeClass("empty").attr('aria-invalid', 'false');});
                return true;
            }
        }
        else if (fieldName == "realNumber" || fieldName == "secNumber") {
            var ccType = document.getElementById("cardType");
            ccTypeSelected = ccType.options[ccType.selectedIndex].value;
            var ccDigits;
            var ccSecurityCodeDigits;
            var startingDigit;

            if (ccTypeSelected == '1' || ccTypeSelected == '2') {   // visa == 1 , mastercard == 2
                ccDigits = 16;
                ccSecurityCodeDigits = 3;
                if (ccTypeSelected == '1') {
                    startingDigit = '4';
                } else {
                    startingDigit = '5';
                }
            } else if (ccTypeSelected == '3') {   // amex == 3
                ccDigits = 15;
                ccSecurityCodeDigits = 4;
                startingDigit = '3';
            }

            // check credit card number for appropriate number of digits and that they start with the correct digit
            if (fieldName == "realNumber") {
                removeAllSpaces(form, fieldName);
                if (field.length > 0 && (parseInt(field.val()) != field.val()) || field.val().length != ccDigits || !startsWith(field.val(), startingDigit)) {
                    errorMsg = "Please add a valid card number";
                    field.addClass("empty").attr('aria-invalid', 'true').focus(function(){$(this).removeClass("empty").attr('aria-invalid', 'false');});
                    return true;
                }
            } else if (fieldName == "secNumber") {
                removeAllSpaces(form, fieldName);
                // check credit card security code for appropriate number of digits
                if (field.length > 0 && (parseInt(field.val()) != field.val()) || field.val().length != ccSecurityCodeDigits) {
                    errorMsg = "Please add a valid security code";
                    field.addClass("empty").attr('aria-invalid', 'true').focus(function(){$(this).removeClass("empty").attr('aria-invalid', 'false');});
                    return true;
                }
            }
        }
        else {
            if (field.length > 0 && ($.trim(field.val()) == "" || field.val() < 0)){
                if (fieldName == "state") {
                    if (!isStateRequired("countryCode")) {
                        return false;
                    }
                } else if (fieldName == "shipping_state") {
                    if (!isStateRequired("shipping_countryCode")) {
                        return false;
                    }
                }
                errorMsg = "is required";
                field.addClass("empty").attr('aria-invalid', 'true').focus(function(){$(this).removeClass("empty").attr('aria-invalid', 'false');});
                return true;
            }

            if (fieldName == "zipCode" || fieldName == 'shipping_zipCode') {
                removeAllSpaces(form, fieldName);
                if (field.length > 0 && field.val().length > 10) {
                    errorMsg = "Please add a valid zip code";
                    field.addClass("empty").attr('aria-invalid', 'true').focus(function(){$(this).removeClass("empty").attr('aria-invalid', 'false');});
                    return true;
                }
            }
        }
        return false;
    }

    function removeLeadingTrailingSpaces(form, fieldName) {
        var inputField = $(form).find("input[name="+"'"+fieldName+"']");
        inputField.val($.trim(inputField.val()));
    }

    function removeAllSpaces(form, fieldName) {
        var inputField = $(form).find("input[name="+"'"+fieldName+"']");
        inputField.val($.trim(inputField.val().replace(/\s+/g, "")));
    }

    function isStateRequired(countryFieldName) {
        var countrySelected = document.getElementById(countryFieldName);
        // if country is USA or Canada, then state field is required
        var selectedValue = countrySelected.options[countrySelected.selectedIndex].value;
        return (selectedValue == 'US' || selectedValue == 'CA');
    }

    $("#sameAsBilling").click(function() {
        if (this.checked) {
            $('.shippingAddress').hide();
            $("#sameAsBillingHidden").remove();
        }else{
            $('.shippingAddress').show().removeClass("hidden");
            $("#sirPaymentForm").append("<input type='hidden' name='sameAsBilling' id='sameAsBillingHidden' value='no'/>");
        }
    });


    function bindSubscriptionFields(){
        //$("#journalSubscDropDown").change(function(e){
        //    var form = $(this).closest("form");
        //    form.submit();
        //});
        $("#subscriptionForm .subscField").change(function(e){
            var name = $(this).attr("name");
            var form = $(this).closest("form");
            var isSociety = $(this).attr("id") == 'societySubsc';
            var $societyDropDown = $("select.subscField");
            var $societyHiddenInput = $("input#societySubscHiddenInput");
            if (isSociety){
                if ($societyDropDown.length > 0) {
                    $societyDropDown.removeAttr("disabled");
                    $societyDropDown.attr("name", 'subscriberType');
                } else if ($societyHiddenInput.length > 0) {
                    $societyHiddenInput.removeAttr("disabled");
                }
            } else if (name=='subscriberType'){

                if (!$(this).is("select")){
                    $societyDropDown.attr("name", '');
                }
            }
            form.submit();
        });

        $("#subscriptionForm").submit(function(e){
            //give precedence to dropdown value.  If none exists, check for an input value
            var pubCode = $(this).find("select[name='pubCode']").length > 0 ? $(this).find("select[name='pubCode']").val() : $(this).find("input[name='pubCode']").val();
            var params = {  pubCode: pubCode,
                regionCode: $(this).find("input[name='regionCode']:checked").val(),
                subscriberType: $(this).find("input[name='subscriberType']:checked").val() == "societySubsc" ? ($(this).find("select[name='subscriberType']").length > 0 ? $(this).find("select[name='subscriberType']").val() : $(this).find("input[id='societySubscHiddenInput']").val()) : $(this).find("input[name='subscriberType']:checked").val(),
                deliveryFormat: $(this).find("input[name='deliveryFormat']:checked").val(),
                websiteId: $(this).find("input[name='websiteId']").val(),
                code: $(this).find("input[name='code']").val(),
                uuid: $(this).find("input[name='uuid']").val()};

            $.get("/pb/widgets/getSubscriptionOffers", params,
                function(data){
                    var $currentFocusedElementID = $('#subscription *:focus').attr('id');/*store focusing*/
                    $("#subscription").html(data);
                    bindSubscriptionFields();
                    /*508 compliance: After add the subscription content, we should focus that element.*/
                    $('#' + $currentFocusedElementID).focus();
                });
            return false;
        });
    }
    function doBeforeSubmit(){
        var invalidInput = validateInputs($("#sirPaymentForm"));
        if (!invalidInput){
            var realNum = $("input:text[name='realNumber']").val();
            var expMonth = $("select[name='expMonth']").val();
            var expYear = $("select[name='expYear']").val();

            //assuming that cc expires on the last day of the month
            var expDay = getLastDayOfMonth(expMonth, expYear);

            $("input:hidden[name='secure_I_C_1']").val(expMonth+"/"+expDay+"/"+expYear+"_"+realNum);
            //DO NOT REMOVE: real CC number isn't supposed to get to our server
            $("input:text[name='realNumber']").val("");
        }else{
            return false;
        }
    }

    $(document).ready(function(){
        var ccErrors = $("#ccInfo h5.error");
        if(ccErrors.length > 0){
            var form = $("#sirPaymentForm");
            var errorMsgList = "";
            for(var i = 0; i < ccErrors.length; i++){
                var fieldName = $(ccErrors[i]).attr("for");
                errorMsgList= errorMsgList +"<li>"+ $('label[for="'+fieldName+'"]').html() +"</li>";
                $(form).find("[name="+"'"+fieldName+"']").addClass("empty").attr('aria-invalid', 'true').focus(function(){$(this).removeClass("empty").attr('aria-invalid', 'false');});
            }

        $(".errorBox").html("<h5 class='header'>Please correct the following fields:</h5><ul>"+errorMsgList+"</ul>").show();
        }

        if ($('#sameAsBilling').is(':checked')) {
            $('.shippingAddress').hide();
            $("#sameAsBillingHidden").remove();
        } else {
            $('.shippingAddress').show().removeClass("hidden");
            $("#sirPaymentForm").append("<input type='hidden' name='sameAsBilling' id='sameAsBillingHidden' value='no'/>");
        }

        bindSubscriptionFields();
    });

    $("#applyCodeBut").click(function(){
        var href = $("#applyCodeBut").attr('href');
        var promoCode = $("#promoCode").val();
        href += "&applyPromoCode=true&promoCode=" + promoCode ;
        $("#applyCodeBut").attr('href',href);
    });

});

function getLastDayOfMonth(expMonth, expYear) {
    var firstDayOfNextMonth = new Date(expYear, expMonth, 1);
    return new Date(firstDayOfNextMonth-1).getDate();
}

function changeStateField(stateFieldName, countrySelector) {
    var selectedCountryId = $(countrySelector).val();
    var visibleState = $('#' + stateFieldName);
    if ((selectedCountryId == 'US') != visibleState.is('select')) {
        // if selected country is USA, the field must be select
        // if selected country is different, the field must not be select
        // otherwise flip them
        var hiddenState = $('#' + stateFieldName + "Hidden");

        // flip their id and name attributes
        var tmp = {id: visibleState.attr('id'), name: visibleState.attr('name')};
        visibleState.attr({id: hiddenState.attr('id'), name: hiddenState.attr('name')}).hide();
        hiddenState.attr(tmp).show();
    }

    return true;
}

function startsWith(string, startingChar) {
    return string.lastIndexOf(startingChar, 0) === 0;
}

;jQuery(document).ready(function($) {
    var init = function() {
        onloadSwitchToEnhancedView();
        addHoverLayerEvents();
        addHoverCollabLayerEvents();
        handleFbiImageEvents();
        $('html').click(function() {
            $("span.hoverLayer.refLayer").hide();
            $("span.externalFileLayer").hide();
            $("div.authorLayer.hoverLayer.notCollab").hide();
            $("div.authorLayer.hoverLayer.notCollab").closest("span").css("z-index", "auto");
            var hoverCollabLayer = $("div.authorLayer.hoverCollabLayer");
            if(hoverCollabLayer.is(':visible')) {
                var layer = jQuery(this);
                hoverCollabLayer.hide();
                hoverCollabLayer.closest("span").css("z-index", "auto");
                toggleImgShoHide(layer);
            }
        });
        setImagesTabImagesCaptionMaxHeight();
        articleImagesLinkSetMarginBottom();
        textBoxHead(true);
        if($("h5#loginFormErrorMsg").is(":visible")) {
            $("h5#loginFormErrorMsg:visible").focus();
        }
        addCssToMainDiv();
        changePanePos();
        handleIIPToolTips();
        if (document.referrer && document.referrer.indexOf('google') !== -1) {
            $(".FPImg").click();
        }

        $('span a').on('focus', function(){
            var link = $(this);
            link.keydown(function(e) {
                if ((e.which === 13) || (e.which === 32)) {
                    if(hrefIsId(link.attr('href'))){
                        var name = link.attr('href');
                        name = name.substr(name.indexOf("#")+1);
                        $("a[name*="+name+"]").parent().attr('tabindex','0');
                        $("a[name*="+name+"]").parent().focus();
                    }
                }
            });
        });
    };

    init();

    if (window.PB && window.PB.$) {
        // make this module reinitializes in design mode
        window.PB.$(document.documentElement).on("ScopeModified ScopeLoaded", init);
    }

    var $activeTabUrl = $(".mainTabs .active a").attr('href');

    if ($activeTabUrl) {
        if (window.history && window.history.replaceState) {
            window.history.replaceState($activeTabUrl, document.title, window.location.href);
        }
    }

    if (window.addEventListener) {
        window.addEventListener("popstate", function(e) {
            if (e.state) {
                $(".mainTabs a[href='" + e.state + "']").trigger('click', {history: true});
            }
        });
    }

    var focusIndex = 0;
    $(".authorLayer").on("keydown", function(e) {
        var focusableElements = $(".authorLayer :focusable");
        if($(".authorLayer").is(":visible"))
        {
            if(($(".closeBtn").is(":focus")) && (((e.keyCode || e.which) == $.ui.keyCode.ENTER)))
            {
                e.preventDefault();
                $('#openAuthor_' + $(".authorLayer:visible").attr("data-target")).focus();
                jQuery('.authorLayer').hide();
            }
            if((e.keyCode || e.which) == $.ui.keyCode.ESCAPE)
            {// Esc = 27
                $('#openAuthor_' + $(".authorLayer:visible").attr("data-target")).focus();
                jQuery('.authorLayer').hide();
            }


            if(e.shiftKey && (e.keyCode || e.which) == $.ui.keyCode.TAB)
            {
                prevTab();

            }
            else if ((e.keyCode || e.which) == $.ui.keyCode.TAB)
            {

                nextTab();
            }
        }


        function prevTab() {
            if (focusIndex == 0)
            {
                e.preventDefault();
                focusableElements[focusableElements.length - 1].focus();
                focusIndex = focusableElements.length - 1;
            } else{
                focusIndex--;
                e.preventDefault();
                focusableElements[focusIndex].focus();
            }
        }

        function nextTab() {
            if(focusIndex == focusableElements.length - 1){
                e.preventDefault();
                focusableElements[0].focus();
                focusIndex = 0;
            }else{
                focusIndex++;
                e.preventDefault();
                focusableElements[focusIndex].focus();
            }
        }
    });

    $( "a.coverIssueSelector" ).first().click();

    var focusIndex = 0;
    $(".refLayer").on("keydown", function (e) {
        var focusableElements = $(".refLayer :focusable");
        if ($(".refLayer").is(":visible")) {
            if (($(".closeBtn").is(":focus")) && (((e.keyCode || e.which) == $.ui.keyCode.ENTER))) {
                e.preventDefault();
                jQuery('.refLayer').hide();
            }
            if ((e.keyCode || e.which) == $.ui.keyCode.ESCAPE) {// Esc = 27
                jQuery('.refLayer').hide();
            }

            if (e.shiftKey && (e.keyCode || e.which) == $.ui.keyCode.TAB) {
                prevTab();
            }
            else if ((e.keyCode || e.which) == $.ui.keyCode.TAB) {
                nextTab();
            }
        }
        function prevTab() {
            if (focusIndex == 0) {
                e.preventDefault();
                focusableElements[focusableElements.length - 1].focus();
                focusIndex = focusableElements.length - 1;
            } else {
                focusIndex--;
                e.preventDefault();
                focusableElements[focusIndex].focus();
            }
        }

        function nextTab() {
            if (focusIndex == focusableElements.length - 1) {
                e.preventDefault();
                focusableElements[0].focus();
                focusIndex = 0;
            } else {
                focusIndex++;
                e.preventDefault();
                focusableElements[focusIndex].focus();
            }
        }
    });

    // replace inner tab links with javascript enabled links
    $('.jsReplaceTab').each(function() {
        var link = $(this).html();
        $(this).html(link.replace('?innerTab', '#'));
    });

    $('.expander').click(function(e) {
        e.preventDefault();
        $(this).toggleClass("expanded");
        $(this).toggleClass("collapsed");
        var isExpanded = $(this).attr('aria-expanded') == 'true';
        $(this).attr("aria-expanded", isExpanded ? 'false': 'true');
        $("#imgShowHide")
            .attr('src', isExpanded ? '/templates/jsp/images/expand.gif' : '/templates/jsp/images/collapse.gif')
            .attr('alt', isExpanded ? 'show' : 'hide');
        $('.content').toggleClass("expandedDiv");
    });
});

function changePanePos() {
    $( window ).scroll(function() {
        if(!$(".fullText").find(".sectionTitle").hasClass("closed") &&
            ($(window).scrollTop() + $("#fixedPane").height() >= $("#pb-page-content").height() - $(".page-footer").height() - 200)) {
            var topVal =  $(".copyright").offset().top - $(document).height() + 130;
            $("#fixedPane").css("top",topVal);
        } else {
            $("#fixedPane").css("top","");
        }
    });
}

function cleanUp() {
    /* for figure*/
    jQuery(".modal-dialog-mask").hide();
    jQuery(".modal-dialog").hide();

    /* for video pop-up */
    jQuery(".externalFileLayer").hide();

    /*for Author layer.*/
    jQuery('.authorLayer').hide();

    jQuery('body').css("overflow","auto");
}
function addHoverLayerEvents() {
    $(".hoverLayer").each(function () {
        var layer = jQuery(this);
        layer.parent().find(".layerTrigger.layerTriggerClick").add(layer).off("mouseenter mouseleave").click(function (event) {
            $("span.hoverLayer.refLayer").hide();
            layer.closest("span").css("z-index", "1000");
            layer.show();
            event.stopPropagation();
        });
        layer.parent().find(".openAuthorLayer.layerTrigger")
            .add(layer)
            .off("mouseenter mouseleave")
            .click(function (event) {
                    $("div.authorLayer.hoverLayer.notCollab").hide();
                    $("div.authorLayer.hoverLayer.notCollab").closest("span").css("z-index", "auto");
                    layer.show();
                    layer.closest("span").css("z-index", "1000");
                    event.stopPropagation();
                    layer.find("a:not([data-description]), input, textarea, select, *[role='button']").filter(":visible:first").focus();
            });
        var closeBtnLayer = layer.find("span.closeBtnCollab").length != 0 ? layer.find("span.closeBtnCollab") : layer.find("span.closeBtn");
        closeBtnLayer.add(layer.parent()).off("mouseenter mouseleave").click(function (event) {
            layer.hide();
            layer.parent().show();
            event.stopPropagation();
        });
        $(".allReferencesLink").click(function(event){
            window.location = $("li.showReferences a").attr("href");
        });
    });

    $(".externalFileLayer").each(function () {
        var layer = jQuery(this);
        layer.parent().find(".layerTrigger.layerTriggerClick").add(layer).off("mouseenter mouseleave").click(function (event) {
            $("span.externalFileLayer").hide();
            layer.closest("span").css("z-index", "1000");
            layer.show();
            event.stopPropagation();
        });
        layer.find("span.closeBtn").add(layer.parent()).off("mouseenter mouseleave").click(function (event) {
            layer.hide();
            layer.parent().show();
            event.stopPropagation();
        });
    });
}

function addHoverCollabLayerEvents() {
    $(".hoverCollabLayer").each(function () {
        var layer = jQuery(this);
        layer.parent().find(".openCollabAuthorLayer.layerTrigger")
            .add(layer)
            .off("mouseenter mouseleave")
            .click(function (event) {
                toggleImgShoHide(layer);
                if($("div.authorLayer.hoverCollabLayer").is(':visible'))
                    layer.hide();
                else
                    layer.show();
                event.stopPropagation();
                layer.find("a:not([data-description]), input, textarea, select, *[role='button']").filter(":visible:first").focus();
            });
        layer.find("span.closeBtnCollab").add(layer.parent()).off("mouseenter mouseleave").click(function (event) {
            toggleImgShoHide(layer);
            layer.hide();
            layer.parent().show();
            event.stopPropagation();
        });
    });
}
function toggleImgShoHide(layer){
    var isExpanded = layer.parent().find(".openCollabAuthorLayer.layerTrigger").attr('aria-expanded') == 'true';
    layer.parent().find(".openCollabAuthorLayer.layerTrigger").attr("aria-expanded", isExpanded ? 'false': 'true');
    $("#imgShowHideCollab")
        .attr('src', isExpanded ? '/templates/jsp/images/expand.gif' : '/templates/jsp/images/collapse.gif')
        .attr('alt', isExpanded ? 'show' : 'hide');
}
function initVideosNumbersTabs(){
    $("#AVPartULSelector").html("");
    var videosCount = $("#AVContentDiv .AVPart").length;
    $("#AVContentDiv .AVPart").each(function(count){
        var id = $(this).attr('id');
        var listElement = "<li class='AVPartList'  role='tab'><a href='#' onclick='showAVPart(\""+ id +"\",this); return false;'>" + (count+1) +"</a></li>";
        if(count > 0){
            $("#AVPartULSelector").append(listElement);
            if(!$(this).hasClass("multiResults")){
                $(this).css({"width": "0", "height": "0", "overflow": "hidden", "visibility": "hidden", "position": "absolute", "left": "-9999"});
            }
        }else{
            if (videosCount > 1) {
                var AVPartULSelector ="<div class='layout-tabs'><div class='tabs tabs-widget numberedWidget' role='tabpanel'><ul class='tab-nav av-tab'  role='tablist' id='AVPartULSelector'>" + listElement + "</ul></div></div>";
                $("#AVTabContent").prepend(AVPartULSelector);
            }
            $('.AVPartList').addClass("active");
            $(this).css({"width": "", "height": "", "overflow": "", "visibility": "", "position": "", "left": ""});
        }
    });
}

function showAVPart(id, listObject){
    $(".AVPart").css({"width": "0", "height": "0", "overflow": "hidden", "visibility": "hidden", "position": "absolute", "left": "-9999"});
    $("#" + id).css({"width": "", "height": "", "overflow": "", "visibility": "", "position": "", "left": ""});
    $('.AVPartList').removeClass("active");
    $(listObject).closest("li").addClass("active");
}

function setImagesTabImagesCaptionMaxHeight(){
    var maxHeight = -1;
    $(".imagesTab div.image div.caption").each(function() {
        maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
    });
    if(maxHeight > 150){
        maxHeight = 150;
    }
    $('.imagesTab div.image div.caption').each(function() {
        $(this).height(maxHeight);
    });
}

function articleImagesLinkSetMarginBottom(){
    $(".articleContent div.floatDisplay").each(function(){
        $(this).find(".fig-links:last").css("margin-bottom","1px")
    });
}

function cleanDomForView(){
    var $imgSelectOption = $("#imagesSubTab .articleAttachments");
    var $imgDisplayArea = $("#imagesSubTab .displayArea");
    $imgSelectOption.html("");
    $imgDisplayArea.html("");
    $("#glossarySubTab").html("");
    $(".enhancedViewContent").append($(".authorInterview .authorInterviewPlayer"));
    $(".enhancedViewContent").append($(".authorInterview .authorInterviewAudioExplanation"));
    $(".authorInterview .authorInterviewPlayer").remove();
    $(".authorInterview .authorInterviewAudioExplanation").remove();
    $(".allReferencesLink").unbind('click');
    $(".figureLink").unbind('click');

    //un-hide the second column and shrink the first column back to it's original size
    $($(".cellArtContent .pb-columns > div")[1]).show();
    if(window.sessionStorage ){
        $(".cellArtContent").find(".extendedCellArt").removeClass("width_1_1").addClass(window.sessionStorage.getItem("cellWidthClass"));
    }
}

function onloadSwitchToEnhancedView(){
    var enhancedArticleType = $.trim($("#enhancedArticleType").html());
    var showEnhanced = enhancedArticleType == 'enhancedReview' || enhancedArticleType == 'enhancedResearch';
    if (showEnhanced && $("#isEnhanced").length){
        $("#article").addClass(enhancedArticleType);//"enhancedReview", "enhancedResearch" or "enhancedOther"
        bindOneTimeEnhancedEvents();
        if ($("#sessionIsEnhanced").length){
            switchToEnhancedView();
        }else{
            switchEnhancedClass(false);
            initVideosNumbersTabs();
        }
    } else {
        initVideosNumbersTabs();
    }
}

function switchToEnhancedView(){
    enhanceDom();
    bindEnhancedEvents();
}

function enhanceDom(){
    $("li.showAbstract a").html("Summary");
    switchEnhancedClass(true);
    if ($("#pb-editor").length){
        $(".enhancedRightDropZone").insertAfter($(".artInfoWrapper"));
    }else{
        $(".enhancedRightDropZone").insertAfter($(".articleInfo"));
    }
    addFullTextRightTabs();

    if ($(".enhancedMetaDataDropZone").find(".paperClip").length == 0) {
        $(".enhancedViewContent .paperClip").insertAfter($(".enhancedMetaDataDropZone"));
    }
}
function switchEnhancedClass(on){
    if (on){
        $("#article").addClass("enhanced").removeClass("enhancedOff");
    }else{
        $("#article").removeClass("enhanced").addClass("enhancedOff");
    }
}
function closeFullTextSections(){if($(".fullText").length){$("section .content").hide()}}

function addFullTextRightTabs(){
    cleanDomForView();
    addImagesSubTab();
    addGlossarySubTab();

}
function addGlossarySubTab(){
    var $enhancedViewGlossary = $("#enhancedViewGlossary");
    if($(".fullText").length && $enhancedViewGlossary.length){
        $("#glossarySubTab").append($enhancedViewGlossary.clone());

    }
}
function addImagesSubTab(){
    var $selectOption = $("#imagesSubTab .articleAttachments");
    var $displayArea = $("#imagesSubTab .displayArea");
    var $figs = $(".fig-wrapper, .inline-figure-wrapper-hidden");
    var $audioVideos =$("#AVTabContent .AVPart");
    if($(".fullText").length && ($figs.length || $audioVideos.length)){
        //sort the figures by figure id
        $figs.sort(function(a, b) {
            return $(a).attr("id").toUpperCase().localeCompare($(b).attr("id").toUpperCase());
        });

        $figs.each(function(index){
            var figId = $(this).attr("id");
            var figName = $(this).attr("title");

            // find the longest label
            var longestLabel = findLongestLabel($(".crossref-label " + "." + figId));

            $selectOption.append("<option value='"+figName + "'>"+ longestLabel+"</option>");
            var $fig = $(this).clone();
            if ($fig.hasClass("inline-figure-wrapper-hidden")) {
                $fig.addClass('fig-wrapper').removeClass('inline-figure-wrapper-hidden');
            }
            // switch to the downsampled version, if available
            $('img[data-downsampled]', $fig).each(function() {
                var $this = $(this);
                $this.attr('src', $this.data('downsampled'));
                $this.removeAttr('data-downsampled');
            });
            if (index==0){
                $displayArea.append($fig.css({"width": "", "height": "", "overflow": "", "visibility": "", "position": "", "left": ""}));
            }else{
                $displayArea.append($fig.css({"width": "0", "height": "0", "overflow": "hidden", "visibility": "hidden", "position": "absolute", "left": "-9999"}));
            }
        });

        $audioVideos.each(function(index){
            var audioVideoId = $(this).attr("id");

            // find the longest label
            var longestLabel = findLongestLabel($(".crossref-label " + "." + audioVideoId));

            $selectOption.append("<option value='"+$(this).attr("id") + "'>"+ longestLabel+"</option>");
            if (index==0 && $figs.length == 0){
                $displayArea.append($(this).clone().css({"width": "", "height": "", "overflow": "", "visibility": "", "position": "", "left": ""}));
            }else{
                $displayArea.append($(this).clone().css({"width": "0", "height": "0", "overflow": "hidden", "visibility": "hidden", "position": "absolute", "left": "-9999"}));
            }
        })
    }

    function findLongestLabel(elements) {
        var longestWidth = 0;
        var secondLongestWidth = 0;
        var longestLabel = "";
        var secondLongestLabel = "";
        elements.each(function() {
            var currentLabel = $(this).text();
            var currentWidth = currentLabel.length;

            if (currentWidth > longestWidth) {
                secondLongestWidth = longestWidth;
                secondLongestLabel = longestLabel;

                longestWidth = currentWidth;
                longestLabel = currentLabel;
            } else if (longestWidth > 0 && secondLongestWidth == 0 && currentWidth != longestWidth) {
                secondLongestWidth = currentWidth;
                secondLongestLabel = currentLabel;
            }
        });

        // if second longest label is only 1 character difference, use it. This takes care of the case where there are labels
        // "Movies S1" and "Movie S1"
        if ((longestWidth - secondLongestWidth) == 1) {
            return secondLongestLabel;
        }

        return longestLabel;
    }

}

var bindEnhancedEvents = (function() {
    var executed = false;
    return function () {
        if (!executed) {
            executed = true;
            $(".enhanced .mainTabs a").click(ajaxMainTabs);
            bindTabContentEvents();
        }
    };
})();

function bindOneTimeEnhancedEvents(){
    bindSwitchViewMode();
    $(".paperClip .link").click(showAudioPlayer);
    $(".listenAudio").click(showAudioPlayer);
    $(window).scroll(onEnhancedViewScroll);

}
function bindSwitchViewMode(){
    $("#article .toStandard").click(function(){setSessionViewMode(false);});
    $("#article .toEnhanced").click(function(){setSessionViewMode(true);});
}
function showAudioPlayer(){
    var $playerWrapper = $(".paperClip .avPlayer-wrap");
    $playerWrapper.css({"width": "100%", "height": "100%", "overflow": "auto"});
    jwplayer($($playerWrapper.children(".jwplayer")).attr("id")).play();
}
function setSessionViewMode(enhancedView){
    $.get("/pb/article/setViewPreference", {enhancedView: enhancedView}).done(function() {
        location.reload();
    })
}

function textBoxHead(onLoad){
    var textboxHead = $('.textbox-head');
    if ($('span.isLancet').length) {
        textboxHead.each(function() {
            var tbh = $(this);
            tbh.find(".plusMinus").hide();
        });
        return;
    }

    textboxHead.css("cursor", "pointer");
    textboxHead.each(function () {
        var tbh = $(this);
        var t = tbh.text();

        // if the role is cme, we applied the cme class to it.
        // Bug #74309: Collapse by default when both role is not 'cme' and .textbox-head is not empty
        if (!tbh.is(".cme") && !tbh.is(':empty') && !tbh.find(".plusMinus").length) {
            // hide textbox content when page is loaded
            var iconTxt = "-";
            if ($.trim(tbh.parent().find('.textbox-head').text())) {
                tbh.children().not(".articleTitle").add(tbh.parent().find('.textbox-body')).hide();
                iconTxt = "+";
            }
            tbh.prepend('<div class="plusMinus" tabindex="0">'+ iconTxt +'</div>');
            $(".plusMinus").on('focus', function(){
                $(window).keydown(function(e) {
                    if ((e.which === 13) || (e.which === 32)) {
                        $(".plusMinus").click();
                    }
                    e.stopImmediatePropagation();
                });
            });
            tbh.click(toggleTextBody);
        }
    });

    if (onLoad){
        if (location.hash && location.hash.length > 1) $(location.hash).find(".plusMinus").click();
    }else{
        //if an anchor referring to a textbox is clicked, expand it
        $('a.textboxAnchor').click(function(){
            var $matchingTextBody = $($(this).attr("href"));
            if ($matchingTextBody.length && $matchingTextBody.is(":visible")){//check if the textBox 'exists' in current tab
                if ($matchingTextBody.children(".textbox-body").is(":hidden")){
                    $matchingTextBody.children(".textbox-head").click();
                }
            }else{
                //assume it's in showExperimentalProcedures tab
                $($(".mainTabs .showExperimentalProcedures a")[0]).trigger('click', 'inHouse');
            }
        });
    }

    if ($("#expandTextbox").length){
        $('.textbox-head').click();
    }

}

function bindTabContentEvents(){
    if($(".fullText").length){
        $(".enhanced .sectionView .expand").click(function(){
            $("section").find(".content").children().not(".content, section, .sectionTitle").show("slow");
            $(".fullText section .sectionTitle").removeClass("closed")});
        $(".enhanced .sectionView .collapse").click(function(){
            $("section").find(".content").children().not(".content, section, .sectionTitle").hide("slow");
            $(".fullText section .sectionTitle").addClass("closed")});
        $(".enhanced .fullText section .sectionTitle").click(toggleSections);
        $('#fixedPane .toggle').click(togglePane);
        $('.articleAttachments').change(function() {
            var target = $(this).find(":selected").val();
            var $displayArea = $("#imagesSubTab .displayArea");
            showSelection($displayArea,target);
        });
        $("#imagesSubTab .viewAll").click(function(){$($(".mainTabs .showImagesData a")[0]).trigger('click', 'inHouse')});
        $(".enhanced .figureLink").click(showImageData);
        $(".enhanced .fileLink").click(showImageData);
        $(".enhancedReview .imagesSubTabLabel").html("Figures");
        // disable figure viewer
        $("a.figureLink").attr('data-link', 'modal_enhanced');

        $("a.figureLink").click(function() {
            return false;
        });

        // disable file description viewer for files that are displayed in the right pane
        $("a.fileLink").each(function() {
            var fileLink = $(this);
            var id = $(this).attr('id').substring(5);//since id's start with "back-"
            $('.articleAttachments option').each(function() {
                if (this.value == id) {
                    fileLink.removeClass("layerTrigger layerTriggerClick");
                }
            });
        });
    }
    else if($(".imagesDataTabContent").length){
        initImagesTab();
        $("a.figureLink").attr('onclick', 'return false;').attr('data-link', 'modal_enhanced');
    }
    else if($(".abstract").length) {
        // hide audio abstract tab for enhanced view
        $(".abstractInnerTabs li.author-interview").hide();
        $(".authorInterview").hide();
    }

    $(".allReferencesLink").click(function(event){
        ajaxMainTabs.call($("li.showReferences a"));
    });

    addHoverLayerEvents();
    textBoxHead();
    //hide the second column and expand first column
    var cellArtFirstColumn = $($(".cellArtContent .pb-columns > div")[0]);
    var cellArtSecondColumn = $($(".cellArtContent .pb-columns > div")[1]);
    cellArtSecondColumn.hide();
    var cellWidthClass = cellArtFirstColumn.attr("class");
    //save the original size of the first column to revert later (when switching to standard view)
    if(window.sessionStorage ){
        window.sessionStorage.setItem("cellWidthClass", cellWidthClass);
    }
    cellArtFirstColumn.removeClass(cellWidthClass).addClass("width_1_1 extendedCellArt");

    // it seems the tabs are not getting the click listener since the page is not getting reloaded when switching tabs.
    // lets add the listener manually
    $(".tab-nav li a").click(function(event) {
        var $a = $(this);
        var href = $a.attr("href");
        if (href.indexOf("#") == 0) {
            //hash link
            var $tabModule = $a.closest(".tabs");
            $tabModule.children(".tab-nav").children().removeClass("active");
            $tabModule.children(".tab-content").children(".tab-pane").removeClass("active");

            $a.closest("li").addClass("active");
            $(href).addClass("active");
            event.preventDefault();
        }
    });

    //if there are no active inner tabs, show the first tab by default
    if (!$("#artTabContent").find(".tab-content > .tab-pane.active").length){
        $(".tab-content .tab-nav > li:first-child").addClass('active');
        $(".tab-content > .tab-pane:first-child").addClass('active');
    }
}

function toggleSections(){
    $(this).toggleClass("closed");
    var contentChildren = $(this).parent("section").find(".content").children();

    var sectionTitles = contentChildren.find(".content, section, .sectionTitle");
    if (sectionTitles.length > 0) {
        var parent = $(this);
        $.each(sectionTitles, function (index) {
            // if the child section of the section clicked does not match the parent, toggle it
            if (($(this).hasClass("closed") && !parent.hasClass("closed")) ||
                (!$(this).hasClass("closed") && parent.hasClass("closed"))) {
                $(this).toggleClass("closed");
                $(this).next(".content").children().toggle('slow');
            }
        });
    } else {
        contentChildren.not(".content, section, .sectionTitle").toggle('slow');
    }
}

function showImageData(e){
    var selectedValue = $(e.originalEvent.currentTarget).attr('id').substring(5);//since name's start with "back-"
    if ($("select.articleAttachments option[value='"+ selectedValue +"']").length > 0){
        $("select.articleAttachments").val(selectedValue).change();
    }
}
var isFirstLoad = true;
function ajaxMainTabs(e, o){
    if(isFirstLoad){
        isFirstLoad = false;
    }
    var url = $(this).attr("href");
    var $anchor = $(this);
    var $artTabContent = $('#artTabContent[class*="sn"]');
    var $skip = false;
    if ($artTabContent){
        var $tabContentClasses = $artTabContent.attr("class").split(/\s/);
        var $tabContentService = "";
        $.each( $tabContentClasses, function( key, value ) {
            if (value.indexOf("sn_") >= 0){
                $tabContentService = value;
            }
        });
        $skip = $(this).parent("li").hasClass($tabContentService.substring(3));
    }

    if (!$skip){
        $.get(url, { isAjax: "true"}, function(data){
            var $data = $($.trim(data));
            var $scienceDirectLink = $data.find("#scienceDirectLinkOnly");
            if ($scienceDirectLink.length){
                //is denial page
                window.location = $scienceDirectLink.attr("href");
            }else{
                $anchor.closest("ul").children().removeClass("active");
                var $serviceName = $anchor.parent().attr("class");
                $anchor.parent().addClass("active");
                $("#article .switchViewMode").html($data.find("#article .switchViewMode").html());
                bindSwitchViewMode();
                $artTabContent.html($data.find("#artTabContent").html());
                $artTabContent.removeClass($tabContentService).addClass("sn_" + $serviceName);
                var artTabY = $artTabContent.position().top;
                if ($(window).scrollTop() > artTabY){
                    $(window).scrollTop(artTabY-10)
                }
                addFullTextRightTabs();
                bindTabContentEvents();
                if (!o || !o.history) {
                    if (window.history && window.history.pushState) {
                        window.history.pushState(url, document.title, url); // we pass url as state object
                    }
                }
                //run the ajax-content scripts in the returned dom, if there are any
                AJAX_CONTENT.loadData();
                //evaluate all the jwplayer script tags within the returned dom
                eval($data.find(".avPlayer-replaceable script").text());
            }
            $.event.trigger("reloadTabsContent")
        }).fail(function() {
            // when the url is a redirect to science direct, the ajax call fails, so we'll just redirect manually
            window.location=url;
        });
    }

    e.preventDefault();
}

//Alex's js start

var togglePane = function() {
    var fulltext = $('.fullText');
    var tempScrollTop = $(window).scrollTop();
    var $fixedPane = $("#fixedPane");
    var leftOffset = $fixedPane.offset().left;
    var totalScroll = $(window).scrollTop() + $(window).height();
    var totalHeight = $(document).height();
    var varnersetElemnt = closestToOffset($(".articleContent").find("span"),{left:leftOffset-500, top:tempScrollTop});
    $(this).siblings().toggle();
    if ($(this).text() == "Hide Pane") {
        text = "Show Pane";
        fulltext.addClass("noPane");
        $('body').css("overflow","auto");
        $fixedPane.css("z-index","0");
    }
    else {
        text = "Hide Pane";
        fulltext.removeClass("noPane");
        $fixedPane.css("z-index","2");
    }
    $(this).text(text);
    if(totalScroll > totalHeight-100){
        $(window).scrollTop($(document).height());
    }else if(tempScrollTop > 300){
        $(window).scrollTop($(varnersetElemnt).offset().top-27);
    }
};
var showSelection = function(displayArea,target){
    displayArea.find("> div").css({"width": "0", "height": "0", "overflow": "hidden", "visibility": "hidden", "position": "absolute", "left": "-9999"});
    displayArea.find("[title='" + target + "']").css({"width": "", "height": "", "overflow": "", "visibility": "", "position": "", "left": ""});
};

var closestToOffset = function(currentElement,offset) {
    var el = null, elOffset, x = offset.left, y = offset.top, distance, dx, dy, minDistance;
    currentElement.each(function() {
        elOffset = $(this).offset();

        if (
            (x >= elOffset.left)  && (x <= elOffset.right) &&
            (y >= elOffset.top)   && (y <= elOffset.bottom)
        ) {
            el = $(this);
            return false;
        }

        var offsets = [[elOffset.left, elOffset.top], [elOffset.right, elOffset.top], [elOffset.left, elOffset.bottom], [elOffset.right, elOffset.bottom]];
        for (off in offsets) {
            dx = offsets[off][0] - x;
            dy = offsets[off][1] - y;
            distance = Math.sqrt((dx*dx) + (dy*dy));
            if (minDistance === undefined || distance < minDistance) {
                minDistance = distance;
                el = $(this);
            }
        }
    });
    return el;
};

var articleFixed = 0;

var onEnhancedViewScroll = function() {
    var tabs = $('#article .tabs:first');
    if (tabs.length >0){
        var tabNav = tabs.find('.tab-nav:first');
        var pane = $('#fixedPane');
        var tabsTop = tabs.offset().top - 7;
        if ($(window).scrollTop() >= tabsTop && articleFixed == 0) fixArticle(tabs,tabNav,pane);
        else if ($(window).scrollTop() >= tabsTop) return false;
        else unfixArticle(tabs,tabNav,pane);
    }
};

var fixArticle = function(tabs,tabNav,pane) {
    var tabsLeft = parseInt(tabNav.offset().left);
    var tabsWidth = tabNav.width();
    if ((pane.length>0) && !$(".fullText").find(".sectionTitle").hasClass("closed")){
        var paneLeft = parseInt(pane.offset().left);
        var paneWidth = pane.width();
        tabNav.css("left",tabsLeft + "px");
        tabNav.css("width",tabsWidth);
        pane.css("left",paneLeft + "px");
        pane.css("width",paneWidth);
        tabs.addClass('fixedArticle');
        articleFixed = 1;
    }
};
var unfixArticle = function(tabs,tabNav,pane) {
    tabs.removeClass('fixedArticle');
    tabNav.css("left","auto");
    pane.css("left","auto");
    articleFixed = 0;
};
var toggleTextBody = function () {
    var tb = $(this);
    var pm = tb.find('.plusMinus');
    var t = pm.text();
    pm.text(t === '+' ? '-' : '+');
    tb.children().not(pm).not(".articleTitle").add(tb.parent().find('.textbox-body')).fadeToggle();
};

function doUnica(anchor,isAjax) {

}

//function to add css class to main div(<div id="article>..</div>) depending on xml content
// to add a class, add the following to doc <input type="hidden" class="extraCssClass" value="{$value}" />
function addCssToMainDiv() {
    var $article = $("#article");
    $(".extraCssClass").each(function(){
        $article.addClass($(this).val());
    });
}

function handleIIPToolTips() {

    $(".IIPTooltip").focus(function() {
        var desc = $(this).find(".IIPDescription");
        if(desc.hasClass("showIIPDescription")) {
            desc.removeClass('showIIPDescription');
        } else {
            desc.addClass('showIIPDescription');
        }
    });

    $(".IIPTooltip").blur(function() {
        var desc = $(this).find(".IIPDescription");
        if(desc.hasClass("showIIPDescription")) {
            desc.removeClass('showIIPDescription');
        } else {
            desc.addClass('showIIPDescription');
        }
    });
}

function handleFbiImageEvents() {
    $(".FPImg").click(function() {
        if(parseInt($(this).css("width")) <= 550) {
            $(this).removeClass("smallFPImg");
        } else {
            $(this).addClass("smallFPImg");
        }
    });
}

function matchItemsHeight() {
    var $articleContent = $("#article");
    var $contentBody = $articleContent.find(".body");
    var $firstSection = $contentBody.find("section").first();
            if($firstSection.prevAll('.fig-wrapper')) { // .fig-wrapper before any content sections
                var figWrapperId = $('.fig-wrapper').first().attr('id');
                $("#" + figWrapperId + ", #AVContentDiv").matchHeight();
                $('.fig-wrapper').first().addClass('fig-wrapper-first');
                $('.fig-wrapper div:first-child').first().addClass('fig-wrapper-content');
            }

}

function hrefIsId(text){
    var regex = new RegExp("#");
    if (regex.test(text)) {
        return regex;
    }
}
function jumpToSection(button) {
    var jumpTo = $(button).prev().val();
    var childSecId;
    if (jumpTo.indexOf('.') !== -1)
    {
        childSecId = jumpTo.replace( /(:|\.|\[|\])/g, "\\\$1" ).toString();
    }
    if(jumpTo) {
        window.location.hash=jumpTo;
    }
    var sectionId=jumpTo.toString();
    $(childSecId).find('.sectionHeading:first').attr('tabindex','1').focus();
    $(childSecId).find('#jumpToSectionButton:first').attr('tabindex','1');
    $(sectionId).find('.sectionHeading').attr('tabindex','1');
    $(sectionId).find('#jumpToSectionButton').attr('tabindex','1');
    $(sectionId).find('.sectionHeading').children().attr('tabindex','1');
    $(sectionId).find('.sectionHeading:first').focus();
    $('.content').find('a').attr('tabindex','1');
    $('.content').find('table').attr('tabindex','1');
    $('ul').find('li').attr('tabindex','1');
    $('.sectionHeading').attr('tabindex','1');
    $('*').find('#jumpToSectionButton').attr('tabindex','1');
};function updateSavedSearch(event,queryId,value){

    if($('#updateSearchForm').length == 0) {
        var form  = "<form id='updateSearchForm' action='/action/doSaveSearch' method='post'>" +
            "<input type='hidden' id='queryId' name='queryId' value='"+ queryId +"' />"+
            "<input type='hidden' id='alertme' name='alertme' value='" + value +"' />"+
            "<input type='hidden' id='perform' name='perform' value='updateSearch' />"+
            "</form>";
        jQuery("body").append(form);
    }else{
        $("#queryId").val(queryId);
        $("#alertme").val(value);
    }

    setDisableToAllDropDownLists(true);
    var currentNodeContainer = $(event.target).parent();
    var tempMsg = $("<span> Saving ... </span>");
    currentNodeContainer.append(tempMsg);
    jQuery.ajax({
        url: '/action/doSaveSearch',
        type: 'POST',
        data: {queryId: $('#queryId').val(), alertme: $('#alertme').val(), perform: $('#perform').val(), ajax: 'true'},
        success: function(data, status)
        {
            currentNodeContainer.append(tempMsg.text('Saved'));
            setTimeout(function() {tempMsg.fadeOut();}, 1000);
            setDisableToAllDropDownLists(false);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown)
        {
            $('#searchAlert').closest().prepend('<h5 class="error"> The Alert frequency not saved please try later </h5>');
            setDisableToAllDropDownLists(false);
        }
    });
}

function setDisableToAllDropDownLists(disabled) {
    if(disabled) {
        $('.searchInput').attr('disabled', 'disabled');
    } else {
        $('.searchInput').removeAttr('disabled');
    }
}

;function showHideTable(table,source){
    $('#'+table).fadeToggle('slow');
    $(source).toggleClass("arrowUp");
    $(source).toggleClass("arrowDown");
}
;$(document).ready(function($){
    $('#isSociety').click(function(){
        initSocietyView('');
    });

    $("#activateClaimForm").submit(function(){
        if ($(this).find('[name="isSociety"]').prop('checked')){
            var sel = $('[name="societyCode"]').val();
            if(!sel){
                alert("Please select your society membership");
                return false;
            }
        }
    });
    /* 508 compliance*/
    if($('.formErrorDiv').is(':visible')) {
        $('.formErrorDiv:visible').focus();
    }
});

function changeSocieties(pub, productCode){
    getPrintSample($(pub).val(),false, productCode);
}

function getSocietiesList(jCode, societyCode, f, productCode){
    $.ajax({
        type: 'GET',
        url: '/pb/widgets/TokenActivationController/loadSocieties',
        dataType: 'html',
        async:'false',
        data: {
            journalCode:jCode,
            societyCode:societyCode,
            code: productCode
        },
        success: renderSocieties,
        putIn: f.find(".societyGroup")
    });
}

function renderSocieties(result){
    this.putIn.html(result);
}

function initSocietyView(societyCode) {
    var f = $('#isSociety').closest("form");
    var jCode = f.find('[name="journalCode"]').val();
    var checked = f.find('[name="isSociety"]').prop('checked');
    var productCode = getURLParameter("code");
    if (checked){
        ATYPON.alterView(f, ".view2");
        getSocietiesList(jCode, societyCode, f, productCode);
        getPrintSample(societyCode, false, productCode);
    }else{
        ATYPON.alterView(f, ".view1");
        getPrintSample('',true, productCode);
    }
}


function getPrintSample(society,displayDef, productCode){
    $.ajax({
        type: 'GET',
        url: '/pb/widgets/TokenActivationController/loadPrintSample',
        contentType: "application/json; charset=utf-8",
        dataType: 'html',
        async:'false',
        data: {
            societyCode:society,
            displayDefault: displayDef,
            code: productCode
        },
        success: renderSample
    });
}

function loadFirstSample(jCode){
    $.ajax({
        type: 'GET',
        url: '/pb/widgets/TokenActivationController/loadFirstSample',
        dataType: 'html',
        async:'false',
        data: {
            journalCode:jCode
        },
        success: renderSample
    });
}

function renderSample(result){
    $('.printSample').html(result);
};/* (c) Atypon
 When we have a dart ad at the head of the page.. we need to adjust the background image
 so that the header lines up properly with the background image
 */
(function ($) {
    var hostname = location.hostname;
    if (hostname.indexOf("cell.com") != -1 || hostname.indexOf('lancet.com') != -1) return;
    var dartTimer = window.setInterval(showPopulatedDartAds, 100);
    window.setInterval(function () { window.clearInterval(dartTimer) }, 2000);

    function showPopulatedDartAds() {
        var dartAd = $('.dartAd');
        dartAd.each(function () {
            // show the ad if the empty ad anchor tag is not used
            // and an iframe, object, or anchor tag is present
            // or if the ?ads debugger is being used
            var a = $(this);
            if (location.search.indexOf('?ads') !== -1 || (a.find('a[href$="%3f"]').length === 0 && a.find('iframe,object,a').length > 0)) a.show();
        });
        // check if leaderboard ad is displayed to adjust background alignment
        // assumes that leaderboard ad will always be the first .dartAd on the page
        if (dartAd.first().css("display") == "block") $('body').addClass("hasLeaderboard");
    }
})(jQuery);
///Draggable iFrame code 24/04/11 OS.
// Note needs correct background for helpbox in css to make ensure close box appears. Available in helpbox.css
// make sure to add this.
var addthis_config = addthis_config || {};
addthis_config.ui_click = true;

/*popup layer with helpbox iframe*/
function helpbox(url) {
    resetPopups();
    jQuery('.RNhelpbox').remove();
    if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i))) {
        window.open(url);
    } else {
        var x = document.body.clientHeight < 500;
        var backgroundImage = 'style="background-image: url(/templates/jsp/_style2/_marlin/images/bg_lightbox_' + (x ? 'medium' : 'large') + '.png)"';
        iframelink = '<iframe frameborder="0" style="width:760px;height:' + (x ? 3 : 4) + '45px" src="' + url + '"></iframe>';//Why is this global???
        var popup = jQuery('<div class="RNhelpbox RNhelpbox_' + (x ? 'medium' : 'small') + '" '+ backgroundImage +' ><div class="iframebtn_close" id="close-help"/><div class="RNViewerHelpbox">' + iframelink + '</div></div>');
        jQuery('body').append(popup).on("click", '#close-help', function () {
            jQuery('.RNhelpbox').remove();
        });
    }
}

//Reset all popup layers
function resetPopups() {
    jQuery('.lightbox,.editboard_box,.succes_box,.overlay_whislist,.RNhelpbox').hide()
};// setup event listeners when page is loaded
$(document).ready(initResetPasswordFormValidation);

if (window.PB && window.PB.$) {
    // re-setup event listeners when the page changes in editing mode
    window.PB.$(document.documentElement).on("ScopeModified ScopeLoaded", initResetPasswordFormValidation);
}

function initResetPasswordFormValidation(){
    $('#resetPasswordForm').submit(function() {
       return validateResetPassword();
    });
}

 function validateResetPassword(){
     var password1 = $("input[name='password1']").val();
     if(password1.length < 5){
         showValidationText2("Please enter a password that has at least five (5) characters ");
         return false;
     }else{
         var password2 = $("input[name='password2']").val();
         if(password1 != password2){
             showValidationText2("The Password and Confirm Password entries did not match");
             return false;
         }
     }
 }

 function showValidationText2(validationText){
     if($("div.errorMsg").length == 0){
        var errorDiv = "<div class='errorMsg'>" + validationText + "</div>";
        $("div.resetMsg").after(errorDiv);
    }else{
        $("div.errorMsg").text(validationText);
    }
 };// setup event listeners when page is loaded
$(document).ready(
    submitOnlyOnce,
    initChangePasswordFormValidation
);

if (window.PB && window.PB.$) {
    // re-setup event listeners when the page changes in editing mode
    window.PB.$(document.documentElement).on("ScopeModified ScopeLoaded", initChangePasswordFormValidation);
}

function initChangePasswordFormValidation(){
    $('#changePasswordForm').submit(function() {
       return validateChangePasswordFormValidation();
    });

    if($('#formErrorList').is(':visible')) {
        $('#formErrorList').focus();
    }
}

 function validateChangePasswordFormValidation(){
     var password1 = $("#password").val();
     if(password1.length < 5){
         showValidationTextForChangePassword("Please enter a password that has at least five (5) characters ");
         return false;
     }else{
         var password2 = $("#password2").val();
         if(password1 != password2){
             showValidationTextForChangePassword("The Password and Confirm Password entries did not match");
             return false;
         }
     }
 }

 function showValidationTextForChangePassword(validationText){
     if($("h5.passwordLength").length == 0){
        var errorDiv = "<li><h5 class='error passwordLength' role='alert' id='passwordLengthError'>" + validationText + "</h5></li>";
        $("li.currentPasswordLi").after(errorDiv);
         if($('#currentPassword').is(':visible')) {
             $('#currentPassword').attr('aria-describedby', 'passwordLengthError');
         }
    }else{
        $("h5.passwordLength").text(validationText);
    }
 }

function removeLegacySelection(selection, legacySelection, description) {
    if (legacySelection.length > 0) {
        selection.options[0] = new Option(description, "");
    }
}
function submitOnlyOnce(){
    $('#accountInfoForm').submit(function() {
            $('#accountInfoBtn').attr('disabled','disabled');
    });
};$(document).ready(function() {
    $(".doLogin").keyup(function(event) {
        event.preventDefault();
        if (event.keyCode == 13 && navigator.userAgent.toLowerCase().indexOf("msie 8") >= 0){
                $(this).submit();
                return false;
        }
        return true;
    });

    if($("input[name=login]").length > 0 && $("input[name=login]").val().length > 0){
        $("#passwordNormalUser").focus();
    }
});function changeSortPreserveTab(radio) {
    if (radio.checked)  window.location = setUrlParam(setUrlParam($(radio).val(), "tabColId", getTabsCollectionId(radio)),"tabIdx", getActiveTabIndex(getTabsCollectionId(radio)));

}

function getActiveTabIndex(tabsCollectionId){
    var currentTabIndex =  $("#"+tabsCollectionId).find(".active").data("index");
    return currentTabIndex;
}

function getTabsCollectionId(element){
    var tabsCollectionId = $(element).closest(".tabs-widget").attr("id");
    return tabsCollectionId;
}

;jQuery(document).ready(initArticleImageData);
if (window.PB && window.PB.$) {
    // make this module reinitializes in design mode
    window.PB.$(document.documentElement).on("ScopeModified ScopeLoaded", initArticleImageData);
}

function initArticleImageData(){
    initImagesTab();
    positionVideoDownloadLink();

}

function initImagesTab(){
    $("div.articleImagesContent:first").css("display","block");
    $("div.articleImagesSlideImage:first").addClass("activeImage");

    $("div.articleImagesSlideImage").click(function(){
        var position = $(this).attr("title");
        var $clickedImg = $(this);
        $("div.articleImagesSlideImage").removeClass("activeImage");
        $("div.articleImagesContent").not("div.articleImageContent" + position).fadeOut();
        $("div.articleImageContent" + position).fadeIn();
        $clickedImg.addClass("activeImage");
    });


    $(".imageCaptionInArticle, .imageContextInArticle").find('a.figureLink').click(function() {
        var filename = $(this).attr('name').substring(5);//since name's start with "back-"
        $("div.articleImagesSlideImage").removeClass("activeImage");
        $("div.articleImagesContent").not("div.articleImageContent" + filename).fadeOut();
        $("div.articleImageContent" + filename).fadeIn();
        $("div.articleImagesSlideImage[title='" + filename + "']").addClass("activeImage");
    });
}

function positionVideoDownloadLink(){
    $("#audioContent div.avPlayer-wrap div.downloadlink,#videoContent div.avPlayer-wrap div.downloadlink").each(function(){
        var downloadLinkHtml = $('<div>').append($(this).clone()).remove().html();
        $(this).closest('div.AVPart').append(downloadLinkHtml);
        $(this).remove();

    });
};jQuery(document).ready(function($) {
         var init = function() {
             checkSelectedSortType();
         };

         init();
         if (window.PB && window.PB.$) {
             // make this module reinitializes in design mode
             window.PB.$(document.documentElement).on("ScopeModified ScopeLoaded", init);
         }
    removeLastBorderFromarticleList();
});

function editSelectedSortType(radio){
    if($("#menuTab").val() == 'Alerts'){
        setCookie("selectedSortOption"+$("#menuTab").val(),getURLParameterFromString("sortBy",$(radio).val()));
    }
    else{
        setCookie("selectedSortOption",getURLParameterFromString("sortBy",$(radio).val()));
    }

}

function checkSelectedSortType(){
    if($("#menuTab").val() == 'Alerts'){
        var selectedSort = getCookie("selectedSortOption"+$("#menuTab").val());
    }
    else{
        var selectedSort = getCookie("selectedSortOption");
    }
    if(selectedSort != null){
        switch(selectedSort){
            case "artTitle":
                $("#artTitle").attr("checked","checked")
                break;
            case "jrnTitle":
                $("#jrnTitle").attr("checked","checked")
                break;
            case "date":
                $("#sortDate").attr("checked","checked")
                break;
        }
    }

}

function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1)
      {
      c_start = c_value.indexOf(c_name + "=");
      }
    if (c_start == -1)
      {
      c_value = null;
      }
    else{
      c_start = c_value.indexOf("=", c_start) + 1;
      var c_end = c_value.indexOf(";", c_start);
      if (c_end == -1)
      {
        c_end = c_value.length;
      }
      c_value = unescape(c_value.substring(c_start,c_end));
    }
    return c_value;
}

function removeLastBorderFromarticleList(){
    $("div.abstractArticleLinks").each(function(){
        $(this).find("ul li:last").css("border","none");
    });
}
;jQuery(document).ready(function($) {
    $(".freeTrialHoverLayer").each(function() {
        var layer = jQuery(this);
        layer.parent().find(".layerTrigger").add(layer).off("mouseenter mouseleave").click(function(event) {
            $("div.freeTrialHoverLayer").hide();
            layer.show();
            event.stopPropagation();
        });

        layer.find("span.closeBtn").add(layer.parent()).off("mouseenter mouseleave").click(function(event) {
            layer.hide();
            layer.parent().show();
            event.stopPropagation();
        });
    });
    $('html').click(function() {
        $("div.freeTrialHoverLayer").hide();
    });
});
/* (c) Atypon */
(function ($) {

    function init() {
        $('.issueCoverCarousel').each(function () {
            var $carousel = $(this);

            // enable the prev/next slide navigation functions
            enablePrevNext($carousel);

            enableHover($carousel);

            enableAnimation($carousel);

            if($carousel.find('.cover').length < 5) {
                hideNavigationArrows($carousel);
            }

        });
    }


    function previousCover($carousel) {
        var $firstCover = $carousel.find('.cover:first');
        var $lastCover = $carousel.find('.cover:last');
        // move the last cover in place of the first one
        $lastCover.css('margin-left', -$lastCover.outerWidth(true));
        $lastCover.prependTo($firstCover.parent());
        // animate the slide to make it visible
        $lastCover.animate({'margin-left':0}, 500);
    }

    function nextCover($carousel) {
        var $firstCover = $carousel.find('.cover:first');
        // animate the first slide to the left
        $firstCover.animate({'margin-left':-$firstCover.outerWidth(true)}, 500, function () {
            // animation is complete. move the first cover after the last one
            $firstCover.appendTo($firstCover.parent());
            $firstCover.css('margin-left', 0);
        });
    }

    function enablePrevNext($carousel) {
        $('.slideNav', $carousel).show();
        $carousel.find('.prev').off().click(function (e) {
            e.preventDefault();
            disableAnimation($carousel);
            previousCover($carousel);
        });
        $carousel.find('.next').off().click(function (e) {
            e.preventDefault();
            disableAnimation($carousel);
            nextCover($carousel);
        })
    }

    function enableAnimation($carousel) {
        var autoplay = $carousel.data('autoplay');
        if (autoplay) {
            clearInterval(autoplay);
        }
        // start autoplay; pause it when hovering over the slideshow and resume it when leaving
        var autoplayTime = $('.autoplayTime', $carousel).val();
        if (autoplayTime) {
            autoplayTime = autoplayTime * 1000;

            function nextCoverFunc() {
                var attached = $carousel.closest('body').length;
                if (!attached) {
                    disableAnimation($carousel);
                    return;

                }
                nextCover($carousel);
            }

            autoplay = window.setInterval(nextCoverFunc, autoplayTime);
            $carousel.data('autoplay', autoplay);
            $('.play', $carousel).hide();
            $('.pause', $carousel).show();

            $carousel.off().bind({
                mouseenter:function () {
                    clearInterval(autoplay);
                },
                mouseleave:function () {
                    enableAnimation($carousel);
                }
            });
        }
    }

    function enableHover($carousel) {

        function resetTimeout($carousel){
            var hideTimeout = $carousel.data('hideTimeout');
            if (hideTimeout) {
                clearTimeout(hideTimeout);
            }
        }

        function hideHovers($carousel) {
            var hideTimeout = setTimeout(function() {
                $('.cover', $carousel).removeClass('active');
                $('.hover', $carousel).hide();
            }, 100);
            $carousel.data('hideTimeout', hideTimeout);
        }

        $('.cover', $carousel).mouseenter(function () {
            var $cover = $(this);
            var $hover = $(".hover[data-uri='" + $cover.data('uri') + "']", $carousel);
            var position = $cover.position();
            $hover.css({
                left: position.left + 'px',
                top: (position.top + $cover.innerHeight()) + 'px'
            });
            resetTimeout($carousel);

            $('.cover', $carousel).removeClass('active');
            $cover.addClass('active');

            $('.hover', $carousel).hide();
            $hover.show();

        }).mouseleave(function () {
           hideHovers($carousel);
        });

        $('.hover', $carousel).mouseenter(function() {
            var $hover = $(this);
            var $cover = $(".cover[data-uri='" + $hover.data('uri') + "']", $carousel);

            resetTimeout($carousel);

            $('.cover', $carousel).removeClass('active');
            $cover.addClass('active');

            $('.hover', $carousel).hide();
            $hover.show();
        });

        $('.hover', $carousel).mouseleave(function () {
            hideHovers($carousel);
        });
    }

    function disableAnimation($carousel) {
        var autoplay = $carousel.data('autoplay');
        if (autoplay) {
            // disable it permanently
            $('.autoplayTime', $carousel).remove();
            clearInterval(autoplay);
            $('.pause', $carousel).hide();
            $('.play', $carousel).show();
        }
    }

    function hideNavigationArrows($carousel) {
        $carousel.find('.prev').css('display','none');
        $carousel.find('.next').css('display','none');
    }

    $(document).ready(init);


    if (window.PB && window.PB.$) {
        // make this module reinitializes in design mode
        window.PB.$(document.documentElement).on("ScopeModified ScopeLoaded WidgetReloaded", init);
    }

})(jQuery);
$(function() {

    var $picQuiz = $(".pictureQuiz-full");
    	 var c = $(".thumbnail  li" , $picQuiz ).first().find("img").attr("src");
            if(typeof(c) != "undefined"){

                var n = c.substring(0, c.lastIndexOf("-sml")) + c.substring(c.lastIndexOf("-sml") + 4, c.length);
                var largeImage = $("<img src='"+n+"'/>");

                  $(largeImage).load(function(){
                      $(".mainImage").html(largeImage);
                  });
            }

    	$('.thumbnail li', $picQuiz ).click(function() {imageViewer(this)});
    	$('.imageSlider li' ,  $picQuiz ).click(function() {imageViewer(this);});
    	$("input[name=q]").change(function(){$(".answerButton").removeAttr("disabled")});

        $(".answerButton",  $picQuiz ).click(function(){
            $(".questionMode").addClass("hidden");
            $(".answerMode").removeClass("hidden");
            if ($("input[name=q]:checked").val() === $("input[name='correctAnswer']").val()){
                $(".result").removeClass("wrong").addClass("correct").html("Correct");
                $(".explanation").removeClass("hidden");
                $(".retryBtn").addClass("hidden");
            }else{
                $(".result").removeClass("correct").addClass("wrong").html("That was not the best answer. Please try again.");
                $(".retryBtn").removeClass("hidden");
                $(".explanation").addClass("hidden");
            }

        });

        $(".retryBtn"  , $picQuiz ).click(function (){
            $(".questionMode").removeClass("hidden").find("input:radio").removeAttr('checked');
            $(".questionMode .answerButton").attr("disabled", "disabled");
            $(".answerMode").addClass("hidden");
        });

    	function imageViewer(elem){
    		var imageSliders = $('.imageSlider li');
    		var imageThumbs = $('.thumbnail li');
    		$(imageSliders).removeClass("activeThumb");
    		$(imageThumbs).removeClass("activeThumb");


    		var index = $(elem).data("index");
    		var activeSlide = $(".imageSlider li[data-index='"+index+"']");
    		var activeThumb = $(".thumbnail li[data-index='"+index+"']");

    		$(activeSlide).addClass("activeThumb");
    		$(activeThumb).addClass("activeThumb");

    		var c = $(activeThumb).find("div img").attr("src");
            var n = c.substring(0, c.lastIndexOf("-sml")) + c.substring(c.lastIndexOf("-sml") + 4, c.length);
            var alt = $(activeThumb).find("div img").attr("alt");
            var copyright = $(activeThumb).find("div img").data("copyright");
              	var largeImage = $("<img src='"+n+"'/>").attr("alt",alt);
              	$(largeImage).load(function(){
                    $(".mainImage").html(largeImage);
    			    $(largeImage).css(calculateAspectRatioFit(this.width,  this.height, $('.sliderWidth').val() -10,$('.sliderHeight').val() - 10 ));
                    if (copyright){
                        $(".copyright").empty().removeClass("hidden").html(copyright);
                    }else{
                        $(".copyright").empty().addClass("hidden");
                    }

                });
    	}
    function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
        var ratio = [maxWidth / srcWidth, maxHeight / srcHeight ];
        ratio = Math.min(ratio[0], ratio[1]);
        return { "width":srcWidth*ratio, "height":srcHeight*ratio };
    }

    });


$(window).load(function() {
    function init() {
        $(".cardStack .cardItems").each(function () {
            var $this = $(this);
            if ($this.length && !$this.data("initialized")) {
                $this.data("initialized", true);
                var $parent = $this.parent();
                $this.carouFredSel({
                    items: {
                        visible: 1,
                        height: 'variable'
                    },
                    auto: {play: false},
                    pagination: $parent.find(".cardControl .pagination"),
                    next: $parent.find(".cardControl .nextCard"),
                    prev: $parent.find(".cardControl .prevCard"),
                    width: "100%",
                    scroll : {
                        onAfter : $highlight
                    },
                    height: "variable"
                });
            }
            $(this).find('div.storyTeaserWidget:gt(0)').addClass('unActiveStoryTeaser');
        });
    }

    var $highlight = function() {
        $(".cardItems").find('div.storyTeaserWidget:eq(0)').removeClass('unActiveStoryTeaser');
        $(".cardItems").find('div.storyTeaserWidget:gt(0)').addClass('unActiveStoryTeaser');
    };


    function loadWidget() {
        var loadables = $(".cardStack *[src], .cardStack .mediaPlayer");
        if (loadables.length) {
            // Wait for the images to be completely loaded before initializing the plugin.
            var total = loadables.length;

            function onLoaded() {
                total--;
                if (total == 0) {
                    init();
                }
            }

            loadables.on('load', onLoaded);
            loadables.on('error', onLoaded);
            // also set a timeout in case some of the images fail to load and browser fails to notify us
            setTimeout(init, 500);
        } else {
            init();
        }
    }

    loadWidget();

    $(document).on('deferredWidgetLoaded', loadWidget);
});
/*508 compliance*/
$(document).ready(function() {
    if($('h5.error').is(':visible')) {
        $('h5.error:visible').focus();
    }
});$(document).ready(function(event) {
    if($('#reSortingBtn').is(':visible')) {
        $('#reSortingBtn').focus();
    }
});

function changeSortPreserveTab(radio) {
    window.location =
        setUrlParam(setUrlParam($(radio).val(),
            "tabColId", getTabsCollectionId(radio)),
            "tabIdx", getActiveTabIndex(getTabsCollectionId(radio)));
};$(function() {

    $(".pCollTitle").on("click", ".colIcon" , function() {
        var colId = $(this).attr("data-collectionId");
        $childrenCollection = $("ul[data-collectionId="+colId+"]");

        if ($childrenCollection.hasClass("hidden")){
            $childrenCollection.removeClass("hidden");
            $(this).removeClass("closeGroup").addClass("openGroup");
        }else{
            $childrenCollection.addClass("hidden");
            $(this).removeClass("openGroup").addClass("closeGroup");
        }

    });
});
$(function($) {
    $(".collectionsAlertBox").dialog({width:530, height:400}).dialog("close");

    $(".colDialogOpen").on("click",   function(e) {
        e.preventDefault();
        $(".collectionsAlertBox").removeClass("hidden");
        var openerId = $(this).attr("id");
        var dialogId = "#dialog-"+ openerId.substr(openerId.indexOf("-")+ 1);
        $(dialogId).dialog("open");
    });
});

$(function($){
    $("#submiteCollection").click(function(){
            if ($('input[type="checkbox"]:checked').length ==0) {
                $("#selectOneItemSpan").css('display','block');
                $(".collectionOptions").css('overflow','hidden');
                return false;
            } else {
                $("#selectOneItemSpan").css('display','none');
                $("#updateCollectionAlert").submit();
            }
    });
 });
$(function($) {
    $(".collectionsAlertBox").dialog({width:530, height:400}).dialog("close");

    $(".collectionContent").on( "change", ".collectionGroup",function(){
        if ($(this).find('option:selected').hasClass("parentCol")) {
            $(this).prev("input.parentColCode").remove();
        }
        $(this).closest("form").submit();

    });

    $(".collectionContent").on( "change", ".colYearsFilter",function(){
        if ($(this).find('option:selected').hasClass("allYearsFilter")) {
            $(this).prev("input.yearFieldType").remove();
            $(this).attr("name","");
            var $form = $(this).closest("form");

            $form.submit();
        }else{
            $(this).closest("form").submit();
        }
    });

    if($(".recentCollectionContent").length > 0) {
        $(".recentCollectionContent").pbAjax({
            type: 'GET',
            dataType: 'html',
            url: '/pb/widgets/MostRecentLancetCollectionContent/loadMostRecentCollections',
            async:'false',
            success: function(data) {
                $(".simpleCollectionContent").html(data);
            }
        });
    }
});$(document).ready(function($){
    var $societies = $(".societySelect");
    $societies.change(function(){
        var selected = $(this).val();
        if (!selected) {
            $(".helpText").html("");
            $(".forgotPw").html("");
            return;
        }
        loadSitePartnerFields(selected);
    });
    if ($societies.val()) {
        loadSitePartnerFields($societies.val());
    }
});

function loadSitePartnerFields(society) {
    $.getJSON("/pb/widgets/societySso/society", {society : society})
        .done(function(data){
            populateFields(data);
    });
}

function populateFields(data) {
    var forgotPwUrl = data['forgotPwUrl'];
    var helpText= data['helpText'];
    $(".helpText").html(helpText);
    if (forgotPwUrl) {
        var newLink = $("<a />", {
                href : forgotPwUrl,
            text : "Forgot Password?"
        });
        $(".forgotPw").html(newLink);
    } else {
        $(".forgotPw").html("");
    }
}
;$(document).ready(function(){

    var doi = $("#articleDoi").val();
    var pii = $("#articlePii").val();

    $( ".innovationFrame" ).each(function() {
        var container = $(this);
        var appCode = container.data().code;
        $.ajax({
            type: 'GET',
            url:"/pb/widgets/ContentInnovationController/" + appCode,
            dataType: 'html',
            async:'false',
            data: {
                doi:doi,
                pii:pii
            },
            success:function(html) {
                renderWidget(html, container);
            }
        });
    });
});

function renderWidget(html, container) {
    container.html(html);
};$(document).ready(function($){
    $(".deferredWidget").each(function(index){
        var $widget = $(this).closest(".widget");
        var dataAttributes = $(this).data();
        var widgetType = dataAttributes['pbWidgetType'];
        $widget.pbAjax({
            type: 'GET',
            dataType: 'html',
            url: '/pb/widgets/render/' + widgetType,
            async:'false',
            data: dataAttributes,
            success: function(data) {
                var $container = $widget.find('.deferredWidget');
                if (!isNullOrEmptyOrWhitespace(data)) {
                    $container.replaceWith(data);
                    $widget.show();
                }
                $.event.trigger("deferredWidgetLoaded");
            }
        });
    });
});
/**
 * Created by atammam on 12/27/15.
 */
function showComments() {
    if($("#loadComments").length > 0 && $("#loadComments").val() === 'true'){
        $.getScript("http://zor.livefyre.com/wjs/v3.0/javascripts/livefyre.js",function () {
            var encodedUrl = $("#encodedUrl").val();
            if ($("#livefyre-comments").children().length == 0){
                fyre.conv.load({}, [{
                    el: "livefyre-comments",
                    siteId: $("#siteId").val(),
                    network: "livefyre.com",
                    articleId: encodedUrl,
                    signed: false,
                    collectionMeta: {
                        articleId: encodedUrl,
                        url: encodedUrl
                    }
                }], function() {});

            }});
    }
};
/**
 * Created by atammam on 12/27/15.
 */
jQuery(document).ready(function($) {
    var form = document.getElementById('alertsForm');
    //this file load in wro.xml so that we have to check if form empty or not
    if(form != null){
        form.onsubmit = validateAlertSave;
    }

});
function addJournalToSelectedLayer(titleVal, issnVal, isIIP){
    var alertsTable = $('#journalsAlertsTable').find('tbody');
    var inProgressLabel = $("#inProgressLabel").val();
    var iipInput;
    if((isIIP == 'true')) {
        iipInput = '<td class=\"tocAlertCell center-content\"><input type=\"checkbox\" value=\"true\" name=\"inProgress_' + issnVal + '\"  onclick=\"enableForgotToSaveWarning()\"></td>';
        if($("#iipHeader").length == 0) {
            $('<th id="iipHeader" class="center-content"><div class=\"center-content\">' + inProgressLabel + '</div></th>').insertAfter('.contentsAlert');
            $("#journalsAlertsTable tr").each(function() {
                $('<td class=\"tocAlertCell center-content\"></td>').insertAfter($(this).find(".tocAlertCell"));
            });
        }
    } else {
        iipInput = ($("#iipHeader").length != 0) ? '<td class=\"tocAlertCell center-content\"></td>' : '';
    }
    var html = alertsTable.html();

    html = html + '<tr> <td class=\"hiddenCell\"> <input type=\"text\" value=\" ' + issnVal + '\" name=\"metaIssn_' + issnVal + ' \"/> </td> <td class=\"titleCell\">' + titleVal + '</td>' +
        '<td class=\"tocAlertCell\"> <input type=\"checkbox\" name=\"tocAlert_' + issnVal + '\" checked=\"true\">' + '</td>' + iipInput +
        '<td class=\"axaAlertFreqCell\">' +
        '<label><input type=\"radio\" name=\"aopAlertFreq_' + issnVal + '\" value=\"N\">Never</label> ' + '<label><input type=\"radio\" name=\"aopAlertFreq_' + issnVal + '\" value=\"D\"/>Daily</label> ' +
        '<label><input type=\"radio\" checked name=\"aopAlertFreq_' + issnVal + '\" value=\"W\"/>Weekly</label> ' + '<label><input type=\"radio\" name=\"aopAlertFreq_' + issnVal + '\" value=\"M\"/>Monthly</label> ' +
        '</td>' + '</tr>';

    alertsTable.html(html);
    enableForgotToSaveWarning();
    $("#journalsAlertsTable").show();
    $("div.emptyJournalAlertsDiv").hide();
}

function enableForgotToSaveWarning(){
    window.onbeforeunload = function () {
        return 'You are about to leave without saving your alerts!';
    }
}

function validateAlertSave(){
    window.onbeforeunload = null;
    return true;
}

function isSelectedJournalListEmpty(isEmpty){

};/**
 * Created by atammam on 12/27/15.
 */

jQuery(document).ready(function($) {

    var webAreaLive = $("#webAreaLive");
    if(webAreaLive.length > 0 && webAreaLive.val() === 'true'){
        $("div.articleCitation").each(function(){
            var doi = $(this).find( "div.detail div.doi").text();
            doi = doi.replace("DOI: http://dx.doi.org/","")
            $(this).find("div.detail div.formats a").click(function(event){
                event.preventDefault();
                var self = this;
                $.ajax({
                    url: "/action/clientSideLogging",
                    data: {
                        type: '100',
                        doi: doi
                    }
                }).done(function() {
                    if(self.href.indexOf("#", self.href.length - 1) == -1){
                        location.href = self.href;
                    }
                });
                return true;
            })
        });
    }
});
$(function($) {

    $("#selectedCollection").click(function() {
        if ($('input[type="checkbox"]:checked').length ==0){
            $("#removeAlert").prop('disabled', true);
        }
        else
        {
            $("#removeAlert").prop('disabled', false);
        }
    });
});
(function($) {
    var AdobeAnalytics = {
        init: function() {
            AdobeAnalytics.bindEvents();
        },

        bindEvents: function() {
            $(".pdfLink").click(function() {
                var pii = $(this).data('pii');
                if (!pii) {
                    var $parent = $(this).closest('.toolPdf');
                    pii = $parent.data('pii');
                }
                var pageName= $(this).attr('href');
                var $widget = $(this).closest(".widget");
                $widget.pbAjax({
                    type: 'POST',
                    url: '/pb/widgets/adobeAnalytics/pdfClick',
                    async:'false',
                    data: {pii: pii, pageName: pageName},
                    success: function(data) {
                        if (data) {
                            AdobeAnalytics.logMessage("calling adobe contentDownload with data: " + data);
                            pageDataTracker.trackEvent('contentDownload', JSON.parse(data));
                        }
                    }
                });
            });

            $(".ppvOfferLink").click(function () {
                var price = $("[name='offerPrice']");
                var quantity = $("[name='offerQuantiy']");
                var pii = $("[name='offerItemId']");
                var offerData = {'content': [{'price' : price.val(), 'id' : pii.val(), 'quantity': quantity.val()}]};
                AdobeAnalytics.adobeCartAddEvent(offerData);
            });

            $(document).on('click', "[name='addToCart']", function(){
                var offerData = $(this).data();
                AdobeAnalytics.adobeCartAddEvent(offerData);
            });

            $(".removeOffer").click(function() {
                var dataAttributes = $(this).data();
                AdobeAnalytics.cartRemove(dataAttributes);
            });
        },

        adobeCartAddEvent: function(offerData) {
            AdobeAnalytics.logMessage("calling adobe cartAdd with data: " + JSON.stringify(offerData));
            pageDataTracker.trackEvent('cartAdd', {
                "content": [{
                    "id": offerData['id'],
                    "price": offerData['price'],
                    "quantity": offerData['quantity']

                }]
            });
        },

        cartRemove: function (offerData) {
            AdobeAnalytics.logMessage("calling adobe cartRemove action:" + JSON.stringify(offerData));
            pageDataTracker.trackEvent('cartRemove', {
                "content": [{
                    "id": offerData['id'],
                    "price": offerData['price'],
                    "quantity": offerData['quantity']

                }]
            });
        },

        logMessage: function (message) {
            if ( window.console && window.console.log ) {
                console.log(message);
            }
        }

    };

    $(document).ready(AdobeAnalytics.init);

})(jQuery);/*
 *	jQuery carouFredSel 6.2.1
 *	Demo's and documentation:
 *	caroufredsel.dev7studios.com
 *
 *	Copyright (c) 2013 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


(function($){function sc_setScroll(a,b,c){return"transition"==c.transition&&"swing"==b&&(b="ease"),{anims:[],duration:a,orgDuration:a,easing:b,startTime:getTime()}}function sc_startScroll(a,b){for(var c=0,d=a.anims.length;d>c;c++){var e=a.anims[c];e&&e[0][b.transition](e[1],a.duration,a.easing,e[2])}}function sc_stopScroll(a,b){is_boolean(b)||(b=!0),is_object(a.pre)&&sc_stopScroll(a.pre,b);for(var c=0,d=a.anims.length;d>c;c++){var e=a.anims[c];e[0].stop(!0),b&&(e[0].css(e[1]),is_function(e[2])&&e[2]())}is_object(a.post)&&sc_stopScroll(a.post,b)}function sc_afterScroll(a,b,c){switch(b&&b.remove(),c.fx){case"fade":case"crossfade":case"cover-fade":case"uncover-fade":a.css("opacity",1),a.css("filter","")}}function sc_fireCallbacks(a,b,c,d,e){if(b[c]&&b[c].call(a,d),e[c].length)for(var f=0,g=e[c].length;g>f;f++)e[c][f].call(a,d);return[]}function sc_fireQueue(a,b,c){return b.length&&(a.trigger(cf_e(b[0][0],c),b[0][1]),b.shift()),b}function sc_hideHiddenItems(a){a.each(function(){var a=$(this);a.data("_cfs_isHidden",a.is(":hidden")).hide()})}function sc_showHiddenItems(a){a&&a.each(function(){var a=$(this);a.data("_cfs_isHidden")||a.show()})}function sc_clearTimers(a){return a.auto&&clearTimeout(a.auto),a.progress&&clearInterval(a.progress),a}function sc_mapCallbackArguments(a,b,c,d,e,f,g){return{width:g.width,height:g.height,items:{old:a,skipped:b,visible:c},scroll:{items:d,direction:e,duration:f}}}function sc_getDuration(a,b,c,d){var e=a.duration;return"none"==a.fx?0:("auto"==e?e=b.scroll.duration/b.scroll.items*c:10>e&&(e=d/e),1>e?0:("fade"==a.fx&&(e/=2),Math.round(e)))}function nv_showNavi(a,b,c){var d=is_number(a.items.minimum)?a.items.minimum:a.items.visible+1;if("show"==b||"hide"==b)var e=b;else if(d>b){debug(c,"Not enough items ("+b+" total, "+d+" needed): Hiding navigation.");var e="hide"}else var e="show";var f="show"==e?"removeClass":"addClass",g=cf_c("hidden",c);a.auto.button&&a.auto.button[e]()[f](g),a.prev.button&&a.prev.button[e]()[f](g),a.next.button&&a.next.button[e]()[f](g),a.pagination.container&&a.pagination.container[e]()[f](g)}function nv_enableNavi(a,b,c){if(!a.circular&&!a.infinite){var d="removeClass"==b||"addClass"==b?b:!1,e=cf_c("disabled",c);if(a.auto.button&&d&&a.auto.button[d](e),a.prev.button){var f=d||0==b?"addClass":"removeClass";a.prev.button[f](e)}if(a.next.button){var f=d||b==a.items.visible?"addClass":"removeClass";a.next.button[f](e)}}}function go_getObject(a,b){return is_function(b)?b=b.call(a):is_undefined(b)&&(b={}),b}function go_getItemsObject(a,b){return b=go_getObject(a,b),is_number(b)?b={visible:b}:"variable"==b?b={visible:b,width:b,height:b}:is_object(b)||(b={}),b}function go_getScrollObject(a,b){return b=go_getObject(a,b),is_number(b)?b=50>=b?{items:b}:{duration:b}:is_string(b)?b={easing:b}:is_object(b)||(b={}),b}function go_getNaviObject(a,b){if(b=go_getObject(a,b),is_string(b)){var c=cf_getKeyCode(b);b=-1==c?$(b):c}return b}function go_getAutoObject(a,b){return b=go_getNaviObject(a,b),is_jquery(b)?b={button:b}:is_boolean(b)?b={play:b}:is_number(b)&&(b={timeoutDuration:b}),b.progress&&(is_string(b.progress)||is_jquery(b.progress))&&(b.progress={bar:b.progress}),b}function go_complementAutoObject(a,b){return is_function(b.button)&&(b.button=b.button.call(a)),is_string(b.button)&&(b.button=$(b.button)),is_boolean(b.play)||(b.play=!0),is_number(b.delay)||(b.delay=0),is_undefined(b.pauseOnEvent)&&(b.pauseOnEvent=!0),is_boolean(b.pauseOnResize)||(b.pauseOnResize=!0),is_number(b.timeoutDuration)||(b.timeoutDuration=10>b.duration?2500:5*b.duration),b.progress&&(is_function(b.progress.bar)&&(b.progress.bar=b.progress.bar.call(a)),is_string(b.progress.bar)&&(b.progress.bar=$(b.progress.bar)),b.progress.bar?(is_function(b.progress.updater)||(b.progress.updater=$.fn.carouFredSel.progressbarUpdater),is_number(b.progress.interval)||(b.progress.interval=50)):b.progress=!1),b}function go_getPrevNextObject(a,b){return b=go_getNaviObject(a,b),is_jquery(b)?b={button:b}:is_number(b)&&(b={key:b}),b}function go_complementPrevNextObject(a,b){return is_function(b.button)&&(b.button=b.button.call(a)),is_string(b.button)&&(b.button=$(b.button)),is_string(b.key)&&(b.key=cf_getKeyCode(b.key)),b}function go_getPaginationObject(a,b){return b=go_getNaviObject(a,b),is_jquery(b)?b={container:b}:is_boolean(b)&&(b={keys:b}),b}function go_complementPaginationObject(a,b){return is_function(b.container)&&(b.container=b.container.call(a)),is_string(b.container)&&(b.container=$(b.container)),is_number(b.items)||(b.items=!1),is_boolean(b.keys)||(b.keys=!1),is_function(b.anchorBuilder)||is_false(b.anchorBuilder)||(b.anchorBuilder=$.fn.carouFredSel.pageAnchorBuilder),is_number(b.deviation)||(b.deviation=0),b}function go_getSwipeObject(a,b){return is_function(b)&&(b=b.call(a)),is_undefined(b)&&(b={onTouch:!1}),is_true(b)?b={onTouch:b}:is_number(b)&&(b={items:b}),b}function go_complementSwipeObject(a,b){return is_boolean(b.onTouch)||(b.onTouch=!0),is_boolean(b.onMouse)||(b.onMouse=!1),is_object(b.options)||(b.options={}),is_boolean(b.options.triggerOnTouchEnd)||(b.options.triggerOnTouchEnd=!1),b}function go_getMousewheelObject(a,b){return is_function(b)&&(b=b.call(a)),is_true(b)?b={}:is_number(b)?b={items:b}:is_undefined(b)&&(b=!1),b}function go_complementMousewheelObject(a,b){return b}function gn_getItemIndex(a,b,c,d,e){if(is_string(a)&&(a=$(a,e)),is_object(a)&&(a=$(a,e)),is_jquery(a)?(a=e.children().index(a),is_boolean(c)||(c=!1)):is_boolean(c)||(c=!0),is_number(a)||(a=0),is_number(b)||(b=0),c&&(a+=d.first),a+=b,d.total>0){for(;a>=d.total;)a-=d.total;for(;0>a;)a+=d.total}return a}function gn_getVisibleItemsPrev(a,b,c){for(var d=0,e=0,f=c;f>=0;f--){var g=a.eq(f);if(d+=g.is(":visible")?g[b.d.outerWidth](!0):0,d>b.maxDimension)return e;0==f&&(f=a.length),e++}}function gn_getVisibleItemsPrevFilter(a,b,c){return gn_getItemsPrevFilter(a,b.items.filter,b.items.visibleConf.org,c)}function gn_getScrollItemsPrevFilter(a,b,c,d){return gn_getItemsPrevFilter(a,b.items.filter,d,c)}function gn_getItemsPrevFilter(a,b,c,d){for(var e=0,f=0,g=d,h=a.length;g>=0;g--){if(f++,f==h)return f;var i=a.eq(g);if(i.is(b)&&(e++,e==c))return f;0==g&&(g=h)}}function gn_getVisibleOrg(a,b){return b.items.visibleConf.org||a.children().slice(0,b.items.visible).filter(b.items.filter).length}function gn_getVisibleItemsNext(a,b,c){for(var d=0,e=0,f=c,g=a.length-1;g>=f;f++){var h=a.eq(f);if(d+=h.is(":visible")?h[b.d.outerWidth](!0):0,d>b.maxDimension)return e;if(e++,e==g+1)return e;f==g&&(f=-1)}}function gn_getVisibleItemsNextTestCircular(a,b,c,d){var e=gn_getVisibleItemsNext(a,b,c);return b.circular||c+e>d&&(e=d-c),e}function gn_getVisibleItemsNextFilter(a,b,c){return gn_getItemsNextFilter(a,b.items.filter,b.items.visibleConf.org,c,b.circular)}function gn_getScrollItemsNextFilter(a,b,c,d){return gn_getItemsNextFilter(a,b.items.filter,d+1,c,b.circular)-1}function gn_getItemsNextFilter(a,b,c,d){for(var f=0,g=0,h=d,i=a.length-1;i>=h;h++){if(g++,g>=i)return g;var j=a.eq(h);if(j.is(b)&&(f++,f==c))return g;h==i&&(h=-1)}}function gi_getCurrentItems(a,b){return a.slice(0,b.items.visible)}function gi_getOldItemsPrev(a,b,c){return a.slice(c,b.items.visibleConf.old+c)}function gi_getNewItemsPrev(a,b){return a.slice(0,b.items.visible)}function gi_getOldItemsNext(a,b){return a.slice(0,b.items.visibleConf.old)}function gi_getNewItemsNext(a,b,c){return a.slice(c,b.items.visible+c)}function sz_storeMargin(a,b,c){b.usePadding&&(is_string(c)||(c="_cfs_origCssMargin"),a.each(function(){var a=$(this),d=parseInt(a.css(b.d.marginRight),10);is_number(d)||(d=0),a.data(c,d)}))}function sz_resetMargin(a,b,c){if(b.usePadding){var d=is_boolean(c)?c:!1;is_number(c)||(c=0),sz_storeMargin(a,b,"_cfs_tempCssMargin"),a.each(function(){var a=$(this);a.css(b.d.marginRight,d?a.data("_cfs_tempCssMargin"):c+a.data("_cfs_origCssMargin"))})}}function sz_storeOrigCss(a){a.each(function(){var a=$(this);a.data("_cfs_origCss",a.attr("style")||"")})}function sz_restoreOrigCss(a){a.each(function(){var a=$(this);a.attr("style",a.data("_cfs_origCss")||"")})}function sz_setResponsiveSizes(a,b){var d=(a.items.visible,a.items[a.d.width]),e=a[a.d.height],f=is_percentage(e);b.each(function(){var b=$(this),c=d-ms_getPaddingBorderMargin(b,a,"Width");b[a.d.width](c),f&&b[a.d.height](ms_getPercentage(c,e))})}function sz_setSizes(a,b){var c=a.parent(),d=a.children(),e=gi_getCurrentItems(d,b),f=cf_mapWrapperSizes(ms_getSizes(e,b,!0),b,!1);if(c.css(f),b.usePadding){var g=b.padding,h=g[b.d[1]];b.align&&0>h&&(h=0);var i=e.last();i.css(b.d.marginRight,i.data("_cfs_origCssMargin")+h),a.css(b.d.top,g[b.d[0]]),a.css(b.d.left,g[b.d[3]])}return a.css(b.d.width,f[b.d.width]+2*ms_getTotalSize(d,b,"width")),a.css(b.d.height,ms_getLargestSize(d,b,"height")),f}function ms_getSizes(a,b,c){return[ms_getTotalSize(a,b,"width",c),ms_getLargestSize(a,b,"height",c)]}function ms_getLargestSize(a,b,c,d){return is_boolean(d)||(d=!1),is_number(b[b.d[c]])&&d?b[b.d[c]]:is_number(b.items[b.d[c]])?b.items[b.d[c]]:(c=c.toLowerCase().indexOf("width")>-1?"outerWidth":"outerHeight",ms_getTrueLargestSize(a,b,c))}function ms_getTrueLargestSize(a,b,c){for(var d=0,e=0,f=a.length;f>e;e++){var g=a.eq(e),h=g.is(":visible")?g[b.d[c]](!0):0;h>d&&(d=h)}return d}function ms_getTotalSize(a,b,c,d){if(is_boolean(d)||(d=!1),is_number(b[b.d[c]])&&d)return b[b.d[c]];if(is_number(b.items[b.d[c]]))return b.items[b.d[c]]*a.length;for(var e=c.toLowerCase().indexOf("width")>-1?"outerWidth":"outerHeight",f=0,g=0,h=a.length;h>g;g++){var i=a.eq(g);f+=i.is(":visible")?i[b.d[e]](!0):0}return f}function ms_getParentSize(a,b,c){var d=a.is(":visible");d&&a.hide();var e=a.parent()[b.d[c]]();return d&&a.show(),e}function ms_getMaxDimension(a,b){return is_number(a[a.d.width])?a[a.d.width]:b}function ms_hasVariableSizes(a,b,c){for(var d=!1,e=!1,f=0,g=a.length;g>f;f++){var h=a.eq(f),i=h.is(":visible")?h[b.d[c]](!0):0;d===!1?d=i:d!=i&&(e=!0),0==d&&(e=!0)}return e}function ms_getPaddingBorderMargin(a,b,c){return a[b.d["outer"+c]](!0)-a[b.d[c.toLowerCase()]]()}function ms_getPercentage(a,b){if(is_percentage(b)){if(b=parseInt(b.slice(0,-1),10),!is_number(b))return a;a*=b/100}return a}function cf_e(a,b,c,d,e){return is_boolean(c)||(c=!0),is_boolean(d)||(d=!0),is_boolean(e)||(e=!1),c&&(a=b.events.prefix+a),d&&(a=a+"."+b.events.namespace),d&&e&&(a+=b.serialNumber),a}function cf_c(a,b){return is_string(b.classnames[a])?b.classnames[a]:a}function cf_mapWrapperSizes(a,b,c){is_boolean(c)||(c=!0);var d=b.usePadding&&c?b.padding:[0,0,0,0],e={};return e[b.d.width]=a[0]+d[1]+d[3],e[b.d.height]=a[1]+d[0]+d[2],e}function cf_sortParams(a,b){for(var c=[],d=0,e=a.length;e>d;d++)for(var f=0,g=b.length;g>f;f++)if(b[f].indexOf(typeof a[d])>-1&&is_undefined(c[f])){c[f]=a[d];break}return c}function cf_getPadding(a){if(is_undefined(a))return[0,0,0,0];if(is_number(a))return[a,a,a,a];if(is_string(a)&&(a=a.split("px").join("").split("em").join("").split(" ")),!is_array(a))return[0,0,0,0];for(var b=0;4>b;b++)a[b]=parseInt(a[b],10);switch(a.length){case 0:return[0,0,0,0];case 1:return[a[0],a[0],a[0],a[0]];case 2:return[a[0],a[1],a[0],a[1]];case 3:return[a[0],a[1],a[2],a[1]];default:return[a[0],a[1],a[2],a[3]]}}function cf_getAlignPadding(a,b){var c=is_number(b[b.d.width])?Math.ceil(b[b.d.width]-ms_getTotalSize(a,b,"width")):0;switch(b.align){case"left":return[0,c];case"right":return[c,0];case"center":default:return[Math.ceil(c/2),Math.floor(c/2)]}}function cf_getDimensions(a){for(var b=[["width","innerWidth","outerWidth","height","innerHeight","outerHeight","left","top","marginRight",0,1,2,3],["height","innerHeight","outerHeight","width","innerWidth","outerWidth","top","left","marginBottom",3,2,1,0]],c=b[0].length,d="right"==a.direction||"left"==a.direction?0:1,e={},f=0;c>f;f++)e[b[0][f]]=b[d][f];return e}function cf_getAdjust(a,b,c,d){var e=a;if(is_function(c))e=c.call(d,e);else if(is_string(c)){var f=c.split("+"),g=c.split("-");if(g.length>f.length)var h=!0,i=g[0],j=g[1];else var h=!1,i=f[0],j=f[1];switch(i){case"even":e=1==a%2?a-1:a;break;case"odd":e=0==a%2?a-1:a;break;default:e=a}j=parseInt(j,10),is_number(j)&&(h&&(j=-j),e+=j)}return(!is_number(e)||1>e)&&(e=1),e}function cf_getItemsAdjust(a,b,c,d){return cf_getItemAdjustMinMax(cf_getAdjust(a,b,c,d),b.items.visibleConf)}function cf_getItemAdjustMinMax(a,b){return is_number(b.min)&&b.min>a&&(a=b.min),is_number(b.max)&&a>b.max&&(a=b.max),1>a&&(a=1),a}function cf_getSynchArr(a){is_array(a)||(a=[[a]]),is_array(a[0])||(a=[a]);for(var b=0,c=a.length;c>b;b++)is_string(a[b][0])&&(a[b][0]=$(a[b][0])),is_boolean(a[b][1])||(a[b][1]=!0),is_boolean(a[b][2])||(a[b][2]=!0),is_number(a[b][3])||(a[b][3]=0);return a}function cf_getKeyCode(a){return"right"==a?39:"left"==a?37:"up"==a?38:"down"==a?40:-1}function cf_setCookie(a,b,c){if(a){var d=b.triggerHandler(cf_e("currentPosition",c));$.fn.carouFredSel.cookie.set(a,d)}}function cf_getCookie(a){var b=$.fn.carouFredSel.cookie.get(a);return""==b?0:b}function in_mapCss(a,b){for(var c={},d=0,e=b.length;e>d;d++)c[b[d]]=a.css(b[d]);return c}function in_complementItems(a,b,c,d){return is_object(a.visibleConf)||(a.visibleConf={}),is_object(a.sizesConf)||(a.sizesConf={}),0==a.start&&is_number(d)&&(a.start=d),is_object(a.visible)?(a.visibleConf.min=a.visible.min,a.visibleConf.max=a.visible.max,a.visible=!1):is_string(a.visible)?("variable"==a.visible?a.visibleConf.variable=!0:a.visibleConf.adjust=a.visible,a.visible=!1):is_function(a.visible)&&(a.visibleConf.adjust=a.visible,a.visible=!1),is_string(a.filter)||(a.filter=c.filter(":hidden").length>0?":visible":"*"),a[b.d.width]||(b.responsive?(debug(!0,"Set a "+b.d.width+" for the items!"),a[b.d.width]=ms_getTrueLargestSize(c,b,"outerWidth")):a[b.d.width]=ms_hasVariableSizes(c,b,"outerWidth")?"variable":c[b.d.outerWidth](!0)),a[b.d.height]||(a[b.d.height]=ms_hasVariableSizes(c,b,"outerHeight")?"variable":c[b.d.outerHeight](!0)),a.sizesConf.width=a.width,a.sizesConf.height=a.height,a}function in_complementVisibleItems(a,b){return"variable"==a.items[a.d.width]&&(a.items.visibleConf.variable=!0),a.items.visibleConf.variable||(is_number(a[a.d.width])?a.items.visible=Math.floor(a[a.d.width]/a.items[a.d.width]):(a.items.visible=Math.floor(b/a.items[a.d.width]),a[a.d.width]=a.items.visible*a.items[a.d.width],a.items.visibleConf.adjust||(a.align=!1)),("Infinity"==a.items.visible||1>a.items.visible)&&(debug(!0,'Not a valid number of visible items: Set to "variable".'),a.items.visibleConf.variable=!0)),a}function in_complementPrimarySize(a,b,c){return"auto"==a&&(a=ms_getTrueLargestSize(c,b,"outerWidth")),a}function in_complementSecondarySize(a,b,c){return"auto"==a&&(a=ms_getTrueLargestSize(c,b,"outerHeight")),a||(a=b.items[b.d.height]),a}function in_getAlignPadding(a,b){var c=cf_getAlignPadding(gi_getCurrentItems(b,a),a);return a.padding[a.d[1]]=c[1],a.padding[a.d[3]]=c[0],a}function in_getResponsiveValues(a,b){var d=cf_getItemAdjustMinMax(Math.ceil(a[a.d.width]/a.items[a.d.width]),a.items.visibleConf);d>b.length&&(d=b.length);var e=Math.floor(a[a.d.width]/d);return a.items.visible=d,a.items[a.d.width]=e,a[a.d.width]=d*e,a}function bt_pauseOnHoverConfig(a){if(is_string(a))var b=a.indexOf("immediate")>-1?!0:!1,c=a.indexOf("resume")>-1?!0:!1;else var b=c=!1;return[b,c]}function bt_mousesheelNumber(a){return is_number(a)?a:null}function is_null(a){return null===a}function is_undefined(a){return is_null(a)||a===void 0||""===a||"undefined"===a}function is_array(a){return a instanceof Array}function is_jquery(a){return a instanceof jQuery}function is_object(a){return(a instanceof Object||"object"==typeof a)&&!is_null(a)&&!is_jquery(a)&&!is_array(a)&&!is_function(a)}function is_number(a){return(a instanceof Number||"number"==typeof a)&&!isNaN(a)}function is_string(a){return(a instanceof String||"string"==typeof a)&&!is_undefined(a)&&!is_true(a)&&!is_false(a)}function is_function(a){return a instanceof Function||"function"==typeof a}function is_boolean(a){return a instanceof Boolean||"boolean"==typeof a||is_true(a)||is_false(a)}function is_true(a){return a===!0||"true"===a}function is_false(a){return a===!1||"false"===a}function is_percentage(a){return is_string(a)&&"%"==a.slice(-1)}function getTime(){return(new Date).getTime()}function deprecated(a,b){debug(!0,a+" is DEPRECATED, support for it will be removed. Use "+b+" instead.")}function debug(a,b){if(!is_undefined(window.console)&&!is_undefined(window.console.log)){if(is_object(a)){var c=" ("+a.selector+")";a=a.debug}else var c="";if(!a)return!1;b=is_string(b)?"carouFredSel"+c+": "+b:["carouFredSel"+c+":",b],window.console.log(b)}return!1}$.fn.carouFredSel||($.fn.caroufredsel=$.fn.carouFredSel=function(options,configs){if(0==this.length)return debug(!0,'No element found for "'+this.selector+'".'),this;if(this.length>1)return this.each(function(){$(this).carouFredSel(options,configs)});var $cfs=this,$tt0=this[0],starting_position=!1;$cfs.data("_cfs_isCarousel")&&(starting_position=$cfs.triggerHandler("_cfs_triggerEvent","currentPosition"),$cfs.trigger("_cfs_triggerEvent",["destroy",!0]));var FN={};FN._init=function(a,b,c){a=go_getObject($tt0,a),a.items=go_getItemsObject($tt0,a.items),a.scroll=go_getScrollObject($tt0,a.scroll),a.auto=go_getAutoObject($tt0,a.auto),a.prev=go_getPrevNextObject($tt0,a.prev),a.next=go_getPrevNextObject($tt0,a.next),a.pagination=go_getPaginationObject($tt0,a.pagination),a.swipe=go_getSwipeObject($tt0,a.swipe),a.mousewheel=go_getMousewheelObject($tt0,a.mousewheel),b&&(opts_orig=$.extend(!0,{},$.fn.carouFredSel.defaults,a)),opts=$.extend(!0,{},$.fn.carouFredSel.defaults,a),opts.d=cf_getDimensions(opts),crsl.direction="up"==opts.direction||"left"==opts.direction?"next":"prev";var d=$cfs.children(),e=ms_getParentSize($wrp,opts,"width");if(is_true(opts.cookie)&&(opts.cookie="caroufredsel_cookie_"+conf.serialNumber),opts.maxDimension=ms_getMaxDimension(opts,e),opts.items=in_complementItems(opts.items,opts,d,c),opts[opts.d.width]=in_complementPrimarySize(opts[opts.d.width],opts,d),opts[opts.d.height]=in_complementSecondarySize(opts[opts.d.height],opts,d),opts.responsive&&(is_percentage(opts[opts.d.width])||(opts[opts.d.width]="100%")),is_percentage(opts[opts.d.width])&&(crsl.upDateOnWindowResize=!0,crsl.primarySizePercentage=opts[opts.d.width],opts[opts.d.width]=ms_getPercentage(e,crsl.primarySizePercentage),opts.items.visible||(opts.items.visibleConf.variable=!0)),opts.responsive?(opts.usePadding=!1,opts.padding=[0,0,0,0],opts.align=!1,opts.items.visibleConf.variable=!1):(opts.items.visible||(opts=in_complementVisibleItems(opts,e)),opts[opts.d.width]||(!opts.items.visibleConf.variable&&is_number(opts.items[opts.d.width])&&"*"==opts.items.filter?(opts[opts.d.width]=opts.items.visible*opts.items[opts.d.width],opts.align=!1):opts[opts.d.width]="variable"),is_undefined(opts.align)&&(opts.align=is_number(opts[opts.d.width])?"center":!1),opts.items.visibleConf.variable&&(opts.items.visible=gn_getVisibleItemsNext(d,opts,0))),"*"==opts.items.filter||opts.items.visibleConf.variable||(opts.items.visibleConf.org=opts.items.visible,opts.items.visible=gn_getVisibleItemsNextFilter(d,opts,0)),opts.items.visible=cf_getItemsAdjust(opts.items.visible,opts,opts.items.visibleConf.adjust,$tt0),opts.items.visibleConf.old=opts.items.visible,opts.responsive)opts.items.visibleConf.min||(opts.items.visibleConf.min=opts.items.visible),opts.items.visibleConf.max||(opts.items.visibleConf.max=opts.items.visible),opts=in_getResponsiveValues(opts,d,e);else switch(opts.padding=cf_getPadding(opts.padding),"top"==opts.align?opts.align="left":"bottom"==opts.align&&(opts.align="right"),opts.align){case"center":case"left":case"right":"variable"!=opts[opts.d.width]&&(opts=in_getAlignPadding(opts,d),opts.usePadding=!0);break;default:opts.align=!1,opts.usePadding=0==opts.padding[0]&&0==opts.padding[1]&&0==opts.padding[2]&&0==opts.padding[3]?!1:!0}is_number(opts.scroll.duration)||(opts.scroll.duration=500),is_undefined(opts.scroll.items)&&(opts.scroll.items=opts.responsive||opts.items.visibleConf.variable||"*"!=opts.items.filter?"visible":opts.items.visible),opts.auto=$.extend(!0,{},opts.scroll,opts.auto),opts.prev=$.extend(!0,{},opts.scroll,opts.prev),opts.next=$.extend(!0,{},opts.scroll,opts.next),opts.pagination=$.extend(!0,{},opts.scroll,opts.pagination),opts.auto=go_complementAutoObject($tt0,opts.auto),opts.prev=go_complementPrevNextObject($tt0,opts.prev),opts.next=go_complementPrevNextObject($tt0,opts.next),opts.pagination=go_complementPaginationObject($tt0,opts.pagination),opts.swipe=go_complementSwipeObject($tt0,opts.swipe),opts.mousewheel=go_complementMousewheelObject($tt0,opts.mousewheel),opts.synchronise&&(opts.synchronise=cf_getSynchArr(opts.synchronise)),opts.auto.onPauseStart&&(opts.auto.onTimeoutStart=opts.auto.onPauseStart,deprecated("auto.onPauseStart","auto.onTimeoutStart")),opts.auto.onPausePause&&(opts.auto.onTimeoutPause=opts.auto.onPausePause,deprecated("auto.onPausePause","auto.onTimeoutPause")),opts.auto.onPauseEnd&&(opts.auto.onTimeoutEnd=opts.auto.onPauseEnd,deprecated("auto.onPauseEnd","auto.onTimeoutEnd")),opts.auto.pauseDuration&&(opts.auto.timeoutDuration=opts.auto.pauseDuration,deprecated("auto.pauseDuration","auto.timeoutDuration"))},FN._build=function(){$cfs.data("_cfs_isCarousel",!0);var a=$cfs.children(),b=in_mapCss($cfs,["textAlign","float","position","top","right","bottom","left","zIndex","width","height","marginTop","marginRight","marginBottom","marginLeft"]),c="relative";switch(b.position){case"absolute":case"fixed":c=b.position}"parent"==conf.wrapper?sz_storeOrigCss($wrp):$wrp.css(b),$wrp.css({overflow:"hidden",position:c}),sz_storeOrigCss($cfs),$cfs.data("_cfs_origCssZindex",b.zIndex),$cfs.css({textAlign:"left","float":"none",position:"absolute",top:0,right:"auto",bottom:"auto",left:0,marginTop:0,marginRight:0,marginBottom:0,marginLeft:0}),sz_storeMargin(a,opts),sz_storeOrigCss(a),opts.responsive&&sz_setResponsiveSizes(opts,a)},FN._bind_events=function(){FN._unbind_events(),$cfs.bind(cf_e("stop",conf),function(a,b){return a.stopPropagation(),crsl.isStopped||opts.auto.button&&opts.auto.button.addClass(cf_c("stopped",conf)),crsl.isStopped=!0,opts.auto.play&&(opts.auto.play=!1,$cfs.trigger(cf_e("pause",conf),b)),!0}),$cfs.bind(cf_e("finish",conf),function(a){return a.stopPropagation(),crsl.isScrolling&&sc_stopScroll(scrl),!0}),$cfs.bind(cf_e("pause",conf),function(a,b,c){if(a.stopPropagation(),tmrs=sc_clearTimers(tmrs),b&&crsl.isScrolling){scrl.isStopped=!0;var d=getTime()-scrl.startTime;scrl.duration-=d,scrl.pre&&(scrl.pre.duration-=d),scrl.post&&(scrl.post.duration-=d),sc_stopScroll(scrl,!1)}if(crsl.isPaused||crsl.isScrolling||c&&(tmrs.timePassed+=getTime()-tmrs.startTime),crsl.isPaused||opts.auto.button&&opts.auto.button.addClass(cf_c("paused",conf)),crsl.isPaused=!0,opts.auto.onTimeoutPause){var e=opts.auto.timeoutDuration-tmrs.timePassed,f=100-Math.ceil(100*e/opts.auto.timeoutDuration);opts.auto.onTimeoutPause.call($tt0,f,e)}return!0}),$cfs.bind(cf_e("play",conf),function(a,b,c,d){a.stopPropagation(),tmrs=sc_clearTimers(tmrs);var e=[b,c,d],f=["string","number","boolean"],g=cf_sortParams(e,f);if(b=g[0],c=g[1],d=g[2],"prev"!=b&&"next"!=b&&(b=crsl.direction),is_number(c)||(c=0),is_boolean(d)||(d=!1),d&&(crsl.isStopped=!1,opts.auto.play=!0),!opts.auto.play)return a.stopImmediatePropagation(),debug(conf,"Carousel stopped: Not scrolling.");crsl.isPaused&&opts.auto.button&&(opts.auto.button.removeClass(cf_c("stopped",conf)),opts.auto.button.removeClass(cf_c("paused",conf))),crsl.isPaused=!1,tmrs.startTime=getTime();var h=opts.auto.timeoutDuration+c;return dur2=h-tmrs.timePassed,perc=100-Math.ceil(100*dur2/h),opts.auto.progress&&(tmrs.progress=setInterval(function(){var a=getTime()-tmrs.startTime+tmrs.timePassed,b=Math.ceil(100*a/h);opts.auto.progress.updater.call(opts.auto.progress.bar[0],b)},opts.auto.progress.interval)),tmrs.auto=setTimeout(function(){opts.auto.progress&&opts.auto.progress.updater.call(opts.auto.progress.bar[0],100),opts.auto.onTimeoutEnd&&opts.auto.onTimeoutEnd.call($tt0,perc,dur2),crsl.isScrolling?$cfs.trigger(cf_e("play",conf),b):$cfs.trigger(cf_e(b,conf),opts.auto)},dur2),opts.auto.onTimeoutStart&&opts.auto.onTimeoutStart.call($tt0,perc,dur2),!0}),$cfs.bind(cf_e("resume",conf),function(a){return a.stopPropagation(),scrl.isStopped?(scrl.isStopped=!1,crsl.isPaused=!1,crsl.isScrolling=!0,scrl.startTime=getTime(),sc_startScroll(scrl,conf)):$cfs.trigger(cf_e("play",conf)),!0}),$cfs.bind(cf_e("prev",conf)+" "+cf_e("next",conf),function(a,b,c,d,e){if(a.stopPropagation(),crsl.isStopped||$cfs.is(":hidden"))return a.stopImmediatePropagation(),debug(conf,"Carousel stopped or hidden: Not scrolling.");var f=is_number(opts.items.minimum)?opts.items.minimum:opts.items.visible+1;if(f>itms.total)return a.stopImmediatePropagation(),debug(conf,"Not enough items ("+itms.total+" total, "+f+" needed): Not scrolling.");var g=[b,c,d,e],h=["object","number/string","function","boolean"],i=cf_sortParams(g,h);b=i[0],c=i[1],d=i[2],e=i[3];var j=a.type.slice(conf.events.prefix.length);if(is_object(b)||(b={}),is_function(d)&&(b.onAfter=d),is_boolean(e)&&(b.queue=e),b=$.extend(!0,{},opts[j],b),b.conditions&&!b.conditions.call($tt0,j))return a.stopImmediatePropagation(),debug(conf,'Callback "conditions" returned false.');if(!is_number(c)){if("*"!=opts.items.filter)c="visible";else for(var k=[c,b.items,opts[j].items],i=0,l=k.length;l>i;i++)if(is_number(k[i])||"page"==k[i]||"visible"==k[i]){c=k[i];break}switch(c){case"page":return a.stopImmediatePropagation(),$cfs.triggerHandler(cf_e(j+"Page",conf),[b,d]);case"visible":opts.items.visibleConf.variable||"*"!=opts.items.filter||(c=opts.items.visible)}}if(scrl.isStopped)return $cfs.trigger(cf_e("resume",conf)),$cfs.trigger(cf_e("queue",conf),[j,[b,c,d]]),a.stopImmediatePropagation(),debug(conf,"Carousel resumed scrolling.");if(b.duration>0&&crsl.isScrolling)return b.queue&&("last"==b.queue&&(queu=[]),("first"!=b.queue||0==queu.length)&&$cfs.trigger(cf_e("queue",conf),[j,[b,c,d]])),a.stopImmediatePropagation(),debug(conf,"Carousel currently scrolling.");if(tmrs.timePassed=0,$cfs.trigger(cf_e("slide_"+j,conf),[b,c]),opts.synchronise)for(var m=opts.synchronise,n=[b,c],o=0,l=m.length;l>o;o++){var p=j;m[o][2]||(p="prev"==p?"next":"prev"),m[o][1]||(n[0]=m[o][0].triggerHandler("_cfs_triggerEvent",["configuration",p])),n[1]=c+m[o][3],m[o][0].trigger("_cfs_triggerEvent",["slide_"+p,n])}return!0}),$cfs.bind(cf_e("slide_prev",conf),function(a,b,c){a.stopPropagation();var d=$cfs.children();if(!opts.circular&&0==itms.first)return opts.infinite&&$cfs.trigger(cf_e("next",conf),itms.total-1),a.stopImmediatePropagation();if(sz_resetMargin(d,opts),!is_number(c)){if(opts.items.visibleConf.variable)c=gn_getVisibleItemsPrev(d,opts,itms.total-1);else if("*"!=opts.items.filter){var e=is_number(b.items)?b.items:gn_getVisibleOrg($cfs,opts);c=gn_getScrollItemsPrevFilter(d,opts,itms.total-1,e)}else c=opts.items.visible;c=cf_getAdjust(c,opts,b.items,$tt0)}if(opts.circular||itms.total-c<itms.first&&(c=itms.total-itms.first),opts.items.visibleConf.old=opts.items.visible,opts.items.visibleConf.variable){var f=cf_getItemsAdjust(gn_getVisibleItemsNext(d,opts,itms.total-c),opts,opts.items.visibleConf.adjust,$tt0);f>=opts.items.visible+c&&itms.total>c&&(c++,f=cf_getItemsAdjust(gn_getVisibleItemsNext(d,opts,itms.total-c),opts,opts.items.visibleConf.adjust,$tt0)),opts.items.visible=f}else if("*"!=opts.items.filter){var f=gn_getVisibleItemsNextFilter(d,opts,itms.total-c);opts.items.visible=cf_getItemsAdjust(f,opts,opts.items.visibleConf.adjust,$tt0)}if(sz_resetMargin(d,opts,!0),0==c)return a.stopImmediatePropagation(),debug(conf,"0 items to scroll: Not scrolling.");for(debug(conf,"Scrolling "+c+" items backward."),itms.first+=c;itms.first>=itms.total;)itms.first-=itms.total;opts.circular||(0==itms.first&&b.onEnd&&b.onEnd.call($tt0,"prev"),opts.infinite||nv_enableNavi(opts,itms.first,conf)),$cfs.children().slice(itms.total-c,itms.total).prependTo($cfs),itms.total<opts.items.visible+c&&$cfs.children().slice(0,opts.items.visible+c-itms.total).clone(!0).appendTo($cfs);var d=$cfs.children(),g=gi_getOldItemsPrev(d,opts,c),h=gi_getNewItemsPrev(d,opts),i=d.eq(c-1),j=g.last(),k=h.last();sz_resetMargin(d,opts);var l=0,m=0;if(opts.align){var n=cf_getAlignPadding(h,opts);l=n[0],m=n[1]}var o=0>l?opts.padding[opts.d[3]]:0,p=!1,q=$();if(c>opts.items.visible&&(q=d.slice(opts.items.visibleConf.old,c),"directscroll"==b.fx)){var r=opts.items[opts.d.width];p=q,i=k,sc_hideHiddenItems(p),opts.items[opts.d.width]="variable"}var s=!1,t=ms_getTotalSize(d.slice(0,c),opts,"width"),u=cf_mapWrapperSizes(ms_getSizes(h,opts,!0),opts,!opts.usePadding),v=0,w={},x={},y={},z={},A={},B={},C={},D=sc_getDuration(b,opts,c,t);switch(b.fx){case"cover":case"cover-fade":v=ms_getTotalSize(d.slice(0,opts.items.visible),opts,"width")}p&&(opts.items[opts.d.width]=r),sz_resetMargin(d,opts,!0),m>=0&&sz_resetMargin(j,opts,opts.padding[opts.d[1]]),l>=0&&sz_resetMargin(i,opts,opts.padding[opts.d[3]]),opts.align&&(opts.padding[opts.d[1]]=m,opts.padding[opts.d[3]]=l),B[opts.d.left]=-(t-o),C[opts.d.left]=-(v-o),x[opts.d.left]=u[opts.d.width];var E=function(){},F=function(){},G=function(){},H=function(){},I=function(){},J=function(){},K=function(){},L=function(){},M=function(){},N=function(){},O=function(){};switch(b.fx){case"crossfade":case"cover":case"cover-fade":case"uncover":case"uncover-fade":s=$cfs.clone(!0).appendTo($wrp)}switch(b.fx){case"crossfade":case"uncover":case"uncover-fade":s.children().slice(0,c).remove(),s.children().slice(opts.items.visibleConf.old).remove();break;case"cover":case"cover-fade":s.children().slice(opts.items.visible).remove(),s.css(C)}if($cfs.css(B),scrl=sc_setScroll(D,b.easing,conf),w[opts.d.left]=opts.usePadding?opts.padding[opts.d[3]]:0,("variable"==opts[opts.d.width]||"variable"==opts[opts.d.height])&&(E=function(){$wrp.css(u)},F=function(){scrl.anims.push([$wrp,u])}),opts.usePadding){switch(k.not(i).length&&(y[opts.d.marginRight]=i.data("_cfs_origCssMargin"),0>l?i.css(y):(K=function(){i.css(y)},L=function(){scrl.anims.push([i,y])})),b.fx){case"cover":case"cover-fade":s.children().eq(c-1).css(y)}k.not(j).length&&(z[opts.d.marginRight]=j.data("_cfs_origCssMargin"),G=function(){j.css(z)},H=function(){scrl.anims.push([j,z])}),m>=0&&(A[opts.d.marginRight]=k.data("_cfs_origCssMargin")+opts.padding[opts.d[1]],I=function(){k.css(A)},J=function(){scrl.anims.push([k,A])})}O=function(){$cfs.css(w)};var P=opts.items.visible+c-itms.total;N=function(){if(P>0&&($cfs.children().slice(itms.total).remove(),g=$($cfs.children().slice(itms.total-(opts.items.visible-P)).get().concat($cfs.children().slice(0,P).get()))),sc_showHiddenItems(p),opts.usePadding){var a=$cfs.children().eq(opts.items.visible+c-1);a.css(opts.d.marginRight,a.data("_cfs_origCssMargin"))}};var Q=sc_mapCallbackArguments(g,q,h,c,"prev",D,u);switch(M=function(){sc_afterScroll($cfs,s,b),crsl.isScrolling=!1,clbk.onAfter=sc_fireCallbacks($tt0,b,"onAfter",Q,clbk),queu=sc_fireQueue($cfs,queu,conf),crsl.isPaused||$cfs.trigger(cf_e("play",conf))},crsl.isScrolling=!0,tmrs=sc_clearTimers(tmrs),clbk.onBefore=sc_fireCallbacks($tt0,b,"onBefore",Q,clbk),b.fx){case"none":$cfs.css(w),E(),G(),I(),K(),O(),N(),M();break;case"fade":scrl.anims.push([$cfs,{opacity:0},function(){E(),G(),I(),K(),O(),N(),scrl=sc_setScroll(D,b.easing,conf),scrl.anims.push([$cfs,{opacity:1},M]),sc_startScroll(scrl,conf)}]);break;case"crossfade":$cfs.css({opacity:0}),scrl.anims.push([s,{opacity:0}]),scrl.anims.push([$cfs,{opacity:1},M]),F(),G(),I(),K(),O(),N();break;case"cover":scrl.anims.push([s,w,function(){G(),I(),K(),O(),N(),M()}]),F();break;case"cover-fade":scrl.anims.push([$cfs,{opacity:0}]),scrl.anims.push([s,w,function(){G(),I(),K(),O(),N(),M()}]),F();break;case"uncover":scrl.anims.push([s,x,M]),F(),G(),I(),K(),O(),N();break;case"uncover-fade":$cfs.css({opacity:0}),scrl.anims.push([$cfs,{opacity:1}]),scrl.anims.push([s,x,M]),F(),G(),I(),K(),O(),N();break;default:scrl.anims.push([$cfs,w,function(){N(),M()}]),F(),H(),J(),L()}return sc_startScroll(scrl,conf),cf_setCookie(opts.cookie,$cfs,conf),$cfs.trigger(cf_e("updatePageStatus",conf),[!1,u]),!0
}),$cfs.bind(cf_e("slide_next",conf),function(a,b,c){a.stopPropagation();var d=$cfs.children();if(!opts.circular&&itms.first==opts.items.visible)return opts.infinite&&$cfs.trigger(cf_e("prev",conf),itms.total-1),a.stopImmediatePropagation();if(sz_resetMargin(d,opts),!is_number(c)){if("*"!=opts.items.filter){var e=is_number(b.items)?b.items:gn_getVisibleOrg($cfs,opts);c=gn_getScrollItemsNextFilter(d,opts,0,e)}else c=opts.items.visible;c=cf_getAdjust(c,opts,b.items,$tt0)}var f=0==itms.first?itms.total:itms.first;if(!opts.circular){if(opts.items.visibleConf.variable)var g=gn_getVisibleItemsNext(d,opts,c),e=gn_getVisibleItemsPrev(d,opts,f-1);else var g=opts.items.visible,e=opts.items.visible;c+g>f&&(c=f-e)}if(opts.items.visibleConf.old=opts.items.visible,opts.items.visibleConf.variable){for(var g=cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d,opts,c,f),opts,opts.items.visibleConf.adjust,$tt0);opts.items.visible-c>=g&&itms.total>c;)c++,g=cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d,opts,c,f),opts,opts.items.visibleConf.adjust,$tt0);opts.items.visible=g}else if("*"!=opts.items.filter){var g=gn_getVisibleItemsNextFilter(d,opts,c);opts.items.visible=cf_getItemsAdjust(g,opts,opts.items.visibleConf.adjust,$tt0)}if(sz_resetMargin(d,opts,!0),0==c)return a.stopImmediatePropagation(),debug(conf,"0 items to scroll: Not scrolling.");for(debug(conf,"Scrolling "+c+" items forward."),itms.first-=c;0>itms.first;)itms.first+=itms.total;opts.circular||(itms.first==opts.items.visible&&b.onEnd&&b.onEnd.call($tt0,"next"),opts.infinite||nv_enableNavi(opts,itms.first,conf)),itms.total<opts.items.visible+c&&$cfs.children().slice(0,opts.items.visible+c-itms.total).clone(!0).appendTo($cfs);var d=$cfs.children(),h=gi_getOldItemsNext(d,opts),i=gi_getNewItemsNext(d,opts,c),j=d.eq(c-1),k=h.last(),l=i.last();sz_resetMargin(d,opts);var m=0,n=0;if(opts.align){var o=cf_getAlignPadding(i,opts);m=o[0],n=o[1]}var p=!1,q=$();if(c>opts.items.visibleConf.old&&(q=d.slice(opts.items.visibleConf.old,c),"directscroll"==b.fx)){var r=opts.items[opts.d.width];p=q,j=k,sc_hideHiddenItems(p),opts.items[opts.d.width]="variable"}var s=!1,t=ms_getTotalSize(d.slice(0,c),opts,"width"),u=cf_mapWrapperSizes(ms_getSizes(i,opts,!0),opts,!opts.usePadding),v=0,w={},x={},y={},z={},A={},B=sc_getDuration(b,opts,c,t);switch(b.fx){case"uncover":case"uncover-fade":v=ms_getTotalSize(d.slice(0,opts.items.visibleConf.old),opts,"width")}p&&(opts.items[opts.d.width]=r),opts.align&&0>opts.padding[opts.d[1]]&&(opts.padding[opts.d[1]]=0),sz_resetMargin(d,opts,!0),sz_resetMargin(k,opts,opts.padding[opts.d[1]]),opts.align&&(opts.padding[opts.d[1]]=n,opts.padding[opts.d[3]]=m),A[opts.d.left]=opts.usePadding?opts.padding[opts.d[3]]:0;var C=function(){},D=function(){},E=function(){},F=function(){},G=function(){},H=function(){},I=function(){},J=function(){},K=function(){};switch(b.fx){case"crossfade":case"cover":case"cover-fade":case"uncover":case"uncover-fade":s=$cfs.clone(!0).appendTo($wrp),s.children().slice(opts.items.visibleConf.old).remove()}switch(b.fx){case"crossfade":case"cover":case"cover-fade":$cfs.css("zIndex",1),s.css("zIndex",0)}if(scrl=sc_setScroll(B,b.easing,conf),w[opts.d.left]=-t,x[opts.d.left]=-v,0>m&&(w[opts.d.left]+=m),("variable"==opts[opts.d.width]||"variable"==opts[opts.d.height])&&(C=function(){$wrp.css(u)},D=function(){scrl.anims.push([$wrp,u])}),opts.usePadding){var L=l.data("_cfs_origCssMargin");n>=0&&(L+=opts.padding[opts.d[1]]),l.css(opts.d.marginRight,L),j.not(k).length&&(z[opts.d.marginRight]=k.data("_cfs_origCssMargin")),E=function(){k.css(z)},F=function(){scrl.anims.push([k,z])};var M=j.data("_cfs_origCssMargin");m>0&&(M+=opts.padding[opts.d[3]]),y[opts.d.marginRight]=M,G=function(){j.css(y)},H=function(){scrl.anims.push([j,y])}}K=function(){$cfs.css(A)};var N=opts.items.visible+c-itms.total;J=function(){N>0&&$cfs.children().slice(itms.total).remove();var a=$cfs.children().slice(0,c).appendTo($cfs).last();if(N>0&&(i=gi_getCurrentItems(d,opts)),sc_showHiddenItems(p),opts.usePadding){if(itms.total<opts.items.visible+c){var b=$cfs.children().eq(opts.items.visible-1);b.css(opts.d.marginRight,b.data("_cfs_origCssMargin")+opts.padding[opts.d[1]])}a.css(opts.d.marginRight,a.data("_cfs_origCssMargin"))}};var O=sc_mapCallbackArguments(h,q,i,c,"next",B,u);switch(I=function(){$cfs.css("zIndex",$cfs.data("_cfs_origCssZindex")),sc_afterScroll($cfs,s,b),crsl.isScrolling=!1,clbk.onAfter=sc_fireCallbacks($tt0,b,"onAfter",O,clbk),queu=sc_fireQueue($cfs,queu,conf),crsl.isPaused||$cfs.trigger(cf_e("play",conf))},crsl.isScrolling=!0,tmrs=sc_clearTimers(tmrs),clbk.onBefore=sc_fireCallbacks($tt0,b,"onBefore",O,clbk),b.fx){case"none":$cfs.css(w),C(),E(),G(),K(),J(),I();break;case"fade":scrl.anims.push([$cfs,{opacity:0},function(){C(),E(),G(),K(),J(),scrl=sc_setScroll(B,b.easing,conf),scrl.anims.push([$cfs,{opacity:1},I]),sc_startScroll(scrl,conf)}]);break;case"crossfade":$cfs.css({opacity:0}),scrl.anims.push([s,{opacity:0}]),scrl.anims.push([$cfs,{opacity:1},I]),D(),E(),G(),K(),J();break;case"cover":$cfs.css(opts.d.left,$wrp[opts.d.width]()),scrl.anims.push([$cfs,A,I]),D(),E(),G(),J();break;case"cover-fade":$cfs.css(opts.d.left,$wrp[opts.d.width]()),scrl.anims.push([s,{opacity:0}]),scrl.anims.push([$cfs,A,I]),D(),E(),G(),J();break;case"uncover":scrl.anims.push([s,x,I]),D(),E(),G(),K(),J();break;case"uncover-fade":$cfs.css({opacity:0}),scrl.anims.push([$cfs,{opacity:1}]),scrl.anims.push([s,x,I]),D(),E(),G(),K(),J();break;default:scrl.anims.push([$cfs,w,function(){K(),J(),I()}]),D(),F(),H()}return sc_startScroll(scrl,conf),cf_setCookie(opts.cookie,$cfs,conf),$cfs.trigger(cf_e("updatePageStatus",conf),[!1,u]),!0}),$cfs.bind(cf_e("slideTo",conf),function(a,b,c,d,e,f,g){a.stopPropagation();var h=[b,c,d,e,f,g],i=["string/number/object","number","boolean","object","string","function"],j=cf_sortParams(h,i);return e=j[3],f=j[4],g=j[5],b=gn_getItemIndex(j[0],j[1],j[2],itms,$cfs),0==b?!1:(is_object(e)||(e=!1),"prev"!=f&&"next"!=f&&(f=opts.circular?itms.total/2>=b?"next":"prev":0==itms.first||itms.first>b?"next":"prev"),"prev"==f&&(b=itms.total-b),$cfs.trigger(cf_e(f,conf),[e,b,g]),!0)}),$cfs.bind(cf_e("prevPage",conf),function(a,b,c){a.stopPropagation();var d=$cfs.triggerHandler(cf_e("currentPage",conf));return $cfs.triggerHandler(cf_e("slideToPage",conf),[d-1,b,"prev",c])}),$cfs.bind(cf_e("nextPage",conf),function(a,b,c){a.stopPropagation();var d=$cfs.triggerHandler(cf_e("currentPage",conf));return $cfs.triggerHandler(cf_e("slideToPage",conf),[d+1,b,"next",c])}),$cfs.bind(cf_e("slideToPage",conf),function(a,b,c,d,e){a.stopPropagation(),is_number(b)||(b=$cfs.triggerHandler(cf_e("currentPage",conf)));var f=opts.pagination.items||opts.items.visible,g=Math.ceil(itms.total/f)-1;return 0>b&&(b=g),b>g&&(b=0),$cfs.triggerHandler(cf_e("slideTo",conf),[b*f,0,!0,c,d,e])}),$cfs.bind(cf_e("jumpToStart",conf),function(a,b){if(a.stopPropagation(),b=b?gn_getItemIndex(b,0,!0,itms,$cfs):0,b+=itms.first,0!=b){if(itms.total>0)for(;b>itms.total;)b-=itms.total;$cfs.prepend($cfs.children().slice(b,itms.total))}return!0}),$cfs.bind(cf_e("synchronise",conf),function(a,b){if(a.stopPropagation(),b)b=cf_getSynchArr(b);else{if(!opts.synchronise)return debug(conf,"No carousel to synchronise.");b=opts.synchronise}for(var c=$cfs.triggerHandler(cf_e("currentPosition",conf)),d=!0,e=0,f=b.length;f>e;e++)b[e][0].triggerHandler(cf_e("slideTo",conf),[c,b[e][3],!0])||(d=!1);return d}),$cfs.bind(cf_e("queue",conf),function(a,b,c){return a.stopPropagation(),is_function(b)?b.call($tt0,queu):is_array(b)?queu=b:is_undefined(b)||queu.push([b,c]),queu}),$cfs.bind(cf_e("insertItem",conf),function(a,b,c,d,e){a.stopPropagation();var f=[b,c,d,e],g=["string/object","string/number/object","boolean","number"],h=cf_sortParams(f,g);if(b=h[0],c=h[1],d=h[2],e=h[3],is_object(b)&&!is_jquery(b)?b=$(b):is_string(b)&&(b=$(b)),!is_jquery(b)||0==b.length)return debug(conf,"Not a valid object.");is_undefined(c)&&(c="end"),sz_storeMargin(b,opts),sz_storeOrigCss(b);var i=c,j="before";"end"==c?d?(0==itms.first?(c=itms.total-1,j="after"):(c=itms.first,itms.first+=b.length),0>c&&(c=0)):(c=itms.total-1,j="after"):c=gn_getItemIndex(c,e,d,itms,$cfs);var k=$cfs.children().eq(c);return k.length?k[j](b):(debug(conf,"Correct insert-position not found! Appending item to the end."),$cfs.append(b)),"end"==i||d||itms.first>c&&(itms.first+=b.length),itms.total=$cfs.children().length,itms.first>=itms.total&&(itms.first-=itms.total),$cfs.trigger(cf_e("updateSizes",conf)),$cfs.trigger(cf_e("linkAnchors",conf)),!0}),$cfs.bind(cf_e("removeItem",conf),function(a,b,c,d){a.stopPropagation();var e=[b,c,d],f=["string/number/object","boolean","number"],g=cf_sortParams(e,f);if(b=g[0],c=g[1],d=g[2],b instanceof $&&b.length>1)return i=$(),b.each(function(){var e=$cfs.trigger(cf_e("removeItem",conf),[$(this),c,d]);e&&(i=i.add(e))}),i;if(is_undefined(b)||"end"==b)i=$cfs.children().last();else{b=gn_getItemIndex(b,d,c,itms,$cfs);var i=$cfs.children().eq(b);i.length&&itms.first>b&&(itms.first-=i.length)}return i&&i.length&&(i.detach(),itms.total=$cfs.children().length,$cfs.trigger(cf_e("updateSizes",conf))),i}),$cfs.bind(cf_e("onBefore",conf)+" "+cf_e("onAfter",conf),function(a,b){a.stopPropagation();var c=a.type.slice(conf.events.prefix.length);return is_array(b)&&(clbk[c]=b),is_function(b)&&clbk[c].push(b),clbk[c]}),$cfs.bind(cf_e("currentPosition",conf),function(a,b){if(a.stopPropagation(),0==itms.first)var c=0;else var c=itms.total-itms.first;return is_function(b)&&b.call($tt0,c),c}),$cfs.bind(cf_e("currentPage",conf),function(a,b){a.stopPropagation();var e,c=opts.pagination.items||opts.items.visible,d=Math.ceil(itms.total/c-1);return e=0==itms.first?0:itms.first<itms.total%c?0:itms.first!=c||opts.circular?Math.round((itms.total-itms.first)/c):d,0>e&&(e=0),e>d&&(e=d),is_function(b)&&b.call($tt0,e),e}),$cfs.bind(cf_e("currentVisible",conf),function(a,b){a.stopPropagation();var c=gi_getCurrentItems($cfs.children(),opts);return is_function(b)&&b.call($tt0,c),c}),$cfs.bind(cf_e("slice",conf),function(a,b,c,d){if(a.stopPropagation(),0==itms.total)return!1;var e=[b,c,d],f=["number","number","function"],g=cf_sortParams(e,f);if(b=is_number(g[0])?g[0]:0,c=is_number(g[1])?g[1]:itms.total,d=g[2],b+=itms.first,c+=itms.first,items.total>0){for(;b>itms.total;)b-=itms.total;for(;c>itms.total;)c-=itms.total;for(;0>b;)b+=itms.total;for(;0>c;)c+=itms.total}var i,h=$cfs.children();return i=c>b?h.slice(b,c):$(h.slice(b,itms.total).get().concat(h.slice(0,c).get())),is_function(d)&&d.call($tt0,i),i}),$cfs.bind(cf_e("isPaused",conf)+" "+cf_e("isStopped",conf)+" "+cf_e("isScrolling",conf),function(a,b){a.stopPropagation();var c=a.type.slice(conf.events.prefix.length),d=crsl[c];return is_function(b)&&b.call($tt0,d),d}),$cfs.bind(cf_e("configuration",conf),function(e,a,b,c){e.stopPropagation();var reInit=!1;if(is_function(a))a.call($tt0,opts);else if(is_object(a))opts_orig=$.extend(!0,{},opts_orig,a),b!==!1?reInit=!0:opts=$.extend(!0,{},opts,a);else if(!is_undefined(a))if(is_function(b)){var val=eval("opts."+a);is_undefined(val)&&(val=""),b.call($tt0,val)}else{if(is_undefined(b))return eval("opts."+a);"boolean"!=typeof c&&(c=!0),eval("opts_orig."+a+" = b"),c!==!1?reInit=!0:eval("opts."+a+" = b")}if(reInit){sz_resetMargin($cfs.children(),opts),FN._init(opts_orig),FN._bind_buttons();var sz=sz_setSizes($cfs,opts);$cfs.trigger(cf_e("updatePageStatus",conf),[!0,sz])}return opts}),$cfs.bind(cf_e("linkAnchors",conf),function(a,b,c){return a.stopPropagation(),is_undefined(b)?b=$("body"):is_string(b)&&(b=$(b)),is_jquery(b)&&0!=b.length?(is_string(c)||(c="a.caroufredsel"),b.find(c).each(function(){var a=this.hash||"";a.length>0&&-1!=$cfs.children().index($(a))&&$(this).unbind("click").click(function(b){b.preventDefault(),$cfs.trigger(cf_e("slideTo",conf),a)})}),!0):debug(conf,"Not a valid object.")}),$cfs.bind(cf_e("updatePageStatus",conf),function(a,b){if(a.stopPropagation(),opts.pagination.container){var d=opts.pagination.items||opts.items.visible,e=Math.ceil(itms.total/d);b&&(opts.pagination.anchorBuilder&&(opts.pagination.container.children().remove(),opts.pagination.container.each(function(){for(var a=0;e>a;a++){var b=$cfs.children().eq(gn_getItemIndex(a*d,0,!0,itms,$cfs));$(this).append(opts.pagination.anchorBuilder.call(b[0],a+1))}})),opts.pagination.container.each(function(){$(this).children().unbind(opts.pagination.event).each(function(a){$(this).bind(opts.pagination.event,function(b){b.preventDefault(),$cfs.trigger(cf_e("slideTo",conf),[a*d,-opts.pagination.deviation,!0,opts.pagination])})})}));var f=$cfs.triggerHandler(cf_e("currentPage",conf))+opts.pagination.deviation;return f>=e&&(f=0),0>f&&(f=e-1),opts.pagination.container.each(function(){$(this).children().removeClass(cf_c("selected",conf)).eq(f).addClass(cf_c("selected",conf))}),!0}}),$cfs.bind(cf_e("updateSizes",conf),function(){var b=opts.items.visible,c=$cfs.children(),d=ms_getParentSize($wrp,opts,"width");if(itms.total=c.length,crsl.primarySizePercentage?(opts.maxDimension=d,opts[opts.d.width]=ms_getPercentage(d,crsl.primarySizePercentage)):opts.maxDimension=ms_getMaxDimension(opts,d),opts.responsive?(opts.items.width=opts.items.sizesConf.width,opts.items.height=opts.items.sizesConf.height,opts=in_getResponsiveValues(opts,c,d),b=opts.items.visible,sz_setResponsiveSizes(opts,c)):opts.items.visibleConf.variable?b=gn_getVisibleItemsNext(c,opts,0):"*"!=opts.items.filter&&(b=gn_getVisibleItemsNextFilter(c,opts,0)),!opts.circular&&0!=itms.first&&b>itms.first){if(opts.items.visibleConf.variable)var e=gn_getVisibleItemsPrev(c,opts,itms.first)-itms.first;else if("*"!=opts.items.filter)var e=gn_getVisibleItemsPrevFilter(c,opts,itms.first)-itms.first;else var e=opts.items.visible-itms.first;debug(conf,"Preventing non-circular: sliding "+e+" items backward."),$cfs.trigger(cf_e("prev",conf),e)}opts.items.visible=cf_getItemsAdjust(b,opts,opts.items.visibleConf.adjust,$tt0),opts.items.visibleConf.old=opts.items.visible,opts=in_getAlignPadding(opts,c);var f=sz_setSizes($cfs,opts);return $cfs.trigger(cf_e("updatePageStatus",conf),[!0,f]),nv_showNavi(opts,itms.total,conf),nv_enableNavi(opts,itms.first,conf),f}),$cfs.bind(cf_e("destroy",conf),function(a,b){return a.stopPropagation(),tmrs=sc_clearTimers(tmrs),$cfs.data("_cfs_isCarousel",!1),$cfs.trigger(cf_e("finish",conf)),b&&$cfs.trigger(cf_e("jumpToStart",conf)),sz_restoreOrigCss($cfs.children()),sz_restoreOrigCss($cfs),FN._unbind_events(),FN._unbind_buttons(),"parent"==conf.wrapper?sz_restoreOrigCss($wrp):$wrp.replaceWith($cfs),!0}),$cfs.bind(cf_e("debug",conf),function(){return debug(conf,"Carousel width: "+opts.width),debug(conf,"Carousel height: "+opts.height),debug(conf,"Item widths: "+opts.items.width),debug(conf,"Item heights: "+opts.items.height),debug(conf,"Number of items visible: "+opts.items.visible),opts.auto.play&&debug(conf,"Number of items scrolled automatically: "+opts.auto.items),opts.prev.button&&debug(conf,"Number of items scrolled backward: "+opts.prev.items),opts.next.button&&debug(conf,"Number of items scrolled forward: "+opts.next.items),conf.debug}),$cfs.bind("_cfs_triggerEvent",function(a,b,c){return a.stopPropagation(),$cfs.triggerHandler(cf_e(b,conf),c)})},FN._unbind_events=function(){$cfs.unbind(cf_e("",conf)),$cfs.unbind(cf_e("",conf,!1)),$cfs.unbind("_cfs_triggerEvent")},FN._bind_buttons=function(){if(FN._unbind_buttons(),nv_showNavi(opts,itms.total,conf),nv_enableNavi(opts,itms.first,conf),opts.auto.pauseOnHover){var a=bt_pauseOnHoverConfig(opts.auto.pauseOnHover);$wrp.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if(opts.auto.button&&opts.auto.button.bind(cf_e(opts.auto.event,conf,!1),function(a){a.preventDefault();var b=!1,c=null;crsl.isPaused?b="play":opts.auto.pauseOnEvent&&(b="pause",c=bt_pauseOnHoverConfig(opts.auto.pauseOnEvent)),b&&$cfs.trigger(cf_e(b,conf),c)}),opts.prev.button&&(opts.prev.button.bind(cf_e(opts.prev.event,conf,!1),function(a){a.preventDefault(),$cfs.trigger(cf_e("prev",conf))}),opts.prev.pauseOnHover)){var a=bt_pauseOnHoverConfig(opts.prev.pauseOnHover);opts.prev.button.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if(opts.next.button&&(opts.next.button.bind(cf_e(opts.next.event,conf,!1),function(a){a.preventDefault(),$cfs.trigger(cf_e("next",conf))}),opts.next.pauseOnHover)){var a=bt_pauseOnHoverConfig(opts.next.pauseOnHover);opts.next.button.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if(opts.pagination.container&&opts.pagination.pauseOnHover){var a=bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);opts.pagination.container.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if((opts.prev.key||opts.next.key)&&$(document).bind(cf_e("keyup",conf,!1,!0,!0),function(a){var b=a.keyCode;b==opts.next.key&&(a.preventDefault(),$cfs.trigger(cf_e("next",conf))),b==opts.prev.key&&(a.preventDefault(),$cfs.trigger(cf_e("prev",conf)))}),opts.pagination.keys&&$(document).bind(cf_e("keyup",conf,!1,!0,!0),function(a){var b=a.keyCode;b>=49&&58>b&&(b=(b-49)*opts.items.visible,itms.total>=b&&(a.preventDefault(),$cfs.trigger(cf_e("slideTo",conf),[b,0,!0,opts.pagination])))}),$.fn.swipe){var b="ontouchstart"in window;if(b&&opts.swipe.onTouch||!b&&opts.swipe.onMouse){var c=$.extend(!0,{},opts.prev,opts.swipe),d=$.extend(!0,{},opts.next,opts.swipe),e=function(){$cfs.trigger(cf_e("prev",conf),[c])},f=function(){$cfs.trigger(cf_e("next",conf),[d])};switch(opts.direction){case"up":case"down":opts.swipe.options.swipeUp=f,opts.swipe.options.swipeDown=e;break;default:opts.swipe.options.swipeLeft=f,opts.swipe.options.swipeRight=e}crsl.swipe&&$cfs.swipe("destroy"),$wrp.swipe(opts.swipe.options),$wrp.css("cursor","move"),crsl.swipe=!0}}if($.fn.mousewheel&&opts.mousewheel){var g=$.extend(!0,{},opts.prev,opts.mousewheel),h=$.extend(!0,{},opts.next,opts.mousewheel);crsl.mousewheel&&$wrp.unbind(cf_e("mousewheel",conf,!1)),$wrp.bind(cf_e("mousewheel",conf,!1),function(a,b){a.preventDefault(),b>0?$cfs.trigger(cf_e("prev",conf),[g]):$cfs.trigger(cf_e("next",conf),[h])}),crsl.mousewheel=!0}if(opts.auto.play&&$cfs.trigger(cf_e("play",conf),opts.auto.delay),crsl.upDateOnWindowResize){var i=function(){$cfs.trigger(cf_e("finish",conf)),opts.auto.pauseOnResize&&!crsl.isPaused&&$cfs.trigger(cf_e("play",conf)),sz_resetMargin($cfs.children(),opts),$cfs.trigger(cf_e("updateSizes",conf))},j=$(window),k=null;if($.debounce&&"debounce"==conf.onWindowResize)k=$.debounce(200,i);else if($.throttle&&"throttle"==conf.onWindowResize)k=$.throttle(300,i);else{var l=0,m=0;k=function(){var a=j.width(),b=j.height();(a!=l||b!=m)&&(i(),l=a,m=b)}}j.bind(cf_e("resize",conf,!1,!0,!0),k)}},FN._unbind_buttons=function(){var b=(cf_e("",conf),cf_e("",conf,!1));ns3=cf_e("",conf,!1,!0,!0),$(document).unbind(ns3),$(window).unbind(ns3),$wrp.unbind(b),opts.auto.button&&opts.auto.button.unbind(b),opts.prev.button&&opts.prev.button.unbind(b),opts.next.button&&opts.next.button.unbind(b),opts.pagination.container&&(opts.pagination.container.unbind(b),opts.pagination.anchorBuilder&&opts.pagination.container.children().remove()),crsl.swipe&&($cfs.swipe("destroy"),$wrp.css("cursor","default"),crsl.swipe=!1),crsl.mousewheel&&(crsl.mousewheel=!1),nv_showNavi(opts,"hide",conf),nv_enableNavi(opts,"removeClass",conf)},is_boolean(configs)&&(configs={debug:configs});var crsl={direction:"next",isPaused:!0,isScrolling:!1,isStopped:!1,mousewheel:!1,swipe:!1},itms={total:$cfs.children().length,first:0},tmrs={auto:null,progress:null,startTime:getTime(),timePassed:0},scrl={isStopped:!1,duration:0,startTime:0,easing:"",anims:[]},clbk={onBefore:[],onAfter:[]},queu=[],conf=$.extend(!0,{},$.fn.carouFredSel.configs,configs),opts={},opts_orig=$.extend(!0,{},options),$wrp="parent"==conf.wrapper?$cfs.parent():$cfs.wrap("<"+conf.wrapper.element+' class="'+conf.wrapper.classname+'" />').parent();if(conf.selector=$cfs.selector,conf.serialNumber=$.fn.carouFredSel.serialNumber++,conf.transition=conf.transition&&$.fn.transition?"transition":"animate",FN._init(opts_orig,!0,starting_position),FN._build(),FN._bind_events(),FN._bind_buttons(),is_array(opts.items.start))var start_arr=opts.items.start;else{var start_arr=[];0!=opts.items.start&&start_arr.push(opts.items.start)}if(opts.cookie&&start_arr.unshift(parseInt(cf_getCookie(opts.cookie),10)),start_arr.length>0)for(var a=0,l=start_arr.length;l>a;a++){var s=start_arr[a];if(0!=s){if(s===!0){if(s=window.location.hash,1>s.length)continue}else"random"===s&&(s=Math.floor(Math.random()*itms.total));if($cfs.triggerHandler(cf_e("slideTo",conf),[s,0,!0,{fx:"none"}]))break}}var siz=sz_setSizes($cfs,opts),itm=gi_getCurrentItems($cfs.children(),opts);return opts.onCreate&&opts.onCreate.call($tt0,{width:siz.width,height:siz.height,items:itm}),$cfs.trigger(cf_e("updatePageStatus",conf),[!0,siz]),$cfs.trigger(cf_e("linkAnchors",conf)),conf.debug&&$cfs.trigger(cf_e("debug",conf)),$cfs},$.fn.carouFredSel.serialNumber=1,$.fn.carouFredSel.defaults={synchronise:!1,infinite:!0,circular:!0,responsive:!1,direction:"left",items:{start:0},scroll:{easing:"swing",duration:500,pauseOnHover:!1,event:"click",queue:!1}},$.fn.carouFredSel.configs={debug:!1,transition:!1,onWindowResize:"throttle",events:{prefix:"",namespace:"cfs"},wrapper:{element:"div",classname:"caroufredsel_wrapper"},classnames:{}},$.fn.carouFredSel.pageAnchorBuilder=function(a){return'<a href="#"><span>'+a+"</span></a>"},$.fn.carouFredSel.progressbarUpdater=function(a){$(this).css("width",a+"%")},$.fn.carouFredSel.cookie={get:function(a){a+="=";for(var b=document.cookie.split(";"),c=0,d=b.length;d>c;c++){for(var e=b[c];" "==e.charAt(0);)e=e.slice(1);if(0==e.indexOf(a))return e.slice(a.length)}return 0},set:function(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+1e3*60*60*24*c),d="; expires="+e.toGMTString()}document.cookie=a+"="+b+d+"; path=/"},remove:function(a){$.fn.carouFredSel.cookie.set(a,"",-1)}},$.extend($.easing,{quadratic:function(a){var b=a*a;return a*(-b*a+4*b-6*a+4)},cubic:function(a){return a*(4*a*a-9*a+6)},elastic:function(a){var b=a*a;return a*(33*b*b-106*b*a+126*b-67*a+15)}}))})(jQuery);
// (c) Atypon
(function($) {
    var TabsWidget = {

        init : function() {
            $(".tabs").each(function() {
                var $tabs = $(this);
                if (!$tabs.data("tab")) {
                    TabsWidget.initTabs($(this));
                    $tabs.data("tab",true);
                }
            });

            //we hook all document links and check to see if they target an element inside a tab
            $("a[href^=#]:not(.tab-nav a)").off("click.tabsWidget").on("click.tabsWidget",function(e) {
                var href=$(this).attr("href");
                if ($(href).closest(".tab-nav").length) return;
                var target=$(href);
                var pane = target.closest(".tab-pane");
                if (!pane.length) return;

                $("[href='#"+pane.attr("id")+"']").click();

                //now.. scroll to tab frame only if the anchor is nearby, otherwise scroll to the anchor
                //The code in this function below here is not strictly speaking necessary, but it slightly improves
                //the user experience. This makes it so that if the target is near the top of the tab module, we jump
                //the window so that the tabs themselves are visible rather than just the content
                var tabTop = target.closest(".layout-tabs").offset().top;
                var anchor = target.offset().top;
                if (anchor - tabTop < window.innerHeight / 2) {
                    $('html, body').scrollTop(tabTop);
                } else {
                    $('html, body').scrollTop(anchor);
                }

                e.preventDefault();
            });
            $(document).on( "click", ".tab-nav .active > a", function(e) {
                e.preventDefault();
            });
            $("li[role='tab']").each(function () {
                if ($(this).hasClass('active')) {
                    $(this).attr("aria-selected", "true");  // select this tab
                } else {
                    $(this).attr("aria-selected", "false");//deselect all the tabs
                }
            });

            // ------------------------------------------------------------------
            // ACCORDION
            // ------------------------------------------------------------------


            $(".accordion-heading").click(function(){
                var accordionIndex = $(this).closest(".tab-pane").index();
                $(this).closest(".accordion-tabs").find(".tab-nav li:eq(" + accordionIndex + ") a").trigger("click");
            });


            // ------------------------------------------------------------------
            // ACCORDION END
            // ------------------------------------------------------------------

            // Check if url have hash code and open target tab
            var hashCode = location.href.split('#')[1];
            if(hashCode) {
                var targetTag = $('a[href="#'+hashCode+'"]');

                // Check if the hash code is for anchor tag
                if(targetTag.length > 0) {
                    targetTag.click();
                } else {
                    var nodeToShow = $("#" + hashCode);

                    // Check if the hash code belong to tag id
                    if(nodeToShow.length > 0) {
                        // check that it is in tab widget and then find and click target anchor
                        var tabPane = nodeToShow.parents(".tab-pane");
                        if (tabPane.length > 0) {
                            var id = tabPane.attr("id");

                            targetTag = $('a[href="#' + id + '"]');
                            if (targetTag.length > 0) {
                                targetTag.click();
                            }
                        }
                    }
                }
            }

        },

        initTabs : function($tabs) {
            $tabs.find(".tab-nav li a").off("click.tabsWidget").on("click.tabsWidget", TabsWidget.tabClicked);
            var $menuTabs = $tabs.closest(".menu-tabs");
            if($menuTabs.length !== 0){
                // remove active class when clicking out of the menu tab
                $(document).click(function(event) {
                    if($(event.target).parents().index($menuTabs) == -1) {
                        $menuTabs.children(".tab-nav").children().removeClass("active");
                        $menuTabs.children(".tab-content").children(".tab-pane").removeClass("active");
                    }
                })
            }else{
                // Select an active tab
                var $activeTab = [];
                // Try to find the content with .activeWidget
                var $activePane = $tabs.find(".tab-content .activeWidget").closest('.tab-pane');
                if ($activePane.length != 0) {
                    // found active content. find what tab it belongs to.
                    var tabId = $activePane.get(0).id;
                    $activeTab = $tabs.find('.tab-nav li a[href="#' + tabId + '"]').closest('li');
                }

                if ($activeTab.length == 0) {
                    $activeTab = $tabs.find(".tab-nav li.active");
                    if ($activeTab.length == 0) {
                        // just select the first tab as being active
                        $activeTab = $tabs.find(".tab-nav li").first();
                    }
                }
                $activeTab.children("a").click();
            }
        },

        tabClicked : function(event) {
            var $tabModule = $(this).closest(".tabs");

            var href = $(this).attr("href") || "";
            if (href.indexOf("#") == 0) {
                //hash link

                $tabModule.children(".tab-nav").children().removeClass("active");
                $tabModule.children(".tab-content").children(".tab-pane").removeClass("active");
                $tabModule.children(".tab-nav").find("li[aria-selected='true']").attr({"aria-selected": "false"});

                $(this).closest("li").attr({"aria-selected": "true"}).addClass("active");
                $(this).closest("li").siblings("li").find("a").not(".tab-ext-link").attr({"aria-selected": "false","aria-expanded":"false"});
                $(href).addClass("active");
                event.preventDefault();
            }

            // if content is to be loaded at tab click instead of page load
            if ($tabModule.hasClass("lazy-tabs-widget")) {
                if ($(this).closest("li").hasClass("loaded") || (event.originalEvent === undefined) ){
                    // content was loaded in a previous request, or widget is being initialized
                    return;
                }

                var selectedTabIndex = $(this).parent().prevAll().length;
                var item = $tabModule.children(".tab-content").children(".tab-pane").get(selectedTabIndex);
                var $tab =  $(item).children('.lazyTab');

                // when child widgets depend on original request parameter, it should be added to this form
                var $form = $tabModule.children(".tabContextData");
                var data = {};
                $form.find(':input').each(function(){
                    data[$(this).attr('name')] = $(this).val();
                });
                data['tabId'] = $tab.attr('data-pb-dropzone');

                $tab.html('');
                $tab.addClass("loading");

                renderTabContent(data,$tab,$tabModule.closest(".layout-tabs"));
                $(this).parent().addClass("loaded");
            }

            $.event.trigger("TabsWidgetChangedTab");
        }
    };

    $(document).ready(TabsWidget.init);
    $(document).on("reloadTabsWidget",TabsWidget.init);

    if (window.PB && window.PB.$) {
        // make this module reinitializes in design mode
        window.PB.$(document.documentElement).on("ScopeModified ScopeLoaded WidgetReloaded", function() {
            try {
                TabsWidget.init()
            } catch(ex) {
                if (console && console.log) {
                    console.log("Error reinitializing tabs", ex);
                }
            }
        });
    }


})(jQuery);

function renderTabContent(data,$target,$widget){
    $widget.pbAjax({
        type: 'GET',
        url: '/pb/widgets/lazyTabs/loadTab',
        dataType: 'html',
        async:'false',
        data: data,
        success: function(data) {
            renderDynamicContent(data, $target);
        }
    });
}

function renderDynamicContent(data, $tab){
    $tab.removeClass("loading");
    $tab.html(data);
    $.event.trigger("reloadTabsWidget");
};// (c) Atypon
(function ($) {
    var CarouselWidget = {
        init: function () {
            try {
                CarouselWidget.checkForNewElements();
            } catch(ex) {
                //
            }
        },

        checkForNewElements: function () {
            $(".carousel").each(function() {
                var $C = $(this);
                if (!$C.data("initialized") || insideTab) {
                    $C.data("initialized", true);

                    //visible items
                    var carouselOption = {width: "variable"};
                    carouselOption.items = $C.data("visibleitems") || 2 ;

                    //auto play
                    var auto = carouselOption.auto = {play: false};
                    if ($C.data("autoplay")) {
                        auto.play = true;
                        auto.timeoutDuration = $C.data("delay") || 3000;
                        auto.button = '.play';
                    }

                    //position control
                    if ($C.data("positioncontrol") ==  "Bookend"){

                        carouselOption.next =$C.find(".next");
                        carouselOption.prev =$C.find(".prev");
                    }else{
                        carouselOption.next =$C.find(".overlayNext");
                        carouselOption.prev =$C.find(".overlayPrev");

                        if ($C.data("pageindicator")) {
                            carouselOption.pagination = $C.find(".pagination");
                        }

                        $C.find(".overlayNav").removeClass("overlay-left overlay-right overlay-center overlay-top overlay-bottom")
                            .addClass("overlay-" + $C.data("positioncontrolhorizontalalignment")).addClass("overlay-" + $C.data("positioncontrolverticalalignment"));
                    }
                    $C.find(".items").carouFredSel(carouselOption);

                    if ($C.data("positioncontrol") ==  "Overlay"){
                        if ($C.find(".overlayNav").hasClass("overlay-center")){
                            var w = $C.find(".overlayNav").width();
                            $C.find(".overlayNav").css("margin-left", -1*  w /2);
                        }
                        var cW = $C.find(".items :first-child").width();
                    }else{
                        var h = $C.find(".items").height();
                        $C.find(".next").css("line-height", h  +"px");
                        $C.find(".prev").css("line-height", h + "px");
                    }
                }
            });
        }

    };
    var insideTab = false;
    $(document).ready(function() {
        var loadables = $(".carousel *[src]");
        if (loadables.length) {
            // Wait for the divs to be completely loaded before initializing the carousel plugin.
            // We do that because the plugin can not work correctly until after the layout phase as it is not getting
            // the right size of them.
            var total = loadables.length;
            function onLoaded() {
                total--;
                if (total == 0) {
                    CarouselWidget.init();
                }
            }
            loadables.load(onLoaded);
            loadables.error(onLoaded);
            // also set a timeout in case some of the images fail to load and browser fails to notify us
            setTimeout(CarouselWidget.init, 500);
        } else {
            CarouselWidget.init();
        }

        $(".carousel .next").on('focus', function(){

            $(window).keydown(function(e) {
                if ((e.which === 13) || (e.which === 32)) {
                    $(".carousel .next").click();
                }
            });
        });
        $(".carousel .prev").on('focus', function(){

            $(window).keydown(function(e) {
                if ((e.which === 13) || (e.which === 32)) {
                    $(".carousel .prev").click();
                }
            });
        });

        $(document).on('TabsWidgetChangedTab', function () {
            if($('.carousel').closest('div.lazyTab').length == 0) { // We don't initialize the carousel widget if it's inside tab widget and tabs widget set's to be loaded dynamically.Because in  this case the carousel widget will be re-loaded again
                insideTab = true;
                CarouselWidget.init();
            }
        });

    });

    if (window.PB && window.PB.$) {
        // make this module reinitializes in design mode
        window.PB.$(document.documentElement).on("ScopeModified ScopeLoaded WidgetReloaded", CarouselWidget.init);
    }

})(jQuery);
/* (c) Atypon */
(function ($) {

    function init() {
        $('.slideshowWidget').each(function () {
            var $slideshow = $(this);

            // Generate the direct-to-slide navigation list
            makeDirectNav($slideshow);

            // enable the prev/next slide navigation functions
            enablePrevNext($slideshow);

            enableAnimation($slideshow);

            pauseAnimation($slideshow);

            bindTouchEvents($slideshow);

            // delay load of images after this event handler is finished
            setTimeout(function () {
                exposeDelayedContent($slideshow);
            }, 0);
        });

    }

    function exposeDelayedContent($context) {
        $context.find('noscript').each(function () {
                var $n = $(this);

                var t = $n.text() || $n.attr('alt');
                // Sometimes we get the text XML escaped, un-escape if needed
                if (t.indexOf('<') == -1) t = $('<div />').html(t).text();

                $n.after(t);
            }
        ).remove();
    }

    function activateSlide($slideshow, $slide) {
        // ignore clicks on current slide
        if ($slide.hasClass('active')) return;
        // Ignore clicks if the slides in pause state
        if($slideshow.hasClass('pause')) return;

        // make nav selector inactive by removing "active" class
        var $currentSlide = $slideshow.find('li.active');
        $currentSlide.removeClass('active');

        // get the slide number from the clicked list item text
        var newSlideNum = $slide.attr('data-relatedSlide');
        var newSlideClass = "slide" + newSlideNum;
        var $newSlide = $slideshow.find('.' + newSlideClass);
        exposeDelayedContent($newSlide);

        // when "fade" animation is selected
        if ($slideshow.hasClass("animate-fade")) {
            // show the slide with fadein animation
            $slideshow.find('div.slide:visible').stop(true, true).fadeOut(500);
            $newSlide.stop(true, true).fadeIn(500);
            populateCaption($slideshow, $newSlide);
        }

        // when "slide" animation is selected
        else if ($slideshow.hasClass("animate-slide")) {
            var slideLeft = $newSlide.position().left;
            $('.slides').animate(
                {left:-slideLeft},
                {duration:300, easing:"linear"}
            );
            populateCaption($slideshow, $newSlide);

            $( window ).resize(function() {
                var slideLeft = $newSlide.position().left;
                $('.slides').css(
                    {left:-slideLeft}
                );
            });
        }

        // when "none" animation is selected
        else {
            // show the slide with fadein animation
            $slideshow.find('div.slide:visible').hide();
            $($newSlide).show();
            populateCaption($slideshow, $newSlide);
        }

        // set the clicked nav item to active
        $slide.addClass('active');
    }

    function makeDirectNav($slideshow) {
        var numSlides = $slideshow.find('.slide').length;

        // create a navigation list based on the total number of slides
        var $navIndicator = $slideshow.find('ul.navIndicator');
        $navIndicator.empty();
        for (var n = 1; n < numSlides + 1; n++) {
            var navElement = createNavigationElement(n);
            // put the navigation list into  ul.navIndicator
            navElement.appendTo($navIndicator);
        }

        // enable the direct-to-slide navigation function
        $navIndicator.find('li').off().bind('click keypress', function (e) {
            var eType = e.type;
            if (eType == 'click' || (eType == 'keypress' && e.which == 13)) {
                if($slideshow.hasClass("pause")) return pauseNav($slideshow,$(this));
                disableAnimation($slideshow);
                activateSlide($slideshow, $(this));
            }
        });
    }

    function previousSlide($slideshow) {
        var $currentSlide = $slideshow.find('.navIndicator li.active');
        var $prev = $currentSlide.prev();
        if ($prev.length > 0) {
            $currentSlide = $prev;
        } else {
            $currentSlide = $slideshow.find(".navIndicator li").last();
        }
        activateSlide($slideshow, $currentSlide);
    }

    function nextSlide($slideshow) {
        var $currentSlide = $slideshow.find('.navIndicator li.active');
        var $next = $currentSlide.next();
        if ($next.length > 0) {
            $currentSlide = $next;
        } else {
            $currentSlide = $slideshow.find(".navIndicator li").first();
        }
        activateSlide($slideshow, $currentSlide);
    }

    function enablePrevNext($slideshow) {
        $('.slideNav', $slideshow).show();
        $slideshow.find('.previousSlide').off().bind('click keypress', function(e) {
            var eType = e.type;
            if (eType == 'click' || (eType == 'keypress' && e.which == 13)) {
                if($slideshow.hasClass("pause")) return;
                previousSlide($slideshow);
            }
        });
        $slideshow.find('.nextSlide').off().bind('click keypress', function(e) {
            var eType = e.type;
            if (eType == 'click' || (eType == 'keypress' && e.which == 13)) {
                if($slideshow.hasClass("pause")) return;
                nextSlide($slideshow);
            }
        })
    }

    function enableAnimation($slideshow) {
        var autoplay = $slideshow.data('autoplay');
        if (autoplay) {
            clearInterval(autoplay);
        }
        // start autoplay; pause it when hovering over the slideshow and resume it when leaving
        var autoplayTime = $('.autoplayTime', $slideshow).val();
        if (autoplayTime) {
            exposeDelayedContent($slideshow);
            autoplayTime = autoplayTime * 1000;

            function nextSlideFunc() {
                var attached = $slideshow.closest('body').length;
                if (!attached) {
                    // this slideshow was detached due to the widget-reload. finish it off.
                    disableAnimation($slideshow);
                    return;
                }
                nextSlide($slideshow);
            }
            autoplay = window.setInterval(nextSlideFunc, autoplayTime);
            $slideshow.data('autoplay', autoplay);

            $slideshow.off().bind({
                mouseenter:function () {
                    clearInterval(autoplay);
                },
                mouseleave:function () {
                    enableAnimation($slideshow);
                }
            });
        }
    }

    function pauseAnimation($slideShow) {
        var pauseBtn = $($slideShow).find('.playSlide');
        if(pauseBtn.length > 0) {
            pauseBtn.on('click keypress' ,function(e) {
                var eType = e.type;
                if (eType == 'click' || (eType == 'keypress' && e.which == 13)) {
                    $slideShow.toggleClass('pause');
                    pauseBtn.toggleClass('pauseSlide');
                    $('.slideNav', $slideShow).show();
                    $slideShow.find('.nextSlide').off().bind('click keypress', function (e) {
                        var eType = e.type;
                        if (eType == 'click' || (eType == 'keypress' && e.which == 13)) {
                            activatePauseSlide($slideShow,'next');
                        }
                    });
                    $slideShow.find('.previousSlide').off().bind('click keypress', function (e) {
                        var eType = e.type;
                        if (eType == 'click' || (eType == 'keypress' && e.which == 13)) {
                            activatePauseSlide($slideShow,'previous');
                        }
                    });
                }
            });
        }
    }

    function activatePauseSlide ($slideShow,state){
        $slideShow.removeClass('pause');
        $slideShow.removeClass('pauseSlide');
        $("#playSlide").attr("class", "playSlide");
        if (state == 'next'){
            nextSlide($slideShow);
        }
        else if (state == 'previous'){
            previousSlide($slideShow);
        }
    }

    function pauseNav($slideShow, $slide){
        var $currentSlide = $slideShow.find('li.active');
        $currentSlide.removeClass('active');
        var newSlideNum = $slide.attr('data-relatedSlide');
        var newSlideClass = "slide" + newSlideNum;
        var $newSlide = $slideShow.find('.' + newSlideClass);
        exposeDelayedContent($newSlide);
        $slideShow.find('div.slide:visible').stop(true, true).fadeOut(500);
        $newSlide.stop(true, true).fadeIn(500);
        populateCaption($slideShow, $newSlide);
        $slide.addClass('active');
    }

    function disableAnimation($slideshow) {
        var autoplay = $slideshow.data('autoplay');
        if (autoplay) {
            // disable it permanently
            $('.autoplayTime', $slideshow).remove();
            clearInterval(autoplay);
        }
    }

    function populateCaption($slideshow, $slide) {
        var $slideshowCaption = $slideshow.find('div.slideshowCaption');
        var caption = $slide.find('div.slideCaption').html() || "";
        $slideshowCaption.html(caption);
    }

    function bindTouchEvents($slideshow){
        var holder = $slideshow.find(".slidePort"),
            touchstartx= undefined,
            touchmovex= undefined,
            movex,
            longTouch= undefined,
            slideWidth= holder.width(),
            touchstarty = undefined,
            touchmovey = undefined;

        holder.on("touchstart", function(event) {
            touchStart(event);
        });

        holder.on("touchmove", function(event) {
            touchMove(event);
        });

        holder.on("touchend", function(event) {
            touchEnd(event);
        });

        function touchStart(event){
            // Test for flick.
            longTouch = false;
            setTimeout(function() {
                longTouch = true;
            }, 250);

            // Get the original touch position.
            touchstartx =  event.originalEvent.touches[0].pageX;
            touchstarty =  event.originalEvent.touches[0].pageY;
            //reset movex on every touch on the slider
            movex= undefined;
        }

        function touchMove(event){
            // Continuously return touch position.
            touchmovex =  event.originalEvent.touches[0].pageX;
            touchmovey =  event.originalEvent.touches[0].pageY;
            // Calculate distance to translate holder.
            movex = slideWidth + (touchstartx - touchmovex);
        }

        function touchEnd(event){
            // Calculate the distance swiped.
            if(movex != undefined){
                var absMovex = Math.abs(slideWidth - movex);
                var absMovey = Math.abs(touchmovey - touchstarty);
                // skip sliding if the user was just moving vertically on the page
                if(!(absMovey > absMovex)) {
                    if (absMovex > slideWidth/4 || longTouch === false) {
                        if (touchmovex > touchstartx) {
                            previousSlide($slideshow);
                        } else{

                            nextSlide($slideshow);
                        }
                    }
                }
            }
        }

    }

    function createNavigationElement(index) {
        var elem = $('<li role="button" tabindex="0"/>');
        elem.attr('aria-describedby', 'offscreen' + index);
        elem.attr('data-relatedSlide',index);
        if(parseInt(index) == 1) {
            elem.attr('class','active');
        }

        var descriptionHeader = $('<label class="off-screen"/>');
        descriptionHeader.attr('id', 'offscreen' + index);
        descriptionHeader.html('show Slide ' + index);

        var descriptionSpan = $('<span />');
        descriptionSpan.html(index);

        descriptionHeader.appendTo(elem);
        descriptionSpan.appendTo(elem);
        return elem;
    }


    $(document).ready(init);


    if (window.PB && window.PB.$) {
        // make this module reinitializes in design mode
        window.PB.$(document.documentElement).on("ScopeModified ScopeLoaded WidgetReloaded", init);
    }

})(jQuery);
(function ($) {

    function init() {
        //1. Get all elements by class name
        //2. Append IDs to them, or use existing and store them
        //3. Create a <ul> of links to the IDs
        var $fragmentNavigation = $('.fragmentNavigationContent');
        if ($fragmentNavigation) {
            $fragmentNavigation.each(function (index, element) {
                $(element).empty();
                var className = element.getAttribute("data-pb-class-name") ? element.getAttribute("data-pb-class-name") : "fragmentNavigationMarker";
                var fragmentsByClass = document.getElementsByClassName(className);
                var list = document.createElement("ul");
                for (var i = 0; i < fragmentsByClass.length; i++) {
                    var fragment = fragmentsByClass[i];
                    var id = fragment.id;
                    if (!id) {
                        id = "fragmentNav_" + i;
                        fragment.setAttribute("id", id);
                    }
                    var text = fragment.getAttribute("data-pb-title");
                    if (!text) {
                        text = fragment.innerText.length ? fragment.innerText : i;
                        text = text.trim();
                        text = text.split('\n')[0];
                    }

                    var link = $('<a></a>').attr({href: "#" + id}).text(text);
                    var link = document.createElement("a");
                    link.setAttribute("href", "#" + id)
                    link.innerText = text;
                    var listItem = document.createElement("li");
                    listItem.appendChild(link);
                    list.appendChild(listItem);
                }
                element.appendChild(list);
            });
        }
    }

    //Reload on ready or on modify
    $(document).ready(init);
    if (window.PB && window.PB.$) {
        window.PB.$(document.documentElement).on("ScopeModified ScopeLoaded WidgetReloaded", init);
    }

})(jQuery);
$(document).ready(function() {
    $(".addthis_toolbox").attr("addthis:url",window.location.href.replace("(","%28").replace(")","%29"));
} );(function ($) {
    $.fn.pbAjax = function (args) {

        var widgetId = $(this).attr('id');
        var pbContext = $("[name='pbContext']").attr('content');

        var data = args['data'] ? args['data'] : {} ;
        data['pbContext'] = pbContext;
        data['widgetId'] = widgetId;

        var targetUrl = args['url'];
        var requestMethod = args.hasOwnProperty('type') ? args['type'] : 'GET';
        var requestDataType = args.hasOwnProperty('dataType') ? args['dataType'] : 'html';
        var asyncRequest = args.hasOwnProperty('async') ? args['async'] : true;

        var successFunction = args['success'];
        var failFunction = args['error'];

        $.ajax({
            type: requestMethod,
            dataType: requestDataType,
            async: asyncRequest,
            url: targetUrl,
            data: data,
            success: successFunction,
            error: failFunction
        });
    };
})(jQuery);/*! jQuery UI - v1.10.3 - 2013-05-03
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t,e){var i="ui-effects-";t.effects={effect:{}},function(t,e){function i(t,e,i){var s=u[e.type]||{};return null==t?i||!e.def?null:e.def:(t=s.floor?~~t:parseFloat(t),isNaN(t)?e.def:s.mod?(t+s.mod)%s.mod:0>t?0:t>s.max?s.max:t)}function s(i){var s=l(),n=s._rgba=[];return i=i.toLowerCase(),f(h,function(t,a){var o,r=a.re.exec(i),h=r&&a.parse(r),l=a.space||"rgba";return h?(o=s[l](h),s[c[l].cache]=o[c[l].cache],n=s._rgba=o._rgba,!1):e}),n.length?("0,0,0,0"===n.join()&&t.extend(n,a.transparent),s):a[i]}function n(t,e,i){return i=(i+1)%1,1>6*i?t+6*(e-t)*i:1>2*i?e:2>3*i?t+6*(e-t)*(2/3-i):t}var a,o="backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",r=/^([\-+])=\s*(\d+\.?\d*)/,h=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[t[1],t[2],t[3],t[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(t){return[2.55*t[1],2.55*t[2],2.55*t[3],t[4]]}},{re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(t){return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]}},{re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(t){return[parseInt(t[1]+t[1],16),parseInt(t[2]+t[2],16),parseInt(t[3]+t[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(t){return[t[1],t[2]/100,t[3]/100,t[4]]}}],l=t.Color=function(e,i,s,n){return new t.Color.fn.parse(e,i,s,n)},c={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},u={"byte":{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},d=l.support={},p=t("<p>")[0],f=t.each;p.style.cssText="background-color:rgba(1,1,1,.5)",d.rgba=p.style.backgroundColor.indexOf("rgba")>-1,f(c,function(t,e){e.cache="_"+t,e.props.alpha={idx:3,type:"percent",def:1}}),l.fn=t.extend(l.prototype,{parse:function(n,o,r,h){if(n===e)return this._rgba=[null,null,null,null],this;(n.jquery||n.nodeType)&&(n=t(n).css(o),o=e);var u=this,d=t.type(n),p=this._rgba=[];return o!==e&&(n=[n,o,r,h],d="array"),"string"===d?this.parse(s(n)||a._default):"array"===d?(f(c.rgba.props,function(t,e){p[e.idx]=i(n[e.idx],e)}),this):"object"===d?(n instanceof l?f(c,function(t,e){n[e.cache]&&(u[e.cache]=n[e.cache].slice())}):f(c,function(e,s){var a=s.cache;f(s.props,function(t,e){if(!u[a]&&s.to){if("alpha"===t||null==n[t])return;u[a]=s.to(u._rgba)}u[a][e.idx]=i(n[t],e,!0)}),u[a]&&0>t.inArray(null,u[a].slice(0,3))&&(u[a][3]=1,s.from&&(u._rgba=s.from(u[a])))}),this):e},is:function(t){var i=l(t),s=!0,n=this;return f(c,function(t,a){var o,r=i[a.cache];return r&&(o=n[a.cache]||a.to&&a.to(n._rgba)||[],f(a.props,function(t,i){return null!=r[i.idx]?s=r[i.idx]===o[i.idx]:e})),s}),s},_space:function(){var t=[],e=this;return f(c,function(i,s){e[s.cache]&&t.push(i)}),t.pop()},transition:function(t,e){var s=l(t),n=s._space(),a=c[n],o=0===this.alpha()?l("transparent"):this,r=o[a.cache]||a.to(o._rgba),h=r.slice();return s=s[a.cache],f(a.props,function(t,n){var a=n.idx,o=r[a],l=s[a],c=u[n.type]||{};null!==l&&(null===o?h[a]=l:(c.mod&&(l-o>c.mod/2?o+=c.mod:o-l>c.mod/2&&(o-=c.mod)),h[a]=i((l-o)*e+o,n)))}),this[n](h)},blend:function(e){if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=l(e)._rgba;return l(t.map(i,function(t,e){return(1-s)*n[e]+s*t}))},toRgbaString:function(){var e="rgba(",i=t.map(this._rgba,function(t,e){return null==t?e>2?1:0:t});return 1===i[3]&&(i.pop(),e="rgb("),e+i.join()+")"},toHslaString:function(){var e="hsla(",i=t.map(this.hsla(),function(t,e){return null==t&&(t=e>2?1:0),e&&3>e&&(t=Math.round(100*t)+"%"),t});return 1===i[3]&&(i.pop(),e="hsl("),e+i.join()+")"},toHexString:function(e){var i=this._rgba.slice(),s=i.pop();return e&&i.push(~~(255*s)),"#"+t.map(i,function(t){return t=(t||0).toString(16),1===t.length?"0"+t:t}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),l.fn.parse.prototype=l.fn,c.hsla.to=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e,i,s=t[0]/255,n=t[1]/255,a=t[2]/255,o=t[3],r=Math.max(s,n,a),h=Math.min(s,n,a),l=r-h,c=r+h,u=.5*c;return e=h===r?0:s===r?60*(n-a)/l+360:n===r?60*(a-s)/l+120:60*(s-n)/l+240,i=0===l?0:.5>=u?l/c:l/(2-c),[Math.round(e)%360,i,u,null==o?1:o]},c.hsla.from=function(t){if(null==t[0]||null==t[1]||null==t[2])return[null,null,null,t[3]];var e=t[0]/360,i=t[1],s=t[2],a=t[3],o=.5>=s?s*(1+i):s+i-s*i,r=2*s-o;return[Math.round(255*n(r,o,e+1/3)),Math.round(255*n(r,o,e)),Math.round(255*n(r,o,e-1/3)),a]},f(c,function(s,n){var a=n.props,o=n.cache,h=n.to,c=n.from;l.fn[s]=function(s){if(h&&!this[o]&&(this[o]=h(this._rgba)),s===e)return this[o].slice();var n,r=t.type(s),u="array"===r||"object"===r?s:arguments,d=this[o].slice();return f(a,function(t,e){var s=u["object"===r?t:e.idx];null==s&&(s=d[e.idx]),d[e.idx]=i(s,e)}),c?(n=l(c(d)),n[o]=d,n):l(d)},f(a,function(e,i){l.fn[e]||(l.fn[e]=function(n){var a,o=t.type(n),h="alpha"===e?this._hsla?"hsla":"rgba":s,l=this[h](),c=l[i.idx];return"undefined"===o?c:("function"===o&&(n=n.call(this,c),o=t.type(n)),null==n&&i.empty?this:("string"===o&&(a=r.exec(n),a&&(n=c+parseFloat(a[2])*("+"===a[1]?1:-1))),l[i.idx]=n,this[h](l)))})})}),l.hook=function(e){var i=e.split(" ");f(i,function(e,i){t.cssHooks[i]={set:function(e,n){var a,o,r="";if("transparent"!==n&&("string"!==t.type(n)||(a=s(n)))){if(n=l(a||n),!d.rgba&&1!==n._rgba[3]){for(o="backgroundColor"===i?e.parentNode:e;(""===r||"transparent"===r)&&o&&o.style;)try{r=t.css(o,"backgroundColor"),o=o.parentNode}catch(h){}n=n.blend(r&&"transparent"!==r?r:"_default")}n=n.toRgbaString()}try{e.style[i]=n}catch(h){}}},t.fx.step[i]=function(e){e.colorInit||(e.start=l(e.elem,i),e.end=l(e.end),e.colorInit=!0),t.cssHooks[i].set(e.elem,e.start.transition(e.end,e.pos))}})},l.hook(o),t.cssHooks.borderColor={expand:function(t){var e={};return f(["Top","Right","Bottom","Left"],function(i,s){e["border"+s+"Color"]=t}),e}},a=t.Color.names={aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",transparent:[null,null,null,0],_default:"#ffffff"}}(jQuery),function(){function i(e){var i,s,n=e.ownerDocument.defaultView?e.ownerDocument.defaultView.getComputedStyle(e,null):e.currentStyle,a={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;)i=n[s],"string"==typeof n[i]&&(a[t.camelCase(i)]=n[i]);else for(i in n)"string"==typeof n[i]&&(a[i]=n[i]);return a}function s(e,i){var s,n,o={};for(s in i)n=i[s],e[s]!==n&&(a[s]||(t.fx.step[s]||!isNaN(parseFloat(n)))&&(o[s]=n));return o}var n=["add","remove","toggle"],a={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};t.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(e,i){t.fx.step[i]=function(t){("none"!==t.end&&!t.setAttr||1===t.pos&&!t.setAttr)&&(jQuery.style(t.elem,i,t.end),t.setAttr=!0)}}),t.fn.addBack||(t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}),t.effects.animateClass=function(e,a,o,r){var h=t.speed(a,o,r);return this.queue(function(){var a,o=t(this),r=o.attr("class")||"",l=h.children?o.find("*").addBack():o;l=l.map(function(){var e=t(this);return{el:e,start:i(this)}}),a=function(){t.each(n,function(t,i){e[i]&&o[i+"Class"](e[i])})},a(),l=l.map(function(){return this.end=i(this.el[0]),this.diff=s(this.start,this.end),this}),o.attr("class",r),l=l.map(function(){var e=this,i=t.Deferred(),s=t.extend({},h,{queue:!1,complete:function(){i.resolve(e)}});return this.el.animate(this.diff,s),i.promise()}),t.when.apply(t,l.get()).done(function(){a(),t.each(arguments,function(){var e=this.el;t.each(this.diff,function(t){e.css(t,"")})}),h.complete.call(o[0])})})},t.fn.extend({addClass:function(e){return function(i,s,n,a){return s?t.effects.animateClass.call(this,{add:i},s,n,a):e.apply(this,arguments)}}(t.fn.addClass),removeClass:function(e){return function(i,s,n,a){return arguments.length>1?t.effects.animateClass.call(this,{remove:i},s,n,a):e.apply(this,arguments)}}(t.fn.removeClass),toggleClass:function(i){return function(s,n,a,o,r){return"boolean"==typeof n||n===e?a?t.effects.animateClass.call(this,n?{add:s}:{remove:s},a,o,r):i.apply(this,arguments):t.effects.animateClass.call(this,{toggle:s},n,a,o)}}(t.fn.toggleClass),switchClass:function(e,i,s,n,a){return t.effects.animateClass.call(this,{add:i,remove:e},s,n,a)}})}(),function(){function s(e,i,s,n){return t.isPlainObject(e)&&(i=e,e=e.effect),e={effect:e},null==i&&(i={}),t.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||t.fx.speeds[i])&&(n=s,s=i,i={}),t.isFunction(s)&&(n=s,s=null),i&&t.extend(e,i),s=s||i.duration,e.duration=t.fx.off?0:"number"==typeof s?s:s in t.fx.speeds?t.fx.speeds[s]:t.fx.speeds._default,e.complete=n||i.complete,e}function n(e){return!e||"number"==typeof e||t.fx.speeds[e]?!0:"string"!=typeof e||t.effects.effect[e]?t.isFunction(e)?!0:"object"!=typeof e||e.effect?!1:!0:!0}t.extend(t.effects,{version:"1.10.3",save:function(t,e){for(var s=0;e.length>s;s++)null!==e[s]&&t.data(i+e[s],t[0].style[e[s]])},restore:function(t,s){var n,a;for(a=0;s.length>a;a++)null!==s[a]&&(n=t.data(i+s[a]),n===e&&(n=""),t.css(s[a],n))},setMode:function(t,e){return"toggle"===e&&(e=t.is(":hidden")?"show":"hide"),e},getBaseline:function(t,e){var i,s;switch(t[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=t[0]/e.height}switch(t[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=t[1]/e.width}return{x:s,y:i}},createWrapper:function(e){if(e.parent().is(".ui-effects-wrapper"))return e.parent();var i={width:e.outerWidth(!0),height:e.outerHeight(!0),"float":e.css("float")},s=t("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),n={width:e.width(),height:e.height()},a=document.activeElement;try{a.id}catch(o){a=document.body}return e.wrap(s),(e[0]===a||t.contains(e[0],a))&&t(a).focus(),s=e.parent(),"static"===e.css("position")?(s.css({position:"relative"}),e.css({position:"relative"})):(t.extend(i,{position:e.css("position"),zIndex:e.css("z-index")}),t.each(["top","left","bottom","right"],function(t,s){i[s]=e.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),e.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),e.css(n),s.css(i).show()},removeWrapper:function(e){var i=document.activeElement;return e.parent().is(".ui-effects-wrapper")&&(e.parent().replaceWith(e),(e[0]===i||t.contains(e[0],i))&&t(i).focus()),e},setTransition:function(e,i,s,n){return n=n||{},t.each(i,function(t,i){var a=e.cssUnit(i);a[0]>0&&(n[i]=a[0]*s+a[1])}),n}}),t.fn.extend({effect:function(){function e(e){function s(){t.isFunction(a)&&a.call(n[0]),t.isFunction(e)&&e()}var n=t(this),a=i.complete,r=i.mode;(n.is(":hidden")?"hide"===r:"show"===r)?(n[r](),s()):o.call(n[0],i,s)}var i=s.apply(this,arguments),n=i.mode,a=i.queue,o=t.effects.effect[i.effect];return t.fx.off||!o?n?this[n](i.duration,i.complete):this.each(function(){i.complete&&i.complete.call(this)}):a===!1?this.each(e):this.queue(a||"fx",e)},show:function(t){return function(e){if(n(e))return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="show",this.effect.call(this,i)}}(t.fn.show),hide:function(t){return function(e){if(n(e))return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="hide",this.effect.call(this,i)}}(t.fn.hide),toggle:function(t){return function(e){if(n(e)||"boolean"==typeof e)return t.apply(this,arguments);var i=s.apply(this,arguments);return i.mode="toggle",this.effect.call(this,i)}}(t.fn.toggle),cssUnit:function(e){var i=this.css(e),s=[];return t.each(["em","px","%","pt"],function(t,e){i.indexOf(e)>0&&(s=[parseFloat(i),e])}),s}})}(),function(){var e={};t.each(["Quad","Cubic","Quart","Quint","Expo"],function(t,i){e[i]=function(e){return Math.pow(e,t+2)}}),t.extend(e,{Sine:function(t){return 1-Math.cos(t*Math.PI/2)},Circ:function(t){return 1-Math.sqrt(1-t*t)},Elastic:function(t){return 0===t||1===t?t:-Math.pow(2,8*(t-1))*Math.sin((80*(t-1)-7.5)*Math.PI/15)},Back:function(t){return t*t*(3*t-2)},Bounce:function(t){for(var e,i=4;((e=Math.pow(2,--i))-1)/11>t;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*e-2)/22-t,2)}}),t.each(e,function(e,i){t.easing["easeIn"+e]=i,t.easing["easeOut"+e]=function(t){return 1-i(1-t)},t.easing["easeInOut"+e]=function(t){return.5>t?i(2*t)/2:1-i(-2*t+2)/2}})}()})(jQuery);/*! jQuery UI - v1.10.3 - 2013-05-03
* http://jqueryui.com
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */
(function(t){var e=0,i={},s={};i.height=i.paddingTop=i.paddingBottom=i.borderTopWidth=i.borderBottomWidth="hide",s.height=s.paddingTop=s.paddingBottom=s.borderTopWidth=s.borderBottomWidth="show",t.widget("ui.accordion",{version:"1.10.3",options:{active:0,animate:{},collapsible:!1,event:"click",header:"> li > :first-child,> :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},activate:null,beforeActivate:null},_create:function(){var e=this.options;this.prevShow=this.prevHide=t(),this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role","tablist"),e.collapsible||e.active!==!1&&null!=e.active||(e.active=0),this._processPanels(),0>e.active&&(e.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():t(),content:this.active.length?this.active.next():t()}},_createIcons:function(){var e=this.options.icons;e&&(t("<span>").addClass("ui-accordion-header-icon ui-icon "+e.header).prependTo(this.headers),this.active.children(".ui-accordion-header-icon").removeClass(e.header).addClass(e.activeHeader),this.headers.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()},_destroy:function(){var t;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),this._destroyIcons(),t=this.headers.next().css("display","").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function(){/^ui-accordion/.test(this.id)&&this.removeAttribute("id")}),"content"!==this.options.heightStyle&&t.css("height","")},_setOption:function(t,e){return"active"===t?(this._activate(e),undefined):("event"===t&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(e)),this._super(t,e),"collapsible"!==t||e||this.options.active!==!1||this._activate(0),"icons"===t&&(this._destroyIcons(),e&&this._createIcons()),"disabled"===t&&this.headers.add(this.headers.next()).toggleClass("ui-state-disabled",!!e),undefined)},_keydown:function(e){if(!e.altKey&&!e.ctrlKey){var i=t.ui.keyCode,s=this.headers.length,n=this.headers.index(e.target),a=!1;switch(e.keyCode){case i.RIGHT:case i.DOWN:a=this.headers[(n+1)%s];break;case i.LEFT:case i.UP:a=this.headers[(n-1+s)%s];break;case i.SPACE:case i.ENTER:this._eventHandler(e);break;case i.HOME:a=this.headers[0];break;case i.END:a=this.headers[s-1]}a&&(t(e.target).attr("tabIndex",-1),t(a).attr("tabIndex",0),a.focus(),e.preventDefault())}},_panelKeyDown:function(e){e.keyCode===t.ui.keyCode.UP&&e.ctrlKey&&t(e.currentTarget).prev().focus()},refresh:function(){var e=this.options;this._processPanels(),e.active===!1&&e.collapsible===!0||!this.headers.length?(e.active=!1,this.active=t()):e.active===!1?this._activate(0):this.active.length&&!t.contains(this.element[0],this.active[0])?this.headers.length===this.headers.find(".ui-state-disabled").length?(e.active=!1,this.active=t()):this._activate(Math.max(0,e.active-1)):e.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){this.headers=this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"),this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()},_refresh:function(){var i,s=this.options,n=s.heightStyle,a=this.element.parent(),o=this.accordionId="ui-accordion-"+(this.element.attr("id")||++e);this.active=this._findActive(s.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),this.active.next().addClass("ui-accordion-content-active").show(),this.headers.attr("role","tab").each(function(e){var i=t(this),s=i.attr("id"),n=i.next(),a=n.attr("id");s||(s=o+"-header-"+e,i.attr("id",s)),a||(a=o+"-panel-"+e,n.attr("id",a)),i.attr("aria-controls",a),n.attr("aria-labelledby",s)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false",tabIndex:-1}).next().attr({"aria-expanded":"false","aria-hidden":"true"}).hide(),this.active.length?this.active.attr({"aria-selected":"true",tabIndex:0}).next().attr({"aria-expanded":"true","aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(s.event),"fill"===n?(i=a.height(),this.element.siblings(":visible").each(function(){var e=t(this),s=e.css("position");"absolute"!==s&&"fixed"!==s&&(i-=e.outerHeight(!0))}),this.headers.each(function(){i-=t(this).outerHeight(!0)}),this.headers.next().each(function(){t(this).height(Math.max(0,i-t(this).innerHeight()+t(this).height()))}).css("overflow","auto")):"auto"===n&&(i=0,this.headers.next().each(function(){i=Math.max(i,t(this).css("height","").height())}).height(i))},_activate:function(e){var i=this._findActive(e)[0];i!==this.active[0]&&(i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:t.noop}))},_findActive:function(e){return"number"==typeof e?this.headers.eq(e):t()},_setupEvents:function(e){var i={keydown:"_keydown"};e&&t.each(e.split(" "),function(t,e){i[e]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(e){var i=this.options,s=this.active,n=t(e.currentTarget),a=n[0]===s[0],o=a&&i.collapsible,r=o?t():n.next(),h=s.next(),l={oldHeader:s,oldPanel:h,newHeader:o?t():n,newPanel:r};e.preventDefault(),a&&!i.collapsible||this._trigger("beforeActivate",e,l)===!1||(i.active=o?!1:this.headers.index(n),this.active=a?t():n,this._toggle(l),s.removeClass("ui-accordion-header-active ui-state-active"),i.icons&&s.children(".ui-accordion-header-icon").removeClass(i.icons.activeHeader).addClass(i.icons.header),a||(n.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),i.icons&&n.children(".ui-accordion-header-icon").removeClass(i.icons.header).addClass(i.icons.activeHeader),n.next().addClass("ui-accordion-content-active")))},_toggle:function(e){var i=e.newPanel,s=this.prevShow.length?this.prevShow:e.oldPanel;this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=s,this.options.animate?this._animate(i,s,e):(s.hide(),i.show(),this._toggleComplete(e)),s.attr({"aria-expanded":"false","aria-hidden":"true"}),s.prev().attr("aria-selected","false"),i.length&&s.length?s.prev().attr("tabIndex",-1):i.length&&this.headers.filter(function(){return 0===t(this).attr("tabIndex")}).attr("tabIndex",-1),i.attr({"aria-expanded":"true","aria-hidden":"false"}).prev().attr({"aria-selected":"true",tabIndex:0})},_animate:function(t,e,n){var a,o,r,h=this,l=0,c=t.length&&(!e.length||t.index()<e.index()),u=this.options.animate||{},d=c&&u.down||u,p=function(){h._toggleComplete(n)};return"number"==typeof d&&(r=d),"string"==typeof d&&(o=d),o=o||d.easing||u.easing,r=r||d.duration||u.duration,e.length?t.length?(a=t.show().outerHeight(),e.animate(i,{duration:r,easing:o,step:function(t,e){e.now=Math.round(t)}}),t.hide().animate(s,{duration:r,easing:o,complete:p,step:function(t,i){i.now=Math.round(t),"height"!==i.prop?l+=i.now:"content"!==h.options.heightStyle&&(i.now=Math.round(a-e.outerHeight()-l),l=0)}}),undefined):e.animate(i,r,o,p):t.animate(s,r,o,p)},_toggleComplete:function(t){var e=t.oldPanel;e.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),e.length&&(e.parent()[0].className=e.parent()[0].className),this._trigger("activate",null,t)}})})(jQuery);$(document).ready(function($){
    $('#accordionWidget').accordion({
        collapsible: true,
        heightStyle: "content",
        icons: null
    });
});$(document).ready(function(){
    $( ".general-rss-feed-reader" ).each(function() {
        var $resultsTarget = $(this).find('.widget-body');
        $(this).pbAjax({
            type: 'GET',
            url: '/pb/widgets/rssWidget/loadWidget',
            dataType: 'html',
            async:'false',
            success: function(data) {
                $resultsTarget.html(data);
            }
        });
    });
});
/**
 * Created by atammam on 11/9/15.
 */
/*!
 * jQuery Smart Banner
 * Copyright (c) 2012 Arnold Daniels <arnold@jasny.net>
 * Based on 'jQuery Smart Web App Banner' by Kurt Zenisek @ kzeni.com
 */
!function ($) {
    var SmartBanner = function (options) {
        this.origHtmlMargin = parseFloat($('html').css('margin-top')) // Get the original margin-top of the HTML element so we can take that into account
        this.options = $.extend({}, $.smartbanner.defaults, options)

        var standalone = navigator.standalone // Check if it's already a standalone web app or running within a webui view of an app (not mobile safari)
            , UA = navigator.userAgent

        // Detect banner type (iOS or Android)
        if (this.options.force) {
            this.type = this.options.force
        } else if (UA.match(/Windows Phone 8/i) != null && UA.match(/Touch/i) !== null) {
            this.type = 'windows'
        } else if (UA.match(/iPhone|iPod/i) != null || (UA.match(/iPad/) && this.options.iOSUniversalApp)) {
            if (UA.match(/Safari/i) != null &&
                (UA.match(/CriOS/i) != null ||
                window.Number(UA.substr(UA.indexOf('OS ') + 3, 3).replace('_', '.')) < 6)) this.type = 'ios' // Check webview and native smart banner support (iOS 6+)
        } else if (UA.match(/\bSilk\/(.*\bMobile Safari\b)?/) || UA.match(/\bKF\w/) || UA.match('Kindle Fire')) {
            this.type = 'kindle'
        } else if (UA.match(/Android/i) != null) {
            this.type = 'android'
        }

        // Don't show banner if device isn't iOS or Android, website is loaded in app or user dismissed banner
        if (!this.type || standalone || this.getCookie('sb-closed') || this.getCookie('sb-installed')) {
            return
        }

        // Calculate scale
        this.scale = this.options.scale == 'auto' ? $(window).width() / window.screen.width : this.options.scale
        if (this.scale < 1) this.scale = 1

        // Get info from meta data
        var meta = $(this.type == 'android' ? 'meta[name="google-play-app"]' :
            this.type == 'ios' ? 'meta[name="apple-itunes-app"]' :
                this.type == 'kindle' ? 'meta[name="kindle-fire-app"]' : 'meta[name="msApplication-ID"]');
        if (meta.length == 0) return

        // For Windows Store apps, get the PackageFamilyName for protocol launch
        if (this.type == 'windows') {
            this.appId = $('meta[name="msApplication-PackageFamilyName"]').attr('content');
        } else {
            // Try to pull the appId out of the meta tag and store the result
            var parsedMetaContent = /app-id=([^\s,]+)/.exec(meta.attr('content'));

            if(parsedMetaContent) {
                this.appId = parsedMetaContent[1];
            } else {
                return;
            }
        }

        this.title = this.options.title ? this.options.title : meta.data('title') || $('title').text().replace(/\s*[|\-·].*$/, '')
        this.author = this.options.author ? this.options.author : meta.data('author') || ($('meta[name="author"]').length ? $('meta[name="author"]').attr('content') : window.location.hostname)
        this.iconUrl = meta.data('icon-url');
        this.price = meta.data('price');

        // Set default onInstall callback if not set in options
        if (typeof this.options.onInstall === 'function') {
            this.options.onInstall = this.options.onInstall;
        } else {
            this.options.onInstall = function() {};
        }

        // Set default onClose callback if not set in options
        if (typeof this.options.onClose === 'function') {
            this.options.onClose = this.options.onClose;
        } else {
            this.options.onClose = function() {};
        }

        // Create banner
        this.create()
        this.show()
        this.listen()
    }

    SmartBanner.prototype = {

        constructor: SmartBanner

        , create: function() {
            var iconURL
                , link=(this.options.url ? this.options.url : (this.type == 'windows' ? 'ms-windows-store:navigate?appid=' : (this.type == 'android' ? 'market://details?id=' : (this.type == 'kindle' ? 'amzn://apps/android?asin=' : 'https://itunes.apple.com/' + this.options.appStoreLanguage + '/app/id'))) + this.appId)
                , price = this.price || this.options.price
                , inStore=price ? price + ' - ' + (this.type == 'android' ? this.options.inGooglePlay : this.type == 'kindle' ? this.options.inAmazonAppStore : this.type == 'ios' ? this.options.inAppStore : this.options.inWindowsStore) : ''
                , gloss=this.options.iconGloss === null ? (this.type=='ios') : this.options.iconGloss

            if (this.type == 'android' && this.options.GooglePlayParams) {
                link = link + '&referrer=' + this.options.GooglePlayParams;
            }

            var banner = '<div id="smartbanner" class="'+this.type+'"><div class="sb-container"><a href="#" class="sb-close">&times;</a><span class="sb-icon"></span><div class="sb-info"><strong>'+this.title+'</strong><span>'+this.author+'</span><span>'+inStore+'</span></div><a href="'+link+'" class="sb-button"><span>'+this.options.button+'</span></a></div></div>';
            (this.options.layer) ? $(this.options.appendToSelector).append(banner) : $(this.options.appendToSelector).prepend(banner);

            if (this.options.icon) {
                iconURL = this.options.icon
            } else if(this.iconUrl) {
                iconURL = this.iconUrl;
            } else if ($('link[rel="apple-touch-icon-precomposed"]').length > 0) {
                iconURL = $('link[rel="apple-touch-icon-precomposed"]').attr('href')
                if (this.options.iconGloss === null) gloss = false
            } else if ($('link[rel="apple-touch-icon"]').length > 0) {
                iconURL = $('link[rel="apple-touch-icon"]').attr('href')
            } else if ($('meta[name="msApplication-TileImage"]').length > 0) {
                iconURL = $('meta[name="msApplication-TileImage"]').attr('content')
            } else if ($('meta[name="msapplication-TileImage"]').length > 0) { /* redundant because ms docs show two case usages */
                iconURL = $('meta[name="msapplication-TileImage"]').attr('content')
            }

            if (iconURL) {
                $('#smartbanner .sb-icon').css('background-image','url('+iconURL+')')
                if (gloss) $('#smartbanner .sb-icon').addClass('gloss')
            } else{
                $('#smartbanner').addClass('no-icon')
            }

            this.bannerHeight = $('#smartbanner').outerHeight() + 2

            if (this.scale > 1) {
                $('#smartbanner')
                    .css('top', parseFloat($('#smartbanner').css('top')) * this.scale)
                    .css('height', parseFloat($('#smartbanner').css('height')) * this.scale)
                    .hide()
                $('#smartbanner .sb-container')
                    .css('-webkit-transform', 'scale('+this.scale+')')
                    .css('-msie-transform', 'scale('+this.scale+')')
                    .css('-moz-transform', 'scale('+this.scale+')')
                    .css('width', $(window).width() / this.scale)
            }
            $('#smartbanner').css('position', (this.options.layer) ? 'absolute' : 'static')
        }

        , listen: function () {
            $('#smartbanner .sb-close').on('click',$.proxy(this.close, this))
            $('#smartbanner .sb-button').on('click',$.proxy(this.install, this))
        }

        , show: function(callback) {
            var banner = $('#smartbanner');
            banner.stop();

            if (this.options.layer) {
                banner.animate({top: 0, display: 'block'}, this.options.speedIn).addClass('shown').show();
                $(this.pushSelector).animate({paddingTop: this.origHtmlMargin + (this.bannerHeight * this.scale)}, this.options.speedIn, 'swing', callback);
            } else {
                if ($.support.transition) {
                    banner.animate({top:0},this.options.speedIn).addClass('shown');
                    var transitionCallback = function() {
                        $('html').removeClass('sb-animation');
                        if (callback) {
                            callback();
                        }
                    };
                    $(this.pushSelector).addClass('sb-animation').one($.support.transition.end, transitionCallback).emulateTransitionEnd(this.options.speedIn).css('margin-top', this.origHtmlMargin+(this.bannerHeight*this.scale));
                } else {
                    banner.slideDown(this.options.speedIn).addClass('shown');
                }
            }
        }

        , hide: function(callback) {
            var banner = $('#smartbanner');
            banner.stop();

            if (this.options.layer) {
                banner.animate({top: -1 * this.bannerHeight * this.scale, display: 'block'}, this.options.speedIn).removeClass('shown');
                $(this.pushSelector).animate({paddingTop: this.origHtmlMargin}, this.options.speedIn, 'swing', callback);
            } else {
                if ($.support.transition) {
                    if ( this.type !== 'android' )
                        banner.css('top', -1*this.bannerHeight*this.scale).removeClass('shown');
                    else
                        banner.css({display:'none'}).removeClass('shown');
                    var transitionCallback = function() {
                        $('html').removeClass('sb-animation');
                        if (callback) {
                            callback();
                        }
                    };
                    $(this.pushSelector).addClass('sb-animation').one($.support.transition.end, transitionCallback).emulateTransitionEnd(this.options.speedOut).css('margin-top', this.origHtmlMargin);
                } else {
                    banner.slideUp(this.options.speedOut).removeClass('shown');
                }
            }
        }

        , close: function(e) {
            e.preventDefault()
            this.hide()
            this.setCookie('sb-closed','true',this.options.daysHidden);
            this.options.onClose(e);
        }

        , install: function(e) {
            if (this.options.hideOnInstall) {
                this.hide()
            }
            this.setCookie('sb-installed','true',this.options.daysReminder)
            this.options.onInstall(e);
        }

        , setCookie: function(name, value, exdays) {
            var exdate = new Date()
            exdate.setDate(exdate.getDate()+exdays)
            value=encodeURI(value)+((exdays==null)?'':'; expires='+exdate.toUTCString())
            document.cookie=name+'='+value+'; path=/;'
        }

        , getCookie: function(name) {
            var i,x,y,ARRcookies = document.cookie.split(";")
            for(i=0;i<ARRcookies.length;i++) {
                x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="))
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1)
                x = x.replace(/^\s+|\s+$/g,"")
                if (x==name) {
                    return decodeURI(y)
                }
            }
            return null
        }

        // Demo only
        , switchType: function() {
            var that = this

            this.hide(function () {
                that.type = that.type == 'android' ? 'ios' : 'android'
                var meta = $(that.type == 'android' ? 'meta[name="google-play-app"]' : 'meta[name="apple-itunes-app"]').attr('content')
                that.appId = /app-id=([^\s,]+)/.exec(meta)[1]

                $('#smartbanner').detach()
                that.create()
                that.show()
            })
        }
    }

    $.smartbanner = function (option) {
        var $window = $(window)
            , data = $window.data('smartbanner')
            , options = typeof option == 'object' && option
        if (!data) $window.data('smartbanner', (data = new SmartBanner(options)))
        if (typeof option == 'string') data[option]()
    }

    // override these globally if you like (they are all optional)
    $.smartbanner.defaults = {
        title: null, // What the title of the app should be in the banner (defaults to <title>)
        author: null, // What the author of the app should be in the banner (defaults to <meta name="author"> or hostname)
        price: 'FREE', // Price of the app
        appStoreLanguage: 'us', // Language code for App Store
        inAppStore: 'On the App Store', // Text of price for iOS
        inGooglePlay: 'In Google Play', // Text of price for Android
        inAmazonAppStore: 'In the Amazon Appstore',
        inWindowsStore: 'In the Windows Store', //Text of price for Windows
        GooglePlayParams: null, // Aditional parameters for the market
        icon: null, // The URL of the icon (defaults to <meta name="apple-touch-icon">)
        iconGloss: null, // Force gloss effect for iOS even for precomposed
        button: 'VIEW', // Text for the install button
        url: null, // The URL for the button. Keep null if you want the button to link to the app store.
        scale: 'auto', // Scale based on viewport size (set to 1 to disable)
        speedIn: 300, // Show animation speed of the banner
        speedOut: 400, // Close animation speed of the banner
        daysHidden: 15, // Duration to hide the banner after being closed (0 = always show banner)
        daysReminder: 90, // Duration to hide the banner after "VIEW" is clicked *separate from when the close button is clicked* (0 = always show banner)
        force: null, // Choose 'ios', 'android' or 'windows'. Don't do a browser check, just always show this banner
        hideOnInstall: true, // Hide the banner after "VIEW" is clicked.
        layer: false, // Display as overlay layer or slide down the page
        iOSUniversalApp: true, // If the iOS App is a universal app for both iPad and iPhone, display Smart Banner to iPad users, too.
        appendToSelector: 'body', //Append the banner to a specific selector
        pushSelector: 'html' // What element is going to push the site content down; this is where the banner append animation will start.
    }

    $.smartbanner.Constructor = SmartBanner;


    // ============================================================
    // Bootstrap transition
    // Copyright 2011-2014 Twitter, Inc.
    // Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)

    function transitionEnd() {
        var el = document.createElement('smartbanner')

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        }

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return {end: transEndEventNames[name]}
            }
        }

        return false // explicit for ie8 (  ._.)
    }

    if ($.support.transition !== undefined)
        return  // Prevent conflict with Twitter Bootstrap

    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function(duration) {
        var called = false, $el = this
        $(this).one($.support.transition.end, function() {
            called = true
        })
        var callback = function() {
            if (!called) $($el).trigger($.support.transition.end)
        }
        setTimeout(callback, duration)
        return this
    }

    $(function() {
        $.support.transition = transitionEnd()
    })
    // ============================================================

}(window.jQuery);/**
 * Created by atammam on 1/17/16.
 */
jQuery(document).ready(function($) {
    $.smartbanner({layer :true, title:($('meta[name="AppTitle"]').attr('content')), author:($('meta[name="AppAuthor"]').attr('content')), icon:($('meta[name="AppIconUrl"]').attr('content'))});
});/**
 * This code for handling the css customization of crossmark dialog
 */
$(function() {

  $("#open-crossmark").click(function() {

      var crossmarkCon = $("#crossmark-dialog").parent();

      // Append crossmark-dialog-container for the parent of crossmark-dialog to customize the css
      if(!crossmarkCon.hasClass("crossmark-dialog-container")) {
          crossmarkCon.addClass("crossmark-dialog-container");


      $("#crossmark-dialog").css("overflow-x","hidden").css("width","525px");
      $("#crossmark-dialog-frame").css("width","565px");
      $(".crossmark-dialog-container .ui-widget-header").css("padding","0px").css("top","-1px");
      $(".crossmark-dialog-container #cm-content").css("width","530px");
      }
  })
});var crossmark={sCrossMarkServer:"http://crossmark.crossref.org",sOpenSelector:"#open-crossmark",sDOI:"",sDomain:"",sURIScheme:"",sCrossMarkURL:"",sStylesURL:"",sTooltipID:"crossmark-tooltip-130",sTooltipSelector:"#crossmark-tooltip-130",sTooltipCopy:"Click to get updates and verify authenticity.",initialize:function(){this.sDOI=this.detectDOI();this.sDomain=window.location.hostname;this.sURIScheme=window.location.protocol;this.sCrossMarkURL=this.sCrossMarkServer+
"/dialog/?doi\x3d"+this.sDOI+"\x26domain\x3d"+this.sDomain+"\x26uri_scheme\x3d"+this.sURIScheme;this.sStylesURL="/templates/jsp/crossref.css"},addStylesheet:function(){$(this.sOpenSelector).parent().eq(0).prepend("\x3clink media\x3d'screen' rel\x3d'stylesheet' type\x3d'text/css' href\x3d'"+this.sStylesURL+"'/\x3e")},activateTooltip:function(){var a=this;$("body").append('\x3cdiv id\x3d"'+this.sTooltipID+'" class\x3d"crossmark-tooltip" style\x3d"display: none;"\x3e\x3cdiv class\x3d"cmtttop"\x3e\x3c/div\x3e\x3cdiv class\x3d"cmttmid"\x3e\x3cp\x3e'+
this.sTooltipCopy+'\x3c/p\x3e\x3c/div\x3e\x3cdiv class\x3d"cmttbot"\x3e\x3c/div\x3e\x3c/div\x3e');$("#crossmark-icon").attr("title","");$("#crossmark-icon").attr("alt","");$("#crossmark-icon").show();$("#crossmark-icon").mouseover(function(){var c=$("#crossmark-icon").offset().left+$("#crossmark-icon").width()/2-$("#crossmark-icon").width()/2,b=$("#crossmark-icon").offset().top-$(a.sTooltipSelector).height()+10;$(a.sTooltipSelector).css({left:c});$(a.sTooltipSelector).css({top:b});$(a.sTooltipSelector).show()});
    $("#crossmark-icon").mouseout(function(){$(a.sTooltipSelector).hide()})},activateDialog:function(){var a=this;$(this.sOpenSelector).click(function(){$("#crossmark-dialog-frame").attr("src",a.sCrossMarkURL);$("#crossmark-dialog").dialog("open");$(a.sTooltipSelector).hide();return!1})},detectDOI:function(){this.sDOI="";var a=$("meta").filter(function(){var a=$(this),b=/dc\.identifier/i.test(a.attr("name")),a=/^info:doi/i.test(a.attr("content"))||/^doi/i.test(a.attr("content"))||/^10\./i.test(a.attr("content"))||
    /dx.doi.org\./i.test(a.attr("content"));return b&&a}).attr("content");a&&(a=a.replace(/^info:doi\//,""),a=a.replace(/^doi:/,""));return a}};
jQuery(function(a){a("#crossmark-dialog").dialog({zIndex:3999,autoOpen:!1,modal:!0,resizable:!1,draggable:!1,open:function(){a(".ui-widget-overlay").click(function(){a("#crossmark-dialog").dialog("close")})},beforeClose:function(){a(".ui-widget-overlay").unbind()},height:550,width:550});crossmark.initialize();crossmark.addStylesheet();crossmark.activateTooltip();crossmark.activateDialog()});/*
* jquery-match-height master by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function(t){var e=-1,a=-1,o=function(t){return parseFloat(t)||0},i=function(e){var a=1,i=t(e),n=null,r=[];return i.each(function(){var e=t(this),i=e.offset().top-o(e.css("margin-top")),s=r.length>0?r[r.length-1]:null;null===s?r.push(e):Math.floor(Math.abs(n-i))<=a?r[r.length-1]=s.add(e):r.push(e),n=i}),r},n=function(e){var a={byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(a,e):("boolean"==typeof e?a.byRow=e:"remove"===e&&(a.remove=!0),a)},r=t.fn.matchHeight=function(e){
var a=n(e);if(a.remove){var o=this;return this.css(a.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(o)}),this}return this.length<=1&&!a.target?this:(r._groups.push({elements:this,options:a}),r._apply(this,a),this)};r.version="master",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,r._afterUpdate=null,r._rows=i,r._parse=o,r._parseOptions=n,r._apply=function(e,a){var s=n(a),h=t(e),c=[h],l=t(window).scrollTop(),p=t("html").outerHeight(!0),d=h.parents().filter(":hidden");
return d.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),d.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),a=e.css("display");"inline-block"!==a&&"flex"!==a&&"inline-flex"!==a&&(a="block"),e.data("style-cache",e.attr("style")),e.css({display:a,"padding-top":"0","padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),c=i(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"");
})),t.each(c,function(e,a){var i=t(a),n=0;if(s.target)n=s.target.outerHeight(!1);else{if(s.byRow&&i.length<=1)return void i.css(s.property,"");i.each(function(){var e=t(this),a=e.css("display");"inline-block"!==a&&"flex"!==a&&"inline-flex"!==a&&(a="block");var o={display:a};o[s.property]="",e.css(o),e.outerHeight(!1)>n&&(n=e.outerHeight(!1)),e.css("display","")})}i.each(function(){var e=t(this),a=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(a+=o(e.css("border-top-width"))+o(e.css("border-bottom-width")),
a+=o(e.css("padding-top"))+o(e.css("padding-bottom"))),e.css(s.property,n-a+"px"))})}),d.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(l/p*t("html").outerHeight(!0)),this},r._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var a=t(this),o=a.attr("data-mh")||a.attr("data-match-height");o in e?e[o]=e[o].add(a):e[o]=a}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),
t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(o,i){if(i&&"resize"===i.type){var n=t(window).width();if(n===e)return;e=n}o?-1===a&&(a=setTimeout(function(){s(i),a=-1},r._throttle)):s(i)},t(r._applyDataApi),t(window).bind("load",function(t){r._update(!1,t)}),t(window).bind("resize orientationchange",function(t){r._update(!0,t)})}(jQuery);!function(a,b){"object"==typeof exports&&"object"==typeof module?module.exports=b():"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?exports.jwplayer=b():a.jwplayer=b()}(this,function(){return function(a){function b(c){if(d[c])return d[c].exports;var e=d[c]={exports:{},id:c,loaded:!1};return a[c].call(e.exports,e,e.exports,b),e.loaded=!0,e.exports}var c=window.webpackJsonpjwplayer;window.webpackJsonpjwplayer=function(d,f){for(var g,h,i=0,j=[];i<d.length;i++)h=d[i],e[h]&&j.push.apply(j,e[h]),e[h]=0;for(g in f)a[g]=f[g];for(c&&c(d,f);j.length;)j.shift().call(null,b)};var d={},e={0:0};return b.e=function(a,c){if(0===e[a])return c.call(null,b);if(void 0!==e[a])e[a].push(c);else{e[a]=[c];var d=document.getElementsByTagName("head")[0],f=document.createElement("script");f.type="text/javascript",f.charset="utf-8",f.async=!0,f.src=b.p+""+({1:"polyfills.promise",2:"polyfills.base64",3:"provider.youtube",4:"provider.dashjs",5:"provider.shaka",6:"provider.cast"}[a]||a)+".js",d.appendChild(f)}},b.m=a,b.c=d,b.p="",b(0)}([function(a,b,c){a.exports=c(40)},,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(a,b,c){var d,e;d=[c(41),c(174),c(45)],e=function(a,b,c){return window.jwplayer?window.jwplayer:c.extend(a,b)}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(42),c(48),c(168)],e=function(a,b){return c.p=b.loadFrom(),a.selectPlayer}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(43),c(98),c(45)],e=function(a,b,c){var d=a.selectPlayer,e=function(){var a=d.apply(this,arguments);return a?a:{registerPlugin:function(a,c,d){"jwpsrv"!==a&&b.registerPlugin(a,c,d)}}};return c.extend(a,{selectPlayer:e})}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(44),c(45),c(86),c(84),c(80),c(98)],e=function(a,b,c,d,e,f){function g(a){var f=a.getName().name;if(!b.find(e,b.matches({name:f}))){if(!b.isFunction(a.supports))throw{message:"Tried to register a provider with an invalid object"};e.unshift({name:f,supports:a.supports})}var g=function(){};g.prototype=c,a.prototype=new g,d[f]=a}var h=[],i=0,j=function(b){var c,d;return b?"string"==typeof b?(c=k(b),c||(d=document.getElementById(b))):"number"==typeof b?c=h[b]:b.nodeType&&(d=b,c=k(d.id)):c=h[0],c?c:d?l(new a(d,m)):{registerPlugin:f.registerPlugin}},k=function(a){for(var b=0;b<h.length;b++)if(h[b].id===a)return h[b];return null},l=function(a){return i++,a.uniqueId=i,h.push(a),a},m=function(a){for(var b=h.length;b--;)if(h[b].uniqueId===a.uniqueId){h.splice(b,1);break}},n={selectPlayer:j,registerProvider:g,availableProviders:e,registerPlugin:f.registerPlugin};return j.api=n,n}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(46),c(62),c(47),c(48),c(61),c(60),c(45),c(63),c(165),c(166),c(167),c(59)],e=function(a,b,c,d,e,f,g,h,i,j,k,l){var m=function(f,m){var n,o=this,p=!1,q={};g.extend(this,c),this.utils=d,this._=g,this.Events=c,this.version=l,this.trigger=function(a,b){return b=g.isObject(b)?g.extend({},b):{},b.type=a,window.jwplayer&&window.jwplayer.debug?c.trigger.call(o,a,b):c.triggerSafe.call(o,a,b)},this.dispatchEvent=this.trigger,this.removeEventListener=this.off.bind(this);var r=function(){n=new h(f),i(o,n),j(o,n),n.on(a.JWPLAYER_PLAYLIST_ITEM,function(){q={}}),n.on(a.JWPLAYER_MEDIA_META,function(a){g.extend(q,a.metadata)}),n.on(a.JWPLAYER_READY,function(a){p=!0,s.tick("ready"),a.setupTime=s.between("setup","ready")}),n.on("all",o.trigger)};r(),k(this),this.id=f.id;var s=this._qoe=new e;s.tick("init");var t=function(){p=!1,q={},o.off(),n&&n.off(),n&&n.playerDestroy&&n.playerDestroy()};return this.getPlugin=function(a){return o.plugins&&o.plugins[a]},this.addPlugin=function(a,b){this.plugins=this.plugins||{},this.plugins[a]=b,this.onReady(b.addToPlayer),b.resize&&this.onResize(b.resizeHandler)},this.setup=function(a){return s.tick("setup"),t(),r(),d.foreach(a.events,function(a,b){var c=o[a];"function"==typeof c&&c.call(o,b)}),a.id=o.id,n.setup(a,this),o},this.qoe=function(){var b=n.getItemQoe(),c=s.between("setup","ready"),d=b.between(a.JWPLAYER_MEDIA_PLAY_ATTEMPT,a.JWPLAYER_MEDIA_FIRST_FRAME);return{setupTime:c,firstFrame:d,player:s.dump(),item:b.dump()}},this.getContainer=function(){return n.getContainer?n.getContainer():f},this.getMeta=this.getItemMeta=function(){return q},this.getPlaylistItem=function(a){if(!d.exists(a))return n._model.get("playlistItem");var b=o.getPlaylist();return b?b[a]:null},this.getRenderingMode=function(){return"html5"},this.load=function(a){var b=this.getPlugin("vast")||this.getPlugin("googima");return b&&b.destroy(),n.load(a),o},this.play=function(a,c){if(g.isBoolean(a)||(c=a),c||(c={reason:"external"}),a===!0)return n.play(c),o;if(a===!1)return n.pause(),o;switch(a=o.getState()){case b.PLAYING:case b.BUFFERING:n.pause();break;default:n.play(c)}return o},this.pause=function(a){return g.isBoolean(a)?this.play(!a):this.play()},this.createInstream=function(){return n.createInstream()},this.castToggle=function(){n&&n.castToggle&&n.castToggle()},this.playAd=this.pauseAd=d.noop,this.remove=function(){return m(o),o.trigger("remove"),t(),o},this};return m}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){var a={},b=Array.prototype,c=Object.prototype,d=Function.prototype,e=b.slice,f=b.concat,g=c.toString,h=c.hasOwnProperty,i=b.map,j=b.reduce,k=b.forEach,l=b.filter,m=b.every,n=b.some,o=b.indexOf,p=Array.isArray,q=Object.keys,r=d.bind,s=function(a){return a instanceof s?a:this instanceof s?void 0:new s(a)},t=s.each=s.forEach=function(b,c,d){if(null==b)return b;if(k&&b.forEach===k)b.forEach(c,d);else if(b.length===+b.length){for(var e=0,f=b.length;f>e;e++)if(c.call(d,b[e],e,b)===a)return}else for(var g=s.keys(b),e=0,f=g.length;f>e;e++)if(c.call(d,b[g[e]],g[e],b)===a)return;return b};s.map=s.collect=function(a,b,c){var d=[];return null==a?d:i&&a.map===i?a.map(b,c):(t(a,function(a,e,f){d.push(b.call(c,a,e,f))}),d)};var u="Reduce of empty array with no initial value";s.reduce=s.foldl=s.inject=function(a,b,c,d){var e=arguments.length>2;if(null==a&&(a=[]),j&&a.reduce===j)return d&&(b=s.bind(b,d)),e?a.reduce(b,c):a.reduce(b);if(t(a,function(a,f,g){e?c=b.call(d,c,a,f,g):(c=a,e=!0)}),!e)throw new TypeError(u);return c},s.find=s.detect=function(a,b,c){var d;return v(a,function(a,e,f){return b.call(c,a,e,f)?(d=a,!0):void 0}),d},s.filter=s.select=function(a,b,c){var d=[];return null==a?d:l&&a.filter===l?a.filter(b,c):(t(a,function(a,e,f){b.call(c,a,e,f)&&d.push(a)}),d)},s.reject=function(a,b,c){return s.filter(a,function(a,d,e){return!b.call(c,a,d,e)},c)},s.compact=function(a){return s.filter(a,s.identity)},s.every=s.all=function(b,c,d){c||(c=s.identity);var e=!0;return null==b?e:m&&b.every===m?b.every(c,d):(t(b,function(b,f,g){return(e=e&&c.call(d,b,f,g))?void 0:a}),!!e)};var v=s.some=s.any=function(b,c,d){c||(c=s.identity);var e=!1;return null==b?e:n&&b.some===n?b.some(c,d):(t(b,function(b,f,g){return e||(e=c.call(d,b,f,g))?a:void 0}),!!e)};s.size=function(a){return null==a?0:a.length===+a.length?a.length:s.keys(a).length},s.after=function(a,b){return function(){return--a<1?b.apply(this,arguments):void 0}},s.before=function(a,b){var c;return function(){return--a>0&&(c=b.apply(this,arguments)),1>=a&&(b=null),c}};var w=function(a){return null==a?s.identity:s.isFunction(a)?a:s.property(a)};s.sortedIndex=function(a,b,c,d){c=w(c);for(var e=c.call(d,b),f=0,g=a.length;g>f;){var h=f+g>>>1;c.call(d,a[h])<e?f=h+1:g=h}return f};var v=s.some=s.any=function(b,c,d){c||(c=s.identity);var e=!1;return null==b?e:n&&b.some===n?b.some(c,d):(t(b,function(b,f,g){return e||(e=c.call(d,b,f,g))?a:void 0}),!!e)};s.contains=s.include=function(a,b){return null==a?!1:(a.length!==+a.length&&(a=s.values(a)),s.indexOf(a,b)>=0)},s.where=function(a,b){return s.filter(a,s.matches(b))},s.findWhere=function(a,b){return s.find(a,s.matches(b))},s.max=function(a,b,c){if(!b&&s.isArray(a)&&a[0]===+a[0]&&a.length<65535)return Math.max.apply(Math,a);var d=-(1/0),e=-(1/0);return t(a,function(a,f,g){var h=b?b.call(c,a,f,g):a;h>e&&(d=a,e=h)}),d},s.difference=function(a){var c=f.apply(b,e.call(arguments,1));return s.filter(a,function(a){return!s.contains(c,a)})},s.without=function(a){return s.difference(a,e.call(arguments,1))},s.indexOf=function(a,b,c){if(null==a)return-1;var d=0,e=a.length;if(c){if("number"!=typeof c)return d=s.sortedIndex(a,b),a[d]===b?d:-1;d=0>c?Math.max(0,e+c):c}if(o&&a.indexOf===o)return a.indexOf(b,c);for(;e>d;d++)if(a[d]===b)return d;return-1};var x=function(){};s.bind=function(a,b){var c,d;if(r&&a.bind===r)return r.apply(a,e.call(arguments,1));if(!s.isFunction(a))throw new TypeError;return c=e.call(arguments,2),d=function(){if(!(this instanceof d))return a.apply(b,c.concat(e.call(arguments)));x.prototype=a.prototype;var f=new x;x.prototype=null;var g=a.apply(f,c.concat(e.call(arguments)));return Object(g)===g?g:f}},s.partial=function(a){var b=e.call(arguments,1);return function(){for(var c=0,d=b.slice(),e=0,f=d.length;f>e;e++)d[e]===s&&(d[e]=arguments[c++]);for(;c<arguments.length;)d.push(arguments[c++]);return a.apply(this,d)}},s.once=s.partial(s.before,2),s.memoize=function(a,b){var c={};return b||(b=s.identity),function(){var d=b.apply(this,arguments);return s.has(c,d)?c[d]:c[d]=a.apply(this,arguments)}},s.delay=function(a,b){var c=e.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)},s.defer=function(a){return s.delay.apply(s,[a,1].concat(e.call(arguments,1)))},s.throttle=function(a,b,c){var d,e,f,g=null,h=0;c||(c={});var i=function(){h=c.leading===!1?0:s.now(),g=null,f=a.apply(d,e),d=e=null};return function(){var j=s.now();h||c.leading!==!1||(h=j);var k=b-(j-h);return d=this,e=arguments,0>=k?(clearTimeout(g),g=null,h=j,f=a.apply(d,e),d=e=null):g||c.trailing===!1||(g=setTimeout(i,k)),f}},s.keys=function(a){if(!s.isObject(a))return[];if(q)return q(a);var b=[];for(var c in a)s.has(a,c)&&b.push(c);return b},s.invert=function(a){for(var b={},c=s.keys(a),d=0,e=c.length;e>d;d++)b[a[c[d]]]=c[d];return b},s.defaults=function(a){return t(e.call(arguments,1),function(b){if(b)for(var c in b)void 0===a[c]&&(a[c]=b[c])}),a},s.extend=function(a){return t(e.call(arguments,1),function(b){if(b)for(var c in b)a[c]=b[c]}),a},s.pick=function(a){var c={},d=f.apply(b,e.call(arguments,1));return t(d,function(b){b in a&&(c[b]=a[b])}),c},s.omit=function(a){var c={},d=f.apply(b,e.call(arguments,1));for(var g in a)s.contains(d,g)||(c[g]=a[g]);return c},s.clone=function(a){return s.isObject(a)?s.isArray(a)?a.slice():s.extend({},a):a},s.isArray=p||function(a){return"[object Array]"==g.call(a)},s.isObject=function(a){return a===Object(a)},t(["Arguments","Function","String","Number","Date","RegExp"],function(a){s["is"+a]=function(b){return g.call(b)=="[object "+a+"]"}}),s.isArguments(arguments)||(s.isArguments=function(a){return!(!a||!s.has(a,"callee"))}),s.isFunction=function(a){return"function"==typeof a},s.isFinite=function(a){return isFinite(a)&&!isNaN(parseFloat(a))},s.isNaN=function(a){return s.isNumber(a)&&a!=+a},s.isBoolean=function(a){return a===!0||a===!1||"[object Boolean]"==g.call(a)},s.isNull=function(a){return null===a},s.isUndefined=function(a){return void 0===a},s.has=function(a,b){return h.call(a,b)},s.identity=function(a){return a},s.constant=function(a){return function(){return a}},s.property=function(a){return function(b){return b[a]}},s.propertyOf=function(a){return null==a?function(){}:function(b){return a[b]}},s.matches=function(a){return function(b){if(b===a)return!0;for(var c in a)if(a[c]!==b[c])return!1;return!0}},s.now=Date.now||function(){return(new Date).getTime()},s.result=function(a,b){if(null!=a){var c=a[b];return s.isFunction(c)?c.call(a):c}};var y=0;return s.uniqueId=function(a){var b=++y+"";return a?a+b:b},s}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){var a={DRAG:"drag",DRAG_START:"dragStart",DRAG_END:"dragEnd",CLICK:"click",DOUBLE_CLICK:"doubleClick",TAP:"tap",DOUBLE_TAP:"doubleTap",OVER:"over",MOVE:"move",OUT:"out"},b={COMPLETE:"complete",ERROR:"error",JWPLAYER_AD_CLICK:"adClick",JWPLAYER_AD_COMPANIONS:"adCompanions",JWPLAYER_AD_COMPLETE:"adComplete",JWPLAYER_AD_ERROR:"adError",JWPLAYER_AD_IMPRESSION:"adImpression",JWPLAYER_AD_META:"adMeta",JWPLAYER_AD_PAUSE:"adPause",JWPLAYER_AD_PLAY:"adPlay",JWPLAYER_AD_SKIPPED:"adSkipped",JWPLAYER_AD_TIME:"adTime",JWPLAYER_CAST_AD_CHANGED:"castAdChanged",JWPLAYER_MEDIA_COMPLETE:"complete",JWPLAYER_READY:"ready",JWPLAYER_MEDIA_SEEK:"seek",JWPLAYER_MEDIA_BEFOREPLAY:"beforePlay",JWPLAYER_MEDIA_BEFORECOMPLETE:"beforeComplete",JWPLAYER_MEDIA_BUFFER_FULL:"bufferFull",JWPLAYER_DISPLAY_CLICK:"displayClick",JWPLAYER_PLAYLIST_COMPLETE:"playlistComplete",JWPLAYER_CAST_SESSION:"cast",JWPLAYER_MEDIA_ERROR:"mediaError",JWPLAYER_MEDIA_FIRST_FRAME:"firstFrame",JWPLAYER_MEDIA_PLAY_ATTEMPT:"playAttempt",JWPLAYER_MEDIA_LOADED:"loaded",JWPLAYER_MEDIA_SEEKED:"seeked",JWPLAYER_SETUP_ERROR:"setupError",JWPLAYER_ERROR:"error",JWPLAYER_PLAYER_STATE:"state",JWPLAYER_CAST_AVAILABLE:"castAvailable",JWPLAYER_MEDIA_BUFFER:"bufferChange",JWPLAYER_MEDIA_TIME:"time",JWPLAYER_MEDIA_TYPE:"mediaType",JWPLAYER_MEDIA_VOLUME:"volume",JWPLAYER_MEDIA_MUTE:"mute",JWPLAYER_MEDIA_META:"meta",JWPLAYER_MEDIA_LEVELS:"levels",JWPLAYER_MEDIA_LEVEL_CHANGED:"levelsChanged",JWPLAYER_CONTROLS:"controls",JWPLAYER_FULLSCREEN:"fullscreen",JWPLAYER_RESIZE:"resize",JWPLAYER_PLAYLIST_ITEM:"playlistItem",JWPLAYER_PLAYLIST_LOADED:"playlist",JWPLAYER_AUDIO_TRACKS:"audioTracks",JWPLAYER_AUDIO_TRACK_CHANGED:"audioTrackChanged",JWPLAYER_LOGO_CLICK:"logoClick",JWPLAYER_CAPTIONS_LIST:"captionsList",JWPLAYER_CAPTIONS_CHANGED:"captionsChanged",JWPLAYER_PROVIDER_CHANGED:"providerChanged",JWPLAYER_PROVIDER_FIRST_FRAME:"providerFirstFrame",JWPLAYER_USER_ACTION:"userAction",JWPLAYER_PROVIDER_CLICK:"providerClick",JWPLAYER_VIEW_TAB_FOCUS:"tabFocus",JWPLAYER_CONTROLBAR_DRAGGING:"scrubbing",JWPLAYER_INSTREAM_CLICK:"instreamClick"};return b.touchEvents=a,b}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45)],e=function(a){var b=[],c=b.slice,d={on:function(a,b,c){if(!f(this,"on",a,[b,c])||!b)return this;this._events||(this._events={});var d=this._events[a]||(this._events[a]=[]);return d.push({callback:b,context:c}),this},once:function(b,c,d){if(!f(this,"once",b,[c,d])||!c)return this;var e=this,g=a.once(function(){e.off(b,g),c.apply(this,arguments)});return g._callback=c,this.on(b,g,d)},off:function(b,c,d){var e,g,h,i,j,k,l,m;if(!this._events||!f(this,"off",b,[c,d]))return this;if(!b&&!c&&!d)return this._events=void 0,this;for(i=b?[b]:a.keys(this._events),j=0,k=i.length;k>j;j++)if(b=i[j],h=this._events[b]){if(this._events[b]=e=[],c||d)for(l=0,m=h.length;m>l;l++)g=h[l],(c&&c!==g.callback&&c!==g.callback._callback||d&&d!==g.context)&&e.push(g);e.length||delete this._events[b]}return this},trigger:function(a){if(!this._events)return this;var b=c.call(arguments,1);if(!f(this,"trigger",a,b))return this;var d=this._events[a],e=this._events.all;return d&&g(d,b,this),e&&g(e,arguments,this),this},triggerSafe:function(a){if(!this._events)return this;var b=c.call(arguments,1);if(!f(this,"trigger",a,b))return this;var d=this._events[a],e=this._events.all;return d&&h(d,b,this),e&&h(e,arguments,this),this}},e=/\s+/,f=function(a,b,c,d){if(!c)return!0;if("object"==typeof c){for(var f in c)a[b].apply(a,[f,c[f]].concat(d));return!1}if(e.test(c)){for(var g=c.split(e),h=0,i=g.length;i>h;h++)a[b].apply(a,[g[h]].concat(d));return!1}return!0},g=function(a,b,c){var d,e=-1,f=a.length,g=b[0],h=b[1],i=b[2];switch(b.length){case 0:for(;++e<f;)(d=a[e]).callback.call(d.context||c);return;case 1:for(;++e<f;)(d=a[e]).callback.call(d.context||c,g);return;case 2:for(;++e<f;)(d=a[e]).callback.call(d.context||c,g,h);return;case 3:for(;++e<f;)(d=a[e]).callback.call(d.context||c,g,h,i);return;default:for(;++e<f;)(d=a[e]).callback.apply(d.context||c,b);return}},h=function(a,b,c){for(var d,e=-1,f=a.length;++e<f;)try{(d=a[e]).callback.apply(d.context||c,b)}catch(g){}};return d}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(51),c(45),c(52),c(53),c(55),c(49),c(56),c(50),c(57),c(60)],e=function(a,b,c,d,e,f,g,h,i,j){var k={};return k.log=function(){window.console&&("object"==typeof console.log?console.log(Array.prototype.slice.call(arguments,0)):console.log.apply(console,arguments))},k.between=function(a,b,c){return Math.max(Math.min(a,c),b)},k.foreach=function(a,b){var c,d;for(c in a)"function"===k.typeOf(a.hasOwnProperty)?a.hasOwnProperty(c)&&(d=a[c],b(c,d)):(d=a[c],b(c,d))},k.indexOf=b.indexOf,k.noop=function(){},k.seconds=a.seconds,k.prefix=a.prefix,k.suffix=a.suffix,b.extend(k,f,h,c,g,d,e,i,j),k}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(50)],e=function(a,b){function c(a){return/^(?:(?:https?|file)\:)?\/\//.test(a)}function d(b){return a.some(b,function(a){return"parsererror"===a.nodeName})}var e={};return e.getAbsolutePath=function(a,d){if(b.exists(d)||(d=document.location.href),b.exists(a)){if(c(a))return a;var e,f=d.substring(0,d.indexOf("://")+3),g=d.substring(f.length,d.indexOf("/",f.length+1));if(0===a.indexOf("/"))e=a.split("/");else{var h=d.split("?")[0];h=h.substring(f.length+g.length+1,h.lastIndexOf("/")),e=h.split("/").concat(a.split("/"))}for(var i=[],j=0;j<e.length;j++)e[j]&&b.exists(e[j])&&"."!==e[j]&&(".."===e[j]?i.pop():i.push(e[j]));return f+g+"/"+i.join("/")}},e.getScriptPath=a.memoize(function(a){for(var b=document.getElementsByTagName("script"),c=0;c<b.length;c++){var d=b[c].src;if(d&&d.indexOf(a)>=0)return d.substr(0,d.indexOf(a))}return""}),e.parseXML=function(a){var b=null;try{"DOMParser"in window?(b=(new window.DOMParser).parseFromString(a,"text/xml"),(d(b.childNodes)||b.childNodes&&d(b.childNodes[0].childNodes))&&(b=null)):(b=new window.ActiveXObject("Microsoft.XMLDOM"),b.async="false",b.loadXML(a))}catch(c){}return b},e.serialize=function(a){if(void 0===a)return null;if("string"==typeof a&&a.length<6){var b=a.toLowerCase();if("true"===b)return!0;if("false"===b)return!1;if(!isNaN(Number(a))&&!isNaN(parseFloat(a)))return Number(a)}return a},e.parseDimension=function(a){return"string"==typeof a?""===a?0:a.lastIndexOf("%")>-1?a:parseInt(a.replace("px",""),10):a},e.timeFormat=function(a,b){if(0>=a&&!b)return"00:00";var c=0>a?"-":"";a=Math.abs(a);var d=Math.floor(a/3600),e=Math.floor((a-3600*d)/60),f=Math.floor(a%60);return c+(d?d+":":"")+(10>e?"0":"")+e+":"+(10>f?"0":"")+f},e.adaptiveType=function(a){if(0!==a){var b=-120;if(b>=a)return"DVR";if(0>a||a===1/0)return"LIVE"}return"VOD"},e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45)],e=function(a){var b={};return b.exists=function(a){switch(typeof a){case"string":return a.length>0;case"object":return null!==a;case"undefined":return!1}return!0},b.isHTTPS=function(){return 0===window.location.href.indexOf("https")},b.isRtmp=function(a,b){return 0===a.indexOf("rtmp")||"rtmp"===b},b.isYouTube=function(a,b){return"youtube"===b||/^(http|\/\/).*(youtube\.com|youtu\.be)\/.+/.test(a)},b.youTubeID=function(a){var b=/v[=\/]([^?&]*)|youtu\.be\/([^?]*)|^([\w-]*)$/i.exec(a);return b?b.slice(1).join("").replace("?",""):""},b.typeOf=function(b){if(null===b)return"null";var c=typeof b;return"object"===c&&a.isArray(b)?"array":c},b}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45)],e=function(a){function b(a){return a.indexOf("(format=m3u8-")>-1?"m3u8":!1}var c=function(a){return a.replace(/^\s+|\s+$/g,"")},d=function(a,b,c){for(a=""+a,c=c||"0";a.length<b;)a=c+a;return a},e=function(a,b){for(var c=0;c<a.attributes.length;c++)if(a.attributes[c].name&&a.attributes[c].name.toLowerCase()===b.toLowerCase())return a.attributes[c].value.toString();return""},f=function(a){if(!a||"rtmp"===a.substr(0,4))return"";var c=b(a);return c?c:(a=a.substring(a.lastIndexOf("/")+1,a.length).split("?")[0].split("#")[0],a.lastIndexOf(".")>-1?a.substr(a.lastIndexOf(".")+1,a.length).toLowerCase():void 0)},g=function(a){var b=parseInt(a/3600),c=parseInt(a/60)%60,e=a%60;return d(b,2)+":"+d(c,2)+":"+d(e.toFixed(3),6)},h=function(b){if(a.isNumber(b))return b;b=b.replace(",",".");var c=b.split(":"),d=0;return"s"===b.slice(-1)?d=parseFloat(b):"m"===b.slice(-1)?d=60*parseFloat(b):"h"===b.slice(-1)?d=3600*parseFloat(b):c.length>1?(d=parseFloat(c[c.length-1]),d+=60*parseFloat(c[c.length-2]),3===c.length&&(d+=3600*parseFloat(c[c.length-3]))):d=parseFloat(b),d},i=function(b,c){return a.map(b,function(a){return c+a})},j=function(b,c){return a.map(b,function(a){return a+c})};return{trim:c,pad:d,xmlAttribute:e,extension:f,hms:g,seconds:h,suffix:j,prefix:i}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45)],e=function(a){function b(a){return function(){return d(a)}}var c={},d=a.memoize(function(a){var b=navigator.userAgent.toLowerCase();return null!==b.match(a)}),e=c.isInt=function(a){return parseFloat(a)%1===0};c.isFlashSupported=function(){var a=c.flashVersion();return a&&a>=11.2},c.isFF=b(/firefox/i),c.isIPod=b(/iP(hone|od)/i),c.isIPad=b(/iPad/i),c.isSafari602=b(/Macintosh.*Mac OS X 10_8.*6\.0\.\d* Safari/i),c.isOSX=b(/Mac OS X/i),c.isEdge=b(/\sedge\/\d+/i);var f=c.isIETrident=function(a){return c.isEdge()?!0:a?(a=parseFloat(a).toFixed(1),d(new RegExp("trident/.+rv:\\s*"+a,"i"))):d(/trident/i)},g=c.isMSIE=function(a){return a?(a=parseFloat(a).toFixed(1),d(new RegExp("msie\\s*"+a,"i"))):d(/msie/i)},h=b(/chrome/i);c.isChrome=function(){return h()&&!c.isEdge()},c.isIE=function(a){return a?(a=parseFloat(a).toFixed(1),a>=11?f(a):g(a)):g()||f()},c.isSafari=function(){return d(/safari/i)&&!d(/chrome/i)&&!d(/chromium/i)&&!d(/android/i)};var i=c.isIOS=function(a){return d(a?new RegExp("iP(hone|ad|od).+\\s(OS\\s"+a+"|.*\\sVersion/"+a+")","i"):/iP(hone|ad|od)/i)};c.isAndroidNative=function(a){return j(a,!0)};var j=c.isAndroid=function(a,b){return b&&d(/chrome\/[123456789]/i)&&!d(/chrome\/18/)?!1:a?(e(a)&&!/\./.test(a)&&(a=""+a+"."),d(new RegExp("Android\\s*"+a,"i"))):d(/Android/i)};return c.isMobile=function(){return i()||j()},c.isIframe=function(){return window.frameElement&&"IFRAME"===window.frameElement.nodeName},c.flashVersion=function(){if(c.isAndroid())return 0;var a,b=navigator.plugins;if(b&&(a=b["Shockwave Flash"],a&&a.description))return parseFloat(a.description.replace(/\D+(\d+\.?\d*).*/,"$1"));if("undefined"!=typeof window.ActiveXObject){try{if(a=new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash"))return parseFloat(a.GetVariable("$version").split(" ")[1].replace(/\s*,\s*/,"."))}catch(d){return 0}return a}return 0},c}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(51),c(45),c(54)],e=function(a,b,c){var d={};d.createElement=function(a){var b=document.createElement("div");return b.innerHTML=a,b.firstChild},d.styleDimension=function(a){return a+(a.toString().indexOf("%")>0?"":"px")};var e=function(a){return b.isString(a.className)?a.className.split(" "):[]},f=function(b,c){c=a.trim(c),b.className!==c&&(b.className=c)};return d.classList=function(a){return a.classList?a.classList:e(a)},d.hasClass=c.hasClass,d.addClass=function(a,c){var d=e(a),g=b.isArray(c)?c:c.split(" ");b.each(g,function(a){b.contains(d,a)||d.push(a)}),f(a,d.join(" "))},d.removeClass=function(a,c){var d=e(a),g=b.isArray(c)?c:c.split(" ");f(a,b.difference(d,g).join(" "))},d.replaceClass=function(a,b,c){var d=a.className||"";b.test(d)?d=d.replace(b,c):c&&(d+=" "+c),f(a,d)},d.toggleClass=function(a,c,e){var f=d.hasClass(a,c);e=b.isBoolean(e)?e:!f,e!==f&&(e?d.addClass(a,c):d.removeClass(a,c))},d.emptyElement=function(a){for(;a.firstChild;)a.removeChild(a.firstChild)},d.addStyleSheet=function(a){var b=document.createElement("link");b.rel="stylesheet",b.href=a,document.getElementsByTagName("head")[0].appendChild(b)},d.empty=function(a){if(a)for(;a.childElementCount>0;)a.removeChild(a.children[0])},d.bounds=function(a){var b={left:0,right:0,width:0,height:0,top:0,bottom:0};if(!a||!document.body.contains(a))return b;var c=a.getBoundingClientRect(a),d=window.pageYOffset,e=window.pageXOffset;return c.width||c.height||c.left||c.top?(b.left=c.left+e,b.right=c.right+e,b.top=c.top+d,b.bottom=c.bottom+d,b.width=c.right-c.left,b.height=c.bottom-c.top,b):b},d}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){return{hasClass:function(a,b){var c=" "+b+" ";return 1===a.nodeType&&(" "+a.className+" ").replace(/[\t\r\n\f]/g," ").indexOf(c)>=0}}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(51)],e=function(a){function b(a){a=a.split("-");for(var b=1;b<a.length;b++)a[b]=a[b].charAt(0).toUpperCase()+a[b].slice(1);return a.join("")}function c(b,c,d){if(""===c||void 0===c||null===c)return"";var e=d?" !important":"";return"string"==typeof c&&isNaN(c)?/png|gif|jpe?g/i.test(c)&&c.indexOf("url")<0?"url("+c+")":c+e:0===c||"z-index"===b||"opacity"===b?""+c+e:/color/i.test(b)?"#"+a.pad(c.toString(16).replace(/^0x/i,""),6)+e:Math.ceil(c)+"px"+e}var d,e={},f=function(a,b){d||(d=document.createElement("style"),d.type="text/css",document.getElementsByTagName("head")[0].appendChild(d));var c=a+JSON.stringify(b).replace(/"/g,""),f=document.createTextNode(c);e[a]&&d.removeChild(e[a]),e[a]=f,d.appendChild(f)},g=function(a,d){if(void 0!==a&&null!==a){void 0===a.length&&(a=[a]);var e,f={};for(e in d)f[e]=c(e,d[e]);for(var g=0;g<a.length;g++){var h,i=a[g];if(void 0!==i&&null!==i)for(e in f)h=b(e),i.style[h]!==f[e]&&(i.style[h]=f[e])}}},h=function(a){for(var b in e)b.indexOf(a)>=0&&(d.removeChild(e[b]),delete e[b])},i=function(a,b){g(a,{transform:b,webkitTransform:b,msTransform:b,mozTransform:b,oTransform:b})},j=function(a,b){var c="rgb";a?(a=String(a).replace("#",""),3===a.length&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2])):a="000000";var d=[parseInt(a.substr(0,2),16),parseInt(a.substr(2,2),16),parseInt(a.substr(4,2),16)];return void 0!==b&&100!==b&&(c+="a",d.push(b/100)),c+"("+d.join(",")+")"};return{css:f,style:g,clearCss:h,transform:i,hexToRgba:j}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(49)],e=function(a,b){function c(a){a.onload=null,a.onprogress=null,a.onreadystatechange=null,a.onerror=null,"abort"in a&&a.abort()}function d(b,d){return function(e){var f=e.currentTarget||d.xhr;if(clearTimeout(d.timeoutId),d.retryWithoutCredentials&&d.xhr.withCredentials){c(f);var g=a.extend({},d,{xhr:null,withCredentials:!1,retryWithoutCredentials:!1});return void l(g)}d.onerror(b,d.url,f)}}function e(a){return function(b){var c=b.currentTarget||a.xhr;if(4===c.readyState){if(clearTimeout(a.timeoutId),c.status>=400){var d;return d=404===c.status?"File not found":""+c.status+"("+c.statusText+")",a.onerror(d,a.url,c)}if(200===c.status)return f(a)(b)}}}function f(a){return function(c){var d=c.currentTarget||a.xhr;if(clearTimeout(a.timeoutId),a.responseType){if("json"===a.responseType)return g(d,a)}else{var e,f=d.responseXML;if(f)try{e=f.firstChild}catch(i){}if(f&&e)return h(d,f,a);if(j&&d.responseText&&!f&&(f=b.parseXML(d.responseText),f&&f.firstChild))return h(d,f,a);if(a.requireValidXML)return void a.onerror("Invalid XML",a.url,d)}a.oncomplete(d)}}function g(b,c){if(!b.response||a.isString(b.response)&&'"'!==b.responseText.substr(1))try{b=a.extend({},b,{response:JSON.parse(b.responseText)})}catch(d){return void c.onerror("Invalid JSON",c.url,b)}return c.oncomplete(b)}function h(b,c,d){var e=c.documentElement;return d.requireValidXML&&("parsererror"===e.nodeName||e.getElementsByTagName("parsererror").length)?void d.onerror("Invalid XML",d.url,b):(b.responseXML||(b=a.extend({},b,{responseXML:c})),d.oncomplete(b))}var i=function(){},j=!1,k=function(a){var b=document.createElement("a"),c=document.createElement("a");b.href=location.href;try{return c.href=a,c.href=c.href,b.protocol+"//"+b.host!=c.protocol+"//"+c.host}catch(d){}return!0},l=function(b,g,h,l){a.isObject(b)&&(l=b,b=l.url);var m,n=a.extend({xhr:null,url:b,withCredentials:!1,retryWithoutCredentials:!1,timeout:6e4,timeoutId:-1,oncomplete:g||i,onerror:h||i,mimeType:l&&!l.responseType?"text/xml":"",requireValidXML:!1,responseType:l&&l.plainText?"text":""},l);if("XDomainRequest"in window&&k(b))m=n.xhr=new window.XDomainRequest,m.onload=f(n),m.ontimeout=m.onprogress=i,j=!0;else{if(!("XMLHttpRequest"in window))return void n.onerror("",b);m=n.xhr=new window.XMLHttpRequest,m.onreadystatechange=e(n)}var o=d("Error loading file",n);m.onerror=o,"overrideMimeType"in m?n.mimeType&&m.overrideMimeType(n.mimeType):j=!0;try{b=b.replace(/#.*$/,""),m.open("GET",b,!0)}catch(p){return o(p),m}if(n.responseType)try{m.responseType=n.responseType}catch(p){}n.timeout&&(n.timeoutId=setTimeout(function(){c(m),n.onerror("Timeout",b,m)},n.timeout));try{n.withCredentials&&"withCredentials"in m&&(m.withCredentials=!0),m.send()}catch(p){o(p)}return m};return{ajax:l,crossdomain:k}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(58),c(45),c(50),c(49),c(59)],e=function(a,b,c,d,e){var f={};return f.repo=b.memoize(function(){var b=e.split("+")[0],d=a.repo+b+"/";return c.isHTTPS()?d.replace(/^http:/,"https:"):d}),f.versionCheck=function(a){var b=("0"+a).split(/\W/),c=e.split(/\W/),d=parseFloat(b[0]),f=parseFloat(c[0]);return d>f?!1:!(d===f&&parseFloat("0"+b[1])>parseFloat(c[1]))},f.isSDK=function(a){return!(!a.analytics||!a.analytics.sdkplatform)},f.loadFrom=function(){return f.repo()},f}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){return{repo:"http://ssl.p.jwpcdn.com/player/v/",SkinsIncluded:["seven"],SkinsLoadable:["beelden","bekle","five","glow","roundster","six","stormtrooper","vapor"],dvrSeekLimit:-25}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){return"7.3.5+commercial_v7-3-5.80.commercial.5a924f.jwplayer.ad873d.analytics.5a0154.vast.0300bb.googima.e8ba93.plugin-sharing.08a279.plugin-related.909f55.plugin-gapro.0374cd"}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){var a=function(a,c,d){if(c=c||this,d=d||[],window.jwplayer&&window.jwplayer.debug)return a.apply(c,d);try{return a.apply(c,d)}catch(e){return new b(a.name,e)}},b=function(a,b){this.name=a,this.message=b.message||b.toString(),this.error=b};return{tryCatch:a,Error:b}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45)],e=function(a){var b=function(){var b={},c={},d={},e={};return{start:function(c){b[c]=a.now(),d[c]=d[c]+1||1},end:function(d){if(b[d]){var e=a.now()-b[d];c[d]=c[d]+e||e}},dump:function(){return{counts:d,sums:c,events:e}},tick:function(b,c){e[b]=c||a.now()},between:function(a,b){return e[b]&&e[a]?e[b]-e[a]:-1}}};return b}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){return{BUFFERING:"buffering",IDLE:"idle",COMPLETE:"complete",PAUSED:"paused",PLAYING:"playing",ERROR:"error",LOADING:"loading",STALLED:"stalled"}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(64),c(81),c(158)],e=function(a,b,d){var e=a.prototype.setup;return a.prototype.setup=function(a,f){e.apply(this,arguments);var g=this._model.get("edition"),h=b(g),i=this._model.get("cast"),j=this;h("casting")&&i&&i.appid&&c.e(6,function(a){var b=c(159);j._castController=new b(j,j._model),j.castToggle=j._castController.castToggle.bind(j._castController)});var k=d.setup();this.once("ready",k.onReady,this),f.getAdBlock=k.checkAdBlock},a}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(73),c(115),c(74),c(45),c(93),c(111),c(77),c(114),c(65),c(48),c(116),c(47),c(76),c(62),c(46),c(156)],e=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){function q(a){return function(){var b=Array.prototype.slice.call(arguments,0);this.eventsQueue.push([a,b])}}function r(a){return a===n.LOADING||a===n.STALLED?n.BUFFERING:a}var s=function(a){this.originalContainer=this.currentContainer=a,this.eventsQueue=[],d.extend(this,l),this._model=new g};return s.prototype={play:q("play"),pause:q("pause"),setVolume:q("setVolume"),setMute:q("setMute"),seek:q("seek"),stop:q("stop"),load:q("load"),playlistNext:q("playlistNext"),playlistPrev:q("playlistPrev"),playlistItem:q("playlistItem"),setFullscreen:q("setFullscreen"),
setCurrentCaptions:q("setCurrentCaptions"),setCurrentQuality:q("setCurrentQuality"),setup:function(g,l){function p(){U.mediaModel.on("change:state",function(a,b){var c=r(b);U.set("state",c)})}function q(){X=null,D(U.get("item")),U.on("change:state",m,this),U.on("change:castState",function(a,b){aa.trigger(o.JWPLAYER_CAST_SESSION,b)}),U.on("change:fullscreen",function(a,b){aa.trigger(o.JWPLAYER_FULLSCREEN,{fullscreen:b})}),U.on("itemReady",function(){aa.trigger(o.JWPLAYER_PLAYLIST_ITEM,{index:U.get("item"),item:U.get("playlistItem")})}),U.on("change:playlist",function(a,b){b.length&&aa.trigger(o.JWPLAYER_PLAYLIST_LOADED,{playlist:b})}),U.on("change:volume",function(a,b){aa.trigger(o.JWPLAYER_MEDIA_VOLUME,{volume:b})}),U.on("change:mute",function(a,b){aa.trigger(o.JWPLAYER_MEDIA_MUTE,{mute:b})}),U.on("change:controls",function(a,b){aa.trigger(o.JWPLAYER_CONTROLS,{controls:b})}),U.on("change:scrubbing",function(a,b){b?y():w()}),U.on("change:captionsList",function(a,b){aa.trigger(o.JWPLAYER_CAPTIONS_LIST,{tracks:b,track:Q()})}),U.mediaController.on("all",aa.trigger.bind(aa)),V.on("all",aa.trigger.bind(aa)),this.showView(V.element()),window.addEventListener("beforeunload",function(){X&&X.destroy(),U&&U.destroy()}),d.defer(s)}function s(){for(aa.trigger(o.JWPLAYER_READY,{setupTime:0}),aa.trigger(o.JWPLAYER_PLAYLIST_LOADED,{playlist:U.get("playlist")}),aa.trigger(o.JWPLAYER_PLAYLIST_ITEM,{index:U.get("item"),item:U.get("playlistItem")}),aa.trigger(o.JWPLAYER_CAPTIONS_LIST,{tracks:U.get("captionsList"),track:U.get("captionsIndex")}),U.get("autostart")&&w({reason:"autostart"});aa.eventsQueue.length>0;){var a=aa.eventsQueue.shift(),b=a[0],c=a[1]||[];aa[b].apply(aa,c)}}function t(a){switch(U.get("state")===n.ERROR&&U.set("state",n.IDLE),x(!0),U.get("autostart")&&U.once("itemReady",w),typeof a){case"string":u(a);break;case"object":var b=C(a);b&&D(0);break;case"number":D(a)}}function u(a){var b=new i;b.on(o.JWPLAYER_PLAYLIST_LOADED,function(a){t(a.playlist)}),b.on(o.JWPLAYER_ERROR,function(a){a.message="Error loading playlist: "+a.message,this.triggerError(a)},this),b.load(a)}function v(){var a=aa._instreamAdapter&&aa._instreamAdapter.getState();return d.isString(a)?a:U.get("state")}function w(a){var b;if(a&&U.set("playReason",a.reason),U.get("state")!==n.ERROR){var c=aa._instreamAdapter&&aa._instreamAdapter.getState();if(d.isString(c))return l.pauseAd(!1);if(U.get("state")===n.COMPLETE&&(x(!0),D(0)),!$&&($=!0,aa.trigger(o.JWPLAYER_MEDIA_BEFOREPLAY,{playReason:U.get("playReason")}),$=!1,Z))return Z=!1,void(Y=null);if(z()){if(0===U.get("playlist").length)return!1;b=j.tryCatch(function(){U.loadVideo()})}else U.get("state")===n.PAUSED&&(b=j.tryCatch(function(){U.playVideo()}));return b instanceof j.Error?(aa.triggerError(b),Y=null,!1):!0}}function x(a){U.off("itemReady",w);var b=!a;Y=null;var c=j.tryCatch(function(){U.stopVideo()},aa);return c instanceof j.Error?(aa.triggerError(c),!1):(b&&(_=!0),$&&(Z=!0),!0)}function y(){Y=null;var a=aa._instreamAdapter&&aa._instreamAdapter.getState();if(d.isString(a))return l.pauseAd(!0);switch(U.get("state")){case n.ERROR:return!1;case n.PLAYING:case n.BUFFERING:var b=j.tryCatch(function(){ba().pause()},this);if(b instanceof j.Error)return aa.triggerError(b),!1;break;default:$&&(Z=!0)}return!0}function z(){var a=U.get("state");return a===n.IDLE||a===n.COMPLETE||a===n.ERROR}function A(a){U.get("state")!==n.ERROR&&(U.get("scrubbing")||U.get("state")===n.PLAYING||w(!0),ba().seek(a))}function B(a,b){x(!0),D(a),w(b)}function C(a){var b=h(a);return b=h.filterPlaylist(b,U.getProviders(),U.get("androidhls"),U.get("drm"),U.get("preload")),U.set("playlist",b),d.isArray(b)&&0!==b.length?!0:(aa.triggerError({message:"Error loading playlist: No playable sources found"}),!1)}function D(a){var b=U.get("playlist");a=(a+b.length)%b.length,U.set("item",a),U.set("playlistItem",b[a]),U.setActiveItem(b[a])}function E(a){B(U.get("item")-1,a||{reason:"external"})}function F(a){B(U.get("item")+1,a||{reason:"external"})}function G(){if(z()){if(_)return void(_=!1);Y=G;var a=U.get("item");return a===U.get("playlist").length-1?void(U.get("repeat")?F({reason:"repeat"}):(U.set("state",n.COMPLETE),aa.trigger(o.JWPLAYER_PLAYLIST_COMPLETE,{}))):void F({reason:"playlist"})}}function H(a){ba().setCurrentQuality(a)}function I(){return ba()?ba().getCurrentQuality():-1}function J(){return this._model?this._model.getConfiguration():void 0}function K(){if(this._model.mediaModel)return this._model.mediaModel.get("visualQuality");var a=L();if(a){var b=I(),c=a[b];if(c)return{level:d.extend({index:b},c),mode:"",reason:""}}return null}function L(){return ba()?ba().getQualityLevels():null}function M(a){ba()&&ba().setCurrentAudioTrack(a)}function N(){return ba()?ba().getCurrentAudioTrack():-1}function O(){return ba()?ba().getAudioTracks():null}function P(a){U.persistVideoSubtitleTrack(a),aa.trigger(o.JWPLAYER_CAPTIONS_CHANGED,{tracks:R(),track:a})}function Q(){return W.getCurrentIndex()}function R(){return W.getCaptionsList()}function S(){var a=U.getVideo();if(a){var b=a.detachMedia();if(b instanceof HTMLVideoElement)return b}return null}function T(){var a=j.tryCatch(function(){U.getVideo().attachMedia()});return a instanceof j.Error?void j.log("Error calling _attachMedia",a):void("function"==typeof Y&&Y())}var U,V,W,X,Y,Z,$=!1,_=!1,aa=this,ba=function(){return U.getVideo()},ca=new a(g);U=this._model.setup(ca),V=this._view=new k(l,U),W=new f(l,U),X=new e(l,U,V,C),X.on(o.JWPLAYER_READY,q,this),X.on(o.JWPLAYER_SETUP_ERROR,this.setupError,this),U.mediaController.on(o.JWPLAYER_MEDIA_COMPLETE,function(){d.defer(G)}),U.mediaController.on(o.JWPLAYER_MEDIA_ERROR,this.triggerError,this),U.on("change:flashBlocked",function(a,b){if(!b)return void this._model.set("errorEvent",void 0);var c=!!a.get("flashThrottle"),d={message:c?"Click to run Flash":"Flash plugin failed to load"};c||this.trigger(o.JWPLAYER_ERROR,d),this._model.set("errorEvent",d)},this),p(),U.on("change:mediaModel",p),this.play=w,this.pause=y,this.seek=A,this.stop=x,this.load=t,this.playlistNext=F,this.playlistPrev=E,this.playlistItem=B,this.setCurrentCaptions=P,this.setCurrentQuality=H,this.detachMedia=S,this.attachMedia=T,this.getCurrentQuality=I,this.getQualityLevels=L,this.setCurrentAudioTrack=M,this.getCurrentAudioTrack=N,this.getAudioTracks=O,this.getCurrentCaptions=Q,this.getCaptionsList=R,this.getVisualQuality=K,this.getConfig=J,this.getState=v,this.setVolume=U.setVolume,this.setMute=U.setMute,this.getProvider=function(){return U.get("provider")},this.getWidth=function(){return U.get("containerWidth")},this.getHeight=function(){return U.get("containerHeight")},this.getContainer=function(){return this.currentContainer},this.resize=V.resize,this.getSafeRegion=V.getSafeRegion,this.setCues=V.addCues,this.setFullscreen=function(a){d.isBoolean(a)||(a=!U.get("fullscreen")),U.set("fullscreen",a),this._instreamAdapter&&this._instreamAdapter._adModel&&this._instreamAdapter._adModel.set("fullscreen",a)},this.addButton=function(a,b,c,e,f){var g={img:a,tooltip:b,callback:c,id:e,btnClass:f},h=U.get("dock");h=h?h.slice(0):[],h=d.reject(h,d.matches({id:g.id})),h.push(g),U.set("dock",h)},this.removeButton=function(a){var b=U.get("dock")||[];b=d.reject(b,d.matches({id:a})),U.set("dock",b)},this.checkBeforePlay=function(){return $},this.getItemQoe=function(){return U._qoeItem},this.setControls=function(a){d.isBoolean(a)||(a=!U.get("controls")),U.set("controls",a);var b=U.getVideo();b&&b.setControls(a)},this.playerDestroy=function(){this.stop(),this.showView(this.originalContainer),V&&V.destroy(),U&&U.destroy(),X&&(X.destroy(),X=null)},this.isBeforePlay=this.checkBeforePlay,this.isBeforeComplete=function(){return U.getVideo().checkComplete()},this.createInstream=function(){return this.instreamDestroy(),this._instreamAdapter=new c(this,U,V),this._instreamAdapter},this.skipAd=function(){this._instreamAdapter&&this._instreamAdapter.skipAd()},this.instreamDestroy=function(){aa._instreamAdapter&&aa._instreamAdapter.destroy()},b(l,this),X.start()},showView:function(a){(document.documentElement.contains(this.currentContainer)||(this.currentContainer=document.getElementById(this._model.get("id")),this.currentContainer))&&(this.currentContainer.parentElement&&this.currentContainer.parentElement.replaceChild(a,this.currentContainer),this.currentContainer=a)},triggerError:function(a){this._model.set("errorEvent",a),this._model.set("state",n.ERROR),this._model.once("change:state",function(){this._model.set("errorEvent",void 0)},this),this.trigger(o.JWPLAYER_ERROR,a)},setupError:function(a){var b=a.message,c=j.createElement(p(this._model.get("id"),this._model.get("skin"),b)),e=this._model.get("width"),f=this._model.get("height");j.style(c,{width:e.toString().indexOf("%")>0?e:e+"px",height:f.toString().indexOf("%")>0?f:f+"px"}),this.showView(c);var g=this;d.defer(function(){g.trigger(o.JWPLAYER_SETUP_ERROR,{message:b})})}},s}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(66),c(67),c(48),c(46),c(47),c(45)],e=function(a,b,c,d,e,f){var g=function(){function g(e){var g=c.tryCatch(function(){var c,g=e.responseXML?e.responseXML.childNodes:null,h="";if(g){for(var k=0;k<g.length&&(h=g[k],8===h.nodeType);k++);"xml"===a.localName(h)&&(h=h.nextSibling),"rss"===a.localName(h)&&(c=b.parse(h))}if(!c)try{c=JSON.parse(e.responseText),f.isArray(c)||(c=c.playlist)}catch(l){return void i("Not a valid RSS/JSON feed")}j.trigger(d.JWPLAYER_PLAYLIST_LOADED,{playlist:c})});g instanceof c.Error&&i()}function h(a){i("Playlist load error: "+a)}function i(a){j.trigger(d.JWPLAYER_ERROR,{message:a?a:"Error loading file"})}var j=f.extend(this,e);this.load=function(a){c.ajax(a,g,h)},this.destroy=function(){this.off()}};return g}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(51)],e=function(a){return{localName:function(a){return a?a.localName?a.localName:a.baseName?a.baseName:"":""},textContent:function(b){return b?b.textContent?a.trim(b.textContent):b.text?a.trim(b.text):"":""},getChildNode:function(a,b){return a.childNodes[b]},numChildren:function(a){return a.childNodes?a.childNodes.length:0}}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(51),c(66),c(68),c(69),c(70)],e=function(a,b,c,d,e){function f(b){for(var f={},h=0;h<b.childNodes.length;h++){var i=b.childNodes[h],k=j(i);if(k)switch(k.toLowerCase()){case"enclosure":f.file=a.xmlAttribute(i,"url");break;case"title":f.title=g(i);break;case"guid":f.mediaid=g(i);break;case"pubdate":f.date=g(i);break;case"description":f.description=g(i);break;case"link":f.link=g(i);break;case"category":f.tags?f.tags+=g(i):f.tags=g(i)}}return f=d(b,f),f=c(b,f),new e(f)}var g=b.textContent,h=b.getChildNode,i=b.numChildren,j=b.localName,k={};return k.parse=function(a){for(var b=[],c=0;c<i(a);c++){var d=h(a,c),e=j(d).toLowerCase();if("channel"===e)for(var g=0;g<i(d);g++){var k=h(d,g);"item"===j(k).toLowerCase()&&b.push(f(k))}}return b},k}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(66),c(51),c(48)],e=function(a,b,c){var d="jwplayer",e=function(e,f){for(var g=[],h=[],i=b.xmlAttribute,j="default",k="label",l="file",m="type",n=0;n<e.childNodes.length;n++){var o=e.childNodes[n];if(o.prefix===d){var p=a.localName(o);"source"===p?(delete f.sources,g.push({file:i(o,l),"default":i(o,j),label:i(o,k),type:i(o,m)})):"track"===p?(delete f.tracks,h.push({file:i(o,l),"default":i(o,j),kind:i(o,"kind"),label:i(o,k)})):(f[p]=c.serialize(a.textContent(o)),"file"===p&&f.sources&&delete f.sources)}f[l]||(f[l]=f.link)}if(g.length)for(f.sources=[],n=0;n<g.length;n++)g[n].file.length>0&&(g[n][j]="true"===g[n][j],g[n].label.length||delete g[n].label,f.sources.push(g[n]));if(h.length)for(f.tracks=[],n=0;n<h.length;n++)h[n].file.length>0&&(h[n][j]="true"===h[n][j],h[n].kind=h[n].kind.length?h[n].kind:"captions",h[n].label.length||delete h[n].label,f.tracks.push(h[n]));return f};return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(66),c(51),c(48)],e=function(a,b,c){var d=b.xmlAttribute,e=a.localName,f=a.textContent,g=a.numChildren,h="media",i=function(a,b){function j(a){var b={zh:"Chinese",nl:"Dutch",en:"English",fr:"French",de:"German",it:"Italian",ja:"Japanese",pt:"Portuguese",ru:"Russian",es:"Spanish"};return b[a]?b[a]:a}var k,l,m="tracks",n=[];for(l=0;l<g(a);l++)if(k=a.childNodes[l],k.prefix===h){if(!e(k))continue;switch(e(k).toLowerCase()){case"content":d(k,"duration")&&(b.duration=c.seconds(d(k,"duration"))),g(k)>0&&(b=i(k,b)),d(k,"url")&&(b.sources||(b.sources=[]),b.sources.push({file:d(k,"url"),type:d(k,"type"),width:d(k,"width"),label:d(k,"label")}));break;case"title":b.title=f(k);break;case"description":b.description=f(k);break;case"guid":b.mediaid=f(k);break;case"thumbnail":b.image||(b.image=d(k,"url"));break;case"player":break;case"group":i(k,b);break;case"subtitle":var o={};o.file=d(k,"url"),o.kind="captions",d(k,"lang").length>0&&(o.label=j(d(k,"lang"))),n.push(o)}}for(b.hasOwnProperty(m)||(b[m]=[]),l=0;l<n.length;l++)b[m].push(n[l]);return b};return i}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(71),c(72)],e=function(a,b,c){var d={sources:[],tracks:[]},e=function(e){e=e||{},a.isArray(e.tracks)||delete e.tracks;var f=a.extend({},d,e);a.isObject(f.sources)&&!a.isArray(f.sources)&&(f.sources=[b(f.sources)]),a.isArray(f.sources)&&0!==f.sources.length||(e.levels?f.sources=e.levels:f.sources=[b(e)]);for(var g=0;g<f.sources.length;g++){var h=f.sources[g];if(h){var i=h["default"];i?h["default"]="true"===i.toString():h["default"]=!1,f.sources[g].label||(f.sources[g].label=g.toString()),f.sources[g]=b(f.sources[g])}}return f.sources=a.compact(f.sources),a.isArray(f.tracks)||(f.tracks=[]),a.isArray(f.captions)&&(f.tracks=f.tracks.concat(f.captions),delete f.captions),f.tracks=a.compact(a.map(f.tracks,c)),f};return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(51),c(45)],e=function(a,b,c){var d={"default":!1},e=function(e){if(e&&e.file){var f=c.extend({},d,e);f.file=b.trim(""+f.file);var g=/^[^\/]+\/(?:x-)?([^\/]+)$/;if(a.isYouTube(f.file)?f.type="youtube":a.isRtmp(f.file)?f.type="rtmp":g.test(f.type)?f.type=f.type.replace(g,"$1"):f.type||(f.type=b.extension(f.file)),f.type){switch(f.type){case"m3u8":case"vnd.apple.mpegurl":f.type="hls";break;case"dash+xml":f.type="dash";break;case"smil":f.type="rtmp";break;case"m4a":f.type="aac"}return c.each(f,function(a,b){""===a&&delete f[b]}),f}}};return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45)],e=function(a){var b={kind:"captions","default":!1},c=function(c){return c&&c.file?a.extend({},b,c):void 0};return c}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(45)],e=function(a,b){function d(c){b.each(c,function(b,d){c[d]=a.serialize(b)})}function e(a){return a.slice&&"px"===a.slice(-2)&&(a=a.slice(0,-2)),a}function f(b,c){if(-1===c.toString().indexOf("%"))return 0;if("string"!=typeof b||!a.exists(b))return 0;if(/^\d*\.?\d+%$/.test(b))return b;var d=b.indexOf(":");if(-1===d)return 0;var e=parseFloat(b.substr(0,d)),f=parseFloat(b.substr(d+1));return 0>=e||0>=f?0:f/e*100+"%"}var g={autostart:!1,controls:!0,displaytitle:!0,displaydescription:!0,mobilecontrols:!1,repeat:!1,castAvailable:!1,skin:"seven",stretching:"uniform",mute:!1,volume:90,width:480,height:270},h=function(h){var i=b.extend({},(window.jwplayer||{}).defaults,h);d(i);var j=b.extend({},g,i);if("."===j.base&&(j.base=a.getScriptPath("jwplayer.js")),j.base=(j.base||a.loadFrom()).replace(/\/?$/,"/"),c.p=j.base,j.width=e(j.width),j.height=e(j.height),j.flashplayer=j.flashplayer||a.getScriptPath("jwplayer.js")+"jwplayer.flash.swf","http:"===window.location.protocol&&(j.flashplayer=j.flashplayer.replace("https","http")),j.aspectratio=f(j.aspectratio,j.width),b.isObject(j.skin)&&(j.skinUrl=j.skin.url,j.skinColorInactive=j.skin.inactive,j.skinColorActive=j.skin.active,j.skinColorBackground=j.skin.background,j.skin=b.isString(j.skin.name)?j.skin.name:g.skin),b.isString(j.skin)&&j.skin.indexOf(".xml")>0&&(console.log("JW Player does not support XML skins, please update your config"),j.skin=j.skin.replace(".xml","")),j.aspectratio||delete j.aspectratio,!j.playlist){var k=b.pick(j,["title","description","type","mediaid","image","file","sources","tracks","preload"]);j.playlist=[k]}return j};return h}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(75),c(92),c(46),c(62),c(48),c(47),c(45)],e=function(a,b,c,d,e,f,g){function h(c){var d=c.get("provider").name||"";return d.indexOf("flash")>=0?b:a}var i={skipoffset:null,tag:null},j=function(a,b,f){function j(a,b){b=b||{},u.tag&&!b.tag&&(b.tag=u.tag),this.trigger(a,b)}function k(a){s._adModel.set("duration",a.duration),s._adModel.set("position",a.position)}function l(a){if(m&&t+1<m.length){s._adModel.set("state","buffering"),b.set("skipButton",!1),t++;var d,e=m[t];n&&(d=n[t]),this.loadItem(e,d)}else a.type===c.JWPLAYER_MEDIA_COMPLETE&&(j.call(this,a.type,a),this.trigger(c.JWPLAYER_PLAYLIST_COMPLETE,{})),this.destroy()}var m,n,o,p,q,r=h(b),s=new r(a,b),t=0,u={},v=g.bind(function(a){a=a||{},a.hasControls=!!b.get("controls"),this.trigger(c.JWPLAYER_INSTREAM_CLICK,a),s&&s._adModel&&(s._adModel.get("state")===d.PAUSED?a.hasControls&&s.instreamPlay():s.instreamPause())},this),w=g.bind(function(){s&&s._adModel&&s._adModel.get("state")===d.PAUSED&&b.get("controls")&&(a.setFullscreen(),a.play())},this);this.type="instream",this.init=function(){o=b.getVideo(),p=b.get("position"),q=b.get("playlist")[b.get("item")],s.on("all",j,this),s.on(c.JWPLAYER_MEDIA_TIME,k,this),s.on(c.JWPLAYER_MEDIA_COMPLETE,l,this),s.init(),o.detachMedia(),b.mediaModel.set("state",d.BUFFERING),a.checkBeforePlay()||0===p&&!o.checkComplete()?(p=0,b.set("preInstreamState","instream-preroll")):o&&o.checkComplete()||b.get("state")===d.COMPLETE?b.set("preInstreamState","instream-postroll"):b.set("preInstreamState","instream-midroll");var g=b.get("state");return g!==d.PLAYING&&g!==d.BUFFERING||o.pause(),f.setupInstream(s._adModel),s._adModel.set("state",d.BUFFERING),f.clickHandler().setAlternateClickHandlers(e.noop,null),this.setText("Loading ad"),this},this.loadItem=function(a,d){if(e.isAndroid(2.3))return void this.trigger({type:c.JWPLAYER_ERROR,message:"Error loading instream: Cannot play instream on Android 2.3"});g.isArray(a)&&(m=a,n=d,a=m[t],n&&(d=n[t])),this.trigger(c.JWPLAYER_PLAYLIST_ITEM,{index:t,item:a}),u=g.extend({},i,d),s.load(a),this.addClickHandler();var f=a.skipoffset||u.skipoffset;f&&(s._adModel.set("skipMessage",u.skipMessage),s._adModel.set("skipText",u.skipText),s._adModel.set("skipOffset",f),b.set("skipButton",!0))},this.applyProviderListeners=function(a){s.applyProviderListeners(a),this.addClickHandler()},this.play=function(){s.instreamPlay()},this.pause=function(){s.instreamPause()},this.hide=function(){s.hide()},this.addClickHandler=function(){f.clickHandler().setAlternateClickHandlers(v,w),s.on(c.JWPLAYER_MEDIA_META,this.metaHandler,this)},this.skipAd=function(a){var b=c.JWPLAYER_AD_SKIPPED;this.trigger(b,a),l.call(this,{type:b})},this.metaHandler=function(a){a.width&&a.height&&f.resizeMedia()},this.destroy=function(){if(this.off(),b.set("skipButton",!1),s){f.clickHandler()&&f.clickHandler().revertAlternateClickHandlers(),s.instreamDestroy(),f.destroyInstream(),s=null,a.attachMedia();var c=b.get("preInstreamState");switch(c){case"instream-preroll":case"instream-midroll":var h=g.extend({},q);h.starttime=p,b.loadVideo(h),e.isMobile()&&b.mediaModel.get("state")===d.BUFFERING&&o.setState(d.BUFFERING),o.play();break;case"instream-postroll":case"instream-idle":o.stop()}}},this.getState=function(){return s&&s._adModel?s._adModel.get("state"):!1},this.setText=function(a){f.setAltText(a?a:"")},this.hide=function(){f.useExternalControls()}};return g.extend(j.prototype,f),j}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(47),c(76),c(46),c(62),c(77)],e=function(a,b,c,d,e,f){var g=function(g,h){function i(b){var e=b||m.getVideo();if(n!==e){if(n=e,!e)return;e.off(),e.on("all",function(b,c){c=a.extend({},c,{type:b}),this.trigger(b,c)},o),e.on(d.JWPLAYER_MEDIA_BUFFER_FULL,l),e.on(d.JWPLAYER_PLAYER_STATE,j),e.attachMedia(),e.volume(h.get("volume")),e.mute(h.get("mute")),m.on("change:state",c,o)}}function j(a){switch(a.newstate){case e.PLAYING:m.set("state",a.newstate);break;case e.PAUSED:m.set("state",a.newstate)}}function k(a){h.trigger(a.type,a),o.trigger(d.JWPLAYER_FULLSCREEN,{fullscreen:a.jwstate})}function l(){m.getVideo().play()}var m,n,o=a.extend(this,b);return g.on(d.JWPLAYER_FULLSCREEN,function(a){this.trigger(d.JWPLAYER_FULLSCREEN,a)},o),this.init=function(){m=(new f).setup({id:h.get("id"),volume:h.get("volume"),fullscreen:h.get("fullscreen"),mute:h.get("mute")}),m.on("fullscreenchange",k),this._adModel=m},o.load=function(a){m.set("item",0),m.set("playlistItem",a),m.setActiveItem(a),i(),m.off(d.JWPLAYER_ERROR),m.on(d.JWPLAYER_ERROR,function(a){this.trigger(d.JWPLAYER_ERROR,a)},o),m.loadVideo(a)},o.applyProviderListeners=function(a){i(a),a.off(d.JWPLAYER_ERROR),a.on(d.JWPLAYER_ERROR,function(a){this.trigger(d.JWPLAYER_ERROR,a)},o),h.on("change:volume",function(a,b){n.volume(b)},o),h.on("change:mute",function(a,b){n.mute(b)},o)},this.instreamDestroy=function(){m&&(m.off(),this.off(),n&&(n.detachMedia(),n.off(),m.getVideo()&&n.destroy()),m=null,g.off(null,null,this),g=null)},o.instreamPlay=function(){m.getVideo()&&m.getVideo().play(!0)},o.instreamPause=function(){m.getVideo()&&m.getVideo().pause(!0)},o};return g}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(62)],e=function(a){function b(b){return b===a.COMPLETE||b===a.ERROR?a.IDLE:b}return function(a,c,d){if(c=b(c),d=b(d),c!==d){var e=c.replace(/(?:ing|d)$/,""),f={type:e,newstate:c,oldstate:d,reason:a.mediaModel.get("state")};"play"===e&&(f.playReason=a.get("playReason")),this.trigger(e,f)}}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(78),c(89),c(90),c(45),c(47),c(91),c(46),c(62)],e=function(a,b,c,d,e,f,g,h,i){var j=["volume","mute","captionLabel","qualityLabel"],k=function(){function g(a,b){switch(a){case"flashThrottle":var c="resume"!==b.state;this.set("flashThrottle",c),this.set("flashBlocked",c);break;case"flashBlocked":return void this.set("flashBlocked",!0);case"flashUnblocked":return void this.set("flashBlocked",!1);case"volume":case"mute":return void this.set(a,b[a]);case h.JWPLAYER_MEDIA_TYPE:this.mediaModel.set("mediaType",b.mediaType);break;case h.JWPLAYER_PLAYER_STATE:return void this.mediaModel.set("state",b.newstate);case h.JWPLAYER_MEDIA_BUFFER:this.set("buffer",b.bufferPercent);case h.JWPLAYER_MEDIA_META:var d=b.duration;e.isNumber(d)&&(this.mediaModel.set("duration",d),this.set("duration",d));break;case h.JWPLAYER_MEDIA_BUFFER_FULL:this.mediaModel.get("playAttempt")?this.playVideo():this.mediaModel.on("change:playAttempt",function(){this.playVideo()},this);break;case h.JWPLAYER_MEDIA_TIME:this.mediaModel.set("position",b.position),this.set("position",b.position),e.isNumber(b.duration)&&(this.mediaModel.set("duration",b.duration),this.set("duration",b.duration));break;case h.JWPLAYER_PROVIDER_CHANGED:this.set("provider",m.getName());break;case h.JWPLAYER_MEDIA_LEVELS:this.setQualityLevel(b.currentQuality,b.levels),this.mediaModel.set("levels",b.levels);break;case h.JWPLAYER_MEDIA_LEVEL_CHANGED:this.setQualityLevel(b.currentQuality,b.levels),this.persistQualityLevel(b.currentQuality,b.levels);break;case h.JWPLAYER_AUDIO_TRACKS:this.setCurrentAudioTrack(b.currentTrack,b.tracks),this.mediaModel.set("audioTracks",b.tracks);break;case h.JWPLAYER_AUDIO_TRACK_CHANGED:this.setCurrentAudioTrack(b.currentTrack,b.tracks);break;case"subtitlesTrackChanged":this.setVideoSubtitleTrack(b.currentTrack,b.tracks);break;case"visualQuality":var f=e.extend({},b);this.mediaModel.set("visualQuality",f)}var g=e.extend({},b,{type:a});this.mediaController.trigger(a,g)}var k,m,n=this,o=a.noop;this.mediaController=e.extend({},f),this.mediaModel=new l,d.model(this),this.set("mediaModel",this.mediaModel),this.setup=function(b){var d=new c;return d.track(j,this),e.extend(this.attributes,d.getAllItems(),b,{item:0,state:i.IDLE,flashBlocked:!1,fullscreen:!1,compactUI:!1,scrubbing:!1,duration:0,position:0,buffer:0}),a.isMobile()&&!b.mobileSdk&&this.set("autostart",!1),this.updateProviders(),this},this.getConfiguration=function(){return e.omit(this.clone(),["mediaModel"])},this.updateProviders=function(){k=new b(this.getConfiguration())},this.setQualityLevel=function(a,b){a>-1&&b.length>1&&"youtube"!==m.getName().name&&this.mediaModel.set("currentLevel",parseInt(a))},this.persistQualityLevel=function(a,b){var c=b[a]||{},d=c.label;this.set("qualityLabel",d)},this.setCurrentAudioTrack=function(a,b){a>-1&&b.length>0&&a<b.length&&this.mediaModel.set("currentAudioTrack",parseInt(a))},this.onMediaContainer=function(){var a=this.get("mediaContainer");o.setContainer(a)},this.changeVideoProvider=function(a){this.off("change:mediaContainer",this.onMediaContainer),m&&(m.off(null,null,this),m.getContainer()&&m.remove()),o=new a(n.get("id"),n.getConfiguration());var b=this.get("mediaContainer");b?o.setContainer(b):this.once("change:mediaContainer",this.onMediaContainer),this.set("provider",o.getName()),-1===o.getName().name.indexOf("flash")&&(this.set("flashThrottle",void 0),this.set("flashBlocked",!1)),m=o,m.volume(n.get("volume")),m.mute(n.get("mute")),m.on("all",g,this)},this.destroy=function(){this.off(),m&&(m.off(null,null,this),m.destroy())},this.getVideo=function(){return m},this.setFullscreen=function(a){a=!!a,a!==n.get("fullscreen")&&n.set("fullscreen",a)},this.chooseProvider=function(a){return k.choose(a).provider},this.setActiveItem=function(a){this.mediaModel.off(),this.mediaModel=new l,this.set("mediaModel",this.mediaModel);var b=a&&a.sources&&a.sources[0];if(void 0!==b){var c=this.chooseProvider(b);if(!c)throw new Error("No suitable provider found");o instanceof c||n.changeVideoProvider(c),o.init&&o.init(a),this.trigger("itemReady",a)}},this.getProviders=function(){return k},this.resetProvider=function(){o=null},this.setVolume=function(a){a=Math.round(a),n.set("volume",a),m&&m.volume(a);var b=0===a;b!==n.get("mute")&&n.setMute(b)},this.setMute=function(b){if(a.exists(b)||(b=!n.get("mute")),n.set("mute",b),m&&m.mute(b),!b){var c=Math.max(10,n.get("volume"));this.setVolume(c)}},this.loadVideo=function(a){if(this.mediaModel.set("playAttempt",!0),this.mediaController.trigger(h.JWPLAYER_MEDIA_PLAY_ATTEMPT,{playReason:this.get("playReason")}),!a){var b=this.get("item");a=this.get("playlist")[b]}this.set("position",a.starttime||0),this.set("duration",a.duration||0),m.load(a)},this.stopVideo=function(){m&&m.stop()},this.playVideo=function(){m.play()},this.persistCaptionsTrack=function(){var a=this.get("captionsTrack");a?this.set("captionLabel",a.label):this.set("captionLabel","Off")},this.setVideoSubtitleTrack=function(a,b){this.set("captionsIndex",a),a&&b&&a<=b.length&&b[a-1].data&&this.set("captionsTrack",b[a-1]),m&&m.setSubtitlesTrack&&m.setSubtitlesTrack(a)},this.persistVideoSubtitleTrack=function(a){this.setVideoSubtitleTrack(a),this.persistCaptionsTrack()}},l=k.MediaModel=function(){this.set("state",i.IDLE)};return e.extend(k.prototype,g),e.extend(l.prototype,g),k}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(79)],e=function(a){return a.prototype.providerSupports=function(a,b){return a.supports(b,this.config.edition)},a}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(80),c(84),c(45)],e=function(a,b,c){function d(b){this.providers=a.slice(),this.config=b||{},"flash"===this.config.primary&&f(this.providers,"html5","flash")}function e(a,b){for(var c=0;c<a.length;c++)if(a[c].name===b)return c;return-1}function f(a,b,c){var d=e(a,b),f=e(a,c),g=a[d];a[d]=a[f],a[f]=g}return c.extend(d.prototype,{providerSupports:function(a,b){return a.supports(b)},choose:function(a){a=c.isObject(a)?a:{};for(var d=this.providers.length,e=0;d>e;e++){var f=this.providers[e];if(this.providerSupports(f,a)){var g=d-e-1;return{priority:g,name:f.name,type:a.type,provider:b[f.name]}}}return null}}),d}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(81),c(45),c(82)],e=function(a,b,c,d){function e(c,d){var e=b(d);if(!e("dash"))return!1;if(c.drm&&!e("drm"))return!1;if(!window.MediaSource)return!1;if(!a.isChrome()&&!a.isIETrident(11))return!1;var f=c.file||"";return"dash"===c.type||"mpd"===c.type||f.indexOf(".mpd")>-1||f.indexOf("mpd-time-csf")>-1}var f=c.find(d,c.matches({name:"flash"})),g=f.supports;return f.supports=function(c,d){if(!a.isFlashSupported())return!1;var e=c&&c.type;if("hls"===e||"m3u8"===e){var f=b(d);return f("hls")}return g.apply(this,arguments)},d.push({name:"dashjs",supports:c.constant(!1)}),d.push({name:"shaka",supports:e}),d}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45)],e=function(a){var b="free",c="premium",d="enterprise",e="ads",f="unlimited",g="trial",h={setup:[b,c,d,e,f,g],dash:[c,d,e,f,g],drm:[d,e,f,g],hls:[c,e,d,f,g],ads:[e,f,g],casting:[c,d,e,f,g],jwpsrv:[b,c,d,e,g]},i=function(b){return function(c){return a.contains(h[c],b)}};return i}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(45),c(83)],e=function(a,b,c){function d(b){if("hls"===b.type)if(b.androidhls!==!1){var c=a.isAndroidNative;if(c(2)||c(3)||c("4.0"))return!1;if(a.isAndroid())return!0}else if(a.isAndroid())return!1;return null}var e=[{name:"youtube",supports:function(b){return a.isYouTube(b.file,b.type)}},{name:"html5",supports:function(b){var e={aac:"audio/mp4",mp4:"video/mp4",f4v:"video/mp4",m4v:"video/mp4",mov:"video/mp4",mp3:"audio/mpeg",mpeg:"audio/mpeg",ogv:"video/ogg",ogg:"video/ogg",oga:"video/ogg",vorbis:"video/ogg",webm:"video/webm",f4a:"video/aac",m3u8:"application/vnd.apple.mpegurl",m3u:"application/vnd.apple.mpegurl",hls:"application/vnd.apple.mpegurl"},f=b.file,g=b.type,h=d(b);if(null!==h)return h;if(a.isRtmp(f,g))return!1;if(!e[g])return!1;if(c.canPlayType){var i=c.canPlayType(e[g]);return!!i}return!1}},{name:"flash",supports:function(c){var d={flv:"video",f4v:"video",mov:"video",m4a:"video",m4v:"video",mp4:"video",aac:"video",f4a:"video",mp3:"sound",mpeg:"sound",smil:"rtmp"},e=b.keys(d);if(!a.isFlashSupported())return!1;var f=c.file,g=c.type;return a.isRtmp(f,g)?!0:b.contains(e,g)}}];return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){return document.createElement("video")}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(85),c(87)],e=function(a,b){var c={html5:a,flash:b};return c}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(55),c(48),c(45),c(46),c(62),c(86),c(47)],e=function(a,b,c,d,e,f,g){function h(a,c){b.foreach(a,function(a,b){c.addEventListener(a,b,!1)})}function i(a,c){b.foreach(a,function(a,b){c.removeEventListener(a,b,!1)})}function j(a,b,c){"addEventListener"in a?a.addEventListener(b,c):a["on"+b]=c}function k(a,b,c){a&&("removeEventListener"in a?a.removeEventListener(b,c):a["on"+b]=null)}function l(a){if("hls"===a.type)if(a.androidhls!==!1){var c=b.isAndroidNative;if(c(2)||c(3)||c("4.0"))return!1;if(b.isAndroid())return!0}else if(b.isAndroid())return!1;return null}function m(m,y){function z(){na(Ua.audioTracks),ra(Ua.textTracks)}function A(a){Ca.trigger("click",a)}function B(){Ia&&!Ka&&(I(H()),F(da(),za,ya))}function C(){Ia&&F(da(),za,ya)}function D(){n(Ga),Ea=!0,Ia&&(Ca.state===e.STALLED?Ca.setState(e.PLAYING):Ca.state===e.PLAYING&&(Ga=setTimeout(ca,o)),Ka&&Ua.duration===1/0&&0===Ua.currentTime||(I(H()),G(Ua.currentTime),F(da(),za,ya),Ca.state===e.PLAYING&&(Ca.trigger(d.JWPLAYER_MEDIA_TIME,{position:za,duration:ya}),E())))}function E(){var a=Sa.level;if(a.width!==Ua.videoWidth||a.height!==Ua.videoHeight){if(a.width=Ua.videoWidth,a.height=Ua.videoHeight,ua(),!a.width||!a.height)return;Sa.reason=Sa.reason||"auto",Sa.mode="hls"===Ba[Ja].type?"auto":"manual",Sa.bitrate=0,a.index=Ja,a.label=Ba[Ja].label,Ca.trigger("visualQuality",Sa),
Sa.reason=""}}function F(a,b,c){a===Ha&&c===ya||(Ha=a,Ca.trigger(d.JWPLAYER_MEDIA_BUFFER,{bufferPercent:100*a,position:b,duration:c}))}function G(a){0>ya&&(a=-(_()-a)),za=a}function H(){var a=Ua.duration,b=_();if(a===1/0&&b){var c=b-Ua.seekable.start(0);c!==1/0&&c>120&&(a=-c)}return a}function I(a){ya=a,Fa&&a&&a!==1/0&&Ca.seek(Fa)}function J(){var a=H();Ka&&a===1/0&&(a=0),Ca.trigger(d.JWPLAYER_MEDIA_META,{duration:a,height:Ua.videoHeight,width:Ua.videoWidth}),I(a)}function K(){Ia&&(Ea=!0,M())}function L(){Ia&&(Ua.muted&&(Ua.muted=!1,Ua.muted=!0),ua(),J())}function M(){Aa||(Aa=!0,Ca.trigger(d.JWPLAYER_MEDIA_BUFFER_FULL))}function N(){Ca.setState(e.PLAYING),Ua.hasAttribute("hasplayed")||Ua.setAttribute("hasplayed",""),Ca.trigger(d.JWPLAYER_PROVIDER_FIRST_FRAME,{})}function O(){Ca.state!==e.COMPLETE&&Ua.currentTime!==Ua.duration&&Ca.setState(e.PAUSED)}function P(){Ka||Ua.paused||Ua.ended||Ca.state!==e.LOADING&&Ca.state!==e.ERROR&&(Ca.seeking||Ca.setState(e.STALLED))}function Q(){Ia&&(b.log("Error playing media: %o %s",Ua.error,Ua.src||xa.file),Ca.trigger(d.JWPLAYER_MEDIA_ERROR,{message:"Error loading media: File could not be played"}))}function R(a){var d;return"array"===b.typeOf(a)&&a.length>0&&(d=c.map(a,function(a,b){return{label:a.label||b}})),d}function S(a){Ba=a,Ja=T(a);var b=R(a);b&&Ca.trigger(d.JWPLAYER_MEDIA_LEVELS,{levels:b,currentQuality:Ja})}function T(a){var b=Math.max(0,Ja),c=y.qualityLabel;if(a)for(var d=0;d<a.length;d++)if(a[d]["default"]&&(b=d),c&&a[d].label===c)return d;return Sa.reason="initial choice",Sa.level={width:0,height:0},b}function U(){return r||s}function V(a,c,d){xa=Ba[Ja],Fa=0,n(Ga);var f=document.createElement("source");f.src=xa.file;var g=Ua.src!==f.src;g||U()?(ya=c,W(d),Ua.load()):(0===a&&0!==Ua.currentTime&&(Fa=-1,Ca.seek(a)),Ua.play()),za=Ua.currentTime,r&&(M(),Ua.paused||Ca.state===e.PLAYING||Ca.setState(e.LOADING)),b.isIOS()&&Ca.getFullScreen()&&(Ua.controls=!0),a>0&&Ca.seek(a)}function W(a){if(Na=null,Oa=null,Qa=-1,Pa=-1,Ra=-1,Sa.reason||(Sa.reason="initial choice",Sa.level={width:0,height:0}),Ea=!1,Aa=!1,Ka=l(xa),Ua.src=xa.file,xa.preload&&Ua.setAttribute("preload",xa.preload),a&&a.tracks){var c=b.isIOS()&&!b.isSDK(y);c&&Y(a.tracks)}}function X(){Ua&&(Ua.removeAttribute("src"),!q&&Ua.load&&Ua.load())}function Y(a){for(;Ua.firstChild;)Ua.removeChild(Ua.firstChild);Z(a)}function Z(a){if(a){Ua.setAttribute("crossorigin","anonymous");for(var b=0;b<a.length;b++)if(-1!==a[b].file.indexOf(".vtt")&&/subtitles|captions|descriptions|chapters|metadata/.test(a[b].kind)){var c=document.createElement("track");c.src=a[b].file,c.kind=a[b].kind,c.srclang=a[b].language||"",c.label=a[b].label,c.mode="disabled",Ua.appendChild(c)}}}function $(){for(var a=Ua.seekable?Ua.seekable.length:0,b=1/0;a--;)b=Math.min(b,Ua.seekable.start(a));return b}function _(){for(var a=Ua.seekable?Ua.seekable.length:0,b=0;a--;)b=Math.max(b,Ua.seekable.end(a));return b}function aa(){Ca.seeking=!1,Ca.trigger(d.JWPLAYER_MEDIA_SEEKED)}function ba(){Ca.trigger("volume",{volume:Math.round(100*Ua.volume)}),Ca.trigger("mute",{mute:Ua.muted})}function ca(){Ua.currentTime===za&&P()}function da(){var a=Ua.buffered,c=Ua.duration;return!a||0===a.length||0>=c||c===1/0?0:b.between(a.end(a.length-1)/c,0,1)}function ea(){if(Ia&&Ca.state!==e.IDLE&&Ca.state!==e.COMPLETE){if(n(Ga),Ja=-1,La=!0,Ca.trigger(d.JWPLAYER_MEDIA_BEFORECOMPLETE),!Ia)return;fa()}}function fa(){n(Ga),Ca.setState(e.COMPLETE),La=!1,Ca.trigger(d.JWPLAYER_MEDIA_COMPLETE)}function ga(a){Ma=!0,ma(a),b.isIOS()&&(Ua.controls=!1)}function ha(){var a=-1,b=0;if(Na)for(b;b<Na.length;b++)if("showing"===Na[b].mode){a=b;break}sa(a+1)}function ia(){for(var a=-1,b=0;b<Ua.audioTracks.length;b++)if(Ua.audioTracks[b].enabled){a=b;break}oa(a)}function ja(a){ka(a.currentTarget.activeCues)}function ka(a){if(a&&a.length&&Ra!==a[0].startTime){var b={TIT2:"title",TT2:"title",WXXX:"url",TPE1:"artist",TP1:"artist",TALB:"album",TAL:"album"},d=function(a,b){var c,d,e,f,g,h;for(c="",e=a.length,d=b||0;e>d;)switch(f=a[d++],f>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:c+=String.fromCharCode(f);break;case 12:case 13:g=a[d++],c+=String.fromCharCode((31&f)<<6|63&g);break;case 14:g=a[d++],h=a[d++],c+=String.fromCharCode((15&f)<<12|(63&g)<<6|(63&h)<<0)}return c},e=function(a,b){var c,d,e;for(c="",e=a.length,d=b||0;e>d;)254===a[d]&&255===a[d+1]||(c+=String.fromCharCode((a[d]<<8)+a[d+1])),d+=2;return c},f=c.reduce(a,function(a,f){if(!("value"in f)&&"data"in f&&f.data instanceof ArrayBuffer){var g=f,h=new Uint8Array(g.data);f={value:{key:"",data:""}};for(var i=10;14>i&&i<h.length&&0!==h[i];)f.value.key+=String.fromCharCode(h[i]),i++;var j=h[20];1===j||2===j?f.value.data=e(h,21):f.value.data=d(h,21)}if(b.hasOwnProperty(f.value.key)&&(a[b[f.value.key]]=f.value.data),f.value.info){var k=a[f.value.key];c.isObject(k)||(k={},a[f.value.key]=k),k[f.value.info]=f.value.data}else a[f.value.key]=f.value.data;return a},{});Ra=a[0].startTime,Ca.trigger("meta",{metadataTime:Ra,metadata:f})}}function la(a){Ma=!1,ma(a),b.isIOS()&&(Ua.controls=!1)}function ma(a){Ca.trigger("fullscreenchange",{target:a.target,jwstate:Ma})}function na(a){if(Oa=null,a){if(a.length){for(var b=0;b<a.length;b++)if(a[b].enabled){Qa=b;break}-1===Qa&&(Qa=0,a[Qa].enabled=!0),Oa=c.map(a,function(a){var b={name:a.label||a.language,language:a.language};return b})}j(a,"change",ia),Oa&&Ca.trigger("audioTracks",{currentTrack:Qa,tracks:Oa})}}function oa(a){Ua&&Ua.audioTracks&&Oa&&a>-1&&a<Ua.audioTracks.length&&a!==Qa&&(Ua.audioTracks[Qa].enabled=!1,Qa=a,Ua.audioTracks[Qa].enabled=!0,Ca.trigger("audioTrackChanged",{currentTrack:Qa,tracks:Oa}))}function pa(){return Oa||[]}function qa(){return Qa}function ra(a){if(Na=null,a){if(a.length){var b=0,c=a.length;for(b;c>b;b++)"metadata"===a[b].kind?(a[b].oncuechange=ja,a[b].mode="showing"):"subtitles"!==a[b].kind&&"captions"!==a[b].kind||(a[b].mode="disabled",Na||(Na=[]),Na.push(a[b]))}j(a,"change",ha),Na&&Na.length&&Ca.trigger("subtitlesTracks",{tracks:Na})}}function sa(a){Na&&Pa!==a-1&&(Pa>-1&&Pa<Na.length?Na[Pa].mode="disabled":c.each(Na,function(a){a.mode="disabled"}),a>0&&a<=Na.length?(Pa=a-1,Na[Pa].mode="showing"):Pa=-1,Ca.trigger("subtitlesTrackChanged",{currentTrack:Pa+1,tracks:Na}))}function ta(){return Pa}function ua(){if("hls"===Ba[0].type){var a="video";0===Ua.videoWidth&&(a="audio"),Ca.trigger("mediaType",{mediaType:a})}}function va(){Na&&Na[Pa]&&(Na[Pa].mode="disabled")}this.state=e.IDLE,this.seeking=!1,c.extend(this,g),this.trigger=function(a,b){return Ia?g.trigger.call(this,a,b):void 0},this.setState=function(a){return Ia?f.setState.call(this,a):void 0};var wa,xa,ya,za,Aa,Ba,Ca=this,Da={click:A,durationchange:B,ended:ea,error:Q,loadeddata:z,loadedmetadata:L,canplay:K,playing:N,progress:C,pause:O,seeked:aa,timeupdate:D,volumechange:ba,webkitbeginfullscreen:ga,webkitendfullscreen:la},Ea=!1,Fa=0,Ga=-1,Ha=-1,Ia=!0,Ja=-1,Ka=null,La=!1,Ma=!1,Na=null,Oa=null,Pa=-1,Qa=-1,Ra=-1,Sa={level:{}},Ta=document.getElementById(m),Ua=Ta?Ta.querySelector("video"):void 0;Ua=Ua||document.createElement("video"),Ua.className="jw-video jw-reset",h(Da,Ua),v||(Ua.controls=!0,Ua.controls=!1),Ua.setAttribute("x-webkit-airplay","allow"),Ua.setAttribute("webkit-playsinline",""),this.stop=function(){n(Ga),Ia&&(X(),b.isIETrident()&&Ua.pause(),Ja=-1,this.setState(e.IDLE))},this.destroy=function(){i(Da,Ua),k(Ua.audioTracks,"change",ia),k(Ua.textTracks,"change",ha),this.remove(),this.off()},this.init=function(a){Ia&&(Ba=a.sources,Ja=T(a.sources),a.sources.length&&"hls"!==a.sources[0].type&&this.sendMediaType(a.sources),xa=Ba[Ja],za=a.starttime||0,ya=a.duration||0,Sa.reason="",W(a))},this.load=function(a){Ia&&(S(a.sources),a.sources.length&&"hls"!==a.sources[0].type&&this.sendMediaType(a.sources),r&&!Ua.hasAttribute("hasplayed")||Ca.setState(e.LOADING),V(a.starttime||0,a.duration||0,a))},this.play=function(){return Ca.seeking?(Ca.setState(e.LOADING),void Ca.once(d.JWPLAYER_MEDIA_SEEKED,Ca.play)):void Ua.play()},this.pause=function(){n(Ga),Ua.pause(),this.setState(e.PAUSED)},this.seek=function(a){if(Ia)if(0>a&&(a+=$()+_()),0===Fa&&this.trigger(d.JWPLAYER_MEDIA_SEEK,{position:Ua.currentTime,offset:a}),Ea||(Ea=!!_()),Ea){Fa=0;try{Ca.seeking=!0,Ua.currentTime=a}catch(b){Ca.seeking=!1,Fa=a}}else Fa=a,t&&Ua.paused&&Ua.play()},this.volume=function(a){a=b.between(a/100,0,1),Ua.volume=a},this.mute=function(a){Ua.muted=!!a},this.checkComplete=function(){return La},this.detachMedia=function(){return n(Ga),va(),Ia=!1,Ua},this.attachMedia=function(){Ia=!0,Ea=!1,this.seeking=!1,Ua.loop=!1,La&&fa()},this.setContainer=function(a){wa=a,a.appendChild(Ua)},this.getContainer=function(){return wa},this.remove=function(){X(),n(Ga),Ja=-1,wa===Ua.parentNode&&wa.removeChild(Ua)},this.setVisibility=function(b){b=!!b,b||u?a.style(wa,{visibility:"visible",opacity:1}):a.style(wa,{visibility:"",opacity:0})},this.resize=function(b,c,d){if(!(b&&c&&Ua.videoWidth&&Ua.videoHeight))return!1;var e={objectFit:""};if("uniform"===d){var f=b/c,g=Ua.videoWidth/Ua.videoHeight;Math.abs(f-g)<.09&&(e.objectFit="fill",d="exactfit")}var h=p||u||v||w;if(h){var i=-Math.floor(Ua.videoWidth/2+1),j=-Math.floor(Ua.videoHeight/2+1),k=Math.ceil(100*b/Ua.videoWidth)/100,l=Math.ceil(100*c/Ua.videoHeight)/100;"none"===d?k=l=1:"fill"===d?k=l=Math.max(k,l):"uniform"===d&&(k=l=Math.min(k,l)),e.width=Ua.videoWidth,e.height=Ua.videoHeight,e.top=e.left="50%",e.margin=0,a.transform(Ua,"translate("+i+"px, "+j+"px) scale("+k.toFixed(2)+", "+l.toFixed(2)+")")}return a.style(Ua,e),!1},this.setFullscreen=function(a){if(a=!!a){var c=b.tryCatch(function(){var a=Ua.webkitEnterFullscreen||Ua.webkitEnterFullScreen;a&&a.apply(Ua)});return c instanceof b.Error?!1:Ca.getFullScreen()}var d=Ua.webkitExitFullscreen||Ua.webkitExitFullScreen;return d&&d.apply(Ua),a},Ca.getFullScreen=function(){return Ma||!!Ua.webkitDisplayingFullscreen},this.setCurrentQuality=function(a){if(Ja!==a&&(a=parseInt(a,10),a>=0&&Ba&&Ba.length>a)){Ja=a,Sa.reason="api",Sa.level={width:0,height:0},this.trigger(d.JWPLAYER_MEDIA_LEVEL_CHANGED,{currentQuality:a,levels:R(Ba)}),y.qualityLabel=Ba[a].label;var b=Ua.currentTime||0,c=Ua.duration||0;0>=c&&(c=ya),Ca.setState(e.LOADING),V(b,c)}},this.getCurrentQuality=function(){return Ja},this.getQualityLevels=function(){return R(Ba)},this.getName=function(){return{name:x}},this.setCurrentAudioTrack=oa,this.getAudioTracks=pa,this.getCurrentAudioTrack=qa,this.setSubtitlesTrack=sa,this.getSubtitlesTrack=ta}var n=window.clearTimeout,o=256,p=b.isIE(),q=b.isMSIE(),r=b.isMobile(),s=b.isSafari(),t=b.isFF(),u=b.isAndroidNative(),v=b.isIOS(7),w=b.isIOS(8),x="html5",y=function(){};return y.prototype=f,m.prototype=new y,m}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(46),c(62),c(45)],e=function(a,b,c,d){var e=a.noop,f=d.constant(!1),g={supports:f,play:e,load:e,stop:e,volume:e,mute:e,seek:e,resize:e,remove:e,destroy:e,setVisibility:e,setFullscreen:f,getFullscreen:e,getContainer:e,setContainer:f,getName:e,getQualityLevels:e,getCurrentQuality:e,setCurrentQuality:e,getAudioTracks:e,getCurrentAudioTrack:e,setCurrentAudioTrack:e,checkComplete:e,setControls:e,attachMedia:e,detachMedia:e,setState:function(a){var d=this.state||c.IDLE;this.state=a,a!==d&&this.trigger(b.JWPLAYER_PLAYER_STATE,{newstate:a})},sendMediaType:function(a){var c=a[0].type,d="oga"===c||"aac"===c||"mp3"===c||"mpeg"===c||"vorbis"===c;this.trigger(b.JWPLAYER_MEDIA_TYPE,{mediaType:d?"audio":"video"})}};return g}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(45),c(46),c(62),c(88),c(86),c(47)],e=function(a,b,c,d,e,f,g){function h(a){return a+"_swf_"+k++}function i(b){var c=document.createElement("a");c.href=b.flashplayer;var d=c.hostname===window.location.host;return a.isChrome()&&!d}function j(j,k){function l(a){if(G)for(var b=0;b<a.length;b++){var c=a[b];if(c.bitrate){var d=Math.round(c.bitrate/1e3);c.label=m(d)}}}function m(a){var b=G[a];if(!b){for(var c=1/0,d=G.bitrates.length;d--;){var e=Math.abs(G.bitrates[d]-a);if(e>c)break;c=e}b=G.labels[G.bitrates[d+1]],G[a]=b}return b}function n(){var a=k.hlslabels;if(!a)return null;var b={},c=[];for(var d in a){var e=parseFloat(d);if(!isNaN(e)){var f=Math.round(e);b[f]=a[d],c.push(f)}}return 0===c.length?null:(c.sort(function(a,b){return a-b}),{labels:b,bitrates:c})}function o(){v=setTimeout(function(){g.trigger.call(D,"flashBlocked")},4e3),s.once("embedded",function(){q(),g.trigger.call(D,"flashUnblocked")},D)}function p(){q(),o()}function q(){clearTimeout(v),window.removeEventListener("focus",p)}var r,s,t,u=null,v=-1,w=!1,x=-1,y=null,z=-1,A=null,B=!0,C=!1,D=this,E=function(){return s&&s.__ready},F=function(){s&&s.triggerFlash.apply(s,arguments)},G=n();b.extend(this,g,{init:function(a){a.preload&&"none"!==a.preload&&!k.autostart&&(u=a)},load:function(a){u=a,w=!1,this.setState(d.LOADING),F("load",a),a.sources.length&&"hls"!==a.sources[0].type&&this.sendMediaType(a.sources)},play:function(){F("play")},pause:function(){F("pause"),this.setState(d.PAUSED)},stop:function(){F("stop"),x=-1,u=null,this.setState(d.IDLE)},seek:function(a){F("seek",a)},volume:function(a){if(b.isNumber(a)){var c=Math.min(Math.max(0,a),100);E()&&F("volume",c)}},mute:function(a){E()&&F("mute",a)},setState:function(){return f.setState.apply(this,arguments)},checkComplete:function(){return w},attachMedia:function(){B=!0,w&&(this.setState(d.COMPLETE),this.trigger(c.JWPLAYER_MEDIA_COMPLETE),w=!1)},detachMedia:function(){return B=!1,null},getSwfObject:function(a){var b=a.getElementsByTagName("object")[0];return b?(b.off(null,null,this),b):e.embed(k.flashplayer,a,h(j),k.wmode)},getContainer:function(){return r},setContainer:function(e){if(r!==e){r=e,s=this.getSwfObject(e),document.hasFocus()?o():window.addEventListener("focus",p),s.once("ready",function(){q(),s.once("pluginsLoaded",function(){s.queueCommands=!1,F("setupCommandQueue",s.__commandQueue),s.__commandQueue=[]});var a=b.extend({},k),d=s.triggerFlash("setup",a);d===s?s.__ready=!0:this.trigger(c.JWPLAYER_MEDIA_ERROR,d),u&&F("init",u)},this);var f=[c.JWPLAYER_MEDIA_META,c.JWPLAYER_MEDIA_ERROR,c.JWPLAYER_MEDIA_SEEK,c.JWPLAYER_MEDIA_SEEKED,"subtitlesTracks","subtitlesTrackChanged","subtitlesTrackData","mediaType"],h=[c.JWPLAYER_MEDIA_BUFFER,c.JWPLAYER_MEDIA_TIME],j=[c.JWPLAYER_MEDIA_BUFFER_FULL];s.on(c.JWPLAYER_MEDIA_LEVELS,function(a){l(a.levels),x=a.currentQuality,y=a.levels,this.trigger(a.type,a)},this),s.on(c.JWPLAYER_MEDIA_LEVEL_CHANGED,function(a){l(a.levels),x=a.currentQuality,y=a.levels,this.trigger(a.type,a)},this),s.on(c.JWPLAYER_AUDIO_TRACKS,function(a){z=a.currentTrack,A=a.tracks,this.trigger(a.type,a)},this),s.on(c.JWPLAYER_AUDIO_TRACK_CHANGED,function(a){z=a.currentTrack,A=a.tracks,this.trigger(a.type,a)},this),s.on(c.JWPLAYER_PLAYER_STATE,function(a){var b=a.newstate;b!==d.IDLE&&this.setState(b)},this),s.on(h.join(" "),function(a){"Infinity"===a.duration&&(a.duration=1/0),this.trigger(a.type,a)},this),s.on(f.join(" "),function(a){this.trigger(a.type,a)},this),s.on(j.join(" "),function(a){this.trigger(a.type)},this),s.on(c.JWPLAYER_MEDIA_BEFORECOMPLETE,function(a){w=!0,this.trigger(a.type),B===!0&&(w=!1)},this),s.on(c.JWPLAYER_MEDIA_COMPLETE,function(a){w||(this.setState(d.COMPLETE),this.trigger(a.type))},this),s.on("visualQuality",function(a){a.reason=a.reason||"api",this.trigger("visualQuality",a),this.trigger(c.JWPLAYER_PROVIDER_FIRST_FRAME,{})},this),s.on(c.JWPLAYER_PROVIDER_CHANGED,function(a){t=a.message,this.trigger(c.JWPLAYER_PROVIDER_CHANGED,a)},this),s.on(c.JWPLAYER_ERROR,function(b){a.log("Error playing media: %o %s",b.code,b.message,b),this.trigger(c.JWPLAYER_MEDIA_ERROR,b)},this),i(k)&&s.on("throttle",function(a){q(),"resume"===a.state?g.trigger.call(D,"flashThrottle",a):v=setTimeout(function(){g.trigger.call(D,"flashThrottle",a)},250)},this)}},remove:function(){x=-1,y=null,e.remove(s)},setVisibility:function(a){a=!!a,r.style.opacity=a?1:0},resize:function(a,b,c){c&&F("stretch",c)},setControls:function(a){F("setControls",a)},setFullscreen:function(a){C=a,F("fullscreen",a)},getFullScreen:function(){return C},setCurrentQuality:function(a){F("setCurrentQuality",a)},getCurrentQuality:function(){return x},setSubtitlesTrack:function(a){F("setSubtitlesTrack",a)},getName:function(){return t?{name:"flash_"+t}:{name:"flash"}},getQualityLevels:function(){return y||u.sources},getAudioTracks:function(){return A},getCurrentAudioTrack:function(){return z},setCurrentAudioTrack:function(a){F("setCurrentAudioTrack",a)},destroy:function(){q(),this.remove(),s&&(s.off(),s=null),r=null,u=null,this.off()}}),this.trigger=function(a,b){return B?g.trigger.call(this,a,b):void 0}}var k=0,l=function(){};return l.prototype=f,j.prototype=new l,j}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(47),c(45)],e=function(a,b,c){function d(a,b,c){var d=document.createElement("param");d.setAttribute("name",b),d.setAttribute("value",c),a.appendChild(d)}function e(e,f,i,j){var k;if(j=j||"opaque",a.isMSIE()){var l=document.createElement("div");f.appendChild(l),l.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" id="'+i+'" name="'+i+'" tabindex="0"><param name="movie" value="'+e+'"><param name="allowfullscreen" value="true"><param name="allowscriptaccess" value="always"><param name="wmode" value="'+j+'"><param name="bgcolor" value="'+h+'"><param name="menu" value="false"></object>';for(var m=f.getElementsByTagName("object"),n=m.length;n--;)m[n].id===i&&(k=m[n])}else k=document.createElement("object"),k.setAttribute("type","application/x-shockwave-flash"),k.setAttribute("data",e),k.setAttribute("width","100%"),k.setAttribute("height","100%"),k.setAttribute("bgcolor",h),k.setAttribute("id",i),k.setAttribute("name",i),d(k,"allowfullscreen","true"),d(k,"allowscriptaccess","always"),d(k,"wmode",j),d(k,"menu","false"),f.appendChild(k,f);return k.className="jw-swf jw-reset",k.style.display="block",k.style.position="absolute",k.style.left=0,k.style.right=0,k.style.top=0,k.style.bottom=0,c.extend(k,b),k.queueCommands=!0,k.triggerFlash=function(b){var d=this;if("setup"!==b&&d.queueCommands||!d.__externalCall){for(var e=d.__commandQueue,f=e.length;f--;)e[f][0]===b&&e.splice(f,1);return e.push(Array.prototype.slice.call(arguments)),d}var h=Array.prototype.slice.call(arguments,1),i=a.tryCatch(function(){if(h.length){for(var a=h.length;a--;)"object"==typeof h[a]&&c.each(h[a],g);var e=JSON.stringify(h);d.__externalCall(b,e)}else d.__externalCall(b)});return i instanceof a.Error&&(console.error(b,i),"setup"===b)?(i.name="Failed to setup flash",i):d},k.__commandQueue=[],k}function f(a){a&&a.parentNode&&(a.style.display="none",a.parentNode.removeChild(a))}function g(a,b,c){a instanceof window.HTMLElement&&delete c[b]}var h="#000000";return{embed:e,remove:f}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(48)],e=function(a,b){function c(a){return"jwplayer."+a}function d(){return a.reduce(this.persistItems,function(a,d){var e=j[c(d)];return e&&(a[d]=b.serialize(e)),a},{})}function e(a,b){try{j[c(a)]=b}catch(d){i&&i.debug&&console.error(d)}}function f(){a.each(this.persistItems,function(a){j.removeItem(c(a))})}function g(){}function h(b,c){this.persistItems=b,a.each(this.persistItems,function(a){c.on("change:"+a,function(b,c){e(a,c)})})}var i=window.jwplayer,j={removeItem:b.noop};try{j=window.localStorage}catch(k){}return a.extend(g.prototype,{getAllItems:d,track:h,clear:f}),g}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(61),c(46),c(45)],e=function(a,b,c){function d(a){a.mediaController.off(b.JWPLAYER_MEDIA_PLAY_ATTEMPT,a._onPlayAttempt),a.mediaController.off(b.JWPLAYER_PROVIDER_FIRST_FRAME,a._triggerFirstFrame),a.mediaController.off(b.JWPLAYER_MEDIA_TIME,a._onTime)}function e(a){d(a),a._triggerFirstFrame=c.once(function(){var c=a._qoeItem;c.tick(b.JWPLAYER_MEDIA_FIRST_FRAME);var e=c.between(b.JWPLAYER_MEDIA_PLAY_ATTEMPT,b.JWPLAYER_MEDIA_FIRST_FRAME);a.mediaController.trigger(b.JWPLAYER_MEDIA_FIRST_FRAME,{loadTime:e}),d(a)}),a._onTime=g(a._triggerFirstFrame),a._onPlayAttempt=function(){a._qoeItem.tick(b.JWPLAYER_MEDIA_PLAY_ATTEMPT)},a.mediaController.on(b.JWPLAYER_MEDIA_PLAY_ATTEMPT,a._onPlayAttempt),a.mediaController.once(b.JWPLAYER_PROVIDER_FIRST_FRAME,a._triggerFirstFrame),a.mediaController.on(b.JWPLAYER_MEDIA_TIME,a._onTime)}function f(c){function d(c,d,f){c._qoeItem&&f&&c._qoeItem.end(f.get("state")),c._qoeItem=new a,c._qoeItem.tick(b.JWPLAYER_PLAYLIST_ITEM),c._qoeItem.start(d.get("state")),e(c),d.on("change:state",function(a,b,d){c._qoeItem.end(d),c._qoeItem.start(b)})}c.on("change:mediaModel",d)}var g=function(a){var b=Number.MIN_VALUE;return function(c){c.position>b&&a(),b=c.position}};return{model:f}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(47)],e=function(a,b){var c=a.extend({get:function(a){return this.attributes=this.attributes||{},this.attributes[a]},set:function(a,b){if(this.attributes=this.attributes||{},this.attributes[a]!==b){var c=this.attributes[a];this.attributes[a]=b,this.trigger("change:"+a,this,b,c)}},clone:function(){return a.clone(this.attributes)}},b);return c}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(47),c(77),c(76),c(46),c(62),c(48),c(45)],e=function(a,b,c,d,e,f,g){var h=function(a,d){this.model=d,this._adModel=(new b).setup({id:d.get("id"),volume:d.get("volume"),fullscreen:d.get("fullscreen"),mute:d.get("mute")}),this._adModel.on("change:state",c,this);var e=a.getContainer();this.swf=e.querySelector("object")};return h.prototype=g.extend({init:function(){if(f.isChrome()){var a=-1,b=!1;this.swf.on("throttle",function(c){if(clearTimeout(a),"resume"===c.state)b&&(b=!1,this.instreamPlay());else{var d=this;a=setTimeout(function(){d._adModel.get("state")===e.PLAYING&&(b=!0,d.instreamPause())},250)}},this)}this.swf.on("instream:state",function(a){switch(a.newstate){case e.PLAYING:this._adModel.set("state",a.newstate);break;case e.PAUSED:this._adModel.set("state",a.newstate)}},this).on("instream:time",function(a){this._adModel.set("position",a.position),this._adModel.set("duration",a.duration),this.trigger(d.JWPLAYER_MEDIA_TIME,a)},this).on("instream:complete",function(a){this.trigger(d.JWPLAYER_MEDIA_COMPLETE,a)},this).on("instream:error",function(a){this.trigger(d.JWPLAYER_MEDIA_ERROR,a)},this),this.swf.triggerFlash("instream:init"),this.applyProviderListeners=function(a){this.model.on("change:volume",function(b,c){a.volume(c)},this),this.model.on("change:mute",function(b,c){a.mute(c)},this)}},instreamDestroy:function(){this._adModel&&(this.off(),this.swf.off(null,null,this),this.swf.triggerFlash("instream:destroy"),this.swf=null,this._adModel.off(),this._adModel=null,this.model=null)},load:function(a){this.swf.triggerFlash("instream:load",a)},instreamPlay:function(){this.swf.triggerFlash("instream:play")},instreamPause:function(){this.swf.triggerFlash("instream:pause")}},a),h}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(94),c(47),c(45),c(46)],e=function(a,b,c,d){var e=function(b,e,f,g){function h(){m("Setup Timeout Error","Setup took longer than "+q+" seconds to complete.")}function i(){c.each(p,function(a){a.complete!==!0&&a.running!==!0&&null!==b&&k(a.depends)&&(a.running=!0,j(a))})}function j(a){var c=function(b){b=b||{},l(a,b)};a.method(c,e,b,f,g)}function k(a){return c.all(a,function(a){return p[a].complete})}function l(a,b){"error"===b.type?m(b.msg,b.reason):"complete"===b.type?(clearTimeout(n),o.trigger(d.JWPLAYER_READY)):(a.complete=!0,i())}function m(a,b){clearTimeout(n),o.trigger(d.JWPLAYER_SETUP_ERROR,{message:a+": "+b}),o.destroy()}var n,o=this,p=a.getQueue(),q=30;this.start=function(){n=setTimeout(h,1e3*q),i()},this.destroy=function(){clearTimeout(n),this.off(),p.length=0,b=null,e=null,f=null}};return e.prototype=b,e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(95),c(81),c(80),c(45),c(48),c(57),c(97)],e=function(a,b,d,e,f,g,h){function i(a,b,c){if(b){var d=b.client;delete b.client,/\.(js|swf)$/.test(d||"")||(d=g.repo()+c),a[d]=b}}function j(a,c){var d=e.clone(c.get("plugins"))||{},f=c.get("edition"),h=b(f),j=/^(vast|googima)$/,k=/\.(js|swf)$/,l=g.repo(),m=c.get("advertising");if(h("ads")&&m&&(k.test(m.client)?d[m.client]=m:j.test(m.client)&&(d[l+m.client+".js"]=m),delete m.client),h("jwpsrv")){var n=c.get("analytics");e.isObject(n)||(n={}),i(d,n,"jwpsrv.js")}i(d,c.get("ga"),"gapro.js"),i(d,c.get("sharing"),"sharing.js"),i(d,c.get("related"),"related.js"),c.set("plugins",d),a()}function k(b,d){var e=d.get("key")||window.jwplayer&&window.jwplayer.key,i=new a(e),j=i.edition();if(d.set("key",e),d.set("edition",j),"unlimited"===j){var k=f.getScriptPath("jwplayer.js");if(!k)return void h.error(b,"Error setting up player","Could not locate jwplayer.js script tag");c.p=k,f.repo=g.repo=g.loadFrom=function(){return k}}d.updateProviders(),"invalid"===j?h.error(b,"Error setting up player",(void 0===e?"Missing":"Invalid")+" license key"):b()}function l(a,b,d){"dashjs"===a?c.e(4,function(a){var e=c(107);e.register(window.jwplayer),d.updateProviders(),b()}):c.e(5,function(a){var e=c(109);e.register(window.jwplayer),d.updateProviders(),b()})}function m(a,b){var c=b.get("playlist"),f=b.get("edition"),g=b.get("dash");e.contains(["shaka","dashjs"],g)||(g="shaka");var h=e.where(d,{name:g})[0].supports,i=e.some(c,function(a){return h(a,f)});i?l(g,a,b):a()}function n(){var a=h.getQueue();return a.LOAD_DASH={method:m,depends:["CHECK_KEY","FILTER_PLAYLIST"]},a.CHECK_KEY={method:k,depends:["LOADED_POLYFILLS"]},a.FILTER_PLUGINS={method:j,depends:["CHECK_KEY"]},a.FILTER_PLAYLIST.depends.push("CHECK_KEY"),a.LOAD_PLUGINS.depends.push("FILTER_PLUGINS"),a.SETUP_VIEW.depends.push("CHECK_KEY"),a.SEND_READY.depends.push("LOAD_DASH"),a}return{getQueue:n}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(96),c(81)],e=function(a,b,c){var d="invalid",e="RnXcsftYjWRDA^Uy",f=function(f){function g(f){a.exists(f)||(f="");try{f=b.decrypt(f,e);var g=f.split("/");h=g[0],"pro"===h&&(h="premium");var k=c(h);if(g.length>2&&k("setup")){i=g[1];var l=parseInt(g[2]);l>0&&(j=new Date,j.setTime(l))}else h=d}catch(m){h=d}}var h,i,j;this.edition=function(){return j&&j.getTime()<(new Date).getTime()?d:h},this.token=function(){return i},this.expiration=function(){return j},g(f)};return f}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){var a=function(a){return window.atob(a)},b=function(a){return unescape(encodeURIComponent(a))},c=function(a){try{return decodeURIComponent(escape(a))}catch(b){return a}},d=function(a){for(var b=new Array(Math.ceil(a.length/4)),c=0;c<b.length;c++)b[c]=a.charCodeAt(4*c)+(a.charCodeAt(4*c+1)<<8)+(a.charCodeAt(4*c+2)<<16)+(a.charCodeAt(4*c+3)<<24);return b},e=function(a){for(var b=new Array(a.length),c=0;c<a.length;c++)b[c]=String.fromCharCode(255&a[c],a[c]>>>8&255,a[c]>>>16&255,a[c]>>>24&255);return b.join("")};return{decrypt:function(f,g){if(f=String(f),g=String(g),0==f.length)return"";for(var h,i,j=d(a(f)),k=d(b(g).slice(0,16)),l=j.length,m=j[l-1],n=j[0],o=2654435769,p=Math.floor(6+52/l),q=p*o;0!=q;){i=q>>>2&3;for(var r=l-1;r>=0;r--)m=j[r>0?r-1:l-1],h=(m>>>5^n<<2)+(n>>>3^m<<4)^(q^n)+(k[3&r^i]^m),n=j[r]-=h;q-=o}var s=e(j);return s=s.replace(/\0+$/,""),c(s)}}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(98),c(65),c(101),c(58),c(45),c(48),c(46)],e=function(a,b,d,e,f,g,h){function i(){var a={LOAD_PROMISE_POLYFILL:{method:j,depends:[]},LOAD_BASE64_POLYFILL:{method:k,depends:[]},LOADED_POLYFILLS:{method:l,depends:["LOAD_PROMISE_POLYFILL","LOAD_BASE64_POLYFILL"]},LOAD_PLUGINS:{method:m,depends:["LOADED_POLYFILLS"]},INIT_PLUGINS:{method:n,depends:["LOAD_PLUGINS","SETUP_VIEW"]},LOAD_YOUTUBE:{method:v,depends:["FILTER_PLAYLIST"]},LOAD_SKIN:{method:u,depends:["LOADED_POLYFILLS"]},LOAD_PLAYLIST:{method:p,depends:["LOADED_POLYFILLS"]},FILTER_PLAYLIST:{method:q,depends:["LOAD_PLAYLIST"]},SETUP_VIEW:{method:w,depends:["LOAD_SKIN"]},SEND_READY:{method:x,depends:["INIT_PLUGINS","LOAD_YOUTUBE","SETUP_VIEW"]}};return a}function j(a){window.Promise?a():c.e(1,function(b){c(104),a()})}function k(a){window.btoa&&window.atob?a():c.e(2,function(b){c(105),a()})}function l(a){a()}function m(b,c){z=a.loadPlugins(c.get("id"),c.get("plugins")),z.on(h.COMPLETE,b),z.on(h.ERROR,f.partial(o,b)),z.load()}function n(a,b,c){z.setupPlugins(c,b),a()}function o(a,b){y(a,"Could not load plugin",b.message)}function p(a,c){var d=c.get("playlist");f.isString(d)?(A=new b,A.on(h.JWPLAYER_PLAYLIST_LOADED,function(b){c.set("playlist",b.playlist),a()}),A.on(h.JWPLAYER_ERROR,f.partial(r,a)),A.load(d)):a()}function q(a,b,c,d,e){var f=b.get("playlist"),g=e(f);g?a():r(a)}function r(a,b){b&&b.message?y(a,"Error loading playlist",b.message):y(a,"Error loading player","No playable sources found")}function s(a,b){return f.contains(e.SkinsLoadable,a)?b+"skins/"+a+".css":void 0}function t(a){for(var b=document.styleSheets,c=0,d=b.length;d>c;c++)if(b[c].href===a)return!0;return!1}function u(a,b){var c=b.get("skin"),g=b.get("skinUrl");if(f.contains(e.SkinsIncluded,c))return void a();if(g||(g=s(c,b.get("base"))),f.isString(g)&&!t(g)){b.set("skin-loading",!0);var i=!0,j=new d(g,i);j.addEventListener(h.COMPLETE,function(){b.set("skin-loading",!1)}),j.addEventListener(h.ERROR,function(){b.set("skin","seven"),b.set("skin-loading",!1)}),j.load()}f.defer(function(){a()})}function v(a,b){var d=b.get("playlist"),e=f.some(d,function(a){var b=g.isYouTube(a.file,a.type);if(b&&!a.image){var c=a.file,d=g.youTubeID(c);a.image="//i.ytimg.com/vi/"+d+"/0.jpg"}return b});e?c.e(3,function(b){var d=c(106);d.register(window.jwplayer),a()}):a()}function w(a,b,c,d){d.setup(),a()}function x(a){a({type:"complete"})}function y(a,b,c){a({type:"error",msg:b,reason:c})}var z,A;return{getQueue:i,error:y}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(99),c(102),c(103),c(100)],e=function(a,b,c,d){var e={},f={},g=function(c,d){return f[c]=new a(new b(e),d),f[c]},h=function(a,b,f,g){var h=d.getPluginName(a);e[h]||(e[h]=new c(a)),e[h].registerPlugin(a,b,f,g)};return{loadPlugins:g,registerPlugin:h}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(100),c(48),c(46),c(47),c(45),c(101)],e=function(a,b,c,d,e,f){function g(a,b,c){return function(){var d=a.getContainer().getElementsByClassName("jw-overlays")[0];d&&(d.appendChild(c),c.left=d.style.left,c.top=d.style.top,b.displayArea=d)}}function h(a){function b(){var b=a.displayArea;b&&a.resize(b.clientWidth,b.clientHeight)}return function(){b(),setTimeout(b,400)}}var i=function(i,j){function k(){q||(q=!0,p=f.loaderstatus.COMPLETE,o.trigger(c.COMPLETE))}function l(){if(!s&&(j&&0!==e.keys(j).length||k(),!q)){var d=i.getPlugins();n=e.after(r,k),e.each(j,function(e,g){var h=a.getPluginName(g),i=d[h],j=i.getJS(),k=i.getTarget(),l=i.getStatus();l!==f.loaderstatus.LOADING&&l!==f.loaderstatus.NEW&&(j&&!b.versionCheck(k)&&o.trigger(c.ERROR,{message:"Incompatible player version"}),n())})}}function m(a){if(!s){var d="File not found";a.url&&b.log(d,a.url),this.off(),this.trigger(c.ERROR,{message:d}),l()}}var n,o=e.extend(this,d),p=f.loaderstatus.NEW,q=!1,r=e.size(j),s=!1;this.setupPlugins=function(c,d){var f=[],j=i.getPlugins(),k=d.get("plugins");e.each(k,function(d,i){var l=a.getPluginName(i),m=j[l],n=m.getFlashPath(),o=m.getJS(),p=m.getURL();if(n){var q=e.extend({name:l,swf:n,pluginmode:m.getPluginmode()},d);f.push(q)}var r=b.tryCatch(function(){if(o&&k[p]){var a=document.createElement("div");a.id=c.id+"_"+l,a.className="jw-plugin jw-reset";var b=e.extend({},k[p]),d=m.getNewInstance(c,b,a);d.addToPlayer=g(c,d,a),d.resizeHandler=h(d),c.addPlugin(l,d,a)}});r instanceof b.Error&&b.log("ERROR: Failed to load "+l+".")}),d.set("flashPlugins",f)},this.load=function(){if(b.exists(j)&&"object"!==b.typeOf(j))return void l();p=f.loaderstatus.LOADING,e.each(j,function(a,d){if(b.exists(d)){var e=i.addPlugin(d);e.on(c.COMPLETE,l),e.on(c.ERROR,m)}});var a=i.getPlugins();e.each(a,function(a){a.load()}),l()},this.destroy=function(){
s=!0,this.off()},this.getStatus=function(){return p}};return i}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(51)],e=function(a){var b={},c=b.pluginPathType={ABSOLUTE:0,RELATIVE:1,CDN:2};return b.getPluginPathType=function(b){if("string"==typeof b){b=b.split("?")[0];var d=b.indexOf("://");if(d>0)return c.ABSOLUTE;var e=b.indexOf("/"),f=a.extension(b);return!(0>d&&0>e)||f&&isNaN(f)?c.RELATIVE:c.CDN}},b.getPluginName=function(a){return a.replace(/^(.*\/)?([^-]*)-?.*\.(swf|js)$/,"$2")},b.getPluginVersion=function(a){return a.replace(/[^-]*-?([^\.]*).*$/,"$1")},b}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(46),c(47),c(45)],e=function(a,b,c){var d={},e={NEW:0,LOADING:1,ERROR:2,COMPLETE:3},f=function(f,g){function h(b){k=e.ERROR,j.trigger(a.ERROR,b)}function i(b){k=e.COMPLETE,j.trigger(a.COMPLETE,b)}var j=c.extend(this,b),k=e.NEW;this.addEventListener=this.on,this.removeEventListener=this.off,this.makeStyleLink=function(a){var b=document.createElement("link");return b.type="text/css",b.rel="stylesheet",b.href=a,b},this.makeScriptTag=function(a){var b=document.createElement("script");return b.src=a,b},this.makeTag=g?this.makeStyleLink:this.makeScriptTag,this.load=function(){if(k===e.NEW){var b=d[f];if(b&&(k=b.getStatus(),2>k))return b.on(a.ERROR,h),void b.on(a.COMPLETE,i);var c=document.getElementsByTagName("head")[0]||document.documentElement,j=this.makeTag(f),l=!1;j.onload=j.onreadystatechange=function(a){l||this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(l=!0,i(a),j.onload=j.onreadystatechange=null,c&&j.parentNode&&!g&&c.removeChild(j))},j.onerror=h,c.insertBefore(j,c.firstChild),k=e.LOADING,d[f]=this}},this.getStatus=function(){return k}};return f.loaderstatus=e,f}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(100),c(103)],e=function(a,b){var c=function(c){this.addPlugin=function(d){var e=a.getPluginName(d);return c[e]||(c[e]=new b(d)),c[e]},this.getPlugins=function(){return c}};return c}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(100),c(46),c(47),c(101),c(45)],e=function(a,b,c,d,e,f){var g={FLASH:0,JAVASCRIPT:1,HYBRID:2},h=function(h){function i(){switch(b.getPluginPathType(h)){case b.pluginPathType.ABSOLUTE:return h;case b.pluginPathType.RELATIVE:return a.getAbsolutePath(h,window.location.href)}}function j(){f.defer(function(){q=e.loaderstatus.COMPLETE,p.trigger(c.COMPLETE)})}function k(){q=e.loaderstatus.ERROR,p.trigger(c.ERROR,{url:h})}var l,m,n,o,p=f.extend(this,d),q=e.loaderstatus.NEW;this.load=function(){if(q===e.loaderstatus.NEW){if(h.lastIndexOf(".swf")>0)return l=h,q=e.loaderstatus.COMPLETE,void p.trigger(c.COMPLETE);if(b.getPluginPathType(h)===b.pluginPathType.CDN)return q=e.loaderstatus.COMPLETE,void p.trigger(c.COMPLETE);q=e.loaderstatus.LOADING;var a=new e(i());a.on(c.COMPLETE,j),a.on(c.ERROR,k),a.load()}},this.registerPlugin=function(a,b,d,f){o&&(clearTimeout(o),o=void 0),n=b,d&&f?(l=f,m=d):"string"==typeof d?l=d:"function"==typeof d?m=d:d||f||(l=a),q=e.loaderstatus.COMPLETE,p.trigger(c.COMPLETE)},this.getStatus=function(){return q},this.getPluginName=function(){return b.getPluginName(h)},this.getFlashPath=function(){if(l)switch(b.getPluginPathType(l)){case b.pluginPathType.ABSOLUTE:return l;case b.pluginPathType.RELATIVE:return h.lastIndexOf(".swf")>0?a.getAbsolutePath(l,window.location.href):a.getAbsolutePath(l,i())}return null},this.getJS=function(){return m},this.getTarget=function(){return n},this.getPluginmode=function(){return void 0!==typeof l&&void 0!==typeof m?g.HYBRID:void 0!==typeof l?g.FLASH:void 0!==typeof m?g.JAVASCRIPT:void 0},this.getNewInstance=function(a,b,c){return new m(a,b,c)},this.getURL=function(){return h}};return h}.apply(b,d),!(void 0!==e&&(a.exports=e))},,,,,,,,function(a,b,c){var d,e;d=[c(66),c(112),c(113),c(48)],e=function(a,b,c,d){var e=function(e,f){function g(a){if(a.tracks.length){f.mediaController.off("meta",h),s=[],t={},u={},v=0;for(var b=a.tracks||[],c=0;c<b.length;c++){var d=b[c];d.id=d.name,d.label=d.name||d.language,l(d)}var e=o();this.setCaptionsList(e),p()}}function h(a){var b=a.metadata;if(b&&"textdata"===b.type){if(!b.text)return;var c=t[b.trackid];if(!c){c={kind:"captions",id:b.trackid,data:[]},l(c);var d=o();this.setCaptionsList(d)}var e,g;b.useDTS?(c.source||(c.source=b.source||"mpegts"),e=b.begin,g=b.begin+"_"+b.text):(e=a.position||f.get("position"),g=""+Math.round(10*e)+"_"+b.text);var h=u[g];h||(h={begin:e,text:b.text},b.end&&(h.end=b.end),u[g]=h,c.data.push(h))}}function i(a){d.log("CAPTIONS("+a+")")}function j(a,b){r=b,s=[],t={},u={},v=0,f.mediaController.off("meta",h),f.mediaController.off("subtitlesTracks",g);var c,e,i,j=b.tracks;for(i=0;i<j.length;i++)if(c=j[i],e=c.kind.toLowerCase(),"captions"===e||"subtitles"===e)if(c.file){var k=d.isIOS()&&!d.isSDK(f.getConfiguration())&&-1!==c.file.indexOf(".vtt");k||(l(c),m(c))}else c.data&&l(c);0===s.length&&(f.mediaController.on("meta",h,this),f.mediaController.on("subtitlesTracks",g,this));var n=o();this.setCaptionsList(n),p()}function k(a,b){var c=null;0!==b&&(c=s[b-1]),a.set("captionsTrack",c)}function l(a){"number"!=typeof a.id&&(a.id=a.name||a.file||"cc"+s.length),a.data=a.data||[],a.label||(a.label="Unknown CC",v++,v>1&&(a.label+=" ("+v+")")),s.push(a),t[a.id]=a}function m(a){d.ajax(a.file,function(b){n(b,a)},i)}function n(e,f){var g,h=e.responseXML?e.responseXML.firstChild:null;if(h)for("xml"===a.localName(h)&&(h=h.nextSibling);h.nodeType===h.COMMENT_NODE;)h=h.nextSibling;g=h&&"tt"===a.localName(h)?d.tryCatch(function(){f.data=c(e.responseXML)}):d.tryCatch(function(){f.data=b(e.responseText)}),g instanceof d.Error&&i(g.message+": "+f.file)}function o(){for(var a=[{id:"off",label:"Off"}],b=0;b<s.length;b++)a.push({id:s[b].id,label:s[b].label||"Unknown CC"});return a}function p(){var a=0,b=f.get("captionLabel");if("Off"===b)return void f.set("captionsIndex",0);for(var c=0;c<s.length;c++){var d=s[c];if(b&&b===d.label){a=c+1;break}d["default"]||d.defaulttrack?a=c+1:d.autoselect}q(a)}function q(a){s.length?f.setVideoSubtitleTrack(a,s):f.set("captionsIndex",a)}f.on("change:playlistItem",j,this),f.on("change:captionsIndex",k,this),f.mediaController.on("subtitlesTracks",g,this),f.mediaController.on("subtitlesTrackData",function(a){var b=t[a.name];if(b){b.source=a.source;for(var c=a.captions||[],d=!1,e=0;e<c.length;e++){var f=c[e],g=a.name+"_"+f.begin+"_"+f.end;u[g]||(u[g]=f,b.data.push(f),d=!0)}d&&b.data.sort(function(a,b){return a.begin-b.begin})}},this),f.mediaController.on("meta",h,this);var r={},s=[],t={},u={},v=0;this.getCurrentIndex=function(){return f.get("captionsIndex")},this.getCaptionsList=function(){return f.get("captionsList")},this.setCaptionsList=function(a){f.set("captionsList",a)}};return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(51)],e=function(a,b){function c(a){var b={},c=a.split("\r\n");1===c.length&&(c=a.split("\n"));var e=1;if(c[0].indexOf(" --> ")>0&&(e=0),c.length>e+1&&c[e+1]){var f=c[e],g=f.indexOf(" --> ");g>0&&(b.begin=d(f.substr(0,g)),b.end=d(f.substr(g+5)),b.text=c.slice(e+1).join("<br/>"))}return b}var d=a.seconds;return function(a){var d=[];a=b.trim(a);var e=a.split("\r\n\r\n");1===e.length&&(e=a.split("\n\n"));for(var f=0;f<e.length;f++)if("WEBVTT"!==e[f]){var g=c(e[f]);g.text&&d.push(g)}if(!d.length)throw new Error("Invalid SRT file");return d}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(51)],e=function(a){function b(a){a||c()}function c(){throw new Error("Invalid DFXP file")}var d=a.seconds;return function(e){b(e);var f=[],g=e.getElementsByTagName("p");b(g),g.length||(g=e.getElementsByTagName("tt:p"),g.length||(g=e.getElementsByTagName("tts:p")));for(var h=0;h<g.length;h++){var i=g[h],j=i.innerHTML||i.textContent||i.text||"",k=a.trim(j).replace(/>\s+</g,"><").replace(/tts?:/g,"");if(k){var l=i.getAttribute("begin"),m=i.getAttribute("dur"),n=i.getAttribute("end"),o={begin:d(l),text:k};n?o.end=d(n):m&&(o.end=o.begin+d(m)),f.push(o)}}return f.length||c(),f}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(70),c(71),c(45),c(78)],e=function(a,b,c,d){function e(a,b){for(var c=0;c<a.length;c++){var d=a[c],e=b.choose(d);if(e)return d.type}return null}var f=function(b){return b=c.isArray(b)?b:[b],c.compact(c.map(b,a))};f.filterPlaylist=function(a,b,d,e,f){var i=[];return c.each(a,function(a){a=c.extend({},a),a.allSources=g(a.sources,d,a.drm||e,a.preload||f),a.sources=h(a.allSources,b),a.sources.length&&(a.file=a.sources[0].file,(a.preload||f)&&(a.preload=a.preload||f),i.push(a))}),i};var g=function(a,d,e,f){return c.compact(c.map(a,function(a){return c.isObject(a)?(void 0!==d&&null!==d&&(a.androidhls=d),(a.drm||e)&&(a.drm=a.drm||e),(a.preload||f)&&(a.preload=a.preload||f),b(a)):void 0}))},h=function(a,b){b&&b.choose||(b=new d({primary:b?"flash":null}));var f=e(a,b);return c.where(a,{type:f})};return f}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[],e=function(){return function(a,b){a.getPlaylistIndex=a.getItem;var c={jwPlay:b.play,jwPause:b.pause,jwSetMute:b.setMute,jwLoad:b.load,jwPlaylistItem:b.item,jwGetAudioTracks:b.getAudioTracks,jwDetachMedia:b.detachMedia,jwAttachMedia:b.attachMedia,jwAddEventListener:b.on,jwRemoveEventListener:b.off,jwStop:b.stop,jwSeek:b.seek,jwSetVolume:b.setVolume,jwPlaylistNext:b.next,jwPlaylistPrev:b.prev,jwSetFullscreen:b.setFullscreen,jwGetQualityLevels:b.getQualityLevels,jwGetCurrentQuality:b.getCurrentQuality,jwSetCurrentQuality:b.setCurrentQuality,jwSetCurrentAudioTrack:b.setCurrentAudioTrack,jwGetCurrentAudioTrack:b.getCurrentAudioTrack,jwGetCaptionsList:b.getCaptionsList,jwGetCurrentCaptions:b.getCurrentCaptions,jwSetCurrentCaptions:b.setCurrentCaptions,jwSetCues:b.setCues};a.callInternal=function(a){console.log("You are using the deprecated callInternal method for "+a);var d=Array.prototype.slice.call(arguments,1);c[a].apply(b,d)}}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(117),c(46),c(154)],e=function(a,b,c){var d=function(d,e){var f=new a(d,e),g=f.setup;return f.setup=function(){if(g.call(this),"trial"===e.get("edition")){var a=document.createElement("div");a.className="jw-icon jw-watermark",this.element().appendChild(a)}e.on("change:skipButton",this.onSkipButton,this),e.on("change:castActive change:playlistItem",this.showDisplayIconImage,this)},f.showDisplayIconImage=function(a){var b=a.get("castActive"),c=a.get("playlistItem"),d=f.controlsContainer().getElementsByClassName("jw-display-icon-container")[0];b&&c&&c.image?(d.style.backgroundImage='url("'+c.image+'")',d.style.backgroundSize="contain"):(d.style.backgroundImage="",d.style.backgroundSize="")},f.onSkipButton=function(a,b){b?this.addSkipButton():this._skipButton&&(this._skipButton.destroy(),this._skipButton=null)},f.addSkipButton=function(){this._skipButton=new c(this.instreamModel),this._skipButton.on(b.JWPLAYER_AD_SKIPPED,function(){this.api.skipAd()},this),this.controlsContainer().appendChild(this._skipButton.element())},f};return d}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(46),c(47),c(58),c(62),c(128),c(129),c(130),c(118),c(132),c(134),c(148),c(149),c(152),c(45),c(153)],e=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q=a.style,r=a.bounds,s=a.isMobile(),t=["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","MSFullscreenChange"],u=function(u,v){function w(b){var c=0,e=v.get("duration"),f=v.get("position");"DVR"===a.adaptiveType(e)&&(c=e,e=Math.max(f,d.dvrSeekLimit));var g=a.between(f+b,c,e);u.seek(g)}function x(b){var c=a.between(v.get("volume")+b,0,100);u.setVolume(c)}function y(a){return a.ctrlKey||a.metaKey?!1:!!v.get("controls")}function z(a){if(!y(a))return!0;switch(Ga||aa(),a.keyCode){case 27:u.setFullscreen(!1);break;case 13:case 32:u.play({reason:"interaction"});break;case 37:Ga||w(-5);break;case 39:Ga||w(5);break;case 38:x(10);break;case 40:x(-10);break;case 77:u.setMute();break;case 70:u.setFullscreen();break;default:if(a.keyCode>=48&&a.keyCode<=59){var b=a.keyCode-48,c=b/10*v.get("duration");u.seek(c)}}return/13|32|37|38|39|40/.test(a.keyCode)?(a.preventDefault(),!1):void 0}function A(){La=!1,a.removeClass(ja,"jw-no-focus")}function B(){La=!0,a.addClass(ja,"jw-no-focus")}function C(){La||A(),Ga||aa()}function D(){var a=r(ja),c=Math.round(a.width),d=Math.round(a.height);return document.body.contains(ja)?c&&d&&(c===ma&&d===na||(ma=c,na=d,clearTimeout(Ia),Ia=setTimeout(X,50),v.set("containerWidth",c),v.set("containerHeight",d),Ma.trigger(b.JWPLAYER_RESIZE,{width:c,height:d}))):(window.removeEventListener("resize",D),s&&window.removeEventListener("orientationchange",D)),a}function E(b,c){c=c||!1,a.toggleClass(ja,"jw-flag-casting",c)}function F(b,c){a.toggleClass(ja,"jw-flag-cast-available",c),a.toggleClass(ka,"jw-flag-cast-available",c)}function G(b,c){a.replaceClass(ja,/jw-stretch-\S+/,"jw-stretch-"+c)}function H(b,c){a.toggleClass(ja,"jw-flag-compact-player",c)}function I(a){a&&!s&&(a.element().addEventListener("mousemove",L,!1),a.element().addEventListener("mouseout",M,!1))}function J(){v.get("state")!==e.IDLE&&v.get("state")!==e.COMPLETE&&v.get("state")!==e.PAUSED||!v.get("controls")||u.play({reason:"interaction"}),Ha?_():aa()}function K(a){a.link?(u.pause(!0),u.setFullscreen(!1),window.open(a.link,a.linktarget)):v.get("controls")&&u.play({reason:"interaction"})}function L(){clearTimeout(Da)}function M(){aa()}function N(a){Ma.trigger(a.type,a)}function O(b,c){c?(ya&&ya.destroy(),a.addClass(ja,"jw-flag-flash-blocked")):(ya&&ya.setup(v,ja,ja),a.removeClass(ja,"jw-flag-flash-blocked"))}function P(){v.get("controls")&&u.setFullscreen()}function Q(){var c=ja.getElementsByClassName("jw-overlays")[0];c.addEventListener("mousemove",aa),ra=new g(v,la,{useHover:!0}),ra.on("click",function(){N({type:b.JWPLAYER_DISPLAY_CLICK}),v.get("controls")&&u.play({reason:"interaction"})}),ra.on("tap",function(){N({type:b.JWPLAYER_DISPLAY_CLICK}),J()}),ra.on("doubleClick",P),ra.on("move",aa),ra.on("over",aa);var d=new h(v);d.on("click",function(){N({type:b.JWPLAYER_DISPLAY_CLICK}),u.play({reason:"interaction"})}),d.on("tap",function(){N({type:b.JWPLAYER_DISPLAY_CLICK}),J()}),a.isChrome()&&d.el.addEventListener("mousedown",function(){var a=v.getVideo(),b=a&&0===a.getName().name.indexOf("flash");if(b){var c=function(){document.removeEventListener("mouseup",c),d.el.style.pointerEvents="auto"};this.style.pointerEvents="none",document.addEventListener("mouseup",c)}}),ka.appendChild(d.element()),ta=new i(v),ua=new j(v),ua.on(b.JWPLAYER_LOGO_CLICK,K);var e=document.createElement("div");e.className="jw-controls-right jw-reset",ua.setup(e),e.appendChild(ta.element()),ka.appendChild(e),wa=new f(v),wa.setup(v.get("captions")),ka.parentNode.insertBefore(wa.element(),va.element());var l=v.get("height");s&&("string"==typeof l||l>=1.5*Fa)?a.addClass(ja,"jw-flag-touch"):(ya=new m,ya.setup(v,ja,ja)),pa=new k(u,v),pa.on(b.JWPLAYER_USER_ACTION,aa),v.on("change:scrubbing",S),v.on("change:compactUI",H),ka.appendChild(pa.element()),ja.addEventListener("focus",C),ja.addEventListener("blur",A),ja.addEventListener("keydown",z),ja.onmousedown=B}function R(b){return b.get("state")===e.PAUSED?void b.once("change:state",R):void(b.get("scrubbing")===!1&&a.removeClass(ja,"jw-flag-dragging"))}function S(b,c){b.off("change:state",R),c?a.addClass(ja,"jw-flag-dragging"):R(b)}function T(b,c,d){var e,f=ja.className;d=!!d,d&&(f=f.replace(/\s*aspectMode/,""),ja.className!==f&&(ja.className=f),q(ja,{display:"block"},d)),a.exists(b)&&a.exists(c)&&(v.set("width",b),v.set("height",c)),e={width:b},a.hasClass(ja,"jw-flag-aspect-mode")||(e.height=c),q(ja,e,!0),U(c),X(b,c)}function U(b){if(xa=V(b),pa&&!xa){var c=Ga?oa:v;ia(c,c.get("state"))}a.toggleClass(ja,"jw-flag-audio-player",xa)}function V(a){if(v.get("aspectratio"))return!1;if(o.isString(a)&&a.indexOf("%")>-1)return!1;var b=o.isNumber(a)?a:v.get("containerHeight");return W(b)}function W(a){return a&&Fa*(s?1.75:1)>=a}function X(b,c){if(!b||isNaN(Number(b))){if(!la)return;b=la.clientWidth}if(!c||isNaN(Number(c))){if(!la)return;c=la.clientHeight}a.isMSIE(9)&&document.all&&!window.atob&&(b=c="100%");var d=v.getVideo();if(d){var e=d.resize(b,c,v.get("stretching"));e&&(clearTimeout(Ia),Ia=setTimeout(X,250)),wa.resize(),pa.checkCompactMode(b)}}function Y(){if(Ka){var a=document.fullscreenElement||document.webkitCurrentFullScreenElement||document.mozFullScreenElement||document.msFullscreenElement;return!(!a||a.id!==v.get("id"))}return Ga?oa.getVideo().getFullScreen():v.getVideo().getFullScreen()}function Z(a){var b=v.get("fullscreen"),c=void 0!==a.jwstate?a.jwstate:Y();b!==c&&v.set("fullscreen",c),clearTimeout(Ia),Ia=setTimeout(X,200)}function $(b,c){c?(a.addClass(b,"jw-flag-fullscreen"),q(document.body,{"overflow-y":"hidden"}),aa()):(a.removeClass(b,"jw-flag-fullscreen"),q(document.body,{"overflow-y":""})),X()}function _(){Ha=!1,clearTimeout(Da),pa.hideComponents(),a.addClass(ja,"jw-flag-user-inactive")}function aa(){Ha||(a.removeClass(ja,"jw-flag-user-inactive"),pa.checkCompactMode(la.clientWidth)),Ha=!0,clearTimeout(Da),Da=setTimeout(_,Ea)}function ba(){u.setFullscreen(!1)}function ca(){sa&&sa.setState(v.get("state")),da(v,v.mediaModel.get("mediaType")),v.mediaModel.on("change:mediaType",da,this)}function da(b,c){var d="audio"===c;a.toggleClass(ja,"jw-flag-media-audio",d)}function ea(b,c){var d="LIVE"===a.adaptiveType(c);a.toggleClass(ja,"jw-flag-live",d),Ma.setAltText(d?"Live Broadcast":"")}function fa(a,b){return b?void(b.name?va.updateText(b.name,b.message):va.updateText(b.message,"")):void va.playlistItem(a,a.get("playlistItem"))}function ga(){var a=v.getVideo();return a?a.isCaster:!1}function ha(){a.replaceClass(ja,/jw-state-\S+/,"jw-state-"+za)}function ia(b,c){if(za=c,clearTimeout(Ja),c===e.COMPLETE||c===e.IDLE?Ja=setTimeout(ha,100):ha(),ga())return void a.addClass(la,"jw-media-show");switch(c){case e.PLAYING:X();break;case e.PAUSED:aa()}}var ja,ka,la,ma,na,oa,pa,qa,ra,sa,ta,ua,va,wa,xa,ya,za,Aa,Ba,Ca,Da=-1,Ea=s?4e3:2e3,Fa=40,Ga=!1,Ha=!1,Ia=-1,Ja=-1,Ka=!1,La=!1,Ma=o.extend(this,c);this.model=v,this.api=u,ja=a.createElement(p({id:v.get("id")})),a.isIE()&&a.addClass(ja,"jw-ie");var Na=v.get("width"),Oa=v.get("height");q(ja,{width:Na.toString().indexOf("%")>0?Na:Na+"px",height:Oa.toString().indexOf("%")>0?Oa:Oa+"px"}),Ba=ja.requestFullscreen||ja.webkitRequestFullscreen||ja.webkitRequestFullScreen||ja.mozRequestFullScreen||ja.msRequestFullscreen,Ca=document.exitFullscreen||document.webkitExitFullscreen||document.webkitCancelFullScreen||document.mozCancelFullScreen||document.msExitFullscreen,Ka=Ba&&Ca,this.onChangeSkin=function(b,c){a.replaceClass(ja,/jw-skin-\S+/,c?"jw-skin-"+c:"")},this.handleColorOverrides=function(){function b(b,d,e){if(e){b=a.prefix(b,"#"+c+" ");var f={};f[d]=e,a.css(b.join(", "),f)}}var c=v.get("id"),d=v.get("skinColorActive"),e=v.get("skinColorInactive"),f=v.get("skinColorBackground");b([".jw-toggle",".jw-button-color:hover"],"color",d),b([".jw-active-option",".jw-progress",".jw-playlist-container .jw-option.jw-active-option",".jw-playlist-container .jw-option:hover"],"background",d),b([".jw-text",".jw-option",".jw-button-color",".jw-toggle.jw-off",".jw-tooltip-title",".jw-skip .jw-skip-icon",".jw-playlist-container .jw-icon"],"color",e),b([".jw-cue",".jw-knob"],"background",e),b([".jw-playlist-container .jw-option"],"border-bottom-color",e),b([".jw-background-color",".jw-tooltip-title",".jw-playlist",".jw-playlist-container .jw-option"],"background",f),b([".jw-playlist-container ::-webkit-scrollbar"],"border-color",f)},this.setup=function(){this.handleColorOverrides(),v.get("skin-loading")===!0&&(a.addClass(ja,"jw-flag-skin-loading"),v.once("change:skin-loading",function(){a.removeClass(ja,"jw-flag-skin-loading")})),this.onChangeSkin(v,v.get("skin"),""),v.on("change:skin",this.onChangeSkin,this),la=ja.getElementsByClassName("jw-media")[0],ka=ja.getElementsByClassName("jw-controls")[0];var c=ja.getElementsByClassName("jw-preview")[0];qa=new l(v),qa.setup(c);var d=ja.getElementsByClassName("jw-title")[0];va=new n(v),va.setup(d),Q(),aa(),v.set("mediaContainer",la),v.mediaController.on("fullscreenchange",Z);for(var f=t.length;f--;)document.addEventListener(t[f],Z,!1);window.removeEventListener("resize",D),window.addEventListener("resize",D,!1),s&&(window.removeEventListener("orientationchange",D),window.addEventListener("orientationchange",D,!1)),v.on("change:errorEvent",fa),v.on("change:controls",Pa),Pa(v,v.get("controls")),v.on("change:state",ia),v.on("change:duration",ea,this),v.on("change:flashBlocked",O),O(v,v.get("flashBlocked")),u.onPlaylistComplete(ba),u.onPlaylistItem(ca),v.on("change:castAvailable",F),F(v,v.get("castAvailable")),v.on("change:castActive",E),E(v,v.get("castActive")),v.get("stretching")&&G(v,v.get("stretching")),v.on("change:stretching",G),ia(v,e.IDLE),v.on("change:fullscreen",Qa),I(pa),I(ua);var g=v.get("aspectratio");if(g){a.addClass(ja,"jw-flag-aspect-mode");var h=ja.getElementsByClassName("jw-aspect")[0];q(h,{paddingTop:g})}u.on(b.JWPLAYER_READY,function(){D(),T(v.get("width"),v.get("height"))})};var Pa=function(b,c){if(c){var d=Ga?oa.get("state"):v.get("state");ia(b,d)}a.toggleClass(ja,"jw-flag-controls-disabled",!c)},Qa=function(b,c){var d=v.getVideo();Ka?(c?Ba.apply(ja):Ca.apply(document),$(ja,c)):a.isIE()?$(ja,c):(oa&&oa.getVideo()&&oa.getVideo().setFullscreen(c),d.setFullscreen(c)),d&&0===d.getName().name.indexOf("flash")&&d.setFullscreen(c)};this.resize=function(a,b){var c=!0;T(a,b,c),D()},this.resizeMedia=X,this.reset=function(){document.contains(ja)&&ja.parentNode.replaceChild(Aa,ja),a.emptyElement(ja)},this.setupInstream=function(b){this.instreamModel=oa=b,oa.on("change:controls",Pa,this),oa.on("change:state",ia,this),Ga=!0,a.addClass(ja,"jw-flag-ads"),aa()},this.setAltText=function(a){pa.setAltText(a)},this.useExternalControls=function(){a.addClass(ja,"jw-flag-ads-hide-controls")},this.destroyInstream=function(){if(Ga=!1,oa&&(oa.off(null,null,this),oa=null),this.setAltText(""),a.removeClass(ja,"jw-flag-ads"),a.removeClass(ja,"jw-flag-ads-hide-controls"),v.getVideo){var b=v.getVideo();b.setContainer(la)}ea(v,v.get("duration")),ra.revertAlternateClickHandlers()},this.addCues=function(a){pa&&pa.addCues(a)},this.clickHandler=function(){return ra},this.controlsContainer=function(){return ka},this.getContainer=this.element=function(){return ja},this.getSafeRegion=function(b){var c={x:0,y:0,width:v.get("containerWidth")||0,height:v.get("containerHeight")||0},d=v.get("dock");return d&&d.length&&v.get("controls")&&(c.y=ta.element().clientHeight,c.height-=c.y),b=b||!a.exists(b),b&&v.get("controls")&&(c.height-=pa.element().clientHeight),c},this.destroy=function(){window.removeEventListener("resize",D),window.removeEventListener("orientationchange",D);for(var b=t.length;b--;)document.removeEventListener(t[b],Z,!1);v.mediaController&&v.mediaController.off("fullscreenchange",Z),ja.removeEventListener("keydown",z,!1),ya&&ya.destroy(),sa&&(v.off("change:state",sa.statusDelegate),sa.destroy(),sa=null),Ga&&this.destroyInstream(),ua&&ua.destroy(),a.clearCss("#"+v.get("id"))}};return u}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(119),c(48),c(45),c(127)],e=function(a,b,c,d){var e=function(a){this.model=a,this.setup(),this.model.on("change:dock",this.render,this)};return c.extend(e.prototype,{setup:function(){var c=this.model.get("dock"),e=this.click.bind(this),f=a(c);this.el=b.createElement(f),new d(this.el).on("click tap",e)},getDockButton:function(a){return b.hasClass(a.target,"jw-dock-button")?a.target:b.hasClass(a.target,"jw-dock-text")?a.target.parentElement.parentElement:a.target.parentElement},click:function(a){var b=this.getDockButton(a),d=b.getAttribute("button"),e=this.model.get("dock"),f=c.findWhere(e,{id:d});f&&f.callback&&f.callback(a)},render:function(){var c=this.model.get("dock"),d=a(c),e=b.createElement(d);this.el.innerHTML=e.innerHTML},element:function(){return this.el}}),e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({1:function(a,b,c,d){var e,f,g="function",h=b.helperMissing,i=this.escapeExpression,j='    <div class="jw-dock-button jw-background-color jw-reset';return e=b["if"].call(a,null!=a?a.btnClass:a,{name:"if",hash:{},fn:this.program(2,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+='" button="'+i((f=null!=(f=b.id||(null!=a?a.id:a))?f:h,typeof f===g?f.call(a,{name:"id",hash:{},data:d}):f))+'">\n        <div class="jw-icon jw-dock-image jw-reset" ',e=b["if"].call(a,null!=a?a.img:a,{name:"if",hash:{},fn:this.program(4,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+='></div>\n        <div class="jw-arrow jw-reset"></div>\n',e=b["if"].call(a,null!=a?a.tooltip:a,{name:"if",hash:{},fn:this.program(6,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+"    </div>\n"},2:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return" "+h((e=null!=(e=b.btnClass||(null!=a?a.btnClass:a))?e:g,typeof e===f?e.call(a,{name:"btnClass",hash:{},data:d}):e))},4:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return"style='background-image: url(\""+h((e=null!=(e=b.img||(null!=a?a.img:a))?e:g,typeof e===f?e.call(a,{name:"img",hash:{},data:d}):e))+"\")'"},6:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return'        <div class="jw-overlay jw-background-color jw-reset">\n            <span class="jw-text jw-dock-text jw-reset">'+h((e=null!=(e=b.tooltip||(null!=a?a.tooltip:a))?e:g,typeof e===f?e.call(a,{name:"tooltip",hash:{},data:d}):e))+"</span>\n        </div>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="jw-dock jw-reset">\n';return e=b.each.call(a,a,{name:"each",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+"</div>"},useData:!0})},function(a,b,c){a.exports=c(121)},function(a,b,c){"use strict";var d=c(122),e=c(124)["default"],f=c(125)["default"],g=c(123),h=c(126),i=function(){var a=new d.HandlebarsEnvironment;return g.extend(a,d),a.SafeString=e,a.Exception=f,a.Utils=g,a.escapeExpression=g.escapeExpression,a.VM=h,a.template=function(b){return h.template(b,a)},a},j=i();j.create=i,j["default"]=j,b["default"]=j},function(a,b,c){"use strict";function d(a,b){this.helpers=a||{},this.partials=b||{},e(this)}function e(a){a.registerHelper("helperMissing",function(){if(1!==arguments.length)throw new g("Missing helper: '"+arguments[arguments.length-1].name+"'")}),a.registerHelper("blockHelperMissing",function(b,c){var d=c.inverse,e=c.fn;if(b===!0)return e(this);if(b===!1||null==b)return d(this);if(k(b))return b.length>0?(c.ids&&(c.ids=[c.name]),a.helpers.each(b,c)):d(this);if(c.data&&c.ids){var g=q(c.data);g.contextPath=f.appendContextPath(c.data.contextPath,c.name),c={data:g}}return e(b,c)}),a.registerHelper("each",function(a,b){if(!b)throw new g("Must pass iterator to #each");var c,d,e=b.fn,h=b.inverse,i=0,j="";if(b.data&&b.ids&&(d=f.appendContextPath(b.data.contextPath,b.ids[0])+"."),l(a)&&(a=a.call(this)),b.data&&(c=q(b.data)),a&&"object"==typeof a)if(k(a))for(var m=a.length;m>i;i++)c&&(c.index=i,c.first=0===i,c.last=i===a.length-1,d&&(c.contextPath=d+i)),j+=e(a[i],{data:c});else for(var n in a)a.hasOwnProperty(n)&&(c&&(c.key=n,c.index=i,c.first=0===i,d&&(c.contextPath=d+n)),j+=e(a[n],{data:c}),i++);return 0===i&&(j=h(this)),j}),a.registerHelper("if",function(a,b){return l(a)&&(a=a.call(this)),!b.hash.includeZero&&!a||f.isEmpty(a)?b.inverse(this):b.fn(this)}),a.registerHelper("unless",function(b,c){return a.helpers["if"].call(this,b,{fn:c.inverse,inverse:c.fn,hash:c.hash})}),a.registerHelper("with",function(a,b){l(a)&&(a=a.call(this));var c=b.fn;if(f.isEmpty(a))return b.inverse(this);if(b.data&&b.ids){var d=q(b.data);d.contextPath=f.appendContextPath(b.data.contextPath,b.ids[0]),b={data:d}}return c(a,b)}),a.registerHelper("log",function(b,c){var d=c.data&&null!=c.data.level?parseInt(c.data.level,10):1;a.log(d,b)}),a.registerHelper("lookup",function(a,b){return a&&a[b]})}var f=c(123),g=c(125)["default"],h="2.0.0";b.VERSION=h;var i=6;b.COMPILER_REVISION=i;var j={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};b.REVISION_CHANGES=j;var k=f.isArray,l=f.isFunction,m=f.toString,n="[object Object]";b.HandlebarsEnvironment=d,d.prototype={constructor:d,logger:o,log:p,registerHelper:function(a,b){if(m.call(a)===n){if(b)throw new g("Arg not supported with multiple helpers");f.extend(this.helpers,a)}else this.helpers[a]=b},unregisterHelper:function(a){delete this.helpers[a]},registerPartial:function(a,b){m.call(a)===n?f.extend(this.partials,a):this.partials[a]=b},unregisterPartial:function(a){delete this.partials[a]}};var o={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(a,b){if(o.level<=a){var c=o.methodMap[a];"undefined"!=typeof console&&console[c]&&console[c].call(console,b)}}};b.logger=o;var p=o.log;b.log=p;var q=function(a){var b=f.extend({},a);return b._parent=a,b};b.createFrame=q},function(a,b,c){"use strict";function d(a){return j[a]}function e(a){for(var b=1;b<arguments.length;b++)for(var c in arguments[b])Object.prototype.hasOwnProperty.call(arguments[b],c)&&(a[c]=arguments[b][c]);return a}function f(a){return a instanceof i?a.toString():null==a?"":a?(a=""+a,l.test(a)?a.replace(k,d):a):a+""}function g(a){return a||0===a?!(!o(a)||0!==a.length):!0}function h(a,b){return(a?a+".":"")+b}var i=c(124)["default"],j={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},k=/[&<>"'`]/g,l=/[&<>"'`]/;b.extend=e;var m=Object.prototype.toString;b.toString=m;var n=function(a){return"function"==typeof a};n(/x/)&&(n=function(a){return"function"==typeof a&&"[object Function]"===m.call(a)});var n;b.isFunction=n;var o=Array.isArray||function(a){return a&&"object"==typeof a?"[object Array]"===m.call(a):!1};b.isArray=o,b.escapeExpression=f,b.isEmpty=g,b.appendContextPath=h},function(a,b){"use strict";function c(a){this.string=a}c.prototype.toString=function(){return""+this.string},b["default"]=c},function(a,b){"use strict";function c(a,b){var c;b&&b.firstLine&&(c=b.firstLine,a+=" - "+c+":"+b.firstColumn);for(var e=Error.prototype.constructor.call(this,a),f=0;f<d.length;f++)this[d[f]]=e[d[f]];c&&(this.lineNumber=c,this.column=b.firstColumn)}var d=["description","fileName","lineNumber","message","name","number","stack"];c.prototype=new Error,b["default"]=c},function(a,b,c){"use strict";function d(a){var b=a&&a[0]||1,c=l;if(b!==c){if(c>b){var d=m[c],e=m[b];throw new k("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+d+") or downgrade your runtime to an older version ("+e+").")}throw new k("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+a[1]+").")}}function e(a,b){if(!b)throw new k("No environment passed to template");if(!a||!a.main)throw new k("Unknown template object: "+typeof a);b.VM.checkRevision(a.compiler);var c=function(c,d,e,f,g,h,i,l,m){g&&(f=j.extend({},f,g));var n=b.VM.invokePartial.call(this,c,e,f,h,i,l,m);if(null==n&&b.compile){var o={helpers:h,partials:i,data:l,depths:m};i[e]=b.compile(c,{data:void 0!==l,compat:a.compat},b),n=i[e](f,o)}if(null!=n){if(d){for(var p=n.split("\n"),q=0,r=p.length;r>q&&(p[q]||q+1!==r);q++)p[q]=d+p[q];n=p.join("\n")}return n}throw new k("The partial "+e+" could not be compiled when running in runtime-only mode")},d={lookup:function(a,b){for(var c=a.length,d=0;c>d;d++)if(a[d]&&null!=a[d][b])return a[d][b]},lambda:function(a,b){return"function"==typeof a?a.call(b):a},escapeExpression:j.escapeExpression,invokePartial:c,fn:function(b){return a[b]},programs:[],program:function(a,b,c){var d=this.programs[a],e=this.fn(a);return b||c?d=f(this,a,e,b,c):d||(d=this.programs[a]=f(this,a,e)),d},data:function(a,b){for(;a&&b--;)a=a._parent;return a},merge:function(a,b){
var c=a||b;return a&&b&&a!==b&&(c=j.extend({},b,a)),c},noop:b.VM.noop,compilerInfo:a.compiler},e=function(b,c){c=c||{};var f=c.data;e._setup(c),!c.partial&&a.useData&&(f=i(b,f));var g;return a.useDepths&&(g=c.depths?[b].concat(c.depths):[b]),a.main.call(d,b,d.helpers,d.partials,f,g)};return e.isTop=!0,e._setup=function(c){c.partial?(d.helpers=c.helpers,d.partials=c.partials):(d.helpers=d.merge(c.helpers,b.helpers),a.usePartial&&(d.partials=d.merge(c.partials,b.partials)))},e._child=function(b,c,e){if(a.useDepths&&!e)throw new k("must pass parent depths");return f(d,b,a[b],c,e)},e}function f(a,b,c,d,e){var f=function(b,f){return f=f||{},c.call(a,b,a.helpers,a.partials,f.data||d,e&&[b].concat(e))};return f.program=b,f.depth=e?e.length:0,f}function g(a,b,c,d,e,f,g){var h={partial:!0,helpers:d,partials:e,data:f,depths:g};if(void 0===a)throw new k("The partial "+b+" could not be found");return a instanceof Function?a(c,h):void 0}function h(){return""}function i(a,b){return b&&"root"in b||(b=b?n(b):{},b.root=a),b}var j=c(123),k=c(125)["default"],l=c(122).COMPILER_REVISION,m=c(122).REVISION_CHANGES,n=c(122).createFrame;b.checkRevision=d,b.template=e,b.program=f,b.invokePartial=g,b.noop=h},function(a,b,c){var d,e;d=[c(47),c(46),c(45),c(48)],e=function(a,b,c,d){function e(a,b){return/touch/.test(a.type)?(a.originalEvent||a).changedTouches[0]["page"+b]:a["page"+b]}function f(a){var b=a||window.event;return a instanceof MouseEvent?"which"in b?3===b.which:"button"in b?2===b.button:!1:!1}function g(a,b,c){var d;return d=b instanceof MouseEvent||!b.touches&&!b.changedTouches?b:b.touches&&b.touches.length?b.touches[0]:b.changedTouches[0],{type:a,target:b.target,currentTarget:c,pageX:d.pageX,pageY:d.pageY}}function h(a){(a instanceof MouseEvent||a instanceof window.TouchEvent)&&(a.preventManipulation&&a.preventManipulation(),a.cancelable&&a.preventDefault&&a.preventDefault())}var i=!c.isUndefined(window.PointerEvent),j=!i&&d.isMobile(),k=!i&&!j,l=d.isFF()&&d.isOSX(),m=function(a,d){function j(a){(k||i&&"touch"!==a.pointerType)&&r(b.touchEvents.OVER,a)}function m(a){(k||i&&"touch"!==a.pointerType)&&r(b.touchEvents.MOVE,a)}function n(c){(k||i&&"touch"!==c.pointerType&&!a.contains(document.elementFromPoint(c.x,c.y)))&&r(b.touchEvents.OUT,c)}function o(b){s=b.target,w=e(b,"X"),x=e(b,"Y"),f(b)||(i?b.isPrimary&&(d.preventScrolling&&(t=b.pointerId,a.setPointerCapture(t)),a.addEventListener("pointermove",p),a.addEventListener("pointercancel",q),a.addEventListener("pointerup",q)):k&&(document.addEventListener("mousemove",p),l&&"object"===b.target.nodeName.toLowerCase()?a.addEventListener("click",q):document.addEventListener("mouseup",q)),s.addEventListener("touchmove",p),s.addEventListener("touchcancel",q),s.addEventListener("touchend",q))}function p(a){var c=b.touchEvents,f=6;if(v)r(c.DRAG,a);else{var g=e(a,"X"),i=e(a,"Y"),j=g-w,k=i-x;j*j+k*k>f*f&&(r(c.DRAG_START,a),v=!0,r(c.DRAG,a))}d.preventScrolling&&h(a)}function q(c){var e=b.touchEvents;i?(d.preventScrolling&&a.releasePointerCapture(t),a.removeEventListener("pointermove",p),a.removeEventListener("pointercancel",q),a.removeEventListener("pointerup",q)):k&&(document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",q)),s.removeEventListener("touchmove",p),s.removeEventListener("touchcancel",q),s.removeEventListener("touchend",q),v?r(e.DRAG_END,c):d.directSelect&&c.target!==a||-1!==c.type.indexOf("cancel")||(i&&c instanceof window.PointerEvent?"touch"===c.pointerType?r(e.TAP,c):r(e.CLICK,c):k?r(e.CLICK,c):(r(e.TAP,c),h(c))),s=null,v=!1}function r(a,e){var f;if(d.enableDoubleTap&&(a===b.touchEvents.CLICK||a===b.touchEvents.TAP))if(c.now()-y<z){var h=a===b.touchEvents.CLICK?b.touchEvents.DOUBLE_CLICK:b.touchEvents.DOUBLE_TAP;f=g(h,e,u),A.trigger(h,f),y=0}else y=c.now();f=g(a,e,u),A.trigger(a,f)}var s,t,u=a,v=!1,w=0,x=0,y=0,z=300;d=d||{},i?(a.addEventListener("pointerdown",o),d.useHover&&(a.addEventListener("pointerover",j),a.addEventListener("pointerout",n)),d.useMove&&a.addEventListener("pointermove",m)):k&&(a.addEventListener("mousedown",o),d.useHover&&(a.addEventListener("mouseover",j),a.addEventListener("mouseout",n)),d.useMove&&a.addEventListener("mousemove",m)),a.addEventListener("touchstart",o);var A=this;return this.triggerEvent=r,this.destroy=function(){a.removeEventListener("touchstart",o),a.removeEventListener("mousedown",o),s&&(s.removeEventListener("touchmove",p),s.removeEventListener("touchcancel",q),s.removeEventListener("touchend",q)),i&&(d.preventScrolling&&a.releasePointerCapture(t),a.removeEventListener("pointerover",j),a.removeEventListener("pointerdown",o),a.removeEventListener("pointermove",p),a.removeEventListener("pointermove",m),a.removeEventListener("pointercancel",q),a.removeEventListener("pointerout",n),a.removeEventListener("pointerup",q)),a.removeEventListener("click",q),a.removeEventListener("mouseover",j),a.removeEventListener("mousemove",m),a.removeEventListener("mouseout",n),document.removeEventListener("mousemove",p),document.removeEventListener("mouseup",q)},this};return c.extend(m.prototype,a),m}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(55),c(62),c(45)],e=function(a,b,c,d){var e=b.style,f={back:!0,fontSize:15,fontFamily:"Arial,sans-serif",fontOpacity:100,color:"#FFF",backgroundColor:"#000",backgroundOpacity:100,edgeStyle:null,windowColor:"#FFF",windowOpacity:0,preprocessor:d.identity},g=function(g){function h(b){b=b||"";var c="jw-captions-window jw-reset";b?(s.innerHTML=b,r.className=c+" jw-captions-window-active"):(r.className=c,a.empty(s))}function i(a){p=a,k(n,p)}function j(a,b){var c=a.source,e=b.metadata;return c?e&&d.isNumber(e[c])?e[c]:!1:b.position}function k(a,b){if(a&&a.data&&b){var c=j(a,b);if(c!==!1){var d=a.data;if(!(o>=0&&l(d,o,c))){for(var e=-1,f=0;f<d.length;f++)if(l(d,f,c)){e=f;break}-1===e?h(""):e!==o&&(o=e,h(t.preprocessor(d[o].text)))}}}}function l(a,b,c){return a[b].begin<=c&&(!a[b].end||a[b].end>=c)&&(b===a.length-1||a[b+1].begin>=c)}function m(a,c,d){var e=b.hexToRgba("#000000",d);"dropshadow"===a?c.textShadow="0 2px 1px "+e:"raised"===a?c.textShadow="0 0 5px "+e+", 0 1px 5px "+e+", 0 2px 5px "+e:"depressed"===a?c.textShadow="0 -2px 1px "+e:"uniform"===a&&(c.textShadow="-2px 0 1px "+e+",2px 0 1px "+e+",0 -2px 1px "+e+",0 2px 1px "+e+",-1px 1px 1px "+e+",1px 1px 1px "+e+",1px -1px 1px "+e+",1px 1px 1px "+e)}var n,o,p,q,r,s,t={};q=document.createElement("div"),q.className="jw-captions jw-reset",this.show=function(){q.className="jw-captions jw-captions-enabled jw-reset"},this.hide=function(){q.className="jw-captions jw-reset"},this.populate=function(a){return o=-1,n=a,a?void k(a,p):void h("")},this.resize=function(){var a=q.clientWidth,b=Math.pow(a/400,.6);if(b){var c=t.fontSize*b;e(q,{fontSize:Math.round(c)+"px"})}},this.setup=function(a){if(r=document.createElement("div"),s=document.createElement("span"),r.className="jw-captions-window jw-reset",s.className="jw-captions-text jw-reset",t=d.extend({},f,a),a){var c=t.fontOpacity,h=t.windowOpacity,i=t.edgeStyle,j=t.backgroundColor,k={},l={color:b.hexToRgba(t.color,c),fontFamily:t.fontFamily,fontStyle:t.fontStyle,fontWeight:t.fontWeight,textDecoration:t.textDecoration};h&&(k.backgroundColor=b.hexToRgba(t.windowColor,h)),m(i,l,c),t.back?l.backgroundColor=b.hexToRgba(j,t.backgroundOpacity):null===i&&m("uniform",l),e(r,k),e(s,l)}r.appendChild(s),q.appendChild(r),this.populate(g.get("captionsTrack"))},this.element=function(){return q},g.on("change:playlistItem",function(){p=null,o=-1,h("")},this),g.on("change:captionsTrack",function(a,b){this.populate(b)},this),g.mediaController.on("seek",function(){o=-1},this),g.mediaController.on("time seek",i,this),g.mediaController.on("subtitlesTrackData",function(){k(n,p)},this),g.on("change:state",function(a,b){switch(b){case c.IDLE:case c.ERROR:case c.COMPLETE:this.hide();break;default:this.show()}},this)};return g}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(127),c(46),c(47),c(45)],e=function(a,b,c,d){var e=function(e,f,g){function h(a){return e.get("flashBlocked")?void 0:k?void k(a):void o.trigger(a.type===b.touchEvents.CLICK?"click":"tap")}function i(){return l?void l():void o.trigger("doubleClick")}var j,k,l,m={enableDoubleTap:!0,useMove:!0};d.extend(this,c),j=f,this.element=function(){return j};var n=new a(j,d.extend(m,g));n.on("click tap",h),n.on("doubleClick doubleTap",i),n.on("move",function(){o.trigger("move")}),n.on("over",function(){o.trigger("over")}),n.on("out",function(){o.trigger("out")}),this.clickHandler=h;var o=this;this.setAlternateClickHandlers=function(a,b){k=a,l=b||null},this.revertAlternateClickHandlers=function(){k=null,l=null}};return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(47),c(127),c(131),c(45)],e=function(a,b,c,d,e){var f=function(f){e.extend(this,b),this.model=f,this.el=a.createElement(d({}));var g=this;this.iconUI=new c(this.el).on("click tap",function(a){g.trigger(a.type)})};return e.extend(f.prototype,{element:function(){return this.el}}),f}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){return'<div class="jw-display-icon-container jw-background-color jw-reset">\n    <div class="jw-icon jw-icon-display jw-button-color jw-reset"></div>\n</div>\n'},useData:!0})},function(a,b,c){var d,e;d=[c(127),c(48),c(46),c(45),c(47),c(133)],e=function(a,b,c,d,e,f){var g=b.style,h={linktarget:"_blank",margin:8,hide:!1,position:"top-right"},i=function(i){var j,k,l=new Image,m=d.extend({},i.get("logo"));return d.extend(this,e),this.setup=function(e){if(k=d.extend({},h,m),k.hide="true"===k.hide.toString(),j=b.createElement(f()),k.file){k.hide&&b.addClass(j,"jw-hide"),b.addClass(j,"jw-logo-"+(k.position||h.position)),"top-right"===k.position&&(i.on("change:dock",this.topRight,this),i.on("change:controls",this.topRight,this),this.topRight(i)),i.set("logo",k),l.onload=function(){var a={backgroundImage:'url("'+this.src+'")',width:this.width,height:this.height};if(k.margin!==h.margin){var b=/(\w+)-(\w+)/.exec(k.position);3===b.length&&(a["margin-"+b[1]]=k.margin,a["margin-"+b[2]]=k.margin)}g(j,a),i.set("logoWidth",a.width)},l.src=k.file;var n=new a(j);n.on("click tap",function(a){b.exists(a)&&a.stopPropagation&&a.stopPropagation(),this.trigger(c.JWPLAYER_LOGO_CLICK,{link:k.link,linktarget:k.linktarget})},this),e.appendChild(j)}},this.topRight=function(a){var b=a.get("controls"),c=a.get("dock"),d=b&&(c&&c.length||a.get("sharing")||a.get("related"));g(j,{top:d?"3.5em":0})},this.element=function(){return j},this.position=function(){return k.position},this.destroy=function(){l.onload=null},this};return i}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){return'<div class="jw-logo jw-reset"></div>'},useData:!0})},function(a,b,c){var d,e;d=[c(48),c(45),c(47),c(58),c(127),c(136),c(135),c(142),c(144),c(146),c(147)],e=function(a,b,c,d,e,f,g,h,i,j,k){function l(a,b){var c=document.createElement("div");return c.className="jw-icon jw-icon-inline jw-button-color jw-reset "+a,c.style.display="none",b&&new e(c).on("click tap",function(){b()}),{element:function(){return c},toggle:function(a){a?this.show():this.hide()},show:function(){c.style.display=""},hide:function(){c.style.display="none"}}}function m(a){var b=document.createElement("span");return b.className="jw-text jw-reset "+a,b}function n(a){var b=new h(a);return b}function o(a,c){var d=document.createElement("div");return d.className="jw-group jw-controlbar-"+a+"-group jw-reset",b.each(c,function(a){a.element&&(a=a.element()),d.appendChild(a)}),d}function p(b,c){this._api=b,this._model=c,this._isMobile=a.isMobile(),this._compactModeMaxSize=400,this._maxCompactWidth=-1,this.setup()}return b.extend(p.prototype,c,{setup:function(){this.build(),this.initialize()},build:function(){var a,c,d,e,h=new g(this._model,this._api),p=new k("jw-icon-more");this._model.get("visualplaylist")!==!1&&(a=new i("jw-icon-playlist")),this._isMobile||(e=l("jw-icon-volume",this._api.setMute),c=new f("jw-slider-volume","horizontal"),d=new j(this._model,"jw-icon-volume")),this.elements={alt:m("jw-text-alt"),play:l("jw-icon-playback",this._api.play.bind(this,{reason:"interaction"})),prev:l("jw-icon-prev",this._api.playlistPrev.bind(this,{reason:"interaction"})),next:l("jw-icon-next",this._api.playlistNext.bind(this,{reason:"interaction"})),playlist:a,elapsed:m("jw-text-elapsed"),time:h,duration:m("jw-text-duration"),drawer:p,hd:n("jw-icon-hd"),cc:n("jw-icon-cc"),audiotracks:n("jw-icon-audio-tracks"),mute:e,volume:c,volumetooltip:d,cast:l("jw-icon-cast jw-off",this._api.castToggle),fullscreen:l("jw-icon-fullscreen",this._api.setFullscreen)},this.layout={left:[this.elements.play,this.elements.prev,this.elements.playlist,this.elements.next,this.elements.elapsed],center:[this.elements.time,this.elements.alt],right:[this.elements.duration,this.elements.hd,this.elements.cc,this.elements.audiotracks,this.elements.drawer,this.elements.mute,this.elements.cast,this.elements.volume,this.elements.volumetooltip,this.elements.fullscreen],drawer:[this.elements.hd,this.elements.cc,this.elements.audiotracks]},this.menus=b.compact([this.elements.playlist,this.elements.hd,this.elements.cc,this.elements.audiotracks,this.elements.volumetooltip]),this.layout.left=b.compact(this.layout.left),this.layout.center=b.compact(this.layout.center),this.layout.right=b.compact(this.layout.right),this.layout.drawer=b.compact(this.layout.drawer),this.el=document.createElement("div"),this.el.className="jw-controlbar jw-background-color jw-reset",this.elements.left=o("left",this.layout.left),this.elements.center=o("center",this.layout.center),this.elements.right=o("right",this.layout.right),this.el.appendChild(this.elements.left),this.el.appendChild(this.elements.center),this.el.appendChild(this.elements.right)},initialize:function(){this.elements.play.show(),this.elements.fullscreen.show(),this.elements.mute&&this.elements.mute.show(),this.onVolume(this._model,this._model.get("volume")),this.onPlaylist(this._model,this._model.get("playlist")),this.onPlaylistItem(this._model,this._model.get("playlistItem")),this.onMediaModel(this._model,this._model.get("mediaModel")),this.onCastAvailable(this._model,this._model.get("castAvailable")),this.onCastActive(this._model,this._model.get("castActive")),this.onCaptionsList(this._model,this._model.get("captionsList")),this._model.on("change:volume",this.onVolume,this),this._model.on("change:mute",this.onMute,this),this._model.on("change:playlist",this.onPlaylist,this),this._model.on("change:playlistItem",this.onPlaylistItem,this),this._model.on("change:mediaModel",this.onMediaModel,this),this._model.on("change:castAvailable",this.onCastAvailable,this),this._model.on("change:castActive",this.onCastActive,this),this._model.on("change:duration",this.onDuration,this),this._model.on("change:position",this.onElapsed,this),this._model.on("change:fullscreen",this.onFullscreen,this),this._model.on("change:captionsList",this.onCaptionsList,this),this._model.on("change:captionsIndex",this.onCaptionsIndex,this),this._model.on("change:compactUI",this.onCompactUI,this),this.elements.volume&&this.elements.volume.on("update",function(a){var b=a.percentage;this._api.setVolume(b)},this),this.elements.volumetooltip&&(this.elements.volumetooltip.on("update",function(a){var b=a.percentage;this._api.setVolume(b)},this),this.elements.volumetooltip.on("toggleValue",function(){this._api.setMute()},this)),this.elements.playlist&&this.elements.playlist.on("select",function(a){this._model.once("itemReady",function(){this._api.play({reason:"interaction"})},this),this._api.load(a)},this),this.elements.hd.on("select",function(a){this._model.getVideo().setCurrentQuality(a)},this),this.elements.hd.on("toggleValue",function(){this._model.getVideo().setCurrentQuality(0===this._model.getVideo().getCurrentQuality()?1:0)},this),this.elements.cc.on("select",function(a){this._api.setCurrentCaptions(a)},this),this.elements.cc.on("toggleValue",function(){var a=this._model.get("captionsIndex");this._api.setCurrentCaptions(a?0:1)},this),this.elements.audiotracks.on("select",function(a){this._model.getVideo().setCurrentAudioTrack(a)},this),new e(this.elements.duration).on("click tap",function(){if("DVR"===a.adaptiveType(this._model.get("duration"))){var b=this._model.get("position");this._api.seek(Math.max(d.dvrSeekLimit,b))}},this),new e(this.el).on("click tap drag",function(){this.trigger("userAction")},this),this.elements.drawer.on("open-drawer close-drawer",function(b,c){a.toggleClass(this.el,"jw-drawer-expanded",c.isOpen),c.isOpen||this.closeMenus()},this),b.each(this.menus,function(a){a.on("open-tooltip",this.closeMenus,this)},this)},onCaptionsList:function(a,b){var c=a.get("captionsIndex");this.elements.cc.setup(b,c),this.clearCompactMode()},onCaptionsIndex:function(a,b){this.elements.cc.selectItem(b)},onPlaylist:function(a,b){var c=b.length>1;this.elements.next.toggle(c),this.elements.prev.toggle(c),this.elements.playlist&&this.elements.playlist.setup(b,a.get("item"))},onPlaylistItem:function(a){this.elements.time.updateBuffer(0),this.elements.time.render(0),this.elements.duration.innerHTML="00:00",this.elements.elapsed.innerHTML="00:00",this.clearCompactMode();var b=a.get("item");this.elements.playlist&&this.elements.playlist.selectItem(b),this.elements.audiotracks.setup()},onMediaModel:function(c,d){d.on("change:levels",function(a,b){this.elements.hd.setup(b,a.get("currentLevel")),this.clearCompactMode()},this),d.on("change:currentLevel",function(a,b){this.elements.hd.selectItem(b)},this),d.on("change:audioTracks",function(a,c){var d=b.map(c,function(a){return{label:a.name}});this.elements.audiotracks.setup(d,a.get("currentAudioTrack"),{toggle:!1}),this.clearCompactMode()},this),d.on("change:currentAudioTrack",function(a,b){this.elements.audiotracks.selectItem(b)},this),d.on("change:state",function(b,c){"complete"===c&&(this.elements.drawer.closeTooltip(),a.removeClass(this.el,"jw-drawer-expanded"))},this)},onVolume:function(a,b){this.renderVolume(a.get("mute"),b)},onMute:function(a,b){this.renderVolume(b,a.get("volume"))},renderVolume:function(b,c){this.elements.mute&&a.toggleClass(this.elements.mute.element(),"jw-off",b),this.elements.volume&&this.elements.volume.render(b?0:c),this.elements.volumetooltip&&(this.elements.volumetooltip.volumeSlider.render(b?0:c),a.toggleClass(this.elements.volumetooltip.element(),"jw-off",b))},onCastAvailable:function(a,b){this.elements.cast.toggle(b),this.clearCompactMode()},onCastActive:function(b,c){a.toggleClass(this.elements.cast.element(),"jw-off",!c)},onElapsed:function(b,c){var d,e=b.get("duration");d="DVR"===a.adaptiveType(e)?"-"+a.timeFormat(-e):a.timeFormat(c),this.elements.elapsed.innerHTML=d},onDuration:function(b,c){var d;"DVR"===a.adaptiveType(c)?(d="Live",this.clearCompactMode()):d=a.timeFormat(c),this.elements.duration.innerHTML=d},onFullscreen:function(b,c){a.toggleClass(this.elements.fullscreen.element(),"jw-off",c)},element:function(){return this.el},getVisibleBounds:function(){var b,c=this.el,d=getComputedStyle?getComputedStyle(c):c.currentStyle;return"table"===d.display?a.bounds(c):(c.style.visibility="hidden",c.style.display="table",b=a.bounds(c),c.style.visibility=c.style.display="",b)},setAltText:function(a){this.elements.alt.innerHTML=a},addCues:function(a){this.elements.time&&(b.each(a,function(a){this.elements.time.addCue(a)},this),this.elements.time.drawCues())},closeMenus:function(a){b.each(this.menus,function(b){a&&a.target===b.el||b.closeTooltip(a)})},hideComponents:function(){this.closeMenus(),this.elements.drawer.closeTooltip(),a.removeClass(this.el,"jw-drawer-expanded")},clearCompactMode:function(){this._maxCompactWidth=-1,this._model.set("compactUI",!1),this._containerWidth&&this.checkCompactMode(this._containerWidth)},setCompactModeBounds:function(){if(this.element().offsetWidth>0){var b=this.elements.left.offsetWidth+this.elements.right.offsetWidth;if("LIVE"===a.adaptiveType(this._model.get("duration")))this._maxCompactWidth=b+this.elements.alt.offsetWidth;else{var c=b+(this.elements.center.offsetWidth-this.elements.time.el.offsetWidth),d=.2;this._maxCompactWidth=c/(1-d)}}},checkCompactMode:function(a){-1===this._maxCompactWidth&&this.setCompactModeBounds(),this._containerWidth=a,-1!==this._maxCompactWidth&&(a>=this._compactModeMaxSize&&a>this._maxCompactWidth?this._model.set("compactUI",!1):(a<this._compactModeMaxSize||a<=this._maxCompactWidth)&&this._model.set("compactUI",!0))},onCompactUI:function(c,d){a.removeClass(this.el,"jw-drawer-expanded"),this.elements.drawer.setup(this.layout.drawer,d),(!d||this.elements.drawer.activeContents.length<2)&&b.each(this.layout.drawer,function(a){this.elements.right.insertBefore(a.el,this.elements.drawer.el)},this)}}),p}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(48),c(58),c(136),c(139),c(140),c(141)],e=function(a,b,c,d,e,f,g){var h=e.extend({setup:function(){this.text=document.createElement("span"),this.text.className="jw-text jw-reset",this.img=document.createElement("div"),this.img.className="jw-reset";var a=document.createElement("div");a.className="jw-time-tip jw-background-color jw-reset",a.appendChild(this.img),a.appendChild(this.text),b.removeClass(this.el,"jw-hidden"),this.addContent(a)},image:function(a){b.style(this.img,a)},update:function(a){this.text.innerHTML=a}}),i=d.extend({constructor:function(b,c){this._model=b,this._api=c,this.timeTip=new h("jw-tooltip-time"),this.timeTip.setup(),this.cues=[],this.seekThrottled=a.throttle(this.performSeek,400),this._model.on("change:playlistItem",this.onPlaylistItem,this).on("change:position",this.onPosition,this).on("change:duration",this.onDuration,this).on("change:buffer",this.onBuffer,this),d.call(this,"jw-slider-time","horizontal")},setup:function(){d.prototype.setup.apply(this,arguments),this._model.get("playlistItem")&&this.onPlaylistItem(this._model,this._model.get("playlistItem")),this.elementRail.appendChild(this.timeTip.element()),this.el.addEventListener("mousemove",this.showTimeTooltip.bind(this),!1),this.el.addEventListener("mouseout",this.hideTimeTooltip.bind(this),!1)},limit:function(d){if(this.activeCue&&a.isNumber(this.activeCue.pct))return this.activeCue.pct;var e=this._model.get("duration"),f=b.adaptiveType(e);if("DVR"===f){var g=(1-d/100)*e,h=this._model.get("position"),i=Math.min(g,Math.max(c.dvrSeekLimit,h)),j=100*i/e;return 100-j}return d},update:function(a){this.seekTo=a,this.seekThrottled(),d.prototype.update.apply(this,arguments)},dragStart:function(){this._model.set("scrubbing",!0),d.prototype.dragStart.apply(this,arguments)},dragEnd:function(){d.prototype.dragEnd.apply(this,arguments),this._model.set("scrubbing",!1)},onSeeked:function(){this._model.get("scrubbing")&&this.performSeek()},onBuffer:function(a,b){this.updateBuffer(b)},onPosition:function(a,b){this.updateTime(b,a.get("duration"))},onDuration:function(a,b){this.updateTime(a.get("position"),b)},updateTime:function(a,c){var d=0;if(c){var e=b.adaptiveType(c);"DVR"===e?d=(c-a)/c*100:"VOD"===e&&(d=a/c*100)}this.render(d)},onPlaylistItem:function(b,c){this.reset(),b.mediaModel.on("seeked",this.onSeeked,this);var d=c.tracks;a.each(d,function(a){a&&a.kind&&"thumbnails"===a.kind.toLowerCase()?this.loadThumbnails(a.file):a&&a.kind&&"chapters"===a.kind.toLowerCase()&&this.loadChapters(a.file)},this)},performSeek:function(){var a,c=this.seekTo,d=this._model.get("duration"),e=b.adaptiveType(d);0===d?this._api.play():"DVR"===e?(a=(100-c)/100*d,this._api.seek(a)):(a=c/100*d,this._api.seek(Math.min(a,d-.25)))},showTimeTooltip:function(a){var d=this._model.get("duration");if(0!==d){var e=b.bounds(this.elementRail),f=a.pageX?a.pageX-e.left:a.x;f=b.between(f,0,e.width);var g=f/e.width,h=d*g;0>d&&(h=d-h);var i;if(this.activeCue)i=this.activeCue.text;else{var j=!0;i=b.timeFormat(h,j),0>d&&h>c.dvrSeekLimit&&(i="Live")}this.timeTip.update(i),this.showThumbnail(h),b.addClass(this.timeTip.el,"jw-open"),this.timeTip.el.style.left=100*g+"%"}},hideTimeTooltip:function(){b.removeClass(this.timeTip.el,"jw-open")},reset:function(){this.resetChapters(),this.resetThumbnails()}});return a.extend(i.prototype,f,g),i}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(137),c(127),c(138),c(48)],e=function(a,b,c,d){var e=a.extend({constructor:function(a,b){this.className=a+" jw-background-color jw-reset",this.orientation=b,this.dragStartListener=this.dragStart.bind(this),this.dragMoveListener=this.dragMove.bind(this),this.dragEndListener=this.dragEnd.bind(this),this.tapListener=this.tap.bind(this),this.setup()},setup:function(){var a={"default":this["default"],className:this.className,orientation:"jw-slider-"+this.orientation};this.el=d.createElement(c(a)),this.elementRail=this.el.getElementsByClassName("jw-slider-container")[0],this.elementBuffer=this.el.getElementsByClassName("jw-buffer")[0],this.elementProgress=this.el.getElementsByClassName("jw-progress")[0],this.elementThumb=this.el.getElementsByClassName("jw-knob")[0],this.userInteract=new b(this.element(),{preventScrolling:!0}),this.userInteract.on("dragStart",this.dragStartListener),this.userInteract.on("drag",this.dragMoveListener),this.userInteract.on("dragEnd",this.dragEndListener),this.userInteract.on("tap click",this.tapListener)},dragStart:function(){this.trigger("dragStart"),this.railBounds=d.bounds(this.elementRail)},dragEnd:function(a){this.dragMove(a),this.trigger("dragEnd")},dragMove:function(a){var b,c,e=this.railBounds=this.railBounds?this.railBounds:d.bounds(this.elementRail);"horizontal"===this.orientation?(b=a.pageX,c=b<e.left?0:b>e.right?100:100*d.between((b-e.left)/e.width,0,1)):(b=a.pageY,c=b>=e.bottom?0:b<=e.top?100:100*d.between((e.height-(b-e.top))/e.height,0,1));var f=this.limit(c);return this.render(f),this.update(f),!1},tap:function(a){this.railBounds=d.bounds(this.elementRail),this.dragMove(a)},limit:function(a){return a},update:function(a){this.trigger("update",{percentage:a})},render:function(a){a=Math.max(0,Math.min(a,100)),"horizontal"===this.orientation?(this.elementThumb.style.left=a+"%",this.elementProgress.style.width=a+"%"):(this.elementThumb.style.bottom=a+"%",this.elementProgress.style.height=a+"%")},updateBuffer:function(a){this.elementBuffer.style.width=a+"%"},element:function(){return this.el}});return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(47),c(45)],e=function(a,b){function c(){}var d=function(a,c){var d,e=this;d=a&&b.has(a,"constructor")?a.constructor:function(){return e.apply(this,arguments)},b.extend(d,e,c);var f=function(){this.constructor=d};return f.prototype=e.prototype,d.prototype=new f,a&&b.extend(d.prototype,a),d.__super__=e.prototype,d};return c.extend=d,b.extend(c.prototype,a),c}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return'<div class="'+h((e=null!=(e=b.className||(null!=a?a.className:a))?e:g,typeof e===f?e.call(a,{name:"className",hash:{},data:d}):e))+" "+h((e=null!=(e=b.orientation||(null!=a?a.orientation:a))?e:g,typeof e===f?e.call(a,{name:"orientation",hash:{},data:d}):e))+' jw-reset">\n    <div class="jw-slider-container jw-reset">\n        <div class="jw-rail jw-reset"></div>\n        <div class="jw-buffer jw-reset"></div>\n        <div class="jw-progress jw-reset"></div>\n        <div class="jw-knob jw-reset"></div>\n    </div>\n</div>'},useData:!0})},function(a,b,c){var d,e;d=[c(137),c(48)],e=function(a,b){var c=a.extend({constructor:function(a){this.el=document.createElement("div"),this.el.className="jw-icon jw-icon-tooltip "+a+" jw-button-color jw-reset jw-hidden",this.container=document.createElement("div"),this.container.className="jw-overlay jw-reset",this.openClass="jw-open",this.componentType="tooltip",this.el.appendChild(this.container)},addContent:function(a){this.content&&this.removeContent(),this.content=a,this.container.appendChild(a)},removeContent:function(){this.content&&(this.container.removeChild(this.content),this.content=null)},hasContent:function(){return!!this.content},element:function(){return this.el},openTooltip:function(a){this.trigger("open-"+this.componentType,a,{isOpen:!0}),this.isOpen=!0,b.toggleClass(this.el,this.openClass,this.isOpen)},closeTooltip:function(a){this.trigger("close-"+this.componentType,a,{isOpen:!1}),this.isOpen=!1,b.toggleClass(this.el,this.openClass,this.isOpen)},toggleOpenState:function(a){this.isOpen?this.closeTooltip(a):this.openTooltip(a)}});return c}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(48),c(112)],e=function(a,b,c){function d(a,b){this.time=a,this.text=b,this.el=document.createElement("div"),this.el.className="jw-cue jw-reset"}a.extend(d.prototype,{align:function(a){if("%"===this.time.toString().slice(-1))this.pct=this.time;else{var b=this.time/a*100;this.pct=b+"%"}this.el.style.left=this.pct}});var e={loadChapters:function(a){b.ajax(a,this.chaptersLoaded.bind(this),this.chaptersFailed,{plainText:!0})},chaptersLoaded:function(b){var d=c(b.responseText);a.isArray(d)&&(a.each(d,this.addCue,this),this.drawCues())},chaptersFailed:function(){},addCue:function(a){this.cues.push(new d(a.begin,a.text))},drawCues:function(){var b=this._model.mediaModel.get("duration");if(!b||0>=b)return void this._model.mediaModel.once("change:duration",this.drawCues,this);var c=this;a.each(this.cues,function(a){a.align(b),a.el.addEventListener("mouseover",function(){c.activeCue=a}),a.el.addEventListener("mouseout",function(){c.activeCue=null}),c.elementRail.appendChild(a.el)})},resetChapters:function(){a.each(this.cues,function(a){a.el.parentNode&&a.el.parentNode.removeChild(a.el)},this),this.cues=[]}};return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(48),c(112)],e=function(a,b,c){function d(a){this.begin=a.begin,this.end=a.end,this.img=a.text}var e={loadThumbnails:function(a){a&&(this.vttPath=a.split("?")[0].split("/").slice(0,-1).join("/"),this.individualImage=null,b.ajax(a,this.thumbnailsLoaded.bind(this),this.thumbnailsFailed.bind(this),{plainText:!0}))},thumbnailsLoaded:function(b){var e=c(b.responseText);a.isArray(e)&&(a.each(e,function(a){this.thumbnails.push(new d(a))},this),this.drawCues())},thumbnailsFailed:function(){},chooseThumbnail:function(b){var c=a.sortedIndex(this.thumbnails,{end:b},a.property("end"));c>=this.thumbnails.length&&(c=this.thumbnails.length-1);var d=this.thumbnails[c].img;return d.indexOf("://")<0&&(d=this.vttPath?this.vttPath+"/"+d:d),d},loadThumbnail:function(b){var c=this.chooseThumbnail(b),d={display:"block",margin:"0 auto",backgroundPosition:"0 0"},e=c.indexOf("#xywh");if(e>0)try{var f=/(.+)\#xywh=(\d+),(\d+),(\d+),(\d+)/.exec(c);c=f[1],d.backgroundPosition=-1*f[2]+"px "+-1*f[3]+"px",d.width=f[4],d.height=f[5]}catch(g){return}else this.individualImage||(this.individualImage=new Image,this.individualImage.onload=a.bind(function(){this.individualImage.onload=null,this.timeTip.image({width:this.individualImage.width,height:this.individualImage.height})},this),this.individualImage.src=c);return d.backgroundImage='url("'+c+'")',d},showThumbnail:function(a){this.thumbnails.length<1||this.timeTip.image(this.loadThumbnail(a))},resetThumbnails:function(){this.timeTip.image({backgroundImage:"",width:0,height:0}),this.thumbnails=[]}};return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(139),c(48),c(45),c(127),c(143)],e=function(a,b,c,d,e){var f=a.extend({setup:function(a,f,g){this.iconUI||(this.iconUI=new d(this.el,{useHover:!0,directSelect:!0}),this.toggleValueListener=this.toggleValue.bind(this),this.toggleOpenStateListener=this.toggleOpenState.bind(this),this.openTooltipListener=this.openTooltip.bind(this),this.closeTooltipListener=this.closeTooltip.bind(this),
this.selectListener=this.select.bind(this)),this.reset(),a=c.isArray(a)?a:[],b.toggleClass(this.el,"jw-hidden",a.length<2);var h=a.length>2||2===a.length&&g&&g.toggle===!1,i=!h&&2===a.length;if(b.toggleClass(this.el,"jw-toggle",i),b.toggleClass(this.el,"jw-button-color",!i),this.isActive=h||i,h){b.removeClass(this.el,"jw-off"),this.iconUI.on("tap",this.toggleOpenStateListener).on("over",this.openTooltipListener).on("out",this.closeTooltipListener);var j=e(a),k=b.createElement(j);this.addContent(k),this.contentUI=new d(this.content).on("click tap",this.selectListener)}else i&&this.iconUI.on("click tap",this.toggleValueListener);this.selectItem(f)},toggleValue:function(){this.trigger("toggleValue")},select:function(a){if(a.target.parentElement===this.content){var d=b.classList(a.target),e=c.find(d,function(a){return 0===a.indexOf("jw-item")});e&&(this.trigger("select",parseInt(e.split("-")[2])),this.closeTooltipListener())}},selectItem:function(a){if(this.content)for(var c=0;c<this.content.children.length;c++)b.toggleClass(this.content.children[c],"jw-active-option",a===c);else b.toggleClass(this.el,"jw-off",0===a)},reset:function(){b.addClass(this.el,"jw-off"),this.iconUI.off(),this.contentUI&&this.contentUI.off().destroy(),this.removeContent()}});return f}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({1:function(a,b,c,d){var e=this.lambda,f=this.escapeExpression;return"        <li class='jw-text jw-option jw-item-"+f(e(d&&d.index,a))+" jw-reset'>"+f(e(null!=a?a.label:a,a))+"</li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<ul class="jw-menu jw-background-color jw-reset">\n';return e=b.each.call(a,a,{name:"each",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+"</ul>"},useData:!0})},function(a,b,c){var d,e;d=[c(48),c(45),c(139),c(127),c(145)],e=function(a,b,c,d,e){var f=c.extend({setup:function(c,e){if(this.iconUI||(this.iconUI=new d(this.el,{useHover:!0}),this.toggleOpenStateListener=this.toggleOpenState.bind(this),this.openTooltipListener=this.openTooltip.bind(this),this.closeTooltipListener=this.closeTooltip.bind(this),this.selectListener=this.onSelect.bind(this)),this.reset(),c=b.isArray(c)?c:[],a.toggleClass(this.el,"jw-hidden",c.length<2),c.length>=2){this.iconUI=new d(this.el,{useHover:!0}).on("tap",this.toggleOpenStateListener).on("over",this.openTooltipListener).on("out",this.closeTooltipListener);var f=this.menuTemplate(c,e),g=a.createElement(f);this.addContent(g),this.contentUI=new d(this.content),this.contentUI.on("click tap",this.selectListener)}this.originalList=c},menuTemplate:function(a,c){var d=b.map(a,function(a,b){return{active:b===c,label:b+1+".",title:a.title}});return e(d)},onSelect:function(c){var d=c.target;if("UL"!==d.tagName){"LI"!==d.tagName&&(d=d.parentElement);var e=a.classList(d),f=b.find(e,function(a){return 0===a.indexOf("jw-item")});f&&(this.trigger("select",parseInt(f.split("-")[2])),this.closeTooltip())}},selectItem:function(a){this.setup(this.originalList,a)},reset:function(){this.iconUI.off(),this.contentUI&&this.contentUI.off().destroy(),this.removeContent()}});return f}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({1:function(a,b,c,d){var e,f="";return e=b["if"].call(a,null!=a?a.active:a,{name:"if",hash:{},fn:this.program(2,d),inverse:this.program(4,d),data:d}),null!=e&&(f+=e),f},2:function(a,b,c,d){var e=this.lambda,f=this.escapeExpression;return"                <li class='jw-option jw-text jw-active-option jw-item-"+f(e(d&&d.index,a))+' jw-reset\'>\n                    <span class="jw-label jw-reset"><span class="jw-icon jw-icon-play jw-reset"></span></span>\n                    <span class="jw-name jw-reset">'+f(e(null!=a?a.title:a,a))+"</span>\n                </li>\n"},4:function(a,b,c,d){var e=this.lambda,f=this.escapeExpression;return"                <li class='jw-option jw-text jw-item-"+f(e(d&&d.index,a))+' jw-reset\'>\n                    <span class="jw-label jw-reset">'+f(e(null!=a?a.label:a,a))+'</span>\n                    <span class="jw-name jw-reset">'+f(e(null!=a?a.title:a,a))+"</span>\n                </li>\n"},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="jw-menu jw-playlist-container jw-background-color jw-reset">\n\n    <div class="jw-tooltip-title jw-reset">\n        <span class="jw-icon jw-icon-inline jw-icon-playlist jw-reset"></span>\n        <span class="jw-text jw-reset">PLAYLIST</span>\n    </div>\n\n    <ul class="jw-playlist jw-reset">\n';return e=b.each.call(a,a,{name:"each",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+"    </ul>\n</div>"},useData:!0})},function(a,b,c){var d,e;d=[c(139),c(136),c(127),c(48)],e=function(a,b,c,d){var e=a.extend({constructor:function(e,f){this._model=e,a.call(this,f),this.volumeSlider=new b("jw-slider-volume jw-volume-tip","vertical"),this.addContent(this.volumeSlider.element()),this.volumeSlider.on("update",function(a){this.trigger("update",a)},this),d.removeClass(this.el,"jw-hidden"),new c(this.el,{useHover:!0,directSelect:!0}).on("click",this.toggleValue,this).on("tap",this.toggleOpenState,this).on("over",this.openTooltip,this).on("out",this.closeTooltip,this),this._model.on("change:volume",this.onVolume,this)},toggleValue:function(){this.trigger("toggleValue")}});return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(139),c(48),c(45),c(127)],e=function(a,b,c,d){var e=a.extend({constructor:function(b){a.call(this,b),this.container.className="jw-overlay-horizontal jw-reset",this.openClass="jw-open-drawer",this.componentType="drawer"},setup:function(a,e){this.iconUI||(this.iconUI=new d(this.el,{useHover:!0,directSelect:!0}),this.toggleOpenStateListener=this.toggleOpenState.bind(this),this.openTooltipListener=this.openTooltip.bind(this),this.closeTooltipListener=this.closeTooltip.bind(this)),this.reset(),a=c.isArray(a)?a:[],this.activeContents=c.filter(a,function(a){return a.isActive}),b.toggleClass(this.el,"jw-hidden",!e||this.activeContents.length<2),e&&this.activeContents.length>1&&(b.removeClass(this.el,"jw-off"),this.iconUI.on("tap",this.toggleOpenStateListener).on("over",this.openTooltipListener).on("out",this.closeTooltipListener),c.each(a,function(a){this.container.appendChild(a.el)},this))},reset:function(){b.addClass(this.el,"jw-off"),this.iconUI.off(),this.contentUI&&this.contentUI.off().destroy(),this.removeContent()}});return e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(48)],e=function(a,b){function c(a,b){b.off("change:mediaType",null,this),b.on("change:mediaType",function(b,c){"audio"===c&&this.setImage(a.get("playlistItem").image)},this)}function d(a,c){var d=a.get("autostart")&&!b.isMobile()||a.get("item")>0;return d?(this.setImage(null),a.off("change:state",null,this),void a.on("change:state",function(a,b){"complete"!==b&&"idle"!==b&&"error"!==b||this.setImage(c.image)},this)):void this.setImage(c.image)}var e=function(a){this.model=a,a.on("change:playlistItem",d,this),a.on("change:mediaModel",c,this)};return a.extend(e.prototype,{setup:function(a){this.el=a;var b=this.model.get("playlistItem");b&&this.setImage(b.image)},setImage:function(c){this.model.off("change:state",null,this);var d="";a.isString(c)&&(d='url("'+c+'")'),b.style(this.el,{backgroundImage:d})},element:function(){return this.el}}),e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(150),c(45),c(59)],e=function(a,b,c){var d={free:"f",premium:"r",enterprise:"e",ads:"a",unlimited:"u",trial:"t"},e=function(){};return b.extend(e.prototype,a.prototype,{buildArray:function(){var b=a.prototype.buildArray.apply(this,arguments),e=this.model.get("edition"),f="https://jwplayer.com/learn-more/?m=h&e="+(d[e]||e)+"&v="+c;if(b.items[0].link=f,this.model.get("abouttext")){b.items[0].showLogo=!1,b.items.push(b.items.shift());var g={title:this.model.get("abouttext"),link:this.model.get("aboutlink")||f};b.items.unshift(g)}return b}}),e}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(48),c(151),c(45),c(127),c(59)],e=function(a,b,c,d,e){var f=function(){};return c.extend(f.prototype,{buildArray:function(){var b=e.split("+"),c=b[0],d={items:[{title:"Powered by JW Player "+c,featured:!0,showLogo:!0,link:"https://jwplayer.com/learn-more/?m=h&e=o&v="+e}]},f=c.indexOf("-")>0,g=b[1];if(f&&g){var h=g.split(".");d.items.push({title:"build: ("+h[0]+"."+h[1]+")",link:"#"})}var i=this.model.get("provider").name;if(i.indexOf("flash")>=0){var j="Flash Version "+a.flashVersion();d.items.push({title:j,link:"http://www.adobe.com/software/flash/about/"})}return d},buildMenu:function(){var c=this.buildArray();return a.createElement(b(c))},updateHtml:function(){this.el.innerHTML=this.buildMenu().innerHTML},rightClick:function(a){return this.lazySetup(),this.mouseOverContext?!1:(this.hideMenu(),this.showMenu(a),!1)},getOffset:function(a){for(var b=a.target,c=a.offsetX||a.layerX,d=a.offsetY||a.layerY;b!==this.playerElement;)c+=b.offsetLeft,d+=b.offsetTop,b=b.parentNode;return{x:c,y:d}},showMenu:function(b){var c=this.getOffset(b);return this.el.style.left=c.x+"px",this.el.style.top=c.y+"px",a.addClass(this.playerElement,"jw-flag-rightclick-open"),a.addClass(this.el,"jw-open"),!1},hideMenu:function(){this.mouseOverContext||(a.removeClass(this.playerElement,"jw-flag-rightclick-open"),a.removeClass(this.el,"jw-open"))},lazySetup:function(){this.el||(this.el=this.buildMenu(),this.layer.appendChild(this.el),this.hideMenuHandler=this.hideMenu.bind(this),this.addOffListener(this.playerElement),this.addOffListener(document),this.model.on("change:provider",this.updateHtml,this),this.elementUI=new d(this.el,{useHover:!0}).on("over",function(){this.mouseOverContext=!0},this).on("out",function(){this.mouseOverContext=!1},this))},setup:function(a,b,c){this.playerElement=b,this.model=a,this.mouseOverContext=!1,this.layer=c,b.oncontextmenu=this.rightClick.bind(this)},addOffListener:function(a){a.addEventListener("mousedown",this.hideMenuHandler),a.addEventListener("touchstart",this.hideMenuHandler),a.addEventListener("pointerdown",this.hideMenuHandler)},removeOffListener:function(a){a.removeEventListener("mousedown",this.hideMenuHandler),a.removeEventListener("touchstart",this.hideMenuHandler),a.removeEventListener("pointerdown",this.hideMenuHandler)},destroy:function(){this.el&&(this.hideMenu(),this.elementUI.off(),this.removeOffListener(this.playerElement),this.removeOffListener(document),this.hideMenuHandler=null,this.el=null),this.playerElement&&(this.playerElement.oncontextmenu=null,this.playerElement=null),this.model&&(this.model.off("change:provider",this.updateHtml),this.model=null)}}),f}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({1:function(a,b,c,d){var e,f,g="function",h=b.helperMissing,i=this.escapeExpression,j='        <li class="jw-reset';return e=b["if"].call(a,null!=a?a.featured:a,{name:"if",hash:{},fn:this.program(2,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+='">\n            <a href="'+i((f=null!=(f=b.link||(null!=a?a.link:a))?f:h,typeof f===g?f.call(a,{name:"link",hash:{},data:d}):f))+'" class="jw-reset" target="_top">\n',e=b["if"].call(a,null!=a?a.showLogo:a,{name:"if",hash:{},fn:this.program(4,d),inverse:this.noop,data:d}),null!=e&&(j+=e),j+"                "+i((f=null!=(f=b.title||(null!=a?a.title:a))?f:h,typeof f===g?f.call(a,{name:"title",hash:{},data:d}):f))+"\n            </a>\n        </li>\n"},2:function(a,b,c,d){return" jw-featured"},4:function(a,b,c,d){return'                <span class="jw-icon jw-rightclick-logo jw-reset"></span>\n'},compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f='<div class="jw-rightclick jw-reset">\n    <ul class="jw-reset">\n';return e=b.each.call(a,null!=a?a.items:a,{name:"each",hash:{},fn:this.program(1,d),inverse:this.noop,data:d}),null!=e&&(f+=e),f+"    </ul>\n</div>"},useData:!0})},function(a,b,c){var d,e;d=[c(45),c(48)],e=function(a,b){var c=function(a){this.model=a,this.model.on("change:playlistItem",this.playlistItem,this)};return a.extend(c.prototype,{hide:function(){this.el.style.display="none"},show:function(){this.el.style.display=""},setup:function(a){this.el=a;var b=this.el.getElementsByTagName("div");this.title=b[0],this.description=b[1],this.model.get("playlistItem")&&this.playlistItem(this.model,this.model.get("playlistItem")),this.model.on("change:logoWidth",this.update,this),this.model.on("change:dock",this.update,this)},update:function(a){var c={paddingLeft:0,paddingRight:0},d=a.get("controls"),e=a.get("dock"),f=a.get("logo");if(f){var g=1*(""+f.margin).replace("px",""),h=a.get("logoWidth")+(isNaN(g)?0:g);"top-left"===f.position?c.paddingLeft=h:"top-right"===f.position&&(c.paddingRight=h)}if(d&&e&&e.length){var i=56*e.length;c.paddingRight=Math.max(c.paddingRight,i)}b.style(this.el,c)},playlistItem:function(a,b){if(a.get("displaytitle")||a.get("displaydescription")){var c="",d="";b.title&&a.get("displaytitle")&&(c=b.title),b.description&&a.get("displaydescription")&&(d=b.description),this.updateText(c,d)}else this.hide()},updateText:function(a,b){this.title.innerHTML=a,this.description.innerHTML=b,this.title.firstChild||this.description.firstChild?this.show():this.hide()},element:function(){return this.el}}),c}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return'<div id="'+h((e=null!=(e=b.id||(null!=a?a.id:a))?e:g,typeof e===f?e.call(a,{name:"id",hash:{},data:d}):e))+'" class="jwplayer jw-reset" tabindex="0">\n    <div class="jw-aspect jw-reset"></div>\n    <div class="jw-media jw-reset"></div>\n    <div class="jw-preview jw-reset"></div>\n    <div class="jw-title jw-reset">\n        <div class="jw-title-primary jw-reset"></div>\n        <div class="jw-title-secondary jw-reset"></div>\n    </div>\n    <div class="jw-overlays jw-reset"></div>\n    <div class="jw-controls jw-reset"></div>\n</div>'},useData:!0})},function(a,b,c){var d,e;d=[c(48),c(46),c(127),c(47),c(45),c(155)],e=function(a,b,c,d,e,f){var g=function(a){this.model=a,this.setup()};return e.extend(g.prototype,d,{setup:function(){this.destroy(),this.skipMessage=this.model.get("skipText"),this.skipMessageCountdown=this.model.get("skipMessage"),this.setWaitTime(this.model.get("skipOffset"));var b=f();this.el=a.createElement(b),this.skiptext=this.el.getElementsByClassName("jw-skiptext")[0],this.skipAdOnce=e.once(this.skipAd.bind(this)),new c(this.el).on("click tap",e.bind(function(){this.skippable&&this.skipAdOnce()},this)),this.model.on("change:duration",this.onChangeDuration,this),this.model.on("change:position",this.onChangePosition,this),this.onChangeDuration(this.model,this.model.get("duration")),this.onChangePosition(this.model,this.model.get("position"))},updateMessage:function(a){this.skiptext.innerHTML=a},updateCountdown:function(a){this.updateMessage(this.skipMessageCountdown.replace(/xx/gi,Math.ceil(this.waitTime-a)))},onChangeDuration:function(b,c){if(c){if(this.waitPercentage){if(!c)return;this.itemDuration=c,this.setWaitTime(this.waitPercentage),delete this.waitPercentage}a.removeClass(this.el,"jw-hidden")}},onChangePosition:function(b,c){this.waitTime-c>0?this.updateCountdown(c):(this.updateMessage(this.skipMessage),this.skippable=!0,a.addClass(this.el,"jw-skippable"))},element:function(){return this.el},setWaitTime:function(b){if(e.isString(b)&&"%"===b.slice(-1)){var c=parseFloat(b);return void(this.itemDuration&&!isNaN(c)?this.waitTime=this.itemDuration*c/100:this.waitPercentage=b)}e.isNumber(b)?this.waitTime=b:"string"===a.typeOf(b)?this.waitTime=a.seconds(b):isNaN(Number(b))?this.waitTime=0:this.waitTime=Number(b)},skipAd:function(){this.trigger(b.JWPLAYER_AD_SKIPPED)},destroy:function(){this.el&&(this.el.removeEventListener("click",this.skipAdOnce),this.el.parentElement&&this.el.parentElement.removeChild(this.el)),delete this.skippable,delete this.itemDuration,delete this.waitPercentage}}),g}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){return'<div class="jw-skip jw-background-color jw-hidden jw-reset">\n    <span class="jw-text jw-skiptext jw-reset"></span>\n    <span class="jw-icon-inline jw-skip-icon jw-reset"></span>\n</div>'},useData:!0})},function(a,b,c){var d,e;d=[c(157)],e=function(a){function b(b,c,d,e){return a({id:b,skin:c,title:d,body:e})}return b}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e,f="function",g=b.helperMissing,h=this.escapeExpression;return'<div id="'+h((e=null!=(e=b.id||(null!=a?a.id:a))?e:g,typeof e===f?e.call(a,{name:"id",hash:{},data:d}):e))+'"class="jw-skin-'+h((e=null!=(e=b.skin||(null!=a?a.skin:a))?e:g,typeof e===f?e.call(a,{name:"skin",hash:{},data:d}):e))+' jw-error jw-reset">\n    <div class="jw-title jw-reset">\n        <div class="jw-title-primary jw-reset">'+h((e=null!=(e=b.title||(null!=a?a.title:a))?e:g,typeof e===f?e.call(a,{name:"title",hash:{},data:d}):e))+'</div>\n        <div class="jw-title-secondary jw-reset">'+h((e=null!=(e=b.body||(null!=a?a.body:a))?e:g,typeof e===f?e.call(a,{name:"body",hash:{},data:d}):e))+'</div>\n    </div>\n\n    <div class="jw-icon-container jw-reset">\n        <div class="jw-display-icon-container jw-background-color jw-reset">\n            <div class="jw-icon jw-icon-display jw-reset"></div>\n        </div>\n    </div>\n</div>\n'},useData:!0})},function(a,b,c){var d,e;d=[],e=function(){function a(){var a=document.createElement("div");return a.className=c,a.innerHTML="&nbsp;",a.style.width="1px",a.style.height="1px",a.style.position="absolute",a.style.background="transparent",a}function b(){function b(){var a=this,b=a._view.element();b.appendChild(f),d()&&a.trigger("adBlock")}function d(){return e?!0:(""!==f.innerHTML&&f.className===c&&null!==f.offsetParent&&0!==f.clientHeight||(e=!0),e)}var e=!1,f=a();return{onReady:b,checkAdBlock:d}}var c="afs_ads";return{setup:b}}.apply(b,d),!(void 0!==e&&(a.exports=e))},,,,function(a,b,c){var d,e;d=[],e=function(){var a=window.chrome,b={};return b.NS="urn:x-cast:com.longtailvideo.jwplayer",b.debug=!1,b.availability=null,b.available=function(c){c=c||b.availability;var d="available";return a&&a.cast&&a.cast.ReceiverAvailability&&(d=a.cast.ReceiverAvailability.AVAILABLE),c===d},b.log=function(){if(b.debug){var a=Array.prototype.slice.call(arguments,0);console.log.apply(console,a)}},b.error=function(){var a=Array.prototype.slice.call(arguments,0);console.error.apply(console,a)},b}.apply(b,d),!(void 0!==e&&(a.exports=e))},,,function(a,b,c){var d,e;d=[c(98),c(45)],e=function(a,b){return function(c,d){var e=["seek","skipAd","stop","playlistNext","playlistPrev","playlistItem","resize","addButton","removeButton","registerPlugin","attachMedia"];b.each(e,function(a){c[a]=function(){return d[a].apply(d,arguments),c}}),c.registerPlugin=a.registerPlugin}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45)],e=function(a){return function(b,c){var d=["buffer","controls","position","duration","fullscreen","volume","mute","item","stretching","playlist"];a.each(d,function(a){var d=a.slice(0,1).toUpperCase()+a.slice(1);b["get"+d]=function(){return c._model.get(a)}});var e=["getAudioTracks","getCaptionsList","getWidth","getHeight","getCurrentAudioTrack","setCurrentAudioTrack","getCurrentCaptions","setCurrentCaptions","getCurrentQuality","setCurrentQuality","getQualityLevels","getVisualQuality","getConfig","getState","getSafeRegion","isBeforeComplete","isBeforePlay","getProvider","detachMedia"],f=["setControls","setFullscreen","setVolume","setMute","setCues"];a.each(e,function(a){b[a]=function(){return c[a]?c[a].apply(c,arguments):null}}),a.each(f,function(a){b[a]=function(){return c[a].apply(c,arguments),b}})}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d,e;d=[c(45),c(46)],e=function(a,b){return function(c){var d={onBufferChange:b.JWPLAYER_MEDIA_BUFFER,onBufferFull:b.JWPLAYER_MEDIA_BUFFER_FULL,onError:b.JWPLAYER_ERROR,onSetupError:b.JWPLAYER_SETUP_ERROR,onFullscreen:b.JWPLAYER_FULLSCREEN,onMeta:b.JWPLAYER_MEDIA_META,onMute:b.JWPLAYER_MEDIA_MUTE,onPlaylist:b.JWPLAYER_PLAYLIST_LOADED,onPlaylistItem:b.JWPLAYER_PLAYLIST_ITEM,onPlaylistComplete:b.JWPLAYER_PLAYLIST_COMPLETE,onReady:b.JWPLAYER_READY,onResize:b.JWPLAYER_RESIZE,onComplete:b.JWPLAYER_MEDIA_COMPLETE,onSeek:b.JWPLAYER_MEDIA_SEEK,onTime:b.JWPLAYER_MEDIA_TIME,onVolume:b.JWPLAYER_MEDIA_VOLUME,onBeforePlay:b.JWPLAYER_MEDIA_BEFOREPLAY,onBeforeComplete:b.JWPLAYER_MEDIA_BEFORECOMPLETE,onDisplayClick:b.JWPLAYER_DISPLAY_CLICK,onControls:b.JWPLAYER_CONTROLS,onQualityLevels:b.JWPLAYER_MEDIA_LEVELS,onQualityChange:b.JWPLAYER_MEDIA_LEVEL_CHANGED,onCaptionsList:b.JWPLAYER_CAPTIONS_LIST,onCaptionsChange:b.JWPLAYER_CAPTIONS_CHANGED,onAdError:b.JWPLAYER_AD_ERROR,onAdClick:b.JWPLAYER_AD_CLICK,onAdImpression:b.JWPLAYER_AD_IMPRESSION,onAdTime:b.JWPLAYER_AD_TIME,onAdComplete:b.JWPLAYER_AD_COMPLETE,onAdCompanions:b.JWPLAYER_AD_COMPANIONS,onAdSkipped:b.JWPLAYER_AD_SKIPPED,onAdPlay:b.JWPLAYER_AD_PLAY,onAdPause:b.JWPLAYER_AD_PAUSE,onAdMeta:b.JWPLAYER_AD_META,onCast:b.JWPLAYER_CAST_SESSION,onAudioTrackChange:b.JWPLAYER_AUDIO_TRACK_CHANGED,onAudioTracks:b.JWPLAYER_AUDIO_TRACKS},e={onBuffer:"buffer",onPause:"pause",onPlay:"play",onIdle:"idle"};a.each(e,function(b,d){c[d]=a.partial(c.on,b,a)}),a.each(d,function(b,d){c[d]=a.partial(c.on,b,a)})}}.apply(b,d),!(void 0!==e&&(a.exports=e))},function(a,b,c){var d=c(169);"string"==typeof d&&(d=[[a.id,d,""]]);c(173)(d,{});d.locals&&(a.exports=d.locals)},function(a,b,c){b=a.exports=c(170)(),b.push([a.id,".jw-reset{color:inherit;background-color:transparent;padding:0;margin:0;float:none;font-family:Arial,Helvetica,sans-serif;font-size:1em;line-height:1em;list-style:none;text-align:left;text-transform:none;vertical-align:baseline;border:0;direction:ltr;font-variant:inherit;font-stretch:inherit;-webkit-tap-highlight-color:rgba(255,255,255,0)}@font-face{font-family:'jw-icons';src:url("+c(171)+") format('woff'),url("+c(172)+') format(\'truetype\');font-weight:normal;font-style:normal}.jw-icon-inline,.jw-icon-tooltip,.jw-icon-display,.jw-controlbar .jw-menu .jw-option:before{font-family:\'jw-icons\';-webkit-font-smoothing:antialiased;font-style:normal;font-weight:normal;text-transform:none;background-color:transparent;font-variant:normal;-webkit-font-feature-settings:"liga";-ms-font-feature-settings:"liga" 1;-o-font-feature-settings:"liga";font-feature-settings:"liga";-moz-osx-font-smoothing:grayscale}.jw-icon-audio-tracks:before{content:"\\E600"}.jw-icon-buffer:before{content:"\\E601"}.jw-icon-cast:before{content:"\\E603"}.jw-icon-cast.jw-off:before{content:"\\E602"}.jw-icon-cc:before{content:"\\E605"}.jw-icon-cue:before{content:"\\E606"}.jw-icon-menu-bullet:before{content:"\\E606"}.jw-icon-error:before{content:"\\E607"}.jw-icon-fullscreen:before{content:"\\E608"}.jw-icon-fullscreen.jw-off:before{content:"\\E613"}.jw-icon-hd:before{content:"\\E60A"}.jw-watermark:before,.jw-rightclick-logo:before{content:"\\E60B"}.jw-icon-next:before{content:"\\E60C"}.jw-icon-pause:before{content:"\\E60D"}.jw-icon-play:before{content:"\\E60E"}.jw-icon-prev:before{content:"\\E60F"}.jw-icon-replay:before{content:"\\E610"}.jw-icon-volume:before{content:"\\E612"}.jw-icon-volume.jw-off:before{content:"\\E611"}.jw-icon-more:before{content:"\\E614"}.jw-icon-close:before{content:"\\E615"}.jw-icon-playlist:before{content:"\\E616"}.jwplayer{width:100%;font-size:16px;position:relative;display:block;min-height:0;overflow:hidden;box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;background-color:#000;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jwplayer *{box-sizing:inherit}.jwplayer.jw-flag-aspect-mode{height:auto !important}.jwplayer.jw-flag-aspect-mode .jw-aspect{display:block}.jwplayer .jw-aspect{display:none}.jwplayer.jw-no-focus:focus,.jwplayer .jw-swf{outline:none}.jwplayer.jw-ie:focus{outline:#585858 dotted 1px}.jwplayer:hover .jw-display-icon-container{background-color:#333;background:#333;background-size:#333}.jw-media,.jw-preview,.jw-overlays,.jw-controls{position:absolute;width:100%;height:100%;top:0;left:0;bottom:0;right:0}.jw-media{overflow:hidden;cursor:pointer}.jw-overlays{cursor:auto}.jw-media.jw-media-show{visibility:visible;opacity:1}.jw-controls.jw-controls-disabled{display:none}.jw-controls .jw-controls-right{position:absolute;top:0;right:0;left:0;bottom:2em}.jw-text{height:1em;font-family:Arial,Helvetica,sans-serif;font-size:.75em;font-style:normal;font-weight:normal;color:white;text-align:center;font-variant:normal;font-stretch:normal}.jw-plugin{position:absolute;bottom:2.5em}.jw-plugin .jw-banner{max-width:100%;opacity:0;cursor:pointer;position:absolute;margin:auto auto 0 auto;left:0;right:0;bottom:0;display:block}.jw-cast-screen{width:100%;height:100%}.jw-instream{position:absolute;top:0;right:0;bottom:0;left:0;display:none}.jw-icon-playback:before{content:"\\E60E"}.jw-preview,.jw-captions,.jw-title,.jw-overlays,.jw-controls{pointer-events:none}.jw-overlays>div,.jw-media,.jw-controlbar,.jw-dock,.jw-logo,.jw-skip,.jw-display-icon-container{pointer-events:all}.jwplayer video{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;margin:auto;background:transparent}.jwplayer video::-webkit-media-controls-start-playback-button{display:none}.jwplayer video::-webkit-media-text-track-display{-webkit-transform:translateY(-1.5em);transform:translateY(-1.5em)}.jwplayer.jw-flag-user-inactive.jw-state-playing video::-webkit-media-text-track-display{-webkit-transform:translateY(0);transform:translateY(0)}.jwplayer.jw-stretch-uniform video{-o-object-fit:contain;object-fit:contain}.jwplayer.jw-stretch-none video{-o-object-fit:none;object-fit:none}.jwplayer.jw-stretch-fill video{-o-object-fit:cover;object-fit:cover}.jwplayer.jw-stretch-exactfit video{-o-object-fit:fill;object-fit:fill}.jw-click{position:absolute;width:100%;height:100%}.jw-preview{position:absolute;display:none;opacity:1;visibility:visible;width:100%;height:100%;background:#000 no-repeat 50% 50%}.jwplayer .jw-preview,.jw-error .jw-preview,.jw-stretch-uniform .jw-preview{background-size:contain}.jw-stretch-none .jw-preview{background-size:auto auto}.jw-stretch-fill .jw-preview{background-size:cover}.jw-stretch-exactfit .jw-preview{background-size:100% 100%}.jw-display-icon-container{position:relative;top:50%;display:table;height:3.5em;width:3.5em;margin:-1.75em auto 0;cursor:pointer}.jw-display-icon-container .jw-icon-display{position:relative;display:table-cell;text-align:center;vertical-align:middle !important;background-position:50% 50%;background-repeat:no-repeat;font-size:2em}.jw-flag-audio-player .jw-display-icon-container,.jw-flag-dragging .jw-display-icon-container{display:none}.jw-icon{font-family:\'jw-icons\';-webkit-font-smoothing:antialiased;font-style:normal;font-weight:normal;text-transform:none;background-color:transparent;font-variant:normal;-webkit-font-feature-settings:"liga";-ms-font-feature-settings:"liga" 1;-o-font-feature-settings:"liga";font-feature-settings:"liga";-moz-osx-font-smoothing:grayscale}.jw-controlbar{display:table;position:absolute;right:0;left:0;bottom:0;height:2em;padding:0 .25em}.jw-controlbar .jw-hidden{display:none}.jw-controlbar.jw-drawer-expanded .jw-controlbar-left-group,.jw-controlbar.jw-drawer-expanded .jw-controlbar-center-group{opacity:0}.jw-background-color{background-color:#414040}.jw-group{display:table-cell}.jw-controlbar-center-group{width:100%;padding:0 .25em}.jw-controlbar-center-group .jw-slider-time,.jw-controlbar-center-group .jw-text-alt{padding:0}.jw-controlbar-center-group .jw-text-alt{display:none}.jw-controlbar-left-group,.jw-controlbar-right-group{white-space:nowrap}.jw-knob:hover,.jw-icon-inline:hover,.jw-icon-tooltip:hover,.jw-icon-display:hover,.jw-option:before:hover{color:#eee}.jw-icon-inline,.jw-icon-tooltip,.jw-slider-horizontal,.jw-text-elapsed,.jw-text-duration{display:inline-block;height:2em;position:relative;line-height:2em;vertical-align:middle;cursor:pointer}.jw-icon-inline,.jw-icon-tooltip{min-width:1.25em;text-align:center}.jw-icon-playback{min-width:2.25em}.jw-icon-volume{min-width:1.75em;text-align:left}.jw-time-tip{line-height:1em;pointer-events:none}.jw-icon-inline:after,.jw-icon-tooltip:after{width:100%;height:100%;font-size:1em}.jw-icon-cast{display:none}.jw-slider-volume.jw-slider-horizontal,.jw-icon-inline.jw-icon-volume{display:none}.jw-dock{margin:.75em;display:block;opacity:1;clear:right}.jw-dock:after{content:\'\';clear:both;display:block}.jw-dock-button{cursor:pointer;float:right;position:relative;width:2.5em;height:2.5em;margin:.5em}.jw-dock-button .jw-arrow{display:none;position:absolute;bottom:-0.2em;width:.5em;height:.2em;left:50%;margin-left:-0.25em}.jw-dock-button .jw-overlay{display:none;position:absolute;top:2.5em;right:0;margin-top:.25em;padding:.5em;white-space:nowrap}.jw-dock-button:hover .jw-overlay,.jw-dock-button:hover .jw-arrow{display:block}.jw-dock-image{width:100%;height:100%;background-position:50% 50%;background-repeat:no-repeat;opacity:.75}.jw-title{display:none;position:absolute;top:0;width:100%;font-size:.875em;height:8em;background:-webkit-linear-gradient(top, #000 0, #000 18%, rgba(0,0,0,0) 100%);background:linear-gradient(to bottom, #000 0, #000 18%, rgba(0,0,0,0) 100%)}.jw-title-primary,.jw-title-secondary{padding:.75em 1.5em;min-height:2.5em;width:100%;color:white;white-space:nowrap;text-overflow:ellipsis;overflow-x:hidden}.jw-title-primary{font-weight:bold}.jw-title-secondary{margin-top:-0.5em}.jw-slider-container{display:inline-block;height:1em;position:relative;touch-action:none}.jw-rail,.jw-buffer,.jw-progress{position:absolute;cursor:pointer}.jw-progress{background-color:#fff}.jw-rail{background-color:#aaa}.jw-buffer{background-color:#202020}.jw-cue,.jw-knob{position:absolute;cursor:pointer}.jw-cue{background-color:#fff;width:.1em;height:.4em}.jw-knob{background-color:#aaa;width:.4em;height:.4em}.jw-slider-horizontal{width:4em;height:1em}.jw-slider-horizontal.jw-slider-volume{margin-right:5px}.jw-slider-horizontal .jw-rail,.jw-slider-horizontal .jw-buffer,.jw-slider-horizontal .jw-progress{width:100%;height:.4em}.jw-slider-horizontal .jw-progress,.jw-slider-horizontal .jw-buffer{width:0}.jw-slider-horizontal .jw-rail,.jw-slider-horizontal .jw-progress,.jw-slider-horizontal .jw-slider-container{width:100%}.jw-slider-horizontal .jw-knob{left:0;margin-left:-0.325em}.jw-slider-vertical{width:.75em;height:4em;bottom:0;position:absolute;padding:1em}.jw-slider-vertical .jw-rail,.jw-slider-vertical .jw-buffer,.jw-slider-vertical .jw-progress{bottom:0;height:100%}.jw-slider-vertical .jw-progress,.jw-slider-vertical .jw-buffer{height:0}.jw-slider-vertical .jw-slider-container,.jw-slider-vertical .jw-rail,.jw-slider-vertical .jw-progress{bottom:0;width:.75em;height:100%;left:0;right:0;margin:0 auto}.jw-slider-vertical .jw-slider-container{height:4em;position:relative}.jw-slider-vertical .jw-knob{bottom:0;left:0;right:0;margin:0 auto}.jw-slider-time{right:0;left:0;width:100%}.jw-tooltip-time{position:absolute}.jw-slider-volume .jw-buffer{display:none}.jw-captions{position:absolute;display:none;margin:0 auto;width:100%;left:0;bottom:3em;right:0;max-width:90%;text-align:center}.jw-captions.jw-captions-enabled{display:block}.jw-captions-window{display:none;padding:.25em;border-radius:.25em}.jw-captions-window.jw-captions-window-active{display:inline-block}.jw-captions-text{display:inline-block;color:white;background-color:black;word-wrap:break-word;white-space:pre-line;font-style:normal;font-weight:normal;text-align:center;text-decoration:none;line-height:1.3em;padding:.1em .8em}.jw-rightclick{display:none;position:absolute;white-space:nowrap}.jw-rightclick.jw-open{display:block}.jw-rightclick ul{list-style:none;font-weight:bold;border-radius:.15em;margin:0;border:1px solid #444;padding:0}.jw-rightclick .jw-rightclick-logo{font-size:2em;color:#ff0147;vertical-align:middle;padding-right:.3em;margin-right:.3em;border-right:1px solid #444}.jw-rightclick li{background-color:#000;border-bottom:1px solid #444;margin:0}.jw-rightclick a{color:#fff;text-decoration:none;padding:1em;display:block;font-size:.6875em}.jw-rightclick li:last-child{border-bottom:none}.jw-rightclick li:hover{background-color:#1a1a1a;cursor:pointer}.jw-rightclick .jw-featured{background-color:#252525;vertical-align:middle}.jw-rightclick .jw-featured a{color:#777}.jw-logo{position:absolute;margin:.75em;cursor:pointer;pointer-events:all;background-repeat:no-repeat;background-size:contain;top:auto;right:auto;left:auto;bottom:auto}.jw-logo .jw-flag-audio-player{display:none}.jw-logo-top-right{top:0;right:0}.jw-logo-top-left{top:0;left:0}.jw-logo-bottom-left{bottom:0;left:0}.jw-logo-bottom-right{bottom:0;right:0}.jw-watermark{position:absolute;top:50%;left:0;right:0;bottom:0;text-align:center;font-size:14em;color:#eee;opacity:.33;pointer-events:none}.jw-icon-tooltip.jw-open .jw-overlay{opacity:1;visibility:visible}.jw-icon-tooltip.jw-hidden{display:none}.jw-overlay-horizontal{display:none}.jw-icon-tooltip.jw-open-drawer:before{display:none}.jw-icon-tooltip.jw-open-drawer .jw-overlay-horizontal{opacity:1;display:inline-block;vertical-align:top}.jw-overlay:before{position:absolute;top:0;bottom:0;left:-50%;width:100%;background-color:rgba(0,0,0,0);content:" "}.jw-slider-time .jw-overlay:before{height:1em;top:auto}.jw-time-tip,.jw-volume-tip,.jw-menu{position:relative;left:-50%;border:solid 1px #000;margin:0}.jw-volume-tip{width:100%;height:100%;display:block}.jw-time-tip{text-align:center;font-family:inherit;color:#aaa;bottom:1em;border:solid 4px #000}.jw-time-tip .jw-text{line-height:1em}.jw-controlbar .jw-overlay{margin:0;position:absolute;bottom:2em;left:50%;opacity:0;visibility:hidden}.jw-controlbar .jw-overlay .jw-contents{position:relative}.jw-controlbar .jw-option{position:relative;white-space:nowrap;cursor:pointer;list-style:none;height:1.5em;font-family:inherit;line-height:1.5em;color:#aaa;padding:0 .5em;font-size:.8em}.jw-controlbar .jw-option:hover,.jw-controlbar .jw-option:before:hover{color:#eee}.jw-controlbar .jw-option:before{padding-right:.125em}.jw-playlist-container ::-webkit-scrollbar-track{background-color:#333;border-radius:10px}.jw-playlist-container ::-webkit-scrollbar{width:5px;border:10px solid black;border-bottom:0;border-top:0}.jw-playlist-container ::-webkit-scrollbar-thumb{background-color:white;border-radius:5px}.jw-tooltip-title{border-bottom:1px solid #444;text-align:left;padding-left:.7em}.jw-playlist{max-height:11em;min-height:4.5em;overflow-x:hidden;overflow-y:scroll;width:calc(100% - 4px)}.jw-playlist .jw-option{height:3em;margin-right:5px;color:white;padding-left:1em;font-size:.8em}.jw-playlist .jw-label,.jw-playlist .jw-name{display:inline-block;line-height:3em;text-align:left;overflow:hidden;white-space:nowrap}.jw-playlist .jw-label{width:1em}.jw-playlist .jw-name{width:11em}.jw-skip{cursor:default;position:absolute;float:right;display:inline-block;right:.75em;bottom:3em}.jw-skip.jw-skippable{cursor:pointer}.jw-skip.jw-hidden{visibility:hidden}.jw-skip .jw-skip-icon{display:none;margin-left:-0.75em}.jw-skip .jw-skip-icon:before{content:"\\E60C"}.jw-skip .jw-text,.jw-skip .jw-skip-icon{color:#aaa;vertical-align:middle;line-height:1.5em;font-size:.7em}.jw-skip.jw-skippable:hover{cursor:pointer}.jw-skip.jw-skippable:hover .jw-text,.jw-skip.jw-skippable:hover .jw-skip-icon{color:#eee}.jw-skip.jw-skippable .jw-skip-icon{display:inline;margin:0}.jwplayer.jw-state-playing.jw-flag-casting .jw-display-icon-container,.jwplayer.jw-state-paused.jw-flag-casting .jw-display-icon-container{display:table}.jwplayer.jw-flag-casting .jw-display-icon-container{border-radius:0;border:1px solid white;position:absolute;top:auto;left:.5em;right:.5em;bottom:50%;margin-bottom:-12.5%;height:50%;width:50%;padding:0;background-repeat:no-repeat;background-position:center}.jwplayer.jw-flag-casting .jw-display-icon-container .jw-icon{font-size:3em}.jwplayer.jw-flag-casting.jw-state-complete .jw-preview{display:none}.jw-cast{position:absolute;width:100%;height:100%;background-repeat:no-repeat;background-size:auto;background-position:50% 50%}.jw-cast-label{position:absolute;left:.5em;right:.5em;bottom:75%;margin-bottom:1.5em;text-align:center}.jw-cast-name{color:#ccc}.jw-state-idle .jw-preview{display:block}.jw-state-idle .jw-icon-display:before{content:"\\E60E"}.jw-state-idle .jw-controlbar{display:none}.jw-state-idle .jw-captions{display:none}.jw-state-idle .jw-title{display:block}.jwplayer.jw-state-playing .jw-display-icon-container{display:none}.jwplayer.jw-state-playing .jw-display-icon-container .jw-icon-display:before{content:"\\E60D"}.jwplayer.jw-state-playing .jw-icon-playback:before{content:"\\E60D"}.jwplayer.jw-state-paused .jw-display-icon-container{display:none}.jwplayer.jw-state-paused .jw-display-icon-container .jw-icon-display:before{content:"\\E60E"}.jwplayer.jw-state-paused .jw-icon-playback:before{content:"\\E60E"}.jwplayer.jw-state-buffering .jw-display-icon-container .jw-icon-display{-webkit-animation:spin 2s linear infinite;animation:spin 2s linear infinite}.jwplayer.jw-state-buffering .jw-display-icon-container .jw-icon-display:before{content:"\\E601"}@-webkit-keyframes spin{100%{-webkit-transform:rotate(360deg)}}@keyframes spin{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.jwplayer.jw-state-buffering .jw-display-icon-container .jw-text{display:none}.jwplayer.jw-state-buffering .jw-icon-playback:before{content:"\\E60D"}.jwplayer.jw-state-complete .jw-preview{display:block}.jwplayer.jw-state-complete .jw-display-icon-container .jw-icon-display:before{content:"\\E610"}.jwplayer.jw-state-complete .jw-display-icon-container .jw-text{display:none}.jwplayer.jw-state-complete .jw-icon-playback:before{content:"\\E60E"}.jwplayer.jw-state-complete .jw-captions{display:none}body .jw-error .jw-title,.jwplayer.jw-state-error .jw-title{display:block}body .jw-error .jw-title .jw-title-primary,.jwplayer.jw-state-error .jw-title .jw-title-primary{white-space:normal}body .jw-error .jw-preview,.jwplayer.jw-state-error .jw-preview{display:block}body .jw-error .jw-controlbar,.jwplayer.jw-state-error .jw-controlbar{display:none}body .jw-error .jw-captions,.jwplayer.jw-state-error .jw-captions{display:none}body .jw-error:hover .jw-display-icon-container,.jwplayer.jw-state-error:hover .jw-display-icon-container{cursor:default;color:#fff;background:#000}body .jw-error .jw-icon-display,.jwplayer.jw-state-error .jw-icon-display{cursor:default;font-family:\'jw-icons\';-webkit-font-smoothing:antialiased;font-style:normal;font-weight:normal;text-transform:none;background-color:transparent;font-variant:normal;-webkit-font-feature-settings:"liga";-ms-font-feature-settings:"liga" 1;-o-font-feature-settings:"liga";font-feature-settings:"liga";-moz-osx-font-smoothing:grayscale}body .jw-error .jw-icon-display:before,.jwplayer.jw-state-error .jw-icon-display:before{content:"\\E607"}body .jw-error .jw-icon-display:hover,.jwplayer.jw-state-error .jw-icon-display:hover{color:#fff}body .jw-error{font-size:16px;background-color:#000;color:#eee;width:100%;height:100%;display:table;opacity:1;position:relative}body .jw-error .jw-icon-container{position:absolute;width:100%;height:100%;top:0;left:0;bottom:0;right:0}.jwplayer.jw-flag-cast-available .jw-controlbar{display:table}.jwplayer.jw-flag-cast-available .jw-icon-cast{display:inline-block}.jwplayer.jw-flag-skin-loading .jw-captions,.jwplayer.jw-flag-skin-loading .jw-controls,.jwplayer.jw-flag-skin-loading .jw-title{display:none}.jwplayer.jw-flag-fullscreen{width:100% !important;height:100% !important;top:0;right:0;bottom:0;left:0;z-index:1000;margin:0;position:fixed}.jwplayer.jw-flag-fullscreen.jw-flag-user-inactive{cursor:none;-webkit-cursor-visibility:auto-hide}.jwplayer.jw-flag-live .jw-controlbar .jw-text-elapsed,.jwplayer.jw-flag-live .jw-controlbar .jw-text-duration,.jwplayer.jw-flag-live .jw-controlbar .jw-slider-time{display:none}.jwplayer.jw-flag-live .jw-controlbar .jw-text-alt{display:inline}.jwplayer.jw-flag-user-inactive.jw-state-playing .jw-controlbar,.jwplayer.jw-flag-user-inactive.jw-state-playing .jw-dock{display:none}.jwplayer.jw-flag-user-inactive.jw-state-playing .jw-logo.jw-hide{display:none}.jwplayer.jw-flag-user-inactive.jw-state-playing .jw-plugin,.jwplayer.jw-flag-user-inactive.jw-state-playing .jw-captions{bottom:.5em}.jwplayer.jw-flag-user-inactive.jw-state-buffering .jw-controlbar{display:none}.jwplayer.jw-flag-media-audio .jw-controlbar{display:table}.jwplayer.jw-flag-media-audio.jw-flag-user-inactive .jw-controlbar{display:table}.jwplayer.jw-flag-media-audio.jw-flag-user-inactive.jw-state-playing .jw-plugin,.jwplayer.jw-flag-media-audio.jw-flag-user-inactive.jw-state-playing .jw-captions{bottom:3em}.jw-flag-media-audio .jw-preview{display:block}.jwplayer.jw-flag-ads .jw-preview,.jwplayer.jw-flag-ads .jw-dock{display:none}.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-inline,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-tooltip,.jwplayer.jw-flag-ads .jw-controlbar .jw-text,.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-horizontal{display:none}.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-playback,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-volume,.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-volume,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-fullscreen{display:inline-block}.jwplayer.jw-flag-ads .jw-controlbar .jw-text-alt{display:inline}.jwplayer.jw-flag-ads .jw-controlbar .jw-slider-volume.jw-slider-horizontal,.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-inline.jw-icon-volume{display:inline-block}.jwplayer.jw-flag-ads .jw-controlbar .jw-icon-tooltip.jw-icon-volume{display:none}.jwplayer.jw-flag-ads .jw-logo,.jwplayer.jw-flag-ads .jw-captions{display:none}.jwplayer.jw-flag-ads-googleima .jw-controlbar{display:table;bottom:0}.jwplayer.jw-flag-ads-googleima.jw-flag-touch .jw-controlbar{font-size:1em}.jwplayer.jw-flag-ads-googleima.jw-flag-touch.jw-state-paused .jw-display-icon-container{display:none}.jwplayer.jw-flag-ads-googleima.jw-skin-seven .jw-controlbar{font-size:.9em}.jwplayer.jw-flag-ads-vpaid .jw-controlbar{display:none}.jwplayer.jw-flag-ads-hide-controls .jw-controls{display:none !important}.jwplayer.jw-flag-ads.jw-flag-touch .jw-controlbar{display:table}.jwplayer.jw-flag-overlay-open .jw-title{display:none}.jwplayer.jw-flag-overlay-open .jw-controls-right .jw-logo{display:none}.jwplayer.jw-flag-overlay-open-sharing .jw-controls,.jwplayer.jw-flag-overlay-open-related .jw-controls,.jwplayer.jw-flag-overlay-open-sharing .jw-title,.jwplayer.jw-flag-overlay-open-related .jw-title{display:none}.jwplayer.jw-flag-rightclick-open{overflow:visible}.jwplayer.jw-flag-rightclick-open .jw-rightclick{z-index:16777215}.jw-flag-controls-disabled .jw-controls{visibility:hidden}.jw-flag-controls-disabled .jw-logo{visibility:visible}.jw-flag-controls-disabled .jw-media{cursor:auto}body .jwplayer.jw-flag-flash-blocked .jw-title{display:block}body .jwplayer.jw-flag-flash-blocked .jw-controls,body .jwplayer.jw-flag-flash-blocked .jw-overlays,body .jwplayer.jw-flag-flash-blocked .jw-preview{display:none}.jw-flag-touch .jw-controlbar,.jw-flag-touch .jw-skip,.jw-flag-touch .jw-plugin{font-size:1.5em}.jw-flag-touch .jw-captions{bottom:4.25em}.jw-flag-touch .jw-icon-tooltip.jw-open-drawer:before{display:inline}.jw-flag-touch .jw-icon-tooltip.jw-open-drawer:before{content:"\\E615"}.jw-flag-touch .jw-display-icon-container{pointer-events:none}.jw-flag-touch.jw-state-paused .jw-display-icon-container{display:table}.jw-flag-touch.jw-state-paused.jw-flag-dragging .jw-display-icon-container{display:none}.jw-flag-compact-player .jw-icon-playlist,.jw-flag-compact-player .jw-text-elapsed,.jw-flag-compact-player .jw-text-duration{display:none}.jwplayer.jw-flag-audio-player{background-color:transparent}.jwplayer.jw-flag-audio-player .jw-media{visibility:hidden}.jwplayer.jw-flag-audio-player .jw-media object{width:1px;height:1px}.jwplayer.jw-flag-audio-player .jw-preview,.jwplayer.jw-flag-audio-player .jw-display-icon-container{display:none}.jwplayer.jw-flag-audio-player .jw-controlbar{display:table;height:auto;left:0;bottom:0;margin:0;width:100%;min-width:100%;opacity:1}.jwplayer.jw-flag-audio-player .jw-controlbar .jw-icon-fullscreen,.jwplayer.jw-flag-audio-player .jw-controlbar .jw-icon-tooltip{display:none}.jwplayer.jw-flag-audio-player .jw-controlbar .jw-slider-volume.jw-slider-horizontal,.jwplayer.jw-flag-audio-player .jw-controlbar .jw-icon-inline.jw-icon-volume{display:inline-block}.jwplayer.jw-flag-audio-player .jw-controlbar .jw-icon-tooltip.jw-icon-volume{display:none}.jwplayer.jw-flag-audio-player.jw-flag-user-inactive .jw-controlbar{display:table}.jw-skin-seven .jw-background-color{background:#000}.jw-skin-seven .jw-controlbar{border-top:#333 1px solid;height:2.5em}.jw-skin-seven .jw-group{vertical-align:middle}.jw-skin-seven .jw-playlist{background-color:rgba(0,0,0,0.5)}.jw-skin-seven .jw-playlist-container{left:-43%;background-color:rgba(0,0,0,0.5)}.jw-skin-seven .jw-playlist-container .jw-option{border-bottom:1px solid #444}.jw-skin-seven .jw-playlist-container .jw-option:hover,.jw-skin-seven .jw-playlist-container .jw-option.jw-active-option{background-color:black}.jw-skin-seven .jw-playlist-container .jw-option:hover .jw-label{color:#FF0046}.jw-skin-seven .jw-playlist-container .jw-icon-playlist{margin-left:0}.jw-skin-seven .jw-playlist-container .jw-label .jw-icon-play{color:#FF0046}.jw-skin-seven .jw-playlist-container .jw-label .jw-icon-play:before{padding-left:0}.jw-skin-seven .jw-tooltip-title{background-color:#000;color:#fff}.jw-skin-seven .jw-text{color:#fff}.jw-skin-seven .jw-button-color{color:#fff}.jw-skin-seven .jw-button-color:hover{color:#FF0046}.jw-skin-seven .jw-toggle{color:#FF0046}.jw-skin-seven .jw-toggle.jw-off{color:#fff}.jw-skin-seven .jw-controlbar .jw-icon:before,.jw-skin-seven .jw-text-elapsed,.jw-skin-seven .jw-text-duration{padding:0 .7em}.jw-skin-seven .jw-controlbar .jw-icon-prev:before{padding-right:.25em}.jw-skin-seven .jw-controlbar .jw-icon-playlist:before{padding:0 .45em}.jw-skin-seven .jw-controlbar .jw-icon-next:before{padding-left:.25em}.jw-skin-seven .jw-icon-prev,.jw-skin-seven .jw-icon-next{font-size:.7em}.jw-skin-seven .jw-icon-prev:before{border-left:1px solid #666}.jw-skin-seven .jw-icon-next:before{border-right:1px solid #666}.jw-skin-seven .jw-icon-display{color:#fff}.jw-skin-seven .jw-icon-display:before{padding-left:0}.jw-skin-seven .jw-display-icon-container{border-radius:50%;border:1px solid #333}.jw-skin-seven .jw-rail{background-color:#384154;box-shadow:none}.jw-skin-seven .jw-buffer{background-color:#666F82}.jw-skin-seven .jw-progress{background:#FF0046}.jw-skin-seven .jw-knob{width:.6em;height:.6em;background-color:#fff;box-shadow:0 0 0 1px #000;border-radius:1em}.jw-skin-seven .jw-slider-horizontal .jw-slider-container{height:.95em}.jw-skin-seven .jw-slider-horizontal .jw-rail,.jw-skin-seven .jw-slider-horizontal .jw-buffer,.jw-skin-seven .jw-slider-horizontal .jw-progress{height:.2em;border-radius:0}.jw-skin-seven .jw-slider-horizontal .jw-knob{top:-0.2em}.jw-skin-seven .jw-slider-horizontal .jw-cue{top:-0.05em;width:.3em;height:.3em;background-color:#fff;border-radius:50%}.jw-skin-seven .jw-slider-vertical .jw-rail,.jw-skin-seven .jw-slider-vertical .jw-buffer,.jw-skin-seven .jw-slider-vertical .jw-progress{width:.2em}.jw-skin-seven .jw-slider-vertical .jw-knob{margin-bottom:-0.3em}.jw-skin-seven .jw-volume-tip{width:100%;left:-45%;padding-bottom:.7em}.jw-skin-seven .jw-text-duration{color:#666F82}.jw-skin-seven .jw-controlbar-right-group .jw-icon-tooltip:before,.jw-skin-seven .jw-controlbar-right-group .jw-icon-inline:before{border-left:1px solid #666}.jw-skin-seven .jw-controlbar-right-group .jw-icon-inline:first-child:before{border:none}.jw-skin-seven .jw-dock .jw-dock-button{border-radius:50%;border:1px solid #333}.jw-skin-seven .jw-dock .jw-overlay{border-radius:2.5em}.jw-skin-seven .jw-icon-tooltip .jw-active-option{background-color:#FF0046;color:#fff}.jw-skin-seven .jw-icon-volume{min-width:2.6em}.jw-skin-seven .jw-time-tip,.jw-skin-seven .jw-menu,.jw-skin-seven .jw-volume-tip,.jw-skin-seven .jw-skip{border:1px solid #333}.jw-skin-seven .jw-time-tip{padding:.2em;bottom:1.3em}.jw-skin-seven .jw-menu,.jw-skin-seven .jw-volume-tip{bottom:.24em}.jw-skin-seven .jw-skip{padding:.4em;border-radius:1.75em}.jw-skin-seven .jw-skip .jw-text,.jw-skin-seven .jw-skip .jw-icon-inline{color:#fff;line-height:1.75em}.jw-skin-seven .jw-skip.jw-skippable:hover .jw-text,.jw-skin-seven .jw-skip.jw-skippable:hover .jw-icon-inline{color:#FF0046}.jw-skin-seven.jw-flag-touch .jw-controlbar .jw-icon:before,.jw-skin-seven.jw-flag-touch .jw-text-elapsed,.jw-skin-seven.jw-flag-touch .jw-text-duration{padding:0 .35em}.jw-skin-seven.jw-flag-touch .jw-controlbar .jw-icon-prev:before{padding:0 .125em 0 .7em}.jw-skin-seven.jw-flag-touch .jw-controlbar .jw-icon-next:before{padding:0 .7em 0 .125em}.jw-skin-seven.jw-flag-touch .jw-controlbar .jw-icon-playlist:before{padding:0 .225em}',""]);
},function(a,b){a.exports=function(){var a=[];return a.toString=function(){for(var a=[],b=0;b<this.length;b++){var c=this[b];c[2]?a.push("@media "+c[2]+"{"+c[1]+"}"):a.push(c[1])}return a.join("")},a.i=function(b,c){"string"==typeof b&&(b=[[null,b,""]]);for(var d={},e=0;e<this.length;e++){var f=this[e][0];"number"==typeof f&&(d[f]=!0)}for(e=0;e<b.length;e++){var g=b[e];"number"==typeof g[0]&&d[g[0]]||(c&&!g[2]?g[2]=c:c&&(g[2]="("+g[2]+") and ("+c+")"),a.push(g))}},a}},function(a,b){a.exports="data:application/font-woff;base64,d09GRgABAAAAABQ4AAsAAAAAE+wAAQABAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxID2WNtYXAAAAFoAAAAVAAAAFQaVsydZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAD3AAAA9wKJaoQ2hlYWQAABE0AAAANgAAADYIhqKNaGhlYQAAEWwAAAAkAAAAJAmCBdxobXR4AAARkAAAAGwAAABscmAHPWxvY2EAABH8AAAAOAAAADg2EDnwbWF4cAAAEjQAAAAgAAAAIAAiANFuYW1lAAASVAAAAcIAAAHCwZOZtHBvc3QAABQYAAAAIAAAACAAAwAAAAMEmQGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA5hYDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOYW//3//wAAAAAAIOYA//3//wAB/+MaBAADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAABABgAAAFoAOAADoAPwBEAEkAACUVIi4CNTQ2Ny4BNTQ+AjMyHgIVFAYHHgEVFA4CIxEyFhc+ATU0LgIjIg4CFRQWFz4BMxExARUhNSEXFSE1IRcVITUhAUAuUj0jCgoKCkZ6o11do3pGCgoKCiM9Ui4qSh4BAjpmiE1NiGY6AQIeSioCVQIL/fWWAXX+i0oBK/7VHh4jPVIuGS4VH0MiXaN6RkZ6o10iQx8VLhkuUj0jAcAdGQ0bDk2IZjo6ZohNDhsNGR3+XgNilZXglZXglZUAAAABAEAAAAPAA4AAIQAAExQeAjMyPgI1MxQOAiMiLgI1ND4CMxUiDgIVMYs6ZohNTYhmOktGeqNdXaN6RkZ6o11NiGY6AcBNiGY6OmaITV2jekZGeqNdXaN6Rks6ZohNAAAEAEAAAATAA4AADgAcACoAMQAAJS4BJyERIREuAScRIREhByMuAyc1HgMXMSsBLgMnNR4DFzErATUeARcxAn8DBQQCDPxGCysLBDz9v1NaCERrjE9irINTCLVbByc6Sio9a1I1CLaBL0YMQgsoCgLB/ukDCgIBSPzCQk6HaEIIWAhQgKdgKUg5JgdYBzRRZzx9C0QuAAAAAAUAQAAABMADgAAOABkAJwA1ADwAACUuASchESERLgEnESERIQE1IREhLgMnMQEjLgMnNR4DFzErAS4DJzUeAxcxKwE1HgEXMQKAAgYFAg38QAwqCgRA/cD+gANA/iAYRVlsPgEtWghFa4xPYq2DUgmzWgcnO0oqPGpSNgm6gDBEDEAMKAwCwP7tAggDAUb8wAHQ8P3APWdUQRf98E2IaEIHWghQgKhgKUg4JgdaCDVRZzt9DEMuAAAEAEAAAAXAA4AABAAJAGcAxQAANxEhESEBIREhEQU+ATc+ATMyFhceARceARceARcjLgEnLgEnLgEnLgEjIgYHDgEHDgEHDgEVFBYXHgEXHgEXHgEzMjY3PgE3Mw4BBw4BBw4BBw4BIyImJy4BJy4BJy4BNTQ2Nz4BNzEhPgE3PgEzMhYXHgEXHgEXHgEXIy4BJy4BJy4BJy4BIyIGBw4BBw4BBw4BFRQWFx4BFx4BFx4BMzI2Nz4BNzMOAQcOAQcOAQcOASMiJicuAScuAScuATU0Njc+ATcxQAWA+oAFNvsUBOz8Iw4hExQsGBIhEA8cDQwUCAgLAlsBBQUECgYHDggIEAkQGgsLEgcHCgMDAwMDAwoHBxILCxoQFiEMDA8DWgIJBwgTDQwcERAkFBgsFBMhDg0VBwcHBwcHFQ0Bug0hFBMsGREhEBAcDAwVCAgKAloCBQQECwYGDggIEQgQGwsLEgcHCgMDAwMDAwoHBxILCxsQFSIMDA4DWwIJCAcUDAwdEBEkExksExQhDQ4UBwcICAcHFA4AA4D8gAM1/RYC6tcQGAgJCQUFBQ8KChgPDiETCQ4HBwwFBQgDAwIGBgYRCgoYDQ0cDg0aDQ0XCgoRBgYGDQ0OIhYUJBEQHAsLEgYGBgkICRcPDyQUFCwXGC0VFCQPEBgICQkFBQUPCgoYDw4hEwkOBwcMBQUIAwMCBgYGEQoKGA0NHA4NGg0NFwoKEQYGBg0NDiIWFCQREBwLCxIGBgYJCAkXDw8kFBQsFxgtFRQkDwAAAAADAEAAAAXAA4AAEABvAM4AACUhIiY1ETQ2MyEyFhURFAYjAT4BNz4BNz4BMzIWFx4BFx4BFx4BFzMuAScuAScuAScuASMiBgcOAQcOAQcOARUUFhceARceARceATMyNjc+ATc+ATc+ATcjDgEHDgEjIiYnLgEnLgEnLgE1NDY3OQEhPgE3PgE3PgEzMhYXHgEXHgEXHgEXMy4BJy4BJy4BJy4BIyIGBw4BBw4BBw4BFRQWFx4BFx4BFx4BMzI2Nz4BNz4BNz4BNyMOAQcOASMiJicuAScuAScuATU0Njc5AQUs+6g9V1c9BFg9V1c9/JoDCgcGEgsLGxAJEAgIDgYHCgQEBgFaAgoICBQNDBwQDyESGCwUEyEODRUHBwcHBwcVDQ4hExQrGRQkEBAdDAwUCAcJAloDDwwMIhUQGwsLEgYHCgMEAwMEAbkDCgcHEgsLGxAIEQgHDwYGCwQEBQFbAgoICBUMDBwQECERGSwTFCENDhQHBwgIBwcUDg0hFBMsGRMkERAdDAwUBwgJAlsDDgwNIRUQGwsLEgcHCgMDAwMDAFc+AlY+V1c+/ao+VwH0DRgKCxAGBgYCAwMIBQUMBwcOCRMhDg8YCgoOBgUFCQkIGBAPJBQVLRgXLBQUJA8PFwkICQYGBhILCxwQESQUFiIODQ0GBgYRCgoXDQ0aDg4bDQ0YCgsQBgYGAgMDCAUFDAcHDgkTIQ4PGAoKDgYFBQkJCBgQDyQUFS0YFywUFCQPDxcJCAkGBgYSCwscEBEkFBYiDg0NBgYGEQoKFw0NGg4OGw0AAAABAOAAoAMgAuAAFAAAARQOAiMiLgI1ND4CMzIeAhUDIC1OaTw8aU4tLU5pPDxpTi0BwDxpTi0tTmk8PGlOLS1OaTwAAAMAQAAQBEADkAADABAAHwAANwkBISUyNjU0JiMiBhUUFjMTNCYjIgYVERQWMzI2NRFAAgACAPwAAgAOFRUODhUVDiMVDg4VFQ4OFRADgPyAcBYQDxgWERAWAeYPGBYR/tcPGBYRASkAAgBAAAADwAOAAAcADwAANxEXNxcHFyEBIREnByc3J0CAsI2wgP5zAfMBjYCwjbCAAAGNgLCNsIADgP5zgLCNsIAAAAAFAEAAAAXAA4AABAAJABYAMwBPAAA3ESERIQEhESERATM1MxEjNSMVIxEzFSUeARceARceARUUBgcOAQcOAQcOASsBETMeARcxBxEzMjY3PgE3PgE3PgE1NCYnLgEnLgEnLgErAUAFgPqABTb7FATs/FS2YGC2ZGQCXBQeDg8UBwcJBgcHEwwMIRMTLBuwsBYqE6BHCRcJChIIBw0FBQUEAwINBwcTDAwgETcAA4D8gAM2/RcC6f7Arf5AwMABwK2dBxQODyIWFTAbGC4TFiIPDhgKCQcBwAIHB0P+5gQDAg0HBxcMDCETER0PDhgKCQ8EBQUABAA9AAAFwAOAABAAHQA7AFkAACUhIiY1ETQ2MyEyFhURFAYjASMVIzUjETM1MxUzEQUuAScuAScuASsBETMyNjc+ATc+ATc+ATUuASc5AQcOAQcOASsBETMyFhceARceARceARUUBgcOAQc5AQUq+6k+WFg+BFc+WFg+/bNgs2Rks2ABsAcXDA4fExMnFrCwGywTEx4PDBMHBwYCCAl3CBIKCRQMRzcTHgwMEwcHCwQDBAUFBQ0HAFg+AlQ+WFg+/aw+WAKdra3+QMDAAcB9FiIODxQHBwb+QAkHCRgPDiUTFiwYHTAW4ggNAgMEAR8EBQUPCgoYDw4fERMfDwwXBwAAAAABAEMABgOgA3oAjwAAExQiNScwJic0JicuAQcOARUcARUeARceATc+ATc+ATE2MhUwFAcUFhceARceATMyNjc+ATc+ATc+AzE2MhUwDgIVFBYXHgEXFjY3PgE3PgE3PgE3PgM3PAE1NCYnJgYHDgMxBiI1MDwCNTQmJyYGBw4BBw4DMQYiNTAmJy4BJyYGBw4BMRWQBgQIBAgCBQ4KBwkDFgcHIQ8QDwcHNgUEAwMHBQsJChcMBQ0FBwsHDBMICR8cFQUFAwQDCAUHFRERJBEMEwgJEgUOGQwGMjgvBAkHDBYEAz1IPAQFLyQRIhEQFgoGIiUcBQUEAgMYKCcmCgcsAboFBQwYDwUKBwUEAgMNBwcLBxRrDhENBwggDxOTCgqdMBM1EQwTCAcFBAIFCgcPIw4UQ0IxCgpTc3glEyMREBgIBwEKBxUKESUQJ00mE6/JrA8FBgIHDQMECAkGla2PCQk1VGYxNTsHAgUKChwQC2BqVQoKehYfTwUDRx8TkAMAAAAAAgBGAAAENgOAAAQACAAAJREzESMJAhEDxnBw/IADgPyAAAOA/IADgP5A/kADgAAAAgCAAAADgAOAAAQACQAAJREhESEBIREhEQKAAQD/AP4AAQD/AAADgPyAA4D8gAOAAAAAAAEAgAAABAADgAADAAAJAREBBAD8gAOAAcD+QAOA/kAAAgBKAAAEOgOAAAQACAAANxEjETMJAhG6cHADgPyAA4AAA4D8gAOA/kD+QAOAAAAAAQBDACADQwOgACkAAAEeARUUDgIjIi4CNTQ+AjM1DQE1Ig4CFRQeAjMyPgI1NCYnNwMNGhw8aYxPT4xoPT1ojE8BQP7APGlOLS1OaTw8aU4tFhNTAmMrYzVPjGg9PWiMT0+MaD2ArbOALU5pPDxpTi0tTmk8KUsfMAAAAAEAQABmAiADEwAGAAATETMlESUjQM0BE/7tzQEzARPN/VPNAAQAQAAABJADgAAXACsAOgBBAAAlJz4DNTQuAic3HgMVFA4CBzEvAT4BNTQmJzceAxUOAwcxJz4BNTQmJzceARUUBgcnBREzJRElIwPaKiY+KxcXKz4mKipDMBkZMEMqpCk5REQ5KSE0JBQBFCQzIcMiKCgiKiYwMCYq/c3NARP+7c0AIyheaXI8PHFpXikjK2ZyfEFBfHJmK4MjNZFUVJE1Ix5IUFgvL1lRRx2zFkgpK0YVIxxcNDVZHykDARPN/VPNAAACAEAAAAPDA4AABwAPAAABFyERFzcXBwEHJzcnIREnAypw/qlwl3mZ/iaWepZwAVdtAnNwAVdwlnqT/iOWepZw/qpsAAMAQAETBcACYAAMABkAJgAAARQGIyImNTQ2MzIWFSEUBiMiJjU0NjMyFhUhFAYjIiY1NDYzMhYVAY1iRUVhYUVFYgIWYUVFYmJFRWECHWFFRWJiRUVhAbpFYmJFRWFhRUViYkVFYWFFRWJiRUVhYUUAAAAAAQBmACYDmgNaACAAAAEXFhQHBiIvAQcGIicmND8BJyY0NzYyHwE3NjIXFhQPAQKj9yQkJGMd9vYkYx0kJPf3JCQkYx329iRjHSQk9wHA9iRjHSQk9/ckJCRjHfb2JGMdJCT39yQkJGMd9gAABgBEAAQDvAN8AAQACQAOABMAGAAdAAABIRUhNREhFSE1ESEVITUBMxUjNREzFSM1ETMVIzUBpwIV/esCFf3rAhX96/6dsrKysrKyA3xZWf6dWVn+nVlZAsaysv6dsrL+nbKyAAEAAAABGZqh06s/Xw889QALBAAAAAAA0dQiKwAAAADR1CIrAAAAAAXAA6AAAAAIAAIAAAAAAAAAAQAAA8D/wAAABgAAAAAABcAAAQAAAAAAAAAAAAAAAAAAABsEAAAAAAAAAAAAAAACAAAABgAAYAQAAEAFAABABQAAQAYAAEAGAABABAAA4ASAAEAEAABABgAAQAYAAD0D4ABDBIAARgQAAIAEAACABIAASgOAAEMEwABABMAAQAQAAEAGAABABAAAZgQAAEQAAAAAAAoAFAAeAIgAuAEEAWAChgOyA9QECAQqBKQFJgXoBgAGGgYqBkIGgAaSBvQHFgdQB4YHuAABAAAAGwDPAAYAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEADAAAAAEAAAAAAAIABwCNAAEAAAAAAAMADABFAAEAAAAAAAQADACiAAEAAAAAAAUACwAkAAEAAAAAAAYADABpAAEAAAAAAAoAGgDGAAMAAQQJAAEAGAAMAAMAAQQJAAIADgCUAAMAAQQJAAMAGABRAAMAAQQJAAQAGACuAAMAAQQJAAUAFgAvAAMAAQQJAAYAGAB1AAMAAQQJAAoANADganctc2l4LWljb25zAGoAdwAtAHMAaQB4AC0AaQBjAG8AbgBzVmVyc2lvbiAxLjEAVgBlAHIAcwBpAG8AbgAgADEALgAxanctc2l4LWljb25zAGoAdwAtAHMAaQB4AC0AaQBjAG8AbgBzanctc2l4LWljb25zAGoAdwAtAHMAaQB4AC0AaQBjAG8AbgBzUmVndWxhcgBSAGUAZwB1AGwAYQByanctc2l4LWljb25zAGoAdwAtAHMAaQB4AC0AaQBjAG8AbgBzRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="},function(a,b){a.exports="data:application/octet-stream;base64,AAEAAAALAIAAAwAwT1MvMg8SA9kAAAC8AAAAYGNtYXAaVsydAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5ZiiWqEMAAAF4AAAPcGhlYWQIhqKNAAAQ6AAAADZoaGVhCYIF3AAAESAAAAAkaG10eHJgBz0AABFEAAAAbGxvY2E2EDnwAAARsAAAADhtYXhwACIA0QAAEegAAAAgbmFtZcGTmbQAABIIAAABwnBvc3QAAwAAAAATzAAAACAAAwSZAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADmFgPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg5hb//f//AAAAAAAg5gD//f//AAH/4xoEAAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAAEAGAAAAWgA4AAOgA/AEQASQAAJRUiLgI1NDY3LgE1ND4CMzIeAhUUBgceARUUDgIjETIWFz4BNTQuAiMiDgIVFBYXPgEzETEBFSE1IRcVITUhFxUhNSEBQC5SPSMKCgoKRnqjXV2jekYKCgoKIz1SLipKHgECOmaITU2IZjoBAh5KKgJVAgv99ZYBdf6LSgEr/tUeHiM9Ui4ZLhUfQyJdo3pGRnqjXSJDHxUuGS5SPSMBwB0ZDRsOTYhmOjpmiE0OGw0ZHf5eA2KVleCVleCVlQAAAAEAQAAAA8ADgAAhAAATFB4CMzI+AjUzFA4CIyIuAjU0PgIzFSIOAhUxizpmiE1NiGY6S0Z6o11do3pGRnqjXU2IZjoBwE2IZjo6ZohNXaN6RkZ6o11do3pGSzpmiE0AAAQAQAAABMADgAAOABwAKgAxAAAlLgEnIREhES4BJxEhESEHIy4DJzUeAxcxKwEuAyc1HgMXMSsBNR4BFzECfwMFBAIM/EYLKwsEPP2/U1oIRGuMT2Ksg1MItVsHJzpKKj1rUjUItoEvRgxCCygKAsH+6QMKAgFI/MJCTodoQghYCFCAp2ApSDkmB1gHNFFnPH0LRC4AAAAABQBAAAAEwAOAAA4AGQAnADUAPAAAJS4BJyERIREuAScRIREhATUhESEuAycxASMuAyc1HgMXMSsBLgMnNR4DFzErATUeARcxAoACBgUCDfxADCoKBED9wP6AA0D+IBhFWWw+AS1aCEVrjE9irYNSCbNaByc7Sio8alI2CbqAMEQMQAwoDALA/u0CCAMBRvzAAdDw/cA9Z1RBF/3wTYhoQgdaCFCAqGApSDgmB1oINVFnO30MQy4AAAQAQAAABcADgAAEAAkAZwDFAAA3ESERIQEhESERBT4BNz4BMzIWFx4BFx4BFx4BFyMuAScuAScuAScuASMiBgcOAQcOAQcOARUUFhceARceARceATMyNjc+ATczDgEHDgEHDgEHDgEjIiYnLgEnLgEnLgE1NDY3PgE3MSE+ATc+ATMyFhceARceARceARcjLgEnLgEnLgEnLgEjIgYHDgEHDgEHDgEVFBYXHgEXHgEXHgEzMjY3PgE3Mw4BBw4BBw4BBw4BIyImJy4BJy4BJy4BNTQ2Nz4BNzFABYD6gAU2+xQE7PwjDiETFCwYEiEQDxwNDBQICAsCWwEFBQQKBgcOCAgQCRAaCwsSBwcKAwMDAwMDCgcHEgsLGhAWIQwMDwNaAgkHCBMNDBwRECQUGCwUEyEODRUHBwcHBwcVDQG6DSEUEywZESEQEBwMDBUICAoCWgIFBAQLBgYOCAgRCBAbCwsSBwcKAwMDAwMDCgcHEgsLGxAVIgwMDgNbAgkIBxQMDB0QESQTGSwTFCENDhQHBwgIBwcUDgADgPyAAzX9FgLq1xAYCAkJBQUFDwoKGA8OIRMJDgcHDAUFCAMDAgYGBhEKChgNDRwODRoNDRcKChEGBgYNDQ4iFhQkERAcCwsSBgYGCQgJFw8PJBQULBcYLRUUJA8QGAgJCQUFBQ8KChgPDiETCQ4HBwwFBQgDAwIGBgYRCgoYDQ0cDg0aDQ0XCgoRBgYGDQ0OIhYUJBEQHAsLEgYGBgkICRcPDyQUFCwXGC0VFCQPAAAAAAMAQAAABcADgAAQAG8AzgAAJSEiJjURNDYzITIWFREUBiMBPgE3PgE3PgEzMhYXHgEXHgEXHgEXMy4BJy4BJy4BJy4BIyIGBw4BBw4BBw4BFRQWFx4BFx4BFx4BMzI2Nz4BNz4BNz4BNyMOAQcOASMiJicuAScuAScuATU0Njc5ASE+ATc+ATc+ATMyFhceARceARceARczLgEnLgEnLgEnLgEjIgYHDgEHDgEHDgEVFBYXHgEXHgEXHgEzMjY3PgE3PgE3PgE3Iw4BBw4BIyImJy4BJy4BJy4BNTQ2NzkBBSz7qD1XVz0EWD1XVz38mgMKBwYSCwsbEAkQCAgOBgcKBAQGAVoCCggIFA0MHBAPIRIYLBQTIQ4NFQcHBwcHBxUNDiETFCsZFCQQEB0MDBQIBwkCWgMPDAwiFRAbCwsSBgcKAwQDAwQBuQMKBwcSCwsbEAgRCAcPBgYLBAQFAVsCCggIFQwMHBAQIREZLBMUIQ0OFAcHCAgHBxQODSEUEywZEyQREB0MDBQHCAkCWwMODA0hFRAbCwsSBwcKAwMDAwMAVz4CVj5XVz79qj5XAfQNGAoLEAYGBgIDAwgFBQwHBw4JEyEODxgKCg4GBQUJCQgYEA8kFBUtGBcsFBQkDw8XCQgJBgYGEgsLHBARJBQWIg4NDQYGBhEKChcNDRoODhsNDRgKCxAGBgYCAwMIBQUMBwcOCRMhDg8YCgoOBgUFCQkIGBAPJBQVLRgXLBQUJA8PFwkICQYGBhILCxwQESQUFiIODQ0GBgYRCgoXDQ0aDg4bDQAAAAEA4ACgAyAC4AAUAAABFA4CIyIuAjU0PgIzMh4CFQMgLU5pPDxpTi0tTmk8PGlOLQHAPGlOLS1OaTw8aU4tLU5pPAAAAwBAABAEQAOQAAMAEAAfAAA3CQEhJTI2NTQmIyIGFRQWMxM0JiMiBhURFBYzMjY1EUACAAIA/AACAA4VFQ4OFRUOIxUODhUVDg4VEAOA/IBwFhAPGBYREBYB5g8YFhH+1w8YFhEBKQACAEAAAAPAA4AABwAPAAA3ERc3FwcXIQEhEScHJzcnQICwjbCA/nMB8wGNgLCNsIAAAY2AsI2wgAOA/nOAsI2wgAAAAAUAQAAABcADgAAEAAkAFgAzAE8AADcRIREhASERIREBMzUzESM1IxUjETMVJR4BFx4BFx4BFRQGBw4BBw4BBw4BKwERMx4BFzEHETMyNjc+ATc+ATc+ATU0JicuAScuAScuASsBQAWA+oAFNvsUBOz8VLZgYLZkZAJcFB4ODxQHBwkGBwcTDAwhExMsG7CwFioToEcJFwkKEggHDQUFBQQDAg0HBxMMDCARNwADgPyAAzb9FwLp/sCt/kDAwAHArZ0HFA4PIhYVMBsYLhMWIg8OGAoJBwHAAgcHQ/7mBAMCDQcHFwwMIRMRHQ8OGAoJDwQFBQAEAD0AAAXAA4AAEAAdADsAWQAAJSEiJjURNDYzITIWFREUBiMBIxUjNSMRMzUzFTMRBS4BJy4BJy4BKwERMzI2Nz4BNz4BNz4BNS4BJzkBBw4BBw4BKwERMzIWFx4BFx4BFx4BFRQGBw4BBzkBBSr7qT5YWD4EVz5YWD79s2CzZGSzYAGwBxcMDh8TEycWsLAbLBMTHg8MEwcHBgIICXcIEgoJFAxHNxMeDAwTBwcLBAMEBQUFDQcAWD4CVD5YWD79rD5YAp2trf5AwMABwH0WIg4PFAcHBv5ACQcJGA8OJRMWLBgdMBbiCA0CAwQBHwQFBQ8KChgPDh8REx8PDBcHAAAAAAEAQwAGA6ADegCPAAATFCI1JzAmJzQmJy4BBw4BFRwBFR4BFx4BNz4BNz4BMTYyFTAUBxQWFx4BFx4BMzI2Nz4BNz4BNz4DMTYyFTAOAhUUFhceARcWNjc+ATc+ATc+ATc+Azc8ATU0JicmBgcOAzEGIjUwPAI1NCYnJgYHDgEHDgMxBiI1MCYnLgEnJgYHDgExFZAGBAgECAIFDgoHCQMWBwchDxAPBwc2BQQDAwcFCwkKFwwFDQUHCwcMEwgJHxwVBQUDBAMIBQcVEREkEQwTCAkSBQ4ZDAYyOC8ECQcMFgQDPUg8BAUvJBEiERAWCgYiJRwFBQQCAxgoJyYKBywBugUFDBgPBQoHBQQCAw0HBwsHFGsOEQ0HCCAPE5MKCp0wEzURDBMIBwUEAgUKBw8jDhRDQjEKClNzeCUTIxEQGAgHAQoHFQoRJRAnTSYTr8msDwUGAgcNAwQICQaVrY8JCTVUZjE1OwcCBQoKHBALYGpVCgp6Fh9PBQNHHxOQAwAAAAACAEYAAAQ2A4AABAAIAAAlETMRIwkCEQPGcHD8gAOA/IAAA4D8gAOA/kD+QAOAAAACAIAAAAOAA4AABAAJAAAlESERIQEhESERAoABAP8A/gABAP8AAAOA/IADgPyAA4AAAAAAAQCAAAAEAAOAAAMAAAkBEQEEAPyAA4ABwP5AA4D+QAACAEoAAAQ6A4AABAAIAAA3ESMRMwkCEbpwcAOA/IADgAADgPyAA4D+QP5AA4AAAAABAEMAIANDA6AAKQAAAR4BFRQOAiMiLgI1ND4CMzUNATUiDgIVFB4CMzI+AjU0Jic3Aw0aHDxpjE9PjGg9PWiMTwFA/sA8aU4tLU5pPDxpTi0WE1MCYytjNU+MaD09aIxPT4xoPYCts4AtTmk8PGlOLS1OaTwpSx8wAAAAAQBAAGYCIAMTAAYAABMRMyURJSNAzQET/u3NATMBE839U80ABABAAAAEkAOAABcAKwA6AEEAACUnPgM1NC4CJzceAxUUDgIHMS8BPgE1NCYnNx4DFQ4DBzEnPgE1NCYnNx4BFRQGBycFETMlESUjA9oqJj4rFxcrPiYqKkMwGRkwQyqkKTlERDkpITQkFAEUJDMhwyIoKCIqJjAwJir9zc0BE/7tzQAjKF5pcjw8cWleKSMrZnJ8QUF8cmYrgyM1kVRUkTUjHkhQWC8vWVFHHbMWSCkrRhUjHFw0NVkfKQMBE839U80AAAIAQAAAA8MDgAAHAA8AAAEXIREXNxcHAQcnNychEScDKnD+qXCXeZn+JpZ6lnABV20Cc3ABV3CWepP+I5Z6lnD+qmwAAwBAARMFwAJgAAwAGQAmAAABFAYjIiY1NDYzMhYVIRQGIyImNTQ2MzIWFSEUBiMiJjU0NjMyFhUBjWJFRWFhRUViAhZhRUViYkVFYQIdYUVFYmJFRWEBukViYkVFYWFFRWJiRUVhYUVFYmJFRWFhRQAAAAABAGYAJgOaA1oAIAAAARcWFAcGIi8BBwYiJyY0PwEnJjQ3NjIfATc2MhcWFA8BAqP3JCQkYx329iRjHSQk9/ckJCRjHfb2JGMdJCT3AcD2JGMdJCT39yQkJGMd9vYkYx0kJPf3JCQkYx32AAAGAEQABAO8A3wABAAJAA4AEwAYAB0AAAEhFSE1ESEVITURIRUhNQEzFSM1ETMVIzURMxUjNQGnAhX96wIV/esCFf3r/p2ysrKysrIDfFlZ/p1ZWf6dWVkCxrKy/p2ysv6dsrIAAQAAAAEZmqHTqz9fDzz1AAsEAAAAAADR1CIrAAAAANHUIisAAAAABcADoAAAAAgAAgAAAAAAAAABAAADwP/AAAAGAAAAAAAFwAABAAAAAAAAAAAAAAAAAAAAGwQAAAAAAAAAAAAAAAIAAAAGAABgBAAAQAUAAEAFAABABgAAQAYAAEAEAADgBIAAQAQAAEAGAABABgAAPQPgAEMEgABGBAAAgAQAAIAEgABKA4AAQwTAAEAEwABABAAAQAYAAEAEAABmBAAARAAAAAAACgAUAB4AiAC4AQQBYAKGA7ID1AQIBCoEpAUmBegGAAYaBioGQgaABpIG9AcWB1AHhge4AAEAAAAbAM8ABgAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAMAAAAAQAAAAAAAgAHAI0AAQAAAAAAAwAMAEUAAQAAAAAABAAMAKIAAQAAAAAABQALACQAAQAAAAAABgAMAGkAAQAAAAAACgAaAMYAAwABBAkAAQAYAAwAAwABBAkAAgAOAJQAAwABBAkAAwAYAFEAAwABBAkABAAYAK4AAwABBAkABQAWAC8AAwABBAkABgAYAHUAAwABBAkACgA0AOBqdy1zaXgtaWNvbnMAagB3AC0AcwBpAHgALQBpAGMAbwBuAHNWZXJzaW9uIDEuMQBWAGUAcgBzAGkAbwBuACAAMQAuADFqdy1zaXgtaWNvbnMAagB3AC0AcwBpAHgALQBpAGMAbwBuAHNqdy1zaXgtaWNvbnMAagB3AC0AcwBpAHgALQBpAGMAbwBuAHNSZWd1bGFyAFIAZQBnAHUAbABhAHJqdy1zaXgtaWNvbnMAagB3AC0AcwBpAHgALQBpAGMAbwBuAHNGb250IGdlbmVyYXRlZCBieSBJY29Nb29uLgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"},function(a,b,c){function d(a,b){for(var c=0;c<a.length;c++){var d=a[c],e=l[d.id];if(e){e.refs++;for(var f=0;f<e.parts.length;f++)e.parts[f](d.parts[f]);for(;f<d.parts.length;f++)e.parts.push(h(d.parts[f],b))}else{for(var g=[],f=0;f<d.parts.length;f++)g.push(h(d.parts[f],b));l[d.id]={id:d.id,refs:1,parts:g}}}}function e(a){for(var b=[],c={},d=0;d<a.length;d++){var e=a[d],f=e[0],g=e[1],h=e[2],i=e[3],j={css:g,media:h,sourceMap:i};c[f]?c[f].parts.push(j):b.push(c[f]={id:f,parts:[j]})}return b}function f(){var a=document.createElement("style"),b=o();return a.type="text/css",b.appendChild(a),a}function g(){var a=document.createElement("link"),b=o();return a.rel="stylesheet",b.appendChild(a),a}function h(a,b){var c,d,e;if(b.singleton){var h=q++;c=p||(p=f()),d=i.bind(null,c,h,!1),e=i.bind(null,c,h,!0)}else a.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(c=g(),d=k.bind(null,c),e=function(){c.parentNode.removeChild(c),c.href&&URL.revokeObjectURL(c.href)}):(c=f(),d=j.bind(null,c),e=function(){c.parentNode.removeChild(c)});return d(a),function(b){if(b){if(b.css===a.css&&b.media===a.media&&b.sourceMap===a.sourceMap)return;d(a=b)}else e()}}function i(a,b,c,d){var e=c?"":d.css;if(a.styleSheet)a.styleSheet.cssText=r(b,e);else{var f=document.createTextNode(e),g=a.childNodes;g[b]&&a.removeChild(g[b]),g.length?a.insertBefore(f,g[b]):a.appendChild(f)}}function j(a,b){var c=b.css,d=b.media;b.sourceMap;if(d&&a.setAttribute("media",d),a.styleSheet)a.styleSheet.cssText=c;else{for(;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(document.createTextNode(c))}}function k(a,b){var c=b.css,d=(b.media,b.sourceMap);d&&(c+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(d))))+" */");var e=new Blob([c],{type:"text/css"}),f=a.href;a.href=URL.createObjectURL(e),f&&URL.revokeObjectURL(f)}var l={},m=function(a){var b;return function(){return"undefined"==typeof b&&(b=a.apply(this,arguments)),b}},n=m(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),o=m(function(){return document.head||document.getElementsByTagName("head")[0]}),p=null,q=0;a.exports=function(a,b){b=b||{},"undefined"==typeof b.singleton&&(b.singleton=n());var c=e(a);return d(c,b),function(a){for(var f=[],g=0;g<c.length;g++){var h=c[g],i=l[h.id];i.refs--,f.push(i)}if(a){var j=e(a);d(j,b)}for(var g=0;g<f.length;g++){var i=f[g];if(0===i.refs){for(var k=0;k<i.parts.length;k++)i.parts[k]();delete l[i.id]}}}};var r=function(){var a=[];return function(b,c){return a[b]=c,a.filter(Boolean).join("\n")}}()},function(a,b,c){var d,e;d=[c(42),c(45),c(59),c(48),c(89),c(51),c(127),c(95),c(101),c(96),c(83),c(46),c(62),c(114),c(70),c(162),c(67),c(98)],e=function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r){var s={};return s.api=a,s._=b,s.version=c,s.utils=b.extend(d,f,{canCast:p.available,key:h,extend:b.extend,scriptloader:i,rssparser:q,tea:j,UI:g}),s.utils.css.style=s.utils.style,s.vid=k,s.events=b.extend({},l,{state:m}),s.playlist=b.extend({},n,{item:o}),s.plugins=r,s.cast=p,s}.apply(b,d),!(void 0!==e&&(a.exports=e))}])});webpackJsonpjwplayer([2],{105:function(a,b,c){var d,e;d=[],e=function(){function a(a){this.message=a}var b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";a.prototype=new Error,a.prototype.name="InvalidCharacterError",window.btoa||(window.btoa=function(c){for(var d,e,f=String(c),g=0,h=b,i="";f.charAt(0|g)||(h="=",g%1);i+=h.charAt(63&d>>8-g%1*8)){if(e=f.charCodeAt(g+=.75),e>255)throw new a("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");d=d<<8|e}return i}),window.atob||(window.atob=function(c){var d=String(c).replace(/=+$/,"");if(d.length%4==1)throw new a("'atob' failed: The string to be decoded is not correctly encoded.");for(var e,f,g=0,h=0,i="";f=d.charAt(h++);~f&&(e=g%4?64*e+f:f,g++%4)?i+=String.fromCharCode(255&e>>(-2*g&6)):0)f=b.indexOf(f);return i})}.apply(b,d),!(void 0!==e&&(a.exports=e))}});webpackJsonpjwplayer([1],{104:function(a,b,c){var d,e;d=[c(45)],e=function(a){function b(a,b){return function(){a.apply(b,arguments)}}function c(a){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof a)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],i(a,b(e,this),b(f,this))}function d(a){var b=this;return null===this._state?void this._deferreds.push(a):void j(function(){var c=b._state?a.onFulfilled:a.onRejected;if(null===c)return void(b._state?a.resolve:a.reject)(b._value);var d;try{d=c(b._value)}catch(e){return void a.reject(e)}a.resolve(d)})}function e(a){try{if(a===this)throw new TypeError("A promise cannot be resolved with itself.");if(a&&("object"==typeof a||"function"==typeof a)){var c=a.then;if("function"==typeof c)return void i(b(c,a),b(e,this),b(f,this))}this._state=!0,this._value=a,g.call(this)}catch(d){f.call(this,d)}}function f(a){this._state=!1,this._value=a,g.call(this)}function g(){for(var a=0,b=this._deferreds.length;b>a;a++)d.call(this,this._deferreds[a]);this._deferreds=null}function h(a,b,c,d){this.onFulfilled="function"==typeof a?a:null,this.onRejected="function"==typeof b?b:null,this.resolve=c,this.reject=d}function i(a,b,c){var d=!1;try{a(function(a){d||(d=!0,b(a))},function(a){d||(d=!0,c(a))})}catch(e){if(d)return;d=!0,c(e)}}var j=a.defer,k=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)};c.prototype["catch"]=function(a){return this.then(null,a)},c.prototype.then=function(a,b){var e=this;return new c(function(c,f){d.call(e,new h(a,b,c,f))})},c.all=function(){var a=Array.prototype.slice.call(1===arguments.length&&k(arguments[0])?arguments[0]:arguments);return new c(function(b,c){function d(f,g){try{if(g&&("object"==typeof g||"function"==typeof g)){var h=g.then;if("function"==typeof h)return void h.call(g,function(a){d(f,a)},c)}a[f]=g,0===--e&&b(a)}catch(i){c(i)}}if(0===a.length)return b([]);for(var e=a.length,f=0;f<a.length;f++)d(f,a[f])})},c.resolve=function(a){return a&&"object"==typeof a&&a.constructor===c?a:new c(function(b){b(a)})},c.reject=function(a){return new c(function(b,c){c(a)})},c.race=function(a){return new c(function(b,c){for(var d=0,e=a.length;e>d;d++)a[d].then(b,c)})},c._setImmediateFn=function(a){j=a},window.Promise||(window.Promise=c)}.apply(b,d),!(void 0!==e&&(a.exports=e))}});webpackJsonpjwplayer([6],{159:function(a,b,c){var d,e;d=[c(116),c(77),c(73),c(161),c(163),c(160),c(162),c(48),c(62),c(45)],e=function(a,b,c,d,e,f,g,h,i,j){var k=h.noop,l={},m=function(m,n){function o(){return!j.isUndefined(m._instreamAdapter)}function p(a,b){g.log("send command",a,b);var c={command:a};void 0!==b&&(c.args=b),A.sendMessage(g.NS,c,k,function(a){g.log("error message",a),"Invalid namespace"===a.description&&G.stopCasting()})}function q(a){var b=g.available(a.availability);s(b)}function r(a,b){var c=JSON.parse(b);if(!c)throw"Message not proper JSON";if(c.reconcile){E.removeMessageListener(g.NS,this.listenForHandshakeHandler);var d=c.diff,e=E;d.id&&c.appid&&c.pageUrl||(d.id=window.jwplayer().id,c.appid=z.appid,c.pageUrl=C,E=A=null),d.id===n.get("id")&&c.appid===z.appid&&c.pageUrl===C&&(A||(o()&&m.instreamDestroy(),this.sessionStarted(e),this.castModel.set("state",i.IDLE)),this.handleMessage(c)),E=null}}function s(a){var b=!!a;B.available!==b&&(B.available=b,n.set("castAvailable",b))}function t(){return A&&A.receiver?A.receiver.friendlyName:""}function u(a){g.log("Cast Session Error:",a,A);var b=window.chrome;a.code!==b.cast.ErrorCode.CANCEL&&(g.log("Cast Session Error:",a,A),a.code===b.cast.ErrorCode.SESSION_ERROR&&this.stopCasting())}function v(a){var b=window.chrome;a.code!==b.cast.ErrorCode.CANCEL&&(g.log("Cast Session Error:",a,A),a.code===b.cast.ErrorCode.SESSION_ERROR&&this.stopCasting())}function w(a){a/=100,a=Math.max(0,Math.min(a,1)),A.setReceiverVolumeLevel(a,G.mirrorVolume.bind(G),function(a){g.error("set volume error",a)})}function x(a){A.setReceiverMuted(a,G.mirrorVolume.bind(G),function(a){g.error("set muted error",a)})}function y(a,b){function c(a){return function(){b.sendCommand(a)}}return{getContainer:function(){return document.createElement("div")},on:k,onAdPlay:k,onAdSkipped:k,onAdComplete:k,onAdError:k,onCaptionsList:k,onCaptionsChange:k,onPlaylistItem:k,onPlaylistComplete:k,onError:k,onResize:k,onReady:k,onFullscreen:k,getState:k,castToggle:k,setFullscreen:k,setVolume:w,setMute:function(){x(!a.get("mute"))},play:b.play.bind(b),pause:b.pause.bind(b),seek:b.seek.bind(b),playlistNext:c("next"),playlistPrev:c("prev"),load:b.load.bind(b)}}var z,A=null,B={available:!1,active:!1,deviceName:""},C=h.getAbsolutePath(window.location.href),D=null,E=null,F=null;z=j.extend({},l,n.get("cast"));var G=this;this.onExistingSession=function(a){g.log("existing session",a),A||E||(E=a.session,E.addMessageListener(g.NS,this.listenForHandshakeHandler))},this.setActive=function(a){B.active=!!a,B.deviceName=t(),this.castModel.set("castActive",!!a),this.castModel.set("deviceName",t()),this.castModel.set("castState",B)},this.startCasting=function(){if(!A&&!o()){var a=window.chrome;a.cast.requestSession(this.sessionStarted.bind(this),u)}},this.openExtension=function(){if(!o()){var a=window.chrome;a.cast.requestSession(this.sessionStarted.bind(this),v)}},this.stopCasting=function(){return A?(this.removeSessionListeners(),void A.stop(this.sessionStopped.bind(this),this.sessionStopError.bind(this))):void this.sessionStopped()},this.resumePlayback=function(){m.showView(m._view.element()),m.getProvider().name.indexOf("flash")>=0&&n.resetProvider(),m.load(this.castModel.get("item")),m.play()},this.sessionStopError=function(a){g.error("Cast Session Stop error:",a,A),this.sessionStopped()},this.sessionStarted=function(a){if(g.log("Session started:",a),A)this.stopCasting(),F=a;else if(A=a,A.addMessageListener(g.NS,this.onMessageHandler),A.addUpdateListener(this.sessionStatusHandler),this.setupControllerForCasting(),a!==E){var b=f.setupCastConfig(this.castModel,z);D.setup(b),d.sendDummyMedia(a)}},this.sessionStatus=function(a){g.log("Cast Session status",a),a?this.mirrorVolume():(this.castModel.set("state",i.BUFFERING),this.sessionStopped())},this.sessionStopped=function(){g.log("_sessionStopped"),A&&(this.removeSessionListeners(),A=null),D&&(D.destroy(),D=null),this.setActive(!1),null!==F&&(this.sessionStarted(F),F=null),this.resumePlayback()},this.removeSessionListeners=function(){A.removeUpdateListener(this.sessionStatusHandler),A.removeMessageListener(g.NS,this.onMessageHandler)},this.onMessage=function(a,b){var c=JSON.parse(b);if(!c)throw"Message not proper JSON";this.handleMessage(c)},this.handleMessage=function(a){switch(a.type){case"state":this.handleMessageState(a);break;case"ad":this.handleMessageAd(a);break;case"connection":this.handleMessageConnection(a);break;default:g.error("received unhandled message",a.type,a)}},this.handleMessageState=function(a){this.castModel.get("castAdPlaying")&&(a.diff.newstate||a.diff.position)&&this.castModel.set("castAdPlaying",!1),D.updateState(a.diff)},this.handleMessageAd=function(a){this.castModel.set("castAdPlaying",!0),D.updateState(a.diff)},this.handleMessageConnection=function(a){a.closed===!0&&this.stopCasting()},this.mirrorVolume=function(){if(A&&A.receiver){var a=A.receiver.volume;if(a){var b=100*a.level|0,c=!!a.muted;this.castModel.set("mute",c),this.castModel.set("volume",b)}}},this.castToggle=function(){B.active?this.openExtension():this.startCasting()},this.setupControllerForCasting=function(){m.pause(),m.setFullscreen(!1);var d=j.extend(j.pick(n.getConfiguration(),["id","key","edition","playlist","playlistItem","containerWidth","containerHeight","width","height","aspectratio","stretching","compactUI","skin"]),{castAvailable:!0,item:0,state:"playing"}),f=new c(d);f.playlist=j.filter(j.map(f.playlist,function(a){return h=j.extend({},a),h.sources=j.filter(a.allSources,function(a){return"dash"!==a.type}),h}),function(a){return 0!==a.sources.length});var g=new b;this.castModel=g,g.setup(f);var h=g.get("playlist")[0];g.set("playlistItem",h),g.trigger("itemReady",h),g.changeVideoProvider(e),D=g.getVideo(),D.init(p,this.castModel);var i=y(g,D);i.castToggle=function(){this.openExtension()}.bind(this);var k=new a(i,g);k.setup(),m.showView(k.element()),this.mirrorVolume(),this.setActive(!0)},this.onExistingSessionHandler=this.onExistingSession.bind(this),this.sessionStatusHandler=this.sessionStatus.bind(this),this.onMessageHandler=this.onMessage.bind(this),this.listenForHandshakeHandler=r.bind(this),!z.appid||window.cast&&window.cast.receiver||(d.on("availability",q),d.on("session",this.onExistingSessionHandler),d.initialize(z.appid))};return m}.apply(b,d),!(void 0!==e&&(a.exports=e))},160:function(a,b,c){var d,e;d=[c(48),c(45),c(59)],e=function(a,b,c){function d(d,f){var g=b.pick(d.getConfiguration(),["displaytitle","id","item","key","mute","playlist","position","repeat","volume"]);return g.cast=b.extend({pageUrl:h},f),e(g),g.edition=d.get("edition"),g.playerVersion=c,"LIVE"===a.adaptiveType(d.get("duration"))&&"shaka"===d.getVideo().getName().name&&(g.position=0),g}function e(a){var b=a.plugins;delete a.plugins;for(var c in b)if(b.hasOwnProperty(c)){var d=b[c];d.client&&(/[\.\/]/.test(d.client)&&g(d,"client"),d.client.indexOf("vast")>-1&&(a.advertising=f(d)))}}function f(a){var c=b.extend({},a);if(c.client="vast",delete c.companiondiv,c.schedule)for(var d in c.schedule)if(c.schedule.hasOwnProperty(d)){var e=c.schedule[d].ad||c.schedule[d];g(e,"tag")}return g(c,"tag"),c}function g(b,c){b[c]&&(b[c]=a.getAbsolutePath(b[c]))}var h=window.location.href;return{setupCastConfig:d}}.apply(b,d),!(void 0!==e&&(a.exports=e))},161:function(a,b,c){var d,e;d=[c(162),c(46),c(101),c(47),c(45)],e=function(a,b,c,d,e){function f(d){t=d,null!==a.availability?u.trigger("availability",{availability:a.availability}):p&&p.cast?h():n||(n=new c(q),n.addEventListener(b.ERROR,i),n.addEventListener(b.COMPLETE,h),n.load())}function g(a){var b=new p.cast.media.MediaInfo("");b.contentType="video/mp4";var c=new p.cast.media.LoadRequest(b);c.autoplay=!1,a.loadMedia(c)}function h(){p&&p.cast&&p.cast.isAvailable&&!o?(o=new p.cast.ApiConfig(new p.cast.SessionRequest(t),l,m,p.cast.AutoJoinPolicy.ORIGIN_SCOPED),p.cast.initialize(o,k,j)):s++<15&&(r=setTimeout(h,1e3))}function i(){n&&(n.resetEventListeners(),n=null)}function j(){o=null}function k(){}function l(b){u.trigger("session",{session:b}),b.sendMessage(a.NS,{whoami:1}),0===b.media.length&&g(b)}function m(b){a.availability=b,u.trigger("availability",{availability:b})}var n,o,p=window.chrome,q="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js",r=-1,s=0,t=null,u=e.extend({initialize:f,sendDummyMedia:g},d);return u}.apply(b,d),!(void 0!==e&&(a.exports=e))},163:function(a,b,c){var d,e;d=[c(48),c(164),c(46),c(47),c(62),c(45),c(162)],e=function(a,b,c,d,e,f,g){function h(c){var d,e=c.get("castLoading"),f=c.get("playlistItem"),g=f?f.title:"";d=e?g?"Loading "+g+" on ":"Loading on ":g?"Casting "+g+" to ":"Casting to";var h={message:d,deviceName:c.get("deviceName")||"Google Cast"};return a.createElement(b(h))}var i=function(){var b,i=-1,j=a.noop;f.extend(this,d,{lastPosition:0,lastDuration:null}),this.setState=function(a){this.trigger(c.JWPLAYER_PLAYER_STATE,{newstate:a}),this.model.set("state",a)},this.destroy=function(){clearTimeout(i)},this.updateState=function(a){if(a.item){this.setState(e.BUFFERING);var b=this.model.get("playlist"),d=b[a.item];this.model.set("item",a.item),this.model.set("playlistItem",d),this.model.trigger("itemReady",d)}if(void 0!==a.position&&(this.lastPosition=a.position),void 0!==a.duration&&(this.lastDuration=a.duration),a.newstate){var g=a.newstate.toLowerCase();g===e.IDLE&&this.lastPosition&&this.lastPosition===this.lastDuration&&(g=e.COMPLETE),this.setState(g)}if(void 0===a.position&&void 0===a.duration||(this.model.get("state")===e.BUFFERING&&this.setState(e.PLAYING),null!==this.lastDuration&&this.trigger(c.JWPLAYER_MEDIA_TIME,{position:this.lastPosition,duration:this.lastDuration})),void 0!==a.buffer&&this.trigger(c.JWPLAYER_MEDIA_BUFFER,{bufferPercent:a.buffer}),a.tag){this.model.set("adMode",a.complete);var h=["clickthrough","companions","message","podMessage","podCount","sequence","skipMessage","skipText","skipOffset","tag"];f.each(h,function(b){f.isUndefined(a[b])||this.model.set(b,a[b])},this)}},this.supportsFullscreen=function(){return!1},this.init=function(a,b){j=a,this.model=b,this.model.on("itemReady",this.updateScreen,this),this.model.on("change:deviceName",this.updateScreen,this),this._castingScreen=h(this.model)},this.setup=function(a){this.setState(e.BUFFERING),this.sendCommand("setup",a)},this.playlistItem=function(a){this.setState(e.BUFFERING),this.sendCommand("item",a)},this.load=function(a){this.setState(e.BUFFERING),this.sendCommand("load",a)},this.stop=function(){clearTimeout(i),i=setTimeout(function(){this.setState(e.IDLE),this.sendCommand("stop")}.bind(this),0)},this.play=function(){this.sendCommand("play")},this.pause=function(){this.setState(e.PAUSED),this.sendCommand("pause")},this.seek=function(a){this.setState(e.BUFFERING),this.trigger(c.JWPLAYER_MEDIA_SEEK,{position:this.model.get("position"),offset:a}),this.sendCommand("seek",a)},this.skipAd=function(a){this.sendCommand("skipAd",{tag:a.tag})},this.clickAd=function(a){this.sendCommand("clickAd",{tag:a.tag})},this.audioMode=function(){return this.model.get("audioMode")},this.sendCommand=function(a,b){j(a,b)},this.detachMedia=function(){return g.error("detachMedia called while casting"),document.createElement("video")},this.attachMedia=function(){g.error("attachMedia called while casting")},this.updateScreen=function(){b.innerHTML=h(this.model).innerHTML},this.setContainer=function(a){b=a,a.appendChild(this._castingScreen)},this.getContainer=function(){return b},this.remove=function(){b===this._castingScreen.parentNode&&b.removeChild(this._castingScreen)},this.volume=this.mute=this.setControls=this.setCurrentQuality=this.resize=this.seekDrag=this.addCaptions=this.resetCaptions=this.setVisibility=this.fsCaptions=a.noop,this.setFullScreen=this.getFullScreen=this.checkComplete=f.constant(!1),this.getWidth=this.getHeight=this.getCurrentQuality=f.constant(0),this.getQualityLevels=f.constant(["Auto"])};return i.prototype={getName:function(){return{name:"chromecast"}}},i}.apply(b,d),!(void 0!==e&&(a.exports=e))},164:function(a,b,c){var d=c(120);a.exports=(d["default"]||d).template({compiler:[6,">= 2.0.0-beta.1"],main:function(a,b,c,d){var e=this.lambda,f=this.escapeExpression;return'<div class="jw-cast jw-reset" style="display: block;">\n    <div class="jw-cast-label jw-reset">\n        <span class="jw-reset">'+f(e(null!=a?a.message:a,a))+'</span>\n        <span class="jw-cast-name jw-reset">'+f(e(null!=a?a.deviceName:a,a))+"</span>\n    </div>\n</div>"},useData:!0})}});webpackJsonpjwplayer([5],{109:function(a,b,c){var d,e;d=[c(81),c(45),c(55),c(48),c(62),c(46),c(47),c(110)],e=function(a,b,c,d,e,f,g,h){function i(a){function i(){W&&this.state===e.LOADING&&this.setState(e.PLAYING)}function j(a,b){var c,e,f;switch(a){case"urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed":case"edef8ba9-79d6-4ace-a3c8-27dcd51d21ed":return d.isIE()?null:(T="widevine",c="com.widevine.alpha",e=S.widevine,f=e?e.url:"",f||(console.log("No licensing server specified for widevine. Defaulting to proxy."),f="http://widevine-proxy.appspot.com/proxy"),[{keySystem:c,licenseServerUrl:f,licensePreProcessor:function(a){e&&e.customData&&(a.headers.customData=e.customData)}}]);case"urn:mpeg:dash:mp4protection:2011":c="org.w3.clearkey",e=S.clearkey;var g=h.util.Uint8ArrayUtils,i=e?e.key:null,j=b.getAttribute("cenc:default_KID");if(j=j?j.replace(/-/g,""):null,!i||!j)break;j=g.fromHex(j),i=g.fromHex(i);var k={kty:"oct",kid:g.toBase64(j,!1),k:g.toBase64(i,!1)},l={keys:[k]},m=JSON.stringify(l),n={initData:j,initDataType:"webm"};return f="data:application/json;base64,"+window.btoa(m),[{keySystem:c,licenseServerUrl:f,initData:n}];case"urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95":case"9a04f079-9840-4286-ab92-e65be0885f95":return d.isIE()?(T="playready",c="com.microsoft.playready",e=S.playready,f=e?e.url:"",f||(console.log("No licensing server specified for microsoft. Defaulting to proxy."),f="http://microsoft-proxy.appspot.com/proxy"),[{keySystem:c,licenseServerUrl:f,licensePreProcessor:function(a){e&&e.customData&&(a.headers.customData=e.customData)}}]):null;default:return console.log("Unrecognized scheme: "+a,b),null}}function k(a){console.error(a);var b="Unknown playback error";V.trigger(f.JWPLAYER_MEDIA_ERROR,{message:"Error playing file:"+b})}function l(a){switch(a.contentType){case"video":var b={level:{index:V.currentQuality,label:V.currentQuality?a.size.height+"p":"Auto",bitrate:a.bandwidth,width:a.size.width,height:a.size.height},type:"visualQuality"};Y?(b.reason="initial choice",b.mode="auto",Y=!1):a.currentTarget.c.enableAdaptation?b.reason=b.mode="auto":(b.reason="api",b.mode="manual"),V.trigger("visualQuality",b)}}function m(){return this.levels}function n(){return this.currentQuality}function o(a){var b=new h.player.Player(a);return b.addEventListener("error",k),b.addEventListener("adaptation",l),b}function p(a){W&&(d.isAndroid()||a.preload&&"none"!==a.preload)&&r(a)}function q(a){W&&(this.setState(e.LOADING),R!==a?(T=null,Y=!0,r(a)):(Q.currentTime=0,Q.play()))}function r(a){R=a;var b=a.sources[0].file,c=a.starttime;S=a.sources[0].drm||{};var d=new h.util.EWMABandwidthEstimator,e=new h.player.DashVideoSource(b,j,d),f=U.load(e);f.then(s.bind(V)),c&&f.then(function(){this.seek(c)}.bind(V))}function s(){if(W){var a=U.getVideoTracks(),b=U.getAudioTracks();a.length>0?t(a,"video"):t(b,"audio"),V.trigger(f.JWPLAYER_MEDIA_BUFFER_FULL)}}function t(a,c){V.currentQuality=0,V.levels=b.map(a,function(a){var b={contentType:c,label:null,level_id:a.id};return a.height?b.label=a.height+"p":b.label=Math.round(a.bandwidth/1e3)+"kbps",b}),a.length>1&&V.levels.unshift({label:"Auto",level_id:"auto"}),V.trigger(f.JWPLAYER_MEDIA_LEVELS,{levels:V.levels,currentQuality:V.currentQuality})}function u(){return U.isLive()?1/0:Q.duration}function v(){W&&V.trigger(f.JWPLAYER_MEDIA_META,{duration:u(),height:Q.videoHeight,width:Q.videoWidth,drm:T})}function w(){V.setState(e.COMPLETE),X=!1,V.trigger(f.JWPLAYER_MEDIA_COMPLETE)}function x(a,b){return W?g.trigger.call(this,a,b):void 0}function y(){var a=Q;W=!1,U.destroy(),Q=a}function z(){W=!0,U=o(Q),X&&w()}function A(){return X}function B(a){Q.muted=a}function C(){this.setState(e.PAUSED),Q.pause()}function D(){this.setState(e.BUFFERING),Q.play(),this.setVisibility(!0)}function E(a){Q.currentTime=a,this.trigger(f.JWPLAYER_MEDIA_SEEK,{position:Q.currentTime,offset:a})}function F(a){a=!!a,a?c.style(O,{visibility:"visible",opacity:1}):c.style(O,{visibility:"",opacity:0})}function G(){U.unload(),O===Q.parentNode&&O.removeChild(Q)}function H(){Q.pause(),this.setState(e.IDLE)}function I(a){O=a,O.appendChild(Q)}function J(){return O}function K(a){if(a=parseInt(a,10),!(this.currentQuality===a||0>a||a>=this.levels.length)){if(this.currentQuality=a,this.trigger(f.JWPLAYER_MEDIA_LEVEL_CHANGED,{currentQuality:this.currentQuality,levels:this.levels}),0===a)U.configure({enableAdaptation:!0});else{var b=this.levels[a].level_id;U.configure({enableAdaptation:!1});var c;"audio"===this.levels[a].contentType?(c=L(U.getAudioTracks()),c&&c.id===b||(this.setState(e.LOADING),U.selectAudioTrack(b))):(c=L(U.getVideoTracks()),c&&c.id===b||(this.setState(e.LOADING),U.selectVideoTrack(b)))}Q.play()}}function L(a){return b.find(a,function(a){return a.active})}function M(){if(W){var a=Q.currentTime;if(Math.abs(a-this.position)<1&&V.state===e.BUFFERING&&V.setState(e.PLAYING),this.position=a,V.trigger(f.JWPLAYER_MEDIA_TIME,{position:a,duration:u(),quality:1}),a>Q.duration-.1&&Q.duration>1){if(X=!0,V.trigger(f.JWPLAYER_MEDIA_BEFORECOMPLETE),!W)return;w()}}}function N(a){Q.volume=a/100}var O,P=document.getElementById(a),Q=P?P.querySelector("video"):void 0;Q=Q||document.createElement("video");var R,S,T,U=o(Q),V=this,W=!0,X=!1,Y=!0;this.position=0,this.levels=[],this.currentQuality=-1,b.extend(this,g,{init:p,load:q,mute:B,pause:C,getQualityLevels:m.bind(this),getCurrentQuality:n.bind(this),play:D,seek:E,remove:G,setContainer:I,getContainer:J,setCurrentQuality:K.bind(this),setVisibility:F,stop:H,volume:N,trigger:x,attachMedia:z,detachMedia:y,checkComplete:A,supportsFullscreen:b.constant(!0),getName:b.constant({name:"shaka"})}),Q.addEventListener("loadedmetadata",v.bind(this)),Q.addEventListener("timeupdate",M.bind(this)),Q.addEventListener("playing",i.bind(this))}return h.polyfill.installAll(),i.getName=b.constant({name:"shaka"}),{register:function(a){a.api.registerProvider(i)}}}.apply(b,d),!(void 0!==e&&(a.exports=e))},110:function(a,b,c){var d;!function(){var e={};(function(a){function b(a,b){var c=a.split("."),d=Te;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d=d[e]?d[e]:d[e]={}:d[e]=b}function c(a,b){function c(){}c.prototype=b.prototype,a.cc=b.prototype,a.prototype=new c,a.prototype.constructor=a,a.bc=function(a,c,d){return b.prototype[c].apply(a,Array.prototype.slice.call(arguments,2))}}function d(){}function e(a){var b=console[a];b?b.bind||(console[a]=function(){b.apply(console,arguments)}):console[a]=function(){}}function f(a){Ve[a]={na:Ue(),end:NaN}}function g(a){(a=Ve[a])&&(a.end=Ue())}function h(a){return(a=Ve[a])&&a.end?a.end-a.na:NaN}function i(a,b,c){this.id=a,this.bandwidth=b||0,this.lang=c||"unknown",this.active=!1}function j(){this.minBandwidth=this.maxBandwidth=this.maxWidth=this.minHeight=this.maxHeight=null}function k(){this.fontSize="100%",this.fontColor=We,this.fontOpacity=Ye,this.backgroundColor=Xe,this.backgroundOpacity=Ye,this.fontEdge=Ze}function l(a){var b=[];b.push("font-size: "+a.fontSize),b.push("color: "+m(a.fontColor,a.fontOpacity)),b.push("background-color: "+m(a.backgroundColor,a.backgroundOpacity));for(var c=[],d=0;d<a.fontEdge.length;++d){var e=a.fontEdge[d].slice(3,6);c.push(m(a.fontEdge[d].slice(0,3),a.fontOpacity)+" "+e.join("px ")+"px")}return b.push("text-shadow: "+c.join(",")),b.join("; ")}function m(a,b){return"rgba("+a.concat(b).join(",")+")"}function n(a,b){this.id=a,this.lang=b||"unknown",this.enabled=this.active=!1}function o(a,b,c,d){this.id=a,this.bandwidth=b||0,this.width=c||0,this.height=d||0,this.active=!1}function p(a,b){var c=a.width*a.height,d=b.width*b.height;return d>c?-1:c>d?1:a.bandwidth<b.bandwidth?-1:a.bandwidth>b.bandwidth?1:0}function q(){var b="CustomEvent"in a;if(b)try{new CustomEvent("")}catch(c){b=!1}b||(a.CustomEvent=r)}function r(a,b){var c=document.createEvent("CustomEvent"),d=b||{bubbles:!1,cancelable:!1,detail:null};return c.initCustomEvent(a,!!d.bubbles,!!d.cancelable,d.detail),c}function s(){var a=Element.prototype;a.requestFullscreen=a.requestFullscreen||a.mozRequestFullScreen||a.msRequestFullscreen||a.webkitRequestFullscreen,a=Document.prototype,a.exitFullscreen=a.exitFullscreen||a.mozCancelFullScreen||a.msExitFullscreen||a.webkitExitFullscreen,"fullscreenElement"in document||Object.defineProperty(document,"fullscreenElement",{get:function(){return document.mozFullScreenElement||document.msFullscreenElement||document.webkitFullscreenElement}}),document.addEventListener("webkitfullscreenchange",t),document.addEventListener("webkitfullscreenerror",t),document.addEventListener("mozfullscreenchange",t),document.addEventListener("mozfullscreenerror",t),document.addEventListener("MSFullscreenChange",t),document.addEventListener("MSFullscreenError",t)}function t(a){var b=a.type.replace(/^(webkit|moz|MS)/,"").toLowerCase(),b=new Event(b,a);a.target.dispatchEvent(b)}function u(){return Promise.reject(Error("The key system specified is not supported."))}function v(a){return null==a?Promise.resolve():Promise.reject(Error("MediaKeys not supported."))}function w(){throw new TypeError("Illegal constructor.")}function x(){throw new TypeError("Illegal constructor.")}function y(a){if(this.c=[],this.b=[],this.ba=$e,a)try{a(this.W.bind(this),this.a.bind(this))}catch(b){this.a(b)}}function z(){a.Promise||(a.Promise=y,a.Promise.resolve=A,a.Promise.reject=B,a.Promise.all=C,a.Promise.race=D,F=a.setImmediate?function(b){a.setImmediate(b)}:function(b){a.setTimeout(b,0)})}function A(a){var b=new y;return b.W(a),b}function B(a){var b=new y;return b.a(a),b}function C(a){function b(a,b,c){a.ba==$e&&(e[b]=c,d++,d==e.length&&a.W(e))}var c=new y;if(!a.length)return c.W([]),c;for(var d=0,e=Array(a.length),f=c.a.bind(c),g=0;g<a.length;++g)a[g].then?a[g].then(b.bind(null,c,g),f):b(c,g,a[g]);return c}function D(a){for(var b=new y,c=b.W.bind(b),d=b.a.bind(b),e=0;e<a.length;++e)a[e].then?a[e].then(c,d):c(a[e]);return b}function E(a,b,c){F(function(){if(c&&"function"==typeof c){try{var a=c(this.wa)}catch(d){return void b.a(d)}a instanceof y?a==b?b.a(new TypeError("Chaining cycle detected")):a.then(b.W.bind(b),b.a.bind(b)):b.W(a)}else 1==this.ba?b.W(this.wa):b.a(this.wa)}.bind(a))}function F(){}function G(){var a=HTMLVideoElement.prototype;!a.getVideoPlaybackQuality&&"webkitDroppedFrameCount"in a&&(a.getVideoPlaybackQuality=H)}function H(){return{droppedVideoFrames:this.webkitDroppedFrameCount,totalVideoFrames:this.webkitDecodedFrameCount,corruptedVideoFrames:0,creationTime:NaN,totalFrameDelay:0}}function I(a,b){for(var c=[],d=0;d<a.length;++d){for(var e=!1,f=0;f<c.length&&!(e=b?b(a[d],c[f]):a[d]===c[f]);++f);e||c.push(a[d])}return c}function J(){return Date.now()+af}function K(a){this.b=a,this.c=0==bf,this.a=0}function L(a){return a.a<a.b.byteLength}function M(a){var b=a.b.getUint8(a.a);return a.a+=1,b}function N(a){var b=a.b.getUint32(a.a,a.c);return a.a+=4,b}function O(a){var b,c;if(a.c?(b=a.b.getUint32(a.a,!0),c=a.b.getUint32(a.a+4,!0)):(c=a.b.getUint32(a.a,!1),b=a.b.getUint32(a.a+4,!1)),c>2097151)throw new RangeError("DataViewReader: Overflow reading 64-bit value.");return a.a+=8,c*Math.pow(2,32)+b}function P(a){if(a.a+16>a.b.byteLength)throw new RangeError("DataViewReader: Read past end of DataView.");var b=new Uint8Array(a.b.buffer,a.a,16);return a.a+=16,b}function Q(a,b){if(a.a+b>a.b.byteLength)throw new RangeError("DataViewReader: Skip past end of DataView.");a.a+=b}function R(a){this.b=a,this.a=new K(a),_e||(_e=[new Uint8Array([255]),new Uint8Array([127,255]),new Uint8Array([63,255,255]),new Uint8Array([31,255,255,255]),new Uint8Array([15,255,255,255,255]),new Uint8Array([7,255,255,255,255,255]),new Uint8Array([3,255,255,255,255,255,255]),new Uint8Array([1,255,255,255,255,255,255,255])])}function S(a){var b;if(b=T(a),7<b.length)throw new RangeError("EbmlParser: EBML ID must be at most 7 bytes.");for(var c=0,d=0;d<b.length;d++)c=256*c+b[d];b=c,c=T(a);a:{for(d=0;d<_e.length;d++)if(Za(c,_e[d])){d=!0;break a}d=!1}if(d)c=a.b.byteLength-a.a.a;else{if(8==c.length&&224&c[1])throw new RangeError("EbmlParser: Variable sized integer value must be at most 53 bits.");for(var d=c[0]&(1<<8-c.length)-1,e=1;e<c.length;e++)d=256*d+c[e];c=d}return c=a.a.a+c<=a.b.byteLength?c:a.b.byteLength-a.a.a,d=new DataView(a.b.buffer,a.b.byteOffset+a.a.a,c),Q(a.a,c),new U(b,d)}function T(a){var b,c=M(a.a);for(b=1;8>=b&&!(c&1<<8-b);b++);if(b>8)throw new RangeError("EbmlParser: Variable sized integer must fit within 8 bytes.");var d=new Uint8Array(b);for(d[0]=c,c=1;b>c;c++)d[c]=M(a.a);return d}function U(a,b){this.id=a,this.a=b}function V(a){if(8<a.a.byteLength)throw new RangeError("EbmlElement: Unsigned integer has too many bytes.");if(8==a.a.byteLength&&224&a.a.getUint8(0))throw new RangeError("EbmlParser: Unsigned integer must be at most 53 bits.");for(var b=0,c=0;c<a.a.byteLength;c++)var d=a.a.getUint8(c),b=256*b+d;return b}function W(a){this.c=Math.exp(Math.log(.5)/a),this.a=this.b=0}function X(a){return a.b/(1-Math.pow(a.c,a.a))}function Y(a){var b,c=new CustomEvent(a.type,{detail:a.detail,bubbles:!!a.bubbles});for(b in a)b in c||(c[b]=a[b]);return c}function Z(a){return new CustomEvent("error",{detail:a,bubbles:!0})}function $(a,b,c){return _(b),_(c),c==b||a>=df&&c==b.split("-")[0]||a>=ef&&c.split("-")[0]==b.split("-")[0]}function _(a){a=a.toLowerCase().split("-");var b=ff[a[0]];return b&&(a[0]=b),a.join("-")}function aa(a){return Object.keys(a).map(function(b){return a[b]})}function ba(a,b){return ea(a,b,"boolean")}function ca(a,b){var c=ea(a,b,"number");if(null==c)return null;if(isNaN(c)||c==Number.NEGATIVE_INFINITY||c==Number.POSITIVE_INFINITY)throw new RangeError("'"+b+"' must be finite.");if(0>c)throw new RangeError("'"+b+"' must be >= 0");return c}function da(a,b){return ea(a,b,"string")}function ea(a,b,c){if(a=a[b],null==a)return null;if(typeof a!=c)throw new TypeError("'"+b+"' must be a "+c+".");return a}function fa(a,b,c){if(a=a[b],null==a)return null;if(!(a instanceof c))throw new TypeError("'"+b+"' must be an instance of "+c.name+".");return a}function ga(){this.a={}}function ha(a){var b,c=[];for(b in a.a)c.push.apply(c,a.a[b]);return c}function ia(a,b,c){if(a=a.a[b])for(b=0;b<a.length;++b)a[b]==c&&(a.splice(b,1),--b)}function ja(a){var b,c=[];for(b in a.a)c.push(b);return c}function ka(){this.a=new ga}function la(a,b,c,d){b=new na(b,c,d),a.a.push(c,b)}function ma(a){for(var b=ha(a.a),c=0;c<b.length;++c)b[c].sa();a.a.a={}}function na(a,b,c){this.target=a,this.type=b,this.a=c,this.target.addEventListener(b,c,!1)}function oa(a){this.ya=new ga,this.v=a}function pa(a,b){b.currentTarget=a;for(var c=a.ya.get(b.type)||[],d=0;d<c.length;++d){var e=c[d];try{e.handleEvent?e.handleEvent(b):e.call(a,b)}catch(f){}}return a.v&&b.bubbles&&pa(a.v,b),b.defaultPrevented}function qa(){oa.call(this,null),this.a=new W(3),this.c=new W(10),this.b=0}function ra(){var a,b,c=new Promise(function(c,d){a=c,b=d});return c.resolve=a,c.reject=b,c.destroy=ra.prototype.destroy,c}function sa(a){return a.split("").reduce(function(a,b,c){return a+(c&&0==c%4?" "+b:b)})}function ta(){this.g=new ra,this.f=!1,this.a=null,this.b=[],this.c=null}function ua(a,b){if(a.f)throw Error("Cannot append to a running task!");a.b.push(b)}function va(a,b){var c,d=a.b[0](b);d?(c=d[0],a.c=d[1]):(c=Promise.resolve(),a.c=null),c.then(xa(a,function(a){this.a?(this.b=[],this.c=null,wa(this)):(this.b.shift(),this.b.length?va(this,a):(this.g.resolve(a),this.c=null))}))["catch"](xa(a,function(a){this.b=[],this.c=null,this.a?wa(this):this.g.reject(a)}))}function wa(b){var c=Error("Task aborted.");c.type="aborted",b.g.reject(c),a.setTimeout(function(){this.a.resolve(),this.a=null}.bind(b),5)}function xa(a,b){return b.bind(a)}function ya(a,b){oa.call(this,b),this.a=null,this.h=a}function za(b){if(!a.indexedDB)return b=Error("Persistant storage requires IndexedDB support."),b.type="storage",Promise.reject(b);if(b.a)return b=Error("A database connection is already open."),b.type="storage",Promise.reject(b);var c=new ra,d=a.indexedDB.open("content_database",1);return d.onupgradeneeded=xa(b,function(a){this.a=a.target.result,Ba(this,"group_store",{keyPath:"group_id"}),Ba(this,"stream_index_store",{keyPath:"stream_id"}),a=Ba(this,"content_store",{autoIncrement:"true"}),a.createIndex("segment",["stream_id","segment_id"],{unique:!0}),a.createIndex("stream","stream_id",{unique:!1})}),d.onsuccess=xa(b,function(a){this.a=a.target.result,c.resolve()}),d.onerror=function(){c.reject(d.error)},c}function Aa(a){a.a&&(a.a.close(),a.a=null)}function Ba(a,b,c){return a.a.objectStoreNames.contains(b)&&a.a.deleteObjectStore(b),a.a.createObjectStore(b,c)}function Ca(a){return Fa(a,"content_store")}function Da(a){return Fa(a,"stream_index_store")}function Ea(a){return Fa(a,"group_store")}function Fa(a,b){return a.a.transaction([b],a.h).objectStore(b)}function Ga(a,b){var c=new ra,d=a.get(b);return d.onerror=function(){c.reject(d.error)},d.onsuccess=function(){if(d.result)c.resolve(d.result);else{var a=Error("Item not found.");a.type="storage",c.reject(a)}},c}function Ha(){ya.call(this,"readonly",null)}function Ia(a){var b=new ra,c=[],d=Ea(a).openCursor();return d.onerror=function(){b.reject(d.error)},d.onsuccess=function(a){(a=a.target.result)?(c.push(a.key),a["continue"]()):b.resolve(c)},b}function Ja(a,b){return Ga(Ea(a),b).then(xa(a,function(a){return a.session_ids=I(a.session_ids),a.hasOwnProperty("duration")||a.hasOwnProperty("key_system")?Promise.resolve(a):Ka(this,a.stream_ids[0]).then(function(b){return a.duration=b.duration,a.key_system=b.key_system,a.license_server=b.license_server,a.with_credentials=b.with_credentials,a.distinctive_identifier=b.distinctive_identifier,a.audio_robustness=b.audio_robustness,a.video_robustness=b.video_robustness,Promise.resolve(a)})}))}function Ka(a,b){return Ga(Da(a),b)}function La(a,b,c){return Ga(Ca(a).index("segment"),[b,c]).then(function(a){return Promise.resolve(a.content)})}function Ma(a,b,c){MediaSource.isTypeSupported(b),b=a.addSourceBuffer(b),this.v=a,this.c=b,this.l=c,this.i=new ka,this.g=null,this.b=[],this.w=0,this.f=this.a=null,this.u=0,la(this.i,this.c,"updateend",this.B.bind(this))}function Na(a,b){for(var c=a.c.buffered,d=0;d<c.length;++d){var e=c.start(d)-gf,f=c.end(d)+gf;if(b>=e&&f>=b)return c.end(d)-b}return 0}function Oa(a,b,c,d){if(a.a)return a=Error("Cannot fetch ("+a.j+"): previous operation not complete."),a.type="stream",Promise.reject(a);a.a=new ta,c!=a.c.timestampOffset&&(a.c.timestampOffset=c),"idb"!=b.url.b[0].P||a.g||(a.g=new Ha,ua(a.a,function(){return[za(this.g)]}.bind(a))),d&&ua(a.a,function(){return[Ta(this,d),this.h.bind(this)]}.bind(a)),ua(a.a,function(){var a=b.a?b.a-b.b:1,c=new tc;return c.a=3,c.h=1e3*a,c.c=1e3*this.u,c.i=this.g,[Bc(b.url,c,this.l),zc.prototype.g.bind(b.url)]}.bind(a)),ua(a.a,xa(a,function(a){return this.l.getBandwidth(),[Ta(this,a),this.h.bind(this)]}));var e=0==a.c.buffered.length&&0==a.b.length,f=null;return ua(a.a,function(){if(0==this.c.buffered.length){var a=Error("Failed to buffer segment ("+this.j+").");return a.type="stream",[Promise.reject(a)]}e&&(a=b.b,f=this.c.buffered.start(0)-a),a=Mc(this.b,b.b),a>=0?this.b.splice(a+1,0,b):this.b.push(b)}.bind(a)),Sa(a).then(function(){return Promise.resolve(f)}.bind(a))}function Pa(a){return a.a?(a=Error("Cannot clear ("+a.j+"): previous operation not complete."),a.type="stream",Promise.reject(a)):(a.a=new ta,ua(a.a,function(){var a;a:if(0==this.c.buffered.length)a=Promise.resolve();else{try{this.c.remove(0,Number.POSITIVE_INFINITY)}catch(b){a=Promise.reject(b);break a}this.b=[],a=this.f=new ra}return[a,this.h.bind(this)]}.bind(a)),Sa(a))}function Qa(a,b){if(a.a){var c=Error("Cannot clearAfter ("+a.j+"): previous operation not complete.");return c.type="stream",Promise.reject(c)}return a.a=new ta,ua(a.a,function(){return[Ua(this,b),this.h.bind(this)]}.bind(a)),Sa(a)}function Ra(a){return a.a?(a=a.a,a.a?a=a.a:a.f?(a.c&&a.c(),a.a=new ra,a=a.a):(a.f=!0,a=Promise.resolve())):a=Promise.resolve(),a}function Sa(a){return a.a.start(),a.a.g.then(xa(a,function(){this.a=null}))["catch"](xa(a,function(a){return this.a=null,Promise.reject(a)}))}function Ta(a,b){try{a.c.appendBuffer(b)}catch(c){return Promise.reject(c)}return a.f=new ra,a.f}function Ua(a,b){if(0==a.c.buffered.length)return Promise.resolve();var c=Mc(a.b,b);if(-1==c||c==a.b.length-1)return Promise.resolve();try{a.c.remove(a.b[c+1].b,Number.POSITIVE_INFINITY)}catch(d){return Promise.reject(d)}return a.b=a.b.slice(0,c+1),a.f=new ra,a.f}function Va(a){return String.fromCharCode.apply(null,a)}function Wa(a){for(var b=new Uint8Array(a.length),c=0;c<a.length;++c)b[c]=a.charCodeAt(c);return b}function Xa(b){return Wa(a.atob(b.replace(/-/g,"+").replace(/_/g,"/")))}function Ya(a){for(var b="",c=0;c<a.length;++c){var d=a[c].toString(16);1==d.length&&(d="0"+d),b+=d}return b}function Za(a,b){if(!a&&!b)return!0;if(!a||!b||a.length!=b.length)return!1;for(var c=0;c<a.length;++c)if(a[c]!=b[c])return!1;return!0}function $a(){this.h=this.a="",this.i=!1,this.u=this.l=null,this.v=this.g=!1,this.j=this.f="",this.c=null,this.b=[]}function _a(a){var b=new $a;if(!a)return b;var c=da(a,"keySystem");if(null==c)throw Error("'keySystem' cannot be null.");b.a=c;var d=da(a,"licenseServerUrl");if(null!=d)b.h=d;else if(c)throw Error("For encrypted streaming content, 'licenseServerUrl' cannot be null or empty.");if(c=ba(a,"withCredentials"),null!=c&&(b.i=c),c=fa(a,"licensePostProcessor",Function),null!=c&&(b.l=c),c=fa(a,"licensePreProcessor",Function),null!=c&&(b.u=c),c=ba(a,"distinctiveIdentifierRequired"),null!=c&&(b.g=c),c=ba(a,"persistentStateRequired"),null!=c&&(b.v=c),c=da(a,"audioRobustness"),null!=c&&(b.f=c),c=da(a,"videoRobustness"),null!=c&&(b.j=c),c=fa(a,"serverCertificate",Uint8Array),null!=c&&(b.c=c),c=fa(a,"initData",Object)){if(a=fa(c,"initData",Uint8Array),null==a)throw Error("'initData.initData' cannot be null.");if(c=da(c,"initDataType"),null==c)throw Error("'initData.initDataType' cannot be null.");b.b.push({initData:new Uint8Array(a.buffer),initDataType:c})}return b}function ab(a,b){var c=a.b.concat(b.map(function(a){return{initData:new Uint8Array(a.initData.buffer),initDataType:a.initDataType}}));a.b=I(c,bb)}function bb(a,b){return a.initDataType==b.initDataType&&Za(a.initData,b.initData)}function cb(a,b){try{var c=new eb(a,b);return Promise.resolve(c)}catch(d){return Promise.reject(d)}}function db(a){var b=this.mediaKeys;return b&&b!=a&&gb(b,null),delete this.mediaKeys,(this.mediaKeys=a)&&gb(a,this),Promise.resolve()}function eb(a,b){this.a=this.keySystem=a;var c=!0;"org.w3.clearkey"==a&&(this.a="webkit-org.w3.clearkey",c=!1);var d,e=!1;d=document.getElementsByTagName("video"),d=d.length?d[0]:document.createElement("video");for(var f=0;f<b.length;++f){var g=b[f],h={audioCapabilities:[],videoCapabilities:[],persistentState:"optional",distinctiveIdentifier:"optional",initDataTypes:g.initDataTypes,sessionTypes:["temporary"]},i=!1;if(g.audioCapabilities)for(var j=0;j<g.audioCapabilities.length;++j){var k=g.audioCapabilities[j];k.contentType&&(i=!0,d.canPlayType(k.contentType.split(";")[0],this.a)&&(h.audioCapabilities.push(k),e=!0))}if(g.videoCapabilities)for(j=0;j<g.videoCapabilities.length;++j)k=g.videoCapabilities[j],k.contentType&&(i=!0,d.canPlayType(k.contentType,this.a)&&(h.videoCapabilities.push(k),e=!0));if(i||(e=d.canPlayType("video/mp4",this.a)||d.canPlayType("video/webm",this.a)),"required"==g.persistentState&&(c?(h.persistentState="required",h.sessionTypes=["persistent-license"]):e=!1),e)return void(this.b=h)}throw c="Unsupported keySystem","org.w3.clearkey"!=a&&"com.widevine.alpha"!=a||(c="None of the requested configurations were supported."),c=Error(c),c.name="NotSupportedError",c.code=DOMException.NOT_SUPPORTED_ERR,c}function fb(a){this.g=a,this.b=null,this.a=new ka,this.c=[],this.f={}}function gb(a,b){a.b=b,ma(a.a),b&&(la(a.a,b,"webkitneedkey",a.Rb.bind(a)),la(a.a,b,"webkitkeymessage",a.Qb.bind(a)),la(a.a,b,"webkitkeyadded",a.Ob.bind(a)),la(a.a,b,"webkitkeyerror",a.Pb.bind(a)))}function hb(a,b){var c=a.f[b];return c?c:(c=a.c.shift())?(c.sessionId=b,a.f[b]=c):null}function ib(a,b,c){oa.call(this,null),this.f=a,this.h=!1,this.a=this.b=null,this.c=b,this.g=c,this.sessionId="",this.expiration=NaN,this.closed=new ra,this.keyStatuses=new mb}function jb(a,b,c){if(a.h)return Promise.reject(Error("The session is already initialized."));a.h=!0;var d;try{if("persistent-license"==a.g)if(c)d=Wa("LOAD_SESSION|"+c);else{var e=new Uint8Array(b);d=Wa("PERSISTENT|"+Va(e))}else d=new Uint8Array(b)}catch(f){return Promise.reject(f)}a.b=new ra;try{a.f.webkitGenerateKeyRequest(a.c,d)}catch(g){if("InvalidStateError"!=g.name)return a.b=null,Promise.reject(g);setTimeout(function(){try{this.f.webkitGenerateKeyRequest(this.c,d)}catch(a){this.b.reject(a),this.b=null}}.bind(a),10)}return a.b}function kb(a,b){a.keyStatuses.Ma(b);var c=Y({type:"keystatuseschange"});a.dispatchEvent(c)}function lb(a){this.b=a,this.a=0}function mb(){this.size=0,this.a=void 0}function nb(a){this.systemIds=[],this.cencKeyIds=[],this.a=[],a=new K(new DataView(a.buffer));try{for(;L(a);){var b=a.a,c=N(a),d=N(a);if(1==c?c=O(a):0==c&&(c=a.b.byteLength-b),1886614376!=d)Q(a,c-(a.a-b));else{var e=M(a);if(e>1)Q(a,c-(a.a-b));else{Q(a,3);var f=Ya(P(a)),g=[];if(e>0)for(var h=N(a),i=0;h>i;++i){var j=Ya(P(a));g.push(j)}var k=N(a);Q(a,k),this.cencKeyIds.push.apply(this.cencKeyIds,g),this.systemIds.push(f),this.a.push({start:b,end:a.a-1}),a.a!=b+c&&Q(a,c-(a.a-b))}}}}catch(l){}}function ob(a,b){try{var c=new pb(a,b);return Promise.resolve(c)}catch(d){return Promise.reject(d)}}function pb(a,b){this.keySystem=a;for(var c=!1,d=0;d<b.length;++d){var e=b[d],f={audioCapabilities:[],videoCapabilities:[],persistentState:"optional",distinctiveIdentifier:"optional",initDataTypes:e.initDataTypes,sessionTypes:["temporary"]},g=!1;if(e.audioCapabilities)for(var h=0;h<e.audioCapabilities.length;++h){var i=e.audioCapabilities[h];if(i.contentType){var g=!0,j=i.contentType.split(";")[0];MSMediaKeys.isTypeSupported(this.keySystem,j)&&(f.audioCapabilities.push(i),c=!0)}}if(e.videoCapabilities)for(h=0;h<e.videoCapabilities.length;++h)i=e.videoCapabilities[h],i.contentType&&(g=!0,j=i.contentType.split(";")[0],MSMediaKeys.isTypeSupported(this.keySystem,j)&&(f.videoCapabilities.push(i),c=!0));if(g||(c=MSMediaKeys.isTypeSupported(this.keySystem,"video/mp4")),"required"==e.persistentState&&(f.persistentState="required",f.sessionTypes=["persistent-license"]),c)return void(this.a=f)}throw c=Error("Unsupported keySystem"),c.name="NotSupportedError",c.code=DOMException.NOT_SUPPORTED_ERR,c}function qb(a){var b=this.mediaKeys;return b&&b!=a&&sb(b,null),delete this.mediaKeys,(this.mediaKeys=a)?sb(a,this):Promise.resolve()}function rb(a){this.a=new MSMediaKeys(a),this.b=new ka}function sb(a,b){function c(){b.msSetMediaKeys(d.a),b.removeEventListener("loadedmetadata",c)}if(ma(a.b),!b)return Promise.resolve();la(a.b,b,"msneedkey",ub);var d=a;try{return 1<=b.readyState?b.msSetMediaKeys(a.a):b.addEventListener("loadedmetadata",c),Promise.resolve()}catch(e){return Promise.reject(e)}}function tb(a){oa.call(this,null),this.c=null,this.g=a,this.b=this.a=null,this.f=new ka,this.sessionId="",this.expiration=NaN,this.closed=new ra,this.keyStatuses=new yb}function ub(a){var b=a.initData;if(b){var c=new nb(b);if(1>=c.a.length)a=b;else{var d=[];for(a=0;a<c.a.length;a++)d.push(b.subarray(c.a[a].start,c.a[a].end+1));for(b=I(d,vb),a=c=0;a<b.length;a++)c+=b[a].length;for(c=new Uint8Array(c),a=d=0;a<b.length;a++)c.set(b[a],d),d+=b[a].length;a=c}}else a=b;a=Y({type:"encrypted",initDataType:"cenc",initData:a}),this.dispatchEvent(a)}function vb(a,b){return Za(a,b)}function wb(a,b){a.keyStatuses.Ma(b);var c=Y({type:"keystatuseschange"});a.dispatchEvent(c)}function xb(a){this.b=a,this.a=0}function yb(){this.size=0,this.a=void 0}function zb(){Navigator.prototype.requestMediaKeySystemAccess&&MediaKeySystemAccess.prototype.getConfiguration||(HTMLMediaElement.prototype.webkitGenerateKeyRequest?(hf=new Uint8Array([0]),Navigator.prototype.requestMediaKeySystemAccess=cb,delete HTMLMediaElement.prototype.mediaKeys,HTMLMediaElement.prototype.mediaKeys=null,HTMLMediaElement.prototype.setMediaKeys=db,a.MediaKeys=fb,a.MediaKeySystemAccess=eb):a.MSMediaKeys?(jf=new Uint8Array([0]),delete HTMLMediaElement.prototype.mediaKeys,HTMLMediaElement.prototype.mediaKeys=null,HTMLMediaElement.prototype.setMediaKeys=qb,a.MediaKeys=rb,a.MediaKeySystemAccess=pb,Navigator.prototype.requestMediaKeySystemAccess=ob):(Navigator.prototype.requestMediaKeySystemAccess=u,delete HTMLMediaElement.prototype.mediaKeys,HTMLMediaElement.prototype.mediaKeys=null,HTMLMediaElement.prototype.setMediaKeys=v,a.MediaKeys=w,a.MediaKeySystemAccess=x))}function Ab(a){var b;a instanceof Ab?(Bb(this,a.P),this.ca=a.ca,this.S=a.S,Cb(this,a.ia),this.O=a.O,Db(this,a.a.clone()),this.aa=a.aa):a&&(b=String(a).match(kf))?(Bb(this,b[1]||"",!0),this.ca=Eb(b[2]||""),this.S=Eb(b[3]||"",!0),Cb(this,b[4]),this.O=Eb(b[5]||"",!0),Db(this,b[6]||"",!0),this.aa=Eb(b[7]||"")):this.a=new Hb(null)}function Bb(a,b,c){a.P=c?Eb(b,!0):b,a.P&&(a.P=a.P.replace(/:$/,""))}function Cb(a,b){if(b){if(b=Number(b),isNaN(b)||0>b)throw Error("Bad port number "+b);a.ia=b}else a.ia=null}function Db(a,b,c){b instanceof Hb?a.a=b:(c||(b=Fb(b,of)),a.a=new Hb(b))}function Eb(a,b){return a?b?decodeURI(a):decodeURIComponent(a):""}function Fb(a,b,c){return"string"==typeof a?(a=encodeURI(a).replace(b,Gb),c&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Gb(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(15&a).toString(16)}function Hb(a){this.b=a||null}function Ib(a,b,c){if(!a.a&&(a.a={},a.c=0,a.b))for(var d=a.b.split("&"),e=0;e<d.length;e++){var f=d[e].indexOf("="),g=null,h=null;f>=0?(g=d[e].substring(0,f),h=d[e].substring(f+1)):g=d[e],g=decodeURIComponent(g.replace(/\+/g," ")),h=h||"",Ib(a,g,decodeURIComponent(h.replace(/\+/g," ")))}a.b=null,(d=a.a.hasOwnProperty(b)&&a.a[b])||(a.a[b]=d=[]),d.push(c),a.c++}function Jb(){this.id=this.url=null,this.type="static",this.b=this.j=this.s=null,this.h=5,this.f=this.c=this.g=null,this.i=1,this.a=[]}function Kb(){this.g=this.f=this.c=this.s=this.a=this.start=this.id=null,this.b=[]}function Lb(){this.i=this.b=this.height=this.width=this.contentType=this.lang=this.group=this.id=null,this.c=!1,this.h=this.g=this.f=this.s=null,this.j=[],this.a=[]}function Mb(){this.value=null}function Nb(){this.contentType=this.lang=this.id=null}function Ob(){this.a=this.b=this.g=this.s=this.h=this.f=this.height=this.width=this.bandwidth=this.lang=this.id=null,this.c=[]}function Pb(){this.b=this.a=this.c=this.f=null}function Qb(){this.parsedPssh=this.psshBox=null}function Rb(){this.url=null}function Sb(){this.url=null}function Tb(){this.s=null,this.g=1,this.c=this.b=this.a=this.f=null}function Ub(){this.a=this.url=null}function Vb(){this.a=this.url=null}function Wb(){this.s=null,this.f=1,this.b=this.g=null,this.i=1,this.h=null,this.a=[],this.c=null}function Xb(){this.a=this.b=null}function Yb(){this.a=1,this.b=this.i=null,this.j=1,this.c=this.g=this.f=this.h=null}function Zb(){this.a=[]}function $b(){this.c=this.a=this.b=null}function _b(a,b){this.na=a,this.end=b}function ac(a){for(var b=[],c=0;c<a.b.length;++c){var d=a.b[c];null!=d.group&&(b[d.group]=!0)}for(c=0;c<a.b.length;++c)if(d=a.b[c],null==d.group){for(var e=1;1==b[e];)++e;b[e]=!0,d.group=e}}function bc(a,b){if(!b||0===b.length)return a;for(var c=[],d=0;d<b.length;d++){var e=b[d].url;null==a||0===a.length?c.push(new Ab(e)):(e=cc(a.slice(0,1),e),c.push(e[0]))}return c}function cc(a,b){if(!b)return a;var c=new Ab(b);return a?a.map(function(a){return a.resolve(c)}):[c]}function dc(a,b,c){var d=jc(c);return(b=fc(b,c.constructor.TAG_NAME))&&d.parse(a,b),d}function ec(a,b,c){var d=null;return(b=fc(b,c.TAG_NAME))&&(d=new c,d.parse(a,b)),d}function fc(a,b){for(var c=null,d=0;d<a.childNodes.length;d++)if(a.childNodes[d].tagName==b){if(c)return null;c=a.childNodes[d]}return c}function gc(a,b,c){for(var d=[],e=0;e<b.childNodes.length;e++)if(b.childNodes[e].tagName==c.TAG_NAME){var f=new c;f.parse.call(f,a,b.childNodes[e]),d.push(f)}return d;
}function hc(a){return a=a.firstChild,a.nodeType!=Node.TEXT_NODE?null:a.nodeValue}function ic(a){return a?a.map(function(a){return a.clone()}):null}function jc(a){return a?a.clone():null}function kc(a,b,c,d){return a=c(a.getAttribute(b)),null!=a?a:void 0!==d?d:null}function lc(a){return a?(a=Date.parse(a),isNaN(a)?null:Math.floor(a/1e3)):null}function mc(b){if(!b)return null;var c=/^P(?:([0-9]*)Y)?(?:([0-9]*)M)?(?:([0-9]*)D)?(?:T(?:([0-9]*)H)?(?:([0-9]*)M)?(?:([0-9.]*)S)?)?$/.exec(b);if(!c)return null;b=0;var d=qc(c[1]);return d&&(b+=31536e3*d),(d=qc(c[2]))&&(b+=2592e3*d),(d=qc(c[3]))&&(b+=86400*d),(d=qc(c[4]))&&(b+=3600*d),(d=qc(c[5]))&&(b+=60*d),c=a.parseFloat(c[6]),(c=isNaN(c)?null:c)&&(b+=c),b}function nc(a){var b=/([0-9]+)-([0-9]+)/.exec(a);return b?(a=qc(b[1]),null==a?null:(b=qc(b[2]),null==b?null:new _b(a,b))):null}function oc(b){return b=a.parseInt(b,10),isNaN(b)?null:b}function pc(b){return b=a.parseInt(b,10),b>0?b:null}function qc(b){return b=a.parseInt(b,10),b>=0?b:null}function rc(a){return a}function sc(a,b){this.url=a,this.b=b||new tc,this.g=this.i=this.h=0,this.a=null,this.c=new ra,this.f=null}function tc(){this.body=null,this.a=1,this.h=1e3,this.c=0,this.method="GET",this.f="arraybuffer",this.b={},this.g=this.j=!1,this.i=null}function uc(a){vc(a),a.b.body=null,a.c.destroy(),a.c=null,a.f=null}function vc(a){a.a&&(a.a.onload=null,a.a.onreadystatechange=null,a.a.onerror=null,a.a.ontimeout=null),a.a=null}function wc(a){var b=a.url.split("/");return La(a.b.i,parseInt(b[2],10),parseInt(b[3],10)).then(xa(a,function(a){var b=JSON.parse(JSON.stringify(new XMLHttpRequest));return b.response=a,a=this.c,a.resolve(b),uc(this),a}))["catch"](xa(a,function(a){return uc(this),Promise.reject(a)}))}function xc(a,b,c){return b=Error(b),b.type=c,b.status=a.a.status,b.url=a.url,b.method=a.b.method,b.body=a.b.body,b.ac=a.a,b}function yc(b){vc(b),a.setTimeout(b.rb.bind(b),b.g*(1+.5*(2*Math.random()-1))),b.g*=2}function zc(a,b,c,d){this.b=b,this.f=c||0,this.h=null!=d?d:null,this.c=this.a=null,this.i=a}function Ac(a,b){return a&&0!==a.length?a.map(function(a){return a.resolve(b)}):[b]}function Bc(a,b,c){return a.a?a.a:(b=b||new tc,(a.f||a.h)&&(b.b.Range="bytes="+(a.f+"-"+(null!=a.h?a.h:""))),a.a=Cc(a,0,b,c),a.a)}function Cc(a,b,c,d){var e=a.b[b].toString();return a.i&&(e=a.i(e,c.b)||e),a.c=new sc(e,c),d&&(a.c.f=d),e=a.c.rb().then(xa(a,function(a){return this.c=this.a=null,Promise.resolve(a.response)})),e=e["catch"](xa(a,function(a){return this.a&&b+1<this.b.length?this.a=Cc(this,b+1,c,d):(this.a=this.c=null,Promise.reject(a))}))}function Dc(a,b){this.a=new tc,this.a.f="text",this.a.a=3,this.a.c=1e3*(null!=b?b:0),this.a.g=!0,this.b=a}function Ec(a){var b=a.b;return Bc(b,a.a).then(function(a){var c;return c=b.b,(c=(a=(new DOMParser).parseFromString(a,"text/xml"))?ec({s:c},a,Jb):null)?Promise.resolve(c):(c=Error("MPD parse failure."),c.type="dash",Promise.reject(c))})}function Fc(a,b,c,d){for(var e=b.a,f=[],g=0;d>g;++g){var h=g+c,i=(h-1)*e.b,j=i/e.a,k=(i+e.b)/e.a,h=Gc(a,b,e.j+h-1,i);if(!h)return null;f.push(new Kc(j,k,h))}return f}function Gc(a,b,c,d){if(!b.a)return null;var e=b.a.h;return e?(c=Hc(e,b.id,c,b.bandwidth,d))?(b=Ac(b.s,c),new zc(a,b,0,null)):null:b.s?new zc(a,b.s,0,null):null}function Hc(b,c,d,e,f){var g={RepresentationID:c,Number:d,Bandwidth:e,Time:f};b=b.replace(/\$(RepresentationID|Number|Bandwidth|Time)?(?:%0([0-9]+)d)?\$/g,function(b,c,d){if("$$"==b)return"$";var e=g[c];return null==e?b:("RepresentationID"==c&&d&&(d=void 0),b=e.toString(),d=a.parseInt(d,10)||1,d=Math.max(0,d-b.length),Array(d+1).join("0")+b)});try{return new Ab(b)}catch(h){if(h instanceof URIError)return null;throw h}}function Ic(a,b,c){var d=0;b*=c,a=a.a,c=[];for(var e=0;e<a.length&&a[e].a;++e){var f=a[e].b,f=null!=f?f:d,g=a[e].c||0;0>g&&(g=a[e].a,g=e+1===a.length?Math.ceil((a[0].b+b-f)/g)-1:Math.ceil((a[e+1].b-f)/g)-1),0<c.length&&f!=d&&(c[c.length-1].end=f);for(var h=0;g>=h;++h)d=f+a[e].a,c.push({start:f,end:d}),f=d}return c}function Jc(a,b){this.a=a,this.b=b||null}function Kc(a,b,c){this.b=a,this.a=b,this.url=c}function Lc(a,b,c){return new Kc(b,c,a.url)}function Mc(a,b){for(var c=a.length-1;c>=0;--c){var d=a[c];if(b>=d.b&&(null==d.a||b<d.a))return c}return-1}function Nc(a,b){return a.map(function(a){return Lc(a,a.b+b,null!=a.a?a.a+b:null)})}function Oc(){}function Pc(a){this.o=a,this.i=0}function Qc(a){if(0==a.o.length)throw new RangeError("SegmentIndex: There is no first SegmentReference.");return a.o[0]}function Rc(a,b){if(a.i!=b.i&&(b=new Pc(Nc(b.o,a.i-b.i))),0==a.length())a.o=b.o.slice(0);else if(0!=b.length()&&null!=a.A().a&&!(null!=b.A().a&&b.A().a<a.A().a)){if(a.A().a<=Qc(b).b)var c=Lc(a.A(),a.A().b,Qc(b).b),c=a.o.slice(0,-1).concat([c]);else{var d;for(d=0;d<a.o.length&&!(a.o[d].a>=Qc(b).b);++d);a.o[d].b<Qc(b).b?(c=Lc(a.o[d],a.o[d].b,Qc(b).b),c=a.o.slice(0,d).concat([c])):(Qc(a).b>Qc(b).b||Qc(b),c=a.o.slice(0,d))}a.o=c.concat(b.o)}}function Sc(a,b,c,d){Pc.call(this,a),this.g=b,this.w=c,this.f=d,this.h=this.g.b||this.g.a.reduce(function(a,b){return null==b.a?NaN:a+b.a},0)||0,this.a=this.l=this.c=null,Tc(this)}function Tc(a){if(Wc(a),0!=a.length()){a.length();var b=null!=a.A().a?a.A().a:a.A().b;if(a.g.c>a.f)a.c=b;else{var c=a.f-(a.g.c+a.w.start);0>c?a.c=b:c<Math.max(a.A().b,a.A().a||0)?(a.A(),a.c=b):a.c=c}a.l=a.A().b,a.a=Qc(a).b}}function Uc(a,b){if(Vc(a,b),null==a.c||null==a.l||null==a.a)return{start:0,end:0};var c=Number.POSITIVE_INFINITY;a.h&&(c=a.h);var d=b-a.f,e=a.c+d;return null!=a.g.f&&(e=e-a.a-a.g.f,e>0&&(a.a+=e)),a.a=Math.min(a.a,c),d=a.l+d,d<a.a?{start:a.a,end:a.a}:(d=0<a.length()?null!=a.A().a?Math.min(d,a.A().a):d:a.a,d=Math.max(d,a.a),d=Math.min(d,c),{start:a.a,end:d})}function Vc(a,b){if(Wc(a),null!=a.g.f)if(null==a.c)a.length();else{for(var c=a.c+(b-a.f),d=0,e=0;e<a.o.length;++e){var f=null;if(e<a.o.length-1?f=a.o[e+1].a:(f=a.o[e],f=null!=f.a?f.a+(f.a-f.b):null),!(null!=f&&f<c-a.g.f))break;++d}d>0&&a.o.splice(0,d)}}function Wc(a){if(a.h){for(var b=0,c=a.o.length-1;c>=0&&a.o[c].b>a.h;--c)++b;b>0&&a.o.splice(-b)}}function Xc(a,b,c,d,e){var f,g=1,h=0;if(a.c>d)f=null;else{var i=a.i||0,j=a.f||0;f=c.a,f=f.b/f.a;var k=d-(a.c+b.start);0>k?f=null:(j=k-2*f-j,0>j&&(j=0),j=Math.ceil(j/f)*f,k-=f,0>k?f=null:(i=Math.floor(k/f)*f-i,0>i&&(i=0),i=Math.floor(i/f)*f,f={Za:j/f+1,current:(i>=j?i:j)/f+1}))}if(f&&(g=f.Za,h=f.current-f.Za+1),g=Fc(e,c,g,h),null==g)throw a=Error("Failed to generate SegmentReferences."),a.type="stream",a;Sc.call(this,g,a,b,d),this.u=c,this.v=this.b=0<this.length()?a.c+b.start+this.A().a:null,this.j=f?f.current+1:null,this.B=e}function Yc(a,b){if(null!=a.b&&null!=a.v&&null!=a.j){var c=a.u.a,c=c.b/c.a,d=Math.floor((a.v+(b-a.f)-a.b)/c);if(0!=d){var e=Fc(a.B,a.u,a.j,d);Array.prototype.push.apply(a.o,Nc(e,a.i)),a.b+=d*c,a.j+=d}}}function Zc(a,b,c,d,e){this.f=a,this.b=b,this.c=c,this.h=d,this.a=null,this.g=e}function $c(a,b,c,d,e){this.c=a,this.b=b,this.g=c,this.a=null,this.h=d,this.f=e}function _c(a,b,c,d,e){this.b=a,this.c=b,this.f=c,this.h=d,this.a=null,this.g=e}function ad(a){this.b=a,this.a=null}function bd(){this.C=rf++,this.id=this.D=this.H=null,this.c=0,this.height=this.width=this.bandwidth=null,this.b=this.a="",this.f=[],this.N=!1,this.J=!0}function cd(a){var b=a.a||"";return a.b&&(b+='; codecs="'+a.b+'"'),b}function dd(){this.C=sf++,this.id=null,this.contentType=this.lang="",this.b=!1,this.m=[],this.a=[]}function ed(a){for(var b=[],c=0;c<a.a.length;++c){var d=new hd;d.id=a.C,d.a=a.a[c],d.contentType=a.contentType,d.b=a.m.length?cd(a.m[0]):"",b.push(d)}return b}function fd(){this.id=null,this.start=0,this.b=null,this.a=[]}function gd(){this.b=!1,this.h=this.g=this.f=null,this.c=0,this.a=[]}function hd(){this.id=0,this.a=null,this.b=this.contentType=""}function id(a,b,c,d,e){oa.call(this,a),this.c=b,this.a=new Ma(c,d,e),this.w=this.I=this.b=null,this.K=!1,this.g=null,this.l=!1,this.i=null,this.u=!1,this.h=new ra,this.j=this.f=!1,this.B=0,this.L=15,this.F=!1}function jd(a,b,c){a.b&&!a.l&&(a.l=!0,pd(a),Ra(a.a).then(xa(a,function(){var a=this.c.currentTime;return!b&&0<Na(this.a,a)&&0<=Mc(this.a.b,a)?Promise.resolve():c?Qa(this.a,this.c.currentTime+c):(this.F=!0,Pa(this.a))})).then(xa(a,function(){this.l=!1,od(this,0)}))["catch"](xa(a,function(a){this.l=!1,this.f?(a=Z(a),this.dispatchEvent(a)):this.h.reject(a)})))}function kd(a,b,c){a=a.a;var d=a.b.length;return a=d>0?a.b[d-1]:null,null!=a?null!=a.a?c.la(a.a):null:c.la(b)||(c.length()?c.A():null)}function ld(a){if(!a.u&&null!=a.i){a.u=!0;var b=a.a,c=a.i,d=c-b.w;0!=d&&(b.b=Nc(b.b,d),b.w=c),a.h.resolve(a.i)}}function md(a,b){var c;c=b.a.split("/")[0],c=Y({type:"adaptation",bubbles:!0,contentType:c,size:"video"!=c?null:{width:b.width,height:b.height},bandwidth:b.bandwidth}),a.dispatchEvent(c)}function nd(a){var b=Y({type:"ended"});a.dispatchEvent(b)}function od(b,c){b.g=a.setTimeout(b.Nb.bind(b),c)}function pd(b){null!=b.g&&(a.clearTimeout(b.g),b.g=null)}function qd(a){this.b=a,this.a=null}function rd(a,b){oa.call(this,a),this.b=b,this.g=!0,this.h=this.f=null,this.c=new ra,this.a=null}function sd(){}function td(a,b,c,d,e,f,g){this.g=a,this.i=b,this.f=c,this.a=d,this.c=e,this.j=f,this.b=null,this.h=g}function ud(a){this.a=a}function vd(a,b,c){for(var d=J()/1e3,e=0;e<b.a.length;++e)for(var f=b.a[e],g=0;g<f.b.length;++g){var h=f.b[g];if("text"!=h.contentType)for(var i=0;i<h.a.length;++i){var j=h.a[i],k=0,k=k+(j.g?1:0),k=k+(j.b?1:0),k=k+(j.a?1:0);0==k?(h.a.splice(i,1),--i):1!=k&&(j.g?(j.b=null,j.a=null):j.b&&(j.a=null))}}for(wd(b),e=0;e<b.a.length;++e)for(f=b.a[e],g=0;g<f.b.length;++g){for(i=h=f.b[g],j=null,k=0;k<i.a.length;++k){var l=i.a[k].f||"";j?l!=j&&(i.a.splice(k,1),--k):j=l}0==h.a.length&&(f.b.splice(g,1),--g)}for("dynamic"==b.type&&null==b.c&&(b.c=d),e=new gd,"dynamic"==b.type&&(e.b=!0,e.f=b.g,e.g=new zc(c,b.j||b.url),e.h=b.c),e.c=b.h||5,f=0;f<b.a.length&&(g=b.a[f],null!=g.start);++f)g=xd(a,b,g,d,c),e.a.push(g);return e}function wd(a){if(a.a.length){null==a.a[0].start&&(a.a[0].start=0);var b=function(a){return 0==a||!!a};"dynamic"==a.type&&(a.b=null),b(a.b)&&1==a.a.length&&!b(a.a[0].a)&&(a.a[0].a=a.b);for(var c=0,d=!0,e=0;e<a.a.length;++e){var f=a.a[e-1],g=a.a[e],h=a.a[e+1]||{start:a.b};!b(g.start)&&f&&b(f.start)&&b(f.a)&&(g.start=f.start+f.a),!b(g.a)&&b(h.start)&&(g.a=h.start-g.start),null!=g.start&&null!=g.a?c+=g.a:d=!1}b(a.b)||(e=a.a[a.a.length-1],d?a.b=c:b(e.start)&&b(e.a)?a.b=e.start+e.a:"dynamic"!=a.type&&(a.b=c))}}function xd(a,b,c,d,e){var f=new fd;f.id=c.id,f.start=c.start,f.b=c.a;var g=new ga;c.b.forEach(function(a){g.push(a.contentType||"",a)});for(var h=ja(g),i=0;i<h.length;++i){var j=new ga;g.get(h[i]).forEach(function(a){j.push(a.group,a)});for(var k=ja(j),l=0;l<k.length;++l){var m=new ga;j.get(k[l]).forEach(function(a){m.push(a.lang,a)});for(var n=ja(m),o=0;o<n.length;++o){var p=m.get(n[o]),p=yd(a,b,c,p,d,e);f.a.push(p)}}}return f}function yd(a,b,c,e,f,g){d(e.every(function(a){return a.group==e[0].group&&(a.lang||"")==(e[0].lang||"")&&(a.contentType||"")==(e[0].contentType||"")}));var h=new dd,i=e.filter(function(a){return null!=a.id});i.length==e.length&&(h.id=i.map(function(a){return a.id}).sort().reduce(function(a,b){return a+","+b})),h.lang=e[0].lang||"",h.contentType=e[0].contentType||"",h.b=e.some(function(a){return a.c});for(var i={},j=0;j<e.length;++j)for(var k=e[j],l=0;l<k.a.length;++l){var m=k.a[l],n=Bd(a,m),o=h.a.slice(0);Ad(n,o),0==o.length&&0<h.a.length||!(m=Dd(b,c,m,f,g))||(h.m.push(m),h.a=o,i[m.C]=k)}if(h.a.some(function(a){return""==a.a}))return h.m.forEach(function(a){a.N=!0}),h;for(a=zd(e),j=0;j<h.m.length;++j)m=h.m[j],k=i[m.C],k==a&&(m.N=!0);return h}function zd(a){for(var b=null,c=null,d=0;d<a.length;++d)for(var e=a[d],f=0;f<e.a.length;++f){var g=e.a[f],g=(g.width||1)*(g.height||1)*(g.bandwidth||1);(null==b||b>g)&&(b=g,c=e)}return c}function Ad(a,b){if(0==b.length)Array.prototype.push.apply(b,a);else for(var c=0;c<b.length;++c){for(var d=!1,e=0;e<a.length;++e){var f=b[c],g=a[e];if(f.a==g.a&&f.h==g.h&&f.i==g.i&&f.g==g.g&&f.v==g.v&&f.f==g.f&&f.j==g.j&&Za(f.c,g.c)){d=!0,ab(b[c],a[e].b);break}}d||(b.splice(c,1),--c)}}function Bd(a,b){var c=[];if(0==b.c.length)c.push(new $a);else if(a.a)for(var d=0;d<b.c.length;++d)c.push.apply(c,Cd(a,b.c[d]));return c}function Cd(a,b){var c=[];if(2!=a.a.length)return[];var d=a.a(b.c||"",b.f);if(!(d&&d instanceof Array))return[];for(var e=0;e<d.length;++e){var f=_a(d[e]);0==f.b.length&&b.a&&b.a.psshBox&&ab(f,[{initData:b.a.psshBox,initDataType:"cenc"}]),c.push(f)}return c}function Dd(a,b,c,d,e){if(!c.s||0===c.s.length)return null;var f=null,g=1,h=0;if(c.g)f=c.f.split("/")[1],"mp4"!=f&&"webm"!=f?f=null:(g=c.g,("webm"!=f||g.c)&&(g.a||g.b&&g.b.a)?(h=g.b,h||(h=new Ub,h.url=c.s,h.a=g.a?g.a.clone():null),h=Fd(h,e),g=g.c?Fd(g.c,e):null,a=new td(a,b,f,h,g,d,e),b=new Jc(g),d=new bd,d.H=a,d.D=b,f=d):f=null),g=c.g.g,h=c.g.f;else if(c.b)f=c.b,!f.b&&!f.c&&1<f.a.length?f=null:f.b||b.a||f.c||1!=f.a.length?f.c&&0===f.c.a.length?f=null:(f=f.h?Fd(f.h,e):null,a=new $c(a,b,c,d,e),b=new Jc(f),d=new bd,d.H=a,d.D=b,f=d):f=null,g=c.b.f,h=c.b.g;else if(c.a){a:if(f=c.a,g=0+(f.f?1:0),g+=f.c?1:0,g+=f.b?1:0,0==g?g=!1:(1!=g&&(f.f?(f.c=null,f.b=null):f.c&&(f.b=null)),g=!0),g){if(g=null,f.g&&(g=(f=c.a.g)?Ed(c,f,Vb):null,!g)){f=null;break a}f=g?Fd(g,e):null,g=c.a,g.f?(g=c.f.split("/")[1],"mp4"!=g&&"webm"!=g?a=null:("webm"!=g||f)&&Gc(e,c,1,0)&&(h=(h=c.a.f)?Ed(c,h,Ub):null)?(h=Fd(h,e),a=new td(a,b,g,h,f,d,e)):a=null):a=g.h?g.c?new _c(a,b,c,d,e):g.b?"dynamic"!=a.type&&null==b.a?null:new Zc(a,b,c,d,e):null:null,a?(b=new Jc(f),d=new bd,d.H=a,d.D=b,f=d):f=null}else f=null;g=c.a.a,h=c.a.i}else"text"==c.f.split("/")[0]&&(f=new bd,f.H=new qd(new zc(e,c.s)));if(!f)return null;for(f.id=c.id,h&&(f.c=-1*h/g),f.bandwidth=c.bandwidth,f.width=c.width,f.height=c.height,f.a=c.f||"",f.b=c.h||"",a=0;a<c.c.length;++a)b=c.c[a],b.b&&f.f.push(b.b);return f}function Ed(a,b,c){return(b=Hc(b,a.id,null,a.bandwidth,null))?(c=new c,c.url=Ac(a.s,b),c):null}function Fd(a,b){var c=a.url,d=0,e=null;return a.a&&(d=a.a.na,e=a.a.end),new zc(b,c,d,e)}function Gd(){this.streamStats=null,this.droppedFrames=this.decodedFrames=NaN,this.bufferingTime=this.playTime=this.estimatedBandwidth=0,this.playbackLatency=NaN,this.bufferingHistory=[],this.bandwidthHistory=[],this.streamHistory=[]}function Hd(a,b){var c=new Id(b);a.streamHistory.push(new Jd(c)),!c.videoHeight&&a.streamStats||(a.streamStats=c)}function Id(a){this.videoWidth=a.width,this.videoHeight=a.height,this.videoMimeType=a.a,this.videoBandwidth=a.bandwidth}function Jd(a){this.timestamp=J()/1e3,this.value=a}function Kd(a,b){ya.call(this,"readwrite",b),this.j=a,this.b=0}function Ld(a,b,c,d,e){for(var f=[],g=[],h=0,i=0,j=[],k=b.map(function(a){return a.H.create()}),k=Promise.all(k),l=b.map(function(a){return a.D.create()}),l=Promise.all(l),k=Promise.all([k,l]).then(function(a){f=a[0],g=a[1],h=f.reduce(function(a,b){return a+b.length()},0)}),l=0;l<b.length;++l)k=k.then(function(a){return Nd(this,b[a],f[a],g[a],h,i)}.bind(a,l)),k=k.then(function(a,b){i+=f[a].length(),j.push(b)}.bind(a,l));return k.then(xa(a,function(){return Od(Ea(this))})).then(xa(a,function(a){var b=new ra;c=I(c);var f={group_id:a,stream_ids:j,session_ids:c,duration:d,key_system:e.a,license_server:e.h,with_credentials:e.i,distinctive_identifier:e.g,audio_robustness:e.f,video_robustness:e.j},g=Ea(this).put(f);return g.onsuccess=function(){b.resolve(a)},g.onerror=function(){b.reject(g.error)},b}))}function Md(a,b){return Ga(Ea(a),b).then(xa(a,function(a){var c,d=[];for(c in a.stream_ids)d.push(Qd(this,a.stream_ids[c]));return a=Ea(this),d.push(a["delete"](b)),Promise.all(d)}))}function Nd(a,b,c,d,e,f){var g=[Od(Da(a)),Od(Ca(a).index("stream"))],g=Promise.all(g).then(xa(a,function(a){return{qa:Math.max(a[0],a[1]),ja:new ArrayBuffer(0),Ja:0,o:[],Ca:null,Zb:e,jb:f}})),g=g.then(a.f.bind(a,c));return g=g.then(a.g.bind(a,b,d))}function Od(a){var b=new ra,c=a.openCursor(null,"prev");return c.onsuccess=function(a){a.target.result?b.resolve(a.target.result.key+1):b.resolve(0)},c.onerror=function(){b.reject(c.error)},b}function Pd(a,b){var c=new Uint8Array(a.byteLength+b.byteLength);return c.set(new Uint8Array(a),0),c.set(new Uint8Array(b),a.byteLength),c.buffer}function Qd(a,b){var c=new ra,d=Da(a)["delete"](b);d.onerror=function(){c.reject(d.error)};var e=Ca(a);return e.index("stream").openKeyCursor(IDBKeyRange.only(b)).onsuccess=function(a){(a=a.target.result)&&(e["delete"](a.primaryKey),a["continue"]())},e.transaction.oncomplete=function(){c.resolve()},c}function Rd(a,b,c,d,e,f){this.b=new zc(null,[new Ab(a)]),this.a=new tc,this.a.body=b,this.a.method=c,this.a.a=3,this.a.j=d,this.a.c=1e3*(null!=f?f:0),a=e||{};for(var g in a)this.a.b[g]=a[g]}function Sd(a){return Bc(a.b,a.a).then(function(a){return Promise.resolve(new Uint8Array(a))})}function Td(a,b,c){oa.call(this,a),this.h=b,this.b=c,this.a=this.i=null,this.l=new ka,this.c=[],this.f=[],this.u=0,this.g=new ra,this.j=null,this.w=0}function Ud(b,c){return null==b.j&&(b.j=a.setTimeout(function(){var a=Error("Timeout waiting for sessions.");a.type="storage",this.g.reject(a)}.bind(b),c)),b.g}function Vd(a){return Promise.all(a.f.map(function(a){return a.remove()}))}function Wd(a,b,c){for(var d in b)c=c["catch"](function(a,b){return navigator.requestMediaKeySystemAccess(a,[b])}.bind(null,d,b[d]));return a.b.ha()&&(c=c["catch"](function(){throw Error("Either none of the requested key systems are supported or none of the requested key systems support persistent state.")})),c}function Xd(){var a=Error("EmeManager destroyed");return a.type="destroy",Promise.reject(a)}function Yd(a){for(var b=a.b.ua(),c=0;c<b.length;++c){var d=Zd(a),e=d.load(b[c]);a.f.push(d),e.then(xa(a,function(){this.u++,this.u>=this.f.length&&this.g.resolve()}))["catch"](xa(a,function(a){a=Z(a),this.dispatchEvent(a)}))}}function Zd(a){var b=null;if(a.b.ha())try{b=a.i.createSession("persistent-license")}catch(c){throw Error("Persistent licenses are not supported by this key system or platform.")}else b=a.i.createSession();return la(a.l,b,"message",a.Jb.bind(a)),la(a.l,b,"keystatuseschange",a.yb.bind(a)),b}function $d(a,b,c,d){d=_d(c,d),Sd(new Rd(d.url,d.body,d.method,c.i,d.headers,a.w)).then(xa(a,function(a){return c.l&&(a=c.l(a)),b.update(a)})).then(xa(a,function(){var a=Y({type:"sessionReady",detail:b});this.dispatchEvent(a),this.u++,this.u>=this.f.length&&this.g.resolve()}))["catch"](xa(a,function(a){a.La=b,a=Z(a),this.dispatchEvent(a)}))}function _d(b,c){var d={url:b.h,body:c.slice(0),method:"POST",headers:{}};if("com.microsoft.playready"===b.a){for(var e=String.fromCharCode.apply(null,new Uint16Array(d.body)),e=(new DOMParser).parseFromString(e,"application/xml"),f=e.getElementsByTagName("name"),g=e.getElementsByTagName("value"),h=0;h<f.length;h++)d.headers[f[h].childNodes[0].nodeValue]=g[h].childNodes[0].nodeValue;d.body=a.atob(e.getElementsByTagName("Challenge")[0].childNodes[0].nodeValue)}if(!b.u)return d;if(b.u(d),d.url=da(d,"url"),null==d.url)throw Error("'url' cannot be null.");if(!(d.body instanceof ArrayBuffer||"string"==typeof d.body||null==d.body))throw new TypeError("'body' must be an ArrayBuffer, a string, or null.");if(d.method=da(d,"method"),"GET"!=d.method&&"POST"!=d.method)throw Error("'method' must be either 'GET' or 'POST'.");if(d.headers=fa(d,"headers",Object),null==d.headers)throw Error("'headers' cannot be null.");return d}function ae(a){oa.call(this,null),this.a=a,this.b=null,this.f=new ka,this.i=this.j=null,this.F=0,this.w=null,this.h=!1,this.g=new Gd,this.c={enableAdaptation:!0,streamBufferSize:15,liveStreamEndTimeout:15,licenseRequestTimeout:0,mpdRequestTimeout:0,segmentRequestTimeout:0,preferredLanguage:"en",restrictions:new j},this.l=1,this.G=null}function be(b){return"text/vtt"==b?!!a.VTTCue:MediaSource.isTypeSupported(b)}function ce(){var a=Error("Player destroyed");return a.type="destroy",Promise.reject(a)}function de(b){b.i&&(a.clearTimeout(b.i),b.i=null)}function ee(b){fe(b),b.w=a.setTimeout(b.L.bind(b),100)}function fe(b){b.w&&(a.clearTimeout(b.w),b.w=null)}function ge(a){g("buffering");var b=a.g;b.bufferingTime+=h("buffering")/1e3,a.h=!1,a.dispatchEvent(Y({type:"bufferingEnd"}))}function he(a){for(var b=0;b<a.length;++b)for(var c=a[b],d=0;d<c.a.length;++d){for(var e=c.a[d],f=e,g=0;g<f.m.length;++g)be(cd(f.m[g]))||(f.m.splice(g,1),--g);0==e.m.length&&(c.a.splice(d,1),--d)}}function ie(a){for(var b=0;b<a.length;++b)for(var c=a[b],d=0;d<c.a.length;++d)c.a[d].m.sort(je)}function je(a,b){var c=a.bandwidth||Number.MAX_VALUE,d=b.bandwidth||Number.MAX_VALUE;return d>c?-1:c>d?1:0}function ke(a){this.a=a}function le(a){function b(a,b){return a.concat(b)}var c=a.a.map(function(a){return a.a}).reduce(b,[]).map(function(a){return a.m}).reduce(b,[]);return a=c.map(function(a){return a.H.create()}),Promise.all(a).then(function(a){for(var b={},d=0;d<c.length;++d)b[c[d].C]=a[d];return Promise.resolve(b)})}function me(a,b,c,d,e){var f=new ga;a.a.forEach(function(a,b){f.push(a.id||""+b,a)});var g=new ga;for(b.a.forEach(function(a,b){g.push(a.id||""+b,a)}),a=ja(f),b=0;b<a.length;++b){var h=a[b],i=f.get(h);1<i.length||(h=g.get(h))&&0!=h.length&&1==h.length&&(ne(i[0],h[0],c,d,e),i[0].b=h[0].b)}}function ne(a,b,c,d,e){var f=new ga;a.a.forEach(function(a,b){f.push(a.id||""+b,a)});var g=new ga;for(b.a.forEach(function(a,b){g.push(a.id||""+b,a)}),a=ja(f),b=0;b<a.length;++b){var h=a[b],i=f.get(h);1<i.length||(h=g.get(h))&&0!=h.length&&1==h.length&&oe(i[0],h[0],c,d,e)}}function oe(a,b,c,d,e){var f=new ga;a.m.forEach(function(a,b){f.push(a.id||""+b,a)});var g=new ga;b.m.forEach(function(a,b){g.push(a.id||""+b,a)}),b={};for(var h=ja(f),i=0;i<h.length;++i){var j=h[i];b[j]=j;var k=f.get(j);1<k.length||((j=g.get(j))&&0!=j.length?1==j.length&&(pe(k[0],j[0],c,d),k[0].D=j[0].D,j[0].D=null,k[0].c=j[0].c):(e.push(k[0]),a.m.splice(a.m.indexOf(k[0]),1)))}for(h=ja(g),i=0;i<h.length;++i)j=h[i],b[j]||(b[j]=j,j=g.get(j),a.m.push(j[0]))}function pe(a,b,c,d){a=c[a.C],b=d[b.C],a.length(),a.Ha(b)&&a.length()}function qe(){this.a=this.b=null,this.f=new ka,this.c=Number.POSITIVE_INFINITY,this.i=!0,this.g=!1}function re(a){var b=a.a.ma();if(0==b.length)return null;b.sort(p);var c;a:{c=a.a.pa();for(var d=0;d<c.length;++d)if(c[d].active){c=c[d];break a}c=null}c=c?c.bandwidth:0,a=a.b.getBandwidth();for(var d=b[0],e=0;e<b.length;++e){var f=b[e],g=e+1<b.length?b[e+1]:{bandwidth:Number.POSITIVE_INFINITY};if(f.bandwidth&&(g=(g.bandwidth+c)/.85,a>=(f.bandwidth+c)/.95&&g>=a&&(d=f,d.active)))break}return d}function se(a,b,c){oa.call(this,null),this.f=a,this.c=b,this.b=_a(c),this.a=null}function te(a,b,c){oa.call(this,null),this.a=a,this.Z=b,this.i=new ka,this.g=new MediaSource,this.f=null,this.da=0,this.b=new ga,this.I=c,this.I.initialize(b,this),this.L=!1,this.K="en",this.fa=!1,this.U=null,this.B=new ra,this.h=new j,this.F=null,this.Va=1,this.c={},this.ea=new ra,this.Ta=0,this.Ua=15,this.w=null,this.Ra=this.Sa=!1,this.u={},this.$=this.Y=this.V=null,this.G={}}function ue(b,c){if(null!=b.a.f){var d=Math.max(b.a.f,3),d=Math.max(d-c,0);b.V=a.setTimeout(b.ib.bind(b,!1),1e3*d)}}function ve(a,b){var c=b.a.split("/")[0],d=a.c[c];if(d&&d.oa()==b){var e=a.b.get(b.a.split("/")[0]).map(function(a){return a.m}).reduce(function(a,b){return a.concat(b)},[]).filter(function(a){return a.N&&a.J});if(0==e.length)return c=Error("All usable streams have been removed from the manifest."),c.type="app",c=Z(c),void a.dispatchEvent(c);a.u[c].Pa==b&&delete a.u[c],d.ra(e[0],!0),b.destroy()}b.destroy()}function we(a){if(a.h){for(var b=!1,c=0;c<a.a.a.length;++c)for(var d=a.a.a[c],e=0;e<d.a.length;++e){var f=d.a[e];if("video"==f.contentType)for(var g=0;g<f.m.length;++g){var h=f.m[g],i=h.J;h.J=!0,a.h.maxWidth&&h.width>a.h.maxWidth&&(h.J=!1),a.h.maxHeight&&h.height>a.h.maxHeight&&(h.J=!1),a.h.minHeight&&h.height<a.h.minHeight&&(h.J=!1),a.h.maxBandwidth&&h.bandwidth>a.h.maxBandwidth&&(h.J=!1),a.h.minBandwidth&&h.bandwidth<a.h.minBandwidth&&(h.J=!1),i!=h.J&&(b=!0)}}0!=ha(a.b).length&&b&&(xe(a),0<a.ma().length||(b=Error("The application has restricted all video tracks!"),b.type="app",b=Z(b),a.dispatchEvent(b)))}}function xe(a){var b=Y({type:"trackschanged",bubbles:!0});a.dispatchEvent(b)}function ye(a,b,c,d,e){if(!a.b.a.hasOwnProperty(b)||!a.c[b])return!1;for(var f=a.b.get(b),g=0;g<f.length;++g)for(var h=f[g],i=0;i<h.m.length;++i){var j=h.m[i];if(j.C==c)return j.N&&j.J?"text"==b||a.Ra?(Hd(a.U,j),a.c[b].ra(j,d,e),!0):(c=a.u[b],a.u[b]={Pa:j,Xa:null!=c&&c.Xa||d,Ya:null!=c&&c.Ya||e},!0):!1}return!1}function ze(a,b){for(var c=0;2>=c;++c)for(var d=0;d<b.length;++d){var e=b[d];if($(c,a.K,e.lang))return b.splice(d,1),void b.splice(0,0,e)}for(d=0;d<b.length;++d)if(e=b[d],e.b){b.splice(d,1),b.splice(0,0,e);break}}function Ae(b){for(var c=[],d=["audio","video","text"],e=0;e<d.length;++e){var f=d[e];b.b.a.hasOwnProperty(f)&&c.push(b.b.get(f)[0])}for(var g=Be(b,c),e=0;e<d.length;++e)if(f=d[e],b.b.a.hasOwnProperty(f)&&!g[f])return b=Error("Unable to select an initial "+f+" stream: all "+f+" streams have been restricted (by the application or by the key system)."),b.type="stream",Promise.reject(b);return c=aa(g).map(function(a){return a.H.create()}),Promise.all(c).then(xa(b,function(a){return a.every(function(a){return a.length()})&&(a=Ke(this,a))?Ce(this,g)?(this.I.start(),Ee(this,g,a),Promise.resolve()):(a=Error("Failed to create Stream objects."),a.type="stream",Promise.reject(a)):(a=Error("Some streams are not available."),a.type="stream",Promise.reject(a))}))["catch"](xa(b,function(b){return"aborted"!=b.type?(Object.keys(this.c),this.a.b?(J()<this.a.h?(b=Math.max(this.a.h-Date.now()/1e3,3),this.V=a.setTimeout(this.ib.bind(this,!0),1e3*b)):ue(this,0),Promise.resolve()):Promise.reject(b)):void 0}))}function Be(a,b){for(var c={},d=0;d<b.length;++d){var e=b[d],f=null;if("video"==e.contentType){var g=a.I.getInitialVideoTrackId();if(null==g)continue;if(f=e.m.filter(function(a){return a.C==g}),0==f.length)continue;f=f[0]}else if("audio"==e.contentType){if(f=e.m.filter(function(a){return a.N&&a.J}),0==f.length)continue;f=e.m[Math.floor(f.length/2)]}else 0<e.m.length&&(f=e.m[0]);c[e.contentType]=f}return c}function Ce(a,b){var c,d={};for(c in b){var e=b[c],e="text"==c?new rd(a,a.f):De(a,e);if(!e)return aa(d).forEach(function(a){a.destroy()}),!1;d[c]=e}return a.c=d,!0}function De(a,b){var c=new id(a,a.f,a.g,cd(b),a.Z);return c.G(a.G),c}function Ee(a,b,c){a.Va=a.f.playbackRate,a.f.playbackRate=0,Ge(a,c);var d;a.$&&a.$<=c.end&&a.$>=c.start?d=a.$:a.a.b?(d=c.end,a.Sa=!0):d=c.start,la(a.i,a.f,"seeking",a.Ib.bind(a)),a.f.currentTime!=d&&(a.f.currentTime=d,a.F=d),He(a,c.start,c.end),c=[];for(var e in a.c){d=a.c[e],c.push(d.sb(a.ea)),la(a.i,d,"ended",a.Kb.bind(a));var f=b[e];Hd(a.U,f),d.ra(f,!1)}Promise.all(c).then(a.ub.bind(a))["catch"](xa(a,function(a){"destroy"!=a.type&&(a=Z(a),this.dispatchEvent(a))})),a.Na(a.fa)}function Fe(a,b,c){(b=Ke(a,b))&&(Ge(a,b),He(a,b.start,b.end)),0!=c&&(c=a.f.currentTime+c,a.f.currentTime=c,a.F=c),a.Sa&&b&&(a.f.currentTime=b.end),a.f.playbackRate=a.Va,a.a.b&&null!=a.a.f&&ue(a,0),Le(a),a.ea.resolve()}function Ge(a,b){if(a.a.b)isNaN(a.g.duration)&&(a.g.duration=b.end+2592e3);else if(isNaN(a.g.duration)||b.end>a.g.duration){a.g.duration=b.end;for(var c=0;c<a.g.sourceBuffers.length;++c)a.g.sourceBuffers[c].appendWindowEnd=b.end}}function He(a,b,c){b=Y({type:"seekrangechanged",bubbles:!0,start:b,end:c}),a.dispatchEvent(b)}function Ie(a,b,c,d){if(b>=c-.01)return!1;if(b=0,a.a.b){b=.5;for(var e in a.c)if(!a.c[e].lb(c+b)){b=a.a.c;break}}return a.f.currentTime=Math.min(c+b,d),!0}function Je(a){return aa(a.c).map(function(a){return a.cb()}).filter(function(a){return null!=a})}function Ke(a,b){for(var c=0,d=Number.POSITIVE_INFINITY,e=Number.POSITIVE_INFINITY,f=0;f<b.length;++f){var g=b[f].Ea(),c=Math.max(c,g.start);null!=g.end&&(d=Math.min(d,g.end)),b[f].length()&&(e=Math.min(e,b[f].A().a))}if(d==Number.POSITIVE_INFINITY){if(d=a.a.a[0],!d.b)return null;d=(d.start||0)+d.b}return a.a.b&&(d=Math.max(d-a.a.c,c)),c>d?null:{start:c,end:d,A:e}}function Le(b){b.a.b&&(b.Y=a.setTimeout(b.Mb.bind(b),1e3))}function Me(a){for(var b in a.c)a.c[b].G(a.G)}function Ne(a,b,c,d){c||(c=new qa),d||(d=new qe),te.call(this,null,c,d),this.za=a,this.l=null,this.M=b,this.R=[],this.ga=[],this.ta=[],this.j=null}function Oe(a,b,c){b||(b=new qa),c||(c=new qe),te.call(this,null,b,c),this.R=a,this.M=[],this.timeoutMs=3e4,this.l={},this.j=this.ga=null}function Pe(a,b,c,d){var e=new Kd(a.Z,a);return null!=a.l.segmentRequestTimeout&&(e.b=Number(a.l.segmentRequestTimeout)),za(e).then(xa(a,function(){return Ld(e,b,this.M,d,c)})).then(function(a){return Aa(e),Promise.resolve(a)})["catch"](function(a){return Aa(e),Promise.reject(a)})}function Qe(a){var b=new Kd(null,null);return za(b).then(xa(a,function(){return Md(b,this.R)})).then(function(){return Aa(b),Promise.resolve()})["catch"](function(a){return Aa(b),Promise.reject(a)})}function Re(b){var c=document.createElement("video");c.src=a.URL.createObjectURL(b.g);var d=new Td(null,c,b);return null!=b.l.licenseRequestTimeout&&(d.w=Number(b.l.licenseRequestTimeout)),b.X().then(function(){return d.initialize()}).then(xa(b,function(){return Ud(d,this.timeoutMs)})).then(function(){return Vd(d)}).then(xa(b,function(){return d.destroy(),this.destroy(),Promise.resolve()}))["catch"](xa(b,function(a){return d.destroy(),this.destroy(),Promise.reject(a)}))}var Se,Te=this;e("error"),e("warn"),e("info"),e("log"),e("debug");var Ue=a.performance&&a.performance.now?a.performance.now.bind(a.performance):Date.now,Ve={};b("shaka.player.AudioTrack.compare",function(a,b){return a.lang<b.lang?-1:a.lang>b.lang?1:a.bandwidth<b.bandwidth?-1:a.bandwidth>b.bandwidth?1:0}),j.prototype.clone=function(){var a=new j;return a.maxHeight=this.maxHeight,a.minHeight=this.minHeight,a.maxWidth=this.maxWidth,a.maxBandwidth=this.maxBandwidth,a.minBandwidth=this.minBandwidth,a},b("shaka.player.TextStyle",k),k.prototype.a=function(){var b=a.localStorage.getItem("ShakaPlayerTextStyle");if(b){var c;try{c=JSON.parse(b)}catch(d){return}if(c&&"object"==typeof c){var e,b=c;for(e in b)e in this&&(this[e]=b[e])}}},k.prototype.load=k.prototype.a,k.prototype.b=function(){a.localStorage.setItem("ShakaPlayerTextStyle",JSON.stringify(this))},k.prototype.store=k.prototype.b;var We=[255,255,255],Xe=[0,0,0];k.StandardColors={WHITE:We,BLACK:Xe,RED:[255,0,0],GREEN:[0,255,0],BLUE:[0,0,255],YELLOW:[255,255,0],MAGENTA:[255,0,255],CYAN:[0,255,255]};var Ye=1;k.StandardOpacities={OPAQUE:Ye,SEMI_HIGH:.75,SEMI_LOW:.25,TRANSPARENT:0};var Ze=[];k.EdgeStyles={NONE:Ze,RAISED:[[34,34,34,1,1,0],[34,34,34,2,2,0],[34,34,34,3,3,0]],DEPRESSED:[[204,204,204,1,1,0],[204,204,204,0,1,0],[34,34,34,-1,-1,0],[34,34,34,0,-1,0]],UNIFORM:[[34,34,34,0,0,4],[34,34,34,0,0,4],[34,34,34,0,0,4],[34,34,34,0,0,4]],DROP:[[34,34,34,2,2,3],[34,34,34,2,2,4],[34,34,34,2,2,5]]},b("shaka.player.TextTrack.compare",function(a,b){return a.lang<b.lang?-1:a.lang>b.lang?1:0}),b("shaka.player.VideoTrack.compare",p),b("shaka.polyfill.CustomEvent.install",q),b("shaka.polyfill.Fullscreen.install",s),w.prototype.createSession=function(){},w.prototype.setServerCertificate=function(){},x.prototype.getConfiguration=function(){},x.prototype.createMediaKeys=function(){};var $e=0;b("shaka.polyfill.Promise.install",z),y.prototype.then=function(a,b){var c=new y;switch(this.ba){case 1:E(this,c,a);break;case 2:E(this,c,b);break;case $e:this.c.push({Ia:c,Ba:a}),this.b.push({Ia:c,Ba:b})}return c},y.prototype.then=y.prototype.then,y.prototype["catch"]=function(a){return this.then(void 0,a)},y.prototype["catch"]=y.prototype["catch"],y.prototype.W=function(a){if(this.ba==$e){for(this.wa=a,this.ba=1,a=0;a<this.c.length;++a)E(this,this.c[a].Ia,this.c[a].Ba);this.c=[],this.b=[]}},y.prototype.a=function(a){if(this.ba==$e){for(this.wa=a,this.ba=2,a=0;a<this.b.length;++a)E(this,this.b[a].Ia,this.b[a].Ba);this.c=[],this.b=[]}},b("shaka.polyfill.VideoPlaybackQuality.install",G);var _e,af=0,bf=1,cf={"output-restricted":"The required output protection is not available.","output-not-allowed":"The required output protection is not available.",expired:"The decryption key has expired.","internal-error":"The key system has encountered an unspecified error."
};W.prototype.sample=function(a,b){var c=Math.pow(this.c,a);this.b=b*(1-c)+c*this.b,this.a+=a};var df=1,ef=2,ff={aar:"aa",abk:"ab",afr:"af",aka:"ak",alb:"sq",amh:"am",ara:"ar",arg:"an",arm:"hy",asm:"as",ava:"av",ave:"ae",aym:"ay",aze:"az",bak:"ba",bam:"bm",baq:"eu",bel:"be",ben:"bn",bih:"bh",bis:"bi",bod:"bo",bos:"bs",bre:"br",bul:"bg",bur:"my",cat:"ca",ces:"cs",cha:"ch",che:"ce",chi:"zh",chu:"cu",chv:"cv",cor:"kw",cos:"co",cre:"cr",cym:"cy",cze:"cs",dan:"da",deu:"de",div:"dv",dut:"nl",dzo:"dz",ell:"el",eng:"en",epo:"eo",est:"et",eus:"eu",ewe:"ee",fao:"fo",fas:"fa",fij:"fj",fin:"fi",fra:"fr",fre:"fr",fry:"fy",ful:"ff",geo:"ka",ger:"de",gla:"gd",gle:"ga",glg:"gl",glv:"gv",gre:"el",grn:"gn",guj:"gu",hat:"ht",hau:"ha",heb:"he",her:"hz",hin:"hi",hmo:"ho",hrv:"hr",hun:"hu",hye:"hy",ibo:"ig",ice:"is",ido:"io",iii:"ii",iku:"iu",ile:"ie",ina:"ia",ind:"id",ipk:"ik",isl:"is",ita:"it",jav:"jv",jpn:"ja",kal:"kl",kan:"kn",kas:"ks",kat:"ka",kau:"kr",kaz:"kk",khm:"km",kik:"ki",kin:"rw",kir:"ky",kom:"kv",kon:"kg",kor:"ko",kua:"kj",kur:"ku",lao:"lo",lat:"la",lav:"lv",lim:"li",lin:"ln",lit:"lt",ltz:"lb",lub:"lu",lug:"lg",mac:"mk",mah:"mh",mal:"ml",mao:"mi",mar:"mr",may:"ms",mkd:"mk",mlg:"mg",mlt:"mt",mon:"mn",mri:"mi",msa:"ms",mya:"my",nau:"na",nav:"nv",nbl:"nr",nde:"nd",ndo:"ng",nep:"ne",nld:"nl",nno:"nn",nob:"nb",nor:"no",nya:"ny",oci:"oc",oji:"oj",ori:"or",orm:"om",oss:"os",pan:"pa",per:"fa",pli:"pi",pol:"pl",por:"pt",pus:"ps",que:"qu",roh:"rm",ron:"ro",rum:"ro",run:"rn",rus:"ru",sag:"sg",san:"sa",sin:"si",slk:"sk",slo:"sk",slv:"sl",sme:"se",smo:"sm",sna:"sn",snd:"sd",som:"so",sot:"st",spa:"es",sqi:"sq",srd:"sc",srp:"sr",ssw:"ss",sun:"su",swa:"sw",swe:"sv",tah:"ty",tam:"ta",tat:"tt",tel:"te",tgk:"tg",tgl:"tl",tha:"th",tib:"bo",tir:"ti",ton:"to",tsn:"tn",tso:"ts",tuk:"tk",tur:"tr",twi:"tw",uig:"ug",ukr:"uk",urd:"ur",uzb:"uz",ven:"ve",vie:"vi",vol:"vo",wel:"cy",wln:"wa",wol:"wo",xho:"xh",yid:"yi",yor:"yo",zha:"za",zho:"zh",zul:"zu"};ga.prototype.push=function(a,b){this.a.hasOwnProperty(a)?this.a[a].push(b):this.a[a]=[b]},ga.prototype.set=function(a,b){this.a[a]=b},ga.prototype.get=function(a){return(a=this.a[a])?a.slice():null},ka.prototype.destroy=function(){ma(this),this.a=null},ka.prototype.sa=function(a,b){for(var c=this.a.get(b)||[],d=0;d<c.length;++d){var e=c[d];e.target==a&&(e.sa(),ia(this.a,b,e))}},na.prototype.sa=function(){this.target&&(this.target.removeEventListener(this.type,this.a,!1),this.a=this.target=null)},b("shaka.util.FakeEventTarget",oa),oa.prototype.addEventListener=function(a,b,c){c||this.ya.push(a,b)},oa.prototype.removeEventListener=function(a,b,c){c||ia(this.ya,a,b)},oa.prototype.dispatchEvent=function(a){if(a.hasOwnProperty("srcElement")||(delete a.srcElement,Object.defineProperty(a,"srcElement",{get:function(){return null}})),a.hasOwnProperty("target"))a.target=this;else{delete a.target;var b=this;Object.defineProperty(a,"target",{get:function(){return b},set:function(a){b=a}})}if(a.hasOwnProperty("currentTarget"))a.currentTarget=null;else{delete a.currentTarget;var c=null;Object.defineProperty(a,"currentTarget",{get:function(){return c},set:function(a){c=a}})}return pa(this,a)},c(qa,oa),b("shaka.util.EWMABandwidthEstimator",qa),qa.prototype.sample=function(a,b){if(!(65536>b)){a=Math.max(a,50);var c=8e3*b/a,d=a/1e3;this.a.sample(d,c),this.c.sample(d,c),this.dispatchEvent(Y({type:"bandwidth"})),this.b=Date.now()}},qa.prototype.getBandwidth=function(){return.5>this.a.a?5e5:Math.min(X(this.a),X(this.c))},qa.prototype.getDataAge=function(){return(Date.now()-this.b)/1e3},qa.prototype.supportsCaching=function(){return!1},ra.prototype.destroy=function(){this["catch"](function(){});var a=Error("Destroyed!");a.type="destroy",this.reject(a)},ta.prototype.start=function(){if(this.f)throw Error("Task already started!");this.f=!0,this.b.unshift(function(){}),va(this,void 0)},ta.prototype.end=function(){this.b.splice(1)},c(ya,oa),c(Ha,ya);var gf=1/60;Ma.prototype.destroy=function(){Ra(this)["catch"](function(){}),this.f&&this.f.destroy(),this.a=this.f=null,this.g&&(Aa(this.g),this.g=null),this.b=null,this.i.destroy(),this.v=this.c=this.i=null},Ma.prototype.h=function(){"open"==this.v.readyState&&this.c.abort()},Ma.prototype.B=function(){this.f.resolve(),this.f=null},b("shaka.util.Uint8ArrayUtils.toString",Va),b("shaka.util.Uint8ArrayUtils.fromString",Wa),b("shaka.util.Uint8ArrayUtils.toBase64",function(b,c){var d=void 0==c?!0:c,e=a.btoa(Va(b)).replace(/\+/g,"-").replace(/\//g,"_");return d?e:e.replace(/=*$/,"")}),b("shaka.util.Uint8ArrayUtils.fromBase64",Xa),b("shaka.util.Uint8ArrayUtils.fromHex",function(b){for(var c=new Uint8Array(b.length/2),d=0;d<b.length;d+=2)c[d/2]=a.parseInt(b.substr(d,2),16);return c}),b("shaka.util.Uint8ArrayUtils.toHex",Ya),eb.prototype.createMediaKeys=function(){var a=new fb(this.a);return Promise.resolve(a)},eb.prototype.getConfiguration=function(){return this.b},Se=fb.prototype,Se.createSession=function(a){var b=a||"temporary";if("temporary"!=b&&"persistent-license"!=b)throw new TypeError("Session type "+a+" is unsupported on this platform.");return a=this.b||document.createElement("video"),a.src||(a.src="about:blank"),b=new ib(a,this.g,b),this.c.push(b),b},Se.setServerCertificate=function(){return Promise.reject(Error("setServerCertificate not supported on this platform."))},Se.Rb=function(a){a=Y({type:"encrypted",initDataType:"webm",initData:a.initData}),this.b.dispatchEvent(a)},Se.Qb=function(a){var b=hb(this,a.sessionId);b&&(a=Y({type:"message",messageType:void 0==b.keyStatuses.Fa()?"licenserequest":"licenserenewal",message:a.message}),b.b&&(b.b.resolve(),b.b=null),b.dispatchEvent(a))},Se.Ob=function(a){(a=hb(this,a.sessionId))&&(kb(a,"usable"),a.a&&a.a.resolve(),a.a=null)},Se.Pb=function(a){var b=hb(this,a.sessionId);if(b){var c=Error("EME v0.1b key error");c.errorCode=a.errorCode,c.errorCode.systemCode=a.systemCode,!a.sessionId&&b.b?(c.method="generateRequest",45==a.systemCode&&(c.message="Unsupported session type."),b.b.reject(c),b.b=null):a.sessionId&&b.a?(c.method="update",b.a.reject(c),b.a=null):(c=a.systemCode,a.errorCode.code==MediaKeyError.MEDIA_KEYERR_OUTPUT?kb(b,"output-restricted"):1==c?kb(b,"expired"):kb(b,"internal-error"))}},c(ib,oa),Se=ib.prototype,Se.Qa=function(a,b){if(this.a)this.a.then(this.Qa.bind(this,a,b))["catch"](this.Qa.bind(this,a,b));else{this.a=a;var c,d;"webkit-org.w3.clearkey"==this.c?(c=Va(new Uint8Array(b)),d=JSON.parse(c),"oct"!=d.keys[0].kty&&(this.a.reject(Error("Response is not a valid JSON Web Key Set.")),this.a=null),c=Xa(d.keys[0].k),d=Xa(d.keys[0].kid)):(c=new Uint8Array(b),d=null);try{this.f.webkitAddKey(this.c,c,d,this.sessionId)}catch(e){this.a.reject(e),this.a=null}}},Se.generateRequest=function(a,b){return jb(this,b,null)},Se.load=function(a){return"persistent-license"==this.g?jb(this,null,a):Promise.reject(Error("Not a persistent session."))},Se.update=function(a){var b=new ra;return this.Qa(b,a),b},Se.close=function(){if("persistent-license"!=this.g){if(!this.sessionId)return this.closed.reject(Error("The session is not callable.")),this.closed;this.f.webkitCancelKeyRequest(this.c,this.sessionId)}return this.closed.resolve(),this.closed},Se.remove=function(){return"persistent-license"!=this.g?Promise.reject(Error("Not a persistent session.")):this.close()},lb.prototype.next=function(){return this.a>=this.b.length?{value:void 0,done:!0}:{value:this.b[this.a++],done:!1}};var hf;Se=mb.prototype,Se.Ma=function(a){this.size=void 0==a?0:1,this.a=a},Se.Fa=function(){return this.a},Se.entries=function(){var a=hf,b=[];return this.a&&b.push([a,this.a]),new lb(b)},Se.forEach=function(a){this.a&&a(this.a,hf)},Se.get=function(a){return this.has(a)?this.a:void 0},Se.has=function(a){var b=hf;return!(!this.a||!Za(new Uint8Array(a),b))},Se.keys=function(){var a=hf,b=[];return this.a&&b.push(a),new lb(b)},Se.values=function(){var a=[];return this.a&&a.push(this.a),new lb(a)},pb.prototype.createMediaKeys=function(){var a=new rb(this.keySystem);return Promise.resolve(a)},pb.prototype.getConfiguration=function(){return this.a},rb.prototype.createSession=function(a){if("temporary"!=(a||"temporary"))throw new TypeError("Session type "+a+" is unsupported on this platform.");return new tb(this.a)},rb.prototype.setServerCertificate=function(){return Promise.reject(Error("setServerCertificate not supported on this platform."))},c(tb,oa),Se=tb.prototype,Se.generateRequest=function(a,b){this.a=new ra;try{this.c=this.g.createSession("video/mp4",b),la(this.f,this.c,"mskeymessage",this.Db.bind(this)),la(this.f,this.c,"mskeyadded",this.Bb.bind(this)),la(this.f,this.c,"mskeyerror",this.Cb.bind(this)),wb(this,"status-pending")}catch(c){this.a.reject(c)}return this.a},Se.load=function(){return Promise.reject(Error("MediaKeySession.load not yet supported"))},Se.update=function(a){this.b=new ra;try{this.c.update(a)}catch(b){this.b.reject(b)}return this.b},Se.close=function(){try{this.c.close(),this.closed.resolve(),ma(this.f)}catch(a){this.closed.reject(a)}return this.closed},Se.remove=function(){return Promise.reject(Error("MediaKeySession.remove is only applicable for persistent licenses, which are not supported on this platform"))},Se.Db=function(a){this.a&&(this.a.resolve(),this.a=null),a=Y({type:"message",messageType:void 0==this.keyStatuses.Fa()?"licenserequest":"licenserenewal",message:a.message.buffer}),this.dispatchEvent(a)},Se.Bb=function(){this.a?(this.a.resolve(),this.a=null):this.b&&(wb(this,"usable"),this.b.resolve(),this.b=null)},Se.Cb=function(){var a=Error("EME v20140218 key error");if(a.errorCode=this.c.error,null!=this.a)this.a.reject(a),this.a=null;else if(null!=this.b)this.b.reject(a),this.b=null;else switch(this.c.error.code){case MSMediaKeyError.MS_MEDIA_KEYERR_OUTPUT:case MSMediaKeyError.MS_MEDIA_KEYERR_HARDWARECHANGE:wb(this,"output-not-allowed");default:wb(this,"internal-error")}},xb.prototype.next=function(){return this.a>=this.b.length?{value:void 0,done:!0}:{value:this.b[this.a++],done:!1}};var jf;Se=yb.prototype,Se.Ma=function(a){this.size=void 0==a?0:1,this.a=a},Se.Fa=function(){return this.a},Se.entries=function(){var a=jf,b=[];return this.a&&b.push([a,this.a]),new xb(b)},Se.forEach=function(a){this.a&&a(this.a,jf)},Se.get=function(a){return this.has(a)?this.a:void 0},Se.has=function(a){var b=jf;return!(!this.a||!Za(new Uint8Array(a),b))},Se.keys=function(){var a=jf,b=[];return this.a&&b.push(a),new xb(b)},Se.values=function(){var a=[];return this.a&&a.push(this.a),new xb(a)},b("shaka.polyfill.MediaKeys.install",zb),b("shaka.polyfill.installAll",function(){q(),s(),G(),z(),zb()});var kf=/^(?:([^:\/?#.]+):)?(?:\/\/(?:([^\/?#]*)@)?([^\/#?]*?)(?::([0-9]+))?(?=[\/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;Se=Ab.prototype,Se.P="",Se.ca="",Se.S="",Se.ia=null,Se.O="",Se.aa="",Se.toString=function(){var a=[],b=this.P;if(b&&a.push(Fb(b,lf,!0),":"),b=this.S){a.push("//");var c=this.ca;c&&a.push(Fb(c,lf,!0),"@"),a.push(encodeURIComponent(b).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),b=this.ia,null!=b&&a.push(":",String(b))}return(b=this.O)&&(this.S&&"/"!=b.charAt(0)&&a.push("/"),a.push(Fb(b,"/"==b.charAt(0)?nf:mf,!0))),(b=this.a.toString())&&a.push("?",b),(b=this.aa)&&a.push("#",Fb(b,pf)),a.join("")},Se.resolve=function(a){var b=this.clone();"data"===b.P&&(b=new Ab);var c=!!a.P;c?Bb(b,a.P):c=!!a.ca,c?b.ca=a.ca:c=!!a.S,c?b.S=a.S:c=null!=a.ia;var d=a.O;if(c)Cb(b,a.ia);else if(c=!!a.O){if("/"!=d.charAt(0))if(this.S&&!this.O)d="/"+d;else{var e=b.O.lastIndexOf("/");-1!=e&&(d=b.O.substr(0,e+1)+d)}if(".."==d||"."==d)d="";else if(-1!=d.indexOf("./")||-1!=d.indexOf("/.")){for(var e=0==d.lastIndexOf("/",0),d=d.split("/"),f=[],g=0;g<d.length;){var h=d[g++];"."==h?e&&g==d.length&&f.push(""):".."==h?((1<f.length||1==f.length&&""!=f[0])&&f.pop(),e&&g==d.length&&f.push("")):(f.push(h),e=!0)}d=f.join("/")}}return c?b.O=d:c=""!==a.a.toString(),c?Db(b,a.a.clone()):c=!!a.aa,c&&(b.aa=a.aa),b},Se.clone=function(){return new Ab(this)};var lf=/[#\/\?@]/g,mf=/[\#\?:]/g,nf=/[\#\?]/g,of=/[\#\?@]/g,pf=/#/g;Hb.prototype.a=null,Hb.prototype.c=null,Hb.prototype.toString=function(){if(this.b)return this.b;if(!this.a)return"";var a,b=[];for(a in this.a)for(var c=encodeURIComponent(a),d=this.a[a],e=0;e<d.length;e++){var f=c;""!==d[e]&&(f+="="+encodeURIComponent(d[e])),b.push(f)}return this.b=b.join("&")},Hb.prototype.clone=function(){var a=new Hb;if(a.b=this.b,this.a){var b,c={};for(b in this.a)c[b]=this.a[b].concat();a.a=c,a.c=this.c}return a},Tb.prototype.clone=function(){var a=new Tb;return a.s=ic(this.s),a.g=this.g,a.f=this.f,a.a=jc(this.a),a.b=jc(this.b),a.c=jc(this.c),a},Ub.prototype.clone=function(){var a=new Ub;return a.url=ic(this.url),a.a=jc(this.a),a},Vb.prototype.clone=function(){var a=new Vb;return a.url=ic(this.url),a.a=jc(this.a),a},Wb.prototype.clone=function(){var a=new Wb;return a.s=ic(this.s),a.f=this.f,a.g=this.g,a.b=this.b,a.i=this.i,a.h=jc(this.h),a.a=ic(this.a)||[],a.c=jc(this.c),a},Xb.prototype.clone=function(){var a=new Xb;return a.b=ic(this.b),a.a=jc(this.a),a},Yb.prototype.clone=function(){var a=new Yb;return a.a=this.a,a.i=this.i,a.b=this.b,a.j=this.j,a.h=this.h,a.f=this.f,a.g=this.g,a.c=jc(this.c),a},Zb.prototype.clone=function(){var a=new Zb;return a.a=ic(this.a)||[],a},$b.prototype.clone=function(){var a=new $b;return a.b=this.b,a.a=this.a,a.c=this.c,a},_b.prototype.clone=function(){return new _b(this.na,this.end)},Jb.TAG_NAME="MPD",Kb.TAG_NAME="Period",Lb.TAG_NAME="AdaptationSet",Mb.TAG_NAME="Role",Nb.TAG_NAME="ContentComponent",Ob.TAG_NAME="Representation",Pb.TAG_NAME="ContentProtection",Qb.TAG_NAME="cenc:pssh",Rb.TAG_NAME="BaseURL",Sb.TAG_NAME="Location",Tb.TAG_NAME="SegmentBase",Ub.TAG_NAME="RepresentationIndex",Vb.TAG_NAME="Initialization",Wb.TAG_NAME="SegmentList",Xb.TAG_NAME="SegmentURL",Yb.TAG_NAME="SegmentTemplate",Zb.TAG_NAME="SegmentTimeline",$b.TAG_NAME="S",Jb.prototype.parse=function(a,b){this.url=a.s,this.id=kc(b,"id",rc),this.type=kc(b,"type",rc)||"static",this.b=kc(b,"mediaPresentationDuration",mc),this.h=kc(b,"minBufferTime",mc,this.h),this.g=kc(b,"minimumUpdatePeriod",mc,this.g),this.c=kc(b,"availabilityStartTime",lc,this.c),this.f=kc(b,"timeShiftBufferDepth",mc,this.f),this.i=kc(b,"suggestedPresentationDelay",mc,this.i);var c=a.s,d=gc(this,b,Rb);this.s=bc(c,d),(d=ec(this,b,Sb))&&(this.j=cc(c,d.url)),this.a=gc(this,b,Kb)},Kb.prototype.parse=function(a,b){this.id=kc(b,"id",rc),this.start=kc(b,"start",mc),this.a=kc(b,"duration",mc);var c=gc(this,b,Rb);this.s=bc(a.s,c),this.c=ec(this,b,Tb),this.f=ec(this,b,Wb),this.g=ec(this,b,Yb),this.b=gc(this,b,Lb),ac(this)},Lb.prototype.parse=function(a,b){var c=ec(this,b,Nb)||{},d=ec(this,b,Mb);this.id=kc(b,"id",rc),this.group=kc(b,"group",qc),this.lang=kc(b,"lang",rc,c.lang),this.contentType=kc(b,"contentType",rc,c.contentType),this.width=kc(b,"width",pc),this.height=kc(b,"height",pc),this.b=kc(b,"mimeType",rc),this.i=kc(b,"codecs",rc),this.c=d&&"main"==d.value,this.lang&&(this.lang=_(this.lang)),c=gc(this,b,Rb),this.s=bc(a.s,c),this.j=gc(this,b,Pb),!this.contentType&&this.b&&(this.contentType=this.b.split("/")[0]),this.f=a.c?dc(this,b,a.c):ec(this,b,Tb),this.g=a.f?dc(this,b,a.f):ec(this,b,Wb),this.h=a.g?dc(this,b,a.g):ec(this,b,Yb),this.a=gc(this,b,Ob),!this.b&&this.a.length&&(this.b=this.a[0].f,!this.contentType&&this.b&&(this.contentType=this.b.split("/")[0]))},Mb.prototype.parse=function(a,b){this.value=kc(b,"value",rc)},Nb.prototype.parse=function(a,b){this.id=kc(b,"id",rc),this.lang=kc(b,"lang",rc),this.contentType=kc(b,"contentType",rc),this.lang&&(this.lang=_(this.lang))},Ob.prototype.parse=function(a,b){this.id=kc(b,"id",rc),this.bandwidth=kc(b,"bandwidth",pc),this.width=kc(b,"width",pc,a.width),this.height=kc(b,"height",pc,a.height),this.f=kc(b,"mimeType",rc,a.b),this.h=kc(b,"codecs",rc,a.i),this.lang=a.lang;var c=gc(this,b,Rb);this.s=bc(a.s,c),this.c=gc(this,b,Pb),this.g=a.f?dc(this,b,a.f):ec(this,b,Tb),this.b=a.g?dc(this,b,a.g):ec(this,b,Wb),this.a=a.h?dc(this,b,a.h):ec(this,b,Yb),this.c=this.c.concat(a.j)},Pb.prototype.parse=function(a,b){this.f=b,this.c=kc(b,"schemeIdUri",rc);var c=kc(b,"cenc:default_KID",rc);c&&(this.b=c.replace(/[-]/g,"")),this.a=ec(this,b,Qb)},Qb.prototype.parse=function(a,b){var c=hc(b);if(c){this.psshBox=Xa(c);try{this.parsedPssh=new nb(this.psshBox)}catch(d){if(!(d instanceof RangeError))throw d}}},Rb.prototype.parse=function(a,b){this.url=hc(b)},Sb.prototype.parse=function(a,b){this.url=hc(b)},Tb.prototype.parse=function(a,b){this.s=a.s||this.s,this.g=kc(b,"timescale",pc,this.g),this.f=kc(b,"presentationTimeOffset",qc,this.f),this.a=kc(b,"indexRange",nc,this.a),this.b=ec(this,b,Ub)||this.b,this.c=ec(this,b,Vb)||this.c},Ub.prototype.parse=function(a,b){var c=kc(b,"sourceURL",rc);this.url=cc(a.s,c),this.a=kc(b,"range",nc,jc(a.a))},Vb.prototype.parse=function(a,b){var c=kc(b,"sourceURL",rc);this.url=cc(a.s,c),this.a=kc(b,"range",nc)},Wb.prototype.parse=function(a,b){this.s=a.s||this.s,this.f=kc(b,"timescale",pc,this.f),this.g=kc(b,"presentationTimeOffset",qc,this.g),this.b=kc(b,"duration",pc,this.b);var c=kc(b,"startNumber",pc);null!=c&&(this.i=c),this.h=ec(this,b,Vb)||this.h,this.a=(c=gc(this,b,Xb))&&0<c.length?c:this.a,this.c=ec(this,b,Zb)||this.c},Xb.prototype.parse=function(a,b){var c=kc(b,"media",rc);this.b=cc(a.s,c),this.a=kc(b,"mediaRange",nc)},Yb.prototype.parse=function(a,b){this.a=kc(b,"timescale",pc,this.a),this.i=kc(b,"presentationTimeOffset",qc,this.i),this.b=kc(b,"duration",pc,this.b);var c=kc(b,"startNumber",qc);null!=c&&(this.j=c),this.h=kc(b,"media",rc,this.h),this.f=kc(b,"index",rc,this.f),this.g=kc(b,"initialization",rc,this.g),this.c=ec(this,b,Zb)||this.c},Zb.prototype.parse=function(a,b){this.a=gc(this,b,$b)},$b.prototype.parse=function(a,b){this.b=kc(b,"t",qc),this.a=kc(b,"d",qc),this.c=kc(b,"r",oc)};var qf=!0;Se=sc.prototype,Se.rb=function(){if(this.a)return this.c;if(0==this.url.lastIndexOf("data:",0)){var b=this.url.split(":")[1].split(";").pop().split(","),c=b.pop(),c="base64"==b.pop()?a.atob(c.replace(/-/g,"+").replace(/_/g,"/")):a.decodeURIComponent(c);return"arraybuffer"==this.b.f&&(c=Wa(c).buffer),b=JSON.parse(JSON.stringify(new XMLHttpRequest)),b.response=c,b.responseText=c.toString(),c=this.c,c.resolve(b),uc(this),c}if(0==this.url.lastIndexOf("idb:",0))return wc(this);this.h++,this.i=Date.now(),this.g||(this.g=this.b.h),this.a=new XMLHttpRequest,b=this.url,qf&&(this.f&&!this.f.supportsCaching()||this.b.g)&&(b=new Ab(b),Ib(b.a,"_",Date.now()),b=b.toString()),this.a.open(this.b.method,b,!0),this.a.responseType=this.b.f,this.a.timeout=this.b.c,this.a.withCredentials=this.b.j,this.a.onload=this.zb.bind(this),this.b.g&&(this.a.onreadystatechange=this.Gb.bind(this)),this.a.onerror=this.Xb.bind(this),this.a.ontimeout=this.Lb.bind(this);for(c in this.b.b)this.a.setRequestHeader(c,this.b.b[c]);return this.a.send(this.b.body),this.c},Se.zb=function(a){this.f&&this.f.sample(Date.now()-this.i,a.loaded),200<=this.a.status&&299>=this.a.status?(this.c.resolve(this.a),uc(this)):this.h<this.b.a?yc(this):(a=xc(this,"HTTP error.","net"),this.c.reject(a),uc(this))},Se.Gb=function(){if(this.a.readyState==XMLHttpRequest.HEADERS_RECEIVED){var a=Date.parse(this.a.getResponseHeader("Date"));a&&(af=a-Date.now())}},Se.Xb=function(){var a=xc(this,"Network failure.","net");this.c.reject(a),uc(this)},Se.Lb=function(){if(this.h<this.b.a)yc(this);else{var a=xc(this,"Request timed out.","net");this.c.reject(a),uc(this)}},zc.prototype.g=function(){if(this.c){this.a=null;var a=this.c;if(a.a&&a.a.readyState!=XMLHttpRequest.DONE){a.a.abort();var b=xc(a,"Request aborted.","aborted");a.c.reject(b),uc(a)}this.c=null}},zc.prototype.clone=function(){return new zc(this.i,this.b.map(function(a){return a.clone()}),this.f,this.h)},zc.prototype.toString=function(){return this.b[0].toString()},Jc.prototype.destroy=function(){this.a&&(this.a.g(),this.a=null),this.b=null},Jc.prototype.create=function(){return this.a?Bc(this.a):Promise.resolve(this.b)},Oc.prototype.parse=function(a,b,c,d){var e=null;try{a:{var f=[],g=new K(a),h=N(g);if(1936286840!=N(g))e=null;else{1==h&&(h=O(g));var i=M(g);Q(g,3),Q(g,4);var j=N(g);if(0==j)e=null;else{var k,l;0==i?(k=N(g),l=N(g)):(k=O(g),l=O(g)),Q(g,2);var m=g.b.getUint16(g.a,g.c);for(g.a+=2,a=k,b=b+h+l,h=0;m>h;h++){var n=N(g);l=(2147483648&n)>>>31;var i=2147483647&n,o=N(g);if(N(g),1==l){e=null;break a}var p=new zc(d,c,b,b+i-1);f.push(new Kc(a/j,(a+o)/j,p)),a+=o,b+=i}e=f}}}}catch(q){if(!(q instanceof RangeError))throw q}return e},Pc.prototype.destroy=function(){this.o=null},Se=Pc.prototype,Se.length=function(){return this.o.length},Se.A=function(){if(0==this.o.length)throw new RangeError("SegmentIndex: There is no last SegmentReference.");return this.o[this.o.length-1]},Se.get=function(a){if(0>a||a>=this.o.length)throw new RangeError("SegmentIndex: The specified index is out of range.");return this.o[a]},Se.la=function(a){return a=Mc(this.o,a),a>=0?this.o[a]:null},Se.Ha=function(a){return Rc(this,a),!0},Se.ka=function(a){var b=a-this.i;return 0==b?0:(this.o=Nc(this.o,b),this.i=a,b)},Se.Ea=function(){return 0<this.length()?{start:Qc(this).b,end:this.A().a}:{start:0,end:0}},c(Sc,Pc),Sc.prototype.destroy=function(){this.w=this.g=null,Pc.prototype.destroy.call(this)},Sc.prototype.la=function(a){return Vc(this,J()/1e3),Pc.prototype.la.call(this,a)},Sc.prototype.Ha=function(a){return a instanceof Sc?(Rc(this,a),this.h=Math.max(this.h,a.h),null==this.c?(this.f=a.f,Tc(this)):Wc(this),!0):!1},Sc.prototype.ka=function(a){return a=Pc.prototype.ka.call(this,a),Math.min.apply(null,this.o.filter(function(a){return null!=a.a}).map(function(a){return a.a-a.b})),null!=this.c&&(this.l+=a,this.a+=a,this.c+=a),a},Sc.prototype.Ea=function(){return Uc(this,J()/1e3)},c(Xc,Sc),Xc.prototype.destroy=function(){this.B=this.u=null,Sc.prototype.destroy.call(this)},Xc.prototype.la=function(a){var b=J()/1e3;return Yc(this,b),Vc(this,b),Pc.prototype.la.call(this,a)},Xc.prototype.Ha=function(a){return null==this.b&&a instanceof Xc&&null!=a.b?(this.b=a.b,this.v=a.v,this.j=a.j,this.f=a.f,this.h=a.h,Rc(this,a),Yc(this,J()/1e3),Tc(this),!0):!1},Xc.prototype.ka=function(a){return a=Sc.prototype.ka.call(this,a),null!=this.b&&(this.b+=a,this.v+=a),a},Xc.prototype.Ea=function(){var a=J()/1e3;return Yc(this,a),Uc(this,a)},Zc.prototype.destroy=function(){this.g=this.c=this.b=this.f=null,this.a&&(this.a.destroy(),this.a=null)},Zc.prototype.create=function(){if(this.a)return Promise.resolve(this.a);if("dynamic"==this.f.type)try{this.a=new Xc(this.f,this.b,this.c,this.h,this.g)}catch(a){return Promise.reject(a)}else{var b;if(b=this.c.a,b=Fc(this.g,this.c,1,Math.ceil(this.b.a/(b.b/b.a)))){if(0<b.length){var c=b[b.length-1];b[b.length-1]=Lc(c,c.b,this.b.a)}b=new Pc(b)}else b=null;if(this.a=b,!this.a)return b=Error("Failed to generate SegmentReferences"),b.type="stream",Promise.reject(b)}return Promise.resolve(this.a)},$c.prototype.destroy=function(){this.f=this.g=this.b=this.c=null,this.a&&(this.a.destroy(),this.a=null)},$c.prototype.create=function(){if(this.a)return Promise.resolve(this.a);var a=this.g.b,b=[];a.c&&(b=Ic(a.c,a.f||1,this.b.a||0));var c=0;a.b&&a.i?c=(a.i-1)*a.b:0<b.length&&(c=b[0].start-(a.g||0));var d=a.a.length;0<b.length&&b.length!=a.a.length&&(d=Math.min(b.length,a.a.length));for(var e=[],f=0;d>f;++f){var g=a.a[f],h=c/a.f,i=null,j=null;a.b?(i=c+a.b,j=i/a.f):0<b.length?(i=b[f].end-(a.g||0),j=i/a.f):(j=h+this.b.a,i=j*a.f);var c=i,i=0,k=null;g.a&&(i=g.a.na,k=g.a.end),e.push(new Kc(h,j,new zc(this.f,g.b,i,k)))}return"dynamic"==this.c.type?this.a=new Sc(e,this.c,this.b,this.h):this.a=new Pc(e),Promise.resolve(this.a)},_c.prototype.destroy=function(){this.g=this.f=this.c=this.b=null,this.a&&(this.a.destroy(),this.a=null)},_c.prototype.create=function(){if(this.a)return Promise.resolve(this.a);for(var a=this.f.a,b=Ic(a.c,a.a||1,this.c.a||0),c=[],d=0;d<b.length;++d){var e=b[d].start,f=e/a.a,g=b[d].end/a.a,e=Gc(this.g,this.f,d+a.j,e);if(!e)return a=Error("Failed to generate media URL."),a.type="dash",Promise.reject(a);var h=(a.i||0)/a.a;c.push(new Kc(f-h,g-h,e))}return"dynamic"==this.b.type?this.a=new Sc(c,this.b,this.c,this.h):this.a=new Pc(c),Promise.resolve(this.a)},ad.prototype.destroy=function(){this.b=null,this.a&&(this.a.destroy(),this.a=null)},ad.prototype.create=function(){if(this.a)return Promise.resolve(this.a);for(var a=[],b=0;b<this.b.length;++b){var c=this.b[b];a.push(new Kc(c.start_time,c.end_time,new zc(null,[new Ab(c.url)],c.start_byte,null)))}return this.b=null,this.a=new Pc(a),Promise.resolve(this.a)};var rf=0;bd.prototype.destroy=function(){this.H&&(this.H.destroy(),this.H=null),this.D&&(this.D.destroy(),this.D=null)};var sf=0;dd.prototype.destroy=function(){for(var a=0;a<this.m.length;++a)this.m[a].destroy();this.a=this.m=null},fd.prototype.destroy=function(){for(var a=0;a<this.a.length;++a)this.a[a].destroy();this.a=null},gd.prototype.destroy=function(){for(var a=0;a<this.a.length;++a)this.a[a].destroy();this.a=null},c(id,oa),id.prototype.G=function(a){null!=a.initialStreamBufferSize&&(this.B=Number(a.initialStreamBufferSize)),null!=a.streamBufferSize&&(this.L=Number(a.streamBufferSize)),null!=a.segmentRequestTimeout&&(this.a.u=Number(a.segmentRequestTimeout))},id.prototype.destroy=function(){pd(this),this.h.destroy(),this.b=this.h=null,this.a.destroy(),this.v=this.c=this.a=null},Se=id.prototype,Se.oa=function(){return this.b},Se.cb=function(){return this.I},Se.sb=function(a){return this.f||a.then(function(){this.f=!0,this.g||od(this,0)}.bind(this))["catch"](function(){}),this.h},Se.Ga=function(){return this.j},Se.ra=function(a,b,c){if(a!=this.b){var d=[a.H.create(),a.D.create()];Promise.all(d).then(xa(this,function(d){if(this.c){var e=this.b;this.b=a,this.I=d[0],this.w=d[1],this.K=!0,this.l||(e?b&&jd(this,!0,c):od(this,0))}}))["catch"](xa(this,function(a){"aborted"!=a.type&&(this.f?(a=Z(a),this.dispatchEvent(a)):this.h.reject(a))}))}},Se.kb=function(){return jd(this,!1)},Se.lb=function(a){return 0<Na(this.a,a)&&0<=Mc(this.a.b,a)},Se.va=function(){},Se.Da=function(){return!0},Se.Nb=function(){if(this.u&&!this.f)this.g=null;else{var a;if((a=this.f&&!this.j)&&(a=1<this.a.c.buffered.length),a)jd(this,!0);else{this.g=null,a=this.b;var b=this.I,c=this.c.currentTime;Na(this.a,this.u?c:c+(this.i||0))>=(this.u?Math.max(this.B,this.L):this.B)?(ld(this),od(this,1e3/(Math.abs(this.c.playbackRate)||1))):(b=kd(this,c,b))?(b=Oa(this.a,b,a.c,this.w),this.w=null,this.K&&(this.K=!1,md(this,a)),this.j=!1,b.then(xa(this,function(a){null==this.i&&(this.i=a),this.F&&0<Na(this.a,c)&&(this.F=!1,this.c.currentTime+=.001),od(this,0)}))["catch"](xa(this,function(a){if("aborted"!=a.type){var b=[0,404,410];"net"==a.type&&-1!=b.indexOf(a.ac.status)&&this.b&&od(this,5e3),a=Z(a),this.dispatchEvent(a)}}))):(ld(this),this.f&&!this.j&&(this.j=!0,nd(this)),od(this,1e3))}}},qd.prototype.destroy=function(){this.a&&(this.a.destroy(),this.a=null)},qd.prototype.create=function(){if(this.a)return Promise.resolve(this.a);var a=new Kc(0,null,this.b);return this.a=new Pc([a]),Promise.resolve(this.a)},c(rd,oa),rd.prototype.G=function(){},rd.prototype.destroy=function(){this.a&&this.b.removeChild(this.a),this.c.destroy(),this.v=this.b=this.f=this.h=this.a=this.c=null},Se=rd.prototype,Se.oa=function(){return this.f},Se.cb=function(){return this.h},Se.sb=function(){return this.c},Se.Ga=function(){return!0},Se.ra=function(a){a.H.create().then(xa(this,function(b){if(this.b){if(0==b.length())return Promise.reject(Error("No subtitles URL available."));var c=this.f;this.f=a,this.h=b,b=Qc(b).url.b[0].toString();var d=this.Da();this.a&&(this.va(!1),this.b.removeChild(this.a)),this.a=document.createElement("track"),this.b.appendChild(this.a),this.a.src=b,this.va(d),b=Y({type:"adaptation",bubbles:!0,contentType:"text",size:null,bandwidth:a.bandwidth}),this.dispatchEvent(b),c||this.c.resolve(0)}}))},Se.kb=function(){},Se.lb=function(){return!0},Se.va=function(a){this.g=a,this.a&&(this.a.track.mode=a?"showing":"disabled")},Se.Da=function(){return this.a&&(this.g="showing"==this.a.track.mode),this.g},sd.prototype.parse=function(a,b,c,d){var e=null;try{var f,g=new R(b);if(440786851!=S(g).id)f=null;else{var h=S(g);if(408125543!=h.id)f=null;else{var i,j=h.a.byteOffset,k=new R(h.a);for(b=null;L(k.a);){var l=S(k);if(357149030==l.id){b=l;break}}if(b){for(var m=new R(b.a),k=1e6;L(m.a);){var n=S(m);if(2807729==n.id){k=V(n);break}}i=k/1e9}else i=null;f=i?{Tb:j,Yb:i}:null}}if(f){var o=S(new R(a));if(475249515!=o.id)e=null;else{var p=f.Tb,q=f.Yb;a=[];var r=new R(o.a);for(f=o=-1;L(r.a);){var s=S(r);if(187==s.id){var t,u=new R(s.a),v=S(u);if(179!=v.id)t=null;else{var w=V(v),x=S(u);if(183!=x.id)t=null;else{for(var y=new R(x.a),j=0;L(y.a);){var z=S(y);if(241==z.id){j=V(z);break}}t={$b:w,Sb:j}}}if(t){var A=q*t.$b,B=p+t.Sb;if(o>=0){var C=new zc(d,c,f,B-1);a.push(new Kc(o,A,C))}o=A,f=B}}}o>=0&&(C=new zc(d,c,f,null),a.push(new Kc(o,null,C))),e=a}}else e=null}catch(D){if(!(D instanceof RangeError))throw D}return e},td.prototype.destroy=function(){this.h=this.i=this.g=null,this.a.g(),this.a=null,this.c&&(this.c.g(),this.c=null),this.b=null},td.prototype.create=function(){if(this.b)return this.b;var a=[Bc(this.a)];return"webm"==this.f&&a.push(Bc(this.c)),this.b=Promise.all(a).then(xa(this,function(a){var b=a[0];a=a[1]||null;var c=null;if("mp4"==this.f?(c=new Oc,c=c.parse(new DataView(b),this.a.f,this.a.b,this.h)):"webm"==this.f&&(c=new sd,c=c.parse(new DataView(b),new DataView(a),this.a.b,this.h)),!c)return b=Error("Failed to parse SegmentReferences from "+this.a.toString()+" (or one of its fallbacks)."),b.type="stream",Promise.reject(b);var d;return d="dynamic"==this.g.type?new Sc(c,this.g,this.i,this.j):new Pc(c),Promise.resolve(d)}))},c(Kd,ya),Kd.prototype.g=function(a,b,c){var d=new ra;a={stream_id:c.qa,mime_type:a.a,codecs:a.b,init_segment:b,references:c.o};var e=Da(this).put(a);return e.onsuccess=function(){d.resolve(c.qa)},e.onerror=function(){d.reject(e.error)},d},Kd.prototype.f=function(a,b){for(var c=Promise.resolve(),d=0;d<a.length();++d)var e=a.get(d),f=d==a.length()-1,f=this.c.bind(this,e,b,f),c=c.then(this.i.bind(this,e)),c=c.then(f);return c.then(function(){return Promise.resolve(b)})["catch"](xa(this,function(a){return Qd(this,b.qa),Promise.reject(a)}))},Kd.prototype.c=function(a,b,c,d){var e=new ra;0==b.ja.byteLength&&(b.Ca=a),b.ja=Pd(b.ja,d),b.jb++;var f=Y({type:"progress",detail:b.jb/b.Zb*100,bubbles:!0});if(1048576<=b.ja.byteLength||c){c={stream_id:b.qa,segment_id:b.Ja,content:b.ja};var g=Ca(this).put(c);b.o.push({start_time:b.Ca.b,start_byte:b.Ca.url.f,end_time:a.a,url:"idb://"+b.qa+"/"+b.Ja}),b.Ja++,b.ja=new ArrayBuffer(0),g.onerror=function(){e.reject(g.error)},g.onsuccess=xa(this,function(){this.dispatchEvent(f),e.resolve()})}else this.dispatchEvent(f),e.resolve();return e},Kd.prototype.i=function(a){var b=new tc;return b.c=1e3*this.b,Bc(a.url,b,this.j)},c(Td,oa),Td.prototype.destroy=function(){this.v=null;for(var b=0;b<this.f.length;++b)this.f[b].close()["catch"](function(){});this.f=[],this.c=this.a=this.i=null,this.g.destroy(),this.g=null,this.l.destroy(),this.l=null,this.j&&(a.clearTimeout(this.j),this.j=null),this.h=this.b=null},Td.prototype.initialize=function(){for(var a=new ga,b=this.b.bb(),c=0;c<b.length;++c){var d=b[c];d.a.a||d.b&&!be(d.b)||a.push(d.contentType,d)}for(var c={},d=!1,e=0;e<b.length;++e){var f=b[e];if(f.a.a&&!a.a.hasOwnProperty(f.contentType)){var g=f.a.a,h=c[g];if(h||(h=f.a,h={audioCapabilities:void 0,videoCapabilities:void 0,initDataTypes:void 0,distinctiveIdentifier:h.g?"required":"optional",persistentState:h.v||this.b.ha()?"required":"optional",sessionTypes:[this.b.ha()?"persistent-license":"temporary"]},c[g]=h),f.b&&(g=f.contentType+"Capabilities",g in h)){d=!0,h[g]||(h[g]=[]);var i;"audio"==f.contentType?i=f.a.f:"video"==f.contentType&&(i=f.a.j),h[g].push({contentType:f.b,robustness:i})}}}if(!d){if(!b.length)throw a=Error("No DrmInfo exists!"),a.type="drm",a;this.a=b[0].a}return 0==Object.keys(c).length?(this.b.Ka(a),this.g.resolve(),Promise.resolve()):(i=new ra,c=Wd(this,c,i),c=c.then(this.tb.bind(this,b,a)),c=c.then(this.Ub.bind(this)),i.reject(null),c)},Se=Td.prototype,
Se.tb=function(a,b,c){if(!this.h)return Xd();for(var d=c.keySystem,e=c.getConfiguration(),f=["audio","video"],g=0;g<f.length;++g){var h=f[g];if(!b.a.hasOwnProperty(h)){var i=e[h+"Capabilities"];if(i&&i.length){for(var i=i[0],j=[],k={},l=0;l<a.length;++l){var m=a[l];if(m.a.a==d&&m.b==i.contentType&&!(m.id in k)){j.push(m),k[m.id]=!0;var n;if(this.a){n=this.a;var m=m.a,o=new $a;o.a=n.a,o.h=n.h,o.i=n.i,o.l=n.l,o.u=n.u,o.g=n.g,o.v=n.v,o.f=n.f,o.j=n.j,o.c=n.c?new Uint8Array(n.c.buffer):null,ab(o,n.b),ab(o,m.b),n=o}else n=m.a;this.a=n}}b.set(h,j)}}}return this.b.Ka(b),c.createMediaKeys()},Se.Ub=function(a){return this.h?(this.i=a,this.h.setMediaKeys(this.i).then(xa(this,function(){return this.h?this.a.c?this.i.setServerCertificate(this.a.c):Promise.resolve():Xd()})).then(xa(this,function(){if(!this.h)return Xd();if(0<this.b.ua().length)Yd(this);else{for(var a=0;a<this.a.b.length;++a){var b=this.a.b[a];this.eb({type:"encrypted",initDataType:b.initDataType,initData:b.initData})}0==this.a.b.length&&la(this.l,this.h,"encrypted",this.eb.bind(this))}}))):Xd()},Se.eb=function(a){for(var b=new Uint8Array(a.initData),c=0;c<this.c.length;++c)if(Za(b,this.c[c].data))return;try{var d=Zd(this)}catch(e){return b=Z(e),this.dispatchEvent(b),void this.g.reject(e)}a=d.generateRequest(a.initDataType,a.initData),this.c.push({data:b,La:d}),a["catch"](xa(this,function(a){if(this.h){for(var b=0;b<this.c.length;++b)if(this.c[b].La==d){this.c.splice(b,1);break}b=Z(a),this.dispatchEvent(b),this.g.reject(a)}})),this.f.push(d)},Se.Jb=function(a){$d(this,a.target,this.a,a.message)},Se.yb=function(a){a=a.target;for(var b=a.keyStatuses,c={},d=b.keys(),e=d.next();!e.done;e=d.next()){var f=Ya(new Uint8Array(e.value)),e=b.get(e.value);c[f]=e}if(a.expiration<Date.now()){for(b=0;b<this.c.length;++b)if(this.c[b].La==a){this.c.splice(b,1);break}a.close(),this.f.splice(this.f.indexOf(a),1)}this.b.fb(c)},c(ae,oa),b("shaka.player.Player",ae),ae.version="v1.6.2",ae.isBrowserSupported=function(){return!!(a.MediaSource&&a.MediaKeys&&a.navigator&&a.navigator.requestMediaKeySystemAccess&&a.MediaKeySystemAccess&&a.MediaKeySystemAccess.prototype.getConfiguration&&a.Promise&&Element.prototype.requestFullscreen&&document.exitFullscreen&&"fullscreenElement"in document&&a.Uint8Array)},ae.isTypeSupported=be,ae.setTextStyle=function(a){var b=document.getElementById("ShakaPlayerTextStyle");for(b||(b=document.createElement("style"),b.id="ShakaPlayerTextStyle",document.head.appendChild(b)),b=b.sheet;b.cssRules.length;)b.deleteRule(0);b.insertRule("::cue { "+l(a)+" }",0)},ae.prototype.destroy=function(){return this.u().then(xa(this,function(){this.f.destroy(),this.a=this.f=null}))["catch"](function(){})},ae.prototype.destroy=ae.prototype.destroy,ae.prototype.u=function(){if(!this.b)return Promise.resolve();this.h&&ge(this),this.a.pause(),ma(this.f),fe(this),de(this),this.j&&(this.j.destroy(),this.j=null),this.a.src="";var a=this.a.setMediaKeys(null);return this.b&&(this.b.destroy(),this.b=null),this.h=!1,this.g=new Gd,a},ae.prototype.unload=ae.prototype.u,ae.prototype.ea=function(a){var b=this.u();return this.a.autoplay&&(f("load"),la(this.f,this.a,"timeupdate",this.xb.bind(this))),a.T(this.c),a.pb(this.G),this.G=null,b=b.then(xa(this,function(){return a.X()})),b["catch"](xa(this,function(b){return a.destroy(),Promise.reject(b)})),b.then(xa(this,function(){return this.a?(this.b=a,la(this.f,this.b,"seekrangechanged",this.Hb.bind(this)),this.j=new Td(this,this.a,this.b),this.j.initialize()):ce()})).then(xa(this,function(){return this.a?(la(this.f,this.a,"error",this.Vb.bind(this)),la(this.f,this.a,"playing",this.Fb.bind(this)),la(this.f,this.a,"pause",this.Eb.bind(this)),this.b.Wa(this,this.a)):ce()})).then(xa(this,function(){return this.a?void ee(this):ce()}))["catch"](xa(this,function(a){if(!this.a)return ce();if("destroy"!=a.type){var b=Z(a);this.dispatchEvent(b)}return this.u().then(function(){return Promise.reject(a)})}))},ae.prototype.load=ae.prototype.ea,Se=ae.prototype,Se.xb=function(){g("load"),this.g.playbackLatency=h("load")/1e3,this.f.sa(this.a,"timeupdate")},Se.Vb=function(){if(this.a.error){var a=this.a.error.code;a!=MediaError.MEDIA_ERR_ABORTED&&(a=Error(tf[a]||"Unknown playback error."),a.type="playback",a=Z(a),this.dispatchEvent(a))}},Se.Fb=function(){f("playing"),!this.i&&0>this.l&&(this.a.playbackRate=0,this.B(this.a.currentTime,Date.now(),this.l)),this.h&&ge(this)},Se.Eb=function(){g("playing");var a=h("playing");if(!isNaN(a)){var b=this.g;b.playTime+=a/1e3}de(this)},Se.Hb=function(a){this.F=a.start},Se.qb=function(){if(!this.a.paused){g("playing");var a=h("playing");if(!isNaN(a)){var b=this.g;b.playTime+=a/1e3,f("playing")}}return a=this.g,b=this.a,b.getVideoPlaybackQuality&&(b=b.getVideoPlaybackQuality(),a.decodedFrames=b.totalVideoFrames,a.droppedFrames=b.droppedVideoFrames),this.g},ae.prototype.getStats=ae.prototype.qb,ae.prototype.da=function(){return this.b?this.b.ma():[]},ae.prototype.getVideoTracks=ae.prototype.da,ae.prototype.Y=function(){return this.b?this.b.pa():[]},ae.prototype.getAudioTracks=ae.prototype.Y,ae.prototype.$=function(){return this.b?this.b.Oa():[]},ae.prototype.getTextTracks=ae.prototype.$,ae.prototype.selectVideoTrack=function(a,b){return this.b?this.b.selectVideoTrack(a,void 0==b?!0:b):!1},ae.prototype.selectVideoTrack=ae.prototype.selectVideoTrack,ae.prototype.M=function(a,b){return this.b?this.b.nb(a,void 0==b?!0:b):!1},ae.prototype.selectAudioTrack=ae.prototype.M,ae.prototype.fa=function(a){return this.b?this.b.ob(a,!1):!1},ae.prototype.selectTextTrack=ae.prototype.fa,ae.prototype.V=function(a){this.b&&this.b.Na(a)},ae.prototype.enableTextTrack=ae.prototype.V,ae.prototype.T=function(a){de(this),a>=0?this.a.playbackRate=a:this.a.paused||(this.a.playbackRate=0,this.B(this.a.currentTime,Date.now(),a)),this.l=a},ae.prototype.setPlaybackRate=ae.prototype.T,ae.prototype.K=function(){return this.l},ae.prototype.getPlaybackRate=ae.prototype.K,ae.prototype.R=function(a){this.G=a},ae.prototype.setPlaybackStartTime=ae.prototype.R,ae.prototype.I=function(){return this.b?this.b.mb():!1},ae.prototype.isLive=ae.prototype.I,ae.prototype.U=function(a){if(a){var b=ba(a,"enableAdaptation");null!=b&&(this.c.enableAdaptation=b),b=ca(a,"streamBufferSize"),null!=b&&(this.c.streamBufferSize=b),b=ca(a,"liveStreamEndTimeout"),null!=b&&(this.c.liveStreamEndTimeout=b),b=ca(a,"licenseRequestTimeout"),null!=b&&(this.c.licenseRequestTimeout=b),b=ca(a,"mpdRequestTimeout"),null!=b&&(this.c.mpdRequestTimeout=b),b=ca(a,"segmentRequestTimeout"),null!=b&&(this.c.segmentRequestTimeout=b),b=da(a,"preferredLanguage"),null!=b&&(this.c.preferredLanguage=b),b=fa(a,"restrictions",j),null!=b&&(this.c.restrictions=b.clone()),a=ba(a,"disableCacheBustingEvenThoughItMayAffectBandwidthEstimation"),null!=a&&(qf=!a),this.b&&this.b.T(this.c)}},ae.prototype.configure=ae.prototype.U,ae.prototype.Z=function(){return this.c},ae.prototype.getConfiguration=ae.prototype.Z,ae.prototype.B=function(b,c,d){this.i=null;var e=(Date.now()-c)/1e3*d;this.a.currentTime<this.F+(this.I()?1:.05)?this.a.pause():(e=Math.max(this.F,b+e),this.a.currentTime=e,this.i=a.setTimeout(this.B.bind(this,b,c,d),250))},ae.prototype.L=function(){if(ee(this),!this.a.ended&&!this.a.seeking){var a=this.a.buffered,b=a.length?a.end(a.length-1):0,a=Math.max(b-this.a.currentTime,0),c=this.a.duration,c=isNaN(c)?0:Math.max(c-.05,0),b=b>=c||this.a.currentTime>=c;this.h?(c=this.b.ab(),(b||a>c)&&(ge(this),this.a.play())):!this.a.paused&&!b&&.5>a&&(this.h=!0,this.a.pause(),this.g.bufferingHistory.push(J()/1e3),f("buffering"),this.dispatchEvent(Y({type:"bufferingStart"})))}};var tf={2:"A network failure occured while loading media content.",3:"The browser failed to decode the media content.",4:"The browser does not support the media content."};ke.prototype.destroy=function(){this.a.destroy(),this.a=null},ke.prototype.update=function(a){var b=le(a),c=le(this.a);return Promise.all([b,c]).then(xa(this,function(b){var c=b[0];b=b[1];var d=this.a.a;return he(d),ie(d),a.f=this.a.f,a.g=this.a.g?this.a.g.clone():null,a.c=this.a.c,d=[],me(a,this.a,c,b,d),c=a.a,he(c),ie(c),Promise.resolve(d)}))},b("shaka.media.SimpleAbrManager",qe),qe.prototype.destroy=function(){this.f.destroy(),this.a=this.b=this.f=null},qe.prototype.initialize=function(a,b){this.b||this.a||(this.b=a,this.a=b)},qe.prototype.start=function(){this.b&&this.a&&!this.g&&(this.c=Date.now()+4e3,la(this.f,this.b,"bandwidth",this.v.bind(this)),la(this.f,this.a,"adaptation",this.j.bind(this)),la(this.f,this.a,"trackschanged",this.h.bind(this)),this.g=!0)},qe.prototype.enable=function(a){this.i=a},qe.prototype.getInitialVideoTrackId=function(){if(!this.b||!this.a)return null;var a=re(this);return a?a.id:null},qe.prototype.selectVideoTrack=function(a,b,c){this.g&&this.a.selectVideoTrack(a.id,b,c)},qe.prototype.v=function(){Date.now()<this.c||this.h()},qe.prototype.h=function(){if(this.i){var a=re(this);if(a){if(a.active)return void(this.c=Date.now()+3e3);this.selectVideoTrack(a,!1)}this.c=Number.POSITIVE_INFINITY}},qe.prototype.j=function(){this.c==Number.POSITIVE_INFINITY&&(this.c=Date.now()+3e4)},c(se,oa),b("shaka.player.HttpVideoSource",se),se.prototype.T=function(){},se.prototype.destroy=function(){this.a&&(this.a.parentElement.removeChild(this.a),this.a=null),this.v=this.b=null},Se=se.prototype,Se.Wa=function(a,b){this.v=a;var c=b.mediaKeys;return b.src=this.f,c=b.setMediaKeys(c),this.c&&(this.a=document.createElement("track"),this.a.src=this.c,b.appendChild(this.a),this.a.track.mode="showing"),c},Se.X=function(){return Promise.resolve()},Se.ma=function(){return[]},Se.pa=function(){return[]},Se.Oa=function(){return[]},Se.ab=function(){return 5},Se.bb=function(){var a=new hd;return a.a=this.b,[a]},Se.Ka=function(){},se.prototype.selectVideoTrack=function(){return!1},Se=se.prototype,Se.nb=function(){return!1},Se.ob=function(){return!1},Se.Na=function(a){this.a&&(this.a.track.mode=a?"showing":"disabled")},Se.pb=function(){},Se.ua=function(){return[]},Se.ha=function(){return!1},Se.mb=function(){return!1},Se.fb=function(a){for(var b in a){var c=a[b],d=cf[c]||null;if(d){var e=sa(b),d=Error("Key "+e+" is not usable. "+d);d.type="drm",d.code=c,c=Z(d),this.dispatchEvent(c)}}},c(te,oa),b("shaka.player.StreamVideoSource",te),te.prototype.T=function(a){null!=a.streamBufferSize&&(this.G.streamBufferSize=a.streamBufferSize),null!=a.segmentRequestTimeout&&(this.G.segmentRequestTimeout=a.segmentRequestTimeout),Me(this),null!=a.enableAdaptation&&this.I.enable(Boolean(a.enableAdaptation)),null!=a.mpdRequestTimeout&&(this.da=Number(a.mpdRequestTimeout)),null!=a.liveStreamEndTimeout&&(this.Ua=Number(a.liveStreamEndTimeout)),null!=a.preferredLanguage&&(this.K=_(String(a.preferredLanguage))),null!=a.restrictions&&(this.h=a.restrictions,this.L&&we(this))},te.prototype.destroy=function(){this.B.destroy(),this.ea.destroy(),this.ea=this.B=null,this.Y&&(a.clearTimeout(this.Y),this.Y=null),this.V&&(a.clearTimeout(this.V),this.V=null),this.u=null,this.i.destroy(),this.i=null,aa(this.c).forEach(function(a){a.destroy()}),this.b=this.c=null,this.a&&(this.a.destroy(),this.a=null),this.I.destroy(),this.v=this.h=this.U=this.f=this.g=this.Z=this.I=null},Se=te.prototype,Se.Wa=function(b,c){if(!this.L){var d=Error("Cannot call attach() right now.");return d.type="app",Promise.reject(d)}return this.v=b,this.f=c,this.U=b.qb(),la(this.i,this.g,"sourceopen",this.Ab.bind(this)),la(this.i,this.Z,"bandwidth",this.Wb.bind(this)),this.a.b&&(la(this.i,b,"bufferingStart",this.wb.bind(this)),la(this.i,b,"bufferingEnd",this.vb.bind(this))),d=this.f.mediaKeys,this.f.src=a.URL.createObjectURL(this.g),d=this.f.setMediaKeys(d),Promise.all([this.B,d])},Se.X=function(){if(this.L){var a=Error("Cannot call load() right now.");return a.type="app",Promise.reject(a)}return this.a&&0!=this.a.a.length?(a=this.a.a,he(a),ie(a),0==this.a.a.length||0==this.a.a[0].a.length?(a=Error("The manifest specifies content that cannot be displayed on this browser/platform."),a.type="stream",Promise.reject(a)):(this.L=!0,this.G.initialStreamBufferSize=this.a.c,Me(this),we(this),Promise.resolve())):(a=Error("The manifest does not specify any content."),a.type="stream",Promise.reject(a))},Se.ib=function(a){var b=Date.now(),c=this.V=null,d=this.a.g;(a?this.gb():this.hb(d)).then(xa(this,function(a){return c=new ke(a),c.update(this.a)})).then(xa(this,function(a){c.destroy(),c=null;for(var d=0;d<a.length;++d)ve(this,a[d]);this.G.initialStreamBufferSize=this.a.c,Me(this),we(this),0==Object.keys(this.c).length?Ae(this):ue(this,(Date.now()-b)/1e3)}))["catch"](xa(this,function(a){c&&(c.destroy(),c=null),"aborted"!=a.type&&(a=Z(a),this.dispatchEvent(a),this.a&&ue(this,0))}))},Se.hb=function(){return Promise.reject("Cannot update manifest with this VideoSource implementation.")},Se.gb=function(){return Promise.reject("Cannot update manifest with this VideoSource implementation.")},Se.ma=function(){if(!this.b.a.hasOwnProperty("video"))return[];for(var a=this.c.video,a=(a=a?a.oa():null)?a.C:0,b=[],c=this.b.get("video"),d=0;d<c.length;++d)for(var e=c[d],f=0;f<e.m.length;++f){var g=e.m[f];if(g.N&&g.J){var h=g.C,g=new o(h,g.bandwidth,g.width,g.height);h==a&&(g.active=!0),b.push(g)}}return b},te.prototype.getVideoTracks=te.prototype.ma,te.prototype.pa=function(){if(!this.b.a.hasOwnProperty("audio"))return[];for(var a=this.c.audio,a=(a=a?a.oa():null)?a.C:0,b=[],c=this.b.get("audio"),d=0;d<c.length;++d)for(var e=c[d],f=e.lang,g=0;g<e.m.length;++g){var h=e.m[g];if(h.N&&h.J){var j=h.C,h=new i(j,h.bandwidth,f);j==a&&(h.active=!0),b.push(h)}}return b},te.prototype.getAudioTracks=te.prototype.pa,te.prototype.Oa=function(){if(!this.b.a.hasOwnProperty("text"))return[];for(var a=this.c.text,b=a?a.oa():null,b=b?b.C:0,c=[],d=this.b.get("text"),e=0;e<d.length;++e)for(var f=d[e],g=f.lang,h=0;h<f.m.length;++h){var i=f.m[h].C,j=new n(i,g);i==b&&(j.active=!0,j.enabled=a.Da()),c.push(j)}return c},te.prototype.getTextTracks=te.prototype.Oa,te.prototype.ab=function(){return Number(this.G.initialStreamBufferSize)},te.prototype.bb=function(){var a;if(this.L){a=this.a.a[0];for(var b=[],c=0;c<a.a.length;++c)b.push.apply(b,ed(a.a[c]));a=b}else a=[];return a},te.prototype.Ka=function(a){if(this.L){for(var b={},c=this.a.a[0],d=0;d<c.a.length;++d){var e=c.a[d];b[e.C]=e}for(this.b.a={},c=ja(a),d=0;d<c.length;++d){var e=c[d],f=a.get(e);if("video"==e){var g=f[0].id;this.b.push(e,b[g])}else if("audio"==e)for(var g=f[0].b.split(";")[0],h=0;h<f.length;++h){var i=f[h];i.b.split(";")[0]==g&&this.b.push(e,b[i.id])}else for(h=0;h<f.length;++h)g=f[h].id,this.b.push(e,b[g])}this.fa=!0,(a=this.b.get("audio"))&&(ze(this,a),this.b.set("audio",a),a=a[0].lang||this.K,$(2,this.K,a)&&(this.fa=!1)),(a=this.b.get("text"))&&(ze(this,a),this.b.set("text",a),a=a[0].lang||this.K,$(2,this.K,a)||(this.fa=!1))}},te.prototype.selectVideoTrack=function(a,b,c){return ye(this,"video",a,b,c)},Se=te.prototype,Se.nb=function(a,b){return ye(this,"audio",a,b)},Se.ob=function(a,b){return ye(this,"text",a,b)},Se.Na=function(a){var b=this.c.text;b&&b.va(a)},Se.pb=function(a){this.$=a},Se.ua=function(){return[]},Se.ha=function(){return!1},Se.mb=function(){return this.a?this.a.b:!1},Se.fb=function(a){for(var b,c=!1,d=new ga,e=ha(this.b),f=0;f<e.length;++f)for(var g=e[f],h=0;h<g.m.length;++h){var i=g.m[h];i.f.forEach(function(a){d.push(a,i)})}for(b in a)if(e=cf[a[b]]||null,g=d.get(b))for(f=0;f<g.length;++f)i=g[f],h=i.N,i.N=!e,h!=i.N&&(c=!0);else sa(b);c&&(xe(this),b=this.pa(),a=this.ma(),b=this.b.a.hasOwnProperty("audio")&&0==b.length,a=this.b.a.hasOwnProperty("video")&&0==a.length,b||a)&&(a=Error("The key system has restricted all "+(b&&a?"audio and video tracks.":b?"audio tracks.":"video tracks.")),a.type="drm",a=Z(a),this.dispatchEvent(a))},Se.Ab=function(){this.i.sa(this.g,"sourceopen"),Ae(this).then(xa(this,function(){this.B&&this.B.resolve()}))["catch"](xa(this,function(a){this.B&&this.B.reject(a)}))},Se.ub=function(a){d(a&&a.length==Object.keys(this.c).length);for(var b=Number.POSITIVE_INFINITY,c=Number.NEGATIVE_INFINITY,e=0;e<a.length;++e)var f=a[e],b=Math.min(b,f),c=Math.max(c,f);for(a=Je(this),e=0;e<a.length;++e)a[e].ka(c);Fe(this,a,c),e=ha(this.b).map(function(a){return a.m}).reduce(function(a,b){return a.concat(b)},[]).map(function(a){var b=[a.H.create()];return a.D&&b.push(a.D.create()),Promise.all(b)}),Promise.all(e).then(xa(this,function(a){for(var b=0;b<a.length;++b)a[b][0].ka(c);this.Ra=!0;for(var d in this.u)a=this.u[d],b=this.c[d],Hd(this.U,a.Pa),b.ra(a.Pa,a.Xa,a.Ya);this.u={}}))["catch"](xa(this,function(a){"aborted"!=a.type&&(a=Z(a),this.dispatchEvent(a))}))},Se.Mb=function(){this.Y=null,Le(this);var b=Ke(this,Je(this));b&&(this.a.b&&this.Ta!=b.A&&(this.Ta=b.A,null!=this.w&&(a.clearTimeout(this.w),this.w=null)),He(this,b.start,b.end),this.f.paused||Ie(this,this.f.currentTime,b.start,b.end))},Se.Ib=function(){var a=this.f.currentTime;if(null!=this.F){if(a>=this.F-.01&&a<=this.F+.01)return void(this.F=null);this.F=null}var b=Ke(this,Je(this));if(b){var c=b.end;if((b=Ie(this,a,b.start,c))||(c+.01>=a?b=!1:(this.f.currentTime=c,b=!0)),!b)for(var d in this.c)this.c[d].kb()}},Se.Kb=function(){if(!this.a.b){for(var a in this.c)if(!this.c[a].Ga())return;this.$a()}},Se.wb=function(){aa(this.c).every(function(a){return a.Ga()})&&(this.w=a.setTimeout(this.$a.bind(this),1e3*this.Ua))},Se.vb=function(){null!=this.w&&(a.clearTimeout(this.w),this.w=null)},Se.Wb=function(){var a=this.U,b=this.Z.getBandwidth();a.estimatedBandwidth=b,a.bandwidthHistory.push(new Jd(b))},Se.$a=function(){this.w=null,this.g.endOfStream()},c(Ne,te),b("shaka.player.DashVideoSource",Ne),Ne.prototype.Aa=function(a,b,c){this.R.push(a),this.ga.push(b||""),this.ta.push(c||"")},Ne.prototype.addExternalCaptions=Ne.prototype.Aa,Ne.prototype.xa=function(a){this.j=a},Ne.prototype.setNetworkCallback=Ne.prototype.xa,Ne.prototype.destroy=function(){this.l=this.j=this.M=null,te.prototype.destroy.call(this)},Ne.prototype.X=function(){var a=new zc(this.j,[new Ab(this.za)]);return Ec(new Dc(a,this.da)).then(xa(this,function(a){this.l=a;for(var b=0;b<this.R.length;b++){var c=a,d=this.R[b],e=this.ga[b],f=this.ta[b];if(0!==c.a.length){var g=new Lb;g.contentType="text",g.lang=e||"en",g.c=!0,e=new Ob,e.bandwidth=0,e.f=f||"text/vtt",e.s=[new Ab(d)],g.a.push(e),c.a[0].b.push(g),ac(c.a[0])}}return this.a=vd(new ud(this.M),a,this.j),te.prototype.X.call(this)}))},Ne.prototype.hb=function(a){return Ec(new Dc(a,this.da)).then(xa(this,function(a){return this.l=a,a=vd(new ud(this.M),a,this.j),Promise.resolve(a)}))},Ne.prototype.gb=function(){var a=vd(new ud(this.M),this.l,this.j);return Promise.resolve(a)},c(Oe,te),b("shaka.player.OfflineVideoSource",Oe),Oe.prototype.T=function(a){null!=a.licenseRequestTimeout&&(this.l.licenseRequestTimeout=a.licenseRequestTimeout),null!=a.segmentRequestTimeout&&(this.l.segmentRequestTimeout=a.segmentRequestTimeout),te.prototype.T.call(this,a)},b("shaka.player.OfflineVideoSource.retrieveGroupIds",function(){var a=new Ha,b=za(a).then(function(){return Ia(a)});return b.then(function(){Aa(a)})["catch"](function(){Aa(a)}),b}),Oe.prototype.xa=function(b,c,d,e){var f,g=null,h={},i=[];return b=new zc(this.ga,[new Ab(b)]),Ec(new Dc(b,this.da)).then(xa(this,function(a){return this.a=vd(new ud(d),a,this.ga),this.a.b?(a=Error("Unable to store live streams offline."),a.type="app",Promise.reject(a)):(this.T({preferredLanguage:c}),te.prototype.X.call(this))})).then(xa(this,function(){var b=document.createElement("video");return b.src=a.URL.createObjectURL(this.g),f=new Td(null,b,this),null!=this.l.licenseRequestTimeout&&(f.w=Number(this.l.licenseRequestTimeout)),la(this.i,f,"sessionReady",this.ta.bind(this)),la(this.i,f,"error",function(a){g=a}),f.initialize()})).then(xa(this,function(){for(var a=ha(this.b),b=0;b<a.length;++b)for(var c=a[b],d=0;d<c.m.length;++d){var f=c.m[d];h[f.C]=f}return e()})).then(xa(this,function(a){for(var b=0;b<a.length;++b){var c=a[b],d=h[c];if(!d)return Promise.reject(Error("Invalid stream ID chosen: "+c));i.push(d)}var e=["audio","video"];return i=i.filter(function(a){return!(0>e.indexOf(a.a.split("/")[0]))}),a=i.map(function(a){return a.D.create()}),Promise.all(a)})).then(xa(this,function(a){for(var b=i,c=[],d=0;d<b.length;++d)try{c[d]=this.g.addSourceBuffer(cd(b[d]))}catch(e){}if(b.length!=c.length)a=Error("Error initializing streams."),a.type="storage",a=Promise.reject(a);else{for(d=0;d<a.length;++d)(b=a[d])&&c[d].appendBuffer(b);a=Promise.resolve()}return a})).then(xa(this,function(){return Ud(f,this.timeoutMs)})).then(xa(this,function(){return g?Promise.reject(g):Pe(this,i,f.a,this.a.a[0].b)})).then(xa(this,function(a){return this.R=a,g?(Qe(this),Promise.reject(g)):Promise.resolve(a)}))},b("shaka.player.OfflineVideoSource.prototype.store",Oe.prototype.xa),Oe.prototype.Aa=function(a){this.ga=a},Oe.prototype.setNetworkCallback=Oe.prototype.Aa,Oe.prototype.ta=function(a){this.M.push(a.detail.sessionId)},Oe.prototype.X=function(){var a,b,c=new Ha;return za(c).then(xa(this,function(){return Ja(c,this.R)})).then(xa(this,function(d){var e=[];this.M=d.session_ids,a=d.duration,b={keySystem:d.key_system,distinctiveIdentifierRequired:d.distinctive_identifier,persistentStorageRequired:!0,audioRobustness:d.audio_robustness,videoRobustness:d.video_robustness,withCredentials:d.with_credentials,licenseServerUrl:d.license_server};for(var f=0;f<d.stream_ids.length;++f)e.push(Ka(c,d.stream_ids[f]));return Promise.all(e)})).then(xa(this,function(c){var d=a,e=b,f=new gd;f.c=5;for(var g=new fd,h=0;h<c.length;++h){var i=c[h],j=new bd,k=new ad(i.references),l=new Jc(null,i.init_segment);j.H=k,j.D=l,j.a=i.mime_type,j.b=i.codecs,j.N=!0,this.j&&(null!=this.j.licenseServerUrl&&(e.licenseServerUrl=this.j.licenseServerUrl),null!=this.j.withCredentials&&(e.withCredentials=this.j.withCredentials),e.licensePostProcessor=this.j.licensePostProcessor,e.licensePreProcessor=this.j.licensePreProcessor,e.serverCertificate=this.j.serverCertificate),i=_a(e),k=new dd,k.m.push(j),k.a.push(i),k.contentType=j.a.split("/")[0],g.a.push(k),g.b=d}return f.a.push(g),this.a=f,te.prototype.X.call(this)})).then(function(){return Aa(c),Promise.resolve()})["catch"](function(a){return Aa(c),Promise.reject(a)})},Oe.prototype.za=function(a,b){a&&(this.j={licenseServerUrl:a.licenseServerUrl,withCredentials:a.withCredentials,serverCertificate:a.serverCertificate,licensePreProcessor:a.licensePreProcessor,licensePostProcessor:a.licensePostProcessor});var c=null;return Re(this)["catch"](function(a){return b?(c=a,Promise.resolve()):Promise.reject(a)}).then(xa(this,function(){return Qe(this)})).then(function(){return Promise.resolve(c)})},Oe.prototype.deleteGroup=Oe.prototype.za,Oe.prototype.ua=function(){return this.M},Oe.prototype.ha=function(){return!0}}).bind(e,this)(),"undefined"!=typeof a&&a.exports?a.exports=e.shaka:(d=function(){return e.shaka}.call(b,c,b,a),!(void 0!==d&&(a.exports=d)))}()}});webpackJsonpjwplayer([3],{106:function(a,b,c){var d,e;d=[c(48),c(55),c(45),c(46),c(62),c(101),c(86),c(47)],e=function(a,b,c,d,e,f,g,h){function i(i,l){function m(){window.YT&&window.YT.loaded?(H=window.YT,p()):setTimeout(m,100)}function n(){j&&(j.off(),j=null)}function o(){var a=J&&J.parentNode;return a?a:(L||(window.jwplayer(i).onReady(p),L=!0),!1)}function p(){H&&o()&&M&&M.apply(G)}function q(){if(I&&I.getPlayerState){var a=I.getPlayerState();null!==a&&void 0!==a&&a!==P&&z({data:a});var b=H.PlayerState;a===b.PLAYING?s():a===b.BUFFERING&&t()}}function r(a){return Math.round(10*a)/10}function s(){t(),G.trigger(d.JWPLAYER_MEDIA_TIME,{position:r(I.getCurrentTime()),duration:I.getDuration()})}function t(){var a=0;I&&I.getVideoLoadedFraction&&(a=Math.round(100*I.getVideoLoadedFraction())),K!==a&&(K=a,G.trigger(d.JWPLAYER_MEDIA_BUFFER,{bufferPercent:a}))}function u(){G.state!==e.IDLE&&G.state!==e.COMPLETE&&(Q=!0,G.trigger(d.JWPLAYER_MEDIA_BEFORECOMPLETE),G.setState(e.COMPLETE),Q=!1,G.trigger(d.JWPLAYER_MEDIA_COMPLETE))}function v(){G.trigger(d.JWPLAYER_MEDIA_META,{duration:I.getDuration(),width:J.clientWidth,height:J.clientHeight})}function w(){var a=arguments,b=a.length-1;return function(){for(var c=b,d=a[b].apply(this,arguments);c--;)d=a[c].call(this,d);return d}}function x(a,b){if(!a)throw"invalid Youtube ID";var d=J.parentNode;if(d){var e={height:"100%",width:"100%",videoId:a,playerVars:c.extend({html5:1,autoplay:0,controls:0,showinfo:0,rel:0,modestbranding:0,playsinline:1,origin:location.protocol+"//"+location.hostname},b),events:{onReady:y,onStateChange:z,onPlaybackQualityChange:A,onError:B}};G.setVisibility(!0),I=new H.Player(J,e),J=I.getIframe(),M=null}}function y(){N&&(N.apply(G),N=null)}function z(b){var f=H.PlayerState;switch(P=b.data){case f.UNSTARTED:return void(a.isAndroid()&&I.playVideo());case f.ENDED:return void u();case f.PLAYING:return c.isFunction(I.unloadModule)&&I.unloadModule("captions"),R=!1,v(),G.trigger(d.JWPLAYER_MEDIA_LEVELS,{levels:G.getQualityLevels(),currentQuality:G.getCurrentQuality()}),void G.setState(e.PLAYING);case f.PAUSED:return void G.setState(e.PAUSED);case f.BUFFERING:return void(G.seeking?G.setState(e.LOADING):G.setState(e.STALLED));case f.CUED:return G.setState(e.IDLE),void(a.isAndroid()&&I.playVideo())}}function A(){P!==H.PlayerState.ENDED&&G.play(),G.trigger(d.JWPLAYER_MEDIA_LEVEL_CHANGED,{currentQuality:G.getCurrentQuality(),levels:G.getQualityLevels()})}function B(){G.trigger(d.JWPLAYER_MEDIA_ERROR,{message:"Error loading YouTube: Video could not be played"})}function C(){k&&G.setVisibility(!0)}function D(){clearInterval(O),I&&I.stopVideo&&a.tryCatch(function(){I.stopVideo(),I.clearVideo()})}function E(b){N=null;var c=b.sources[0].file,d=a.youTubeID(c);if(G.volume(l.volume),G.mute(l.mute),G.setVisibility(!0),!H||!I)return M=function(){x(d)},void m();if(!I.getPlayerState){var e=function(){G.load(b)};return void(N=N?w(e,N):e)}var f=I.getVideoData().video_id;if(f!==d){R?(D(),I.cueVideoById(d)):I.loadVideoById(d);var g=I.getPlayerState(),h=H.PlayerState;g!==h.UNSTARTED&&g!==h.CUED||C()}else I.getCurrentTime()>0&&I.seekTo(0),v()}this.state=e.IDLE,c.extend(this,h);var F,G=this,H=window.YT,I=null,J=document.createElement("div"),K=-1,L=!1,M=null,N=null,O=-1,P=-1,Q=!1,R=k;this.setState=function(a){clearInterval(O),a!==e.IDLE&&a!==e.COMPLETE&&(O=setInterval(q,250),a===e.PLAYING?this.seeking=!1:a!==e.LOADING&&a!==e.STALLED||t()),g.setState.apply(this,arguments)},!H&&j&&j.getStatus()===f.loaderstatus.NEW&&(j.on(d.COMPLETE,m),j.on(d.ERROR,n),j.load()),J.id=i+"_youtube",this.init=function(a){E(a)},this.destroy=function(){this.remove(),this.off(),F=J=H=G=null},this.load=function(a){this.setState(e.LOADING),E(a),G.play()},this.stop=function(){D(),this.setState(e.IDLE)},this.play=function(){R||(I&&I.playVideo?I.playVideo():N=N?w(this.play,N):this.play)},this.pause=function(){R||I.pauseVideo&&I.pauseVideo()},this.seek=function(a){R||I.seekTo&&(this.seeking=!0,I.seekTo(a))},this.volume=function(a){if(c.isNumber(a)){var b=Math.min(Math.max(0,a),100);I&&I.getVolume&&I.setVolume(b)}},this.mute=function(b){var c=a.exists(b)?!!b:!l.mute;I&&I.mute&&(c?I.mute():I.unMute())},this.detachMedia=function(){return null},this.attachMedia=function(){Q&&(this.setState(e.COMPLETE),this.trigger(d.JWPLAYER_MEDIA_COMPLETE),Q=!1)},this.setContainer=function(a){F=a,a.appendChild(J),this.setVisibility(!0)},this.getContainer=function(){return F},this.remove=function(){D(),J&&F&&F===J.parentNode&&F.removeChild(J),M=N=I=null},this.setVisibility=function(a){a=!!a,a?(b.style(J,{display:"block"}),b.style(F,{visibility:"visible",opacity:1})):k||b.style(F,{opacity:0})},this.resize=function(){return!1},this.checkComplete=function(){return Q},this.getCurrentQuality=function(){if(!I)return-1;if(I.getAvailableQualityLevels){var a=I.getPlaybackQuality(),b=I.getAvailableQualityLevels();return b.indexOf(a)}return-1},this.getQualityLevels=function(){if(I){if(!c.isFunction(I.getAvailableQualityLevels))return[];var a=I.getAvailableQualityLevels();if(2===a.length&&c.contains(a,"auto"))return{label:c.without(a,"auto")};var b=c.map(a,function(a){return{label:a}});return b.reverse()}},this.setCurrentQuality=function(a){if(I&&I.getAvailableQualityLevels){var b=I.getAvailableQualityLevels();if(b.length){var c=b[b.length-a-1];I.setPlaybackQuality(c)}}},this.getName=function(){return{name:"youtube"}}}var j=new f(window.location.protocol+"//www.youtube.com/iframe_api"),k=a.isMobile();return i.getName=function(){return{name:"youtube"}},{register:function(a){a.api.registerProvider(i)}}}.apply(b,d),!(void 0!==e&&(a.exports=e))}});var jwplayer = jwplayer || {};
jwplayer.key = "1evm/Mmn4cHeWUbWymfNhduVYVm/nj/z44e+FU+1pzk=";var lastPlayedId;
function pausePlayers(playing) {
    if(lastPlayedId && lastPlayedId != playing)  {jwplayer(lastPlayedId).pause(true);}
    lastPlayedId = playing;
}

(function($) {

    var mediaWidget = {
        init: function(){
            // The player element is empty until initialized
            $('.avPlayer').filter(':empty').each(function () {
                // This may need to come from outside, the player should be on CDN
                var config = {flashplayer: '/templates/jsp/_style2/_marlin/jwplayer/jwplayer.flash.swf'};

                var $player = $(this);

                // What is all this tab-pane about? We show tabs as players get ready???
                // See bug#94186 / RT#53883
                // There used to be $player.parents(".tab-pane"); but then we always used only the first element - replaced with closest()
                if($player.closest(".tab-pane").parents(".tab-pane").length){
                    var $tab_pane = $player.parents(".tab-pane");
                }
                else {
                    var $tab_pane = $player.closest(".tab-pane");
                }
                //get player config
                var configForm = $("#mediaForm"+$player.attr('id'));

                $.extend(config, formToJson(configForm), {
                    events: {
                        onReady: function () {
                            setTimeout(function () {
                                $tab_pane.removeClass("jwVisible");
                            }, 500);
                        },
                        onPlay: function () {
                            pausePlayers(this.id);
                        }
                    }
                });

                if (!$player.is(":visible")) {
                    $tab_pane.addClass("jwVisible");
                }

                // Check if the height is set correctly
                if(!config.height) {
                    var ext = config.file.substr(config.file.lastIndexOf('.') + 1).toLowerCase();
                    if ($.inArray(ext, ['aac', 'm4a', 'f4a', 'mp3', 'ogg', 'oga']) != -1) {
                        config.height = 40;
                    }
                }
                jwplayer($player.attr('id')).setup(config);
            });
        }
    };

    $(window).load(mediaWidget.init);

    if (window.PB && window.PB.$) {
        window.PB.$(document.documentElement).on("ScopeModified ScopeLoaded WidgetReloaded", function() {mediaWidget.init()});
    }

})(jQuery);