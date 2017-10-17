var PF = PF || {};

if( typeof PF.CONTACTPAGE === 'undefined' ) {
	(function (a, $) {
		var utils = a.UTILITIES;

		var x = {
                    init : function(){
                       if (orderId==''){
                          $('#frm_additionalDetail').hide();
                           $('#successMsg').html("Invalid Link!!").show();
                       }else{
                        $('#firstName').html(firstName);
                        $('.orderId').html(orderId);
                        }
                       $(utils.d).on('click', "#feedback_yes", function () {
                            $('#frm_additionalDetail').show();
                            $('.escalation_msg_2nd').hide();
                        });
                        $(utils.d).on('click', "#feedback_no", function () {
                             $('.escalation_msg_2nd_thankyou').show();
                             $('.escalation_msg_2nd_init, .escalation2_btn_wrap').hide();
                        });   
                        
                       if(noOfAttempt>=2){
                           $('#counter').html(noOfAttempt);
                            $('#frm_additionalDetail').hide();
                            $('#attemptEcced').show();
                           
                        }
                        if(noOfAttempt==1){
                           $('#frm_additionalDetail').hide();
                           $('.escalation_msg_2nd').show();
                          }
                        $(utils.d).on('click','#additonalDetail_submit',function(){
                               $('.error-text').hide(); 
                               var error=false;  
                               if($("#file_1").val()==''){
                                   $("#invalid_size").html('required*').show();
                                   error=true;
                               }
                               if($("#feedback").val()==''){
                                   $("#feedback").parents().siblings('.error-text').show();
                                    error=true;
                               }
                                if(!error){
                                 x.newComplaint();   
                                }else{
                                    return false;
                                }
                                
                        });
                        
                        
                        $('.fileuploadfeedback').on('change',function(){
                            var currentId = $(this).attr('myattr');
                            var type = $('#file_'+currentId)[0].files[0].name.split('.').pop().toLowerCase();
                            var size = $('#file_'+currentId)[0].files[0].size;
                            $('#additonalDetail_submit').attr('disabled', 'disabled');
                            $('#additonalDetail_submit').addClass('disabled');
                            $('#additonalDetail_submit').val('Uploading...');
                            switch (type) {
                                case 'doc': 
                                case 'docx': 
                                case 'jpg':
                                case 'jpeg': 
                                case 'png': 
                                case 'bmp':
                                case 'pdf':
                                    $('#invalid_size').html('');
                                    if(size<=1049576*5){
                                        $('#invalid_size').html('');
                                        $('#invalid_file').css('color','#c7c7c7');
                                        x.getDataFeedback(type,currentId);
                                        $('#feddback_file_'+currentId).removeClass('add-link');
                                        
                                    } else{
                                        $('#invalid_size').html('Max 5Mb allowed!').show();
                                          document.getElementById("file_1").value = "";
                                          $('#additonalDetail_submit').removeAttr('disabled');
                                          $('#additonalDetail_submit').removeClass('disabled');
                                          $('#additonalDetail_submit').val('Submit');
                                        return false;
                                    }
                                    break;
                                default:
                                    $('#invalid_file').css('color','red');
                                    $('#invalid_size').html('Please select valid file');
                                   $('#additonalDetail_submit').val('Submit');
                                    //$('#feddback_file_'+currentId).html($('#file_'+currentId).val().replace(/C:\\fakepath\\/i, ''));
                                    return false;
                            }
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
                        // ajax used for validating 1st bracket attribute//
                         var path=root_url+"/site_escalation/additionalDetailCheck";
                            //var formData = new FormData($('#frm_feedback')[0]);
                            var formData = $('#frm_additionalDetail').serialize();
                            formData+='&getData='+getData;
                            var _ajaxSetUpOptions = {
                                //contentType : false,
                                processData : false,
                                cache : false
                            };
                            var _beforeSend = function () {
                                    PF.HEADER.addBlueButtonLoader('frm_feedback');
                                    $('#invalid_file').css('color','#c7c7c7');
                            };
                            utils.makeRequest( path, 'POST', formData, x.feedbackResponse, x.handleError, _beforeSend, '', _ajaxSetUpOptions );
                        
                    },
                    feedbackResponse : function(data){
                         var json_obj;	 
                            try {	 
                               json_obj = $.parseJSON(data);	 
                            } catch(e) {	 
                              json_obj = data;	 
                            }
                        if(json_obj.status == "success")
                        {	
                                $('#frm_additionalDetail').hide();
                                $('.escalation_msg_2nd').show();
                                 $('.escalation_msg_2nd_thankyou').html('Thank you for submitting document.').show();
                                $('.escalation_msg_2nd_init, .escalation2_btn_wrap').hide();
                                
                        }
                        else
                        { 
                            $.each(json_obj, function(key,value) {
                               $('#feedbackMsg').html();
                               // $('#error').css({'display':'block','font-size':'15px'}).addClass('error-text');
                                $('#feedbackMsg').html(value+"<br/>");
                           });
                        }
                    },
                    getDataFeedback : function(type,currentId){
                        if(typeof(currentId)=='undefined'){
                            currentId='';
                        }
                        var i =1;
                        var loaded = 0;
                        var step = 1048576;
                        var total =$('#file_'+currentId)[0].files[0].size;
                        var totalRequest = 5;//Math.ceil(total/step);
                        var start = 0;
                        var name = encodeURIComponent( $('#file_'+currentId)[0].files[0].name );
                        var randName = Math.random().toString(36).substr(2, 30);
                        var parts = name.split(".");
                        var fileNameWA = parts[0];
                        name = encodeURIComponent( fileNameWA+randName+"."+type );
                        var resFlag = 1;
                        var uploaded = document.getElementById('feddback_file_'+currentId);

                        var reader = new FileReader();

                        reader.onload = function(e){
                                var xhr = new XMLHttpRequest();
                                var upload = xhr.upload;
                                xhr.onreadystatechange = function() {
                                        // if( xhr.readyState == XMLHttpRequest.DONE ) {
                                        if( this.readyState == 4 && this.status == 200 ) {
                                                var fileRes = xhr.responseText;
                                                fileRes ='';
                                                if (fileRes === "invalid_file" && resFlag === 1)
                                                {
                                                    alert("Invalid image file!");
                                                    $('#invalid_size').html('Invalid image file!');
                                                    $('#feddback_file_'+currentId).html('Choose File');
                                                    $('#additonalDetail_submit').removeAttr('disabled');
                                                    $('#additonalDetail_submit').removeClass('disabled');
                                                    $('#additonalDetail_submit').val('Submit');
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
                                                        $('#additonalDetail_submit').removeAttr('disabled');
                                                        $('#additonalDetail_submit').removeClass('disabled');
                                                        $('#additonalDetail_submit').val('Submit');
                                                        xhr.abort();
                                                        resFlag = 0;
                                                        loaded=total*100;
                                                        return;
                                                    }
                                                }
                                                
                                                if(loaded >= total){
                                                    $('#additonalDetail_submit').removeAttr('disabled');
                                                    $('#additonalDetail_submit').removeClass('disabled');
                                                    $('#additonalDetail_submit').val('Submit');
                                                    if(resFlag){
                                                        $('#feddback_file_'+currentId).html($('#file_'+currentId).val().replace(/C:\\fakepath\\/i, ''));
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
        						uploaded.innerHTML = 'Please Wait....('+Math.floor(_p)+')%';
//        						uploaded.style.width = _p+'%';
//        						uploaded.style.backgroundColor = 'lightgreen';

                                        if(loaded <= total){
                                                blob = $('#file_'+currentId)[0].files[0].slice(loaded,loaded+step);

                                                reader.readAsBinaryString(blob,x.log);
                                                $('#additonalDetail_submit').attr('disabled', 'disabled');
                                                $('#additonalDetail_submit').addClass('disabled');
                                                $('#additonalDetail_submit').val('Uploading...');
                                                
                                        }else{
                                                loaded = total;
                                        }
                                },false);
                                //console.log(totalRequest);
                                //console.log(++i);
                                if(resFlag){
                                    xhr.open("POST", root_url+"/site_escalation/feedbackFileUpload?fileName="+name+"&fileType="+type+"&fileSize="+total+"&nocache="+new Date().getTime()+"&totalRequest="+totalRequest+"&currentId="+currentId+"&pageFrom=additionalDetail"+"&count="+i++);
                                    xhr.overrideMimeType("application/octet-stream");                                
                                    xhr.sendAsBinary(e.target.result);
                                }
                        };

                        var blob = $('#file_'+currentId)[0].files[0].slice(start,step);
                        reader.readAsBinaryString(blob,x.log);
                    },
                    log : function(e){
                       // console.log(e);
                    }

                };

		a.CONTACTPAGE = x;
	})( PF, $ );
        
        $(document).ready(function () {
		PF.CONTACTPAGE.init();
	});

}