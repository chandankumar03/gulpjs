var rec_cnt = 0; var expanded = true; var set_collapse = 0; var doToggle = 1;
var h_scroll = '';
var v_scroll = '';
var btop_tout;
$(document).ready(function(){

	//Script to check touch devices



    //Script to check touch devices ends here
	$(".top_notification").slideDown('slow');
	$("div.product-list ul").show();
	$("div.nav-open").show();
	if($('.pay_with_confidence').length){
		$('.pay_with_confidence').cycle({
			fx:    'fade',
			timeout: 3000,
			speed: 800,
			pause: 0
		});
	}

	$("#loginpop1").click(function() {
		$("#signupBox").fadeOut(50);
		$("#loginBox").fadeIn(50);
		$("#login-form #emailid").focus();
		$('#login-form')[0].reset();
		$('#login-form .validation-advice').css("display","none");
	});

	$("#signuppop1").click(function() {
		$("#loginBox").fadeOut(50);
		openModel('signupBox');
		$("#signup-form #email").focus();
		$('#error_msg').html("");
		$('#signup-form')[0].reset();
		$('#signup-form .validation-advice').css("display","none");
	});
	$('#signupmodal').click(function(){
		block_reg_popup=true;
		dataLayer.push({'category' : 'homepage-reg-modal', 'action': 'homepage-rhs-3', 'label' : 'modal_open', 'event' : 'legacyevent'});
		openModel('signupBox');
	});
	$("#frgtPass").click(function() {
		$('#loginBox').fadeOut(0);
		$("#forgetPassBox").fadeIn(0);
		$('#reset-form')[0].reset();
	});

	$("#frgtPassCheckout").click(function() {
		$('#chackoutLogin').fadeOut(0);
		$("#forgetPassBox").fadeIn(0);
	});

	$("#frgtPassMreg").click(function() {
		$('#mregSignupBox').fadeOut(0);
		$("#forgetPassBox").fadeIn(0);
	});


	$("#myacc").mouseenter(function () {
		$("#myacc_link").addClass("selected");
		$("#myacc_dropdown").show();
	});

	$("#myacc").mouseleave(function () {
		$("#myacc_link").removeClass("selected");
		$("#myacc_dropdown").hide();
	});

	var minicart_timer;

	$(".trigger-minicart").hover(function(){
		$("#minicart").slideDown();
	});

	$("#minicart").mouseleave(function(){
		$("#minicart").slideUp();
	});

	$("#minicart").hover(function(){
		clearTimeout(minicart_timer);
	});

        // Common scrolling link
        var scroll_amt, scroll_rel;
	$(document).on('click','.scroll_link', function(e){
            scroll_rel = $(this).attr('rel');
            scroll_amt = $('#' + scroll_rel).offset().top - 40 - (($('#menu_wrapper').height())*2);
            if($(this).attr('add') != 'undefined' && $(this).attr('add') != '' && !isNaN($(this).attr('add'))){
                scroll_amt = scroll_amt+Math.round($(this).attr('add'));
            }
            if($(this).attr('sub') != 'undefined' && $(this).attr('sub') != '' && !isNaN($(this).attr('sub'))){
                scroll_amt = scroll_amt-Math.round($(this).attr('sub'));
            }
            $('html,body').animate({scrollTop: scroll_amt}, 500);
            e.preventDefault();
        });


	// open popup on 'know more' click for additional details in pincode
	$(document).on('click','.pincode_rules',function(){
		$('#additionalPincodeRulesPopup').fadeIn(0);
                $('#popup_overlay').addClass('active');
                $('#add_popup').fadeIn(200);
		e.preventDefault();
	});

	$(document).on('click','.popup_close',function(){
		$('.popup_box').fadeOut(200, function(){
			$('#popup_overlay').removeClass('active');
		});
		if(typeof last_verified_pin !== 'undefined'){last_bill_pin = 0; last_verified_pin = 0;}	//unset last_verified_pin on popup close
	});

	/*Script for Megamenu local storage start */
	/*checked whether local storage is supported*/
	if(typeof(Storage) !== "undefined") {
		var found = true;
		var expire = parseInt(localStorage.getItem("megamenu.expire"));
		/*check for local storage expiry*/
		if(typeof expire != 'undefined' && expire != null && expire != '' && !isNaN(expire)) {
			var curr_diff = getMinutesBetweenDates(new Date(expire), new Date());
			if(curr_diff > 15) {
				found = false;
			} else {
				/*if not expire then get it from local storgae and place it on it's location*/
				$(".menu_wrapper ul li a").each(function(){
					var menu_name = $(this).html();
					var first_part_name = menu_name.split(" ");
					var name_to_match = first_part_name[0].toLowerCase();
					var megamenu = localStorage.getItem("megamenu."+name_to_match);
					if(typeof  megamenu != 'undefined' && megamenu != null && megamenu != '') {
						$("#megamenu").append(megamenu);
					} else {
						found = false;
						return false;
					}
				});
			}
		} else {
			found = false;
		}
		if(found === false) {
			getMenus();
		}
	} else {
		/*fire the ajax to get sub menus*/
		getMenus();
	}

        // Script for Menu hover
        // it has to replace with old one
        var ref_menu, curr_menu_item;        
        var menu_hover_delay=200, setTimeoutConst;
        $('.menu_wrapper a').hover(function(){
            var cur_obj = $(this);
            if($(window).width() >= 980){
            setTimeoutConst = setTimeout(function(){
                $('#slideshow').cycle('pause');
                        curr_menu_item = cur_obj;
                        ref_menu = cur_obj.attr('rel');
                        if($('#megamenu').is(':hidden')){
                                $('.megamenu_panel').hide();
                                $('#menu_transoverlay, #'+ref_menu).css('display','block');
                                $('.menu_wrapper a').removeClass('active');
                                $('#megamenu').stop(true,true).delay(200).fadeIn(200, function(){
                                        curr_menu_item.addClass('active');
                                });
                        }else{
                                $('.megamenu_panel').not('#'+ref_menu).fadeOut(200);
                                $('.menu_wrapper a').removeClass('active');
                                $('#'+ref_menu).stop(true,true).delay(200).fadeIn(150, function(){
                                        curr_menu_item.addClass('active');
                                });
                        }
                }, menu_hover_delay)
            };
            // add code for Overlapping with drop-down options issue
            if ($("select").is(":focus")) {
                $("select").blur(); 
            }
        },function(){
            clearTimeout(setTimeoutConst);
            $('#slideshow').cycle('resume');
        });
        
        $('#megamenu').hover(function(){
            $('#slideshow').cycle("pause");
        },function(){
            $('#slideshow').cycle("resume");
        });
        
        // pause auto cycle on mouseover
        $('#making_process_slideshow').hover(function(){
            $('#making_process_slideshow').cycle("pause");
        },function(){
            $('#making_process_slideshow').cycle("resume");
        });
        
        $('#menu_transoverlay, .header, .topbar').on('mouseover', function(){
                if($(window).width() >= 980){
                        $('#megamenu').stop(true,true).delay(200).fadeOut(200, function(){
                                $('.megamenu_panel').hide();
                        });
                        $('#menu_transoverlay').hide();
                        $('.menu_wrapper a').removeClass('active');

                }
        });
        // Script for preventing megamenu in touch devices
        $('.menu_wrapper a.level-top').click(function(e){
            curr_menu_item = $(this);
                ref_menu = $(this).attr('rel');
            if($('#'+$(this).attr('rel')).is(':visible')){
                return true;
            }else{
                $('.megamenu_panel').hide();
				$('.menu_wrapper a').removeClass('active');
				$(this).addClass('active');
                 $('#menu_transoverlay, #'+ref_menu).css('display','block');
                $('#megamenu').css('display','block').animate({left: 0}, 300);
                return false;
            }
        });
        $('#white_overlay').on('click', function(){
                //if($(window).width() < 980){

                        if($('#megamenu').is(':visible')){
                                $('#megamenu').animate({left: '-96%'}, 300, function(){
                                        $('#megamenu').css('display','none');
										$('.menu_wrapper a').removeClass('active');
                                        $('#white_overlay, .menu_wrapper').removeClass('active');
                                        enable_scroll();
                                });
                        }else{
								$('.menu_wrapper a').removeClass('active');
                                $('#white_overlay, .menu_wrapper').removeClass('active');
                                enable_scroll();
                        }
			// since the overlay is already closed, we need to close the "Track your order" overlay too.
                        $('.tyo_popup_box').hide();
               // }
        });

        $('.mobilemenu_icon').click(function(){
            $('#white_overlay,.menu_wrapper').addClass('active');
            disable_scroll();
            //$('.mobilemenu_icon').addClass('micon_active');
        });
        
        $(document).on({
                mouseenter: function () {
                        if($(window).width() >= 980){
                                $(this).addClass('active');
                                $('.ma_links_ddown').slideDown(200);
                        }
                },
                mouseleave: function () {
                        if($(window).width() >= 980){
                                $('.login_usermeta').removeClass('active');
                                $('.ma_links_ddown').slideUp(200);
                        }
                }
        }, ".login_usermeta");


        // Checks to see if the platform is strictly equal to iPad:
        if (navigator.platform === 'iPad') {
           window.onorientationchange = function() {
               if($('#megamenu').is(':visible')){
                        $('#megamenu').animate({left: '-96%'}, 300, function(){
                                $('#megamenu').css('display','none');
                                $('#white_overlay, .menu_wrapper').removeClass('active');
                                enable_scroll();
                        });
                }else{
                        $('#white_overlay, .menu_wrapper').removeClass('active');
                        enable_scroll();
                }
               $(window).trigger('resize');
			   navResizer();
           }
        }


	/*Script for Megamenu local storage stop */


	// Script for Megamenu
	var furtab_ref,mmenu_tout,curr_menu,curr_menu_child;
	$('.fur_menu_tabs ul li').hover(function(){
		$('.fur_menu_tabs ul li').removeClass('active');
		$(this).addClass('active');
		furtab_ref = '#'+$(this).data('ref');
		$('.fur_menu_tabs ul li').removeClass('active');
		$(this).addClass('active');
		$('.abso_menu_slide:not("'+furtab_ref+'")').stop(true,true).fadeOut(300);
		$(furtab_ref).stop(true,true).fadeIn(300);
	});
	$('.navigation ul li.level-top').hover(function(){
		curr_menu = $(this);
		curr_menu_child = $(this).find('.megamenu');
		clearTimeout(mmenu_tout);
		$('.megamenu').not($(this).find('.megamenu')).fadeOut(200);
		if(curr_menu.find('.megamenu').length > 0){
			mmenu_tout = setTimeout(function(){
				curr_menu.find('.megamenu').fadeIn(300); $('.transoverlay').show();
				$('.navigation ul li.level-top').removeClass('curr_menu_item');
				curr_menu.addClass('curr_menu_item');
			}, 300);
		}
		if($('#floating_menu').hasClass('fixed_floating')){
			$(this).find('.megamenu_tip').css('left',$(this).position().left + ($(this).width() / 2) - 30 + 'px');
		}else{
			$(this).find('.megamenu_tip').css('left',$(this).position().left + ($(this).width() / 2) - 26 + 'px');
		}
	});

	// Script for preventing megamenu in touch devices
	$('#navigation a.level-top').click(function(e){
		if(!Modernizr.touch){
			return true;
		}else{
			if($(this).parent().find('.megamenu').is(':visible')){
				return true;
			}else{
				$('.navigation ul li.level-top').trigger('hover');
				return false;
			}
		}
	});

	$('.transoverlay').hover(function(){
		clearTimeout(mmenu_tout);
		mmenu_tout = setTimeout(function(){ $('.megamenu,.transoverlay').fadeOut(300);
			$('.navigation ul li.level-top').removeClass('curr_menu_item');
		}, 300);
	});
	$('#navigation').mouseleave(function(){
		clearTimeout(mmenu_tout);
		mmenu_tout = setTimeout(function(){ $('.megamenu,.transoverlay').fadeOut(300);
			$('.navigation ul li.level-top').removeClass('curr_menu_item');
		}, 300);
	});

    // header search
	$('#search').focus(function(){
		if($('#floating_menu').hasClass('fixed_floating')){
			$('div.navigation').addClass('active').removeClass('def_s_active');
		}else{
			$('div.navigation').addClass('def_s_active');
		}
			clearTimeout(mmenu_tout);
			$('.megamenu,.transoverlay').fadeOut(200);
	});
	$('#search').blur(function(){
		$('div.navigation').removeClass('active').removeClass('def_s_active');
		clearTimeout(mmenu_tout);
		$('.megamenu,.transoverlay').fadeOut(200);
	});

	//Search submit button click expand search input
	$('#search_submit').click(function(){
		checkForm();
	});



	try{
		/*Home page trending */
		if($("#slide").length > 0) {
			$("#slide").find("img.lazy").css({'width':'150px', 'height':'165px'});
			$("#slide").find("img.no_loader").css({'width':'150px', 'height':'165px'});
			$("img.lazy").lazy({
				   bind:'event',
				   threshold:1000,
				   beforeLoad: function(element) {
				   element.removeClass("lazy");
				},
			   onLoad: function(element) {
				   element.addClass("loading");
			   },
			   afterLoad: function(element) {
				   element.removeClass("loading").addClass("loaded");
				   element.attr('style','');
				   element.css({'display':'inline'});
			   },
			   onError: function(element) {
			   }
			});
		}
	}
	catch(err){ }
        
        $(window).load(function(){
            // Vertical scroll
            if($('.new_qty_ddown_1').length > 0){
                $('.new_qty_ddown_1').css({'display':'block', 'visibility':'hidden'});
                $('.new_qty_ddown_1').each(function(){
                        $(this).jScrollPane().data('jsp');
                });
            }
            if($('.v_scroll').length > 0){
                    $('.v_scroll').each(function(){
                            $(this).jScrollPane().data('jsp');
                    });
            }
            if($('.h_scroll').length > 0){
                    $('.h_scroll').each(function(){
                            $(this).jScrollPane().data('jsp');
                    });
            }
            if($('.new_qty_ddown_1').length > 0){
                    $('.new_qty_ddown_1').css({'display':'none', 'visibility':'visible'});
            }
        });

        // Verifying pinode on key up
        if(jQuery(".country_common").val() == "IN"){
            last_verified_pin = jQuery('.postcode_common').val();	//for all addresses except billing
            last_bill_pin = jQuery('.bill_postcode_common').val();	//for billing address
            jQuery('.postcode_common').attr('maxlength',6);
            jQuery('.bill_postcode_common').attr('maxlength',6);	//for billing address
            postCodeCheck();
        }

        jQuery('.country_common').change(function() {
            var country_id = jQuery(this).val();
            if(country_id != "IN"){
                    jQuery('.postcode_common').removeAttr("maxlength");
                    jQuery('.bill_postcode_common').removeAttr("maxlength");                    
            }else{
                    jQuery('.postcode_common').attr("maxlength",6);
                    jQuery('.bill_postcode_common').attr("maxlength",6);
                    postCodeCheck();
            }
        });
        // pincode verification ends
});

