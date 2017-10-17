var monthNames = ["01", "02", "03", "04", "05","06", "07", "08", "09", "10", "11","12"];
var timeoutid =0;
var utils = PF.UTILITIES;
$(function () {
    $(".studio-dropdown").on("click", function () {
        $('#popup_overlay_studio').toggle();
        $(this).toggleClass("arrow-up");
        if($(this).hasClass("arrow-up")){
            $(this).parent(".studio-dropdown-box").css("z-index",999);
        }else{            
            $(".studio-dropdown").parent(".studio-dropdown-box").css("z-index",9);
        }
    });
    $("#popup_overlay_studio").on("click", function () {
        $('#popup_overlay_studio').toggle();
        $('.studio-dropdown').toggleClass("arrow-up");
        $(".studio-dropdown").parent(".studio-dropdown-box").css("z-index",9);
    });

    //Studio Dropdown hover Studio image change ends
    //Studio Gallery thumbnail show script starts

    $('.studio-gallery-slide').on('click', function () {
       $(".studio-gallery-slide").removeClass("selected");        
       $(this).addClass("selected");
        var studiogalthumb = $(this).data('img');
        $('.studio-gallery-image img').attr('src', studiogalthumb);
    });


    //Make sticky to city
   $(document).scroll(function () {
       var scroll = $(this).scrollTop();
       if($(".studio-dropdown-box").length>0){
            var dropdownOffset = $(".studio-dropdown-box").position();
           if (scroll > dropdownOffset.top) {
               $('.studio-hdr-sec').addClass("fixed");
           } else {
               $('.studio-hdr-sec').removeClass("fixed");
           }
       }       
   });    
   
    //Studio Gallery thumbnail show script ends
  /*-----START TAB JS-----*/
    var i = 0, changeTab = 2000, timer;
    tab();
    function tab() {
        var clickTab = $('[tab-open]');        
        $(".tab-content:first").show();        
        $(".studio-right-sec > .tab-content:first").show();
        clickTab.on('click', function (e) {
            var tabAttr = $(this).attr('tab-open');
            var curIndex = $(this).index();
            i = curIndex;
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            $('[tab-show="' + tabAttr + '"]').siblings().hide();             
            $('[tab-show="' + tabAttr + '"]').show();   
            $('[tab-show2="' + tabAttr + '"]').siblings().hide();             
            $('[tab-show2="' + tabAttr + '"]').show();       
            e.preventDefault();
        });
    }
    /*var timer;*/
    function startTimer() {
        var clickTab2 = $('.studio-auto-tab [tab-open]');
        timer = setInterval(function (e) {
            if (i < 4) {
                clickTab2.removeClass('active');
                clickTab2.eq(i).trigger('click');
                clickTab2.eq(i).addClass('active');
                i += 1;
            } else {
                i = 0;
            }
        }, changeTab);
    }
    startTimer();

    $(".bulk-tab-wrap.studio-auto-tab").hover(function () {
        clearInterval(timer);
    }, function () {
        startTimer(timer);
    });
    /*-----End TAB JS-----*/

    //Filter by City Name and Date
    $(".evnt-city-fltr input[type='checkbox']").on("click", function(){
        var cityIds = getCitySelectedIds();
        var dateText = $("#isDateSelected").val()=="1"?$("#selectedDate").val():"";
        filterStudioEvents("1",cityIds,dateText,"pageLoad");
    });
    
  
    /* Studio Landing Page JS start */
    $('#studioPinInput').on('click', function(){
        $('#studioOverlay').show();
        $('.studio-pin-wrap').addClass('studio-pin-shadow');
        if($('.studio-pin-chk .error-text').css('display') == 'block') {
            $('.studio-pin-chk .error-text').hide();
        }
    });

    /*PINCODE VALIDATION*/
    $('#studioPinSubmit').on('click', function(){
        var pincode, $CO;
        $CO = $(this).closest('.studio-pin-input').siblings('.error-text');
        pincode = $('#studioPinInput').val();
        if (pincode === '' || pincode.length < 6 || pincode.length > 6 || isNaN(pincode)) {
            $CO.show();
            $('#studioOverlay, .studio-zero-result, .studio-loct-result').hide();
        }else{
            $CO.hide();
            var url     = window.location.href;
            var new_url = url.substring(0, url.indexOf('?'))+'?pincode='+pincode;
            if(url != new_url){
              history.pushState(null,null,new_url);
            }
            var path  = root_url+"/site_listings/studioPincodeSearchResult";
            var _data = {
              'pincode' : pincode
            };
            var _beforeSend = function () {};
            var _setUpOptions = {};
            var _params = {
              'pincode' : pincode
            };           
            utils.makeRequest( path, 'POST', _data, pincodeSearchResponse, pincodeSearchError, _beforeSend, _params,  _setUpOptions);                   
        }
    });

    $('#studioOverlay').on('click', function(){ 
        $('#studioOverlay').hide();
    });

    $(document).keyup(function(e) {
      if (e.keyCode == 27 && $('#studioOverlay').length > 0) { $('#studioOverlay').hide(); }   
    });

    $('#studioPinInput').keypress(function (e) {
     var key = e.which;
     if(key == 13)  // the enter key code
      {
         $('#studioPinSubmit').trigger('click');
      }
    });  
     /* Studio Landing Page JS end */

    //Added by prathamesh.s to handle window back auto result functionality
    $(window).bind('popstate', function(event) {
      $('#studioPinInput').val(utils.getParameterByName('pincode'));
      if($('#studioPinInput').val() != ''){
        $('#studioPinSubmit').trigger('click');
      }else{
        $('#pincodeSearchResult').html('');
      }
    });

$(document).ready(function(){
    if($('#studioPinInput').val() != ''){
        $('#studioPinSubmit').trigger('click');
    }
    var cityIds = getCitySelectedIds();
    var curDt = new Date();
    var dateText = curDt.getFullYear()+"-"+(curDt.getMonth()+1)+"-"+curDt.getDate();
    initCalender("");
});
});

