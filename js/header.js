var miniCartBody = null;
var miniCartScroller = null;
var scrollerAttached = null;
var loginMsg= '';
var createFEListener = 0;
var createHeaderFEListener = 0;
var _formPage = ( location.href.toLowerCase().indexOf( 'furniture/quotationform' ) == -1 ) ? false : true;

$(document).ready(function(){
    if(loginMsg != '' && loginFlag == true){
        $("#signupBox").html(loginMsg);
    }
});

function getTopBarLinksOLD() {
	$.ajax({
		url:'/site_page/getUserInfo',
		type:'get',
		cache: false,
		success: function (data){
				var d = $.parseJSON(data);
				var html = '';
				if(d.login){
					loginFlag=true;
                                        loginMsg = '<a href="javascript:void(0)" class="popup_close"></a><div style="display:none !important;" class="reg_user_info_wrapper"><p >Hi <strong>'+d.name+'</strong></p><p >You\'re already registered and logged in as <strong>'+d.email+'</strong>. We have exciting discounts on an unlimited range of Furniture, Decor, Furnishings and Kitchen items.</p><p ><a onclick="closeSignin()" href="javascript://">So go ahead and shop!</a></p><p >Warm Regards,<br/>Team Pepperfry.</p></div>';
					html+='<div class="login_usermeta">';
						html+='<a href="javascript:void(0)" class="usermeta_heading"><span>Hi '+d.name+'</span></a>';
						html+='<div class="ma_links_ddown">';
							html+='<a href="'+secure_url+'/customer/account">My Profile</a>';
							html+='<a href="'+secure_url+'/customer/dashboard">My Account</a>';
							html+='<a href="'+secure_url+'/customer/myorders">My Orders</a>';
							html+='<a href="'+secure_url+'/customer/wishlist">My Wishlist</a>';
							html+='<a href="'+secure_url+'/customer/logout/">Logout</a>'
						html+='</div>';
					html+= '</div>'
					html+='<a href="/contact-us.html#track_wrapper" class="trackorder_link">Track Your Order</a>';
					if(!skip_header){
						$.ajax({
							url:'/site_page/getCartInfo',
							type:'get',
							async:false,
							cache: false,
							success: function (data){
								var abc = createMiniCart(data);
								//html+=abc;
								if(!skip_mini_cart)
									$(abc).insertAfter('#site-logo');
							},
							error : function(){
							}
						});
					}
					customer_email = d.email;
					$("#emailid").val(customer_email);
					$("#emailid").hide();
					$("#customer-email").html('<label>'+customer_email+'</label><span id = "emailedit" style = "display:inline;" class="logE"><a onclick="changeEmail();" href="javascript://">edit</a></span>');
					if($("#emailhidden").length > 0)
					{
						$("#emailhidden").val(d.email);
					}
					$("#customer-email").show();
                                        if($("#signupBox").length > 0){
                                            $("#signupBox").html(loginMsg);
                                        }
					$('.header_right').addClass('user_loggedin');
				}else{
						customer_email = "";
						if($("#emailhidden").length > 0)
						{
							$("#emailhidden").val("");
							$("#li-reauth-msg").hide();
							$("#customer-email").html("");
							$("#customer-email").hide();
						}
						$("#emailid").val("");
						$("#emailid").show();
						html+='<a href="javascript:void(0)" class="link_popup loggingin_link" rel="loginBox">Login</a> <a href="javascript:void(0)" class="link_popup regst_link" rel="signupBox">Register</a><a href="/contact-us.html#track_wrapper" class="trackorder_link">Track Your Order</a>';
						if(!skip_header){
							$.ajax({
								url:'/site_page/getCartInfo',
								type:'get',
								async:false,
								cache: false,
								success: function (data){
									var abc = createMiniCart(data);
									if(!skip_mini_cart)
										$(abc).insertAfter('#site-logo');
									//html+=abc;
								},
								error : function(){
								}
							});
						}

					if(typeof mreg != 'undefined' && mreg=='true'){
						openModel('mregSignupBox');
					}
					if(typeof mreg != 'undefined' && mreg=='new'){
						openModel('signupBox');
					}
					if(typeof mreg != 'undefined' && mreg=='return'){
						$("#loginBox").fadeIn(50);
					}
				}


				html+='<div class="clearfix"></div>';
				$('.header_right').html(html);

		},
		error : function(){
		}
	});
}

function getTopBarLinks() {
    getLoginMenu();
}

function createTopBarLinks(response_data) {
    // function to create login menu and cart with the response
    var d = $.parseJSON(response_data);
    var html = '';
    if(d.login){
        loginFlag=true;
        loginMsg = '<a href="javascript:void(0)" class="popup_close" ></a><div class="reg_user_info_wrapper" style="display:none !important;"><p >Hi <strong>'+d.name+'</strong></p><p >You\'re already registered and logged in as <strong>'+d.email+'</strong>. We have exciting discounts on an unlimited range of Furniture, Décor, Furnishings and Kitchen items.</p><p ><a onclick="closeSignin()" href="javascript://">So go ahead and shop!</a></p><p >Warm Regards,<br/>Team Pepperfry.</p></div>';
        html+='<div class="login_usermeta">';
                html+='<a href="javascript:void(0)" class="usermeta_heading"><span>Hi '+d.name+'</span></a>';
                html+='<div class="ma_links_ddown">';
                        html+='<a href="'+secure_url+'/customer/account">My Profile</a>';
                        html+='<a href="'+secure_url+'/customer/dashboard">My Account</a>';
                        html+='<a href="'+secure_url+'/customer/myorders">My Orders</a>';
                        html+='<a href="'+secure_url+'/customer/wishlist">My Wishlist</a>';
                        html+='<a href="'+secure_url+'/customer/logout/">Logout</a>'
                html+='</div>';
        html+= '</div>'
        html+='<a href="/contact-us.html#track_wrapper" class="trackorder_link">Track Your Order</a>';

		//html += getFEDiv();
		//insertFEWrapper();

        if(!skip_header){
            var abc = createMiniCart(response_data);
            //html+=abc;
            if(!skip_mini_cart)
                    $(abc).insertAfter('#site-logo');
                       
        }
        customer_email = d.email;
        $("#emailid").val(customer_email);
        $("#emailid").hide();
        $("#customer-email").html('<label>'+customer_email+'</label><span id = "emailedit" style = "display:inline;" class="logE"><a onclick="changeEmail();" href="javascript://">edit</a></span>');
        if($("#emailhidden").length > 0)
        {
                $("#emailhidden").val(d.email);
        }
        $("#customer-email").show();
        if($("#signupBox").length > 0){
            $("#signupBox").html(loginMsg);
        }
        $('.header_right').addClass('user_loggedin');
        /*
        * Google Analytics
        * Added UserID, to analysis of groups of sessions, across devices.
        */
        if(d.hasOwnProperty('customer_id') === true) {
        	dataLayer.push({'user_id': d.customer_id});
		}        
    }else{
        customer_email = "";
        if($("#emailhidden").length > 0)
        {
                $("#emailhidden").val("");
                $("#li-reauth-msg").hide();
                $("#customer-email").html("");
                $("#customer-email").hide();
        }
        $("#emailid").val("");
        $("#emailid").show();
        html+='<a href="javascript:void(0)" class="link_popup loggingin_link" rel="loginBox">Login</a> <a href="javascript:void(0)" class="link_popup regst_link" rel="signupBox">Register</a><a href="/contact-us.html#track_wrapper" class="trackorder_link">Track Your Order</a>';
        // html+='<a href="javascript:void(0)" class="link_popup loggingin_link" rel="loginBox">Login</a> <a href="javascript:void(0)" class="link_popup regst_link" rel="signupBox">Register</a>';

		//html += getFEDiv();
		//insertFEWrapper();

        if(!skip_header){
            var abc = createMiniCart(response_data);
            if(!skip_mini_cart)
                    $(abc).insertAfter('#site-logo');
            //html+=abc;
        }

        if(typeof mreg != 'undefined' && mreg=='true'){
                openModel('mregSignupBox');
        }
        if(typeof mreg != 'undefined' && mreg=='new'){
                openModel('signupBox');
        }
        if(typeof mreg != 'undefined' && mreg=='return'){
                $("#loginBox").fadeIn(50);
        }
    }


    html+='<div class="clearfix"></div>';
    $('.header_right').html(html);

	if( ! createHeaderFEListener ) {
		//initHeaderExchange();
		//createHeaderFEListener = 1;
	}
}

