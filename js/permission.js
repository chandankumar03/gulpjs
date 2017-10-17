$(document).ready(function(){
	$("#userform").submit(function()
	{
		//alert('Hi');
		$('.err').html('');
		var username = $.trim($("#username").val());
		var firstname=$.trim($("#firstname").val());
		var lastname=$.trim($("#lastname").val());
		var email=$.trim($("#email").val());
		var password=$.trim($("#password").val());
		var passconf=$.trim($("#passconf").val());
		var role=$.trim($("#role").val());
		var submit=$("#submit").val();
		var err=false;
			if(username == "")
			{
				err=true;
				$("#nameMsg").html('This Is Required Field');
			}
			/*if(buyerid == "")
			{
				err=true;
				$("#buyerMsg").html('This Is Required Field');
			}*/
			if(firstname == "")
			{
				err=true;
				$("#fnameMsg").html('This Is Required Field');
			}
			if(lastname == "")
			{
				err=true;
				$("#lnameMsg").html('This Is Required Field');
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

			if(submit=='Save')
			{
				if(password == "")
				{
					err=true;
					$("#passwordMsg").html('This Is Required Field');
				}

				if(passconf == "")
				{
					err=true;
					$("#passconfMsg").html('This Is Required Field');
				}

				if(password===passconf)
					var valid=1;
				else
				{
					err=true;
					$("#passconfMsg").html('Enter Exact Password as above.');
				}
			}
			else if(submit=='Update')
			{
				if(password !='')
				{
					if(passconf=='')
					{
						err=true;
						$("#passconfMsg").html('This Is Required Field');
					}
					else
					{
						if(password===passconf)
							var valid=1;
						else
						{
							err=true;
							$("#passconfMsg").html('Enter Exact Password as above.');
						}
					}
				}

				if(passconf !='')
				{
					if(password=='')
					{
						err=true;
						$("#passwordMsg").html('This Is Required Field');
					}
				}
			}

			if(role == "")
			{
				err=true;
				$("#roleMsg").html('This Is Required Field');
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
		$("#submit").val('Export');
		$("#submit").trigger("click");
		$("#submit").val('Submit');
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
		$('.supplierid_cb').attr('checked','checked');
	});
	
	$("#unselectAll").click(function()
	{
		$('.supplierid_cb').removeAttr('checked');
	});

	$("#all").change(function()
	{
		//alert(1);
		//to be seen for toggling
		$('#resource_container').show();
		$('.level0').removeAttr('checked');
		$('.level1').removeAttr('checked');
		$('.level2').removeAttr('checked');
		$('.level3').removeAttr('checked');
		
	});

	$(".level0").click(function()
	{
		var val=$(this).val();
		$('.level0').removeAttr('checked');
		$('.level1').removeAttr('checked');
		$('.level2').removeAttr('checked');
		$('.level3').removeAttr('checked');
		
		$(this).attr('checked','checked');
		$('.resource_tree1').css("display", "none");
		$('.resource_tree2').css("display", "none");
		$('.resource_tree3').css("display", "none");
		$('#resource_tree'+val).css("display", "block");
	});

	$(".level1").click(function()
	{
		var val=$(this).val();
		$('.level2').removeAttr('checked');
		$('.level3').removeAttr('checked');
		$(this).attr('checked','checked');
		$('.resource_tree2').css("display", "none");
		$('#resource_tree'+val).css("display", "block");
	});

	$(".level2").click(function()
	{
		var val=$(this).val();
		$('.level2').removeAttr('checked');
		$('.level3').removeAttr('checked');
		
		$(this).attr('checked','checked');
		$('.resource_tree3').css("display", "none");
		$('#resource_tree'+val).css("display", "block");
	});
	$(".level3").click(function()
	{
		var val=$(this).val();
		$('.level3').removeAttr('checked');
		$(this).attr('checked','checked');
	});

	$("#selectCheck").click(function(){
		if($(this).attr('checked'))
		{
			$('input:checkbox').attr('checked',true);
		}
		else
		{
			$('input:checkbox').attr('checked',false);
		}
	});

	$("#roleForm").submit(function()
	{
		$('.err').html('');
		var role_name = $.trim($("#role_name").val());
		var resource_id=$('.data0:checked').val();
		//alert(resource_id);
		var err=false;
		

		if(role_name=='')
		{
			err=true;;
			$("#nameMsg").html('This is required Field');
		}

		if(!resource_id)
		{
			err=true;;
			$("#roleMsg").html('Select Any Parent Resource');
		}

		if(err==true)
		{
			return false;
		}
		
	});
	
});

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