var PF = PF || {};
var test=3;
var teste=4;
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

if( typeof PF.CLIP === 'undefined' ) {
    (function (z, $) {
        var utils = z.UTILITIES;
        var o = {
            d : $(document),
            w : $(window),
           
            listenOnPageLoad : {
                click : {
                    //Redesign JS function binding starts here
                    '#searchBrandSrchBox':['PF.CLIP.brandFilterSearch','#page'],
                    '#catAlphates a':['PF.CLIP.filterBrandByLetter','#page'],
                    '.clip-pricehtol-fltr li':['PF.CLIP.orderBy','#page'],
                    '.fltr-rmvbtn':['PF.CLIP.clearFilterTabs','#page'],
                    '.brnd-btn-done':['PF.CLIP.applyBrandFilter','#page'],
                    '.clearAllFilters':['PF.CLIP.clearAllFilters','#page'],
                    'div.clip-lstgrid-btn a' : ['PF.CLIP.viewTypeClick','#page'],
                    '#subscriptionSection .sbscrb-mail-btn' : ['PF.CLIP.emailSubscription','#page'],
                    '.clip-btmcnt-btn' : ['PF.CLIP.toggleRead','#page'],
//                    'div.clip-tabscn-cntnt li a.pf-tablinks' : ['PF.CLIP.suggestionTabhtml','#page'],
                    '#fdbckWidgtBtn' : ['PF.CLIP.feedbackSubmit','#page'],
                    'a#feedbackpopup' : ['PF.CLIP.feedbackResetForm','#page'],
                    '.closeModel' : ['PF.CLIP.closeModel','#page'],
                    '.clip-email-scrb a.oostriger' : ['PF.CLIP.oosSubscrition','#page'],
                    '#load_more_button' : ['PF.CLIP.loadMoreItem','#page'],
                    
                },  
                 mouseover : {
                    'a.clip-heart-icn,a.wishlst-icn,li.last .finishtool' : ['PF.CLIP.toolTipInitialization','#page'],
                    'a.tnb-product-badge' : ['PF.CLIP.toolTipInitialization','#page'],
                 },
                keyup:{
                    '.clip-brnd-srchbx':['PF.CLIP.brandFilterSearch','#page'],
                },
                keydown : {
                    '#dimensionFltr input[data-key="height"],input[data-key="width"],input[data-key="depth"]' : ['PF.CLIP.dimensionKeyDown','#page'],
                    
                }
            },            
            init : function() {
//                 o.filterContainerSel = '.page-wrapper';
                utils.listen(o.listenOnPageLoad);
                //global variable need to define in phtm files
                o.nextPageUrl  = root_url + "/site_product/getInfiniteDataNew";
                o.suggestionTabUrl  = root_url + "/site_product/getSuggestionHtml";
                o.is_search=( typeof is_search   === 'undefined' ) ?false:is_search;
                o.is_collection=( typeof is_collection   === 'undefined' ) ?false:is_collection;
                o.collectionName=( typeof collectionName   === 'undefined' ) ?'':collectionName;
                o.is_brand_page=( typeof is_brand_page   === 'undefined' ) ?false:is_brand_page;
                o.layoutViewType=( typeof layoutViewType   === 'undefined' )?'compact':layoutViewType;
                o.template_type=( typeof template_type   === 'undefined' ) ?false:template_type;
                o.pageLayout=( typeof pageLayout   === 'undefined' ) ?'':pageLayout;
                o.brandsname =( typeof brandsname   === 'undefined' ) ?'':brandsname;
                o.cat=( typeof currentCatId   === 'undefined' ) ?'':currentCatId ;
                o.totalItem=( typeof totalProductCount   === 'undefined' ) ?0:totalProductCount;
                o.totalPages=( typeof totalPage   === 'undefined' ) ?'':totalPage;
                o. _pageData = [];
                o.loaded=true;
                o.iScrollPos=0;
                o.sortApplied=false;
                o.suggetionAjaxCall=false;
                var checkForFilter=getParameterByName('forder');
                o.filter_applied=(checkForFilter=='')?false:true;
                o.curPage=1;
                o.suggestestionFlag = ( typeof suggestestionFlag   === 'undefined' ) ?'':suggestestionFlag;;
                o.searchQs =( typeof searchQs   === 'undefined' ) ?'':searchQs;
                o.initRestOf();
                o.nextPageLoadInProgress = false;
                utils.addListener(o.w,'scroll','PF.CLIP.persistentScroll');
                //for all pages
                if(typeof suggestestionArr !== 'undefined'){
                 o.suggestionTabhtml();
                }
                //for wishlist 
                PF.HEADER.getwishlistcount()
            },
            toolTipInitialization:function(){
                $('[data-tooltip]').hover(function () {
                global_function.tooltip($(this), '#page');
                }, function () {
                $('.pf-tooltip').remove();
                });
            },
            dimensionKeyDown:function(event){
                //console.log(event.which);
//                if(event.which != 8 && event.which != 190 && isNaN(String.fromCharCode(event.which))){
//                    event.preventDefault(); //stop character from entering input
//               }
       if((event.keyCode>=48 && event.keyCode<=57) || event.keyCode==8 || event.keyCode==190 || event.keyCode==9){
//            var enteredValue = String.fromCharCode(event.keyCode)
                var enteredValue = $(this).val();
                var regexPattern = /^\d{0,8}(\.\d{0,2})?$/; 
                if(event.keyCode!= 8 && enteredValue!='' && !regexPattern.test(enteredValue)) {
                     event.preventDefault();
                 }
            }else{
              event.preventDefault();
                
            }
         
            },
            
            //Redesign new JS functions starts here
            brandFilterSearch:function(e){
                var srchBoxTxt = $('.clip-brnd-srchbx').val().trim().toLowerCase();
                //searchBrandSrchBox
                var selectedId=$(this).attr("id");
                if(srchBoxTxt.length>0)
                    {
                        e = e || window.event;            
                        var visibleCnt = false;
                        $('.clip-brnd-card').each(function (){ 
                            var srchVal = $(this).find('ul>li.brnd-main-ttl > a').text().toLowerCase();
                            if(srchVal.substr(0,srchBoxTxt.length) ==srchBoxTxt)
                            { 
                                visibleCnt= true;
                                $(this).show();
                            }
                            else
                            {
                                $(this).hide();
                            }
                        });
                        
                        if(visibleCnt==false && srchBoxTxt.length!=0){
                            $('#noBrandsFound').css("display","block");
                            $('#brandApply').addClass("disabled");
                            
                        }
                        else
                        {
                            $('#noBrandsFound').css("display","none");
                            $('#brandApply').removeClass("disabled");
                        }
                    }
                    else{
                        $('.clip-brnd-card').each(function (){ $(this).css("display","block"); });
                        $('#brandApply').removeClass("disabled");
                        $('#noBrandsFound').css("display","none");
                    }
            },
            suggestionTabhtml : function(){
                if(!o.suggetionAjaxCall){
                  $.ajax({
                url:o.suggestionTabUrl,
                type:"POST",
                data:{data:suggestestionArr,pageLayout:o.pageLayout},
                ///dataType:"json",
                beforeSend:function(){
                    //$('#loaderOverlay').show();
                },
                success:function(data){
                    $("#suggestionDiv").html(data).addClass("active");
                   utils.lazyloadInit();
                   //for initializiting tab
                   $('.clip-tab-cntnt .pf-tablinks').on('click',function(){
                        var dataAttr = $(this).attr('data-attr')
                        $('.clip-tab-cntnt .pf-tablinks').removeClass('active');
                        $(this).addClass('active');
                        $('.pf-tabcont').removeClass('active');
                        $('.clip-tab-cntnt').find('#' + dataAttr).addClass('active');
                    });
                },
                complete:function(){
                    o.suggetionAjaxCall=true;
                  //$('#loaderOverlay').hide();
                 
                }
            });   
                }
              
                
            },
            filterBrandByLetter:function(){
                    $('.clip-brnd-srchbx').val("");
                    $('#brandApply').removeClass("disabled");
                    var alphaCatLetter = $(this).text().trim();
                    $("#catAlphates").find("a").each(function(){
                        $(this).removeClass("selected");
                    });
                    
                    $(this).addClass("selected");
                    
                if(alphaCatLetter=="All" || alphaCatLetter=="#"){
                    if(alphaCatLetter=="#"){
                        if($('#clipBrandCatContainer .clip-brndcrd-row').find('.clip-brnd-card.brand_SPECIAL').length>0){
                            $('#brandApply').removeClass("disabled");
                            $("#noBrandsFound").css("display","none");
                            $('#clipBrandCatContainer .clip-brndcrd-row').find('.clip-brnd-card:not(".brand_SPECIAL")').css("display","none");
                            $('#clipBrandCatContainer .clip-brndcrd-row').find(".clip-brnd-card").filter(".brand_SPECIAL").css("display","block");
                        }
                        else{
                            $('#brandApply').addClass("disabled");
                            $("#noBrandsFound").css("display","block");
                            $('#clipBrandCatContainer .clip-brndcrd-row').find('.clip-brnd-card').css("display","none");
                        }
                    }
                    else{
                        $('#clipBrandCatContainer .clip-brndcrd-row').find('.clip-brnd-card').css("display","block");
                    }
                }
                else{
                    if($('#clipBrandCatContainer .clip-brndcrd-row').find('.clip-brnd-card.brand_'+alphaCatLetter).length>0){
                        $("#noBrandsFound").css("display","none");
                        $('#clipBrandCatContainer .clip-brndcrd-row').find('.clip-brnd-card:not(".brand_'+alphaCatLetter+'")').css("display","none");
                        $('#clipBrandCatContainer .clip-brndcrd-row').find(".clip-brnd-card").filter(".brand_"+alphaCatLetter).css("display","block");
                    }
                    else{
                        $("#noBrandsFound").css("display","block");
                        $('#brandApply').addClass("disabled");
                    }
                }
            },
            orderBy:function(){
                o.sortApplied=true;
                var strText = $(this).text().trim();
                 $('li.clip-drpdwn-flxlist').removeClass('selected');
                $(this).addClass('selected');
                $("#curSortType").text(strText);
                o.applyFilter();
            },
            applyFilter:function()
            {
                var urlKey = {};
                var keys = [];
                $(".filter-section-tabs").find(":not('.disabled')input[type='checkbox']:checked").each(function()
                { 
                    var key = $(this).attr("data-key");                        
                    var value = $(this).attr("data-value");
                    if(forder=="")
                    {
                        forder= key;
                    }
                    else if(forder.indexOf(key)==-1)
                    {
                        forder+=","+key;
                    }
                    keys.push(key);

                    if(!urlKey[key]){                            
                        urlKey[key]= [value];
                    }
                    else
                    {
                        urlKey[key].push(value);
                    }
                });
                keys = $.unique(keys);
                var finalString = "";
                var finalString2 = "";
                var finalString3 = "";
                if(keys.length>0){
                    //finalString= "forder="+keys.toString();
                    finalString = "forder="+forder;
                    keys.forEach(function(val){                    
                        finalString+="&"+val+"="+urlKey[val].toString();
                    });
                }
                $(".filter-section-tabs #dimensionFltr").find("input[type='text']").each(function(){
                    var value = $(this).val().trim();
                    var type = $(".clip-lessgrtr-lbl.active").attr("dim-type");
                    if(value!=""){
                        if(type=='greater-than'){
                            finalString2+="&"+$(this).attr("data-key")+"="+value+"-0";     
                        }else{
                            finalString2+="&"+$(this).attr("data-key")+"=0-"+value;     
                    }
                    }
                });
                
                if(finalString2.length>0){
                    var type = $(".clip-lessgrtr-lbl.active").attr("dim-type");
                    finalString2+="&dimType="+type;
                }
                
                if(finalString.legnth>0){
                    finalString+="&"+finalString2;
                }
                else
                {
                    finalString+=finalString2;
                }
                
                //Sort logic
                if($("#sortBY .clip-drpdwn-flxlist.selected").length>0)
                {
                   var attr = $("#sortBY .clip-drpdwn-flxlist.selected").attr("data-sort").split("-");
                   //for toggling the case
                    if(!o.sortApplied){
                        if(attr[0]=='price') {
                           attr[1]=(attr[1]=='desc')?'asc':'desc';
                        }
                    }else{
                        o.sortApplied=false;
                    }
                   finalString3=utils.replaceQueryString(finalString3, 'order', attr[0]);
                   finalString3=utils.replaceQueryString(finalString3, 'dir', attr[1]);
                   finalString3=utils.replaceQueryString(finalString3, 'p', 1);
                   finalString3=finalString3.replace(/^\?/g, '');
                }
                
                if(finalString.length>0){
                    finalString+="&"+finalString3;
                }
                else
                {
                    finalString+=finalString3;
                }
                
                var splitUrl    = document.URL.split('?');
                var finalUrl = "";
                if(typeof splitUrl[1] == "undefined" || finalString.length>0) //no errors
                {
                    if(o.searchQs!=""){
                         finalUrl+=splitUrl[0]+"?"+o.searchQs+"&"+finalString; 
                    }
                    else{
                        finalUrl+= splitUrl[0]+"?"+finalString; 
                    }
                }
                else
                {
                    finalUrl+=splitUrl[0];
                    if(o.searchQs!=""){
                        finalUrl+="?"+o.searchQs;
                    }
                }
                o.filterClick(finalUrl);
            },
            clearFilterTabs:function(e){
                var key = $(this).attr("data-key");
                var value = $(this).attr("data-value");
                var url = document.URL.split("?")[1];
                $(".filter-section-tabs").find("input[type='checkbox']:checked").each(function()
                { 
                    if($(this).attr('data-value')==value){
                        $(this).removeAttr("checked").removeClass("doneOnce");                       
                    }
                });
                
                $(".filter-section-tabs").find("input[type='text']").each(function(){
                    if( (typeof $(this).attr("data-key") != 'undefined') && $(this).val()!=""){
                        if($(this).attr('data-value')==value && key == $(this).attr("data-key")){
                            $(this).val("");
                        }
                    }
                    
                });
                
                if ($('.clip-fltrd-cnt').length < 2) {
                        $(this).closest('.row').remove();
                } else {
                        $(this).parent().remove();
                }

				var tmpForder = forder.split(",");
                var elePos = $.inArray(key,tmpForder); 
                if(elePos!=-1)
                {
                    tmpForder.splice(elePos,1);
                    forder = tmpForder.toString();
                    utils.replaceQueryString(window.location.search, 'forder', forder);
                }
                
                o.applyFilter();
            },
            clearAllFilters:function(){
                o.sortApplied=false;
                var url = document.URL.split("?")[0];
                var url_querystring = document.URL.split("?")[1]; 
                var finalString3;
                if(o.is_search === true || o.is_brand_page === true) {
                    url = url+"?"+o.searchQs;
                }
                else{
                url = url+"?p=1";
                }
                $(this).closest('.row').remove();
                o.filterClick(url);
            },
            filterClick : function(queryString,callback) {
//                o.filter_applied=true;
                 queryString=queryString.replace(/&+$/, '');
                 queryString=queryString.replace(/\?&/g, '?');
                var splitUrl    =queryString.split('?');
                var data =typeof splitUrl[1] == "undefined"?"":encodeURI(splitUrl[1]);
                if(data ==''){
                    queryString=queryString.replace(/\?+$/, '')
                    data={p:1};
                    queryString+="?p=1";
                }else{
                    queryString = utils.replaceQueryString(queryString, 'p', 1);
                    data        = decodeURIComponent(data.replace(/\+/g, ' '));
                    data        = encodeURI(data);
                    data        = decodeURIComponent(data.replace(/^&/g, ''));
                    data +='&p=1';
               }
                $.ajax({
                url:splitUrl[0],
                type:"GET",
                data:data,
                cache:false,
                beforeSend:function(){
                    $('#loaderOverlay').show();
                },
                success:function(data){
                     $("#page-wrapper-content").html(data);                    
                },
                complete:function(){
                    var initPage=1;
                    //for all pages
                   o.suggetionAjaxCall=false;
                    if(callback===true){
                     initPage='';
                    }else{
//                     history.pushState(1, "page " + 1, queryString.replace(/&+$/, ''));
                     history.pushState(1, "page " + 1, queryString);
                    o.filter_applied=true;
                    }
                    $('body').removeClass('active').find('.popup_overlay').hide();
                    o._pageData=[];
                    PF.LISTING.init();
                    //for no product in response initialization should not initialized
                   if($(".clip-resetall-fltr .clearAllFilters").length<1){
                    o.initRestOf(initPage);
                   }
                   //layout setting
                   if(o.layoutViewType !=''){
                        $("#"+o.layoutViewType).trigger("click");
                    }
                    if(typeof itemData   !== 'undefined'){
                       setGtmData(itemData);
                    }
                   $('#loaderOverlay').hide();
                }
            }); 
               // $.pjax({ url:splitUrl[0], data: data, container: o.filterContainerSel, method: 'GET',timeout:500000});
            },
            viewTypeClick : function(){
                if($(this).attr("data-tooltip")=="Detailed view")
                {
                   o.layoutViewType='detail'; 
                }else{
                   o.layoutViewType='compact' ;
                }
            },
            initRestOf : function(initPage,maintainStatus){
                if(typeof initPage === 'undefined' || isNaN(initPage) || initPage==''){
                    currentPageSet=getParameterByName('p');
                    if(currentPageSet !=''){
                        o.curPage=parseInt(currentPageSet);
                    }else{
                     o.curPage=1;
                    }
                }else{
                    o.curPage=parseInt(initPage);
                }
                var $pagination = $('#pagination');
                $pagination.twbsPagination('destroy');
                o.totalPages = (typeof totalPage === "undefined")?0:totalPage;
                
                if($('link[rel="canonical"]').length === 0) {
                    $('head').append('<link rel="canonical" href="'+window.location.hostname+window.location.pathname+'?p='+(o.curPage)+'" >');
                } else {
                    $('link[rel="canonical"]').attr('href', window.location.hostname+window.location.pathname+'?p='+(o.curPage));
                }
                
                var new_query_string = o.getQueryString();
                
                // if page is greater than one and not equal to total page
                if(parseInt(o.curPage) > 1 && parseInt(o.curPage) !== parseInt(o.totalPages)) {
                    if(parseInt(o.curPage) !== o.totalPages) {
                        if($('link[rel="next"]').length === 0) {
                            $('head').append('<link rel="next" href="'+window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(parseInt(o.curPage) + 1)+'" >');
                        } else {
                            $('link[rel="next"]').attr('href', window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(parseInt(o.curPage) + 1));
                        }
                    }

                    if($('link[rel="prev"]').length === 0) {
                        $('head').append('<link rel="prev" href="'+window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(parseInt(o.curPage) - 1)+'" >');
                    } else {
                        $('link[rel="prev"]').attr('href', window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(parseInt(o.curPage) - 1));
                    }
                }
                
                // if last page
                if(parseInt(o.curPage) === parseInt(o.totalPages)) {
                    if($('link[rel="next"]').length > 0) {
                        $('link[rel="next"]').remove();
                    }

                    if($('link[rel="prev"]').length > 0 && parseInt(o.totalPages) === 1) {
                        $('link[rel="prev"]').remove();
                    } else {
                        if($('link[rel="prev"]').length === 0) {
                            $('head').append('<link rel="prev" href="'+window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(parseInt(o.curPage) - 1)+'" >');
                        } else {
                            $('link[rel="prev"]').attr('href', window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(parseInt(o.curPage) - 1));
                        }
                    }
                }else if(parseInt(o.curPage) === 1) { // first page
                    if($('link[rel="prev"]').length > 0) {
                        $('link[rel="prev"]').remove();
                    }

                    if(parseInt(o.totalPages) > 1) {
                        if($('link[rel="next"]').length === 0) {
                            $('head').append('<link rel="next" href="'+window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(parseInt(o.curPage) + 1)+'" >');
                        } else {
                            $('link[rel="next"]').attr('href', window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(parseInt(o.curPage) + 1));
                        }
                    }
                }
                
                
//                $('#pagination').twbsPagination({
//                    totalPages: o.totalPages,
//                    visiblePages: 5,
//                    prev:'<span class="prv-arrow"></span>',
//                    next:'Next <span class="next-arrow"></span>',
//                    last:' <span data-tooltip="The End" class="finishtool">Fin ~ </span>',
//                    startPage: o.curPage,
//                    initiateStartPageClick: false,
//                    onPageClick: function (event, page) {
//                        o.curPage = parseInt(page); // overrinding the value to get net page data
//                        var queryStr = utils.replaceQueryString(window.location.search, 'p', page);
//                        arrayKeyStr=page;
//                        if (o._pageData[arrayKeyStr]) {
//                            history.pushState(page, "page " + page, queryStr);
//                            $("#productView").html(o._pageData[arrayKeyStr]);
//                            //need to reinitialize lazy loading
//                        } else {
//                            o.getDOMElements(page);
//                        }
//                        if(o.curPage==o.totalPages){
//                            o.overRidePaginationLast();
////                            $("#subscriptionSection,#suggestionDiv").show();
//                            $("#subscriptionSection").show();
////                            $(".clip-tabscn-cntnt li a.pf-tablinks:first").addClass("active").trigger('click');  
//                        }else{
////                            $("#subscriptionSection,#suggestionDiv").hide();
//                            $("#subscriptionSection").hide();
//                        }
//                        
//                        if($('link[rel="canonical"]').length === 0) {
//                            $('head').append('<link rel="canonical" href="'+window.location.hostname+window.location.pathname+'?p='+(page)+' >');
//                        } else {
//                            $('link[rel="canonical"]').attr('href', window.location.hostname+window.location.pathname+'?p='+page);
//                        }
//                        
//                        var new_query_string = o.getQueryString();
//                        
//                        // if page is greater than one and not equal to total page
//                        if(page > 1 && page !== parseInt(o.totalPages)) {
//                            if(page !== o.totalPages) {
//                                if($('link[rel="next"]').length === 0) {
//                                    $('head').append('<link rel="next" href="'+window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(page + 1)+'" >');
//                                } else {
//                                    $('link[rel="next"]').attr('href', window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(page + 1));
//                                }
//                            }
//                            
//                            if($('link[rel="prev"]').length === 0) {
//                                $('head').append('<link rel="prev" href="'+window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(page - 1)+'" >');
//                            } else {
//                                $('link[rel="prev"]').attr('href', window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(page - 1));
//                            }
//                        }
//                        
//                        // if last page
//                        if(page === parseInt(o.totalPages)) {
//                            if($('link[rel="next"]').length > 0) {
//                                $('link[rel="next"]').remove();
//                            }
//                            
//                            if($('link[rel="prev"]').length > 0 && parseInt(o.totalPages) === 1) {
//                                $('link[rel="prev"]').remove();
//                            } else {
//                                if($('link[rel="prev"]').length === 0) {
//                                    $('head').append('<link rel="prev" href="'+window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(page - 1)+'" >');
//                                } else {
//                                    $('link[rel="prev"]').attr('href', window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(page - 1));
//                                }
//                            }
//                        }else if(page === 1) { // first page
//                            if($('link[rel="prev"]').length > 0) {
//                                $('link[rel="prev"]').remove();
//                            }
//                            
//                            if(parseInt(o.totalPages) > 1) {
//                                if($('link[rel="next"]').length === 0) {
//                                    $('head').append('<link rel="next" href="'+window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(page + 1)+'" >');
//                                } else {
//                                    $('link[rel="next"]').attr('href', window.location.hostname+window.location.pathname+'?'+new_query_string+'p='+(page + 1));
//                                }
//                            }
//                        }
//                        
//                        
//                        utils.lazyloadInit();
//                        o.domtextChange();
//                        
//                    }
//                });
                //inialize lazy loading
               utils.lazyloadInit();
               //need to reinitialize variable on every ajax call
                o.totalItem=( typeof totalProductCount   === 'undefined' ) ?0:totalProductCount;
                o.totalPages=(typeof totalPage === "undefined")?0:totalPage;
                //for tab suggestion html
               if(typeof suggestestionArr !== 'undefined'){
                    o.suggestionTabhtml();  
                } 
                 //initialize dimention
                 $("a.clip-lessgrtr-lbl.active").trigger("click");

                if ($('.brnd-clctn-imgwrpr').length == 3){
                     var $html = $('.brnd-clctn-slideblck .brnd-clctn-imgwrpr').clone();
                     $('.brnd-clctn-slideblck').append($html);
                }

                 if($('.brnd-clctn-slideblck').length > 0 && o.is_brand_page === true){
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

                    collectionSlider.on('init beforeChange afterChange', function(event, slick, currentSlide, nextSlide) {
                        o.curentSliderIdCLIP();                
                    });
                 }
            },
            getUrlEncoding:function(currentPage){
              // var str = utils.replaceQueryString(window.location.search, 'p', currentPage);
                //return window.btoa(str);
                return currentPage;
            },
            domtextChange:function(){
                var startRange=(o.curPage>1)?(((o.curPage-1)*itemPerPage)+1):1;
                var endRange=((o.curPage*itemPerPage)>o.totalItem)?o.totalItem:(o.curPage*itemPerPage);
                var remainingCount=(o.totalItem-endRange);
                $(".clip-lft-srlt").find(".clip-start-val").html(startRange);
                $(".clip-lft-srlt").find(".clip-shw-val").html(endRange);
                $("#current-page-no").html(o.curPage); 
                $("#remainingCount").html(remainingCount);
                $("#"+o.layoutViewType).trigger("click");
                 if(o.is_search == false && o.is_brand_page == false && o.curPage>=o.totalPages){
                     $("#subscriptionSection").show();
                 }
                
            },
            getDOMElements:function(page,dataStatus,skipPushState){
                 
              var queryStr = utils.replaceQueryString(window.location.search, 'p', page);
              if(typeof autoSuggestSearch !== "undefined" && autoSuggestSearch != ""){
                queryStr = utils.replaceQueryString(queryStr, 'q', autoSuggestSearch);
            }
            var infiniteScroll=false;
            if(skipPushState==='true'){
                infiniteScroll=true;
            }
            var dataArr={layout:o.pageLayout,is_search:o.is_search,
                     is_collection:o.is_collection,
                     collectionName:o.collectionName,
                     is_brand_page:o.is_brand_page,template_type:o.template_type,
                     cat:o.cat,layoutViewType:o.layoutViewType,infiniteScroll:infiniteScroll
                    };
                if(o.brandsname!=''){
                 dataArr.brandsname=o.brandsname;
                 }
              $.ajax({
                url:o.nextPageUrl+queryStr,
                type:"GET",
                data:dataArr,
                dataType:"json",
                beforeSend:function(){
                     o.loaded=false;
                     if($("#load_more_button").length > 0){
                       $("#load_more_button").addClass("btn-loader");
                     }
                },
                success:function(data){
                    //arrayKeyStr=o.getUrlEncoding(page);
                	arrayKeyStr=page;
                    o._pageData[arrayKeyStr] = data;
                   // o._pageData[page] = data.html;
                    if(dataStatus!='saveData'){
//                        $("#productView").html(data);
                        if(typeof data.clip !=="undefined"){
                          $("#productView .clip-grid-view .clip-prod-container").append(data.clip.grid);
                          $("#productView .clip-list-view").append(data.clip.list);
                        }else if(typeof data.search !=="undefined"){
                          $("#productView .clip-grid-view .srch-rslt-prod-container").append(data.search);
                        }
                        if(typeof data.gtm !=="undefined"){
                            setGtmData(data.gtm);
                        }
                        if(skipPushState !== 'true'){
                            history.pushState(page, "page "+page, queryStr);
                        }
                    }
                },
                complete:function(){
                    o.loaded=true;
                     if(dataStatus!='saveData'){
                         utils.lazyloadInit();
                          $("#"+o.layoutViewType).trigger("click");
                          $("#load_more_button").removeClass("btn-loader");
                        if(o.totalPages > o.curPage && o.curPage > 2){
                            $('#load_more_button').show();
                            $("#pagination-row").removeClass("no-infinit-btn");
                        }else{
                            $('#load_more_button').hide();
                            $("#pagination-row").addClass("no-infinit-btn");
                        }
                        o.domtextChange()
                            
                 }
                 if(typeof itemData   !== 'undefined'){
                     setGtmData(itemData);
                 }
                }
            }); 
                
            },
            overRidePaginationLast:function(){
                $("#pagination li.last a").click(function(){
//                    o.suggestionTabhtml();
                    //for moving focus
                $("#subScribEmail").focus();
                    var scrollPos =  $("#subscriptionSection").offset().top-200;
                    $('html,body').animate({
                        scrollTop: scrollPos},
                        'slow');
                });
            },
            emailSubscription:function(){
                var email=$(this).siblings('input[type="text"]').val(); 
                var emailFilter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if ( email !=='' && emailFilter.test(email)) {
                    //todo:make ajax call and made entry in db
                    $.ajax({
                       url:root_url+"/site_product/emailSubscription",
                       type:"POST",
                       data:{cat:o.cat,email:email},
                        dataType:"json",
                        success: function(data){
                            if(data.flag===true){
                                $('.clip-eml-scrb-box').hide();
                                $('.clip-eml-scrb-scs').show();
                                $(this).siblings('input[type="text"]').removeClass('clip-err-border'); 
                            }else if(data.msg="email already exits") {
                                 $('.clip-eml-scrb-box').hide();
                                 $('.clip-eml-scrb-alr').show();
                            }else{
                                $('.clip-eml-scrb-error p.pf-text-red ').html(data.msg);  
                                $('.clip-eml-scrb-error').show();
                                $(this).parent().addClass('clip-err-border');
                            }
                            }
                       
                    });
                } else {
                        $('.clip-eml-scrb-error').show();
                        $(this).parent().addClass('clip-err-border');
                }
            },
            toggleRead:function(){
                    if($(this).parent().siblings('.clip-readmore-cntwrpr').hasClass('height-less')) {
                            $(this).parent().siblings('.clip-readmore-cntwrpr').removeClass('height-less');
                            $(this).text('Read Less');
                    } else {
                            $(this).parent().siblings('.clip-readmore-cntwrpr').addClass('height-less');
                            $(this).text('Read More');
                    }
            },
            feedbackSubmit :function(){
                 var selectorType=$("#feedbackForm input[name='selector']:checked").val();
                 if(typeof selectorType==='undefined'){
                     return false;
                 }
                 var error=false;
                if(selectorType=='no'){  
                   error= PF.HEADER.validateForm('','feedbackForm');
                }
             if(!error){
                 $.ajax({
                url:root_url + "/site_product/feedbackSubmit",
                type:"POST",
                data:$("#feedbackForm").serialize(),
                dataType:"json",
                beforeSend:function(){
                    //$('#loaderOverlay').show();
                },
                success:function(data){
                    if(data.flag == false) {
                            alert(data.msg);
                        } else {
                            $(".popup-box .clip-fdbck-widgtbx").hide();
                            $(".popup-box .fdbck-thnku-block ").show();  
                        }
                    
                },
                complete:function(){
                    //close popup afert completion of feedback
                    setTimeout(function() {
                     $('body .popup-close').trigger("click");
                    }, 4000);
                 
                }
            });
            }
            },
           feedbackResetForm: function(){
                $(".popup-box .clip-fdbck-widgtbx").show();
                $(".popup-box .fdbck-thnku-block ").hide();
           },
           closeModel: function(){
                $("a.popup-close").trigger("click");
           },
           oosSubscrition: function(){
                var email=$(this).siblings('input[name="subScribemail"]').val(); 
                var pid=$(this).attr("data-value"); 
                var emailFilter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if ( email !=='' && emailFilter.test(email)) {
                     $(this).parents('.out-stck-cnt').find(".error").hide();
                     var data = {'email': email, 'pid': pid,'checkIfExists':true};
                    var _params = {
                        'pid': pid
                    };
                    var _setUpOptions = {
                        'dataType' : "json"
                    };
                                
                    utils.makeRequest(
                            secure_url + '/site_product/oos_notifciation_request',
                            'POST',
                            data,
                            o.OOSResponse,
                            '',
                            '',
                            _params,
                            _setUpOptions                                    
                        );
                }else{
                    $(this).parents('.out-stck-cnt').find(".error").show();
                }
           },
           OOSResponse:function(result,additionParam){
               var data = '';
                try {
                        data = $.parseJSON( result );
                        additionParam = $.parseJSON( additionParam );
                } catch( error ) {
                        data = result;
                        additionParam = additionParam;
                }
                if(data=='Success'){
                    $(".oos_"+additionParam.pid+" .success-msg").hide();    
                    $(".oos_"+additionParam.pid+" .clip-email-scrb").hide();    
                    $(".oos_"+additionParam.pid+" .out-ofstock-err").hide();    
                    $(".oos_"+additionParam.pid+" .subscribed").show();    
                }else if(data==='already_exists'){
                    $(".oos_"+additionParam.pid+" .success-msg").hide();    
                    $(".oos_"+additionParam.pid+" .clip-email-scrb").hide();    
                    $(".oos_"+additionParam.pid+" .out-ofstock-err").hide();    
                    $(".oos_"+additionParam.pid+" .alreadySubscribed").show();     
                }else{
                    $(".oos_"+additionParam.pid+" .out-ofstock-err").show();
                }
               
           },
           applyBrandFilter:function(){
               //if($("#clipBrndSrch input[type=checkbox]:checked").length>0){
                o.applyFilter();
              //}
              
              //$("#clipBrndSrch a.popup-close").trigger("click");
           },
           curentSliderIdCLIP:function() {
                var collectnCntntShow  = $('.slick-center').attr('data-slide');
                $('.brndclctn-sldecnt-sctn .brnd-clctn-cnt').hide();
                $('.brndclctn-sldecnt-sctn #' + collectnCntntShow ).show(); 
            },
           element_in_scroll:function(elem) {
            var returnFlag=false;
            var docViewTop = $(window).scrollTop();
            var docViewBottom = docViewTop + $(window).height();
            var elemTop = $(elem).offset().top;
            var productsGridThreshold =  $(elem).height() * .75;
//            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
            if ((docViewTop - elemTop) > productsGridThreshold) {
                returnFlag=true;
            }
            return returnFlag;
            },
           persistentScroll:function(elem) {
            var iCurScrollPos = $(this).scrollTop();
            if (iCurScrollPos > o.iScrollPos && o.loaded && o.curPage <= 2 && o.totalPages > o.curPage) {
            //Scrolling Down
            if (o.element_in_scroll("#productView")) {
                o.curPage=o.curPage+1;
                o.getDOMElements(o.curPage,'','true');
            }
            } else if(o.curPage > 2 && o.curPage < o.totalPages){
                $("#load_more_button").show();
                $("#pagination-row").removeClass("no-infinit-btn");
                o.domtextChange();
            }else if(o.is_search == false && o.is_brand_page == false && o.curPage>=o.totalPages){
                $("#subscriptionSection").show();
            }
            o.iScrollPos = iCurScrollPos;
           },
           loadMoreItem:function() {
            if (o.curPage < o.totalPages) {
                 o.curPage=o.curPage+1;
                o.getDOMElements(o.curPage,'','true');
            } else {
                $("#load_more_button").hide();
                $("#pagination-row").addClass("no-infinit-btn");
            }
           },
        getQueryString:function() {
            var query_string = window.location.search;
            var query_string_array = query_string.split("&");
            var new_query_string = '';
            for(var i = 0; i < query_string_array.length; i++) {
                var inner_query_array = query_string_array[i].split("=");
                if(inner_query_array[0] !== 'p') {
                    if(i === 0) {
                        new_query_string += query_string_array[i].replace('?','');
                    } else {
                        new_query_string += '&'+query_string_array[i].replace('?','');
                    }
                }
            }

            return (new_query_string.length === 0) ? '' : new_query_string+'&';
        }
        };
        z.CLIP = o;
    }( PF, $));
    
    $( document ).ready(function() {
        
        PF.CLIP.init();
        
        
       
//        setInterval(function(){
//                nextPage = parseInt(PF.CLIP.curPage) + 1;
////                arrayKeyStr=PF.CLIP.getUrlEncoding(nextPage);
//                arrayKeyStr=nextPage;
//                if(!PF.CLIP._pageData[arrayKeyStr] &&  (PF.CLIP.totalPages >= nextPage) &&  PF.CLIP.loaded){
//                    PF.CLIP.getDOMElements(nextPage,'saveData');
//                }
//        },10000);

        if(PF.CLIP.is_search == false && PF.CLIP.is_brand_page == false && PF.CLIP.curPage==PF.CLIP.totalPages) {
            $("#subscriptionSection").show();
        }else{
            $("#subscriptionSection").hide();
        }

        
        window.onpopstate = function(event) {
           var url=document.URL;
           url = PF.UTILITIES.replaceQueryString(url, 'p', 1);
           PF.CLIP.filterClick(url,true);
           return true;
//		var utils = PF.UTILITIES;
//    	//var currState = history.state;    	
//          var tempcurPage =event.state;
//          tempcurPage=getParameterByName('p');
////         if(tempcurPage==null ||  typeof tempcurPage === 'undefined' ){
//           if(tempcurPage =='' ){
//             tempcurPage=1;
//          }
//          tempcurPage=parseInt(tempcurPage);
//         if(PF.CLIP.filter_applied){
//             var url=document.URL;
//            url = utils.replaceQueryString(url, 'p', tempcurPage);
//             PF.CLIP.filterClick(url,true);
//
//             return true;
//         }
////        arrayKeyStr=PF.CLIP.getUrlEncoding(tempcurPage);
//        arrayKeyStr=tempcurPage;
//        if(PF.CLIP._pageData[arrayKeyStr]){
//        	$('#productView').html(PF.CLIP._pageData[arrayKeyStr]);
//        }
//        else{
//            var url=document.URL;
//            url = utils.replaceQueryString(url, 'p', tempcurPage);
////             PF.CLIP.filterClick(url,true);
//             return true;
//        }
//      PF.CLIP.initRestOf(tempcurPage);
//       PF.CLIP.domtextChange();
//
	};

    if($('.srch-rslt-more').length > 0){
        $(".srchrslt-more-box ").mCustomScrollbar({axis:"y"
        });
    }
    });
    var iScrollPos=0;
   
}
$(window).load(function(){
  $('#'+PF.CLIP.layoutViewType).trigger('click');  
//   PF.CLIP.overRidePaginationLast();
});
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}