/**
 * Show the furniture exchange modal in header
 *
 * Need to escape each line with '\' to enable multi-line string 
 */
function getFEDiv() {
	var str = '<div class="furnitureExchangeWrap">'+
				'<a href="javascript:void(0)" id="exchangeRoll" class="furnitureexchange_link"'+
				   ' rel="furnitureexchange">'+
					'Furniture Exchange'+
				'</a> '+
				'<div id="exchangeRollWrap" style="display:none;">'+
					'<div class="exchangeToolArrow"></div>'+
					'<div class="exchangeroll fe-header-menu fe-exchange-wrap" id="feStartEnterMsg">'+
						'<h4>Exchange Your Old Furniture</h4>'+
						'<span>'+
						   'Check if we offer Furniture Exchange at your location'+
						'</span>'+
						'<div class="inputExchangePingCode">'+
							'<div class="pincode_chk">'+
								'<form name="phcheck" id="phcheck" action="" onsubmit="return checkFEPincodeHeader();">'+
									'<div class="pincode_chk">'+
										'<input type="text" placeHolder="Enter Your Pincode" id="hpin"/>'+
										'<input type="submit" value="CHECK" id="btnPinCodeCheck"/>'+
										'<div class="validation-advice" style="display:none;">Please enter valid pincode</div>'+
									'</div>'+
								'</form>'+
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="exchangeroll fe-header-menu fe-exchange-wrap" id="feHeaderPinError" style="display:none;">'+
						'<span class="errorExchangeTool">'+
							'Sorry, we do not currently offer Furniture Exchange service to <strong class="fepinerror"><span class=\'pinpd\'></span></strong> '+
							'( <a href="javascript://" id="changePin" onclick="changeHeaderPin();">change</a> )'+
						'</span>'+
					'</div>'+
					'<div class="exchangeroll fe-header-menu fe-exchange-wrap" id="feHeaderPinGoogNews" style="display:none;">'+
						'<span class="errorExchangeTool">'+
							'<img alt="Furniture Exchange Available" src="/img/pin_now_served.png"> '+
							'<strong class="fepinerror"><span class=\'pinpd\'></span></strong> (<a href="javascript://" id="changePin" onclick="changeHeaderPin();">change</a>)<br /><a href="/furniture/quotationform">Get a quote for your old furniture</a>'+
						'</span>'+
					'</div>'+
				'</div>'+
			'</div>';
	return str;
}

/**
 * Insert the exchange wrapper to be displayed when the user scrolls
 */
function insertFEWrapper() {
	var str = '<div id="fe_header_wrapper">'+
				'<div id="fe_header" class="">'+
					'<span id="open">&nbsp;</span>'+
					'<div id="close">&nbsp;</div>'+
					'<div class="fe_data">'+
						'<div class="left">'+
							'<img src="/img/fe_logo.png"/>'+
							'<h2 class="fe_desp">'+
								'Exchange Your Old Furniture'+
								'<span>Sell the old, make room for the new</span>'+
							'</h2>'+
						'</div>'+
						'<div id="chkpin" class="right current">'+
							'<div class="pinenter ">'+
								'<span class="title">Check for serviceability in your location&nbsp;</span>'+
								'<div class="pincode_chk">'+
									'<form name="pcheck" id="pcheck" action="" onsubmit="return checkFEPincode();">'+
										'<div class="pincode_chk">'+
											'<input type="text" name="pincode" id="pincode"  placeholder="Enter Your Pincode" maxlength="6"/>'+
											'<input type="submit" name="pincode_submit" id="pincode_submit" value="check"/>'+
											'<div class="validation-advice" style="display:none;">Please enter valid pincode</div>'+
										'</div>'+
									'</form>'+
								'</div>'+
							'</div>'+
						'</div>'+
						'<div id="pincodeInvalid" class="message right">'+
							'<div class="pinenter ">'+
								'<p>'+
									'Sorry, we do not currently offer Furniture Exchange service to '+
									'<strong class="fepinerror"><span class=\'pinpd\'></span></strong> '+
									'( <a href="javascript://" id="changePin" onclick="changePin();">change</a> )'+
								'</p>'+
							'</div>'+
						'</div>'+
						'<div id="pincodeValid" class="message right">'+
							'<div class="pinenter ">'+
								'<p>'+
									'<img alt="Furniture Exchange Available" src="/img/pin_now_served.png"> '+
									'<strong class="fepinerror"><span class=\'pinpd\'></span></strong> (<a href="javascript://" id="changePin" onclick="changePin();">change</a>)<br /><a href="/furniture/quotationform">Get a quote for your old furniture</a>'+
								'</p>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>';
	$( str ).insertAfter( '#megamenu' );

	if( ! createFEListener ) {
            if( _formPage || ! $('#menu_wrapper').is(':visible') ) {
                $('#fe_header_wrapper').hide();
            }
		initExchange();
		createFEListener = 1;
	}
}

