/*

UNUSED FILE - NEED TO DELETE

*/
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
var checkout_scripts = {
    initialize: function () {
		function paymentNavActive() {
			var activeMenuTop = $('#ckPaymentMethodNav li.active-menu').position().top;
			$('#checkoutNavActive').css('top',activeMenuTop + 'px');
		}

		/* cashPay doorstep click event */
  		$(document).on('click tap','#ckCashPayDoorstep',function(){
			$('.cashpay-deposit-container, .cashpay-default-container').hide();
			$('.cashpay-doorstep-container').show();
		});

		/* cashPay Deposit Bank click event */
		$(document).on('click tap','#ckCashPayDeposit',function(){
			$('.cashpay-doorstep-container, .cashpay-default-container').hide();
			$('.cashpay-deposit-container').show();
		});

		/* payment method left navigation tab on click right section container open */
		$('#ckPaymentMethodNav').on('click tap', 'li:not(.active-menu)', function(){
			var id = $(this).attr('id');
			$(this).addClass('active-menu').siblings().removeClass('active-menu');
			$('#ckPaymentMethodContainer').find('.ck-nav-container').hide();
			$('#'+id+"Container").show();
			paymentNavActive();
		});

		$('#ckPaymentMethodNav').on('click tap', 'li:not(#checkoutPartPay)', function(){
			$('.checkout-partpay-amount').hide();
		});

		$('#ckPaymentMethodNav').on('click tap', 'li#checkoutPartPay', function(){
			$('.checkout-partpay-amount, #partPayBreakupDetail, #partPayBreakupDetail .partpay-collapse-breakup').show();
			$('#partPayDropDown, #partPayOptionArea, #partPayAmtView, #partPayBreakupDetail .partpay-expand-breakup').hide();
			$('#partPayAgreement').prop('checked',false);
			$('#checkoutPaySecureBtn').addClass('disabled');
		});

		/* emi drop-down change event */
		$(document).on('change','#emiBankList',function(){
			$('.emi-bank-container').show();
		});

		// need to optimize this, run on all matches and just the selected one
		$('.emi-bank-container').on('click tap', '.emi-tr:not(:hidden)', function(e){
			if( e.target.nodeName.toLowerCase() != 'input' ) {
				//$(this).find('input[type=radio]').prop('checked',true);
				var _id = $( this ).attr( 'id' );
				$( '#emi' + _id ).trigger( 'click' );

				return;
			}
		});

		/* part pay code start */
		$('.partpay-collapse-breakup').on('click tap','.show-breakup', function() {
			$(this).closest('.partpay-collapse-breakup').slideUp();
			$('#partPayBreakupDetail').find('.partpay-expand-breakup').slideDown();
		});

		$('.partpay-expand-breakup').on('click tap','.hide-breakup', function() {
			$(this).closest('.partpay-expand-breakup').slideUp();
			$('#partPayBreakupDetail').find('.partpay-collapse-breakup').slideDown();
		});

		$('#partPayAgreement').on('click tap', function() {
			$('#ckPaymentMethodNav').find('li').not('#checkoutPartPay').hide();
			$('#checkoutPaySecureBtn').removeClass('disabled');
			$('#partPayBreakupDetail').slideUp();
			$('#partPayAmtView, #partPayDropDown, .ck-backpay-action').show();
			paymentNavActive();
		});

		$('#ckPaymentMethodNav').on('click tap', '.ck-backpay-action',function(){
			$(this).hide();
			$('#ckPaymentMethodNav').find('li').show();
			paymentNavActive();
		});

		$('#partPayAmtView').on('click tap', '.ck-partpay-detail', function() {
			if (!$(this).attr('data-detail') || $(this).attr('data-detail') == 'off') {
				$(this).attr('data-detail','on');
				$('#partPayBreakupDetail').slideDown();
			} else if ($(this).attr('data-detail') == 'on'){
				$(this).attr('data-detail','off');
				$('#partPayBreakupDetail').slideUp();
			}
			$('#partPayBreakupDetail .partpay-collapse-breakup').hide();
			$('#partPayBreakupDetail .partpay-expand-breakup').show();
		});

		$('#partPayDropDown').on('change','#partPayDropDownOption',function() {
			var selectedOpt = $(this).val();

			$( '#partPayOptionArea > div' ).hide();

			switch(selectedOpt) {
				case "DEBIT_CARD":
					$('#partPayOptionArea').show();
					$('#partpay_checkoutDebitContainer').show();
					break;
				case "CREDIT_CARD":
					$('#partPayOptionArea').show();
					$('#partpay_checkoutCreditContainer').show();
					break;
				case "NET_BANKING":
					$('#partPayOptionArea').show();
					$('#partpay_checkoutInternetContainer').show();
					break;
				case "PAYPAL":
					$('#partPayOptionArea').show();
					$('#partpay_checkoutPaypalContainer').show();
					break;
				case "PAYUMONEY":
					$('#partPayOptionArea').show();
					$('#partpay_checkoutPayUMoneyContainer').show();
					break;
				default:
					break;
			}
		});
		/* part pay code end */

		/* shipping address code start  */
		/* shipping address change or edit button click event */
		$('#ckShippingAddress').on('click tap','.checkout-address-action a',function() {
			$('#billingAddressOpenCont').hide();
			$('#ckShippingAddress').addClass('active');
			$('#ckBillingAddress').removeClass('active');
			$('#shippingAddressOpenCont').slideDown();
		});

		/* shipping address close box click event */
		$('#ckShippingAddress').on('click tap','.checkout-add-box-close a',function() {
			PF.CHECKOUT.resetForm();
			$('#ckShippingAddress').removeClass('active');
			$('#shippingAddressOpenCont').slideUp();
			$('#shippingAddressFormCont').find('.add-address_form').hide();
			$('#shippingAddressFormCont .add-address-action').show();
		});

		/* shipping address row click event */
		$('#shippingAddressOpenCont').on('click tap','.ship-address-row:not(.active)',function() {
			//$(this).find('input[type=radio]').prop('checked',true);
			$(this).addClass('active').siblings().removeClass('active');
			$(this).find('input[type="radio"]').click();
		});

		/* shipping address row edit and add button click event */
		$('#shippingAddressOpenCont .ship-address-action a, #shippingAddressFormCont .add-address-action a').on('click tap',  function(e){
			if( $(e).attr( 'class' ) != 'edit_address' ) {
				//e.stopPropagation();
				$('#shippingAddressFormCont .add-address-action').fadeOut(500, function(){
					$('#shippingAddressFormCont').find('.add-address_form').fadeIn();
				});
			}
		});

		/* shipping address row edit click event */
		$('#shippingAddressOpenCont .ship-address-action a').on('click tap',  function(){
			$(this).closest('.ship-address-row').addClass('active').siblings().removeClass('active');
			$(this).closest('.ship-address-row').find('input[type=radio]').prop('checked',true);
			$('#shippingAddressFormCont').find('.add-address_form').removeClass('white_bg');
			$('#shippingAddressFormCont').find('.add-address_form').find( '.edt-blk-title' ).html( 'Edit your address' );
		});

		/* shipping address add button click event */
		$('#shippingAddressFormCont .add-address-action').on('click tap',  function(){
			$('#shippingAddressOpenCont').find('.ship-address-row').removeClass('active');
			$('#shippingAddressFormCont').find('.add-address_form').addClass('white_bg');
			$('#shippingAddressOpenCont').find('input[type=radio]').prop('checked',false);
			$('#shippingAddressFormCont').find('.add-address_form').find( '.edt-blk-title' ).html( 'Enter a new Address' );
		});

		/* shipping cancel link click event */
		$('#shippingAddressFormCancel').on('click tap', function() {
			PF.CHECKOUT.resetForm();
			$('#shippingAddressFormCont').find('.add-address_form').fadeOut(500, function() {
				//$('#shippingAddressOpenCont').find('.ship-address-row').removeClass('active');
				$('#shippingAddressFormCont .add-address-action').fadeIn();
			});
		});
		/* shipping address code end */

		/* billing address code start */
		/* billing address change or edit button click event */
		$('#ckBillingAddress').on('click tap','.checkout-address-action a',function() {
			$('#shippingAddressOpenCont').hide();
			$('#ckBillingAddress').addClass('active');
			$('#ckShippingAddress').removeClass('active');
			$('#billingAddressOpenCont').slideDown();
		});

		/* billing address close box click event */
		$('#ckBillingAddress').on('click tap','.checkout-add-box-close a',function() {
			PF.CHECKOUT.resetForm();
			$('#ckBillingAddress').removeClass('active');
			$('#billingAddressOpenCont').slideUp();
			$('#billingAddressFormCont').find('.add-address_form').hide();
			$('#billingAddressFormCont .add-address-action').show();
		});

		/* billing address row click event */
		$('#billingAddressOpenCont').on('click tap','.ship-address-row:not(.active)',function() {
			//$(this).find('input[type=radio]').prop('checked',true);
			$(this).addClass('active').siblings().removeClass('active');
			$(this).find('input[type="radio"]').click();
		});

		/* billing address row edit and add button click event */
		$('#billingAddressOpenCont .ship-address-action a, #billingAddressFormCont .add-address-action a').on('click tap',  function(e){
			//e.stopPropagation();
			$('#billingAddressFormCont .add-address-action').fadeOut(500, function(){
				$('#billingAddressFormCont').find('.add-address_form').fadeIn();
			});
		});

		/* billing address row edit click event */
		$('#billingAddressOpenCont .ship-address-action a').on('click tap',  function(){
			$(this).closest('.ship-address-row').addClass('active').siblings().removeClass('active');
			$(this).closest('.ship-address-row').find('input[type=radio]').prop('checked',true);
			$('#billingAddressFormCont').find('.add-address_form').removeClass('white_bg');
			$('#billingAddressFormCont').find('.add-address_form').find( '.edt-blk-title' ).html( 'Edit your Address' );
		});

		/* billing address add button click event */
		$('#billingAddressFormCont .add-address-action').on('click tap',  function(){
			$('#billingAddressOpenCont').find('.ship-address-row').removeClass('active');
			$('#billingAddressFormCont').find('.add-address_form').addClass('white_bg');
			$('#billingAddressOpenCont').find('input[type=radio]').prop('checked',false);
			$('#billingAddressFormCont').find('.add-address_form').find( '.edt-blk-title' ).html( 'Enter a new Address' );
		});

		/* billing cancel link click event */
		$('#billingAddressFormCancel').on('click tap', function() {
			PF.CHECKOUT.resetForm();
			$('#billingAddressFormCont').find('.add-address_form').fadeOut(500, function() {
				//$('#billingAddressOpenCont').find('.ship-address-row').removeClass('active');
				$('#billingAddressFormCont .add-address-action').fadeIn();
			});
		});
		/* billing address code end */
    }
};
//////////////////////// common script /////////////////////

