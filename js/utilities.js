/**
 * utility functions that can be used site-wide
 */
"use strict";

var PF = PF || {};

if( PF.ERROR === undefined ) {
	/**
	 * @TODO - Modify all error handling to the below format ( data passed to raiseError)
	 *
	 *	try {
	 *		throw new Error( 'unknown exception' );
	 *	} catch(e) {
	 *		var error = {
	 *			"name" : e.name,
	 *			"line" : (e.lineNumber || e.line),
	 *			"script" : (e.fileName || e.sourceURL || e.script),
	 *			"stack" : (e.stackTrace || e.stack),
	 *			"message": e.message
	 *		};
	 *
	 *		PF.ERROR.raiseError( error.message, error.script, error.line, error.stack, error.name );
	 *	}
	 */
	(function (a) {
		var b = {
			msg : '',
			reportError : true, // TODO - use platform check here
			raiseError : function( msg, url, line, col, error ) {
				var extra = !col ? '' : '\ncolumn: ' + col;
				extra += !error ? '' : '\nerror: ' + error;

				b.msg = "Error: " + msg + "\nurl: " + url + "\nline: " + line + extra;

				if( b.reportError ) {
					console.log( b.msg );
				}

				// log this error
				b.logError();

				var suppressErrorAlert = true;

				// return true to suppress error alerts in some browsers
				return suppressErrorAlert;
			},
			logError : function() {
				return;
				if( ( a.UTILITIES !== undefined ) || ( a.UTILITIES.makeRequest !== undefined ) ) {
					var url = 'PATH_TO_SERVER';
					var data = {
						msg : b.msg
					};

					a.UTILITIES.makeRequest( url, 'POST', data, b.dataSink, b.dataSink );
				}
			},
			dataSink : function() {
				b.msg = '';
			}
		};

		a.ERROR = b;
	})( PF );
}

/**
 * Catch all errors
 */
//window.onerror = PF.ERROR.raiseError;

