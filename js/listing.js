"use strict";
var PF = PF || {};
if( typeof PF.LISTING === 'undefined' ) {
    (function (z, $) {
        var l = {
            init : function() {
                $('.clip-main-cat-wrpr li a').click(function(){
          $('.clip-main-cat-wrpr li').removeClass('active')
          $(this).parent().addClass('active');
        });

                var sliderParentWidth  = $('.clip-main-cat-wrpr').outerWidth();
                var sliderChildWidth = 0;

        $('.clip-main-cat-wrpr li').each(function() {
         sliderChildWidth += $(this).outerWidth();
        });

        if(sliderParentWidth < sliderChildWidth){
                    $('.clip-main-cat-wrpr').addClass('clip-cat-slider');
                    $('.clip-main-cat-wrpr').removeClass('clip-main-wrap-cat');
                    // var sliderHeight = $('.clip-main-cat-wrpr').children().height() + 5;
                    // $('.clip-main-cat-wrpr').children().css({height: sliderHeight});

                    var maxheight=0;
                    $(".clip-main-cat-wrpr").children().each(function () {
                        maxheight = ($(this).height() > maxheight ? $(this).height() : maxheight);
                    });
                    $('.clip-main-cat-wrpr').children().css({height: maxheight});



        }
                else{
            $('.clip-main-cat-wrpr').addClass('clip-main-wrap-cat');
                        $('.clip-main-cat-wrpr').removeClass('clip-cat-slider');
        }

        $('.clip-cat-slider').flickity({
                    pageDots: false,
                    cellAlign: 'left',
                    accessibility: false,
                    contain: true,
                    groupCells: 3
                });

                $('.clip-subcat-container li a').click(function(){
                      $('.clip-subcat-container li').removeClass('active')
                      $(this).parent().addClass('active');
        });

                $('.clip-sbcatmore-sctn').hide();

                $('#clipSubcatbtn').on('click', function (e) {
                        $('.clip-subcat-moreicn').toggleClass('clip-subcat-moreicn-clicked');
                        $('.clip-sbcatmore-sctn').fadeToggle(500);
                        $('.clip-pricehtol-fltr').hide();
                        $('.clip-custom-drpdwn').hide();
                        e.stopPropagation();
                });

                $('.clip-sbcatmore-sctn').on('click', function(e) {
                        e.stopPropagation();
                });

                $(document).bind('click', function (e) {
            $('.clip-sbcatmore-sctn').hide();
            $('.clip-subcat-moreicn').removeClass('clip-subcat-moreicn-clicked');
        });

                $('.sticky-ndhlp-btn').on('click', function(e) {
                    $('.clip-needhelp-container').addClass('clip-needhelp-containerShow');
                    $('.clip-sticky-needhlp').removeClass('block-display');
                    e.stopPropagation();
                });
				
				$('.clip-need-hlp-btn').on('click', function(e) {
                  $('.clip-needhelp-container').addClass('clip-needhelp-containerShow');
                  $('.clip-sticky-needhlp').removeClass('block-display');
                  $('.clip-need-hlp-btn').hide().addClass("active");
                  e.stopPropagation();
                });
				
                $('.clip-needhlp-clsbtn').on('click', function() {
                    if($('.clip-need-hlp-btn').hasClass("active")) {
                      $('.clip-needhelp-container').removeClass('clip-needhelp-containerShow');
                      $('.clip-need-hlp-btn').show().removeClass("active");
                    } else {
                      $('.clip-needhelp-container').removeClass('clip-needhelp-containerShow');
                      $('.clip-sticky-needhlp').addClass('block-display');
                    }
                });

                $(document).on('click', function(e) {
                    $('.clip-needhelp-container').removeClass('clip-needhelp-containerShow');
//                    $('.clip-sticky-needhlp').addClass('block-display');
                    $('.clip-need-hlp-btn').show();
                });

                $(document).on('keydown', function(e) {
                    if ( e.keyCode === 27 ){
                            $('.clip-needhelp-container').removeClass('clip-needhelp-containerShow');
							$('.clip-sticky-needhlp').addClass('block-display');
                            $('.clip-need-hlp-btn').show();
                    }
                });

                $('.clip-needhelp-container').on('click', function(e) {
                    e.stopPropagation();
                });

                $('#clipBrndSrch .brnd-btn-done').on('click', function(){
                    $('#clipBrndSrch input[type="checkbox"]').removeClass('doneOnce');
                    $('#clipBrndSrch input[type="checkbox"]').each(function(){
                            if($(this).is(':checked')){
                                $(this).addClass('doneOnce');
                            }
                    });
                });

                $('#clipBrndSrch .popup-close, .popup_overlay').on('click', function(){
                    $('#clipBrndSrch input[type="checkbox"]').attr("checked",false);
                    $('#clipBrndSrch .doneOnce').each(function(){
                        $(this).prop('checked', true);
                    });
                });


                $('.cstmDrpdwn').click(function(){
                    l.drpDwnAttr = $(this).attr('data-attr');
                    l.currentOpendDrpdwn = $('#' + l.drpDwnAttr);
                    l.drpDwnInputs = $(l.currentOpendDrpdwn).find('input[type="checkbox"]');

                    /*DropDown manage Block start here*/
                    l.customDropdown();

                    $('#'+l.drpDwnAttr+' .brnd-btn-done').on('click', function() {
                      l.applyBtn();
                    });

                    $('#'+l.drpDwnAttr+' .drpdwn-closebtn').on('click', function() {
                      l.cancelBtn();
                    });

                    $(l.currentOpendDrpdwn).on('click', function(e) {
                        e.stopPropagation();
                    });

					$('.clip-custom-drpdwn .clip-drpdwn-cntnt').on('scroll', function () {
				       $('body').css('overflow-y' , 'hidden');
				    });

                });


                /*dimension dropdown*/
                $('.switch-on-off input').on('click', function() {
                        if ($(this).is(':checked')) {
                                $(this).parent().parent()
                      $('.clip-dmsn-grtrthn').addClass('active');
                      $('.clip-dmsn-lsthn').removeClass('active');
                    } else {
                        $('.clip-dmsn-lsthn').addClass('active');
                        $('.clip-dmsn-grtrthn').removeClass('active');
                    }

                  });

                $('.clip-lessgrtr-lbl').on('click', function() {
        $('.clip-lessgrtr-lbl').removeClass('active');
          $(this).addClass('active');
          if($('.clip-dmsn-lsthn').hasClass('active')) {
            $(this).siblings('.clip-dmnsn-onoffbtn').children().children('input').prop('checked' , false);
          } else {
            $(this).siblings('.clip-dmnsn-onoffbtn').children().children('input').prop('checked' , true);
          }
      });

                $('.clip-dmsn-cntnt input').keyup(function() {
                    var dimensionSize = $(this);
                    if(isNaN(dimensionSize.val())){
                        dimensionSize.val(dimensionSize.val().match(/[0-9]*/));
                    }
                });

                // $('.drpdwn-price-htol').on('click', function(e) {
                //         $('.clip-pricehtol-fltr').slideToggle();
                //         $('.clip-sbcatmore-sctn').hide();
                //         $('.clip-custom-drpdwn').hide();
                //         e.stopPropagation();
                // });


                $('.drpdwn-price-htol').on('click', function(e) {
                        $('.clip-pricehtol-fltr').slideToggle();
                        $('.clip-sbcatmore-sctn').hide();
                        $('.clip-custom-drpdwn').hide();
                        e.stopPropagation();
                });

                $('.clip-pricehtol-fltr li').click(function(){
                      $('.clip-pricehtol-fltr li').removeClass('selected')
                      $(this).addClass('selected');
                      $('.clip-pricehtol-fltr').hide();
        });

                $('.clip-pricehtol-fltr').on('click', function(e){
                    //e.stopPropagation();
                });
                $(document).bind('click', function (e)
                {
            $('.clip-pricehtol-fltr').hide();
        });

                $('.clip-lstview-btn').on('click', function(event) {
                    $('.clip-grid-view').fadeOut(500);
                    $('.clip-list-view').fadeIn(500);
                    $(this).addClass('active');
                    $('.clip-grdview-btn').removeClass('active');
                });

                $('.clip-grdview-btn').on('click', function(event) {
                    $('.clip-grid-view').fadeIn(500);
                    $('.clip-list-view').fadeOut(500);
                    $(this).addClass('active');
                    $('.clip-lstview-btn').removeClass('active');
                });

                if($('.clip-sticky-header').length == 1) {
                  $(".clip-sticky-header").before('<div class="clip-sticky-header-height"></div>');
                  $(".clip-sticky-header-height").css("height", $(".clip-sticky-header").height());

                }

                var stickyTopPos= $('.filter-content-block').offset().top;
                $(window).scroll({
                  previousTop: 0
                }, function () {
                  var currentTop = $(window).scrollTop();
                  var stickyHeight = $('.clip-sticky-header').outerHeight();
                  if ((currentTop > this.previousTop) && (currentTop > stickyTopPos)) {
                    if($(".clip-subctgry-container").outerHeight() == null) {
                      var stickyWrapHeight = $(".clip-ctgry-container").outerHeight();
                    } else {
                      var stickyWrapHeight = $(".clip-ctgry-container").outerHeight() + $(".clip-subctgry-container").outerHeight();
                    }

                    $('.clip-sticky-header').addClass('sticky-container').css("top", "-" + stickyWrapHeight + "px");
                    $('.clip-sticky-header-height').show();
                    $('.clip-sticky-needhlp').addClass('block-display');
                  } else if (currentTop > this.previousTop) {
                    $('.clip-sticky-header').removeClass('sticky-container anim');
                    $('.clip-sticky-needhlp').removeClass('block-display');
                    $('.clip-sticky-header-height').hide();
                  } else if (currentTop < stickyTopPos) {
                    setTimeout(function(){
                      $('.clip-sticky-header').removeClass('sticky-container anim');
                      $('.clip-sticky-header-height').hide();
					  $('.clip-sticky-needhlp').removeClass('block-display');
                    }, 10);
                  } else {
                    $('.clip-sticky-header').addClass('sticky-container anim').css("top", "0px");
                  }
                  this.previousTop = currentTop;
                });



                    $('.clip-tab-cntnt .pf-tablinks').on('click',function(){
                        var dataAttr = $(this).attr('data-attr')
                        $('.clip-tab-cntnt .pf-tablinks').removeClass('active');
                        $(this).addClass('active');
                        $('.pf-tabcont').removeClass('active');
                        $('.clip-tab-cntnt').find('#' + dataAttr).addClass('active');
                    });
                    /* code for CLIP Bottom slider */
                    if($('.clip-btmslider-parent').length > 0){
                    	$('.clip-btmslider-parent').slick({
                            infinite: false,
                            speed: 300,
                            slidesToShow: 2,
                            variableWidth: true
                        });
                    }

            /* this code is for feedback widget */
            $('#fdbck-wdgt-nobtn').on('click ', function() {
              $('.fdbck-wdgt-form').fadeIn();
              $('#fdbckWidgtBtn').removeClass('pf-disabled');
            });

           $('#fdbck-wdgt-yesbtn').on('click', function(event) {
                    $('.fdbck-wdgt-form').fadeOut();
                    $('#fdbckWidgtBtn').removeClass('pf-disabled');
            });

            },
            customDropdown: function() {
                $(l.currentOpendDrpdwn).slideToggle('fast');
        $(document).bind('click', function (e) {
                    var myopenedDrpdwn = $(e.target);
                    if (!myopenedDrpdwn.parents().hasClass('custmDrpdwnContainer')) {
                        $(l.currentOpendDrpdwn).hide();
                    }

                    l.resetAllcheckbox();
                });

        $(document).on('keydown', function(e) {
                    if ( e.keyCode === 27 ){
                        var openedDrpdwnCstm = $(e.target);
                        if (!openedDrpdwnCstm.parents().hasClass('custmDrpdwnContainer')) {
                            $(l.currentOpendDrpdwn).hide();
                        }

                        l.resetAllcheckbox();
                    }
        });

                $('.filter-content-block .clip-custom-drpdwn').each(function() {
                  $(this).hide();
                });
        l.currentOpendDrpdwn.show();
            },
            applyBtn :function(e) {
                $('#'+l.drpDwnAttr+' input[type="checkbox"]').removeClass('doneOnce');
            $('#'+l.drpDwnAttr+' input[type="checkbox"]').each(function(){
                if($(e).is(':checked')){
                            $(e).addClass('doneOnce');
                }
            });
          $(l.currentOpendDrpdwn).hide();
              //if($("#"+l.drpDwnAttr +" input[type=checkbox]:checked").length>0){
                PF.CLIP.applyFilter();
              //}

            },
            resetAllcheckbox :function(e) {
                $('#'+l.drpDwnAttr+" input[type='checkbox']:not('.doneOnce')").attr("checked",false);
                 $('#'+l.drpDwnAttr+' .doneOnce').each(function(){
                  $(this).prop('checked', true);
                });
                $('body').css('overflow-y' , 'auto');
            },




            cancelBtn:function (e) {
                l.resetAllcheckbox(e);
                $(l.currentOpendDrpdwn).hide();
            }

        };
        z.LISTING = l;
    }( PF, $));
}

