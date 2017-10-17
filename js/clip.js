var timeout;
var old_qry = '';
var page_url = '';
var params = {};
var price_max = price_min = 0;
var forder = [];
var use_filter = false;
var isTSELayout = false;
var show_filter = false;
var cnt_scroll = 0;
var back_scroll_to_top = true;
var back_forth_flag = true;
var inf_result = [];
var listLength = 0;
var index = -1; //To count no of scroll made in brand filter

function siblings_scroll() {
    // Call to clip top scroll arrow visibility as per scroll width and element length
    $('.clip_scroller_inner a.active').prependTo('.clip_scroller_inner');
    var clipmenu_scnt = 0, clipmenu_showlength = clip_top_scroll_showlength(), clipmenu_flag = 0 ;
    var s1_length = $('.clip_scroller_inner a').length;
    var act_top_scroll_el;

    $('#clip_scroll_next').click(function(e){
            if(clipmenu_scnt>=0 && clipmenu_scnt<(s1_length-clipmenu_showlength) && clipmenu_flag == 0){
                    act_top_scroll_el = $('.clip_scroller_inner a.default').next();
                    $('.clip_scroller_inner a').removeClass('default');
                    act_top_scroll_el.addClass('default');
                    clipmenu_flag = 1;
                    clipmenu_scnt++;			
                    $('.clip_scroller_inner').animate({left: '-'+(parseInt($('.clip_scroller_inner a.default').position().left))}, 400, function() {clipmenu_flag = 0;});
                    
                    if(clipmenu_scnt == s1_length-clipmenu_showlength){
                            $(this).addClass('invisible');
                    }
                    check_for_width(clipmenu_scnt);
                    $('#clip_scroll_prev').removeClass('invisible');
            }
    });
    $('#clip_scroll_prev').click(function(e){
            if(clipmenu_scnt>0 && clipmenu_scnt<=(s1_length-clipmenu_showlength) && clipmenu_flag == 0){
                    act_top_scroll_el = $('.clip_scroller_inner a.default').prev();
                    $('.clip_scroller_inner a').removeClass('default');
                    act_top_scroll_el.addClass('default');
                    clipmenu_flag = 1;
                    clipmenu_scnt--;
                    single_clipmenu_width = $('.clip_scroller_inner a.default').width() + 48;
                    if( clipmenu_scnt == 0 ){
                            $('.clip_scroller_inner').animate({left: 0}, 400, function() {clipmenu_flag = 0;});
                    }else{
                            $('.clip_scroller_inner').animate({left: '-'+(parseInt($('.clip_scroller_inner a.default').position().left))}, 400, function() {clipmenu_flag = 0;});
                    }			
                    $('#clip_scroll_next').removeClass('invisible');
                    if(clipmenu_scnt == 0){
                            $(this).addClass('invisible');
                    }
                    

            }
    });
}
function clip_top_scroll(){
	var clip_top_scroll_width = 0;
	$('.clip_scroller_inner a').each(function(){
		clip_top_scroll_width += $(this).outerWidth() + 24;
	});
	if($('.clip_scroller_inner').width() > clip_top_scroll_width){
		$('#clip_scroll_prev, #clip_scroll_next').css('display','none');
	}
}
function clip_top_scroll_width(){
	var clip_top_scroll_width = 0;
	$('.clip_scroller_inner a').each(function(){
		clip_top_scroll_width += $(this).outerWidth() + 24;
	});
	return clip_top_scroll_width;
}
function clip_top_scroll_showlength(){
	var clip_top_scroll_width = 0;
	var showlength = 0;
	$('.clip_scroller_inner a').each(function(){
		clip_top_scroll_width += $(this).outerWidth() + 24;
		if(clip_top_scroll_width < $('.clip_scroller_inner').width()){
			showlength++;
		}
	});
	return showlength-1;
}

//Code to come back on previous location from VIP while using infinite scroll
function save_pos(data){
    if (typeof localStorage === 'object') {
        var randomString = Math.random().toString(36).slice(2);
        history.pushState({}, '', document.URL.split("#")[0]+'#'+randomString);
        var bf_pos = {value: data, timestamp: Math.round(new Date().getTime()/1000) }
        try {
            localStorage.setItem("back_pos_inf-"+randomString, JSON.stringify(bf_pos));
        } catch (e) {}
    }
    //localStorage.setItem("back_cat-"+randomString, window.location.href);
}
function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}

