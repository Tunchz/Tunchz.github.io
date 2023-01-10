// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


/*
Copyright (c) 2010,2011,2012 Morgan Roderick http://roderick.dk
License: MIT - http://mrgnrdrck.mit-license.org

https://github.com/mroderick/PubSubJS
*/
/*jslint white:true, plusplus:true, stupid:true*/
/*global
  setTimeout,
  module,
  exports,
  define,
  require,
  window
*/

(function(root, factory){
  'use strict';

  // CommonJS
  if (typeof exports === 'object'){
    module.exports = factory();

  // AMD
  } else if (typeof define === 'function' && define.amd){
    define(factory);
  // Browser
  } else {
    root.PubSub = factory();
  }
}( ( typeof window === 'object' && window ) || this, function(){

  'use strict';
  
  var PubSub = {
      name: 'PubSubJS',
      version: '1.3.3'
    },
    messages = {},
    lastUid = -1;

  /**
   *  Returns a function that throws the passed exception, for use as argument for setTimeout
   *  @param { Object } ex An Error object
   */
  function throwException( ex ){
    return function reThrowException(){
      throw ex;
    };
  }

  function callSubscriberWithDelayedExceptions( subscriber, message, data ){
    try {
      subscriber( message, data );
    } catch( ex ){
      setTimeout( throwException( ex ), 0);
    }
  }

  function callSubscriberWithImmediateExceptions( subscriber, message, data ){
    subscriber( message, data );
  }

  function deliverMessage( originalMessage, matchedMessage, data, immediateExceptions ){
    var subscribers = messages[matchedMessage],
      callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions,
      i, j; 

    if ( !messages.hasOwnProperty( matchedMessage ) ) {
      return;
    }

    for ( i = 0, j = subscribers.length; i < j; i++ ){
      callSubscriber( subscribers[i].func, originalMessage, data );
    }
  }

  function createDeliveryFunction( message, data, immediateExceptions ){
    return function deliverNamespaced(){
      var topic = String( message ),
        position = topic.lastIndexOf( '.' );

      // deliver the message as it is now
      deliverMessage(message, message, data, immediateExceptions);

      // trim the hierarchy and deliver message to each level
      while( position !== -1 ){
        topic = topic.substr( 0, position );
        position = topic.lastIndexOf('.');
        deliverMessage( message, topic, data );
      }
    };
  }

  function messageHasSubscribers( message ){
    var topic = String( message ),
      found = messages.hasOwnProperty( topic ),
      position = topic.lastIndexOf( '.' );

    while ( !found && position !== -1 ){
      topic = topic.substr( 0, position );
      position = topic.lastIndexOf('.');
      found = messages.hasOwnProperty( topic );
    }

    return found;
  }

  function publish( message, data, sync, immediateExceptions ){
    var deliver = createDeliveryFunction( message, data, immediateExceptions ),
      hasSubscribers = messageHasSubscribers( message );

    if ( !hasSubscribers ){
      return false;
    }

    if ( sync === true ){
      deliver();
    } else {
      setTimeout( deliver, 0 );
    }
    return true;
  }

  /**
   *  PubSub.publish( message[, data] ) -> Boolean
   *  - message (String): The message to publish
   *  - data: The data to pass to subscribers
   *  Publishes the the message, passing the data to it's subscribers
  **/
  PubSub.publish = function( message, data ){
    return publish( message, data, false, PubSub.immediateExceptions );
  };

  /**
   *  PubSub.publishSync( message[, data] ) -> Boolean
   *  - message (String): The message to publish
   *  - data: The data to pass to subscribers
   *  Publishes the the message synchronously, passing the data to it's subscribers
  **/
  PubSub.publishSync = function( message, data ){
    return publish( message, data, true, PubSub.immediateExceptions );
  };

  /**
   *  PubSub.subscribe( message, func ) -> String
   *  - message (String): The message to subscribe to
   *  - func (Function): The function to call when a new message is published
   *  Subscribes the passed function to the passed message. Every returned token is unique and should be stored if 
   *  you need to unsubscribe
  **/
  PubSub.subscribe = function( message, func ){
    // message is not registered yet
    if ( !messages.hasOwnProperty( message ) ){
      messages[message] = [];
    }

    // forcing token as String, to allow for future expansions without breaking usage
    // and allow for easy use as key names for the 'messages' object
    var token = String(++lastUid);
    messages[message].push( { token : token, func : func } );

    // return token for unsubscribing
    return token;
  };

  /**
   *  PubSub.unsubscribe( tokenOrFunction ) -> String | Boolean
   *  - tokenOrFunction (String|Function): The token of the function to unsubscribe or func passed in on subscribe
   *  Unsubscribes a specific subscriber from a specific message using the unique token 
   *  or if using Function as argument, it will remove all subscriptions with that function 
  **/
  PubSub.unsubscribe = function( tokenOrFunction ){
    var isToken = typeof tokenOrFunction === 'string',
      key = isToken ? 'token' : 'func',
      succesfulReturnValue = isToken ? tokenOrFunction : true,

      result = false,
      m, i;
    
    for ( m in messages ){
      if ( messages.hasOwnProperty( m ) ){
        for ( i = messages[m].length-1 ; i >= 0; i-- ){
          if ( messages[m][i][key] === tokenOrFunction ){
            messages[m].splice( i, 1 );
            result = succesfulReturnValue;

            // tokens are unique, so we can just return here
            if ( isToken ){
              return result;
            }
          }
        }
      }
    }

    return result;
  };
  
  return PubSub;
}));

