$('#add_work').click(function(){
	$('#uploadBox').show();
});
$('#add_profile_pic').click(function(){
	$('#profileBox').toggle();
});
$('#uploadBox-close').click(function(){
	$('#uploadBox').hide();
	location.reload();
});
$('#profileBox-close').click(function(){
	$('#profileBox').hide();
});
$(document).on('click','.design-close',function(e){
	$('.transparent_bg').hide();
});
$('.edit-sample').click(function(){
	$('.transparent_bg').hide();
});
if($('#uploader_div').length != 0 && request_from == 'front_end') {
	  //it doesn't exist
	$('#uploader_div').ajaxupload({
	    url:'/designgurus/image_upload',
		allowExt:['jpg','jpeg', 'gif', 'png'],
		maxFileSize: image_size,
		maxFiles:gall_count,
		showSize:'Kb',
		editFilename:false,
		error:function(txt, filename){
			//alert(txt+' '+ filename +', Please try later');
		},
		success:function(filename){
			//alert('File uploaded succesfully');
			//return false;
		}
	    //dropArea: '#drop_here'
	});
}

if($('#uploader_div').length != 0 && request_from == 'back_end') {
	  //it doesn't exist
	$('#uploader_div').ajaxupload({
	    url:'/designgurus/image_upload?edit_user='+edit_user,
		allowExt:['jpg','jpeg', 'gif', 'png'],
		maxFileSize: image_size,
		maxFiles:gall_count,
		showSize:'Kb',
		editFilename:false,
		error:function(txt, filename){
			//alert(txt+' '+ filename +', Please try later');
		},
		success:function(filename){
			//alert('File uploaded succesfully');
			//return false;
		}
	    //dropArea: '#drop_here'
	});
}

function upload_profile_valid(){
	var profile_pic = $('#arch_file').val();
	var allowed_pic = new Array('jpg','png');
	if(!is_empty(profile_pic)){
		var tmp_profile_pic = profile_pic.split('.');
		var count_pic       = parseInt(tmp_profile_pic.length);
		var extention       = tmp_profile_pic[count_pic-1];
		if($.inArray(extention, allowed_pic) == -1){
			if($('#arc-file-error').length != 0) {
				$('#arc-file-error').remove();
			}
			if($('#arc-file-ext-error').length == 0) {
				  //it doesn't exist
				//$('.file_field').after('<div id="arc-file-ext-error" class="validation-advice">Allowed extension are { '+allowed_pic.join(', ')+' }</div>');
				$('.file_field').after('<div id="arc-file-ext-error" class="validation-advice">JPG, PNG, GIF files only</div>');

			}
		}else{
			return true;
		}

	}else{
		if($('#arc-file-ext-error').length != 0) {
			$('#arc-file-ext-error').remove();
		}
		if($('#arc-file-error').length == 0) {
			  //it doesn't exist
			$('.file_field').after('<div id="arc-file-error" class="validation-advice">File is required</div>');
		}

	}
	return false;
}
//alert($('#arch_city').is(':disabled'));
/*$('#arch_city').click(function(){
	if ($('#arch_city').is(':disabled')){
		//alert(1);
	}
});*/





function validate_join(){
	var arch_email = $.trim($('#arch_email').val());
	var flag = true;
        $("#tracksubmit").attr('disabled', 'disabled').addClass('btn_loader');
	if($('.and-error').length != 0) {
		$('.and-error').remove();
	}
	if(is_empty(arch_email)){
		if($('#arc-email-valid-error').length != 0) {
			$('#arc-email-valid-error').remove();
		}
		if($('#arc-email-error').length == 0) {
			  //it doesn't exist
			$('#arch_email').after('<div id="arc-email-error" class="validation-advice">Email is required.</div>');
		}
		flag = false;

	}
	if(!is_email(arch_email)){
		if($('#arc-email-error').length != 0) {
			$('#arc-email-error').remove();
		}
		if($('#arc-email-valid-error').length == 0) {
			  //it doesn't exist
			$('#arch_email').after('<div id="arc-email-valid-error" class="validation-advice">Email valid email.</div>');
		}
		flag = false;

	}
        
        if(flag == false){
            $("#tracksubmit").removeClass('btn_loader');
        }
        $("#tracksubmit").removeAttr('disabled');
	return flag;
}

