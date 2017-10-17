/**
 * Bespoke Looks Listing Script
 */

"use strict";

var PF = PF || {};
// Setting a variable to check if filter is applied
var is_filter = 0;
var buy_type = '';
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
                     '.cstmDrpdwntest':['PF.CLIP.filterdropDown','#page'],
                },
                keydown : {
                    '#min_price' : ['PF.LLP.priceFilterKeyDown' , '#page'],
                    '#max_price' : ['PF.LLP.priceFilterKeyDown' , '#page']
                }
            },
            init : function() {   
                $('#look_id').val($('#look_id1').val());
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
                });

                 $('.drpdwn-price-htol').on('click', function(e) {
                        $('.clip-pricehtol-fltr').slideToggle();
                        $('.clip-sbcatmore-sctn').hide();
                        $('.clip-custom-drpdwn').hide();
                        e.stopPropagation();
                });
               
                $('.clip-dmsn-cntnt input').keyup(function() {
                    var dimensionSize = $(this);
                    if(isNaN(dimensionSize.val())){
                        dimensionSize.val(dimensionSize.val().match(/[0-9]*/));
                    }
                });
                
                PF.LLP.lookID = $('#besDetail').attr('data-look');
                
                // look image mapper init
                $(function () {
                    if($("#imgTag").length>0){
                    var i = new Image();
                    i.src = $("#imgTag").attr('src');
                    i.onload = function () {
                        $("#imgTag").imageTag();
                        }
                    }
                });
                
                $('.select-size-btn a').on('click', function(){
                    $(this).parent().find("a").removeClass('active');
                    $(this).addClass('active');
                });
                
                 /*check for all oos*/
                var _all_oos = true;
                $('#besProductList').find('input[type=checkbox]').each(function()
                {
                    if ($(this)[0].checked) {
                        _all_oos = false;
                    }
                });
                if (_all_oos) {
                    $('#buyThisLook').addClass('disabled');
                    $('#buySelectedItems').addClass('disabled');
                }
                
            },
            applyFilter:function()
            {
                var urlKey = {};
                var keys = [];
                $(".filter-section-tabs").find(":not('.disabled')input[type='checkbox']:checked").each(function()
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
                $(".filter-section-tabs #dimensionFltr").find("input[type='text']").each(function(){
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
                    var finalString3 = "order="+attr[0]+"&dir="+attr[1]+"&p=1";
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
                beforeSend:function(){
                   // $('#loaderOverlay').show();
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
                    PF.l.init();
                }
            });
               // $.pjax({ url:splitUrl[0], data: data, container: o.filterContainerSel, method: 'GET',timeout:500000});
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
          $(l.currentOpendDrpdwn).hide();
             PF.LLP.applyFilter();
            },
            resetAllcheckbox :function(e) {
                $('#'+l.drpDwnAttr+" input[type='checkbox']:not('.doneOnce')").attr("checked",false);
                    
            },
            cancelBtn:function (e) {
                l.resetAllcheckbox(e);
                $(l.currentOpendDrpdwn).hide();
            },
            buyLook : function(skipCheck) 
            {
                skipCheck = (typeof skipCheck !== 'undefined') ? skipCheck : false;
                var _configurableOptionsAvailable = false;
                
                // reset - re-initialize the original html markup
                $('#besConsultItemDetail').show();
                $('#besLeadForm').hide();
                
                if ($('#besConfigurableModal').length > 0)
                {
                    $('#besConfigurableModal').find('div.list-view').each(function() 
                    {
                        var _pid = $(this).attr('data-pid');
                        var _oos = $('#atc-'+_pid).hasClass('disabled-ic');
                        if ((($('#cardCheck-'+_pid).length > 0 && $('#cardCheck-'+_pid)[0].checked) || skipCheck) && !_oos)
                        {
                            $(this).removeClass('inactive').show();
                            _configurableOptionsAvailable = true;
                        } 
                        else 
                        {
                            $(this).addClass('inactive').hide();
                        }
                    });
                }
                
                if ($('#besConfigurableModal').length > 0 && _configurableOptionsAvailable)
                {
                    $('#a-besConfigurableModal').trigger('click');
                    PF.LLP.skipCheck = skipCheck;
                }
                else if ($('#besBuyModal').length > 0) 
                {
                    $('#a-besBuyModal').trigger('click');
                    PF.LLP.skipCheck = skipCheck;
                }
                else 
                {
                    PF.LLP.buy(skipCheck);
                }
                
            },
            confirmExtraItems : function() 
            {
                PF.LLP.skipCheck = (typeof PF.LLP.skipCheck !== 'undefined') ? PF.LLP.skipCheck : false;
                
                // flag is used when clicked on popup close or clicked on overlay
                PF.LLP.skipModal = (typeof PF.LLP.skipModal !== 'undefined') ? PF.LLP.skipModal : false;
                
                if ($('#contactMeForCustomRate')[0].checked && !PF.LLP.skipModal)
                {
                    
                    $('#besConsultItemDetail').fadeOut(function(){
                        $('#besLeadForm').fadeIn();
                    });
                    
                } else {
                    // BUY
                    /* Click on ok, I got it in the popup*/
                    PF.LLP.bespokeEventTracker('Buy selected item |consultation| popup', 'Got it'); 

                    $('#besBuyModal').fadeOut(function() {
                        PF.LLP.buy(PF.LLP.skipCheck);
                    });
                }
                PF.LLP.skipModal = false;    // re-initialize skipModal
            },
            bespokeInfoSkuValidation: function (form_id) {
              //disable form submit button to avoid resubmission
                $('#besInfoSkuSubmitBut').attr('disabled', 'disabled');
                //PF.HEADER.addBlueButtonLoader(form_id);
                var errors = 0;
                
                errors = PF.HEADER.validateForm("",form_id);
                
                $('#besInfoSkuSubmitBut').removeAttr("disabled");
                
                if (errors == 0) {
                    PF.LLP.submitBespokeInfoSku(form_id);
                }else{
                    return false;
                }
                
            },
            submitBespokeInfoSku : function(form_id){
                var path = secure_url + '/look/getBespokeInfoSkuFormData';
                var _data = $("form#" + form_id).serialize();
                var _beforeSend = function () {
                        $('#besInfoSkuSubmitBut').attr('disabled', 'disabled');
                };
                var _params = {
                  'form_id' : form_id
                };
                var _ajaxSetUpOptions = {
                    'dataType' : "json"
                };
                utils.makeRequest( path, 'POST', _data, PF.LLP.submitBespokeResponse, PF.LLP.errorHandler, _beforeSend, _params, _ajaxSetUpOptions );
                /*Click on the submit button in the popup to buy selected items*/
                PF.LLP.bespokeEventTracker('Buy selected item |pepperfry| popup', 'submit');  
            },            
            submitBespokeResponse : function(result, _params){
                var data = '';
                try {
                        data = $.parseJSON( result );
                } catch( error ) {
                        data = result;
                }
                PF.HEADER.removeBlueButtonLoader(_params.form_id);
                if(data === 'success'){
                    $('.bes-register-form-container').fadeOut('400', function() {
                        $('#besSubmitStatus').css("display","block").fadeIn();
                        $('.bes-popup-header').hide();
                        $('.bes-success').html('Thank you for your interest. We will get in touch with you shortly').addClass("pf-padding-xxlarge").css({"display":"block","color":"black"});
                        $('.bes-failure').css("display","none");
                        $("#besRegisterForm").getNiceScroll().resize();
                        if($('#besSubmitStatus').is(':visible') && document.URL.split("/")[3] === 'bulkorder.html'){
                            $("html,body").animate({
                                scrollTop: $('#besSubmitStatus').offset().top - 175
                            }, 1000);
                        }
                        $("#besSubmitBut").removeAttr("disabled");
                        $('#besDetailForm #besSubmitBut').removeClass('disabled');
                    });
                    if($('#besConsultForm').is(':visible')){                        
                        $("#popup_overlay").css("display","block");
                        $('#besConsultForm').delay(5000).fadeOut(function(){
                            $("#besConsultForm").find(".popup-close").trigger("click");                            
                        });
                    }                    
                    utils.pushToDataLayer({'category' : 'Bulk Order', 'action': 'Submit', 'label' : 'bulkorder_submit', 'opt' : true, 'event' : 'legacyevent'});
                        // BUY
                        $('#besBuyModal').fadeOut(function() {
                            PF.LLP.buy(PF.LLP.skipCheck);
                        });
                }else if(data=="invalid_token"){
                    alert("An error has occurred. Please refresh the page and try again.");
                    location.reload();
                }else{
                    $('.bes-register-form-container').fadeOut('400', function() {
                        $('#besSubmitStatus').css("display","block").fadeIn();
                        $('.bes-popup-header').hide();
                        $('.bes-failure').html('An error has occurred. Please refresh the page and try again.<a href="javascript:void(0)" onclick="location.reload();">Try submitting again</a>').css({"display":"block","color":"black"}).addClass("pf-padding-xxlarge");
                        $('.bes-success').css("display","none");
                        $("#besRegisterForm").getNiceScroll().resize();
                        if($('#besSubmitStatus').is(':visible') && document.URL.split("/")[3] === 'bulkorder.html'){
                            $("html,body").animate({
                                scrollTop: $('#besSubmitStatus').offset().top - 175
                            }, 1000);
                        }
                    });
                    if($('#besConsultForm').is(':visible')){
                        $('#besConsultForm').delay(5000).fadeOut('slow');
                        $("body").delay(5000).removeClass("active");
                        $("#popup_overlay").css("display","block");
                    }
                }
            },
            buy : function(skipCheck) {
                if ($(this).hasClass('disabled')) { return false; }
                var _look = $('#besDetail').attr('data-look');
                var _pids = {};
                skipCheck = (typeof skipCheck !== 'undefined') ? skipCheck : false;
                $('#besImage').find('.bes-image-tag-wrapper').each(function()
                {
                    var _pid    = $(this).attr('data-pid');
                    var _type   = $(this).attr('data-type');
                    var _oos    = $(this).find('a.pf-cart-ic').hasClass('disabled-ic');
                    var _qty    = 1;
                    if (_type !== 'info_sku' && (($('#cardCheck-'+_pid).length > 0 && $('#cardCheck-'+_pid)[0].checked) || skipCheck) && !_oos)
                    {
                        var skipThisProduct = false;
                        if (_type === 'configurable' || _type === 'simple_child')
                        {
                            skipThisProduct = true;
                        }
                        
                        if (!skipThisProduct)
                        {
                            if (typeof _pids[_pid] !== 'undefined')
                            {
                                _qty = _pids[_pid] + 1;
                            }
                            _pids[_pid] = _qty;
                        }
                    }
                });
                
                // add configurable products
                $('#besConfigurableDetail div.list-view:not(.inactive)').find('div.current-tab').each(function() {
                    var _qty    = 1;
                    $(this).find('a').each(function() {
                        if ($(this).hasClass('active')) {
                            var _pid    = $(this).attr('data-pid');
                            if (typeof _pids[_pid] !== 'undefined')
                            {
                                _qty = _pids[_pid] + 1;
                            }
                            _pids[_pid] = _qty;
                        }
                    });
                });
                if (Object.keys(_pids).length === 0) { return false; }
                var _data = {
                        products    : _pids,
                        look        : _look
                };
                
                var _additionalParams = {
                        products    : _pids,
                        look        : _look
                };
                
                var _setUpOptions = {
                    'dataType' : "json"
                };                
                var _url = secure_url + '/cart/addLook';
                utils.makeRequest( _url, 'POST', _data, PF.LLP.handleAddToCartResponse, PF.UTILITIES.handleAddToCartError, PF.LLP.beforeBuyLook, _additionalParams, _setUpOptions);
            },
            handleAddToCartResponse : function( data, _params ) {
                    PF.HEADER.cartResponseCache = '';   // invalidating the cache
                    PF.UTILITIES.handleAddToCartResponse(data, _params);
                    $('#buyThisLook').removeClass('btn-loader');
                    $('#buySelectedItems').removeClass('loading');
                    return false;
            },
            beforeBuyLook : function()
            {
                $('#buyThisLook').addClass('btn-loader');
                $('#buySelectedItems').addClass('loading');
            },
            confirmConfig : function() 
            {
                PF.LLP.skipCheck = (typeof PF.LLP.skipCheck !== 'undefined') ? PF.LLP.skipCheck : false;
                
                var _error = false;
                var Bes_SelectedSize = '';
                $('#besConfigurableDetail div.list-view:not(.inactive)').find('.current-tab').each(function() {
                    var _configOptionSelected = false;
                    $(this).find('a').each(function() {
                        if ($(this).hasClass('active')) {
                             Bes_SelectedSize = $.trim($(this).text());
                            _configOptionSelected = true;
                        }
                    });
                    if (!_configOptionSelected)
                    {
                        $(this).siblings('.select-size-btn').addClass('vip-config-sizes-error');
                        $(this).addClass('vip-config-sizes-error').parent().find('.error-txt').show();
                        _error = true;
                    }
                    else {
                        $(this).siblings('.select-size-btn').removeClass('vip-config-sizes-error');
                        $(this).removeClass('vip-config-sizes-error').parent().find('.error-txt').hide();
                    }
                });
               
                if (!_error) {
                    if ($('#besBuyModal').length > 0) {
                        $('#besConfigurableModal').fadeOut();
                        $('#a-besBuyModal').trigger('click');
                        /*Bespoke Google Analytics Change by nisha.u*/
                         if(buy_type == 'buyThisLook'){
                            /*Click on the proceed button after click on the Buy this look*/
                            PF.LLP.bespokeEventTracker('Buy this look | proceed', Bes_SelectedSize);
                         }else if(buy_type == 'buySelectedItems'){
                            /*click on proceed under buy selected item*/
                            PF.LLP.bespokeEventTracker('Buy selected item | proceed', Bes_SelectedSize);
                         }                         
                         /**/
                    }else{
                        $('#besConfigurableModal').fadeOut(function() {
                            PF.LLP.buy(PF.LLP.skipCheck);
                        });
                    }
                }else {
                    return false;
                }
            },
            addToCart : function() {
                
                // flag is used when clicked on popup close or clicked on overlay
                PF.LLP.skipModal = true;
                PF.LLP.skipCheck = (typeof PF.LLP.skipCheck !== 'undefined') ? PF.LLP.skipCheck : false;
                PF.LLP.confirmExtraItems();
            },
            OOSNotificationBespoke: function (form_id) {
                
                var product_id = $('#' + form_id + ' #product_id_' + form_id).val();
                var email_id_from = $('#' + form_id + ' #emailNotify_' + form_id).val();
                var filter = /^[a-zA-Z0-9._-]+@([0-9a-z][0-9a-z.-]+\.)+[a-zA-Z]{2,4}$/i;
                var emailValue = $.trim(email_id_from);                
                if (emailValue == "") {
                    $('form#' + form_id + ' .error-text').show().empty().html('Enter your Email');
            }
                else if (filter.test(emailValue) != true)
                {
                    $('#emailNotify_' + form_id).val('').focus();
                    $('form#' + form_id + ' .error-text').show().empty().html('Invalid Email');
                } else
                {
                    $('form#' + form_id + ' .error-text').hide();
                    /*STORE EMAIL ID FOR NOTIFICATION AGAINST PRODUCT*/
                    var data = {'email': emailValue, 'pid': form_id};
                    var _params = {
                        'form_id': form_id
                    };
                    var _setUpOptions = {
                        'dataType' : "json"
                    };
                                
                    utils.makeRequest(
                            secure_url + '/site_product/oos_notifciation_request',
                            'POST',
                            data,
                            PF.LLP.OOSResponse,
                            PF.ERROR.raiseError,
                            '',
                            _params,
                            _setUpOptions                                    
                        );
                }

            },
            OOSResponse: function (data,_params) {
                /*OOS RESPONSE HANDLER*/
                if (data == "Success") {
                    $("#emailNotify_form_wrap_"+_params.form_id).find("input").hide(); $("#"+_params.form_id).hide();
                    $("#emailNotify_form_wrap_"+_params.form_id).find(".bes-sold-out-subtitle").html("Thank you, We\'ll let you know once it\'s back in stock.");
                    utils.pushToDataLayer({'category': 'Bespoke', 'action': 'Submit', 'label': 'Notify Me', 'opt': true, 'event': 'legacyevent'});
                } else {
                    $('#emailNotify_form_wrap_' + _params.form_id).css("display", "none");
                    $("#emailNotify_form_wrap_"+_params.form_id).find("input").hide(); $("#"+_params.form_id).hide();
                    $("#emailNotify_form_wrap_"+_params.form_id).find(".bes-sold-out-subtitle").html("There is some error, please try again later.");                    
                }

            },
            /*CHECK USER ALREADY REGISTERED FOR OOS*/
            OOSNotificationSubscription: function (form_id) {
                
                if ($.trim($('#' + form_id + ' #emailNotify_' + form_id).val()) !== "") {
                   
                    var _params = {
                        'form_id': form_id
                    };
                    
                    var _setUpOptions = {
                        'dataType' : "json"
                    };
                                
                    utils.makeRequest(
                            secure_url + '/site_product/check_oos_notification_subscription',
                            'POST',
                            {'pid': form_id},
                            PF.LLP.OOSNotSubResponse,
                            PF.ERROR.raiseError,
                            '',
                            _params,
                            _setUpOptions
                        );
                } else {

                    $('#emailNotify_form_wrap_' + form_id).show();
                    $('#emailNotify_availability_message_' + form_id).hide();

                }
            },
            OOSNotSubResponse: function (data,_params) {
                /*OOS NOTIFICATION SUBSCRIPTION RESPONSE HANDLER*/
                if (data == 1) {
                    $('#emailNotify_form_wrap_' + _params.form_id).find("input").hide();
                    $('#emailNotify_form_wrap_' + _params.form_id).find(".bes-sold-out-subtitle").html("You are already subscribed to the notifications.<br> We\'ll let you know once it\'s back in stock.");
                    $('#' + _params.form_id).hide();
                } else {
                    $('#emailNotify_form_wrap_' + _params.form_id).show();
                }

            },
            bespokeEventTracker : function(trggrd_action, trggrd_label){

                dataLayer.push({
                    'category'  :   'Bespoke',
                    'action'    :   trggrd_action,
                    'label'     :   trggrd_label,
                    'event'     :   'event Bespoke'
                });

            },
            PlusEventClick : function(e){

                if(!($(this).hasClass('tmp_active'))){

                    $(this).addClass('tmp_active');
                    dataLayer.push({
                        'category'  :   'Bespoke',
                        'action'    :   'Bespoke design Banner Plus button',
                        'label'     :   $(this).closest('div.bes-image-tag').find('div.bes-image-tag-content h3').text(),
                        'event'     :   'event Bespoke'
                    });
                }else{
                    $(this).removeClass('tmp_active');
                }
                
            },
            bespokeValidation: function (form_id) {
                $('#' + form_id + ' #look_id').val($('#look_id1').val());
                            
                var error = true;
                //Added by Nishigandha N
                //changes done for Franchise form
                if(form_id == 'franForm'){
                    $("#" + form_id + ' #fran-form-submit').attr('disabled', 'disabled'); 
                    error = PF.LLP.franchiseValidateForm();
                } else {
                    $("#" + form_id + ' #besSubmitBut').attr('disabled', 'disabled');  
                    error = PF.HEADER.validateForm("","besDetailForm");
                } 

                PF.HEADER.addBlueButtonLoader(form_id);
                
                if(!error){

                    if(document.URL.split("/")[3] === 'bulkorder.html'){
                            $('<input>').attr({
                                type: 'hidden',
                                id: 'bespokePageType',
                                name: 'bespokePageType',
                                value: 'bulkorder'
                            }).appendTo("#" + form_id );
                            $('<input>').attr({
                                type: 'hidden',
                                id: 'interestedin',
                                name: 'interestedin',
                                value: 'Bulk/B2B Purchase (> Rs 8 Lakhs)'
                            }).appendTo("#" + form_id );
                        }
                        else if(document.URL.split("/")[3] === 'furniture.html'){
                            $('<input>').attr({
                                type: 'hidden',
                                id: 'bespokePageType',
                                name: 'bespokePageType',
                                value: 'furnitureGetInspired'
                            }).appendTo("#" + form_id );
                            $('<input>').attr({
                                type: 'hidden',
                                id: 'interestedin',
                                name: 'interestedin',
                                value: 'Design services for my home'
                            }).appendTo("#" + form_id );
                        }
                    else if(document.URL.split("/")[3] === ''){
                            $('<input>').attr({
                                type: 'hidden',
                                id: 'bespokePageType',
                                name: 'bespokePageType',
                                value: 'homeGetInspired'
                            }).appendTo("#" + form_id );
                            $('<input>').attr({
                                type: 'hidden',
                                id: 'interestedin',
                                name: 'interestedin',
                                value: 'Design services for my home'
                            }).appendTo("#" + form_id );
                        }    
                    else if(( typeof pageLayout   !== 'undefined' )){
                            $('<input>').attr({
                                type: 'hidden',
                                id: 'bespokePageType',
                                name: 'bespokePageType',
                                value: 'clip'
                            }).appendTo("#" + form_id );
                        } else{
                            $('<input>').attr({
                                type: 'hidden',
                                id: 'bespokePageType',
                                name: 'bespokePageType',
                                value: 'bespoke'
                            }).appendTo("#" + form_id );
                            $('<input>').attr({
                                type: 'hidden',
                                id: 'interestedin',
                                name: 'interestedin',
                                value: 'Design services for my home'
                            }).appendTo("#" + form_id );
                        }
                    if(form_id == 'franForm' && recaptcha == 'INVISIBLE'){
                        $("#" + form_id + ' #fran-form-submit').removeAttr('disabled');
                        return true;
                    }

                     PF.LLP.submitBespoke(form_id);
                }
                else
                {
                    PF.HEADER.removeBlueButtonLoader(form_id); 
                    //Added by Nishigandha N
                    if(form_id == 'franForm'){
                        $("#" + form_id + ' #fran-form-submit').removeAttr('disabled');
                    } else {
                        $("#" + form_id + ' #besSubmitBut').removeAttr("disabled");
                    }
                }
            },
            wishList: function () {
                var look_id = $('#look_id').val();
                if ($(".bspk-wishlist-icn").hasClass('active-wishlist')) {
                    utils.removeFromWishlist(look_id, utils.handleAddToWishListResponse, 'vip',undefined,1);
                    $(".bspk-wishlist-icn").removeClass('active-wishlist');
                } else {
                    /*Bespoke Google Analytics Change by nisha.u*/
                    PF.LLP.bespokeEventTracker('Bespoke design social icon', 'Wishlist');
                    /**/
                    utils.addToWishlist(look_id, '',undefined,1);
                    $(".bspk-wishlist-icn").addClass('active-wishlist');
                }
            },
            submitBespoke:function(form_id){
                //Added by Nishigandha N
                //changes done for Franchise form
                if(form_id == 'franForm'){
                    var path = secure_url + '/look/franchiseFormData';
                } else {
                    var path = secure_url + '/look/getBespokeFormData';
                }
                var _data = $("form#" + form_id).serialize();
                var _beforeSend = function () {
                        if(form_id == 'franForm'){
                            $('#fran-form-submit').attr('disabled', 'disabled');
                        } else {
                            $('#besSubmitBut').attr('disabled', 'disabled');
                        }
                        PF.HEADER.addBlueButtonLoader(form_id);
                };
                var _params = {
                  'form_id' : form_id
                };                                
                var _ajaxSetUpOptions = {
                    'dataType' : "json"
                };
                if(form_id == 'franForm'){
                    utils.makeRequest( path, 'POST', _data, PF.LLP.submitFranchiseResponse, PF.LLP.errorHandler, _beforeSend, _params, _ajaxSetUpOptions );
                } else {
                    utils.makeRequest( path, 'POST', _data, PF.LLP.submitBespokeResponse, PF.LLP.errorHandler, _beforeSend, _params, _ajaxSetUpOptions );
                }
            },
            submitFranchiseResponse : function(result, _params){
                //Added by Nishigandha N
                //changes done for Submit Franchise form
                var data = '';
                try {
                        data = $.parseJSON( result );
                } catch( error ) {
                        data = result;
                }
                PF.HEADER.removeBlueButtonLoader(_params.form_id);
                if(data === 'success'){
                    $('.fran-form-int-wrap').fadeOut('400', function() {
                        $('.fran-form-thank-wrap').css('display','block');
                            $('html, body').animate({
                                scrollTop: $(".fran-text-wrap").offset().top
                            }, 2000);
                    });                   
                }else{
                    $('.fran-form-int-wrap').fadeOut('400', function() {
                        $('.fran-form-thank-wrap').html('<h5>Oops... something went wrong.<a href="javascript:void(0)" onclick="location.reload();">Try submitting again</a></h5>').css({"display":"block"});
                    });
                }
            },
            franchiseValidateForm : function(){
                var error = true;
                error= PF.HEADER.validateForm("","franForm");
                //var error2 = PF.LLP.verifyProType();
                if(recaptcha == 'VISIBLE' && !error) {
                    if ($.trim(grecaptcha.getResponse(widget_frn)) === ''){ 
                        $("#franForm #captchaError").html('Please re-enter your reCAPTCHA.').css('display','block');
                        $('.fran-frm-captcha-wrap').addClass('frm-error-wrap');
                        error = true;
                    }
                    else{
                        $("#captchaError").css('display','none');
                        $('.fran-property-in-wrap').removeClass('frm-error-wrap');
                        error = false;
                    }
                }
                else {
                    if(!error) {
                        grecaptcha.execute(widget_frn);
                        error = false;
                    }else{
                        grecaptcha.reset(widget_frn);
                    }
                }
                
                return error;
            },
            verifyProType: function() {
                //Added by Nishigandha N
                //changes done for verify property type
                var error = 'true';
                if (!$('.fran-property-type input').is(':checked')) {
                    $('.fran-property-type input').closest('.fran-property-in-wrap').addClass('frm-error-wrap');
                    error = true;
                } else {
                    $('.fran-property-type input').closest('.fran-property-in-wrap').removeClass('frm-error-wrap');
                    error = false;
                }
                return error;
            },
            scrollToProductList : function() {
                $('html,body').animate({scrollTop: $("#besProductList").offset().top},'slow');
            }

        };
        z.LLP = l;
    }( PF, $));
   
    $( document ).ready(function() {
        PF.LLP.init();
        
        $('#besInfoSkuForm a.popup-close').bind('click', function(){
            PF.LLP.addToCart();
        });

        $('div.bes-image-tag-content h3').bind('click', function(){
            PF.LLP.scrollToProductList();
        });
        
        $('.bspk-wishlist-icn').bind('click', function(){
            PF.LLP.wishList();
        });

        /* Click on the wishlist, facebook,twitter and pintrest icon */
        $('#besFacebook').bind('click', function(){
            PF.LLP.bespokeEventTracker('Bespoke design social icon', 'Facebook');
        });
        $('#besTwitter').bind('click', function(){
            PF.LLP.bespokeEventTracker('Bespoke design social icon', 'Twitter');
        });
        $('#besPinterest').bind('click', function(){
            PF.LLP.bespokeEventTracker('Bespoke design social icon', 'Pinterest');
        });
        
        /*Default Selected Items in Bespoke*/
        var checkd_prds = [];
        $('.clip-grid-view .grid-view').find('input[type=checkbox]').each(function() {
            if ($(this)[0].checked) {
                checkd_prds.push($(this).closest('div.grid-view').data('pid'));
            }
        });        
        if(checkd_prds.length != 0){
            PF.LLP.bespokeEventTracker('Default Selected Items', checkd_prds);  
        }
        /**/
    });
}

