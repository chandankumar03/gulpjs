
$("#limit").live("change",function()
	{
	    $("#submit").trigger("click");
	});
$("#leads-limit").live("change",function()
{	
    $("#leads-submit").trigger("click");
});

	
$(".leads-paging").live("click",function()
	{
		var page = $(this).attr('rel');		
		$("#pageview").val(page);
		$("#page").val(page);
		$("#leads-submit").trigger("click");
	});
$(".paging").live("click",function()
		{
			var page = $(this).attr('rel');		
			$("#pageview").val(page);
			$("#page").val(page);
			$("#submit").trigger("click");
		});


$(".leads-sort").live("click",function()
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
			$("#leads-submit").trigger("click");
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
	
$(".detail_td").click(function(){ 
        //window.location = $(this).attr('href');
        return false;
    });
$("#sort input").keydown(function(e) {
    if (e.keyCode == 13) {
        $("#submit").trigger("click");
    }
});

$("#exportTo").click(function(){
		$("#submit").trigger("click");
});

$("#selectAll").click(function(){
	$('.customer').attr('checked','checked');
	var ChackedEmails = $(":checkbox:checked").length;
	$("#selectCount").html("| "+ChackedEmails+" customer(s) selected.");
});

$("#unselectAll").click(function(){
	$('.customer').removeAttr('checked');
	$("#selectCount").html("");
}); 

$("#goNewCustomer").click(function(){ 
	//window.location.href = site_url+"customer/newcustomer";
});

$("#reset").live("click", function(){ location.reload();
 }); 

$("#newCustomer").live("click", function(){ 
	//window.location.href = site_url+"customer/newcustomer";
 });

$('#submit').live('click',function()
{
		
		var searchIDs = $("input:checkbox:checked").map(function(){
        return this.value;
		}).toArray();
		
		
		
		if($("#export-select").val() == "csv"){
			var obj = $('#myFrom').serializeArray();
			//window.location.href = site_url+"customer_backend/exportTo?"+$.param(obj);
		} else {
			var path = site_url+"designgurus/ajax_manageand"; 
			
			$('#loading_img').html('<img src="../../img/ajax-loader.gif" alt="loading..."></img>');
			$.ajax({
				type: 'POST',
				url: path,
				data:$('#myFrom').serializeArray(),
				//data: values1,
				async: false,
				success: function(resulthtml)
				{
					var data = $.parseJSON( resulthtml );
					if(data.tbody_data != ''){
						$('#pager').html(data.pagination);
						$('#tbody_data').html(data.tbody_data);
					}
					
				},
				error: function(message)
				{
					alert('error');
				}
			});
			$('#loading_img').html('');
		}
	});

$('#leads-submit').live('click',function()
		{
				
				var searchIDs = $("input:checkbox:checked").map(function(){
		        return this.value;
				}).toArray();
								
				if($("#export-select").val() == "csv"){
					var obj = $('#myFrom').serializeArray();
					//window.location.href = site_url+"customer_backend/exportTo?"+$.param(obj);
				} else {
					var path = site_url+"designgurus/ajax_manageandleads"; 
					
					$('#loading_img').html('<img src="../../img/ajax-loader.gif" alt="loading..."></img>');
					$.ajax({
						type: 'POST',
						url: path,
						data:$('#myFrom').serializeArray(),
						//data: values1,
						async: false,
						success: function(resulthtml)
						{
							var data = $.parseJSON( resulthtml );
							if(data.tbody_data != ''){
								$('#pager').html(data.pagination);
								$('#tbody_data').html(data.tbody_data);
								shrink_comments();
							}
							
						},
						error: function(message)
						{
							alert('error');
						}
					});
					$('#loading_img').html('');
				}
			});

function andAction()
{
	var checked = []
	$("input[name='customer[]']:checked").each(function ()
	{
		checked.push(parseInt($(this).val()));
	});

    var action      = $("#action-select").val();
	var error   = 0;
	if(checked.length === 0 ){
		alert("Please select items.");
		error = 1;
	} else if(action == ""){
		$('#action-select').css('border', 'solid 1px red');
		error = 1;
	} else {
		$('#action-select').css('border', '');
	}
	
	if(error == 1){
		return false;
	} else {
		changeandAction();
	}
}


function changeandAction(){
    var path = site_url+"/designgurus/changeAction/"; 
	$.ajax({ url: path,
					data:$("#myFrom").serialize(),
					dataType:"json",
            		type: "POST",
					success: function(data){						
					  	$("#message").css('display','block');
						if(data == 0){
							$("#message").html("Selected records already updated.");
						} else {
							$("#message").html("Total of "+data+" record(s) were updated.").fadeOut(2000,function(){
								location.reload();
							});
						}
				    },
					error: function(x,y,z){
						
                		alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
					}
					
            });
}


function galleryAction(){
	var checked = []
	$("input[name='gallery[]']:checked").each(function ()
	{
		checked.push(parseInt($(this).val()));
	});

    var action      = $("#action-select").val();
	var error   = 0;
	if(checked.length === 0 ){
		alert("Please select items.");
		error = 1;
	} else if(action == ""){
		$('#action-select').css('border', 'solid 1px red');
		error = 1;
	} else {
		$('#action-select').css('border', '');
	}
	
	if(error == 1){
		return false;
	} else {
		changegalleryAction();
	}
}


function changegalleryAction(){
	 var path = site_url+"designgurus/gallery_status/"; 
		$.ajax({ url: path,
						data:$("#myFrom").serialize(),
						dataType:"json",
	            		type: "POST",
						success: function(data){						
						  	$("#message").css('display','block');
							if(data == 0){
								$("#message").html("Selected records already updated.");
							} else {
								$("#message").html("Total of "+data+" record(s) were updated.").fadeOut(2000,function(){
									location.reload();
								});
								
							}
					    },
						error: function(x,y,z){
							
	                		alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
						}
						
	            });
}

function delete_sample(gall_id){
	$('#gall_interaction').html('');
	if(gall_id > 0){
		var responce = confirm('Are you sure?');
		if(responce == false)
		{	
			return false;
		} else {
			$.ajax({
				url:'/designgurus/delete_sample/'+gall_id,
				type:'get',				
				success:function(data){
					data = $.trim(data);
					if(data == 'success'){
						$('#gall_interaction').html('<label style="color:green;">Sample removed succesfully</label>');
						$('#sample_gall_'+gall_id).remove();
					}else{
						var obj = $.parseJSON(data);
						if(is_object(obj)){
							$.each( obj, function( key, value ) {
								//alert( key + ": " + value );									
								$('#gall_interaction').hitml('<div id="gall_interaction" class="validation-advice and-error">'+value+'</div>');
								
							});
						}
					}
					
				},
				error:function(){
					alert('Try later');
				}
			});
		}
	}
}

function check_visibles() {
	var checked = $("#chb_").prop("checked");
	//alert(checked); return false;
	$(".archcheckbox").each(function(){
		$(this).prop("checked", checked);
	});
}

function any_other(gall_id, value){
	if(value == 'Any Other'){ 
		$('#gallery_reason_'+gall_id).html('<textarea name="gallery_reason_'+gall_id+'" style="" maxlength="150" id="gallery_reason_'+gall_id+'"></textarea>');
	}else{ 
		$('#gallery_reason_'+gall_id).html('');
	}
}


$(function() {
	shrink_comments();
});

function shrink_comments(){
	var showChar = 20, showtxt = "<img src='/img/expand-icon.png'/>", hidetxt = "<img src='/img/collaps-icon.png'/>";
	$('.more').each(function() {
			var content = $(this).text();		
			if (content.length > showChar) {
			var con = content.substr(0, showChar);
			var hcon = content.substr(showChar, content.length - showChar);
			var txt= con +  '<span class="dots">...</span><span class="morecontent"><span style="display:none;">' + hcon + '</span>&nbsp;&nbsp;<a href="" class="moretxt">' + showtxt + '</a></span>';
			$(this).html(txt);		
		}
	});
	$(".moretxt").click(function() {
		if ($(this).hasClass("sample")) {
		$(this).removeClass("sample");
		$(this).html(showtxt);
		} else {
		$(this).addClass("sample");
		$(this).html(hidetxt);
		}
		$(this).parent().prev().toggle();
		$(this).prev().toggle();
		return false;
	});
}
