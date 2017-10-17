var timer = 0;
function performAction(action) {
	//alert(legalActions[action]); return false;
	
	if(action in legalActions) {
		var val = [];
		$( ".productcheckbox:checked" ).each(function() { 
			val.push(this.name); //get tr ids 
		});
		//console.log(val.toSource()); return false;	
		if(val.length > 0) {
			if(confirm("Are you sure you want to perform " +  legalActions[$("#drpAction").val()] + " action?")) {
				if(confirm("Pakka?")) {
					//var ids=val.join();
					//var query_str = "ids=" + ids + "&action=" + action;
					//alert(query_str); return false;
					//console.log($("form").serialize()); exit();
					var query_str = $("form").serialize() + "&action=" + action;
					if($.trim($('#users').val()) != "") {
						query_str += '&user='+$('#users').val();
					}
					
					//console.log(query_str);return false;
					$.ajax({
						type: 'POST',
						url: "/product_cms/actions/",
						data:query_str,
						beforeSend: function() {
							$("#message").html("");
							$("#message").removeClass('successnew errornew');
							$("#div-loader-wait").show();
						},
						success:function(result)	{ 
							//result
							$("#div-loader-wait").hide();
							r = $.parseJSON(result);
							//console.log(r);
							$("#message").html("");
							if('success' in r) {
								for(var i in r.success) {
									$("#message").append(r.success[i]);
								}
							}
							var product_id = 0;
							if('product_id' in r) {
								product_id = r.product_id;
							}
							if('error' in r) {
								for(var i in r.error) {
									$("#message").append(r.error[i]);
								}
							}
							
							if(r.error) {
								$("#message").addClass('errornew');
							} else {
								$("#message").addClass('successnew');
							}
							
							timer = setTimeout(function(){
								if(product_id > 0) {
									window.location.replace('/product_cms/vip/' + product_id);
								} else {
									$("#submit").trigger('click');
								}
							},100);
							
						},
						complete: function(r){
							$("#div-loader-wait").hide();
							//location.reload(false);
						}
					});
				}
			}
		} else {
			alert('Select listing(s) to assign to ' + legalActions[action]);
		}
	} else {
		alert("Please select an action.");
	}
}
$(document).ready(function(){
			
	$( '.date_input_first' ).datepicker({
		"dateFormat":"yy-mm-dd",
		changeMonth: true,
		changeYear: true
	});

	
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) { 
			$(".assignbox").addClass("newfixed") 
		} else {
			$(".assignbox").removeClass("newfixed")
	    }
	});
	
	$(".dummy_form").on('keydown', function(e){
		if(e.keyCode == 13) {
			$("#submit").trigger('click');
		}
	});
	
	$(".dummy_prices").on('keydown', function(e){
		numcheck(e);
	});
	
	$('.chosen_dropdown').width('130');
	$('.chosen_dropdown').chosen({max_selected_options: 5});
	
	//$('.input-text#cat_*').hide();
	
	$('#btnSubmit').click(function(e){
		if($.trim($("#drpAction").val()) == "") {
			alert("Please choose an action to perform.");
			return false;
		} else {	
			performAction($.trim($("#drpAction").val()));
		}
	});
	
	$('#sku-select').fancybox({
	    'width': '250px',
	    'height': '100px',
	    'autoDimensions' : true, 
	    'autoScale': true,
	    'transitionIn': 'fade',
	    'transitionOut': 'fade',
	    'type': 'iframe',
	});
	

	$(".paging").live("click",function()
	{
		var page = $(this).attr('rel');
		$("#pageview").val(page);
		$("#page").val(page);
		$("#submit").trigger("click");
	});
	
	$("#limit").live("change",function()
	{
		$("#submit").trigger("click");
	});

	$(".sort").live("click",function()
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

	$("#selectAll").live("click",function()
	{
		$('.brandid_cb').attr('checked','checked');
	});
	
	$("#unselectAll").live("click",function()
	{
		$('.brandid_cb').removeAttr('checked');
	});

	// js for ajax grid for product start
	$('#submit').on('click',function(){
		if(timer > 0){
			clearTimeout(timer);
		}
		var values1 = {};
		$.each($('#prductGridForm').serializeArray(), function(i, field) {
			if(field.name in values1) {
				values1[field.name] += "," + field.value;
			} else {
				values1[field.name] = field.value;
			}
		});
		
		
var url = '/product_cms/filter/';
		//$('#loading_img').html('<img src="/img/ajax-loader.gif" alt="loading..."></img>');
		$("#div-loader-wait").show();
		$.ajax({
			type: 'POST',
			url: url,
			//data: {page:page,limit:limit,entity_id:entity_id,image_name:image_name,product_name:product_name,sku:sku,listing_type:listing_type,price_from:price_from,price_to:price_to, sp_from:sp_from,sp_to:sp_to,cost_from:cost_from,cost_to:cost_to,is_in_stock:is_in_stock,qty_from:qty_from ,qty_to : qty_to,visibility : visibility, status: status,order_by : order_by,ajax :1},
			data:{data:values1},
			//async: false,
			beforeSend: function() {
				
			},
			success: function(resulthtml)
			{
				//alert('success');				
				var data = $.parseJSON( resulthtml );
				//console.log(data.pagination);
				$('#td-prev').html(data.pagination.prev);
				$('#td-current').html(data.pagination.current);
				$('#td-next').html(data.pagination.next);
				$('#td-total_pages').html(data.pagination.total_pages);
				$('#td-total_records').html(data.pagination.total_records);
				
				//$('#pagination').html(data.pagination);
				if(data.tbody_data != ''){
					$('#tbody_data').html(data.tbody_data);
				}
				
				var select = '<option value=\'\'></option>';
				for(var option_id in data.execs.option) {
					if(parseInt(option_id) > 0) {
						select += '<option value=\'' + option_id + '\'>' + data.execs.option[option_id] + ' (' + data.listings_assigned[option_id] + ')</option>';
					}
				}
				$("#users").html(select);
				//console.log(data.execs);
					
				
				$("#chb_").prop("checked", false);
				$("#div-loader-wait").hide();
			},
			error: function(message)
			{
				alert('error');
			}
		});
		//$('#loading_img').html('');
	});
	
});

