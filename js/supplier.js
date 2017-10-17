$(document).ready(function(){

	$("#myform").submit(function()
	{
		$('.err').html('');
		var supplier_name = $.trim($("#supplier_name").val());
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
		//alert(buyerid)
		var list_of_courier=$.trim($("#list_of_courier").val());

		var err=false;
			if(supplier_name == "")
			{
				err=true;
				$("#nameMsg").html('This Is Required Field');
			}
			
			if(buyerid == "")
			{
				err=true;
				$("#buyerMsg").html('This Is Required Field');
			}
			
			if(list_of_courier == "")
			{
				err=true;
				$("#courierMsg").html('Courier Partner selection Required Field');
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
			/* if(area_code == "")
			{
				err=true;
				$("#area_codeMsg").html('This Is Required Field');
			}
 */
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
			
			if(err==true)
			{
				return false;
			}
	});

	$(".paging").click(function()
	{
		var page = $(this).attr('rel');
		$("#pageview").val(page);
		$("#submit").trigger("click");
	});

	$("#limit").change(function()
	{
		$("#submit").trigger("click");
	});

	$("#export").click(function()
	{
		//$("#submit").val('Export');
		//$('#listForm').attr('target', '_blank');
		//$("#submit").trigger("click");
		//$('#listForm').attr('target', '');
		//$("#submit").val('Submit');
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

	/* $('#delete').click(function(){
		var fields = $( "input:checked" ).length
		//alert(fields)
		if (fields == 0) 
		{ 
		   alert("Please select any record.");
			return false;
		} 
		else
		{
			var r=confirm("You are going to Delete Suppliers.");
			if (r)
			  {
				$("#action").val("delete");
				$("#submit").trigger("click");
			  }
			else
			  {
			  x="You pressed Cancel!";
			  }
		}  
	}); */
	
	$("#pincode").keypress(function(event)
	{
			return numeric(event);
	});
	
	$("#phone").keypress(function(event)
	{
			return numeric(event);
	});

	$("#phone2").keypress(function(event)
	{
			return numeric(event);
	});
	
	$("#selectAll").click(function()
	{
		$('.supplierid_cb').attr('checked','checked');
	});
	
	$("#unselectAll").click(function()
	{
		$('.supplierid_cb').removeAttr('checked');
	});
        
        $("#update_supplier_account_button").click(function(){
            var is_valid = true;
            if($('#payee_name').val() == '') {
                is_valid = false;
                alert("Please enter payee name.");
            } else if($('#account_number').val() == '') {
                is_valid = false;
                alert('Please enter account number.');
            } else if($('#IFSC_code').val() == '') {
                is_valid = false;
                alert("Please enter IFSC code.");
            } 
            
            if(is_valid == true) {
                var url = root_url + "/merchant_listing/updatesupplieraccount";
                var data = $('#update_supplier_account').serialize();

                $.ajax({
                    type: "POST",
                    url: url,
                    data: data,
                    dataType: 'json',
                    beforeSend: function() {
                        //$("#save-data").attr("disabled", true);
                    },
                    success: function(return_data){
                        if(return_data.status == 1) {
                            parent.location.reload();
                        } else {
                            alert(return_data.error_message);
                        }
                    }
                });
            }
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

function validateEmail(email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  if( !emailReg.test( email ) ) {
    return false;
  } else {
    return true;
  }
}

function ValidateString(name){    
    re = /^[A-Za-z]+$/;
    if(!re.test(name))
		 return false;
	else
		return true;
}



