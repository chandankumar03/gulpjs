$(document).ready(function(){ 

	$("#coupon_code").hide();
	$("#uses_per_coupon").hide();
	
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
		var sort_s=$("#order_by").val();
		var sort=sort_s.trim();
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
	
	var currentTime = new Date();
	var day = currentTime.getDate();
	var month = currentTime.getMonth() + 1;
	var year = currentTime.getFullYear();
	var today_date = year + "-" + month + "-" + day;
	$('#from_from_date').DatePicker({
		format:'Y-m-d',
		date:today_date,
		current:today_date,
		starts: 1,
		position: 'r',
		onBeforeShow: function(){
			//$('#custom_design_from').DatePickerSetDate($('#custom_design_from').val(), true);
		},
		onChange: function(formated, dates){
			$('#from_from_date').val(formated);
			$('#from_from_date').DatePickerHide();
		}
	});
	
	$('#to_from_date').DatePicker({
		format:'Y-m-d',
		date:today_date,
		current:today_date,
		starts: 1,
		position: 'r',
		onBeforeShow: function(){
			//$('#custom_design_from').DatePickerSetDate($('#custom_design_from').val(), true);
		},
		onChange: function(formated, dates){
			$('#to_from_date').val(formated);
			$('#to_from_date').DatePickerHide();
		}
	});
	
	$('#from_to_date').DatePicker({
		format:'Y-m-d',
		date:today_date,
		current:today_date,
		starts: 1,
		position: 'r',
		onBeforeShow: function(){
			//$('#custom_design_from').DatePickerSetDate($('#custom_design_from').val(), true);
		},
		onChange: function(formated, dates){
			$('#from_to_date').val(formated);
			$('#from_to_date').DatePickerHide();
		}
	});
	
	$('#to_to_date').DatePicker({
		format:'Y-m-d',
		date:today_date,
		current:today_date,
		starts: 1,
		position: 'r',
		onBeforeShow: function(){
			//$('#custom_design_from').DatePickerSetDate($('#custom_design_from').val(), true);
		},
		onChange: function(formated, dates){
			$('#to_to_date').val(formated);
			$('#to_to_date').DatePickerHide();
		}
	});
	
	$('#from_date').DatePicker({
		format:'Y-m-d',
		date:today_date,
		current:today_date,
		starts: 1,
		position: 'r',
		onBeforeShow: function(){
			//$('#custom_design_from').DatePickerSetDate($('#custom_design_from').val(), true);
		},
		onChange: function(formated, dates){
			$('#from_date').val(formated);
			$('#from_date').DatePickerHide();
		}
	});
	
	$('#to_date').DatePicker({
		format:'Y-m-d',
		date:today_date,
		current:today_date,
		starts: 1,
		position: 'r',
		onBeforeShow: function(){
			//$('#custom_design_from').DatePickerSetDate($('#custom_design_from').val(), true);
		},
		onChange: function(formated, dates){
			$('#to_date').val(formated);
			$('#to_date').DatePickerHide();
		}
	});
		
	$("#rule_id").keypress(function(event)
	{
			return numeric(event);
			
	});
	
	$("#uses").keypress(function(event)
	{
			return numeric(event);
			
	});
	
	$("#priority").keypress(function(event)
	{
			return numeric(event);
			
	});
	
	$("#points_amount").keypress(function(event)
	{
			return numeric(event);
			
	});
	
	$("#max_redeem_points").keypress(function(event)
	{
			return numeric(event);
			
	});
	
	$("#discount_amount").keypress(function(event)
	{
			return numeric(event);
			
	});
	
	$("#coupon").change(function() {
			var coupon = $(this).val();
			if(coupon==2)
			{
				$("#coupon_code").show();
				$("#uses_per_coupon").show();
			}	
			else
			{
				$("#coupon_code").hide();
				$("#uses_per_coupon").hide();
			} 
		});
		
	$('#tab-container').easytabs({
		    animate: false,
		    tabActiveClass: "selected-tab",
		    panelActiveClass: "displayed"
		  });
	$('#coupon').trigger('change');	
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


