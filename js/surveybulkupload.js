$(document).ready(function(){
	
	$('#check-data').click(function(){
		
		var formData = new FormData($('#survey_question_upload')[0]);
		if(($('#error').length == 0) && (file != ""))
		{	
			$.ajax({		    	
			        url: root_url+"/miscscript_surveybulkupload/index",
                                type: "POST",		   
                                contentType:false,
                                processData: false,
                                cache: false,
                                data: formData,
                                beforeSend: function(){
                                    $('#check-data').val('Checking....');
                                },
                                success: function(data){
						
                                    var n = data.indexOf("DOCTYPE");
						
                                    if(n != -1)
                                    {	 
                                        $('#check-data').css('display','none');
                                        $('#save-data').css('display','block');
                                        $('input[type="file"]').attr('disabled','disabled');
                                        $('#errormsg').html("<span style='color:grey;'>Check data done successfully.</span>");
                                    }
                                    else
                                    {	
                                        var json_obj = $.parseJSON(data);
                                        if( typeof json_obj['error'] != 'undefined')
                                        {
                                            $('#errormsg').html("<span>"+json_obj['error']+"</span>");
                                            $('#check-data').val('Check Data');
                                        }
                                    }
                                }
                            });
		}
		
	});
	
	$('#save-data').click(function(){
		 
            $('input[type="file"]').removeAttr('disabled');
	});
   
        $('#upload_type').change(function(){
            if(this.value == 1){
                $('#question_note').show();
                $('#option_note').hide();
                $('#constraint_note').hide();               
            }
            else if(this.value == 2){
                $('#question_note').hide();
                $('#option_note').show();
                $('#constraint_note').hide(); 
            }
            else{
               $('#question_note').hide();
               $('#option_note').hide();
               $('#constraint_note').show(); 
            }
        });
});