function validate_register(){
        var arc_password = $.trim($('#arch_password').val());
	var arc_confpass = $.trim($('#arch_confirm_password').val());
	var occupation   = $.trim($('#occupation').val());
	var first_name   = $.trim($('#first_name').val());
	var last_name    = $.trim($('#last_name').val());
	var arch_gender  = $.trim($('.arch_gender').val());
	var arch_phone   = $.trim($('#arch_phone').val());
	var arch_pincode   = $.trim($('#pincode').val());
	var arch_sec_phone   = $.trim($('#arch_sec_phone').val());
	var arch_city    = $.trim($('#arch_city').val());
	var arch_state   = $.trim($('#arch_state').val());
	var arch_address = $.trim($('#arch_address').val());
	var house_num    = $.trim($('#house_num').val());
	var website_url  = $.trim($('#website_url').val());
	var specialties  = $.trim($('#specialties').val());
	var item_url_1   = $.trim($('#item_url_1').val());
	var item_url_2   = $.trim($('#item_url_2').val());
	var item_url_3   = $.trim($('#item_url_3').val());
	var item_url_4   = $.trim($('#item_url_4').val());
	var item_url_5   = $.trim($('#item_url_5').val());
	var agree        = $.trim($('#arch_agree').val());
	$('.and-error').remove();
        $('#tracksubmit').attr('disabled', 'disabled').addClass('btn_loader');
	if($('.and-error').length != 0) {
		$('.and-error').remove();
	}
	var flag = true;
	var show_pass_error = true;

	if(!$('#arch_agree').is(':checked')){
		if($('#arch_agree-error').length != 0) {
			$('#arch_agree-error').remove();
		}
		if($('#arch_agree-error').length == 0) {
			  //it doesn't exist
			$('#arch_agree').after('<div id="arch_agree-error" class="validation-advice and-error" style="position:absolute;">Accept terms and condition</div>');
		}
	}

	if(is_empty(arc_password) && !is_login){
		if($('#arc-conf-pass-miss-error').length != 0) {
			$('#arc-conf-pass-miss-error').remove();
		}
		if($('#arc-pass-error').length == 0) {
			  //it doesn't exist
			$('#arch_password').after('<div id="arc-pass-error" class="validation-advice and-error">Enter Password</div>');
		}
		flag = false;
		show_pass_error = false;
	}

	if ($('#arch_password').val()!="" && !is_login) {
		if( (arc_password.length < 6) || (arc_password.length > 20) ){
			$('#arch_password').after('<div id="arc-pass-error" class="validation-advice and-error">Password should be in range of 6 to 20 characters.</div>');
			flag = false;
			show_pass_error = false;
		}
	}


	if(is_empty(arc_confpass) && show_pass_error && !is_login){
		if($('#arc-conf-pass-miss-error').length != 0) {
			$('#arc-conf-pass-miss-error').remove();
		}
		if($('#arc-conf-pass-error').length == 0) {
			  //it doesn't exist
			$('#arch_confirm_password').after('<div id="arc-conf-pass-error" class="validation-advice and-error">Enter Confirm password</div>');
		}
		flag = false;
		show_pass_error = false;

	}

	if(arc_password != arc_confpass && show_pass_error && !is_login){
		if($('#arc-conf-pass-error').length != 0) {
			$('#arc-conf-pass-error').remove();
		}
		if($('#arc-pass-error').length != 0) {
			$('#arc-pass-error').remove();
		}
		if($('#arc-conf-pass-miss-error').length == 0) {
			  //it doesn't exist
			$('#arch_confirm_password').after('<div id="arc-conf-pass-miss-error" class="validation-advice and-error">Password does not match</div>');
		}
		flag = false;
		show_pass_error = false;
	}

	if(arc_password.length < 6 && show_pass_error && !is_login){
		if($('#arc-conf-pass-error').length != 0) {
			$('#arc-conf-pass-error').remove();
		}
		if($('#arc-pass-error').length != 0) {
			$('#arc-pass-error').remove();
		}
		if($('#arc-pass-error').length != 0) {
			$('#arc-pass-error').remove();
		}
		if($('#arc-conf-pass-min-error').length == 0) {
			  //it doesn't exist
			$('#arch_confirm_password').after('<div id="arc-conf-pass-min-error" class="validation-advice and-error">Password must be at least 6 characters long</div>');
		}
		flag = false;
		show_pass_error = false;
	}

	if(!is_empty(website_url)){
		if(!is_url(website_url)){
			if($('#web-error').length == 0) {
				  //it doesn't exist
				$('#website_url').after('<div id="web-error" class="validation-advice and-error">Enter valid url</div>');
			}
			flag = false;
		}

	}

	if(is_empty(occupation)){
		if($('#occ-error').length == 0) {
			  //it doesn't exist
			$('#occupation').after('<div id="occ-error" class="validation-advice and-error">Select occupation</div>');
		}
		flag = false;

	}

	var fname_flag = false;

	if(!is_string(first_name)){
		if($('#last-error').length != 0) {
			$('#last-error').remove();
		}
		if($('#last-valid-error').length != 0) {
			$('#last-valid-error').remove();
		}
		if($('#first-error').length != 0) {
			$('#first-error').remove();
		}
		if($('#first-valid-error').length == 0) {
			  //it doesn't exist
			$('#first_name').after('<div id="first-valid-error" class="validation-advice and-error">Enter valid first name</div>');
			fname_flag = true;
		}
		flag = false;
	}

	if(!is_string(last_name) && !fname_flag ){
		if($('#last-error').length != 0) {
			$('#last-error').remove();
		}
		if($('#first-valid-error').length != 0) {
			$('#first-valid-error').remove();
		}
		if($('#first-error').length != 0) {
			$('#first-error').remove();
		}
		if($('#first-valid-error').length == 0) {
			  //it doesn't exist
			$('#first_name').after('<div id="last-valid-error" class="validation-advice and-error">Enter valid last name</div>');
			fname_flag = true;
		}
		flag = false;
	}

	if(is_empty(first_name) && !fname_flag){
		if($('#first-valid-error').length != 0) {
			$('#first-valid-error').remove();
		}
		if($('#last-valid-error').length != 0) {
			$('#last-valid-error').remove();
		}
		if($('#last-error').length != 0) {
			$('#last-error').remove();
		}
		if($('#first-error').length == 0) {
			  //it doesn't exist
			$('#first_name').after('<div id="first-error" class="validation-advice and-error">Enter first name</div>');
			fname_flag = true;
		}
		flag = false;
	}

	if(is_empty(last_name) && !fname_flag){
			if($('#first-valid-error').length != 0) {
				$('#first-valid-error').remove();
			}
			if($('#last-valid-error').length != 0) {
				$('#last-valid-error').remove();
			}
			if($('#first-error').length != 0) {
				$('#first-error').remove();
			}
			if($('#last-error').length == 0) {
				  //it doesn't exist
				$('#last_name').after('<div id="last-error" class="validation-advice and-error">Enter last name</div>');
			}

		flag = false;
	}

	if(document.getElementById("gen-male").checked == false && document.getElementById("gen-female").checked == false){
		if($('#gender-error').length == 0) {
			  //it doesn't exist
			$('#arch_gender').after('<div id="gender-error" class="validation-advice and-error">Select gender</div>');
		}
		flag = false;
	}



	if(!is_empty(arch_sec_phone)){
		if(!is_numeric(arch_sec_phone)){

			/*if($('#sec-phone-error').length != 0) {
				$('#sec-phone-error').remove();
			}*/
			/*if($('#phone-len-error').length != 0) {
				$('#phone-len-error').remove();
			}*/
			$('#sec-phone-error').remove();
			if($('#sec-phone-error').length == 0) {
				  //it doesn't exist
				$('#arch_sec_phone').after('<div id="sec-phone-error" class="validation-advice and-error">Enter valid mobile number</div>');
			}
			flag = false;

		}

		if(is_numeric(arch_sec_phone) && arch_sec_phone.length < 10 ){
			/*if($('#phone-error').length != 0) {
				$('#phone-error').remove();
			}*/
			/*if($('#phone-num-error').length != 0) {
				$('#phone-num-error').remove();
			}*/
			$('#sec-phone-error').remove();
			if($('#sec-phone-error').length == 0) {
				  //it doesn't exist
				$('#arch_sec_phone').after('<div id="sec-phone-error" class="validation-advice and-error">Mobile must be at least 10 characters long</div>');
			}
			flag = false;
		}
	}

	if(is_empty(arch_phone)){
		if($('#phone-num-error').length != 0) {
			$('#phone-num-error').remove();
		}
		if($('#phone-len-error').length != 0) {
			$('#phone-len-error').remove();
		}
		if($('#phone-error').length == 0) {
			  //it doesn't exist
			$('#arch_phone').after('<div id="phone-error" class="validation-advice and-error">Enter mobile number</div>');
		}
		flag = false;
	}
	if(!is_empty(arch_phone)){
		if(!is_numeric(arch_phone)){

			if($('#phone-error').length != 0) {
				$('#phone-error').remove();
			}
			if($('#phone-len-error').length != 0) {
				$('#phone-len-error').remove();
			}
			if($('#phone-num-error').length == 0) {
				  //it doesn't exist
				$('#arch_phone').after('<div id="phone-num-error" class="validation-advice and-error">Enter valid mobile number</div>');
			}
			flag = false;
		}

		if(is_numeric(arch_phone) && arch_phone.length < 10 ){
			if($('#phone-error').length != 0) {
				$('#phone-error').remove();
			}
			if($('#phone-num-error').length != 0) {
				$('#phone-num-error').remove();
			}
			if($('#phone-len-error').length == 0) {
				  //it doesn't exist
				$('#arch_phone').after('<div id="phone-len-error" class="validation-advice and-error">Mobile must be at least 10 characters long</div>');
			}
			flag = false;
		}

	}

	if(is_empty(arch_city)){
		if($('#city-error').length == 0) {
			  //it doesn't exist
			$('#arch_city').after('<div id="city-error" class="validation-advice and-error">Enter city</div>');
		}
		flag = false;
	}

	if(is_empty(arch_pincode)){
		if($('#pincode-error').length == 0) {
			  //it doesn't exist
			$('#pincode').after('<div id="pincode-error" class="validation-advice and-error">Enter pincode</div>');
		}
		flag = false;
	}

	if(!is_numeric(arch_pincode)){
		if($('#pincode-error').length == 0) {
			  //it doesn't exist
			$('#pincode').after('<div id="pincode-error" class="validation-advice and-error">Enter valid pincode</div>');
		}
		flag = false;
	}

	if(arch_pincode.length < 6 ){
		if($('#pincode-error').length == 0) {
			  //it doesn't exist
			$('#pincode').after('<div id="pincode-error" class="validation-advice and-error">Pincode must be 6 digit</div>');
		}
		flag = false;
	}

	if(is_empty(arch_state)){
		if($('#state-error').length == 0) {
			  //it doesn't exist
			$('#arch_state').after('<div id="state-error" class="validation-advice and-error">Select state</div>');
		}
		flag = false;
	}

	if(is_empty(arch_address)){
		if($('#address-error').length == 0) {
			  //it doesn't exist
			$('#arch_address').after('<div id="address-error" class="validation-advice and-error" style="margin-bottom:10px;">Enter address</div>');
		}
		flag = false;
	}

	/*if(is_empty(house_num)){

		if($('#house-nu-error').length == 0) {
			  //it doesn't exist
			$('#house_num').after('<div id="house-nu-error" class="validation-advice">Enter house number.</div>');
		}
		flag = false;
	}


	if(is_empty(specialties)){
		if($('#specialties-error').length == 0) {
			  //it doesn't exist
			$('#specialties').after('<div id="specialties-error" class="validation-advice and-error">This is a required field</div>');
		}
		flag = false;
	}
	*/
	/*if(is_empty(item_url_1) || is_empty(item_url_2) || is_empty(item_url_3) || is_empty(item_url_4) || is_empty(item_url_5)){
		if($('#item_url_5-unique-error').length != 0) {
			$('#item_url_5-unique-error').remove();
		}
		if($('#item_url_5-error').length == 0) {
			  //it doesn't exist
			$('#item_url_5').after('<div id="item_url_5-error" class="validation-advice and-error">Please enter valid Pepperfry item page URL</div>');
		}
		flag = false;
	}*/

	if(!is_empty(item_url_1) || !is_empty(item_url_2) || !is_empty(item_url_3) || !is_empty(item_url_4) || !is_empty(item_url_5)){

		/*if(is_url(item_url_1) || is_url(item_url_2) || is_url(item_url_3) || is_url(item_url_4) || is_url(item_url_5)){
		}else{
			if($('#item_url_5-unique-error').length != 0) {
				$('#item_url_5-unique-error').remove();
			}
			if($('#item_url_5-error').length == 0) {
				  //it doesn't exist
				$('#item_url_5').after('<div id="item_url_5-error" class="validation-advice and-error">Please enter valid Pepperfry item page URL</div>');
			}
			flag = false;
		}*/

		if(!is_empty(item_url_1) || !is_empty(item_url_2) || !is_empty(item_url_3) || !is_empty(item_url_4) || !is_empty(item_url_5)){
			if(is_url(item_url_1) || is_url(item_url_2) || is_url(item_url_3) || is_url(item_url_4) || is_url(item_url_5)){

				if( (!is_empty(item_url_1) && (item_url_1 == item_url_2  || item_url_1 == item_url_3 || item_url_1 == item_url_4 || item_url_1 == item_url_5))){
					if($('#item_url_1-error').length != 0) {
						$('#item_url_1-error').remove();
					}
					if($('#item_url_1-unique-error').length == 0) {
						  //it doesn't exist
						$('#item_url_1').after('<div id="item_url_1-unique-error" class="validation-advice and-error">Please enter unique Pepperfry item page URL</div>');

					}
						flag = false;
				}
				if( (!is_empty(item_url_2)  && (item_url_2 == item_url_1  || item_url_2 == item_url_3 || item_url_2 == item_url_4 || item_url_2 == item_url_5))){
					if($('#item_url_2-error').length != 0) {
						$('#item_url_2-error').remove();
					}
					if($('#item_url_2-unique-error').length == 0) {
						  //it doesn't exist
						$('#item_url_2').after('<div id="item_url_2-unique-error" class="validation-advice and-error">Please enter unique Pepperfry item page URL</div>');

					}
					flag = false;
				}
				if( (!is_empty(item_url_3)  && (item_url_3 == item_url_1  || item_url_3 == item_url_2 || item_url_3 == item_url_4 || item_url_3 == item_url_5))){
					if($('#item_url_3-error').length != 0) {
						$('#item_url_3-error').remove();
					}
					if($('#item_url_3-unique-error').length == 0) {
						  //it doesn't exist
						$('#item_url_3').after('<div id="item_url_3-unique-error" class="validation-advice and-error">Please enter unique Pepperfry item page URL</div>');

					}
					flag = false;
				}
				if( (!is_empty(item_url_4) && (item_url_4 == item_url_1  || item_url_4 == item_url_2 || item_url_4 == item_url_3 || item_url_4 == item_url_5))){
					if($('#item_url_4-error').length != 0) {
						$('#item_url_4-error').remove();
					}
					if($('#item_url_4-unique-error').length == 0) {
						  //it doesn't exist
						$('#item_url_4').after('<div id="item_url_4-unique-error" class="validation-advice and-error">Please enter unique Pepperfry item page URL</div>');

					}
					flag = false;
				}
				if( (!is_empty(item_url_5) && (item_url_5 == item_url_1  || item_url_5 == item_url_2 || item_url_5 == item_url_3 || item_url_5 == item_url_4))){
					if($('#item_url_5-error').length != 0) {
						$('#item_url_5-error').remove();
					}
					if($('#item_url_5-unique-error').length == 0) {
						  //it doesn't exist
						$('#item_url_5').after('<div id="item_url_5-unique-error" class="validation-advice and-error">Please enter unique Pepperfry item page URL</div>');

					}
					flag = false;
				}

			}
		}
	}
        
        if(flag == false) {
            $('#tracksubmit').removeClass('btn_loader');
        }
        $('#tracksubmit').removeAttr('disabled');
	return flag;
}