//     Underscore.js 1.4.2
//     http://underscorejs.org
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.
(function(){var e=this,t=e._,n={},r=Array.prototype,i=Object.prototype,s=Function.prototype,o=r.push,u=r.slice,a=r.concat,f=r.unshift,l=i.toString,c=i.hasOwnProperty,h=r.forEach,p=r.map,d=r.reduce,v=r.reduceRight,m=r.filter,g=r.every,y=r.some,b=r.indexOf,w=r.lastIndexOf,E=Array.isArray,S=Object.keys,x=s.bind,T=function(e){if(e instanceof T)return e;if(!(this instanceof T))return new T(e);this._wrapped=e};typeof exports!="undefined"?(typeof module!="undefined"&&module.exports&&(exports=module.exports=T),exports._=T):e._=T,T.VERSION="1.4.2";var N=T.each=T.forEach=function(e,t,r){if(e==null)return;if(h&&e.forEach===h)e.forEach(t,r);else if(e.length===+e.length){for(var i=0,s=e.length;i<s;i++)if(t.call(r,e[i],i,e)===n)return}else for(var o in e)if(T.has(e,o)&&t.call(r,e[o],o,e)===n)return};T.map=T.collect=function(e,t,n){var r=[];return e==null?r:p&&e.map===p?e.map(t,n):(N(e,function(e,i,s){r[r.length]=t.call(n,e,i,s)}),r)},T.reduce=T.foldl=T.inject=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(d&&e.reduce===d)return r&&(t=T.bind(t,r)),i?e.reduce(t,n):e.reduce(t);N(e,function(e,s,o){i?n=t.call(r,n,e,s,o):(n=e,i=!0)});if(!i)throw new TypeError("Reduce of empty array with no initial value");return n},T.reduceRight=T.foldr=function(e,t,n,r){var i=arguments.length>2;e==null&&(e=[]);if(v&&e.reduceRight===v)return r&&(t=T.bind(t,r)),arguments.length>2?e.reduceRight(t,n):e.reduceRight(t);var s=e.length;if(s!==+s){var o=T.keys(e);s=o.length}N(e,function(u,a,f){a=o?o[--s]:--s,i?n=t.call(r,n,e[a],a,f):(n=e[a],i=!0)});if(!i)throw new TypeError("Reduce of empty array with no initial value");return n},T.find=T.detect=function(e,t,n){var r;return C(e,function(e,i,s){if(t.call(n,e,i,s))return r=e,!0}),r},T.filter=T.select=function(e,t,n){var r=[];return e==null?r:m&&e.filter===m?e.filter(t,n):(N(e,function(e,i,s){t.call(n,e,i,s)&&(r[r.length]=e)}),r)},T.reject=function(e,t,n){var r=[];return e==null?r:(N(e,function(e,i,s){t.call(n,e,i,s)||(r[r.length]=e)}),r)},T.every=T.all=function(e,t,r){t||(t=T.identity);var i=!0;return e==null?i:g&&e.every===g?e.every(t,r):(N(e,function(e,s,o){if(!(i=i&&t.call(r,e,s,o)))return n}),!!i)};var C=T.some=T.any=function(e,t,r){t||(t=T.identity);var i=!1;return e==null?i:y&&e.some===y?e.some(t,r):(N(e,function(e,s,o){if(i||(i=t.call(r,e,s,o)))return n}),!!i)};T.contains=T.include=function(e,t){var n=!1;return e==null?n:b&&e.indexOf===b?e.indexOf(t)!=-1:(n=C(e,function(e){return e===t}),n)},T.invoke=function(e,t){var n=u.call(arguments,2);return T.map(e,function(e){return(T.isFunction(t)?t:e[t]).apply(e,n)})},T.pluck=function(e,t){return T.map(e,function(e){return e[t]})},T.where=function(e,t){return T.isEmpty(t)?[]:T.filter(e,function(e){for(var n in t)if(t[n]!==e[n])return!1;return!0})},T.max=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.max.apply(Math,e);if(!t&&T.isEmpty(e))return-Infinity;var r={computed:-Infinity};return N(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o>=r.computed&&(r={value:e,computed:o})}),r.value},T.min=function(e,t,n){if(!t&&T.isArray(e)&&e[0]===+e[0]&&e.length<65535)return Math.min.apply(Math,e);if(!t&&T.isEmpty(e))return Infinity;var r={computed:Infinity};return N(e,function(e,i,s){var o=t?t.call(n,e,i,s):e;o<r.computed&&(r={value:e,computed:o})}),r.value},T.shuffle=function(e){var t,n=0,r=[];return N(e,function(e){t=T.random(n++),r[n-1]=r[t],r[t]=e}),r};var k=function(e){return T.isFunction(e)?e:function(t){return t[e]}};T.sortBy=function(e,t,n){var r=k(t);return T.pluck(T.map(e,function(e,t,i){return{value:e,index:t,criteria:r.call(n,e,t,i)}}).sort(function(e,t){var n=e.criteria,r=t.criteria;if(n!==r){if(n>r||n===void 0)return 1;if(n<r||r===void 0)return-1}return e.index<t.index?-1:1}),"value")};var L=function(e,t,n,r){var i={},s=k(t);return N(e,function(t,o){var u=s.call(n,t,o,e);r(i,u,t)}),i};T.groupBy=function(e,t,n){return L(e,t,n,function(e,t,n){(T.has(e,t)?e[t]:e[t]=[]).push(n)})},T.countBy=function(e,t,n){return L(e,t,n,function(e,t,n){T.has(e,t)||(e[t]=0),e[t]++})},T.sortedIndex=function(e,t,n,r){n=n==null?T.identity:k(n);var i=n.call(r,t),s=0,o=e.length;while(s<o){var u=s+o>>>1;n.call(r,e[u])<i?s=u+1:o=u}return s},T.toArray=function(e){return e?e.length===+e.length?u.call(e):T.values(e):[]},T.size=function(e){return e.length===+e.length?e.length:T.keys(e).length},T.first=T.head=T.take=function(e,t,n){return t!=null&&!n?u.call(e,0,t):e[0]},T.initial=function(e,t,n){return u.call(e,0,e.length-(t==null||n?1:t))},T.last=function(e,t,n){return t!=null&&!n?u.call(e,Math.max(e.length-t,0)):e[e.length-1]},T.rest=T.tail=T.drop=function(e,t,n){return u.call(e,t==null||n?1:t)},T.compact=function(e){return T.filter(e,function(e){return!!e})};var A=function(e,t,n){return N(e,function(e){T.isArray(e)?t?o.apply(n,e):A(e,t,n):n.push(e)}),n};T.flatten=function(e,t){return A(e,t,[])},T.without=function(e){return T.difference(e,u.call(arguments,1))},T.uniq=T.unique=function(e,t,n,r){var i=n?T.map(e,n,r):e,s=[],o=[];return N(i,function(n,r){if(t?!r||o[o.length-1]!==n:!T.contains(o,n))o.push(n),s.push(e[r])}),s},T.union=function(){return T.uniq(a.apply(r,arguments))},T.intersection=function(e){var t=u.call(arguments,1);return T.filter(T.uniq(e),function(e){return T.every(t,function(t){return T.indexOf(t,e)>=0})})},T.difference=function(e){var t=a.apply(r,u.call(arguments,1));return T.filter(e,function(e){return!T.contains(t,e)})},T.zip=function(){var e=u.call(arguments),t=T.max(T.pluck(e,"length")),n=new Array(t);for(var r=0;r<t;r++)n[r]=T.pluck(e,""+r);return n},T.object=function(e,t){var n={};for(var r=0,i=e.length;r<i;r++)t?n[e[r]]=t[r]:n[e[r][0]]=e[r][1];return n},T.indexOf=function(e,t,n){if(e==null)return-1;var r=0,i=e.length;if(n){if(typeof n!="number")return r=T.sortedIndex(e,t),e[r]===t?r:-1;r=n<0?Math.max(0,i+n):n}if(b&&e.indexOf===b)return e.indexOf(t,n);for(;r<i;r++)if(e[r]===t)return r;return-1},T.lastIndexOf=function(e,t,n){if(e==null)return-1;var r=n!=null;if(w&&e.lastIndexOf===w)return r?e.lastIndexOf(t,n):e.lastIndexOf(t);var i=r?n:e.length;while(i--)if(e[i]===t)return i;return-1},T.range=function(e,t,n){arguments.length<=1&&(t=e||0,e=0),n=arguments[2]||1;var r=Math.max(Math.ceil((t-e)/n),0),i=0,s=new Array(r);while(i<r)s[i++]=e,e+=n;return s};var O=function(){};T.bind=function(t,n){var r,i;if(t.bind===x&&x)return x.apply(t,u.call(arguments,1));if(!T.isFunction(t))throw new TypeError;return i=u.call(arguments,2),r=function(){if(this instanceof r){O.prototype=t.prototype;var e=new O,s=t.apply(e,i.concat(u.call(arguments)));return Object(s)===s?s:e}return t.apply(n,i.concat(u.call(arguments)))}},T.bindAll=function(e){var t=u.call(arguments,1);return t.length==0&&(t=T.functions(e)),N(t,function(t){e[t]=T.bind(e[t],e)}),e},T.memoize=function(e,t){var n={};return t||(t=T.identity),function(){var r=t.apply(this,arguments);return T.has(n,r)?n[r]:n[r]=e.apply(this,arguments)}},T.delay=function(e,t){var n=u.call(arguments,2);return setTimeout(function(){return e.apply(null,n)},t)},T.defer=function(e){return T.delay.apply(T,[e,1].concat(u.call(arguments,1)))},T.throttle=function(e,t){var n,r,i,s,o,u,a=T.debounce(function(){o=s=!1},t);return function(){n=this,r=arguments;var f=function(){i=null,o&&(u=e.apply(n,r)),a()};return i||(i=setTimeout(f,t)),s?o=!0:(s=!0,u=e.apply(n,r)),a(),u}},T.debounce=function(e,t,n){var r,i;return function(){var s=this,o=arguments,u=function(){r=null,n||(i=e.apply(s,o))},a=n&&!r;return clearTimeout(r),r=setTimeout(u,t),a&&(i=e.apply(s,o)),i}},T.once=function(e){var t=!1,n;return function(){return t?n:(t=!0,n=e.apply(this,arguments),e=null,n)}},T.wrap=function(e,t){return function(){var n=[e];return o.apply(n,arguments),t.apply(this,n)}},T.compose=function(){var e=arguments;return function(){var t=arguments;for(var n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},T.after=function(e,t){return e<=0?t():function(){if(--e<1)return t.apply(this,arguments)}},T.keys=S||function(e){if(e!==Object(e))throw new TypeError("Invalid object");var t=[];for(var n in e)T.has(e,n)&&(t[t.length]=n);return t},T.values=function(e){var t=[];for(var n in e)T.has(e,n)&&t.push(e[n]);return t},T.pairs=function(e){var t=[];for(var n in e)T.has(e,n)&&t.push([n,e[n]]);return t},T.invert=function(e){var t={};for(var n in e)T.has(e,n)&&(t[e[n]]=n);return t},T.functions=T.methods=function(e){var t=[];for(var n in e)T.isFunction(e[n])&&t.push(n);return t.sort()},T.extend=function(e){return N(u.call(arguments,1),function(t){for(var n in t)e[n]=t[n]}),e},T.pick=function(e){var t={},n=a.apply(r,u.call(arguments,1));return N(n,function(n){n in e&&(t[n]=e[n])}),t},T.omit=function(e){var t={},n=a.apply(r,u.call(arguments,1));for(var i in e)T.contains(n,i)||(t[i]=e[i]);return t},T.defaults=function(e){return N(u.call(arguments,1),function(t){for(var n in t)e[n]==null&&(e[n]=t[n])}),e},T.clone=function(e){return T.isObject(e)?T.isArray(e)?e.slice():T.extend({},e):e},T.tap=function(e,t){return t(e),e};var M=function(e,t,n,r){if(e===t)return e!==0||1/e==1/t;if(e==null||t==null)return e===t;e instanceof T&&(e=e._wrapped),t instanceof T&&(t=t._wrapped);var i=l.call(e);if(i!=l.call(t))return!1;switch(i){case"[object String]":return e==String(t);case"[object Number]":return e!=+e?t!=+t:e==0?1/e==1/t:e==+t;case"[object Date]":case"[object Boolean]":return+e==+t;case"[object RegExp]":return e.source==t.source&&e.global==t.global&&e.multiline==t.multiline&&e.ignoreCase==t.ignoreCase}if(typeof e!="object"||typeof t!="object")return!1;var s=n.length;while(s--)if(n[s]==e)return r[s]==t;n.push(e),r.push(t);var o=0,u=!0;if(i=="[object Array]"){o=e.length,u=o==t.length;if(u)while(o--)if(!(u=M(e[o],t[o],n,r)))break}else{var a=e.constructor,f=t.constructor;if(a!==f&&!(T.isFunction(a)&&a instanceof a&&T.isFunction(f)&&f instanceof f))return!1;for(var c in e)if(T.has(e,c)){o++;if(!(u=T.has(t,c)&&M(e[c],t[c],n,r)))break}if(u){for(c in t)if(T.has(t,c)&&!(o--))break;u=!o}}return n.pop(),r.pop(),u};T.isEqual=function(e,t){return M(e,t,[],[])},T.isEmpty=function(e){if(e==null)return!0;if(T.isArray(e)||T.isString(e))return e.length===0;for(var t in e)if(T.has(e,t))return!1;return!0},T.isElement=function(e){return!!e&&e.nodeType===1},T.isArray=E||function(e){return l.call(e)=="[object Array]"},T.isObject=function(e){return e===Object(e)},N(["Arguments","Function","String","Number","Date","RegExp"],function(e){T["is"+e]=function(t){return l.call(t)=="[object "+e+"]"}}),T.isArguments(arguments)||(T.isArguments=function(e){return!!e&&!!T.has(e,"callee")}),typeof /./!="function"&&(T.isFunction=function(e){return typeof e=="function"}),T.isFinite=function(e){return T.isNumber(e)&&isFinite(e)},T.isNaN=function(e){return T.isNumber(e)&&e!=+e},T.isBoolean=function(e){return e===!0||e===!1||l.call(e)=="[object Boolean]"},T.isNull=function(e){return e===null},T.isUndefined=function(e){return e===void 0},T.has=function(e,t){return c.call(e,t)},T.noConflict=function(){return e._=t,this},T.identity=function(e){return e},T.times=function(e,t,n){for(var r=0;r<e;r++)t.call(n,r)},T.random=function(e,t){return t==null&&(t=e,e=0),e+(0|Math.random()*(t-e+1))};var _={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};_.unescape=T.invert(_.escape);var D={escape:new RegExp("["+T.keys(_.escape).join("")+"]","g"),unescape:new RegExp("("+T.keys(_.unescape).join("|")+")","g")};T.each(["escape","unescape"],function(e){T[e]=function(t){return t==null?"":(""+t).replace(D[e],function(t){return _[e][t]})}}),T.result=function(e,t){if(e==null)return null;var n=e[t];return T.isFunction(n)?n.call(e):n},T.mixin=function(e){N(T.functions(e),function(t){var n=T[t]=e[t];T.prototype[t]=function(){var e=[this._wrapped];return o.apply(e,arguments),F.call(this,n.apply(T,e))}})};var P=0;T.uniqueId=function(e){var t=P++;return e?e+t:t},T.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var H=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","  ":"t","\u2028":"u2028","\u2029":"u2029"},j=/\\|'|\r|\n|\t|\u2028|\u2029/g;T.template=function(e,t,n){n=T.defaults({},n,T.templateSettings);var r=new RegExp([(n.escape||H).source,(n.interpolate||H).source,(n.evaluate||H).source].join("|")+"|$","g"),i=0,s="__p+='";e.replace(r,function(t,n,r,o,u){s+=e.slice(i,u).replace(j,function(e){return"\\"+B[e]}),s+=n?"'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":r?"'+\n((__t=("+r+"))==null?'':__t)+\n'":o?"';\n"+o+"\n__p+='":"",i=u+t.length}),s+="';\n",n.variable||(s="with(obj||{}){\n"+s+"}\n"),s="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+s+"return __p;\n";try{var o=new Function(n.variable||"obj","_",s)}catch(u){throw u.source=s,u}if(t)return o(t,T);var a=function(e){return o.call(this,e,T)};return a.source="function("+(n.variable||"obj")+"){\n"+s+"}",a},T.chain=function(e){return T(e).chain()};var F=function(e){return this._chain?T(e).chain():e};T.mixin(T),N(["pop","push","reverse","shift","sort","splice","unshift"],function(e){var t=r[e];T.prototype[e]=function(){var n=this._wrapped;return t.apply(n,arguments),(e=="shift"||e=="splice")&&n.length===0&&delete n[0],F.call(this,n)}}),N(["concat","join","slice"],function(e){var t=r[e];T.prototype[e]=function(){return F.call(this,t.apply(this._wrapped,arguments))}}),T.extend(T.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);

/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}



var dimensions;
var sections;
var gravitron, spread;
var overlay;
var washington;
var requestData;
var RequestMapGraphic, requestsCard;

var requestPositions = {"2012MN06":{"x":631.8988952331985,"y":560.7826954641845},"2012FL18":{"x":759.9722985803692,"y":607.692702348123},"2012OH08":{"x":660.0342982745292,"y":683.9440220274098},"2012CA30":{"x":558.9596728593069,"y":732.5941203156243},"2012CA33":{"x":560.3130589717681,"y":642.2679948291154},"2012WI01":{"x":483.08749578174536,"y":691.2000243470649},"2012VA07":{"x":478.752007222125,"y":614.3849990562146},"2012CO07":{"x":468.6044186845698,"y":537.1435232866103},"2012IL10":{"x":539.6319435645187,"y":567.8314998052836},"2012IL08":{"x":487.07725069267985,"y":466.33313547672446},"2012IA04":{"x":549.135019613047,"y":495.9307045322141},"2012LA03":{"x":605.6472477121964,"y":454.65519330228943},"2012CA52":{"x":675.9444957328468,"y":463.3446821731817},"2012FL22":{"x":722.1000414610431,"y":515.1549201675563},"2012IL11":{"x":837.8082522247989,"y":543.4836426395511},"2012CA07":{"x":757.5442508525525,"y":703.971899260835},"2012NY27":{"x":717.2215501135421,"y":752.8073945921532},"2012OH16":{"x":607.4120850506323,"y":792.7863894847645},"2012MD06":{"x":544.2777684693082,"y":808.5317771839826},"2012CA09":{"x":491.335517658905,"y":768.5117238309242},"2012WA01":{"x":419.3010841794764,"y":647.6550521992169},"2012IA03":{"x":417.28398593917126,"y":582.462036354674},"2012CO06":{"x":417.0171143742272,"y":487.9450767694561},"2012NY18":{"x":489.4055865365621,"y":398.27149793270695},"2012NY01":{"x":544.7605500503571,"y":428.35896491228226},"2012FL23":{"x":650.9352447430158,"y":401.8201188722572},"2012NH02":{"x":746.9678217748973,"y":454.14406992679574},"2012CA39":{"x":787.3660998800866,"y":500.0361605347926},"2012CA24":{"x":876.8773219540423,"y":659.7916878968459},"2012MI06":{"x":818.775000628911,"y":678.9741173394249},"2012MA04":{"x":728.8316639778174,"y":815.8906466415513},"2012CT05":{"x":671.2620108327508,"y":794.9450611716638},"2012FL09":{"x":587.2383177312329,"y":851.3155804461958},"2012UT04":{"x":434.666834374707,"y":743.1492901585954},"2012KY06":{"x":393.26013782622385,"y":700.9191550329297},"2012IL17":{"x":357.9288461844402,"y":600.2394815655368},"2012MA06":{"x":377.76563083954795,"y":536.9811511534093},"2012PA12":{"x":435.8856513870705,"y":425.2411077937214},"2012VA02":{"x":592.0390919580565,"y":390.5021634463028},"2012CA26":{"x":629.8584991700568,"y":346.93624559852344},"2012CA10":{"x":709.3671868326531,"y":406.6613000640021},"2012CA36":{"x":806.0445146343259,"y":443.21073717353585},"2012TX23":{"x":853.5417436321941,"y":604.6219603926723},"2012CO03":{"x":811.2285247301076,"y":737.0624061507931},"2012AZ02":{"x":772.0946779323166,"y":777.7271448481166},"2012NY24":{"x":643.5529689418793,"y":846.58137575543},"2012FL16":{"x":486.612312831215,"y":828.6310872007163},"2012CA23":{"x":437.20439605088023,"y":800.6534904784758},"2012GA12":{"x":358.8659839098855,"y":654.9887949624452},"2012PA08":{"x":323.8563189127075,"y":554.7142155866652},"2012MD05":{"x":381.3316889547453,"y":440.32307064255474},"2012NY25":{"x":480.42568328179243,"y":339.4810786692835},"2012NY21":{"x":539.3752201656828,"y":369.7016349512008},"2012NC09":{"x":737.0302958712059,"y":358.19290226959134},"2012RI01":{"x":769.3843211686168,"y":400.8297143726409},"2012WI07":{"x":892.9228531619768,"y":513.4307524687265},"2012NV03":{"x":934.6103565204951,"y":655.242081118682},"2012AZ01":{"x":863.0148455256173,"y":715.4049308779188},"2012IL06":{"x":819.9086878428076,"y":795.4908978555978},"2012NJ09":{"x":696.0718319605318,"y":860.4154781957534},"2012CT04":{"x":533.6777626081931,"y":865.9892109711444},"2012IA01":{"x":369.0951353634661,"y":803.6282151450641},"2012NC07":{"x":382.3895721949786,"y":753.2677121645846},"2012SD01":{"x":308.38580138524117,"y":674.0978081984895},"2012MI01":{"x":357.4221645995244,"y":486.1938520248511},"2012MN08":{"x":392.516306027221,"y":388.07630525861464},"2012NH01":{"x":576.8052591194847,"y":332.45804612019606},"2012WA06":{"x":683.844292170376,"y":354.88555829720076},"2012NY19":{"x":821.076309281959,"y":391.0028752735552},"2012NY03":{"x":841.7021833020646,"y":482.94230371908327},"2012FL10":{"x":894.1667297014085,"y":564.9060454868614},"2012PA06":{"x":862.7602891076184,"y":767.4968391065138},"2012OH06":{"x":746.3929553694635,"y":868.4112837016396},"2012MI04":{"x":618.3444727185123,"y":893.7394289814572},"2012AZ09":{"x":568.8427847124568,"y":902.6869039900594},"2012CA03":{"x":445.70181036526276,"y":860.7757528560402},"2012MI03":{"x":340.6706771878091,"y":719.7805339903298},"2012PA18":{"x":307.7117419110089,"y":623.1944654481493},"2012IN02":{"x":342.4505017760352,"y":406.56333906032177},"2012WI08":{"x":439.63753568802525,"y":371.6027124011627},"2012NY11":{"x":527.4526978807684,"y":320.1350548619211},"2012VA05":{"x":658.9726836146074,"y":301.6020741115014},"2012NJ03":{"x":748.1724078089685,"y":310.1544945969815},"2012NY17":{"x":855.4680760254365,"y":429.64901179506865},"2012TX25":{"x":905.5383066157666,"y":612.7433058466032},"2012CA44":{"x":912.7915961686917,"y":699.0944325780056},"2012MT01":{"x":781.7488111009641,"y":828.5887802756943},"2012WV02":{"x":715.5958882339341,"y":907.6795237857856},"2012AL06":{"x":486.5448061466343,"y":883.5970434855516},"2012MN03":{"x":401.6179068642825,"y":839.2801823900553},"2012NV04":{"x":333.29294744412414,"y":767.6648254248176},"2012OK02":{"x":265.415968117468,"y":649.3432981814225},"2012NY23":{"x":311.6939297607604,"y":506.40069485467814},"2012CA41":{"x":432.6066133842135,"y":325.3662610475667},"2012NC08":{"x":570.294057570302,"y":283.7027393146028},"2012CO04":{"x":611.7229024928281,"y":298.74307503321444},"2012IL13":{"x":785.5819932116398,"y":353.91877046803836},"2012NY14":{"x":883.5537034765423,"y":464.1093800489655},"2012MN02":{"x":935.468174432483,"y":538.440998847691},"2012OH15":{"x":905.164683049773,"y":745.1834137060806},"2012OR04":{"x":824.2494004277634,"y":842.4181742703068},"2012NE02":{"x":666.0379754232281,"y":898.2749398112579},"2012TX05":{"x":521.8151601873192,"y":913.5190428702778},"2012CA47":{"x":441.8600484762906,"y":907.306613976789},"2012MN05":{"x":259.7138365168175,"y":693.2385491117119},"2012MN01":{"x":277.99127843993875,"y":536.398387705818},"2012OH12":{"x":327.3425340675706,"y":449.36705960502127},"2012IL12":{"x":446.2168604405593,"y":282.55539586101656},"2012IA02":{"x":488.06495708362434,"y":290.9403305960124},"2012FL07":{"x":702.9451917857191,"y":313.01251376328537},"2012CA12":{"x":793.3558993277067,"y":310.29956565747983},"2012TX14":{"x":956.9240071422066,"y":499.64230959402835},"2012FL02":{"x":936.3164396082814,"y":580.7407982282406},"2012OR02":{"x":862.08346685137,"y":819.8209920419736},"2012IL15":{"x":760.3365310889653,"y":912.4696246449239},"2012TN09":{"x":681.7822145292992,"y":937.9584728201257},"2012IN08":{"x":480.17802922246307,"y":927.4382423705537},"2012MO02":{"x":322.4765822745043,"y":815.063043081936},"2012WA05":{"x":295.6820692361473,"y":717.7232620964671},"2012WV03":{"x":285.3887746367925,"y":583.4620520420876},"2012NM01":{"x":299.741133489139,"y":392.3898089692852},"2012CT01":{"x":353.34520572053395,"y":362.6337839870983},"2012ND01":{"x":527.7067666481912,"y":275.5564406436464},"2012OR01":{"x":617.8253508740482,"y":255.58320987763472},"2012TX06":{"x":858.7541807174571,"y":364.45279401737463},"2012NJ07":{"x":893.427256409229,"y":385.4690619800812},"2012WA10":{"x":981.9211292724732,"y":656.7200744606256},"2012OH07":{"x":962.1879127516702,"y":693.3990099407241},"2012IN09":{"x":791.6212671886873,"y":870.7702041632518},"2012SC06":{"x":640.568711044003,"y":932.8152619960752},"2012MO04":{"x":599.2864867170924,"y":935.6463514211565},"2012CA15":{"x":408.09058095557276,"y":881.0942166711922},"2012AR04":{"x":291.4696785704785,"y":758.5769366915956},"2012NY04":{"x":252.9757035603785,"y":607.8014417765048},"2012PA07":{"x":262.6122048983836,"y":497.67365400429753},"2012CA45":{"x":392.6562585282171,"y":341.7704884704239},"2012IL18":{"x":466.63819313896715,"y":246.87235800905563},"2012TX35":{"x":694.4029465746548,"y":271.999990283013},"2012TN06":{"x":825.4087938987021,"y":339.38146132819725},"2012NJ06":{"x":923.716992224163,"y":474.66795902241745},"2012RI02":{"x":978.5834562530339,"y":533.5537952126948},"2012CA25":{"x":895.8097334572088,"y":797.593843217363},"2012MN07":{"x":830.427591874923,"y":883.9967020347268},"2012HI01":{"x":615.1037282337385,"y":972.8919153750516},"2012CA31":{"x":550.6619767235959,"y":942.8246813692431},"2012VA06":{"x":349.0557121878785,"y":844.4782688654168},"2012OH09":{"x":258.9092278426552,"y":735.0894476893326},"2012IL16":{"x":249.80784503282462,"y":565.4789844493674},"2012NY12":{"x":290.6352196527025,"y":469.10663415732415},"2012TN04":{"x":406.7776019208357,"y":292.53323841769344},"2012AZ06":{"x":588.412336826555,"y":229.12555276391578},"2012SC07":{"x":657.182115506306,"y":258.06463306315584},"2012VA11":{"x":862.424881494916,"y":324.8906273143289},"2012MA01":{"x":896.8546072528121,"y":424.4141939980247},"2012AR02":{"x":956.4493423015743,"y":614.6204961710525},"2012ME02":{"x":942.9565036853629,"y":726.2653225944904},"2012MI14":{"x":862.4359634129206,"y":859.6502283772722},"2012NY06":{"x":749.4437624107929,"y":950.8912746265577},"2012GA06":{"x":511.46867777916975,"y":952.4462551618641},"2012NC11":{"x":369.19724182330384,"y":877.5245646081016},"2012TX32":{"x":287.6641848190041,"y":796.6747057197865},"2012MI08":{"x":226.51720459838882,"y":669.1431330017709},"2012MS02":{"x":291.8975696528827,"y":431.0750177268022},"2012CA46":{"x":358.2055042997936,"y":324.0395318136854},"2012FL26":{"x":555.1828325307055,"y":247.3545121248782},"2012CA16":{"x":732.9217058689904,"y":270.95276346796464},"2012CO02":{"x":832.3573727588599,"y":301.4462936932641},"2012VA09":{"x":931.3742739309581,"y":437.95223965515385},"2012TX21":{"x":974.9417532413394,"y":571.7746011017867},"2012OH05":{"x":928.1666402572412,"y":777.5989099330436},"2012KS02":{"x":798.2922530630387,"y":907.4554263395485},"2012MI09":{"x":651.5706062551455,"y":969.3376605803592},"2012MA03":{"x":578.0450377089651,"y":969.4049569169347},"2012WA08":{"x":311.6636788569073,"y":852.4940885652854},"2012NC04":{"x":225.3192541047006,"y":713.3245832572277},"2012WI03":{"x":214.459830564886,"y":552.8889220115065},"2012NC13":{"x":248.68711518930849,"y":461.9271165025082},"2012OH10":{"x":369.8863992174391,"y":289.38942506683844},"2012IN05":{"x":504.6960427367876,"y":245.13225066028832},"2012OK03":{"x":716.9444525181393,"y":239.12684493974749},"2012MD01":{"x":866.167253322029,"y":288.11470339742544},"2012NJ12":{"x":959.5417310493638,"y":460.3323784368304},"2012MS01":{"x":991.9170230980435,"y":619.1662450802553},"2012MD08":{"x":958.1446027174151,"y":758.7805528573078},"2012WA03":{"x":885.5242260945711,"y":886.8498360955922},"2012CA18":{"x":714.0435114705851,"y":958.6005093600667},"2012CA05":{"x":456.55224387245795,"y":958.5102765547315},"2012TX27":{"x":411.70842235885726,"y":933.0663924831154},"2012AR01":{"x":254.01200809486733,"y":808.5169698673882},"2012CT02":{"x":225.49798608513413,"y":633.0402237786066},"2012CA34":{"x":257.02191307594575,"y":424.86221041269863},"2012FL13":{"x":315.55403577512203,"y":357.2324788432807},"2012MO05":{"x":530.7134300560875,"y":221.19421470461063},"2012PA15":{"x":638.2286966808902,"y":223.35279122662865},"2012NY13":{"x":766.8762895384433,"y":273.29767936279165},"2012NC10":{"x":927.3279022899834,"y":402.4652520825715},"2012ID02":{"x":1005.5114119862552,"y":586.8547256348876},"2012CA02":{"x":908.6338999607384,"y":832.1316247634883},"2012SC01":{"x":804.9729999790036,"y":942.0389764229072},"2012TN03":{"x":685.2081347431127,"y":976.3709031009611},"2012WA02":{"x":545.511457272107,"y":979.6905465486288},"2012PA09":{"x":385.6850209006539,"y":910.5169187806215},"2012WA04":{"x":257.7055437604948,"y":773.1729272585114},"2012CA22":{"x":221.83617802930243,"y":588.4087287621174},"2012NY10":{"x":213.92025870232757,"y":465.41709510687826},"2012GA02":{"x":319.09392919304844,"y":323.4430883791964},"2012KY01":{"x":457.5497622504434,"y":210.9396543233462},"2012NJ01":{"x":682.5864900380367,"y":232.5798808264055},"2012MO08":{"x":800.7651229442328,"y":271.9917445149452},"2012CA35":{"x":961.2718458848249,"y":420.5021976274751},"2012HI02":{"x":1018.9689030260641,"y":662.5223494513946},"2012IL14":{"x":935.4769036795851,"y":811.6608605289948},"2012TN07":{"x":859.3554244953717,"y":907.4888673445937},"2012PA11":{"x":735.6116969519422,"y":984.3032886187179},"2012NV01":{"x":484.3986904787734,"y":975.7385108583268},"2012WV01":{"x":334.51560489654287,"y":877.8648909645109},"2012MI07":{"x":225.1727078422028,"y":747.3782222510835},"2012TX20":{"x":180.4415559709047,"y":555.4917795782434},"2012IL09":{"x":225.1625218276636,"y":434.42970122825056},"2012VA08":{"x":336.24312830489896,"y":297.5187789018333},"2012NJ02":{"x":490.20195881350674,"y":214.66269504100794},"2012TX12":{"x":653.9807574188844,"y":193.79991832958643},"2012FL06":{"x":834.0543116873897,"y":266.8607922127199},"2012PA13":{"x":939.5341888065868,"y":371.62935038184116},"2012NY08":{"x":1013.3332971944418,"y":543.3030097358538},"2012GA05":{"x":977.808384538232,"y":786.3250487333268},"2012MD02":{"x":829.5947234731649,"y":920.5191300427412},"2012PA17":{"x":637.2060007961118,"y":1000.5837104688756},"2012PA03":{"x":513.6667500461164,"y":987.9141252912484},"2012KY05":{"x":351.39257175401906,"y":905.7584153420682},"2012GA01":{"x":235.17067143021615,"y":840.300184180161},"2012TX19":{"x":194.44955750821316,"y":644.9594241840863},"2012VA04":{"x":263.1774323504443,"y":392.24854558985413},"2012PA16":{"x":398.0201497953425,"y":243.46019888767478},"2012VA10":{"x":498.60447682162146,"y":184.03101945253195},"2012PA05":{"x":709.1277313261031,"y":206.47267304251167},"2012TX22":{"x":829.1788075944147,"y":229.31707238313953},"2012NY07":{"x":991.4838466747431,"y":475.68794408017646},"2012NJ11":{"x":1023.162219945154,"y":630.6345075289518},"2012CA21":{"x":937.4463100816871,"y":847.6752313806396},"2012TX28":{"x":908.7014993836623,"y":910.7737018226941},"2012TX08":{"x":707.6834534782447,"y":999.5629490226586},"2012AL01":{"x":454.180191281897,"y":994.5283200766005},"2012NC02":{"x":306.2055119177531,"y":893.2414637087473},"2012CA49":{"x":225.99226361635328,"y":779.1926596670454},"2012CT03":{"x":189.82502221037518,"y":585.3756830583216},"2012DE01":{"x":206.57743848927137,"y":520.0018214248981},"2012GA10":{"x":368.356465248769,"y":256.1662553040921},"2012CA13":{"x":553.412213263744,"y":197.65635722722578},"2012NY02":{"x":683.6091663765529,"y":187.53194523149094},"2012LA01":{"x":916.5196553124335,"y":323.49431682906453},"2012TX11":{"x":970.3399068955129,"y":373.558100096207},"2012TX33":{"x":1034.145036079865,"y":601.808173692264},"2012NM02":{"x":990.1181053676698,"y":715.5873748465062},"2012OR05":{"x":828.3514140614352,"y":963.9715134541517},"2012FL27":{"x":667.8869790174075,"y":1002.6837896498732},"2012NY22":{"x":559.598348201169,"y":1009.2332327565736},"2012AZ05":{"x":373.0381191250594,"y":939.8766210313973},"2012MO06":{"x":221.72847359906254,"y":811.6006314077858},"2012NY16":{"x":186.70265075094,"y":615.072994661057},"2012WI02":{"x":286.0064522576884,"y":344.2431087165099},"2012CA04":{"x":298.887504545168,"y":298.2843902172075},"2012AZ03":{"x":410.47841105367934,"y":215.322005300252},"2012MI11":{"x":757.5770348939228,"y":196.63867819843466},"2012IN06":{"x":862.2019939721829,"y":248.5352785227875},"2012GA14":{"x":989.370444291631,"y":445.3382083302456},"2012NJ05":{"x":1049.8971519499246,"y":648.4546744637101},"2012AL04":{"x":970.2052041655089,"y":848.8114578392131},"2012GA11":{"x":969.6495157190801,"y":949.0031312351902},"2012NV02":{"x":674.2431423813758,"y":1031.8093318936264},"2012IN01":{"x":478.47332246998104,"y":1011.8820221210864},"2012LA05":{"x":323.41039911804927,"y":918.1636865235763},"2012IN07":{"x":188.98065549368584,"y":690.0625619984272},"2012CA38":{"x":115.4458909731756,"y":563.6950669966385},"2012AZ04":{"x":233.07721713297553,"y":387.1119777460194},"2012MA05":{"x":339.34529840536106,"y":190.2226883198514},"2012TX10":{"x":593.3737359138969,"y":178.63804219273914},"2012CO01":{"x":625.5289616464976,"y":169.11335081622036},"2012MI12":{"x":853.3516398310953,"y":202.2998888154699},"2012FL17":{"x":984.379181066091,"y":399.4638074904033},"2012AZ07":{"x":1052.6945068329317,"y":527.0247802120474},"2012NY26":{"x":987.0684442341682,"y":744.7782556833279},"2012KY04":{"x":882.0214120381271,"y":928.54287847191},"2012OK01":{"x":637.4252781151039,"y":1073.5414269946355},"2012CA28":{"x":531.7335547367842,"y":1017.963871379854},"2012CA17":{"x":280.11079002533506,"y":1009.6289036870982},"2012IL02":{"x":204.91835801934351,"y":840.863876108295},"2012CA53":{"x":160.04937728884278,"y":578.1159949845102},"2012TX17":{"x":210.5934064598962,"y":407.66302108648733},"2012NY20":{"x":341.4517720965796,"y":267.4556713552241},"2012GA03":{"x":560.3490291016935,"y":169.05316274698558},"2012CA51":{"x":770.2878451139296,"y":134.55212703812686},"2012CO05":{"x":898.0448554506262,"y":297.7732576981953},"2012OH13":{"x":1080.445496020734,"y":382.42615981590075},"2012FL19":{"x":1034.5667464529363,"y":564.7846679255516},"2012KY02":{"x":1019.6829180740104,"y":744.4868546680439},"2012SC02":{"x":856.266336381088,"y":955.600840164146},"2012FL20":{"x":749.2410325199448,"y":1011.5611877803042},"2012MN04":{"x":526.570155720221,"y":1099.1770817584852},"2012ME01":{"x":356.7389543830877,"y":963.8105758562439},"2012TX26":{"x":186.80517714428802,"y":732.0996521886264},"2012MO01":{"x":160.24224401563131,"y":670.4154727644142},"2012OR03":{"x":185.72005195909173,"y":394.8180970076478},"2012PA10":{"x":252.52817563554433,"y":316.5561929999291},"2012CA50":{"x":451.702085750335,"y":176.60055736059385},"2012LA04":{"x":734.8262453146838,"y":179.6984952499797},"2012MI13":{"x":943.245871797384,"y":306.67031580530073},"2012FL14":{"x":1027.697002686592,"y":455.06284328904496},"2012AL03":{"x":1065.9913047127307,"y":551.0598679268743},"2012MI02":{"x":1010.0473966974265,"y":783.241721745485},"2012TX03":{"x":792.2785277049592,"y":1001.1002669400062},"2012CA27":{"x":705.6078198430099,"y":1028.339848588062},"2012FL25":{"x":504.5643800684029,"y":1022.8696988475956},"2012OK05":{"x":317.4512211297638,"y":947.687998216719},"2012FL12":{"x":197.0331184560237,"y":757.2868765851547},"2012IN04":{"x":158.27389969911297,"y":611.8859799243154},"2012CA01":{"x":219.6489695960851,"y":297.0846673144701},"2012FL21":{"x":308.3982130125946,"y":268.9560497911904},"2012VA01":{"x":514.8212273249102,"y":93.2059238241093},"2012TN08":{"x":625.5655617338825,"y":133.9765227311841},"2012WA09":{"x":907.7587049080677,"y":272.1568026484064},"2012FL08":{"x":1002.606533705045,"y":420.4620281290352},"2012TX07":{"x":1066.6667003242233,"y":673.5053655205686},"2012CA14":{"x":964.8325859017982,"y":817.1605759368182},"2012OH02":{"x":937.9993034367394,"y":941.23475180895},"2012CA11":{"x":778.9222811525432,"y":1039.6021937644566},"2012MA09":{"x":411.8428749419866,"y":1025.4600795630233},"2012TX30":{"x":333.7885776283453,"y":977.8905638460618},"2012AL07":{"x":159.76085357306206,"y":865.4352359961309},"2012TX15":{"x":129.46192658954973,"y":654.6518440163666},"2012PA01":{"x":169.07765320781758,"y":498.1956199171835},"2012NC12":{"x":267.7534467242257,"y":263.8757241420577},"2012TX13":{"x":539.6383613129371,"y":151.66122732097375},"2012OH04":{"x":708.5449281943905,"y":175.3418158211337},"2012AL02":{"x":889.4949504924631,"y":253.42362451597174},"2012UT03":{"x":997.5269715420336,"y":353.23137907252453},"2012CA06":{"x":1058.0084472153037,"y":620.7033288174733},"2012MD07":{"x":1064.5328555592891,"y":754.9237687562933},"2012NC05":{"x":907.3127134118126,"y":1026.4447176603592},"2012MD04":{"x":664.5218283619754,"y":1075.311231742706},"2012WI04":{"x":487.11301548529934,"y":1042.6278015221799},"2012LA02":{"x":251.91524633900636,"y":881.5675546662103},"2012CA42":{"x":144.25734126474674,"y":759.1200959209204},"2012GA13":{"x":81.22518180288213,"y":555.555427652673},"2012IN03":{"x":150.32710318227296,"y":449.6121120922239},"2012NC01":{"x":313.731399921399,"y":180.77474312707514},"2012NM03":{"x":459.22108773687575,"y":151.28133079887417},"2012TX34":{"x":705.043635652704,"y":82.21621610017975},"2012TX01":{"x":922.8689524695349,"y":169.40344309393817},"2012CA37":{"x":1022.4342314563979,"y":309.66564442831515},"2012OK04":{"x":1093.5816025077313,"y":495.38990459713864},"2012MI10":{"x":990.5249926683005,"y":830.7710950826039},"2012KS04":{"x":848.9382629608211,"y":1011.3621119184886},"2012PA14":{"x":756.491307020568,"y":1116.960485640849},"2012NC03":{"x":411.45760568457337,"y":986.6578415764652},"2012NY09":{"x":358.32550752195857,"y":1034.195919803355},"2012FL04":{"x":198.47972585278754,"y":782.9698350727206},"2012KY03":{"x":134.17223032918977,"y":583.2172139244988},"2012GA08":{"x":151.50575120670413,"y":345.55544621575655},"2012TX31":{"x":361.1398265380838,"y":222.10944950044976},"2012OH03":{"x":518.6669886364829,"y":165.0756436695253},"2012TX16":{"x":724.9164298451482,"y":145.1308923470788},"2012TX24":{"x":872.2123636579022,"y":220.91232666536345},"2012NE03":{"x":1058.8612278246396,"y":437.8576937275127},"2012NY05":{"x":1099.9692638267854,"y":699.5486848367576},"2012MA02":{"x":1100.2845504648928,"y":829.4787096238288},"2012OH01":{"x":883.678540754074,"y":959.3689899798527},"2012GA09":{"x":756.5188708671158,"y":1050.4544332134249},"2012CA20":{"x":555.4401978370718,"y":1119.2997246697826},"2012SC05":{"x":249.69365878414413,"y":921.2473097487891},"2012TX29":{"x":95.21319268204272,"y":823.4114161987206},"2012CA43":{"x":72.87957772120699,"y":641.4186740089259},"2012CA29":{"x":199.2520704436151,"y":311.8804471389151},"2012OH11":{"x":245.50436641874364,"y":196.3199370681331},"2012MS04":{"x":422.94211034831346,"y":113.39879060036527},"2012TN05":{"x":651.4720541584717,"y":135.4183664988422},"2012IL05":{"x":958.7218532204454,"y":214.43627329011},"2012NJ04":{"x":1017.8479552968921,"y":378.47734528985643},"2012FL01":{"x":1059.8828749316672,"y":575.208200876654},"2012ID01":{"x":1019.6203505162307,"y":858.0461773000189},"2012AK01":{"x":959.3653752112962,"y":992.7914544974083},"2012OH14":{"x":684.9219168919865,"y":1062.3080464431414},"2012MO07":{"x":449.7120099717819,"y":1056.9610054048617},"2012WI06":{"x":288.09018101287796,"y":965.9318186131839},"2012MA08":{"x":186.26677773070293,"y":821.3598745336255},"2012NC06":{"x":129.85716939685582,"y":630.3055901544969},"2012CA08":{"x":111.18490950886796,"y":393.56458262935234},"2012FL15":{"x":325.20998536907473,"y":230.55575190510447},"2012MD03":{"x":487.8512492095587,"y":155.70670287341792},"2012VT01":{"x":759.6041872627245,"y":81.29149482887371},"2012KS03":{"x":903.3935978326688,"y":231.35554004755153},"2012NJ08":{"x":1050.8708097013384,"y":326.6923776664853},"2012CA48":{"x":1148.8413123689413,"y":608.1573655506472},"2012MS03":{"x":1052.8456167927902,"y":777.1411086550906},"2012LA06":{"x":906.3746708752622,"y":966.5775431052455},"2012CA32":{"x":710.7587264221035,"y":1127.6513557517637},"2012MO03":{"x":477.4030174388629,"y":1130.6755407222086},"2012WA07":{"x":232.26976807909168,"y":949.2923952152777},"2012MI05":{"x":145.39017892332683,"y":786.352215675832},"2012CA19":{"x":60.39324061109743,"y":592.343776713231},"2012FL05":{"x":117.54619072090374,"y":453.8337350579493},"2012UT01":{"x":288.3804782955775,"y":251.2674671202014},"2012WI05":{"x":476.6733999401873,"y":77.85071530863931},"2012SC03":{"x":684.8794471416845,"y":150.46939143277297},"2012PA04":{"x":942.0013439788718,"y":186.3389458831573},"2012IL03":{"x":1039.2152627008834,"y":417.68727183484566},"2012AR03":{"x":1062.0993555183954,"y":597.3835401997025},"2012TX18":{"x":1073.2488972666874,"y":835.2176983665012},"2012TX04":{"x":929.2772560738591,"y":1013.8045007272842},"2012MA07":{"x":710.4772668050899,"y":1052.1378793001709},"2012WY01":{"x":502.24935606688683,"y":1105.0545563792225},"2012FL03":{"x":341.9782023180199,"y":1018.4611745772735},"2012IL01":{"x":123.05356141432522,"y":845.2289658752021},"2012TN02":{"x":127.502025883623,"y":604.6899133284597},"2012CA40":{"x":161.5390737112098,"y":394.9791081711179},"2012FL11":{"x":275.0603514985018,"y":170.97158247307166},"2012PA02":{"x":495.07836881325517,"y":135.51229704250295},"2012TX02":{"x":727.9168686465007,"y":91.726602131714},"2012TN01":{"x":888.4199296569443,"y":205.95845439473067},"2012SC04":{"x":1043.979532680484,"y":384.89252863466396},"2012UT02":{"x":1129.1427636593703,"y":598.823588812106},"2012NJ10":{"x":1042.922701361568,"y":813.9060757804249},"2012AL05":{"x":907.2452011005577,"y":989.2631980964422},"2012GA04":{"x":715.7857614471519,"y":1107.587240747153},"2012IL07":{"x":488.83476229088285,"y":1079.0587445641231},"2012VA03":{"x":292.91720822543294,"y":987.022841702189},"2012GA07":{"x":154.53307801825372,"y":815.0621242381337},"2012FL24":{"x":82.98293275849505,"y":599.5097336317297},"2012NE01":{"x":137.29397434796184,"y":376.72455303917707},"2012IL04":{"x":290.82760521925337,"y":212.6131978719988},"2012KS01":{"x":486.0530010160355,"y":103.032178603309},"2012TX09":{"x":709.8411780347018,"y":117.15525678428543},"2012TX36":{"x":915.8390312769802,"y":212.90309653438385},"2012AZ08":{"x":1050.4844339512101,"y":383.0581304412223},"2012NY15":{"x":1100,"y":599.9999999999926}} 
var pageLoad = Date.now();
var timeSinceLoad = function() {
	return Date.now() - pageLoad;
}

var geometry = new function() {
	this.width = 0;
	this.height = 0;
	this.autoLeft = 0;
	this.autoRight = 0;

	var $window = $(window);
	var $section = $(".section").first();

	this.calculate = function() {
		this.width = $window.width();
		this.height = $window.height();
		this.autoLeft = (this.width - $section.width())/2;
		this.autoRight = (this.width - $section.width())/2;
		if(this.autoLeft < 0) {
			this.autoLeft = 0;
		}
		if(this.autoright < 0) {
			this.autoright = 0;
		}

		PubSub.publish("resize", {
			width : geometry.width,
			height : geometry.height,
			autoLeft : geometry.autoLeft,
		});
	}
}

var slides = new function() {
	var opener = $("#situation-summary");
	var complain = $("#complain .pane");
	var rawwater = $("#rawwater");
	var issues = $(".issue");
	var spacer = $(".spacer");
	var moneyPanes = $(".lobbyingStats");
	var rigged = $("#riggedGame .pane");
	var theAct = $("#theAct .pane");
	var appeal = $("#Appealing");
	var shareText = $("#ShareText");

	var _this = this;

	var currentSlide = "";
	this.getSlideID = function() { return ""; }

	this.calculate = function() {

		if(geometry.width < 960) { 
			complain.attr("style", "");
			rawwater.attr("style", "");
			issues.attr("style", "");
			spacer.attr("style", "");
			moneyPanes.attr("style", "");
			rigged.attr("style", "");
			theAct.attr("style", "");
			appeal.attr("style", "");
			shareText.attr("style", "");
			return;
		}

		anchorFixedElement("#particles");
		anchorFixedElement("#riggedSVG");
		anchorFixedElement("#explodingDot");
		anchorFixedElement("#guncontrol");
		anchorFixedElement("#foodlabeling");
		anchorFixedElement("#keystonePipeline");
		anchorFixedElement("#cispaprivacy");
		ElectionsParallax();

		$("#requestMapContainer").css({ 
			"left" : geometry.autoLeft + "px"
		})

		opener.height(2.8*geometry.height + "px");
		opener.find(".pane").each(function(i) {
			$(this).css({
				"left" : geometry.autoLeft -40 + "px"
			})
		})
		opener.find(".vizPane").each(function(i) {
			$(this).css({
				"right" : geometry.autoLeft + "px"
			})
		})
		$("#request-summary, #thankyou").css({ "top" : geometry.height*0.2 + "px" });
		$("#request-sla, #sla-viz-container").css({ "top" : geometry.height*1.2 + "px" });
		$("#job-summary, #job-viz-container").css({ "top" : geometry.height*1.95 + "px" });
		
		// $("#map-summary").css({ "top" : geometry.height*2.95 + "px" });

		$("#thankyou").css({ "left" : (geometry.autoLeft + $("#fourhundredthirtyfive").width()*1.7) + "px" })

		complain.each(function(i) {
			var padding = (geometry.height - $(this).height())/2;
			$(this).css({ 
				// "padding-top" : padding*0.7 + "px",
				// "padding-bottom" : padding*0.9 + "px" 
				"padding-top" : padding*0.3 + "px",
				"padding-bottom" : padding*1.3 + "px" 
			});

			if(i == complain.length-1) {
				$(this).css({ "padding-bottom" : padding*1.2 + "px" });
			}
		});

		rawwater.each(function(i) {
			var padding = (geometry.height - $(this).height())/2;
			$(this).css({
				"padding-top" : padding*0.7 + "px",
				"padding-bottom" : padding*0.9 + "px" 
			});
		});
		
		issues.each(function(i) {
			var padding = (geometry.height - $(this).height())/2;
			$(this).css({ "padding-top" : padding*0.7 + "px" });
		});
		
		moneyPanes.each(function(i) {
			$(this).css({ 
				"padding-top" : geometry.height*0.85 + "px",
				"padding-bottom" : geometry.height*0.7 + "px"
			});

			$(this).find(".pane").css({
				"padding-top" : geometry.height*0.15 + "px",
			})
		});

		
		rigged.each(function(i) {
			var padding = (geometry.height - $(this).height())/2;
			$(this).css({ 
				"padding-top" : padding*0.9 + "px",
				"padding-bottom" : padding*0.5 + "px" 
			});

			if(i == rigged.length-1) {
				$(this).css({ "padding-bottom" : padding*1.3 + "px" });
			}
		});

		
		theAct.each(function(i) {
			var padding = (geometry.height - $(this).height())/2;
			$(this).css({ 
				"padding-top" : padding*0.7 + "px",
				"padding-bottom" : padding*0.9 + "px" 
			});

			if(i == theAct.length-1) {
				$(this).css({ "padding-bottom" : padding*1.3 + "px" });
			}
		});

		
		appeal.each(function(i) {
			var padding = (geometry.height - $(this).height())/2;
			$(this).css({ 
				"padding-top" : (padding*0.6) + "px",
				"padding-bottom" : padding + "px"
			});
		});

		
		shareText.each(function(i) {
			var padding = (geometry.height - $(this).height())/2;
			$(this).css({ 
				"padding-bottom" : padding + "px"
			});
		});

		var positions = {}
		var z = 900;
		$("#list > li").each(function(i) {
			id = $(this).attr("id");
			offset = $(this).offset();
			
			positions[id] = {
				left: offset.left,
				top: offset.top,
				height: $(this).height(),
				id: id
			};

			z++;
			$(this).css({
				"z-index" : z
			});
		});

		this.getSlideID = function(scrollTop) {
			var slide = _.find(positions, function(slide) { return scrollTop < slide.top + slide.height - geometry.height * 0.1; });

			if(currentSlide != slide.id) {
				var gaArray = ['_trackEvent', 'Scroll', 'Slide', slide.id, timeSinceLoad()];
				//console.log(gaArray);
				// _gaq.push(gaArray);
			}
			currentSlide = slide.id;

			return slide.id;
		}			

		_this.positions = positions;

		PubSub.publish("dimensions", positions);
	}

	PubSub.subscribe("resize", function(msg, data) {
		slides.calculate();
	});

}

var $w;

$(document).ready(function() {
	init();

	$w = $(window);
	
	var resizeTrigger = _.throttle(function() {
		geometry.calculate(); // geometry publishes to the "resize" channel
		slides.calculate();
	})
	$w.resize(resizeTrigger);

	var publishScrollTop = _.throttle(function() {

		var scrollTop = $w.scrollTop();
		PubSub.publish("scrollTop", scrollTop);
		slides.getSlideID(scrollTop);


	}, 20);

	$w.scroll(publishScrollTop);


});


var init = function() {
	geometry.calculate();
	
	if(geometry.width < 960) { return; }

	overlay.init();
	riggedDot.init();
	washington.init();
	introPane.init();
	LobbyingDataVis("#food");
	LobbyingDataVis("#guns");
	LobbyingDataVis("#keystone");
	LobbyingDataVis("#cispa");

	gravitron = new Gravitron();
	spread = new Spreading();
	petition = new PetitionForm()

	PubSub.subscribe("situation-summary", function(msg, data) {
		RequestMapGraphic = new RequestMapGraphic();
		requestsCard = new RequestCard();
	});

	setTimeout(function() {
		geometry.calculate();
		scrollManager();
	}, 2000);
	
	PubSub.publish("init", {});

	ElectionsCSSdisplay = lazyUI(function(value) {
		$("#requestMapContainer").css({
			"display" : value
		});
	})

	ExplodingDotCSSdisplay = lazyUI(function(value) {
		$("#explodingDot").css({
			"display" : value
		});
	})
	PubSub.subscribe("scrollTop", function(msg, data) {
		if(data > slides.positions["complain"].top) {
			ElectionsCSSdisplay("none");
		} else {
			ElectionsCSSdisplay("block");
		}

		if(data > slides.positions["rawwater"].top || data < slides.positions["complain"] - geometry.height) {
			ExplodingDotCSSdisplay("none");
		} else {
			ExplodingDotCSSdisplay("block");
		}
	});
	
}

var scrollManager = function() {
	var scrollPositions = [];

	this.calculate = function() {
		scrollPositions = [];
		$(".step").each(function(i) {
			var step = $(this)
			var offset = step.offset().top;
			if(step.hasClass("intro")) {
				offset = offset - (geometry.height - step.height())/5;
				if(offset < 0) { offset = 0; }
			}

			scrollPositions[i] = { offset : offset }
		});
		_.each(scrollPositions, function(p, i, l) {
			var previous, next;
			if(i<=0) {
				previous = p.offset;
			} else {
				previous = l[i-1].offset
			}

			if(i>=l.length-1) {
				next = p.offset;
			} else {
				next = l[i+1].offset
			}

			p.previous = previous;
			p.next = next;
		});
	}

	PubSub.subscribe("resize", function() {
		this.calculate();
	});

	var keypress = _.throttle(function(e) {
		if (e.keyCode == 38 || e.keyCode == 40) {
			var scrollTop = $w.scrollTop();
			var current = _.find(scrollPositions, function(p) {
				return scrollTop < p.offset+geometry.height/2;
			});

			if(e.keyCode == 38) {
				$.scrollTo(current.previous, { duration : 500 });
			} else {
				$.scrollTo(current.next, { duration : 500 });
			}

			return false;
		}
	})

	$(document).keydown(keypress);
}

var anchorFixedElement = function(selector) {
	var positionCSS = function() { 
		return {
			position : "absolute",
			top : top + "px"
		}
	}

	var el = $(selector);

	el.css({
		"top" : 0,
		"position" : "absolute",
	})

	var root = el.closest("li");
	var rootID = root.attr("id");

	PubSub.subscribe("dimensions", function(msg, data) {
		el.css({ "width" : geometry.width + "px" });

		var start = data[rootID].top;
		var end = data[rootID].top + data[rootID].height - geometry.height;

		positionCSS = function(scrollTop) {
			if(scrollTop<start || scrollTop >= end) {
				
				var top = 0;
				if(scrollTop >= end) {
					top = end - start;
				}

				return {
					position : "absolute",
					top : top + "px"
				}

			} else {
				return {
					position : "fixed",
					top : 0 + "px"
				}
								
			}
		}
	});

    var currentAnchorStyle = "absolute";
    var currentTopPostion = 0;

    var setPositionAnchor = function(value) {
        if(currentAnchorStyle != value.position || currentTopPostion != value.top) {
            el.css({
                "position" : value.position,
                "top" : value.top
            });
        }
        currentAnchorStyle = value.position;
        currentTopPostion = value.top;
    }

	PubSub.subscribe("scrollTop", function(msg, data) {
		setPositionAnchor(positionCSS(data));
	});
}

var frameMapFactory = function(keyframes) {
	if(!$.isArray(keyframes)) { return; }

	var maps = _.map(keyframes, function(kf, i) {
		if(!keyframes[i+1]) {
			return function() { return kf.value; }
		}
	
		return d3.scale.linear()
			.domain([kf.pixel, keyframes[i+1].pixel])
			.range([kf.value, keyframes[i+1].value]);
	});

	var index = function(frame) {
		for(var i = 0; i < keyframes.length; i++) {
			if(keyframes[i].pixel > frame) {
				break;
			}
		}

		return i-1;
	}

	return function(scrollTop) {
		if(scrollTop < 1) { scrollTop = 1; }
		return maps[index(scrollTop)](scrollTop);
	}
}

var lazyUI = function(f) {
	var cache;
	var fn = f;
	return function(input) {
		if(input !== cache) {
			fn(input);
			cache = input;
			return true;
		} else {
			return false;
		}
	}
}

var introPane = new function() {
	
	var pane, max, keyframes;
	var marginTop = function() { return 0; }
	var movePane = lazyUI(function(value) {
		pane.css({ "top" : value });
	});

	var init = function() {
		pane = $("#distortedelections");
	}
	this.init = init;

	var fireIntro = false;
	var hideIntro = false;

	PubSub.subscribe("dimensions", function(msg, data) {
		max = pane.height();
		keyframes = [
			{ pixel: 0, value: 0 },
			{ pixel: 50, value: 0 },
			{ pixel: max, value: -2*max }
		]

		marginTop = frameMapFactory(keyframes);
	});

	PubSub.subscribe("scrollTop", function(msg, data) {
		if(data < 1 && hideIntro) {
			marginTop = frameMapFactory(keyframes);
			hideIntro = false;

			pane.animate({
				"top" : 0
			}, 500);
		} else {

			movePane(marginTop(data));

			// if(data > 150 && !fireIntro) {
			// 	PubSub.publish("requestCard", RequestMapGraphic.nodes[0]);
			// 	fireIntro = true;
			// }

			if(data > max*0.7 && !hideIntro) {
				marginTop = function() { return -2*max; }
				hideIntro = true;
			}			
		}


		
	})
}

var washington = new function() {
	var g, c; 
	
	var cr = function() { return 240; }

	var init = function() {
		$("#washington").css({
			"width" : geometry.width,
		});

		svg = d3.select("#washingtonInfluence");
		g = d3.select("#washingtonLayer");
		c = d3.select("#washingtonDot");
	}
	this.init = init;

	PubSub.subscribe("dimensions", function(msg, data) {

		svg.attr("width", geometry.width).attr("height", geometry.height*1.02);
		g.attr("transform", "translate("+(geometry.width/2)+","+(geometry.height/3)+")");

		var slide = data["rawwater"];

		$("#washington").css({
			"height" : slide.height
		});

		var r0 = c.attr("r");
		
		start = slide.top - slide.height/3;
		full = slide.top;

		var keyframes = [
			{ pixel : 0, value : 140 },
			{ pixel : start, value : 140 },
			{ pixel : full, value : geometry.width * 0.7 },
		]

		cr = frameMapFactory(keyframes);
	});

	PubSub.subscribe("scrollTop", function(msg, data) {
		c.attr("r", cr(data));
	})

}

// var shareManager = new function() {
// 	$('.twitterbtn-link,.facebookbtn-link').click(function(event) {
// 	var width  = 575,
// 	    height = 400,
// 	    left   = ($(window).width()  - width)  / 2,
// 	    top    = ($(window).height() - height) / 2,
// 	    url    = this.href,
// 	    opts   = 'status=1' +
// 	             ',width='  + width  +
// 	             ',height=' + height +
// 	             ',top='    + top    +
// 	             ',left='   + left;

// 	window.open(url, 'Share', opts);

// 	return false;
// 	});
// }



var riggedDot = new function() {
	var svg, g, c, div;
	var keyframes, cr, bgColor;

	this.init = function() {
		svg = d3.select("#riggedSVG");
		svg.attr("width", geometry.width).attr("height", geometry.height*1.1);

		g = svg.append("g").attr("transform", "translate("+geometry.width/2+","+geometry.height/2+")");

		c = g.append("circle")
			.attr("fill", "#000000")
			.attr("r", 0);

		div = $("#rigged");
	}

	bgColor = function() {}

	PubSub.subscribe("dimensions", function(msg, data) {
		svg.attr("width", geometry.width).attr("height", geometry.height*1.1);
		g.attr("transform", "translate("+geometry.width/2+","+geometry.height/2+")");

		var slide = data["rigged"];

		var start = slide.top + slide.height*0.1;
		var full = slide.top + slide.height*0.35;
		var retreat = slide.top + slide.height*0.55;

		keyframes = [
			{ pixel : 0, value : 0 },
			{ pixel : start, value : 0 },
			{ pixel : full, value : geometry.width },
			{ pixel : retreat, value : 0 }
		]

		cr = frameMapFactory(keyframes);

		var changeColor = lazyUI(function(color) {
			div.css({"background-color":color});
		});
		bgColor = function(scrollTop) {
			if(scrollTop > full) {
				changeColor("#FFFFFF");
			} else {
				changeColor("#31A2E2");
			}
		}
	});

	PubSub.subscribe("scrollTop", function(msg, data) {
		c.attr("r", cr(data));
		bgColor(data);
	})

	
}

var overlay = new function() {
	var svg, g, g0, c;
	var width = 640;
	var r0 = 8;
	var rMax = 160;
	var x = width/2;
	var y = 300;

	var nodes = [];
	var node;

	var sectionTop = 2000;
	var sectionBottom = 3000;
	var scrollTop = 0;

	var force2 = d3.layout.force()
		.nodes(nodes)
		.gravity(0.05)
		.charge(function(d, i) { 
			return i ? -6 : -80; 
		})
		.size([0,0])	
		.start();

	this.width = width;
	this.r = r0;
	this.x = x;
	this.y = y;

	this.changeCharge = function(number) {
		force2.charge(function(d, i) { 
			return i ? -3 : -number; 
		});
		force2.resume();
	}
	this.force = force2;

	this.init = function() {

		svg = d3.select("#expanding")
			.attr("width", width)
			.attr("height", geometry.height);

		var translate = {
			x : width/2,
			y : geometry.height*0.37
		}

		var r = 8;
		var fixed = true;

		var n = {
			fill : "#fff",
			x : 0,
			xfixed : 0,
			y : 0,
			yfixed : 0,
			radius : r,
			fixed : 1
		}
		nodes.push(n);

		var makeCircle = function(x, y) {
			var n = {
				fill : "#fff",
				x : x,
				xfixed :x,
				y : y,
				yfixed : y,
				radius : r,
			}
			nodes.push(n);
		}

		var makeRow = function(size, y) {
			count = Math.floor(size/2);
			for(var i = 0; i<=count; i++) {
				if(size%2>=1) {
					if(i==0) {
						makeCircle(0,y);	
					} else {
						makeCircle(i*dx, y);
						makeCircle(-i*dx, y);	
					}
				} else {
					if(i!=0) {
						makeCircle(i*dx - dx/2, y);
						makeCircle(-i*dx + dx/2, y);	
					}
				}
			}
		}

		var size = 23;
		var dx = r*2.2;
		var dy = r*2;

		for(var j = 0; j <= Math.floor(size/2); j++) {
			if(j == 0) {
				makeRow(size, 0);
			} else {
				makeRow(size-j, j*dy);
				makeRow(size-j, -j*dy);
			}
		}

		g0 = svg.append("g")
			.attr("transform", "translate("+translate.x+", "+translate.y+")");

		node = g0.selectAll("circle.node")
			.data(nodes)
			.enter().append("svg:circle")
			.attr("class","node")
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })
			.attr("r", function(d) { return d.radius; })
			.attr("fill", function(d) { return d.fill; });

		g = svg.append("g")
			.attr("transform", "translate("+translate.x+", "+translate.y+")");

		// c = g.append("circle")
		// 	.attr("class","highlight")
		// 	.attr("r", r0)
		// 	.attr("fill", "#31A2E2");

		let highlightNodes = [1,2,24].map((r)=>nodes[r])

		c = g.selectAll("circle.node")
			.data(highlightNodes)
			.enter().append("svg:circle")
			.attr("class","node")
			.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; })
			.attr("r", function(d) { return d.radius; })
			.attr("fill", "#31A2E2");


		// var r = overlay.r;
		force2.start();

		
	}

	function collide(node) {
	  var r = node.radius + 16,
	      nx1 = node.x - r,
	      nx2 = node.x + r,
	      ny1 = node.y - r,
	      ny2 = node.y + r;
	  return function(quad, x1, y1, x2, y2) {
	    if (quad.point && (quad.point !== node)) {
	      var x = node.x - quad.point.x,
	          y = node.y - quad.point.y,
	          l = Math.sqrt(x * x + y * y),
	          r = node.radius + quad.point.radius;
	      if (l < r) {
	        l = (l - r) / l * .5;
	        node.x -= x *= l;
	        node.y -= y *= l;
	        quad.point.x += x;
	        quad.point.y += y;
	      }
	    }
	    return x1 > nx2
	        || x2 < nx1
	        || y1 > ny2
	        || y2 < ny1;
	  };
	}

	
	force2.on("tick", function(e) {
		if(scrollTop > sectionTop && scrollTop <= sectionBottom && nodes.length > 0) {

			var q = d3.geom.quadtree(nodes),
			i = 0,
			n = nodes.length;

			while (++i < n) {
				q.visit(collide(nodes[i]));
			}

			g0.selectAll("circle.node")
				.attr("r", function(d) { return d.radius; })
				.attr("cx", function(d) {
					if(d.fixed) {
						d.x = d.xfixed;
						return d.xfixed; 	
					} else {
						return d.x; 
					}
				})
				.attr("cy", function(d) { 
					if(d.fixed) {
						d.y = d.yfixed;
						return d.yfixed; 	
					} else {
						return d.y; 
					}
				});
		}
		

	});
	


	var keyframes = [
		{ pixel : 0, value : r0 },
		{ pixel : 799, value : r0 },
		{ pixel : 1300, value : 160 },
		{ pixel : 2100, value : 160 },
		{ pixel : 2300, value : 0 }
	]

	var keyframesOpacity = [
		{ pixel : 0, value : 0 },
		{ pixel : 1300, value : 0 },
		{ pixel : 2100, value : 1 },
	]

	var keyframesMapOpacity = [
		{ pixel : 0, value : 0 },
		{ pixel : 2600, value : 0 },
		{ pixel : 2600+500, value : 1 },
	]

	var cr = frameMapFactory(keyframes);
	var gOpacity = frameMapFactory(keyframesOpacity);
	var mapOpacity = frameMapFactory(keyframesMapOpacity);

    var slide = {
        left : 0,
        top : 0,
        height : 0
    }

	PubSub.subscribe("dimensions", function(msg, data) {

		var sixtyEightLeft = $("#contribute68percent").offset().left
		var complainWidth = $("#complain .section").width();
		if(geometry.width > complainWidth) {			
			$("#expanding").css({
				"margin-left" : (geometry.autoLeft - 100) + "px"
			})
		} else {
			$("#expanding").css({
				"margin-left" : (sixtyEightLeft - 540) + "px"
			})
		}

		slide = data["complain"];
		sectionTop = slide.top;
		sectionBottom = slide.top + slide.height;

		start = slide.top + slide.height*0.32;
		full = slide.top + slide.height*0.6;

		mapStart = slide.top + slide.height*0.75;
		mapEnd = slide.top + slide.height*0.9;

		keyframes = [
			{ pixel : 0, value : r0 },
			{ pixel : start, value : r0 },
			{ pixel : full, value : 200 },
		]

		keyframesOpacity = [
			{ pixel : 0, value : 0 },
			{ pixel : slide.top + slide.height*0.1, value : 0  },
			{ pixel : start, value : 1 },
		]

		keyframesMapOpacity = [
			{ pixel : 0, value : 0 },
			{ pixel : mapStart, value : 0  },
			{ pixel : mapEnd, value : 1 },
		]

		cr = frameMapFactory(keyframes);
		gOpacity = frameMapFactory(keyframesOpacity);
		
		mapOpacity = frameMapFactory(keyframesMapOpacity);
	});

	PubSub.subscribe("scrollTop", function(msg, data) {
		scrollTop = data;
        
        if(scrollTop > slide.top - geometry.height && scrollTop < slide.top + slide.height ) {
			console.log("---- mapOpacity : ", mapOpacity(data))
    		c.attr("r", cr(data));
    		g0.attr("opacity", gOpacity(data));
			// document.getElementById("#map-container").style.opacity = "0.5" //(mapOpacity(data)).toString;
            force2.charge(function(d, i) { 
                return i ? -4 : -Math.pow(cr(data)-8, 0.8)*40; 
            }).start();    
        } else {
            force2.stop();
        }
		

	})

	
}

