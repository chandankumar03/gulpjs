$('.qty-input').change(function(){
	$('.update-button').prop('disabled', false);
	$('.update-button').removeClass('disabled');
});
$('.update-button').prop('disabled', true);
$('.update-button').addClass('disabled');

function isset ()
{


  var a = arguments,
    l = a.length,
    i = 0,
    undef;

  if (l === 0)
  {
    throw new Error('Empty isset');
  }

  while (i !== l)
  {
    if (a[i] === undef || a[i] === null)
    {
      return false;
    }
    i++;
  }
  return true;
}

function submitCreditMemoOffline(order_id)
{
	var maxkey=document.getElementById('maxkey').value;
	var count=0;

	for(var i=1;i<maxkey;i++)
	{
	 	//alert(isset(document.getElementById("rfq"+i)))

		  if(isset(document.getElementById("rfq"+i)) && document.getElementById("rfq"+i).value>0)
		  {
			  count=1;
		  }

	}

 if(count==0)
 {
	 alert('Please select qty for refund');
	 return false;
 }


  else if(document.getElementById('creditmemo_sub_status').value=='')
  {
	  // alert('Please select credit memo sub status');
	  alert('Please select Reason');
	  return false;
  }

else if(document.getElementById('sub_status').value=='')
  {
	  // alert('Please select credit memo sub status');
	  alert('Please select Sub Reason');
	  return false;
  }

  else if(document.getElementById('sub_sub_status').value=='')
  {
	  // alert('Please select credit memo sub status');
	  alert('Please select Sub Sub Reason');
	  return false;
  }
  else
  {
	  document.getElementById('refundoff').disabled=true;
	order_id = parseInt(order_id);
	if(order_id > 0){
		var serizeform   = $('#creditmemo').serialize();
		$.ajax({
			url:site_url+'/sales_creditmemo/addCreditMemo/'+order_id,
			type:'post',
			data:serizeform,
			success:function(data){
				var res =data.trim();
				if(res=='success')
				{
				  alert('Order is Refunded');
				parent.location.reload();
				}else
				{
					alert(res);
				}
			},
			error: function(){

			}
		});
	}
  }
}







function refunddonation()
{

	var orderGrandTotal=parseInt($('#orderGrandTotal').text().replace(',',''));
	var charity1=parseInt($('#charity1').text().replace(',',''));
	if(document.getElementById('charity').value=='Yes')
	{
		$("#orderGrandTotal").text(orderGrandTotal + charity1);
	}else
	{
		$("#orderGrandTotal").text(orderGrandTotal - charity1);
	}
	//charity
	//$("#orderGrandTotal").text(Math.round(calcGrandTotal));
}

