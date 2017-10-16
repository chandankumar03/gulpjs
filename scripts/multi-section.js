/*!
 * Flickity PACKAGED v2.0.5
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * http://flickity.metafizzy.co
 * Copyright 2016 Metafizzy
 */

!function(t,e){"function"==typeof define&&define.amd?define("jquery-bridget/jquery-bridget",["jquery"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("jquery")):t.jQueryBridget=e(t,t.jQuery)}(window,function(t,e){"use strict";function i(i,o,a){function l(t,e,n){var s,o="$()."+i+'("'+e+'")';return t.each(function(t,l){var h=a.data(l,i);if(!h)return void r(i+" not initialized. Cannot call methods, i.e. "+o);var c=h[e];if(!c||"_"==e.charAt(0))return void r(o+" is not a valid method");var d=c.apply(h,n);s=void 0===s?d:s}),void 0!==s?s:t}function h(t,e){t.each(function(t,n){var s=a.data(n,i);s?(s.option(e),s._init()):(s=new o(n,e),a.data(n,i,s))})}a=a||e||t.jQuery,a&&(o.prototype.option||(o.prototype.option=function(t){a.isPlainObject(t)&&(this.options=a.extend(!0,this.options,t))}),a.fn[i]=function(t){if("string"==typeof t){var e=s.call(arguments,1);return l(this,t,e)}return h(this,t),this},n(a))}function n(t){!t||t&&t.bridget||(t.bridget=i)}var s=Array.prototype.slice,o=t.console,r="undefined"==typeof o?function(){}:function(t){o.error(t)};return n(e||t.jQuery),i}),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return n.indexOf(e)==-1&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||{};return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return n!=-1&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,s=i[n];e=e||[];for(var o=this._onceEvents&&this._onceEvents[t];s;){var r=o&&o[s];r&&(this.off(t,s),delete o[s]),s.apply(this,e),n+=r?0:1,s=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("get-size/get-size",[],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():t.getSize=e()}(window,function(){"use strict";function t(t){var e=parseFloat(t),i=t.indexOf("%")==-1&&!isNaN(e);return i&&e}function e(){}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0;e<h;e++){var i=l[e];t[i]=0}return t}function n(t){var e=getComputedStyle(t);return e||a("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e}function s(){if(!c){c=!0;var e=document.createElement("div");e.style.width="200px",e.style.padding="1px 2px 3px 4px",e.style.borderStyle="solid",e.style.borderWidth="1px 2px 3px 4px",e.style.boxSizing="border-box";var i=document.body||document.documentElement;i.appendChild(e);var s=n(e);o.isBoxSizeOuter=r=200==t(s.width),i.removeChild(e)}}function o(e){if(s(),"string"==typeof e&&(e=document.querySelector(e)),e&&"object"==typeof e&&e.nodeType){var o=n(e);if("none"==o.display)return i();var a={};a.width=e.offsetWidth,a.height=e.offsetHeight;for(var c=a.isBorderBox="border-box"==o.boxSizing,d=0;d<h;d++){var u=l[d],f=o[u],p=parseFloat(f);a[u]=isNaN(p)?0:p}var v=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,m=a.marginLeft+a.marginRight,y=a.marginTop+a.marginBottom,S=a.borderLeftWidth+a.borderRightWidth,E=a.borderTopWidth+a.borderBottomWidth,b=c&&r,x=t(o.width);x!==!1&&(a.width=x+(b?0:v+S));var C=t(o.height);return C!==!1&&(a.height=C+(b?0:g+E)),a.innerWidth=a.width-(v+S),a.innerHeight=a.height-(g+E),a.outerWidth=a.width+m,a.outerHeight=a.height+y,a}}var r,a="undefined"==typeof console?e:function(t){console.error(t)},l=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],h=l.length,c=!1;return o}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("desandro-matches-selector/matches-selector",e):"object"==typeof module&&module.exports?module.exports=e():t.matchesSelector=e()}(window,function(){"use strict";var t=function(){var t=Element.prototype;if(t.matches)return"matches";if(t.matchesSelector)return"matchesSelector";for(var e=["webkit","moz","ms","o"],i=0;i<e.length;i++){var n=e[i],s=n+"MatchesSelector";if(t[s])return s}}();return function(e,i){return e[t](i)}}),function(t,e){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["desandro-matches-selector/matches-selector"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("desandro-matches-selector")):t.fizzyUIUtils=e(t,t.matchesSelector)}(window,function(t,e){var i={};i.extend=function(t,e){for(var i in e)t[i]=e[i];return t},i.modulo=function(t,e){return(t%e+e)%e},i.makeArray=function(t){var e=[];if(Array.isArray(t))e=t;else if(t&&"number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e},i.removeFrom=function(t,e){var i=t.indexOf(e);i!=-1&&t.splice(i,1)},i.getParent=function(t,i){for(;t!=document.body;)if(t=t.parentNode,e(t,i))return t},i.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},i.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},i.filterFindElements=function(t,n){t=i.makeArray(t);var s=[];return t.forEach(function(t){if(t instanceof HTMLElement){if(!n)return void s.push(t);e(t,n)&&s.push(t);for(var i=t.querySelectorAll(n),o=0;o<i.length;o++)s.push(i[o])}}),s},i.debounceMethod=function(t,e,i){var n=t.prototype[e],s=e+"Timeout";t.prototype[e]=function(){var t=this[s];t&&clearTimeout(t);var e=arguments,o=this;this[s]=setTimeout(function(){n.apply(o,e),delete o[s]},i||100)}},i.docReady=function(t){var e=document.readyState;"complete"==e||"interactive"==e?setTimeout(t):document.addEventListener("DOMContentLoaded",t)},i.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()};var n=t.console;return i.htmlInit=function(e,s){i.docReady(function(){var o=i.toDashed(s),r="data-"+o,a=document.querySelectorAll("["+r+"]"),l=document.querySelectorAll(".js-"+o),h=i.makeArray(a).concat(i.makeArray(l)),c=r+"-options",d=t.jQuery;h.forEach(function(t){var i,o=t.getAttribute(r)||t.getAttribute(c);try{i=o&&JSON.parse(o)}catch(a){return void(n&&n.error("Error parsing "+r+" on "+t.className+": "+a))}var l=new e(t,i);d&&d.data(t,s,l)})})},i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/cell",["get-size/get-size"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("get-size")):(t.Flickity=t.Flickity||{},t.Flickity.Cell=e(t,t.getSize))}(window,function(t,e){function i(t,e){this.element=t,this.parent=e,this.create()}var n=i.prototype;return n.create=function(){this.element.style.position="absolute",this.x=0,this.shift=0},n.destroy=function(){this.element.style.position="";var t=this.parent.originSide;this.element.style[t]=""},n.getSize=function(){this.size=e(this.element)},n.setPosition=function(t){this.x=t,this.updateTarget(),this.renderPosition(t)},n.updateTarget=n.setDefaultTarget=function(){var t="left"==this.parent.originSide?"marginLeft":"marginRight";this.target=this.x+this.size[t]+this.size.width*this.parent.cellAlign},n.renderPosition=function(t){var e=this.parent.originSide;this.element.style[e]=this.parent.getPositionValue(t)},n.wrapShift=function(t){this.shift=t,this.renderPosition(this.x+this.parent.slideableWidth*t)},n.remove=function(){this.element.parentNode.removeChild(this.element)},i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/slide",e):"object"==typeof module&&module.exports?module.exports=e():(t.Flickity=t.Flickity||{},t.Flickity.Slide=e())}(window,function(){"use strict";function t(t){this.parent=t,this.isOriginLeft="left"==t.originSide,this.cells=[],this.outerWidth=0,this.height=0}var e=t.prototype;return e.addCell=function(t){if(this.cells.push(t),this.outerWidth+=t.size.outerWidth,this.height=Math.max(t.size.outerHeight,this.height),1==this.cells.length){this.x=t.x;var e=this.isOriginLeft?"marginLeft":"marginRight";this.firstMargin=t.size[e]}},e.updateTarget=function(){var t=this.isOriginLeft?"marginRight":"marginLeft",e=this.getLastCell(),i=e?e.size[t]:0,n=this.outerWidth-(this.firstMargin+i);this.target=this.x+this.firstMargin+n*this.parent.cellAlign},e.getLastCell=function(){return this.cells[this.cells.length-1]},e.select=function(){this.changeSelectedClass("add")},e.unselect=function(){this.changeSelectedClass("remove")},e.changeSelectedClass=function(t){this.cells.forEach(function(e){e.element.classList[t]("is-selected")})},e.getCellElements=function(){return this.cells.map(function(t){return t.element})},t}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/animate",["fizzy-ui-utils/utils"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("fizzy-ui-utils")):(t.Flickity=t.Flickity||{},t.Flickity.animatePrototype=e(t,t.fizzyUIUtils))}(window,function(t,e){var i=t.requestAnimationFrame||t.webkitRequestAnimationFrame,n=0;i||(i=function(t){var e=(new Date).getTime(),i=Math.max(0,16-(e-n)),s=setTimeout(t,i);return n=e+i,s});var s={};s.startAnimation=function(){this.isAnimating||(this.isAnimating=!0,this.restingFrames=0,this.animate())},s.animate=function(){this.applyDragForce(),this.applySelectedAttraction();var t=this.x;if(this.integratePhysics(),this.positionSlider(),this.settle(t),this.isAnimating){var e=this;i(function(){e.animate()})}};var o=function(){var t=document.documentElement.style;return"string"==typeof t.transform?"transform":"WebkitTransform"}();return s.positionSlider=function(){var t=this.x;this.options.wrapAround&&this.cells.length>1&&(t=e.modulo(t,this.slideableWidth),t-=this.slideableWidth,this.shiftWrapCells(t)),t+=this.cursorPosition,t=this.options.rightToLeft&&o?-t:t;var i=this.getPositionValue(t);this.slider.style[o]=this.isAnimating?"translate3d("+i+",0,0)":"translateX("+i+")";var n=this.slides[0];if(n){var s=-this.x-n.target,r=s/this.slidesWidth;this.dispatchEvent("scroll",null,[r,s])}},s.positionSliderAtSelected=function(){this.cells.length&&(this.x=-this.selectedSlide.target,this.positionSlider())},s.getPositionValue=function(t){return this.options.percentPosition?.01*Math.round(t/this.size.innerWidth*1e4)+"%":Math.round(t)+"px"},s.settle=function(t){this.isPointerDown||Math.round(100*this.x)!=Math.round(100*t)||this.restingFrames++,this.restingFrames>2&&(this.isAnimating=!1,delete this.isFreeScrolling,this.positionSlider(),this.dispatchEvent("settle"))},s.shiftWrapCells=function(t){var e=this.cursorPosition+t;this._shiftCells(this.beforeShiftCells,e,-1);var i=this.size.innerWidth-(t+this.slideableWidth+this.cursorPosition);this._shiftCells(this.afterShiftCells,i,1)},s._shiftCells=function(t,e,i){for(var n=0;n<t.length;n++){var s=t[n],o=e>0?i:0;s.wrapShift(o),e-=s.size.outerWidth}},s._unshiftCells=function(t){if(t&&t.length)for(var e=0;e<t.length;e++)t[e].wrapShift(0)},s.integratePhysics=function(){this.x+=this.velocity,this.velocity*=this.getFrictionFactor()},s.applyForce=function(t){this.velocity+=t},s.getFrictionFactor=function(){return 1-this.options[this.isFreeScrolling?"freeScrollFriction":"friction"]},s.getRestingPosition=function(){return this.x+this.velocity/(1-this.getFrictionFactor())},s.applyDragForce=function(){if(this.isPointerDown){var t=this.dragX-this.x,e=t-this.velocity;this.applyForce(e)}},s.applySelectedAttraction=function(){if(!this.isPointerDown&&!this.isFreeScrolling&&this.cells.length){var t=this.selectedSlide.target*-1-this.x,e=t*this.options.selectedAttraction;this.applyForce(e)}},s}),function(t,e){if("function"==typeof define&&define.amd)define("flickity/js/flickity",["ev-emitter/ev-emitter","get-size/get-size","fizzy-ui-utils/utils","./cell","./slide","./animate"],function(i,n,s,o,r,a){return e(t,i,n,s,o,r,a)});else if("object"==typeof module&&module.exports)module.exports=e(t,require("ev-emitter"),require("get-size"),require("fizzy-ui-utils"),require("./cell"),require("./slide"),require("./animate"));else{var i=t.Flickity;t.Flickity=e(t,t.EvEmitter,t.getSize,t.fizzyUIUtils,i.Cell,i.Slide,i.animatePrototype)}}(window,function(t,e,i,n,s,o,r){function a(t,e){for(t=n.makeArray(t);t.length;)e.appendChild(t.shift())}function l(t,e){var i=n.getQueryElement(t);if(!i)return void(d&&d.error("Bad element for Flickity: "+(i||t)));if(this.element=i,this.element.flickityGUID){var s=f[this.element.flickityGUID];return s.option(e),s}h&&(this.$element=h(this.element)),this.options=n.extend({},this.constructor.defaults),this.option(e),this._create()}var h=t.jQuery,c=t.getComputedStyle,d=t.console,u=0,f={};l.defaults={accessibility:!0,cellAlign:"center",freeScrollFriction:.075,friction:.28,namespaceJQueryEvents:!0,percentPosition:!0,resize:!0,selectedAttraction:.025,setGallerySize:!0},l.createMethods=[];var p=l.prototype;n.extend(p,e.prototype),p._create=function(){var e=this.guid=++u;this.element.flickityGUID=e,f[e]=this,this.selectedIndex=0,this.restingFrames=0,this.x=0,this.velocity=0,this.originSide=this.options.rightToLeft?"right":"left",this.viewport=document.createElement("div"),this.viewport.className="flickity-viewport",this._createSlider(),(this.options.resize||this.options.watchCSS)&&t.addEventListener("resize",this),l.createMethods.forEach(function(t){this[t]()},this),this.options.watchCSS?this.watchCSS():this.activate()},p.option=function(t){n.extend(this.options,t)},p.activate=function(){if(!this.isActive){this.isActive=!0,this.element.classList.add("flickity-enabled"),this.options.rightToLeft&&this.element.classList.add("flickity-rtl"),this.getSize();var t=this._filterFindCellElements(this.element.children);a(t,this.slider),this.viewport.appendChild(this.slider),this.element.appendChild(this.viewport),this.reloadCells(),this.options.accessibility&&(this.element.tabIndex=0,this.element.addEventListener("keydown",this)),this.emitEvent("activate");var e,i=this.options.initialIndex;e=this.isInitActivated?this.selectedIndex:void 0!==i&&this.cells[i]?i:0,this.select(e,!1,!0),this.isInitActivated=!0}},p._createSlider=function(){var t=document.createElement("div");t.className="flickity-slider",t.style[this.originSide]=0,this.slider=t},p._filterFindCellElements=function(t){return n.filterFindElements(t,this.options.cellSelector)},p.reloadCells=function(){this.cells=this._makeCells(this.slider.children),this.positionCells(),this._getWrapShiftCells(),this.setGallerySize()},p._makeCells=function(t){var e=this._filterFindCellElements(t),i=e.map(function(t){return new s(t,this)},this);return i},p.getLastCell=function(){return this.cells[this.cells.length-1]},p.getLastSlide=function(){return this.slides[this.slides.length-1]},p.positionCells=function(){this._sizeCells(this.cells),this._positionCells(0)},p._positionCells=function(t){t=t||0,this.maxCellHeight=t?this.maxCellHeight||0:0;var e=0;if(t>0){var i=this.cells[t-1];e=i.x+i.size.outerWidth}for(var n=this.cells.length,s=t;s<n;s++){var o=this.cells[s];o.setPosition(e),e+=o.size.outerWidth,this.maxCellHeight=Math.max(o.size.outerHeight,this.maxCellHeight)}this.slideableWidth=e,this.updateSlides(),this._containSlides(),this.slidesWidth=n?this.getLastSlide().target-this.slides[0].target:0},p._sizeCells=function(t){t.forEach(function(t){t.getSize()})},p.updateSlides=function(){if(this.slides=[],this.cells.length){var t=new o(this);this.slides.push(t);var e="left"==this.originSide,i=e?"marginRight":"marginLeft",n=this._getCanCellFit();this.cells.forEach(function(e,s){if(!t.cells.length)return void t.addCell(e);var r=t.outerWidth-t.firstMargin+(e.size.outerWidth-e.size[i]);n.call(this,s,r)?t.addCell(e):(t.updateTarget(),t=new o(this),this.slides.push(t),t.addCell(e))},this),t.updateTarget(),this.updateSelectedSlide()}},p._getCanCellFit=function(){var t=this.options.groupCells;if(!t)return function(){return!1};if("number"==typeof t){var e=parseInt(t,10);return function(t){return t%e!==0}}var i="string"==typeof t&&t.match(/^(\d+)%$/),n=i?parseInt(i[1],10)/100:1;return function(t,e){return e<=(this.size.innerWidth+1)*n}},p._init=p.reposition=function(){this.positionCells(),this.positionSliderAtSelected()},p.getSize=function(){this.size=i(this.element),this.setCellAlign(),this.cursorPosition=this.size.innerWidth*this.cellAlign};var v={center:{left:.5,right:.5},left:{left:0,right:1},right:{right:0,left:1}};return p.setCellAlign=function(){var t=v[this.options.cellAlign];this.cellAlign=t?t[this.originSide]:this.options.cellAlign},p.setGallerySize=function(){if(this.options.setGallerySize){var t=this.options.adaptiveHeight&&this.selectedSlide?this.selectedSlide.height:this.maxCellHeight;this.viewport.style.height=t+"px"}},p._getWrapShiftCells=function(){if(this.options.wrapAround){this._unshiftCells(this.beforeShiftCells),this._unshiftCells(this.afterShiftCells);var t=this.cursorPosition,e=this.cells.length-1;this.beforeShiftCells=this._getGapCells(t,e,-1),t=this.size.innerWidth-this.cursorPosition,this.afterShiftCells=this._getGapCells(t,0,1)}},p._getGapCells=function(t,e,i){for(var n=[];t>0;){var s=this.cells[e];if(!s)break;n.push(s),e+=i,t-=s.size.outerWidth}return n},p._containSlides=function(){if(this.options.contain&&!this.options.wrapAround&&this.cells.length){var t=this.options.rightToLeft,e=t?"marginRight":"marginLeft",i=t?"marginLeft":"marginRight",n=this.slideableWidth-this.getLastCell().size[i],s=n<this.size.innerWidth,o=this.cursorPosition+this.cells[0].size[e],r=n-this.size.innerWidth*(1-this.cellAlign);this.slides.forEach(function(t){s?t.target=n*this.cellAlign:(t.target=Math.max(t.target,o),t.target=Math.min(t.target,r))},this)}},p.dispatchEvent=function(t,e,i){var n=e?[e].concat(i):i;if(this.emitEvent(t,n),h&&this.$element){t+=this.options.namespaceJQueryEvents?".flickity":"";var s=t;if(e){var o=h.Event(e);o.type=t,s=o}this.$element.trigger(s,i)}},p.select=function(t,e,i){this.isActive&&(t=parseInt(t,10),this._wrapSelect(t),(this.options.wrapAround||e)&&(t=n.modulo(t,this.slides.length)),this.slides[t]&&(this.selectedIndex=t,this.updateSelectedSlide(),i?this.positionSliderAtSelected():this.startAnimation(),this.options.adaptiveHeight&&this.setGallerySize(),this.dispatchEvent("select"),this.dispatchEvent("cellSelect")))},p._wrapSelect=function(t){var e=this.slides.length,i=this.options.wrapAround&&e>1;if(!i)return t;var s=n.modulo(t,e),o=Math.abs(s-this.selectedIndex),r=Math.abs(s+e-this.selectedIndex),a=Math.abs(s-e-this.selectedIndex);!this.isDragSelect&&r<o?t+=e:!this.isDragSelect&&a<o&&(t-=e),t<0?this.x-=this.slideableWidth:t>=e&&(this.x+=this.slideableWidth)},p.previous=function(t,e){this.select(this.selectedIndex-1,t,e)},p.next=function(t,e){this.select(this.selectedIndex+1,t,e)},p.updateSelectedSlide=function(){var t=this.slides[this.selectedIndex];t&&(this.unselectSelectedSlide(),this.selectedSlide=t,t.select(),this.selectedCells=t.cells,this.selectedElements=t.getCellElements(),this.selectedCell=t.cells[0],this.selectedElement=this.selectedElements[0])},p.unselectSelectedSlide=function(){this.selectedSlide&&this.selectedSlide.unselect()},p.selectCell=function(t,e,i){var n;"number"==typeof t?n=this.cells[t]:("string"==typeof t&&(t=this.element.querySelector(t)),n=this.getCell(t));for(var s=0;n&&s<this.slides.length;s++){var o=this.slides[s],r=o.cells.indexOf(n);if(r!=-1)return void this.select(s,e,i)}},p.getCell=function(t){for(var e=0;e<this.cells.length;e++){var i=this.cells[e];if(i.element==t)return i}},p.getCells=function(t){t=n.makeArray(t);var e=[];return t.forEach(function(t){var i=this.getCell(t);i&&e.push(i)},this),e},p.getCellElements=function(){return this.cells.map(function(t){return t.element})},p.getParentCell=function(t){var e=this.getCell(t);return e?e:(t=n.getParent(t,".flickity-slider > *"),this.getCell(t))},p.getAdjacentCellElements=function(t,e){if(!t)return this.selectedSlide.getCellElements();e=void 0===e?this.selectedIndex:e;var i=this.slides.length;if(1+2*t>=i)return this.getCellElements();for(var s=[],o=e-t;o<=e+t;o++){var r=this.options.wrapAround?n.modulo(o,i):o,a=this.slides[r];a&&(s=s.concat(a.getCellElements()))}return s},p.uiChange=function(){this.emitEvent("uiChange")},p.childUIPointerDown=function(t){this.emitEvent("childUIPointerDown",[t])},p.onresize=function(){this.watchCSS(),this.resize()},n.debounceMethod(l,"onresize",150),p.resize=function(){if(this.isActive){this.getSize(),this.options.wrapAround&&(this.x=n.modulo(this.x,this.slideableWidth)),this.positionCells(),this._getWrapShiftCells(),this.setGallerySize(),this.emitEvent("resize");var t=this.selectedElements&&this.selectedElements[0];this.selectCell(t,!1,!0)}},p.watchCSS=function(){var t=this.options.watchCSS;if(t){var e=c(this.element,":after").content;e.indexOf("flickity")!=-1?this.activate():this.deactivate()}},p.onkeydown=function(t){if(this.options.accessibility&&(!document.activeElement||document.activeElement==this.element))if(37==t.keyCode){var e=this.options.rightToLeft?"next":"previous";this.uiChange(),this[e]()}else if(39==t.keyCode){var i=this.options.rightToLeft?"previous":"next";this.uiChange(),this[i]()}},p.deactivate=function(){this.isActive&&(this.element.classList.remove("flickity-enabled"),this.element.classList.remove("flickity-rtl"),this.cells.forEach(function(t){t.destroy()}),this.unselectSelectedSlide(),this.element.removeChild(this.viewport),a(this.slider.children,this.element),this.options.accessibility&&(this.element.removeAttribute("tabIndex"),this.element.removeEventListener("keydown",this)),this.isActive=!1,this.emitEvent("deactivate"))},p.destroy=function(){this.deactivate(),t.removeEventListener("resize",this),this.emitEvent("destroy"),h&&this.$element&&h.removeData(this.element,"flickity"),delete this.element.flickityGUID,delete f[this.guid]},n.extend(p,r),l.data=function(t){t=n.getQueryElement(t);var e=t&&t.flickityGUID;return e&&f[e]},n.htmlInit(l,"flickity"),h&&h.bridget&&h.bridget("flickity",l),l.Cell=s,l}),function(t,e){"function"==typeof define&&define.amd?define("unipointer/unipointer",["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.Unipointer=e(t,t.EvEmitter)}(window,function(t,e){function i(){}function n(){}var s=n.prototype=Object.create(e.prototype);s.bindStartEvent=function(t){this._bindStartEvent(t,!0)},s.unbindStartEvent=function(t){this._bindStartEvent(t,!1)},s._bindStartEvent=function(e,i){i=void 0===i||!!i;var n=i?"addEventListener":"removeEventListener";t.navigator.pointerEnabled?e[n]("pointerdown",this):t.navigator.msPointerEnabled?e[n]("MSPointerDown",this):(e[n]("mousedown",this),e[n]("touchstart",this))},s.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},s.getTouch=function(t){for(var e=0;e<t.length;e++){var i=t[e];if(i.identifier==this.pointerIdentifier)return i}},s.onmousedown=function(t){var e=t.button;e&&0!==e&&1!==e||this._pointerDown(t,t)},s.ontouchstart=function(t){this._pointerDown(t,t.changedTouches[0])},s.onMSPointerDown=s.onpointerdown=function(t){this._pointerDown(t,t)},s._pointerDown=function(t,e){this.isPointerDown||(this.isPointerDown=!0,this.pointerIdentifier=void 0!==e.pointerId?e.pointerId:e.identifier,this.pointerDown(t,e))},s.pointerDown=function(t,e){this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e])};var o={mousedown:["mousemove","mouseup"],touchstart:["touchmove","touchend","touchcancel"],pointerdown:["pointermove","pointerup","pointercancel"],MSPointerDown:["MSPointerMove","MSPointerUp","MSPointerCancel"]};return s._bindPostStartEvents=function(e){if(e){var i=o[e.type];i.forEach(function(e){t.addEventListener(e,this)},this),this._boundPointerEvents=i}},s._unbindPostStartEvents=function(){this._boundPointerEvents&&(this._boundPointerEvents.forEach(function(e){t.removeEventListener(e,this)},this),delete this._boundPointerEvents)},s.onmousemove=function(t){this._pointerMove(t,t)},s.onMSPointerMove=s.onpointermove=function(t){t.pointerId==this.pointerIdentifier&&this._pointerMove(t,t)},s.ontouchmove=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerMove(t,e)},s._pointerMove=function(t,e){this.pointerMove(t,e)},s.pointerMove=function(t,e){this.emitEvent("pointerMove",[t,e])},s.onmouseup=function(t){this._pointerUp(t,t)},s.onMSPointerUp=s.onpointerup=function(t){t.pointerId==this.pointerIdentifier&&this._pointerUp(t,t)},s.ontouchend=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerUp(t,e)},s._pointerUp=function(t,e){this._pointerDone(),this.pointerUp(t,e)},s.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e])},s._pointerDone=function(){this.isPointerDown=!1,delete this.pointerIdentifier,this._unbindPostStartEvents(),this.pointerDone()},s.pointerDone=i,s.onMSPointerCancel=s.onpointercancel=function(t){t.pointerId==this.pointerIdentifier&&this._pointerCancel(t,t)},s.ontouchcancel=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerCancel(t,e)},s._pointerCancel=function(t,e){this._pointerDone(),this.pointerCancel(t,e)},s.pointerCancel=function(t,e){this.emitEvent("pointerCancel",[t,e])},n.getPointerPoint=function(t){return{x:t.pageX,y:t.pageY}},n}),function(t,e){"function"==typeof define&&define.amd?define("unidragger/unidragger",["unipointer/unipointer"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("unipointer")):t.Unidragger=e(t,t.Unipointer)}(window,function(t,e){function i(){}function n(){}var s=n.prototype=Object.create(e.prototype);s.bindHandles=function(){this._bindHandles(!0)},s.unbindHandles=function(){this._bindHandles(!1)};var o=t.navigator;return s._bindHandles=function(t){t=void 0===t||!!t;var e;e=o.pointerEnabled?function(e){e.style.touchAction=t?"none":""}:o.msPointerEnabled?function(e){e.style.msTouchAction=t?"none":""}:i;for(var n=t?"addEventListener":"removeEventListener",s=0;s<this.handles.length;s++){var r=this.handles[s];this._bindStartEvent(r,t),e(r),r[n]("click",this)}},s.pointerDown=function(t,e){if("INPUT"==t.target.nodeName&&"range"==t.target.type)return this.isPointerDown=!1,void delete this.pointerIdentifier;this._dragPointerDown(t,e);var i=document.activeElement;i&&i.blur&&i.blur(),this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,e])},s._dragPointerDown=function(t,i){this.pointerDownPoint=e.getPointerPoint(i);var n=this.canPreventDefaultOnPointerDown(t,i);n&&t.preventDefault()},s.canPreventDefaultOnPointerDown=function(t){return"SELECT"!=t.target.nodeName},s.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.emitEvent("pointerMove",[t,e,i]),this._dragMove(t,e,i)},s._dragPointerMove=function(t,i){var n=e.getPointerPoint(i),s={x:n.x-this.pointerDownPoint.x,y:n.y-this.pointerDownPoint.y};return!this.isDragging&&this.hasDragStarted(s)&&this._dragStart(t,i),s},s.hasDragStarted=function(t){return Math.abs(t.x)>3||Math.abs(t.y)>3},s.pointerUp=function(t,e){this.emitEvent("pointerUp",[t,e]),this._dragPointerUp(t,e)},s._dragPointerUp=function(t,e){this.isDragging?this._dragEnd(t,e):this._staticClick(t,e)},s._dragStart=function(t,i){this.isDragging=!0,this.dragStartPoint=e.getPointerPoint(i),this.isPreventingClicks=!0,this.dragStart(t,i)},s.dragStart=function(t,e){this.emitEvent("dragStart",[t,e])},s._dragMove=function(t,e,i){this.isDragging&&this.dragMove(t,e,i)},s.dragMove=function(t,e,i){t.preventDefault(),this.emitEvent("dragMove",[t,e,i])},s._dragEnd=function(t,e){this.isDragging=!1,setTimeout(function(){delete this.isPreventingClicks}.bind(this)),this.dragEnd(t,e)},s.dragEnd=function(t,e){this.emitEvent("dragEnd",[t,e])},s.onclick=function(t){this.isPreventingClicks&&t.preventDefault()},s._staticClick=function(t,e){if(!this.isIgnoringMouseUp||"mouseup"!=t.type){var i=t.target.nodeName;"INPUT"!=i&&"TEXTAREA"!=i||t.target.focus(),this.staticClick(t,e),"mouseup"!=t.type&&(this.isIgnoringMouseUp=!0,setTimeout(function(){delete this.isIgnoringMouseUp}.bind(this),400))}},s.staticClick=function(t,e){this.emitEvent("staticClick",[t,e])},n.getPointerPoint=e.getPointerPoint,n}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/drag",["./flickity","unidragger/unidragger","fizzy-ui-utils/utils"],function(i,n,s){return e(t,i,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("unidragger"),require("fizzy-ui-utils")):t.Flickity=e(t,t.Flickity,t.Unidragger,t.fizzyUIUtils)}(window,function(t,e,i,n){function s(){return{x:t.pageXOffset,y:t.pageYOffset}}n.extend(e.defaults,{draggable:!0,dragThreshold:3}),e.createMethods.push("_createDrag");var o=e.prototype;n.extend(o,i.prototype);var r="createTouch"in document,a=!1;o._createDrag=function(){this.on("activate",this.bindDrag),this.on("uiChange",this._uiChangeDrag),this.on("childUIPointerDown",this._childUIPointerDownDrag),this.on("deactivate",this.unbindDrag),r&&!a&&(t.addEventListener("touchmove",function(){}),a=!0)},o.bindDrag=function(){this.options.draggable&&!this.isDragBound&&(this.element.classList.add("is-draggable"),this.handles=[this.viewport],this.bindHandles(),this.isDragBound=!0)},o.unbindDrag=function(){this.isDragBound&&(this.element.classList.remove("is-draggable"),this.unbindHandles(),delete this.isDragBound)},o._uiChangeDrag=function(){delete this.isFreeScrolling},o._childUIPointerDownDrag=function(t){t.preventDefault(),this.pointerDownFocus(t)};var l={TEXTAREA:!0,INPUT:!0,OPTION:!0},h={radio:!0,checkbox:!0,button:!0,submit:!0,image:!0,file:!0};o.pointerDown=function(e,i){var n=l[e.target.nodeName]&&!h[e.target.type];if(n)return this.isPointerDown=!1,void delete this.pointerIdentifier;this._dragPointerDown(e,i);var o=document.activeElement;o&&o.blur&&o!=this.element&&o!=document.body&&o.blur(),this.pointerDownFocus(e),this.dragX=this.x,this.viewport.classList.add("is-pointer-down"),this._bindPostStartEvents(e),this.pointerDownScroll=s(),t.addEventListener("scroll",this),this.dispatchEvent("pointerDown",e,[i])};var c={touchstart:!0,MSPointerDown:!0},d={INPUT:!0,SELECT:!0};return o.pointerDownFocus=function(e){if(this.options.accessibility&&!c[e.type]&&!d[e.target.nodeName]){var i=t.pageYOffset;this.element.focus(),t.pageYOffset!=i&&t.scrollTo(t.pageXOffset,i)}},o.canPreventDefaultOnPointerDown=function(t){var e="touchstart"==t.type,i=t.target.nodeName;return!e&&"SELECT"!=i},o.hasDragStarted=function(t){return Math.abs(t.x)>this.options.dragThreshold},o.pointerUp=function(t,e){delete this.isTouchScrolling,this.viewport.classList.remove("is-pointer-down"),this.dispatchEvent("pointerUp",t,[e]),this._dragPointerUp(t,e)},o.pointerDone=function(){t.removeEventListener("scroll",this),delete this.pointerDownScroll},o.dragStart=function(e,i){this.dragStartPosition=this.x,this.startAnimation(),t.removeEventListener("scroll",this),this.dispatchEvent("dragStart",e,[i])},o.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.dispatchEvent("pointerMove",t,[e,i]),this._dragMove(t,e,i)},o.dragMove=function(t,e,i){t.preventDefault(),this.previousDragX=this.dragX;var n=this.options.rightToLeft?-1:1,s=this.dragStartPosition+i.x*n;if(!this.options.wrapAround&&this.slides.length){var o=Math.max(-this.slides[0].target,this.dragStartPosition);s=s>o?.5*(s+o):s;var r=Math.min(-this.getLastSlide().target,this.dragStartPosition);s=s<r?.5*(s+r):s}this.dragX=s,this.dragMoveTime=new Date,this.dispatchEvent("dragMove",t,[e,i])},o.dragEnd=function(t,e){this.options.freeScroll&&(this.isFreeScrolling=!0);var i=this.dragEndRestingSelect();if(this.options.freeScroll&&!this.options.wrapAround){var n=this.getRestingPosition();this.isFreeScrolling=-n>this.slides[0].target&&-n<this.getLastSlide().target}else this.options.freeScroll||i!=this.selectedIndex||(i+=this.dragEndBoostSelect());delete this.previousDragX,this.isDragSelect=this.options.wrapAround,this.select(i),delete this.isDragSelect,this.dispatchEvent("dragEnd",t,[e])},o.dragEndRestingSelect=function(){
var t=this.getRestingPosition(),e=Math.abs(this.getSlideDistance(-t,this.selectedIndex)),i=this._getClosestResting(t,e,1),n=this._getClosestResting(t,e,-1),s=i.distance<n.distance?i.index:n.index;return s},o._getClosestResting=function(t,e,i){for(var n=this.selectedIndex,s=1/0,o=this.options.contain&&!this.options.wrapAround?function(t,e){return t<=e}:function(t,e){return t<e};o(e,s)&&(n+=i,s=e,e=this.getSlideDistance(-t,n),null!==e);)e=Math.abs(e);return{distance:s,index:n-i}},o.getSlideDistance=function(t,e){var i=this.slides.length,s=this.options.wrapAround&&i>1,o=s?n.modulo(e,i):e,r=this.slides[o];if(!r)return null;var a=s?this.slideableWidth*Math.floor(e/i):0;return t-(r.target+a)},o.dragEndBoostSelect=function(){if(void 0===this.previousDragX||!this.dragMoveTime||new Date-this.dragMoveTime>100)return 0;var t=this.getSlideDistance(-this.dragX,this.selectedIndex),e=this.previousDragX-this.dragX;return t>0&&e>0?1:t<0&&e<0?-1:0},o.staticClick=function(t,e){var i=this.getParentCell(t.target),n=i&&i.element,s=i&&this.cells.indexOf(i);this.dispatchEvent("staticClick",t,[e,n,s])},o.onscroll=function(){var t=s(),e=this.pointerDownScroll.x-t.x,i=this.pointerDownScroll.y-t.y;(Math.abs(e)>3||Math.abs(i)>3)&&this._pointerDone()},e}),function(t,e){"function"==typeof define&&define.amd?define("tap-listener/tap-listener",["unipointer/unipointer"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("unipointer")):t.TapListener=e(t,t.Unipointer)}(window,function(t,e){function i(t){this.bindTap(t)}var n=i.prototype=Object.create(e.prototype);return n.bindTap=function(t){t&&(this.unbindTap(),this.tapElement=t,this._bindStartEvent(t,!0))},n.unbindTap=function(){this.tapElement&&(this._bindStartEvent(this.tapElement,!0),delete this.tapElement)},n.pointerUp=function(i,n){if(!this.isIgnoringMouseUp||"mouseup"!=i.type){var s=e.getPointerPoint(n),o=this.tapElement.getBoundingClientRect(),r=t.pageXOffset,a=t.pageYOffset,l=s.x>=o.left+r&&s.x<=o.right+r&&s.y>=o.top+a&&s.y<=o.bottom+a;if(l&&this.emitEvent("tap",[i,n]),"mouseup"!=i.type){this.isIgnoringMouseUp=!0;var h=this;setTimeout(function(){delete h.isIgnoringMouseUp},400)}}},n.destroy=function(){this.pointerDone(),this.unbindTap()},i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/prev-next-button",["./flickity","tap-listener/tap-listener","fizzy-ui-utils/utils"],function(i,n,s){return e(t,i,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("tap-listener"),require("fizzy-ui-utils")):e(t,t.Flickity,t.TapListener,t.fizzyUIUtils)}(window,function(t,e,i,n){"use strict";function s(t,e){this.direction=t,this.parent=e,this._create()}function o(t){return"string"==typeof t?t:"M "+t.x0+",50 L "+t.x1+","+(t.y1+50)+" L "+t.x2+","+(t.y2+50)+" L "+t.x3+",50  L "+t.x2+","+(50-t.y2)+" L "+t.x1+","+(50-t.y1)+" Z"}var r="http://www.w3.org/2000/svg";s.prototype=new i,s.prototype._create=function(){this.isEnabled=!0,this.isPrevious=this.direction==-1;var t=this.parent.options.rightToLeft?1:-1;this.isLeft=this.direction==t;var e=this.element=document.createElement("button");e.className="flickity-prev-next-button",e.className+=this.isPrevious?" previous":" next",e.setAttribute("type","button"),this.disable(),e.setAttribute("aria-label",this.isPrevious?"previous":"next");var i=this.createSVG();e.appendChild(i),this.on("tap",this.onTap),this.parent.on("select",this.update.bind(this)),this.on("pointerDown",this.parent.childUIPointerDown.bind(this.parent))},s.prototype.activate=function(){this.bindTap(this.element),this.element.addEventListener("click",this),this.parent.element.appendChild(this.element)},s.prototype.deactivate=function(){this.parent.element.removeChild(this.element),i.prototype.destroy.call(this),this.element.removeEventListener("click",this)},s.prototype.createSVG=function(){var t=document.createElementNS(r,"svg");t.setAttribute("viewBox","0 0 100 100");var e=document.createElementNS(r,"path"),i=o(this.parent.options.arrowShape);return e.setAttribute("d",i),e.setAttribute("class","arrow"),this.isLeft||e.setAttribute("transform","translate(100, 100) rotate(180) "),t.appendChild(e),t},s.prototype.onTap=function(){if(this.isEnabled){this.parent.uiChange();var t=this.isPrevious?"previous":"next";this.parent[t]()}},s.prototype.handleEvent=n.handleEvent,s.prototype.onclick=function(){var t=document.activeElement;t&&t==this.element&&this.onTap()},s.prototype.enable=function(){this.isEnabled||(this.element.disabled=!1,this.isEnabled=!0)},s.prototype.disable=function(){this.isEnabled&&(this.element.disabled=!0,this.isEnabled=!1)},s.prototype.update=function(){var t=this.parent.slides;if(this.parent.options.wrapAround&&t.length>1)return void this.enable();var e=t.length?t.length-1:0,i=this.isPrevious?0:e,n=this.parent.selectedIndex==i?"disable":"enable";this[n]()},s.prototype.destroy=function(){this.deactivate()},n.extend(e.defaults,{prevNextButtons:!0,arrowShape:{x0:10,x1:60,y1:50,x2:70,y2:40,x3:30}}),e.createMethods.push("_createPrevNextButtons");var a=e.prototype;return a._createPrevNextButtons=function(){this.options.prevNextButtons&&(this.prevButton=new s((-1),this),this.nextButton=new s(1,this),this.on("activate",this.activatePrevNextButtons))},a.activatePrevNextButtons=function(){this.prevButton.activate(),this.nextButton.activate(),this.on("deactivate",this.deactivatePrevNextButtons)},a.deactivatePrevNextButtons=function(){this.prevButton.deactivate(),this.nextButton.deactivate(),this.off("deactivate",this.deactivatePrevNextButtons)},e.PrevNextButton=s,e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/page-dots",["./flickity","tap-listener/tap-listener","fizzy-ui-utils/utils"],function(i,n,s){return e(t,i,n,s)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("tap-listener"),require("fizzy-ui-utils")):e(t,t.Flickity,t.TapListener,t.fizzyUIUtils)}(window,function(t,e,i,n){function s(t){this.parent=t,this._create()}s.prototype=new i,s.prototype._create=function(){this.holder=document.createElement("ol"),this.holder.className="flickity-page-dots",this.dots=[],this.on("tap",this.onTap),this.on("pointerDown",this.parent.childUIPointerDown.bind(this.parent))},s.prototype.activate=function(){this.setDots(),this.bindTap(this.holder),this.parent.element.appendChild(this.holder)},s.prototype.deactivate=function(){this.parent.element.removeChild(this.holder),i.prototype.destroy.call(this)},s.prototype.setDots=function(){var t=this.parent.slides.length-this.dots.length;t>0?this.addDots(t):t<0&&this.removeDots(-t)},s.prototype.addDots=function(t){for(var e=document.createDocumentFragment(),i=[];t;){var n=document.createElement("li");n.className="dot",e.appendChild(n),i.push(n),t--}this.holder.appendChild(e),this.dots=this.dots.concat(i)},s.prototype.removeDots=function(t){var e=this.dots.splice(this.dots.length-t,t);e.forEach(function(t){this.holder.removeChild(t)},this)},s.prototype.updateSelected=function(){this.selectedDot&&(this.selectedDot.className="dot"),this.dots.length&&(this.selectedDot=this.dots[this.parent.selectedIndex],this.selectedDot.className="dot is-selected")},s.prototype.onTap=function(t){var e=t.target;if("LI"==e.nodeName){this.parent.uiChange();var i=this.dots.indexOf(e);this.parent.select(i)}},s.prototype.destroy=function(){this.deactivate()},e.PageDots=s,n.extend(e.defaults,{pageDots:!0}),e.createMethods.push("_createPageDots");var o=e.prototype;return o._createPageDots=function(){this.options.pageDots&&(this.pageDots=new s(this),this.on("activate",this.activatePageDots),this.on("select",this.updateSelectedPageDots),this.on("cellChange",this.updatePageDots),this.on("resize",this.updatePageDots),this.on("deactivate",this.deactivatePageDots))},o.activatePageDots=function(){this.pageDots.activate()},o.updateSelectedPageDots=function(){this.pageDots.updateSelected()},o.updatePageDots=function(){this.pageDots.setDots()},o.deactivatePageDots=function(){this.pageDots.deactivate()},e.PageDots=s,e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/player",["ev-emitter/ev-emitter","fizzy-ui-utils/utils","./flickity"],function(t,i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(require("ev-emitter"),require("fizzy-ui-utils"),require("./flickity")):e(t.EvEmitter,t.fizzyUIUtils,t.Flickity)}(window,function(t,e,i){function n(t){this.parent=t,this.state="stopped",o&&(this.onVisibilityChange=function(){this.visibilityChange()}.bind(this),this.onVisibilityPlay=function(){this.visibilityPlay()}.bind(this))}var s,o;"hidden"in document?(s="hidden",o="visibilitychange"):"webkitHidden"in document&&(s="webkitHidden",o="webkitvisibilitychange"),n.prototype=Object.create(t.prototype),n.prototype.play=function(){if("playing"!=this.state){var t=document[s];if(o&&t)return void document.addEventListener(o,this.onVisibilityPlay);this.state="playing",o&&document.addEventListener(o,this.onVisibilityChange),this.tick()}},n.prototype.tick=function(){if("playing"==this.state){var t=this.parent.options.autoPlay;t="number"==typeof t?t:3e3;var e=this;this.clear(),this.timeout=setTimeout(function(){e.parent.next(!0),e.tick()},t)}},n.prototype.stop=function(){this.state="stopped",this.clear(),o&&document.removeEventListener(o,this.onVisibilityChange)},n.prototype.clear=function(){clearTimeout(this.timeout)},n.prototype.pause=function(){"playing"==this.state&&(this.state="paused",this.clear())},n.prototype.unpause=function(){"paused"==this.state&&this.play()},n.prototype.visibilityChange=function(){var t=document[s];this[t?"pause":"unpause"]()},n.prototype.visibilityPlay=function(){this.play(),document.removeEventListener(o,this.onVisibilityPlay)},e.extend(i.defaults,{pauseAutoPlayOnHover:!0}),i.createMethods.push("_createPlayer");var r=i.prototype;return r._createPlayer=function(){this.player=new n(this),this.on("activate",this.activatePlayer),this.on("uiChange",this.stopPlayer),this.on("pointerDown",this.stopPlayer),this.on("deactivate",this.deactivatePlayer)},r.activatePlayer=function(){this.options.autoPlay&&(this.player.play(),this.element.addEventListener("mouseenter",this))},r.playPlayer=function(){this.player.play()},r.stopPlayer=function(){this.player.stop()},r.pausePlayer=function(){this.player.pause()},r.unpausePlayer=function(){this.player.unpause()},r.deactivatePlayer=function(){this.player.stop(),this.element.removeEventListener("mouseenter",this)},r.onmouseenter=function(){this.options.pauseAutoPlayOnHover&&(this.player.pause(),this.element.addEventListener("mouseleave",this))},r.onmouseleave=function(){this.player.unpause(),this.element.removeEventListener("mouseleave",this)},i.Player=n,i}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/add-remove-cell",["./flickity","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("fizzy-ui-utils")):e(t,t.Flickity,t.fizzyUIUtils)}(window,function(t,e,i){function n(t){var e=document.createDocumentFragment();return t.forEach(function(t){e.appendChild(t.element)}),e}var s=e.prototype;return s.insert=function(t,e){var i=this._makeCells(t);if(i&&i.length){var s=this.cells.length;e=void 0===e?s:e;var o=n(i),r=e==s;if(r)this.slider.appendChild(o);else{var a=this.cells[e].element;this.slider.insertBefore(o,a)}if(0===e)this.cells=i.concat(this.cells);else if(r)this.cells=this.cells.concat(i);else{var l=this.cells.splice(e,s-e);this.cells=this.cells.concat(i).concat(l)}this._sizeCells(i);var h=e>this.selectedIndex?0:i.length;this._cellAddedRemoved(e,h)}},s.append=function(t){this.insert(t,this.cells.length)},s.prepend=function(t){this.insert(t,0)},s.remove=function(t){var e,n,s=this.getCells(t),o=0,r=s.length;for(e=0;e<r;e++){n=s[e];var a=this.cells.indexOf(n)<this.selectedIndex;o-=a?1:0}for(e=0;e<r;e++)n=s[e],n.remove(),i.removeFrom(this.cells,n);s.length&&this._cellAddedRemoved(0,o)},s._cellAddedRemoved=function(t,e){e=e||0,this.selectedIndex+=e,this.selectedIndex=Math.max(0,Math.min(this.slides.length-1,this.selectedIndex)),this.cellChange(t,!0),this.emitEvent("cellAddedRemoved",[t,e])},s.cellSizeChange=function(t){var e=this.getCell(t);if(e){e.getSize();var i=this.cells.indexOf(e);this.cellChange(i)}},s.cellChange=function(t,e){var i=this.slideableWidth;if(this._positionCells(t),this._getWrapShiftCells(),this.setGallerySize(),this.emitEvent("cellChange",[t]),this.options.freeScroll){var n=i-this.slideableWidth;this.x+=n*this.cellAlign,this.positionSlider()}else e&&this.positionSliderAtSelected(),this.select(this.selectedIndex)},e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/lazyload",["./flickity","fizzy-ui-utils/utils"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("./flickity"),require("fizzy-ui-utils")):e(t,t.Flickity,t.fizzyUIUtils)}(window,function(t,e,i){"use strict";function n(t){if("IMG"==t.nodeName&&t.getAttribute("data-flickity-lazyload"))return[t];var e=t.querySelectorAll("img[data-flickity-lazyload]");return i.makeArray(e)}function s(t,e){this.img=t,this.flickity=e,this.load()}e.createMethods.push("_createLazyload");var o=e.prototype;return o._createLazyload=function(){this.on("select",this.lazyLoad)},o.lazyLoad=function(){var t=this.options.lazyLoad;if(t){var e="number"==typeof t?t:0,i=this.getAdjacentCellElements(e),o=[];i.forEach(function(t){var e=n(t);o=o.concat(e)}),o.forEach(function(t){new s(t,this)},this)}},s.prototype.handleEvent=i.handleEvent,s.prototype.load=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.img.getAttribute("data-flickity-lazyload"),this.img.removeAttribute("data-flickity-lazyload")},s.prototype.onload=function(t){this.complete(t,"flickity-lazyloaded")},s.prototype.onerror=function(t){this.complete(t,"flickity-lazyerror")},s.prototype.complete=function(t,e){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this);var i=this.flickity.getParentCell(this.img),n=i&&i.element;this.flickity.cellSizeChange(n),this.img.classList.add(e),this.flickity.dispatchEvent("lazyLoad",t,n)},e.LazyLoader=s,e}),function(t,e){"function"==typeof define&&define.amd?define("flickity/js/index",["./flickity","./drag","./prev-next-button","./page-dots","./player","./add-remove-cell","./lazyload"],e):"object"==typeof module&&module.exports&&(module.exports=e(require("./flickity"),require("./drag"),require("./prev-next-button"),require("./page-dots"),require("./player"),require("./add-remove-cell"),require("./lazyload")))}(window,function(t){return t}),function(t,e){"function"==typeof define&&define.amd?define("flickity-as-nav-for/as-nav-for",["flickity/js/index","fizzy-ui-utils/utils"],e):"object"==typeof module&&module.exports?module.exports=e(require("flickity"),require("fizzy-ui-utils")):t.Flickity=e(t.Flickity,t.fizzyUIUtils)}(window,function(t,e){function i(t,e,i){return(e-t)*i+t}t.createMethods.push("_createAsNavFor");var n=t.prototype;return n._createAsNavFor=function(){this.on("activate",this.activateAsNavFor),this.on("deactivate",this.deactivateAsNavFor),this.on("destroy",this.destroyAsNavFor);var t=this.options.asNavFor;if(t){var e=this;setTimeout(function(){e.setNavCompanion(t)})}},n.setNavCompanion=function(i){i=e.getQueryElement(i);var n=t.data(i);if(n&&n!=this){this.navCompanion=n;var s=this;this.onNavCompanionSelect=function(){s.navCompanionSelect()},n.on("select",this.onNavCompanionSelect),this.on("staticClick",this.onNavStaticClick),this.navCompanionSelect(!0)}},n.navCompanionSelect=function(t){if(this.navCompanion){var e=this.navCompanion.selectedCells[0],n=this.navCompanion.cells.indexOf(e),s=n+this.navCompanion.selectedCells.length-1,o=Math.floor(i(n,s,this.navCompanion.cellAlign));if(this.selectCell(o,!1,t),this.removeNavSelectedElements(),!(o>=this.cells.length)){var r=this.cells.slice(n,s+1);this.navSelectedElements=r.map(function(t){return t.element}),this.changeNavSelectedClass("add")}}},n.changeNavSelectedClass=function(t){this.navSelectedElements.forEach(function(e){e.classList[t]("is-nav-selected")})},n.activateAsNavFor=function(){this.navCompanionSelect(!0)},n.removeNavSelectedElements=function(){this.navSelectedElements&&(this.changeNavSelectedClass("remove"),delete this.navSelectedElements)},n.onNavStaticClick=function(t,e,i,n){"number"==typeof n&&this.navCompanion.selectCell(n)},n.deactivateAsNavFor=function(){this.removeNavSelectedElements()},n.destroyAsNavFor=function(){this.navCompanion&&(this.navCompanion.off("select",this.onNavCompanionSelect),this.off("staticClick",this.onNavStaticClick),delete this.navCompanion)},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define("imagesloaded/imagesloaded",["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}(window,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function s(t,e,o){return this instanceof s?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=n(t),this.options=i({},this.options),"function"==typeof e?o=e:i(this.options,e),o&&this.on("always",o),this.getImages(),a&&(this.jqDeferred=new a.Deferred),void setTimeout(function(){this.check()}.bind(this))):new s(t,e,o)}function o(t){this.img=t}function r(t,e){this.url=t,this.element=e,this.img=new Image}var a=t.jQuery,l=t.console;s.prototype=Object.create(e.prototype),s.prototype.options={},s.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},s.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&h[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var s=i[n];this.addImage(s)}if("string"==typeof this.options.background){var o=t.querySelectorAll(this.options.background);for(n=0;n<o.length;n++){var r=o[n];this.addElementBackgroundImages(r)}}}};var h={1:!0,9:!0,11:!0};return s.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var s=n&&n[2];s&&this.addBackground(s,t),n=i.exec(e.backgroundImage)}},s.prototype.addImage=function(t){var e=new o(t);this.images.push(e)},s.prototype.addBackground=function(t,e){var i=new r(t,e);this.images.push(i)},s.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},s.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&l&&l.log("progress: "+i,t,e)},s.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},o.prototype=Object.create(e.prototype),o.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},o.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},o.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},o.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},o.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},o.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},o.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},r.prototype=Object.create(o.prototype),r.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},r.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},s.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(a=e,a.fn.imagesLoaded=function(t,e){var i=new s(this,t,e);return i.jqDeferred.promise(a(this))})},s.makeJQueryPlugin(),s}),function(t,e){"function"==typeof define&&define.amd?define(["flickity/js/index","imagesloaded/imagesloaded"],function(i,n){return e(t,i,n)}):"object"==typeof module&&module.exports?module.exports=e(t,require("flickity"),require("imagesloaded")):t.Flickity=e(t,t.Flickity,t.imagesLoaded)}(window,function(t,e,i){"use strict";e.createMethods.push("_createImagesLoaded");var n=e.prototype;return n._createImagesLoaded=function(){this.on("activate",this.imagesLoaded)},n.imagesLoaded=function(){function t(t,i){var n=e.getParentCell(i.img);e.cellSizeChange(n&&n.element),e.options.freeScroll||e.positionSliderAtSelected()}if(this.options.imagesLoaded){var e=this;i(this.slider).on("progress",t)}},e});

/*!
 * jQuery pagination plugin v1.4
 * http://esimakin.github.io/twbs-pagination/
 *
 * Copyright 2014-2015, Eugene Simakin
 * Released under Apache 2.0 license
 * http://apache.org/licenses/LICENSE-2.0.html
 */
(function ($, window, document, undefined) {

    'use strict';

    var old = $.fn.twbsPagination;

    // PROTOTYPE AND CONSTRUCTOR

    var TwbsPagination = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.twbsPagination.defaults, options);

        if (this.options.startPage < 1 || this.options.startPage > this.options.totalPages) {
            throw new Error('Start page option is incorrect');
        }

        this.options.totalPages = parseInt(this.options.totalPages);
        if (isNaN(this.options.totalPages)) {
            throw new Error('Total pages option is not correct!');
        }

        this.options.visiblePages = parseInt(this.options.visiblePages);
        if (isNaN(this.options.visiblePages)) {
            throw new Error('Visible pages option is not correct!');
        }

        if (this.options.totalPages < this.options.visiblePages) {
            this.options.visiblePages = this.options.totalPages;
        }

        if (this.options.onPageClick instanceof Function) {
            this.$element.first().on('page', this.options.onPageClick);
        }

        if (this.options.href) {
            var match, regexp = this.options.href.replace(/[-\/\\^$*+?.|[\]]/g, '\\$&');
            regexp = regexp.replace(this.options.pageVariable, '(\\d+)');
            if ((match = new RegExp(regexp, 'i').exec(window.location.href)) != null) {
                this.options.startPage = parseInt(match[1], 10);
            }
        }

        var tagName = (typeof this.$element.prop === 'function') ?
            this.$element.prop('tagName') : this.$element.attr('tagName');

        if (tagName === 'UL') {
            this.$listContainer = this.$element;
        } else {
            this.$listContainer = $('<ul></ul>');
        }

        this.$listContainer.addClass(this.options.paginationClass);

        if (tagName !== 'UL') {
            this.$element.append(this.$listContainer);
        }

        if (this.options.initiateStartPageClick) {
            this.show(this.options.startPage);
        } else {
            this.render(this.getPages(this.options.startPage));
            this.setupEvents();
        }

        return this;
    };

    TwbsPagination.prototype = {

        constructor: TwbsPagination,

        destroy: function () {
            this.$element.empty();
            this.$element.removeData('twbs-pagination');
            this.$element.off('page');

            return this;
        },

        show: function (page) {
            if (page < 1 || page > this.options.totalPages) {
                throw new Error('Page is incorrect.');
            }

            this.render(this.getPages(page));
            this.setupEvents();

            this.$element.trigger('page', page);

            return this;
        },

        buildListItems: function (pages) {
            var listItems = [];

            // Add "first" page button
            if (this.options.first) {
                listItems.push(this.buildItem('first', 1));
            }
            // Add "previous" page button
            if (this.options.prev) {
                var prev = pages.currentPage > 1 ? pages.currentPage - 1 : this.options.loop ? this.options.totalPages  : 1;
                listItems.push(this.buildItem('prev', prev));
            }
            // Add "pages"
            for (var i = 0; i < pages.numeric.length; i++) {
                listItems.push(this.buildItem('page', pages.numeric[i]));
            }
            // Add "next" page button
            if (this.options.next) {
                var next = pages.currentPage < this.options.totalPages ? pages.currentPage + 1 : this.options.loop ? 1 : this.options.totalPages;
                listItems.push(this.buildItem('next', next));
            }
            // Add "last" page button
            if (this.options.last) {
                listItems.push(this.buildItem('last', this.options.totalPages));
            }

            return listItems;
        },

        buildItem: function (type, page) {
            var $itemContainer = $('<li></li>'),
                $itemContent = $('<a></a>'),
                itemText = null;

            itemText = this.options[type] ? this.makeText(this.options[type], page) : page;
            $itemContainer.addClass(this.options[type + 'Class']);
            $itemContainer.data('page', page);
            $itemContainer.data('page-type', type);
            $itemContainer.append($itemContent.attr('href', this.makeHref(page)).html(itemText));

            return $itemContainer;
        },

        getPages: function (currentPage) {
            var pages = [];

            var half = Math.floor(this.options.visiblePages / 2);
            var start = currentPage - half + 1 - this.options.visiblePages % 2;
            var end = currentPage + half;

            // handle boundary case
            if (start <= 0) {
                start = 1;
                end = this.options.visiblePages;
            }
            if (end > this.options.totalPages) {
                start = this.options.totalPages - this.options.visiblePages + 1;
                end = this.options.totalPages;
            }

            var itPage = start;
            while (itPage <= end) {
                pages.push(itPage);
                itPage++;
            }

            return {"currentPage": currentPage, "numeric": pages};
        },

        render: function (pages) {
            var _this = this;
            this.$listContainer.children().remove();
            var items = this.buildListItems(pages);
            jQuery.each(items, function(key, item){
                _this.$listContainer.append(item);
            });

            this.$listContainer.children().each(function () {
                var $this = $(this),
                    pageType = $this.data('page-type');

                switch (pageType) {
                    case 'page':
                        if ($this.data('page') === pages.currentPage) {
                            $this.addClass(_this.options.activeClass);
                        }
                        break;
                    case 'first':
                            $this.toggleClass(_this.options.disabledClass, pages.currentPage === 1);
                        break;
                    case 'last':
                            $this.toggleClass(_this.options.disabledClass, pages.currentPage === _this.options.totalPages);
                        break;
                    case 'prev':
                            $this.toggleClass(_this.options.disabledClass, !_this.options.loop && pages.currentPage === 1);
                        break;
                    case 'next':
                            $this.toggleClass(_this.options.disabledClass,
                                !_this.options.loop && pages.currentPage === _this.options.totalPages);
                        break;
                    default:
                        break;
                }

            });
        },

        setupEvents: function () {
            var _this = this;
            this.$listContainer.find('li').each(function () {
                var $this = $(this);
                $this.off();
                if ($this.hasClass(_this.options.disabledClass) || $this.hasClass(_this.options.activeClass)) {
                    $this.on('click', false);
                    return;
                }
                $this.click(function (evt) {
                    // Prevent click event if href is not set.
                    !_this.options.href && evt.preventDefault();
                    _this.show(parseInt($this.data('page')));
                });
            });
        },

        makeHref: function (page) {
            return this.options.href ? this.makeText(this.options.href, page) : "#";
        },

        makeText: function (text, page) {
            return text.replace(this.options.pageVariable, page)
                .replace(this.options.totalPagesVariable, this.options.totalPages)
        }

    };

    // PLUGIN DEFINITION

    $.fn.twbsPagination = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        var methodReturn;

        var $this = $(this);
        var data = $this.data('twbs-pagination');
        var options = typeof option === 'object' ? option : {};

        if (!data) $this.data('twbs-pagination', (data = new TwbsPagination(this, options) ));
        if (typeof option === 'string') methodReturn = data[ option ].apply(data, args);

        return ( methodReturn === undefined ) ? $this : methodReturn;
    };

    $.fn.twbsPagination.defaults = {
        totalPages: 1,
        startPage: 1,
        visiblePages: 5,
        initiateStartPageClick: true,
        href: false,
        pageVariable: '{{page}}',
        totalPagesVariable: '{{total_pages}}',
        page: null,
        first: 'First',
        prev: 'Previous',
        next: 'Next',
        last: 'Last',
        loop: false,
        onPageClick: null,
        paginationClass: 'pagination',
        nextClass: 'next',
        prevClass: 'prev',
        lastClass: 'last',
        firstClass: 'first',
        pageClass: 'page',
        activeClass: 'active',
        disabledClass: 'disabled'
    };

    $.fn.twbsPagination.Constructor = TwbsPagination;

    $.fn.twbsPagination.noConflict = function () {
        $.fn.twbsPagination = old;
        return this;
    };

})(window.jQuery, window, document);

