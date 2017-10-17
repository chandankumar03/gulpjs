var cPro = true;
var assoc_pro_id=0;
var addAssocSupplier = {};
var aTemplate = '';
aTemplate = '<tr><td><span style="float:left; font-weight:bold;">{{ var upstream_contact }} Products</span> <span style="float:right;"><input type="button" id="{{ var supplier_id }}" class="dummy_assoc_listing abutton" value="Edit" /></span></td></tr>';
aTemplate +='<tr><td>';
	aTemplate += '<div class="hastable" style="margin: 10px auto;">';
		aTemplate += '<table cellspacing="0">';			
			aTemplate += '<thead><tr><th>Option Label</th><th>Option Value</th><th>Status</th><th>Qty</th><th>SKU</th><th>Availability</th><th>Merchant SKU</th><th>EAN</th><th>AF Value</th><th>OLD SKU</th><th>MPT</th><th>Margin %</th><th>Margin</th><th>Cost</th><th>Price</th></tr></thead>';
			aTemplate += '<tbody>';				
			aTemplate += 	'<tr>'; 
				aTemplate += 	'<td class="text">' + super_attribute_label + '</td>';
				aTemplate += 	'<td>{{ var super_attribute_value }}</td>';
				aTemplate += 	'<td class="text">{{ var status }}</td>';
				aTemplate += 	'<td class="numeric">{{ var qty }}</td>';
				aTemplate += 	'<td>{{ var sku }}</td>';
				aTemplate += 	'<td class="text">{{ var stock_status }}</td>';
				aTemplate += 	'<td class="text">{{ var merchant_sku_id }}</td>';
				aTemplate += 	'<td class="text">{{ var ean }}</td>';
				aTemplate += 	'<td class="text">{{ var old_sku_id }}</td>';
				aTemplate += 	'<td style="display:none;" class="text">{{ var mpt_category }}</td>';
				aTemplate += 	'<td class="numeric">{{ var cost_margin_perc }}</td>';
				aTemplate += 	'<td class="numeric">{{ var cost_margin }}</td>';
				aTemplate += 	'<td class="numeric">{{ var cost }}</td>';
				aTemplate += 	'<td class="numeric">{{ var super_attribute_price }}</td>';
			aTemplate += 	'</tr>';
			aTemplate += '</tbody>';
		aTemplate += '</table>';
	aTemplate += '</div>';
aTemplate += '</td></tr>';


