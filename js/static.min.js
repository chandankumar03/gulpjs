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

$(function () {

//    Need Help Search dropdown
    $('.st-nh-search-ip').on('keypress change keyup', function () {
        if (($(this).val()).length >= 3) {
            $(this).parents('.st-nh-sr-ip-wrap').find('.st-nh-sr-sug-wrap').slideDown(300);
        } else if (($(this).val()).length === 0) {
            $(this).parents('.st-nh-sr-ip-wrap').find('.st-nh-sr-sug-wrap').slideUp(300);
        }

    });
    $('.st-nh-search-ip').on('focusout', function () {

        if (($(this).val()).length === 0) {
            $(this).parents('.st-nh-sr-ip-wrap').find('.st-nh-sr-sug-wrap').slideUp(300);
        }

    });

// Detail faq section trigger   
    $('.st-faq-sec-name-listitem').on('click', function () {
        var sectab_id = $(this).attr('data-tab');
        $('.st-faq-sec-name-listitem').removeClass('current-tab');
        $('.st-faq-sec-content-int-wrap').removeClass('current-tab');
        $(this).addClass('current-tab');
        $("#" + sectab_id).addClass('current-tab');
    });

    //Write To Us Tabs Script
    $('.wtu-tabs-row .wtu-tab').on('click', function () {
        var wtutab_id = $(this).attr('data-tab');
        $('.wtu-tabs-row .wtu-tab').removeClass('current-tab');
        $('.wtu-tab-content-row .wtu-tab-int-content').removeClass('current-tab');
        $(this).addClass('current-tab');
        $("#" + wtutab_id).addClass('current-tab');
        $('.wtu-frm-row input[type=text],.wtu-frm-row input[type=number],.wtu-frm-row textarea').val('');
        $('.wtu-thank-wrap').hide();
        $("#"+wtutab_id + "  "+ '.wtu-from-wrap').show();
        $("#" + wtutab_id+"Frm").find("input,select,textarea,file,select2").each(function(){ $(this).parent("div").removeClass("frm-error-wrap").removeClass("frm-success-wrap");});
        $(".wtuUnResolvedComplaintFrm_orderid").css("display","none");
        $(".wtuUnResolvedIssueFrm_orderid").css("display","none");
        $(".wtuUnResolvedIssueFrm_block").css("display","none");
        grecaptcha.reset(widgetId1);
        grecaptcha.reset(widgetId2);
        grecaptcha.reset(widgetId3);
        $(".error-msg,.pf-text-red,.error-text").css('display','none');
//        $(".pf-text-red").css("display",'none');
    });

//    Remove Uploaded Images
    $('.wtu-file-uploaded-wrap .wtu-file-uloaded-rmv').on('click', function () {
        var wtuUpFileLen = $('.wtu-file-uploaded-wrap').children('.wtu-file-uloaded-row').length;
        if (wtuUpFileLen > 1) {
            $(this).closest('.wtu-file-uloaded-row').siblings('.wtu-file-addmore-row').slideDown(200);
            $(this).parent('.wtu-file-uloaded-row').remove();
        } else if (wtuUpFileLen === 1) {
            $(this).closest('.wtu-file-uloaded-row').siblings('.wtu-file-addmore-row').hide();
            $(this).parents('.wtu-upload-row').find('.wtu-file-upload-wrap').show();
            $(this).parent('.wtu-file-uloaded-row').remove();
        }

    });

//    Question Accordian
   $(document).on('click','.st-nh-results-list-item-q', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parents('.st-nh-results-list').find('.st-nh-results-list-item-a').slideUp(300);
        }
        else {
            $(this).parents('.st-nh-results-list').find('.st-nh-results-list-item-q').removeClass('active');
            $(this).parents('.st-nh-results-list').find('.st-nh-results-list-item-a').slideUp(200);
            $(this).addClass('active');
            $(this).siblings('.st-nh-results-list-item-a').slideDown(300);
        }
    });

    $('.wtu-frm-row .fname-ip').on('focusout', function () {
        var frmId = $(this).closest('form').attr('id');
        verifyFirstname(frmId);
    });
    $('.wtu-frm-row .email-ip').on('focusout', function () {
        var frmId = $(this).closest('form').attr('id');
        verifyEmailId(frmId);
    });
    $('.wtu-frm-row .mobile-ip').on('focusout', function () {
        var frmId = $(this).closest('form').attr('id');
        verifyMobileNo(frmId);
    });
    $('.wtu-frm-row .orderid-ip').on('focusout', function () {
        var frmId = $(this).closest('form').attr('id');
        //verifyOrderNo(frmId);
    });
    $('.wtu-frm-row .comments').on('focusout',function(){
        var frmId = $(this).closest('form').attr('id');
        verifyComment(frmId);
    })
    $('#wtuNewComplaintFrm .wtu-submit-btn').on('click', function () {
//        alert("in static page js");
//        var frmId = $(this).closest('form').attr('id');
//        verifyFirstname(frmId);
//        verifyEmailId(frmId);
//        verifyMobileNo(frmId);
//        verifyOrderNo(frmId);
    });
    $('#wtuUnResolvedComplaint .wtu-submit-btn,#wtuUnResolvedIssue  .wtu-submit-btn').on('click', function () {
        var frmId = $(this).closest('form').attr('id');
        verifyOrderNo(frmId);
    });

//Comment Validation Function
function verifyComment(frmId){
    var commentIp = $("#" + frmId).find('.comments');
    var commentVal = commentIp.val();
    if (commentVal === '') {
    commentIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
    } else {
    commentIp.parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
    }
}