function admin_validate_register(){
	var arc_password = $.trim($('#arch_password').val());
	var arc_confpass = $.trim($('#arch_confirm_password').val());
	var occupation   = $.trim($('#occupation').val());
	var first_name   = $.trim($('#first_name').val());
	var last_name    = $.trim($('#last_name').val());
	var arch_gender  = $.trim($('.arch_gender').val());
	var arch_phone   = $.trim($('#arch_phone').val());
	var arch_pincode   = $.trim($('#pincode').val());
	var arch_sec_phone   = $.trim($('#arch_sec_phone').val());
	var arch_city    = $.trim($('#arch_city').val());
	var arch_state   = $.trim($('#arch_state').val());
	var arch_address = $.trim($('#arch_address').val());
	var house_num    = $.trim($('#house_num').val());
	var website_url  = $.trim($('#website_url').val());
	var specialties  = $.trim($('#specialties').val());
	var item_url_1   = $.trim($('#item_url_1').val());
	var item_url_2   = $.trim($('#item_url_2').val());
	var item_url_3   = $.trim($('#item_url_3').val());
	var item_url_4   = $.trim($('#item_url_4').val());
	var item_url_5   = $.trim($('#item_url_5').val());

	if($('.and-error').length != 0) {
		$('.and-error').remove();
	}
	var flag = true;
	var show_pass_error = true;
	/*if(is_empty(arc_password) && !is_login){
		if($('#arc-conf-pass-miss-error').length != 0) {
			$('#arc-conf-pass-miss-error').remove();
		}
		if($('#arc-pass-error').length == 0) {
			  //it doesn't exist
			$('#arch_password').after('<div id="arc-pass-error" class="validation-advice and-error">Enter Password</div>');
		}
		flag = false;
		show_pass_error = false;
	}

	if(is_empty(arc_confpass) && show_pass_error && !is_login){
		if($('#arc-conf-pass-miss-error').length != 0) {
			$('#arc-conf-pass-miss-error').remove();
		}
		if($('#arc-conf-pass-error').length == 0) {
			  //it doesn't exist
			$('#arch_confirm_password').after('<div id="arc-conf-pass-error" class="validation-advice and-error">Enter Confirm password</div>');
		}
		flag = false;
		show_pass_error = false;

	}

	alert(flag);
	if(arc_password != arc_confpass && show_pass_error && !is_login){
		if($('#arc-conf-pass-error').length != 0) {
			$('#arc-conf-pass-error').remove();
		}
		if($('#arc-pass-error').length != 0) {
			$('#arc-pass-error').remove();
		}
		if($('#arc-conf-pass-miss-error').length == 0) {
			  //it doesn't exist
			$('#arch_confirm_password').after('<div id="arc-conf-pass-miss-error" class="validation-advice and-error">Password does not match</div>');
		}
		flag = false;
		show_pass_error = false;
	}

	if(arc_password.length < 6 && show_pass_error && !is_login){
		if($('#arc-conf-pass-error').length != 0) {
			$('#arc-conf-pass-error').remove();
		}
		if($('#arc-pass-error').length != 0) {
			$('#arc-pass-error').remove();
		}
		if($('#arc-pass-error').length != 0) {
			$('#arc-pass-error').remove();
		}
		if($('#arc-conf-pass-min-error').length == 0) {
			  //it doesn't exist
			$('#arch_confirm_password').after('<div id="arc-conf-pass-min-error" class="validation-advice and-error">Password must be at least 6 characters long</div>');
		}
		flag = false;
		show_pass_error = false;
	}
	*/
	if(!is_empty(website_url)){
		if(!is_url(website_url)){
			if($('#web-error').length == 0) {
				  //it doesn't exist
				$('#website_url').after('<div id="web-error" class="validation-advice and-error">Enter valid url</div>');
			}
			flag = false;
		}

	}

	if(is_empty(occupation)){
		if($('#occ-error').length == 0) {
			  //it doesn't exist
			$('#occupation').after('<div id="occ-error" class="validation-advice and-error">Select occupation</div>');
		}
		flag = false;

	}

	var fname_flag = false;

	if(!is_string(first_name)){
		if($('#last-error').length != 0) {
			$('#last-error').remove();
		}
		if($('#last-valid-error').length != 0) {
			$('#last-valid-error').remove();
		}
		if($('#first-error').length != 0) {
			$('#first-error').remove();
		}
		if($('#first-valid-error').length == 0) {
			  //it doesn't exist
			$('#first_name').after('<div id="first-valid-error" class="validation-advice and-error">Enter valid first name</div>');
			fname_flag = true;
		}
		flag = false;
	}

	if(!is_string(last_name) && !fname_flag ){
		if($('#last-error').length != 0) {
			$('#last-error').remove();
		}
		if($('#first-valid-error').length != 0) {
			$('#first-valid-error').remove();
		}
		if($('#first-error').length != 0) {
			$('#first-error').remove();
		}
		if($('#first-valid-error').length == 0) {
			  //it doesn't exist
			$('#first_name').after('<div id="last-valid-error" class="validation-advice and-error">Enter valid last name</div>');
			fname_flag = true;
		}
		flag = false;
	}

	if(is_empty(first_name) && !fname_flag){
		if($('#first-valid-error').length != 0) {
			$('#first-valid-error').remove();
		}
		if($('#last-valid-error').length != 0) {
			$('#last-valid-error').remove();
		}
		if($('#last-error').length != 0) {
			$('#last-error').remove();
		}
		if($('#first-error').length == 0) {
			  //it doesn't exist
			$('#first_name').after('<div id="first-error" class="validation-advice and-error">Enter first name</div>');
			fname_flag = true;
		}
		flag = false;
	}

	if(is_empty(last_name) && !fname_flag){
			if($('#first-valid-error').length != 0) {
				$('#first-valid-error').remove();
			}
			if($('#last-valid-error').length != 0) {
				$('#last-valid-error').remove();
			}
			if($('#first-error').length != 0) {
				$('#first-error').remove();
			}
			if($('#last-error').length == 0) {
				  //it doesn't exist
				$('#last_name').after('<div id="last-error" class="validation-advice and-error">Enter last name</div>');
			}

		flag = false;
	}

	if(document.getElementById("gen-male").checked == false && document.getElementById("gen-female").checked == false){
		if($('#gender-error').length == 0) {
			  //it doesn't exist
			$('#arch_gender').after('<div id="gender-error" class="validation-advice and-error">Select gender</div>');
		}
		flag = false;
	}

	if(is_empty(arch_phone)){
		if($('#phone-num-error').length != 0) {
			$('#phone-num-error').remove();
		}
		if($('#phone-len-error').length != 0) {
			$('#phone-len-error').remove();
		}
		if($('#phone-error').length == 0) {
			  //it doesn't exist
			$('#arch_phone').after('<div id="phone-error" class="validation-advice and-error">Enter mobile number</div>');
		}
		flag = false;
	}

	if(!is_empty(arch_sec_phone)){
		if(!is_numeric(arch_sec_phone)){

			/*if($('#sec-phone-error').length != 0) {
				$('#sec-phone-error').remove();
			}*/
			/*if($('#phone-len-error').length != 0) {
				$('#phone-len-error').remove();
			}*/
			$('#sec-phone-error').remove();
			if($('#sec-phone-error').length == 0) {
				  //it doesn't exist
				$('#arch_sec_phone').after('<div id="sec-phone-error" class="validation-advice and-error">Enter valid mobile number</div>');
			}
			flag = false;

		}

		if(is_numeric(arch_sec_phone) && arch_sec_phone.length < 10 ){
			/*if($('#phone-error').length != 0) {
				$('#phone-error').remove();
			}*/
			/*if($('#phone-num-error').length != 0) {
				$('#phone-num-error').remove();
			}*/
			$('#sec-phone-error').remove();
			if($('#sec-phone-error').length == 0) {
				  //it doesn't exist
				$('#arch_sec_phone').after('<div id="sec-phone-error" class="validation-advice and-error">Mobile must be at least 10 characters long</div>');
			}
			flag = false;
		}
	}

	  if(!is_numeric(arch_phone)){

			if($('#phone-error').length != 0) {
				$('#phone-error').remove();
			}
			if($('#phone-len-error').length != 0) {
				$('#phone-len-error').remove();
			}
			if($('#phone-num-error').length == 0) {
				  //it doesn't exist
				$('#arch_phone').after('<div id="phone-num-error" class="validation-advice and-error">Enter valid mobile number</div>');
			}
			flag = false;
		}

		if(is_numeric(arch_phone) && arch_phone.length < 10 ){
			if($('#phone-error').length != 0) {
				$('#phone-error').remove();
			}
			if($('#phone-num-error').length != 0) {
				$('#phone-num-error').remove();
			}
			if($('#phone-len-error').length == 0) {
				  //it doesn't exist
				$('#arch_phone').after('<div id="phone-len-error" class="validation-advice and-error">Mobile must be at least 10 characters long</div>');
			}
			flag = false;
		}



	if(is_empty(arch_city)){
		if($('#city-error').length == 0) {
			  //it doesn't exist
			$('#arch_city').after('<div id="city-error" class="validation-advice and-error">Enter city</div>');
		}
		flag = false;
	}

	if(is_empty(pincode)){
		if($('#pincode-error').length == 0) {
			  //it doesn't exist
			$('#pincode').after('<div id="pincode-error" class="validation-advice and-error">Enter pincode</div>');
		}
		flag = false;
	}

	if(is_empty(arch_state)){
		if($('#state-error').length == 0) {
			  //it doesn't exist
			$('#arch_state').after('<div id="state-error" class="validation-advice and-error">Select state</div>');
		}
		flag = false;
	}

	if(is_empty(arch_address)){
		if($('#address-error').length == 0) {
			  //it doesn't exist
			$('#arch_address').after('<div id="address-error" class="validation-advice and-error" style="margin-bottom:10px;">Enter address</div>');
		}
		flag = false;
	}

	/*if(is_empty(house_num)){

		if($('#house-nu-error').length == 0) {
			  //it doesn't exist
			$('#house_num').after('<div id="house-nu-error" class="validation-advice">Enter house number.</div>');
		}
		flag = false;
	}*/


	/*if(is_empty(specialties)){
		if($('#specialties-error').length == 0) {
			  //it doesn't exist
			$('#specialties').after('<div id="specialties-error" class="validation-advice and-error">This is a required field</div>');
		}
		flag = false;
	}

	if(is_empty(item_url_1) || is_empty(item_url_2) || is_empty(item_url_3) || is_empty(item_url_4) || is_empty(item_url_5)){
		if($('#item_url_5-unique-error').length != 0) {
			$('#item_url_5-unique-error').remove();
		}
		if($('#item_url_5-error').length == 0) {
			  //it doesn't exist
			$('#item_url_5').after('<div id="item_url_5-error" class="validation-advice and-error">Please enter valid Pepperfry item page URL</div>');
		}
		flag = false;
	}

	if(is_url(item_url_1) && is_url(item_url_2) && is_url(item_url_3) && is_url(item_url_4) && is_url(item_url_5)){
	}else{
		if($('#item_url_5-unique-error').length != 0) {
			$('#item_url_5-unique-error').remove();
		}
		if($('#item_url_5-error').length == 0) {
			  //it doesn't exist
			$('#item_url_5').after('<div id="item_url_5-error" class="validation-advice and-error">Please enter valid Pepperfry item page URL</div>');
		}
		flag = false;
	}

	if(!is_empty(item_url_1) && !is_empty(item_url_2) && !is_empty(item_url_3) && !is_empty(item_url_4) && !is_empty(item_url_5)){
		if(is_url(item_url_1) && is_url(item_url_2) && is_url(item_url_3) && is_url(item_url_4) && is_url(item_url_5)){
			if(item_url_1 == item_url_2 && item_url_2 == item_url_3 && item_url_3 == item_url_4 && item_url_4 == item_url_5) {
				  //it doesn't exist
				if($('#item_url_5-error').length != 0) {
					$('#item_url_5-error').remove();
				}
				if($('#item_url_5-unique-error').length == 0) {
					  //it doesn't exist
					$('#item_url_5').after('<div id="item_url_5-unique-error" class="validation-advice and-error">Please enter unique Pepperfry item page URL</div>');

				}
				flag = false;
			}

		}
	}*/

	return flag;
}

