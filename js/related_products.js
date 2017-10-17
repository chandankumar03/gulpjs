/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
 
 
    $("#add_related_prod_listing").click(function(){
     $("#add_related_prod_error").html("");
     var related_prod_val=$("#add_related_prod_input").val();
     if(related_prod_val!='undefined' && related_prod_val!=''){
		var url = ROOT_URL + "/product/add_related_prod";
		$.post(url,{"product_id":related_prod_val,
                    "parent_id":product_id,
                    "position":parseInt(related_products)},function(r){
                  //  related_products -> this value contains the count of all product  with respect to that parent_id and this value of this variable is set in addproducts.phtml
                    if(r.data){
                        
                        related_products=parseInt(related_products)+1;
                       var final_price =Number(Math.round(r.data.final_price+'e2')+'e-2');
                       var make_live = [ "Not Live", "Queued","Live" ];
                        var cid=parseInt(r.data.combo_id);
                        var pos=parseInt(r.data.position);
                                          
                        $("#related_prod_tbody").append("<tr id='related_"+cid+"'> <td><input type='text'  related_prod_id='"+cid+"' class='dummy_prices related_prod_position' value='"+pos+"'/></td><td class='numeric'>"+r.data.entity_id+"</td><td class='text'>"+r.data.sku+"</td><td class='text'>"+r.data.product_name+"</td><td>"+final_price+"</td><td class='numeric'>"+parseInt(r.data.qty)+"</td><td class='text'>"+make_live[parseInt(r.data.make_live)]+"</td><td class='text'><a href='"+FRONT_END_URL+"/"+r.data.prod_url+"' target='_blank'>click here </a></td> <td> <a onclick='removerelatedproduct("+cid+")' href='javascript://'><span style='border:none;' class='ui-icon ui-icon-closethick'></span></a></td></tr>");
                        $("#add_related_prod_error").html(r.success);
                        $("#add_related_prod_input").val('');
                           if (related == "") {//related is empty when u add first time some id
                        related={};
                        related[cid]=pos;
                         } else{
                         related[cid]=pos;
                         }
                        
                    }else if(r.error){
                         $("#add_related_prod_error").html('<p style="color:red">'+r.error+"</p>");
                    }
                    
                    return false;
                    
                },'json');
         return false;
     }else{
         $("#add_related_prod_error").html("<p style='color:red'> Please enter Product id.</p>");
         return false;
     } 
 });   
    
    
    
    
  
    $("#save_related_prod_positions").click(function(){
     $("#add_related_prod_error").html("");
     if(related!='undefined' && related!=''){
		var url = ROOT_URL + "/product/update_related_prod_position";
		$.post(url, JSON.stringify(related),function(r){
                    if(r.success){
                        
                        alert(r.success);
                        
                    }else if(r.error){
                        alert(r.error);
                    }
                    
                    return false;
                    
                },'json');
         return false;
     }else{
         alert("First add some product, then click on save.")
         return false;
     } 
 });
    
    $(".related_prod_position").live("change",function(){
        if(!isNaN($(this).val())){
            //its a valid number store it into json.
            var related_id=parseInt($(this).attr("related_prod_id"));
            if(related_id>0){
                related[related_id]=parseInt($(this).val());
                return false;
            }
        }
    });
    
    
    
    
    
    
   
    
    
    
    
    
    
    
    
    
    
    
    
    
});

function removerelatedproduct(c_id){
    
    if(c_id!='undefind'){
       var con = confirm("Are you sure you want to remove this product id!");
    if (con == true) {
       var url = ROOT_URL + "/product/remove_related_prod";  
      $.post(url,{related_prod_id:c_id},function(r){
         
         if(r.success){
             $("#related_"+c_id).remove();
             //combos = $.grep(combos, function(e) { return e!=c_id });
             //var obj = JSON.parse(combos);
             delete combos[c_id];
             
         }else if(r.error){
             alert('<p style="color:red">'+r.error+'</p>');
         } 
          
      },'json');  
    } else {
        
    }  
      return false;
      
    }
    
    
    
}
