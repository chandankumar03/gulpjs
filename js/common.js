/* 
 
 Pepperfry Common Library
 
 Target:        All platforms
 Version:   0.1alpha
 Date:      Aug 21 2015
 
 */

/* Known bugs 
 
 
 */


/* TO DO
 
 1) Migrate jQuery dependencies to Zepto, to be mobile device friendly
 
 */

/* Machine configuration */


/* System variables */

/* global function holder*/

var global_function = {
    scrollDefaults: {cursorcolor: "#c7c7c7", cursorwidth: "7px", cursorborderradius: "8px"},
    selectDefaults: {allowClear: true, width: "100%", matcher: function (term, text) {
            var terms = term.split(" ");
            for (var i = 0; i < terms.length; i++) {
                var tester = new RegExp("^" + terms[i], 'i');
                if (tester.test(text) == false) {
                    return (text === 'Other')
                }
            }
            return true;
        },
        sortResults: function (results) {
            if (results.length > 1) {
                results.pop();
            }
            return results;

        }},
    selectDefaultsWS: {allowClear: true, minimumResultsForSearch: -1},
    responsiveWidth: {mqMedium: "768px", mqMediumLandscape: "1024px", mqLargeLandscape: "1169px", mqLarge: "1170px", mqLargeHD: "1857px"},
    buildModal: function (onOpen, onClose) {
        var modal, $this;
        var overlay = '<div id="popup_overlay" class="popup_overlay" style="display:none;"></div>';
        $('body').prepend(overlay);
        $('.popup_overlay').each(function (i) {
            var ids = $(this);
            if (ids.length > 1)
                $('.popup_overlay:gt(0)').remove();
        });
        $(document).on('click', '[data-modal]', function (e) {
            $this = $(this);
            modal = $this.data('modal');

            if ($('body').find('[data-modalname=' + modal + ']').length > 0)
            {
                $('.popup_overlay').fadeIn(function () {

                    if (typeof onOpen === 'function')
                    {
                        onOpen.call($this);
                    }

                    $('[data-modalname=' + modal + ']').fadeIn();
                    $('body').addClass('active');
                });
            }
            else
            {
                console.log("Modal not found!");
            }

            e.preventDefault();
        });
        $(document).on('click', '.popup-close,.popup_overlay', function (e) {

            $('[data-modalname=' + modal + ']').fadeOut(function () {
                $('.popup_overlay').fadeOut();
                $('body').removeClass('active');
                if (typeof onClose === 'function')
                {
                    onClose();
                }
            });
            e.preventDefault();
        });
        
        $(document).keyup(function (e) {

            if (e.keyCode == 27)
            {
                $('[data-modalname=' + modal + ']').fadeOut(function () {
                    $('.popup_overlay').fadeOut();
                    $('body').removeClass('active');
                    if (typeof onClose === 'function')
                    {
                        onClose();
                    }
                });
            }

        });

    },
    sliderVertical: function (id, productCol, shiftBy, nextClass, prevClass, visible) {
        var $this = $(id);
        var i = 0, j = 0;
        var $slider = $this,
                $product = $slider.find(productCol),
                slidingSpan = parseInt($product.outerHeight(true) * shiftBy),
                sliderHeight = $product.length * $product.outerHeight(true),
                totalShifts = sliderHeight / slidingSpan,
                lastShiftHeight = sliderHeight % slidingSpan,
                actualCompleteShift = Math.floor(totalShifts),
                $next = $(nextClass),
                $prev = $(prevClass),
                limit = parseInt($product.length - visible);
        $slider.height(sliderHeight);
        $prev.addClass('inactive');
        $product.eq(0).addClass('active');
        if (shiftBy < $product.length)
        {
            $next.show();

        }
        function isFloat(x) {
            return !!(x % 1);
        }

        if ($product.length > visible)
        {

            $next.show();
            $prev.show();
            $product.off('click').on('click', function (e) {
                e.stopPropagation();
                if ($(this).index() == (visible - 1 + i)) {
                    $next.trigger('click');
                    if (j == limit)
                    {
                        $next.addClass('inactive');
                    }
                } else if ($(this).index() == i) {
                    $prev.trigger('click');
                    if (j == 0)
                    {
                        $prev.addClass('inactive');
                    }
                }

            });
        }
        else
        {
            $next.hide();
            $prev.hide();
            $slider.addClass('no-slider-arrows');
        }
        if (shiftBy == 1)
        {
            var setCount = ($product.length - visible);
            function visbleandshiftntmatched() {
                setCount--;
                if (setCount + 1 == shiftBy)
                {
                    return true;

                }
            }
        }
        $next.off('click').on('click', function (e) {
            e.stopPropagation();
            if (j < limit)
            {
                if (!$(this).hasClass('inactive')) {
                    i++;
                    if (i == (actualCompleteShift - 1) && isFloat(totalShifts) == false || visbleandshiftntmatched() == true)
                    {
                        $(this).addClass('inactive');
                    }
                    if (i < actualCompleteShift)
                    {
                        $slider.stop().animate({marginTop: -slidingSpan * i});
                        $prev.removeClass('inactive');
                    }
                    else
                    {
                        var currentMargin = parseInt($slider.css('marginTop')),
                                shift = currentMargin + -lastShiftHeight;
                        $slider.stop().animate({marginTop: shift});
                        $(this).addClass('inactive');
                        $prev.removeClass('inactive');
                    }
                }

                j++;
                if (j == limit)
                {
                    $(this).addClass('inactive');
                }
            }
            return false;
        });

        $prev.off('click').on('click', function (e) {
            e.stopPropagation();
            $next.removeClass('inactive');
            var currentMargin = parseInt($slider.css('marginTop'));
            if (!$(this).hasClass('inactive')) {
                if (j >= 0) {
                    if (!currentMargin <= 0)
                    {
                        i--;
                        if (i < actualCompleteShift)
                        {
                            $slider.stop().animate({marginTop: -slidingSpan * i});
                            if (i == 0) {
                                $(this).addClass('inactive');
                            }
                        }
                        else
                        {
                            var currentMargin = parseInt($slider.css('marginTop')),
                                    shift = currentMargin + -lastShiftHeight;
                            $slider.stop().animate({marginTop: shift});
                            $(this).addClass('inactive');

                        }
                    }
                    j--;
                }
            }
            return false;
        });
    },
    sliderHorizontal: function (id, productCol, shiftBy, nextClass, prevClass, visible) {
         var $this = $(id);
        var i = 0, j = 0;
        var $slider = $this,
                $product = $slider.find(productCol),
                slidingSpan = parseInt($product.outerWidth(true) * shiftBy),
                sliderWidth = $product.length * $product.outerWidth(true),
                totalShifts = sliderWidth / slidingSpan,
                lastShiftWidth = sliderWidth % slidingSpan,
                actualCompleteShift = Math.floor(totalShifts),
                $next = $(nextClass),
                $prev = $(prevClass),
                limit = parseInt($product.length - visible);
        $product.eq(0).addClass('active');
        $slider.width(sliderWidth);
        if (shiftBy < $product.length)
        {
            $next.show();
        }
        function isFloat(x) {
            return !!(x % 1);
        }
        if ($product.length > visible)
        {

            $next.show();
            $prev.show();
            $product.on('click', function () {

                if ($(this).index() == (visible - 1 + i)) {
                    if (!$(this).is(':last-child'))
                    {
                        $next.trigger('click');
                    }
                    if (j == limit || $(this).next().is(':last-child'))
                    {
                        $next.addClass('inactive');
                    }
                } else if ($(this).index() == i) {
                    $prev.trigger('click');

                    if (j == 0)
                    {
                        $prev.addClass('inactive');
                    }
                }
                else
                {
                    $next.removeClass('inactive');
                }

            });

        }
        else
        {
            $next.hide();
            $prev.hide();
            $slider.addClass('no-slider-arrows');
        }
        if (shiftBy == 1)
        {
            var setCount = ($product.length - visible);
            function visbleandshiftntmatched() {
                setCount--;
                if (setCount + 1 == shiftBy)
                {
                    return true;

                }
            }
        }

        $next.on('click', function (e) {
            if (j < limit)
            {
                if (!$(this).hasClass('inactive')) {
                    i++;

                    if (i == (actualCompleteShift - 1) && isFloat(totalShifts) == false || visbleandshiftntmatched() == true)
                    {
                        $(this).addClass('inactive');
                    }
                    if (i < actualCompleteShift) {
                        $slider.animate({marginLeft: -slidingSpan * i});
                        $prev.removeClass('inactive');

                    }
                    else {
                        var currentMargin = parseInt($slider.css('marginLeft')),
                                shift = currentMargin + -lastShiftWidth;
                        $slider.animate({marginLeft: shift});
                        $(this).addClass('inactive');
                        $prev.removeClass('inactive');
                    }
                }
                j++;
                if (j == limit)
                {
                    $(this).addClass('inactive');
                }
            }
        });

        $prev.on('click', function (e) {
            e.stopPropagation();
            $next.removeClass('inactive');
            var currentMargin = parseInt($slider.css('marginLeft'));
            if (!$(this).hasClass('inactive')) {
                setCount++;
                if (!currentMargin <= 0)
                {
                    i--;
                    if (i < actualCompleteShift) {
                        $slider.animate({marginLeft: -slidingSpan * i});
                        if (i == 0) {
                            $(this).addClass('inactive');
                        }
                    } else {
                        var currentMargin = parseInt($slider.css('marginLeft')),
                                shift = currentMargin + -lastShiftWidth;
                        $slider.animate({marginLeft: shift});
                        $(this).addClass('inactive');
                    }
                }
                j--;
            }
        });
    },
    tooltip: function (element, container) {

        var $window = $(window),
                $this = element;
        //var tooltipContent = $this.data('tooltip');
        var tooltipContent = $this.attr('data-tooltip');
        var tooltip = '<div class="pf-tooltip" style="display:none;">' + tooltipContent + '<div class="pf-tooltip-arrow"></div></div>'
       if($(".pf-tooltip").length>0){
           $(".pf-tooltip").remove();
       }
        $('body').prepend(tooltip);
        var $tooltip = $('.pf-tooltip'),
                $container = $(container),
                $tooltipArrow = $('.pf-tooltip .pf-tooltip-arrow'),
                containerOffsetLeft = $container.offset().left,
                containerOffsetRight = containerOffsetLeft + $container.width(),
                thisOffsetLeft = $this.offset().left,
                thisOffsetTop = $this.offset().top,
                thisOffsetBottom = thisOffsetTop + $this.outerHeight(true),
                thisOffsetRight = thisOffsetLeft + $this.outerWidth(true),
                windowTop = $window.scrollTop(),
                arrowPosition;

        var top = thisOffsetTop - $tooltip.outerHeight(true) - 10;
        var left = thisOffsetLeft + ($this.outerWidth() / 2);
        $tooltip.offset({top: top, left: left});
        $tooltip.fadeIn(500);


        var toolthisOffsetTop = $tooltip.position().top,
                tooltipOffsetLeft = $tooltip.position().left,
                tooltipOffsetRight = tooltipOffsetLeft + $tooltip.outerWidth(true);

        if (toolthisOffsetTop < windowTop)
        {

            $tooltip.addClass('pf-tooltip-bottom');
            top = thisOffsetBottom + 10;
            left = left - ($tooltip.outerWidth(true) / 2);
            $tooltip.offset({top: top, left: left});
        }
        if (containerOffsetLeft > tooltipOffsetLeft)
        {

            left = tooltipOffsetLeft + (containerOffsetLeft - tooltipOffsetLeft);
            $tooltip.offset({left: left});
            arrowPosition = tooltipOffsetLeft + $this.outerWidth(true) / 2;
            $tooltipArrow.offset({left: arrowPosition});
        }
        else if (containerOffsetRight < tooltipOffsetRight)
        {

            left = tooltipOffsetLeft - (tooltipOffsetRight - containerOffsetRight);
            $tooltip.offset({left: left});
            arrowPosition = thisOffsetRight - $this.outerWidth(true) / 2;
            $tooltipArrow.offset({left: arrowPosition});
        }

    },
    tooltip_call: function () {
	    /* tooltip code call */
	    $('[data-tooltip]').hover(function () {
	        global_function.tooltip($(this), '#page');
	    }, function () {
	        $('.pf-tooltip').remove();
	    });
    },
    reload_minicart: function () {
      	minicart_delet();
        outOfStock_delet();
        mini_cart_tab();
        evenCSSApply();
        move_to_wishlist();
        undo_wishlist();
        minicart_close();
        form_fild_reset();
        get_height();
        mini_cart_dinamycHeight();
        this.tooltip_call();
    },
    /**
	 * @author: prathamesh.s
	 * @desc: For initializing scroll bars onload and after ajax calls 
	 **/
    mCustomScrollInit: function(_block){
    	setTimeout(function(){ 
        	$("."+_block).mCustomScrollbar();
        }, 500);
    },
    /**
	 * @author: prathamesh.s
	 * @desc: For destorying existing scroll bars before ajax calls
	 **/
    mCustomScrollDestroy: function(_block){
    	$("."+_block).mCustomScrollbar("destroy");
    },

    initNotificationScript: function () {
        //Notification js
        $('.notification_bar .notification').on('click', function () {  
           $('.head-noti-ext-wrap').show();
        });
        $('.head-noti-ext-wrap .head-noti-close').on('click', function () {        
           $('.head-noti-ext-wrap').hide();
        }); 

        $('.review-purchase-wrap .rate input').click(function(){
            if ($(this).val() <= '3') {

                  $(this).parent('.rate').siblings('.review-puchase-reason-wrap').show();
                  //('.review-puchase-pro-ttl-tty').hide();
            } else {
                $(this).parent('.rate').siblings('.review-puchase-reason-wrap').hide();
                //$(this).parents('.review-purchase-wrap').find('.review-puchase-pro-ttl-tty').css('display','inline-block');
                //$(this).parents('.review-purchase-wrap').find('.review-puchase-pro-ttl,.head-noti-ext-wrap .rate').hide();
                saveRating($(this).parents('form').attr('id'));
            } 
        });
        $('.head_Rating_Reason').change(function() {        
            $(this).parent().hide('.review-puchase-reason-wrap');
            //$(this).parents('.review-purchase-wrap').find('.review-puchase-pro-ttl,.head-noti-ext-wrap .rate').hide();
            //$(this).parents('.review-purchase-wrap').find('.review-puchase-pro-ttl-tty').css('display','inline-block');            
            saveRating($(this).parents('form').attr('id'));
        });



        $('.head_Rating_Reason').select2({
           minimumResultsForSearch: Infinity
        });
        /*---End of Notification js---*/
    },
    initialize: function () {
    	
    	$(document).on('keyup blur focus click keydown', function(event) {
            var tabPress = event.keyCode || event.which;
            $('.animate-input').each(function() {
            	var bg_color = $(this).css('background-color');
                if ( bg_color != "rgba(0, 0, 0, 0)" || tabPress == 9) {
                    $(this).parent().addClass('input-filled');
                }
            });
        });


        $('.input-field,textarea').on('focus blur change', function () {
            if ($(this).val() != "")
            {
                $(this).parent('.input-effect').addClass('input-filled');
            }
            else
            {
                $(this).parent('.input-effect').removeClass('input-filled');
            }
        });
        $('.input-field').each(function () {
            if ($(this).val() != "")
            {
                $(this).parent('.input-effect').addClass('input-filled');
            }
            else
            {
                $(this).parent('.input-effect').removeClass('input-filled');
            }
        });

        $('.animate-input').on('focus blur change', function () {
            if ($(this).val() != "")
            {
                $(this).parent().addClass('input-filled');
            }
            else
            {
                $(this).parent().removeClass('input-filled');
            }
        });

        var onOpenModalCallbacks = function ()
        {

            if (this.hasClass('vip-see-3d transition'))
            {
                $('.vip-3d-thumb').trigger('click');
                $('.thumb-slider-prev-arrow').addClass('inactive');
            }
            if (this.data('video') || this.data('demo_video'))
            {
                var videoUrl = this.data('video');
                var demovideoUrl = this.data('demo_video');
                //$('.assembly-video-frame').empty().html(videoUrl);
                $('.assembly-video-frame .tabs-block #tab-1').empty().html(videoUrl);
                $('.assembly-video-frame .tabs-block #tab-2').empty().html(demovideoUrl);
            }
        }
        var onCloseModalCallbacks = function ()
        {

            $('.assembly-video-frame').find('iframe').attr('src', '');
        }
        
        
        global_function.buildModal(onOpenModalCallbacks, onCloseModalCallbacks);
        

        

        $(' .ck-gender-sel').on('click', function() {
    $(' .ck-gender-sel').prop('checked', false);
    $(this).prop('checked', true);
  });

        $('.tyo-normal-login-btn-wrapper .tyo-normal-login-btn').on('click', function(){
    $('.tyo-normal-login-btn-wrapper').hide();
    $('.tyo-normal-login-wrap #login-normal-tyo').show();
});
        
        //$('[data-modal="otp"]').trigger('click'); // this is for demo purpose.
        //OTP Modal Ends here
        global_function.header_scripts();
        /* header sticky menu code start */
        if($('#headerUserArea').length > 0){
        	var previousScroll = 0;
            var $window = $(window);
            var $menu = $('#menu_wrapper');
            var $megaMenu = $('#megamenu');
            var $feStickyBar = $('#fe_header_wrapper');
            var $headerUserArea = $('#headerUserArea');
            if ($headerUserArea.length > 0)
            {
                var headerUserAreaBottom = $headerUserArea.offset().top + $headerUserArea.outerHeight(true);
            }
            if ($menu.length > 0){
                var menuOffsetTop = $menu.offset().top;
                var menuOffsetBottom = $menu.offset().top + $menu.outerHeight(true);
            }

            $('#menu_wrapper,#megamenu').hover(function () {

                if ($(this).hasClass('sticky-menu') && !$(this).hasClass('menu-hovered'))
                {
                    $(this).addClass('menu-hovered');
                }
                else
                {
                    $(this).removeClass('menu-hovered');
                }
            });
            $('#megamenu').hover(function () {

                if ($('#menu_wrapper').hasClass('sticky-menu') && !$('#menu_wrapper').hasClass('menu-hovered'))
                {
                    $('#menu_wrapper').addClass('menu-hovered');
                }
                else {
                    $('#menu_wrapper').removeClass('menu-hovered');
                }

            });
            
            /* header sticky menu code end */
            $(window).scroll(function () {
                /* header sticky menu code start */
                var scrollTop = $(window).scrollTop();
                var currentScroll = $(this).scrollTop();
                if (currentScroll === 0 || !$menu.hasClass('sticky-menu'))
                {
                    $menu.removeAttr('style');
                }

                if ($menu.length > 0 && Modernizr.mq("only screen and (min-width: " + global_function.responsiveWidth.mqMediumLandscape + ")"))
                {
                    if (menuOffsetBottom + 50 < scrollTop)
                    {
                        $menu.parent().height($menu.outerHeight(true));
                        if (currentScroll > previousScroll && !$menu.hasClass('menu-hovered')) {
                            $feStickyBar.css({top: -100}, 100);
                            $menu.css({top: -60}, 100);
                            $megaMenu.hide();
                            $megaMenu.removeClass('sticky-mega-menu');

                        } else {
                            $menu.addClass('sticky-menu');
                            $megaMenu.addClass('sticky-mega-menu');
                            $feStickyBar.css({top: 50}, 100);
                            $menu.css({top: 0}, 100);

                        }
                    }
                    else
                    {
                        $menu.parent().height('auto');
                        $megaMenu.removeClass('sticky-mega-menu');
                        $menu.removeClass('sticky-menu');
                        $feStickyBar.css({top: -100}, 100);
                    }
                    previousScroll = currentScroll;
                }
                else
                {
                    if (headerUserAreaBottom + 50 < scrollTop)
                    {
                        if (currentScroll > previousScroll) {
                            $feStickyBar.css({top: -100}, 100);
                        } else {

                            $feStickyBar.css({top: 0}, 100);
                        }
                    }
                    else
                    {
                        $feStickyBar.css({top: -100}, 100);
                    }
                    previousScroll = currentScroll;
                }

                /* header sticky menu code end */
            });
        }
     },
    setTimeoutConst :0,
    header_scripts: function () {
        var ref_menu, curr_menu_item, menu_hover_delay = 200;

        $(document).keyup(function (e) {
            if (e.keyCode == 27) {
                if ($(".mini_cart").hasClass('active')) {
                    $(".mini_cart").removeClass('active');
                }
                if ($(".acct_links").hasClass('active')) {
                    $(".acct_links").removeClass('active');
                }
                if ($("body").hasClass('active')) {
                    $('body').removeClass('active');
                }
            }
        });
        $(document).on('click', '#popup_overlay', function () {
            if ($(".mini_cart").hasClass('active')) {
                $(".mini_cart").removeClass('active');
            }
            if ($(".acct_links").hasClass('active')) {
                $(".acct_links").removeClass('active');
            }
            if ($("body").hasClass('active')) {
                $('body').removeClass('active');
            }
            //$('#popup_overlay').removeClass('active');
            if ($('#megamenu').is(':visible')) {
                $('#megamenu').animate({left: '-96%'}, 300, function () {
                    $('#megamenu').css('display', 'none');
                    $('.menu_wrapper a').removeClass('active');
                    $('.menu_wrapper').removeClass('active');
                    //enable_scroll();
                });
            } else {
                $('.menu_wrapper a').removeClass('active');
                $('.menu_wrapper').removeClass('active');
                //enable_scroll();
            }
            $("#popup_overlay").fadeOut(200);
        });
        $('.departments_tab').on('click tap', function () {
            $('.menu_wrapper').addClass('active');
            $("#popup_overlay").fadeIn(200);
            $('body').addClass('active');
            //disable_scroll();
        });
        /* Script for Menu hover */
        $('.menu_wrapper a').mouseenter(function () {
            $('.img_search_header .close').click();
            $('.close_notify_expand').click();
            var cur_obj = $(this);
            if ($(window).width() >= 1024) {
               var setTimeoutConst = setTimeout(function () {
                    //$('#slideshow').cycle('pause');
                    curr_menu_item = cur_obj;
                    ref_menu = cur_obj.attr('rel');
                    if ($('#megamenu').is(':hidden')) {
                        $('.megamenu_panel').hide();
                        $('#menuTransOverlay, #' + ref_menu).css('display', 'block');
                        $('.menu_wrapper a').removeClass('active');
                        $('#megamenu').stop(true, true).delay(200).fadeIn(200, function () {
                            curr_menu_item.addClass('active');
                        });
                    } else {
                        $('.megamenu_panel').not('#' + ref_menu).fadeOut(200);
                        $('.menu_wrapper a').removeClass('active');
                        $('#' + ref_menu).stop(true, true).delay(200).fadeIn(200, function () {
                            curr_menu_item.addClass('active');
                        });
                    }
                }, 300)};            
        }).mouseleave(function() {
            if(typeof setTimeoutConst !== 'undefined'){
                clearTimeout(setTimeoutConst);
            }
        });

        

        $('#menuTransOverlay, #headerUserArea').on('mouseover', function () {
            if ($(window).width() >= 1024) {
                $('#megamenu').stop(true, true).delay(200).fadeOut(200, function () {
                    $('.megamenu_panel').hide();
                });
                $('#menuTransOverlay').hide();
                $('.menu_wrapper a').removeClass('active');

            }
        });
        // Script for preventing megamenu in touch devices
        $('.menu_wrapper a.level-top').on('click tap', function (e) {
            curr_menu_item = $(this);
            ref_menu = $(this).attr('rel');
            if ($('#' + $(this).attr('rel')).is(':visible')) {
                return true;
            } else {
                $('.megamenu_panel').hide();
                $('.menu_wrapper a').removeClass('active');
                $(this).addClass('active');
                $('#menuTransOverlay, #' + ref_menu).css('display', 'block');
                $('#megamenu').css('display', 'block').animate({left: 0}, 300);
                return false;
            }
        });
    }

};
$(function () {
    global_function.initialize();
});
//    Checkout Login process