function refund(id)
{
	
		var id=id;
		var orq;
		var rfq;
		var total_invoiced;
		var maxkey;
		var shiping;
		var total_refund=0;
                var fePointsTotal=0;
                var is_furniture_exchange = $("#is_furniture_exchange").val();
                
		/*if(document.getElementById("rfq"+id).checked==true)
		{
			orq=$("#orq"+id).val();
			rfq=$("#rfq"+id).val();
		}else
		{
			orq=0;
			rfq=0;
		}*/
		orq=$("#orq"+id).val();
		rfq=$("#rfq"+id).val();

		total_invoiced=$("#total_invoiced").val();
		maxkey=$("#maxkey").val();
		shiping=$("#shiping").val();
		var can_refund=false;
		final_emi_dis = 0;
		for(var c=1; c<maxkey;c++)
		{

			if($("#maxrefund"+c).val()==$("#rfq"+c).val())
			{
				can_refund=true;
			}
			
			//Added by prathamesh for no cost emi
			temp_orq		= $("#maxrefund"+c).val();
			temp_rfq		= $("#rfq"+c).val();
			if(typeof temp_orq != "undefined" && typeof temp_rfq != "undefined") {
				final_emi_dis  += Math.ceil(($("#emiDiscountTotal"+c).text().replace(/,/g,'')/temp_orq)*temp_rfq);
			}
		}
		
		if(rfq > orq)
		{
			var name=$("#name"+id).val();
			alert("In valid Quantity For Refund Of "+name);
			//$("#rfq"+id).val(orq);
		}
		else
		{
			var subTotalAmount=$('#subTotal'+id).text().replace(/,/g,'');
			var discountAmount=$("#discountTotal"+id).text().replace(/,/g,'');
			var rowTotalAmount=$("#rowTotal"+id).text().replace(/,/g,'');

                        if(is_furniture_exchange==1)
                        {
                            var pointsUsed=$("#exchange_points_used"+id).val().replace(/,/g,'');
                            if(rfq > 0){
                                var maxeRefundQty = parseInt($('#rfq'+id+' option:last-child').val());
                                var eachItemPoints = parseInt(pointsUsed) / parseInt(maxeRefundQty);
                                var pointsTotal = eachItemPoints * rfq;
                            }else{
                                var pointsTotal = 0;
                            }
                        }else{
                            var pointsTotal = 0;
                        }



			//alert(subTotalAmount + '--' + discountAmount + '--' + rowTotalAmount);
			//return false;
			var price=$("#price"+id).val();
			var tax=$("#tax_amount"+id).val();
			var discount=$("#discount"+id).val();
			var subTotal=price * rfq;
			var grandrowtotal=$("#grandrowtotal"+id).val();
			var perqtyrefund=grandrowtotal*rfq;
			//alert(perqtyrefund);
			var discountTotal=parseInt(discount) * parseInt(rfq);
			var taxAmount=tax * rfq;

			//alert(grandrowtotal);
			var row_total= Math.ceil((subTotal + taxAmount) - discountTotal - pointsTotal);
			//alert(row_total);
			if(parseInt(grandrowtotal)< parseInt(row_total))
			{
				$("#subTotal"+id).text(Math.round(grandrowtotal));
				row_total=grandrowtotal;

			}else
			{
				$("#subTotal"+id).text(Math.round(subTotal));
			}
			//alert(row_total);

			$("#taxTotal"+id).text(Math.round(taxAmount));
			$("#discountTotal"+id).text(Math.round(discountTotal));
			$("#rowTotal"+id).text(Math.round(row_total));

                        if(is_furniture_exchange==1)
                        {
                            $("#each_item_exchange_points"+id).val(Math.round(pointsTotal));
                            $("#eachFe"+id).html(Math.round(pointsTotal));

                            $(".feLoop").each(function( index ) {
                                fePointsTotal += parseInt($(this).val());
                            });

                            $("#pointsUsedBottom").text(Math.round(fePointsTotal));
                        }

                        //console.log(fePointsTotal);
			var orderSubTotal=$('#orderSubTotal').text().replace(/,/g,'');
			var orderDiscount=$('#orderDiscount').text().replace(/,/g,'');
			var orderGrandTotal=$('#orderGrandTotal').text().replace(/,/g,'');

			if(typeof $("#AllEmiDiscount_var").val() != "undefined") {
				orderGrandTotal = parseInt(orderGrandTotal) + parseInt($("#AllEmiDiscount_var").val());
			}
				


       		//alert(orderDiscount);
			//alert(discountAmount);
			//alert(discountTotal);

			var calcSubTotal=(parseInt(orderSubTotal) - parseInt(subTotalAmount)) + parseInt(subTotal);
			var calcDiscountTotal=Math.abs((parseInt(orderDiscount) - parseInt(discountAmount))) + parseInt(discountTotal);
			if(can_refund==true)
			{
				if(document.getElementById("shiping").value==0)
				{
                                        //alert('orderGrandTotal :'+ orderGrandTotal + ' rowTotalAmount : ' + rowTotalAmount + ' row_total : ' + row_total);
					var tota=(parseInt(orderGrandTotal) - parseInt(rowTotalAmount)) + parseInt(row_total);
					var calcGrandTotal=(parseInt(tota) + parseInt(document.getElementById("shiping1").value));
					document.getElementById("shiping").value=document.getElementById("shiping1").value;
				}else
				{
                                        //alert(2);
					var calcGrandTotal=(parseInt(orderGrandTotal) - parseInt(rowTotalAmount)) + parseInt(row_total);
				}
			}else
			{
                                //alert(3);
                                    var tota=(parseInt(orderGrandTotal) - parseInt(rowTotalAmount)) + parseInt(row_total);
				var calcGrandTotal=(parseInt(tota) - parseInt(shiping));
				document.getElementById("shiping").value=0;
			}
                        calcGrandTotal = calcGrandTotal - final_emi_dis;
            
			//calcDiscountTotal='-'+calcDiscountTotal;
            if(calcSubTotal < 0){
            	calcSubTotal = 0;
            }
            if(calcGrandTotal < 0){
            	calcGrandTotal = 0;
            }
			$("#orderSubTotal").text(Math.round(calcSubTotal));
			$("#orderDiscount").text(Math.round(calcDiscountTotal));
            $("#orderEmiDiscount").text(Math.round(final_emi_dis));
            $("#AllEmiDiscount_var").val(Math.round(final_emi_dis));
			$("#orderGrandTotal").text(Math.round(calcGrandTotal));

		}

}