/**
 * Check the pincode validity on the form which appears on scroll
 */
function checkFEPincode() {
	var pin = parseInt( $.trim( $( '#pincode' ).val() ) );
	var _form = $( '#pcheck' );

	if( isNaN( pin ) || ( ( '' + pin ).length != 6 ) ) {
		_form.find( '.pincode_chk' ).addClass( 'input_error' );
		_form.find( '.pincode_chk .validation-advice' ).show();
	} else {
		_form.find( '.pincode_chk' ).removeClass( 'input_error' );
		_form.find( '.pincode_chk .validation-advice' ).hide();
	}

	$.ajax({
        url:'/site_page/getExchangeInfo/' + encodeURIComponent( pin ),
        type:'get',
        cache: false,
        success: function (data){
            var data = $.parseJSON( data );

			if( ! data.res ) {
				_form.find( '.pincode_chk .validation-advice' ).show();
			} else {
				$( '.pincode_chk .validation-advice' ).hide();
				$( '#pincodeValid' ).hide();
				$( '#pincodeInvalid' ).hide();
				$( '#chkpin' ).hide();
				$( '.pinpd' ).text( pin );

				if( data.furniture_exchange_applicable ) {
					// $( '#pincodeValid' ).css( 'display','table-cell' );
					$( '#pincodeValid' ).css( 'display','table' );
				} else {
					// $( '#pincodeInvalid' ).css( 'display','table-cell' );
					$( '#pincodeInvalid' ).css( 'display','table' );
				}
			}
        },
        error : function(){
			_form.find( '.pincode_chk .validation-advice' ).show();
        }
    });

	return false;
}

/**
 * Check the pincode validity on the form which appears in header
 */
function checkFEPincodeHeader() {
	var _form = $( '#phcheck' );

	var pin = parseInt( $.trim( $( '#hpin' ).val() ) );

	if( isNaN( pin ) || ( ( '' + pin ).length != 6 ) ) {
		_form.find( '.pincode_chk' ).addClass( 'input_error' );
		_form.find( '.validation-advice' ).show();
	} else {
		_form.find( '.pincode_chk' ).removeClass( 'input_error' );
		_form.find( '.validation-advice' ).hide();
	}

	$.ajax({
        url:'/site_page/getExchangeInfo/' + encodeURIComponent( pin ),
        type:'get',
        cache: false,
        success: function (data){
            var data = $.parseJSON( data );

			if( ! data.res ) {
				_form.find( '.validation-advice' ).show();
			} else {
				$( '.validation-advice' ).hide();
				//$( '.exchangeToolArrow' ).addClass( 'exchangeToolArrowRemove' );
				$( '#feStartEnterMsg' ).hide();
				$( '#feHeaderPinError' ).hide();
				$( '#feHeaderPinGoogNews' ).hide();
				$( '.pinpd' ).text( pin );

				if( data.furniture_exchange_applicable ) {
					$( '#feHeaderPinGoogNews' ).css( 'display','block' );
				} else {
					$( '#feHeaderPinError' ).css( 'display','block' );
				}
			}
        },
        error : function(){
			_form.find( '.validation-advice' ).show();
        }
    });

	return false;
}

function getLoginMenu() {
    // function to get the user info and cart info
    $.ajax({
        url:'/site_page/getUserInfo',
        type:'get',
        cache: false,
        success: function (data){
            createTopBarLinks(data);
        },
        error : function(){
        }
    });
}

function changePin() {
	$( '.pincode_chk .validation-advice' ).hide();
	$( '#pincodeValid' ).hide();
	$( '#pincodeInvalid' ).hide();
	$( '#chkpin' ).hide();

	// $('.right.current').css( 'display', 'table-cell' );
	$('.right.current').css( 'display', 'table' );

	return false;
}

function changeHeaderPin() {
	$( '.validation-advice' ).hide();
	$( '#feStartEnterMsg' ).hide();
	$( '#feHeaderPinError' ).hide();
	$( '#feHeaderPinGoogNews' ).hide();

	//$( '.exchangeToolArrow' ).removeClass( 'exchangeToolArrowRemove' );
	$( '#feStartEnterMsg' ).show();
}

/* ressignKeys() : Takes array as input and check for duplicate keys. If duplicate keys exists increment one key by one*/
function ressignKeys(array)
{
    var i = null;
    var count = 1;
    var cart_item = array['cart_item'];
    var mt = array['mt'];
    var CI = new Array();
    var MT = new Array();
    var returnData = new Array();
    
    for(var prop in cart_item)
    {
            var key = parseInt(cart_item[prop].micro_time);
            if (CI.hasOwnProperty(key))
            {
                key = key + count;
                count ++;
            }
            CI[key] = cart_item[prop];
            MT.push(key);
    }
    
    returnData['cart_item'] = CI;
    returnData['mt'] = MT.sort();
    returnData['total_items'] = array['total_items'];
    returnData['total_amount'] = array['total_amount'];
    return returnData;
}