function pincodeSearchResponse(data){
    if (data.indexOf("Sorry!") > -1){
        $('#studioOverlay').hide();
    }else{
        $('#studioOverlay').show();
    }
    $('#pincodeSearchResult').html(data);
    $('#studioPinSubmit').removeClass('disabled');
}

function pincodeSearchError( _x, _y, _z ) {                        
    // error callback
     $('#studioPinSubmit').removeClass('disabled');
}

function highlightDays(date) {        
        for (var i = 0; i < dates.length; i++) {
            if (dates[i].getTime() === date.getTime()) {
                return [true, 'highlight'];
            }
        }
        return [true, 'disabled'];
    } 
function initCalender(action){
    dt = $("#curDate").val();
    var makeDate = new Date(dt);
    var dateOnly = makeDate.getDate()<10 ?"0"+makeDate.getDate():makeDate.getDate();
    
    if(typeof action!='undefined' && action=='prev'){
        makeDate = new Date(makeDate.setMonth(makeDate.getMonth() - 1));
        dateOnly = '01';
    }
    if(typeof action!='undefined' && action=='next'){
        makeDate = new Date(makeDate.setMonth(makeDate.getMonth() + 1));
        dateOnly = '01';
    }
    $("#curDate").val(makeDate.getFullYear()+"-"+monthNames[makeDate.getMonth()]+"-"+dateOnly);


    $('#datepicker').datepicker({
        numberOfMonths: [1, 1],
        minDate: minEventsMonth,
        defaultDate: makeDate,
        beforeShowDay: highlightDays,
        onSelect: function(d,i){
            var dateText = $.datepicker.formatDate("yy-mm-dd", $(this).datepicker("getDate"));
            $("#selectedDate").val(dateText);
            
            var makeDate = new Date(dateText);
            makeDate = makeDate.getFullYear()+"-"+monthNames[makeDate.getMonth()]+"-"+makeDate.getDate();
            
            $("#actionStartDate").val(":"+dateText);
            var cityIds = getCitySelectedIds();
            $("#isDateSelected").val("1");
            filterStudioEvents("1",cityIds,dateText,"");
            $("#resetDateFilter").css('display','block');
        }
    });
    
    $(document).click(function () {
        $('.ui-datepicker-today a', $(this).next()).removeClass('ui-state-highlight ui-state-hover');
        $('.highlight a', $(this).next()).addClass('ui-state-highlight');                   
    });
}
//Event slider in calender starts
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
function studioEventSlider() {
    $('.date-event-slider-ext-wrap .date-event-slider-wrap').each(function () {
        var children = $(this).children('.date-event-slide').length;
        $(this).siblings('.date-event-cnt-wrap').children('.date-event-cnt-no').text(children);
        if (children > 1)
        {
            productSlider($(this).attr('id'), '.date-event-slide', 1);
        }
        else {
            $('.date-event-slider-ext-wrap .date-event-cnt-wrap,.date-event-slider-ext-wrap .ck-bill-addr-next,.date-event-slider-ext-wrap .ck-bill-addr-prev').hide();
        }
    });
}
//Event slider in calender ends
function studioGallerySlider() {
    $('.studio-gallery-thumb-slider-ext-wrap .studio-gallery-thumb-slider-wrap').each(function () {
        var children = $(this).children('.studio-gallery-slide').length;
        if (children > 4)
        {
            productSlider($(this).attr('id'), '.studio-gallery-slide', 4);
        }
        else {
            $('.studio-gallery-thumb-slider-ext-wrap .ck-bill-addr-prev,.studio-gallery-thumb-slider-ext-wrap .ck-bill-addr-next').hide();
        }
    });
}
//Event ToolTip script 
function mousePosition(el){}