var pCount = 1;
var fetchData = true;
var nextPage = 1;
var multiplier = 1;
//function for fetch data for infinite scrolling 
function fetchNextPageData(prev_page_flag){
    //console.log('pCount '+pCount);
    prev_page_flag = typeof prev_page_flag !== 'undefined' ? prev_page_flag : false;
    var prodctCnt;
    cnt_scroll++;
    fetchData = false;
    var q = old_qry;
    pCount++;
    
    q = replaceQueryString(q, 'p', pCount);
    q = replaceQueryString(q, 'is_search', is_search);
    if (typeof(is_brand_page)!=='undefined' && is_brand_page !== 'false') {q += '&is_brand_page=true';}
    if ($('.clip_sofa_col').length > 0){q += '&isTseList=1';}
    if (current_cat_id > 0 && q.indexOf('?cat=') != 0) {q += '&cat='+current_cat_id;}
    if (brands_name.length > 1) {q += '&brandsname='+brands_name;}
    var ga_url = replaceQueryString(document.URL,'p', pCount);
    q = q.substring(q.lastIndexOf("?"));
    
    //var loading_html = '<div id="infinite_loading" class="infinite_loading clearfix">Loading...</div>';
    var tot_cat_cnt = $('#total_product_count').text();
    // 81 = Costant for first time load items in scroll. 30 = Constant for vie more items per scroll.
    if (pCount == 2) {
        prodctCnt = tot_cat_cnt-80;
    } else if (pCount > 2) {
        prodctCnt = tot_cat_cnt-(80+(32*(pCount-2)));
    }
    
    //console.log('Product cnt'+prodctCnt);$("#searchProductList").
    if(pCount > 3 && !prev_page_flag){
        if(prodctCnt > 0) {
            var loading_view_more_html = '<div class="clearfix"></div><div id="loading_view_more" class="infinite_loading clearfix"><a class="load_more" id="tmp_button" onclick="loadMoreAjaxContent(\''+q+'\',\''+ga_url+'\',\''+prev_page_flag+'\',\''+pCount+'\');">Click here to view more '+prodctCnt+' products...</a></div>';
        }else {
            var loading_view_more_html = '<div class="clearfix"></div><div class="infinite_noresult clearfix">That\'s it! No more items to display</div>';
        }
        $("#searchProductList").append(loading_view_more_html);
        setTimeout(function () {$('.infinite_noresult:first').addClass('inactive');}, 5000);
    }
    else {
        if( tot_cat_cnt > 80 && prodctCnt > 0 ) {
            loadMoreAjaxContent(q,ga_url,prev_page_flag,pCount);
        }
    }   
}

function evaluate_pixel(tag) {
	if(document.getElementById(tag) != null && document.getElementById(tag).length != 0) {
		var tag1 = document.getElementById(tag).innerHTML;
		tag1 = eval(tag1);
		socio(tag1);
	}
}

jQuery.fn.nav_filter = function (pos, top){
		this.css('top',top);
		this.css("position",pos);
		//this.css("left", ($(window).width() / 2) - (this.outerWidth() / 2));
		return this;
}


function socio(param){
	product = param;
	(function(){
		var s   = document.createElement('script');
	    var x   = document.getElementsByTagName('script')[0];
	    s.type  = 'text/javascript';
	    s.async = true;
	    s.src   = ('https:'==document.location.protocol?'https://':'http://')
	    	+ 'ap-sonar.sociomantic.com/js/2010-07-01/adpan/pepperfry-in';
	    x.parentNode.insertBefore( s, x );
	})();
}