$(document).ready(function() {
    PF.LISTING.init();

    /* this code is for bottom email Subscribe block */
    $(function() {
        $('.clip-eml-scrb-box input').on('blur', function() {
            $(this).parent().removeClass('clip-focus-border');
        }).on('focus', function() {
                $(this).parent().addClass('clip-focus-border');
        });
    });

        /*Brands collection related code : starts here*/
        if(typeof $('.brnd-clctn-slideblck').slick !== 'undefined'){
            $('.brnd-clctn-slideblck').slick('unslick');
        }
        if ($('.brnd-clctn-imgwrpr').length == 3){
             var $html = $('.brnd-clctn-slideblck .brnd-clctn-imgwrpr').clone();
             $('.brnd-clctn-slideblck').append($html);
        }
        var collectionSlider = $('.brnd-clctn-slideblck').slick({
               speed: 300,
               infinite: true,
               slidesToShow: 3,
               slidesToScroll: 1,
               centerMode: true,
               //centerPadding: '37%',
               autoplay: true,
               autoplaySpeed: 2000,
               focusOnSelect: true
        });


        function curentSliderId() {
            var collectnCntntShow  = $('.slick-center').attr('data-slide');
            $('.brndclctn-sldecnt-sctn .brnd-clctn-cnt').hide();
            $('.brndclctn-sldecnt-sctn #' + collectnCntntShow ).show();
        }

        collectionSlider.on('init beforeChange afterChange', function(event, slick, currentSlide, nextSlide) {
            curentSliderId();
        });

        if($('.category-select').length>0){
            $('.category-select').select2();
        }
        /*Brands collection related code : ends here*/
});


