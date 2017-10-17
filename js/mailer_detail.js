 $(document).ready(function(){
       $("#submitForm").click(function(){
           var ObjArr =  $('#MailerForm [validate="1"]');
           $("#MailerForm .error").hide();
           var error=false;   
            var reg = /^([A-Za-z0-9_\-\.])+\@pepperfry.com$/;
            var typeRef = /^[A-Za-z0-9_]+$/;
            $(ObjArr).each(function(){
                 var nameAttr=$(this).attr('name');
                 if(nameAttr=='emailId'){
                     email=$(this).val();
                     if(email=='' || reg.test(email) == false){
                         error=true;
                        $(this).siblings('.error').css( "display", "block" ); 
                     }
                 }else if(nameAttr=='type'){
                     mailType=$(this).val();
                     if(mailType==''){
                         error=true;
                        $(this).siblings('.error').html('Please enter  Mail Type').css( "display", "block" ); 
                     }else if(typeRef.test(mailType) == false){
                          error=true;
                        $(this).siblings('.error').html("Special character not allowed").css( "display", "block" );  
                     }
                 }else if($(this).val()==''){  
                    error=true;
                    $(this).siblings('.error').css( "display", "block" );
                }
               });
               if(!error){
                 $("#MailerForm .error").hide();
                 var onetimeCounte=true;
                var mailValidation=$('#MailerForm [data-type="mail"]');
               $(mailValidation).each(function(){
                   Temperror=false;
                   emailStr=$(this).val();
                   if(emailStr!=''){
                   var myArray = emailStr.split(',');
                   $.each(myArray , function(i, val) { 
                        if(reg.test(myArray[i]) == false){
                            Temperror=true;
                            if(onetimeCounte){
                                error=true;
                                onetimeCounte=false;
                            }
                            return false;
                        }
                    });
                    }
                    if(Temperror){
                      $(this).siblings('.error').html('Please enter valid Mail').css( "display", "block" );  
                    }
               });
             }
               if(!error){
                  //send mail to user for ertra detail
                   $.ajax({
                        type:'POST',   
                        url:root_url+'/miscscript_mailerdetail/mailerAddUpdate',
                        data: $("#MailerForm").serialize(),
                        dataType:"json",
                        beforeSend: function() {
                            //add loader here
                             $('#submitForm').prop('disabled', true);
                        },
                        success: function(data) {
                            
                            $('.serverError').show();
                           // $('.serverError').html(data.value).addClass("errornew assignbox").fadeOut(3000);
                            $('.serverError').html(data.msg).addClass("errornew assignbox");
                            if(data.status){
                          //  $('#MailerForm').find("input[type=text], textarea").val("");
                        }
                        },
                        complete: function(){
                            //hide loader
                            $('#submitForm').prop('disabled', false);
                             
                        }
                    });
               }
       });
       
     
       $('#clearForm').click(function(){
            $(this).closest('form').find("input[type=text], textarea").val("");
       });
        
    });