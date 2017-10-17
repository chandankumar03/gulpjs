/**
 * View Item Page (VIP) script
 */

var PF = PF || {};
var pincode_serviceability_flag = '';
(function (z, $) {
    var utils = z.UTILITIES;

    var v = {
        /* CREATING LITERALS BASED ON ID's CLASS AND ELEMENT FOR BINDING ON INITIALIZATION*/
        listenOnID: {
            click: {'buy_look': 'PF.VIP.buyLook', 'notify_submit': 'PF.VIP.OOSNotificationVIP',
                    'fdbckWidgtBtn':'PF.VIP.feedbackSubmit'},
            keypress: {'pincode': 'PF.VIP.enterOnPincode', 'notify_email': 'PF.VIP.enterOnOOS'},
            change: {'quantity': 'PF.VIP.updatePrice'}
        },
        listenOnClass: {
            click: {'vip-pincode-btn': 'PF.VIP.pincodeCheck', 'third': 'PF.VIP.buyNow',
                'vipstcky-buybtn':'PF.VIP.buyNow',
                'vip-config-sizes-wrap ul li': 'PF.VIP.setStockData',
                'add-to-wishlist': 'PF.VIP.wishList','smooth-smooth': 'PF.VIP.scrollFunc',
                'fdbck-wdgt-btn' : 'PF.VIP.feedbackChange','closeModel':'PF.VIP.closeModel',
            },
            change: {'sel_combo_qty':'PF.VIP.updateShopLook'}
        },
        listenOnEl: {
            change: {'input[name="checkboxG4"]': 'PF.VIP.updateShopLook'},
        },
        init: function () {
            /*For pincodes serviceability value for on page loading*/
            //pincode_serviceability_flag = saved_pincode_serviceability_flag;
            $('input:radio[name=configtab]').each(function () { $(this).prop('checked', false); });

            for (var i in this.listenOnID) {
                if (this.listenOnID.hasOwnProperty(i)) {
                    var _obj = this.listenOnID[ i ];
                    for (var j in _obj) {
                        if (_obj.hasOwnProperty(j)) {
                            PF.UTILITIES.addListener(
                                $('#' + j), i, _obj[ j ]
                            );
                        }
                    }
                }
            }
            for (var i in this.listenOnClass) {
                if (this.listenOnClass.hasOwnProperty(i)) {
                    var _obj = this.listenOnClass[ i ];
                    for (var j in _obj) {
                        if (_obj.hasOwnProperty(j)) {
                            PF.UTILITIES.addListener(
                                $('.' + j), i, _obj[ j ]
                            );
                        }
                    }
                }
            }
            for (var i in this.listenOnEl) {
                if (this.listenOnEl.hasOwnProperty(i)) {
                    var _obj = this.listenOnEl[ i ];

                    for (var j in _obj) {
                        if (_obj.hasOwnProperty(j)) {
                            PF.UTILITIES.addListener(
                                $(j), i, _obj[ j ]
                            );
                        }
                    }
                }
            }
            
            /*IMG LAZY LOADER PATCH*/
            $("img.lazy").lazy({bind:"event", delay:0});            
            
            var _url = secure_url + '/site_vip/getSimilarBoughtProduct/' + $('#product_id').val();
            
            var _setUpOptions = {
                'dataType' : "json"
            };
            
            utils.makeRequest( _url, 'GET', {}, v.getSimilarItems, PF.ERROR.raiseError, '', '', _setUpOptions);
            
            /*CHECK IF OOS THEN OOS NOTIFICATION ALREADY SUBSCRIBED*/
            v.OOSNotificationSubscription();

            /*vipDeliveryTimeline*/

            $('.pincode-change').click(function() {
                $('.vip-pin-apply').fadeOut(300);
                $('.vip_pincode_wraper').fadeIn(300);
            })
            
            var tol_obj = $('.vip-del-dtl');
            var $tool_tip = null;
            
            function pinOptHvr(ele, elehvr) {                
                $(ele).hover(function() {
                    $(elehvr).stop(true, true).fadeIn(300);
                }, function() {
                    $(elehvr).stop(true, true).fadeOut(300);
                });
            }
            $('#quantity').select2({
                minimumResultsForSearch: Infinity
            });
            $('.select-reason').select2({
                minimumResultsForSearch: Infinity
            });
            /*pinOptHvr('.vip-furn-area', '.vip-furn-area-hvr');
            pinOptHvr('.vip-cod-area', '.vip-cod-area-hvr');
            pinOptHvr('.vip-cp-area', '.vip-cp-area-hvr');
            pinOptHvr('.vip-nc-area', '.vip-nc-area-hvr');
            pinOptHvr('.vip-pp-area', '.vip-pp-area-hvr');*/
            
            $("#page,header,#pre-footer").on('click', function(event) {
            if($tool_tip!==null){
                var mouse_x = event.pageX;
                var mouse_y = event.pageY;
                if ((mouse_x < tol_obj.offset().left)) {
                    $tool_tip.stop(true, true).fadeOut(300);
                    $tool_tip = null;
                } else if (mouse_y > (tol_obj.offset().top + tol_obj.outerHeight())) {
                    $tool_tip.stop(true, true).fadeOut(300);
                    $tool_tip = null;
                } else if (mouse_y < (tol_obj.offset().top)) {
                    $tool_tip.stop(true, true).fadeOut(300);
                    $tool_tip = null;
                } else if (mouse_x > (tol_obj.offset().left + tol_obj.outerWidth())) {
                    $tool_tip.stop(true, true).fadeOut(300);
                    $tool_tip = null;
                }
            }
            });

            /** Code added by prathamesh.s to display Need More Info Guide Details */
            $('.clip-need-hlp-btn, .sticky-ndhlp-btn').on('click', function(e) {
                $('.clip-needhelp-container').addClass('clip-needhelp-containerShow');
                $('.clip-need-hlp-btn').hide();
                e.stopPropagation();
            });
            
            $('.clip-needhlp-clsbtn').on('click', function() {                    
                $('.clip-needhelp-container').removeClass('clip-needhelp-containerShow');
                $('.clip-need-hlp-btn').show();
            });
            
            $(document).on('click', function(e) {                    
                $('.clip-needhelp-container').removeClass('clip-needhelp-containerShow');
                $('.clip-need-hlp-btn').show();
            });
            
            $(document).on('keydown', function(e) {
                if ( e.keyCode === 27 ){
                        $('.clip-needhelp-container').removeClass('clip-needhelp-containerShow');
                        $('.clip-need-hlp-btn').show();
                }
            });
            
            $('.clip-needhelp-container').on('click', function(e) {
                e.stopPropagation();
            });
            /** End of Code added by prathamesh.s to display Need More Info Guide Details */

		/** Code Added by prathamesh.s for configurable product popup **/
            $('.choose_size').on('click', function(e) {
               $('[id^=combo_product_]').show();
               $('input.vip-pf-check').each(function(){
                    if(!($(this).is(':checked'))){
                        var unCheckedID = $(this).val();
                        $('#combo_product_'+unCheckedID).hide();
                    }
                });
            });
		/** End of code Added by prathamesh.s for configurable product popup **/
        },
        getSimilarItems : function(data) {

            if(data.trim()!='' && is_rental != 1){
                $('#Similar-Products-scroll').html(data);
                $('.similar-product-heading').show()
                $('#view-similar-button').show();           
                $('#similar_prod_menu').show();
                $('.oc-int-pro-slider-wrap').each(function () {
                    var children = $(this).children('.oc-int-pro-slide').length;
                    if (children > 4)
                    {
                        productSlider($(this).attr('id'), '.oc-int-pro-slide', 4);
                    }
                    else {
                        $('.oc-int-pro-slider-ext-wrap .ck-bill-addr-prev,.oc-int-pro-slider-ext-wrap .ck-bill-addr-next').hide();
                    }
                });
            }

        },
        feedbackSubmit :function(){
            var selectorType=$("#feedbackForm input[name='selector']:checked").val();
            if(typeof selectorType==='undefined'){
                return false;
            }
            var error=false;
            if(selectorType=='no'){  
                var ObjArr =  $('#feedbackForm [validate="1"]');
                $(ObjArr).each(function(){
                    if($(this).val()==''){  
                        error=true;
                        //alert("Please enter "+$(this).val()+" "+$(this).attr("name"));
                        $(this).siblings('.error-txt').show();
                    }
                });
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
                        //console.log(data);
                        if(data.flag == false) {
                            alert(data.msg);
                        } else {
                            $(".popup-box .vip-fdbck-widgtbx").hide();
                            $(".popup-box .fdbck-thnku-block ").show();
                            setTimeout(function(){
                                PF.VIP.closeModel();
                            },4000);
                        }
                    },
                    complete:function(){
                        //$('#loaderOverlay').hide();
                    }
                });
            }
        },
        'feedbackChange': function(){
            var show_form  = parseInt($(this).attr('data-show_form'));
            if(show_form){
                $('.fdbck-wdgt-form').fadeIn();
            }else{
                $('.fdbck-wdgt-form').fadeOut();
            }
            $('#fdbckWidgtBtn').removeClass('pf-disabled');
        },
        closeModel: function(){
            $("a.popup-close").trigger("click");
        },
        /**
         * PINCODE SERVICEABLILITY MODULE
         */
        pincodeCheck: function () { 
            /*INITIALIZE THE PINCODE REQUIRED VARIABLES*/
            var pincode = $('#pincode').val();
            var supplier_id = $('#cod_supplier_id').val();
            var default_supplier = $('#default_supplier').val();
            var cod_exist = $('#cod_open').val();
            var int_ship = $('#int_ship').val();
            var product_id = $('#product_id').val();
            if (typeof customized_id == 'undefined') {
                is_customized = 0;
                customized_id = 0;
            }
            var brand_id = 0, assembly_check = 0, new_tse = 0, brand_name = 0;

            if ($('#brand_id').length > 0) {
                brand_id = $('#brand_id').val();
                brand_name = $('#brand_name').val();
                assembly_check = $('#assembly_check').val();
                new_tse = 1;
            }

            /*PINCODE VALIDATION*/
             if (pincode === '') {
                console.log('null');
                $(this).parent('.vip_enter_pincode').siblings('.error-text').show();
                $('.vip-input-clear').trigger('click');
                $(this).parent().addClass('invld-pin');
            } else if (pincode.length < 6) {
                console.log('Less than 6');
                $(this).parent('.vip_enter_pincode').siblings('.error-text').show();
                $('.vip-input-clear').trigger('click');
                $(this).parent().addClass('invld-pin');
            } else if (pincode.length > 6) {
                console.log('greter than 6');
                $(this).parent('.vip_enter_pincode').siblings('.error-text').show();
                $('.vip-input-clear').trigger('click');
                $(this).parent().addClass('invld-pin');
            } else if (isNaN(pincode)) {
                console.log('not a number');
                $(this).parent('.vip_enter_pincode').siblings('.error-text').show();
                $('.vip-input-clear').trigger('click');
                $(this).parent().addClass('invld-pin');
            } else {
                $(this).parent('.vip_enter_pincode').siblings('.error-text').hide();
                $('#pincode').attr('placeholder', 'ENTER PINCODE');
                $(this).parent().removeClass('invld-pin');
                $('.vip_pincode_wraper').fadeOut(300);
                $('.vip-pin-apply').fadeIn(300);
            }
            
            var _setUpOptions = {
                'dataType' : "json"
            };
                                
            // Amitesh - code snippet start -to create serviceable_pincode cookie if not exists (Task owner : Shaily)
            var _pin = utils.readCookie( 'serviceable_pincode' );
            if(!_pin){ //pin code not empty
                var date = new Date();
                date.setTime(date.getTime() + (30*24*60*60*1000));
                var parameter_name = "serviceable_pincode";
                var expires = date.toGMTString();
                document.cookie = parameter_name+"="+pincode+"; expires="+expires+"; path=/";

            }
            // Amitesh - code snippet end   
            
            /*DATA TO BE POSTED*/
            var data = {'pincode': pincode, 'supplier': default_supplier, 'brand_id': brand_id, 'product_id': product_id,};
            /*AJAX REQUEST TO CHECK SERVICEABILITY*/
            utils.makeRequest(
                    secure_url + '/pincode/is_product_serviceable',
                    'POST',
                    data,
                    v.pincodeServiceResponse,
                    v.errorHandler,
                    '',
                    '',
                    _setUpOptions
                );

        },
        pincodeServiceResponse: function (data) { 

            /*HANDLING THE PINCODE RESPONSE*/
            data = $.parseJSON(data);
            var sku = $('#cod_sku').val();
            var cod_exist = $('#cod_open').val();

            if ($('#brand_id').length > 0) {
                brand_id = $('#brand_id').val();
                brand_name = $('#brand_name').val();
                assembly_check = $('#assembly_check').val();
                new_tse = 1;
            }

            if (data === 'pincode must be in digit') {
                $('#pincode').val('').attr('placeholder', 'ENTER VALID PINCODE');
                 $(this).parent().addClass('invld-pin');
                 vip_scripts.housejoy_failed_pin();
                return false;
            }
            /*CHECK FOR COD*/
             var qty = ($('#quantity').val()!='undefined' && $('#quantity').val()!='0' && !isNaN($('#quantity').val()))?parseInt($('#quantity').val()):1; 
                cod_str="Not Available";
                cod_tooltip="Cash On Delivery not available for this item";
                if (data.cod == '0') {
                    $("#cod_availability").html(cod_str);
                    $("#more_cod").attr('data-tooltip',cod_tooltip);
                } else if (data.cod == '1') {
                      /*COD AVAILABILITY CHECK FOR AMOUNT LESS THAN 3000 */                     
                    if ((final_price*qty) < cod_limit && cod_exist > 0) {
                        var cod_str="";
                        if(COD_ENABLE && (final_price*qty) < cod_limit && cod_exist > 0 ){
                            cod_str="Available";
                            cod_tooltip="Cash On Delivery available for this item";
                        }
                        $("#cod_availability").html(cod_str);
                        $("#more_cod").attr('data-tooltip',cod_tooltip);
                    }else{
                        $("#cod_availability").html(cod_str);
                        $("#more_cod").attr('data-tooltip',cod_tooltip);
                    }
                }
                         
            /*CHECK FOR SERVICEABILITY*/
            $('#cbc_without_pincode').slideUp(300);
            
            /*To check pincode serviceability in update price and setstockdata case*/
            pincode_serviceability_flag = data.serviceable;
            $('.vipservicedetails').hide();
            $('.vipnonservice').hide();
            $('.vip-pin-apply-opts-wrap').removeClass('studio-fnd');
            $('#serviceable_pincode').text($('#pincode').val())
            if (data.serviceable) { //400078
                $('.vipservicedetails').show();
                $('#order_delivery').text("Order Today, to get delivery between ");
                $('#order_timeline').text(data.tentative_delivery_date.start_day+" - "+data.tentative_delivery_date.end_day);
            } else {  //123123
                $('.vipnonservice').show();
            }
            
            /*CHANGE THE DELIVERY TIME IF AVAILABLE*/
            if (data.delivery_date && data.delivery_date!='null' &&(data.tentative_delivery_date.start_day!="" || data.tentative_delivery_date.start_day!=null) && (data.tentative_delivery_date.end_day!="" || data.tentative_delivery_date.end_day!=null) && data.serviceable)             {

                $('#delivery_by').empty().html('<b>'+data.tentative_delivery_date.start_day+' - '+data.tentative_delivery_date.end_day+'</b>');
                // $("#delivery_timeline_wrapper").slideDown(200);

            }else{
                
                // $("#delivery_timeline_wrapper").slideUp(200);
            }

            /*CHECK FOR HOUSEJOY*/
            if (data.housejoy_for_pincode !== undefined && data.housejoy_for_pincode === 'available') {
                $('.dwr-para#matched_pin').css('display', 'block');
                $('.dwr-para#unmatched_pin').css('display', 'none');
                $('.dwr-para#empty_pin').css('display', 'none');
            }else{                
                $('.dwr-para#unmatched_pin').css('display', 'block');
                $('.dwr-para#matched_pin').css('display', 'none');
                $('.dwr-para#empty_pin').css('display', 'none');
            }
            /*CHECK FOR HOUSEJOY*/
          
            /*CHECK FOR ASSEMBLY*/
            if (data.assembly) {
                $('#availability_assembly').empty().text(data.assembly);
                $("#more_assembly").attr('data-tooltip',data.tooltip_assembly);
            }

            /*ADDITIONAL INFORMATION FOR KERALA PINCOEES */
            if (data.additional_requirement) {
                if (data.serviceable == 1 && data.additional_requirement.template != 'not required') {
                    var state = data.additional_requirement.state;
                    if (state != null) {
                        state = state.toUpperCase();
                    } else {
                        state = '';
                    }
                    $('.additional_vip_notification').fadeIn(200).html('Customers in <strong>' + state + '</strong> are required to submit additional documents. <a href="javascript://" data-modal="additionalPincodeRulesPopup" class="pincode_rules"><u>Learn More</u></a>');

                    $('#vip_add_popup').empty().html(data.additional_requirement.template);
                    $('#additional_vip_notification').show();

                } else {
                    $('.additional_vip_notification').empty();
                    $('.additional_vip_notification').hide();
                }
            } else {
                $('.additional_vip_notification').hide();
                $('.additional_vip_notification').empty();
            }
            
            /* REGION WISE BANNER HANDLING START */
            if( $( "#region_banner" ).length == 1 ) {
                if( data.city != "undefined" && banner_cities.indexOf( data.city.toLowerCase() ) > -1 ) {
                    $( "#region_banner" ).show();
                } else {
                    $( "#region_banner" ).hide();
                }
            }
            /* REGION WISE BANNER HANDLING STOP */
            var studio_details = data.studio_details;
            if(typeof studio_details!='undefined' && Object.keys(studio_details).length>0){ 
                    $('.vip-pin-apply-opts-wrap').addClass('studio-fnd');
                    $('.vip-studio-area').hide();
                    var img1 = 'images/svg/studio-pepperfry-logo_vip.svg';
                    var img2 = 'images/svg/studio-pepperfry-logo_map_vip.svg';
                    var studio_tooltip = 'Experience more such products and get expert advice from our designers.';
                    $html = "<div class='vip-studio-area'><img class='vip-studio-img' src='"+image_url+img1+"'/><img class='vip-studio-map-img' src='"+image_url+img2+"'/><p class='pf-margin-0 font-12'>Under <span id='std_dist'>"+studio_details.studio_dist+"</span> km Away, <span id='std_loc'>"+studio_details.studio_loc+"</span> </p><a href='"+studio_details.studio_url+"' class='pf-text-light-blue pf-margin-0 pf-padding-4 pf-padding-bottom font-12' id='std_url' data-tooltip='"+studio_tooltip+"'>Why Drop By?</a></div>";
                    $('.vip-pin-apply-opts-wrap').append($html);
                    global_function.tooltip_call();
            } else {
                $('.vip-pin-apply-opts-wrap').removeClass('studio-fnd');
                $('.vip-studio-area').hide();
            }
        },
        /*
         * GLOBAL ERROR HANDLER 
         */
        errorHandler: function (x, y, z) {
            console.log(x + "\n" + y + "\n" + z);
        },
        /*
         * PINCODE CHECK ON PRESS OF ENTER KEY
         */
        enterOnPincode: function (e) {
            var code = e.which || e.keyCode;
            if (code == 13) {
                e.stopImmediatePropagation();
                $('#vipPincodeSub').trigger('click');
            }
        },
        /**
         * CBC_SERVICEABILITY CHECK ON QUANTITY UPDATE
         */
        cbc_serviceability: function () {

            var pincode = $('#pincode').val();
            var data = {pincode: pincode, mode: 'ajax'};
            var _setUpOptions = {
                'dataType' : "json"
            };
            if (pincode) {

                utils.makeRequest(
                        secure_url + '/pincode/get_cbc_serviceable_pincodes',
                        'POST',
                        data,
                        v.cbc_serviceability_response,
                        v.errorHandler,
                        '',
                        '',
                        _setUpOptions
                    );

            } else {
                $('#pincode').val('').attr('placeholder', 'ENTER VALID PINCODE');
                $(this).parent().addClass('invld-pin');
            }

        },
        cbc_serviceability_response: function (data) {
            if(pincode_serviceability_flag){
                 if (data == 1) {
                    /*BELOW IF CONDITION IS TO SHOW CBC NOTE WHEN PINCODE IS CBC SERVICEABLE AS WELL AS "PEPPERFRY SERVICEABLE". WHEN PINCODE IS NOT SERVICEABLE BT PEPPERFRY, WE ADD CLASS 'NO_DELIVERABILITY' TO TIMELINE DIV (I.E. #PIN_CHECK_RESULT), HENCE WE'RE CHECKING THIS CONDITION HERE.*/

                    $('.vip-cp-cont .vip-p-opt-img').removeClass('vip-p-opt-fail vip-p-opt-na').addClass('vip-p-opt-success');
                    $('.vip-cp-area-hvr .vip-hvr-desc-avail').show();
                    $('.vip-cp-area-hvr .vip-hvr-desc-notavail').hide();
                } else {
                    $('.vip-cp-cont .vip-p-opt-img').removeClass('vip-p-opt-success vip-p-opt-na').addClass('vip-p-opt-fail');
                    $('.vip-cp-area-hvr .vip-hvr-desc-notavail').show();
                    $('.vip-cp-area-hvr .vip-hvr-desc-avail').hide();
                }
            }
        },
        /**
         * PRICE UPDATE ON QUANTITY CHANGE 
         */
        updatePrice: function () {

            /*ONCLICK ON QUANTITY HIDE THE UL DROPDOWN*/
            //$('ul.gb-scroll').hide();

            //$('#quantity').text($(this).attr('data-value'));

            var inventory_count = $('#inventory_count').val();
            var max_inventory_count = $('#max_inventory_count').val();

            if (inventory_count > max_inventory_count) {
                max_inventory_count = inventory_count;
            }

            var qty = parseInt($('#quantity').val());
            if (typeof (qty) === 'undefined' || isNaN(qty)) {
                //console.log("OOS");
                alert("Try later");
                return false;
            }

            if (qty > 0 && qty <= max_inventory_count) {

                var updateprice = final_price;

                var child_discount = $.parseJSON($('#child_discount').val());

                if (child_discount.hasOwnProperty(product_id) && parseInt(child_discount[product_id].you_pay) > 0) {
                    updateprice = parseFloat(child_discount[product_id].you_pay);
                }

                updateprice = parseInt(qty) * parseInt(updateprice);

                /*var part_percentage_amount = $("#part_percentage_amount").attr("data-part_amount");

                if (typeof (part_percentage_amount) !== 'undefined' && pincode_serviceability_flag === 'available') {
                    //var part_price = parseInt(qty) * part_percentage_amount;
                    //CHANGES FOR CONFIG PRODUCT NEED TO CALCULATE ON RUNTIME BECOZ FINAL PRICE VARY IN CONFIG PRODUCT .I.E PRICE + OPT PRICE
                    if (child_discount.hasOwnProperty(product_id) && parseInt(child_discount[product_id].price) > 0) {
                        final_price_partpay = parseInt(child_discount[product_id].price);
                    }else{
                        final_price_partpay = itemData.price;
                    }
                    var part_price=parseInt(qty) * Math.ceil((final_price_partpay * partpay_percent)/100) ;
                    $("#part_price").text('Rs. '+utils.currencyFormat(Math.round(part_price)));
                }*/

                //$("#price-val").text(utils.currencyFormat(Math.round(updateprice)));
                $("#price-val").text(Math.round(updateprice));

                /*EMI LINK ENABLE FOR PRODUCT PRICE MORE THAN PRICE DEFINED IN EMI CONSTANT IN INDEX.PHP*/
                if (updateprice >= emi) {
                    $('#emi_strip').show();
                    v.emiOptionDisplay(updateprice);
                    //$("#free-ship-txt-no-cost-emi-avl").html("Available on No Cost EMI. Free Shipping");
                    /*var NC_success_str="";
                    NC_success_str= "<div class='vip-p-opt-img vip-p-opt-success'></div>";
                    NC_success_str+="<div class='vip-p-opt-txt'>No Cost EMI Available</div>";
                    NC_success_str+="<div class='vip-opt-area-hvr vip-nc-area-hvr' style='display: none;'>";
                    NC_success_str+="<div class='vip-p-opt-hvr'>";
                    NC_success_str+="<div class='vip-opt-hvr-rt'>";
                    NC_success_str+="<p class='vip-opt-hvr-hd'>No Cost EMI</p>";
                    NC_success_str+="<p style='display:block;' class='vip-opt-hvr-desc vip-hvr-desc-avail'>Pay in easy installments with no additional cost.<a id='cbcpopup' data-modal='nc-box' href='javascript: void(0)'>Learn more</a></p>";
                    NC_success_str+="<a class='vip-nc-area-tnc-link' target='_blank' href='https://www.pepperfry.com/TnC-NoCostEMI.html'>T&amp;Cs apply</a>";
                    NC_success_str+="</div>";                               
                    NC_success_str+="</div>"; 
                    NC_success_str+="</div>";
                    $("#NCE_node").html(NC_success_str);
                    $("#NCE_node2").html(NC_success_str);
                    $("#vip-pin-cod-status").html("COD Not Available for all items").css('display','block');*/
                } else {                    
                    $('#emi_strip').hide();
                    /*$("#free-ship-txt-no-cost-emi-avl").html(" Free shipping");
                    var NC_success_str="<div class='vip-p-opt-img vip-p-opt-fail'></div>";
                    NC_success_str+="<div class='vip-p-opt-txt'>No Cost EMI Available</div>";
                    $("#NCE_node").html(NC_success_str);
                    $("#NCE_node2").html(NC_success_str);
                    if(COD_ENABLE){
                        $("#vip-pin-cod-status").html("COD Available").css('display','block');
                    }*/
                }
                /*NOTE: BELOW CBC RANGE OF RUPEES IS SET IN INDEX.PHP */
                /*var cbc = $.parseJSON(cbc_range);
                if (updateprice < cbc.max && updateprice >= cbc.min) {
                    /*DEPENDING UPON SERVICEABILITY OF THE PINCODE, THIS FUNTION WILL SHOW/HIDE THE CBC NOTE ON VIP PAGE ON QTY CHANGE/
                    if ($.trim($('#pincode').val()) == "") {
                        $('#cbc_without_pincode').slideDown(300);
                    } else {
                        $('#cbc_without_pincode').slideUp(300);
                    }
                    v.cbc_serviceability();
                } else {
                    /*IF PRICE DOESNT FALL IN THE SPECIFIED RANGE THEN HIDE CBC WITHOUT PINCODE NOTE AND CBC WITH PINCODE NOTE AS WELL/
                    if(pincode_serviceability_flag === 1){
                        $('.vip-cp-cont .vip-p-opt-img').removeClass('vip-p-opt-success vip-p-opt-na').addClass('vip-p-opt-fail');
                        $('.vip-cp-area-hvr .vip-hvr-desc-notavail').show();
                        $('.vip-cp-area-hvr .vip-hvr-desc-avail').hide();
                    }
                }*/
                
                /*COD AVAILABILITY CHECK FOR AMOUNT LESS THAN 3000 */
                v.COD(updateprice);

            }
        },
        /*(CONFIGURABLE PRODUCTS) UPDATE THE PRICE DEPEND SIZE AND COLOR WITH EXTRA CHARGES*/
        setStockData: function () {            
            $('.vipstcky-buybtn').removeAttr('data-id');
            $('#quantity-left').hide();            
            $('#quantity').removeClass('qty_diabled');
            var option = $(this).data('colorname');
            
            if(is_rental == 1){
               $('#rent_price,#rntl_tnc,#rntl_vip_tc').css('display','block');
               var rental_selected_option_price = $("input[name='configtab']:checked").attr('data-price');
               product_id =  product_id;
               qty = qty;
               final_price = parseInt(rental_selected_option_price);
            } else {
                product_id = child_products[option].product_id;
                qty = child_products[option].qty;
                
                if (child_products[option].super_attribute_price == 'Undefined' || child_products[option].super_attribute_price == null || child_products[option].super_attribute_price == '') {
                    final_price = parseInt(initial_price);
                } else {
                    final_price = parseInt(initial_price) + parseInt(child_products[option].super_attribute_price);
                }
                var child_discount = $.parseJSON($('#child_discount').val());
                if (child_discount.hasOwnProperty(product_id) && parseInt(child_discount[product_id].you_pay) > 0) {
                    final_price = parseInt(child_discount[product_id].you_pay);
                }
            }

            var max_inventory_count = $('#max_inventory_count').val();

            var lis = '';
            for (var i = 1; i <= qty; i++) {
                if (i <= max_inventory_count) {
                    lis += '<option value="' + i + '">' + i + '</li>'
                }
            }
            if (lis.length > 0) {
                $('#quantity').html(lis);
                //To display stock quantity left 
                if(qty <= cnst_qty_left && qty > 0){
                    $('#quantity-left').show();
                    $('#quantity-left .vip-only-left').text('ONLY '+qty+' LEFT');
                }                              
            }
            
            /*part payment calculation*/
            /*if (typeof (part_percentage_amount) !== 'undefined' && pincode_serviceability_flag === 'available') {
                
                if (child_discount.hasOwnProperty(product_id) && parseInt(child_discount[product_id].price) > 0) {
                    final_price_partpay = parseInt(child_discount[product_id].price);
                }else{
                    final_price_partpay = final_price;
                }
                var part_price = Math.ceil((final_price_partpay * partpay_percent)/100) ;
                $("#part_price").text('Rs. '+utils.currencyFormat(Math.round(part_price)));
            }*/
            
            /*CBC CHECK
             NOTE: BELOW CBC RANGE OF RUPEES IS SET IN INDEX.PHP */
            /*var cbc = $.parseJSON(cbc_range);
            if (final_price < cbc.max && final_price >= cbc.min) {
                if ($('#pincode').val() == "") {
                    $('#cbc_without_pincode').slideDown(300);
                } else {
                    $('#cbc_without_pincode').slideUp(300);
                }
                v.cbc_serviceability();
            } else {
                if(pincode_serviceability_flag === 'available'){
                    $('.vip-cp-cont .vip-p-opt-img').removeClass('vip-p-opt-success vip-p-opt-na').addClass('vip-p-opt-fail');
                    $('.vip-cp-area-hvr .vip-hvr-desc-notavail').show();
                    $('.vip-cp-area-hvr .vip-hvr-desc-avail').hide();
                }
            }*/
            $("#price-val").text(utils.currencyFormat(Math.round(final_price)));

            if (final_price >= emi) {
                $('#emi_strip').fadeIn(300);
                v.emiOptionDisplay(final_price);
            } else {
                $('#emi_strip').fadeOut(300);
            }            
            /*COD AVAILABILITY CHECK FOR AMOUNT LESS THAN 3000 */
            v.COD(final_price);
        },
        /*COD AVAILABILITY CHECK FOR AMOUNT LESS THAN 3000 */
        COD: function(price){
            
             var cod_avail=$('#cod_open').val();
             if(pincode_serviceability_flag ==1){
                if(price < cod_limit && cod_avail == 1){
                    
                   $('.vip-cod-cont .vip-p-opt-img').removeClass('vip-p-opt-fail vip-p-opt-na').addClass('vip-p-opt-success'); 
                   $('.vip-cod-area-hvr .vip-hvr-desc-avail').show();
                   $('.vip-cod-area-hvr .vip-hvr-desc-notavail').hide();                    
                }else{                    
                   $('.vip-cod-cont .vip-p-opt-img').removeClass('vip-p-opt-success vip-p-opt-na').addClass('vip-p-opt-fail');
                   $('.vip-cod-area-hvr .vip-hvr-desc-notavail').show();
                   $('.vip-cod-area-hvr .vip-hvr-desc-avail').hide();                    
                }
            }
        },
        
        /**
         * THROWS ERROR WHEN QUANTITY DROPDOWN CLICKED BEFORE SELECTING CONFIG OPTION(JUST FOR CONFIGURABLE PRODUCT)
         */
        selectOption: function () {
            var quantity = parseInt($('#select2-quantity-container').text());
            if (typeof (quantity) === 'undefined' || isNaN(quantity) || quantity == 0) {
                /*THROW ERROR PLEASE SELECT SIZE*/
                $('.vip-configurable-select-area .row').addClass('rowError');
                $('.configurable-product-wrapper .Choose-radio').show();
                return false;
            }

        },
        /**
         * HANDLER FOR BUY NOW BUTTON CLICK
         */
        buyNow: function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            //if product added to cart from outofstock recommendations (added by Nishigandha N)
            var fromid_n_boughtid = $('#fromid_n_boughtid').val(); 
            if (!$('.third').hasClass('inactive')) {
                var quantity = parseInt($('#quantity').val());

                if (typeof (quantity) === 'undefined' || isNaN(quantity) || quantity == 0) {
                    /*THROW ERROR PLEASE SELECT SIZE*/
                    $('.vip-configurable-select-area .row').addClass('rowError');
                    $('.configurable-product-wrapper .Choose-radio').show();
                    $('html,body').animate({scrollTop: $("div.configurable-product-wrapper").offset().top},'slow');
                    return false;
                } else {
                    $('.vip-configurable-select-area .row').removeClass('rowError');
                    $('.configurable-product-wrapper .Choose-radio').hide();
                }

                $(this).children('a').addClass('btn-loader');
                var cat_crum = $("#cat_crum").val();
                utils.pushToDataLayer({'category': 'VIP', 'action': 'Click', 'label': 'Menu Buy Now', 'opt': true, 'event': 'legacyevent'});
                
                var rental_selected_option = $("input[name='configtab']:checked").val();
                var rental_selected = {};
                if(is_rental == 0){
                    rental_selected[product_id] = 0;
                }else{
                    rental_selected[product_id] = rental_selected_option;
                }
                utils.addToCart(product_id, quantity, v.buy_imm, '', cat_crum, 1,0,rental_selected,fromid_n_boughtid);
            }
        },
        buy_imm: function () {
            utils.setLocation(secure_url + '/checkout/cart');
        },
        /**
         * EMI CALCULATOR BASED ON THE PRICE
         */
        emiOptionDisplay: function (price) {
            if ($('#emi_breakup').length > 0) {
                var emi_data = $('#emi_breakup').val();
                var emi_breakup = $.parseJSON(emi_data);
                var lowest_price = price;
                $('#emi_price_for').html(utils.currencyFormat(Math.round(price)));
                for (var key in emi_breakup) {
                    var is_no_cost_emi = emi_breakup[key].no_cost_emi == 0 ? 0 :1;
                    if(is_no_cost_emi == 1 && flag_NCE) 
                    {
                        var new_principle_amount = v.PMTR(emi_breakup[key].rate/1200,emi_breakup[key].bu,price).toFixed(2);
                        var INTEREST =discounted_interest = price - new_principle_amount;
                        payment = price / emi_breakup[key].bu;
                        $('#price_' + key).html(utils.currencyFormat(Math.round(payment)));
                        $('#emi_discount_price_' + key).html(utils.currencyFormat(Math.round(discounted_interest)));
                        $('#emi_int_price_' + key).html(utils.currencyFormat(Math.round(INTEREST)));
                        $('#emi_price_' + key).html(utils.currencyFormat(Math.round(price)));
                        $('#payable_price_' + key).html(utils.currencyFormat(Math.round(price)));
                    }else{
                        var payment = v.PMT(emi_breakup[key].rate / 1200, emi_breakup[key].bu, -price).toFixed(2);
                        $('#price_' + key).html(utils.currencyFormat(Math.round(payment)));
                    }
                    if (payment <= lowest_price) {
                        lowest_price = Math.round(payment);
                    }
                }
                $('#strip_emi_breakup').html(utils.currencyFormat(Math.round(lowest_price)));
                $('#emi_breakup').html(utils.currencyFormat(Math.ceil(price)));
            }
        },
        PMT: function (i, n, p) {
            return i * p * Math.pow((1 + i), n) / (1 - Math.pow((1 + i), n));
        },
        PMTR: function( i, n, ap ) {
            return ap * ( 1 - Math.pow((1 + i ), (-n))) / (i * n);
        },
        /* SHOP THE LOOK PRICE UPDATE AS PER CUSTOMER ITEM SELECTION*/
        updateShopLook: function () {
            var retail = 0, offer = 0, save = 0, flag = false;
            for (var i = 1; i <= $('.vip-shop-item').length; i++) {
                if ($('#checkbox' + i).is(":checked")) {
                    combo_qty = parseInt($('#combo_qty_' + i).val());
                    var off_Ret=!isNaN(parseInt($('#our_checkbox' + i).attr('data-youpayprice'))) ?
                            parseInt(($('#our_checkbox' + i).attr('data-youpayprice'))*combo_qty) : 0;
                            
                    offer += off_Ret;
                            
                    retail += !isNaN(parseInt($('#retail_checkbox' + i).attr('data-retailprice'))) ?
                            parseInt(($('#retail_checkbox' + i).attr('data-retailprice'))*combo_qty) : off_Ret;
                            
                    save += !isNaN(parseInt($('#yousave_checkbox' + i).attr('data-save'))) ?
                            parseInt(($('#yousave_checkbox' + i).attr('data-save'))*combo_qty) : 0;

                    if (isNaN(parseInt($('#retail_checkbox' + i).attr('data-retailprice')))) {
                        /*SET FLAG TO HIDE THE RETAIL PRICE*/
                        flag = true;
                    }
                }
            }

            if (flag == true) {
                /*HIDE THE RETAIL & YOU SAVE PRICE*/
                $('.vip-setsave-price').hide();
                $('.vip-set-price-text').hide();
            } else {

                $('.vip-setsave-price').show();
                $('.vip-set-price-text').show();
            }

            /* CUSTOMER UNCHECKED EACH ITEM */
            
            if (offer == 0) {
                $('#buy_look').addClass('inactive');
                $('.vip-set-price-text,.vip-set-price,.vip-setsave-price,.vip-set-offer-price,.vip-sale-tag').hide();
                $('#combo_cart_notification').show();
            } else {
                $('#buy_look').removeClass('inactive');
                $('.vip-set-price-text,.vip-set-price,.vip-setsave-price,.vip-set-offer-price,.vip-sale-tag').show();
                $('#combo_cart_notification').hide();
            }
           

            $('#shop_retail_price').empty().html(utils.currencyFormat(Math.round(retail)));
            $('#shop_youpay_price').empty().html(utils.currencyFormat(Math.round(offer)));
            $('#shop_offer_price').empty().html(utils.currencyFormat(Math.round(offer)));
            $('#shop_yousave_price').empty().html(utils.currencyFormat(Math.round(save)));
            //$('.vip-shop-item-offer #shop_offer_price_group').empty().html(utils.currencyFormat(Math.round(save)));
 
        },
        buyLook: function (event) {
            event.preventDefault();
            var error = false;
            $('input.vip-pf-check').each(function(){
                if($(this).is(':checked') && $(this).parent().siblings('.vip-btmprd-qty').find('select[id^="combo_qty_"]').val() == 0){
                    error = true;
                }
            });
            if (!error && $('#buy_look').length > 0) {
                if (!$('#buy_look').hasClass('inactive')) {
                    event.stopImmediatePropagation();
                    var combo_pid, combo_qty = 1, jsonArr = [];
                    for (var i = 1; i <= $('.vip-shop-item').length; i++) {
                        if ($('#checkbox' + i).is(":checked")) {
                            combo_pid = $('#combo_pid_' + i).val();
                            combo_qty = $('#combo_qty_' + i).val();
                            jsonArr.push({"product_id": combo_pid, "qty": combo_qty});
                        }
                    }
                    if (typeof (configure) === 'undefined') {
                        configure = 0;
                    }
                    $(this).addClass('btn-loader');
                    
                    var _setUpOptions = {
                        'dataType' : "json"
                    };
                                
                    utils.makeRequest(
                            secure_url + '/cart/add',
                            'POST',
                            {combo_products: jsonArr},
                            v.buyLookResponse,
                            v.errorHandler,
                            '',
                            '',
                            _setUpOptions
                        );

                }

            }else{
                $('.choose_size').trigger('click');
            }
        },
        buyLookResponse: function (data) {
            /*SHOP THE LOOK BUY RESPONSE HANDLER*/
            if (typeof (redirect_callback) === 'undefined') {
                redirect_callback = v.buy_imm;
            }
            if ($.isNumeric(data))
            {
                if (data == '0')
                {
                    alert('Sold Out!');
                }
                else
                {
                    alert('You can add max ' + data + ' quantity for this product');
                }
            }
            else
            {
                if (!redirect_callback) {
                    $("#item_info").addClass("selected");
                    $('#cart_popup').show();
                }
                utils.pushToDataLayer({'category': 'VIP', 'action': 'Click', 'label': 'Shop the Look', 'opt': true, 'event': 'legacyevent'});
                if (redirect_callback != '') {
                    redirect_callback();
                }
                return false;
            }
        },
        triggerLook: function (e) {
            e.stopImmediatePropagation();
            var $checks = $(this).find('input[type="checkbox"]');
            $checks.prop("checked", !$checks.is(":checked"));
            $('input[name="checkboxG4"]').trigger("change");
        },
        /* OUT OF STOCK NOTIFICATION */
        OOSNotificationVIP: function () {

            var product_id = $('#product_id').val();
            var email_id_from = $('#notify_email').val();
            var filter = /^[a-zA-Z0-9._-]+@([0-9a-z][0-9a-z.-]+\.)+[a-zA-Z]{2,4}$/i;
            var emailValue = $.trim(email_id_from);
            if (emailValue == "") {
                $('#notify_form_wrap .error-text').show().empty().html('Enter your Email');
            }
            else if (filter.test(emailValue) != true)
            {
                $('#notify_email').val('').focus();
                $('#notify_form_wrap .error-text').show().empty().html('Invalid Email');
            } else
            {
                $('#notify_form_wrap .error-text').hide();
                /*STORE EMAIL ID FOR NOTIFICATION AGAINST PRODUCT*/
                var data = {'email': emailValue, 'pid': product_id};
                var _setUpOptions = {
                    'dataType' : "json"
                };
                                
                utils.makeRequest(
                        secure_url + '/site_product/oos_notifciation_request',
                        'POST',
                        data,
                        v.OOSResponse,
                        v.errorHandler,
                        '',
                        '',
                        _setUpOptions
                    );
            }

        },
        OOSResponse: function (data) {
            /*OOS RESPONSE HANDLER*/
            if (data == "Success") {
                $('#notify_form_wrap').css("display", "none");
                $('#notify_form_2').css("display", "none");
                $('#availability_message').css("background", "none");
                $('#availability_message').html('Thank you, we\'ll let you know once it\'s back in stock.');
                $('#oos_notify_subtitle_id').html('Thank you, we\'ll let you know once it\'s back in stock.');
                utils.pushToDataLayer({'category': 'VIP', 'action': 'Submit', 'label': 'Notify Me', 'opt': true, 'event': 'legacyevent'});
            } else {
                $('#notify_form_wrap').css("display", "none");
                $('#notify_form_2').css("display", "none");
                $('#availability_message').html('There is some error, please try again later.');
                $('#oos_notify_subtitle_id').html('There is some error, please try again later.');
            }

        },
        /*CHECK USER ALREADY REGISTERED FOR OOS*/
        OOSNotificationSubscription: function () {

            if ($.trim($('#notify_email').val()) != "") {
                var product_id = $('#product_id').val();
                
                var _setUpOptions = {
                    'dataType' : "json"
                };
                
                utils.makeRequest(
                        secure_url + '/site_product/check_oos_notification_subscription',
                        'POST',
                        {'pid': product_id},
                        v.OOSNotSubResponse,
                        v.errorHandler,
                        '',
                        '',
                        _setUpOptions
                    );
            } else {

                $('#availability_message, #notify_form_wrap').show();

            }
        },
        OOSNotSubResponse: function (data) {
            /*OOS NOTIFICATION SUBSCRIPTION RESPONSE HANDLER*/
            if (data == 1) {
                $('#notify_form_wrap').hide();
                $('#availability_message').show();
                $('#availability_message').html('You are already subscribed to the notifications.<br> We\'ll let you know once it\'s back in stock.');
            } else {
                $('#availability_message, #notify_form_wrap').show();
            }

        },
        enterOnOOS: function (e) {
            var code = e.which || e.keyCode;
            if (code === 13) {
                $('#notify_submit').trigger('click');
            }

        },
        /*CUSTOMIZE THIS DESIGN FORM*/
        customizedRequest: function (element_id) {
            $("#" + element_id + " #book-visit-submit").parent().addClass("btn-blue btn-loader");
            var data = $("#" + element_id).serialize();
            
             var _setUpOptions = {
                'dataType' : "json"
            };
                
            utils.makeRequest(
                    secure_url + '/site_customizationrequest/submitrequest',
                    'POST',
                    data,
                    v.customizedRequestResponse,
                    v.errorHandler,
                    '',
                    {element_id: element_id},
                    _setUpOptions
            );
            return false;
        },
        customizedRequestResponse: function (data, _param) {
            data = JSON.parse(data);
            if (typeof data.success !== "undefined") {
                $('.book_confirm').fadeIn();
                $('.vip-customize-txt').hide();
                $('#book_visit').slideUp('1000', function () {
                    setTimeout(function () {
                        $('.book_confirm').fadeOut();
                        $('.vip-customize-txt').show();
                        $('#book_visit').slideDown();
                        $("#" + _param.element_id + " #book-visit-submit").parent().removeClass("btn-blue btn-loader");

                    }, 5000);
                });
                $('#' + _param.element_id)[0].reset();
                $('#book_message').html("");
            }
            else if (typeof data.error !== "undefined") {
                error = data.error;
                /* THROW ERROR IF FOUND*/
                if (error.email)
                {
                    $("#" + _param.element_id + " #cust_email_err").show();
                }
                if (error.name)
                {
                    $("#" + _param.element_id + " #cust_name_err").show();
                }
                if (error.mobile)
                {
                    $("#" + _param.element_id + " #cust_mob_err").show();
                }
                if (error.city)
                {
                    $("#" + _param.element_id + " #cust_city_err").show();
                }
            }
        },
        customizedRequestValidation: function (element_id) {
            var errors = 0;
            //CHECK FOR EMAIL ID
            if ($.trim($("#" + element_id + " #email").val()) == "")
            {
                $("#" + element_id + " #cust_email_err").show();
                errors = 1;
            } else
            {
                var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                var emailValue = $.trim($('#' + element_id + ' #email').val());
                if (filter.test(emailValue))
                {
                    $("#" + element_id + " #cust_email_err").hide();
                } else
                {
                    $("#" + element_id + " #cust_email_err").show();

                    errors = 1;
                }
            }
            /*CHECK FOR NAME*/
            if ($.trim($("#" + element_id + " #cust_name").val()) == "")
            {
                $("#" + element_id + " #cust_name_err").show();
                errors = 1;
            } else
            {
                var nameFilter = /^[a-zA-Z]*$/;
                var fname = $.trim($("#" + element_id + " #cust_name").val());
                fname = fname.replace(/\s/g, "");
                if (nameFilter.test(fname))
                {
                    $("#" + element_id + " #cust_name_err").hide();
                } else {
                    $("#" + element_id + " #cust_name_err").show();
                    errors = 1;
                }

            }
            /*CHECK FOR MOBILE*/
            var mobile = $.trim($("#" + element_id + " #mobile").val());
            if (mobile == "" || mobile.length < 10)
            {
                $("#" + element_id + " #cust_mob_err").show();
                errors = 1;
            } else
            {
                var numberFilter = /^[0-9]+$/;

                if (numberFilter.test(mobile))
                {
                    $("#" + element_id + " #cust_mob_err").hide();
                } else {

                    $("#" + element_id + " #cust_mob_err").show();
                    errors = 1;
                }
            }
            /*CHECK FOR CITY*/
            var city_name = $("#" + element_id + " #city").val();
            if ($.trim(city_name) == "")
            {
                $("#" + element_id + " #cust_city_err").show();
                errors = 1;
            } else
            {
                var nameFilter = /^[a-zA-Z]*$/;
                var cname = $.trim(city_name);
                cname = cname.replace(/\s/g, "");
                if (nameFilter.test(cname))
                {
                    $("#" + element_id + " #cust_city_err").hide();
                } else {
                    $("#" + element_id + " #cust_city_err").show();
                    errors = 1;
                }
            }
            if (errors == 0)
            {
                v.customizedRequest(element_id);
            }
            return false;
        },
        wishList: function () {
            var product_id = $('#product_id').val();
            var product_name = (typeof itemData.name === 'undefined') ? '' : itemData.name; // itemData is a global variable containing product data
             if (!$(this).hasClass("selected")) {
                utils.addToWishlist(product_id, 'vip', '', '', '', product_name);
               $(this).children('.font-13').text('In Your Wishlist');
           } else {
               utils.removeFromWishlist(product_id, function(d,e){
                   
                try {
                    PF.HEADER.wishlistResponseCache = '';
                } catch( _error ) {
                    //
                }
                
                utils.pushToDataLayer({
                    'category' : 'Wishlist',
                    'action': 'Remove|VIP',
                    'label' : e.product_name,
                    'opt' : true,
                    'event' : 'legacyevent'
                });
                
                //for updating wishlistcount in 
                PF.HEADER.getwishlistcount();
                $( '.add-to-wishlist' ).removeClass( 'selected' );
               }, 'vip', void 0, void 0, product_name);
               $(this).children('.font-13').text('Add to wishlist');
           }
        },
        scrollFunc:function(){
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $( $.attr(this, 'href') ).offset().top
            }, 500);
        },
        //Below functions added by lokesh for bespoke bulk order form on vip
        bespokeValidation: function (form_id) {

            $('#' + form_id + ' #look_id').val($('#look_id1').val());
            $("#" + form_id + ' #besSubmitBut').attr('disabled', 'disabled');
            $("#" + form_id + " .btn").attr('disabled', 'disabled');

            PF.HEADER.addBlueButtonLoader(form_id);

            var errors = 0;
            var scroll = 0;
            if ($.trim($("#" + form_id + " #firstname").val()) ==="First Name" || $.trim($("#" + form_id + " #firstname").val()) === "") {
                    $("#" + form_id + "-firstname").addClass('error-text').html('Required');
                    $("#" + form_id + ' #firstname').closest('div.input-effect').addClass('input-error');
                    $("#" + form_id + ' #firstname').focus();
                    scroll = 1;
                    errors = 1;
            } else {
                    var nameFilter = /^[a-zA-Z]*$/;
                    var fname = $.trim($("#" + form_id + " #firstname").val());

                    if( nameFilter.test( fname ) ) {
                            $("#" + form_id + "-firstname").removeClass('error-text').html('');
                            $("#" + form_id + ' #firstname').closest('div.input-effect').removeClass('input-error');
                    } else {
                            $("#" + form_id + "-firstname").addClass('error-text').html('Letters only');
                            $("#" + form_id + ' #firstname').closest('div.input-effect').addClass('input-error');
                            if(scroll === 0){
                                $("#" + form_id + ' #firstname').focus();
                                scroll = 1;
        }
                            errors = 1;
                    }
            }
        
            if ($.trim($("#" + form_id + " #lastname").val()) === "Last Name" || $.trim($("#" + form_id + " #lastname").val()) === ""){
                    $("#" + form_id + "-lastname").addClass('error-text').html('Required');
                    $("#" + form_id + ' #lastname').closest('div.input-effect').addClass('input-error');
                    if(scroll === 0){
                        $("#" + form_id + ' #lastname').focus();
                        scroll = 1;
                    }
                    errors = 1;
            } else {
                    var nameFilter = /^[a-zA-Z]*$/;
                    var fname = $.trim($("#" + form_id + " #lastname").val());

                    if( nameFilter.test( fname ) ) {
                            $("#" + form_id + "-lastname").removeClass('error-text').html('');
                            $("#" + form_id + ' #lastname').closest('div.input-effect').removeClass('input-error');
                    } else {
                            $("#" + form_id + "-lastname").addClass('error-text').html('Letters only');
                            $("#" + form_id + ' #lastname').closest('div.input-effect').addClass('input-error');
                            if(scroll === 0){
                                $("#" + form_id + ' #lastname').focus();
                                scroll = 1;
    }
                            errors = 1;
                    }
            }

            if ($.trim($("#" + form_id + " #emailid1").val()) ==="") {
                    $("#" + form_id + "-emailid1").addClass('error-text').html('Required');
                    $("#" + form_id + ' #emailid1').closest('div.input-effect').addClass('input-error');
                    if(scroll === 0){
                        $("#" + form_id + ' #emailid1').focus();
                        scroll = 1;
                    }
                    errors = 1;
            } else {
                    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    var emailValue = $.trim($('#' + form_id + ' #emailid1').val());

                    if( filter.test( emailValue ) ) {
                            $("#" + form_id + "-emailid1").removeClass('error-text').html('');
                            $("#" + form_id + ' #emailid1').closest('div.input-effect').removeClass('input-error');
                    } else {
                            $("#" + form_id + "-emailid1").addClass('error-text').html('Incorrect email ID');
                            $("#" + form_id + ' #emailid1').closest('div.input-effect').addClass('input-error');
                            if(scroll === 0){
                                $("#" + form_id + ' #emailid1').focus();
                                scroll = 1;
                            }
                            errors = 1;
                    }
            }

            var mobile = $.trim($("#" + form_id + " #mobile").val());
            if (mobile == "" || mobile.length < 10) {
                    $("#" + form_id + "-mobile").addClass('error-text').html('Required');
                    $("#" + form_id + ' #mobile').closest('div.input-effect').addClass('input-error');
                    if(scroll === 0){
                        $("#" + form_id + ' #mobile').focus();
                        scroll = 1;
                    }
                    errors = 1;
            } else if (mobile.length == 10 && mobile.charAt(0) == 0) {
                    $("#" + form_id + "-mobile").addClass('error-text').html("Number can't start with 0");
                    $("#" + form_id + ' #mobile').closest('div.input-effect').addClass('input-error');
                    if(scroll === 0){
                        $("#" + form_id + ' #mobile').focus();
                        scroll = 1;
                    }
                    errors = 1;
            } else {
                    var numberFilter = /^[0-9]+$/;

                    if (numberFilter.test(mobile) && mobile.length == 10) {
                        $("#" + form_id + "-mobile").removeClass('error-text').html('');
                        $("#" + form_id + ' #mobile').closest('div.input-effect').removeClass('input-error');
                    } else {
                        $("#" + form_id + "-mobile").addClass('error-text').html('Need a valid 10-digit number');
                        $("#" + form_id + ' #mobile').closest('div.input-effect').addClass('input-error');
                        if(scroll === 0){
                            $("#" + form_id + ' #mobile').focus();
                            scroll = 1;
                        }
                        errors = 1;
                    }
            }

            if($('#besSelectionOrder').is(':visible')){
            if ($.trim($("#" + form_id + " #besSelectionOrder").val()) ==="") {
                    $("#" + form_id + "-besSelectionOrder").addClass('error-text').html('Select atleast one option');
                    if(scroll === 0){
                        $("#" + form_id + ' #besSelectionOrder').focus();
                        scroll = 1;
                    }
                    errors = 1;
            } else {
                    $("#" + form_id + "-besSelectionOrder").removeClass('error-text').html('');
            }
            }

            if($('#besHomeOrder').is(':visible') && !$('#besBulkOrder').is(':visible')){
                    var radio = $('#' + form_id + ' input:radio[name="style_preference"]:checked');
                    if (radio.length == 0) {
                            $("#" + form_id + "-style_preference").addClass('error-text').html('Choose atleast one');
                            if(scroll === 0){
                                $('#' + form_id + ' input:radio[name="style_preference"]').focus();
                                scroll = 1;
                            }
                            errors = 1;
                    } else {
                            $("#" + form_id + "-style_preference").removeClass('error-text').html('');
                    }

                    if ($.trim($("#" + form_id + " #howSoon").val()) ==="") {
                            $("#" + form_id + "-howSoon").addClass('error-text').html('Select atleast one option');
                            if(scroll === 0){
                                $("#" + form_id + ' #howSoon').focus();
                                scroll = 1;
                            }
                            errors = 1;
                    } else {
                            $("#" + form_id + "-howSoon").removeClass('error-text').html('');
                    }

                    if ($.trim($("#" + form_id + " #yourBudget").val()) ==="") {
                            $("#" + form_id + "-yourBudget").addClass('error-text').html('Select atleast one option');
                            if(scroll === 0){
                                $("#" + form_id + ' #yourBudget').focus();
                                scroll = 1;
                            }
                            errors = 1;
                    } else {
                            $("#" + form_id + "-yourBudget").removeClass('error-text').html('');
                    }
            } else if($('#besBulkOrder').is(':visible') && !$('#besHomeOrder').is(':visible')){
                    var radio = $('#' + form_id + ' input:radio[name="style_preference"]:checked');
                    if (radio.length == 0) {
                            $("#" + form_id + "-style_preference1").addClass('error-text').html('Choose atleast one');
                            if(scroll === 0){
                                $('#' + form_id + ' input:radio[name="style_preference"]').focus();
                                scroll = 1;
                            }
                            errors = 1;
                    } else {
                            $("#" + form_id + "-style_preference1").removeClass('error-text').html('');
                    }
            }

            if (errors == 0) {
                    if(!$('#besSelectionOrder').is(':visible')){
                        $('<input>').attr({
                            type: 'hidden',
                            id: 'bespokePageType',
                            name: 'bespokePageType',
                            value: 'vip'
                        }).appendTo("#" + form_id );
                    }
                    $("#besSubmitBut").removeAttr("disabled");
                    v.submitBespoke(form_id);
            } else {
                    $('#besSubmitBut').removeAttr("disabled");
                    PF.HEADER.removeBlueButtonLoader(form_id);
                    $(".btn").removeAttr("disabled");
                    $('.error-text').css('display', 'block');
                    return false;
            }
        },
        submitBespoke : function(form_id){
            //var path = ( ( utils.w.location.protocol === 'http:' ) ? root_url : secure_url ) + '/look/getBespokeFormData';
            var path = secure_url + '/look/getBespokeFormData';
            
            var _data = $("form#" + form_id).serialize();
            var _beforeSend = function () {
                    $('#besSubmitBut').attr('disabled', 'disabled');
                    PF.HEADER.addBlueButtonLoader(form_id);
            };
            var _params = {
              'form_id' : form_id
            };
            var _ajaxSetUpOptions = {
                'dataType' : "json"
            };
            utils.makeRequest( path, 'POST', _data, v.submitBespokeResponse, v.errorHandler, _beforeSend, _params, _ajaxSetUpOptions );
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
                    $('#besSubmitStatus').fadeIn();
                    $('.bes-popup-header').hide();
                    $('.bes-success').html('Thank you for your interest. We will get in touch with you shortly');
                    $("#besRegisterForm").getNiceScroll().resize();
                    if($('#besSubmitStatus').is(':visible') && document.URL.split("/")[3] === 'bulkorder.html'){
                        $("html,body").animate({
                            scrollTop: $('#besSubmitStatus').offset().top - 175
                        }, 1000);
                    }
                });
                if($('#besConsultForm').is(':visible')){
                    $('#besConsultForm').delay(5000).fadeOut('slow');
                    $('#popup_overlay').delay(5000).fadeOut("slow");
                    $("body").delay(5000).removeClass("active");
                }
                utils.pushToDataLayer({'category' : 'Bulk Order', 'action': 'Submit', 'label' : 'bulkorder_submit', 'opt' : true, 'event' : 'legacyevent'});
            }else{
                $('.bes-register-form-container').fadeOut('400', function() {
                    $('#besSubmitStatus').fadeIn();
                    $('.bes-popup-header').hide();
                    $('.bes-failure').html('Oops... something went wrong.<a href="javascript:void(0)" onclick="location.reload();">Try submitting again</a>');
                    $("#besRegisterForm").getNiceScroll().resize();
                    if($('#besSubmitStatus').is(':visible') && document.URL.split("/")[3] === 'bulkorder.html'){
                        $("html,body").animate({
                            scrollTop: $('#besSubmitStatus').offset().top - 175
                        }, 1000);
                    }
                });
                if($('#besConsultForm').is(':visible')){
                    $('#besConsultForm').delay(5000).fadeOut('slow');
                    $('#popup_overlay').delay(5000).fadeOut("slow");
                    $("body").delay(5000).removeClass("active");
                }
            }
        },
        //Lokesh Added finction ends here
        submitSwatch: function () {
            var errors = PF.HEADER.validateForm("",'swatch-form');
            if(!errors){
                var form_id = 'swatch-form';
                var path = secure_url + '/site_vip/updateSwatch';
                var _data = $("#" + form_id).serialize();

                var _beforeSend = function () {
                    $("#" + form_id + " .btn").attr('disabled', 'disabled');
                    // x.addBlueButtonLoader(form_id);
                };

                var _setUpOptions = {
                    'dataType' : "json"
                };

                var _params = {
                  'form_id' : form_id
                };
                utils.makeRequest( path, 'POST', _data, PF.VIP.SwatchSubmitResponse, PF.ERROR.raiseError, '', _params, _setUpOptions);
            }
        },
        getSwatchForm: function(result){
            if (result !== ''){
                $('#swatche-popup').html('').append(result);
                $('.select-state-swatch ,.select-country-swatch').select2({
                    minimumResultsForSearch: Infinity
                });
                $('.swatche-list-wrap').mCustomScrollbar();
                $('input#firstname').val($('#user-data-swatch-form').data("firstname"));
                $('input#lastname').val($('#user-data-swatch-form').data("lastname"));
                $('input#email').val($('#user-data-swatch-form').data("email"));
                $('input#mobile').val($('#user-data-swatch-form').data("mobile"));
                $('input#area').val($('#user-data-swatch-form').data("area"));
                $('input#landmark').val($('#user-data-swatch-form').data("landmark"));
                $('input#addressShip').val($('#user-data-swatch-form').data("street"));
                $('input#city').val($('#user-data-swatch-form').data("city"));
                $('input#pincode').val($('#user-data-swatch-form').data("postcode"));
                $('#state').val($('#user-data-swatch-form').data("region"));
                $('#select2-state-container').html($('#user-data-swatch-form').data("region"));
                $('#select2-country_id-container').html('India');
                $('#country_id').val('IN');
                
            }else{
                $('#swatche-popup').html('').append('Sorry!, Something went wrong.');
            }
            $('.swatche-list-wrap span#swatch_brand').html($('.free-samp-swat').data('product-brand'));
            $('.swatche-list-wrap span#swatch_category').html($('.free-samp-swat').data('product-category'));
        },
        SwatchSubmitResponse : function( result, _params ) {
            var data = '';
            /**
             * Different modal forms on site send response in different formats
             * JSON, String, Integer...
             */
            try {
                data = $.parseJSON( result );
                if(data == '1'){
                    $('#swatch-submit').css('display', 'none');
                    $('#swatch-success').css('display', 'block');
                     // Add to wishList in order for customer to track his requests 
                    swtch_product_id = $('input[name="product_id"]').val();
                    utils.addToWishlist(swtch_product_id, '');
                    $('.vip-product-info-wrap a.pf-wishlist-ic').addClass('active-wishlist');

                    dataLayer.push({
                        'category'  :   'Samples of swatches',
                        'action'    :   'Form Submit',
                        'label'     :   swtch_product_id,
                        'event'     :   'event swatches'
                    });
                
                }else{

                    dataLayer.push({
                        'category'  :   'Samples of swatches',
                        'action'    :   'Form error',
                        'label'     :   $('input[name="product_id"]').val(),
                        'event'     :   'event swatches'
                    });
                    
                    $('#swatch-submit').css('display', 'none');
                    $('#swatch-success').html('').append('<p>Sorry!, Something went wrong while saving the data. Please try again</p>');
                    $('#swatch-success').css('display', 'block');
                }

            } catch( error ) {
                data = result;
                dataLayer.push({
                    'category'  :   'Samples of swatches',
                    'action'    :   'Form error',
                    'label'     :   $('input[name="product_id"]').val(),
                    'event'     :   'event swatches'
                });
            }
            
        },
		/** Code Added by prathamesh.s to show/hide Choose Option for configurable products **/
        showHideChooseSize: function(e){
            var inputID = e.id;
            if(e.checked){
                $('#'+inputID).parent().siblings('.set-config-srtip-wrap').show();
                if($('#'+inputID).parent().siblings('.vip-btmprd-qty').find('select[id^="combo_qty_"]').val() == 0){
                    $('#'+inputID).parent().siblings('.vip-config-sku-size-error').show();
                }
            }else{
                $('#'+inputID).parent().siblings('.set-config-srtip-wrap').hide();
                $('#'+inputID).parent().siblings('.vip-config-sku-size-error').hide();
            }
        }
	};
    z.VIP = v;
}(PF, $));