function numberWithCommas(number) {
    return number.toString().replace(/\B(\d{3}$)/, ',$1').replace(/\B(?=(\d{2})+(?!\d).)/g, ",");
}
var miniCartFooterHtml = miniCartHeaderHtml = miniCartBodyHtml = miniCartHtml = "" ;   
function createMiniCart(cart_data) {
	var cdata = $.parseJSON(cart_data);
        cdata = ressignKeys(cdata);
	var cartHtml ='';
	if(cart_data) {
		var cart_item_count=0;
		var obj = cdata['cart_item'];
		for(var prop in obj) {
		   if (obj.hasOwnProperty(prop)) {
			  ++cart_item_count;
		   }
		}
		cartHtml+='<a id="shoppingcart" href="javascript:void(0)" class="cart_link"><span class="radius_100_per">'+cdata.total_items+'</span></a>';
		var order_summary = secure_url + "/checkout/cart";
		if(cart_item_count > 0)
		{
			var weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
			var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
			var codValues = ["Not Available", "Available"];

			miniCartHeaderHtml += '<div class="minicart_header">';
			miniCartHeaderHtml += '<span class="title_1">Our Price</span>';
				miniCartHeaderHtml += '<span class="total_1">Rs.<span class="total_1_number">'+numberWithCommas(Math.ceil(cdata['total_amount']))+'</span></span>';
				miniCartHeaderHtml += '<a href="javascript:void(0)" class="cart_link"><span class="radius_100_per">'+cdata.total_items+'</span></a>';
				miniCartHeaderHtml += '<a href="javascript:void(0)" id="close_mini_cart" class="close_mini_cart">&nbsp;</a>';
			miniCartHeaderHtml += '</div>';
			miniCartHeaderHtml += '<div class="minicart_tab_header clearfix">';
				miniCartHeaderHtml += '<span rel="minicart_tab_panel_1" class="active">My Cart</span>';
				miniCartHeaderHtml += '<span rel="minicart_tab_panel_2">My Wishlist</span>';
			miniCartHeaderHtml += '</div>';
			miniCartHeaderHtml += '<div id="mini_cart_body" class="minicart_tab_body">';
				// cart
				miniCartHeaderHtml += '<div class="minicart_tab_panel v_scroll" id="minicart_tab_panel_1" style="display: block;"><div class="wrapper">';
                                
				var cart_items = cdata.cart_item;
                                var tmpXOR = cdata.mt;       //To get array containing sorted cart items in descending order of their micro time
                                var i = 0;
                                for(var something = tmpXOR.length-1; something >= 0; something--)      //Looping through descendingly sorted array tmpXOR
				{
                                        var cart_micro_time = tmpXOR[something]; 
                                    
                                        var cart_item_id = cart_items[cart_micro_time]['product_id'];
					var cart_item = cart_items[cart_micro_time];
					miniCartBodyHtml += '<div id="mini-cart-card-'+cart_item_id+'" class="minicart_item clearfix">';
						miniCartBodyHtml += '<div class="minicart_item_row clearfix">';
							miniCartBodyHtml += '<div class="minicart_item_data clearfix">';
								miniCartBodyHtml += '<div class="img_block">';
									if(cart_item.product_type=='bundle'){ //check if wardrobe product
										var wardrobe_image_url = root_url+'/' + wardrobe_image_dir;
										var milliseconds = (new Date).getTime();
										miniCartBodyHtml += '<a href="'+root_url + '/' + cart_item.url +'?src=mnc"><img height="91" width="83" src="'+wardrobe_image_url+cart_item.image+'?v='+milliseconds+'" alt=""></a>';
									}else{
										miniCartBodyHtml += '<a href="'+root_url + '/' + cart_item.url +'?src=mnc"><img height="91" width="83" src="'+product_image_url+cart_item.image+'" alt=""></a>';
									}
								miniCartBodyHtml += '</div>';
								miniCartBodyHtml += '<div class="data_block">';
									miniCartBodyHtml += '<a href="'+root_url + '/' +cart_item.url +'?src=mnc" class="title_1">'+cart_item.display_name+'</a>';
									if(cart_item.stock_status > 0)
									{
										miniCartBodyHtml += '<span class="p_left m_qty_lbl">QTY</span>';
										miniCartBodyHtml += '<div class="new_qty_wrap_1 p_left">';
											miniCartBodyHtml += '<div id="div_selected_qty_'+i+'" class="new_qty_header_1">'+cart_item.quantity+'</div>';
											var selectable_qty = (cart_item.avl_qty > max_cart_qty) ? max_cart_qty : cart_item.avl_qty;
											miniCartBodyHtml += '<div class="new_qty_ddown_1 minicart_qty_dropdown v_scroll">';
												miniCartBodyHtml += '<ul data-producttypeid='+cart_item.product_type+' data-productid="'+cart_item_id+'">';
													for(var j=1; j <= selectable_qty; j++)
													{
														miniCartBodyHtml += '<li data-qty="'+j+'">'+j+'</li>';
													}
												miniCartBodyHtml += '</ul>';
											miniCartBodyHtml += '</div>';
										miniCartBodyHtml += '</div>';
									}
									miniCartBodyHtml += '<span class="minicart_item_price">Rs.<span class="minicart_item_price_num"></span>'+numberWithCommas(Math.ceil(cart_item.total))+'</span>';
								miniCartBodyHtml += '</div>';
								miniCartBodyHtml += '<a href="javascript:void(0)" data-cartid="'+cart_item_id+'" class="mini-recycle recycle"></a>';
								if(cart_item.stock_status == 0)
								{
									miniCartBodyHtml += '<span class="oos_label">SOLD OUT!</span>';
								}
							miniCartBodyHtml += '</div>';
							miniCartBodyHtml += '<div class="minicart_item_meta">';
                                                                if(cart_item.stock_status != 0){
                                                                        miniCartBodyHtml += '<div class="minicart_meta_box">';
                                                                                miniCartBodyHtml += '<span class="text_1">Ships By</span>';
                                                                                //var ttsd_dt = new Date(cart_item.ttsd);
                                                                                var ttsd_date = (cart_item.ttsd).split("-");
                                                                                var ttsd_dt = new Date(ttsd_date[0], ttsd_date[1]-1, ttsd_date[2]);             //This is required for IE8
                                                                                miniCartBodyHtml += '<span class="text_2">'+weekday[ttsd_dt.getDay()] + ', ' + monthNames[ttsd_dt.getMonth()] + ' ' + preZero(ttsd_dt.getDate()) + ttsd_dt.getDate() + ordinal(ttsd_dt.getDate()) + '</span>';
                                                                        miniCartBodyHtml += '</div>';
                                                                }
								miniCartBodyHtml += '<div class="minicart_meta_box">';
									miniCartBodyHtml += '<span class="text_1">COD</span>';
									miniCartBodyHtml += '<span class="text_2">'+codValues[cart_item.cod_flag]+'</span>';
								miniCartBodyHtml += '</div>';
								if(cart_item.assembly_by != '')
								{
									miniCartBodyHtml += '<div class="minicart_meta_box">';
										miniCartBodyHtml += '<span class="text_1">Assembly</span>';
										if(cart_item.assembly_by.toLowerCase() == 'assembly by pepperfry' || cart_item.assembly_by.toLowerCase() == 'carpenter assembly')
										{
											miniCartBodyHtml += '<span class="text_2">By Pepperfry</span>';
										}
										else if(cart_item.assembly_by.toLowerCase() == 'assembly by brand')
										{
											miniCartBodyHtml += '<span class="text_2">By ' + cart_item.brandsname + '</span>';
										}
										else if(cart_item.assembly_by.toLowerCase() == 'self assembly')
										{
											miniCartBodyHtml += '<span class="text_2">Self</span>';
										}
										else if(cart_item.assembly_by.toLowerCase() == 'no assembly required')
										{
											miniCartBodyHtml += '<span class="text_2">Not Required</span>';
										}
										else
										{
											miniCartBodyHtml += '<span class="text_2">'+cart_item.assembly_by+'</span>';
										}
									miniCartBodyHtml += '</div>';
								}
							miniCartBodyHtml += '</div>';
						miniCartBodyHtml += '</div>';
						miniCartBodyHtml += '<div class="undo_box">';
							miniCartBodyHtml += '<a href="javascript:void(0)" class="undo_del red_underline">Undo</a>';
                            miniCartBodyHtml += '<a href="javascript:void(0)" class="confirm_delete red_underline" data-item-delete="" >Confirm Delete</a>';
                        miniCartBodyHtml += '</div>';
					miniCartBodyHtml += '</div>';
					i++;
				}
				miniCartFooterHtml += '</div></div>';
				// wishlist
				miniCartFooterHtml += '<div class="minicart_tab_panel v_scroll" id="minicart_tab_panel_2"><div class="wrapper"></div></div>';
			miniCartFooterHtml += '</div>';
			miniCartFooterHtml += '<a href="'+order_summary+'" id="cart_proceed"><span class="btn_green btn">Proceed to Pay Securely</span></a>';
			miniCartHtml = miniCartHeaderHtml + miniCartBodyHtml + miniCartFooterHtml;
		}
		else
		{
			miniCartHtml += '<div class="minicart_header">';//REMOVED YOU PAY TEXT AND PRICE INFO FOR EMPTY CART
				miniCartHtml += '<a href="javascript:void(0)" class="cart_link"><span class="radius_100_per">'+cdata.total_items+'</span></a>';
				miniCartHtml += '<a href="javascript:void(0)" id="close_mini_cart" class="close_mini_cart">&nbsp;</a>';
			miniCartHtml += '</div>';
			miniCartHtml += '<div class="minicart_tab_header clearfix">';
				miniCartHtml += '<span rel="minicart_tab_panel_1" class="active">My Cart</span>';
				miniCartHtml += '<span rel="minicart_tab_panel_2">My Wishlist</span>';
			miniCartHtml += '</div>';
			miniCartHtml += '<div id="mini_cart_body" class="minicart_tab_body">';
				miniCartHtml += '<div class="minicart_tab_panel" id="minicart_tab_panel_1" style="display: block;"><div class="wrapper">';
					miniCartHtml += '<div id="mini_empty_cart">'
						miniCartHtml += '<h2>Shopping cart <span class="red">empty</span></h2>'
                        miniCartHtml += '<img src="'+image_url+'img/dec/cart-empty-icon-gray.png">'
                        miniCartHtml += '<p>You have no items in your shopping cart<br>'
                        miniCartHtml += '<a onclick="javascript:$(\'#close_mini_cart\').trigger(\'click\');"> Click here</a>  to continue shopping</p>'
                    miniCartHtml += '</div>'
				miniCartHtml += '</div></div>';
				miniCartHtml += '<div class="minicart_tab_panel v_scroll" id="minicart_tab_panel_2"><div class="wrapper"></div></div>';
			miniCartHtml += '</div>';
			miniCartHtml += '<a href="'+order_summary+'" style="display:none;" id="cart_proceed"><span class="btn_green btn">Proceed to Pay Securely</span></a>';
		}
	}
	return cartHtml;
}

