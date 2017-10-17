
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

	/*$(".updateQty").click(function(){
		var id=$(this).val();
		var orq=$("#orq"+id).val();
		var rfq=$("#rfq"+id).val();
		if(rfq > orq)
		{
			var name=$("#name"+id).val();
			alert("In valid Quantity For Refund Of "+name);
			//$("#rfq"+id).val(orq);
		}
		else
		{
			var subTotalAmount=$('#subTotal'+id).text();
			var discountAmount=$("#discountTotal"+id).text();
			var rowTotalAmount=$("#rowTotal"+id).text();

			//alert(subTotalAmount + '--' + discountAmount + '--' + rowTotalAmount);
			//return false;
			var price=$("#price"+id).val();
			var tax=$("#tax_amount"+id).val();
			var discount=$("#discount"+id).val();
			var subTotal=price * rfq;
			var discountTotal=discount * rfq;
			var taxAmount=tax * rfq;
			var row_total=(subTotal + taxAmount) - discountTotal;
			
			$("#subTotal"+id).text(Math.round(subTotal));
			$("#taxTotal"+id).text(Math.round(taxAmount));
			$("#discountTotal"+id).text(Math.round(discountTotal));
			$("#rowTotal"+id).text(Math.round(row_total));

			var orderSubTotal=$('#orderSubTotal').text();
			var orderDiscount=$('#orderDiscount').text();
			var orderGrandTotal=$('#orderGrandTotal').text();

			var calcSubTotal=(orderSubTotal - subTotalAmount) + subTotal;
			var calcDiscountTotal=(orderDiscount - discountAmount) + discountTotal;
			var calcGrandTotal=(orderGrandTotal - rowTotalAmount) + row_total;
			$("#orderSubTotal").text(Math.round(calcSubTotal));
			$("#orderDiscount").text(Math.round(calcDiscountTotal));
			$("#orderGrandTotal").text(Math.round(calcGrandTotal));
		}
	});*/
	

	$("#country").change(function()
	{
		var code=$(this).val();
		$.ajax({
			type: 'POST',
			url: '../getRegion',
			data: {code:code},
			dataType:"json",
			async: false,
			success: function(resulthtml)
			{
				//$('#region_id').append( new Option(' Please Select',''));
				if(resulthtml)
				{
					$('#region_id').css('display','block');
					$('#region').css('display','none');
					$("#region_id option").remove();
					$.each(resulthtml,function(my1,my2){
						$('#region_id').append( new Option(my2,my1) );
					});
				}
				else
				{
					$("#region_id option").remove();
					$('#region_id').css('display','none');
					$('#region').css('display','block');
				}
			},
			error: function(message)
			{
				$("#sub_cat option").remove();
				$('#sub_cat').append( new Option('No data',''));
			}
		});
	});

	// js for ajax grid for customer  start
	$('#cust_submit').live('click',function(){
		//alert('in cust submit');
		var page=$('#page').val();
		var limit=$('#limit').val();
		var entity_id=$('#entity_id').val();
		var name=$('#name').val();
		var email=$('#email').val();
		var mobile=$('#mobile').val();
		var signup_from=$('#signup_from').val();
		var firstname_attr=$('#fname_attr').val();
		var lastname_attr=$('#lname_attr').val();
		var mobile_attr=$('#mob_attr').val();
		var created_in_attr=$('#created_in_attr').val();
		var order_by=$('#order_by').val();
		//var pageview=$("#pageview").val();
		//alert(page + limit + entity_id + name + email + mobile + signup_from);
		$('#loading_img').html('<img src="../../img/ajax-loader.gif" alt="loading..."></img>');
		$.ajax({
			type: 'POST',
			url: 'postCustomer',
			data: {page:page,limit:limit,entity_id:entity_id,name:name,email:email,mobile:mobile,signup_from:signup_from,firstname_attr:firstname_attr, lastname_attr:lastname_attr,mobile_attr:mobile_attr,created_in_attr:created_in_attr,order_by:order_by},
			async: false,
			success: function(resulthtml)
			{
				$('#customer_grid').html(resulthtml);
			},
			error: function(message)
			{
				alert('error');
			}
		});
		$('#loading_img').html('');
	});

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