function fullrefund(id)
{
                var id=id;
		var orq;
		var rfq;
		var total_invoiced;
		var maxkey;
		var shiping;
		var total_refund=0;
		var reimbursement;
                var pointsDB=0;
                var is_furniture_exchange = $("#is_furniture_exchange").val();
		/*if(document.getElementById("rfq"+id).checked==true)
		{
			orq=$("#orq"+id).val();
			rfq=$("#rfq"+id).val();
		}else
		{
			orq=0;
			rfq=0;
		}*/
		orq=$("#orq"+id).val();
		rfq=$("#rfq"+id).val();
		reimbursement=$("#reimbursement"+id).val();

                total_invoiced=$("#total_invoiced").val();
		maxkey=$("#maxkey").val();
		shiping=$("#shiping").val();
		var can_refund=false;
		var rowTotalAmount=$("#rowTotal"+id).text().replace(/,/g,'');
		var gtotal=$("#gtotal").val();
                var partPayVal = $('#part_pay_val'+id).val();

                if(partPayVal>0){
                    var compareAmnt = partPayVal;
                }else{
                    var compareAmnt = parseInt(document.getElementById('grandtotal'+id).value);
                }

		if(parseInt(document.getElementById('reimbursement'+id).value) > compareAmnt)
		{

			alert("In valid Amount For Refund Of ");
			document.getElementById("reimbursement"+id).value='';
			document.getElementById("reimbursement"+id).focus();
			return false;

		}
		/*
		if($("#rfq"+id).is(':checked'))
                {
                    //do nothing.
                }else
                {
                    document.getElementById('reimbursement'+id).value='';
                }
                */
		for(var c=1; c<maxkey;c++)
		{
			//alert(document.getElementById("rfq"+c));

			if(document.getElementById("rfq"+c)!=null && document.getElementById("rfq"+c).checked==true)
			{
                                /*
                                if(is_furniture_exchange==1)
                                {
                                        pointsDB=$("#pointsDB"+id).html();
                                }
                                else
                                {
                                        pointsDB=0;
                                }
                                */
								can_refund=true;
                                var finalVal = $('#rowTotal'+c).html().replace(/,/g,'');
                                var noCostEmi = $('#emiDiscountTotal'+c).html().replace(/,/g,'');
                                var partPayVal = $('#part_pay_val'+c).val();
                                if(partPayVal>0){
                                    finalVal = partPayVal;
                                }
                                //finalVal -= (noCostEmi/temp_orq)*(temp_orq-temp_rfq);
                                //document.getElementById('reimbursement'+c).value=Math.floor(finalVal);//document.getElementById('grandtotal'+c).value;
                                if(noCostEmi>0){
                                	document.getElementById('reimbursement'+c).value= $('#rowTotalBalance'+c).html().replace(/,/g,'');
                                }
                                else {
                                	document.getElementById('reimbursement'+c).value=finalVal;
                                }
				//document.getElementById("reimbursement"+id).value=rowTotalAmount;
				//total_refund=rowTotalAmount;

			}


		}
		total_noCostEmi = 0;
                for(var c=1; c<maxkey;c++)
		{

			if($("#reimbursement"+c).val()>0)
			{
				total_refund=parseInt(total_refund)+parseInt(Math.ceil($("#reimbursement"+c).val()));
				total_noCostEmi += parseInt(Math.ceil($("#emiDiscountTotal"+c).html().replace(/,/g,'')));
			}


		}
		//alert(total_refund);

		var orderSubTotal=$('#orderSubTotal').text().replace(/,/g,'');

		if(parseInt(total_refund)>parseInt(gtotal))
		{
			//var name=$("#name"+id).val();
			alert("In valid Amount For Refund Of ");
			document.getElementById("reimbursement"+id).value='';
			document.getElementById("reimbursement"+id).focus();
			//$("#rfq"+id).val(orq);
		}
		else
		{
			/*var subTotalAmount=$('#subTotal'+id).text().replace(',','');
			var discountAmount=$("#discountTotal"+id).text().replace(',','');
			var rowTotalAmount=$("#rowTotal"+id).text().replace(',','');

			//alert(subTotalAmount + '--' + discountAmount + '--' + rowTotalAmount);
			//return false;
			var price=$("#price"+id).val();
			var tax=$("#tax_amount"+id).val();
			var discount=$("#discount"+id).val();
			var subTotal=price * rfq;
			var discountTotal=parseInt(discount) * parseInt(rfq);
			var taxAmount=tax * rfq;
			var row_total=(subTotal + taxAmount) - discountTotal;

			$("#subTotal"+id).text(Math.round(subTotal));
			$("#taxTotal"+id).text(Math.round(taxAmount));
			$("#discountTotal"+id).text(Math.round(discountTotal));
			$("#rowTotal"+id).text(Math.round(row_total));*/

			var orderSubTotal=$('#orderSubTotal').text().replace(/,/g,'');
			var orderDiscount=$('#orderDiscount').text().replace(/,/g,'');
			//var orderGrandTotal=$('#orderGrandTotal').text().replace(',','');
			var orderGrandTotal=$("#gtotal").val();

       		//alert(orderDiscount);
			//alert(discountAmount);
			//alert(discountTotal);

			//var calcSubTotal=(parseInt(orderSubTotal) - parseInt(subTotalAmount)) + parseInt(subTotal);
			//var calcDiscountTotal=Math.abs((parseInt(orderDiscount) - parseInt(discountAmount))) + parseInt(discountTotal);
			if(can_refund==true)
			{
				var tota=(parseInt(orderGrandTotal) - parseInt(total_refund));
				var calcGrandTotal=(parseInt(tota) - parseInt(shiping));
				document.getElementById("shiping").value=0;
			}else
			{
				var calcGrandTotal=(parseInt(orderGrandTotal) - parseInt(total_refund));

			}
			//calcDiscountTotal='-'+calcDiscountTotal;
			//$("#orderSubTotal").text(Math.round(calcSubTotal));
			//$("#orderDiscount").text(Math.round(calcDiscountTotal));
			$("#orderGrandTotal").text(Math.round(total_refund));
			$("#orderEmiDiscount").text(Math.round(total_noCostEmi));
		}

}


