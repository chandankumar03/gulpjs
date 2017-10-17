$(document).ready(function(){
	// manage merchant
	if($('#type_of_stock').is(':visible')){
		var sOptions = '';
		$('#type_of_stock').html('');
		sOptions = '<option value="">Please Select</option>';
		
		if(permissions.hasOwnProperty('merchant/stocktype/all')) {
			sOptions = '<option value="">Please Select</option>';
			sOptions += '<option value="138">Marketplace</option>';
			sOptions += '<option value="139">Warehouse</option>';
		} else if(permissions.hasOwnProperty('merchant/stocktype/others')) {
			sOptions = '<option value="">Please Select</option>';
			sOptions += '<option value="138">Marketplace</option>';
			sOptions += '<option value="139">Warehouse</option>';
		} else if(permissions.hasOwnProperty('merchant/stocktype/marketplace')) {
			sOptions = '<option value="">Please Select</option>';
			sOptions += '<option value="138">Marketplace</option>';
		} else {
			sOptions = '';
			sOptions += '<option value="">Nothing</option>';
		}
		
		$('#type_of_stock').html(sOptions);
	}
	
	if(supplier_id > 0 && seller == 0) {
		toggleCustomer(true);
	} else if(supplier_id > 0 && seller == 1) {
		$('#table-customer-information :input').removeClass('required');
	}
	
});
//$('#td-type_of_stock').on('change', '#type_of_stock', function(){
$('#td-seller').on('change','#seller', function() {
	$('#span-seller-output').html('');
	if($.trim($(this).val()) == 1) {
		toggleCustomer(false);
                if($("#type_of_stock").val() == '139' && $("#seller").val() == '1'){
                    $('#span-seller-output').html('');
                }else{
                    $('#span-seller-output').html('Marketplace');
                }
		
	} else if($.trim($(this).val()) != '') {
		if($('#type_of_stock').val() == "138") {
			$('#span-seller-output').html('On Demand');	
		} else {
			$('#span-seller-output').html('Warehouse');
		}
		toggleCustomer(true);
	}
});

function empty (mixed_var) {
	var undef, key, i, len;
	//var emptyValues = [undef, null, false, 0, "", "0"];
	var emptyValues = [undef, null, false, ""];
	
	for (i = 0, len = emptyValues.length; i < len; i++) {
		if (mixed_var === emptyValues[i]) {
			return true;
	    }
	}

	if (typeof mixed_var === "object") {
		for (key in mixed_var) {
	      // TODO: should we check for own properties only?
	      //if (mixed_var.hasOwnProperty(key)) {
	      return false;
	      //}
	    }
	    return true;
	}

	return false;
}

$(document).on('change', '.error-border', function(){
	if($.trim($("#" + this.id).val()) != "") {
		$("#" + this.id).removeClass("error-border");
	}
});