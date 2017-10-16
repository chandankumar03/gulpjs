/*!
 * clipboard.js v1.5.5
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,e.Clipboard=t()}}(function(){var t,e,n;return function t(e,n,r){function o(a,c){if(!n[a]){if(!e[a]){var s="function"==typeof require&&require;if(!c&&s)return s(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[a]={exports:{}};e[a][0].call(l.exports,function(t){var n=e[a][1][t];return o(n?n:t)},l,l.exports,t,e,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(t,e,n){var r=t("matches-selector");e.exports=function(t,e,n){for(var o=n?t:t.parentNode;o&&o!==document;){if(r(o,e))return o;o=o.parentNode}}},{"matches-selector":2}],2:[function(t,e,n){function r(t,e){if(i)return i.call(t,e);for(var n=t.parentNode.querySelectorAll(e),r=0;r<n.length;++r)if(n[r]==t)return!0;return!1}var o=Element.prototype,i=o.matchesSelector||o.webkitMatchesSelector||o.mozMatchesSelector||o.msMatchesSelector||o.oMatchesSelector;e.exports=r},{}],3:[function(t,e,n){function r(t,e,n,r){var i=o.apply(this,arguments);return t.addEventListener(n,i),{destroy:function(){t.removeEventListener(n,i)}}}function o(t,e,n,r){return function(n){n.delegateTarget=i(n.target,e,!0),n.delegateTarget&&r.call(t,n)}}var i=t("closest");e.exports=r},{closest:1}],4:[function(t,e,n){n.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},n.nodeList=function(t){var e=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===e||"[object HTMLCollection]"===e)&&"length"in t&&(0===t.length||n.node(t[0]))},n.string=function(t){return"string"==typeof t||t instanceof String},n.function=function(t){var e=Object.prototype.toString.call(t);return"[object Function]"===e}},{}],5:[function(t,e,n){function r(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!c.string(e))throw new TypeError("Second argument must be a String");if(!c.function(n))throw new TypeError("Third argument must be a Function");if(c.node(t))return o(t,e,n);if(c.nodeList(t))return i(t,e,n);if(c.string(t))return a(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function o(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function i(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function a(t,e,n){return s(document.body,t,e,n)}var c=t("./is"),s=t("delegate");e.exports=r},{"./is":4,delegate:3}],6:[function(t,e,n){function r(t){var e;if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName)t.focus(),t.setSelectionRange(0,t.value.length),e=t.value;else{t.hasAttribute("contenteditable")&&t.focus();var n=window.getSelection(),r=document.createRange();r.selectNodeContents(t),n.removeAllRanges(),n.addRange(r),e=n.toString()}return e}e.exports=r},{}],7:[function(t,e,n){function r(){}r.prototype={on:function(t,e,n){var r=this.e||(this.e={});return(r[t]||(r[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function r(){o.off(t,r),e.apply(n,arguments)}var o=this;return r._=e,this.on(t,r,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),r=0,o=n.length;for(r;o>r;r++)n[r].fn.apply(n[r].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),r=n[t],o=[];if(r&&e)for(var i=0,a=r.length;a>i;i++)r[i].fn!==e&&r[i].fn._!==e&&o.push(r[i]);return o.length?n[t]=o:delete n[t],this}},e.exports=r},{}],8:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.__esModule=!0;var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=t("select"),c=r(a),s=function(){function t(e){o(this,t),this.resolveOptions(e),this.initSelection()}return t.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action=e.action,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""},t.prototype.initSelection=function t(){if(this.text&&this.target)throw new Error('Multiple attributes declared, use either "target" or "text"');if(this.text)this.selectFake();else{if(!this.target)throw new Error('Missing required attributes, use either "target" or "text"');this.selectTarget()}},t.prototype.selectFake=function t(){var e=this;this.removeFake(),this.fakeHandler=document.body.addEventListener("click",function(){return e.removeFake()}),this.fakeElem=document.createElement("textarea"),this.fakeElem.style.position="absolute",this.fakeElem.style.left="-9999px",this.fakeElem.style.top=(window.pageYOffset||document.documentElement.scrollTop)+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,document.body.appendChild(this.fakeElem),this.selectedText=c.default(this.fakeElem),this.copyText()},t.prototype.removeFake=function t(){this.fakeHandler&&(document.body.removeEventListener("click"),this.fakeHandler=null),this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)},t.prototype.selectTarget=function t(){this.selectedText=c.default(this.target),this.copyText()},t.prototype.copyText=function t(){var e=void 0;try{e=document.execCommand(this.action)}catch(n){e=!1}this.handleResult(e)},t.prototype.handleResult=function t(e){e?this.emitter.emit("success",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)}):this.emitter.emit("error",{action:this.action,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})},t.prototype.clearSelection=function t(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()},t.prototype.destroy=function t(){this.removeFake()},i(t,[{key:"action",set:function t(){var e=arguments.length<=0||void 0===arguments[0]?"copy":arguments[0];if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function t(){return this._action}},{key:"target",set:function t(e){if(void 0!==e){if(!e||"object"!=typeof e||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');this._target=e}},get:function t(){return this._target}}]),t}();n.default=s,e.exports=n.default},{select:6}],9:[function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}n.__esModule=!0;var c=t("./clipboard-action"),s=r(c),u=t("tiny-emitter"),l=r(u),f=t("good-listener"),d=r(f),h=function(t){function e(n,r){o(this,e),t.call(this),this.resolveOptions(r),this.listenClick(n)}return i(e,t),e.prototype.resolveOptions=function t(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0];this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText},e.prototype.listenClick=function t(e){var n=this;this.listener=d.default(e,"click",function(t){return n.onClick(t)})},e.prototype.onClick=function t(e){var n=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new s.default({action:this.action(n),target:this.target(n),text:this.text(n),trigger:n,emitter:this})},e.prototype.defaultAction=function t(e){return a("action",e)},e.prototype.defaultTarget=function t(e){var n=a("target",e);return n?document.querySelector(n):void 0},e.prototype.defaultText=function t(e){return a("text",e)},e.prototype.destroy=function t(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)},e}(l.default);n.default=h,e.exports=n.default},{"./clipboard-action":8,"good-listener":5,"tiny-emitter":7}]},{},[9])(9)});
'use strict';

var PF = PF || {};

// utilities files should always be present before the checkout specific js
if( typeof PF.UTILITIES === 'undefined' ) {
	(function() {
		var _node = document.createElement( 'script' );
		_node.type = 'text/javascript';
		_node.src = ( ( window.location.protocol == 'http:' ) ? root_url : secure_url ) + '/js/utilities.js';

		document.getElementsByTagName( 'head' )[ 0 ].appendChild( _node );
	})();
}
//////////////////////// common script /////////////////////

// checkout specific scripts
/**
 * Initialise cbc object
 */
