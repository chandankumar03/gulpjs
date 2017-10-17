$(document).ready(function(){ 

	$(".paging").click(function()
	{
		var page = $(this).attr('rel');
		//alert(page)
		$("#page").val(page);
		$("#pageview").val(page);
		$("#search").trigger("click");
	});

	$("#limit").change(function()
	{
		$("#search").trigger("click");
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
		$("#search").trigger("click");
	});

	
	$("#chkbox").change(function () {
		var checkbox=$('#chkbox :selected').val();
		if(checkbox=="all")
		{
			$('.case').attr('checked', 'checked');
			countChecked();	
			$( "input[type=checkbox]" ).on( "click", countChecked );
		}	
		else
		{
			$('.case').removeAttr('checked', 'checked');
			countChecked();	
			$( "input[type=checkbox]" ).on( "click", countChecked );
		}	
	});
	
});

var countChecked = function() {
  var n = $( "input:checked" ).length;
  $( "#sel" ).text( n + (n === 1 ? " is" : " are") + " selected" );
};
countChecked();
 
$( "input[type=checkbox]" ).on( "click", countChecked );

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

function make_sure() 
{
	var n = $( "input:checked" ).length;
	var action=$("#action :selected").text();
	//alert(action)
	if(action=='Select')
	{
		alert("Please select action.");
		return false;
	}
	if(n==0)
	{
		alert("Please select pincode.");
		return false;
	}
	else
	{
		var confirmMsg=confirm("Are you sure you want to Delete Pincode");
        if (confirmMsg==true)
        {
			$('#PincodeList').submit();
		}
	}
}