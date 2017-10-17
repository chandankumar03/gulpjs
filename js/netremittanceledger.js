$(document).ready(function(){
	$("#from_date").datepicker({
		dateFormat: 'yy-mm-dd',
		onSelect: function(date) {
		    $("#to_date").datepicker('option', 'minDate', date);
		  }
	});
	
	$("#to_date").datepicker({dateFormat: 'yy-mm-dd'});
	
	$('.chosen_dropdown').width('130');
	$('.chosen_dropdown#show_in_categories').width('150');
	$('.chosen_dropdown').chosen({max_selected_options: 5});
	$('#drp-cat-movement').chosen();
	$('#drp_cat_movement_chzn').width(550);
	
		
	$('#reset').click(function() {
	    location.reload();
	});
});

function validate_form(){
	var from_date = $('#from_date').val().trim();
	var to_date = $('#to_date').val().trim();
	var regEx = /^\d{4}-\d{2}-\d{2}$/;
	var err_msg = [];
	
	if(from_date == '' || to_date == ''){
		err_msg.push('Please Select From Date and To Date for Ledger.');
	}
	
	if(from_date != '' && from_date.match(regEx) == null){
		err_msg.push('Please Enter Valid From Date.');
	}
	
	if(to_date != '' && to_date.match(regEx) == null){
		err_msg.push('Please Enter Valid To Date.');
	}
	
	$("#errormsg").html("");
	if(err_msg.length > 0){
		$.each(err_msg, function(index, value){
			$('#errormsg').append(value+'<br/>');
		});
		return false;
	}else{
		var values1 = $('#vendor_id').val();		
		$('#vendors').val(values1);
	}
}