/**Creditmeno */
$('#credit').submit(function(){
	var serizeform   = $('#credit').serialize();
	$('#loading_img').html('<img src="../../img/ajax-loader.gif" alt="loading..."></img>');
	post_credit = site_url+'/sales_creditmemo/addCreditMemo';
	$.ajax({
		url:post_credit,
		data:serizeform,
		type:'POST',
		success : function(data){
			alert(data);
			parent.window.location.reload(true);
			credit.reset();
			$('#loading_img').html('');
		},
		error: function (data){
			$('#interaction').html(data).show().fadeOut(8000);
			$('#loading_img').html('');
		}
	});	
	return false;
	/*$.post(post_credit, serizeform, function (data){
		//alert(serizeform);
		data = $.trim(data);
		alert(data);
		if(data == 'success'){			
			parent.window.location.reload(true);
			credit.reset();
		}else{
			$('#interaction').html(data).show().fadeOut(8000);
		}
		$('#loading_img').html('');
	});*/
	
});

$("#select_orders").click(function(){ // created by Ashwani
	$orderIds = $("#orderIds").val();
	
	if($orderIds.length != 0){
		var ids = $orderIds.split("\n");
		$("#selectedIds").val($orderIds);
		for(var i = 0; i < ids.length; i++){
			$('#'+ids[i]).prop("checked", true);
		}
		$("#successMsg").css("display","block");
		$("#successMsg").html(ids.length+"items are selected");
		$('#submit').trigger('click');
		parent.$.fancybox.close();
	} else {
		parent.$.fancybox.close();
	}
	
	
});


function selectID(val)
{
	
	var val;
	var selectedID=document.getElementById('selectedIds').value;
	if(document.getElementById(val.id).checked==true)
	{
		if(document.getElementById('selectedIds').value=='')
		{
			$("#selectedIds").val(val.value);
		}else
		{
			document.getElementById('selectedIds').value=selectedID+'\n'+val.value;
		}
	}else
	{
		var currval=$('#selectedIds').val().replace(val.id,'');
		$('#selectedIds').val(currval);
	}
	var countsel=$.trim(document.getElementById('selectedIds').value).split("\n");
	if(countsel=='')
	{
		$("#successMsg").html("0 items are selected");
		document.getElementById('selectedIds').value='';
	}else
	{
		$("#successMsg").html(countsel.length+" items are selected");
	}
	$("#successMsg").css("display","block");
	
	
	
}


function credit_update_qty(){
	alert(1);
}


