$(function() {
    $("img.lazy").lazy();
});

function show_bid_history(auction_id){
	$('#auctionBox_'+auction_id).show();
}

function hideauction(id){
	$('#auctionBox_'+id).hide();
}

if($('#vip_countdown').length != 0){
	$('#vip_countdown').countdown({ until: sinceYear,  compact: true, timezone: -4});
}

$('#check_autobid').change(function(){
	if ($('#check_autobid').is(':checked')) {
	    $("#auto_hide").show();
	    $('#place_bid').val("");
	    $('#place_bid').attr("disabled", true)
	} else {
	    $("#auto_hide").hide();
	    $('#place_bid').attr("disabled", false)
	}
});

function auction_pay(product_id){
	var	qty = 1;	
	$.ajax({
		url:root_url+'/cart/add',
		type:'POST',
		data:{product_id:product_id,qty:qty},
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
				
				$(window).scrollTop(0);
				//$('#message_added').show();
				$("#message_added").show().delay(3000).fadeOut('slow');									 
				return false;				
			}
		},
		error : function(){
			alert('Try later.');
		}
	});
}

function auto_bid_help(){
	$('#auto_bid_help_box').show();
}
$('#bid_help').click(function(){
	$('#auto_bid_help_box').hide();
});
function place_bid(){
	resetUser(0);
	$("#loginBox").fadeIn(50);
	$("#login-form #emailid").focus();
}

function validate_bid(){
	$('.auction_error').remove();
	var bid_value     = parseInt($.trim($('#place_bid').val()));
	var next_bid_amnt = parseInt($.trim($('#next_bid_amnt').val()));
	var place_autobid = parseInt($.trim($('#place_autobid').val()));
	
	if((is_empty(bid_value) && is_empty(place_autobid)) || isNaN(bid_value) && isNaN(place_autobid)){		
		$('#js_error').after('<div class="auction_error error_div">Please enter a valid bid amount</div>');
		return false;
	}
	
	if(!isNaN(bid_value)){		
		if(bid_value < next_bid_amnt){
			$('#js_error').after('<div class="auction_error error_div">place a valid bid</div>');
			return false;
		}
	}
	if(!isNaN(place_autobid)){		
		if(place_autobid  < next_bid_amnt ){
			$('#js_error').after('<div class="auction_error error_div">Please enter a valid auto bid amount</div>');
			return false;
		}
	}
		
	document.getElementById("add_bid").submit();
}

function addto_watchlist(auction_id){
	if(auction_id != '' || auction_id > 0){
		$.ajax({
			url:'/auctions/add_watchlist/'+auction_id,
			success:function(data){
				data = $.trim(data);
				if(data == 'not login'){
					resetUser(0);
					$("#loginBox").fadeIn(50);
					$("#login-form #emailid").focus();
				}else{
					alert(data);
				}				
			},
			error:function(){
				alert('Please try  later.');
			}
		});
	}else{
		alert('Please try  later.');
	}
}


function remove_watchlist(auction_id){
	if(auction_id != '' || auction_id > 0){
		var responce = confirm('Are you sure?');
		if(responce == false)
		{	
			return false;
		} else {
			$.ajax({
				url:'/auctions/remove_watchlist/'+auction_id,
				success:function(data){
					data = $.trim(data);
					alert(data);
					location.reload();
				},
				error:function(){
					alert('Please try  later.');
				}
			});
		}
		
	}else{
		alert('Please try  later.');
	}
}

function is_numeric(value){
	var filter = /^[0-9]+$/;	
	if(filter.test(value)){		
		return true;
	}	
	return false;
}

function is_empty(value){	
	if(value == ''){
		return true;
	}
	return false;
}
	
