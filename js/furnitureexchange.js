// store default validation messages for dimensions
var dimensionsDefualts = {
    maxDimension : 120,
    minDimension : 1
};
var requestInProgress = false; // if an ajax request is in progress

//Resetting Value of Form
function productReset(){
	var pincode = $('#exchange_form').find($('*[name="pincode"]')).val();

	$(".inputquotationForm select").prop('selectedIndex', 0);
	$(".inputquotationForm select").each(function(){
		var _id = $(this).attr('id');
		$('#s2id_'+_id).select2('val', 0);
	});

	$(".inputquotationForm input[type='text'], .dimensionInput input[type='text']").val("");
	$(".radioWrap input[type='radio']").prop('checked', false);
	$('.bgFont').attr('id', 'getQuote');
	$('.bgFont').attr('data-id', 'msg');
	//$("#getQuote").removeClass("bgFont1");
	$(".pinError").slideUp().html('');

	$('#exchange_form #fePhotoWrap').remove();  //setting pincode again
	$('#exchange_form #fileUpload').val('');  //setting pincode again
	$('#exchange_form').find('*[name="images_json"]').val('');  //setting pincode again
	$('#exchange_form').find('*[name="pincode"]').val(pincode);  //setting pincode again
	$('.picUploaderDiv .fePhotoWrap').remove();
        
        $('.input-field').each(function () {
            if ($(this).val() !== '')
            {
                $(this).parent('.input-effect').addClass('input-filled');
            }
            else
            {
                $(this).parent('.input-effect').removeClass('input-filled');
            }
        });
}

//Numeric Validation Check
function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

/*
    To check pincode is available or not
*/
function exchangeAvailabilityAction(pincode,is_exchange_available){
	if (is_exchange_available == "1"){
                $(".pinError").slideUp().html('');
		$("#PincodeValue").html(pincode);
		$("#pincodeCheckWrap").slideToggle("slow", function(){
			$(".quotationFormWrap").css("display","block");
			$("#pincodeConfirmationWrap").slideToggle("slow");
                        $(".fe_get_quote").slideToggle("slow");
			$("#formFirst").slideToggle("slow");
		});
		$('#exchange_form').find($('*[name="pincode"]')).val(pincode);
	} else {
                $('#pinCodeText').val('');
		$(".pinError").slideUp().html('');
                $('#pincodeCheckWrap').hide();
		$("#fe_not_serviceable").html(pincode);
                $('#feNotAvailableForPin').fadeIn();   
	}
}

function changeFormPin() {
    $('#feNotAvailableForPin').hide();
    $('#pincodeCheckWrap').fadeIn();
}

// pushpesh.s
// show pincode input form, when user decides to change their pincode
function showPinField() {
	$('.pinError').slideUp().html('');
	$(".quotationFormWrap").hide();
	$("#pincodeConfirmationWrap").hide();
        $(".fe_get_quote").hide();
	$("#formFirst").hide().promise().done(function(){
		$("#pincodeCheckWrap").slideToggle("slow");
	});
}

/*
    form validation
*/
function ValidationCheck(){
    var name_arr=[];
	$('.form-ele').each(function(k,v){
		var required = $(this).data('required');
		if(required == 1) {
			name_arr.push($(this).attr('name'));
		}
	});

    uniq_name_arr = name_arr.filter(function(itm,i,a){
        return i==a.indexOf(itm);
    });

    //show validation advice for input elements
    $(uniq_name_arr).each(function(key,val){
        var eltype = $('[name='+val+']').prop('type').toLowerCase();
        //console.log(eltype);
        var validation_advice =  $('*[name='+val+']').parents('.inputquotationForm').find('.error-text');
        if(eltype == 'radio'){
            if(!($('*[name='+val+']').is(':checked'))){
                validation_advice.show();        
            }else{
                validation_advice.hide();
            }
        }else{
            ele_val = $('*[name='+val+']').val();
            //console.log(ele_val);
            if(ele_val == '' || ele_val == undefined || ele_val == 0){
                validation_advice.parents('.inputquotationForm').addClass('input_error');
                validation_advice.show();
            }else{
                validation_advice.parents('.inputquotationForm').removeClass('input_error');
                validation_advice.hide();
            }

            var numericFields = [ 'length','breadth','height' ];
            if( $.inArray( val, numericFields ) != -1 ) {
                if( !isNumber( ele_val ) ) {
                    $('*[name='+val+']').val('');

                    // show the default error message
                    if( typeof dimensionsDefualts[ validation_advice.attr( 'id' ) ] !== 'undefined' ) {
                        validation_advice.text( dimensionsDefualts[ validation_advice.attr( 'id' ) ] );
                    }

                    validation_advice.show();
                } else {
                    if( ele_val > dimensionsDefualts.maxDimension ) {
                        // save the default validation message for this node
                        if( typeof dimensionsDefualts[ validation_advice.attr( 'id' ) ] == 'undefined' ) {
                            dimensionsDefualts[ validation_advice.attr( 'id' ) ] = validation_advice.text();
                        }

                        validation_advice.text( 'Max. ' + dimensionsDefualts.maxDimension + ' inches.' );
                        validation_advice.show();
                    } else if( ele_val < dimensionsDefualts.minDimension ) {
                        // save the default validation message for this node
                        if( typeof dimensionsDefualts[ validation_advice.attr( 'id' ) ] == 'undefined' ) {
                            dimensionsDefualts[ validation_advice.attr( 'id' ) ] = validation_advice.text();
                        }

                        validation_advice.text( 'Min. ' + dimensionsDefualts.minDimension + ' inches.' );
                        validation_advice.show();
                    }
                }
            }
        }
    });

    //validation for image
    check_images = $('input[name="images_json"]').val();
    validation_advice = $('input[name="images_json"]').parents('.inputquotationForm').find('.error-text');
    if(!check_images){
        validation_advice.show();
    }else{
        validation_advice.hide();
    }

    var counter = 0;
    $('.exchange_form .error-text').each(function(){if($(this).is(":visible")) counter++;});
    return counter;
}