"use strict";
var PF = PF || {};
if( typeof PF.LISTING === 'undefined' ) {
    (function (z, $) {
        var l = {
            init : function() {
                $('.clip-main-cat-wrpr li a').click(function(){
          $('.clip-main-cat-wrpr li').removeClass('active')
          $(this).parent().addClass('active');
        });

                var sliderParentWidth  = $('.clip-main-cat-wrpr').outerWidth();
                var sliderChildWidth = 0;

        $('.clip-main-cat-wrpr li').each(function() {
         sliderChildWidth += $(this).outerWidth();
        });

        if(sliderParentWidth < sliderChildWidth){
                    $('.clip-main-cat-wrpr').addClass('clip-cat-slider');
                    $('.clip-main-cat-wrpr').removeClass('clip-main-wrap-cat');
                    // var sliderHeight = $('.clip-main-cat-wrpr').children().height() + 5;
                    // $('.clip-main-cat-wrpr').children().css({height: sliderHeight});

                    var maxheight=0;
                    $(".clip-main-cat-wrpr").children().each(function () {
                        maxheight = ($(this).height() > maxheight ? $(this).height() : maxheight);
                    });
                    $('.clip-main-cat-wrpr').children().css({height: maxheight});



        }
                else{
            $('.clip-main-cat-wrpr').addClass('clip-main-wrap-cat');
                        $('.clip-main-cat-wrpr').removeClass('clip-cat-slider');
        }

        $('.clip-cat-slider').flickity({
                    pageDots: false,
                    cellAlign: 'left',
                    accessibility: false,
                    contain: true,
                    groupCells: 3
                });

                $('.clip-subcat-container li a').click(function(){
                      $('.clip-subcat-container li').removeClass('active')
                      $(this).parent().addClass('active');
        });

                $('.clip-sbcatmore-sctn').hide();

                $('#clipSubcatbtn').on('click', function (e) {
                        $('.clip-subcat-moreicn').toggleClass('clip-subcat-moreicn-clicked');
                        $('.clip-sbcatmore-sctn').fadeToggle(500);
                        $('.clip-pricehtol-fltr').hide();
                        $('.clip-custom-drpdwn').hide();
                        e.stopPropagation();
                });

                $('.clip-sbcatmore-sctn').on('click', function(e) {
                        e.stopPropagation();
                });

                $(document).bind('click', function (e) {
            $('.clip-sbcatmore-sctn').hide();
            $('.clip-subcat-moreicn').removeClass('clip-subcat-moreicn-clicked');
        });

                $('.sticky-ndhlp-btn').on('click', function(e) {
                    $('.clip-needhelp-container').addClass('clip-needhelp-containerShow');
                    $('.clip-sticky-needhlp').removeClass('block-display');
                    e.stopPropagation();
                });
				
				$('.clip-need-hlp-btn').on('click', function(e) {
                  $('.clip-needhelp-container').addClass('clip-needhelp-containerShow');
                  $('.clip-sticky-needhlp').removeClass('block-display');
                  $('.clip-need-hlp-btn').hide().addClass("active");
                  e.stopPropagation();
                });
				
                $('.clip-needhlp-clsbtn').on('click', function() {
                    if($('.clip-need-hlp-btn').hasClass("active")) {
                      $('.clip-needhelp-container').removeClass('clip-needhelp-containerShow');
                      $('.clip-need-hlp-btn').show().removeClass("active");
                    } else {
                      $('.clip-needhelp-container').removeClass('clip-needhelp-containerShow');
                      $('.clip-sticky-needhlp').addClass('block-display');
                    }
                });

                $(document).on('click', function(e) {
                    $('.clip-needhelp-container').removeClass('clip-needhelp-containerShow');
//                    $('.clip-sticky-needhlp').addClass('block-display');
                    $('.clip-need-hlp-btn').show();
                });

                $(document).on('keydown', function(e) {
                    if ( e.keyCode === 27 ){
                            $('.clip-needhelp-container').removeClass('clip-needhelp-containerShow');
							$('.clip-sticky-needhlp').addClass('block-display');
                            $('.clip-need-hlp-btn').show();
                    }
                });

                $('.clip-needhelp-container').on('click', function(e) {
                    e.stopPropagation();
                });

                $('#clipBrndSrch .brnd-btn-done').on('click', function(){
                    $('#clipBrndSrch input[type="checkbox"]').removeClass('doneOnce');
                    $('#clipBrndSrch input[type="checkbox"]').each(function(){
                            if($(this).is(':checked')){
                                $(this).addClass('doneOnce');
                            }
                    });
                });

                $('#clipBrndSrch .popup-close, .popup_overlay').on('click', function(){
                    $('#clipBrndSrch input[type="checkbox"]').attr("checked",false);
                    $('#clipBrndSrch .doneOnce').each(function(){
                        $(this).prop('checked', true);
                    });
                });


                $('.cstmDrpdwn').click(function(){
                    l.drpDwnAttr = $(this).attr('data-attr');
                    l.currentOpendDrpdwn = $('#' + l.drpDwnAttr);
                    l.drpDwnInputs = $(l.currentOpendDrpdwn).find('input[type="checkbox"]');

                    /*DropDown manage Block start here*/
                    l.customDropdown();

                    $('#'+l.drpDwnAttr+' .brnd-btn-done').on('click', function() {
                      l.applyBtn();
                    });

                    $('#'+l.drpDwnAttr+' .drpdwn-closebtn').on('click', function() {
                      l.cancelBtn();
                    });

                    $(l.currentOpendDrpdwn).on('click', function(e) {
                        e.stopPropagation();
                    });

					$('.clip-custom-drpdwn .clip-drpdwn-cntnt').on('scroll', function () {
				       $('body').css('overflow-y' , 'hidden');
				    });

                });


                /*dimension dropdown*/
                $('.switch-on-off input').on('click', function() {
                        if ($(this).is(':checked')) {
                                $(this).parent().parent()
                      $('.clip-dmsn-grtrthn').addClass('active');
                      $('.clip-dmsn-lsthn').removeClass('active');
                    } else {
                        $('.clip-dmsn-lsthn').addClass('active');
                        $('.clip-dmsn-grtrthn').removeClass('active');
                    }

                  });

                $('.clip-lessgrtr-lbl').on('click', function() {
        $('.clip-lessgrtr-lbl').removeClass('active');
          $(this).addClass('active');
          if($('.clip-dmsn-lsthn').hasClass('active')) {
            $(this).siblings('.clip-dmnsn-onoffbtn').children().children('input').prop('checked' , false);
          } else {
            $(this).siblings('.clip-dmnsn-onoffbtn').children().children('input').prop('checked' , true);
          }
      });

                $('.clip-dmsn-cntnt input').keyup(function() {
                    var dimensionSize = $(this);
                    if(isNaN(dimensionSize.val())){
                        dimensionSize.val(dimensionSize.val().match(/[0-9]*/));
                    }
                });

                // $('.drpdwn-price-htol').on('click', function(e) {
                //         $('.clip-pricehtol-fltr').slideToggle();
                //         $('.clip-sbcatmore-sctn').hide();
                //         $('.clip-custom-drpdwn').hide();
                //         e.stopPropagation();
                // });


                $('.drpdwn-price-htol').on('click', function(e) {
                        $('.clip-pricehtol-fltr').slideToggle();
                        $('.clip-sbcatmore-sctn').hide();
                        $('.clip-custom-drpdwn').hide();
                        e.stopPropagation();
                });

                $('.clip-pricehtol-fltr li').click(function(){
                      $('.clip-pricehtol-fltr li').removeClass('selected')
                      $(this).addClass('selected');
                      $('.clip-pricehtol-fltr').hide();
        });

                $('.clip-pricehtol-fltr').on('click', function(e){
                    //e.stopPropagation();
                });
                $(document).bind('click', function (e)
                {
            $('.clip-pricehtol-fltr').hide();
        });

                $('.clip-lstview-btn').on('click', function(event) {
                    $('.clip-grid-view').fadeOut(500);
                    $('.clip-list-view').fadeIn(500);
                    $(this).addClass('active');
                    $('.clip-grdview-btn').removeClass('active');
                });

                $('.clip-grdview-btn').on('click', function(event) {
                    $('.clip-grid-view').fadeIn(500);
                    $('.clip-list-view').fadeOut(500);
                    $(this).addClass('active');
                    $('.clip-lstview-btn').removeClass('active');
                });

                if($('.clip-sticky-header').length == 1) {
                  $(".clip-sticky-header").before('<div class="clip-sticky-header-height"></div>');
                  $(".clip-sticky-header-height").css("height", $(".clip-sticky-header").height());

                }

                var stickyTopPos= $('.filter-content-block').offset().top;
                $(window).scroll({
                  previousTop: 0
                }, function () {
                  var currentTop = $(window).scrollTop();
                  var stickyHeight = $('.clip-sticky-header').outerHeight();
                  if ((currentTop > this.previousTop) && (currentTop > stickyTopPos)) {
                    if($(".clip-subctgry-container").outerHeight() == null) {
                      var stickyWrapHeight = $(".clip-ctgry-container").outerHeight();
                    } else {
                      var stickyWrapHeight = $(".clip-ctgry-container").outerHeight() + $(".clip-subctgry-container").outerHeight();
                    }

                    $('.clip-sticky-header').addClass('sticky-container').css("top", "-" + stickyWrapHeight + "px");
                    $('.clip-sticky-header-height').show();
                    $('.clip-sticky-needhlp').addClass('block-display');
                  } else if (currentTop > this.previousTop) {
                    $('.clip-sticky-header').removeClass('sticky-container anim');
                    $('.clip-sticky-needhlp').removeClass('block-display');
                    $('.clip-sticky-header-height').hide();
                  } else if (currentTop < stickyTopPos) {
                    setTimeout(function(){
                      $('.clip-sticky-header').removeClass('sticky-container anim');
                      $('.clip-sticky-header-height').hide();
					  $('.clip-sticky-needhlp').removeClass('block-display');
                    }, 10);
                  } else {
                    $('.clip-sticky-header').addClass('sticky-container anim').css("top", "0px");
                  }
                  this.previousTop = currentTop;
                });



                    $('.clip-tab-cntnt .pf-tablinks').on('click',function(){
                        var dataAttr = $(this).attr('data-attr')
                        $('.clip-tab-cntnt .pf-tablinks').removeClass('active');
                        $(this).addClass('active');
                        $('.pf-tabcont').removeClass('active');
                        $('.clip-tab-cntnt').find('#' + dataAttr).addClass('active');
                    });
                    /* code for CLIP Bottom slider */
                    if($('.clip-btmslider-parent').length > 0){
                    	$('.clip-btmslider-parent').slick({
                            infinite: false,
                            speed: 300,
                            slidesToShow: 2,
                            variableWidth: true
                        });
                    }

            /* this code is for feedback widget */
            $('#fdbck-wdgt-nobtn').on('click ', function() {
              $('.fdbck-wdgt-form').fadeIn();
              $('#fdbckWidgtBtn').removeClass('pf-disabled');
            });

           $('#fdbck-wdgt-yesbtn').on('click', function(event) {
                    $('.fdbck-wdgt-form').fadeOut();
                    $('#fdbckWidgtBtn').removeClass('pf-disabled');
            });

            },
            customDropdown: function() {
                $(l.currentOpendDrpdwn).slideToggle('fast');
        $(document).bind('click', function (e) {
                    var myopenedDrpdwn = $(e.target);
                    if (!myopenedDrpdwn.parents().hasClass('custmDrpdwnContainer')) {
                        $(l.currentOpendDrpdwn).hide();
                    }

                    l.resetAllcheckbox();
                });

        $(document).on('keydown', function(e) {
                    if ( e.keyCode === 27 ){
                        var openedDrpdwnCstm = $(e.target);
                        if (!openedDrpdwnCstm.parents().hasClass('custmDrpdwnContainer')) {
                            $(l.currentOpendDrpdwn).hide();
                        }

                        l.resetAllcheckbox();
                    }
        });

                $('.filter-content-block .clip-custom-drpdwn').each(function() {
                  $(this).hide();
                });
        l.currentOpendDrpdwn.show();
            },
            applyBtn :function(e) {
                $('#'+l.drpDwnAttr+' input[type="checkbox"]').removeClass('doneOnce');
            $('#'+l.drpDwnAttr+' input[type="checkbox"]').each(function(){
                if($(e).is(':checked')){
                            $(e).addClass('doneOnce');
                }
            });
          $(l.currentOpendDrpdwn).hide();
              //if($("#"+l.drpDwnAttr +" input[type=checkbox]:checked").length>0){
                PF.CLIP.applyFilter();
              //}

            },
            resetAllcheckbox :function(e) {
                $('#'+l.drpDwnAttr+" input[type='checkbox']:not('.doneOnce')").attr("checked",false);
                 $('#'+l.drpDwnAttr+' .doneOnce').each(function(){
                  $(this).prop('checked', true);
                });
                $('body').css('overflow-y' , 'auto');
            },




            cancelBtn:function (e) {
                l.resetAllcheckbox(e);
                $(l.currentOpendDrpdwn).hide();
            }

        };
        z.LISTING = l;
    }( PF, $));
}