function check_visibles() {
	var checked = $("#chb_").prop("checked");
	//alert(checked); return false;
	$(".productcheckbox").each(function(){
		$(this).prop("checked", checked);
	});
}

$("#btnStartContent").on('click', function(){
	var val = [];
	$( ".productcheckbox:checked" ).each(function() { 
		val.push(this); //get tr ids	
	});
	
	//console.log(val.toSource()); return false;
	if(val.length > 0) {
		//$("#prductGridForm").prop('action', ROOT_URL + '/product_cms/vip');
		//alert(ROOT_URL + '/product_cms/vip');
		
		var form = document.getElementsByTagName('form')[0];
		//form.submit();
		form.setAttribute('method', 'post');
		form.setAttribute('action', ROOT_URL + '/product_cms/start');
		//form.setAttribute('target', '_blank');
		//$('#prductGridForm').trigger('submit');
		document.createElement('form').submit.call(document.prductGridForm);
		
		form.removeAttribute('action');
		form.removeAttribute('target');
		
		
	} else {
		alert('Please select listings to start adding the content');
		return false;
	}
});


function numcheck(event){
	
	if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || event.keyCode == 190 || event.keyCode == 173 || 
			// Allow: Ctrl+A
           (event.keyCode == 65 && event.ctrlKey === true) || 
            // Allow: home, end, left, right
           (event.keyCode >= 35 && event.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
    } else {
    	// Ensure that it is a number and stop the keypress
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )  ) {
        	event.preventDefault(); 
        }   
    }
}



$('#btnExport').on('click', function(){

	var c = $('#table_listings').find(':checkbox:checked');
	if(c.length > 0)
	{
		var form = document.getElementsByTagName('form')[0];
		//form.submit();
		form.setAttribute('method', 'post');
		form.setAttribute('action', ROOT_URL + '/product_cms/export');
		form.setAttribute('target', '_blank');
		//$('#prductGridForm').trigger('submit');
		document.createElement('form').submit.call(document.prductGridForm);
		
		form.removeAttribute('action');
		form.removeAttribute('target');
		
		//$('form').prop('action',ROOT_URL + '/product_grid/export_csv');
		//form.submit();
	}
	else 
	{
		alert('No listing selected to export.');
	}

});