function calculateAf(price,cost, prc_total) {
   
var af=(1-cost/price)*100-prc_total;
return af;
}
function associateChild(upstream_contact, business_model) {
	var tTemplate = '';
	tTemplate = '<tr><td><span style="float:left; font-weight:bold;">'+master_data.merchant[upstream_contact]+' Products</span> <span style="float:right;"><input type="button" id="'+upstream_contact+'" onclick="editAssoc('+upstream_contact+');" class="dummy_assoc_listing abutton" value="Edit" /></span></td></tr>';
	tTemplate +='<tr><td>';
		tTemplate += '<div class="hastable" style="margin: 10px auto;">';
			tTemplate += '<table cellspacing="0">';
				tTemplate += '<thead><tr><th>Option Label</th><th>Option Value</th><th>Status</th><th>Qty</th><th>SKU</th><th>Availability</th><th>Merchant SKU</th><th>EAN</th><th>OLD SKU</th><th>Margin %</th><th>Margin</th><th>Cost</th><th>Super Attribute Price</th></tr></thead>';
				tTemplate += '<tbody>';
				
				addAssocSupplier[upstream_contact] = {};
				//alert("Supper supplier list");
				//console.log(default_supplier_super_attributes);return false;
	for(var i in default_supplier_super_attributes) {
		addAssocSupplier[upstream_contact][default_supplier_super_attributes[i]] = {};
		addAssocSupplier[upstream_contact][default_supplier_super_attributes[i]]["attribute_set_id"] = attribute_set_id;
		addAssocSupplier[upstream_contact][default_supplier_super_attributes[i]]["type_id"] = "simple_child";
		addAssocSupplier[upstream_contact][default_supplier_super_attributes[i]]["default_supplier"] = upstream_contact;
		addAssocSupplier[upstream_contact][default_supplier_super_attributes[i]]["visibility"] = "1";
		addAssocSupplier[upstream_contact][default_supplier_super_attributes[i]]["status"] = "1";
		addAssocSupplier[upstream_contact][default_supplier_super_attributes[i]]["stock_status"] = "0";
		addAssocSupplier[upstream_contact][default_supplier_super_attributes[i]]["qty"] = "0";
		
		addAssocSupplier[upstream_contact][default_supplier_super_attributes[i]][super_attribute_code] = default_supplier_super_attributes[i];
		addAssocSupplier[upstream_contact][default_supplier_super_attributes[i]]["suppliers"] = {};
		
					tTemplate += 	'<tr id="tr-child-' + upstream_contact + '-' + default_supplier_super_attributes[i] + '">';
						tTemplate += 	'<td class="text">' + super_attribute_label + '</td>';
						tTemplate += 	'<td>'+master_data.super_attribute_code[default_supplier_super_attributes[i]]+'</td>';
						tTemplate += 	'<td class="text">Enabled</td>';
						tTemplate += 	'<td class="numeric">0</td>';
						tTemplate += 	'<td>&nbsp;</td>';
						tTemplate += 	'<td class="text">Out of Stock</td>';
						tTemplate += 	'<td class="text">&nbsp;</td>';
						tTemplate += 	'<td class="text">&nbsp;</td>';
						tTemplate += 	'<td class="text">&nbsp;</td>';
						tTemplate += 	'<td class="text">&nbsp;</td>';
						
						if(business_model=="marketplace") {
							// this was just for mpt.
							/*if("mpt_category" in suppliersList[upstream_contact]) {
								tTemplate += 	'<td style="display:none;" class="text">'+master_data.mpt_category[suppliersList[upstream_contact].mpt_category]+'</td>';
							} else {
								tTemplate += 	'<td style="display:none;" class="text">&nbsp;</td>';
							}*/
						} else {
							//tTemplate += 	'<td style="display:none;" class="text">&nbsp;</td>';
						}
						tTemplate += 	'<td class="numeric">'+suppliersList[upstream_contact].cost_margin_perc+'</td>';
						tTemplate += 	'<td class="numeric">'+suppliersList[upstream_contact].cost_margin+'</td>';
						tTemplate += 	'<td class="numeric">'+suppliersList[upstream_contact].cost+'</td>';
						addAssocSupplier[upstream_contact][default_supplier_super_attributes[i]]["suppliers"]["seller"] = 1;
						addAssocSupplier[upstream_contact][default_supplier_super_attributes[i]]["suppliers"]["cost"] = suppliersList[upstream_contact].cost;
						addAssocSupplier[upstream_contact][default_supplier_super_attributes[i]]["suppliers"]["cost_margin_perc"] = suppliersList[upstream_contact].cost_margin_perc;
						addAssocSupplier[upstream_contact][default_supplier_super_attributes[i]]["suppliers"]["cost_margin"] = suppliersList[upstream_contact].cost_margin;
						tTemplate += 	'<td class="numeric">0</td>';
						//tTemplate += 	'<td class="numeric">0</td>';
					tTemplate += 	'</tr>';
	}
				tTemplate += '</tbody>';
			tTemplate += '</table>';
		tTemplate += '</div>';
	tTemplate += '</td></tr>';
	$("#table-child-products").append(tTemplate);
	//console.log(addAssocSupplier);
}
/*var cCreate = {};
var cOptions = {};
var cStatus = {};
var cQty = {};
var cAvailability = {};
var cMsku = {};
var cEan = {};
var cOldSku = {};
var cCost = {};*/
$(document).ready(function(){
	/*
	 * @auther Neeraj Singh
	 * function to update af on cost change.
	 * First calculate af and update it in textbox and json
	 */
	
	
	$(document).on('blur','.child_products_cost',function(){
		var cost= parseFloat($(this).val());
		var ch_id=$(this).attr("ch_id");
		var sup_id=$(this).attr("sup_id");
		var cpt_fee=parseFloat(suppliersList[sup_id].cpt_fee);
		var pg_fee=parseFloat(suppliersList[sup_id].pg_fee);
		var snh_fee=parseFloat(suppliersList[sup_id].snh_fee);
		
		var super_price=parseFloat($(this).parent().parent().find(".static-super_attribute_price").val());
		
		var price = (parseInt($("#txt-special_price").val()) > 0) ? parseInt($("#txt-special_price").val()) : parseInt($("#txt-price").val());
		if(!isNaN(super_price)){
                    var assoc_price=price+parseInt(super_price);
                }else{
                    var assoc_price=price;
                }
                //console.log(assoc_price);
                var assoc_af_left=(cpt_fee+pg_fee+snh_fee);
               // var af_value=(assoc_price/cost-1)*100-assoc_af_left;
               
                var af_value=calculateAf(assoc_price,cost,assoc_af_left);
                var af=Number(Math.round(af_value+'e2')+'e-2');
                //console.log(af_value);
                //console.log(assoc_af_left);return false;
                if(!isNaN(af_value)){
		$(this).parent().parent().find(".af-configurable-value").val(af);
		if(ch_id=='new_product'){
                    
                }else{
                associated_products[sup_id][ch_id]['suppliers'].af_value=af;
                associated_products[sup_id][ch_id]['suppliers'].pg_fee=pg_fee;
		associated_products[sup_id][ch_id]['suppliers'].snh_fee=snh_fee;
		associated_products[sup_id][ch_id]['suppliers'].cpt_fee=cpt_fee;
		}
            }
		//console.log(associated_products);	
		});

	$(document).on('blur','.static-super_attribute_price',function(){
                
		var super_price= parseFloat($(this).val());
		var ch_id=$(this).attr("ch_id");
		var sup_id=$(this).attr("sup_id");
		var cost=$(this).parent().parent().find(".child_products_cost").val();
                if(isNaN(cost)){
                   return false; 
                }
                
		var cpt_fee=parseFloat(suppliersList[sup_id].cpt_fee);
		var pg_fee=parseFloat(suppliersList[sup_id].pg_fee);
		var snh_fee=parseFloat(suppliersList[sup_id].snh_fee);
		
		var price = (parseInt($("#txt-special_price").val()) > 0) ? parseInt($("#txt-special_price").val()) : parseInt($("#txt-price").val());
		var assoc_price=price+super_price;
		//console.log(assoc_price);
		//return false;
		var assoc_af_left=cpt_fee+pg_fee+snh_fee;	
		//var af_value=(assoc_price/cost-1)*100-assoc_af_left;
                var af_value=calculateAf(assoc_price,cost,assoc_af_left);
		var af=Number(Math.round(af_value+'e2')+'e-2');		
		if(!isNaN(af_value)){
		$(this).parent().parent().find(".af-configurable-value").val(af);
		if(ch_id=='new_product'){
                    
                }else{
                associated_products[sup_id][ch_id]['suppliers'].af_value=af;
		associated_products[sup_id][ch_id]['suppliers'].pg_fee=pg_fee;
		associated_products[sup_id][ch_id]['suppliers'].snh_fee=snh_fee;
		associated_products[sup_id][ch_id]['suppliers'].cpt_fee=cpt_fee;
		}
            }
		//console.log(associated_products);	
		});
			
	
	
	
	$("#btn-create-static-child").on('click', function(){ 
            
		var pro = validateChildren();
		if(!pro) {
			$("#div-child-error-messages").show();
			$("#div-child-error-messages").append("Please fill all the mandatory fields before saving.");
			return false;
		}
                
                // validation for new commission structure
                // sell price should be greater than cost price only in case business model is pure marketplace
                // added by anoop.n
                var retail_price = parseInt($('#txt-price').val());
                var special_price = parseInt($('#txt-special_price').val());
                var sell_price = (special_price > 0) ? special_price : retail_price;
                for (supplier_id in associated_products)
                {
                    for (pid in associated_products[supplier_id])
                    {
                        cost_price = parseInt(associated_products[supplier_id][pid]['suppliers'].cost);
                        if ($("input[name='assoc[pro]["+ pid +"][cost]']").length > 0)
                        {
                            // if the input field is in edit mode, use the entered value as cost price
                            cost_price = parseInt($("input[name='assoc[pro]["+ pid +"][cost]']").val());
                        }
                        business_model = suppliersList[supplier_id].model;
                        var super_attr_price = parseInt(associated_products[supplier_id][pid].super_attribute_price);
                        if ($("input[name='assoc[pro]["+ pid +"][super_attribute_price]']").length > 0)
                        {
                            // if the input field is in edit mode, use the entered value as super_attribute_price
                            super_attr_price = parseInt($("input[name='assoc[pro]["+ pid +"][super_attribute_price]']").val());
                        }
                        var child_sell_price = sell_price + super_attr_price;

                        if (pro !== false && business_model === "marketplace" && cost_price > 0 && child_sell_price < cost_price)
                        {
                            if ($("input[name='assoc[pro]["+ pid +"][cost]']").length > 0)
                            {
                                // if the input field is in edit mode, use the entered value as cost price
                                $("input[name='assoc[pro]["+ pid +"][cost]']").addClass('error-border');
                            }
                            $("#div-child-error-messages").show();
                            $("#div-child-error-messages").append("Sell price (Price + Super Attribute Price) should be greater than cost price for PM.<br />");
                            pro = false;
                            return false;
                        }
                    }
                }
                
		 $('.child_permission').attr('disabled', false);
		var $data = $('#frm-associated-products').serialize();
                
		$data += "&store_id=" + store_id;
                
               // console.log(JSON.stringify($data));
            
		//console.log($data); return false;
		var $url = ROOT_URL + "/product/save_child";
                
                
                
		$.ajax({
			type: "POST",
			url: $url,
			data: $data,
			 beforeSend: function() {
				 
				 $('#btn-create-static-child').prop('disabled', true);
				 $('#btn-new-static-child').prop('disabled', true);
				 $('#btn-cancel-static-child').prop('disabled', true);
				 
				 $("#div-child-success-messages").empty();
				 $("#div-child-success-messages").hide();
				 $("#div-child-error-messages").empty();
				 $("#div-child-error-messages").hide();
				 $("#div-loader-wait").show();
			},
			success: function(){
				
			},
			complete: function(r){console.log(r);
                                $('.child_permission').attr('disabled', true);
				$('#btn-create-static-child').prop('disabled', false);
				$('#btn-new-static-child').prop('disabled', false);
				$('#btn-cancel-static-child').prop('disabled', false);
				$("#div-loader-wait").hide();
				var l = $.parseJSON(r.responseText);
				//console.log(l);
				if(l.failed) {
					$("#div-child-error-messages").show();
					$("#div-child-error-messages").append(l.failed);
					for(var x in l.failed) {
						for(var y in l.failed[x])
						$("#div-child-error-messages").append(l.failed[x][y] + "<br />");
					}
					return false;
				}
				
				if(l.success) {
					$("#div-child-success-messages").show();
					for(var x in l.success) {
						$("#div-child-success-messages").append(l.success[x]);
					}
					children_in_edit = false;
					supplier_in_edit = 0;
					/*setTimeout(function(){
						window.open(ROOT_URL + '/product/addproduct/' + product_id,'_self');
					}, 1000);*/
					$('#btn-save-item-edit').trigger('click');
				}
				
				
				
				// attach that shit below
			},
			error: function(r) {
				//console.log(r);
			}
		});
	});
	
	
	function validateUniqueChildAttributes(code, value, element) {
		$.ajax({ 	
			url: ROOT_URL + "/product/validateAttributes?code=" + code + "&value=" + value + "&product_id=" + assoc_pro_id,
			beforeSend:function() {
				
			},
			async:false,
			success: function(t) {
				var res = parseInt(t);
				if(res == "1") {
					element.addClass("error-border");
					cPro = false;
				}
			}
		}); 
	}
	
	
});
var supplier_in_edit = 0;
function editAssoc(s_id) {
	if(children_in_edit == false) {
	supplier_in_edit = s_id;
	children_in_edit = true;
	$('#span-edit-child-products').html("Create Child Products for '" + master_data["merchant"][s_id] + "'");
	$("#div-edit-child").show();
	var mode = 1;

	
	if(s_id in associated_products) {
		var used = associated_products[s_id];
		mode = 1;
	} else if(s_id in addAssocSupplier) {
		var used = addAssocSupplier[s_id];
		//console.log(used);
		mode = 2;
		//alert('Feature Disabled');
	} else {
		return false;
	}
        var mattress_option_value=mattress_option;
	
        var add_mattress_value=add_mattress_label;
	var opts = childOptions;
	var used_opts = {}; 
	var editTemplate = '';
        for(var i in used) {
		//alert(i);
		var mattress_bed_type=used[i]['mattress_bed_type'];
                
		var supplier_id 	= used[i]["suppliers"]['upstream_contact']; 
		var opt 			= used[i][super_attribute_code];
		if(mode == 1) {
			//console.log(used[i]);
			var status 			= used[i]["status"];
			var qty 			= Math.round(used[i]["qty"],0);
			var stock_status 	= used[i]["stock_status"];
			var merchant_sku_id = used[i]["suppliers"]["merchant_sku_id"];
                        merchant_sku_id = merchant_sku_id.replace('"','&quot;');       //This is added for allowing double quotes i.e " in the merchant_sku_id
			if("ean" in used[i]["suppliers"]) {
				var ean 			= used[i]["suppliers"]["ean"];
			} else {
				var ean 			= "";
			}
			//var af_value		= Number(Math.round(used[i]["suppliers"]['af_value']+'e2')+'e-2');
			if("old_sku_id" in used[i]["suppliers"]) {
				var old_sku_id 		= used[i]["suppliers"]["old_sku_id"];
			} else {
				var old_sku_id 		= '';
			}
			var cost 			= Math.round(used[i]["suppliers"]["cost"],0);
			var super_price 	= Math.round(used[i]["super_attribute_price"], 0);
                        if("gst_multi_code" in used[i]["suppliers"]) {
				var gst_multi_code = used[i]["suppliers"]["gst_multi_code"];
			} else {
				var gst_multi_code = "";
			}
		} else {
			var status 			= 0;
			var qty 			= 0;
			var stock_status 	= 0;
			var merchant_sku_id = '';
			var ean 			= '';
			var old_sku_id 		= '';
			var cost 			= 0;
			//var af_value		= Number(Math.round(used[i]["suppliers"]['af_value']+'e2')+'e-2');
			var super_price 	= 0;
                        var gst_multi_code 	= '';
		}
                
            var af_value = (isNaN(used[i]["suppliers"]['af_value'])) ? 0 : Number(Math.round(used[i]["suppliers"]['af_value']+'e2')+'e-2');
		var selection = '';
		editTemplate += '<tr>';
			editTemplate += '<td>';
			if(mode==2) {
				editTemplate += '<input type="checkbox" checked="checked" value="0" class="static-childrens" />';
			} else { 
				editTemplate += '<input name="assoc[pro]['+i+'][id]" type="checkbox" disabled="disabled" checked="checked" value="'+i+'" class="static-childrens" />'; 
			}
			editTemplate += '</td>';
			editTemplate += '<td>' + super_attribute_label + '</td>';
			editTemplate += '<td>';
				if(mode==2) {
					editTemplate += '<select name="assoc[pro]['+i+']['+super_attribute_id+']">';
					for(c in opts) {
						if(mode==1) {
							if(opt == opts[c]['option_id']) {
								selection = 'selected=\'selected\'';
							} else {
								selection = '';
							}
						} else {
							if(used[i][super_attribute_code] == opts[c]['option_id']) {
								if(i == opts[c]['option_id']) {
									selection = 'selected=\'selected\'';	
								} else {
									selection = '';
								}
							}
						}
						editTemplate += '<option ' + selection + ' value="' + opts[c]['option_id'] + '">' + opts[c]['value'] + '</option>';
						selection = '';
					}
					editTemplate += '</select>';
				} else {
					used_opts[used[i][super_attribute_code]] = used[i][super_attribute_code];
					editTemplate += master_data.super_attribute_code[used[i][super_attribute_code]]
				}
			editTemplate += '</td>';
                         if(add_mattress_label==1){
                             
	                  editTemplate += '<td>';
		           
					editTemplate += '<select name="assoc[pro]['+i+'][mattress_bed_type]">';
                                       editTemplate += '<option value = "0" >Please Select</option>';
					for(c in mattress_option_value) {
						
							if(mattress_bed_type == mattress_option_value[c]['option_id']) {
                                                            
								selection = 'selected=\'selected\'';
							} else {
                                                            
								selection = '';
							}
						
						editTemplate += '<option ' + selection + ' value="' + mattress_option_value[c]['option_id'] + '">' + mattress_option_value[c]['value'] + '</option>';
						//selection = '';
					}
					editTemplate += '</select>';
				
	                     editTemplate += '</td>';
                        }
			editTemplate += '<td>';
				if(child_per==1){
				editTemplate += '<select name="assoc[pro]['+i+'][status]" >';
					editTemplate += '<option value="">Please Select</option>';
					if(status == 1) {
						editTemplate += '<option selected="selected" value="1">Enable</option>';
					} else {
						editTemplate += '<option value="1">Enable</option>';
					}
					if(status == 0) {
						editTemplate += '<option selected="selected" value="0">Disable</option>';
					} else {
						editTemplate += '<option value="0">Disable</option>';
					}
				editTemplate += '</select>';
                            } else {
                                
                                editTemplate += '<select name="assoc[pro]['+i+'][status]" class="child_permission" disabled >';
                              if(status == 1) {
						editTemplate += '<option selected="selected" value="1">Enable</option>';
					} else {
						editTemplate += '<option value="1">Enable</option>';
					}
					if(status == 0) {
						editTemplate += '<option selected="selected" value="0">Disable</option>';
					} else {
						editTemplate += '<option value="0">Disable</option>';
					}
                                editTemplate += '</select>';
                            }
			editTemplate += '</td>';
			editTemplate += '<td><input name="assoc[pro]['+i+'][qty]"  type="text" value="'+qty+'" class="dummy_prices static-qty" style="width:60px;text-align:right;" /></td>';
			editTemplate += '<td>';
				editTemplate += '<select name="assoc[pro]['+i+'][is_in_stock]" >';
					editTemplate += '<option value="">Please Select</option>';
					if(stock_status == 0) {
						editTemplate += '<option selected="selected" value="0">Out of Stock</option>';
					} else {
						editTemplate += '<option value="0">Out of Stock</option>';
					}
					if(stock_status == 1) {
						editTemplate += '<option selected="selected" value="1">Available</option>';
					} else {
						editTemplate += '<option value="1">Available</option>';
					}
//console.log("supplier_id"+supplier_id+"i="+i);
//console.log(suppliersList);
//console.log(associated_products);
				editTemplate += '</select>';
			editTemplate += '</td>';
			editTemplate += '<td><input name="assoc[pro]['+i+'][merchant_sku_id]" value="'+ merchant_sku_id +'" type="text" class="static-merchant_sku_id" style="width:100px;" /></td>';
			editTemplate += '<td><input name="assoc[pro]['+i+'][ean]" value="'+ ean +'" type="text" class="static-ean" style="width:100px;" /></td>';
			editTemplate += '<td><input name="assoc[pro]['+i+'][af_value]" value="'+af_value+'" type="text" readonly class="af-configurable-value" style="width:100px;" /></td>';
			
			editTemplate += '<input name="assoc[pro]['+i+'][cpt_fee]" value="'+suppliersList[supplier_id].cpt_fee+'" type="hidden"/>';
			editTemplate += '<input name="assoc[pro]['+i+'][prc_code]" value="'+suppliersList[supplier_id].prc_code+'" type="hidden"/>';
			editTemplate += '<input name="assoc[pro]['+i+'][pg_fee]" value="'+suppliersList[supplier_id].pg_fee+'" type="hidden"/>';
			editTemplate += '<input name="assoc[pro]['+i+'][snh_fee]" value="'+suppliersList[supplier_id].snh_fee+'" type="hidden"/>';
			
			editTemplate += '<td><input name="assoc[pro]['+i+'][old_sku_id]" value="'+ old_sku_id +'" type="text" class="static-old_sku_id" style="width:100px;" /></td>';
			editTemplate += '<td><input name="assoc[pro]['+i+'][cost]" value="'+ cost +'" sup_id="'+supplier_id+'" ch_id="'+i+'" class="dummy_prices required_child static-cost child_products_cost"  type="text" style="width:60px;text-align:right;" /></td>';
			editTemplate += '<td>';
			editTemplate += '<input name="assoc[pro]['+i+'][super_attribute_price]" value="'+ super_price +'" sup_id="'+supplier_id+'" ch_id="'+i+'" class="dummy_prices required_child static-super_attribute_price"  type="text" style="width:60px;text-align:right;" />';
				editTemplate += '<input name="assoc[pro]['+i+'][supplier_id]" value="'+  supplier_id  +'" class="dummy_prices required_child "  type="hidden" />';
				//editTemplate += '<input name="assoc[parent_id]" value="'+ product_id +'" class="dummy_prices required_child"  type="hidden"  />';
				if(mode==1) {
					editTemplate += '<input name="assoc[pro]['+i+']['+super_attribute_id+']" value="'+ opt +'" type="hidden"  />';
				}
				//editTemplate += '<input name="assoc[super_attribute_id]" value="'+ super_attribute_id +'" type="hidden"  />';
			editTemplate += '</td>'	;
                        
                        editTemplate += '<td>';
                        editTemplate += '<input name="assoc[pro]['+i+'][gst_multi_code]" value="'+ gst_multi_code +'" sup_id="'+supplier_id+'" ch_id="'+i+'" class="static-gst_multi_code"  type="text" style="width:100px;text-align:right;" />';
			editTemplate += '</td>'	;
                        
                        
			editTemplate += '<td>';
				editTemplate += '<a href="javascript://" class="btn_no_text btn ui-state-default ui-corner-all" onclick="deleteChildProduct('+i+');"><span class="ui-icon ui-icon-circle-close"></span></a>';
			editTemplate += '</td>'	;
		editTemplate += '</tr>';
	}
	//console.log(used_opts); return false;
	//console.log(editTemplate);return false;

	
	$("#tbl-edit-child").append(editTemplate);
	$('#'+s_id).prop('disabled', true);
	} else {
		alert('Kuch bhi! :-/');
	}
	//console.log($('#'+s_id));
}