/*
  Adding multiple exchange furnitures  
*/
function addExchangeFurniture(is_valid){
	//Checking Fields are null or not
	if(is_valid == 0){
		var form_data = $('#exchange_form').serializeArray();
		form_data = JSON.stringify(form_data);
		
		// var productNo = $('#hidden_form .form_data').length > 0 ? Number($('#hidden_form .form_data:last').attr('data-no')) + 1 : 1;
		var productNo = $.trim( $( '#feQuotFormNo' ).html() );
		var productId = "exchange_"+productNo;
		
		$('#hidden_form').append("<input type='hidden' class='form_data' name='"+productNo+"' id='exchange_"+productNo+"' value='"+form_data+"' data-no='"+productNo+"'>"); //adding form data in hidden form

		$("#getQuotemsgDiv").hide();
                $("#formFirst").find('.error-text').hide();
		$("#formFirst").slideToggle("slow");
		$(".quotationFormWrap").css("display","block");
		var productName = $("#exchange_form *[name='name']").val();
		
		//Reset-ing Form Again
		productReset();
                var formNo = $('.ExchangeProduct').length;
                    formNo = formNo + 1;
				var newNum = formNo;
				var positionToPlace = 'end';
				if( parseInt( productNo ) < formNo ) {
					newNum = parseInt( productNo );
					positionToPlace = formNo;
				}
		//Assigning Value to the Html
		if( positionToPlace != 'end' ) {
			$('<div class="furniture-exchange-added-furniture-strip ExchangeProduct" id="exchange_'+productNo+'"><span class="formNo">'+ newNum +'</span>. <strong>'+ productName +'</strong> details added. <a href="javascript://" class="exchangeProductdel cross signBg signChange" data-id="exchange_'+productNo+'" onclick="exchangeProductdel(\''+productId+'\')" title="Delete">Delete</a> <a href="javascript://" class="editForm" data-id="exchange_'+productNo+'">Edit</a></div>').insertBefore( "#productEvaluatedDetails #exchange_" + formNo );
		} else {
			$("#productEvaluatedDetails").append('<div class="furniture-exchange-added-furniture-strip ExchangeProduct" id="exchange_'+productNo+'"><span class="formNo">'+ newNum +'</span>. <strong>'+ productName +'</strong> details added. <a href="javascript://" class="exchangeProductdel cross signBg signChange" data-id="exchange_'+productNo+'" onclick="exchangeProductdel(\''+productId+'\')" title="Delete">Delete</a> <a href="javascript://" class="editForm" data-id="exchange_'+productNo+'">Edit</a></div>');
		}
		//Opening Html Div
		$("#productEvaluatedDetails").css('display','block');
                formNo = formNo + 1;
                $('#feQuotFormNo').html(formNo);
                
		//Slide Toggleing Open
		$("#formFirst").slideToggle("slow");
		//checking Html Count
		var numItems = $('.ExchangeProduct').length;
		if(numItems == 0){
			$("#cancel").css("display","none");
		} else{
			$("#cancel").css("display","block");
		}
	}
}

/*
    Deleting a single form from multiple forms
    Deletes data from hidden form also
*/
function exchangeProductdel(divId){
    $(".additionalTextBox #"+divId).remove();
    $("#hidden_form #"+divId).remove();
    feFormNoInit();
    var formNo = $('.ExchangeProduct').length;

	formNo = formNo + 1;
	$( '#feQuotFormNo' ).html( formNo );

	// no sku's added, show the form if it's hidden
	if( formNo == 1 ) {
		$( '#cancel' ).hide();
		$( '#formFirst' ).show();
	}
}

function feFormNoInit() {
    $('.formNo').each(function(i, e){
        $(e).text(i+1);
    });
}