function is_url(value){
	/*var filter = /\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i;
	if(filter.test(value)){
		return true;
	}
	return false;*/
	var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/i;
	//alert(value +' : '+regexp.test(value));
	return regexp.test(value);
}

function is_email(email){
	var filter = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if(filter.test(email)){
		return true;
	}
	return false;
}

function is_empty(value){
	if(value == ''){
		return true;
	}
	return false;
}

function is_numeric(value){
	var filter = /^[0-9]+$/;
	if(filter.test(value)){
		return true;
	}
	return false;
}

function is_string(value){
	var filter = /^[a-zA-Z]*$/;
	if(filter.test(value)){
		return true;
	}
	return false;
}

function contact_designer(user_id){
        $('.design_guru_popup').fadeOut(200);
        if(user_id > 0){
		path = site_url+"/designgurus/contact";
			$.ajax({url: path,
					data:{user_id:user_id},
					type: "POST",
					beforeSend : function(){
								$("#login_error").html('<center><image src="'+site_url+'/media/image/opc-ajax-loader.gif"/></center>');
								},
					success: function(data){
							//alert(data);
							//parent.$.fancybox.close();
							//parent.location.reload();
						document.getElementById('contactus').innerHTML=data;
						//$('#contact_submit').show();
						//$('#contact_loader').hide();
						$('.popup_inner').find('#contact_name').html('');
						//$('.and-error').remove();
						$('#contactus').fadeIn(200);
                                                $('#contactbox').fadeIn(200);
                                                console.log(user_id);
						$('.popup_inner').find('#arch_user_id').val(user_id);
						$('.popup_inner').find('#contact_name').html($('#name_'+user_id).text());

					},
					error: function(x,y,z){
						alert('An error has occurred:\n'+x+'\n'+y+'\n'+z);
					}
				});

	}
}

