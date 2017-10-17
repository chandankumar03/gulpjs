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
        
    });
    
    