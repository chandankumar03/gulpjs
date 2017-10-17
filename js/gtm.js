var cart_arr = [];
$(document).ready(function(){
	var gtm_cookie_data = readCookie('gtm_ecommerce_event');
	eraseCookie('gtm_ecommerce_event');
	if(typeof gtm_cookie_data !== 'undefined' && gtm_cookie_data !== null && gtm_cookie_data.length > 0 && gtm_cookie_data.indexOf('-') > -1)
	{
		var gtm_data = gtm_cookie_data.split('-');
		if(gtm_data[0] != 'undefined' && gtm_data[1] != 'undefined' && typeof actionFieldGtm != 'undefined' && typeof itemData != 'undefined')
		{
			switch(gtm_data[0])
			{
				case "product_click":
					dataLayer.push({
				    		'event': 'productClick',
				    		'ecommerce': {
				      			'click': {
                                    'actionField': {'list': actionFieldGtm},
				        			'products': [itemData]
				       			}
				     		}
					});
					break;
				default:
					break;
			}
		}
	}
});

// mini cart delete function //
function validateDelete(id){
	var check = confirm('Are you sure you would like to remove this item from the shopping cart?');
	if(check == true){
	   //var deleteid = $('.delete').attr('href').split('/')['5'];
	  var deleteid = id;
	  createCookie('mini_delete',deleteid);
	}else{
		return false;
	}
	
}

// cart delete function //
function validateCartDelete(id){
	if(confirm('Are you sure you would like to remove this item from the shopping cart?'))
	{
	// Measure the removal of a product from a shopping cart.
		dataLayer.push({
		  'event': 'removeFromCart',
		  'ecommerce': {
		    'remove': {
		      'products': [{
		          'id': id,
		      }]
		    }
		  }
		});
		return true;
	}
	else 
	{
		return false;
	}
}

function setGTMCookie(event,product_id)
{
	createCookie('gtm_ecommerce_event', event + "-" + product_id);
}
