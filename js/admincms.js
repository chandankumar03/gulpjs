function blockValidation()
{
	var errors = 0;
	var title = $.trim($("#title").val());
	var identifier = $.trim($("#identifier").val());
	var block_store_id = $.trim($("#block_store_id").val());
	var content = $.trim($("#content").val());
			
	if(title == "")
	{
		$("#titleError").css('display','block');
		errors = 1;
	}else
	{
		$("#titleError").css('display','none');
	}
	
	if(identifier == "")
	{
		$("#identifierError").css('display','block');
		errors = 1;
	}else
	{
		$("#identifierError").css('display','none');
	}
			
	if(block_store_id == "")
	{
		$("#storeError").css('display','block');
		errors = 1;
	}else
	{
		$("#storeError").css('display','none');
	}
	
	if(content == "")
	{
		$("#contentError").css('display','block');
		errors = 1;
	}else
	{
		$("#contentError").css('display','none');
	}
	
	if (errors == 1)
	{
		return false;
	}else
	{
		return true;	
	}
}

	
function cmsPageValidation()
{
	var page1errors = 0;
	var page2errors = 0;
	var pageTitle = $.trim($("#pageTitle").val());
	var pageUrl = $.trim($("#pageUrl").val());
	var status = $.trim($("#status").val());
	var content_heading = $.trim($("#content_heading").val());
	var content = $.trim($("#content").val());
	
	if(pageTitle == "")
	{
	 	$("#pageTitle").css('border', 'solid 1px red');
	 	page1errors  = 1;
	}else
	{
	 	$("#pageTitle").css('border', '');
	}
	
	if(pageUrl == "")
	{
	 	$("#pageUrl").css('border', 'solid 1px red');
	 	page1errors  = 1;
	}else
	{
	 	$("#pageUrl").css('border', '');
	}
	 	
	if(status == "")
	{
		$("#status").css('border', 'solid 1px red');
	 	page1errors  = 1;
	}else
	{
	 	$("#status").css('border', '');
	}
	
	if(content_heading == "")
	{
	 	$("#content_heading").css('border', 'solid 1px red');
	 	page2errors  = 1;
	}else
	{
	 	$("#content_heading").css('border', '');
	}
	 	
	if(content == "")
	{
	 	$("#content_tbl").css('border', 'solid 1px red');
	 	page2errors  = 1;
	}else
	{
	 	$("#content_tbl").css('border', '');
	}
	 	
	if(page2errors == 1)
	{
	 	$("#page_2_error").html("*");
	}else
	{
	 	$("#page_2_error").html("");
	}
	 	
	if(page1errors == 1)
	{
	 	$("#page_1_error").html("*");
	}else
	{
	 	$("#page_1_error").html("");
	}
	 	
	if (page1errors == 1 && page2errors == 1 || page1errors == 0 && page2errors == 1 || page1errors == 1 && page2errors == 0)
	{
	 	return false;
	}else{
	 	return true;	
	}
}
	 
	 //*================================================Template validation==============================*//
	 function templateValidation()
	 {
		
		var errors = 0;
		if($('#name').val() == "")
		{
		$('#name').css('border', 'solid 1px red');
		 errors = '1';
		
		}else{
		 $('#name').css('border', '');
		  errors = '0';
		 
		}
		
		if($('#subject').val() == "")
		{
		$('#subject').css('border', 'solid 1px red');
		 errors = '1';
		
		}else{
		 $('#subject').css('border', '');
		  errors = '0';
		 
		}
		
		if($('#content').val() == "")
		{
		$('#content').css('border', 'solid 1px red');
		 errors = '1';
		
		}else{
		 $('#content').css('border', '');
		  errors = '0';
		 
		}
		
		if(errors == 0 ){
		return true;
		} else {
		return false;
		}
		
		}
