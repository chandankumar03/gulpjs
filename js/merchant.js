function deleteInvoiceFile(invoice){
    $.post(root_url+'/merchant/deleteinvoicepdf/'+invoice);
}
$(document).ready(function(){ 
    var status = $('#status');
    //added by pradip humane
	$(".add_awb").click(function() {
		var $orderid_itemid=$(this).attr("rel").split("_");
		$("#itemid").text($orderid_itemid[1]);
		$("#order_id").text($orderid_itemid[0]);
		$("#awbBox").fadeIn(50); 
	});

	$(".cross").click(function(){
		$("#"+ $(this).attr('rel')).fadeOut(50);
                //this condition is written becoz on register sign in popup get refreshed , to stop this wrote this
                if($('#merchant_register_login').val() == "")
                {
                    window.location.reload();
                }
		return false;
	}); 

	$('.merchant_add').click(function(){
		var id=this.id;
		if(id > 0)
		{
			$('#address'+id).attr('checked','checked');
		}
		
	});

	$("#addressForm").click(function(){
		$('#addressTab').fadeIn(50);
	});

	$("#addressSubmit").click(function(){
		$('.error_msg').html('').removeClass('validation-advice');
		var errors=0;
		
		if($.trim($('#textAddress').val()) == '')
		{
			$('#addressMsg').html('Please enter your address');
			$('#addressMsg').addClass('validation-advice');
			errors=1;
		}
		else
		{
			var filter= /^[A-Za-z0-9\s\'-_,#&\/\/]+$/;
			if(!filter.test($.trim($('#textAddress').val())))
			{
				errors=1;
				$('#addressMsg').html('Please enter a valid address');
				$('#addressMsg').addClass('validation-advice');
			}
		}

		if($.trim($('#city').val()) == '')
		{
			$('#cityMsg').html('Please enter your city');
			$('#cityMsg').addClass('validation-advice');
			errors=1;
		}

		if($.trim($('#textState').val()) == '')
		{
			//$('#state').css('border', 'solid 1px red');
			$('#stateMsg').html('Please select your state');
			$('#stateMsg').addClass('validation-advice');
			errors=1;
		}
		

		if($.trim($('#textPincode').val()) == '')
		{
			$('#pincodeMsg').html('Please enter your pincode');
			$('#pincodeMsg').addClass('validation-advice');
			errors=1;
		}
		else
		{
			
			if($.trim($('#textPincode').val()).length != 6)
			{
				errors=1;
				$('#pincodeMsg').html('Please enter a 6-digit valid pincode ');
				$('#pincodeMsg').addClass('validation-advice');	
			}
		}

		if($.trim($('#textPhone').val()) == '')
		{
			$('#phoneMsg').html('Please enter your phone number');
			$('#phoneMsg').addClass('validation-advice');
			errors=1;
		}
		else
		{
			if($.trim($('#textPhone').val()).length != 11)
			{
				errors=1;
				$('#phoneMsg').html('Please enter a 11-digit valid landline number (e.g. 0222830XXXX)');
				$('#phoneMsg').addClass('validation-advice');
			}

			var filter= /^[0-9]+$/;
			if(!filter.test($.trim($('#textPhone').val())))
			{
				errors=1;
				$('#phoneMsg').html('Only Digits are allowed for Phone Number');
				$('#phoneMsg').addClass('validation-advice');
			}
		}
		if(errors==0)
		{
			var form_data=$("#add_address").serialize();
			var url = root_url + '/merchant/postAddress';
			$.ajax({
				type: 'POST',
				url: url,
				data:{data:form_data},
				async: false,
				beforeSend: function() {
					
				},
				success: function(resulthtml)
				{
					if(resulthtml=='success')
					{
						window.location.reload();
					}
					else
					{
						$('#header_error').html(resulthtml);
					}
					//alert('in success');				
					//$("#div-loader-wait").hide();
				},
				error: function(message)
				{
					alert('error');
				}
			});
		}
		return false;
	});

	$('#bulk_inv').click(function(){
		alert('hi invoice');
	});

	$('#bulk_ship').click(function(){
		alert('hi ship');
	});

	$("#btnAddawb").click(function(){
         var url = root_url + '/sales_shipment/addshipment';
         //var url = root_url + '/merchant/addawb';
         var $itemid=$("#itemid").text();
         var $orderid=$("#order_id").text();
         //alert("item id "+$itemid+"  Order "+$orderid);
         var $awb=$('#txtAwb').val();
         var $shipmentdate=$("#txtShipmentdate").val();
         if($awb == "")
         {
             alert("Enter AWB number");
         }
         else if($shipmentdate == "")
         {
             alert("Enter shipment date ");
         }
         else
         {
			$(this).prop('disabled',true);
			$(this).prop('value', 'Please Wait');

            var form_data=$("#awbfrm").serialize()+"&order_id="+$orderid+"&shipment%5Bitems%5D%5B"+$itemid+"%5D="+$itemid+"&send_sms=yes&send_email=yes&shipment_comment_text='ship by merchant'";
             //var form_data=$("#awbfrm").serializeArray();
             
             //form_data['shipment']['items'][$pid]=$pid;             
             //alert(form_data);
            //var $querystring="carrier="+$carrier+"&awb="+$awb+"&shipmentdate="+$shipmentdate+"&orderid_pid="+$orderid_pid;
            $.ajax({
                    type: 'POST',
                    url: url,
                    data:{data:form_data},
                    async: false,
                    beforeSend: function() {
						//  
                    },
                    success: function(result)
                    {                                           alert(result);
                       $("#awbBox").fadeOut(50);
                       location.reload();
                    },
                    error: function(message)
                    {
                      alert('error. Please Resend the code.' + message.toSource());
                    }
            });
			 $(this).prop('enabled',true);
			$(this).prop('value', 'SUBMIT');
         }
     });
     $( ".date_input_first" ).datepicker({dateFormat:'yy-mm-dd'});
	 $(".shipment_date_pick").datepicker({dateFormat:'yy-mm-dd'});
    //end

	//print invoice start
	$('.print_invoice').click(function(){
		var orderid_itemid=$(this).attr("rel").split("__");
		$('#order_entity_id').val(orderid_itemid[0]);
		$('#order_item_id').val(orderid_itemid[1]);
		$("#invoicePrint").fadeIn(50); 
		$('#textInvoice').val('');
	});

	$('#btnPrint').click(function(){
		//alert('hi'); 
		var errors=0;
		$('#invoice_detail .error_msg').html('').removeClass('validation-advice');	
		
		if($.trim($('#invoice_detail #textInvoice').val()) == '')
		{
			//$('#invoice_detail #company').css('border', 'solid 1px red');
			$('#invoice_detail #invoiceMsg').html('Please enter your invoice number');
			$('#invoice_detail #invoiceMsg').addClass('validation-advice');
			errors=1;
		}
		
		/*if($.trim($('#invoice_detail #textAddress').val()) == '')
		{
			$('#invoice_detail #addressMsg').html('Please enter your address');
			$('#invoice_detail #addressMsg').addClass('validation-advice');
			//$('#invoice_detail #street').css('border', 'solid 1px red');
			errors=1;
		}
		else
		{
			var filter= /^[A-Za-z0-9\s\'-_,&\/\/]+$/;
			if(!filter.test($.trim($('#invoice_detail #textAddress').val())))
			{
				errors=1;
				$('#invoice_detail #addressMsg').html('Please enter a valid address');
				$('#invoice_detail #addressMsg').addClass('validation-advice');
			}
		}

		if($.trim($('#invoice_detail #city').val()) == '')
		{
			//$('#invoice_detail #city').css('border', 'solid 1px red');
			$('#invoice_detail #cityMsg').html('Please enter your city');
			$('#invoice_detail #cityMsg').addClass('validation-advice');
			errors=1;
		}

		if($.trim($('#invoice_detail #textState').val()) == '')
		{
			$('#invoice_detail #stateMsg').html('Please select your state');
			$('#invoice_detail #stateMsg').addClass('validation-advice');
			errors=1;
		}

		if($.trim($('#invoice_detail #textPincode').val()) == '')
		{
			$('#invoice_detail #pincodeMsg').html('Please enter your pincode');
			$('#invoice_detail #pincodeMsg').addClass('validation-advice');
			errors=1;
		}
		else
		{
			if($.trim($('#invoice_detail #textPincode').val()).length != 6)
			{
				errors=1;
				$('#invoice_detail #pincodeMsg').html('Please enter a 6-digit valid pincode ');
				$('#invoice_detail #pincodeMsg').addClass('validation-advice');	
			}
		}

		if($.trim($('#invoice_detail #textPhone').val()) == '')
		{
			$('#invoice_detail #phoneMsg').html('Please enter your phone number');
			$('#invoice_detail #phoneMsg').addClass('validation-advice');
			errors=1;
		}
		else
		{
			if($.trim($('#invoice_detail #textPhone').val()).length != 11)
			{
				errors=1;
				$('#invoice_detail #phoneMsg').html('Please enter a 11-digit valid landline number (e.g. 0222830XXXX)');
				$('#invoice_detail #phoneMsg').addClass('validation-advice');
			}

			var filter= /^[0-9]+$/;
			if(!filter.test($.trim($('#invoice_detail #textPhone').val())))
			{
				errors=1;
				$('#invoice_detail #phoneMsg').html('Only Digits are allowed for Phone Number');
				$('#invoice_detail #phoneMsg').addClass('validation-advice');
			}
		}
		*/

		if($.trim($('#invoice_detail #textTin').val()) == '')
		{
			$('#invoice_detail #tinMsg').html('Please enter your TIN number');
			$('#invoice_detail #tinMsg').addClass('validation-advice');
			errors=1;
		}

		if($.trim($('#invoice_detail #textVat').val()) == '')
		{
			$('#invoice_detail #vatMsg').html('Please enter your VAT number');
			$('#invoice_detail #vatMsg').addClass('validation-advice');
			errors=1;
		}

		if($.trim($('#invoice_detail #textCst').val()) == '')
		{
			$('#invoice_detail #cstMsg').html('Please enter your CST number');
			$('#invoice_detail #cstMsg').addClass('validation-advice');
			errors=1;
		}
		//alert(erros); return false;
		if(errors==1)
		{
			return false;
		}
		else
		{
			//$('#textInvoice').val('');
			$("#invoicePrint").fadeOut(50);
                        setTimeout('deleteInvoiceFile('+$.trim($('#invoice_detail #textInvoice').val())+');',20000);
			//location.reload();
		}
	});

	$('#btnPrint1').click(function(){
		url= root_url + '/merchant/printInvoice';
		var form_data=$("#invoice_detail").serialize();
		//alert(form_data);
		 $.ajax({
			type: 'POST',
			url: url,
            data:{data:form_data},
			async: false,
            beforeSend: function() {
				//alert('Sending the code');	
			},
            success: function(result)
            {
				alert(result);
                //$("#awbBox").fadeOut(50);
                //location.reload();
			},
            error: function(message)
            {
              alert('error. Please Resend the code.' + message.toSource());
            }
		});
		alert('end');
		return false;
	});
	//print invoice end

	//cancel request start
	$('.cancel_request').click(function(){
		var orderid_itemid=$(this).attr("name").split("__");
		$('#order_entity_id').val(orderid_itemid[0]);
		$('#order_item_id').val(orderid_itemid[1]);
		$('#order_item_sku').val(orderid_itemid[2]);
		$('#order_increment_id').val(orderid_itemid[3]);
		$("#cancelBox").fadeIn(50); 
		//alert($(this).attr('name'));
	});

	$('#cancel_order_request').on("click",function(){
		var order_id=$('#order_entity_id').val();
		var order_item_id=$('#order_item_id').val();
		var order_item_sku=$('#order_item_sku').val();
		var order_increment_id=$('#order_increment_id').val();
		var reason=$.trim($('#reason').val());
		
		if(reason=='')
		{
			alert('Please select one of the reason for Cancellation');
			return false;
		}
		else if(order_id=='' || order_item_id=='')
		{
			alert('Try Later');
			return false;
		}
		else
		{
			$(this).prop('disabled',true);
			$(this).prop('value', 'Please Wait');
			url= root_url + '/merchant/cancelOrderRequest';
			$.ajax({
				type: 'POST',
				url: url,
				data:{order_id:order_id,order_item_id:order_item_id,order_item_sku:order_item_sku,order_increment_id:order_increment_id,reason:reason},
				async: false,
				beforeSend: function() {
					
				},
				success: function(result)
				{
					if(result=='success')
					{
						alert('Request made succesfully!!!');
						location.reload();
					}
					else
					{
						alert(result);
					}
				},
				error: function(message)
				{
				  alert('error. Please Resend the code.' + message.toSource());
				}
			});
			$(this).prop('disabled',false);
			$(this).prop('value', 'Cancel Order');
		}
		return false;

	});
	//cancel request end

	/* 
		Return item action start
	*/

	$('.return_item').click(function(){
		if(window.confirm("The action will confirm that you have recieved this item back in perfect condition. Do you wish to continue?"))
		{
			var orderid_itemid=(this).id;
			var orderid_itemid=orderid_itemid.split("__");

			var item_id=orderid_itemid[0];
			var order_id=orderid_itemid[1];
			
			if(item_id > 0 && order_id > 0)
			{
				$(this).prop('disabled',true);
				var button_value=$(this).prop('value');
				$(this).prop('value', 'Please Wait');
				url= root_url + '/merchant/itemRecieved';
				$.ajax({
					type: 'POST',
					url: url,
					data:{item_id:item_id,order_id:order_id},
					async: false,
					beforeSend: function() {
						
					},
					success: function(result)
					{
						if(result=='success')
						{
							alert('Request submitted succesfully!!!');
							location.reload();
						}
						else
						{
							alert(result);
						}
					},
					error: function(message)
					{
					  alert('error. Please Resend the code.' + message.toSource());
					}
				});

				$(this).prop('disabled',false);
				$(this).prop('value', button_value);
			}
		}
	});

	/* 
		Return item action end
	*/

	
	/*
	Bulk download button start
	*/

	$('.link_selects').click(function(){
		var val=$(this).attr('rel');
		$('.link_selects').removeClass('selected');
		$(this).addClass('selected');

		if(val==1 || val==3)
		{
			$('.order_item').attr('checked','checked');
		}
		else if(val==2 || val==4)
		{
			$('.order_item').attr('checked',false);
		}

		$('#select_record').val(val);

		showSelectedrecords(val);

	});

	$(".select_record").click(function(){
		//alert($(this).val());
		var val=$(this).val();
		if(val==1 || val==3)
		{
			$('.order_item').attr('checked','checked');
		}
		else if(val==2 || val==4)
		{
			$('.order_item').attr('checked',false);
		}

		showSelectedrecords(val);
	});

	$('.download_submit').click(function(){
		var order_item_id=[];
		var order_item = 0;
		var bulk_direct_ship=0;

		$('.order_item:checked').each(function() {
			order_item_id.push($(this).val());
			order_item = order_item + 1;
			
			if((this).id=='direct_ship_check')
			{
				bulk_direct_ship = bulk_direct_ship + 1;
			}
		});
		//alert(order_item_id);

		if((this).id=='shipment_submit' || (this).id=='invoice_submit')
		{
			/*$('.bulk_direct_ship').each(function() {
				bulk_direct_ship = bulk_direct_ship + 1;
			});*/

			if(order_item > 0 || bulk_direct_ship > 0)
			{
				if(bulk_direct_ship != order_item)
				{
					alert('Some of the Order SKU\'s are not available for Direct Ship. Please Uncheck that Order - SKU and Download file.');
					return false;
				}
			}

		}
		
		if(order_item_id=='')
		{
			alert('Please select records to download the file');
			return false;
		}
	});
	/*
	Bulk download button end
	*/


	$('#manifest_submit').click(function(){
		$('.error_msg').html('').removeClass('validation-advice');

		var errors=0;

		if($.trim($('#carrier').val())=='')
		{
			errors=1;
			$('#carrierMsg').html('Please select carrier code');
			$('#carrierMsg').addClass('validation-advice');

		}

		if($.trim($('#custom_design_from').val())=='' && $.trim($('#custom_design_to').val())=='')
		{
			errors=1;
			$('#fromMsg').html('Please select start date OR  end date');
			$('#fromMsg').addClass('validation-advice');

		}

		if(errors==1)
		{
			return false;
		}
	});

	$('#contact-help').click(function(){
		$('#contact-form').show();
		$('#contact-help').hide();
	});

	$('#business_detail').submit(function(){
		$('#business_detail .error_msg').html('').removeClass('validation-advice');
		var errors=0;
		
		if($.trim($('#business_detail #company').val()) == '')
		{
			//$('#business_detail #company').css('border', 'solid 1px red');
			$('#business_detail #companyMsg').html('Please enter your company name');
			$('#business_detail #companyMsg').addClass('validation-advice');
			errors=1;
		}
		else
		{
			$('#business_detail #company').css('border', '');
			var filter = /^[a-zA-Z0-9\s.,\'&]+$/;
			if(!filter.test($.trim($('#business_detail #company').val())))
			{
				errors=1;
				$('#business_detail #company .error-txt error-msg').html('Please enter a  valid company name');
				$('#business_detail #company .error-txt error-msg').addClass('validation-advice');
			}
		}

		if($.trim($('#business_detail #street').val()) == '')
		{
			$('#business_detail #streetMsg').html('Please enter your address');
			$('#business_detail #streetMsg').addClass('validation-advice');
			//$('#business_detail #street').css('border', 'solid 1px red');
			errors=1;
		}
		else
		{
			//$('#business_detail #street').css('border', '');
			//var filter = /^[A-Za-z0-9\s\'\-_,&]+$/;
			var filter= /^[A-Za-z0-9\s\'-_,&\/\/]+$/;
			if(!filter.test($.trim($('#business_detail #street').val())))
			{
				errors=1;
				$('#business_detail #streetMsg').html('Please enter a valid address');
				$('#business_detail #streetMsg').addClass('validation-advice');
			}
		}

		/*if($.trim($('#business_detail #street1').val()) == '')
		{
			//$('#business_detail #street1').css('border', 'solid 1px red');
			$('#business_detail #street1Msg').html('Please Enter Valid House Number');
			$('#business_detail #street1Msg').addClass('validation-advice');
			errors=1;
		}
		else
		{
			//$('#business_detail #street1').css('border', '');
			//var filter = /^[A-Za-z0-9\s\'\-_,&]+$/;
			var filter= /^[A-Za-z0-9\s\'-_,&\/\/]+$/;
			if(!filter.test($.trim($('#business_detail #street1').val())))
			{
				errors=1;
				$('#business_detail #street1Msg').html('Please Enter Valid House Number');
				$('#business_detail #street1Msg').addClass('validation-advice');
			}
		}*/

		if($.trim($('#business_detail #city').val()) == '')
		{
			//$('#business_detail #city').css('border', 'solid 1px red');
			$('#business_detail #cityMsg').html('Please enter your city');
			$('#business_detail #cityMsg').addClass('validation-advice');
			errors=1;
		}
		else
		{
			//$('#business_detail #city').css('border', '');
		}

		if($.trim($('#business_detail #state').val()) == '')
		{
			//$('#business_detail #state').css('border', 'solid 1px red');
			$('#business_detail #stateMsg').html('Please select your state');
			$('#business_detail #stateMsg').addClass('validation-advice');
			errors=1;
		}
		else
		{
			//$('#business_detail #state').css('border', '');
		}

		if($.trim($('#business_detail #pincode').val()) == '')
		{
			//$('#business_detail #pincode').css('border', 'solid 1px red');
			$('#business_detail #pincodeMsg').html('Please enter your pincode');
			$('#business_detail #pincodeMsg').addClass('validation-advice');
			errors=1;
		}
		else
		{
			//$('#business_detail #pincode').css('border', '');
			
			if($.trim($('#business_detail #pincode').val()).length != 6)
			{
				errors=1;
				$('#business_detail #pincodeMsg').html('Please enter a 6-digit valid pincode ');
				$('#business_detail #pincodeMsg').addClass('validation-advice');	
			}
		}

		if($.trim($('#business_detail #phone').val()) == '')
		{
			//skip telephone number mandatory validations 

			//$('#business_detail #phone').css('border', 'solid 1px red');
			//errors=1;
		}
		else
		{
			//$('#business_detail #phone').css('border', '');
			if($.trim($('#business_detail #phone').val()).length != 11)
			{
				errors=1;
				$('#business_detail #phoneMsg').html('Please enter a 11-digit valid landline number (e.g. 0222830XXXX)');
				$('#business_detail #phoneMsg').addClass('validation-advice');
			}
		}

		var category_id_select = 0;
		$('#business_detail .category_chk').each(function(ele){
			if($(this).is(":checked")) {
				category_id_select = parseInt($("#business_detail #" + this.id).val());
				//alert(category_id_select);
			}
		});

		if(category_id_select==0)
		{
			errors=1;
			$('#business_detail #categoriesMsg').html('Please select atleast one category');
			$('#business_detail #categoriesMsg').addClass('validation-advice');
			//$('#business_detail #categories').css('border', 'solid 1px red');
			//alert('Please select one of the meta category');
		}
		else
		{
			//$('#business_detail #categories').css('border', '');
		}

		if(errors==1)
		{
			return false;
		}
	});

	$('#bank_detail').submit(function(){
		$('.error_msg').html('').removeClass("validation-advice");
		var errors=0;

		if($.trim($('#payee_name').val()) == '')
		{
			$('#pnMsg').html('Please Enter Valid Beneficiary Name').addClass("validation-advice");
			errors=1;
		}
		else
		{
			/*var filter = /^[A-Za-z0-9\s.\']+$/;
			if(!filter.test($.trim($('#payee_name').val())))
			{
				errors=1;
				$('#pnMsg').html('Please Enter Valid Beneficiary Name').addClass("validation-advice");
			}*/
		}

		/*if($.trim($('#fname').val()) == '')
		{
			//$('#fname').css('border', 'solid 1px red');
			$('#fnameMsg').html('Please Enter Valid First Name').addClass("validation-advice");
			errors=1;
		}
		else
		{
			$('#fname').css('border', '');
			var filter = /^[A-Za-z\s\']+$/;
			if(!filter.test($.trim($('#fname').val())))
			{
				errors=1;
				$('#fnameMsg').html('Please Enter Valid First Name').addClass("validation-advice");
			}
		}

		if($.trim($('#lname').val()) == '')
		{
			$('#lnameMsg').html('Please Enter Valid Last Name').addClass("validation-advice");
			errors=1;
		}
		else
		{
			$('#lname').css('border', '');
			var filter = /^[A-Za-z\s\']+$/;
			if(!filter.test($.trim($('#lname').val())))
			{
				errors=1;
				$('#lnameMsg').html('Please Enter Valid Last Name').addClass("validation-advice");
			}
		}*/

		if($.trim($('#acc_no').val()) == '')
		{
			//$('#acc_no').css('border', 'solid 1px red');
			$('#accMsg').html('Please Enter Valid Bank Account Number').addClass("validation-advice");
			errors=1;
		}
		else
		{
			$('#acc_no').css('border', '');
			/*var filter = /^[A-Za-z0-9\s]+$/;
			if(!filter.test($.trim($('#acc_no').val())))
			{
				errors=1;
				$('#accMsg').html('Please Enter Valid Bank Account Number').addClass("validation-advice");
			}*/
		}

		if($.trim($('#ifsc').val()) == '')
		{
			//$('#ifsc').css('border', 'solid 1px red');
			$('#ifscMsg').html('Please Enter Valid IFSC Code').addClass("validation-advice");
			errors=1;
		}
		else
		{
			$('#ifsc').css('border', '');
			/*var filter = /^[A-Za-z0-9\s]+$/;
			if(!filter.test($.trim($('#ifsc').val())))
			{
				errors=1;
				$('#ifscMsg').html('Please Enter Valid IFSC Code').addClass("validation-advice");
			}*/
		}

		if(errors==1)
		{
			return false;
		}
	});

	$('#register_detail').submit(function(){
		$('#register_detail .error_msg').html('').removeClass('validation-advice');
		var errors=0;

		if($.trim($('#fname').val()) == '')
		{
			//$('#fname').css('border', 'solid 1px red');
			$('#fnameMsg').html('Please enter your first name (Alphabets only)').addClass('validation-advice');
			errors=1;
		}
		else
		{
			$('#fname').css('border', '');
			var filter = /^[A-Za-z\s\']+$/;
			if(!filter.test($.trim($('#fname').val())))
			{
				errors=1;
				$('#fnameMsg').html('Please enter your first name (Alphabets only)').addClass('validation-advice');
			}
		}

		if($.trim($('#lname').val()) == '')
		{
			//$('#lname').css('border', 'solid 1px red');
			$('#lnameMsg').html('Please enter your last name (Alphabets only)').addClass('validation-advice');
			errors=1;
		}
		else
		{
			$('#lname').css('border', '');
			var filter = /^[A-Za-z\s\']+$/;
			if(!filter.test($.trim($('#lname').val())))
			{
				errors=1;
				$('#lnameMsg').html('Please enter your last name (Alphabets only)').addClass('validation-advice');
			}
		}

		if($.trim($('#register_detail #email').val()) == '')
		{
			//$('#register_detail #email').css('border', 'solid 1px red');
			$('#register_detail #emailMsg').html('Please enter your email ID').addClass('validation-advice');
			errors=1;
		}
		else
		{
			$('#register_detail #email').css('border', '');
			//var filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}(\.[a-zA-Z]{2,3})?(\.[a-zA-Z]{2,4})?$/i;
			var filter=/^[a-zA-Z0-9._-]+@([0-9a-z][0-9a-z.-]+\.)+[a-zA-Z]{2,4}$/i;
			if(!filter.test($.trim($('#register_detail #email').val())))
			{
				errors=1;
				$('#register_detail #emailMsg').html('Please enter a valid email ID').addClass('validation-advice');
			}
		}
                
                
               
                

		if($.trim($('#register_detail #password').val()) == '')
		{
			//$('#register_detail #password').css('border', 'solid 1px red');
			$('#register_detail #passwordMsg').html('Please enter a password').addClass('validation-advice');
			errors=1;
		}
		else
		{
			//$('#register_detail #password').css('border', '');
				if($('#register_detail #password').length > 0){
					if ( ($.trim($('#register_detail #password').val()).length < 6) || ($.trim($('#register_detail #password').val()).length > 20) )
					{
						errors=1;
						$('#register_detail #passwordMsg').html('Password should be in range of 6 to 20 characters.').addClass('validation-advice');
					}
				}
		}

		if($.trim($('#register_detail #rpassword').val()) == '')
		{
			//$('#register_detail #rpassword').css('border', 'solid 1px red');
			$('#register_detail #rpasswordMsg').html('Please confirm your password').addClass('validation-advice');
			errors=1;
		}
		else
		{
			$('#register_detail #rpassword').css('border', '');
			
			if($.trim($('#register_detail #rpassword').val()) != $.trim($('#register_detail #password').val()))
			{
				errors=1;
				$('#register_detail #rpasswordMsg').html('Your passwords don\'t match').addClass('validation-advice');
			}
		}

		if($.trim($('#register_detail #mobile').val()) == '')
		{
			//$('#register_detail #mobile').css('border', 'solid 1px red');
			$('#register_detail #mobileMsg').html('Please enter 10-digit mobile number (e.g. 9967XXXXXX)').addClass('validation-advice');
			errors=1;
		}
		else
		{
			//$('#register_detail #mobile').css('border', '');

			if($.trim($('#register_detail #mobile').val()).length != 10)
			{
				errors=1;
				$('#register_detail #mobileMsg').html('Please enter a valid 10-digit mobile number (e.g. 9967XXXXXX)').addClass('validation-advice');
			}

			var filter = /^[0-9]+$/;
			if(!filter.test($.trim($('#register_detail #mobile').val())))
			{
				errors=1;
				$('#register_detail #mobileMsg').html('Please Enter Valid Mobile Number').addClass('validation-advice');
			}
		}

		if(errors==1)
		{
			return false;
		}
	});

	$('#mobile_detail').submit(function(){
		var errors=0;
		$('#otpMsg').html('').removeClass('validation-advice');
		if($.trim($('#mobile_detail #mobile_code').val()) == '')
		{
			//$('#mobile_detail #mobile_code').css('border', 'solid 1px red');
			$('#otpMsg').html('Please enter a valid verification code').addClass('validation-advice');
			errors=1;
		}
		else
		{
			//$('#register_detail #mobile_code').css('border', '');
		}

		if(errors==1)
		{
			return false;
		}
	});

	$('#accept_detail').submit(function(){
		var errors=0;
		
		if($('#accept_check').is(":checked"))
		{
			$('#acceptMsg').hide();
		}
		else
		{
			$('#acceptMsg').show();
			errors=1;
		}
		
		if(errors==1)
		{
			return false;
		}
	});

	$("#city").autocomplete({
	    source: root_url+"/customer_account/suggest_city/",
	    minLength: 2,
	    appendTo: "#city_result", 
	    select: function( event, ui ) {
	      //log( ui.item ?"Selected: " + ui.item.value + " aka " + ui.item.id :"Nothing selected, input was " + this.value );
	    },
	    change: function( event, ui ) {
	    	$("#city").removeClass('error-border');
	    }
	});

	$('#sendOTP').click(function(){
		var url = root_url + '/merchant/sendOtpCode';

		$.ajax({
			type: 'POST',
			url: url,
			beforeSend: function() {
				//alert('Sending the code');	
			},
			success: function(resulthtml)
			{
				//alert('Code has sent on your mobile');
				$("#before-resend").hide();
				$("#after-resend").show();
                                $('#success_otpmsg').css('display','block');
			},
			error: function(message)
			{
				alert('error. Please Resend the code.');
			}
		});
		return false;
	});

	$('#resendAL').click(function(){
		var url = root_url + '/merchant/sendActivationlink';

		$.ajax({
			type: 'POST',
			url: url,
			beforeSend: function() {
				//alert('Please Wait .... ');	
			},
			success: function(resulthtml)
			{
				alert(resulthtml);
				//alert('Code has sent on your mobile');
				//$("#before-resend").hide();
				//$("#after-resend").show();
			},
			error: function(message)
			{
				alert('error. Please Resend the code.');
			}
		});
		return false;
	});

	$("#to-before-resend").on('click', function(){
		$("#after-resend").hide();
		var text = '<p>Thank you for registering your mobile phone number </p><h2  class="mobile_number"><strong>'+otp_mobile_number+'</strong></h2><p>We have SMSed you a verification code (from <strong>LM-PPRFRY</strong>)</p><br />';
		$("#before-resend").html(text);
		$("#before-resend").show();
	});
	
	
	/*$("#quick_view").on("click", '.cross', function(event){
		alert('cross');
		$('.transparent_bg').hide();
		//$('.quick_look').html('');		
	});*/

	$('.edit_address').click(function(){
		var id=this.id;
		$('.edit_info').html('');
		
		if(id > 0)
		{
			var url = root_url + '/merchant/editAddress';

			$.ajax({
				type: 'POST',
				url: url,
				data:{address_id:id},
				async: false,
				beforeSend: function() {
					//console.log('before send');
				},
				success: function(resulthtml)
				{
					$('.edit_info').html(resulthtml);
					$('#edit_tab').show();
				},
				error: function(message)
				{
					alert('Please Try later!');
				}
			});
			
		}
		return false;
		
	});

	$("#edit_city").on("focus", function() {
		$('.ui-helper-hidden-accessible').hide();
		$(this).autocomplete({
			source: root_url+"/customer_account/suggest_city/",
			minLength: 2,
			appendTo: "#edit_city_result", 
			select: function( event, ui ) {
			 //log( ui.item ?"Selected: " + ui.item.value + " aka " + ui.item.id :"Nothing selected, input was " + this.value );
			},
			change: function( event, ui ) {
	    		$("#edit_city").removeClass('error-border');
			}
		});
	});

	$('#edit_tab').on('click','#editaddressSubmit',function(){
		$('#edit_address .error_msg').html('').removeClass('validation-advice');
		var errors=0;

		if($.trim($('#edittextAddress').val()) == '')
		{
			$('#editaddressMsg').html('Please enter your address');
			$('#editaddressMsg').addClass('validation-advice');
			errors=1;
		}
		else
		{
			var filter= /^[A-Za-z0-9\s\'-_,#&\/\/]+$/;
			if(!filter.test($.trim($('#edittextAddress').val())))
			{
				errors=1;
				$('#editaddressMsg').html('Please enter a valid address');
				$('#editaddressMsg').addClass('validation-advice');
			}
		}

		if($.trim($('#edit_city').val()) == '')
		{
			$('#editcityMsg').html('Please enter your city');
			$('#editcityMsg').addClass('validation-advice');
			errors=1;
		}
	
		if($.trim($('#edittextState').val()) == '')
		{
			//$('#state').css('border', 'solid 1px red');
			$('#editstateMsg').html('Please select your state');
			$('#editstateMsg').addClass('validation-advice');
			errors=1;
		}

		if($.trim($('#edittextPincode').val()) == '')
		{
			$('#editpincodeMsg').html('Please enter your pincode');
			$('#editpincodeMsg').addClass('validation-advice');
			errors=1;
		}
		else
		{
			if($.trim($('#edittextPincode').val()).length != 6)
			{
				errors=1;
				$('#editpincodeMsg').html('Please enter a 6-digit valid pincode ');
				$('#editpincodeMsg').addClass('validation-advice');	
			}
		}

		if($.trim($('#edittextPhone').val()) == '')
		{
			$('#editphoneMsg').html('Please enter your phone number');
			$('#editphoneMsg').addClass('validation-advice');
			errors=1;
		}
		else
		{
			if($.trim($('#edittextPhone').val()).length != 11)
			{
				errors=1;
				$('#editphoneMsg').html('Please enter a 11-digit valid landline number (e.g. 0222830XXXX)');
				$('#editphoneMsg').addClass('validation-advice');
			}

			var filter= /^[0-9]+$/;
			if(!filter.test($.trim($('#edittextPhone').val())))
			{
				errors=1;
				$('#editphoneMsg').html('Only Digits are allowed for Phone Number');
				$('#editphoneMsg').addClass('validation-advice');
			}
		}
		

		//console.log(errors);
		if(errors==0)
		{
			var form_data=$("#edit_address").serialize();
			console.log(form_data);
			var url = root_url + '/merchant/postAddress';
			$.ajax({
				type: 'POST',
				url: url,
				data:{data:form_data},
				async: false,
				beforeSend: function() {
					
				},
				success: function(resulthtml)
				{
					if(resulthtml=='success')
					{
						window.location.reload();
					}
					else
					{
						$('#edit_header_error').html(resulthtml);
					}
					//alert('in success');				
					//$("#div-loader-wait").hide();
				},
				error: function(message)
				{
					alert('error');
				}
			});
		}
		return false;
	});

	$('#account_submit').click(function(){
		$('#account_edit .error_msg').html('').removeClass('validation-advice');
		var errors=0;

		if($.trim($('#account_edit #address').val()) == '')
		{
			$('#account_edit #addressMsg').html('Please enter your address');
			$('#account_edit #addressMsg').addClass('validation-advice');
			errors=1;
		}
		else
		{
			var filter= /^[A-Za-z0-9\s\'-_,#&\/\/]+$/;
			if(!filter.test($.trim($('#account_edit #address').val())))
			{
				errors=1;
				$('#account_edit #addressMsg').html('Please enter a valid address');
				$('#account_edit #addressMsg').addClass('validation-advice');
			}
		}

		
		if($.trim($('#account_edit #city').val()) == '')
		{
			$('#account_edit #cityMsg').html('Please enter your city');
			$('#account_edit #cityMsg').addClass('validation-advice');
			errors=1;
		}
		

		if($.trim($('#account_edit #state').val()) == '')
		{
			$('#account_edit #stateMsg').html('Please select your state');
			$('#account_edit #stateMsg').addClass('validation-advice');
			errors=1;
		}
		

		if($.trim($('#account_edit #pincode').val()) == '')
		{
			$('#account_edit #pincodeMsg').html('Please enter your pincode');
			$('#account_edit #pincodeMsg').addClass('validation-advice');
			errors=1;
		}
		else
		{
			var filter= /^[0-9]+$/;
			if(!filter.test($.trim($('#account_edit #pincode').val())))
			{
				errors=1;
				$('#account_edit #pincodeMsg').html('Only Digits are allowed for Pincode');
				$('#account_edit #pincodeMsg').addClass('validation-advice');
			}
			
			if($.trim($('#account_edit #pincode').val()).length != 6)
			{
				errors=1;
				$('#account_edit #pincodeMsg').html('Please enter a 6-digit valid pincode ');
				$('#account_edit #pincodeMsg').addClass('validation-advice');	
			}
		}

		if($.trim($('#account_edit #phone').val()) == '')
		{
			//skip telephone number mandatory validations 
		}
		else
		{
			if($.trim($('#account_edit #phone').val()).length != 11)
			{
				errors=1;
				$('#account_edit #phoneMsg').html('Please enter a 11-digit valid landline number (e.g. 0222830XXXX)');
				$('#account_edit #phoneMsg').addClass('validation-advice');
			}
		}

		if($.trim($('#account_edit #mobile').val()) == '')
		{
			$('#account_edit #mobileMsg').html('Please enter your pincode');
			$('#account_edit #mobileMsg').addClass('validation-advice');
			errors=1;
		}
		else
		{
			var filter= /^[0-9]+$/;
			if(!filter.test($.trim($('#account_edit #mobile').val())))
			{
				errors=1;
				$('#account_edit #mobileMsg').html('Only Digits are allowed for Mobile');
				$('#account_edit #mobileMsg').addClass('validation-advice');
			}

			if($.trim($('#account_edit #mobile').val()).length != 10)
			{
				errors=1;
				$('#account_edit #mobileMsg').html('Please enter a 10-digit valid mobile number');
				$('#account_edit #mobileMsg').addClass('validation-advice');
			}
		}

		if(errors==1)
		{
			return false;
		}
	});


	//work for change password start
	$('#cp_submit').click(function(){
		$('.error_msg').html('').removeClass('validation-advice');
		var errors=0;

		if($.trim($('#cpassword').val()) == '')
		{
			//$('#register_detail #password').css('border', 'solid 1px red');
			$('#cpasswordMsg').html('Please enter current password').addClass('validation-advice');
			errors=1;
		}

		if($.trim($('#npassword').val()) == '')
		{
			$('#npasswordMsg').html('Please enter new password').addClass('validation-advice');
			errors=1;
		}
		else
		{
			if($.trim($('#npassword').val()).length < 6)
			{
				errors=1;
				$('#npasswordMsg').html('Please enter atleast 6 characters for your password').addClass('validation-advice');
			}
		}

		if($.trim($('#rpassword').val()) == '')
		{
			$('#rpasswordMsg').html('Please confirm your password').addClass('validation-advice');
			errors=1;
		}
		else
		{
			if($.trim($('#rpassword').val()) != $.trim($('#npassword').val()))
			{
				errors=1;
				$('#rpasswordMsg').html('Your passwords doesn\'t match').addClass('validation-advice');
			}
		}

		if(errors==1)
		{
			return false;
		}
	});
	//work for change password end

	$('.prc_check').on('change',function(){
		var checked = $(this).prop('checked');
		var value= $(this).val();

		$('.prc_input_'+value).prop('disabled', !checked);
	});

	$('#comission_prc').click(function(){
		//alert('here');
		var form_data=$("#prc_comission_form").serialize();
		//alert(form_data);
		//$("#div-loader-wait").show();
		var url = root_url + '/merchant_listing/postcomission';
		$.ajax({
			type: 'POST',
			url: url,
			data:{data:form_data},
			async: false,
			beforeSend: function() {
				
			},
			success: function(resulthtml)
			{
				alert(resulthtml);
				//alert('in success');				
				//$("#div-loader-wait").hide();
			},
			error: function(message)
			{
				alert('error');
			}
		});
		return false;
	});
	
	$('#prc_pinc').click(function(){		
		var form_data=$("#prc_comission_form").serialize();		
		//$("#div-loader-wait").show();
		var url = root_url + '/merchant_listing/post_prc_pincode';
		$.ajax({
			type: 'POST',
			url: url,
			data:form_data,
			async: false,
			beforeSend: function() {
				
			},
			success: function(resulthtml)
			{
				//alert(resulthtml);
				if(resulthtml == 'success'){
					alert('data saved succesfully');
				}else{
					//alert('data update failed');
					$('#prc_msg').html(resulthtml);
				}
				//alert('in success');				
				//$("#div-loader-wait").hide();
			},
			error: function(message)
			{
				alert('error');
			}
		});
		return false;
	});
	
	$('#prc_pincode').click(function(){
		//alert('here');
		var form_data=$("#prc_comission_form").serialize();		
		//$("#div-loader-wait").show();
		var url = root_url + '/merchant_listing/post_prc_pincode';
		$.ajax({
			type: 'POST',
			url: url,
			data:{data:form_data},
			async: false,
			beforeSend: function() {
				
			},
			success: function(resulthtml)
			{
				//alert(resulthtml);
				if(resulthtml == 'success'){
					alert('data saved succesfully');
				}else{
					alert('data update failed');
				}
				//alert('in success');				
				//$("#div-loader-wait").hide();
			},
			error: function(message)
			{
				alert('error');
			}
		});
		return false;
	});

	$("#merchantLogin").click(function() {
		$("#loginBox").fadeIn(50);
                $('#merchant_register_login').val('merchant_register_login');
	});

	$('.order_paging').click(function(){
		var value=$(this).attr('rel');
		$("#pageview").val(value);
		$("#merchant_order").submit();
	});

	$('.product_paging').click(function(){
		//alert('hi');
		var value=$(this).attr('rel');
		$("#pageview").val(value);
		$("#merchant_products").submit();
	});	

	$('.item_prod_detail').click(function(){
		var val= $(this).attr('rel');
		alert(val);
	});


	$('table#prod_data').on('click','.liveList',function(){
		var product_id=this.id;

		//append tr with td  loader after configurable products tr
		$('.liveList'+product_id).after('<tr id="child'+product_id+'"><td colspan=11 style="text-align:center;"><image src="'+root_url+'/media/image/opc-ajax-loader.gif"/><br /> Getting Associated Products<\/td></tr>');

		path=root_url+'/merchant/ajaxChildProducts';

		$.ajax({ 
			url: path,
			data:{product_id:product_id},
			dataType:"json",
			type: "POST",
			success: function(data){	
				if(data=='error')
				{	
					//if error, remove tr which was appended 
					$('#child'+product_id).remove();
				}
				else
				{
					$('#child'+product_id).html(data);
					$('#'+product_id).removeClass('liveList').addClass('ajaxList');
				}
        	},
			error: function(data){
				//if error, remove tr which was appended 
				$('#child'+product_id).remove();
        	}
		});
	});

	$('table#prod_data').on('click','.ajaxList',function(){
		var product_id=this.id;
		$('#child'+product_id).toggle();
	});

	
	$('.check_data').click(function() {
		$('form').ajaxForm({
			beforeSend: function() {
				status.empty();
				body = '';
				$("#check-data").attr("disabled", true);
				$("#upload_type").attr("disabled", true);
				timer = setTimeout('getProgress()',5000);
				$("#check-data").val("Please wait...");
			},
			success: function() {
				$("#bulk").empty();
				clearTimeout(timer);
			},
			complete: function(xhr) {            
				//status.html(xhr.responseText);
				status.empty();
				clearTimeout(timer);
				var res = $.parseJSON(xhr.responseText);
				if(res.error) {
					status.append("Please rectify the below mentioned errors.<br /></br />");
					//for(var i in res.error) {
					scan(res.error);	
					status.append( body +"<br />");
					//}
					$("#check-data").attr("disabled", false);
					$("#upload_type").attr("disabled", false);
					$("#check-data").val("Save Data");
					hit=0;
				}
				else if(res.success){
					for(var i in res.success) {
						status.append(res.success[i]+"<br />");
					}
					hit=1;
					$("#check-data").attr("disabled", false);
					$("#upload_type").attr("disabled", false);
					$("#check-data").val("Save Data");
					//$("#check-data").hide();
					//$("#save-data").show();
				}
				else {
					alert("ZOIKS");
				}
			},
			error:function(t) {
				console.log(t);
			}
		});
	});

	$('.bulkinvoice_form').bind('click',function() {
		var val = $("#check-data").val();
		//alert(val);
		if(val=="Submit")
		{
			$('#csvform').submit();
			return false;
		}
		else if(val=="Validate CSV")
		{
			$('form').ajaxForm({
				beforeSend: function() {
					status.empty();
					body = '';
					$("#check-data").attr("disabled", true);
					$("#upload_type").attr("disabled", true);
					//timer = setTimeout('getProgress()',5000);
					$("#check-data").val("Please wait...");
				},
				success: function() {
					$("#bulk").empty();
					
				},
				complete: function(xhr) {            
					//status.html(xhr.responseText);
					status.empty();
					var res = $.parseJSON(xhr.responseText);
					if(res.error) {
						status.append("Please rectify the below mentioned errors.<br /></br />");
						//for(var i in res.error) {
						scan(res.error);	
						status.append( body +"<br />");
						//}
						$("#check-data").attr("disabled", false);
						$("#upload_type").attr("disabled", false);
						$("#check-data").val("Validate CSV");
						hit=0;
					}
					else if(res.success){
						for(var i in res.success) {
							status.append(res.success[i]+"<br />");
						}
						hit=1;
						$("#check-data").attr("disabled", false);
						$("#upload_type").attr("disabled", false);
						$("#check-data").val("Submit");
						//$('.bulkinvoice_form').unbind('click');
						$('form').unbind('submit').find('input:submit,input:image,button:submit').unbind('click'); 
						//$("#check-data").removeClass('bulkinvoice_form');
						//$("#save-data").show();
					}
					else {
						alert("ZOIKS");
					}
				},
				error:function(t) {
					console.log(t);
				}
			});
		}
	});

	//supplier add edit form validation start
	$('#reset').click(function(){
		$('.err').html('');
	});

	$("#myform").submit(function()
	{
		var pro = true;
		var err = '';
		$("#div-error-messages").html('');
		$("#div-error-messages").hide();
		$('.required').each(function(){
			if(empty($.trim($(this).val()))) {
				$(this).addClass('error-border');
				pro = false;
			} else if(this.id == 'email' || this.id == 'customer_email')
                                {
				if(validateEmail($(this).val()) == false) {
					$(this).addClass('error-border');
					pro = false;
					err += $(this).val() + " is not a valid email format.<br />";
				}
			} else if(this.id == 'pincode') {
				if(document.getElementById("state").value!='Other')
				{
					if($(this).val().length!=6) {
						$(this).addClass('error-border');
						pro = false;
						err += "Pincode needs to be exactly 6 digits.<br />";
					} else {
						var filter = /^[0-9]+$/;
						if(!filter.test($(this).val())) {
							$(this).addClass('error-border');
							pro = false;
							err += "Pincode needs to be numeric only.<br />";
						}
					}
			 }
			} else if(this.id == 'customer_mobile') {
				if($(this).val().length!=10) {
					$(this).addClass('error-border');
					pro = false;
					err += "Customer Mobile needs to be exactly 10 digits.<br />";
				} else {
					var filter = /^[0-9]+$/;
					if(!filter.test($(this).val())) {
						$(this).addClass('error-border');
						pro = false;
						err += "Customer Mobile needs to be numeric only.<br />";
					}
				}
			} else if(this.id == 'customer_password') {
				if($(this).val().length < 6) {
					$(this).addClass('error-border');
					pro = false;
					err += "Customer Password cannot be less than 6 charachters.<br />";
				}
			} else if(this.id == 'customer_confirm_password') {
				if($(this).val() != $('#customer_password').val()) {
					$(this).addClass('error-border');
					pro = false;
					err += "Customer Passwords do not match.<br />";
				}
			}
                         else if(this.id == 'stock_inti_email' || this.id == 'customer_email') {
				if(validateEmail($(this).val()) == false) {
					$(this).addClass('error-border');
					pro = false;
					err += $(this).val() + " is not a valid email format.<br />";
				}
			} 

		});
		if(pro === false) {
			$("#div-error-messages").html("Please rectify the below issues.<br />" + err );
			$("#div-error-messages").show();
		}
		return pro;
		//$('.err').html('');
		/*var supplier_name = $.trim($("#supplier_name").val());
		var address=$.trim($("#address_line1").val());
		var email=$.trim($("#email").val());
		var add_email=$.trim($("#add_email").val());
		var city=$.trim($("#city").val());
		var pincode=$.trim($("#pincode").val());
		var area_code=$.trim($("#area_code").val());
		var phone=$.trim($("#phone").val());
		var contact_person=$.trim($("#contact_person").val());
		var buyerid=$.trim($("#buyerid").val());
		var warehouse=$.trim($("#warehouse").val());
		var customer_id=$.trim($("#customer_id").val());
		var supplier_id=$.trim($("#supplier_id").val());
		//alert(customer_id);
		//alert(supplier_id);
		//alert('here'); return false;
		//alert(buyerid)

		var err=false;
			if(supplier_name == "")
			{
				err=true;
				$("#nameMsg").html('This Is Required Field');
			}
			else
			{
				var filter = /^[a-zA-Z0-9\s.,\'&]+$/;
				if(!filter.test(supplier_name))
				{
					err=true;
					$("#nameMsg").html('Only Characters and Digits are allowed for Company name.');
				}
			}
			
			if(buyerid == "")
			{
				err=true;
				$("#buyerMsg").html('This Is Required Field');
			}
			
			if(address == "")
			{
				err=true;
				$("#addressMsg").html('This Is Required Field');
			}
			if(email == "")
			{
				err=true;
				$("#emailMsg").html('This Is Required Field');
			}
			else if(!validateEmail(email))
			{
				err=true;
				$("#emailMsg").html('Enter Valid Email Address');
			}

			if(add_email!="")
			{
				if(!validateEmail(add_email))
				{
					err=true;
					$("#AddEmailMsg").html('Enter Valid Email Address');
				}
			}

			if(city == "")
			{
				err=true;
				$("#cityMsg").html('This Is Required Field');
			}
			
			if(pincode == "")
			{
				err=true;
				$("#codeMsg").html('This Is Required Field');
			}
			else if (pincode.length!=6)
			{
				err=true;
				$("#codeMsg").html('Enter 6 Digit pincode');
			}

			if(area_code == "")
			{
				err=true;
				$("#area_codeMsg").html('This Is Required Field');
			}
			
			if(phone == "")
			{
				err=true;
				$("#phoneMsg").html('This Is Required Field');
			}

			if(contact_person == "")
			{
				err=true;
				$("#cpMsg").html('This Is Required Field');
			}
			
			if(warehouse == "select")
			{
				err=true;
				$("#warehouseMsg").html('This Is Required Field');
			}

			if(supplier_id==0 && customer_id==0)
			{
				var customer_fname=$.trim($('#customer_fname').val());
				var customer_lname=$.trim($('#customer_lname').val());
				var customer_email=$.trim($('#customer_email').val());
				var customer_mobile=$.trim($('#customer_mobile').val());
				var customer_password=$.trim($('#customer_password').val());
				var customer_confirm_password=$.trim($('#customer_confirm_password').val());
				
				if(customer_fname=='')
				{
					err=true;
					$("#fnameMsg").html('First name should not be blank');
				}
				else
				{
					var filter = /^[A-Za-z\s\']+$/;
					if(!filter.test(customer_fname))
					{
						err=true;
						$("#fnameMsg").html('Only Characters are allowed first name');
					}
				}

				if(customer_lname=='')
				{
					err=true;
					$("#lnameMsg").html('Last name should not be blank');
				}
				else
				{
					var filter = /^[A-Za-z\s\']+$/;
					if(!filter.test(customer_lname))
					{
						err=true;
						$("#lnameMsg").html('Only Characters are allowed last name');
					}
				}

				if(customer_email=='')
				{
					err=true;
					$("#ceMsg").html('Email Id should not be blank');
				}
				else if(!validateEmail(customer_email))
				{
					err=true;
					$("#ceMsg").html('Enter Valid email Id');
				}

				if(customer_mobile == '')
				{
					err=true;
					$("#cmMsg").html('Mobile number should not be blank');
				}
				else
				{
					if(customer_mobile.length != 10)
					{
						err=true;
						$("#cmMsg").html('Please enter a valid 10-digit mobile number (e.g. 9967XXXXXX)');
					}

					var filter = /^[0-9]+$/;
					if(!filter.test(customer_mobile))
					{
						err=true;
						$("#cmMsg").html('Please enter a valid 10-digit mobile number (e.g. 9967XXXXXX)');
					}
				}

				if(customer_password == '')
				{
					err=true;
					$("#pMsg").html('Password should not be blank');
				}
				else if(customer_password.length < 6)
				{
					err=true;
					$("#pMsg").html('Please enter atleast 6 characters for password');
				}

				if(customer_confirm_password == '')
				{
					err=true;
					$("#cnpMsg").html('Please confirm the password');
				}
				else if(customer_password!=customer_confirm_password)
				{
					err=true;
					$("#cnpMsg").html('passwords don\'t match');
				}
			}
			
			if(err==true)
			{
				return false;
			}*/
	});
	//supplier add edit form validation end   

	//POD upload code start
	$('.pod_upload').click(function(){
		var order_detail=$(this).attr("rel").split("__");
		$('#pod_entity_id').val(order_detail[0]);
		$('#pod_item_id').val(order_detail[1]);
		$('#pod_item_sku').val(order_detail[2]);
		$("#pod_upload_box").fadeIn(50); 
	});

	$('.pod_form_submit').bind('click',function() {
		var val = $("#check-data").val();

		if(val=="Submit")
		{
			
			$('form').ajaxForm({
				beforeSend: function() {
					status.empty();
					body = '';
					$("#check-data").attr("disabled", true);
					$("#check-data").val("Please wait...");
				},
				success: function() {
					$("#bulk").empty();
				},
				complete: function(xhr) {            
					status.empty();
					var res = $.parseJSON(xhr.responseText);
					if(res.error) {
						status.append("Please rectify the below mentioned errors.<br /></br />");
						scan(res.error);	
						status.append( body +"<br />");
						
						$("#check-data").attr("disabled", false);
						$("#check-data").val("Submit");
						hit=0;
					}
					else if(res.success){
						for(var i in res.success) {
							status.append(res.success[i]+"<br />");
						}
						
						$("#check-data").attr("disabled", false);
						$("#check-data").val("Submit");
						$('form').unbind('submit').find('input:submit,input:image,button:submit').unbind('click'); 
						window.setTimeout(function(){location.reload()},2000);
					}
					else {
						alert("Error");
					}
				},
				error:function(t) {
					console.log(t);
				}
			});
		}
	});

	$('.view_pod').click(function(){
		var pod_id=$(this).attr('rel');
		if(pod_id > 0)
		{
			path=root_url+'/merchant/podImage/'+pod_id;

			$.ajax({ 
				url: path,
				//data:{product_id:product_id},
				dataType:"html",
				type: "POST",
				success: function(data){
					$('#pod_image_div').html(data);
					$('#pod_view_box').fadeIn(50);
				},
				error: function(data){
					console.log('in error');
				}
			});
		}
	});
	
	
	
	$("#reset").click(function(){
		
		
			$('.checkdropship').hide();
		
		
	}); 
	
	//POD upload code end
});

if ($(".iframe").is('*') ) {
$('.iframe').fancybox({
'width': '1200px',
'height': '2800px',
'autoDimensions' : true,
'autoScale': true,
'transitionIn': 'fade',
'transitionOut': 'fade',
'type': 'iframe',
//'href': 'http://www.example.com'
});
} 
if(document.getElementById("state").value!='Other')
{
	$("#pincode").keypress(function(event)
		{
				return numeric(event);
		});
}

$("#phone").keypress(function(event)
{
	return numeric(event);
});

function setSelected(id)
{
	//alert(id);
	var checked=$('#'+id).is(":checked");
	if(checked)
	{
		$('#'+id+'_label').addClass('selected');
	}
	else
	{
		$('#'+id+'_label').removeClass('selected');
	}
}

function numeric(evt)
 {
        var charCode = (evt.which) ? evt.which : event.keyCode;
        if (charCode == 8 || charCode == 43 || charCode == 13 || ( charCode>=48 && charCode<=57)) {
        //if (charCode == 8 || charCode==39 || charCode==95 || (charCode>=65 && charCode<=90) || (charCode>=97 && charCode<=122)) {
        return true;
        }
        else {
            return false;
        }
}

function validateEmail(email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if( !emailReg.test( email ) ) {
    return false;
  } else {
    return true;
  }
}

function quick_view(id,term)

	{		
		//$('#load-quick-'+id).show();
		//$('#load-quick-a-'+id).hide();
		$.ajaxSetup({cache:true});
		if(id > 0){
			$.ajax({
				//url:root_url+'/merchant/livelistings/'+id,
				url:root_url+'/merchant/livelistings/',
				success:function(data){
					$('#quick_view').show();
					$('.quick_look').html(data);
					//$('#load-quick-'+id).hide();
					//$('#load-quick-a-'+id).show();
				},
                cache: true,
				error:function(xhr, error){
					$('#quick_view').show();				
					$('.quick_look').html('Please Try Later');
					//$('#load-quick-'+id).hide();
					//$('#load-quick-a-'+id).show();
				}
			});
		}
	}

	function scan(obj)
	{
		var k;
		if (obj instanceof Object) 
		{
			for (k in obj){
            if (obj.hasOwnProperty(k))
			{
                if(k instanceof String) 
				{
                   body += 'scanning property ' + k + '<br /> ';
                }
                scan( obj[k] );  
            }
        }
		}
		else 
		{
			body += ' ' + obj + '<br/>';
		};
	};
	
/**
 * Marketplace + Supplier  = Pure Marketplace
 * Marketplace + (Prakruti or Plaza) = On Demand
 * Warehouse + (Prakruti or Plaza) = Warehouse
 */
$('#td-type_of_stock').on('change', '#type_of_stock', function(){
	var options = '';
	$('#seller').html('');
	$('#span-seller-output').html('');
	if($.trim($(this).val()) == '138') {//Marketplace
		options += '<option value="">Please Select</option>';
	        options += '<option value="'+seller_option[0].id+'">'+seller_option[0].name+'</option>';
		
	} else if($.trim($(this).val()) == '139') {//Warehouse
		options += '<option value="">Please Select</option>';
		$.each(seller_option, function(index, value){
                    if(value.id != 1){
                        options += '<option value="'+value.id+'">'+value.name+'</option>';
                    }
                });
		type = true;
		toggleCustomer(true);
	}
	$('#seller').html(options);
});

function toggleCustomer(type){
	$('#table-customer-information :input').each(function(){
		$(this).attr('disabled', type);
		$(this).removeClass('error-border');
		if(type === false) {
			$(this).addClass('required');
		} else {
			$(this).removeClass('required');
		}
	});
}

function empty (mixed_var) {
	var undef, key, i, len;
	//var emptyValues = [undef, null, false, 0, "", "0"];
	var emptyValues = [undef, null, false, ""];
	
	for (i = 0, len = emptyValues.length; i < len; i++) {
		if (mixed_var === emptyValues[i]) {
			return true;
	    }
	}

	if (typeof mixed_var === "object") {
		for (key in mixed_var) {
	      // TODO: should we check for own properties only?
	      //if (mixed_var.hasOwnProperty(key)) {
	      return false;
	      //}
	    }
	    return true;
	}

	return false;
}

function showSelectedrecords(val)
{
	$('#selectedMsg').hide();
	if(val > 0)
	{
		if(val==1)
		{
			var order_item_id=0;
			$('.order_item:checked').each(function() {
				order_item_id = order_item_id + 1;
			});

			if(order_item_id > 0)
			{
				$('#countSel').text(order_item_id);
				$('#selectedMsg').show();

			}
		}

		if(val==3)
		{
			var order_item_id=0;
			$('.order_item:checked').each(function() {
				order_item_id = order_item_id + 1;
			});

			if(order_item_id > 0)
			{
				$('#countSel').text('All');
				$('#selectedMsg').show();

			}
		}
	}
	
}

function showother()
{
	
	if(document.getElementById("state").value=='Other')
	{
		$('#other_show').css('display','');
		$('#other').addClass('required');
		
	}
	else
	{
		$('#other_show').css('display','none');
		$('#other').removeClass('required');
		$('#other').removeClass('error-border');
		$('#pincode').removeClass('required');
		$('#pincode').removeClass('error-border');
		document.getElementById("other").value="";
		
	}
}

function showhidecourier()
{
	if(document.getElementById("dropship").value==1)
	{
		$('.checkdropship').css('display','');
		$('#list_of_courier').addClass('required');
		$('#pod_acceptance').addClass('required');
		
	}
	else
	{
		$('.checkdropship').css('display','none');
		$('#list_of_courier').removeClass('required');
		$('#pod_acceptance').removeClass('required');
		document.getElementById("pod_acceptance").value="";
		document.getElementById("list_of_courier").value="";
	}
}