function cancleorder(OrderID)
{
	var OrderID;
	//alert(OrderID);
	//alert(site_url);
	//return false;
	if (confirm('Are you sure you want to cancel order?')) {
	path = site_url+"/sales_cancel/singleOrderCancel"; 
	var id =OrderID;
			$.ajax({url: path,
					data:{id:id},
					type: "POST",
					beforeSend : function(){
								$("#login_error").html('<center><image src="'+site_url+'/media/image/opc-ajax-loader.gif"/></center>');
								},
					success: function(data){
						data = $.trim( data );
						if(data == "success"){
							alert("Order canceled");
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

		
    // Save it!
	} else {
		// Do nothing!
		return false;
	}
}


function refundbycustomer(item_id,order_id)
{
	var item_id;
	var order_id;
	//alert(OrderID);
	//alert(site_url);
	//return false;
	if (confirm('Are you sure you want to customer return flagged?')) {
	path = site_url+"/sales_order/refundbycustomer"; 
	var id =item_id;
	var order_id =order_id;
			$.ajax({url: path,
					data:{id:id,order_id:order_id},
					type: "POST",
					beforeSend : function(){
								$("#login_error").html('<center><image src="'+site_url+'/media/image/opc-ajax-loader.gif"/></center>');
								},
					success: function(data){
							alert(data);
							//parent.$.fancybox.close();
							parent.location.reload();
						
					},
					error: function(x,y,z){
						alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
					}
				});

		
    // Save it!
	} else {
		// Do nothing!
		return false;
	}
}


//Modified by Chetan for hold/unhold functionality
function OnHold(OrderID)
{
	var OrderID;
	//alert(OrderID);
	//alert(site_url);
	//return false;
	if (confirm('Are you sure you want to hold order?')) {
		$('#submit').val('Please wait.......');
		document.getElementById('submit').disabled=true;
	path = site_url+"/sales_order/OnHold"; 
	var id =OrderID;
	var holdReason = $('#txt_hold_reason').val().trim();
			$.ajax({url: path,
					data:{id:id,holdReason:holdReason},
					type: "POST",
					beforeSend : function(){
								$("#login_error").html('<center><image src="'+site_url+'/media/image/opc-ajax-loader.gif"/></center>');
								},
					success: function(data){
						alert(data);
						if(data == "success"){
							//parent.$.fancybox.close();
							parent.location.reload();
						}
					},
					error: function(x,y,z){
						alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
					}
				});

		
    // Save it!
	} else {
		// Do nothing!
		return false;
	}
}



function VIPcustomer(OrderID,customertype)
{
	var OrderID;
	var customertype;
	
	//alert(OrderID);
	//alert(site_url);
	//return false;
	 if(customertype==1)
	 {
	    var msg="Are you sure you want to mark this as a VIP order?";
	 }else if(customertype==2)
	 {
		  var msg="Are you sure you want to mark this as a FRAUD order?";
	 }else
	 {
		  var msg="Are you sure you want to remove as a FRAUD order?";
	 }
	 if (confirm(msg))
	 {
	path = site_url+"/sales_order/MakeVIPcustomer"; 
	var id =OrderID;
			$.ajax({url: path,
					data:{id:id,customertype:customertype},
					type: "POST",
					beforeSend : function(){
								$("#login_error").html('<center><image src="'+site_url+'/media/image/opc-ajax-loader.gif"/></center>');
								},
					success: function(data){
						alert(data);
						if(data == "success"){
							//parent.$.fancybox.close();
							parent.location.reload();
						}
					},
					error: function(x,y,z){
						alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
					}
				});

		
    // Save it!
	} else {
		// Do nothing!
		return false;
	}
}

function sendfeedbackmail(OrderID,Flag)
{
	var OrderID;
        var email_sent_flag = Flag;
        if(email_sent_flag == 0){
            alert('Feedback has already been received for this order');
            return false;
        }else{
        	//Modified by Chetan for #13845 Resend NPS SMS
            var msg="Are you sure you want to resend feedback mail and sms?";
            if (confirm(msg))
            {
            path = site_url+"/miscscript_feedbackcron/checkshipment/"+OrderID; 
            var id =OrderID;
                            $.ajax({url: path,
                                            data:{id:id},
                                            type: "GET",
                                            beforeSend : function(){
                                                                    $("#login_error").html('<center><image src="'+site_url+'/media/image/opc-ajax-loader.gif"/></center>');
                                                                    },
                                            success: function(data){

                                                    if(data == "success"){
                                                            //parent.$.fancybox.close();
                                                            alert("NPS email and sms triggered to the user.");
                                                            parent.location.reload();
                                                    }
                                            },
                                            error: function(x,y,z){
                                                    alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
                                            }
                                    });
            } else {
                // Do nothing!
                return false;
            }
        }
}

//Modified by Chetan for hold/unhold functionality
function UnHold(OrderID)
{
	var OrderID;
	//alert(OrderID);
	//alert(site_url);
	//return false;
	if (confirm('Are you sure you want to unhold order?')) {
		$('#submit').val('Please wait.......');
		document.getElementById('submit').disabled=true;
	path = site_url+"/sales_order/UnHold"; 
	var id =OrderID;
			$.ajax({url: path,
					data:{id:id},
					type: "POST",
					beforeSend : function(){
								$("#login_error").html('<center><image src="'+site_url+'/media/image/opc-ajax-loader.gif"/></center>');
								},
					success: function(data){
						alert(data);
						if(data == "success"){
							//parent.$.fancybox.close();
							parent.location.reload();
						}
					},
					error: function(x,y,z){
						alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
					}
				});

		
    // Save it!
	} else {
		// Do nothing!
		return false;
	}
}

/*
 * Added function by Chetan to hold sku
 */
function HoldSku(ItemId){
	var skuId = $('#sku_'+ItemId).val().trim();
	var orderId = $('#order_id_'+ItemId).val().trim();
	var productId = $('#product_id_'+ItemId).val().trim();
	var entityId = $('#entity_id_'+ItemId).val().trim();
	var holdReason = $('#txt_hold_reason'+ItemId).val().trim();
	if (confirm('Are you sure you want to hold Order Sku?')){
		$('#submit'+ItemId).val('Please wait.......');
		document.getElementById('submit'+ItemId).disabled=true;
	path = site_url+"/sales_order/HoldSku"; 
	var id = ItemId;	
			$.ajax({url: path,
					data:{id:id,orderId:orderId,productId:productId,entityId:entityId,skuId:skuId,holdReason:holdReason},
					type: "POST",
					beforeSend : function(){
								$("#login_error").html('<center><image src="'+site_url+'/media/image/opc-ajax-loader.gif"/></center>');
								},
					success: function(data){
						alert(data);						
						if(data == "success"){
							parent.location.reload();
						}else{
							$('#submit'+ItemId).val('Hold');
							document.getElementById('submit'+ItemId).disabled=false;
						}
					},
					error: function(x,y,z){
						alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
					}
				});    
	}else{		
		return false;
	}
}

/*
 * Added function by Chetan to unhold sku
 */
function UnHoldSku(ItemId){
	var skuId = $('#sku_'+ItemId).val().trim();
	var orderId = $('#order_id_'+ItemId).val().trim();
	var productId = $('#product_id_'+ItemId).val().trim();
	var entityId = $('#entity_id_'+ItemId).val().trim();
	if (confirm('Are you sure you want to unhold Order Sku?')) {
		$('#submit'+ItemId).val('Please wait.......');
		document.getElementById('submit'+ItemId).disabled=true;
	path = site_url+"/sales_order/UnHoldSku"; 
	var id =ItemId;	
			$.ajax({url: path,
					data:{id:id,orderId:orderId,productId:productId,entityId:entityId,skuId:skuId},
					type: "POST",
					beforeSend : function(){
								$("#login_error").html('<center><image src="'+site_url+'/media/image/opc-ajax-loader.gif"/></center>');
								},
					success: function(data){
						alert(data);
						if(data == "success"){
							parent.location.reload();
						}else{
							$('#submit'+ItemId).val('UnHold');
							document.getElementById('submit'+ItemId).disabled=false;
						}
					},
					error: function(x,y,z){
						alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
					}
				});
	} else {
		return false;
	}
}

/* Function : cbcUserConfirmed()
 * Takes order id, status, makes ajax call to changeToPPUC() in /payment/Cbc.php
 * This function will be called when CBC order is confirmed (i.e. after clicking on 'Pending Payment User Confirmed' button) from Order Dashboard
 */
function cbcUserConfirmed(OrderID, status)
{
        var OrderID;
        var status;
        var msg="Are you sure you want to change status to User Confirmed with Pending Payment?";
        if (confirm(msg))
        {
                path = site_url+"/payment_cbc/changeToPPUC"; 
                $.ajax({
                    url: path,
                    data:{
                            OrderID:OrderID,
                            status:status
                        },
                    type: "POST",
                    beforeSend : function(){
                            $("#login_error").html('<center><image src="'+site_url+'/media/image/opc-ajax-loader.gif"/></center>');
                    },
                    success: function(data){
                            if(data == "Success"){
                                alert(data);
                                parent.location.reload();
                            } else {
                                alert(data);
                            }                            
                    },
                    error: function(x,y,z){
                            alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
                    }
                });


        } else {
                // Do nothing!
                return false;
        }
    
}


function updateShippingAddress()
{
	//var responce = confirm("Want to edit this address?");
	
	if(document.getElementById('fname').value=='')
	{
		alert('Please enter First Name');
		return false;
	}
	else if(document.getElementById('lname').value=='')
	{
		alert('Please enter Last Name');
		return false;
	}
	else if(document.getElementById('street').value=='')
	{
		alert('Please enter Street Address');
		return false;
	}
	else if(document.getElementById('city').value=='')
	{
		alert('Please enter City');
		return false;
	}
	else if(document.getElementById('country').value=='')
	{
		alert('Please select Country');
		return false;
	}
	else if(document.getElementById('postcode').value=='')
	{
		alert('Please enter Zip/Postal Code');
		return false;
	}
	else if(document.getElementById('phone').value=='' || document.getElementById('phone').length<10)
	{
		alert('Please enter Telephone');
		return false;
	}
	else
	{
		
			var path  = site_url+"/sales_order/updateAddress"; 
		
			$.ajax({ url: path,
						data:$("#myform").serialize(),
						//dataType:"json",
                		type: "POST",
						beforeSend : function(){
                			$("#login_error").html('<image src="'+ site_url+'/media/image/opc-ajax-loader.gif"/></center>');
           				},
						
					   	success: function(data){
						   alert(data);
						   if(data=='Success')
						   {
						  		window.parent.location.reload();
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


function Revive()
{
	
	if(document.getElementById('ReviveComment').value=='')
	{
		alert('Please select Reason');
		return false;
	}else
	{
	if (confirm('Are you sure you want to revive order?')) {
		$('#submit').val('Please wait.......');
		document.getElementById('submit').disabled=true;
	path = site_url+"/sales_order/Revivepost"; 
	
			$.ajax({url: path,
					data:$("#reviveform").serialize(),
					type: "POST",
					
					success: function(data){
						alert(data);
						if(data == "success"){
							//parent.$.fancybox.close();
							parent.location.reload();
						}
					},
					error: function(x,y,z){
						alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
						$('#submit').val('Submit');
						document.getElementById('submit').disabled=false;
					}
				});

		
    // Save it!
	} else {
		// Do nothing!
		return false;
	}
	}
}


function emailcheck()
{
	if(document.getElementById('creditmemo_cash_refund').value=='Yes')
	{
		document.getElementById('send_email').checked=true;
		document.getElementById('send_email').readOnly=true;
	}else
	{
		document.getElementById('send_email').checked=false;
		document.getElementById('send_email').readOnly=false;
	}
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
		path = site_url+"/sales_order/SaveComment"; 
		var OrderID =document.getElementById('entity_id').value;
		var history_status =document.getElementById('history_status').value;
		var history_comment =document.getElementById('history_comment').value;
	
		var history_notify=1;
		var history_visible=1;
		
			$.ajax({url: path,
					data:{OrderID:OrderID,history_status:history_status,history_comment:history_comment,history_notify:history_notify,history_visible:history_visible},
					type: "POST",
					beforeSend : function(){
								$("#login_error").html('<center><image src="'+site_url+'/media/image/opc-ajax-loader.gif"/></center>');
								},
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

function Searchform()
{
	//document.getElementById("listForm").submit();
	$('#submit').trigger('click');
	return false;
	
}

	function updateBilling(id,address_id,username){
		
		var path = site_url+"/address/editPurchaseBillingAddress/"; 
		$.ajax({ url: path,
				data:{entity_id : id,address_id:address_id,username:username},
				type: "POST",
				success: function(data){ 
						if(data == 'success'){
							alert("Billing Address changed successfully.");
							parent.location.reload(); 
						} else{
							alert("Something went wrong.");
							parent.location.reload(); 
						}
						
				},
						
		});
	}
        
function Shiptogether()
{
	
	if(document.getElementById('CollectionLocation').value=='')
	{
		alert('Please select Collection Location');
		return false;
                
	}
        else if($(".selectedId:checked").length<=1){
                    alert("Please select atleast 2 products");
                    return false;
                }
    else
	{
        var location ;   
        location = $('#CollectionLocation :selected').text(); 
        document.getElementById('location').value = location;
	if (confirm('Are you sure you want to Ship Together selected items?')) {
           
		$('#submit').val('Please wait.......');
		document.getElementById('submit').disabled=true;
	path = site_url+"/sales_order/Shiptogetherpost"; 
	
			$.ajax({url: path,
					data:$("#shiptogetherform").serialize(),
					type: "POST",
					
					success: function(data){
						alert(data);
						if(data == "success"){
							//parent.$.fancybox.close();
							parent.location.reload();
						}
                                                else{
                                                    $('#submit').val('Set Ship Together');
                                                    document.getElementById('submit').disabled=false;
                                                }
					},
					error: function(x,y,z){
						alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
						$('#submit').val('Set Ship Together');
						document.getElementById('submit').disabled=false;
					}
				});

		
    // Save it!
	} else {
		// Do nothing!
		return false;
	}
	}
}     

function Shiptogetheredit()
{
	
	if(document.getElementById('CollectionLocation').value=='')
	{
		alert('Please select Collection Location');
		return false;
                
	}
        else if(document.getElementById('reason').value=='')
	{
		alert('Please select Reason');
		return false;
                
	}
        else if($(".selectedId:checked").length<=1){
                    alert("Please select atleast 2 products");
                    return false;
                }
    else
	{
	if (confirm('Are you sure you want to Ship Together selected items?')) {
		$('#submit').val('Please wait.......');
		document.getElementById('submit').disabled=true;
	path = site_url+"/sales_order/Shiptogetherpost"; 
	
			$.ajax({url: path,
					data:$("#shiptogetherform").serialize(),
					type: "POST",
					
					success: function(data){
						alert(data);
						if(data == "success"){
							//parent.$.fancybox.close();
							parent.location.reload();
						}
                                                else{
                                                    $('#submit').val('Update Ship Together');
                                                    document.getElementById('submit').disabled=false;
                                                }
					},
					error: function(x,y,z){
						alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
						$('#submit').val('Update Ship Together');
						document.getElementById('submit').disabled=false;
					}
				});

		
    // Save it!
	} else {
		// Do nothing!
		return false;
	}
	}
}

function checkforgroup(userid,url,func){
    path = site_url+"/sales_order/Checkforsamegroup";
    $.ajax({
                type: 'POST',
                url: path,
                data: {userid:userid},
                dataType:"json",
                success: function(data){
                    console.log(data['msg']);
                        if(data['msg']=="success"){
                            func(url);
                        }
                        else{
                            alert("This order has been tagged by "+data['last_edited_user']+" user from "+data['last_edited_team']+" team for ship together. Please contact "+data['last_edited_team']+" team to get changes done.")
                        }
                        
                },
                error: function(message){
                        alert('An error has occurred while checking group');
                }
        });
}

function Shiptogetherremove()
{
	
	if (confirm('Are you sure you want to Remove Ship Together For Checked Items?')) {
            $('#remove_all').val(0);
            if($(".selectedId:checked").length<1){
                    alert("Please select atleast 1 products");
                    return false;
                }
            
		$('#remove').val('Please wait.......');
		document.getElementById('remove').disabled=true;
	path = site_url+"/sales_order/shiptogetherremovepost"; 

	var originalItems = $( '#initial_ship_together_items' ).val().split(',');
	for( var i=0;i<originalItems.length;i++ ) {
		originalItems[i] = parseInt( originalItems[i] );
	}

	var selectedItems = [];
	$(".selectedId:checked").each(function() {
		selectedItems.push( parseInt($(this).val()) );
	});

	var items_ship_together = []; // items which will still be marked ship together
	for( var i=0;i<originalItems.length;i++  ) {
		if( $.inArray( originalItems[i], selectedItems ) == -1 ) {
			items_ship_together.push(originalItems[i]);
		}
	}
	//commneted this because it use to again check uncheckd items.
	/*if(items_ship_together.length==0) {
		$('#remove_all').val(1);
	}*/
	/*if(items_ship_together.length==1) {
		$('.selectedId[value="'+items_ship_together[0]+'"]').prop('checked','checked');
		$('#remove_all').val(1);
	}*/

			$.ajax({url: path,
					data:$("#shiptogetherform").serialize(),
					type: "POST",
					
					success: function(data){
						alert(data);
						if(data == "success"){
							//parent.$.fancybox.close();
							parent.location.reload();
						}
					},
					error: function(x,y,z){
						alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
						$('#remove').val('Remove Ship Together');
						document.getElementById('remove').disabled=false;
					}
				});

		
    // Save it!
	} else {
		// Do nothing!
		return false;
	}
}

function reversepickup()
{       
    if ($(".selectedId:checked").length < 1) {
        alert("Please select atleast 1 products");
        return false;
    }else if($("#ropdate").val() == ''){
        alert("Please select Pick Up date");
        return false;
    }
    else
    {   
        var flag_dropdown = true;
        $('.selectedId:checked').each(function(index,value){
            if($(this).parents('tr').find('#qty').val() == 0){
                alert("Please select item quentity");
                flag_dropdown = false;
            }
            else if($(this).parents('tr').find('#reason').val() == 0){
                alert("Please select item reason");
                flag_dropdown = false;
            }
        });

        if(!flag_dropdown){
            return false;
        }
        if (confirm('Are you sure you want to reverse pickup selected items?')) {
            $('#submit').val('Please wait.......');
            document.getElementById('submit').disabled = true;
            path = site_url + "/sales_order/reversePickUpUpdate";

            $.ajax({url: path,
                data: $("#reversepickupform").serialize(),
                type: "POST",
                success: function (data) {
                    alert(data);
                    if (data == "success") {
                        //parent.$.fancybox.close();
                        parent.location.reload();
                    }
                    else {
                        $('#submit').val('Confirm RPU Request');
                        document.getElementById('submit').disabled = false;
                    }
                },
                error: function (x, y, z) {
                    alert('An error has occurred:\n' + x + '\n' + y + '\n' + z);
                    $('#submit').val('Confirm RPU Request');
                    document.getElementById('submit').disabled = false;
                }
            });


            // Save it!
        } else {
            // Do nothing!
            return false;
        }
    }
}

function export_csv(template)
{
    var export_all=true,path=site_url+"/sales_export/" + template + "/";
    var form = document.createElement("form");
    form.setAttribute("method", 'POST');
    form.setAttribute("action", path);
 
    //Move the submit function to another variable
    //so that it doesn't get overwritten.
    form._submit_function_ = form.submit;
    
    $('.order_id:checkbox:checked').each(function(){
        export_all = false;
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", 'order_ids[]');
        hiddenField.setAttribute("value", $(this).val());
        form.appendChild(hiddenField);
    });
    if (export_all)
    {
        $('.order_id:checkbox').each(function(){
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", 'order_ids[]');
            hiddenField.setAttribute("value", $(this).val());
            form.appendChild(hiddenField);
        });
    }
    
    document.body.appendChild(form);
    form._submit_function_();
}