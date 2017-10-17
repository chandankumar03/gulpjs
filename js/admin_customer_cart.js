$(document).ready(function(){
    $(document).on('click', '#add_items', function(){
        $(this).hide();
        $('#add_sku_area').show();
    });
    
    $(document).on('click', '#btn-save-sku', function(e){
        
        var process = $('input[type="radio"][name="add_sku"]:checked').val();
        var email = $('#email').val();
        var sku_arr = $('#sku_to_be_added').val().split('\n');    //As we're excepting skus separated by new line(ENTER) in textarea, hence here we're splitting text area value based on '\n' and creating array of products sku
        var look_id = $('#look_id').val();
        
        if(sku_arr == ''){
            alert('Please Enter SKU');
            return false;
        }
       /*No Special Chars allowed for Look id. Only a-zA-Z0-9 and - and space is allowed*/
        if(/^[a-zA-Z0-9- ]*$/.test(look_id) == false) {
            alert('Your search string contains illegal characters.');
            return false;
        }

        $.ajax({
            url:root_url + '/customer/admin_add_sku',
            type:'POST',
            async:false,
            data:{
                email : email,
                skus : sku_arr,
                process : process,
                look_id : look_id
            },
            beforeSend : function(x){
                  //  $('#cart_loader').show();
            },
            success: function (data){
                val  = $.parseJSON(data);
                if(val !== null){
                    var temp = '';
                    for (var msg in val.message) {                        
                        temp += val.message[msg]+'\n';                        
                    }
                    alert(temp);                    
                    return false;
               }else{
                   alert ('SKU added sucessfully');
               }
                //console.log(data);
            },
            error : function(r){
//                    $('#cart_loader').hide();
                    console.log(r);
                    return false;
            }
        });
    });
    
    
    $(document).on('click', '#btn-cancel-sku', function(){
        $('#add_items').show();
        $('#add_sku_area').hide();
    });
    
    
    $(document).on( 'click', '.decr-amt, .incr-amt', function( e ) {
        switch( $( this ).attr( 'class' ).toLowerCase() ) {
            case 'decr-amt':
//                        $('.cart-loader').show();	//show cart loader
                var _el = $( this ).parent().find( '.qty-input' );

                var _id = _el.attr( 'id' ).split( '_' );
                var _val = parseInt( $.trim( _el.val() ) );
                var maxAvailableQty = _el.attr( 'data-avl-qty' );

                // If a product availability is greater than what a user is allowed to in the cart, limit it
                maxAvailableQty = ( maxAvailableQty > sku_max_cart ) ? sku_max_cart : maxAvailableQty;

                $( '#cart_product_' + _id[ 2 ] ).hide();

                // check if the provided input is valid and less than max available quantity
                if( !(isNaN( _val )) ) {
                    _val -= 1;

                    if( ( _val <= maxAvailableQty ) && ( _val > 0 ) ) {
                        _el.val( _val );
  //                      o.updateCartQty();
						_el.attr( 'data-val', _val );
                    } else {
                        // show the default value selected
                        _el.val( _el.attr( 'data-val' ) );

                        if( _val > maxAvailableQty ) {
                            var _text = ' quantity.';
                            if( maxAvailableQty > 1 ) {
                                    _text = ' quantities.';
                            }

                            $( '#cart_product_' + _id[ 2 ] ).html( 'You can not choose more than ' + maxAvailableQty + _text ).show();
                        } else {
                            $( '#cart_product_' + _id[ 2 ] ).html( 'Please choose at least 1 quantity.' ).show();
                        }
//                                       $('.cart-loader').hide();
                    }
                } else {
                    // show the default value selected
                    _el.val( _el.attr( 'data-val' ) );

                    $( '#cart_product_' + _id[ 2 ] ).html( 'Please choose a valid quantity' ).show();
//                                $('.cart-loader').hide();
                }
                break;
            case 'incr-amt':
//                        $('.cart-loader').show();	//show cart loader
                var _el = $( this ).parent().find( '.qty-input' );

                var _id = _el.attr( 'id' ).split( '_' );
                var _val = parseInt( $.trim( _el.val() ) );
                var maxAvailableQty = _el.data( 'avl-qty' );

                // If a product availability is greater than what a user is allowed to in the cart, limit it
                maxAvailableQty = ( maxAvailableQty > sku_max_cart ) ? sku_max_cart : maxAvailableQty;
                maxAvailableQty = parseInt(maxAvailableQty);

                $( '#cart_product_' + _id[ 2 ] ).hide();

                // check if the provided input is valid and less than max available quantity
                if( !(isNaN( _val )) ) {
                        _val += 1;

                        if( ( _val <= maxAvailableQty ) && ( _val > 0 ) ) {
                            _el.val( _val );
     //                       o.updateCartQty();
							_el.attr( 'data-val', _val );
                        } else {
                            // show the default value selected
                            _el.val( _el.attr( 'data-val' ) );

                            if( _val > maxAvailableQty ) {
                                var _text = ' quantity.';
                                if( maxAvailableQty > 1 ) {
                                        _text = ' quantities.';
                                }

                                $( '#cart_product_' + _id[ 2 ] ).html( 'You can not choose more than ' + maxAvailableQty + _text ).show();
                            } else {
                                $( '#cart_product_' + _id[ 2 ] ).html( 'Please choose at least 1 quantity.' ).show();
                            }
//                                        $('.cart-loader').hide();	//hide loader
                        }
                } else {
                    // show the default value selected
                    _el.val( _el.attr( 'data-val' ) );

                    $( '#cart_product_' + _id[ 2 ] ).html( 'Please choose a valid quantity' ).show();
//                                $('.cart-loader').hide();	//hide loader
                }
                break;
            default:
                break;
        }
    });
    
    
    $( document ).on( 'keypress', 'input.qty-input', function( e ) {
        if( e.which == $.ui.keyCode.ENTER ) {
            switch( $( this ).attr( 'class' ).toLowerCase() ) {
                case 'qty-input':
                    e.preventDefault();
                    var _id = $( this ).attr( 'id' ).split( '_' );
                    var _val = parseInt( $.trim( $( this ).val() ) );
                    var maxAvailableQty = $( this ).data( 'avl-qty' );
                    var currentQty = $( this ).attr( 'data-val' );

                    // If a product availability is greater than what a user is allowed to in the cart, limit it
                    maxAvailableQty = ( maxAvailableQty > sku_max_cart ) ? sku_max_cart : maxAvailableQty;
                    maxAvailableQty = parseInt(maxAvailableQty);

                    $( '#cart_product_' + _id[ 2 ] ).hide();

                    // check if the provided input is valid and less than max available quantity
                    if( !(isNaN( _val )) && ( _val <= maxAvailableQty ) && ( _val > 0 ) ) {
                        $('.cart-loader').show();
        //                o.updateCartQty();
						_el.attr( 'data-val', _val );
                    } else {
                        // show the default value selected
                        $( this ).val( currentQty );

                        if(isNaN( _val )) {
                                $( '#cart_product_' + _id[ 2 ] ).html( 'Please choose a valid quantity' ).show();
                        } else if( _val > maxAvailableQty ) {
                                var _text = ' quantity.';
                                if( maxAvailableQty > 1 ) {
                                        _text = ' quantities.';
                                }

                                $( '#cart_product_' + _id[ 2 ] ).html( 'You can not choose more than ' + maxAvailableQty + _text ).show();
                        } else if( _val <= 0 ) {
                                $( '#cart_product_' + _id[ 2 ] ).html( 'Please choose at least 1 quantity.' ).show();
                        }
                    }
                    break;
                default:
                    break;
            }
            e.stopPropagation();
        }
    });
    

});