// Listener when user click a product and returns to the previous url, 
// page should auto-scroll to the clicked product along with the previous pages loaded using infinite scroll
;(function ($, window) {
var intervals = {};
var removeListener = function(selector) {
        if (intervals[selector]) {
                window.clearInterval(intervals[selector]);
                intervals[selector] = null;
        }
};
var found = 'waitUntilExists.found';
$.fn.waitUntilExists = function(handler, shouldRunHandlerOnce, isChild) {
        var selector = this.selector;
        var $this = $(selector);
        var $elements = $this.not(function() { return $(this).data(found); });
        if (handler === 'remove') {
                removeListener(selector);
        }
        else {
                $elements.each(handler).data(found, true);
                if (shouldRunHandlerOnce && $this.length) {
                        removeListener(selector);
                }
                else if (!isChild) {
                        intervals[selector] = window.setInterval(function () {
                                $this.waitUntilExists(handler, shouldRunHandlerOnce, true);
                        }, 500);
                }
        }
        return $this;
};
}(jQuery, window));

function checkForInfResult(page_number,div_name){
    var continue_with_inf = true;
    for (var k=2; k<=page_number; k++) {
        if (inf_result[k] === undefined){
            continue_with_inf = false;
        }
    }
    if (continue_with_inf && typeof inf_result !== undefined && inf_result.length > page_number) {
        var inf_rrr = '';
        for (var k=2; k<=page_number; k++) {
            if (inf_result[k] !== undefined){
                inf_rrr += inf_result[k];
            } else {
                console.log('Page not loaded '+k);
            }
        }
        pCount = parseInt(page_number);
        $("#clip_grid").append(inf_rrr);
        
        //console.log('checkForInfResult TRUE');
        if (typeof remove_back !== undefined) {
            clearTimeout(remove_back);
        }
    } else {
        if (typeof remove_back !== undefined) {
            var remove_back = setTimeout(function(){checkForInfResult(page_number,div_name);}, 100);
        }
    }
}