$(document).ready(function() {
    PF.LISTING.init();

    /* this code is for bottom email Subscribe block */
    $(function() {
        $('.clip-eml-scrb-box input').on('blur', function() {
            $(this).parent().removeClass('clip-focus-border');
        }).on('focus', function() {
                $(this).parent().addClass('clip-focus-border');
        });
    });

        /*Brands collection related code : starts here*/
        if(typeof $('.brnd-clctn-slideblck').slick !== 'undefined'){
            $('.brnd-clctn-slideblck').slick('unslick');
        }
        if ($('.brnd-clctn-imgwrpr').length == 3){
             var $html = $('.brnd-clctn-slideblck .brnd-clctn-imgwrpr').clone();
             $('.brnd-clctn-slideblck').append($html);
        }
        var collectionSlider = $('.brnd-clctn-slideblck').slick({
               speed: 300,
               infinite: true,
               slidesToShow: 3,
               slidesToScroll: 1,
               centerMode: true,
               //centerPadding: '37%',
               autoplay: true,
               autoplaySpeed: 2000,
               focusOnSelect: true
        });


        function curentSliderId() {
            var collectnCntntShow  = $('.slick-center').attr('data-slide');
            $('.brndclctn-sldecnt-sctn .brnd-clctn-cnt').hide();
            $('.brndclctn-sldecnt-sctn #' + collectnCntntShow ).show();
        }

        collectionSlider.on('init beforeChange afterChange', function(event, slick, currentSlide, nextSlide) {
            curentSliderId();
        });

        if($('.category-select').length>0){
            $('.category-select').select2();
        }
        /*Brands collection related code : ends here*/
});


