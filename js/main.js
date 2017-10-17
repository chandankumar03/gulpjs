 var pincode = $.trim($("#" + form_id + " #pincode").val());
                if (pincode == "" || pincode.length < 6 || pincode.length > 6) {
                    $("#" + form_id + " #pincodeError").css('display', 'block').parent().addClass('input_error');
                    $("#" + form_id + " #mobileError1").css('display', 'none').parent().removeClass('input_error');
                    errors = 1;
                    $( '#errormsgTop' ).show();
                } else if (pincode.length == 6 && pincode.charAt(0) == 0) {
                    $("#" + form_id + " #pincodeError").css('display', 'none').parent().removeClass('input_error');
                    $("#" + form_id + " #pincodeError1").css('display', 'block').parent().addClass('input_error');
                    errors = 1;
                    $( '#errormsgTop' ).show();
                } else {
                    var numberFilter = /^[0-9]+$/;

                    if (numberFilter.test(pincode)) {
                        $("#" + form_id + " #pincodeError").css('display', 'none').parent().removeClass('input_error');
                        $("#" + form_id + " #pincodeError1").css('display', 'none').parent().removeClass('input_error');
                    } else {
                        $("#" + form_id + " #pincodeError").css('display', 'block').parent().addClass('input_error');
                        errors = 1;
                        $( '#errormsgTop' ).show();
                    }
                } 