$(function(){
    var isChecked;  

    //html count of product list
    var numItems = $('.ExchangeProduct').length;

    //Cancel Display None On first Time
    $("#cancel").css("display","none");
    $(".editForm").css('display','none'); 
    
    //check pincode exchange serviceability 
    $("#getPinCode").on('click',function(e){
        //$(this).attr('disabled','disabled');
        var txtNum, output,pinlength;
        txtNum = $("#pinCodeText").val();
        output = isNumber(txtNum);
        pinlength=txtNum.length;
        if(output){
            if(pinlength==6){
                //ajax call for check exchange availablity
                var pinCodeVal = $("#pinCodeText").val();
                $.ajax({url: root_url+"/furniture/getPinData",type: 'POST',data: {'pincode':pinCodeVal},dataType:'json',success: function(response){
                        result = $.parseJSON(response);
						var is_exchange_avail;
						try {
							is_exchange_avail = result.is_exchange_available;
						} catch ( ex ) {
							is_exchange_avail = 0;
						}
                        exchangeAvailabilityAction(pinCodeVal,is_exchange_avail);
                        $('#getPinCode').removeAttr('disabled');
                    }
                });
            } else{
                $(".exchangeLocationPinWrap").addClass("redBefore");
                $(".pinError").html("Pincode must be 6-digit").slideDown();
            }
        } else{
            $(".exchangeLocationPinWrap").addClass("redBefore");
            $(".pinError").html("Valid pincode needed to check Furniture Upgrade availability").slideDown();
        }
    });
    
    //Check Validation and adding product
    $("#addMore").on('click', function(){
        if ($("#formTitle").html() != "")
        {
            var productTitle = $("#formTitle").html();
            $("#formTitle").html("");
            $("#"+productTitle).css("display","block");
        }
        $("#formTitle").html("");
		var isError = 0;

        if($(".quotationFormWrap").css('display')=='none'){
            $(".quotationFormWrap").slideToggle();
            productReset();

			$( 'div.gb-select' ).each(function () {
				$(this).select2('val',0);
			});

			images_array = [];
        } else{
            $("#getQuotemsgDiv").hide();
            var is_valid = ValidationCheck();
            if(is_valid == 0){ // no errors in form
                // removing Uploaded Photo
                $(".fePhotoWrap").remove();
                $( '.plusWrap' ).show();
                $("#fileUpload").css('display','block');
                //$("#fileUpload").attr('data-id', 1); //setting id = 1    
				addExchangeFurniture(is_valid);
                hide_constraints();

				$( 'div.gb-select' ).each(function () {
					$(this).select2('val',0);
				});

				images_array = [];
            } else {
				isError = 1;
				// push focus on the first error
				$('html, body').animate({
					scrollTop: ( $('.error-text:visible').eq(0).offset().top - 200 )
				}, 500);
			}
        }

		// push focus on the first element in the form, if there is no error in the form
		if( ! isError ) {
			$('html, body').animate({
				scrollTop: ( $( '#exchange_form' ).offset().top - 200 )
			}, 500);
		}
    });
    
    //Cancel Click
    var cancelClick;
    $("#cancel").on('click', function(){
		$( '#exchange_form' )[ 0 ].reset();
                // hide all validation errors for the current form
                $('#exchange_form .error-text:visible').hide();
                $('#exchange_form .inputquotationForm').removeClass('input_error');
                $('#getQuotemsgDiv').hide();
                $('.cancelExchange a').hide();

		// if user has already some items added for upload, show the last entered sku's data
		if( $('.editForm').length ) {
			$('.editForm:last').click();
		} else {
			location.href = location.href;
		}

		return false; 
    });
    
    //Get Quote Click
    $("#getQuote").on('click', function(e){
        $(this).attr('disabled',true).val('Please wait .....');      
        var is_valid = ValidationCheck();                    
        if(is_valid != 0){
            $("#getQuotemsgDiv").text("We need the details marked in red to give you a quote").show();
            $(this).attr('disabled',false).val('SUBMIT DETAILS & GET QUOTE');

			// push focus on the first error element in the form
            $('html, body').animate({
				scrollTop: ( $('.error-text:visible').eq(0).offset().top - 200 )
            }, 500);
        }else{
			if( $( '[data-modalname="' + $( '.confirm-details' ).attr( 'data-modal' ) + '"]' ).length > 0 ) {
				$( '.confirm-details' ).click();
			} else {
				submitForm();
			}
        }
    });
    
    var accepted = false;
    //CheckBox Validation
    $("#accept").click(function(){		
        $(this).attr('disabled',true).val('Please wait .....'); //disable the button
        var a = $("input[type='checkbox'].feCheckBox");
        if (a.length == a.filter(":checked").length){
            $(".agreeBox").hide(); 
            var post_data = $('#hidden_form').serializeArray();
            post_json = JSON.stringify(post_data);
            
            var total_form = $('#hidden_form .form_data').length;
            $.post(root_url+"/furniture/setexchangepin",{json: post_json},function(result){
                if(result == 0){
                    alert('Error processing your request. Please try again later');
                    location.href = location.href;
                    return false;
                }
                
                if (result == '3') {
                    // $('#loginPopupLink').trigger('click');
                    $('[data-modalname="FUPopupLink"]').show();
                    $('#popup_overlay').fadeIn();
                    $('body').addClass( 'active' );
                    $('#accept').attr('disabled',false).val('Accept Quote');//enable the button
                    return false;
		} else {
                    response = $.parseJSON(result);
                    $.each(response,function(key,val){
                        if (val == 0) { 
                            alert('There has been error processing your request. Please try again later');
                            location.href = location.href;
                        }
                    });
                    $(this).attr('disabled',false).val('Accept The Quote');
                    window.location = root_url+"/customer/furnitureExchange";   //redirect to customer page
                }
                window.location = root_url+"/customer/furnitureExchange";
            });           
        } else{
            $(".agreeBox").show();
            $(this).attr('disabled',false).val('Accept Quote');     //enable the button
        } 
    });
    
    
    //Decline Click Event
    $("#Decline").on('click',function() {
        location.href = location.href;
    });

    //Decline Click Event
    $("#editPinCode").on('click',function() {
        showPinField();
    });
    
    $(document).on('click', '.editForm',function(){
        var edit_id = $(this).attr('data-id');
        var form_json = $('#hidden_form #'+edit_id).val();
        productReset();
        form_data = $.parseJSON(form_json);
        $.each(form_data,function(k,v){
            if(v.name == "csrf_token") return true;
            if(v.name == "images_json"){
                $('input[name="images_json"]').val(v.value);
                images_array = [];
                images_array = $.parseJSON(v.value);
                var id = 1;
                // max 3 images per skuto be uploaded
                if( images_array.length == 3 ) {
                    $( '.plusWrap' ).hide();
                }else{
                    //$("#fileUpload").attr('data-id', images_array.length+1); //setting id = 1
                }
                $.each(images_array,function(key,value){
                    $(".picUploaderDiv").prepend("<div data-pos='" + key + "' data-file='" + value + "' class='furniture-exchange-uploaded fePhotoWrap fePhotoWrap"+key+"' style='background-position:center; background-repeat:no-repeat; background-size:100px auto;'><a href=\"javascript://\" class=\"fex-rm-img\" data-img=\"" + key + "\"></a></div>");
                    $(".fePhotoWrap"+key).css('background-image','url('+value+')');  
                    id++;
                });
            }else{
                if($('#exchange_form *[name="'+v.name+'"]').attr('type') == 'radio'){
                       $('#exchange_form *[name="'+v.name+'"][value="' + v.value + '"]').prop('checked', true);
                }else{
                    //$('#exchange_form *[name="'+v.name+'"]').val(v.value);

                    if( ( v.name == 'name' ) || ( v.name == 'materialtype' ) ) {
                        $('#exchange_form *[name="'+v.name+'"]').val(v.value).change();
                    }else{
                        $('#exchange_form *[name="'+v.name+'"]').val(v.value);
                    }

					if( $('#exchange_form *[name="'+v.name+'"]').get( 0 ).nodeName.toLowerCase() == 'select' ) {
						$( '#' + $('#exchange_form *[name="'+v.name+'"]').attr( 'id' ) ).trigger('change');
						$( '#s2id_' + $('#exchange_form *[name="'+v.name+'"]').attr( 'id' ) ).select2( 'val', v.value );
					}
                }
            }

        });
        
        if($('.ExchangeProduct').length > 0){
            $("#cancel").show();
        } else {
            $("#cancel").hide();
        }
        
        $('.input-field').each(function () {
            if ($(this).val() !== '')
            {
                $(this).parent('.input-effect').addClass('input-filled');
            }
            else
            {
                $(this).parent('.input-effect').removeClass('input-filled');
            }
        });
        
        $('#hidden_form #'+edit_id).remove();
        $('#productEvaluatedDetails #'+edit_id).remove();
        
        /*feFormNoInit();
        var formNo = $('.ExchangeProduct').length;
            formNo = formNo + 1;
        $('#feQuotFormNo').html(formNo);*/
		$('#feQuotFormNo').html(edit_id.split('_').pop());
        
        if($("#formFirst").css('display')=='block'){
            $("#formFirst").slideToggle("slow",function(){
                $("#formFirst").find('.error-text').hide();
                $("#formFirst").find('.furniture-exchange-errormsg').hide();
                $("#formFirst").slideToggle("slow");    
            });

        }else{
            $("#formFirst").slideToggle("slow",function(){
                $("#formFirst").find('.error-text').hide();
                $("#formFirst").find('.furniture-exchange-errormsg').hide();    
            });
        }
        return false;
    });
    
    //on enter validate pincode
    $("#pinCodeText").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            $("#getPinCode").click();
        }
    });

    //adding first image before dimension
    //$('#inputWrap_5').before('<div class="type_img_wrapper"><div class="labelquotationForm">Dimension of your furniture</div><img class="type_img" src="'+root_url+'/img/furniture_exchange/bed.jpg"/></div>');
    //ends   

    // calculate where to put the image dynamically
    var firstNode = $('div:contains("(L)ength")').last();
    var secondNode = $('div:contains("(B)readth")').last();
    var thirdNode = $('div:contains("(H)eight")').last();

    if( firstNode.length && secondNode.length && thirdNode.length ) {
        var firstNodeParent = $(firstNode[0]).parent();
        var secondNodeParent = $(secondNode[0]).parent();
        var thirdNodeParent = $(thirdNode[0]).parent();
        
        firstNodeParent.find('span.input-label-content').text('(L) ength');
        secondNodeParent.find('span.input-label-content').text('(B) readth');
        thirdNodeParent.find('span.input-label-content').text('(H) eight');
        
        firstNodeParent.find('div.furniture-exchange-form-label').html('');
        secondNodeParent.find('div.furniture-exchange-form-label').html('Dimensions of your furniture <br /> (In Inches, max 120 inches)');
        thirdNodeParent.find('div.furniture-exchange-form-label').html('');
        
        firstNodeParent.find('div.input.input-effect').addClass('measurecount-each');
        firstNodeParent.find('div.furniture-exchange-form-control').wrapInner('<div class="furniture-exchange-measurecount"></div>').prepend('<div class="furniture-exchange-measureref" style="width:160px;height:1px;"></div><div class="furniture-exchange-measureref" style="position: absolute;"><img class="type_img" src="/images/bed.png" style="float:left;max-width:150px;"></div>').find('div.measurecount-each').after('<div class="furniture-exchange-measureunit"><span>inches</span></div>');
        secondNodeParent.find('div.input.input-effect').addClass('measurecount-each');
        secondNodeParent.find('div.furniture-exchange-form-control').wrapInner('<div class="furniture-exchange-measurecount"></div>').prepend('<div class="furniture-exchange-measureref" style="width:160px;height:1px;"></div>').find('div.measurecount-each').after('<div class="furniture-exchange-measureunit"><span>inches</span></div>');
        thirdNodeParent.find('div.input.input-effect').addClass('measurecount-each');
        thirdNodeParent.find('div.furniture-exchange-form-control').wrapInner('<div class="furniture-exchange-measurecount"></div>').prepend('<div class="furniture-exchange-measureref" style="width:160px;height:1px;"></div>').find('div.measurecount-each').after('<div class="furniture-exchange-measureunit"><span>inches</span></div>');
        //var pos = Math.max( $(firstNode[0]).parent().index(), $(secondNode[0]).parent().index(), $(thirdNode[0]).parent().index() );
        //$( '#furniture-exchange-form .quotationInputLabelWrap:eq(' + pos + ')' ).before('<div class="type_img_wrapper"><div class="labelquotationForm">Dimensions of your furniture<div class="infoWrap">(In Inches, max 120 inches)</div></div><img class="type_img" src="'+root_url+'/img/furniture_exchange/bed.jpg"/></div>');
    }

    $( '.type_img_wrapper' ).prevAll().eq( 0 ).addClass( 'fe_dimensions' );
    $( '.type_img_wrapper' ).prevAll().eq( 1 ).addClass( 'fe_dimensions' );
    $( '.type_img_wrapper' ).prevAll().eq( 2 ).addClass( 'fe_dimensions' );
});
var images_array = [];

