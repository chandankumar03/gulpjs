

$(function () {
    //PinCode
    $('#pin_check').click(function () {
        var pincode = $('#pin_code').val();
        if (pincode === '') {
            $('.ck-pin-input-error-wrap').show();
            $(this).parent().addClass('invld-pin');
        } else if (pincode.length < 6) {
            $('.ck-pin-input-error-wrap').show();
            $(this).parent().addClass('invld-pin');
        } else if (pincode.length > 6) {
            $('.ck-pin-input-error-wrap').show();
            $(this).parent().addClass('invld-pin');
        } else if (isNaN(pincode)) {
            $('.ck-pin-input-error-wrap').show();
            $(this).parent().addClass('invld-pin');
        } else {
            $(this).parent().removeClass('invld-pin');
            $('.ck-pin-input-wrap,.ck-pin-input-error-wrap,.ck-sku-delivery-details .ck-sku-dtl-subtxt').hide();
            $('.ck-pin-entered,.ck-sku-assembly-details,.ck-sku-dtl-range-txt').show();
            $('.os-non-del-ext-wrap').show();
        }
    });
    $('#pin_code').keyup(function (event) {
        if (event.keyCode == 13) {
            $("#pin_check").trigger('click');

        }
    })
    $('.ck-pin-entered-edit').click(function () {
        $('#pin_code').val('');
        $('.ck-pin-entered,.ck-pin-input-error-wrap,.ck-sku-assembly-details,.ck-sku-dtl-range-txt').hide();
        $('.os-non-del-ext-wrap').hide();
        $('.ck-pin-input-wrap,.ck-sku-delivery-details .ck-sku-dtl-subtxt').show();
    });
    //CPN code
    $('#cpn_check_btn').click(function () {
        var cpncode = $('#cpn_code_in').val();
        if (cpncode === '') {
            $('.ck-cpn-error-wrap').show();
            $(this).parent().addClass('invld-pin');
        } else {
            $(this).parent().removeClass('invld-pin');
            $('.ck-cpn-input-wrap,.ck-cpn-error-wrap').hide();
            $('.ck-cpn-applied-wrap').show();
        }
    });
    $('#cpn_code_in').keyup(function (event) {
        if (event.keyCode === 13) {
            $("#cpn_check_btn").trigger('click');

        }
    });
    $('.ck-addr-auto-pre-head .ck-bill-modal-link').click(function () {
       $('.ck-bill-addr-frm-wrap').show(); 
    });
    $('.ck-cpn-rmv').click(function () {
        $('#cpn_code_in').val('');
        $('.ck-cpn-applied-wrap,.ck-cpn-error-wrap').hide();
        $('.ck-cpn-input-wrap').show();
    });
    //Item removal code
    $(document).on('click', ".ck-sku-remove-link", function () {
        $(this).closest('.ck-sku-row-wrap .ck-sku-row-content').siblings('.ck-item-rmd-msg-wrap').slideDown('300');
        $(this).closest('.ck-sku-row-wrap .ck-sku-row-content').slideUp('300');
    });

    $(document).on('click', ".ck-item-rmd-undo", function () {
        $(this).closest('.ck-item-rmd-msg-wrap,.ck-item-wl-msg-wrap').hide();
        $(this).closest('.ck-item-rmd-msg-wrap,.ck-item-wl-msg-wrap').siblings('.ck-sku-row-content').slideDown('300');
    });
//item wishlist code
    $(document).on('click', ".ck-sku-add-wl-link", function () {
        $(this).closest('.ck-sku-row-content').siblings('.ck-item-wl-msg-wrap').slideDown('300');
        $(this).closest('.ck-sku-row-wrap .ck-sku-row-content').slideUp('300');
    });
    //Incrementer & Decrementer
    $('.ck-sku-qty-add').click(function (e) {
        e.preventDefault();
        var currentVal = parseInt($(this).siblings('.ck-sku-qty-input').val());
        $(this).siblings('.ck-sku-qty-minus').removeClass('disabled');
        if (!isNaN(currentVal)) {
            $(this).siblings('.ck-sku-qty-input').val(currentVal + 1);
        } else {
            $(this).siblings('.ck-sku-qty-input').val(0);
        }
    });

    $(".ck-sku-qty-minus").click(function (e) {
        e.preventDefault();
        var currentVal = parseInt($(this).siblings('.ck-sku-qty-input').val());
        if (!isNaN(currentVal) && currentVal === 1) {
            $(this).addClass('disabled');
        } else if (!isNaN(currentVal) && currentVal > 1) {
            $(this).siblings('.ck-sku-qty-input').val(currentVal - 1);
        }
        else {

            $(this).siblings('.ck-sku-qty-input').val(1);
        }
    });

//    Notify for oos

    function ValidateEmail(email) {
        var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return expr.test(email);
    }
    ;

    $("#ck_oos_notify_btn").on("click", function () {
        if (ValidateEmail($("#notify_id").val()) && ($('input[name=ckOosCheck]:checked').val() == "grow_tree")) {
            $('.ck-non-del-wrap').slideUp();
            $('.ck-oos-rmd-msg-wrap').slideDown(600);
            $('.notify-input-error-wrap').hide();

        } else {
            $('.ck-oos-email-wrap').addClass('invld-pin');
            $('.notify-input-error-wrap').show();
        }
    });
    $(".ck-non-del-rm-btn").on("click", function () {
        $(this).parents('.os-non-del-ext-wrap').children('.ck-non-del-wrap').hide();
        $(this).parents('.os-non-del-ext-wrap').children('.ck-non-rmd-msg-wrap').slideDown(100);
        $(this).parents('.os-oos-ext-wrap').children('.ck-non-del-wrap').hide();
        $(this).parents('.os-oos-ext-wrap').children('.ck-oos-rmd-msg-wrap').slideDown(100);

    });
    $('#notify_id').keyup(function (event) {
        if (event.keyCode == 13) {
            $("#ck_oos_notify_btn").trigger('click');

        }
    });

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

//                            For Adding new address
    $('.ck-del-addr-add-new').click(function () {
        $('.ck-del-addr-list-wrap').slideUp(100);
        $('.ck-saved-addr-back-wrap').show(200);
        $(this).hide();
        $( '#save_address' ).val( 1 );
        $('.ck-del-addr-add-frm-wrap').slideDown(300);
        $('html, body').animate({
           scrollTop: $(".ck-addr-selection-left-wrap").offset().top
       }, 2000);
    });
//                            For going back to address list
    $('.ck-saved-addr-back-wrap').click(function () {
        $(this).hide();
        $('.ck-del-addr-list-wrap').slideDown(300);
        $('.ck-del-addr-add-new').slideDown(300);
        $('.ck-del-addr-add-frm-wrap,.ck-del-addr-edit-frm-wrap').slideUp(100);
    });
    $('.ck-addr-frm-cancel-btn').click(function () {
        $('.ck-saved-addr-back-wrap').hide();
        $('.ck-del-addr-add-frm-wrap,.ck-del-addr-edit-frm-wrap').slideUp(100);
        $('.ck-del-addr-list-wrap').slideDown(300);
        $('.ck-del-addr-add-new').slideDown(300);

    });
    $('#ckguestEditBill .ck-addr-frm-cancel-btn').click(function () {
        $(this).closest('.popup-box').fadeOut(200);
        $('#popup_overlay,.popup_overlay').hide(100);
        $('body').removeClass('active');
    });



//        bill modal
    $('.ck-bil-addr-slide').click(function () {
        $('.ck-bil-addr-slide').removeClass('selected');
        $(this).addClass('selected');
    });
    $('.ck-bill-addr-add-new').click(function () {
        $('.ck-bil-addr-sel-wrap, .ck-bill-addr-add-new').hide();
        $('.ck-bill-addr-frm-wrap').show();
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

//Change Billing address reset
    $('.ck-bill-change-link').click(function () {
        $('.ck-bil-addr-sel-wrap, .ck-bil-addr-add-new-wrap,.ck-bill-addr-add-new').show();
        $('.ck-bill-addr-frm-wrap,.ck-bill-addr-edit-frm-wrap').hide();
    });

//        Auto Populate Address
    $('#mobile').on('keypress change keyup', function () {

        $('#auto-fn').text($('#firstname').val());
        $('#auto-ln').text($('#lastname').val());
        $('#auto-addr-txt').text($('#street').val());
        $('#auto-area').text($('#area').val());
        $('#auto-landmark').text(',' + ($('#landmark').val()));
        $('#auto-city').text(($('#city').val()) + ' - ');
        $('#auto-pincode').text($('#postcode').val());
        $('#auto-state').text($('#form-state').val());
        $('#auto-country').text($('#country').val());
        $('#auto-mobile').text('Mobile : ' + ($('#mobile').val()));
    });

//    Billing Address selection

    $('.ck-bil-addr-slide').click(function (e) {
        $('.ck-bil-addr-slide').removeClass('selected');
        $(this).addClass('selected');
        $(this).closest('.popup-box').fadeOut(200);
        $('#popup_overlay,.popup_overlay').hide(100);
        $('body').removeClass('active');
        $(".ck-bill-addr-content").html($(this).children(".class-billing-front").html());
        e.stopPropagation();
    });



//    Checkout Login process  
    $('.ck-login-m-forgot-link,.ck-pwd-reset-send-again').on('click', function () {
        $('.ck-login-frm-wrap,.ck-login-forgot-reseted-wrap').hide();
        $('.ck-login-forgot-wrap').show();
    });

    $('.ck-login-m-login-link').on('click', function () {
        $('.ck-login-forgot-reseted-wrap,.ck-login-forgot-wrap,.ck-login-reg-wrap').hide();
        $('.ck-login-guest-modal,.ck-login-frm-wrap').show();
        allInputReset();
    });
    $('.ck-login-reg-link').on('click', function () {
        $('.ck-login-guest-modal,.ck-login-forgot-reseted-wrap,.ck-login-forgot-wrap').hide();
        $('.ck-login-reg-wrap').show();
    });
    $('.ck-guest-checkbox').on('click', function () {
        if (!$('input#guestCheck').is(':checked')) {

            $('.ck-login-reg-pwd-wrap').hide();
            $('.ck-direct-guest-wrap').show();
        } else {
            $('.ck-direct-guest-wrap').hide();
            $('.ck-login-reg-pwd-wrap').show();
        }
    });
    $('.ck-direct-guest-wrap .ck-login-reg-link').on('click', function () {
        $(this).parents('.ck-login-reg-wrap').find('.ck-guest-checkbox').trigger( "click" );
    });
    $('.ck-oos-check-wrap label').on('click', function () {
        if (!$('input#ckOosCheck').is(':checked')) {

            $('.os-oos-ext-wrap .ck-non-del-rm-btn').hide();
            $('.os-oos-ext-wrap .ck-rmv-email-wrap').css('display', 'inline-block');
        } else {
            $('.os-oos-ext-wrap .ck-rmv-email-wrap').hide();
            $('.os-oos-ext-wrap .ck-non-del-rm-btn').css('display', 'inline-block');
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
    }    ;
//     login form validation
    $('.ck-login-frm-wrap .log-email').on('focusout', function () {

        verifyLoginEmail();
    });
    $('.ck-login-frm-wrap .log-pwd').on('keypress change keyup focus', function () {
        verifyLoginPwd();
    });
    $('#popup_login_form').on('click', function () {
        verifyLoginEmail();
        verifyLoginPwd();
    });
    function verifyLoginEmail() {
        if (IsEmail(($('.ck-login-frm-wrap .log-email').val())) === false) {
            $('.ck-login-frm-wrap .log-email').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
//            $('.ck-login-frm-wrap .log-email').parent('div').removeClass('frm-success-wrap');
        } else {
            $('.ck-login-frm-wrap .log-email').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
//            $('.ck-login-frm-wrap .log-email').parent('div').addClass('frm-success-wrap');
        }
    }    ;
    function verifyLoginPwd() {
        if (($('.ck-login-frm-wrap .log-pwd').val()) === '') {
            $('.ck-login-frm-wrap .log-pwd').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (($('.ck-login-frm-wrap .log-pwd').val()).length < 6) {
            $('.ck-login-frm-wrap .log-pwd').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        }
        else {
            $('.ck-login-frm-wrap .log-pwd').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    }    ;
//Password Reset Form Validation    
    $('#retrive-pwd-btn').on('click', function () {
        verifyResetEmail();
    });

    function verifyResetEmail() {
        if (IsEmail(($('.ck-login-forgot-initial-wrap .log-email').val())) === false) {
            $('.ck-login-forgot-initial-wrap .log-email').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
//            $('.ck-login-forgot-initial-wrap .log-email').parent('div').removeClass('frm-success-wrap');
            $('.ck-forgot-email-sub-text').hide();
        } else {
            $('.ck-login-forgot-initial-wrap .log-email').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
//            $('.ck-login-forgot-initial-wrap .log-email').parent('div').addClass('frm-success-wrap');
            $('.ck-login-frm-wrap,.ck-login-forgot-wrap').hide();
            $('.ck-login-forgot-reseted-wrap,.ck-forgot-email-sub-text').show();
        }
    }    ;
//Reg Form vaidation
    $('.ck-login-reg-wrap .log-email').on('focusout', function () {
        verifyRegEmail();
    });

    $('.ck-login-reg-wrap .log-fname').on('focusout', function () {
        verifyFname();
    });
    $('.ck-login-reg-wrap .log-lname').on('focusout', function () {
        verifyLname();
    });
    $('.ck-login-reg-wrap .log-mobile').on('focusout', function () {
        verifymobile();
    });
    $('.ck-login-reg-wrap #password1').on('focusout', function () {
        verifyPwd1();
    });
    $('.ck-login-reg-wrap #password2').on('focusout', function () {
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
        if (IsEmail(($('.ck-login-reg-wrap .log-email').val())) === false) {
            $('.ck-login-reg-wrap .log-email').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            $('.ck-login-reg-wrap .log-email').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    }    ;
    function verifyGender() {
        if (!$('.ck-reg-gender input').is(':checked')) {
            $('.ck-reg-gender input').closest('.ck-reg-gender-wrap').addClass('frm-error-wrap');
        } else {
            $('.ck-reg-gender input').closest('.ck-reg-gender-wrap').removeClass('frm-error-wrap');
        }
    }    ;
    function verifyFname() {
        if (($('.ck-login-reg-wrap .log-fname').val()) === '') {
            $('.ck-login-reg-wrap .log-fname').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            $('.ck-login-reg-wrap .log-fname').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    };
    function verifyLname() {
        if (($('.ck-login-reg-wrap .log-lname').val()) === '') {
            $('.ck-login-reg-wrap .log-lname').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            $('.ck-login-reg-wrap .log-lname').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    };
    function verifymobile() {
        if (($('.ck-login-reg-wrap .log-mobile').val()) === '') {
            $('.ck-login-reg-wrap .log-mobile').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (isNaN($('.ck-login-reg-wrap .log-mobile').val())) {
            $('.ck-login-reg-wrap .log-mobile').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (($('.ck-login-reg-wrap .log-mobile').val()).length < 10) {
            $('.ck-login-reg-wrap .log-mobile').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            $('.ck-login-reg-wrap .log-mobile').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    };

    function verifyPwd1() {
        if (($('.ck-login-reg-wrap #password1').val()) === '') {
            $('.ck-login-reg-wrap #password1').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (($('.ck-login-reg-wrap #password1').val()).length < 6) {
            $('.ck-login-reg-wrap #password1').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        }
        else {
            $('.ck-login-reg-wrap #password1').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    }    ;
    function verifyPwd2() {

        if (($('.ck-login-reg-wrap #password2').val()) === '') {
            $('.ck-login-reg-wrap #password2').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (($('.ck-login-reg-wrap #password1').val()).length < 6) {
            $('.ck-login-reg-wrap #password2').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (($('.ck-login-reg-wrap #password1').val()) !== ($('.ck-login-reg-wrap #password2').val())) {
            console.log('hello');
            $('.ck-login-reg-wrap #password2').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        }
        else {
            $('.ck-login-reg-wrap #password2').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    };
    function allInputReset() {
        $('.ck-login-guest-modal input[type=text],.ck-login-guest-modal input[type=password],.ck-login-reg-wrap input[type=text],.ck-login-reg-wrap input[type=radio],.ck-login-reg-wrap input[type=number],.ck-login-reg-wrap input[type=password]').val('');
        $('.ck-login-guest-modal input,.ck-login-reg-wrap input').parent('div').removeClass('frm-error-wrap');
        $('.ck-login-guest-modal input,.ck-login-reg-wrap input').parent('div').removeClass('frm-success-wrap');
        $('.ck-reg-gender input').attr('checked', false).closest('.ck-reg-gender-wrap').removeClass('frm-error-wrap');
    };
    
// Google chrome extension snap scrip

$('.oc-del-chrome-extn-wrap .oc-del-extn-link').on('click', function () {
    $('.oc-del-chrome-extn-txt').hide();
    $('.oc-del-chrome-extn-snap').slideDown(300);
});

//Order Confirmation ShipTogether on check
 $('.ck-oc-wrap .oc-shiptogether-label').on('click', function () {
        if (!$('.ck-oc-wrap input#shipTogether').is(':checked')) {
            $('.ck-oc-wrap .ck-shipTogether-wrap').hide();
            $('.ck-oc-wrap .oc-shiptogether-merged-wrap').slideDown(200);
        }
    });
});
// Modal slider
function productSlider(id, productCol, shiftBy) {
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



//order summary pincode non serviceble slider
function osNonDelSlider() {
    $('.os-non-del-ext-wrap .ck-non-del-product-slider-wrap').each(function () {
        var children = $(this).children('.ck-non-del-product-slide').length;
        $(this).siblings('.ck-non-del-product-cnt ').children('.ck-non-del-product-cnt-no').text(children);
        if (children > 2)
        {
            productSlider($(this).attr('id'), '.ck-non-del-product-slide', 2);
        }
        else {
            $('.os-non-del-ext-wrap .ck-bill-addr-prev,.os-non-del-ext-wrap .ck-bill-addr-next,.os-non-del-ext-wrap .ck-non-del-product-cnt').hide();
        }
    });
}
//order summary pincode oos slider
function osOosSlider() {
    $('.os-oos-ext-wrap .ck-non-del-product-slider-wrap').each(function () {
        var children = $(this).children('.ck-non-del-product-slide').length;
        $(this).siblings('.ck-non-del-product-cnt ').children('.ck-non-del-product-cnt-no').text(children);
        if (children > 2)
        {
            productSlider($(this).attr('id'), '.ck-non-del-product-slide', 2);
        }
        else {
            $('.os-oos-ext-wrap .ck-bill-addr-prev,.os-oos-ext-wrap .ck-bill-addr-next,.os-oos-ext-wrap .ck-non-del-product-cnt').hide();
        }
    });
}
//Add new delivery address fisrt time user non serviceble slider
function addDelAddrFirstUserSlider() {
    $('.ck-addr-frm-wrap .ck-non-del-product-slider-wrap').each(function () {
        var children = $(this).children('.ck-non-del-product-slide').length;
        $(this).siblings('.ck-non-del-product-cnt').children('.ck-non-del-product-cnt-no').text(children);
        if (children > 8)
        {
            productSlider($(this).attr('id'), '.ck-non-del-product-slide', 8);
        }
        else {
            $('.ck-addr-frm-wrap .ck-bill-addr-prev,.ck-addr-frm-wrap .ck-bill-addr-next,.ck-addr-frm-wrap .ck-non-del-product-cnt').hide();
        }
    });
}
//Add new delivery address non serviceble slider
function addDelAddrSlider() {
    $('.ck-del-addr-add-frm-wrap .ck-non-del-product-slider-wrap').each(function () {
        var children = $(this).children('.ck-non-del-product-slide').length;
        $(this).siblings('.ck-non-del-product-cnt').children('.ck-non-del-product-cnt-no').text(children);
        if (children > 8)
        {
            productSlider($(this).attr('id'), '.ck-non-del-product-slide', 8);
        }
        else {
            $('.ck-del-addr-add-frm-wrap .ck-bill-addr-prev,.ck-del-addr-add-frm-wrap .ck-bill-addr-next,.ck-del-addr-add-frm-wrap .ck-non-del-product-cnt').hide();
        }
    });
}
//Edit delivery address non serviceble slider
function editDelAddrSlider() {
    $('.ck-del-addr-edit-frm-wrap .ck-non-del-product-slider-wrap').each(function () {
        var children = $(this).children('.ck-non-del-product-slide').length;
        $(this).siblings('.ck-non-del-product-cnt').children('.ck-non-del-product-cnt-no').text(children);
        if (children > 8)
        {
            productSlider($(this).attr('id'), '.ck-non-del-product-slide', 8);
        }
        else {
            $('.ck-del-addr-edit-frm-wrap .ck-bill-addr-prev,.ck-del-addr-edit-frm-wrap .ck-bill-addr-next,.ck-del-addr-edit-frm-wrap .ck-non-del-product-cnt').hide();
        }
    });
}
//Address selection non serviceble slider
function addrSelNonSlider() {
    $('.ck-del-addr-list-item .ck-non-del-product-slider-wrap').each(function () {
        var children = $(this).children('.ck-non-del-product-slide').length;
        $(this).siblings('.ck-non-del-product-cnt').children('.ck-non-del-product-cnt-no').text(children);
        if (children > 8)
        {
            productSlider($(this).attr('id'), '.ck-non-del-product-slide', 8);
        }
        else {
            $('.ck-del-addr-list-item .ck-bill-addr-prev,.ck-del-addr-list-item .ck-bill-addr-next,.ck-del-addr-list-item .ck-non-del-product-cnt').hide();
        }
    });
}
//address selection modal slider
function billAddrSelSlider() {
    $('.ck-bil-addr-slider-wrap').each(function () {
        var children = $(this).children('.ck-bil-addr-slide').length;
        $(this).siblings('.ck-addr-cnt').children('.ck-addr-cnt-no').text(children);
        if (children > 3)
        {
            productSlider($(this).attr('id'), '.ck-bil-addr-slide', 3);
        }
        else {
            $('.ck-bil-addr-sel-wrap .ck-bill-addr-prev,.ck-bil-addr-sel-wrap .ck-bill-addr-next,.ck-bil-addr-sel-wrap .ck-addr-cnt').hide();
        }
    });
}
//OC interted Item slider
function ocIntItemSlider() {
    $('.oc-int-pro-slider-wrap').each(function () {
        var children = $(this).children('.oc-int-pro-slide').length;
//        $(this).siblings('.ck-addr-cnt').children('.ck-addr-cnt-no').text(children);
        if (children > 4)
        {
            productSlider($(this).attr('id'), '.oc-int-pro-slide', 4);
        }
        else {
            $('.oc-int-pro-slider-ext-wrap .ck-bill-addr-prev,.oc-int-pro-slider-ext-wrap .ck-bill-addr-next').hide();
        }
    });
}
//Order Confirmation Multiple sku detail hider
function ocMultiSkuDetail(){
    var ocSkuNo = $('.ck-oc-sku-list .ck-sku-row-wrap').children('.ck-sku-row-content').length;
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
}



$(document).ready(function () {
    osNonDelSlider();
    osOosSlider();
    addDelAddrFirstUserSlider();
    addDelAddrSlider();
    editDelAddrSlider();
    addrSelNonSlider();
    billAddrSelSlider();
    ocIntItemSlider();
    ocMultiSkuDetail();
    $("#emi-select2, #bank_select").select2();
    $(".ck-city-select,.ck-state-select,.ck-country-select").select2();

    /* payment method left navigation tab on click right section container open */
    $('#ckPaymentMethodNav').on('click tap', 'li:not(.active)', function () {
        var id = $(this).attr('id');
        $(this).addClass('active').siblings().removeClass('active');
        $('#ckPaymentMethodContainer').find('.ck-tab-content').hide();
        $('#' + id + "Container").show();
    });

//    $(".ck-emi-table").mCustomScrollbar({
//        axis: "x"
//    });


    $("#emi-select2").change(function () {
        var curVal = $(this).val();
        if (curVal >= 1) {
            $(".ck-emi-table").slideDown();
        } else if (curVal === 0) {
            $(".ck-emi-table").slideUp();
        }
    });

    $(".ck-pgc-remove").on("click", function (e) {
        $(this).parent(".ck-pgc").hide();
        e.preventDefault();
    });

    $(".tooltip").mouseover(function () {
        $(this).siblings('.tooltip-txt').fadeIn();
    }).mouseout(function () {
        $(this).siblings('.tooltip-txt').fadeOut();
    });

//Order Summar OSS item removal
    $('.ck-non-del-product-slide .ck-non-del-rmv-link').on('click', function () {
        var nonDelItemsCnt = $(this).parents('.ck-non-del-product-slider-wrap').children('.ck-non-del-product-slide').length;
        $(this).parents('.ck-non-del-product-slider-wrap').css("margin-left","0");
        console.log(nonDelItemsCnt);
        if (nonDelItemsCnt > 1) {
            $(this).parents('.ck-non-del-product').find('.ck-non-del-wl-msg').css('display', 'inline-block');
            $(this).closest('.ck-non-del-product-slide').slideUp().remove();
            osNonDelSlider();
            osOosSlider();
        } else {
            $(this).parents('.ck-non-del-wrap').hide();
            $(this).parents('.os-non-del-ext-wrap').children('.ck-non-rmd-msg-wrap').slideDown(100);
            $(this).parents('.os-oos-ext-wrap').children('.ck-oos-rmd-msg-wrap').slideDown(100);
            $(this).closest('.ck-non-del-product-slide').slideUp().remove();
            osNonDelSlider();
            osOosSlider();
        }



    });
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


$('.ck-logged-in').on('mouseenter mouseleave', function () {
    $(".ck-logged-in .ck-loggedin-options").stop().slideToggle(300);
});

                });

        $(window).on("load", function () {
//    $("#delivery-assembly").mCustomScrollbar({
//        axis: "y"
//    });


        });

 $('#btn_save_shipping').click(function(){
                   $("#address_select_form").submit();
                });
                
 $('#btn_save_billing').click(function(){
                   $("#billAddAddrFrm").submit();
                });                