$(document).ready(function() {
    // infinite scroll - back to prev position
    if(back_forth_flag && typeof localStorage === 'object' && window.location.hash && localStorage.getItem("back_pos_inf-"+window.location.hash.replace('#','')) != null)
    {
        try {
            back_forth_flag = false;
            back_scroll_to_top = false;
            var product_number = 0,
            page_number = 0,
            div_name = '',
            key = "back_pos_inf-"+window.location.hash.replace('#',''),
            bf_pos_2 = JSON.parse(localStorage.getItem(key));
            //going to break URL and find product and page location
            var bs_pos_loc = bf_pos_2.value.split(":");
            product_number = bs_pos_loc[0];
            page_number = bs_pos_loc[1];

            //div of previously stored product
            div_name = '#p_' + product_number + '_' + page_number;
            if (page_number > 0){
                    for (var j=2; j<=page_number; j++) {
                        fetchNextPageData(true);
                    }
                    checkForInfResult(page_number,div_name);
                    //coming back on source location
                    $(div_name).waitUntilExists(function() {
                        $('html, body').animate({scrollTop: $(div_name).offset().top - 160}, 0, function(){after_content_load();});
                    });
            }
            //removing localStorage
            //localStorage.removeItem(key);
            for(var i=0, len=localStorage.length; i<len; i++) {
                key = localStorage.key(i);
                if (key != null && key.indexOf("back_pos_inf") > -1) {
                    bf_pos_3 = JSON.parse(localStorage[key]);
                    var now = Math.round(new Date().getTime()/1000);
                    if ((now-bf_pos_3.timestamp) > 600) {
                        localStorage.removeItem(key);
                    }
                }
            }
            //history.pushState({}, '', document.URL.split("#")[0]);
        } catch(e) {}
    } else if (window.location.hash && back_scroll_to_top) {
        //history.pushState({}, '', document.URL.split("#")[0]);
        back_scroll_to_top = false;
        $('body,html').animate({scrollTop: 0}, 100);
    }
    
    
//    Nisha Uchil
//    Created to 'Add to wish list' to CLIP
//    And for other social icons 
   var productSocialMediaActivity = new (function productSocialMediaActivity(){
        /* ---- Social Media Product Like/Dislike ----- */
        var _self = this;        
        this.getMakeWishRes = function(pid){            
//            dType = 'https:' == location.protocol ? 'json' : 'jsonp';
                $.ajax({
                    url: root_url+"/customer_wishlist/add",
                    dataType: 'json',
                    data: 'product_id='+pid,
                    type: "POST",
                    beforeSend: function() {},
                    success: function(data){                         
                        return data;
                    },
                    error: function(x,y,z){
                        alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
                        return false;
                    },always:function(){                       
                    }
                });
        }  

   }); 
   
    $('#clip_grid').on('click', '.add_to_wishlist', function(){
        
        // Add to wish list if not
        if(!($(this).hasClass('selected'))){
            var prd_id = $(this).closest('div.clip_col').data('pid');
            var data = productSocialMediaActivity.getMakeWishRes(prd_id);
            $(this).addClass('selected');
        }        
        
    });
    
    //Brand Search Start
    /* @Added by : Amol
     * Below event will handle brand search(Filter at left hand side)
     */
    $( document ).on( 'change', 'input#brand_search' , function(e){
        index = -1;

        var $t = $( '#brands_filter' ).children('input');
        var listFind = $t.siblings().find( 'li' );
        countLiInBrandSearchFilter( listFind );
        //v_scroll_reinitialize();
    });
    /* @Added by : Amol
     * Below event will handle brand search(Filter at left hand side) 
     * It will handle both keypress of up arrow key and down arrow key
     */
    $( document ).on( 'keydown', 'input#brand_search', function(e){
        var $t = $( '#brands_filter' ).children('input');
        var scrollDiv = $( '#brands_filter .v_scroll' ).jScrollPane().data( 'jsp' );

        var listFind = $t.siblings().find( 'li' );
        countLiInBrandSearchFilter( listFind );
        /* In case of down arrow key => e.keyCode == 40 & In case of up arrow key => e.keyCode == 38
         * This will take care of moving up and down selection of brands
         */
        if ( e.keyCode == 40 && index < ( listLength - 1 ) ) {
            $t.siblings().find( 'li' ).each(function () {
                $( this ).removeClass( 'filterSelected' );
            });

            index++;

            $t.siblings().find( 'li:visible' ).eq( index ).addClass( 'filterSelected' );

            var chkSelected = withinArea( '#brands_filter .check_list', '.filterSelected' );

            if ( chkSelected == false ) {
                scrollDiv.scrollToElement( '.filterSelected', '',200 );
            }

            return false;
        } else if ( e.keyCode == 38 && index > 0 ) {
            index--;

            $t.siblings().find( 'li' ).each(function () {
                $( this ).removeClass( 'filterSelected' );
            });

            $t.siblings().find( 'li:visible' ).eq(index).addClass( 'filterSelected' );

            var chkSelected = withinArea( '#brands_filter .check_list', '.filterSelected' );

            if ( chkSelected == false ) {
                scrollDiv.scrollToElement( '.filterSelected','',200 );
            }
        }
        // This will handle enter event on brand and filter the result
        if ( e.keyCode == 13 ) {
            e.preventDefault();
            $t.siblings().find( 'li.filterSelected' ).find( 'input' ).trigger( 'click' );
        }
    });
    //Brand Search End
});

function loadMoreAjaxContent(url,ga_url,prev_page_flag_var,pCountVar){
    //console.log('in loadMoreAjaxContent for page '+pCountVar);
    prev_page_flag_var = typeof prev_page_flag_var !== 'undefined' ? prev_page_flag_var : false;
    var loading_html = '<div class="clearfix"></div><div id="infinite_loading" class="infinite_loading clearfix">Loading...</div>';
    var q = url;
    $.ajax({
        url: root_url + "/site_product/getInfiniteData" + q,
        async: true,
        type: "GET",
        beforeSend: function (){
            $("#clip_grid").append(loading_html);
            if($('#loading_view_more').length > 0) {
                $('#loading_view_more').remove();
                $('#clip_grid > .clearfix').first().remove();
            }
        },
        success: function (d){
            var data = $.parseJSON(d);
            if( (data.gtm_data != undefined) && (data.gtm_data.length > 0) ){
                setGtmData(data.gtm_data);
            }
            
            $('#infinite_loading').remove();
            $('#clip_grid > .clearfix').first().remove();
            //********************** pagination start 
            if(data.header_pagination != 'undefined') {
                if($('link[rel="prev"]').length > 0) {
                    $('link[rel="prev"]').remove();
                }
                if($('link[rel="next"]').length > 0 ) {
                    $('link[rel="next"]').remove();
                }
                $('head').append(data.header_pagination);
            }
            //********************** pagination end 
            if (prev_page_flag_var === true && data.status != false) {
                //console.log('in loadMoreAjaxContent SUCCESS for page '+pCountVar);
                inf_result[pCountVar] = data.html;
            } else {
                //$("#clip_grid").append('<div class="clearfix"></div>');
                $("#clip_grid").append(data.html);
            }
            $(".clip_box a:not(.addto_cart_1)").click(function(){
                save_pos($(this).attr('href').split("pos=")[1]);
            });
            after_content_load();
            if(data.status == false) {
                fetchData = false;
                setTimeout(function () {$('.infinite_noresult:first').addClass('inactive');}, 5000);
                return false;
            } else {
                //If Google analytics is detected push a trackPageView, so PJAX pages can 
                //be tracked successfully.
                if(window._gaq) _gaq.push(['_trackPageview', ga_url]);
                fetchData = true;
            }

        },
        error: function (d, f, e) {
                console.log("There is some error during fetching data");
                //alert('There is some error');
        }
    });
}

