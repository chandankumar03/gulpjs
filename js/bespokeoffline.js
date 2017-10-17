$( function() {
  $( ".datepicker" ).datepicker({
	  dateFormat: "yy-mm-dd"
	});
});

function newcouponvalidate() {
	$('#msg_box').html('').hide();
	$('#nameError').html('');	
	
	var name 		= trim($('#name').val());
    var error		= false;
    
    if(name == "") {
    	 $('#nameError').html('Required').show();
    	 error = true;
    }
    else if(name.split(' ').length > 1) {
    	$('#nameError').html('Name should be single word').show();
   	 	error = true;
    }
        
    if(error) {
    	return false;
    }
    else {
    	var _url = root_url + "/Bespokeoffline/ajax_calls";
    	var _data = {
           	request:'insertnewcoupon',
           	name:name,           	
        };
        var _beforeSend = function() {
		};
        var _params = {
        	name:name
        };
        var _setUp = {
       		'dataType' : "json"
        };

        PF.UTILITIES.makeRequest( _url, 'POST', _data, getnewcouponResponse, getnewcouponError, _beforeSend, _params, _setUp );
    } 	
}

function getnewcouponResponse( _data, _params) {
	$('#msg_box').html(trim(_data)).show();
	$('#nameError').html('');	
	$('#name').val('');
	alert(trim(_data));
	var url = root_url + "/Bespokeoffline/couponlist";
	window.location = url;
}

function getnewcouponError() {
	alert("Something went wrong! Check internet connection ");
}

function newcouponback() {
	var url = root_url + "/Bespokeoffline/couponlist";
	window.location = url;
}

function deleteBespokecoupon(key) {
	var r = confirm("Sure you want to delete coupon - "+key);
	if (r == true) {
		var _url = root_url + "/Bespokeoffline/ajax_calls";
		var _data = {
	       	request:'deleteBespokecoupon',
	       	key:key
	    };
	    var _beforeSend = function() {
		};
	    var _params = {
	    	key:key
	    };
	    var _setUp = {
	   		'dataType' : "json"
	    };

	    PF.UTILITIES.makeRequest( _url, 'POST', _data, deleteBespokecouponResponse, deleteBespokecouponError, _beforeSend, _params, _setUp );
	}
}

function deleteBespokecouponResponse(_data, _params) {
	window.alert("Deleted Coupon Successfully");
	var url = root_url + "/Bespokeoffline/couponlist";
	window.location = url;
}

function deleteBespokecouponError() {
	alert("Something went wrong! Check internet connection ");
}

function trim(str) {
    return str.replace(/^\s+|\s+$/g,"");
}

function bulkUploadValidate(){
	var bespoke_coupons = trim($('#bespoke_coupons').val());
	if(bespoke_coupons == ""){
		alert("Please upload file.");
		return false;
	}else{
		$("#bulk_coupon_form").submit();
	}
}	