function preZero(date)
{
	if(date < 10)
	{
		return "0";
	}
	else return "";
}

function ordinal(date) {
  if(date > 20 || date < 10) {
	switch(date%10) {
	  case 1:
		return "st";
	  case 2:
		return "nd";
	  case 3:
		return "rd";
	}
  }
  return "th";
}

function minicart_Checkout(){
	setTimeout(function() {
		dataLayer.push({'category' : 'Header', 'action': 'Click', 'label' : 'Minicart Checkout', 'opt' : true, 'event' : 'legacyevent'});
		setLocation(root_url+"/checkout/cart/");
	},100);
}

$(document).on({
        click: function(){ 
            $(this).find('.btn_green').addClass('btn_loader');
        }
}, "#cart_proceed");

$(document).on({
	click: function () {
		var cartProductId = $(this).data('cartid');
		var cardHeight = $(this).parents('.minicart_item').height();
		$(this).parents('.minicart_item').attr('data-oheight', cardHeight);
		$(this).parents('.minicart_item').css('overflow','hidden').animate({height:40,padding:0}, 200);
		$(this).parents('.minicart_item').find('.undo_box').css('visibility','visible').animate({top:0, opacity:1}, 200);
		$(this).parents('.minicart_item').find('.undo_box .confirm_delete').attr('data-cartid', cartProductId);
		setTimeout(function(){
                        $('#minicart_tab_panel_1').jScrollPane().data('jsp').reinitialise();
                }, 500);
	}
}, ".mini-recycle");

$(document).on({
	click: function () {
		var wishListId = $(this).data('wishlistid');
		var producttypeid = $(this).data('producttypeid'); //changes for wardrobe --added by shaily
		var cardHeight = $(this).parents('.minicart_item').height();
		$(this).parents('.minicart_item').attr('data-oheight', cardHeight);
		$(this).parents('.minicart_item').css('overflow','hidden').animate({height:40,padding:0}, 200);
		$(this).parents('.minicart_item').find('.undo_box').css('visibility','visible').animate({top:0, opacity:1}, 200);
		$(this).parents('.minicart_item').find('.undo_box .confirm_delete').attr('data-wishlistid', wishListId);
		$(this).parents('.minicart_item').find('.undo_box .confirm_delete').attr('data-producttypeid', producttypeid); //changes for wardrobe --added by shaily
		v_scroll_reinitialize();
	}
}, ".wishlist-recycle");


$(document).on({
	click: function() {
		var curr_undo_el = $(this).parents('.minicart_item');
		var cardHeight = curr_undo_el.data("oheight");
		curr_undo_el.animate({height:cardHeight},200);
		curr_undo_el.find('.undo_box').animate({top:'-41px', opacity:0}, 200, function(){
			curr_undo_el.css('overflow','visible');
			curr_undo_el.find('.undo_box').css('visibility','hidden');
		});
		setTimeout(function(){
                        $('#minicart_tab_panel_1').jScrollPane().data('jsp').reinitialise();
                }, 500);
	}
}, "#minicart_tab_panel_1  .undo_del");

$(document).on({
	click: function() {
		var curr_undo_el = $(this).parents('.minicart_item');
		var cardHeight = curr_undo_el.data("oheight");
		curr_undo_el.animate({height:cardHeight},200);
		curr_undo_el.find('.undo_box').animate({top:'-41px', opacity:0}, 200, function(){
			curr_undo_el.css('overflow','visible');
			curr_undo_el.find('.undo_box').css('visibility','hidden');
		});
		v_scroll_reinitialize();
	}
}, "#minicart_tab_panel_2  .undo_del");