(function($){var $mainObj;$.fn.imageTag=function(settings){var settings=$.extend({parentTag:'div',contentClass:'.bes-image-tag-content',removeClassActive:'active',removeClassClose:'close',buttonClass:'.bes-image-tag-button',dataXpos:'data-x',dataYpos:'data-y',imageTagClass:'.bes-image-tag',bottomPadding:10,},settings);var $i=$(this),$p=$(this).closest(settings.parentTag);$mainObj=$i;$(settings.contentClass,settings.imageTagClass,settings.buttonClass).removeAttr('style');$(this).closest(settings.parentTag).removeAttr('style').css({width:$i.width(),height:$i.height(),position:'relative'});var z=1;$(this).parent().find(settings.imageTagClass).each(function(index,element){var $on=$(this).attr("button-on"),$off=$(this).attr("button-off");$(this).find('div').first().addClass($on).css({'z-index':z});$(this).removeAttr('style').css({left:$(this).attr(settings.dataXpos)*$p.width(),top:$(this).attr(settings.dataYpos)*$p.height(),position:'absolute',}).find("."+$on).unbind('click').click(function(event){if($(this).hasClass($off)||$(this).hasClass('active')){var $t=$(this);$(this).siblings().css({visibility:"visible"});$(this).siblings().css({opacity:1.0}).animate({opacity:0},500,function(){$t.siblings().css({visibility:"hidden",'z-index':0})});$(this).removeClass(settings.removeClassClose).removeClass(settings.removeClassActive)}else{$(settings.contentClass).css({opacity:0,visibility:"hidden"}).animate({opacity:0.1},10);$("."+$on).removeClass(settings.removeClassClose).removeClass(settings.removeClassActive);$(this).siblings().css({opacity:0,visibility:"visible",'z-index':100}).animate({opacity:1.0},500);$(this).addClass($off);$(this).blur()}});if($(this).find(settings.contentClass).position().left<0){$(this).find(settings.contentClass).css({left:-$(this).width(),width:$(this).width()})}var h=$(this).position().top+$(this).find(settings.contentClass).outerHeight()+$(this).find("."+$on).outerHeight()+settings.bottomPadding;if($p.outerHeight()-h<0){$(this).find(settings.contentClass).css({top:($p.outerHeight()-h)})}if($(this).find(settings.contentClass).offset().top>$(this).find("."+$on).offset().top){$(this).find(settings.contentClass).css({top:-($(this).find(settings.contentClass).offset().top-$(this).find("."+$on).offset().top),})}var adhCon=$(this).find(settings.contentClass).offset().top+$(this).find(settings.contentClass).outerHeight();var adhBut=$(this).find("."+$on).offset().top+$(this).find("."+$on).outerHeight();if(adhBut-adhCon>0){$(this).find("."+$on).css({top:-(adhBut-adhCon)})}z++});$(window).bind('resize',function(e){window.resizeEvt;$(window).resize(function(){clearTimeout(window.resizeEvt);window.resizeEvt=setTimeout(function(){$($mainObj).imageTag()},200)})})}}(jQuery));
