/**
 * Header script
 */

"use strict";

var PF = PF || {};

// load utilities library, if not already loaded
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

if( typeof PF.HEADER === 'undefined' ) {
	(function (a, $) {
		var utils = a.UTILITIES;
		// define customer_email as it is accessed in many places as a global variable
		window.customer_email   = ( typeof customer_email === 'undefined' ) ? '' : customer_email;

		var x = {
			//popUpID and popUpClass are used for open and close the popups.
			popUpId: [ '#loginPopupLink', '#returnLoginPopupLink', '#registerPopupLink', '#popup_overlay', '#appyHomesPopupLink','#retrive-pwd-btn', '#register_true_popup', '#footer_testimonial', '#trackyourorderBox','#footer_testimonial2' ],
			popUpClass: ['.popup-close', '.popup-forgot-password', '.popup-register', '.popup-login', '.register_true_popup','.registerPopupLink','.trackyourorderPopup', '.write-tstmnl-btn'],
			eventsInitiated : false, // has all requests run before attaching the events to the elements
			/**
			 * Not needed as of now, used for undo action in minicart
			timeToLive : 30000, // time in milliseconds for which the delete action can be undone in mini-cart
			timedObjects : {}, // container to reference the timed objects, so that we can take an action on them after expiry
			*/
			wishlistResponseCache : '', // no calls to get wishlist data after first time on page load
			recentlyViewedResponseCache : '', // no calls to get recently viewed items data after first time on page load
			cartResponseCache : '', // no calls to get cart data after first time on page load
			miniCartSoldOutItems : {
				cart : [],
				wishlist : [],
				views : []
			},
                        listenOnPageLoad:{
                         
                           blur:{
                           	 '#login_dedicatedlogin-form input': ['PF.HEADER.validateForm', '#page'],
                                '#dedicated-signup-form input': ['PF.HEADER.validateForm', '#page'],
                                '#popup_reg_form input': ['PF.HEADER.validateForm', 'body'],
                                '#login_popup_login_form input': ['PF.HEADER.validateForm', 'body'],
                                '.popup-controls textarea': ['PF.HEADER.validateForm', '#page'],
                                '#maresetPass input': ['PF.HEADER.validateForm', '#page'],
                                '#maEditAddress input': ['PF.HEADER.validateForm', '#page'],
                                '#maEnterYourNewAdd input,#maEnterYourNewAdd select': ['PF.HEADER.validateForm', 'body'],
                                '#track_form_1 input': ['PF.HEADER.validateForm', 'BODY'],
                                '#login_popup_login_tyo_form input': ['PF.HEADER.validateForm', 'BODY'],
                                '#reset-form-tyo input':['PF.HEADER.validateForm', 'BODY'],
                                '#besDetailForm input': ['PF.HEADER.validateForm', 'body'],
                                '#besDetailForm select': ['PF.HEADER.validateForm', 'body'],
                                '#billAddAddrFrm input': ['PF.HEADER.validateForm', 'body'],
                                '#testimonial_form textarea': ['PF.HEADER.validateForm', 'body'],
                                '#wtuNewComplaint input':['PF.HEADER.validateForm','#page'],
                                '#wtuNewComplaint textarea':['PF.HEADER.validateForm','#page'],
                                '#wtuNewComplaint select':['PF.HEADER.validateForm','#page'],
                                '#besInfoSkuForm input':['PF.HEADER.validateForm', '#page'],
                                '#wtuUnResolvedComplaintFrm input':['PF.HEADER.validateForm','#page'],
                                '#wtuUnResolvedComplaintFrm textarea':['PF.HEADER.validateForm','#page'],
                                '#wtuUnResolvedComplaintFrm select':['PF.HEADER.validateForm','#page'],
                                '#wtuUnResolvedIssueFrm input':['PF.HEADER.validateForm','#page'],
                                '#wtuUnResolvedIssueFrm textarea':['PF.HEADER.validateForm','#page'],
                                '#formSubmit-guest-checkout input': ['PF.HEADER.validateForm', '#page'],
                                '#business_detail input': ['PF.HEADER.validateForm', '#page'],
                                '#business_detail select': ['PF.HEADER.validateForm', '#page'],
                                '#business_detail checkbox': ['PF.HEADER.validateForm', '#page'],
                                '#popup_guest_reg_frm input': ['PF.HEADER.validateForm', '#page'],
                                '#franForm input': ['PF.HEADER.validateForm', '#page'],
                                '#franForm select': ['PF.HEADER.validateForm', '#page'],
                                '#register_detail input':['PF.HEADER.validateForm','body'],
                                '#mobile_detail input':['PF.HEADER.validateForm','body'],
                                '#login_login-form input':['PF.HEADER.validateForm','body'],
                                '#address_select_form input':['PF.HEADER.validateForm','body'],
                                '#initiate-reset-form input':['PF.HEADER.validateForm','body'],
                                '#signup-form input':['PF.HEADER.validateForm','body'],
                                '#swatch-form input':['PF.HEADER.validateForm','body'],                                
                                '#swatch-form select': ['PF.HEADER.validateForm', 'body'],
                                '#feedbackForm select': ['PF.HEADER.validateForm', 'body'],
                                '#ecard-form input':['PF.HEADER.validateForm','body'],
                                '#ecard-form textarea':['PF.HEADER.validateForm','body'],
                                '#physicalcard-form input':['PF.HEADER.validateForm','body'],
                                '#physicalcard-form textarea':['PF.HEADER.validateForm','body']
                                
                           },
                           change:{
                               '#franForm select': ['PF.HEADER.validateForm', '#page']
                           },
                           click:{
                               '.validateGen input[name="gender"]':['PF.HEADER.hideGenderErr','body'],
                           }
                        },
			init: function () {
				x.closeModals();
				x.thankYouBoxAfterRegistration();
				x.setCartHeight();
				x.headerSearch();
				utils.addListener($('.onlynumbers'), 'keydown', x.numCheck, true);
                                utils.listen(x.listenOnPageLoad);
				if(utils.w.location.href.indexOf("tyo=1") > -1){
					if (typeof loginFlag !== 'undefined' && loginFlag) {
						$('#registerPopupBox, #returnLoginPopupBox, #login-forgot-pwd-wrap, #appyHomesBox').hide();
						utils.w.location.href=root_url+"/customer_trackorder/trackOrderDetails";
					} else {
						$("#trackyourorderBox").fadeIn(100);
						$("#popup_overlay").fadeIn(200);
					}
				}

				if(utils.w.location.href.indexOf("track-your-order.html") >-1){
					utils.w.location.href=root_url+"/customer_trackorder/trackOrderDetails";
				}

				//Here checking if testimonial cookie is set then it will open the popup for testimonial
				var testimonial_cookie = utils.readCookie("testimonial_cookie");
				if(testimonial_cookie == 1 && loginFlag){
					$("#testimonialBox").fadeIn(50);
					$('body').addClass('active');
					x.capchacountajax('testimonial_form','data'); //ajax call for count no attempt on testimonial page
					$("#popup_overlay").fadeIn(200);
					var name = "testimonial_cookie";
					utils.eraseCookie(name);
				}

				//OTP Modal starts here
				$('.popup-box').on('click', '#resentVerficationCode', function (e) {
					e.preventDefault();
					$('.otp-verification-area-left p').css('visibility', 'hidden');
					$('.otp-subtitle').hide();
					var rel=$(this).attr('rel');

					if(rel=='resend')
					{
							var form_id=$(this).data('form');
							$(this).attr('rel','resend_request');
							$("#"+form_id+" #otpcode_submit").attr('disabled','disabled');
							$('#otp_code').val('');
							var path = secure_url + "/customer_account/resendOTP";
							var data = {'resend':1};
							var _params = {
								'form_id' : form_id,
								'rel' : rel
							  };

                                                        var _setUpOptions = {
                                                            'dataType' : "json"
                                                        };

							//ajax request stat
							utils.makeRequest( path, 'POST', data, x.OTPResendResponse, x.handleError, '', _params, _setUpOptions );

							//ajax request end
							
					}
				});

				$('.popup-box').on('click', '#changeMobileNumber', function (e) {
					e.preventDefault();
					$('.otp-authentication').slideUp(function () {
						$('.otp-change-number').slideDown();
					});
				});

				$('.popup-box').on('click', '.otp-goback', function (e) {
					e.preventDefault();
					$('.otp-change-number').slideUp(function () {
						$('.otp-authentication').slideDown();
					});
				});

				/**
				 * Switch b/w grid/list-view on mini-cart
				 */
				$( '.gridview, .listview' ).on( 'click', function() {
					var _el = $( '.mini_cart' ).find( '.item_holder' );
					var _class = $.trim( $( this ).attr( 'class' ).toLowerCase().replace( 'active', '' ) );

					switch( _class ) {
						case 'listview':
							$( '.listview' ).attr( 'data-selected', 1 ).addClass( 'selected' );
							$( '.gridview' ).attr( 'data-selected', 0 ).removeClass( 'selected' );
							_el.removeClass( 'grid_blocks' ).find( '.rp' ).show().find( '.op' ).show();
							break;
						case 'gridview':
							$( '.listview' ).attr( 'data-selected', 0 ).removeClass( 'selected' );
							$( '.gridview' ).attr( 'data-selected', 1 ).addClass( 'selected' );
							_el.addClass( 'grid_blocks' ).find( '.rp' ).hide().find( '.op' ).hide();
							break;
						default:
							break;
					}
					global_function.reload_minicart();
					global_function.mCustomScrollInit('MiniCartScrollbar');
				});

				/**
				 * Handle input when the user presses "ENTER" key
				 *
				 * 1. Serviceability check in mini-cart
				 * 2. Qty update in mini-cart
				 */
				$( '.mini_cart' ).on( 'keypress', 'input.srvc_pin_text, input.qty_input', function( e ) {
					if( e.which == $.ui.keyCode.ENTER ) {
						switch( $( this ).attr( 'class' ).toLowerCase() ) {
							case 'srvc_pin_text':
								/**
								 * Check pincode serviceability for mini-cart on click of input button
								 */
								$( 'a.check_available' ).click();
								break;
							case 'qty_input':
								var productID = $( this ).attr( 'id' ).split( '_' );
								var _val = parseInt( $.trim( $( this ).val() ) );

								if( utils.isNumber( _val ) ) {
									x.updateProductCartQty( productID[ 1 ] );
								} else {
									alert( 'Please enter a valid quantity.' );
								}
								break;
							default:
								break;
						}
					}
				});

				//$( '.mini_cart' ).on( 'click', 'a.plussign, a.minussign, a.deleteicon, a.addtocart_icon, div.delete_notification, a.check_available, a.add_req, a.minicart_action, div.item-holder-notification ', function(e) {
				$( '.mini_cart' ).on( 'click', 'a.plussign, a.minussign, a.deleteicon, a.move-wishlist, a.addtocart_icon, a.check_available, a.add_req, a.minicart_action, div.item-holder-notification ', function(e) {
					switch( $( this ).attr( 'class' ).toLowerCase() ) {
						case 'item-holder-notification':
							if((e.target.nodeName.toLowerCase() == 'a') && (e.target.className.indexOf('bespoke_close')>=0)){
								x.hideBespokeMsg();
							}
							break;
						case 'plussign':
							var productID = $( this ).attr( 'data-id' );
							x.updateProductCartQty( productID, 1 );							
							break;
						case 'minussign':
							var productID = $( this ).attr( 'data-id' );
							x.updateProductCartQty( productID, -1 );							
							break;
						case 'deleteicon':
							switch( $( this ).attr( 'data-pos' ) ) {
								case 'minicart':
									x.deleteProductFromCart( this );
									$( '.pf-tooltip' ).remove();									
									break;
								case 'wishlist':
									$( '.mini_cart .gb-loader' ).show();
									var pid = $.trim( $( this ).attr( 'data-id' ) );
									var type = $.trim( $( this ).attr( 'data-type' ) );

									if( type == 'bundle' ) {
										//added condition for wardrobe products
										utils.removeFromWishlist( pid, x.handleWishlistItemDelete, 'minicart', 1 ); 
									}else if( type == 'look' ) {
										utils.removeFromWishlist( pid, x.handleWishlistItemDelete, 'minicart' ,undefined ,1);
									}else {
										utils.removeFromWishlist( pid, x.handleWishlistItemDelete, 'minicart' );
									}
									$( '.pf-tooltip' ).remove();
									
									break;
								case 'views':
									x.deleteRecentlyViewedProduct( $( this ).attr( 'data-id' ) );
									$( '.pf-tooltip' ).remove();
									
									break;
								default:
									break;
							}

							break;
						case 'addtocart_icon':
							// called from the "wishlist" and "recently viewed" tabs in mini-cart
							if( $( this ).attr( 'data-type' ) == 'simple' ||  $( this ).attr( 'data-type' ) == 'bundle' ) { //added type bundle for wardrobe product
								try {
									var _tab = $( this ).attr( 'data-tab' );
								} catch( _error ) {
									return false;
								}

								if( $.inArray( _tab, [ 'mywishlist', 'myviews' ] ) < 0 ) {
									return false;
								}

								if( _tab == 'mywishlist' ) {
									var _pid = $( this ).attr( 'data-wishlistitem' );
								} else if( _tab == 'myviews' ) {
									var _pid = $( this ).attr( 'data-rvitem' );
									x.deleteRecentlyViewedProduct(_pid);
									$(this).closest('.item_card_wrapper').slideUp();
								}

								$( '.mini_cart .gb-loader' ).show();
								if($( this ).attr( 'data-type' ) == 'bundle'){
									utils.addToCart( _pid, 1, '', '1', '' ,'', 1);
								} else {
									utils.addToCart( _pid, 1, '', '1', '' );
								}
								// show the "cart" tab in mini-cart
							    $( '.mini-usercart' ).trigger('click');
							}
							
							break;
						/**
						 * NOT NEEDED NOW
						case 'delete_notification':
							var _id = $( this ).attr( 'data-id' );
							var _hash = $( this ).attr( 'data-hash' );

							if( ( typeof _id !== 'undefined' ) && ( typeof _hash !== 'undefined' ) ) {
								_id = _id.split( '_' );

								// undo only deleted items in cart section of mini-cart
								if( ( _id[ 0 ].toLowerCase() == 'cart' ) && ( _id.length > 1 ) ) {
									x.undoProductDeleteFromCart( _id[ 1 ], _hash );
								}
							}
							break;
						*/
						case 'check_available':
							/**
							 * Check pincode serviceability for mini-cart
							 */
							var _pin = $.trim( $( '.srvc_pin_text' ).val() );

							if( ( _pin.length == 6 ) && utils.isNumber( _pin ) ) {
								if($('.MiniCartScrollbar').length>0){
									global_function.mCustomScrollDestroy('MiniCartScrollbar');
								}
								$( '#pin_check_error' ).slideUp();
								x.miniCartSoldOutItems.length = 0;
                                if( x.cartResponseCache && x.cartResponseCache.pincode == _pin ) {
                                    var param = {
                                        'pin' : _pin
                                    };
                                    x.handleMiniCartResponse( x.cartResponseCache, param );
                                } else {
                                    x.getCartInfo( _pin );
                                }
                                $('#mini-usercart').show();
							} else {
								//alert( 'Please enter a valid pincode' );
								$( '#items_not_serviceable_box' ).hide();
								$( '#notification_box' ).hide();
								$( '.srvc_pin_text' ).val( '' );
								$( '#pin_check_error' ).slideDown();
								$('#mini-usercart').show();
							}
							break;
						case 'add_req':
							$( '.mini_cart .gb-close' ).trigger( 'click' );
							$( '#popup_overlay' ).fadeIn( 200 );
							$( '#add_popup' ).fadeIn( "slow", "linear" );
							break;
						case 'minicart_action':
							x.removeSoldOutItems();
							break;
						case 'move-wishlist':
							switch( $( this ).attr( 'data-pos' ) ) {
							case 'minicart':
								$( '.pf-tooltip' ).remove();									
								break;
							case 'views':
								$( '.pf-tooltip' ).remove();
								break;
							default:
								break;
						}

						break;
						default:
							break;
					}
				});

				$( '.mini_cart .tabs a' ).on( 'click', function() {
					switch( $( this ).attr( 'id' ).toLowerCase() ) {
						case 'mini-usercart-tab':
							if($('.MiniCartScrollbar').length>0){
								global_function.mCustomScrollDestroy('MiniCartScrollbar');
							}
							x.miniCartSoldOutItems.length = 0;
                            if( x.cartResponseCache ) {
                                var _params = {
                                        'pin' : x.cartResponseCache.pincode
                                };
                                x.handleMiniCartResponse( x.cartResponseCache, _params );
                            } else {
                                x.getCartInfo();
                            }
                                                        
							$( '.mini_cart .tabs a' ).removeClass( 'active' );
							$( this ).addClass( 'active' );
							break;
						case 'mini-userwishlist-tab':
							x.miniCartSoldOutItems.length = 0;
							if($('.MiniCartScrollbar').length>0){
								global_function.mCustomScrollDestroy('MiniCartScrollbar');
							}
							if( x.wishlistResponseCache != '' ) {
								x.renderWishlist( x.wishlistResponseCache, $( 'a#mini-userwishlist-tab' ) )
							} else {
								var _url = secure_url + '/customer_wishlist/getWishList_minicart';
								var _beforeSend = function() {
									$( '.mini_cart .gb-loader' ).show();
								};

                                var _setUpOptions = {
                                    'dataType' : "json"
                                };
                                                                
								// new product added to wishlist, delete the local cache
								x.wishlistResponseCache = '';

								utils.makeRequest( _url, 'GET', {}, x.renderWishlist, x.handleError, _beforeSend, $( this ), _setUpOptions );
							}
							break;
						case 'mini-userviews-tab':
							x.miniCartSoldOutItems.length = 0;
							if($('.MiniCartScrollbar').length>0){
								global_function.mCustomScrollDestroy('MiniCartScrollbar');
							}
							if( x.recentlyViewedResponseCache ) {
								x.getRecentlyViewed( x.recentlyViewedResponseCache, $( 'a#mini-userviews-tab' ) );
							} else {
								var _url = secure_url + '/site_page/get_recent_views';
								var _beforeSend = function() {
									$( '.mini_cart .gb-loader' ).show();
								};
                                var _setUpOptions = {
                                    'dataType' : "json"
                                };                                

								utils.makeRequest( _url, 'GET', {}, x.getRecentlyViewed, x.handleError, _beforeSend, $( this ), _setUpOptions );
							}
							break;
						default:
							break;
					}
				});

				/*By Nisha for dedicated checkout login starts here*/
                                $('.ck-login-reg-link,.ck-guest-checkbox').on('click', function (el) {
					var soft_logout = $(this).attr('data-softlogout');
					if(soft_logout){
						$('#registerPopupBox').show();
					}else{
						$('#registerPopupBox').hide();
						if($( this ).hasClass('ck-login-reg-link')){
							 $('.ck-login-guest-modal,.ck-login-forgot-reseted-wrap,.ck-login-forgot-wrap').hide();
						     $('.ck-login-reg-wrap').show();
						}else if($( this ).hasClass('ck-guest-checkbox')){

							if (!$('input#guestCheck').is(':checked')) {
								$("#password1").removeAttr('validate');
	            				$("#password2").removeAttr('validate');
					            $('.ck-login-reg-pwd-wrap').hide();
					            $('.ck-direct-guest-wrap').show();
					        } else {
					        	$("#password1").attr('validate',1);
	            				$("#password2").attr('validate',1);
					            $('.ck-direct-guest-wrap').hide();
					            $('.ck-login-reg-pwd-wrap').show();
					        }
						}
					}
				});

				$('.ck-direct-guest-wrap .ck-login-reg-link').on('click', function () {
			        $(this).parents('.ck-login-reg-wrap').find('.ck-guest-checkbox').trigger( "click" );
			    });

				$('.ck-login-m-forgot-link,.ck-pwd-reset-send-again').on('click', function () {
			        $('.ck-login-frm-wrap,.ck-login-forgot-reseted-wrap').hide();
			        $('.ck-login-forgot-wrap').show();
			    });

			    $('.ck-login-m-login-link').on('click', function () {
			        $('.ck-login-forgot-reseted-wrap,.ck-login-forgot-wrap,.ck-login-reg-wrap').hide();
			        $('.ck-login-guest-modal,.ck-login-frm-wrap').show();
			        allInputReset();
			    });
				// ends here

				for (var id in this.popUpId) {
					utils.addListener($(this.popUpId[ id ]), 'click', x.commonPopUpID, true);
				}

				for (var id in this.popUpClass) {
					if(this.popUpClass[id] === '.registerPopupLink') {
						utils.addListener($('#main_navigation_menu'), 'click', x.commonPopUpClass, true, this.popUpClass[ id ]);
					} else {
						utils.addListener($(this.popUpClass[ id ]), 'click', x.commonPopUpClass, true);
					}
				}

				this.header_scripts('#checkout-guest-btn', 'click', function (e) {
					$('.guest-login-popup-firtscreen').hide();
					if(!$('#popup_guest_reg_frm').is(':visible')){
						$('#popup_guest_reg_frm').fadeToggle( "slow", "linear" );
					}
					e.preventDefault();
				});

				this.header_scripts('.guest-popup-register', 'click', function (e) {
					$('.guest-login-popup-firtscreen').hide();
					if(!$('#popup_guest_reg_frm').is(':visible')){
						$('#popup_guest_reg_frm').fadeToggle( "slow", "linear" );
					}
					$('#checkboxsmall3').attr('checked', true);
					$(".popup-pwds-entry").slideToggle();
					e.preventDefault();
				});

				this.header_scripts('#popup_guest_reg_frm #checkboxsmall3', 'change', function (e) {
					if ($(this).is(':checked')) {
						$(".popup-pwds-entry").slideToggle();
					} else {
						$(".popup-pwds-entry").slideToggle();
					}
					e.preventDefault();
				});

				this.header_scripts('.header_tab.wistlist_img', 'click', function (e) {
					$('.img_search_header .close').click();
					$(this).addClass('active');
					$(".mini_cart").addClass('active');
					$(".mini-userwishlist").trigger('click');
					$('.popup_overlay').css('display', 'block');
					$('body').addClass('active');
					$(this).siblings('.notify_expand').slideDown(200);
					e.preventDefault();
				});

				this.header_scripts('.close_notify_expand', 'click', function (e) {
					$('.header_tab.notification').siblings('.notify_expand').slideUp(200);
					$('.header_tab.notification').removeClass('active');
					e.preventDefault();
				});

				this.header_scripts('.notify_msg .close', 'click', function (e) {
					$(this).parent().fadeOut(150);
					$('.header_tab.notification').removeClass('active');
					e.preventDefault();
				});

				this.header_scripts('.image_search', 'click', function (e) {
					$('.close_notify_expand').click();
					$('.image_search').addClass('active');
					if ($(this).siblings('.img_search_wrap').is(':visible')) {
						$(this).siblings('.img_search_wrap').slideUp(300);

					} else {
						$(this).siblings('.img_search_wrap').slideDown(300);
					}
					e.preventDefault();
				});

				this.header_scripts('.img_search_header .close', 'click', function (e) {
					$('.img_search_wrap').slideUp(300);
					$('.image_search').removeClass('active');
					e.preventDefault();
				});

				this.header_scripts('.img_up_btn', 'click', function (e) {
					$('.img_up_btn_wrap').hide();
					$('.img_magicking_wrap').show();
					setTimeout(function () {
						$('.img_magicking_wrap').hide();
						$('.simg_crop_screen').show();
					}, 1500);
				});

				this.header_scripts('.crop_btn', 'click', function (e) {
					$('.simg_crop_screen').hide();
					$('.simg_cropped_screen').show();
					e.preventDefault();
				});

				this.header_scripts('.undo_btn', 'click', function (e) {
					$('.simg_crop_screen').show();
					$('.simg_cropped_screen').hide();
					e.preventDefault();
				});

				this.header_scripts('a.header_tab.cart', 'click tap', function () {
					$('.img_search_header .close').click();
					$('.close_notify_expand').click();
					$(".mini_cart").addClass('active');
					$(".mini-usercart").trigger('click');
					$('body').addClass('active');
					$("#popup_overlay").fadeIn(200);

					x.miniCartSoldOutItems.length = 0;
					var _serv_pincode = utils.readCookie( 'serviceable_pincode' );

					if( ( typeof _serv_pincode == 'undefined' ) || ! utils.isNumber( _serv_pincode ) ) {
						_serv_pincode = '';
					}

					$('.mcart_header .srvc_pin_text').val( _serv_pincode );
					$( '#items_not_serviceable_box' ).hide();
					$( '#items_not_serviceable_box #items_not_serviceable' ).html( '' );
					$( '#pin_check_error' ).slideUp();
					utils.createCookie('minicartTriggerDatalayer',true);
					//$( '#items_not_serviceable_box #srvc_pin' ).html( '' );
                    if( x.cartResponseCache ) {
                        var param = {
                            'pin' : _serv_pincode
                        };
                        x.handleMiniCartResponse( x.cartResponseCache, param );
                    } else {
                        x.getCartInfo( _serv_pincode );
                    }
				});

				this.header_scripts('.mini_cart .gb-close', 'click tap', function () {
					$(".mini_cart").removeClass('active');
					$( '.mini_cart .tabs a' ).removeClass( 'active' );
					$( '.mini_cart .tabs a:eq(0)' ).addClass( 'active' );
					$("#popup_overlay").fadeOut(200);
					$('body').removeClass('active');
				});

				this.header_scripts('a.header_tab.my_account', 'click tap', function () {
					if($(this).hasClass('logged-in')){
						$('.header_tab.loggedin').addClass('active');
						$("#popup_overlay").fadeIn(200);
					}else{
						$(".acct_links").addClass('active');
						$("#popup_overlay").fadeIn(200);
					}
				});

				this.header_scripts('a.header_tab.search', 'click tap', function () {
					if ($('.search_bar').is(':visible')) {
						$(".search_bar").slideUp(150);
						$(".middle_block ").removeClass('search_bar_expanded');
					} else {
						$(".middle_block").addClass('search_bar_expanded');
						$(".search_bar").slideDown(150);
					}
				});

				/*Script for Megamenu local storage start */
				/*checked whether local storage is supported*/
				if (typeof (Storage) !== "undefined") {
					// var found = true;
                                        var found = true;
					var expire = parseInt(localStorage.getItem("megamenu.expire"));

					/*check for local storage expiry*/
					if (typeof expire != 'undefined' && expire != null && expire != '' && !isNaN(expire)) {
						var curr_diff = utils.getMinutesBetweenDates(new Date(expire), new Date());
						if (curr_diff > 15) {
							found = false;
						} else {
							/*if not expire then get it from local storgae and place it on it's location*/
							$(".menu_wrapper ul li a").each(function () {
                                                            var menu_name = $(this).attr('rel');
                                                            if (typeof menu_name !== 'undefined' && menu_name !== null) {
								var first_part_name = menu_name.split("nav_");
								var name_to_match = first_part_name[1].toLowerCase();
								var megamenu = localStorage.getItem("megamenu." + name_to_match);
								if (typeof megamenu != 'undefined' && megamenu != null && megamenu != '') {
									$("#megamenu").append(megamenu);
								} else {
									found = false;
									return false;
								}
                                                            }    
							});
						}
					} else {
						found = false;
					}
					if (found === false) {
						this.getMenus();
					}
				} else {
					/*fire the ajax to get sub menus*/
					this.getMenus();
				}

				var pid = '';
                                /*
                                 * Added by karthick.ns
                                 * condition (typeof page_type !== "undefined") 
                                 * To avoid the error if pagetype not defined 
                                 */                               
				if( (typeof page_type !== "undefined") && (page_type == 'vip' )) {
					pid = product_id;
				}

				//Following code snippet (if structure) is to check whether user have added products in wishlist whn not logged in
				if( utils.readCookie('wishlist_flag') == 'true') {      
					var _url = secure_url +"/customer_wishlist/addToWishlist";
					var _data = {'pid': pid};
                                        
                                        var _setUpOptions = {
                                            'dataType' : "json"
                                        };
                                
					var successHandler = function( data ) {
						if( data == 1 ) {
							//To make wishlist icon red
							$('.pf-wishlist-ic').addClass( 'active-wishlist' );
						}
						x.getwishlistcount();

						utils.eraseCookie( 'wishlist_flag' );
					};
					utils.makeRequest( _url, 'POST', _data, successHandler, PF.ERROR.raiseError, '', '', _setUpOptions );
				}

				/*Needs to be called only when user logs-out, Regarding UserId implementation*/
		        $('.loggedin li a[href$="logout/"]').on('click', function(){
		        	PF.UTILITIES.eraseCookie('UserID');
		        });
			},
			commonPopUpID: function (event) {
				switch (event.target.id) {
					case 'loginPopupLink':
						if(!$('#loginPopupBox').is(':visible')){							
							$('#loginPopupBox').fadeToggle( "slow", "linear" );
							x.capchacountajax('login_popup_login_form','login'); // ajax call for count no of attempt for login
						}
						$("#login-normal [name='logSubmit']").removeAttr('disabled');
						$('#registerPopupBox, #returnLoginPopupBox').fadeOut(400);
						$('#login-forgot-pwd-wrap').fadeOut(400);
						$('#login-pwd-email-sent').fadeOut(400);
						$('#popup_overlay').fadeIn(200);
                                                $('#emailid').focus();
                                                if($('#emailid').val()==''){
                                                    $('#password').val('');
                                                    if(recaptcha == 'VISIBLE'){
                                                    	grecaptcha.reset(widget_lgn);
                                                	}
                                                    $('#login_popup_login_form #captchaError').hide();
                                                }
						break;
					case 'returnLoginPopupLink':
						if(!$('#returnLoginPopupBox').is(':visible')){
							$('#returnLoginPopupBox').fadeToggle( "slow", "linear" );
						}
						$('#registerPopupBox, #loginPopupBox').fadeOut(400);
						$('#login-forgot-pwd-wrap').fadeOut(400);
						$('#login-pwd-email-sent').fadeOut(400);
						$("#popup_overlay").fadeIn(200);
						break;
					case 'registerPopupLink':
						if(utils.readCookie('otp_box_show') == '1') {
							$('#otp_box').fadeIn(300);
							$("div.otp-modal").fadeIn();
							block_reg_popup=true;
						} else {
							if(!$('#registerPopupBox').is(':visible')){
								$('#registerPopupBox').fadeToggle( "slow", "linear" );
                                                                //$('#email').focus();
							}
						}

						$('#loginPopupBox, #returnLoginPopupBox').fadeOut(400);
						$('#login-forgot-pwd-wrap').fadeOut(400);
						$('#login-pwd-email-sent').fadeOut(400);
						$("#popup_overlay").fadeIn(200);
						break;
					case 'popup_overlay':
						$('#loginPopupBox, #registerPopupBox, #returnLoginPopupBox, #appyHomesBox, #login-forgot-pwd-wrap, #login-pwd-email-sent, #register_true_popup_box, #add_popup, #otp_box, #testimonialBox, #trackyourorderBox, #offerPopups').fadeOut("slow");
						$(".btn").removeClass("loading");
						$(".btn").removeAttr("disabled");
						$( '.mini_cart .tabs a' ).removeClass( 'active' );
						$( '.mini_cart .tabs a:eq(0)' ).addClass( 'active' );
						$( '#pin_check_error' ).slideUp();
						$('.header_tab.loggedin').removeClass('active');
						if( ( $( '#getQuote' ).length > 0 ) && ( $.trim( $( '#getQuote' ).val().replace(/[^a-zA-Z\s]/g,'')).toLowerCase() == 'please wait' ) ) {
							$( '#getQuote' ).val( 'SUBMIT DETAILS & GET QUOTE' );
							$('#getQuote').removeClass('disabled');
							$('#getQuote').removeAttr('disabled');
						} else {
							x.resetForm();
							$( '#getQuote' ).val( 'SUBMIT DETAILS & GET QUOTE' );
							$('#getQuote').removeClass('disabled');
							$('#getQuote').removeAttr('disabled');
						}
						$('#menuTransOverlay').hide();
						$(this).fadeOut("slow");
						$( '#FUPopupLink' ).hide();
						break;
					case 'appyHomesPopupLink':
						$('#loginPopupBox').fadeOut(400);
						$('#registerPopupBox').fadeOut(400);
						$('#returnLoginPopupBox').fadeOut(400);
						$('#login-forgot-pwd-wrap').fadeOut(400);
						$('#login-pwd-email-sent').fadeOut(400);
						if(!$('#appyHomesBox').is(':visible')){
							$('#appyHomesBox').fadeToggle( "slow", "linear" );
						}
						$("#popup_overlay").fadeIn(200);
						break;
					case 'register_true_popup':
						$('#loginPopupBox').fadeOut(400);
						$('#registerPopupBox').fadeOut(400);
						$('#returnLoginPopupBox').fadeOut(400);
						$('#login-forgot-pwd-wrap').fadeOut(400);
						$('#login-pwd-email-sent').fadeOut(400);
						$('#appyHomesBox').fadeOut(400);
						if(!$('#register_true_popup_box').is(':visible')){
							$('#register_true_popup_box').fadeToggle( "slow", "linear" );
						}
						$("#popup_overlay").fadeIn(200);
						break;
					case 'footer_testimonial':
							$('body').addClass('active');              
                    case 'footer_testimonial2':
                                            
						if (loginFlag) {
							$("#testimonialBox").fadeIn(100);
							$("#popup_overlay").fadeIn(200);
							x.capchacountajax('testimonial_form','data'); //ajax call for count no attempt on testimonial page
						} else {
							$('#registerPopupBox, #returnLoginPopupBox, #login-forgot-pwd-wrap, #appyHomesBox').hide();
							$('#login-normal').fadeIn(400);
							$('#loginPopupBox').fadeIn(400);
							x.capchacountajax('login_popup_login_form','login'); //ajax call for count no attempt on testimonial page
							$("#popup_overlay").fadeIn(200);
							utils.d.cookie = 'testimonial_cookie=1';
							$("#login-normal [name='logSubmit']").removeAttr('disabled');
						}
						break;
					default:
						break;
				}
			},
			commonPopUpClass: function (event) {
				var _class = $(event.target).attr('class');
				if (_class === undefined) {
					return false;
				}

				if (_class.indexOf('popup-close') >= 0) {
					$('#loginPopupBox, #registerPopupBox, #returnLoginPopupBox, #appyHomesBox #login-forgot-pwd-wrap, #login-pwd-email-sent, #register_true_popup_box, #add_popup, #otp_box, #testimonialBox, #trackyourorderBox, #offerPopups,#FUPopupLink').fadeOut("slow");
					$('body').removeClass('active');
					$('.acct_links').removeClass('active');
					$(".btn").removeClass("loading");
					$(".btn").removeAttr("disabled");
					$('#popup_overlay').fadeOut("slow");
					$("#captchwidget").empty('');

					if( ( $( '#getQuote' ).length > 0 ) && ( $.trim( $( '#getQuote' ).val().replace(/[^a-zA-Z\s]/g,'')).toLowerCase() == 'please wait' ) ) {
						$( '#getQuote' ).val( 'SUBMIT DETAILS & GET QUOTE' );
						$('#getQuote').removeClass('disabled');
						$('#getQuote').removeAttr('disabled');
					} else {
						if(!($('#ckShippingAddress').length>0)) {
							x.resetForm();
		                }
						$( '#getQuote' ).val( 'SUBMIT DETAILS & GET QUOTE' );
						$('#getQuote').removeClass('disabled');
						$('#getQuote').removeAttr('disabled');
					}
				} else if (_class.indexOf('popup-forgot-password') >= 0) {
					$('#registerPopupBox, #returnLoginPopupBox, #appyHomesBox, #login-pwd-email-sent, #register_true_popup_box').fadeOut(400);
					$("#popup_overlay").fadeIn(400);
					$('#loginPopupBox').fadeIn(400);
					$('#login-normal').hide();
					$('#FUPopupLink').hide();
					$('#login-forgot-pwd-wrap').fadeIn(400);
                                       x.resetForm();
                            } else if (_class.indexOf('popup-register') >= 0) {
					$('#loginPopupBox, #returnLoginPopupBox').fadeOut(400);
					if(utils.readCookie('otp_box_show') == '1') {
						if(!$('#otp_box').is(':visible')){
							$('#otp_box').fadeToggle( "slow", "linear" );
                                                        $("#popup_overlay").fadeIn(400);
						}
						$("div.otp-modal").fadeIn(100);
						block_reg_popup=true;
					}else{
						$('#registerPopupBox').fadeIn(400);
                                                $("#popup_overlay").fadeIn(400);
					}
                                        x.resetForm();
				} else if (_class.indexOf('popup-login') >= 0) {
                                    $('#registerPopupBox, #returnLoginPopupBox, #login-forgot-pwd-wrap,#login-pwd-email-sent, #appyHomesBox').hide();
                                    $('#login-normal').fadeIn(400);
                                    $('#loginPopupBox').fadeIn(400);
                                    $("#popup_overlay").fadeIn(400);
                                    x.capchacountajax('login_popup_login_form','login'); //ajax call for count no attempt on testimonial page
                                    $("#login-normal [name='logSubmit']").removeAttr('disabled');
                                  x.resetForm();	
                            } else if (_class.indexOf('register_true_popup') >= 0){
                                        $('#loginPopupBox').fadeOut(400);
                                        $('#registerPopupBox').fadeOut(400);
                                        $('#returnLoginPopupBox').fadeOut(400);
                                        $('#login-forgot-pwd-wrap').fadeOut(400);
                                        $('#login-pwd-email-sent').fadeOut(400);
                                        $('#appyHomesBox').fadeOut(400);
                                        if(!$('#register_true_popup_box').is(':visible')){
                                                $('#register_true_popup_box').fadeToggle( "slow", "linear" );
                                        }
                                        $("#popup_overlay").fadeIn(200);
                                } else if (_class.indexOf('registerPopupLink') >= 0){
                                        $('#megamenu').removeClass('menu-hovered').hide();
                                        if(utils.readCookie('otp_box_show') == '1') {
							$('#otp_box').fadeIn(300);
							$("div.otp-modal").fadeIn();
							block_reg_popup=true;
						} else {
							if(!$('#registerPopupBox').is(':visible')){
                                                            $('#registerPopupBox').fadeToggle( "slow", "linear" );
                                                            $('#email').focus();
							}
						}

						$('#loginPopupBox, #returnLoginPopupBox').fadeOut(400);
						$('#login-forgot-pwd-wrap').fadeOut(400);
						$('#login-pwd-email-sent').fadeOut(400);
						$("#popup_overlay").fadeIn(200);
                                  }else if (_class.indexOf('trackyourorderPopup') >= 0){
                                        if (typeof loginFlag !== 'undefined' && loginFlag) {
                                            $('#registerPopupBox, #returnLoginPopupBox, #login-forgot-pwd-wrap, #appyHomesBox').hide();
                                            utils.w.location.href=root_url+"/customer_trackorder/trackOrderDetails";
                                        } else {
                                            $("#trackyourorderBox").fadeIn('slow');
                                            $("#popup_overlay").fadeIn(200);
                                        }
                                  }else if(_class.indexOf('footer_testimonial') >= 0){
                                        if (loginFlag) {
							$("#testimonialBox").fadeIn(100);
							$("#popup_overlay").fadeIn(200);
                                        } else {
                                                $('#registerPopupBox, #returnLoginPopupBox, #login-forgot-pwd-wrap, #appyHomesBox').hide();
                                                $('#login-normal').fadeIn(400);
                                                $('#loginPopupBox').fadeIn(400);
                                                $("#popup_overlay").fadeIn(200);
                                                utils.d.cookie = 'testimonial_cookie=1';
                                                $("#login-normal [name='logSubmit']").removeAttr('disabled');
                                        }
                                  }
                        },
			closeModals: function () {
				$(utils.d).on('keydown', function (e) {
					if (e.keyCode === 27) { // ESC
						$('#loginPopupBox, #registerPopupBox, #returnLoginPopupBox, #appyHomesBox, #login-forgot-pwd-wrap, #login-pwd-email-sent, #register_true_popup_box, #add_popup, #otp_box, #testimonialBox, #offerPopups, #trackyourorderBox').fadeOut(400);
						$(".btn").removeClass("loading");
						$(".btn").removeAttr("disabled");
                                                $('.header_tab.loggedin').removeClass('active');
						x.resetForm();
					}
				});
			},
			resetForm: function(){
                            if( $( 'form.popup-controls' ).length > 0 ) {
					$( 'form.popup-controls' ).each(function() {
						var id = $( this ).attr( 'id' );
						$( '#' + id )[ 0 ].reset();
						x.resetSelect2(id);
					});

					$( '.error-text' ).each(function() {
						$( '.error-text' ).hide();
						$( '.errormsg' ).hide();
						$( '.error-msg' ).hide();
					});
                                        $('form div').removeClass('frm-error-wrap');
                                        $('form div').removeClass('frm-success-wrap');
                                        
				}
			},
			resetSelect2 : function( id ) {
				$( '#' + id + ' select' ).each(function() {
					if($( this ).attr('id') !== 'country') {
                                            var _defaultValue = $( this ).find( ' option:eq(0)' ).val();  
                                        } else {
                                            var _defaultValue = 'IN';
                                            $(this).trigger('change');
                                        } 
					var selectID = $(this).attr('id');
                                        if ($.fn.select2) {
                                            $( '#s2id_' + selectID ).select2( 'val', _defaultValue );
                                        }
				});
			},
			checkOOS : function(){
				return true;
			},
			resetUser : function( is_checkout ){
				// if the user is on order summary page and any item in the cart is OOS, return false.
				if(is_checkout == 1) {
					//if(x.checkOOS() == false) {
					//	return false;
					//}
					if($('#cartitem .order_row_ofs').length > 0){
						return false;
					}
				}
				$("#login_error").html('');
				//$("#login_error").hide();
				if( $.trim(customer_email) != "") {
						$('.login-y-state-container').show();
						$('.login-y-state-container-hidden').hide();
						$('#password').val('');
						$("#emailhidden").val($.trim(customer_email));
						$('#customer-email').show();
						$('#emailid').val('');
						$('#emailid').hide();
						$('#emailhidden').show();
						$('#li-reauth-msg').show();
						$('#li-edit-msg').hide();
						$('#password').focus();
				}
				$("#loginBox").fadeIn(50);
				$('#popup_overlay').addClass('active');
			},
			header_scripts : function (id, event, function_name, eventBubbleOrCapture) {
				eventBubbleOrCapture = eventBubbleOrCapture || false;
				utils.addListener($(id), event, function_name, eventBubbleOrCapture);
			},
			/*Function to get megamenu from ajax and store it into browser local storage*/
			getMenus: function () {
				var _url = root_url + '/site_page/getMenus';

				utils.makeRequest( _url, 'POST', {}, x.handleMenuResponse, x.handleError );
			},
			handleMenuResponse : function( data ) {
				var isStorable = false;

				/*remove existing menus*/
				if ($("#megamenu").length > 0) {
					$("#megamenu").html("");
				}

				/*check whether storage is supported to browser*/
				if (typeof (Storage) !== "undefined") {
					isStorable = true;
					localStorage.setItem("megamenu.expire", new Date().getTime());
				}

				$.each(data, function (key, value) {
					/*insert the submenu to it's location */
					$(".menu_wrapper ul li a").each(function () {
                                            var menu_name = $(this).attr("rel");
                                            if (typeof menu_name !== 'undefined' && menu_name !== null) {    
						var first_part_name = menu_name.split("nav_");
						var name_to_match = first_part_name[1].toLowerCase();
						if (key == name_to_match) {
							if (isStorable) {
								localStorage.setItem("megamenu." + key, value);
							}
							$("#megamenu").append(value);
							return false;
						}
                                            }    
					});
				});
			},
			/* Function for header search
			 *
			 * @param {type} None
			 * @returns {None}
			 */
			headerSearch: function () {
				$('#search').on('blur', function () {
                                    if ($(this).val() != '') {
                                            $(this).addClass('focused');
                                    }

                                    if ($(this).val() == '') {
                                            $(this).removeClass('focused');
                                    }
				});

				$('#search').on('keyup', function (event) {
                                    var $this = $(this),
                                                    val = $this.val();

                                    if (val != '') {
                                            $this.parent().find('.clearTextBox').css('visibility', 'visible');
                                    } else {
                                            $this.parent().find('.clearTextBox').css('visibility', 'hidden');
                                    }

                                    var search_text_lenght = val.length;
                                    if (search_text_lenght > 2) {
                                            $("#searchButton").removeClass("search_box_disable");
                                            $("#searchButton").addClass("search_box_enable");
                                    }
				});

				$('.clearTextBox').on('click', function () {
					$(this).parent().parent().find('input').val('');
					$(this).css('visibility', 'hidden');
					$("#searchButton").removeClass("search_box_enable");
					$("#searchButton").addClass("search_box_disable");
					$('#search').focus();
				});

				$('#searchButton').click(function () {
					if ($('#search').val().length > 1) {
                                            $('#search_mini_form').submit();
					}
				});
			},
			/* Function for header search init auto complete
			 *
			 * @param {type} None
			 * @returns {Boolean}
			 */
			initAutoComplete: function () {
				var sterm, fterm, regX;
				var isHoverSelect = false;

				if ($("#search").length > 0) {
					$("#search").autocomplete({
						delay: 0,
						minLength: 3,
						appendTo: "#site_auto_suggest",
						source: root_url + "/site_product/product_search/",
						select: function (event, ui) {
                                                        //Below line added by Shreenivas M for auto suggestion parameter
                                                        $("#search_mini_form #search_as").val(1);
							if ($('a.ui-state-focus').find('.pop_prod_item').length > 0) {
								utils.w.location = $('a.ui-state-focus').find('.pop_prod_item').attr('rel');
								return false;
							} else {
								if ($('a.ui-state-focus').find('.noselect').length > 0) {
									if ($('a.ui-state-focus').find('.noselect.category').length > 0 || $('a.ui-state-focus').find('.noselect.brands').length > 0) {
										$("#search").val(ui.item.label);

										if (ui.item.hasOwnProperty('category_id')) {
											$('#cat').val(ui.item.category_id);
										} else {
											$('#cat').val("");
										}

										$('#search_mini_form').submit();
									}

									return false;
								} else {
									$("#search").val(ui.item.label);

									if (ui.item.hasOwnProperty('category_id')) {
										$('#cat').val(ui.item.category_id);
									} else {
										$('#cat').val("");
									}

									$('#search_mini_form').submit();
								}
							}

							return false;
						},
						focus: function (event, ui) {
							if (typeof event.keyCode === 'undefined' || event.keyCode == 0) {
								isHoverSelect = true;
							} else {
								isHoverSelect = false;

								if ($('a.ui-state-focus').find('.noselect').length > 0) {
									return false;
								} else {
									$("#search").val(ui.item.label);

									if (ui.item.hasOwnProperty('category_id')) {
										$('#cat').val(ui.item.category_id);
									}
								}
							}

							return false; // Prevent the widget from inserting the value.
						}
					}).data("ui-autocomplete")._renderItem = function (ul, item) {
						$("#cat").val("");

						return $("<li></li>")
								.data("item.autocomplete", item)
								.append("<a>" + item.value + "</a>")
								.appendTo(ul);
					};
				}
			},
			/**
			 * Validation  for login popup , checkout login popup and mregSignin popup
			 * used in : loginPopup.phtml , checkoutLogin.phtml , mregSigninSignup.phtml
			 * @param {type} Form Id
			 * @returns {Boolean}
			 */
			addBlueButtonLoader : function( form_id ) {
				$( "#" + form_id + " .btn-blue" ).addClass( "btn-loader" );
			},
			removeBlueButtonLoader : function( form_id ) {
				$( "#" + form_id + " .btn-blue" ).removeClass( "btn-loader" );
			},
                        hideGenderErr:function(){
                            $(this).closest("form").find("#genderErr").hide();
                        },
                        validateForm:function(event,formId){
                          var error=false;
                          var obj = {}
//                           obj.email= /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//                           obj.phone= /[0-9]{10,12}/;
//                           obj.name= /[a-zA-Z']+/;
//                           obj.password= /[^\s]{6,20}/;
                            obj={
                                validReg:{
                                    email:/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
                                    phone: /^[0-9]{10}$/,
                                    landline: /^[0-9]{11}$/,
                                    pincode: /^[1-9][0-9]{5}$/,
                                    advPhone: /^[1-9][0-9]{9}$/,
                                    name:/^[a-z\sA-Z]+$/,
                                    fname:/^[a-z\sA-Z]+$/,
                                    lname:/^[a-z\sA-Z]+$/,
                                    password: /^[^\s]{6,20}$/,
                                    passwordMreg: /^[^\s]{6,20}$/,
                                    confirmPassword: /^[^\s]{6,20}$/
                                },
                                errorMsg:{
                                    email:'Enter a valid Email ID',
                                    phone: 'Need a valid 10-digit number',
                                    landline:'Need a valid 11-digit number',
                                    advPhone: 'Number can\'t start with 0',
                                    password: 'Needs to be 6-20 characters',
                                    passwordMreg: 'Needs to be 6-20 characters',
                                    name: 'Enter a valid name',
                                    fname: 'Enter a valid First name',
                                    lname: 'Enter a valid Last name',
                                    pincode: 'Needs to be 6 digit numeric value',
                                    confirmPassword:'Password Don\'t match',
                                    defaultMsg: 'Required'
                                }
                            }
                            if(typeof formId!=="undefined"){
                                var ObjArr =  $('#'+formId+' [validate="1"]');
                                 $(ObjArr).each(function(){
                                     var currentValue=$.trim($(this).val());
                                     if(currentValue==''){
                                        error=true;
                                        $(this).parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
                                         $(this).siblings('.error-msg').html(obj['errorMsg']['defaultMsg']).css( "display", "block" );  
                                     }else if($(this).attr("data-valid-attr")=='' || typeof($(this).attr("data-valid-attr"))==="undefined"){
                                        $(this).parent('div').addClass('frm-success-wrap').removeClass('frm-error-wrap');
                                         $(this).parent('div').removeClass('frm-error-wrap');
                                        $(this).siblings('.error-msg').html(obj['errorMsg']['defaultMsg']).css( "display", "none" ); 
                                     }else {
                                     var validationType=$(this).attr("data-valid-attr");
                                     var phoneError=false;
                                     if(typeof obj['validReg'][validationType]!=="undefined"){
                                         if(obj['validReg'][validationType].test(currentValue) == false){
                                              if(validationType=="phone"){
                                                  phoneError=true;
                                              }
                                              if(validationType=="landline"){
                                                  phoneError=true;
                                              }
                                            error=true;
                                            $(this).parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
                                             if(typeof obj['errorMsg'][validationType]!=="undefined") {
                                                $(this).siblings('.error-msg').html(obj['errorMsg'][validationType]).css( "display", "block" );
                                            }else{
                                                 $(this).siblings('.error-msg').css( "display", "block" );
                                             }
                                         }else{
//                                            $(this).parent('div').addClass('frm-success-wrap').removeClass('frm-error-wrap');
                                             $(this).parent('div').removeClass('frm-error-wrap');
                                             $(this).siblings('.error-msg').css( "display", "none" ); 
                                         }
                                             
                                         if(validationType=='password' && !error){
                                             var currentId=$(this).attr('id');
                                             if(currentId=='password2'){
                                                var password=$("#password1").val();
                                                var confirmPassword=$("#password2").val();
                                                if(password!=confirmPassword){
                                                      error=true;
                                                       $('#confirmMsg').html(obj['errorMsg']['confirmPassword']).css( "display", "block" );
                                                        $('#confirmMsg').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
                                                }
                                                 
                                             }
                                         }
                                         if(validationType=='passwordMreg' && !error){
                                             var currentId=$(this).attr('id');
                                             if(currentId=='password2-mreg'){
                                                var password=$("#password1-mreg").val();
                                                var confirmPassword=$("#password2-mreg").val();
                                                if(password!=confirmPassword){
                                                      error=true;
                                                       $('#confirmMsg-mreg').html(obj['errorMsg']['confirmPassword']).css( "display", "block" );
                                                        $('#confirmMsg-mreg').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
                                                }
                                                 
                                             }
                                         }
                                         //for extra validation for phone
                                          if(validationType=="phone" && !phoneError){
                                             validationType="advPhone";
                                             if(obj['validReg'][validationType].test(currentValue)==false){
                                                error=true;
                                                $(this).parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
                                                if(typeof obj['errorMsg'][validationType]!=="undefined") {
                                                   $(this).siblings('.error-msg').html(obj['errorMsg'][validationType]).css( "display", "block" );
                                                }else{
                                                    $(this).siblings('.error-msg').css( "display", "block" );
                                                }  
                                             }
                                         }
                                         
                                         
                                     }
                                     }
                                 });
                            }else{
                                var validateFlag=$(this).attr("validate");
                                var validationType=$(this).attr("data-valid-attr");

                                var currentValue=$.trim($(this).val());
                                if(validationType=="password"){
                                    $("#confirmMsg").hide();
                                }
                                if(validationType=="passwordMreg"){
                                    $("#confirmMsg-mreg").hide();
                                }
                               
                                if(validateFlag==1){
                                    var currentValue=$.trim($(this).val());
                                    
                                    if(currentValue==""){
                                          error=true;
                                        $(this).parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
                                        $(this).siblings('.error-msg').html(obj['errorMsg']['defaultMsg']).css( "display", "block" );   
                                     }else if(typeof obj['validReg'][validationType] !=="undefined"){
                                         if(obj['validReg'][validationType].test(currentValue) == false){
                                             error=true;
                                             $(this).parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
                                             if(typeof obj['errorMsg'][validationType]!=="undefined") {
                                                $(this).siblings('.error-msg').html(obj['errorMsg'][validationType]).css( "display", "block" );
                                             }else{
                                                 $(this).siblings('.error-msg').css( "display", "block" );
                                             }
                                         }
                                         
                                         if(validationType=='password' && !error){
                                             var currentId=$(this).attr('id');
                                             if(currentId=='password2'){
                                                var password=$("#password1").val();
                                                var confirmPassword=$("#password2").val();
                                                if(password!=confirmPassword){
                                                      error=true;
                                                       $(this).siblings('.error-msg').html(obj['errorMsg']['confirmPassword']).css( "display", "block" );
                                                        $(this).parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
                                                 }
                                                 
                                             }
                                         }
                                         if(validationType=='passwordMreg' && !error){
                                             var currentId=$(this).attr('id');
                                             if(currentId=='password2-mreg'){
                                                var password=$("#password1-mreg").val();
                                                var confirmPassword=$("#password2-mreg").val();
                                                if(password!=confirmPassword){
                                                      error=true;
                                                       $(this).siblings('.error-msg').html(obj['errorMsg']['confirmPassword']).css( "display", "block" );
                                                        $(this).parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
                                                 }
                                                 
                                             }
                                         }
                                         if(validationType=="phone" && !error){
                                             if(obj['validReg']['advPhone'].test(currentValue)==false){
                                                error=true;
                                                $(this).parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
                                                if(typeof obj['errorMsg']['advPhone']!=="undefined") {
                                                   $(this).siblings('.error-msg').html(obj['errorMsg']['advPhone']).css( "display", "block" );
                                                }else{
                                                    $(this).siblings('.error-msg').css( "display", "block" );
                                                } 
                                             }
                                         }
                                     }
                                     if(!error){
                                       $(this).parent('div').addClass('frm-success-wrap').removeClass('frm-error-wrap');
                                       $(this).siblings('.error-msg').css( "display", "none" );
                                     }
                                }
                            }

                            if($('.ck-forgot-email-sub-text').is(':visible')){
                            	$('.ck-forgot-email-sub-text').hide();
                            }
                            return error;
                        },
                        formValidationInc:function(formId){
                        formId=$.trim(formId)
                        var error=x.validateForm("",formId);
                        var registrationForm=false;
                        
                       if(formId=="dedicated-signup-form" || formId=="popup_reg_form" || formId=="signup-form"){
                         if($("#"+formId+" input[name='gender']").is(":checked")===false){
                                error=true;
                                $("#"+formId+" #genderErr").show();
                            }
                            registrationForm=true
                        }
                        if(!error) {
                            if(registrationForm){
                                   x.submitRegistration(formId);
                            }else{
                             $("#"+formId+" div").removeClass("frm-success-wrap");
                             if(recaptcha == 'INVISIBLE'){
                             	grecaptcha.execute(widgetId_dedicated_login);
                             }else{
                             	x.loginSubmit(formId);                                    //call for ajax submit
                             }
                         }
                                    return false;
                         }else{
                             $("#errormsgTop").html("Please correct the fields marked in red below").show();
                         }
                            
                        },
			loginValidation: function(formId) {
                            formId=$.trim(formId);
                            var error=x.validateForm("",formId);
							if(recaptcha == 'VISIBLE'){
		                        //Captcha Validation Code Start				
		                        if ($('#'+formId+' #RecaptchaField-login').length) {
		                            var data = $("#"+formId+" #RecaptchaField-login").attr('submit_count');
		                            if ($.trim(grecaptcha.getResponse(widget_lgn)) === '' && data >=2){ 
		                                $("#"+formId+" #captchaError").html('Please re-enter your reCAPTCHA.').show();
		                                error = true;
		                            }
		                        }
		                        //Captcha Validation Code End
								if(!error) {
									x.loginSubmit(formId); //call for ajax submit
								}else{
		                            if ($('#'+formId+' #RecaptchaField-login').length) {
		                                grecaptcha.reset(widget_lgn)
		                            }
								}
							}else{
								if(formId == "login_popup_login_tyo_form"){
									if(!error) {
										grecaptcha.execute(widgetId_tyo_login);
									}else{
										grecaptcha.reset(widgetId_tyo_login);
									}
								}else if(formId == "login_popup_login_form" && $current != '/customer/checkoutlogin'){
	                            	if(!error) {
	                            		$('#recap').val(1);
										grecaptcha.execute(widgetId_login);
									}else{
										grecaptcha.reset(widgetId_login);
									}
								}else{
									x.loginSubmit(formId);
								}
							}
                            return false;
			},
			
			/**
			 * Ajax function for login by  login popup , checkout login popup and mregSignin popup
			 * * @param {type} Form Id
			 * @returns {Boolean}
			 */
			loginSubmit: function(form_id) {
			    var path = secure_url + '/customer/authenticate?ref=' + $current;
				var _data = $("#"+form_id).serialize();
				

				var _beforeSend = function () {
                                                                                    if (form_id =="login_login-form"){
                                                                                        $("#er_login_form").addClass("btn-loader"); 
                                                                                    }
                                                                    	x.addBlueButtonLoader(form_id);
			    };

                                var _setUpOptions = {
                                    'dataType' : "json"
                                };

				var _params = {
				  'form_id' : form_id
				};

				utils.makeRequest( path, 'POST', _data, x.loginSubmitResponse, x.handleError, _beforeSend, _params,  _setUpOptions);
			},
			loginSubmitResponse: function( result, _params ) {
				 $("#er_login_form").removeClass("btn-loader"); 
				var data = '';
				/**
				 * Different modal forms on site send response in different formats
				 * JSON, String, Integer...
				 */
				try {
					data = $.parseJSON( result );
				} catch( error ) {
					data = result;
				}

				if(utils.isObject(data) && typeof _params.form_id !== 'undefined') {
					$.each( data, function( key, value ) {
						$("#"+_params.form_id+" span#"+key).html(value);
						$("#"+_params.form_id+" #login_error").html('');
						$("#"+_params.form_id+" #captchaError").html('');
					});
					return false;
				}

				if (recaptcha == 'VISIBLE' && $("#"+_params.form_id+' #RecaptchaField-login').length) {
                    grecaptcha.reset(widget_lgn);
                }else if(recaptcha == 'INVISIBLE') {
                	if(_params.form_id == "login_popup_login_tyo_form"){
                		grecaptcha.reset(widgetId_tyo_login);
                	}
                	else if(_params.form_id == "login_popup_login_form"){
                		grecaptcha.reset(widgetId_login);
                	}else if(_params.form_id == "login_dedicatedlogin-form"){
                		grecaptcha.reset(widgetId_dedicated_login);
                	}
                }

				if( data == "success" ) {
					$("#"+_params.form_id+" #login_error").html("");
					utils.createCookie('wishlist_flag', true);
					parent.location.reload(true);
					return false;
				} else if( data == "home_success" ) {
					utils.createCookie('wishlist_flag', true);
					self.parent.location.href= "http://" + server_name;
				} else if( data == "arch_n_design" ) {
					utils.createCookie('wishlist_flag', true);
					self.parent.location.href = root_url+"/designgurus/profile";
				} else if( data == "checkout" ) {
					utils.createCookie('wishlist_flag', true);
					self.parent.location.href = root_url+"/checkout/onepage/";
				} else if( data == "checkout_cart" ) {
					utils.createCookie('wishlist_flag', true);
					self.parent.location.href= root_url+"/checkout/cart/";
				} else if( data == "login_error" || data == "invalid_token" ) {
                                        var tempMsg="Incorrect email ID or password";
                                        if(data == "invalid_token"){
                                            tempMsg="An error has occurred. Please refresh the page and try again.";
                                        }
					
                    if(_params.form_id == "login_login-form"){
                    	if(data == "invalid_token" ){
                    		$("#"+_params.form_id+" #returnError").html(tempMsg).show();
                    	}else if(data == "login_error" ){
                    		$("#"+_params.form_id+" #initiate_login_error").html("Incorrect email ID or password").show();
		                    $("#"+_params.form_id+" #email1").parent().removeClass("frm-success-wrap");
		                    $("#"+_params.form_id+" #email1").parent().addClass("frm-error-wrap");
                    	}
	                } else{
                    	$("#"+_params.form_id+" #login_error").html(tempMsg).show();
						$("#"+_params.form_id+" [name='logSubmit']").removeAttr('disabled');
                    }

					x.removeBlueButtonLoader(_params.form_id);
				} else if( data == "captchaError" ) {
					
                                        if (recaptcha == 'VISIBLE' && $("#"+_params.form_id+' #RecaptchaField-login').length) {
                                            $("#"+_params.form_id+" #captchaError").html("Please re-enter your reCAPTCHA.").show();
                                            grecaptcha.reset(widget_lgn);
                                        }else{
                                        	$("#"+_params.form_id+" #captchaError").html("reCAPTCHA Error").show();
                                        }
					$("#"+_params.form_id+" [name='logSubmit']").removeAttr('disabled');
					x.removeBlueButtonLoader(_params.form_id);					
				}else if( data == "guest_confirm_login_success" ) {
					$( "#" + _params.form_id + " #login_error" ).html("");
					createCookie('wishlist_flag', true);
					utils.w.location.href = root_url;
				} else if( data == "trackorder" ) {
                                        self.parent.location.href = root_url+"/customer_trackorder/trackOrderDetails";
                                } else if( data == null ) {
					utils.w.location.href = root_url;
				} else {
                                        //utils.createCookie('wishlist_flag', true);
					if( location.pathname.toLowerCase().indexOf( 'carpenterrequest' ) == 1 ) {
						utils.w.location.href = root_url + '/carpenterrequest/viewlist';
					} else {
						utils.w.location.href = root_url+data;
					}
				}
				x.capchacountajax(_params.form_id,'login');  // refresh captcha at loading login popup
				return false;
			},
			/**
			 * Function for email validation for forget password
			 *
			 * @param {type} None
			 * @returns {Boolean}
			 */
			validatePassRecover: function (formflag) {
				var errors = 0;
				var emailValue = '';
				if(formflag == 0){
                                                                                errors = x.validateForm("",'reset-form');
				   emailValue = $.trim($('#reset-form #emailid_forgot').val());      
				}
				else if(formflag == 1){				    
				    errors = x.validateForm("",'reset-form-tyo');
				   	emailValue = $.trim($('#reset-form-tyo #emailid_forgot-tyo').val());                                    
				}else if(formflag == 2){
					/*adding reset form changes for checkout since header form is conflicting*/
					errors = x.validateForm("",'reset-form-checkout');
				    emailValue = $.trim($('#reset-form-checkout #emailid_forgot').val());	
				}
				else if(formflag==3){
					errors = x.validateForm("",'initiate-reset-form');
					emailValue = $.trim($('#initiate-reset-form #emailid_forgot').val());
				}

				if (!errors) {
				    x.forgetPassword(emailValue, formflag);
				}

				return false;
			},
			forgetPasswordSecondWindow: function(){
				$('#registerPopupBox, #returnLoginPopupBox, #appyHomesBox').hide();
				$('#loginPopupBox').show();
				$('#login-normal').hide();
				$('#login-forgot-pwd-wrap').hide();
				$('#login-pwd-email-sent').show();
				$("#popup_overlay").fadeIn(200);
			},
			/**
			 * Function for submit forget password from
			 * @param {type} emailValue
			 * @returns {undefined}
			 */
			forgetPassword: function (emailValue, formflag) {
				var path = secure_url + "/customer/forgetPassword";
                if(formflag == 0)
				   var _data = $("#reset-form").serialize();
                else if(formflag == 1)
                   	var _data = $("#reset-form-tyo").serialize();
                else if(formflag == 2)
                	var _data = $("#reset-form-checkout").serialize();
                else if(formflag == 3)
                	var _data = $("#initiate-reset-form").serialize();
				var _beforeSend = function () {

					$("#reset-form #retrive-pwd-btn").addClass('btn-loader');
					$("#initiate-reset-form #retrive-pwd-btn").addClass('btn-loader');
				};
                                
                var _setUpOptions = {
                    'dataType' : "json"
                };
                
                var _params = {
                    'formflag' : formflag
                };

				utils.makeRequest( path, 'POST', _data, x.forgetPasswordResponse, x.handleError, _beforeSend, _params, _setUpOptions );
			},
			forgetPasswordResponse : function( result, _params ) {
		      $("#initiate-reset-form #retrive-pwd-btn").removeClass('btn-loader');
                                var data = '';
				try {
					data = $.parseJSON( result );
				} catch( error ) {
					data = result;
				}
                if(_params.formflag == 0){
                    var emailValue = $.trim($('#reset-form #emailid_forgot').val());

                    if (data == "success") {
                            $('.ck-login-forgot-reseted-wrap,.home-login-forgot-reseted-wrap .forgotpwd').html("A link has been sent to <b>"+emailValue+"</b> to reset your password.");
                            $(".ck-login-forgot-wrap,.home-login-forgot-wrap").css('display', 'none');
                            $(".ck-login-forgot-reseted-wrap,.home-login-forgot-reseted-wrap").css('display', 'block');
                            //not required.
                            // x.forgetPasswordSecondWindow();
                            $("#reset-form #retrive-pwd-btn").removeClass('btn-loader');
                    } else if (data == "sent") {
                    	    $('.ck-login-forgot-reseted-wrap,.home-login-forgot-reseted-wrap .forgotpwd').html("Link already sent to your email");
                            $(".ck-login-forgot-wrap,.home-login-forgot-wrap").css('display', 'none');
                            $(".ck-login-forgot-reseted-wrap,.home-login-forgot-reseted-wrap").css('display', 'block');
                            $("#reset-form #retrive-pwd-btn").removeClass('btn-loader');
                    } else if (data == "token_expired") {
                            $("#email_Error_forgotpass").html("An error has occurred. Please refresh the page and try again.").addClass('error_div').show();
                            $("#reset-form #retrive-pwd-btn").removeClass('btn-loader');
                    } else {
                            $("#email_Error_forgotpass").html("This email is not registered with us!! Please Register first.").addClass('error_div').show();
                            $("#reset-form #retrive-pwd-btn").removeClass('btn-loader');
                    }
                }else if(_params.formflag == 1){
                    var emailValue = $.trim($('#reset-form-tyo #emailid_forgot-tyo').val());

                    if (data == "success") {
                            $("#success_message-tyo").html("A link has been sent to your email address to reset your password").addClass('success_msg').show();
                            $('#email-id-pwd-sent-tyo').html(emailValue);
                            $('#login-forgot-pwd-wrap-tyo').hide();
                            $('#login-pwd-email-sent-tyo').show();
                            $("#reset-form-tyo #retrive-pwd-btn-tyo").removeClass('btn-loader');
                    } else if (data == "sent") {
                            $("#email_Error_forgotpass-tyo").html("Link already sent to your email").addClass('error_div').show();
                            $("#reset-form-tyo #retrive-pwd-btn-tyo").removeClass('btn-loader');
                    } else if (data == "token_expired") {
                            $("#email_Error_forgotpass-tyo").html("An error has occurred. Please refresh the page and try again.").addClass('error_div').show();
                            $("#reset-form-tyo #retrive-pwd-btn-tyo").removeClass('btn-loader');
                    } else {
                            $("#email_Error_forgotpass-tyo").html("This email is not registered with us!! Please Register first.").addClass('error_div').show();
                            $("#reset-form-tyo #retrive-pwd-btn-tyo").removeClass('btn-loader');
                    }
                }else if(_params.formflag == 2){
                    var emailValue = $.trim($('#reset-form-checkout #emailid_forgot').val());

                    if (data == "success") {
                        $('.ck-login-forgot-reseted-wrap .forgot_password_msg').html('<span class=" pf-text-dark-grey">A link has been sent to <b>'+emailValue+'</b></span><span class=" pf-text-dark-grey">to reset your password.</span>');
                        $(".ck-login-forgot-wrap").hide();
                        $(".ck-login-forgot-reseted-wrap").show();
                        $("#reset-form-checkout #retrive-pwd-btn").removeClass('btn-loader');
                    } else if (data == "sent") {
                	    $('.ck-login-forgot-reseted-wrap .forgot_password_msg').html('<span class=" pf-text-dark-grey">Link already sent to your email.</span>');
                        $(".ck-login-forgot-wrap").hide();
                        $(".ck-login-forgot-reseted-wrap").show();
                        $("#reset-form-checkout #retrive-pwd-btn").removeClass('btn-loader');
                    } else if (data == "token_expired") {
                        $("#email_Error_forgotpass").html("An error has occurred. Please refresh the page and try again.").addClass('error_div').show();
                        $("#reset-form-checkout #retrive-pwd-btn").removeClass('btn-loader');
                    } else {
                        $("#email_Error_forgotpass").html("This email is not registered with us!! Please Register first.").addClass('error_div').show();
                        $("#reset-form-checkout #retrive-pwd-btn").removeClass('btn-loader');
                    }
                }
                else if(_params.formflag==3){
                	var emailValue = $.trim($('#initiate-reset-form #emailid_forgot').val());                	
                    if (data == "success") {
                        $('.ck-login-forgot-reseted-wrap .forgot_password_msg').html('<span class=" pf-text-dark-grey">A link has been sent to <b>'+emailValue+'</b></span><span class=" pf-text-dark-grey">to reset your password.</span>');
                        $(".ck-login-forgot-wrap").hide();
                        $(".ck-login-forgot-reseted-wrap").show();
                        $("#initiate-reset-form #retrive-pwd-btn").removeClass('btn-loader');
                    } else if (data == "sent") {
		$('.ck-login-forgot-reseted-wrap .forgot_password_msg').html('<span class=" pf-text-dark-grey">Link already sent to your email.</span>');
                        $(".ck-login-forgot-wrap").hide();
                        $(".ck-login-forgot-reseted-wrap").show();
                        $("#initiate-reset-form #retrive-pwd-btn").removeClass('btn-loader');
                    } else if (data == "token_expired") {
                        $("#email_Error_forgotpass").html("An error has occurred. Please refresh the page and try again.").addClass('error_div').show();
                        $("#initiate-reset-form #retrive-pwd-btn").removeClass('btn-loader');
                    } else {
                        $("#email_Error_forgotpass").html("This email is not registered with us!! Please Register first.").addClass('error_div').show();
                        $("#email_Error_forgotpass").parent().removeClass('frm-success-wrap');
                        $("#email_Error_forgotpass").parent().addClass('frm-error-wrap');
                        $("#initiate-reset-form #retrive-pwd-btn").removeClass('btn-loader');
                    }
                }
			},
                        againForgotPass : function(){
                            $('#login-pwd-email-sent-tyo').hide();
                            $('#login-forgot-pwd-wrap-tyo').show(400);
                            
                        },
			resetPassword: function () {
				var rx = /^\S+$/;
				var errors = 0;
				$("#reset_password_button").attr('disabled', 'disabled').addClass('btn-loader');
                                                                                   $("#password_reset_form #login-pg-reset-pwd-submit").addClass('btn-loader');
                                                                                    
				if ($.trim($("#password_reset_form #password").val()) == "") {
					$("#Pass").css('display', 'block').parent().addClass('input_error');
					errors = 1;
				} else if (rx.test($("#password_reset_form #password").val()) == false) {
					$("#Pass").css('display', 'block').html('Invalid Password').parent().addClass('input_error');
					errors = 1;
				} else if (($.trim($("#password_reset_form #password").val()).length < 6) || ($.trim($("#password_reset_form #password").val()).length > 20)) {
					$("#Pass").html('Needs to be 6-20 characters');
					$("#Pass").css('display', 'block').parent().addClass('input_error');
					errors = 1;
				} else {
					$("#Pass").css('display', 'none').parent().removeClass('input_error');
				}

				if ($.trim($("#password_reset_form #conpassReset").val()) == "") {
					$("#conPass").css('display', 'block').parent().addClass('input_error');
					errors = 1;
				} else if ($.trim($("#password_reset_form #conpassReset").val()) != $.trim($("#password_reset_form #password").val())) {
					$("#conPass").css('display', 'block').parent().addClass('input_error');
                                                                                                       errors = 1;
                                                                                                        
				} else {
					$("#conPass").css('display', 'none').parent().removeClass('input_error');
				}

				if (errors == 0) {
                                                                                                        $("#reset_password_button").removeAttr('disabled');
                                                                                                         $("#password_reset_form #login-pg-reset-pwd-submit").addClass('btn-loader');
					return true;
				} else {
                                                                                                        $("#password_reset_form #login-pg-reset-pwd-submit").removeClass('btn-loader');
					$("#reset_password_button").removeAttr('disabled').removeClass('btn-loader');
					return false;
				}
			},
			/**
			 * Function for Y state login to enter different email id.
			 */
			changeEmail: function(event){
                          
                          $(event).hide().siblings(".inpt").removeClass('disabled');
                          $(event).siblings(".login-popup-y-state-info").hide();
                          $(event).siblings(".login-popup-y-state-info-edit").show();
//        $(event).parents('.edit-info-sec').find('.pf-btn').removeClass("disabled").addClass("pf-hover-primary-color");
//				$('.login-y-state-container').hide();
//				$('.login-y-state-container-hidden').show();
//				//$('#emailid').val('');
//				$('#emailid').show();
//				$('#emailid').focus();
//				$('.login-popup-y-state-info').fadeIn(400);
//
//				$('#li-reauth-msg').slideUp(400, function() {
//					setTimeout(function() {
//						$('#li-edit-msg').slideDown(400);
//					},400);
//				});
			},
			editEmail: function(event){
 			  $(event).hide().siblings(".inpt").removeClass('disabled');
              $(event).parent().siblings(".y-state-info-row").find(".login-popup-y-state-info").hide();
              $(event).parent().siblings(".y-state-info-row").find(".login-popup-y-state-info-edit").show();
            },
			/**
			 * Customer registration from validation for normal registration popup and mreg signup popup
			 *
			 * @param {type} element_id, element_name
			 * @returns {Boolean}
			 */
			registerValidation: function (element_id, element_name) {


				var form_id 	= $.trim(element_id);
                var error 		= x.validateForm("",form_id);
                
                if($("#"+form_id+" input[name='gender']").is(":checked")===false){
                     error=true;
                     $("#"+form_id+" #genderErr").show();
                }

                if(element_id == "popup_guest_reg_frm" && !$("#" + form_id + " #guestCheck").is(':checked')){

                	var password 		=	$("#"+form_id+" #password1").val();
                    var confirmPassword =	$("#"+form_id+" #password2").val();

                    if(password==confirmPassword){
                      $("#"+form_id+" div").removeClass("frm-success-wrap");
                    }else{
                        $("#"+form_id+" #password2").parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
                        $("#"+form_id+" #password2").siblings().show();
                        error = 1;
                    }
                }

				if (!error) {

					var page = $("#" + form_id + " #page").val();
					if (page == "basic") {
						//_gaq.push(['_trackEvent', 'registration', 'login']);
						return true;
					} else {

						//_gaq.push(['_trackEvent', 'registration', 'login']);
						if(element_name == "myRegFrom"){
						
						  	x.submitRegistration(form_id);

						} else if(element_name == "myCOFrom") {
						
							  if(!$("#" + form_id + " #guestCheck").is(':checked')) {
								  //_gaq.push(['_trackEvent', 'registration', 'login']);
								  x.checkoutSubmit(1,form_id);
							  } else {
								  x.checkoutSubmit(0,form_id);
							  }
						}
					}
				}
				return false;
			},
			/**
			 * Ajax function to save customer info for normal registration popup and mreg signup popup
			 *
			 * @param {type} form_id
			 * @returns {Boolean}
			 */
			submitRegistration: function (form_id) {
				var path = secure_url + '/customer/ajax_register?current=' + $current;
				var _data = $("#" + form_id).serialize();

				var _beforeSend = function () {
					$("#" + form_id + " .btn").attr('disabled', 'disabled');
					x.addBlueButtonLoader(form_id);
			    };

                                var _setUpOptions = {
                                    'dataType' : "json"
                                };

				var _params = {
				  'form_id' : form_id
				};

				utils.makeRequest( path, 'POST', _data, x.registerSubmitResponse, x.handleError, _beforeSend, _params, _setUpOptions);
			},
			registerSubmitResponse : function( result, _params ) {
                                var data = '';
				/**
				 * Different modal forms on site send response in different formats
				 * JSON, String, Integer...
				 */
				try {
					data = $.parseJSON( result );
				} catch( error ) {
					data = result;
				}
				$("#" + _params.form_id + " #error_msg").html('');

				if (utils.isObject(data) && typeof _params.form_id !== 'undefined') {
					$("#" + _params.form_id + " .btn").removeAttr("disabled");

					$.each(data, function (key, value) {
						$("#" + _params.form_id + ' span#' + key).html(value);
                                                $("#" + _params.form_id + ' span#' + key).show();
						$("." + key).html('');
					});

					x.removeBlueButtonLoader(_params.form_id);
				} else if (data == "success" || data == "guest_register_success") {
					$("#" + _params.form_id + " .error_msg").html('');

					if (first_event == true) {
						utils.pushToDataLayer({
							'category': 'reg_modal',
							'action': 'click_submit',
							'label': 'success_reg',
							'event': 'legacyevent'
						});
						first_event = false;
					}
                                        utils.createCookie("frgpx",1,30);
					utils.createCookie('wishlist_flag', true);
                                        if (data == "success") {
                                            parent.location.reload(true);
                                        } else {
                                            utils.w.location.href = root_url; // redirect user to homepage in case of register from order confirmation page
                                        }
				} else if (data == "Email") {
					$("#" + _params.form_id + " #logSubmit").removeAttr("disabled");
					$("#" + _params.form_id + " #error_msg").html("Email already exists");
				} else if (data == "Mobile") {
					$("#" + _params.form_id + " #logSubmit").removeAttr("disabled");
					$("#" + _params.form_id + " #error_msg").html("Mobile already exists");
				} else if (data == "Email_mobile") {
					$("#" + _params.form_id + " #logSubmit").removeAttr("disabled");
					$("#" + _params.form_id + " #error_msg").html("Email and mobile are already exists.");
				} else if(data == "otp_verification") {
					$("#"+ _params.form_id +" #logSubmit").removeAttr("disabled");
					var mobile_otp_number=$('#'+ _params.form_id +' #mobile').val();
					utils.pushToDataLayer({
						'category' : 'RegOTP',
						'action': 'Open',
						'label' : 'Non_checkout',
						'opt' : true,
						'event' : 'legacyevent'
					});

					x.OTPVarification(_params.form_id,mobile_otp_number);
				} else {
					if (first_event == true) {
							utils.pushToDataLayer({
								'category': 'reg_modal',
								'action': 'click_submit',
								'label': 'success_reg',
								'event': 'legacyevent'
							});
							first_event = false;
					}

					utils.pushToDataLayer({
						'category': 'registration',
						'action': 'login',
						'event': 'legacyevent'
					});
                                        utils.createCookie("frgpx",1,30);
					x.removeBlueButtonLoader(_params.form_id);
					utils.w.location.href = root_url + data;
				}
			},
                        thankYouBoxAfterRegistration : function(){
                            if(parseInt(utils.readCookie('frgpx')) == 1){
                                    if(utils.d.location.protocol == 'https:'){
                                        var google_conversion_id = 1012760616;
                                        var google_conversion_language = "en";
                                        var google_conversion_format = "3";
                                        var google_conversion_color = "ffffff";
                                        var google_conversion_label = "wBKZCIjoywIQqID24gM";
                                        var google_conversion_value = 0;
                                        /* ]]> */

                                        var script = document.createElement('script');
                                        script.src = '//www.googleadservices.com/pagead/conversion.js';
                                        utils.d.documentElement.firstChild.appendChild(script);

                                        //Non checkout Registration pixel
                                        utils.pushToDataLayer({'category' : 'Registration', 'action': 'Signup', 'label' : 'Non_checkout', 'opt' : true, 'event' : 'legacyevent'});
                                        $("#offerPopups").fadeIn('slow');
                                        $('#popup_overlay').show(400);
                                        utils.createCookie('frgpx',0,-1);
                                    }
                            }
                            if (typeof show_reg_popup !== 'undefined' && show_reg_popup==true)
                            {
                                        setTimeout(function() {
                                                        if (typeof block_reg_popup !=='undefined')
                                                        {
                                                                show_reg_popup=false;
                                                        }
                                                        else
                                                        {
                                                                var date = new Date();

                                                                var date_value=new Date();




                                                                var cookie_data_counter= utils.readCookie('popup_counter');
                                                                var cookie_data_date=utils.readCookie('popup_date');
                                                                var dt = new Date(cookie_data_date);

                                                                var new_counter=1;

                                                                if(cookie_data_counter && cookie_data_counter > 0)
                                                                {
                                                                        if(cookie_data_counter==3) // 3rd day
                                                                        {
                                                                                if(cookie_data_date)
                                                                                {
                                                                                        var hours = Math.abs(date_value.getTime() - dt.getTime()) / 3600000;
                                                                                        //hours=97;
                                                                                        if(hours <=96 )
                                                                                        {
                                                                                                show_reg_popup=false;
                                                                                                new_counter=3;
                                                                                        }
                                                                                        else
                                                                                        {
                                                                                                new_counter=4;
                                                                                        }
                                                                                }
                                                                        }
                                                                        else if(cookie_data_counter==4) // after 96 hours reset it to 1
                                                                        {
                                                                                new_counter=1;
                                                                        }
                                                                        else
                                                                        {
                                                                                if(parseInt(cookie_data_counter) > 0)
                                                                                {
                                                                                        new_counter=parseInt(cookie_data_counter) + 1;
                                                                                }
                                                                                else
                                                                                {
                                                                                        new_counter=2;
                                                                                }
                                                                        }
                                                                }
                                                                
                                                                if(show_reg_popup==true && !(utils.readCookie('display_popup')))
                                                                {       
                                                                        first_event = true;
                                                                        if(!$('#loginPopupBox').is(':visible'))
                                                                            x.openModel('registerPopupBox','');
                                                                        show_reg_popup=false;
                                                                        //$("#signupBox").fadeIn(50);
                                                                        utils.pushToDataLayer({'category' : 'reg_modal', 'action': 'modal_launch', 'label' : 'modal_open', 'opt' : true, 'event' : 'legacyevent'});
                                                                        utils.createCookie('display_popup','1',1800);
                                                                        utils.createCookie('popup_counter',new_counter,5);
                                                                        utils.createCookie('popup_date',date_value,5);
                                                                }
                                                        }
                                                },10000);
                                }
                        },
			/**
			 * This function is used for OTP Varification.
			 * @param {type} form_id
			 * @param {type} mobile_number
			 * @returns {undefined}
			 */
			OTPVarification : function( form_id, mobile_number ) {
				//work: show the OTP dialogue box if sotp is passed
				otp_register=true;		//make otp register variable true

				var form_div =$('#'+form_id).attr('rel');
				if(typeof(form_div)!='undefined') {
					$('#loginPopupBox').fadeOut(400);
					$('#registerPopupBox').fadeOut(400);
					$('#returnLoginPopupBox').fadeOut(400);
					$('#login-forgot-pwd-wrap').fadeOut(400);
					$('#login-pwd-email-sent').fadeOut(400);
					$('#appyHomesBox').fadeOut(400);
					$("#popup_overlay").fadeIn(200);
				} else {
					$('#popup_overlay').hide();
				}

				/**
				 * Creating cookie which will be used to show otp box again instead of registration page when
				 * otp box is closed without entering the code and 'Register' link is clicked
				 */
				utils.createCookie('otp_box_show', '1');
				if(!$('#otp_box').is(':visible')){
					$('#otp_box').fadeToggle( "slow", "linear" );
				}
				$("div.otp-modal").fadeIn(400);
                                $('.otp_mobile').html(mobile_number);
			},
			/**
			 * //work: validate the otp entered in the otp box
			 * @param {type} form_id
			 * @returns {Boolean}
			 */
			OTPSubmit : function( form_id ) {
				$('#'+form_id +' .error_msg').text('');
				$('#'+form_id +' .otp_error').text('');

				var otp_code=$.trim($('#'+form_id +' #otp_code').val());

				if(otp_code=="" || otp_code.length!=4) {
					$('#'+form_id + ' #otp_code_error').html('Enter valid verification code');
				} else {
					var _path = secure_url + "/customer_account/validateOTP";
					var _data = $("#"+form_id).serialize();

					$("#"+form_id+" #otpcode_submit").attr('disabled','disabled');

					var _beforeSend = function () {
						$("#"+form_id+" #error_msg").html('<center><image src="'+root_url+'/media/image/opc-ajax-loader.gif"/></center>');
					};

                                        var _setUpOptions = {
                                            'dataType' : "json"
                                        };
                                
					var _params = {
					  'form_id' : form_id
					};

					utils.makeRequest( _path, 'POST', _data, x.OTPSubmitResponse, x.handleError, _beforeSend, _params, _setUpOptions );
					//ajax request end
					$("#"+form_id+" #otpcode_submit").removeAttr("disabled");
				}

				return false;
			},
			/**
			 * //work: Response for the otp entered in the otp box
			 * @param {type} data
			 * @param {type} _params
			 * @returns {undefined}
			 */
			OTPSubmitResponse : function(result,_params) {
                                var data = '';
				try {
					data = $.parseJSON( result );
				} catch( error ) {
					data = result;
				}
				$("#"+_params.form_id+" #error_msg").html('');

				if( utils.isObject( data ) ) {
					var otp_code_error=false;
					var email_error = false;
					var mobile_error = false;

					$.each( data, function( key, value ) {
						if(key=='otp_code_error') {
							otp_code_error=true;
						}

						if(key=='email') {
							email_error = true;
						}

						if(key=='mobile') {
							mobile_error = true;
						}
					});

					if(email_error==true) {
						otp_register=false;
                                                $('.otp-resent-notification').hide();
						$('.otp_left_div').hide();
						$('#otp_input_area').hide();

						utils.pushToDataLayer({
							'category' : 'RegOTP',
							'action': 'Verify',
							'label' : 'Non_checkout',
							'opt' : true,
							'event' : 'legacyevent'
						});

						$('#exist_field').html('email');
						$('#exist_account').show();

					} else if(mobile_error==true) {
						otp_register=false;
                                                $('.otp-resent-notification').hide();
						$('.otp_left_div').hide();
						$('#otp_input_area').hide();

						utils.pushToDataLayer({
							'category' : 'RegOTP',
							'action': 'Verify',
							'label' : 'Non_checkout',
							'opt' : true,
							'event' : 'legacyevent'
						});

						$('#exist_field').html('mobile');
						$('#exist_account').show();
					} else if(otp_code_error==true) {
                                                $('.otp-resent-notification').hide();
						$('.otp_headers').hide();
						$('#otp_fail_header').show();
						$('.otp_left_div').hide();
						$('#otp_failed_div').show();
					} else {
						$.each( data, function( key, value ) {
							$("#"+_params.form_id+' span#'+key).html(value);
							$("."+key).html('');
						});
					}

					if(data.output == 'success') {
						/**
						 * deleting cookie to open registration page when 'Register' link is clicked
						 * (this is when the site is opened using link on affiliated pages)
						 */
						utils.eraseCookie('otp_box_show');  //
						$("#"+_params.form_id+" .error_msg").html('');

						//Non-Checkout Registration Pixel
						//_gaq.push(['_trackEvent', 'Registration', 'Signup', 'Non_checkout',, true]);
						utils.pushToDataLayer({
							'category' : 'RegOTP',
							'action': 'Success',
							'label' : 'Non_checkout',
							'opt' : true,
							'event' : 'legacyevent'
						});

						//_gaq.push(['_trackEvent', 'registration', 'login']);
						if(first_event == true) {
							utils.pushToDataLayer({
								'category' : 'reg_modal',
								'action': 'click_submit',
								'label' : 'success_reg',
								'event' : 'legacyevent'
							});
							first_event = false;
						}

						otp_register=false;

						if(data.pixel) {
							// Based on ths cookie, pixel will be fired in footer.phtml
							utils.createCookie('pixel', data.pixel);
						}

						setTimeout(function() { parent.location.reload(true); }, 100);
						//parent.location.reload(true);
					}
				} else if(data == "Email") {
					$("#"+form_id+" #error_msg").html("Email already exists");
				} else if(data == "Mobile"){
					$("#"+form_id+" #error_msg").html("Mobile already exists");
				} else if(data == "otp_code_error"){
					$("#"+form_id+" #error_msg").html("Email and mobile are already exists.");
				} else if(data=='data_loss'){
					otp_register=false;
                                        $('.otp-resent-notification').hide();
					$('.otp_left_div').hide();
                                        $('#resend_div').hide();
					$('#loss_data').show();
				} else {
					if(first_event == true) {
						utils.pushToDataLayer({
							'category' : 'reg_modal',
							'action': 'click_submit',
							'label' : 'success_reg',
							'event' : 'legacyevent'
						});
						first_event = false;
					}

					utils.pushToDataLayer({'category' : 'registration', 'action': 'login', 'event' : 'legacyevent'});
					utils.w.location.href = root_url+data;
				}
			},
			/**
			 * //work: change the mobile number for OTP
			 * @param {type} form_id
			 * @returns {Boolean}
			 */
			OTPMobileChange : function(form_id) {
				$('#'+form_id+' .error').text('');
				$('#'+form_id+' #mobile_otp_error').html('');
				$('#mobile_max_change').hide();

				var errors = 0;
				var mobile = $.trim($("#"+form_id +" #otp_mobile_change").val());

				if(mobile == "" || mobile.length != 10 ) {
					$("#"+form_id +" #mobileError").css('display','block');
					errors = 1;
				} else {
					var numberFilter = /^[0-9]+$/;

					if(numberFilter.test(mobile)) {
						$("#"+form_id +" #mobileError").css('display','none');
					} else {
						$("#"+form_id +" #mobileError").css('display','block');
						errors = 1;
					}
				}

				if(errors == 0) {
					$("#"+form_id+" #otpmobile_submit").attr('disabled','disabled');
					$("#"+form_id+" #error_msg").html('<center><image src="'+root_url+'/media/image/opc-ajax-loader.gif"/></center>');

					var _path = secure_url + "/customer_account/changeOTPMobile";
					var _data = {'change_mobile':1,'mobile_number':mobile};

					//ajax request stat
					var _beforeSend = function () {
						$("#"+form_id+" #error_msg").html('<center><image src="'+root_url+'/media/image/opc-ajax-loader.gif"/></center>');
					};

                                        var _setUpOptions = {
                                            'dataType' : "json"
                                        };
                                        
					var _params = {
					  'form_id' : form_id,
					  'mobile'  : mobile
					};

					utils.makeRequest( _path, 'POST', _data, x.OTPMobileChangeResponse, x.handleError, _beforeSend, _params, _setUpOptions );

					$("#"+form_id+" #error_msg").html('');
					$("#"+form_id+" #otpmobile_submit").removeAttr("disabled");
				}

				return false;
			},
			/**
			 * //work: Response for change the mobile number for OTP function
			 * @param {type} data
			 * @param {type} _params
			 * @returns {undefined}
			 */
			OTPMobileChangeResponse : function(result,_params) {
                                var data = '';
				try {
					data = $.parseJSON( result );
				} catch( error ) {
					data = result;
				}

				if(utils.isObject(data)) {
					$.each( data, function( key, value ) {
						$("#"+_params.form_id+" span#"+key).html(value);
					});
				} else if(data == "success") {
					$('.otp-change-number').slideUp(function () {
					$('.otp-authentication').slideDown();
					});
					$('#change_number_form').fadeOut(50);
					$('#auth_form').fadeIn(50);
					$('.otp_left_div').hide();
					$('#resend_div').show();
					$('.otp_mobile').text(_params.mobile);

					$('.otp_headers').hide();
					$('#auth').show();

					utils.pushToDataLayer({
						'category' : 'RegOTP',
						'action': 'changemobile',
						'label' : 'Non_checkout',
						'opt' : true,
						'event' : 'legacyevent'
					});
				} else if(data == "reach_max") {
                                        $('.otp-resent-notification').hide();
					$('#mobile_max_change').show();
					//$('#mobile_otp_error').html('You can request max. 3 number changes for single registration');
				} else if(data=='data_loss') {
					otp_register=false;
					//$('#change_number_form').fadeOut(50);
                                        $('.otp-change-number').slideUp(function () {
					$('.otp-authentication').slideDown();
					});
                                        $('.otp-resent-notification').hide();
					$('#change_number_form').hide();
					$('#auth_form').fadeIn(50);
					//To hide Sample SMS image when trying to change mobile no. when session is expired
					$('.otp_right').fadeOut(50);
					otp_register=false;
					$('.otp-resent-notification').hide();
					$('#otp_input_area').hide();
                                        $('#resend_div').hide();
					$('#loss_data').show();
				} else if(data=='same_number') {
                                    $('.otp-resent-notification').hide();
					$('#mobile_otp_error').html('You are already submitted with this number. Please enter a new mobile number.');
				} else if(data == "error" || data=='' || data==='undefined') {
					//$('.otp_left_div').hide();
                                        $('.otp-resent-notification').hide();
					$('#mobile_otp_error').html('Error cccured during request, Please try again!');
				}
			},
                        OTPResendResponse : function(data, _params){
                            if(data == "success")
                                {
                                        utils.pushToDataLayer({'category' : 'RegOTP', 'action': 'Resend', 'label' : 'Non_checkout', 'opt' : true, 'event' : 'legacyevent'});
                                        $('.otp-resent-notification').hide();
                                        $('#resend_div').show();
                                }
                                else if(data == "reach_max")
                                {
                                        $('.otp-resent-notification').hide();
                                        $('#max_resend').show();
                                }
                                else if(data=='data_loss')
                                {
                                        otp_register=false;

                                        $('.otp-resent-notification').hide();
                                        $('#resend_div').hide();
                                        $('#loss_data').show();
                                }
                                else if(data == "error" || data=='' || data==='undefined')
                                {
                                        $('.otp-resent-notification').hide();
                                        $('#failed_request').show();
                                }
                                
                                $("#"+_params.form_id+" #error_msg").html('');
                                $("#"+_params.form_id+" .error_msg").html('');
                                $("#"+_params.form_id+" #otpcode_submit").removeAttr("disabled");
                                $(this).attr('rel',_params.rel);
                        },
			deleteOTPCookie : function() {
				// deleting cookie to open registration page when 'Register' link is clicked
				// (this is whn the site is opened using link on affiliated pgs)
				utils.eraseCookie('otp_box_show');
				utils.w.location.reload();
			},
			/**
			 * ajax function for guest checkout submit
			 *
			 * @param {type} flag
			 * @param {type} form_id
			 * @returns {undefined}
			 */
			checkoutSubmit : function(flag,form_id) {
				var path = '';

				if(flag == 1){
					path = secure_url + "/customer_account/guestRegister/1";
				} else {
					path = secure_url + "/customer_account/guestRegister/2";
				}

				var _data = $("#" + form_id).serialize();
				var _beforeSend = function () {
					$("#" + form_id + " .btn").attr('disabled', 'disabled');
					x.addBlueButtonLoader(form_id);
				};

				var _params = {
				  'form_id' : form_id
				};

				var _setUpOptions = {
					'dataType' : "json"
				};

				utils.makeRequest( path, 'POST', _data, x.checkoutSubmitResponse, x.handleError, _beforeSend, _params, _setUpOptions );
			},
			checkoutSubmitResponse : function( _data,_params) {
                            
                                var data;
                                try {
                                    data = $.parseJSON( _data );
                                } catch(e) {
                                    data = _data;
                                }
                                
				$( '#' + _params.form_id + ' .error-text' ).hide()

				if( utils.isObject( data ) ) {
					$.each( data, function( key, value ){

						$("#"+_params.form_id+" input[id='"+key+"']").siblings("span.error-msg").css('display','block');
						$("#"+_params.form_id+" input[id='"+key+"']").siblings("span.error-msg").html(value);

						// $('span#'+key).css('display','block');
						// $('span#'+key).html(value);
					});

					$(".btn").removeClass("btn-loader");
					$(".btn").removeAttr("disabled");

					x.removeBlueButtonLoader(_params.form_id);
				} else if(data == "success") {
					utils.w.parent.location.href =  root_url + "/checkout/onepage/";
				} else {
					alert('Error. Please Try Again!');

					$(".btn").removeClass("btn-loader");
					$(".btn").removeAttr("disabled");

					x.removeBlueButtonLoader(_params.form_id);
				}
			},
			/**
			 *
			 * @param {type} event
			 * @returns {Boolean|undefined}
			 */
			numCheck: function (event) {
				var allowedEventCodes = [8,9,13,27,46];

				if( ( $.inArray( event.keyCode, allowedEventCodes ) !== -1 ) ||
				( event.keyCode == 65 && event.ctrlKey === true ) ||
				( event.keyCode >= 35 && event.keyCode <= 39 ) ) {
					// Allow: Ctrl+A, home, end, left, right
					// let it happen, don't do anything
					if (event.keyCode == 13) {
						//
					}
					return;
				} else {
					// Ensure that it is a number and stop the keypress
					if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
						event.preventDefault();
						return false;
					}
				}
			},
			getTopBarLinks: function(){
				x.count_alert_detector(); // Call count check event detector 
				x.getLoginMenu();
				/*
				$('#fe_header_wrapper').show(function() {
					try{
						if (typeof localStorage === 'object') {
							if (localStorage.getItem('febarclose') === 'true')
							{
								$('#fe_header #close').trigger('click');
							}
							else
							{
								$('#fe_header #open').trigger('click');
							}
						}
					} catch(e) {}
				});*/
			},
                        resetheaderflashcookie: function (){
                           PF.UTILITIES.createCookie('headerflashcookie',2,1)
                        },
			getLoginMenu: function () {
				// function to get the user info and cart info
				var _url = secure_url + '/site_page/getUserInfo';
                                var _beforeSend = function () {
                                    
                                };
                                var additionalParams = {
                                    
                                };
                                var _setUpOptions = {
                                    'dataType' : "json"
                                };
				utils.makeRequest( _url, 'GET', {}, x.handleUserLogin, x.handleUserLoginError, _beforeSend, additionalParams, _setUpOptions );
			},
			handleUserLogin : function( d ) {
                            var data;
				try {
                                    data = $.parseJSON( d );
				} catch( ex ) {
                                    data = d;
                                }

				x.createTopBarLinks( data );
				x.updateProductCountInMiniCart( data );
                
                                
                                var d;
                                try {
                                    d = $.parseJSON( data );
                                } catch(e) {
                                    d = data;
                                }
                                
                if((typeof d.login != 'undefined') && (d.login == true) && (typeof d.customer_id != 'undefined') && (utils.isNumber(d.customer_id))) {
                    utils.pushToDataLayer({'userId': d.customer_id,'event':'withUserID'});
                }

				x.initiateEvents();
			},
			handleUserLoginError : function() {
				x.initiateEvents();
			},
			initiateEvents : function() {
				if( ! x.eventsInitiated ) {
					x.eventsInitiated = true;
					x.init();
				}
			},
			updateProductCountInMiniCart : function( _data ) {

                                var d;
                                try {
                                    d = $.parseJSON( _data );
                                } catch(e) {
                                    d = _data;
                                }                              
				
				$( '#items_mini_cart' ).html( d.cart_count );
				$( '#wishlist_mini_cart' ).html( d.wishlist_count );
				$( '#views_mini_cart' ).html( d.recently_viewed_product_count );

				var serviceable_pincode = utils.readCookie( 'serviceable_pincode' );

				if( isNaN( parseInt( serviceable_pincode ) ) ) {
					serviceable_pincode = '';
				}

				$( 'input.srvc_pin_text' ).val( serviceable_pincode );
				$( '#srvc_pin' ).text( serviceable_pincode );
			},
			/**
			 * Create the header link for logged-in/logged-out states
			 *
			 * @param {type} response_data
			 * @returns {undefined}
			 */
			createTopBarLinks: function ( response_data ) {
				// function to create login menu and cart with the response
				var d;

                                try {
                                    d = $.parseJSON( response_data );
                                } catch( ex ) {
                                    d = response_data;
                                }

				var html = '';
				var os_html = '';

				if ( d.login ) {
                                   
					loginFlag = true;
					var loginMsg = '<a href="javascript:void(0);"><img src="./assets/images/popup-close.png" class="popup-close"></a>';
					loginMsg += '<div class="reg_user_info_wrapper" style="display:none !important;"><p>Hi <strong>' + d.name + '</strong></p>';
					loginMsg += '<p>You\'re already registered and logged in as <strong>' + d.email + '</strong>. ';
					loginMsg += 'We have exciting discounts on an unlimited range of Furniture, D&#233;cor, Furnishings and Kitchen items.</p>';
					loginMsg += '<p><a onclick="closeSignin()" href="javascript://">So go ahead and shop!</a></p>';
					loginMsg += '<p>Warm Regards,<br/>Team Pepperfry.</p></div>';

					var loginhtml='';
					loginhtml +='<a href="javascript:void(0);" class="popup-close"></a>'; 
					loginhtml +='<div class="reg_user_info_wrapper" style="display:block !important;">'; 
					loginhtml +='<p >Hi <strong>'+ d.name +'</strong></p>';
					loginhtml +='<p >You\'re already registered and logged in as <strong>' + d.email + '</strong>. We have exciting discounts on an unlimited range of Furniture, D&#233;cor, Furnishings and Kitchen items.</p>';
					loginhtml +='<p ><a onclick="closeSignin()" href="javascript://">So go ahead and shop!</a></p>';
					loginhtml +='<p >Warm Regards,<br/>Team Pepperfry.</p>';
					loginhtml +='</div>';

					$('#registerPopupBox').html(loginhtml);

					html += '<div class="header_tab loggedin transition">';
					html += '<a href="javascript:void(0);" class="hover-link">Hi ' + d.name + '</a>';
					html += '<div class="sub">';
					html += '<ul style="display: none;">';
					html += '<li><a href="' + secure_url + '/customer/dashboard">My Account</a></li>';
                                        html += '<li><a href="' + secure_url + '/customer/myorders">My Orders</a></li>';
                                        html += '<li><a href="' + secure_url + '/customer/wishlist">My Wishlist</a></li>';
                                        html += '<li><a href="' + secure_url + '/customer/account">My Profile</a></li>';
					html += '<li><a href="' + secure_url + '/customer/logout/">Logout</a></li>';
					html += '</ul>';
					html += '</div>';
					html += '</div>';
                                          
					// for Cart Summary, Logged in data

                   os_html += 'You are logged in as <div class="ck-logged-in">';
                   os_html += '<a href="javascript:void(0)" class="ck-loggedin-usr-link pf-text-light-blue">' + d.name + '</a>';
                   os_html += '<ul class="ck-loggedin-options">';
                   os_html += '<li><a href="' + secure_url + '/customer/account">My Profile</a></li>';
                   os_html += '<li><a href="' + secure_url + '/customer/dashboard">My Account</a></li>';
                   os_html += '<li><a href="' + secure_url + '/customer/myorders">My Orders</a></li>';
                   os_html += '<li><a href="' + secure_url + '/customer/wishlist">My Wishlist</a></li>';
                   os_html += '<li><a href="' + secure_url + '/customer/logout/">Logout</a></li>';
                   os_html += '</ul>';
                   os_html += '</div>';
                   $('.ck-logged-in-wrap').html(os_html);

					customer_email = d.email;
					$('#besDetailForm #emailid1').val(customer_email);
					$('#besDetailForm #firstname').val(d.name);
					$('#besDetailForm #lastname').val(d.lastname);
                                        //$('#besDetailForm #mobile').val(d.mobile_no);
                                        
					$("#emailid").val(customer_email);
                                        /* Mangiamo form autofill code added by Shreenivas M Starts here*/
                                        $('#mangiamo_form #email_id').val(customer_email);
					$('#mangiamo_form #fname').val(d.name);
					$('#mangiamo_form #lname').val(d.lastname);
                                        $('#mangiamo_form #mobile').val(d.mobile_no);
					/* Mangiamo form autofill code added by Shreenivas M Ends here*/
					
					//commented since in y-state input gets hidden
					// $("#emailid").hide();
					$('.input-field').each(function () {
						if ($(this).val() != "") {
							$(this).parent('.input-effect').addClass('input-filled');
						} else {
							$(this).parent('.input-effect').removeClass('input-filled');
						}
					});

					$("#customer-email").html('<label>' + customer_email + '</label><span id = "emailedit" style = "display:inline;" class="logE"><a onclick="changeEmail();" href="javascript://">edit</a></span>');

					if ($("#emailhidden").length > 0) {
						$("#emailhidden").val(d.email);
					}

					$("#customer-email").show();
					if ($("#registerPopupBox").length > 0) {
						//$("#registerPopupBox").html(loginMsg);
						$(".reg_user_info_wrapper").show();
					}

					$('.header_right').addClass('user_loggedin');
					/*
					 * Google Analytics
					 * Added UserID, to analysis of groups of sessions, across devices.
					 */
					if (d.hasOwnProperty('customer_id') === true) {
						utils.pushToDataLayer({'user_id': d.customer_id});
					}

					$( html ).insertBefore( '.acct_links' );
					x.header_scripts('.header_tab.loggedin', 'mouseenter mouseleave', function () {
					$(".loggedin ul").stop().slideToggle(300);
					});
                    $(".header_tab.my_account").addClass('logged-in');
                    $("#login-block-div").hide();
					//var exchangeLink = '<a class="fe" href="/furniture-upgrade.html">Furniture <strong>Upgrade</strong></a>';
					//$( '.acct_links' ).html( exchangeLink );
				} else {
					customer_email = "";
					if ($("#emailhidden").length > 0) {
						$("#emailhidden").val( '' );
						$("#li-reauth-msg").hide();
						$("#customer-email").html( '' );
						$("#customer-email").hide();
					}

					$("#emailid").val("");
					$("#emailid").show();

					if (!skip_header) {
						// not required any more - old design calls
						/*var abc = x.createMiniCart(response_data);
						if (!skip_mini_cart)
						$(abc).insertAfter('#site-logo');*/
						//html+=abc;
					}

					if (typeof mreg != 'undefined' && mreg == 'true') {
						x.openModel('returnLoginPopupBox','');
					}

					if (typeof mreg != 'undefined' && mreg == 'new') {
						x.openModel('registerPopupBox','');
					}

					if (typeof mreg != 'undefined' && mreg == 'return') {
						x.openModel('loginPopupBox','');
					}

					if(utils.w.location.href.indexOf("customer/login") > -1) {
						html += '<a id="scrollup" href="javascript:void(0);">Login</a>';
					    html += '<a id="scrollup1" href="javascript:void(0);">Register</a>';
					   // html += '<a id="scrollup2" class="fe" href="/furniture-upgrade.html">Furniture <strong>Upgrade</strong></a>';

						$( '.acct_links' ).html( html );
						$('#scrollup,#scrollup1,#scrollup2').click(function(){
							var height = $( utils.w ).height();
							$("html, body").animate({ scrollTop: height-470 }, 600);
							return false;
						});
					} else {
						html += '<a id="loginPopupLink" href="javascript:void(0);" class="popup-login" data-modal="home-login-guest-modal">Login</a>';
						html += '<a id="registerPopupLink" href="javascript:void(0);" data-modal="home-register-guest-modal">Register</a>';
						//html += '<a class="fe" href="/furniture-upgrade.html">Furniture <strong>Upgrade</strong></a>';
						$( '.acct_links' ).html( html );
					}
				}

				$( '.cart_bar .count_alert' ).html( d.cart_count );
			},
			openModel: function ( show_id, hide_id ) {
				if( hide_id != 'undefined' && hide_id != '' ) {
					$( '#' + hide_id ).hide();
				}

				if( typeof( otp_register ) != 'undefined' && otp_register == true ) {
					$( '#change_number_form' ).hide();
					$( '#auth_form' ).show();
					$( '#otp_box' ).fadeIn( 50 );
					$( '#otp_box #otp_code' ).val( '' );
				} else {
					$( '#' + show_id ).fadeIn( "slow" );
                                        $("#popup_overlay").fadeIn(200);
				}
			},
			getCartInfo : function( pin ) {
				//var _link = ( utils.getProtocol() === 'http:' ) ? root_url : secure_url;
				var _link = secure_url+'/site_page/getCartInfo';

				var _beforeSend = function() {
					$( '.mini_cart .gb-loader' ).show();
				};

				var _data = {};
				// var _method = 'GET';
				var _method = 'POST';

				var _params = {
					'pin' : pin
				};

                var _setUpOptions = {
                    'dataType' : "json"
                };
                                
				if( typeof pin !== 'undefined' ) {
					_data.pincode = pin;
					_method = 'POST';

					// over-write serviceable_pincode cookie
					utils.createCookie( 'serviceable_pincode', pin, 30 );
					/*Check for the Pin code*/
					PF.HEADER.bespokeEventTracker('Pin code check:', pin);    					
					/**/
				} else {
					_data.pincode = utils.readCookie( 'serviceable_pincode' );
				}

				// We don't need all cart info for mini-cart, so use this identifier to select nodes to pass in the response
				_data.source = 'minicart-drawer';
                                
                /* empty cart cache to set new cart reponse in cache */
                x.cartResponseCache = '';

				utils.makeRequest( _link, _method, _data, x.handleMiniCartResponse, x.handleError, _beforeSend, _params, _setUpOptions );
			},
			handleMiniCartResponse : function( data, _params ) {
				/**
				 * Create the mini-cart
				 */
                //cache the cart data response for subsequent requests
                                
                var cdata;
                try {
                    cdata = $.parseJSON( data );
                } catch( ex ) {
                    cdata = data;
                }
                                
				if( x.cartResponseCache == '') {        
                    x.cartResponseCache = new Object();
					x.cartResponseCache = cdata;
				} else if( x.cartResponseCache.total_items != cdata.total_items ) {
                    x.cartResponseCache.total_items = cdata.total_items;
                    
                    for( var i in cdata.cart_item ) {
                        x.cartResponseCache.cart_item[i] = cdata.cart_item[i];
                    }
                    cdata = x.cartResponseCache;
                }
				var _cart = x.createMiniCart( cdata, _params.pin );

				if( ! skip_mini_cart ) {
					if( $( '#cart_item_holder' ).length > 0 ) {
						if( x.miniCartSoldOutItems.cart.length > 0 ) {
							$( '.minicart_action' ).show();
						} else {
							$( '.minicart_action' ).hide();
						}

						if( _cart.is_cart_serviceable ) {
							$( '.mini_cart .error' ).hide();
						} else {
							var _str = ' item';
							if( _cart.non_serviceable_items > 1 ) {
								_str = ' items';
							}

							if( ( typeof _params.pin != 'undefined' ) && utils.isNumber( _params.pin ) ) {
								$( '.mini_cart .error #srvc_pin' ).html( _params.pin );
								$( '.mini_cart .error #items_not_serviceable' ).html( _cart.non_serviceable_items + _str ).show();
								$( '.mini_cart .error' ).show();
							}
						}

						if( _cart.additional_requirement ) {
							$( '.mini_cart .notification' ).show();
						} else {
							$( '.mini_cart .notification' ).hide();
						}

						/**
						 * Check if there are any items which are in soft-delete state (where UNDO link is visible)
						 *
						 * If yes, need to preserve them so that the user has a chance to get them back in cart
						 * Push such links to the top of the cart so that they are visible to the user without scroll
						 *
						 * NOT NEEDED NOW
						 */
						$( '#mini-usercart' ).html( _cart._html);
						
						$( '.sorting a[data-selected=1]' ).click();

						// remove any previously defined mini cart footer
						$( '.mini_cart .minicart_footer' ).remove();

						// show footer only when at least one item in cart is not sold out
						if( ! _cart.all_products_sold_out ) {
							//$( _cart._footer ).insertAfter( '#cart_item_holder' );
							$( '#minicart_footer' ).show();
							$( '#minicart_footer' ).html(_cart._footer);
						}
						$( '.mini_cart .gb-loader' ).hide();
					}

					$( '.mini_cart .tabs a' ).removeClass( 'active' );
					$( '.mini_cart .tabs a#mini-usercart-tab' ).addClass( 'active' );
					x.setCartHeight();
				}

				$( '#popup_overlay' ).addClass( 'active' );
				$( '.mcart_header .tabs a' ).removeClass( 'active' );
				$( '.mcart_header .tabs a#mini-usercart-tab' ).addClass( 'active' );
				global_function.reload_minicart();
				global_function.mCustomScrollInit('MiniCartScrollbar');
			},
			setCartHeight : function() {
				if( ! $( '.mini_cart' ).is( ':hidden' ) ) {
					//var _cartOffset = Math.ceil( $( '#cart_item_holder' ).offset().top );
					//var _cartHeight = Math.ceil( $( '.mini_cart' ).height() );
					var _cartFooterHeight = Math.ceil( $( '.minicart_footer' ).height() );
					var windowHeight = $( window ).height();
					var cartHeader = $( '.mini_cart .mcart_header' ).outerHeight();
					var toolbar = $( '.mini_cart .toolbar' ).outerHeight();
					var clearHeight = $( '.mini_cart .clearfix:eq(0)' ).outerHeight();

					// $( '#cart_item_holder' ).height( _cartHeight - _cartOffset - _cartFooterHeight );
					$( '#cart_item_holder' ).height( windowHeight - cartHeader - toolbar - clearHeight - _cartFooterHeight - 20 );
				}
			},
			updateProductCartQty : function( productID, step ) {
				var currentSelectedQty = parseInt( $( '#t_' + productID ).val() );				
				
				var is_rental = $('#plus_'+productID).data('is_rental');
				var tenure = $('#plus_'+productID).data('tenure');
				var rental_selected = {};
				// hide the qty error div
				$( '#minicart_' + productID ).hide();

				var desiredQty = currentSelectedQty;
				if( typeof step !== 'undefined' ) {
					desiredQty += step;
				}

				desiredQty = parseInt( desiredQty );

				if( isNaN( desiredQty ) ) {
					// show the default value selected
					$( '#t_' + productID ).val( $( '#t_' + productID ).prop( 'defaultValue' ) );
					$( '#minicart_' + productID ).html( 'Please choose a valid quantity' ).show();
					//$( '#cart_item_holder' ).getNiceScroll( 0 ).doScrollTop( $( '#t_' + productID ).offset().top );
					var cval = $( '#t_' + productID ).attr( 'data-pos' ); // get the current element's index
					var s = ( cval - 1 ) * $( '#cart_' + productID ).outerHeight();

//					if( ( $( "#cart_item_holder" ).outerHeight() - $( '#minicart_' + productID ).position().top ) < 60 ) {
//						$( '#cart_item_holder').getNiceScroll( 0 ).doScrollTop( s - 1 );
//						$( '#cart_item_holder' ).getNiceScroll( 0 ).doScrollTop( s + 40 );
//					}

					return false;
				}

				// no change in quantity
				if( desiredQty == $( '#t_' + productID ).prop( 'defaultValue' ) ) {
					return false;
				}

				var maxAvailableQty = $( '#t_' + productID ).attr( 'data-max' );

				// If a product availability is greater than what a user is allowed to in the cart, limit it
				maxAvailableQty = ( maxAvailableQty > max_cart_qty ) ? max_cart_qty : maxAvailableQty;

				if( desiredQty > maxAvailableQty || desiredQty <= 0 ) {
					if( desiredQty > maxAvailableQty ) {
						var _text = ' quantity.';
						if( maxAvailableQty > 1 ) {
							_text = ' quantities.';
						}

						$( '#minicart_' + productID ).html( 'You can not choose more than ' + maxAvailableQty + _text ).show();
						//$( '#cart_item_holder' ).getNiceScroll( 0 ).doScrollTop( $( '#t_' + productID ).offset().top );
						var cval = $( '#t_' + productID ).attr( 'data-pos' ); // get the current element's index
						var s = ( cval - 1 ) * $( '#cart_' + productID ).outerHeight();

//						if( ( $( "#cart_item_holder" ).outerHeight() - $( '#minicart_' + productID ).position().top ) < 60 ) {
//							$( '#cart_item_holder').getNiceScroll( 0 ).doScrollTop( s - 1 );
//							$( '#cart_item_holder' ).getNiceScroll( 0 ).doScrollTop( s + 40 );
//						}
					} else {
						$( '#minicart_' + productID ).html( 'Please choose at least 1 quantity.' ).show();
						//$( '#cart_item_holder' ).getNiceScroll( 0 ).doScrollTop( $( '#t_' + productID ).offset().top );
						var cval = $( '#t_' + productID ).attr( 'data-pos' ); // get the current element's index
						var s = ( cval - 1 ) * $( '#cart_' + productID ).outerHeight();

//						if( ( $( "#cart_item_holder" ).outerHeight() - $( '#minicart_' + productID ).position().top ) < 60 ) {
//							$( '#cart_item_holder').getNiceScroll( 0 ).doScrollTop( s - 1 );
//							$( '#cart_item_holder' ).getNiceScroll( 0 ).doScrollTop( s + 40 );
//						}
					}

					$( '#t_' + productID ).val( $( '#t_' + productID ).prop( 'defaultValue' ) );
					return false;
				}

				if($('.MiniCartScrollbar').length>0){
					global_function.mCustomScrollDestroy('MiniCartScrollbar');
				}
				if( desiredQty ) {
					var _link = secure_url + '/cart/add?cp=ac';
					var type = $( '#t_' + productID ).attr( 'data-type' ); //adding check for is customized wardrobe
					var iscustomized = 0;

					if(type=='bundle'){
						iscustomized = 1;
					}else{
						iscustomized = 0;
					}

					if(is_rental==1){
						rental_selected[productID] = tenure;
					}else{
						rental_selected[productID] = 0;
					}
					var params = {};
					params['iscustomized']=iscustomized;
					params['rental_selected'] = JSON.stringify(rental_selected);

					var _data = {
						'product_id' : productID,
						'qty' : desiredQty,
						'params' : params
					};

					var _beforeSend = function() {
						$( '.mini_cart .gb-loader' ).show();
					};

                                        var _setUpOptions = {
                                            'dataType' : "json"
                                        };
                                
					var _params = {
						'pin' : utils.readCookie( 'serviceable_pincode' )
					};

					utils.makeRequest( _link, 'POST', _data, x.handleMiniCartResponse, x.handleError, _beforeSend, _params, _setUpOptions );
				}

				return false;
			},
                        addMiniCartItem : function( data, _params ) {
                                
                                var cdata;
                                try {
                                    cdata = $.parseJSON( data );
                                } catch( ex ) {
                                    cdata = data;
                                }
                                
                                if( x.cartResponseCache ) {
					if(typeof x.cartResponseCache != 'object' ) {
                                            x.cartResponseCache = $.parseJSON( x.cartResponseCache );
                                        }
                                        var itemData = cdata;
                                        try {
                                            $.each( itemData.cart_item, function( k, v ){
                                                x.cartResponseCache.cart_item[ k ] = v;
                                            });
                                            x.cartResponseCache.total_items = itemData.total_items;
                                        } catch( e ) {
                                            x.cartResponseCache.total_items = itemData.total_items;
                                        }

				} else {
                                        x.cartResponseCache = cdata;
                                }
                                x.handleMiniCartResponse( x.cartResponseCache, _params );
                        },
                        getCacheCart : function( ) {
                            return x.cartResponseCache;
                        },
			deleteProductFromCart : function( el ) {
				var cartProductId = $.trim( $( el ).attr( 'data-id' ) );
				if($('.MiniCartScrollbar').length>0){
					global_function.mCustomScrollDestroy('MiniCartScrollbar');
				}
				if( ( cartProductId != '' ) && ( $( '#cart_' + cartProductId ).length > 0 ) ) {
					var _url = secure_url + '/cart/removeitem/' + cartProductId + '/1/1/0';
					var _params = {
						'cartProductId' : cartProductId,
						'pos' : $.trim( $( '#t_'+cartProductId ).attr( 'data-pos' ) )
					};

                                        var data = {
                                            'minicart' : 1
                                        };
                                        
					var _beforeSend = function() {
						$( '.mini_cart .gb-loader' ).show();
					};

                                        var _setUpOptions = {
                                            'dataType' : "json"
                                        };

					utils.makeRequest( _url, 'POST', data, x.handleDeleteCartProduct, x.handleError, _beforeSend, _params, _setUpOptions );
				}
			},
			handleDeleteCartProduct : function( _data, _params ) {
				/**
				 * Parse the response for delete product from cart
				 */
				$( '.mini_cart .gb-loader' ).hide();
                                
                                if( typeof x.cartResponseCache != 'object' ) {
                                    x.cartResponseCache = $.parseJSON( x.cartResponseCache );
                                }
                                /**
                                 * Deleting item from cache cart
                                 */
                                if( x.cartResponseCache.cart_item.hasOwnProperty( _params.cartProductId ) ) {
                                    /**
                                     * Deleting product from cache cart and reduce the item count from cart
                                     */
                                    var productDelQty = x.cartResponseCache.cart_item[ _params.cartProductId ][ 'quantity' ]; 
                                    delete x.cartResponseCache.cart_item[ _params.cartProductId ];
                                    x.cartResponseCache.total_items -= productDelQty;
                                }
                                
                                var data;
                                try {
                                    data = $.parseJSON( x.cartResponseCache );
                                } catch( e ) {
                                    data = x.cartResponseCache;
                                }
                            
                            /***
                             * Amitesh - to set gtm for remove cart(minicart) - {start}
                             */
                            if(itemData.length > 0    ){
                                var cartItemData = {};
                                for( var i in itemData ) {
                                        if( itemData.hasOwnProperty( i ) ) {
                                            var items = itemData[ i ];
                                            if( items.id == _params.cartProductId ) {
                                                    cartItemData = items;
                                                    break;
                                            }
                                        }
                                    } 
                            }
                            /***
                             * Amitesh - to set gtm for remove cart - {end}
                             */
                            
				// as per discussions with sohin, this call will always return the cart data
				//if( typeof data.data.status != "undefined" && data.data.status == "success" ) {
					utils.pushToDataLayer({ 
						'event': 'removeFromCart',
						'ecommerce': {
							'remove': {
								'products': [cartItemData]
							}
						}
					});

					// update cart item count on mini-cart and main page
					$( '.cart_bar .count_alert' ).html( data.total_items || 0 );
					$( '#items_mini_cart' ).html( data.total_items || 0 );

					// update you-pay price
					/*if( data.total_amount > 0 && data.total_items > 0 ) {
						var _price = utils.numberWithCommas( Math.ceil( data.total_amount ) );
						$( '.minicart_footer .cart_price' ).text( 'Cart Price: Rs. ' + _price );
						$( '.minicart_footer' ).show();
					} else {
						$( '.minicart_footer' ).hide();
					}*/

					// check if this item is sold out
					var isProductSoldOut = 0;
					if( $( 'span[data-soldout-' + _params.cartProductId + ']' ).length > 0 ) {
						isProductSoldOut = 1;
					}

					var currentDivPosition = $( '#cart_' + _params.cartProductId ).position().top;

					// remove the product div and show the undo delete for the product
					$( '#cart_' + _params.cartProductId ).parent( '.item_card_wrapper' ).slideUp( 500, function() {
						$( '#cart_' + _params.cartProductId ).parent( '.item_card_wrapper' ).remove();

						if( ! isProductSoldOut ) {
							$( 'div[data-id="cart_' + _params.cartProductId + '"]' ).attr( 'data-hash', data.removed_item ).attr( 'data-pos', _params.pos ).slideDown( 500, function() {
								// get the current element's index
								var cval = $( 'div[data-id="cart_' + _params.cartProductId + '"]' ).attr( 'data-pos' );

								var s = 0;
								$("#cart_item_holder .item_card").each(function(index, element) {
									if(cval>(index+1)){
										s += $(this).outerHeight();
									}		
								});

//								if( ( $( "#cart_item_holder" ).outerHeight() - currentDivPosition ) < 60 ) {
//									$( '#cart_item_holder' ).getNiceScroll(0).doScrollTop(s-1);
//									$( '#cart_item_holder' ).getNiceScroll(0).doScrollTop(s+60);
//								}
							});

							// UNDO functionality not required now
							/*
							x.timedObjects[ data.removed_item ] = setTimeout( function() {
								x.deleteTimedObject( _params.cartProductId, data.removed_item );
							}, x.timeToLive);
							*/
						} else {
							var newSoldOutItems = [];
							for( var i=0;i<x.miniCartSoldOutItems.cart.length;i++ ) {
								if( parseInt( x.miniCartSoldOutItems.cart[ i ] ) != parseInt( _params.cartProductId ) ) {
									newSoldOutItems.push( x.miniCartSoldOutItems.cart[ i ] );
								}
							}

							// refresh the list of sold out items
							x.miniCartSoldOutItems.cart.length = 0;
							for( var i=0;i<newSoldOutItems.length;i++ ) {
								x.miniCartSoldOutItems.cart.push( newSoldOutItems[ i ] );
							}

							if( x.miniCartSoldOutItems.cart.length == 0 ) {
								$( '.toolbar .minicart_action' ).hide();
							} else {
								$( '.toolbar .minicart_action' ).show();
							}
						}

						// update non-serviceability count in mini-cart
						if( $( '#items_not_serviceable_box' ).is( ':visible' ) ) {
							var _count = $( '.cartitem_not_serviceable' ).length;

							if( _count == 0 ) {
								$( '#items_not_serviceable_box' ).hide();
							} else {
								var _str = ' item';
								if( _count > 1 ) {
									_str = ' items';
								} else if( _count == 1 ) {
									_str = ' item';
								}

								$( '.mini_cart .error #items_not_serviceable' ).html( '' );
								$( '.mini_cart .error #items_not_serviceable' ).html( _count + _str ).show();
							}
						}

//						// show empty message if no items in cart
//						if( $( '#mini-usercart .item_card_wrapper' ).length == 0 ) {
//							$( '#mini-usercart' ).html( x.showEmptyCartMessage() );
//							$( '#minicart_footer' ).hide();
//						}
					});
					// show empty message if no items in cart
					if(data.total_items == 0 ) {
						$( '#mini-usercart' ).html( PF.HEADER.showEmptyCartMessage() ).show();
						$( '.toolbar' ).hide();
						$( '#minicart_footer' ).hide();
					}
					$('body').addClass('active');
		     	    $('.popup_overlay').show();
					// reset cart height to adjust the scroll
					x.setCartHeight();

					global_function.reload_minicart();
					global_function.mCustomScrollInit('MiniCartScrollbar');
				//}
			},
			/*
			undoProductDeleteFromCart : function( id, hash ) {
				/**
				 * Undo the deleted product
				 * /
				var _url = secure_url + '/cart/undo_removeitem';

				var _params = {
					'id' : id,
					'hash' : hash,
				};

                                var _setUpOptions = {
                                    'dataType' : "json"
                                };

				var _beforeSend = function() {
					$( '.mini_cart .gb-loader' ).show();
				};

				var _data = {
					'hash' : hash
				};

				utils.makeRequest( _url, 'POST', _data, x.handleUndoDeleteCartProduct, x.handleError, _beforeSend, _params, _setUpOptions );
			},
			handleUndoDeleteCartProduct : function( data, _params ) {
				// Load the mini-cart again after the cart item delete is "undo"-ed
				// remove the undo link
				x.deleteTimedObject( _params.id, _params.hash );

				if( data != false ) {
					// cart info received, show the new cart data
					var _params = {
						'pin' : utils.readCookie( 'serviceable_pincode' )
					};
					x.handleMiniCartResponse( data, _params );
				} else {
					// re-load the cart
					x.miniCartSoldOutItems.length = 0;
					x.getCartInfo();
				}
			},
			deleteTimedObject : function( pid, hash ) {
				try {
					$( 'div[data-id="cart_' + pid + '"]' ).slideUp( 500 ).remove();
					clearTimeout( x.timedObjects[ hash ] );
					delete x.timedObjects[ hash ];

					try {
						var _id = $( '.mini_cart .tabs a.active' ).attr( 'id' );
						if( _id == 'mini-usercart' ) {
							//$( '#' + _id ).click();
						}
					} catch( _error ) {
						//
					}
				} catch( error ) {
					//TODO
				}
			},*/
			handleWishlistItemDelete : function( d, _data ) {
				var data;
				try {
					data = $.parseJSON( d );
				} catch(ex) {
					data = d;
				}
				
				if( isNaN( parseInt( data ) ) ) {
					return;
				}
				
				if(data < 1){
					$( '#mini-userwishlist' ).html(x.emptywishlistcart());
					$( '.toolbar' ).hide();
				}
				$('.wishlist_bar .count_alert').html(data);
				$( '#wishlist_mini_cart' ).html( data );
				if( typeof _data.product_id != 'undefined' ) {
					$('#cart_'+_data.product_id).parent().remove();
				}
				$( '.mini_cart .gb-loader' ).hide();
				// purge the local wishlist cache
				x.wishlistResponseCache = '';
				//$( '#mini-userwishlist' ).click();
				global_function.reload_minicart();
				global_function.mCustomScrollInit('MiniCartScrollbar');
			},
			createMiniCart : function( cart_data, _pin ) {
				/**
				 * Create the minicart html basis the response
				 */
                var cdata;
				try {
                    cdata = $.parseJSON( cart_data );
				} catch( ex ) {
                    cdata = cart_data;
                }

				cdata = x.reAssignKeys( cdata );

				var r = {
					_html : '',
					_footer : '',
					is_cart_serviceable : true,
					non_serviceable_items : 0,
					additional_requirement : false,
					all_products_sold_out : 1
				};

				$( '#items_mini_cart' ).html( cdata.total_items );

				if( cart_data ) {
					if( cdata.total_items > 0 ) {
						var counter = 0;
						var cart_items = cdata.cart_item;
						var _ctr = 0;
						var additionalTemplate = '';
						var additionalTemplateState = '';
						var isBespokeProduct = false;
						var out_of_stock_content = '';
						var minicartTriggerDatalayer = utils.readCookie( 'minicartTriggerDatalayer' );
						var minicart_dataLayer_string= {};
						minicart_dataLayer_string['Basket items'] = {};
						//Condition added for look, add a placeholder which will be replaced conditionally
						r._html += '{BESPOKE_PLACEHOLDER}';
						
						r._html += '{OUT_OF_STOCK_PLACEHOLDER}';

						//looping through array containing sorted cart items in descending order of their micro time
						for( var ctr = cdata.mt.length - 1; ctr >= 0; ctr-- ) {
							var cart_micro_time = cdata.mt[ ctr ];
							var cart_item = cart_items[ cart_micro_time ];
							var cart_item_id = cart_item[ 'product_id' ];
							
							if(cart_item.avl_qty > 0){
								// check for bespoke product start
								if( ! isBespokeProduct && ( typeof cart_item.look_id != 'undefined' ) ) {
									var _lookUpID = parseInt( cart_item.look_id );
									if( utils.isNumber( _lookUpID ) && ( _lookUpID > 0 ) ) {
										isBespokeProduct = true;
									}
								}
								// check for bespoke product end
	                                                        // check for free gift
	                            if(cart_item[ 'is_free_gift' ]==0 && cart_item['is_promo']==0){
	                                                            
	                                                            
								r._html += '<div class="item_card_wrapper">';
								r._html += '<div class="item_card" id="cart_' + cart_item_id + '">';
								r._html += '<div class="item_details_holder">';
								r._html += '<div class="item_img">';
								if(cart_item.is_rental==1){
									r._html += '<span class="mc-rental-tag pf-hover-primary-color pf-text-white font-11 pf-center">RENTALS</span>';
								}
								if(dummy_product_id!=cart_item_id){
									var product_url = root_url + '/' + cart_item.url;
								}else{
									var product_url = 'javascript:void(0)';
								}
								r._html += '<a target="_blank" href="' + product_url + '?src=mnc">';
								r._html += '<img src="' + product_image_url + cart_item.image + '" alt="' + cart_item.name + '"/>';
								//To display stock quantity left 
								if(cart_item.avl_qty <= cnst_qty_left && cart_item.avl_qty > 0 && cart_item.stock_status == 1){
									r._html += '<div class="quantity-left">ONLY '+cart_item.avl_qty+' LEFT</div>';
								}
								r._html += '</a>';
								r._html += '</div>';
								r._html += '<div class="item_details">';
								r._html += '<p class="item_title pf-bold-txt">';
								r._html += '<a target="_blank" href="' + product_url + '?src=mnc">' + cart_item.display_name + '</a>';
								r._html += '</p>';
								if( typeof cart_item.retail_price != 'undefined') {
									if(cart_item.is_rental!=1){
										var _retailPrice = cart_item.retail_price.toString();
										_retailPrice = cart_item.quantity * Math.ceil( _retailPrice.replace( /,/g, '' ) );
										if( _retailPrice > 0 ) {
											r._html += '<p class="rprice"><span class="rp">Retail Price </span>';
											r._html += '<span class="pf-strike">Rs. ' + utils.numberWithCommas( _retailPrice ) + '</span>';
											r._html += '</p>';
										}
									}else{
										var tenure =  cart_item.tenure;
										r._html += '<p class="mc-rental-tenure">Tenure: ';
										r._html += '<span class="mc-rental-tenure-price pf-text-dark-grey">'+tenure.replace('months_price', ' Months')+'</span>';
										r._html += '</p>';
									}
								}
								if(cart_item.is_rental!=1){
									r._html += '<p class="oprice"><span class="rp pf-bold-txt">Offer Price </span>';
								}else{
									r._html += '<p class="mc-rental-price"><span class="rp font-13">Rental Price </span>';
								}
																
								// update offer price
                                if( typeof cart_item.offer_price != 'undefined') {
                                	if(cart_item.is_rental!=1){
	                                    var _offerPrice = cart_item.offer_price.toString();
	                                    r._html += '<span class="txt-green">Rs. ';
                                	}else{
                                		var _offerPrice = cart_item.total.toString();
                                		r._html += '<span class="txt-green pf-bold-txt">Rs. ';
                                	}
                                    var _newOfferPrice = parseInt( _offerPrice.replace( /,/g, '' ) );
                                    _newOfferPrice = utils.numberWithCommas( Math.ceil( _newOfferPrice ) );
                                    r._html += _newOfferPrice + '</span>';
                                }
								
								// r._html += '<span class="txt-red">Rs. ' + utils.numberWithCommas( Math.ceil( cart_item.offer_price .replace( ',', '' ) ) ) + '</span>';							
								r._html += '</p>';
								
								/*
								//To display stock quantity left 
								if(cart_item.avl_qty <= cnst_qty_left && cart_item.avl_qty > 0 && cart_item.stock_status == 1){
									r._html += '<div class="quantity-left">ONLY '+cart_item.avl_qty+' LEFT IN STOCK</div>';
								}
								*/
								r._html += '</div>';
								r._html += '<div class="clearfix"></div>';
								r._html += '</div>';
								r._html += '<div id="minicart_' + cart_item_id + '" class="minicart-error" style="display:none;"><img src="'+root_url + '/' +'images/warning-sign.png" alt="warning-sign" ></div>';
								r._html += '<div class="item_cta">';
								if(cart_item_id!=dummy_product_id){
									var _serviceable_pincode = '';
									if( typeof _pin == 'undefined' ) {
										_serviceable_pincode = utils.readCookie( 'serviceable_pincode' );
									} else {
										_serviceable_pincode = _pin;
									}
	
									if( isNaN( parseInt( _serviceable_pincode ) ) ) {
										_serviceable_pincode = '';
									}
	
									var isProductSoldOut = 0;
									var ths_look_id = cart_item.look_id;
	
									// serviceability / in-stock check
									if(typeof cart_item.pincode_response !== 'undefined' && cart_item.pincode_response.serviceable == 1 && cart_item.stock_status) {
										if( ( typeof cart_item.promotext_incremental_code !== 'undefined' ) && ( cart_item.promotext_incremental_code != '' ) ) {
											r._html += '<p class="pf-border pf-border-lighter-grey-50 pf-border-style-dashed pf-center pf-padding-tiny font-14 pf-italic-txt pf-text-grey pf-margin-top use-coupon">Use Coupon ';
											r._html += '<strong>' + cart_item.promotext_incremental_code + '</strong>';
											r._html += ' to avail offer price</p>';
										}
									} else if((typeof cart_item.pincode_response !== 'undefined') && ( cart_item.pincode_response.serviceable == 0 ) && ( _serviceable_pincode != '' ) && cart_item.stock_status > 0 ) {	
										r._html += '<div id="minicart_' + cart_item_id + '" class="minicart-error"><img src="'+root_url + '/' +'images/warning-sign.png" alt="warning-sign" >';
										r._html += 'Sorry! We don&rsquo;t deliver to ' + _serviceable_pincode;
										r._html += '</div>';
									}
									//r._html += '<div class="clearfix"></div>';
									r._html += '<div class="action_block">';
	
									// hide the option to add/subtract item quantity, if the product is sold out
									r.all_products_sold_out = 0;
									var maxQtyPerCartItem = ( cart_item.avl_qty > max_cart_qty ) ? max_cart_qty : cart_item.avl_qty;
									if((typeof cart_item.pincode_response !== 'undefined') && ( cart_item.pincode_response.serviceable == 1 ) && ( _serviceable_pincode != '' ) && cart_item.stock_status > 0 ) {
										r._html += '<div class="qty_block">';
										r._html += '<a href="javascript://" class="minussign" data-id="' + cart_item_id + '"> - </a>';
										r._html += '<input type="text" class="qty_input" id="t_' + cart_item_id + '" data-type = "'+cart_item.product_type+'" data-max="' + maxQtyPerCartItem + '" value="' + cart_item.quantity + '" data-pos="' + ( ++_ctr ) + '">';
										r._html += '<a href="javascript://" class="plussign" id="plus_'+cart_item_id+'" data-tenure="'+cart_item.tenure+'" data-is_rental="'+cart_item.is_rental+'" data-id="' + cart_item_id + '"> + </a>';
										r._html += '</div>';
									}
									if(cart_item.is_rental === undefined || cart_item.is_rental == 0){
										r._html += '<a href="javascript://"   class="move-wishlist" data-pos="minicart" data-id="' + cart_item_id + '">Move to wishlist</a>';
									}
									r._html += '<a href="javascript://"   class="deleteicon" data-tooltip="Remove Item" data-pos="minicart" data-id="' + cart_item_id + '">Remove</a>';
									r._html += '</div>';
									r._html += '<div class="clearfix"></div>';
									r._html += '</div>';
									r._html += '</div>';
								}
								if(cart_data.free_gift_panasonic_details.dummy_id_present){
	                        		r.all_products_sold_out = 0;
	                        	}

								r._html += '</div>';
	                                                        
	                            }else{
	                            	if(cart_data.free_gift_panasonic_details.status){
	                            		r.all_products_sold_out = 0;
	                            	}
	                            	if(cart_item.is_promo){
	                            		var product_url = root_url + '/' + cart_item.url;
	                            		var image_url = product_image_url + cart_item.image;
	                            	}else{
	                            		var product_url = 'javascript:void(0)';
	                            		var image_url = product_image_url + cart_item_id+'/' +cart_item.image;
	                            	}
	                                r._html += '<div class="item_card_wrapper">';
	                                r._html += '<div class="item_card" id="cart_' + cart_item_id + '">';
	                                r._html += '<div class="item_details_holder">';
	                                r._html += '<div class="item_img">';
	                                r._html += '<a target="_blank" href="' + product_url +'">';
	                                r._html += '<img src="' +  image_url + '" alt="' + cart_item.name + '"/>';
	                                //To display stock quantity left 
	    							if(cart_item.avl_qty <= cnst_qty_left && cart_item.avl_qty > 0 && cart_item.stock_status == 1){
	    								r._html += '<div class="quantity-left">ONLY '+cart_item.avl_qty+' LEFT</div>';
	    							}
	    							r._html += '</a>';
	                                r._html += '</div>';
	                                r._html += '<div class="item_details">';
	                                r._html += '<p class="item_title pf-bold-txt	">';
	                                r._html += '<a target="_blank" href="' + product_url + '">' + cart_item.display_name + '</a>';
	                                r._html += '</p>';
	                                r._html += '<p class="rprice"><span class="rp">Free</span></p>';
	                                r._html += '</div>';
	                                r._html += '<div class="clearfix"></div>';
	                                r._html += '</div>';
	                                r._html += '<div class="item_cta">&nbsp;<div class="action_block">';
	                                if(!cart_item.is_promo){
	                                	r._html += '<a href="javascript://" data-tooltip="Remove Item" class="deleteicon" data-pos="minicart" data-id="' + cart_item_id + '"></a>';
	                                }
	                                r._html += '</div></div>';
	                                r._html += '<div class="clearfix"></div>';
	                                r._html += '</div>';
	                                r._html += '</div>';
	                            }
	                            
								if(  (typeof cart_item.pincode_response !== 'undefined') && cart_item.pincode_response != 0 ) {
									if( ! cart_item.pincode_response.serviceable || ( cart_item.pincode_response.serviceable != 1 ) ) {
										if( utils.isNumber( utils.readCookie( 'serviceable_pincode' ) ) ) {
											r.is_cart_serviceable = false;
											r.non_serviceable_items++;
										}
									}
								}
	
								// if additional requirement is already appended to the page, ignore for rest of the elements
								if( (typeof cart_item.pincode_response !== 'undefined') && ( cart_item.pincode_response.additional_requirement !== undefined ) &&
									( cart_item.pincode_response.additional_requirement.template !== undefined )
								) {
									if( cart_item.pincode_response.additional_requirement.template != 'not required' ) {
										additionalTemplate = cart_item.pincode_response.additional_requirement.template;
										additionalTemplateState = cart_item.pincode_response.additional_requirement.state;
									}
								}
							}
							else {
								if($.inArray(cart_item_id , x.miniCartSoldOutItems.cart) == -1){
									x.miniCartSoldOutItems.cart.push(cart_item_id );
								}
								//x.miniCartSoldOutItems.cart.push( cart_item_id );
								out_of_stock_content += '<li id="cart_' + cart_item_id + '" data-pos="minicart" data-id="' + cart_item_id + '"><img src="' + product_image_url + cart_item.image + '" alt="' + cart_item.name + '" class="pf-image" data-tooltip="' + cart_item.name + '"></li>';
							}
							if(minicartTriggerDatalayer){
	                            var price = ( typeof cart_item.offer_price != 'undefined' )?cart_item.offer_price:( typeof cart_item.price != 'undefined' )?cart_item.price:cart_item.retail_price;
								if(price!=''){
									minicart_dataLayer_string['Basket items'][counter]				= {};
									minicart_dataLayer_string['Basket items'][counter]['id'] 		= cart_item_id;
									minicart_dataLayer_string['Basket items'][counter]['price'] 	= Math.floor(price);
									minicart_dataLayer_string['Basket items'][counter]['quantity'] 	= cart_item.quantity;
									counter++;
								}
							}
						}
						
						if(minicartTriggerDatalayer && !($.isEmptyObject(minicart_dataLayer_string))){
							minicart_dataLayer_string['event'] = 'viewbasket';
                            dataLayer.push(minicart_dataLayer_string); 
                            utils.eraseCookie('minicartTriggerDatalayer');
						}

						/**
						 * Update the bespoke placeholder
						 */
						if( isBespokeProduct ) {
							var _x = '<div id="bespoke_div"  class="item-holder-notification">';
							_x += '<div class="text">Please ensure that the quantities added for your chosen look are as per your requirement';
							_x += '</div>';
							_x += '<a class="gb-close bespoke_close" href="javascript:void(0)">';
							_x += '</a>';
							_x += '</div>';

							r._html = r._html.replace( '{BESPOKE_PLACEHOLDER}', _x );
						} else {
							r._html = r._html.replace( '{BESPOKE_PLACEHOLDER}', '' );
						}
						
						/**
						 * Added by prathamesh.s 
						 * Update the Out of Stock placeholder
						 */
						if(out_of_stock_content != ''){
							var OOS_div = '<div id="out-of-stock" class="out-of-stock">';
							OOS_div    += '<div class="out-of-stock-item_card">';
							OOS_div    += '<div class="item_details_holder">';
							OOS_div    += '<ul>'+out_of_stock_content+'</ul>';
							OOS_div    += '<p><a href="#" onclick="javascript:PF.HEADER.removeSoldOutItems();" class="removed_OFS">Remove Out of Stock items</a></p>';
							OOS_div    += '</div>';
							OOS_div    += '<div class="minicart-error">';
							OOS_div    += '<img src="'+root_url + '/' +'images/warning-sign.png" alt="warning-sign" class="mCS_img_loaded">SOLD OUT';
							OOS_div    += '</div></div></div>';
							r._html 	= r._html.replace( '{OUT_OF_STOCK_PLACEHOLDER}', OOS_div);
						}
						else {
							r._html 	= r._html.replace( '{OUT_OF_STOCK_PLACEHOLDER}', '' );
						}
						
						
						//r._html += '</div>';
						/**
						 * Show additional requirement only if cart is serviceable
						 */
						if( r.is_cart_serviceable && ( additionalTemplate != '' ) && ( additionalTemplateState !='' ) ) {
							r.additional_requirement = true;

							var _id = $( additionalTemplate ).attr( 'id' );

							// if this is already exists, remove it as this will cause
							// errors on a vip which is non-serviceable on the additional requirement pincode
							if( $( '#' + _id ).length > 0 ) {
								$( '#' + _id ).remove();
							}

							$( 'body' ).append( additionalTemplate );

							$( '#add_req_state' ).text( additionalTemplateState );
						}

						r._footer += '<div class="minicart_footer">';
/*
						r._footer += '<!--div class="cart_total">';
						r._footer += '<p class="cart_price">Cart Price: Rs. ';
						r._footer += utils.numberWithCommas( Math.ceil( cdata.total_amount ) ) + '</p>';
						r._footer += '<p class="coupon_info">Use coupon code during checkout to avail offer price</p>';
						r._footer += '</div-->';
*/
						r._footer += '<a href="' + secure_url + '/checkout/cart" class="proceed_cta" onclick="$(this).addClass(\'loading\');">Proceed to pay securely </a>';
						r._footer += '</div>';

						// show the grid/list-view tool-bar
						$( '.mini_cart .toolbar' ).show();
					} else {
						// no items in cart
						r._html += x.showEmptyCartMessage();

						// hide the grid/list-view tool-bar
						$( '.mini_cart .toolbar' ).hide();
					}

					// update the cart product count on the main page
					$( '.cart_bar .count_alert' ).html( cdata.total_items );
				}

				return r;
			},
			showEmptyCartMessage : function() {
				var _msg = '';
				//_msg += '<div id="mini-usercart" class="item_holder mCustomScrollbar" tabindex="0">';
				_msg += '<div class="mini-empty-cart empty-product">';
				_msg += '<img src="'+root_url + '/' +'images/svg/empty-cart.svg" alt="empty product">';
				_msg += '<p class="font-18 pf-margin-0 pf-padding-25">Your shopping cart is empty</p>';
				_msg += '<p class="pf-margin-0 pf-padding-0"><a onclick="javascript:$(\'.mini_cart .gb-close\').trigger(\'click\');" class="font-14">CONTINUE SHOPPING</a></p>';
				_msg += '</div>';
				//_msg += '</div>';
				

				return _msg;
			},
			deleteRecentlyViewedProduct : function( pid ) {
				/**
				 * Delete the given pid from the recently viewed list
				 */
				var _url = secure_url + '/site_page/remove_recent_view';
				var _data = { id : pid };
				var _beforeSend = function() {};
                                var _setUpOptions = {
                                    'dataType' : "json"
                                };
				x.recentlyViewedResponseCache = '';

				utils.makeRequest( _url, 'POST', _data, x.getRecentlyViewed, x.handleError, _beforeSend, '', _setUpOptions );
			},
			getRecentlyViewed : function( data, el ) {
				/**
				 * Recently viewed callback
				 *
				 * Create the wishlist html basis the response
				 */
				//cache the recently viewed response for subsequent requests
				if( x.recentlyViewedResponseCache == '' ) {
					x.recentlyViewedResponseCache = data;
				}

				var views = x.parseRecentViews( data );

				if( ! views ) {
					utils.raiseError(
						'Could not parse JSON response',
						'/site_page/get_recent_views',
						'',
						'',
						data
					);

					return;
				}

				if( x.miniCartSoldOutItems.views.length > 0 ) {
					// $( '.minicart_action' ).show();
					$( '.minicart_action' ).hide(); // no need to show in recently viewed tab
				} else {
					$( '.minicart_action' ).hide();
				}

				$( '.mini_cart .error' ).hide();
				$( '.mini_cart .error #items_not_serviceable' ).hide();
				$( '.mini_cart #notification_box' ).hide();
				$( '.mini_cart .minicart_footer' ).remove();
				$( '#views_mini_cart' ).html( views.total );
				$( '.mini_cart .gb-loader' ).hide();

				if( $( '#recently-viewed' ).length > 0 ) {
					$( '#recently-viewed' ).html( views._html );
					$( '.sorting a[data-selected=1]' ).click();
				}
				else{
					$( '#recently-viewed' ).html( x.emptyRecentViews() );
				}

				x.setCartHeight();

				utils.pushToDataLayer({
					'event': 'event RecentView',
					'category' : 'RVIEW',
					'action': 'Click',
					'label' : 'Show Recently Viewed',
					'opt' : true
				});

				// set the focus on the wish-list tab
				if( el instanceof $ ) {
					$( '.mini_cart .tabs a' ).removeClass( 'active' );
					el.addClass( 'active' );
				}
				global_function.reload_minicart();
				global_function.mCustomScrollInit('MiniCartScrollbar');
			},
			parseRecentViews : function( data ) {
				//data = '{"op":1,"data":[{"name":"Lexus Corner Sofa in Grey by ARRA","url":"https:\/\/warpspeed.pepperfry.com\/lexus-corner-sofa-in-grey-by-arra-1205001.html","price":"33,803","image":"https:\/\/d3uqdunx08evqq.cloudfront.net\/media\/catalog\/product\/l\/e\/90x99\/lexus-corner-sofa-in-grey-by-purple-heart-lexus-corner-sofa-in-grey-by-purple-heart-gpguu9.jpg","score":1492165605,"product_id":1205001,"type_id":"simple","available":0,"enable":0,"visibility":4,"qty":25,"retail_price":51585,"offer_price":33803,"coupon_code":"","promotext_incremental_code":"csincremental"},{"name":"Cooper Three Seater Sofa in Beige Colour by ARRA","url":"https:\/\/warpspeed.pepperfry.com\/cooper-three-seater-sofa-in-beige-colour-by-arra-1415914.html","price":"25,741","image":"https:\/\/d3uqdunx08evqq.cloudfront.net\/media\/catalog\/product\/c\/o\/90x99\/cooper-three-seater-sofa-in-beige-colour-by-arra-cooper-three-seater-sofa-in-beige-colour-by-arra-mq5hsq.jpg","score":1492165541,"product_id":1415914,"type_id":"simple","available":1,"enable":1,"visibility":4,"qty":99,"retail_price":25839,"offer_price":25741,"coupon_code":"","promotext_incremental_code":"csincremental"},{"name":"Toddle Organic Kids Sofa in Yellow by Reme","url":"https:\/\/warpspeed.pepperfry.com\/toddle-organic-kids-sofa-in-yellow-by-reme-1502272.html","price":"4,705","image":"https:\/\/d3uqdunx08evqq.cloudfront.net\/media\/catalog\/product\/o\/r\/90x99\/organic-kids-sofa-in-yellow-by-reme-organic-kids-sofa-in-yellow-by-reme-e2ajec.jpg","score":1492165522,"product_id":1502272,"type_id":"simple","available":0,"enable":0,"visibility":4,"qty":3,"retail_price":7999,"offer_price":4705,"coupon_code":"","promotext_incremental_code":"csincremental"},{"name":"Cooper One Seater Sofa in Beige Colour by ARRA","url":"https:\/\/warpspeed.pepperfry.com\/cooper-one-seater-sofa-in-beige-colour-by-arra-1415916.html","price":"10,976","image":"https:\/\/d3uqdunx08evqq.cloudfront.net\/media\/catalog\/product\/c\/o\/90x99\/cooper-one-seater-sofa-in-beige-colour-by-arra-cooper-one-seater-sofa-in-beige-colour-by-arra-dp4v4p.jpg","score":1492165511,"product_id":1415916,"type_id":"simple","available":1,"enable":1,"visibility":4,"qty":2,"retail_price":12777,"offer_price":10976,"coupon_code":"","promotext_incremental_code":"csincremental"},{"name":"Cooper Three Seater Sofa in Royal Blue Colour by ARRA","url":"https:\/\/warpspeed.pepperfry.com\/cooper-three-seater-sofa-in-royal-blue-colour-by-arra-1415929.html","price":"25,741","image":"https:\/\/d3uqdunx08evqq.cloudfront.net\/media\/catalog\/product\/c\/o\/90x99\/cooper-three-seater-sofa-in-royal-blue-colour-by-arra-cooper-three-seater-sofa-in-royal-blue-colour--mklk7d.jpg","score":1492165504,"product_id":1415929,"type_id":"simple","available":1,"enable":1,"visibility":4,"qty":79,"retail_price":25839,"offer_price":25741,"coupon_code":"","promotext_incremental_code":"csincremental"},{"name":"Morris One Seater Sofa Lounge in Beige Colour by ARRA","url":"https:\/\/warpspeed.pepperfry.com\/morris-one-seater-sofa-lounge-in-beige-colour-by-arra-1495387.html","price":"30,291","image":"https:\/\/d3uqdunx08evqq.cloudfront.net\/media\/catalog\/product\/m\/o\/90x99\/morris-one-seater-sofa-lounge-in-beige-colour-by-arra-morris-one-seater-sofa-lounge-in-beige-colour--o72nnc.jpg","score":1492165488,"product_id":1495387,"type_id":"simple","available":0,"enable":1,"visibility":4,"qty":80,"retail_price":35137,"offer_price":30291,"coupon_code":"","promotext_incremental_code":"csincremental"},{"name":"Marina Two Seater Sofa by Evok","url":"https:\/\/warpspeed.pepperfry.com\/marina-double-seater-sofa-by-evok-1163901.html","price":"28,340","image":"https:\/\/d3uqdunx08evqq.cloudfront.net\/media\/catalog\/product\/m\/a\/90x99\/marina-double-seater-sofa-by-evok-marina-double-seater-sofa-by-evok-57pwm6.jpg","score":1492165475,"product_id":1163901,"type_id":"simple","available":1,"enable":1,"visibility":4,"qty":0,"retail_price":35990,"offer_price":28340,"coupon_code":"","promotext_incremental_code":""}]}';
				/**
				 * Create the recently viewed html basis the response
				 */
				var r = {
					_html : '',
					total : 0
				};
				var outOfStockContent = '';

				try {
					data = $.parseJSON( data );
				} catch( error ) {
					return false;
				}

				var _status = parseInt( data.op );
				if( isNaN( _status ) ) {
					// how to handle it?
					return;
				}

				if( _status == 0 ) {
					// no recently viewed items
					return r;
				}

				if( typeof data.data != 'undefined' ) {
					var count = Object.keys( data.data ).length;
					if( count ) {
						r.total = count;
						var productData = data.data;
						//r._html += '<div id="mini-userviews" class="item_holder" tabindex="0">';
						var content = '';
						for( var i in productData ) {
							content  = x.recentViewData(productData[ i ]);
							if(typeof content.isProductSoldOut != 'undefined'  && content.isProductSoldOut == 0){
								r._html += content._html;
							}
							else {
								outOfStockContent += content._html;
							}
						}
						r._html += outOfStockContent;
					}
					// show the grid/list-view tool-bar
					$( '.mini_cart .toolbar' ).show();
				}
				else {
					r._html  = x.emptyRecentViews();
				}

				return r;
			},
			recentViewData : function(_v) {
				var r = {
					_html : '',
					isProductSoldOut : 0
				};
				r._html += '<div class="item_card_wrapper">';
				r._html += '<div class="item_card" id="recent_' + _v.product_id + '">';
				r._html += '<div class="item_details_holder">';
				r._html += '<div class="item_img">';
                r._html += '<a target="_blank" href="' + _v.url + '">';
                r._html += '<img src="' + _v.image + '" alt="' + _v.name + '"/>';
                //To display stock quantity left 
				if(_v.qty <= cnst_qty_left && _v.qty > 0){
					r._html += '<div class="quantity-left">ONLY '+_v.qty+' LEFT</div>';
				}
				r._html += '</a>';
				r._html += '</div>';
				r._html += '<div class="item_details">';
				r._html += '<p class="item_title">';
				r._html += '<a target="_blank" href="' + _v.url + '">' + _v.name + '</a>';
				r._html += '</p>';
				if( typeof _v.retail_price != 'undefined' ) {
					var _retailPrice = _v.retail_price.toString();
					_retailPrice = Math.ceil( _retailPrice.replace( /,/g, '' ) );
					if( _retailPrice > 0 ) {
						r._html += '<p class="rprice"><span class="rp">Retail Price </span>';
						r._html += '<span class="pf-strike">Rs. ' + utils.numberWithCommas( _retailPrice ) + '</span>';
						r._html += '</p>';
					}
				}
				r._html += '<p class="oprice"><span class="rp pf-bold-txt">Offer Price </span>';
				var _offerPrice = _v.offer_price.toString();
				r._html += '<span class="txt-green">Rs. ' + utils.numberWithCommas( Math.ceil( _offerPrice.replace( /,/g, '' ) ) ) + '</span>';
				r._html += '</p>';
				r._html += '</div>';
				r._html += '<div class="clearfix"></div>';
				r._html += '</div>';
				r._html += '<div class="item_cta">';

				// in-stock check
				switch( _v.type_id ) {
					case 'simple':
						if(( _v.visibility > 1 ) && ( _v.enable == 1 ) && ( _v.available == 1 ) && ( _v.qty > 0 )) {
							if( ( typeof _v.promotext_incremental_code !== 'undefined' ) && ( _v.promotext_incremental_code != '' ) ) {
								r._html += '<p class="pf-border pf-border-lighter-grey-50 pf-border-style-dashed pf-center pf-padding-tiny font-14 pf-italic-txt pf-text-grey pf-margin-top use-coupon">Use Coupon ';
								r._html += '<strong>' + _v.promotext_incremental_code + '</strong>';
								r._html += ' to avail offer price</p>';
							}
						} else {
							r.isProductSoldOut = 1;
						}
						break;
					case 'bundle':
						if( ( _v.visibility == 1 ) && ( _v.enable == 1 ) && ( _v.available == 1 ) && ( _v.qty > 0 ) ) {
							if( ( typeof _v.coupon_code !== 'undefined' ) && ( _v.coupon_code != '' ) ) {
								r._html += '<p class="pf-border pf-border-lighter-grey-50 pf-border-style-dashed pf-center pf-padding-tiny font-14 pf-italic-txt pf-text-grey pf-margin-top use-coupon">Use Coupon ';
								r._html += '<strong>' + _v.coupon_code + '</strong>';
								r._html += ' to avail offer price</p>';
							}
						} else {
							r.isProductSoldOut = 1;
						}
						break;
					case 'configurable':
						if( ( _v.visibility > 1 ) && ( _v.enable == 1 ) && ( _v.available == 1 ) ) {
							if( ( typeof _v.promotext_incremental_code !== 'undefined' ) && ( _v.promotext_incremental_code != '' ) ) {
								r._html += '<p class="pf-border pf-border-lighter-grey-50 pf-border-style-dashed pf-center pf-padding-tiny font-14 pf-italic-txt pf-text-grey pf-margin-top use-coupon">Use Coupon ';
								r._html += '<strong>' + _v.promotext_incremental_code + '</strong>';
								r._html += ' to avail offer price</p>';
							}
						} else {
							r.isProductSoldOut = 1;
						}
						break;
					default:
						break;
				}
				//////////////////////////////////////////////////////////////////

				r._html += '<div class="action_block">';

				// hide the option to add/subtract item quantity, if the product is sold out
				if( ! r.isProductSoldOut) {
					if(typeof _v.is_rental === undefined || _v.is_rental == 0){
						if( _v.type_id == 'simple' ) {
							r._html += '<a href="javascript:void(0)" data-tooltip="Add to Cart" data-type="simple" data-rvitem="' + _v.product_id + '" class="addtocart_icon" data-tab="myviews" unbxdattr="AddToCart" unbxdparam_sku="' + _v.product_id + '"><img src="'+root_url + '/' +'images/addTOCart.png" alt="addTOCart" class="addTOCart">Add to Cart</a>';
						} else {
                                                        r._html += '<a href="' + _v.url + '?act=atc" data-tooltip="Add to Cart" data-type="' + _v.type_id + '" class="addtocart_icon" data-tab="myviews" data-rvitem="' + _v.product_id + '" unbxdattr="AddToCart" unbxdparam_sku="' + _v.product_id + '"><img src="'+root_url + '/' +'images/addTOCart.png" alt="addTOCart" class="addTOCart">Add to Cart</a>';
							}
						}
					}
				else {
					r._html += '<div class="minicart-error">SOLD OUT!</div>';
					x.miniCartSoldOutItems.views.push( _v.product_id );
				}
				if(typeof _v.is_rental === undefined || _v.is_rental == 0){
					r._html += '<a href="javascript://"   class="move-wishlist" data-pos="views" data-id="' +_v.product_id+ '">Move to wishlist</a>';
				}
				r._html += '</div>';
				r._html += '<div class="clearfix"></div>';
				r._html += '</div>';
				r._html += '</div>';
                r._html += '</div>';
                
                return r;
			},
			emptyRecentViews : function() {
				var _html = '';
				_html  ='<div class="mini-empty-cart empty-product">';
				_html +='<img src="'+root_url + '/' +'images/svg/empty-recently-view.svg" alt="empty product">';
				_html +='<p class="font-18 pf-margin-0 pf-padding-25">Nothing to display here!</p>';
				_html +='<p class="pf-margin-0 pf-padding-0"><a onclick="javascript:$(\'.mini_cart .gb-close\').trigger(\'click\');" class="font-14">START SHOPPING</a></p>';
				_html +='</div>';
				return _html;
			},
			renderWishlist : function( data, el ) {
				/**
				 * The wishlist callback
				 *
				 * Create the wishlist html basis the response
				 */
				// cache the wishlist response for subsequent requests
				if( x.wishlistResponseCache == '' ) {
					x.wishlistResponseCache = data;
				}

				var _wishList = x.parseWishList( data );

				if( x.miniCartSoldOutItems.wishlist.length > 0 ) {
					// $( '.minicart_action' ).show();
					$( '.minicart_action' ).hide(); // don't need to show in mini-cart
				} else {
					$( '.minicart_action' ).hide();
				}

				$( '.mini_cart .error' ).hide();
				$( '.mini_cart .error #items_not_serviceable' ).hide();
				$( '.mini_cart #notification_box' ).hide();
				$( '.mini_cart .minicart_footer' ).remove();
				$( '.mini_cart .gb-loader' ).hide();
				$( '#wishlist_mini_cart' ).html( _wishList.total );

				if( $( '#mini-userwishlist' ).length > 0 ) {
					$( '#mini-userwishlist' ).html( _wishList._html );
					$( '.sorting a[data-selected=1]' ).click();
				}
				
				x.setCartHeight();

				// set the focus on the wish-list tab
				if( el instanceof $ ) {
					$( '.mini_cart .tabs a' ).removeClass( 'active' );
					el.addClass( 'active' );
				}	
				global_function.reload_minicart();
				global_function.mCustomScrollInit('MiniCartScrollbar');
			},
			parseWishList : function( _data ) {
				/**
				 * Create the wishlist html basis the response
				 */
				var r = {
					_html : '',
					total : 0
				};

                                var data;
                                try {
                                    data = $.parseJSON( _data );
                                } catch(e) {
                                    data = _data;
                                }

                           
				var _status = parseInt( data.status );
				if( isNaN( _status ) || ( _status == 0 ) ) {
					r._html	= x.emptywishlistcart();
					return r;
				}

				for( var wishlist_id in data.data ) {
					var wish_list = data.data[ wishlist_id ];

					r.total++;
                    r._html += '<div class="item_card_wrapper">';
					r._html += '<div class="item_card" id="cart_' + wishlist_id + '">';
					r._html += '<div class="item_details_holder">';
					r._html += '<div class="item_img">';
					if(typeof wish_list.is_giftcard !== 'undefined'){
						r._html += '<a target="_blank" href="' + wish_list.url + '">';
					}else{
						r._html += '<a target="_blank" href="' + wish_list.url + '?src=wmnc">';
                    }

                    r._html += '<img src="' + wish_list.image + '" alt="' + wish_list.name + '"/>';
					//To display stock quantity left 
					if(wish_list.qty <= cnst_qty_left && wish_list.qty > 0 && wish_list.type_id != "look" && wish_list.type_id != "bundle"){
						r._html += '<div class="quantity-left">ONLY '+wish_list.qty+' LEFT</div>';
					}
					r._html += '</a>';
					r._html += '</div>';
					r._html += '<div class="item_details">';
					r._html += '<p class="item_title pf-bold-txt">';
					if(typeof wish_list.is_giftcard !== 'undefined'){
						r._html += '<a target="_blank" href="' + wish_list.url + '">' + wish_list.name + '</a>';
					}else{
						r._html += '<a target="_blank" href="' + wish_list.url + '?src=wmnc">' + wish_list.name + '</a>';
                    }
					r._html += '</p>';
					if( typeof wish_list.retail_price != 'undefined' ) {
						var _retailPrice = wish_list.retail_price.toString();
						_retailPrice = Math.ceil( _retailPrice.replace( /,/g, '' ) );
						if( _retailPrice > 0 ) {
							r._html += '<p class="rprice"><span class="rp">Retail Price </span>';
							r._html += '<span class="pf-strike">Rs. ' + utils.numberWithCommas( _retailPrice ) + '</span>';
							r._html += '</p>';
						}
					}
					r._html += '<p class="oprice"><span class="rp pf-bold-txt">Offer Price </span>';
					var _offerPrice = wish_list.offer_price.toString();
					r._html += '<span class="txt-green">Rs. ' + utils.numberWithCommas( Math.ceil( _offerPrice.replace( /,/g, '' ) ) ) + '</span>';
					r._html += '</p>';
					
					

					var isProductSoldOut = 0;

					// in-stock check
					switch( wish_list.type_id ) {
						case 'simple':
							if( ( wish_list.visibility > 1 ) && ( wish_list.enable == 1 ) && ( wish_list.available == 1 ) && ( wish_list.qty > 0 ) ) {
								if( ( typeof wish_list.promotext_incremental_code !== 'undefined' ) && ( wish_list.promotext_incremental_code != '' ) ) {
									r._html += '<p class="pf-border pf-border-lighter-grey-50 pf-border-style-dashed pf-center pf-padding-tiny font-14 pf-italic-txt pf-text-grey pf-margin-top use-coupon">Use Coupon ';
									r._html += '<strong>' + wish_list.promotext_incremental_code + '</strong>';
									r._html += ' to avail offer price</p>';
								}
							} else {
								isProductSoldOut = 1;
							}
							break;
						case 'bundle':
							if( ( wish_list.visibility == 1 ) && ( wish_list.enable == 1 ) && ( wish_list.available == 1 ) && ( wish_list.qty > 0 ) ) {
								if( ( typeof wish_list.coupon_code !== 'undefined' ) && ( wish_list.coupon_code != '' ) ) {
									r._html += '<p class="pf-border pf-border-lighter-grey-50 pf-border-style-dashed pf-center pf-padding-tiny font-14 pf-italic-txt pf-text-grey pf-margin-top use-coupon">Use Coupon ';
									r._html += '<strong>' + wish_list.coupon_code + '</strong>';
									r._html += ' to avail offer price</p>';
								}
							} else {
								isProductSoldOut = 1;
							}
							break;
						case 'configurable':
							if( ( wish_list.visibility > 1 || typeof wish_list.is_giftcard !== 'undefined') && ( wish_list.enable == 1 ) && ( wish_list.available == 1 ) ) {
								if( ( typeof wish_list.promotext_incremental_code !== 'undefined' ) && ( wish_list.promotext_incremental_code != '' ) ) {
									r._html += '<p class="pf-border pf-border-lighter-grey-50 pf-border-style-dashed pf-center pf-padding-tiny font-14 pf-italic-txt pf-text-grey pf-margin-top use-coupon">Use Coupon ';
									r._html += '<strong>' + wish_list.promotext_incremental_code + '</strong>';
									r._html += ' to avail offer price</p>';
								}
							} else {
								isProductSoldOut = 1;
							}
							break;
						default:
							break;
					}
					r._html += '</div>';
					r._html += '<div class="clearfix"></div>';
					r._html += '</div>';
					r._html += '<div class="item_cta">';
					r._html += '<div class="action_block">';

					// hide the option to add/subtract item quantity, if the product is sold out
					if( ! isProductSoldOut ) {
						if( wish_list.type_id == 'simple') { //added type id bundle for wardrobe products
							r._html += '<a href="javascript:void(0)" data-tooltip="Add to Cart" data-type="' +  wish_list.type_id + '" data-wishlistitem="' + wishlist_id + '" class="addtocart_icon" data-tab="mywishlist" unbxdattr="AddToCart" unbxdparam_sku="' + wishlist_id + '">';
							r._html += '<img src="'+root_url + '/' +'images/addTOCart.png" alt="addTOCart" class="addTOCart">Add to Cart</a>';
						} else if( wish_list.type_id != 'simple' &&  wish_list.type_id != 'bundle'){ // removing add to cart button for wardrobe
							if(typeof wish_list.is_giftcard !== 'undefined'){
								r._html += '<a href="' + wish_list.url + '" data-tooltip="Add to Cart" data-type="' + wish_list.type_id + '" class="addtocart_icon" data-tab="mywishlist" data-wishlistitem="' + wishlist_id + '">';
							}else{
								r._html += '<a href="' + wish_list.url + '?act=atc" data-tooltip="Add to Cart" data-type="' + wish_list.type_id + '" class="addtocart_icon" data-tab="mywishlist" data-wishlistitem="' + wishlist_id + '">';
							}
							r._html += '<img src="'+root_url + '/' +'images/addTOCart.png" alt="addTOCart" class="addTOCart">Add to Cart</a>';
						}
					}
					else{
						r._html += '<div class="minicart-error">SOLD OUT!</div>';
						x.miniCartSoldOutItems.wishlist.push( wishlist_id );
					}

					r._html += '<a href="javascript://" class="deleteicon" data-tooltip="Remove Item" data-type="' +  wish_list.type_id + '" data-pos="wishlist" data-id="' + wishlist_id + '">Remove</a>';
					r._html += '</div>';
					r._html += '<div class="clearfix"></div>';
					r._html += '</div>';
					r._html += '</div>';
                    r._html += '</div>';
                    
					// show the grid/list-view tool-bar
					$( '.mini_cart .toolbar' ).show();
				}
				//r._html += '</div>';	
				return r;
			},
			emptywishlistcart : function(){
				// no data in wish-list
				var _html  = '';
				_html += '<div class="mini-empty-cart empty-product">';
				_html += '<img src="'+root_url + '/' +'images/svg/empty-wishlist.svg" alt="empty product">';
				_html += '<p class="font-18 pf-margin-0 pf-padding-25">You haven’t added any item <br> to your wishlist</p>';
				_html += '<p class="pf-margin-0 pf-padding-0"><a onclick="javascript:$(\'.mini_cart .gb-close\').trigger(\'click\');" class="font-14">START WISHING   <img src="'+root_url + '/' +'images/svg/happy-2.svg" alt="happy"></a></p>';
				_html += '</div>';
				/*
	                * Added by karthick.ns
	                * condition (typeof page_type !== "undefined") 
	                * To avoid the error if pagetype not defined 
	                */
//					if( (typeof page_type !== "undefined") && (page_type == 'vip') ) {
//						$( '.pf-wishlist-ic' ).removeClass( 'active-wishlist' );
//					}
                return _html;
			},
			reAssignKeys : function( array ) {
				// takes array as input and check for duplicate keys.
				// if duplicate keys exists, increment one key by one
				var i = null;
				var count = 1;
				var cart_item = array[ 'cart_item' ];
				var mt = array[ 'mt' ];

				var CI = new Array();
				var MT = new Array();

				var returnData = new Array();

				for( var prop in cart_item ) {
					var key = parseInt( cart_item[ prop ].micro_time );

					if( CI.hasOwnProperty( key ) ) {
						key += count;
						count ++;
					}

					CI[ key ] = cart_item[ prop ];
					MT.push( key );
				}

				returnData[ 'cart_item' ] = CI;
				returnData[ 'mt' ] = MT.sort();
				returnData[ 'total_items' ] = array[ 'total_items' ];
				returnData[ 'total_amount' ] = array[ 'total_amount' ];

				return returnData;
			},
			removeSoldOutItems : function() {
				/**
				 * Remove sold out items from cart/wishlist/recentlyViewed tabs in mini-cart
				 */
				var activeTab = $( '.mini_cart .tabs a.active' );

				if( activeTab.length ) {
					var _id = $( '.mini_cart .tabs a.active' ).attr( 'id' ).toLowerCase();

					switch( _id ) {
						case 'mini-usercart-tab':
							var _len = x.miniCartSoldOutItems.cart.length;
							var soldOutItems = x.miniCartSoldOutItems.cart.slice();
							
							$('#out_of_stock_count').html(_len);
					        $( '.minicart_action' ).hide();
					        if( _len ) {
								for( var i = 0;i < _len; i++ ) {
									x.deleteProductFromCart($('#cart_' + soldOutItems[ i ]));
								}
							}
							setTimeout(function() {
								 $('body').addClass('active');
					     	     $('.popup_overlay').show();
					     	}, 500);
					        break;
						case 'mini-userwishlist-tab':
							var _len = x.miniCartSoldOutItems.wishlist.length;
							if( _len ) {
								for( var i = 0;i < _len; i++ ) {
									$( 'a.deleteicon[data-id="' + x.miniCartSoldOutItems.wishlist[ i ] + '"][data-pos="wishlist"]' ).click();
								}
							}

							x.miniCartSoldOutItems.wishlist.length = 0;
							$( '.minicart_action' ).hide();
							break;
						case 'mini-userviews-tab':
							var _len = x.miniCartSoldOutItems.views.length;
							if( _len ) {
								for( var i = 0;i < _len; i++ ) {
									$( 'a.deleteicon[data-id^="rv_' + x.miniCartSoldOutItems.views[ i ] + '"][data-pos="views"]' ).click();
								}
							}

							x.miniCartSoldOutItems.views.length = 0;
							$( '.minicart_action' ).hide();
							break;
						default:
							break;
					}
				}
			},
			handleError : function( _x, _y, _z ) {
                            
				// error callback
				$( "#reset-form #forgotPass" ).removeClass( 'loading' );
				$( '.mini_cart .gb-loader' ).hide();
			},
			checkFEPincode : function() {
				var pin = $('#fe-header-pin').val();
				try {
					if (utils.isNumber(pin)) {
                                            if (pin.toString().length === 6) {
                                                $('#fe-header-pin-form').find('div.error-text').hide();
                                                $('#fe-header-pin-form').find('input[type=submit]').prop('disabled', true);
                                                var _url = root_url + "/furniture/getPinData";
                                                utils.makeRequest(
                                                    _url,
                                                    'POST',
                                                    {
                                                        'pincode' : pin
                                                    },
                                                    function (d) {                   
                                                        try {
                                                        d = $.parseJSON(d);
                                                        } catch(e) {
                                                            //do nothing
                                                        }

                                                        if (d.is_exchange_available == '1'){
                                                            $('#fe-header-valid-pin').find('.pinpd').html($('#fe-header-pin').val());
                                                            $('#fe-header-check-pin').hide();
                                                            $('#fe-header-invalid-pin').hide();
                                                            $('#fe-header-valid-pin').css('display','table-cell');
                                                        } else {
                                                            $('#fe-header-invalid-pin').find('.pinpd').html($('#fe-header-pin').val());
                                                            $('#fe-header-check-pin').hide();
                                                            $('#fe-header-valid-pin').hide();
                                                            $('#fe-header-invalid-pin').css('display','table-cell');
                                                        }
                                                                $('#fe-header-pin-form').find('input[type=submit]').prop('disabled', false);
                                                    },
                                                    function (_x, _y, _z) {
                                                        $('#fe-header-pin-form').find('input[type=submit]').prop('disabled', false);
                                                        PF.ERROR.raiseError(_x, _y, _z);
                                                    },
                                                    '',
                                                    {},
                                                    {dataType: 'json'}
                                                );
                                            } else {
                                                $('#fe-header-pin-form').find('div.error-text').html('Pincode must be 6-digit').fadeIn();
                                            }
					} else {
                                            $('#fe-header-pin-form').find('div.error-text').html('Valid pincode needed to check Furniture Upgrade availability').fadeIn();
					}
				} catch( _error ) {
                                    return false;
				}

				return false;
			},
			changeFEPin : function() {
				$('#fe-header-pin').val('');
				$('#fe-header-invalid-pin').hide();
				$('#fe-header-valid-pin').hide();
				$('#fe-header-check-pin').css('display','table-cell');
			},
             hideBespokeMsg : function() {
                    $( '#bespoke_div' ).hide();
            },
            testimonialValidation : function(form_id){
            	var errors = true;
                errors = x.validateForm("",form_id);
                
                if(!errors){
                	if(recaptcha == 'VISIBLE' ) {
	                    //Captcha Validation Code Start
	                    var data = $("#testimonial_form #RecaptchaField-Tstmonil").attr('submit_count');
	                    if(grecaptcha.getResponse(widget_tstmonial)=="" && data >=2){
	                        $("#"+form_id+" #captchaError").html('Please re-enter your reCAPTCHA.').show();
	                        errors = true;

	                    }
	                }else {
		                grecaptcha.execute(widget_tstmonial);
		                //errors=1;
		                /*if($.trim(isRecaptcha) != 'success'){
		                    errors=1;
		                    grecaptcha.reset(widgetId_Primo);
		                }*/
	                }
                   //Captcha Validation Code End
                }
                if(recaptcha == 'VISIBLE') {
	                if(!errors){

	                	x.testimonialSubmit(form_id);
						

	                }else{
	                    grecaptcha.reset(widget_tstmonial);
	                    $("#"+form_id+" [name='logSubmit']").removeAttr('disabled');
	                    x.removeBlueButtonLoader(form_id);
	                    return false;
	                }
            	}
                
            },
            testimonialSubmit : function(form_id){
            	

            	$("#testimonial_submit").attr('disabled', 'disabled');
                var path = root_url + "/customer/saveTestimonial?ref=" + $current;
				var _data = $("#"+form_id).serialize();


				var _beforeSend = function () {
				x.addBlueButtonLoader(form_id);
                };
                var _setUpOptions = {
                    //'dataType' : "json"
                };
				var _params = {
				  'form_id' : form_id
				};
				
				utils.makeRequest( path, 'POST', _data, x.testimonialSubmitResponse, x.testimonialError, _beforeSend, _params,  _setUpOptions);
					

                
                
            },
            testimonialSubmitResponse : function(result, _params){
                            var data = '';

				/**
				 * Different modal forms on site send response in different formats
				 * JSON, String, Integer...
				 */
				grecaptcha.reset(widget_tstmonial);
				try {
					data = $.parseJSON( result );
				} catch( error ) {
					data = result;
				}
                            if (data == "success") {
                                $("#testimonial_submit").removeAttr("disabled");
                                $('#testimonialBox').delay(400).fadeOut(function(){
                                    $('#popup_overlay').hide();
                                    $("#testiText").val('');
                                    $("#testimonial_form #6_letters_code").val('');
                                });
                                utils.eraseCookie("testimonial_cookie");
                                x.removeBlueButtonLoader(_params.form_id);
                                $("#testimonial_form #captchwidget").empty('');
                                return false;

                            } else if(data == "Please Login First"){
                            
                                if(!$('#loginPopupBox').is(':visible')){
                                        $('#loginPopupBox').fadeToggle( "slow", "linear" );
                                }
                                $("#testimonialBox").fadeOut(100);
                                $("#login-normal [name='logSubmit']").removeAttr('disabled');
                                $('#registerPopupBox, #returnLoginPopupBox').fadeOut(400);
                                $('#login-forgot-pwd-wrap').fadeOut(400);
                                $('#login-pwd-email-sent').fadeOut(400);
                                $('#popup_overlay').fadeIn(200);
                                $('#emailid').focus();
                                if($('#emailid').val()==''){
                                    $('#password').val('');
                                }
                                x.removeBlueButtonLoader(_params.form_id);
                            } else if($.trim(data) == "Please enter Valid Captcha."){
                            	//$("#testimonial_form #6_letters_code").val('');
                            	$("#testimonial_form #captchaError").css("display", "block").html("Please re-enter your reCAPTCHA.");
                            	x.removeBlueButtonLoader(_params.form_id);
                            	$("#testimonial_submit").removeAttr("disabled");
                            } else {
                                $("#testi_Error").css("display", "block").html(data);
                                x.removeBlueButtonLoader(_params.form_id);
                                //$("#testi_Error").html("Token expired.");
                            }
                            //x.refreshCaptcha('testimonial_form');
                            x.capchacountajax('testimonial_form','data');
                            return false;
                            
                        },
                        testimonialError: function (data) { 
                            x.removeBlueButtonLoader(_params.form_id);
                            $('#testimonialBox').delay(400).fadeOut(function(){
                                $('#popup_overlay').removeClass('active');
                                $("#thanks_text").html('Thanks for taking the time to write a testimonial for us, we are a young company and your words of appreciation help build our reputation.');
                                $("#testiText").val('');
                            });
                            return false;
                        },

                        // ajax function to count no of attempt on perticuler page (param form_id,page(login,data))
                        capchacountajax: function(form_id,page) {
                        	if (recaptcha == 'VISIBLE'){
                        		var path = secure_url + '/customer/capchacountajax?page=' +page;
								var _data = $("#"+form_id).serialize();

								var _beforeSend = function () {
									x.addBlueButtonLoader(form_id);
							    };

								var _params = {
								  'form_id' : form_id
								};

								utils.makeRequest( path, 'POST', _data, x.capchacountajaxresponse, x.handleError, _beforeSend, _params );
							}
						},
						capchacountajaxresponse: function(result, _params) {
						   var data='';
						   try {
								data = $.parseJSON( result );
							} catch( error ) {
								data = result;
							}
							$( "#"+_params.form_id+" #capchacount").val(data);
							$( "#"+_params.form_id + " .btn-blue" ).removeClass( "btn-loader" );
							if(parseInt(data)<2){
                                                            if(_params.form_id == 'login_popup_login_form'){
                                                                
                                                                $("#"+_params.form_id + " #RecaptchaField-login").attr('submit_count',data);
                                                                
                                                            }else if(_params.form_id == 'testimonial_form'){
                                                                //Need to hide testimonial captcha div if count < 2
                                                                $("#"+_params.form_id + " #RecaptchaField-Tstmonil").hide();
                                                                $("#"+_params.form_id + " #captchaError").hide();                                                                
                                                                $("#"+_params.form_id + " #RecaptchaField-Tstmonil").attr('submit_count',data);
                                                            }
							}else{
                                                            if(_params.form_id == 'login_popup_login_form'){
                                                                
                                                                $("#"+_params.form_id + " #RecaptchaField-login").show();
                                                                $("#"+_params.form_id + " #RecaptchaField-login").attr('submit_count',data);
                                                                
                                                            }else if(_params.form_id == 'testimonial_form'){
                                                                grecaptcha.reset(widget_tstmonial);
                                                                $("#"+_params.form_id + " #RecaptchaField-Tstmonil").show();
                                                                $("#"+_params.form_id + " #RecaptchaField-Tstmonil").attr('submit_count',data);
                                                            }
							}
							return false;

						},
						// function to load captcha on particuler form (param form_id)
						capchawidgetajax: function(form_id) {


						    var path =secure_url + '/site/captchawidget?form_id='+ form_id;
						    var _data='';
						    var _beforeSend = '';
							var _params = {
							  'form_id' : form_id
							};

							utils.makeRequest( path, 'POST', _data, x.capchawidgetajaxresponse, x.handleError, _beforeSend, _params );
						},
						capchawidgetajaxresponse: function(result, _params) {

						   var data='';
						    try {
								data = $.parseJSON( result );
							} catch( error ) {
								data = result;
							}
							
							if ($("#"+_params.form_id + " #captchwidget").is(':empty')) {
								$("#"+_params.form_id + " #captchwidget").append(data);
								$("#"+_params.form_id+" #capchaDivContainer").css("display","block");
								
							}
							x.refreshCaptcha(_params.form_id);
							return false;

						},bespokeEventTracker : function(trggrd_action, trggrd_label){

			                dataLayer.push({
			                    'category'  :   'Bespoke',
			                    'action'    :   trggrd_action,
			                    'label'     :   trggrd_label,
			                    'event'     :   'event Bespoke'
			                });
			            	
						},
						// function to refresh captcha on particuler form (param form_id)
						refreshCaptcha: function(form_id){
						    var num = Math.floor((Math.random()*100)+1);
						    jQuery("#"+ form_id +" #captchaimg").attr('src','/site_page/captcha?q='+num);
						},
						captchavalidation: function(form_id){ //captcha field validation
							var errors=0;
							if(parseInt($( "#"+ form_id +' #capchacount').val())>1){
								if($.trim($("#"+form_id+" #6_letters_code").val()) == "")
								{
									$("#"+form_id+" #captchaError").parent().addClass('input_error');
									$("#"+form_id+" #captchaError").html('Required').css('display','block');
									errors=1;
								} else
								{
									$("#"+form_id+" #captchaError").parent().removeClass('input_error');
									$("#"+form_id+" #captchaError").html('').css('display','none');
									errors=0-4;
								}
								
							}
							return errors;
						},
						 /** Added by prathamesh to clear form fields by formID **/
						resetFormByFormID: function(form_id){
			                if( $( '#'+form_id).length > 0 ) {
			                	$( '#'+form_id).find("input[type=text],input[type=number],textarea,select").each(function() {
			                		if($( this ).attr('id').toLowerCase().indexOf("email") == -1 && $( this ).attr('id').toLowerCase().indexOf("country") == -1){
			                			$( this ).val('');
			                		}
			                		if($( this ).attr('id').toLowerCase().indexOf("country") > 0) {
			                           $(this).val('IN').trigger('change');
			                        }
			                	});
								$( '.error-text' ).each(function() {
									$( '.error-text' ).hide();
									$( '.errormsg' ).hide();
									$( '.error-msg' ).hide();
								});
			                    $('#'+form_id+' div').removeClass('frm-error-wrap');
			                    $('#'+form_id+' div').removeClass('frm-success-wrap');
						    }
						},
						/**
						 * @author prathamesh.s
						 * Get and assign wishlist count to header Wishlist Counter	
						 */
						getwishlistcount: function() {
							var path =secure_url + '/site_page/getWishlistHeaderCount';
						    var _data='';
						    var _beforeSend = '';
							var _params = {};
							utils.makeRequest( path, 'POST', _data, x.getwishlistcountresponse, x.handleError, _beforeSend, _params );
						},
						getwishlistcountresponse: function(result, _params) {
							$('.wishlist_bar .count_alert').html(result);
						},
						/**
						 * @author prathamesh.s
						 * Detects count changes and if count is zero than hides the element
						 */
						count_alert_detector: function() {
							$('.count_alert').bind("DOMSubtreeModified", function() {
								var count = $.trim($(this).html());
								( count == 0 || count == '')?$(this).hide():$(this).show();
							});
							$('.item_count').bind("DOMSubtreeModified", function() {
								var count = $.trim($(this).html());
								( count == 0 || count == '')?$(this).hide():$(this).show();
							});
						}
		};

		a.HEADER = x;
	})( PF, $ );

	$(document).ready(function () {
		//
		/*Shop By Room Type*/
		$('.shop_by_type li').bind('click', function(){ 
            /*Click on Dining in Shop by Room type*/
            if($(this).find('a').text() == 'Dining'){
                PF.HEADER.bespokeEventTracker('Shop by Room Type', 'Dining');
            }else{
            	/*Shop By other Room Type*/
                PF.HEADER.bespokeEventTracker('Shop By Room Type', $(this).find('a').text());
            }           
        });
		/*Click on the Shop By Style*/
        $('.shop_by_style li').bind('click', function(){
            PF.HEADER.bespokeEventTracker('Shop By Style', $(this).find('a').text()); 
        });

        if(typeof $('.open-close-btn') !== 'undefined'){ 
	        $('.open-close-btn').on('click', function (e) { 
	           dataLayer.push({'category': 'Sidebar', 'action': 'Close Sidebar', 'event': 'Event Sidebar'});
			});
	    }	   
		
		$('.homepageeeblock .open-widget-wrap div.register-shop, .homepageregblock .open-widget-wrap div.register-shop').bind('click', function(){
			dataLayer.push({'category': 'Sidebar', 'action': 'click', 'label': 'Register', 'event': 'Event Sidebar'});
		});

		$('.homepageeeblock .open-widget-wrap div.easy-return, .homepageregblock .open-widget-wrap div.easy-return').bind('click', function(){
			dataLayer.push({'category': 'Sidebar', 'action': 'click', 'label': 'Easy Returns', 'event': 'Event Sidebar'});
		});
		//For loggedin users
		$('.homepageeeblock .open-widget-wrap div.free-shipping').bind('click', function(){
			dataLayer.push({'category': 'Sidebar', 'action': 'click', 'label': 'Xpresship', 'event': 'Event Sidebar'});
		});
		//For non users
		$('.homepageregblock .open-widget-wrap div.free-shipping').bind('click', function(){
			dataLayer.push({'category': 'Sidebar', 'action': 'click', 'label': 'Free Shipping', 'event': 'Event Sidebar'});
		});		

		if(typeof $('.closed-widget-wrap .close-open-btn') !== 'undefined'){ 
	        $('.closed-widget-wrap .close-open-btn').on('click', function (e) { 
	           dataLayer.push({'category': 'Sidebar', 'action': 'Open Sidebar','event': 'Event Sidebar'});
			});
		}
		if( PF.UTILITIES.readCookie('wishlist_flag') == null || PF.UTILITIES.readCookie('wishlist_flag') == 'false') {
			PF.HEADER.getwishlistcount();
		}
	});
}