if( typeof PF.UTILITIES === 'undefined' ) {
	(function( z, $ ) {
		var o = {
			d : document,
			w : window,
			l : location,
			cache : [],
			defaultAjaxSettings : {},
			cookieValidityInDays : 24 * 60 * 60 * 1000,
			init : function() {
				window.root_url = ( typeof root_url === 'undefined' ) ? 'http://' + window.location.hostname : root_url;
				window.secure_url = ( typeof secure_url === 'undefined' ) ? 'https://' + window.location.hostname : secure_url;

				// create a deep copy of default ajax settings
				this.defaultAjaxSettings = $.extend( true, {}, $.ajaxSettings );

				o.getCSRFToken();
				o.lazyloadInit();

				// if max_cart_qty is not available, define it
				if( typeof max_cart_qty == 'undefined' || ! o.isNumber( max_cart_qty ) ) {
					o.w.max_cart_qty = 10;
				}
			},
			getCSRFToken : function() {
				var _url = secure_url + '/site_page/getCsrfToken';
                                var _beforeSend = function () {
                                    
                                };
                                var additionalParams = {
                                    
                                };
                                var _setUpOptions = {
                                    'dataType' : "json"
                                };
				var _error = function() {
					
				};
                                this.makeRequest( _url, 'POST', {}, o.handleCSRFResponse, _error, _beforeSend, additionalParams, _setUpOptions );
			},
			handleCSRFResponse : function( data ) {
				if( data != '' ) {
					var x = document.forms;

					if( !isNaN( x.length ) && x.length > 0 ) {
						for( var i = 0; i < x.length; i++ ) {
							if( $( x[ i ] ).attr( 'id' ) !== 'search_mini_form' ) {
								$( x[ i ] ).prepend( data );
							}
						}
					}
				}
			},
			
			listen : function( obj ) {
				if( o.isObject( obj ) ) {
					for ( var i in obj ) {
						if ( obj.hasOwnProperty( i ) ) {
							var _obj = obj[ i ];
							for ( var j in _obj ) {
								if ( _obj.hasOwnProperty( j ) ) {
									if ( $.isArray( _obj[ j ] ) ) {
										o.addListener(
											$( _obj[ j ][1] ), i, _obj[ j ][ 0 ], false, j
										);
									} else {
										o.addListener(
											$( j ), i, _obj[ j ]
										);
									}
								}
							}
						}
					}
				}
			},
			addListener : function ( el, evt, _callback, eventBubbleOrCapture, liveEvent ) {
				if( ( typeof _callback == 'string' ) && ( _callback.indexOf( '.' ) !== -1 ) ) {
						_callback = this.executeFunctionByName( _callback, this.w );
				}

				if( ! this.isFunction( _callback ) ) {
					throw "Invalid callback function - " + _callback;
				} else {
					if( eventBubbleOrCapture !== true ) {
						eventBubbleOrCapture = false;
					}

					if( el instanceof $ ) {
						// if the object is an instance of jquery
						if( ( liveEvent !== undefined ) && ( typeof liveEvent === 'string' ) ) {
							el.on( evt, liveEvent, _callback );
						} else {
							el.on( evt, _callback );
						}
					} else {
						if ( this.d.addEventListener ) {
							el.addEventListener( evt, _callback, eventBubbleOrCapture );
						} else {
							if ( this.d.attachEvent ) {
								evt = this.createEventsForIE( evt );

								el.attachEvent( evt, _callback );
							}
						}
					}
				}
							return this;
			},
			removeListener : function ( el, evt, _callback, eventBubbleOrCapture, liveEvent ) {
				if( ( typeof _callback == 'string' ) && ( _callback.indexOf( '.' ) !== -1 ) ) {
						_callback = this.executeFunctionByName( _callback, this.w );
				}

				if( ! this.isFunction( _callback ) ) {
					throw "Invalid callback function - " + _callback;
				} else {
					if( eventBubbleOrCapture !== true ) {
						eventBubbleOrCapture = false;
					}

					if( el instanceof $ ) {
						// if the object is an instance of jquery
						if( ( liveEvent !== undefined ) && ( typeof liveEvent === 'string' ) ) {
							el.off( evt, liveEvent, _callback );
						} else {
							el.off( evt, _callback );
						}
					} else {
						if ( this.d.removeEventListener ) {
							el.removeEventListener( evt, _callback, eventBubbleOrCapture );
						} else {
							if ( this.d.detachEvent ) {
								evt = this.createEventsForIE( evt );

								el.detachEvent( evt, _callback );
							}
						}
					}
				}
							return this;
			},
			executeFunctionByName : function( functionName, context ) {
				/**
				 * Used to get a reference to the callback if it is part of any namespace
				 */
				var namespaces = functionName.split( "." );
				var func = namespaces.pop();

				for( var i = 0; i < namespaces.length; i++ ) {
					context = context[ namespaces[ i ] ];
				}

				return context[ func ]; // return a reference to the callback
			},
			createEventsForIE : function( evt ) {
				evt = $.trim( evt );
				evt = evt.split( /\s+/ );

				for( var i=0;i<evt.length;i++ ) {
					evt[ i ] = 'on' + evt[ i ];
				}

				return evt.join( ' ' );
			},
			addSeparatorsNF : function( nStr, inD, outD, sep ) {
				nStr += '';
				var dpos = nStr.indexOf( inD );
				var nStrEnd = '';

				if( dpos != -1 ) {
					nStrEnd = outD + nStr.substring( dpos + 1, nStr.length );
					nStr = nStr.substring( 0, dpos );
				}

				var rgx = /(\d+)(\d{3})/;
				while ( rgx.test( nStr ) ) {
					nStr = nStr.replace( rgx, '$1' + sep + '$2' );
				}

				return nStr + nStrEnd;
			},
			makeRequest : function( _url, _method, _data, successHandler, errorHandler, beforeSendHandler, additionalParams, setUp ) {
				if( Object.keys( this.defaultAjaxSettings ).length == 0 ) {
					// if this object is not initialised, do it
					this.defaultAjaxSettings = $.extend( true, {}, $.ajaxSettings );
				}

				// use this function to make server requests
				var isJsonPadded = false; // for cross-domain requests

				if( ( _method === undefined ) || ( typeof _method === 'undefined' ) || ( _method == '' ) ) {
					_method = 'GET';
				} else {
					switch( _method.toLowerCase() ) {
						case 'get':
						case 'post':
							break;
						default:
							_method = 'GET';
							break;
					}
				}
                                
                                var _dataType = ( this.getProtocol( _url ) == this.l.protocol.toLowerCase() ) ? 'json' : 'jsonp';
                                
				if( ( typeof setUp === "undefined" ) && ! o.isObject( setUp ) ) {
					var setUp = {};
				}else{
                                    if(typeof setUp.dataType !== "undefined" && setUp.dataType === "json"){
                                        _dataType = 'json';
                                    }
                                }
                                
				if( _dataType == 'jsonp' ) {
					isJsonPadded = true;

					setUp.crossDomain = isJsonPadded;
					setUp.dataType = _dataType;
				}

				if( ( beforeSendHandler === undefined ) || ( ! this.isFunction( beforeSendHandler ) ) ) {
					beforeSendHandler = function() {
						
					};
				}

				// make a deep copy of the default settings to prevent any
				// user defined settings to affect the default setting
				var _settings = $.extend( true, {}, this.defaultAjaxSettings );

				if( Object.keys( setUp ).length > 0 ) {
					// set up custom ajax options, if available
					for( var i in setUp ) {
						if( setUp.hasOwnProperty( i ) ) {
							_settings[ i ] = setUp[ i ];
						}
					}
				}
                                
				try {
					$.ajax({
						url : _url,
						type : _method,
						data : _data,
						beforeSend : beforeSendHandler,
						cache : false,
						setings : _settings, // set custom $.ajaxSettings parameters
                                                xhrFields: {
                                                    withCredentials: true
                                                },
                                                headers: {
                                                    'X-Requested-With': 'XMLHttpRequest'
                                                },
						success: function ( data ) {
							if( ! o.isFunction( successHandler ) ) {
								throw "Invalid success handler function - " + successHandler;
							} else {
								if( additionalParams === undefined ) {
									successHandler( data );
									
									// Part of masonry functionlity
					        		// Uncomment it if you want to active masonry
									/* reload masonry*/
								    // var $container = $('#searchProductList .card-clip');
							        // if ($('#searchProductList').length) {							        							            
							        //     $container.imagesLoaded( function() {
								    //         $container.masonry('reloadItems');   
	      							// 		   $container.masonry('layout');
      								// 		});      									
							        // }
							        /*****/

								} else {
									successHandler( data, additionalParams );
								}
							}
						},
						error : function( _x, _y, _z ) {
							if( ! o.isFunction( errorHandler ) ) {
								throw "Invalid error handler function - " + errorHandler;
							} else {
								errorHandler( _x, _y, _z );
							}
						}
					});
				} catch( err ) {
					//throw err;
					
				} finally {
					// run clean up
				}
			},
			getProtocol : function( u ) {
				// return the protocol of a given url
				var link = this.d.createElement( 'a' );
				link.href = u;

				return link.protocol.toLowerCase();
			},
			isFunction : function( fn ) {
				// check if a given object is a function
				var getType = {};
				return fn && getType.toString.call( fn ) === '[object Function]';

				//return ( test === undefined ) ? false : true;
			},
			isArray : function( fn ) {
				// check if a given object is a array
				var getType = {};
				var test = fn && getType.toString.call( fn ) === '[object Array]';

				return ( test === undefined ) ? false : true;
			},
			isObject : function( fn ) {
				if (Object.prototype.toString.call(fn) === '[object Array]') {
					return false;
				}

				return fn !== null && typeof fn === 'object';
			},
			isNumber : function( num ) {
				return ! isNaN( parseFloat( num ) ) && isFinite( num );
			},
			isFloat : function( num ) {
				return !!( num % 1 );
			},
			createCookie : function( name, value, expiry ) {
				var expires = "";

				if( expiry == '-1' ) {
					// expires = 0;
					expires = '; expires=Thu, 01 Jan 1970 00:00:00 UTC';
				} else if( expiry ) {
					var date = new Date();
					date.setTime( date.getTime() + ( expiry * this.cookieValidityInDays ) );
					expires = "; expires=" + date.toGMTString();
				}

				this.d.cookie = name + "=" + value + expires + "; path=/;secure";
			},
			readCookie : function( n ) {
				var nameEQ = n + "=";
				var ca = this.d.cookie.split( ';' );

				for( var i = 0; i < ca.length; i++ ) {
					var c = ca[ i ];

					while( c.charAt( 0 ) == ' ' ) {
						c = c.substring( 1, c.length );
					}

					if( c.indexOf( nameEQ ) == 0 ) {
						return c.substring( nameEQ.length, c.length );
					}
				}

				return null;
			},
			eraseCookie : function( n ) {
				this.createCookie( n, "", -1 );
			},
			setLocation : function( url ) {
				if( this.l.protocol == "https:" ) {
					url = url.replace( "http://", "https://" );
				}

				this.l.href = url;
			},
			replaceQueryString : function( uri, key, value ) {
				var re = new RegExp( "([?|&])" + key + "=.*?(&|$)", "i" );
				var separator = uri.indexOf('?') !== -1 ? "&" : "?";

				if ( uri.match( re ) ) {
					return uri.replace( re, '$1' + key + "=" + value + '$2' );
				} else {
					return uri + separator + key + "=" + value;
				}
			},
			getMinutesBetweenDates : function( a, b ) {
				var diff = b.getTime() - a.getTime();
				return diff / 60000;
			},
			pushToDataLayer : function( x ) {
				dataLayer.push( x );
			},
			checkForm : function() {
				// site search
				var search = $( '#search' ).val();

				if( search != '' && search.length >= 3 ) {
					//$( '#search_os' ).val( search );
					if( $.trim( $( '#cat' ).val() ).length == 0 ) {
						$( '#cat' ).prop( 'name', '' );
					}

					var _data = {
						'category' : 'Search Box',
						'action': 'Click',
						'label' : 'Submit',
						'event' : 'legacyevent'
					};

					this.pushToDataLayer( _data );
					this.createCookie( 'search_ubx', search, 1 );
					return true;
				}

				$( '#search' ).focus();
				return false;
			},
			numberWithCommas : function( number ) {
				return number.toString().replace(/\B(\d{3}$)/, ',$1').replace(/\B(?=(\d{2})+(?!\d).)/g, ",");
			},
			getParameterByName : function ( name, url ) {
				name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
				var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                                    results;
                                if (typeof url !== 'undefined') {
                                    results = regex.exec(url);
                                } else {
                                    results = regex.exec(location.search);
                                }
				results = (results === null) ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
				var number = parseInt(results);
				if(!isNaN(number))
					return number;
				return results;
			},
			addToCart : function( product_id, qty, redirect_callback, configure, prod_crum, buy_now , iscustomized,rental_selected_option,fromid_n_boughtid) {
                var fullCart = 0;  // define flag to decide whether full cart needs to fetch or only added item
                if( PF.HEADER.getCacheCart() == '' ) {
                    fullCart = 1;
                }
				if( typeof( qty ) === 'undefined' ) {
					qty = 1;
				}

				if( typeof( redirect_callback ) === 'undefined' ) {
					redirect_callback = '';
				}

				if( typeof( configure ) === 'undefined' ) {
					configure = 0;
				}

				//added parameter for wardrobe
				if(typeof(iscustomized) ==='undefined'){
					iscustomized = 0
				}
                                
                                if(typeof(rental_selected_option) === 'undefined'){
                                    rental_selected_option = {};
                                }

                                //if product added to cart from outofstock recommendations (added by Nishigandha N)
                                if(typeof(fromid_n_boughtid) === 'undefined'){
                                    fromid_n_boughtid = {};
                                }

				var params = {};
				params[ 'crumb' ] = prod_crum;
				params['iscustomized']=iscustomized;
                params['fullcart'] = fullCart;
                params['rental_selected'] = JSON.stringify(rental_selected_option);
                params['fromid_n_boughtid'] = JSON.stringify(fromid_n_boughtid);
				var ex = 'cp=ac';
                                
                if (typeof(PF.LOOK) !== 'undefined' && typeof(PF.LOOK.lookID) !=='undefined'){
					params['look'] = PF.LOOK.lookID;
				}

				if( ( typeof( buy_now ) !== 'undefined' ) && ( buy_now == 1 ) ) {
					params[ 'buy_now' ] = 1;
					ex = 'cp=bn';
				}

                var userQuery = location.search.split('&');
                if( userQuery.length ) {
                    for( var _v=0;_v<userQuery.length;_v++ ) {
                        if( userQuery[ _v ].indexOf( 'searchterm' ) == 0 ) {
                            if( ex != '' ) {
                                ex += '&';
                            }

                            ex += 'searchterm' + userQuery[ _v ].replace( 'searchterm', '' );
                            
                        }
                        if( userQuery[ _v ].indexOf( '?q=' ) == 0 ) {
                            if( ex != '' ) {
                                ex += '&';
                            }
                            ex += 'searchterm' + userQuery[ _v ].replace( '?q', '' );
                            var tempProdIdPos=$('#productClickSearch_'+product_id).attr('prodpos');
                            ex += '&';
                            ex += 'pos='+tempProdIdPos;
                        }
                        if( userQuery[ _v ].indexOf( 'pos' ) == 0 ) {
                            if( ex != '' ) {
                                ex += '&';
                            }
                            ex += 'pos' + userQuery[ _v ].replace( 'pos', '' );
                            
                        }
                        /*Lines added by Shreenivas M for autosuggestion url parameter : starts*/
                        if( userQuery[ _v ].indexOf( 'as' ) == 0 ) {
                            if( ex != '' ) {
                                ex += '&';
                            }
                            ex += 'as' + userQuery[ _v ].replace( 'as', '' );                                            
                        }
                        /*Lines added by Shreenivas M for autosuggestion url parameter: ends*/
                    }
                }
                if($('.MiniCartScrollbar').length>0){
					global_function.mCustomScrollDestroy('MiniCartScrollbar');
				}                
				var _url = secure_url + '/cart/add' + '?' + ex;
				var _data = {
					product_id : product_id,
					qty : qty,
					params : params
				};
                                
                var _setUpOptions = {
                    'dataType' : "json"
                };
                                
				var _additionalParams = {
					'_callback' : redirect_callback,
					'pid' : product_id,
					'qty' : qty
				};

				o.makeRequest( _url, 'POST', _data, o.handleAddToCartResponse, o.handleAddToCartError, '', _additionalParams, _setUpOptions );
			},
			handleAddToCartResponse : function( data, _params ) {
				if( $.isNumeric( data ) ) {
					$( '.mini_cart .gb-loader' ).hide();

					if( data == '0' ) {
						alert( 'Sold Out!' );
					} else {
						data = parseInt( data );

						if( data > 1 ) {
							data += ' quantities';
						} else {
							data += ' quantity';
						}
						if(data > 0) {
							alert( 'You can add max ' + data + ' for this product.' );
						}else{
							alert('Sorry, this product has been sold out');
						}
					}
				} else {
					if( ! _params._callback ) {
						try {
							var isJson = JSON.parse( data );
                                                        
							// display the mini-cart
                                                        _params['pin'] = o.readCookie( 'serviceable_pincode' );
                                                        o.createCookie('minicartTriggerDatalayer',true);
                                                        if( PF.HEADER.getCacheCart() ) {
                                                            PF.HEADER.addMiniCartItem( data, _params );
                                                        } else {
                                                            PF.HEADER.handleMiniCartResponse( data, _params );
                                                        }
							/**
							 * To check the serviceability of items in mini-cart, need to call getCartInfo
							 * as data.data.pincode_response is sometimes 0
							 */
							/*if( o.isNumber( _params.pin ) ) {
								PF.HEADER.getCartInfo( _params.pin );
							}*/

							$( "#popup_overlay" ).fadeIn( 200 );
							$( ".mini_cart" ).addClass( 'active' );
							$( ".mini-usercart" ).trigger( 'click' );
							$( '.header_tab.cart .count_alert' ).html( isJson.total_items );
						} catch( e ) {
							alert( 'Some issue with response' + e );
						}
						$( '.mini_cart .gb-loader' ).hide();
					}

					var cartItemData = {};
					if( page_type == 'vip' ) {
						cartItemData = itemData;
					} else if( ( $.inArray( page_type, [ 'listing', 'search', 'selection' ] ) > -1 ) && itemData.length > 0 ) {
						for( var i in itemData ) {
							if( itemData.hasOwnProperty( i ) ) {
								var items = itemData[ i ];
								if( items.id == _params.pid ) {
									cartItemData = items;
									break;
								}
							}
						}
					}

					var src = '//api.targetingmantra.com/RecordEvent?mid=141104' + cid + '&prc=' + cartItemData.price + '&pid=' + _params.pid + '&eid=4';
					$( '#page' ).append( '<img src="' + src + '" width="1" height="1"/>' );

					cartItemData.quantity = _params.qty;
					o.pushToDataLayer({
						'event': 'addToCart',
						'ecommerce': {
							'currencyCode': 'INR',
							'add': {
								'products': [cartItemData]
							}
						}
					});

					o.pushToDataLayer({
						'category' : 'CLIP',
						'action': 'Click',
						'label' : 'Add to Cart',
						'opt' : true,
						'event' : 'legacyevent'
					});

					$("#message_added").show().delay(3000).fadeOut( 'slow' );

					// Below Condition for Buy Now Button redirection (from VIP to CART) (Added by Amol)
					/*if( _params._callback != '' ) {
						window[ _params._callback ]();
						return false;
					}*/
					if( o.isFunction( _params._callback ) ) {
						_params._callback();
						return false;
					}

					//get this out from above if else to highlight newly added product in mini cart
					$( '#cart_' + _params.pid ).css( "border-color", "#58a809" );
					setTimeout(function() {
						$( '#cart_' + _params.pid ).css( "border-color", "#b1b1b1" );
					}, 3000);

					return false;
				}
			},
			handleAddToCartError : function() {
				$( '.mini_cart .gb-loader' ).hide();
				alert( 'Please try later.' );
			},
			addToWishlist : function( product_id, success_location ,iscustomized, islookbook , cartEle, product_name ) {
                if ((success_location == 'OrderSummary') || (success_location === 'clip' && $("div[data-pid="+product_id+"]").find('a.clip-heart-icn,a.wishlst-icn').hasClass('active-wishlist'))) {
                        o.removeFromWishlist(product_id, function(d,e) {
                            $("div[data-pid="+e.product_id+"]").find('a.clip-heart-icn,a.wishlst-icn').removeClass('active-wishlist').attr('data-tooltip', 'Add to Wishlist');
                            $(".pf-tooltip").html('Add to Wishlist<div class="pf-tooltip-arrow"></div>');
                            try {
                                PF.HEADER.wishlistResponseCache = '';
                            } catch( _error ) {
                                    //
                            }
                            
                            o.pushToDataLayer({
                                'category' : 'Wishlist',
                                'action': 'Remove|listing',
                                'label' : e.product_name,
                                'opt' : true,
                                'event' : 'legacyevent'
                            });
                            
                            setTimeout(function(){
                                $("div[data-pid="+e.product_id+"]").find('a.clip-heart-icn,a.wishlst-icn').removeClass('disable-pointer');
                            }, 3000);
                            //for updating wishlistcount in 
                            PF.HEADER.getwishlistcount();
                        }, 'clip',void 0, void 0, product_name);
                } else {
                	if(typeof(iscustomized) ==='undefined'){
                		iscustomized = 0;
                	}
                	if(typeof(islookbook) ==='undefined'){
                		islookbook = 0;
                	}
					//added parameter for wardrobe and lookbook
					if(!islookbook && !iscustomized){
						var _url = secure_url +"/customer_wishlist/add";
						iscustomized = 0;
					} else if(typeof(iscustomized) !=='undefined' && typeof(islookbook) ==='undefined') {
						var _url = secure_url +"/site_wardrobe/addToWishlist";
					}else{
                        var _url = secure_url +"/look/addToWishlist";
                    }

					var _data = {
						'product_id' : product_id
					};

					if( success_location === undefined ) {
						success_location = '';
					}
                                        
                    var _setUpOptions = {
                        'dataType' : "json"
                    };
                    if(typeof cartEle =='undefined'){
                    	cartEle = ''
                    }          
					var _additionalParams = {
						'location'   : success_location,
                        'product_id' : product_id,
                        'cartEle' : cartEle,
                        'product_name' : product_name
					};
                    $("div[data-pid="+product_id+"]").find('a.clip-heart-icn,a.wishlst-icn').addClass('disable-pointer');
					o.makeRequest( _url, 'POST', _data, o.handleAddToWishListResponse, o.handleAddToWishlistError, '', _additionalParams, _setUpOptions );
				}
                               
                                
			},
			handleAddToWishListResponse : function( data, _params ) {

               	if( typeof _params.location != "undefined" && _params.location == "clip" && ( data == 'false' || data == false || data == "true" || data == true || data == 3 ) ) {
					//$("div.card.grid-view[data-pid="+_params.product_id+"]").find('a.pf-wishlist-ic').addClass('active-wishlist').attr('data-tooltip', 'Remove from Wishlist');
                    //for wishlist css change in clip page
                	$("div[data-pid="+_params.product_id+"]").find('a.clip-heart-icn,a.wishlst-icn').addClass('active-wishlist').attr('data-tooltip', 'Remove from Wishlist');
                    $(".pf-tooltip").html('Remove from Wishlist<div class="pf-tooltip-arrow"></div>');
                    o.pushToDataLayer({
						'category' : 'Wishlist',
						'action': 'Add|listing',
						'label' : _params.product_name,
						'opt' : true,
						'event' : 'legacyevent'
					});
				} else if( typeof _params.location != "undefined" && _params.location == "checkout" && ( data == "true" || data == true || data == 3 ) ) {
					//$("#cartitem_"+product_id+" .confirm_delete").click();
				} else if( (data == "true" || data == true ) && _params.location=='vip') {
					$( '.add-to-wishlist' ).addClass( 'selected' );	
                                        o.pushToDataLayer({
                                            'category' : 'Wishlist',
                                            'action': 'Add|VIP',
                                            'label' : _params.product_name,
                                            'opt' : true,
                                            'event' : 'legacyevent'
					});
				} else if( data == 3 && _params.location=='vip') {
					// already added to wishlist
					$( '.add-to-wishlist' ).addClass( 'selected' );
				} else if(typeof PF.CHECKOUT != 'undefined' && PF.CHECKOUT.pageType == 'OrderSummary') {
					//console.log(_params.cartEle);
					//Remove product from cart after adding to wishlist
					PF.CHECKOUT.deleteProductFromCart(_params.cartEle);

				} else {
					// added to wishlist
					$( '.add-to-wishlist' ).addClass( 'selected' );
                                        o.pushToDataLayer({
                                            'category' : 'Wishlist',
                                            'action': 'Add|VIP',
                                            'label' : _params.product_name,
                                            'opt' : true,
                                            'event' : 'legacyevent'
					});
				}
                setTimeout(function(){
                    $("div[data-pid="+_params.product_id+"]").find('a.clip-heart-icn,a.wishlst-icn').removeClass('disable-pointer');
                }, 3000);
                //for updating wishlistcount in 
                PF.HEADER.getwishlistcount();
				try {
					PF.HEADER.wishlistResponseCache = '';
				} catch( _error ) {
					//
				}
			},
			handleAddToWishlistError : function( x, y, z ) {
				alert('An error has occurred:\n' + x + '\n' + y + '\n' + z );
			},
			removeFromWishlist : function( id, _callback, _source, iscustomized, islookbook, product_name ) {
                                
                try {
                    PF.HEADER.wishlistResponseCache = '';
                } catch( _error ) {
                    //
                }
	            //for disable button
	            $("div[data-pid="+id+"]").find('a.clip-heart-icn,a.wishlst-icn').addClass('disable-pointer');         
				//added parameter for wardrobe
				if( typeof( iscustomized ) === 'undefined' && typeof( islookbook ) === 'undefined' ) {
					//var _url = ( o.getProtocol() === 'http:' ? root_url : secure_url ) + "/customer_wishlist/deleteWishlistItem/";
                    var _url = secure_url+ "/customer_wishlist/deleteWishlistItem/";
				}else if( typeof( iscustomized ) !== 'undefined' && typeof( islookbook ) === 'undefined' ) {
					var _url = secure_url + "/site_wardrobe/deleteCustomizedWarWishlistItem/";
				}else{
                    var _url = secure_url + "/look/deleteLookFromWishlist/";
                }

				var postObject = {
					itemToDelete: id
				};
                                
                var _setUpOptions = {
                    'dataType' : "json"
                };
                                
				if( ( typeof _source !== 'undefined' ) && (( _source == 'minicart' ) || (_source == 'vip') || (_source == 'clip') || (_source == 'OrderSummary')) ) {
					_url += id;
					postObject = {};
				}
                                
                var _additionalParams = {
                    'location'   : _source,
                    'product_id' : id,
                    'product_name' : product_name
                };

				o.makeRequest(
					_url,
					'POST',
					postObject,
					_callback,
					PF.ERROR.raiseError,
                    '',
                    _additionalParams,
                    _setUpOptions
				);
			},
			lazyloadInit : function() {
				try {
					$('img.lazy').lazy({
						bind: 'event',
						threshold: 1000,
						beforeLoad: function(e) { e.removeClass('lazy'); },
						onError: function(e) {
							PF.ERROR.raiseError('Image error - ' + $(e).attr('src'), o.l.href, '');
						},
					    afterLoad: function() {
					    	// Part of masonry functionlity
					        // Uncomment it if you want to active masonry
					        
					        // global_function.search_scripts();
					    }
					});
				} catch( _error ) {
					PF.ERROR.raiseError( 'Could not find lazy load library', o.l.href, 1, '', '' );
				}
			},
                        currencyFormat: function (x) {

                            x = x.toString();
                            x = x.replace( /,/g, '' );
                            var lastThree = x.substring(x.length - 3);
                            var otherNumbers = x.substring(0, x.length - 3);
                            if (otherNumbers != '')
                                lastThree = ',' + lastThree;
                            var output = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

                            return output;

                        },
                        //sets cookie to redirect back to address page in checkout
                        check_step_redirect: function(){
                            o.createCookie( 'check_step_redirect', 1, 30 );
                            window.location = root_url+"/checkout/onepage";
                        }
		};

		z.UTILITIES = o;
	})( PF, $ );

	$( document ).ready(function() {
		PF.UTILITIES.init();
	});
}