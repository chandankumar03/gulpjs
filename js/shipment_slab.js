function confirm_delete(slab_id){	
	if(slab_id > 0){
		if(confirm('Are u sure you want to delete this slab ?')){
			var ship_url = root_url+'/sales_shipment/delete_slab/'+slab_id;
			//alert(ship_url);
			window.location.href = ship_url;
		}
	}else{
		alert('Please select a slab');
	}
	return false;
}