function onLoadChangeSeoPagination() {
    var tot_cat_cnt_temp = $('#total_product_count').text();
    var temp_head_append = '';
    if($('link[rel="prev"]').length > 0) {
        $('link[rel="prev"]').remove();
    }
    if($('link[rel="next"]').length > 0 ) {
        $('link[rel="next"]').remove();
    }
    if(tot_cat_cnt_temp > 80) {
        var next_href_temp_attr = '';
        if(window.location.search == '') {
            next_href_temp_attr = window.location+'?p=2';
        }
        else {
            var tmpQstr = window.location.search;
            if(tmpQstr.indexOf("p=") == '-1'){
                next_href_temp_attr = window.location+'&p=2';
            }
            else {
                next_href_temp_attr = updateQueryStringParameterInUrl(window.location,'p',2);
            }
        }
        temp_head_append += '<link href="'+next_href_temp_attr+'" rel="next" />';
    }

    $('head').append(temp_head_append);
}

function updateQueryStringParameterInUrl(uri, key, value) {
    uri = uri.href;
    var re = new RegExp("([?|&])" + key + "=.*?(&|#|$)", "i");
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    } 
    else {
        var hash =  '';
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";    
        if( uri.indexOf('#') !== -1 ){
            hash = uri.replace(/.*#/, '#');
            uri = uri.replace(/#.*/, '');
        }
        return uri + separator + key + "=" + value + hash;
    }
}



/* Created by : Yogita Shingte
 * Function : check_in_wishlist()
 * Work : - Created for 'Add to wishlist' click on CLIP pgs
          - Takes input as array of product ids and makes ajax call to the function which returns json encoded product ids which are already in any of the two wishlist's session arrays (i.e. in 'customer_wishlist_items'-for logged users and 'wishlist_arr'-for non-logged in users)
*  */
function check_in_wishist(pids){  
    $.ajax({
        url:root_url+'/site_product/check_in_wishlist',
        data:'pids='+pids,
        type:'post',
        success:function(data){
            data = $.parseJSON(data);
            return data;
        },
        error:function(){

        }
    });
}

// reskinning js starts here

function product_title_init() {
    /*
    var display_filters = readCookie('display_filters');
    if (display_filters == 0) {
                $('#filter_toggle').text('Show Filters').removeClass('active');
                $('#clip_sidebar').css({'margin-left': "-190px",opacity: "0"});
                $('#clip_grid').addClass('full_width');
    }
    */
    var char_limit = 48;
    if ($('.clip_sofa_grid').length > 0) { char_limit = 104; }
    $(".clip_box .nt").each(function(){
        var text = $(this).text();
        if (text.length > char_limit) {
            var text_sub = text.substring(0, char_limit) + ' ...';
            $(this).data('n',text).data('nt',text_sub).text(text_sub);
        } else {
            $(this).removeClass('nt');
        }
    }).hover(
          function() {
            $(this).text($(this).data('n'));
          }, function() {
            $(this).text($(this).data('nt'));
          }
    ).removeClass('nt');
}

// call after next page content is loaded on scroll or click
function after_content_load() {
    $("img.lazy").lazy({
        bind:'event',
        threshold:1000,
        beforeLoad: function(element) {element.removeClass("lazy");},
        onLoad: function(element) {element.addClass("loading");},
        afterLoad: function(element) {element.removeClass("loading").addClass("loaded");},
        onError: function(element) {console.log("image loading error: " + element.attr("src"));}
    });
    // on loading more pages, scroll 1px to trigger the lhs/rhs block positioning
    $(window).scrollTop($(window).scrollTop()+1);
    product_title_init();
    add_to_cart_tooltip_init();
}

// hide/show side filter
function filter_toggle() {
        var filter_toggle = ('#filter_toggle');
        if ($(filter_toggle).hasClass('active')){
                $(filter_toggle).text('Show Filters').removeClass('active');
                //createCookie('display_filters',0,7);
                $('#clip_sidebar').animate({marginLeft:-190,opacity:0}, 150);
                $('#clip_grid').addClass('full_width');
        } else {
                $(filter_toggle).text('Hide Filters').addClass('active');
                //createCookie('display_filters',1,7);
                $('#clip_sidebar').animate({marginLeft:0,opacity:1}, 300);
                $('#clip_grid').removeClass('full_width');
        }
}

function filter_req(id) {
        var e = $('#f_' + id);
        var ea = e.siblings('a:not(.inactive)');
        if (ea.length > 0) {
            if(e.is(':checked')) {
                    e.attr('checked', false);
                    ea.removeClass('active');
            } else {
                    e.attr('checked', true);
                    ea.addClass('active');
            }
            invoke_p(ea.data('q'));
        }
}

function filter_price_req(event){
    try {
        if (numcheck(event) !== false) {
            if (event.keyCode == 13) {
                $('#set_price').trigger('click');
            }
        } else {
            event.preventDefault();
            return false;
        }
    } catch (e) {
        throw "filter_price_req returned some error"
    }
}

function filter_brand_search() {
    // brands search in filters
    var brand_block = '';
    if ($('#brands_filter .jspPane').length > 0) { brand_block = '#brands_filter .jspPane'; }
    else if ($('#brands_filter ul').length > 0) { brand_block = '#brands_filter ul'; }
    if( $('#brand_search').is(':visible') && brand_block.length > 0 ) {
        $('#brand_search').fastLiveFilter(brand_block);
        $(document).on('keyup','#brand_search', function(){
            //$('#brands_filter .jspPane').css({'top':'0'});
            //v_scroll_reinitialize();
            var listFind = $(this).siblings().find('li');
            countLiInBrandSearchFilter(listFind);
        });
    }
}

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    return this;
}