$(document).on({
	click: function(){
		getCartInfo();
	}
},"#shoppingcart");

$(document).on({
	click: function(){
		$('#mini_cart').removeClass('active').animate({right:-400}, 300);
		if($('#recent_view').hasClass('active')) {
                    $('#popup_overlay').addClass('active');
                }
                else
                {
                    $('#popup_overlay').removeClass('active');
                }
        enable_scroll();
	}
},"#close_mini_cart");

$(document).on({
	click: function () {
		block_reg_popup=true;
		$("#loginBox").fadeIn(50);
		$("#login-form #emailid").focus();
		$('#login-form')[0].reset();
		$('#login-form .validation-advice').css("display","none");
	}
}, "#loginpop");

$(document).on({
	click: function () {
		block_reg_popup=true;
		openModel('signupBox');
		$("#signup-form #email").focus();
		$('#signup-form')[0].reset();
		$('#error_msg').html("");
		$('#signup-form .validation-advice').css("display","none");
	}
}, "#signuppop");

function returning_customer(){
	if(checkOOS() == false) {
		return false;
	} else {
		setTimeout(function(){
			$("#chackoutLogin").fadeIn(400);
                        $('#popup_overlay').addClass('active');
                        $(" #register_true_popup").css("display","block");
		}, 0);
		return false;
	}
}

function checkForm(){
	var search = $('#search').val();
	if(search != '' && search.length >= 3){
		$('#search_os').val(search);
		if($.trim($('#cat').val()).length == 0)
		{
			$('#cat').prop('name','');
		}
		dataLayer.push({'category' : 'Search Box', 'action': 'Click', 'label' : 'Submit', 'event' : 'legacyevent'});
                createCookie('search_ubx',search,1);
                
		return true;
	}
	$('#search').focus();
	if($('#floating_menu').hasClass('fixed_floating')){
		$('div.navigation').addClass('active').removeClass('def_s_active');
	}else{
		$('div.navigation').addClass('def_s_active');
	}
	return false;
}

function showfilter(div_id1,div_id2){
	$('#'+div_id1).show();
	$('#'+div_id2).hide();
}

function setLocation(url){
	if (window.location.protocol == "https:") {
		url=url.replace("http://","https://");
	}else{
		url=url;
	}
	window.location = url;
}

function hidenewcart(){
	if(document.getElementById("cart_popup").style.display=="block")
	{
		var status = $('#status').val();
		if(parseInt(status)==0)
		{
			document.getElementById("cart_popup").style.display="none";
		}
	}
}

var animateCartAdded = 0;
function setCart(product_id, qty, redirect_callback, configure, prod_crum,buy_now,iscustomized){
	if(typeof(qty)==='undefined') {
		qty = 1;
	}else{
		//post data
	}
	if(typeof(redirect_callback)==='undefined') {
		redirect_callback = '';
	}
	if(typeof(configure)==='undefined') {
		configure = 0;
	}
	//added parameter for wardrobe
	if(typeof(iscustomized) ==='undefined'){
		iscustomized = 0
	}

	params = {};
	params['crumb']=prod_crum;
	params['iscustomized']=iscustomized;
	var ex = 'cp=ac';
	if(typeof(buy_now)!='undefined' && buy_now==1) {
		params['buy_now']=1;
		ex = 'cp=bn';
	}
	$.ajax({
		url:root_url+'/cart/add' + '?' + ex,
		type:'POST',
		data:{product_id:product_id,qty:qty,params:params},
		success: function (data){
			if($.isNumeric(data))
			{
				if(data == '0')
				{
					alert('Sold Out!');
				}
				else
				{
					alert('You can add max '+data+' quantity for this product');
				}
			}
			else
			{
				$('.transparent_bg').hide();
				if(!redirect_callback){
					try {
						var isJson = JSON.parse(data);
						miniCartFooterHtml = miniCartHeaderHtml = miniCartBodyHtml = miniCartHtml = "";
						var cartHTML = createMiniCart(data);
						$('#shoppingcart').replaceWith(cartHTML);
						$('.radius_100_per').html(isJson.total_items);
						$('.total_1_number').html(isJson.total_amount);
						$('#minicart_tab_panel_1 .wrapper').html(miniCartBodyHtml);
						$('#cart_proceed').show();
                                                //TO SHOW YOU PAY AND PRICE 
                                                if($("#mini_cart").find('.total_1').length > 0){
                                                    $("#mini_cart").find('.title_1').show();
                                                    $("#mini_cart").find('.total_1').show();
                                                }
                                                else
                                                {
                                                    $("#mini_cart").find(".minicart_header").append('<span class="title_1">Offer Price</span><span class="total_1">Rs.<span class="total_1_number">'+isJson.total_amount+'</span></span>');
                                                }
                                                setTimeout(function(){
                                                        $('#minicart_tab_panel_1').jScrollPane().data('jsp').reinitialise();    //Reinitialized v_scroll of minicart_tab_panel_1
                                                }, 1000);
                                                    
					} catch(e) { alert('some issue with response'); }
				}
				var cartItemData = {};
				if(page_type == 'vip')
				{
					cartItemData = itemData;
				}
				else if((page_type == 'listing' || page_type == 'search' || page_type == 'selection') && itemData.length > 0)
				{
					//alert(JSON.stringify(itemData));
					for(var i in itemData)
					{
						var items = itemData[i];
						if(items.id == product_id)
						{
							cartItemData = items;
							break;
						}
					}
				}
				var src = '//api.targetingmantra.com/RecordEvent?mid=141104'+cid+'&prc='+cartItemData.price+'&pid='+product_id+'&eid=4';
				$('#wrapper').append('<img src="' + src + '" width="1" height="1"/>');
				cartItemData.quantity = qty;
				dataLayer.push({
					'event': 'addToCart',
					'ecommerce': {
						'currencyCode': 'INR',
						'add': {                                // 'add' actionFieldObject measures.
							'products': [cartItemData]
						}
					}
				});
				dataLayer.push({'category' : 'CLIP', 'action': 'Click', 'label' : 'Add to Cart', 'opt' : true, 'event' : 'legacyevent'});
				//$(window).scrollTop(0);
				//$('#shoppingcart').effect( "shake" );
				$("#message_added").show().delay(3000).fadeOut('slow');
                // Below Condition for Buy Now Button redirection (from VIP to CART) (Added by Amol)
                if(redirect_callback != ''){
                    window[redirect_callback]();
                    return false;
                }
                //Below condition will open minicart for reducing two XHR to one (Added by Amol)
                if(miniCartHtml!= '') {
                    $("#mini_cart").html(miniCartHtml);
                    var mcart_height;
                    mcart_height = $('#mini_cart').height() - 210;
                    $('#mini_cart_body').css('height',mcart_height+'px');
                    $('#mini_cart').addClass('active').animate({right:0}, 300);
                    $('#popup_overlay').addClass('active');
                    disable_scroll();
                    v_scroll_reinitialize();
                }
                //get this out from above if else to highlight newly added product in mini cart
                $('#mini-cart-card-' + product_id).css("border-color", "#58a809");
                setTimeout(function() {
                        $('#mini-cart-card-' + product_id).css("border-color", "#b1b1b1");
                }, 3000);

				 return false;
			}
		},
		error : function(){
			alert('Try later.');
		}
	});
}

function ajax_popup(url){
	if(url != ''){
		$.ajax({
			url:root_url + url,
			success:function(data){
				$('#quick_view').show();
				$('.quick_look').html(data);
				jQuery.ready();
				setCarousel();
			},
			error:function(xhr, error){
				$('#quick_view').show();
				$('.quick_look').html('Please Try Later');
			}
		});
	}
}
function guide_popup(url){
	if(url != ''){
		$.ajax({
			url:root_url + url,
			success:function(data){
				$('#guide_pop').show();
				$('.popup_inner').html(data);
			},
			error:function(xhr, error){
				$('#guide_pop').show();
				$('.popup_inner').html('Please Try Later');
			}
		});
	}
}

