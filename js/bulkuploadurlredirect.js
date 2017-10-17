$(document).ready(function(){
	
	$('#check-data').click(function(){
		
		var formData = new FormData($('#bulkupload_url_redirect')[0]);
		if(($('#error').length == 0) && (file != ""))
		{	
			$.ajax({		    	
			        url: root_url+"/miscscript_bulkuploadurlredirect/index",
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
	
        
        $('#del-check-data').click(function(){
		
		var formData = new FormData($('#delete_url_redirect')[0]);
		if(($('#error').length == 0) && (file != ""))
		{	
			$.ajax({		    	
			        url: root_url+"/miscscript_bulkuploadurlredirect/delete_url",
					type: "POST",		   
					contentType:false,
					processData: false,
					cache: false,
					data: formData,
					beforeSend: function(){
                                            $('#del-check-data').val('Checking....');
                                        },
					success: function(data){
						
						if(data == 'success')
						{	 
                                                    $('#del-check-data').css('display','none');
                                                    $('#del-save-data').css('display','block');
                                                    $('input[type="file"]').attr('disabled','disabled');
                                                    $('#errormsg').html("<span style='color:grey;'>Check data done successfully.</span>");
						}
						else
                                                {	
                                                    var json_obj = $.parseJSON(data);
                                                    if( typeof json_obj['error'] != 'undefined')
                                                    {
                                                        $('#errormsg').html("<span>"+json_obj['error']+"</span>");
                                                        $('#del-check-data').val('Check Data');
                                                    }
                                                }
                                        }
				});
		}
		
	});
	
	$('#del-save-data').click(function(){
		 
		$('input[type="file"]').removeAttr('disabled');
	});
        
});