function submitfullOffline(order_id)
{
	var maxkey=document.getElementById('maxkey').value;
	var count=0;

	for(var i=1;i<maxkey;i++)
	{
	 	//alert(isset(document.getElementById("rfq"+i)))

		  if(document.getElementById("reimbursement"+i).value!='' && document.getElementById("reimbursement"+i).value!=0)
		  {
			  count=1;
		  }

	}

 if(count==0)
 {
	 alert('Please enter amount for refund');
	 return false;
 }


  else if(document.getElementById('creditmemo_sub_status_fr').value=='')
  {
	  alert('Please select Reason');
	  return false;
  }

else if(document.getElementById('sub_status_fr').value=='')
  {
	  alert('Please select Sub Reason');
	  return false;
  }

else if(document.getElementById('sub_sub_status_fr').value=='')
  {
	  alert('Please select Sub Sub Reason');
	  return false;
  }

  else
  {
	  document.getElementById('refundoff').disabled=true;
	order_id = parseInt(order_id);
	if(order_id > 0){
		var serizeform   = $('#creditmemo').serialize();
		$.ajax({
			url:site_url+'/sales_creditmemo/addfullrefundCreditMemo/'+order_id,
			type:'post',
			data:serizeform,
			success:function(data){
				var res =data.trim();
				if(res=='success')
				{
				  alert('Order is Refunded');
				parent.location.reload();
				}else
				{
					alert(res);
				}
			},
			error: function(){

			}
		});
	}
  }
}


function isNumberKey(evt)
{
  var charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode != 46 && charCode > 31
	&& (charCode < 48 || charCode > 57))
	 return false;

  return true;
}

function validateCreditMemo(){
    if($('#credit_memo_status_name').val() == '') {
       alert('Please enter Credit Memo Status Name.');
       return false;
    }
    else if($('#templateid').val() == '') {
        alert('Please Select Email Template.');
       return false;
    }
    else {
        return true;
    }

}

//<!-- updated at 6 august 2015. -->