function quick_view(id){
	$.ajaxSetup({cache:true});
	if(id > 0){
		$.ajax({
			url:root_url+'/site_product/inline_vip/'+id + '?cp=qw',
			success:function(data){
				$('#quick_view').show();
				$('.quick_look').html(data);
				jQuery.ready();
				setCarousel();
			},
			cache: true,
			error:function(xhr, error){
				$('#quick_view').show();
				$('.quick_look').html('Please Try Later');
			}
		});
	}
}
$("#quick_view").on("click", '.cross', function(event){
	$('.transparent_bg').hide();
});


//popup for login , signup , checkout login , password recover
function quick_popup(url){
	if(url != ''){
		$.ajax({
			url:root_url + url,
			success:function(data){
				$('#loginBox').show();
				$('#loginBoxInner').html(data);
			},
			error:function(xhr, error){
				$('#loginBox').show();
				$('#loginBoxInner').html('Please Try Later');
			}
		});
	}
}

$('#cross').click(function(){
	$('.transparent_bg').hide();
	$('.popups').html('');
});
$("#guide_pop").on("click", '.cross', function(event){
	$("#guide_pop").hide();
 });

/* spicy offer div*/
$(function()
{
	$(document).ready(function(){
	// hide #back-top first
		/*$("#back-top").hide();
		// fade in #back-top
		$(function () {
			$(window).scroll(function () {
				if ($(this).scrollTop() > 100) {
					$('#back-top').fadeIn();
				} else {
					$('#back-top').fadeOut();
				}
			});

			// scroll body to 0px on click
			$('#back-top a').click(function () {
				$('body,html').animate({
					scrollTop: 0
				}, 400);
				return false;
			});
		});*/

		$('#hotoffer').click(function(){
			//alert();
							dataLayer.push({'category' : 'Todays Special', 'action': 'Click', 'label' : 'Popup', 'opt' : true, 'event' : 'legacyevent'});
			$('#spicy-offer').fadeIn('fast',function(){
				$('#box').animate({'top':'300px'},500);
			});
		});
		$('#boxclose').click(function(){
			$('#box').animate({'top':'-500px'},500,function(){
				$('#spicy-offer').fadeOut('fast');
			});
		});
	});
});

// for item add to wishlist
function makeWish(product_id,success_location)
{
    if($('.wish_icon_1').hasClass('selected')){
        $('.wish_icon_1').removeAttr("href");
    } else {
        var success_msg_path = '#added_in_wish_list_'+product_id;
        var path = secure_url +"/customer_wishlist/add";
        dType = 'https:' == location.protocol ? 'json' : 'jsonp';
        $.ajax({
            url: path,
            dataType:dType,
            data:{product_id : product_id},
            type: "POST",
            beforeSend: function() {},
            success: function(data){
                if(typeof success_location != "undefined" && success_location == "checkout" && (data == "true" || data == true || data == 3))
                {
                    $("#cartitem_"+product_id+" .confirm_delete").click();
                }
                else if(data == "true" || data == true){
                    $('.wish_icon_1').removeAttr("href");
                    $('.wish_icon_1').addClass('selected');
                    $('.add_wlist_icon').prop('title', 'Added to your wishlist');
                    $(success_msg_path).css("display","block");
                    dataLayer.push({'category' : 'CLIP', 'action': 'Click', 'label' : 'Add to Wishlist', 'opt' : true, 'event' : 'legacyevent'});
                } else if(data == 3){
                    $(success_msg_path).html('<span class="red">Item already added into your wishlist</span>');
                    $(success_msg_path).css("display","block");
                }else {
                    //createCookie("click_on_wishlist", product_id+'-0');
                    //quick_popup('/customer/loginPopup/');
                    $('.wish_icon_1').removeAttr("href");
                    $('.wish_icon_1').addClass('selected');
                    $('.add_wlist_icon').prop('title', 'Added to your wishlist');
                    $(success_msg_path).css("display","block");
                }
            },
            error: function(x,y,z){
                alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
            }
        });
    }
}


function email_notify(){
	var filter = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{1,4}$/;
	var emailValue = $.trim($('#email').val());
	var pid = $.trim($('#pid').val());
	if(filter.test(emailValue)){
		$.ajax({
			url:root_url+'/site_product/notify',
			data:'email='+emailValue+'&pid='+pid,
			type:'post',
			success:function(data){
				data = $.trim(data);
				if(data == 1){
					$('#email').val('');
					$('#email_notify').html('<label class="green">Email send succesfully.</label>').fadeOut(1000);
				}else{
					$('#email_notify').html('<label class="red">Try Later</label>');
				}

			},
			error:function(){
				$('#email_notify').html('<label class="red">Try Later</label>');
			}

		});
	}else{
		$('#email_notify').html('<label class="red">Wrong Email Id</label>');
		return false;
	}
}

$(function () {

	$(window).scroll(function(){
		if($('.fix_pos').length > 0 && $(window).scrollTop() >= $('.fix_pos').offset().top){
			if(!($('body').hasClass('fixed_active'))){
				$('body').addClass('fixed_active');
			}
		}else{
			$('body').removeClass('fixed_active');
		}
                // Header fix call for tab view
                header_fix();
                // Back to top visibility
		if($(window).scrollTop() > 100){
			$('#back-top').stop('true','true').fadeIn(250);
		}else{
			$('#back-top').fadeOut(250);
			clearTimeout(btop_tout);
                }
	});

        // Back to top
$('#back-top').click(function(){
        $('html,body').animate({scrollTop:0}, 500);
});
});

// Scroll stop event
$.fn.scrollStopped = function(callback) {
var $this = $(this), self = this;
$this.scroll(function(){
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,250,self));
});
};

$(window).scrollStopped(function(){
    clearTimeout(btop_tout);
    btop_tout = setTimeout(function(){
        $('#back-top').fadeOut(250);
    }, 3000);
});


$('.quick_gal_img').click(function(e){
	e.preventDefault();
			$('#loading_img').show();
	$('#quick_large').attr('src', $(this).attr('data-large')).load(function (){ $('#loading_img').hide(); });
});

/*
* replace http query str
*/
function replaceQueryString(uri,key,value) {
	var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
	separator = uri.indexOf('?') !== -1 ? "&" : "?";
	if (uri.match(re)) {
		return uri.replace(re, '$1' + key + "=" + value + '$2');
	}
	else {
		return uri + separator + key + "=" + value;
	}
}

/*
*  remove http query str
*/
function RemoveParameterFromUrl( uri, key ) {
	var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
	separator = uri.indexOf('?') !== -1 ? "&" : "?";
	if (uri.match(re)) {
		return uri.replace(re, '');
	}else {
		return uri + separator + key + "=" + value;
	}
}

 function show_tool(tip_id){
	 $('.tooltip-inner').hide();
	 $('#'+tip_id).toggle();
 }

 function hide_tool(){
	 $('.tooltip-inner').hide();
 }

function tell_us(){
	var url = root_url+"/customer/tellus?" + new Date().getTime();
	$.ajax({
		url:url,
		success:function(data){
			$('#tell_us_popup_content').html(data);
			$("#tell_us_box").fadeIn(0);
		},
		error:function(xhr, error){
			$("#tell_us_box").fadeIn(0);
			$('#tell_us_popup_content').html('Please Try Later');
		}
	});
}

$(document).on('click', '#show_cod_box_yes',function(){
	$('#pin_check_result').fadeOut(200,function(){
		$('#check_cod_option').fadeIn(200);
	});
});

$(document).on('click', '#post_pincode_no',function(e){
	$('#pin_check_result,#cod_form2_confirm,#displayPartMsg').fadeOut(200,function(){
		$('#check_cod_option').fadeIn(200);
		if($('.vip2-1_pad_20 span').length > 0) {
			$('.vip2-1_pad_20 span:first').addClass('free_sindia');
			$('#order_today_ship_msg').show();
		}
	});
    e.preventDefault();
});

$(document).on('click', '#show_cod_box_no',function(){
	$('#pin_check_result').fadeOut(200,function(){
		$('#check_cod_option').fadeIn(200);
	});
});

$(document).on("keypress" ,"#cod_pincode",function(e){
	if(e.which == 13){//Enter key pressed
		e.stopImmediatePropagation();
		checkpincode();
	}
});

//pincode check
$(document).on('click','#check_pin_submit',function(e){
  e.stopImmediatePropagation();
  checkpincode();
});

