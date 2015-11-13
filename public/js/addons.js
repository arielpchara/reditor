!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){function t(e,t){return"pairs"==t&&"string"==typeof e?e:"object"==typeof e&&null!=e[t]?e[t]:u[t]}function n(e){return function(t){return s(t,e)}}function o(e){var t=e.state.closeBrackets;if(!t)return null;var n=e.getModeAt(e.getCursor());return n.closeBrackets||t}function r(n){var r=o(n);if(!r||n.getOption("disableInput"))return e.Pass;for(var i=t(r,"pairs"),a=n.listSelections(),s=0;s<a.length;s++){if(!a[s].empty())return e.Pass;var c=l(n,a[s].head);if(!c||i.indexOf(c)%2!=0)return e.Pass}for(var s=a.length-1;s>=0;s--){var f=a[s].head;n.replaceRange("",h(f.line,f.ch-1),h(f.line,f.ch+1))}}function i(n){var r=o(n),i=r&&t(r,"explode");if(!i||n.getOption("disableInput"))return e.Pass;for(var a=n.listSelections(),s=0;s<a.length;s++){if(!a[s].empty())return e.Pass;var c=l(n,a[s].head);if(!c||i.indexOf(c)%2!=0)return e.Pass}n.operation(function(){n.replaceSelection("\n\n",null),n.execCommand("goCharLeft"),a=n.listSelections();for(var e=0;e<a.length;e++){var t=a[e].head.line;n.indentLine(t,null,!0),n.indentLine(t+1,null,!0)}})}function a(t){var n=e.cmpPos(t.anchor,t.head)>0;return{anchor:new h(t.anchor.line,t.anchor.ch+(n?-1:1)),head:new h(t.head.line,t.head.ch+(n?1:-1))}}function s(n,r){var i=o(n);if(!i||n.getOption("disableInput"))return e.Pass;var s=t(i,"pairs"),l=s.indexOf(r);if(-1==l)return e.Pass;for(var u,d,g=t(i,"triples"),p=s.charAt(l+1)==r,m=n.listSelections(),v=l%2==0,y=0;y<m.length;y++){var x,b=m[y],C=b.head,d=n.getRange(C,h(C.line,C.ch+1));if(v&&!b.empty())x="surround";else if(!p&&v||d!=r)if(p&&C.ch>1&&g.indexOf(r)>=0&&n.getRange(h(C.line,C.ch-2),C)==r+r&&(C.ch<=2||n.getRange(h(C.line,C.ch-3),h(C.line,C.ch-2))!=r))x="addFour";else if(p){if(e.isWordChar(d)||!f(n,C,r))return e.Pass;x="both"}else{if(!v||n.getLine(C.line).length!=C.ch&&!c(d,s)&&!/\s/.test(d))return e.Pass;x="both"}else x=g.indexOf(r)>=0&&n.getRange(C,h(C.line,C.ch+3))==r+r+r?"skipThree":"skip";if(u){if(u!=x)return e.Pass}else u=x}var M=l%2?s.charAt(l-1):r,O=l%2?r:s.charAt(l+1);n.operation(function(){if("skip"==u)n.execCommand("goCharRight");else if("skipThree"==u)for(var e=0;3>e;e++)n.execCommand("goCharRight");else if("surround"==u){for(var t=n.getSelections(),e=0;e<t.length;e++)t[e]=M+t[e]+O;n.replaceSelections(t,"around"),t=n.listSelections().slice();for(var e=0;e<t.length;e++)t[e]=a(t[e]);n.setSelections(t)}else"both"==u?(n.replaceSelection(M+O,null),n.triggerElectric(M+O),n.execCommand("goCharLeft")):"addFour"==u&&(n.replaceSelection(M+M+M+M,"before"),n.execCommand("goCharRight"))})}function c(e,t){var n=t.lastIndexOf(e);return n>-1&&n%2==1}function l(e,t){var n=e.getRange(h(t.line,t.ch-1),h(t.line,t.ch+1));return 2==n.length?n:null}function f(t,n,o){var r=t.getLine(n.line),i=t.getTokenAt(n);if(/\bstring2?\b/.test(i.type))return!1;var a=new e.StringStream(r.slice(0,n.ch)+o+r.slice(n.ch),4);for(a.pos=a.start=i.start;;){var s=t.getMode().token(a,i.state);if(a.pos>=n.ch+1)return/\bstring2?\b/.test(s);a.start=a.pos}}var u={pairs:"()[]{}''\"\"",triples:"",explode:"[]{}"},h=e.Pos;e.defineOption("autoCloseBrackets",!1,function(t,n,o){o&&o!=e.Init&&(t.removeKeyMap(g),t.state.closeBrackets=null),n&&(t.state.closeBrackets=n,t.addKeyMap(g))});for(var d=u.pairs+"`",g={Backspace:r,Enter:i},p=0;p<d.length;p++)g["'"+d.charAt(p)+"'"]=n(d.charAt(p))}),function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){function t(e,t,o,r){var i=e.getLineHandle(t.line),c=t.ch-1,l=c>=0&&s[i.text.charAt(c)]||s[i.text.charAt(++c)];if(!l)return null;var f=">"==l.charAt(1)?1:-1;if(o&&f>0!=(c==t.ch))return null;var u=e.getTokenTypeAt(a(t.line,c+1)),h=n(e,a(t.line,c+(f>0?1:0)),f,u||null,r);return null==h?null:{from:a(t.line,c),to:h&&h.pos,match:h&&h.ch==l.charAt(0),forward:f>0}}function n(e,t,n,o,r){for(var i=r&&r.maxScanLineLength||1e4,c=r&&r.maxScanLines||1e3,l=[],f=r&&r.bracketRegex?r.bracketRegex:/[(){}[\]]/,u=n>0?Math.min(t.line+c,e.lastLine()+1):Math.max(e.firstLine()-1,t.line-c),h=t.line;h!=u;h+=n){var d=e.getLine(h);if(d){var g=n>0?0:d.length-1,p=n>0?d.length:-1;if(!(d.length>i))for(h==t.line&&(g=t.ch-(0>n?1:0));g!=p;g+=n){var m=d.charAt(g);if(f.test(m)&&(void 0===o||e.getTokenTypeAt(a(h,g+1))==o)){var v=s[m];if(">"==v.charAt(1)==n>0)l.push(m);else{if(!l.length)return{pos:a(h,g),ch:m};l.pop()}}}}}return h-n==(n>0?e.lastLine():e.firstLine())?!1:null}function o(e,n,o){for(var r=e.state.matchBrackets.maxHighlightLineLength||1e3,s=[],c=e.listSelections(),l=0;l<c.length;l++){var f=c[l].empty()&&t(e,c[l].head,!1,o);if(f&&e.getLine(f.from.line).length<=r){var u=f.match?"CodeMirror-matchingbracket":"CodeMirror-nonmatchingbracket";s.push(e.markText(f.from,a(f.from.line,f.from.ch+1),{className:u})),f.to&&e.getLine(f.to.line).length<=r&&s.push(e.markText(f.to,a(f.to.line,f.to.ch+1),{className:u}))}}if(s.length){i&&e.state.focused&&e.focus();var h=function(){e.operation(function(){for(var e=0;e<s.length;e++)s[e].clear()})};if(!n)return h;setTimeout(h,800)}}function r(e){e.operation(function(){c&&(c(),c=null),c=o(e,!1,e.state.matchBrackets)})}var i=/MSIE \d/.test(navigator.userAgent)&&(null==document.documentMode||document.documentMode<8),a=e.Pos,s={"(":")>",")":"(<","[":"]>","]":"[<","{":"}>","}":"{<"},c=null;e.defineOption("matchBrackets",!1,function(t,n,o){o&&o!=e.Init&&t.off("cursorActivity",r),n&&(t.state.matchBrackets="object"==typeof n?n:{},t.on("cursorActivity",r))}),e.defineExtension("matchBrackets",function(){o(this,!0)}),e.defineExtension("findMatchingBracket",function(e,n,o){return t(this,e,n,o)}),e.defineExtension("scanForBracket",function(e,t,o,r){return n(this,e,t,o,r)})}),function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../fold/xml-fold")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../fold/xml-fold"],e):e(CodeMirror)}(function(e){"use strict";function t(e){e.state.tagHit&&e.state.tagHit.clear(),e.state.tagOther&&e.state.tagOther.clear(),e.state.tagHit=e.state.tagOther=null}function n(n){n.state.failedTagMatch=!1,n.operation(function(){if(t(n),!n.somethingSelected()){var o=n.getCursor(),r=n.getViewport();r.from=Math.min(r.from,o.line),r.to=Math.max(o.line+1,r.to);var i=e.findMatchingTag(n,o,r);if(i){if(n.state.matchBothTags){var a="open"==i.at?i.open:i.close;a&&(n.state.tagHit=n.markText(a.from,a.to,{className:"CodeMirror-matchingtag"}))}var s="close"==i.at?i.open:i.close;s?n.state.tagOther=n.markText(s.from,s.to,{className:"CodeMirror-matchingtag"}):n.state.failedTagMatch=!0}}})}function o(e){e.state.failedTagMatch&&n(e)}e.defineOption("matchTags",!1,function(r,i,a){a&&a!=e.Init&&(r.off("cursorActivity",n),r.off("viewportChange",o),t(r)),i&&(r.state.matchBothTags="object"==typeof i&&i.bothTags,r.on("cursorActivity",n),r.on("viewportChange",o),n(r))}),e.commands.toMatchingTag=function(t){var n=e.findMatchingTag(t,t.getCursor());if(n){var o="close"==n.at?n.open:n.close;o&&t.extendSelection(o.to,o.from)}}}),function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("./searchcursor"),require("../dialog/dialog")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","./searchcursor","../dialog/dialog"],e):e(CodeMirror)}(function(e){"use strict";function t(e,t){return"string"==typeof e?e=new RegExp(e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&"),t?"gi":"g"):e.global||(e=new RegExp(e.source,e.ignoreCase?"gi":"g")),{token:function(t){e.lastIndex=t.pos;var n=e.exec(t.string);return n&&n.index==t.pos?(t.pos+=n[0].length||1,"searching"):void(n?t.pos=n.index:t.skipToEnd())}}}function n(){this.posFrom=this.posTo=this.lastQuery=this.query=null,this.overlay=null}function o(e){return e.state.search||(e.state.search=new n)}function r(e){return"string"==typeof e&&e==e.toLowerCase()}function i(e,t,n){return e.getSearchCursor(t,n,r(t))}function a(e,t,n,o){e.openDialog(t,o,{value:n,selectValueOnOpen:!0,closeOnEnter:!1,onClose:function(){g(e)}})}function s(e,t,n,o,r){e.openDialog?e.openDialog(t,r,{value:o,selectValueOnOpen:!0}):r(prompt(n,o))}function c(e,t,n,o){e.openConfirm?e.openConfirm(t,o):confirm(n)&&o[0]()}function l(e){return e.replace(/\\(.)/g,function(e,t){return"n"==t?"\n":"r"==t?"\r":t})}function f(e){var t=e.match(/^\/(.*)\/([a-z]*)$/);if(t)try{e=new RegExp(t[1],-1==t[2].indexOf("i")?"":"i")}catch(n){}else e=l(e);return("string"==typeof e?""==e:e.test(""))&&(e=/x^/),e}function u(e,n,o){n.queryText=o,n.query=f(o),e.removeOverlay(n.overlay,r(n.query)),n.overlay=t(n.query,r(n.query)),e.addOverlay(n.overlay),e.showMatchesOnScrollbar&&(n.annotate&&(n.annotate.clear(),n.annotate=null),n.annotate=e.showMatchesOnScrollbar(n.query,r(n.query)))}function h(t,n,r){var i=o(t);if(i.query)return d(t,n);var c=t.getSelection()||i.lastQuery;if(r&&t.openDialog){var l=null;a(t,v,c,function(n,o){e.e_stop(o),n&&(n!=i.queryText&&u(t,i,n),l&&(l.style.opacity=1),d(t,o.shiftKey,function(e,n){var o;n.line<3&&document.querySelector&&(o=t.display.wrapper.querySelector(".CodeMirror-dialog"))&&o.getBoundingClientRect().bottom-4>t.cursorCoords(n,"window").top&&((l=o).style.opacity=.4)}))})}else s(t,v,"Search for:",c,function(e){e&&!i.query&&t.operation(function(){u(t,i,e),i.posFrom=i.posTo=t.getCursor(),d(t,n)})})}function d(t,n,r){t.operation(function(){var a=o(t),s=i(t,a.query,n?a.posFrom:a.posTo);(s.find(n)||(s=i(t,a.query,n?e.Pos(t.lastLine()):e.Pos(t.firstLine(),0)),s.find(n)))&&(t.setSelection(s.from(),s.to()),t.scrollIntoView({from:s.from(),to:s.to()},20),a.posFrom=s.from(),a.posTo=s.to(),r&&r(s.from(),s.to()))})}function g(e){e.operation(function(){var t=o(e);t.lastQuery=t.query,t.query&&(t.query=t.queryText=null,e.removeOverlay(t.overlay),t.annotate&&(t.annotate.clear(),t.annotate=null))})}function p(e,t,n){e.operation(function(){for(var o=i(e,t);o.findNext();)if("string"!=typeof t){var r=e.getRange(o.from(),o.to()).match(t);o.replace(n.replace(/\$(\d)/g,function(e,t){return r[t]}))}else o.replace(n)})}function m(e,t){if(!e.getOption("readOnly")){var n=e.getSelection()||o(e).lastQuery,r=t?"Replace all:":"Replace:";s(e,r+y,r,n,function(n){n&&(n=f(n),s(e,x,"Replace with:","",function(o){if(o=l(o),t)p(e,n,o);else{g(e);var r=i(e,n,e.getCursor()),a=function(){var t,l=r.from();!(t=r.findNext())&&(r=i(e,n),!(t=r.findNext())||l&&r.from().line==l.line&&r.from().ch==l.ch)||(e.setSelection(r.from(),r.to()),e.scrollIntoView({from:r.from(),to:r.to()}),c(e,b,"Replace?",[function(){s(t)},a,function(){p(e,n,o)}]))},s=function(e){r.replace("string"==typeof n?o:o.replace(/\$(\d)/g,function(t,n){return e[n]})),a()};a()}}))})}}var v='Search: <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">(Use /re/ syntax for regexp search)</span>',y=' <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">(Use /re/ syntax for regexp search)</span>',x='With: <input type="text" style="width: 10em" class="CodeMirror-search-field"/>',b="Replace? <button>Yes</button> <button>No</button> <button>All</button> <button>Stop</button>";e.commands.find=function(e){g(e),h(e)},e.commands.findPersistent=function(e){g(e),h(e,!1,!0)},e.commands.findNext=h,e.commands.findPrev=function(e){h(e,!0)},e.commands.clearSearch=g,e.commands.replace=m,e.commands.replaceAll=function(e){m(e,!0)}}),function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function t(e,t,r,i){if(this.atOccurrence=!1,this.doc=e,null==i&&"string"==typeof t&&(i=!1),r=r?e.clipPos(r):o(0,0),this.pos={from:r,to:r},"string"!=typeof t)t.global||(t=new RegExp(t.source,t.ignoreCase?"ig":"g")),this.matches=function(n,r){if(n){t.lastIndex=0;for(var i,a,s=e.getLine(r.line).slice(0,r.ch),c=0;;){t.lastIndex=c;var l=t.exec(s);if(!l)break;if(i=l,a=i.index,c=i.index+(i[0].length||1),c==s.length)break}var f=i&&i[0].length||0;f||(0==a&&0==s.length?i=void 0:a!=e.getLine(r.line).length&&f++)}else{t.lastIndex=r.ch;var s=e.getLine(r.line),i=t.exec(s),f=i&&i[0].length||0,a=i&&i.index;a+f==s.length||f||(f=1)}return i&&f?{from:o(r.line,a),to:o(r.line,a+f),match:i}:void 0};else{var a=t;i&&(t=t.toLowerCase());var s=i?function(e){return e.toLowerCase()}:function(e){return e},c=t.split("\n");if(1==c.length)t.length?this.matches=function(r,i){if(r){var c=e.getLine(i.line).slice(0,i.ch),l=s(c),f=l.lastIndexOf(t);if(f>-1)return f=n(c,l,f),{from:o(i.line,f),to:o(i.line,f+a.length)}}else{var c=e.getLine(i.line).slice(i.ch),l=s(c),f=l.indexOf(t);if(f>-1)return f=n(c,l,f)+i.ch,{from:o(i.line,f),to:o(i.line,f+a.length)}}}:this.matches=function(){};else{var l=a.split("\n");this.matches=function(t,n){var r=c.length-1;if(t){if(n.line-(c.length-1)<e.firstLine())return;if(s(e.getLine(n.line).slice(0,l[r].length))!=c[c.length-1])return;for(var i=o(n.line,l[r].length),a=n.line-1,f=r-1;f>=1;--f,--a)if(c[f]!=s(e.getLine(a)))return;var u=e.getLine(a),h=u.length-l[0].length;if(s(u.slice(h))!=c[0])return;return{from:o(a,h),to:i}}if(!(n.line+(c.length-1)>e.lastLine())){var u=e.getLine(n.line),h=u.length-l[0].length;if(s(u.slice(h))==c[0]){for(var d=o(n.line,h),a=n.line+1,f=1;r>f;++f,++a)if(c[f]!=s(e.getLine(a)))return;if(s(e.getLine(a).slice(0,l[r].length))==c[r])return{from:d,to:o(a,l[r].length)}}}}}}}function n(e,t,n){if(e.length==t.length)return n;for(var o=Math.min(n,e.length);;){var r=e.slice(0,o).toLowerCase().length;if(n>r)++o;else{if(!(r>n))return o;--o}}}var o=e.Pos;t.prototype={findNext:function(){return this.find(!1)},findPrevious:function(){return this.find(!0)},find:function(e){function t(e){var t=o(e,0);return n.pos={from:t,to:t},n.atOccurrence=!1,!1}for(var n=this,r=this.doc.clipPos(e?this.pos.from:this.pos.to);;){if(this.pos=this.matches(e,r))return this.atOccurrence=!0,this.pos.match||!0;if(e){if(!r.line)return t(0);r=o(r.line-1,this.doc.getLine(r.line-1).length)}else{var i=this.doc.lineCount();if(r.line==i-1)return t(i);r=o(r.line+1,0)}}},from:function(){return this.atOccurrence?this.pos.from:void 0},to:function(){return this.atOccurrence?this.pos.to:void 0},replace:function(t,n){if(this.atOccurrence){var r=e.splitLines(t);this.doc.replaceRange(r,this.pos.from,this.pos.to,n),this.pos.to=o(this.pos.from.line+r.length-1,r[r.length-1].length+(1==r.length?this.pos.from.ch:0))}}},e.defineExtension("getSearchCursor",function(e,n,o){return new t(this.doc,e,n,o)}),e.defineDocExtension("getSearchCursor",function(e,n,o){return new t(this,e,n,o)}),e.defineExtension("selectMatches",function(t,n){for(var o=[],r=this.getSearchCursor(t,this.getCursor("from"),n);r.findNext()&&!(e.cmpPos(r.to(),this.getCursor("to"))>0);)o.push({anchor:r.from(),head:r.to()});o.length&&this.setSelections(o,0)})}),function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),"cjs"):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],function(t){e(t,"amd")}):e(CodeMirror,"plain")}(function(e,t){function n(e,t){var n=t;return function(){0==--n&&e()}}function o(t,o){var r=e.modes[t].dependencies;if(!r)return o();for(var i=[],a=0;a<r.length;++a)e.modes.hasOwnProperty(r[a])||i.push(r[a]);if(!i.length)return o();for(var s=n(o,i.length),a=0;a<i.length;++a)e.requireMode(i[a],s)}e.modeURL||(e.modeURL="../mode/%N/%N.js");var r={};e.requireMode=function(n,i){if("string"!=typeof n&&(n=n.name),e.modes.hasOwnProperty(n))return o(n,i);if(r.hasOwnProperty(n))return r[n].push(i);var a=e.modeURL.replace(/%N/g,n);if("plain"==t){var s=document.createElement("script");s.src=a;var c=document.getElementsByTagName("script")[0],l=r[n]=[i];e.on(s,"load",function(){o(n,function(){for(var e=0;e<l.length;++e)l[e]()})}),c.parentNode.insertBefore(s,c)}else"cjs"==t?(require(a),i()):"amd"==t&&requirejs([a],i)},e.autoLoadMode=function(t,n){e.modes.hasOwnProperty(n)||e.requireMode(n,function(){t.setOption("mode",t.getOption("mode"))})}}),function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){function t(e,t,n){var o,r=e.getWrapperElement();return o=r.appendChild(document.createElement("div")),n?o.className="CodeMirror-dialog CodeMirror-dialog-bottom":o.className="CodeMirror-dialog CodeMirror-dialog-top","string"==typeof t?o.innerHTML=t:o.appendChild(t),o}function n(e,t){e.state.currentNotificationClose&&e.state.currentNotificationClose(),e.state.currentNotificationClose=t}e.defineExtension("openDialog",function(o,r,i){function a(e){if("string"==typeof e)u.value=e;else{if(l)return;l=!0,c.parentNode.removeChild(c),f.focus(),i.onClose&&i.onClose(c)}}i||(i={}),n(this,null);var s,c=t(this,o,i.bottom),l=!1,f=this,u=c.getElementsByTagName("input")[0];return u?(i.value&&(u.value=i.value,i.selectValueOnOpen!==!1&&u.select()),i.onInput&&e.on(u,"input",function(e){i.onInput(e,u.value,a)}),i.onKeyUp&&e.on(u,"keyup",function(e){i.onKeyUp(e,u.value,a)}),e.on(u,"keydown",function(t){i&&i.onKeyDown&&i.onKeyDown(t,u.value,a)||((27==t.keyCode||i.closeOnEnter!==!1&&13==t.keyCode)&&(u.blur(),e.e_stop(t),a()),13==t.keyCode&&r(u.value,t))}),i.closeOnBlur!==!1&&e.on(u,"blur",a),u.focus()):(s=c.getElementsByTagName("button")[0])&&(e.on(s,"click",function(){a(),f.focus()}),i.closeOnBlur!==!1&&e.on(s,"blur",a),s.focus()),a}),e.defineExtension("openConfirm",function(o,r,i){function a(){l||(l=!0,s.parentNode.removeChild(s),f.focus())}n(this,null);var s=t(this,o,i&&i.bottom),c=s.getElementsByTagName("button"),l=!1,f=this,u=1;c[0].focus();for(var h=0;h<c.length;++h){var d=c[h];!function(t){e.on(d,"click",function(n){e.e_preventDefault(n),a(),t&&t(f)})}(r[h]),e.on(d,"blur",function(){--u,setTimeout(function(){0>=u&&a()},200)}),e.on(d,"focus",function(){++u})}}),e.defineExtension("openNotification",function(o,r){function i(){c||(c=!0,clearTimeout(a),s.parentNode.removeChild(s))}n(this,i);var a,s=t(this,o,r&&r.bottom),c=!1,l=r&&"undefined"!=typeof r.duration?r.duration:5e3;return e.on(s,"click",function(t){e.e_preventDefault(t),i()}),l&&(a=setTimeout(i,l)),i})}),function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../fold/xml-fold")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../fold/xml-fold"],e):e(CodeMirror)}(function(e){function t(t){if(t.getOption("disableInput"))return e.Pass;for(var n=t.listSelections(),o=[],c=0;c<n.length;c++){if(!n[c].empty())return e.Pass;var l=n[c].head,f=t.getTokenAt(l),u=e.innerMode(t.getMode(),f.state),h=u.state;if("xml"!=u.mode.name||!h.tagName)return e.Pass;var d=t.getOption("autoCloseTags"),g="html"==u.mode.configuration,p="object"==typeof d&&d.dontCloseTags||g&&a,m="object"==typeof d&&d.indentTags||g&&s,v=h.tagName;f.end>l.ch&&(v=v.slice(0,v.length-f.end+l.ch));var y=v.toLowerCase();if(!v||"string"==f.type&&(f.end!=l.ch||!/[\"\']/.test(f.string.charAt(f.string.length-1))||1==f.string.length)||"tag"==f.type&&"closeTag"==h.type||f.string.indexOf("/")==f.string.length-1||p&&r(p,y)>-1||i(t,v,l,h,!0))return e.Pass;var x=m&&r(m,y)>-1;o[c]={indent:x,text:">"+(x?"\n\n":"")+"</"+v+">",newPos:x?e.Pos(l.line+1,0):e.Pos(l.line,l.ch+1)}}for(var c=n.length-1;c>=0;c--){var b=o[c];t.replaceRange(b.text,n[c].head,n[c].anchor,"+insert");var C=t.listSelections().slice(0);C[c]={head:b.newPos,anchor:b.newPos},t.setSelections(C),b.indent&&(t.indentLine(b.newPos.line,null,!0),t.indentLine(b.newPos.line+1,null,!0))}}function n(t,n){for(var o=t.listSelections(),r=[],a=n?"/":"</",s=0;s<o.length;s++){if(!o[s].empty())return e.Pass;var c=o[s].head,l=t.getTokenAt(c),f=e.innerMode(t.getMode(),l.state),u=f.state;if(n&&("string"==l.type||"<"!=l.string.charAt(0)||l.start!=c.ch-1))return e.Pass;var h;if("xml"!=f.mode.name)if("htmlmixed"==t.getMode().name&&"javascript"==f.mode.name)h=a+"script";else{if("htmlmixed"!=t.getMode().name||"css"!=f.mode.name)return e.Pass;h=a+"style"}else{if(!u.context||!u.context.tagName||i(t,u.context.tagName,c,u))return e.Pass;h=a+u.context.tagName}">"!=t.getLine(c.line).charAt(l.end)&&(h+=">"),r[s]=h}t.replaceSelections(r),o=t.listSelections();for(var s=0;s<o.length;s++)(s==o.length-1||o[s].head.line<o[s+1].head.line)&&t.indentLine(o[s].head.line)}function o(t){return t.getOption("disableInput")?e.Pass:n(t,!0)}function r(e,t){if(e.indexOf)return e.indexOf(t);for(var n=0,o=e.length;o>n;++n)if(e[n]==t)return n;return-1}function i(t,n,o,r,i){if(!e.scanForClosingTag)return!1;var a=Math.min(t.lastLine()+1,o.line+500),s=e.scanForClosingTag(t,o,null,a);if(!s||s.tag!=n)return!1;for(var c=r.context,l=i?1:0;c&&c.tagName==n;c=c.prev)++l;o=s.to;for(var f=1;l>f;f++){var u=e.scanForClosingTag(t,o,null,a);if(!u||u.tag!=n)return!1;o=u.to}return!0}e.defineOption("autoCloseTags",!1,function(n,r,i){if(i!=e.Init&&i&&n.removeKeyMap("autoCloseTags"),r){var a={name:"autoCloseTags"};("object"!=typeof r||r.whenClosing)&&(a["'/'"]=function(e){return o(e)}),("object"!=typeof r||r.whenOpening)&&(a["'>'"]=function(e){return t(e)}),n.addKeyMap(a)}});var a=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],s=["applet","blockquote","body","button","div","dl","fieldset","form","frameset","h1","h2","h3","h4","h5","h6","head","html","iframe","layer","legend","object","ol","p","select","table","ul"];e.commands.closeTag=function(e){return n(e)}});