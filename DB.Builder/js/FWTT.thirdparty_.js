(function(n,t){"use strict";function r(n){a[a.length]=n}function k(n){var t=new RegExp(" ?\\b"+n+"\\b");c.className=c.className.replace(t,"")}function p(n,t){for(var i=0,r=n.length;i<r;i++)t.call(n,n[i],i)}function tt(){var t,e,f,o;c.className=c.className.replace(/ (w-|eq-|gt-|gte-|lt-|lte-|portrait|no-portrait|landscape|no-landscape)\d+/g,"");t=n.innerWidth||c.clientWidth;e=n.outerWidth||n.screen.width;u.screen.innerWidth=t;u.screen.outerWidth=e;r("w-"+t);p(i.screens,function(n){t>n?(i.screensCss.gt&&r("gt-"+n),i.screensCss.gte&&r("gte-"+n)):t<n?(i.screensCss.lt&&r("lt-"+n),i.screensCss.lte&&r("lte-"+n)):t===n&&(i.screensCss.lte&&r("lte-"+n),i.screensCss.eq&&r("e-q"+n),i.screensCss.gte&&r("gte-"+n))});f=n.innerHeight||c.clientHeight;o=n.outerHeight||n.screen.height;u.screen.innerHeight=f;u.screen.outerHeight=o;u.feature("portrait",f>t);u.feature("landscape",f<t)}function it(){n.clearTimeout(b);b=n.setTimeout(tt,50)}var y=n.document,rt=n.navigator,ut=n.location,c=y.documentElement,a=[],i={screens:[240,320,480,640,768,800,1024,1280,1440,1680,1920],screensCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!1},browsers:[{ie:{min:6,max:11}}],browserCss:{gt:!0,gte:!1,lt:!0,lte:!1,eq:!0},html5:!0,page:"-page",section:"-section",head:"head"},v,u,s,w,o,h,l,d,f,g,nt,e,b;if(n.head_conf)for(v in n.head_conf)n.head_conf[v]!==t&&(i[v]=n.head_conf[v]);u=n[i.head]=function(){u.ready.apply(null,arguments)};u.feature=function(n,t,i){return n?(Object.prototype.toString.call(t)==="[object Function]"&&(t=t.call()),r((t?"":"no-")+n),u[n]=!!t,i||(k("no-"+n),k(n),u.feature()),u):(c.className+=" "+a.join(" "),a=[],u)};u.feature("js",!0);s=rt.userAgent.toLowerCase();w=/mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(s);u.feature("mobile",w,!0);u.feature("desktop",!w,!0);s=/(chrome|firefox)[ \/]([\w.]+)/.exec(s)||/(iphone|ipad|ipod)(?:.*version)?[ \/]([\w.]+)/.exec(s)||/(android)(?:.*version)?[ \/]([\w.]+)/.exec(s)||/(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(s)||/(msie) ([\w.]+)/.exec(s)||/(trident).+rv:(\w.)+/.exec(s)||[];o=s[1];h=parseFloat(s[2]);switch(o){case"msie":case"trident":o="ie";h=y.documentMode||h;break;case"firefox":o="ff";break;case"ipod":case"ipad":case"iphone":o="ios";break;case"webkit":o="safari"}for(u.browser={name:o,version:h},u.browser[o]=!0,l=0,d=i.browsers.length;l<d;l++)for(f in i.browsers[l])if(o===f)for(r(f),g=i.browsers[l][f].min,nt=i.browsers[l][f].max,e=g;e<=nt;e++)h>e?(i.browserCss.gt&&r("gt-"+f+e),i.browserCss.gte&&r("gte-"+f+e)):h<e?(i.browserCss.lt&&r("lt-"+f+e),i.browserCss.lte&&r("lte-"+f+e)):h===e&&(i.browserCss.lte&&r("lte-"+f+e),i.browserCss.eq&&r("eq-"+f+e),i.browserCss.gte&&r("gte-"+f+e));else r("no-"+f);r(o);r(o+parseInt(h,10));i.html5&&o==="ie"&&h<9&&p("abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|progress|section|summary|time|video".split("|"),function(n){y.createElement(n)});p(ut.pathname.split("/"),function(n,u){if(this.length>2&&this[u+1]!==t)u&&r(this.slice(u,u+1).join("-").toLowerCase()+i.section);else{var f=n||"index",e=f.indexOf(".");e>0&&(f=f.substring(0,e));c.id=f.toLowerCase()+i.page;u||r("root"+i.section)}});u.screen={height:n.screen.height,width:n.screen.width};tt();b=0;n.addEventListener?n.addEventListener("resize",it,!1):n.attachEvent("onresize",it)})(window);

(function(n,t){"use strict";function w(){}function u(n,t){if(n){typeof n=="object"&&(n=[].slice.call(n));for(var i=0,r=n.length;i<r;i++)t.call(n,n[i],i)}}function it(n,i){var r=Object.prototype.toString.call(i).slice(8,-1);return i!==t&&i!==null&&r===n}function s(n){return it("Function",n)}function a(n){return it("Array",n)}function et(n){var i=n.split("/"),t=i[i.length-1],r=t.indexOf("?");return r!==-1?t.substring(0,r):t}function f(n){(n=n||w,n._done)||(n(),n._done=1)}function ot(n,t,r,u){var f=typeof n=="object"?n:{test:n,success:!t?!1:a(t)?t:[t],failure:!r?!1:a(r)?r:[r],callback:u||w},e=!!f.test;return e&&!!f.success?(f.success.push(f.callback),i.load.apply(null,f.success)):e||!f.failure?u():(f.failure.push(f.callback),i.load.apply(null,f.failure)),i}function v(n){var t={},i,r;if(typeof n=="object")for(i in n)!n[i]||(t={name:i,url:n[i]});else t={name:et(n),url:n};return(r=c[t.name],r&&r.url===t.url)?r:(c[t.name]=t,t)}function y(n){n=n||c;for(var t in n)if(n.hasOwnProperty(t)&&n[t].state!==l)return!1;return!0}function st(n){n.state=ft;u(n.onpreload,function(n){n.call()})}function ht(n){n.state===t&&(n.state=nt,n.onpreload=[],rt({url:n.url,type:"cache"},function(){st(n)}))}function ct(){var n=arguments,t=n[n.length-1],r=[].slice.call(n,1),f=r[0];return(s(t)||(t=null),a(n[0]))?(n[0].push(t),i.load.apply(null,n[0]),i):(f?(u(r,function(n){s(n)||!n||ht(v(n))}),b(v(n[0]),s(f)?f:function(){i.load.apply(null,r)})):b(v(n[0])),i)}function lt(){var n=arguments,t=n[n.length-1],r={};return(s(t)||(t=null),a(n[0]))?(n[0].push(t),i.load.apply(null,n[0]),i):(u(n,function(n){n!==t&&(n=v(n),r[n.name]=n)}),u(n,function(n){n!==t&&(n=v(n),b(n,function(){y(r)&&f(t)}))}),i)}function b(n,t){if(t=t||w,n.state===l){t();return}if(n.state===tt){i.ready(n.name,t);return}if(n.state===nt){n.onpreload.push(function(){b(n,t)});return}n.state=tt;rt(n,function(){n.state=l;t();u(h[n.name],function(n){f(n)});o&&y()&&u(h.ALL,function(n){f(n)})})}function at(n){n=n||"";var t=n.split("?")[0].split(".");return t[t.length-1].toLowerCase()}function rt(t,i){function e(t){t=t||n.event;u.onload=u.onreadystatechange=u.onerror=null;i()}function o(f){f=f||n.event;(f.type==="load"||/loaded|complete/.test(u.readyState)&&(!r.documentMode||r.documentMode<9))&&(n.clearTimeout(t.errorTimeout),n.clearTimeout(t.cssTimeout),u.onload=u.onreadystatechange=u.onerror=null,i())}function s(){if(t.state!==l&&t.cssRetries<=20){for(var i=0,f=r.styleSheets.length;i<f;i++)if(r.styleSheets[i].href===u.href){o({type:"load"});return}t.cssRetries++;t.cssTimeout=n.setTimeout(s,250)}}var u,h,f;i=i||w;h=at(t.url);h==="css"?(u=r.createElement("link"),u.type="text/"+(t.type||"css"),u.rel="stylesheet",u.href=t.url,t.cssRetries=0,t.cssTimeout=n.setTimeout(s,500)):(u=r.createElement("script"),u.type="text/"+(t.type||"javascript"),u.src=t.url);u.onload=u.onreadystatechange=o;u.onerror=e;u.async=!1;u.defer=!1;t.errorTimeout=n.setTimeout(function(){e({type:"timeout"})},7e3);f=r.head||r.getElementsByTagName("head")[0];f.insertBefore(u,f.lastChild)}function vt(){for(var t,u=r.getElementsByTagName("script"),n=0,f=u.length;n<f;n++)if(t=u[n].getAttribute("data-headjs-load"),!!t){i.load(t);return}}function yt(n,t){var v,p,e;return n===r?(o?f(t):d.push(t),i):(s(n)&&(t=n,n="ALL"),a(n))?(v={},u(n,function(n){v[n]=c[n];i.ready(n,function(){y(v)&&f(t)})}),i):typeof n!="string"||!s(t)?i:(p=c[n],p&&p.state===l||n==="ALL"&&y()&&o)?(f(t),i):(e=h[n],e?e.push(t):e=h[n]=[t],i)}function e(){if(!r.body){n.clearTimeout(i.readyTimeout);i.readyTimeout=n.setTimeout(e,50);return}o||(o=!0,vt(),u(d,function(n){f(n)}))}function k(){r.addEventListener?(r.removeEventListener("DOMContentLoaded",k,!1),e()):r.readyState==="complete"&&(r.detachEvent("onreadystatechange",k),e())}var r=n.document,d=[],h={},c={},ut="async"in r.createElement("script")||"MozAppearance"in r.documentElement.style||n.opera,o,g=n.head_conf&&n.head_conf.head||"head",i=n[g]=n[g]||function(){i.ready.apply(null,arguments)},nt=1,ft=2,tt=3,l=4,p;if(r.readyState==="complete")e();else if(r.addEventListener)r.addEventListener("DOMContentLoaded",k,!1),n.addEventListener("load",e,!1);else{r.attachEvent("onreadystatechange",k);n.attachEvent("onload",e);p=!1;try{p=!n.frameElement&&r.documentElement}catch(wt){}p&&p.doScroll&&function pt(){if(!o){try{p.doScroll("left")}catch(t){n.clearTimeout(i.readyTimeout);i.readyTimeout=n.setTimeout(pt,50);return}e()}}()}i.load=i.js=ut?lt:ct;i.test=ot;i.ready=yt;i.ready(r,function(){y()&&u(h.ALL,function(n){f(n)});i.feature&&i.feature("domloaded",!0)})})(window);