$(document).ready(function () {
    //    Event gallery script starts
global_function.sliderHorizontal('.studio-gallery-thumb-slider-wrap', '.studio-gallery-slide', 1, '.ck-bill-addr-next', '.ck-bill-addr-prev', 4);
    $(document).on('click','.event-gallery-image-thumb ul li', function () {
        var dataImg = $(this).data('img');
        $(this).closest('.event-gallery-image-thumb').siblings('.event-gallery-image').find('img').attr('src', dataImg);
        $('.event-gallery-image-thumb ul li').removeClass('active');
        $(this).addClass('active');
    });
    //    Event gallery script ends
    $(".studio-slect2").select2();
    $('.autoplay').slick({
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        focusOnSelect: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                sslidesToShow: 5,                                                
              }
            },
            {
              breakpoint: 768,
              settings: {
                sslidesToShow: 4,                                                
              }
            }
        ]
    });
    
    //change for slide from ui side
    function expandSlider() {
       setTimeout(function(){             
           $('div.slick-slide').removeClass('.slick-current');
           $(this).addClass("slick-current");
       }, 2000);
   }
    $("div.slick-slide").on("click", function () {     
       expandSlider();
    });
    
    

    $(".slick-slide.slick-active.slick-current").css("width", 371 + 'px');

    $('.highlight .ui-state-default').each(function () {
        var $obj = $(this);
        $(this).on('mouseenter', function (e) {
            $('#EventToolTip').show();
            mousePosition($obj);
        });
        $("#EventToolTip").on('mouseleave', function () {
            $('#EventToolTip').hide();
        });
    });
    $('.brnd-catgry-block select, .brnd-sbcatgry-block select, .brnd-chldcatgry-block select').select2();
});

$(document).ready(function(){

    $("#selectedDate").val("");
    $("#currentPage").val("1");
    
    if($(".evnt-ttl").length>0){
        $(".evnt-ttl").each(function(){
            var titleHeight = $(this).text().length;      
            if(titleHeight > 70){
                $(this).addClass("truncate");
            }else{
                $(this).removeClass("truncate");
            }
        });
    }
    
    $('.gb-scroll').mCustomScrollbar({axis : 'y'});

    $(document).on('click','#eventsNextBtn',function(){        
        var currentPage = (parseInt($("#currentPage").val())+1);        
        var dateText = $("#selectedDate").val().trim();
        var cityIds = getCitySelectedIds();
        filterStudioEvents(currentPage,cityIds,dateText,"nextPage");
        var scrollVal = parseInt($(".studio-events-section").offset().top);
        $(window).scrollTop(scrollVal);
    });
    
    $(document).on('click','#eventsPrevBtn',function(){        
        var currentPage = (parseInt($("#currentPage").val())-1);        
        var dateText = $("#selectedDate").val().trim();
        var cityIds = getCitySelectedIds();
        filterStudioEvents(currentPage,cityIds,dateText,"prevPage");
        var scrollVal = parseInt($(".studio-events-section").offset().top);
        $(window).scrollTop(scrollVal);
    });
    
    $(document).on('click','a.ui-datepicker-prev,a.ui-datepicker-next',function(){
        $("#resetDateFilter").css('display','none');        
        var action = $(this).children("span").text().trim().toLowerCase();        
        var curdate = $("#curDate").val().split("-");        
        curdate = curdate[0]+"-"+curdate[1]+"-01";
        $("#curDate").val(curdate);
        var cityIds = getCitySelectedIds();
        $("#isDateSelected").val("0");
        filterStudioEvents("1",cityIds,curdate,action);
        $("#lastAction").val(action+"Filter");        
        var curDtTemp = curdate.split("-");
        curDtTemp[1] = monthNames[parseInt(curDtTemp[1])-1];        
        $("#actionStartDate").val(action+"Filter"+':'+curDtTemp[0]+"-"+curDtTemp[1]+"-"+curDtTemp[2]);
        
    });
    
    $(document).on('click','#resetDateFilter',function(){
        $("#selectedDate").val("");
        var currentPage = (parseInt($("#currentPage").val())-1);
        var dateText = $("#curDate").val();
        var cityIds = getCitySelectedIds();
        $("#isDateSelected").val("0");
        filterStudioEvents("1",cityIds,dateText,"resetDate");
        $("#resetDateFilter").css('display','none');
        $("#actionStartDate").val('resetDate:'+dateText);
    });
    
    /*Jquery Author Chandan K code : ends here*/
    if($('#productView').find('div[unbxdattr="product"]').length>1){
        $('#productView').find('div[unbxdattr="product"]:visible:last').addClass("last-visible-product");
    }
});