var c_count = 0;
function addAssoc() {
	var s_id = supplier_in_edit;
	var mode = 1;
	if(s_id in associated_products) {
		var used = associated_products[s_id];
		mode = 1;
	} else {
		return false;
	}
        var mattress_option_value=mattress_option;
	var opts = childOptions;
        var add_mattress_value=add_mattress_label;
       
	var used_opts = {};
	var af_value= 0;
	var editTemplate = '';
editTemplate += '<tr>';
	editTemplate += '<td><input name="assoc[new]['+c_count+'][id]" type="checkbox" checked="checked" value="'+s_id+'" class="static-new-childrens" /></td>';
	editTemplate += '<td>' + super_attribute_label + '</td>';
	editTemplate += '<td>';
		editTemplate += '<select name="assoc[new]['+c_count+']['+super_attribute_id+']" class="static-new-options-childrens" >';
			editTemplate += '<option value="">Please Select</option>';
		for(c in opts) {
			if(!(opts[c]['option_id'] in used_opts)) {
				editTemplate += '<option value="' + opts[c]['option_id'] + '">' + opts[c]['value'] + '</option>';
			}
		}
		editTemplate += '</select>';
	editTemplate += '</td>';
         if(add_mattress_label==1){
           
	editTemplate += '<td>';
		editTemplate += '<select name="assoc[new]['+c_count+'][mattress_bed_type]" class="static-new-mattress_bed_type-childrens" >';
			editTemplate += '<option value="">Please Select</option>';
		for(c in mattress_option_value) {
			if(!(mattress_option_value[c]['option_id'] in used_opts)) {
				editTemplate += '<option value="' + mattress_option_value[c]['option_id'] + '">' + mattress_option_value[c]['value'] + '</option>';
			}
		}
		editTemplate += '</select>';
	editTemplate += '</td>';
       }
	editTemplate += '<td>';
		editTemplate += '<select name="assoc[new]['+c_count+'][status]" class="static-new-status-childrens" >';
			editTemplate += '<option value="">Please Select</option>';
			editTemplate += '<option value="1">Enable</option>';
			editTemplate += '<option value="0">Disable</option>';
		editTemplate += '</select>';
	editTemplate += '</td>';
	editTemplate += '<td><input name="assoc[new]['+c_count+'][qty]" type="text" value="" class="dummy_prices static-qty" style="width:60px;text-align:right;" /></td>';
	editTemplate += '<td>';
		editTemplate += '<select name="assoc[new]['+c_count+'][is_in_stock]" class="static-new-stock-childrens">';
			editTemplate += '<option value="">Please Select</option>';
				editTemplate += '<option value="0">Out of Stock</option>';
				editTemplate += '<option value="1">Available</option>';
			editTemplate += '</select>';
	editTemplate += '</td>';
        editTemplate += '<td><input name="assoc[new]['+c_count+'][merchant_sku_id]" value="" type="text" class="static-new-msku-childrens" style="width:100px;" /></td>';
	editTemplate += '<td><input name="assoc[new]['+c_count+'][ean]" value="" type="text" class="static-ean" style="width:100px;" /></td>';
	
        		editTemplate += '<input name="assoc[new]['+c_count+'][cpt_fee]" value="'+suppliersList[s_id].cpt_fee+'" type="hidden"/>';
			editTemplate += '<input name="assoc[new]['+c_count+'][prc_code]" value="'+suppliersList[s_id].prc_code+'" type="hidden"/>';
			editTemplate += '<input name="assoc[new]['+c_count+'][pg_fee]" value="'+suppliersList[s_id].pg_fee+'" type="hidden"/>';
			editTemplate += '<input name="assoc[new]['+c_count+'][snh_fee]" value="'+suppliersList[s_id].snh_fee+'" type="hidden"/>';
			
        editTemplate += '<td><input name="assoc[new]['+c_count+'][af_value]" value="'+af_value+'" type="text" readonly class="af-configurable-value" style="width:100px;" /></td>';
	editTemplate += '<td><input name="assoc[new]['+c_count+'][old_sku_id]" value="" type="text" class="static-old_sku_id" style="width:100px;" /></td>';
	editTemplate += '<td><input name="assoc[new]['+c_count+'][cost]" sup_id="'+s_id+'" sup_id="new_product" c_count="'+c_count+'" value="" class="dummy_prices required_child static-new-cost-childrens child_products_cost"  type="text" style="width:60px;text-align:right;" /></td>';
	editTemplate += '<td>';
		editTemplate += '<input name="assoc[new]['+c_count+'][super_attribute_price]" sup_id="'+s_id+'" sup_id="new_product" c_count="'+c_count+'" value="" class="dummy_prices required_child static-super_attribute_price"  type="text" style="width:60px;text-align:right;" />';
		editTemplate += '<input name="assoc[new]['+c_count+'][supplier_id]" value="'+  s_id  +'" class="dummy_prices required_child "  type="hidden" />';
		//editTemplate += '<input name="assoc[parent_id]" value="'+ product_id +'" class="dummy_prices required_child"  type="hidden"  />';
	editTemplate += '</td>';
        editTemplate += '<td><input name="assoc[new]['+c_count+'][gst_multi_code]" sup_id="'+s_id+'" sup_id="new_product" c_count="'+c_count+'" value="" type="text" class="static-gst_multi_code" style="width:100px;text-align:right;" /></td>';
editTemplate += '</tr>';

c_count++;
$("#tbl-edit-child").append(editTemplate);
$(".dummy_prices").on('keydown', function(e){
	numcheck(e);
});
}