var cbcObj = {
    charge: 1,
    oid:1
};
if( typeof PF.CHECKOUT === 'undefined' ) {
	(function( z, $ ) {
		var utils = z.UTILITIES;
                var o = {
			timeToLive : 30000, // time in milliseconds for which the delete action can be undone in mini-cart
			timedObjects : {}, // container to reference the timed objects, so that we can take an action on them after expiry
			cachedObjects : {},
			pageType : '',
			non_serviceable_items : [],
			isShipTogetherOpted : 0,
			isCouponApplied : 0,
			listen : {
				change : {
					'#fe_points' : ['PF.CHECKOUT.feCheckBoxChange','#page']
				},
				click : {
					'[data-modal="ckGiftModal"]' : ['PF.CHECKOUT.trackEvent','#page'],
					'#ckFGYes' : ['PF.CHECKOUT.trackEvent','#page'],
					'#ckGiftModal' : ['PF.CHECKOUT.trackEvent','#page'],
					'#gvSubmit' : ['PF.CHECKOUT.giftcard.gift_voucher_apply','#page'],
					'.gv_rmv_voucher' : ['PF.CHECKOUT.giftcard.remove_giftvocher','body'],
				},
				keyup : {
					'.input-gv-number' : ['PF.CHECKOUT.giftcard.inputValidate', 'body'],
                    '.input-gv-pin' : ['PF.CHECKOUT.giftcard.inputValidate', 'body']
                }
			},
			trackEvent : function() {
				var _label = 'click';
				if( $( '#ckFGYes' ).is( ':visible' ) ) {
					var _label = 'I want this';
				}

				dataLayer.push({
					category : 'Free Gifts',
					action : 'gift :T-Shirt|page type:Checkout order summary - web',
					label : _label,
					'event' : 'event Free Gifts'
				});
			},
			init : function() {

//				checkout_scripts.initzialize();
//				utils.listen(o.listen);
                                o.ocIntItemSlider();
                                o.ocMultiSkuDetail();
                                o.checkshiptogether();
				//this.setEventHandlers();

				$( '#page' ).on( 'click', '#shpt, #shptFinalPage', function(e) {
					var _id = $( this ).attr( 'id' ).toLowerCase();

					switch( _id ) {
						case 'shptfinalpage':
							// stop event bubbling
							e.stopImmediatePropagation();

							if( ! o.isShipTogetherOpted ) {
								o.isShipTogetherOpted++;
								$( '#shipTogether' ).prop( 'checked', 'checked' );
								o.handleShipTogetherFinalPage();
							}
							break;
						default:
							break;
					}
				});

				//CASHE BACK
//				o.displayCashbackMessage();
			},
                        handleShipTogetherFinalPage : function() {
                        	if( $( '#shipTogether' ).is( ':checked' ) && o.isShipTogetherOpted ) {
                        		o.isShipTogetherOpted = 1;

                        		var _url = root_url + '/checkout/updateshipstogether';
                        		utils.makeRequest( _url, 'POST', {}, o.handleShipTogetherResponse, o.handleShipTogetherError );
                        	}
                        },
                        handleShipTogetherResponse : function( data ) {
                        	var response;
                        	try {
                        		response = $.parseJSON( data );
                        	} catch( e ) {
                        		response = data;
                        	}

                        	if( response == 1 ) {                                    
                        		o.isShipTogetherOpted = 1;

                        		$( '#shptFinalPage' ).css( 'backgroundImage', 'none' );
                        		$( '.shipstogetherUncheck' ).removeClass( 'show' ).addClass( 'hide' );
                        		$( '.shipstogetherCheck' ).removeClass( 'hide' ).addClass( 'show' );

                        		var pids = $( '#showHidePID' ).val().split( ',' );
                        		for( var i=0;i<pids.length;i++ ) {
                        			$( '#cnf_' + pids[ i ] ).remove();
                        		}
                        		$( '.oc-shiptogether-merged-wrap' ).show();
                        	} else if( response == 2 ) {
                        		$( '#shptFinalPage' ).css( 'backgroundImage', 'none' );
                        		$( '.shipstogetherUncheck' ).removeClass( 'show' ).addClass( 'hide' );
                        		$( '.shipstogetherCheck' ).removeClass( 'show' ).addClass( 'hide' );
                        	}
                        },
                        checkshiptogether : function(){
                            var shipTogtherStatus = $('#shipTogtherStatus').val();
                            if(shipTogtherStatus == 1){
                                $( '.oc-shiptogether-merged-wrap' ).show();
                            }
                        },
                        handleShipTogetherError : function(_x, _y, _z ) {
                        	o.isShipTogetherOpted = 0;
                        	$( '#shipTogether' ).prop( 'checked', false );
                        },
                        handleShipTogether : function() {
                        	if( $( '#shipTogether' ).is( ':checked' ) ) {
                        		$( '.shipstogetherUncheck' ).removeClass( 'hide' ).addClass( 'show' );
  								$( '.shipstogetherCheck' ).removeClass( 'show' ).addClass( 'hide' );

  								o.setShipTogetherCookies( 0 );
                        	} else {
	                        	$( '.shipstogetherUncheck' ).removeClass( 'show' ).addClass( 'hide' );
	  							$( '.shipstogetherCheck' ).removeClass( 'hide' ).addClass( 'show' );

	  							o.setShipTogetherCookies( 1 );
	  						}

	  						var _pin = utils.readCookie( 'serviceable_pincode' );

	  						o.checkAssemblyPincode( _pin );
                        },
                        setShipTogetherCookies : function( flag ) {
                        	flag = parseInt( flag );

                        	if( ! isNaN( flag ) ) {
                        		switch( flag ) {
                        			case 0:
                        				utils.eraseCookie( 'ship_together' );
			  							utils.eraseCookie( 'ship_together_pids' );
                    				break;
                        			case 1:
                        				utils.createCookie( 'ship_together', 1 );
  										utils.createCookie( 'ship_together_pids', $( '#shipTogetherPID' ).val() );
                    				break;
                    				default:
                    				break;
                        		}
                        	}
                        },
                        updateShipTogetherStatus : function( data ) {
                        	var showShipTogether = false;

                        	if( data.status == true ) {
                        		showShipTogether = true;
                        	}

	                        var showDateRange = 0;
	                        var dateRange = data[ 'date_range' ];
	                        var displayDateRange = '';

	                        if( ( utils.readCookie( 'serviceable_pincode' ) !== null ) && ( dateRange[ 'start_date' ] != '' ) && ( dateRange[ 'end_date' ] != '' ) ) {
	                            showDateRange = 1;

	                            displayDateRange = data[ 'date_range' ][ 'start_date' ] + ' - ' + data[ 'date_range' ][ 'end_date' ];
	                        }

	                        var showST = 'hide';

							var isOptionSelected = 0;
                            var showUnselectedText = 1;
                            var defaultClass = 'wopin';
                            var _checkAssembly = 0;

	                        if( showShipTogether ) {
	                            if( utils.readCookie( 'ship_together' ) !== null ) {
	                                isOptionSelected = 1;
	                                showUnselectedText = 0;
	                                _checkAssembly = 1;
	                            }

	                            if( utils.readCookie( 'serviceable_pincode' ) !== null ) {
	                                defaultClass = '';
	                            }

	                            showST = 'show';
	                        }

	                        if( showST == 'hide' ) {
		                        $( '#ship_together_block' ).hide();
		                    } else {
		                        $( '#ship_together_block' ).show();
		                    }

		                    if( showDateRange == 1 ) {
		                    	$( '.withdate' ).css( 'display', 'inline-block' );
		                    	$( '.t-black' ).text( displayDateRange );
		                    } else {
		                    	$( '.withdate' ).css( 'display', 'none' );
		                    	$( '.t-black' ).text( '' );
		                    }

		                    // update the item count applicable for ship_together
		                    $( '.shipstogetherUncheck .txt-red' ).text( data.count );
		                    $( '.shipstogetherCheck .txt-red' ).text( data.count );
		                    $( '#shipTogetherPID' ).val( data.pids.join( ',' ) )

		                    if( defaultClass != '' ) {
		                    	$( '.shipstogetherCheck' ).addClass( defaultClass );
		                    }

		                    if( showUnselectedText == 1 ) {
		                    	$( '.shipstogetherUncheck' ).removeClass( 'hide' ).addClass( 'show' );
		                    	$( '.shipstogetherCheck' ).removeClass( 'show' ).addClass( 'hide' );
		                    } else {
		                    	$( '.shipstogetherUncheck' ).removeClass( 'show' ).addClass( 'hide' );
		                    	$( '.shipstogetherCheck' ).removeClass( 'hide' ).addClass( 'show' );
		                    }

		                    if( isOptionSelected ) {
		                    	$( '#shipTogether' ).attr( "checked", 'checked' );
		                    	o.setShipTogetherCookies( 1 );
		                    } else {
		                    	$( '#shipTogether' ).attr( "checked", false );
		                    	o.setShipTogetherCookies( 0 );
		                    }

		                    $( '#ships-product-scroll' ).empty();
		                    var _d = '';
		                    for( var i=0;i<data.pidImages.length;i++ ) {
		                    	_d += '<span class="ships-product-scroll-slide">';
		                    	_d += '<img src="' + product_image_url + data.pidImages[ i ] + '" style="max-width:60px;">';
		                    	_d += '</span>';
		                    }
		                    $( '#ships-product-scroll' ).html( _d );

		                    if( _checkAssembly == 1 ) {
		                    	for( var i=0;i<data.pids.length;i++ ) {
		                    		var _text = data.date_range.start_date + ' - ' + data.date_range.end_date;
		                    		$( '#delivery_date_cart_' + data.pids[ i ] ).text( _text );
		                    	}
		                    }
	                    },
                            
                            //OC interted Item slider
                            ocIntItemSlider: function(){
                                $('.oc-int-pro-slider-wrap').each(function () {
                                    var children = $(this).children('.oc-int-pro-slide').length;
                            //        $(this).siblings('.ck-addr-cnt').children('.ck-addr-cnt-no').text(children);
                                    if (children > 4)
                                    {
                                        o.productSlider($(this).attr('id'), '.oc-int-pro-slide', 4);
                                    }
                                    else {
                                        $('.oc-int-pro-slider-ext-wrap .ck-bill-addr-prev,.oc-int-pro-slider-ext-wrap .ck-bill-addr-next').hide();
                                    }
                                });
                            },
                            //Order Confirmation Multiple sku detail hider
                            ocMultiSkuDetail : function(){
                                var ocSkuNo = $('.ck-oc-sku-list .ck-sku-row-wrap').children('.ck-sku-row-content').length + $('.oc-shiptogether-merged-list .ck-sku-row-wrap').children('.ck-sku-row-content').length;
                                console.log(ocSkuNo);
                                if( ocSkuNo > 1){
                                   $('.oc-order-dtl-arrow').show();
                                   $('.oc-order-details-content').addClass('oc-unexpanded');
                                   $(".oc-order-dtl-arrow").on("click", function (){
                                     $(this).toggleClass('active');
                                     $('.oc-order-details-content').toggleClass('oc-unexpanded');
                                   });
                                }
                                else{
                                   $('.oc-order-details-content').removeClass('oc-unexpanded'); 
                                }
                            },
                            
                            // Modal slider
                            productSlider : function(id, productCol, shiftBy){
                                var $this = $('#' + id);
                                var i = 0;
                                var $slider = $this,
                                        $product = $slider.find(productCol),
                                        slidingSpan = parseInt($product.outerWidth(true) * shiftBy),
                                        sliderWidth = $product.length * $product.outerWidth(true),
                                        totalShifts = sliderWidth / slidingSpan,
                                        lastShiftWidth = sliderWidth % slidingSpan,
                                        actualCompleteShift = Math.floor(totalShifts),
                                        $next = $this.siblings('.ck-bill-addr-next'),
                                        $prev = $this.siblings('.ck-bill-addr-prev');
                                $slider.width(sliderWidth);
                                $next.on('click', function () {
                                    i++;
                                    if (i < actualCompleteShift)
                                    {
                                        $slider.css({marginLeft: -slidingSpan * i}, 500);
                                        $prev.removeClass('inactive');

                                    }
                                    else
                                    {
                                        var currentMargin = parseInt($slider.css('marginLeft')),
                                                shift = currentMargin + -lastShiftWidth;
                                        $slider.css({marginLeft: shift}, 500);
                                        $(this).addClass('inactive');
                                        $prev.removeClass('inactive');
                                    }
                                });
                                $prev.on('click', function () {
                                    i--;
                                    $next.removeClass('inactive');
                                    if (i < actualCompleteShift)
                                    {
                                        $slider.css({marginLeft: -slidingSpan * i}, 500);
                                        if (i === 0) {
                                            $(this).addClass('inactive');
                                        }
                                    }
                                    else
                                    {
                                        var currentMargin = parseInt($slider.css('marginLeft')),
                                                shift = currentMargin + -lastShiftWidth;
                                        $slider.css({marginLeft: shift}, 500);
                                        $(this).addClass('inactive');
                                    }

                                });
                            }
                            
                        };
	z.CHECKOUT = o;
	})( PF, $ );
        
    $( document ).ready(function() { 
        PF.CHECKOUT.init();
    });
}