(function(e,undefined){var t,n,r=typeof undefined,i=e.location,o=e.document,s=o.documentElement,a=e.jQuery,u=e.$,l={},c=[],p="2.0.3",f=c.concat,h=c.push,d=c.slice,g=c.indexOf,m=l.toString,y=l.hasOwnProperty,v=p.trim,x=function(e,n){return new x.fn.init(e,n,t)},b=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,w=/\S+/g,T=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,k=/^-ms-/,N=/-([\da-z])/gi,E=function(e,t){return t.toUpperCase()},S=function(){o.removeEventListener("DOMContentLoaded",S,!1),e.removeEventListener("load",S,!1),x.ready()};x.fn=x.prototype={jquery:p,constructor:x,init:function(e,t,n){var r,i;if(!e)return this;if("string"==typeof e){if(r="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:T.exec(e),!r||!r[1]&&t)return!t||t.jquery?(t||n).find(e):this.constructor(t).find(e);if(r[1]){if(t=t instanceof x?t[0]:t,x.merge(this,x.parseHTML(r[1],t&&t.nodeType?t.ownerDocument||t:o,!0)),C.test(r[1])&&x.isPlainObject(t))for(r in t)x.isFunction(this[r])?this[r](t[r]):this.attr(r,t[r]);return this}return i=o.getElementById(r[2]),i&&i.parentNode&&(this.length=1,this[0]=i),this.context=o,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?n.ready(e):(e.selector!==undefined&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return d.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,t,n,r,i,o,s=arguments[0]||{},a=1,u=arguments.length,l=!1;for("boolean"==typeof s&&(l=s,s=arguments[1]||{},a=2),"object"==typeof s||x.isFunction(s)||(s={}),u===a&&(s=this,--a);u>a;a++)if(null!=(e=arguments[a]))for(t in e)n=s[t],r=e[t],s!==r&&(l&&r&&(x.isPlainObject(r)||(i=x.isArray(r)))?(i?(i=!1,o=n&&x.isArray(n)?n:[]):o=n&&x.isPlainObject(n)?n:{},s[t]=x.extend(l,o,r)):r!==undefined&&(s[t]=r));return s},x.extend({expando:"jQuery"+(p+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=a),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){(e===!0?--x.readyWait:x.isReady)||(x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(o,[x]),x.fn.trigger&&x(o).trigger("ready").off("ready")))},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray,isWindow:function(e){return null!=e&&e===e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?l[m.call(e)]||"object":typeof e},isPlainObject:function(e){if("object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!y.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(t){return!1}return!0},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||o;var r=C.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:JSON.parse,parseXML:function(e){var t,n;if(!e||"string"!=typeof e)return null;try{n=new DOMParser,t=n.parseFromString(e,"text/xml")}catch(r){t=undefined}return(!t||t.getElementsByTagName("parsererror").length)&&x.error("Invalid XML: "+e),t},noop:function(){},globalEval:function(e){var t,n=eval;e=x.trim(e),e&&(1===e.indexOf("use strict")?(t=o.createElement("script"),t.text=e,o.head.appendChild(t).parentNode.removeChild(t)):n(e))},camelCase:function(e){return e.replace(k,"ms-").replace(N,E)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,s=j(e);if(n){if(s){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(s){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:function(e){return null==e?"":v.call(e)},makeArray:function(e,t){var n=t||[];return null!=e&&(j(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){return null==t?-1:g.call(t,e,n)},merge:function(e,t){var n=t.length,r=e.length,i=0;if("number"==typeof n)for(;n>i;i++)e[r++]=t[i];else while(t[i]!==undefined)e[r++]=t[i++];return e.length=r,e},grep:function(e,t,n){var r,i=[],o=0,s=e.length;for(n=!!n;s>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,s=j(e),a=[];if(s)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(a[a.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(a[a.length]=r);return f.apply([],a)},guid:1,proxy:function(e,t){var n,r,i;return"string"==typeof t&&(n=e[t],t=e,e=n),x.isFunction(e)?(r=d.call(arguments,2),i=function(){return e.apply(t||this,r.concat(d.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):undefined},access:function(e,t,n,r,i,o,s){var a=0,u=e.length,l=null==n;if("object"===x.type(n)){i=!0;for(a in n)x.access(e,t,a,n[a],!0,o,s)}else if(r!==undefined&&(i=!0,x.isFunction(r)||(s=!0),l&&(s?(t.call(e,r),t=null):(l=t,t=function(e,t,n){return l.call(x(e),n)})),t))for(;u>a;a++)t(e[a],n,s?r:r.call(e[a],a,t(e[a],n)));return i?e:l?t.call(e):u?t(e[0],n):o},now:Date.now,swap:function(e,t,n,r){var i,o,s={};for(o in t)s[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=s[o];return i}}),x.ready.promise=function(t){return n||(n=x.Deferred(),"complete"===o.readyState?setTimeout(x.ready):(o.addEventListener("DOMContentLoaded",S,!1),e.addEventListener("load",S,!1))),n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){l["[object "+t+"]"]=t.toLowerCase()});function j(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}t=x(o),function(e,undefined){var t,n,r,i,o,s,a,u,l,c,p,f,h,d,g,m,y,v="sizzle"+-new Date,b=e.document,w=0,T=0,C=st(),k=st(),N=st(),E=!1,S=function(e,t){return e===t?(E=!0,0):0},j=typeof undefined,D=1<<31,A={}.hasOwnProperty,L=[],q=L.pop,H=L.push,O=L.push,F=L.slice,P=L.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},R="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",W="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",$=W.replace("w","w#"),B="\\["+M+"*("+W+")"+M+"*(?:([*^$|!~]?=)"+M+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+$+")|)|)"+M+"*\\]",I=":("+W+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+B.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),_=RegExp("^"+M+"*,"+M+"*"),X=RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),U=RegExp(M+"*[+~]"),Y=RegExp("="+M+"*([^\\]'\"]*)"+M+"*\\]","g"),V=RegExp(I),G=RegExp("^"+$+"$"),J={ID:RegExp("^#("+W+")"),CLASS:RegExp("^\\.("+W+")"),TAG:RegExp("^("+W.replace("w","w*")+")"),ATTR:RegExp("^"+B),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:RegExp("^(?:"+R+")$","i"),needsContext:RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},Q=/^[^{]+\{\s*\[native \w/,K=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,Z=/^(?:input|select|textarea|button)$/i,et=/^h\d$/i,tt=/'|\\/g,nt=RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),rt=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{O.apply(L=F.call(b.childNodes),b.childNodes),L[b.childNodes.length].nodeType}catch(it){O={apply:L.length?function(e,t){H.apply(e,F.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function ot(e,t,r,i){var o,s,a,u,l,f,g,m,x,w;if((t?t.ownerDocument||t:b)!==p&&c(t),t=t||p,r=r||[],!e||"string"!=typeof e)return r;if(1!==(u=t.nodeType)&&9!==u)return[];if(h&&!i){if(o=K.exec(e))if(a=o[1]){if(9===u){if(s=t.getElementById(a),!s||!s.parentNode)return r;if(s.id===a)return r.push(s),r}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(a))&&y(t,s)&&s.id===a)return r.push(s),r}else{if(o[2])return O.apply(r,t.getElementsByTagName(e)),r;if((a=o[3])&&n.getElementsByClassName&&t.getElementsByClassName)return O.apply(r,t.getElementsByClassName(a)),r}if(n.qsa&&(!d||!d.test(e))){if(m=g=v,x=t,w=9===u&&e,1===u&&"object"!==t.nodeName.toLowerCase()){f=gt(e),(g=t.getAttribute("id"))?m=g.replace(tt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",l=f.length;while(l--)f[l]=m+mt(f[l]);x=U.test(e)&&t.parentNode||t,w=f.join(",")}if(w)try{return O.apply(r,x.querySelectorAll(w)),r}catch(T){}finally{g||t.removeAttribute("id")}}}return kt(e.replace(z,"$1"),t,r,i)}function st(){var e=[];function t(n,r){return e.push(n+=" ")>i.cacheLength&&delete t[e.shift()],t[n]=r}return t}function at(e){return e[v]=!0,e}function ut(e){var t=p.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function lt(e,t){var n=e.split("|"),r=e.length;while(r--)i.attrHandle[n[r]]=t}function ct(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function pt(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return at(function(t){return t=+t,at(function(n,r){var i,o=e([],n.length,t),s=o.length;while(s--)n[i=o[s]]&&(n[i]=!(r[i]=n[i]))})})}s=ot.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},n=ot.support={},c=ot.setDocument=function(e){var t=e?e.ownerDocument||e:b,r=t.defaultView;return t!==p&&9===t.nodeType&&t.documentElement?(p=t,f=t.documentElement,h=!s(t),r&&r.attachEvent&&r!==r.top&&r.attachEvent("onbeforeunload",function(){c()}),n.attributes=ut(function(e){return e.className="i",!e.getAttribute("className")}),n.getElementsByTagName=ut(function(e){return e.appendChild(t.createComment("")),!e.getElementsByTagName("*").length}),n.getElementsByClassName=ut(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),n.getById=ut(function(e){return f.appendChild(e).id=v,!t.getElementsByName||!t.getElementsByName(v).length}),n.getById?(i.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){return e.getAttribute("id")===t}}):(delete i.find.ID,i.filter.ID=function(e){var t=e.replace(nt,rt);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),i.find.TAG=n.getElementsByTagName?function(e,t){return typeof t.getElementsByTagName!==j?t.getElementsByTagName(e):undefined}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},i.find.CLASS=n.getElementsByClassName&&function(e,t){return typeof t.getElementsByClassName!==j&&h?t.getElementsByClassName(e):undefined},g=[],d=[],(n.qsa=Q.test(t.querySelectorAll))&&(ut(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||d.push("\\["+M+"*(?:value|"+R+")"),e.querySelectorAll(":checked").length||d.push(":checked")}),ut(function(e){var n=t.createElement("input");n.setAttribute("type","hidden"),e.appendChild(n).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&d.push("[*^$]="+M+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||d.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),d.push(",.*:")})),(n.matchesSelector=Q.test(m=f.webkitMatchesSelector||f.mozMatchesSelector||f.oMatchesSelector||f.msMatchesSelector))&&ut(function(e){n.disconnectedMatch=m.call(e,"div"),m.call(e,"[s!='']:x"),g.push("!=",I)}),d=d.length&&RegExp(d.join("|")),g=g.length&&RegExp(g.join("|")),y=Q.test(f.contains)||f.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},S=f.compareDocumentPosition?function(e,r){if(e===r)return E=!0,0;var i=r.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(r);return i?1&i||!n.sortDetached&&r.compareDocumentPosition(e)===i?e===t||y(b,e)?-1:r===t||y(b,r)?1:l?P.call(l,e)-P.call(l,r):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,n){var r,i=0,o=e.parentNode,s=n.parentNode,a=[e],u=[n];if(e===n)return E=!0,0;if(!o||!s)return e===t?-1:n===t?1:o?-1:s?1:l?P.call(l,e)-P.call(l,n):0;if(o===s)return ct(e,n);r=e;while(r=r.parentNode)a.unshift(r);r=n;while(r=r.parentNode)u.unshift(r);while(a[i]===u[i])i++;return i?ct(a[i],u[i]):a[i]===b?-1:u[i]===b?1:0},t):p},ot.matches=function(e,t){return ot(e,null,null,t)},ot.matchesSelector=function(e,t){if((e.ownerDocument||e)!==p&&c(e),t=t.replace(Y,"='$1']"),!(!n.matchesSelector||!h||g&&g.test(t)||d&&d.test(t)))try{var r=m.call(e,t);if(r||n.disconnectedMatch||e.document&&11!==e.document.nodeType)return r}catch(i){}return ot(t,p,null,[e]).length>0},ot.contains=function(e,t){return(e.ownerDocument||e)!==p&&c(e),y(e,t)},ot.attr=function(e,t){(e.ownerDocument||e)!==p&&c(e);var r=i.attrHandle[t.toLowerCase()],o=r&&A.call(i.attrHandle,t.toLowerCase())?r(e,t,!h):undefined;return o===undefined?n.attributes||!h?e.getAttribute(t):(o=e.getAttributeNode(t))&&o.specified?o.value:null:o},ot.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},ot.uniqueSort=function(e){var t,r=[],i=0,o=0;if(E=!n.detectDuplicates,l=!n.sortStable&&e.slice(0),e.sort(S),E){while(t=e[o++])t===e[o]&&(i=r.push(o));while(i--)e.splice(r[i],1)}return e},o=ot.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=o(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=o(t);return n},i=ot.selectors={cacheLength:50,createPseudo:at,match:J,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(nt,rt),e[3]=(e[4]||e[5]||"").replace(nt,rt),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||ot.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&ot.error(e[0]),e},PSEUDO:function(e){var t,n=!e[5]&&e[2];return J.CHILD.test(e[0])?null:(e[3]&&e[4]!==undefined?e[2]=e[4]:n&&V.test(n)&&(t=gt(n,!0))&&(t=n.indexOf(")",n.length-t)-n.length)&&(e[0]=e[0].slice(0,t),e[2]=n.slice(0,t)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(nt,rt).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=C[e+" "];return t||(t=RegExp("(^|"+M+")"+e+"("+M+"|$)"))&&C(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=ot.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),s="last"!==e.slice(-4),a="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,u){var l,c,p,f,h,d,g=o!==s?"nextSibling":"previousSibling",m=t.parentNode,y=a&&t.nodeName.toLowerCase(),x=!u&&!a;if(m){if(o){while(g){p=t;while(p=p[g])if(a?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;d=g="only"===e&&!d&&"nextSibling"}return!0}if(d=[s?m.firstChild:m.lastChild],s&&x){c=m[v]||(m[v]={}),l=c[e]||[],h=l[0]===w&&l[1],f=l[0]===w&&l[2],p=h&&m.childNodes[h];while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[w,h,f];break}}else if(x&&(l=(t[v]||(t[v]={}))[e])&&l[0]===w)f=l[1];else while(p=++h&&p&&p[g]||(f=h=0)||d.pop())if((a?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(x&&((p[v]||(p[v]={}))[e]=[w,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=i.pseudos[e]||i.setFilters[e.toLowerCase()]||ot.error("unsupported pseudo: "+e);return r[v]?r(t):r.length>1?(n=[e,e,"",t],i.setFilters.hasOwnProperty(e.toLowerCase())?at(function(e,n){var i,o=r(e,t),s=o.length;while(s--)i=P.call(e,o[s]),e[i]=!(n[i]=o[s])}):function(e){return r(e,0,n)}):r}},pseudos:{not:at(function(e){var t=[],n=[],r=a(e.replace(z,"$1"));return r[v]?at(function(e,t,n,i){var o,s=r(e,null,i,[]),a=e.length;while(a--)(o=s[a])&&(e[a]=!(t[a]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:at(function(e){return function(t){return ot(e,t).length>0}}),contains:at(function(e){return function(t){return(t.textContent||t.innerText||o(t)).indexOf(e)>-1}}),lang:at(function(e){return G.test(e||"")||ot.error("unsupported lang: "+e),e=e.replace(nt,rt).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===f},focus:function(e){return e===p.activeElement&&(!p.hasFocus||p.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!i.pseudos.empty(e)},header:function(e){return et.test(e.nodeName)},input:function(e){return Z.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[0>n?n+t:n]}),even:ht(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:ht(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},i.pseudos.nth=i.pseudos.eq;for(t in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})i.pseudos[t]=pt(t);for(t in{submit:!0,reset:!0})i.pseudos[t]=ft(t);function dt(){}dt.prototype=i.filters=i.pseudos,i.setFilters=new dt;function gt(e,t){var n,r,o,s,a,u,l,c=k[e+" "];if(c)return t?0:c.slice(0);a=e,u=[],l=i.preFilter;while(a){(!n||(r=_.exec(a)))&&(r&&(a=a.slice(r[0].length)||a),u.push(o=[])),n=!1,(r=X.exec(a))&&(n=r.shift(),o.push({value:n,type:r[0].replace(z," ")}),a=a.slice(n.length));for(s in i.filter)!(r=J[s].exec(a))||l[s]&&!(r=l[s](r))||(n=r.shift(),o.push({value:n,type:s,matches:r}),a=a.slice(n.length));if(!n)break}return t?a.length:a?ot.error(e):k(e,u).slice(0)}function mt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function yt(e,t,n){var i=t.dir,o=n&&"parentNode"===i,s=T++;return t.first?function(t,n,r){while(t=t[i])if(1===t.nodeType||o)return e(t,n,r)}:function(t,n,a){var u,l,c,p=w+" "+s;if(a){while(t=t[i])if((1===t.nodeType||o)&&e(t,n,a))return!0}else while(t=t[i])if(1===t.nodeType||o)if(c=t[v]||(t[v]={}),(l=c[i])&&l[0]===p){if((u=l[1])===!0||u===r)return u===!0}else if(l=c[i]=[p],l[1]=e(t,n,a)||r,l[1]===!0)return!0}}function vt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,s=[],a=0,u=e.length,l=null!=t;for(;u>a;a++)(o=e[a])&&(!n||n(o,r,i))&&(s.push(o),l&&t.push(a));return s}function bt(e,t,n,r,i,o){return r&&!r[v]&&(r=bt(r)),i&&!i[v]&&(i=bt(i,o)),at(function(o,s,a,u){var l,c,p,f=[],h=[],d=s.length,g=o||Ct(t||"*",a.nodeType?[a]:a,[]),m=!e||!o&&t?g:xt(g,f,e,a,u),y=n?i||(o?e:d||r)?[]:s:m;if(n&&n(m,y,a,u),r){l=xt(y,h),r(l,[],a,u),c=l.length;while(c--)(p=l[c])&&(y[h[c]]=!(m[h[c]]=p))}if(o){if(i||e){if(i){l=[],c=y.length;while(c--)(p=y[c])&&l.push(m[c]=p);i(null,y=[],l,u)}c=y.length;while(c--)(p=y[c])&&(l=i?P.call(o,p):f[c])>-1&&(o[l]=!(s[l]=p))}}else y=xt(y===s?y.splice(d,y.length):y),i?i(null,s,y,u):O.apply(s,y)})}function wt(e){var t,n,r,o=e.length,s=i.relative[e[0].type],a=s||i.relative[" "],l=s?1:0,c=yt(function(e){return e===t},a,!0),p=yt(function(e){return P.call(t,e)>-1},a,!0),f=[function(e,n,r){return!s&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;o>l;l++)if(n=i.relative[e[l].type])f=[yt(vt(f),n)];else{if(n=i.filter[e[l].type].apply(null,e[l].matches),n[v]){for(r=++l;o>r;r++)if(i.relative[e[r].type])break;return bt(l>1&&vt(f),l>1&&mt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&wt(e.slice(l,r)),o>r&&wt(e=e.slice(r)),o>r&&mt(e))}f.push(n)}return vt(f)}function Tt(e,t){var n=0,o=t.length>0,s=e.length>0,a=function(a,l,c,f,h){var d,g,m,y=[],v=0,x="0",b=a&&[],T=null!=h,C=u,k=a||s&&i.find.TAG("*",h&&l.parentNode||l),N=w+=null==C?1:Math.random()||.1;for(T&&(u=l!==p&&l,r=n);null!=(d=k[x]);x++){if(s&&d){g=0;while(m=e[g++])if(m(d,l,c)){f.push(d);break}T&&(w=N,r=++n)}o&&((d=!m&&d)&&v--,a&&b.push(d))}if(v+=x,o&&x!==v){g=0;while(m=t[g++])m(b,y,l,c);if(a){if(v>0)while(x--)b[x]||y[x]||(y[x]=q.call(f));y=xt(y)}O.apply(f,y),T&&!a&&y.length>0&&v+t.length>1&&ot.uniqueSort(f)}return T&&(w=N,u=C),b};return o?at(a):a}a=ot.compile=function(e,t){var n,r=[],i=[],o=N[e+" "];if(!o){t||(t=gt(e)),n=t.length;while(n--)o=wt(t[n]),o[v]?r.push(o):i.push(o);o=N(e,Tt(i,r))}return o};function Ct(e,t,n){var r=0,i=t.length;for(;i>r;r++)ot(e,t[r],n);return n}function kt(e,t,r,o){var s,u,l,c,p,f=gt(e);if(!o&&1===f.length){if(u=f[0]=f[0].slice(0),u.length>2&&"ID"===(l=u[0]).type&&n.getById&&9===t.nodeType&&h&&i.relative[u[1].type]){if(t=(i.find.ID(l.matches[0].replace(nt,rt),t)||[])[0],!t)return r;e=e.slice(u.shift().value.length)}s=J.needsContext.test(e)?0:u.length;while(s--){if(l=u[s],i.relative[c=l.type])break;if((p=i.find[c])&&(o=p(l.matches[0].replace(nt,rt),U.test(u[0].type)&&t.parentNode||t))){if(u.splice(s,1),e=o.length&&mt(u),!e)return O.apply(r,o),r;break}}}return a(e,f)(o,t,!h,r,U.test(e)),r}n.sortStable=v.split("").sort(S).join("")===v,n.detectDuplicates=E,c(),n.sortDetached=ut(function(e){return 1&e.compareDocumentPosition(p.createElement("div"))}),ut(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||lt("type|href|height|width",function(e,t,n){return n?undefined:e.getAttribute(t,"type"===t.toLowerCase()?1:2)}),n.attributes&&ut(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||lt("value",function(e,t,n){return n||"input"!==e.nodeName.toLowerCase()?undefined:e.defaultValue}),ut(function(e){return null==e.getAttribute("disabled")})||lt(R,function(e,t,n){var r;return n?undefined:(r=e.getAttributeNode(t))&&r.specified?r.value:e[t]===!0?t.toLowerCase():null}),x.find=ot,x.expr=ot.selectors,x.expr[":"]=x.expr.pseudos,x.unique=ot.uniqueSort,x.text=ot.getText,x.isXMLDoc=ot.isXML,x.contains=ot.contains}(e);var D={};function A(e){var t=D[e]={};return x.each(e.match(w)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?D[e]||A(e):x.extend({},e);var t,n,r,i,o,s,a=[],u=!e.once&&[],l=function(p){for(t=e.memory&&p,n=!0,s=i||0,i=0,o=a.length,r=!0;a&&o>s;s++)if(a[s].apply(p[0],p[1])===!1&&e.stopOnFalse){t=!1;break}r=!1,a&&(u?u.length&&l(u.shift()):t?a=[]:c.disable())},c={add:function(){if(a){var n=a.length;(function s(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&c.has(n)||a.push(n):n&&n.length&&"string"!==r&&s(n)})})(arguments),r?o=a.length:t&&(i=n,l(t))}return this},remove:function(){return a&&x.each(arguments,function(e,t){var n;while((n=x.inArray(t,a,n))>-1)a.splice(n,1),r&&(o>=n&&o--,s>=n&&s--)}),this},has:function(e){return e?x.inArray(e,a)>-1:!(!a||!a.length)},empty:function(){return a=[],o=0,this},disable:function(){return a=u=t=undefined,this},disabled:function(){return!a},lock:function(){return u=undefined,t||c.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!a||n&&!u||(t=t||[],t=[e,t.slice?t.slice():t],r?u.push(t):l(t)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!n}};return c},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var s=o[0],a=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=a&&a.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[s+"With"](this===r?n.promise():this,a?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var s=o[2],a=o[3];r[o[1]]=s.add,a&&s.add(function(){n=a},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=s.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=d.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),s=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?d.call(arguments):r,n===a?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},a,u,l;if(r>1)for(a=Array(r),u=Array(r),l=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(s(t,l,n)).fail(o.reject).progress(s(t,u,a)):--i;return i||o.resolveWith(l,n),o.promise()}}),x.support=function(t){var n=o.createElement("input"),r=o.createDocumentFragment(),i=o.createElement("div"),s=o.createElement("select"),a=s.appendChild(o.createElement("option"));return n.type?(n.type="checkbox",t.checkOn=""!==n.value,t.optSelected=a.selected,t.reliableMarginRight=!0,t.boxSizingReliable=!0,t.pixelPosition=!1,n.checked=!0,t.noCloneChecked=n.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!a.disabled,n=o.createElement("input"),n.value="t",n.type="radio",t.radioValue="t"===n.value,n.setAttribute("checked","t"),n.setAttribute("name","t"),r.appendChild(n),t.checkClone=r.cloneNode(!0).cloneNode(!0).lastChild.checked,t.focusinBubbles="onfocusin"in e,i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===i.style.backgroundClip,x(function(){var n,r,s="padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box",a=o.getElementsByTagName("body")[0];a&&(n=o.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",a.appendChild(n).appendChild(i),i.innerHTML="",i.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%",x.swap(a,null!=a.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===i.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(i,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(i,null)||{width:"4px"}).width,r=i.appendChild(o.createElement("div")),r.style.cssText=i.style.cssText=s,r.style.marginRight=r.style.width="0",i.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),a.removeChild(n))}),t):t}({});var L,q,H=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,O=/([A-Z])/g;function F(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=x.expando+Math.random()}F.uid=1,F.accepts=function(e){return e.nodeType?1===e.nodeType||9===e.nodeType:!0},F.prototype={key:function(e){if(!F.accepts(e))return 0;var t={},n=e[this.expando];if(!n){n=F.uid++;try{t[this.expando]={value:n},Object.defineProperties(e,t)}catch(r){t[this.expando]=n,x.extend(e,t)}}return this.cache[n]||(this.cache[n]={}),n},set:function(e,t,n){var r,i=this.key(e),o=this.cache[i];if("string"==typeof t)o[t]=n;else if(x.isEmptyObject(o))x.extend(this.cache[i],t);else for(r in t)o[r]=t[r];return o},get:function(e,t){var n=this.cache[this.key(e)];return t===undefined?n:n[t]},access:function(e,t,n){var r;return t===undefined||t&&"string"==typeof t&&n===undefined?(r=this.get(e,t),r!==undefined?r:this.get(e,x.camelCase(t))):(this.set(e,t,n),n!==undefined?n:t)},remove:function(e,t){var n,r,i,o=this.key(e),s=this.cache[o];if(t===undefined)this.cache[o]={};else{x.isArray(t)?r=t.concat(t.map(x.camelCase)):(i=x.camelCase(t),t in s?r=[t,i]:(r=i,r=r in s?[r]:r.match(w)||[])),n=r.length;while(n--)delete s[r[n]]}},hasData:function(e){return!x.isEmptyObject(this.cache[e[this.expando]]||{})},discard:function(e){e[this.expando]&&delete this.cache[e[this.expando]]}},L=new F,q=new F,x.extend({acceptData:F.accepts,hasData:function(e){return L.hasData(e)||q.hasData(e)},data:function(e,t,n){return L.access(e,t,n)},removeData:function(e,t){L.remove(e,t)},_data:function(e,t,n){return q.access(e,t,n)},_removeData:function(e,t){q.remove(e,t)}}),x.fn.extend({data:function(e,t){var n,r,i=this[0],o=0,s=null;if(e===undefined){if(this.length&&(s=L.get(i),1===i.nodeType&&!q.get(i,"hasDataAttrs"))){for(n=i.attributes;n.length>o;o++)r=n[o].name,0===r.indexOf("data-")&&(r=x.camelCase(r.slice(5)),P(i,r,s[r]));q.set(i,"hasDataAttrs",!0)}return s}return"object"==typeof e?this.each(function(){L.set(this,e)}):x.access(this,function(t){var n,r=x.camelCase(e);if(i&&t===undefined){if(n=L.get(i,e),n!==undefined)return n;if(n=L.get(i,r),n!==undefined)return n;if(n=P(i,r,undefined),n!==undefined)return n}else this.each(function(){var n=L.get(this,r);L.set(this,r,t),-1!==e.indexOf("-")&&n!==undefined&&L.set(this,e,t)})},null,t,arguments.length>1,null,!0)},removeData:function(e){return this.each(function(){L.remove(this,e)})}});function P(e,t,n){var r;if(n===undefined&&1===e.nodeType)if(r="data-"+t.replace(O,"-$1").toLowerCase(),n=e.getAttribute(r),"string"==typeof n){try{n="true"===n?!0:"false"===n?!1:"null"===n?null:+n+""===n?+n:H.test(n)?JSON.parse(n):n}catch(i){}L.set(e,t,n)}else n=undefined;return n}x.extend({queue:function(e,t,n){var r;return e?(t=(t||"fx")+"queue",r=q.get(e,t),n&&(!r||x.isArray(n)?r=q.access(e,t,x.makeArray(n)):r.push(n)),r||[]):undefined},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),s=function(){x.dequeue(e,t)
};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,s,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return q.get(e,n)||q.access(e,n,{empty:x.Callbacks("once memory").add(function(){q.remove(e,[t+"queue",n])})})}}),x.fn.extend({queue:function(e,t){var n=2;return"string"!=typeof e&&(t=e,e="fx",n--),n>arguments.length?x.queue(this[0],e):t===undefined?this:this.each(function(){var n=x.queue(this,e,t);x._queueHooks(this,e),"fx"===e&&"inprogress"!==n[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,t){var n,r=1,i=x.Deferred(),o=this,s=this.length,a=function(){--r||i.resolveWith(o,[o])};"string"!=typeof e&&(t=e,e=undefined),e=e||"fx";while(s--)n=q.get(o[s],e+"queueHooks"),n&&n.empty&&(r++,n.empty.add(a));return a(),i.promise(t)}});var R,M,W=/[\t\r\n\f]/g,$=/\r/g,B=/^(?:input|select|textarea|button)$/i;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return this.each(function(){delete this[x.propFix[e]||e]})},addClass:function(e){var t,n,r,i,o,s=0,a=this.length,u="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,s=0,a=this.length,u=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(u)for(t=(e||"").match(w)||[];a>s;s++)if(n=this[s],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(W," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,i=0,o=x(this),s=e.match(w)||[];while(t=s[i++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else(n===r||"boolean"===n)&&(this.className&&q.set(this,"__className__",this.className),this.className=this.className||e===!1?"":q.get(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(W," ").indexOf(t)>=0)return!0;return!1},val:function(e){var t,n,r,i=this[0];{if(arguments.length)return r=x.isFunction(e),this.each(function(n){var i;1===this.nodeType&&(i=r?e.call(this,n,x(this).val()):e,null==i?i="":"number"==typeof i?i+="":x.isArray(i)&&(i=x.map(i,function(e){return null==e?"":e+""})),t=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],t&&"set"in t&&t.set(this,i,"value")!==undefined||(this.value=i))});if(i)return t=x.valHooks[i.type]||x.valHooks[i.nodeName.toLowerCase()],t&&"get"in t&&(n=t.get(i,"value"))!==undefined?n:(n=i.value,"string"==typeof n?n.replace($,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=e.attributes.value;return!t||t.specified?e.value:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,s=o?null:[],a=o?i+1:r.length,u=0>i?a:o?i:0;for(;a>u;u++)if(n=r[u],!(!n.selected&&u!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;s.push(t)}return s},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),s=i.length;while(s--)r=i[s],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,t,n){var i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===r?x.prop(e,t,n):(1===s&&x.isXMLDoc(e)||(t=t.toLowerCase(),i=x.attrHooks[t]||(x.expr.match.bool.test(t)?M:R)),n===undefined?i&&"get"in i&&null!==(o=i.get(e,t))?o:(o=x.find.attr(e,t),null==o?undefined:o):null!==n?i&&"set"in i&&(o=i.set(e,n,t))!==undefined?o:(e.setAttribute(t,n+""),n):(x.removeAttr(e,t),undefined))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(w);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)&&(e[r]=!1),e.removeAttribute(n)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,t,n){var r,i,o,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return o=1!==s||!x.isXMLDoc(e),o&&(t=x.propFix[t]||t,i=x.propHooks[t]),n!==undefined?i&&"set"in i&&(r=i.set(e,n,t))!==undefined?r:e[t]=n:i&&"get"in i&&null!==(r=i.get(e,t))?r:e[t]},propHooks:{tabIndex:{get:function(e){return e.hasAttribute("tabindex")||B.test(e.nodeName)||e.href?e.tabIndex:-1}}}}),M={set:function(e,t,n){return t===!1?x.removeAttr(e,n):e.setAttribute(n,n),n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,t){var n=x.expr.attrHandle[t]||x.find.attr;x.expr.attrHandle[t]=function(e,t,r){var i=x.expr.attrHandle[t],o=r?undefined:(x.expr.attrHandle[t]=undefined)!=n(e,t,r)?t.toLowerCase():null;return x.expr.attrHandle[t]=i,o}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&t.parentNode&&t.parentNode.selectedIndex,null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,t){return x.isArray(t)?e.checked=x.inArray(x(e).val(),t)>=0:undefined}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var I=/^key/,z=/^(?:mouse|contextmenu)|click/,_=/^(?:focusinfocus|focusoutblur)$/,X=/^([^.]*)(?:\.(.+)|)$/;function U(){return!0}function Y(){return!1}function V(){try{return o.activeElement}catch(e){}}x.event={global:{},add:function(e,t,n,i,o){var s,a,u,l,c,p,f,h,d,g,m,y=q.get(e);if(y){n.handler&&(s=n,n=s.handler,o=s.selector),n.guid||(n.guid=x.guid++),(l=y.events)||(l=y.events={}),(a=y.handle)||(a=y.handle=function(e){return typeof x===r||e&&x.event.triggered===e.type?undefined:x.event.dispatch.apply(a.elem,arguments)},a.elem=e),t=(t||"").match(w)||[""],c=t.length;while(c--)u=X.exec(t[c])||[],d=m=u[1],g=(u[2]||"").split(".").sort(),d&&(f=x.event.special[d]||{},d=(o?f.delegateType:f.bindType)||d,f=x.event.special[d]||{},p=x.extend({type:d,origType:m,data:i,handler:n,guid:n.guid,selector:o,needsContext:o&&x.expr.match.needsContext.test(o),namespace:g.join(".")},s),(h=l[d])||(h=l[d]=[],h.delegateCount=0,f.setup&&f.setup.call(e,i,g,a)!==!1||e.addEventListener&&e.addEventListener(d,a,!1)),f.add&&(f.add.call(e,p),p.handler.guid||(p.handler.guid=n.guid)),o?h.splice(h.delegateCount++,0,p):h.push(p),x.event.global[d]=!0);e=null}},remove:function(e,t,n,r,i){var o,s,a,u,l,c,p,f,h,d,g,m=q.hasData(e)&&q.get(e);if(m&&(u=m.events)){t=(t||"").match(w)||[""],l=t.length;while(l--)if(a=X.exec(t[l])||[],h=g=a[1],d=(a[2]||"").split(".").sort(),h){p=x.event.special[h]||{},h=(r?p.delegateType:p.bindType)||h,f=u[h]||[],a=a[2]&&RegExp("(^|\\.)"+d.join("\\.(?:.*\\.|)")+"(\\.|$)"),s=o=f.length;while(o--)c=f[o],!i&&g!==c.origType||n&&n.guid!==c.guid||a&&!a.test(c.namespace)||r&&r!==c.selector&&("**"!==r||!c.selector)||(f.splice(o,1),c.selector&&f.delegateCount--,p.remove&&p.remove.call(e,c));s&&!f.length&&(p.teardown&&p.teardown.call(e,d,m.handle)!==!1||x.removeEvent(e,h,m.handle),delete u[h])}else for(h in u)x.event.remove(e,h+t[l],n,r,!0);x.isEmptyObject(u)&&(delete m.handle,q.remove(e,"events"))}},trigger:function(t,n,r,i){var s,a,u,l,c,p,f,h=[r||o],d=y.call(t,"type")?t.type:t,g=y.call(t,"namespace")?t.namespace.split("."):[];if(a=u=r=r||o,3!==r.nodeType&&8!==r.nodeType&&!_.test(d+x.event.triggered)&&(d.indexOf(".")>=0&&(g=d.split("."),d=g.shift(),g.sort()),c=0>d.indexOf(":")&&"on"+d,t=t[x.expando]?t:new x.Event(d,"object"==typeof t&&t),t.isTrigger=i?2:3,t.namespace=g.join("."),t.namespace_re=t.namespace?RegExp("(^|\\.)"+g.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=undefined,t.target||(t.target=r),n=null==n?[t]:x.makeArray(n,[t]),f=x.event.special[d]||{},i||!f.trigger||f.trigger.apply(r,n)!==!1)){if(!i&&!f.noBubble&&!x.isWindow(r)){for(l=f.delegateType||d,_.test(l+d)||(a=a.parentNode);a;a=a.parentNode)h.push(a),u=a;u===(r.ownerDocument||o)&&h.push(u.defaultView||u.parentWindow||e)}s=0;while((a=h[s++])&&!t.isPropagationStopped())t.type=s>1?l:f.bindType||d,p=(q.get(a,"events")||{})[t.type]&&q.get(a,"handle"),p&&p.apply(a,n),p=c&&a[c],p&&x.acceptData(a)&&p.apply&&p.apply(a,n)===!1&&t.preventDefault();return t.type=d,i||t.isDefaultPrevented()||f._default&&f._default.apply(h.pop(),n)!==!1||!x.acceptData(r)||c&&x.isFunction(r[d])&&!x.isWindow(r)&&(u=r[c],u&&(r[c]=null),x.event.triggered=d,r[d](),x.event.triggered=undefined,u&&(r[c]=u)),t.result}},dispatch:function(e){e=x.event.fix(e);var t,n,r,i,o,s=[],a=d.call(arguments),u=(q.get(this,"events")||{})[e.type]||[],l=x.event.special[e.type]||{};if(a[0]=e,e.delegateTarget=this,!l.preDispatch||l.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),t=0;while((i=s[t++])&&!e.isPropagationStopped()){e.currentTarget=i.elem,n=0;while((o=i.handlers[n++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(o.namespace))&&(e.handleObj=o,e.data=o.data,r=((x.event.special[o.origType]||{}).handle||o.handler).apply(i.elem,a),r!==undefined&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return l.postDispatch&&l.postDispatch.call(this,e),e.result}},handlers:function(e,t){var n,r,i,o,s=[],a=t.delegateCount,u=e.target;if(a&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!==this;u=u.parentNode||this)if(u.disabled!==!0||"click"!==e.type){for(r=[],n=0;a>n;n++)o=t[n],i=o.selector+" ",r[i]===undefined&&(r[i]=o.needsContext?x(i,this).index(u)>=0:x.find(i,this,null,[u]).length),r[i]&&r.push(o);r.length&&s.push({elem:u,handlers:r})}return t.length>a&&s.push({elem:this,handlers:t.slice(a)}),s},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,t){var n,r,i,s=t.button;return null==e.pageX&&null!=t.clientX&&(n=e.target.ownerDocument||o,r=n.documentElement,i=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||i&&i.scrollLeft||0)-(r&&r.clientLeft||i&&i.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||i&&i.scrollTop||0)-(r&&r.clientTop||i&&i.clientTop||0)),e.which||s===undefined||(e.which=1&s?1:2&s?3:4&s?2:0),e}},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,s=e,a=this.fixHooks[i];a||(this.fixHooks[i]=a=z.test(i)?this.mouseHooks:I.test(i)?this.keyHooks:{}),r=a.props?this.props.concat(a.props):this.props,e=new x.Event(s),t=r.length;while(t--)n=r[t],e[n]=s[n];return e.target||(e.target=o),3===e.target.nodeType&&(e.target=e.target.parentNode),a.filter?a.filter(e,s):e},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==V()&&this.focus?(this.focus(),!1):undefined},delegateType:"focusin"},blur:{trigger:function(){return this===V()&&this.blur?(this.blur(),!1):undefined},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&x.nodeName(this,"input")?(this.click(),!1):undefined},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==undefined&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)},x.Event=function(e,t){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.getPreventDefault&&e.getPreventDefault()?U:Y):this.type=e,t&&x.extend(this,t),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,undefined):new x.Event(e,t)},x.Event.prototype={isDefaultPrevented:Y,isPropagationStopped:Y,isImmediatePropagationStopped:Y,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=U,e&&e.preventDefault&&e.preventDefault()},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=U,e&&e.stopPropagation&&e.stopPropagation()},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=U,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&o.addEventListener(e,r,!0)},teardown:function(){0===--n&&o.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,t,n,r,i){var o,s;if("object"==typeof e){"string"!=typeof t&&(n=n||t,t=undefined);for(s in e)this.on(s,t,n,e[s],i);return this}if(null==n&&null==r?(r=t,n=t=undefined):null==r&&("string"==typeof t?(r=n,n=undefined):(r=n,n=t,t=undefined)),r===!1)r=Y;else if(!r)return this;return 1===i&&(o=r,r=function(e){return x().off(e),o.apply(this,arguments)},r.guid=o.guid||(o.guid=x.guid++)),this.each(function(){x.event.add(this,e,r,n,t)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,t,n){var r,i;if(e&&e.preventDefault&&e.handleObj)return r=e.handleObj,x(e.delegateTarget).off(r.namespace?r.origType+"."+r.namespace:r.origType,r.selector,r.handler),this;if("object"==typeof e){for(i in e)this.off(i,t,e[i]);return this}return(t===!1||"function"==typeof t)&&(n=t,t=undefined),n===!1&&(n=Y),this.each(function(){x.event.remove(this,e,n,t)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,t){var n=this[0];return n?x.event.trigger(e,t,n,!0):undefined}});var G=/^.[^:#\[\.,]*$/,J=/^(?:parents|prev(?:Until|All))/,Q=x.expr.match.needsContext,K={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t=x(e,this),n=t.length;return this.filter(function(){var e=0;for(;n>e;e++)if(x.contains(this,t[e]))return!0})},not:function(e){return this.pushStack(et(this,e||[],!0))},filter:function(e){return this.pushStack(et(this,e||[],!1))},is:function(e){return!!et(this,"string"==typeof e&&Q.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],s=Q.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(s?s.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?g.call(x(e),this[0]):g.call(this,e.jquery?e[0]:e):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function Z(e,t){while((e=e[t])&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return Z(e,"nextSibling")},prev:function(e){return Z(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return e.contentDocument||x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(K[e]||x.unique(i),J.test(e)&&i.reverse()),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,t,n){var r=[],i=n!==undefined;while((e=e[t])&&9!==e.nodeType)if(1===e.nodeType){if(i&&x(e).is(n))break;r.push(e)}return r},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function et(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(G.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return g.call(t,e)>=0!==n})}var tt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,nt=/<([\w:]+)/,rt=/<|&#?\w+;/,it=/<(?:script|style|link)/i,ot=/^(?:checkbox|radio)$/i,st=/checked\s*(?:[^=]|=\s*.checked.)/i,at=/^$|\/(?:java|ecma)script/i,ut=/^true\/(.*)/,lt=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ct={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ct.optgroup=ct.option,ct.tbody=ct.tfoot=ct.colgroup=ct.caption=ct.thead,ct.th=ct.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===undefined?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||o).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=pt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(mt(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&dt(mt(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++)1===e.nodeType&&(x.cleanData(mt(e,!1)),e.textContent="");return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var t=this[0]||{},n=0,r=this.length;if(e===undefined&&1===t.nodeType)return t.innerHTML;if("string"==typeof e&&!it.test(e)&&!ct[(nt.exec(e)||["",""])[1].toLowerCase()]){e=e.replace(tt,"<$1></$2>");try{for(;r>n;n++)t=this[n]||{},1===t.nodeType&&(x.cleanData(mt(t,!1)),t.innerHTML=e);t=0}catch(i){}}t&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=f.apply([],e);var r,i,o,s,a,u,l=0,c=this.length,p=this,h=c-1,d=e[0],g=x.isFunction(d);if(g||!(1>=c||"string"!=typeof d||x.support.checkClone)&&st.test(d))return this.each(function(r){var i=p.eq(r);g&&(e[0]=d.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(r=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),i=r.firstChild,1===r.childNodes.length&&(r=i),i)){for(o=x.map(mt(r,"script"),ft),s=o.length;c>l;l++)a=r,l!==h&&(a=x.clone(a,!0,!0),s&&x.merge(o,mt(a,"script"))),t.call(this[l],a,l);if(s)for(u=o[o.length-1].ownerDocument,x.map(o,ht),l=0;s>l;l++)a=o[l],at.test(a.type||"")&&!q.access(a,"globalEval")&&x.contains(u,a)&&(a.src?x._evalUrl(a.src):x.globalEval(a.textContent.replace(lt,"")))}return this}}),x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=[],i=x(e),o=i.length-1,s=0;for(;o>=s;s++)n=s===o?this:this.clone(!0),x(i[s])[t](n),h.apply(r,n.get());return this.pushStack(r)}}),x.extend({clone:function(e,t,n){var r,i,o,s,a=e.cloneNode(!0),u=x.contains(e.ownerDocument,e);if(!(x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(s=mt(a),o=mt(e),r=0,i=o.length;i>r;r++)yt(o[r],s[r]);if(t)if(n)for(o=o||mt(e),s=s||mt(a),r=0,i=o.length;i>r;r++)gt(o[r],s[r]);else gt(e,a);return s=mt(a,"script"),s.length>0&&dt(s,!u&&mt(e,"script")),a},buildFragment:function(e,t,n,r){var i,o,s,a,u,l,c=0,p=e.length,f=t.createDocumentFragment(),h=[];for(;p>c;c++)if(i=e[c],i||0===i)if("object"===x.type(i))x.merge(h,i.nodeType?[i]:i);else if(rt.test(i)){o=o||f.appendChild(t.createElement("div")),s=(nt.exec(i)||["",""])[1].toLowerCase(),a=ct[s]||ct._default,o.innerHTML=a[1]+i.replace(tt,"<$1></$2>")+a[2],l=a[0];while(l--)o=o.lastChild;x.merge(h,o.childNodes),o=f.firstChild,o.textContent=""}else h.push(t.createTextNode(i));f.textContent="",c=0;while(i=h[c++])if((!r||-1===x.inArray(i,r))&&(u=x.contains(i.ownerDocument,i),o=mt(f.appendChild(i),"script"),u&&dt(o),n)){l=0;while(i=o[l++])at.test(i.type||"")&&n.push(i)}return f},cleanData:function(e){var t,n,r,i,o,s,a=x.event.special,u=0;for(;(n=e[u])!==undefined;u++){if(F.accepts(n)&&(o=n[q.expando],o&&(t=q.cache[o]))){if(r=Object.keys(t.events||{}),r.length)for(s=0;(i=r[s])!==undefined;s++)a[i]?x.event.remove(n,i):x.removeEvent(n,i,t.handle);q.cache[o]&&delete q.cache[o]}delete L.cache[n[L.expando]]}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}});function pt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function ft(e){return e.type=(null!==e.getAttribute("type"))+"/"+e.type,e}function ht(e){var t=ut.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function dt(e,t){var n=e.length,r=0;for(;n>r;r++)q.set(e[r],"globalEval",!t||q.get(t[r],"globalEval"))}function gt(e,t){var n,r,i,o,s,a,u,l;if(1===t.nodeType){if(q.hasData(e)&&(o=q.access(e),s=q.set(t,o),l=o.events)){delete s.handle,s.events={};for(i in l)for(n=0,r=l[i].length;r>n;n++)x.event.add(t,i,l[i][n])}L.hasData(e)&&(a=L.access(e),u=x.extend({},a),L.set(t,u))}}function mt(e,t){var n=e.getElementsByTagName?e.getElementsByTagName(t||"*"):e.querySelectorAll?e.querySelectorAll(t||"*"):[];return t===undefined||t&&x.nodeName(e,t)?x.merge([e],n):n}function yt(e,t){var n=t.nodeName.toLowerCase();"input"===n&&ot.test(e.type)?t.checked=e.checked:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}x.fn.extend({wrapAll:function(e){var t;return x.isFunction(e)?this.each(function(t){x(this).wrapAll(e.call(this,t))}):(this[0]&&(t=x(e,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstElementChild)e=e.firstElementChild;return e}).append(this)),this)},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var vt,xt,bt=/^(none|table(?!-c[ea]).+)/,wt=/^margin/,Tt=RegExp("^("+b+")(.*)$","i"),Ct=RegExp("^("+b+")(?!px)[a-z%]+$","i"),kt=RegExp("^([+-])=("+b+")","i"),Nt={BODY:"block"},Et={position:"absolute",visibility:"hidden",display:"block"},St={letterSpacing:0,fontWeight:400},jt=["Top","Right","Bottom","Left"],Dt=["Webkit","O","Moz","ms"];function At(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=Dt.length;while(i--)if(t=Dt[i]+n,t in e)return t;return r}function Lt(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function qt(t){return e.getComputedStyle(t,null)}function Ht(e,t){var n,r,i,o=[],s=0,a=e.length;for(;a>s;s++)r=e[s],r.style&&(o[s]=q.get(r,"olddisplay"),n=r.style.display,t?(o[s]||"none"!==n||(r.style.display=""),""===r.style.display&&Lt(r)&&(o[s]=q.access(r,"olddisplay",Rt(r.nodeName)))):o[s]||(i=Lt(r),(n&&"none"!==n||!i)&&q.set(r,"olddisplay",i?n:x.css(r,"display"))));for(s=0;a>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[s]||"":"none"));return e}x.fn.extend({css:function(e,t){return x.access(this,function(e,t,n){var r,i,o={},s=0;if(x.isArray(t)){for(r=qt(e),i=t.length;i>s;s++)o[t[s]]=x.css(e,t[s],!1,r);return o}return n!==undefined?x.style(e,t,n):x.css(e,t)},e,t,arguments.length>1)},show:function(){return Ht(this,!0)},hide:function(){return Ht(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){Lt(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=vt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(e,t,n,r){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var i,o,s,a=x.camelCase(t),u=e.style;return t=x.cssProps[a]||(x.cssProps[a]=At(u,a)),s=x.cssHooks[t]||x.cssHooks[a],n===undefined?s&&"get"in s&&(i=s.get(e,!1,r))!==undefined?i:u[t]:(o=typeof n,"string"===o&&(i=kt.exec(n))&&(n=(i[1]+1)*i[2]+parseFloat(x.css(e,t)),o="number"),null==n||"number"===o&&isNaN(n)||("number"!==o||x.cssNumber[a]||(n+="px"),x.support.clearCloneStyle||""!==n||0!==t.indexOf("background")||(u[t]="inherit"),s&&"set"in s&&(n=s.set(e,n,r))===undefined||(u[t]=n)),undefined)}},css:function(e,t,n,r){var i,o,s,a=x.camelCase(t);return t=x.cssProps[a]||(x.cssProps[a]=At(e.style,a)),s=x.cssHooks[t]||x.cssHooks[a],s&&"get"in s&&(i=s.get(e,!0,n)),i===undefined&&(i=vt(e,t,r)),"normal"===i&&t in St&&(i=St[t]),""===n||n?(o=parseFloat(i),n===!0||x.isNumeric(o)?o||0:i):i}}),vt=function(e,t,n){var r,i,o,s=n||qt(e),a=s?s.getPropertyValue(t)||s[t]:undefined,u=e.style;return s&&(""!==a||x.contains(e.ownerDocument,e)||(a=x.style(e,t)),Ct.test(a)&&wt.test(t)&&(r=u.width,i=u.minWidth,o=u.maxWidth,u.minWidth=u.maxWidth=u.width=a,a=s.width,u.width=r,u.minWidth=i,u.maxWidth=o)),a};function Ot(e,t,n){var r=Tt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function Ft(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,s=0;for(;4>o;o+=2)"margin"===n&&(s+=x.css(e,n+jt[o],!0,i)),r?("content"===n&&(s-=x.css(e,"padding"+jt[o],!0,i)),"margin"!==n&&(s-=x.css(e,"border"+jt[o]+"Width",!0,i))):(s+=x.css(e,"padding"+jt[o],!0,i),"padding"!==n&&(s+=x.css(e,"border"+jt[o]+"Width",!0,i)));return s}function Pt(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=qt(e),s=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=vt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Ct.test(i))return i;r=s&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+Ft(e,t,n||(s?"border":"content"),r,o)+"px"}function Rt(e){var t=o,n=Nt[e];return n||(n=Mt(e,t),"none"!==n&&n||(xt=(xt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(xt[0].contentWindow||xt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=Mt(e,t),xt.detach()),Nt[e]=n),n}function Mt(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,t){x.cssHooks[t]={get:function(e,n,r){return n?0===e.offsetWidth&&bt.test(x.css(e,"display"))?x.swap(e,Et,function(){return Pt(e,t,r)}):Pt(e,t,r):undefined},set:function(e,n,r){var i=r&&qt(e);return Ot(e,n,r?Ft(e,t,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,t){return t?x.swap(e,{display:"inline-block"},vt,[e,"marginRight"]):undefined}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,t){x.cssHooks[t]={get:function(e,n){return n?(n=vt(e,t),Ct.test(n)?x(e).position()[t]+"px":n):undefined}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+jt[r]+t]=o[r]||o[r-2]||o[0];return i}},wt.test(e)||(x.cssHooks[e+t].set=Ot)});var Wt=/%20/g,$t=/\[\]$/,Bt=/\r?\n/g,It=/^(?:submit|button|image|reset|file)$/i,zt=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&zt.test(this.nodeName)&&!It.test(e)&&(this.checked||!ot.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(Bt,"\r\n")}}):{name:t.name,value:n.replace(Bt,"\r\n")}}).get()}}),x.param=function(e,t){var n,r=[],i=function(e,t){t=x.isFunction(t)?t():null==t?"":t,r[r.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(t===undefined&&(t=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){i(this.name,this.value)});else for(n in e)_t(n,e[n],t,i);return r.join("&").replace(Wt,"+")};function _t(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||$t.test(e)?r(e,i):_t(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)_t(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)
},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var Xt,Ut,Yt=x.now(),Vt=/\?/,Gt=/#.*$/,Jt=/([?&])_=[^&]*/,Qt=/^(.*?):[ \t]*([^\r\n]*)$/gm,Kt=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Zt=/^(?:GET|HEAD)$/,en=/^\/\//,tn=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,nn=x.fn.load,rn={},on={},sn="*/".concat("*");try{Ut=i.href}catch(an){Ut=o.createElement("a"),Ut.href="",Ut=Ut.href}Xt=tn.exec(Ut.toLowerCase())||[];function un(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(w)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function ln(e,t,n,r){var i={},o=e===on;function s(a){var u;return i[a]=!0,x.each(e[a]||[],function(e,a){var l=a(t,n,r);return"string"!=typeof l||o||i[l]?o?!(u=l):undefined:(t.dataTypes.unshift(l),s(l),!1)}),u}return s(t.dataTypes[0])||!i["*"]&&s("*")}function cn(e,t){var n,r,i=x.ajaxSettings.flatOptions||{};for(n in t)t[n]!==undefined&&((i[n]?e:r||(r={}))[n]=t[n]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,t,n){if("string"!=typeof e&&nn)return nn.apply(this,arguments);var r,i,o,s=this,a=e.indexOf(" ");return a>=0&&(r=e.slice(a),e=e.slice(0,a)),x.isFunction(t)?(n=t,t=undefined):t&&"object"==typeof t&&(i="POST"),s.length>0&&x.ajax({url:e,type:i,dataType:"html",data:t}).done(function(e){o=arguments,s.html(r?x("<div>").append(x.parseHTML(e)).find(r):e)}).complete(n&&function(e,t){s.each(n,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:Ut,type:"GET",isLocal:Kt.test(Xt[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":sn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?cn(cn(e,x.ajaxSettings),t):cn(x.ajaxSettings,e)},ajaxPrefilter:un(rn),ajaxTransport:un(on),ajax:function(e,t){"object"==typeof e&&(t=e,e=undefined),t=t||{};var n,r,i,o,s,a,u,l,c=x.ajaxSetup({},t),p=c.context||c,f=c.context&&(p.nodeType||p.jquery)?x(p):x.event,h=x.Deferred(),d=x.Callbacks("once memory"),g=c.statusCode||{},m={},y={},v=0,b="canceled",T={readyState:0,getResponseHeader:function(e){var t;if(2===v){if(!o){o={};while(t=Qt.exec(i))o[t[1].toLowerCase()]=t[2]}t=o[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===v?i:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return v||(e=y[n]=y[n]||e,m[e]=t),this},overrideMimeType:function(e){return v||(c.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>v)for(t in e)g[t]=[g[t],e[t]];else T.always(e[T.status]);return this},abort:function(e){var t=e||b;return n&&n.abort(t),k(0,t),this}};if(h.promise(T).complete=d.add,T.success=T.done,T.error=T.fail,c.url=((e||c.url||Ut)+"").replace(Gt,"").replace(en,Xt[1]+"//"),c.type=t.method||t.type||c.method||c.type,c.dataTypes=x.trim(c.dataType||"*").toLowerCase().match(w)||[""],null==c.crossDomain&&(a=tn.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===Xt[1]&&a[2]===Xt[2]&&(a[3]||("http:"===a[1]?"80":"443"))===(Xt[3]||("http:"===Xt[1]?"80":"443")))),c.data&&c.processData&&"string"!=typeof c.data&&(c.data=x.param(c.data,c.traditional)),ln(rn,c,t,T),2===v)return T;u=c.global,u&&0===x.active++&&x.event.trigger("ajaxStart"),c.type=c.type.toUpperCase(),c.hasContent=!Zt.test(c.type),r=c.url,c.hasContent||(c.data&&(r=c.url+=(Vt.test(r)?"&":"?")+c.data,delete c.data),c.cache===!1&&(c.url=Jt.test(r)?r.replace(Jt,"$1_="+Yt++):r+(Vt.test(r)?"&":"?")+"_="+Yt++)),c.ifModified&&(x.lastModified[r]&&T.setRequestHeader("If-Modified-Since",x.lastModified[r]),x.etag[r]&&T.setRequestHeader("If-None-Match",x.etag[r])),(c.data&&c.hasContent&&c.contentType!==!1||t.contentType)&&T.setRequestHeader("Content-Type",c.contentType),T.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+("*"!==c.dataTypes[0]?", "+sn+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)T.setRequestHeader(l,c.headers[l]);if(c.beforeSend&&(c.beforeSend.call(p,T,c)===!1||2===v))return T.abort();b="abort";for(l in{success:1,error:1,complete:1})T[l](c[l]);if(n=ln(on,c,t,T)){T.readyState=1,u&&f.trigger("ajaxSend",[T,c]),c.async&&c.timeout>0&&(s=setTimeout(function(){T.abort("timeout")},c.timeout));try{v=1,n.send(m,k)}catch(C){if(!(2>v))throw C;k(-1,C)}}else k(-1,"No Transport");function k(e,t,o,a){var l,m,y,b,w,C=t;2!==v&&(v=2,s&&clearTimeout(s),n=undefined,i=a||"",T.readyState=e>0?4:0,l=e>=200&&300>e||304===e,o&&(b=pn(c,T,o)),b=fn(c,b,T,l),l?(c.ifModified&&(w=T.getResponseHeader("Last-Modified"),w&&(x.lastModified[r]=w),w=T.getResponseHeader("etag"),w&&(x.etag[r]=w)),204===e||"HEAD"===c.type?C="nocontent":304===e?C="notmodified":(C=b.state,m=b.data,y=b.error,l=!y)):(y=C,(e||!C)&&(C="error",0>e&&(e=0))),T.status=e,T.statusText=(t||C)+"",l?h.resolveWith(p,[m,C,T]):h.rejectWith(p,[T,C,y]),T.statusCode(g),g=undefined,u&&f.trigger(l?"ajaxSuccess":"ajaxError",[T,c,l?m:y]),d.fireWith(p,[T,C]),u&&(f.trigger("ajaxComplete",[T,c]),--x.active||x.event.trigger("ajaxStop")))}return T},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,t){return x.get(e,undefined,t,"script")}}),x.each(["get","post"],function(e,t){x[t]=function(e,n,r,i){return x.isFunction(n)&&(i=i||r,r=n,n=undefined),x.ajax({url:e,type:t,dataType:i,data:n,success:r})}});function pn(e,t,n){var r,i,o,s,a=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),r===undefined&&(r=e.mimeType||t.getResponseHeader("Content-Type"));if(r)for(i in a)if(a[i]&&a[i].test(r)){u.unshift(i);break}if(u[0]in n)o=u[0];else{for(i in n){if(!u[0]||e.converters[i+" "+u[0]]){o=i;break}s||(s=i)}o=o||s}return o?(o!==u[0]&&u.unshift(o),n[o]):undefined}function fn(e,t,n,r){var i,o,s,a,u,l={},c=e.dataTypes.slice();if(c[1])for(s in e.converters)l[s.toLowerCase()]=e.converters[s];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!u&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),u=o,o=c.shift())if("*"===o)o=u;else if("*"!==u&&u!==o){if(s=l[u+" "+o]||l["* "+o],!s)for(i in l)if(a=i.split(" "),a[1]===o&&(s=l[u+" "+a[0]]||l["* "+a[0]])){s===!0?s=l[i]:l[i]!==!0&&(o=a[0],c.unshift(a[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(p){return{state:"parsererror",error:s?p:"No conversion from "+u+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===undefined&&(e.cache=!1),e.crossDomain&&(e.type="GET")}),x.ajaxTransport("script",function(e){if(e.crossDomain){var t,n;return{send:function(r,i){t=x("<script>").prop({async:!0,charset:e.scriptCharset,src:e.url}).on("load error",n=function(e){t.remove(),n=null,e&&i("error"===e.type?404:200,e.type)}),o.head.appendChild(t[0])},abort:function(){n&&n()}}}});var hn=[],dn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=hn.pop()||x.expando+"_"+Yt++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(t,n,r){var i,o,s,a=t.jsonp!==!1&&(dn.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&dn.test(t.data)&&"data");return a||"jsonp"===t.dataTypes[0]?(i=t.jsonpCallback=x.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,a?t[a]=t[a].replace(dn,"$1"+i):t.jsonp!==!1&&(t.url+=(Vt.test(t.url)?"&":"?")+t.jsonp+"="+i),t.converters["script json"]=function(){return s||x.error(i+" was not called"),s[0]},t.dataTypes[0]="json",o=e[i],e[i]=function(){s=arguments},r.always(function(){e[i]=o,t[i]&&(t.jsonpCallback=n.jsonpCallback,hn.push(i)),s&&x.isFunction(o)&&o(s[0]),s=o=undefined}),"script"):undefined}),x.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(e){}};var gn=x.ajaxSettings.xhr(),mn={0:200,1223:204},yn=0,vn={};e.ActiveXObject&&x(e).on("unload",function(){for(var e in vn)vn[e]();vn=undefined}),x.support.cors=!!gn&&"withCredentials"in gn,x.support.ajax=gn=!!gn,x.ajaxTransport(function(e){var t;return x.support.cors||gn&&!e.crossDomain?{send:function(n,r){var i,o,s=e.xhr();if(s.open(e.type,e.url,e.async,e.username,e.password),e.xhrFields)for(i in e.xhrFields)s[i]=e.xhrFields[i];e.mimeType&&s.overrideMimeType&&s.overrideMimeType(e.mimeType),e.crossDomain||n["X-Requested-With"]||(n["X-Requested-With"]="XMLHttpRequest");for(i in n)s.setRequestHeader(i,n[i]);t=function(e){return function(){t&&(delete vn[o],t=s.onload=s.onerror=null,"abort"===e?s.abort():"error"===e?r(s.status||404,s.statusText):r(mn[s.status]||s.status,s.statusText,"string"==typeof s.responseText?{text:s.responseText}:undefined,s.getAllResponseHeaders()))}},s.onload=t(),s.onerror=t("error"),t=vn[o=yn++]=t("abort"),s.send(e.hasContent&&e.data||null)},abort:function(){t&&t()}}:undefined});var xn,bn,wn=/^(?:toggle|show|hide)$/,Tn=RegExp("^(?:([+-])=|)("+b+")([a-z%]*)$","i"),Cn=/queueHooks$/,kn=[An],Nn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Tn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),s=(x.cssNumber[e]||"px"!==o&&+r)&&Tn.exec(x.css(n.elem,e)),a=1,u=20;if(s&&s[3]!==o){o=o||s[3],i=i||[],s=+r||1;do a=a||".5",s/=a,x.style(n.elem,e,s+o);while(a!==(a=n.cur()/r)&&1!==a&&--u)}return i&&(s=n.start=+s||+r||0,n.unit=o,n.end=i[1]?s+(i[1]+1)*i[2]:+i[2]),n}]};function En(){return setTimeout(function(){xn=undefined}),xn=x.now()}function Sn(e,t,n){var r,i=(Nn[t]||[]).concat(Nn["*"]),o=0,s=i.length;for(;s>o;o++)if(r=i[o].call(n,t,e))return r}function jn(e,t,n){var r,i,o=0,s=kn.length,a=x.Deferred().always(function(){delete u.elem}),u=function(){if(i)return!1;var t=xn||En(),n=Math.max(0,l.startTime+l.duration-t),r=n/l.duration||0,o=1-r,s=0,u=l.tweens.length;for(;u>s;s++)l.tweens[s].run(o);return a.notifyWith(e,[l,o,n]),1>o&&u?n:(a.resolveWith(e,[l]),!1)},l=a.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:xn||En(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,l.opts,t,n,l.opts.specialEasing[t]||l.opts.easing);return l.tweens.push(r),r},stop:function(t){var n=0,r=t?l.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)l.tweens[n].run(1);return t?a.resolveWith(e,[l,t]):a.rejectWith(e,[l,t]),this}}),c=l.props;for(Dn(c,l.opts.specialEasing);s>o;o++)if(r=kn[o].call(l,e,c,l.opts))return r;return x.map(c,Sn,l),x.isFunction(l.opts.start)&&l.opts.start.call(e,l),x.fx.timer(x.extend(u,{elem:e,anim:l,queue:l.opts.queue})),l.progress(l.opts.progress).done(l.opts.done,l.opts.complete).fail(l.opts.fail).always(l.opts.always)}function Dn(e,t){var n,r,i,o,s;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),s=x.cssHooks[r],s&&"expand"in s){o=s.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(jn,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Nn[n]=Nn[n]||[],Nn[n].unshift(t)},prefilter:function(e,t){t?kn.unshift(e):kn.push(e)}});function An(e,t,n){var r,i,o,s,a,u,l=this,c={},p=e.style,f=e.nodeType&&Lt(e),h=q.get(e,"fxshow");n.queue||(a=x._queueHooks(e,"fx"),null==a.unqueued&&(a.unqueued=0,u=a.empty.fire,a.empty.fire=function(){a.unqueued||u()}),a.unqueued++,l.always(function(){l.always(function(){a.unqueued--,x.queue(e,"fx").length||a.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(p.display="inline-block")),n.overflow&&(p.overflow="hidden",l.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],wn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show")){if("show"!==i||!h||h[r]===undefined)continue;f=!0}c[r]=h&&h[r]||x.style(e,r)}if(!x.isEmptyObject(c)){h?"hidden"in h&&(f=h.hidden):h=q.access(e,"fxshow",{}),o&&(h.hidden=!f),f?x(e).show():l.done(function(){x(e).hide()}),l.done(function(){var t;q.remove(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)s=Sn(f?h[r]:0,r,l),r in h||(h[r]=s.start,f&&(s.end=s.start,s.start="width"===r||"height"===r?1:0))}}function Ln(e,t,n,r,i){return new Ln.prototype.init(e,t,n,r,i)}x.Tween=Ln,Ln.prototype={constructor:Ln,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=Ln.propHooks[this.prop];return e&&e.get?e.get(this):Ln.propHooks._default.get(this)},run:function(e){var t,n=Ln.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Ln.propHooks._default.set(this),this}},Ln.prototype.init.prototype=Ln.prototype,Ln.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Ln.propHooks.scrollTop=Ln.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(qn(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(Lt).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),s=function(){var t=jn(this,x.extend({},e),o);(i||q.get(this,"finish"))&&t.stop(!0)};return s.finish=s,i||o.queue===!1?this.each(s):this.queue(o.queue,s)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=undefined),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=x.timers,s=q.get(this);if(i)s[i]&&s[i].stop&&r(s[i]);else for(i in s)s[i]&&s[i].stop&&Cn.test(i)&&r(s[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=q.get(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,s=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;s>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function qn(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=jt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:qn("show"),slideUp:qn("hide"),slideToggle:qn("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=Ln.prototype.init,x.fx.tick=function(){var e,t=x.timers,n=0;for(xn=x.now();t.length>n;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||x.fx.stop(),xn=undefined},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){bn||(bn=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(bn),bn=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===undefined?this:this.each(function(t){x.offset.setOffset(this,e,t)});var t,n,i=this[0],o={top:0,left:0},s=i&&i.ownerDocument;if(s)return t=s.documentElement,x.contains(t,i)?(typeof i.getBoundingClientRect!==r&&(o=i.getBoundingClientRect()),n=Hn(s),{top:o.top+n.pageYOffset-t.clientTop,left:o.left+n.pageXOffset-t.clientLeft}):o},x.offset={setOffset:function(e,t,n){var r,i,o,s,a,u,l,c=x.css(e,"position"),p=x(e),f={};"static"===c&&(e.style.position="relative"),a=p.offset(),o=x.css(e,"top"),u=x.css(e,"left"),l=("absolute"===c||"fixed"===c)&&(o+u).indexOf("auto")>-1,l?(r=p.position(),s=r.top,i=r.left):(s=parseFloat(o)||0,i=parseFloat(u)||0),x.isFunction(t)&&(t=t.call(e,n,a)),null!=t.top&&(f.top=t.top-a.top+s),null!=t.left&&(f.left=t.left-a.left+i),"using"in t?t.using.call(e,f):p.css(f)}},x.fn.extend({position:function(){if(this[0]){var e,t,n=this[0],r={top:0,left:0};return"fixed"===x.css(n,"position")?t=n.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(r=e.offset()),r.top+=x.css(e[0],"borderTopWidth",!0),r.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-r.top-x.css(n,"marginTop",!0),left:t.left-r.left-x.css(n,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,n){var r="pageYOffset"===n;x.fn[t]=function(i){return x.access(this,function(t,i,o){var s=Hn(t);return o===undefined?s?s[n]:t[i]:(s?s.scrollTo(r?e.pageXOffset:o,r?o:e.pageYOffset):t[i]=o,undefined)},t,i,arguments.length,null)}});function Hn(e){return x.isWindow(e)?e:9===e.nodeType&&e.defaultView}x.each({Height:"height",Width:"width"},function(e,t){x.each({padding:"inner"+e,content:t,"":"outer"+e},function(n,r){x.fn[r]=function(r,i){var o=arguments.length&&(n||"boolean"!=typeof r),s=n||(r===!0||i===!0?"margin":"border");return x.access(this,function(t,n,r){var i;return x.isWindow(t)?t.document.documentElement["client"+e]:9===t.nodeType?(i=t.documentElement,Math.max(t.body["scroll"+e],i["scroll"+e],t.body["offset"+e],i["offset"+e],i["client"+e])):r===undefined?x.css(t,n,s):x.style(t,n,r,s)},t,o?r:undefined,o,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}),"object"==typeof e&&"object"==typeof e.document&&(e.jQuery=e.$=x)})(window);

(function( $, undefined ) {

	var uuid = 0,
		slice = Array.prototype.slice,
		_cleanData = $.cleanData;
	$.cleanData = function( elems ) {
		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			try {
				$( elem ).triggerHandler( "remove" );
			// http://bugs.jquery.com/ticket/8235
			} catch( e ) {}
		}
		_cleanData( elems );
	};

	$.widget = function( name, base, prototype ) {
		var fullName, existingConstructor, constructor, basePrototype,
			// proxiedPrototype allows the provided prototype to remain unmodified
			// so that it can be used as a mixin for multiple panes (#8876)
			proxiedPrototype = {},
			namespace = name.split( "." )[ 0 ];

		name = name.split( "." )[ 1 ];
		fullName = namespace + "-" + name;

		if ( !prototype ) {
			prototype = base;
			base = $.Widget;
		}

		// create selector for plugin
		$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
			return !!$.data( elem, fullName );
		};

		$[ namespace ] = $[ namespace ] || {};
		existingConstructor = $[ namespace ][ name ];
		constructor = $[ namespace ][ name ] = function( options, element ) {
			// allow instantiation without "new" keyword
			if ( !this._createWidget ) {
				return new constructor( options, element );
			}

			// allow instantiation without initializing for simple inheritance
			// must use "new" keyword (the code above always passes args)
			if ( arguments.length ) {
				this._createWidget( options, element );
			}
		};
		// extend with the existing constructor to carry over any static properties
		$.extend( constructor, existingConstructor, {
			version: prototype.version,
			// copy the object used to create the prototype in case we need to
			// redefine the widget later
			_proto: $.extend( {}, prototype ),
			// track panes that inherit from this widget in case this widget is
			// redefined after a widget inherits from it
			_childConstructors: []
		});

		basePrototype = new base();
		// we need to make the options hash a property directly on the new instance
		// otherwise we'll modify the options hash on the prototype that we're
		// inheriting from
		basePrototype.options = $.widget.extend( {}, basePrototype.options );
		$.each( prototype, function( prop, value ) {
			if ( !$.isFunction( value ) ) {
				proxiedPrototype[ prop ] = value;
				return;
			}
			proxiedPrototype[ prop ] = (function() {
				var _super = function() {
						return base.prototype[ prop ].apply( this, arguments );
					},
					_superApply = function( args ) {
						return base.prototype[ prop ].apply( this, args );
					};
				return function() {
					var __super = this._super,
						__superApply = this._superApply,
						returnValue;

					this._super = _super;
					this._superApply = _superApply;

					returnValue = value.apply( this, arguments );

					this._super = __super;
					this._superApply = __superApply;

					return returnValue;
				};
			})();
		});
		constructor.prototype = $.widget.extend( basePrototype, {
			// TODO: remove support for widgetEventPrefix
			// always use the name + a colon as the prefix, e.g., draggable:start
			// don't prefix for panes that aren't DOM-based
			widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix : name
		}, proxiedPrototype, {
			constructor: constructor,
			namespace: namespace,
			widgetName: name,
			widgetFullName: fullName
		});

		// If this widget is being redefined then we need to find all panes that
		// are inheriting from it and redefine all of them so that they inherit from
		// the new version of this widget. We're essentially trying to replace one
		// level in the prototype chain.
		if ( existingConstructor ) {
			$.each( existingConstructor._childConstructors, function( i, child ) {
				var childPrototype = child.prototype;

				// redefine the child widget using the same prototype that was
				// originally used, but inherit from the new version of the base
				$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
			});
			// remove the list of existing child constructors from the old constructor
			// so the old child constructors can be garbage collected
			delete existingConstructor._childConstructors;
		} else {
			base._childConstructors.push( constructor );
		}

		$.widget.bridge( name, constructor );
	};

	$.widget.extend = function( target ) {
		var input = slice.call( arguments, 1 ),
			inputIndex = 0,
			inputLength = input.length,
			key,
			value;
		for ( ; inputIndex < inputLength; inputIndex++ ) {
			for ( key in input[ inputIndex ] ) {
				value = input[ inputIndex ][ key ];
				if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
					// Clone objects
					if ( $.isPlainObject( value ) ) {
						target[ key ] = $.isPlainObject( target[ key ] ) ?
							$.widget.extend( {}, target[ key ], value ) :
							// Don't extend strings, arrays, etc. with objects
							$.widget.extend( {}, value );
					// Copy everything else by reference
					} else {
						target[ key ] = value;
					}
				}
			}
		}
		return target;
	};

	$.widget.bridge = function( name, object ) {
		var fullName = object.prototype.widgetFullName || name;
		$.fn[ name ] = function( options ) {
			var isMethodCall = typeof options === "string",
				args = slice.call( arguments, 1 ),
				returnValue = this;

			// allow multiple hashes to be passed on init
			options = !isMethodCall && args.length ?
				$.widget.extend.apply( null, [ options ].concat(args) ) :
				options;

			if ( isMethodCall ) {
				this.each(function() {
					var methodValue,
						instance = $.data( this, fullName );
					if ( !instance ) {
						return $.error( "cannot call methods on " + name + " prior to initialization; " +
							"attempted to call method '" + options + "'" );
					}
					if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
						return $.error( "no such method '" + options + "' for " + name + " widget instance" );
					}
					methodValue = instance[ options ].apply( instance, args );
					if ( methodValue !== instance && methodValue !== undefined ) {
						returnValue = methodValue && methodValue.jquery ?
							returnValue.pushStack( methodValue.get() ) :
							methodValue;
						return false;
					}
				});
			} else {
				this.each(function() {
					var instance = $.data( this, fullName );
					if ( instance ) {
						instance.option( options || {} )._init();
					} else {
						$.data( this, fullName, new object( options, this ) );
					}
				});
			}

			return returnValue;
		};
	};

	$.Widget = function( /* options, element */ ) {};
	$.Widget._childConstructors = [];

	$.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			disabled: false,

			// callbacks
			create: null
		},
		_createWidget: function( options, element ) {
			element = $( element || this.defaultElement || this )[ 0 ];
			this.element = $( element );
			this.uuid = uuid++;
			this.eventNamespace = "." + this.widgetName + this.uuid;
			this.options = $.widget.extend( {},
				this.options,
				this._getCreateOptions(),
				options );

			this.bindings = $();
			this.hoverable = $();
			this.focusable = $();

			if ( element !== this ) {
				$.data( element, this.widgetFullName, this );
				this._on( true, this.element, {
					remove: function( event ) {
						if ( event.target === element ) {
							this.destroy();
						}
					}
				});
				this.document = $( element.style ?
					// element within the document
					element.ownerDocument :
					// element is window or document
					element.document || element );
				this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
			}

			this._create();
			this._trigger( "create", null, this._getCreateEventData() );
			this._init();
		},
		_getCreateOptions: $.noop,
		_getCreateEventData: $.noop,
		_create: $.noop,
		_init: $.noop,

		destroy: function() {
			this._destroy();
			// we can probably remove the unbind calls in 2.0
			// all event bindings should go through this._on()
			this.element
				.unbind( this.eventNamespace )
				// 1.9 BC for #7810
				// TODO remove dual storage
				.removeData( this.widgetName )
				.removeData( this.widgetFullName )
				// support: jquery <1.6.3
				// http://bugs.jquery.com/ticket/9413
				.removeData( $.camelCase( this.widgetFullName ) );
			this.widget()
				.unbind( this.eventNamespace )
				.removeAttr( "aria-disabled" )
				.removeClass(
					this.widgetFullName + "-disabled " +
					"ui-state-disabled" );

			// clean up events and states
			this.bindings.unbind( this.eventNamespace );
			this.hoverable.removeClass( "ui-state-hover" );
			this.focusable.removeClass( "ui-state-focus" );
		},
		_destroy: $.noop,

		widget: function() {
			return this.element;
		},

		option: function( key, value ) {
			var options = key,
				parts,
				curOption,
				i;

			if ( arguments.length === 0 ) {
				// don't return a reference to the internal hash
				return $.widget.extend( {}, this.options );
			}

			if ( typeof key === "string" ) {
				// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
				options = {};
				parts = key.split( "." );
				key = parts.shift();
				if ( parts.length ) {
					curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
					for ( i = 0; i < parts.length - 1; i++ ) {
						curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
						curOption = curOption[ parts[ i ] ];
					}
					key = parts.pop();
					if ( value === undefined ) {
						return curOption[ key ] === undefined ? null : curOption[ key ];
					}
					curOption[ key ] = value;
				} else {
					if ( value === undefined ) {
						return this.options[ key ] === undefined ? null : this.options[ key ];
					}
					options[ key ] = value;
				}
			}

			this._setOptions( options );

			return this;
		},
		_setOptions: function( options ) {
			var key;

			for ( key in options ) {
				this._setOption( key, options[ key ] );
			}

			return this;
		},
		_setOption: function( key, value ) {
			this.options[ key ] = value;

			if ( key === "disabled" ) {
				this.widget()
					.toggleClass( this.widgetFullName + "-disabled ui-state-disabled", !!value )
					.attr( "aria-disabled", value );
				this.hoverable.removeClass( "ui-state-hover" );
				this.focusable.removeClass( "ui-state-focus" );
			}

			return this;
		},

		enable: function() {
			return this._setOption( "disabled", false );
		},
		disable: function() {
			return this._setOption( "disabled", true );
		},

		_on: function( suppressDisabledCheck, element, handlers ) {
			var delegateElement,
				instance = this;

			// no suppressDisabledCheck flag, shuffle arguments
			if ( typeof suppressDisabledCheck !== "boolean" ) {
				handlers = element;
				element = suppressDisabledCheck;
				suppressDisabledCheck = false;
			}

			// no element argument, shuffle and use this.element
			if ( !handlers ) {
				handlers = element;
				element = this.element;
				delegateElement = this.widget();
			} else {
				// accept selectors, DOM elements
				element = delegateElement = $( element );
				this.bindings = this.bindings.add( element );
			}

			$.each( handlers, function( event, handler ) {
				function handlerProxy() {
					// allow panes to customize the disabled handling
					// - disabled as an array instead of boolean
					// - disabled class as method for disabling individual parts
					if ( !suppressDisabledCheck &&
							( instance.options.disabled === true ||
								$( this ).hasClass( "ui-state-disabled" ) ) ) {
						return;
					}
					return ( typeof handler === "string" ? instance[ handler ] : handler )
						.apply( instance, arguments );
				}

				// copy the guid so direct unbinding works
				if ( typeof handler !== "string" ) {
					handlerProxy.guid = handler.guid =
						handler.guid || handlerProxy.guid || $.guid++;
				}

				var match = event.match( /^(\w+)\s*(.*)$/ ),
					eventName = match[1] + instance.eventNamespace,
					selector = match[2];
				if ( selector ) {
					delegateElement.delegate( selector, eventName, handlerProxy );
				} else {
					element.bind( eventName, handlerProxy );
				}
			});
		},

		_off: function( element, eventName ) {
			eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
			element.unbind( eventName ).undelegate( eventName );
		},

		_delay: function( handler, delay ) {
			function handlerProxy() {
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}
			var instance = this;
			return setTimeout( handlerProxy, delay || 0 );
		},

		_hoverable: function( element ) {
			this.hoverable = this.hoverable.add( element );
			this._on( element, {
				mouseenter: function( event ) {
					$( event.currentTarget ).addClass( "ui-state-hover" );
				},
				mouseleave: function( event ) {
					$( event.currentTarget ).removeClass( "ui-state-hover" );
				}
			});
		},

		_focusable: function( element ) {
			this.focusable = this.focusable.add( element );
			this._on( element, {
				focusin: function( event ) {
					$( event.currentTarget ).addClass( "ui-state-focus" );
				},
				focusout: function( event ) {
					$( event.currentTarget ).removeClass( "ui-state-focus" );
				}
			});
		},

		_trigger: function( type, event, data ) {
			var prop, orig,
				callback = this.options[ type ];

			data = data || {};
			event = $.Event( event );
			event.type = ( type === this.widgetEventPrefix ?
				type :
				this.widgetEventPrefix + type ).toLowerCase();
			// the original event may come from any element
			// so we need to reset the target on the new event
			event.target = this.element[ 0 ];

			// copy original event properties over to the new event
			orig = event.originalEvent;
			if ( orig ) {
				for ( prop in orig ) {
					if ( !( prop in event ) ) {
						event[ prop ] = orig[ prop ];
					}
				}
			}

			this.element.trigger( event, data );
			return !( $.isFunction( callback ) &&
				callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
				event.isDefaultPrevented() );
		}
	};

})( jQuery );




(function($, undefined) {

	var dataSpace = "ui-effects-";

	$.effects = {
		effect: {}
	};

	/*!
	 * jQuery Color Animations v2.1.2
	 * https://github.com/jquery/jquery-color
	 *
	 * Copyright 2013 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * Date: Wed Jan 16 08:47:09 2013 -0600
	 */
	(function( jQuery, undefined ) {

		var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",

		// plusequals test for += 100 -= 100
		rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,
		// a set of RE's that can match strings and generate color tuples.
		stringParsers = [{
				re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				parse: function( execResult ) {
					return [
						execResult[ 1 ],
						execResult[ 2 ],
						execResult[ 3 ],
						execResult[ 4 ]
					];
				}
			}, {
				re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				parse: function( execResult ) {
					return [
						execResult[ 1 ] * 2.55,
						execResult[ 2 ] * 2.55,
						execResult[ 3 ] * 2.55,
						execResult[ 4 ]
					];
				}
			}, {
				// this regex ignores A-F because it's compared against an already lowercased string
				re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
				parse: function( execResult ) {
					return [
						parseInt( execResult[ 1 ], 16 ),
						parseInt( execResult[ 2 ], 16 ),
						parseInt( execResult[ 3 ], 16 )
					];
				}
			}, {
				// this regex ignores A-F because it's compared against an already lowercased string
				re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
				parse: function( execResult ) {
					return [
						parseInt( execResult[ 1 ] + execResult[ 1 ], 16 ),
						parseInt( execResult[ 2 ] + execResult[ 2 ], 16 ),
						parseInt( execResult[ 3 ] + execResult[ 3 ], 16 )
					];
				}
			}, {
				re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
				space: "hsla",
				parse: function( execResult ) {
					return [
						execResult[ 1 ],
						execResult[ 2 ] / 100,
						execResult[ 3 ] / 100,
						execResult[ 4 ]
					];
				}
			}],

		// jQuery.Color( )
		color = jQuery.Color = function( color, green, blue, alpha ) {
			return new jQuery.Color.fn.parse( color, green, blue, alpha );
		},
		spaces = {
			rgba: {
				props: {
					red: {
						idx: 0,
						type: "byte"
					},
					green: {
						idx: 1,
						type: "byte"
					},
					blue: {
						idx: 2,
						type: "byte"
					}
				}
			},

			hsla: {
				props: {
					hue: {
						idx: 0,
						type: "degrees"
					},
					saturation: {
						idx: 1,
						type: "percent"
					},
					lightness: {
						idx: 2,
						type: "percent"
					}
				}
			}
		},
		propTypes = {
			"byte": {
				floor: true,
				max: 255
			},
			"percent": {
				max: 1
			},
			"degrees": {
				mod: 360,
				floor: true
			}
		},
		support = color.support = {},

		// element for support tests
		supportElem = jQuery( "<p>" )[ 0 ],

		// colors = jQuery.Color.names
		colors,

		// local aliases of functions called often
		each = jQuery.each;

	// determine rgba support immediately
	supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
	support.rgba = supportElem.style.backgroundColor.indexOf( "rgba" ) > -1;

	// define cache name and alpha properties
	// for rgba and hsla spaces
	each( spaces, function( spaceName, space ) {
		space.cache = "_" + spaceName;
		space.props.alpha = {
			idx: 3,
			type: "percent",
			def: 1
		};
	});

	function clamp( value, prop, allowEmpty ) {
		var type = propTypes[ prop.type ] || {};

		if ( value == null ) {
			return (allowEmpty || !prop.def) ? null : prop.def;
		}

		// ~~ is an short way of doing floor for positive numbers
		value = type.floor ? ~~value : parseFloat( value );

		// IE will pass in empty strings as value for alpha,
		// which will hit this case
		if ( isNaN( value ) ) {
			return prop.def;
		}

		if ( type.mod ) {
			// we add mod before modding to make sure that negatives values
			// get converted properly: -10 -> 350
			return (value + type.mod) % type.mod;
		}

		// for now all property types without mod have min and max
		return 0 > value ? 0 : type.max < value ? type.max : value;
	}

	function stringParse( string ) {
		var inst = color(),
			rgba = inst._rgba = [];

		string = string.toLowerCase();

		each( stringParsers, function( i, parser ) {
			var parsed,
				match = parser.re.exec( string ),
				values = match && parser.parse( match ),
				spaceName = parser.space || "rgba";

			if ( values ) {
				parsed = inst[ spaceName ]( values );

				// if this was an rgba parse the assignment might happen twice
				// oh well....
				inst[ spaces[ spaceName ].cache ] = parsed[ spaces[ spaceName ].cache ];
				rgba = inst._rgba = parsed._rgba;

				// exit each( stringParsers ) here because we matched
				return false;
			}
		});

		// Found a stringParser that handled it
		if ( rgba.length ) {

			// if this came from a parsed string, force "transparent" when alpha is 0
			// chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
			if ( rgba.join() === "0,0,0,0" ) {
				jQuery.extend( rgba, colors.transparent );
			}
			return inst;
		}

		// named colors
		return colors[ string ];
	}

	color.fn = jQuery.extend( color.prototype, {
		parse: function( red, green, blue, alpha ) {
			if ( red === undefined ) {
				this._rgba = [ null, null, null, null ];
				return this;
			}
			if ( red.jquery || red.nodeType ) {
				red = jQuery( red ).css( green );
				green = undefined;
			}

			var inst = this,
				type = jQuery.type( red ),
				rgba = this._rgba = [];

			// more than 1 argument specified - assume ( red, green, blue, alpha )
			if ( green !== undefined ) {
				red = [ red, green, blue, alpha ];
				type = "array";
			}

			if ( type === "string" ) {
				return this.parse( stringParse( red ) || colors._default );
			}

			if ( type === "array" ) {
				each( spaces.rgba.props, function( key, prop ) {
					rgba[ prop.idx ] = clamp( red[ prop.idx ], prop );
				});
				return this;
			}

			if ( type === "object" ) {
				if ( red instanceof color ) {
					each( spaces, function( spaceName, space ) {
						if ( red[ space.cache ] ) {
							inst[ space.cache ] = red[ space.cache ].slice();
						}
					});
				} else {
					each( spaces, function( spaceName, space ) {
						var cache = space.cache;
						each( space.props, function( key, prop ) {

							// if the cache doesn't exist, and we know how to convert
							if ( !inst[ cache ] && space.to ) {

								// if the value was null, we don't need to copy it
								// if the key was alpha, we don't need to copy it either
								if ( key === "alpha" || red[ key ] == null ) {
									return;
								}
								inst[ cache ] = space.to( inst._rgba );
							}

							// this is the only case where we allow nulls for ALL properties.
							// call clamp with alwaysAllowEmpty
							inst[ cache ][ prop.idx ] = clamp( red[ key ], prop, true );
						});

						// everything defined but alpha?
						if ( inst[ cache ] && jQuery.inArray( null, inst[ cache ].slice( 0, 3 ) ) < 0 ) {
							// use the default of 1
							inst[ cache ][ 3 ] = 1;
							if ( space.from ) {
								inst._rgba = space.from( inst[ cache ] );
							}
						}
					});
				}
				return this;
			}
		},
		is: function( compare ) {
			var is = color( compare ),
				same = true,
				inst = this;

			each( spaces, function( _, space ) {
				var localCache,
					isCache = is[ space.cache ];
				if (isCache) {
					localCache = inst[ space.cache ] || space.to && space.to( inst._rgba ) || [];
					each( space.props, function( _, prop ) {
						if ( isCache[ prop.idx ] != null ) {
							same = ( isCache[ prop.idx ] === localCache[ prop.idx ] );
							return same;
						}
					});
				}
				return same;
			});
			return same;
		},
		_space: function() {
			var used = [],
				inst = this;
			each( spaces, function( spaceName, space ) {
				if ( inst[ space.cache ] ) {
					used.push( spaceName );
				}
			});
			return used.pop();
		},
		transition: function( other, distance ) {
			var end = color( other ),
				spaceName = end._space(),
				space = spaces[ spaceName ],
				startColor = this.alpha() === 0 ? color( "transparent" ) : this,
				start = startColor[ space.cache ] || space.to( startColor._rgba ),
				result = start.slice();

			end = end[ space.cache ];
			each( space.props, function( key, prop ) {
				var index = prop.idx,
					startValue = start[ index ],
					endValue = end[ index ],
					type = propTypes[ prop.type ] || {};

				// if null, don't override start value
				if ( endValue === null ) {
					return;
				}
				// if null - use end
				if ( startValue === null ) {
					result[ index ] = endValue;
				} else {
					if ( type.mod ) {
						if ( endValue - startValue > type.mod / 2 ) {
							startValue += type.mod;
						} else if ( startValue - endValue > type.mod / 2 ) {
							startValue -= type.mod;
						}
					}
					result[ index ] = clamp( ( endValue - startValue ) * distance + startValue, prop );
				}
			});
			return this[ spaceName ]( result );
		},
		blend: function( opaque ) {
			// if we are already opaque - return ourself
			if ( this._rgba[ 3 ] === 1 ) {
				return this;
			}

			var rgb = this._rgba.slice(),
				a = rgb.pop(),
				blend = color( opaque )._rgba;

			return color( jQuery.map( rgb, function( v, i ) {
				return ( 1 - a ) * blend[ i ] + a * v;
			}));
		},
		toRgbaString: function() {
			var prefix = "rgba(",
				rgba = jQuery.map( this._rgba, function( v, i ) {
					return v == null ? ( i > 2 ? 1 : 0 ) : v;
				});

			if ( rgba[ 3 ] === 1 ) {
				rgba.pop();
				prefix = "rgb(";
			}

			return prefix + rgba.join() + ")";
		},
		toHslaString: function() {
			var prefix = "hsla(",
				hsla = jQuery.map( this.hsla(), function( v, i ) {
					if ( v == null ) {
						v = i > 2 ? 1 : 0;
					}

					// catch 1 and 2
					if ( i && i < 3 ) {
						v = Math.round( v * 100 ) + "%";
					}
					return v;
				});

			if ( hsla[ 3 ] === 1 ) {
				hsla.pop();
				prefix = "hsl(";
			}
			return prefix + hsla.join() + ")";
		},
		toHexString: function( includeAlpha ) {
			var rgba = this._rgba.slice(),
				alpha = rgba.pop();

			if ( includeAlpha ) {
				rgba.push( ~~( alpha * 255 ) );
			}

			return "#" + jQuery.map( rgba, function( v ) {

				// default to 0 when nulls exist
				v = ( v || 0 ).toString( 16 );
				return v.length === 1 ? "0" + v : v;
			}).join("");
		},
		toString: function() {
			return this._rgba[ 3 ] === 0 ? "transparent" : this.toRgbaString();
		}
	});
	color.fn.parse.prototype = color.fn;

	// hsla conversions adapted from:
	// https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021

	function hue2rgb( p, q, h ) {
		h = ( h + 1 ) % 1;
		if ( h * 6 < 1 ) {
			return p + (q - p) * h * 6;
		}
		if ( h * 2 < 1) {
			return q;
		}
		if ( h * 3 < 2 ) {
			return p + (q - p) * ((2/3) - h) * 6;
		}
		return p;
	}

	spaces.hsla.to = function ( rgba ) {
		if ( rgba[ 0 ] == null || rgba[ 1 ] == null || rgba[ 2 ] == null ) {
			return [ null, null, null, rgba[ 3 ] ];
		}
		var r = rgba[ 0 ] / 255,
			g = rgba[ 1 ] / 255,
			b = rgba[ 2 ] / 255,
			a = rgba[ 3 ],
			max = Math.max( r, g, b ),
			min = Math.min( r, g, b ),
			diff = max - min,
			add = max + min,
			l = add * 0.5,
			h, s;

		if ( min === max ) {
			h = 0;
		} else if ( r === max ) {
			h = ( 60 * ( g - b ) / diff ) + 360;
		} else if ( g === max ) {
			h = ( 60 * ( b - r ) / diff ) + 120;
		} else {
			h = ( 60 * ( r - g ) / diff ) + 240;
		}

		// chroma (diff) == 0 means greyscale which, by definition, saturation = 0%
		// otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)
		if ( diff === 0 ) {
			s = 0;
		} else if ( l <= 0.5 ) {
			s = diff / add;
		} else {
			s = diff / ( 2 - add );
		}
		return [ Math.round(h) % 360, s, l, a == null ? 1 : a ];
	};

	spaces.hsla.from = function ( hsla ) {
		if ( hsla[ 0 ] == null || hsla[ 1 ] == null || hsla[ 2 ] == null ) {
			return [ null, null, null, hsla[ 3 ] ];
		}
		var h = hsla[ 0 ] / 360,
			s = hsla[ 1 ],
			l = hsla[ 2 ],
			a = hsla[ 3 ],
			q = l <= 0.5 ? l * ( 1 + s ) : l + s - l * s,
			p = 2 * l - q;

		return [
			Math.round( hue2rgb( p, q, h + ( 1 / 3 ) ) * 255 ),
			Math.round( hue2rgb( p, q, h ) * 255 ),
			Math.round( hue2rgb( p, q, h - ( 1 / 3 ) ) * 255 ),
			a
		];
	};


	each( spaces, function( spaceName, space ) {
		var props = space.props,
			cache = space.cache,
			to = space.to,
			from = space.from;

		// makes rgba() and hsla()
		color.fn[ spaceName ] = function( value ) {

			// generate a cache for this space if it doesn't exist
			if ( to && !this[ cache ] ) {
				this[ cache ] = to( this._rgba );
			}
			if ( value === undefined ) {
				return this[ cache ].slice();
			}

			var ret,
				type = jQuery.type( value ),
				arr = ( type === "array" || type === "object" ) ? value : arguments,
				local = this[ cache ].slice();

			each( props, function( key, prop ) {
				var val = arr[ type === "object" ? key : prop.idx ];
				if ( val == null ) {
					val = local[ prop.idx ];
				}
				local[ prop.idx ] = clamp( val, prop );
			});

			if ( from ) {
				ret = color( from( local ) );
				ret[ cache ] = local;
				return ret;
			} else {
				return color( local );
			}
		};

		// makes red() green() blue() alpha() hue() saturation() lightness()
		each( props, function( key, prop ) {
			// alpha is included in more than one space
			if ( color.fn[ key ] ) {
				return;
			}
			color.fn[ key ] = function( value ) {
				var vtype = jQuery.type( value ),
					fn = ( key === "alpha" ? ( this._hsla ? "hsla" : "rgba" ) : spaceName ),
					local = this[ fn ](),
					cur = local[ prop.idx ],
					match;

				if ( vtype === "undefined" ) {
					return cur;
				}

				if ( vtype === "function" ) {
					value = value.call( this, cur );
					vtype = jQuery.type( value );
				}
				if ( value == null && prop.empty ) {
					return this;
				}
				if ( vtype === "string" ) {
					match = rplusequals.exec( value );
					if ( match ) {
						value = cur + parseFloat( match[ 2 ] ) * ( match[ 1 ] === "+" ? 1 : -1 );
					}
				}
				local[ prop.idx ] = value;
				return this[ fn ]( local );
			};
		});
	});

	// add cssHook and .fx.step function for each named hook.
	// accept a space separated string of properties
	color.hook = function( hook ) {
		var hooks = hook.split( " " );
		each( hooks, function( i, hook ) {
			jQuery.cssHooks[ hook ] = {
				set: function( elem, value ) {
					var parsed, curElem,
						backgroundColor = "";

					if ( value !== "transparent" && ( jQuery.type( value ) !== "string" || ( parsed = stringParse( value ) ) ) ) {
						value = color( parsed || value );
						if ( !support.rgba && value._rgba[ 3 ] !== 1 ) {
							curElem = hook === "backgroundColor" ? elem.parentNode : elem;
							while (
								(backgroundColor === "" || backgroundColor === "transparent") &&
								curElem && curElem.style
							) {
								try {
									backgroundColor = jQuery.css( curElem, "backgroundColor" );
									curElem = curElem.parentNode;
								} catch ( e ) {
								}
							}

							value = value.blend( backgroundColor && backgroundColor !== "transparent" ?
								backgroundColor :
								"_default" );
						}

						value = value.toRgbaString();
					}
					try {
						elem.style[ hook ] = value;
					} catch( e ) {
						// wrapped to prevent IE from throwing errors on "invalid" values like 'auto' or 'inherit'
					}
				}
			};
			jQuery.fx.step[ hook ] = function( fx ) {
				if ( !fx.colorInit ) {
					fx.start = color( fx.elem, hook );
					fx.end = color( fx.end );
					fx.colorInit = true;
				}
				jQuery.cssHooks[ hook ].set( fx.elem, fx.start.transition( fx.end, fx.pos ) );
			};
		});

	};

	color.hook( stepHooks );

	jQuery.cssHooks.borderColor = {
		expand: function( value ) {
			var expanded = {};

			each( [ "Top", "Right", "Bottom", "Left" ], function( i, part ) {
				expanded[ "border" + part + "Color" ] = value;
			});
			return expanded;
		}
	};

	// Basic color names only.
	// Usage of any of the other color names requires adding yourself or including
	// jquery.color.svg-names.js.
	colors = jQuery.Color.names = {
		// 4.1. Basic color keywords
		aqua: "#00ffff",
		black: "#000000",
		blue: "#0000ff",
		fuchsia: "#ff00ff",
		gray: "#808080",
		green: "#008000",
		lime: "#00ff00",
		maroon: "#800000",
		navy: "#000080",
		olive: "#808000",
		purple: "#800080",
		red: "#ff0000",
		silver: "#c0c0c0",
		teal: "#008080",
		white: "#ffffff",
		yellow: "#ffff00",

		// 4.2.3. "transparent" color keyword
		transparent: [ null, null, null, 0 ],

		_default: "#ffffff"
	};

})( jQuery );



})( jQuery );




// Knockout JavaScript library v3.0.0
// (c) Steven Sanderson - http://knockoutjs.com/
// License: MIT (http://www.opensource.org/licenses/mit-license.php)

(function() {(function(q){var y=this||(0,eval)("this"),w=y.document,K=y.navigator,u=y.jQuery,B=y.JSON;(function(q){"function"===typeof require&&"object"===typeof exports&&"object"===typeof module?q(module.exports||exports):"function"===typeof define&&define.amd?define(["exports"],q):q(y.ko={})})(function(F){function G(a,c){return null===a||typeof a in N?a===c:!1}function H(b,c,d,e){a.d[b]={init:function(b){a.a.f.set(b,L,{});return{controlsDescendantBindings:!0}},update:function(b,h,k,m,f){k=a.a.f.get(b,L);h=a.a.c(h());
m=!d!==!h;var p=!k.ob;if(p||c||m!==k.Db)p&&(k.ob=a.a.Ya(a.e.childNodes(b),!0)),m?(p||a.e.S(b,a.a.Ya(k.ob)),a.Ta(e?e(f,h):f,b)):a.e.Z(b),k.Db=m}};a.g.Y[b]=!1;a.e.P[b]=!0}var a="undefined"!==typeof F?F:{};a.b=function(b,c){for(var d=b.split("."),e=a,g=0;g<d.length-1;g++)e=e[d[g]];e[d[d.length-1]]=c};a.s=function(a,c,d){a[c]=d};a.version="3.0.0";a.b("version",a.version);a.a=function(){function b(a,b){for(var f in a)a.hasOwnProperty(f)&&b(f,a[f])}function c(k,b){if("input"!==a.a.v(k)||!k.type||"click"!=
b.toLowerCase())return!1;var f=k.type;return"checkbox"==f||"radio"==f}var d={},e={};d[K&&/Firefox\/2/i.test(K.userAgent)?"KeyboardEvent":"UIEvents"]=["keyup","keydown","keypress"];d.MouseEvents="click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave".split(" ");b(d,function(a,b){if(b.length)for(var f=0,c=b.length;f<c;f++)e[b[f]]=a});var g={propertychange:!0},h=w&&function(){for(var a=3,b=w.createElement("div"),f=b.getElementsByTagName("i");b.innerHTML="\x3c!--[if gt IE "+
++a+"]><i></i><![endif]--\x3e",f[0];);return 4<a?a:q}();return{$a:["authenticity_token",/^__RequestVerificationToken(_.*)?$/],n:function(a,b){for(var f=0,c=a.length;f<c;f++)b(a[f])},l:function(a,b){if("function"==typeof Array.prototype.indexOf)return Array.prototype.indexOf.call(a,b);for(var f=0,c=a.length;f<c;f++)if(a[f]===b)return f;return-1},Ua:function(a,b,f){for(var c=0,d=a.length;c<d;c++)if(b.call(f,a[c]))return a[c];return null},ia:function(b,c){var f=a.a.l(b,c);0<=f&&b.splice(f,1)},Va:function(b){b=
b||[];for(var c=[],f=0,d=b.length;f<d;f++)0>a.a.l(c,b[f])&&c.push(b[f]);return c},ha:function(a,b){a=a||[];for(var f=[],c=0,d=a.length;c<d;c++)f.push(b(a[c]));return f},ga:function(a,b){a=a||[];for(var f=[],c=0,d=a.length;c<d;c++)b(a[c])&&f.push(a[c]);return f},X:function(a,b){if(b instanceof Array)a.push.apply(a,b);else for(var f=0,c=b.length;f<c;f++)a.push(b[f]);return a},V:function(b,c,f){var d=a.a.l(a.a.Ha(b),c);0>d?f&&b.push(c):f||b.splice(d,1)},extend:function(a,b){if(b)for(var f in b)b.hasOwnProperty(f)&&
(a[f]=b[f]);return a},K:b,Da:function(a,b){if(!a)return a;var f={},c;for(c in a)a.hasOwnProperty(c)&&(f[c]=b(a[c],c,a));return f},wa:function(b){for(;b.firstChild;)a.removeNode(b.firstChild)},Vb:function(b){b=a.a.Q(b);for(var c=w.createElement("div"),f=0,d=b.length;f<d;f++)c.appendChild(a.L(b[f]));return c},Ya:function(b,c){for(var f=0,d=b.length,e=[];f<d;f++){var g=b[f].cloneNode(!0);e.push(c?a.L(g):g)}return e},S:function(b,c){a.a.wa(b);if(c)for(var f=0,d=c.length;f<d;f++)b.appendChild(c[f])},nb:function(b,
c){var f=b.nodeType?[b]:b;if(0<f.length){for(var d=f[0],e=d.parentNode,g=0,n=c.length;g<n;g++)e.insertBefore(c[g],d);g=0;for(n=f.length;g<n;g++)a.removeNode(f[g])}},$:function(a,b){if(a.length){for(b=8===b.nodeType&&b.parentNode||b;a.length&&a[0].parentNode!==b;)a.splice(0,1);if(1<a.length){var f=a[0],c=a[a.length-1];for(a.length=0;f!==c;)if(a.push(f),f=f.nextSibling,!f)return;a.push(c)}}return a},qb:function(a,b){7>h?a.setAttribute("selected",b):a.selected=b},la:function(a){return null===a||a===
q?"":a.trim?a.trim():a.toString().replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},ec:function(b,c){for(var f=[],d=(b||"").split(c),e=0,g=d.length;e<g;e++){var n=a.a.la(d[e]);""!==n&&f.push(n)}return f},ac:function(a,b){a=a||"";return b.length>a.length?!1:a.substring(0,b.length)===b},Gb:function(a,b){if(a===b)return!0;if(11===a.nodeType)return!1;if(b.contains)return b.contains(3===a.nodeType?a.parentNode:a);if(b.compareDocumentPosition)return 16==(b.compareDocumentPosition(a)&16);for(;a&&a!=b;)a=a.parentNode;
return!!a},va:function(b){return a.a.Gb(b,b.ownerDocument.documentElement)},Ra:function(b){return!!a.a.Ua(b,a.a.va)},v:function(a){return a&&a.tagName&&a.tagName.toLowerCase()},r:function(b,d,f){var e=h&&g[d];if(e||"undefined"==typeof u)if(e||"function"!=typeof b.addEventListener)if("undefined"!=typeof b.attachEvent){var s=function(a){f.call(b,a)},l="on"+d;b.attachEvent(l,s);a.a.C.ea(b,function(){b.detachEvent(l,s)})}else throw Error("Browser doesn't support addEventListener or attachEvent");else b.addEventListener(d,
f,!1);else{if(c(b,d)){var n=f;f=function(a,b){var f=this.checked;b&&(this.checked=!0!==b.Ab);n.call(this,a);this.checked=f}}u(b).bind(d,f)}},da:function(a,b){if(!a||!a.nodeType)throw Error("element must be a DOM node when calling triggerEvent");if("undefined"!=typeof u){var f=[];c(a,b)&&f.push({Ab:a.checked});u(a).trigger(b,f)}else if("function"==typeof w.createEvent)if("function"==typeof a.dispatchEvent)f=w.createEvent(e[b]||"HTMLEvents"),f.initEvent(b,!0,!0,y,0,0,0,0,0,!1,!1,!1,!1,0,a),a.dispatchEvent(f);
else throw Error("The supplied element doesn't support dispatchEvent");else if("undefined"!=typeof a.fireEvent)c(a,b)&&(a.checked=!0!==a.checked),a.fireEvent("on"+b);else throw Error("Browser doesn't support triggering events");},c:function(b){return a.M(b)?b():b},Ha:function(b){return a.M(b)?b.t():b},ma:function(b,c,f){if(c){var d=/\S+/g,e=b.className.match(d)||[];a.a.n(c.match(d),function(b){a.a.V(e,b,f)});b.className=e.join(" ")}},Ma:function(b,c){var f=a.a.c(c);if(null===f||f===q)f="";var d=a.e.firstChild(b);
!d||3!=d.nodeType||a.e.nextSibling(d)?a.e.S(b,[w.createTextNode(f)]):d.data=f;a.a.Jb(b)},pb:function(a,b){a.name=b;if(7>=h)try{a.mergeAttributes(w.createElement("<input name='"+a.name+"'/>"),!1)}catch(f){}},Jb:function(a){9<=h&&(a=1==a.nodeType?a:a.parentNode,a.style&&(a.style.zoom=a.style.zoom))},Hb:function(a){if(h){var b=a.style.width;a.style.width=0;a.style.width=b}},Zb:function(b,c){b=a.a.c(b);c=a.a.c(c);for(var f=[],d=b;d<=c;d++)f.push(d);return f},Q:function(a){for(var b=[],c=0,d=a.length;c<
d;c++)b.push(a[c]);return b},cc:6===h,dc:7===h,ja:h,ab:function(b,c){for(var f=a.a.Q(b.getElementsByTagName("input")).concat(a.a.Q(b.getElementsByTagName("textarea"))),d="string"==typeof c?function(a){return a.name===c}:function(a){return c.test(a.name)},e=[],g=f.length-1;0<=g;g--)d(f[g])&&e.push(f[g]);return e},Wb:function(b){return"string"==typeof b&&(b=a.a.la(b))?B&&B.parse?B.parse(b):(new Function("return "+b))():null},Na:function(b,c,f){if(!B||!B.stringify)throw Error("Cannot find JSON.stringify(). Some browsers (e.g., IE < 8) don't support it natively, but you can overcome this by adding a script reference to json2.js, downloadable from http://www.json.org/json2.js");
return B.stringify(a.a.c(b),c,f)},Xb:function(c,d,f){f=f||{};var e=f.params||{},g=f.includeFields||this.$a,h=c;if("object"==typeof c&&"form"===a.a.v(c))for(var h=c.action,n=g.length-1;0<=n;n--)for(var r=a.a.ab(c,g[n]),v=r.length-1;0<=v;v--)e[r[v].name]=r[v].value;d=a.a.c(d);var t=w.createElement("form");t.style.display="none";t.action=h;t.method="post";for(var E in d)c=w.createElement("input"),c.name=E,c.value=a.a.Na(a.a.c(d[E])),t.appendChild(c);b(e,function(a,b){var c=w.createElement("input");c.name=
a;c.value=b;t.appendChild(c)});w.body.appendChild(t);f.submitter?f.submitter(t):t.submit();setTimeout(function(){t.parentNode.removeChild(t)},0)}}}();a.b("utils",a.a);a.b("utils.arrayForEach",a.a.n);a.b("utils.arrayFirst",a.a.Ua);a.b("utils.arrayFilter",a.a.ga);a.b("utils.arrayGetDistinctValues",a.a.Va);a.b("utils.arrayIndexOf",a.a.l);a.b("utils.arrayMap",a.a.ha);a.b("utils.arrayPushAll",a.a.X);a.b("utils.arrayRemoveItem",a.a.ia);a.b("utils.extend",a.a.extend);a.b("utils.fieldsIncludedWithJsonPost",
a.a.$a);a.b("utils.getFormFields",a.a.ab);a.b("utils.peekObservable",a.a.Ha);a.b("utils.postJson",a.a.Xb);a.b("utils.parseJson",a.a.Wb);a.b("utils.registerEventHandler",a.a.r);a.b("utils.stringifyJson",a.a.Na);a.b("utils.range",a.a.Zb);a.b("utils.toggleDomNodeCssClass",a.a.ma);a.b("utils.triggerEvent",a.a.da);a.b("utils.unwrapObservable",a.a.c);a.b("utils.objectForEach",a.a.K);a.b("utils.addOrRemoveItem",a.a.V);a.b("unwrap",a.a.c);Function.prototype.bind||(Function.prototype.bind=function(a){var c=
this,d=Array.prototype.slice.call(arguments);a=d.shift();return function(){return c.apply(a,d.concat(Array.prototype.slice.call(arguments)))}});a.a.f=new function(){function a(b,h){var k=b[d];if(!k||"null"===k||!e[k]){if(!h)return q;k=b[d]="ko"+c++;e[k]={}}return e[k]}var c=0,d="__ko__"+(new Date).getTime(),e={};return{get:function(c,d){var e=a(c,!1);return e===q?q:e[d]},set:function(c,d,e){if(e!==q||a(c,!1)!==q)a(c,!0)[d]=e},clear:function(a){var b=a[d];return b?(delete e[b],a[d]=null,!0):!1},D:function(){return c++ +
d}}};a.b("utils.domData",a.a.f);a.b("utils.domData.clear",a.a.f.clear);a.a.C=new function(){function b(b,c){var e=a.a.f.get(b,d);e===q&&c&&(e=[],a.a.f.set(b,d,e));return e}function c(d){var e=b(d,!1);if(e)for(var e=e.slice(0),m=0;m<e.length;m++)e[m](d);a.a.f.clear(d);"function"==typeof u&&"function"==typeof u.cleanData&&u.cleanData([d]);if(g[d.nodeType])for(e=d.firstChild;d=e;)e=d.nextSibling,8===d.nodeType&&c(d)}var d=a.a.f.D(),e={1:!0,8:!0,9:!0},g={1:!0,9:!0};return{ea:function(a,c){if("function"!=
typeof c)throw Error("Callback must be a function");b(a,!0).push(c)},mb:function(c,e){var g=b(c,!1);g&&(a.a.ia(g,e),0==g.length&&a.a.f.set(c,d,q))},L:function(b){if(e[b.nodeType]&&(c(b),g[b.nodeType])){var d=[];a.a.X(d,b.getElementsByTagName("*"));for(var m=0,f=d.length;m<f;m++)c(d[m])}return b},removeNode:function(b){a.L(b);b.parentNode&&b.parentNode.removeChild(b)}}};a.L=a.a.C.L;a.removeNode=a.a.C.removeNode;a.b("cleanNode",a.L);a.b("removeNode",a.removeNode);a.b("utils.domNodeDisposal",a.a.C);
a.b("utils.domNodeDisposal.addDisposeCallback",a.a.C.ea);a.b("utils.domNodeDisposal.removeDisposeCallback",a.a.C.mb);(function(){a.a.Fa=function(b){var c;if("undefined"!=typeof u)if(u.parseHTML)c=u.parseHTML(b)||[];else{if((c=u.clean([b]))&&c[0]){for(b=c[0];b.parentNode&&11!==b.parentNode.nodeType;)b=b.parentNode;b.parentNode&&b.parentNode.removeChild(b)}}else{var d=a.a.la(b).toLowerCase();c=w.createElement("div");d=d.match(/^<(thead|tbody|tfoot)/)&&[1,"<table>","</table>"]||!d.indexOf("<tr")&&[2,
"<table><tbody>","</tbody></table>"]||(!d.indexOf("<td")||!d.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||[0,"",""];b="ignored<div>"+d[1]+b+d[2]+"</div>";for("function"==typeof y.innerShiv?c.appendChild(y.innerShiv(b)):c.innerHTML=b;d[0]--;)c=c.lastChild;c=a.a.Q(c.lastChild.childNodes)}return c};a.a.Ka=function(b,c){a.a.wa(b);c=a.a.c(c);if(null!==c&&c!==q)if("string"!=typeof c&&(c=c.toString()),"undefined"!=typeof u)u(b).html(c);else for(var d=a.a.Fa(c),e=0;e<d.length;e++)b.appendChild(d[e])}})();
a.b("utils.parseHtmlFragment",a.a.Fa);a.b("utils.setHtml",a.a.Ka);a.u=function(){function b(c,e){if(c)if(8==c.nodeType){var g=a.u.jb(c.nodeValue);null!=g&&e.push({Fb:c,Tb:g})}else if(1==c.nodeType)for(var g=0,h=c.childNodes,k=h.length;g<k;g++)b(h[g],e)}var c={};return{Ca:function(a){if("function"!=typeof a)throw Error("You can only pass a function to ko.memoization.memoize()");var b=(4294967296*(1+Math.random())|0).toString(16).substring(1)+(4294967296*(1+Math.random())|0).toString(16).substring(1);
c[b]=a;return"\x3c!--[ko_memo:"+b+"]--\x3e"},ub:function(a,b){var g=c[a];if(g===q)throw Error("Couldn't find any memo with ID "+a+". Perhaps it's already been unmemoized.");try{return g.apply(null,b||[]),!0}finally{delete c[a]}},vb:function(c,e){var g=[];b(c,g);for(var h=0,k=g.length;h<k;h++){var m=g[h].Fb,f=[m];e&&a.a.X(f,e);a.u.ub(g[h].Tb,f);m.nodeValue="";m.parentNode&&m.parentNode.removeChild(m)}},jb:function(a){return(a=a.match(/^\[ko_memo\:(.*?)\]$/))?a[1]:null}}}();a.b("memoization",a.u);a.b("memoization.memoize",
a.u.Ca);a.b("memoization.unmemoize",a.u.ub);a.b("memoization.parseMemoText",a.u.jb);a.b("memoization.unmemoizeDomNodeAndDescendants",a.u.vb);a.xa={throttle:function(b,c){b.throttleEvaluation=c;var d=null;return a.h({read:b,write:function(a){clearTimeout(d);d=setTimeout(function(){b(a)},c)}})},notify:function(a,c){a.equalityComparer="always"==c?null:G}};var N={undefined:1,"boolean":1,number:1,string:1};a.b("extenders",a.xa);a.sb=function(b,c,d){this.target=b;this.qa=c;this.Eb=d;a.s(this,"dispose",
this.B)};a.sb.prototype.B=function(){this.Qb=!0;this.Eb()};a.ca=function(){this.F={};a.a.extend(this,a.ca.fn);a.s(this,"subscribe",this.T);a.s(this,"extend",this.extend);a.s(this,"getSubscriptionsCount",this.Lb)};var I="change";a.ca.fn={T:function(b,c,d){d=d||I;var e=new a.sb(this,c?b.bind(c):b,function(){a.a.ia(this.F[d],e)}.bind(this));this.F[d]||(this.F[d]=[]);this.F[d].push(e);return e},notifySubscribers:function(b,c){c=c||I;if(this.cb(c))try{a.i.Wa();for(var d=this.F[c].slice(0),e=0,g;g=d[e];++e)g&&
!0!==g.Qb&&g.qa(b)}finally{a.i.end()}},cb:function(a){return this.F[a]&&this.F[a].length},Lb:function(){var b=0;a.a.K(this.F,function(a,d){b+=d.length});return b},extend:function(b){var c=this;b&&a.a.K(b,function(b,e){var g=a.xa[b];"function"==typeof g&&(c=g(c,e)||c)});return c}};a.fb=function(a){return null!=a&&"function"==typeof a.T&&"function"==typeof a.notifySubscribers};a.b("subscribable",a.ca);a.b("isSubscribable",a.fb);a.i=function(){var b=[];return{Wa:function(a){b.push(a&&{qa:a,Za:[]})},
end:function(){b.pop()},lb:function(c){if(!a.fb(c))throw Error("Only subscribable things can act as dependencies");if(0<b.length){var d=b[b.length-1];!d||0<=a.a.l(d.Za,c)||(d.Za.push(c),d.qa(c))}},p:function(a,d,e){try{return b.push(null),a.apply(d,e||[])}finally{b.pop()}}}}();a.q=function(b){function c(){if(0<arguments.length)return c.equalityComparer&&c.equalityComparer(d,arguments[0])||(c.O(),d=arguments[0],c.N()),this;a.i.lb(c);return d}var d=b;a.ca.call(c);c.t=function(){return d};c.N=function(){c.notifySubscribers(d)};
c.O=function(){c.notifySubscribers(d,"beforeChange")};a.a.extend(c,a.q.fn);a.s(c,"peek",c.t);a.s(c,"valueHasMutated",c.N);a.s(c,"valueWillMutate",c.O);return c};a.q.fn={equalityComparer:G};var C=a.q.Yb="__ko_proto__";a.q.fn[C]=a.q;a.ya=function(b,c){return null===b||b===q||b[C]===q?!1:b[C]===c?!0:a.ya(b[C],c)};a.M=function(b){return a.ya(b,a.q)};a.gb=function(b){return"function"==typeof b&&b[C]===a.q||"function"==typeof b&&b[C]===a.h&&b.Nb?!0:!1};a.b("observable",a.q);a.b("isObservable",a.M);a.b("isWriteableObservable",
a.gb);a.ba=function(b){b=b||[];if("object"!=typeof b||!("length"in b))throw Error("The argument passed when initializing an observable array must be an array, or null, or undefined.");b=a.q(b);a.a.extend(b,a.ba.fn);return b.extend({trackArrayChanges:!0})};a.ba.fn={remove:function(b){for(var c=this.t(),d=[],e="function"!=typeof b||a.M(b)?function(a){return a===b}:b,g=0;g<c.length;g++){var h=c[g];e(h)&&(0===d.length&&this.O(),d.push(h),c.splice(g,1),g--)}d.length&&this.N();return d},removeAll:function(b){if(b===
q){var c=this.t(),d=c.slice(0);this.O();c.splice(0,c.length);this.N();return d}return b?this.remove(function(c){return 0<=a.a.l(b,c)}):[]},destroy:function(b){var c=this.t(),d="function"!=typeof b||a.M(b)?function(a){return a===b}:b;this.O();for(var e=c.length-1;0<=e;e--)d(c[e])&&(c[e]._destroy=!0);this.N()},destroyAll:function(b){return b===q?this.destroy(function(){return!0}):b?this.destroy(function(c){return 0<=a.a.l(b,c)}):[]},indexOf:function(b){var c=this();return a.a.l(c,b)},replace:function(a,
c){var d=this.indexOf(a);0<=d&&(this.O(),this.t()[d]=c,this.N())}};a.a.n("pop push reverse shift sort splice unshift".split(" "),function(b){a.ba.fn[b]=function(){var a=this.t();this.O();this.Xa(a,b,arguments);a=a[b].apply(a,arguments);this.N();return a}});a.a.n(["slice"],function(b){a.ba.fn[b]=function(){var a=this();return a[b].apply(a,arguments)}});a.b("observableArray",a.ba);var J="arrayChange";a.xa.trackArrayChanges=function(b){function c(){if(!d){d=!0;var c=b.notifySubscribers;b.notifySubscribers=
function(a,b){b&&b!==I||++g;return c.apply(this,arguments)};var m=[].concat(b.t()||[]);e=null;b.T(function(c){c=[].concat(c||[]);if(b.cb(J)){var d;if(!e||1<g)e=a.a.ra(m,c,{sparse:!0});d=e;d.length&&b.notifySubscribers(d,J)}m=c;e=null;g=0})}}if(!b.Xa){var d=!1,e=null,g=0,h=b.T;b.T=b.subscribe=function(a,b,f){f===J&&c();return h.apply(this,arguments)};b.Xa=function(a,b,c){function p(a,b,c){h.push({status:a,value:b,index:c})}if(d&&!g){var h=[],l=a.length,n=c.length,r=0;switch(b){case "push":r=l;case "unshift":for(b=
0;b<n;b++)p("added",c[b],r+b);break;case "pop":r=l-1;case "shift":l&&p("deleted",a[r],r);break;case "splice":b=Math.min(Math.max(0,0>c[0]?l+c[0]:c[0]),l);for(var l=1===n?l:Math.min(b+(c[1]||0),l),n=b+n-2,r=Math.max(l,n),v=2;b<r;++b,++v)b<l&&p("deleted",a[b],b),b<n&&p("added",c[v],b);break;default:return}e=h}}}};a.h=function(b,c,d){function e(){a.a.n(z,function(a){a.B()});z=[]}function g(){var a=k.throttleEvaluation;a&&0<=a?(clearTimeout(x),x=setTimeout(h,a)):h()}function h(){if(!s){if(E&&E()){if(!l){D();
p=!0;return}}else l=!1;s=!0;try{var b=a.a.ha(z,function(a){return a.target});a.i.Wa(function(c){var d;0<=(d=a.a.l(b,c))?b[d]=q:z.push(c.T(g))});for(var d=c?n.call(c):n(),e=b.length-1;0<=e;e--)b[e]&&z.splice(e,1)[0].B();p=!0;k.equalityComparer&&k.equalityComparer(f,d)||(k.notifySubscribers(f,"beforeChange"),f=d,k.notifySubscribers(f))}finally{a.i.end(),s=!1}z.length||D()}}function k(){if(0<arguments.length){if("function"===typeof r)r.apply(c,arguments);else throw Error("Cannot write a value to a ko.computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
return this}p||h();a.i.lb(k);return f}function m(){return!p||0<z.length}var f,p=!1,s=!1,l=!1,n=b;n&&"object"==typeof n?(d=n,n=d.read):(d=d||{},n||(n=d.read));if("function"!=typeof n)throw Error("Pass a function that returns the value of the ko.computed");var r=d.write,v=d.disposeWhenNodeIsRemoved||d.I||null,t=d.disposeWhen||d.ua,E=t,D=e,z=[],x=null;c||(c=d.owner);k.t=function(){p||h();return f};k.Kb=function(){return z.length};k.Nb="function"===typeof d.write;k.B=function(){D()};k.aa=m;a.ca.call(k);
a.a.extend(k,a.h.fn);a.s(k,"peek",k.t);a.s(k,"dispose",k.B);a.s(k,"isActive",k.aa);a.s(k,"getDependenciesCount",k.Kb);v&&(l=!0,v.nodeType&&(E=function(){return!a.a.va(v)||t&&t()}));!0!==d.deferEvaluation&&h();v&&m()&&(D=function(){a.a.C.mb(v,D);e()},a.a.C.ea(v,D));return k};a.Pb=function(b){return a.ya(b,a.h)};F=a.q.Yb;a.h[F]=a.q;a.h.fn={equalityComparer:G};a.h.fn[F]=a.h;a.b("dependentObservable",a.h);a.b("computed",a.h);a.b("isComputed",a.Pb);(function(){function b(a,g,h){h=h||new d;a=g(a);if("object"!=
typeof a||null===a||a===q||a instanceof Date||a instanceof String||a instanceof Number||a instanceof Boolean)return a;var k=a instanceof Array?[]:{};h.save(a,k);c(a,function(c){var d=g(a[c]);switch(typeof d){case "boolean":case "number":case "string":case "function":k[c]=d;break;case "object":case "undefined":var p=h.get(d);k[c]=p!==q?p:b(d,g,h)}});return k}function c(a,b){if(a instanceof Array){for(var c=0;c<a.length;c++)b(c);"function"==typeof a.toJSON&&b("toJSON")}else for(c in a)b(c)}function d(){this.keys=
[];this.Qa=[]}a.tb=function(c){if(0==arguments.length)throw Error("When calling ko.toJS, pass the object you want to convert.");return b(c,function(b){for(var c=0;a.M(b)&&10>c;c++)b=b();return b})};a.toJSON=function(b,c,d){b=a.tb(b);return a.a.Na(b,c,d)};d.prototype={save:function(b,c){var d=a.a.l(this.keys,b);0<=d?this.Qa[d]=c:(this.keys.push(b),this.Qa.push(c))},get:function(b){b=a.a.l(this.keys,b);return 0<=b?this.Qa[b]:q}}})();a.b("toJS",a.tb);a.b("toJSON",a.toJSON);(function(){a.k={o:function(b){switch(a.a.v(b)){case "option":return!0===
b.__ko__hasDomDataOptionValue__?a.a.f.get(b,a.d.options.Ea):7>=a.a.ja?b.getAttributeNode("value")&&b.getAttributeNode("value").specified?b.value:b.text:b.value;case "select":return 0<=b.selectedIndex?a.k.o(b.options[b.selectedIndex]):q;default:return b.value}},na:function(b,c){switch(a.a.v(b)){case "option":switch(typeof c){case "string":a.a.f.set(b,a.d.options.Ea,q);"__ko__hasDomDataOptionValue__"in b&&delete b.__ko__hasDomDataOptionValue__;b.value=c;break;default:a.a.f.set(b,a.d.options.Ea,c),b.__ko__hasDomDataOptionValue__=
!0,b.value="number"===typeof c?c:""}break;case "select":""===c&&(c=q);if(null===c||c===q)b.selectedIndex=-1;for(var d=b.options.length-1;0<=d;d--)if(a.k.o(b.options[d])==c){b.selectedIndex=d;break}1<b.size||-1!==b.selectedIndex||(b.selectedIndex=0);break;default:if(null===c||c===q)c="";b.value=c}}}})();a.b("selectExtensions",a.k);a.b("selectExtensions.readValue",a.k.o);a.b("selectExtensions.writeValue",a.k.na);a.g=function(){function b(b){b=a.a.la(b);123===b.charCodeAt(0)&&(b=b.slice(1,-1));var c=
[],d=b.match(e),k,l,n=0;if(d){d.push(",");for(var r=0,v;v=d[r];++r){var t=v.charCodeAt(0);if(44===t){if(0>=n){k&&c.push(l?{key:k,value:l.join("")}:{unknown:k});k=l=n=0;continue}}else if(58===t){if(!l)continue}else if(47===t&&r&&1<v.length)(t=d[r-1].match(g))&&!h[t[0]]&&(b=b.substr(b.indexOf(v)+1),d=b.match(e),d.push(","),r=-1,v="/");else if(40===t||123===t||91===t)++n;else if(41===t||125===t||93===t)--n;else if(!k&&!l){k=34===t||39===t?v.slice(1,-1):v;continue}l?l.push(v):l=[v]}}return c}var c=["true",
"false","null","undefined"],d=/^(?:[$_a-z][$\w]*|(.+)(\.\s*[$_a-z][$\w]*|\[.+\]))$/i,e=RegExp("\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|/(?:[^/\\\\]|\\\\.)*/w*|[^\\s:,/][^,\"'{}()/:[\\]]*[^\\s,\"'{}()/:[\\]]|[^\\s]","g"),g=/[\])"'A-Za-z0-9_$]+$/,h={"in":1,"return":1,"typeof":1},k={};return{Y:[],U:k,Ga:b,ka:function(e,f){function g(b,f){var e,r=a.getBindingHandler(b);if(r&&r.preprocess?f=r.preprocess(f,b,g):1){if(r=k[b])e=f,0<=a.a.l(c,e)?e=!1:(r=e.match(d),e=null===r?!1:r[1]?"Object("+r[1]+")"+
r[2]:e),r=e;r&&l.push("'"+b+"':function(_z){"+e+"=_z}");n&&(f="function(){return "+f+" }");h.push("'"+b+"':"+f)}}f=f||{};var h=[],l=[],n=f.valueAccessors,r="string"===typeof e?b(e):e;a.a.n(r,function(a){g(a.key||a.unknown,a.value)});l.length&&g("_ko_property_writers","{"+l.join(",")+"}");return h.join(",")},Sb:function(a,b){for(var c=0;c<a.length;c++)if(a[c].key==b)return!0;return!1},oa:function(b,c,d,e,k){if(b&&a.M(b))!a.gb(b)||k&&b.t()===e||b(e);else if((b=c.get("_ko_property_writers"))&&b[d])b[d](e)}}}();
a.b("expressionRewriting",a.g);a.b("expressionRewriting.bindingRewriteValidators",a.g.Y);a.b("expressionRewriting.parseObjectLiteral",a.g.Ga);a.b("expressionRewriting.preProcessBindings",a.g.ka);a.b("expressionRewriting._twoWayBindings",a.g.U);a.b("jsonExpressionRewriting",a.g);a.b("jsonExpressionRewriting.insertPropertyAccessorsIntoJson",a.g.ka);(function(){function b(a){return 8==a.nodeType&&h.test(g?a.text:a.nodeValue)}function c(a){return 8==a.nodeType&&k.test(g?a.text:a.nodeValue)}function d(a,
d){for(var e=a,k=1,n=[];e=e.nextSibling;){if(c(e)&&(k--,0===k))return n;n.push(e);b(e)&&k++}if(!d)throw Error("Cannot find closing comment tag to match: "+a.nodeValue);return null}function e(a,b){var c=d(a,b);return c?0<c.length?c[c.length-1].nextSibling:a.nextSibling:null}var g=w&&"\x3c!--test--\x3e"===w.createComment("test").text,h=g?/^\x3c!--\s*ko(?:\s+([\s\S]+))?\s*--\x3e$/:/^\s*ko(?:\s+([\s\S]+))?\s*$/,k=g?/^\x3c!--\s*\/ko\s*--\x3e$/:/^\s*\/ko\s*$/,m={ul:!0,ol:!0};a.e={P:{},childNodes:function(a){return b(a)?
d(a):a.childNodes},Z:function(c){if(b(c)){c=a.e.childNodes(c);for(var d=0,e=c.length;d<e;d++)a.removeNode(c[d])}else a.a.wa(c)},S:function(c,d){if(b(c)){a.e.Z(c);for(var e=c.nextSibling,k=0,n=d.length;k<n;k++)e.parentNode.insertBefore(d[k],e)}else a.a.S(c,d)},kb:function(a,c){b(a)?a.parentNode.insertBefore(c,a.nextSibling):a.firstChild?a.insertBefore(c,a.firstChild):a.appendChild(c)},eb:function(c,d,e){e?b(c)?c.parentNode.insertBefore(d,e.nextSibling):e.nextSibling?c.insertBefore(d,e.nextSibling):
c.appendChild(d):a.e.kb(c,d)},firstChild:function(a){return b(a)?!a.nextSibling||c(a.nextSibling)?null:a.nextSibling:a.firstChild},nextSibling:function(a){b(a)&&(a=e(a));return a.nextSibling&&c(a.nextSibling)?null:a.nextSibling},Mb:b,bc:function(a){return(a=(g?a.text:a.nodeValue).match(h))?a[1]:null},ib:function(d){if(m[a.a.v(d)]){var k=d.firstChild;if(k){do if(1===k.nodeType){var g;g=k.firstChild;var h=null;if(g){do if(h)h.push(g);else if(b(g)){var n=e(g,!0);n?g=n:h=[g]}else c(g)&&(h=[g]);while(g=
g.nextSibling)}if(g=h)for(h=k.nextSibling,n=0;n<g.length;n++)h?d.insertBefore(g[n],h):d.appendChild(g[n])}while(k=k.nextSibling)}}}}})();a.b("virtualElements",a.e);a.b("virtualElements.allowedBindings",a.e.P);a.b("virtualElements.emptyNode",a.e.Z);a.b("virtualElements.insertAfter",a.e.eb);a.b("virtualElements.prepend",a.e.kb);a.b("virtualElements.setDomNodeChildren",a.e.S);(function(){a.H=function(){this.zb={}};a.a.extend(a.H.prototype,{nodeHasBindings:function(b){switch(b.nodeType){case 1:return null!=
b.getAttribute("data-bind");case 8:return a.e.Mb(b);default:return!1}},getBindings:function(a,c){var d=this.getBindingsString(a,c);return d?this.parseBindingsString(d,c,a):null},getBindingAccessors:function(a,c){var d=this.getBindingsString(a,c);return d?this.parseBindingsString(d,c,a,{valueAccessors:!0}):null},getBindingsString:function(b){switch(b.nodeType){case 1:return b.getAttribute("data-bind");case 8:return a.e.bc(b);default:return null}},parseBindingsString:function(b,c,d,e){try{var g=this.zb,
h=b+(e&&e.valueAccessors||""),k;if(!(k=g[h])){var m,f="with($context){with($data||{}){return{"+a.g.ka(b,e)+"}}}";m=new Function("$context","$element",f);k=g[h]=m}return k(c,d)}catch(p){throw p.message="Unable to parse bindings.\nBindings value: "+b+"\nMessage: "+p.message,p;}}});a.H.instance=new a.H})();a.b("bindingProvider",a.H);(function(){function b(a){return function(){return a}}function c(a){return a()}function d(b){return a.a.Da(a.i.p(b),function(a,c){return function(){return b()[c]}})}function e(a,
b){return d(this.getBindings.bind(this,a,b))}function g(b,c,d){var f,e=a.e.firstChild(c),k=a.H.instance,g=k.preprocessNode;if(g){for(;f=e;)e=a.e.nextSibling(f),g.call(k,f);e=a.e.firstChild(c)}for(;f=e;)e=a.e.nextSibling(f),h(b,f,d)}function h(b,c,d){var f=!0,e=1===c.nodeType;e&&a.e.ib(c);if(e&&d||a.H.instance.nodeHasBindings(c))f=m(c,null,b,d).shouldBindDescendants;f&&!p[a.a.v(c)]&&g(b,c,!e)}function k(b){var c=[],d={},f=[];a.a.K(b,function D(e){if(!d[e]){var k=a.getBindingHandler(e);k&&(k.after&&
(f.push(e),a.a.n(k.after,function(c){if(b[c]){if(-1!==a.a.l(f,c))throw Error("Cannot combine the following bindings, because they have a cyclic dependency: "+f.join(", "));D(c)}}),f.pop()),c.push({key:e,bb:k}));d[e]=!0}});return c}function m(b,d,f,g){var h=a.a.f.get(b,s);if(!d){if(h)throw Error("You cannot apply bindings multiple times to the same element.");a.a.f.set(b,s,!0)}!h&&g&&a.rb(b,f);var m;if(d&&"function"!==typeof d)m=d;else{var p=a.H.instance,l=p.getBindingAccessors||e;if(d||f.A){var A=
a.h(function(){(m=d?d(f,b):l.call(p,b,f))&&f.A&&f.A();return m},null,{I:b});m&&A.aa()||(A=null)}else m=a.i.p(l,p,[b,f])}var u;if(m){var w=A?function(a){return function(){return c(A()[a])}}:function(a){return m[a]},y=function(){return a.a.Da(A?A():m,c)};y.get=function(a){return m[a]&&c(w(a))};y.has=function(a){return a in m};g=k(m);a.a.n(g,function(c){var d=c.bb.init,e=c.bb.update,k=c.key;if(8===b.nodeType&&!a.e.P[k])throw Error("The binding '"+k+"' cannot be used with virtual elements");try{"function"==
typeof d&&a.i.p(function(){var a=d(b,w(k),y,f.$data,f);if(a&&a.controlsDescendantBindings){if(u!==q)throw Error("Multiple bindings ("+u+" and "+k+") are trying to control descendant bindings of the same element. You cannot use these bindings together on the same element.");u=k}}),"function"==typeof e&&a.h(function(){e(b,w(k),y,f.$data,f)},null,{I:b})}catch(g){throw g.message='Unable to process binding "'+k+": "+m[k]+'"\nMessage: '+g.message,g;}})}return{shouldBindDescendants:u===q}}function f(b){return b&&
b instanceof a.G?b:new a.G(b)}a.d={};var p={script:!0};a.getBindingHandler=function(b){return a.d[b]};a.G=function(b,c,d,f){var e=this,k="function"==typeof b,g,h=a.h(function(){var g=k?b():b;c?(c.A&&c.A(),a.a.extend(e,c),h&&(e.A=h)):(e.$parents=[],e.$root=g,e.ko=a);e.$rawData=b;e.$data=g;d&&(e[d]=g);f&&f(e,c,g);return e.$data},null,{ua:function(){return g&&!a.a.Ra(g)},I:!0});h.aa()&&(e.A=h,h.equalityComparer=null,g=[],h.wb=function(b){g.push(b);a.a.C.ea(b,function(b){a.a.ia(g,b);g.length||(h.B(),
e.A=h=q)})})};a.G.prototype.createChildContext=function(b,c,d){return new a.G(b,this,c,function(a,b){a.$parentContext=b;a.$parent=b.$data;a.$parents=(b.$parents||[]).slice(0);a.$parents.unshift(a.$parent);d&&d(a)})};a.G.prototype.extend=function(b){return new a.G(this.$rawData,this,null,function(c){a.a.extend(c,"function"==typeof b?b():b)})};var s=a.a.f.D(),l=a.a.f.D();a.rb=function(b,c){if(2==arguments.length)a.a.f.set(b,l,c),c.A&&c.A.wb(b);else return a.a.f.get(b,l)};a.pa=function(b,c,d){1===b.nodeType&&
a.e.ib(b);return m(b,c,f(d),!0)};a.xb=function(c,e,k){k=f(k);return a.pa(c,"function"===typeof e?d(e.bind(null,k,c)):a.a.Da(e,b),k)};a.Ta=function(a,b){1!==b.nodeType&&8!==b.nodeType||g(f(a),b,!0)};a.Sa=function(a,b){if(b&&1!==b.nodeType&&8!==b.nodeType)throw Error("ko.applyBindings: first parameter should be your view model; second parameter should be a DOM node");b=b||y.document.body;h(f(a),b,!0)};a.ta=function(b){switch(b.nodeType){case 1:case 8:var c=a.rb(b);if(c)return c;if(b.parentNode)return a.ta(b.parentNode)}return q};
a.Cb=function(b){return(b=a.ta(b))?b.$data:q};a.b("bindingHandlers",a.d);a.b("applyBindings",a.Sa);a.b("applyBindingsToDescendants",a.Ta);a.b("applyBindingAccessorsToNode",a.pa);a.b("applyBindingsToNode",a.xb);a.b("contextFor",a.ta);a.b("dataFor",a.Cb)})();var M={"class":"className","for":"htmlFor"};a.d.attr={update:function(b,c){var d=a.a.c(c())||{};a.a.K(d,function(c,d){d=a.a.c(d);var h=!1===d||null===d||d===q;h&&b.removeAttribute(c);8>=a.a.ja&&c in M?(c=M[c],h?b.removeAttribute(c):b[c]=d):h||b.setAttribute(c,
d.toString());"name"===c&&a.a.pb(b,h?"":d.toString())})}};(function(){a.d.checked={after:["value","attr"],init:function(b,c,d){function e(){return d.has("checkedValue")?a.a.c(d.get("checkedValue")):b.value}function g(){var k=b.checked,g=s?e():k;if(l&&(!m||k)){var h=a.i.p(c);f?p!==g?(k&&(a.a.V(h,g,!0),a.a.V(h,p,!1)),p=g):a.a.V(h,g,k):a.g.oa(h,d,"checked",g,!0)}}function h(){var d=a.a.c(c());b.checked=f?0<=a.a.l(d,e()):k?d:e()===d}var k="checkbox"==b.type,m="radio"==b.type;if(k||m){var f=k&&a.a.c(c())instanceof
Array,p=f?e():q,s=m||f,l=!1;m&&!b.name&&a.d.uniqueName.init(b,function(){return!0});a.h(g,null,{I:b});a.a.r(b,"click",g);a.h(h,null,{I:b});l=!0}}};a.g.U.checked=!0;a.d.checkedValue={update:function(b,c){b.value=a.a.c(c())}}})();a.d.css={update:function(b,c){var d=a.a.c(c());"object"==typeof d?a.a.K(d,function(c,d){d=a.a.c(d);a.a.ma(b,c,d)}):(d=String(d||""),a.a.ma(b,b.__ko__cssValue,!1),b.__ko__cssValue=d,a.a.ma(b,d,!0))}};a.d.enable={update:function(b,c){var d=a.a.c(c());d&&b.disabled?b.removeAttribute("disabled"):
d||b.disabled||(b.disabled=!0)}};a.d.disable={update:function(b,c){a.d.enable.update(b,function(){return!a.a.c(c())})}};a.d.event={init:function(b,c,d,e,g){var h=c()||{};a.a.K(h,function(k){"string"==typeof k&&a.a.r(b,k,function(b){var f,h=c()[k];if(h){try{var s=a.a.Q(arguments);e=g.$data;s.unshift(e);f=h.apply(e,s)}finally{!0!==f&&(b.preventDefault?b.preventDefault():b.returnValue=!1)}!1===d.get(k+"Bubble")&&(b.cancelBubble=!0,b.stopPropagation&&b.stopPropagation())}})})}};a.d.foreach={hb:function(b){return function(){var c=
b(),d=a.a.Ha(c);if(!d||"number"==typeof d.length)return{foreach:c,templateEngine:a.J.Aa};a.a.c(c);return{foreach:d.data,as:d.as,includeDestroyed:d.includeDestroyed,afterAdd:d.afterAdd,beforeRemove:d.beforeRemove,afterRender:d.afterRender,beforeMove:d.beforeMove,afterMove:d.afterMove,templateEngine:a.J.Aa}}},init:function(b,c){return a.d.template.init(b,a.d.foreach.hb(c))},update:function(b,c,d,e,g){return a.d.template.update(b,a.d.foreach.hb(c),d,e,g)}};a.g.Y.foreach=!1;a.e.P.foreach=!0;a.d.hasfocus=
{init:function(b,c,d){function e(e){b.__ko_hasfocusUpdating=!0;var g=b.ownerDocument;if("activeElement"in g){var f;try{f=g.activeElement}catch(h){f=g.body}e=f===b}g=c();a.g.oa(g,d,"hasfocus",e,!0);b.__ko_hasfocusLastValue=e;b.__ko_hasfocusUpdating=!1}var g=e.bind(null,!0),h=e.bind(null,!1);a.a.r(b,"focus",g);a.a.r(b,"focusin",g);a.a.r(b,"blur",h);a.a.r(b,"focusout",h)},update:function(b,c){var d=!!a.a.c(c());b.__ko_hasfocusUpdating||b.__ko_hasfocusLastValue===d||(d?b.focus():b.blur(),a.i.p(a.a.da,
null,[b,d?"focusin":"focusout"]))}};a.g.U.hasfocus=!0;a.d.hasFocus=a.d.hasfocus;a.g.U.hasFocus=!0;a.d.html={init:function(){return{controlsDescendantBindings:!0}},update:function(b,c){a.a.Ka(b,c())}};var L=a.a.f.D();H("if");H("ifnot",!1,!0);H("with",!0,!1,function(a,c){return a.createChildContext(c)});a.d.options={init:function(b){if("select"!==a.a.v(b))throw Error("options binding applies only to SELECT elements");for(;0<b.length;)b.remove(0);return{controlsDescendantBindings:!0}},update:function(b,
c,d){function e(){return a.a.ga(b.options,function(a){return a.selected})}function g(a,b,c){var d=typeof b;return"function"==d?b(a):"string"==d?a[b]:c}function h(c,d){if(p.length){var f=0<=a.a.l(p,a.k.o(d[0]));a.a.qb(d[0],f);l&&!f&&a.i.p(a.a.da,null,[b,"change"])}}var k=0!=b.length&&b.multiple?b.scrollTop:null;c=a.a.c(c());var m=d.get("optionsIncludeDestroyed"),f={},p;p=b.multiple?a.a.ha(e(),a.k.o):0<=b.selectedIndex?[a.k.o(b.options[b.selectedIndex])]:[];if(c){"undefined"==typeof c.length&&(c=[c]);
var s=a.a.ga(c,function(b){return m||b===q||null===b||!a.a.c(b._destroy)});d.has("optionsCaption")&&(c=a.a.c(d.get("optionsCaption")),null!==c&&c!==q&&s.unshift(f))}else c=[];var l=!1;c=h;d.has("optionsAfterRender")&&(c=function(b,c){h(0,c);a.i.p(d.get("optionsAfterRender"),null,[c[0],b!==f?b:q])});a.a.Ja(b,s,function(b,c,e){e.length&&(p=e[0].selected?[a.k.o(e[0])]:[],l=!0);c=w.createElement("option");b===f?(a.a.Ma(c,d.get("optionsCaption")),a.k.na(c,q)):(e=g(b,d.get("optionsValue"),b),a.k.na(c,a.a.c(e)),
b=g(b,d.get("optionsText"),e),a.a.Ma(c,b));return[c]},null,c);(b.multiple?p.length&&e().length<p.length:p.length&&0<=b.selectedIndex?a.k.o(b.options[b.selectedIndex])!==p[0]:p.length||0<=b.selectedIndex)&&a.i.p(a.a.da,null,[b,"change"]);a.a.Hb(b);k&&20<Math.abs(k-b.scrollTop)&&(b.scrollTop=k)}};a.d.options.Ea=a.a.f.D();a.d.selectedOptions={after:["options","foreach"],init:function(b,c,d){a.a.r(b,"change",function(){var e=c(),g=[];a.a.n(b.getElementsByTagName("option"),function(b){b.selected&&g.push(a.k.o(b))});
a.g.oa(e,d,"selectedOptions",g)})},update:function(b,c){if("select"!=a.a.v(b))throw Error("values binding applies only to SELECT elements");var d=a.a.c(c());d&&"number"==typeof d.length&&a.a.n(b.getElementsByTagName("option"),function(b){var c=0<=a.a.l(d,a.k.o(b));a.a.qb(b,c)})}};a.g.U.selectedOptions=!0;a.d.style={update:function(b,c){var d=a.a.c(c()||{});a.a.K(d,function(c,d){d=a.a.c(d);b.style[c]=d||""})}};a.d.submit={init:function(b,c,d,e,g){if("function"!=typeof c())throw Error("The value for a submit binding must be a function");
a.a.r(b,"submit",function(a){var d,e=c();try{d=e.call(g.$data,b)}finally{!0!==d&&(a.preventDefault?a.preventDefault():a.returnValue=!1)}})}};a.d.text={init:function(){return{controlsDescendantBindings:!0}},update:function(b,c){a.a.Ma(b,c())}};a.e.P.text=!0;a.d.uniqueName={init:function(b,c){if(c()){var d="ko_unique_"+ ++a.d.uniqueName.Bb;a.a.pb(b,d)}}};a.d.uniqueName.Bb=0;a.d.value={after:["options","foreach"],init:function(b,c,d){function e(){k=!1;var e=c(),f=a.k.o(b);a.g.oa(e,d,"value",f)}var g=
["change"],h=d.get("valueUpdate"),k=!1;h&&("string"==typeof h&&(h=[h]),a.a.X(g,h),g=a.a.Va(g));!a.a.ja||"input"!=b.tagName.toLowerCase()||"text"!=b.type||"off"==b.autocomplete||b.form&&"off"==b.form.autocomplete||-1!=a.a.l(g,"propertychange")||(a.a.r(b,"propertychange",function(){k=!0}),a.a.r(b,"blur",function(){k&&e()}));a.a.n(g,function(c){var d=e;a.a.ac(c,"after")&&(d=function(){setTimeout(e,0)},c=c.substring(5));a.a.r(b,c,d)})},update:function(b,c){var d="select"===a.a.v(b),e=a.a.c(c()),g=a.k.o(b);
e!==g&&(g=function(){a.k.na(b,e)},g(),d&&(e!==a.k.o(b)?a.i.p(a.a.da,null,[b,"change"]):setTimeout(g,0)))}};a.g.U.value=!0;a.d.visible={update:function(b,c){var d=a.a.c(c()),e="none"!=b.style.display;d&&!e?b.style.display="":!d&&e&&(b.style.display="none")}};(function(b){a.d[b]={init:function(c,d,e,g,h){return a.d.event.init.call(this,c,function(){var a={};a[b]=d();return a},e,g,h)}}})("click");a.w=function(){};a.w.prototype.renderTemplateSource=function(){throw Error("Override renderTemplateSource");
};a.w.prototype.createJavaScriptEvaluatorBlock=function(){throw Error("Override createJavaScriptEvaluatorBlock");};a.w.prototype.makeTemplateSource=function(b,c){if("string"==typeof b){c=c||w;var d=c.getElementById(b);if(!d)throw Error("Cannot find template with ID "+b);return new a.m.j(d)}if(1==b.nodeType||8==b.nodeType)return new a.m.W(b);throw Error("Unknown template type: "+b);};a.w.prototype.renderTemplate=function(a,c,d,e){a=this.makeTemplateSource(a,e);return this.renderTemplateSource(a,c,
d)};a.w.prototype.isTemplateRewritten=function(a,c){return!1===this.allowTemplateRewriting?!0:this.makeTemplateSource(a,c).data("isRewritten")};a.w.prototype.rewriteTemplate=function(a,c,d){a=this.makeTemplateSource(a,d);c=c(a.text());a.text(c);a.data("isRewritten",!0)};a.b("templateEngine",a.w);a.Oa=function(){function b(b,c,d,k){b=a.g.Ga(b);for(var m=a.g.Y,f=0;f<b.length;f++){var p=b[f].key;if(m.hasOwnProperty(p)){var s=m[p];if("function"===typeof s){if(p=s(b[f].value))throw Error(p);}else if(!s)throw Error("This template engine does not support the '"+
p+"' binding within its templates");}}d="ko.__tr_ambtns(function($context,$element){return(function(){return{ "+a.g.ka(b,{valueAccessors:!0})+" } })()},'"+d.toLowerCase()+"')";return k.createJavaScriptEvaluatorBlock(d)+c}var c=/(<([a-z]+\d*)(?:\s+(?!data-bind\s*=\s*)[a-z0-9\-]+(?:=(?:\"[^\"]*\"|\'[^\']*\'))?)*\s+)data-bind\s*=\s*(["'])([\s\S]*?)\3/gi,d=/\x3c!--\s*ko\b\s*([\s\S]*?)\s*--\x3e/g;return{Ib:function(b,c,d){c.isTemplateRewritten(b,d)||c.rewriteTemplate(b,function(b){return a.Oa.Ub(b,c)},
d)},Ub:function(a,g){return a.replace(c,function(a,c,d,f,e){return b(e,c,d,g)}).replace(d,function(a,c){return b(c,"\x3c!-- ko --\x3e","#comment",g)})},yb:function(b,c){return a.u.Ca(function(d,k){var m=d.nextSibling;m&&m.nodeName.toLowerCase()===c&&a.pa(m,b,k)})}}}();a.b("__tr_ambtns",a.Oa.yb);(function(){a.m={};a.m.j=function(a){this.j=a};a.m.j.prototype.text=function(){var b=a.a.v(this.j),b="script"===b?"text":"textarea"===b?"value":"innerHTML";if(0==arguments.length)return this.j[b];var c=arguments[0];
"innerHTML"===b?a.a.Ka(this.j,c):this.j[b]=c};var b=a.a.f.D()+"_";a.m.j.prototype.data=function(c){if(1===arguments.length)return a.a.f.get(this.j,b+c);a.a.f.set(this.j,b+c,arguments[1])};var c=a.a.f.D();a.m.W=function(a){this.j=a};a.m.W.prototype=new a.m.j;a.m.W.prototype.text=function(){if(0==arguments.length){var b=a.a.f.get(this.j,c)||{};b.Pa===q&&b.sa&&(b.Pa=b.sa.innerHTML);return b.Pa}a.a.f.set(this.j,c,{Pa:arguments[0]})};a.m.j.prototype.nodes=function(){if(0==arguments.length)return(a.a.f.get(this.j,
c)||{}).sa;a.a.f.set(this.j,c,{sa:arguments[0]})};a.b("templateSources",a.m);a.b("templateSources.domElement",a.m.j);a.b("templateSources.anonymousTemplate",a.m.W)})();(function(){function b(b,c,d){var e;for(c=a.e.nextSibling(c);b&&(e=b)!==c;)b=a.e.nextSibling(e),d(e,b)}function c(c,d){if(c.length){var f=c[0],e=c[c.length-1],g=f.parentNode,h=a.H.instance,n=h.preprocessNode;if(n){b(f,e,function(a,b){var c=a.previousSibling,d=n.call(h,a);d&&(a===f&&(f=d[0]||b),a===e&&(e=d[d.length-1]||c))});c.length=
0;if(!f)return;f===e?c.push(f):(c.push(f,e),a.a.$(c,g))}b(f,e,function(b){1!==b.nodeType&&8!==b.nodeType||a.Sa(d,b)});b(f,e,function(b){1!==b.nodeType&&8!==b.nodeType||a.u.vb(b,[d])});a.a.$(c,g)}}function d(a){return a.nodeType?a:0<a.length?a[0]:null}function e(b,e,f,h,s){s=s||{};var l=b&&d(b),l=l&&l.ownerDocument,n=s.templateEngine||g;a.Oa.Ib(f,n,l);f=n.renderTemplate(f,h,s,l);if("number"!=typeof f.length||0<f.length&&"number"!=typeof f[0].nodeType)throw Error("Template engine must return an array of DOM nodes");
l=!1;switch(e){case "replaceChildren":a.e.S(b,f);l=!0;break;case "replaceNode":a.a.nb(b,f);l=!0;break;case "ignoreTargetNode":break;default:throw Error("Unknown renderMode: "+e);}l&&(c(f,h),s.afterRender&&a.i.p(s.afterRender,null,[f,h.$data]));return f}var g;a.La=function(b){if(b!=q&&!(b instanceof a.w))throw Error("templateEngine must inherit from ko.templateEngine");g=b};a.Ia=function(b,c,f,h,s){f=f||{};if((f.templateEngine||g)==q)throw Error("Set a template engine before calling renderTemplate");
s=s||"replaceChildren";if(h){var l=d(h);return a.h(function(){var g=c&&c instanceof a.G?c:new a.G(a.a.c(c)),r="function"==typeof b?b(g.$data,g):b,g=e(h,s,r,g,f);"replaceNode"==s&&(h=g,l=d(h))},null,{ua:function(){return!l||!a.a.va(l)},I:l&&"replaceNode"==s?l.parentNode:l})}return a.u.Ca(function(d){a.Ia(b,c,f,d,"replaceNode")})};a.$b=function(b,d,f,g,h){function l(a,b){c(b,r);f.afterRender&&f.afterRender(b,a)}function n(a,c){r=h.createChildContext(a,f.as,function(a){a.$index=c});var d="function"==
typeof b?b(a,r):b;return e(null,"ignoreTargetNode",d,r,f)}var r;return a.h(function(){var b=a.a.c(d)||[];"undefined"==typeof b.length&&(b=[b]);b=a.a.ga(b,function(b){return f.includeDestroyed||b===q||null===b||!a.a.c(b._destroy)});a.i.p(a.a.Ja,null,[g,b,n,f,l])},null,{I:g})};var h=a.a.f.D();a.d.template={init:function(b,c){var d=a.a.c(c());"string"==typeof d||d.name?a.e.Z(b):(d=a.e.childNodes(b),d=a.a.Vb(d),(new a.m.W(b)).nodes(d));return{controlsDescendantBindings:!0}},update:function(b,c,d,e,g){c=
a.a.c(c());d={};e=!0;var l,n=null;"string"!=typeof c&&(d=c,c=a.a.c(d.name),"if"in d&&(e=a.a.c(d["if"])),e&&"ifnot"in d&&(e=!a.a.c(d.ifnot)),l=a.a.c(d.data));"foreach"in d?n=a.$b(c||b,e&&d.foreach||[],d,b,g):e?(g="data"in d?g.createChildContext(l,d.as):g,n=a.Ia(c||b,g,d,b)):a.e.Z(b);g=n;(l=a.a.f.get(b,h))&&"function"==typeof l.B&&l.B();a.a.f.set(b,h,g&&g.aa()?g:q)}};a.g.Y.template=function(b){b=a.g.Ga(b);return 1==b.length&&b[0].unknown||a.g.Sb(b,"name")?null:"This template engine does not support anonymous templates nested within its templates"};
a.e.P.template=!0})();a.b("setTemplateEngine",a.La);a.b("renderTemplate",a.Ia);a.a.ra=function(){function a(b,d,e,g,h){var k=Math.min,m=Math.max,f=[],p,q=b.length,l,n=d.length,r=n-q||1,v=q+n+1,t,u,w;for(p=0;p<=q;p++)for(u=t,f.push(t=[]),w=k(n,p+r),l=m(0,p-1);l<=w;l++)t[l]=l?p?b[p-1]===d[l-1]?u[l-1]:k(u[l]||v,t[l-1]||v)+1:l+1:p+1;k=[];m=[];r=[];p=q;for(l=n;p||l;)n=f[p][l]-1,l&&n===f[p][l-1]?m.push(k[k.length]={status:e,value:d[--l],index:l}):p&&n===f[p-1][l]?r.push(k[k.length]={status:g,value:b[--p],
index:p}):(--l,--p,h.sparse||k.push({status:"retained",value:d[l]}));if(m.length&&r.length){b=10*q;var z;for(d=e=0;(h.dontLimitMoves||d<b)&&(z=m[e]);e++){for(g=0;f=r[g];g++)if(z.value===f.value){z.moved=f.index;f.moved=z.index;r.splice(g,1);d=g=0;break}d+=g}}return k.reverse()}return function(c,d,e){e="boolean"===typeof e?{dontLimitMoves:e}:e||{};c=c||[];d=d||[];return c.length<=d.length?a(c,d,"added","deleted",e):a(d,c,"deleted","added",e)}}();a.b("utils.compareArrays",a.a.ra);(function(){function b(b,
c,g,h,k){var m=[],f=a.h(function(){var f=c(g,k,a.a.$(m,b))||[];0<m.length&&(a.a.nb(m,f),h&&a.i.p(h,null,[g,f,k]));m.splice(0,m.length);a.a.X(m,f)},null,{I:b,ua:function(){return!a.a.Ra(m)}});return{R:m,h:f.aa()?f:q}}var c=a.a.f.D();a.a.Ja=function(d,e,g,h,k){function m(b,c){x=s[c];t!==c&&(z[b]=x);x.za(t++);a.a.$(x.R,d);r.push(x);w.push(x)}function f(b,c){if(b)for(var d=0,e=c.length;d<e;d++)c[d]&&a.a.n(c[d].R,function(a){b(a,d,c[d].fa)})}e=e||[];h=h||{};var p=a.a.f.get(d,c)===q,s=a.a.f.get(d,c)||[],
l=a.a.ha(s,function(a){return a.fa}),n=a.a.ra(l,e,h.dontLimitMoves),r=[],v=0,t=0,u=[],w=[];e=[];for(var z=[],l=[],x,A=0,y,B;y=n[A];A++)switch(B=y.moved,y.status){case "deleted":B===q&&(x=s[v],x.h&&x.h.B(),u.push.apply(u,a.a.$(x.R,d)),h.beforeRemove&&(e[A]=x,w.push(x)));v++;break;case "retained":m(A,v++);break;case "added":B!==q?m(A,B):(x={fa:y.value,za:a.q(t++)},r.push(x),w.push(x),p||(l[A]=x))}f(h.beforeMove,z);a.a.n(u,h.beforeRemove?a.L:a.removeNode);for(var A=0,p=a.e.firstChild(d),C;x=w[A];A++){x.R||
a.a.extend(x,b(d,g,x.fa,k,x.za));for(v=0;n=x.R[v];p=n.nextSibling,C=n,v++)n!==p&&a.e.eb(d,n,C);!x.Ob&&k&&(k(x.fa,x.R,x.za),x.Ob=!0)}f(h.beforeRemove,e);f(h.afterMove,z);f(h.afterAdd,l);a.a.f.set(d,c,r)}})();a.b("utils.setDomNodeChildrenFromArrayMapping",a.a.Ja);a.J=function(){this.allowTemplateRewriting=!1};a.J.prototype=new a.w;a.J.prototype.renderTemplateSource=function(b){var c=(9>a.a.ja?0:b.nodes)?b.nodes():null;if(c)return a.a.Q(c.cloneNode(!0).childNodes);b=b.text();return a.a.Fa(b)};a.J.Aa=
new a.J;a.La(a.J.Aa);a.b("nativeTemplateEngine",a.J);(function(){a.Ba=function(){var a=this.Rb=function(){if("undefined"==typeof u||!u.tmpl)return 0;try{if(0<=u.tmpl.tag.tmpl.open.toString().indexOf("__"))return 2}catch(a){}return 1}();this.renderTemplateSource=function(b,e,g){g=g||{};if(2>a)throw Error("Your version of jQuery.tmpl is too old. Please upgrade to jQuery.tmpl 1.0.0pre or later.");var h=b.data("precompiled");h||(h=b.text()||"",h=u.template(null,"{{ko_with $item.koBindingContext}}"+h+
"{{/ko_with}}"),b.data("precompiled",h));b=[e.$data];e=u.extend({koBindingContext:e},g.templateOptions);e=u.tmpl(h,b,e);e.appendTo(w.createElement("div"));u.fragments={};return e};this.createJavaScriptEvaluatorBlock=function(a){return"{{ko_code ((function() { return "+a+" })()) }}"};this.addTemplate=function(a,b){w.write("<script type='text/html' id='"+a+"'>"+b+"\x3c/script>")};0<a&&(u.tmpl.tag.ko_code={open:"__.push($1 || '');"},u.tmpl.tag.ko_with={open:"with($1) {",close:"} "})};a.Ba.prototype=
new a.w;var b=new a.Ba;0<b.Rb&&a.La(b);a.b("jqueryTmplTemplateEngine",a.Ba)})()})})();})();


//     Underscore.js 1.5.1
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
!function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,v=e.reduce,h=e.reduceRight,d=e.filter,g=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,_=Object.keys,w=i.bind,j=function(n){return n instanceof j?n:this instanceof j?(this._wrapped=n,void 0):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.5.1";var A=j.each=j.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a in n)if(j.has(n,a)&&t.call(e,n[a],a,n)===r)return};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var E="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduce===v)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(E);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduceRight===h)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(E);return r},j.find=j.detect=function(n,t,r){var e;return O(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:d&&n.filter===d?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:g&&n.every===g?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var O=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:O(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,function(n){return n[t]})},j.where=function(n,t,r){return j.isEmpty(t)?r?void 0:[]:j[r?"find":"filter"](n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},j.findWhere=function(n,t){return j.where(n,t,!0)},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);if(!t&&j.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>e.computed&&(e={value:n,computed:a})}),e.value},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);if(!t&&j.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a<e.computed&&(e={value:n,computed:a})}),e.value},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e};var F=function(n){return j.isFunction(n)?n:function(t){return t[n]}};j.sortBy=function(n,t,r){var e=F(t);return j.pluck(j.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index<t.index?-1:1}),"value")};var k=function(n,t,r,e){var u={},i=F(null==t?j.identity:t);return A(n,function(t,a){var o=i.call(r,t,a,n);e(u,o,t)}),u};j.groupBy=function(n,t,r){return k(n,t,r,function(n,t,r){(j.has(n,t)?n[t]:n[t]=[]).push(r)})},j.countBy=function(n,t,r){return k(n,t,r,function(n,t){j.has(n,t)||(n[t]=0),n[t]++})},j.sortedIndex=function(n,t,r,e){r=null==r?j.identity:F(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var R=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):R(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return R(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.indexOf(t,n)>=0})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var M=function(){};j.bind=function(n,t){var r,e;if(w&&n.bind===w)return w.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));M.prototype=n.prototype;var u=new M;M.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){return n.apply(this,t.concat(o.call(arguments)))}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:new Date,a=null,i=n.apply(e,u)};return function(){var l=new Date;o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u)):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u=null;return function(){var i=this,a=arguments,o=function(){u=null,r||(e=n.apply(i,a))},c=r&&!u;return clearTimeout(u),u=setTimeout(o,t),c&&(e=n.apply(i,a)),e}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=_||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){var t=[];for(var r in n)j.has(n,r)&&t.push(n[r]);return t},j.pairs=function(n){var t=[];for(var r in n)j.has(n,r)&&t.push([r,n[r]]);return t},j.invert=function(n){var t={};for(var r in n)j.has(n,r)&&(t[n[r]]=r);return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))};var I={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};I.unescape=j.invert(I.escape);var T={escape:new RegExp("["+j.keys(I.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(I.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(T[n],function(t){return I[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}.call(this);
//# sourceMappingURL=underscore-min.map
/*! gridster.js - v0.1.0 - 2013-06-14
 * http://gridster.net/
 * Copyright (c) 2013 ducksboard; Licensed MIT */


(function($, window, document, undefined)
{
	/**
	 * Creates objects with coordinates (x1, y1, x2, y2, cx, cy, width, height)
	 * to simulate DOM elements on the screen.
	 * Coords is used by Gridster to create a faux grid with any DOM element can
	 * collide.
	 *
	 * @class Coords
	 * @param {HTMLElement|Object} obj The jQuery HTMLElement or a object with: left,
	 * top, width and height properties.
	 * @return {Object} Coords instance.
	 * @constructor
	 */
	function Coords(obj)
	{
		if(obj[0] && $.isPlainObject(obj[0]))
		{
			this.data = obj[0];
		}
		else
		{
			this.el = obj;
		}

		this.isCoords = true;
		this.coords = {};
		this.init();
		return this;
	}


	var fn = Coords.prototype;


	fn.init = function()
	{
		this.set();
		this.original_coords = this.get();
	};


	fn.set = function(update, not_update_offsets)
	{
		var el = this.el;

		if(el && !update)
		{
			this.data = el.offset();
			this.data.width = el.width();
			this.data.height = el.height();
		}

		if(el && update && !not_update_offsets)
		{
			var offset = el.offset();
			this.data.top = offset.top;
			this.data.left = offset.left;
		}

		var d = this.data;

		this.coords.x1 = d.left;
		this.coords.y1 = d.top;
		this.coords.x2 = d.left + d.width;
		this.coords.y2 = d.top + d.height;
		this.coords.cx = d.left + (d.width / 2);
		this.coords.cy = d.top + (d.height / 2);
		this.coords.width = d.width;
		this.coords.height = d.height;
		this.coords.el = el || false;

		return this;
	};


	fn.update = function(data)
	{
		if(!data && !this.el)
		{
			return this;
		}

		if(data)
		{
			var new_data = $.extend({}, this.data, data);
			this.data = new_data;
			return this.set(true, true);
		}

		this.set(true);
		return this;
	};


	fn.get = function()
	{
		return this.coords;
	};


	//jQuery adapter
	$.fn.coords = function()
	{
		if(this.data('coords'))
		{
			return this.data('coords');
		}

		var ins = new Coords(this, arguments[0]);
		this.data('coords', ins);
		return ins;
	};

}(jQuery, window, document));

;
(function($, window, document, undefined)
{

	var defaults = {
		colliders_context: document.body
		// ,on_overlap: function(collider_data){},
		// on_overlap_start : function(collider_data){},
		// on_overlap_stop : function(collider_data){}
	};


	/**
	 * Detects collisions between a DOM element against other DOM elements or
	 * Coords objects.
	 *
	 * @class Collision
	 * @uses Coords
	 * @param {HTMLElement} el The jQuery wrapped HTMLElement.
	 * @param {HTMLElement|Array} colliders Can be a jQuery collection
	 *  of HTMLElements or an Array of Coords instances.
	 * @param {Object} [options] An Object with all options you want to
	 *        overwrite:
	 *   @param {Function} [options.on_overlap_start] Executes a function the first
	 *    time each `collider ` is overlapped.
	 *   @param {Function} [options.on_overlap_stop] Executes a function when a
	 *    `collider` is no longer collided.
	 *   @param {Function} [options.on_overlap] Executes a function when the
	 * mouse is moved during the collision.
	 * @return {Object} Collision instance.
	 * @constructor
	 */
	function Collision(el, colliders, options)
	{
		this.options = $.extend(defaults, options);
		this.$element = el;
		this.last_colliders = [];
		this.last_colliders_coords = [];
		if(typeof colliders === 'string' || colliders instanceof jQuery)
		{
			this.$colliders = $(colliders, this.options.colliders_context).not(this.$element);
		}
		else
		{
			this.colliders = $(colliders);
		}

		this.init();
	}


	var fn = Collision.prototype;


	fn.init = function()
	{
		this.find_collisions();
	};


	fn.overlaps = function(a, b)
	{
		var x = false;
		var y = false;

		if((b.x1 >= a.x1 && b.x1 <= a.x2) || (b.x2 >= a.x1 && b.x2 <= a.x2) || (a.x1 >= b.x1 && a.x2 <= b.x2))
		{
			x = true;
		}

		if((b.y1 >= a.y1 && b.y1 <= a.y2) || (b.y2 >= a.y1 && b.y2 <= a.y2) || (a.y1 >= b.y1 && a.y2 <= b.y2))
		{
			y = true;
		}

		return (x && y);
	};


	fn.detect_overlapping_region = function(a, b)
	{
		var regionX = '';
		var regionY = '';

		if(a.y1 > b.cy && a.y1 < b.y2)
		{
			regionX = 'N';
		}
		if(a.y2 > b.y1 && a.y2 < b.cy)
		{
			regionX = 'S';
		}
		if(a.x1 > b.cx && a.x1 < b.x2)
		{
			regionY = 'W';
		}
		if(a.x2 > b.x1 && a.x2 < b.cx)
		{
			regionY = 'E';
		}

		return (regionX + regionY) || 'C';
	};


	fn.calculate_overlapped_area_coords = function(a, b)
	{
		var x1 = Math.max(a.x1, b.x1);
		var y1 = Math.max(a.y1, b.y1);
		var x2 = Math.min(a.x2, b.x2);
		var y2 = Math.min(a.y2, b.y2);

		return $({
			left  : x1,
			top   : y1,
			width : (x2 - x1),
			height: (y2 - y1)
		}).coords().get();
	};


	fn.calculate_overlapped_area = function(coords)
	{
		return (coords.width * coords.height);
	};


	fn.manage_colliders_start_stop = function(new_colliders_coords, start_callback, stop_callback)
	{
		var last = this.last_colliders_coords;

		for(var i = 0, il = last.length; i < il; i++)
		{
			if($.inArray(last[i], new_colliders_coords) === -1)
			{
				start_callback.call(this, last[i]);
			}
		}

		for(var j = 0, jl = new_colliders_coords.length; j < jl; j++)
		{
			if($.inArray(new_colliders_coords[j], last) === -1)
			{
				stop_callback.call(this, new_colliders_coords[j]);
			}

		}
	};


	fn.find_collisions = function(player_data_coords)
	{
		var self = this;
		var colliders_coords = [];
		var colliders_data = [];
		var $colliders = (this.colliders || this.$colliders);
		var count = $colliders.length;
		var player_coords = self.$element.coords().update(player_data_coords || false).get();

		while(count--)
		{
			var $collider = self.$colliders ? $($colliders[count]) : $colliders[count];
			var $collider_coords_ins = ($collider.isCoords) ? $collider : $collider.coords();
			var collider_coords = $collider_coords_ins.get();
			var overlaps = self.overlaps(player_coords, collider_coords);

			if(!overlaps)
			{
				continue;
			}

			var region = self.detect_overlapping_region(player_coords, collider_coords);

			//todo: make this an option
			if(region === 'C')
			{
				var area_coords = self.calculate_overlapped_area_coords(player_coords, collider_coords);
				var area = self.calculate_overlapped_area(area_coords);
				var collider_data = {
					area         : area,
					area_coords  : area_coords,
					region       : region,
					coords       : collider_coords,
					player_coords: player_coords,
					el           : $collider
				};

				if(self.options.on_overlap)
				{
					self.options.on_overlap.call(this, collider_data);
				}
				colliders_coords.push($collider_coords_ins);
				colliders_data.push(collider_data);
			}
		}

		if(self.options.on_overlap_stop || self.options.on_overlap_start)
		{
			this.manage_colliders_start_stop(colliders_coords, self.options.on_overlap_start, self.options.on_overlap_stop);
		}

		this.last_colliders_coords = colliders_coords;

		return colliders_data;
	};


	fn.get_closest_colliders = function(player_data_coords)
	{
		var colliders = this.find_collisions(player_data_coords);

		colliders.sort(function(a, b)
		{
			/* if colliders are being overlapped by the "C" (center) region,
			 * we have to set a lower index in the array to which they are placed
			 * above in the grid. */
			if(a.region === 'C' && b.region === 'C')
			{
				if(a.coords.y1 < b.coords.y1 || a.coords.x1 < b.coords.x1)
				{
					return -1;
				}
				else
				{
					return 1;
				}
			}

			if(a.area < b.area)
			{
				return 1;
			}

			return 1;
		});
		return colliders;
	};


	//jQuery adapter
	$.fn.collision = function(collider, options)
	{
		return new Collision(this, collider, options);
	};


}(jQuery, window, document));

;
(function(window, undefined)
{
	/* Debounce and throttle functions taken from underscore.js */
	window.debounce = function(func, wait, immediate)
	{
		var timeout;
		return function()
		{
			var context = this, args = arguments;
			var later = function()
			{
				timeout = null;
				if(!immediate) func.apply(context, args);
			};
			if(immediate && !timeout) func.apply(context, args);
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	};


	window.throttle = function(func, wait)
	{
		var context, args, timeout, throttling, more, result;
		var whenDone = debounce(function()
			{
				more = throttling = false;
			}, wait);
		return function()
		{
			context = this;
			args = arguments;
			var later = function()
			{
				timeout = null;
				if(more) func.apply(context, args);
				whenDone();
			};
			if(!timeout) timeout = setTimeout(later, wait);
			if(throttling)
			{
				more = true;
			}
			else
			{
				result = func.apply(context, args);
			}
			whenDone();
			throttling = true;
			return result;
		};
	};

})(window);

;
(function($, window, document, undefined)
{

	var defaults = {
		items          : '.gs_w',
		distance       : 1,
		limit          : true,
		offset_left    : 0,
		autoscroll     : true,
		ignore_dragging: ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'],
		handle         : null,
		container_width: 0  // 0 == auto
		// drag: function(e){},
		// start : function(e, ui){},
		// stop : function(e){}
	};

	var $window = $(window);
	var isTouch = !!('ontouchstart' in window);
	var pointer_events = {
		start: isTouch ? 'touchstart.gridster-draggable' : 'mousedown.gridster-draggable',
		move : isTouch ? 'touchmove.gridster-draggable' : 'mousemove.gridster-draggable',
		end  : isTouch ? 'touchend.gridster-draggable' : 'mouseup.gridster-draggable'
	};

	/**
	 * Basic drag implementation for DOM elements inside a container.
	 * Provide start/stop/drag callbacks.
	 *
	 * @class Draggable
	 * @param {HTMLElement} el The HTMLelement that contains all the panes
	 *  to be dragged.
	 * @param {Object} [options] An Object with all options you want to
	 *        overwrite:
	 *    @param {HTMLElement|String} [options.items] Define who will
	 *     be the draggable items. Can be a CSS Selector String or a
	 *     collection of HTMLElements.
	 *    @param {Number} [options.distance] Distance in pixels after mousedown
	 *     the mouse must move before dragging should start.
	 *    @param {Boolean} [options.limit] Constrains dragging to the width of
	 *     the container
	 *    @param {offset_left} [options.offset_left] Offset added to the item
	 *     that is being dragged.
	 *    @param {Number} [options.drag] Executes a callback when the mouse is
	 *     moved during the dragging.
	 *    @param {Number} [options.start] Executes a callback when the drag
	 *     starts.
	 *    @param {Number} [options.stop] Executes a callback when the drag stops.
	 * @return {Object} Returns `el`.
	 * @constructor
	 */
	function Draggable(el, options)
	{
		this.options = $.extend({}, defaults, options);
		this.$body = $(document.body);
		this.$container = $(el);
		this.$dragitems = $(this.options.items, this.$container);
		this.is_dragging = false;
		this.player_min_left = 0 + this.options.offset_left;
		this.init();
	}

	var fn = Draggable.prototype;

	fn.init = function()
	{
		this.calculate_positions();
		this.$container.css('position', 'relative');
		this.disabled = false;
		this.events();

		$(window).bind('resize.gridster-draggable', throttle($.proxy(this.calculate_positions, this), 200));
	};

	fn.setOptions = function(options)
	{
		this.options = $.extend(this.options, options);
	};

	fn.events = function()
	{
		this.$container.on('selectstart.gridster-draggable', $.proxy(this.on_select_start, this));

		this.$container.on(pointer_events.start, this.options.items, $.proxy(this.drag_handler, this));

		this.$body.on(pointer_events.end, $.proxy(function(e)
		{
			this.is_dragging = false;
			if(this.disabled)
			{
				return;
			}
			this.$body.off(pointer_events.move);
			if(this.drag_start)
			{
				this.on_dragstop(e);
			}
		}, this));
	};

	fn.get_actual_pos = function($el)
	{
		var pos = $el.position();
		return pos;
	};


	fn.get_mouse_pos = function(e)
	{
		if(isTouch)
		{
			var oe = e.originalEvent;
			e = oe.touches.length ? oe.touches[0] : oe.changedTouches[0];
		}

		return {
			left: e.clientX,
			top : e.clientY
		};
	};


	fn.get_offset = function(e)
	{
		e.preventDefault();
		var mouse_actual_pos = this.get_mouse_pos(e);
		var diff_x = Math.round(mouse_actual_pos.left - this.mouse_init_pos.left);
		var diff_y = Math.round(mouse_actual_pos.top - this.mouse_init_pos.top);

		var left = Math.round(this.el_init_offset.left + diff_x - this.baseX);
		var top = Math.round(this.el_init_offset.top + diff_y - this.baseY + this.scrollOffset);

		if(this.options.limit)
		{
			if(left > this.player_max_left)
			{
				left = this.player_max_left;
			}
			else if(left < this.player_min_left)
			{
				left = this.player_min_left;
			}
		}

		return {
			left      : left,
			top       : top,
			mouse_left: mouse_actual_pos.left,
			mouse_top : mouse_actual_pos.top
		};
	};


	fn.manage_scroll = function(offset)
	{
		/* scroll document */
		var nextScrollTop;
		var scrollTop = $window.scrollTop();
		var min_window_y = scrollTop;
		var max_window_y = min_window_y + this.window_height;

		var mouse_down_zone = max_window_y - 50;
		var mouse_up_zone = min_window_y + 50;

		var abs_mouse_left = offset.mouse_left;
		var abs_mouse_top = min_window_y + offset.mouse_top;

		var max_player_y = (this.doc_height - this.window_height + this.player_height);

		if(abs_mouse_top >= mouse_down_zone)
		{
			nextScrollTop = scrollTop + 30;
			if(nextScrollTop < max_player_y)
			{
				$window.scrollTop(nextScrollTop);
				this.scrollOffset = this.scrollOffset + 30;
			}
		}

		if(abs_mouse_top <= mouse_up_zone)
		{
			nextScrollTop = scrollTop - 30;
			if(nextScrollTop > 0)
			{
				$window.scrollTop(nextScrollTop);
				this.scrollOffset = this.scrollOffset - 30;
			}
		}
	};


	fn.calculate_positions = function(e)
	{
		this.window_height = $window.height();
	};


	fn.drag_handler = function(e)
	{
		var node = e.target.nodeName;
		if(this.disabled || e.which !== 1 && !isTouch)
		{
			return;
		}

		if(this.ignore_drag(e))
		{
			return;
		}

		var self = this;
		var first = true;
		this.$player = $(e.currentTarget);

		this.el_init_pos = this.get_actual_pos(this.$player);
		this.mouse_init_pos = this.get_mouse_pos(e);
		this.offsetY = this.mouse_init_pos.top - this.el_init_pos.top;

		this.$body.on(pointer_events.move, function(mme)
		{
			var mouse_actual_pos = self.get_mouse_pos(mme);
			var diff_x = Math.abs(mouse_actual_pos.left - self.mouse_init_pos.left);
			var diff_y = Math.abs(mouse_actual_pos.top - self.mouse_init_pos.top);
			if(!(diff_x > self.options.distance || diff_y > self.options.distance))
			{
				return false;
			}

			if(first)
			{
				first = false;
				self.on_dragstart.call(self, mme);
				return false;
			}

			if(self.is_dragging === true)
			{
				self.on_dragmove.call(self, mme);
			}

			return false;
		});

		if(!isTouch)
		{
			return false;
		}
	};


	fn.on_dragstart = function(e)
	{
		e.preventDefault();
		this.drag_start = true;
		this.is_dragging = true;
		var offset = this.$container.offset();
		this.baseX = Math.round(offset.left);
		this.baseY = Math.round(offset.top);
		this.doc_height = $(document).height();

		if(this.options.helper === 'clone')
		{
			this.$helper = this.$player.clone().appendTo(this.$container).addClass('helper');
			this.helper = true;
		}
		else
		{
			this.helper = false;
		}
		this.scrollOffset = 0;
		this.el_init_offset = this.$player.offset();
		this.player_width = this.$player.width();
		this.player_height = this.$player.height();

		var container_width = this.options.container_width || this.$container.width();
		this.player_max_left = (container_width - this.player_width + this.options.offset_left);

		if(this.options.start)
		{
			this.options.start.call(this.$player, e, {
				helper: this.helper ? this.$helper : this.$player
			});
		}
		return false;
	};


	fn.on_dragmove = function(e)
	{
		var offset = this.get_offset(e);

		this.options.autoscroll && this.manage_scroll(offset);

		(this.helper ? this.$helper : this.$player).css({
			'position': 'absolute',
			'left'    : offset.left,
			'top'     : offset.top
		});

		var ui = {
			'position': {
				'left': offset.left,
				'top' : offset.top
			}
		};

		if(this.options.drag)
		{
			this.options.drag.call(this.$player, e, ui);
		}
		return false;
	};


	fn.on_dragstop = function(e)
	{
		var offset = this.get_offset(e);
		this.drag_start = false;

		var ui = {
			'position': {
				'left': offset.left,
				'top' : offset.top
			}
		};

		if(this.options.stop)
		{
			this.options.stop.call(this.$player, e, ui);
		}

		if(this.helper)
		{
			this.$helper.remove();
		}

		return false;
	};

	fn.on_select_start = function(e)
	{
		if(this.disabled)
		{
			return;
		}

		if(this.ignore_drag(e))
		{
			return;
		}

		return false;
	};

	fn.enable = function()
	{
		this.disabled = false;
	};

	fn.disable = function()
	{
		this.disabled = true;
	};


	fn.destroy = function()
	{
		this.disable();

		this.$container.off('.gridster-draggable');
		this.$body.off('.gridster-draggable');
		$(window).off('.gridster-draggable');

		$.removeData(this.$container, 'drag');
	};

	fn.ignore_drag = function(event)
	{
		if(this.options.handle)
		{
			return !$(event.target).is(this.options.handle);
		}

		return $.inArray(event.target.nodeName, this.options.ignore_dragging) >= 0;
	};

	//jQuery adapter
	$.fn.drag = function(options)
	{
		return this.each(function()
		{
			if(!$.data(this, 'drag'))
			{
				$.data(this, 'drag', new Draggable(this, options));
			}
			else
			{
				$.data(this, 'drag').setOptions(options);
			}
		});
	};


}(jQuery, window, document));

;
(function($, window, document, undefined)
{

	var defaults = {
		namespace               : '',
		widget_selector         : 'li',
		widget_margins          : [5,5],		// [10, 10],
		widget_base_dimensions  : [100,30],		// [400, 225],
		extra_rows              : 0,
		extra_cols              : 0,
		min_cols                : 5,			// 1,
		max_cols                : null,			// null,
		min_rows                : 15,
		max_size_x              : 20, 			// 6,
		autogenerate_stylesheet : true,
		avoid_overlapped_widgets: true,
		serialize_params        : function($w, wgd)
		{
			return {
				col   : wgd.col,
				row   : wgd.row,
				size_x: wgd.size_x,
				size_y: wgd.size_y
			};
		},
		collision               : {},
		draggable               : {
			distance: 4
		},
	};







	/**
	 * @class Gridster
	 * @uses Draggable
	 * @uses Collision
	 * @param {HTMLElement} el The HTMLelement that contains all the panes.
	 * @param {Object} [options] An Object with all options you want to
	 *        overwrite:
	 *    @param {HTMLElement|String} [options.widget_selector] Define who will
	 *     be the draggable panes. Can be a CSS Selector String or a
	 *     collection of HTMLElements
	 *    @param {Array} [options.widget_margins] Margin between panes.
	 *     The first index for the horizontal margin (left, right) and
	 *     the second for the vertical margin (top, bottom).
	 *    @param {Array} [options.widget_base_dimensions] Base widget dimensions
	 *     in pixels. The first index for the width and the second for the
	 *     height.
	 *    @param {Number} [options.extra_cols] Add more columns in addition to
	 *     those that have been calculated.
	 *    @param {Number} [options.extra_rows] Add more rows in addition to
	 *     those that have been calculated.
	 *    @param {Number} [options.min_cols] The minimum required columns.
	 *    @param {Number} [options.max_cols] The maximum columns possible (set to null
	 *     for no maximum).
	 *    @param {Number} [options.min_rows] The minimum required rows.
	 *    @param {Number} [options.max_size_x] The maximum number of columns
	 *     that a widget can span.
	 *    @param {Boolean} [options.autogenerate_stylesheet] If true, all the
	 *     CSS required to position all panes in their respective columns
	 *     and rows will be generated automatically and injected to the
	 *     `<head>` of the document. You can set this to false, and write
	 *     your own CSS targeting rows and cols via data-attributes like so:
	 *     `[data-col="1"] { left: 10px; }`
	 *    @param {Boolean} [options.avoid_overlapped_widgets] Avoid that panes loaded
	 *     from the DOM can be overlapped. It is helpful if the positions were
	 *     bad stored in the database or if there was any conflict.
	 *    @param {Function} [options.serialize_params] Return the data you want
	 *     for each widget in the serialization. Two arguments are passed:
	 *     `$w`: the jQuery wrapped HTMLElement, and `wgd`: the grid
	 *     coords object (`col`, `row`, `size_x`, `size_y`).
	 *    @param {Object} [options.collision] An Object with all options for
	 *     Collision class you want to overwrite. See Collision docs for
	 *     more info.
	 *    @param {Object} [options.draggable] An Object with all options for
	 *     Draggable class you want to overwrite. See Draggable docs for more
	 *     info.
	 *
	 * @constructor
	 */
	function Gridster(el, options)
	{
		// console.log("--- Gridster options : ", options, el);
		this.options = $.extend(true, defaults, options);
		this.$el = $(el);
		this.$wrapper = this.$el.parent();
		this.$widgets = this.$el.children(this.options.widget_selector).addClass('gs_w');
		this.panes = [];
		this.$changed = $([]);
		this.wrapper_width = this.$wrapper.width();
		this.min_widget_width = (this.options.widget_margins[0] * 2) + this.options.widget_base_dimensions[0];
		this.min_widget_height = (this.options.widget_margins[1] * 2) + this.options.widget_base_dimensions[1];

		this.$style_tags = $([]);

		this.init();
	}

	Gridster.generated_stylesheets = [];

	var fn = Gridster.prototype;

	fn.init = function()
	{
		this.generate_grid_and_stylesheet();
		this.get_widgets_from_DOM();
		this.set_dom_grid_height();
		this.$wrapper.addClass('ready');
		this.draggable();

		$(window).bind('resize.gridster', throttle($.proxy(this.recalculate_faux_grid, this), 200));
	};


	/**
	 * Disables dragging.
	 *
	 * @method disable
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.disable = function()
	{
		this.$wrapper.find('.player-revert').removeClass('player-revert');
		this.drag_api.disable();
		return this;
	};


	/**
	 * Enables dragging.
	 *
	 * @method enable
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.enable = function()
	{
		this.drag_api.enable();
		return this;
	};


	/**
	 * Add a new widget to the grid.
	 *
	 * @method add_widget
	 * @param {String|HTMLElement} html The string representing the HTML of the widget
	 *  or the HTMLElement.
	 * @param {Number} [size_x] The nº of rows the widget occupies horizontally.
	 * @param {Number} [size_y] The nº of columns the widget occupies vertically.
	 * @param {Number} [col] The column the widget should start in.
	 * @param {Number} [row] The row the widget should start in.
	 * @return {HTMLElement} Returns the jQuery wrapped HTMLElement representing.
	 *  the widget that was just created.
	 */
	fn.add_widget = function(html, size_x, size_y, col, row, transparent_bg, widget_background_color, border_radius, border_width, border_color)
	{
		// console.log("************* add : ", transparent_bg, widget_background_color, border_radius);
		var pos;
		size_x || (size_x = 1);
		size_y || (size_y = 1);

		if(!col & !row)
		{
			pos = this.next_position(size_x, size_y);
		}
		else
		{
			pos = {
				col: col,
				row: row
			};

			this.empty_cells(col, row, size_x, size_y);
		}

		var $w = $(html).attr({
			'data-col'  : pos.col,
			'data-row'  : pos.row,
			'data-sizex': size_x,
			'data-sizey': size_y
		}).addClass('gs_w').appendTo(this.$el).hide();

		var overlay = $('<div id="transparent_overlay" style="position:absolute; width:100%; height:100%; top:0; left:0; background-color:#38383800;">');
		$w.prepend(overlay);

		var color = widget_background_color?widget_background_color:_default.widget_background_color;
		if (transparent_bg) {
			var rgbaColor = 'rgba(' + parseInt(color.slice(1,3),16)+ ',' + parseInt(color.slice(3,5),16)+ ',' + parseInt(color.slice(5,7),16)+',0.4)';
			overlay.css({"background-color": rgbaColor})
			$w.addClass('transparent_bg');
		} else {
			if (widget_background_color) {
				var rgbaColor = widget_background_color
				if (widget_background_color.length>7) {
					var color=widget_background_color
					rgbaColor = 'rgba(' + parseInt(color.slice(1,3),16)+ ',' + parseInt(color.slice(3,5),16)+ ',' + parseInt(color.slice(5,7),16)+ ',' + parseInt(color.slice(-2),16)/256 +')';
				}
				$w.css("cssText","background-color: " + rgbaColor + " !important");
			} else {
				$w.css({"background-color": color});
			}
		}
		var br = border_radius?border_radius:_default.widget_border_radius,
			bw = border_width?border_width:_default.widget_border_width,
			bc = border_color?border_color:_default.widget_border_color;

		$w.css({"border-radius":br+"px"}),
		overlay.css({width: "calc(100% - "+2*bw+"px)",height: "calc(100% - "+2*bw+"px)","border-radius": br+"px", border: bw+'px solid '+bc})
		

		this.$widgets = this.$widgets.add($w);

		this.register_widget($w);

		this.add_faux_rows(pos.size_y);
		//this.add_faux_cols(pos.size_x);

		this.set_dom_grid_height();

		return $w.fadeIn();
	};


	/**
	 * Change the size of a widget.
	 *
	 * @method resize_widget
	 * @param {HTMLElement} $widget The jQuery wrapped HTMLElement
	 *  representing the widget.
	 * @param {Number} size_x The number of columns that will occupy the widget.
	 * @param {Number} size_y The number of rows that will occupy the widget.
	 * @param {Function} callback Function executed when the widget is removed.
	 * @return {HTMLElement} Returns $widget.
	 */
	fn.resize_widget = function($widget, size_x, size_y, transparent_bg, widget_background_color, border_radius, border_width, border_color, callback)
	{	
		// console.log("************* resize : ", transparent_bg, widget_background_color, border_radius);
		var overlay = $widget.find('#transparent_overlay');
		var color = widget_background_color?widget_background_color:_default.widget_background_color;
		if (transparent_bg) {
			var rgbaColor = 'rgba(' + parseInt(color.slice(1,3),16)+ ',' + parseInt(color.slice(3,5),16)+ ',' + parseInt(color.slice(5,7),16)+',0.4)';
			overlay.css({"background-color": rgbaColor})
			$widget.addClass('transparent_bg');
		} else {
			$widget.removeClass('transparent_bg');
			overlay.css({"background-color": "rgba(56, 56, 56, 0)"})
			if (widget_background_color) {
				var rgbaColor = widget_background_color
				if (widget_background_color.length>7) {
					var color=widget_background_color
					rgbaColor = 'rgba(' + parseInt(color.slice(1,3),16)+ ',' + parseInt(color.slice(3,5),16)+ ',' + parseInt(color.slice(5,7),16)+ ',' + parseInt(color.slice(-2),16)/256 +')';
				}
				$widget.css("cssText","background-color: " + rgbaColor + " !important");
			} else {
				$widget.css({"background-color": color});
			}

		}
		var br = border_radius?border_radius:_default.widget_border_radius,
			bw = border_width?border_width:_default.widget_border_width,
			bc = border_color?border_color:_default.widget_border_color;

		$widget.css({"border-radius":br+"px"}),
		overlay.css({width: "calc(100% - "+2*bw+"px)",height: "calc(100% - "+2*bw+"px)","border-radius": br+"px", border: bw+'px solid '+bc})

		var wgd = $widget.coords().grid;
		size_x || (size_x = wgd.size_x);
		size_y || (size_y = wgd.size_y);

		if(size_x > this.cols)
		{
			size_x = this.cols;
		}

		var old_cells_occupied = this.get_cells_occupied(wgd);
		var old_size_x = wgd.size_x;
		var old_size_y = wgd.size_y;
		var old_col = wgd.col;
		var new_col = old_col;
		var wider = size_x > old_size_x;
		var taller = size_y > old_size_y;

		if(old_col + size_x - 1 > this.cols)
		{
			var diff = old_col + (size_x - 1) - this.cols;
			var c = old_col - diff;
			new_col = Math.max(1, c);
		}

		var new_grid_data = {
			col   : new_col,
			row   : wgd.row,
			size_x: size_x,
			size_y: size_y
		};

		var new_cells_occupied = this.get_cells_occupied(new_grid_data);

		var empty_cols = [];
		$.each(old_cells_occupied.cols, function(i, col)
		{
			if($.inArray(col, new_cells_occupied.cols) === -1)
			{
				empty_cols.push(col);
			}
		});

		var occupied_cols = [];
		$.each(new_cells_occupied.cols, function(i, col)
		{
			if($.inArray(col, old_cells_occupied.cols) === -1)
			{
				occupied_cols.push(col);
			}
		});

		var empty_rows = [];
		$.each(old_cells_occupied.rows, function(i, row)
		{
			if($.inArray(row, new_cells_occupied.rows) === -1)
			{
				empty_rows.push(row);
			}
		});

		var occupied_rows = [];
		$.each(new_cells_occupied.rows, function(i, row)
		{
			if($.inArray(row, old_cells_occupied.rows) === -1)
			{
				occupied_rows.push(row);
			}
		});

		this.remove_from_gridmap(wgd);

		if(occupied_cols.length)
		{
			var cols_to_empty = [
				new_col, wgd.row, size_x, Math.min(old_size_y, size_y), $widget
			];
			this.empty_cells.apply(this, cols_to_empty);
		}

		if(occupied_rows.length)
		{
			var rows_to_empty = [new_col, wgd.row, size_x, size_y, $widget];
			this.empty_cells.apply(this, rows_to_empty);
		}

		wgd.col = new_col;
		wgd.size_x = size_x;
		wgd.size_y = size_y;
		this.add_to_gridmap(new_grid_data, $widget);

		//update coords instance attributes
		$widget.data('coords').update({
			width : (size_x * this.options.widget_base_dimensions[0] + ((size_x - 1) * this.options.widget_margins[0]) * 2),
			height: (size_y * this.options.widget_base_dimensions[1] + ((size_y - 1) * this.options.widget_margins[1]) * 2)
		});

		if(size_y > old_size_y)
		{
			this.add_faux_rows(size_y - old_size_y);
		}

		if(size_x > old_size_x)
		{
			this.add_faux_cols(size_x - old_size_x);
		}

		$widget.attr({
			'data-col'  : new_col,
			'data-sizex': size_x,
			'data-sizey': size_y
		});

		if(empty_cols.length)
		{
			var cols_to_remove_holes = [
				empty_cols[0], wgd.row, empty_cols.length, Math.min(old_size_y, size_y), $widget
			];

			this.remove_empty_cells.apply(this, cols_to_remove_holes);
		}

		if(empty_rows.length)
		{
			var rows_to_remove_holes = [
				new_col, wgd.row, size_x, size_y, $widget
			];
			this.remove_empty_cells.apply(this, rows_to_remove_holes);
		}

		if(callback)
		{
			callback.call(this, size_x, size_y);
		}

		return $widget;
	};

	/**
	 * Move down panes in cells represented by the arguments col, row, size_x,
	 * size_y
	 *
	 * @method empty_cells
	 * @param {Number} col The column where the group of cells begin.
	 * @param {Number} row The row where the group of cells begin.
	 * @param {Number} size_x The number of columns that the group of cells
	 * occupy.
	 * @param {Number} size_y The number of rows that the group of cells
	 * occupy.
	 * @param {HTMLElement} $exclude Exclude panes from being moved.
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.empty_cells = function(col, row, size_x, size_y, $exclude)
	{
		var $nexts = this.widgets_below({
			col   : col,
			row   : row - size_y,
			size_x: size_x,
			size_y: size_y
		});

		$nexts.not($exclude).each($.proxy(function(i, w)
		{
			var wgd = $(w).coords().grid;
			if(!(wgd.row <= (row + size_y - 1)))
			{
				return;
			}
			var diff = (row + size_y) - wgd.row;
			this.move_widget_down($(w), diff);
		}, this));

		this.set_dom_grid_height();

		return this;
	};


	/**
	 * Move up panes below cells represented by the arguments col, row, size_x,
	 * size_y.
	 *
	 * @method remove_empty_cells
	 * @param {Number} col The column where the group of cells begin.
	 * @param {Number} row The row where the group of cells begin.
	 * @param {Number} size_x The number of columns that the group of cells
	 * occupy.
	 * @param {Number} size_y The number of rows that the group of cells
	 * occupy.
	 * @param {HTMLElement} exclude Exclude panes from being moved.
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.remove_empty_cells = function(col, row, size_x, size_y, exclude)
	{
		var $nexts = this.widgets_below({
			col   : col,
			row   : row,
			size_x: size_x,
			size_y: size_y
		});

		$nexts.not(exclude).each($.proxy(function(i, widget)
		{
			this.move_widget_up($(widget), size_y);
		}, this));

		this.set_dom_grid_height();

		return this;
	};


	/**
	 * Get the most left column below to add a new widget.
	 *
	 * @method next_position
	 * @param {Number} size_x The nº of rows the widget occupies horizontally.
	 * @param {Number} size_y The nº of columns the widget occupies vertically.
	 * @return {Object} Returns a grid coords object representing the future
	 *  widget coords.
	 */
	fn.next_position = function(size_x, size_y)
	{
		size_x || (size_x = 1);
		size_y || (size_y = 1);
		var ga = this.gridmap;
		var cols_l = ga.length;
		var valid_pos = [];
		var rows_l;
		for(var c = 1; c < cols_l; c++)
		{
			rows_l = ga[c].length;
			for(var r = 1; r <= rows_l; r++)
			{
				var can_move_to = this.can_move_to({
					size_x: size_x,
					size_y: size_y
				}, c, r);

				if(can_move_to)
				{
					valid_pos.push({
						col   : c,
						row   : r,
						size_y: size_y,
						size_x: size_x
					});
				}
			}
		}

		if(valid_pos.length)
		{
			return this.sort_by_row_and_col_asc(valid_pos)[0];
		}
		return false;
	};


	/**
	 * Remove a widget from the grid.
	 *
	 * @method remove_widget
	 * @param {HTMLElement} el The jQuery wrapped HTMLElement you want to remove.
	 * @param {Boolean|Function} silent If true, panes below the removed one
	 * will not move up. If a Function is passed it will be used as callback.
	 * @param {Function} callback Function executed when the widget is removed.
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.remove_widget = function(el, silent, callback)
	{
		var $el = el instanceof jQuery ? el : $(el);
		var wgd = $el.coords().grid;

		// if silent is a function assume it's a callback
		if($.isFunction(silent))
		{
			callback = silent;
			silent = false;
		}

		this.cells_occupied_by_placeholder = {};
		this.$widgets = this.$widgets.not($el);

		var $nexts = this.widgets_below($el);

		this.remove_from_gridmap(wgd);

		$el.fadeOut($.proxy(function()
		{
			$el.remove();

			if(!silent)
			{
				$nexts.each($.proxy(function(i, widget)
				{
					this.move_widget_up($(widget), wgd.size_y);
				}, this));
			}

			this.set_dom_grid_height();

			if(callback)
			{
				callback.call(this, el);
			}
		}, this));
	};


	/**
	 * Remove all panes from the grid.
	 *
	 * @method remove_all_widgets
	 * @param {Function} callback Function executed for each widget removed.
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.remove_all_widgets = function(callback)
	{
		this.$widgets.each($.proxy(function(i, el)
		{
			this.remove_widget(el, true, callback);
		}, this));

		return this;
	};


	/**
	 * Returns a serialized array of the panes in the grid.
	 *
	 * @method serialize
	 * @param {HTMLElement} [$widgets] The collection of jQuery wrapped
	 *  HTMLElements you want to serialize. If no argument is passed all panes
	 *  will be serialized.
	 * @return {Array} Returns an Array of Objects with the data specified in
	 *  the serialize_params option.
	 */
	fn.serialize = function($widgets)
	{
		$widgets || ($widgets = this.$widgets);
		var result = [];
		$widgets.each($.proxy(function(i, widget)
		{
			result.push(this.options.serialize_params($(widget), $(widget).coords().grid));
		}, this));

		return result;
	};


	/**
	 * Returns a serialized array of the panes that have changed their
	 *  position.
	 *
	 * @method serialize_changed
	 * @return {Array} Returns an Array of Objects with the data specified in
	 *  the serialize_params option.
	 */
	fn.serialize_changed = function()
	{
		return this.serialize(this.$changed);
	};


	/**
	 * Creates the grid coords object representing the widget a add it to the
	 * mapped array of positions.
	 *
	 * @method register_widget
	 * @return {Array} Returns the instance of the Gridster class.
	 */
	fn.register_widget = function($el)
	{

		var wgd = {
			'col'   : parseInt($el.attr('data-col'), 10),
			'row'   : parseInt($el.attr('data-row'), 10),
			'size_x': parseInt($el.attr('data-sizex'), 10),
			'size_y': parseInt($el.attr('data-sizey'), 10),
			'el'    : $el
		};

		if(this.options.avoid_overlapped_widgets && !this.can_move_to({size_x: wgd.size_x, size_y: wgd.size_y}, wgd.col, wgd.row))
		{
			wgd = this.next_position(wgd.size_x, wgd.size_y);
			wgd.el = $el;
			$el.attr({
				'data-col'  : wgd.col,
				'data-row'  : wgd.row,
				'data-sizex': wgd.size_x,
				'data-sizey': wgd.size_y
			});
		}

		// attach Coord object to player data-coord attribute
		$el.data('coords', $el.coords());

		// Extend Coord object with grid position info
		$el.data('coords').grid = wgd;

		this.add_to_gridmap(wgd, $el);

		return this;
	};


	/**
	 * Update in the mapped array of positions the value of cells represented by
	 * the grid coords object passed in the `grid_data` param.
	 *
	 * @param {Object} grid_data The grid coords object representing the cells
	 *  to update in the mapped array.
	 * @param {HTMLElement|Boolean} value Pass `false` or the jQuery wrapped
	 *  HTMLElement, depends if you want to delete an existing position or add
	 *  a new one.
	 * @method update_widget_position
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.update_widget_position = function(grid_data, value)
	{
		this.for_each_cell_occupied(grid_data, function(col, row)
		{
			if(!this.gridmap[col])
			{
				return this;
			}
			this.gridmap[col][row] = value;
		});
		return this;
	};


	/**
	 * Remove a widget from the mapped array of positions.
	 *
	 * @method remove_from_gridmap
	 * @param {Object} grid_data The grid coords object representing the cells
	 *  to update in the mapped array.
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.remove_from_gridmap = function(grid_data)
	{
		return this.update_widget_position(grid_data, false);
	};


	/**
	 * Add a widget to the mapped array of positions.
	 *
	 * @method add_to_gridmap
	 * @param {Object} grid_data The grid coords object representing the cells
	 *  to update in the mapped array.
	 * @param {HTMLElement|Boolean} value The value to set in the specified
	 *  position .
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.add_to_gridmap = function(grid_data, value)
	{
		this.update_widget_position(grid_data, value || grid_data.el);

		if(grid_data.el)
		{
			var $widgets = this.widgets_below(grid_data.el);
			$widgets.each($.proxy(function(i, widget)
			{
				this.move_widget_up($(widget));
			}, this));
		}
	};


	/**
	 * Make panes draggable.
	 *
	 * @uses Draggable
	 * @method draggable
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.draggable = function()
	{
		var self = this;
		var draggable_options = $.extend(true, {}, this.options.draggable, {
			offset_left    : this.options.widget_margins[0],
			container_width: this.container_width,
			start          : function(event, ui)
			{
				self.$widgets.filter('.player-revert').removeClass('player-revert');

				self.$player = $(this);
				self.$helper = self.options.draggable.helper === 'clone' ? $(ui.helper) : self.$player;
				self.helper = !self.$helper.is(self.$player);

				self.on_start_drag.call(self, event, ui);
				self.$el.trigger('gridster:dragstart');
			},
			stop           : function(event, ui)
			{
				self.on_stop_drag.call(self, event, ui);
				self.$el.trigger('gridster:dragstop');
			},
			drag           : throttle(function(event, ui)
			{
				self.on_drag.call(self, event, ui);
				self.$el.trigger('gridster:drag');
			}, 30) //60)
		});

		this.drag_api = this.$el.drag(draggable_options).data('drag');
		return this;
	};


	/**
	 * This function is executed when the player begins to be dragged.
	 *
	 * @method on_start_drag
	 * @param {Event} event The original browser event
	 * @param {Object} ui A prepared ui object.
	 */
	fn.on_start_drag = function(event, ui)
	{

		this.$helper.add(this.$player).add(this.$wrapper).addClass('dragging');

		this.$player.addClass('player');
		this.player_grid_data = this.$player.coords().grid;

		// fix error some time value parse as string instead of integer causing error in grid alignment
		// console.log("----------------" , this.player_grid_data )
		this.player_grid_data = {
			...this.player_grid_data,
			col: parseInt(this.player_grid_data.col),
			row: parseInt(this.player_grid_data.row),
			size_x: parseInt(this.player_grid_data.size_x),
			size_y: parseInt(this.player_grid_data.size_y)
		}


		this.placeholder_grid_data = $.extend({}, this.player_grid_data);

		//set new grid height along the dragging period
		this.$el.css('height', this.$el.height() + (this.player_grid_data.size_y * this.min_widget_height));

		var colliders = this.faux_grid;
		var coords = this.$player.data('coords').coords;

		this.cells_occupied_by_player = this.get_cells_occupied(this.player_grid_data);
		this.cells_occupied_by_placeholder = this.get_cells_occupied(this.placeholder_grid_data);

		this.last_cols = [];
		this.last_rows = [];


		// see jquery.collision.js
		this.collision_api = this.$helper.collision(colliders, this.options.collision);

		this.$preview_holder = $('<li />', {
			'class'   : 'preview-holder',
			'data-row': this.$player.attr('data-row'),
			'data-col': this.$player.attr('data-col'),
			css       : {
				width : coords.width,
				height: coords.height
			}
		}).appendTo(this.$el);

		if(this.options.draggable.start)
		{
			this.options.draggable.start.call(this, event, ui);
		}
	};


	/**
	 * This function is executed when the player is being dragged.
	 *
	 * @method on_drag
	 * @param {Event} event The original browser event
	 * @param {Object} ui A prepared ui object.
	 */
	fn.on_drag = function(event, ui)
	{
		//break if dragstop has been fired
		if(this.$player === null)
		{
			return false;
		}

		var abs_offset = {
			left: ui.position.left + this.baseX,
			top : ui.position.top + this.baseY
		};

		this.colliders_data = this.collision_api.get_closest_colliders(abs_offset);

		this.on_overlapped_column_change(this.on_start_overlapping_column, this.on_stop_overlapping_column);

		this.on_overlapped_row_change(this.on_start_overlapping_row, this.on_stop_overlapping_row);

		if(this.helper && this.$player)
		{
			this.$player.css({
				'left': ui.position.left,
				'top' : ui.position.top
			});
		}

		if(this.options.draggable.drag)
		{
			this.options.draggable.drag.call(this, event, ui);
		}
	};

	/**
	 * This function is executed when the player stops being dragged.
	 *
	 * @method on_stop_drag
	 * @param {Event} event The original browser event
	 * @param {Object} ui A prepared ui object.
	 */
	fn.on_stop_drag = function(event, ui)
	{
		this.$helper.add(this.$player).add(this.$wrapper).removeClass('dragging');

		ui.position.left = ui.position.left + this.baseX;
		ui.position.top = ui.position.top + this.baseY;
		this.colliders_data = this.collision_api.get_closest_colliders(ui.position);

		this.on_overlapped_column_change(this.on_start_overlapping_column, this.on_stop_overlapping_column);

		this.on_overlapped_row_change(this.on_start_overlapping_row, this.on_stop_overlapping_row);

		this.$player.addClass('player-revert').removeClass('player').attr({
				'data-col': this.placeholder_grid_data.col,
				'data-row': this.placeholder_grid_data.row
			}).css({
				'left': '',
				'top' : ''
			});

		this.$changed = this.$changed.add(this.$player);

		this.cells_occupied_by_player = this.get_cells_occupied(this.placeholder_grid_data);
		this.set_cells_player_occupies(this.placeholder_grid_data.col, this.placeholder_grid_data.row);

		this.$player.coords().grid.row = this.placeholder_grid_data.row;
		this.$player.coords().grid.col = this.placeholder_grid_data.col;

		if(this.options.draggable.stop)
		{
			this.options.draggable.stop.call(this, event, ui);
		}

		this.$preview_holder.remove();

		this.$player = null;
		this.$helper = null;
		this.placeholder_grid_data = {};
		this.player_grid_data = {};
		this.cells_occupied_by_placeholder = {};
		this.cells_occupied_by_player = {};

		this.set_dom_grid_height();
	};


	/**
	 * Executes the callbacks passed as arguments when a column begins to be
	 * overlapped or stops being overlapped.
	 *
	 * @param {Function} start_callback Function executed when a new column
	 *  begins to be overlapped. The column is passed as first argument.
	 * @param {Function} stop_callback Function executed when a column stops
	 *  being overlapped. The column is passed as first argument.
	 * @method on_overlapped_column_change
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.on_overlapped_column_change = function(start_callback, stop_callback)
	{
		if(!this.colliders_data.length)
		{
			return this;
		}
		var cols = this.get_targeted_columns(this.colliders_data[0].el.data.col);

		var last_n_cols = this.last_cols.length;
		var n_cols = cols.length;
		var i;

		for(i = 0; i < n_cols; i++)
		{
			if($.inArray(cols[i], this.last_cols) === -1)
			{
				(start_callback || $.noop).call(this, cols[i]);
			}
		}

		for(i = 0; i < last_n_cols; i++)
		{
			if($.inArray(this.last_cols[i], cols) === -1)
			{
				(stop_callback || $.noop).call(this, this.last_cols[i]);
			}
		}

		this.last_cols = cols;

		return this;
	};


	/**
	 * Executes the callbacks passed as arguments when a row starts to be
	 * overlapped or stops being overlapped.
	 *
	 * @param {Function} start_callback Function executed when a new row begins
	 *  to be overlapped. The row is passed as first argument.
	 * @param {Function} end_callback Function executed when a row stops being
	 *  overlapped. The row is passed as first argument.
	 * @method on_overlapped_row_change
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.on_overlapped_row_change = function(start_callback, end_callback)
	{
		if(!this.colliders_data.length)
		{
			return this;
		}
		var rows = this.get_targeted_rows(this.colliders_data[0].el.data.row);
		var last_n_rows = this.last_rows.length;
		var n_rows = rows.length;
		var i;

		for(i = 0; i < n_rows; i++)
		{
			if($.inArray(rows[i], this.last_rows) === -1)
			{
				(start_callback || $.noop).call(this, rows[i]);
			}
		}

		for(i = 0; i < last_n_rows; i++)
		{
			if($.inArray(this.last_rows[i], rows) === -1)
			{
				(end_callback || $.noop).call(this, this.last_rows[i]);
			}
		}

		this.last_rows = rows;
	};


	/**
	 * Sets the current position of the player
	 *
	 * @param {Number} col
	 * @param {Number} row
	 * @param {Boolean} no_player
	 * @method set_player
	 * @return {object}
	 */
	fn.set_player = function(col, row, no_player)
	{
		var self = this;
		if(!no_player)
		{
			this.empty_cells_player_occupies();
		}
		var cell = !no_player ? self.colliders_data[0].el.data : {col: col};
		var to_col = cell.col;
		var to_row = row || cell.row;

		this.player_grid_data = {
			col   : to_col,
			row   : to_row,
			size_y: this.player_grid_data.size_y,
			size_x: this.player_grid_data.size_x
		};

		this.cells_occupied_by_player = this.get_cells_occupied(this.player_grid_data);

		var $overlapped_widgets = this.get_widgets_overlapped(this.player_grid_data);

		var constraints = this.widgets_constraints($overlapped_widgets);

		this.manage_movements(constraints.can_go_up, to_col, to_row);
		this.manage_movements(constraints.can_not_go_up, to_col, to_row);

		/* if there is not panes overlapping in the new player position,
		 * update the new placeholder position. */
		if(!$overlapped_widgets.length)
		{
			var pp = this.can_go_player_up(this.player_grid_data);
			if(pp !== false)
			{
				to_row = pp;
			}
			this.set_placeholder(to_col, to_row);
		}

		return {
			col: to_col,
			row: to_row
		};
	};


	/**
	 * See which of the panes in the $panes param collection can go to
	 * a upper row and which not.
	 *
	 * @method widgets_contraints
	 * @param {jQuery} $widgets A jQuery wrapped collection of
	 * HTMLElements.
	 * @return {object} Returns a literal Object with two keys: `can_go_up` &
	 * `can_not_go_up`. Each contains a set of HTMLElements.
	 */
	fn.widgets_constraints = function($widgets)
	{
		var $widgets_can_go_up = $([]);
		var $widgets_can_not_go_up;
		var wgd_can_go_up = [];
		var wgd_can_not_go_up = [];

		$widgets.each($.proxy(function(i, w)
		{
			var $w = $(w);
			var wgd = $w.coords().grid;
			if(this.can_go_widget_up(wgd))
			{
				$widgets_can_go_up = $widgets_can_go_up.add($w);
				wgd_can_go_up.push(wgd);
			}
			else
			{
				wgd_can_not_go_up.push(wgd);
			}
		}, this));

		$widgets_can_not_go_up = $widgets.not($widgets_can_go_up);

		return {
			can_go_up    : this.sort_by_row_asc(wgd_can_go_up),
			can_not_go_up: this.sort_by_row_desc(wgd_can_not_go_up)
		};
	};


	/**
	 * Sorts an Array of grid coords objects (representing the grid coords of
	 * each widget) in ascending way.
	 *
	 * @method sort_by_row_asc
	 * @param {Array} widgets Array of grid coords objects
	 * @return {Array} Returns the array sorted.
	 */
	fn.sort_by_row_asc = function(widgets)
	{
		widgets = widgets.sort(function(a, b)
		{
			if(!a.row)
			{
				a = $(a).coords().grid;
				b = $(b).coords().grid;
			}

			if(a.row > b.row)
			{
				return 1;
			}
			return -1;
		});

		return widgets;
	};


	/**
	 * Sorts an Array of grid coords objects (representing the grid coords of
	 * each widget) placing first the empty cells upper left.
	 *
	 * @method sort_by_row_and_col_asc
	 * @param {Array} widgets Array of grid coords objects
	 * @return {Array} Returns the array sorted.
	 */
	fn.sort_by_row_and_col_asc = function(widgets)
	{
		widgets = widgets.sort(function(a, b)
		{
			if(a.row > b.row || a.row === b.row && a.col > b.col)
			{
				return 1;
			}
			return -1;
		});

		return widgets;
	};


	/**
	 * Sorts an Array of grid coords objects by column (representing the grid
	 * coords of each widget) in ascending way.
	 *
	 * @method sort_by_col_asc
	 * @param {Array} widgets Array of grid coords objects
	 * @return {Array} Returns the array sorted.
	 */
	fn.sort_by_col_asc = function(widgets)
	{
		widgets = widgets.sort(function(a, b)
		{
			if(a.col > b.col)
			{
				return 1;
			}
			return -1;
		});

		return widgets;
	};


	/**
	 * Sorts an Array of grid coords objects (representing the grid coords of
	 * each widget) in descending way.
	 *
	 * @method sort_by_row_desc
	 * @param {Array} widgets Array of grid coords objects
	 * @return {Array} Returns the array sorted.
	 */
	fn.sort_by_row_desc = function(widgets)
	{
		widgets = widgets.sort(function(a, b)
		{
			if(a.row + a.size_y < b.row + b.size_y)
			{
				return 1;
			}
			return -1;
		});
		return widgets;
	};


	/**
	 * Sorts an Array of grid coords objects (representing the grid coords of
	 * each widget) in descending way.
	 *
	 * @method manage_movements
	 * @param {jQuery} $widgets A jQuery collection of HTMLElements
	 *  representing the panes you want to move.
	 * @param {Number} to_col The column to which we want to move the panes.
	 * @param {Number} to_row The row to which we want to move the panes.
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.manage_movements = function($widgets, to_col, to_row)
	{
		$.each($widgets, $.proxy(function(i, w)
		{
			var wgd = w;
			var $w = wgd.el;

			var can_go_widget_up = this.can_go_widget_up(wgd);

			if(can_go_widget_up)
			{
				//target CAN go up
				//so move widget up
				this.move_widget_to($w, can_go_widget_up);
				this.set_placeholder(to_col, can_go_widget_up + wgd.size_y);

			}
			else
			{
				//target can't go up
				var can_go_player_up = this.can_go_player_up(this.player_grid_data);

				if(!can_go_player_up)
				{
					// target can't go up
					// player cant't go up
					// so we need to move widget down to a position that dont
					// overlaps player
					var y = (to_row + this.player_grid_data.size_y) - wgd.row;

					this.move_widget_down($w, y);
					this.set_placeholder(to_col, to_row);
				}
			}
		}, this));

		return this;
	};

	/**
	 * Determines if there is a widget in the row and col given. Or if the
	 * HTMLElement passed as first argument is the player.
	 *
	 * @method is_player
	 * @param {Number|HTMLElement} col_or_el A jQuery wrapped collection of
	 * HTMLElements.
	 * @param {Number} [row] The column to which we want to move the panes.
	 * @return {Boolean} Returns true or false.
	 */
	fn.is_player = function(col_or_el, row)
	{
		if(row && !this.gridmap[col_or_el])
		{
			return false;
		}
		var $w = row ? this.gridmap[col_or_el][row] : col_or_el;
		return $w && ($w.is(this.$player) || $w.is(this.$helper));
	};


	/**
	 * Determines if the widget that is being dragged is currently over the row
	 * and col given.
	 *
	 * @method is_player_in
	 * @param {Number} col The column to check.
	 * @param {Number} row The row to check.
	 * @return {Boolean} Returns true or false.
	 */
	fn.is_player_in = function(col, row)
	{
		var c = this.cells_occupied_by_player || {};
		return $.inArray(col, c.cols) >= 0 && $.inArray(row, c.rows) >= 0;
	};


	/**
	 * Determines if the placeholder is currently over the row and col given.
	 *
	 * @method is_placeholder_in
	 * @param {Number} col The column to check.
	 * @param {Number} row The row to check.
	 * @return {Boolean} Returns true or false.
	 */
	fn.is_placeholder_in = function(col, row)
	{
		var c = this.cells_occupied_by_placeholder || {};
		return this.is_placeholder_in_col(col) && $.inArray(row, c.rows) >= 0;
	};


	/**
	 * Determines if the placeholder is currently over the column given.
	 *
	 * @method is_placeholder_in_col
	 * @param {Number} col The column to check.
	 * @return {Boolean} Returns true or false.
	 */
	fn.is_placeholder_in_col = function(col)
	{
		var c = this.cells_occupied_by_placeholder || [];
		return $.inArray(col, c.cols) >= 0;
	};


	/**
	 * Determines if the cell represented by col and row params is empty.
	 *
	 * @method is_empty
	 * @param {Number} col The column to check.
	 * @param {Number} row The row to check.
	 * @return {Boolean} Returns true or false.
	 */
	fn.is_empty = function(col, row)
	{
		if(typeof this.gridmap[col] !== 'undefined')
		{
			if(typeof this.gridmap[col][row] !== 'undefined' && this.gridmap[col][row] === false)
			{
				return true;
			}
			return false;
		}
		return true;
	};


	/**
	 * Determines if the cell represented by col and row params is occupied.
	 *
	 * @method is_occupied
	 * @param {Number} col The column to check.
	 * @param {Number} row The row to check.
	 * @return {Boolean} Returns true or false.
	 */
	fn.is_occupied = function(col, row)
	{
		if(!this.gridmap[col])
		{
			return false;
		}

		if(this.gridmap[col][row])
		{
			return true;
		}
		return false;
	};


	/**
	 * Determines if there is a widget in the cell represented by col/row params.
	 *
	 * @method is_widget
	 * @param {Number} col The column to check.
	 * @param {Number} row The row to check.
	 * @return {Boolean|HTMLElement} Returns false if there is no widget,
	 * else returns the jQuery HTMLElement
	 */
	fn.is_widget = function(col, row)
	{
		var cell = this.gridmap[col];
		if(!cell)
		{
			return false;
		}

		cell = cell[row];

		if(cell)
		{
			return cell;
		}

		return false;
	};


	/**
	 * Determines if there is a widget in the cell represented by col/row
	 * params and if this is under the widget that is being dragged.
	 *
	 * @method is_widget_under_player
	 * @param {Number} col The column to check.
	 * @param {Number} row The row to check.
	 * @return {Boolean} Returns true or false.
	 */
	fn.is_widget_under_player = function(col, row)
	{
		if(this.is_widget(col, row))
		{
			return this.is_player_in(col, row);
		}
		return false;
	};


	/**
	 * Get panes overlapping with the player or with the object passed
	 * representing the grid cells.
	 *
	 * @method get_widgets_under_player
	 * @return {HTMLElement} Returns a jQuery collection of HTMLElements
	 */
	fn.get_widgets_under_player = function(cells)
	{
		cells || (cells = this.cells_occupied_by_player || {cols: [], rows: []});
		var $widgets = $([]);

		$.each(cells.cols, $.proxy(function(i, col)
		{
			$.each(cells.rows, $.proxy(function(i, row)
			{
				if(this.is_widget(col, row))
				{
					$widgets = $widgets.add(this.gridmap[col][row]);
				}
			}, this));
		}, this));

		return $widgets;
	};


	/**
	 * Put placeholder at the row and column specified.
	 *
	 * @method set_placeholder
	 * @param {Number} col The column to which we want to move the
	 *  placeholder.
	 * @param {Number} row The row to which we want to move the
	 *  placeholder.
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.set_placeholder = function(col, row)
	{
		var phgd = $.extend({}, this.placeholder_grid_data);
		var $nexts = this.widgets_below({
			col   : phgd.col,
			row   : phgd.row,
			size_y: phgd.size_y,
			size_x: phgd.size_x
		});

		// Prevents panes go out of the grid
		var right_col = (col + phgd.size_x - 1);
		if(right_col > this.cols)
		{
			col = col - (right_col - col);
		}

		var moved_down = this.placeholder_grid_data.row < row;
		var changed_column = this.placeholder_grid_data.col !== col;

		this.placeholder_grid_data.col = col;
		this.placeholder_grid_data.row = row;

		this.cells_occupied_by_placeholder = this.get_cells_occupied(this.placeholder_grid_data);

		this.$preview_holder.attr({
			'data-row': row,
			'data-col': col
		});

		if(moved_down || changed_column)
		{
			$nexts.each($.proxy(function(i, widget)
			{
				this.move_widget_up($(widget), this.placeholder_grid_data.col - col + phgd.size_y);
			}, this));
		}


		var $widgets_under_ph = this.get_widgets_under_player(this.cells_occupied_by_placeholder);
		if($widgets_under_ph.length)
		{
			$widgets_under_ph.each($.proxy(function(i, widget)
			{
				var $w = $(widget);
				this.move_widget_down($w, row + phgd.size_y - $w.data('coords').grid.row);
			}, this));
		}

	};


	/**
	 * Determines whether the player can move to a position above.
	 *
	 * @method can_go_player_up
	 * @param {Object} widget_grid_data The actual grid coords object of the
	 *  player.
	 * @return {Number|Boolean} If the player can be moved to an upper row
	 *  returns the row number, else returns false.
	 */
	fn.can_go_player_up = function(widget_grid_data)
	{
		var p_bottom_row = widget_grid_data.row + widget_grid_data.size_y - 1;
		var result = true;
		var upper_rows = [];
		var min_row = 10000;
		var $widgets_under_player = this.get_widgets_under_player();

		/* generate an array with columns as index and array with upper rows
		 * empty as value */
		this.for_each_column_occupied(widget_grid_data, function(tcol)
		{
			var grid_col = this.gridmap[tcol];
			var r = p_bottom_row + 1;
			upper_rows[tcol] = [];

			while(--r > 0)
			{
				if(this.is_empty(tcol, r) || this.is_player(tcol, r) || this.is_widget(tcol, r) && grid_col[r].is($widgets_under_player))
				{
					upper_rows[tcol].push(r);
					min_row = r < min_row ? r : min_row;
				}
				else
				{
					break;
				}
			}

			if(upper_rows[tcol].length === 0)
			{
				result = false;
				return true; //break
			}

			upper_rows[tcol].sort(function(a, b)
			{
				return a - b;
			});
		});

		if(!result)
		{
			return false;
		}

		return this.get_valid_rows(widget_grid_data, upper_rows, min_row);
	};


	/**
	 * Determines whether a widget can move to a position above.
	 *
	 * @method can_go_widget_up
	 * @param {Object} widget_grid_data The actual grid coords object of the
	 *  widget we want to check.
	 * @return {Number|Boolean} If the widget can be moved to an upper row
	 *  returns the row number, else returns false.
	 */
	fn.can_go_widget_up = function(widget_grid_data)
	{
		var p_bottom_row = widget_grid_data.row + widget_grid_data.size_y - 1;
		var result = true;
		var upper_rows = [];
		var min_row = 10000;

		/* generate an array with columns as index and array with topmost rows
		 * empty as value */
		this.for_each_column_occupied(widget_grid_data, function(tcol)
		{
			var grid_col = this.gridmap[tcol];
			upper_rows[tcol] = [];

			var r = p_bottom_row + 1;
			// iterate over each row
			while(--r > 0)
			{
				if(this.is_widget(tcol, r) && !this.is_player_in(tcol, r))
				{
					if(!grid_col[r].is(widget_grid_data.el))
					{
						break;
					}
				}

				if(!this.is_player(tcol, r) && !this.is_placeholder_in(tcol, r) && !this.is_player_in(tcol, r))
				{
					upper_rows[tcol].push(r);
				}

				if(r < min_row)
				{
					min_row = r;
				}
			}

			if(upper_rows[tcol].length === 0)
			{
				result = false;
				return true; //break
			}

			upper_rows[tcol].sort(function(a, b)
			{
				return a - b;
			});
		});

		if(!result)
		{
			return false;
		}

		return this.get_valid_rows(widget_grid_data, upper_rows, min_row);
	};


	/**
	 * Search a valid row for the widget represented by `widget_grid_data' in
	 * the `upper_rows` array. Iteration starts from row specified in `min_row`.
	 *
	 * @method get_valid_rows
	 * @param {Object} widget_grid_data The actual grid coords object of the
	 *  player.
	 * @param {Array} upper_rows An array with columns as index and arrays
	 *  of valid rows as values.
	 * @param {Number} min_row The upper row from which the iteration will start.
	 * @return {Number|Boolean} Returns the upper row valid from the `upper_rows`
	 *  for the widget in question.
	 */
	fn.get_valid_rows = function(widget_grid_data, upper_rows, min_row)
	{
		var p_top_row = widget_grid_data.row;
		var p_bottom_row = widget_grid_data.row + widget_grid_data.size_y - 1;
		var size_y = widget_grid_data.size_y;
		var r = min_row - 1;
		var valid_rows = [];

		while(++r <= p_bottom_row)
		{
			var common = true;
			$.each(upper_rows, function(col, rows)
			{
				if($.isArray(rows) && $.inArray(r, rows) === -1)
				{
					common = false;
				}
			});

			if(common === true)
			{
				valid_rows.push(r);
				if(valid_rows.length === size_y)
				{
					break;
				}
			}
		}

		var new_row = false;
		if(size_y === 1)
		{
			if(valid_rows[0] !== p_top_row)
			{
				new_row = valid_rows[0] || false;
			}
		}
		else
		{
			if(valid_rows[0] !== p_top_row)
			{
				new_row = this.get_consecutive_numbers_index(valid_rows, size_y);
			}
		}

		return new_row;
	};


	fn.get_consecutive_numbers_index = function(arr, size_y)
	{
		var max = arr.length;
		var result = [];
		var first = true;
		var prev = -1; // or null?

		for(var i = 0; i < max; i++)
		{
			if(first || arr[i] === prev + 1)
			{
				result.push(i);
				if(result.length === size_y)
				{
					break;
				}
				first = false;
			}
			else
			{
				result = [];
				first = true;
			}

			prev = arr[i];
		}

		return result.length >= size_y ? arr[result[0]] : false;
	};


	/**
	 * Get panes overlapping with the player.
	 *
	 * @method get_widgets_overlapped
	 * @return {jQuery} Returns a jQuery collection of HTMLElements.
	 */
	fn.get_widgets_overlapped = function()
	{
		var $w;
		var $widgets = $([]);
		var used = [];
		var rows_from_bottom = this.cells_occupied_by_player.rows.slice(0);
		rows_from_bottom.reverse();

		$.each(this.cells_occupied_by_player.cols, $.proxy(function(i, col)
		{
			$.each(rows_from_bottom, $.proxy(function(i, row)
			{
				// if there is a widget in the player position
				if(!this.gridmap[col])
				{
					return true;
				} //next iteration
				var $w = this.gridmap[col][row];
				if(this.is_occupied(col, row) && !this.is_player($w) && $.inArray($w, used) === -1)
				{
					$widgets = $widgets.add($w);
					used.push($w);
				}

			}, this));
		}, this));

		return $widgets;
	};


	/**
	 * This callback is executed when the player begins to collide with a column.
	 *
	 * @method on_start_overlapping_column
	 * @param {Number} col The collided column.
	 * @return {jQuery} Returns a jQuery collection of HTMLElements.
	 */
	fn.on_start_overlapping_column = function(col)
	{
		this.set_player(col, false);
	};


	/**
	 * A callback executed when the player begins to collide with a row.
	 *
	 * @method on_start_overlapping_row
	 * @param {Number} row The collided row.
	 * @return {jQuery} Returns a jQuery collection of HTMLElements.
	 */
	fn.on_start_overlapping_row = function(row)
	{
		this.set_player(false, row);
	};


	/**
	 * A callback executed when the the player ends to collide with a column.
	 *
	 * @method on_stop_overlapping_column
	 * @param {Number} col The collided row.
	 * @return {jQuery} Returns a jQuery collection of HTMLElements.
	 */
	fn.on_stop_overlapping_column = function(col)
	{
		this.set_player(col, false);

		var self = this;
		this.for_each_widget_below(col, this.cells_occupied_by_player.rows[0], function(tcol, trow)
			{
				self.move_widget_up(this, self.player_grid_data.size_y);
			});
	};


	/**
	 * This callback is executed when the player ends to collide with a row.
	 *
	 * @method on_stop_overlapping_row
	 * @param {Number} row The collided row.
	 * @return {jQuery} Returns a jQuery collection of HTMLElements.
	 */
	fn.on_stop_overlapping_row = function(row)
	{
		this.set_player(false, row);

		var self = this;
		var cols = this.cells_occupied_by_player.cols;
		for(var c = 0, cl = cols.length; c < cl; c++)
		{
			this.for_each_widget_below(cols[c], row, function(tcol, trow)
			{
				self.move_widget_up(this, self.player_grid_data.size_y);
			});
		}
	};


	/**
	 * Move a widget to a specific row. The cell or cells must be empty.
	 * If the widget has panes below, all of these panes will be moved also
	 * if they can.
	 *
	 * @method move_widget_to
	 * @param {HTMLElement} $widget The jQuery wrapped HTMLElement of the
	 * widget is going to be moved.
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.move_widget_to = function($widget, row)
	{
		var self = this;
		var widget_grid_data = $widget.coords().grid;
		var diff = row - widget_grid_data.row;
		var $next_widgets = this.widgets_below($widget);

		var can_move_to_new_cell = this.can_move_to(widget_grid_data, widget_grid_data.col, row, $widget);

		if(can_move_to_new_cell === false)
		{
			return false;
		}

		this.remove_from_gridmap(widget_grid_data);
		widget_grid_data.row = row;
		this.add_to_gridmap(widget_grid_data);
		$widget.attr('data-row', row);
		this.$changed = this.$changed.add($widget);


		$next_widgets.each(function(i, widget)
		{
			var $w = $(widget);
			var wgd = $w.coords().grid;
			var can_go_up = self.can_go_widget_up(wgd);
			if(can_go_up && can_go_up !== wgd.row)
			{
				self.move_widget_to($w, can_go_up);
			}
		});

		return this;
	};


	/**
	 * Move up the specified widget and all below it.
	 *
	 * @method move_widget_up
	 * @param {HTMLElement} $widget The widget you want to move.
	 * @param {Number} [y_units] The number of cells that the widget has to move.
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.move_widget_up = function($widget, y_units)
	{
		var el_grid_data = $widget.coords().grid;
		var actual_row = el_grid_data.row;
		var moved = [];
		var can_go_up = true;
		y_units || (y_units = 1);

		if(!this.can_go_up($widget))
		{
			return false;
		} //break;

		this.for_each_column_occupied(el_grid_data, function(col)
		{
			// can_go_up
			if($.inArray($widget, moved) === -1)
			{
				var widget_grid_data = $widget.coords().grid;
				var next_row = actual_row - y_units;
				next_row = this.can_go_up_to_row(widget_grid_data, col, next_row);

				if(!next_row)
				{
					return true;
				}

				var $next_widgets = this.widgets_below($widget);

				this.remove_from_gridmap(widget_grid_data);
				widget_grid_data.row = next_row;
				this.add_to_gridmap(widget_grid_data);
				$widget.attr('data-row', widget_grid_data.row);
				this.$changed = this.$changed.add($widget);

				moved.push($widget);

				$next_widgets.each($.proxy(function(i, widget)
				{
					this.move_widget_up($(widget), y_units);
				}, this));
			}
		});

	};


	/**
	 * Move down the specified widget and all below it.
	 *
	 * @method move_widget_down
	 * @param {jQuery} $widget The jQuery object representing the widget
	 *  you want to move.
	 * @param {Number} y_units The number of cells that the widget has to move.
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.move_widget_down = function($widget, y_units)
	{
		var el_grid_data = $widget.coords().grid;
		var actual_row = el_grid_data.row;
		var moved = [];
		var y_diff = y_units;

		if(!$widget)
		{
			return false;
		}

		if($.inArray($widget, moved) === -1)
		{

			var widget_grid_data = $widget.coords().grid;
			var next_row = actual_row + y_units;
			var $next_widgets = this.widgets_below($widget);

			this.remove_from_gridmap(widget_grid_data);

			$next_widgets.each($.proxy(function(i, widget)
			{
				var $w = $(widget);
				var wd = $w.coords().grid;
				var tmp_y = this.displacement_diff(wd, widget_grid_data, y_diff);

				if(tmp_y > 0)
				{
					this.move_widget_down($w, tmp_y);
				}
			}, this));

			widget_grid_data.row = next_row;
			this.update_widget_position(widget_grid_data, $widget);
			$widget.attr('data-row', widget_grid_data.row);
			this.$changed = this.$changed.add($widget);

			moved.push($widget);
		}
	};


	/**
	 * Check if the widget can move to the specified row, else returns the
	 * upper row possible.
	 *
	 * @method can_go_up_to_row
	 * @param {Number} widget_grid_data The current grid coords object of the
	 *  widget.
	 * @param {Number} col The target column.
	 * @param {Number} row The target row.
	 * @return {Boolean|Number} Returns the row number if the widget can move
	 *  to the target position, else returns false.
	 */
	fn.can_go_up_to_row = function(widget_grid_data, col, row)
	{
		var ga = this.gridmap;
		var result = true;
		var urc = []; // upper_rows_in_columns
		var actual_row = widget_grid_data.row;
		var r;

		/* generate an array with columns as index and array with
		 * upper rows empty in the column */
		this.for_each_column_occupied(widget_grid_data, function(tcol)
		{
			var grid_col = ga[tcol];
			urc[tcol] = [];

			r = actual_row;
			while(r--)
			{
				if(this.is_empty(tcol, r) && !this.is_placeholder_in(tcol, r))
				{
					urc[tcol].push(r);
				}
				else
				{
					break;
				}
			}

			if(!urc[tcol].length)
			{
				result = false;
				return true;
			}

		});

		if(!result)
		{
			return false;
		}

		/* get common rows starting from upper position in all the columns
		 * that widget occupies */
		r = row;
		for(r = 1; r < actual_row; r++)
		{
			var common = true;

			for(var uc = 0, ucl = urc.length; uc < ucl; uc++)
			{
				if(urc[uc] && $.inArray(r, urc[uc]) === -1)
				{
					common = false;
				}
			}

			if(common === true)
			{
				result = r;
				break;
			}
		}

		return result;
	};


	fn.displacement_diff = function(widget_grid_data, parent_bgd, y_units)
	{
		var actual_row = widget_grid_data.row;
		var diffs = [];
		var parent_max_y = parent_bgd.row + parent_bgd.size_y;

		this.for_each_column_occupied(widget_grid_data, function(col)
		{
			var temp_y_units = 0;

			for(var r = parent_max_y; r < actual_row; r++)
			{
				if(this.is_empty(col, r))
				{
					temp_y_units = temp_y_units + 1;
				}
			}

			diffs.push(temp_y_units);
		});

		var max_diff = Math.max.apply(Math, diffs);
		y_units = (y_units - max_diff);

		return y_units > 0 ? y_units : 0;
	};


	/**
	 * Get panes below a widget.
	 *
	 * @method widgets_below
	 * @param {HTMLElement} $el The jQuery wrapped HTMLElement.
	 * @return {jQuery} A jQuery collection of HTMLElements.
	 */
	fn.widgets_below = function($el)
	{
		var el_grid_data = $.isPlainObject($el) ? $el : $el.coords().grid;
		var self = this;
		var ga = this.gridmap;
		var next_row = el_grid_data.row + el_grid_data.size_y - 1;
		var $nexts = $([]);

		this.for_each_column_occupied(el_grid_data, function(col)
		{
			self.for_each_widget_below(col, next_row, function(tcol, trow)
			{
				if(!self.is_player(this) && $.inArray(this, $nexts) === -1)
				{
					$nexts = $nexts.add(this);
					return true; // break
				}
			});
		});

		return this.sort_by_row_asc($nexts);
	};


	/**
	 * Update the array of mapped positions with the new player position.
	 *
	 * @method set_cells_player_occupies
	 * @param {Number} col The new player col.
	 * @param {Number} col The new player row.
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.set_cells_player_occupies = function(col, row)
	{
		this.remove_from_gridmap(this.placeholder_grid_data);
		this.placeholder_grid_data.col = col;
		this.placeholder_grid_data.row = row;
		this.add_to_gridmap(this.placeholder_grid_data, this.$player);
		return this;
	};


	/**
	 * Remove from the array of mapped positions the reference to the player.
	 *
	 * @method empty_cells_player_occupies
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.empty_cells_player_occupies = function()
	{
		this.remove_from_gridmap(this.placeholder_grid_data);
		return this;
	};


	fn.can_go_up = function($el)
	{
		var el_grid_data = $el.coords().grid;
		var initial_row = el_grid_data.row;
		var prev_row = initial_row - 1;
		var ga = this.gridmap;
		var upper_rows_by_column = [];

		var result = true;
		if(initial_row === 1)
		{
			return false;
		}

		this.for_each_column_occupied(el_grid_data, function(col)
		{
			var $w = this.is_widget(col, prev_row);

			if(this.is_occupied(col, prev_row) || this.is_player(col, prev_row) || this.is_placeholder_in(col, prev_row) || this.is_player_in(col, prev_row))
			{
				result = false;
				return true; //break
			}
		});

		return result;
	};


	/**
	 * Check if it's possible to move a widget to a specific col/row. It takes
	 * into account the dimensions (`size_y` and `size_x` attrs. of the grid
	 *  coords object) the widget occupies.
	 *
	 * @method can_move_to
	 * @param {Object} widget_grid_data The grid coords object that represents
	 *  the widget.
	 * @param {Object} col The col to check.
	 * @param {Object} row The row to check.
	 * @param {Number} [max_row] The max row allowed.
	 * @return {Boolean} Returns true if all cells are empty, else return false.
	 */
	fn.can_move_to = function(widget_grid_data, col, row, max_row)
	{
		var ga = this.gridmap;
		var $w = widget_grid_data.el;
		var future_wd = {
			size_y: widget_grid_data.size_y,
			size_x: widget_grid_data.size_x,
			col   : col,
			row   : row
		};
		var result = true;

		//Prevents panes go out of the grid
		var right_col = col + widget_grid_data.size_x - 1;
		if(right_col > this.cols)
		{
			return false;
		}

		if(max_row && max_row < row + widget_grid_data.size_y - 1)
		{
			return false;
		}

		this.for_each_cell_occupied(future_wd, function(tcol, trow)
		{
			var $tw = this.is_widget(tcol, trow);
			if($tw && (!widget_grid_data.el || $tw.is($w)))
			{
				result = false;
			}
		});

		return result;
	};


	/**
	 * Given the leftmost column returns all columns that are overlapping
	 *  with the player.
	 *
	 * @method get_targeted_columns
	 * @param {Number} [from_col] The leftmost column.
	 * @return {Array} Returns an array with column numbers.
	 */
	fn.get_targeted_columns = function(from_col)
	{
		var max = (from_col || this.player_grid_data.col) + (this.player_grid_data.size_x - 1);
		var cols = [];
		for(var col = from_col; col <= max; col++)
		{
			cols.push(col);
		}
		return cols;
	};


	/**
	 * Given the upper row returns all rows that are overlapping with the player.
	 *
	 * @method get_targeted_rows
	 * @param {Number} [from_row] The upper row.
	 * @return {Array} Returns an array with row numbers.
	 */
	fn.get_targeted_rows = function(from_row)
	{
		var max = (from_row || this.player_grid_data.row) + (this.player_grid_data.size_y - 1);
		var rows = [];
		for(var row = from_row; row <= max; row++)
		{
			rows.push(row);
		}
		return rows;
	};

	/**
	 * Get all columns and rows that a widget occupies.
	 *
	 * @method get_cells_occupied
	 * @param {Object} el_grid_data The grid coords object of the widget.
	 * @return {Object} Returns an object like `{ cols: [], rows: []}`.
	 */
	fn.get_cells_occupied = function(el_grid_data)
	{
		var cells = { cols: [], rows: []};
		var i;
		if(arguments[1] instanceof jQuery)
		{
			el_grid_data = arguments[1].coords().grid;
		}

		for(i = 0; i < el_grid_data.size_x; i++)
		{
			var col = el_grid_data.col + i;
			cells.cols.push(col);
		}

		for(i = 0; i < el_grid_data.size_y; i++)
		{
			var row = el_grid_data.row + i;
			cells.rows.push(row);
		}

		return cells;
	};


	/**
	 * Iterate over the cells occupied by a widget executing a function for
	 * each one.
	 *
	 * @method for_each_cell_occupied
	 * @param {Object} el_grid_data The grid coords object that represents the
	 *  widget.
	 * @param {Function} callback The function to execute on each column
	 *  iteration. Column and row are passed as arguments.
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.for_each_cell_occupied = function(grid_data, callback)
	{
		this.for_each_column_occupied(grid_data, function(col)
		{
			this.for_each_row_occupied(grid_data, function(row)
			{
				callback.call(this, col, row);
			});
		});
		return this;
	};


	/**
	 * Iterate over the columns occupied by a widget executing a function for
	 * each one.
	 *
	 * @method for_each_column_occupied
	 * @param {Object} el_grid_data The grid coords object that represents
	 *  the widget.
	 * @param {Function} callback The function to execute on each column
	 *  iteration. The column number is passed as first argument.
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.for_each_column_occupied = function(el_grid_data, callback)
	{
		for(var i = 0; i < el_grid_data.size_x; i++)
		{
			var col = el_grid_data.col + i;
			callback.call(this, col, el_grid_data);
		}
	};


	/**
	 * Iterate over the rows occupied by a widget executing a function for
	 * each one.
	 *
	 * @method for_each_row_occupied
	 * @param {Object} el_grid_data The grid coords object that represents
	 *  the widget.
	 * @param {Function} callback The function to execute on each column
	 *  iteration. The row number is passed as first argument.
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.for_each_row_occupied = function(el_grid_data, callback)
	{
		for(var i = 0; i < el_grid_data.size_y; i++)
		{
			var row = el_grid_data.row + i;
			callback.call(this, row, el_grid_data);
		}
	};


	fn._traversing_widgets = function(type, direction, col, row, callback)
	{
		var ga = this.gridmap;
		if(!ga[col])
		{
			return;
		}

		var cr, max;
		var action = type + '/' + direction;
		if(arguments[2] instanceof jQuery)
		{
			var el_grid_data = arguments[2].coords().grid;
			col = el_grid_data.col;
			row = el_grid_data.row;
			callback = arguments[3];
		}
		var matched = [];
		var trow = row;


		var methods = {
			'for_each/above': function()
			{
				while(trow--)
				{
					if(trow > 0 && this.is_widget(col, trow) && $.inArray(ga[col][trow], matched) === -1)
					{
						cr = callback.call(ga[col][trow], col, trow);
						matched.push(ga[col][trow]);
						if(cr)
						{
							break;
						}
					}
				}
			},
			'for_each/below': function()
			{
				for(trow = row + 1, max = ga[col].length; trow < max; trow++)
				{
					if(this.is_widget(col, trow) && $.inArray(ga[col][trow], matched) === -1)
					{
						cr = callback.call(ga[col][trow], col, trow);
						matched.push(ga[col][trow]);
						if(cr)
						{
							break;
						}
					}
				}
			}
		};

		if(methods[action])
		{
			methods[action].call(this);
		}
	};


	/**
	 * Iterate over each widget above the column and row specified.
	 *
	 * @method for_each_widget_above
	 * @param {Number} col The column to start iterating.
	 * @param {Number} row The row to start iterating.
	 * @param {Function} callback The function to execute on each widget
	 *  iteration. The value of `this` inside the function is the jQuery
	 *  wrapped HTMLElement.
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.for_each_widget_above = function(col, row, callback)
	{
		this._traversing_widgets('for_each', 'above', col, row, callback);
		return this;
	};


	/**
	 * Iterate over each widget below the column and row specified.
	 *
	 * @method for_each_widget_below
	 * @param {Number} col The column to start iterating.
	 * @param {Number} row The row to start iterating.
	 * @param {Function} callback The function to execute on each widget
	 *  iteration. The value of `this` inside the function is the jQuery wrapped
	 *  HTMLElement.
	 * @return {Class} Returns the instance of the Gridster Class.
	 */
	fn.for_each_widget_below = function(col, row, callback)
	{
		this._traversing_widgets('for_each', 'below', col, row, callback);
		return this;
	};


	/**
	 * Returns the highest occupied cell in the grid.
	 *
	 * @method get_highest_occupied_cell
	 * @return {Object} Returns an object with `col` and `row` numbers.
	 */
	fn.get_highest_occupied_cell = function()
	{
		var r;
		var gm = this.gridmap;
		var rows = [];
		var row_in_col = [];
		for(var c = gm.length - 1; c >= 1; c--)
		{
			for(r = gm[c].length - 1; r >= 1; r--)
			{
				if(this.is_widget(c, r))
				{
					rows.push(r);
					row_in_col[r] = c;
					break;
				}
			}
		}

		var highest_row = Math.max.apply(Math, rows);

		this.highest_occupied_cell = {
			col: row_in_col[highest_row],
			row: highest_row
		};

		return this.highest_occupied_cell;
	};


	fn.get_widgets_from = function(col, row)
	{
		var ga = this.gridmap;
		var $widgets = $();

		if(col)
		{
			$widgets = $widgets.add(this.$widgets.filter(function()
			{
				var tcol = $(this).attr('data-col');
				return (tcol === col || tcol > col);
			}));
		}

		if(row)
		{
			$widgets = $widgets.add(this.$widgets.filter(function()
			{
				var trow = $(this).attr('data-row');
				return (trow === row || trow > row);
			}));
		}

		return $widgets;
	};


	/**
	 * Set the current height of the parent grid.
	 *
	 * @method set_dom_grid_height
	 * @return {Object} Returns the instance of the Gridster class.
	 */
	fn.set_dom_grid_height = function()
	{
		var r = this.get_highest_occupied_cell().row; + 1;
		this.$el.css('height', r * this.min_widget_height);
		return this;
	};


	/**
	 * It generates the neccessary styles to position the panes.
	 *
	 * @method generate_stylesheet
	 * @param {Number} rows Number of columns.
	 * @param {Number} cols Number of rows.
	 * @return {Object} Returns the instance of the Gridster class.
	 */
	fn.generate_stylesheet = function(opts)
	{
		if (this.options.autogenerate_stylesheet||this.cols>this.options.max_cols||this.rows>this.options.max_rows) {
			var styles = '';
			var max_size_x = this.options.max_size_x;
			var max_rows = 0;
			var max_cols = 0;
			var i;
			var rules;

			opts || (opts = {});
			opts.cols || (opts.cols = Math.max(this.cols,this.options.max_cols));
			opts.rows || (opts.rows = Math.max(this.rows,this.options.max_rows));
			opts.namespace || (opts.namespace = this.options.namespace);
			opts.widget_base_dimensions || (opts.widget_base_dimensions = this.options.widget_base_dimensions);
			opts.widget_margins || (opts.widget_margins = this.options.widget_margins);
			opts.min_widget_width = (opts.widget_margins[0] * 2) + opts.widget_base_dimensions[0];
			opts.min_widget_height = (opts.widget_margins[1] * 2) + opts.widget_base_dimensions[1];

			// // don't duplicate stylesheets for the same configuration
			// var serialized_opts = $.param(opts);
			// if($.inArray(serialized_opts, Gridster.generated_stylesheets) >= 0)
			// {
			// 	return false;
			// }

			// Gridster.generated_stylesheets.push(serialized_opts);


			/* generate CSS styles for cols */
			for(i = opts.cols; i >= 0; i--)
			{
				styles += (opts.namespace + ' [data-col="' + (i + 1) + '"] { left:' + ((i * opts.widget_base_dimensions[0]) + (i * opts.widget_margins[0]) + ((i + 1) * opts.widget_margins[0])) + 'px;} ');
			}

			/* generate CSS styles for rows */
			for(i = opts.rows; i >= 0; i--)
			{
				styles += (opts.namespace + ' [data-row="' + (i + 1) + '"] { top:' + ((i * opts.widget_base_dimensions[1]) + (i * opts.widget_margins[1]) + ((i + 1) * opts.widget_margins[1]) /*+ ((i===0)?-14:-50) */) + 'px;} ');
			}

			for(var y = 1; y <= opts.rows; y++)
			{
				styles += (opts.namespace + ' [data-sizey="' + y + '"] { height:' + (y * opts.widget_base_dimensions[1] + (y - 1) * (opts.widget_margins[1] * 2)/* + ((y===1)?-14:-34) */) + 'px;}');
				styles += (opts.namespace + ' .sub-section-height-' + y + ' { height:' + (y * opts.widget_base_dimensions[1] + (y - 1) * (opts.widget_margins[1] * 2)/* + ((y===1)?-14:-34) */) + 'px;}');
			}

			for(var x = 1; x <= max_size_x; x++)
			{
				styles += (opts.namespace + ' [data-sizex="' + x + '"] { width:' + (x * opts.widget_base_dimensions[0] + (x - 1) * (opts.widget_margins[0] * 2)) + 'px;}');
			}
			console.log("--- generate styles ---: ",this.options.max_cols,this.options.max_rows)
			this.options.autogenerate_stylesheet = false

			return this.add_style_tag(styles);
		}
	
	};


	/**
	 * Injects the given CSS as string to the head of the document.
	 *
	 * @method add_style_tag
	 * @param {String} css The styles to apply.
	 * @return {Object} Returns the instance of the Gridster class.
	 */
	fn.add_style_tag = function(css)
	{
		var d = document;
		var tag = d.createElement('style');

		d.getElementsByTagName('head')[0].appendChild(tag);
		tag.setAttribute('type', 'text/css');

		if(tag.styleSheet)
		{
			tag.styleSheet.cssText = css;
		}
		else
		{
			tag.appendChild(document.createTextNode(css));
		}

		this.$style_tags = this.$style_tags.add(tag);

		return this;
	};


	/**
	 * Remove the style tag with the associated id from the head of the document
	 *
	 * @method  remove_style_tag
	 * @return {Object} Returns the instance of the Gridster class.
	 */
	fn.remove_style_tags = function()
	{
		this.$style_tags.remove();
	};


	/**
	 * Generates a faux grid to collide with it when a widget is dragged and
	 * detect row or column that we want to go.
	 *
	 * @method generate_faux_grid
	 * @param {Number} rows Number of columns.
	 * @param {Number} cols Number of rows.
	 * @return {Object} Returns the instance of the Gridster class.
	 */
	fn.generate_faux_grid = function(rows, cols)
	{
		this.faux_grid = [];
		this.gridmap = [];
		var col;
		var row;
		for(col = cols; col > 0; col--)
		{
			this.gridmap[col] = [];
			for(row = rows; row > 0; row--)
			{
				this.add_faux_cell(row, col);
			}
		}
		return this;
	};


	/**
	 * Add cell to the faux grid.
	 *
	 * @method add_faux_cell
	 * @param {Number} row The row for the new faux cell.
	 * @param {Number} col The col for the new faux cell.
	 * @return {Object} Returns the instance of the Gridster class.
	 */
	fn.add_faux_cell = function(row, col)
	{
		var coords = $({
			left        : this.baseX + ((col - 1) * this.min_widget_width),
			top         : this.baseY + (row - 1) * this.min_widget_height,
			width       : this.min_widget_width,
			height      : this.min_widget_height,
			col         : col,
			row         : row,
			original_col: col,
			original_row: row
		}).coords();

		if(!$.isArray(this.gridmap[col]))
		{
			this.gridmap[col] = [];
		}

		this.gridmap[col][row] = false;
		this.faux_grid.push(coords);

		return this;
	};


	/**
	 * Add rows to the faux grid.
	 *
	 * @method add_faux_rows
	 * @param {Number} rows The number of rows you want to add to the faux grid.
	 * @return {Object} Returns the instance of the Gridster class.
	 */
	fn.add_faux_rows = function(rows)
	{
		var actual_rows = this.rows;
		var max_rows = actual_rows + (rows || 1);

		for(var r = max_rows; r > actual_rows; r--)
		{
			for(var c = this.cols; c >= 1; c--)
			{
				this.add_faux_cell(r, c);
			}
		}

		this.rows = max_rows;

		if(this.options.autogenerate_stylesheet)
		{
			this.generate_stylesheet();
		}

		return this;
	};

	/**
	 * Add cols to the faux grid.
	 *
	 * @method add_faux_cols
	 * @param {Number} cols The number of cols you want to add to the faux grid.
	 * @return {Object} Returns the instance of the Gridster class.
	 */
	fn.add_faux_cols = function(cols)
	{
		var actual_cols = this.cols;
		var max_cols = actual_cols + (cols || 1);

		for(var c = actual_cols; c < max_cols; c++)
		{
			for(var r = this.rows; r >= 1; r--)
			{
				this.add_faux_cell(r, c);
			}
		}

		this.cols = max_cols;

		if(this.options.autogenerate_stylesheet)
		{
			this.generate_stylesheet();
		}

		return this;
	};


	/**
	 * Recalculates the offsets for the faux grid. You need to use it when
	 * the browser is resized.
	 *
	 * @method recalculate_faux_grid
	 * @return {Object} Returns the instance of the Gridster class.
	 */
	fn.recalculate_faux_grid = function()
	{
		var aw = this.$wrapper.width();
		this.baseX = ($(window).width() - aw) / 2;
		this.baseY = this.$wrapper.offset().top;

		$.each(this.faux_grid, $.proxy(function(i, coords)
		{
			this.faux_grid[i] = coords.update({
				left: this.baseX + (coords.data.col - 1) * this.min_widget_width,
				top : this.baseY + (coords.data.row - 1) * this.min_widget_height
			});

		}, this));

		return this;
	};


	/**
	 * Get all panes in the DOM and register them.
	 *
	 * @method get_widgets_from_DOM
	 * @return {Object} Returns the instance of the Gridster class.
	 */
	fn.get_widgets_from_DOM = function()
	{
		this.$widgets.each($.proxy(function(i, widget)
		{
			this.register_widget($(widget));
		}, this));
		return this;
	};


	/**
	 * Calculate columns and rows to be set based on the configuration
	 *  parameters, grid dimensions, etc ...
	 *
	 * @method generate_grid_and_stylesheet
	 * @return {Object} Returns the instance of the Gridster class.
	 */
	fn.generate_grid_and_stylesheet = function()
	{
		var aw = this.$wrapper.width();
		var ah = this.$wrapper.height();
		var max_cols = this.options.max_cols;
		// console.log("--- aw ah max_cols : ", aw, ah, max_cols);
		var cols = Math.floor(aw / this.min_widget_width) + this.options.extra_cols;

		var actual_cols = this.$widgets.map(function()
		{
			return $(this).attr('data-col');
		}).get();

		//needed to pass tests with phantomjs
		actual_cols.length || (actual_cols = [0]);

		var min_cols = Math.max.apply(Math, actual_cols);

		// get all rows that could be occupied by the current panes
		var max_rows = this.options.extra_rows;
		this.$widgets.each(function(i, w)
		{
			max_rows += (+$(w).attr('data-sizey'));
		});

		this.cols = cols;//Math.max(Math.min(min_cols, cols), 1, this.options.min_cols);

		/*if(max_cols && max_cols >= min_cols && max_cols < this.cols)
		{
			this.cols = max_cols;
		}*/

		this.rows = Math.max(max_rows, this.options.min_rows);

		this.baseX = ($(window).width() - aw) / 2;
		this.baseY = this.$wrapper.offset().top;

		// left and right gutters not included
		this.container_width = (this.cols * this.options.widget_base_dimensions[0]) + ((this.cols - 1) * 2 * this.options.widget_margins[0]);

		if(this.options.autogenerate_stylesheet)
		{
			this.generate_stylesheet();
		}

		return this.generate_faux_grid(this.rows, this.cols);
	};

	/**
	 * Destroy this gridster by removing any sign of its presence, making it easy to avoid memory leaks
	 *
	 * @method destroy
	 * @return {undefined}
	 */
	fn.destroy = function()
	{
		// remove bound callback on window resize
		$(window).unbind('.gridster');

		if(this.drag_api)
		{
			this.drag_api.destroy();
		}

		this.remove_style_tags();

		// lastly, remove gridster element
		// this will additionally cause any data associated to this element to be removed, including this
		// very gridster instance
		this.$el.remove();

		return this;
	};


	//jQuery adapter
	$.fn.gridster = function(options)
	{
		return this.each(function()
		{
			if(!$(this).data('gridster'))
			{
				$(this).data('gridster', new Gridster(this, options));
			}
		});
	};

	$.Gridster = fn;

}(jQuery, window, document));

;
(function($, window, document, undefined)
{

	var fn = $.Gridster;

	fn.widgets_in_col = function(col)
	{
		if(!this.gridmap[col])
		{
			return false;
		}

		for(var i = this.gridmap[col].length - 1; i >= 0; i--)
		{
			if(this.is_widget(col, i) !== false)
			{
				return true;
			}
		}

		return false;
	};

	fn.widgets_in_row = function(row)
	{
		for(var i = this.gridmap.length; i >= 1; i--)
		{
			if(this.is_widget(i, row) !== false)
			{
				return true;
			}
		}

		return false;
	};


	fn.widgets_in_range = function(col1, row1, col2, row2)
	{
		var valid_cols = [];
		var valid_rows = [];
		var $widgets = $([]);
		var c, r, $w, wgd;

		for(c = col2; c >= col1; c--)
		{
			for(r = row2; r >= row1; r--)
			{
				$w = this.is_widget(c, r);

				if($w !== false)
				{
					wgd = $w.data('coords').grid;
					if(wgd.col >= col1 && wgd.col <= col2 && wgd.row >= row1 && wgd.row <= row2)
					{
						$widgets = $widgets.add($w);
					}
				}
			}
		}

		return $widgets;
	};


	fn.get_bottom_most_occupied_cell = function()
	{
		var row = 0;
		var col = 0;
		this.for_each_cell(function($el, c, r)
		{
			if($el && r > row)
			{
				row = r;
				col = c;
			}
		});

		return {col: col, row: row};
	};


	fn.get_right_most_occupied_cell = function()
	{
		var row = 0;
		var col = 0;
		this.for_each_cell(function($el, c, r)
		{
			if($el)
			{
				row = r;
				col = c;
				return false;
			}
		});

		return {col: col, row: row};
	};


	fn.for_each_cell = function(callback, gridmap)
	{
		gridmap || (gridmap = this.gridmap);
		var cols = gridmap.length;
		var rows = gridmap[1].length;

		cols_iter:
			for(var c = cols - 1; c >= 1; c--)
			{
				for(var r = rows - 1; r >= 1; r--)
				{
					var $el = gridmap[c] && gridmap[c][r];
					if(callback)
					{
						if(callback.call(this, $el, c, r) === false)
						{
							break cols_iter;
						}
						else
						{
							continue;
						}
					}
				}
			}
	};


	fn.next_position_in_range = function(size_x, size_y, max_rows)
	{
		size_x || (size_x = 1);
		size_y || (size_y = 1);
		var ga = this.gridmap;
		var cols_l = ga.length;
		var valid_pos = [];
		var rows_l;

		for(var c = 1; c < cols_l; c++)
		{
			rows_l = max_rows || ga[c].length;
			for(var r = 1; r <= rows_l; r++)
			{
				var can_move_to = this.can_move_to({
					size_x: size_x,
					size_y: size_y
				}, c, r, max_rows);

				if(can_move_to)
				{
					valid_pos.push({
						col   : c,
						row   : r,
						size_y: size_y,
						size_x: size_x
					});
				}
			}
		}

		if(valid_pos.length >= 1)
		{
			return this.sort_by_col_asc(valid_pos)[0];
		}

		return false;
	};


	fn.closest_to_right = function(col, row)
	{
		if(!this.gridmap[col])
		{
			return false;
		}
		var cols_l = this.gridmap.length - 1;

		for(var c = col; c <= cols_l; c++)
		{
			if(this.gridmap[c][row])
			{
				return { col: c, row: row };
			}
		}

		return false;
	};


	fn.closest_to_left = function(col, row)
	{
		var cols_l = this.gridmap.length - 1;
		if(!this.gridmap[col])
		{
			return false;
		}

		for(var c = col; c >= 1; c--)
		{
			if(this.gridmap[c][row])
			{
				return { col: c, row: row };
			}
		}

		return false;
	};

}(jQuery, window, document));

(function($)
{
	$.fn.insertAtCaret = function(text, opts)
	{
		var element = $(this).get(0);

		if(document.selection)
		{
			element.focus();
			var orig = element.value.replace(/\r\n/g, "\n");
			var range = document.selection.createRange();

			if(range.parentElement() != element)
			{
				return false;
			}

			range.text = text;

			var actual = tmp = element.value.replace(/\r\n/g, "\n");

			for(var diff = 0; diff < orig.length; diff++)
			{
				if(orig.charAt(diff) != actual.charAt(diff)) break;
			}

			for(var index = 0, start = 0; tmp.match(text) && (tmp = tmp.replace(text, "")) && index <= diff; index = start + text.length)
			{
				start = actual.indexOf(text, index);
			}
		}
		else if(element.selectionStart)
		{
			var start = element.selectionStart;
			var end = element.selectionEnd;

			element.value = element.value.substr(0, start) + text + element.value.substr(end, element.value.length);
		}

		if(start)
		{
			setCaretTo(element, start + text.length);
		}
		else
		{
			element.value = text + element.value;
		}

		$(this).change();

		return this;
	}

	$.fn.replaceTextAt = function(start, end, replacementText)
	{
		var element = $(this).get(0);

		var wholeString = $(this).val();
		var prefix = wholeString.substr(0, start);
		var suffix = wholeString.substr(end);

		$(this).val(prefix + replacementText + suffix);

		var newCursorPosition = prefix.length + replacementText.length;

		setCaretTo(element, newCursorPosition);

		$(this).change();

		return this;
	}

	$.fn.setCaretPosition = function(start, end)
	{
		var element = $(this).get(0);
		element.focus();
		setCaretTo(element, start, end);
		return this;
	}


	$.fn.getCaretPosition = function()
	{
		var element = $(this).get(0);
		$(element).focus();
		return getCaretPosition(element);
	}

	$.fn.getSelectedText = function()
	{
		var element = $(this).get(0);

		// workaround for firefox because window.getSelection does not work inside inputs
		if(typeof element.selectionStart == 'number')
		{
			return $(element).val().substr(element.selectionStart, element.selectionEnd - element.selectionStart);
		}
		else if(document.getSelection)
		{
			return document.getSelection();
		}
		else if(window.getSelection)
		{
			return window.getSelection();
		}
	}

	// privates
	function setCaretTo(element, start, end)
	{
		if(element.createTextRange)
		{
			var range = element.createTextRange();
			range.moveStart('character', start);
			range.moveEnd('character', (end || start));
			range.select();
		}
		else if(element.selectionStart)
		{
			element.focus();
			element.setSelectionRange(start, (end || start));
		}
	}

	function getCaretPosition(element)
	{
		if(typeof element.selectionStart == 'number')
		{
			return element.selectionStart;
		}
		else if(document.selection)
		{
			var range = document.selection.createRange();
			var rangeLength = range.text.length;
			range.moveStart('character', -element.value.length);
			return range.text.length - rangeLength;
		}
	}
})(jQuery);