var LobbyingDataVis = function(selector) {
	var container = $(selector);
	var stats = container.find(".lobbyingStats");
	var issue = container.find(".issue");

	var iconSVG = d3.select("#"+container.attr("id")+"SVG");

	issue
		.width(geometry.width+"px")
		.height(geometry.height+"px");



	var svg = d3.select("#"+issue.attr("id"))
				.append("svg")
				.attr("class", "lobbyingSVG")
				.attr("width", geometry.width)
				.attr("height", geometry.height);

	var dy = geometry.height * 0.65;
	var w = stats.width();
	var marginDiff = geometry.width - w;
	var autoMargin = (marginDiff < 0) ? 0 : marginDiff/2;

	var gFor = svg.append("g")
		.attr("transform", "translate("+(w*0.15+autoMargin)+","+dy+")");
	
	var lineFor = gFor.append("rect")
		.attr("width", "1px")
		.attr("height", 1)
		.attr("shape-rendering", "crispEdges")
		.attr("fill", "#000");

	var bubbleFor = gFor.append("circle")
		.attr("r", 8)
		.attr("fill", "#31A2E2");


	var gAgainst = svg.append("g")
		.attr("transform", "translate("+(w*0.85+autoMargin)+","+dy+")");

	var lineAgainst = gAgainst.append("rect")
		.attr("width", "1px")
		.attr("height", 1)
		.attr("shape-rendering", "crispEdges")
		.attr("fill", "#000");

	var bubbleAgainst = gAgainst.append("circle")
		.attr("r", 80)
		.attr("fill", "#31A2E2");


	var crFor, crAgainst, lineHeight;
	var rMax;


	var getNumbers = function(pane) {
		var moneyFor = pane.find(".moneyFor");
		var moneyAgainst = pane.find(".moneyAgainst");

		var amountFor = parseInt(moneyFor.text().replace(/\D/g, '')) || 0;
		var amountAgainst = parseInt(moneyAgainst.text().replace(/\D/g, '')) || 0;

		var denominator = amountAgainst;
		if(amountFor > amountAgainst) {
			denominator = amountFor;
		}

		var rFor = Math.sqrt(amountFor / denominator / Math.PI) * rMax;
		var rAgainst = Math.sqrt(amountAgainst / denominator / Math.PI) * rMax;

		return {
			for : rFor,
			against : rAgainst
		}
	}

	PubSub.subscribe("dimensions", function(msg, data) {
		svg.attr("width", geometry.width)
			.attr("height", geometry.height);

		var dy = geometry.height * 0.66;
		var w = stats.width();

		gFor.attr("transform", "translate("+(w*0.15+geometry.autoLeft)+","+dy+")");
		gAgainst.attr("transform", "translate("+(w*0.85+geometry.autoLeft)+","+dy+")");

		var p = container.find(".moneyAgainst");
		var pPosition = p.position().top;
		var pHeight = p.height();

		rMax = geometry.height * 0.5;
		var numbers = getNumbers(stats);

		var start = data[container.attr("id")].top;
		var end = data[container.attr("id")].height;

		keyframesFor = [
			{ pixel : 0, value : 0 },
			{ pixel : start + end*0.1, value : 0 },
			{ pixel : start + end*0.4, value : numbers.for }
		]
		crFor = frameMapFactory(keyframesFor);

		keyframesAgainst = [
			{ pixel : 0, value : 0 },
			{ pixel : start + end*0.1, value : 0 },
			{ pixel : start + end*0.4, value : numbers.against }
		]
		crAgainst = frameMapFactory(keyframesAgainst);

		keyframeLineHeight = [
			{ pixel : 0, value : 0 },
			{ pixel : start + geometry.height * 0.34 + pHeight - 4, value : 0 },
			{ pixel : start + end - geometry.height, value : dy - geometry.height * 0.3 + 2 },
		]
		lineHeight = frameMapFactory(keyframeLineHeight);
	});

	PubSub.subscribe("scrollTop", function(msg, data) {
		bubbleFor.attr("r", crFor(data));
		bubbleAgainst.attr("r", crAgainst(data));

		lineFor.attr("y", -lineHeight(data));
		lineFor.attr("height", lineHeight(data));
		lineAgainst.attr("y", -lineHeight(data));
		lineAgainst.attr("height", lineHeight(data));
	})
}