$(function () {
//    ShipTogether
    var SHIP_TOGETHER = (function () {
        var o = {};
        $(function () {

            function select_link_ele() {
                if (document.querySelector('.shipstooltip')) {
                    o.tol_link = (document.getElementById('shipTogether').checked ? $(".shipsborder-chk") : $(".shipsborder"));
                }
            }
            function set_hover_menu_position() {
                if (document.querySelector('.shipstooltip')) {
                    var obj = (document.getElementById('shipTogether').checked ? $(".shipsborder-chk") : $(".shipsborder"));
                    o.tol_obj.show();
                    var p = obj.offset();
                    var h = o.tol_obj.height();
                    var x = p.left;
                    var t = (p.top - 30 - h);
                    var w = parseInt((obj.width() / 2));
                    var tx = x + w;
                    var client_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                    if ((client_width - tx - 30) < obj.width()) {
                        o.tol_obj.css({
                            left: (client_width - 200) + "px",
                            top: t + "px"
                        });
                    } else {
                        o.tol_obj.css({
                            left: x + "px",
                            top: t + "px"
                        });
                    }
                }
            }
            if (document.querySelector('.shipstooltip')) {
                o.tol_obj = $(".shipstooltip"),
                        o.remainder_left = 0,
                        o.scroll_width = 0,
                        o.tol_link = 0,
                        o.left_flag, o.left_rem, o.scroll_amt, o.main_scroll_ele = $('#ships-product-scroll');
                o.tooltip_arrow_controller();
                select_link_ele();
                $('.checkout-shipstogether-lbl label').click(function (e) {
                    var t = e.target || e.srcElement;
                    if (t.className !== 'shipsborder' && t.className !== 'shipsborder-chk') {
                        $('.shipstogetherUncheck').toggleClass('hide show');
                        $('.shipstogetherCheck').toggleClass('show hide');
                    }

                });
                $(".shipsborder,.shipsborder-chk").bind('click', function (e) {
                    if (o.tol_obj.is(":visible")) {
                        o.tol_obj.hide();
                        e.preventDefault();
                        e.stopPropagation();
                    } else {
                        set_hover_menu_position();
                        e.preventDefault();
                        e.stopPropagation();

                    }
                });
                $("#shipTogether").click(function () {
                    select_link_ele();
                });

                o.scroll_width = 0, o.left_flag = 0, o.left_rem, o.scroll_amt = 0;
                $('#ships-product-scroll .ships-product-scroll-slide ').each(function () {
                    o.scroll_width += $(this).width() + 20;
                });
                o.main_scroll_ele.css('width', o.scroll_width + 'px');
                o.remainder_left = o.scroll_width - $('.shipstooltip-wrap').width();
                o.left_rem = o.remainder_left;
                $('#ships-product-next').click(function () {

                    if (o.left_flag == 0) {
                        o.left_flag = 1;
                        if (o.left_rem > 90) {

                            o.scroll_amt = parseInt(o.main_scroll_ele.css('left')) - 80;
                            o.left_rem -= 80;
                            o.main_scroll_ele.animate({
                                left: o.scroll_amt
                            }, 350, function () {
                                o.left_flag = 0;
                            });
                        } else {
                            o.scroll_amt = parseInt(o.main_scroll_ele.css('left')) - 80;
                            o.left_rem = 0;
                            o.main_scroll_ele.animate({
                                left: o.scroll_amt
                            }, 350, function () {
                                o.left_flag = 0;
                            });
                            $('#ships-product-next').addClass('inactive');
                        }
                        $('#ships-product-prev').removeClass('inactive');
                    }
                });
                $('#ships-product-prev').click(function () {
                    if (o.left_flag == 0) {
                        o.left_flag = 1;
                        if (parseInt(o.main_scroll_ele.css('left')) < -80) {
                            o.scroll_amt = parseInt(o.main_scroll_ele.css('left')) + 80;
                            o.left_rem += 80;
                            o.main_scroll_ele.animate({
                                left: o.scroll_amt
                            }, 350, function () {
                                o.left_flag = 0;
                            });
                        } else {
                            o.scroll_amt = o.remainder_left - o.left_rem;
                            o.left_rem = o.remainder_left;
                            o.main_scroll_ele.animate({
                                left: 0
                            }, 350, function () {
                                o.left_flag = 0;
                            });
                            $('#ships-product-prev').addClass('inactive');
                        }
                        $('#ships-product-next').removeClass('inactive');
                    }
                });


                if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    $(document).mousemove(function (event) {
                        var mouse_x = event.pageX;
                        var mouse_y = event.pageY;
                        if ((mouse_x < o.tol_obj.offset().left) || (o.tol_obj.offset().left + o.tol_obj.outerWidth()) < mouse_x) {
                            o.tol_obj.hide();
                        }
                        if ((mouse_y < o.tol_obj.offset().top)) {
                            o.tol_obj.hide();
                        } else if (o.tol_link.offset().left > mouse_x && o.tol_obj.offset().top + o.tol_obj.outerHeight() < mouse_y) {
                            o.tol_obj.hide();
                        } else if (o.tol_link.offset().left + o.tol_link.outerWidth() < mouse_x && o.tol_obj.offset().top + o.tol_obj.outerHeight() < mouse_y) {
                            o.tol_obj.hide();
                        } else if ((o.tol_link.offset().top + o.tol_link.outerHeight()) < mouse_y) {
                            o.tol_obj.hide();
                        }
                    });

                    $(".shipsborder,.shipsborder-chk").bind('mouseover', function (e) {
                        if (o.tol_obj.is(":visible")) {
                            o.tol_obj.hide();
                            e.preventDefault();
                            e.stopPropagation();
                        } else {
                            set_hover_menu_position();
                            e.preventDefault();
                            e.stopPropagation();

                        }
                    });

                }
                $(document).click(function (event) {
                    var mouse_x = event.pageX;
                    var mouse_y = event.pageY;
                    if ((mouse_x < o.tol_obj.offset().left) || (o.tol_obj.offset().left + o.tol_obj.outerWidth()) < mouse_x) {
                        o.tol_obj.hide();
                    }
                    if ((mouse_y < o.tol_obj.offset().top)) {
                        o.tol_obj.hide();
                    } else if (o.tol_link.offset().left > mouse_x && o.tol_obj.offset().top + o.tol_obj.outerHeight() < mouse_y) {
                        o.tol_obj.hide();
                    } else if (o.tol_link.offset().left + o.tol_link.outerWidth() < mouse_x && o.tol_obj.offset().top + o.tol_obj.outerHeight() < mouse_y) {
                        o.tol_obj.hide();
                    } else if ((o.tol_link.offset().top + o.tol_link.outerHeight()) < mouse_y) {
                        o.tol_obj.hide();
                    }
                });


                ;
            }
        });
        o.reset_scroll_bar = function () {
            if (document.querySelector('.shipstooltip'))
                o.scroll_width = 0, o.left_flag = 0, o.left_rem, o.scroll_amt = 0;
            $('#ships-product-scroll .ships-product-scroll-slide ').each(function () {
                o.scroll_width += $(this).width() + 20;
            });
            o.main_scroll_ele.css('width', o.scroll_width + 'px');
            o.remainder_left = o.scroll_width - $('.shipstooltip-wrap').width();
            o.left_rem = o.remainder_left;
            o.tol_link = $(".shipsborder");
            o.main_scroll_ele.css('left', '0px');
            o.tooltip_arrow_controller();
        };
        o.tooltip_arrow_controller = function () {
            if (o.main_scroll_ele.find('span').length < 3) {
                $("#ships-product-next").addClass('inactive');
                $("#ships-product-prev").addClass('inactive');
            }
        }
        return o;
    }(SHIP_TOGETHER || {}));    
    
//Order Confirmation ShipTogether on check
    $('.ck-oc-wrap .oc-shiptogether-label').on('click', function () {
        if (!$('.ck-oc-wrap input#shipTogether').is(':checked')) {
            $('.ck-oc-wrap .ck-shipTogether-wrap').hide();
            $('.ck-oc-wrap .oc-shiptogether-merged-wrap').slideDown(200);
        }
    });
//    $('.oc-del-chrome-extn-wrap .oc-del-extn-link').on('click', function () {
//        $('.oc-del-chrome-extn-txt').hide();
//        $('.oc-del-chrome-extn-snap').slideDown(300);
//    });
});



