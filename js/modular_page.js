$(function () {
//    Modular solution Banner script
    $('.mod-pg-banner-col').on('mouseenter', function () {
       $('.mod-pg-banner-col').removeClass('active').addClass('deactive');
       $(this).addClass('active').removeClass('deactive');
    });
    $('.mod-pg-banner-col').on('mouseleave', function () {
        $('.mod-pg-banner-col').removeClass('active deactive');
    });
    $('.st-mod-kitchen-sec .st-mod-explore-btn').on('click', function () {
        $('.mod-pg-banner-wrap,.st-thik-mod-wrap').hide();
        $('.st-mod-kw-tabs-ext-wrap').show();
        $('.st-mod-kw-tab-kitchen').click();
        $('.dydc-form-btn-sticky').addClass('dydc-btn-hidden');
    });
    $('.st-mod-wardrobe-sec .st-mod-explore-btn').on('click', function () {
        $('.mod-pg-banner-wrap,.st-thik-mod-wrap').hide();
        $('.st-mod-kw-tabs-ext-wrap').show();
        $('.st-mod-kw-tab-wardrobe').click();
        $('.dydc-form-btn-sticky').addClass('dydc-btn-hidden');
    });
//    Modular solution tabs script
    $('.st-mod-kw-tab-kitchen').on('click', function () {
        $('.st-mod-kw-tab-wardrobe').removeClass('active');
        $(this).addClass('active'); 
        $('.st-wardrobe-pg-wrap').hide();
        $('.st-kitchen-pg-wrap').show();      
        $('.dydc-form-btn-sticky').addClass('dydc-btn-hidden');
    });
    $('.st-mod-kw-tab-wardrobe').on('click', function () {
        $('.st-mod-kw-tab-kitchen').removeClass('active');
        $(this).addClass('active');
        $('.st-kitchen-pg-wrap').hide();
        $('.st-wardrobe-pg-wrap').show();
        $('.dydc-form-btn-sticky').addClass('dydc-btn-hidden');
    });
    /*-----Find Your Dream Kitchen section js [tab & filter]-----*/
                $(".mngmo-fydk-tab li a").on("click", function (e) {
                    e.preventDefault();
                    var offsetLeft = $(this).position().left,
                            width = $(this).innerWidth() / 2;
                    $(".mngmo-fydk-tab li a").removeClass("active");
                    $(this).addClass("active");
                    $(".fltr-triangle").css("left", offsetLeft + width - 5);
                });

                $(".mngmo-fydk-tab").on("click", "li", function (e) {
                    var dataList = $(this).attr("data-list");
                    $(".mngmo-fydk-fltr li").css("display", "none");
                    $(".mngmo-fydk-fltr li[data-list='" + dataList + "']").css("display", "inline-block");
                    if ($(this).hasClass("allstyle")) {
                        $(".mngmo-fydk-fltr> ul > li").css("display", "inline-block");
                    }
                });

                $(".mngmo-fydk-fltr ul li a").on("click", function (e) {
                    e.preventDefault();

                });


                /*-----Check Out the FAQs section js [Accordion]-----*/
                $(".accord-data").hide();
                $(".accord-data").first().show();
                $(".acco-ttl").first().addClass('active');
                $(".accordian_container").find(".acco-ttl").on("click", function () {
                    $(".acco-ttl").removeClass("active");
                    $(this).addClass("active");
                    $(this).next().slideDown("slow");
                    $(".accord-data").not($(this).next()).slideUp('fast');
                });

                /*--- form js ---*/
                $(document).scroll(function () {
                    var top = $('.mngmo-dydc-form').position().top;
                    var sectionHeight = $('.mngmo-dydc-form').innerHeight();
                    var formBottom = top + sectionHeight;
                    if ($(this).scrollTop() > formBottom) {
                        $('.st-kitchen-pg-wrap .dydc-form-btn-sticky').removeClass('dydc-btn-hidden');
                    } else {
                        $('.st-kitchen-pg-wrap .dydc-form-btn-sticky').addClass('dydc-btn-hidden');
                    }
                    
//                    for wardrobe
                    var wartop = $('.primo-book-con-wrap').position().top;
                    var warsectionHeight = $('.primo-book-con-wrap').innerHeight();                   
                    var formBottom = wartop + warsectionHeight;
                    if ($(this).scrollTop() > formBottom) {
                        $('.st-wardrobe-pg-wrap .dydc-form-btn-sticky').removeClass('dydc-btn-hidden');
                    } else {
                        $('.st-wardrobe-pg-wrap .dydc-form-btn-sticky').addClass('dydc-btn-hidden');
                    }
                });                
   
});

$(document).ready(function () {
    $('#city').select2();
});