// $(window).resize(function(event) {

//  var listItems = $('.clip-subctgry-lists .clip-subcat-list').length;
//  var lastItem = $('.clip-subctgry-lists').children().last()
//  var scndLstItems = lastItem -1;

//  // console.log($(lastItem).html())

//  if ($(window).width() > 1155){
//          console.log('above 1156')
//  } else if ($(window).width() < 1155 && $(window).width()> 1024){
//        $(lastItem).remove();
//  } else if ($(window).width() < 1024 && $(window).width()> 768){
//       scndLstItems.remove();
//      console.log('above 768')
//  }
// });


/* Search page start here */


$(function() {
    $('.srch-rslt-maincat-wrpr li a').click(function(){
         $('.srch-rslt-maincat-wrpr li').removeClass('active')
         $(this).parent().addClass('active');
    });

    /* more button start here */
    $('#srchrslt-more-btn').on('click', function() {
        $('.srchrslt-more-box').fadeToggle();
        $('#srchrslt-more-btn .more-icn').toggleClass('clip-subcat-moreicn-clicked');
    });

    $('.srchrslt-more-box, #srchrslt-more-btn').on('click', function(e) {
    e.stopPropagation();
  });

    $(document).bind('click', function (e) {
        $('.srchrslt-more-box').hide();
        $('#srchrslt-more-btn .more-icn').removeClass('clip-subcat-moreicn-clicked');
    });

});

