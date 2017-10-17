var global_function = {
    scrollDefaults: {cursorcolor: "#c7c7c7", cursorwidth: "7px", cursorborderradius: "8px",autohidemode:false},
    selectDefaults: {
		allowClear: true,
		width: "100%",
		matcher: function(term, text) {
			var terms = term.split( ' ' );

			for( var i = 0; i < terms.length; i++ ) {
				var startsWithMatcher = new RegExp( '^' + terms[ i ], 'i' );
				var containsMatcher = new RegExp( terms[ i ], 'i' );

				if( startsWithMatcher.test( text ) == false ) {
					if( containsMatcher.test( text ) == false ) {
						return ( text === 'Other' );
					}
				}
			}
			return true;
		},
		sortResults: function( results, container, query ) {
			return results;
		}
	},
	smoothScroll: function () {
        /*var target = window.location.hash,
                target = target.replace('#', '');
        window.location.hash = "";
        $(window).load(function () {
            if (target) {
                $('html, body').animate({
                    scrollTop: $("#" + target).offset().top
                }, 700, 'swing', function () {
                    window.location.hash = target;
                });
            }
        });
        $('a[href*=#]').click(function () {
            var href = $.attr(this, 'href');
            $('html, body').animate({
                scrollTop: $(href).offset().top
            }, 1000, function () {
                window.location.hash = href;
            });
            return false;
        });*/
        return false;
    },
	selectDefaultsWS:  {allowClear: true, width: "100%", minimumResultsForSearch: -1},
    responsiveWidth: {mqMedium: "768px", mqMediumLandscape: "1024px", mqLargeLandscape: "1169px", mqLarge: "1170px", mqLargeHD: "1857px"},
    buildModal: function (onOpen, onClose) {
        var modal, $this;
        var overlay = '<div id="popup_overlay" style="display:none;"></div>';
        $('body').prepend(overlay);
        $('#popup_overlay').each(function (i) {
            var ids = $(this);
            if (ids.length > 1)
                $('#popup_overlay:gt(0)').remove();
        });
        $(document).on('click', '[data-modal]', function (e) {
            $this = $(this);
            modal = $this.data('modal');
            $('[data-modalname]').hide();
            if ($('body').find('[data-modalname=' + modal + ']').length > 0)
            {
                $('#popup_overlay').fadeIn(function () {

                    if (typeof onOpen === 'function')
                    {
                        onOpen.call($this);
                    }
                    
                    if(modal == 'besConsultForm' && $('#pageType').length > 0){
                        var bespokePage = $('#pageType').val();
                        if(typeof bespokePage != 'undefined' && bespokePage == 'vip'){
                            $('.bes-selection-order').css('display','none');
                            $('.bes-order-help').css('display','none');
                            $('.bes-ordet-facility').css('display','none');
                            $('.bes-order-city').css('display','none');
                            $('.bes-order-interest').css('display','none');
                            $('#besHomeOrder').css('display','block');
                            $('#besSubmitBut').css('display','block');
                        }
                    }
                    $('[data-modalname=' + modal + ']').fadeIn();
                    $('body').addClass('active');
                    
                });
            }
            else
            {
                console.error("Modal not found!");

            }

            e.preventDefault();
        });
        $(document).on('click', '.popup-close,#popup_overlay', function (e) {

            $('[data-modalname=' + modal + ']').fadeOut(function () {
                $('#popup_overlay').fadeOut();
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
                    $('#popup_overlay').fadeOut();
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
                //console.log(setCount + 1 + '::' + shiftBy)
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
            setCount = ($product.length - visible);
            function visbleandshiftntmatched() {
                setCount--;
                //console.log(setCount + 1 + '::' + shiftBy)
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
    niceScroll: function () {
        if ($.fn.niceScroll) {
            $('.gb-scroll').niceScroll(global_function.scrollDefaults).resize();
        }
    },
    selectBox: function () {
        if ($.fn.select2) {
            $('.gb-select').select2(global_function.selectDefaults);
        }
    },
	selectBoxWS: function () {
        if ($.fn.select2) {
            $('.gb-select-ws').select2(global_function.selectDefaultsWS);
        }
    },
    arrangePageElements: function () {
        /* all script depend on window resize will come here */
       /* global_function.setSelectionNavHeight();*/
		if ($('#stickyObject').length) {
			global_function.list_nav_more_append();
		}
    },
    setSelectionNavHeight: function () {
        var pageHeight = $(window).height();
        var headerHeight = $("header").height();
        // var footerHeight = $("footer").height();
        // var newHeight = pageHeight - (headerHeight + footerHeight + 36);
		var newHeight = pageHeight - (headerHeight + 36);
        if (pageHeight > 300) {
            $("#selectionNavArea .sel-nav").css('max-height', newHeight);
        }
    },
    header_scripts: function () {
        var ref_menu, curr_menu_item, menu_hover_delay = 200, setTimeoutConst;

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
        $('.menu_wrapper a').hover(function () {
            $('.img_search_header .close').click();
            $('.close_notify_expand').click();
            var cur_obj = $(this);
            if ($(window).width() >= 980) {
                setTimeoutConst = setTimeout(function () {
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
                        $('#' + ref_menu).stop(true, true).delay(200).fadeIn(150, function () {
                            curr_menu_item.addClass('active');
                        });
                    }
                }, menu_hover_delay)
            }
            ;
            // add code for Overlapping with drop-down options issue
            if ($("select").is(":focus")) {
                $("select").blur();
            }
        }, function () {
            clearTimeout(setTimeoutConst);
            //$('#slideshow').cycle('resume');
        });

        $('#megamenu').hover(function () {
            //$('#slideshow').cycle("pause");
        }, function () {
            //$('#slideshow').cycle("resume");
        });

        $('#menuTransOverlay, #headerUserArea').on('mouseover', function () {
            if ($(window).width() >= 980) {
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

        $(document).on('click', '.popup_close', function () {
            $('.tyo_popup_box').hide();
            $('#popup_overlay').removeClass('active');
        });
        function menu_close() {
            $('#popup_overlay').trigger('click');
        }


        $(document).on('keydown', function (e) {
            if (e.keyCode === 27) { // ESC
                $('#loginPopupBox').hide();
                $('#registerPopupBox').hide();
                $('#returnLoginPopupBox').hide();
                $('#popup_overlay').fadeOut(200);
            }
        });


        $('.popup-box').on('click tap', '.popup-forgot', function (e) {
            $('#login-normal').hide();
            $('#login-forgot-pwd-wrap').show();
            e.preventDefault();
        });
        $('.loginpg-login-wrap').on('click tap', '.popup-forgot', function (e) {
            $('a[data-modal=loginPopupLink]').trigger('click');
            $('.popup-box .popup-forgot').trigger('click');
            e.preventDefault();
        });
        /* login js end */
        
        if (Modernizr.mq("only screen and (min-width: " + global_function.responsiveWidth.mqMedium + ")and (max-width:" + (parseInt(global_function.responsiveWidth.mqMediumLandscape) - 1) + "px)"))
        {

            $('.customer-help-wrap').on('click', function (e) {
 
                if ($(this).hasClass('clicked')) {

                    $(this).removeClass('clicked');

                    $(this).find('.customer-help-tooltip').hide();

                    $(this).children('a').css('color', '#666');

                } else {

                    $(this).addClass('clicked');

                    $(this).find('.customer-help-tooltip').show();

                    $(this).children('a').css('color', '#000');

                    e.preventDefault();

                }
                 e.stopPropagation();
            });
 
            $(document).on('click',function (e) {

                if($(".customer-help-wrap").hasClass('clicked')){

                   $('.customer-help-wrap').removeClass('clicked');

                }

            });

        }
        
    },
    my_account: function () {
        $(document).on('click', '.notification-title,.notification-text,.notification-date', function (e) {
            $(this).removeClass('notification-unread');
            if (e.target === this) {
                $(this).closest('.notification-wrap').find(".notification-toggle").slideToggle("slow");
                $(this).closest('.notification-wrap').siblings().find(".notification-toggle").slideUp("slow");
                return false;
            }
        });
        $(document).on('click', '#myAccountNotification', function () {
            $('.notification-checkbox').prop('checked', $(this).prop('checked'));
            $('.notification-header').find(".notification-delete a").toggle();
            $('.notification-check').each(function (i) {
                if ($(this).find('input').is(':checked'))
                {
                    $(this).siblings('.my-account-notification-delete').children('.mc-notification-close-icon').css('visibility', 'visible');
                }
                else
                {
                    $(this).siblings('.my-account-notification-delete').children('.mc-notification-close-icon').css('visibility', 'hidden');
                }
            });

        });
        $(document).on('click', '.notification-checkbox', function () {
            var visibleStatus = $(this).closest('.notification-check').siblings('.my-account-notification-delete').children('.mc-notification-close-icon').css('visibility');
            var visibleStatus = visibleStatus == "visible" ? 'hidden' : 'visible';
            $(this).closest('.notification-check').siblings('.my-account-notification-delete').children('.mc-notification-close-icon').css('visibility', visibleStatus);
            $('.notification-checkbox').each(function () {
                if ($('.notification-checkbox:checked').length > 0)
                {
                    $('.notification-header').find(".notification-delete a").show();


                }
                else
                {
                    $('.notification-header').find(".notification-delete a").hide();
                }
                if ($('.notification-checkbox:checked').length == 1 && $('#myAccountNotification').is(':checked'))
                {
                    $('.notification-checkbox').prop('checked', false);
                }
            })
        });

        // Script for More from infinite scrolling
        var single_gallery_width, morefrom_flag = 0, morefrom_curr_el;
        single_gallery_width = parseInt($('.galleryWrap li').width());
        $('.galleryWrap li:first-child').addClass('active');
        $(document).on('click', '.gallery_next', function () {
            var d_id = $(this).attr('data-id');
            single_gallery_width = parseInt($('.galleryWrap' + d_id + ' li').width());
            $('.galleryWrap' + d_id + ' li:first-child').addClass('active');

            if (morefrom_flag == 0) {
                morefrom_flag = 1;
                //single_spot_width = '-' + single_spot_width + 'px';
                //console.log(single_gallery_width);
                $('.galleryWrap' + d_id + ' ul .active').animate({marginLeft: -single_gallery_width}, 450, function () {
                    morefrom_flag = 0;
                    morefrom_curr_el = $('.galleryWrap' + d_id + ' ul .active');
                    $('.galleryWrap' + d_id + ' li').removeClass('active');
                    morefrom_curr_el.next().addClass('active');
                    $('.galleryWrap' + d_id + ' li:first-child').css({'margin': '0 0 0 0'}).appendTo('.galleryWrap' + d_id + ' ul');
                    //spot_curr_el.
                });
            }
        });
        $(document).on('click', '.gallery_prev', function () {
            var d_id = $(this).attr('data-id');
            single_gallery_width = parseInt($('.galleryWrap' + d_id + ' li').width());
            $('.galleryWrap' + d_id + ' li:first-child').addClass('active');
            if (morefrom_flag == 0) {
                //console.log(single_gallery_width);
                $('.galleryWrap' + d_id + ' li').removeClass('active');
                $('.galleryWrap' + d_id + ' li:last-child').css({'margin-left': '-' + single_gallery_width + 'px'}).addClass('active').prependTo('.galleryWrap' + d_id + ' ul');
                $('.galleryWrap' + d_id + ' ul .active').animate({marginLeft: 0}, 450, function () {
                    morefrom_flag = 0;
                });
            }
        });

        $(document).on('click', ".furniture-exchange-viewdetails a", function () {
            $(this).closest('.exchange-wrap').find(".furniture-exchange-toggle").slideToggle("slow", function () {

                if ($(this).siblings().find('.furniture-exchange-viewdetails a').text() == '+ view details')
                {
                    $(".furniture-exchange-viewdetails a").text('+ view details');
                    $(this).siblings().find('.furniture-exchange-viewdetails a').text('- hide details')
                }
                else {
                    $(".furniture-exchange-viewdetails a").text('+ view details');
                    $(this).siblings().find('.furniture-exchange-viewdetails a').text('+ view details')
                }
            });
            $(this).closest('.exchange-wrap').siblings().find(".furniture-exchange-toggle").slideUp("slow");
            return false;

        });

        function mousePosition(el)
        {
            var elOffsetLeft = el.offset().left;
            var elOffsetTop = el.offset().top;
            var elWidth = el.outerWidth(true);
            var elHeight = el.outerHeight(true);
            var elHalfWidth = elWidth / 2;

            var wrapperDiv = $('.tyo_popup_box');
            var tooltipDiv = $('#track-order-tooltip');
            var tooltipDivHeight = tooltipDiv.outerWidth(true);
            var toopTipBottomOffset = tooltipDiv.offset().top + tooltipDiv.outerHeight(true);
            var wrapperBottomOffset = wrapperDiv.offset().top + wrapperDiv.outerHeight(true);
            if (el.hasClass('first'))
            {
                $('.tyo_hover_details').css('marginLeft', -49);
            }
            else if (el.hasClass('last'))
            {
                $('.tyo_hover_details').css('marginLeft', -288);
            }
            else
            {
                $('.tyo_hover_details').css('marginLeft', -165);
            }

            $('#track-order-tooltip').offset({
                left: elOffsetLeft + elHalfWidth,
                top: elOffsetTop + elHeight
            });

        }

        $('.bottom_timeline_content .tyo_tt').each(function () {
            var $obj = $(this);
            $(this).on('mouseenter', function () {
                $('#track-order-tooltip').show();
                mousePosition($obj);
            }).mouseleave(function () {
                $('#track-order-tooltip').hide();
            });
        });

        $(document).on('keydown', function (e) {
            if (e.keyCode === 27) { // ESC
                $('.tyo_popup_box').hide();
            }
        });

    },
    search_scripts: function () {
        // Part of masonry functionlity
        // Uncomment it if you want to active masonry
        
        // var $container = $('#searchProductList .card-clip');
        // if ($('#searchProductList').length) {
        //    $container.imagesLoaded( function() {
        //         $container.masonry({
        //             itemSelector: '.card.grid-view'
        //         });              
        //    });           
        // }

    },
	tooltip: function (element, container) {
		var $window = $(window),
				$this = element;
		container = typeof (container) === "undefined" ? $('body') : container;
		var tooltipContent = $this.attr('data-tooltip');
		var tooltip = '<div class="pf-tooltip" style="display:none;">' + tooltipContent + '<div class="pf-tooltip-arrow"></div></div>'
		$('body').append(tooltip);
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
		var left = thisOffsetLeft + ($this.outerWidth(true) / 2);
		$tooltip.offset({top: top, left: left});
		$tooltip.fadeIn(500);

		var toolthisOffsetTop = $tooltip.position().top,
				tooltipOffsetLeft = $tooltip.position().left,
				tooltipOffsetRight = tooltipOffsetLeft + $tooltip.outerWidth(true),
				tooltipOffsetBottom = $tooltip.offset().top + $tooltip.outerHeight(true);
		if (tooltipOffsetBottom > thisOffsetTop)
		{
			var top = thisOffsetTop - $tooltip.outerHeight(true) - 10;
			$tooltip.offset({top: top});
		}
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
        selection_nav_script:function(){
                 if ($('#selectionNavAreaCont').hasClass('clip-nav')) {
            var $sna = $(".clip-nav-area"); 
            var $snm = $(".clip-nav-more .clip-nav-more-link");			
            var maxheight = 0;
            var imgSrc = $('.clip-nav-more').find('img').attr('src');
            $(".clip-nav-section .clip-nav-container").each(function () {
                maxheight = ($(this).height() > maxheight ? $(this).height() : maxheight);
            });				
            $(".clip-nav-section .clip-nav-container").height(maxheight);
            $(".clip-nav-section .clip-nav-container").find('.clip-nav-container-body').addClass('sec-middle');
            var totHeight = $sna.find('.clip-nav-section').outerHeight(true);
            var selHeight = $sna.css('max-height');
            function moreHide() {
                $('.clip-nav-more-link').find('a').hide();
                $('.clip-nav-more').find('img').attr('src', imgSrc.replace('.png','-hover.png'));
                $snm.attr('data-toggled','on');
            }
            function moreShow() {
                $('.clip-nav-more-link').find('a').show();
                $('.clip-nav-more').find('img').attr('src', imgSrc.replace('-hover.png','.png'));	
                $snm.attr('data-toggled','off');	
            }
            selNavBottom = $sna.offset().top+$sna.outerHeight(true);
            //navAreaHight(); 
            function navAreaHight() {				
                if($sna.find('.active-nav').length>0){
                        var offsetBottom =$sna.find('.active-nav').offset().top + $sna.find('.active-nav').outerHeight(true);
                        
                        if(offsetBottom<selNavBottom)
                        {
                                $sna.stop(true).animate({'maxHeight':selHeight},500);
                                moreShow();
                        }
                        else
                        {
                                $sna.stop(true).animate({'maxHeight':totHeight},500);	
                                $snm.addClass('inactive');							
                        }
                }
                else
                {
                        $sna.stop(true).animate({'maxHeight':selHeight},500);
                        $moreShow();
                }
            }
            $('#selectionNavArea .clip-nav-container').on('click tap', function () {
              var navIndex = $(this).index();	      
              $(this).closest('.selection-product-panel').find('.selection-display-switcher').children().hide().removeClass('sel-cont-active');
              $(this).closest('.selection-product-panel').find('.selection-display-switcher').children().eq(navIndex).show().addClass('sel-cont-active');
              $(this).addClass('active-nav').siblings().removeClass('active-nav');	
            });

            if(totHeight>parseInt(selHeight)){
              $('.clip-nav-more').show();
            } else {
                 $('.clip-nav-more').hide();
            }

            $sna.hover(function() {		
                $(this).stop(true).animate({'maxHeight':totHeight},500);	
                moreHide();							
            },function() {
                navAreaHight();
            });

            $snm.on('click tap', function () {
                if (!$(this).attr('data-toggled') || $(this).attr('data-toggled') == 'off'){					
                    $sna.stop(true).animate({'maxHeight':totHeight},500);	
                    moreHide();	
                } else if ($(this).attr('data-toggled') == 'on'){					
                    navAreaHight();
                }
            });
        }
        },
		listNavVar: {listNavMaxHeight: '', listNavActHeight: ''},
        list_nav_script:function(){
       		$(document).on('click','.list-more-prod', function() {
			var $CO = $(this);
            var $lna = $('.list-nav-area');
			if (!$CO.attr('data-toggled') || $CO.attr('data-toggled') == 'off'){
					$lna.stop(true).animate({'maxHeight':  global_function.listNavVar.listNavActHeight},500);	
					$CO.attr('data-toggled','on');	
					$CO.find('h5').text('Less');
			} else if ($(this).attr('data-toggled') == 'on'){	
					$lna.stop(true).animate({'maxHeight': global_function.listNavVar.listNavMaxHeight},500);	
					$CO.attr('data-toggled','off');
					$CO.find('h5').text('More');	
				}				
			});
		}, 
        list_nav_more_append:function(){
			 $('.list-nav .list-more-prod').remove();	
			 var $lna =  $('.list-nav-area')
			 $lna.removeAttr('style');
			 global_function.listNavVar.listNavMaxHeight = $lna.css('max-height');
			 global_function.listNavVar.listNavActHeight = $lna.find('.list-nav-section').outerHeight(true);	
             var $cw = $('.sel-stk-nav-cont .list-nav').outerWidth(true);
             var $iw = $('.list-nav-container').outerWidth(true);
             var $rcl = parseInt($cw/$iw);
             var $il = $('.list-nav-container').length;
             var $mhc =  '<div class="list-nav-container list-more-prod"><a href="javascript: void(0)"><div class="list-nav-container-body"><div class="list-nav-img"><img src="'+image_url+'images/clip-more-ico.png"></div><div class="list-nav-content"><h5>More</h5></div></div></a></div>';
             if($il>$rcl)
             {				
                $('.list-nav-container').eq($rcl - 1).before($mhc);
             }
         
        },
    initialize: function () {
        $(window).on("debouncedresize", function (event) {
            global_function.arrangePageElements();
			PF.HEADER.setCartHeight(); // resize cart
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

        var onOpenModalCallbacks = function ()
        {

            if (this.hasClass('vip-see-3d transition'))
            {
                $('.vip-3d-thumb').trigger('click');
                $('.thumb-slider-prev-arrow').addClass('inactive');
            }
            /*** Done by Sintu to display videos on vip page in tabs ***/
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
            /*** Done by Sintu to display videos on vip page in tabs ***/
            $('.assembly-video-frame .tabs-block #tab-1').empty();
            $('.assembly-video-frame .tabs-block #tab-2').empty();
           // $('.assembly-video-frame').empty();
        }
        global_function.arrangePageElements();
        global_function.header_scripts();
        global_function.search_scripts();
        global_function.niceScroll();
        global_function.selectBox();
		global_function.selectBoxWS();
        global_function.my_account();
        global_function.buildModal(onOpenModalCallbacks, onCloseModalCallbacks);
		//global_function.setSelectionNavHeight();

        if ($('.select2-results').length > 0) {
            global_function.niceScroll();
        }
                /*
		if($('#selectionProductList').length > 0){
			 $('#selectionProductList').stickyTopBottom({navbar:$("#selectionNavArea"),bottom_class:'bottom-touch',fixed_class:'gb-sticky',sticky_class:'sticky-present',func:global_function.setSelectionNavHeight});
		}

		if($('#selectionNonFurnitureList').length > 0) {
			$('#selectionNonFurnitureList').stickyTopBottom({navbar:$("#selectionNavArea"),bottom_class:'bottom-touch',fixed_class:'gb-sticky',sticky_class:'sticky-present',func:global_function.setSelectionNavHeight});
		}	$('#selectionNonFurnitureList').stickyTopBottom({navbar:$("#selectionNavArea"),bottom_class:'bottom-touch',fixed_class:'gb-sticky',sticky_class:'sticky-present',func:global_function.setSelectionNavHeight});
		}*/

		$( document ).on({
			mouseenter : function() {
				global_function.tooltip( $( this ), '#page' );
			},
			mouseout : function() {
				$( '.pf-tooltip' ).remove();
			},
		}, '[data-tooltip]' );

        /* header sticky menu code start */

        var previousScroll = 0;
        var $window = $(window);
        var $menu = $('#menu_wrapper'),
                $megaMenu = $('#megamenu'),
                $feStickyBar = $('#fe_header_wrapper'),
                $headerUserArea = $('#headerUserArea');
        if ($headerUserArea.length > 0)
        {
            headerUserAreaBottom = $headerUserArea.offset().top + $headerUserArea.outerHeight(true);
        }
        if ($menu.length > 0)
        {
            menuOffsetTop = $menu.offset().top,
                    menuOffsetBottom = $menu.offset().top + $menu.outerHeight(true);
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
            var scrollTop = $(window).scrollTop();
           var currentScroll = $(this).scrollTop();
           /* Back to top visibility codition start*/
            if (currentScroll > previousScroll) {
                $('#backToTop').fadeOut(250);
            }
            else {
                if (scrollTop < 600) {
                    $('#backToTop').fadeOut(250);
                }
                else {
                    $('#backToTop').stop('true', 'true').fadeIn(250);
                }
            }
            /* Back to top visibility codition end*/
            /* header sticky menu code start */
           
            if (currentScroll == 0 || !$menu.hasClass('sticky-menu'))
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
        $('#backToTop').on('click tap', function () {
            $('html,body').animate({scrollTop: 0}, 800);
        });

        //global_function.sliderHorizontal('#selectionNavAreaCont .sel-nav-section', '.sel-nav-container ', 1, '#selSlideNext', '#selSlidePrev', 4);

		/**
		 * Change after going live
		 */
        if ($('#selectionNavAreaCont').hasClass('sel-nav')) {
                $(".sel-nav-section .sel-nav-container").each(function(index, element) {
                        var divChild = 0;
                        if($(".sel-nav-section .sel-nav-container").length<2){
                                divChild = 200;
                        }else{
                                divChild = divChild + $(this).outerWidth();
                        }
                   $(this).parent().css({width:divChild})
                });

                if (Modernizr.mq("only screen and (min-width: " + global_function.responsiveWidth.mqMedium + ")and (max-width:" + (parseInt(global_function.responsiveWidth.mqMediumLandscape) - 1) + "px)")) {
                        /*768-1023*/
                        global_function.sliderHorizontal('#selectionNavAreaCont .sel-nav-section', '.sel-nav-container ', 1, '#selSlideNext', '#selSlidePrev', 2);
                } else if (Modernizr.mq("only screen and (min-width: " + global_function.responsiveWidth.mqMediumLandscape + ")and (max-width:" + parseInt(global_function.responsiveWidth.mqLargeLandscape) + "px)")) {
                        /*1024-1169*/
                        global_function.sliderHorizontal('#selectionNavAreaCont .sel-nav-section', '.sel-nav-container ', 1, '#selSlideNext', '#selSlidePrev', 3);
                } else if (Modernizr.mq("only screen and (min-width: " + global_function.responsiveWidth.mqLarge + ")")) {
                        /*1170-1865*/
                        global_function.sliderHorizontal('#selectionNavAreaCont .sel-nav-section', '.sel-nav-container ', 1, '#selSlideNext', '#selSlidePrev', 4);
                }
        }

        $('#selectionNavArea .sel-nav-container').on('click tap',function () {
            var navIndex = $(this).index();
            $(this).closest('.selection-product-panel').find('.selection-display-switcher').children().hide().removeClass('sel-cont-active');
            $(this).closest('.selection-product-panel').find('.selection-display-switcher').children().eq(navIndex).show().addClass('sel-cont-active').find('img.lazy').lazy({bind:'event',delay:0});
            $(this).addClass('active-nav').siblings().removeClass('active-nav');
        }); /* Moved this code to Selection Page level. */
        
        global_function.selection_nav_script();
        global_function.list_nav_script();
        global_function.list_nav_more_append();
        //fe header javascript
        var $fe_header = $('#fe_header');
        $(document).on('click', '#fe_header #close', function () {
            if (typeof localStorage === 'object') {
                localStorage.setItem('febarclose', 'true');
            }
            $(this).fadeOut();
            $(this).siblings('.fe_data').find('.fe_desp,.right').fadeOut(300, function () {
                $fe_header.animate({width: 90}, 300);
                $fe_header.removeClass('expanded').addClass('collapsed');
            });

        });
        $(document).on('click', '#fe_header #open', function () {
            if (typeof localStorage === 'object') {
                localStorage.setItem('febarclose', 'false');
            }
            $fe_header.removeClass('collapsed').addClass('expanded');
            $fe_header.animate({width: '100%'}, 300, function () {
                $(this).find('.fe_desp,.right.current').fadeIn(300);
                $fe_header.find('#close').fadeIn();
            });

        });
		global_function.smoothScroll();
    }
}


$(function () {
    global_function.initialize(); 
});

if(location.pathname == "/customer/login"){
    $(function (){
        $('.input-field').trigger('focus');  
       });   
   } 
    