function valid_search(){
	var search_city       = $('#search_city').val();
	var search_occupation = $('#search_occupation').val();
	if(is_empty(search_city) && is_empty(search_occupation)){
		alert('Please select city or occupation. ');
		return false;
	}
	return true;
}

function arch_contact(){
	var flag = true;
	$('.and-error').remove();
	var arch_firstname = $.trim($('#arch_firstname').val());
	var arch_lastname  = $.trim($('#arch_lastname').val());
	var arch_email     = $.trim($('#arch_email1').val());
	var arch_phone     = $.trim($('#arch_phone').val());
	var arch_user_id   = $.trim($('#arch_user_id').val());
	var arch_comment   = $.trim($('#arch_comment').val());
	var arch_agree     = true;

        if(!$('#arch_agree').is(':checked')){
		if($('#arch_agree-error').length != 0) {
			$('#arch_agree-error').remove();
		}
		if($('#arch_agree-error').length == 0) {
			  //it doesn't exist
			arch_agree     = false;
			$('#arch_agree').after('<div id="arch_agree-error" class="validation-advice and-error">Accept terms and condition</div>');
		}
	}


	if(is_empty(arch_firstname)){
		if($('#arch_firstname-error').length == 0) {
			  //it doesn't exist
			$('#arch_firstname').after('<div id="arch_firstname-error" class="validation-advice and-error">Firstname required</div>');
			flag = false;
		}
	}else{
		if(is_empty(arch_lastname)){
			if($('#arch_lastname-error').length == 0) {
				  //it doesn't exist
				$('#arch_lastname').after('<div id="arch_lastname-error" class="validation-advice and-error">Lastname required</div>');
				flag = false;
			}
		}
	}

	if(!is_string(arch_firstname)){
		if($('#arch_firstname-error').length == 0) {
			  //it doesn't exist
			$('#arch_firstname').after('<div id="arch_firstname-error" class="validation-advice and-error">Enter valid Firstname</div>');
			flag = false;
		}
	}else{
		if(!is_string(arch_lastname)){
			if($('#arch_lastname-error').length == 0) {
				  //it doesn't exist
				$('#arch_lastname').after('<div id="arch_lastname-error" class="validation-advice and-error">Enter valid Lastname</div>');
				flag = false;
			}
		}
	}


	if(!is_email(arch_email)){
		if($('#arch_email-error').length == 0) {
			  //it doesn't exist

			$('#arch_email1').after('<div id="arch_email-error" class="validation-advice and-error">Enter valid Email</div>');
			flag = false;
		}else
		{

			$('#arch_email1').after('<div id="arch_email-error" class="validation-advice and-error">Enter valid Email</div>');
			flag = false;
		}
	}

	if(!is_empty(arch_phone) && is_numeric(arch_phone)){
		if(arch_phone.length >= 10 && arch_phone.length <= 12){

		}else{
			if($('#arch_phone-error').length == 0) {
				  //it doesn't exist
				$('#arch_phone').after('<div id="arch_phone-error" class="validation-advice and-error">Phone number must be atleast 10</div>');
				flag = false;
			}
		}

	}else{
		if($('#arch_phone-error').length == 0) {
			  //it doesn't exist
			$('#arch_phone').after('<div id="arch_phone-error" class="validation-advice and-error">Enter valid Phone number</div>');
			flag = false;
		}
	}
	if(is_empty(arch_comment)){
		if($('#arch_comment-error').length == 0) {
			  //it doesn't exist
			$('#arch_comment').after('<div id="arch_comment-error" class="validation-advice and-error">Comment required</div>');
			flag = false;
		}

	}



	if(flag){
		$('#contact_loader').show();
		$.ajax({
			url:'/designgurus/contact_post',
			data:'arch_firstname='+arch_firstname+'&arch_lastname='+arch_lastname+'&arch_email='+arch_email+'&arch_phone='+arch_phone+'&arch_user_id='+arch_user_id+'&arch_comment='+arch_comment+'&agree='+arch_agree,
			type:'post',
			success:function(data){
				data = $.trim(data);
				if(data == 'success'){
					//alert('Mail sent succesfully.');
					$('#contact_interact').html('<label style="color:green">Mail sent succesfully.</label>').fadeOut(1000, function(){
						$('#contactbox').hide();
						$('#contact_loader').hide();
						$('#contact_submit').hide();
						$('#arch_firstname').val('');
						$('#arch_lastname').val('');
						$('#arch_email1').val('');
						$('#arch_phone').val('');
						$('#arch_user_id').val('');
						$('#arch_comment').val('');
                                                $('#contactus').fadeOut(500);
                                                $('#popup_overlay').removeClass('active');
					});
				}else{
					alert('Failed try later.');
				}
			}
		});
	}
}