function set_loader() {
	$('#search-loader-container').show();
}

function remove_loader() {
        $('#search-loader-container').hide();
	evaluate_pixel('socialdynamictag');
}

function add_to_cart_tooltip_init() {
    $('.addto_cart_1:not(.tooltip):not(.clip_oos)').attr('tip','Add To Cart').addClass('tooltip');
    $('.clip_oos:not(.tooltip)').attr('tip','Sold Out!').removeAttr('onclick').addClass('tooltip');
    $('.addto_cart_1.conf:not(.clip_oos)').removeAttr('onclick').attr('href',function(){return $(this).parent().parent().siblings('.title_1').find('a').attr('href') + '&act=atc';}).removeClass('conf');
}

function check_for_width(clipmenu_scnt){
    if (typeof(clipmenu_scnt)==='undefined') clipmenu_scnt = 0;
    var clip_scroller_inner = $(".clip_scroller_inner").width();
    var count_anchor = $(".clip_scroller_inner a").length;
    var total_occupied_anchor_width = 0;
    if(clip_scroller_inner !== null){
        for(var i=clipmenu_scnt+1;i <= count_anchor; i++){
            var width_anchor = $(".clip_scroller_inner a:nth-child("+i+")").width();
            var paddT = $(".clip_scroller_inner a:nth-child("+i+")").innerWidth() - $(".clip_scroller_inner a:nth-child("+i+")").width();
            var margT = $(".clip_scroller_inner a:nth-child("+i+")").outerWidth(true) - $(".clip_scroller_inner a:nth-child("+i+")").outerWidth();
            total_occupied_anchor_width = total_occupied_anchor_width + width_anchor + paddT + margT; 
        }

    
        total_occupied_anchor_width = Math.ceil(total_occupied_anchor_width);
        clip_scroller_inner = Math.ceil(clip_scroller_inner);
        if(total_occupied_anchor_width < clip_scroller_inner){
            $("#clip_scroll_prev").addClass("invisible");
            $("#clip_scroll_next").addClass("invisible");
        }
    }
}