function deleteProduct(product_id, customer_id, email) {
    if(confirm('Are you sure?')) {
        $.ajax({
            url:root_url + '/customer_cart/delete/'+product_id+'/'+customer_id+'/'+email,
            data:{ },
            beforeSend : function(x){
              //      $('#cart_loader').show();
            },
            success: function (data){
                    window.location.href = root_url + '/customer/admin_get_customer_cart/'+data;
            },
            error : function(r){
//                    $('#cart_loader').hide();
                    console.log(r);
                    return false;
            }
        });
    }
    
}

function validateCart() {
	var _return = true;
	$( '.hastable input[id^="cart_qty_"]' ).each(function() {
		var _el = $( this );

		var _id = _el.attr( 'id' ).split( '_' );
		var _val = parseInt( $.trim( _el.val() ) );
		var maxAvailableQty = parseInt( _el.attr( 'data-avl-qty' ) );

		// If a product availability is greater than what a user is allowed to in the cart, limit it
		maxAvailableQty = ( maxAvailableQty > sku_max_cart ) ? sku_max_cart : maxAvailableQty;

		$( '#cart_product_' + _id[ 2 ] ).empty().hide();

		// check if the provided input is valid and less than max available quantity
		if( !isNaN( _val ) ) {
			//_val -= 1;

			if( ( _val <= maxAvailableQty ) && ( _val > 0 ) ) {
				//_el.val( _val );
				_el.attr( 'data-val', _val );
			} else {
				// show the default value selected
				_el.val( _el.attr( 'data-val' ) );
				_return = false;

				if( _val > maxAvailableQty ) {
					var _text = ' quantity.';
					if( maxAvailableQty > 1 ) {
							_text = ' quantities.';
					}

					$( '#cart_product_' + _id[ 2 ] ).html( 'You can not choose more than ' + maxAvailableQty + _text ).show();
				} else {
					$( '#cart_product_' + _id[ 2 ] ).html( 'Please choose at least 1 quantity.' ).show();
				}
			}
		} else {
			_return = false;
			// show the default value selected
			_el.val( _el.attr( 'data-val' ) );
			$( '#cart_product_' + _id[ 2 ] ).html( 'Please choose a valid quantity' ).show();
		}
	});

	return _return;
}