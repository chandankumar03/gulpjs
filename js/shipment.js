///LIGHT BOX /////
/*$("a#shipped").fancybox({
	'hideOnContentClick': true,
	'afterClose':function(){
		//alert(1);
	}
});*/

$('#ship').submit(function(){
	
	var serizeform   = $('#ship').serialize();
	var track_number = $('#track_number1').val();
	var dispatch_date = $('#dispatch_date').val();
	/*var fCode = document.forms[].elements["shipment[item]"];
	alert(fCode);
	for ( i = 0; i < fCode.length; i++ ){
        if ( fCode[i].value == "" ) {
            alert("Please choose product code");
           // fCode[i].focus();
            return false;
        }
		
    }*/
	$('#submit').val('Please wait.......');
	document.getElementById('submit').disabled=true;
	
	if(dispatch_date == ''){
		$('#interaction').html('<label style="color:red;">Validation errors : <br/> (X) Please add Dispatch Date.</label>').show().fadeOut(8000);
		$('#submit').val('Ship');
		document.getElementById('submit').disabled=false;
		return false;
	}
	
	if(track_number == ''){
		$('#interaction').html('<label style="color:red;">Validation errors : <br/> (X) Please add tracking number.</label>').show().fadeOut(8000);
		$('#submit').val('Ship');
		document.getElementById('submit').disabled=false;
		return false;
	}
	
	$('#loading_img').html('<img src="../../img/ajax-loader.gif" alt="loading..."></img>');
	post_ship = site_url+'/sales_shipment/AddShipment';
	$.post(post_ship, serizeform, function (data){
		
		data = $.trim(data);
		if( data == 'success'){		
			alert('Order is Shipped');
			parent.window.location.reload(true);
			ship.reset();
		}else{
			alert(data);
			$('#interaction').html(data).show().fadeOut(8000);
		}
		$('#loading_img').html('');
	});
	return false;
});



$('#editshipment').submit(function(){
	
	var serizeform   = $('#editshipment').serialize();
	var track_number = $('#track_number1').val();
	var dispatch_date= $('#dispatch_date').val();
	
	if(dispatch_date=='')
	{
		$('#interaction').html('<label style="color:red;">Validation errors : <br/> (X) Please select dispatch date.</label>').show().fadeOut(8000);
		return false;
	}
	else if(track_number == ''){
		$('#interaction').html('<label style="color:red;">Validation errors : <br/> (X) Please add tracking number.</label>').show().fadeOut(8000);
		return false;
	}
	
	$('#loading_img').html('<img src="../../img/ajax-loader.gif" alt="loading..."></img>');
	
	post_ship = site_url+'/sales_shipment/EditShipment';
	
	$.post(post_ship, serizeform, function (data){
		//alert(data);
		data = $.trim(data);
		alert(data);
		if(data == 'success'){			
			parent.window.location.reload(true);
			ship.reset();
		}else{
			$('#interaction').html(data).show().fadeOut(8000);
		}
		$('#loading_img').html('');
	});
	return false;
});


function checkAWB(val)
{
	var val
	var max_row=parseInt(document.getElementById('max_row').value)- parseInt(1);
	//alert(max_row);
	for(var i=1;i<max_row;i++)
	{
		//alert(document.getElementById('track_number'+i).value);
		//alert(val.value);
		if(document.getElementById('track_number'+i).value!='')
		{
		
			if(document.getElementById('track_number'+i).value==val.value && document.getElementById('track_number'+i).id!=val.id)
			{
				alert('you have already used this AWB number');
				document.getElementById(val.id).value='';
				return false;
			}
	 }
	}

	path = site_url+"/sales_shipment/checkAWBINDB"; 
	$.ajax({url: path,
					data:{AWB:val.value},
					type: "POST",
					beforeSend : function(){
								$("#login_error").html('<center><image src="'+site_url+'/media/image/opc-ajax-loader.gif"/></center>');
								},
					success: function(data){
						//alert(data);
						if(data == 0){
							
							//parent.location.reload();
						}else
						{
							alert(data+' already already exists in database');
							document.getElementById(val.id).value='';
							document.getElementById(val.id).focus();
						}
					},
					error: function(x,y,z){
						alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
					}
				});

	
}


function deletecarrier(id)
{
	var id;
	//alert(site_url)
	if (confirm('Are you sure you want to delete?')) {
	path = site_url+"/sales_shipment/deleteCarrier"; 
	var id =id;
			$.ajax({url: path,
					data:{id:id},
					type: "POST",
					beforeSend : function(){
								$("#login_error").html('<center><image src="'+site_url+'/media/image/opc-ajax-loader.gif"/></center>');
								},
					success: function(data){
						if(data == "success"){
							
							parent.location.reload();
						}else
						{
							alert(data);
						}
					},
					error: function(x,y,z){
						alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
					}
				});

		
    // Save it!
	} else {
		// Do nothing!
		return false;
	}
}


$('#click').click(function(){
//	parent.window.location.reload(true);
});
$( "#dispatch_date" ).datepicker({
	// beforeShowDay: $.datepicker.noWeekends,
	 /*maxDate: new Date(2012, 03 - 1, 27),*/
	 
	 changeMonth: true,
	 changeYear: true,	 
	 dateFormat : 'yy-mm-dd',
	 onClose: function( selectedDate ) {
	//$( "#to_date" ).datepicker( "option", "minDate", selectedDate);
	}
});

function filltitle(id)
{
	//var id;
	//alert('asdad');
	var val = $('#tracking'+id).val();
	//alert(id);
	//alert(val);
	if(val != 'custom'){
		 $('#track_title'+id).val(val);
	}
}

function addmorepartner()
{
	var  itemCount=document.getElementById('max_row').value;
	var trCount=itemCount;
	document.getElementById('max_row').value=parseInt(itemCount,10)+parseInt(1,10);
	var templateText =
        '<tr class="option-row' + itemCount + '" id="shipment_table' + itemCount + '" >'+
            '<td><select id="tracking' + itemCount+'" name="shipmentcarrier[' + itemCount + '][tracking]" onchange="return filltitle('+itemCount+')">';

			for(var c in carrier_allowed) {
				templateText += '<option value=\''+ carrier_allowed[c]["carrier_name"] +'\'>'	+ carrier_allowed[c]["carrier_label"] + '</option>';
			}
			
	templateText += '</select><\/td>'+
            '<td class="nobr"><input type="text"  name="shipmentcarrier[' + itemCount + '][track_title]" value="" id="track_title' + itemCount+'" > </td>'+
            '<td><input type="text" onblur="return checkAWB(this);" name="shipmentcarrier[' + itemCount + '][track_number]" value="" id="track_number' + itemCount+'" ><\/td>'+
            '<td><button title="Delete" type="button" id="shipment_row_' + itemCount + '_delete_button"  onclick="return deletemorepartner(' + itemCount + ');"><span>Delete</span></button><\/td>'+
		
        '<\/tr>';
		//jsignup_home("").append(templateText);

		//$("#tiers_table").closest( "tr" ).append(templateText);
		$("#shipment_container").append(templateText);
		$('#shipment_row_' + itemCount + '_delete_button').button();
		
 }
 
 function deletemorepartner(element){
	 var max_row=parseInt(document.getElementById('max_row').value)- parseInt(1);
	 document.getElementById('max_row').value=max_row;
	$("#shipment_table"+element+"").closest("tr").remove(); // remove row
}
