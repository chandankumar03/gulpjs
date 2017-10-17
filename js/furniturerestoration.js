/**
 * Header script
 */

"use strict";

var PF = PF || {};

// load utilities library, if not already loaded
if ( typeof PF.UTILITIES === 'undefined' ) {
	(function() {
		window.root_url     = ( typeof root_url   === 'undefined' ) ? 'http://'  + window.location.hostname : root_url;
		window.secure_url   = ( typeof secure_url === 'undefined' ) ? 'https://' + window.location.hostname : secure_url;

		var _node   = document.createElement( 'script' );
		_node.type  = 'text/javascript';
		_node.src   = ( ( window.location.protocol === 'http:' ) ? root_url : secure_url ) + '/js/utilities.js';
		document.getElementsByTagName( 'head' )[ 0 ].appendChild( _node );
	})();
}

if( typeof PF.FURNITURERESTORATION === 'undefined' ) {
	(function (a, $) {
		var utils = a.UTILITIES;
                var FILE_STEP_SIZE = 1048576;
                var images_array = [];
                var images_json;
		// define customer_email as it is accessed in many places as a global variable
		window.customer_email   = ( typeof customer_email === 'undefined' ) ? '' : customer_email;[]

		var x = {
			
			init: function () {
                            
                            utils.addListener($('.onlynumbers'), 'keydown', x.numCheck, true);
                            x.fileUploadInitializer();
                            x.onClickEvents();
                            $("#fileUpload").change(function(){
                                x.readFileURL(this);
                            });

			},
			
                        fileUploadInitializer : function(){
                            if(!XMLHttpRequest.prototype.sendAsBinary){ 
                                XMLHttpRequest.prototype.sendAsBinary = function(datastr) {  
                                        function byteValue(x) {  
                                                return x.charCodeAt(0) & 0xff;  
                                        }  
                                        var ords = Array.prototype.map.call(datastr, byteValue);  
                                        var ui8a = new Uint8Array(ords);  
                                        try{
                                                this.send(ui8a);
                                        }catch(e){
                                                this.send(ui8a.buffer);
                                        }  
                                };  
                            }
                        },
			/**
			 *
			 * @param {type} event
			 * @returns {Boolean|undefined}
			 */
			numCheck: function (event) {
				var allowedEventCodes = [8,9,13,27,46];

				if( ( $.inArray( event.keyCode, allowedEventCodes ) !== -1 ) ||
				( event.keyCode == 65 && event.ctrlKey === true ) ||
				( event.keyCode >= 35 && event.keyCode <= 39 ) ) {
					// Allow: Ctrl+A, home, end, left, right
					// let it happen, don't do anything
					if (event.keyCode == 13) {
						//
					}
					return;
				} else {
					// Ensure that it is a number and stop the keypress
					if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
						event.preventDefault();
						return false;
					}
				}
			},
			resetForm: function(){
				if( $( 'form.popup-controls' ).length > 0 ) {
					$( 'form.popup-controls' ).each(function() {
						var id = $( this ).attr( 'id' );
						$( '#' + id )[ 0 ].reset();
						x.resetSelect2(id);
					});

					$( '.error-text' ).each(function() {
						$( '.error-text' ).hide();
						$( '.errormsg' ).hide();
					});
				}
			},
			resetSelect2 : function( id ) {
				$( '#' + id + ' select' ).each(function() {
					if($( this ).attr('id') !== 'country') {
                                            var _defaultValue = $( this ).find( ' option:eq(0)' ).val();  
                                        } else {
                                            var _defaultValue = 'IN';
                                            $(this).trigger('change');
                                        } 
					var selectID = $(this).attr('id');
                                        if ($.fn.select2) {
                                            $( '#s2id_' + selectID ).select2( 'val', _defaultValue );
                                        }
				});
			},
			/**
			 * Validation  for login popup , checkout login popup and mregSignin popup
			 * used in : loginPopup.phtml , checkoutLogin.phtml , mregSigninSignup.phtml
			 * @param {type} Form Id
			 * @returns {Boolean}
			 */
			addBlueButtonLoader : function( form_id ) {
				$( "#" + form_id + " .btn-blue" ).addClass( "btn-loader" );
			},
			removeBlueButtonLoader : function( form_id ) {
				$( "#" + form_id + " .btn-blue" ).removeClass( "btn-loader" );
			},
                        //function for reading files
                        readFileURL : function( input ){
                            if (input.files && input.files[0]) {
                                var reader = new FileReader();
                                //var id= parseInt($("#fileUpload").attr("data-id"));
                                var id = x.getUploadedImagesCount();
                                var response = x.checkFileSizeAndType();
                                // max 5 images per sku to be uploaded
                                var iid = 0;
                                (response ? iid=id+1 : iid=id); //increment on valid file type
                                // max 5 images to be uploaded
                                if(iid >= 5){
                                    $("#fileUpload").css('display','none');
                                    $( '.fur-res-img-upload' ).hide();
                                }
                                id = x.getValidId();
                                if( isNaN(id) ) {
                                    return false;
                                }

                                /**
                                 * CHUNKED UPLOAD START
                                 */
                                var i = 1;
                                var loaded = 0;
                                var total = $( '#fileUpload' )[ 0 ].files[ 0 ].size;
                                var totalRequest = 5;//Math.ceil( total / FILE_STEP_SIZE );
                                var start = 0;
                                var name;
                                var type = $( '#fileUpload' )[ 0 ].files[ 0 ].name.split( '.' ).pop().toLowerCase();
                                var randName = Math.random().toString(36).substr(2, 30);
                                name = $( '#fileUpload' )[ 0 ].files[ 0 ].name;
                                var parts = name.split(".");
                                var fileNameWA = parts[0];
                                name = encodeURIComponent( fileNameWA+randName+"."+type );
                                var upload_in_progress = 0;
                                var resFlag = 1;
                                if(response){
                                    reader.onload = function (e) {
                                        /**
                                         * CHUNKED UPLOAD START
                                         */
                                        var xhr = new XMLHttpRequest();
                                        var upload = xhr.upload;
                                        if( upload_in_progress == 1 ) {
                                            // the variable is checked against 1 because, there might be multiple
                                            // requests for a image to be uploaded and only one placeholder needs to be shown
                                            // this check ensures that regardless of the no. of requests taking place
                                            $(".picUploaderDiv").prepend("<div class='fur-res-img-uploaded fePhotoWrap fePhotoWrap"+id+"' style='background-position:center; background-repeat:no-repeat; background-size:100px auto;' data-pos='"+id+"'></div>");
                                            var background_img = image_url+"img/grey.gif";
                                            $(".fePhotoWrap"+id).css('background-image','url('+background_img+')'); //background loader
                                            $('#FurResFormSubmitButton').addClass('disabled').attr('disabled','disabled');   //disable submit
                                        }
                                        xhr.onreadystatechange = function() {
                                            // if( xhr.readyState == XMLHttpRequest.DONE ) {
                                            if( this.readyState == 4 && this.status == 200 ) {
                                                var file_name = xhr.responseText;
                                                if( totalRequest < i ) {
                                                    if(file_name === "image_size_exeeded" && resFlag === 1){
                                                        alert("Image is too big! Please reduce the size of your photo using an image editor. Max 5 MB is allowed.");
                                                        file_name = 0;
                                                        $('.picUploaderDiv .fePhotoWrap'+id).remove();
                                                        $( "#fileUpload" ).css( 'display', 'block' );
                                                        $( '.fur-res-img-upload' ).show();
                                                        xhr.abort();
                                                        resFlag = 0;
                                                        return false;
                                                    }
                                                }
                                                if(file_name === "invalid_file" && resFlag === 1){
                                                    alert("Please upload a valid image");
                                                    file_name = 0;
                                                    $('.picUploaderDiv .fePhotoWrap'+id).remove();
                                                    $( "#fileUpload" ).css( 'display', 'block' );
                                                    $( '.fur-res-img-upload' ).show();
                                                    xhr.abort();
                                                    resFlag = 0;
                                                    return false;
                                                }else if(file_name === '0' && resFlag === 1){
                                                    alert("Please upload a valid image");
                                                    file_name = 0;
                                                    $('.picUploaderDiv .fePhotoWrap'+id).remove();
                                                    $( "#fileUpload" ).css( 'display', 'block' );
                                                    $( '.fur-res-img-upload' ).show();
                                                    xhr.abort();
                                                    resFlag = 0;
                                                    return false;
                                                }else{

                                                    var _temp = file_name.split( '.' ).pop().toLowerCase();

                                                    if( _temp != type ) {
                                                            return;
                                                    }
                                                    if(loaded >= total){
                                                        $( ".fePhotoWrap"+id).css('background-image','url(' + file_name + ')' );   
                                                        $( ".fePhotoWrap" + id ).append( '<a data-img="' + $( ".fePhotoWrap" + id ).attr( 'data-pos' ) + '" class="fur-res-rm-img" href="javascript://"></a>' ).attr( 'data-file', file_name );
                                                        $('#fileUploadErr').html('');
                                                        images_array[ images_array.length ] =  file_name;
                                                        images_json = JSON.stringify( images_array );
                                                        $( "#images_json" ).val( images_json );
                                                        $( '#FurResFormSubmitButton' ).removeClass('disabled').removeAttr( 'disabled' );    //enable button                                                        
                                                    }
                                                }
                                            }
                                        };

                                        upload.addEventListener('load',function(e) {
                                            loaded += FILE_STEP_SIZE;

                                            if( loaded <= total ) {
                                                    blob = $( '#fileUpload' )[ 0 ].files[ 0 ].slice( loaded, loaded + FILE_STEP_SIZE );
                                                    reader.readAsDataURL( blob );
                                                    upload_in_progress++;
                                            } else {
                                                    loaded = total;
                                            }
                                        }, false );
                                        if(resFlag){
                                            xhr.open( "POST", root_url + "/miscscript_furniturerestoration/furResFileUpload?fileName=" + name + "&fileType=" + type + "&fileSize=" + total + "&nocache=" + ( new Date() ).getTime() + "&totalRequest=" + totalRequest + "&currentId="+ id + "&count=" + i++ );
                                            xhr.overrideMimeType( "application/octet-stream;charset=UTF-8" );
                                            xhr.send( e.target.result.split(",", 2)[1] );//remove text 
                                            upload_in_progress++;
                                        }
                                    };

                                    //reader.readAsDataURL(input.files[0]);
                                    var blob = $( '#fileUpload' )[ 0 ].files[ 0 ].slice( start, FILE_STEP_SIZE );
                                    reader.readAsDataURL( blob );
                                    upload_in_progress++;
                                }
                            }
                        },
                        getUploadedImagesCount : function() {
                            var b = [];

                            $( '.fePhotoWrap' ).each(function(){
                                    var v = $( this ).attr( 'data-pos' );
                                    b.push( parseInt( v ) );
                            });

                            return b.length;
                        },
                        getValidId : function() {
                            var maxImages = [ 0, 1, 2, 3, 4 ]; // 5 images allowed / sku

                            $( '.fePhotoWrap' ).each(function() {
                                var elemPosition = x.getElementPosition( maxImages, parseInt( $( this ).attr( 'data-pos' ) ) );
                                if( elemPosition != -1 ) {
                                    maxImages.splice( elemPosition, 1 );
                                }
                            });

                            maxImages.sort();
                            return maxImages[ 0 ];
                        },
                        getElementPosition : function( el, v ) {
                            var pos = -1;
                            for( var i=0;i<el.length;i++ ) {
                                if( el[ i ] == v ) {
                                    pos = i;
                                    break;
                                }
                            }
                            return pos;
                        },
                        checkFileSizeAndType : function(){
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
                                        case 'image/bmp':
                                        case 'image/png':
                                                break;
                                        default:
                                                // alert(ftype+": Unsupported file type!");
                                                alert("Please upload a valid image");
                                                return false;
                                }

                                //Allowed file size is less than 5 MB
                                if(fsize > 1048576*5) {
                                        // $("#output").html("<b>"+fsize +"</b>Image is too big! <br />Please reduce the size of your photo using an image editor.");
                                        alert("Image is too big! Please reduce the size of your photo using an image editor. Max 5 MB is allowed.");
                                        return false;
                                }
                                return true;
                            }
                        },
                        onClickEvents : function(){
                            $( '#page' ).on( 'click', '.fur-res-rm-img', function( e ) {
                                switch( $( this ).attr( 'class' ).toLowerCase() ) {
                                    case 'fur-res-rm-img':
                                        e.stopPropagation();

                                        var _imagePos = parseInt( $( this ).attr( 'data-img' ) );

                                        if( ! isNaN( _imagePos ) ) {
                                            var _file = $( 'div[data-pos=' + _imagePos + ']' ).attr( 'data-file' );

                                            $( this ).parent().remove();

                                            var _images = $.parseJSON( $( '#images_json' ).val() );
                                            

                                            var pos = false;

                                            for( var i=0;i<_images.length;i++ ) {
                                                    if( images_array[ i ] == _file ) {
                                                            pos = i;
                                                            break;
                                                    }
                                            }

                                            if( pos !== false ) {
                                                    images_array.splice( pos, 1 );
                                                    $( '#images_json' ).val( JSON.stringify( images_array ) );
                                            }

                                            // if more than 5 images were uploaded, show the uploader again
                                            // as the user deleted an image
                                            //alert(_images.length);
                                            if( images_array.length < 6 ) {
                                                    $( "#fileUpload" ).css( 'display', 'block' );
                                                    $( '.fur-res-img-upload' ).show();
                                            }

                                            // clear the cached image uploaded previously, so that if the deleted image is
                                            // uploaded again right after deleting, the onchange event is triggered
                                            $( '#furResForm #fileUpload' ).val( '' );
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            });
                        },
                        /**
			 * Customer registration from validation for normal registration popup and mreg signup popup
			 *
			 * @param {type} element_id, element_name
			 * @returns {Boolean}
			 */
			furResValidation: function (form_id) {

				//disable form submit button to avoid resubmission
				$('#' + form_id + ' #FurResFormSubmitButton').addClass('disabled').attr('disabled', 'disabled');
				$(".btn").attr('disabled', 'disabled');

				x.addBlueButtonLoader(form_id);
				$("#" + form_id + " .error-text").html('');

				var errors = 0;
                                var scroll = 0;
                                if ($.trim($("#" + form_id + " #firstName").val()) ==="First Name" || $.trim($("#" + form_id + " #firstName").val()) === "") {
                                        $("#" + form_id + " #firstNameErr").addClass('error-text').html('Required');
                                        $("#" + form_id + ' #firstName').closest('div.input-effect').addClass('input-error');
                                        $("#" + form_id + ' #firstName').focus();
                                        scroll = 1;
                                        errors = 1;
                                } else {
                                        var nameFilter = /^[a-zA-Z]*$/;
                                        var fname = $.trim($("#" + form_id + " #firstName").val());

                                        if( nameFilter.test( fname ) ) {
                                                $("#" + form_id + " #firstNameErr").removeClass('error-text').html('');
                                                $("#" + form_id + ' #firstName').closest('div.input-effect').removeClass('input-error');
                                        } else {
                                                $("#" + form_id + " #firstNameErr").addClass('error-text').html('Letters only');
                                                $("#" + form_id + ' #firstName').closest('div.input-effect').addClass('input-error');
                                                if(scroll === 0){
                                                    $("#" + form_id + ' #firstName').focus();
                                                    scroll = 1;
                                                }
                                                errors = 1;
                                        }
                                }

                                if ($.trim($("#" + form_id + " #lastName").val()) === "Last Name" || $.trim($("#" + form_id + " #lastName").val()) === ""){
                                        $("#" + form_id + " #lastNameErr").addClass('error-text').html('Required');
                                        $("#" + form_id + ' #lastName').closest('div.input-effect').addClass('input-error');
                                        if(scroll === 0){
                                            $("#" + form_id + ' #lastName').focus();
                                            scroll = 1;
                                        }
                                        errors = 1;
                                } else {
                                        var nameFilter = /^[a-zA-Z]*$/;
                                        var lname = $.trim($("#" + form_id + " #lastName").val());

                                        if( nameFilter.test( lname ) ) {
                                                $("#" + form_id + " lastNameErr").removeClass('error-text').html('');
                                                $("#" + form_id + ' #lastName').closest('div.input-effect').removeClass('input-error');
                                        } else {
                                                $("#" + form_id + " #lastNameErr").addClass('error-text').html('Letters only');
                                                $("#" + form_id + ' #lastName').closest('div.input-effect').addClass('input-error');
                                                if(scroll === 0){
                                                    $("#" + form_id + ' #lastName').focus();
                                                    scroll = 1;
                                                }
                                                errors = 1;
                                        }
                                }
                                
                                var mobile = $.trim($("#" + form_id + " #mobile").val());
                                if (mobile == "" || mobile.length < 10) {
                                        $("#" + form_id + " #mobileErr").addClass('error-text').html('Required');
                                        $("#" + form_id + ' #mobile').closest('div.input-effect').addClass('input-error');
                                        if(scroll === 0){
                                            $("#" + form_id + ' #mobile').focus();
                                            scroll = 1;
                                        }
                                        errors = 1;
                                } else if (mobile.length == 10 && mobile.charAt(0) == 0) {
                                        $("#" + form_id + " #mobileErr").addClass('error-text').html("Number can't start with 0");
                                        $("#" + form_id + ' #mobile').closest('div.input-effect').addClass('input-error');
                                        if(scroll === 0){
                                            $("#" + form_id + ' #mobile').focus();
                                            scroll = 1;
                                        }
                                        errors = 1;
                                } else {
                                        var numberFilter = /^[0-9]+$/;

                                        if (numberFilter.test(mobile) && mobile.length == 10) {
                                            $("#" + form_id + " #mobileErr").removeClass('error-text').html('');
                                            $("#" + form_id + ' #mobile').closest('div.input-effect').removeClass('input-error');
                                        } else {
                                            $("#" + form_id + " #mobileErr").addClass('error-text').html('Need a valid 10-digit number');
                                            $("#" + form_id + ' #mobile').closest('div.input-effect').addClass('input-error');
                                            if(scroll === 0){
                                                $("#" + form_id + ' #mobile').focus();
                                                scroll = 1;
                                            }
                                            errors = 1;
                                        }
                                }

                                if ($.trim($("#" + form_id + " #email").val()) ==="") {
                                        $("#" + form_id + " #emailErr").addClass('error-text').html('Required');
                                        $("#" + form_id + ' #email').closest('div.input-effect').addClass('input-error');
                                        if(scroll === 0){
                                            $("#" + form_id + ' #email').focus();
                                            scroll = 1;
                                        }
                                        errors = 1;
                                } else {
                                        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                                        var emailValue = $.trim($('#' + form_id + ' #email').val());

                                        if( filter.test( emailValue ) ) {
                                                $("#" + form_id + " #emailErr").removeClass('error-text').html('');
                                                $("#" + form_id + ' #email').closest('div.input-effect').removeClass('input-error');
                                        } else {
                                                $("#" + form_id + " #emailErr").addClass('error-text').html('Incorrect email ID');
                                                $("#" + form_id + ' #email').closest('div.input-effect').addClass('input-error');
                                                if(scroll === 0){
                                                    $("#" + form_id + ' #email').focus();
                                                    scroll = 1;
                                                }
                                                errors = 1;
                                        }
                                }
                                
                                if ($.trim($("#" + form_id + " #city").val()) ==="") {
                                    $("#" + form_id + " #cityErr").addClass('error-text').html('Select atleast one city');
                                    errors = 1;
                                } else {
                                        $("#" + form_id + " #cityErr").removeClass('error-text').html('');
                                }
                                
                                var fileSelected = x.getUploadedImagesCount();
                                if(fileSelected < 1){
                                    $('#fileUploadErr').html('Select atleast one file');
                                    errors=1;
                                }
                                if ($("#" + form_id + ' input:checkbox[name="restoration"]').is(':checked') == false) {
					$("#" + form_id + " #restoration").addClass('error-text').html('Please agree to the terms and conditions to proceed');
					errors = 1;
				} else {
					$("#" + form_id + " #restoration").removeClass('error-text').html('');
				}
				if (errors == 0) {
					x.submitFurRes(form_id);
				} else {
					$('#' + form_id + ' #FurResFormSubmitButton').removeClass('disabled').removeAttr("disabled");
					x.removeBlueButtonLoader(form_id);
					$(".btn").removeAttr("disabled");
					return false;
				}
			},
			/**
			 * Ajax function to save all the furniture restoration data
			 *
			 * @param {type} form_id
			 * @returns {Boolean}
			 */
			submitFurRes: function (form_id) {
				var path = root_url + '/miscscript_furniturerestoration/furnitureRestorationForm';
				var _data = $("#" + form_id).serialize();

				var _beforeSend = function () {
                                    $('#' + form_id + ' #FurResFormSubmitButton').addClass('disabled').attr('disabled', 'disabled');
                                    $("#" + form_id + " .btn").attr('disabled', 'disabled');
                                    x.addBlueButtonLoader(form_id);
			    };

                                var _setUpOptions = {
                                    'dataType' : "json"
                                };

				var _params = {
				  'form_id' : form_id
				};

				utils.makeRequest( path, 'POST', _data, x.submitFurResResponse, x.handleError, _beforeSend, _params, _setUpOptions);
			},
			submitFurResResponse : function( result, _params ) {
                            if(result == "success")
                            {	
                                $('.error-text').css('display','none');
                                $(".fur-res-wrapper").slideUp(300);
                                $(".fur_res-thankyou-wrap").slideDown(300);
                            }
                            else
                            {	
                                var json_obj;	 
                                try {	 
                                   json_obj = $.parseJSON(result);	 
                                } catch(e) {	 
                                  json_obj = result;	 
                                }
                                
                                if( typeof json_obj['error'] != 'undefined')
                                {
                                    $('#error').css('display','block');
                                    $('#error').html("<span>"+json_obj['error']+"</span>");
                                }
                                else
                                {
                                    $('.error-text').css('display','none');
                                    $.each(json_obj, function(index, value){ 
                                     
                                        $('#'+index+'Err').addClass('error-text').html(value);
                                        $('#' + _params.form_id + ' #FurResFormSubmitButton').removeClass('disabled').removeAttr("disabled");
					x.removeBlueButtonLoader(_params.form_id);
					$(".btn").removeAttr("disabled");
					return false;
                                     
                                   });
                                }
                            }
			},
                        handleError : function( _x, _y, _z ) {
                            // error callback
                            x.removeBlueButtonLoader('frm_feedback');
                        }
                };

		a.FURNITURERESTORATION = x;
	})( PF, $ );
        
        $( document ).ready(function() {
		PF.FURNITURERESTORATION.init();
	});
}