var PF = PF || {};
// force utilities library
if ( typeof PF.UTILITIES === 'undefined' ) {
	(function() {
                window.root_url     = ( typeof root_url   === 'undefined' ) ? 'http://'  + window.location.hostname : root_url;
		window.secure_url   = ( typeof secure_url === 'undefined' ) ? 'https://' + window.location.hostname : secure_url;
		var _node   = document.createElement( 'script' );
		_node.type  = 'text/javascript';
		_node.src   = ( ( window.location.protocol === 'http:' ) ? root_url : secure_url ) + '/js/utilities.js';
		document.getElementsByTagName( 'head' )[ 0 ].appendChild( _node );
	})();
}

if( typeof PF.CLIP === 'undefined' ) {
    (function (z, $) {
        var utils = z.UTILITIES;
        var o = {
            d : $(document),
            w : $(window),
           
            listenOnPageLoad : {
                click : {
                    //Redesign JS function binding starts here
                    '#searchBrandSrchBox':['PF.CLIP.brandFilterSearch','#page'],
                    '#catAlphates a':['PF.CLIP.filterBrandByLetter','#page'],
                    '.clip-pricehtol-fltr li':['PF.CLIP.orderBy','#page'],
                    '.fltr-rmvbtn':['PF.CLIP.clearFilterTabs','#page'],
                    '.brnd-btn-done':['PF.CLIP.applyBrandFilter','#page'],
                    '.clearAllFilters':['PF.CLIP.clearAllFilters','#page'],
                    'div.clip-lstgrid-btn a' : ['PF.CLIP.viewTypeClick','#page'],
                    '#subscriptionSection .sbscrb-mail-btn' : ['PF.CLIP.emailSubscription','#page'],
                    '.clip-btmcnt-btn' : ['PF.CLIP.toggleRead','#page'],
//                    'div.clip-tabscn-cntnt li a.pf-tablinks' : ['PF.CLIP.suggestionTabhtml','#page'],
                    '#fdbckWidgtBtn' : ['PF.CLIP.feedbackSubmit','#page'],
                    'a#feedbackpopup' : ['PF.CLIP.feedbackResetForm','#page'],
                    '.closeModel' : ['PF.CLIP.closeModel','#page'],
                    '.clip-email-scrb a.oostriger' : ['PF.CLIP.oosSubscrition','#page'],
                    '#load_more_button' : ['PF.CLIP.loadMoreItem','#page'],
                    
                },  
                 mouseover : {
                    'a.clip-heart-icn,a.wishlst-icn,li.last .finishtool' : ['PF.CLIP.toolTipInitialization','#page'],
                    'a.tnb-product-badge' : ['PF.CLIP.toolTipInitialization','#page'],
                 },
                keyup:{
                    '.clip-brnd-srchbx':['PF.CLIP.brandFilterSearch','#page'],
                },
                keydown : {
                    '#dimensionFltr input[data-key="height"],input[data-key="width"],input[data-key="depth"]' : ['PF.CLIP.dimensionKeyDown','#page'],
                    
                }
            },            
            init : function() {
//                 o.filterContainerSel = '.page-wrapper';
                utils.listen(o.listenOnPageLoad);
                //global variable need to define in phtm files
                o.nextPageUrl  = root_url + "/site_product/getInfiniteDataNew";
                o.suggestionTabUrl  = root_url + "/site_product/getSuggestionHtml";
                o.is_search=( typeof is_search   === 'undefined' ) ?false:is_search;
                o.is_collection=( typeof is_collection   === 'undefined' ) ?false:is_collection;
                o.collectionName=( typeof collectionName   === 'undefined' ) ?'':collectionName;
                o.is_brand_page=( typeof is_brand_page   === 'undefined' ) ?false:is_brand_page;
                o.layoutViewType=( typeof layoutViewType   === 'undefined' )?'compact':layoutViewType;
                o.template_type=( typeof template_type   === 'undefined' ) ?false:template_type;
                o.pageLayout=( typeof pageLayout   === 'undefined' ) ?'':pageLayout;
                o.brandsname =( typeof brandsname   === 'undefined' ) ?'':brandsname;
                o.cat=( typeof currentCatId   === 'undefined' ) ?'':currentCatId ;
                o.totalItem=( typeof totalProductCount   === 'undefined' ) ?'':totalProductCount;
                o.totalPages=( typeof totalPage   === 'undefined' ) ?'':totalPage;
                o. _pageData = [];
                o.loaded=true;
                o.iScrollPos=0;
                o.sortApplied=false;
                o.suggetionAjaxCall=false;
                var checkForFilter=getParameterByName('forder');
                o.filter_applied=(checkForFilter=='')?false:true;
                o.curPage=1;
                o.suggestestionFlag = ( typeof suggestestionFlag   === 'undefined' ) ?'':suggestestionFlag;;
                o.searchQs =( typeof searchQs   === 'undefined' ) ?'':searchQs;
                o.initRestOf();
                o.nextPageLoadInProgress = false;
                utils.addListener(o.w,'scroll','PF.CLIP.persistentScroll');
                //for all pages
                if(typeof suggestestionArr !== 'undefined'){
                 o.suggestionTabhtml();
                }
                //for wishlist 
                PF.HEADER.getwishlistcount()
            },
            toolTipInitialization:function(){
                $('[data-tooltip]').hover(function () {
                global_function.tooltip($(this), '#page');
                }, function () {
                $('.pf-tooltip').remove();
                });
            },
            dimensionKeyDown:function(event){
                //console.log(event.which);
//                if(event.which != 8 && event.which != 190 && isNaN(String.fromCharCode(event.which))){
//                    event.preventDefault(); //stop character from entering input
//               }
       if((event.keyCode>=48 && event.keyCode<=57) || event.keyCode==8 || event.keyCode==190 || event.keyCode==9){
//            var enteredValue = String.fromCharCode(event.keyCode)
                var enteredValue = $(this).val();
                var regexPattern = /^\d{0,8}(\.\d{0,2})?$/; 
                if(event.keyCode!= 8 && enteredValue!='' && !regexPattern.test(enteredValue)) {
                     event.preventDefault();
                 }
            }else{
              event.preventDefault();
                
            }
         
            },
            
            //Redesign new JS functions starts here
            brandFilterSearch:function(e){
                var srchBoxTxt = $('.clip-brnd-srchbx').val().trim().toLowerCase();
                //searchBrandSrchBox
                var selectedId=$(this).attr("id");
                if(srchBoxTxt.length>0)
                    {
                        e = e || window.event;            
                        var visibleCnt = false;
                        $('.clip-brnd-card').each(function (){ 
                            var srchVal = $(this).find('ul>li.brnd-main-ttl > a').text().toLowerCase();
                            if(srchVal.substr(0,srchBoxTxt.length) ==srchBoxTxt)
                            { 
                                visibleCnt= true;
                                $(this).show();
                            }
                            else
                            {
                                $(this).hide();
                            }
                        });
                        
                        if(visibleCnt==false && srchBoxTxt.length!=0){
                            $('#noBrandsFound').css("display","block");
                            $('#brandApply').addClass("disabled");
                            
                        }
                        else
                        {
                            $('#noBrandsFound').css("display","none");
                            $('#brandApply').removeClass("disabled");
                        }
                    }
                    else{
                        $('.clip-brnd-card').each(function (){ $(this).css("display","block"); });
                        $('#brandApply').removeClass("disabled");
                        $('#noBrandsFound').css("display","none");
                    }
            },
            suggestionTabhtml : function(){
                if(!o.suggetionAjaxCall){
                  $.ajax({
                url:o.suggestionTabUrl,
                type:"POST",
                data:{data:suggestestionArr,pageLayout:o.pageLayout},
                ///dataType:"json",
                beforeSend:function(){
                    //$('#loaderOverlay').show();
                },
                success:function(data){
                    $("#suggestionDiv").html(data).addClass("active");
                   utils.lazyloadInit();
                   //for initializiting tab
                   $('.clip-tab-cntnt .pf-tablinks').on('click',function(){
                        var dataAttr = $(this).attr('data-attr')
                        $('.clip-tab-cntnt .pf-tablinks').removeClass('active');
                        $(this).addClass('active');
                        $('.pf-tabcont').removeClass('active');
                        $('.clip-tab-cntnt').find('#' + dataAttr).addClass('active');
                    });
                },
                complete:function(){
                    o.suggetionAjaxCall=true;
                  //$('#loaderOverlay').hide();
                 
                }
            });   
                }
              
                
            },
            filterBrandByLetter:function(){
                    $('.clip-brnd-srchbx').val("");
                    $('#brandApply').removeClass("disabled");
                    var alphaCatLetter = $(this).text().trim();
                    $("#catAlphates").find("a").each(function(){
                        $(this).removeClass("selected");
                    });
                    
                    $(this).addClass("selected");
                    
                if(alphaCatLetter=="All" || alphaCatLetter=="#"){
                    if(alphaCatLetter=="#"){
                        if($('#clipBrandCatContainer .clip-brndcrd-row').find('.clip-brnd-card.brand_SPECIAL').length>0){
                            $('#brandApply').removeClass("disabled");
                            $("#noBrandsFound").css("display","none");
                            $('#clipBrandCatContainer .clip-brndcrd-row').find('.clip-brnd-card:not(".brand_SPECIAL")').css("display","none");
                            $('#clipBrandCatContainer .clip-brndcrd-row').find(".clip-brnd-card").filter(".brand_SPECIAL").css("display","block");
                        }
                        else{
                            $('#brandApply').addClass("disabled");
                            $("#noBrandsFound").css("display","block");
                            $('#clipBrandCatContainer .clip-brndcrd-row').find('.clip-brnd-card').css("display","none");
                        }
                    }
                    else{
                        $('#clipBrandCatContainer .clip-brndcrd-row').find('.clip-brnd-card').css("display","block");
                    }
                }
                else{
                    if($('#clipBrandCatContainer .clip-brndcrd-row').find('.clip-brnd-card.brand_'+alphaCatLetter).length>0){
                        $("#noBrandsFound").css("display","none");
                        $('#clipBrandCatContainer .clip-brndcrd-row').find('.clip-brnd-card:not(".brand_'+alphaCatLetter+'")').css("display","none");
                        $('#clipBrandCatContainer .clip-brndcrd-row').find(".clip-brnd-card").filter(".brand_"+alphaCatLetter).css("display","block");
                    }
                    else{
                        $("#noBrandsFound").css("display","block");
                        $('#brandApply').addClass("disabled");
                    }
                }
            },
            orderBy:function(){
                o.sortApplied=true;
                var strText = $(this).text().trim();
                 $('li.clip-drpdwn-flxlist').removeClass('selected');
                $(this).addClass('selected');
                $("#curSortType").text(strText);
                o.applyFilter();
            },
            applyFilter:function()
            {
                var urlKey = {};
                var keys = [];
                $(".filter-section-tabs").find(":not('.disabled')input[type='checkbox']:checked").each(function()
                { 
                    var key = $(this).attr("data-key");                        
                    var value = $(this).attr("data-value");
                    if(forder=="")
                    {
                        forder= key;
                    }
                    else if(forder.indexOf(key)==-1)
                    {
                        forder+=","+key;
                    }
                    keys.push(key);

                    if(!urlKey[key]){                            
                        urlKey[key]= [value];
                    }
                    else
                    {
                        urlKey[key].push(value);
                    }
                });
                keys = $.unique(keys);
                var finalString = "";
                var finalString2 = "";
                var finalString3 = "";
                if(keys.length>0){
                    //finalString= "forder="+keys.toString();
                    finalString = "forder="+forder;
                    keys.forEach(function(val){                    
                        finalString+="&"+val+"="+urlKey[val].toString();
                    });
                }
                $(".filter-section-tabs #dimensionFltr").find("input[type='text']").each(function(){
                    var value = $(this).val().trim();
                    var type = $(".clip-lessgrtr-lbl.active").attr("dim-type");
                    if(value!=""){
                        if(type=='greater-than'){
                            finalString2+="&"+$(this).attr("data-key")+"="+value+"-0";     
                        }else{
                            finalString2+="&"+$(this).attr("data-key")+"=0-"+value;     
                    }
                    }
                });
                
                if(finalString2.length>0){
                    var type = $(".clip-lessgrtr-lbl.active").attr("dim-type");
                    finalString2+="&dimType="+type;
                }
                
                if(finalString.legnth>0){
                    finalString+="&"+finalString2;
                }
                else
                {
                    finalString+=finalString2;
                }
                
                //Sort logic
                if($("#sortBY .clip-drpdwn-flxlist.selected").length>0)
                {
                   var attr = $("#sortBY .clip-drpdwn-flxlist.selected").attr("data-sort").split("-");
                   //for toggling the case
                    if(!o.sortApplied){
                        if(attr[0]=='price') {
                           attr[1]=(attr[1]=='desc')?'asc':'desc';
                        }
                    }else{
                        o.sortApplied=false;
                    }
                   finalString3=utils.replaceQueryString(finalString3, 'order', attr[0]);
                   finalString3=utils.replaceQueryString(finalString3, 'dir', attr[1]);
                   finalString3=utils.replaceQueryString(finalString3, 'p', 1);
                   finalString3=finalString3.replace(/^\?/g, '');
                }
                
                if(finalString.length>0){
                    finalString+="&"+finalString3;
                }
                else
                {
                    finalString+=finalString3;
                }
                
                var splitUrl    = document.URL.split('?');
                var finalUrl = "";
                if(typeof splitUrl[1] == "undefined" || finalString.length>0) //no errors
                {
                    if(o.searchQs!=""){
                         finalUrl+=splitUrl[0]+"?"+o.searchQs+"&"+finalString; 
                    }
                    else{
                        finalUrl+= splitUrl[0]+"?"+finalString; 
                    }
                }
                else
                {
                    finalUrl+=splitUrl[0];
                    if(o.searchQs!=""){
                        finalUrl+="?"+o.searchQs;
                    }
                }
                o.filterClick(finalUrl);
            },
            clearFilterTabs:function(e){
                var key = $(this).attr("data-key");
                var value = $(this).attr("data-value");
                var url = document.URL.split("?")[1];
                $(".filter-section-tabs").find("input[type='checkbox']:checked").each(function()
                { 
                    if($(this).attr('data-value')==value){
                        $(this).removeAttr("checked").removeClass("doneOnce");                       
                    }
                });
                
                $(".filter-section-tabs").find("input[type='text']").each(function(){
                    if( (typeof $(this).attr("data-key") != 'undefined') && $(this).val()!=""){
                        if($(this).attr('data-value')==value && key == $(this).attr("data-key")){
                            $(this).val("");
                        }
                    }
                    
                });
                
                if ($('.clip-fltrd-cnt').length < 2) {
                        $(this).closest('.row').remove();
                } else {
                        $(this).parent().remove();
                }

				var tmpForder = forder.split(",");
                var elePos = $.inArray(key,tmpForder); 
                if(elePos!=-1)
                {
                    tmpForder.splice(elePos,1);
                    forder = tmpForder.toString();
                    utils.replaceQueryString(window.location.search, 'forder', forder);
                }
                
                o.applyFilter();
            },
            clearAllFilters:function(){
                o.sortApplied=false;
                var url = document.URL.split("?")[0];
                var url_querystring = document.URL.split("?")[1]; 
                var finalString3;
                if(o.is_search === true || o.is_brand_page === true) {
                    url = url+"?"+o.searchQs;
                }
                else{
                url = url+"?p=1";
                }
                $(this).closest('.row').remove();
                o.filterClick(url);
            },
            filterClick : function(queryString,callback) {
//                o.filter_applied=true;
                 queryString=queryString.replace(/&+$/, '');
                 queryString=queryString.replace(/\?&/g, '?');
                var splitUrl    =queryString.split('?');
                var data =typeof splitUrl[1] == "undefined"?"":encodeURI(splitUrl[1]);
                if(data ==''){
                    queryString=queryString.replace(/\?+$/, '')
                    data={p:1};
                    queryString+="?p=1";
                }else{
                    queryString = utils.replaceQueryString(queryString, 'p', 1);
                    data        = decodeURIComponent(data.replace(/\+/g, ' '));
                    data        = encodeURI(data);
                    data        = decodeURIComponent(data.replace(/^&/g, ''));
                    data +='&p=1';
               }
                $.ajax({
                url:splitUrl[0],
                type:"GET",
                data:data,
                cache:false,
                beforeSend:function(){
                    $('#loaderOverlay').show();
                },
                success:function(data){
                     $("#page-wrapper-content").html(data);                    
                },
                complete:function(){
                    var initPage=1;
                    //for all pages
                   o.suggetionAjaxCall=false;
                    if(callback===true){
                     initPage='';
                    }else{
//                     history.pushState(1, "page " + 1, queryString.replace(/&+$/, ''));
                     history.pushState(1, "page " + 1, queryString);
                    o.filter_applied=true;
                    }
                    $('body').removeClass('active').find('.popup_overlay').hide();
                    o._pageData=[];
                    PF.LISTING.init();
                    //for no product in response initialization should not initialized
                   if($(".clip-resetall-fltr .clearAllFilters").length<1){
                    o.initRestOf(initPage);
                   }
                   //layout setting
                   if(o.layoutViewType !=''){
                        $("#"+o.layoutViewType).trigger("click");
                    }
                    if(typeof itemData   !== 'undefined'){
                       setGtmData(itemData);
                    }
                   $('#loaderOverlay').hide();
                }
            }); 
               // $.pjax({ url:splitUrl[0], data: data, container: o.filterContainerSel, method: 'GET',timeout:500000});
            },
            viewTypeClick : function(){
                if($(this).attr("data-tooltip")=="Detailed view")
                {
                   o.layoutViewType='detail'; 
                }else{
                   o.layoutViewType='compact' ;
                }
            },
            initRestOf : function(initPage,maintainStatus){
                if(typeof initPage === 'undefined' || isNaN(initPage) || initPage==''){
                    currentPageSet=getParameterByName('p');
                    if(currentPageSet !=''){
                        o.curPage=parseInt(currentPageSet);
                    }else{
                     o.curPage=1;
                    }
                }else{
                    o.curPage=parseInt(initPage);
                }
                var $pagination = $('#pagination');
                $pagination.twbsPagination('destroy');
                o.totalPages = (typeof totalPage === "undefined")?0:totalPage;
                
                if($('link[rel="canonical"]').length === 0) {
                    $('head').append('<link rel="canonical" href="'+window.location.hostname+window.location.pathname+'?p='+(o.curPage)+'" >');
                } else {
                    $('link[rel="canonical"]').attr('href', window.location.hostname+window.location.pathname+'?p='+(o.curPage));
                }
                
                var new_query_string = o.getQueryString();
                
                // if page is greater than one and not equal to total page
                if(parseInt(o.curPage) > 1 && parseInt(o.curPage) !== parseInt(o.totalPages)) {
                    if(parseInt(o.curPage) !== o.totalPages) {
                        if($('link[rel="next"]').length === 0) {
                            $('head').append('<link rel="next" href="'+window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(parseInt(o.curPage) + 1)+'" >');
                        } else {
                            $('link[rel="next"]').attr('href', window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(parseInt(o.curPage) + 1));
                        }
                    }

                    if($('link[rel="prev"]').length === 0) {
                        $('head').append('<link rel="prev" href="'+window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(parseInt(o.curPage) - 1)+'" >');
                    } else {
                        $('link[rel="prev"]').attr('href', window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(parseInt(o.curPage) - 1));
                    }
                }
                
                // if last page
                if(parseInt(o.curPage) === parseInt(o.totalPages)) {
                    if($('link[rel="next"]').length > 0) {
                        $('link[rel="next"]').remove();
                    }

                    if($('link[rel="prev"]').length > 0 && parseInt(o.totalPages) === 1) {
                        $('link[rel="prev"]').remove();
                    } else {
                        if($('link[rel="prev"]').length === 0) {
                            $('head').append('<link rel="prev" href="'+window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(parseInt(o.curPage) - 1)+'" >');
                        } else {
                            $('link[rel="prev"]').attr('href', window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(parseInt(o.curPage) - 1));
                        }
                    }
                }else if(parseInt(o.curPage) === 1) { // first page
                    if($('link[rel="prev"]').length > 0) {
                        $('link[rel="prev"]').remove();
                    }

                    if(parseInt(o.totalPages) > 1) {
                        if($('link[rel="next"]').length === 0) {
                            $('head').append('<link rel="next" href="'+window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(parseInt(o.curPage) + 1)+'" >');
                        } else {
                            $('link[rel="next"]').attr('href', window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(parseInt(o.curPage) + 1));
                        }
                    }
                }
                
                
//                $('#pagination').twbsPagination({
//                    totalPages: o.totalPages,
//                    visiblePages: 5,
//                    prev:'<span class="prv-arrow"></span>',
//                    next:'Next <span class="next-arrow"></span>',
//                    last:' <span data-tooltip="The End" class="finishtool">Fin ~ </span>',
//                    startPage: o.curPage,
//                    initiateStartPageClick: false,
//                    onPageClick: function (event, page) {
//                        o.curPage = parseInt(page); // overrinding the value to get net page data
//                        var queryStr = utils.replaceQueryString(window.location.search, 'p', page);
//                        arrayKeyStr=page;
//                        if (o._pageData[arrayKeyStr]) {
//                            history.pushState(page, "page " + page, queryStr);
//                            $("#productView").html(o._pageData[arrayKeyStr]);
//                            //need to reinitialize lazy loading
//                        } else {
//                            o.getDOMElements(page);
//                        }
//                        if(o.curPage==o.totalPages){
//                            o.overRidePaginationLast();
////                            $("#subscriptionSection,#suggestionDiv").show();
//                            $("#subscriptionSection").show();
////                            $(".clip-tabscn-cntnt li a.pf-tablinks:first").addClass("active").trigger('click');  
//                        }else{
////                            $("#subscriptionSection,#suggestionDiv").hide();
//                            $("#subscriptionSection").hide();
//                        }
//                        
//                        if($('link[rel="canonical"]').length === 0) {
//                            $('head').append('<link rel="canonical" href="'+window.location.hostname+window.location.pathname+'?p='+(page)+' >');
//                        } else {
//                            $('link[rel="canonical"]').attr('href', window.location.hostname+window.location.pathname+'?p='+page);
//                        }
//                        
//                        var new_query_string = o.getQueryString();
//                        
//                        // if page is greater than one and not equal to total page
//                        if(page > 1 && page !== parseInt(o.totalPages)) {
//                            if(page !== o.totalPages) {
//                                if($('link[rel="next"]').length === 0) {
//                                    $('head').append('<link rel="next" href="'+window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(page + 1)+'" >');
//                                } else {
//                                    $('link[rel="next"]').attr('href', window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(page + 1));
//                                }
//                            }
//                            
//                            if($('link[rel="prev"]').length === 0) {
//                                $('head').append('<link rel="prev" href="'+window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(page - 1)+'" >');
//                            } else {
//                                $('link[rel="prev"]').attr('href', window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(page - 1));
//                            }
//                        }
//                        
//                        // if last page
//                        if(page === parseInt(o.totalPages)) {
//                            if($('link[rel="next"]').length > 0) {
//                                $('link[rel="next"]').remove();
//                            }
//                            
//                            if($('link[rel="prev"]').length > 0 && parseInt(o.totalPages) === 1) {
//                                $('link[rel="prev"]').remove();
//                            } else {
//                                if($('link[rel="prev"]').length === 0) {
//                                    $('head').append('<link rel="prev" href="'+window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(page - 1)+'" >');
//                                } else {
//                                    $('link[rel="prev"]').attr('href', window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(page - 1));
//                                }
//                            }
//                        }else if(page === 1) { // first page
//                            if($('link[rel="prev"]').length > 0) {
//                                $('link[rel="prev"]').remove();
//                            }
//                            
//                            if(parseInt(o.totalPages) > 1) {
//                                if($('link[rel="next"]').length === 0) {
//                                    $('head').append('<link rel="next" href="'+window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(page + 1)+'" >');
//                                } else {
//                                    $('link[rel="next"]').attr('href', window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(page + 1));
//                                }
//                            }
//                        }
//                        
//                        
//                        utils.lazyloadInit();
//                        o.domtextChange();
//                        
//                    }
//                });
                //inialize lazy loading
               utils.lazyloadInit();
               //need to reinitialize variable on every ajax call
                o.totalItem=totalProductCount;
                o.totalPages=totalPage;
                //for tab suggestion html
               if(typeof suggestestionArr !== 'undefined'){
                    o.suggestionTabhtml();  
                } 
                 //initialize dimention
                 $("a.clip-lessgrtr-lbl.active").trigger("click");

                if ($('.brnd-clctn-imgwrpr').length == 3){
                     var $html = $('.brnd-clctn-slideblck .brnd-clctn-imgwrpr').clone();
                     $('.brnd-clctn-slideblck').append($html);
                }

                 if($('.brnd-clctn-slideblck').length > 0 && o.is_brand_page === true){
                        var collectionSlider = $('.brnd-clctn-slideblck').slick({
                        speed: 300,       
                        infinite: true,            
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        centerMode: true,
                        //centerPadding: '37%',  
                        autoplay: true,
                        autoplaySpeed: 2000,
                        focusOnSelect: true
                    });

                    collectionSlider.on('init beforeChange afterChange', function(event, slick, currentSlide, nextSlide) {
                        o.curentSliderIdCLIP();                
                    });
                 }
            },
            getUrlEncoding:function(currentPage){
              // var str = utils.replaceQueryString(window.location.search, 'p', currentPage);
                //return window.btoa(str);
                return currentPage;
            },
            domtextChange:function(){
                var startRange=(o.curPage>1)?(((o.curPage-1)*itemPerPage)+1):1;
                var endRange=((o.curPage*itemPerPage)>totalProductCount)?totalProductCount:(o.curPage*itemPerPage);
                var remainingCount=(totalProductCount-endRange);
                $(".clip-lft-srlt").find(".clip-start-val").html(startRange);
                $(".clip-lft-srlt").find(".clip-shw-val").html(endRange);
                $("#current-page-no").html(o.curPage); 
                $("#remainingCount").html(remainingCount);
                $("#"+o.layoutViewType).trigger("click");
                 if(o.is_search == false && o.is_brand_page == false && o.curPage>=o.totalPages){
                     $("#subscriptionSection").show();
                 }
                
            },
            getDOMElements:function(page,dataStatus,skipPushState){
                 
              var queryStr = utils.replaceQueryString(window.location.search, 'p', page);
              if(typeof autoSuggestSearch !== "undefined" && autoSuggestSearch != ""){
                queryStr = utils.replaceQueryString(queryStr, 'q', autoSuggestSearch);
            }
            var infiniteScroll=false;
            if(skipPushState==='true'){
                infiniteScroll=true;
            }
            var dataArr={layout:o.pageLayout,is_search:o.is_search,
                     is_collection:o.is_collection,
                     collectionName:o.collectionName,
                     is_brand_page:o.is_brand_page,template_type:o.template_type,
                     cat:o.cat,layoutViewType:o.layoutViewType,infiniteScroll:infiniteScroll
                    };
                if(o.brandsname!=''){
                 dataArr.brandsname=o.brandsname;
                 }
              $.ajax({
                url:o.nextPageUrl+queryStr,
                type:"GET",
                data:dataArr,
                dataType:"json",
                beforeSend:function(){
                     o.loaded=false;
                     if($("#load_more_button").length > 0){
                       $("#load_more_button").addClass("btn-loader");
                     }
                },
                success:function(data){
                    //arrayKeyStr=o.getUrlEncoding(page);
                	arrayKeyStr=page;
                    o._pageData[arrayKeyStr] = data;
                   // o._pageData[page] = data.html;
                    if(dataStatus!='saveData'){
//                        $("#productView").html(data);
                        if(typeof data.clip !=="undefined"){
                          $("#productView .clip-grid-view .clip-prod-container").append(data.clip.grid);
                          $("#productView .clip-list-view").append(data.clip.list);
                        }else if(typeof data.search !=="undefined"){
                          $("#productView .clip-grid-view .srch-rslt-prod-container").append(data.search);
                        }
                        if(typeof data.gtm !=="undefined"){
                            setGtmData(data.gtm);
                        }
                        if(skipPushState !== 'true'){
                            history.pushState(page, "page "+page, queryStr);
                        }
                    }
                },
                complete:function(){
                    o.loaded=true;
                     if(dataStatus!='saveData'){
                         utils.lazyloadInit();
                          $("#"+o.layoutViewType).trigger("click");
                          $("#load_more_button").removeClass("btn-loader");
                        if(o.totalPages > o.curPage && o.curPage > 2){
                            $('#load_more_button').show();
                            $("#pagination-row").removeClass("no-infinit-btn");
                        }else{
                            $('#load_more_button').hide();
                            $("#pagination-row").addClass("no-infinit-btn");
                        }
                        o.domtextChange()
                            
                 }
                 if(typeof itemData   !== 'undefined'){
                     setGtmData(itemData);
                 }
                }
            }); 
                
            },
            overRidePaginationLast:function(){
                $("#pagination li.last a").click(function(){
//                    o.suggestionTabhtml();
                    //for moving focus
                $("#subScribEmail").focus();
                    var scrollPos =  $("#subscriptionSection").offset().top-200;
                    $('html,body').animate({
                        scrollTop: scrollPos},
                        'slow');
                });
            },
            emailSubscription:function(){
                var email=$(this).siblings('input[type="text"]').val(); 
                var emailFilter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if ( email !=='' && emailFilter.test(email)) {
                    //todo:make ajax call and made entry in db
                    $.ajax({
                       url:root_url+"/site_product/emailSubscription",
                       type:"POST",
                       data:{cat:o.cat,email:email},
                        dataType:"json",
                        success: function(data){
                            if(data.flag===true){
                                $('.clip-eml-scrb-box').hide();
                                $('.clip-eml-scrb-scs').show();
                                $(this).siblings('input[type="text"]').removeClass('clip-err-border'); 
                            }else if(data.msg="email already exits") {
                                 $('.clip-eml-scrb-box').hide();
                                 $('.clip-eml-scrb-alr').show();
                            }else{
                                $('.clip-eml-scrb-error p.pf-text-red ').html(data.msg);  
                                $('.clip-eml-scrb-error').show();
                                $(this).parent().addClass('clip-err-border');
                            }
                            }
                       
                    });
                } else {
                        $('.clip-eml-scrb-error').show();
                        $(this).parent().addClass('clip-err-border');
                }
            },
            toggleRead:function(){
                    if($(this).parent().siblings('.clip-readmore-cntwrpr').hasClass('height-less')) {
                            $(this).parent().siblings('.clip-readmore-cntwrpr').removeClass('height-less');
                            $(this).text('Read Less');
                    } else {
                            $(this).parent().siblings('.clip-readmore-cntwrpr').addClass('height-less');
                            $(this).text('Read More');
                    }
            },
            feedbackSubmit :function(){
                 var selectorType=$("#feedbackForm input[name='selector']:checked").val();
                 if(typeof selectorType==='undefined'){
                     return false;
                 }
                 var error=false;
                if(selectorType=='no'){  
                   error= PF.HEADER.validateForm('','feedbackForm');
                }
             if(!error){
                 $.ajax({
                url:root_url + "/site_product/feedbackSubmit",
                type:"POST",
                data:$("#feedbackForm").serialize(),
                dataType:"json",
                beforeSend:function(){
                    //$('#loaderOverlay').show();
                },
                success:function(data){
                    if(data.flag == false) {
                            alert(data.msg);
                        } else {
                            $(".popup-box .clip-fdbck-widgtbx").hide();
                            $(".popup-box .fdbck-thnku-block ").show();  
                        }
                    
                },
                complete:function(){
                    //close popup afert completion of feedback
                    setTimeout(function() {
                     $('body .popup-close').trigger("click");
                    }, 4000);
                 
                }
            });
            }
            },
           feedbackResetForm: function(){
                $(".popup-box .clip-fdbck-widgtbx").show();
                $(".popup-box .fdbck-thnku-block ").hide();
           },
           closeModel: function(){
                $("a.popup-close").trigger("click");
           },
           oosSubscrition: function(){
                var email=$(this).siblings('input[name="subScribemail"]').val(); 
                var pid=$(this).attr("data-value"); 
                var emailFilter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if ( email !=='' && emailFilter.test(email)) {
                     $(this).parents('.out-stck-cnt').find(".error").hide();
                     var data = {'email': email, 'pid': pid,'checkIfExists':true};
                    var _params = {
                        'pid': pid
                    };
                    var _setUpOptions = {
                        'dataType' : "json"
                    };
                                
                    utils.makeRequest(
                            secure_url + '/site_product/oos_notifciation_request',
                            'POST',
                            data,
                            o.OOSResponse,
                            '',
                            '',
                            _params,
                            _setUpOptions                                    
                        );
                }else{
                    $(this).parents('.out-stck-cnt').find(".error").show();
                }
           },
           OOSResponse:function(result,additionParam){
               var data = '';
                try {
                        data = $.parseJSON( result );
                        additionParam = $.parseJSON( additionParam );
                } catch( error ) {
                        data = result;
                        additionParam = additionParam;
                }
                if(data=='Success'){
                    $(".oos_"+additionParam.pid+" .success-msg").hide();    
                    $(".oos_"+additionParam.pid+" .clip-email-scrb").hide();    
                    $(".oos_"+additionParam.pid+" .out-ofstock-err").hide();    
                    $(".oos_"+additionParam.pid+" .subscribed").show();    
                }else if(data==='already_exists'){
                    $(".oos_"+additionParam.pid+" .success-msg").hide();    
                    $(".oos_"+additionParam.pid+" .clip-email-scrb").hide();    
                    $(".oos_"+additionParam.pid+" .out-ofstock-err").hide();    
                    $(".oos_"+additionParam.pid+" .alreadySubscribed").show();     
                }else{
                    $(".oos_"+additionParam.pid+" .out-ofstock-err").show();
                }
               
           },
           applyBrandFilter:function(){
               //if($("#clipBrndSrch input[type=checkbox]:checked").length>0){
                o.applyFilter();
              //}
              
              //$("#clipBrndSrch a.popup-close").trigger("click");
           },
           curentSliderIdCLIP:function() {
                var collectnCntntShow  = $('.slick-center').attr('data-slide');
                $('.brndclctn-sldecnt-sctn .brnd-clctn-cnt').hide();
                $('.brndclctn-sldecnt-sctn #' + collectnCntntShow ).show(); 
            },
           element_in_scroll:function(elem) {
            var returnFlag=false;
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();
            var elemTop = $(elem).offset().top;
            var productsGridThreshold =  $(elem).height() * .75;
//            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
            if ((docViewTop - elemTop) > productsGridThreshold) {
                returnFlag=true;
            }
            return returnFlag;
            },
           persistentScroll:function(elem) {
            var iCurScrollPos = $(this).scrollTop();
            if (iCurScrollPos > o.iScrollPos && o.loaded && o.curPage <= 2 && o.totalPages > o.curPage) {
            //Scrolling Down
            if (o.element_in_scroll("#productView")) {
                o.curPage=o.curPage+1;
                o.getDOMElements(o.curPage,'','true');
            }
            } else if(o.curPage > 2 && o.curPage < o.totalPages){
                $("#load_more_button").show();
                $("#pagination-row").removeClass("no-infinit-btn");
                o.domtextChange();
            }else if(o.is_search == false && o.is_brand_page == false && o.curPage>=o.totalPages){
                $("#subscriptionSection").show();
            }
            o.iScrollPos = iCurScrollPos;
           },
           loadMoreItem:function() {
            if (o.curPage < o.totalPages) {
                 o.curPage=o.curPage+1;
                o.getDOMElements(o.curPage,'','true');
            } else {
                $("#load_more_button").hide();
                $("#pagination-row").addClass("no-infinit-btn");
            }
           },
        getQueryString:function() {
            var query_string = window.location.search;
            var query_string_array = query_string.split("&");
            var new_query_string = '';
            for(var i = 0; i < query_string_array.length; i++) {
                var inner_query_array = query_string_array[i].split("=");
                if(inner_query_array[0] !== 'p') {
                    if(i === 0) {
                        new_query_string += query_string_array[i].replace('?','');
                    } else {
                        new_query_string += '&'+query_string_array[i].replace('?','');
                    }
                }
            }

            return (new_query_string.length === 0) ? '' : new_query_string+'&';
        }
        };
        z.CLIP = o;
    }( PF, $));
    
    $( document ).ready(function() {
        
        PF.CLIP.init();
        
        
       
//        setInterval(function(){
//                nextPage = parseInt(PF.CLIP.curPage) + 1;
////                arrayKeyStr=PF.CLIP.getUrlEncoding(nextPage);
//                arrayKeyStr=nextPage;
//                if(!PF.CLIP._pageData[arrayKeyStr] &&  (PF.CLIP.totalPages >= nextPage) &&  PF.CLIP.loaded){
//                    PF.CLIP.getDOMElements(nextPage,'saveData');
//                }
//        },10000);

        if(PF.CLIP.is_search == false && PF.CLIP.is_brand_page == false && PF.CLIP.curPage==PF.CLIP.totalPages) {
            $("#subscriptionSection").show();
        }else{
            $("#subscriptionSection").hide();
        }

        
        window.onpopstate = function(event) {
           var url=document.URL;
           url = PF.UTILITIES.replaceQueryString(url, 'p', 1);
           PF.CLIP.filterClick(url,true);
           return true;
//		var utils = PF.UTILITIES;
//    	//var currState = history.state;    	
//          var tempcurPage =event.state;
//          tempcurPage=getParameterByName('p');
////         if(tempcurPage==null ||  typeof tempcurPage === 'undefined' ){
//           if(tempcurPage =='' ){
//             tempcurPage=1;
//          }
//          tempcurPage=parseInt(tempcurPage);
//         if(PF.CLIP.filter_applied){
//             var url=document.URL;
//            url = utils.replaceQueryString(url, 'p', tempcurPage);
//             PF.CLIP.filterClick(url,true);
//
//             return true;
//         }
////        arrayKeyStr=PF.CLIP.getUrlEncoding(tempcurPage);
//        arrayKeyStr=tempcurPage;
//        if(PF.CLIP._pageData[arrayKeyStr]){
//        	$('#productView').html(PF.CLIP._pageData[arrayKeyStr]);
//        }
//        else{
//            var url=document.URL;
//            url = utils.replaceQueryString(url, 'p', tempcurPage);
////             PF.CLIP.filterClick(url,true);
//             return true;
//        }
//      PF.CLIP.initRestOf(tempcurPage);
//       PF.CLIP.domtextChange();
//
	};

    if($('.srch-rslt-more').length > 0){
        $(".srchrslt-more-box ").mCustomScrollbar({axis:"y"
        });
    }
    });
    var iScrollPos=0;
   
}
$(window).load(function(){
  $('#'+PF.CLIP.layoutViewType).trigger('click');  
//   PF.CLIP.overRidePaginationLast();
});
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