$(document).ready(function () {
    PF.VIP.init();
    /*HIDE PRODUCT LEVEL CBC AVAILABLE OPTION IF PINCODE IS NOT EMPTY*/
    if ($('#pincode').val() != "") {
        $('#cbc_without_pincode').hide();
        /*CHANGE PINCODE MESSAGE WHEN ITS NOT EMPTY*/ 
        $('.vip-delivery-details .txt-gray').html('Pepperfry Services and Delivery Details For');

    }else
    {
    /*CHANGE PINCODE MESSAGE WHEN ITS EMPTY*/ 
    $('.vip-delivery-details .txt-gray').html('Check Pepperfry services & delivery to your location');

    }
    /*REMOVE LOADER FROM BUY BUTTON, IF CAME BY BACK BUTTON*/
    if ($('.third').find('a').hasClass('btn-loader')) {
        // $('.third').find('a').removeClass('loading');
    }
    /*REMOVE LOADER FROM BUY LOOK BUTTON, IF CAME BY BACK BUTTON*/
    if ($('#buy_look').hasClass('btn-loader')) {
        // $('#buy_look').removeClass('loading') 
    }
    /*CHROME PATCH FOR QUANTITY NOT GETTING UPDATED WHEN PUSHING BACK BUTTON FOR CART PAGE*/
    load_qty=$("#quantity option:first").val();
    $("#quantity").val(load_qty);
    $('#select2-quantity-container').html(load_qty);
    
    
    /*CHROME PATCH FOR SHOP THE LOOK CHECKBOX*/
    $('.vip-shop-item .gb-check input[type=checkbox]').each(function(){
        $(this).attr('checked', 'checked');
    });

});

