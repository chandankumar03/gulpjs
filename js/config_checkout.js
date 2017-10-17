 $(document).ready(function()
 {
	if($('div.trigger').length > 0)
	{
		
		$('div.trigger').click(function()
		{
			if($(this).hasClass('open') )
			{
				$(this).removeClass('open');
				$(this).addClass('close');
				$(this).next().slideDown(100);
				return false;
			} else 
			{
				$(this).removeClass('close');
				$(this).addClass('open');
				$(this).next().slideUp(100);
				return false;

			}
		})

	}
	
	$("#QuoteLifetime").keypress(function(event)
	{
			return numeric(event);
			
	});
	
	$("#MaxDisplay").keypress(function(event)
	{
			return numeric(event);
			
	});

	//pagination code start

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

	//pagination code end
});

function check_visibles()
{
		var checked = $("#chb_").prop("checked");
		//alert(checked); return false;
		$(".optioncheckbox").each(function(){
			$(this).prop("checked", checked);
		});
}

function submitform()
{
	document.getElementById('config_edit_form').submit();
	
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