function validateChildren() {
	var pro = true;
	var c = $('.static-new-childrens');
	var opts = $('.static-new-options-childrens');
	var status = $('.static-new-status-childrens');
        
        var bedtype = $('.static-new-mattress_bed_type-childrens');
       
	var stock = $('.static-new-stock-childrens');
	var msku = $('.static-new-msku-childrens');
	var cost = $('.static-new-cost-childrens');
	c.each(function(i,e){
		$(opts[i]).removeClass('error-border');
		$(status[i]).removeClass('error-border');
                $(bedtype[i]).removeClass('error-border');
		$(stock[i]).removeClass('error-border');
		$(msku[i]).removeClass('error-border');
		$(cost[i]).removeClass('error-border');
	});
	
	//console.log(default_supplier_super_attributes);
	c.each(function(i,e){
		if($(e).is(':checked')) {
			
			// options
			if($(opts[i]).val() == "") {
				$(opts[i]).addClass('error-border');
				pro = false;
			} 
			
			//status
			if($(status[i]).val() == "") {
				$(status[i]).addClass('error-border');
				pro = false;
			}
			
                        //bedtype
                        
                        if($(bedtype[i]).val() == 0) {
				$(bedtype[i]).addClass('error-border');
				pro = false;
			}
                     
			//stock
			if($(stock[i]).val() == "") {
				$(stock[i]).addClass('error-border');
				pro = false;
			}
			
			//msku
			if($.trim($(msku[i]).val()) == "") {
				$(msku[i]).addClass('error-border');
				pro = false;
			}
			
			//cost
			//$.trim($(cost[i]).val()) == "" || $.trim($(cost[i].val()) == "0")
			if(empty($.trim($(cost[i]).val()))) {
				$(cost[i]).addClass('error-border');
				pro = false;
			}
		}
	});
	return pro;
}

