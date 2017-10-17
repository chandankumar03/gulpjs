$(document).ready(function()
{
	$("#add_customer_value_form").submit(function()
	{
		var search_value = $.trim($("#search_val").val());
		if(search_value=="")
		{
			$("#errMsg").html('Please insert search value.');
			return false;
		}	
	});
	
	$(".paging").click(function()
			{
				var page = $(this).attr('rel');
				$("#pageview").val(page);
				$("#submit1").trigger("click");
			});

			$("#limit").change(function()
			{
						$("#submit1").trigger("click");
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
				$("#submit1").trigger("click");
			});
});

function delete_entry(id)
{
	var response = confirm('Do you want to remove this entry?');
	if(response == false)
	{	
		return false;
	}
	else 
	{
		$.ajax({
		  type: "POST",
		  url: root_url+"/vipcustomer/delete",
		  data: { id:id }
		})
		  .done(function(data) {
			  alert(data);
			parent.location.reload(true); 
		  });
	}
}
