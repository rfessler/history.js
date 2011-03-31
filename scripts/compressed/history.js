(function(a,b){"use strict";var c=a.console||b,d=a.document,e=a.navigator,f=a.amplify||!1,g=a.History=a.History||{},h=a.history;if(typeof g.init!="undefined")throw new Error("History.js Core has already been loaded...");g.init=function(){if(typeof g.Adapter=="undefined")return!1;typeof g.initCore!="undefined"&&g.initCore(),typeof g.initHtml4!="undefined"&&g.initHtml4();return!0},g.initCore=function(){if(typeof g.initCore.initialized!="undefined")return!1;g.initCore.initialized=!0,g.options=g.options||{},g.options.hashChangeInterval=g.options.hashChangeInterval||100,g.options.safariPollInterval=g.options.safariPollInterval||500,g.options.doubleCheckInterval=g.options.doubleCheckInterval||500,g.options.busyDelay=g.options.busyDelay||250,g.options.debug=g.options.debug||!1,g.options.initialTitle=g.options.initialTitle||d.title,g.debug=function(){(g.options.debug||!1)&&g.log.apply(g,arguments)},g.log=function(){var a=typeof c!="undefined"&&typeof c.log!="undefined"&&typeof c.log.apply!="undefined",b=d.getElementById("log"),e,f,g;if(a){var h=Array.prototype.slice.call(arguments);e=h.shift(),typeof c.debug!="undefined"?c.debug.apply(c,[e,h]):c.log.apply(c,[e,h])}else e="\n"+arguments[0]+"\n";for(f=1,g=arguments.length;f<g;++f){var i=arguments[f];if(typeof i=="object"&&typeof JSON!="undefined")try{i=JSON.stringify(i)}catch(j){}e+="\n"+i+"\n"}b?(b.value+=e+"\n-----\n",b.scrollTop=b.scrollHeight-b.clientHeight):a||alert(e);return!0},g.getInternetExplorerMajorVersion=function(){var a=g.getInternetExplorerMajorVersion.cached=typeof g.getInternetExplorerMajorVersion.cached!="undefined"?g.getInternetExplorerMajorVersion.cached:function(){var a=3,b=d.createElement("div"),c=b.getElementsByTagName("i");while((b.innerHTML="<!--[if gt IE "+ ++a+"]><i></i><![endif]-->")&&c[0]);return a>4?a:!1}();return a},g.isInternetExplorer=function(){var a=g.isInternetExplorer.cached=typeof g.isInternetExplorer.cached!="undefined"?g.isInternetExplorer.cached:Boolean(g.getInternetExplorerMajorVersion());return a},g.emulated={pushState:!Boolean(a.history&&a.history.pushState&&a.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent)),hashChange:Boolean(!("onhashchange"in a||"onhashchange"in d)||g.isInternetExplorer()&&g.getInternetExplorerMajorVersion()<8)},g.enabled=!g.emulated.pushState,g.bugs={setHash:Boolean(!g.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2][0-9]|3[0-3])/.test(e.userAgent)),safariPoll:Boolean(!g.emulated.pushState&&e.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2][0-9]|3[0-3])/.test(e.userAgent)),ieDoubleCheck:Boolean(g.isInternetExplorer()&&g.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(g.isInternetExplorer()&&g.getInternetExplorerMajorVersion()<7)},g.isEmptyObject=function(a){for(var b in a)return!1;return!0},g.cloneObject=function(a){var b,c;a?(b=JSON.stringify(a),c=JSON.parse(b)):c={};return c},g.getRootUrl=function(){var a=d.location.protocol+"//"+(d.location.hostname||d.location.host);if(d.location.port||!1)a+=":"+d.location.port;a+="/";return a},g.getBaseHref=function(){var a=d.getElementsByTagName("base"),b=null,c="";a.length===1&&(b=a[0],c=b.href.replace(/[^\/]+$/,"")),c=c.replace(/\/+$/,""),c&&(c+="/");return c},g.getBaseUrl=function(){var a=g.getBaseHref()||g.getBasePageUrl()||g.getRootUrl();return a},g.getPageUrl=function(){var a=g.getState(),b=a.url||d.location.href,c=b.replace(/\/+$/,"").replace(/[^\/]+$/,function(a,b,c){return/\./.test(a)?a:a+"/"});return c},g.getBasePageUrl=function(){var a=d.location.href.replace(/[#\?].*/,"").replace(/[^\/]+$/,function(a,b,c){return/[^\/]$/.test(a)?"":a}).replace(/\/+$/,"")+"/";return a},g.getFullUrl=function(a){var b=a,c=a.substring(0,1);/[a-z]+\:\/\//.test(a)||(c==="/"?b=g.getRootUrl()+a.replace(/^\/+/,""):c==="#"?b=g.getPageUrl().replace(/#.*/,"")+a:c==="?"?b=g.getPageUrl().replace(/[\?#].*/,"")+a:b=g.getBaseUrl()+a);return b.replace(/\#$/,"")},g.getShortUrl=function(a){var b,c=g.getRootUrl();b=a.replace(c,"/");return b.replace(/\#$/,"")},g.store=f?f.store("History.store")||{}:{},g.store.idToState=g.store.idToState||{},g.store.urlToId=g.store.urlToId||{},g.idToState=g.idToState||{},g.stateToId=g.stateToId||{},g.urlToId=g.urlToId||{},g.storedStates=g.storedStates||[],g.savedStates=g.savedStates||[],g.getState=function(a){typeof a=="undefined"&&(a=!0);var b=g.getLastSavedState()||g.createStateObject();a&&(b=g.cloneObject(b),b.url=b.cleanUrl||b.url);return b},g.getIdByState=function(a){var b=g.extractId(a.url);if(!b){var c=g.getStateString(a);if(typeof g.stateToId[c]!="undefined")b=g.stateToId[c];else{for(;;){b=String(Math.floor(Math.random()*1e3));if(typeof g.idToState[b]=="undefined"&&typeof g.store.idToState[b]=="undefined")break}g.stateToId[c]=b,g.idToState[b]=a}}return b},g.normalizeState=function(a){if(!a||typeof a!="object")a={};if(typeof a.normalized!="undefined")return a;if(!a.data||typeof a.data!="object")a.data={};var b={};b.normalized=!0,b.title=a.title||"",b.url=g.getFullUrl(a.url||d.location.href),b.hash=g.getShortUrl(b.url),b.data=g.cloneObject(a.data),b.id=g.getIdByState(b),b.cleanUrl=b.url.replace(/\&_suid.*/,""),b.url=b.cleanUrl;var c=!g.isEmptyObject(b.data);if(b.title||c)b.hash=g.getShortUrl(b.url).replace(/\&_suid.*/,""),/\?/.test(b.hash)||(b.hash+="?"),b.hash+="&_suid="+b.id;b.hashedUrl=g.getFullUrl(b.hash),(g.emulated.pushState||g.bugs.safariPoll)&&g.hasUrlDuplicate(b)&&(b.url=b.hashedUrl);return b},g.createStateObject=function(a,b,c){var d={data:a,title:b,url:c};d=g.normalizeState(d);return d},g.getStateById=function(a){a=String(a);var c=g.idToState[a]||g.store.idToState[a]||b;return c},g.getStateString=function(a){var b=g.normalizeState(a),c={data:b.data,title:a.title,url:a.url},d=JSON.stringify(c);return d},g.getStateId=function(a){var b=g.normalizeState(a),c=b.id;return c},g.getHashByState=function(a){var b,c=g.normalizeState(a);b=c.hash;return b},g.extractId=function(a){var b,c,d;c=/(.*)\&_suid=([0-9]+)$/.exec(a),d=c?c[1]||a:a,b=c?String(c[2]||""):"";return b||!1},g.extractState=function(a,b){var c=null;b=b||!1;var d=g.extractId(a);d&&(c=g.getStateById(d));if(!c){var e=g.getFullUrl(a);d=g.getIdByUrl(e)||!1,d&&(c=g.getStateById(d)),!c&&b&&/\//.test(a)&&(c=g.createStateObject(null,null,e))}return c},g.getIdByUrl=function(a){var c=g.urlToId[a]||g.store.urlToId[a]||b;return c},g.getLastSavedState=function(){return g.savedStates[g.savedStates.length-1]||b},g.getLastStoredState=function(){return g.storedStates[g.storedStates.length-1]||b},g.hasUrlDuplicate=function(a){var b=!1,c=g.extractState(a.url);b=c&&c.id!==a.id;return b},g.storeState=function(a){g.urlToId[a.url]=a.id,g.storedStates.push(g.cloneObject(a));return a},g.isLastSavedState=function(a){var b=!1;if(g.savedStates.length){var c=a.id,d=g.getLastSavedState(),e=d.id;b=c===e}return b},g.saveState=function(a){if(g.isLastSavedState(a))return!1;g.savedStates.push(g.cloneObject(a));return!0},g.getStateByIndex=function(a){var b=null;typeof a=="undefined"?b=g.savedStates[g.savedStates.length-1]:a<0?b=g.savedStates[g.savedStates.length+a]:b=g.savedStates[a];return b},g.getHash=function(){var a=g.unescapeHash(d.location.hash);return a},g.unescapeHash=function(b){var c=g.normalizeHash(b);/\%[^2][^5]/.test(c)&&(c=a.unescape(c));return c},g.normalizeHash=function(a){var b=a.replace(/[^#]*#/,"").replace(/#.*/,"");return b},g.setHash=function(a,b){if(b!==!1&&g.busy()){g.pushQueue({scope:g,callback:g.setHash,args:arguments,queue:b});return!1}var c=g.escapeHash(a);g.busy(!0);var e=g.extractState(a,!0);if(e&&!g.emulated.pushState)g.pushState(e.data,e.title,e.url,!1);else if(d.location.hash!==c)if(g.bugs.setHash){var f=g.getPageUrl();g.pushState(null,null,f+"#"+c,!1)}else d.location.hash=c;return g},g.escapeHash=function(b){var c=g.normalizeHash(b);c=a.escape(c),g.bugs.hashEscape||(c=c.replace("%21","!").replace("%26","&").replace("%3D","=").replace("%3F","?"));return c},g.getHashByUrl=function(a){var b=String(a).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");b=g.unescapeHash(b);return b},g.isTraditionalAnchor=function(a){var b=g.getHashByUrl(a),c=d.getElementById(b),e=typeof c!="undefined";return e},g.setTitle=function(a){var b=a.title;if(!b){var c=g.getStateByIndex(0);c&&c.url===a.url&&(b=c.title||g.options.initialTitle)}try{d.getElementsByTagName("title")[0].innerHTML=b.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(e){}d.title=b;return g},g.queues=[],g.busy=function(a){typeof a!="undefined"?g.busy.flag=a:typeof g.busy.flag=="undefined"&&(g.busy.flag=!1);if(!g.busy.flag){clearTimeout(g.busy.timeout);var b=function(){if(!g.busy.flag)for(var a=g.queues.length-1;a>=0;--a){var c=g.queues[a];if(c.length===0)continue;var d=c.shift();g.fireQueueItem(d),g.busy.timeout=setTimeout(b,g.options.busyDelay)}};g.busy.timeout=setTimeout(b,g.options.busyDelay)}return g.busy.flag},g.fireQueueItem=function(a){return a.callback.apply(a.scope||g,a.args||[])},g.pushQueue=function(a){g.queues[a.queue||0]=g.queues[a.queue||0]||[],g.queues[a.queue||0].push(a);return g},g.queue=function(a,b){typeof a=="function"&&(a={callback:a}),typeof b!="undefined"&&(a.queue=b),g.busy()?g.pushQueue(a):g.fireQueueItem(a);return g},g.clearQueue=function(){g.busy.flag=!1,g.queues=[];return g},g.stateChanged=!1,g.doubleChecker=!1,g.doubleCheckComplete=function(){g.stateChanged=!0,g.doubleCheckClear();return g},g.doubleCheckClear=function(){g.doubleChecker&&(clearTimeout(g.doubleChecker),g.doubleChecker=!1);return g},g.doubleCheck=function(a){g.stateChanged=!1,g.doubleCheckClear(),g.bugs.ieDoubleCheck&&(g.doubleChecker=setTimeout(function(){g.doubleCheckClear(),g.stateChanged||a();return!0},g.options.doubleCheckInterval));return g},g.safariStatePoll=function(){var b=g.extractState(d.location.href),c;if(!g.isLastSavedState(b))c=b;else return;c||(c=g.createStateObject()),g.Adapter.trigger(a,"popstate");return g},g.back=function(a){if(a!==!1&&g.busy()){g.pushQueue({scope:g,callback:g.back,args:arguments,queue:a});return!1}g.busy(!0),g.doubleCheck(function(){g.back(!1)}),h.go(-1);return!0},g.forward=function(a){if(a!==!1&&g.busy()){g.pushQueue({scope:g,callback:g.forward,args:arguments,queue:a});return!1}g.busy(!0),g.doubleCheck(function(){g.forward(!1)}),h.go(1);return!0},g.go=function(a,b){var c;if(a>0)for(c=1;c<=a;++c)g.forward(b);else{if(!(a<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(c=-1;c>=a;--c)g.back(b)}return g};if(g.emulated.pushState){var i=function(){};g.pushState=g.pushState||i,g.replaceState=g.replaceState||i}else{g.onPopState=function(b){g.doubleCheckComplete();var c=g.getHash();if(c){var e=g.extractState(c||d.location.href,!0);e?g.replaceState(e.data,e.title,e.url,!1):(g.Adapter.trigger(a,"anchorchange"),g.busy(!1)),g.expectedStateId=!1;return!1}var f=!1;b=b||{},typeof b.state=="undefined"&&(typeof b.originalEvent!="undefined"&&typeof b.originalEvent.state!="undefined"?b.state=b.originalEvent.state||!1:typeof b.event!="undefined"&&typeof b.event.state!="undefined"&&(b.state=b.event.state||!1)),b.state=b.state||!1,b.state?f=g.getStateById(b.state):g.expectedStateId?f=g.getStateById(g.expectedStateId):f=g.extractState(d.location.href),f||(f=g.createStateObject(null,null,d.location.href)),g.expectedStateId=!1;if(g.isLastSavedState(f)){g.busy(!1);return!1}g.storeState(f),g.saveState(f),g.setTitle(f),g.Adapter.trigger(a,"statechange"),g.busy(!1);return!0},g.Adapter.bind(a,"popstate",g.onPopState),g.pushState=function(b,c,d,e){if(g.getHashByUrl(d)&&g.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(e!==!1&&g.busy()){g.pushQueue({scope:g,callback:g.pushState,args:arguments,queue:e});return!1}g.busy(!0);var f=g.createStateObject(b,c,d);g.isLastSavedState(f)?g.busy(!1):(g.storeState(f),g.expectedStateId=f.id,h.pushState(f.id,f.title,f.url),g.Adapter.trigger(a,"popstate"));return!0},g.replaceState=function(b,c,d,e){if(g.getHashByUrl(d)&&g.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(e!==!1&&g.busy()){g.pushQueue({scope:g,callback:g.replaceState,args:arguments,queue:e});return!1}g.busy(!0);var f=g.createStateObject(b,c,d);g.isLastSavedState(f)?g.busy(!1):(g.storeState(f),g.expectedStateId=f.id,h.replaceState(f.id,f.title,f.url),g.Adapter.trigger(a,"popstate"));return!0},g.Adapter.bind(a,"unload",function(){f.store("History.store",{idToState:g.idToState,urlToId:g.urlToId})}),g.saveState(g.storeState(g.extractState(d.location.href,!0))),g.bugs.safariPoll&&setInterval(g.safariStatePoll,g.options.safariPollInterval);if(e.vendor==="Apple Computer, Inc."||(e.appCodeName||"")==="Mozilla")g.Adapter.bind(a,"hashchange",function(){g.Adapter.trigger(a,"popstate")}),g.getHash()&&g.Adapter.onDomLoad(function(){g.Adapter.trigger(a,"hashchange")})}},g.init()})(window)