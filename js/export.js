

function loginValidation(){ 
	var form_id = "export_form";
	$errors = 0;
	if($.trim($("#"+form_id+" #emailid").val()) == "")
	{  	
		$("#"+form_id+" #email_Error").css('display','block');
		errors = 1;
	} else {
		var filter = /^[a-zA-Z0-9._-]+@([0-9a-z][0-9a-z.-]+\.)+[a-zA-Z]{2,4}$/i;
		var emailValue = $.trim($("#"+form_id+" #emailid").val());
		if(filter.test(emailValue) != true)
		{ 
			$("#"+form_id+" #email_Error").css('display','block');
			errors = 1;
		}else
		{ 
			$("#"+form_id+"  #email_Error").css('display','none');
			errors = 0;
		}
	}
	
	if($.trim($("#"+form_id+" #password").val()) == "")
	{  	
		$("#"+form_id+" #passwordError").css('display','block');
		errors = 1;
	} else 
	{
		$("#"+form_id+" #passwordError").css('display','none');
	}
	
	if(errors == 0)
	{ 
		this.login_submit(form_id); //call for ajax submit
        
	} else 
	{
		return false;
	}	
}

function login_submit(form_id)
{ 
	var path = root_url+"/export/authenticate?ref=" + $current;
	
	$.ajax({ 
		url: path,
		data:$("#"+form_id).serialize(),
		dataType:"json",
	    type: "POST",
		beforeSend : function(x){
        	$("#login-form #login_error").html('<center><image src="'+root_url+'/media/image/opc-ajax-loader.gif"/></center>');
        },
        success: function(data){        	
        	if(is_object(data)) {
        		$.each( data, function( key, value ) {
        			//alert( key + ": " + value );
        			$("#"+form_id+" span#"+key).html(value);
        			$("#"+form_id+"login-form #login_error").html('');
        		});
        	} else if(data == "success") {
        		$("#"+form_id+" #login_error").html(""); 
        		window.location.href = root_url;
        	}else if(data == "login_error") {
        		$("#"+form_id+" #login_error").html("Invalid login or password"); 
        	}        	
        },
        error: function(data){
        	return false;
        }
	});
}

function is_object (mixed_var)
{
	if (Object.prototype.toString.call(mixed_var) === '[object Array]')
	{
		return false;
	}
	return mixed_var !== null && typeof mixed_var === 'object';
}

function setShortlist(product_id, qty, redirect_callback, configure, prod_crum,buy_now){
	//comment
	//$('#load-cart-'+product_id).show();
	//$('#load-cart-a-'+product_id).hide();
	if(typeof(qty)==='undefined') {
		qty = 1;
	}else{
		//post data
	}
	if(typeof(redirect_callback)==='undefined') {
		redirect_callback = '';
	}
	if(typeof(configure)==='undefined') {
		configure = 0;
	}
	//alert(prod_crum);
	params = {};
	params['crumb']=prod_crum;

	if(typeof(buy_now)!='undefined' && buy_now==1) {
		params['buy_now']=1;
	}
	
	$.ajax({
		url:root_url+'/cart/add',
		type:'POST',
		data:{product_id:product_id,qty:qty,params:params},
		success: function (data){
			//alert(data);
			if($.isNumeric(data))
			{
				if(data == '0')
				{
					alert('Out Of Stock');
				}
				else
				{
					alert('You can add max '+data+' quantity for this product');
				}
			}
			else
			{	
				//parent.$.fancybox.close();
				$('.transparent_bg').hide();
				$('.quick_look').html('');
				$('#parent').html(data);					
				//alert(redirect_callback);
				if(!redirect_callback){
					$("#item_info").addClass("selected");
					$('#cart_popup').show();
				}
				
				
				//document.getElementById("cart_popup").style.display="block";
				//$("html, body").animate({ scrollTop: 0 }, "slow");
				$(window).scrollTop(0);
				//$('#message_added').show();
				$("#message_added").show().delay(3000).fadeOut('slow');

				 if(redirect_callback != ''){						 
					 window[redirect_callback]();
				 }					 
				 return false;				
			}
		},
		error : function(){
			alert('Try later.');
		}
	});
	//$('#load-cart-'+product_id).hide();
	//$('#load-cart-a-'+product_id).show();
}