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
			var activeMenuTop = $('#ckPaymentMethodNav li.active').position().top;
			$('#checkoutNavActive').css('top',activeMenuTop + 'px');
		}
                /* cashPay doorstep click event */
  		$(document).on('click tap','#ckCashPayDoorstep',function(){
                        var cbc_amount = 0;
                        //yogita's change
                        $('#cbc_default_option, .cbc_radio_block .bank_select_wrap, #cbc_deposit_cash').hide();
                        $('#cbc_collect_cash').show();
                        cbc_amount = parseInt($("#cbc_added_amount").attr("data-cbc-amount"));
                        var total = parseInt($('#total_pay_amount').val());
                        var growtreeVal = 0;
                        if( $( '#growTree' ).is( ':checked' ) ) {
                                growtreeVal = parseInt( donation );
                        }
                        if(cbc_amount > 0){
                                $('#cbc_amt').text('of '+cbc_amount);
                                $('#cbc_charge_show').text('+ Rs.'+cbc_amount);
                                $('#cbc_charge_show, #cbc_collect_cash').show();
                                $('#non-refund-cbc-note').text('Non Refundable CashPay charge of '+cbc_amount+' applicable').show();
                                $('.cbc_charges').text('Rs.'+(total+growtreeVal)+' + Rs.'+cbc_amount).show();
                        } else {
                                $('#non-refund-cbc-note').hide();
                        }
			$('.cashpay-deposit-container, .cashpay-default-container').hide();
			$('.cashpay-doorstep-container').show();
		});

		/* cashPay Deposit Bank click event */
		$(document).on('click tap','#ckCashPayDeposit',function(){
                        $('#cbc_collect_cash, #cbc_default_option, #cbc_charge_show, #non-refund-cbc-note, .cbc_charges').hide();
                        $('#cbc_deposit_cash, .cbc_radio_block .bank_select_wrap').show();
			$('.cashpay-doorstep-container, .cashpay-default-container').hide();
			$('.cashpay-deposit-container').show();
		});

                $('#codAgreement1').on('click', function () {
                        if($('#codAgreement1').is( ":checked" )) {
                                $('#show_checkout_agreement_error').slideUp(250,"linear");
                        }
                });
                
		/* payment method left navigation tab on click right section container open */
		$('#ckPaymentMethodNav').on('click tap', 'li:not(.active)', function(){
			var id = $(this).attr('id');
			$(this).addClass('active').siblings().removeClass('active');
			$('#ckPaymentMethodContainer').find('.ck-tab-content').hide();
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
		$('.emi-bank-container').on('click tap', '.ck-emi-tr:not(:hidden)', function(e){
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
                        if( $( this ).is( ":checked" ) ) {
                            $('#ckPaymentMethodNav').find('li').not('#checkoutPartPay').hide();
                            $('#checkoutPaySecureBtn').removeClass('disabled');
                            $('#partPayBreakupDetail').slideUp();
                            $('#partPayAmtView, #partPayDropDown, .ck-backpay-action').show();
                        } else {
                            $('#ckPaymentMethodNav').find('li').not('#checkoutPartPay').show();
                            $('#checkoutPaySecureBtn').removeClass('disabled');
                            $('#partPayAmtView, #partPayDropDown, .ck-backpay-action').hide();
                            $('#partPayBreakupDetail').slideDown();
                        }
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
			PF.CHECKOUT.resetBankSelection();
			var growTreeSelect = $( '#growTree' ).prop( 'checked' );
			$( '#s2id_partPayDropDownOption' ).select2( 'val', selectedOpt );

			$( '#payment_form' )[ 0 ].reset();
			$( 'input[type="checkbox"][id="partPayAgreement"]' ).prop( 'checked', 'checked' );

			if( growTreeSelect ) {
				$( '#growTree' ).prop( 'checked', 'checked' );
			}
                        
                        //start- By default proceed to secure pay button is enable for partPayDropDown options - thecoder 
                        $('#checkoutPaySecureBtn').removeClass('disabled');
			switch(selectedOpt) {
				case "DEBIT_CARD":
					$('#partPayOptionArea').show();
					$('#partpay_checkout'+selectedOpt+'Container').show();
					break;
				case "CREDIT_CARD":
					$('#partPayOptionArea').show();
					$('#partpay_checkout'+selectedOpt+'Container').show();
					break;
				case "NET_BANKING":
					$('#partPayOptionArea').show();
					$('#partpay_checkout'+selectedOpt+'Container').show();
					break;
				case "PAYPAL":
					$('#partPayOptionArea').show();
					$('#partpay_checkout'+selectedOpt+'Container').show();
					break;
				case "PAYUMONEY":
					$('#partPayOptionArea').show();
					$('#partpay_checkout'+selectedOpt+'Container').show();
					break;
				case "WALLET":
					$('#partPayOptionArea').show();
					$('#partpay_checkout'+selectedOpt+'Container').show();
                                        var netpayable = parseInt($(".checkout-partpay-amount").attr("data-netpayable")); 
                                        //start - To disable secure pay button of price to pay is larger then max limit of wallet -mrcoder
                                        if(netpayable > wallet_price_check) {    
                                            //disable proceed to secure pay button
                                            $('#checkoutPaySecureBtn').addClass('disabled');
                                        }else{
                                            //enable proceed to secure pay button
                                            $('#checkoutPaySecureBtn').removeClass('disabled');
                                        }
                                        //End - To disable secure pay button of price to pay is larger then max limit of wallet
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

                        if($('#ckShippingAddress').hasClass('guest_user')) {
                                $('#shippingAddressOpenCont').slideDown();
                                $( '#shippingAddressFormCont .add-address-action' ).fadeOut( 500, function(){
                                        $( '#shippingAddressFormCont' ).find( '.add-address_form' ).fadeIn();
                                });
                        }else{
                                $('#shippingAddressFormCancel').click();
                                $('#shippingAddressOpenCont').slideDown();
                        }
		});

		/* shipping address close box click event */
		$('#ckShippingAddress').on('click tap','.checkout-add-box-close a',function() {
                        if(!($('#ckShippingAddress').hasClass('guest_user'))) {
        			PF.CHECKOUT.resetForm();
                        }
			$('#ckShippingAddress').removeClass('active');
			$('#shippingAddressOpenCont').slideUp();
			$('#shippingAddressFormCont').find('.add-address_form').hide();
			$('#shippingAddressFormCont .add-address-action').show();
                        PF.CHECKOUT.checkAssemblyPincode();
		});

		/* shipping address row click event */
		$('#shippingAddressOpenCont').on('click tap','.ship-address-row:not(.active)',function() {
			//$(this).find('input[type=radio]').prop('checked',true);
			if( $(this).find('input[type="radio"]').is(':checked') ) {
				return;
			}
			$(this).addClass('active').siblings().removeClass('active');
			$(this).find('input[type="radio"]').click();
		});

		/* shipping address row edit and add button click event */
		/*$('#shippingAddressOpenCont .ship-address-action a, #shippingAddressFormCont .add-address-action a').on('click tap',  function(e){
			if( $( this ).attr( 'class' ) != 'edit_address' ) {
				if( $( '.shipping-all-address .ship-address-row' ).length >= 10 ) {
					$( '#saveAddressShip' ).prop( 'checked', false ).val(0).attr( 'disabled', 'disabled' );
					$( '#save_address' ).val( 0 );
				} else {
					$( '#saveAddressShip' ).val(0).removeAttr( 'disabled' );
					$( '#save_address' ).val( 1 );
				}

				if( $.trim( $( '#form_serviceablity_error_msg .error_msg_pincode' ).html() ) != '' ) {
					$( '#form_serviceablity_error_msg' ).hide();
					$( '#form_serviceablity_error_product_msg' ).hide();
				}

				if( $.trim( $( '#form_fe_error_msg .error_msg_pincode' ).html() ) != '' ) {
					$( '#form_fe_error_msg' ).hide();
				}

				if( $.trim( $( '#form_assembly_error_header_msg .error_msg_pincode' ).html() ) != '' ) {
					$( '#form_assembly_error_header_msg' ).hide();
					$( '#form_assembly_error_product_msg' ).hide();
				}

				if( $.trim( $( '#form_additional_req #form_additional_req_state' ).html() ) != '' ) {
					$( '#form_additional_req' ).hide();
				}

				if( $.trim( $( '#international_error_msg' ).html() ) != '' ) {
					$( '#international_error_msg' ).hide();
				}
				$( '.address-future-save' ).show();
			} else {
				$( '#saveAddressShip' ).val(0).removeAttr( 'disabled' );
				$( '#save_address' ).val( 1 );
			}

			//e.stopPropagation();
			$( '#shippingAddressFormCont .add-address-action' ).fadeOut( 500, function(){
				$( '#shippingAddressFormCont' ).find( '.add-address_form' ).fadeIn();
			});
		});*/

		/* shipping address row edit click event */
		$('#shippingAddressOpenCont .ship-address-action a').on('click tap',  function(){
			$(this).closest('.ship-address-row').addClass('active').siblings().removeClass('active');
			$(this).closest('.ship-address-row').find('input[type=radio]').prop('checked',true);
			$('#shippingAddressFormCont').find('.add-address_form').removeClass('white_bg');
			$('#shippingAddressFormCont').find('.add-address_form').find( '.edt-blk-title' ).html( 'Edit your address' );
		});

		/* shipping address add button click event */
		$('#shippingAddressFormCont .add-address-action').on('click tap',  function(){
			//$('#shippingAddressOpenCont').find('.ship-address-row').removeClass('active');
			$('#shippingAddressFormCont').find('.add-address_form').addClass('white_bg');
			//$('#shippingAddressOpenCont').find('input[type=radio]').prop('checked',false);
			$('#shippingAddressFormCont').find('.add-address_form').find( '.edt-blk-title' ).html( 'Enter a new Address' );
		});

		/* shipping cancel link click event */
		$('#shippingAddressFormCancel').on('click tap', function() {
                        if(!($('#ckShippingAddress').hasClass('guest_user'))) {
        			PF.CHECKOUT.resetForm();
                        }
			$('#shippingAddressFormCont').find('.add-address_form').fadeOut(500, function() {
				//$('#shippingAddressOpenCont').find('.ship-address-row').removeClass('active');
				$('#shippingAddressFormCont .add-address-action').fadeIn();
			});
                        /**
                         * DON'T VISIBLE PROCEED BUTTON IF FREE GIFT ERROR SHOW IS ENABLE
                         * IF FREE GIFT ERROR SHOW IS TRUE THE CUSTOMER CAN'T PROCEED FUTHER
                         */
                        $( '.btn_blue' ).removeClass( 'disabled' );
                        if( !isFreeGiftErrorshow ) {

                        	$( '.btn_green, .btn_green_big' ).removeClass( 'disabled' );
                        }
                        PF.CHECKOUT.handlePanasonicErrorMsg();
                        PF.CHECKOUT.checkAssemblyPincode();
		});
		/* shipping address code end */

		/* billing address code start */
		/* billing address change or edit button click event */
		$('#ckBillingAddress').on('click tap','.checkout-address-action a',function() {
			$('#shippingAddressOpenCont').hide();
			$('#ckBillingAddress').addClass('active');
			$('#ckShippingAddress').removeClass('active');

                        if($('#ckBillingAddress').hasClass('guest_user')) {
                                $('#billingAddressOpenCont').slideDown();
                                $( '#billingAddressFormCont .add-address-action' ).fadeOut( 500, function(){
                                        $( '#billingAddressFormCont' ).find( '.add-address_form' ).fadeIn();
                                });
                        }else{
                                $('#billingAddressFormCancel').click();
                                $('#billingAddressOpenCont').slideDown();
                        }
		});

		/* billing address close box click event */
		$('#ckBillingAddress').on('click tap','.checkout-add-box-close a',function() {
                        if(!($('#ckBillingAddress').hasClass('guest_user'))) {
        			PF.CHECKOUT.resetForm();
                        }
			$('#ckBillingAddress').removeClass('active');
			$('#billingAddressOpenCont').slideUp();
			$('#billingAddressFormCont').find('.add-address_form').hide();
			$('#billingAddressFormCont .add-address-action').show();
                        /**
                         * COMMENTED BY MAYUR
                         * DUE TO BELOW LINE OF CODE, GREEN BUTTON GET VISIBLE IRRESPECTIVE OF ANY ERROR PRESENT ON PAGE OR NOT
                         * IF BUTTON ALREADY DISABLED DUE TO SOME ERROR ON PAGE AND CUSTOMER CLICK TO CHANGE AND EDIT BUTTON OF SHIPPING ADDRESS,
                         * THAT BUTTON GET VISIBLE AND CUSTOMER CAN EASLY PROCCED FUTHER
                         */
                        /*if( $( '#shippingAddressFormCancel' ).is( ':visible' ) ) {
                            $( '.btn_green, .btn_green_big, .btn_blue' ).removeClass( 'disabled' );
                        }*/
		});

		/* billing address row click event */
		$('#billingAddressOpenCont').on('click tap','.ship-address-row:not(.active)',function() {
			//$(this).find('input[type=radio]').prop('checked',true);
			if( $(this).find('input[type="radio"]').is(':checked') ) {
				return;
			}
			$(this).addClass('active').siblings().removeClass('active');
			$(this).find('input[type="radio"]').click();
		});

		/* billing address row edit and add button click event */
		$('#billingAddressOpenCont .ship-address-action a, #billingAddressFormCont .add-address-action a').on('click tap',  function(e){
			if( $( this ).attr( 'class' ) != 'edit_address' ) {
				if( $( '.billing-all-address .ship-address-row' ).length >= 10 ) {
					$( '#saveAddressBill' ).prop( 'checked', false ).val(0).attr( 'disabled', 'disabled' );
					$( '#save_billing_address' ).val( 0 );
				} else {
					$( '#saveAddressBill' ).val(0).removeAttr( 'disabled' );
					$( '#save_billing_address' ).val( 1 );
				}
			} else {
				$( '#saveAddressBill' ).val(0).removeAttr( 'disabled' );
				$( '#save_billing_address' ).val( 1 );
			}
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
			//$('#billingAddressOpenCont').find('.ship-address-row').removeClass('active');
			$('#billingAddressFormCont').find('.add-address_form').addClass('white_bg');
			//$('#billingAddressOpenCont').find('input[type=radio]').prop('checked',false);
			$('#billingAddressFormCont').find('.add-address_form').find( '.edt-blk-title' ).html( 'Enter a new Address' );
		});

		/* billing cancel link click event */
		$('#billingAddressFormCancel').on('click tap', function() {
                        if(!($('#ckBillingAddress').hasClass('guest_user'))) {
        			PF.CHECKOUT.resetForm();
                        }
			$('#billingAddressFormCont').find('.add-address_form').fadeOut(500, function() {
				//$('#billingAddressOpenCont').find('.ship-address-row').removeClass('active');
				$('#billingAddressFormCont .add-address-action').fadeIn();
			});
		});
		/* billing address code end */

                /* Issue fixed for IE - Beer */
                $(".right-checkout-content label > img").on("click", function() {
                    $("#" + $(this).parent("label").attr("for")).click();
                });
                
                //New redesign 2017
                $('.home-login-m-login-link').on('click', function () {
                    $('.home-login-forgot-reseted-wrap,.home-login-forgot-wrap,.home-login-reg-wrap').hide();
                    $('.home-login-guest-modal,.home-login-frm-wrap').show();
                    PF.CHECKOUT.allInputReset();
                });
               
                $('.popup_overlay').click(function(){
                    PF.CHECKOUT.form_fild_reset();
                });
                
                $('.ck-addr-frm-row .ck-pincode-ip').on('keyup', function () {
                //var frmId = $(this).closest('form').attr('id');
                    //var frmId = $(this).closest('form').attr('id');
                    PF.CHECKOUT.postCodeCheck();
                });
               /* $( '#postcode' ).keyup(function( e ) {
                    var post_code = $(this).val();
                    var country_id = $( "#country_id" ).val();

                    if(country_id!="IN"){
                            $("#postcode").removeAttr('maxlength');
                    }

                    if( post_code.length == 6 && window.last_verified_pin != post_code ) {
                            window.last_verified_pin = post_code;

                            var id = e.target.id; // getting id of current postcode field
                            //if( $( this ).parents( '#address_select_form' ).length ) {
                                    PF.CHECKOUT.checkAssemblyPincode( post_code , id);
                            //}

                            //o.pinFormComplete( post_code, id );

                            e.preventDefault();
                    }
                });*/
        /*        
                  $('.ck-addr-frm-row .ck-pincode-ip').on('focusout', function () {
        var frmId = $(this).closest('form').attr('id');
        PF.CHECKOUT.verifyPincode(frmId);
    });
    $('.ck-addr-frm-row .ck-fname-ip').on('focusout', function () {
        var frmId = $(this).closest('form').attr('id');
        PF.CHECKOUT.verifyFirstname(frmId);
    });
    $('.ck-addr-frm-row .ck-lname-ip').on('focusout', function () {
        var frmId = $(this).closest('form').attr('id');
        PF.CHECKOUT.verifyLastname(frmId);
    });
    $('.ck-addr-frm-row .ck-addr-ip').on('focusout', function () {
        var frmId = $(this).closest('form').attr('id');
        PF.CHECKOUT.verifyAddr(frmId);
    });
// validation moved to newheader.js
//    $('.ck-addr-frm-row .ck-mobile-ip').on('focusout', function () {
//        var frmId = $(this).closest('form').attr('id');
//        PF.CHECKOUT.verifyMobileNo(frmId);
//    });
    $('.ck-addr-frm-row .ck-email-ip').on('focusout', function () {
        var frmId = $(this).closest('form').attr('id');
        PF.CHECKOUT.verifyEmailId(frmId);
    });
    
    $('.ck-addr-frm-row .ck-city-ip').on('focusout', function () {
        var frmId = $(this).closest('form').attr('id');
        PF.CHECKOUT.verifyCity(frmId);
    });
  */  
    $('.ck-del-addr-list-item .ck-del-addr-list-edit').click(function () {
        $('#editdeladdr').html('EDIT ADDRESS');
    	var _id = $( this ).data( 'addressid' );
        $('html, body').animate({
           scrollTop: $(".ck-addr-selection-left-wrap").offset().top
        }, 2000);
	    $('.ck-del-addr-list-wrap').slideUp(100);
	    $('.ck-saved-addr-back-wrap').show(200);
	    $('.ck-del-addr-add-new').hide();
	    $('.ck-del-addr-add-frm-wrap').slideDown(300);
	    $( '#save_address' ).val( 1 );
	    $( '#update_id' ).val( _id );
        PF.CHECKOUT.showAddressForEdit( _id , 'shipping');
     });
    
    //edit billing
    $('.ck-bil-addr-slide-edit').click(function (e) {
        $('.ck-bil-addr-sel-wrap, .ck-bil-addr-add-new').hide();
        $('.ck-bill-addr-add-new').hide();
        $('.ck-bill-addr-frm-wrap').show();
        e.stopPropagation();
        $( '#save_address_bill' ).val( 0 );
        $( '#save_bill' ).val( 0 );
        var _id = $( this ).data( 'addressid' );
        $( '#update_id_bill' ).val( _id );
        PF.CHECKOUT.showAddressForEdit( _id, 'billing' );
    });
    
  }
};              
                   
// 

/**
 * Ship-together carousel
 */
var SHIP_TOGETHER = (function () {
    var o = {};
    $(function () {

        function select_link_ele() {
        	if(document.querySelector('.shipstooltip')){
            	o.tol_link = (document.getElementById('shipTogether').checked ? $(".shipsborder-chk") : $(".shipsborder"));
        	}
        }
        function set_hover_menu_position() {
        	if(document.querySelector('.shipstooltip')){
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
	if(document.querySelector('.shipstooltip')){
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


		if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
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
	if(document.querySelector('.shipstooltip'))
        o.scroll_width = 0, o.left_flag = 0, o.left_rem, o.scroll_amt = 0;
        $('#ships-product-scroll .ships-product-scroll-slide ').each(function () {
            o.scroll_width += $(this).width() + 20;
        });
        o.main_scroll_ele.css('width', o.scroll_width + 'px');
        o.remainder_left = o.scroll_width - $('.shipstooltip-wrap').width();
        o.left_rem = o.remainder_left;
        o.tol_link = $(".shipsborder");
        o.main_scroll_ele.css('left','0px');
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
					'.ck-sku-add-wl-link' : ['PF.CHECKOUT.addWishlistToWishlist','body'],
					'.ck-item-wl-msg-wrap' : ['PF.CHECKOUT.removeProductFromWishlist','body'],
					'.ck-non-del-rmv-link' : ['PF.CHECKOUT.addWishlistToWishlist','body'],
					'.ck-non-oos-rmv-link' : ['PF.CHECKOUT.addWishlistToWishlist','body'],
					'.ck-pgc-remove' : ['PF.CHECKOUT.giftcard.remove_giftvocher','body']
                                        //'#change_billing_address' : ['PF.CHECKOUT.billAddrSelSlider','body']
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

				checkout_scripts.initialize();
				utils.listen(o.listen);

                                // set fe pin
                                if ( $( '#fe_form_pin' ).length && $( '#fe_form_pin' ).val() != '' ) {
                                    o.exchange_pincode = $( '#fe_form_pin' ).val();
                                }

				// set page type
				if( $( 'input#pin_code' ).length ) {
					o.pageType = 'OrderSummary';
				} else if( $( '#ckShippingAddress' ).length ) {
					o.pageType = 'AddressSelection';
					if( $( '#ckShippingAddress' ).length ) {
						o.checkAssemblyPincode();
					}
				} else if( $( '#guestUser' ).length ) {
					o.pageType = 'FirstTime';
					if( $( '#postcode' ).length > 0 && $( '#postcode' ).val() != '') {
						o.checkAssemblyPincode($( '#postcode' ).val(),'postcode');
					}
					if( $( '#bill_postcode' ).length > 0 && $( '#bill_postcode' ).val() != '') {
						o.checkAssemblyPincode($( '#bill_postcode' ).val(),'bill_postcode');
					}
				}
				
				// To Initiate Scrolling on Billing address Slider 
				if($('.mScrollBillingAddress').length > 0){
					global_function.mCustomScrollInit('mScrollBillingAddress');
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


				// To remove the maxlength attribute if country is not India
				var bill_postcodeval=$( '#bill_postcode' ).val();
				if(bill_postcodeval !="IN"){
					$( '#bill_postcode' ).attr('maxlength',10);
				}

				//Added to hide the select box when bill country is not india
				if($("#bill_country_id").val()!="IN"){
					$("#s2id_bill_region_select").css('display','none');
				}
				else{
					$("#s2id_bill_region_select").css('display','inline-block');
				}

				/**
				 * Show the text-box to enter state if the selected country is not India
				 */
				$( '#page' ).on( 'change', 'select#bill_country_id, select#country_id, #fe_points', function( e ) {
					var _id = $( this ).attr( 'id' ).toLowerCase();

					switch( _id ) {
						case 'bill_country_id':
							var _country = $.trim( $( this ).val().toLowerCase() );

							if( _country != 'in' ) {
								/*
								var defaultState = $( '#bill_region_select option:eq(0)' ).val();
								$( '#s2id_bill_region_select' ).select2( 'val', defaultState );
								//$( '#s2id_bill_region_select' ).select2( 'disable' );
								$( '#s2id_bill_region_select' ).css('display','none');
								 */
								$( '#bill_region_select').val('').trigger('change').removeAttr('validate').attr('disabled','disabled').next(".select2-container").hide();
								$( '#bill_region_txtbox' ).val('').show().removeAttr('disabled').attr('validate','1').focus();
								$( '#bill_postcode' ).attr('type','text').attr('maxlength',10).removeAttr('validate').removeAttr('data-valid-attr');
								$( '#bill_postcode' ).off('blur').off('keydown').off('keyup').off('keypress');
								$( '#billAddAddrFrm' ).find('div').removeClass('frm-success-wrap').removeClass('frm-error-wrap');
								$( '#billAddAddrFrm' ).find('.error-msg').hide();
							} else {
								$( '#bill_region_txtbox' ).val( '' ).removeAttr('validate').attr('disabled','disabled').hide();
								$( '#bill_region_select').val('').trigger('change').removeAttr('disabled').attr('validate','1').next(".select2-container").show();
								$( '#bill_postcode' ).attr('type','number').attr('maxlength',6).attr('validate','1').attr("data-valid-attr","pincode");
								PF.CHECKOUT.postCodeCheck();
								//$( '#s2id_bill_region_select' ).select2( 'enable' );
								//$( '#s2id_bill_region_select' ).css('display','inline-block');
							}
							break;
						case 'country_id':
							var _country = $.trim( $( this ).val().toLowerCase() );

							if( _country != 'in' ) {
								var defaultState = $( '#region_select option:eq(0)' ).val();
								$( '#s2id_region_select' ).select2( 'val', defaultState );
								//$( '#s2id_region_select' ).select2( 'disable' );
								$( '#s2id_region_select' ).css('display','none');

								$( '#region_txtbox' ).show().focus();
							} else {
								$( '#region_txtbox' ).val( '' ).hide();
								//$( '#s2id_region_select' ).select2( 'enable' );
								$( '#s2id_region_select' ).css('display','inline-block');
							}
							break;
						case 'fe_points':
							var fe_discount = parseInt( $( '#fe_points' ).val() );
							var currentOfferPrice = parseInt( $( '#offer_price' ).attr( 'data-offer-price' ) );

							if( $( '#fe_points' ).is( ':checked' ) ) {
                                                                if (typeof o.exchange_pincode !== 'undefined') {
                                                                    var _pin = utils.readCookie('serviceable_pincode');
                                                                    $('#fe_error_msg').find('.error_msg_pincode').html(o.exchange_pincode);
                                                                    $('#form_fe_error_msg').find('.error_msg_pincode').html(o.exchange_pincode);
                                                                    if (utils.isNumber(_pin) && _pin != o.exchange_pincode)
                                                                    {
                                                                        $('#fe_error_msg').slideDown();
                                                                        $('#form_fe_error_msg').slideDown();
                                                                    }
                                                                }
								var _final = currentOfferPrice - fe_discount;
								$( '#offer_price' ).attr( 'data-offer-price', _final );
								$( '#offer_price .price-nmbr' ).html( '<strong>Rs. ' + utils.currencyFormat( Math.ceil( _final ) ) + '</strong>' );
							} else {
                                                                $('#fe_error_msg').slideUp();
                                                                $('#form_fe_error_msg').slideUp();
								var _final = currentOfferPrice + fe_discount;
								$( '#offer_price' ).attr( 'data-offer-price', _final );
								$( '#offer_price .price-nmbr' ).html( '<strong>Rs. ' + utils.currencyFormat( Math.ceil( _final ) ) + '</strong>' );
							}

							o.totalPay();
							break;						
						default:
							break;
					}
				});

				/**
				 * Update product qty in cart on enter
				 */
				$( document ).on( 'keypress', 'input.quntity-input, input#coupon_code, input#pin_code', function( e ) {
					if( e.which == $.ui.keyCode.ENTER ) {
						switch( $( this ).attr( 'class' ).toLowerCase() ) {
							case 'quntity-input':
								e.preventDefault();
								var _id = $( this ).attr( 'id' ).split( '_' );
								var _val = parseInt( $.trim( $( this ).val() ) );
								var maxAvailableQty = $( this ).data( 'avl-qty' );
								var currentQty = $( this ).attr( 'data-val' );

								// If a product availability is greater than what a user is allowed to in the cart, limit it
								maxAvailableQty = ( maxAvailableQty > max_cart_qty ) ? max_cart_qty : maxAvailableQty;

								$( '#cart_product_' + _id[ 1 ] ).hide();
								$(this).siblings('.ck-sku-qty-minus').removeClass('disabled');

								// check if the provided input is valid and less than max available quantity
								if( utils.isNumber( _val ) && ( _val <= maxAvailableQty ) && ( _val > 0 ) ) {
									$('.cart-loader').show();
									o.updateCartQty();
								} else {
									// show the default value selected
									$( this ).val( currentQty );

									if( ! utils.isNumber( _val ) ) {
										$( '#cart_product_' + _id[ 1 ] ).html( 'Please choose a valid quantity' ).show();
									} else if( _val > maxAvailableQty ) {
										var _text = ' quantity.';
										if( maxAvailableQty > 1 ) {
											_text = ' quantities.';
										}

										$( '#cart_product_' + _id[ 1 ] ).html( 'You can not choose more than ' + maxAvailableQty + _text ).show();
									} else if( _val <= 0 && currentQty == 1) {
										$(this).siblings('.ck-sku-qty-minus').addClass('disabled');
										// $( '#cart_product_' + _id[ 1 ] ).html( 'Please choose at least 1 quantity.' ).show();
									}
								}

								break;
							case 'inputcoupon':
								if(( o.isCouponApplied == 0 ) ) {
									o.isCouponApplied = 1;
									$( '#cpn_check_btn' ).trigger( 'click' );
								}
								break;
							case 'order_summary_pincode':
								$( '.ck-pg-pincheck-bar' ).trigger('#pin_check');
								var _cur_pin = $('.order_summary_pincode').val();
								o.checkAssemblyPincode( $( this ).val() );
								break;
							default:
								break;
						}

						e.stopPropagation();
					}
				});
                                
                                $(".tooltip").mouseover(function () {
                                    $(this).siblings('.tooltip-txt').fadeIn();
                                }).mouseout(function () {
                                    $(this).siblings('.tooltip-txt').fadeOut();
                                });

				$( '#page' ).on( 'click', '.ck-sku-qty-minus, .ck-sku-qty-add, a.edit_address, input.address_select_input', function( e ) {
					switch( $( this ).attr( 'class' ).toLowerCase() ) {
						case 'ck-sku-qty-minus':
							$('.cart-loader').show();	//show cart loader
							var _el = $( this ).parent().find( '.quntity-input' );

							var _id = _el.attr( 'id' ).split( '_' );
							var _val = parseInt( $.trim( _el.val() ) );
							var maxAvailableQty = _el.attr( 'data-avl-qty' );

							// If a product availability is greater than what a user is allowed to in the cart, limit it
							maxAvailableQty = ( maxAvailableQty > max_cart_qty ) ? max_cart_qty : maxAvailableQty;

							$( '#cart_product_' + _id[ 1 ] ).hide();
							$(this).removeClass('disabled');

							// check if the provided input is valid and less than max available quantity
							if( utils.isNumber( _val ) ) {
								_val -= 1;

								if( ( _val <= maxAvailableQty ) && ( _val > 0 ) ) {
									_el.val( _val );
									o.updateCartQty();
								} else {
									// show the default value selected
									_el.val( _el.attr( 'data-val' ) );

									if( _val > maxAvailableQty ) {
										var _text = ' quantity.';
										if( maxAvailableQty > 1 ) {
											_text = ' quantities.';
										}

										$( '#cart_product_' + _id[ 1 ] ).html( 'You can not choose more than ' + maxAvailableQty + _text ).show();
									} else {
										$(this).addClass('disabled');
										// $( '#cart_product_' + _id[ 1 ] ).html( 'Please choose at least 1 quantity.' ).show();
									}
									$('.cart-loader').hide();
								}
							} else {
								// show the default value selected
								_el.val( _el.attr( 'data-val' ) );

								$( '#cart_product_' + _id[ 1 ] ).html( 'Please choose a valid quantity' ).show();
								$('.cart-loader').hide();
							}
							break;
						case 'ck-sku-qty-add':
							$('.cart-loader').show();	//show cart loader
							var _el = $( this ).parent().find( '.quntity-input' );

							var _id = _el.attr( 'id' ).split( '_' );
							var _val = parseInt( $.trim( _el.val() ) );
							var maxAvailableQty = _el.data( 'avl-qty' );

							// If a product availability is greater than what a user is allowed to in the cart, limit it
							maxAvailableQty = ( maxAvailableQty > max_cart_qty ) ? max_cart_qty : maxAvailableQty;

							$( '#cart_product_' + _id[ 1 ] ).hide();
							$(this).siblings('.ck-sku-qty-minus').removeClass('disabled');

							// check if the provided input is valid and less than max available quantity
							if( utils.isNumber( _val ) ) {
								_val += 1;

								if( ( _val <= maxAvailableQty ) && ( _val > 0 ) ) {
									_el.val( _val );
									o.updateCartQty();
								} else {
									// show the default value selected
									_el.val( _el.attr( 'data-val' ) );

									if( _val > maxAvailableQty ) {
										var _text = ' quantity.';
										if( maxAvailableQty > 1 ) {
											_text = ' quantities.';
										}

										$( '#cart_product_' + _id[ 1 ] ).html( 'You can not choose more than ' + maxAvailableQty + _text ).show();
									} else {
										$(this).siblings('.ck-sku-qty-minus').addClass('disabled');
										// $( '#cart_product_' + _id[ 1 ] ).html( 'Please choose at least 1 quantity.' ).show();
									}
									$('.cart-loader').hide();	//hide loader
								}
							} else {
								// show the default value selected
								_el.val( _el.attr( 'data-val' ) );

								$( '#cart_product_' + _id[ 1 ] ).html( 'Please choose a valid quantity' ).show();
								$('.cart-loader').hide();	//hide loader
							}
							break;
						case 'edit_address':
							// mark the form as editing the existing addresses
							o.resetForm();

							var _id = $( this ).data( 'addressid' );
							$( '#update_id' ).val( _id );
							o.showAddressForEdit( _id );
							break;
						case 'address_select_input':
							var _id = $( this ).val();
							var _type = $( this ).attr( 'name' ).split( '_' ).shift();
							/* To hide the loader is radio button is already checked
							 Added by Aditya Pandey	*/
							var flag = $(this).is(':checked');
							if(flag==true){
								o.setDefaultAddress( _id, _type );
							}
							break;
						default:
							break;
					}
				});

				$('.ck-pg-pincheck-bar').bind('#pin_check',function(e){ 
					//Get Pincode
					var _thspin = $( '.order_summary_pincode' ).val();
					if( ( _thspin === undefined ) || ! utils.isNumber( _thspin ) || ( _thspin.length != 6 ) ) {
						// no address selected
						$('.ck-pin-input-error-wrap').css('display', 'block');
						$('.ck-pin-input-error-wrap').siblings('div').addClass('invld-pin')
						return false;
					}
					//Set Pincode
					$('.order_summary_pincode').val(_thspin);
					$('.ck-pin-entered span').text(_thspin);					
				});


				$( '#page' ).on( 'click', 'a#assembly_product_count, a#form_assembly_product_count, a#okay_got_it, a#form_okay_got_it, a#empty_user_cart, a#scroll_to_cart, a#form_remove_non_serviceable_items, a#remove_non_serviceable_items, #shpt, #shptFinalPage, #ck-pin-entered-edit, input.order_summary_pincode_btn', function(e) {
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
							$( 'html, body' ).animate({scrollTop: $( '#ck-sku-list-wrap' ).offset().top}, 1000 );
							break;
						case 'remove_non_serviceable_items':
						case 'form_remove_non_serviceable_items':
							o.removeNonServiceableItem();
							break;
						case 'shpt':
							// stop event bubbling
							e.stopImmediatePropagation();

						  	o.handleShipTogether();
							break;
						case 'shptfinalpage':
							// stop event bubbling
							e.stopImmediatePropagation();

							if( ! o.isShipTogetherOpted ) {
								o.isShipTogetherOpted++;
								$( '#shipTogether' ).prop( 'checked', 'checked' );
								o.handleShipTogetherFinalPage();
							}
							break;
						case 'pin_check':
							$( '.ck-pg-pincheck-bar' ).trigger('#pin_check');
							var _cur_pin = $('.order_summary_pincode').val();							
							o.checkAssemblyPincode(_cur_pin);
							break;						
						case 'ck-pin-entered-edit':						       
						        $('.ck-pin-entered,.ck-pin-input-error-wrap').hide();
						        $('.ck-pin-input-error-wrap').siblings('div').removeClass('invld-pin')
						        $('.ck-pin-input-wrap').show();
							break;
						default:
							break;
					}
				});
				
				/**
				 * @author: prathamesh.s
				 * @desc: To populate data in Billing Address popup for Guest/First Time User
				 **/
				$('.ck-addr-auto-pre-head .ck-bill-modal-link').click(function () {
				   if($('#auto-pincode').length > 0 && $.trim($('#auto-pincode').text()) != ''){
					   $('#bill_postcode').val($.trim($('#auto-pincode').text()));
				   }
				   if($('#auto-fn').length > 0 && $.trim($('#auto-fn').text()) != ''){
					   $('#bill_firstname').val($.trim($('#auto-fn').text()));
				   }
				   if($('#auto-ln').length > 0 && $.trim($('#auto-ln').text()) != ''){
					   $('#bill_lastname').val($.trim($('#auto-ln').text()));
				   }
				   if($('#auto-addr-txt').length > 0 && $.trim($('#auto-addr-txt').text()) != ''){
					   $('#bill_street').val($.trim($('#auto-addr-txt').text()));
				   }
				   if($('#auto-area').length > 0 && $.trim($('#auto-area').text()) != ''){
					   $('#bill_street2').val($.trim($('#auto-area').text()));
				   }
				   if($('#auto-landmark').length > 0 && $.trim($('#auto-landmark').text()) != ''){
					   $('#bill_landmark').val($.trim($('#auto-landmark').text()));
				   }
				   if($('#auto-city').length > 0 && $.trim($('#auto-city').text()) != ''){
					   $('#bill_city').val($.trim($('#auto-city').text()));
				   }
				   if($('#auto-country').length > 0 && $.trim($('#auto-country').text()) != ''){
					   var bill_country_id ='';
					   $("#bill_country_id option").each(function() {
						   if($(this).text() == $.trim($('#auto-country').text())) {
							   bill_country_id = $(this).val();           
						   }                        
					   });
					   $("#bill_country_id").val(bill_country_id);
					   if($.trim($('#auto-country').text().toLowerCase()) != 'india'){
						   $( '#bill_region_txtbox').val($.trim($('#auto-state').text())).removeAttr('disabled').attr('validate','1').focus().show();
						   $( '#bill_region_select').val('').trigger('change').removeAttr('validate').attr('disabled','disabled').next(".select2-container").hide();
						   $( '#bill_postcode' ).attr('type','text').attr('maxlength',10).removeAttr('validate').removeAttr('data-valid-attr');
						   $( '#bill_postcode' ).off('blur').off('keydown').off('keyup').off('keypress');
						   $( '#billAddAddrFrm' ).find('div').removeClass('frm-success-wrap').removeClass('frm-error-wrap');
						   $( '#billAddAddrFrm' ).find('.error-msg').hide();
					   }else{
						   $( "#bill_region_select").val($('#auto-state').text()).trigger('change').removeAttr('disabled').attr('validate','1').next(".select2-container").show();
						   $( '#bill_region_txtbox' ).val( '' ).removeAttr('validate').attr('disabled','disabled').hide();
						   $( '#bill_postcode' ).attr('type','number').attr('maxlength',6).attr('validate','1').attr("data-valid-attr","pincode");
						   PF.CHECKOUT.postCodeCheck();
					   }
				   }
				   if($('#auto-mobile').length > 0 && $.trim($('#auto-mobile').text()) != ''){
					   $('#bill_mobile').val($.trim($('#auto-mobile').text()));
				   }
			       $('.ck-bill-addr-frm-wrap').show(); 
			    });
				/** End of code added by prathamesh for Address Page Redesign 2017 changes */
			    
			    //For Adding new address
			    $('.ck-del-addr-add-new').click(function () {
			    	$('#editdeladdr').html('ADD NEW ADDRESS');
			        $('.ck-del-addr-list-wrap').slideUp(100);
			        $('.ck-saved-addr-back-wrap').show(200);
			        $(this).hide();
			        $( '#save_address' ).val( 1 );
			        $('.ck-del-addr-add-frm-wrap').slideDown(300);
			        $('html, body').animate({
			           scrollTop: $(".ck-addr-selection-left-wrap").offset().top
			       }, 2000);
			        if($('#pincode_error_shipping').length>0){
				        $('#pincode_error_shipping').html('');
			        }
			        utils.createCookie( 'pincode_service_call','add_address'); // Handles add/edit sliders functionality
			        o.removeAllAddressMessages();
			        PF.HEADER.resetFormByFormID('address_select_form');
			    });
//			                            For going back to address list
			    $('.ck-saved-addr-back-wrap').click(function () {
			        $(this).hide();
			        $('.ck-del-addr-list-wrap').slideDown(300);
			        $('.ck-del-addr-add-new').slideDown(300);
			        $('.ck-del-addr-add-frm-wrap,.ck-del-addr-edit-frm-wrap').slideUp(100);
			        o.serviceCallForSelectedAddress();
			    });
			    $('.ck-addr-frm-cancel-btn').click(function () {
			        $('.ck-saved-addr-back-wrap').hide();
			        $('.ck-del-addr-add-frm-wrap,.ck-del-addr-edit-frm-wrap').slideUp(100);
			        $('.ck-del-addr-list-wrap').slideDown(300);
			        $('.ck-del-addr-add-new').slideDown(300);
			        if($(this).parents('form').attr('id') == 'address_select_form'){
			        	o.serviceCallForSelectedAddress();
			        }
			        if(!$('#billing_address_changed')){
			        	o.checkAssemblyPincode();
			        }
			    });
			    /** Added by prathamesh to clear form fields on click of button or link **/
			    $('.clear-form-fields').click(function () {
			    	PF.HEADER.resetFormByFormID($(this).parents('form').attr('id'));
			    }),
			    $('.newbillingaddr .ck-addr-frm-cancel-btn').click(function () {
			        $(this).closest('.popup-box').fadeOut(200);
			        $('#popup_overlay,.popup_overlay').hide(100);
			        $('body').removeClass('active');
			    });

			    $('.serviceCallForSelectedAddress').click(function () {
			    	o.serviceCallForSelectedAddress();
			    });

//			        bill modal
			    $('.ck-bil-addr-slide').click(function () {
			        $('.ck-bil-addr-slide').removeClass('selected');
			        $(this).addClass('selected');
			    });
			    $('.ck-bill-addr-add-new').click(function () {
			        $('.ck-bil-addr-sel-wrap, .ck-bill-addr-add-new').hide();
			        $('.ck-bill-addr-frm-wrap').show();
			        PF.HEADER.resetFormByFormID('billAddAddrFrm');
			    });
			    $('.ck-addr-frm-cancel-btn').click(function () {
			        $('.ck-bill-addr-frm-wrap,.ck-bill-addr-edit-frm-wrap').hide();
			        $('.ck-bil-addr-sel-wrap,.ck-bil-addr-add-new-wrap, .ck-bill-addr-add-new').show();
			    });

			    //address selection
			    $('.ck-del-addr-list-item-content label').click(function () {
			        $('.ck-del-addr-list-item').removeClass('selected');
			        $(this).closest('.ck-del-addr-list-item').addClass('selected');
			    });
			    
			    
			    /** 
			     * @author: prathamesh.s 
			     * @desc: To Auto Populate Address
			     **/
			    var AutoPopulateArray = [{"auto-fn":{"firstname":"text"}},
								    	{"auto-ln":{"lastname":"text"}},
								    	{"auto-addr-txt":{"street":"text"}},
							    		{"auto-area":{"street2":"text"}},
							    		{"auto-landmark":{"landmark":"text"}},
						    			{"auto-city":{"city":"text"}},
						    			{"auto-pincode":{"postcode":"text"}},
					    				{"auto-state":{"region_select":"select"}},
					    				{"auto-country":{"country_id":"select"}},
					    				{"auto-mobile":{"mobile":"text"}}];
			    
			    
			    $.each(AutoPopulateArray, function(index, item) { 
			    	$.each(item, function(autoFillnode, node) {
			    		$.each(node, function(mainNode, fieldType) {
				    		if(fieldType == "text" && $('#billing_address_changed').val() == 0){
				    			if($.trim($('#'+autoFillnode).text())==''){
				    				$('#'+autoFillnode).text($('#'+mainNode).val());
					    		}
				    			$('#'+mainNode).bind('keypress change keyup', function () {
				    				if($('#billing_address_changed').val() == 0){
				    					$('#'+autoFillnode).text($('#'+mainNode).val());
						    			if($('.add_address_first_time').length > 0){
						    				$('#hidden_'+mainNode).val($('#'+mainNode).val());
						    				$('#hidden_bill_'+mainNode).val($('#'+mainNode).val());
						    			}
				    				}
					    		});
				    		}
				    		else if(fieldType == "select" && $('#billing_address_changed').val() == 0){
				    			if($.trim($('#'+autoFillnode).find(":selected").text())==''){
				    				$('#'+autoFillnode).text($('#'+mainNode).find(":selected").text());
					    		}
				    			$('#'+mainNode).bind('change', function () {
				    				if($('#billing_address_changed').val() == 0){
						    			$('#'+autoFillnode).text($('#'+mainNode).find(":selected").text());
						    			if($('.add_address_first_time').length > 0){
						    				$('#hidden_'+$('#'+mainNode).attr('name')).val($('#'+mainNode).val());
						    				$('#hidden_bill_'+$('#'+mainNode).attr('name')).val($('#'+mainNode).val());
						    			}
				    				}
				    			});
				    		}
					    });
				    });
			    });
			    /** End of code added by prathamesh.s to Auto Populate Address **/
			    
			    //Change Billing address reset
			    $('.ck-bill-change-link').click(function () {
			        $('.ck-bil-addr-sel-wrap, .ck-bil-addr-add-new-wrap,.ck-bill-addr-add-new').show();
			        $('.ck-bill-addr-frm-wrap,.ck-bill-addr-edit-frm-wrap').hide();
			    });
			    

//			    Billing Address selection

			    $('.ck-bil-addr-slide').click(function (e) {
			        $('.ck-bil-addr-slide').removeClass('selected');
			        $(this).addClass('selected');
			        $(this).closest('.popup-box').fadeOut(200);
			        $('#popup_overlay,.popup_overlay').hide(100);
			        $('body').removeClass('active');
			        //$(".ck-bill-addr-content").html($(this).children(".class-billing-front").html());
			        var entity_id = $(this).children('[name="billing_address_id"]').val();
			        utils.createCookie( 'billing_address_changed', 1 ); // Set cookie on selecting Billing address
			        o.setBillingAddress(entity_id);
			        e.stopPropagation();
			    });

			    $('#btn_save_shipping').click(function(){
			    	//remove multiple spaces, new lines with single space 
			    	var string = $('#street').val();
	            	string = string.replace(/\s\s+/g, ' ');
	            	$('#address_select_form #street').val(string);
	                $("#address_select_form").submit();
	            });
	                
			    $('#btn_save_billing').click(function(){
                    var error = true;
                    error = PF.HEADER.validateForm('','billAddAddrFrm');
                    if(!error){
                    	//remove multiple spaces, new lines with single space 
                		var string = $('#bill_street').val();
		            	string = string.replace(/\s\s+/g, ' ');
		            	$('#bill_street').val(string);
                    	if($('#billing_address_changed').length > 0){
                    		var billform = $('.ck-bill-addr-frm-wrap'); //billing section
                        	var shipform = $('.ck-addr-frm-wrap');

                        	if(billform.find('.ck-pincode-ip').val() == shipform.find('.ck-pincode-ip').val() &&
                    		billform.find('.ck-fname-ip').val() == shipform.find('.ck-fname-ip').val() && 
                    		billform.find('.ck-lname-ip').val() == shipform.find('.ck-lname-ip').val() &&
                    		billform.find('.ck-addr-ip').val() == shipform.find('.ck-addr-ip').val() &&
                    		billform.find('.ck-city-ip').val() == shipform.find('#city').val() &&
                    		billform.find('.ck-state-select').val() == shipform.find('.ck-state-select').val() &&
                    		billform.find('#bill_street2').val() == shipform.find('#street2').val() &&
                    		billform.find('#bill_landmark').val() == shipform.find('#landmark').val() &&
                    		billform.find('.ck-mobile-ip').val() == shipform.find('.ck-mobile-ip').val()
                    		){
                        		$('#billing_address_changed').val('0');
                  			    $('#save_billing_address').val('0');
                  			    utils.createCookie('billing_address_changed',0);
                        	}
                        	else{
                        		var AutoPopulateArray = [{"auto-fn":{"firstname":"text"}},
                   								    	{"auto-ln":{"lastname":"text"}},
                   								    	{"auto-addr-txt":{"street":"text"}},
                   							    		{"auto-area":{"street2":"text"}},
                   							    		{"auto-landmark":{"landmark":"text"}},
                   						    			{"auto-city":{"city":"text"}},
                   						    			{"auto-pincode":{"postcode":"text"}},
                   					    				{"auto-state":{"region_select":"select"}},
                   					    				{"auto-country":{"country_id":"select"}},
                   					    				{"auto-mobile":{"mobile":"text"}}];
                   			    
                   			    $.each(AutoPopulateArray, function(index, item) { 
                   			    	$.each(item, function(autoFillnode, node) {
                   			    		$.each(node, function(mainNode, fieldType) {
                   			    			
                   				    		if(fieldType == "text"){
                   				    			$('#'+autoFillnode).text($('#bill_'+mainNode).val());
                   				    			$('#hidden_bill_'+mainNode).val($('#bill_'+mainNode).val());
                   				    		}
                   				    		else if(fieldType == "select"){
                   				    			$('#'+autoFillnode).text($('#bill_'+mainNode).find(":selected").text());
                   				    			$('#hidden_bill_'+$('#'+mainNode).attr('name')).val($('#bill_'+mainNode).val());
                   				    		}
                   				    		
                   				    		if(mainNode == 'country_id' && $('#bill_'+mainNode).val() != 'IN'){
                   				    			$('#hidden_bill_region').val($('#bill_region_txtbox').val());
                   				    			$('#auto-state').text($('#bill_region_txtbox').val());
                   				    		}
                   					    });
                   				    });
                   			    });
                   			    $('#billing_address_changed').val('1');
                   			    $('#save_billing_address').val('1');
                   			    utils.createCookie('billing_address_changed',1);
                         	}
                        	$('.popup-close').trigger('click'); // For First time && Guest User
                    	}
                    	else {
                    		$("#billAddAddrFrm").submit(); // For logged In User
                    	}
                    }
	           }); 	
			    
			    $('#guestAddressSubmit').click(function(){
                    var error = true;
                    error = PF.HEADER.validateForm('','address_select_form');
                    if(!error){
                    	$("#address_select_form").submit();
                    }
			    }); 
				
				/* End of code added by prathamesh for Address Page Redesign changes */

			    // On load set pincode_service_call to select_address as it allows sliders to locate pincode service calls
			    utils.createCookie( 'pincode_service_call','select_address');
			    
				//CASHE BACK
				o.displayCashbackMessage();				
				o.emiOptionDisplay();
				o.billAddrSelSlider();
            	o.initSliders();
            	if($('.ck-state-select').length > 0){
            		$(".ck-state-select,.ck-country-select").select2();
            	}
            },
			setEventHandlers : function() {
				// dumping ground for all events on the checkout page(-s)
				$('.ck-sku-row-wrap').on('click', '.trash, div.ck-item-rmd-msg-wrap, div.ck-item-wl-msg-wrap', function (e) { 
					e.preventDefault();
					$( '.cart-loader' ).show();
					switch( $( this ).attr( 'class' ).toLowerCase() ) {
						case 'trash':
							o.deleteProductFromCart( this );
							$( '.pf-tooltip' ).remove();
							break;
						case 'ck-item-rmd-msg-wrap':
						case 'ck-item-wl-msg-wrap':
							o.undoDeleteProductFromCart( this );
							$( '.pf-tooltip' ).remove();
							break;
						default:
							break;
					}
                                       // $( '.cart-loader' ).hide();
				});

				$( 'select.country_common:visible' ).change( function() {
					var country_id = $( this ).val();

					if( country_id != "IN" ) {
							$( '#postcode' ).attr( "maxlength",10 );
							$( '#bill_postcode' ).attr( "maxlength",10 );
					} else {
							$( '#postcode' ).attr( 'maxlength', 6 );
							$( '#bill_postcode' ).attr( 'maxlength', 6 );
							o.postCodeCheck();
					}
				});

				/**
				 * Register select2 event handlers
				 */
				$( '.ck-gb-select' ).on({
					change : function( e ) {
						try {
							var el = $( e.target ).find( 'option:selected' );

							if( $( '#payment_method' ).val().toLowerCase() == 'cbc' ) {
								cbcObj.charge = parseFloat( el.data( 'cbccharge' ) );
								cbcObj.oid = parseFloat( el.data( 'oid' ) );
							}

							// set the payment method selected
							if(parseInt(el.val())){ 
								o.setPaymentMethod( el.val(), el.text() );
							}else{
								$('.emi-bank-container').css('display','none');
							}
							
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

							/**
							* @description part pay pre id to reset part pay options
							*/
							var preId = '';
							var isPartPay = $( "#checkoutPartPayContainer" ).css( "display" );
							if( ( isPartPay != 'none' ) && ( typeof isPartPay != 'undefined' ) ) {
							   preId = 'partpay_';
							}

							var input_type = $( '#payment_method' ).val().toLowerCase();
							if( input_type == 'emi' ) {
								$( '#tenure' ).html( $( '#' + value + ' label' ).html().toLowerCase() );
								$( '#charge' ).html( $( '#' + value + ' .ck-emi-td.rate' ).html() );
                                //show emi discount for no cost emi in payment tooltip
                                emidisc = 0;
                                $('#emi_disc').css('display','none');
                                var emidisc = $(this).closest('.ck-emi-tr').find('.nc-emi-discount').text();
                                if(emidisc != 0){
                                    $('#emi_disc').css('display','block');
                                    $('#emi_intr').html(emidisc); 
                                }
								$( '#no_bank' ).css( 'display','none' );
								$( '#emi_note' ).css( 'display','block' );
							} else if(input_type == 'credit_card' ) {
								if( parseInt( value ) == 0 ) {
									$( ' #' + preId +'credit_bank_select' ).show();
									$( ' #s2id_' + preId +'credit_bank_select' ).show();
								} else {
									$( '#' + preId +'credit_bank_select' ).hide();
									$( ' #s2id_' + preId +'credit_bank_select' ).hide();
									$('#credit_bank_select').siblings('.select2-container').hide();
								}
							} else if( input_type == 'debit_card' ) {
								$( ' #' + preId +'bank_select_visa' ).hide();
								$( ' #' + preId +'bank_select_master' ).hide();
								$( ' #' + preId +'bank_select_maestro' ).hide();
								// select2 plugin
								$( ' #s2id_' + preId +'bank_select_visa' ).hide();
								$( ' #s2id_' + preId +'bank_select_master' ).hide();
								$( ' #s2id_' + preId +'bank_select_maestro' ).hide();
                                $('#bank_select_maestro').siblings('.select2-container').hide();
								$('#bank_select_visa').siblings('.select2-container').hide();
								$('#bank_select_master').siblings('.select2-container').hide();

								if( parseInt( value ) == 0 ) {
									$( ' #' + preId +'bank_select_maestro' ).show();
									$( ' #s2id_' + preId +'bank_select_maestro' ).show();
									$( ' #' + preId +'bank_select_maestro' ).siblings('.select2-container').show();
									$(this).parent('.ck-payment-cards').click();
								}
							} else if( input_type == 'cod' ) {
								var total_pay = parseInt( $( '#total_pay_amount' ).val() ) - parseInt( $( '#online_shipping_charge' ).val() ) + parseInt( $( '#cod_shipping_charge' ).val() );
                                                                //adding shipping cod values to payment tooltip
                                                                var shipping_cod = parseInt( $( '#online_shipping_charge' ).val() ) + parseInt( $( '#cod_shipping_charge' ).val() );
                                                                var cod_ship = utils.currencyFormat(Math.ceil( shipping_cod ) );
                                                                $( '#shipping_cod' ).html( 'Rs. ' + cod_ship );
								var _pmt = utils.currencyFormat(Math.ceil( total_pay ) );
								$( '#payment_form' ).find( '.final-pricing-checkout .txt-red' ).html( 'Rs. ' + _pmt );
								$( '#total_pay_coupon_top' ).html( 'Rs. ' + _pmt );
                                                                $('.total_pay_coupon_top').html( 'Rs. ' + _pmt );
                                                                $('#grow-tree-contri').css('display','none');
								_pmt = cod_ship = '';
							} else if( input_type == 'paypal' ) {
								$( this ).parent().addClass( 'active' );
							}

							if( input_type != 'cbc' ) {
								$( '#payment_' + input_type ).val( value );
								$( '#payment_option_selected' ).val( value );
							} else if( input_type != 'net_banking' ) {
                                                                var defaultselect = $( '#ckPaymentMethodContainer #partPayOptionArea select').find( 'option:first' ).val();
                                                                $( '#s2id_partpay_bank_select' ).select2( 'val', defaultselect );
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
								} else {
                                                                    if( $( this ).attr( 'id' ) == 'cashpayDeposit' ) {
                                                                        $( '#s2id_bank_select_deposit' ).show();
                                                                    } else if( $( this ).attr( 'id' ) == 'cashpayDoorstep' ) {
                                                                        $( '#s2id_bank_select_pickup' ).show();
                                                                    }
                                                                }

								//Below code is to update 'Amount Payable' in case of CBC
								if( !isNaN( cbc_charge ) ) {
									var total = parseInt( $( '#total_pay_amount' ).val() );
									var cbc_added = total * ( parseFloat( cbc_charge ) ) / 100;
									var total_pay = total + Math.ceil( cbc_added ) + growtreeVal;
                                                                        //adding cbc charges to payment tooltip
                                                                        var shipping_cod = parseInt( $( '#online_shipping_charge' ).val() ) + Math.ceil(cbc_added);
									var _pmt = utils.currencyFormat( Math.ceil( total_pay ) );
									$( '#payment_form' ).find( '.final-pricing-checkout .txt-red' ).html( 'Rs. ' + _pmt );
                                                                        $( '#shipping_cod' ).html( 'Rs. ' + shipping_cod );
									$( '#total_pay_coupon_top' ).html( 'Rs. ' + _pmt );
                                                                        $('.total_pay_coupon_top').html( 'Rs. ' + _pmt );
									_pmt = '';
                                                                        shipping_cod = "";

									//adding extra amount to be added in this hidden attribute for handling grow tree calculation in case of CBC
									$( '#cbc_added_amount' ).attr( 'data-cbc-amount', Math.ceil( cbc_added ) );

                                                                        // added to show cbc charges on option selection
                                                                        var _final_cbc_added = Math.ceil( cbc_added );
                                                                        if( _final_cbc_added > 0 && $( this ).attr( 'id' ) == 'cashpayDoorstep' ) {
                                                                            $( '#cbc_amt' ).text( 'of ' + _final_cbc_added );
                                                                            $( '#cbc_charge_show' ).text( '+ Rs.' + _final_cbc_added );
                                                                            $( '#cbc_charge_show, #cbc_collect_cash' ).show();
                                                                            $( '#non-refund-cbc-note' ).text( 'Non Refundable CashPay charge of ' + _final_cbc_added + ' applicable' ).show();
                                                                            $( '.cbc_charges' ).text( 'Rs.' + ( total + growtreeVal ) + ' + Rs.' + _final_cbc_added ).show();
                                                                        }
								} else {
									//Below block is to make cbc_charge span blank and showing total amount without adding any charges when no option is selected from the dropdown in case of CBC 'deposit in bank option'(which is currently disabled)
									var total = parseInt( $( '#total_pay_amount' ).val() );
									var total_pay = total + growtreeVal;

									var _pmt = utils.currencyFormat( Math.ceil( total_pay ) );
									$( '#payment_form' ).find( '.final-pricing-checkout .txt-red' ).html( 'Rs. ' + _pmt );
									$( '#total_pay_coupon_top' ).html( 'Rs. ' + _pmt );
                                                                        $( '.total_pay_coupon_top' ).html( 'Rs. ' + _pmt );
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
						var newpartamtval = $.cookie("newpartamt");

						if (!isNaN(part_remaining_amount)) {
						  var complete_remaining_amount = total - part_remaining_amount;
						  var convenience_fee = parseInt($("#convenience_fee").attr("data-convenience_fee"));

						  if (!isNaN(convenience_fee)) {
						  	 complete_remaining_amount = complete_remaining_amount + convenience_fee;
							 //complete_remaining_amount = newpartamtval;

						  }
						  if ($("#growTree").is(":checked")) {
							complete_remaining_amount = parseInt(complete_remaining_amount) + parseInt(donation);
							// complete_remaining_amount = newpartamtval;
						  }
						  else{
						  	complete_remaining_amount = $(".checkout-partpay-amount").attr('data-netpayable');
						  }
						  $(".final-pricing-checkout .txt-red").html("Rs. " + utils.currencyFormat(Math.ceil(complete_remaining_amount)));
						  $( '#total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( complete_remaining_amount ) ) );
                                                  $( '.total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( complete_remaining_amount ) ) );
						}
						// complete_remaining_amount = $("#growtree_pay_amount").val();
						$( '#total_pay_coupon1' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil(complete_remaining_amount) ));
						$( '#total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil(complete_remaining_amount) ));
                                                $( '.total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil(complete_remaining_amount) ));
						o.handlePartPay("checked", part_remaining_amount, complete_remaining_amount);

					  } else {
						$('#checkoutPaySecureBtn').addClass('disabled');
						$('#partPayBreakupDetail').slideDown();
						$('#partPayAmtView, #partPayDropDown').hide();
						var complete_remaining_amount = parseInt($('#total_pay_amount').val());
						var newpartamtval = $.cookie("newpartamt");

						if ($("#growTree").is(":checked")) {

						  //complete_remaining_amount = complete_remaining_amount + parseInt(donation);
						  complete_remaining_amount = newpartamtval;
						}

						$(".final-pricing-checkout .txt-red").html("Rs. " + utils.currencyFormat(Math.ceil(complete_remaining_amount)));
						$( '#total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( complete_remaining_amount ) ) );
                                                $( '.total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( complete_remaining_amount ) ) );
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
										$("#payment_form").find(".final-pricing-checkout .txt-red").html("Rs. "+utils.currencyFormat(Math.ceil(complete_total)));
										$( '#total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat(Math.ceil(complete_total)) );
                                                                                $( '.total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat(Math.ceil(complete_total)) );
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
                                            $("#payment_form").find(".final-pricing-checkout .txt-red").html("Rs. "+utils.currencyFormat(Math.ceil(complete_total)));
											$( '#total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat(Math.ceil(complete_total)) );
                                                                                        $( '.total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat(Math.ceil(complete_total)) );
                                    }
                                    o.checkCBCrange(complete_total);
                            }
                            /* Code for CBC ends */
                    }

                    o.handleWalletError();
				});
				/* HANDLE BUTTON LOADER START */
				if ( $( 'a.btn_green, a.btn_green_big, a.green-action-btn' ).data( 'isloading' ) != "undefined" ) {
					$( 'a.btn_green, a.btn_green_big, a.green-action-btn' ).on( 'click' , function(e) {
						e.preventDefault();
						if( $( this ).attr( "data-isloader" ) != 'undefined' && $( this ).attr( "data-isloader" ) == '1' ) {
							if( $( this ).attr( 'href' ) != 'undefined' && $( this ).attr( 'href' ) != 'javascript:void(0)' ) {
								o.changeButtonState( 'loading' );
								location.href = $( this ).attr( 'href' );
							}
						}
					});
				}
				/* HANDLE BUTTON LOADER START */
			},
			deleteProductFromCart : function( el ) {

				var pid = $.trim( $( el ).data( 'id' ) )	;
				
				if( ( pid != '' ) ) { //&& ( $( '#cartitem_' + pid ).length > 0 ) 
					var _url = root_url + '/cart/removeitem/' + pid + '/1/1';
					var _params = {
						'pid' : pid.split(','),
						'evt' : el,
						'evt_class': $.trim( $( el ).attr( 'class' ) )
					};

					utils.makeRequest( _url, 'POST', {}, o.handleDeleteCartProduct, o.handleError, '', _params );
				}
			},
			handleDeleteCartProduct : function( _data, _params ) { 

				$( '.cart-loader' ).hide();

                var data;
                var _param_class = '';

				try {
                    data = $.parseJSON( _data );
				} catch( _error ) {
                    data = _data;
				}

				var valid_item = (parseInt(data.valid_items) > 1)?data.valid_items+' Items':data.valid_items+' Item';
				$('h2.ck-pg-title span').text('('+valid_item+')');

				$.each(_params.pid, function(inx, el){

					var _params_pid = el;

					//Added code for gift card phase - 2
					var giftcount = $('#gift_card_count').val();
					var physicalGiftCount = data.physical_giftcard_count;

					o.removecartgtm(_params_pid);

					//Added code for gift card phase - 2
					if(giftcount > 0){
						var isGiftCard = $('#giftcard_'+_params_pid).val();
						var giftCardNature = $('#giftcard_nature_'+_params_pid).val();
						
						if(isGiftCard == 1){
							giftcount = giftcount - 1;
							$('input#gift_card_count').val(giftcount);
						}
						if(giftCardNature){
							giftCardNature = giftCardNature.toLowerCase()
							if(giftCardNature == 'physical'){
								$('input#physical_giftcard_count').val(physicalGiftCount);
							}
						}
					}
					
					if(giftcount <= 5){
						$('#maxGiftcard_error_msg').css("display", "none");					
					}

					if(typeof physicalGiftCount === 'undefined' || physicalGiftCount == 0){					
						$( '#physical_gc_charge' ).attr( 'data-gc-amount', 0 );						
						$( '#physical_gc_charge .price-nmbr' ).html( 'Rs. ' + 0 );
						$( '#physical_gc_charge div' ).hide();
						$('#physical_gc_charge_hidden').val(0);					
					}
					//End of code
					

					switch(_params.evt_class) {
						case 'trash': // remove item

							$( '#cartitem_' + _params_pid ).siblings('.ck-item-rmd-msg-wrap').attr( 'data-hash', data.removed_item );
							$('div[id^="cartitem_'+_params_pid+'"]').closest('.ck-sku-row-content').siblings('.ck-item-rmd-msg-wrap').slideDown('300');
							$('div[id^="cartitem_'+_params_pid+'"]').closest('.ck-sku-row-wrap .ck-sku-row-content').slideUp('300');	
							if( $( '#additional_discount' ).length > 0 ) {
                                                            //if coupon discount is 0, remove discounts applied on cart products(adde by Nishigandha N)
                                                            o.removeRowDiscount();
                                                        }
							/* UNDO OPTION APPEARS ONLY FOR NON OUT OF STOCK PRODUCT */
							o.cachedObjects[ data.removed_item ] = $.extend( true, {}, $( '#cartitem_' + _params_pid ) );
							// show the undo button for pre-determined interval
							o.timedObjects[ data.removed_item ] = setTimeout( function() {
								
								if($('.ck-sku-row-wrap').length == 1){
									$( '.btn_green_big' ).addClass( 'disabled' );
								}
								o.deleteTimedObject( _params_pid, data.removed_item );										
							}, o.timeToLive);
							$( '.ck-sku-row-wrap div[id^="cartitem_'+_params_pid+'"]' ).remove();
							break;

						case 'ck-sku-add-wl-link': //add item to wishlist
							
							$( '#cartitem_' + _params_pid ).siblings('.ck-item-wl-msg-wrap').attr( 'data-hash', data.removed_item );
							$('div[id^="cartitem_'+_params_pid+'"]').closest('.ck-sku-row-content').siblings('.ck-item-wl-msg-wrap').slideDown('300');
							$('div[id^="cartitem_'+_params_pid+'"]').closest('.ck-sku-row-wrap .ck-sku-row-content').slideUp('300');	
							
							/* UNDO OPTION APPEARS ONLY FOR NON OUT OF STOCK PRODUCT */
							o.cachedObjects[ data.removed_item ] = $.extend( true, {}, $( '#cartitem_' + _params_pid ) );
							// show the undo button for pre-determined interval
							o.timedObjects[ data.removed_item ] = setTimeout( function() {
								
								if($('.ck-sku-row-wrap').length == 1){
									$( '.btn_green_big' ).addClass( 'disabled' );
								}
								o.deleteTimedObject( _params_pid, data.removed_item );										
							}, o.timeToLive);
							$( '.ck-sku-row-wrap div[id^="cartitem_'+_params_pid+'"]' ).remove();
							break;

						case 'ck-non-del-rmv-link': //add to wishlist from oos/non-del block
						// if/else will come
							
							$( '#cartitem_' + _params.pid[0] ).siblings('.ck-item-wl-msg-wrap').attr( 'data-hash', data.removed_item );
							_param_class = $('.ck-non-del-rmv-link');			        
					        // _param_class.parents('.ck-non-del-product-slider-wrap').css("margin-left","0");
					        var nonDelItemsCnt = $('div[id^="rm_cartitem_'+_params.pid[0]+'"].ck-non-del-product-slide').parents('.ck-non-del-product-slider-wrap').children('.ck-non-del-product-slide').length;
					        
					        if (nonDelItemsCnt > 1) {
					            _param_class.parents('.ck-non-del-product').find('.ck-non-del-wl-msg').css('display', 'inline-block');
					            _param_class.closest('div[id^="rm_cartitem_'+_params.pid[0]+'"].ck-non-del-product-slide').slideUp().remove();

						        o.osNonDelSlider();
						       
					            var set_itm_lenth = $('.os-non-del-ext-wrap .ck-non-del-product-slider-wrap');
			                    var nchildren = set_itm_lenth.children('.ck-non-del-product-slide').length;
			                    set_itm_lenth.siblings('.ck-non-del-product-cnt ').children('.ck-non-del-product-cnt-no').text(nchildren);

					            $('.ck-non-rmd-msg-wrap .txt-cnt').text(parseInt(nonDelItemsCnt)-1);
					            // $('.ck-non-del-product-cnt-no').text(parseInt(nonDelItemsCnt)-1);
					            setTimeout(function(){ $('.ck-non-del-rmv-wl-wrap .ck-non-del-wl-msg').hide(); }, 5000);					         
					        } else {
					        	$('.ck-non-rmd-msg-wrap .final-rmtxt').text('added to wishlist');
					            $('.ck-non-del-rmv-link').parents('.ck-non-del-wrap').hide();
					            $('.ck-non-del-rmv-link').parents('.os-non-del-ext-wrap').children('.ck-non-rmd-msg-wrap').slideDown(100);
					            $('.ck-non-del-rmv-link').closest('.ck-non-del-product-slide').slideUp().remove();
					            setTimeout(function(){ $('.ck-non-rmd-msg-wrap').hide(); }, 5000);				           			            
					        }

					        /* UNDO OPTION APPEARS ONLY FOR NON OUT OF STOCK PRODUCT */
					        o.cachedObjects[ data.removed_item ] = $.extend( true, {}, $( '#cartitem_' + _params.pid[0] ) );
					        o.deleteTimedObject( _params.pid[0], data.removed_item );	
					        //For only pincode
					        //Added below check since OOS addtowishlist doesn't have below element
					        $( '.ck-sku-row-wrap div[id^="cartitem_'+_params.pid[0]+'"]' ).remove();

							break;
						case 'ck-non-oos-rmv-link': //add to wishlist from oos/non-del block
						// if/else will come
							
							_param_class = $('.ck-non-oos-rmv-link');			        
					        // _param_class.parents('.ck-non-del-product-slider-wrap').css("margin-left","0");
					        var nonDelItemsCnt = $('div[id^="rm_cartitem_'+_params.pid[0]+'"].ck-non-del-product-slide').parents('.ck-non-del-product-slider-wrap').children('.ck-non-del-product-slide').length;
					        _param_class.closest('div[id^="rm_cartitem_'+_params.pid[0]+'"].ck-non-del-product-slide').slideUp().remove();

					        if (nonDelItemsCnt > 1) {
					            _param_class.parents('.ck-non-del-product').find('.ck-non-del-wl-msg').css('display', 'inline-block');					            
					            // 
					            var notify_ids = $('.ck-non-oos-rm-btn').attr('data-id');
					            var notify_arr = JSON.parse("[" + notify_ids + "]");
					            notify_arr = jQuery.grep(notify_arr, function(value) {
									  return value != _params.pid[0];
									});
					            $('.ck-non-oos-rm-btn').attr('data-id', notify_arr.toString());
					            //
					            // 
					            var notify_ids = $('input[name="ck_oos_notify_btn"]').attr('data-id');
					            var notify_arr = JSON.parse("[" + notify_ids + "]");
					            notify_arr = jQuery.grep(notify_arr, function(value) {
									  return value != _params.pid[0];
									});
					            $('input[name="ck_oos_notify_btn"]').attr('data-id', notify_arr.toString());
					            // 
					            o.osOosSlider();
					            $('.ck-oos-rmd-msg-wrap .txt-cnt').text(parseInt(nonDelItemsCnt)-1);
					            setTimeout(function(){ $('.ck-non-del-rmv-wl-wrap .ck-non-del-wl-msg').hide(); }, 5000);
					         
					        } else {
					        	$('.ck-oos-rmd-msg-wrap .final-rmtxt').text('added to wishlist');
					            $('.ck-non-oos-rm-btn').parents('.ck-non-del-wrap').hide();
					            $('.ck-non-oos-rm-btn').parents('.os-oos-ext-wrap').children('.ck-oos-rmd-msg-wrap').slideDown(100);
					            $('.ck-non-oos-rm-btn').closest('.ck-non-del-product-slide').slideUp().remove();
					            setTimeout(function(){ $('.ck-oos-rmd-msg-wrap').hide(); }, 5000);					            
					        }
					    	
							break;							
						default:
							break;
					}
				});

				o.handleCartBehaviour(data);

				switch(_params.evt_class){
					case 'ck-non-oos-rm-btn': // remove bulk oos items
						
						_param_class = $('.ck-non-oos-rmv-link');	
						_param_class.parents('.ck-non-del-wrap').hide();
			            _param_class.parents('.os-oos-ext-wrap').children('.ck-oos-rmd-msg-wrap').slideDown(100);
			            _param_class.closest('.ck-non-del-product-slide').slideUp().remove();			            	

			            //If pincode failed items present in cart, display 
			            if(data.pincode && data.pincode_failed){
				            var data_pincode_failed = data.pincode_failed;
				            o.createPincodeErrorblock(data_pincode_failed);
		                	o.osOosSlider();
		                	$('#ckNonDelWrap').css('display', 'block');
		                	$('.os-non-del-ext-wrap').css('display', 'block');
						}		                
		                setTimeout(function(){ $('.ck-oos-rmd-msg-wrap').hide(); }, 3000);
						break;
					case 'ck-non-del-rm-btn': // remove bulk non del items
						_param_class = $('.ck-non-del-rmv-link');

						//For failed pincode products, cart item exists, which is removed below
					    //This helps page redirect to empty cart page after 'Remove these items' clicked
						var cart_failed_itms = $(_params.evt).attr('data-id').split(',');
						if(cart_failed_itms){
							$.each(cart_failed_itms, function(inx, el){
								o.cachedObjects[ data.removed_item ] = $.extend( true, {}, $( '#cartitem_' + el ) );
						        o.deleteTimedObject( el, data.removed_item );
						        $( '.ck-sku-row-wrap div[id^="cartitem_'+el+'"]' ).remove();
							});
						}
						
						_param_class.parents('.ck-non-del-wrap').hide();
			            _param_class.parents('.os-non-del-ext-wrap').children('.ck-non-rmd-msg-wrap').slideDown(100);
			            _param_class.closest('.ck-non-del-product-slide').slideUp().remove();
			             setTimeout(function(){ $('.ck-non-rmd-msg-wrap').hide(); }, 3000);		
						break;
					default:
						break;
				}

				//Added condition for gift card phase - 2
				if((data.free_gift_panasonic_details.dummy_id_present && !data.free_gift_panasonic_details.status)){
					PF.CHECKOUT.disabled_proceed_to_checkout = true;
					if(!$('.btn_green').hasClass('disabled')){
						$('.btn_green').addClass('disabled')
					}
					if(!$('.btn_green_big').hasClass('disabled')){

						$('.btn_green_big').addClass('disabled')
					}
				}else{
					PF.CHECKOUT.disabled_proceed_to_checkout = false;
				}
				
				if(typeof data.ships_together != 'undefined'){
					o.updateShipTogetherStatus( data.ships_together );
				}
				// CASHE BACK
				o.displayCashbackMessage();

				if(typeof data.giftcard_count != 0 && data.giftcard_count > 0){
					if($('.pincode_serviceable_error_block').length > 0){
						$('.pincode_serviceable_error_block').html('');
						$('.ck-addr-submit-btn').removeClass('disabled');
						if($('.ck-del-addr-list-item').length > 0){
							$('.ck-del-addr-list-item').removeClass('ck-del-addr-error');
						}
					}
				}else{
					setTimeout(function(){ 
						if($('#ckNonDelSilder').children().length == 0 && $('#ckOosProductSlider').children().length == 0 && $('.ck-sku-row-content').children().length == 0){
							o.emptyCart();
						}
					 }, 4000);
				}
				// SHIP_TOGETHER.reset_scroll_bar();
				// recheck cart serviceability
				// $( '.order_summary_pincode_btn' ).click(); - putting it in handleCartBehaviour slideUp function to prevent race condition

			},
			deleteTimedObject : function( pid, hash ) {
				try {
					$( 'div[data-hash="' + hash + '"]' ).hide().removeAttr( 'data-hash' );
					clearTimeout( o.timedObjects[ hash ] );
					delete o.timedObjects[ hash ];
					delete o.cachedObjects[ hash ];

					if( $( '.ck-sku-row-content' ).length == 0 ) {
						o.emptyCart();
					}
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
				$( '.cart-loader' ).hide();
				var el = o.cachedObjects[ _params.hash ];
				
				el.insertBefore( $( 'div[data-hash="' + _params.hash + '"]' ).hide() );
        		el.slideDown('300');
		      
				//Added code for gift card phase - 2
				var giftcount = $('#gift_card_count').val();

				var _json;
				try {
					_json = $.parseJSON( data );
				} catch( e ) {
					_json = data;
				}
			
				var physicalGiftCount = _json.physical_giftcard_count;
				var coupon = _json.coupon;
			
				// recheck cart serviceability
				// $( '.order_summary_pincode_btn' ).click(); - added in setPricing slideUp to prevent race condition

				o.deleteTimedObject( _params.id, _params.hash );
				
				//Added code for gift card phase - 2
				var isGiftCard = $('#giftcard_'+_params.id).val();
				if(isGiftCard == 1){
					giftcount = parseInt(giftcount) + 1;
					$('input#gift_card_count').val(giftcount);
				}
				var giftCardNature = $('#giftcard_nature_'+_params.id).val();
				if(typeof giftCardNature != 'undefined'){
					giftCardNature = giftCardNature.toLowerCase();
				}
				if(giftCardNature == 'physical'){					
					$('input#physical_giftcard_count').val(physicalGiftCount);
				}

				if(typeof physicalGiftCount !== 'undefined' && physicalGiftCount != 0){ 

					if(  $( '#physical_gc_charge' ).length > 0 ) { //typeof data.physical_giftcard_charge != 'undefined' && 
						$( '#physical_gc_charge' ).attr( 'data-gc-amount', phsical_gc_charge );				
						$( '#physical_gc_charge .price-nmbr' ).html( 'Rs. ' + phsical_gc_charge );
						$( '#physical_gc_charge div' ).show();
						$('#physical_gc_charge_hidden').val(phsical_gc_charge);
					}
				}				
				
				//Added condition to show shipping charges when bespoke coupon is unset
				if( typeof coupon.success == 'undefined' || coupon.success != true) {					
					$('#checkout_grow_tree' ).show();
					$( '#shipping_handling' ).slideDown( 500 );					
				}
				//End of code

				o.setPricing( data, _params.id );

				var valid_item = (parseInt(_json.valid_items) > 1)?_json.valid_items+' Items':_json.valid_items+' Item';
				$('h2.ck-pg-title span').text('('+valid_item+')');

                o.addOrRemoveGiftCardData( _json.free_gift, _json.total_amount, _json.free_gift_data,_json.is_free_gift_in_cart, _json.delete_free_item); // free gift cal
				o.updateShipTogetherStatus( _json.ships_together );

				if( $( '.ck-sku-row-wrap' ).length == 1 ) {
					$( '.btn_green_big' ).addClass( 'disabled' );
					$( '.btn_green' ).addClass( 'disabled' );
				}
                
				if( o.pageType == 'AddressSelection' && $(".ck-sku-row-wrap .delivery-details  .checkout-message").is(":visible") ) {
					$( '.btn_green_big' ).addClass( 'disabled' );
					$( '.btn_green' ).addClass( 'disabled' );
				}
				
				if(giftcount > 5){
					$('#maxGiftcard_error_msg').css("display", "block");
					$( '.btn_green_big' ).addClass( 'disabled' );
					$( '.btn_green' ).addClass( 'disabled' );
				}
				
				// SHIP_TOGETHER.reset_scroll_bar();
			},
			addWishlistToWishlist : function( el ) {



				var itemK = $(this).attr('data-id');
				var parent_id = $(this).attr('data-parent_id');
				if(parent_id>0){
					PF.UTILITIES.addToWishlist(parent_id, '',0,0,$(this));
				}else{
					PF.UTILITIES.addToWishlist(itemK, '',0,0,$(this));
				}
				$( '.cart-loader' ).show();
				
				
				
			},
			removeProductFromWishlist : function( el ) {

		  		var productNode = $(this).attr( 'data-id' );
				var id = productNode.split( '_' );
				id = id[ 1 ];
				
				if(parseInt($(this).attr( 'data-parent-id' ))){
					id = parseInt($(this).attr( 'data-parent-id' ));
				}

				if(id){
					 $( '.cart-loader' ).show();
					PF.UTILITIES.addToWishlist(id, 'OrderSummary')
				}

			},
			setPricing : function( _data, id ) {

                                var data;
				try {
                                    data = $.parseJSON( _data );
				} catch( _error ) {
                                    data = _data;
				}

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

					if(data.online_shipping_charge == 0 ) {
						if( !$( '#shipping_handling .ck-price-detail-col .ck-free-txt' ).is( ':visible' ) ) {
                                                        $( '#shipping_handling .ck-price-detail-col .ck-free-txt' ).show();
							//$( '<span class="txt-red">(Free)</span>' ).insertAfter( '#shipping_handling .price-dtl' );
						}

						$( '#shipping_handling .price-nmbr' ).html( 'Rs. ' + data.online_shipping_charge );
					} else {
						$( '#shipping_handling .ck-price-detail-col .ck-free-txt' ).hide();
						$( '#shipping_handling .price-nmbr' ).html( 'Rs. ' + data.online_shipping_charge );
					}
				}

				if( typeof coupon.success != 'undefined' && coupon.success == true && $( '#additional_discount' ).length > 0 ) {
					o.updateRowDiscount( coupon.items_discount, data.cart_item );

					$( '#additional_discount' ).attr( 'data-additional-discount-amount', parseInt( coupon.discount_amount ) ).find( '.price-nmbr' ).html( '-Rs. ' + utils.currencyFormat( Math.ceil( parseInt( coupon.discount_amount ) ) ) );
					$( '#coupon-msgs' ).html( coupon.message );

					var tax = coupon.tax_info;
					var total_tax = parseInt( tax.total_tax );
                                        
                                        //Changes added by Nishigandha N 
                                        //Show tax values if not 0
                                        if(Math.ceil( total_tax ) != 0 ) {
                                            $( '#taxes' ).css('display','block');
                                        } 
                                        
					$( '#taxes' ).attr( 'data-total-tax', total_tax ).find( '.price-nmbr' ).html( 'Rs. ' + utils.currencyFormat(Math.ceil( total_tax ) ) );
                                        
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

				if( $( '#fe_points' ).length > 0 && $( '#fe_points' ).is( ':checked' ) ) {
					exchange_discount = parseInt( $( '#fe_discount' ).attr( 'fe-discount-amount' ) );
					total_discount += exchange_discount;
				}

				if($("#taxes").length > 0) {
					total_tax = parseInt($("#taxes").attr("data-total-tax"));
				}

				var cart_total_pay = parseInt( Math.ceil( data.total_amount ) );
				//adding offer price
				o.updateOfferPrice(cart_total_pay,total_discount);
				//ends

				var total_pay = cart_total_pay + total_tax + growtree_amount + shipping_charge - additional_discount - extra_discount - exchange_discount;
				$("#item_total").attr("data-total-amount",cart_total_pay).find(".price-nmbr").html("Rs. "+utils.currencyFormat(Math.ceil(cart_total_pay) ));

				$("#total_pay_coupon").html("Rs. " + utils.currencyFormat(Math.ceil(total_pay) ) );

				var cart_qty = 0;
				$(".item_list_input").each(function() {
					cart_qty = cart_qty + parseInt($(this).val());
				});

				if($("#shoppingcart").length > 0) {
					$("#shoppingcart span").html(cart_qty);
				}

				$( "div[data-id='delcartitem_" + id + "']" ).slideUp( "300", function() {
				// $( "div[data-id='cartitem_" + id + "']" ).slideUp( "300", function() {
					//$( this ).remove();

					//Enable proceed button if no soldout items are there in the cart
					var proceed_btn = $('.column a.btn_green');
					var proceed_btn1 = $('.cart-details a.btn_green_big');

					if($('.order_row_ofs').length == 0 && ( proceed_btn.hasClass('disabled' ) || proceed_btn1.hasClass('disabled' ) ) ){
						proceed_btn.removeClass('disabled');
						proceed_btn1.removeClass('disabled');

						var proceed_to_addr_rel = $( '.column .btn_green' ).attr( 'rel' );

						if( typeof proceed_to_addr_rel !== typeof undefined && proceed_to_addr_rel !== false ) {
							proceed_btn.addClass( 'link_popup' );
							proceed_btn.attr( 'href', "javascript://" );
						} else {
							proceed_btn.attr( 'href', root_url + '/checkout/onepage' );
							proceed_btn1.attr( 'href', root_url + '/checkout/onepage' );
						}
					}

					// recheck cart serviceability as per page
									var _pin = utils.readCookie( 'serviceable_pincode' );
									if( typeof _pin != 'undefined' && _pin) {
                                        if( o.pageType == "OrderSummary" ) {
                                            $( '.order_summary_pincode_btn' ).click();
                                        } else if( o.pageType == "AddressSelection" ) {
                                            o.checkAssemblyPincode();
                                        }
                                    }
				});

				

				//CASHE BACK
				o.displayCashbackMessage();
				o.emiOptionDisplay();
			},
			/**
			 * @author: prathamesh.s
			 * @desc: Added to show non serviceable products on pincode check.
			 **/
			createAddressPincodeErrorblock : function(pincode_data,pincode_service_call) {
				var addr_pincode_error_html = '';
				var total_count 			= 0;
				var ids 					= '';
				var block_id				= '';
				if(pincode_service_call == "add_address"){ // Handles both add and edit sliders
					block_id = "ckAddNewDelAddrSliderWrap";
				}else{
					block_id = "ckDelAddrSelNonDelWrap";
				}
				addr_pincode_error_html += '<div class="ck-non-del-wrap pf-padding-20 pf-padding-10-h pf-white pf-border-width-1 pf-border-style-solid pf-border-red pf-round-medium">';
				addr_pincode_error_html += '<p class="ck-non-del-ttl font-13 pf-semi-bold-text pf-text-red pf-margin-0">Sorry, These item(s) can\'t be shipped to this PINCODE. You may either change the delivery pincode above or remove the item from your order to continue.</p>';
				addr_pincode_error_html += '<div class="ck-non-del-product">';
				addr_pincode_error_html += '<div class="ck-non-del-product-slider-wrap" id="'+block_id+'">';
				
				$.each(pincode_data, function(inx, el){
					addr_pincode_error_html += '<div class="ck-non-del-product-slide pf-padding-10">';
					addr_pincode_error_html += '<div class="ck-non-del-product-img">';
					addr_pincode_error_html += '<img src="'+js_cdn_img_1+''+el.image+'">';
					addr_pincode_error_html += '</div>';
					addr_pincode_error_html += '</div>';
					ids += inx+",";
					total_count++;
                });
				ids = ids.substring(0, ids.length-1);
				addr_pincode_error_html  += '</div>';
				addr_pincode_error_html  += '<span class="ck-non-del-product-cnt font-12 pf-semi-bold-text"><span class="ck-non-del-product-cnt-no">'+total_count+'</span> items</span>';
				addr_pincode_error_html  += '<a href="javascript:void(0)" id="ck-non-del-product-prev" class="ck-bill-addr-prev inactive"></a>';
				addr_pincode_error_html  += '<a href="javascript:void(0)" id="ck-non-del-product-next" class="ck-bill-addr-next"></a>';
				addr_pincode_error_html  += '<div class="ck-non-del-rmv-wl-wrap">';
				addr_pincode_error_html  += '<a href="javascript:void(0)" data-id="'+ids+'" onclick="PF.CHECKOUT.deliveryFailed(this)" class="ck-non-del-rm-btn pf-light-blue pf-round-small">Remove these items</a>';
				addr_pincode_error_html  += '</div>';
				addr_pincode_error_html  += '</div>';
				addr_pincode_error_html  += '</div>';
				return addr_pincode_error_html;
			},
			/**
			 * @author: prathamesh.s
			 * @desc: Added to show serviceable products & their assembly details on pincode check.
			 **/
			create_assembly_info_block : function(data) {
				var assembly_info;
				var delivery_info;
				var valid_items;
				var ships_together;
				
				if( typeof data.assembly_info != 'undefined' ) {
					assembly_info = data.assembly_info;
				}
                if( typeof data.delivery_info != 'undefined' ) {
					delivery_info = data.delivery_info;
				}
                if( typeof data.ships_together != 'undefined' ) {
                	ships_together = data.ships_together;
				}
                if( typeof data.valid_items != 'undefined' ) {
					valid_items = data.valid_items;
				}
                var assembly_info_html 	= '';
				var total_count 		= valid_items;
				$.each(assembly_info, function(inx, el){
					var ships_together_status = false;
					for(var i=0;i<ships_together.pids.length;i++){
						if(ships_together.pids[i] == inx){
							ships_together_status = true;
							break;
						}
					}
					var Delivery_Date = '';
					if(ships_together_status === true && typeof ships_together.date_range.start_date != 'undefined' && typeof ships_together.date_range.end_date != 'undefined'){
						Delivery_Date = ships_together.date_range.start_date +' - '+ ships_together.date_range.end_date;
					}
					else if(typeof delivery_info[inx] != 'undefined' && delivery_info[inx].tentative_delivery_date.start_day != '' && delivery_info[inx].tentative_delivery_date.start_day !==  null && delivery_info[inx].tentative_delivery_date.end_day != '' && delivery_info[inx].tentative_delivery_date.end_day !==  null) {
						Delivery_Date =  delivery_info[inx].tentative_delivery_date.start_day+' - '+ delivery_info[inx].tentative_delivery_date.end_day;
					}
					
					assembly_info_html += '<div class="row ck-del-ass-sku-row">';
					assembly_info_html += '<div class="pf-col xs-2">';
					assembly_info_html += '<div class="ck-del-ass-sku-img-wrap">';
					assembly_info_html += '<img src="'+js_cdn_img_1+''+el.image+'">';
					assembly_info_html += '</div>';
					assembly_info_html += '</div>';
					assembly_info_html += '<div class="pf-col xs-4">';
					assembly_info_html += '<div class="ck-del-dtl">';
					assembly_info_html += '<span class="ck-sku-dtl-txt font-13 pf-semi-bold-text pf-text-grey">Delivery</span>';
					assembly_info_html += '<span class="ck-sku-dtl-subtxt font-14 pf-text-dark-grey">'+Delivery_Date+'</span>';
					assembly_info_html += '</div>';
					assembly_info_html += '</div>';
					assembly_info_html += '<div class="pf-col xs-6">';
					assembly_info_html += '<div class="ck-ass-dtl">';
					assembly_info_html += '<span class="ck-sku-dtl-txt font-13 pf-semi-bold-text pf-text-grey">Assembly</span>';
					assembly_info_html += '<span class="ck-sku-dtl-subtxt font-14 pf-text-dark-grey">'+el.assembly+'</span>';
					assembly_info_html += '<a href="javascript:void(0)" class="ck-sku-dtl-tt-link pf-text-blue font-12">';
					assembly_info_html += '<span class="pf-semi-bold-text" data-tooltip="'+el.tooltip_assembly+'">Details</span>';
					assembly_info_html += '</a>';
					assembly_info_html += '</div>';
					assembly_info_html += '</div>';
					assembly_info_html += '</div>';
				});
				if( typeof data.virtual_giftcards != 'undefined' && data.virtual_giftcards != '') {
					assembly_info_html += '<div class="ck-kerala-pin-msg pf-border-yellow pf-border-width-1 pf-border-style-solid pf-padding-10 font-13 pf-semi-bold-text" style="">';
					assembly_info_html += 'E-Gift Card(s) Will Be Directly Mailed To You.';
					assembly_info_html += '</div>';
				}
				return assembly_info_html;
			},
			checkAssemblyPincode : function( _pin , id) {
				
				try {
                    if(typeof PF.CHECKOUT.disabled_proceed_to_checkout != 'undefined' && PF.CHECKOUT.disabled_proceed_to_checkout){
                    	return true;
                    }
					if( $( '#update_id' ).val() == '' && $( '#update_id' ).val() == 0 ) {
						if(typeof $( '#ckShippingAddress input[name="country_id"]' ).val() != 'undefined'){
							var cnt =$( '#ckShippingAddress input[name="country_id"]' ).val().toLowerCase();
							if(cnt != '' && cnt !="india"){
								o.removeAllAddressMessages();
								$("#address_error_msg").html("Some Of Your Products are not available for international shipping.").show();
								$(".ck-addr-proceed-btn").addClass( 'disabled' );
							}
						}
						$( '.btn_green, .btn_green_big, .btn_blue' ).addClass( 'disabled' );
					}
					var _country = 'india';
					if( _pin === undefined ) {
						if( $( '#ckShippingAddress input[name="postcode"]' ).length > 0 ) {
							_pin = $( '#ckShippingAddress input[name="postcode"]' ).val();
							_country = $( '#ckShippingAddress input[name="country_id"]' ).val().toLowerCase();
						}
					}
					if( ( _pin === undefined ) || ! utils.isNumber( _pin ) || ( _pin.length != 6 ) ) {
						// no address selected
						return false;
					}else{
						$('.ck-pin-input-error-wrap').css('display', 'none');
						$('.ck-sku-dtl-ispin').css('display', 'none');
				        $('#pin_check').parent().removeClass('invld-pin');
			            $('.ck-pin-input-wrap,.ck-pin-input-error-wrap,.ck-sku-delivery-details .ck-sku-dtl-subtxt').hide();
            			$('.ck-pin-entered').show();
					}
					/* Added by prathamesh for pincode java api response */
					var cityId      = "";
                    var regionId    = "";
                    var type        = "";
                    if(typeof id != 'undefined') {
                        type    = id.indexOf( "bill_" ) > -1 ? "billing":"shipping";
                        /* check for city and region field id with respect to id provided in params */
                        if( type == "billing" ) {
                            cityId   = "bill_city";
                            regionId = "bill_region_select";

                        } else {
                            if( $( "#city" ).length > 0 ) {
                                cityId   = "city";
                            } else {
                                cityId  = "city_txtbox";
                            }
    
                            regionId = "region_select";
                        }
                    }
                    /* End of Code Added by prathamesh for pincode java api response */
                    
                    if( _country == 'india' ) {
                        var _data = {
                            pincode : _pin
                        };
                        var lastPincode = utils.readCookie( 'serviceable_pincode' );
	                    if(type != "billing" ){
	                        utils.createCookie( 'serviceable_pincode', _pin, 30 );
	                    }
	                    
						var _url = root_url + '/pincode/check_assembly_pincode';
						var _params = {
							pincode : _pin,
							lastPincode : lastPincode,
							cityId : cityId,
							regionId : regionId,
							type : type
						};

						// $( '.pin-check-loader' ).show();
						$('.ck-pin-input-wrap .btn-loader').show();
						utils.makeRequest( _url, 'POST', _data, o.handleAssemblyResponse, o.handleError, '', _params );
					}
				} catch( error ) {
					PF.ERROR.raiseError( error );
				}				
			},
			handleAssemblyResponse : function( _data, _params ) {
				var data;
                try {
                    data = $.parseJSON( _data );
                } catch(e) {
                    data = _data;
                }
				var proceed 	= 1;
				var valid_items = 0;
				
				$( '.add_noassembly_input' ).remove();
				// $( '.pin-check-loader' ).hide();
				$('.ck-pin-input-wrap .btn-loader').hide();
				$( '.gb-loader' ).hide();
                                
				// handle furniture exchange
				var fe_option = $( '#fe_points' ).is( ':checked' );
				var _shippingAddressId = $("input[name='shipping_address_id']:checked").val();
				$( '#billing_form_shipping_address_id' ).val(_shippingAddressId); // Set Shipping Address in billing form


				if( typeof data.data != 'undefined' ) {
					var _serviceableCheck 				= data.data.serviceable;
					var is_exchange_pincode_servicable 	= data.data.is_exchange_pincode_servicable;
					var exchange_pincode 				= data.data.exchange_pincode;	
					var onlyVirtualGiftcard				= data.data.onlyVirtualGiftcard;
					var pincode_service_call			= utils.readCookie('pincode_service_call');
					
					//Destroy additional_requirement message if Pincode call comes from Billing Address
					if(typeof o.pageType != 'undefined' && (o.pageType=='FirstTime' || o.pageType=='AddressSelection') && _params.cityId == 'bill_city'){
						delete data.data.additional_requirement;
					}
					
					else if(typeof o.pageType != 'undefined' && (o.pageType=='FirstTime' || o.pageType=='AddressSelection')){
						o.removeAllAddressMessages(); //Remove All address messages if call not coming from billing
					}
					
					if( typeof data.data.additional_requirement != 'undefined' ) {
						var add_req = data.data.additional_requirement.template;
						if( ( typeof add_req != 'undefined' ) && ( add_req != 'not required' ) && $( '#additional_required' ).length > 0) {
							$( '#additional_required' ).html( add_req );
							$( '#additional_req_state' ).html( add_req_state );
						}
					}					
					
					var add_req_state = data.data.state; // Changed by prathamesh for java api response
					var isPartPay = parseInt( data.data.part_pay_check );
					var is_cod_exists = data.data.is_cod_exists;
                    if( typeof data.data.assembly_info != 'undefined' ) {
						var assembly_info = data.data.assembly_info;
					}
                    if( typeof data.data.delivery_info != 'undefined' ) {
						var delivery_info = data.data.delivery_info;
					}
                    if( typeof data.data.ships_together != 'undefined' ) {
						var ships_together = data.data.ships_together;
					}
                    if( typeof data.data.valid_items != 'undefined' ) {
						valid_items = data.data.valid_items;
					}
                    if($('#guestAddressSubmit').length > 0){
						$('#guestAddressSubmit').removeClass('disabled');
					}
					// hide all errors by default
					o.hideErrors();

                    if(typeof data.data.onlyVirtualGiftcard != 'undefined' && data.data.onlyVirtualGiftcard == false){
                    	if( data.data.city != '' &&  data.data.state != '') {
                            if( _params.cityId == 'bill_city' ) {
                            	$( "#billAddAddrFrm #bill_city").val( data.data.city ).trigger('change');
                                $("#billAddAddrFrm #bill_region_select ").val(data.data.state).trigger('change');
                            } else {
                                $( "#address_select_form #city").val( data.data.city ).trigger('change');
                                $(" #address_select_form #region_select ").val(data.data.state).trigger('change').parent('.ck-state-in-wrap').addClass('disabled');
                            }
                        }
                        else {
                        	if(typeof _params.cityId != 'undefined' && _params.cityId == "city" && $( "#address_select_form #city").length !== 0 && $( "#address_select_form #region_select").length !== 0) {
                        		$("#address_select_form #city").val('').trigger('change');
                        		$("#address_select_form #region_select").val('').trigger('change').parent('.ck-state-in-wrap').removeClass('disabled');
                        	}
                        	if(typeof _params.cityId != 'undefined' && _params.cityId  == 'bill_city' && $( "#billAddAddrFrm #bill_city").length !== 0 && $("#billAddAddrFrm #bill_region_select").length !== 0) {
                        		$("#billAddAddrFrm #bill_city").val('').trigger('change');
                                $("#billAddAddrFrm #bill_region_select ").val('').trigger('change');
                        	}
                        }
                    }
                    else{
                    	$('.ck-addr-proceed-btn').removeClass('disabled');
                    }
                    

					if((typeof _params.type != 'undefined' && _params.type == '' && _serviceableCheck == 0) || (typeof _params.type != 'undefined' && _params.type == 'shipping' && _serviceableCheck == 0)) {
						/** Code Added by prathamesh to handle error response for Address Page */
						if(typeof o.pageType != 'undefined' && o.pageType=='AddressSelection'){
							var _srvcError 			= data.data.pincode_error;
							if(!$.isEmptyObject(_srvcError)){
								var _AddrError 			= o.createAddressPincodeErrorblock(_srvcError,pincode_service_call);
								
								if($('.ck-non-del-wrap').length > 0){
									$('.ck-non-del-wrap').remove();
								}
								if(pincode_service_call == 'select_address'){
									$('#pincode_error_'+_shippingAddressId).html(_AddrError).show();
								} else {
									if($('#pincode_error_shipping').length > 0){
										$('#pincode_error_shipping').html(_AddrError);
									}
								}
								
								$('#product_assembly_message').hide();
								$('.ck-non-del-wrap').slideDown();
								$('.ck-addr-proceed-btn').addClass('disabled');
								$('#item_addr_block_'+_shippingAddressId).addClass('ck-del-addr-error');
								o.initSliders(); 
							}
						}
						/** Code Added by prathamesh to handle error response for Address Page for First time user*/
						else if(typeof o.pageType != 'undefined' && o.pageType=='FirstTime'){
							var _srvcError 			= data.data.pincode_error;
							utils.createCookie( 'pincode_service_call','add_address'); //reset to select address after service call
							
							if(!$.isEmptyObject(_srvcError) && typeof data.data.onlyVirtualGiftcard != 'undefined' && data.data.onlyVirtualGiftcard == false){
								var _AddrError 			= o.createAddressPincodeErrorblock(_srvcError,pincode_service_call);
								
								if($('#pincode_error_guest_shipping').length > 0){
									$('#pincode_error_guest_shipping').html(_AddrError);
								}
								if($('#guestAddressSubmit').length > 0){
									$('#guestAddressSubmit').addClass('disabled');
								}
							}
							o.initSliders();
						}
						 if(typeof o.pageType != 'undefined' && o.pageType=='OrderSummary'){
							if($('.os-oos-ext-wrap .ck-non-del-wrap:visible').length == 0){
								//Failed Pincode Data
								var _srvcError = data.data.pincode_error;
								//Refresh falied pincode array
								o.non_serviceable_items.length = 0;

								if(Object.keys(_srvcError).length > 0){
									
									for( var i in _srvcError ) {
										if( _srvcError.hasOwnProperty( i ) ) {
											$( '.ck-sku-row-wrap #cartitem_' + i ).css('display', 'none');
											$( '.ck-sku-row-wrap #cartitem_' + i ).parent().css('display','block');
											o.non_serviceable_items.push( parseInt( i ) );
										}
									}
									o.createPincodeErrorblock(_srvcError);
									
									$('#ckNonDelWrap').css('display', 'block');
					                $('.os-non-del-ext-wrap').css('display', 'block');	
					           

					                if(o.non_serviceable_items.length > 2){
										$('.os-non-del-ext-wrap .ck-bill-addr-prev,.os-non-del-ext-wrap .ck-bill-addr-next,.os-non-del-ext-wrap .ck-non-del-product-cnt').show();
									}
								}
								// if any item in cart is non-serviceable, disable the buttons
								// only on cart summary
								if( ( o.non_serviceable_items.length > 0 ) && ( o.pageType == 'OrderSummary' ) ) {
									$( '.btn_green_big' ).addClass( 'disabled' );
								} else {
									$( '.btn_green_big' ).removeClass( 'disabled' );
								}

							// 	// remove serviceable error for items not applicable
								// $( 'div[id^="cartitem_"]' ).each(function() {
						
								$( '.ck-sku-row-wrap div[id^="cartitem_"]' ).each(function() {

									var _id = parseInt( $( this ).attr( 'id' ).split( '_' )[ 1 ] );
									if( $.inArray( _id, o.non_serviceable_items ) == -1 ) {
	                                   
	                                   $( 'div[id^="cartitem_' + _id + '"]' ).css('display','block');
	                                   $(this).parent().css('display','block');
	                                   $(this).css('display','block');

									}

	                                if( is_cod_exists == false ) {
	                                    $('span cod_status_' + _id).html( 'Not Available' );
	                                } else if( $( 'div[id^="cartitem_' + _id + '"] .cod_msg' ).data( 'cod-flag' ) == 1) {
	                                	$('span cod_status_' + _id).html( 'Available' );
	                                }

								});

							}
							else {
								var _nonServiceItems = data.data.pincode_error;
	            				var non_serviceable_prds = [];
	            				if(Object.keys(_nonServiceItems).length > 0){									
									for( var i in _nonServiceItems ) {
										if( _nonServiceItems.hasOwnProperty( i ) ) {
											non_serviceable_prds.push( parseInt( i ) );
										}
									}
								}

								$( '.ck-sku-row-wrap div[id^="cartitem_"]' ).each(function() {
									var _id = parseInt( $( this ).attr( 'id' ).split( '_' )[ 1 ] );
									if( $.inArray( _id, non_serviceable_prds ) == -1 ) {

										$('.ck-sku-row-wrap #cartitem_' + _id +' .ck-sku-details .ck-sku-delivery-details .ck-sku-dtl-range-txt').show();
										$( '#p_delivery_date_'+_id).show();	
										$('.ck-sku-row-wrap #cartitem_' + _id +' .ck-sku-details .ck-sku-delivery-details .ck-sku-dtl-subtxt').hide();
										$('.ck-sku-row-wrap #cartitem_' + _id +' .ck-sku-details .ck-sku-assembly-details').show();
									}else{

										$('.ck-sku-delivery-details #serviceable_pincode_' + _id).text(data.data.pincode);
										$('.ck-sku-row-wrap #cartitem_' + _id +' .ck-sku-details .ck-sku-delivery-details .ck-sku-dtl-subtxt').show();
										$('.ck-sku-row-wrap #cartitem_' + _id +' .ck-sku-details .ck-sku-assembly-details').hide();
										$('.ck-sku-row-wrap #cartitem_' + _id +' .ck-sku-details .ck-sku-cod-details').hide();
									}
								});  
							}
						}

                        proceed = 0;
					} else if((typeof _params.type != 'undefined' && _params.type == '' && _serviceableCheck == 1) || (typeof _params.type != 'undefined' && _params.type == 'shipping' && _serviceableCheck == 1)) {

						/** Code Added by prathamesh to handle success response for Address Page */
						if(typeof o.pageType != 'undefined' && o.pageType=='AddressSelection' ){
							$('#item_addr_block_'+_shippingAddressId).removeClass('ck-del-addr-error');	
							$('.ck-addr-proceed-btn').removeClass('disabled');
							if($('.ck-non-del-wrap').length > 0){
								$('.ck-non-del-wrap').slideUp();
							}
							if( ( typeof add_req != 'undefined' ) && ( add_req != 'not required' ) ) {
								$( '#additional_req_state' ).html( add_req_state );
								$( '#additional_req' ).slideDown();
							}
							if($('#display_assembly_pincode').length > 0) {
								$('#display_assembly_pincode').html(_params.pincode);
							}
							if($('.assemblyInfoScroll').length > 0) {
								global_function.mCustomScrollDestroy('assemblyInfoScroll');
							}
							if(typeof _params.lastPincode != 'undefined' && _params.lastPincode != _params.pincode){
								$('#product_assembly_message').show();
								var assembly_info_html = o.create_assembly_info_block(data.data);
								$( '#delivery-assembly' ).html(assembly_info_html);
							}
							
							global_function.mCustomScrollInit('assemblyInfoScroll');
							global_function.tooltip_call();
						}
						else if(typeof o.pageType != 'undefined' && o.pageType=='FirstTime'){
							
							if( ( typeof add_req != 'undefined' ) && ( add_req != 'not required' ) ) {
								$( '#additional_req_state' ).html( add_req_state );
								$( '#additional_req' ).slideDown();
							}
							if($('.assemblyInfoScroll').length > 0) {
								global_function.mCustomScrollDestroy('assemblyInfoScroll');
							}
							if($('#pincode_error_guest_shipping').length > 0){
								$('#pincode_error_guest_shipping').html('');
							}
							if($('#display_assembly_pincode').length > 0) {
								$('#display_assembly_pincode').html(_params.pincode);
							}
							if($('#guestAddressSubmit').length > 0){
								$('#guestAddressSubmit').removeClass('disabled');
							}
							
							if(typeof _params.lastPincode != 'undefined' && _params.lastPincode != _params.pincode){
								$('#product_assembly_message').show();
								var assembly_info_html = o.create_assembly_info_block(data.data);
								$( '#delivery-assembly' ).html(assembly_info_html);
							}
							global_function.mCustomScrollInit('assemblyInfoScroll');
							global_function.tooltip_call();
						}
						/** End of code Added by prathamesh to handle response for Address Page */
						

						// No Pincode error
						// All product serviceable
						$('.os-non-del-ext-wrap').css('display', 'none');
						$('.ck-sku-delivery-details .ck-sku-dtl-range-txt').show();
						$('.ck-sku-delivery-details .ck-sku-dtl-range-txt').parent('span').show();
						
						o.non_serviceable_items.length = 0;

                      
                           $( '.ck-sku-row-wrap div[id^="cartitem_"]' ).each(function() {

                           		$(this).parent().css('display','block');
                                $(this).css('display','block');

                                var _id = parseInt( $( this ).attr( 'id' ).split( '_' )[ 1 ] );

                                if( is_cod_exists == false ) {
                                    $('span cod_status_' + _id).html( 'Not Available' );
                                } else if( $( 'div[id^="cartitem_' + _id + '"] .cod_msg' ).data( 'cod-flag' ) == 1) {
                                	$('span cod_status_' + _id).html( 'Available' );
                                }
                        	});
					}

					var valid_item = (parseInt(data.data.valid_items) > 1)?data.data.valid_items+' Items':data.data.valid_items+' Item';
					$('h2.ck-pg-title span').text('('+valid_item+')');

                    if( ! isPartPay ) {
						$( '.partpay_available' ).hide();
					} else {
						$( '.partpay_available' ).show();
					}

					if( is_exchange_pincode_servicable != 1 && $( '#fe_points' ).length) {
						o.handleFurnitureExchangeError( data.data , fe_option );
					} else if (is_exchange_pincode_servicable == 1 && $( '#fe_points' ).length) {
						if ($('#fe_points').val() > 0) {
							$('#fe_checkbox').fadeIn();
							$('.show_fe').fadeIn();
						}
						$( '#fe_error_msg' ).hide();
						$( '#form_fe_error_msg' ).hide();
					}

					var productsWithAssemblyError = [];
					if( data.data.assembly_check == 1 ) {
						$( '#assembly_error_header_msg .error_msg_pincode' ).html( _params.pincode );

						if(typeof data.data.product != 'undefined'){
							var _count = Object.keys( data.data.product ).length;
						}
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
								_nonAssemblyText += '<a class="prod" href="' + root_url + '/' +_nonAssemblyItems[ i ].url + '"><img src="' + product_image_url + _nonAssemblyItems[ i ].image + '"></a>';

								productsWithAssemblyError.push( i );
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

					// update the cart product's assembly status
					try {
						if(_serviceableCheck == 1){

						if( productsWithAssemblyError.length == 0 ) {
							$( 'span[id^="assembly_status_"]' ).each(function() {
								var _node = $( this );
								var _id = _node.attr( 'id' ).split( '_' ).pop();

								o.updateAssemblyInfoOfNodes(_id , _node , data.data.assembly_info);
								//o.setAssemblyMessaging( _id, productsWithAssemblyError, _node );
							});
						} else {
							for( var i = 0; i < productsWithAssemblyError.length; i++ ) {
								var _node = $( 'span[id="assembly_status_' + productsWithAssemblyError[ i ] + '"]' );
								var _id = productsWithAssemblyError[ i ];

								o.updateAssemblyInfoOfNodes(_id , _node , data.data.assembly_info);
								//o.setAssemblyMessaging( _id, productsWithAssemblyError, _node );
							}
						}

						}
						// $('.ck-sku-assembly-details').show();
					} catch( _error ) {
						//
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

					if( typeof delivery_info != 'undefined' ) {
						for( var i in delivery_info ) {
							if( delivery_info.hasOwnProperty( i ) ) {

								// $('.ck-sku-delivery-details .ck-sku-dtl-subtxt').hide();

								if ( delivery_info[ i ].db_delivery_date != '2015-01-01' &&  delivery_info[ i ].tentative_delivery_date.start_day != '' && delivery_info[ i ].tentative_delivery_date.start_day !==  null && delivery_info[ i ].tentative_delivery_date.end_day != '' && delivery_info[ i ].tentative_delivery_date.end_day !==  null ) {
									$( '#delivery_date_cart_' + i ).html( delivery_info[ i ].tentative_delivery_date.start_day+' - '+ delivery_info[ i ].tentative_delivery_date.end_day);
									$( '#delivery_date_cart_' + i ).show();
									$( '#p_delivery_date_'+i ).show();									
								} else {
									$( '#p_delivery_date_'+i ).hide();
								}
							}
						}
					}

                    /**
                     * DON'T VISIBLE PROCEED BUTTON IF FREE GIFT ERROR SHOW IS ENABLE
                     * IF FREE GIFT ERROR SHOW IS TRUE THE CUSTOMER CAN'T PROCEED FUTHER
                     */
					if( proceed && $( '.ck-sku-row-content' ).length && $( '.out-of-stock-box' ).length == 0 ) {
						$( '.btn_blue' ).removeClass( 'disabled' );
                        if(!isFreeGiftErrorshow) {

							var cntry = $("#country_id").val();
                                                                                 //$current case added to restict below code chunk to be functional only for specific url             
							if((cntry!="IN")&& ($current == "/checkout/onepage/")){
								$(".btn_green_big").addClass( 'disabled' );
							}
							else{
								$( '.btn_green, .btn_green_big' ).removeClass( 'disabled' );
							}

                        }
					}
					
					//Added code for gift card phase - 2
					var giftcount = $('#gift_card_count').val();
					
					if(giftcount > 5){
						$( '.btn_green, .btn_green_big' ).addClass( 'disabled' );
					}
					//End of code

                    //Below if condition is to disable 'Proceed to Pay' btn when user is saving the address for the first time
                    if($('#address_select_form').hasClass('add_address_first_time')) {
                        $( '.first_time' ).addClass( 'disabled' );
                    }

                   
                    o.updateShipTogetherStatus( data.data.ships_together );
                    o.handlePanasonicErrorMsg();
				}
			},
			/**
		     * @author prathamesh.s
		     * Clears all display Address Page Display Messages
		     * As per Redesign 2017
		     */
			removeAllAddressMessages: function() {
				if(typeof o.pageType != 'undefined' && (o.pageType=='AddressSelection' || o.pageType=='FirstTime')){
					$('#product_assembly_message').hide();
					$('#additional_req').hide();
					$('#address_error_msg').hide();
					$('.ck-non-del-wrap').remove();
				}
			},
			/**
		     * @author prathamesh.s
		     * This function is used to set Billing Address in Session 
		     * on selection of Billing Address from Slider.
		     */
			setBillingAddress: function( entity_id ) {
				if( ( entity_id != '' ) ) { 
					var _url = root_url + '/checkout/setbillingaddress';
					var _data = {
						'entity_id' : entity_id
					};
					var _params = {
						'entity_id' : entity_id
					};
					utils.makeRequest( _url, 'POST', _data, o.handleSetBillingAddress, o.handleError, '', _params );
				}
			},
			handleSetBillingAddress : function( _data, _params ) { 
				$(".ck-bill-addr-content").html($('.ck-bil-addr-slide.selected').children(".class-billing-front").html());
			},
			updateAssemblyInfoOfNodes : function(_id , _node , assembly_info){
				
				//Added by prathamesh for pincode java api response
				// Added not required check by Nisha.u, redesign march 2017
				// if(assembly_info[_id]['assembly'].toLowerCase() != 'not required' ) {

					$('.ck-sku-row-wrap #cartitem_' + _id +' .ck-sku-details .ck-sku-assembly-details').show();
					_node.attr('data-assembly' , assembly_info[_id]['assembly']);
					_node.attr('data-assembly-provider' , assembly_info[_id]['assembly_provider']);
					_node.attr('data-assembly-brand' , assembly_info[_id]['assembly_brand']);
					// _node.find( 'b' ).removeAttr( 'class' ).addClass( 'txt-red' ).html(assembly_info[_id]['assembly']);
					_node.find( 'span.ck-sku-dtl-subtxt' ).html(assembly_info[_id]['assembly']);
					_node.closest('.ck-sku-assembly-details').find( '.ck-dtl-tt-link-wrap span' ).attr('data-tooltip', assembly_info[_id]['tooltip_assembly']); 
				// }
				// else {
					// _node.find( 'b' ).removeAttr( 'class' ).addClass( 'txt-green' ).html(assembly_info[_id]['assembly']); 
				// }
				
			},
			// updated b Ganesh Bangal
			setAssemblyMessaging : function( _id, productsWithAssemblyError, _node ) {
				var assembly = $.trim( _node.attr( 'data-assembly' ).toLowerCase() );
				var assemblyProvider =  $.trim( _node.attr( 'data-assembly-provider' ).toLowerCase() );
				var assemblyBrand = $.trim( _node.attr( 'data-assembly-brand' ) );


					if( $.inArray( assembly, [ 'assembly by pepperfry', 'carpenter assembly','assembly by brand' ] ) >= 0 )
					{
						if(assemblyProvider == 'to be arranged by yourself'){
							_node.find( 'b' ).removeAttr( 'class' ).addClass( 'txt-red' ).html( 'To be arranged by yourself' );
						}else if(assemblyProvider == 'available_by_pepperfry'){
							_node.find( 'b' ).removeAttr( 'class' ).addClass( 'txt-green' ).html( 'Offered by Pepperfry' );
						}else{
							if( $.inArray( assembly, [ 'assembly by pepperfry', 'carpenter assembly'] ) >= 0 ){
								_node.find( 'b' ).removeAttr( 'class' ).addClass( 'txt-green' ).html( 'Offered by Pepperfry' );
							}else if(assembly == 'assembly by brand'){
								_node.find( 'b' ).removeAttr( 'class' ).addClass( 'txt-green' ).html( 'Provided by ' + assemblyBrand );
							}
						}
					}
					else if( assembly == 'self assembly'){
						_node.find( 'b' ).removeAttr( 'class' ).addClass( 'txt-green' ).html( 'Can be self-assembled');
					}else if( assembly == 'Not Required'){
						_node.find( 'b' ).removeAttr( 'class' ).addClass( 'txt-green' ).html( 'Not Required');
					}

			},
			handleFurnitureExchangeError : function( data ) {
				var fe_selected = utils.readCookie( 'furnitureExchange' );
				if (utils.isNumber(data.exchange_pincode)) {
                                    o.exchange_pincode = data.exchange_pincode;
                                    if (fe_selected == 1 && typeof data.exchange_pincode !== 'undefined' && data.exchange_pincode.toString().length > 0) {
                                            $('#fe_error_msg').find('.error_msg_pincode').html(data.exchange_pincode);
                                            $('#form_fe_error_msg').find('.error_msg_pincode').html(data.exchange_pincode);
                                            $('#fe_error_msg').slideDown();
                                            $( '#form_fe_error_msg' ).slideDown();
                                    }
                                }
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
				$( 'div[id^="is_serviceable_info_"]' ).show();
				$( 'div[id^="is_serviceable_info_"] p' ).show();
      
				$( '.ck-sku-row-wrap .checkout-message.error' ).hide();
				$( '#serviceablity_error_product_msg .prod' ).remove();
				$( '#serviceablity_error_product_msg' ).hide();
				$( '#assembly_error_header_msg .error_msg_pincode' ).html( '' );
				$( '#assembly_error_header_msg #assembly_product_count' ).html( '' );
				$( '#assembly_error_header_msg' ).hide();
				$( '#assembly_error_product_msg .ck-product-notdeliverable' ).html( '' );
				$( '#additional_req' ).hide();
				$( '#form_additional_req' ).hide();

				// hide the address form errors
				if( ( o.pageType == 'AddressSelection' ) || ( o.pageType == 'FirstTime' ) ) {
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
				$('.ck-cpn-input-wrap').removeClass('invld-cpn');
				e.preventDefault ? e.preventDefault() : ( e.returnValue = false );

				var coupon_code = $( '#coupon_code' ).val();

				if( typeof coupon_code != 'undefined' && coupon_code != '' ) {
					var _data = {
						'coupon_code' : coupon_code
					};

					switch( action ) {
						case 'apply':
							_data.apply = action;
							$( '#cpn_check_btn' ).attr( 'disabled', 'disabled' );
							$( '#cpn_check_btn' ).addClass( 'disabled' );
							break;
						case 'cancel':
							_data.cancel = action;
							
							// $( '#cancel_coupon' ).attr( 'disabled', 'disabled' );
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
				}else{

					$('#coupon-msg-wrong span').text('Enter a valid Coupon');
				 	$('.ck-cpn-error-wrap').show();
        			$('.ck-cpn-input-wrap').addClass('invld-cpn');
				}
			},
			handleCouponResponse : function( _data, _params ) {
				/**
				 * Handle the response for apply/cancel coupon code on order summary
				 */
                                var data;
				try {
                                    data = $.parseJSON( _data );
				} catch( _error ) {
                                    data = _data;
				}

				var _response = data.data.success;
				
				if( typeof _response != 'undefined' && _response == true ) {
					var _pay = '';

					o.applyFurnitureExchangeDiscount( data.data.furniture_exchange );

					switch( _params.action ) {
						case 'apply':

							// apply the coupon and update the you-pay price
							var discount_amount = data.data.discount_amount;
							var total_tax = data.data.tax_info.total_tax;
							var bespoke_coupon = data.bespoke_coupon;

							if(bespoke_coupon == 1) {
								$('#checkout_grow_tree' ).hide();
								$( '#shipping_handling' ).slideUp( 500 );
								$( '#shipping_handling' ).attr( 'data-shipping-handling-amount', '0' );                                                                
                                $( '#growtree_contribution' ).attr( 'data-growtree-amount', '0' );
                                $('#growtree_contribution' ).hide();
                                $( '#growTree' ).attr( 'checked', false );
							}

							$( '#additional_discount' ).attr( 'data-additional-discount-amount', parseInt( discount_amount ) );

							//rendering row-wise discount
							o.updateRowDiscount( data.data.items_discount );
							// item discount ends

							$( '#taxes' ).attr( 'data-total-tax', parseInt( total_tax ) );
							$( '#taxes .price-nmbr' ).html( 'Rs. ' + utils.currencyFormat(Math.ceil(total_tax)));

							// update the you pay price
							_pay = o.totalPay();

							$( '#coupon-msgs' ).html( data.data.message ).addClass( 'valid_coupon' );

							if($( '#coupon-msg-wrong' ).hasClass( 'invalid_coupon' ) ) {
								$( '#coupon-msg-wrong' ).removeClass( 'invalid_coupon' );
							}

							var additional_discount = utils.currencyFormat( discount_amount );
							$( '#additional_discount .price-nmbr' ).html( '-Rs. ' + additional_discount );

							//calling function to calculate offer price
							var discount = parseInt( discount_amount ) + _pay.exchange_discount;
							o.updateOfferPrice( _pay.item_total, discount );

							$( '#additional_discount, #coupon-msgs, #offer_price' ).slideDown( 500 );
							$( '.coupon_discount_amount' ).show( 200 );

							//ends

							// $('#coupon-msg-wrong span').removeClass('invld-cpn');
							$('.ck-cpn-input-wrap').removeClass('invld-cpn');
				            $('.ck-cpn-input-wrap,.ck-cpn-error-wrap').hide();
				            $('.ck-cpn-applied-wrap span.pf-semi-bold-text').text(data.data.code);
				            $('.ck-cpn-applied-wrap').show();

				            $( '#cpn_check_btn' ).removeAttr( 'disabled' );
							$( '#cpn_check_btn' ).removeClass( 'disabled' );
							// $( '#cpn_check_btn' ).hide();
							// $( '#cancel_coupon' ).show();

							// $( '#coupon-msg-wrong' ).slideUp( 500 );
							// $( '#coupon_code' ).attr( 'readonly', 'readonly');

							if( total_tax > 0 ) {
								$( '#taxes' ).slideDown( 500 );
								$( '#cart_incl_note' ).slideUp( 500 );
							}
							if(data.data.free_gift){
								var items_discount = $.parseJSON(data.data.items_discount);
								var promo_skus = items_discount['promo_sku'][0].sku;
								var all_data = $.parseJSON(data.cart_data);
                                                                o.handlePanasonicErrorMsg(all_data);
								var cart_items = all_data['cart_item'];
								$.each(promo_skus ,function(key,value){
									var pincode = all_data['pincode'];
									var item_data = cart_items[value];
									var str = '';
									var delivery_info = item_data.delivery_info;
									PF.CHECKOUT.disabled_proceed_to_checkout = false;
									str = str +'<div id="cartitem_'+value+'" class="ck-sku-row-content clearfix "><div class="product-thumbnail"><div class="display-tbl"><div class="table-cell"><a href="'+root_url +'/'+ item_data["url"]+'" class=""><img src="'+product_image_url + item_data["image"]+'" alt=""></a></div></div></div><div class="pro-name-quantity"><div class="display-tbl"><div class="table-cell"><div class="table-cell"><a href="'+root_url +'/'+ item_data["url"]+'">'+item_data["name"]+'</a></div><div class="quntity_blc"></div></div></div></div><div class="delivery-details "><div class="display-tbl"><div class="table-cell"><div id="is_serviceable_info_'+value+'">';
									if(typeof delivery_info != 'undefined'){
									    if (delivery_info.tentative_delivery_date.start_day != '' && delivery_info.tentative_delivery_date.start_day !==  null && delivery_info.tentative_delivery_date.end_day != '' && delivery_info.tentative_delivery_date.end_day !==  null){
									    	var start_date = new Date(delivery_info.tentative_delivery_date.start_day);
									    	var start_day = start_date.toDateString();
									    	var array_date = start_day.split(' ');
									    	start_day = array_date[0]+', '+array_date[1]+' '+array_date[2];
									    	var end_date = new Date(delivery_info.tentative_delivery_date.end_day);
									    	var end_day = end_date.toDateString();
									    	array_date = {};
									    	array_date = end_day.split(' ');
									    	end_day = array_date[0]+', '+array_date[1]+' '+array_date[2];
									        // str = str +'<span id="p_delivery_date_'+value+'">Delivery: <span class="txt-green status" id="delivery_date_cart_'+value+'">'+ start_day +' - '+ end_day +'</span></p><p>COD: <b class="txt-red cod_msg" data-cod-flag="0">Not Available</b></span>';
									        str = str +'<span id="p_delivery_date_'+value+'">Delivery: <span class="txt-green status" id="delivery_date_cart_'+value+'">'+ start_day +' - '+ end_day +'</span></p><p>COD: <b class="txt-red cod_msg" data-cod-flag="0">Not Available</b></span>';

									    }
									}
									str = str +'</div></div></div></div><div class="ck-sku-details"><div class="display-tbl"><div class="table-cell"><div class="strike_txt"></div><div class="final_pricing "><span class="txt-red"> Free!</span></div></div></div></div><div class="trash-order-product"><div class="display-tbl"><div class="table-cell"></div></div></div></div>';
									/*<div class="delete_item" data-id="cartitem_'+value+'" style="display:none;">1 item deleted <a href="javascript:void(0);" class="cart_undo">UNDO</a></div>*/
									$('.ck-sku-row-wrap:last-child').append(str);
									if($('.btn_green').hasClass('disabled')){
										$('.btn_green').removeClass('disabled')
									}
									if($('.btn_green_big').hasClass('disabled')){
										$('.btn_green_big').removeClass('disabled')
									}
								})

							}
							break;
						case 'cancel': 
							// cancel the applied coupon and update the you-pay price
							$( '#coupon-msgs' ).html = '';
							$( '#coupon-msgs' ).slideUp( 500, function() {
								$( this ).html = '';
							});

							var bespoke_coupon = data.bespoke_coupon;
							if(bespoke_coupon == null) {
                                var shippingCharge = $('#shipping_handling_hidden').val();
								$('#checkout_grow_tree' ).show();
								$( '#shipping_handling' ).slideDown( 500 );
								$( '#shipping_handling' ).attr( 'data-shipping-handling-amount', shippingCharge);
								$( '#shipping_handling_amt' ).html( 'Rs. '+shippingCharge );
                                                                //$( '#growtree_contribution' ).attr( 'data-growtree-amount', donation );
							}
							$( '#additional_discount' ).attr( 'data-additional-discount-amount', '0' );
							$( '#taxes' ).attr( 'data-total-tax', '0' );
							$( '#additional_discount, #taxes, #offer_price' ).slideUp( 500 );
							$( '#cart_incl_note' ).slideDown( 500 );

							$( '.coupon_discount_amount' ).hide( 300, function() {
								$( '.ck-sku-row-content .final_pricing' ).each(function() {
									$( this ).addClass( 'new_price p_left' );
									$( this ).removeClass( 'old_price grey_text' );
								});
							});

							$( '#cpn_check_btn' ).removeAttr( 'disabled' );
							$( '#cpn_check_btn' ).removeClass( 'disabled' );
							// $( '#cancel_coupon' ).removeAttr( 'disabled' );
							// $('#cpn_check_btn').show();
							// $('#cancel_coupon').hide();

							$( '#coupon_code' ).removeAttr( 'readonly' );
							$( '#coupon_code' ).val( '' );
							//if free gift is removed, update cart

							if(data.free_gift){ 
								var all_data = $.parseJSON(data.cart_data);
                                o.handlePanasonicErrorMsg(all_data);
								var items = all_data['cart_item'];
								var removed_items = $.parseJSON(data.pids_removed);
								$.each( removed_items, function( key, val ) {
									$( '#cartitem_' + val ).siblings( '.ck-item-rmd-msg-wrap' ).attr( 'data-hash', data.removed_item );
									$( '#cartitem_' + val ).slideUp(function () {});
									o.cachedObjects[ data.removed_item ] = $.extend( true, {}, $( '#cartitem_' + val ) );
									o.deleteTimedObject( val, data.removed_item );
									$( '#cartitem_' + val ).parent( '.ck-sku-row-wrap' ).children( '.out-of-stock-box' ).hide().removeClass( 'out-of-stock-box' );
									o.handleCartBehaviour( all_data, val );
									o.updateShipTogetherStatus( all_data.ships_together );
								})
								//disable if only dummy product id is found in cart
								if(all_data.free_gift_panasonic_details.dummy_id_present && !all_data.free_gift_panasonic_details.status){
									if(!$('.btn_green').hasClass('disabled')){
										$('.btn_green').addClass('disabled')
									}
									if(!$('.btn_green_big').hasClass('disabled')){
										$('.btn_green_big').addClass('disabled')
									}
									PF.CHECKOUT.disabled_proceed_to_checkout = true;
								}
							}

							// update the you pay price
							
							var _res = o.totalPay();

							break;
					}
				} else if( typeof _response != 'undefined' && _response == false && _params.action == 'apply' ) {
					$( '#coupon-msg-wrong span' ).html( data.data.message ).addClass( 'invalid_coupon' );

					// if( $( '#coupon-msg-wrong' ).hasClass( 'valid_coupon' ) ) {
					// 	$( '#coupon-msg-wrong' ).removeClass( 'valid_coupon' );
					// }

					$( '#cpn_check_btn' ).removeAttr( 'disabled' );
					$( '#cpn_check_btn' ).removeClass( 'disabled' );
					// $( '#cancel_coupon' ).removeAttr( 'disabled' );

					// $( '#coupon-msg-wrong' ).slideDown( 500 );
					// $( '#coupon_code' ).val( '' );

			        $('.ck-cpn-error-wrap').show();
			        $('.ck-cpn-input-wrap').addClass('invld-cpn');
				}

				o.isCouponApplied = 0;

				var cb_total_pay = 0;
				if(_params.action == 'apply'){
					cb_total_pay = _pay.total_pay;
				}else if(_params.action == 'cancel'){
					cb_total_pay = _res.total_pay;
				}
				
				o.displayCashbackMessage();	
				o.emiOptionDisplay();

			},
			emiOptionDisplay : function(){
                                $('#emi-select2').select2();
				var tot = o.totalPay();
				var price = tot.total_pay;

				if(typeof price === 'string'){

					price 		= price.replace(/\,/g,''); // 1125, but a string, so convert it to number
					price 		= parseInt(price,10);
				}
							
				if(flag_NCE && price >= flag_NCE_RSCHK){
					$('.ck-nc-emi-txt-warp').css('display', 'block');
					if ($('#emi_breakup').length > 0) {
		                var emi_data = $('#emi_breakup').val();
		                var emi_breakup = $.parseJSON(emi_data);
		                var lowest_price = price;
		                // $('#emi_price_for').html(utils.currencyFormat(Math.round(price)));
		                for (var key in emi_breakup) {
		                    var is_no_cost_emi = emi_breakup[key].no_cost_emi == 0 ? 0 :1;
		                    if(is_no_cost_emi == 1 && flag_NCE) 
		                    {
		                        var new_principle_amount = o.PMTR(emi_breakup[key].rate/1200,emi_breakup[key].bu,price).toFixed(2);
		                        var INTEREST = price - new_principle_amount;
		                        payment = price / emi_breakup[key].bu;	                       
		                    }else{
		                        var payment = o.PMT(emi_breakup[key].rate / 1200, emi_breakup[key].bu, -price).toFixed(2);
		                        // $('#price_' + key).html(utils.currencyFormat(Math.round(payment)));
		                    }
		                    if (payment <= lowest_price) {
		                        lowest_price = Math.round(payment);
		                    }
		                }
		                $('.ck-nc-emi-txt-warp').html('<span class="pf-text-grey font-13 pf-italic-txt">No Cost EMI available. EMI starting Rs. '+utils.currencyFormat(Math.floor(lowest_price))+'/month</span>');
		                $('#emi_breakup').html(utils.currencyFormat(Math.ceil(price)));
	            	}
            	}else{
            		$('.ck-nc-emi-txt-warp').css('display', 'none');
            	}
				
			},
			PMT: function (i, n, p) {
            return i * p * Math.pow((1 + i), n) / (1 - Math.pow((1 + i), n));
	        },
	        PMTR: function( i, n, ap ) {
	            return ap * ( 1 - Math.pow((1 + i ), (-n))) / (i * n);
	        },
			updateRowDiscount : function( items_discount_json, items_details ) {
				/**
				 * Update row-wise discount on order summary
				 */
                                var itemDiscountObj;
				try {
                                    itemDiscountObj = $.parseJSON( items_discount_json );
				} catch( _error ) {
                                    itemDiscountObj = items_discount_json;
				}

				$.each( itemDiscountObj, function( key, val ) {
                                        if($.isNumeric(key)) {
                                            val = parseFloat( val );
                                            var elem = $( '#cartitem_' + key );

                                            if( val == 0 ) {
                                                    var _originalPrice = 0;
                                                    if( typeof items_details != 'undefined' ) {
                                                        _originalPrice = parseInt( items_details[ key ].total );
                                                    } else {
                                                        _originalPrice = $.trim( elem.find( '.strike_txt' ).html() );
                                                        if( _originalPrice == '' ) {
                                                            _originalPrice = $.trim( elem.find( '.final_pricing' ).html() );
                                                        }
                                                    }
                                                    elem.find( '.final_pricing' ).html( _originalPrice );
                                                    elem.find( '.strike_txt' ).html( '' );
                                                    elem.find( '.saving-price' ).html( '' );

                                                    return true;
                                            }

                                            var _oldPrice       = 0;
                                            var _oldPriceAmount = 0;

                                            if( typeof items_details != 'undefined' ) {
                                                var cartPrice = parseFloat( items_details[ key ].total );
                                                _oldPrice       = 'Rs. ' + utils.currencyFormat( cartPrice );
                                                _oldPriceAmount = cartPrice;
                                            } else {
                                                _oldPrice = $.trim( elem.find( ' .final_pricing' ).html() );
                                                _oldPriceAmount = parseFloat( $.trim( _oldPrice.replace( /Rs./ig, '' ).replace( /,/ig, '' ) ) );
                                            }

                                            var discounted_price = utils.currencyFormat( _oldPriceAmount - val );
                                            var saved_price = utils.currencyFormat( val );

                                            elem.find( ' .strike_txt' ).html( _oldPrice );
                                            elem.find( ' .final_pricing' ).html( 'Rs. ' + discounted_price );
                                            // elem.find( ' .saving-price' ).html( 'Rs. ' + saved_price + ' Saved!' );
                                            elem.find( ' .saving-price' ).html( 'Coupon applied, Rs ' + saved_price + ' saved' );

                                        }
				});
			},
			removeRowDiscount : function() {
				/**
				 * Remove row-wise discount from the order summary page
				 */
				$( '.ck-sku-row-content .ck-sku-qty-wrap .ck-sku-qty-price' ).each(function() {
					var strikeThroughPrice = $.trim( $( this ).find( '.strike_txt' ).html() );

					if( strikeThroughPrice != '' ) {
						$( this ).find( '.final_pricing' ).html( strikeThroughPrice );
					}

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
					$( '#fe_points' ).parent().find( 'label' ).html( 'Use <b>' + utils.currencyFormat( fe_points ) + '</b> Upgrade Points, get Rs. ' + utils.currencyFormat( fe_points ) + ' OFF' );
					$( '#fe_donation' ).val( furnitureExchange.fe_donation );
					$( '#fe_discount' ).find( '.price-nmbr' ).html( '-Rs. ' + utils.currencyFormat( fe_points ) );
					$( '#fe_discount' ).attr( 'fe-discount-amount', fe_points );
					$( '.show_fe,#fe_checkbox' ).show( 300 );
                                        var fe_selected = utils.readCookie( 'furnitureExchange' );
                                        var _pin = utils.readCookie('serviceable_pincode');
                                        if (utils.isNumber(furnitureExchange.fe_pincode))
                                        o.exchange_pincode = furnitureExchange.fe_pincode;
                                        if (fe_selected == 1
                                                && typeof furnitureExchange.fe_pincode !== 'undefined'
                                                && utils.isNumber(_pin)
                                                && utils.isNumber(furnitureExchange.fe_pincode)
                                                && furnitureExchange.fe_pincode != _pin)
                                        {
                                            $('#fe_error_msg').find('.error_msg_pincode').html(furnitureExchange.fe_pincode);
                                            $('#form_fe_error_msg').find('.error_msg_pincode').html(furnitureExchange.fe_pincode);
                                            $('#fe_error_msg').show(300);
                                            $('#form_fe_error_msg').show(300);
                                        }
				} else {
					o.removeFurnitureExchange();
					$( '.show_fe,#fe_checkbox,#fe_discount' ).hide( 300 );
                                        $('#fe_error_msg').hide(300);
                                        $('#form_fe_error_msg').hide(300);
				}

				fe_points = utils.currencyFormat( fe_points );
				$( '#fe_point_display' ).text( 'Use ' + fe_points + ' exchange points, get Rs. ' + fe_points + ' OFF' );
			},

			displayCashbackMessage: function(){

			if(o.pageType == 'OrderSummary' || o.pageType == 'AddressSelection'){

				var cashback_data_amount = $('.checkout-cashback').data('amt');
				var cashback_data_percentage = $('.checkout-cashback').data('prc');
				var tot = o.totalPay();
				var total_amount = tot.total_pay;

				if(typeof total_amount === 'string'){
					total_amount = total_amount.replace(/\,/g,''); // 1125, but a string, so convert it to number
					total_amount = parseInt(total_amount,10);
				}

				$('.checkout-cashback').html('');
				var cashback_msg_txt = '';
				var cashback_price = '';
				if(total_amount != '' && total_amount && cashback_data_amount != ''){
					// -5000 a temporary setting to check total amount range to display cashback message by Aashish.J, Ganesh.B, Nisha.U
                    if(total_amount >= (cashback_data_amount-5000) && total_amount < cashback_data_amount){

                    	// cashback_msg_txt = "<div class=\"cashback-msg-box clearfix\"><div class=\"img\"><img src=\""+root_url+"/images/cashback_icon.png\"></div><p>Let’s sweeten the deal! Add more products to make the cart worth more than <span>Rs."+cashback_data_amount+"</span> and get an extra "+cashback_data_percentage+"% cashback <a href=\""+root_url+"/promotions.html\" target=\"_blank\" class=\"cashbk-tnc-link\">See Terms</a></p><div class=\"clearfix\"></div></div>";
                    	cashback_msg_txt = "<div class=\"pf-padding-10-h pf-padding-15 pf-border-primary-color pf-border-width-2 pf-border-style-solid\"><img src=\""+root_url+"/images/cashback.png\" /><span class=\"font-12 pf-text-dark-grey\">Let’s sweeten the deal! Add more products to make the cart worth more than <span>Rs."+cashback_data_amount+"</span> and get an extra "+cashback_data_percentage+"% cashback. <a href=\""+root_url+"/promotions.html\" target=\"_blank\" class=\"cashbk-tnc-link\"><u>See Terms</u></a></span></div>";
                    }else if(total_amount >= cashback_data_amount){ 

                    	cashback_price = (total_amount - cashback_data_amount)*cashback_data_percentage/100;
                    	// cashback_msg_txt= "<div class=\"cashback-msg-box clearfix\"><div class=\"img\"><img src=\""+root_url+"/images/cashback_icon.png\"></div><p>Awesome! You are eligible for a cashback of <span>Rs."+utils.currencyFormat(Math.floor(cashback_price))+"</span> on prepaid orders. Cashback will be credited within 9 working days. <a href=\""+root_url+"/promotions.html\" target=\"_blank\" class=\"cashbk-tnc-link\">See Terms</a></p><div class=\"clearfix\"></div></div>";
                    	cashback_msg_txt = "<div class=\"pf-padding-10-h pf-padding-15 pf-border-primary-color pf-border-width-2 pf-border-style-solid\"><img src=\""+root_url+"/images/cashback.png\" /><span class=\"font-12 pf-text-dark-grey\">Awesome! You are eligible for a <b class=\"pf-semi-bold-text\">Cashback of Rs."+utils.currencyFormat(Math.floor(cashback_price))+"</b> on prepaid orders. Cashback will be credited within 9 working days. <a href=\""+root_url+"/promotions.html\" target=\"_blank\" class=\"cashbk-tnc-link\"><u>See Terms</u></a></span></div>";

                    }
                }
 
                if(cashback_msg_txt != ''){                	
                	$('.checkout-cashback').html(cashback_msg_txt);
                }


            }

			},
                        

                        addOrRemoveGiftCardData : function( free_gift, total_amount, freeData, is_free_gift_in_cart, delete_free_item){

                            $( "#ckGiftBox" ).remove();
                            $( "#show_gift_card_error").html('');
                            $( ".continue-empty-btn  .os-fg-img-wrapper").remove();

                            if(PF.CHECKOUT.pageType=='OrderSummary'){
                                $( "#free_gift_module_cms_block" ).html('');
                            }else{
                                //$( "#free_gift_eligible_msg" ).remove();
								$('#os_fg_addr_box').hide();
                            }
                             var show_gift_wraper=0;
                            if(is_free_gift_in_cart==0){
                                show_gift_wraper=1
                            }else{

                                if(delete_free_item!='' && typeof delete_free_item != 'undefined'){
                                    $( "#cartitem_"+delete_free_item ).remove();
                                 
                                    $( "#show_gift_card_error").html('<div class="checkout-message error" id="free_gift_error_msg">Your order value is less than Rs 2,000 and you are no longer eligible for the free tee shirt.</div>');


                                }

                            }


                            if((free_gift!='' && typeof free_gift != 'undefined') ){

                                if(show_gift_wraper==1 && free_gift!=''){
                                    if(PF.CHECKOUT.pageType=='OrderSummary'){
                                        $( "#empty_user_cart" ).after( free_gift);
										//$('#os_fg_addr_box').show();
                                    }else{
                                        //$( "#address_page_free_gift_wraper" ).after( '<div class="checkout-message success ck-fg-msg-sucess" id="free_gift_eligible_msg">Your order qualifies for a free gift. <a data-modal="ckGiftModal" href="javascript:void(0);">Check it out</a><a href="' + root_url + '/promotions.html#pp_fg_tnc" target="_blank">T&amp;Cs apply</a></div>');
										$('#os_fg_addr_box').show();
                                    }
                                }
                                var _url = root_url + '/checkout/createFreeGiftModel';
                                var _data = {
                                    free_gift_data : btoa(freeData)
                                };
                                utils.makeRequest( _url, 'POST', _data, o.getFreecartPopup, o.handleError );
                            }
                        },

                        getFreecartPopup : function( result ) {
                              	var data = '';
				try {
					data = $.parseJSON( result );
				} catch( _error ) {
					data = result;
				}
                                 $( "#free_gift_module_cms_block" ).after( data);
                                /*if(PF.CHECKOUT.pageType=='OrderSummary'){
                                   $( "#free_gift_module_cms_block" ).after( data);
                                }else{
                                    $( "#free_gift_eligible_msg" ).after(data);
                                } */
                         },

			removeFurnitureExchange : function() {
				$( '#fe_points' ).removeAttr( 'checked' );
				utils.eraseCookie( 'furnitureExchange' );
				o.showAddBlock( 'exchange' );

				if( $( '#offer_price' ).css( 'display' ) != 'none' ) {
					var itemTotal = parseInt( $( '#item_total' ).attr( 'data-total-amount' ) );
					var discount = parseInt( $( '#additional_discount' ).attr( 'data-additional-discount-amount' ) );

					o.updateOfferPrice( itemTotal, discount );
					o.totalPay();
				}
                                $('#fe_points').val('0');
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
				var _address;
				try {
                                    _address = $.parseJSON( address_data );
				} catch( _error ) {
                                    _address = address_data;
				}

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

                                var info = _address.street[ 0 ];
                                if(typeof(_address.street[ 1 ]) == 'undefined' && _address.landmark != '') {
                                    info += '</br>Landmark-' + _address.landmark + ',' + _address.city + ',' + _address.state;
                                } else if(typeof(_address.street[ 1 ]) != 'undefined' && _address.landmark == '') {
                                    info += '</br>Area-' + _address.street[ 1 ] + ',' + _address.city + ',' + _address.state;
                                } else if(typeof(_address.street[ 1 ]) == 'undefined' && _address.landmark == '') {
                                    info += _address.city + ',' + _address.state;
                                } else if(typeof(_address.street[ 1 ]) != 'undefined' && _address.landmark != '') {
                                    info += '</br>Area-' + _address.street[ 1 ] + '</br>Landmark-' + _address.landmark + ',' + _address.city + ',' + _address.state;
                                }

				info += '-' + _address.postcode + ',' + _address.country;

				info = info.replace( /,{2,}/g, ',' );
				$( '#' + elem + ' .checkout-address-main p:eq(1)' ).html( info );
				$( '#' + elem + ' .checkout-address-main p:eq(2)' ).html( 'T: ' + _address.mobile );

				var el = $( '#' + elem );

				//_address.street[ 1 ] = ( typeof _address.street[ 1 ] === 'undefined' ) ? '' : _address.street[ 1 ];
				el.find( 'input[type="hidden"][name="firstname"]' ).val( _address.fname );
				el.find( 'input[type="hidden"][name="lastname"]' ).val( _address.lname );
				el.find( 'input[type="hidden"][name="street"]' ).val( _address.street);
				el.find( 'input[type="hidden"][name="street1"]' ).val( _address.street2);
				el.find( 'input[type="hidden"][name="landmark"]' ).val( _address.landmark );
				el.find( 'input[type="hidden"][name="city"]' ).val( _address.city );
				el.find( 'input[type="hidden"][name="region"]' ).val( _address.state );
				el.find( 'input[type="hidden"][name="postcode"]' ).val( _address.postcode );
				el.find( 'input[type="hidden"][name="country_id"]' ).val( _address.country );
				el.find( 'input[type="hidden"][name="mobile"]' ).val( _address.mobile );


                                if(elem == 'ckBillingAddress') {
                                	$('.cart-loader').show();
                                    var selectedShippingAddressId = $('input[name=shipping_address_id]:checked').val();
                                    utils.createCookie( 'billing_address_changed', 1 );
                                    var _url = root_url + '/checkout/addressSelect/'+selectedShippingAddressId+'/' + _id;

                                    var _params = {};
                                    var _data = {};
                                    utils.makeRequest( _url, 'POST', _data, o.handleSuccess, o.handleError, '', _params );
                                }
                                else if(elem == 'ckShippingAddress'){
                                	$('.cart-loader').show();
                                	var billing_address_value = utils.readCookie('billing_address_changed') !== null ? utils.readCookie('billing_address_changed') : 0;
                                	var selectedBillingAddressId = $('input[name=billing_address_id]:checked').val();
									var _params = {};    
									//Check if billing address is changed                            	
									if(billing_address_value == 1){
                                		var _url = root_url + '/checkout/addressSelect/' + _id+'/' + selectedBillingAddressId;
                                	}else{
                                    	var _url = root_url + '/checkout/addressSelect/' + _id+'/' + _id;
                                    	var _params = {post_action : 'setBillingAddress',entity_id : _id};
                                    }
                                	var _data = {};
                                    utils.makeRequest( _url, 'POST', _data, o.handleSuccess, o.handleError, '', _params );
                                }
                                // since the user changed her shipping address, check the assembly, serviceability, FE and addl-req. checks
								if( _checkAssembly ) {
									o.checkAssemblyPincode(); 
								}
			},
                        setBillingAsShipping : function( _id, _type ) {
                                $('.cart-loader').show();
                                var _address;
				try {
                                    _address = $.parseJSON( address_data );
				} catch( _error ) {
                                    _address = address_data;
				}

                                _address = _address[ _id ];

                                if( typeof _address === 'undefined' ) {
                                        return false;
                                }
                                var elem = 'ckBillingAddress';
                                var _originalID = parseInt( $( '#' + elem + ' .checkout-address-main input' ).val() );


				$('#' + elem + ' .checkout-address-main input').val( _id );
				$( '#' + elem + ' .checkout-address-main p:eq(0)' ).html( _address.fname + ' ' + _address.lname );

				var info = _address.street[ 0 ];
                                if(typeof(_address.street[ 1 ]) == 'undefined' && _address.landmark != '') {
                                    info += '</br>Landmark-' + _address.landmark + ',' + _address.city + ',' + _address.state;
                                } else if(typeof(_address.street[ 1 ]) != 'undefined' && _address.landmark == '') {
                                    info += '</br>Area-' + _address.street[ 1 ] + ',' + _address.city + ',' + _address.state;
                                } else if(typeof(_address.street[ 1 ]) == 'undefined' && _address.landmark == '') {
                                    info += _address.city + ',' + _address.state;
                                } else if(typeof(_address.street[ 1 ]) != 'undefined' && _address.landmark != '') {
                                    info += '</br>Area-' + _address.street[ 1 ] + '</br>Landmark-' + _address.landmark + ',' + _address.city + ',' + _address.state;
                                }

				info += '-' + _address.postcode + ',' + _address.country;

				info = info.replace( /,{2,}/g, ',' );
				$( '#' + elem + ' .checkout-address-main p:eq(1)' ).html( info );
				$( '#' + elem + ' .checkout-address-main p:eq(2)' ).html( 'T: ' + _address.mobile );

				var el = $( '#' + elem );

				el.find( 'input[type="hidden"][name="firstname"]' ).val( _address.fname );
				el.find( 'input[type="hidden"][name="lastname"]' ).val( _address.lname );
				el.find( 'input[type="hidden"][name="street"]' ).val( _address.street );
				el.find( 'input[type="hidden"][name="street1"]' ).val( _address.street2 );
				el.find( 'input[type="hidden"][name="landmark"]' ).val( _address.landmark );
				el.find( 'input[type="hidden"][name="city"]' ).val( _address.city );
				el.find( 'input[type="hidden"][name="region"]' ).val( _address.state );
				el.find( 'input[type="hidden"][name="postcode"]' ).val( _address.postcode );
				el.find( 'input[type="hidden"][name="country_id"]' ).val( _address.country );
				el.find( 'input[type="hidden"][name="mobile"]' ).val( _address.mobile );
				$('.cart-loader').show();
                                var _url = root_url + '/checkout/addressSelect/' + _id + '/' + _id;
                                var _params = {};

                                var _data = {};

                                utils.makeRequest( _url, 'POST', _data, o.handleSuccess, o.handleError, '', _params );
                        },
                        handleSuccess : function(_data,_params) {
                        	if(typeof _params.post_action != 'undefined' && _params.post_action == 'setBillingAddress'){
								//Setting Billing Address
                        		var entity_id = $(this).children('[name="billing_address_id"]').val();
                        		$('.ck-bil-addr-slide').removeClass('selected');
                        		$('#billing_address_'+_params.entity_id).parent().addClass('selected');
            			        $('#bill_addressBook'+_params.entity_id).prop('checked', true);
                        		o.setBillingAddress(_params.entity_id);
            			    }
                            $('.cart-loader').hide();
                        },
			showAddressForEdit : function( _id, _form ) {
				
                                var _address;
				try {
                                    _address = $.parseJSON( address_data );
				} catch( _error ) {
                                    _address = address_data;
				}


				_address = _address[ _id ];

				if( typeof _address === 'undefined' ) {
					return false;
				}

				// check whether the request has come from either of billing/shipping forms
				if( ! _form ) {
					return false;
				}

				var fieldPrefix = '';

				if( _form === 'billing' ) {
					fieldPrefix = 'bill_';
					$( '#bill_update_id' ).val( _id );
					$('form#billAddAddrFrm').find('.error-msg').html('');
				}else{
					utils.createCookie( 'pincode_service_call','add_address');  // Handles add/edit sliders functionality
				}

				$( '#' + fieldPrefix + 'firstname' ).val( _address.fname ).parent().addClass( 'input-filled' ).removeClass('frm-success-wrap').removeClass('frm-error-wrap');
				$( '#' + fieldPrefix + 'lastname' ).val( _address.lname ).parent().addClass( 'input-filled' ).removeClass('frm-success-wrap').removeClass('frm-error-wrap');
				$( '#' + fieldPrefix + 'mobile' ).val( _address.mobile ).parent().addClass( 'input-filled' ).removeClass('frm-success-wrap').removeClass('frm-error-wrap');
				$( '#' + fieldPrefix + 'street' ).val( _address.street ).parent().addClass( 'input-filled' ).removeClass('frm-success-wrap').removeClass('frm-error-wrap');
				$( '#' + fieldPrefix + 'street2' ).val( _address.street2 ).parent().addClass( 'input-filled' ).removeClass('frm-success-wrap').removeClass('frm-error-wrap');
				$( '#' + fieldPrefix + 'landmark' ).val( _address.landmark ).parent().addClass( 'input-filled' ).removeClass('frm-success-wrap').removeClass('frm-error-wrap');
				$( '#' + fieldPrefix + 'postcode' ).val( _address.postcode ).parent().addClass( 'input-filled' ).removeClass('frm-success-wrap').removeClass('frm-error-wrap');
				$( '#' + fieldPrefix + 'city' ).val( _address.city ).parent().addClass( 'input-filled' ).removeClass('frm-success-wrap').removeClass('frm-error-wrap');
				$( '#' + fieldPrefix + 'country_id' ).val( _address.country_id ).parent().addClass( 'input-filled' ).removeClass('frm-success-wrap').removeClass('frm-error-wrap');
				if(_form != 'billing' && $.trim( _address.country_id.toLowerCase() ) != 'in'){
					$( '#' + fieldPrefix + 'region_select' ).val('').trigger('change').attr('validate','1').removeAttr('disabled').trigger('change').parent().removeClass('frm-success-wrap').removeClass('frm-error-wrap');
					$( '#' + fieldPrefix + 'region_select' ).next(".select2-container").show();
					$( '#' + fieldPrefix + 'country_id' ).val('IN').attr('validate','1').trigger('change').show().parent().removeClass('frm-success-wrap').removeClass('frm-error-wrap');
				}else if($.trim( _address.country_id.toLowerCase() ) != 'in'){
					$( '#' + fieldPrefix + 'region_txtbox' ).val( _address.state ).attr('validate','1').removeAttr('disabled').show().parent().removeClass('frm-success-wrap').removeClass('frm-error-wrap');
					$( '#' + fieldPrefix + 'region_select' ).val("").trigger('change').attr('disabled','disabled').removeAttr('validate','1').parent().removeClass('frm-success-wrap').removeClass('frm-error-wrap');
					$( '#' + fieldPrefix + 'region_select' ).next(".select2-container").hide();
				}else if($.trim( _address.country.toLowerCase() ) == 'india'){
	            	$( '#' + fieldPrefix + 'region_select' ).val( _address.state ).attr('validate','1').removeAttr('disabled').trigger('change').parent().removeClass('frm-success-wrap').removeClass('frm-error-wrap');
	            	$( '#' + fieldPrefix + 'region_select' ).next(".select2-container").show();
	            	$( '#' + fieldPrefix + 'region_txtbox' ).val("").attr('disabled','disabled').removeAttr('validate','1').hide().parent().removeClass('frm-success-wrap').removeClass('frm-error-wrap');
	            }
				
				/**
				 * Check for any errors for the given pincode
				 */
                // DO NOT do Pincode check for BILLING ADDRESS
                if( _form != 'billing' ) {
                    o.checkAssemblyPincode( $.trim( _address.postcode ) );
                }

				//$( '#s2id_' + fieldPrefix + 'country_id' ).select2( 'val', selectedCountry );
                $( '.address-future-save' ).hide();

			},
			changeButtonState : function( _state ) {

				// change button state
				if( typeof utils._backUpText === 'undefined' ) {
					utils._backUpText = $( '.btn_green_big' ).html();
				}

				switch( _state )  {
					case 'loading':
						//var loader = '<div class="btn-loader"><img alt="loading" src="' + root_url + '/images/btn-loader.gif"></div>';
						// $( '.btn_green_big' ).addClass( 'loading' ).html( loader );
						$( '.btn_green_big,.btn_green,.green-action-btn ' ).addClass( 'loading disabled' );
						break;
					case 'original':
					default:
						// $( '.btn_green_big' ).removeClass( 'loading' ).html( utils._backUpText );
						$( '.btn_green_big,.btn_green,.green-action-btn' ).removeClass( 'loading disabled' );
						break;
				}
                //Below if condition is to disable 'Proceed to Pay' btn when user is saving the address for the first time regardless of the pincode errors
                if($('#address_select_form').hasClass('add_address_first_time')) {
                    $( '.first_time' ).addClass( 'disabled' );
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
			addAddress : function(_form) {
				// check whether the request has come from either of billing/shipping forms
				/*var _form = o.getSelectedPanel();
				if( ! _form ) {
					return false;
				}*/
				
                var _formType;
                var _addressState = '';
                if(_form == 'billAddAddrFrm'){
                    _formType = "billing";
                    _addressState = $( '#update_id_bill' ).val() == ''?'new':'existing';
                }else if(_form == 'address_select_form'){
                    _formType = "shipping";
                    _addressState = $( '#update_id' ).val() == ''?'new':'existing';
                }

				// check user action whether adding/editing a new/existing shipping/billing address
				var userAction = _formType + '_' + _addressState;

                                // Cheking whether its a GUEST user or LOGGED-IN user
                                var guest = '';
                                if($('#address_select_form').hasClass('guest_user')) {
                                        guest = 'guest';
                                }
                                if(userAction == 'billing_new') {
                                        utils.createCookie( 'billing_address_changed', 1 );
                                }
				switch( userAction ) {
					case 'shipping_new':
						/*$( 'form input[name="shipping_address_id"]' ).removeAttr( 'checked' );
                                                if(guest == ''){
                                                        if($('#saveAddressShip').is(':checked')) {
                                                                $( 'form input[name="save_address"]' ).val( 1 );
                                                        } else {
                                                                $( 'form input[name="save_address"]' ).val( '' );
                                                        }
                                                } else {
                                                        $( 'form input[name="save_address"]' ).val( '' );
                                                }
						$( '#update_id' ).val( '' );
                                        */
						break;
					case 'shipping_existing':
						// update_id already has the id of the existing address
						break;
					case 'billing_new':
						$( 'form input[name="billing_address_id"]' ).removeAttr( 'checked' );
                        if(guest == ''){
                                if($('#saveAddressBill').is(':checked')) {
                                        $( '#save_billing_address' ).val( 1 );
                                } else {
                                        $( '#save_billing_address' ).val( 1 );
                                }
                        } else {
                                $( '#save_billing_address' ).val( 1 );
                        }
                        
						$( '#update_id' ).val( '' );
						break;
					case 'billing_existing':
						// update_id already has the id of the existing address
						break;
					case 'first_time_new':
						// first time user..adding a shipping address
                                               /* if($('#saveAddress').is(':checked')) {
                                                        $( 'form input[name="save_address"]' ).val( 1 );
                                                } else {
                                                        $( 'form input[name="save_address"]' ).val( '' );
                                                }*/
						break;
					default:
						return false;
						//break;
				}
				if(!PF.HEADER.validateForm("",_form)) {
					o.addressselect(_formType);
				}
				return false;

				/*
				// should we use this ?
				if( ! o.loginValidation( _form ) ) {
					return false;
				}
				o.addressselect();*/
			},
                        addressSelectRedirect : function() {
                                // check whether the request has come from either of billing/shipping forms
				var _form = o.getSelectedPanel();
                                var _shippingAddressId = $("input[name='shipping_address_id']:checked").val();
                                var _billingAddressId = $("input[name='billing_address_id']:checked").val();
				if( ! _form && ( $( '.checkout-address-main.gb-scroll' ).length == 0 ) ) {
					return false;
				}

				if( _form && $( '.add-address_form' ).is( ':visible' ) && !PF.HEADER.validateForm("",_form) ) {
					return false;
				}
				/**
				 * Select shipping and billing address
				 */
				var valid = true;
				var service_error = false;
				o.changeButtonState( 'loading' );

				// user can add 9 addresses at most
				if( $( '#shippingAddressOpenCont .ship-address-row' ).length > 10 ) {
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
					else{
						$("#bill_postcode").attr('maxlength',10);
						$("#postcode").attr('maxlength',6);
					}
				}

				if( valid === true ) {
                                    window.location.href = root_url + '/checkout/addressSelectRedirect/' + _shippingAddressId + '/' + _billingAddressId;
                                }
                        },
			addressselect : function(_formType) {
                var _form = '';
                                
                if(_formType == 'billing'){
                   _form = 'billAddAddrFrm'
                }else if(_formType == 'shipping'){
                    _form = 'address_select_form';
                }
                
				if( ! _form && ( $( '.checkout-address-main.gb-scroll' ).length == 0 ) ) {
					return false;
				}

				if( _form && $( '.add-address_form' ).is( ':visible' ) && ! o.loginValidation( _form ) ) {
					return false;
				}
				/**
				 * Select shipping and billing address
				 */
				var valid = true;
				var service_error = false;
				o.changeButtonState( 'loading' );

				// user can add 9 addresses at most
				if( $( '#shippingAddressOpenCont .ship-address-row' ).length > 10 ) {
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
					var data = $( '#'+_form ).serialize();

                    var addressType = '';
                    if($('#ckShippingAddress').hasClass('guest_user') && $('#ckShippingAddress').hasClass('active')) {
                            addressType = 'shipping';
                    } else if($('#ckBillingAddress').hasClass('guest_user') && $('#ckBillingAddress').hasClass('active')) {
                            addressType = 'billing';
                    }
                    if(addressType != '') {
                            data = data+'&updated_address_type='+addressType;
                    }

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
                        handleAddNewShippingAddressResponse :function ( data, _params ) {
                                utils.l.href = root_url + '/checkout/onepage';
                        },
			handleAddressSelectResponse : function( _data, _params ) {
                var data;
				try {
                                    data = $.parseJSON( _data );
				} catch( _error ) {
                                    data = _data;
				}
				if( typeof data.data.success != "undefined" && data.data.success == true ) {
					$("#address_error_msg").html('').hide();
					if(parseInt(data.data.new_address_id)) {
                	   var _id = parseInt(data.data.new_address_id);
                        if(utils.readCookie( 'billing_address_changed' ) != 1) {
                                var _url = root_url + '/checkout/addressSelect/' + _id + '/' + _id;
                                var _params = {};
                                var _data = {};
                                utils.makeRequest( _url, 'POST', _data, o.handleAddNewShippingAddressResponse, '', '', _params );
                        } else {
                            utils.l.href = root_url + '/checkout/onepage';
                        }
	                } else {
	                	utils.l.href = root_url + '/checkout/onepage';
	                	//utils.l.href = root_url + '/checkout/addressSelectRedirect/1/1';
	                }
                } else if( typeof data.data.success != "undefined" && data.data.success == false ) {
                    $('.btn_blue').removeClass('disabled'); 
					var address_error = data.data.addresserror;

					if( address_error == "success" ) {
						window.location.href = root_url + '/checkout/onepage';
					} else {
						o.changeButtonState( 'original' );
						if(typeof address_error.save_error != "undefined") {
							if(address_error.save_error == 'An error has occurred. Please refresh the page and try again.') {
								o.changeButtonState( 'original' );
							} else if($("#shipping_address_form").css("display") == "none") {
								$("#address_error_msg").html(address_error.save_error).show();
								$(".popup_close").click();
								//o.changeButtonState( 'original' );
							} else {
								//$("#international_shipping").html(address_error.save_error).show();
								//o.changeButtonState( 'original' );
								//$('html, body').animate({scrollTop: $('#address_select_form').offset().top - 70}, 500);
								// Added by Aditya to show the international shipping error on new address 
								$("#address_error_msg").html(address_error.header).show();
								$('html, body').animate({scrollTop: $('#ckShippingAddress').offset().top - 50 }, 500);
								//$("#address_error_msg").css("margin","15px");
								$( '.ck-addr-proceed-btn' ).addClass( 'disabled' );
							}
						} else if(typeof address_error.header != "undefined") {
							//Add/Edit Error Thow for Billing Address for LoggedIn User
							if($('#billAddAddrFrm').css("display") != "none"){
								$("#bill_address_error_msg").html(address_error.header).show();
							}
							if($("#shipping_address_form").css("display") != "none") {
								$("#address_error_msg").html(address_error.header).show();
							} else {
								//$("#address_error_msg").html(address_error.header).show();
								//$('html, body').animate({scrollTop: $('#address_select_form').offset().top }, 500);
								// Added by Aditya to show the international shipping error
								$("#address_error_msg").html(address_error.header).show();
								$('html, body').animate({scrollTop: $('#ckShippingAddress').offset().top - 50 }, 500);
								//$("#address_error_msg").css("margin","15px");
								$( '.ck-addr-proceed-btn' ).addClass( 'disabled' );
							}

							  
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
//                              
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
				if( typeof product_id != "undefined") { //&& $(".order-summary-row").length > 1 
					var _url = root_url + '/cart/removeitem/' + product_id + '/1/1';
					var _additionalParams = {
						'pid' : product_id
					};

					utils.makeRequest( _url, 'POST', {}, o.handleDeleteItemResponse, o.handleError, '', _additionalParams );
				} else if( $( ".ck-sku-row-content" ).length == 1 ) {
                    
                    o.removecartgtm(product_id);

					// o.emptyCart();
				} else {
					alert( "Please select an item to delete." );
				}
			},
			removecartgtm : function(product_id){
				/***
                * Amitesh - to set gtm for remove cart(minicart) - {start}
                */
               if(itemData.length > 0){
                   var cartItemData = {};
                   for( var i in itemData ) {
                           if( itemData.hasOwnProperty( i ) ) {
                               var items = itemData[ i ];
                               if( items.id == product_id ) {
                               		   items.qty = $('#t_'+product_id).val();
                                       cartItemData = items;
                                       break;
                               }
                           }
                       }
               }
               /***
                * Amitesh - to set gtm for remove cart - {end}
                */

				// this is a hack. Have to come up with a better solution.
				utils.pushToDataLayer({
					'event': 'removeFromCart',
					'ecommerce': {
						'remove': {
							'products': [cartItemData]
						}
					}
				});
			},
			handleDeleteItemResponse : function( data, _params ) {

				o.removecartgtm(_params.product_id);
				o.handleCartBehaviour( data, _params.product_id );
				o.updateShipTogetherStatus( data.ships_together );
			},
			// deleteNonDelItem : function(product_id){

			// 	if( typeof product_id != "undefined") { //&& $(".order-summary-row").length > 1 
			// 		var _url = root_url + '/cart/removenondelitem/' + product_id + '/1/1';
			// 		var _additionalParams = {
			// 			'pid' : product_id,
			// 			'method' : 'OOS'
			// 		};

			// 		utils.makeRequest( _url, 'POST', {}, o.handleNonDelItemResponse, o.handleError, '', _additionalParams );
			// 	}
			// },
			// handleNonDelItemResponse : function( data, _params){
				
			// 	o.removecartgtm(_params.product_id);				
			// },
			handleCartBehaviour : function( data, product_id, type ) {

				if( typeof data.data !== "undefined" && typeof data.data.status !== "undefined" && data.data.status === "success" ) {
                    var extra_discount = 0;
                    var additional_discount = 0;
                    var shipping_charge = 0;
                    var growtree_amount = 0;
                    var coupon = data.coupon;
                    var total_tax = 0;
                    var total_discount = 0;
                    var exchange_discount = 0;
                    var isProceed = 1;

                    if( typeof data.online_shipping_charge != "undefined" && $("#shipping_handling").length > 0 ) {
						$( "#shipping_handling").attr("data-shipping-handling-amount",data.online_shipping_charge );
						if( data.online_shipping_charge == 0 ) {
							if ( !$( '#shipping_handling .ck-price-detail-col .ck-free-txt' ).is( ':visible' ) ) {
                                                                $( '#shipping_handling .ck-price-detail-col .ck-free-txt' ).show();
								//$('<span class="txt-red">(Free)</span>').insertAfter("#shipping_handling .price-dtl");
							}
							$("#shipping_handling .price-nmbr").html("Rs. "+data.online_shipping_charge );
						} else {
							$("#shipping_handling .ck-price-detail-col .ck-free-txt").hide();
							$("#shipping_handling .price-nmbr").html("Rs. "+data.online_shipping_charge );
						}
                    }

                    if(coupon instanceof Object && typeof coupon.success != "undefined" && coupon.success == true && $("#additional_discount").length > 0) {
						o.updateRowDiscount(coupon.items_discount, data.cart_item);

						$("#additional_discount").attr("data-additional-discount-amount",parseInt(coupon.discount_amount)).find(".price-nmbr").html("-Rs. "+utils.currencyFormat(Math.ceil(parseInt(coupon.discount_amount))));
						$("#coupon-msgs").html(coupon.message);

						var tax = coupon.tax_info;
						total_tax = parseInt(tax.total_tax);

						$("#taxes").attr("data-total-tax",total_tax).find(".price-nmbr").html("Rs. "+utils.currencyFormat(Math.ceil(total_tax)));
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

                    o.applyFurnitureExchangeDiscount(data.furniture_exchange); // modify furniture exchange point
                    o.addOrRemoveGiftCardData( data.free_gift, data.total_amount, data.free_gift_data, data.is_free_gift_in_cart, data.delete_free_item); // free gift call


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

					if( $( '#fe_points' ).length > 0 && $( '#fe_points' ).is( ':checked' ) ) {
						exchange_discount = parseInt( $( '#fe_discount' ).attr( 'fe-discount-amount' ) );
					}

                    // $("#cartitem_"+product_id).slideUp("300",function() {
                    //     $(this).remove();

      //                   //Enable proceed button if no soldout items are there in the cart
      //                   var proceed_btn = $('#cartitem .btn_green');
      //                   if($('.order_row_ofs').length == 0 && proceed_btn.hasClass('btn_disable')){
      //                       proceed_btn.removeClass('btn_disable');
      //                       var proceed_to_addr_rel = $('#cartitem .btn_green').attr('rel');
      //                       if (typeof proceed_to_addr_rel !== typeof undefined && proceed_to_addr_rel !== false) {
      //                           proceed_btn.addClass('link_popup');
      //                           proceed_btn.attr('href',"#");
      //                       }else{
      //                           proceed_btn.attr('href',root_url+"/checkout/onepage");
      //                       }
                        // }

						// // recheck cart serviceability
						var _pin = utils.readCookie( 'serviceable_pincode' );
						if( typeof _pin != 'undefined' && _pin) {
							if( o.pageType == 'OrderSummary' ) {
								$( '.order_summary_pincode_btn' ).click();
							} else if( o.pageType == 'AddressSelection' ) {
								// var _pin = $( '#ckShippingAddress input[name="postcode"]' ).val();
								o.checkAssemblyPincode( _pin );
							}
						}
                    // });


                    if($("#taxes").length > 0) {
						total_tax = parseInt($("#taxes").attr("data-total-tax"));
                    }

                    var cart_total_pay = parseInt(Math.ceil(data.total_amount));
                    //adding offer price
                    o.updateOfferPrice(cart_total_pay,total_discount);
                    //ends

                    var total_pay = cart_total_pay + total_tax + growtree_amount + shipping_charge - additional_discount - extra_discount - exchange_discount;
                    $("#item_total").attr("data-total-amount",cart_total_pay).find(".price-nmbr").html("Rs. "+utils.currencyFormat(Math.ceil(cart_total_pay)));

                    $("#total_pay_coupon").html("Rs. " + utils.currencyFormat(Math.ceil(total_pay)  ));

                    var cart_qty = 0;
                    $(".item_list_input").each(function() {
						cart_qty = cart_qty + parseInt($(this).val());
                    });

                    if($("#shoppingcart").length > 0) {
						$("#shoppingcart span").html(cart_qty);
                    }     
                    o.emiOptionDisplay();
                

       //              if($(".noassembly_box").length > 0) {
       //                  $(".noassembly_box .noassembly_prod[data-item-info='" + product_id + "']").animate({opacity:0,height:0,width:0,borderWidth:0,padding:0, margin:0}, 500,function() {
							// $(this).remove();
							// if($(".noassembly_box .noassembly_prod").length == 0) {
							// 	$(".noassembly_box").slideUp(500);
							// 	$("a.btn_green").removeClass("btn_disable").attr("onclick","PF.CHECKOUT.addressselect();");
							// }
       //                  });

       //                  if($(".noassembly_box .noassembly_prod").length == 2) {
							// $(".noassembly_box .text_1").html("The following item is not deliverable to your location "+$(".noassembly_box .text_1").data('pincode'));
							// $(".noassembly_box .serviceable_actions:first").html("Remove this Item");
       //                  } else {
							// $(".noassembly_box .text_1").html("The following items are not deliverable to your location "+$(".noassembly_box .text_1").data('pincode'));
							// $(".noassembly_box .serviceable_actions:first").html("Remove all Items");
       //                  }
       //              }

      //               if($("#error_box").length > 0 && $("#error_box").css("display") != 'none') {
      //                   $("#error_box .noassembly_prod[data-item-info='" + product_id + "']").animate({opacity:0,height:0,width:0,borderWidth:0,padding:0, margin:0}, 500,function(){
						// 	$(this).remove();

						// 	if($("#error_box .noassembly_prod").length == 0) {
						// 		$(".noassembly_box").slideUp(500);
						// 		$("input.btn_disable").removeClass("btn_disable").attr("onclick","PF.CHECKOUT.addressselect();");
						// 	}
      //                   });
      //               } else if($("a.btn_disable").length > 0 && $("#cart_form").find('.order_row_ofs').length == 0) {
      //                   $("a.btn_disable").removeClass("btn_disable").attr("href",root_url+"/checkout/onepage/");
      //               }

      //               if( typeof type != 'undefined' && type == 1 ) {
						// $( '.noassembly_box' ).slideUp( 1000 );
      //               }

                    // var cod_exists = true;
                    // $( '.order_row' ).each(function() {
                    //     if( $( this ).attr( 'id' ) != 'cartitem_' + product_id ) {
                    //         var cod = parseInt( $( this ).attr( 'data-cod' ) );
                    //         if( cod == 0 ) {
                    //             cod_exists = false;
                    //             return false;
                    //         }
                    //     }
                    // });

      //               if(cod_exists == false) {
						// $( '.free_shipping_order_summary .saving_subtitle' ).hide();
      //               } else {
						// $( '.free_shipping_order_summary .saving_subtitle' ).show();
						// $( '#cod_charge' ).html( Math.ceil( data.cod_shipping_charge ) );
      //               }
                 
                    if( $( "#address_select_form" ).length > 0 && $(".ck-sku-row-wrap .delivery-details  .checkout-message").is(":visible") ) {
                        isProceed = 0;
                    }

                    // if( $( '.out-of-stock-box' ).length > 0 ) {
                    if( $('#ckOosProductSlider').children('.ck-non-del-product-slide').length > 0 ) {                    	
                        isProceed = 0;
                    }
                    /**
                     * DON'T VISIBLE PROCEED BUTTON IF FREE GIFT ERROR SHOW IS ENABLE
                     * IF FREE GIFT ERROR SHOW IS TRUE THE CUSTOMER CAN'T PROCEED FUTHER
                     */
                    if( isProceed ) {
                    	$( '.btn_blue' ).removeClass( 'disabled' );
                        if( !isFreeGiftErrorshow ) {
                        	$( '.btn_green, .btn_green_big' ).removeClass( 'disabled' );
                        }
                    }

                    o.handlePanasonicErrorMsg();

                    $( '.gb-loader' ).hide(); // hide loader

                    //if cart contain free gift only
                    // if( ( data.total_amount == 0 ) && ( $( '.ck-sku-row-wrap .delete_item' ).length == 0 ) ) {
                    if( data.total_amount == 0 || PF.CHECKOUT.disabled_proceed_to_checkout ) {
						//o.emptyCart();
						$( '.btn_green_big' ).addClass( 'disabled' );
						$( '.btn_green' ).addClass( 'disabled' );
                    }
				}
			},
			handleShippingChargesMsg : function( shipping_charges ) {
				if ( shipping_charges != 0 ) {
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
				} else {
					$( '#shipping_charges_msg' ).slideUp( 'slow', function() {
						$( '#free_shipping_msg' ).slideDown( 'slow' );
						if( $( '#top_shipping_msg' ).length > 0 ) {
							if( shipping_charges != 0 ) {
								$( '#top_shipping_msg' ).show();
							} else {
								$( '#top_shipping_msg' ).hide();
							}
						}
					});
				}
			},
			updateOfferPrice : function( item_total, discount ) {
				var offer_price = parseInt( item_total - discount );

				$( '#offer_price' ).attr( 'data-offer-price', offer_price );

				offer_price = utils.currencyFormat( offer_price );
				$( '#offer_price .price-nmbr' ).html( '<strong>Rs. ' + offer_price + '<strong>' );
			},
			removeNonServiceableItem : function() {
				$('.cart-loader').show();
				if( $( ".ck-sku-row-content" ).length == o.non_serviceable_items.length ) {
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
				$('.cart-loader').hide();

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

				if( $( ".ck-sku-row-content" ).length == 0 ) {
					o.emptyCart();
				}
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
				var gc_physical_shipping_charge = 0;

				if( $( '#item_total' ).length > 0 ) {
					item_total = parseInt( $( '#item_total' ).attr( 'data-total-amount' ) );
				}

				/* Furniture Exchange Start */
				// if( $( '.fe_exchange' ).length > 0 && $( '.fe_exchange' ).css( 'display' ) != 'none' ) {
				if( $( '#fe_points' ).length > 0 && $( '#fe_points' ).is( ':checked' ) ) {
					exchange_discount = parseInt( $( '#fe_discount' ).attr( 'fe-discount-amount' ) );
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

				if( $( '#physical_gc_charge' ).length > 0 ) {
					gc_physical_shipping_charge = parseInt( $( '#physical_gc_charge' ).attr( 'data-gc-amount' ) );
				}

				total_pay = item_total + total_tax + shipping_charge + growtree_amount + gc_physical_shipping_charge - extra_discount - additional_discount - exchange_discount;

				total_pay = utils.currencyFormat( Math.ceil( total_pay ) );

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
			handleEmptyCartResponse : function( _data ) {
				/**
				 * Handle the empty cart server call response
				 */
				var data;
                                try {
                                    data = $.parseJSON( _data );
				} catch( _error ) {
                                    data = _data;
				}

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

				// as per discussions with sohin, this call will always return the cart data
				//if( typeof data.data.success !== 'undefined' && data.data.success === true ) {
					var cart = data.cart_item;
					var coupon = data.coupon;
					var valid_item = data.valid_items;

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
                                       // alert(data.cashback_amt);
                                       // alert(data.free_gift_data);


                    o.addOrRemoveGiftCardData(data.free_gift, data.total_amount,data.free_gift_data, data.is_free_gift_in_cart, data.delete_free_item); //gift cart call

 					o.applyFurnitureExchangeDiscount( data.furniture_exchange );

					var _couponStatus = false;

					try {
						_couponStatus = coupon.success;
					} catch( _err ) {
						// TODO
					}

					if( typeof _couponStatus !== 'undefined' && _couponStatus === true && $( '#additional_discount' ).length > 0 ) {
						var _discAmt = parseInt( coupon.discount_amount );

						$( '#additional_discount' ).attr( 'data-additional-discount-amount', _discAmt ).find( '.price-nmbr' ).html( '-Rs. ' + utils.currencyFormat( Math.ceil( _discAmt ) ) );

						$( '#coupon-msgs' ).html( coupon.message );

						var tax = data.coupon.tax_info;
						var totalTax = parseInt( tax.total_tax );

						$( '#taxes' ).attr( 'data-total-tax', totalTax ).find( '.price-nmbr' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( totalTax ) ) );
					}

					if(  typeof data.online_shipping_charge != 'undefined' && $( '#shipping_handling' ).length > 0 ) {
						$( '#shipping_handling' ).attr( 'data-shipping-handling-amount', data.online_shipping_charge );

						if( data.online_shipping_charge == 0 ) {
							if(  !$( '#shipping_handling .ck-price-detail-col .ck-free-txt' ).is( ':visible' ) ) {
                                                                $( '#shipping_handling .ck-price-detail-col .ck-free-txt' ).show();
								//$( '<span class="txt-red">(Free)</span>' ).appendTo( '#shipping_handling .price-dtl' );
							}
						} else {
							$( '#shipping_handling .ck-price-detail-col .ck-free-txt' ).hide();
						}

						$( '#shipping_handling .price-nmbr' ).html( 'Rs. ' + data.online_shipping_charge );
					}

					/* Furniture Exchange Start */
					if( $( '#fe_points' ).length > 0 && $( '#fe_points' ).is( ':checked' ) ) {
						exchange_discount = parseInt( $( '#fe_discount' ).attr( 'fe-discount-amount' ) );
						total_discount += exchange_discount;
					}
					/* Furniture Exchange End */

					if( $( '#extra_discount' ).length > 0 ) {
						extra_discount = parseInt( $( '#extra_discount' ).attr( 'data-extra-discount-amount' ) );
						total_discount += extra_discount;
					}

					if( $( '#additional_discount' ).length > 0 ) {
						additional_discount = parseInt( $( '#additional_discount' ).attr( 'data-additional-discount-amount' ) );
						total_discount += additional_discount;
                                                //if coupon discount is 0, remove discounts applied on cart products(adde by Nishigandha N)
                                                o.removeRowDiscount();
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
						// show the default value selected
						$( '#t_' + j ).attr( 'data-val', val.quantity );
						$( '#t_' + j ).val( val.quantity );
						if(val.quantity == 1){
							$( '#t_' + j ).siblings('.ck-sku-qty-minus').addClass('disabled');                                
						}
                                                //To update cart prices on update quantity (Added by Nishigandha N)
                                                o.setPricing(data,j);
						// Removed condition from here, 
						// cause it was affecting OOS price calculation						
							var unit_price = parseInt( val.price );
							if( unit_price === undefined ) {
								unit_price = 0;
							}

							var total_price = unit_price * parseInt( val.quantity );
							cart_qty += parseInt( val.quantity );
							item_total += total_price;
							
						// replaced below cart length condition
						// since it was only needed to set offer and discount value 
						if( $( '#cartitem_' + j ).length > 0 ) {
							//$( '#cartitem_' + j ).find( '.final_pricing' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( total_price ) ) );
							if(val.is_free_gift==1 && Math.ceil( total_price )==0){
	                            $( '#cartitem_' + j ).find( '.final_pricing' ).html( '<span class="txt-red"> Free!</span>' );
	                        }else{
	                            $( '#cartitem_' + j ).find( '.final_pricing' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( total_price ) ) );
	                        }

						}
					});

					if( typeof _couponStatus != 'undefined' ) {
						o.updateRowDiscount( coupon.items_discount, cart );
					} else if( $( '#coupon_code' ).val() != '' ) {
                                                /**
                                                 * Added to handle if applied coupon get's removed due to cart not able to full fill coupon condtions.
                                                 */
                                                $( '#cancel_coupon' ).click();
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
						$( '#item_total' ).attr( 'data-total-amount', item_total ).find( '.price-nmbr' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( item_total ) ) );
						$( '#total_pay_coupon' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( total_pay + growtree_amount ) ) );
						$( '#total_pay_amount' ).val( total_pay );
					}

					if( $( '#payment_form' ).length > 0 ) {
						$( '#payment_form' ).find( '.final-pricing-checkout .txt-red' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( total_pay + growtree_amount ) ) );
						$( '#total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( total_pay + growtree_amount ) ) );
                                                $( '.total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( total_pay + growtree_amount ) ) );
					}
					
					var valid_item = (parseInt(valid_item) > 1)?valid_item+' Items':valid_item+' Item';
					$('h2.ck-pg-title span').text('('+valid_item+')');
					
					o.displayCashbackMessage();
					o.emiOptionDisplay();

					$('.cart-loader').hide();	//hide cart loader
				/*} else if( typeof data.data.success != 'undefined' && data.data.success == false ) {
					var cart = JSON.parse( data.data.cart );

					$.each( cart, function( j, val ) {
						if( $( '#cartitem_' + j ).length > 0 ) {
							var unit_price = parseInt( val.price );
							var total_price = unit_price * parseInt( val.quantity );

							$( '#cartitem_' + j ).find( 'input' ).val( parseInt( val.quantity ) );
							$( '#cartitem_' + j ).find( '.final_pricing' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( total_price ) ) );
						}
					});
				}*/
			},
			createPincodeErrorblock : function(data_pincode_failed){

				var pin_fld_html = '';
				var del_prds = '';

				$.each(data_pincode_failed, function(inx, el){
                	$('#cartitem_'+inx).slideUp();
                	pin_fld_html += '<div id="rm_cartitem_'+inx+'" class="ck-non-del-product-slide pf-padding-10">';
	                pin_fld_html += '    <div class="ck-non-del-product-img">';
	                pin_fld_html += '      <a target="_blank" href="'+root_url+'/'+el.url+'"><img src="'+js_cdn_img_1+''+el.image+'"></a>';
	                pin_fld_html += '    </div>';
	                pin_fld_html += '    <div class="ck-non-del-product-dtl">';
	                pin_fld_html += '        <a target="_blank" href="'+root_url+'/'+el.url+'" class="pf-text-light-grey font-12 ck-non-del-product-ttl">'+el.name+'</a>';
	                if(typeof el.is_rental !== undefined && el.is_rental == 1 ){
	                	pin_fld_html += '        <span data-parent_id = "'+el.parent_id+'" data-id="'+inx+'" class="ck-non-del-rmv-link"></span>';
	                }else{
	                	pin_fld_html += '        <a href="javascript:void(0)" data-parent_id = "'+el.parent_id+'" data-id="'+inx+'" class="ck-non-del-rmv-link">Add to wishlist</a>';
	                }
	                pin_fld_html += '    </div>';
	                pin_fld_html += '</div>';	     

	                del_prds += (del_prds == '')?inx:','+inx;           

                });

				
                var sibl = '<span class="ck-non-del-product-cnt font-12 pf-semi-bold-text"><span class="ck-non-del-product-cnt-no">'+Object.keys(data_pincode_failed).length+'</span> items</span><a href="javascript:void(0)" id="ck-non-del-product-prev" class="ck-bill-addr-prev inactive"></a><a href="javascript:void(0)" id="ck-non-del-product-next" class="ck-bill-addr-next"></a>';

                // 
                $('.os-non-del-ext-wrap .ck-non-del-product-slider-wrap,.ck-non-del-product-cnt,#ck-non-del-product-prev,#ck-non-del-product-next').remove();

                $('.os-non-del-ext-wrap .ck-non-del-product').prepend('<div class="ck-non-del-product-slider-wrap" id="ckNonDelSilder" style=""></div>')
				$('.ck-non-del-rm-btn').attr('data-id', del_prds);
                $('#ckNonDelSilder').html('').append(pin_fld_html);
                $('.ck-non-del-product').append(sibl);
                

                 o.osNonDelSlider();
                		
			},
			resetBankSelection : function() {
				/**
				 * Reset all bank selection dropdowns on change of payment options
				 */
				var partPayID = '';
				var partPayIDChk = '';
                var isEmi = 0;
                $('#emi_disc').css('display','none');
				if( $( '#partPayOptionArea' ).is( ':visible' )) {
					partPayID = ':not(#partPayDropDownOption)';
					partPayIDChk = 'partPayDropDownOption';
                    isEmi = 0;
				} else if( $( '#payment_method' ).val() == 'EMI' ) {
                    isEmi = 1;
                }

                if(!isEmi) {
                    $( '#ckPaymentMethodContainer select' + partPayID + ' option:eq(0)' ).attr( 'selected', 'selected' );
                    $( '#ckPaymentMethodContainer select' + partPayID ).each( function() {
                        var defaultSelected = $( this ).find( 'option:first' ).val();
                        var defaultSelectedText = $( this ).find( 'option:first' ).text();
                        var elID = $( this ).attr( 'id' );
                        if( typeof elID != 'undefined' && elID != partPayIDChk ) {
                            $( '#' + elID ).val( defaultSelected );
                            $( '#select2-' + elID+'-container' ).html( defaultSelectedText );
                        }
                    });
                }
			},
			setPaymentType : function( paymentType ) {
                            //if gift card applied the get remainning amount to be paid
                                var gcdamt = $('#gcdamt').val();
                                var growtree_pay = $('#growtree_pay_amount').val();
                                var giftcardamt = $('#total_card_amount').val();
                                
                                //if gift card is redeemed, then get deducted amount
                                if(gcdamt == 1){
                                    var total = parseInt( growtree_pay - giftcardamt );
                                    $('#newtotal_pay_amt').val(total);
                                }
                                else{
                                    $('#newtotal_pay_amt').val(growtree_pay);
                                }
                                $( '#shipping_cod' ).html( 'Rs.'+$( '#online_shipping_charge' ).val() );
				// enable the button once the payment options change
				o.changeButtonState( 'original' );

				o.resetBankSelection();
				var growTreeSelect = $( '#growTree' ).prop( 'checked' );

				$( '#payment_form' )[ 0 ].reset();

				if( growTreeSelect ) {
					$( '#growTree' ).prop( 'checked', 'checked' );
				}

				$( '#payment_option_selected' ).val( '' );
				$( '#checkoutPaySecureBtn' ).removeClass( 'disabled' );
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
                                $('.btn_green_big').removeClass('btn-loader');
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
                $('#credit_bank_select').siblings('.select2-container').hide();
                $('#bank_select_visa').siblings('.select2-container').hide();
				$('#bank_select_master').siblings('.select2-container').hide();
				$( ' #bank_select_maestro' ).siblings('.select2-container').hide();

				$( '#emi_bank_name' ).html( '' );
				$( '.emi-bank-container' ).hide();

				//Resetting extra CBC amount and uncheck checkbox
				$( '#cbc_added_amount' ).attr( 'data-cbc-amount', 0 );
				$( '#show_checkout_agreement_error' ).slideUp( 250,"linear" );
				var giftcard_enable = $( '#giftcard_enable' ).val();
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
					$( '#cod_note_gift' ).hide();
					utils.eraseCookie( 'donate' );
				} else if( paymentType == 'GIFT_CARD' ){
                                        $('#grow-tree-contri').css('display','none');
					PF.CHECKOUT.giftcard.disableGrowTree();
				} else {
					if(typeof PF.CHECKOUT.giftcard.giftcard_applied!=='undefined' && PF.CHECKOUT.giftcard.giftcard_applied.length >0 ){ // disable growtree even if gc are used with other payment gateway
						PF.CHECKOUT.giftcard.disableGrowTree();
					}else{

						var is_disabled = $( '#growTree' ).is( ':disabled' );

						$( '.checkout-charity' ).show();
						$( '#cod_note' ).hide();
						$( '#cod_note_gift' ).hide();

						if( is_disabled == true ) {
							$( '#growTree' ).removeAttr( 'disabled' );
							$( '#cod_note' ).css( 'display', 'none' );
							$( '#cod_note_gift' ).css( 'display', 'none' );
						}
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
                                        $('.netbanking').select2();
				}

				/* CBC related code starts */
				if( paymentType == 'CBC' ) {
					$( '#cashpayDoorstep, #cashpayDeposit' ).parent().removeClass( 'active' );
					// yogita's changes
					$( '#cbc_collect_cash, #cbc_deposit_cash, #cbc_charge_show, #non-refund-cbc-note, .cbc_charges, .cbc_radio_block .bank_select_wrap' ).hide();
					$( '#cbc_default_option' ).show();
				}
//				if(paymentType != 'GIFT_CARD'){
//					$("#pay_secure_btn_top").text('Proceed to Pay Securely');
//				}
				//To hide cbc charges displayed below Payable Amount whn any non-cbc option is selected
				$( '.cbc_charges' ).hide();
				/* CBC related code ends*/


				if( paymentType != 'PART_PAY' ) {

					// var total_pay = parseInt( $( '#total_pay_amount' ).val() );
					if(parseInt($('#total_card_amount').val()) > 0 ){
						var total_pay = parseInt( $( '#total_pay_without_gc' ).val() );
					}else{
						var total_pay = parseInt( $( '#newtotal_pay_amt' ).val() );
					}
					$( '#payment_form' ).find( '.final-pricing-checkout .txt-red' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( total_pay ) ) );
					$( '#total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( total_pay ) ) );
                                        $( '.total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( total_pay ) ) );
					$( '#total_pay_coupon1' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil(total_pay )));
				}
				//end for grow trees//
			},
			giftcard : {
				giftcard_enable : $( '#giftcard_enable' ).val(),
				giftcard_applied : [],
				response_array : {},
				disableGrowTree : function(){
					if( $( '#payment_donation' ).val() == 'on') {
                                            $( '#payment_donation' ).val( '' );	
                                            o.handleGrowTree();	
                                            //$( '#growTree' ).trigger( 'click' );
					}
					$( '#cod_note' ).hide();
					$( '#growTree' ).attr( 'disabled', 'disabled' ).val( '' );
					$( 'input[name="payment_donation"]' ).val( '' );
					$( '#cod_note_gift' ).css( 'display', 'block' );
					$( '.checkout-charity' ).hide();
					$( '#cod_note_gift' ).show();

					utils.eraseCookie( 'donate' );
				},
				inputValidate: function() {
					//validation for card number and pin
					var card_number = $('.input-gv-number' ).val();
					var pin = $('.input-gv-pin' ).val();
			        if(card_number.length == 16  && pin.length == 6 && (! isNaN( parseInt( card_number ) ) && isFinite( card_number ))){
			            if($('#gvSubmit').hasClass('disabled')) {
			            	$('#gvSubmit').removeClass('disabled');
			            }
			            if($('#gvSubmit').hasClass('btn-loader')){
			            	$('#gvSubmit').removeClass('btn-loader');
			            }
			        }else{
			           $('#gvSubmit').addClass('disabled');
			        }
				},
				/*function to handle gift voucher apply*/
				gift_voucher_apply : function( event ){
					event.preventDefault();
					var _url = root_url + '/checkout/checkGiftCardBalance';
					var card_number = $('.input-gv-number' ).val();
					var total_card_amount = parseInt($('#total_card_amount').val());
					var total_amount = parseInt($('#total_pay_amount').val());
					if(typeof PF.CHECKOUT.giftcard.giftcard_applied !== 'undefined' && PF.CHECKOUT.giftcard.giftcard_applied.length > 0 && $.inArray(card_number,PF.CHECKOUT.giftcard.giftcard_applied)!==-1 ){
						//show error already applied
						$('.success').hide();
						$('.fail').hide();
						$('#gvInvalidDetails').html('Gift Card already applied.').show();
					}else if(total_amount == total_card_amount){
						//show no more cards can be applied
						$('.success').hide();
						$('.fail').hide();
						$('#gvInvalidDetails').html('Total payable amount is zero, no more cards can be applied.').show();
					}else{
						var _data = {
							'gv_number' : $('.input-gv-number' ).val(),
							'gv_pin' : $('.input-gv-pin' ).val()
						};
						var _beforeSend = PF.CHECKOUT.giftcard.addRemoveButtonLoader($('#gvSubmit'));
						utils.makeRequest( _url, 'POST', _data, PF.CHECKOUT.giftcard.handleGiftCardResponse , o.handleError , _beforeSend);
					}
				},
				handleGiftCardResponse : function( data ){
					var response = $.parseJSON(data);
					PF.CHECKOUT.giftcard.addRemoveButtonLoader($('#gvSubmit')); //remove loader
					if(response.status && response.amount > 0){
						$('.fail').hide();
						//successful
						$('#card_number_span').text(response.card);
						$('#gvAppliedSuccess').show();//show success message
                                                //emi option will not be available after gift card redeemed 
                                                //if remaining amount is less than emi price check value
                                                //added by Nishigandha
                                                var growtree_pay = $('#growtree_pay_amount').val();
                                                var giftcardamt = response.amount; 
                                                var total = parseInt( growtree_pay - giftcardamt );
                                                if(total < flag_NCE_RSCHK){
                                                    $('.eminote').hide();
                                                    $('.ck-emi-choose-bank').hide();
                                                    $('.ck-emi-notavlble').show();
                                                }
						$('#gvRemovedSuccess').hide();
						var total_amount = $('#total_pay_without_gc').val();
						var card_amount = response.amount;
						var amount_payable = total_amount - card_amount;

						if(amount_payable <= 0 ){
							response.amount = total_amount;
							amount_payable = 0;
						}

						var total_card_amount = $('#total_card_amount').val();
						total_card_amount = parseInt(total_card_amount) + parseInt(response.amount);
						$('#total_card_amount').val(total_card_amount);

						var amount_html = utils.currencyFormat( Math.ceil( amount_payable ) );
						//card total is equal to total pay amount, hence disable all pgs

					    if(total_card_amount == $('#total_pay_amount').val()){
					    	$('#ckPaymentMethodNav li:not(#checkoutGIFT_CARD)').addClass('disabled');
					    	$("#pay_secure_btn_top").text('Proceed to Pay Securely');
						}else{
							$("#pay_secure_btn_top").text('Pay the remaining amount');
					        var enable_pgs = $.parseJSON($('#gc_disable_pgs').val());
							$('#ckPaymentMethodNav').find('li').each(function(){
					        	var pg_name = ($(this).attr('id'));
					    		if($.inArray(pg_name,enable_pgs) != -1 ){
					        		$(this).addClass('disabled');
					        	}
					        });
						}
                                                //adding gift card amount to payment tooltip
                                                $('#gfcard_amt').css('display','block');
                                                
						//create html and append
						var html = '<div class="ck-pgc"><a class="ck-pgc-remove pf-text-brown" href="javascript:void(0)" data-card_number="'+$('.input-gv-number').val()+'">Remove</a> <span>(-) Pepperfry Gift Card : Rs. '+utils.currencyFormat( Math.ceil( response.amount ) )+'<label class="card-nmbr">'+response.card+'</label> </span></div>';
						$('.ck-form-amnt').append(html);

						//update amount in upper corner and lower corner
						$( '#total_pay_coupon1' ).html(amount_html);
						$( '#total_pay_coupon_top' ).html(amount_html);
                                                $( '.total_pay_coupon_top' ).html(amount_html);
						//update hidden values
						$('#total_pay_without_gc').val(amount_payable);
						//update in form
						//$('#gc-amount_payable').html('<p>'+amount_html+'</p>');
						//add details in array
						response.card = $('.input-gv-number').val();
						PF.CHECKOUT.giftcard.response_array[response.card] =  response;
						PF.CHECKOUT.giftcard.giftcard_applied.push(response.card);
						$('#gc_card_details').val(btoa(JSON.stringify(PF.CHECKOUT.giftcard.response_array)));
                                                var gcamt = btoa(JSON.stringify(PF.CHECKOUT.giftcard.response_array));
                                                var jsonObj = $.parseJSON(atob(gcamt));
                                                var total_gcamt = 0;
                                                for (i in jsonObj)
                                                {
                                                   total_gcamt = total_gcamt+ parseInt(jsonObj[i]['amount']);
                                                }
                                                $('#card_amt').html('Rs. '+utils.currencyFormat( Math.ceil( total_gcamt ) ));
                                                $('#gcdamt').val('1');
                                                
						$('.input-gv-number').val('');//reset form values
						$('.input-gv-pin').val('');//reset form values
						$("#payment_gift_card").val($('#gift_card_pay').val());
						$("#payment_option_selected").val($('#gift_card_pay').val());

					}else if (response.status === true && response.amount == 0){
						$('.input-gv-number').val('');//reset form values
						$('.input-gv-pin').val('');//reset form values
                        $('.fail').hide();
                        $('#gvNoBalance').show();
                        $('.success').hide();
                    }else{
						$('.input-gv-number').val('');//reset form values
						$('.input-gv-pin').val('');//reset form values
                    	$('.fail').hide();
                    	$('.success').hide();
	                    if (response.message.indexOf('Could not find card') !== -1){
	                        $('#gvInvalidDetails').show();
	                    }else if (response.message.indexOf('deactivated') !== -1){
	                        $('#gvInvalidDetails').html('This Gift Card is deactivated.').show();
	                    }else if (response.message.indexOf('not activated') !== -1){
	                        $('#gvInvalidDetails').html('This Gift Card is not activated.').show();
	                    }else if (response.message.indexOf('Either card number or card pin is incorrect') !== -1){
	                        $('#gvInvalidDetails').html('Either card number or card pin is incorrect.').show();
	                    }else if (response.message.indexOf('expired') !== -1){
	                        $('#gvExpired').show();
	                    }else{
	                        $('#gvInvalidDetails').html('There was an error processing your request. Please try again.').show();
	                    }
					}
					// if 5 gift cards are redeemed, hide form
					if(typeof PF.CHECKOUT.giftcard.giftcard_applied!=='undefined' && PF.CHECKOUT.giftcard.giftcard_applied.length == 5){
						$('.gv-apply-wrap').hide();
						$('.gv-msg ck-gc-applied success').hide();
                                                $('.gv-msg ck-gc-expired fail').hide();
						$('#payGiftMaxSubttl').show();
					}else{
						$('.gv-apply-wrap').show();
						$('.gv-msg ck-gc-applied success').show();
                                                $('.gv-msg ck-gc-expired fail').show();
						$('#payGiftMaxSubttl').hide();
					}
				},
				remove_giftvocher : function(){
					var card_number = $(this).data('card_number');
                                        $('#gcdamt').val('0');
					var _pos = $.inArray(String(card_number),PF.CHECKOUT.giftcard.giftcard_applied);
					if(typeof PF.CHECKOUT.giftcard.giftcard_applied!=='undefined' && _pos!==-1){
						$('.fail').hide();
						$('.success').hide();
						$(this).closest('.ck-pgc').slideUp(function () {
                                                    $(this).remove();
                                                    var gcamt = btoa(JSON.stringify(PF.CHECKOUT.giftcard.response_array));
                                                    var jsonObj = $.parseJSON(atob(gcamt));
                                                    var total_gcamt = 0;
                                                    for (i in jsonObj)
                                                    {
                                                       total_gcamt = total_gcamt+ parseInt(jsonObj[i]['amount']);
                                                    }
                                                    $('#card_amt').html('Rs. '+utils.currencyFormat( Math.ceil( total_gcamt ) ));
                                                    $('#gcdamt').val('1');
                                                    if(PF.CHECKOUT.giftcard.giftcard_applied.length == 0){
                                                        $('#gfcard_amt').css('display','none');
                                                    }
							if( $('.ck-pgc-remove').length < 5 ) {
								$('.ck-payment-form').show();
								$('#ck-payment-ttl').show();
								//$('#payGiftMaxSubttl').hide();
							}

							var total_card_amount = $('#total_card_amount').val();
							if(total_card_amount < $('#total_pay_amount').val()){
								$("#pay_secure_btn_top").text('Pay the remaining amount');
								var enable_pgs = $.parseJSON($('#gc_disable_pgs').val());
								$('#ckPaymentMethodNav').find('li').each(function(){
									var pg_name = ($(this).attr('id'));
									if($.inArray(pg_name,enable_pgs) == -1 ){
										$(this).removeClass('disabled');
									}
								});
							}
	                    });

	                    var gift_number = String(card_number);
	                    var gift_number_to_show = "XXXX" + gift_number.slice(-5);
	                    $('#removed_card_number_span').text(gift_number_to_show);

	                    $('#gvAppliedSuccess').hide();
	                    $('#gvRemovedSuccess').show();
                            //emi option will be available after gift card removed 
                            //if amount is greater than emi price check value
                            //added by Nishigandha
                            var growtree_pay = parseInt($('#growtree_pay_amount').val());
                            if(growtree_pay > flag_NCE_RSCHK){
                                $('.eminote').show();
                                $('.ck-emi-choose-bank').show();
                                $('.ck-emi-notavlble').hide();
                            }
	                    var card_data = PF.CHECKOUT.giftcard.response_array[card_number];
	                    var total_amount = $('#total_pay_without_gc').val();
	                    var card_amount = card_data.amount;
						var amount_payable = parseInt(card_amount) + parseInt(total_amount);
						var amount_html = utils.currencyFormat( Math.ceil( amount_payable ) );

						var total_card_amount = $('#total_card_amount').val();
						total_card_amount = parseInt(total_card_amount) - parseInt(card_amount);
						$('#total_card_amount').val(total_card_amount);

						//update amount in upper corner and lower corner
						$( '#total_pay_coupon1' ).html(amount_html);
						$( '#total_pay_coupon_top' ).html(amount_html);
                                                $( '.total_pay_coupon_top' ).html(amount_html);
						//update hidden values
						$('#total_pay_without_gc').val(amount_payable);
						//update in form
						//$('#gc-amount_payable').html('<p>'+amount_html+'</p>');
						//delete from all arrays
						PF.CHECKOUT.giftcard.giftcard_applied.splice(_pos, 1);
						delete PF.CHECKOUT.giftcard.response_array[card_number];

						$('#gc_card_details').val(btoa(JSON.stringify(PF.CHECKOUT.giftcard.response_array)));

						if(PF.CHECKOUT.giftcard.giftcard_applied.length==0){
							//all gift cards are removed
                                                        $( '#cod_note' ).css( 'display', 'none' );
							$("#payment_gift_card").val('');
							$("#payment_option_selected").val('');
							$("#ckPaymentMethodNav li").removeClass('disabled');
						}
					}
				},
				addRemoveButtonLoader : function (ele){
					if(ele.hasClass('btn-loader')){
						ele.removeClass('btn-loader');
					}else{
						ele.addClass('disabled').addClass('btn-loader');
					}
				}
			},
			/*function to handle gift voucher remove*/
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
					/* Added by Aditya Pandey - Since it was fetching the wrong total*/
					var newtotal=Math.ceil(parseInt($(".checkout-partpay-amount").attr("data-netpayable")));
					if(isNaN(newtotal)){
						total_pay = total_pay + donation + item_count + shipping_charge + total_tax - extra_discount - additional_discount - exchange_discount;
					}
					else{
						total_pay=newtotal;
					}

					/*IF GROW TREE OPTION SELECTED THEN ADD GROW TREE CHARGERS TO TOTAL PAY AND SHOW TO USER*/

					$("#newpartamt_block").text(total_pay);
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

					// TO show updated you pay
					var finalyoupay = utils.currencyFormat(Math.ceil($("#growtree_pay_amount").val()));

					if($(".ck-price-detail").length == 0){
						$( '#total_pay_coupon1' ).html( 'Rs. ' + finalyoupay );
					}
					else if($(".ck-price-detail").length > 0){
						$( '#total_pay_coupon' ).html( 'Rs. ' + finalyoupay );
						$( '#total_pay_coupon1' ).html( 'Rs. ' + finalyoupay );
					}



				} else {
					/* Added by Aditya Pandey - Since it was fetching the wrong total*/
					var newtotal=Math.ceil(parseInt($(".checkout-partpay-amount").attr("data-netpayable")));

					if(isNaN(newtotal)){
						total_pay = total_pay + item_count + shipping_charge + total_tax - extra_discount - additional_discount - exchange_discount;
					}
					else{
						total_pay=newtotal;
					}
					
					$("#newpartamt_block").text(total_pay);

					/*IF GROW TREE OPTION DE SELECTED THEN HIDE THE GROW TREE RUPEE MESSAGE AND DELETE THE COOKIE DONATE*/

					// Since if was subtracting the value again

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
					$( '#growtree_contribution' ).attr( 'data-growtree-amount', 0 );
					$( '#growTree' ).removeAttr( 'checked' );

					if($( '#growTree' ).length > 0 ) {
						$( '#payment_donation' ).val( '' );
					}


					/*	Added by Aditya Pandey	*/
					// To show updated you pay


					var finalyoupay = utils.currencyFormat(Math.ceil($("#growtree_pay_amount").val()));
					if($(".ck-price-detail").length == 0){
						$( '#total_pay_coupon1' ).html( 'Rs. ' + finalyoupay );
					}
					else if($(".ck-price-detail").length > 0){
						$( '#total_pay_coupon' ).html( 'Rs. ' + finalyoupay );
						$( '#total_pay_coupon1' ).html( 'Rs. ' + finalyoupay );
					}

					utils.eraseCookie( 'donate' );



				}

				/* Ganesh.b
				   Partpayment bug due to Duplicate Key Setting resolved
				*/
				document.cookie = "newpartamt="+total_pay;
				
				/*Part Payment Code Starts*/
				if( $( "#checkoutPartPayContainer" ).is( ':visible' ) ) {
					var _price = utils.currencyFormat( Math.ceil( total_pay ) );

					if( $('#ckPaymentMethodNav').length ) {
					// final page
					$( '#total_pay_coupon1' ).html( 'Rs. ' + _price );
					$( '#total_pay_coupon_top' ).html( 'Rs. ' + _price );
                                        $( '.total_pay_coupon_top' ).html( 'Rs. ' + _price );
					} else {
					$( '#total_pay_coupon' ).html( 'Rs. ' + _price );
					}

					if( $( '#payment_form' ).length > 0 ) {
					$( "#payment_form" ).find( ".final-pricing-checkout .txt-red" ).html( "Rs. " + _price );
					$( '#total_pay_coupon_top' ).html( 'Rs. ' + _price );
                                        $( '.total_pay_coupon_top' ).html( 'Rs. ' + _price );
					}


					var part_remaining_amount = parseInt( $( "#net_part_payment_remaining" ).attr( "data-net_part_payment_remaining" ) );

					if( !isNaN( part_remaining_amount ) ) {
						total_pay -= part_remaining_amount;
						var convenience_fee = parseInt( $( '#convenience_fee' ).attr( 'data-convenience_fee' ) );

						if( !isNaN( convenience_fee ) ) {
							total_pay += convenience_fee;
						}
					}
				}
				// Added by Aditya Pandey
				else{

					var total_pay = parseInt($("#total_pay_amount").val());

					var payment_donation = $("#payment_donation").val();

					if(payment_donation=="on"){
						total_pay+=donation;
					}	

					$( '#total_pay_coupon1' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil(total_pay) ));
					$( '#total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil(total_pay) ));
                                        $( '.total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil(total_pay) ));
					$('#newtotal_pay_amt').val(total_pay);	

					var emi_bank_select = $('#emi_bank_select option:selected');

					if(parseInt(emi_bank_select.val())){
						o.setPaymentMethod( emi_bank_select.val(), emi_bank_select.text() );
					}

					if(payment_donation=="on"){
						if(typeof no_cost_emi_price_check !== 'undefined' && total_pay >= parseInt(no_cost_emi_price_check)){
							$('#non_emi_note').css('display','none');
							$('.addGrowTree').css('display','block');
						}
					}else{

						if(typeof no_cost_emi_price_check !== 'undefined' && total_pay < parseInt(no_cost_emi_price_check)){
							$('#non_emi_note').css('display','block');
							$('.addGrowTree').css('display','none');
							$('.emi-bank-container').css('display','none');
						}
					}
									
				}

				/*Part Payment Code Ends*/

				//CASHE BACK
				o.displayCashbackMessage();		
				o.emiOptionDisplay();		
			},
			handleWalletError : function() {
				var prepend = '';
                                var gcdamt = $('#gcdamt').val();
				var isPartPay = $( "#checkoutPartPayContainer" ).css( "display" );
				if( ( isPartPay != 'none' ) && ( typeof isPartPay != 'undefined' ) ) {
				   prepend = 'partpay_';
				}

				if( $( '#payment_method' ).length > 0 ) {
					var totalPay        = parseInt( $( '#growtree_pay_amount' ).val());
					var paymentMethod   = $( '#payment_method' ).val().toLowerCase();

					if(paymentMethod=="wallet"){  
                                            if(gcdamt == 1){
                                                var growtree_pay = $('#growtree_pay_amount').val();
                                                var giftcardamt = $('#total_card_amount').val();
                                                var total = parseInt( growtree_pay - giftcardamt );
                                                $('#newtotal_pay_amt').val(total);
                                            }  
                                            var totalPay = parseInt( $( '#newtotal_pay_amt' ).val());
	
 					}
 					else{
 						var totalPay = parseInt( $( '#growtree_pay_amount' ).val());
 					}
					if( prepend != '' ) {
						// part_pay option is selected
						var part_pay_amt = parseInt( $( ".checkout-partpay-amount" ).attr( "data-netpayable" ) );
						// Added by Aditya
						var newtotal_pay_amt=parseInt($("#newtotal_pay_amt").val());
						var total_pay_amt=parseInt($("#total_pay_amount").val());

						var isChecked = $( '#growTree' ).is( ':checked' );
						if( isChecked ) {
							part_pay_amt += donation;
							// If the oldpartpay amt is greater than totalpay
							if(part_pay_amt>totalPay){
								newtotal_pay_amt=newtotal_pay_amt+donation;
								$("#newtotal_pay_amt").val(newtotal_pay_amt);
							}

						}
						else{
								if(part_pay_amt<=totalPay){
								newtotal_pay_amt=newtotal_pay_amt-donation;
								$("#newtotal_pay_amt").val(newtotal_pay_amt);
								}
								if(paymentMethod=="wallet"){
									$("#newtotal_pay_amt").val($("#total_pay_amount").val());
								}
						}

						totalPay = part_pay_amt;
						$( '#growtree_pay_amount' ).val( part_pay_amt );
						// Added by Aditya Pandey
						// var paymenttype = $("#payment_method").val();
						var paymenttype = $("#part_pay").val();

						var payment_donation = $("#payment_donation").val();

						if(payment_donation="on"){
							$( '#total_pay_coupon1' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil(part_pay_amt) ));
							$( '#total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil(part_pay_amt) ));
                                                        $( '.total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil(part_pay_amt) ));
						}
						else if(paymenttype==1){
								$( '#total_pay_coupon1' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil(part_pay_amt) ));
								$( '#total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil(part_pay_amt) ));
                                                                $( '.total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil(part_pay_amt) ));

						}

					}

					if( totalPay > parseInt( wallet_price_check ) ) {
						$( '.wallet_err' ).show();
						$( '#' + prepend + 'checkoutWALLETContainer' ).find( 'label' ).addClass( 'disabled' );

						$( '#' + prepend + 'checkoutWALLETContainer' ).find("input[type='radio']").each(function(){
							$( this ).prop( "disabled", true );
						});

						if( paymentMethod == 'wallet' ) {
							var isChecked = $( '#growTree' ).is( ':checked' );
							$( '#payment_form' )[ 0 ].reset();
							if( isChecked ) {
								// the form gets reset above
								$('#growTree' ).attr( 'checked', true );
							}

							$( '#payment_form .payment_tab_container .active' ).removeClass( 'active' );
							$( '#payment_option_selected' ).val( '' );

							$( '.btn_green_big' ).addClass( 'disabled' ).removeAttr( 'onclick' );
						}

						$( '#' + prepend + 'checkoutWALLETContainer .ck-wallet-available' ).hide();
						$( '#' + prepend + 'checkoutWALLETContainer .wallet-unavlbl-sec' ).show();
					} else {
						$( '.wallet_err' ).hide();
						$( '#' + prepend + 'checkoutWALLETContainer' ).find( 'label' ).removeClass( 'disabled' );

						$( '#' + prepend + 'checkoutWALLETContainer' ).find( 'input[type="radio"]' ).each(function(){
							$( this ).removeProp( 'disabled' );
						});

						if( paymentMethod == 'wallet' ) {
							//$('#growTree' ).attr( 'checked', false );

							$( '.btn_green_big' ).removeClass( 'disabled' ).attr( 'onclick', 'PF.CHECKOUT.saveOrder();' );
						}

						$( '#' + prepend + 'checkoutWALLETContainer .ck-wallet-available' ).show();
						$( '#' + prepend + 'checkoutWALLETContainer .wallet-unavlbl-sec' ).hide();
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
					$(".btn_green").removeClass("disabled").attr("onclick","PF.CHECKOUT.saveOrder();");
                                        $("#s2id_partPayDropDownOption").show();
				} else {
					$("#payment_option_selected").val("");
					$('#payment_method').val("PART_PAY");
					$("#paymenttype_select").next(".custom-combobox").find("input").val("");
					$(".btn_green").addClass("disabled").removeAttr("onclick");

					$("#view_partpay_details,#partpay_payment-selection").slideUp("slow", function(){
						$("#payment_options_area").slideUp("slow",function(){
							$("#payment_options_area").html("");
							$("#part_payment_breakupdetails").slideDown("slow");
						});
					});
					var netpayable = parseInt( $( ".checkout-partpay-amount" ).attr( "data-netpayable" ) );
					if( $( '#growTree' ).is( ':checked' ) ) {
						netpayable += donation;
					}
					$(".final-pricing-checkout .txt-red").html("Rs. "+utils.currencyFormat( netpayable ));
					$( '#total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( netpayable ) );
                                        $( '.total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( netpayable ) );
					$("#part_pay").val(0);
					// reset values and hide options for partpay
					$("#s2id_partPayDropDownOption").select2('val',$("#partPayDropDownOption option:eq(0)").val());
					$("#s2id_partPayDropDownOption").hide();
					var _dropdownID = $( '#partPayOptionArea' ).find( 'select:visible' ).attr( 'id' );
					if( typeof _dropdownID != 'undefined' ) {
						$( '#s2id_' + _dropdownID ).select2( 'val', $( '#' + _dropdownID ).find('option:eq(0)').val() );
						$( '#s2id_' + _dropdownID ).hide();
					}
					$('#partPayOptionArea').find('input[type="radio"]').prop('checked', false);
					$('#partPayOptionArea').hide();
				}
			},
			checkCBCrange : function( total_pay ) {
				/**
				 * This function takes total Payable amount as an input and checks if the amount is within specified CBC range.
				 * If not, then shows error
				 */
				var payment_method = $( '#payment_method' ).val();
				var payment_id = $( '#payment_option_selected' ).val();

				//var cbc_data = $.parseJSON( cbc_agent_data );
                                var cbc_data;
                                try {
                                    cbc_data = $.parseJSON( cbc_agent_data );
				} catch( _error ) {
                                    cbc_data = cbc_agent_data;
				}

				$.each( cbc_data, function( index, value ) {
					$.each( value, function( index1, value1 ) {
						if( parseInt( index1 ) == parseInt( payment_id ) ) {
							var min = parseInt( value1[ 'min' ] );
							var max = parseInt( value1[ 'max' ] );

							//Below if block handles CBC case: if cart price is greater than max value for the selected CBC agent including grow tree amt thn error should be shown otherwise proceed with the normal flow.
							if( ( total_pay < min ) || ( total_pay >= max ) ) {
								var min_cbc = utils.currencyFormat( min );
								var max_cbc = utils.currencyFormat( ( max - 1 ) );

								var error_msg = 'To use Cash Pay option your payable amount should be in the range ' + min_cbc + ' to ' + max_cbc;
                                                                $( "#pay_secure_btn_top" ).addClass( "disabled" );
								$( '#show_checkout_error' ).text( error_msg ).slideDown( 250, 'linear', function() {
									$( 'html, body' ).animate({scrollTop: $( this ).offset().top - 160}, 500 );
								});
                                                                $('.btn_green_big').removeClass('btn-loader');
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
                
                $('#bank_select_visa').siblings('.select2-container').hide();
				$('#bank_select_master').siblings('.select2-container').hide();
				$('#bank_select_maestro').siblings('.select2-container').hide();
				$('#credit_bank_select').siblings('.select2-container').hide();
				
				if ( cardType == 'visa' ) {
					$( ' #s2id_' + preId + 'bank_select_visa' ).show();
					$( ' #' + preId + 'bank_select_visa' ).show();
					$( ' #' + preId + 'bank_select_visa' ).siblings('.select2-container').show();
				} else if ( cardType == 'master' ) {
					$( ' #s2id_' + preId + 'bank_select_master' ).show();
					$(  ' #' + preId + 'bank_select_master' ).show();
					$(  ' #' + preId + 'bank_select_master' ).siblings('.select2-container').show();
				} else if ( cardType == 'maestro' ) {
                    $('#bank_select_maestro').select2();
                    $( ' #s2id_' + preId + 'bank_select_maestro' ).show();
					$( ' #' + preId + 'bank_select_maestro' ).show();
					$( ' #' + preId + 'bank_select_maestro' ).siblings('.select2-container').show();
				} else if( cardType == 'american' ) {
                    $('#credit_bank_select').select2();
					$( ' #s2id_' + preId + 'credit_bank_select' ).show();
					$( ' #' + preId + 'credit_bank_select' ).show();
					$( ' #' + preId + 'credit_bank_select' ).siblings('.select2-container').show();
				}

				return false;
			},
			saveOrder : function() {
                                $('.btn_green_big').addClass('btn-loader');
				var payment_method = $( '#payment_method' ).val();
				var payment_id = $( '#payment_option_selected' ).val();
                o.changeButtonState( 'loading' );

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
                            var cbc_option_visible = $('.cbc_radio_block').css('display').toLowerCase();
                            if(cbc_option_visible == 'none') {
                                error_msg = 'Please select other Payment Option to proceed';
                            } else {
                                error_msg = 'Please Select a Payment Option for CashPay';
                            }
							break;
						case 'GIFT_CARD':
							var giftcard_enable = $('#giftcard_enable').val();
							var amount_payable = $('#total_pay_without_gc').val();
							if(giftcard_enable && amount_payable > 0 ) {
                                error_msg = 'Please select other Payment Option to proceed';
                            }
                            break;
						default:
							error_msg = 'Please Select Proper Payment Option From ' + payment_method
							break;
					}

					/*Code to show error msg on checkout page */
					$( '#show_checkout_error' ).text( error_msg ).slideDown( 250, 'linear', function() {
						$( 'html, body' ).animate({scrollTop: $(this).offset().top - 160}, 500);
					});
                                        $('.btn_green_big').removeClass('btn-loader');

					$( '#payment_form .payment_tab_header_list ul li a[class=active]' ).addClass( 'red_border' );
					var rel = $( '#payment_form .payment_tab_header_list ul li a[class=active]' ).attr( 'rel' );
					$( '#' + rel ).css({'border':'1px solid #ec1e20'});
                    o.changeButtonState( 'original' );
					return false;
				} else if( payment_method == 'CBC' ) {
					if( $( '#show_checkout_error' ).is( ':visible' ) ) {
						$( '#show_checkout_error' ).slideDown(250,"linear",function(){
							$( 'html, body' ).animate({scrollTop: $(this).offset().top - 160}, 500);
						});
                                                $('.btn_green_big').removeClass('btn-loader');
					} else {
						/*Code to remove error msg from checkout page */
						$( '#show_checkout_error').slideUp(250,"linear");
						$( '#payment_form .payment_tab_header_list ul li a[class=red_border]').removeClass('red_border');
						var rel = $('#payment_form .payment_tab_header_list ul li a[class=active]').attr("rel");
						$( '#'+rel).css({'border':'1px solid #d7d7d7'});

                        if($('#codAgreement1').is( ":checked" )) {
                            utils.eraseCookie( 'billing_address_changed' );
                            $( '#payment_form' ).submit();
                            $( '#pay_secure_btn_top' ).addClass( 'btn_loader' );
                        } else {
                            $( '#show_checkout_agreement_error' ).text( 'Please accept the cash to be collected from your doorstep' ).slideDown( 250, 'linear', function() {
                                $( 'html, body' ).animate({scrollTop: $(this).offset().top - 160}, 500);
                            });
                            o.changeButtonState();
                        }
                    }
				} else if( payment_method == 'GIFT_CARD' ){
					var card_amount = parseInt($('#total_card_amount').val());
					var total_amount = parseInt($('#total_pay_amount').val());
					var total_pay_without_gc = parseInt($('#total_pay_without_gc').val());
					if( total_amount != card_amount && total_pay_without_gc > 0 ){
						$( '#show_checkout_error' ).text( 'Please pay the remaining amount with other payment method.' ).slideDown( 250, 'linear', function() {
							$( 'html, body' ).animate({scrollTop: $(this).offset().top - 160}, 500);
						});
                                                $('.btn_green_big').removeClass('btn-loader');

						$( '#payment_form .payment_tab_header_list ul li a[class=active]' ).addClass( 'red_border' );
						var rel = $( '#payment_form .payment_tab_header_list ul li a[class=active]' ).attr( 'rel' );
						$( '#' + rel ).css({'border':'1px solid #ec1e20'});
	                    o.changeButtonState( 'original' );
					}else{
						/*Code to remove error msg from checkout page */
						$('#show_checkout_error').slideUp(250,"linear");
						$('#payment_form .payment_tab_header_list ul li a[class=red_border]').removeClass('red_border');
						var rel = $('#payment_form .payment_tab_header_list ul li a[class=active]').attr("rel");
						$('#'+rel).css({'border':'1px solid #d7d7d7'});

	                    utils.eraseCookie( 'billing_address_changed' );
						$("#payment_form").submit();
						$("#pay_secure_btn_top").addClass("btn_loader");
					}
				} else {
					/*Code to remove error msg from checkout page */
					$('#show_checkout_error').slideUp(250,"linear");
					$('#payment_form .payment_tab_header_list ul li a[class=red_border]').removeClass('red_border');
					var rel = $('#payment_form .payment_tab_header_list ul li a[class=active]').attr("rel");
					$('#'+rel).css({'border':'1px solid #d7d7d7'});

                    utils.eraseCookie( 'billing_address_changed' );
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
				var isPartPay = $( "#checkoutPartPayContainer" ).is( ":visible" );

				if( ( paymentMethod == 'emi' && !isNaN( parseInt( payment_method_id ) ) ) ) {
					// reset the values as the emi tenure needs to be selected
					$( '#payment_option_selected' ).val( '' );
					$( '#payment_' + paymentMethod ).val( '' );
					o.setEMIOptions( payment_method_id, payment_method_name );
				} else if( isNaN( parseInt( payment_method_id ) ) ) {
					$( '#payment_method' ).val( payment_method_id );
					if( payment_method_id.toLowerCase() == 'net_banking' ) {
						$( '#s2id_partpay_bank_select' ).show();
					}
				} else if( !isNaN( parseInt( payment_method_id ) ) && ( isPartPay != 'none' ) && ( typeof isPartPay != 'undefined' ) ) {
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

					$( "#payment_form" ).find( ".final-pricing-checkout .txt-red" ).html( "Rs. " + utils.currencyFormat( Math.ceil( total_pay ) ) );
					$( '#total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( total_pay ) ) );
                                        $( '.total_pay_coupon_top' ).html( 'Rs. ' + utils.currencyFormat( Math.ceil( total_pay ) ) );
					o.checkCBCrange( total_pay );
				}

				$( '.payment_option_radio' ).change( function() {
					var value = parseInt( $( this ).val() );
				});

				if( $( '#payment_method' ).length > 0 ) {
					if( paymentMethod === 'net_banking' ) {
						$( '#checkoutNET_BANKINGContainer' ).find( 'input[type="radio"]:checked' ).prop( 'checked', false ).parent().removeClass('active');
					}

					if( isPartPay == true ) {
						$( '#partpay_checkoutNET_BANKINGContainer' ).find( 'input[type="radio"]:checked' ).prop( 'checked', false ).parent().removeClass('active');
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
					$( '.ck-emi-table.emi-bank-container .ck-emi-table-content:visible input[type="radio"]:checked' ).prop( 'checked', false );
					$( '.ck-emi-table.emi-bank-container .ck-emi-table-content' ).hide();

					$( preId + ' #emi_bank_name' ).html( bankname );

					$( preId +' #emi_table_' + bankpos ).find( '.ck-emi-tr' ).each(function(){

						o.showEMIValues( parseInt( $( this ).attr( 'id' ) ) );
					});

					$( '.ck-emi-table.emi-bank-container' ).show();
					$( '.ck-emi-table.emi-bank-container #emi_table_' + bankpos ).show();
				} else {
					$(preId +' #emi_note' ).hide();
					$(preId +' #no_bank' ).show();
					$('#payment_form' )[ 0 ].reset();
					//added to fixed emi issue regarding choose your bank option
					$('#payment_option_selected' ).val( '' );
					$('.ck-tab-content' ).find( '.active' ).removeClass( 'active' );
					$('#payment_form' )[ 0 ].reset();
				}

				if( bankpos > 0 ) {
					$( '.emi_options_text span' ).text( bankname );
					$( '.emi_tables_wrap' ).show( 100 );
					$( '#checkoutEMIContainer .bank_select_wrap' ).addClass( 'active' );
					$( '.emi_options_table' ).hide();
					$(preId +' #emi_table_' + bankpos ).fadeIn( 200 );
				} else {
					$( '#checkoutEMIContainer .bank_select_wrap' ).removeClass( 'active' );
					$( '.emi_options_table' ).hide();
					$( '.emi_tables_wrap' ).fadeOut( 100 );
				}
			},
			showEMIValues : function( id ) {
				/**
				 * Calculate EMI break down and append to respective html
				 */
				var preId    = "";
				var totalAMt = $( '#newtotal_pay_amt' ).val();
				var isPartPay = $( "#checkoutPartPayContainer" ).css( "display" );
				if( ( isPartPay != 'none' ) && ( typeof isPartPay != 'undefined' ) ) {
					preId    = "#checkoutPartPayContainer";
					totalAMt = o.getTotalPartPayAmt();
				}

				var emi_breakup_values = $(preId +' #emi_bu').val();
				var emi_breakup = {};

				if( typeof emi_breakup_values != 'undefined' ) {

					var emi_breakup;
                                        try {
                                            emi_breakup = $.parseJSON( emi_breakup_values );
                                        } catch( _error ) {
                                            emi_breakup = emi_breakup_values;
                                        }
				}

				if( typeof id != 'undefined' && id > 0 && emi_breakup.hasOwnProperty( id ) ) {
                    var rate = emi_breakup[ id ].rate;
                    var bu = emi_breakup[ id ].bu;
                    var is_no_cost_emi = typeof emi_breakup[ id ].no_cost_emi == "undefined" ? 0 :1;
                    var discounted_interest = 0;
                    if(totalAMt > 0 && rate > 0 && bu > 0) {
						var payment = o.PMT(rate/1200,bu,- totalAMt).toFixed(2);

					
						if( payment > 0 ) {
							var TOTAL=(payment * bu).toFixed(2);
							var INTEREST = (TOTAL - totalAMt).toFixed(2);

							if(is_no_cost_emi == 1 && no_cost_emi_option == true){
								var new_principle_amount = o.PMTR(rate/1200,bu,totalAMt).toFixed(2);
								INTEREST =discounted_interest = totalAMt - new_principle_amount;
								payment = totalAMt / bu;
							}

							$(preId +' #'+id+' label').text(bu + ' Months');
							$(preId +' #'+id+' .rate').text(rate + '%');

							$(preId +' #'+id+' .interest').text('Rs.'+utils.currencyFormat(Math.round(INTEREST)));
							$(preId +' #'+id+' .installment').text('Rs.'+utils.currencyFormat(Math.round(payment)));
							if(no_cost_emi_option == true){
								var totalAmountCal = is_no_cost_emi == 0 ? TOTAL : totalAMt;
								
								$(preId +' #'+id+' .nc-amt-payable').text('Rs.'+utils.currencyFormat(Math.round(totalAmountCal)));
								$(preId +' #'+id+' .nc-emi-discount').text((discounted_interest > 0) ? '(-) Rs.'+utils.currencyFormat(Math.round(discounted_interest)) : discounted_interest);
							}
						}
                    }
				}
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
			changeState : function() {
				var country_id = $( "#country_id" ).val();

				if( country_id != "IN" ) {
					$( "#region_txtbox" ).css( "display", "inline-block" );
					$( "#region_select" ).css( "display", "none" );
					$( "#region_txtbox" ).prop( "name", "region" );
					$( "#region_select" ).prop( "name", "region_select" );
					$( "#region_select" ).removeClass('required inputerror' );
					$( '#region_txtbox' ).next().css('display','block');
					$( '#region_txtbox' ).addClass( 'required' );
					$( '#city' ).val( "" );   //remove city value
					$("#postcode").attr('maxlength',10);
					// Added to disable the button's when country is not India
					$( '.btn_green_big' ).addClass( 'disabled' );

				} else {
					$( "#region_txtbox" ).css( "display","none" );
					$( "#region_select" ).css( "display","inline-block" );
					$( "#region_select" ).prop( "name","region" );
					$( "#region_txtbox" ).prop( "name","region_text" );
					$( '#region_txtbox' ).removeClass( 'required inputerror' );
					$( '#region_txtbox' ).next().css('display','none');
					$( "#region_select" ).addClass( 'required' );
					$("#postcode").attr('maxlength','6');

					// $( '.btn_green_big' ).removeClass( 'disabled' );
				}

				var bill_country_id = $( "#bill_country_id" ).val();

				if( bill_country_id != "IN" ) {
					$( "#bill_region_txtbox" ).css( "display", "inline-block" );
					$( "#bill_region_select" ).css( "display", "none" );
					$( "#bill_region_txtbox" ).prop( "name", "bill_region" );
					$( "#bill_region_select" ).prop( "name", "bill_region_select" );
					$( "#bill_region_select" ).removeClass( 'required inputerror' ).removeClass( 'required inputerror' );
					$( '#bill_region_txtbox' ).addClass( 'required' );
					$( '#bill_region_txtbox' ).next().css( 'display','block' );
					$( '#bill_city' ).val( "" );
					$( "#bill_postcode" ).attr('maxlength',10);
				} else {
					$( "#bill_region_txtbox" ).css( "display","none" );
					$( "#bill_region_select" ).css( "display","inline-block" );
					$( "#bill_region_select" ).prop( "name","bill_region" );
					$( "#bill_region_txtbox" ).prop( "name","bill_region_text" );
					$( '#bill_region_txtbox' ).removeClass( 'required inputerror' );
					$( '#bill_region_txtbox' ).next().css( 'display','none' );
					$( "#bill_region_select" ).addClass( 'required' );
					$("#bill_postcode").attr('maxlength','6');
				}
			},
			postCodeCheck : function() {
				/**
				 * pincode verification on key up
				 */
                $( '#postcode' ).keyup(function( e ) {
					var post_code = $(this).val();
					var country_id = $( "#country_id" ).val();
					/*
					if(country_id!="IN"){
						$("#postcode").removeAttr('maxlength');
					}
					*/
                                       //o.verifyPincode(frmId);
					if( post_code.length == 6 && window.last_verified_pin != post_code ) {
						window.last_verified_pin = post_code;

						var id = e.target.id; // getting id of current postcode field
						if( $( this ).parents( '#address_select_form' ).length ) {
							o.checkAssemblyPincode( post_code , id);
						}
						
						//o.pinFormComplete( post_code, id );

						e.preventDefault();
					}
				});

				$( '#bill_postcode' ).keyup(function( e ) {
					var post_code = $( this ).val();
					var country_id = $( "#bill_country_id" ).val();

					if(country_id!="IN"){
						$("#bill_postcode").attr('maxlength',10);
					}
 //o.verifyPincode(frmId);
					if( post_code.length == 6) {
						window.last_bill_pin = post_code;

						var id = e.target.id;
						o.checkAssemblyPincode( post_code , id);
						//o.pinFormComplete( post_code, id );

						e.preventDefault();
					}
				});
			},
			pinFormComplete : function( postcode, id ) {
				/**
				 *	e form for auto-complete request
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
				//alert(1);
				var _url = root_url + '/config_pincode/getpindata';
				var _data = data;
				var _params = {
					'cityId' : cityId,
					'regionId' : regionId
				};

				utils.makeRequest( _url, 'POST', _data, o.handleAutoCompleteResponse, o.handleError, '', _params );
			},
			handleAutoCompleteResponse : function( result, _params ) {
				$( '#' + _params.cityId ).val( '' );
				$( "#" + _params.cityId ).parent().removeClass( 'input-filled' );
				$( '#' + _params.regionId ).select2( 'val', $( '#' + _params.regionId + ' option:first' ).val() );
				if( _params.cityId == 'bill_city' ) {
					if( $( "#bill_street2" ).data('ui-autocomplete') != undefined ) {
						$( "#bill_street2" ).autocomplete('destroy');
					}
				} else {
					if( $( "#street2" ).data( 'ui-autocomplete' ) != undefined ) {
						$( "#street2" ).autocomplete('destroy');
					}
				}
				
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
						$( "#" + _params.cityId ).parent().addClass( 'input-filled' );

						if( ( typeof data.state == 'undefined' ) || ( data.state == '' ) ) {
							data.state = $( '#' + _params.regionId + ' option:first' ).val();
						}

						// add state only if it's valid
						if( $( '#' + _params.regionId + ' option[value="' + data.state + '"]' ).length > 0 ) {
							$( '#' + _params.regionId ).select2( 'val', data.state );
						} else {
							$( '#' + _params.regionId ).select2( 'val', $( '#' + _params.regionId + ' option:first' ).val() );
						}

						var locality = $.parseJSON( data.locality );

						/*if( _params.cityId == 'bill_city' ) {
							var autocompleteID = $( "#bill_city" ).parent().parent().find( '.gb-scroll' ).attr( 'id' );

							$( "#bill_city" ).autocomplete({source: locality, appendTo:"#"+autocompleteID});
						} else {
							var autocompleteID = $( "#city" ).parent().parent().find( '.gb-scroll' ).attr( 'id' );

							$( "#city" ).autocomplete({source: locality, appendTo:"#"+autocompleteID});
						}*/

						if( _params.cityId == 'bill_city' ) {
							var autocompleteID = $( "#bill_street2" ).parent().parent().find( '.gb-scroll' ).attr( 'id' );

							$( "#bill_street2" ).autocomplete({source: locality, appendTo:"#"+autocompleteID});
						} else {
							var autocompleteID = $( "#street2" ).parent().parent().find( '.gb-scroll' ).attr( 'id' );

							$( "#street2" ).autocomplete({source: locality, appendTo:"#"+autocompleteID});
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
				$( '.error-text' ).hide();

				if( $( '#shippingAddressFormCont' ).is( ':visible' ) ) {
					$( '#firstname' ).val( '' );
					$( '#lastname' ).val( '' );
					$( '#mobile' ).val( '' );
					$( '#street' ).val( '' );
					$( '#street2' ).val( '' );
					$( '#landmark' ).val( '' );
					$( '#postcode' ).val( '' );
					$( '#city' ).val( '' );
					$( '#region_txtbox' ).val( '' ).hide();
					$( '#region_select' ).select2( 'val', ' ' );
					$( '#region_select' ).select2( 'enable' );
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
					$( '#billregion_txtbox' ).val( '' ).hide();
					$( '#bill_region_select' ).select2( 'val', ' ' );
					$( '#bill_region_select' ).select2( 'enable' );
					$( '#bill_country_id' ).select2( 'val', 'IN' );
				}

				// reset the update id to bypass aby validation since the form is cancelled
				$( '#update_id' ).val( '' );
                                $( '#bill_update_id' ).val( '' );
			},
			handleError : function( x, y, _z ) {
				//
                                $('.cart-loader').hide();
				// $( '.pin-check-loader' ).hide();
				$('.ck-pin-input-wrap .btn-loader').hide();
				$( '.cart-loader' ).hide();

				try {
					$( '#cpn_check_btn' ).removeAttr( 'disabled' );
					$( '#cpn_check_btn' ).removeClass( 'disabled' );
					// $( '#cancel_coupon' ).removeAttr( 'disabled' );
				} catch( _error ) {
					//
				}
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
			},
                        /* OUT OF STOCK NOTIFICATION */
                        OOSNotification: function (obj) {

                            var itemId = $(obj).attr('data-id');
                            var email_id_from = $('#notify_id').val();

                            var filter = /^[a-zA-Z0-9._-]+@([0-9a-z][0-9a-z.-]+\.)+[a-zA-Z]{2,4}$/i;
                            var emailValue = $.trim( email_id_from );

                            if ( filter.test( emailValue ) != true )
                            {
                                $('#notify_id').val('').focus();
                                // $( '#notify_form_wrap_' + itemId + ' .error-text' ).show().empty().html( 'Invalid Email' );
                                $('.ck-oos-email-wrap').addClass('invld-pin');
                                $('.notify-input-error-wrap').show();

                            } else {

                                $('#notify_form_wrap .error-text').hide();

                                /*STORE EMAIL ID FOR NOTIFICATION AGAINST PRODUCT*/
                                var data = { 'email': emailValue, 'pids': itemId, 'checkIfExists': 1 };
                                var url  = root_url + '/site_product/oos_notify_request';
                                var _params = {
                					'itemId' : itemId
                				};

                                utils.makeRequest( url , 'POST' , data , o.oosResponse , o.handleError , '' , _params );
                            }

                        },
                        oosResponse: function ( data , _params ) {
                        	
                        	var oos_res_data = $.parseJSON(data);                        	
                            if( oos_res_data.already_exists !== "" || oos_res_data.Success !== '') {
              				
						        var oos_succ_arr = oos_res_data.already_exists;
                                if(oos_succ_arr !== ''){
                                	                                 		
                                	o.deleteProductFromCart('.ck-non-oos-rm-btn');                                        	
                               	}
                                $('.ck-non-del-wrap').slideUp();
					            $('.ck-oos-rmd-msg-wrap').slideDown(600);
					            $('.notify-input-error-wrap').hide();

                            } else {
                                    $( '#availability_message_' + _params.itemId ).val( 'There is some error, please try again' );
                            }

                        },
                        deliveryFailed: function(obj){

                        	var dlf_items = $(obj).attr('data-id');
                        	if(dlf_items != ''){
                            	o.deleteProductFromCart('.ck-non-del-rm-btn');       
                            }
                        },
                        OOSfailed: function(obj){

                        	var dlf_items = $(obj).attr('data-id');
                        	if(dlf_items != ''){
                            	o.deleteProductFromCart('.ck-non-oos-rm-btn');       
                            }
                        },
                        removeBtnDisabled: function () {
                            /**
                             * DON'T VISIBLE PROCEED BUTTON IF FREE GIFT ERROR SHOW IS ENABLE
                             * IF FREE GIFT ERROR SHOW IS TRUE THE CUSTOMER CAN'T PROCEED FUTHER
                             */
                            if( !$( '.notify_form_wrap' ).is( ':visible' ) ) {
                                $( '.btn_blue' ).removeClass( 'disabled' );
                                if( !isFreeGiftErrorshow ) {

                                    $( '.btn_green, .btn_green_big' ).removeClass( 'disabled' );
                                }
                            }

                            o.handlePanasonicErrorMsg();
                        },
                        removeFePoints : function() {
                            if ($( '#fe_points' ).is( ':checked' )) {
                                $('#fe_points').trigger('click');
                            }
                            //$('#fe_checkbox').slideUp();
                            //$('.show_fe').slideUp();
                            $('#fe_error_msg').slideUp();
                            $('#form_fe_error_msg').slideUp();
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
                        		$( '#shiptogetherwrap' ).show();
                        	} else if( response == 2 ) {
                        		$( '#shptFinalPage' ).css( 'backgroundImage', 'none' );
                        		$( '.shipstogetherUncheck' ).removeClass( 'show' ).addClass( 'hide' );
                        		$( '.shipstogetherCheck' ).removeClass( 'show' ).addClass( 'hide' );
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

	                        if( ( utils.readCookie( 'serviceable_pincode' ) !== null ) && typeof dateRange != 'undefined'
	                        	&& ( dateRange[ 'start_date' ] != '' ) && ( dateRange[ 'end_date' ] != '' ) ) {
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
		                    $( '.shipstogetherUncheck span.txt-cnt' ).text( data.count );
		                    $( '.shipstogetherCheck span.txt-cnt' ).text( data.count );
		                    if(data.pids){
		                    	$( '#shipTogetherPID' ).val( data.pids.join( ',' ) )
							}
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
		                    if(data.pidImages){
			                    for( var i=0;i<data.pidImages.length;i++ ) {
			                    	_d += '<span class="ships-product-scroll-slide">';
			                    	_d += '<img src="' + product_image_url + data.pidImages[ i ] + '" style="max-width:60px;">';
			                    	_d += '</span>';
			                    }
		                    }
		                    $( '#ships-product-scroll' ).html( _d );

		                    if( _checkAssembly == 1 ) {
		                    	for( var i=0;i<data.pids.length;i++ ) {
		                    		var _text = data.date_range.start_date + ' - ' + data.date_range.end_date;
		                    		$( '#delivery_date_cart_' + data.pids[ i ] ).text( _text );
		                    	}
		                    }
	                    },
                        handlePanasonicErrorMsg : function ( _data ) {
                            if( typeof _data != "undefined" ) {

                                if( typeof _data.free_gift_panasonic_details != "undefined" ) {

                                    isFreeGiftErrorshow = _data.free_gift_panasonic_details.dummy_id_present;

                                    if(isFreeGiftErrorshow) {
                                        $( "#panasonic_error_msg" ).show();
                                    } else {
                                        $( "#panasonic_error_msg" ).hide();
                                    }
                                }
                            } else if( isFreeGiftErrorshow ) {
                                $( "#panasonic_error_msg" ).show();
                            } else {
                                $( "#panasonic_error_msg" ).hide();
                            }
                        },
                        allInputReset: function() {
                            //2017
                            $('.home-login-guest-modal input[type=text],.home-login-guest-modal input[type=password],.home-login-reg-wrap input[type=text],.home-login-reg-wrap input[type=radio],.home-login-reg-wrap input[type=number],.home-login-reg-wrap input[type=password]').val('');
                            $('.home-login-guest-modal input,.home-login-reg-wrap input').parent('div').removeClass('frm-error-wrap');
                            $('.home-login-guest-modal input,.home-login-reg-wrap input').parent('div').removeClass('frm-success-wrap');
                            $('.ck-reg-gender input').attr('checked', false).closest('.ck-reg-gender-wrap').removeClass('frm-error-wrap');
                        },
                        form_fild_reset : function(){
                            $('.popup-close').on('click', function () {
                            //allInputReset();
                            $('.animate-input').parent().removeClass('input-filled');
                            });
                            $('.popup_overlay').on('click', function () {
                           // allInputReset();
                            $('.animate-input').parent().removeClass('input-filled');
                            });
                        },
            productSlider : function(id, productCol, shiftBy) {
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
            },
            osNonDelSlider : function() {
            	
                $('.os-non-del-ext-wrap .ck-non-del-product-slider-wrap').each(function () {
                    var children = $(this).children('.ck-non-del-product-slide').length;
                    $(this).siblings('.ck-non-del-product-cnt ').children('.ck-non-del-product-cnt-no').text(children);
                    if (children > 2)
                    {

                    	o.productSlider($(this).attr('id'), '.ck-non-del-product-slide', 2);
                    }
                    else {
                        $('.os-non-del-ext-wrap .ck-bill-addr-prev,.os-non-del-ext-wrap .ck-bill-addr-next,.os-non-del-ext-wrap .ck-non-del-product-cnt').hide();
                    }
                });
            },
          //order summary pincode oos slider
           osOosSlider : function() {
                $('.os-oos-ext-wrap .ck-non-del-product-slider-wrap').each(function () {
                    var children = $(this).children('.ck-non-del-product-slide').length;
                    $(this).siblings('.ck-non-del-product-cnt ').children('.ck-non-del-product-cnt-no').text(children);
                    if (children > 2)
                    {
                    	o.productSlider($(this).attr('id'), '.ck-non-del-product-slide', 2);
                    }
                    else {
                        $('.os-oos-ext-wrap .ck-bill-addr-prev,.os-oos-ext-wrap .ck-bill-addr-next,.os-oos-ext-wrap .ck-non-del-product-cnt').hide();
                    }
                });
            },
          //Add new delivery address fisrt time user non serviceble slider
           addDelAddrFirstUserSlider : function() {
                $('.ck-addr-frm-wrap .ck-non-del-product-slider-wrap').each(function () {
                    var children = $(this).children('.ck-non-del-product-slide').length;
                    $(this).siblings('.ck-non-del-product-cnt').children('.ck-non-del-product-cnt-no').text(children);
                    if (children > 8)
                    {
                    	o.productSlider($(this).attr('id'), '.ck-non-del-product-slide', 8);
                    }
                    else {
                        $('.ck-addr-frm-wrap .ck-bill-addr-prev,.ck-addr-frm-wrap .ck-bill-addr-next,.ck-addr-frm-wrap .ck-non-del-product-cnt').hide();
                    }
                });
            },
          //Add new delivery address non serviceble slider
            addDelAddrSlider : function() {
                $('.ck-del-addr-add-frm-wrap .ck-non-del-product-slider-wrap').each(function () {
                    var children = $(this).children('.ck-non-del-product-slide').length;
                    $(this).siblings('.ck-non-del-product-cnt').children('.ck-non-del-product-cnt-no').text(children);
                    if (children > 8)
                    {
                    	o.productSlider($(this).attr('id'), '.ck-non-del-product-slide', 8);
                    }
                    else {
                        $('.ck-del-addr-add-frm-wrap .ck-bill-addr-prev,.ck-del-addr-add-frm-wrap .ck-bill-addr-next,.ck-del-addr-add-frm-wrap .ck-non-del-product-cnt').hide();
                    }
                });
            },
          //Edit delivery address non serviceble slider
            editDelAddrSlider : function() {
                $('.ck-del-addr-edit-frm-wrap .ck-non-del-product-slider-wrap').each(function () {
                    var children = $(this).children('.ck-non-del-product-slide').length;
                    $(this).siblings('.ck-non-del-product-cnt').children('.ck-non-del-product-cnt-no').text(children);
                    if (children > 8)
                    {
                    	o.productSlider($(this).attr('id'), '.ck-non-del-product-slide', 8);
                    }
                    else {
                        $('.ck-del-addr-edit-frm-wrap .ck-bill-addr-prev,.ck-del-addr-edit-frm-wrap .ck-bill-addr-next,.ck-del-addr-edit-frm-wrap .ck-non-del-product-cnt').hide();
                    }
                });
            },
          //Address selection non serviceble slider
            addrSelNonSlider : function() {
                $('.ck-del-addr-list-item .ck-non-del-product-slider-wrap').each(function () {
                    var children = $(this).children('.ck-non-del-product-slide').length;
                    $(this).siblings('.ck-non-del-product-cnt').children('.ck-non-del-product-cnt-no').text(children);
                    if (children > 8)
                    {
                    	o.productSlider($(this).attr('id'), '.ck-non-del-product-slide', 8);
                    }
                    else {
                        $('.ck-del-addr-list-item .ck-bill-addr-prev,.ck-del-addr-list-item .ck-bill-addr-next,.ck-del-addr-list-item .ck-non-del-product-cnt').hide();
                    }
                });
            },
          //address selection modal slider
            billAddrSelSlider : function() {
                $('.ck-bil-addr-slider-wrap').each(function () {
                    var children = $(this).children('.ck-bil-addr-slide').length;
                    $(this).siblings('.ck-addr-cnt').children('.ck-addr-cnt-no').text(children);
                    if (children > 3)
                    {
                    	o.productSlider($(this).attr('id'), '.ck-bil-addr-slide', 3);
                    }
                    else {
                        $('.ck-bil-addr-sel-wrap .ck-bill-addr-prev,.ck-bil-addr-sel-wrap .ck-bill-addr-next,.ck-bil-addr-sel-wrap .ck-addr-cnt').hide();
                    }
                });
            },
          //OC interted Item slider
            ocIntItemSlider : function() {
                $('.oc-int-pro-slider-wrap').each(function () {
                    var children = $(this).children('.oc-int-pro-slide').length;
//                    $(this).siblings('.ck-addr-cnt').children('.ck-addr-cnt-no').text(children);
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
                var ocSkuNo = $('.ck-oc-sku-list .ck-sku-row-wrap').children('.ck-sku-row-content').length;
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
			// Added by prathamesh.s to restore Serviceable Pincode and remove errors on Add/Edit Shipping Address Pincode check
            serviceCallForSelectedAddress : function(){
            	if(typeof o.pageType != 'undefined' && o.pageType == 'AddressSelection'){
            		var pincode = $('input[name=shipping_address_id][type=radio]:checked').siblings('.hidden_shipping_pincode').val();
                	utils.createCookie('serviceable_pincode',pincode);
                	utils.createCookie('pincode_service_call','select_address'); //reset to select address after service call
                	o.checkAssemblyPincode();
            	}
            },
            initSliders : function(){
            	o.osNonDelSlider();
            	o.osOosSlider();
            	o.addDelAddrFirstUserSlider();
            	o.addDelAddrSlider();
            	o.addrSelNonSlider();
            	o.ocIntItemSlider();
            	o.ocMultiSkuDetail();
            }
};

		z.CHECKOUT = o;
	})( PF, $ );

	$( document ).ready(function() {

		$(document).on('mouseenter mouseleave', '.ck-logged-in', function () {
		    $(".ck-logged-in .ck-loggedin-options").stop().slideToggle(300);
		});
                
		PF.CHECKOUT.init();
		
		$('.ck-oos-check-wrap label').on('click', function () {
	        if (!$('input#ckOosCheck').is(':checked')) {

	            $('.os-oos-ext-wrap .ck-non-oos-rm-btn').hide();
	            $('.os-oos-ext-wrap .ck-rmv-email-wrap').css('display', 'inline-block');
	        } else {
	            $('.os-oos-ext-wrap .ck-rmv-email-wrap').hide();
	            $('.os-oos-ext-wrap .ck-non-oos-rm-btn').css('display', 'inline-block');
	        }
	    });

	    $('.ck-cpn-rmv').click(function () {
	        $('#cpn_code_in').val('');
	        $('#coupon_code').attr('placeholder', 'Have a Coupon Code?');
	        $('.ck-cpn-applied-wrap,.ck-cpn-error-wrap').hide();
	        $('.ck-cpn-input-wrap').show();
	    });	
            
	});


}
