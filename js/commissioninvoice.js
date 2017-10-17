$(document).ready(function(){
	
	$("#vendors").keyup(function(){
	    var value = $(this).val().replace(" ", "");
	    var words = value.split(",");

	    if(words.length > 50){
	        alert("Only 50 Vendor Ids Are Allowed.");
	        $(this).val("");
	        return false;
	    }
	});
		
	$('.chosen_dropdown').width('130');
	$('.chosen_dropdown#show_in_categories').width('150');
	$('.chosen_dropdown').chosen({max_selected_options: 5});
	$('#drp-cat-movement').chosen();
	$('#drp_cat_movement_chzn').width(550);
	
		
	$('#reset').click(function() {
	    location.reload();
	});
	
	$('form').submit(function() {
		  $(this).find("button[type='submit']").prop('disabled',true);
		});
});

function validate_form(){
	var vendorIds = $('#vendors').val();
	var err_msg = [];
	
	if(vendorIds == ''){
		err_msg.push('Please Enter Vendor Id.');
	}else if(!vendorIds.match(/^[0-9]+(,[0-9]+)*$/)){
		err_msg.push('Please Enter Valid Vendor Id.');
	}
		
	$("#errormsg").html("");
	if(err_msg.length > 0){
		$.each(err_msg, function(index, value){
			$('#errormsg').append(value+'<br/>');
		});
		return false;
	}
}