function checkpincode()
{
	$('#cod_message').html('');
	$('.cod_error').css({'display':'none'});
	$('#post_pincode_yes').html('');
	$('#pincode_yes').hide();
	$('#post_pincode_no').html('');
	$('#pincode_no').hide();
	$('#cod_yes').hide();
	$('#cod_no').hide();
	$('#serv_msg').html('');
	var pincode           = $('#cod_pincode').val();
	var prc_code          = $('#cod_prc_code').val();
	var sku               = $('#cod_sku').val();
	var supplier_id       = $('#cod_supplier_id').val();
	var cod_exist         = $('#cod_open').val();
	var int_ship          = $('#int_ship').val();
	var product_id        = $('#product_id').val();
	
	//adding parameters to check wardrobe servicability
	var is_customized     = $('#is_customized').val();
	var customized_id     = $('#customized_id').val();
	if(typeof customized_id == 'undefined'){
		is_customized = 0;
		customized_id = 0;
	}
	var cod_auction = 0,brand_id=0,assembly_check=0,new_tse=0,brand_name=0;
	cod_auction       = $('#cod_auction').val();
	if ($('#brand_id').length > 0){
		brand_id          = $('#brand_id').val();
		brand_name        = $('#brand_name').val();
		assembly_check    = $('#assembly_check').val();
		new_tse           = 1;
	}
	if(pincode === ''){
	  $('#cod_pincode').val('').addClass('required').attr('placeholder','Enter valid pincode');
	  $('.cod_error').css({'display':'block'});
	  return false;
	}
	if(pincode.length < 6){
	  $('#cod_pincode').val('').addClass('required').attr('placeholder','Enter valid pincode');
	  $('.cod_error').css({'display':'block'});
	  return false;
	}
	if(pincode.length > 8){
	  $('#cod_pincode').val('').addClass('required').attr('placeholder','Enter valid pincode');
	  $('.cod_error').css({'display':'block'});
	  return false;
	}
	if(isNaN(pincode)){
	  $('#cod_pincode').val('').addClass('required').attr('placeholder','Enter valid pincode');
	  $('.cod_error').css({'display':'block'});
	  return false;
	}

	var ajaxLoading = false;

  if(!ajaxLoading){
	  ajaxLoading = true;
        $.ajax({
            url: '/pincode/is_product_serviceable',
            data: 'pincode=' + pincode + '&prc_code=' + prc_code + '&sku=' + sku + '&supplier=' + supplier_id + '&cod_exist=' + cod_exist + '&int_ship=' + int_ship + '&brand_id=' + brand_id + '&assembly_check=' + assembly_check + '&product_id=' + product_id+'&is_customized='+is_customized+'&customized_id='+customized_id+ '&ccid=' + ccid,
            type: 'post',
            success: function (data) {
                ajaxLoading = false;
                data = $.trim(data);
                try {
                    data = $.parseJSON(data);
                } catch (e) {
                    // not json
                    if (data === 'pincode must be in digit') {
                        $('#cod_pincode').val('').addClass('required').attr('placeholder', 'Enter valid pincode');
                        if (new_tse === 0) {
                            $('.cod_error').css({'display': 'block'});
                        }
                        return false;
                    }
                }
                var cod_str = '';
                var serv_str = '';
                if (data.cod) {
                    if (data.cod === 'not available') {
                        if (cod_exist > 0 && new_tse === 0) {
                            $('#cod_no').show();
                        }
                        cod_str = '<br />COD <span class="cod_error">Not Available</span>.';
                        if (new_tse === 1) {
                            cod_str = 'is <span class="red">not available</span> <br/>for your location';
                            $('#cod_msg').parent().removeClass().addClass('vip_cod_summary_block cod_ch noborderright del_cancel');
                        }
                        
                      $('#cod_status').empty().html("Not available");
                      $('#cod_img').removeClass().addClass('del_cross');  
                    
                    } else if (data.cod === 'available') {
                        if (cod_exist > 0 && new_tse === 0) {
                            $('#cod_yes').show();
                        }
                        cod_str = '<br /> COD <span class="green">Available</span>.';
                        if (new_tse === 1) {
                            cod_str = 'is <span class="green">available</span> <br/>for your location';
                            $('#cod_msg').parent().removeClass().addClass('vip_cod_summary_block cod_ch noborderright del_check');
                        }
                        
                         $('#cod_status').empty().html("Available");
                         $('#cod_img').removeClass().addClass('del_check');
                    }
                }
                if (data.serviceable) {
                    if (data.serviceable === 'not available') {
                        serv_str = '<span class="red">can\'t be Delivered</span>';
                        if (new_tse === 1) {
                            serv_str = 'This item <span class="red">can\'t be <br/>Delivered</span> to your location';
                            $('#serv_msg').parent().removeClass().addClass('vip_cod_summary_block delivery_ch del_cancel');
                            $('#pin_check_result').addClass('no_deliverability');
                            $('#delivery_block').hide();
                            $('#no_delivery_block').show();
                        }
                    } else if (data.serviceable === 'available') {
                        serv_str = 'can be <span class="green">Delivered</span>';
                        if (new_tse === 1) {
                            serv_str = 'This item can be <br/><span class="green">Delivered</span> to your location';
                            $('#serv_msg').parent().removeClass().addClass('vip_cod_summary_block delivery_ch del_check');
                            $('#pin_check_result').removeClass('no_deliverability');
                            $('#no_delivery_block').hide();
                            $('#delivery_block').show();
                            if ($('.vip2-1_pad_20').length > 0) {
                                //$('#order_today_ship_msg').hide();
                            }
                        }
                    }
                    
                    /*Code for part payment starts*/
                    if(data.part_payment_for_pincode){
                        if(data.part_payment_for_pincode === 'available' && data.serviceable === 'available'){
                            $('#part_pay_availability').html('Available');
                            $('#partPayAvalabilityCheck').removeClass('del_cross');
                            $('#partPayAvalabilityCheck').addClass('del_check');
                            $('#displayPartMsg').css('display','block');
                        }
                        else{
                            $('#part_pay_availability').html('Not Available');
                                $('#partPayAvalabilityCheck').removeClass('del_check');
                            $('#partPayAvalabilityCheck').addClass('del_cross');
                            $('#displayPartMsg').css('display','none');
                        }
                    }
                    else{
                        $('#part_pay_availability').html('Not Available');
                        $('#partPayAvalabilityCheck').removeClass('del_check');
                            $('#partPayAvalabilityCheck').addClass('del_cross');
                            $('#displayPartMsg').css('display','none');
                    }
                    /*Code for part payment ends*/
                }
                
                
                
                /*furniture Exchange*/
                if (data.FE) {
                    if (data.FE === 'not available') {
                        if (new_tse === 1) {
                            $('#fe_status').empty().html("Not Available");
                            $('#fe_img').removeClass().addClass('del_cross');
                        }
                    } else if (data.FE === 'available') {
                        if (new_tse === 1) {
                            $('#fe_status').empty().html("Available");
                            $('#fe_img').removeClass().addClass('del_check');
                          
                        }
                    }
                }
                
                /* Code for CBC starts */
                //Below if-else code block is to show/hide CBC note depending upon pincode's CBC servicability and total offer price on VIP page
                if (data.is_cbc_serviceable == 1) {
                    var quantity = 1;   //If product is configurable and config. attri. is not selected i.e. when qty is disabled then set quantity = 1 else get the actual quantity of the product
                    if (!($('#div_selected_qty').hasClass('qty_diabled'))) {
                        quantity = parseInt($('#div_selected_qty').text());
                    }
                    var offerprice = parseInt(quantity) * parseInt(initial_price);    //Calculating total offerprice onsidering qty of the product
                    //NOTE: Below cbc range of rupees is set in index.php
                    var cbc = $.parseJSON(cbc_range);
                    if (offerprice < cbc.max && offerprice >= cbc.min) {
                        $('.cbc_with_pincode').show();
                        $('.cbc_without_pincode').hide();
                        
                        //added by vivek
                         $('#cbc_status').empty().html("Available");
                         $('#cbc_img').removeClass().addClass('del_check');
                        
                    }
                } else {
                    $('.cbc_with_pincode').hide();
                    $('.cbc_without_pincode').hide();
                    
                    //added by vivek
                     $('#cbc_status').empty().html("Not Available");
                     $('#cbc_img').removeClass().addClass('del_cross');
                }
                /* Code for CBC ends */

                if (data.assembly) {
                    var assembly_vid = '';
                    var assembly_not_provided_msg = '<a href="javascript://" class=\"tooltip\" tip =\"We\'re unable to provide assembly services for this pincode. You\'ll need to make offline arrangements for this item.\">Assembly required,to be arranged by yourself</a>';
                    var assembly_not_provided_msg_vid = 'Assembly to be arranged by yourself for';
                    if (data.assembly === 'available_by_pepperfry' && (assembly_check === '2' || assembly_check === '1')) {
                        assembly = '<span class=\"green\">Provided</span> by Pepperfry';
                        assembly_vid = 'Assembly Provided by <span class="red">Pepperfry</span> for';
                        $('#assembly_msg').parent().removeClass().addClass('vip_cod_summary_block assembly_ch del_check');                      
                        //added by vivek
                         $('#assembly_img').removeClass().addClass('del_check');
                    }
                    else if (data.assembly === 'not available' && assembly_check === '1') {
                        assembly = assembly_not_provided_msg;
                        assembly_vid = assembly_not_provided_msg_vid;
                        $('#assembly_msg').parent().removeClass().addClass('vip_cod_summary_block assembly_ch del_no_ass');
                        //added by vivek
                         $('#assembly_img').removeClass().addClass('del_cross');
                        
                    } else if (data.assembly === 'available' && assembly_check === '1') {
                        assembly = '<span class=\"green\">Provided</span> by Pepperfry';
                        assembly_vid = 'Assembly Provided by <span class="red">Pepperfry</span> for';
                        $('#assembly_msg').parent().removeClass().addClass('vip_cod_summary_block assembly_ch del_check');
                        //added by vivek
                         $('#assembly_img').removeClass().addClass('del_check');
                         
                    } else if (data.assembly === 'not available' && assembly_check === '2') {
                        assembly = assembly_not_provided_msg;
                        assembly_vid = assembly_not_provided_msg_vid;
                        $('#assembly_msg').parent().removeClass().addClass('vip_cod_summary_block assembly_ch del_no_ass');
                        //added by vivek
                         $('#assembly_img').removeClass().addClass('del_cross');
                        
                    } else if (data.assembly === 'available' && assembly_check === '2') {
                        assembly = '<span class=\"green\">Provided</span> by ' + brand_name;
                        assembly_vid = 'Assembly Provided by <span class="red">' + brand_name + '</span> for';
                        $('#assembly_msg').parent().removeClass().addClass('vip_cod_summary_block assembly_ch del_check');
                        //added by vivek
                         $('#assembly_img').removeClass().addClass('del_check');
                         
                    } else if (assembly_check === '3') {
                        assembly = 'Simple Assembly,<br>Can be managed by Self';
                        $('#assembly_msg').parent().removeClass().addClass('vip_cod_summary_block assembly_ch del_exclamation');
                    } else if (assembly_check === '4') {
                        assembly = 'No Assembly Required';
                        $('#assembly_msg').parent().removeClass().addClass('vip_cod_summary_block assembly_ch del_check');
                        //added by vivek
                         $('#assembly_img').removeClass().addClass('del_check');
                    } else {
                        assembly = '';
                        $('#assembly_msg').parent().removeClass().addClass('vip_cod_summary_block assembly_ch');
                    }
                    
                    //added by vivek
                    $("#assembly_status").empty().html(assembly);
                }
                if (data.delivery_date && data.serviceable === 'available') {
                    $('#delivery_by,#order_today_delivery_msg span').html(data.delivery_date);
                    $('#order_today_no_delivery_msg').hide();
                    if ($('.vip2-1_pad_20').length == 0)
                        $('#order_today_ship_msg').hide();
                    $('#delivery_timeline_wrapper,#order_today_delivery_msg').show();
                } else if (data.serviceable === 'not available') {
                    $('#delivery_timeline_wrapper,#order_today_delivery_msg').hide();
                    if ($('.vip2-1_pad_20').length == 0)
                        $('#order_today_ship_msg').hide();
                    $('#order_today_no_delivery_msg').show();
                } else {
                    $('#delivery_timeline_wrapper,#order_today_delivery_msg,#order_today_no_delivery_msg').hide();
                    if ($('.vip2-1_pad_20').length == 0)
                        $('#order_today_ship_msg').show();
                }

                //added for additional details in pincode message
                if (data.additional_requirement) {
                    if (data.additional_requirement.template != 'not required') {
                        var state = data.additional_requirement.state;
                        if(state != null) {
                            state = state.toUpperCase();
                        } else {
                            state = '';
                        }
                        $('.additional_vip_notification').fadeIn(200).html('Customers in <strong>' + state + '</strong> are required to submit additional documents. <a href="javascript://" class="pincode_rules"><u>Learn More</u></a>');
                        $('#vip_add_popup').html('');
                        $('#vip_add_popup').html(data.additional_requirement.template);
                    } else {
                        $('.additional_vip_notification').html('');
                    }
                } else {
                    $('.additional_vip_notification').html('');
                }

                if (new_tse === 0)
                {
                    $('#check_cod_option').fadeOut(200, function () {
                        if (cod_auction == 1) {
                            if (data.serviceable == 'available') {
                                $('#cod_msg').html('Please note that this item <strong>can be delivered</strong> to: <a href="javascript:void(0);" id="show_cod_box_yes"><u>' + pincode + '</u> <img width="13" align="absmiddle" height="12" src="https://i1.pepperfry.com/img/edit_icon.png"></a>');
                            } else {
                                $('#cod_msg').html('Please note that this item <strong>cannot be delivered</strong> to: <a href="javascript:void(0);" id="show_cod_box_yes"><u>' + pincode + '</u> <img width="13" align="absmiddle" height="12" src="https://i1.pepperfry.com/img/edit_icon.png"></a>');
                            }

                        } else if (data.serviceable == 'not available') {
                            $('#serv_msg').html(serv_str);
                            $('#msg_for_to').html(' to:');
                            $('#cod_msg').hide();
                        } else {
                            $('#serv_msg').html(serv_str);
                            $('#cod_msg').html(cod_str);
                            $('#msg_for_to').html(' to:');
                            $('#cod_msg').show();
                        }
                        $('#post_pincode_no').html(pincode);
                        $('#serv_msg').show();
                        $('#pin_check_result').fadeIn();
                    });
                }
                else
                {
                    $('#check_cod_option').fadeOut(200, function () {
                        $('#serv_msg').html(serv_str);
                        if (cod_exist > 0) {
                            $('#cod_msg').html(cod_str);
                        }
                        if (typeof assembly != 'undefined')
                            $('#assembly_msg').html(assembly);

                        $('#cod_msg').show();
                        $('#post_pincode_no').html(pincode);
                        $('#serv_msg').show();
                        if ($('#cod_form2_confirm').hasClass('arrow_none'))
                        {
                            $('#cod_form2_confirm').removeClass('arrow_none');
                        }
                        $('#cod_form2_confirm').fadeIn();
                        $('#pin_check_result').fadeIn();
                        $('#assembly_heading_vid').fadeIn();
                        if ($('.vip2-1_pad_20 span').length > 0) {
                            $('.vip2-1_pad_20 span:first').removeClass('free_sindia');
                            $('#order_today_ship_msg').toggle();
                        }
                    });
                    if ($('#assembly_vid_msg').length > 0) {
                        if (data.serviceable === 'not available') {
                            assembly_vid = '<span class="red">This item can\'t be delivered to</span>';
                        }
                        $('#check_assembly_vid').fadeOut(200, function () {
                            $('#assembly_vid_msg').html(assembly_vid);
                            $('#edit_assembly_pincode_video').html(pincode);
                            $('#cod_pincode_video').val(pincode);
                            $('#assembly_heading_vid').fadeIn();
                        });
                    }
                }

                dataLayer.push({'category': 'VIP', 'action': 'Click', 'label': 'Pincode check', 'opt': true, 'event': 'legacyevent'});
            }, error: function () {
                alert('error');
                ajaxLoading = false;
                if (new_tse === 0)
                {
                    $('#cod_message').html('<span class="red">please try later</span>');
                    $('.cod_error').css({'display': 'block'});
                }
            }
        });
  }
  return false;
}

	 function close_tell_us_bar(){
		 $(".top_notification").slideUp('slow');
		 var path = ('https:' == document.location.protocol ? 'https://' : 'http://')+server_name+"/customer_account/tellus_process";

			$.ajax({
				url: path,
				data:{key :1},
				dataType:"json",
		        type: "POST",
		        success: function(data){

		        		},
		        error: function(data){
		        			return false;
		        		}
			});
	 }

	function fbs_click()
	{
		u=location.href;
		t=document.title;window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');
		return false;
	}
	function redirect_page(url){
	window.location = url;
	}


	//work : this function use to show the reg model - specially created for handling the OTP box
	function openModel(show_id,hide_id)
	{
		if(hide_id!='undefined' && hide_id!='')
		{
			$('#'+hide_id).hide();
		}

		if(typeof(otp_register)!='undefined' && otp_register==true)
		{
			$('#change_number_form').hide();
			$('#auth_form').show();
			$('#otp_box').fadeIn(50);
			$('#otp_box #otp_code').val('');
		}
		else
		{
			$('#'+show_id).fadeIn(50);
		}
		// add code for Overlapping with drop-down options issue
		if ($("select").is(":focus")) {
		$("select").blur();
		}
	}

	function closeOTP()
	{
                dataLayer.push({'category' : 'RegOTP', 'action': 'Close', 'label' : 'Non_checkout', 'opt' : true, 'event' : 'legacyevent'});
		$('#otp_box').hide();
	}


	function createCookie(name,value,days)
	{
		var expires = "";
		if(days == '-1')
		{
			expires=0;
		}
		else if (days)
		{
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}

		document.cookie = name+"="+value+expires+"; path=/";
	}

	function readCookie(name)
	{
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++)
		{
			var c = ca[i];
			while (c.charAt(0)==' ')
			{
				c = c.substring(1,c.length);
			}

			if (c.indexOf(nameEQ) == 0)
				return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	function eraseCookie(name)
	{
		createCookie(name,"",-1);
	}

	/*
	  * Code for Out of stock notifications
	*/

		$('#notification_status').click(function(){
			if ($(this).is(':checked')){
				$('#oos_notification_form').show();
			}else{
				$('#oos_notification_form').hide();
			}
		});


		$('#notify_email,#notify_email_2,#cod_input_1').focus(function(){
			$(this).removeClass('required');
		});

		$('.moreby_brand').click(function(){
			window.location = this.id;
		});

		function oosNotification_vip(product_id,email_id_from){
			value_from = '#'+email_id_from;
			var filter = /^[a-zA-Z0-9._-]+@([0-9a-z][0-9a-z.-]+\.)+[a-zA-Z]{2,4}$/i;
			var emailValue = $.trim($(value_from).val());
			if(filter.test(emailValue) != true )
			{
				$('#notify_email').val('').addClass('required').attr('placeholder','Invalid Email');
				$('#notify_email_2').val('').addClass('required').attr('placeholder','Invalid Email');
			}else
			{
				//goint to submit notification request in database
				$.ajax({
					url:root_url+'/site_product/oos_notifciation_request',
					data:'email='+emailValue+'&pid='+product_id,
					type:'post',
					success:function(data){
							if(data == "Success"){
								$('#notify_form_wrap').css("display","none");
								$('#notify_form_2').css("display","none");
								$('#availability_message').css("background","none");
								$('#availability_message').html('Thank you, we\'ll let you know once it\'s back in stock.');
								$('#oos_notify_subtitle_id').html('Thank you, we\'ll let you know once it\'s back in stock.');
                                                                dataLayer.push({'category' : 'VIP', 'action': 'Submit', 'label' : 'Notify Me', 'opt' : true, 'event' : 'legacyevent'});
							}else{
								$('#notify_form_wrap').css("display","none");
								$('#notify_form_2').css("display","none");
								$('#availability_message').html('There is some error, please try again later.');
								$('#oos_notify_subtitle_id').html('There is some error, please try again later.');
							}
					},
					error:function(){
							$('#notify_form_wrap').hide();
							$('#notify_form_2').hide();
							$('#availability_message').html('There is some error, please try again later.');
							$('#oos_notify_subtitle_id').html('There is some error, please try again later.');
					}
				});
			}

		}

		function toggleShare(e, flag) {
			if(flag == 1) {
				$(e).find('.clip_share').show();
				$(e).find('.details_container').addClass('selected');
			} else {
				$(e).find('.clip_share').hide();
				$(e).find('.details_container').removeClass('selected');
			}
		}
		function addSeparatorsNF(nStr, inD, outD, sep)
		{
			nStr += '';
			var dpos = nStr.indexOf(inD);
			var nStrEnd = '';
			if (dpos != -1) {
				nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
				nStr = nStr.substring(0, dpos);
			}
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(nStr)) {
				nStr = nStr.replace(rgx, '$1' + sep + '$2');
			}
			return nStr + nStrEnd;
		}

		function initAutoComplete()
		{
			var sterm, fterm, regX;
			var isHoverSelect = false;
			if($("#search").length > 0)
			{
				$("#search").autocomplete({
					delay: 0,
					minLength: 3,
					appendTo: "#site_auto_suggest",
					source: root_url+"/site_product/product_search/",
					select: function(event, ui) {
						if($('a.ui-state-focus').find('.pop_prod_item').length > 0){
							window.location = $('a.ui-state-focus').find('.pop_prod_item').attr('rel');
							return false;
						}else{
							//if($('a.ui-state-focus').find('.sugg_heading').length > 0){
							if($('a.ui-state-focus').find('.noselect').length > 0){
								if($('a.ui-state-focus').find('.noselect.category').length > 0 || $('a.ui-state-focus').find('.noselect.brands').length > 0){
									//if(ui.item.hasOwnProperty('type')) {
										//$('#in_which').val(ui.item.type);
										//$("#og_search_term").val(ui.item.label);
									//}
									$("#search").val(ui.item.label);
									if(ui.item.hasOwnProperty('category_id')) {
										$('#cat').val(ui.item.category_id);
									} else {
										$('#cat').val("");
									}
									$('#search_mini_form').submit();
								}
								return false;
							}else{
								$("#search").val(ui.item.label);
								if(ui.item.hasOwnProperty('category_id')) {
									$('#cat').val(ui.item.category_id);
								} else {
									$('#cat').val("");
								}
								$('#search_mini_form').submit();
							}
						}
						return false;
					},
					focus: function(event, ui) {
						if (typeof event.keyCode === 'undefined' || event.keyCode == 0) {
							isHoverSelect = true;
						} else {
							isHoverSelect = false;
							if($('a.ui-state-focus').find('.noselect').length > 0){
								//$("#in_which").val("");
								//$("#in_which").val(ui.item.label);
								return false;
							}else{
								$("#search").val(ui.item.label);
								if(ui.item.hasOwnProperty('category_id')) {
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
		}

		function showFullName(id){
			id = $.trim(id);
			var full_name_id = '#full-name_'+id;
			var short_name_id = '#short-name_'+id;
			//$(short_name_id).css("display","none");
			//$(full_name_id).css("display","block");
			$(full_name_id).fadeIn("fast");
		}
		function showShortName(id){
			id = $.trim(id);
			var full_name_id = '#full-name_'+id;
			var short_name_id = '#short-name_'+id;
			//$(full_name_id).css("display","none");
			$(full_name_id).fadeOut("fast");
			//$(short_name_id).css("display","block");
		}

                /*Function to get megamenu from ajax and store it into browser local storage*/
                function getMenus(){
                    $.ajax({
                        url:root_url+'/site_page/getMenus',
                        type:'post',
                        dataType:'json',
                        success:function(data){
                            var isStorable = false;
                            /*remove existing menus*/
                            if($("#megamenu").length > 0) {
                                $("#megamenu").html("");
                            }
                            /*check whether storage is supported to browser*/
                            if(typeof(Storage) !== "undefined") {
                                isStorable = true;
                                localStorage.setItem("megamenu.expire",new Date().getTime());
                            }
                            $.each(data, function(key, value){
                                /*insert the submenu to it's location */
                                $(".menu_wrapper ul li a").each(function(){
                                       var menu_name = $(this).html();
                                       var first_part_name = menu_name.split(" ");
                                       var name_to_match = first_part_name[0].toLowerCase();
                                       if(key == name_to_match) {
                                           if(isStorable) {
                                             localStorage.setItem("megamenu."+key,value);
                                           }
                                           $("#megamenu").append(value);
                                           return false;
                                       }
                                });
                            });
                        },
                        error:function(){
                        }
                    });
                }

                /*Method to get difference between two dates in minutes*/
                function getMinutesBetweenDates(startDate, endDate) {
                    var diff = endDate.getTime() - startDate.getTime();
                    return (diff / 60000);
                }

		$(".tooltip_atc").hover(function(){
			$(this).prev().css("display","block");
		},function(){
			$(this).prev().hide();
		});

                $(document).on('click', '.video_thumb', function(){
                    popup_ref = $(this).attr('rel');
                    $('#popup_overlay').addClass('active');
                    $('#'+popup_ref).delay(200).fadeIn(200);
                    v_scroll_reinitialize();

                    var video_url = $('.video_thumb a').data('iframeid');
                    // Fetch assembly check block in select_price and append it to the video block
                    // done to avoid caching of the same
                    if ($('#assembly_video_pincode_check_block').length > 0) {
                        $($('#assembly_video_pincode_check_block').html()).insertBefore($('#vid .overlay-inner-bg table'));
                        $('#assembly_video_pincode_check_block').remove();
                    }

                    $('#vid').css('display','block');
                    $('#video_container iframe').replaceWith(video_url);
                    $('#video_container iframe').css({'width':'560', 'height':'315'});

                    dataLayer.push({'category' : 'VIP', 'action': 'Click', 'label' : 'Assembly video', 'opt' : true, 'event' : 'legacyevent'});
                    e.preventDefault();
                });

                $(document).on('click', '#close_video', function(){
                        $('#video_container iframe').attr('src', '');
                        $('#vid').css('display','none');
                        $('.popup_box').fadeOut(200, function(){
                                $('#popup_overlay').removeClass('active');
                        });
                });

jQuery.cachedScript = function( url, options ) {
  // Allow user to set any option except for dataType, cache, and url
  options = $.extend( options || {}, {
    dataType: "script",
    cache: true,
    url: url
  });

  // Use $.ajax() since it is more flexible than $.getScript
  // Return the jqXHR object so we can chain callbacks
  return jQuery.ajax( options );
};

$(document).ready(function(){ 
     $.ajax({
        url:root_url+'/site_page/getCsrfToken',
        type:'post',
        success: function (data){
            if(data !='') {
                var x = document.forms;
                if(!isNaN(x.length) && x.length > 0) {
                    for(var i = 0; i < x.length; i++) {
                        if($(x[i]).attr('id') !== 'search_mini_form') {
                            $(x[i]).prepend(data);
                        }
                    }
                }
            }
        },
        error : function(){
        }
    });

   var pid = '';
   if(page_type == 'vip'){
       pid = product_id;
   }
   //Following code snippet (if structure) is to check whether user have added products in wishlist whn not logged in
   if(readCookie('wishlist_flag') == 'true') {      
        $.ajax({
            url:root_url +"/customer_wishlist/addToWishlist",
            type:'post',
            data : {pid: pid},
            success: function (data){
                if(data == 1) {
                    $('.wish_icon_1').addClass('selected');         //To make wishlist icon red
                }
                eraseCookie('wishlist_flag');
            },
            error : function(){
            }
        });
    }

    // Script for global popup close on overlay click and escape
    $('#popup_overlay').click(function(){
              $('.popup_box').fadeOut(300, function(){
                      $('#popup_overlay').removeClass('active');
              });
              // mini cart close

              if(typeof last_verified_pin !== 'undefined'){ last_verified_pin = 0; last_bill_pin = 0;}	//unset last_verified_pin on popup close
      });
      $(document).keyup(function(e) {
              if (e.keyCode == 27) {
                    $('#popup_overlay').trigger('click');
              }
			  if($('#megamenu').css('display') == 'block') {
				$('#megamenu').hide();
			  }
      });

     // Common scrollbar script
     if($.isFunction($.jScrollPane)) {
        h_scroll = $('.h_scroll').jScrollPane().data('jsp');
        v_scroll = $('.v_scroll').jScrollPane().data('jsp');
     }

});

function wheel(e) {
  preventDefault(e);
}

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40];
function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}
/*
* Discription : Updating Cart item quantity
*/
function updateCartQty()
{
       var data = $("#cart_form").serialize();
       $.ajax({
         url:root_url+'/cart/updatecart/1',
         data : data,
         type:'post',
         dataType:"json",
         success:function(data){
               if(typeof data.data.success != "undefined" && data.data.success == true){

                       var cart = JSON.parse(data.data.cart);
                       var item_total = 0;
                       var total_pay = 0;
                       var extra_discount = 0;
                       var additional_discount = 0;
                       var shipping_charge = 0;
                       var growtree_amount = 0;
                       var coupon = data.data.coupon;
                       var cart_qty = 0;
                       var total_tax = 0;
                       var total_discount = 0;
                       var exchange_discount = 0;
                       
                       applyFurnitureExchangeDiscount(data.data.furniture_exchange); // modify furniture exchange point

                       if(typeof coupon.success != "undefined" && coupon.success == true && $("#additional_discount").length > 0)
                       {
                                $("#additional_discount").attr("data-additional-discount-amount",parseInt(coupon.discount_amount)).find(".p_right").html("-Rs. "+addSeparatorsNF(Math.ceil(parseInt(coupon.discount_amount)),'.','.',','));
                                $("#coupon-msgs").html(coupon.message);
                                var tax = data.data.coupon.tax_info;
                                $("#taxes").attr("data-total-tax", parseInt(tax.total_tax)).find(".p_right").html("Rs. " + addSeparatorsNF(Math.ceil(parseInt(tax.total_tax)), '.', '.', ','));
                       }
                       
                       if(typeof data.data.online_shipping_charges != "undefined" && $("#shipping_handling").length > 0) {
                                $("#shipping_handling").attr("data-shipping-handling-amount",data.data.online_shipping_charges);
                                if(data.data.online_shipping_charges == 0) {
                                        if ($("#shipping_handling .red.free").length == 0) {
                                            $('<span class="red free">(Free)</span>').insertAfter("#shipping_handling .p_left");
                                        }
                                        $("#shipping_handling .p_right").html("Rs. "+data.data.online_shipping_charges);
                                } else {
                                        $("#shipping_handling .red.free").remove();
                                        $("#shipping_handling .p_right").html("Rs. "+data.data.online_shipping_charges);
                                }
                       }
                       
                       /* Furniture Exchange Start */
                       if($(".fe_exchange").length > 0 && typeof data.data.furniture_exchange != 'undefined' && data.data.furniture_exchange != null)
                        var strChosen = $('input[name="fe_exchange"]:checked').attr('id');
                        if (strChosen == "fe_points") {
                           exchange_discount = parseInt($("#fe_discount").attr("fe-discount-amount"));
                           total_discount += exchange_discount;
                        }
                        /* Furniture Exchange End */ 
                        
                       if($("#extra_discount").length > 0)
                       {
                                extra_discount = parseInt($("#extra_discount").attr("data-extra-discount-amount"));
                       			total_discount += extra_discount; 
                       }
                       if($("#additional_discount").length > 0)
                       {
                                additional_discount = parseInt($("#additional_discount").attr("data-additional-discount-amount"));
                       			total_discount += additional_discount; 
                       }
                       if($("#shipping_handling").length > 0)
                       {
                                shipping_charge = parseInt($("#shipping_handling").attr("data-shipping-handling-amount"));
                                handleShippingChargesMsg(shipping_charge);
                       }
                       if($("#growtree_contribution").length > 0)
                       {
                                growtree_amount = parseInt($("#growtree_contribution").attr("data-growtree-amount"));
                       }
                        if ($("#taxes").length > 0)
                        {
                                total_tax = parseInt($("#taxes").attr("data-total-tax"));
                        }

                       $.each(cart,function(j,val){
                            if($("#cartitem_"+j).length > 0)
                            {
                                    var unit_price = 0;
                                    if($("#cartitem_"+j).find(".disp_table_cell .text_1:last").length > 0)
                                    {
                                        unit_price = parseInt($("#cartitem_"+j).find(".disp_table_cell .price_diff:last").data("price"));
                                    }
                                    else if($(".out_of_stock").length > 0)
                                    {
                                        unit_price = parseInt($(".out_of_stock").data("price"));
                                    }

                                    var total_price = unit_price * parseInt(val.quantity);
                                    cart_qty = cart_qty + parseInt(val.quantity);
                                    item_total = item_total + total_price;
                                    $("#cartitem_"+j).find(".ul_qty input").val(parseInt(val.quantity));
                                    $("#cartitem_"+j).find("#base_price").html("Rs. "+addSeparatorsNF(Math.ceil(total_price),'.','.',','));
                                    $("#cartitem_"+j).find("#base_price").attr('data-rowtotal',Math.ceil(total_price));
                            }
                       });
						
						if(typeof coupon.success != "undefined"){
               				updateRowDiscount(coupon.items_discount);
						}
						//for updating offer price
						if(total_discount > 0){
                       		updateOfferPrice(item_total,total_discount);
                   		}
                       //ends
                       
                       total_pay = item_total + total_tax - total_discount + shipping_charge;
                       if($("#shoppingcart").length > 0)
                       {
                            $("#shoppingcart span").html(cart_qty);
                       }

                       if($("#item_total").length > 0)
                       {
                            $("#item_total").attr("data-total-amount",item_total).find(".p_right").html("Rs. "+addSeparatorsNF(Math.ceil(item_total),'.','.',','));
                            $("#total_pay_coupon").html("Rs. "+addSeparatorsNF(Math.ceil(total_pay + growtree_amount),'.','.',','));
                            $("#total_pay_amount").val(total_pay);
                       }

                       if($("#payment_form").length > 0)
                       {
                           $("#payment_form").find(".final_amt_payble .red").html("Rs. "+addSeparatorsNF(Math.ceil(total_pay + growtree_amount),'.','.',','));
                       }
               }
               else if(typeof data.data.success != "undefined" && data.data.success == false){
                       var cart = JSON.parse(data.data.cart);
                       $.each(cart,function(j,val){
                            if($("#cartitem_"+j).length > 0)
                            {
                               var unit_price = parseInt($("#cartitem_"+j).find(".disp_table_cell .text_1:last").data("price"));
                               var total_price = unit_price * parseInt(val.quantity);
                               $("#cartitem_"+j).find("input").val(parseInt(val.quantity));
                               $("#cartitem_"+j).find(".cart_mul_price").html("Rs. "+addSeparatorsNF(Math.ceil(total_price),'.','.',','));
                            }
                       });
               }
         },
         error:function(data){
         }

       });



}


// Common overlay script
$().ready(function (){
    $('#popup_overlay').on('click', function(){
        if($('#recent_view').hasClass('active')){
            if($('.recent_view_group.active').length == 0){
                $('#recent_view').animate({bottom:'-95%'}, 200);
                $('#popup_overlay, #recent_view').removeClass('active');
            }else{
                $('.recent_view_group.active').each(function () {
                if ($(this).hasClass('open')) {
                        recently_viewed_drawer_cl.closeDrawer('','close_rec_pop');
                    }
                });
                $('#recent_view').animate({bottom:'-95%'}, 200);
                $('#popup_overlay, #recent_view').removeClass('active');
            }
            if($('#mini_cart').hasClass('active')){
                $('#popup_overlay').addClass('active');
            }
        }else if($('#mini_cart').hasClass('active')){
            $('.close_mini_cart').trigger('click');
            if($('#recent_view').hasClass('active')){
                $('#popup_overlay').addClass('active');
            }
        }else if($('.header_right').hasClass('active')){
			$('.header_right').removeClass('active').animate({right:'-380px'}, 300);
			$('#popup_overlay').removeClass('active');
		}else{
            $('.popup_box').fadeOut(300, function(){
                $('#popup_overlay').removeClass('active');
           });
        }
    });
	// Script for Account drawer opening
	$('.acc_mob_icon').on('click', function(){
		$('#popup_overlay').addClass('active');
		$('.header_right').addClass('active').animate({right:0}, 300);
	});

	// Close my account drawer on inner links close for other popup to work on
	$(document).on('click', '.trackorder_link', function(){
		$('.header_right').removeClass('active').animate({right:'-380px'}, 300);
		$('#popup_overlay').removeClass('active');
	});
	$(document).on('click', '.loggingin_link', function(){
		$('.header_right').removeClass('active').animate({right:'-380px'}, 300);
	});
	$(document).on('click', '.regst_link', function(){
		$('.header_right').removeClass('active').animate({right:'-380px'}, 300);
	});



    $(window).resize(function(){
        if($('.h_scroll').length > 0){
            h_scroll_reinitialise();
        }
        if($('.v_scroll').length > 0){
            v_scroll_reinitialize()
        }
        //--- IMP when recent view footer is visible [just uncommet]
        /* if($('#recent_view').length > 0){
            r_inner_height = $('#recent_view').height() - 90;
            $('#recent_view_inner').css('height',r_inner_height+'px');
        } */
        if($('.r_view_group_drawer_scroller .jspPane').length > 0){
            d_sc_el = $('.r_view_group_drawer_scroller .jspPane');
            drawer_width = $('.r_view_group_drawer_scroller').width();
            sing_drawer_width = $('.r_view_group_drawer_scroller li').width() + 24;
            full_drawer_width = sing_drawer_width * $('.r_view_group_drawer_scroller li').length;
            drawer_rem = full_drawer_width - drawer_width;
            drawer_rem_left = full_drawer_width - drawer_width;
        }
        if($('#mini_cart').length > 0){
            mcart_height = $(window).height() - 210;
            $('.minicart_tab_panel').css('height',mcart_height+'px');
        }
        if($(window).width() >= 980){
            $('#megamenu').css({'left':'0'});
            $('#white_overlay').removeClass('active');
        }else{
            $('#megamenu').css({'left':'-96%'});
        }



    });
});
$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        $('#popup_overlay').trigger('click');
    }
});

// Script for header fix
function header_fix(){
    win_width = $(window).width();
    if(win_width <= 980 && $(window).scrollTop() >= $('.topbar').height()){
            $('.header').addClass('fix_header');
    }else{
            $('.header').removeClass('fix_header');
    }
}

$(document).ready(function(){
	$.fn.mobileFix = function (options) {
    var $parent = $(this),
    $fixedElements = $(options.fixedElements);

    $(document)
    .on('focus', options.inputElements, function(e) {
        $parent.addClass(options.addClass);
    })
    .on('blur', options.inputElements, function(e) {
        $parent.removeClass(options.addClass);

        // Fix for some scenarios where you need to start scrolling
        setTimeout(function() {
            $(document).scrollTop($(document).scrollTop())
        }, 1);
    });

    return this; // Allowing chaining
};

// Only on touch devices
if (Modernizr.touch) {
    $("body").mobileFix({ // Pass parent to apply to
        inputElements: "input,textarea,select", // Pass activation child elements
        addClass: "fixfixed" // Pass class name
    });
}
});

$(document).ready(function(){
	 if (window.location.hash && $(window.location.hash).length > 0) {

        var hash = window.location.hash;
        setTimeout(function () {
            $('html, body').scrollTop(0).show();
            var objScrollTop = {};
            if (hash == '#free_shipping')
            {
               objScrollTop['scrollTop'] = $('#faq_need_help').offset().top - $('#menu_wrapper ul').height()-40;
            }
            else
            {
                objScrollTop['scrollTop'] = $(window.location.hash).offset().top - 50;
            }
            $('html, body').animate(objScrollTop, 2000, 'easeInOutQuad');
        }, 2); 
    }

	spec_arr_visibility();
	/*var $li_w = 0;
    var $ul_w = $(".menu_wrapper ul").width();

    $( ".menu_wrapper ul li" ).each(function( index ) {
        $li_w += $(this).innerWidth();
    });

    var li_margin = Math.floor((($ul_w-$li_w)/8) / 2);
   	$(".menu_wrapper ul li, .menu_wrapper ul li a").not(".menu_wrapper ul li:first-child, .menu_wrapper ul li:first-child a").css("margin-left",li_margin);
	$(".menu_wrapper ul li:last-child, .menu_wrapper ul li:last-child a").css("margin-left",li_margin-1);
*/
});
$(window).load(function(){
	//if($(window).width() >= 980){
		//navResizer();
	//}
});
$(window).resize(function () {
	//if($(window).width() >= 980){
		//navResizer();
	//}
	spec_arr_visibility();
});


/*function navResizer() {
    var $li_w = 0;
    var $ul_w = $(".menu_wrapper ul").width();

    $( ".menu_wrapper ul li" ).each(function( index ) {
        $li_w += $(this).find('a').innerWidth();
    });

    var li_margin = Math.floor((($ul_w-$li_w)/8) / 2);
   	$(".menu_wrapper ul li, .menu_wrapper ul li a").not(".menu_wrapper ul li:first-child, .menu_wrapper ul li:first-child a").css("margin-left",li_margin);
	$(".menu_wrapper ul li:last-child, .menu_wrapper ul li:last-child a").css("margin-left",li_margin-1);

}*/

function spec_arr_visibility(){
	var s_tab_width = 0;
	$('.other_details_header_inner a').each(function(){
		s_tab_width += $(this).width() + parseInt($(this).css('margin-right'));
	});
	if($('.other_details_header_inner').width() > s_tab_width){
		$('.scroll_d_tab_left, .scroll_d_tab_right').addClass('invisible');
	}else{
		if(parseInt($('.other_details_header_inner').css('margin-left')) < 0){
			$('.scroll_d_tab_left').removeClass('invisible');
			$('.scroll_d_tab_right').addClass('invisible');
		}else{
			$('.scroll_d_tab_left').addClass('invisible');
			$('.scroll_d_tab_right').removeClass('invisible');
		}
	}
}

function v_scroll_reinitialize() {
        setTimeout(function () {
            $('.v_scroll').each(function () {
                $(this).jScrollPane().data('jsp').reinitialise();
            });
        }, 200);
}

function h_scroll_reinitialize() {
        setTimeout(function () {
            $('.h_scroll').each(function () {
                $(this).jScrollPane().data('jsp').reinitialise();
            });
        }, 200);
}
// search box enhancements
$(document).ready(function () {

    function checkCollide(target, parent) {
        
        var $target = target, $parent = parent;

        parentLeftOffset = $parent.offset().left;
        targetLeftOffset = $target.offset().left;
        var winWidth = $(window).width();
        targetRightOffset = (winWidth - (targetLeftOffset + $target.outerWidth(true)));
        parentRightOffset = (winWidth - (parentLeftOffset + $parent.outerWidth(true)));


        if (targetRightOffset < 0 && !$target.hasClass('positionLeft')) {
            var left = $target.position().left;
            $target.addClass('positionRight');
        }
        else
        {
            target.addClass('positionLeft');
        }
        if (targetLeftOffset < parentLeftOffset) {
            var left = $target.position().left;
            var finalLeft = left + (parentLeftOffset - targetLeftOffset) + 20;
            $target.css('left', finalLeft);
        }
    }

    window.limit = 0;
    var hoverTimeout;
    $('.color_options_details').each(function () {
        $(this).removeAttr('style');
    });
    $(document).on('mouseover', '.color_options', function () {
        $(this).find("img.lazy").each(function () {
            $(this).attr('src', $(this).attr('data-src')).removeClass('lazy');
        });
//        $(this).find('.color_options_details,.arrow').show();
        clearTimeout(hoverTimeout);
        $('.color_options_details,.arrow').removeClass('displayBlock');
        $(this).find('.color_options_details,.arrow').addClass('displayBlock');
        var target = $(this).find('.color_options_details');
        var parent = $('.clip_grid,.selection_grid_wrapper,.clip_grid_wrapper');
        var hoverSlider = $(this).find('.productSlider');
          target.removeAttr('style');
        if (!$(this).find('.productSlider').hasClass('vertical'))
        {
            checkCollide(target, parent);
        }

        window.limit++;
        if (window.limit == 1 && !$(this).hasClass('hovered'))
        {

            $(this).addClass('hovered');
            bindSlider(hoverSlider);
        }


    });

    $('.color_options_details').each(function () {
        $(this).removeAttr('style');
    });
    
    //IE8 issue fix
    if (document.addEventListener) {
        document.addEventListener('click scroll', function (e) {
            window.limit = 0;
        }, true);
    } else if (document.attachEvent) {
        window.attachEvent('onclick onscroll', function (e) {
            window.limit = 0;
        });
    }
    
    $(window).scroll(function () {
        window.limit = 0;
        $('.color_options_details').each(function () {
            $(this).removeAttr('style');
        });
    });



//    bindSlider();
    $(document).on('mouseout', '.color_options', function () {
//        $(this).find('.color_options_details,.arrow').delay(200).fadeOut();
        var $self = $(this).find('.color_options_details,.arrow');
        hoverTimeout = setTimeout(function () {

            $self.removeClass('displayBlock');
        }, 500);
        window.limit = 0;
    });

    $(document).on('mouseover', '.clip_box', function () {
        if ($(this).find('.color_options').length > 0) {
            $(this).find('.hoverStrip').css({bottom: 0, opacity: 1});
            $(this).find('.addToWishlist').css({bottom: 0, opacity: 1});
            $(this).find("img.lazy").each(function () {
                $(this).attr('src', $(this).attr('data-src')).removeClass('lazy');
            });
        }
        else {
            $(this).find('.addToWishlist').css({bottom: 0, opacity: 1});
            $(this).find('.hoverStrip').css({bottom: 0, opacity: 1});
        }
    });

    $(document).on('mouseout', '.clip_box', function () {
        if ($(this).find('.color_options').length > 0) {
            $(this).find('.hoverStrip').css({bottom: 0, opacity: 1});
            $(this).find('.addToWishlist').css({bottom: -10, opacity: 0});
        }
        else {
            $(this).find('.addToWishlist').css({bottom: -10, opacity: 0});
            $(this).find('.hoverStrip').css({bottom: -10, opacity: 0});
        }
    });

    $('.clip_box').each(function () {
        if ($(this).find('.color_options').length > 0) {
            $(this).find('.hoverStrip').css({bottom: 0, opacity: 1});
        }
    });
    function isFloat(x) {
        return !!(x % 1);
    }

    //Product Slider
    function productSliderVertical(id, productCol, shiftBy) {
        var $this = id;
        var i = 0;
        var $slider = $this,
                $product = $slider.find(productCol),
                slidingSpan = parseInt($product.outerHeight(true) * shiftBy),
                sliderHeight = $product.length * $product.outerHeight(true),
                totalShifts = sliderHeight / slidingSpan,
                lastShiftHeight = sliderHeight % slidingSpan,
                actualCompleteShift = Math.floor(totalShifts),
                $next = $this.parent().siblings('.nextProduct'),
                $prev = $this.parent().siblings('.prevProduct');
        $slider.height(sliderHeight - 15);
        $this.parent().css('maxHeight', slidingSpan);
        if (shiftBy < $product.length)
        {
            $next.show();
        }

        $next.on('click', function () {
            i++;

            if (i == (actualCompleteShift - 1) && isFloat(totalShifts) == false)
            {
                $(this).hide();
            }
            if (i < actualCompleteShift)
            {
                $slider.stop().animate({marginTop: -slidingSpan * i});
                $prev.show();
            }
            else
            {
                var currentMargin = parseInt($slider.css('marginTop')),
                        shift = currentMargin + -lastShiftHeight;
                $slider.stop().animate({marginTop: shift});
                $(this).hide();
                $prev.show();
            }
        });
        $prev.on('click', function () {
            i--;
            $next.show();
            if (i < actualCompleteShift)
            {
                $slider.stop().animate({marginTop: -slidingSpan * i});
                if (i == 0) {
                    $(this).hide();

                }
            }
            else
            {
                var currentMargin = parseInt($slider.css('marginTop')),
                        shift = currentMargin + -lastShiftHeight;
                $slider.stop().animate({marginTop: shift});
                $(this).hide();

            }
        });
    }

    function productSlider(id, productCol, shiftBy) {

        var $this = id;
        var i = 0;
        var $slider = $this,
                $product = $slider.find(productCol),
                slidingSpan = parseInt($product.outerWidth(true) * shiftBy),
                sliderWidth = $product.length * $product.outerWidth(true),
                totalShifts = sliderWidth / slidingSpan,
                lastShiftWidth = sliderWidth % slidingSpan,
                actualCompleteShift = Math.floor(totalShifts),
                $next = $this.parent().siblings('.nextProduct'),
                $prev = $this.parent().siblings('.prevProduct');

        $slider.width(sliderWidth);
        if (shiftBy < $product.length)
        {
            $next.show();
        }

        $next.on('click', function () {
            i++;
            if (i == (actualCompleteShift - 1) && isFloat(totalShifts) == false)
            {
                $(this).hide();
            }
            if (i < actualCompleteShift) {
                $slider.animate({marginLeft: -slidingSpan * i});
                $prev.show();

            }
            else {
                var currentMargin = parseInt($slider.css('marginLeft')),
                        shift = currentMargin + -lastShiftWidth;
                $slider.animate({marginLeft: shift});
                $(this).hide();
                $prev.show();
            }
        });

        $prev.on('click', function () {
            i--;
            $next.show();
            if (i < actualCompleteShift) {
                $slider.animate({marginLeft: -slidingSpan * i});
                if (i == 0) {
                    $(this).hide();
                }
            } else {
                var currentMargin = parseInt($slider.css('marginLeft')),
                        shift = currentMargin + -lastShiftWidth;
                $slider.animate({marginLeft: shift});
                $(this).hide();
            }
        });
    }

    function bindSlider(ele) {

        if (ele.hasClass('vertical')) {

            ele.each(function () {
                var children = ele.children('.color_product').length;
                if (children == 2 || children == 1) {
                    ele.closest('.color_options_details').css('padding', '15px');
                }

                if (children > 3) {
                    productSliderVertical(ele, '.color_product', 3);
                }
            });
        }
        else
        {

            ele.not('.infiniteProductScroll').each(function () {
                var children = ele.children('.color_product').length;
                if (children == 1) {
                    ele.css('margin', '0 auto');
                }
                productSlider(ele, '.color_product', 3);

            });
        }
    }
        
    $('#search').on('blur',function(){
        if($(this).val()!= '')
        {
            $(this).addClass('focused');
        }
        if($(this).val()== '')
        {
            $(this).removeClass('focused');
        }
    });
    $('#search').on('keyup',function(event){
        var $this = $(this),
        val = $this.val();
        if(val != '')
        {
            $this.parent().find('.clearTextBox').css('visibility','visible');
        }
        else
        {
            $this.parent().find('.clearTextBox').css('visibility','hidden');
            
        }
       
        var search_text_lenght = val.length;
        if(search_text_lenght>2){
            $( "#searchButton" ).removeClass( "search_box_disable" );
            $( "#searchButton" ).addClass( "search_box_enable" );
        }
    });
    $('.clearTextBox').on('click',function () {
        $(this).parent().parent().find('input').val('');
        $(this).css('visibility','hidden');
        $( "#searchButton" ).removeClass( "search_box_enable" );
        $( "#searchButton" ).addClass( "search_box_disable" );
        $('#search').focus();
    });
    $('#searchButton').click(function(){
        if ($('#search').val().length > 1) {
            $('#search_mini_form').submit();
        }
    });
});

/**
 * offer price update
 */
 function updateOfferPrice(item_total,discount){
    var offer_price = parseInt(item_total - discount);
    jQuery("#offer_price").attr("data-offer-price",offer_price);
    jQuery("#offer_price .p_right").html("<strong>Rs. "+addSeparatorsNF(offer_price,'.','.',',')+"<strong>");        
 }

function mousePosition(el,node)
    {   
        var elOffsetLeft = el.offset().left;  
        var elOffsetTop =  el.offset().top;  
        var elWidth = el.outerWidth(true);
        var elHeight = el.outerHeight(true);
        var elHalfWidth = elWidth/2;

        var wrapperDiv = $('#track_your_order_wrap');
        var tooltipDiv = $('#track-order-tooltip');
        var tooltipDivHeight = tooltipDiv.outerWidth(true);
        var toopTipBottomOffset = tooltipDiv.offset().top+tooltipDiv.outerHeight(true);
        var wrapperBottomOffset = wrapperDiv.offset().top+wrapperDiv.outerHeight(true);
        if(el.hasClass('first'))
        {
            $('.tyo_hover_details').css('marginLeft',-49);
        }
        else if(el.hasClass('last'))
        {
            $('.tyo_hover_details').css('marginLeft',-288);
        }
        else
        {
           $('.tyo_hover_details').css('marginLeft',-165); 
        }
    
        $(node).offset({
            left:elOffsetLeft+elHalfWidth,
            top:elOffsetTop+elHeight
        });

    }

    $(document).on('mouseenter','.bottom_timeline_content a',function() {
        $('.tyo_strip_'+$(this).attr('data-tip')).show();
        var $obj = $(this);
        var $node = '.tyo_strip_'+$(this).attr('data-tip');
        mousePosition($obj,$node);
    });
    
    $(document).on('mouseleave','.bottom_timeline_content a',function() {
        $('.tyo_strip_'+$(this).attr('data-tip')).hide();    
    }); 
                            
    $(function () {

       /*$('.track_item_link').on('click', function () {
            $(this).parent().find('.tyo_popup_box').toggle();
            $('#white_overlay').toggleClass('active');
        });*/
        $(document).on('click','.popup_close', function () {
            $('.tyo_popup_box').hide();
            $('#white_overlay').removeClass('active');
        });
    });
    
    $(document).on('keydown', function (e) {
        if (e.keyCode === 27) { // ESC
            $('.tyo_popup_box').hide();
            $('#white_overlay').removeClass('active');
        }

    });
    
function track_order(orderid,productid,page,node){
	var path = root_url+'/customer_trackOrder/trackItem/'+orderid+'/'+productid+'/'+page;
	$('.tyo_popup_box').hide();
	$.ajax({ 
	    url: path,
	    success: function(data){
		if(data){
			$('.node_'+node).find('.tyo_popup_box').html(data).show();
            		$('#white_overlay').toggleClass('active');
        	}
    	    }
	});
}
/**
 * updating row discount
 */
 function updateRowDiscount(items_discount_json){
 	var itemDiscountObj = jQuery.parseJSON(items_discount_json);
    $.each(itemDiscountObj,function(key,val){
        var base_price = parseInt($("#cartitem_"+key).find("#base_price").attr("data-rowtotal"));
        val = parseFloat(val);
        if(val == 0){ 
        	if($("#cartitem_"+key).find('.coupon_discount_amount').is(":visible")){
	        	$("#cartitem_"+key).find('.coupon_discount_amount').hide();
	        	$('#cartitem_'+key+' #discounted_price span').html('');
	        	$('#cartitem_'+key+' #saved_amount .saved_price').html('');
	     		$("#cartitem_"+key).find("#base_price").addClass('new_price p_left');
    			$("#cartitem_"+key).find("#base_price").removeClass('old_price grey_text');
	        }
        	return true;
        }
        if(!($("#cartitem_"+key).find('.coupon_discount_amount').is(":visible"))) $("#cartitem_"+key).find('.coupon_discount_amount').show();
        $('#cartitem_'+key+' #discounted_price span').html("Rs. "+addSeparatorsNF(base_price - val,'.','.',','));
        $('#cartitem_'+key+' #saved_amount .saved_price').html("Rs. "+addSeparatorsNF(val,'.','.',',')+" Saved!");
    	$("#cartitem_"+key).find("#base_price").removeClass('new_price p_left');
    	$("#cartitem_"+key).find("#base_price").addClass('old_price grey_text');
    });
 }

    /**
     *@description Ajax call to get city, state and loclaity to prefill the form
     *@param int data pincode entered by user
     *@param string cityId id name of city field
     *@param string regionId id name of region field 
     */
    function pincodeDetailsAutoComplete(data, cityId, regionId){
            $.ajax({
                    url:root_url+'/config_pincode/getpindata',
                    data:data,
                    type:'post',
                    dataType:"json",
                    success:function(data){
                        if(data){
	                        data = jQuery.parseJSON(data);
	                        $("#"+cityId+".city_common").val(data.city);
	                        $('#'+regionId+'.region_common option[value="'+data.state+'"]').prop('selected', true);
	                        var locality = $.parseJSON(data.locality);
	                        if(cityId == 'bill_city'){
	                        	$("#bill_street1").autocomplete({source: locality,appendTo:".bill_locality_li"});
	                        }else{
                        		$(".locality_common").autocomplete({source: locality,appendTo:".locality_li"});
	                        }
	                        //for perfect autocomplete, it will search string that starts with typed character
	                        $.ui.autocomplete.filter = function (array, term) {
						        var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
						        return $.grep(array, function (value) {
						            return matcher.test(value.label || value.value || value);
						        });
						    };
                        }else{
                        	if(cityId == 'bill_city'){
                        		$(".bill_locality_li .ui-autocomplete,.bill_locality_li ui-helper-hidden-accessible").remove();
                        	}else{
                        		$(".locality_li .ui-autocomplete,.locality_li .ui-helper-hidden-accessible").remove();
                        	}
                        	$("#"+cityId+".city_common").val("");
                        	$('#'+regionId+'.region_common option[value=" "]').prop('selected', true);
                        }
                    },
                    error:function(data){
                    }
            });
    }

    /**
     * pincode verification on key up
     */
    function postCodeCheck(){
        jQuery('.postcode_common').keyup(function(e){
            var post_code = jQuery(this).val();
            if(post_code.length == 6 && last_verified_pin != post_code){
                last_verified_pin = post_code;
                if(jQuery(this).parents('#shipping_address_form').length){
                	check_assembly_pincode();
            	}
                var id = e.target.id; // getting id of currnet postcode field
                pinFormComplete(post_code,id);
            	
            	e.preventDefault();
            }
        });

        jQuery('.bill_postcode_common').keyup(function(e){
        	var post_code = jQuery(this).val();
            if(post_code.length == 6 && last_bill_pin != post_code){
                last_bill_pin = post_code;
                var id = e.target.id;
                pinFormComplete(post_code,id);
            	e.preventDefault();
            }
        });
    }

    /**
     *	@descriptino Validate form for autocomplete request
     *	@params int postcode pincode value enter by user in pincode field
     *	@id string id of pincode field
     */
    function pinFormComplete(postcode,id){
        var cityId      = "";
        var regionId    = "";
        var country     = "";

        /* check for city and region field id with respect to id provided in params */
        if(id.indexOf("bill_") > -1)
        {
            cityId   = "bill_city";
            regionId = "bill_region_select";
            country  = $("#bill_country_id").val();
        }
        else
        {
            if($("#city").length > 0)
            {
                cityId   = "city";
            }
            else
            {
                cityId  = "city_txtbox";
            }
            regionId = "region_select";
            country  = $("#country_id").val();
        }
        
        if(country == "IN")
        {             
                var data = new Array();
                if(typeof postcode != "undefined" && postcode != 0)
                {
                    data = {"pincode":postcode};
                	pincodeDetailsAutoComplete(data, cityId, regionId);   //autocomplete pincode details
                }             
     	}
    }


function showSecondImage(imgObj){
    var secondImg = $(imgObj).attr("data-second-image");
    $(imgObj).attr("src",secondImg);
    
}

function showFirstImage(imgObj){
    var firstImg = $(imgObj).attr("data-first-image");
    $(imgObj).attr("src",firstImg);
}


 //empty row discount on canceling the coupon
 function removeRowDiscount(){
 	$('.coupon_discount_amount .new_price').empty();
 }
