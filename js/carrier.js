$(document).ready(function(){ 

	$("#carriers_specificcountry").prop("disabled", true); 
	$(".paging").click(function()
	{
		var page = $(this).attr('rel');
		//alert(page)
		$("#page").val(page);
		$("#pageview").val(page);
		$("#submit").trigger("click");
	});

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

	$("#carriers_sallowspecific").change(function() {
		var allowspecific = $(this).val();
		if(allowspecific==1)
		{
			$("#carriers_specificcountry").prop("disabled", false);
		}	
		else
		{
			$("#carriers_specificcountry").prop("disabled", true);
		} 
	});
	
	$("#carrier_id").keypress(function(event)
	{
			return numeric(event);
			
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