function submitForm() {
	$("#getQuotemsgDiv").hide();
	//ajax for sending form data

	var form_data = $('#exchange_form').serializeArray();
	form_data = JSON.stringify(form_data);
	
	// var productNo = $('#hidden_form .form_data').length > 0 ? Number($('#hidden_form .form_data').attr('data-no')) + 1 : 1;
	var productNo = $.trim( $( '#feQuotFormNo' ).html() );
	var prevProductID = [];
	var productsExist = $('#hidden_form [id*="exchange_"]').length;
	$( '#hidden_form [id*="exchange_"]' ).each( function(){
		var _id = parseInt( $( this ).attr( 'id' ).split( '_' ).pop() );

		if( ! isNaN( _id ) ) {
			prevProductID.push( _id );
		}
	});
	var _max = -1;
	if( prevProductID.length > 0 ) {
		_max = Math.min.apply( null, prevProductID );
	}

	if( ( productsExist > 0 ) && ( $( '#hidden_form #exchange_' + prevProductID ).length > 0 ) && ( _max > productNo ) ) {
		$( "<input type='hidden' class='form_data' name='"+productNo+"' id='exchange_"+productNo+"' value='"+form_data+"' data-no='"+productNo+"'>" ).insertBefore( $( '#hidden_form #exchange_' + prevProductID ) );
	} else {
		$('#hidden_form').append("<input type='hidden' class='form_data' name='"+productNo+"' id='exchange_"+productNo+"' value='"+form_data+"' data-no='"+productNo+"'>");
	}

	var productName = $("#exchange_form *[name='name']").val();

	var productId = "exchange_"+productNo;

	//var formNo = $('.ExchangeProduct').length;
	//formNo = formNo + 1;
	var formNo = parseInt( $.trim( $( '#feQuotFormNo' ).html() ) );
	var _firstEl = 1;

	if( $('.ExchangeProduct').length > 0 ) {
		_firstEl = parseInt( $.trim( $( '.ExchangeProduct:eq(0) span.formNo' ).html() ) );
	}

	//Assigning Value to the Html
	if( formNo < _firstEl ) {
		$('<div class="furniture-exchange-added-furniture-strip ExchangeProduct" id="exchange_'+productNo+'"><span class="formNo">'+ formNo +'</span>. <strong>'+ productName +'</strong> details added. <a href="javascript://" class="exchangeProductdel cross signBg signChange" data-id="exchange_'+productNo+'" onclick="exchangeProductdel(\''+productId+'\')" title="Delete">Delete</a> <a href="javascript://" class="editForm" data-id="exchange_'+productNo+'">Edit</a></div>').insertBefore( '.ExchangeProduct:eq(0)' );
	} else {
		$("#productEvaluatedDetails").append('<div class="furniture-exchange-added-furniture-strip ExchangeProduct" id="exchange_'+productNo+'"><span class="formNo">'+ formNo +'</span>. <strong>'+ productName +'</strong> details added. <a href="javascript://" class="exchangeProductdel cross signBg signChange" data-id="exchange_'+productNo+'" onclick="exchangeProductdel(\''+productId+'\')" title="Delete">Delete</a> <a href="javascript://" class="editForm" data-id="exchange_'+productNo+'">Edit</a></div>');
	}

	var post_data = $('#hidden_form').serializeArray();
	post_json = JSON.stringify(post_data); 

	$.post($('#exchange_form').attr('action'),{json: post_json},function(result){
		
		if(result == 0){
			alert('Error processing your request. Please try again later');
			location.href = location.href;
			return false;
		}
		var total_points = 0;
		var result = $.parseJSON(result);
		$.each(result, function(index,val){
			
			productName = val.name;
			total_points += Number(val.points);
			var _qtyPerSKU = parseInt( val.quantity );
			var skuPoints = parseInt( val.points );
			var additionalText = '';

			if( _qtyPerSKU > 1 ) {
				additionalText += ' @ ' + Math.ceil( skuPoints / _qtyPerSKU );
			}

			var _str = 	'';
			_str = 	'<div class="furniture-exchange-valuation-each clearfix">';
			_str +=		'<div class="furniture-exchange-valuation-qty">' + val.quantity + '</div>';
			_str +=		'<div class="furniture-exchange-valuation-name">' + val.name + ' ' + additionalText + '</div>';
			_str +=		'<div class="furniture-exchange-valuation-points">' + val.points + '</div>';
			_str +=		'<div class="furniture-exchange-valuation-decline">';
			_str +=			'<a href="javascript://" class="">Decline this Valuation</a>';
			_str +=			'<div class="furniture-exchange-valuation-tt" style="display: none;">';
			_str +=				'<div class="fex-val-tt-txt">';
			_str +=					'<p>Do you really want to decline this offered upgrade point? Once you decline the item will be deleted from your list.</p>';
			_str +=				'</div>';
			_str +=				'<div class="fex-val-tt-btns">';
			_str +=					'<input type="submit" class="fex-val-tt-yes-btns" id="" value="Yes, Delete it" name="" data-id="' + val.node_identifier + '" data-points="' + val.points + '">';
			_str +=					'<input type="submit" class="fex-val-tt-no-btns" id="" value="No, I Accept" name="">';
			_str +=				'</div>';
			_str +=			'</div>';
			_str +=		'</div>';
			_str +=	'</div>';
			
			//$( 'div.furniture-exchange-valuation-wrap' ).prepend( _str );
			$( _str ).insertBefore( 'div.furniture-exchange-valuation-pointstotal' );
		});

		$( '#total-fe-points' ).html( total_points );
		
		//Resetting Form Again
		productReset();
		//Assigning Value to the Html
		//$("#productEvaluatedDetails").empty();
		$("#productEvaluatedDetails").hide();

		//Opening Html Div
		$("#formFirst, #totalProductCost").slideToggle("slow");
		$(".fe_get_quote").hide();
		$('#pincodeConfirmationWrap').hide();
		$(".furniture-exchange-form-valuation-title").show();  
		$(".fe_exchangpoint").hide();   //exchange point lapse error
		$(this).attr('disabled',false).val('Get quote');
		$('#editPinCode').remove(); //remove edit pincode
		
		$('html, body').animate({
			scrollTop: ( $('.furniture-exchange-form-valuation-title').offset().top )
		}, 500);
	});
}