$(document).on({
	click: function() {
		var cartProductId = $(this).data('cartid');
		var card =  $(this).parents('.minicart_item');
		var parent = $(this).parent('.undo_box');

		$.ajax({
			  url:root_url+'/cart/removeitem/'+cartProductId+'/1/1',
			  type:'post',
			  dataType:"json",
			  success:function(data){
					if(typeof data.data.status != "undefined" && data.data.status == "success"){

						$('#mini-cart-card-' + cartProductId).slideUp(10, function() {
							parent.animate({top:'-41px',opacity:0,padding:0},{
								duration: 200,
								complete: function() {
									$('#mini-cart-card-' + cartProductId).remove();
									dataLayer.push({
									  'event': 'removeFromCart',
									  'ecommerce': {
										'remove': {                               
										  'products': [{                          
												'id': cartProductId,
										  }]
										}
									  }
									});                                                                        
									$('.radius_100_per').text(data.data.total_qty_cart);
									if(data.data.cart_total_pay > 0 && data.data.total_qty_cart > 0)
									{
										$('.minicart_header .total_1_number').text(numberWithCommas(Math.ceil(data.data.cart_total_pay)));
									}
									else
									{
										//$('.minicart_header .title_1').hide();
										$('.minicart_header .total_1_number').text(0);
									}

									if(data.data.cart_count == 0)
									{
										var emptyMiniCartHtml = '<div id="mini_empty_cart">'
											emptyMiniCartHtml += '<h2>Shopping cart <span class="red">empty</span></h2>'
											emptyMiniCartHtml += '<img src="'+image_url+'img/dec/cart-empty-icon-gray.png">'
											emptyMiniCartHtml += '<p>You have no items in your shopping cart<br>'
											emptyMiniCartHtml += '<a onclick="javascript:$(\'#close_mini_cart\').trigger(\'click\');"> Click here</a>  to continue shopping</p>'
										emptyMiniCartHtml += '</div>'
										$("#minicart_tab_panel_1 .wrapper").html(emptyMiniCartHtml);
										$('#cart_proceed').hide();
										//HIDE YOU PAY AND RS TEXT FOR EMPTY CART
										$("#mini_cart").find('.title_1').hide();
										$("#mini_cart").find('.total_1').hide();
									}
								}
							});
						});
						v_scroll_reinitialize();
						if(data.data.cart_count == 0)
						{   //IF CART IS EMPTY AND EMPTY CART MESSAGE HEIGHT IS LESS THAN 188 THEN INCREASE THE JSPCONTAINER HEIGHT TO SHOW EMPTY CART MESSAGE PROPERLY
							var empty_cart_h = $("#mini_cart_body").find(".jspContainer").height();
							if(empty_cart_h <= 188)
							{
								$("#mini_cart_body").find(".jspContainer").height('192');
							}
						}
					}
			  },
			  error:function(){
			  }
		});
	}
}, "#minicart_tab_panel_1 .confirm_delete");

$(document).on({
	click: function() {
		var cartProductId = $(this).data('wishlistid');
		var card =  $(this).parents('.minicart_item');
		var parent = $(this).parent('.undo_box');
		var product_type = $(this).data('producttypeid') //remove wardrobe item from wishlist -- added by shaily
		if(product_type=='bundle'){ //remove wardrobe item from wishlist -- added by shaily
			var remove_url = root_url+'/site_wardrobe/deleteCustomizedWarWishlistItem/'+cartProductId;
		}else{
			var remove_url = root_url+'/customer_wishlist/deleteWishlistItem/'+cartProductId;
		}
		$.ajax({
			  url: remove_url,
			  type:'post',
			  dataType:"json",
			  success:function(data){
					if(data >= 0){

						$('#wishlist-card-' + cartProductId).slideUp(10, function() {
							parent.animate({top:'-41px',opacity:0,padding:0},{
								duration: 200,
								complete: function() {
									$('#wishlist-card-' + cartProductId).remove();
                                                                        if(data == 0){
                                                                            var html = renderWishlist(data);
                                                                            $('#minicart_tab_panel_2 .wrapper').html(html);
                                                                        }
								}
							});
						});
						v_scroll_reinitialize();
					}
			  },
			  error:function(){
			  }
		});
	}
}, "#minicart_tab_panel_2 .confirm_delete");

var curr_mcart_tab, curr_mcart_tab_flag=0;
$(document).on({
	click: function() {
		/*curr_mcart_tab = $(this).attr('rel');
		$('.minicart_tab_header span').removeClass('active');
		$(this).addClass('active');
		$('.minicart_tab_panel').not('#'+curr_mcart_tab).fadeOut(100, function(){
			$('#'+curr_mcart_tab).fadeIn(200, function(){
				if(curr_mcart_tab == 'minicart_tab_panel_2')
				{
					createUserWishList();
				}
				else
				{
					v_scroll_reinitialize(); // for mini cart
				}
			});
		});*/
		if(curr_mcart_tab_flag == 0){
			curr_mcart_tab_flag = 1;
			curr_mcart_tab = $(this).attr('rel');
			$('.minicart_tab_header span').removeClass('active');
			$(this).addClass('active');
			$('.minicart_tab_panel').not('#'+curr_mcart_tab).fadeOut(100, function(){
				$('#'+curr_mcart_tab).fadeIn(200);
				curr_mcart_tab_flag = 0;
			});
			if(curr_mcart_tab == 'minicart_tab_panel_2')
			{
				createUserWishList();
				$('#cart_proceed').hide();
			}
			else
			{
				v_scroll_reinitialize(); // for mini cart
				if($('#minicart_tab_panel_1 .minicart_item').length > 0 && !$('#cart_proceed').is(':visible'))
				{
					$('#cart_proceed').show();
				}
			}
		}
	}
},".minicart_tab_header span");

function createUserWishList()
{
	$.ajax({
		url:'/customer_wishlist/getWishList_minicart',
		type:'get',
		async:true,
		cache: false,
		beforeSend: function() {
			$('#minicart_tab_panel_2 .wrapper').empty("");
		},
		success: function (data){

			var html = renderWishlist(data);
			$('#minicart_tab_panel_2 .wrapper').html(html);
			v_scroll_reinitialize();
			var mcart_height = $('#mini_cart').height() + $('#cart_proceed').height() - 210 ;
			$('#mini_cart_body').css('height',mcart_height+'px');
		},
		error : function(){
		}
	});
}