function cancelAssoc() {
	$('#'+supplier_in_edit).prop('disabled', false);
	$('#span-edit-child-products').empty();
	$("#tbl-edit-child").empty();
	$("#div-edit-child").hide();
	$("#div-child-success-messages").empty();
	$("#div-child-success-messages").hide();
	$("#div-child-error-messages").empty();
	$("#div-child-error-messages").hide();
	children_in_edit = false;
	supplier_in_edit = 0;
}

function deleteChildProduct(id){
	if(confirm('Are you sure you want to delete the product')){
		var $url = ROOT_URL + "/product/delete_child/" + id;
		$.ajax({
			type: "POST",
			url: $url,
			beforeSend: function() {
				 $("#div-child-success-messages").empty();
				 $("#div-child-success-messages").hide();
				 $("#div-child-error-messages").empty();
				 $("#div-child-error-messages").hide();
				 $("#div-loader-wait").show();
			},
			success: function(){
				
			},
			complete: function(r){
				$("#div-loader-wait").hide();
				var l = $.parseJSON(r.responseText);
				if(l.failed) {
					$("#div-child-error-messages").show();
					//for(var x in l.failed) {
						$("#div-child-error-messages").append(l.failed);
					//}
					return false;
				}
				
				if(l.success) {
					cancelAssoc();
					$("#div-child-success-messages").show();
					for(var x in l.success) {
						$("#div-child-success-messages").append(l.success[x]);
					}
					setTimeout(function(){
						window.open(ROOT_URL + '/product/addproduct/' + product_id,'_self');
					}, 1000);
				}
				
				
				
				// attach that shit below
			},
			error: function(r) {
				//console.log(r);
			}
		});
	}
}

function addFirstChild(s_id) {
	if(children_in_edit == false) {
		supplier_in_edit = s_id;
		$('#span-edit-child-products').html("Create Child Products for '" + master_data["merchant"][s_id] + "'");
		children_in_edit = true;
		$("#div-edit-child").show();
		addAssoc();
		return false;
	} else {
		alert('Kuch bhi! :-/');
		return false;
	}
}