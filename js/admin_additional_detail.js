 $(document).ready(function(){
       $("#submitAdditionForm").click(function(){
           var ObjArr =  $('#addtionalDetailsForm [validate="1"]');
           $("#addtionalDetailsForm .error").hide();
           var error=false;   
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            $(ObjArr).each(function(){
                //   reg.test(email) == false
                 var nameAttr=$(this).attr('name');
                 if(nameAttr=='emailId'){
                     email=$(this).val();
                     if(email=='' || reg.test(email) == false){
                         error=true;
                        $(this).siblings('.error').css( "display", "block" ); 
                     }
                 }else if($(this).val()==''){  
                    error=true;
                    $(this).siblings('.error').css( "display", "block" );
                }
               });
               if(!error){
                  //send mail to user for ertra detail
                   $.ajax({
                        type:'POST',   
                        url:root_url+'/customer/additionalDetail',
                        data: $("#addtionalDetailsForm").serialize(),
                        dataType:"json",
                        beforeSend: function() {
                            //add loader here
                             $('#submitAdditionForm').prop('disabled', true);
                        },
                        success: function(data) {
                            $('.serverError').show();
                           // $('.serverError').html(data.value).addClass("errornew assignbox").fadeOut(3000);
                            $('.serverError').html(data.value).addClass("errornew assignbox");
                        },
                        complete: function(){
                            //hide loader
                            $('#submitAdditionForm').prop('disabled', false);
                             $('#addtionalDetailsForm')[0].reset();
                        }
                    });
               }
       });
       
       /*
       * @purpose:auto populate Reasons  on behalf of Department change 
       * @author:chandan kumar
        */
       $("#departmentId").change(function(){
            var department=$(this).val();   
           if( department !=''){
               var departmentArr=$('#departmentArr').val();
             var reasonsArr=$.parseJSON(departmentArr);
             $('#deparmentResopn option[value!=""]').remove();
             $.each(reasonsArr[department], function(i, item) {
               $("#deparmentResopn").append('<option value="' +item+ '">' +item+ '</option>');
            });
           }else{
              $('#deparmentResopn option[value!=""]').remove();  
           }

       });
       
       /*
       * @purpose:auto populate email address on behalf of order id 
       * @author:chandan kumar
        */
       
       $("#orderId").focusout(function(){
          var currentObj=$(this);
          var orderId=$(this).val();
          if(orderId!=''){
            $.ajax({
                  type:'POST',   
                  url:root_url+'/customer/getBookingEmail/',
                  data: {'orderId':orderId},
                  dataType:"json",
                  success: function(data) {
                      if(data.status=='success'){
                           $('input[name="emailId"]').val(data.value);
                           currentObj.siblings('.error').css( "display", "none" );
                      }else{
                         currentObj.siblings('.error').css( "display", "block" );  
                      }
                  }


                  });
            }
                
       });
       $('#clearAdditionForm').click(function(){
            $('#addtionalDetailsForm')[0].reset();
       })
        
    });