//    FirstName Validation Function
    function verifyFirstname(frmId) {
        var fnameIp = $("#" + frmId).find('.fname-ip');
        var fnameVal = fnameIp.val();
        if (fnameVal === '') {
            fnameIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            fnameIp.parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    }
    //    Email Validation Function
    function verifyEmailId(frmId) {
        var emailIp = $("#" + frmId).find('.email-ip');
        var emailIpVal = emailIp.val();
        if (IsEmail(emailIpVal) === false) {
            emailIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            emailIp.parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    }
    //    MObile Validation Function
    function verifyMobileNo(frmId) {
        var mobileIp = $("#" + frmId).find('.mobile-ip');
        var mobileIpVal = mobileIp.val();
        if (mobileIpVal === '') {
            mobileIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (mobileIpVal.length < 10) {
            mobileIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (mobileIpVal.length > 10) {
            mobileIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        }
        else if (isNaN(mobileIpVal)) {
            mobileIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            mobileIp.parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    }
    //    MObile Validation Function
    function verifyOrderNo(frmId) {
        var mobileIp = $("#" + frmId).find('.orderid-ip');
        var mobileIpVal = mobileIp.val();
        if (mobileIpVal === '') {
            mobileIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else if (mobileIpVal.length < 9) {
            mobileIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } 
        else if (isNaN(mobileIpVal)) {
            mobileIp.parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
        } else {
            mobileIp.parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
        }
    }

//     login form validation
    $('.ck-login-frm-wrap .log-email').on('focusout', function () {

        verifyErLoginEmail();
    });    
    $('.ck-login-frm-wrap .log-pwd').on('keypress change keyup focus', function () {
        verifyErLoginPwd();
    });
    
    function verifyErLoginEmail() {        
        if (IsEmail(($('.ck-login-frm-wrap .log-email').val())) === false) {
            $('.ck-login-frm-wrap .log-email').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
            eremailFlag = 0;
        } else {
            $('.ck-login-frm-wrap .log-email').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
            eremailFlag = 1;
        }
        
    };
    function verifyErLoginEmailfr() {        
        if (IsEmail(($('.ck-login-forgot-wrap .log-email').val())) === false) {
            $('.ck-login-forgot-wrap .log-email').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
            eremailFlag = 0;
            $('.ck-forgot-email-sub-text').hide();
        } else {
            $('.ck-login-forgot-wrap .log-email').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
            eremailFlag = 1;
            $('.ck-login-frm-wrap,.ck-login-forgot-wrap').hide();
            $('.ck-login-forgot-reseted-wrap,.ck-forgot-email-sub-text').show();
        }
        
    };
    function verifyErLoginPwd() {
        if (($('.ck-login-frm-wrap .log-pwd').val()) === '') {
            $('.ck-login-frm-wrap .log-pwd').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
            erpwdFlag = 0;
        } else if (($('.ck-login-frm-wrap .log-pwd').val()).length < 6) {
            $('.ck-login-frm-wrap .log-pwd').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
            erpwdFlag = 0;
        }
        else {
            $('.ck-login-frm-wrap .log-pwd').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
            erpwdFlag = 1;
        }
    }    ;
//Password Reset Form Validation    
    $('#retrive-pwd-btn').on('click', function () {
        verifyResetEmail();
    });

    function verifyResetEmail() {
        if (IsEmail(($('.ck-login-forgot-initial-wrap .log-email').val())) === false) {
            $('.ck-login-forgot-initial-wrap .log-email').parent('div').addClass('frm-error-wrap').removeClass('frm-success-wrap');
            $('.ck-forgot-email-sub-text').hide();
        } else {
            $('.ck-login-forgot-initial-wrap .log-email').parent('div').removeClass('frm-error-wrap').addClass('frm-success-wrap');
            $('.ck-login-frm-wrap,.ck-login-forgot-wrap').hide();
            $('.ck-login-forgot-reseted-wrap,.ck-forgot-email-sub-text').show();
            // Add the email id the user has entered in the forgot password form
            $("#forgotemailid").html($("#emailid_forgot").val());
        }
    };
    $('.ck-login-m-forgot-link,.ck-pwd-reset-send-again').on('click', function () {
        $('.ck-login-frm-wrap,.ck-login-forgot-reseted-wrap').hide();
        // $('.ck-login-forgot-wrap').show();
        $('.ck-login-forgot-wrap').css('display','block');
        
    });
    $('.ck-login-m-login-link').on('click', function () {
        $('.ck-login-forgot-reseted-wrap,.ck-login-forgot-wrap,.ck-login-reg-wrap').hide();
        $('.ck-login-guest-modal,.ck-login-frm-wrap').show();
        allInputReset();
    });
    function allInputReset() {
        $('.ck-login-guest-modal input[type=text],.ck-login-guest-modal input[type=password],.ck-login-reg-wrap input[type=text],.ck-login-reg-wrap input[type=radio],.ck-login-reg-wrap input[type=number],.ck-login-reg-wrap input[type=password]').val('');
        $('.ck-login-guest-modal input').parent('div').removeClass('frm-error-wrap');
        $('.ck-login-guest-modal input').parent('div').removeClass('frm-success-wrap');        
    };
    
//    Track Your Order details function
    $('body').on('click','.st-nh-pro-tyo-btn', function () {
//        $('.tyo-track-dtl-row').slideUp(200);
        $(this).parents('.tyo-mul-sku-dtl-row').find('.tyo-track-dtl-row').slideDown(300);
        $(this).hide();
        $(this).siblings('.st-nh-pro-tyo-close-btn').css('display','block');
    });
    $('body').on('click','.st-nh-pro-tyo-close-btn', function () {
        $(this).parents('.tyo-mul-sku-dtl-row').find('.tyo-track-dtl-row').parent(".time-container").css("display","none");
        $(this).parents('.tyo-mul-sku-dtl-row').find('.tyo-track-dtl-row').slideUp(200);
        $(this).hide();
        $(this).siblings('.st-nh-pro-tyo-btn').show();
    });
    
//    TYO TT position
function mousePosition(el)
                                    {
                                        var elOffsetLeft = el.offset().left;  
                                        var elOffsetTop =  el.offset().top;  
                                        var elWidth = el.outerWidth(true);
                                        var elHeight = el.outerHeight(true);
                                        var elHalfWidth = elWidth/2;
                                        
                                        var wrapperDiv = $('.st-nh-tyo-wrap');
                                        var tooltipDiv = $('#track-order-tooltip');
                                        var tooltipDivHeight = tooltipDiv.outerWidth(true);
                                        var toopTipBottomOffset = tooltipDiv.offset().top+tooltipDiv.outerHeight(true);
                                        var wrapperBottomOffset = wrapperDiv.offset().top+wrapperDiv.outerHeight(true);
                                        if(el.hasClass('first'))
                                        {
                                            $('.tyo_hover_details').css('marginLeft',-49);
                                        }
                                        else if(el.hasClass('last'))
                                        {
                                            $('.tyo_hover_details').css('marginLeft',-288);
                                        }
                                        else
                                        {
                                           $('.tyo_hover_details').css('marginLeft',-165); 
                                        }
//                                      
                                      
                                       
                                            $('#track-order-tooltip').offset({
                                                left:elOffsetLeft+elHalfWidth,
                                                top:elOffsetTop+elHeight
                                            });
                                        
                                }
                                        
                                   
                                    
                            $(function () {
                            $('.bottom_timeline_content a').each(function(){
                                      var $obj = $(this);
                                    $(this).on('mouseenter', function () {

                                     $('#track-order-tooltip').show();
                                              mousePosition($obj);
                                     }).mouseleave(function() {
                                         $('#track-order-tooltip').hide();
                                         
                                      });
                            });
                            
                       
                            });
                         
    
});
//Generic Email Validation function
function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        return false;
    } else {
        return true;
    }
}
;



$(document).ready(function () {
    //added by Nishigandha N
    $('#franCity').select2({
        placeholder: 'Select City'
    });
    $('#city').select2({
        placeholder: 'Select City'
    });
    
    if($('.wtu-reason-sel').length>0){
        $('.wtu-reason-sel').select2();
    }
    if($('.st-er2-orders-list-row:first-child .st-nh-pro-tyo-btn').length>0){
        $('.st-er2-orders-list-row:first-child .st-nh-pro-tyo-btn').trigger('click');
    }
});

var filterInput = document.getElementById("furniture-filter-input"),
    filterInputHidden = document.getElementById("furniture-filter-input-val"),
    filterInputVal = [];
    filterHolder = document.getElementById("furex-filter-holder"),
    filterResult = document.getElementById("furex-filter-result"),
    furApply = document.getElementById("furApply"),
    furDiscard = document.getElementById("furDiscard"),
    filterLiList = filterHolder.querySelectorAll("li")

filterInput.addEventListener("click", showHidefilter);
filterInput.addEventListener("keyup", searchFilter);
furApply.addEventListener("click", applyFurnitureFilter);
furDiscard.addEventListener("click", resetFurnitureFilter);

function showHidefilter(event) {
  filterInput.className = "inpt active";
  filterHolder.style.display = "block";
  document.addEventListener("click", hidefilter);
  event.stopPropagation();
};
function searchFilter() {
  var filter = filterInput.value.toLowerCase();

  for (var i = 0; i < filterLiList.length; i++) {
    if (filterLiList[i].innerText.toLowerCase().indexOf(filter) > -1) {
      filterLiList[i].style.display = "block";
    } else {
      filterLiList[i].style.display = "none";
    }
  }
}
function hidefilter(event) {
  $(event.target).closest('#furex-filter-holder').length < 1 ? (
    filterInput.classList.contains("active") ? (
      event.stopPropagation(),
      filterInput.className = "inpt",
      filterHolder.style.display = "none",
      filterInput.value = "",
      showAllFilterOption(),
      checkInput()
    ) : null
  ) : null
}

function showAllFilterOption() {
  for (var i = 0; i < filterLiList.length; i++) {
    filterLiList[i].style.display = "block";
  }
}

function checkInput() {
  for (var li in filterLiList) {
    filterLiList.hasOwnProperty(li) && filterLiList[li] != undefined ?
      filterLiList[li].classList.contains("selected") ? filterLiList[li].querySelector("input").checked = true : filterLiList[li].querySelector("input").checked = false : null
  }
    document.removeEventListener("click", hidefilter)
}

function applyFurnitureFilter(event) {
  event.preventDefault();
  for (var li in filterLiList) {
    if(filterLiList.hasOwnProperty(li) && filterLiList[li] != undefined) {
      if(filterLiList[li].querySelector("input").checked && filterLiList[li].classList.contains("selected")) {

      } else if(filterLiList[li].querySelector("input").checked && !(filterLiList[li].classList.contains("selected"))) {
        filterLiList[li].className = "selected"
        var newLi = document.createElement("li");
        newLi.innerHTML = filterLiList[li].innerText.trim() + "<a href='javascript:void(0)' class='filter-remove'></a>";
        filterResult.querySelector("ul").appendChild(newLi);
        newLi.querySelector(".filter-remove").addEventListener("click", filterRemove);
        filterInputVal.push(filterLiList[li].innerText.trim());

      } else if(filterLiList[li].querySelector("input").checked !== "false" && filterLiList[li].classList.contains("selected")) {
        filterLiList[li].className = "";
        filterLiList[li].querySelector("input").checked = false;
        for(var filterList in filterResult.querySelectorAll("li")) {
          if(filterResult.querySelectorAll("li").hasOwnProperty(filterList) && filterResult.querySelectorAll("li")[filterList] != undefined) {
            filterResult.querySelectorAll("li")[filterList].innerText.trim() === filterLiList[li].innerText.trim() ? (filterResult.querySelectorAll("li")[filterList].outerHTML = "") : null
          }
        }
        for(var i=0;i<filterInputVal.length;i++) {
          filterInputVal[i].trim() === filterLiList[li].innerText.trim() ? filterInputVal.splice(i, 1) : null
        }

      } else {
        filterLiList[li].className = "";
        filterLiList[li].querySelector("input").checked = false;
        filterLiList[li].style.display = "block"
      }
    }
  }
  if(filterInputVal.length == 0) {
    filterInputHidden.value = '';
  } else {
    filterInputHidden.value = JSON.stringify(filterInputVal)
  }
  filterInput.parentElement.className = "furniture-ex-search-wrap";
  filterInput.nextElementSibling.style.display = "none";

  document.body.click();
  document.querySelector(".furniture-ex-search-wrap .error-msg").style.display = "none";
  filterResult.style.display = "block";
}

function resetFurnitureFilter(event) {
  event.preventDefault();
  for (var li in filterLiList) {
    if(filterLiList.hasOwnProperty(li) && filterLiList[li] != undefined) {
      filterLiList[li].className = "";
      filterLiList[li].querySelector("input").checked = false;
      filterLiList[li].style.display = "block"
    }
  }
  filterResult.querySelector("ul").innerHTML = "";
  filterInputVal = [];
  if(filterInputVal.length == 0) {
    filterInputHidden.value = '';
  } else {
    filterInputHidden.value = JSON.stringify(filterInputVal)
  }
  document.body.click();
}
function filterRemove(event) {
  for (var li in filterLiList) {
    if(filterLiList.hasOwnProperty(li) && filterLiList[li] != undefined) {
      filterLiList[li].querySelector("input").checked && filterLiList[li].innerText.trim() === this.parentElement.innerText ? (
        filterLiList[li].className = "",
        filterLiList[li].querySelector("input").checked = false,
        removeFilterVal(this.parentElement.innerText.trim()),
        this.parentElement.outerHTML = ""
      ) : null
    }
  }
}

function removeFilterVal(parentElementText) {
  for(var i=0;i<filterInputVal.length;i++) {
    filterInputVal[i] === parentElementText ? filterInputVal.splice(i, 1) : null
  }
  if(filterInputVal.length == 0) {
    filterInputHidden.value = '';
  } else {
    filterInputHidden.value = JSON.stringify(filterInputVal);
  }
}
var PF = PF || {};

if( typeof PF.CONTACTPAGE === 'undefined' ) {
    (function (a, $) {
        var utils = a.UTILITIES;

        var x = {
                    init : function(){
                         $(".uploadbtn").css('background','none');
                         $("option_select").removeAttr('tabindex');
                        //feedback
                        $(utils.d).on('change','#option_select',function(){
                            if(this.value == "Order"){
                                    $('#order_details').show();
                                    $('#order_show').show();
                                    $('.append_txt').hide();
                                    $('#url_show').hide();
                                    $('#coupon_show').hide();
                                    $('#subreason_show').hide();

                            }
                            else if(this.value == "Delivery")
                            {
                                    $('#order_details').show();
                                    $('#order_show').show();
                                    $('.append_txt').hide();
                                    $('#url_show').show();
                                    $('#coupon_show').hide();
                                    $('#subreason_show').hide();
                            }
                            else if(this.value == "Return")
                            {
                                    $('#order_details').show();
                                    $('#order_show').show();
                                    $('.append_txt').show();
                                    $('#url_show').hide();
                                    $('#coupon_show').hide();
//                                    $('#subreason_show').show();
                                    $("#subreason_show").css("display","block");
                            }
                            else if(this.value == "Product")
                            {
                                    $('#order_details').show();
                                    $('#order_show').hide();
                                    $('#coupon_show').hide();
                                    $('#url_show').show();
                                    $('.append_txt').hide();
                                    $('#subreason_show').hide();
                            }
                            else if(this.value == "Coupons")
                            {
                                    $('#order_details').show();
                                    $('#coupon_show').show();
                                    $('#order_show').hide();
                                    $('#url_show').hide();
                                    $('.append_txt').hide();
                                    $('#subreason_show').hide();
                            }    
                            else{
                                    $('#order_details').hide();
                                    $('#subreason_show').hide();
                            }

                            $('#option_select').css('border-color','#C7C7C7');
                            $('#subreason_select').css('border-color','#C7C7C7');
                        });
                        $(utils.d).on('click','#feedback_submit',function(){
                            x.newComplaint();
                        });
                        
                        //compaints        
                        $(utils.d).on('click','#btn_complaint',function(){
                            x.unresolvedComplaint('wtuUnResolvedComplaintFrm',1);
                        });
                        
                        //escalation
                        $(utils.d).on('click','#btn_complaint2',function(){
                            // x.unresolvedComplaint('wtuUnResolvedIssue',2);
                            x.unresolvedComplaint('wtuUnResolvedIssueFrm',2);
                        });
                        
                        //Changed by ravi

                        // Add a counter to track the images
                        var ctr = 0;

                        //On the Image change
                        $('#file_1').on('change',function(){
                            var str = $(this).attr('id');
                            var idval = str.split("_"); 
                            var currentId = 1;
                            if(ctr==0){ ctr=1; }
                            currentId= ctr;
                            // if(x.checkSpecialCharacters($('#file_1'+currentId)[0].files[0].name) == false)
                            if(x.checkSpecialCharacters($('#file_1')[0].files[0].name) == false)
                            {
                                alert("Invalid file name!");
                                return false;
                            }
                            // var type = $('#file_1_'+currentId)[0].files[0].name.split('.').pop().toLowerCase();
                            // var size = $('#file_1_'+currentId)[0].files[0].size;

                            var type = $('#file_1')[0].files[0].name.split('.').pop().toLowerCase();
                            var size = $('#file_1')[0].files[0].size;

                            $('#feedback_submit').attr('disabled', 'disabled');
                            $('#feedback_submit').addClass('disabled');
                            $('#feedback_submit').val('Uploading...');
                            switch (type) {
                                case 'doc': 
                                case 'docx': 
                                case 'jpg':
                                case 'jpeg': 
                                case 'png': 
                                case 'bmp':
                                    $('#invalid_size').html('');
                                    if(size<=1049576*5){
                                        $('#invalid_size').html('');
                                        $('#invalid_file').css('color','#c7c7c7');
                                        x.getDataFeedback(type,currentId);
                                        $('#feddback_file_'+currentId).removeClass('add-link');
                                        
                                    } else{
                                        $('#invalid_size').html('Max 5Mb allowed!');
                                        $('#feedback_submit').removeAttr('disabled');
                                        $('#feedback_submit').removeClass('disabled');
                                        $('#feedback_submit').val('Submit');
                                        return false;
                                    }
                                    break;
                                default:
                                    $('#invalid_file').css('color','red');
                                    $('#invalid_size').html('Please select valid file');
                                    $('#feedback_submit').removeAttr('disabled');
                                    $('#feedback_submit').removeClass('disabled');
                                    $('#feedback_submit').val('Submit');
                                    //$('#feddback_file_'+currentId).html($('#file_'+currentId).val().replace(/C:\\fakepath\\/i, ''));
                                    return false;
                            }
                            
                         // Added to hide-show the uploaded image names and remve links              
                                
                                // $("#addbutton").css('display','block');
                                var imglen  = $("#imagesdiv .loadedimages").length;

                                //File Name 
                                var imagename = $("#file_1")[0].files[0].name;

                                    if(imglen<3){
                                        
                                        var content ='<div class="wtu-file-uloaded-name font-13 pf-text-grey loadedimages">'+imagename+'</div><a href="javascript:void(0)" class="wtu-file-uloaded-rmv font-12 pf-text-brown imagedel" id="rem_'+ctr+'"> Remove </a></div>';
//                                        if(ctr==0){
//                                            $(".uploadbtn").addClass('wtu-file-up-btn');
//                                            $(".uploadbtn").css("display","inline-block");
//                                            $(".uploadbtn2").css("display","none");
//                                        }
                                        ctr++;
                                        if(ctr==4){
                                            $("#imagesdiv").append(content);
                                            $(".uploadbtn").css('display','none');  // Hide the original click button
                                            $(".uploadbtn2").css('display','none');  // Hide the original click button
                                        }
                                        else{
                                            $("#imagesdiv").append(content);
                                            $(".uploadbtn").css("display","none");
                                            $(".uploadbtn2").css("padding","2px 5px 2px 30px");
                                            $(".uploadbtn2").css('background','url("../images/svg/fileupload_plus_icon.svg") no-repeat 3px center');
                                            $(".uploadbtn2").css("display","block");
                                        }       
                                    }
                                    
                                    if($("[id^='rem_']").length > 2){
                                       $(".uploadbtn").css('display','none');  // Hide the original click button
                                       $(".uploadbtn2").css('display','none');  // Hide the original click button
                                    }
                        });


                        // For Image Deletion logic
                            $('body').on('click','.imagedel',function(){
                                //ctr--;
                                $(".uploadbtn").css('display','block');
                                 var imglen  = $("#imagesdiv .loadedimages").length;
                                 $(this).prev().remove();
                                 $(this).remove();
                                if(imglen < 3 && imglen >1){
                                    $(".uploadbtn").css("display","none");
                                     $(".uploadbtn2").css("padding","2px 5px 2px 30px");
                                    $(".uploadbtn2").css('background','url("../images/svg/fileupload_plus_icon.svg") no-repeat 3px center');
                                    $(".uploadbtn2").css("display","block");
                                }
                                if(imglen==1){
                                    $(".uploadbtn").addClass('wtu-file-up-btn');
                                    $(".uploadbtn").css("display","inline-block");

                                    $('.uploadbtn2').css('display','none');
                                }
                                else{
                                    $("#file_1").css("display","none");
                                    $(".uploadbtn").css("display","none");
                                    $(".uploadbtn2").css("padding","2px 5px 2px 30px");
                                    $(".uploadbtn2").css('background','url("../images/svg/fileupload_plus_icon.svg") no-repeat 3px center');
                                    $('.uploadbtn2').css('display','block');
                                }
                                var srno = $(this).attr("id").split("_")[1];
                                $.ajax({
                                    url: root_url + '/site_escalation/delUploadedImage',
                                    data: { "srno":srno},
                                    type: "POST",
                                    async: true,                
                                    success: function (data) 
                                    {                         
                                        
                                    }
                                });
                            });

                        $('#complaint_file').on('change',function(){
                            if(x.checkSpecialCharacters($('#complaint_file')[0].files[0].name) == false)
                            {
                                alert("Invalid file name!");
                                return false;
                            }
                            var type = $('#complaint_file')[0].files[0].name.split('.').pop().toLowerCase();
                            var size = $('#complaint_file')[0].files[0].size;
                            $('#btn_complaint').attr('disabled', 'disabled');
                            $('#btn_complaint').addClass('disabled');
                            $('#btn_complaint').val('Uploading...');
                            switch (type) {
                                case 'doc': 
                                case 'docx': 
                                case 'jpg':
                                case 'jpeg': 
                                case 'png': 
                                case 'bmp':
                                    if(size<=1049576*5){
                                        $('#invalid_size').html('');
                                        $('#frm_invalid_file').css('color','#c7c7c7');
                                        $('#feddbackcomplaint_file').html($('#complaint_file').val().replace(/C:\\fakepath\\/i, ''));
                                        x.getDataComplaints(type);
                                    } else{
                                        $('#frm_invalid_file').html('Max 5Mb allowed!').css('color','#d0021b');
                                        $('#btn_complaint').removeAttr('disabled');
                                        $('#btn_complaint').removeClass('disabled');
                                        $('#btn_complaint').val('Submit');
                                        return false;
                                    }
                                    break;
                                default:
                                    $('#frm_invalid_file').css('color','red');
                                    $('#feddbackcomplaint_file').html($('#complaint_file').val().replace(/C:\\fakepath\\/i, ''));
                                    $('#btn_complaint').removeAttr('disabled');
                                    $('#btn_complaint').removeClass('disabled');
                                    $('#btn_complaint').val('Submit');
                                    return false;
                            }

                            // Added by Aditya
//                            if($("#complaint_file").length>0){
//                                $("#complaint_file").parent().css("display","none");
//                                $(".wtu-file-uploaded-wrap1").css("display","block");
//                                $(".imgname1").html($("#complaint_file").val());
//                            }
                        });
                        
                        //This is used for escalation 2
                        $('#complaint_file2').on('change',function(){
                            if(x.checkSpecialCharacters($('#complaint_file2')[0].files[0].name) == false)
                            {
                                alert("Invalid file name!");
                                return false;
                            }
                            var type = $('#complaint_file2')[0].files[0].name.split('.').pop().toLowerCase();
                            var size = $('#complaint_file2')[0].files[0].size;
                            $('#btn_complaint2').attr('disabled', 'disabled');
                            $('#btn_complaint2').addClass('disabled');
                            $('#btn_complaint2').val('Uploading...');
                            switch (type) {
                                case 'doc': 
                                case 'docx': 
                                case 'jpg':
                                case 'jpeg': 
                                case 'png': 
                                case 'bmp':
                                    if(size<=1049576*5){
                                        $('#invalid_size2').html('');
                                        $('#frm_invalid_file2').html("").css('color','#c7c7c7').removeClass("error-txt");
                                        $('#feddbackcomplaint2_file').html($('#complaint_file2').val().replace(/C:\\fakepath\\/i, ''));
                                        x.getDataComplaints2(type);
                                    } else{
                                        $('#frm_invalid_file2').html('Max 5Mb allowed!').css('color','#d0021b');
                                        $('#btn_complaint2').removeAttr('disabled');
                                        $('#btn_complaint2').removeClass('disabled');
                                        $('#btn_complaint2').val('Submit');
                                        return false;
                                    }
                                    break;
                                default:
                                    $('#frm_invalid_file2').css('color','red');
                                    $('#feddbackcomplaint22_file').html($('#complaint_file2').val().replace(/C:\\fakepath\\/i, ''));
                                    $('#btn_complaint2').removeAttr('disabled');
                                    $('#btn_complaint2').removeClass('disabled');
                                    $('#btn_complaint2').val('Submit');
                                    return false;
                            }
                            // Added by Aditya
//                            // Added to display the name of image uploaded for complaint2
//                                if($("#complaint_file2").length>0){
//                                    $("#complaint_file2").parent().css("display","none");
//                                    $(".wtu-file-uploaded-wrap2").css("display","block");
//                                    $(".imgname2").html($("#complaint_file2").val());
//                                }
                        });
                        
                        if(!XMLHttpRequest.prototype.sendAsBinary){ 
                                XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
                                        function byteValue(x) {  
                                                return x.charCodeAt(0) & 0xff;  
                                        }  
                                        var ords = Array.prototype.map.call(datastr, byteValue);  
                                        var ui8a = new Uint8Array(ords);  
                                        try{
                                                this.send(ui8a);
                                        }catch(e){
                                                this.send(ui8a.buffer);
                                        }  
                                };  
                        }
                    },
                    newComplaint : function(){
                        $('#subreason_select').css('border-color','#C7C7C7');
                        $('#invalid_size').html('');
                        $('.subreason').hide();
                        var name = $('#name').val();
                        var email =$('#email').val();
                        var mobile = $('#mobile').val();
                        var feedback = $('#feedback').val();
                        var orderid = $('#order_id').val();
                        var coupon_code = $('#coupon_code').val();
                        var captcha=  (recaptcha == 'VISIBLE')?$.trim(grecaptcha.getResponse(widgetId1)):'';
                        var option = utils.d.getElementById("option_select").value;
                        var fileSelected = $("#imagesdiv .loadedimages").length;
                        if($("#file_1").val() != ''){
                            var size = $('#file_1')[0].files[0].size;
                        }
                        var error = 0;
                        if(name == ''){
                            $("#name").parent().addClass('frm-error-wrap');
                            $(".errorname").html("Required");
                            $(".errorname").css("display","block");
                            error=1;
                        }else{
                            if(x.isValidName(name) == false){
                                error=1;
                                $('#name').val("");
                                $('.name').html('Name should contain alphabets only').show();                                
                            }else{
                                $('.name').hide();
                            }
                        }
                        if(email == ''){
                            $('.email').show();
                            $("#email").parent().addClass('frm-error-wrap');
                           $(".erroremail").html("Required");
                           $(".erroremail").css("display","block");
                            error=1;
                        }else{
                            if(x.isValidEmailAddress(email) == false){
                                error=1;
                                $('#email').val("");
                                $('.email').html('Incorrect email ID').show();

                            }else
                            {
                                $('.email').hide();
                            }
                        }
                        if(mobile == ''){
                            $('.mobile_number').css('display','block');
                            $('.mobile_number').css('position','static');
                            $('.mobile_number').parent().addClass('frm-error-wrap');
                            $(".mobile_number").html("Required");
                            error=1;
                        }else
                        {
                            if(!x.isValidPhoneNumber(mobile)){
                                error=1;
                                $('.mobile_number').val("");
                                $('.mobile_number').html('Need a valid 10-digit number').show();
                                $('.mobile_number').parent().removeClass('frm-success-wrap');
                                $('.mobile_number').parent().addClass('frm-error-wrap');
                            }else
                            {
                                $('.mobile_number').hide();
                            }
                        }
                        if(feedback == '')
                        {
                            $('.feedback').parent().addClass('frm-error-wrap');
                            $('.feedback').show();
                            $('.feedbacknewcomplaint').html("Required");
                            error=1;
                        }else
                        {
                            $('#feedback').css('border-color','#1e9d6d');
                            $('.feedback').hide();
                        }
                        if (option == "")
                        { 
                            $("#option_select").parent().addClass('frm-error-wrap');
                            $('.wtu-frm-right > .reason').css('display','block');
                             $('.reason').css('color','#D0021B');
                             $('.reason').css('position','inherit');
                             error=1;
                        }
                        else{
                            $("#option_select").parent().addClass('frm-success-wrap');
                              $('.wtu-frm-right > .reason').css('display','none');
                            $('.reason').css('display','none');
                        }

                        var drop_option = $('#option_select option:selected').val();
                        var subreason   = $('#subreason_select option:selected').val();
                        if((drop_option == "Order" || drop_option == "Delivery" || drop_option == "Return") && (orderid == ''))
                        {
                                 if(drop_option == "Return" && subreason == "none")
                                 {
                                     
                                    $('#subreason_select option[value="none"]').text('Please select reason');
                                    $('#subreason_select').css('border-color','red');
                                    error=1;
                                    $('.coupon_code').hide();
                                 }
                                 $('.order_id').show().parent("div.wtu-frm-right").addClass("frm-error-wrap");
                                 $('.reason').hide();
                                 error=1;
                        }   
                        else if(drop_option == "Coupons" && coupon_code == "")
                            {
                                $('.coupon_code').show();
                                $('.reason').hide();
                                error=1;
                            }
                        else if(drop_option == "Return"){
                                if(subreason == "none"){
                                    $('#subreason_select option[value="none"]').text('Please select reason');
                                    $('#subreason_select').css('border-color','red');
                                    error=1;
                                    $('.coupon_code').hide();
                                    $('.reason').hide();
                                }else if(fileSelected === 0 && subreason!='Incomplete items or contents missing') {
                                    $('#invalid_size').html('Please select a file');
                                    error=1;
                                }
                        }
                        else
                        {
                            $('.coupon_code').hide();
                            $('.order_id').hide();
                            //Commented because it was hiding the main reason error
                            // $('.reason').hide();
                        }



                        var ext = $('#file_1').val().split('.').pop().toLowerCase();
                        if($.inArray(ext, ['docx','doc','png','jpg','jpeg','bmp','']) == -1) {
                            var errMsg='';
                            if($.trim($('#invalid_size').html()) != "")
                            {    
                                errMsg=$('#invalid_size').html;
                                errMsg+='<br/>';
                            }
                            errMsg+='Please select a valid file';
                            $('#invalid_size').html(errMsg);
                           //$('#invalid_file').html('.jpg, .jpeg, .png or .bmp Only. Max Size 1 mb');
                            $('#invalid_file').css('color','red');
                            if($('#invalid_size').html() != "")
                            {$('#invalid_size').html('');}
                           error=1;
                        }
                        if(size>1048576*5){
                            $('#invalid_size').html('Max 5Mb allowed!');
                            error=1;
                        }
                        if(captcha == '' && recaptcha == 'VISIBLE')
                        {
                            $(".feedbackcaptcha").addClass('font-13 pf-semi-bold-text');
                            $(".feedbackcaptcha").css('color','#d0021b');
                            $(".feedbackcaptcha").css('display','block');
                            error=1;
                        }
                        else
                        {
                            $(".feedbackcaptcha").css('display','none');
                        }
                        // ajax used for validating 1st bracket attribute//
                        if(error == 0)
                        {   
                            if(recaptcha == "VISIBLE"){
                                x.newComplaintSubmit();
                            }else{
                                grecaptcha.execute(widgetId1);
                            }
                        }else{
                            grecaptcha.reset(widgetId1);
                            $("#feedback_submit").removeClass('btn-loader');
                            return false;
                        }
                    },
                    newComplaintSubmit:function(){
                        $("#feedback_submit").addClass('btn-loader');
                        var grvs = parseInt(utils.getParameterByName('grvs'));
                        if(grvs === 1){
                                var path = root_url+"/site_escalation/feedback_orderid_check?grvs=1";
                            } else{
                                var path = root_url+"/site_escalation/feedback_orderid_check";
                            }
                            //var formData = new FormData($('#frm_feedback')[0]);
                            var formData = $('#wtuNewComplaintFrm').serialize();

                            var _ajaxSetUpOptions = {
                                processData : false,
                                cache : false
                            };
                            var _beforeSend = function () {
                                    PF.HEADER.addBlueButtonLoader('frm_feedback');
                                    $('#invalid_file').css('color','#c7c7c7');
                                    $('#feedback_submit').attr('disabled','disabled');
                            };
                            utils.makeRequest( path, 'POST', formData, x.feedbackResponse, x.handleError, _beforeSend, '', _ajaxSetUpOptions );
                    },
                    unresolvedComplaint : function( formid, request_from ){
                        var orderid = $('#'+formid+'_orderid').val();
                        var comments =$('#'+formid+'_comments').val();
                        var captcha = "";
                        var size = "";
                        if(request_from === 1){
                            if($("#complaint_file").val() != ''){
                                size = $('#complaint_file')[0].files[0].size;
                            }
                        }else{
                            if($("#complaint_file2").val() != ''){
                                size = $('#complaint_file2')[0].files[0].size;
                            }
                        }
                        var error = 0;
                        if(orderid == '')
                        {
                            $('.'+formid+'_orderid').show();
                            $('.'+formid+'_orderid').html("Required");
                            error = 1;
                        }
                        else
                        {
                            $('.'+formid+'_orderid').hide();
                        }
                        
                        if(request_from === 1) {
                            var ext = $('#complaint_file').val().split('.').pop().toLowerCase();
                            if($.inArray(ext, ['doc','docx','png','jpg','jpeg','bmp','']) == -1) {
                               //$('#frm_invalid_file').html('.jpg, .jpeg, .png or .bmp Only. Max Size 1 mb');
                                $('#frm_invalid_file').css('color','red');
                                grecaptcha.reset(widgetId2);
                                $('#frm_complaints_6_letters_code').val('');
                               if($('#frm_invalid_file').html() != "")
                               {$('#frm_invalid_file').html('');}
                                error=1;
                            }

                            if(size>1048576*5){
                                $('#frm_invalid_file').html('Max 5Mb allowed!').css('color','#d0021b');
                                error=1;
                            }
                        }else {
                            var ext = $('#complaint_file2').val().split('.').pop().toLowerCase();
                            if($.inArray(ext, ['doc','docx','png','jpg','jpeg','bmp','']) == -1) {
                               //$('#frm_invalid_file').html('.jpg, .jpeg, .png or .bmp Only. Max Size 1 mb');
                                $('#frm_invalid_file2').css('color','red');
                                grecaptcha.reset(widgetId3);
                                $('#frm_complaints2_6_letters_code').val('');
                               if($('#frm_invalid_file2').html() != "")
                               {$('#frm_invalid_file2').html('');}
                                error=1;
                            }

                            if(size>1048576*5){
                                $('#frm_invalid_file2').html('Max 5Mb allowed!').css('color','#d0021b');
                                error=1;
                            }
                        }
//                        var escext = $('#escalate_files').val().split('.').pop().toLowerCase();
//                        if($.inArray(escext, ['doc','docx','png','jpg','jpeg','bmp','']) == -1) {
//                           //$('#esc_invalid_file').html('.jpg, .jpeg, .png or .bmp Only. Max Size 1 mb');
//                            $('#esc_invalid_file').css('color','red');
//                            refresh_Captcha('escalate_captchaimg');
//                            $('#frm_escalate_6_letters_code').val('');
//                           if($('#frm_escalate_invalid_size').html() != "")
//                           {$('#frm_escalate_invalid_size').html('');}
//                            error=1;
//                        }
                        if(comments == '')
                        {
                            if(formid=="wtuUnResolvedComplaintFrm"){
                               $("#wtuUnResolvedComplaintFrm_comments").parent().addClass('frm-error-wrap');
                               $(".wtuUnResolvedComplaintFrm_comments").html("Required");
                               $(".wtuUnResolvedComplaintFrm_comments").css("display","block");
                            }
                            else if(formid=="wtuUnResolvedIssueFrm"){
                                    $("#wtuUnResolvedIssueFrm_comments").parent().addClass("frm-error-wrap");
                                    $(".wtuUnResolvedIssueFrm_comments").html("Required");
                                    $(".wtuUnResolvedIssueFrm_comments").css("display","block");
                            }

                            error = 1;
                        }
                        else
                        {
                            $('#'+formid+'_comments').css('border','solid 2px #1e9d6d');
                            $('.'+formid+'_comments').hide();
                            $('.wtuUnResolvedComplaintFrm_comments').css('display','none');
                            $('.wtuUnResolvedIssueFrm_comments').css('display','none');
                        }


                        if(recaptcha == 'VISIBLE'){
                            if(request_from == 1 ){
                                captcha = $.trim(grecaptcha.getResponse(widgetId2));
                            }else{
                                captcha = $.trim(grecaptcha.getResponse(widgetId3));
                            }
                            if(captcha == '')
                            {
                                
                                if(formid=="wtuUnResolvedComplaintFrm"){
                                    $(".unresolvedcaptcha").addClass('font-13 pf-semi-bold-text');
                                    $(".unresolvedcaptcha").css('color','#d0021b');
                                    $(".unresolvedcaptcha").css('display','block');                                
                                }
                                else if(formid=="wtuUnResolvedIssueFrm"){
                                    $(".issuecaptcha").addClass('font-13 pf-semi-bold-text'); 
                                    $(".issuecaptcha").css('color','#d0021b');
                                    $(".issuecaptcha").css('display','block');  
                                }
                                error=1;
                            }
                            else
                            {
                                $(".issuecaptcha").css('display','none');
                                $(".unresolvedcaptcha").css('display','none');
                            }
                        }

                        if(error == 0)
                        {
                            if(recaptcha == 'VISIBLE'){
                                x.unresolvedComplaintSubmit(formid,request_from);
                            }else{
                                if(request_from == 1 ){
                                    grecaptcha.execute(widgetId2);
                                }else{
                                    grecaptcha.execute(widgetId3);
                                }
                            }
                        }else{
                            $("#btn_complaint").removeClass('btn-loader');
                            $("#btn_complaint2").removeClass('btn-loader');
                            if(request_from === 1) {
                                grecaptcha.reset(widgetId2);
                            }else{
                                grecaptcha.reset(widgetId3);
                            }
                            return false;
                        }
                        
                    },
                    unresolvedComplaintSubmit:function(formid,request_from){
                        var grvs = parseInt(utils.getParameterByName('grvs'));
                        var formData = $('#'+formid).serialize();
                        formData+="&request_from="+request_from;
                        formData+="&formid="+formid;
                        if(request_from === 1) {
                            $("#btn_complaint").addClass('btn-loader');
                        }else{
                            $("#btn_complaint2").addClass('btn-loader');
                        }
                        var path = "";
                        if(grvs === 1){
                            path = root_url+"/site_escalation/complaints?grvs=1";
                        } else{
                            path = root_url+"/site_escalation/complaints";
                        }
                        $.ajax({                
                                url: path,
                                type: "POST",          
                                cache: false,
                                data: formData,
                                beforeSend: function(){
                                        if(formid == "frm_complaints")
                                        {
                                                PF.HEADER.addBlueButtonLoader('frm_complaints');
                                                $('#frm_invalid_file').css('color','#c7c7c7');
                                        }else
                                        {
                                                PF.HEADER.addBlueButtonLoader('frm_complaints2');
                                                $('#frm_invalid_file2').css('color','#c7c7c7');
                                        }

                                },
                                success: function(data){
                                    $("#btn_complaint").removeClass('btn-loader');
                                    $("#btn_complaint2").removeClass('btn-loader');
                                    if(request_from === 1) {
                                        grecaptcha.reset(widgetId2);
                                    }else{
                                        grecaptcha.reset(widgetId3);
                                    }
                                   if(data == "success")
                                   {   
                                       if(request_from === 1) {
                                            $('#error').css('display','none');
                                            $("#wtuUnResolvedComplaint .wtu-from-wrap").css('display','none');
                                            $("#wtuUnResolvedIssue .wtu-thank-wrap").css('display','none');
                                            $("#wtuUnResolvedComplaint .wtu-thank-wrap").css('display','block');
                                            $(".cs_thankyou_block_for_complaint").css("display","block");
                                            PF.HEADER.removeBlueButtonLoader(formid);
                                        }else{
                                            $('#error').css('display','none');
                                            $("#wtuUnResolvedIssue .wtu-from-wrap").css('display','none');
                                            $("#wtuUnResolvedComplaint .wtu-thank-wrap").css('display','none');
                                            $("#wtuUnResolvedIssue .wtu-thank-wrap").css('display','block');
                                            $(".cs_thankyou_block_for_complaint2").css("display","block");
                                            PF.HEADER.removeBlueButtonLoader(formid);
                                        }
                                    }
                                   else
                                   {
                                        var json_obj;
                                        var errormsg='';    
                                        try {    
                                           json_obj = $.parseJSON(data);     
                                        } catch(e) {     
                                          json_obj = data;   
                                        }
                                      if( typeof json_obj['error'] != 'undefined')
                                        {
                                            $('#error').css('display','block');
                                            $('#error').html("<span>"+json_obj['error']+"</span>");
                                        }
                                       else
                                       {
                                        $('.wtu-tab-content').css('display','block');
                                           $('#error').css('display','none');
                                           $('.error-txt').css('display','none');
                                           $.each(json_obj, function(index, value){
                                              
                                           if(index == "capcha")
                                            { 
//                                                    $('#'+formid+'_6_letters_code').val("");
                                                if(formid=="wtuUnResolvedComplaintFrm"){
                                                        $(".unresolvedcaptcha").addClass('font-13 pf-semi-bold-text');
                                                        $(".unresolvedcaptcha").css('color','#d0021b');
                                                        $(".unresolvedcaptcha").css('display','block');                 
                                                }
                                                else if(formid=="wtuUnResolvedIssueFrm"){
                                                        $(".issuecaptcha").addClass('font-13 pf-semi-bold-text'); 
                                                        $(".issuecaptcha").css('color','#d0021b');
                                                        $(".issuecaptcha").css('display','block');  
                                                }
                                                
                                                $('#'+formid+'_6_letters_code').val('');
                                            }
                                            else if(index=="wtuUnResolvedComplaintFrm_orderid"){
                                                $('#wtuUnResolvedComplaintFrm_orderid').parent().removeClass('frm-success-wrap');
                                                $('#wtuUnResolvedComplaintFrm_orderid').parent().addClass('frm-error-wrap');
                                                 $('.wtuUnResolvedComplaintFrm_orderid').html(value);
                                                 $(".wtuUnResolvedComplaintFrm_orderid").css('display','block');
                                            }
                                            else if(index=="wtuUnResolvedIssueFrm_orderid"){
                                                $('#wtuUnResolvedIssueFrm_orderid').parent().removeClass('frm-success-wrap');
                                                $('#wtuUnResolvedIssueFrm_orderid').parent().addClass('frm-error-wrap');
                                                $('.wtuUnResolvedIssueFrm_orderid').html(value);
                                                $('.wtuUnResolvedIssueFrm_orderid').css('display','block');
                                            }
                                            else if(index == "wtuUnResolvedComplaintFrm_block")
                                            {
                                                $("#wtuUnResolvedComplaint .wtu-from-wrap").css('display','none');
                                                $("#wtuUnResolvedComplaint .wtu-thank-wrap").css('display','block');
                                                $('#wtuUnResolvedComplaint .wtu-thank-wrap').html(value);
                                                $('#wtuUnResolvedComplaint .wtu-thank-wrap').append('<br><a href="javascript:void(0)" onclick="location.reload();" style="    background-color: #41b7d9;font-size: 0.815em;padding: 0.2em 1.5em;color: #fff;">Okay</a>');
                                            }
                                            else if(index == "wtuUnResolvedIssueFrm_block")
                                            {   
                                                $('.'+index).css('display','block');
                                                $('.'+index).html("<p>"+value+"</p><a href='javascript:void(0)' onclick='location.reload();'>Okay</a>");
                                                $('#wtuUnResolvedIssue .wtu-from-wrap').hide();
                                                $("#wtuUnResolvedIssue .wtu-thank-wrap").css("display","block");
                                                $('#wtuUnResolvedIssue .wtu-thank-wrap').html(value);
                                                $('#wtuUnResolvedIssue .wtu-thank-wrap').append('<br><a href="javascript:void(0)" onclick="location.reload();" style="    background-color: #41b7d9;font-size: 0.815em;padding: 0.2em 1.5em;color: #fff;">Okay</a>');
                                            }
                                            else if(index == 'frm_complaints_invalid_size')
                                            {   
                                                $('#'+index).html('Max 5MB file allowed!');
                                                PF.HEADER.removeBlueButtonLoader(formid);
                                                grecaptcha.reset(widgetId2);
                                                $('#frm_complaints_6_letters_code').val('');
                                            }
                                            else if(index == 'frm_complaints2_invalid_size')
                                            {   
                                                $('#'+index).html('Max 5MB file allowed!');
                                                PF.HEADER.removeBlueButtonLoader(formid);
                                                 grecaptcha.reset(widgetId3);
                                                $('#'+formid+'_6_letters_code').val('');
                                            }
                                            else
                                            {   
                                                $('#'+formid+' #'+index).val("");
                                                $('#'+formid+' .'+index).html(value).show();
                                                $('#'+formid+' #'+index).html(value).show();
                                                PF.HEADER.removeBlueButtonLoader(formid);
                                                if(request_from === 1) {
                                                    grecaptcha.reset(widgetId2);
                                                }else{
                                                    grecaptcha.reset(widgetId3);
                                                }
                                                $('#'+formid+'_6_letters_code').val('');
                                            }
                                          });
                                           PF.HEADER.removeBlueButtonLoader(formid);
                                       }
                                   }

                                }
                            });
                    },
                    feedbackResponse : function(data){
                        $("#feedback_submit").removeClass('btn-loader');
                        grecaptcha.reset(widgetId1);
                        if(data == "success")
                        {    
                                PF.HEADER.removeBlueButtonLoader('frm_feedback');
                                //feedback2();
                                 $('#error').css('display','none');
                                 $("#wtuNewComplaint .wtu-from-wrap").css('display','none');
                                 $("#wtuNewComplaint .wtu-thank-wrap").css('display','block');
                                 $(".cs_thankyou_block").css("display","block");
                                 $(window).scrollTop(0);
                        }
                        else
                        { 
                            var json_obj;    
                            try {    
                               json_obj = $.parseJSON(data);     
                            } catch(e) {     
                              json_obj = data;   
                            }
                            if( typeof json_obj['error'] != 'undefined'){
                                $('#error').css('display','block');
                                $('#error').html("<span>"+json_obj['error']+"</span>");
                            }else
                            {   
                                $('#error').css('display','none');
                               $("#feedback_submit error-txt").hide();
                                $.each(json_obj, function(index, value){ 

                                 if(index == "capcha")
                                 {
                                     $('.feedbackcaptcha').html(value).show();
                                     PF.HEADER.removeBlueButtonLoader('frm_feedback');
                                     $('#feedback_submit').removeAttr('disabled');
                                 }
                                 else if(index == "frm_feedback_block")
                                 {      
//                                      $('.'+index).css('display','block');
//                                      $('.'+index).html("<p>"+value+"</p><a href='javascript:void(0)' onclick='location.reload();'>Okay</a>");
//                                      $('#tab1').hide();
                                 $("#wtuNewComplaint .wtu-from-wrap").css('display','none');
                                 $("#wtuNewComplaint .wtu-thank-wrap").css('display','block');
                                 $(".cs_thankyou_block").css("display","block");
                                 $("#wtuNewComplaint .wtu-thank-wrap").html(value);
                                 $("#wtuNewComplaint .wtu-thank-wrap").append('<br><a href="javascript:void(0)" onclick="location.reload();" style="    background-color: #41b7d9;font-size: 0.815em;padding: 0.2em 1.5em;color: #fff;">Okay</a>');
                                 $(window).scrollTop(0);
                                 }
                                 // if email id doesnot match show confirmation box//
                                 else if(index == 'email_error')
                                 {
                                     var txt = confirm("This order does not match the entered email id,Proceed anyway?");
                                     //if ok is clicked submit the form//
                                     if(txt == true)
                                     {
                                             x.feedback2();
                                     }else{
                                             PF.HEADER.removeBlueButtonLoader('frm_feedback');
                                             $('#feedback_submit').removeAttr('disabled');
                                     }
                                 }
                                 else if(index == 'file')
                                 {
                                     $('#invalid_size').html(value);
                                     PF.HEADER.removeBlueButtonLoader('frm_feedback');
                                     $('#feedback_submit').removeAttr('disabled');
                                     $('#frm_feedback_6_letters_code').val('');
                                 }
                                 else if(index == "order_id"){
                                   $(".order_id").html(value).show();
                                    $(".order_id").parent().removeClass('frm-success-wrap');
                                    $(".order_id").parent().addClass('frm-error-wrap');
                                 }
                                 else
                                 {
                                     PF.HEADER.removeBlueButtonLoader('frm_feedback');
                                     $('#feedback_submit').removeAttr('disabled');
                                     $('#wtuNewComplaintFrm #'+index).val("");
                                     $('#wtuNewComplaintFrm .'+index).html(value).show();
                                 }
                               });

                            }

                        }
                    },
                    feedback2 : function(){
                        var formData = $('#wtuNewComplaintFrm').serialize();
                        var grvs = parseInt(utils.getParameterByName('grvs'));
                        var path = "";
                        if(grvs === 1) {
                            path = root_url+"/site_escalation/feedback?grvs=1";
                        } else {
                            path = root_url+"/site_escalation/feedback";
                        }
                        var _ajaxSetUpOptions = {
                            //contentType : false,
                            processData : false,
                            cache : false
                        };
                        utils.makeRequest( path, 'POST', formData, x.feedback2Response, x.handleError, '', '', _ajaxSetUpOptions);
                    },
                    feedback2Response : function(data){
                        grecaptcha.reset(widgetId1);
                        if(data == "success")
                            {   
                                if($('.append_txt').length > 0){
                                   $('.append_txt').css('display','none');
                                 }
                                 $('#error').css('display','none');
                                 $("#wtuNewComplaint .wtu-from-wrap").css('display','none');
                                 $("#wtuNewComplaint .wtu-thank-wrap").css('display','block');
                                 $(".cs_thankyou_block").css("display","block");
                                 $(window).scrollTop(0);
                            }
                            else
                            {   
                                var json_obj;    
                                try {    
                                   json_obj = $.parseJSON(data);     
                                } catch(e) {     
                                  json_obj = data;   
                                }
                                
                                if( typeof json_obj['error'] != 'undefined')
                                {
                                    $('#error').css('display','block');
                                    $('#error').html("<span>"+json_obj['error']+"</span>");
                                }
                                else
                                {
                                    $('#error').css('display','none');
                                    $.each(json_obj, function(index, value){ 
                                     if(index == "capcha")
                                        {
                                            $('.feedbackcaptcha').html(value).show();
                                            PF.HEADER.removeBlueButtonLoader('frm_feedback');
                                            $('#feedback_submit').removeAttr('disabled');
                                     }
                                     else if(index == 'file')
                                     {
                                           $('#invalid_size').html(value);
                                           PF.HEADER.removeBlueButtonLoader('frm_feedback');
                                           $('#feedback_submit').removeAttr('disabled');
                                           $('#frm_feedback_6_letters_code').val('');
                                     }
                                     else
                                     {
                                         $('#'+index).val("");
                                         $('#wtuNewComplaintFrm .'+index).html(value).show();
                                         $('#'+index).attr('placeholder',value);
                                         $('#'+index).addClass('required');
                                     }
                                   });
                                }
                            }
                    },
                    refreshCaptcha : function(id)
                        {
                            var num = Math.floor((Math.random() * 100) + 1);
                            jQuery("#" + id).attr('src', '/site_page/captcha?q=' + num);
                        },
                    validateData : function( formid, request_from ){
                        var orderid = $('#'+formid+'_orderid').val();
                        var comments =$('#'+formid+'_comments').val();
                        var captcha =$('#'+formid+'_6_letters_code').val();
                        var error = 0;
                    },
                    
                    validateURL : function(textval){
                        var urlregex = new RegExp(  "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(gif|jpeg|jpg|png|PNG|JPEG|JPG|GIF|com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
                        return urlregex.test(textval);
                    },
                    isValidName : function(name){
                        var pattern = new RegExp(/^[a-z\sA-Z]+$/);
                        return pattern.test(name);
                    },
                    isValidEmailAddress : function(emailAddress){
                        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                        return pattern.test(emailAddress);
                    },
                    isValidPhoneNumber : function(phoneno){
                        var number = /^\d{10}$/;    
                        return number.test(phoneno);
                    },
                    handleError : function( _x, _y, _z ) {
                // error callback
                PF.HEADER.removeBlueButtonLoader('frm_feedback');
                    },
                    //check if file name contains special characters
                    checkSpecialCharacters : function(filename){
                        var characters = new RegExp('^[^<>:\/|?*"=\\\\]*$');
                        var specialchars = characters.test(filename);
                        return specialchars;
                    },
                    getDataFeedback : function(type,currentId){
                        if(typeof(currentId)=='undefined'){
                            currentId='';
                        }
                        var i =1;
                        var loaded = 0;
                        var step = 1048576;
                        var total =$('#file_1')[0].files[0].size;
                        var totalRequest = 5;//Math.ceil(total/step);
                        var start = 0;
                        // var name = encodeURIComponent( $('#file_'+currentId)[0].files[0].name );
                        var name = encodeURIComponent( $('#file_1')[0].files[0].name );
                        var randName = Math.random().toString(36).substr(2, 30);
                        var parts = name.split(".");
                        var fileNameWA = parts[0];
                        name = encodeURIComponent( fileNameWA+randName+"."+type );
                        var resFlag = 1;
                        // var uploaded = document.getElementById('feddback_file_'+currentId);

                        var reader = new FileReader();

                        reader.onload = function(e){
                                var xhr ='';
                                if (window.XMLHttpRequest) {
                                    // code for IE7+, Firefox, Chrome, Opera, Safari
                                    xhr = new XMLHttpRequest();
                                } else {
                                    // code for IE6, IE5
                                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                                }
                                var fileData = reader.result;
                                var bytes = new Uint8Array(fileData);
                                var binaryText = '';
                                for (var index = 0; index < bytes.byteLength; index++) {
                                        binaryText += String.fromCharCode(bytes[index]);
                                }

                                var upload = xhr.upload;
                                xhr.onreadystatechange = function() {
                                        // if( xhr.readyState == XMLHttpRequest.DONE ) {
                                        if( this.readyState == 4 && this.status == 200 ) {
                                                var fileRes = xhr.responseText;
                                                if (fileRes === "invalid_file" && resFlag === 1)
                                                {
                                                    alert("Invalid image file!");
                                                    $('#invalid_size').html('Invalid image file!');
                                                    $('#feddback_file_'+currentId).html('Choose File');
                                                    $('#feedback_submit').removeAttr('disabled');
                                                    $('#feedback_submit').removeClass('disabled');
                                                    $('#feedback_submit').removeClass('btn-loader');
                                                    $('#feedback_submit').val('Submit');
                                                    xhr.abort();
                                                    resFlag = 0;
                                                    loaded=total*100;
                                                    return;
                                                }
                                                if( totalRequest < i ) {
                                                    if(fileRes === "image_size_exeeded" && resFlag === 1){
                                                        alert("Image is too big! Please reduce the size of your photo using an image editor. Max 5 MB is allowed.");
                                                        $('#invalid_size').html('Max 5Mb allowed!');
                                                        $('#feddback_file_'+currentId).html('Choose File');
                                                        $('#feedback_submit').removeAttr('disabled');
                                                        $('#feedback_submit').removeClass('disabled');
                                                        $('#feedback_submit').removeClass('btn-loader');
                                                        $('#feedback_submit').val('Submit');
                                                        xhr.abort();
                                                        resFlag = 0;
                                                        loaded=total*100;
                                                        return;
                                                    }
                                                }
                                                
                                                if(loaded >= total){
                                                    $('#feedback_submit').removeAttr('disabled');
                                                    $('#feedback_submit').removeClass('disabled');
                                                    $('#feedback_submit').removeClass('btn-loader');
                                                    $('#feedback_submit').val('Submit');
                                                    if(resFlag){
                                                        // $('#feddback_file_'+currentId).html($('#file_'+currentId).val().replace(/C:\\fakepath\\/i, ''));
                                                        $('#feddback_file_'+currentId).html($('#file_1').val().replace(/C:\\fakepath\\/i, ''));
                                                        $('#fileContaier_'+currentId).show();
                                                    }else{
                                                        $('#feddback_file_'+currentId).html('Choose File');
                                                    }
                                                }
                                        }
                                }
                                upload.addEventListener('load',function(){
                                        loaded += step;
                                        var _p = (loaded/total) * 100;
                                        if( _p > 100 ) {
                                                _p = 100;
                                        }                               

                                        if(loaded <= total){
                                                blob = $('#file_1')[0].files[0].slice(loaded,loaded+step);

                                                reader.readAsArrayBuffer(blob,x.log);
                                                $('#feedback_submit').attr('disabled', 'disabled');
                                                $('#feedback_submit').addClass('disabled').addClass('btn-loader');
                                                $('#feedback_submit').val('Uploading...');
                                                
                                                
                                        }else{
                                                loaded = total;
                                                $('#file_1').val("");
                                        }
                                },false);
                                //console.log(totalRequest);
                                //console.log(++i);
                                if(resFlag){
                                    xhr.open("POST", root_url+"/site_escalation/feedbackFileUpload?fileName="+name+"&fileType="+type+"&fileSize="+total+"&nocache="+new Date().getTime()+"&totalRequest="+totalRequest+"&currentId="+currentId+"&pageFrom=feedback"+"&count="+i++);
                                    if (xhr.overrideMimeType) { 
                                         xhr.overrideMimeType("application/octet-stream");                                
                                     } 
                                    xhr.sendAsBinary(binaryText);
                                }
                        };

                        // var blob = $('#file_'+currentId)[0].files[0].slice(start,step);
                        var blob = $('#file_1')[0].files[0].slice(start,step);
                       reader.readAsArrayBuffer(blob,x.log);
                    },
                    getDataComplaints : function(type){
                        var i =1;
                        var loaded = 0;
                        var step = 1048576;
                        var total =$('#complaint_file')[0].files[0].size;
                        var totalRequest = 5;//Math.ceil(total/step);
                        var start = 0;
                        var name = encodeURIComponent( $('#complaint_file')[0].files[0].name );
                        var resFlag = 1;
                        var uploaded = document.getElementById('feddbackcomplaint_file');

                        var reader = new FileReader();

                        reader.onload = function(e){
                                var xhr ='';
                                if (window.XMLHttpRequest) {
                                    // code for IE7+, Firefox, Chrome, Opera, Safari
                                    xhr = new XMLHttpRequest();
                                } else {
                                    // code for IE6, IE5
                                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                                }
                                var fileData = reader.result;
                                var bytes = new Uint8Array(fileData);
                                var binaryText = '';
                                for (var index = 0; index < bytes.byteLength; index++) {
                                        binaryText += String.fromCharCode(bytes[index]);
                                }
                                var upload = xhr.upload;
                                xhr.onreadystatechange = function() {
                                        // if( xhr.readyState == XMLHttpRequest.DONE ) {
                                        if( this.readyState == 4 && this.status == 200 ) {
                                                var fileRes = xhr.responseText;
                                                if (fileRes === "invalid_file" && resFlag === 1)
                                                {
                                                    alert("Invalid image file!");
                                                    $('#frm_invalid_file').html('Invalid image file!').css('color','red');
                                                    $('#feddbackcomplaint_file').html('Choose File');
                                                    $('#btn_complaint').removeAttr('disabled');
                                                    $('#btn_complaint').removeClass('disabled');
                                                    $('#btn_complaint').val('Submit');
                                                    xhr.abort();
                                                    resFlag = 0;
                                                    loaded=total*100;
                                                    return;
                                                }
                                                if( totalRequest < i  ) {
                                                    if(fileRes === "image_size_exeeded" && resFlag === 1){
                                                        alert("Image is too big! Please reduce the size of your photo using an image editor. Max 5 MB is allowed.");
                                                        $('#frm_invalid_file').html('Max 5Mb allowed!').css('color','red');
                                                        $('#feddbackcomplaint_file').html('Choose File');
                                                        $('#btn_complaint').removeAttr('disabled');
                                                        $('#btn_complaint').removeClass('disabled');
                                                        $('#btn_complaint').val('Submit');
                                                        xhr.abort();
                                                        resFlag = 0;
                                                        loaded=total*100;
                                                        return;
                                                    }
                                                }
                                                
                                                if(loaded >= total){
                                                    $('#btn_complaint').removeAttr('disabled');
                                                    $('#btn_complaint').removeClass('disabled');
                                                    $('#btn_complaint').val('Submit');
                                                    if(resFlag){
                                                        $('#feddbackcomplaint_file').html($('#complaint_file').val().replace(/C:\\fakepath\\/i, ''));
                                                    }else{
                                                        $('#feddbackcomplaint_file').html('Choose File');
                                                    }
                                                }
                                        }
                                }

                                upload.addEventListener('load',function(){
                                        loaded += step;
                                        var _p = (loaded/total) * 100;
                                        if( _p > 100 ) {
                                                _p = 100;
                                        }
                               uploaded.innerHTML = 'Please Wait....('+Math.floor(_p)+')%';
                               uploaded.style.width = _p+'%';

                                        if(loaded <= total){
                                                blob = $('#complaint_file')[0].files[0].slice(loaded,loaded+step);

                                               reader.readAsArrayBuffer(blob,x.log);
                                                $('#btn_complaint').attr('disabled', 'disabled');
                                                $('#btn_complaint').addClass('disabled');
                                                $('#btn_complaint').val('Uploading...');
                                                
                                        }else{
                                                loaded = total;
                                        }
                                },false);
                                //console.log(totalRequest);
                                //console.log(++i);
                                if(resFlag){
                                    xhr.open("POST", root_url+"/site_escalation/feedbackFileUpload?fileName="+name+"&fileType="+type+"&fileSize="+total+"&nocache="+new Date().getTime()+"&totalRequest="+totalRequest+"&count="+i++);
                                    xhr.overrideMimeType("application/octet-stream");
                                    xhr.sendAsBinary(binaryText);
                                }
                        };

                        var blob = $('#complaint_file')[0].files[0].slice(start,step);
                       reader.readAsArrayBuffer(blob,x.log);
                    },
                    getDataComplaints2 : function(type){
                        var i =1;
                        var loaded = 0;
                        var step = 1048576;
                        var total =$('#complaint_file2')[0].files[0].size;
                        var totalRequest = 5;//Math.ceil(total/step);
                        var start = 0;
                        var name = encodeURIComponent( $('#complaint_file2')[0].files[0].name );
                        var resFlag = 1;
                        var uploaded = document.getElementById('feddbackcomplaint_file2');

                        var reader = new FileReader();

                        reader.onload = function(e){
                                var xhr ='';
                                if (window.XMLHttpRequest) {
                                    // code for IE7+, Firefox, Chrome, Opera, Safari
                                    xhr = new XMLHttpRequest();
                                } else {
                                    // code for IE6, IE5
                                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                                }
                                var fileData = reader.result;
                                var bytes = new Uint8Array(fileData);
                                var binaryText = '';
                                for (var index = 0; index < bytes.byteLength; index++) {
                                        binaryText += String.fromCharCode(bytes[index]);
                                }
                                var upload = xhr.upload;
                                xhr.onreadystatechange = function() {
                                        // if( xhr.readyState == XMLHttpRequest.DONE ) {
                                        if( this.readyState == 4 && this.status == 200 ) {
                                                var fileRes = xhr.responseText;
                                                if (fileRes === "invalid_file" && resFlag === 1)
                                                {
                                                    alert("Invalid image file!");
                                                    $('#frm_invalid_file2').html('Invalid image file!').css('color','red');
                                                    $('#feddbackcomplaint_file2').html('Choose File');
                                                    $('#btn_complaint2').removeAttr('disabled');
                                                    $('#btn_complaint2').removeClass('disabled');
                                                    $('#btn_complaint2').val('Submit');
                                                    xhr.abort();
                                                    resFlag = 0;
                                                    loaded=total*100;
                                                    return;
                                                }
                                                if( totalRequest < i  ) {
                                                    if(fileRes === "image_size_exeeded" && resFlag === 1){
                                                        alert("Image is too big! Please reduce the size of your photo using an image editor. Max 5 MB is allowed.");
                                                        $('#frm_invalid_file2').html('Max 5Mb allowed!').css('color','red');
                                                        $('#feddbackcomplaint_file2').html('Choose File');
                                                        $('#btn_complaint2').removeAttr('disabled');
                                                        $('#btn_complaint2').removeClass('disabled');
                                                        $('#btn_complaint2').val('Submit');
                                                        xhr.abort();
                                                        resFlag = 0;
                                                        loaded=total*100;
                                                        return;
                                                    }
                                                }
                                                
                                                if(loaded >= total){
                                                    $('#btn_complaint2').removeAttr('disabled');
                                                    $('#btn_complaint2').removeClass('disabled');
                                                    $('#btn_complaint2').val('Submit');
                                                    if(resFlag){
                                                        $('#feddbackcomplaint_file2').html($('#complaint_file2').val().replace(/C:\\fakepath\\/i, ''));
                                                    }else{
                                                        $('#feddbackcomplaint_file2').html('Choose File');
                                                    }
                                                }
                                        }
                                }

                                upload.addEventListener('load',function(){
                                        loaded += step;
                                        var _p = (loaded/total) * 100;
                                        if( _p > 100 ) {
                                                _p = 100;
                                        }
                                uploaded.innerHTML = 'Please Wait....('+Math.floor(_p)+')%';
                                uploaded.style.width = _p+'%';

                                        if(loaded <= total){
                                                blob = $('#complaint_file2')[0].files[0].slice(loaded,loaded+step);

                                               reader.readAsArrayBuffer(blob,x.log);
                                                $('#btn_complaint2').attr('disabled', 'disabled');
                                                $('#btn_complaint2').addClass('disabled');
                                                $('#btn_complaint2').val('Uploading...');
                                                
                                        }else{
                                                loaded = total;
                                        }
                                },false);
                                //console.log(totalRequest);
                                //console.log(++i);
                                if(resFlag){
                                    xhr.open("POST", root_url+"/site_escalation/feedbackFileUpload?fileName="+name+"&fileType="+type+"&fileSize="+total+"&nocache="+new Date().getTime()+"&totalRequest="+totalRequest+"&count="+i++);
                                    xhr.overrideMimeType("application/octet-stream");
                                    xhr.sendAsBinary(binaryText);
                                }
                        };

                        var blob = $('#complaint_file2')[0].files[0].slice(start,step);
                       reader.readAsArrayBuffer(blob,x.log);
                    },
                    log : function(e){
                        //console.log(e);
                    }

                };

        a.CONTACTPAGE = x;
    })( PF, $ );
        
        $(document).ready(function () {
        PF.CONTACTPAGE.init();
    });

}