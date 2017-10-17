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