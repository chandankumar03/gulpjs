var PF = PF || {};
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
if( typeof PF.TRYANDBUY === 'undefined' ) {
    (function (z, $) {
        var utils = z.UTILITIES;
        var o = {
            d : $(document),
            w : $(window),
            listenOnPageLoad : {
                click : {
                  '.tb-pincode-go':['PF.TRYANDBUY.pinCodeGo','#page'],
                  '.tb-pincode-change':['PF.TRYANDBUY.pinCodeChange','#page'],
                  '.clip-add-to-cart-btn':['PF.TRYANDBUY.addtocart','#page'],
                  '#trial-btn-popup':['PF.TRYANDBUY.trailtab','#page'],
                  '.trial-btn':['PF.TRYANDBUY.scrolltopage','#page'],
                  '#scrolltoFaq':['PF.TRYANDBUY.scrolltoFaq','#page'],
                  '.tb-cart-remove,.clip-remove-cart-btn':['PF.TRYANDBUY.removefromcart','#page'],
                  '#booksofa':['PF.TRYANDBUY.proceedtocheckout','#page'],
                  '#guestAddressSubmit':['PF.TRYANDBUY.addresssubmit','#page'],
                }
            },
            init : function() {
             utils.listen(o.listenOnPageLoad);
             o.pinvalidationurl  = root_url + "/site_common/validatePinCode";
             o.addremovecarturl  = root_url + "/site_product/addremovecart";
             o.initurl  = root_url + "/site_product/tryandbuy_cart";
             o.checkouturl  = root_url + "/checkout_tryandbuyorder/tryandbuyaddress";
             o.productId  = "";
             o.flag  = "";
             o.initCall  = true;
             o.layout  = (typeof cartlayout !== "undefined")?cartlayout:"";
             if(typeof cartlayout !== "undefined"){
//              o.checkAssemblypincode();
             }
             o.addremovecart();
            },
            checkAssemblypincode:function(){
               var pincode= utils.readCookie('serviceable_pincode');
               $.ajax({
                        url:root_url+'/pincode/check_assembly_pincode',
                        data:'pincode='+pincode,
                        type:'post',
                        async: false,
                        success:function(data){
                            var responce = $.trim(data);
                            $("#postcode").val(pincode);
                            try {
                                responce = $.parseJSON(responce);
                               if(responce.data.assembly_check == '0'){
//                                  $("#guestAddressSubmit").prop("disbaled",true);
//                                  $("#guestAddressSubmit").addClass("disbaled");
                                  alert("We Don’t Offer Trials At Your Pincode");
                                }
                            } catch (e) {
                                //alert('Error: not a json');
                            }
                            if (responce.data.pincode) {
                                $("#city").val(responce.data.city);
                               $('#state').append(new Option(responce.data.state,responce.data.state));
                            } else {

                            }
                        }
                            }); 
            },
            pinCodeGo: function(){
                var pincode, CO,pincodereg;          
                CO =  $(this).siblings('.tb-pincode-input');
                pincode = CO.val();
                pincodereg= /^[1-9][0-9]{5}$/;
                 if (pincodereg.test(pincode)==false) {
                    $('.tb-pincode-go, .tb-invalid-pincode, .try-invalid-pin').show();
                    $('.try-valid-pin, .tb-valid-pincode, .tb-not-offfer-pincode, .try-not-offer-pin, .tb-pincode-change').hide();
                    $('.tb-pincode-input').addClass('tb-pin-error').removeClass('tb-pin-success').prop('disabled', false);
                } else {
                    $.ajax({
                    url:o.pinvalidationurl,
                    type:"POST",
                    data:{pincode:pincode},
                    dataType:"json",
                    beforeSend:function(){
//                        $('#loaderOverlay').show();
                    },
                    success:function(data){
                      if(data.status){
                        if($("ul.tb-cart-scroll li.clearfix").length>0){
                         $("#booksofa").removeClass('disabled');
                        }
                        $('.try-valid-pin, .tb-valid-pincode, .tb-pincode-change').show();
                        $('.try-not-offer-pin, .tb-pincode-go, .tb-not-offfer-pincode, .tb-invalid-pincode, .try-invalid-pin').hide();
                        $('.tb-pincode-input').val(pincode).addClass('tb-pin-success').removeClass('tb-pin-error').prop('disabled', true).val(pincode);  
                      }else{
//                           $("#booksofa").prop('disabled',true);
                           $("#booksofa").addClass('disabled');
                        $('.try-not-offer-pin, .tb-pincode-change, .tb-not-offfer-pincode').show();
                        $('.try-valid-pin, .tb-valid-pincode, .tb-pincode-go, .tb-invalid-pincode, .try-invalid-pin').hide();
                        $('.tb-pincode-input').val(pincode).addClass('tb-pin-success').removeClass('tb-pin-error').prop('disabled', true).val(pincode); 
                      }
                    },
                    complete:function(){
//                      $('#loaderOverlay').hide();
                    }
                    });
                }
            },
            pinCodeChange:function(){
                $('.tb-pincode-go').show();
                 $('.tb-pincode-input').prop('disabled', false).removeClass('tb-pin-success');
                 $(this).siblings('.tb-pincode-input').focus();
                 $('.tb-pincode-change').hide(); 
            },
            addremovecart:function(){
                var callurl=o.addremovecarturl;
                var dataType="json";
                if(o.initCall){
                   callurl=o.initurl;
                   dataType='html';
                }
                $.ajax({
                    url:callurl,
                    type:"POST",
                    data:{pid:o.productId,flag:o.flag,layout:o.layout},
                    dataType:dataType,
                    beforeSend:function(){
                        $('#loaderOverlay').show();
                    },
                    success:function(data){
                        if(o.initCall){
                             $("#cart-section").html(data);
                             if($("ul.tb-cart-scroll li.clearfix").length>0){
                                 $('ul.tb-cart-scroll li.clearfix').each(function(){
                                    var PID=$(this).attr("data-addId") ;
                                    $("div.row div[data-pid='"+PID+"']").addClass("tb-cart-selected");
                                 });
                             }
                             o.initCall=false;
                        }else {
                            if(data.status){
                            $("#cart-section").html(data.msg);
                            $(".popup-close").trigger("click");
//                            $("#booksofa").prop('disabled',false);
                            $("#booksofa").removeClass('disabled');
                            
                        if(o.flag=='add'){
                            $("div[data-pid='"+o.productId+"']").addClass("tb-cart-selected");
                        }else{
                            $("div[data-pid='"+o.productId+"']").removeClass("tb-cart-selected");
                        }
                        }else{
                            if(data.type=="pincode"){
                                var currentPin=PF.UTILITIES.readCookie('serviceable_pincode');
                                $('.tb-pincode-input').val(currentPin);
                                 $("#product-id").val(o.productId);
                                 $("#trymodal").trigger("click"); 
                            }
//                            $("#booksofa").prop('disabled',true);
                            if(data.type=='cart'){
                                alert(data.msg);
                            }else{
                                $("#booksofa").addClass('disabled');   
                                $('.try-not-offer-pin, .tb-pincode-change, .tb-not-offfer-pincode').show();
                                $('.try-valid-pin, .tb-valid-pincode, .tb-pincode-go, .tb-invalid-pincode, .try-invalid-pin').hide();
                                $('.tb-pincode-input').addClass('tb-pin-success').removeClass('tb-pin-error').prop('disabled', true);
                            }
                        }
                    }
                    },
                    complete:function(){
                        o.productId='';
                           $('.tb-cart-scroll').mCustomScrollbar();
                        if($("ul.tb-cart-scroll li.clearfix").length<=0){
                            if(typeof cartlayout !== "undefined"){
                                $("#guestAddressSubmit").addClass('disabled');  
                            }else{
                                $("#booksofa").addClass('disabled');  
                            }
                        }else if(typeof cartlayout !== "undefined"){
                                $("#guestAddressSubmit").removeClass('disabled');  
                        }
                      $('#loaderOverlay').hide();
                    }
                    });
            },
            addtocart:function(){
                 var pincode;
//                 debugger;
                 pincode= utils.readCookie('serviceable_pincode');
                 if(o.productId==''){
                    o.productId=$(this).parents('div.margin-bottom25').data('pid');
                 }
                 if(!!pincode && !!o.productId){
                    o.flag='add';
                    o.addremovecart();
                }else{
                     $("#product-id").val(o.productId);
                     o.productId='';
                    $("#trymodal").trigger("click"); 
                 }
            },
            removefromcart:function(){
              o.flag='remove';
              o.productId=$(this).attr('data-productid'); 
              o.addremovecart();
              
            },
            trailtab:function(){
                o.productId=$("#product-id").val();
                o.addtocart();
            },
            proceedtocheckout:function(){
               window.location.href=root_url+'/checkout_tryandbuyorder/tryandbuyaddress';
            },
            scrolltopage:function(){
                $('html,body').animate({scrollTop: $('#pagelayout').offset().top}, 'slow');
            },
            scrolltoFaq:function(){
                $('html,body').animate({scrollTop: $('#scrollToFaqContent').offset().top}, 'slow');
            },
            addresssubmit:function(){
                error=PF.HEADER.validateForm('','address_select_form');
                
               if(!error){
                   var formdata=$("#address_select_form").serialize();
                    $.ajax({
                    url:o.checkouturl,
                    type:"POST",
                    data:formdata,
                    dataType:"json",
                    beforeSend:function(){
                        $("#loaderOverlay").show();
                        $("#guestAddressSubmit").addClass("disabled");
                    },
                    success:function(data){
                      if(data.status){
                          window.location.href=root_url+'/checkout_tryandbuyorder/processTryAndBuy'
                      }else{
                          alert(data.msg);
                      }
                    },
                    complete:function(){
                        $("#guestAddressSubmit").removeClass("disabled");
                        $("#loaderOverlay").hide();
                      }
                    });
               }
            }
        };
        z.TRYANDBUY = o;
    }( PF, $));
    
 PF.TRYANDBUY.d.ready(function() {
        PF.TRYANDBUY.init();
        if($("ul.tb-cart-scroll li.clearfix").length<=0){
             if(typeof cartlayout !== "undefined"){
                $("#guestAddressSubmit").addClass('disabled');   
             }else{
                $("#booksofa").addClass('disabled');   
             }
          }
        var cookiepin=PF.UTILITIES.readCookie('serviceable_pincode');
        if(cookiepin !==null){
           $(".tb-pincode-input").val(cookiepin);
           $("#pincodeCheck").trigger("click");
        }
        $('.tb-cart-scroll').mCustomScrollbar();
        $('.tb-pincode-input').keypress(function (e) {
           var key = e.which;
           if(key == 13)  // the enter key code
            {
            e.preventDefault();
            var currentVal=$(this).val();
                $('.tb-pincode-input').val(currentVal);
               $('.tb-pincode-go').trigger('click');
            }
        });

         //by designer for faq
     $('.rental-faq-header').click(function() {  
   var $CO, $CP, $CH, $AS;
   $CO = $('#scrollToFaqContent .rental-faq-list').offset().top;
   $CP = $(this).closest('li').index();
   $CH = $(this).closest('li').outerHeight();
   $AS = $CO + parseInt($CP + $CH) - ($(this).outerHeight());
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $('.rental-faq-body').slideUp(300);
    } else {
      $('.rental-faq-header').removeClass('active');
      $(this).addClass('active');
      $('.rental-faq-body').slideUp(300);
      $(this).siblings('.rental-faq-body').slideDown(300, function(){
          $('html,body').animate({scrollTop: $AS}, 'slow');
      });
    }
  });


    });
  
}