function show(show_id, edit_link, allow_pattern){
	if(allow_pattern){
		if(show_id != '' ){
			$('[id^="'+show_id+'"]').show();
                        //$('#'+edit_link).hide();
			$('[id^="'+edit_link+'"]').hide();
		}
	}else{
		if(show_id != '' ){
			$('#'+show_id).show();
			$('#'+edit_link).hide();
		}
	}
}

function hide(hide_id, edit_link, allow_pattern){
	if(allow_pattern){
		if(hide_id != '' ){
			$('[id^="'+hide_id+'"]').hide();
			//$('#'+edit_link).show();
			$('[id^="'+edit_link+'"]').show();
		}
	}else{
		if(hide_id != '' ){
			$('#'+hide_id).hide();
			$('#'+edit_link).show();
		}
	}
}



/*
 * save speciality
 */
function save_specialties(save_id, edit_link){
	if(save_id != '' && edit_link != ''){
		var specialties = $('#edit_specialties').val();
		var flag = true;
		$('.and-error').remove();
		if(is_empty(specialties)){
			if($('#edit_specialties-error').length == 0) {
				  //it doesn't exist
				$('#edit_specialties').after('<div id="specialties-error" class="validation-advice and-error">This is a required field</div>');
				flag = false;
			}
		}

			if(flag){

				$.ajax({
					url:'/designgurus/update_specialties',
					type:'post',
					data:'specialties='+specialties,
					success:function(data){
						data = $.trim(data);
						if(data == 'success'){
							hide(save_id, edit_link, true);
							$('#my_speciality').show();
							 location.reload();
						}else{
							var obj = $.parseJSON(data);
							if(is_object(obj)){
								$.each( obj, function( key, value ) {
									//alert( key + ": " + value );
									$('#edit_specialties').after('<div id="edit_specialties-error" class="validation-advice and-error">'+value+'</div>');

								});
							}

						}

					},error:function(){
						alert('Please try later');
					}
				});
			}


	}

}
/*
 * save web url
 */
function save_web_url(save_id, edit_link){
	if(save_id != '' && edit_link != ''){
		var flag = true;
		$('.and-error').remove();
		var website_url = $('#edit_web_url').val();

		if(is_empty(website_url)){
			if($('#web-error').length == 0) {
				  //it doesn't exist
				$('#edit_web_url').after('<div id="web-error" class="validation-advice and-error">Enter valid url</div>');
			}
			flag = false;
		}
		if(!is_url(website_url)){
			if($('#web-error').length == 0) {
				  //it doesn't exist
				$('#edit_web_url').after('<div id="web-error" class="validation-advice and-error">Enter valid url</div>');
			}
			flag = false;
		}
		if(flag){
			$.ajax({
				url:'/designgurus/update_web_url',
				type:'post',
				data:'web_url='+website_url,
				success:function(data){
					data = $.trim(data);
					if(data == 'success'){
						hide(save_id, edit_link, true);
						$('#edit_web_url_link').show();
						location.reload();
					}else{
						var obj = $.parseJSON(data);
						if(is_object(obj)){
							$.each( obj, function( key, value ) {
								$('#edit_web_url').after('<div id="specialties-error" class="validation-advice and-error">'+value+'</div>');
							});
						}

					}

				},error:function(){
					alert('Please try later');
				}
			});
		}
	}
}

