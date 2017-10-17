function validateCustomer()
{
	var errors = 0;
	if($.trim($("#firstname").val()) == "")
	{
		$("#fnameError").css('display','block');
		errors = 1;
	} else 
	{
		var nameFilter = /^[a-zA-Z]*$/;
		var fname = $.trim($("#firstname").val());
		if(nameFilter.test(fname))
		{ 
			$("#fnameError").css('display','none');
		}else{
			$("#fnameError").css('display','block');
			errors = 1;
		}
	
	}
	
	if($.trim($("#lastname").val()) == "")
	{
		$("#lnameError").css('display','block');
		errors = 1;
	} else 
	{
		var nameFilter = /^[a-zA-Z]*$/;
		var fname = $.trim($("#lastname").val());
		if(nameFilter.test(fname))
		{ 
			$("#lnameError").css('display','none');
		}else{
			$("#lnameError").css('display','block');
			errors = 1;
		}
	
	}
	
	if($.trim($("#mobile").val()) == "")
	{
		$("#mobileError").css('display','block');
		errors = 1;
	} else 
	{
		var numberFilter = /^[0-9]+$/;
		var fname = $.trim($("#mobile").val());
		if(numberFilter.test(fname))
		{ 
			$("#mobileError").css('display','none');
		}else{
			$("#mobileError").css('display','block');
			errors = 1;
		}
	
	}
	
	if($.trim($("#email").val()) == "")
	{  	
		$("#emailError").css('display','block');
		errors = 1;
	} else {
		var filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		var emailValue = $.trim($("#email").val());
		if(filter.test(emailValue) != true)
		{ 
			$("#emailError").css('display','block');
			errors = 1;
		}else
		{ 
			$("#emailError").css('display','none');
			errors = 0;
		}
	}
	
	
	
	if($.trim($("#password").val()) == "")
	{
		$("#passwordError").css('display','block');
		errors = 1;
	} else 
	{
		$("#passwordError").css('display','none');
	}
	
	if(errors == 0)
	{
		return true;
	} else {	
		return false;
	}	
	
}

function validateEditCustomer()
{
	var errors = 0;
	if($.trim($("#firstname").val()) == "")
	{
		$("#fnameError").css('display','block');
		errors = 1;
	} else 
	{
		var nameFilter = /^[a-zA-Z]*$/;
		var fname = $.trim($("#firstname").val());
		if(nameFilter.test(fname))
		{ 
			$("#fnameError").css('display','none');
		}else{
			$("#fnameError").css('display','block');
			errors = 1;
		}
	
	}
	
	if($.trim($("#lastname").val()) == "")
	{
		$("#lnameError").css('display','block');
		errors = 1;
	} else 
	{
		var nameFilter = /^[a-zA-Z]*$/;
		var fname = $.trim($("#lastname").val());
		if(nameFilter.test(fname))
		{ 
			$("#lnameError").css('display','none');
		}else{
			$("#lnameError").css('display','block');
			errors = 1;
		}
	
	}
	
	if($.trim($("#mobile").val()) == "")
	{
		$("#mobileError").css('display','block');
		errors = 1;
	} else 
	{
		var numberFilter = /^[0-9]+$/;
		var fname = $.trim($("#mobile").val());
		if(numberFilter.test(fname))
		{ 
			$("#mobileError").css('display','none');
		}else{
			$("#mobileError").css('display','block');
			errors = 1;
		}
	
	}
	
	if($.trim($("#email").val()) == "")
	{  	
		$("#emailError").css('display','block');
		errors = 1;
	} else {
		var filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		var emailValue = $.trim($("#email").val());
		if(filter.test(emailValue) != true)
		{ 
			$("#emailError").css('display','block');
			errors = 1;
		}else
		{ 
			$("#emailError").css('display','none');
			errors = 0;
		}
	}
	

	if(errors == 0)
	{
		return true;
	} else {	
		return false;
	}	
	
}

$("#limit").live("change",function()
		{
		    $("#submit").trigger("click");
		});
$("#search").live("click",function()
		{
			$("#submit").trigger("click");
		});
		
	$(".paging").live("click",function()
		{
			var page = $(this).attr('rel');
			$("#pageview").val(page);
			$("#page").val(page);
			$("#submit").trigger("click");
		});
	$(".sort").live("click",function()
		{
			var sort=$("#order_by").val();
			var arr=sort.split(" ");
			var name = $(this).attr('rel');
			var order='';
			if(sort!='')
			{
				if(name==sort)
				{
					if(arr[1]=='desc')
						order='asc';
					else
						order='desc';

					var order_by=arr[0]+' '+order;
				}
				else
					var order_by=name;
			}
			else
				var order_by=name;

			$("#order_by").val(order_by);
			$("#submit").trigger("click");
		});
		
	$(".detail_td").click(function(){ 
	        window.location = $(this).attr('href');
	        return false;
	    });
	$("#sort input").keydown(function(e) {
	    if (e.keyCode == 13) {
	        $("#submit").trigger("click");
	    }
	});

	$("#exportTo").click(function(){
			$("#submit").trigger("click");
	});

	$("#selectAll").click(function(){
		$('.customer').attr('checked','checked');
		var ChackedEmails = $(":checkbox:checked").length;
		$("#selectCount").html("| "+ChackedEmails+" customer(s) selected.");
	});

	$("#unselectAll").click(function(){
		$('.customer').removeAttr('checked');
		$("#selectCount").html("");
	}); 

	$("#goNewCustomer").click(function(){ 
		window.location.href = site_url+"customer/newcustomer";
	});


$("#newCustomer").live("click", function(){ window.location.href = site_url+"bcustomer/add";
});

$("#reset").live("click", function(){ location.reload();
}); 

$('#submit').live('click',function(event)
		{
				
				var searchIDs = $("input:checkbox:checked").map(function(){
		        return this.value;
				}).toArray();	
				
				if($("#export-select").val() == "csv"){
					var email = $.trim($("#emailId").val());
					var errors = 0;
					if(email == "")
					{  	
						$("#emailId").css('border', 'solid 1px red');
						errors = 1;
					} else {
						var filter = /^[a-zA-Z0-9._-]+@([0-9a-z][0-9a-z.-]+\.)+[a-zA-Z]{2,4}$/i;
						
						if(filter.test(email) != true)
						{ 
							$("#emailId").css('border', 'solid 1px red');
							errors = 1;
						}else
						{ 
							$("#emailId").css('border', '');
							errors = 0;
						}
					}
					if(errors == 0){
						var obj = $('#myFrom').serializeArray();
						window.location.href = site_url+"customer_feedback/exportTo?"+$.param(obj);
					}else {
						return false;
					}
					
				} else {			
				
					var path = site_url+"customer_feedback/ajax_feedback"; 
					
					$('#loading_img').html('<img src="../../img/ajax-loader.gif" alt="loading..."></img>');
					$.ajax({
						type: 'POST',
						url: path,
						data:$('#myFrom').serializeArray(),
						//data: values1,
						async: false,
						success: function(resulthtml)
						{
							var data = $.parseJSON( resulthtml );
							if(data != null){
								if(data.tbody_data != ''){ 
									$('#pager').html(data.pagination);
									$('#tbody_data').html("");
									$('#tbody_data').html(data.tbody_data);
									event.preventDefault();
									
								}
							} else {
								$('#tbody_data').html("No recoeds found");
								event.preventDefault();
							}
							
							
						},
						error: function(message)
						{
							alert('error');
						}
					});
					$('#loading_img').html('');
				}
				
				});
