
$(document).ready(function(){
	
	$('.order_td').click(function(){
		var $par = $(this).parent();
		window.location = $($par).attr('title');
        //return false;
    });
	
	$(".paging").click(function()
	{
		var page = $(this).attr('rel');
		$("#pageview").val(page);
		$("#submit").trigger("click");
	});
	
	/*$("#export").click(function()
	{
		$("#submit").val('Export');
		$("#submit").trigger("click");
		$("#submit").val('Submit');
	});*/

	$("#limit").change(function()
	{
		$("#submit").trigger("click");
	});

	$(".sort").click(function()
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

	$("#inputid").keypress(function(event)
	{
			return numeric(event);
	});

	$("#selectAll").click(function()
	{
		$('.brandid_cb').attr('checked','checked');
	});
	
	$("#unselectAll").click(function()
	{
		$('.brandid_cb').removeAttr('checked');
	});

	$(".select").click(function(){
		//alert('Hi');
		//sales_order
		var id=$(this).attr('rel');
		$('.sales_order').css('display','none');
		$('#'+id).css('display','block');
	});

	
	


	// js for ajax grid for customer  start


	$(".paging").live('click',function()
	{
		//alert('hi');
		var page=$(this).attr('rel');
		$("#pageview").val(page);
		$("#page").val(page);
		$("#cust_submit").trigger("click");
	});

	$("#limit").live('change',function()
	{
		$("#cust_submit").trigger("click");
	});
	// js for ajax grid for customer end

	$('.cust_tr').live('click',function(){
		var cust_id=this.id;
		$('#cust_id').val(cust_id);
		$('#order_customer_selector').css('display','none');
		$('#order_store_selector').css('display','block');
	});

	$('#new_cust').live('click',function(){
		$('#order_customer_selector').css('display','none');
		$('#order_store_selector').css('display','block');
	});

	$('.store').live('click',function(){
		var store_id=$(this).val();
		var cust_id=$('#cust_id').val();
		$('#store_id').val(store_id);
		$('#order_store_selector').css('display','none');
		$('#order_data').css('display','block');
		
	});

	$('#show_prod').live('click',function(){
		$('#order_items').css('display','none');
		$('#order_product_item').css('display','block');
		
	});

	$('#add_prod').live('click',function(){
		$('#order_product_item').css('display','none');
		$('#order_items').css('display','block');
	});

	// js for ajax grid for product start
	$('#prod_submit').live('click',function(){
		//alert('hi');
		//return false;
		$.trim($("#prod_entity_id").val());
		var page=$('#prod_page').val();
		var limit=$('#prod_limit').val();
		var prod_entity_id=$.trim($("#prod_entity_id").val());
		var prod_name=$.trim($("#prod_name").val());
		var prod_sku=$.trim($("#prod_sku").val());
		var prod_price=$.trim($("#prod_price").val());
		var prod_name_attr=$('#prod_name_attr').val();
		var prod_price_attr=$('#prod_price_attr').val();
		var prod_sprice_attr=$('#prod_sprice_attr').val();
		var prod_status_attr=$('#prod_status_attr').val();
		var prod_order_by=$('#prod_order_by').val();
		//var pageview=$("#pageview").val();
		//alert(page + limit + entity_id + name);
		//return false;
		$('#loading_img').html('<img src="../../img/ajax-loader.gif" alt="loading..."></img>');
		$.ajax({
			type: 'POST',
			url: 'postProduct',
			data: {page:page,limit:limit,prod_entity_id:prod_entity_id,prod_name:prod_name,prod_sku:prod_sku,prod_price:prod_price,prod_name_attr:prod_name_attr,prod_price_attr:prod_price_attr,prod_sprice_attr:prod_sprice_attr, prod_status_attr:prod_status_attr,prod_order_by:prod_order_by},
			async: false,
			success: function(resulthtml)
			{
				//alert('success');
				$('#productGrid').html(resulthtml);
			},
			error: function(message)
			{
				alert('error');
			}
		});
		$('#loading_img').html('');
	});

	$(".prod_paging").live('click',function()
	{
		//alert('hi');
		//return false;
		var page=$(this).attr('rel');
		$("#prod_pageview").val(page);
		$("#prod_page").val(page);
		$("#prod_submit").trigger("click");
	});

	$("#prod_limit").live('change',function()
	{
		//alert('hi');
		//return false;
		$("#prod_submit").trigger("click");
	});
	// js for ajax grid for product end

	//js for order status start

	//js for order status end
   
   
   $('#payment_limit_time').datetimepicker({
	"dateFormat":"yy-mm-dd",
	changeMonth: true,
	   changeYear: true,
	   minDate: "0D",
	   controlType: 'select',
	timeFormat: "hh:mm tt"
	});

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   

	
});

function numeric(evt)
 {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (charCode == 8 || charCode == 43 || ( charCode>=48 && charCode<=57)) {
        //if (charCode == 8 || charCode==39 || charCode==95 || (charCode>=65 && charCode<=90) || (charCode>=97 && charCode<=122)) {
        return true;
        }
        else {
            return false;
        }
}
if ($(".iframe").is('*') ) {
	$('.iframe').fancybox({
	    'width': '1200px',
	    'height': '2800px',
	    'autoDimensions' : false, 
	    'autoScale': false,
	    'transitionIn': 'fade',
	    'transitionOut': 'fade',
	    'type': 'iframe',
	    //'href': 'http://www.example.com'
	});
}



function validatehistory()
{
	if(document.getElementById('history_status').value=='')
	{
		alert('Please select status');
		return false;
	}
	else if(document.getElementById('history_comment').value=='')
	{
		alert('Please enter comment');
		return false;
	}
	else
	{
		path = site_url+"/auctions_auctionlist/SaveComment"; 
		var productauction_id =document.getElementById('productauction_id').value;
		var history_status =document.getElementById('history_status').value;
		var history_comment =document.getElementById('history_comment').value;
	
		
		
			$.ajax({url: path,
					data:{productauction_id:productauction_id,history_status:history_status,history_comment:history_comment},
					type: "POST",
					success: function(data){
						//alert(data);
						if(data == "success"){
							//parent.$.fancybox.close();
							parent.location.reload();
						}else
						{
							alert(data);
						}
					},
					error: function(x,y,z){
						alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
					}
				});

	}
}

$('#auction').submit(function(){
	
	var serizeform   = $('#auction').serialize();
	var history_status = $('#history_status').val();
	var auction_comment_text = $('#auction_comment_text').val();
	var topbidder = $('#topbidder').val();
	var action_chnage = $('#action_chnage').val();
	var payment_limit_time = $('#payment_limit_time').val();
	/*var fCode = document.forms[].elements["shipment[item]"];
	alert(fCode);
	for ( i = 0; i < fCode.length; i++ ){
        if ( fCode[i].value == "" ) {
            alert("Please choose product code");
           // fCode[i].focus();
            return false;
        }
		
    }*/
	
	$('#submit').val('Please wait.......');
	document.getElementById('submit').disabled=true;
	
	if(auction_comment_text == ''){
		
		$('#interaction').html('<label style="color:red;">Validation errors : <br/> (X) Please Enter Comment.</label>').show().fadeOut(8000);
		$('#submit').val('Update');
		document.getElementById('submit').disabled=false;
		return false;
		
	}
	
	if(action_chnage !=''){
       
	   if(action_chnage=='Extend Time Line' && document.getElementById('payment_limit_time').value ==''){
	    		
		$('#interaction').html('<label style="color:red;">Validation errors : <br/> (X) Please Select Payment Limit Time.</label>').show().fadeOut(8000);
		$('#submit').val('Update');
		document.getElementById('submit').disabled=false;
		return false;
	   }
	   
	   if(action_chnage=='Cancel Customer Bid' && document.getElementById('cancelcustomer').value ==''){
	    		
		$('#interaction').html('<label style="color:red;">Validation errors : <br/> (X) Please Select customer.</label>').show().fadeOut(8000);
		$('#submit').val('Update');
		document.getElementById('submit').disabled=false;
		return false;
	   }
	   
	    if(action_chnage=='Second Offer' && document.getElementById('topbidder').value ==''){
	    		
		$('#interaction').html('<label style="color:red;">Validation errors : <br/> (X) Please Select Second Offer.</label>').show().fadeOut(8000);
		$('#submit').val('Update');
		document.getElementById('submit').disabled=false;
		return false;
	   }
		
	}
	
	
	if(history_status == ''){
		$('#interaction').html('<label style="color:red;">Validation errors : <br/> (X) Please Select Status.</label>').show().fadeOut(8000);
		$('#submit').val('Update');
		document.getElementById('submit').disabled=false;
		return false;
	}
	
	$('#loading_img').html('<img src="../../img/ajax-loader.gif" alt="loading..."></img>');
	post_ship = site_url+'/auctions_auctionlist/updateauctionStatus';
	$.post(post_ship, serizeform, function (data){
		
		data = $.trim(data);
		if( data == 'success'){		
			alert('success');
			parent.window.location.reload(true);
			ship.reset();
		}else{
			alert(data);
			$('#interaction').html(data).show().fadeOut(8000);
		}
		$('#loading_img').html('');
	});
	return false;
});

function disptopbidder()
{
	if(document.getElementById('action_chnage').value=='Second Offer')
	{
		document.getElementById('topbid').style.display='';
		document.getElementById('payment_limit').style.display='none';
		document.getElementById('payment_limit_time').value='';
		document.getElementById('cancelbid').style.display='none';
		document.getElementById('cancelcustomer').value='';
	}else if(document.getElementById('action_chnage').value=='Extend Time Line')
	{
		document.getElementById('topbid').style.display='none';
		document.getElementById('payment_limit').style.display='';
		document.getElementById('topbidder').value='';
		document.getElementById('cancelbid').style.display='none';
		document.getElementById('cancelcustomer').value='';
	}
	else if(document.getElementById('action_chnage').value=='Cancel Customer Bid')
	{
		document.getElementById('topbid').style.display='none';
		document.getElementById('payment_limit').style.display='none';
		document.getElementById('payment_limit_time').value='';
		document.getElementById('topbidder').value='';
		document.getElementById('cancelbid').style.display='';
		
		
	}
	else
	{
		document.getElementById('topbid').style.display='none';
		document.getElementById('payment_limit').style.display='none';
		document.getElementById('payment_limit_time').value='';
		document.getElementById('topbidder').value='';
		document.getElementById('cancelbid').style.display='none';
		document.getElementById('cancelcustomer').value='';
		
	}
}