/*
    show form constaints depending on options selected
*/
function show_target_options(option_id_constraint,question_id){
    constraints = $('.constraints_data').text();
    constraints_obj = $.parseJSON(constraints);
    target_array = '';
    hide_ids = '';
    required_fields = '';
    not_required_fields = '';
    $.each(constraints_obj,function(key,value){

        if(value.option_id_constraint == option_id_constraint){
            target_array += "."+value.constraint_type+"_"+value.target_id+",";
            if(value.constraint_type == 'Q'){
                required_fields += "."+value.constraint_type+"_"+value.target_id+",";
            }
        }
        if(value.question_id_constraint == question_id){
            if(value.constraint_type == 'Q'){
                not_required_fields += "."+value.constraint_type+"_"+value.target_id+",";            
            }
            hide_ids += "."+value.constraint_type+"_"+value.target_id+",";
        }
    });

    hide_target = hide_ids.substring(0, hide_ids.length - 1);
    show_target = target_array.substring(0, target_array.length - 1);
    not_required_fields = not_required_fields.substring(0, not_required_fields.length - 1);
    required_fields = required_fields.substring(0, required_fields.length - 1);
    
    if(not_required_fields != ''){
        var not_required_fields_array = not_required_fields.split(",");
        $.each(not_required_fields_array,function(i){
            $(not_required_fields_array[i]+" input").attr('data-required',0);
        });
    }

    if(required_fields != ''){
        var required_fields_array = required_fields.split(",");
        $.each(required_fields_array,function(i){
            $(required_fields_array[i]+" input").attr('data-required',1);
        });
    }
    //adding not required classes

    $(hide_target).hide().attr('disabled',true);
    if(show_target != "") $(show_target).show().removeAttr('disabled');    


}