// $(window).resize(function(event) {

//  var listItems = $('.clip-subctgry-lists .clip-subcat-list').length;
//  var lastItem = $('.clip-subctgry-lists').children().last()
//  var scndLstItems = lastItem -1;

//  // console.log($(lastItem).html())

//  if ($(window).width() > 1155){
//          console.log('above 1156')
//  } else if ($(window).width() < 1155 && $(window).width()> 1024){
//        $(lastItem).remove();
//  } else if ($(window).width() < 1024 && $(window).width()> 768){
//       scndLstItems.remove();
//      console.log('above 768')
//  }
// });


/* Search page start here */


$(function() {
    $('.srch-rslt-maincat-wrpr li a').click(function(){
         $('.srch-rslt-maincat-wrpr li').removeClass('active')
         $(this).parent().addClass('active');
    });

    /* more button start here */
    $('#srchrslt-more-btn').on('click', function() {
        $('.srchrslt-more-box').fadeToggle();
        $('#srchrslt-more-btn .more-icn').toggleClass('clip-subcat-moreicn-clicked');
    });

    $('.srchrslt-more-box, #srchrslt-more-btn').on('click', function(e) {
    e.stopPropagation();
  });

    $(document).bind('click', function (e) {
        $('.srchrslt-more-box').hide();
        $('#srchrslt-more-btn .more-icn').removeClass('clip-subcat-moreicn-clicked');
    });

});
