/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){ 

/* cache settings for attribute set */
    $('.attrset_cache').click(function(){
        var url,title,func;
        title =this.title;
        var hostname=hosturl+"/cache_Attributesetindex/";        
        if(title == "set")
        {
            func="setAttributesetincache";
            var attr_set_id=$('#attr_set_id').val();
            if(attr_set_id.trim()=="")
                url=hostname+""+func+"/0";
            else
                url=hostname+""+func+"/"+attr_set_id;                    
        }
        $('#result').html("<img src='../../img/ajax-loader.gif' />");	        
        $.ajax({
            type: 'POST',
            url:url,            
            success:function(result)
            {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });


  /* cache settings for attribute set */
    $('.filterattr_cache').click(function(){
        var url,title,func;
        title =this.title;
        var hostname=hosturl+"/cache_Attributesetindex/";        
        if(title == "set")
        {
            func="setFilterableAttributes";            
            url=hostname+""+func;                    
        }
        $('#result').html("<img src='../../img/ajax-loader.gif' />");	        
        $.ajax({
            type: 'POST',
            url:url,            
            success:function(result)
            {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });

    /* cache settings for category hierarchy */
    $('.cattree_cache').click(function(){
        var url,title,func;
        title =this.title;
        var hostname=hosturl+"/cache_categorytree/";        
        if(title == "set")
        {
            func="setCategorytree";            
            url=hostname+""+func;              
        }
        $('#result').html("<img src='../../img/ajax-loader.gif' />");	        
        $.ajax({
            type: 'POST',
            url:url,            
            success:function(result)
            {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });

    
   /* set product bought cache */
    $('.product_bought_cache').click(function(){
        var url,title,func;
        title =this.title;
        var hostname=hosturl+"/cache_Productviewboughtindex/";        
        if(title == "set")
        {
            func="setProductBoughtidx";
            var product_id=$('#productbought').val();
            if(product_id.trim()=="")
                url=hostname+""+func+"/0";
            else
                url=hostname+""+func+"/"+product_id;                    
        }
        $('#result').html("<img src='../../img/ajax-loader.gif' />");	        
        $.ajax({
            type: 'POST',
            url:url,            
            success:function(result)
            {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });
	
	
	
	
	/* set Vendor Direct Shipping cache */
    $('.vendor_direct_shipping_cache').click(function(){
        var url,title,func;
        title =this.title;
        var hostname=hosturl+"/pincode/set_servicable_pincodes/true";        
        if(title == "set")
        {
           
            var supplier_id=$('#supplier_id').val();
			var prc_code=$('#prc_code').val();
                url=hostname+"/"+supplier_id+"/"+prc_code;                    
        }
        $('#result').html("<img src='../../img/ajax-loader.gif' />");	        
        $.ajax({
            type: 'POST',
            url:url,            
            success:function(result)
            {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });
	
	
    
    /* set core url rewrite cache */
    $('.coreurl_cache').click(function(){
        var url,title,func;
        title =this.title;
        var entity=$('#entity_coreurl').val(); //1: both 2:category 3: product
        if(entity == "")
        {
            alert("Please select entity.");
            return false;
        }
        else
        {    
            var id=$('#coreurl_idx').val();
            if(id == "")
             {
                id=0;                   
             }           
             
            var hostname=hosturl;
            switch(entity)
            {
                case '1':
                    hostname+="/site/set_l2_core_url/"+id;        
                    break;            
                case '2':
                    hostname+="/site/set_l2_core_url/"+id+"/9";        
                    break;
                case '3':
                    hostname+="/site/set_l2_core_url/"+id+"/10";        
                    break;
                case '4':
                	hostname+="/site/set_l2_core_url/"+id+"/11";
                    break;
                case '5':
                	hostname+="/site/set_l2_core_url/"+id+"/0";        
                    break;    
            }
            if(title == "set")
            {
                url=hostname;
            }
            
            $('#result').html("<img src='../../img/ajax-loader.gif' />");	        
            $.ajax({
                type: 'POST',
                url:url,            
                success:function(result)
                {
                    $('#result').html("<span class='successnew'>Action done successfully.</span>");
                    return false;
                }
            });
        }
        return false;
    });
    
    /* set pincode into cache */
    $('.pincode_cache').click(function(){
        var url,title,func;
        title =this.title;
        var hostname=hosturl+"/cache_Pincode/";        
        if(title == "set")
        {
            func="setCODPincode";      
            url=hostname+""+func;
        }
        $('#result').html("<img src='../../img/ajax-loader.gif' />");	        
        $.ajax({
            type: 'POST',
            url:url,            
            success:function(result)
            {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });
    
    /*set brands in cache */
    $('.brand_cache').click(function(){
        var url,title,func;
        title =this.title;
        var hostname=hosturl+"/cache_product/";        
        if(title == "set")
        {
            func="setBrandsCache"; // change function call from set_brands_memcache to setBrandsCache       
            url=hostname+""+func;
        }
        $('#result').html("<img src='../../img/ajax-loader.gif' />");           
        $.ajax({
            type: 'POST',
            url:url,            
            success:function(result)
            {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });

    
    /* set shipment slab into cache */
    $('.shipment_cache').click(function(){
        var url,title,func;
        title =this.title;
        var hostname=hosturl+"/cache_Shipmentslab/";        
        if(title == "set")
        {
            func="setSlab";       
            url=hostname+""+func;
        }
        $('#result').html("<img src='../../img/ajax-loader.gif' />");	        
        $.ajax({
            type: 'POST',
            url:url,            
            success:function(result)
            {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });
    
/* cache settings for coupon */
    $('.coupon_cache').click(function(){
        var url,title,func;
        title =this.title;
        if(title == "set")
        {
            func="uploadcouponincache";
        }
        else if(title == "remove")
        {
            func="removecoupon_from_cache";
        }    
        var hostname=hosturl+"/cache_coupon/";   
        var rule_id=$('#coupon').val();
        if(rule_id.trim()=="")
            url=hostname+""+func+"/";
        else
            url=hostname+""+func+"/"+rule_id;        
        $('#result').html("<img src='../../img/ajax-loader.gif' />");	        
        $.ajax({
            type: 'POST',
            url:url,            
            success:function(result)
            {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });
    
  /* Solr cache settings for order index  */  
  $('.orderidx_cache').click(function(){
        var url,title,func,entity_id;        
        title =this.title;
        var hostname=hosturl+"/cache_cachesettings/";  
        if(title == "single")
        {
            entity_id=$('#order_idx').val();
            if(entity_id.trim()=="")
            {
                alert("Please put order index id. ");
                $('#order_idx').focus();
                return false;
            }
        }
        else if(title == "bulk")
        {
            func="bulkindexing";
        }        
        url=hostname+"callcache";       
        var querystr="title="+title+"&id="+entity_id+"&type=orderindex";
        $('#result').html("<img src='../../img/ajax-loader.gif' />");	
        //alert(url);return false;
        $.ajax({
            type: 'POST',
            url:url,  
            data:querystr,
            success:function(result)
            {
                alert(result);
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });
    
    /* cache settings for product */
  	$('#a_set_product').click(function(){
  		if($.trim($('#product').val()) == "") {
  			alert('Please enter product ids.');
  			return false;
  		}
  		$('#result').html("<img src='../../img/ajax-loader.gif' />");
  		$.ajax({
            type: 'POST',
            url:'/product_grid/fillsolr/' + $.trim($('#product').val()),            
            success:function(result) {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
  		return false;
  	});
    /*set cache for delivery info*/
    $('#a_set_delivery').click(function(){
  		
  		$('#result').html("<img src='../../img/ajax-loader.gif' />");
  		$.ajax({
            type: 'POST',
            url:hosturl+"/cache_Productviewboughtindex/setAllDeliveryinfo",            
            success:function(result) {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
  		return false;
  	});
    
    $('#a_set_delivery').click(function(){
        
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        $.ajax({
            type: 'POST',
            url:hosturl+"/cache_Productviewboughtindex/setAllDeliveryinfo",            
            success:function(result) {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });

    $('#a_set_pg').click(function(){
        
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        $.ajax({
            type: 'POST',
            url:hosturl+"/checkout_paymentmethod/redisWritePg",            
            success:function(result) {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });

    $('#a_set_bank_pg').click(function(){
        
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        $.ajax({
            type: 'POST',
            url:hosturl+"/checkout_paymentmethod/redisWriteBankPg",            
            success:function(result) {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });

    $('.furniture_xchange').click(function(){
        
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        $.ajax({
            type: 'POST',
            url:hosturl+"/furniture/setStaticCache",            
            success:function(result) {
                if(result){
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                }
                return false;
            }
        });
        return false;
    });

    $('.pincode_autocomplete').click(function(){
        
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        $.ajax({
            type: 'POST',
            url:hosturl+"/config_pincode/setPincodeMemory",            
            success:function(result) {
                if(result){
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                }
                return false;
            }
        });
        return false;
    });

    $('#a_remove_bank_pg').click(function(){
        
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        $.ajax({
            type: 'POST',
            url:hosturl+"/checkout_paymentmethod/redisRemoveBankPg",            
            success:function(result) {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });

    $('#a_remove_pg').click(function(){
        
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        $.ajax({
            type: 'POST',
            url:hosturl+"/checkout_paymentmethod/redisRemovePg",            
            success:function(result) {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });

    $('#a_pg_change_cache').click(function(){
        
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        $.ajax({
            type: 'POST',
            url:hosturl+"/checkout_paymentmethod/changegateway/1",            
            success:function(result) {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });

    $('#a_pg_revert_cache').click(function(){
        
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        $.ajax({
            type: 'POST',
            url:hosturl+"/checkout_paymentmethod/changegateway/0",            
            success:function(result) {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });
    

    /*$('.product_cache').click(function(){
        var url,title,func;
        title =this.title;
        var hostname="http://"+document.location.hostname+"/cache_product/";  
        if(title == "single")
        {
            var entity_id=$('#product').val();
            if(entity_id.trim()=="")
            {
                alert("Please put order index id. ");
                $('#order_idx').focus();
                return false;
            }                
            else                
            {
                func="set_front_product_memcache/"+entity_id;
            }    
        }
        else if(title == "all")
        {
            func="set_product_memcache";
        }        
        url=hostname+""+func;        
        $('#result').html("<img src='../../img/ajax-loader.gif' />");	
        alert(url);
        $.ajax({
            type: 'POST',
            url:url,            
            success:function(result)
            {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });*/
    
    $('.category_cache').click(function(){
        var url,title,func;
        title =this.title;
        var hostname=hosturl+"/cache_category/";  
        if(title == "set")
        {
            var cat_id=$('#category').val();
            if(cat_id.trim()=="")
            {
                func="getcollection/0";             
            }                
            else                
            {
                func="getcollection/"+cat_id;                
            }    
        }       
        url=hostname+""+func;        
        $('#result').html("<img src='../../img/ajax-loader.gif' />");	        
        $.ajax({
            type: 'POST',
            url:url,            
            success:function(result)
            {
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }
        });
        return false;
    });
    
    $('#mobile_app_browse_menu_cache').click(function(){
        
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        $.ajax({
            type : 'POST',
            url  : hosturl + "/cache_Apicache/menu",            
            success : function(result) {
                if (result) {
                    $('#result').html("<span class='successnew'>Action done successfully.</span>");
                }
                return false;
            }
        });
        return false;
    });

    $('#wardrobe_data_cache').click(function(){
        
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        $.ajax({
            type : 'POST',
            url  : hosturl + "/cache_cachesettings/set_cache_wardrobe",            
            success : function(result) {
                if (result) {
                    $('#result').html("<span class='successnew'>Action done successfully.</span>");
                }
                return false;
            }
        });
        return false;
    });

    $('#cat_brand_mapping_reorder_cache').click(function(){
        
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        $.ajax({
            type : 'POST',
            url  : hosturl + "/cache_cachesettings/set_cache_cat_brand_mapping_reorder",            
            success : function(result) {
                if (result) {
                    $('#result').html("<span class='successnew'>Action done successfully.</span>");
                }
                return false;
            }
        });
        return false;
    });
        
     $('#rem_app_lookbook').click(function(){
        
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        $.ajax({
            type : 'POST',
            url  : hosturl + "/look/redisRemoveAppLookBook",            
            success : function(result) { 
                if (result) {
                    $('#result').html("<span class='successnew'>Action done successfully.</span>");
                }
                return false;
            }
        });
        return false;
    });

    $('#catfltr_cache').click(function(){
        
        var cat_id = $('#catfltr').val();
        if($.isNumeric(cat_id)){

            $('#result').html("<img src='../../img/ajax-loader.gif' />");
            $.ajax({
                type : 'POST',
                url  : hosturl + "/cache_cachesettings/set_cache_cat_filter_mapping", 
                data : "cat_id="+cat_id,           
                success : function(result) {

                    if (result) {
                        $('#result').html("<span class='successnew'>Action done successfully.</span>");                       
                    }
                    return false;
                }
            });
        }else{
            alert('Category id should be numeric.');
        }

        $('#catfltr').val('');
        return false;
    });
    
    $('.faq_cache').click(function(){
        
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        $.ajax({
            type: 'POST',
            data:{"param":"cache"},
            url:hosturl+"/faq_faqcache/set_faq_cache",            
            success:function(result) {
                if(result){
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                }
                return false;
            }
        });
        return false;
    });

    $('#WapMenus_cache').click(function(){         
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        $.ajax({
            type: 'POST',
            url:hosturl+"/site_page/redisRemoveWapMenus",            
            success:function(result) {
            $('#result').html("<span class='successnew'>Action done successfully.</span>");
            return false;
            }
        });
        return false;
    });

	$('#pincode_service_data').click(function(){
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        var pincode_cache_type = $('#pincode_cache_type').val();
        if(pincode_cache_type==''){
            alert('Kindly select one cache type to be updated.');
        }else{
            $.ajax({
                type : 'POST',
                url  : hosturl + "/cache_cachesettings/update_pincode_data_java/"+pincode_cache_type,
                success : function(result) {
                    if (result) {
                        $('#result').html("<span class='successnew'>Action done successfully.</span>");
                    }
                    return false;
                }
            });
        }
        return false;
    });

    $('#product_cache_data').click(function(){
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        var product_cache_type = $('#product_cache_type').val();
        if(product_cache_type==''){
            alert('Kindly select one cache type to be updated.');
        }else{
            $.ajax({
                type : 'POST',
                url  : hosturl + "/cache_cachesettings/update_pincode_data_java/"+product_cache_type,
                success : function(result) {
                    if (result) {
                        $('#result').html("<span class='successnew'>Action done successfully.</span>");
                    }
                    return false;
                }
            });
        }
        return false;
    });

    $('#multi_update').click(function(){
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        var multi_pro_update = $('#multi_pro_update').val();
        var product_ids = $('#multi_product_id').val();
        if(multi_pro_update=='' || product_ids==''){
            alert('Kindly select one cache type and product ids to be updated.');
        }else{
            $.ajax({
                type : 'POST',
                url  : hosturl + "/cache_cachesettings/update_multi_product_data/",
                data: {'cache_type':multi_pro_update,'product_ids':product_ids},
                success : function(result) {
                    if (result) {
                        $('#result').html("<span class='successnew'>Action done successfully.</span>");
                    }
                    return false;
                }
            });
        }
        return false;
    });



// Set Cache for the Autosuggestion category tree
$('#a_set_categorytree_cache').click(function(){
 $('#result').html("<img src='../../img/ajax-loader.gif' />");
    $.ajax({
       type:'POST',
       url : hosturl + "/cache_cachesettings/categorybrand_cron",
       success:function(result){
           if(result=="success"){
               $("#result").html("<span class='successnew'>Category Version generated successfully.</span>");
           }
        }
    });
});

// Set App/Wap browse menu cache -- Added By Anil Gupta(08/05/2017)
$('#set_app_browse_menu').click(function(){
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        $.ajax({
            type: 'POST',
            url: hosturl + "/cache_cachesettings/set_app_wap_browse_menu_cache",  
            success:function(result) {
                if(result != 0){
                    $('#result').html("<span class='successnew'>Action done successfully.</span>");
                }else{
                    $('#result').html("<span class='errornew'>Something went wrong, please try again.</span>");
                    return false;
                }
            }
        });
        return false;
    });

    $('#rem_studio_events_cache').click(function(){
        $('#result').html("<img src='../../img/ajax-loader.gif' />");
        $.ajax({
            type: 'POST',
            url: hosturl + "/site_listings/clearStudioEventsCache",  
            success:function(result) {
                if(result){
                    $('#result').html("<span class='successnew'>Action done successfully.</span>");
                }else{
                    $('#result').html("<span class='errornew'>Something went wrong, please try again.</span>");
                    return false;
                }
            }
        });
        return false;
    });
    
});

/*set collections in cache */
$('#set_collections_cache').click(function(){
    var url = hosturl +"/collection_collection/setAllCollectionsCache";
    $('#result').html("<img src='../../img/ajax-loader.gif' />");           
    $.ajax({
        type: 'POST',
        url:url,
        success:function(result)
        {
            if(result){
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
                return false;
            }else{
                $('#result').html("<span class='successnew'>Something went wrong.Please connect with admin</span>");
                return false;
            }
        }
    });
    return false;
});


// Set franchise city status cache ( added by Nishigandha N)
$('#set_franchise_city_cache').click(function(){
    $('#result').html("<img src='../../img/ajax-loader.gif' />");
    $.ajax({
        type: 'POST',
        url: hosturl + "/cache_cachesettings/set_franchise_city_cache",  
        success:function(result) {
            if(result != 0){
                $('#result').html("<span class='successnew'>Action done successfully.</span>");
            }else{
                $('#result').html("<span class='errornew'>Something went wrong, please try again.</span>");
                return false;
            }
        }
    });
    return false;
});