/*
    Hide all constraints on page load
*/
function hide_constraints(){
    constraints = $('.constraints_data').text();

	try {
		constraints_obj = $.parseJSON(constraints);
		target_array = '';
		$.each(constraints_obj,function(key,value){
			target_array += "."+value.constraint_type+"_"+value.target_id+",";
		});
		target_array = target_array.substring(0, target_array.length - 1);
		$(target_array).hide().attr('disabled',true);  
	} catch( ex ) {
		//PF.ERROR.raiseError( ex );
	}
}

function getValidId() {
	var maxImages = [ 0, 1, 2 ]; // 3 images allowed / sku

	$( '.fePhotoWrap' ).each(function() {
		maxImages.splice( parseInt( $( this ).attr( 'data-pos' ) ), 1 );
	});

	maxImages.sort();
	return maxImages[ 0 ];
}

function getUploadedImagesCount() {
	var b = [];

	$( '.fePhotoWrap' ).each(function(){
		var v = $( this ).attr( 'data-pos' );
		b.push( parseInt( v ) );
	});

	return b.length;
}

$(document).ready(function(){
	// set all dropdowns to 100% to prevent clipping of text
	$( 'div.gb-select' ).each(function () {
		this.style.setProperty( 'width', '100%', 'important' );
	});

    // hide the floating fex
    $('#fe_header_wrapper').hide();
    hide_constraints();

    $('#page').on('change', 'select', function() {
        var option_id_constraint = $(this).children(":selected").attr('data-constraintid');
        var question_id = $(this).children(":selected").attr('data-questionid');
        show_target_options(option_id_constraint,question_id);
    }); 

    $('#page').on('change', 'input[type=radio]', function() {
        var option_id_constraint = $(this).attr('data-constraintid');
        var question_id = $(this).attr('data-questionid');
        show_target_options(option_id_constraint,question_id);
    });

    //function for reading files
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            // var id = parseInt($("#fileUpload").attr("data-id"));
            var id = getUploadedImagesCount();
            var response = checkFileSizeAndType();
            var iid = 0;
            (response ? iid=id+1 : iid=id); //increment on valid file type
            // max 3 images per sku to be uploaded
            if(iid >= 3){
                $("#fileUpload").css('display','none');
                $( '.plusWrap' ).hide();
            }
			id = getValidId();
            //$("#fileUpload").attr('data-id', iid);
            reader.onload = function (e) {
                if(response){
                    //upload image ajax
                    $.post(root_url+"/furniture/addform",{image: e.target.result},function(file_name){
                        if(file_name === "invalid_file"){
                            alert("Please upload a valid image");
                            file_name = 0;
                            return false;
                        }else if(file_name === "size_error"){
                            alert("Image is too big! Please reduce the size of your photo using an image editor. Max 3 MB is allowed.");
                            file_name = 0;
                            return false;
                        }else if(file_name === '0'){
                            alert("Please upload a valid image");
                            file_name = 0;
                            $('.picUploaderDiv .fePhotoWrap'+id).remove();
                            return false;
                        }else{
                            $(".picUploaderDiv").prepend("<div class='furniture-exchange-uploaded fePhotoWrap fePhotoWrap"+id+"' style='background-position:center; background-repeat:no-repeat; background-size:100px auto;' data-pos='"+id+"'></div>");
                            var background_img = image_url+"img/grey.gif";
                            $(".fePhotoWrap"+id).css('background-image','url('+background_img+')'); //background loader
                            $('#addMore,#getQuote').addClass('disabled');   //disable submit
                            
                            
                            $(".fePhotoWrap"+id).css('background-image','url('+file_name+')');   
                            $(".fePhotoWrap"+id).append( '<a data-img="'+$(".fePhotoWrap"+id).attr('data-pos')+'" class="fex-rm-img" href="javascript://"></a>' ).attr('data-file',file_name);   
                            images_array[images_array.length] =  file_name;
                            images_json = JSON.stringify(images_array);
                            $("#images_json").val(images_json);
                            $('#addMore,#getQuote').removeClass('disabled');    //enable button
                        }
                    });
                }
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#fileUpload").change(function(){
        readURL(this);
    });

	try {
		//change images on changing product type starts
		var img_json = $.parseJSON( $( '.type_images' ).text() );

		// pre-load images
		var _images = {};
		$.each(img_json,function( k, v ) {
			try {
				_images[ k ] = new Image();
				_images[ k ].src = root_url + "/" + v;
			} catch( _err ) {
				delete _images[ k ];
			}
		});

		$('#field_1').on('change',function(){
			var product_type = $(this).val();
			if( ( product_type != '' ) || ( product_type != "undefined" ) ) {
				if( typeof _images[ product_type ] != 'undefined' ) {
					$( '.type_img' ).attr( 'src', _images[ product_type ].src );
				}
			}

			$('#s2id_field_49').select2('val',$('#field_49 option:eq(0)').val());
			$('#field_49').trigger('change');
		});
		//ends
	} catch( ex ) {
		// PF.ERROR.raiseError( ex );
	}

	$( '#page' ).on( 'click', '.fex-rm-img, a.opened, .fex-val-tt-yes-btns, .fex-val-tt-no-btns', function( e ) {
		switch( $( this ).attr( 'class' ).toLowerCase() ) {
			case 'fex-rm-img':
				e.stopPropagation();

				var _imagePos = parseInt( $( this ).attr( 'data-img' ) );

				if( ! isNaN( _imagePos ) ) {
					var _file = $( 'div[data-pos=' + _imagePos + ']' ).attr( 'data-file' );

					$( this ).parent().remove();

					var _images = $.parseJSON( $( '#images_json' ).val() );
					var pos = false;

					for( var i=0;i<_images.length;i++ ) {
						if( _images[ i ] == _file ) {
							pos = i;
							break;
						}
					}

					if( pos !== false ) {
						_images.splice( pos, 1 );
						$( '#images_json' ).val( JSON.stringify( _images ) );
					}

					var pos = false;

					for( var i=0;i<images_array.length;i++ ) {
						if( images_array[ i ] == _file ) {
							pos = i;
							break;
						}
					}

					if( pos !== false ) {
						images_array.splice( pos, 1 );
					}

					// if more than 3 images were uploaded, show the uploader again
					// as the user deleted an image
					if( _images.length < 3 ) {
						$( "#fileUpload" ).css( 'display', 'block' );
						$( '.plusWrap' ).show();
					}

					// clear the cached image uploaded previously, so that if the deleted image is
					// uploaded again right after deleting, the onchange event is triggered
					$( '#exchange_form #fileUpload' ).val( '' );
				}
			break;
			case 'fex-val-tt-yes-btns':
				e.preventDefault();

				var _elementID = parseInt( $( this ).attr( 'data-id' ) );
				var _points = parseInt( $( this ).attr( 'data-points' ) );

				if( !isNaN( _elementID ) && !isNaN( _points ) ) {
					$( '#hidden_form input[name="' + _elementID + '"]' ).remove();
					$( '#productEvaluatedDetails #exchange_' + _elementID ).remove();

					var totalPoints = parseInt( $.trim( $( '#total-fe-points' ).html() ) );
					$( '#total-fe-points' ).html( totalPoints - _points );
				} else {
					return;
				}

				$( this ).closest( '.furniture-exchange-valuation-each' ).slideUp(function () {
					$( this ).remove();

					if( $( '.furniture-exchange-valuation-each' ).length == 1 ) {
						$( '.furniture-exchange-valuation-pointstotal' ).hide();
					} else if( $( '.furniture-exchange-valuation-each' ).length == 0 ) {
						$( '#Decline' ).click();
					}
				});
			break;
			case 'fex-val-tt-no-btns':
				e.preventDefault();
				$( 'a.opened' ).removeClass( 'opened' );
				$( this ).closest( '.furniture-exchange-valuation-tt' ).hide();
			break;
			default:
			break;
		}
	});

	$(document).on("click", "a.upgrade-gotit, a.upgrade-losepoints, a.upgrade-keeppoints, a.see-details, div.confirm-details", function (e) {
		switch( $.trim( $( this ).attr( 'class' ).toLowerCase() ) ) {
			case 'upgrade-gotit':
				// $( '#popup_overlay' ).click(); // resets the form!
				$( '#popup_overlay' ).hide();
				$('body').removeClass('active');
				$( '[data-modalname="existingPointsDetail"]' ).hide();
			break;
			case 'upgrade-losepoints':
				if( requestInProgress ) {
					// prevent multiple form-submits
					return;
				}

				requestInProgress = true;

				// $( '#popup_overlay' ).click();
				$( '#popup_overlay' ).hide();
				$('body').removeClass('active');
				$( '[data-modalname="existingPointsDetail"]' ).hide();

				submitForm();
			break;
			case 'upgrade-keeppoints':
				// $( '#popup_overlay' ).click();
				$( '#popup_overlay' ).hide();
				$('body').removeClass('active');
				$( '[data-modalname="existingPointsDetail"]' ).hide();
				location.href = location.href;
			break;
			case 'see-details':
				$( '.upgrade-gotit' ).show();
				$( '.upgrade-keeppoints' ).hide();
				$( '.upgrade-losepoints' ).hide();
			break;
			case 'confirm-details':
				$( '.upgrade-gotit' ).hide();
				$( '.upgrade-keeppoints' ).show();
				$( '.upgrade-losepoints' ).show();
			break;
			default:
			break;
		}
	});

	$(document).on("click", ".furniture-exchange-valuation-decline a", function (e) {
		e.preventDefault();

		$( '.furniture-exchange-valuation-tt' ).hide();
		if( $( this ).hasClass( 'opened' ) ) {
			$( this ).removeClass( 'opened' );
			$( this ).siblings( '.furniture-exchange-valuation-tt' ).hide();
		} else {
			$( this ).addClass( 'opened' );
			$( this ).siblings( '.furniture-exchange-valuation-tt' ).show();
		}
	});
});