/*
 * save favourite url
 */
function save_my_favourite(save_id, edit_link){
	if(save_id != '' && edit_link != ''){
		flag = true;

		$('.and-error').remove();
		var item_url_1   = $.trim($('#edit_prod_url_1').val());
		var item_url_2   = $.trim($('#edit_prod_url_2').val());
		var item_url_3   = $.trim($('#edit_prod_url_3').val());
		var item_url_4   = $.trim($('#edit_prod_url_4').val());
		var item_url_5   = $.trim($('#edit_prod_url_5').val());

		if(is_empty(item_url_1) && is_empty(item_url_2) && is_empty(item_url_3) && is_empty(item_url_4) && is_empty(item_url_5)){
			if($('#item_url_5-unique-error').length != 0) {
				$('#item_url_5-unique-error').remove();
			}
			if($('#item_url_5-error').length == 0) {
				  //it doesn't exist
				$('#item_url_5').after('<div id="item_url_5-error" class="validation-advice and-error">Please enter valid Pepperfry item page URL</div>');
			}
			flag = false;
		}

		if(!is_empty(item_url_1)){
			if(!is_url(item_url_1)){
				if($('#item_url_5-unique-error').length != 0) {
					$('#item_url_5-unique-error').remove();
				}
				if($('#item_url_5-error').length == 0) {
					  //it doesn't exist
					$('#item_url_1').after('<div id="item_url_5-error" class="validation-advice and-error">Please enter valid Pepperfry item page URL</div>');
				}
				flag = false;
			}
		}

		if(!is_empty(item_url_2)){
			if(!is_url(item_url_2)){
				if($('#item_url_5-unique-error').length != 0) {
					$('#item_url_5-unique-error').remove();
				}
				if($('#item_url_5-error').length == 0) {
					  //it doesn't exist
					$('#item_url_2').after('<div id="item_url_5-error" class="validation-advice and-error">Please enter valid Pepperfry item page URL</div>');
				}
				flag = false;
			}
		}

		if(!is_empty(item_url_3)){
			if(!is_url(item_url_3)){
				if($('#item_url_5-unique-error').length != 0) {
					$('#item_url_5-unique-error').remove();
				}
				if($('#item_url_5-error').length == 0) {
					  //it doesn't exist
					$('#item_url_3').after('<div id="item_url_5-error" class="validation-advice and-error">Please enter valid Pepperfry item page URL</div>');
				}
				flag = false;
			}
		}

		if(!is_empty(item_url_4)){
			if(!is_url(item_url_4)){
				if($('#item_url_5-unique-error').length != 0) {
					$('#item_url_5-unique-error').remove();
				}
				if($('#item_url_5-error').length == 0) {
					  //it doesn't exist
					$('#item_url_4').after('<div id="item_url_5-error" class="validation-advice and-error">Please enter valid Pepperfry item page URL</div>');
				}
				flag = false;
			}
		}
		if(!is_empty(item_url_5)){
			if(!is_url(item_url_5)){
				if($('#item_url_5-unique-error').length != 0) {
					$('#item_url_5-unique-error').remove();
				}
				if($('#item_url_5-error').length == 0) {
					  //it doesn't exist
					$('#item_url_5').after('<div id="item_url_5-error" class="validation-advice and-error">Please enter valid Pepperfry item page URL</div>');
				}
				flag = false;
			}
		}
		/*if(is_url(item_url_1) && is_url(item_url_2) && is_url(item_url_3) && is_url(item_url_4) && is_url(item_url_5)){
		}else{
			if($('#item_url_5-unique-error').length != 0) {
				$('#item_url_5-unique-error').remove();
			}
			if($('#item_url_5-error').length == 0) {
				  //it doesn't exist
				$('#item_url_5').after('<div id="item_url_5-error" class="validation-advice and-error">Please enter valid Pepperfry item page URL</div>');
			}
			flag = false;
		}

		if(!is_empty(item_url_1) && !is_empty(item_url_2) && !is_empty(item_url_3) && !is_empty(item_url_4) && !is_empty(item_url_5)){
			if(is_url(item_url_1) && is_url(item_url_2) && is_url(item_url_3) && is_url(item_url_4) && is_url(item_url_5)){
				if(item_url_1 == item_url_2 && item_url_2 == item_url_3 && item_url_3 == item_url_4 && item_url_4 == item_url_5) {
					  //it doesn't exist
					if($('#item_url_5-error').length != 0) {
						$('#item_url_5-error').remove();
					}
					if($('#item_url_5-unique-error').length == 0) {
						  //it doesn't exist
						$('#item_url_5').after('<div id="item_url_5-unique-error" class="validation-advice and-error">Please enter unique Pepperfry item page URL</div>');

					}
					flag = false;
				}

			}
		}*/
		//alert(flag);
		if(flag){
			  //alert('for unique');
			if( (!is_empty(item_url_1) && (item_url_1 == item_url_2  || item_url_1 == item_url_3 || item_url_1 == item_url_4 || item_url_1 == item_url_5))){
				if($('#item_url_1-error').length != 0) {
					$('#item_url_1-error').remove();
				}
				if($('#item_url_1-unique-error').length == 0) {
					  //it doesn't exist
					$('#item_url_1').after('<div id="item_url_1-unique-error" class="validation-advice and-error">Please enter unique Pepperfry item page URL</div>');

				}
					flag = false;
			}
			if( (!is_empty(item_url_2)  && (item_url_2 == item_url_1  || item_url_2 == item_url_3 || item_url_2 == item_url_4 || item_url_2 == item_url_5))){
				if($('#item_url_2-error').length != 0) {
					$('#item_url_2-error').remove();
				}
				if($('#item_url_2-unique-error').length == 0) {
					  //it doesn't exist
					$('#item_url_2').after('<div id="item_url_2-unique-error" class="validation-advice and-error">Please enter unique Pepperfry item page URL</div>');

				}
				flag = false;
			}
			if( (!is_empty(item_url_3)  && (item_url_3 == item_url_1  || item_url_3 == item_url_2 || item_url_3 == item_url_4 || item_url_3 == item_url_5))){
				if($('#item_url_3-error').length != 0) {
					$('#item_url_3-error').remove();
				}
				if($('#item_url_3-unique-error').length == 0) {
					  //it doesn't exist
					$('#item_url_3').after('<div id="item_url_3-unique-error" class="validation-advice and-error">Please enter unique Pepperfry item page URL</div>');

				}
				flag = false;
			}
			if( (!is_empty(item_url_4) && (item_url_4 == item_url_1  || item_url_4 == item_url_2 || item_url_4 == item_url_3 || item_url_4 == item_url_5))){
				if($('#item_url_4-error').length != 0) {
					$('#item_url_4-error').remove();
				}
				if($('#item_url_4-unique-error').length == 0) {
					  //it doesn't exist
					$('#item_url_4').after('<div id="item_url_4-unique-error" class="validation-advice and-error">Please enter unique Pepperfry item page URL</div>');

				}
				flag = false;
			}
			if( (!is_empty(item_url_5) && (item_url_5 == item_url_1  || item_url_5 == item_url_2 || item_url_5 == item_url_3 || item_url_5 == item_url_4))){
				if($('#item_url_5-error').length != 0) {
					$('#item_url_5-error').remove();
				}
				if($('#item_url_5-unique-error').length == 0) {
					  //it doesn't exist
					$('#item_url_5').after('<div id="item_url_5-unique-error" class="validation-advice and-error">Please enter unique Pepperfry item page URL</div>');

				}
				flag = false;
			}


		}
		//alert(flag);
		//}
		//test server
		//flag = true;
		if(flag){
			$.ajax({
				url:'/designgurus/update_url',
				type:'post',
				data:'item_url_1='+item_url_1+'&item_url_2='+item_url_2+'&item_url_3='+item_url_3+'&item_url_4='+item_url_4+'&item_url_5='+item_url_5,
				success:function(data){
                                        //alert(data);
					data = $.trim(data);
					if(data == 'success'){
                                            //alert(save_id + "  "+edit_link);
						hide(save_id, edit_link, true);
						location.reload();
					}else{

							var obj = $.parseJSON(data);
							if(is_object(obj)){
								$.each( obj, function( key, value ) {
									//alert( key + ": " + value );
									$('#'+key).after('<div id="item_url_'+key+'-unique-error" class="validation-advice and-error">'+value+'</div>');
									if(key == 'url_unique'){
										$('#item_url_5').after('<div id="item_url_'+key+'-unique-error" class="validation-advice and-error">'+value+'</div>');
									}
								});
							}
						//}

					}

				},error:function(){
					alert('Please try later');
				}
			});
		}


	}

}