$(function() {
    if ($.pjax.defaults) {
        $.pjax.defaults.timeout = 5000;
        $.pjax.defaults.maxCacheLength = 0;
    }
    product_title_init();
    add_to_cart_tooltip_init();
    $("img.lazy").lazy({ visibleOnly: true,threshold:1000,enableThrottle: true,throttle: 250,beforeLoad: function(element){element.removeClass("lazy");}});
    price_min = $("#min_price").val();
    price_max = $("#max_price").val();
    check_for_width();
    siblings_scroll();
    filter_brand_search();
    $(document).on('click','#clip_sortby_wrap a,#set_price', function() {
        if (this.id !== 'set_price') { this.id = 'sel-sort'; }
        clip_sort_request(this);
    });
    if ($('#clip_top_tag_cloud_wrap ul').length > 0) {
        var clip_tag_cloud_max_height  = $('#clip_top_tag_cloud_wrap ul').height();
        var clip_tag_cloud_real_height = parseInt($('#clip_top_tag_cloud_wrap ul')[0].scrollHeight) + 1;
        if (clip_tag_cloud_real_height > (clip_tag_cloud_max_height + 10)) {
                $('#show_more_cat_tags').show().click(function() {
                        var clip_tag_cloud_real_height = parseInt($('#clip_top_tag_cloud_wrap ul')[0].scrollHeight) + 1;
                        $(this).toggleClass('less');
                        if ($(this).hasClass('less')) {
                                var clip_top_tag_height = clip_tag_cloud_real_height;
                                var clip_top_tag_text = 'Show less';
                        } else {
                                var clip_top_tag_height = clip_tag_cloud_max_height;
                                var clip_top_tag_text = 'Show more';
                        }
                        $('#clip_top_tag_cloud_wrap ul').animate({
                                'max-height': clip_top_tag_height + 'px'
                        }, 500, function() {
                                $('#show_more_cat_tags').text(clip_top_tag_text);
                        });
                });
        }
    }
    $(document).on('click','.share_social a', function() {
        var social_type = $(this).attr('class');
        var social_parent = $(this).parent().parent();
        var social_parent_anchor = social_parent.siblings('a');
        var social_url = social_parent_anchor.attr('href');
        var social_img = social_parent_anchor.find('img').attr('src');
        var social_name = social_parent.siblings('.title_1').text();
        switch(social_type) {
            case 'facebook':
                window.open('http://www.facebook.com/sharer/sharer.php?u='+social_url,'target=_parent','width=820,height=455');
                break;
            case 'twitter':
                window.open('http://twitter.com/home?status=Check out '+ social_name +' '+ social_url +' @pepperfry','target=_parent','width=820,height=455');
                break;
            case 'pinterest':
                var social_desc = $(this).attr('data-desc');
                social_desc = social_desc.replace(/<p>/g, "");
                social_desc = social_desc.replace(/<\/p>/g, "");
                social_url = social_url.split("?")[0];
                window.open('http://pinterest.com/pin/create/button/?url='+ social_url +'&media='+ social_img +'&description=' + social_desc,'popUpWindow','height=550,width=700,left=200,top=50,resizable=yes,scrollbars=no,toolbar=no,menubar=no,location=no,directories=no,status=no');
                break;
            default:
                break;
        }
    });
});

