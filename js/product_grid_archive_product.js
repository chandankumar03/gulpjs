// Author : Nilesh R. Pawar.
// created on : 31st august 2015.
var timer = 0;
var legalActions = {"enable":"Enable", "disable":"Disbale", "delete": "Delete", "alive": "Run Make Live","assign_category":"Assign Category","remove_category":"Remove Category","make_oos":"Out of Stock","make_is":"In Stock","mimport":"Run Media Import","push_to_content":"Push to Content"};
function performAction() {
	var val = [];
		$( ".productcheckbox:checked" ).each(function() { 
			val.push(this.value); //get tr ids 
		});	
		if(val.length > 0) {
		} else {
			alert('Select product(s) to Unarchive');
		}
}

$(document).ready(function(){
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
	
	$( '.date_input_first' ).datepicker({
		"dateFormat":"yy-mm-dd",
		changeMonth: true,
		changeYear: true
	});
	
	$(".dummy_prices").on('keydown', function(e){
		numcheck(e);
	});
	
	$('.chosen_dropdown').width('130');
	$('.chosen_dropdown#show_in_categories').width('150');
	$('.chosen_dropdown').chosen({max_selected_options: 5});
	$('#drp-cat-movement').chosen();
	$('#drp_cat_movement_chzn').width(550);
	//$('.input-text#cat_*').hide();
	
	$("#drpAction").on('change', function(){
		
		/*-------------------- Reset Dropdowns --------------------*/
		$("#drp-status").val("");
		$("#drp-status").hide();
		$("#drp-assign").val("");
		$("#drp-assign").hide();
		$("#drp-stock").val("");
		$("#drp-stock").hide();
		//$("#drp-cat-movement").unchosen();
		$('#drp-cat-movement').val('').trigger("liszt:updated");
		$('#span-cat-movement-container').hide();
		//$("#drp-cat-movement").hide();
		if($(this).val() == "status") {
			$("#drp-status").show();
		} else if($(this).val() == "assign") {
			$("#drp-assign").show();
		} else if($(this).val() == "stock") {
			$("#drp-stock").show();
		} else if($(this).val() == "assign_category" || $(this).val() == "remove_category") {
			$('#span-cat-movement-container').show();
			//$("#drp-cat-movement").show();
		}
	})
        
	
        
        //author : Nilesh R. Pawar.
        // work : to check atleast checkbox is selected or not.
	$('#unarchivebtnSubmit').click(function(){
		var val = [];
		$( ".archiveproductcheckbox:checked" ).each(function() { 
			val.push(this.value); //get tr ids 
		});
		if(val.length > 0) {
                    var reason = $("#drpAction").val();
                    if($.trim($("#drpAction").val()) != "" ){
                        $.ajax({
                            type: 'POST',
                            url: ROOT_URL +"/product_grid/make_product_unarchive/",
                            data:{val:val,reason:reason},
                            success:function(result){ 
                                if(result == 'true'){
                                    alert('Selected product unarchive successfully.');
                                    //window.location.reload(true);
                                    setTimeout(function(){window.location.reload();}, 10000);
                                }else if(result == 'false'){
                                    return false;
                                }
                            },
                           });
                    }
                    else{
                        alert("please select reason to unarchive the product");
                        return false;
                    }
		} else {
			alert('Select product(s) to Unarchive');
		}

	});
	
	$('.order_tr').live("click",function(){
        window.location = $(this).attr('href');
        return false;
    });

	$(".paging").live("click",function()
	{
		var page = $(this).attr('rel');
		$("#pageview").val(page);
		$("#page").val(page);
		$("#submit").trigger("click");
	});
	
	$("#export").live("click",function()
	{
		$("#submit").val('Export');
		$("#submit").trigger("click");
		$("#submit").val('Submit');
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
            
                var errormsg = "";
                var showerror = false;

                var id_from=$.trim($("#id_from").val());
                var id_to=$.trim($("#id_to").val());                
                var price_from=$.trim($("#price_from").val());
                var price_to=$.trim($("#price_to").val());
                var sp_from=$.trim($("#special_price_from").val());
                var sp_to=$.trim($("#special_price_to").val());
                var cost_from=$.trim($("#cost_from").val());
                var cost_to=$.trim($("#cost_to").val());
                var qty_from=$.trim($("#qty_from").val());
                var qty_to=$.trim($("#qty_to").val());
                
                if(isNaN(id_from)){
                    errormsg += "\nId From field should contain a number. Ex: 1402771";
                    showerror = true;
                }
                if(isNaN(id_to)){
                    errormsg += "\nId To field should contain a number. Ex: 1402775";
                    showerror = true;
                }
                if(isNaN(price_from)){
                    errormsg += "\nPrice From field should contain a number. Ex: 1000";
                    showerror = true;
                }
                if(isNaN(price_to)){
                    errormsg += "\nPrice To field should contain a number. Ex: 1000";
                    showerror = true;
                }
                if(isNaN(sp_from)){
                    errormsg += "\nSpecial Price From field should contain a number. Ex: 1000";
                    showerror = true;
                }
                if(isNaN(sp_to)){
                    errormsg += "\nSpecial Price To field should contain a number. Ex: 1000";
                    showerror = true;
                }
                if(isNaN(cost_from)){
                    errormsg += "\nCost From field should contain a number. Ex: 1000";
                    showerror = true;
                }
                if(isNaN(cost_to)){
                    errormsg += "\nCost To field should contain a number. Ex: 1000";
                    showerror = true;
                }
                if(isNaN(qty_from)){
                    errormsg += "\nStock From field should contain a number. Ex: 1000";
                    showerror = true;
                }
                if(isNaN(qty_to)){
                    errormsg += "\nStock To field should contain a number. Ex: 1000";
                    showerror = true;
                }
                if(showerror == true){
                    alert(errormsg);
                    return false;
                }
                
                else{
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
		//$.trim($("#prod_entity_id").val());
		/*var page=$('#page').val();
		var limit=$('#limit').val();
		var entity_id=$.trim($("#entity_id").val());
		var image_name=$.trim($("#image_name").val());
		var product_name=$.trim($("#product_name").val());
		var sku=$.trim($("#sku").val());
		var listing_type=$.trim($("#listing_type").val());
		var price_from=$.trim($("#price_from").val());
		var price_to=$.trim($("#price_to").val());
		var sp_from=$.trim($("#sp_from").val());
		var sp_to=$.trim($("#sp_to").val());
		var cost_from=$.trim($("#cost_from").val());
		var cost_to=$.trim($("#cost_to").val());
		var is_in_stock=$.trim($("#is_in_stock").val());
		var qty_from=$.trim($("#qty_from").val());
		var qty_to=$.trim($("#qty_to").val());
		var visibility=$.trim($("#visibility").val());
		var status=$.trim($("#status").val());
		
		var order_by=$('#order_by').val();*/
		
                var url = ROOT_URL + '/product_grid/ajax_archive_Product';
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
				TOTAL_RECORDS = data.pagination.total_records_count;
				VISIBLE_RECORDS = data.pagination.visible_records;
				$('#span-selection').html('0 items selected');
				//$('#pagination').html(data.pagination);
				if(data.tbody_data != ''){
					$('#tbody_data').html(data.tbody_data);
				}
				$("#chb_").prop("checked", false);
				$("#div-loader-wait").hide();
			},
			error: function(message)
			{
				alert('error');
			}
		});
                    
                }
                
		
		//$('#loading_img').html('');
	});

	// js for ajax grid for product end
	$('#skuForm').submit(function(){
		var sku=$.trim($('#sku').val());
		var rows = sku.split("\n").length;
		
		if(sku=='')
		{
			alert('Enter Proper SKU');
			return false;
		}
		else if(rows > 10)
		{
			alert('Enter maximum 10 SKU\'s at a time.');
			//return false;
		}
	});

	$('.mainLI').click(function(){
		var arr_id=this.id.split('_');
		var id=arr_id[1];
		$(".mainUL1").css("display", "none");
		//$(".mainUL2").css("display", "none");
		$("#ul_"+id).css("display", "block");
	});

	$('.mainLI1').click(function(){
		var arr_id=this.id.split('_');
		var id=arr_id[1];
		$(".mainUL2").css("display", "none");
		$("#ul_"+id).css("display", "block");
	});

	$('.mainLI2').click(function(){
		var arr_id=this.id.split('_');
		var id=arr_id[1];
		$(".mainUL3").css("display", "none");
		$("#ul_"+id).css("display", "block");
	});
	
	//$(".iframe").fancybox();
	
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


	$('#sku-select').fancybox({
	    'width': '250px',
	    'height': '100px',
	    'autoDimensions' : true, 
	    'autoScale': true,
	    'transitionIn': 'fade',
	    'transitionOut': 'fade',
	    'type': 'iframe',
	});
        
        $("#columns-select").fancybox({
            'width' : '400px',
            'autoDimensions' : true, 
            'autoScale': true,
            'transitionIn': 'fade',
            'transitionOut': 'fade',
            'type': 'iframe',
        });
	
	function check_visibles() {
		var checked = $("#chb_").prop("checked");
		//alert(checked); return false;
		var p = 0;
		$(".archiveproductcheckbox").each(function(){
			$(this).prop("checked", checked);
			p++;
		});
		if(checked == true) {
			$('#span-selection').html(p + ' items selected');
		} else {
			$('#span-selection').html('0 items selected');
		}
	}
	
	function numcheck(event){
		if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || event.keyCode == 190 || 
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

	var mAction = 0;
	function massAction(action)
	{
		var to_check = false;
		if(action == 'select_all')
		{   
			to_check = true;
			$('#span-selection').html(TOTAL_RECORDS + ' items selected');
			$('#export_rows').val(TOTAL_RECORDS);
			mAction = 1;
		}
		else if(action == 'unselect_all')
		{       
			to_check = false;
			$('#span-selection').html('0 items selected');
			$('#export_rows').val(0);
			mAction = 0;
		}
		else if(action == 'select_visible')
		{
			to_check = true;
			$('#span-selection').html(VISIBLE_RECORDS + ' items selected');
			$('#export_rows').val(VISIBLE_RECORDS);
			mAction = 2;
		}
		else if(action == 'unselect_visible')
		{
			to_check = false;
			$('#span-selection').html('0 items selected');
			$('#export_rows').val(0);
			mAction = 0;
		}
		
		$('#table_listings').find(':checkbox').prop('checked', to_check);
		
	}
	
	function export_csv()
	{
		var c = $('#table_listings').find(':checkbox:checked');
		
		if(mAction > 0 || c.length > 0)
		{
			if(mAction == 0 && c.length > 0)
			{
				mAction = 1;	
			}
			$('#export_mass_action').val(mAction);
			
			var form = document.getElementsByTagName('form')[0];
			//form.submit();
			form.setAttribute('method', 'post');
			form.setAttribute('action', ROOT_URL + '/product_grid/export_csv');
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
			$('#export_mass_action').val(0);
			$('#export_rows').val(0);
			alert('No listing selected to export.');
		}
	}
	
	$('#table_listings').on('click','.productcheckbox',function(){
		var c = $('#table_listings').find(':checkbox:checked');
		$('#span-selection').html(c.length + ' items selected');
		if((c.length - 1) <= 0)
		{
			$('#chb_').prop('checked', false);
			$('#span-selection').html('0 items selected');
		}
	});
	