function renderWishlist(wishlist_data)
{
	var data = $.parseJSON(wishlist_data);

	if(data.status == '2')
	{
		wishListHtml = '<div class="wishlist_login"><a href="javascript:void(0)" class="link_popup" rel="loginBox">Login</a><br>To view your wishlist</div>';
        return wishListHtml;
	}

	if(data.status == '0')
	{
		wishListHtml = '<div id="mini_empty_wishlist">';
			wishListHtml += '<h2>Wishlist <span class="red">empty</span></h2>';
            wishListHtml += '<p>You have not added any item to your wishlist yet.<br>';
			wishListHtml += 'Click on <img src="'+image_url+'img/dec/heart.png"> icon to add an item to your wishlist.</p>'
        wishListHtml += '</div>';
        return wishListHtml;
	}

	var wishListHtml ='';
	if(Object.size(data.data) > 0)
	{
		var wishList = data.data;
		var weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
		var codValues = ["Not Available", "Available"];
		for(var wishlist_id in wishList)
		{
			var wish_list = wishList[wishlist_id];
			wishListHtml += '<div id="wishlist-card-'+wish_list.product_id+'" class="minicart_item clearfix">';
				wishListHtml += '<div class="minicart_item_row clearfix">';
					wishListHtml += '<div class="minicart_item_data clearfix">';
						wishListHtml += '<div class="img_block">';
							//changes added for wardrobe -- added by shaily
							if(wish_list.product_type=='bundle'){
								var wardrobe_image_url = root_url+'/' + wardrobe_image_dir;
								var milliseconds = (new Date).getTime();
								wishListHtml += '<a href="'+root_url + '/' + wish_list.url +'?src=wmnc"><img height="91" width="83" src="'+wardrobe_image_url+wish_list.image+'?v='+milliseconds+'" alt=""></a>';
							}else{
								wishListHtml += '<a href="'+root_url + '/' + wish_list.url +'?src=wmnc"><img height="91" width="83" src="'+product_image_url+wish_list.image+'" alt=""></a>';
							}
						wishListHtml += '</div>';
						wishListHtml += '<div class="data_block">';
							wishListHtml += '<a href="'+root_url + '/' +wish_list.url +'?src=wmnc" class="title_1">'+wish_list.name+'</a>';
							if(wish_list.stock_status > 0 && (wish_list.product_type == 'simple' || wish_list.product_type == 'bundle'))
							{
								var selectable_qty = (wish_list.avl_qty > max_cart_qty) ? max_cart_qty : wish_list.avl_qty;
								wishListHtml += '<span class="p_left m_qty_lbl">QTY</span>';
								wishListHtml += '<div class="new_qty_wrap_1 p_left">';
									wishListHtml += '<div id="div_selected_qty" class="new_qty_header_1">1</div>';
									wishListHtml += '<div class="wishlist_qty_dropdown new_qty_ddown_1 v_scroll" style="display: none;">';
										wishListHtml += '<ul id="ul-qty" data-productid="'+wish_list.product_id+'">';
											for(var j=1; j <= selectable_qty; j++)
											{
												wishListHtml += '<li data-qty="'+j+'">'+j+'</li>';
											}
										wishListHtml += '</ul>';
									wishListHtml += '</div>';
								wishListHtml += '</div>';
							}
							wishListHtml += '<span class="minicart_item_price">Rs.<span class="minicart_item_price_num"></span>'+numberWithCommas(Math.ceil(wish_list.price))+'</span>';
						wishListHtml += '</div>';
						wishListHtml += '<a href="javascript:void(0)" data-producttypeid="'+wish_list.product_type+'" data-wishlistid="'+wish_list.product_id+'" class="wishlist-recycle recycle"></a>';
						if(wish_list.stock_status == 0)
						{
							wishListHtml += '<span class="oos_label">SOLD OUT!</span>';
						}
					wishListHtml += '</div>';
					wishListHtml += '<div class="minicart_item_meta">';
                                            if(wish_list.stock_status != 0){
						wishListHtml += '<div class="minicart_meta_box">';
							wishListHtml += '<span class="text_1">Ships By</span>';
							//var ttsd_dt = new Date(wish_list.ttsd);
                                                        var ttsd_date = (wish_list.ttsd).split("-");
                                                        var ttsd_dt = new Date(ttsd_date[0], ttsd_date[1]-1, ttsd_date[2]);  //This is required for IE8
							wishListHtml += '<span class="text_2">'+weekday[ttsd_dt.getDay()] + ', ' + monthNames[ttsd_dt.getMonth()] + ' ' + preZero(ttsd_dt.getDate()) + ttsd_dt.getDate() + ordinal(ttsd_dt.getDate()) + '</span>';
						wishListHtml += '</div>';
                                            }
						wishListHtml += '<div class="minicart_meta_box">';
							wishListHtml += '<span class="text_1">COD</span>';
							wishListHtml += '<span class="text_2">'+codValues[wish_list.cod_flag]+'</span>';
						wishListHtml += '</div>';
						if(wish_list.assembly_by != '')
						{
							wishListHtml += '<div class="minicart_meta_box">';
								wishListHtml += '<span class="text_1">Assembly</span>';
								if(wish_list.assembly_by.toLowerCase() == 'assembly by pepperfry' || wish_list.assembly_by.toLowerCase() == 'carpenter assembly')
								{
									wishListHtml += '<span class="text_2">By Pepperfry</span>';
								}
								else if(wish_list.assembly_by.toLowerCase() == 'assembly by brand')
								{
									wishListHtml += '<span class="text_2">By ' + wish_list.brandsname + '</span>';
								}
								else if(wish_list.assembly_by.toLowerCase() == 'self assembly')
								{
									wishListHtml += '<span class="text_2">Self</span>';
								}
								else if(wish_list.assembly_by.toLowerCase() == 'no assembly required')
								{
									wishListHtml += '<span class="text_2">Not Required</span>';
								}
								else
								{
									wishListHtml += '<span class="text_2">'+wish_list.assembly_by+'</span>';
								}
							wishListHtml += '</div>';
						}
					wishListHtml += '</div>';
					if(wish_list.stock_status > 0)
					{
						if(wish_list.product_type == 'simple')
						{
							wishListHtml += '<a href="javascript:void(0)" data-wishlistitem="'+wish_list.product_id+'" class="minicart_add_to_cart">Add to cart</a>';
						}else if(wish_list.product_type == 'bundle'){
							//adding data producttype -- added by shaily
							wishListHtml += '<a href="javascript:void(0)" data-wishlistproducttype="'+wish_list.product_type+'" data-wishlistitem="'+wish_list.product_id+'" class="minicart_add_to_cart">Add to cart</a>';
						}
						else
						{
							wishListHtml += '<a href="'+root_url+'/'+wish_list.url+'?act=atc" data-wishlistitem="'+wish_list.product_id+'" class="minicart_add_to_cart">Add to cart</a>';
						}
					}
				wishListHtml += '</div>';
				wishListHtml += '<div class="undo_box">';
					wishListHtml += '<a href="javascript:void(0)" class="undo_del red_underline">Undo</a>';
					wishListHtml += '<a href="javascript:void(0)" class="confirm_delete red_underline" data-item-delete="" >Confirm Delete</a>';
				wishListHtml += '</div>';
			wishListHtml += '</div>';
		}
	}
	else
	{
		wishListHtml = '<div id="mini_empty_wishlist">';
			wishListHtml += '<h2>Wishlist <span class="red">empty</span></h2>';
            wishListHtml += '<p>You have not added any item to your wishlist yet.<br>';
			wishListHtml += 'Click on <img src="'+image_url+'img/dec/heart.png"> icon to add an item to your wishlist.</p>'
        wishListHtml += '</div>';
        return wishListHtml;
	}
	return wishListHtml;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

$(document).on({
	click: function(e) {
		if($('.login_usermeta').hasClass('active')){
    		$('.login_usermeta').removeClass('active');
    		$('.ma_links_ddown').slideUp(200);
    		$('#menu_transoverlay').css('display','none');
    	}else{
    		$('.login_usermeta').addClass('active');
    		$('.ma_links_ddown').slideDown(200);
    		$('#menu_transoverlay').css('display','block');
    	}
    	e.preventDefault();
	}
},".usermeta_heading");

$(document).on({
	mouseenter:function() {
	if($(this).find('.new_qty_ddown_1, .new_combo_qty_ddown_1').find('ul li').size() > 0){	
            $(this).find('.new_qty_ddown_1, .new_combo_qty_ddown_1').stop(true,true).slideDown(180,function(){
			//$(this).find('.new_qty_ddown_1').jScrollPane().data('jsp').reinitialise();
			v_scroll_reinitialize();
			var jHeight = $(this).children('#mini_cart .new_qty_ddown_1 .jspContainer').height();
		
			if($(this).find('ul li').size() <= 5)
			{
				jHeight = $(this).find('ul li').outerHeight() * $(this).find('ul li').size();
			}
			else
			{
				jHeight = 145;
			}
                        if($(this).children('.new_combo_qty_ddown_1 .jspContainer').attr('class')!=undefined){                         
                            $(this).children('.new_combo_qty_ddown_1 .jspContainer').height(jHeight);
                        }
                        else
                        {
                            $(this).children('.new_qty_ddown_1 .jspContainer').height(jHeight);
                        }
        });
            }
	},
	mouseleave: function() {
		$(this).find('.new_qty_ddown_1, .new_combo_qty_ddown_1').stop(true,true).slideUp(180);
	}
},'.new_qty_wrap_1');

$(document).on({
	click: function(e){
		var qty = $(this).data('qty');
		var product_id = $(this).parent().data('productid');
		var product_type = $(this).parent().data('producttypeid');
		$(this).parents('.new_qty_ddown_1').siblings('.new_qty_header_1').html(qty);
		$(this).parents('.new_qty_ddown_1').stop(true,true).slideUp(180);
		e.stopImmediatePropagation();
		if(product_type=='bundle'){
			setCart(product_id,qty,'','','','',1);
		}else{
			setCart(product_id, qty, "", "", "","");
		} 
	}
},'.minicart_qty_dropdown ul li');

$(document).on({
	click: function(e){
		var qty = $(this).data('qty');
		var product_id = $(this).parent().data('productid');
		$(this).parents('.new_qty_ddown_1').siblings('.new_qty_header_1').html(qty);
		$(this).parents('.new_qty_ddown_1').stop(true,true).slideUp(180);
		e.stopImmediatePropagation();
	}
},'.wishlist_qty_dropdown ul li');

$(document).on({
	click: function(e) {
		var card = $(this).siblings('.minicart_item_data');
		var qty= card.find('.new_qty_header_1').text();
		var product_id= card.find('ul').attr('data-productid');
		var product_type= $(this).data('wishlistproducttype');
		if(typeof product_id != 'undefined' && product_type!='bundle'){
			setCart(product_id,qty,'','1','');
		}else if(product_type=='bundle'){ //changes to add wardrobe to cart from mini wishlist -- added by shaily
			setCart(product_id,qty,'','1','','',1);
		}

	}
},'.minicart_add_to_cart');


function getCartInfo()
{
	$.ajax({
		url:'/site_page/getCartInfo',
		type:'get',
		async:false,
		cache: false,
		success: function (data){
			miniCartFooterHtml = miniCartHeaderHtml = miniCartBodyHtml = miniCartHtml = "";
			var abc = createMiniCart(data);
			if(!skip_mini_cart) {
				if($('#shoppingcart').length > 0) {
					$('#shoppingcart').replaceWith(abc);
				} else {
					$(abc).insertAfter('#site-logo');
				}
			}
			$("#mini_cart").html(miniCartHtml);
			var mcart_height;
                        mcart_height = $('#mini_cart').height() - 210;
			$('#mini_cart_body').css('height',mcart_height+'px');
			$('#mini_cart').addClass('active').animate({right:0}, 300);
			$('#popup_overlay').addClass('active');
			disable_scroll();
			v_scroll_reinitialize();
		},
		error : function(){
		}
	});
}

function initExchange() {
	$(function () {
		var $fe_header = $('#fe_header');
		$('#fe_header #close').click(function () {
			$(this).fadeOut();
			$(this).siblings('.fe_data').find('.fe_desp,.right').fadeOut(300, function () {
				$fe_header.animate({width: 82}, 300);
				$fe_header.removeClass('expanded').addClass('collapsed');
			});
		});

		$('#fe_header #open').click(function () {
			$fe_header.removeClass('collapsed').addClass('expanded');
			$fe_header.animate({width: '100%'}, 300, function () {
				$(this).find('.fe_desp,.right.current').fadeIn(300);
				$fe_header.find('#close').fadeIn();
			});
		});

		$(window).scroll(function () {
			if( _formPage || ! $('#menu_wrapper').is(':visible') ) {
				$('#fe_header_wrapper').hide();
				return false;
			}

			if ($('body').hasClass('fixed_active'))
			{
				var _top = ( $('#menu_wrapper').is(':visible') ) ? 40 : 0;
				$('#fe_header_wrapper').stop().animate({top: _top}, 300);
			}
			else
			{
				var _top = ( $('#menu_wrapper').is(':visible') ) ? 40 : 0;
				$('#fe_header_wrapper').stop().animate({top: -_top}, 300);
			}
		});
	});
}

/**
 * listener for exchange functionality in header
 */
function initHeaderExchange() {
	$("#exchangeRoll").click(function(){
		$("#exchangeRollWrap").css("display","block");
		//$("#popup_overlay").css("display","none");
	});
}

/**
 * Hide the exchange pop-up when clicked anywhere else
 */
$(document).on('click', function(event) {
	if ($(event.target).closest('#exchangeRoll, #exchangeRollWrap, #btnPinCodeCheck').length) {
		$("#exchangeRollWrap").css("display","block");
		//$("#popup_overlay").css("display","none");
	}
	else{
		$("#exchangeRollWrap").css("display","none");
		//$("#popup_overlay").css("display","none");
	}
});
