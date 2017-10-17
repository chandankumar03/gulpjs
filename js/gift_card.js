 $(document).ready(function(){
       /*
       * @purpose:auto populate denominations for gift card
       * 
        */
        $pinCodeSet = 0 ;
       // $('#pincode').attr('validate', 0);
       $('#gift_card_shipping_charges').html(giftCardShippingCharges);
       if (!$.isEmptyObject(physicalProduct)) {
     	  var str = '<option value="" data-id="">Gift Card Value</option>';
 	      $.each(physicalProduct, function(key, value) {
 	         str +='<option value="'+value+'" data-id="'+key+'">'+value+'</option>';
 	      });
 	      $(".gcValue[id^='domination_physical_']").html(str);
       }else{
             $('.door-step-open').addClass('disabled');
             $('.select-cta .door-step-open').text('Coming Soon');
       }
     if (!$.isEmptyObject(ecardProduct)) {
     	 var str = '<option value="" data-id="">Gift Card Value</option>';
 	      $.each(ecardProduct, function(key, value) {
 	    	    str +='<option value="'+value+'" data-id="'+key+'">'+value+'</option>';
 	  	  });
 	      $(".gcValue[id^='domination_virtual_']").html(str);
     }else{
           $('.email-step-open').addClass('disabled');
           $('.select-cta .email-step-open').text('Coming Soon');
     }
       
    $('.btn-green-pin').click(function(){
	       $(this).addClass('btn-loader');
	       var pincode= $('#pincode').val();
	       if($.trim(pincode) != ''){
	    	   $pinCodeSet = pincode;
	           $('#pincode').attr('validate', '1');
	           //var _pin = $.cookie('serviceable_pincode');
	           var _pin = PF.UTILITIES.readCookie('serviceable_pincode');
	          if ($.isEmptyObject(physicalSerchPinArr)) {
	            $('#pincode').siblings('.error-msg').html('<span class="pf-text-red">Gift card not available.</span>').show();
	            $('.btn-green-pin').removeClass('btn-loader');
	            return false;
	          }
	           $.ajax({
	                            url:'/pincode/is_product_serviceable',
	                            data:{'region_check':'1',
	                                    'pincode':pincode,
	                                    'prc_code':physicalSerchPinArr['prc_code'],
	                                    'sku':physicalSerchPinArr['sku'],
	                                    'supplier':physicalSerchPinArr['supplier'],
	                                    'cod_exist':physicalSerchPinArr['cod_exist'],
	                                    'brand_id':physicalSerchPinArr['brand_id'],
	                                    'assembly_check':physicalSerchPinArr['assembly_check'],
	                                    'product_id':physicalSerchPinArr['product_id'],
	                                },
	                            type:'post',
	                            success:function(data){
	                            	$('.btn-green-pin').removeClass('btn-loader');
	                            	$('#pincode').attr('check','1'); // Check if pincode is checked
	                                data = $.trim(data);
	                                      try {
	                                        data = $.parseJSON(data);
	                                      } catch (e) {
	                                          // not json
	                                          //if(data == 'pincode must be in digit'){
	                                                     
	                                    $('#pincode').siblings('.error-msg').html('Enter valid pincode (e.g. 400001)</span>').show();
	                                                      
	                                    if(data == 'Not a valid pincode')
	                                    {
	                                        $('#pincode').siblings('.error-msg').html('Enter a valid pincode').css('display','block').removeClass('');
	                                    }
	                                    return false;
	                                              //}
	                                      }
	                                
//	                                if(data.serviceable){
	                                        if(data.serviceable == 'not available' || data.serviceable==0){ 
	                                        	$('#pincode').parent().removeClass('frm-success-wrap').addClass('frm-error-wrap');
	                                        	$('.btn-green-pin').addClass('disabled');
	                                        	$('#pincode').siblings('.error-msg').html('The Gift Card cannot be delivered to : '+pincode).css('display','inline-block');
	                           
	                                        }else if(data.serviceable == 'available' || data.serviceable==1){                                         
	                                        	$('#pincode').parent().removeClass('frm-error-wrap').addClass('frm-success-wrap');
	                                        	$('.btn-green-pin').removeClass('disabled');
	                                            serv_str = 'Delivery between '+data.tentative_delivery_date.start_day+'-'+data.tentative_delivery_date.end_day;
	                                            $('.giftcard_pincode_success').html(serv_str).show();
	                                            $('#pincode').siblings('.error-msg').hide();
	                                            if(!_pin){ //pin code not empty
	                                              var date = new Date();
	                                              date.setTime(date.getTime() + (30*24*60*60*1000));
	                                              var parameter_name = "serviceable_pincode";
	                                              var expires = date.toGMTString();
	                                              document.cookie = parameter_name+"="+pincode+"; expires="+expires+"; path=/";
	                                              //$.cookie(parameter_name, pincode, { path: '/', expires: expires });
	                                            }
	                                        }
	                                      
//	                                }
	                                
	                                /* REGION WISE BANNER HANDLING STOP */
	                            },error:function(){
	                                    $('.btn-green-pin').removeClass('btn-loader');
	                                    $('.pin-err-gft').html('<span class="red">please try later</span>');
	                            }
	                    });
	       }else{
	    	   $('#pincode').parent().removeClass('frm-success-wrap').addClass('frm-error-wrap');
	    	   $('#pincode').siblings('.error-msg').html('Required').show();
	       }
       
            });
            $('.btn-green-pin').removeClass('loading');
            
     $("#ecardsubmit,#physicalcardsubmit").click(function(){
         var currentid=$(this).attr('id');
         var FormName='';
         var FormType='';
         var mainProductId='';
         if(currentid=='ecardsubmit'){
             FormName='ecard-form';
             FormType='ecard';
             mainProductId=ecardMainProduct;
             giftcardtype = 'virtual';
         }else{
             FormName='physicalcard-form';
             FormType='physicalcard';
             giftcardtype = 'physical';
             //var _pin = $.cookie('serviceable_pincode');
             var _pin = PF.UTILITIES.readCookie('serviceable_pincode');
              mainProductId=physicalMainProduct;

          if ($('#pincode').attr('check') != '1') {
            errormsg = '<p class="txt-red custom-error">Click on the Check button to know if we can deliver to your pincode</p>';
            $('#pincode').siblings(".error-msg").html(errormsg).show();
            return false;
          }

         }
         $( ".custom-error" ).remove();
        var ObjArr = $('#'+FormName+' [validate="1"]');  
        var error=false;
        if(PF.HEADER.validateForm("",FormName)) {
        	var error=true;
		}
        
        		/** Code added prathamesh.s to check multiple giftcards*/
				    var error= (validateGiftcardSelections(giftcardtype))?true:error;
           /** End of Code added prathamesh.s to check multiple giftcards*/

               if(!error){
                    $('#'+currentid).addClass('btn-loader');
                    $('.prcd-topay-btn a').addClass('disabled');
                   formdata=$("#"+FormName).serialize();
                   $.ajax({
                        url:secure_url+'/cart/validgiftcard',
                        data: formdata+"&mainProductId="+mainProductId+"&type="+FormType,
                        type:'post',
                        dataType: 'json',
                        success:function(data){
                        	$('#'+currentid).removeClass('btn-loader');
                            if(data && data != null){
                            try {
                            if(data.status == true) {
                              if (FormType=='physicalcard') {
                                if(!_pin){ //pin code not empty
                                  var date = new Date();
                                  date.setTime(date.getTime() + (30*24*60*60*1000));
                                  var parameter_name = "serviceable_pincode";
                                  var expires = date.toGMTString();
                                  pincode = $('#pincode').val();
                                  document.cookie = parameter_name+"="+pincode+"; expires="+expires+"; path=/";
                                  //$.cookie(parameter_name, pincode, { path: '/', expires: expires });
                                }
                              }

                              window.location= secure_url + '/checkout/cart';
                              return true;
                            }else{
                              $('#'+currentid).removeClass('btn-loader');
                              if(data.type=='pincode'){
                                  //errormsg='<p class="txt-red custom-error">'+ErrArr[data.type]+'</p>';
                                  errormsg='<span class="txt-red"><img src="'+image_url+'images/valid_pin_gftcrd.png" alt="suc"> &nbsp;'+data.msg+'</span>';
                                   $('#pincode').siblings(".error-msg").html(errormsg).show();
                                }else{
                                	$('#selection_error_'+giftcardtype).html(data.msg).show();
                              }
                                return false;
                            }
                            } catch(e) {
                            }
                        }
                            $('.prcd-topay-btn a').removeClass('disabled');
               }
           });
       }
     });
     
    /***************************code from designer team********************************************/
     
     $('.gift-balance-form input').keyup(function() {
      var empty = true;
      $('.gift-balance-form input').each(function() {
        if ($(this).val() == '') {
          empty = false;
        }
      });
      if (empty) {
        $('.check-btn-bal').removeClass('disabled');
      } else {
        $('.check-btn-bal').addClass('disabled');
      }
    }); 


    /* right side form check button */

    function right_side_form(abc){    
      $('.prcd-topay-btn a').addClass('disabled');
      $('.'+abc+' .frrm-sendto-blck input').keyup(function() {
        var frmChk = true
        $('.'+abc+'  .frrm-sendto-blck input').each(function() {
          if ($(this).val() == '') {
            frmChk = false;
          }
        });
        if (frmChk) {
          $('.prcd-topay-btn a').removeClass('disabled');
        } else {
          $('.prcd-topay-btn a').addClass('disabled');
        }
      }); 
       
    }

    function scroll_for_animate() {
    	var heightFromTop = $('.mega-menu-ext-wrap').offset().top;
        $('html, body').animate({scrollTop:heightFromTop}, 'slow');
    }


  /*custom selct box */
  $(".selct-drp-dwn, drp-dwn-icn").on("click", ".init", function(e) {
    $(this).closest(".selct-drp-dwn ").children('li:not(.init)').toggle();
    e.stopPropagation();
  });
  
  $('body').on('click', function(){
    $(".selct-drp-dwn ").children('li:not(.init)').hide();
  });
  

  var allOptions = $(".selct-drp-dwn ").children('li:not(.init)');
  $(".selct-drp-dwn ").on("click", "li:not(.init)", function() {
      var productId = 0;
      var productQty = 0;
    allOptions.removeClass('selected');
    $(this).addClass('selected');
    $(".selct-drp-dwn ").children('.init').html($(this).html());
    allOptions.slideUp();
    productId = $(this).attr('data-id');
    productQty = $("#input_"+productId).val();
    if(productQty){
        $('.qty_input').val(productQty);
    }else {
        $('.qty_input').val(0);
    }
    
  });



  /*  balance chek block */
  	$('#check_balance_msg').hide();
    $('.check-btn-bal').on('click', function(){
        var giftcard_no= $('#gft-crd-no').val();
        var giftcard_pin= $('#gft-crd-pin').val();
        if(giftcard_no!='' && giftcard_pin!=''){
            $('.check-btn-bal').addClass('btn-loader');
            $.ajax({
                        url:secure_url+'/checkout/checkGiftCardBalance',
                        data: {gv_number : giftcard_no , gv_pin : giftcard_pin},
                        type:'post',
                        success:function(data){
                            if(data && data != null){
                                   var response;
                            try {
                                response = $.parseJSON(data);
                            } catch(e) {
                              response = data;
                            }
                            }
                            
                        if (response.status === true){
                          var balanceStr='<p><span>Balance :</span> <span>Rs. '+response.amount+'</span></p>';
                          var expiryStr='<p><span>Expiry Date: </span> <span> '+response.expiryDate+'</span></p>';
                          $('#check_balance_msg').html(balanceStr+expiryStr).removeClass('pf-text-red').addClass('pf-primary-color').show();
                          $('#check_balance_note_msg').show();
                        } else {
                          $('#check_balance_msg').html(response.message).addClass('pf-text-red').removeClass('pf-primary-color').show();
                          $('#check_balance_note_msg').show();
                        }
                        $('.check-btn-bal').removeClass('btn-loader');    
                            /* REGION WISE BANNER HANDLING STOP */
                        },error:function(){
                        	$('#check_balance_msg').html('Please Try Later').addClass('pf-text-red').removeClass('pf-primary-color').show();
                        	 $('.check-btn-bal').removeClass('btn-loader');  
                        }
                });
            }else{
            	$('#check_balance_msg').html('Please enter a valid Gift Card Number and Pin').addClass('pf-text-red').removeClass('pf-primary-color').show();
            	$('#check_balance_note_msg').hide();
            }
    });


   /*  doostep block animation chek block */
    $('.door-delivery-block').hide();
    $('.door-step-open').on('click', function(){

      if ($.isEmptyObject(physicalProduct)) {
        return false;
      }

      $('.door-delivery-block').fadeIn(400);
      $('.gft-door-row').fadeOut(400);
      // $('.page-title').hide();
      right_side_form('door-delivery-block');
      
      scroll_for_animate();
      $(".gft-cpn-bxs").html('');
      count=1;
      //$('#dr-dlfrm-row-right').css({'position' : 'relative', 'right': '0'});
    });

    /* back to fisrt stage or previous stage in door step*/  
    $('.back-to-prev-door').on('click', function(){
      $('.door-delivery-block').hide();
      $('.door-delivery-block').fadeOut('slow');
      $('.gft-door-row').fadeIn('slow');
      $(".gft-cpn-bxs").html('');
      $('.frrm-sendto-blck input').val('');
      $(".selct-drp-dwn ").children('.init').html('Select Amount');
      $(".selct-drp-dwn li").removeClass("selected");
      $('.qty_input').val(0);
       count=1;
      // $('.page-title').show();
    });
    
    

    /* email step block animation chek block */
    $('.email-delivery-block').hide();
    $('.email-step-open').on('click', function(){

      if ($.isEmptyObject(ecardProduct)) {
      return false;
      }

      $('.email-delivery-block').fadeIn(400);
      $('.gft-door-row').fadeOut(400);
      right_side_form('email-delivery-block');
      scroll_for_animate();
      $(".gft-cpn-bxs").html('');
      count=1;
    });


    /* back to fisrt stage or previous stage in door step*/  
    $('.back-to-prev-email').on('click', function(){
      $('.email-delivery-block').hide();
      $('.email-delivery-block').fadeOut('slow');
      $('.gft-door-row').fadeIn('slow');
      $('.page-title').show();
      $(".gft-cpn-bxs").html('');
      $('.frrm-sendto-blck input').val('');
      $(".selct-drp-dwn ").children('.init').html('Select Amount');
      $(".selct-drp-dwn li").removeClass("selected");
      $('.qty_input').val(0);
       count=1;
    });
    
    




  /*  right-side form pin */

    $('#pincode').on('keyup change', function() {
      if ($(this).val() == '') {
         $('.gft-frm-check-pin a').addClass('disabled');
      }
      else {
         $('.gft-frm-check-pin a').removeClass('disabled');
      }

    });

    $('.giftcard_pincode_success').hide();
    


    /*plus and minussign */
    var count=1;
    var curr_amt = '';

    $('body').on('click','.plussign', function(){
        $(".selct-drp-dwn ").children('li:not(.init)').hide();
        var currentFormId=$(this).parents("form").attr("id");
        var gft_sel_amnt = $("#"+currentFormId+" .selct-drp-dwn").find(".selected").data("value");
        var selectedID = $("#"+currentFormId+" .selct-drp-dwn").find(".selected").data("id");
        var $qty=$(this).closest('div').find('.qty_input');
        var currentVal = parseInt($qty.val());
        var qtyArr='';
          //for reset error
        $(".gc-error").hide();
        $('.selct-drp-dwn').removeClass('gc-error-bdr');
        $('.choose-qty-block').removeClass('gc-error-bdr');   
        if(selectedID===null || selectedID==''){
               $('#'+currentFormId+' .gc-error').show();
               $('#'+currentFormId+' .selct-drp-dwn').addClass('gc-error-bdr');
               return false;
            }
        gft_amnt_no = currentVal+1; 
        if(currentFormId=='physicalcard-form'){
            qtyArr=physicalProductQty;
        }else{
         qtyArr=ecardProductQty; 
        }
        if(qtyArr[selectedID]<gft_amnt_no){
            //var errorStr="Only "+qtyArr[selectedID]+" quantity left for Rs "+gft_sel_amnt+" gift card";
            var errorStr="You can only order a maximum of "+qtyArr[selectedID]+"  quantities  for this Denomination";
            $('#'+currentFormId+' .gc-error').html(errorStr).show();
             $('#'+currentFormId+' .choose-qty-block').addClass('gc-error-bdr');
             return false;
        }
          if (!isNaN(currentVal)) {
            $qty.val(currentVal + 1);
          }
        
      if($("#"+currentFormId+" #div_"+selectedID).length>0){
          $("#"+currentFormId+" #div_"+selectedID+" p.multiple-of-cpn span.gft_amount_no_val").text(gft_amnt_no);
          $("#"+currentFormId+" #input_"+selectedID).val(gft_amnt_no);
      }else{
       if($('.cpncrd-blck').length==5){
            return false;
        }
      var divStr='<div class="cpncrd-blck" id="div_'+selectedID+'">\n\
                     <input type="hidden" name="giftcardvalue['+selectedID+']" value="'+gft_sel_amnt+'" id="giftcardvalueinput_'+selectedID+'"><input type="hidden" name="dimenitaion['+selectedID+']" value="'+gft_amnt_no+'" id="input_'+selectedID+'"><div class="cpn-crd">\n\
                     <span class="amount-gft-vch">' + gft_sel_amnt + 
                '</span><a href="javascript:void(0)" class="gftcrd-close-icn">\n\
                </a></div>\n\
                <p class="multiple-of-cpn">x \n\
                <span  class="gft_amount_no_val">' + gft_amnt_no + '</span></p></div>';
          if (count == 1) {  
              $('#'+currentFormId+' .gft-cpn-bxs').append(divStr+ '<a href="javascript:void(0)" class="add-another-blck">Add Another</a>');
            $('#'+currentFormId+' .anmt-fly-blck').addClass('anmt-fly-blck-on');    
//            setTimeout(function() {             
//            $('.anmt-fly-blck').addClass('anmt-fly-blck-off');
//            }, 200);     
            
          }else {   
               $('#'+currentFormId+' .cpncrd-blck:first-child').before(divStr);
              $('#'+currentFormId+' .anmt-fly-blck').addClass('anmt-fly-blck-on');
          }
      }
      count++;
      curr_amt = gft_sel_amnt;
       if($('.cpncrd-blck').length>=5){
          $(".add-another-blck").hide();
      }
     });
 
    $('.minussign').on('click',function(){
        //reset form validation
        $(".gc-error").hide();
        $('.selct-drp-dwn').removeClass('gc-error-bdr');
        $('.choose-qty-block').removeClass('gc-error-bdr');  
      var currentFormId=$(this).parents("form").attr("id");
      var $qty=$(this).closest('div').find('.qty_input');
      var minus_cur_val = $(this).closest('.slect-gft-qty').siblings('.slect-gft-vchr').find('.selct-drp-dwn');
      var selectedID=$(minus_cur_val).find(".selected").data("id");
       var currentVal = parseInt($qty.val());
       tempValue=currentVal - 1;
      if (!isNaN(tempValue) && tempValue > 0) {
        $qty.val(tempValue);
        $("#div_"+selectedID+" p.multiple-of-cpn span.gft_amount_no_val").text(tempValue);
        $("#input_"+selectedID).val(tempValue);
      }else{
          if(tempValue<0){
              return false;
          }
            $qty.val(tempValue);
            $("#div_"+selectedID).remove();
          if($('#'+currentFormId+' .cpncrd-blck').length==0){
             $("#"+currentFormId+" .gft-cpn-bxs").html("");
             count=1;
           }
      }
      
    }); 

    /* duplicate content type in bootom from Form */

    $('#f_name_mail').on('keypress change keyup', function() {
      $('#fnme-frm-usr').text($(this).val());
    });

    $('#message_id').on('keypress change keyup', function() {
      $('#msg-cpy-usr').text($(this).val());
    });

    $('#frm_f_name_mail').on('keypress change keyup', function() {
      $('#frm-cpy-usr').text($(this).val());
    });


    /* Append add more CTA and Gift voucher*/
    $('body').on('click','.add-another-blck, .drp-dwn-icn' ,function(e) {
      $('.selct-drp-dwn .init').trigger('click');
      e.stopPropagation();
    });

    $('body').on('click', '.gftcrd-close-icn' , function(){
      $(this).parent().parent('.cpncrd-blck').remove();
      if($('.cpncrd-blck').length<=0){
          $(".gft-cpn-bxs").html("");
          count=1;
      }
      if($('.cpncrd-blck').length<5){
          $('.add-another-blck').show();
      }
      $('.prcd-topay-btn a').removeClass('disabled');

    });

    $( "#pincode" ).blur(function() {
      var pincode= $(this).val();
      if (pincode != $pinCodeSet) {
        $(".giftcard_pincode_success").html('').hide();
      }
    });
      
	var virtualGiftCardCounter 	= 1;
	var physicalGiftCardCounter = 1;
	
	$(".email-gft-card ").on("click", function(){
		$(this).parents('.column-wrap').hide();	
		$('.emial-gft-card-wrap').fadeIn('slow');
		initAddMoreGiftCard('virtual',virtualGiftCardCounter);	
		initDominationQuantity('virtual');
	})
	$(".physcl-gft-card").on("click", function(){		
		$(this).parents('.column-wrap').hide();	
		$('.physcl-gft-card-wrap').fadeIn('slow');
		initAddMoreGiftCard('physical',physicalGiftCardCounter);
		initDominationQuantity('physical');
	})

	// GO Back Click
	$(".go-back-btn").on("click", function(){
		$(".emial-gft-card-wrap, .physcl-gft-card-wrap").fadeOut();
		$(".column-wrap").fadeIn();
		var loadTab = location.href.split('#')[1];
		if(typeof loadTab != 'undefined' && loadTab != ''){
			history.pushState('','Gift Card', location.href.replace("#"+loadTab, ""));	
		}
		clearBlockInputs();
	});

	$('#pincode').on('keypress change keyup', function() {
		if($(this).val().length == 6){
			$('.btn-green-pin').removeClass('disabled');
		}else{
			$('.btn-green-pin').addClass('disabled');
		}
	});

    /* duplicate content type in bootom from Form */    
    $('#f_name_mail').on('keypress change keyup', function() {
       $('#fnme-frm-usr').text($(this).val());

    });
    $('#l_name_mail').on('keypress change keyup', function() {
       $('#lnme-frm-usr').text($(this).val());
    });

    $('#message_id').on('keypress change keyup', function() {
      $('#msg-cpy-usr').text($(this).val());
    });

    $('#frm_f_name_mail').on('keypress change keyup', function() {
      $('#frm-cpy-usr').text($(this).val());
    });
    
    $('.event-gallery-image-thumb ul li').on('click', function () {
        var dataImg = $(this).data('img');
        $(this).closest('.event-gallery-image-thumb').siblings('.event-gallery-image').find('img').attr('src', dataImg);
        $('.event-gallery-image-thumb ul li').removeClass('active');
        $(this).addClass('active');
    });
    
    $('#message_id').on('keypress change keyup', function() {
        var initalTxt = "Your Personalised Message Will Be Here";    
        var txtLngth = $(this).val().length;      
        if(txtLngth > 0){
         $('#msg-cpy-usr').text($(this).val());      
        }else{
         $('#msg-cpy-usr').text(initalTxt);
        }
     });
    
    $('#frm_f_name_mail').on('keypress change keyup', function() {
        $('#senderFname-txt').text($(this).val());
    });
    
     $('#frm_l_name_mail').on('keypress change keyup', function() {
        $('#senderLname-txt').text($(this).val());
     });
     
    $(".gcValue, .gcQuantity ").select2({
  	     minimumResultsForSearch: -1
  	});

    
    var initSelect2 = function(){
    	$(".gcValue, .gcQuantity ").select2({
    	     minimumResultsForSearch: -1
    	});
    }
    
    var setQuantity = function(){
    	$(".gcValue").on('change',function(){
        var giftcardtype = $(this).attr('id').split('_')[1];
        if($(this).siblings('.gcQuantity').select2('val') != '' && $(this).val() != ''){
          validateGiftcardSelections(giftcardtype);
        }else if($(this).siblings('.gcQuantity').select2('val') == '' && $(this).val() != ''){
    			var Obj = $(this);
    			setTimeout(function(){ 
    				Obj.siblings('.gcQuantity').select2('val', Obj.siblings('.gcQuantity').find('option:eq(1)').val());
            validateGiftcardSelections(giftcardtype);
    			}, 300);
    		}
    	});

      $(".gcQuantity").on('change',function(){
        var giftcardtype = $(this).siblings('.gcValue').attr('id').split('_')[1];
        validateGiftcardSelections(giftcardtype);
      });
    }
    setQuantity();
    
    /** Code added by prathamesh.s clear all Giftcard Selections throughout Page
     *  giftcardtype - virtual/physical
     * */
    var resetGiftcardSelection = function(giftcardtype){
    	var removeGiftcardSelection = false;
    	$('.slct-yr-gft-card-lst[id^=div_giftcard_list_'+giftcardtype+'_]').each(function(){
    		//Keep first select box and remove rest select boxes
    		if(!removeGiftcardSelection){ 
    			$(this).find('.gcValue').val('').removeAttr('disabled').siblings('.gcQuantity').val('').trigger('change').siblings('.gb-select-val').hide().siblings('.add-more-gft-card-'+giftcardtype).off( "click" ).hide().siblings('.cancel-more-gft-card').off( "click" ).hide();
    			createDenomination(giftcardtype,$(this).attr('id').split('_')[4]);
    			removeGiftcardSelection = true;
    		}else{
    			$(this).children('.add-more-gft-card-'+giftcardtype).off('click').parent().remove();
    		}
    	});
    	$('#selection_error_'+giftcardtype).hide();
    	$('#purchase_value_'+giftcardtype).html(0);
    }
    
    /** Code added by prathamesh.s clear all fields throughout Page*/
    var clearBlockInputs = function(){
    	$('input[type=text], textarea').val('')
    		.siblings('.error-msg').html('').hide()
    		.parent().removeClass('frm-success-wrap').removeClass('frm-error-wrap');
    	
    	resetGiftcardSelection('virtual'); // Reset Virtual Select Box selections
    	resetGiftcardSelection('physical'); // Reset Physical Select Box selections
    	
    	// Reset amount and hide note in display
    	$('.note').hide();
    	$('#card_value_virtual_1').html(0);
    	$('#card_value_virtual_2').html(0);
    }
    
    /** Code added by prathamesh.s to Add Click funtionality on AddMore Button 
     *  giftcardtype - virtual/physical 
     * */
    var initAddMoreGiftCard = function(giftcardtype){
    	$(".add-more-gft-card-"+giftcardtype).on('click',function(){
    		triggerAddMoreEvent(giftcardtype,this);
        });
    }
    
    /** Code added by prathamesh.s to Add Trigger funtionality on AddMore Button
     *   giftcardtype - virtual/physical
     *   AddMoreObj - ADD ANOTHER GIFT CARD Button Obj 
     * */
    var triggerAddMoreEvent =  function(giftcardtype,AddMoreObj){
    	   $(AddMoreObj).hide();
           $('#selection_error_'+giftcardtype).hide();
           if(giftcardtype == 'virtual'){
        	   $('.note').show();
           }
           $(".gcValue, .gcQuantity ").select2('destroy'); //Distory Select2 to clone select Boxes
           var lastGiftCardObj  = $('.slct-yr-gft-card-lst[id^=div_giftcard_list_'+giftcardtype+'_]').last();
           var lastGiftCardId	= Number(lastGiftCardObj.attr('id').split(/[_ ]+/).pop());
           cloneObjects(lastGiftCardObj,giftcardtype);
    }
    
    /** Code added by prathamesh.s for Cloning objects
     *  Obj - last GiftCard Row ID
     *  giftcardtype - virtual/physical
     * */
    var cloneObjects = function(Obj,giftcardtype){
    	var cloneCount		= (giftcardtype == 'virtual')? virtualGiftCardCounter:physicalGiftCardCounter;// lastGiftCardId+1;
    	Obj.find('.gb-select-val .close-btn').css('display','inline-block');
    	
    	// Cloning of Obj
    	Obj
       	.clone()
       	.attr('id', 'div_giftcard_list_'+giftcardtype+'_'+ (cloneCount+1))
       	.insertAfter($('[id^=div_giftcard_list_'+giftcardtype+'_]:last'));
       
    	var AddMoreObj = $('#div_giftcard_list_'+giftcardtype+'_'+ (cloneCount+1)).find('.add-more-gft-card-'+giftcardtype);
       
    	// Set attributes of Cloned Object
    	$('#div_giftcard_list_'+giftcardtype+'_'+ (cloneCount+1))
       	.find('.gcValue').val('').removeAttr('disabled')
       	.siblings('.gcQuantity').val('')
       	.siblings('.cancel-more-gft-card').css('display','inline-block')
       	.siblings('.gb-select-val').css('display','none')
       	.siblings('.add-more-gft-card-'+giftcardtype).off('click').on('click', function() {triggerAddMoreEvent(giftcardtype,AddMoreObj)}).css('display','none')
       	.siblings('.gcValue').attr('id','domination_'+giftcardtype+'_'+ (cloneCount+1));
        
    	createDenomination(giftcardtype,(cloneCount+1));  //Fill gift card values
        initDominationQuantity(giftcardtype); //Add events on Select Boxes
        removeGiftCard(giftcardtype); // Add event on cancel and close Buttons
        initDominationSelection(giftcardtype); //Set Denomination values as per earlier selections
        initSelect2();
        setQuantity();
        Obj.find('.gcValue').attr('disabled','disabled');
        (giftcardtype == 'virtual')? virtualGiftCardCounter++:physicalGiftCardCounter++;
    }
    
    /** Code added by prathamesh.s to initate Denomination and quantity
     *  giftcardtype - virtual/physical
     * */
    var initDominationQuantity = function(giftcardtype){
    	$(".gb-select").on('change', function() {
    		if($(this).val() != '' && $(this).siblings('select').val() != ''){
    			var LastID 		= $('.slct-yr-gft-card-lst[id^=div_giftcard_list_'+giftcardtype+'_]').last().attr('id');
    			var divID	  	= $(this).parent().attr('id');
    			if($('.slct-yr-gft-card-lst[id^=div_giftcard_list_'+giftcardtype+'_]').length == 1){
    				$('.slct-yr-gft-card-lst[id^=div_giftcard_list_'+giftcardtype+'_]').last().find('.gb-select-val .close-btn').css('display','none');
    			}
    			if(LastID == divID && $(this).parent().find('.gcValue').find('option').size() > 2){
    				$(this).siblings('.add-more-gft-card-'+giftcardtype).css('display','inline-block');
    			}
    			$(this).siblings('.cancel-more-gft-card').hide();
    			$(this).siblings('.gb-select-val').css('display','inline-block').find('span').html($(this).val()*$(this).siblings('select').val());
    			calculateGiftCardAmount(giftcardtype);
    			initDominationSelection(giftcardtype);
    		}else if($('.slct-yr-gft-card-lst[id^=div_giftcard_list_'+giftcardtype+'_]').length == 1){
    			$(this).siblings('.cancel-more-gft-card').hide();
    			$(this).siblings('.gb-select-val').css('display','none');
    			$(this).siblings('.add-more-gft-card-'+giftcardtype).css('display','none');
    			calculateGiftCardAmount(giftcardtype);
    		}
    		else{
    			$(this).siblings('.gb-select-val').css('display','none');
    			$(this).siblings('.cancel-more-gft-card').show();
    			$(this).siblings('.add-more-gft-card-'+giftcardtype).css('display','none');
    			calculateGiftCardAmount(giftcardtype);
    		}
    	});
    }
    
    /** Code added by prathamesh.s to perform actions on remove functionalities
     *  giftcardtype - virtual/physical
     * */
    var onRemoveGiftCardAction= function(giftcardtype){
    	var lastGiftCardObj 	= $('.slct-yr-gft-card-lst[id^=div_giftcard_list_'+giftcardtype+'_]').last();
		var LastGiftCardValue 	= lastGiftCardObj.find('.gcValue').val();
		
		calculateGiftCardAmount(giftcardtype);		
		createDenomination(giftcardtype,(lastGiftCardObj.attr('id').split('_')[4]));  //Fill gift card values
		initDominationSelection(giftcardtype);
		
		lastGiftCardObj.find('.gcValue').val(LastGiftCardValue).removeAttr('disabled');	
		
		var giftCardCase = '';
		if($('.slct-yr-gft-card-lst[id^=div_giftcard_list_'+giftcardtype+'_]').length == 1 && lastGiftCardObj.find('.gcValue').val() != '' && lastGiftCardObj.find('.gcQuantity').val() != ''){
			giftCardCase = 'lastGiftCardSelectedValues';
		}else if($('.slct-yr-gft-card-lst[id^=div_giftcard_list_'+giftcardtype+'_]').length == 1){
			giftCardCase = 'lastGiftCardNonSelectedValues';
		}else if(lastGiftCardObj.find('.gcValue').val() != '' && lastGiftCardObj.find('.gcQuantity').val() != ''){
			giftCardCase = 'GiftCardSelectedValues';
		}else{
			giftCardCase = 'GiftCardNonSelectedValues';
		}
		
		switch (giftCardCase){
			case 'lastGiftCardSelectedValues' : 
				lastGiftCardObj.find('.cancel-more-gft-card').css('display','none');
				lastGiftCardObj.find('.add-more-gft-card-'+giftcardtype).css('display','inline-block');
				lastGiftCardObj.find('.gb-select-val .close-btn').css('display','none');
    			$('.note').hide();
				break;
			case 'lastGiftCardNonSelectedValues' : 
				lastGiftCardObj.find('.cancel-more-gft-card').css('display','none');
				lastGiftCardObj.find('.add-more-gft-card-'+giftcardtype).css('display','none');
    			$('.note').hide();
				break;
			case 'GiftCardSelectedValues' : 
				lastGiftCardObj.find('.cancel-more-gft-card').css('display','none');
				lastGiftCardObj.find('.add-more-gft-card-'+giftcardtype).css('display','inline-block');
    			$('.note').show();
				break;
			case 'GiftCardNonSelectedValues' : 
				lastGiftCardObj.find('.cancel-more-gft-card').css('display','inline-block');
				lastGiftCardObj.find('.add-more-gft-card-'+giftcardtype).css('display','none');
    			$('.note').show();
				break;
		}
    validateGiftcardSelections(giftcardtype);
    }
    
    /** Code added by prathamesh.s to Added for Remove node functionality
     *  giftcardtype - virtual/physical
     * */
    var removeGiftCard = function(giftcardtype){
    	$('.cancel-more-gft-card').on('click', function() {
    		$(this).siblings('.add-more-gft-card-'+giftcardtype).off('click');
    		$(this).parent().remove();
    		onRemoveGiftCardAction(giftcardtype);
    	});
    	$('.close-btn').on('click', function() {
    		if($('.slct-yr-gft-card-lst[id^=div_giftcard_list_'+giftcardtype+'_]').length > 1){
				$(this).siblings('.add-more-gft-card-'+giftcardtype).off('click');
        		$(this).parent().parent().remove();
        		onRemoveGiftCardAction(giftcardtype);
    		}
    	});
    }
    
    
    /** Code added by prathamesh.s to Calculate giftcard amt
     *  giftcardtype - virtual/physical
     * */
    var calculateGiftCardAmount = function(giftcardtype){
    	var totalAmount = 0;
    	// Calculate total of selected amount
    	$('.slct-yr-gft-card-lst[id^=div_giftcard_list_'+giftcardtype+'_]').each(function(){
    		totalAmount += Number($(this).find('.gcValue').val()) * Number($(this).find('.gcQuantity').val());
    	});
    	// Update amount in display
    	$('#purchase_value_'+giftcardtype).html(totalAmount);
    	if(giftcardtype == 'virtual'){
    		$('#card_value_'+giftcardtype+'_1').html(totalAmount);
        	$('#card_value_'+giftcardtype+'_2').html(totalAmount);	
    	}
    }
    
    /** Code added by prathamesh.s to create denomination
     * giftcardtype - virtual/physical
     * counter - position of select box
     * */
    var createDenomination =function(giftcardtype,counter){
    	if(giftcardtype == 'virtual'){
    		if (!$.isEmptyObject(ecardProduct)) {
            	  var str = '<option value="" data-id="">Gift Card Value</option>';
        	      $.each(ecardProduct, function(key, value) {
        	         str +='<option value="'+value+'" data-id="'+key+'">'+value+'</option>';
        	      });
        	      $("#domination_virtual_"+counter).html(str);
        	  }else{
                    $('.door-step-open').addClass('disabled');
                    $('.select-cta .door-step-open').text('Coming Soon');
              }
    	}else{
    		if (!$.isEmptyObject(physicalProduct)) {
             	 var str = '<option value="" data-id="">Gift Card Value</option>';
         	      $.each(physicalProduct, function(key, value) {
         	    	    str +='<option value="'+value+'" data-id="'+key+'">'+value+'</option>';
         	  	  });
         	    $("#domination_physical_"+counter).html(str);
             }else{
                   $('.email-step-open').addClass('disabled');
                   $('.select-cta .email-step-open').text('Coming Soon');
             }
    	}
    }

	/** Code added by prathamesh.s to validate giftcard selections*/
    var validateGiftcardSelections = function(giftcardtype){
      $('#'+giftcardtype+'_hidden_data').html();
      var giftcardSelectionError = false;
      var error                  = false;
      if($('div[id^=div_giftcard_list_'+giftcardtype+'_]').length > 0){
         $('#'+giftcardtype+'_hidden_data').html('');
         var hiddenData = '';
         $('.slct-yr-gft-card-lst[id^=div_giftcard_list_'+giftcardtype+'_]').each(function(){
            var domination  = $(this).children('.gcValue').val();
            var data_id   = $(this).find('option:selected').data('id');
            var qty     = $(this).children('.gcQuantity').val();

            if(domination != '' && qty != ''){
              hiddenData += '<input type="hidden" name="giftcardvalue['+data_id+']" value="'+domination+'" id="giftcardvalueinput_'+data_id+'">';
              hiddenData += '<input type="hidden" name="dimenitaion['+data_id+']" value="'+qty+'" id="input_'+data_id+'">';
            }else {
              if(domination == ''){
                  $(this).find('.gcValue').addClass('frm-error-gftcrd');
                  giftcardSelectionError=true;
                  error=true;
                }
                if(qty == ''){
                  $(this).find('.gcQuantity').addClass('frm-error-gftcrd');
                  giftcardSelectionError=true;
                  error=true;
                }
            }
         });
         $('#'+giftcardtype+'_hidden_data').html(hiddenData);
       }else{
         error=true;
       }
       if(giftcardSelectionError){
         $('#selection_error_'+giftcardtype).html('Select a Gift Card Value and Quantity').show();
       }else{
         $('#selection_error_'+giftcardtype).html('').hide();
       }
       return error;
    }
	/** End of Code added by prathamesh.s to validate giftcard selections*/
    
    /** Code added prathamesh.s to init denomination selections*/
    var initDominationSelection = function(giftcardtype){
    	var usedCards = [];
    	
    	//Get all used giftcard values
    	$('.slct-yr-gft-card-lst[id^=div_giftcard_list_'+giftcardtype+'_]').each(function(){
    		if($(this).find('.gcValue').val() != ''){
    			usedCards.push($(this).find('.gcValue').val());
    		}
    	});

    	//Remove all used giftcard values from selecion box 
    	$('.slct-yr-gft-card-lst[id^=div_giftcard_list_'+giftcardtype+'_]').each(function(){
    		var id 	= $(this).find('.gcValue').attr('id');
    		var obj = $(this);
    		$.each(usedCards, function(index, item) {
    			if(item != ''  && obj.find('.gcValue').val() != item){
        			obj.find(".gcValue option[value='"+item+"']").remove();
        		}
    		})
    	});
    }
    
    $(window).bind('hashchange', function() {
      clearBlockInputs();
      var loadTab = location.hash.replace( /^#/, '' );
    	if(loadTab == 'eGiftCard'){
        $(".physcl-gft-card-wrap").fadeOut();
        $(".email-gft-card").trigger('click');
        
  		}else if(loadTab == 'physicalGiftCard'){
  			$(".emial-gft-card-wrap").fadeOut();
  			$(".physcl-gft-card").trigger('click');
  		}else{
  			$('.go-back-btn').trigger('click');
  		}
    });
    
    /** Code added by prathamesh.s to open selected tab from landing page */
    var loadTabByUrl = function(url){
		var loadTab = url.split('#')[1];
		if(loadTab == 'eGiftCard'){
			$(".email-gft-card").trigger('click');
	 	   
		}else if(loadTab == 'physicalGiftCard'){
			$(".physcl-gft-card").trigger('click');
	    }
    	scroll_for_animate();
    }
    loadTabByUrl(location.href);
});