// checkout specific scripts
if( typeof PF.CHECKOUT === 'undefined' ) {
	(function( z, $ ) {
		var utils = z.UTILITIES;

		var o = {
			timeToLive : 30000, // time in milliseconds for which the delete action can be undone in mini-cart
			timedObjects : {}, // container to reference the timed objects, so that we can take an action on them after expiry
			cachedObjects : {},
			pageType : '',
			non_serviceable_items : [],
                        listen : {
                            change : {
                                '#fe_points' : ['PF.CHECKOUT.feCheckBoxChange','#page']
                            }
                        },
			init : function() {
				checkout_scripts.initialize();
                                
                                utils.listen(o.listen);
                                
				// set page type
				if( $( 'input#pincode' ).length ) {
					o.pageType = 'OrderSummary';
				} else if( $( '#ckShippingAddress' ).length ) {
					o.pageType = 'AddressSelection';
				} else if( $( '.checkout-fst-time-user' ).length ) {
					o.pageType = 'FirstTime';
				}

				if( $( '#ckShippingAddress' ).length ) {
					o.checkAssemblyPincode();
				}

				// Verifying pinode on key up
				if( $( 'select.country_common' ).val() == 'IN' ) {
					window.last_verified_pin = $( '#postcode' ).val();	//for all addresses except billing
					window.last_bill_pin = $( '#bill_postcode' ).val();	//for billing address

					$( '#postcode' ).attr( 'maxlength', 6 );
					$( '#bill_postcode' ).attr( 'maxlength', 6 );	//for billing address

					o.postCodeCheck();
				}

				this.setEventHandlers();

				/**
				 * Update product qty in cart on enter
				 */
				$( document ).on( 'keypress', 'input.quntity-input, input#coupon_code, input#pincode', function( e ) {
					if( e.which == $.ui.keyCode.ENTER ) {
						switch( $( this ).attr( 'class' ).toLowerCase() ) {
							case 'quntity-input':
								var _id = $( this ).attr( 'id' ).split( '_' );
								var _val = parseInt( $.trim( $( this ).val() ) );
								var maxAvailableQty = $( this ).data( 'avl-qty' );

								$( '#cart_product_' + _id[ 1 ] ).hide();

								// check if the provided input is valid and less than max available quantity
								if( utils.isNumber( _val ) && ( _val <= maxAvailableQty ) && ( _val > 0 ) ) {
									o.updateCartQty();
								} else {
									// show the default value selected
									$( this ).val( $( this ).prop( 'defaultValue' ) );

									if( ! utils.isNumber( _val ) ) {
										$( '#cart_product_' + _id[ 1 ] ).html( 'Please choose a valid quantity' ).show();
									} else if( _val > maxAvailableQty ) {
										var _text = ' quantity.';
										if( maxAvailableQty > 1 ) {
											_text = ' quantities.';
										}

										$( '#cart_product_' + _id[ 1 ] ).html( 'You can not choose more than ' + maxAvailableQty + _text ).show();
									} else if( _val <= 0 ) {
										$( '#cart_product_' + _id[ 1 ] ).html( 'Please choose at least 1 quantity.' ).show();
									}
								}

								break;
							case 'inputcoupon':
								$( '#apply_coupon' ).trigger( 'click' );
								break;
							case 'order_summary_pincode':
								o.checkAssemblyPincode( $( this ).val() );
								break;
							default:
								break;
						}

						e.stopPropagation();
					}
				});

				$( '#page' ).on( 'click', '.decr-amt, .incr-amt, a.edit_address, input.address_select_input, a.order_summary_pincode_btn', function( e ) {
					switch( $( this ).attr( 'class' ).toLowerCase() ) {
						case 'decr-amt':
							var _el = $( this ).parent().find( '.quntity-input' );

							var _id = _el.attr( 'id' ).split( '_' );
							var _val = parseInt( $.trim( _el.val() ) );
							var maxAvailableQty = _el.data( 'avl-qty' );

							$( '#cart_product_' + _id[ 1 ] ).hide();

							// check if the provided input is valid and less than max available quantity
							if( utils.isNumber( _val ) ) {
								_val -= 1;

								if( ( _val <= maxAvailableQty ) && ( _val > 0 ) ) {
									_el.val( _val );
									o.updateCartQty();
								} else {
									// show the default value selected
									_el.val( _el.prop( 'defaultValue' ) );

									if( _val > maxAvailableQty ) {
										var _text = ' quantity.';
										if( maxAvailableQty > 1 ) {
											_text = ' quantities.';
										}

										$( '#cart_product_' + _id[ 1 ] ).html( 'You can not choose more than ' + maxAvailableQty + _text ).show();
									} else {
										$( '#cart_product_' + _id[ 1 ] ).html( 'Please choose at least 1 quantity.' ).show();
									}
								}
							} else {
								// show the default value selected
								_el.val( _el.prop( 'defaultValue' ) );

								$( '#cart_product_' + _id[ 1 ] ).html( 'Please choose a valid quantity' ).show();
							}
							break;
						case 'incr-amt':
							var _el = $( this ).parent().find( '.quntity-input' );

							var _id = _el.attr( 'id' ).split( '_' );
							var _val = parseInt( $.trim( _el.val() ) );
							var maxAvailableQty = _el.data( 'avl-qty' );

							$( '#cart_product_' + _id[ 1 ] ).hide();

							// check if the provided input is valid and less than max available quantity
							if( utils.isNumber( _val ) ) {
								_val += 1;

								if( ( _val <= maxAvailableQty ) && ( _val > 0 ) ) {
									_el.val( _val );
									o.updateCartQty();
								} else {
									if( _val > maxAvailableQty ) {
										var _text = ' quantity.';
										if( maxAvailableQty > 1 ) {
											_text = ' quantities.';
										}

										$( '#cart_product_' + _id[ 1 ] ).html( 'You can not choose more than ' + maxAvailableQty + _text ).show();
									} else {
										$( '#cart_product_' + _id[ 1 ] ).html( 'Please choose at least 1 quantity.' ).show();
									}
								}
							} else {
								$( '#cart_product_' + _id[ 1 ] ).html( 'Please choose a valid quantity' ).show();
							}
							break;
						case 'edit_address':
							// mark the form as editing the existing addresses
							PF.CHECKOUT.resetForm();

							var _id = $( this ).data( 'addressid' );
							$( '#update_id' ).val( _id );
							o.showAddressForEdit( _id );
							break;
						case 'address_select_input':
							var _id = $( this ).val();
							var _type = $( this ).attr( 'name' ).split( '_' ).shift();

							o.setDefaultAddress( _id, _type );
							break;
						case 'order_summary_pincode_btn':
							o.checkAssemblyPincode( $( '.order_summary_pincode' ).val() );
							break;
						default:
							break;
					}
				});

				$( '#page' ).on( 'click', 'a#assembly_product_count, a#form_assembly_product_count, a#okay_got_it, a#form_okay_got_it, a#empty_user_cart, a#scroll_to_cart, a#form_remove_non_serviceable_items, a#remove_non_serviceable_items', function(e) {
					var _id = $( this ).attr( 'id' ).toLowerCase();

					switch( _id ) {
						case 'assembly_product_count':
							if( ! $( '#assembly_error_product_msg' ).is( ':visible' ) ) {
								$( '#assembly_error_product_msg' ).slideDown();
							}
							break;
						case 'form_assembly_product_count':
							if( ! $( '#form_assembly_error_product_msg' ).is( ':visible' ) ) {
								$( '#form_assembly_error_product_msg' ).slideDown();
							}
							break;
						case 'okay_got_it':
							if( $( '#assembly_error_product_msg' ).is( ':visible' ) ) {
								$( '#assembly_error_product_msg' ).slideUp();
							}
							break;
						case 'form_okay_got_it':
							if( $( '#form_assembly_error_product_msg' ).is( ':visible' ) ) {
								$( '#form_assembly_error_product_msg' ).slideUp();
							}
							break;
						case 'empty_user_cart':
							o.emptyCart( e );
							break;
						case 'scroll_to_cart':
							$( 'html, body' ).animate({scrollTop: $( '#cart_form' ).offset().top}, 1000 );
							break;
						case 'remove_non_serviceable_items':
						case 'form_remove_non_serviceable_items':
							o.removeNonServiceableItem();
							break;
						default:
							break;
					}
				});
			},
			setEventHandlers : function() {
				// dumping ground for all events on the checkout page(-s)
				$('.order-summary-row-wrapper').on('click', '.trash, div.delete_item', function (e) {
					e.preventDefault();
					switch( $( this ).attr( 'class' ).toLowerCase() ) {
						case 'trash':
							o.deleteProductFromCart( this );
							break;
						case 'delete_item':
							o.undoDeleteProductFromCart( this );
							break;
						default:
							break;
					}
				});

				$( 'select.country_common:visible' ).change( function() {
					var country_id = $( this ).val();

					if( country_id != "IN" ) {
							$( '#postcode' ).removeAttr( "maxlength" );
							$( '#bill_postcode' ).removeAttr( "maxlength" );
					} else {
							$( '#postcode' ).attr( 'maxlength', 6 );
							$( '#bill_postcode' ).attr( 'maxlength', 6 );
							o.postCodeCheck();
					}
				});

				/**
				 * Register select2 event handlers
				 */
				$( '.gb-select' ).on({
					change : function( e ) {
						try {
							var el = $( e.target ).find( 'option:selected' );

							if( $( '#payment_method' ).val().toLowerCase() == 'cbc' ) {
								cbcObj.charge = parseFloat(ui.item.option.attr('data-cbccharge'));
								cbcObj.oid = parseFloat(ui.item.option.attr('data-oid'));
							}

							// set the payment method selected
							o.setPaymentMethod( el.val(), el.text() );
						} catch( error ) {
							// log select2 error
						}
					}
				});

				// set events on payment methods page to select the bank option
				if( $( '#ckPaymentMethodContainer input[type="radio"]' ).length > 0 ) {
					/**
					 * Fix for select2 plugin
					 */
					$('#ckPaymentMethodContainer select').each(function(){
						var id = $( this ).attr( 'id' );

						if( typeof id != 'undefined' ) {
							var el = $( '#s2id_' + id );

							if( $( this ).is( ':hidden' ) ) {
								el.hide();
							}
						}
					});

                    $( '#ckPaymentMethodContainer input[type="radio"]' ).change( function() {
						o.resetBankSelection();

						if( $( this ).is( ':checked' ) ) {
							var value = $( this ).val();

							var input_type = $( '#payment_method' ).val().toLowerCase();
							if( input_type == 'emi' ) {
								$( '#tenure' ).html( $( '#' + value + ' label' ).html().toLowerCase() );
								$( '#charge' ).html( $( '#' + value + ' .emi-td.rate' ).html() );
								$( '#no_bank' ).css( 'display','block' );
								$( '#emi_note' ).css( 'display','block' );
							} else if(input_type == 'credit_card' ) {
								if( parseInt( value ) == 0 ) {
									$( ' #credit_bank_select' ).show();
									$( ' #s2id_credit_bank_select' ).show();
								} else {
									$( '#credit_bank_select' ).hide();
									$( ' #s2id_credit_bank_select' ).hide();
								}
							} else if( input_type == 'debit_card' ) {
								$( ' #bank_select_visa' ).hide();
								$( ' #bank_select_master' ).hide();
								$( ' #bank_select_maestro' ).hide();
								// select2 plugin
								$( ' #s2id_bank_select_visa' ).hide();
								$( ' #s2id_bank_select_master' ).hide();
								$( ' #s2id_bank_select_maestro' ).hide();

								if( parseInt( value ) == 0 ) {
									$( ' #bank_select_maestro' ).show();
									$( ' #s2id_bank_select_maestro' ).show();
								}
							} else if( input_type == 'cod' ) {
								var total_pay = parseInt( $( '#total_pay_amount' ).val() ) - parseInt( $( '#online_shipping_charge' ).val() ) + parseInt( $( '#cod_shipping_charge' ).val() );

								var _pmt = utils.addSeparatorsNF(Math.ceil( total_pay ), '.', '.', ',');
								$( '#payment_form' ).find( '.final-pricing-checkout .txt-red' ).html( 'Rs. ' + _pmt );
								_pmt = '';
							} else if( input_type == 'paypal' ) {
								$( this ).parent().addClass( 'active' );
							}

							if( input_type != 'cbc' ) {
								$( '#payment_' + input_type ).val( value );
								$( '#payment_option_selected' ).val( value );
							}

							/* CBC related code starts*/
							//Below if block is for CBC. This is executed when payment method is selected by clicking radio button (i.e. when there is only one option available) and NOT selected from the dropdown (Dropdown is displayed when more than one options are avaible depending upon total price of the cart and min-max val of payment methods and method's availability)
							if( input_type == 'cbc' ) {
								var growtreeVal = 0;
								if( $( '#growTree' ).is( ':checked' ) ) {
									growtreeVal = parseInt( donation );
								}

								var cbc_charge = parseFloat( $( this ).data( 'cbccharge' ) );
								var value = parseFloat($( this ).data( 'oid' ) );

								if( value ) {
									$( '#payment_' + input_type ).val( value );
									$( '#payment_option_selected' ).val( value );
								}

								//Below code is to update 'Amount Payable' in case of CBC
								if( !isNaN( cbc_charge ) ) {
									var total = parseInt( $( '#total_pay_amount' ).val() );
									var cbc_added = total * ( parseFloat( cbc_charge ) ) / 100;
									var total_pay = total + Math.ceil( cbc_added ) + growtreeVal;

									var _pmt = utils.addSeparatorsNF( Math.ceil( total_pay ), '.', '.', ',');
									$( '#payment_form' ).find( '.final-pricing-checkout .txt-red' ).html( 'Rs. ' + _pmt );
									_pmt = '';

									//adding extra amount to be added in this hidden attribute for handling grow tree calculation in case of CBC
									$( '#cbc_added_amount' ).attr( 'data-cbc-amount', Math.ceil( cbc_added ) );
								} else {
									//Below block is to make cbc_charge span blank and showing total amount without adding any charges when no option is selected from the dropdown in case of CBC 'deposit in bank option'(which is currently disabled)
									var total = parseInt( $( '#total_pay_amount' ).val() );
									var total_pay = total + growtreeVal;

									var _pmt = utils.addSeparatorsNF( Math.ceil( total_pay ), '.', '.', ',');
									$( '#payment_form' ).find( '.final-pricing-checkout .txt-red' ).html( 'Rs. ' + _pmt );
									_pmt = '';

									//adding extra amount to be added in this hidden attribute for handling grow tree calculation in case of CBC
									$( '#cbc_added_amount' ).attr( 'data-cbc-amount', 0 );
									$( '#payment_option_selected' ).val( '' );
								}

								o.checkCBCrange( total_pay );
							}
							/* CBC related code ends*/
						}
					});
				}

				/* part pay terms and condition agreement event start */
				if ( $( "#partPayAgreement" ).length > 0) {
					$( "#partPayAgreement" ).change( function() {
					   if ($(this).is(":checked")) {
						var total = parseInt($('#total_pay_amount').val());
						var part_remaining_amount = parseInt($("#net_part_payment_remaining").attr("data-net_part_payment_remaining"));
						if (!isNaN(part_remaining_amount)) {
						  var complete_remaining_amount = total - part_remaining_amount;
						  var convenience_fee = parseInt($("#convenience_fee").attr("data-convenience_fee"));
						  if (!isNaN(convenience_fee)) {
							complete_remaining_amount = complete_remaining_amount + convenience_fee;
						  }
						  if ($("#growTree").is(":checked")) {
							complete_remaining_amount = complete_remaining_amount + parseInt(donation);
						  }
						  $(".final-pricing-checkout .txt-red").html("Rs. " + utils.addSeparatorsNF(Math.ceil(complete_remaining_amount), '.', '.', ','));
						}

						o.handlePartPay("checked", part_remaining_amount, complete_remaining_amount);

					  } else {
						$('#checkoutPaySecureBtn').addClass('disabled');
						$('#partPayBreakupDetail').slideDown();
						$('#partPayAmtView, #partPayDropDown').hide();
						var complete_remaining_amount = parseInt($('#total_pay_amount').val());
						if ($("#growTree").is(":checked")) {
						  complete_remaining_amount = complete_remaining_amount + parseInt(donation);
						}

						$(".final-pricing-checkout .txt-red").html("Rs. " + utils.addSeparatorsNF(Math.ceil(complete_remaining_amount), '.', '.', ','));

						o.handlePartPay("unchecked");
					  }
					});
				}
				/* part pay terms and condition agreement event end */

				/**
				 * Handle grow-tree
				 */
				$( '#growTree' ).change( function() {
                    if($( this ).is( ":checked" ) ) {
						o.handleGrowTree( "checked" );

						/* Code for CBC starts */
						//In the Below if block, we are calculating total amount payable when Growtree checkbox is checked and any of the CBC mode is selected
						if($('.cbc_panel').is(':visible')){
								var cbc_added_amount = 0;
								var total = parseInt($('#total_pay_amount').val());
								if($("#cbc_added_amount").length > 0)
								{
										var cbc_amount = parseInt($("#cbc_added_amount").attr("data-cbc-amount")); //Taking extra CBC charge amount in a variable to be added in total pay
										if(!isNaN(cbc_amount)){
												cbc_added_amount = cbc_amount;
										}
								}
								if(cbc_added_amount > 0){
									$('.cbc_charges').text('Rs.'+(total+parseInt(donation))+' + Rs.'+cbc_added_amount);
								}
								var complete_total = total + cbc_added_amount + parseInt(donation);
								if($("#payment_form").length > 0)
								{
										$("#payment_form").find(".final_amt_payble .red").html("Rs. "+utils.addSeparatorsNF(Math.ceil(complete_total),'.','.',','));
								}
								o.checkCBCrange(complete_total);
						}
						/* Code for CBC ends */
                    }
                    else
                    {
                            o.handleGrowTree();

                            /* Code for CBC starts */
                            //In the Below if block, we are calculating total amount payable when Growtree checkbox is un-checked and any of the CBC mode is selected
                            if($('.cbc_panel').is(':visible')){
                                    var cbc_added_amount = 0;
                                    var total = parseInt($('#total_pay_amount').val());
                                    if($("#cbc_added_amount").length > 0)
                                    {
                                            var cbc_amount = parseInt($("#cbc_added_amount").attr("data-cbc-amount")); //Taking extra CBC charge amount in a variable to be added in total pay
                                            if(!isNaN(cbc_amount)){
                                                    cbc_added_amount = cbc_amount;
                                            }
                                    }
                                    if(cbc_added_amount > 0){
                                        $('.cbc_charges').text('Rs.'+total+' + Rs.'+cbc_added_amount);
                                    }
                                    var complete_total = total + cbc_added_amount;
                                    if($("#payment_form").length > 0)
                                    {
                                            $("#payment_form").find(".final_amt_payble .red").html("Rs. "+utils.addSeparatorsNF(Math.ceil(complete_total),'.','.',','));
                                    }
                                    o.checkCBCrange(complete_total);
                            }
                            /* Code for CBC ends */
                    }

                    o.handleWalletError();
				});
			},
			deleteProductFromCart : function( el ) {
				var pid = $.trim( $( el ).data( 'id' ) );

				if( ( pid != '' ) && ( $( '#cartitem_' + pid ).length > 0 ) ) {
					var _url = root_url + '/cart/removeitem/' + pid + '/1/1';
					var _params = {
						'pid' : pid,
						'evt' : el
					};

					utils.makeRequest( _url, 'POST', {}, o.handleDeleteCartProduct, o.handleError, '', _params );
				}
			},
			handleDeleteCartProduct : function( data, _params ) {
				data = $.parseJSON( data );

				utils.pushToDataLayer({
					'event': 'removeFromCart',
					'ecommerce': {
						'remove': {
							'products': [{
								'id': _params.pid,
							}]
						}
					}
				});

				/**
				 * Show the undo button
				 */
				$( '#cartitem_' + _params.pid ).siblings( '.delete_item' ).attr( 'data-hash', data.removed_item );
				$( '#cartitem_' + _params.pid ).slideUp(function () {
					$( this ).siblings( '.delete_item' ).slideDown();
				});

				// show the undo button for pre-determined interval
				o.timedObjects[ data.removed_item ] = setTimeout( function() {
					o.deleteTimedObject( _params.pid, data.removed_item );
				}, o.timeToLive);

				// cache this node to show after the "un-deleting" action,
				// make a deep copy to preserve events bound to this container
				//o.cachedObjects[ data.removed_item ] = $( '#cartitem_' + _params.pid ).hide().clone( true, true );
				o.cachedObjects[ data.removed_item ] = $.extend( true, {}, $( '#cartitem_' + _params.pid ) );

				o.handleCartBehaviour( data, _params.pid );
			},
			deleteTimedObject : function( pid, hash ) {
				try {
					$( 'div[data-hash="' + hash + '"]' ).hide().removeAttr( 'data-hash' );
					clearTimeout( o.timedObjects[ hash ] );
					delete o.timedObjects[ hash ];
					delete o.cachedObjects[ hash ];
				} catch( error ) {
					//TODO
				}
			},
			undoDeleteProductFromCart : function( el ) {
				var productNode = $( el ).attr( 'data-id' );
				var productHash = $( el ).attr( 'data-hash' );
				var id = productNode.split( '_' );
				id = id[ 1 ];

				var _url = root_url + '/cart/undo_removeitem';

				var _params = {
					'id' : id,
					'productNode' : productNode,
					'hash' : productHash,
				};

				var _data = {
					'hash' : productHash
				};

				utils.makeRequest( _url, 'POST', _data, o.handleUndoDeleteCartProduct, o.handleError, '', _params );
			},
			handleUndoDeleteCartProduct : function( data, _params ) {
				var el = o.cachedObjects[ _params.hash ];
				el.insertBefore( $( 'div[data-hash="' + _params.hash + '"]' ).hide() ).removeAttr( 'style' ).show();

				o.deleteTimedObject( _params.id, _params.hash );

				o.setPricing( data, _params.id );
			},
			setPricing : function( data, _params ) {
				data = $.parseJSON( data );

				var extra_discount = 0;
				var additional_discount = 0;
				var shipping_charge = 0;
				var growtree_amount = 0;
				var coupon = data.coupon;
				var total_tax = 0;
				var total_discount = 0;
				var exchange_discount = 0;

				if( typeof data.online_shipping_charge != "undefined" && $( "#shipping_handling" ).length > 0 ) {
					$( '#shipping_handling' ).attr( 'data-shipping-handling-amount', data.online_shipping_charge );

					if(data.online_shipping_charges == 0 ) {
						if( $( '#shipping_handling .price-dtl .txt-red' ).length == 0 ) {
							$( '<span class="txt-red">(Free)</span>' ).insertAfter( '#shipping_handling .price-dtl' );
						}

						$( '#shipping_handling .price-nmbr' ).html( 'Rs. ' + data.online_shipping_charge );
					} else {
						$( '#shipping_handling .price-dtl .txt-red' ).remove();
						$( '#shipping_handling .price-nmbr' ).html( 'Rs. ' + data.online_shipping_charge );
					}
				}				

				if( typeof coupon.success != 'undefined' && coupon.success == true && $( '#additional_discount' ).length > 0 ) {
					o.updateRowDiscount( coupon.items_discount );

					$( '#additional_discount' ).attr( 'data-additional-discount-amount', parseInt( coupon.discount_amount ) ).find( '.price-nmbr' ).html( '-Rs. ' + utils.addSeparatorsNF( Math.ceil( parseInt( coupon.discount_amount ) ), '.', '.', ',' ) );
					$( '#coupon-msgs' ).html( coupon.message );

					var tax = coupon.tax_info;
					var total_tax = parseInt( tax.total_tax );

					$( '#taxes' ).attr( 'data-total-tax', total_tax ).find( '.price-nmbr' ).html( 'Rs. ' + utils.addSeparatorsNF(Math.ceil( total_tax ), '.', '.', ',' ) );

					if( total_tax == 0 ) {
						$( '#taxes' ).slideUp();
					}
				} else {
					//slide up offerprice and coupon discount if coupon can not be applied
					$( '#coupon_code' ).val( '' ).removeAttr( 'readonly' );
					$( '#coupon-msgs' ).slideUp( 500 );
					$( '#additional_discount' ).attr( 'data-additional-discount-amount', '0' );
					$( '#taxes' ).attr( 'data-total-tax', '0' );
					$( '#offer_price' ).attr( 'data-offer-price', '0' );
					$( '#additional_discount, #taxes, #offer_price' ).slideUp( 500 );
				}

				o.applyFurnitureExchangeDiscount( data.furniture_exchange );

				if($("#extra_discount").length > 0) {
					extra_discount = parseInt( $( "#extra_discount" ).attr( "data-extra-discount-amount" ) );
					total_discount += extra_discount;
				}

				if( $( "#additional_discount" ).length > 0 ) {
					additional_discount = parseInt( $( "#additional_discount" ).attr( "data-additional-discount-amount" ) );
					total_discount += additional_discount;
				}

				if( $( "#shipping_handling" ).length > 0 ) {
					shipping_charge = parseInt( $( "#shipping_handling" ).attr( "data-shipping-handling-amount" ) );
					o.handleShippingChargesMsg( shipping_charge );
				}

				if( $( "#growtree_contribution" ).length > 0 ) {
					growtree_amount = parseInt( $( "#growtree_contribution" ).attr( "data-growtree-amount" ) );
				}

				if( $( ".fe_exchange" ).length > 0 ) {
					/* Furniture Exchange Start */
					var strChosen = $( 'input[name="fe_exchange"]:checked' ).attr( 'id' );
					if( typeof strChosen != "undefined" && strChosen == "fe_points" ) {
						exchange_discount = parseInt( $( "#fe_discount" ).attr( "fe-discount-amount" ) );
					}
					/* Furniture Exchange End */
				}

				if($("#taxes").length > 0) {
					total_tax = parseInt($("#taxes").attr("data-total-tax"));
				}

				var cart_total_pay = parseInt( Math.ceil( data.total_amount ) );
				//adding offer price
				o.updateOfferPrice(cart_total_pay,total_discount);
				//ends

				var total_pay = cart_total_pay + total_tax + growtree_amount + shipping_charge - additional_discount - extra_discount - exchange_discount;
				$("#item_total").attr("data-total-amount",cart_total_pay).find(".price-nmbr").html("Rs. "+utils.addSeparatorsNF(Math.ceil(cart_total_pay),'.','.',','));

				$("#total_pay_coupon").html("Rs. " + utils.addSeparatorsNF(Math.ceil(total_pay), '.', '.' , ',' ) );

				var cart_qty = 0;
				$(".item_list_input").each(function() {
					cart_qty = cart_qty + parseInt($(this).val());
				});

				if($("#shoppingcart").length > 0) {
					$("#shoppingcart span").html(cart_qty);
				}

				$( "#cartitem_" + _params.id ).slideUp( "300", function() {
					$( this ).remove();

					//Enable proceed button if no soldout items are there in the cart
					var proceed_btn = $('#cartitem a.btn_green');
					var proceed_btn1 = $('#cartitem a.btn_green_big');

					if($('.order_row_ofs').length == 0 && ( proceed_btn.hasClass('btn_disable' ) || proceed_btn1.hasClass('btn_disable' ) ) ){
						proceed_btn.removeClass('btn_disable');
						proceed_btn1.removeClass('btn_disable');

						var proceed_to_addr_rel = $( '#cartitem .btn_green' ).attr( 'rel' );

						if( typeof proceed_to_addr_rel !== typeof undefined && proceed_to_addr_rel !== false ) {
							proceed_btn.addClass( 'link_popup' );
							proceed_btn.attr( 'href', "javascript://" );
						} else {
							proceed_btn.attr( 'href', root_url + '/checkout/onepage' );
							proceed_btn1.attr( 'href', root_url + '/checkout/onepage' );
						}
					}

				});
			},
			checkAssemblyPincode : function( _pin ) {
				try {
					var _country = 'india';

					if( _pin === undefined ) {
						_pin = $( '#ckShippingAddress input[name="postcode"]' ).val();
						_country = $( '#ckShippingAddress input[name="country_id"]' ).val().toLowerCase();
					}

					if( ( _pin === undefined ) || ! utils.isNumber( _pin ) || ( _pin.length != 6 ) ) {
						// no address selected
						return false;
					}

					if( _country == 'india' ) {
						var _data = {
							pincode : _pin
						};

						var _url = root_url + '/pincode/check_assembly_pincode';
						var _params = {
							pincode : _pin
						};
						utils.makeRequest( _url, 'POST', _data, o.handleAssemblyResponse, o.handleError, '', _params );
					}
				} catch( error ) {
					PF.ERROR.raiseError( error );
				}
			},
			handleAssemblyResponse : function( data, _params ) {
				data = $.parseJSON( data );

				$( '.add_noassembly_input' ).remove();

				// handle furniture exchange
				var fe_option = $( '.fe_exchange:checked' );
				var fe_option_id = '';
				if( fe_option.length > 0 ) {
					fe_option_id = $( '.fe_exchange:checked' ).attr( 'id' ).toLowerCase();
					/*if( fe_option_id == 'fe_donation' ) {
						fe_option_id = '';
					}*/
				}

				if( typeof data.data != 'undefined' ) {
					var _serviceableCheck = data.data.serviceable_check;
					var is_exchange_pincode_servicable = data.data.is_exchange_pincode_servicable;
					var exchange_pincode = data.data.exchange_pincode;
					var add_req = data.data.additional_requirement.template;
					var add_req_state = data.data.additional_requirement.state;
					var isPartPay = parseInt( data.data.part_pay_check );

					// hide all errors by default
					o.hideErrors();

					// mayur ka paap
					if( ! isPartPay ) {
						$( '.partpay_available' ).hide();
					} else {
						$( '.partpay_available' ).show();
					}

					if( _serviceableCheck == 1 ) {
						if( $.inArray( o.pageType, [ 'OrderSummary', 'AddressSelection', 'FirstTime' ] ) != -1 )  {
							$( '#serviceablity_error_msg .error_msg_pincode' ).text( _params.pincode );
							$( '#serviceablity_error_msg' ).slideDown();

							if( $.inArray( o.pageType, [ 'AddressSelection', 'FirstTime' ] ) != -1 ) {
								$( '#form_serviceablity_error_msg .error_msg_pincode' ).text( _params.pincode );
								$( '#form_serviceablity_error_msg' ).slideDown();
							}

							var _srvcError = data.data.pincode_error;
							for( var i in _srvcError ) {
								if( _srvcError.hasOwnProperty( i ) ) {
									$( '#cartitem_' + i ).addClass( 'no_stock' );
									$( '#serviceable_pincode_' + i ).text( _params.pincode );
									$( '#is_serviceable_info_' + i + ' p' ).hide();
									$( '#is_serviceable_info_' + i ).siblings( '.checkout-message' ).show();

									o.non_serviceable_items.push( i );
								}
							}

							if( $.inArray( o.pageType, [ 'AddressSelection', 'FirstTime' ] ) != -1 ) {
								var _nonServiceItems = data.data.pincode_error;
								var _nonServiceText = '';
								for( var i in _nonServiceItems ) {
									if( _nonServiceItems.hasOwnProperty( i ) ) {
										_nonServiceText += '<a class="prod" href="' + root_url + _nonServiceItems[ i ].url + '"><img src="' + product_image_url + _nonServiceItems[ i ].image + '"></a>';
									}
								}

								$( _nonServiceText ).insertAfter( '#serviceablity_error_product_msg #clearfix1' );
								$( '#serviceablity_error_product_msg' ).slideDown();

								$( _nonServiceText ).insertAfter( '#form_serviceablity_error_product_msg #form_clearfix1' );
								$( '#form_serviceablity_error_product_msg' ).slideDown();
							}
						} else {
							//
						}
					} else {
						o.non_serviceable_items.length = 0;
					}

					if( is_exchange_pincode_servicable != 1 && $( '.fe_exchange' ).length && fe_option.length && ( fe_option_id != '' ) && exchange_pincode != 0 && exchange_pincode != null ) {
						o.handleFurnitureExchangeError( data );
					}

					if( data.data.assembly_check == 1 ) {
						$( '#assembly_error_header_msg .error_msg_pincode' ).html( _params.pincode );

						var _count = Object.keys( data.data.product ).length;
						var _text = '';
						if( _count > 1 ) {
							_text = 'these ' + _count + ' products';
						} else {
							_text = 'this ' + _count + ' product';
						}

						$( '#assembly_error_header_msg #assembly_product_count' ).html( _text );
						$( '#assembly_error_header_msg' ).slideDown();

						var _nonAssemblyItems = data.data.product;
						var _nonAssemblyText = '';
						for( var i in _nonAssemblyItems ) {
							if( _nonAssemblyItems.hasOwnProperty( i ) ) {
								_nonAssemblyText += '<a class="prod" href="' + root_url + _nonAssemblyItems[ i ].url + '"><img src="' + product_image_url + _nonAssemblyItems[ i ].image + '"></a>';
							}
						}

						$( '#assembly_error_product_msg .ck-product-notdeliverable' ).html( _nonAssemblyText );

						if( $.inArray( o.pageType, [ 'AddressSelection', 'FirstTime' ] ) != -1 ) {
							$( '#form_assembly_error_header_msg .error_msg_pincode' ).html( _params.pincode );
							$( '#form_assembly_error_header_msg #form_assembly_product_count' ).html( _text );
							$( '#form_assembly_error_header_msg' ).slideDown();
							$( '#form_assembly_error_product_msg .ck-product-notdeliverable' ).html( _nonAssemblyText );
						}
					}

					if( ( typeof add_req != 'undefined' ) && ( add_req != 'not required' ) ) {
						$( '#vip_add_popup' ).html( add_req );
						$( '#additional_req_state' ).html( add_req_state );
						$( '#additional_req' ).slideDown();

						if( $.inArray( o.pageType, [ 'FirstTime' ] ) != -1 ) {
							$( '#form_additional_req_state' ).html( add_req_state );
							$( '#form_additional_req' ).slideDown();
						}
					}
				}
			},
			handleFurnitureExchangeError : function( data ) {

			},
			hideErrors : function() {
				$( '#additional_req' ).hide();
				$( '#serviceability_error_msg' ).hide();
				$( '#assembly_error_header_msg' ).hide();
				$( '#assembly_error_product_msg' ).hide();
				$( '#fe_error_msg' ).hide();
				$( '#serviceablity_error_msg .error_msg_pincode' ).text( '' );
				$( '#serviceablity_error_msg' ).hide();
				$( 'div[id^=cartitem]' ).removeClass( 'no_stock' );
				$( 'div[id^="is_serviceable_info_"] p' ).show();
				$( '.order-summary-row-wrapper .checkout-message.error' ).hide();
				$( '#serviceablity_error_product_msg .prod' ).remove();
				$( '#serviceablity_error_product_msg' ).hide();
				$( '#assembly_error_header_msg .error_msg_pincode' ).html( '' );
				$( '#assembly_error_header_msg #assembly_product_count' ).html( '' );
				$( '#assembly_error_header_msg' ).hide();
				$( '#assembly_error_product_msg .ck-product-notdeliverable' ).html( '' );
				$( '#additional_req' ).hide();
				$( '#form_additional_req' ).hide();

				// hide the address form errors
				if( o.pageType == 'AddressSelection' ) {
					$( '#form_serviceability_error_msg' ).hide();
					$( '#form_assembly_error_header_msg' ).hide();
					$( '#form_assembly_error_product_msg' ).hide();
					$( '#form_fe_error_msg' ).hide();
					$( '#form_serviceablity_error_msg .error_msg_pincode' ).text( '' );
					$( '#form_serviceablity_error_msg' ).hide();
					$( '#form_serviceablity_error_product_msg .prod' ).remove();
					$( '#form_serviceablity_error_product_msg' ).hide();
					$( '#form_assembly_error_header_msg .error_msg_pincode' ).html( '' );
					$( '#form_assembly_error_header_msg #form_assembly_product_count' ).html( '' );
					$( '#form_assembly_error_header_msg' ).hide();
					$( '#form_assembly_error_product_msg .ck-product-notdeliverable' ).html( '' );
				}
			},
			applyCoupon : function( e, action ) {
				/**
				 * Use coupon on order summary
				 *
				 * @param e Event
				 * @param action apply/cancel coupon code applied
				 *
				 */
				e.preventDefault ? e.preventDefault() : ( e.returnValue = false );

				var coupon_code = $( '#coupon_code' ).val();

				if( typeof coupon_code != 'undefined' && coupon_code != '' ) {
					var _data = {
						'coupon_code' : coupon_code
					};

					switch( action ) {
						case 'apply':
							_data.apply = action;
							break;
						case 'cancel':
							_data.cancel = action;

							// remove row-wise discount
							o.removeRowDiscount();
							break;
						default:
							return false;
							//break;
					}

					var _url = root_url + '/checkout/validate_coupon/0/' + coupon_code + '/1';
					var _params = {
						action : action
					};

					utils.makeRequest( _url, 'POST', _data, o.handleCouponResponse, o.handleError, '', _params );
				}
			},
			handleCouponResponse : function( data, _params ) {
				/**
				 * Handle the response for apply/cancel coupon code on order summary
				 */
				data = $.parseJSON( data );

				var _response = data.data.success;
				if( typeof _response != 'undefined' && _response == true ) {
					var _pay = '';

					o.applyFurnitureExchangeDiscount( data.data.furniture_exchange );

					switch( _params.action ) {
						case 'apply':
							// apply the coupon and update the you-pay price
							var discount_amount = data.data.discount_amount;
							var total_tax = data.data.tax_info.total_tax;

							$( '#additional_discount' ).attr( 'data-additional-discount-amount', parseInt( discount_amount ) );

							//rendering row-wise discount
							o.updateRowDiscount( data.data.items_discount );
							// item discount ends

							$( '#taxes' ).attr( 'data-total-tax', parseInt( total_tax ) );
							$( '#taxes .price-nmbr' ).html( 'Rs. ' + total_tax );

							// update the you pay price
							_pay = o.totalPay();

							$( '#coupon-msgs' ).html( data.data.message ).addClass( 'valid_coupon' );

							if($( '#coupon-msg-wrong' ).hasClass( 'invalid_coupon' ) ) {
								$( '#coupon-msg-wrong' ).removeClass( 'invalid_coupon' );
							}

							var additional_discount = utils.addSeparatorsNF( discount_amount, '.', '.' , ',' );
							$( '#additional_discount .price-nmbr' ).html( '-Rs. ' + additional_discount );

							//calling function to calculate offer price
							var discount = parseInt( discount_amount ) + _pay.exchange_discount;
							o.updateOfferPrice( _pay.item_total, discount );

							$( '#additional_discount, #coupon-msgs, #offer_price' ).slideDown( 500 );
							$( '.coupon_discount_amount' ).show( 200 );
							//ends

							$( '#apply_coupon' ).hide();
							$( '#cancel_coupon' ).show();

							$( '#coupon-msg-wrong' ).slideUp( 500 );
							$( '#coupon_code' ).attr( 'readonly', 'readonly');

							if( total_tax > 0 ) {
								$( '#taxes' ).slideDown( 500 );
								$( '#cart_incl_note' ).slideUp( 500 );
							}
							break;
						case 'cancel':
							// cancel the applied coupon and update the you-pay price
							$( '#coupon-msgs' ).html = '';
							$( '#coupon-msgs' ).slideUp( 500, function() {
								$( this ).html = '';
							});

							$( '#additional_discount' ).attr( 'data-additional-discount-amount', '0' );
							$( '#taxes' ).attr( 'data-total-tax', '0' );
							$( '#additional_discount, #taxes, #offer_price' ).slideUp( 500 );
							$( '#cart_incl_note' ).slideDown( 500 );

							$( '.coupon_discount_amount' ).hide( 300, function() {
								$( '.order-summary-row .final_pricing' ).each(function() {
									$( this ).addClass( 'new_price p_left' );
									$( this ).removeClass( 'old_price grey_text' );
								});
							});

							$('#apply_coupon').show();
							$('#cancel_coupon').hide();

							$( '#coupon_code' ).removeAttr( 'readonly' );
							$( '#coupon_code' ).val( '' );

							// update the you pay price
							o.totalPay();

							break;
					}
				} else if( typeof _response != 'undefined' && _response == false && _params.action == 'apply' ) {
					$( '#coupon-msg-wrong' ).html( data.data.message ).addClass( 'invalid_coupon' );

					if( $( '#coupon-msg-wrong' ).hasClass( 'valid_coupon' ) ) {
						$( '#coupon-msg-wrong' ).removeClass( 'valid_coupon' );
					}

					$( '#coupon-msg-wrong' ).slideDown( 500 );
					$( '#coupon_code' ).val( '' );
				}
			},
			updateRowDiscount : function( items_discount_json ) {
				/**
				 * Update row-wise discount on order summary
				 */
				var itemDiscountObj = $.parseJSON( items_discount_json );

				$.each( itemDiscountObj, function( key, val ) {
					val = parseFloat( val );

					var elem = $( '#cartitem_' + key );

					if( val == 0 ) {
						var _originalPrice = $.trim( elem.find( '.strike_txt' ).html() );
						elem.find( '.final_pricing' ).html( _originalPrice );
						elem.find( '.strike_txt' ).html( '' );
						elem.find( '.saving-price' ).html( '' );

						return true;
					}

					var _oldPrice = $.trim( elem.find( ' .final_pricing' ).html() );
					var _oldPriceAmount = parseFloat( $.trim( _oldPrice.replace( /Rs./ig, '' ).replace( /,/ig, '' ) ) );

					var discounted_price = utils.addSeparatorsNF( _oldPriceAmount - val, '.', '.', ',' );
					var saved_price = utils.addSeparatorsNF( val, '.', '.', ',' );

					elem.find( ' .strike_txt' ).html( _oldPrice );
					elem.find( ' .final_pricing' ).html( 'Rs. ' + discounted_price );
					elem.find( ' .saving-price' ).html( 'Rs. ' + saved_price + ' Saved!' );
				});
			},
			removeRowDiscount : function() {
				/**
				 * Remove row-wise discount from the order summary page
				 */
				$( '.order-summary-row .pricing-details .table-cell' ).each(function() {
					var strikeThroughPrice = $.trim( $( this ).find( '.strike_txt' ).html() );
					$( this ).find( '.final_pricing' ).html( strikeThroughPrice );

					$( this ).find( '.strike_txt' ).html( '' );
					$( this ).find( '.saving-price' ).html( '' );
				});
			},
			applyFurnitureExchangeDiscount : function( furnitureExchange ) {
				var fe_points = 0;

				if( typeof furnitureExchange != 'undefined' && furnitureExchange != null && typeof furnitureExchange.fe_details != 'undefined' ) {
					fe_points = furnitureExchange.fe_details.fe_points;

					if( $( '.shipping_holder' ).length > 0 ) {
						var address_id = $( '#shipping_address_wrapper .address_holder.active input[name="shipping_address_id"]' ).val();

						var postcode = $( '.shipping_holder' ).find( 'input[value="' + address_id + '"]' ).parent().parent().children( 'input[name="postcode"]' ).val();

						o.checkAssemblyPincode( postcode );
					}

					$( '#fe_points' ).val( fe_points );
					$( '#fe_donation' ).val( furnitureExchange.fe_donation );
					$( '#fe_discount' ).find( '.price-nmbr' ).html( '-Rs. ' + utils.addSeparatorsNF( fe_points, '.', '.', ',' ) );
					$( '#fe_discount' ).attr( 'fe-discount-amount', fe_points );
					$( '.show_fe' ).show( 300 );
				} else {
					o.removeFurnitureExchange();
					$( '.show_fe, #fe_discount' ).hide( 300 );
				}

				fe_points = utils.addSeparatorsNF( fe_points, '.', '.', ',' );
				$( '#fe_point_display' ).text( 'Use ' + fe_points + ' exchange points, get Rs. ' + fe_points + ' OFF' );
			},
			removeFurnitureExchange : function() {
				$( '.fe_exchange' ).removeAttr( 'checked' );
				utils.eraseCookie( 'furnitureExchange' );

				o.showAddBlock( 'exchange' );

				if( $( '#offer_price' ).css( 'display' ) != 'none' ) {
					var itemTotal = parseInt( $( '#item_total' ).attr( 'data-total-amount' ) );
					var discount = parseInt( $( '#additional_discount' ).attr( 'data-additional-discount-amount' ) );

					o.updateOfferPrice( itemTotal, discount );
					o.totalPay();
				}
			},
			showAddBlock : function( type ) {
				/**
				 * To show add address pop-up or choose address block
				 */
				if( type == 'choose' ) {
					if($("#furniture_exchange").css("display") != 'none') {
						$( '#shipping_address_wrapper' ).find( '.address_holder.active' ).removeClass( 'active' );
						$( '#shipping_address_wrapper' ).find( '.address_holder .radio_wrap.active' ).removeClass( 'active' );
						$( '#address_popup' ).find( 'input[name="shipping_address_id"]' ).val( '' );
					} else {
						$( 'a.btn_green' ).removeClass( 'btn_disable' );
						$( 'a.btn_green' ).removeClass( 'btn_disable' ).attr( 'onclick', 'PF.CHECKOUT.addressselect();' );
					}

					$( '.noassembly_box, #furniture_exchange, .same_as_pickup' ).slideUp( 700 );
				} else if( type == 'exchange' ) {
					if( $( '#address_select_form' ).length > 0 ) {
						$( 'a.btn_green' ).removeClass( 'btn_disable' ).attr( 'onclick', 'PF.CHECKOUT.addressselect();' );
					}

					$( '.noassembly_box, #furniture_exchange, .same_as_pickup, #fe_discount' ).slideUp( 700 );
				}
			},
			setDefaultAddress : function( _id, _type ) {
				var _address = $.parseJSON( address_data );
				_address = _address[ _id ];

				if( typeof _address === 'undefined' ) {
					return false;
				}

				var elem = '';
				var _checkAssembly = 0;
				switch( _type ) {
					case 'billing':
						elem = 'ckBillingAddress';
						break;
					case 'shipping':
						elem = 'ckShippingAddress';
						_checkAssembly = 1;
						break;
					default:
						break;
				}

				var _originalID = parseInt( $( '#' + elem + ' .checkout-address-main input' ).val() );

				if( parseInt( _id ) == _originalID ) {
					return;
				}

				$('#' + elem + ' .checkout-address-main input').val( _id );
				$( '#' + elem + ' .checkout-address-main p:eq(0)' ).html( _address.fname + ' ' + _address.lname );

				var info = _address.street.join( ',' ) + ',' + _address.landmark + ',' + _address.city + ',' + _address.state;
				info += '-' + _address.postcode + ',' + _address.country;

				info = info.replace( /,{2,}/g, ',' );
				$( '#' + elem + ' .checkout-address-main p:eq(1)' ).html( info );
				$( '#' + elem + ' .checkout-address-main p:eq(2)' ).html( 'T: ' + _address.mobile );

				var el = $( '#' + elem );

				_address.street[ 1 ] = ( typeof _address.street[ 1 ] === 'undefined' ) ? '' : _address.street[ 1 ];
				el.find( 'input[type="hidden"][name="firstname"]' ).val( _address.fname );
				el.find( 'input[type="hidden"][name="lastname"]' ).val( _address.lname );
				el.find( 'input[type="hidden"][name="street"]' ).val( _address.street[ 0 ] );
				el.find( 'input[type="hidden"][name="street1"]' ).val( _address.street[ 1 ] );
				el.find( 'input[type="hidden"][name="landmark"]' ).val( _address.landmark );
				el.find( 'input[type="hidden"][name="city"]' ).val( _address.city );
				el.find( 'input[type="hidden"][name="region"]' ).val( _address.state );
				el.find( 'input[type="hidden"][name="postcode"]' ).val( _address.postcode );
				el.find( 'input[type="hidden"][name="country_id"]' ).val( _address.country );
				el.find( 'input[type="hidden"][name="mobile"]' ).val( _address.mobile );

				// since the user changed her shipping address, check the assembly, serviceability, FE and addl-req. checks
				if( _checkAssembly ) {
					o.checkAssemblyPincode();
				}
			},
			showAddressForEdit : function( _id ) {
				var _address = $.parseJSON( address_data );
				_address = _address[ _id ];

				if( typeof _address === 'undefined' ) {
					return false;
				}

				// check whether the request has come from either of billing/shipping forms
				var _form = o.getSelectedPanel();
				if( ! _form ) {
					return false;
				}

				var fieldPrefix = '';

				if( _form === 'billing' ) {
					fieldPrefix = 'bill_';
				}

				_address.street[ 1 ] = ( typeof _address.street[ 1 ] === 'undefined' ) ? '' : _address.street[ 1 ];

				$( '#' + fieldPrefix + 'firstname' ).val( _address.fname ).parent().addClass( 'input-filled' );
				$( '#' + fieldPrefix + 'lastname' ).val( _address.lname ).parent().addClass( 'input-filled' );
				$( '#' + fieldPrefix + 'mobile' ).val( _address.mobile ).parent().addClass( 'input-filled' );
				$( '#' + fieldPrefix + 'street' ).val( _address.street[ 0 ] ).parent().addClass( 'input-filled' );
				$( '#' + fieldPrefix + 'street2' ).val( _address.street[ 1 ] ).parent().addClass( 'input-filled' );
				$( '#' + fieldPrefix + 'landmark' ).val( _address.landmark ).parent().addClass( 'input-filled' );
				$( '#' + fieldPrefix + 'postcode' ).val( _address.postcode ).parent().addClass( 'input-filled' );
				$( '#' + fieldPrefix + 'city' ).val( _address.city ).parent().addClass( 'input-filled' );

				//$( '#' + fieldPrefix + 'region_select' );
				$( '#s2id_' + fieldPrefix + 'region_select' ).select2( 'val', _address.state );
				$( '#' + fieldPrefix + 'country_id  option:contains(' + _address.country + ')' ).prop( 'selected', true );
			},
			changeButtonState : function( _state ) {
				// change button state
				if( typeof utils._backUpText === 'undefined' ) {
					utils._backUpText = $( '.btn_green_big' ).html();
				}

				switch( _state )  {
					case 'loading':
						var loader = '<div class="btn-loader"><img alt="loading" src="' + root_url + '/images/btn-loader.gif"></div>';
						$( '.btn_green_big' ).addClass( 'loading' ).html( loader );
						break;
					case 'original':
					default:
						$( '.btn_green_big' ).removeClass( 'loading' ).html( utils._backUpText );
						break;
				}
			},
			getSelectedPanel : function() {
				// check whether the request has come from either of billing/shipping forms
				var _form = '';
				if( $( '#ckShippingAddress' ).hasClass( 'active' ) ) {
					_form = 'shipping';
				} else if( $( '#ckBillingAddress' ).hasClass( 'active' ) ) {
					_form = 'billing';
				} else if( $( '.checkout-fst-time-user' ).length ) {
					_form = 'first_time';
				} else {
					return false;
				}

				return _form;
			},
			loginValidation : function( _id ) {
				var prefix = '';
				var isFormValid = true;

				// hide all errors by default
				$( '.error-text' ).hide();

				if( _id == 'billing' ) {
					prefix = 'bill_';
				}

				var fname = $.trim( $( '#' + prefix + 'firstname' ).val() );
				var lname = $.trim( $( '#' + prefix + 'lastname' ).val() );
				var nameFilter = /^[a-zA-Z\s]*$/;

				var phoneVal = $.trim( $( '#' + prefix + 'mobile' ).val() );
				var numbers = phoneVal.split( '' ).length;

				var street = $( '#' + prefix + 'street' );
				var postcode = $( '#' + prefix + 'postcode' );
				var city = $( '#' + prefix + 'city' );
				var country = $.trim( $( '#' + prefix + 'country_id' ).val() );
				var state = $( '#' + prefix + 'region_select' );

				if( ( fname == '' ) || ! nameFilter.test( fname ) ) {
					$( '#' + prefix + 'firstname' ).val( '' );
					$( '#' + prefix + 'firstname' ).parent().siblings( '.error-text' ).show();
					isFormValid = false;
				}

				if( ( lname == '' ) || ! nameFilter.test( lname ) ) {
					$( '#' + prefix + 'firstname' ).val( '' );
					$( '#' + prefix + 'lastname' ).parent().siblings( '.error-text' ).show();
					isFormValid = false;
				}

				if( ( phoneVal == '' ) || ( numbers == 10 && phoneVal.charAt( 0 ) == 0 ) ) {
					$( '#' + prefix + 'mobile' ).val( '' );
					$( '#' + prefix + 'mobile' ).parent().siblings( '.error-text' ).show();
					isFormValid = false;
				} else {
					var phoneRegExp = /^((\+)?[1-9]{1,2})?([-\s\.])?((\(\d{1,4}\))|\d{1,4})(([-\s\.])?[0-9]{1,12}){1,2}$/;

					if( ( numbers == 10 ) && ( phoneRegExp.test( phoneVal ) ) ) {
						// valid
					} else {
						$( '#' + prefix + 'mobile' ).val( '' );
						$( '#' + prefix + 'mobile' ).parent().siblings( '.error-text' ).show();
						isFormValid = false;
					}
				}

				if( $.trim( street.val() ) == '' ) {
					$( '#' + prefix + 'street' ).val( '' );
					$( '#' + prefix + 'street' ).parent().siblings( '.error-text' ).show();
					isFormValid = false;
				}

				if( $.trim( city.val() ) == '' ) {
					$( '#' + prefix + 'city' ).val( '' );
					$( '#' + prefix + 'city' ).parent().siblings( '.error-text' ).show();
					isFormValid = false;
				} else {
					var city1 = $.trim( city.val() );

					if( ! nameFilter.test( city1 ) ) {
						$( '#' + prefix + 'city' ).val( '' );
						$( '#' + prefix + 'city' ).parent().siblings( '.error-text' ).show();
						isFormValid = false;
					}
				}

				if( $.trim( state.val() ) == '' ) {
					if( country != 'IN' ) {
						$( '#' + prefix + 'state' ).val( '' );
						$( '#' + prefix + 'state' ).parent().siblings( '.error-text' ).show();
						isFormValid = false;
					}
				}

				if( $.trim( postcode.val() ) == '' ) {
					$( '#' + prefix + 'region' ).val( '' );
					$( '#' + prefix + 'region' ).parent().siblings( '.error-text' ).show();
					isFormValid = false;
				}

				return isFormValid;
			},
			addAddress : function() {
				// check whether the request has come from either of billing/shipping forms
				var _form = o.getSelectedPanel();
				if( ! _form ) {
					return false;
				}

				// check whether the user has added a new address or is editing an existing address
				var _addressState = '';
				if( $( '#update_id' ).val() === '' ) {
					_addressState = 'new';
				} else if( $( '#update_id' ).val() !== '' ) {
					_addressState = 'existing';
				} else {
					return false;
				}

				// check user action whether adding/editing a new/existing shipping/billing address
				var userAction = _form + '_' + _addressState;
				switch( userAction ) {
					case 'shipping_new':
						$( 'form input[name="shipping_address_id"]' ).removeAttr( 'checked' );
						$( 'form input[name="save_address"]' ).val( 1 );
						$( '#update_id' ).val( '' );
						break;
					case 'shipping_existing':
						// update_id already has the id of the existing address
						break;
					case 'billing_new':
						$( 'form input[name="billing_address_id"]' ).removeAttr( 'checked' );
						$( '#save_billing_address' ).val( 1 );
						$( '#update_id' ).val( '' );
						break;
					case 'billing_existing':
						// update_id already has the id of the existing address
						break;
					case 'first_time_new':
						// first time user..adding a shipping address
						break;
					default:
						return false;
						//break;
				}

				if( o.loginValidation( _form ) ) {
					o.addressselect();
					return false;
				}
			},
			addressselect : function() {
				/**
				 * Select shipping and billing address
				 */
				var valid = true;
				var service_error = false;
				o.changeButtonState( 'loading' );

				// user can add 9 addresses at most
				if( $( '#shippingAddressOpenCont .ship-address-row' ).length > 9 ) {
					$( '#save_billing_address' ).val( 0 );
				}

				var _postcode = $( '#ckShippingAddress input[name="postcode"]' );
				if( _postcode.val() != '' ) {
					var country = $( '#ckShippingAddress input[name="country_id"]' ).val();
					if( country == 'IN' ) {
						if( _postcode.val().length != 6 || isNaN( parseInt( _postcode.val() ) ) ) {
							$("#pincode-error-msg").show();
							_postcode.addClass( 'input_error' ).parent().addClass( 'input_error' );

							o.changeButtonState( 'original' );
							valid = false;
						}
					}
				}

				if( valid === true ) {
					var data = $( '#address_select_form' ).serialize();
					var pincode = "";

					var _url = root_url + '/checkout/addressSelect';
					var _params = {
						'pincode' : pincode,
						'service_error' : service_error
					};

					utils.makeRequest( _url, 'POST', data, o.handleAddressSelectResponse, o.addressSelectError, '', _params );
				}
			},
			addressSelectError : function() {
				$( 'html, body' ).animate({scrollTop: $( '#address_select_form' ).offset().top - 50}, 500 );
				o.changeButtonState( 'original' );
				return false;
			},
			handleAddressSelectResponse : function( data, _params ) {
				data = $.parseJSON( data );

				if( typeof data.data.success != "undefined" && data.data.success == true ) {
					utils.l.href = root_url + '/checkout/onepage';
				} else if( typeof data.data.success != "undefined" && data.data.success == false ) {
					var address_error = data.data.addresserror;

					if( address_error == "success" ) {
						window.location.href = root_url + '/checkout/onepage';
					} else {
						o.changeButtonState( 'original' );
						if(typeof address_error.save_error != "undefined") {
							if(address_error.save_error == 'An error has occurred. Please refresh the page and try again.') {
								o.changeButtonState( 'original' );
							} else if($("#shipping_address_form").css("display") == "none") {
								$("#save_error").html(address_error.save_error).show();
								$(".popup_close").click();
								o.changeButtonState( 'original' );
							} else {
								$("#international_shipping").html(address_error.save_error).show();
								o.changeButtonState( 'original' );
								$('html, body').animate({scrollTop: $('#address_select_form').offset().top - 70}, 500);
							}
						} else if(typeof address_error.header != "undefined") {
							if($("#shipping_address_form").css("display") == "none") {
								$("#save_error").html(address_error.header).show();
								$(".popup_close").click();
							} else {
								$("#international_shipping").html(address_error.header).show();
							}

							o.changeButtonState( 'original' );
						} else {
							var total_items = 0;
							$.each(address_error, function(i, val) {
								if(i != 'pincode_header' && i != 'pincode_error' && i != 'region') {
									$("#" + i ).parent().siblings('.error-text').html( val );
								} else if(i == 'region') {
									$("#region_select").parent().siblings('.error-text').html( val );
								} else if(i == 'pincode_header') {
									if( ! _params.service_error ) {
										$(".not_serviceable").addClass("not_serviceable").find(".ucase strong").html(val);
									}
								} else if(i == 'pincode_error') {
									var pincode_error = address_error.pincode_error;
									if(!_params.service_error) {
										var html = '';
										$(".noassembly_prod").remove();
										$.each(pincode_error, function(j, value) {
											html += "<a href='javascript:void(0)' class='noassembly_prod' data-item-info='"+j+"'>";

											html += "<img src='"+product_image_url+""+val[j].image+"' alt='' />";

											html += "<span class='title_1'>"+val[j].name+"</span>";

											html += "<span class='del_prod' onclick='PF.CHECKOUT.deleteItem("+j+",1);'>&nbsp;</span></a>";
											//for message no_assembly text box - following items are /is
											total_items++;
										});

										$(".popup_close").click();
										$(".noassembly_box .clearfix").before(html);
										$("#address_error").show();
										$(".noassembly_box").addClass("not_serviceable").slideDown(1000);
										// No-Assembly product delete
										$('.noassembly_prod .del_prod').on('click', function(e) {
											$(this).parent().animate({opacity:0,height:0,width:0,borderWidth:0,padding:0, margin:0}, 500);
											e.preventDefault();
										});
									} else if($("#shipping_address_form").css("display") != "none") {
										var product = address_error.pincode_error;
										//var pincode_header = address_error.pincode_header;
										var pincode_header = "Item(s) cannot be delivered <u>here</u>";
										//disable form submit if pincode is incorrect
										o.disableShippingFormSubmit( product, pincode_header );
									}
								}
							});

							o.changeButtonState( 'original' );

							//show error popup if error does not occur on shipping
							if($("#shipping_address_form").css("display") == "none") {
								if(total_items > 1) {
									$(".noassembly_box .text_1").html("The following items are not deliverable to your location "+_params.pincode);
								} else {
									$(".noassembly_box .text_1").html("The following item is not deliverable to your location "+_params.pincode);
								}
								$('html, body').animate({scrollTop: $('#address_select_form').offset().top - 50}, 500);
							}
						}
					}
				}
				return false;
			},
			addAddressForm : function( id, ext ) {
				var errors = 0;

				var fname = $.trim( $( '#' + id + ' #' + ext + 'firstname' ).val() );
				var lname = $.trim( $( '#' + id + ' #' + ext + 'lastname' ).val() );
				var nameFilter = /^[a-zA-Z\s]*$/;
				var phoneVal = $.trim( $( '#' + id + ' #' + ext + 'mobile' ).val() );
				var numbers = phoneVal.split( '' ).length;
				var street = $( '#' + id + ' #' + ext + 'street' );
				var city = $( '#' + id + ' #' + ext + 'city' );
				var region = $( '#' + id + ' #' + ext + 'region_txtbox' );
				var country = $.trim( $( '#' + id + ' #' + ext + 'country_id').val() );
				var region_select = $( '#' + id + ' #' + ext + 'region_select' );
				var postcode = $( '#' + id + ' #' + ext + 'postcode' );

				if( fname == 'First Name' || fname == '' ) {
					$( '#' + id + ' #' + ext + 'fnameError' ).css( 'display', 'block' );
					$( '#' + id + ' #' + ext + 'firstname' ).parent().addClass( 'input_error' );
					errors = 1;
				} else {
					if( nameFilter.test( fname ) ) {
						$( '#' + id + ' #' + ext + 'fnameError' ).css( 'display', 'none' );
						$( '#' + id + ' #' + ext + 'firstname' ).parent().removeClass( 'input_error' );
					} else {
						$( '#' + id + ' #' + ext + 'fnameError' ).css( 'display', 'block' );
						$( '#' + id + ' #' + ext + 'firstname' ).parent().addClass( 'input_error' );
						errors = 1;
					}
				}

				if( lname == 'Last Name' || lname == '' ) {
					$( '#' + id + ' #' + ext + 'lnameError' ).css( 'display', 'block' );
					$( '#' + id + ' #' + ext + 'lastname' ).parent().addClass( 'input_error' );
					errors = 1;
				} else {
					if( nameFilter.test( lname ) ) {
						$( '#' + id + ' #' + ext + 'lnameError' ).css( 'display', 'none' );
						$( '#' + id + ' #' + ext + 'lastname' ).parent().removeClass( 'input_error' );
					} else {
						$( '#' + id + ' #' + ext + 'lnameError' ).css( 'display', 'block' );
						$( '#' + id + ' #' + ext + 'lastname' ).parent().addClass( 'input_error' );
						errors = 1;
					}
				}

				if( phoneVal == '' ) {
					$( '#' + id + ' #' + ext + 'mobileError' ).css( 'display', 'block' );
					$( '#' + id + ' #' + ext + 'mobileError1' ).css( 'display', 'none' );
					$( '#' + id + ' #' + ext + 'mobile' ).parent().addClass( 'input_error' );
					errors = 1;
				} else if( numbers == 10 && phoneVal.charAt( 0 ) == 0 ) {
					$( '#' + id + ' #' + ext + 'mobileError' ).css( 'display', 'none' );
					$( '#' + id + ' #' + ext + 'mobileError1' ).css( 'display', 'block' );
					$( '#' + id + ' #' + ext + 'mobile' ).parent().addClass( 'input_error' );
					errors = 1;
				} else {
					var phoneRegExp = /^((\+)?[1-9]{1,2})?([-\s\.])?((\(\d{1,4}\))|\d{1,4})(([-\s\.])?[0-9]{1,12}){1,2}$/;

					if( numbers == 10 && phoneRegExp.test( phoneVal ) ) {
						$( '#' + id + ' #' + ext + 'mobileError' ).css( 'display', 'none' );
						$( '#' + id + ' #' + ext + 'mobileError1' ).css( 'display', 'none' );
						$( '#' + id + ' #' + ext + 'mobile' ).parent().removeClass( 'input_error' );
					} else {
						errors = 1;
						$( '#' + id + ' #' + ext + 'mobileError' ).css( 'display', 'block' );
						$( '#' + id + ' #' + ext + 'mobileError1' ).css( 'display', 'none' );
						$( '#' + id + ' #' + ext + 'mobile' ).parent().addClass( 'input_error' );
					}
				}

				if( $.trim( street.val() ) == '' ) {
					street.parent().addClass( 'input_error' );
					$( '#' + id + ' #' + ext + 'streetError' ).css( 'display', 'block' );
					errors = 1;
				} else {
					street.parent().removeClass('input_error');
					$( '#' + id + ' #' + ext + 'streetError' ).css( 'display', 'none' );
				}

				if( $.trim( city.val() ) == '' ) {
					$( '#' + id + ' #' + ext + 'cityEmptyError' ).css( 'display', 'block' );
					$( '#' + id + ' #' + ext + 'cityError' ).css( 'display', 'none' );
					city.parent().addClass( 'input_error' );
					errors = 1;
				} else {
					var city1 = $.trim( city.val() );
					if( nameFilter.test( city1 ) ) {
						$( '#' + id + ' #' + ext + 'cityError' ).css( 'display', 'none' );
						$( '#' + id + ' #' + ext + 'cityEmptyError' ).css( 'display', 'none' );
						city.parent().removeClass('input_error');
					} else {
						$( '#' + id + ' #' + ext + 'cityError').css( 'display', 'block' );
						$( '#' + id + ' #' + ext + 'cityEmptyError' ).css( 'display', 'none' );
						city.parent().addClass( 'input_error' );
						errors = 1;
					}
				}

				if( $.trim( region.val() ) == '' ) {
					if( country != 'IN' ) {
						region.parent().addClass( 'input_error' );
						$( '#' + id + ' #' + ext + 'region_txtboxError' ).show();
						errors = 1;
					} else {
						region.parent().removeClass( 'input_error' );
						$( '#' + id + ' #' + ext + 'region_txtboxError' ).hide();
					}
				} else {
					$( '#' + id + ' #' + ext + 'region_txtbox' ).parent().removeClass( 'input_error' );
					$( '#' + id + ' #' + ext + 'region_txtboxError' ).hide();
				}

				if( $.trim( region_select.val() ) == '' ) {
					if( country != "IN" ) {
						region_select.parent().addClass( 'input_error' );
						errors = 1;
					} else {
						region_select.parent().removeClass( 'input_error' );
					}
				} else {
					region_select.parent().removeClass( 'input_error' );
				}

				if( $.trim( postcode.val() ) == '' ) {
					$( '#' + id + ' #' + ext + 'pincode-error-msg' ).css( 'display', 'block' );
					postcode.parent().addClass( 'input_error' );
					errors = 1;
				} else {
					$( '#' + id + ' #' + ext + 'pincode-error-msg' ).css( 'display', 'none' );
					postcode.parent().removeClass( 'input_error' );
				}

				if( errors == 0 ) {
					return true;
				}

				return false;
			},
			disableShippingFormSubmit : function() {
				// disable the address form
				$( '#address_select_form button.btn_blue' ).addClass( '.btn_disable' );
				//utils.removeListener();
			},
			deleteItem : function( product_id, error ) {
				if( typeof product_id != "undefined" && $(".order-summary-row").length > 1 ) {
					var _url = root_url + '/cart/removeitem/' + product_id + '/1/1';
					var _additionalParams = {
						'pid' : product_id
					};

					utils.makeRequest( _url, 'POST', {}, o.handleDeleteItemResponse, o.handleError, '', _additionalParams );
				} else if( $( ".order-summary-row" ).length == 1 ) {
					// this is a hack. Have to come up with a better solution.
					utils.pushToDataLayer({
						'event': 'removeFromCart',
						'ecommerce': {
							'remove': {
								'products': [{
									'id': product_id,
								}]
							}
						}
					});

					o.emptyCart();
				} else {
					alert( "Please select an item to delete." );
				}
			},
			handleDeleteItemResponse : function( data, _params ) {
				utils.pushToDataLayer({
					'event': 'removeFromCart',
					'ecommerce': {
						'remove': {
							'products': [{
								'id': _params.product_id,
							}]
						}
					}
				});

				o.handleCartBehaviour( data, _params.product_id );
			},
			handleCartBehaviour : function( data, product_id, type ) {
				if( typeof data.data.status != "undefined" && data.data.status == "success" ) {
                    var extra_discount = 0;
                    var additional_discount = 0;
                    var shipping_charge = 0;
                    var growtree_amount = 0;
                    var coupon = data.data.coupon;
                    var total_tax = 0;
                    var total_discount = 0;
                    var exchange_discount = 0;

                    if(typeof data.data.online_shipping_charges != "undefined" && $("#shipping_handling").length > 0) {
						$("#shipping_handling").attr("data-shipping-handling-amount",data.data.online_shipping_charges);
						if(data.data.online_shipping_charges == 0 ) {
							if ($("#shipping_handling .price-dtl .txt-red").length == 0) {
								$('<span class="txt-red">(Free)</span>').insertAfter("#shipping_handling .price-dtl");
							}
							$("#shipping_handling .price-nmbr").html("Rs. "+data.data.online_shipping_charges);
						} else {
							$("#shipping_handling .price-dtl .txt-red").remove();
							$("#shipping_handling .price-nmbr").html("Rs. "+data.data.online_shipping_charges);
						}
                    }

                    if(typeof coupon.success != "undefined" && coupon.success == true && $("#additional_discount").length > 0) {
						o.updateRowDiscount(coupon.items_discount);

						$("#additional_discount").attr("data-additional-discount-amount",parseInt(coupon.discount_amount)).find(".price-nmbr").html("-Rs. "+utils.addSeparatorsNF(Math.ceil(parseInt(coupon.discount_amount)),'.','.',','));
						$("#coupon-msgs").html(coupon.message);

						var tax = data.data.coupon.tax_info;
						total_tax = parseInt(tax.total_tax);

						$("#taxes").attr("data-total-tax",parseInt(tax.total_tax)).find(".price-nmbr").html("Rs. "+utils.addSeparatorsNF(Math.ceil(parseInt(tax.total_tax)),'.','.',','));
						if (total_tax == 0) {
							$("#taxes").slideUp();
						}
                    } else {
						//slide up offerprice and coupon discount if coupon can not be applied
						$("#coupon_code").val("").removeAttr("readonly");
						$("#coupon-msgs").slideUp(500);
						$("#additional_discount").attr("data-additional-discount-amount","0");
						$("#taxes").attr("data-total-tax","0");
						$("#offer_price").attr("data-offer-price","0");
						$("#additional_discount,#taxes,#offer_price").slideUp(500);
                    }

                    o.applyFurnitureExchangeDiscount(data.data.furniture_exchange); // modify furniture exchange point

                    if($("#extra_discount").length > 0) {
						extra_discount = parseInt($("#extra_discount").attr("data-extra-discount-amount"));
						total_discount += extra_discount;
                    }

					if($("#additional_discount").length > 0) {
						additional_discount = parseInt($("#additional_discount").attr("data-additional-discount-amount"));
						total_discount += additional_discount;
                    }

                    if($("#shipping_handling").length > 0) {
						shipping_charge = parseInt($("#shipping_handling").attr("data-shipping-handling-amount"));
						o.handleShippingChargesMsg(shipping_charge);
                    }

					if($("#growtree_contribution").length > 0) {
						growtree_amount = parseInt($("#growtree_contribution").attr("data-growtree-amount"));
                    }

                    if($(".fe_exchange").length > 0) {
						/* Furniture Exchange Start */
						var strChosen = $('input[name="fe_exchange"]:checked').attr('id');
						if (typeof strChosen != "undefined" && strChosen == "fe_points") {
							exchange_discount = parseInt($("#fe_discount").attr("fe-discount-amount"));
						}
                        /* Furniture Exchange End */
                    }

                    $("#cartitem_"+product_id).slideUp("300",function() {
                        $(this).remove();

                        //Enable proceed button if no soldout items are there in the cart
                        var proceed_btn = $('#cartitem .btn_green');
                        if($('.order_row_ofs').length == 0 && proceed_btn.hasClass('btn_disable')){
                            proceed_btn.removeClass('btn_disable');
                            var proceed_to_addr_rel = $('#cartitem .btn_green').attr('rel');
                            if (typeof proceed_to_addr_rel !== typeof undefined && proceed_to_addr_rel !== false) {
                                proceed_btn.addClass('link_popup');
                                proceed_btn.attr('href',"#");
                            }else{
                                proceed_btn.attr('href',root_url+"/checkout/onepage");
                            }
                        }

                    });

                    if($("#taxes").length > 0) {
						total_tax = parseInt($("#taxes").attr("data-total-tax"));
                    }

                    var cart_total_pay = parseInt(Math.ceil(data.data.cart_total_pay));
                    //adding offer price
                    o.updateOfferPrice(cart_total_pay,total_discount);
                    //ends

                    var total_pay = cart_total_pay + total_tax + growtree_amount + shipping_charge - additional_discount - extra_discount - exchange_discount;
                    $("#item_total").attr("data-total-amount",cart_total_pay).find(".price-nmbr").html("Rs. "+utils.addSeparatorsNF(Math.ceil(cart_total_pay),'.','.',','));

                    $("#total_pay_coupon").html("Rs. " + utils.addSeparatorsNF(Math.ceil(total_pay), '.', '.' , ',' ) );

                    var cart_qty = 0;
                    $(".item_list_input").each(function() {
						cart_qty = cart_qty + parseInt($(this).val());
                    });

                    if($("#shoppingcart").length > 0) {
						$("#shoppingcart span").html(cart_qty);
                    }

                    if($(".noassembly_box").length > 0) {
                        $(".noassembly_box .noassembly_prod[data-item-info='" + product_id + "']").animate({opacity:0,height:0,width:0,borderWidth:0,padding:0, margin:0}, 500,function() {
							$(this).remove();
							if($(".noassembly_box .noassembly_prod").length == 0) {
								$(".noassembly_box").slideUp(500);
								$("a.btn_green").removeClass("btn_disable").attr("onclick","PF.CHECKOUT.addressselect();");
							}
                        });

                        if($(".noassembly_box .noassembly_prod").length == 2) {
							$(".noassembly_box .text_1").html("The following item is not deliverable to your location "+$(".noassembly_box .text_1").data('pincode'));
							$(".noassembly_box .serviceable_actions:first").html("Remove this Item");
                        } else {
							$(".noassembly_box .text_1").html("The following items are not deliverable to your location "+$(".noassembly_box .text_1").data('pincode'));
							$(".noassembly_box .serviceable_actions:first").html("Remove all Items");
                        }
                    }

                    if($("#error_box").length > 0 && $("#error_box").css("display") != 'none') {
                        $("#error_box .noassembly_prod[data-item-info='" + product_id + "']").animate({opacity:0,height:0,width:0,borderWidth:0,padding:0, margin:0}, 500,function(){
							$(this).remove();

							if($("#error_box .noassembly_prod").length == 0) {
								$(".noassembly_box").slideUp(500);
								$("input.btn_disable").removeClass("btn_disable").attr("onclick","PF.CHECKOUT.addressselect();");
							}
                        });
                    } else if($("a.btn_disable").length > 0 && $("#cart_form").find('.order_row_ofs').length == 0) {
                        $("a.btn_disable").removeClass("btn_disable").attr("href",root_url+"/checkout/onepage/");
                    }

                    if( typeof type != 'undefined' && type == 1 ) {
						$( '.noassembly_box' ).slideUp( 1000 );
                    }

                    var cod_exists = true;
                    $( '.order_row' ).each(function() {
                        if( $( this ).attr( 'id' ) != 'cartitem_' + product_id ) {
                            var cod = parseInt( $( this ).attr( 'data-cod' ) );
                            if( cod == 0 ) {
                                cod_exists = false;
                                return false;
                            }
                        }
                    });

                    if(cod_exists == false) {
						$( '.free_shipping_order_summary .saving_subtitle' ).hide();
                    } else {
						$( '.free_shipping_order_summary .saving_subtitle' ).show();
						$( '#cod_charge' ).html( Math.ceil( data.data.cod_shipping_charges ) );
                    }

                    //if cart contain free gift only
                    if(data.data.cart_total_pay == 0) {
						o.emptyCart();
                    }
				}
			},
			handleShippingChargesMsg : function( shipping_charges ) {
				$( '#free_shipping_msg' ).slideUp( 'slow', function() {
					$( '#shipping_charges_msg' ).slideDown( 'slow' );
					if( $( '#top_shipping_msg' ).length > 0 ) {
						if( shipping_charges != 0 ) {
							$( '#top_shipping_msg' ).show();
						} else {
							$( '#top_shipping_msg' ).hide();
						}
					}
				});
			},
			updateOfferPrice : function( item_total, discount ) {
				var offer_price = parseInt( item_total - discount );

				$( '#offer_price' ).attr( 'data-offer-price', offer_price );

				offer_price = utils.addSeparatorsNF( offer_price, '.', '.', ',' );
				$( '#offer_price .price-nmbr' ).html( '<strong>Rs. ' + offer_price + '<strong>' );
			},
			removeNonServiceableItem : function() {
				if( $( ".order_row" ).length == o.non_serviceable_items.length ) {
					o.non_serviceable_items.length = 0;
					o.emptyCart();
				} else {
					var _url = root_url + '/cart/removeNonServiceableItem';
					var _params = {
						'product_data' : o.non_serviceable_items
					};

					var _data = {
						'product_data' : o.non_serviceable_items
					};

					utils.makeRequest( _url, 'POST', _data, o.removeNonServiceableItemsResponse, o.handleError, '', _params );
				}

				$( 'a.btn_green' ).removeClass( 'btn_disable' ).attr( 'onclick', 'PF.CHECKOUT.addressselect();' );
			},
			removeNonServiceableItemsResponse : function( result, _params ) {
				var data = '';

				try {
					data = $.parseJSON( result );
				} catch( _error ) {
					data = result;
				}

				$.each( _params.product_data, function( j, id ) {
					o.handleCartBehaviour( data, id, 1 );
				});

				o.non_serviceable_items.length = 0;
				o.removeServiceableError();
			},
			removeServiceableError : function() {
				$( '#form_serviceablity_error_msg .error_msg_pincode' ).html( '' );
				$( '#form_serviceablity_error_msg' ).slideUp();

				$( '#form_serviceablity_error_product_msg .prod' ).remove();
				$( '#form_serviceablity_error_product_msg' ).slideUp();

				$( '#serviceablity_error_msg .error_msg_pincode' ).html( '' );
				$( '#serviceablity_error_msg' ).slideUp();

				$( '#serviceablity_error_product_msg .prod' ).remove();
				$( '#serviceablity_error_product_msg' ).slideUp();
			},
			totalPay : function() {
				/**
				 * @description calculate total pay price and update the price html
				 * @return int totalPay total cart amount
				 */
				var item_total = 0;
				var total_pay = 0;
				var extra_discount = 0;
				var additional_discount = 0;
				var shipping_charge = 0;
				var growtree_amount = 0;
				var total_tax = 0;
				var exchange_discount = 0;

				if( $( '#item_total' ).length > 0 ) {
					item_total = parseInt( $( '#item_total' ).attr( 'data-total-amount' ) );
				}

				/* Furniture Exchange Start */
				if( $( '.fe_exchange' ).length > 0 && $( '.fe_exchange' ).css( 'display' ) != 'none' ) {
					var strChosen = $( 'input[name="fe_exchange"]:checked' ).attr( 'id' );

					if( strChosen == 'fe_points' ) {
						exchange_discount = parseInt( $( '#fe_discount' ).attr( 'fe-discount-amount' ) );
					}
				}
				/* Furniture Exchange End */

				if( $( '#extra_discount' ).length > 0 ) {
					extra_discount = parseInt( $( '#extra_discount' ).attr( 'data-extra-discount-amount' ) );
				}

				if( $( '#additional_discount' ).length > 0 ) {
					additional_discount = parseInt( $( '#additional_discount' ).attr( 'data-additional-discount-amount' ) );
				}

				if( $( '#shipping_handling' ).length > 0 ) {
					shipping_charge = parseInt( $( '#shipping_handling' ).attr( 'data-shipping-handling-amount' ) );
				}

				if( $( '#growtree_contribution' ).length > 0 ) {
					growtree_amount = parseInt( $( '#growtree_contribution' ).attr( 'data-growtree-amount' ) );
				}

				if( $( '#taxes' ).length > 0 ) {
					total_tax = parseInt( $( '#taxes' ).attr( 'data-total-tax' ) );
				}

				total_pay = item_total + total_tax + shipping_charge + growtree_amount - extra_discount - additional_discount - exchange_discount;

				total_pay = utils.addSeparatorsNF( Math.ceil( total_pay ), '.', '.', ',' );

				$( '#total_pay_coupon' ).html( 'Rs. ' + total_pay );

				var _return = {
					'total_pay' : total_pay,
					'exchange_discount' : exchange_discount,
					'item_total' : item_total
				};

				return _return;
			},
			emptyCart : function( event ) {
				/**
				 * Delete all items from cart
				 */
				if( typeof event != 'undefined' ) {
					if( event.preventDefault ) {
						event.preventDefault();
					} else {
						event.returnValue = false;
					}
				}

				var _url = root_url + '/cart/emptycart/2';
				utils.makeRequest( _url, 'POST', {}, o.handleEmptyCartResponse, o.handleError );
			},
			handleEmptyCartResponse : function( data ) {
				/**
				 * Handle the empty cart server call response
				 */
				data = $.parseJSON( data );
				if( typeof data.data.status != 'undefined' && data.data.status == 'success' ) {
					//Remove furniture exchange cookie
					utils.eraseCookie( 'furnitureExchange' );

					if( utils.l.pathname != '/cart' ) {
						utils.l.href = root_url + '/checkout/cart';
					}
				}
			},
			updateCartQty : function() {
				/**
				 * Update the quantity of product in the cart
				 */
				var data = $( '#cart_form' ).serialize();

				var _url = root_url + '/cart/updatecart/1';
				utils.makeRequest( _url, 'POST', data, o.handleUpdateCartQtyResposne, o.handleError );
			},
			handleUpdateCartQtyResposne : function( result ) {
				var data = '';
				try {
					data = $.parseJSON( result );
				} catch( _error ) {
					data = result;
				}

				if( typeof data.data.success !== 'undefined' && data.data.success === true ) {
					var cart = JSON.parse( data.data.cart );
					var coupon = data.data.coupon;

					var item_total = 0;
					var total_pay = 0;
					var extra_discount = 0;
					var additional_discount = 0;
					var shipping_charge = 0;
					var growtree_amount = 0;
					var total_tax = 0;
					var exchange_discount = 0;
					var total_discount = 0;
					var cart_qty = 0;

					o.applyFurnitureExchangeDiscount( data.data.furniture_exchange );

					var _couponStatus = coupon.success;

					if( typeof _couponStatus !== 'undefined' && _couponStatus === true && $( '#additional_discount' ).length > 0 ) {
						var _discAmt = parseInt( coupon.discount_amount );

						$( '#additional_discount' ).attr( 'data-additional-discount-amount', _discAmt ).find( '.price-nmbr' ).html( '-Rs. ' + utils.addSeparatorsNF( Math.ceil( _discAmt ), '.', '.', ',' ) );

						$( '#coupon-msgs' ).html( coupon.message );

						var tax = data.data.coupon.tax_info;
						var totalTax = parseInt( tax.total_tax );

						$( '#taxes' ).attr( 'data-total-tax', totalTax ).find( '.price-nmbr' ).html( 'Rs. ' + utils.addSeparatorsNF( Math.ceil( totalTax ), '.', '.', ',' ) );
					}

					if(  typeof data.data.online_shipping_charges != 'undefined' && $( '#shipping_handling' ).length > 0 ) {
						$( '#shipping_handling' ).attr( 'data-shipping-handling-amount', data.data.online_shipping_charges );

						if( data.data.online_shipping_charges == 0 ) {
							if( $( '#shipping_handling .price-dtl .txt-red' ).length == 0 ) {
								$( '<span class="txt-red">(Free)</span>' ).appendTo( '#shipping_handling .price-dtl' );
							}
						} else {
							$( '#shipping_handling .price-dtl .txt-red' ).remove();
						}

						$( '#shipping_handling .price-nmbr' ).html( 'Rs. ' + data.data.online_shipping_charges );
					}

					/* Furniture Exchange Start */
					if( $( '.fe_exchange' ).length > 0 && typeof data.data.furniture_exchange != 'undefined' && data.data.furniture_exchange != null ) {
						var strChosen = $( 'input[name="fe_exchange"]:checked' ).attr( 'id' );
						if( strChosen == 'fe_points' ) {
						   exchange_discount = parseInt( $( '#fe_discount' ).attr( 'fe-discount-amount' ) );
						   total_discount += exchange_discount;
						}
					}
					/* Furniture Exchange End */

					if( $( '#extra_discount' ).length > 0 ) {
						extra_discount = parseInt( $( '#extra_discount' ).attr( 'data-extra-discount-amount' ) );
						total_discount += extra_discount;
					}

					if( $( '#additional_discount' ).length > 0 ) {
						additional_discount = parseInt( $( '#additional_discount' ).attr( 'data-additional-discount-amount' ) );
						total_discount += additional_discount;
					}

					if( $( '#shipping_handling' ).length > 0 ) {
						shipping_charge = parseInt( $( '#shipping_handling' ).attr( 'data-shipping-handling-amount' ) );
						o.handleShippingChargesMsg( shipping_charge );
					}

					if( $( '#growtree_contribution' ).length > 0 ) {
						growtree_amount = parseInt( $( '#growtree_contribution' ).attr( 'data-growtree-amount' ) );
					}

					if( $( '#taxes' ).length > 0 ) {
						total_tax = parseInt( $( '#taxes' ).attr( 'data-total-tax' ) );
					}

					$.each( cart, function( j, val ) {
						if( $( '#cartitem_' + j ).length > 0 ) {
							var unit_price = parseInt( val.price );
							if( unit_price === undefined ) {
								unit_price = 0;
							}

							var total_price = unit_price * parseInt( val.quantity );
							cart_qty += parseInt( val.quantity );
							item_total += total_price;

							$( '#cartitem_' + j ).find( '.final_pricing' ).html( 'Rs. ' + utils.addSeparatorsNF( Math.ceil( total_price ), '.', '.', ',' ) );
						}
					});

					if( typeof _couponStatus != 'undefined' ) {
						o.updateRowDiscount( coupon.items_discount );
					}

					//for updating offer price
					if( total_discount > 0 ) {
						o.updateOfferPrice( item_total, total_discount );
					}
					//ends

					total_pay = item_total + total_tax - total_discount + shipping_charge;

					// set cart qty in header notification
					if( $( '.header_tab.cart .count_alert' ).length > 0 ) {
						$( '.header_tab.cart .count_alert' ).html( cart_qty );
					}

					if( $( '#item_total' ).length > 0 ) {
						$( '#item_total' ).attr( 'data-total-amount', item_total ).find( '.price-nmbr' ).html( 'Rs. ' + utils.addSeparatorsNF( Math.ceil( item_total ), '.', '.', ',' ) );
						$( '#total_pay_coupon' ).html( 'Rs. ' + utils.addSeparatorsNF( Math.ceil( total_pay + growtree_amount ), '.', '.', ',' ) );
						$( '#total_pay_amount' ).val( total_pay );
					}

					if( $( '#payment_form' ).length > 0 ) {
						$( '#payment_form' ).find( '.final-pricing-checkout .txt-red' ).html( 'Rs. ' + utils.addSeparatorsNF( Math.ceil( total_pay + growtree_amount ), '.', '.', ',' ) );
					}
				} else if( typeof data.data.success != 'undefined' && data.data.success == false ) {
					var cart = JSON.parse( data.data.cart );

					$.each( cart, function( j, val ) {
						if( $( '#cartitem_' + j ).length > 0 ) {
							var unit_price = parseInt( val.price );
							var total_price = unit_price * parseInt( val.quantity );

							$( '#cartitem_' + j ).find( 'input' ).val( parseInt( val.quantity ) );
							$( '#cartitem_' + j ).find( '.final_pricing' ).html( 'Rs. ' + utils.addSeparatorsNF( Math.ceil( total_price ), '.', '.', ',' ) );
						}
					});
				}
			},
			resetBankSelection : function() {
				/**
				 * Reset all bank selection dropdowns on change of payment options
				 */
				$( '#ckPaymentMethodContainer select option:eq(0)' ).attr( 'selected', 'selected' );
				$( '#ckPaymentMethodContainer select').each( function() {
					var defaultSelected = $( this ).find( 'option:first' ).val();
					var elID = $( this ).attr( 'id' );

					if( typeof elID != 'undefined' ) {
						$( '#s2id_' + elID ).select2( 'val', defaultSelected );
					}
				});
			},
			setPaymentType : function( paymentType ) {
				o.resetBankSelection();

				$( '#payment_form' )[ 0 ].reset();
				$( '#payment_option_selected' ).val( '' );
				$( '.btn_green_big' ).removeClass( 'btn_disable' ).attr( 'onclick', 'javascript:PF.CHECKOUT.saveOrder();' );

				/* handle part pay effects when payment method get's changed*/
				$( '#payment_options_area' ).html( '' ).hide();
				$( '#view_partpay_details, #paymenttype_select' ).hide();
				$( '#view_partpay_details, #partpay_payment-selection' ).hide();
				$( '#part_payment_breakupdetails' ).show();
				$( '#part_pay' ).val( 0 );

				$( '.emi_tables_wrap' ).css( 'display', 'none' );
				$( '.emi_options_table' ).css( 'display', 'none' );

				$( '#no_bank' ).css( 'display', 'block' );
				$( '#emi_note' ).css( 'display', 'none' );

				$( '#payment_method' ).val( paymentType );
				$('#show_checkout_error').slideUp( 250, 'linear' );
				$( '#payment_form .payment_tab_header_list ul li a[class=red_border]' ).removeClass( 'red_border' );
				var rel = $( '#payment_form .payment_tab_header_list ul li a[class=active]' ).attr( 'rel' );

				$( ' #bank_select_visa' ).hide();
				$( ' #bank_select_master' ).hide();
				$( ' #bank_select_maestro' ).hide();
				$( " #credit_bank_select").hide();
				// select2 plugin
				$( ' #s2id_bank_select_visa' ).hide();
				$( ' #s2id_bank_select_master' ).hide();
				$( ' #s2id_bank_select_maestro' ).hide();
				$( ' #s2id_credit_bank_select' ).hide();

				$( '#emi_bank_name' ).html( '' );
				$( '.emi-bank-container' ).hide();

				//Resetting extra CBC amount
				$( '#cbc_added_amount' ).attr( 'data-cbc-amount', 0 );

				//added for grow trees//
				if( paymentType == 'COD' ) {
					if( $( '#growTree' ).prop( 'checked' ) ) {
						o.handleGrowTree();
						$( '#growTree' ).attr( 'checked', false );
						//$( '#growTree' ).trigger( 'click' );
					}

					$( '#growTree' ).attr( 'disabled', 'disabled' ).val( '' );
					$( 'input[name="payment_donation"]' ).val( '' );
					$( '#cod_note' ).css( 'display', 'block' );
					$( '.checkout-charity' ).hide();
					$( '#cod_note' ).show();

					utils.eraseCookie( 'donate' );
				} else {
					var is_disabled = $( '#growTree' ).is( ':disabled' );

					$( '.checkout-charity' ).show();
					$( '#cod_note' ).hide();

					if( is_disabled == true ) {
						$( '#growTree' ).removeAttr( 'disabled' );
						$( '#cod_note' ).css( 'display', 'none' );
					}
				}

				if( paymentType == 'WALLET' ) {
					o.handleWalletError();
				} else if( paymentType == 'PART_PAY' ) {
					o.handlePartPay( 'unchecked' );
				}

				if( paymentType == 'EMI' ) {
					$( ' #s2id_emi_bank_select' ).show();
				} else if( paymentType == 'NET_BANKING' ) {
					$( ' #s2id_bank_select' ).show();
				}

				/* CBC related code starts */
				if( paymentType == 'CBC' ) {
					$( '#cbc_option1, #cbc_option2' ).parent().removeClass( 'active' );
					// yogita's changes
					$( '#cbc_collect_cash, #cbc_deposit_cash, #cbc_amt_radio, .cbc_charges, .cbc_radio_block .bank_select_wrap' ).hide();
					$( '#cbc_default_option' ).show();
				}

				//To hide cbc charges displayed below Payable Amount whn any non-cbc option is selected
				$( '.cbc_charges' ).hide();
				/* CBC related code ends*/
				if( paymentType != 'PART_PAY' ) {
					var total_pay = parseInt( $( '#growtree_pay_amount' ).val() );
					$( '#payment_form' ).find( '.final-pricing-checkout .txt-red' ).html( 'Rs. ' + utils.addSeparatorsNF( Math.ceil( total_pay ), '.', '.', ',' ) );
				}
				//end for grow trees//
			},
			handleGrowTree : function( status ) {
				var total_pay = 0;
				var extra_discount = 0;
				var additional_discount = 0;
				var shipping_charge = 0;
				var item_count = 0;
				var growtree_deduction = true;
				var total_tax = 0;
				var exchange_discount = 0;

				if( $( '#extra_discount' ).length > 0 ) {
					extra_discount = parseInt( $( '#extra_discount' ).attr( 'data-extra-discount-amount' ) );
				}

				if( $( '#additional_discount' ).length > 0 ) {
					additional_discount = parseInt( $( '#additional_discount' ).attr( 'data-additional-discount-amount' ) );
				}

				if( $( '#shipping_handling' ).length > 0 ) {
					shipping_charge = parseInt( $( '#shipping_handling' ).attr( 'data-shipping-handling-amount' ) );
				}

				if( $( '#item_total' ).length > 0 ) {
					item_count = parseInt( $( '#item_total' ).attr( 'data-total-amount' ) );
					growtree_deduction = false;
				}

				if( $( '#taxes' ).length > 0 ) {
					total_tax = parseInt( $( '#taxes' ).attr( 'data-total-tax' ) );
				}

				//For furniture exchange
				if( $( '#fe_discount' ).length > 0 ) {
					var strChosen = $( 'input[name="fe_exchange"]:checked' ).attr( 'id' );
					if ( strChosen == 'fe_points' ) {
						exchange_discount = parseInt( $( '#fe_discount' ).attr( 'fe-discount-amount' ) );
					}
				}

				if( item_count == 0 ) {
					total_pay = $( '#growtree_pay_amount' ).val();
					total_pay = parseInt( total_pay );
				}

				if( typeof status != 'undefined' && status == 'checked' ) {
					/*IF GROW TREE OPTION SELECTED THEN ADD GROW TREE CHARGERS TO TOTAL PAY AND SHOW TO USER*/
					total_pay = total_pay + donation + item_count + shipping_charge + total_tax - extra_discount - additional_discount - exchange_discount;

					var date = new Date();
					date.setTime( date.getTime() + ( 10 * 60 * 1000 ) );

					/**
					 * IE8 Issue
					 * changed val() to attr() to set the value
					 */
					var growTreePay = Math.ceil( total_pay );
					$( '#growtree_pay_amount' ).attr( 'value', growTreePay );

					/*CREATE THE COOKIE TO TRACK GROW TREE ON REFRESH */
					//assign expire of cookie to 10 minute
					var donate = "donate";
					var expires = date.toGMTString();
					document.cookie = donate+"="+"1; expires="+expires+"; path=/";

					$( '#growtree_contribution' ).slideDown( 200 );
					$( '#growtree_contribution' ).attr( 'data-growtree-amount', donation );
					$( '#grow_tree' ).attr( 'checked', 'checked' );

					if($( '#growTree' ).length > 0 ) {
						$( '#payment_donation' ).val( 'on' );
					}
				} else {
					total_pay = total_pay + item_count + shipping_charge + total_tax - extra_discount - additional_discount - exchange_discount;

					/*IF GROW TREE OPTION DE SELECTED THEN HIDE THE GROW TREE RUPEE MESSAGE AND DELETE THE COOKIE DONATE*/
					if( growtree_deduction ) {
						total_pay -= donation;
					}

					/**
					 * IE8 Issue
					 * changed val() to attr() to set the value
					 */
					var growTreePay = Math.ceil( total_pay );
					$( '#growtree_pay_amount' ).attr( 'value', growTreePay );

					$( '#growtree_contribution' ).slideUp( 200 );
					$( '#growtree_contribution' ).attr( 'data-growtree-amount","0' );
					$( '#growTree' ).removeAttr( 'checked' );

					if($( '#growTree' ).length > 0 ) {
						$( '#payment_donation' ).val( '' );
					}

					utils.eraseCookie( 'donate' );
				}

				/*Part Payment Code Starts*/
				if( $( '.part_payment_panel' ).is( ':visible' ) ) {
					if( $( '#partPayAgreement' ).is( ':checked' ) ) {
					   var part_remaining_amount = parseInt( $( '#net_part_payment_remaining' ).attr( 'data-net_part_payment_remaining' ) );

					   if( !isNaN( part_remaining_amount ) ) {
							total_pay -= part_remaining_amount;
							var convenience_fee = parseInt( $( '#convenience_fee' ).attr( 'data-convenience_fee' ) );

							if( !isNaN( convenience_fee ) ) {
								total_pay += convenience_fee;
							}
						}
					}
				}
				/*Part Payment Code Ends*/

				var _price = utils.addSeparatorsNF( Math.ceil( total_pay ), '.', '.', ',' );

				if( $('#ckPaymentMethodNav').length ) {
					// final page
					$( '#total_pay_coupon1' ).html( 'Rs. ' + _price );
				} else {
					$( '#total_pay_coupon' ).html( 'Rs. ' + _price );
				}

				if( $( '#payment_form' ).length > 0 ) {
					$( '#payment_form' ).find( '.final_amt_payble .red' ).html( 'Rs. ' + _price );
				}
			},
			handleWalletError : function() {
				if( $( '#payment_method' ).length > 0 ) {
					var totalPay        = parseInt( $( '#growtree_pay_amount' ).val());
					var paymentMethod   = $( '#payment_method' ).val().toLowerCase();

					if( totalPay > parseInt( wallet_price_check ) ) {
						$( '.wallet_err' ).show();
						$( '#checkoutWalletContainer' ).find( 'label' ).addClass( 'btn_disabled' );

						$( '#checkoutWalletContainer' ).find("input[type='radio']").each(function(){
							$( this ).prop( "disabled", true );
						});

						if( paymentMethod == 'wallet' ) {
							$( '#payment_form' )[ 0 ].reset();
							$( '#payment_form .payment_tab_container .active' ).removeClass( 'active' );
							$( '#payment_option_selected' ).val( '' );
							$( '.btn_green_big' ).addClass( 'btn_disable' ).removeAttr( 'onclick' );
						}
					} else {
						$( '.wallet_err' ).hide();
						$( '#checkoutWalletContainer' ).find( 'label' ).removeClass( 'btn_disabled' );
						if( paymentMethod == 'wallet' ) {
							$( '#checkoutWalletContainer' ).find( 'input[type="radio"]' ).each(function(){
								$( this ).prop( 'disabled', false );
							});

							$( '.btn_green_big' ).removeClass( 'btn_disable' ).attr( 'onclick', 'PF.CHECKOUT.saveOrder();' );
						}
					}
				}
			},
			handlePartPay : function( $change, $remainingAmt, $payAmt ) {
				if($change == "checked") {
					$("#part_payment_breakupdetails").slideUp("slow", function(){
						$("#view_partpay_details").slideDown("slow");
						$("#partpay_payment-selection").slideDown("slow");
					});

					$("#part_pay").val(1);
					$(".btn_green").removeClass("btn_disabled").attr("onclick","PF.CHECKOUT.saveOrder();");
                                        $("#s2id_partPayDropDownOption").show();
				} else {
					$("#payment_option_selected").val("");
					$('#payment_method').val("PART_PAY");
					$("#paymenttype_select").next(".custom-combobox").find("input").val("");
					$(".btn_green").addClass("btn_disabled").removeAttr("onclick");

					$("#view_partpay_details,#partpay_payment-selection").slideUp("slow", function(){
						$("#payment_options_area").slideUp("slow",function(){
							$("#payment_options_area").html("");
							$("#part_payment_breakupdetails").slideDown("slow");
						});
					});
                                        var netpayable = parseInt($(".checkout-partpay-amount").attr("data-netpayable"));
                                        $(".final-pricing-checkout .txt-red").html("Rs. "+utils.addSeparatorsNF( netpayable, '.', '.', ',' ));
					$("#part_pay").val(0);
                                        $("#s2id_partPayDropDownOption").hide();
				}
			},
			checkCBCrange : function( total_pay ) {
				/**
				 * This function takes total Payable amount as an input and checks if the amount is within specified CBC range.
				 * If not, then shows error
				 */
				var payment_method = $( '#payment_method' ).val();
				var payment_id = $( '#payment_option_selected' ).val();

				var cbc_data = $.parseJSON( cbc_agent_data );

				$.each( cbc_data, function( index, value ) {
					$.each( value, function( index1, value1 ) {
						if( parseInt( index1 ) == parseInt( payment_id ) ) {
							var min = parseInt( value1[ 'min' ] );
							var max = parseInt( value1[ 'max' ] );

							//Below if block handles CBC case: if cart price is greater than max value for the selected CBC agent including grow tree amt thn error should be shown otherwise proceed with the normal flow.
							if( ( total_pay < min ) || ( total_pay >= max ) ) {
								var min_cbc = utils.addSeparatorsNF( min, '.', '.', ',' );
								var max_cbc = utils.addSeparatorsNF( ( max - 1 ), '.', '.', ',' );

								var error_msg = 'To use Cash Pay option your payable amount should be in the range ' + min_cbc + ' to ' + max_cbc;

								$( '#show_checkout_error' ).text( error_msg ).slideDown( 250, 'linear', function() {
									$( 'html, body' ).animate({scrollTop: $( this ).offset().top - 160}, 500 );
								});
							} else {
								/*Code to remove error msg from checkout page and submit the form */
								$( '#show_checkout_error' ).slideUp( 250, 'linear' );
								$( '#payment_form .payment_tab_header_list ul li a[class=red_border]' ).removeClass( 'red_border' );
							}
						}
					});
				});
			},
			showBanksList : function( cardType ) {
				/**
				 * Show bank drop down for debit card
				 */
				var preId = '';
				var isPartPay = $( "#checkoutPartPayContainer" ).css( "display" );
				if( ( isPartPay != 'none' ) && ( typeof isPartPay != 'undefined' ) ) {
				   // preId = '#checkoutPartPayContainer';
				   preId = 'partpay_';
				}

				$(  ' #' + preId + 'payment_option_selected' ).val( '0' );
				$(  ' #' + preId + 'bank_select_visa' ).hide();
				$(  ' #' + preId + 'bank_select_master' ).hide();
				$(  ' #' + preId + 'bank_select_maestro' ).hide();
				$(  " #" + preId + "credit_bank_select").hide();
				// select2 plugin
				$( ' #s2id_' + preId + 'bank_select_visa' ).hide();
				$( ' #s2id_' + preId + 'bank_select_master' ).hide();
				$( ' #s2id_' + preId + 'bank_select_maestro' ).hide();
				$( ' #s2id_' + preId + 'credit_bank_select' ).hide();

				if ( cardType == 'visa' ) {
					$( ' #s2id_' + preId + 'bank_select_visa' ).show();
					$( ' #' + preId + 'bank_select_visa' ).show();
				} else if ( cardType == 'master' ) {
					$( ' #s2id_' + preId + 'bank_select_master' ).show();
					$(  ' #' + preId + 'bank_select_master' ).show();
				} else if ( cardType == 'maestro' ) {
					$( ' #s2id_' + preId + 'bank_select_maestro' ).show();
					$( ' #' + preId + 'bank_select_maestro' ).show();
				} else if( cardType == 'american' ) {
					$( ' #s2id_' + preId + 'credit_bank_select' ).show();
					$( ' #' + preId + 'credit_bank_select' ).show();
				}

				return false;
			},
			saveOrder : function() {
				var payment_method = $( '#payment_method' ).val();
				var payment_id = $( '#payment_option_selected' ).val();

				if( payment_id == 0 ) {
					var error_msg = '';

					switch( payment_method ) {
						case 'DEBIT_CARD':
							error_msg = 'Please choose a Debit Card first';
							break;
						case 'CREDIT_CARD':
							error_msg = 'Please choose a Credit Card first';
							break;
						case 'EMI':
							error_msg = 'Please select an EMI option from the drop-down';

							if( typeof $( '#emi_bu' ).val() == 'undefined' ) {
								error_msg = $( '#non_emi_note' ).html();
							}
							break;
						case 'NET_BANKING':
							error_msg = 'Please choose a bank first';
							break;
						case 'PAYPAL':
							error_msg = 'Please select PayPal option first';
							break;
						case 'COD':
							error_msg = 'Please select the Cash on Delivery option first';
							break;
						case 'WALLET':
							error_msg = 'Please choose a Wallet first';
							break;
						case 'PAYUMONEY':
							error_msg = 'Please select the PayUMoney option first';
							break;
						case 'PREPAID_CARD':
							error_msg = 'Please select prepaid card option first';
							break;
						case 'INTERNATIONAL_PAYMENT':
							error_msg = 'Please select your card type first';
							break;
						case 'PART_PAY':
							error_msg = 'Please select Proper payment option from Part Pay';
							break;
						case 'CBC':
							error_msg = 'Please Select a Payment Option for CashPay';
							break;
						default:
							error_msg = 'Please Select Proper Payment Option From ' + payment_method
							break;
					}

					/*Code to show error msg on checkout page */
					$( '#show_checkout_error' ).text( error_msg ).slideDown( 250, 'linear', function() {
						$( 'html, body' ).animate({scrollTop: $(this).offset().top - 160}, 500);
					});

					$( '#payment_form .payment_tab_header_list ul li a[class=active]' ).addClass( 'red_border' );
					var rel = $( '#payment_form .payment_tab_header_list ul li a[class=active]' ).attr( 'rel' );
					$( '#' + rel ).css({'border':'1px solid #ec1e20'});

					return false;
				} else if( payment_method == 'CBC' ) {
					if( $( '#show_checkout_error' ).is( ':visible' ) ) {
						$( '#show_checkout_error' ).slideDown(250,"linear",function(){
							$( 'html, body' ).animate({scrollTop: $(this).offset().top - 160}, 500);
						});
					} else {
						/*Code to remove error msg from checkout page */
						$( '#show_checkout_error').slideUp(250,"linear");
						$( '#payment_form .payment_tab_header_list ul li a[class=red_border]').removeClass('red_border');
						var rel = $('#payment_form .payment_tab_header_list ul li a[class=active]').attr("rel");
						$( '#'+rel).css({'border':'1px solid #d7d7d7'});

						$( '#payment_form' ).submit();
						$( '#pay_secure_btn_top' ).addClass( 'btn_loader' );
					}
				} else {
					/*Code to remove error msg from checkout page */
					$('#show_checkout_error').slideUp(250,"linear");
					$('#payment_form .payment_tab_header_list ul li a[class=red_border]').removeClass('red_border');
					var rel = $('#payment_form .payment_tab_header_list ul li a[class=active]').attr("rel");
					$('#'+rel).css({'border':'1px solid #d7d7d7'});

					$("#payment_form").submit();
					$("#pay_secure_btn_top").addClass("btn_loader");
				}
			},
			setPaymentMethod : function( payment_method_id, payment_method_name ) {
				/**
				 * Set the payment method which is returned by the combo-box
				 * @param {int} payment_method_id Selected bank's id
				 * @param {string} payment_method_name Mode of payment
				 * @returns NULL
				 */
				var paymentMethod     = $( '#payment_method' ).val().toLowerCase();
				var partPaymentSelect = $( '#partPayDropDownOption' ).val();
				var isPartPay = $( "#checkoutPartPayContainer" ).css( "display" );

				if( ( paymentMethod == 'emi' && !isNaN( parseInt( payment_method_id ) ) ) ) {
					// reset the values as the emi tenure needs to be selected
					$( '#payment_option_selected' ).val( '' );
					$( '#payment_' + paymentMethod ).val( '' );

					o.setEMIOptions( payment_method_id, payment_method_name );
				} else if( isNaN( parseInt( payment_method_id ) ) ) {
					o.partPaymentMethodSelect( payment_method_id, payment_method_name, paymentMethod );
				} else if( !isNaN( parseInt( payment_method_id ) ) && ( isPartPay != 'none' ) && ( typeof isPartPay != 'undefined' ) ) {
					if( paymentMethod == 'net_banking' ) {
						$( "#payment_options_area" ).find( ".active" ).removeClass( "active" ).find( "input" ).removeAttr( "checked");
					}

					$( 'input[name="payment_id[' + $( '#payment_method' ).val() + '][]"]' ).val( payment_method_id );
					$( '#payment_option_selected' ).val( payment_method_id );
				} else {
					$( '#payment_option_selected' ).val( payment_method_id );
					$( '#payment_' + paymentMethod ).val( payment_method_id );
				}

				if( paymentMethod == 'cbc' ) {
					var cbc_charge = 0;
					var growtreeVal = 0;

					if( $( "#growTree" ).is( ":checked" ) ) {
						growtreeVal = donation;
					}

					var cbc_charge = cbcObj.charge;
					var value = cbcObj.oid;

					var payable_amount = parseInt( $( '#total_pay_amount' ).val() );
					var cbc_added = payable_amount * cbc_charge/100;

					//Calculating total pay by adding cbc charges and grow tree amount
					var total_pay = payable_amount + Math.ceil( cbc_added ) + growtreeVal;

					//adding extra ampount to be added in this hidden attribute for handling grow tree calculation in case of CBC.
					$( "#cbc_added_amount" ).attr( "data-cbc-amount", Math.ceil( cbc_added ) );

					$( "#payment_form" ).find( ".final_amt_payble .red" ).html( "Rs. " + utils.addSeparatorsNF( Math.ceil( total_pay ), '.', '.', ',' ) );
					o.checkCBCrange( total_pay );
				}

				$( '.payment_option_radio' ).change( function() {
					var value = parseInt( $( this ).val() );
				});

				if( $( '#payment_method' ).length > 0 ) {
					var input_type = $( '#payment_method' ).val().toLowerCase();
					if( input_type === 'net_banking' ) {
						$( '#checkoutInternetContainer' ).find( 'input[type="radio"]:checked' ).prop( 'checked', false ).parent().removeClass('active');
					}
				}
			},
			setEMIOptions : function( bankpos, bankname ) {
			  /**
			   * Consolidating emi-related functionality in one place
			   *
			   * Will show/hide the emi-options for a given bank.
			   *
			   * @param - {int} bankpos Bank's ID
			   * @param - {string} bankname Bank's Name
			   *
			   */
				var preId = "";
				var isPartPay = $( "#checkoutPartPayContainer" ).css( "display" );
				if( ( isPartPay != 'none' ) && ( typeof isPartPay != 'undefined' ) ) {
					preId = "#checkoutPartPayContainer";
				}

				if( bankpos > 0 ) {
					$( preId + ' #emi_note' ).hide();
					$( preId + ' #no_bank' ).show();

					// clear the selected emi value
					$( '.emi_dtl-table.emi-bank-container .emi-table:visible input[type="radio"]:checked' ).prop( 'checked', false );
					$( '.emi_dtl-table.emi-bank-container .emi-table' ).hide();

					$( preId + ' #emi_bank_name' ).html( bankname );
					$( preId +' #emi_table_' + bankpos ).find( '.emi-tr' ).each(function(){
						o.showEMIValues( parseInt( $( this ).attr( 'id' ) ) );
					});

					$( '.emi_dtl-table.emi-bank-container' ).show();
					$( '.emi_dtl-table.emi-bank-container #emi_table_' + bankpos ).show();
				} else {
					$(preId +' #emi_note' ).hide();
					$(preId +' #no_bank' ).show();
					$('#payment_form' )[ 0 ].reset();
					//added to fixed emi issue regarding choose your bank option
					$('#payment_option_selected' ).val( '' );
					$('.ck-nav-container' ).find( '.active' ).removeClass( 'active' );
					$('#payment_form' )[ 0 ].reset();
				}

				if( bankpos > 0 ) {
					$( '.emi_options_text span' ).text( bankname );
					$( '.emi_tables_wrap' ).show( 100 );
					$( '#checkoutEmiContainer .bank_select_wrap' ).addClass( 'active' );
					$( '.emi_options_table' ).hide();
					$(preId +' #emi_table_' + bankpos ).fadeIn( 200 );
				} else {
					$( '#checkoutEmiContainer .bank_select_wrap' ).removeClass( 'active' );
					$( '.emi_options_table' ).hide();
					$( '.emi_tables_wrap' ).fadeOut( 100 );
				}
			},
			showEMIValues : function( id ) {
				/**
				 * Calculate EMI break down and append to respective html
				 */
				var preId    = "";
				var totalAMt = $( '#total_pay_amount' ).val();

				var isPartPay = $( "#checkoutPartPayContainer" ).css( "display" );
				if( ( isPartPay != 'none' ) && ( typeof isPartPay != 'undefined' ) ) {
					preId    = "#checkoutPartPayContainer";
					totalAMt = o.getTotalPartPayAmt();
				}

				var emi_breakup_values = $(preId +' #emi_bu').val();
				var emi_breakup = {};

				if( typeof emi_breakup_values != 'undefined' ) {
					emi_breakup = $.parseJSON( emi_breakup_values );
				}

				if( typeof id != 'undefined' && id > 0 && emi_breakup.hasOwnProperty( id ) ) {
                    var rate = emi_breakup[ id ].rate;
                    var bu = emi_breakup[ id ].bu;

                    if(totalAMt > 0 && rate > 0 && bu > 0) {
						var payment = o.PMT(rate/1200,bu,- totalAMt).toFixed(2);

						if( payment > 0 ) {
							var TOTAL=(payment * bu).toFixed(2);
							var INTEREST = (TOTAL - totalAMt).toFixed(2);
							$(preId +' #'+id+' label').text(bu + ' Months');
							$(preId +' #'+id+' .rate').text(rate + '%');

							$(preId +' #'+id+' .interest').text('Rs.'+utils.addSeparatorsNF(Math.round(INTEREST),'.','.',','));
							$(preId +' #'+id+' .installment').text('Rs.'+utils.addSeparatorsNF(Math.round(payment),'.','.',','));
						}
                    }
				}
			},
			PMT : function( i, n, p ) {
				return i * p * Math.pow((1 + i), n) / (1 - Math.pow((1 + i), n));
			},
			getTotalPartPayAmt : function() {
				/**
				 * Get total pay amount for part pay
				 */
				var part_remaining_amount = parseInt($("#net_part_payment_remaining").attr("data-net_part_payment_remaining"));
				var total_pay = parseInt($('#total_pay_amount').val());

				if(!isNaN(part_remaining_amount)){
					total_pay = total_pay - part_remaining_amount;
					var convenience_fee = parseInt($("#convenience_fee").attr("data-convenience_fee"));

					if( !isNaN( convenience_fee ) ) {
						total_pay = total_pay + convenience_fee;
					}
				}

				return total_pay;
			},
			partPaymentMethodSelect : function( payment_method_id, payment_method_name, paymentMethod ) {
				/**
				 * To show effects after select payment method in part payment
				 */
				/* added for part pay to copy inner html of selected payment type */
				var payementPanelId = $("input[name='payment_id["+payment_method_id+"][]']").parent().attr('id');
				$( "#"+payementPanelId+" .combo-dropdown" ).combobox("destroy");

				$("#payment_options_area").html($("#"+payementPanelId).html()).slideDown("slow", function() {
					$("#payment_method").val(payment_method_id);
					$( ".combo-dropdown" ).combobox();

					if( $.nicescroll ) {
						$(' ul.ui-autocomplete ').niceScroll({cursorcolor:"#000",cursorwidth:"10px",cursorborderradius:"0"});
					}

					$('#checkoutPartPayContainer .payment_option_radio').change(function() {
						var payment_method = $('#payment_method').val();
						radio_group_name = $(this).attr('name');
						$('input[name='+radio_group_name+']').parent().removeClass('active');

						if(payment_method == "NET_BANKING") {
							$("#payment_options_area .custom-combobox input").val("");
						}

						$(this).parent().addClass('active');
						$("#payment_option_selected").val($(this).val());
						$("input[name='payment_id["+$('#payment_method').val()+"][]']").val($(this).val());
					});

					$('#payment_options_area .small_radio_new').change(function() {
						radio_group_name = $(this).attr('name');
						$('input[name='+radio_group_name+']').parent().removeClass('active');
						$(this).parent().addClass('active');
						var input_type = $("#payment_method").val().toLowerCase();

						if(input_type == "net_banking") {
							$("#div_selected_qty_netbanking").text("Choose your bank");
						}
					});

					$("#payment_options_area .custom-combobox input").on("input",function(){
						var payment_method = $('#payment_method').val();
						if(payment_method == "NET_BANKING") {
							$("#payment_options_area").find(".active").removeClass("active").find("input").removeAttr("checked");
						}

						$("input[name='payment_id["+$('#payment_method').val()+"][]']").val($(this).val());
					});
				});
			},
			changeState : function() {
				var country_id = $( "#country_id" ).val();

				if( country_id != "IN" ) {
					$( "#region_txtbox" ).css( "display", "inline-block" );
					$( "#region_select" ).css( "display", "none" );
					$( "#region_txtbox" ).prop( "name", "region" );
					$( "#region_select" ).prop( "name", "region_select" );
					$( "#region_select" ).removeClass('required inputerror' );
					$( '#region_txtbox' ).addClass( 'required' );
					$( '#city' ).val( "" );   //remove city value
				} else {
					$( "#region_txtbox" ).css( "display","none" );
					$( "#region_select" ).css( "display","inline-block" );
					$( "#region_select" ).prop( "name","region" );
					$( "#region_txtbox" ).prop( "name","region_text" );
					$( '#region_txtbox' ).removeClass( 'required inputerror' );
					$( "#region_select" ).addClass( 'required' );
				}

				var bill_country_id = $( "#bill_country_id" ).val();

				if( bill_country_id != "IN" ) {
					$( "#bill_region_txtbox" ).css( "display", "inline-block" );
					$( "#bill_region_select" ).css( "display", "none" );
					$( "#bill_region_txtbox" ).prop( "name", "bill_region" );
					$( "#bill_region_select" ).prop( "name", "bill_region_select" );
					$( "#bill_region_select" ).removeClass( 'required inputerror' );
					$( '#bill_region_txtbox' ).addClass( 'required' );
					$( '#bill_city' ).val( "" );
				} else {
					$( "#bill_region_txtbox" ).css( "display","none" );
					$( "#bill_region_select" ).css( "display","inline-block" );
					$( "#bill_region_select" ).prop( "name","bill_region" );
					$( "#bill_region_txtbox" ).prop( "name","bill_region_text" );
					$( '#bill_region_txtbox' ).removeClass( 'required inputerror' );
					$( "#bill_region_select" ).addClass( 'required' );
				}
			},
			postCodeCheck : function() {
				/**
				 * pincode verification on key up
				 */
				$( '#postcode' ).keyup(function( e ) {
					var post_code = $(this).val();

					if( post_code.length == 6 && window.last_verified_pin != post_code ) {
						window.last_verified_pin = post_code;

						if( $( this ).parents( '#address_select_form' ).length ) {
							o.checkAssemblyPincode( post_code );
						}

						var id = e.target.id; // getting id of current postcode field
						o.pinFormComplete( post_code, id );

						e.preventDefault();
					}
				});

				$( '#bill_postcode' ).keyup(function( e ) {
					var post_code = $( this ).val();

					if( post_code.length == 6 && window.last_bill_pin != post_code ) {
						window.last_bill_pin = post_code;

						var id = e.target.id;
						o.pinFormComplete( post_code, id );

						e.preventDefault();
					}
				});
			},
			pinFormComplete : function( postcode, id ) {
				/**
				 *	Validate form for auto-complete request
				 *	@params int postcode pincode value enter by user in pincode field
				 *	@id string id of pincode field
				 */
				var cityId      = "";
				var regionId    = "";
				var country     = "";

				/* check for city and region field id with respect to id provided in params */
				if( id.indexOf( "bill_" ) > -1 ) {
					cityId   = "bill_city";
					regionId = "bill_region_select";
					country  = $("#bill_country_id").val();
				} else {
					if( $( "#city" ).length > 0 ) {
						cityId   = "city";
					} else {
						cityId  = "city_txtbox";
					}

					regionId = "region_select";
					country  = $( "#country_id" ).val();
				}

				if( country == "IN" ) {
					var data = new Array();
					if( typeof postcode != "undefined" && postcode != 0 ) {
						data = {"pincode":postcode};

						o.pincodeDetailsAutoComplete( data, cityId, regionId );   //autocomplete pincode details
					}
				}
			},
			pincodeDetailsAutoComplete : function( data, cityId, regionId ) {
				/**
				 *@description Ajax call to get city, state and locality to pre-fill the form
				 *@param int data pincode entered by user
				 *@param string cityId id name of city field
				 *@param string regionId id name of region field
				 */
				var _url = root_url + '/config_pincode/getpindata';
				var _data = data;
				var _params = {
					'cityId' : cityId,
					'regionId' : regionId
				};

				utils.makeRequest( _url, 'POST', _data, o.handleAutoCompleteResponse, o.handleError, '', _params );
			},
			handleAutoCompleteResponse : function( result, _params ) {
				if( ( result + '' ) != 'false' ) {
					var data = '';

					try {
						data = $.parseJSON( result );
					} catch( _error ) {
						data = result;
					}

					try {
						data = $.parseJSON( data );

						$( "#" + _params.cityId ).val( data.city );

						if( ( typeof data.state == 'undefined' ) || ( data.state == '' ) ) {
							data.state = $( '#' + _params.regionId + ' option:first' ).val();
						}

						$( '#' + _params.regionId ).select2( 'val', data.state );

						var locality = $.parseJSON( data.locality );

						if( _params.cityId == 'bill_city' ) {
							var autocompleteID = $( "#bill_city" ).parent().parent().find( '.gb-scroll' ).attr( 'id' );

							$( "#bill_city" ).autocomplete({source: locality, appendTo:"#"+autocompleteID});
						} else {
							var autocompleteID = $( "#city" ).parent().parent().find( '.gb-scroll' ).attr( 'id' );

							$( "#city" ).autocomplete({source: locality, appendTo:"#"+autocompleteID});
						}

						//for perfect auto-complete, it will search string that starts with typed character
						$.ui.autocomplete.filter = function (array, term) {
							var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
							return $.grep(array, function (value) {
								return matcher.test(value.label || value.value || value);
							});
						};
					} catch( _error ) {
						//
					}
				} else {
					if( _params.cityId == 'bill_city' ) {
						$( "#bill_street2" ).empty();
					} else {
						$( "#street2" ).empty();
					}

					$( '#' + _params.cityId ).val( '' );
					$( '#' + _params.regionId ).select2( 'val', " " );
				}
			},
			resetForm : function() {
				/**
				 * Reset the shipping/billing address forms
				 */
				if( $( '#shippingAddressFormCont' ).is( ':visible' ) ) {
					$( '#firstname' ).val( '' );
					$( '#lastname' ).val( '' );
					$( '#mobile' ).val( '' );
					$( '#street' ).val( '' );
					$( '#street2' ).val( '' );
					$( '#landmark' ).val( '' );
					$( '#postcode' ).val( '' );
					$( '#city' ).val( '' );
					$( '#region_select' ).select2( 'val', ' ' );
					$( '#country_id' ).select2( 'val', 'IN' );
				}

				if( $( '#billingAddressFormCont' ).is( ':visible' ) ) {
					$( '#bill_firstname' ).val( '' );
					$( '#bill_lastname' ).val( '' );
					$( '#bill_mobile' ).val( '' );
					$( '#bill_street' ).val( '' );
					$( '#bill_street2' ).val( '' );
					$( '#bill_landmark' ).val( '' );
					$( '#bill_postcode' ).val( '' );
					$( '#bill_city' ).val( '' );
					$( '#bill_region_select' ).select2( 'val', ' ' );
					$( '#bill_country_id' ).select2( 'val', 'IN' );
				}
			},
			handleError : function( x, y, _z ) {
				//
			},
                        feCheckBoxChange : function() {
                            var points = 0;
                                points = parseInt($(this).val());
                            
                            // total pay init needs to be called here
                                
                            $('#fe_discount').slideToggle(500);
                            if (this.checked) {
                                // assign expire of cookie to 10 minute
                                var date = new Date();
                                date.setTime(date.getTime() + (10 * 60 * 1000));
                                var expiresfe = date.toGMTString();
                                utils.createCookie('furnitureExchange', 1, expiresfe);
                            } else {
                                utils.eraseCookie('furnitureExchange');
                            }
                        }
		};

		z.CHECKOUT = o;
	})( PF, $ );

	$( document ).ready(function() {
		PF.CHECKOUT.init();
	});
}