var edit_mode = false;
$(document).ready(function(){
	//check on which fancy box is set, exist
	if( $(".fancybox-button").length != 0) {
		$(".fancybox-button").fancybox({
			prevEffect		: 'none',
			nextEffect		: 'none',
			closeBtn		: false,
			helpers		: {
				title	: { type : 'inside' },
				buttons	: {}
			},
			beforeLoad: function(){
				if(edit_mode){
					//alert($(this.element).attr("id")+'Edit mode On.');
					var attr = $(this.element).attr('id');
					if (typeof attr != 'undefined' && attr != false) {
						var gall_id = $(this.element).attr("id");
						var my_id   = gall_id.split('_');
						edit_my_gallery(my_id[1]);
						return false;
					}

				}
			}

		});
	}

         $("#designercity").autocomplete({
                source: root_url+"/designgurus/suggest_city",
                minLength: 3,
	        appendTo: "#auto_result",
                select: function(event, ui) {
                    $('#designercity').val(ui.item.value);
                }
        });
        
        
        $(document).on('change','.rememberme',function(){
        if($(this).is(':checked')){
                $(this).parent().addClass('active');
        }else{
                $(this).parent().removeClass('active');
        }
        });

});


function done_gallery(curr_ele, delete_hide, edit_show){
	$(this).hide();
	$('[id^="'+delete_hide+'"]').hide();
	$('#'+curr_ele).hide();
	$('#'+edit_show).show();
	edit_mode = false;
	location.reload();
}

function edit_my_gallery(gall_id){
	//alert(gall_id);
	if(gall_id > 0 && edit_mode){
		var title= $('#tmp_sample_title_'+gall_id).val();
		var desc= $('#tmp_sample_desc_'+gall_id).val();
		//alert(title+ ' : ' +desc);
		$('#pop_edit_sample').show();
		$('#sample_id').val(gall_id);
		$('#sample_title').val(title);
		$('#sample_desc').val(desc);
		$('#sample_image').attr('src', $('#editmyimg_'+gall_id).attr('src'));
	}
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
						location.reload();
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

function sample_edit(){
	$('.and-error').remove();
	$('#sample-interaction').html('');
	var sample_title = $('#sample_title').val();
	var sample_desc  = $('#sample_desc').val();
	var gall_id      = $('#sample_id').val();
	var flag = true;
	if(is_empty(sample_title)){
		flag = false;
		$('#sample_title').after('<div id="sample-title-error" class="validation-advice and-error">Title is required</div>');
	}
	if(is_empty(sample_desc)){
		flag = false;
		$('#sample_desc').after('<div id="sample-description-error" class="validation-advice and-error">Description is required</div>');
	}
	//flag=true;
	if(flag && gall_id > 0){
		$.ajax({
			url:'/designgurus/update_sample',
			type:'post',
			data:'sample_title='+sample_title+'&sample_desc='+sample_desc+'&gall_id='+gall_id,
			success:function(data){
				data = $.trim(data);
				if(data == 'success'){
					$('#sample-interaction').html('<label style="color:green;">Sample Edited succesfully</label>');
					$('#sample_title').val('');
					$('#sample_desc').val('');
					$('#sample_id').val('');
					location.reload();
				}else{
					var obj = $.parseJSON(data);
					if(is_object(obj)){
						$.each( obj, function( key, value ) {
							//alert( key + ": " + value );
							$('#'+key).after('<div id="'+key+'-error" class="validation-advice and-error">'+value+'</div>');

						});
					}
				}

			},
			error:function(){
				alert('Try later');
			}
		});
	}
	return false;
}

function edit_web_url(edit, save, link){
	$('[id^="'+edit+'"]').show();
	$('#'+save).hide();
	$('#'+link).hide();
}

function edit_specialties(edit, save, link){
	$('[id^="'+edit+'"]').show();
	$('#'+save).hide();
	$('#'+link).hide();
}

$('#my_profile_pic').hover(function(){
		$('#add_profile_pic').show();
	},function(){
		$('#add_profile_pic').hide();
	}
);
$('#add_profile_pic').hover(function(){
	$('#add_profile_pic').show();
});

function edit_gallery(del_class, edit_image){
	edit_mode = true;
	if(del_class != ''){
		$('[id^="'+del_class+'"]').hide();
		$('.delete_sample').show();
	}
	if(edit_image != ''){
		$('[id^="'+edit_image+'"]').addClass('edit_my_sample');
		$('[id^="'+edit_image+'"]').show();
	}
}

$('.edit_my_sample').click(function(){
	//alert('edit me');
});
$('#and_login').click(function(){
	$("#loginBox").fadeIn(50);
});

function readURL(input) {
    var $prev = $('#blah');

    if (input.files && input.files[0]) {
        var reader = new FileReader();

            reader.onload = function (e) {
                $prev.attr('src', e.target.result);
            }

        reader.readAsDataURL(input.files[0]);

        $prev.show();
    } else {
        $prev.hide();
    }
}

$("#arch_file").change(function(){
	$('#img_blah').show();
    readURL(this);
});