var Gravitron = function() {
	var svg = d3.select("#gravitron").attr("width", geometry.width).attr("height", geometry.height);
	var x = geometry.width*0.55;
	var y = geometry.height*0.4;
	var g = svg.append("g").attr("transform", "translate("+x+","+y+")");

	var r = 9;
	if(geometry.width > 1600) {
		r = Math.ceil(geometry.width/156);
	}

	var main = g.append("circle").attr("r", 9).attr("fill","#ffffff");
	var mainY = function() { return -200; }
	main.attr("cy", mainY());

	var scrollTopMarker = 0;
	var slide;

	PubSub.subscribe("dimensions", function(msg, data) {
		slide = data["theAct"];

		var keyframes = [
			{ pixel: 0,  value: -500 },
			{ pixel: slide.top-slide.height*0.15, value: -500 },
			{ pixel: slide.top+slide.height*0, value: 0 },
		]

		mainY = frameMapFactory(keyframes);
	});

	PubSub.subscribe("scrollTop", function(msg, data) {
		main.attr("cy", mainY(data));

		if(data > slide.top - slide.height*0.5 && data <= slide.top+slide.height) {
			PubSub.publish("gravitron", data);
		}
		
	});

	var makeCircle = function(x, y) {
		var circle = g.append("circle")
			.attr("r", 0)
			.attr("fill", "#FFFFFF")
			.attr("cx", x)
			.attr("cy", y);

		var radius = function() { return 0; }

		var delay = Math.floor(Math.sqrt(x*x + y*y)) * 0.9;
		var duration = 10;

		PubSub.subscribe("dimensions", function(msg, data) {
			var slide = data["theAct"];
			var start = slide.top + delay + (Math.random() * 160);
			var finish = start+duration;
			var expansion = slide.top+slide.height*0.25;
			var done = expansion+duration*2.5;

			var keyframes = [
				{ pixel: 0,  value: 0 },
				{ pixel: start, value: 0 },
				{ pixel: finish, value: r },
				{ pixel: expansion, value: r },
				{ pixel: done, value: r*2 }
			]

			radius = frameMapFactory(keyframes);
		});

		PubSub.subscribe("gravitron", function(msg, data) {
			circle.attr("r", radius(data));
		});		
	}

	/*
	var hFactor = 3.4;
	var vFactor = 2.6;
	*/
	var hFactor = 3;
	var vFactor = 2.4;

	var makeRow = function(y, i) {
		var shift = 0;
		if(i%2 >0) {
			shift = r * hFactor / 2;
		}

		// Right Side
		for(var rx = 0; rx < (geometry.width-x)*1.05; rx += r * hFactor) { makeCircle(rx + shift, y); }

		// Left Side
		for(var lx = 0; lx > -x*1.05; lx -= r * hFactor) { makeCircle(lx + shift, y); }
	}

	// Middle Row
	makeRow(0, 0);

	// Rows going down
	var di = 1;
	for(var dy = r * vFactor; dy < (geometry.height-y)*1.05; dy += r * vFactor) { makeRow(dy, di); di++; }

	// Rows going up
	var ui = 1;
	for(var uy = r * vFactor; uy > -y*1.05; uy -= r * vFactor) { makeRow(uy, ui); ui++; }

		
}