function invoke_p(url) {
    
    // To resolve the fallback issue in ie8
    var splitUrl = url.split('?');
    var frond_end_url = splitUrl[0];
    var data = decodeURIComponent(splitUrl[1].replace(/\+/g, ' '));
    
    // Changing the method to get and sending data separately for fallback issue in ie8
    $.pjax({ url:frond_end_url, data: data, container: '#content', method: 'GET' });
}
$(document).on('pjax:beforeSend', function() {
    set_loader();
});
$(document).on('pjax:success', function() {
    pCount = 1;
    nextPage = 1;
    multiplier = 1;
    fetchData = true;
    index = -1;
    remove_loader();
    //v_scroll_reinitialize();
    filter_brand_search();
    $(window).unbind('scroll');
    stickyScroll();
    $("img.lazy").lazy({
        bind:'event',
        threshold:1000,
        beforeLoad: function(element) {element.removeClass("lazy");},
        onLoad: function(element) {element.addClass("loading");},
        afterLoad: function(element) {element.removeClass("loading").addClass("loaded");},
        onError: function(element) {console.log("image loading error: " + element.attr("src"));}
    });
    product_title_init();
    add_to_cart_tooltip_init();
    $('body').removeClass('fixed_active');
    $('.header:first').removeClass('fix_header');
    
    try {
        $(window).scroll(function(){
		if($('.fix_pos').length > 0 && $(window).scrollTop() >= $('.fix_pos').offset().top){
			if(!($('body').hasClass('fixed_active'))){
				$('body').addClass('fixed_active');
			}
		}else{
			$('body').removeClass('fixed_active');
		}
                // Header fix call for tab view
                //header_fix();
                // Back to top visibility
		if($(window).scrollTop() > 100){
			$('#back-top').stop('true','true').fadeIn(250);
		}else{
			$('#back-top').fadeOut(250);
			//clearTimeout(btop_tout);
                }
	});
    } catch(e) {console.log('floating header init error');}
    
});

function clip_sort_request(element) {
        var q = old_qry,global_sort_option = '';
	q = replaceQueryString(q, 'p', 1);
        
	if (element.id == 'set_price') {
		if ($.trim($("#min_price").val()) == '' && $.trim($("#max_price").val()) == '') {
			q = replaceQueryString(q, 'price', price_min+encodeURIComponent('-')+price_max);
		} else {
			price_min = $("#min_price").val();
			price_max = $("#max_price").val();
                        
                        // changes for min and max price
                         if(price_min >= 1000) {
                            price_min = Math.floor(price_min/1000) * 1000;
                        } else {
                            price_min = Math.floor(price_min/100) * 100;
                        }
			 
                        if(price_max >= 1000) {
                            price_max = Math.ceil(price_max/1000) * 1000;
                        } else {
                            if(price_max==0){price_max=100; }
                            price_max = Math.ceil(price_max/100) * 100;
                        }
			 
			q = replaceQueryString(q, 'price', price_min+encodeURIComponent('-')+price_max);
 		}
                invoke_p(page_url + q);
	} else if (element.id == 'sel-sort' && $(element).data('sort') != '') {
            if ($(element).hasClass('sortby_price') || !$(element).hasClass('active')) {
			global_sort_option = $(element).data('sort');
            }
	}
	if (global_sort_option != '') {
		var gsort = global_sort_option.split('-');
		q = replaceQueryString(q, 'order', encodeURIComponent(gsort[0]));
		q = replaceQueryString(q, 'dir', encodeURIComponent(gsort[1]));
                invoke_p(page_url + q);
	}
}
// reskinning js ends here
//Brand Search Start
/*@Added by : Amol
 * This Function will calculate number of brands[Active] present at Left hand side brand search filter
 * Arguments: object of li 
 * Function will not return anything, will just set global variable "listLength"
 */
function countLiInBrandSearchFilter(listF) {
    var tmpCnt = 0;
    for(var li in listF) {
        if (listF.hasOwnProperty(li) && !isNaN(li)) {
            if(typeof $(listF[li]).attr('style') != 'undefined'){
                if($(listF[li]).attr('style') != 'display: none;') {
                    if(!($(listF[li]).find('a').hasClass('inactive'))){
                        tmpCnt++;
                    }
                }
            }
            else {
                if(!($(listF[li]).find('a').hasClass('inactive'))){
                    tmpCnt++;
                }
            }
        }
    }
    listLength = tmpCnt;
}
/*@Added by : Amol
 * Calculate area
 */
function withinArea(parent, child) {
    var parentBottom = $(parent).height() + $(parent).offset().top,
        parentTop = $(parent).offset().top,
        childTop = $(child).offset().top,
        childBottom = $(child).height() + $(child).offset().top;

    if (childTop >= parentBottom || childBottom <= parentTop) {
        return false;
    }
    else {
        return true;
    }
}
//Brand Search End
