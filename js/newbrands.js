/**
 * All Brands page script
 */
"use strict";

var PF = PF || {};
var totalPageItems = 33;

// force utilities library
if ( typeof PF.UTILITIES === 'undefined' ) {
	(function() {
        window.root_url     = ( typeof root_url   === 'undefined' ) ? 'http://'  + window.location.hostname : root_url;
		window.secure_url   = ( typeof secure_url === 'undefined' ) ? 'https://' + window.location.hostname : secure_url;
		var _node   = document.createElement( 'script' );
		_node.type  = 'text/javascript';
		_node.src   = ( ( window.location.protocol === 'http:' ) ? root_url : secure_url ) + '/js/utilities.js';
		document.getElementsByTagName( 'head' )[ 0 ].appendChild( _node );
	})();
}

if ( typeof PF.BRANDS === 'undefined' ) {
    (function (z, $) {
        var utils = z.UTILITIES;
        var o = {
            d : $(document),
            w : $(window),
            filterContainerSel : '#allBrandsContainer',
            persistentScrollThreshold : .75,
            productsGridSel : '#brandList',
            nextPageLoadInProgress : false,
            isBackBtnEvent : false,
            noMoreProductsHtml : '<div id="no_more_products" class="clearfix">That\'s it! No more brands to display</div>',
            brands : {
                click : {
                    '#brandCategoryTabAll a' : ['PF.BRANDS.filterClick','#page'],
                    '#brandsCategoryList li:not(.selected) a' : ['PF.BRANDS.filterClick','#page'],
                    '#brandsCategoryList li.selected a' : ['PF.BRANDS.preventDefault','#page'],
                    '#CategoryMoreLink' : ['PF.BRANDS.viewMoreCategories','#page'],
                    '#brandsCategorySortContainer a.brands-cat-more-txt' : ['PF.BRANDS.viewMoreSubCategories','#page'],
                    '#brandsCategoryListMore div.brands-category-more-list-cont li:not(.selected) a' : ['PF.BRANDS.filterClick','#page'],
                    '#brandsCategoryListMore div.brands-category-more-list-cont li.selected a' : ['PF.BRANDS.preventDefault','#page']
                },
                change : {},
                mouseover : {
                    '#brandsCategorySortContainer a.brands-cat-more-txt' : ['PF.BRANDS.viewMoreSubCategories','#page']
                },
                mouseleave : {
                    '#brandsCategoryListMore' : ['PF.BRANDS.viewMoreSubCategories','#page']
                }
            },
            init : function() {
                o.itemsOnLoad = totalPageItems;
                o.itemsPerLoad = totalPageItems;
                o.nextPageUrl  = root_url + "/site_product/getInfiniteDataNew";
                o.is_brand_page=true;
                o.template_type=false;
                o.totalItem=totalPageItems;//total_product_count;
                o.totalPages=Math.ceil(parseInt(o.totalItem)/32);
                o.totalPages=(o.totalPages>0)?o.totalPages:1;
                o. _pageData = [];
                o.loaded=true;
                o.curPage=1;
                o.initRestOf();
                if (window.location.hash && typeof localStorage === 'object') {
                    var data = localStorage.getItem('back_pos_inf-' + window.location.hash.replace('#',''));
                    if (data !== null) {
                        var _obj = JSON.parse(data);
                        if (_obj.page > 1) {
                            // we don't want back to product functionality for products clicked on page 1
                            // as this would disable persistent scroll as well
                            o.isBackBtnEvent = true;
                           // o.scrollToLastProductPosition(_obj);
                        }
                    }
                    o.deleteLocalData('back_pos_inf');
                }
                
                o.filterAndPageCommonInit();
            },
            initRestOf : function(initPage,maintainStatus){
                if(typeof initPage === 'undefined' || isNaN(initPage)){
                    var currentPageSet=utils.getParameterByName('p');
                    if(currentPageSet !=''){
                        o.curPage=parseInt(currentPageSet);
                    }else{
                     o.curPage=1;
                    }
                }else{
                    o.curPage=parseInt(initPage);
                }
                //Return false if pagination not exist for any category 
                if($('#pagination').length == 0 ) {
                    return false;
                }
                var $pagination = $('#pagination');
                $pagination.twbsPagination('destroy');
                o.totalPages=Math.ceil(total_count/totalPageItems); 
                $('#pagination').twbsPagination({
                    totalPages: o.totalPages,
                    visiblePages: 5,
                    prev:'<span class="prv-arrow"></span>',
                    next:'Next <span class="next-arrow"></span>',
                    last:'',
                    startPage: o.curPage,
                    initiateStartPageClick: false,
                    onPageClick: function (event, page) {
                        o.curPage = parseInt(page); // overrinding the value to get net page data
                        var queryStr = utils.replaceQueryString(window.location.search, 'p', page);
                        var arrayKeyStr=page;
                        if (o._pageData[arrayKeyStr]) {
                            history.pushState(page, "page " + page, queryStr);
                            $('#brandList div.card-2by1').html(o._pageData[arrayKeyStr]);
                            //need to reinitialize lazy loading
                        } else {
                        	o.viewMoreBrands(page);
                            //o.getDOMElements(page);
                        }
                        if(o.curPage==o.totalPages){
                            $("#subscriptionSection").show();
                        }else{
                            $("#subscriptionSection").hide();
                        }
                        utils.lazyloadInit();
                        //o.domtextChange();
                        
                    }
                });
                //inialize lazy loading
               utils.lazyloadInit();
               
            },
            filterAndPageCommonInit : function() {
            	
            	
                o.catMaxHeight = $('#brandCategoryTabAll').outerHeight(true);
                if (o.catMaxHeight > 165) {
                    $('#CategoryMoreLink').slideDown();
                }
                //lazy load code
                o.productsGrid = $(o.productsGridSel);
                
                if (o.productsGrid.length) {
                    o.productsGridTopOffset = o.productsGrid.offset().top;
                }
                
                o.totalItems = total_count;
                if (utils.isNumber(o.totalItems))
                    o.remainingProductCount = o.totalItems - o.itemsOnLoad;
                else
                    o.remainingProductCount = 0;
                if (o.remainingProductCount <= 0) o.remainingProductCount = 0;
                utils.lazyloadInit();
            },
            viewMoreBrands : function(page, callback) {

                var brand_html = '';
                var image_path = '';
                
                var arr = $.map(brands_data, function(el) { if(typeof el.info != 'undefined' && el.info.name){ return el } });
                //console.log(arr);
                
                var displayed_cnt 	= $('.brand-containerr').length;
                var brands_arr 		= arr.splice((page-1)*totalPageItems,totalPageItems);
                    
                    $.each(brands_arr, function(index, product){ 
                        
                        if(typeof product.info != 'undefined' && product.info.name){ 
                        
                            brand_html += '<div class="brand-card pf-col lg-4 sm-6 margin-bottom25">';
                            brand_html += '<div class="brand-container pf-white brnd-prd-wrpr">';
                            brand_html += '<a href='+product.info.url+'>';
                            brand_html += '<div class="brnd-ttl-img">';
                            brand_html += '<div class="brand-img-wrpr">';
                            if(product.info.img_path && typeof product.info.img_path != 'undefined'){
                                image_path = product.info.img_path;
                            }else{
                                image_path = img_src;
                            }
                            brand_html += '<img class="lazy" src="'+img_src+'"  data-src="'+product.info.img_path+'" alt="" />';
                            brand_html += '</div>';
                            
                            brand_html += '<div class="brnd-prdct-ttl">';
                            brand_html += '<p class="pf-text-dark-grey font-20 pf-margin-0">'+product.info.name+'</p>';
                            brand_html += '</div></div>';
                            
                            brand_html += '<div class="brnnd-prdct-dtails">';
                            if(product.info.starting_from && typeof product.info.starting_from != 'undefined'){
                                brand_html += '<p class="pf-text-dark-grey pf-bold-txt font-13 pf-margin-0">Starting Rs. '+utils.currencyFormat(product.info.starting_from)+'</p>';
                            }
                            if(product.info.style && typeof product.info.style != 'undefined'){
                                brand_html += '<p class="pf-text-grey font-13 pf-margin-0"><span class="pf-semi-bold-text">Traits: </span><span>'+product.info.style+' </span></p>';
                            }
                            
                            if(product.info.material && typeof product.info.material != 'undefined'){
                                brand_html += '<p class="pf-text-grey font-13 pf-margin-0"><span class="pf-semi-bold-text">Material: </span><span>'+product.info.material+'</span></p>';
                            }
                            brand_html += '</div></a></div></div>';

                    }
                });
                
                $('#brandList div.card-2by1').html(brand_html);
                $('#page_number').html(page);
                if(callback !== true){
                    var queryStr = utils.replaceQueryString(window.location.search, 'p', page);
                    history.pushState(page, "page "+page, queryStr);
                }
                o._pageData[page] = brand_html;
                $('html, body').animate({ scrollTop: $('#brandsCategoryContainer').offset().top }, 'slow');
                utils.lazyloadInit();
                
            },
            viewMoreCategories : function() {
                var $brandCatTab = $('#brandCategoryTab');
                $brandCatTab.toggleClass('cat-expand');
                if ($brandCatTab.hasClass('cat-expand')) {
                    $(this).find('a').text('LESS');
                    $brandCatTab.css('maxHeight', o.catMaxHeight);
                } else {
                    $(this).find('a').text('MORE');
                    $brandCatTab.css('maxHeight', 165);
                }
            },
            viewMoreSubCategories : function(e) {
                if (e.type === 'mouseover') {
                    $('#brandsCategoryListMore').fadeIn();
                    if (global_function)
                    global_function.niceScroll();
                    return;
                } else if (e.type === 'mouseleave') {
                    $('#brandsCategoryListMore').fadeOut();
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
                $('#brandsCategoryListMore').fadeToggle();
                if (global_function)
                global_function.niceScroll();
            },
            preventDefault : function(e) {
                e.preventDefault();
                e.stopPropagation();
            }
        };
        z.BRANDS = o;
    }( PF, $));
    
    $( document ).ready(function() { 
        PF.BRANDS.init();
        
        window.onpopstate = function(event) {
        	//var currState = history.state;    	
            var tempcurPage =event.state;
            tempcurPage=getParameterByName('p');
//             if(tempcurPage==null ||  typeof tempcurPage === 'undefined' ){
             if(tempcurPage =='' ){
                tempcurPage=1;
            }
            tempcurPage=parseInt(tempcurPage);
            if(PF.BRANDS._pageData[tempcurPage]){
            	$('#brandList .card-2by1').html(PF.BRANDS._pageData[tempcurPage]);
            	$('#page_number').html(tempcurPage);
            }
            else{
                $('#brandList .card-2by1').html(PF.BRANDS.viewMoreBrands(tempcurPage,true));
                $('#page_number').html(tempcurPage);
            }
            PF.BRANDS.initRestOf(tempcurPage);
        };

        if($('.srch-rslt-more').length > 0){
        	$(".srchrslt-more-box ").mCustomScrollbar({axis:"y"});
        }
    });
}

/* Search page start here */
$(function() {	
	$('.brndpage-select-box select').select2(); /*brand page select 2 use */
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