var PetitionForm = function() {
	var input;

	input = $("#Appealing input");

	input.each(function() {
		$(this).one("focus", function() {
			PubSub.publish("formProgress", 150);
		});
	});

	input.hover(function() {
		PubSub.publish("formProgress", 20);
	}, function() {
		PubSub.publish("formProgress", -20);
	})

	var form = $("#ak_form");
	var action = form.attr("action");

	
	var button = $("#id_aksubmit");
	button.click(function(e) {
		// _gaq.push(['_trackEvent', 'Form', 'Submit', 'Form Submit']);
		PubSub.publish("formProgress", 4000);
	});
	
}

var Spreading = function() {
	var svg = d3.select("#spreading").attr("width", geometry.width).attr("height", geometry.height);
	var g = svg.append("g").attr("transform", "translate("+geometry.width*0.55+","+geometry.height*0.4+")");

	var x, y;

	var r = 9;

	var main = g.append("circle").attr("r", 9).attr("fill","#FFFFFF");
	var mainY = function() { return -200; }

	var scrollTopMarker = 0;
	var slide;

	PubSub.subscribe("dimensions", function(msg, data) {
		var anchor = $("#Appealing form");
		x = geometry.autoLeft*0.8;
		y = geometry.height*0.15;

		g.attr("transform", "translate("+x+","+y+")");

		slide = data["Share"];

	});

	// PubSub.subscribe("scrollTop", function(msg, data) {

	// 	if(data > slide.top-200 && data <= slide.top+slide.height) {
	// 		PubSub.publish("spreading", data);
	// 	}
		
	// });

	var progress = 0;
	this.progress = progress;
	var timer;
	var limit = 4000;
	PubSub.subscribe("formProgress", function(msg, data) {
		clearInterval(timer);
		if(typeof data == "number") {
			if(Math.abs(data) > limit) { 
				if(data>0) {
					data = limit;
				} else {
					data = -1000;
				}
			}

			var direction = 1;
			if(data < 0) {
				direction = -1;
			}

			var count = 0;
			timer = setInterval(function() {
				progress += 5 * direction;
				if(progress < 0) { progress = 0; }

				count += 5 * direction;
				PubSub.publish("spreading", $w.scrollTop());

				if ( Math.abs(count) >= Math.abs(data) || count > limit || count < -1000 ) { clearInterval( timer ); }
			}, 20);
		}
	});

	var makeCircle = function(x, y) {
		var circle = g.append("circle")
			.attr("r", 0)
			.attr("fill", "#FFFFFF")
			.attr("cx", x)
			.attr("cy", y);

		var radius = function() { return 0; }

		var delay = Math.floor(Math.sqrt(x*x + y*y)) * 2;
		var duration = 30;

		// PubSub.subscribe("dimensions", function(msg, data) {
		// 	var slide = data["Share"];
		// 	var start = slide.top - 200 + delay + (Math.random() * 160);
		// 	var finish = start+duration;
		// 	var expansion = finish+slide.height*0.1;
		// 	var done = expansion+duration*2.5;

		// 	var keyframes = [
		// 		{ pixel: 0,  value: 0 },
		// 		{ pixel: start, value: 0 },
		// 		{ pixel: finish, value: r },
		// 		{ pixel: expansion, value: r },
		// 		{ pixel: done, value: 17 }
		// 	]

		// 	radius = frameMapFactory(keyframes);
		// });

		PubSub.subscribe("spreading", function(msg, data) {
			circle.attr("r", radius(data + progress));	
		});		
	}

	var columns = 35;
	var rows = 23;
	var hFactor = 3.4;
	var vFactor = 2.6;

	for(var row = 0; row < rows; row++) {

		var thisY = row * r * vFactor;

		var shift = 0;
		if(row%2 >0) {
			shift = r * hFactor / 2;
		}

		for(var column = 0; column < columns; column++) {
			makeCircle(r * hFactor * column + shift, thisY);
			makeCircle(-r * hFactor * column + shift, thisY);	
		}

		if(row>0) {
			for(var column = 0; column < columns; column++) {
				makeCircle(r * hFactor * column + shift, -thisY);
				makeCircle(-r * hFactor * column + shift, -thisY);	
			}
		}

	}
		
}