function checkFileSizeAndType(){
	//check whether browser fully supports all File API
   if (window.File && window.FileReader && window.FileList && window.Blob)
	{
		if( !$('#fileUpload').val()) //check empty input field
		{
			// $("#output").html("Please upload a valid image");
			alert("Please upload a valid image");
			return false
		}

		var fsize = $('#fileUpload')[0].files[0].size; //get file size
		var ftype = $('#fileUpload')[0].files[0].type; // get file type

		//allow only valid image file types
		
		switch(ftype)
		{
			case 'image/jpeg':
			case 'image/jpg':
			case 'image/gif':
			case 'image/png':
				break;
			default:
				// alert(ftype+": Unsupported file type!");
				alert("Please upload a valid image");
				return false;
		}
		
		//Allowed file size is less than 3 MB
		if(fsize > 3145728) {
			// $("#output").html("<b>"+fsize +"</b>Image is too big! <br />Please reduce the size of your photo using an image editor.");
			alert("Image is too big! Please reduce the size of your photo using an image editor. Max 3 MB is allowed.");
			return false
		}
		return true;
	}
}

// check pincode exchange serviceability - furniture-exchange.html
/* start */
$("#fe-lp-pin-submit").on('click',function(e){
    var txtNum, output,pinlength;
    txtNum = $("#exchangePin").val();
    output = isNumber(txtNum);
    pinlength=txtNum.length;
    if(output){
        if (pinlength === 6){
            // ajax call for check exchange availablity
            var pinCodeVal = $("#exchangePin").val();
            $.ajax({url: root_url+"/furniture/getPinData",type: 'POST',data: {'pincode':pinCodeVal},dataType:'json',success: function(response){
                    result = $.parseJSON(response);
					var is_exchange_avail;
					try {
						is_exchange_avail = result.is_exchange_available;
					} catch ( ex ) {
						is_exchange_avail = 0;
					}

                    if (is_exchange_avail == '1'){
                            window.location = root_url + "/furniture/quotationform";
                    } else {
                        $("div.furniture-exchange-changepin-error").hide();
                        $("span.furniture-exchange-pinerror").html('Sorry, We do not currently offer Furniture Upgrade program at <strong>'+ $('#exchangePin').val() +'</strong>');
                        $('#exchangePin').val('');
                        $("a.pincode-change").show();
                        $('div.furniture-exchange-pinenter').hide();
                        $("div.furniture-exchange-changepin-error").fadeIn();
                    }
                }
            });
        } else{
            $("div.furniture-exchange-changepin-error").hide();
            $("span.furniture-exchange-pinerror").html("Pincode must be 6-digit");
            $("a.pincode-change").show();
            $('div.furniture-exchange-pinenter').hide();
            $("div.furniture-exchange-changepin-error").fadeIn();
        }
    } else{
        $("div.furniture-exchange-changepin-error").hide();
        $("span.furniture-exchange-pinerror").html("Valid pincode needed to check Furniture Upgrade availability");
        $("a.pincode-change").show();
        $('div.furniture-exchange-pinenter').hide();
        $("div.furniture-exchange-changepin-error").fadeIn();
    }
});

$("#exchangePin").keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        $("#fe-lp-pin-submit").click();
    }
});

$('a.pincode-change').on('click',function(){
    $("div.furniture-exchange-changepin-error").hide();
    $('div.furniture-exchange-pinenter').fadeIn();
});

$('.go-back').click(function(){
	requestInProgress = false; // allow form submission again

    $("#productEvaluatedDetails, #totalProductCost").slideToggle("slow");
    $(".furniture-exchange-form-valuation-title").hide();
	$('#getQuote').attr('disabled',false).val('SUBMIT DETAILS & GET QUOTE');
	$( 'div.furniture-exchange-valuation-each' ).remove();
});
/* end */