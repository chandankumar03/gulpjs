var vip_scripts = {
    vipModal: function () {

        global_function.sliderVertical('.thumb-slider', '.thumb-image', 1, '.thumb-slider-down-arrow', '.thumb-slider-up-arrow', 4);

        var $vipModalThumbnails = $('.thumb-slider').children('a');
        var $bigImageContainer = $('#vipModalWrap').find('#bigImageContainer');
        $vipModalThumbnails.on('click', function (e) {

            if ($(this).hasClass('vip-3d-thumb'))
            {

                $bigImageContainer.addClass('vip-image-hide');
                $('.vip-3d-iframe').show();
                $('.preview-gallery-text').hide();
            }
            else
            {
                var bigImage = $(this).attr('href');
                $bigImageContainer.attr('src', bigImage);
                $bigImageContainer.removeClass('large-view vip-image-hide');
                $('.vip-3d-iframe').hide();
                $('.preview-gallery-text').show();
                $bigImageContainer.attr('style', '');
                if($(this).is(':last-child'))
                {
                    $('.thumb-slider-next-arrow').addClass('inactive')
                }
                else{
                     $('.thumb-slider-next-arrow').removeClass('inactive')
                }

            }

            $('.thumb-slider').children('.thumb-image').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });

        $(document).on('click', '.thumb-slider-next-arrow', function () {
            act_thumb_el = $('.thumb-slider .thumb-image.active');
            act_nextthumb_el = act_thumb_el.next();
            act_nextthumb_el.trigger('click');
            if (!act_nextthumb_el[0]) {
                act_thumb_el.trigger('click');
            }
            $('.thumb-slider-prev-arrow').removeClass('inactive');
            if (act_nextthumb_el.is(':last-child'))
            {
                $(this).addClass('inactive');
            }

        });
        $(document).on('click', '.thumb-slider-prev-arrow', function () {
            act_thumb_el = $('.thumb-slider .thumb-image.active');
            act_prevthumb_el = act_thumb_el.prev();
            act_prevthumb_el.trigger('click');
            if (!act_prevthumb_el[0]) {
                act_thumb_el.trigger('click');
            }
            $('.thumb-slider-next-arrow').removeClass('inactive');
            if (act_prevthumb_el.is(':first-child'))
            {
                $(this).addClass('inactive');
            }

        });

        $(document).on('click', '#bigImageContainer', function () {
            if (!$(this).hasClass('large-view'))
            {
                $(this).addClass('large-view');
                $('.preview-gallery-text').hide();
            }
            else
            {
                $(this).removeClass('large-view');
                $('.preview-gallery-text').show();
                $(this).attr('style', '');
            }
        });
        /* Script for image gallery hover  */
        $(document).on('mousemove', '#vipModalBigImage', function (e) {

            g_move_amt = parseInt(e.pageY - $(this).offset().top);
            g_move_amt_x = parseInt(e.pageX - $(this).offset().left);
            g_popup_height = $('#vipModalBigImage').height();
            g_popup_width = $('#vipModalBigImage').width();
            l_img_rem = ($(this).find('img').height() - g_popup_height) / g_popup_height;
            l_img_rem_x = ($(this).find('img').width() - g_popup_width) / g_popup_width;
            l_img_top = (l_img_rem * g_move_amt);
            l_img_top_x = (l_img_rem_x * g_move_amt_x);
            if ($(this).find('img').height() > g_popup_height) {
                $(this).find('img').css('margin-top', '-' + l_img_top + 'px');
            }
            if ($(this).find('img').width() > g_popup_width) {
                $(this).find('img').css('margin-left', '-' + l_img_top_x + 'px');
            }

        });

    },
    initialize: function () {
        vip_scripts.vipGallerySlider();

        vip_scripts.vipModal();

        if ($("#pincode").val() != "") {
            $('.vip-input-clear').show();
        }
        /*service details toggle*/
        $(document).on('click', '.vip-toggle-btn', function () {

            if ($('#delivery').find('small').hasClass('vip-check')) {
                $(".vip-service-details").slideToggle();
            } else {
                $(".vip-non-service-details").slideToggle();
            }
            $(this).toggleClass('collapsed');

            global_function.niceScroll();
        });

        $('.vip-input-clear').click(function () {
            $('#vip-input input').val('');
        });

        $(".vip-product-img").hover(function () {
            $('.vip-share-fb, .vip-share-twitter, .vip-share-insta, .vip-share-pinterest, .vip-modal').toggleClass('opacity');

        });

        $('.vip-product-img').hover(function () {
            $('.vip-share-fb').animate({'left': '0px'}, 200);
            $('.vip-share-twitter').animate({'left': '0px'}, 100);
            $('.vip-share-insta').animate({'left': '0px'}, 200);
            $('.vip-share-pinterest').animate({'left': '0px'}, 300);
        }, function () {
            $('.vip-share-fb').animate({'left': '-30px'}, 100);
            $('.vip-share-twitter').animate({'left': '-30px'}, 100);
            $('.vip-share-insta').animate({'left': '-30px'}, 100);
            $('.vip-share-pinterest').animate({'left': '-30px'}, 100);
        })


        /*favourite icon active toggle*/
        $('.vip-product-info-wrap .pf-wishlist-ic').click(function () {
            //$(this).toggleClass('active-wishlist');
        });


        $(".vip-product-1by1 .vip-more-colors").mouseenter(function () {
            // more colors dynamic items

            var $img = $(this).find('.img');
            var width = $img.length * $img.outerWidth(true);
            $('.vip-product-1by1 .vip-more-colors .imgwrap').width(width);

        });

        // more colors dynamic items

        var $imgMoreColor = $(".vip-product-1by1 .oneby1 .vip-more-colors").find('.img');
        var widthimgMoreColor = $imgMoreColor.length * $imgMoreColor.outerWidth(true);
        $('.vip-product-1by1 .oneby1 .vip-more-colors .imgwrap').width(widthimgMoreColor);
        $(".vip-product-1by1 .oneby1 .vip-more-colors").hover(function () {
            $(this).stop().animate({'width': widthimgMoreColor + 60}, 300);
        },
                function () {
                    $(this).stop().animate({'width': 60}, 300);
                });


        var $imgMoreColor2b1 = $(".vip-product-2by1 .twoby1 .vip-more-colors").find('.img');
        var widthimgMoreColor2b1 = $imgMoreColor2b1.length * $imgMoreColor2b1.outerHeight(true);

        $(".vip-product-2by1 .twoby1 .vip-more-colors").hover(function () {
            $(this).children('.imgwrap').stop().animate({'height': widthimgMoreColor2b1}, 300);
        },
                function () {
                    $(this).children('.imgwrap').stop().animate({'height': 0}, 300);
                });


        /*other details tabs*/

        var ref_tab;

        $('.other_details_header a').click(function () {
            ref_tab = $(this).attr('rel');
            if (!($(this).hasClass('active'))) {
                $('.other_details_header a').removeClass('active');
                $(this).addClass('active');
                $('.other_details_panel').not('#' + ref_tab).fadeOut(150);
                $('#' + ref_tab).fadeIn(150);
            }
            //  pf_literal_reinitialize();
        });
        $('.other_details_header_inner a').eq(0).trigger('click');

        /*faq details toggle*/

        $('.acc_header').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.acc_body').slideUp(300);
            } else {
                $('.acc_header').removeClass('active');
                $(this).addClass('active');
                $('.acc_body').slideUp(300);
                $(this).siblings('.acc_body').slideDown(300, function () {

                });
            }

        });

        /*enter pincode to show service details*/

        $('.vip-pinenter').click(function () {
            if ($('#vip-input input').val())
            {
                //$(".vip-service-details").slideDown(500);
                $('.vip-pincode-btn').hide();
                $('.vip-toggle-btn').show();
            }
            else {

            }

        });

        /*clear input*/

        $('.vip-input-clear').click(function () {
            $('#pincode').focus();
            $(".vip-service-details").slideUp(500);
            $(".vip-non-service-details").slideUp(300);
            $('.vip-pincode-btn').show();
            $('.vip-toggle-btn').hide();
            $(this).hide();

        });

        $("#vip-input input").bind("change paste keyup", function () {
            $('.vip-input-clear').show();
        });

        /*shop item check*/
        $('.vip-shop-item').click(function () {
            var checkBoxes = $(this).find('.gb-check input[type=checkbox]');
            if (!$(this).find('.gb-check').hasClass('disabled'))
            {
                checkBoxes.prop("checked", !checkBoxes.prop("checked"));
            }
        });

        /*configurable tabs*/
        $('ul.vip-config-tabs li').click(function () {
            var tab_id = $(this).attr('data-tab');

            $('ul.vip-config-tabs li').removeClass('current-tab');
            $('.vip-config-tab-content').removeClass('current-tab');

            $(this).addClass('current-tab');
            $("#" + tab_id).addClass('current-tab');
        });

         /*sizes select*/
        $('.vip-config-sizes-wrap ul li').click(function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            
             $('.vip-config-sizes-wrap ').removeClass('vip-config-sizes-error');
             $('.vip-configurable .error-text').hide();
            
        });

        /*slide hovers*/
        $('.vip-share-fb').mouseover(function () {
            $('.share-slide-fb').stop().animate({marginLeft: '20px'}, 500);
        });

        $('.vip-share-twitter').mouseover(function () {
            $('.share-slide-twitter').stop().animate({left: '20px'}, 500);
        });
        $('.vip-share-twitter').mouseout(function () {
            $('.share-slide-twitter').stop().animate({left: '-160px'}, 500);
        });
        $('.vip-share-insta').mouseover(function () {
            $('.share-slide-insta').stop().animate({left: '20px'}, 500);
        });
        $('.vip-share-insta').mouseout(function () {
            $('.share-slide-insta').stop().animate({left: '-160px'}, 500);
        });
        $('.vip-share-pinterest').mouseover(function () {
            $('.share-slide-pinterest').stop().animate({left: '20px'}, 500);
        });
        $('.vip-share-pinterest').mouseout(function () {
            $('.share-slide-pinterest').stop().animate({left: '-160px'}, 500);
        });

        /*qty select*/
        $('.selectMenu').bind({
            mouseenter: function () {
                $(this).children('ul').stop().slideDown();
            },
            mouseleave: function () {
                $(this).children('ul').stop().slideUp(200);
            }
        });
        $('.selectMenu ul li').bind({
            click: function () {
                var selectedVal = $(this).text();
                $(this).parent().siblings('.selected').text(selectedVal);
            }
        });

        /*togle product image*/
        $('.vip-options-slideeach').on('click', function () {
            $('.vip-options-slideeach').removeClass('active');
            $(this).addClass('active');
        });

        $('.vip-options-slideeach a').on('click', function (e) {
            e.preventDefault();
            $('#vipImage').find("img").attr("src", $(this).data("img"));

        });
        $('.vip-share-wrap a').hover(function(){$('#vipImage img').css('opacity','0.6')},function(){$('#vipImage img').css('opacity','')});

    },
    vipGallerySlider: function () {
        if ($('.vip-product-overview').hasClass('vip-product-2by1')) {
            if (Modernizr.mq("only screen and (min-width: " + global_function.responsiveWidth.mqMedium + ")and (max-width:" + (parseInt(global_function.responsiveWidth.mqMediumLandscape) - 1) + "px)"))
            {
                //768-1023
                if ($('.vip-option-slider-wrapper').hasClass('no-options')) {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 5);
                }
                else if ($('.vip-option-slider-wrapper').hasClass('color-option') || $('.vip-option-slider-wrapper').hasClass('assembly-video-option'))
                {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 4);
                }
                else
                {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 3);
                }
            }
            else if (Modernizr.mq("only screen and (min-width: " + global_function.responsiveWidth.mqMediumLandscape + ")and (max-width:" + parseInt(global_function.responsiveWidth.mqLargeLandscape) + "px)"))
            {
                //1024-1169
                if ($('.vip-option-slider-wrapper').hasClass('no-options')) {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 3);
                }
                else if ($('.vip-option-slider-wrapper').hasClass('color-option') || $('.vip-option-slider-wrapper').hasClass('assembly-video-option'))
                {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 2);
                }
                else
                {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 1);
                }

            }
            else if (Modernizr.mq("only screen and (min-width: " + global_function.responsiveWidth.mqLarge + ")and (max-width:" + parseInt(global_function.responsiveWidth.mqLargeHD) + "px)"))
            {
                //1170-1865
                if ($('.vip-option-slider-wrapper').hasClass('no-options')) {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 4);
                }
                else if ($('.vip-option-slider-wrapper').hasClass('color-option') || $('.vip-option-slider-wrapper').hasClass('assembly-video-option'))
                {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 3);
                }
                else
                {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 2);
                }
            }
            else
            {
                //1865 - 1920
                if ($('.vip-option-slider-wrapper').hasClass('no-options')) {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 5);
                }
                else if ($('.vip-option-slider-wrapper').hasClass('color-option') || $('.vip-option-slider-wrapper').hasClass('assembly-video-option'))
                {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 4);
                }
                else
                {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 3);
                }
            }

        }

        else
        {
            global_function.sliderVertical('.vip-options-slideinner.vertical', '.vip-options-slideeach', 1, '.vip-bottom-arrow', '.vip-top-arrow', 4);
        }
    }
};
$(function () {
    vip_scripts.initialize();
    $('#vipImage').on('click', function (e) {
        e.preventDefault();

        var imgSrc = $(this).children('img').attr('src');
        $('#vipModalWrap').find('.thumb-image').each(function () {
            var modalImgSrc = $(this).attr('href');
            if (modalImgSrc == imgSrc)
            {
                $(this).trigger('click');

            }
        });
    });

});

