	$("#updateQty").click(function(){
		
		var count = $("#items").val();
		var msg = '';
		
		var totalPrice = 0;
		
		var sub = parseInt("0");
		var disc = 0;
		var grand = 0;
		
		for(var i = 0; i < count ; i++ ){
			var price  = parseInt($("#qtyPrice-"+i).val()); 
			var orderdQty = parseInt($("#qtyOrderd-"+i).html()); 
			var discount1  =  $("#discount-"+i).val(); 
			var invoiceQty = $("#itemQty-"+i).val(); 
			if(invoiceQty > orderdQty){
				msg = "Invalid Quantity";
			} else {
			    
			    var subtotal = price * invoiceQty;
				var discount = discount1 * invoiceQty;
				var rowTotal = subtotal - discount;
				
				$("#dis-"+i).html(parseFloat(Math.round(discount * invoiceQty)));
				$("#price-"+i).html(parseFloat(Math.round(price * invoiceQty)));
				$("#row_total-"+i).html(parseFloat(Math.round(rowTotal)));
				$("#validQty").val("true");
				
			    
				totalPrice = parseFloat(Math.round(totalPrice + (subtotal - discount)));
				sub = sub + subtotal;
				disc = disc + discount;
				
			}
			
		}
		
		if(msg == ''){
		   	var GTotal =  totalPrice - discount;
			var total = sub - disc;
			if(total != 0){
				$("#subtotal").html(parseFloat(Math.round(sub)));
				$("#tdisc").html(parseFloat(Math.round(disc)));
				$("#tdiscount").val(parseFloat(Math.round(disc)));
				$("#subTotal").val(parseFloat(Math.round(sub)));
				$("#grandTotal").val(parseFloat(Math.round(total)));
				$("#Grand_Total").html(parseFloat(Math.round(total)));
			} else {
				alert("Zero invoice amount not allowed");
			}
		} else {
			alert(msg);
		}
		
	});

function checkshipping()
{
	var shipping=parseInt(document.getElementById('tShipping').value);
	var Grand_Total= parseInt($("#Grand_Total").html());
	var shiping= parseInt($("#shiping").html());
	if(document.getElementById('applyshipping').value=='Yes')
	{
		$("#Grand_Total").html(parseFloat(Math.round(Grand_Total+shipping)));
		$("#shiping").html(parseFloat(Math.round(shiping+shipping)));
		
	}else
	{
		$("#Grand_Total").html(parseFloat(Math.round(Grand_Total-shipping)));
		$("#shiping").html(parseFloat(Math.round(shiping-shipping)));
	}
	
	
}

function enabletrans()
{
	if(document.getElementById('checkmo').checked==true)
	{
		document.getElementById("transaction_id").disabled=false;
	}else
	{
		
		document.getElementById("transaction_id").value="";
		document.getElementById("transaction_id").disabled=true;
	}
}
	
  function confirmInvoice(){
	    
	    /* Code Added and Modified by Prashant Pawar For B2B Offline orders changes on 09/09/2016, Start */
	    var increment_id = document.getElementById("increment_id").value.trim();
	    increment_id = increment_id.toLowerCase();
	    var offLineOrder = false;

	    if (document.getElementById("transaction_id").value.trim()=="" && increment_id.lastIndexOf("tcs", 0) === 0) {
	    	offLineOrder = true;
	    	document.getElementById('checkmo').checked = true;
	    	enabletrans();
	    	alert("Order is Offline so Please Enter Transaction Id");
	    	return false;
	    }
	    /* Code Added and Modified by Prashant Pawar For B2B Offline orders changes on 09/09/2016, End */

		if(document.getElementById('checkmo').checked==true)
		{
			if(document.getElementById("transaction_id").value.trim()=="")
			{
				alert("Please Enter Transaction Id");
				return false;
			}
		}else
		{
			document.getElementById("transaction_id").value="";
		}
		var responce = confirm("Want to confirm this order?");
		if(responce == true){
			
			$('#submit').val('Please wait.......');
			document.getElementById('submit').disabled=true;
			
			var path  = site_url+"/sales_invoice/saveInvoice/"; 
			$.ajax({ url: path,
						data:$("#myForm").serialize(),
						//dataType:"json",
                		type: "POST",
						beforeSend : function(){
                			$("#login_error").html('<image src="'+ site_url+'/media/image/opc-ajax-loader.gif"/></center>');
           				},
					   	success: function(data){
						  
						   if(data=='Invoice created')
						   {
							    alert('Order is Confirmed');
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
		
		
	};
	
	
	function confirmEditInvoice(){
		var responce = confirm("Want to confirm this order?");
		if(document.getElementById('paymentmode').checked==false || document.getElementById('Comment').value=='')
		{
			alert('Please enter order detail');
			return false;
		}
		else
		{
			
		if(responce == true){
			var path  = site_url+"/sales_invoice/createInvoiceForEditOrder/"; 
			$.ajax({ url: path,
						data:$("#myForm").serialize(),
						//dataType:"json",
                		type: "POST",
						beforeSend : function(){
                			$("#login_error").html('<center><image src="'+ site_url+'/media/image/opc-ajax-loader.gif"/></center>');
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
		
	};
	