$('.home-login-m-forgot-link,.ck-pwd-reset-send-again').on('click', function () {
        $('.home-login-frm-wrap,.home-login-forgot-reseted-wrap').hide();
        $('.home-login-forgot-wrap').show();
    });

    $('.home-login-m-login-link').on('click', function () {
        $('.home-login-forgot-reseted-wrap,.home-login-forgot-wrap,.home-login-reg-wrap').hide();
        $('.home-login-guest-modal,.home-login-frm-wrap').show();
        allInputReset();
    });

    $('.home-login-reg-link').on('click', function () {
        $('.home-login-guest-modal,.home-login-forgot-reseted-wrap,.home-login-forgot-wrap').hide();
        $('.home-login-reg-wrap').show();
    });
    $('.ck-guest-checkbox').on('click', function () {
        if (!$('input#guestCheck').is(':checked')) {

            $('.home-login-reg-pwd-wrap').hide();
            $('.ck-direct-guest-wrap').show();
        } else {
            $('.ck-direct-guest-wrap').hide();
            $('.home-login-reg-pwd-wrap').show();
        }
    });
    //Generic Email Validation function
    function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            return false;
        } else {
            return true;
        }
    }
    ;
//     login form validation
    $('.home-login-frm-wrap .log-email').on('focusout', function () {
        
        verifyLoginEmail();
    });
    $('.home-login-frm-wrap .log-pwd').on('keypress change keyup focus', function () {
        verifyLoginPwd();
    });
    $('#popup_login_form').on('click', function () {
        verifyLoginEmail();
        verifyLoginPwd();
    });
    function verifyLoginEmail() {
        if (IsEmail(($('.home-login-frm-wrap .log-email').val())) === false) {
            $('.home-login-frm-wrap .log-email').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            $('.home-login-frm-wrap .log-email').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    };
    function verifyLoginPwd() {
        if (($('.home-login-frm-wrap .log-pwd').val()) === '') {
            $('.home-login-frm-wrap .log-pwd').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (($('.home-login-frm-wrap .log-pwd').val()).length < 6) {
            $('.home-login-frm-wrap .log-pwd').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        }
        else {
            $('.home-login-frm-wrap .log-pwd').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    };
//Password Reset Form Validation    
    $('#retrive-pwd-btn').on('click', function () {
        verifyResetEmail();
    });

    function verifyResetEmail() {
        if (IsEmail(($('.home-login-forgot-initial-wrap .log-email').val())) === false) {
            $('.home-login-forgot-initial-wrap .log-email').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
            $('.ck-forgot-email-sub-text').hide();
        } else {
            $('.home-login-forgot-initial-wrap .log-email').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
            $('.home-login-frm-wrap,.home-login-forgot-wrap').hide();
//            $('.home-login-forgot-reseted-wrap,.ck-forgot-email-sub-text').show();
        }
    };
//Reg Form vaidation
    $('.home-login-reg-wrap .log-email').on('focusout', function () {
        verifyRegEmail();
    });

    $('.home-login-reg-wrap .log-fname').on('focusout', function () {
        verifyFname();
    });
    $('.home-login-reg-wrap .log-lname').on('focusout', function () {
        verifyLname();
    });
    $('.home-login-reg-wrap .log-mobile').on('focusout', function () {
        verifymobile();
    });
    $('.home-login-reg-wrap #password1').on('focusout', function () {
        verifyPwd1();
    });
    $('.home-login-reg-wrap #password2').on('focusout', function () {
        verifyPwd2();
    });
    $('#formSubmit-popup_reg_form').on('click', function () {
        verifyRegEmail();
        verifyGender();
        verifyFname();
        verifyLname();
        verifymobile();
        verifyPwd1();
        verifyPwd2();
    });
    function verifyRegEmail() {
        if (IsEmail(($('.home-login-reg-wrap .log-email').val())) === false) {
            $('.home-login-reg-wrap .log-email').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            $('.home-login-reg-wrap .log-email').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    };
    function verifyGender() {
        if (!$('.ck-reg-gender input').is(':checked')) {
            $('.ck-reg-gender input').closest('.ck-reg-gender-wrap').addClass('frm-error-wrap');
        } else {
            $('.ck-reg-gender input').closest('.ck-reg-gender-wrap').removeClass('frm-error-wrap');
        }
    };
    function verifyFname() {
        if (($('.home-login-reg-wrap .log-fname').val()) === '') {
            $('.home-login-reg-wrap .log-fname').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            $('.home-login-reg-wrap .log-fname').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    };
    function verifyLname() {
        if (($('.home-login-reg-wrap .log-lname').val()) === '') {
            $('.home-login-reg-wrap .log-lname').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            $('.home-login-reg-wrap .log-lname').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    }
    ;
    function verifymobile() {
        if (($('.home-login-reg-wrap .log-mobile').val()) === '') {
            $('.home-login-reg-wrap .log-mobile').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (isNaN($('.home-login-reg-wrap .log-mobile').val())) {
            $('.home-login-reg-wrap .log-mobile').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (($('.home-login-reg-wrap .log-mobile').val()).length < 10) {
            $('.home-login-reg-wrap .log-mobile').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        }else if (($('.home-login-reg-wrap .log-mobile').val()).length > 10) {
            $('.home-login-reg-wrap .log-mobile').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            $('.home-login-reg-wrap .log-mobile').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    };

    function verifyPwd1() {
        if (($('.home-login-reg-wrap #password1').val()) === '') {
            $('.home-login-reg-wrap #password1').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
//            $('.home-login-reg-wrap #password1').parent('div').removeClass('frm-success-wrap');
        } else if (($('.home-login-reg-wrap #password1').val()).length < 6) {
            $('.home-login-reg-wrap #password1').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
//            $('.home-login-reg-wrap #password1').parent('div').removeClass('frm-success-wrap');
        }
        else {
            $('.home-login-reg-wrap #password1').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
//            $('.home-login-reg-wrap #password1').parent('div').addClass('frm-success-wrap');
        }
    }
    ;
    function verifyPwd2() {

        if (($('.home-login-reg-wrap #password2').val()) === '') {
            $('.home-login-reg-wrap #password2').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');            
        } else if (($('.home-login-reg-wrap #password1').val()).length < 6) {
            $('.home-login-reg-wrap #password2').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (($('.home-login-reg-wrap #password1').val()) !== ($('.home-login-reg-wrap #password2').val())) {
            $('.home-login-reg-wrap #password2').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        }
        else {
            $('.home-login-reg-wrap #password2').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    };
    function allInputReset() {
        $('.home-login-guest-modal input[type=text],.home-login-guest-modal input[type=password],.home-login-reg-wrap input[type=text],.home-login-reg-wrap input[type=radio],.home-login-reg-wrap input[type=number],.home-login-reg-wrap input[type=password]').val('');
        $('.home-login-guest-modal input,.home-login-reg-wrap input').parent('div').removeClass('frm-error-wrap');
        $('.home-login-guest-modal input,.home-login-reg-wrap input').parent('div').removeClass('frm-success-wrap');
        $('.ck-reg-gender input').attr('checked', false).closest('.ck-reg-gender-wrap').removeClass('frm-error-wrap');
    };
//    $('.ck-addr-frm-row .ck-pincode-ip').on('focusout', function () {
//        var frmId = $(this).closest('form').attr('id');        
//        verifyPincode( frmId ); 
//     });

$('#loginPopupLink').on('click', function(){
   $('.home-login-guest-modal').show();
   $('.home-login-reg-wrap').hide();
});
$('#registerPopupLink').on('click', function(){
    $('.home-login-reg-wrap').show();
   $('.home-login-guest-modal').hide();
   
});
$(".login-block-hover").mouseover(function(){
    if ($(".review-notification").length > 0) {
        
    }else {
       
        $(".sub").stop().slideDown("");
    }
});
$(".login-block-hover").mouseout(function(){
    if ($(".review-notification").length > 0) {
        
    }else {
        $(".sub").slideUp("");
    }    
});





//Incrementer & Decrementer
    $('.plussign').click(function (e) {
        e.preventDefault();
        var currentVal = parseInt($(this).siblings('.qty_input').val());
        $(this).siblings('.minussign').removeClass('disabled');
        if (!isNaN(currentVal)) {
            $(this).siblings('.qty_input').val(currentVal + 1);
        } else {
            $(this).siblings('.qty_input').val(0);
        }
    });
    
    $(".minussign").click(function (e) {
        e.preventDefault();
        var currentVal = parseInt($(this).siblings('.qty_input').val());
        if(!isNaN(currentVal) && currentVal === 1) {
            $(this).addClass('disabled');
        }else if (!isNaN(currentVal) && currentVal > 1) {
            $(this).siblings('.qty_input').val(currentVal - 1);
        }
        else {
            
            $(this).siblings('.qty_input').val(1);
        }
    });

var minicart_delet = function() {
    $('.deleteicon').on('click', function(){
        $(this).closest('.item_card_wrapper').slideUp();
        
    });
};
var outOfStock_delet = function() {
    $('.removed_OFS').on('click', function(){
        $(this).closest('.out-of-stock').slideUp();
        $('#cart-renove-panel').show();
    	$( '.toolbar' ).show();
    	setTimeout(function() {
        	$('#cart-renove-panel').hide();
        	if( $( '#mini-usercart .item_card_wrapper' ).length == 0 ) {
        		$( '.toolbar' ).hide();
        	}
        }, 3000);     
    });
};
var move_to_wishlist = function() {
    $('.move-wishlist').off('click').on('click', function(){
    	var _id 	 	= $( this ).attr( 'data-id' );
        var _callFrom 	= $( this ).attr( 'data-pos' );
    	$('#undo_wishlist').attr('data-id',_id).attr('data-pos',_callFrom);
        $(this).closest('.item_card_wrapper').slideUp();
        $('#move-wishlist-panel').show();
        
    	setTimeout(function() {
        	$('#move-wishlist-panel').hide();
        	
        	if(_callFrom == 'minicart'){
        		if($('#cart_'+_id).parent().css('display') == "none"){
        			PF.UTILITIES.addToWishlist(_id);
        			PF.HEADER.deleteProductFromCart($('.move-wishlist[data-id="'+_id+'"]'));
        		}
    		} 
        	else if(_callFrom == 'views'){
        		if($('#recent_'+_id).parent().css('display') == "none"){
        			PF.UTILITIES.addToWishlist(_id);
        			PF.HEADER.deleteRecentlyViewedProduct($('.move-wishlist[data-id="'+_id+'"]'));
        		}
        	}
        }, 1000);
    });
};

var undo_wishlist = function() {
	$('#undo_wishlist').click(function(){
		var _id 	 	= $( this ).attr( 'data-id' );
        var _callFrom 	= $( this ).attr( 'data-pos' );
		
		if(_callFrom == 'minicart'){
			$('#cart_'+_id).parent().show();
		}
		else if(_callFrom == 'views'){
			$('#recent_'+_id).parent().show();
		}
		
		$('#move-wishlist-panel').hide();
			
	});	
};

var mini_cart_tab = function(){
    $('.tabs a').click(function(){
        $('.tabs a').removeClass('active')
        var tab_Class = $(this).attr('class')
         $(this).addClass('active');
        $('.item_holder').hide();
        $('.minicart-wrap').find('#' + tab_Class).show();
        if(tab_Class === 'mini-userwishlist' || tab_Class === 'recently-viewed') {
            $('.minicart_footer').hide();
        }else {
            $('.minicart_footer').show();
        }
    });
};


$('.gridview').click(function(){
    $('.listview').removeClass('selected');
    $(this).addClass('selected');
   $('.item_holder').addClass('grid_blocks'); 
   evenCSSApply();
});
$('.listview').click(function(){
    $('.gridview').removeClass('selected');
    $(this).addClass('selected');
    $('.item_holder').removeClass('grid_blocks'); 
});

var evenCSSApply = function() {
    $( ".grid_blocks .item_card_wrapper:even" ).css( "border-right", "1px solid #ccc");    
}
var minicart_close = function(){
    $('.gb-close, .popup_overlay').on('click', function(){
          $(".mini_cart").removeClass('active');
          $('.mini_cart .tabs a').removeClass('active');
          $('.mini_cart .tabs a:eq(0)').addClass('active');
          $(".popup_overlay").fadeOut(200);
          $('body').removeClass('active');
    });
    $(document).keyup(function(e) {
     if (e.keyCode == 27) {
             $(".mini_cart").removeClass('active');
          $('.mini_cart .tabs a').removeClass('active');
          $('.mini_cart .tabs a:eq(0)').addClass('active');
          $(".popup_overlay").fadeOut(200);
          $('body').removeClass('active');
        }
    });
    
};
 $('.add_req').click(function(){
     $(".mini_cart").removeClass('active');
});
$('.rate input').click(function(){
    if ($('input[name=rate]:checked').length > 0) {
        $('.rate').hide();
        $('.review-text').hide();
        $('.thank-for-review').show();
    }
});

  
$('.departments_tab').on('click', function(){
    $('.menu_wrapper').addClass('active');
    $('body').addClass('active');
    $('.popup_overlay').show();
    left_menu_hide();
});

var left_menu_hide = function(){
    $('.popup_overlay').on('click', function(){ 
     $('.menu_wrapper').removeClass('active');
});    
}
 var form_fild_reset = function(){
        $('.popup-close').on('click', function () {
        //allInputReset();
        $('.animate-input').parent().removeClass('input-filled');
    });
    $('.popup_overlay').on('click', function () {
        //allInputReset();
        $('.animate-input').parent().removeClass('input-filled');
    });
    }
    $('.popup_overlay').click(function(){
        form_fild_reset();
    });
$('.review-notification-close').on('click', function(){
    $('.review-purchase').hide();
});
var ww, wh;
var get_height = function() {
    ww = $(window).width();
    wh = $(window).height();
};

var mini_cart_dinamycHeight = function(){
    var TH = $('.mcart_header').height() + $('.toolbar').height();
    var plusHh = wh - TH;
    
    //var hh = $(wh - $('.mcart_header').height() - $('.toolbar').height());
    var sssss = plusHh - ($('.minicart_footer').height() + 30) ;
    
    $('#mini-usercart').css('height' , sssss + 'px');
    $('#mini-userwishlist').css('height' , plusHh + 'px');
    $('#recently-viewed').css('height' , plusHh + 'px');
    
};
$(document).ready(function () {
	global_function.reload_minicart();
});



/*---Start Form Validation---*/
$(function(){
    //Generic Email Validation function
    function IsEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            return false;
        } else {
            return true;
        }
    };

    function allInputReset() {
        $('.ck-login-guest-modal input[type=text],.ck-login-guest-modal input[type=password],.ck-login-reg-wrap input[type=text],.ck-login-reg-wrap input[type=radio],.ck-login-reg-wrap input[type=number],.ck-login-reg-wrap input[type=password]').val('');
        $('.ck-login-guest-modal input,.ck-login-reg-wrap input').parent('div').removeClass('frm-error-wrap');
        $('.ck-login-guest-modal input,.ck-login-reg-wrap input').parent('div').removeClass('frm-success-wrap');
        $('.ck-reg-gender input').attr('checked', false).closest('.ck-reg-gender-wrap').removeClass('frm-error-wrap');
    };
// validation moved to newheader.js
//    $('.ck-mobile-ip').on('blur', function () {        
//        var frmId = $(this).closest('form').attr('id');
//        verifyMobileNo(frmId);
//    });
    $('.ck-email-ip').on('focusout', function () {
        var frmId = $(this).closest('form').attr('id');
        verifyEmailId(frmId);
    });

    /*$('.ck-password-ip').on('blur', function () {           
        var frmId = $(this).closest('form').attr('id');
        verifyPass1(frmId);
    });*/
    $('#confirmPassword').on('keyup', function () {         
        var frmId = $(this).closest('form').attr('id');
        verifyPass1(frmId);
    });
  
    // Pincode Validation Function
    function verifyMobileNo(frmId) {        
        var mobileIp = $("#" + frmId).find('.ck-mobile-ip');
        var mobileIpVal = mobileIp.val();    
        if (mobileIpVal === '') {
            mobileIp.addClass('error-inpt').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (mobileIpVal.length < 10) {
            mobileIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (mobileIpVal.length > 10) {
            mobileIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        }
        else if (isNaN(mobileIpVal)) {
            mobileIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            mobileIp.removeClass('error-inpt').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    }    
    // FirstName Validation Function
    function verifyFirstname(frmId) {        
        var fnameIp = $("#" + frmId).find('.ck-fname-ip');
        var fnameVal = fnameIp.val();
        if (fnameVal === '') {            
            fnameIp.addClass('error-inpt').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            fnameIp.removeClass('error-inpt').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    }
    // LastName Validation Function
    function verifyLastname(frmId) {        
        var lnameIp = $("#" + frmId).find('.ck-lname-ip');
        var lnameVal = lnameIp.val();
        if (lnameVal === '') {
            lnameIp.addClass('error-inpt').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            lnameIp.removeClass('error-inpt').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    }   
    // Address Validation Function
    function verifyAddr(frmId) {        
        var addrIp = $("#" + frmId).find('.ck-addr-ip');
        var addrIpVal = addrIp.val();
        if (addrIpVal === '') {
            addrIp.addClass('error-inpt').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            addrIp.removeClass('error-inpt').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    }
    // Email Validation Function
    function verifyEmailId(frmId) {         
        var emailIp = $("#" + frmId).find('.ck-email-ip');
        var emailIpVal = emailIp.val(); 
        if (IsEmail(emailIpVal) === false) {
            emailIp.addClass('error-inpt').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            emailIp.removeClass('error-inpt').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    }

    //password validation function    
    function verifyPass1() {
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();
        if (password !== confirmPassword) {
            $('#confirmPassword').addClass('error-inpt').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');          
        }else if (password.length < 6) {
            $('#confirmPassword').addClass('error-inpt').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');                       
        } else{
            $('#confirmPassword').removeClass('error-inpt').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        } 
        
    };
    

    // Pincode 
    $("input[type=number]").keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl/cmd+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: Ctrl/cmd+C
                        (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
                        // Allow: Ctrl/cmd+X
                                (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true)) ||
                                // Allow: home, end, left, right
                                        (e.keyCode >= 35 && e.keyCode <= 39)) {
                            // let it happen, don't do anything
                            return;
                        }
                        // Ensure that it is a number and stop the keypress
                        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                            e.preventDefault();
                        }
    }); 

});
$(document).ready(function(){    
   var lastScrollTop = 0;
   $(window).scroll(function(event){
      var scrollTop = $(window).scrollTop(),
          currentScroll = $(this).scrollTop();
       if(currentScroll > lastScrollTop){
          $('#backToTop').fadeOut(250);
       }else {
           if(scrollTop < 600) {
               $('#backToTop').fadeOut(250);
           }else {
               $('#backToTop').fadeIn(250);
           }          
       }
      lastScrollTop = currentScroll;
   });
   $('#backToTop').on('click tap', function () {
       $('html,body').animate({scrollTop: 0}, 800);
   });
   
   
});

/**
 * @author: prathamesh.s
 * @desc: To save rating from Notifications
 **/
function saveRating(formID){
	var data = $('#'+formID).serialize();
	var _url = root_url + '/customer/saverating';
	var _params = {formID:formID};
    $('#'+_params['formID']+'_rate').addClass('disabled');
	PF.UTILITIES.makeRequest( _url, 'POST', data, handleSaveRatingResponse,saveRatingError, '', _params );
}
function handleSaveRatingResponse(data, _params){
    var data = JSON.parse(data);
	if($('#'+_params['formID']+' .review-puchase-pro-ttl').length > 0){
        $('#'+_params['formID']+' .review-puchase-pro-ttl').hide();
        $('#'+_params['formID']+'_rate').hide();
        //var message = (data.status=='success') ? 'Thank You for your review' : 'Something went wrong, Please try again';
        if(data.status == 'success'){
            var message = 'Thank You for your review';
        }
        else if(data.status == 'submitted'){
            var message = 'You have already submitted the rating';
        }
        else{
            var message = 'Something went wrong, Please try again';
        }
        $('#'+_params['formID']+' .review-puchase-pro-ttl-tty ').find('span').html(message);
        $('#'+_params['formID']+' .review-puchase-pro-ttl-tty').css('display','inline-block');
    }
        
    if(data.status=='success'){
        $(".order-"+data.oid).remove();
        if($(".Product-feedback.pf-white").length<=0){
            $("#no-notifier-found").css("display","block");
        }
    }
}
function saveRatingError(data, _params){
	if($('#'+_params['formID']+' .review-puchase-pro-ttl').length > 0){
		$('#'+_params['formID']+' .review-puchase-pro-ttl,.head-noti-ext-wrap .rate').hide();
	    $('#'+_params['formID']+' .review-puchase-pro-ttl-tty').css('display','inline-block');
	}
}
/** End of code added by prathamesh **/
