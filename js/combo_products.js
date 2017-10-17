/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    
 $("#add_combo_listing").click(function(){
     $("#add_combo_error").html("");
     var combo_val=$("#add_combo_input").val();
     if(combo_val!='undefined' && combo_val!=''){
         //var data = 'product_id' : combo_val;
		var url = ROOT_URL + "/product/add_combo";
		$.post(url,{"product_id":combo_val,"parent_id":product_id,"position":parseInt(position)},function(r){
                    if(r.data){
                        
                        position=parseInt(position)+1;
                       var final_price =Number(Math.round(r.data.final_price+'e2')+'e-2');
                       var make_live = [ "Not Live", "Queued","Live" ];
                        var cid=parseInt(r.data.combo_id);
                        var pos=parseInt(r.data.position);
                        $("#combo_tbody").append("<tr id='combo_"+cid+"'> <td><input type='text' class='dummy_prices' value='"+pos+"'/></td><td class='numeric'>"+r.data.entity_id+"</td><td class='text'>"+r.data.sku+"</td><td class='text'>"+r.data.product_name+"</td><td>"+final_price+"</td><td class='numeric'>"+parseInt(r.data.qty)+"</td><td class='text'>"+make_live[parseInt(r.data.make_live)]+"</td><td class='text'><a href='"+FRONT_END_URL+"/"+r.data.prod_url+"' target='_blank'>click here </a></td> <td> <a onclick='removecomboproduct("+cid+")' href='javascript://'><span style='border:none;' class='ui-icon ui-icon-closethick'></span></a></td></tr>");
                        $("#add_combo_error").html(r.success);
                        $("#add_combo_input").val('');
                        combos[cid]=pos;
                        
                    }else if(r.error){
                         $("#add_combo_error").html('<p style="color:red">'+r.error+"</p>");
                    }
                    
                    return false;
                    
                },'json');
         return false;
     }else{
         $("#add_combo_error").html("<p style='color:red'> Please enter Product id.</p>");
         return false;
     } 
 });   
    
  
    $("#save_combo_positions").click(function(){
     $("#add_combo_error").html("");
     if(combos!='undefined' && combos!=''){
         //var data = 'product_id' : combo_val;
		var url = ROOT_URL + "/product/update_combo_position";
                //var com=JSON.stringify({ combos: combos });
		$.post(url, JSON.stringify(combos),function(r){
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
    
    $(".combo_position").on("change",function(){
        if(!isNaN($(this).val())){
            //its a valid number store it into json.
            var combo_id=parseInt($(this).attr("combo_id"));
            if(combo_id>0){
                
                combos[combo_id]=parseInt($(this).val());
                return false;
            }
        }
    });
    
    
    
});

function removecomboproduct(c_id){
    
    if(c_id!='undefind'){
       var con = confirm("Are you sure you want to remove!");
    if (con == true) {
       var url = ROOT_URL + "/product/remove_combo";  
      $.post(url,{combo_id:c_id},function(r){
         
         if(r.success){
             $("#combo_"+c_id).remove();
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