/* THROW ERROR SELECT OPTION FOR CONFIG PRODUCT*/
$(document).on('focus', '.select2-container', function() {
    PF.VIP.selectOption();
});

/*LOAD 3D image*/
$( window ).load(function() {
    if (typeof imageApi !== "undefined" && imageApi != "") {
        var w=(tse=='2x1')?'760':'500';
        $('.vip-3d-iframe').html('<iframe width="'+w+'" height="550" src="'+imageApi+'" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>');
    }
    

});

/* DEFAULT VIP JS*/
var utils = PF.UTILITIES;
var vip_scripts = {
    vipModal: function () {
        if ($('#vipModalWrap').hasClass('modal-2by1')) {
            global_function.sliderVertical('.thumb-slider', '.thumb-image', 1, '.thumb-slider-down-arrow', '.thumb-slider-up-arrow', 5);
            
            
        } else {
            global_function.sliderVertical('.thumb-slider', '.thumb-image', 1, '.thumb-slider-down-arrow', '.thumb-slider-up-arrow', 4);
          
        }
        
        if ($('.thumb-slider-wrapper').find('.thumb-image').length<=1)
        {
                $('.thumb-slider-next-arrow,.thumb-slider-prev-arrow').css('visibility','hidden');
        }
        ;
         function zoomStatus(ele) {

            $wrapperWidth = $('.big-image-container-wrap').width();
            if ($wrapperWidth < 800)
            {
                $bigImageContainer.removeClass('zoom-disabled').addClass('zoom-enabled');
            }
            else if($wrapperWidth > 800)            {
              
                 if (!ele.data('bigimg')) {
                    $bigImageContainer.removeClass('zoom-enabled').addClass('zoom-disabled');     
                    $('.preview-gallery-text').css('visibility', 'hidden');
                 }
                 else
                 {
                    $bigImageContainer.removeClass('zoom-disabled').addClass('zoom-enabled');       
                    $('.preview-gallery-text').css('visibility', 'visible');
                 }
            }
        }
        var $vipModalThumbnails = $('.thumb-slider').children('a');
        var $bigImageContainer = $('#vipModalWrap').find('#bigImageContainer');
        $vipModalThumbnails.on('click', function (e) {
            var self = $(this);
            if (tse == '2x1') {
                window.setTimeout(function () {
                    zoomStatus(self);
                }, 500);
            }
           
            if ($(this).hasClass('vip-3d-thumb'))
            {

                $bigImageContainer.addClass('vip-image-hide');
                $('.vip-3d-iframe').show();
                $('.preview-gallery-text').css('visibility','hidden');
            }
            else
            {
                var self=$(this);
                $bigImageContainer.attr('src', image_url + 'img/grey.gif');
                $bigImageContainer.addClass('lazy');
                var img = new Image();
                img.src=$(this).attr('href');
                $(img).load(function(){
                    var bigImage = self.attr('href');
                    $bigImageContainer.attr('src', bigImage);
                    $bigImageContainer.removeClass('lazy');
                    
                });
                
                if ($(this).data('bigimg'))
                {
                    var extraLargeImage = $(this).data('bigimg');
                    $bigImageContainer.attr('data-bigimg', extraLargeImage);
                }
                else
                {
                    $bigImageContainer.removeAttr('data-bigimg');
                }

                $bigImageContainer.removeClass('large-view vip-image-hide');
                $('.vip-3d-iframe').hide();
                $('.preview-gallery-text').css('visibility','visible');
                $bigImageContainer.attr('style', '');
                if ($(this).is(':last-child'))
                {
                    $('.thumb-slider-next-arrow').addClass('inactive');
                }
                else {
                    $('.thumb-slider-next-arrow').removeClass('inactive');
                }
                  if ($(this).is(':first-child'))
                {
                    $('.thumb-slider-prev-arrow').addClass('inactive');
                }
                else {
                    $('.thumb-slider-prev-arrow').removeClass('inactive');
                }

            }

            $('.thumb-slider').children('.thumb-image').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });

        $(document).on('click', '.thumb-slider-next-arrow', function () {
            act_thumb_el = $('.thumb-slider .thumb-image.active');
            act_nextthumb_el = act_thumb_el.next();
            act_nextthumb_el.trigger('click');
            if (!act_nextthumb_el[0]) {
                act_thumb_el.trigger('click');
            }
            $('.thumb-slider-prev-arrow').removeClass('inactive');
            if (act_nextthumb_el.is(':last-child'))
            {
                $(this).addClass('inactive');
            }

        });
        $(document).on('click', '.thumb-slider-prev-arrow', function () {

            act_thumb_el = $('.thumb-slider .thumb-image.active');
            act_prevthumb_el = act_thumb_el.prev();
            act_prevthumb_el.trigger('click');
            if (!act_prevthumb_el[0]) {
                act_thumb_el.trigger('click');
            }
            $('.thumb-slider-next-arrow').removeClass('inactive');
            if (act_prevthumb_el.is(':first-child'))
            {
                $(this).addClass('inactive');
            }

        });

        $(document).on('click', '#bigImageContainer', function () {

                var condition = tse=='10x11'?!$(this).hasClass('large-view'):!$(this).hasClass('large-view') && $(this).hasClass('zoom-enabled');
          
            var self = $(this);
            if (condition) {
                if ($(this).data('bigimg')) {
                    var imgBackup = self.attr('src');
                    var img = new Image();
                    img.src = $(this).attr('data-bigimg');                  
                    self.attr('src', image_url + 'img/grey.gif');
                    self.addClass('lazy');
                    $(img).load(function () {
                        self.attr('src', self.attr('data-bigimg'));
                        $(this).remove();
                        self.addClass('large-view');
                        self.removeClass('lazy');
                    }).error(function () {
                        self.attr('src', imgBackup);
                        self.addClass('large-view');
                        self.removeClass('lazy');
                    });
                } else {
                    $(this).addClass('large-view');
                }
                $('.preview-gallery-text').css('visibility','hidden');
            }
            else
            {
                $(this).removeClass('large-view');
                if($(this).hasClass('zoom-enabled')){
                     $('.preview-gallery-text').css('visibility','visible');
                }
                else
                {
                     $('.preview-gallery-text').css('visibility','hidden');
                }
                $(this).attr('style', '');
            }
        });
        /* Script for image gallery hover  */
        $(document).on('mousemove', '#vipModalBigImage', function (e) {
            if ($('#bigImageContainer').hasClass('large-view')) {
                g_move_amt = parseInt(e.pageY - $(this).offset().top);
                g_move_amt_x = parseInt(e.pageX - $(this).offset().left);
                g_popup_height = $('#vipModalBigImage').height();
                g_popup_width = $('#vipModalBigImage').width();
                l_img_rem = ($(this).find('img').height() - g_popup_height) / g_popup_height;
                l_img_rem_x = ($(this).find('img').width() - g_popup_width) / g_popup_width;
                l_img_top = (l_img_rem * g_move_amt);
                l_img_top_x = (l_img_rem_x * g_move_amt_x);
                if ($(this).find('img').height() > g_popup_height) {
                    $(this).find('img').css('margin-top', '-' + l_img_top + 'px');
                }
                if ($(this).find('img').width() > g_popup_width) {
                    $(this).find('img').css('margin-left', '-' + l_img_top_x + 'px');
                }
            }

        });

    },
    initialize: function () {

        //Added by lokesh from bespoke.ldp.js page
        if($('#besDetailForm').length > 0){
            $('#besDetailForm')[0].reset();
        }
        $('#besDetailForm').find('select').each(function(){
          var id = $(this).attr('id');
          var val = $(this).find('option:first').val();
          $('#s2id_'+id).select2('val',val);
        });
        $('#look_id').val($('#look_id1').val());
        if($('.card-vip-bes').size() > 0){

            var plu_look = '';
            if($('.card-vip-bes').size() > 1){
                 plu_look = 'S';
            }
            //commented code by Nishigandha(on 17/5/2017)
            //$('.vip-look-wrapp').prepend('<div class="featured_looks"><a href="#vipBesLook" class="font-11 pf-white pf-padding-5 pf-padding-10-h pf-round-xlarge pf-hover-blue smooth-smooth pf-border pf-border-lighter-grey-25">FEATURED IN '+$('.card-vip-bes').size()+' LOOK'+plu_look+'</a></div>');
        }

        vip_scripts.vipGallerySlider();

        vip_scripts.vipModal();

        if ($("#pincode").val() != "") {
            $('.vip-input-clear').show();
        }
        /*service details toggle*/
        // $(document).on('click', '.vip-toggle-btn', function () {

        //     if ($('#delivery').find('small').hasClass('vip-check')) {
        //         $(".vip-service-details").slideToggle();
        //     } else {
        //         $(".vip-non-service-details").slideToggle();
        //     }
        //     $(this).toggleClass('collapsed');

        //     global_function.niceScroll();
        // });

        $('.vip-input-clear').click(function () {
            $('#vip-input input').val('');
        });

        $(".vip-product-img").hover(function () {
            $('.vip-share-fb, .vip-share-twitter, .vip-share-insta, .vip-share-pinterest, .vip-modal').toggleClass('opacity');

        });

        $('.vip-product-img').hover(function () {
            $('.vip-share-fb').animate({'left': '0px'}, 200);
            $('.vip-share-twitter').animate({'left': '0px'}, 100);
            $('.vip-share-insta').animate({'left': '0px'}, 200);
            $('.vip-share-pinterest').animate({'left': '0px'}, 300);
        }, function () {
            $('.vip-share-fb').animate({'left': '-30px'}, 100);
            $('.vip-share-twitter').animate({'left': '-30px'}, 100);
            $('.vip-share-insta').animate({'left': '-30px'}, 100);
            $('.vip-share-pinterest').animate({'left': '-30px'}, 100);
        })


        /*favourite icon active toggle*/
        $('.vip-product-info-wrap .pf-wishlist-ic').click(function () {
            //$(this).toggleClass('active-wishlist');
        });
        var moreColorWidth = $(".vip-product-img").outerWidth();   

        $(".vip-product-1by1 .vip-more-colors").mouseenter(function() {
            // more colors dynamic items
            var $img = $(this).find('.img');
            var width = $img.length * $img.outerWidth(true)+10;

            if(width > moreColorWidth ){
                $('.vip-product-1by1 .vip-more-colors .imgwrap').width(width);
                $(".imgwrap").mCustomScrollbar({
                    axis:"x",
                    theme:"dark-thin",
                    advanced:{autoExpandHorizontalScroll:true}
                });
            }
            $('.vip-product-1by1 .vip-more-colors .imgwrap').width(moreColorWidth);

        });

        // more colors dynamic items

        var $imgMoreColor = $(".vip-product-1by1 .oneby1 .vip-more-colors").find('.img');
        var widthimgMoreColor = $imgMoreColor.length * $imgMoreColor.outerWidth(true);
        $('.vip-product-1by1 .oneby1 .vip-more-colors .imgwrap').width(widthimgMoreColor);
        $(".vip-product-1by1 .oneby1 .vip-more-colors").hover(function() {
            $(this).stop().animate({
                'width': widthimgMoreColor + 80
            }, 300);
        },
        function() {
            $(this).stop().animate({
                'width': 64
            }, 300);
        });

        var $imgMoreColor2b1 = $(".vip-product-2by1 .twoby1 .vip-more-colors").find('.img');
        var widthimgMoreColor2b1 = $imgMoreColor2b1.length * ($imgMoreColor2b1.outerHeight(true) +5);

        $(".vip-product-2by1 .twoby1 .vip-more-colors").hover(function() {
            $(this).children('.imgwrap').stop().animate({
                'height': widthimgMoreColor2b1
            }, 300);
        },
        function() {
            $(this).children('.imgwrap').stop().animate({
                'height': 0
            }, 300);
        });
        /*other details tabs*/

        var ref_tab;

        $('.other_details_header_inner a').click(function () {
            ref_tab = $(this).attr('rel');
            if (!($(this).hasClass('active'))) {
                $('.other_details_header a').removeClass('active');
                $(this).addClass('active');
                $('.other_details_panel').not('#' + ref_tab).fadeOut(150);
                $('#' + ref_tab).fadeIn(150);
            }
            //  pf_literal_reinitialize();
        });
        $('.other_details_header_inner a').eq(0).trigger('click');

        /*faq details toggle*/

        $('.acc_header').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.acc_body').slideUp(300);
            } else {
                $('.acc_header').removeClass('active');
                $(this).addClass('active');
                $('.acc_body').slideUp(300);
                $(this).siblings('.acc_body').slideDown(300, function () {

                });
            }

        });

        /*enter pincode to show service details*/

        // $('.vip-pinenter').click(function () {
        //     if ($('#vip-input input').val())
        //     {
        //         $('.vip-pincode-btn').hide();
        //         $('.vip-toggle-btn').show();
        //     }
        //     else {

        //     }

        // });

        /*clear input*/

        $('.vip-input-clear').click(function () {
            $('#pincode').focus();
            // $(".vip-service-details").slideUp(500);
            // $(".vip-non-service-details").slideUp(300);
             $('.vip-pincode-btn').show();
            // $('.vip-toggle-btn').hide();
            $('.additional_vip_notification').slideUp(200);
            $('#displayPartMsg').slideUp(200);

            //if($('.vip-configurable').length>0){
            /*CBC WITHOUT PINCODE FOR PRODUCT*/
            var cbc = $.parseJSON(cbc_range);
            if (final_price < cbc.max && final_price >= cbc.min) {
                    $('#cbc_without_pincode').slideDown(300);
                }
             // }else{
           // PF.VIP.updatePrice();
           // }
            
            /*CHANGE PINCODE MESSAGE WHEN ITS EMPTY*/ 
            $('.vip-delivery-details .txt-gray').html('Check Pepperfry services & delivery to your location');
            
            $(this).hide();

        });

        $("#vip-input input").bind("change paste keyup", function () {
            if ($.trim($('#pincode').val()) != "") {
                $('.vip-input-clear').show();
            }else {
                $('.vip-input-clear').trigger('click');
            }
        });

        /*shop item check*/
       /* $('.vip-shop-item').click(function () {
            var checkBoxes = $(this).find('.gb-check input[type=checkbox]');
            if (!$(this).find('.gb-check').hasClass('disabled'))
            {
                checkBoxes.prop("checked", !checkBoxes.prop("checked"));
            }
        });*/

        /*configurable tabs*/
        $('.product-tab li a').click(function () {
            //Remove qty left msg if any
            $('#quantity-left').hide();
            $('.product-tab li a').removeClass('active')
            var tab_id = $(this).attr('data-tab');
            $(this).addClass('active');
            $('.tabs').hide();
            $("#" + tab_id).show();
            $('.product-tab-list input').prop('checked', false);
            
            /*RESET : REFRESH THE OTHER SELECTED OPTIONS AND QTY DROPDOWN, UPDATE EMI AND CBC*/
            $("#" + tab_id +" .vip-config-sizes-wrap ul li").each(function(){
                $(this).removeClass('active');
                $(this).find('input:radio[name=configtab]').each(function () { $(this).prop('checked', false); });
            });
            
            /*RESET :part payment calculation*/
            /*var part_percentage_amount = $("#part_percentage_amount").attr("data-part_amount");
            if (part_percentage_amount != 'Rs. 0' && pincode_serviceability_flag === 'available') {                
                $("#part_price").text(part_percentage_amount);
            }*/

            $("#price-val").text(PF.UTILITIES.currencyFormat(Math.round(initial_price)));
            
            $("#quantity").html('<option value="0">0</option>');
            //$("#quantity").val(0);
            $('#select2-quantity-container').html(0);
            
            /*CBC CHECK */
            /*var cbc = $.parseJSON(cbc_range);
            if (initial_price < cbc.max && initial_price >= cbc.min) {
            
                if ($('#pincode').val() == "") {
                    $('#cbc_without_pincode').slideDown(300);
                } else {
                    $('#cbc_without_pincode').slideUp(300);
                }
                PF.VIP.cbc_serviceability();
            } else {
                if(pincode_serviceability_flag === 'available'){
                    $('.vip-cp-cont .vip-p-opt-img').removeClass('vip-p-opt-success vip-p-opt-na').addClass('vip-p-opt-fail');
                    $('.vip-cp-area-hvr .vip-hvr-desc-notavail').show();
                    $('.vip-cp-area-hvr .vip-hvr-desc-avail').hide();
                }
            }*/

            if (initial_price >= emi) {
                $('#emi_strip').fadeIn(300);
                PF.VIP.emiOptionDisplay(initial_price);
            } else {
                $('#emi_strip').fadeOut(300);
            }
            /*END OF RESET*/
                   
        });
        
        /*$('.product-tab-list input').click(function(){
             $('.vip-select-radio .row').removeClass('rowError');
             $('.Choose-radio').hide();
        });*/

        /*sizes select*/
        $('.vip-config-sizes-wrap ul li').click(function () {
            $(this).addClass('active');
            $(this).siblings().removeClass('active');

            $('.vip-configurable-select-area .row').removeClass('rowError');
            $('.configurable-product-wrapper .Choose-radio').hide();
        });
        
        /*slide hovers*/
        $('.vip-share-fb').mouseover(function () {
            $('.share-slide-fb').stop().animate({marginLeft: '20px'}, 500);
        });

        $('.vip-share-twitter').mouseover(function () {
            $('.share-slide-twitter').stop().animate({left: '20px'}, 500);
        });
        $('.vip-share-twitter').mouseout(function () {
            $('.share-slide-twitter').stop().animate({left: '-160px'}, 500);
        });
        $('.vip-share-insta').mouseover(function () {
            $('.share-slide-insta').stop().animate({left: '20px'}, 500);
        });
        $('.vip-share-insta').mouseout(function () {
            $('.share-slide-insta').stop().animate({left: '-160px'}, 500);
        });
        $('.vip-share-pinterest').mouseover(function () {
            $('.share-slide-pinterest').stop().animate({left: '20px'}, 500);
        });
        $('.vip-share-pinterest').mouseout(function () {
            $('.share-slide-pinterest').stop().animate({left: '-160px'}, 500);
        });

        /*qty select*/
        $('.selectMenu').bind({
            mouseenter: function () {
                $(this).children('ul').stop().slideDown();
            },
            mouseleave: function () {
                $(this).children('ul').stop().slideUp(200);
            }
        });
        $('.selectMenu ul li').bind({
            click: function () {
                var selectedVal = $(this).text();
                $(this).parent().siblings('.selected').text(selectedVal);
            }
        });

        /*togle product image*/
        $('.vip-options-slideeach').on('click', function () {

        });

        $('.vip-options-slideeach a').on('click', function (e) {
            e.preventDefault();
            var self = $(this);
            var tabIndex = $(this).data('tabindex');
            //added by vivek lazy loader
            $('#vipImage').find("img").attr("src", image_url + 'img/grey.gif');
            $('#vipImage').find("img").addClass('lazy');
            //end of lazy loader
            $('.vip-options-slideeach').removeClass('active');
            $(this).parent('.vip-options-slideeach').addClass('active');
            var imageLoaded = new Image();
            imageLoaded.src = $(this).data('img');
            $(imageLoaded).load(function () {
                $('#vipImage').find("img").removeClass('lazy');
                $('#vipImage').find("img").attr("src", self.data("img"));

            });

            $('#vipImage').attr('data-tabindex', tabIndex);


        });
        $('.vip-share-wrap a').hover(function () {
            $('#vipImage img').css('opacity', '0.6')
        }, function () {
            $('#vipImage img').css('opacity', '')
        });
        
        // scroll the user to configurable options in case of configurable product
        if ((window.location.href.indexOf("act=atc") > -1)){
            $('html,body').animate({scrollTop: $("div.configurable-product-wrapper").offset().top},'slow');
        }

        
    },
    vipGallerySlider: function () {
        if ($('.vip-product-overview').hasClass('vip-product-2by1')) {
            if (Modernizr.mq("only screen and (min-width: " + global_function.responsiveWidth.mqMedium + ")and (max-width:" + (parseInt(global_function.responsiveWidth.mqMediumLandscape) - 1) + "px)"))
            {
                //768-1023
                if ($('.vip-option-slider-wrapper').hasClass('no-options')) {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 5);
                }
                else if ($('.vip-option-slider-wrapper').hasClass('color-option') || $('.vip-option-slider-wrapper').hasClass('assembly-video-option'))
                {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 4);
                }
                else
                {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 3);
                }
            }
            else if (Modernizr.mq("only screen and (min-width: " + global_function.responsiveWidth.mqMediumLandscape + ")and (max-width:" + parseInt(global_function.responsiveWidth.mqLargeLandscape) + "px)"))
            {
                //1024-1169
                if ($('.vip-option-slider-wrapper').hasClass('no-options')) {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 3);
                }
                else if ($('.vip-option-slider-wrapper').hasClass('color-option') || $('.vip-option-slider-wrapper').hasClass('assembly-video-option'))
                {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 2);
                }
                else
                {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 1);
                }

            }
            else if (Modernizr.mq("only screen and (min-width: " + global_function.responsiveWidth.mqLarge + ")and (max-width:" + parseInt(global_function.responsiveWidth.mqLargeHD) + "px)"))
            {
                //1170-1865
                if ($('.vip-option-slider-wrapper').hasClass('no-options')) {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 4);
                }
                else if ($('.vip-option-slider-wrapper').hasClass('color-option') || $('.vip-option-slider-wrapper').hasClass('assembly-video-option'))
                {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 3);
                }
                else
                {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 2);
                }
            }
            else
            {
                //1865 - 1920
                if ($('.vip-option-slider-wrapper').hasClass('no-options')) {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 5);
                }
                else if ($('.vip-option-slider-wrapper').hasClass('color-option') || $('.vip-option-slider-wrapper').hasClass('assembly-video-option'))
                {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 4);
                }
                else
                {
                    global_function.sliderHorizontal('.vip-options-slideinner.horizontal', '.vip-options-slideeach', 1, '.vip-next-arrow', '.vip-prev-arrow', 3);
                }
            }

        }
        else
        {
            global_function.sliderVertical('.vip-options-slideinner.vertical', '.vip-options-slideeach', 1, '.vip-bottom-arrow', '.vip-top-arrow', 5);
        }
    },housejoy_failed_pin:function(){

        $('.dwr-para#unmatched_pin').css('display', 'none');
        $('.dwr-para#matched_pin').css('display', 'none');
        $('.dwr-para#empty_pin').css('display', 'block');
    },
    swatchesValidation: function (element_id, element_name) {
                var form_id = element_id;
                //disable form submit button to avoid resubmission
                $('#formSubmit-' + form_id).attr('disabled', 'disabled');
                $(".btn").attr('disabled', 'disabled');

                // x.addBlueButtonLoader(form_id);
                $("#" + form_id + " .error_msg").html('');

                var errors = 0;

                if ($.trim($("#" + form_id + " #email").val()) == "") {
                    $("#" + form_id + " #emailError").html('Required').css('display', 'block').parent().addClass('input_error');
                    errors = 1;
                    $( '#errormsgTop' ).show();
                } else {
                    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    var emailValue = $.trim($('#' + form_id + ' #email').val());

                    if( filter.test( emailValue ) ) {
                        $("#" + form_id + " #emailError").css('display', 'none').parent().removeClass('input_error');
                    } else {
                        $("#" + form_id + " #emailError").html('Incorrect email ID').css('display', 'block').parent().addClass('input_error');
                        errors = 1;
                        $( '#errormsgTop' ).show();
                    }
                }

                if ($.trim($("#" + form_id + " #firstname").val()) == "First Name" || $.trim($("#" + form_id + " #firstname").val()) == "") {
                    $("#" + form_id + " #fnameError").css('display', 'block').parent().addClass('input_error');
                    errors = 1;
                    $( '#errormsgTop' ).show();
                } else {
                    var nameFilter = /^[a-zA-Z]*$/;
                    var fname = $.trim($("#" + form_id + " #firstname").val());

                    if(nameFilter.test(fname)) {
                    // if(fname !== '') {
                        $("#" + form_id + " #fnameError").css('display', 'none').parent().removeClass('input_error');
                    } else {
                        $("#" + form_id + " #fnameError").css('display', 'block').html('letters only');
                        errors = 1;
                        $( '#errormsgTop' ).show();
                    }
                }

                if ($.trim($("#" + form_id + " #lastname").val()) == "Last Name" || $.trim($("#" + form_id + " #lastname").val()) == "") {
                    $("#" + form_id + " #lnameError").css('display', 'block').parent().addClass('input_error');
                    errors = 1;
                    $( '#errormsgTop' ).show();
                } else {
                    var nameFilter = /^[a-zA-Z]*$/;
                    var lname = $.trim($("#" + form_id + " #lastname").val());

                    if(nameFilter.test(lname)) {
                        $("#" + form_id + " #lnameError").css('display', 'none').parent().removeClass('input_error');
                    } else {
                        $("#" + form_id + " #lnameError").css('display', 'block').html('letters only');
                        errors = 1;
                        $( '#errormsgTop' ).show();
                    }
                }

                var mobile = $.trim($("#" + form_id + " #mobile").val());
                if (mobile == "" || mobile.length < 10 || mobile.length > 10) {
                    $("#" + form_id + " #mobileError").css('display', 'block').parent().addClass('input_error');
                    $("#" + form_id + " #mobileError1").css('display', 'none').parent().removeClass('input_error');
                    errors = 1;
                    $( '#errormsgTop' ).show();
                } else if (mobile.length == 10 && mobile.charAt(0) == 0) {
                    $("#" + form_id + " #mobileError").css('display', 'none').parent().removeClass('input_error');
                    $("#" + form_id + " #mobileError1").css('display', 'block').parent().addClass('input_error');
                    errors = 1;
                    $( '#errormsgTop' ).show();
                } else {
                    var numberFilter = /^[0-9]+$/;

                    if (numberFilter.test(mobile)) {
                        $("#" + form_id + " #mobileError").css('display', 'none').parent().removeClass('input_error');
                        $("#" + form_id + " #mobileError1").css('display', 'none').parent().removeClass('input_error');
                    } else {
                        $("#" + form_id + " #mobileError").css('display', 'block').parent().addClass('input_error');
                        errors = 1;
                        $( '#errormsgTop' ).show();
                    }
                }
                
                if ($.trim($("#" + form_id + " #addressShip").val()) == "Address" || $.trim($("#" + form_id + " #addressShip").val()) == "") {
                    $("#" + form_id + " #addressShip_err").css('display', 'block').parent().addClass('input_error');
                    errors = 1;
                    $( '#errormsgTop' ).show();
                } else {
                    var nameFilter = /^[a-zA-Z]*$/;
                    //var fname = $.trim($("#" + form_id + " #addressShip").val());

                if( nameFilter.test() ) {
                        $("#" + form_id + " #addressShip_err").css('display', 'none').parent().removeClass('input_error');
                    } else {
                        
                        errors = 1;
                        $( '#errormsgTop' ).show();
                    }
                }
                                var pincode = $.trim($("#" + form_id + " #pincode").val());
                if (pincode == "" || pincode.length < 6 || pincode.length > 6) {
                    $("#" + form_id + " #pincodeError").css('display', 'block').parent().addClass('input_error');
                    $("#" + form_id + " #mobileError1").css('display', 'none').parent().removeClass('input_error');
                    errors = 1;
                    $( '#errormsgTop' ).show();
                } else if (pincode.length == 6 && pincode.charAt(0) == 0) {
                    $("#" + form_id + " #pincodeError").css('display', 'none').parent().removeClass('input_error');
                    $("#" + form_id + " #pincodeError1").css('display', 'block').parent().addClass('input_error');
                    errors = 1;
                    $( '#errormsgTop' ).show();
                } else {
                    var numberFilter = /^[0-9]+$/;

                    if (numberFilter.test(pincode)) {
                        $("#" + form_id + " #pincodeError").css('display', 'none').parent().removeClass('input_error');
                        $("#" + form_id + " #pincodeError1").css('display', 'none').parent().removeClass('input_error');
                    } else {
                        $("#" + form_id + " #pincodeError").css('display', 'block').parent().addClass('input_error');
                        errors = 1;
                        $( '#errormsgTop' ).show();
                    }
                }      
                                
                if ($.trim($("#" + form_id + " #area").val()) == "Area" || $.trim($("#" + form_id + " #area").val()) == "") {
                    $("#" + form_id + " #areaError").css('display', 'block').parent().addClass('input_error');
                    errors = 1;
                    $( '#errormsgTop' ).show();
                } else {
                    var nameFilter = /^[a-zA-Z]*$/;
                    //var fname = $.trim($("#" + form_id + " #area").val());

                    if( nameFilter.test() ) {
                        $("#" + form_id + " #areaError").css('display', 'none').parent().removeClass('input_error');
                    } else {
                        
                        errors = 1;
                        $( '#errormsgTop' ).show();
                    }
                }
                                
                if ($.trim($("#" + form_id + " #city").val()) == "city" || $.trim($("#" + form_id + " #city").val()) == "") {
                    $("#" + form_id + " #cityError").css('display', 'block').parent().addClass('input_error');
                    errors = 1;
                    $( '#errormsgTop' ).show();
                } else {
                    var nameFilter = /^[a-zA-Z]*$/;
                    //var fname = $.trim($("#" + form_id + " #city").val());

                    if( nameFilter.test() ) {
                        $("#" + form_id + " #cityError").css('display', 'none').parent().removeClass('input_error');
                    } else {
                        errors = 1;
                        $( '#errormsgTop' ).show();
                    }
                }
                                if ($.trim($("#" + form_id + " #landmark").val()) == "Landmark" || $.trim($("#" + form_id + " #landmark").val()) == "") {
                    $("#" + form_id + " #landmarkError").css('display', 'block').parent().addClass('input_error');
                    errors = 1;
                    $( '#errormsgTop' ).show();
                } else {
                    var nameFilter = /^[a-zA-Z]*$/;
                    //var fname = $.trim($("#" + form_id + " #landmark").val());

                    if( nameFilter.test() ) {
                        $("#" + form_id + " #landmarkError").css('display', 'none').parent().removeClass('input_error');
                    } else {
                        errors = 1;
                        $( '#errormsgTop' ).show();
                    }
                }
                                
                if ($.trim($("#" + form_id + " #state").val()) == "") {
                    $("#" + form_id + " #stateError").css('display', 'block').parent().addClass('input_error');
                    errors = 1;
                    $( '#errormsgTop' ).show();
                } else {
                    $("#" + form_id + " #stateError").css('display', 'none').parent().removeClass('input_error');
                }
                                
                if ($.trim($("#" + form_id + " #country_id").val()) == "") {
                                    
                    $("#" + form_id + " #countryError").css('display', 'block').parent().addClass('input_error');
                    errors = 1;
                    $( '#errormsgTop' ).show();
                } else {
                    $("#" + form_id + " #countryError").css('display', 'none').parent().removeClass('input_error');
                }                               
                
                // Swatch changed requirement
                // Hidden for Later Use                
                // if($("#color_options").val()==''){
                //     errors = 1;
                //     $('.swatches-error').css('display', 'block');
                // }
                // else {
                //     $('.swatches-error').css('display', 'none');
                // }
                        
                if (errors == 0) {                  
                    vip_scripts.submitSwatch(form_id);
                } else {
                    $('#formSubmit-' + form_id).removeAttr("disabled");                   
                    return false;
                }
            },
            
            registerSubmitResponse : function( result, _params ) {
                                var data = '';
                /**
                 * Different modal forms on site send response in different formats
                 * JSON, String, Integer...
                 */
                try {
                    data = $.parseJSON( result );

                } catch( error ) {
                    data = result;
                }
                
            }
};
$(function () {
    vip_scripts.initialize();
    $('.emi_chart').mCustomScrollbar({
        axis : 'yx'
    });
    $(document).on('click', '#vipImage', function (e) {
        e.preventDefault();
        var tabIndex = $(this).attr('data-tabindex');
        $('#vipModalWrap').find('.thumb-image').each(function () {
            var modalImgIndex = $(this).data('tabindex');
            if (modalImgIndex == tabIndex)
            {
                $(this).trigger('click');

            }
        });
    });
    //code for accordion faq section and drawer open close
    $('.dwr-acrd').on('click','.dwr-acrd-que', function() {
        var $acrdCont = $(this).next('.dwr-acrd-ans');
        if (!$(this).hasClass('answered')){
            $acrdCont.slideDown(300);
            $(this).addClass('answered');
        }else{
            $acrdCont.slideUp(300);
            $(this).removeClass('answered');;
        }               
    });

    $('.drawer').on('click tap', function(){
        var dwrId = $(this).data('id');
            $('#'+dwrId).show().animate({
            right: '0'
        }, 400, "linear", function() {
            $('.vip-dtl-nav').css({'left':'-100%','z-index':'401'});
        });
    });

    $('.drawer-close').on('click tap', function(){
        $('.vip-dtl-nav').show().animate({
            left: '0'
        }, 400, "linear", function() {
            $('.dwr-cont').css({'right':'-100%'});
            $('.vip-dtl-nav').css('z-index','399');
        });
    });

    /*$('#fdbck-wdgt-nobtn').on('click ', function() {
        $('.fdbck-wdgt-form').fadeIn();
        $('#fdbckWidgtBtn').removeClass('pf-disabled');
    });

    $('#fdbck-wdgt-yesbtn').on('click', function(event) {
        $('.fdbck-wdgt-form').fadeOut();
        $('#fdbckWidgtBtn').removeClass('pf-disabled');
    });*/
    
    $('a[href*="#tagged_vip_looks"]').on('click',function(e) {    
        e.preventDefault();
        var id= $(this).attr('href');
            $('html, body').animate({
                scrollTop: $(id).offset().top
            }, 2000);
    });

    $('.fabric-samp-swat').on('click',function(e) {
         dataLayer.push({
            'category'  :   'Samples of swatches',
            'action'    :   'Link click',
            'label'     :   $(this).data('product-id'),
            'event'     :   'event swatches'
        });
        // console.log(dataLayer);

        data = { 'swatch-type-id' : $(this).data('swatch-type-id'), 'swatch_detail' : $(this).data('swatch-detail'),'name' : $(this).data('product-name'), 'link': secure_url+$current, 'img': $(this).data('product-image'), 'sku': $(this).data('product-sku'), 'entity_id' : $(this).data('product-id'),
        'test-colour' : $(this).data('test-colour'),'category' : $(this).data('product-category'),'brand' : $(this).data('product-brand')};

        var _url = root_url + '/site_vip/swatch';
        utils.makeRequest( _url, 'POST', data, PF.VIP.getSwatchForm, PF.ERROR.raiseError, '', '', '');

    });

	/** Code Added by prathamesh.s for Configurable Choose size selection  **/
	$('.vip-config-modal-submit-wrap .vip-config-done-btn').click(function () {
		var error = false;
		$('.vip-config-sku-item').each(function(){
		    var configState = $(this).find('.vip-config-sku-dtl-size-listitem.active');
		    if(configState.length > 0){
		        var qty_html            = '';
		        var max_inventory_count = parseInt($('#max_inventory_count').val());
		        var currentID           = $(this).closest('.vip-config-sku-item').attr('data-id');
		        var currentHtml         = configState.html();
		        var entity_id           = parseInt(configState.attr('data-entityID'));
		        var retail_price        = parseInt(configState.attr('data-price')) || 0;
                var special_price       = parseInt(configState.attr('data-special-price')) || retail_price;
		        var qty                 = parseInt(configState.attr('data-qty'));
		        var total_qty           = (qty>max_inventory_count)?max_inventory_count:qty;
		        
				for(var i=1;i<=total_qty;i++){
		            qty_html += "<option value='"+i+"'>"+i+"</option>";
		        }

		        //Change Qty Select Box HTML
		        $('input.vip-pf-check[value="'+currentID+'"]').parent().siblings().find('.sel_combo_qty[id^=combo_qty_]').html(qty_html);
		        //Change Special and Retail Price
		        $('input.vip-pf-check[value="'+currentID+'"]').parent().siblings().find('.vip-shop-item-price-offer').attr('data-youpayprice',special_price).attr('data-ourprice',retail_price).html('Rs. '+utils.currencyFormat(Math.round(special_price)));
		        //Change Displayed Retail Price
		        $('input.vip-pf-check[value="'+currentID+'"]').parent().siblings().find('.vip-shop-item-price-offer-old').attr('data-retailprice',retail_price).html('Rs. '+utils.currencyFormat(Math.round(retail_price)));
		        //Set Selected Config Size 
		        $('input.vip-pf-check[value="'+currentID+'"]').parent().siblings().children('.set-config-selected-state').find('.set-config-value').html(currentHtml).show();
		        //Show Selected Config Size 
		        $('input.vip-pf-check[value="'+currentID+'"]').parent().siblings('.set-config-srtip-wrap').find('.set-config-selected-state').show();
		        //Hide Choose Option Button
		        $('input.vip-pf-check[value="'+currentID+'"]').parent().siblings().find('.set-config-init-state').hide();
		        //Set Selected Config Qty Hidden Value
		        $('input.vip-pf-check[value="'+currentID+'"]').parent().siblings('input[id^=combo_qty_]').val(qty);
		        //Set Selected Config Qty Hidden Value
		        $('input.vip-pf-check[value="'+currentID+'"]').parent().siblings('input[id^=combo_pid_]').val(entity_id);
		        $(this).find('.vip-config-sku-dtl-size-error').hide();
		        $('input.vip-pf-check[value="'+currentID+'"]').parent().siblings('.vip-config-sku-size-error').hide();
		     }else if ($(this).css('display') != 'none'){
                $(this).find('.vip-config-sku-dtl-size-error').show();
		        error = true;
		    }
		});
		PF.VIP.updateShopLook();
		if(!error){
		    PF.VIP.closeModel();
		}
	});
	/** End of Code Added by prathamesh.s for Configurable Choose size selection   **/


	//VIP configur modal
	$('.vip-config-sku-dtl-size-level1 .vip-config-sku-dtl-size-listitem').click(function () {
		var sizelevel_id = $(this).attr('data-tab');
		$(this).parents('.vip-config-sku-dtl-size-level1').find('.vip-config-sku-dtl-size-listitem').removeClass('current-tab');
		$(this).parents('.vip-config-sku-item').find('.vip-config-sku-dtl-size-level2 .vip-config-sku-dtl-size-list').hide();
		$(this).addClass('current-tab');
        $(this).parents('.vip-config-sku-item').find("#" + sizelevel_id).show();

	 });
	 $('.vip-config-sku-dtl-size-level2 .vip-config-sku-dtl-size-listitem').click(function () {
		 $(this).parents('.vip-config-sku-dtl-size-level2').find('.vip-config-sku-dtl-size-listitem').removeClass('active');
		 $(this).addClass('active');
		 $(this).parents('.vip-config-sku-dtl-warp').find('.vip-config-sku-dtl-size-error').hide();
	 }); 

	$(".combo-product .vip-shop-item .vip-pf-check").change(function () {
	   boughtTogetherCnt(); 
	});

   $(".sel_combo_qty").find('option:eq(0)').prop('selected', true).trigger('change');
});

$(document).on('mouseenter','.cbc_popup_content .id_card,.cbc_id_tooltip_vip',function() 
{
   $('.cbc_id_tooltip_vip').show();
});
$(document).on('mouseleave','.cbc_popup_content .id_card,.cbc_id_tooltip_vip',function()
{
    $('.cbc_id_tooltip_vip').hide();  
});
//Bought Together Count Function
function boughtTogetherCnt(){
    var checkedCnt = 0;
            $('.combo-product .vip-shop-item').each(function(){
                
                var vipItem = $(this).find('.vip-pf-check');
                  if( vipItem.is(':checked')){
                      checkedCnt++;
                  }
            });            
            if( checkedCnt === 1){
                $("#buy_look").text("ADD TO CART");
            }else if(checkedCnt === 2){
                $("#buy_look").text("ADD BOTH TO CART");
            }else{
               $("#buy_look").text("ADD ALL TO CART"); 
            }
}
//interested slider function
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
$(document).ready(function () {
    boughtTogetherCnt();
});