$(window).load(function(){
   $('.cityTab.active').trigger("click");
   //select2 intialization
    $('select').select2({minimumResultsForSearch: -1});
    $('#cat-selection').on('change',function(){
       var catId=$(this).val();
       if(catId !=''){
            $('#productView .cat-grid-view').hide();
            $('#productView #div_'+catId).show();
            var productCount= $('#productView #div_'+catId).find('div[unbxdattr="product"]').length;
            $('#productView #div_'+catId).find('div[unbxdattr="product"]').removeClass('last-visible-product');
            $('#productView #div_'+catId).find('div[unbxdattr="product"]:visible:last').addClass("last-visible-product");
            if(productCount>itemPerPage){
                $('#productView #div_'+catId).find('.stuio-pro-view-more-row').show();
            }
        }
      
    });
    /*Jquery Author Chandan K code : starts here*/

    $('.studio-item-view-more-btn').on('click',function(){
       $(this).parents('.cat-grid-view').find('div[unbxdattr="product"]:hidden').slice(0, itemPerPage).slideDown();
       $(this).parents('.cat-grid-view').find('div[unbxdattr="product"]').removeClass('last-visible-product');
       $(this).parents('.cat-grid-view').find('div[unbxdattr="product"]:visible:last').addClass("last-visible-product");
       if ($(this).parents('.cat-grid-view').find('div[unbxdattr="product"]:hidden').length == 0) {
            $(this).fadeOut('slow');
        }
    });
    
});
function getCitySelectedIds(){
    var cityIds = '';
    $(".evnt-city-fltr input[type='checkbox']").each(function(){ 
        if($(this).is(':checked')){
            cityIds+=$(this).attr('id')+",";
        }
    });
    return cityIds = cityIds.slice(cityIds,-1);
}

function filterStudioEvents(currentPage,cityIds,dateFilter,action,isHover){
    var data = {"p":currentPage,"cityIds":cityIds};
    var actionStartDate = $("#actionStartDate").val().split(":");
    if(action=='prev' || action == 'next'){
        data.action = action+'DtFilter';
        data.strtDt = dateFilter;
    }else if(dateFilter=="" && (action=='nextPage' || action=='prevPage')){
        data.action = action;
        data.strtDt = $("#curDate").val();
    }
    else if(action=='resetDate'){        
        data.action = 'resetDate';
        data.strtDt = dateFilter==""?$("#curDate").val():dateFilter;
    }
    else if(dateFilter!="" && action ==''){
        data.action = action;
        data.date = dateFilter;
    }
    else{
        data.action = action;
        data.date = dateFilter!=""?dateFilter:$("#curDate").val();
    }
    
    data.dateSelected = $("#isDateSelected").val();
    
    var path = root_url+"/site_listings/getStudioEventsHTML";
    $.ajax
    ({ 
        url: path,
        data:data, 
        type: "POST",
        beforeSend : function(){
            $("#studioLoaderOverlay").show();
        },
        success: function(response)
        {
            $("#filterCity").parent("div").replaceWith(response);
        },
        complete:function(msg)
        {
            $("#studioLoaderOverlay").hide();
            $('.gb-scroll').mCustomScrollbar({axis : 'y'});
            $("img.lazy").lazy({bind:"event", delay:0});
            if($(".evnt-ttl").length>0){
                $(".evnt-ttl").each(function(){
                    var titleHeight = $(this).text().length;
                    if(titleHeight > 70){
                        $(this).addClass("truncate");
                    }else{
                        $(this).removeClass("truncate");
                    }
                });
            }
            if(typeof isHover=='undefined'){
                $('#datepicker').datepicker("destroy");
                initCalender(action);
            }
        }
    });
}