var RequestCard = function() {

	var card = $("#requestMapOverlay");
	var spender = $("#electionSpender");
	var underdog = $("#electionUnderdog");
	var mode = $("#electionMode");
	var win = $("#didMoneyWin");

	var shown = false;
	var scrollDismiss = null;

	var updateCard = function(d) {
		shown = true;

		var delta = 15;
		var position = 1200 - d.y + d.radius + 15;
		var positionDelta = position - delta;

		card.css({
            "display" : "block",
			"bottom" : positionDelta,
			"left" : d.x - 180,
		});

		card.animate({
			bottom : "+="+delta
		}, 150);

		spender.text(d.race.candidates[0].name);
		if(d.race.candidates.length>1) {
			mode.text("outspent");
			underdog.text(d.race.candidates[1].name);
		} else {
			mode.text("ran uncontested");
			underdog.text("");
		}
		
		
		if(d.race.candidates[0].winner) {
			win.text("won");
			card.addClass("didWin").removeClass("didnotWin");
		} else {
			win.text("lost");
			card.addClass("didnotWin").removeClass("didWin");
		}

		
	}

	var lazyUpdateCard = _.throttle(updateCard, 200)

	var hideCard = function() {
		if(!shown) { return; }

		card.css({
            "display" : "none",
			"bottom" : -1000,
			"left" : -1000,
		});
		shown = false;
	}


	PubSub.subscribe("requestCard", function(msg, data) {
		if(data) {
			lazyUpdateCard(data);	
		} else {
			hideCard();
		}
		
	});

	scrollDismiss = PubSub.subscribe("scrollTop", function(msg, data) {
		hideCard();
		if(shown) { PubSub.unsubscribe(scrollDismiss); }
	});
}

