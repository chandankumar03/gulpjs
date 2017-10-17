/**
 * Bespoke Looks Listing Script
 */

"use strict";

var PF = PF || {};
// Setting a variable to check if filter is applied
var is_filter = 0;

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

if( typeof PF.LLP === 'undefined' ) {
    (function (z, $) {
        var utils = z.UTILITIES;
        var l = {
            d : $(document),
            w : $(window),
          
            listenOnPageLoad : {
                click : {
                    '.clearAllFilters':['PF.LLP.clearAllFilters','#page'],
                     '.fltr-rmvbtn':['PF.LLP.clearFilterTabs','#page'],
                     '.clip-pricehtol-fltr li':['PF.LLP.orderBy','#page'],
                },
                keydown : {
                  '#min_price' : ['PF.LLP.priceFilterKeyDown' , '#page'],
                  '#max_price' : ['PF.LLP.priceFilterKeyDown' , '#page']
                }
            },
            init : function() {    
                 utils.listen(l.listenOnPageLoad);
                l.layout=( typeof pageLayout   === 'undefined' )?"":pageLayout;
                l.totalItem=( typeof totalProductCount   === 'undefined' )?"":totalProductCount;
                l.totalPages=( typeof totalPage   === 'undefined' )?"":totalPage;
                l.curPage=1;
                l._pageData=[];
                l.nextPageUrl  = root_url + "/look/getInfiniteLookData";
                l.initRestOf();
                l.initializtingDropDown();
            },
            priceFilterKeyDown:function(event){
              if(event.which != 8 && isNaN(String.fromCharCode(event.which))){
                    event.preventDefault(); //stop character from entering input
               }
            },
            clearAllFilters:function(){
                var url = document.URL.split("?")[0]; 
                url = url+"?p=1";               
                l.filterClick(url);
            },
            initRestOf : function(initPage,maintainStatus){
                
                if(typeof initPage === 'undefined' || isNaN(initPage) || initPage==''){
                    var currentPageSet=l.getParameterByName('p');
                    if(currentPageSet !=''){
                        l.curPage=parseInt(currentPageSet);
                    }else{
                     l.curPage=1;
                    }
                }else{
                    l.curPage=parseInt(initPage);
                }
               var $pagination = $('#pagination');
                $pagination.twbsPagination('destroy');
                /*alert($('#pagination').length);*/
                //var filterItem = ($('p[property="numberOfItems"]').text());
                l.totalPages = totalPage;
                $('#pagination').twbsPagination({
                    totalPages: l.totalPages,
                    visiblePages: 5,
                    prev:'<span class="prv-arrow"></span>',
                    next:'Next <span class="next-arrow"></span>',
                    last:' <span data-tooltip="The End" class="finishtool">Fin ~ </span>',
                    startPage: l.curPage,
                    initiateStartPageClick: false,
                    onPageClick: function (event, page) {
                        l.curPage = parseInt(page); // overrinding the value to get net page data
                        var queryStr = utils.replaceQueryString(window.location.search, 'p', page);
//                        arrayKeyStr=l.getUrlEncoding(page);
                         if (l._pageData[page]) {
                            history.pushState(page, "page " + page, queryStr);
                            $("#productView").html(l._pageData[page]);
                            l.domtextChange();
                            //need to reinitialize lazy loading
                        } else {
                            l.getDOMElements(page);
                        }
                        
                        
                    }
                });
               utils.lazyloadInit();
               
            },
            orderBy:function(){
                l.sortApplied=true;
                var strText = $(this).text().trim();
                $('li.clip-drpdwn-flxlist').removeClass('selected');
                $(this).addClass('selected');
                $("#curSortType").text(strText);
                l.applyFilter();
                return true;
            },
             clearFilterTabs:function(e){
                var key = $(this).attr("data-key");
                var value = $(this).attr("data-value");
                var url = document.URL.split("?")[1];
                if(key=="price"){
                    $("#filter-Price").val("");
                }else{
                $(".filter-section-tabs-bspk").find("input[type='checkbox']:checked").each(function()
                { 
                    if($(this).attr('data-value')==value){
                        $(this).removeAttr("checked").removeClass("doneOnce");                       
                    }
                });
                
                $(".filter-section-tabs-bspk").find("input[type='text']").each(function(){
                    if( (typeof $(this).attr("data-key") != 'undefined') && $(this).val()!=""){
                        if($(this).attr('data-value')==value){
                            $(this).val("");
                        }
                    }
                    
                });
            }
                
                if ($('.clip-fltrd-cnt').length < 2) {
                        $(this).closest('.row').remove();
                } else {
                        $(this).parent().remove();
                }
                
                l.applyFilter();
            },
            initializtingDropDown:function(){
               $('.cstmDrpdwn').off('click').on('click',function(){
                    l.drpDwnAttr = $(this).attr('data-attr');
                    l.currentOpendDrpdwn = $('#' + l.drpDwnAttr);
                    l.drpDwnInputs = $(l.currentOpendDrpdwn).find('input[type="checkbox"]');
                    
                    /*DropDown manage Block start here*/
                    l.customDropdown();
                    
                    $('#'+l.drpDwnAttr+' .brnd-btn-done').off('click').on('click', function() {
                      l.applyBtn();	      	    	
                    });

                    $('#'+l.drpDwnAttr+' .drpdwn-closebtn').off('click').on('click', function() {
                      l.cancelBtn();
                    });

                    $(l.currentOpendDrpdwn).off('click').on('click', function(e) {
                        e.stopPropagation();
                    });
                });

                 $('.drpdwn-price-htol').off('click').on('click', function(e) {
                        $('.clip-pricehtol-fltr').slideToggle();
                        $('.clip-sbcatmore-sctn').hide();
                        $('.clip-custom-drpdwn').hide();
                        e.stopPropagation();
                });
                
                $('.clip-dmsn-cntnt input').off('keyup').on('keyup',function() {
                    var dimensionSize = $(this);
                    if(isNaN(dimensionSize.val())){
                        dimensionSize.val(dimensionSize.val().match(/[0-9]*/));
                    }
                });  
                 
               
            },
            getDOMElements:function(page,dataStatus){
                var queryStr = utils.replaceQueryString(window.location.search, 'p', page);
                  $.ajax({
                    url:l.nextPageUrl+queryStr,
                    type:"GET",
                    data:{layout:l.layout,is_search:false,is_brand_page:false},
                   // dataType:"json",
                    beforeSend:function(){
                         l.loaded=false;
                         if(dataStatus!='saveData'){
                          $('#loaderOverlay').show();
                         }
                    },
                    success:function(data){
                        //arrayKeyStr=l.getUrlEncoding(page);
                       // l._pageData[page] = data;
                       // l._pageData[page] = data.html;
                        if(dataStatus!='saveData'){
                            $("#productView").html(data);
                            history.pushState(page, "page "+page, queryStr);
                        }
                    },
                    complete:function(){
                         l.curPage=page;
                          l.loaded=true;
                         l.domtextChange();
                        if(dataStatus!='saveData'){
                             utils.lazyloadInit();
                            $('#loaderOverlay').hide();
                     }
                     
                    }
                }); 
                
            },
            domtextChange:function(){
              var currnentPage= PF.LLP.getParameterByName('p');
              var dynamicPerPage=itemPerPage;
                if(currnentPage !='' && currnentPage>1){
                 dynamicPerPage=(parseInt(itemPerPage)+1);
               }
                var startRange=(l.curPage>1)?((l.curPage==2)?(dynamicPerPage):((l.curPage-2)*dynamicPerPage)+dynamicPerPage):1;
                var endRange=((l.curPage*dynamicPerPage)>totalProductCount)?totalProductCount:(l.curPage>1)?(((l.curPage-1)*parseInt(dynamicPerPage))+parseInt(itemPerPage)):(l.curPage*dynamicPerPage);
                $(".clip-lft-srlt").find(".clip-start-val").html(startRange);
                $(".clip-lft-srlt").find(".clip-shw-val").html(endRange);
                $("#current-page-no").html(l.curPage); 
                //focus back to product div
                $('html,body').animate({
                scrollTop: $('#productView').offset().top+20},
                'slow');
            },
            vaildateFormsInput:function(parentDiv){
                    var Pricetext='';
                    var maxPrice=parseInt($("#"+parentDiv+" #max_price").val());
                    var minPrice=parseInt($("#"+parentDiv+" #min_price").val());
                       if(minPrice<maxPrice){
                           // changes for min and max price
                          if (minPrice >= 1000) {
                            minPrice = Math.floor(minPrice/1000) * 1000;
                        } else {
                            minPrice = Math.floor(minPrice/100) * 100;
                        }
			 
                        if (maxPrice >= 1000) {
                            maxPrice = Math.ceil(maxPrice/1000) * 1000;
                        } else {
                            if (maxPrice === 0){
                                maxPrice = 100;
                            }
                            maxPrice = Math.ceil(maxPrice/100) * 100;
                        } 
                        Pricetext=minPrice+"-"+maxPrice;
                        $("#filter-Price").val(Pricetext);
                        return true;
                       }else{
                         return false;
                       }
              
            },
            applyFilter:function(parentDiv)
            {
                
                var urlKey = {};
                var keys = [];
                $(".filter-section-tabs-bspk").find(":not('.disabled')input[type='checkbox']:checked").each(function()
                { 
                    var key = $(this).attr("data-key");                        
                    var value = $(this).attr("data-value");
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
                    finalString= "forder="+keys.toString();
                    keys.forEach(function(val){                    
                        finalString+="&"+val+"="+urlKey[val].toString();
                    });
                }
                $(".filter-section-tabs-bspk #dimensionFltr").find("input[type='text']").each(function(){
                    var value = $(this).val().trim();
                    if(value!=""){
                        finalString2+="&"+$(this).attr("data-key")+"=0-"+value;                        
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
                if($("#sortBY .clip-drpdwn-flxlist.selected").length>0 && l.sortApplied)
                {
                   var attr = $("#sortBY .clip-drpdwn-flxlist.selected").attr("data-sort").split("-");
                   finalString3=utils.replaceQueryString(finalString3, 'order', attr[0]);
                   finalString3=utils.replaceQueryString(finalString3, 'dir', attr[1]);
                   finalString3=utils.replaceQueryString(finalString3, 'p', 1);
                   finalString3=finalString3.replace(/^\?/g, '')
                }
                
                if(finalString.length>0){
                    finalString+="&"+finalString3;
                }
                else
                {
                    finalString+=finalString3;
                }
                var CheckPriceFilter=typeof $("#filter-Price").val() !="undefined"?$("#filter-Price").val():"";
                if(CheckPriceFilter!=''){
                    finalString="price="+CheckPriceFilter+"&"+finalString;
                }
                var splitUrl    = document.URL.split('?');
                var finalUrl = "";
                if(typeof splitUrl[1] == "undefined" || finalString.length>0) //no errors
                {
                	if (typeof splitUrl[1] != "undefined" && splitUrl[1].indexOf("q=") >= 0){
                		finalUrl+=document.URL+"&"+finalString; 
                	}
                	else {
                		finalUrl+= splitUrl[0]+"?"+finalString; 
                	}
                }
                else
                {
                    finalUrl+=splitUrl[0];
                }
                l.filterClick(finalUrl);
            },
            filterClick : function(queryString,callback) {
                var splitUrl    = queryString.split('?');
                var data =typeof splitUrl[1] == "undefined"?"":splitUrl[1];
                var data        = decodeURIComponent(data.replace(/\+/g, ' '));
                $.ajax({
                url:splitUrl[0],
                type:"GET",
                data:data,
                cache:false,
                beforeSend:function(){
                    $('#loaderOverlay').show();
                },
                success:function(data){
                     $("#lookData-page").html(data);                    
                },
                complete:function(){
                    var initPage=1;
                   
                    if(callback===true){
                     initPage='';
                    }else{
                     history.pushState(1, "page " + 1, queryString.replace(/&+$/, ''));
                    }
//                    $('body').removeClass('active').find('.popup_overlay').hide();
                    $('#loaderOverlay').hide();
//                    l.filter_applied=true;
                    l._pageData=[];
//                        l.init();
                         l.initializtingDropDown();
                      l.initRestOf(initPage);
                
                }
            }); 
               // $.pjax({ url:splitUrl[0], data: data, container: l.filterContainerSel, method: 'GET',timeout:500000});
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
                var validationStatus=true;
                if(l.drpDwnAttr.indexOf('Pricerange') !== -1){
                    validationStatus=PF.LLP.vaildateFormsInput(l.drpDwnAttr);
                }
             if(validationStatus){
                PF.LLP.applyFilter();
                $(l.currentOpendDrpdwn).hide();
             }else{
                 var errorString='<span class="error-txt error-msg">Enter a valid Price Range</span>';
                 if($("#"+l.drpDwnAttr+" .error-txt").length<1){
                     $("#"+l.drpDwnAttr+" li.price-range-input-wrap").append(errorString);
                      $("#"+l.drpDwnAttr+" .error-msg").css("display","block");
                }else{
                     $("#"+l.drpDwnAttr+" li.price-range-input-wrap .error-txt").css("display","block");
                  //    $("#"+l.drpDwnAttr+" .error-msg").show();
                }
             }
            },
            resetAllcheckbox :function(e) {
                $('#'+l.drpDwnAttr+" input[type='checkbox']:not('.doneOnce')").attr("checked",false);
                $('#'+l.drpDwnAttr+' .doneOnce').each(function(){
                  $(this).prop('checked', true);
                }); 
                     
            },
            cancelBtn:function (e) {
                l.resetAllcheckbox(e);
                $(l.currentOpendDrpdwn).hide();
            },
         getParameterByName: function(name){
             name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
               results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    };
        z.LLP = l;
    }( PF, $));
    
    $( document ).ready(function() {
        PF.LLP.init();
        
         window.onpopstate = function(event) {
    	//var currState = history.state;    	
          var tempcurPage =event.state;
          tempcurPage= PF.LLP.getParameterByName('p');
//         if(tempcurPage==null ||  typeof tempcurPage === 'undefined' ){
           if(tempcurPage =='' ){
             tempcurPage=1;
          }
          tempcurPage=parseInt(tempcurPage);
         if(PF.LLP.filter_applied){
             var url=document.URL;
             PF.LLP.filterClick(url,true);
             return true;
         }
//        arrayKeyStr=PF.CLIP.getUrlEncoding(tempcurPage);
       var arrayKeyStr=tempcurPage;
        if(PF.LLP._pageData[arrayKeyStr]){
        	$('#productView').html(PF.LLP._pageData[arrayKeyStr]);
        }else{
            var url=document.URL;
             PF.LLP.filterClick(url,true);
             return true; 
        }
      PF.LLP.initRestOf(tempcurPage);
       PF.LLP.domtextChange();

	};

    });
}