var RequestMapGraphic = function() {
	var svg = d3.select("#requestMapSVG");

	var g = svg.append("g").attr("id", "requestRoot");//.attr("transform", "scale(0.6)");
	var labelG = svg.append("g").attr("transform", "translate(-300,-300)");

	var biggest = requestData[0].sumspent;

	var opacityScale = d3.scale.linear().domain([0, 0.4]).range([0,1]);
	var sizeScale = d3.scale.linear().domain([0,biggest]).range([0,15000]);

	var sides = 1200;

	var w = sides;
	var h = sides;

	var moneyed = [];
	var underdog = [];

	// Cancel Popup clicks
	$("#container").click(function() {
		PubSub.publish("requestCard", false);
	})
	// End Cancel Popup clicks

	_.each(requestData, function(race) {
		for(var i = 0; i<race.candidates.length; i++) {
			if(race.candidates[i].winner) {
				race.winnerID = i;
				break;
			}
		}
	})

	// Hover labels
	var hoverLabel = new function() {
		labelG.append("path")
			.attr("d", "M0,0L10,-10L18,-10")
			.attr("fill", "none")
			.attr("stroke", "#333")
			.attr("stroke-width", 1.5);

		var name = labelG.append("text")
					.attr("font-size", "0.75em")
					.text("Your name")
					.attr("x", 20)
					.attr("y", -10);

		var sum = labelG.append("text")
					.attr("font-size", "0.9em")
					.text("$2000000")
					.attr("x", 20)
					.attr("y", 5)
					.attr("font-weight", "bold")
					.attr("fill", "#824618");

		var mouseover = function(datum) {
			var delta = Math.sqrt(datum.radius*datum.radius/2);
			var x = datum.x + delta;
			var y = datum.y - delta;
			
			labelG.attr("transform", "translate("+x+","+y+")");

			name.text(datum.race.candidates[datum.race.winnerID].name + " [" + datum.race.state + datum.race.district + "]");
			sum.text("$"+numberWithCommas(datum.race.candidates[datum.race.winnerID].spent));
		}

		var mouseout = function() {
			labelG.attr("transform", "translate(-300,-300)");	
		}

		return {
			mouseover : mouseover,
			mouseout : mouseout
		}
	}


	// Nodes
	var nodes = _.map(requestData, function(race) {
		var area = sizeScale(race.candidates[race.winnerID].spent);
		var r = Math.sqrt(area/Math.PI);

		var opacity = opacityScale(race.margin);

		var fill = "rgb(255,140,46)";
		if(!race.candidates[0].winner) {
			fill = "rgb(172,172,172)";
		}

		var position = requestPositions[race.id];

		return { 
			radius: r,
			opacity : opacity,
			race: race,
			x: position.x,
			y: position.y,
			fill: fill
		}
	});

	this.nodes = nodes;

	g.selectAll("g")
		.data(nodes)
		.enter()
		.append("g")
		.attr("class", "request")
		.attr("transform", function(d, i) {
			return "translate("+d.x+","+d.y+")"
		})
		.each(function(obj, i) {
            obj.rFunc = function() { return 9; }

			var layer = d3.select(this);

			var ring = layer.append("path")
				.attr("fill", "#ccc")
				.attr("d", function(obj) {
					var arc = d3.svg.arc().innerRadius(obj.radius - 2).outerRadius(obj.radius).startAngle(0).endAngle(2*Math.PI);
					return arc();
				})

			obj._ring = ring;

			// Circle
			var circle = layer.append("svg:circle")
				.attr("r", 0)
				//.attr("r", obj.radius)
				//.attr("opacity", 0)
				.attr("fill", function(obj) {
					if(obj.race.candidates[0].winner) {
						return "#31A2E2";
					} else {
						return "none";	
					}
				})
				.each(function(c) {
					if(obj.race.candidates[0].winner) {
						moneyed.push(obj);
					} else {
						underdog.push(obj);
					}
				})

			obj._circle = circle;

			// Pie
			// var pieLayer = layer.append("g").attr("class","pie");
			// var pie = new Piechart(pieLayer, obj);
			// pie.init();
			// pie.activate();

			// obj._pie = pie;


			// Text
			// var text = layer.append("text")
			// 	.attr("text-anchor", "middle")
			// 	.attr("font-size", function(d) {
			// 		var scaledSize = d.radius*0.6;
			// 		var textMin = 14;
			// 		return scaledSize > textMin ? scaledSize : textMin;
			// 	})
			// 	.attr("class", "moneyLabel")
			// 	.attr("fill", "#ffffff")
			// 	.attr("y", function(d) {
			// 		return d.radius*0.5;
			// 	})
			// 	.text(function(d) {
			// 		return "$" + Math.round(d.race.candidates[0].spent/100000)/10 + "M";
			// 	});

			// obj._text = text;


			// Hit Area
			var hitArea = layer.append("svg:circle")
			    .attr("r", function(d) { return d.radius - 2; })
			    .attr("opacity", 0)
			    .attr("fill", function(d) { 
			    	return "#ffffff"; 
			    })
			    .on('click', function(d) {
					PubSub.publish("requestCard", d);
					d3.event.stopPropagation();
				})
				.on('mouseover', function(d) {
					d._ring.attr("fill", "#888");
					hoverLabel.mouseover(d);
				})
				.on('mouseout', function(d) {
					d._ring.attr("fill", "#ccc");	
					hoverLabel.mouseout();
				});


			obj._hitArea = hitArea;
		

			// if(obj.radius < 20) {
			// 	text.attr("opacity", 0);

			// 	layer.on("mouseover", function(d) {
			// 		obj._text.attr("opacity", 1);
			// 	}).on("mouseout", function(d) {
			// 		obj._text.attr("opacity", 0);
			// 	})
			// }
		})
		

	PubSub.subscribe("dimensions", function(msg, data) {
		var slide = data["situation-summary"];

		_.each(moneyed, function(datum, i) {
			var delay = i;
			var start = slide.top + slide.height * 0.32;
			var end = start + slide.height * 0.05;
			
			var keyframes = [
				{ pixel: 0,  value: 0 },
				{ pixel: start + delay + (20*(Math.random()-0.7)), value: 0 },
				{ pixel: end + delay, value: datum.radius },
			]

			
			datum.rFunc = function(fn) {
				var done = false;
				return function(scrollTop) {
					if(scrollTop > end) {
						// done = true;
					}
					if(done) {
						return datum.radius
					} else {
						return fn(scrollTop);	
					}	
				}
			}(frameMapFactory(keyframes));
			

			// var keyframes = [
			// 	{ pixel: 0,  value: 0 },
			// 	{ pixel: slide.top + slide.height * 0.2 + delay, value: 0 },
			// 	{ pixel: slide.top + slide.height * 0.3 + delay, value: 1 },
			// ]

			// datum.oFunc = frameMapFactory(keyframes);

		})
		
	})

	PubSub.subscribe("scrollTop", function(msg, data) {
		_.throttle(_.each(moneyed, function(datum) {
			datum._circle.attr("r", datum.rFunc(data));
			// datum._circle.attr("opacity", datum.oFunc(data));
		}), 60);
	})


}

var ElectionsParallax = function() {
	var el = $("#requestMapContainer");
	var top = 500;

	el.css({
		"position" : "fixed",
	})

	var topAnimation = function() { return 0; };

	PubSub.subscribe("dimensions", function(msg, data) {
		var slide = data["situation-summary"];
		var start = slide.top;
		var end = slide.top + slide.height - geometry.height;

		var movement = (1200-geometry.height)*1.1;

		var keyframes = [
			{ pixel : 0, value : top },
			{ pixel : start, value : top },
			{ pixel : end, value: -movement },
		]

		topAnimation = frameMapFactory(keyframes);

		el.css({ "top" : topAnimation($(window).scrollTop())+"px" });
	});


	PubSub.subscribe("scrollTop",function(msg,data) {
		el.css({ "top" : topAnimation(data)+"px" });
	});
}

//d3.json("./static/data/election-2012-data.json", function(jsondata) {
d3.json("https://tunchz.github.io/files/data/election-2012-data.json", function(jsondata) {
	var dataFilter = function(race) {
		return race.district.indexOf("S") >= 0; // Show House Races Only;
	}

	requestData = _.reject(jsondata, dataFilter);

	PubSub.publish("situation-summary", {});
});

var resize = function() {
	geometry.calculate();

}