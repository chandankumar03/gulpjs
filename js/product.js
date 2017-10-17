// JavaScript Document
var children_in_edit = false;
var push_to_content = false;
(function($) {
    if (!$.concat) {
        $.extend({
            concat: function(a, b) {
                var r = [];
                for (x in arguments) {
                    r = r.concat(arguments[x]);
                }
                return r;
            }
        });
    };
})(jQuery);

function activateWysiwyg(){
	if($("#txt-technical_specifications").is(":visible")){
		tinymce.execCommand('mceToggleEditor',false, 'txt-technical_specifications');
	}
        
        if($("#txt-care").is(":visible")){
		tinymce.execCommand('mceToggleEditor',false, 'txt-care');
	}
        if($("#txt-special_features").is(":visible")){
             tinymce.execCommand('mceToggleEditor',false, 'txt-special_features');
        }
        if($("#txt-installation_instructions").is(":visible")){
		tinymce.execCommand('mceToggleEditor',false, 'txt-installation_instructions');
	}
        
	if($("#txt-gourmet_nutrition_info").is(":visible")){
		tinymce.execCommand('mceToggleEditor',false, 'txt-gourmet_nutrition_info');
	}

	if($("#txt-gourmet_recipe").is(":visible")){
		tinymce.execCommand('mceToggleEditor',false, 'txt-gourmet_recipe');
	}

	if($("#txt-beverage_plantation").is(":visible")){
		tinymce.execCommand('mceToggleEditor',false, 'txt-beverage_plantation');
	}

	if($("#txt-specification_general").is(":visible")){
		tinymce.execCommand('mceToggleEditor',false, 'txt-specification_general');
	}

	if($("#txt-gaming_requirements").is(":visible")){
		tinymce.execCommand('mceToggleEditor',false, 'txt-gaming_requirements');
	}

	if($.trim($('#sel-visibility').val()) == ''){
		$('#sel-visibility').val('1');
	}



}

function calculateAf(price,cost, prc_total) {

var af=(1-cost/price)*100-prc_total;
return af;
}

$(document).ready(function(){

         /*
	new datepickr('news_from_date', { dateFormat: 'Y-m-d' }); // initialize new from date
	new datepickr('news_to_date', { dateFormat: 'Y-m-d' }); // initialize new to date
	new datepickr('special_from_date', { dateFormat: 'Y-m-d' }); // special date from
	new datepickr('special_to_date', { dateFormat: 'Y-m-d' }); // special date to
	*/

	$( '.date_input_first' ).datepicker({
		"dateFormat":"yy-mm-dd",
		changeMonth: true,
	    changeYear: true
	});

	if(isAuction == true) {
		$('.time_input_first').datetimepicker({
			"dateFormat":"yy-mm-dd",
			changeMonth: true,
		    changeYear: true,
		    minDate: "0D",
		    controlType: 'select',
			timeFormat: "hh:mm tt"
		});
	}

	if(product_id > 0 || (isAuction == true && Object.size(catList) > 0)) {
		var active_tab = 1;
		if(isAuction == true) {
			active_tab = 4;
		}
		$( "#tabs" ).tabs({
			active: active_tab,
			activate: function(event, ui) {
				if(product_type=='configurable') {
					if(ui.newPanel.selector == "#tabs-4" && product_id > 0) {
						//if(Object.size(associated_products[default_supplier]) == 0 && children_in_edit == false) {
						/*for(var sid in associated_products) {
							if(Object.size(associated_products[sid]) == 0 && children_in_edit == false) {
								$('#span-edit-child-products').html("Create Child Products for " + master_data["merchant"][sid]);
								supplier_in_edit = sid;
								children_in_edit = true;
								$("#div-edit-child").show();
								addAssoc();
								break;
							}
						}*/
						var width = $('#tabs-4 .entry-edit .entry-edit-head .title').width();
						$('#table-child-products').width(width);
						//alert(width);
						if(children_in_edit == true) {
							$("#div-edit-child").show();
						}
					} else {
						if(Object.size(associated_products[supplier_in_edit]) == 0){
							cancelAssoc();
						} else {
							$("#div-edit-child").hide();
						}
					}
				}
			}
		});
	} else {
		$( "#tabs" ).tabs({
			active: 0,
			activate: function( event, ui ) {
				if(ui.newPanel.selector == "#tabs-2" && product_id == 0) {
					activateWysiwyg();
				}
			}
		});
		if(isAuction==true) {
			$( "#tabs" ).tabs( "option", "disabled", [1, 2, 3, 4, 5, 6 ] );
		} else {
			$( "#tabs" ).tabs( "option", "disabled", [1, 2, 3, 4, 5 ] );
		}
	}
	//$("#vtabs1").jVertTabs( ); // display Tab
	//$("#vtabs1").tabs();
	// form validate
	//loadWysiwyg();
	$("#toggle").click(function(){
		tinymce.execCommand('mceToggleEditor',false, 'txt-description');
	});


	activateWysiwyg();

	for(var t in editTierPrices){
		addtireprice(t, true);
	}

	$("#form").submit(function(){
		//alert('Save Disabled for today.');
		//return false;
		tinyMCE.triggerSave();
		if(supplier_in_edit == true || children_in_edit == true || auction_in_edit > 0) {

			if(!confirm("Tabs are opened in edit mode. Saving the listing would revert any changes made there. Are you sure?")) {
				return false;
			} else {
				supplier_in_edit = false;
				children_in_edit = false;
				supplier_id_in_edit = 0;
			}
		}
		//validation for wardrobe
		if(attribute_set_name=='customized_wardrobe_door' || attribute_set_name=='customized_wardrobe_frame' || attribute_set_name=='customized_wardrobe_loft'){
			if(pattern_in_edit){
				alert("Tabs are opened in edit mode. Kindly close the tabs before saving.");
				return false;
			}	
		}
		
		var pro = validateForm();
		if(pro) {
			var $data = collectData();
			//console.log($data); return false;
			if(Object.size(skipped_attributes) > 0) {
				var fLen = Object.size($data.form);
				for(var s in skipped_attributes) {
					var tData = new Object;
					tData['name'] = "product["+s+"]";
					tData['value'] = skipped_attributes[s];
					//console.log(fLen);
					//fLen++;
					//$data.form[ fLen ] = new Object();
					$data.form[fLen] = new Array();
					$data.form[fLen] = tData;
					fLen++;
				}
			}
			//console.log($data.form); //return false;
			if(Object.size(queuedImages) > Object.size(savedImages)) {
				//console.log(Object.size(queuedImages));
				//console.log(Object.size(savedImages));
				if(!confirm('You have not saved all the images that were queued. Do you want to continue?')) {
					push_to_content = false;
					return false;
				}
			}
			//console.log($data);
			//return false;
			var $url = ROOT_URL + "/product/save";

			$.ajax({
				type: "POST",
				url: $url,
				data: $data,
				 beforeSend: function() {
					 $("#div-inner-error-messages").empty();
					 $("#div-error-messages").hide();
					 $("#div-success-messages").empty();
					 $("#div-success-messages").hide();
					 $("#div-loader-wait").show();
				},
				success: function(){

				},
				complete: function(r){
					$("#div-loader-wait").hide();

					var ret = $.parseJSON(r.responseText);
					if(!empty(ret['failed'])) {
						for(var x in ret['failed']) {
							for(var y in ret['failed'][x]) {
								$("#div-inner-error-messages").append(ret['failed'][x][y]);
							}
						}
						$("#div-error-messages").show();
						if(isAuction == true) {
							delete auction_data.old_product_id;
							delete auction_data.is_auction;
						}
						//console.log(auction_data);
						push_to_content = false;
						return false;
					}

					if(!empty(ret['success'])) {
						product_id=ret.product_id;
						$("#div-success-messages").append(ret.success);
						$("#div-success-messages").show();

						setTimeout(function(){
							pageAction(product_id, saveAction);
						}, 1000);
					}
				},
				error: function(r) {
					//console.log(r);
				}
			});
			//console.log(data.toSource());
		} else {
			push_to_content = false;
			return false;
		}
	});
	buildPath();
        //allowing only numeric input in HWD attribute
        if ($("#txt-height").length && $("#txt-width").length && $("#txt-depth").length) {
            $("#txt-height,#txt-width,#txt-depth").keydown(function (e) {
                if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                    (e.keyCode == 65 && e.ctrlKey === true) ||
                    (e.keyCode >= 35 && e.keyCode <= 40)) {
                    return;
                }
                if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                    e.preventDefault();
                }
            });
        }



});

function pageAction(pid, sa) {
	if(sa==1) {
		if(isAuction==true) {
			window.open(ROOT_URL + '/product_auction/listings','_self');
		} else {
			window.open(ROOT_URL + '/product_grid/view','_self');
		}
		//window.open(http_referer,'_self');
	} else {
		window.open(ROOT_URL + '/product/addproduct/' + pid,'_self');
	}
}


function deleteImages(bucket, image, e) {
	//deletedImages[bucket].push(image);
	if(confirm('Are you sure you want to delete ' + bucket + ' image?')) {
		var tmp = {};
		tmp[bucket] = image;
		deletedImages.push(tmp);
		//console.log(deletedImages);
		$(e).parent().remove();
		//$("#li-" + bucket + "-" + image).parent().remove();
		//$("#li-" + bucket + "-" + image).hide();
	}
}

function deleteARVImages(bucket, image, e) {
	//deletedImagesARView[bucket].push(image);
	if(confirm('Are you sure you want to delete ' + bucket + ' image?')) {
		var tmp = {};
		tmp[bucket] = image;
		deletedImagesARView.push(tmp);
		//console.log(deletedImagesARView);
		$(e).parent().remove();
		//$("#li-" + bucket + "-" + image).parent().remove();
		//$("#li-" + bucket + "-" + image).hide();
	}
}

function loadWysiwyg() {
	tinyMCE.init({
		//mode : "textareas",
		mode : "specific_textareas",
		editor_selector : "mceEditor",
		//mode : "none",
		theme : "advanced",
		plugins : "autolink,lists,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",

		theme_advanced_buttons1 : "save,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",
		theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
		theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
		theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,spellchecker,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,blockquote,pagebreak,|,insertfile,insertimage",
		theme_advanced_toolbar_location : "top",
		theme_advanced_toolbar_align : "left",
		theme_advanced_resizing : true,

		// Skin options
		skin : "o2k7",
		skin_variant : "silver",

		// Example content CSS (should be your site CSS)
		content_css : "css/example.css",

		// Drop lists for link/image/media/template dialogs
		template_external_list_url : "js/template_list.js",
		external_link_list_url : "js/link_list.js",
		external_image_list_url : "js/image_list.js",
		media_external_list_url : "js/media_list.js"
	});
}

var disabled_inputs = {};
function collectData() {


	var disabled_text = $("input:disabled");
	//console.log(disabled_text); return false;
	var disabled_drops = $("select:disabled");

	$("input:disabled").prop("disabled", false);
	$("select:disabled").prop("disabled", false);
	//console.log(disabled_inputs); return false;

	var tmp = $("#form").serializeArray();
	var data = {};

	data["product_id"] = product_id;
	data["attribute_set_id"] = attribute_set_id;
	data["product_type"] = product_type;
	data["form"] = tmp;
	//console.log(tmp); return false;
	data["cat"] = catList;
	data["supp"] = suppliersList;

	var tier = {};
	var tierGroup = $(".tier-group");
	var tierQty = $(".tier-qty");
	var tierPrice = $(".tier-price");

	for(var i =0; i < tierGroup.length; i++) {
		tier[i] = {};
		tier[i].group = tierGroup[i].value;
		tier[i].qty = tierQty[i].value;
		tier[i].price = tierPrice[i].value;
	}
	//console.log(editTierPrices);
	//console.log(tier);
	if(Object.size(tier) == 0 && skipped_attributes.tier_pricing) {
		$.each(editTierPrices, function(i,v){
			tier[i] = {};
			tier[i].group = v.cust_group;
			tier[i].qty = v.price_qty;
			tier[i].price = v.price;
		});
	}
	//console.log(tier);
	/*changes for custom options wardrobe*/
	var custom_options = {};
	var parent_title = $(".parent_title");
	var parent_material = $(".parent_material");
	var parent_status = $(".parent_status");
	var parent_sku = $(".parent_sku");
	var parent_price = $(".parent_price");
	var parent_cost = $(".parent_cost");
	var parent_merchant_sku_id = $(".parent_merchant_sku_id");
	var parent_internal_area = $(".parent_internal_area");
	var parent_external_area = $(".parent_external_area");
	/*if(attribute_set_name == 'customized_wardrobe_door'){
		var parent_is_mirror = $(".parent_is_mirror");
		var parent_mirror_price = $(".parent_mirror_price");
	}*/
	if(attribute_set_name == 'customized_wardrobe_loft'){
		var parent_loft_height = $(".parent_loft_height");
	}
	for(var i =0; i < parent_material.length; i++) {
		var array_index = '';
		var parent_id = parent_material[i]['id'];
		var id = parent_id.split("-");
		var option_id = $('#custom_options_title-'+id[1]).data('option_id');
		if(option_id==0){
			array_index = i;
		}else{
			array_index = option_id;
		}
		custom_options[array_index] = {};
		custom_options[array_index]['extra'] = {};
		custom_options[array_index].title = parent_title[i].value;
		custom_options[array_index].material = parent_material[i].value;
		custom_options[array_index].price = parent_price[i].value;
		custom_options[array_index].cost = parent_cost[i].value;
		custom_options[array_index].status = parent_status[i].value;
		custom_options[array_index].sku = parent_sku[i].value;
		custom_options[array_index].merchant_sku_id = parent_merchant_sku_id[i].value;
		custom_options[array_index].internal_area = parent_internal_area[i].value;
		custom_options[array_index].external_area = parent_external_area[i].value;
		if(option_id==0){
			var default_sku = $('#custom_options_child_default-'+id[1]).val()
		}else{
			var default_sku = $('#custom_options_child_default-'+option_id).val()
		}
		if(typeof default_sku != 'undefined'){
			custom_options[array_index].custom_options_child_default = default_sku;	
		}		
		/*if(attribute_set_name=='customized_wardrobe_door'){
			custom_options[array_index]['extra'].is_mirror = parent_is_mirror[i].value;
			custom_options[array_index]['extra'].mirror_price = parent_mirror_price[i].value;
		}*/
		if(attribute_set_name=='customized_wardrobe_loft'){
			custom_options[array_index]['extra'].loft_height = parent_loft_height[i].value;
		}
		custom_options[array_index].edit_flag = $('#custom_options_title-'+id[1]).data('edit_add_flag_pattern');
		custom_options[array_index].option_id = option_id;
		custom_options[array_index].custom_options_child ={};
		
		var child_color = $(".child_color_"+id[1]);
		var child_color_type = $(".child_color_type_"+id[1]);
		var child_status = $(".child_status_"+id[1]);
		var child_sku = $(".child_sku_"+id[1]);
		var child_price = $(".child_price_"+id[1]);
		var child_cost = $(".child_cost_"+id[1]);
		for(var j = 0; j<child_color_type.length;j++){
			var current_id = child_color_type[j]['id'];
			var color_row = current_id.split('-');
			var option_type_id = $('#custom_options_child_color_type-'+color_row[1]+'-'+color_row[2]).data('option_type_id');
			if(option_type_id==0){
				array_child_index = j;
			}else{
				array_child_index = option_type_id;
			}
			custom_options[array_index].custom_options_child[array_child_index] ={};
			custom_options[array_index].custom_options_child[array_child_index].color_type = child_color_type[j].value;
			custom_options[array_index].custom_options_child[array_child_index].color = child_color[j].value;
			custom_options[array_index].custom_options_child[array_child_index].status = child_status[j].value;
			custom_options[array_index].custom_options_child[array_child_index].price = child_price[j].value;
			custom_options[array_index].custom_options_child[array_child_index].cost = child_cost[j].value;
			custom_options[array_index].custom_options_child[array_child_index].sku = child_sku[j].value;
			custom_options[array_index].custom_options_child[array_child_index].edit_flag = $('#custom_options_child_color_type-'+color_row[1]+'-'+color_row[2]).data('edit_add_flag_pattern');
			custom_options[array_index].custom_options_child[array_child_index].option_type_id = option_type_id;
		}
	}
	data['custom_options'] = custom_options;
	/*changes for custom options wardrobe ends*/
	data["tier"] = tier;
	if(push_to_content == true) {
		data['push_to_content'] = 1;
	} else {
		data['push_to_content'] = 0;
	}
	/*images not to be sent for wardrobe products for images*/
	if(attribute_set_name != 'customized_wardrobe_door' && attribute_set_name != 'customized_wardrobe_frame' && attribute_set_name != 'customized_wardrobe_loft'){
		data['imagepos'] = imgpos;
		data['image_tag'] = img_tag;
	    data['arv_imgpos'] = arv_imgpos;
		for(var ele = 0; ele < disabled_text.length; ele++) {
			$(disabled_text[ele]).prop("disabled", true);
		}
		for(var ele = 0; ele < disabled_drops.length; ele++) {
			$(disabled_drops[ele]).prop("disabled", true);
		}
		queuedImages = [];
		$(".ax-file-name").each(function(i, ele){
			queuedImages.push($(ele).text());
			//uploadedImages[i] = $(ele).text();
			//console.log(ele);
		});
		data["images"] = uploadedImages;

	    queuedImagesARView = [];
		$(".ax-file-name-arview").each(function(i, ele){
			queuedImagesARView.push($(ele).text());
			//uploadedImagesARView[i] = $(ele).text();
			//console.log(ele);
		});
		data["arview_images"] = uploadedImagesARView;

	     	if(deletedImages.length > 0) {
			data['delete_images'] = deletedImages;
		}
	        if(deletedImagesARView.length > 0) {
			data['delete_arv_images'] = deletedImagesARView;
		}
		if(isAuction == true) {
			/*var auctionData = {};
			if(auction_status > 1) {
				auctionData.start_date = auction_data.start_date;
				auctionData.to_date = auction_data.end_date;
				auctionData.start_price = auction_data.start_price;
				auctionData.reserve_price = auction_data.reserved_price;
			} else {
				auctionData.start_date = $.trim($("#txt-auction_from_date").val());
				auctionData.to_date = $.trim($("#txt-auction_to_date").val());
				auctionData.start_price = $.trim($("#txt-auction_start_price").val());
				auctionData.reserve_price = $.trim($("#txt-auction_reserve_price").val());
			}
			if(old_product_id > 0) {
				auctionData.old_product_id = old_product_id;
			}
			if(auction_id > 0) {
				auctionData.auction_id = auction_id;
			}
			console.log(auctionData);*/
			if(old_product_id > 0) {
				auction_data.old_product_id = old_product_id;
			}
			auction_data.is_auction = isAuction;
			data["auction_data"] = auction_data;
		}
	}	
	data["store_id"] = store_id;
	return data;
}
//on change of super quantity checkbox, generate the min and max quantity input box.

$(".super_qty").on('change', function(){
	if($(this).attr('checked')){
            //disable min/max inputs
            $("#min_sale_qty").val(1);
            $("#max_sale_qty").val(0);
            $(".super_minmax_qty").attr("disabled","disabled");
        }else{
            //enable min/max inputs
            $(".super_minmax_qty").removeAttr("disabled");

        }
});

$("#default_qty_label").on('click', function(){
	if($('.super_qty').attr('checked')){
            //disable min/max inputs
            $('.super_qty').removeAttr('checked');
              $(".super_minmax_qty").removeAttr("disabled");

    }else{
            //enable min/max inputs
            $('.super_qty').attr('checked','checked');
              $("#min_sale_qty").val(1);
            $("#max_sale_qty").val(0);
            $(".super_minmax_qty").attr("disabled","disabled");

        }
});


$(".dummy_prices").on('keydown', function(e){
	numcheck(e, false);
});
$(".dummy_decimal").on('keydown', function(e){
	numcheck(e, true);
});
var saveAction = 0
$("#btn-save-item").on('click', function(e){
	saveAction = 1;
	$("#form").trigger('submit');
});

$('#btn-push-to-content').on('click', function(){
	push_to_content = true;
	$("#form").trigger('submit');
});

$("#btn-save-item-edit").on('click', function(e){
	$("#form").trigger('submit');
});

$("#btn-delete").on('click', function(e) {
	alert('No deletes allowed');
	return false;
});

$("#btn-reset").on('click', function(e){
	$("#form").each(function(){
		this.reset();
	});
});
$("#btn-back").on('click', function(e){
	//window.open(ROOT_URL + '/product_grid/view','_self');
	//window.open(http_referer,'_self');
	if(isAuction==true) {
		window.open(ROOT_URL + '/product_auction/listings','_self');
	} else {
		window.open(ROOT_URL + '/product_grid/view','_self');
	}
});

//author : Nilesh R. Pawar.
//created on :  2 september 2015.
//work : click back on listing page will redirect to view_archive listing page.
$("#archive_btn-back").on('click', function(e){
		window.open(ROOT_URL + '/product_grid/view_archive','_self');
	
});


function validateForm(){
        var ele = '';
	var pro = true;
	$("#div-inner-error-messages").empty();
	$("#div-error-messages").hide();
	//$("#div-inner-error-messages").hide();

        $(".required").each(function(i){
		if(empty($.trim($(this).val()))) {
                        
			if(push_to_content == true && ($(this).prop('id') == 'txt-name' || $(this).prop('id') == 'txt-description')) {
				$(this).removeClass('error-border');
			} else {
				$(this).addClass('error-border');
                                pro = false;
			}
			//console.log(this);
		}
	});

	$('.date_input_first').each(function(i,e){
		if(!empty($.trim($(e).val()))) {
			if(is_valid_date($(e).val()) === false) {
				pro = false;
				$(e).addClass('error-border');
				$("#div-inner-error-messages").append("Please make sure all date are in proper format and are valid.<br />");
			}
		}
	});

	//console.log(is_valid_date($('#txt-release_date').val()));
	//return false;
	/*
	if(product_type=='configurable' && $(".default_suppliers").length > 0) {
		$(".default_suppliers").each(function(i,e){
			if($(e).is(':checked')) {
				var us = $(e).val();
				if(product_id > 0) {
					if(us in associated_products) {
						if(Object.size(associated_products[us]) == 0) {
							pro = false;
							$("#div-inner-error-messages").append("Default supplier has no children associated, please check.<br />");
						}
					} else {
						pro = false;
						$("#div-inner-error-messages").append("Default supplier has no children associated, please check.<br />");
					}
				}
			}

		});
	}
	*/
        if ($("#txt-height").length && $("#txt-width").length && $("#txt-depth").length) {
            if($("#txt-dimension").length){
                if(!$("#txt-dimension").val()) {
                    if(!$("#txt-height").val()){
                        pro =false;
                        $("#div-inner-error-messages").append("Please input height.<br />");
                    }
                    if(!$("#txt-width").val()){
                        pro =false;
                        $("#div-inner-error-messages").append("Please input width.<br />");
                    }
                    if(!$("#txt-depth").val()){
                        pro =false;
                        $("#div-inner-error-messages").append("Please input depth.<br />");
                    }
                }

            }
        }


        var hasDefaultSupplier = $(".default_suppliers:checked").length;
	if(hasDefaultSupplier == 0) {
		$("#div-inner-error-messages").append("You need to have a default supplier before creating a listing.<br />");
		pro=false
	}
	//alert(hasDefaultSupplier);
	//pro=false;
	if(!pro) {
                //if(empty($("#div-inner-error-messages").text())) {
		$("#div-inner-error-messages").append("Please make sure you fill all the mandatory attributes before saving the product.<br />");
		//}
	}

	if(parseFloat($("#txt-price").val()) <= parseFloat($("#txt-special_price").val())) {
		$("#div-inner-error-messages").append("Price cannot be less than the special price.<br />");
		$("#txt-special_price").addClass('error-border');
		pro=false;
	}

	if(parseFloat($.trim($("#txt-price").val())) <= 0) {
		$("#div-inner-error-messages").append("Price cannot be zero.<br />");
		$("#txt-price").addClass('error-border');
		pro=false;
	}

	$('.tier-price').each(function(i,e){
		if(parseFloat($("#txt-price").val()) <= parseFloat($(e).val())) {
			$("#div-inner-error-messages").append("Price cannot be less than the Tier Price.<br />");
			$(e).addClass('error-border');
			pro=false;
		}
	});

	if(Object.size(catList) == 0) {
		$("#li-tabs1").addClass('error-border');
		$("#div-inner-error-messages").append("Please select atleast one category before saving the product.<br />");
		pro=false;
	} else {
		$("#li-tabs1").removeClass('error-border');
	}

	if(Object.size(suppliersList) == 0) {
		$("#li-tabs3").addClass('error-border');
		$("#div-inner-error-messages").append("Please add atleast one merchant before saving the product.<br />");
		pro=false;
	} else {
		$("#li-tabs3").removeClass('error-border');
	}

	imgpos = {};
	img_tag = {};
	temp_img_tag = {};
	/*validations not to be done for wardrobe products for images*/
	if(attribute_set_name != 'customized_wardrobe_door' && attribute_set_name != 'customized_wardrobe_frame' && attribute_set_name != 'customized_wardrobe_loft'){
		$(".live_image_pos").each(function(index, element){
			var tmpId = element.id.split('-');
			var id = tmpId[2];
			if($(element).val() in imgpos) {
				$("#div-inner-error-messages").append("Duplicate image position " + $(element).val() + ".<br />");
				pro = false;
			} else {
				imgpos[$(element).val()] = {};
				imgpos[$(element).val()] = id + '$$live';
			}
		});

		$(".temp_image_pos").each(function(index, element){
			var tmpId = element.id.split('-');
			var id = tmpId[2];
			if($(element).val() in imgpos) {
				$("#div-inner-error-messages").append("Duplicate image position " + $(element).val() + ".<br />");
				pro = false;
			} else {
				imgpos[$(element).val()] = {};
				imgpos[$(element).val()] = id+ '$$temp';
			}
		});

	        arv_imgpos = {};

		$(".live_arv_image_pos").each(function(index, element){
			var tmpId = element.id.split('-');
			var id = tmpId[2];
			if($(element).val() in arv_imgpos) {
				$("#div-inner-error-messages").append("Duplicate image position " + $(element).val() + ".<br />");
				pro = false;
			} else {
				arv_imgpos[$(element).val()] = {};
				arv_imgpos[$(element).val()] = id + '$$live';
			}
		});

		$(".temp_arv_image_pos").each(function(index, element){
			var tmpId = element.id.split('-');
			var id = tmpId[2];
			if($(element).val() in arv_imgpos) {
				$("#div-inner-error-messages").append("Duplicate image position " + $(element).val() + ".<br />");
				pro = false;
			} else {
				arv_imgpos[$(element).val()] = {};
				arv_imgpos[$(element).val()] = id+ '$$temp';
			}
		});

		$(".live_image_label").each(function(index, element){
			var tmpId = element.id.split('-');
			var id = tmpId[3];
			img_tag[id+'$$live'] = {};
			if($(element).val().length > 0 && $(element).val()!=''){
				img_tag[id+'$$live'] = $(element).val();
			}
		});

		$(".temp_image_label").each(function(index, element){
			var tmpId = element.id.split('-');
			var id = tmpId[3];
			img_tag[id+'$$temp'] = {};
			if($(element).val().length > 0 && $(element).val()!=''){
				img_tag[id+'$$temp'] = $(element).val();
			}
		});
		//console.log(temp_img_tag);return false;
	}
	
	//validation for wardrobe atleast one pattern and child is added
	if(attribute_set_name == 'customized_wardrobe_door' || attribute_set_name == 'customized_wardrobe_frame' || attribute_set_name == 'customized_wardrobe_loft'){
		if($('.options_row').length>0){
			var numOfOptions = $('.options_row').length;
			var options = $('.options_row');
			for(var i =0; i < numOfOptions; i++) {
				var id_child = options[i]['id'].split('-')[2];
				if($('.options_child_row_'+id_child).length<=0){
					$("#div-inner-error-messages").append("Add child to pattern.<br />");
					pro = false;
				}
			}
		}else{
			$("#div-inner-error-messages").append("Add atleast one pattern.<br />");
			pro = false;
		}
	}
        
        // validation for new commission structure
        // sell price should be greater than cost price only in case business model is pure marketplace
	// added by anoop.n
        var product_type = $("#product_type").val();
        var retail_price = parseInt($('#txt-price').val());
        var special_price = parseInt($('#txt-special_price').val());
        var sell_price = (special_price > 0) ? special_price : retail_price;
        var default_supplier_id = 0;
        if (typeof $('.default_suppliers:checked')[0] !== 'undefined')
        {
            default_supplier_id = $('.default_suppliers:checked')[0].value;
        }
        else if (typeof $('.default_suppliers:checked').value !== 'undefined')
        {
            default_supplier_id = $('.default_suppliers:checked').value;
        }
        var cost_price = 0, business_model = "", gstType = "", gstCode = "";
        if (default_supplier_id > 0 && typeof suppliersList !== 'undefined' && typeof suppliersList[default_supplier_id] !== 'undefined')
        {
            cost_price = parseInt(suppliersList[default_supplier_id].cost);
            business_model = suppliersList[default_supplier_id].model;
            gstType = suppliersList[default_supplier_id].gst_type;
            gstType = $("#sel-gst_type option[value='" + gstType + "']").text();
            gstCode = (gstType === "HSN") ? suppliersList[default_supplier_id].hsn_code : suppliersList[default_supplier_id].sac_code;
            if (suppliersList[default_supplier_id].gst_multi_code !== "undefined")
            {
                var gstMultiCode = suppliersList[default_supplier_id].gst_multi_code;
            }
        }
        if ((gstType !== "HSN" && gstType !== "SAC") || (typeof gstCode !== 'undefined' && gstCode !== null && gstCode.length !== 8) || !checkGstCode(gstType,gstCode) || gstCode =='00000008')
        {
            $("#div-inner-error-messages").append("Please select appropriate GST Type and Code.<br />");
            pro = false;
        }
        if (pro !== false && 
                (typeof gstMultiCode !== 'undefined' && gstMultiCode !== '' && gstMultiCode !== null && (gstMultiCode.length <= 1 || 
                    !checkGstMultiCodeValid(gstType, gstCode, gstMultiCode))
                )
           )
        {
            $("#div-inner-error-messages").append("Please select appropriate GST Multi Tax Code.<br />");
            pro = false;
        }
        
        if (product_type !== "configurable" && business_model === "marketplace" && cost_price > 0 && sell_price < cost_price)
        {
            $("#div-inner-error-messages").append("Sell price should be greater than cost price.<br />");
            pro = false;
        }
        else if (product_type === "configurable")
        {
            for (supplier_id in associated_products)
            {
                for (pid in associated_products[supplier_id])
                {
                    cost_price = parseInt(associated_products[supplier_id][pid]['suppliers'].cost);
                    business_model = suppliersList[supplier_id].model;
                    
                    var super_attr_price = parseInt(associated_products[supplier_id][pid].super_attribute_price);
                    var child_sell_price = sell_price + super_attr_price;
                    
                    if (pro !== false && business_model === "marketplace" && cost_price > 0 && child_sell_price < cost_price)
                    {
                        $("#div-inner-error-messages").append("Sell price should be greater than cost price.<br />");
                        pro = false;
                    }
                }
            }
        }
        
	//console.log(imgpos);

	if(!pro) {
		$("#div-error-messages").show();
	}
	//return false;
	return pro;

}

function is_valid_date($date) {
	var dt = $date.split('-');
	var m = dt[1];
	var d = dt[2];
	var y = dt[0];
	return m > 0 && m < 13 && y > 0 && y < 32768 && d > 0 && d <= (new Date(y, m, 0)).getDate();
}

function numcheck(event, isDecimal){

	if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
			// Allow: Ctrl+A
           (event.keyCode == 65 && event.ctrlKey === true) ||
            // Allow: home, end, left, right
           (event.keyCode >= 35 && event.keyCode <= 39) ||
           // Allow Decimal point if isDecimal is set to true
           (isDecimal == true && event.keyCode == 190)
       ) {
                // let it happen, don't do anything
                return;
    } else {
    	// Ensure that it is a number and stop the keypress
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
        	event.preventDefault();
        }
    }
}

$("#txt-price").on('change', function(){
	if(Object.size(suppliersList) > 0) {
		updateSupplierMargins();
	}

});

$("#txt-special_price").on('change', function() {
	if(Object.size(suppliersList) > 0) {
		/*if($.trim($("#rd-default_supplier").val()) != "") {
			if(Object.size(suppliersList[$("#rd-default_supplier").val()]) > 0) {
				console.log(suppliersList);
				suppliersList[$("#rd-default_supplier").val()].special_price = $(this).val();
				console.log(suppliersList);
			}
		}
		return false;*/
		updateSupplierMargins();
	}

});

function updateSupplierMargins() {
	var price = (parseInt($("#txt-special_price").val()) > 0) ? parseInt($("#txt-special_price").val()) : parseInt($("#txt-price").val());

	if(price > 0) {
	for(var i in suppliersList) {
		//if(suppliersList[i].seller == "1" || suppliersList[i].seller == "2") {// condition commented on 16 june 2014 by Neeraj singh on change from shohin
		var cost_percentage=0;
		var cost_margin = 0;
                //console.log(i);return false;
                var s = suppliersList[i];
                if(s.model=="marketplace") {
                var Pg = parseFloat(suppliersList[i].pg_fee);
		var Shipping = parseFloat(suppliersList[i].snh_fee);
		var Prd = parseFloat(suppliersList[i].cpt_fee);
		var af_right=(Pg+Shipping+Prd);

		if(product_type == 'configurable'){
				for(var j in associated_products[i]) {
					var assoc_price=price+parseFloat(associated_products[i][j].super_attribute_price);
					var assoc_cost=parseFloat(associated_products[i][j]['suppliers'].cost);
                                        var assoc_af=calculateAf(assoc_price,assoc_cost,af_right);

                    associated_products[i][j]['suppliers'].af_value=assoc_af;
					//console.log(associated_products[i][j]);

				}
			}else{
			//return false;
			var cost = parseFloat(suppliersList[i].cost);
			var af=calculateAf(price,cost,af_right);
			suppliersList[i].af_value = af;
			}
                       }else{
                        var cost = parseFloat(suppliersList[i].cost);
                       }
				//alert("af="+af);
				cost_margin = price - cost;
				cost_percentage = Math.round((cost_margin / price) * 100);
				suppliersList[i].cost_margin = cost_margin;
				suppliersList[i].cost_margin_perc = cost_percentage;
	}
		//}

	}
	//console.log(associated_products);return false;
}



var supplierMPT;
var prc = {};
var mpt_brand_id = '';

var merchantChange = function(){
	if($.trim(this.value) != "") {
                //alert(1212);
		if(product_type=='configurable') {
			$("#txt-cost").prop("disabled", true);
		} else {
			$("#txt-cost").prop("disabled", false);
		}
		$("#sel-upstream_contact").removeClass("required");
		$("#sel-upstream_contact").remove();
		$("#tr-upstream-contact").hide();

               if($.inArray(parseInt(this.value), invoicer_ids['supplierid']) > -1){
                        $("#tr-business-model").show();
			$("#tr-cost-tax-type").show();
			$("#sel-business_model").addClass("required");
			$("#sel-cost_tax_type").addClass("required");
			$("#sel-cost_tax_percentage").addClass("required");
			$("#sel-mpt_category").removeClass("required");
			$("#sel-mpt_category").remove();
			$("#tr-mpt-cost").hide();
			supplierMPT = '';
			$("#sel-business_model").focus();
               } else {
			$("#sel-business_model").val('');
			$("#tr-business-model").hide();
			$("#tr-cost-tax-type").hide();
			$("#sel-business_model").removeClass("required");
			$("#sel-cost_tax_type").removeClass("required");
			$("#sel-cost_tax_percentage").removeClass("required");
			$("#sel-upstream_contact").removeClass("required");
			$("#sel-upstream_contact").remove();
			$("#tr-upstream-contact").hide();
			
		}
		getPrc(this.value);


	} else {
		$("#sel-mpt_category").removeClass("required");
		$("#sel-mpt_category").remove();
		$("#tr-mpt-cost").hide();
		$("#tr-business-model").hide();
		$("#tr-cost-tax-type").hide();
		//$("#tr-cost-tax-percentage").hide();
		$("#sel-business_model").removeClass("required");
		$("#sel-cost_tax_type").removeClass("required");
		$("#sel-cost_tax_percentage").removeClass("required");
		$("#sel-upstream_contact").removeClass("required");
		$("#sel-prc_code option").remove();
		$("#sel-prc_code").removeClass("required");
		$('#sel-prc_code').trigger("liszt:updated");
		$("#sel-upstream_contact").remove();
		$("#tr-upstream-contact").hide();
	}
};

//$("#sel-merchant").on('change', merchantChange);

function getPrc(val) {
	//if(val != 1 && val != 2) {
		var aUrl = ROOT_URL + "/product/getMpts/" + val;
		if(supplier_in_edit == true && product_id >0) {
			aUrl += '?pid=' + product_id;
		}
		prc = {};
		$.ajax({
			url: aUrl,
			success: function(t) {
				var d = $.parseJSON(t);
				if(!empty(d.data)) {
					prc = d.data;
					if(supplier_in_edit==false) {
						$("#sel-prc_code").html(d.element);
						/*if(prc_code_option_id>0){
							$("#sel-prc_code").val(prc_code_option_id);
							prc[prc_code_option_id].af_value = prc_option_values.af_value;
							prc[prc_code_option_id].pg_fee = prc_option_values.pg_fee;
							prc[prc_code_option_id].snh_fee = prc_option_values.snh_fee;
							prc[prc_code_option_id].cpt_fee = prc_option_values.cpt_fee;
							prc[prc_code_option_id].pincodes = prc_option_values.pincodes;
						}*/
					} else {
						if(!empty(suppliersList[val])) {
							prc[suppliersList[val].prc_code].af_value = suppliersList[val].af_value;
							prc[suppliersList[val].prc_code].cpt_fee = suppliersList[val].cpt_fee;
							prc[suppliersList[val].prc_code].pg_fee = suppliersList[val].pg_fee;
							prc[suppliersList[val].prc_code].snh_fee = suppliersList[val].snh_fee;
							prc[suppliersList[val].prc_code].pincodes = suppliersList[val].serviceable_pincodes;
						}
						if(!empty(suppliersList[supplier_id_in_edit])) {
							prc[prc_code_option_id].pincodes = suppliersList[supplier_id_in_edit].serviceable_pincodes;
						}
						$("#sel-prc_code").trigger('change');
					}
					prc_code_option_id = 0;
				} else {
					prc = {};
					$("#sel-prc_code option").remove();
					var options = '<option value=\'\'>Please Select</option>';
					$("#sel-prc_code").html(options);
				}
				//console.log(prc);
				$('#sel-prc_code').trigger("liszt:updated");
			}
		});
	//}
}

var upstreamChange = function() {
	getPrc(this.value);
	//$('#sel_prc_code_chzn .chzn-drop .chzn-search input[type="text"]').focus();
	//$("#sel_prc_code_chzn").trigger('mousedown');
};

$(document).on('change', "#sel-upstream_contact", upstreamChange);

function hasPrcCode() {
	if(Object.size(prc) == 0) {
		return false;
	}
	return true;
}

$('#sel-prc_code').on('change', function(){
	//console.log($(this));
	//if(supplier_in_edit == false || $.trim($(this).val()) == '') {
		if(!hasPrcCode() && supplier_in_edit==true) {
			alert('No remittance code associated with the merchant.');
		} else {
			if($.trim($(this).val()) != '' && $.trim($(this).val()).length > 0) {
				if($('#txt-af_value').hasClass('error-border')) {
					$('#txt-af_value').removeClass('error-border');
				}

				var vals  = prc[$(this).val()];

				//if(empty(prc_af_val_obj.spinner( "value" ))) {
					//$("#txt-af_value").val(vals['af_value']);
					//prc_af_val_obj.spinner( "value", vals['af_value'] );
				//}
				//prc_af_val_obj.spinner( "value", vals['af_value'] );
				var cost=parseFloat($("#txt-cost").val());
				if(!isNaN(cost) && cost!=''){
					var price = (parseInt($("#txt-special_price").val()) > 0) ? parseInt($("#txt-special_price").val()) : parseInt($("#txt-price").val());

                if(supplier_id_in_edit!=='undefined' && supplier_id_in_edit!==0){
                if(suppliersList[supplier_id_in_edit].model=='marketplace'){
                	if(product_type!='configurable'){
                            var af_right=parseFloat(vals['cpt_fee'])+parseFloat(vals['snh_fee'])+parseFloat(vals['pg_fee']);
                var af_value=calculateAf(price,cost,af_right);
                                        $("#automatic_af_value").html(Number(Math.round(af_value+'e2')+'e-2'));
                                         $("#auto_af_value_set").val(af_value);
                                     }
                }else if(suppliersList[supplier_id_in_edit].af_value){
                $("#automatic_af_value").html(Number(Math.round(suppliersList[supplier_id_in_edit].af_value+'e2')+'e-2'));
           }
            }


				}
				$("#span-cpt_fee").html(vals['cpt_fee']);
				$("#span-snh_fee").html(vals['snh_fee']);
				//$("#txt-snh_fee").val(vals['snh_fee']);
				//$("#txt-pg_fee").val(vals['pg_fee']);
				$("#span-pg_fee").html(vals['pg_fee']);
				$('#txt-serviceable_pincodes').val(vals['pincodes']);
			} else {
				//$("#txt-af_value").val("0");
				$('#txt-serviceable_pincodes').val('');
				prc_af_val_obj.spinner( "value", '' );
				$("#span-cpt_fee").html("0");
				$("#span-snh_fee").html("0");
				//$("#txt-snh_fee").val('0');
				//$("#txt-pg_fee").val('0');
				$("#span-pg_fee").html("0");
			}

			if($.trim($('#sel-merchant').val()) == '1' || $.trim($('#sel-merchant').val()) == '2') {
				prc_af_val_obj.spinner('disable');
			} else {
				prc_af_val_obj.spinner('enable');
			}
			//prc = {};
		}
	//}
});

function calculateCost(percentage, price) {
	var mpt_cost=0;
	var mpt_cost_margin = 0;

	if(price > 0) {
		mpt_cost_margin = Math.round(((parseInt(percentage) / 100) * price));
		mpt_cost = price - mpt_cost_margin;
		$("#txt-cost").val(mpt_cost);
		$("#txt-cost_margin").val(mpt_cost_margin);
		$("#txt-cost_margin_perc").val(percentage);
	}
}

function calculateCostMargin(cost) {
	var cost_percentage=0;
	var cost_margin = 0;
       var price = (parseInt($("#txt-special_price").val()) > 0) ? parseInt($("#txt-special_price").val()) : parseInt($("#txt-price").val());
	if(price > 0) {
		cost_margin = price - cost;
		cost_percentage = Math.round((cost_margin / price) * 100);
		$("#txt-cost_margin").val(cost_margin);
		$("#txt-cost_margin_perc").val(cost_percentage);
	} else {
		$("#txt-cost_margin").val('0');
		$("#txt-cost_margin_perc").val('0');
	}
	if(!isNaN(cost) && cost!=''){


        if(supplier_id_in_edit!=='undefined' && supplier_id_in_edit!==0){

               //console.log(suppliersList);
                if(suppliersList[supplier_id_in_edit].model=='marketplace'){
                    var af_right=parseFloat($("#span-snh_fee").html())+parseFloat($("#span-pg_fee").html())+parseFloat($("#span-cpt_fee").html());
                    var af_value=calculateAf(price,cost,af_right);
                    suppliersList[supplier_id_in_edit].af_value=af_value;
                $("#automatic_af_value").html(Number(Math.round(af_value+'e2')+'e-2'));
		$("#auto_af_value_set").val(af_value);
           }else if(suppliersList[supplier_id_in_edit].af_value){
                $("#automatic_af_value").html(Number(Math.round(suppliersList[supplier_id_in_edit].af_value+'e2')+'e-2'));
           }
       }


	}

}


$("#txt-cost").on('change', function() {
	if(parseInt(this.value) > 0) {
		calculateCostMargin(parseInt(this.value));
	}
});

$("#txt-cost").on('blur', function() {
	if(parseInt(this.value) > 0) {
		calculateCostMargin(parseInt(this.value));
	}
});

$("#sel-business_model").on('change', function() {
	var business_model = this.value;
        
        if(business_model!='')
        {
            if(product_type=='configurable') 
            {
                $("#txt-cost").prop("disabled", true);
            } 
            else 
            {
                $("#txt-cost").prop("disabled", false);
            }
        }
	
        $("#sel-location").trigger('change');
        
	$.ajax({
		url: ROOT_URL + "/product/getODWH?id=" + business_model,
		success: function(t) {
			if(t!='') {
                            
                                $("#tr-upstream-contact").show();
				$("#td-upstream-contact").html(t);
				$("#sel-upstream_contact").focus();
				$("#sel-upstream_contact").addClass("required");
                                
                                if(business_model==2)
                                {
                                    $("#tr-cost-tax-type").show();
                                    $("#sel-cost_tax_type").addClass("required");
                                    $("#sel-cost_tax_percentage").addClass("required");
                                    $("#sel-mpt_category").removeClass("required");
                                    $("#sel-mpt_category").remove();
                                    $("#tr-mpt-cost").hide();
                                    supplierMPT = '';
                                }
                                else
                                {
                                    $("#tr-cost-tax-type").hide();
                                    $("#sel-cost_tax_type").removeClass("required");
                                    $("#sel-cost_tax_percentage").removeClass("required");
                                    $("#sel-mpt_category").addClass("required");
                                    $("#tr-mpt-cost").show();
                                }
			} else {
                                $("#sel-upstream_contact").remove();
				$("#td-upstream-contact").html("");
				$("#tr-upstream-contact").hide();
				$("#sel-mpt_category").removeClass("required");
                                $("#sel-mpt_category").remove();
                                $("#tr-mpt-cost").hide();
                                $("#tr-cost-tax-type").hide();
                                $("#sel-cost_tax_type").removeClass("required");
                                $("#sel-cost_tax_percentage").removeClass("required");
                                $("#sel-upstream_contact").removeClass("required");
                                $("#sel-prc_code option").remove();
                                $("#sel-prc_code").removeClass("required");
                                $('#sel-prc_code').trigger("liszt:updated");
                        }
		}
	});
});

$("#btn-add-supplier").on('click', function(){

	$("#table_cataloginventory").show();
	$("#btn-cancel-supplier").show();
	$("#btn-save-supplier").show();
	$("#btn-add-supplier").hide();
	$("#txt-qty").val("");
        $("#sel-upstream_contact").remove();
        $("#tr-upstream-contact").hide();
        $("#sel-merchant").remove();
        $("#tr-merchant").hide();
        $(".hsn_code").hide();
        $(".sac_code").hide();
	toggleSupplier();
	if(product_type=="simple") {
		$("#txt-qty").focus();
	} else {
		$("#sel-location").focus();
	}
	createSpinner(true);
});

function createSpinner(createDropdown){
	//if($.trim($('#sel-prc_code').val()) == '') {
	if(createDropdown == true) {
		$('#sel-prc_code').width('200');
		$('#sel-prc_code').chosen();
	}
	prc_af_val_obj = $( "#txt-af_value" ).spinner({
		step: 0.01,
		numberFormat: "n"
	});
}

function toggleSupplier() {
	var json = $.parseJSON(supplier_attributes);
	var product_type = $("#product_type").val();

	$("#sel-business_model").addClass("required");

	for(var i in json) {
		var ele = '';
		if(json[i].is_required == 1) {
			switch(json[i].frontend_input) {
				case "price":
				case "textarea":
				case "text":
				case "date":
					ele = 'txt-';
					ele += json[i].attribute_code;
					break;
				case "boolean":
				case "select":
					ele = 'sel-';
					ele += json[i].attribute_code;
					//tmp_supp[upstream_contact].json[i].attribute_code = $("#" + ele).val();
					break;
			}

			$("#" + ele).addClass("required");

		}
	}

	$("#sel-availablity").addClass("required");
	$("#txt-qty").addClass("required");

}
var prc_af_val_obj;
$("#btn-cancel-supplier").on('click', function(){
	$('#div-inner-error-supplier-message').empty();
	$('#div-supplier-error-message').hide();
	$("#btn-cancel-supplier").val("Cancel Supplier");
	save_supplier_grid = true;
	if(supplier_in_edit) {
		supplier_in_edit = false;
		supplier_id_in_edit = 0;
	}
	$("#sel-prc_code.chzn-done").removeAttr("style", "").removeClass("chzn-done").data("chosen", null).next().remove();
	$("#sel-prc_code").attr('disabled', false);
	$("#table_cataloginventory").hide();
	$("#btn-cancel-supplier").hide();
	$("#btn-save-supplier").hide();
	$("#btn-add-supplier").show();

	$("#sel-upstream_contact").prop("disabled", false);
	$("#sel-business_model").prop('disabled', false);
	$("#sel-merchant").prop("disabled", false);

	supplier_in_edit = false;
	supplier_id_in_edit = 0;
	clearSupplierTable();

});

$("#sel-internationalshipping").on('change', function() {
	if(this.value == "1") {
		$("#tr-international-shipping-cost").show();
		$("#sel-international_shipping_cost").addClass("required");
	} else {
		$("#sel-international_shipping_cost").removeClass("error-border required");
		$("#sel-international_shipping_cost").val('');
		$("#tr-international-shipping-cost").hide();
	}
});
var save_supplier_grid = true;
$("#btn-save-supplier").on('click', function(){
	if(confirm("Are you sure you want to add this supplier?")) {
		if($.trim($("#sel-upstream_contact").val()) == '') {
			alert("Please select supplier before Saving.");
			return false;
		}
		
                var business_model_val = $.trim($("#sel-business_model").val());
                if(business_model_val == '') {
			alert("Please select business model before Saving.");
			return false;
		}
                
                var upstream_contact = '';
		var business_model = '';
                upstream_contact = $("#sel-upstream_contact").val();
                if(business_model_val==1) {
                        business_model = 'marketplace';
                } else {
                        var sel_merchant = $.trim($("#sel-merchant").val());
                        if(sel_merchant == '') 
                        {
                            alert("Please select seller before Saving.");
                            return false;
                        }
                        
                        business_model = 'warehouse';
                }
                
                
		for(var i in suppliersList) {
			//if(upstream_contact == i && supplier_in_edit == false && $.trim(suppliersList[upstream_contact].sku) != '') {
			if(upstream_contact == i && supplier_in_edit == false) {
				alert("Selected Merchant is already added once");
				return false;
			}

		}
		var $val = false;
		$('#div-inner-error-supplier-message').empty();
		$('#div-supplier-error-message').hide();
		//save_supplier_grid = true;
              
		$val = validateSupplier(upstream_contact);
		if($val) {
			saveSupplierTable(upstream_contact);
			if(product_type=="configurable" && supplier_in_edit == false) {
				//associateChild(upstream_contact, business_model);
				$("#div-inner-supplier-message").empty();
				$("#div-inner-supplier-message").append("Please \"Save & Continue\" the Product to View & Add the Associated Products.");
				$("#div-supplier-message").show();
			}
			$("#btn-cancel-supplier").trigger('click');
		}
		return false;
	}
});

// Removed unique check for old_sku_id
/*$("#txt-old_sku_id").on('blur', function(){
	if($.trim(this.value).length > 0) {
		validateUniqueAttributes('old_sku_id', this.value);
	}
});*/

$("#txt-merchant_sku_id").on('blur', function(){
	if($.trim(this.value).length > 0) {
		validateUniqueAttributes('merchant_sku_id', this.value);
	}
});

$("#txt-ean").on('blur', function(){
	if($.trim(this.value).length > 0) {
		validateUniqueAttributes('ean', this.value);
	}
});

function validateUniqueAttributes(code, value) {
	var supp_id = 0;
	if($("#sel-upstream_contact").is(':visible')) {
		supp_id = $("#sel-upstream_contact").val();
	} else {
		supp_id = $("#sel-merchant").val();
	}

	if($.trim(supp_id) == '') {
		alert('Please select the merchant before you proceed.');
		return false;
	}

	$.ajax({
		url: ROOT_URL + "/product/validateAttributes?code=" + code + "&value=" + value + "&product_id=" + product_id + "&supplier_id=" + supp_id + "&edit=" + supplier_in_edit,
		beforeSend:function() {

		},
		success: function(t) {
			var res = parseInt(t);
			if(res == "1") {
				$("#txt-" + code).addClass("error-border");
				save_supplier_grid = false;
				//alert(value + " already exists for " + code);
			} else {
				save_supplier_grid = true;
			}
		}
	});
}

function checkGstMultiCodeValid(gstType, gstCode, gstMultiCode)
{
    var response = false;
    var $url    = ROOT_URL + "/product/checkGstTaxCode";
    var data = {};
    data["gstCode"] = gstCode;
    data["gstType"] = gstType;
    data["gstTaxCode"] = gstMultiCode;
    $.ajax({
        type: "POST",
        url: $url,
        async: false,
        data: data,
        success: function(r){
            if (r == 1)
            {
                response = true;
            }
            else
            {
                response = false;
            }
        },
        error: function(r) {
            alert("Something went wrong. Please try again.");
            response = false;
        }
    });
    return response;
}

function validateSupplier(upstream_contact) {
	var json = $.parseJSON(supplier_attributes);
	var product_type = $("#product_type").val();
	var pro = true;
	var message = '';
	var errorObj = [];
	var err = 0;
        //by nilesh.b checking if drop ship is yes then part payment can not be set to yes.
        if($("#sel-dropship").val() == '1' && $("#sel-part_payment").val() == '1' ){
                 pro = false;
		$("#sel-part_payment").addClass("error-border");
		message += "You can not make part payment yes for direct ship merchant.<br />";
		errorObj[err++] = "merchant";
        }
	if($("#sel-upstream_contact").val() == "") {
            
		pro = false;
		$("#sel-upstream_contact").addClass("error-border");
		message += "Please specify a supplier.<br />";
		errorObj[err++] = "merchant";

	} else if($.inArray(parseInt($("#sel-merchant").val()), invoicer_ids['supplierid']) > -1) {

		if($("#sel-business_model").val() == "") {
			$("#sel-business_model").addClass("error-border");
			pro = false;
			message += "Please provide business model. <br />";
			errorObj[err++] = "business_model";
		}
		if($("#sel-upstream_contact").val()=="") {
			$("#sel-upstream_contact").addClass("error-border");
			pro = false;
			message += "Please provide supplier for the business model.<br />";
			errorObj[err++] = "upstream_contact";
		}
		if($("#sel-cost_tax_type").val()=="") {
			$("#sel-cost_tax_type").addClass("error-border");
			pro = false;
			message += "Please provide cost tax type.<br />";
			errorObj[err++] = "cost_tax_type";
		}
		if($("#sel-cost_tax_percentage").val()=="") {
			$("#sel-cost_tax_percentage").addClass("error-border");
			pro = false;
			message += "Please provide cost tax percentage.<br />";
			errorObj[err++] = "cost_tax_percentage";
		}
	} else {
           
		/*if($("#sel-mpt_category").val()=="") {
			$("#sel-mpt_category").addClass("error-border");
			pro = false;
			message += "Please provide cost tax percentage. \n";
			errorObj[err++] = "mpt_category";
		}*/
	}
        
        if($("#sel-gst_type").val()=="") {
            $("#sel-gst_type").addClass("error-border");
            pro = false;
            message += "Please provide GST type.<br />";
            errorObj[err++] = "gst_type";
        }
        
        
        if($("#txt-hsn_code").is(":visible") && $("#txt-hsn_code").val()=="") {
            $("#txt-hsn_code").addClass("error-border");
            pro = false;
            message += "Please provide GST HSN code.<br />";
            errorObj[err++] = "hsn_code";
        }
        
        if($("#txt-sac_code").is(":visible") && $("#txt-sac_code").val()=="") {
            $("#txt-sac_code").addClass("error-border");
            pro = false;
            message += "Please provide GST SAC code.<br />";
            errorObj[err++] = "sac_code";
        }
        
        if ($("#txt-sac_code").is(":visible") && $("#txt-sac_code").val()!="") {
            $("#txt-hsn_code").val("");
            if ($("#txt-sac_code").hasClass("error-border") || $("#txt-sac_code").hasClass("error"))
            {
                pro = false;
                message += "Please provide valid GST SAC code.<br />";
                errorObj[err++] = "sac_code";
            }
        }
        
        if ($("#txt-hsn_code").is(":visible") && $("#txt-hsn_code").val()!="") {
            $("#txt-sac_code").val("");
            if ($("#txt-hsn_code").hasClass("error-border") || $("#txt-hsn_code").hasClass("error"))
            {
                pro = false;
                message += "Please provide valid GST HSN code.<br />";
                errorObj[err++] = "hsn_code";
            }
        }
        
        if ($("#txt-gst_multi_code").is(":visible"))
        {
            var gstMultiCode = $("#txt-gst_multi_code").val();
            
            if (gstMultiCode == "" || (typeof gstMultiCode.length !== "undefined" && gstMultiCode.length < 1))
            {
                pro = false;
                message += "Please provide valid GST Multi Tax code.<br />";
                errorObj[err++] = "gst_multi_code";
            }
            else
            {
                if ($("#txt-sac_code").is(":visible"))
                {
                    var gstCode = $("#txt-sac_code").val();
                }
                else if ($("#txt-hsn_code").is(":visible"))
                {
                    var gstCode = $("#txt-hsn_code").val();
                }

                var gstType = $("#sel-gst_type option:selected").text();
                if (gstCode.length === 8 && (gstType === "HSN" || gstType === "SAC") && !checkGstMultiCodeValid(gstType, gstCode, gstMultiCode))
                {
                    $('#txt-gst_multi_code').removeClass("success").addClass("error");
                    pro = false;
                    message += "Please provide valid GST Multi Tax code.<br />";
                    errorObj[err++] = "gst_multi_code";
                }
            }
        }
        
	//alert(json);
	for(var i in json) {
		var ele = '';
		if(json[i].is_required == 1) {
			switch(json[i].frontend_input) {
				case "price":
				case "textarea":
				case "text":
				case "date":
					ele = 'txt-';
					ele += json[i].attribute_code;
					break;
				case "boolean":
				case "select":
					ele = 'sel-';
					ele += json[i].attribute_code;
					//tmp_supp[upstream_contact].json[i].attribute_code = $("#" + ele).val();
					break;
			}
			var val = $.trim($("#" + ele).val());
                        
			if(empty(val)) {
				if((product_type == "configurable" || product_type == "simple") && json[i].attribute_code != "cost" && json[i].attribute_code != "mattress_bed_type" ) {
					message += json[i].frontend_label + " is mandatory attribute.<br />";
					pro = false;
					$("#" + ele).addClass("error-border");
					errorObj[err++] = json[i].attribute_code;
				}
			}
		}
	}


	if(($.trim($('#txt-cost').val()) == '' || $.trim($('#txt-cost').val()) == '0') && product_type=='simple') {
		pro = false;
		$("#txt-cost").addClass("error-border");
		message += "Cost is mandatory attribute for simple product.<br />";
		errorObj[err++] = "cost";
	}

	if($("#sel-availablity").val()=="") {
		pro = false;
		$("#sel-availablity").addClass("error-border");
		message += "Availability is mandatory attribute.<br />";
		errorObj[err++] = "availablity";
	}

	if(product_type == "simple") {
		if($.trim($("#txt-qty").val()) == '') {
			message += "Please provide qty.<br />";
			pro = false;
			$("#txt-qty").addClass("error-border");
			errorObj[err++] = "qty";
		}
	}

	if(product_type == "configurable") {
		//$("#txt-cost").removeClass("error-border");
	}

	if(save_supplier_grid == false) {
		message += "Merchant Sku Id, EAN, and Old Sku Id needs to be unique.<br />";
		pro = false;
	}

	if(!pro) {
		//$('.error-border').each( function() {
			$('#div-inner-error-supplier-message').html(message);
			$('#div-supplier-error-message').show();
			//console.log(errorObj);
			//console.log(message);
		//});
	}

	return pro;
}

$(document).on('change', '.error-border', function(){
	if($.trim($("#" + this.id).val()) != "") {
		$("#" + this.id).removeClass("error-border");
	}
});

function prepareSupplierTable() {

}

function saveSupplierTable(upstream_contact) {

	var json = $.parseJSON(supplier_attributes);
	var tmp_supp = '{"' + upstream_contact + '"';
	if (supplier_in_edit == false) {
		tmp_supp += ':{"sku":""';
	} else {
		tmp_supp += ':{"sku":"'+suppliersList[upstream_contact].sku+'"';
	}
	//console.log("af_input="+$("#auto_af_value_set").val()+"af in json"+suppliersList[upstream_contact].af_value);return false;

	for(var i in json) {
		var ele = '';
		var actual_seller = 0;
		switch(json[i].frontend_input) {
			case "price":
			case "textarea":
			case "text":
			case "date":
				if(json[i].attribute_code != 'sku') {
					ele = 'txt-';
					ele += json[i].attribute_code;
					tmp_supp += ',"' + json[i].attribute_code + '":"' + $("#" + ele).val() + '"';
				}
				//tmp_supp[upstream_contact].json[i].attribute_code = $("#" + ele).val();
				break;
			case "boolean":
			case "select":
                                ele = 'sel-';
				ele += json[i].attribute_code;
				if($("#" + ele).is(":visible")) {
					tmp_supp += ',"' + json[i].attribute_code + '":"' + $.trim($("#" + ele).val()) + '"';
				}
				//whtat(warehouse turn around time) attribute is present behind permissions 
				//if the user does not has permission the value already present will be passed else nothing will be happen
				if(skipped_attributes[json[i].attribute_code]==1 && typeof suppliersList[upstream_contact][json[i].attribute_code]!='undefined'){
					tmp_supp += ',"' + json[i].attribute_code + '":"' + suppliersList[upstream_contact][json[i].attribute_code] + '"';
				}
				//tmp_supp[upstream_contact].json[i].attribute_code = $("#" + ele).val();
				break;
		}
	}

	if($.inArray(parseInt($("#sel-merchant").val()), invoicer_ids['supplierid']) > -1) {
		tmp_supp += ',"seller":"'+$("#sel-merchant").val()+'"';
		tmp_supp += ',"upstream_contact":"' + $("#sel-upstream_contact").val() + '"';
		actual_seller = $("#sel-upstream_contact").val();
		var model = '';
		if($("#sel-business_model").val() == '1') {
			model = 'marketplace';
		} else if($("#sel-business_model").val() == '2') {
			model = 'warehouse';
		}
		tmp_supp += ',"model":"'+model+'"';
		//upstream_contact = $("#sel-upstream_contact").val();
	} else {
		tmp_supp += ',"seller":"' + $("#sel-upstream_contact").val() + '"';
		tmp_supp += ',"upstream_contact":"' + $("#sel-upstream_contact").val() + '"';
		tmp_supp += ',"model":"marketplace"';
		actual_seller = $("#sel-upstream_contact").val();
		//upstream_contact = $("#sel-merchant").val();
	}

	if($.trim($('#sel-prc_code').val()) !='') {
		tmp_supp += ',"prc_code":"' + $.trim($('#sel-prc_code').val()) + '"';
		tmp_supp += ',"af_value":"' + Number(Math.round($("#auto_af_value_set").val()+'e2')+'e-2') + '"';
		//tmp_supp += ',"pg_fee":"' + $.trim($('#txt-pg_fee').val()) + '"';
		tmp_supp += ',"pg_fee":"' + $('#span-pg_fee').text() + '"';
		//tmp_supp += ',"snh_fee":"' + $.trim($('#txt-snh_fee').val()) + '"';
		tmp_supp += ',"snh_fee":"' + $('#span-snh_fee').text() + '"';
		tmp_supp += ',"cpt_fee":"' + $('#span-cpt_fee').text() + '"';
		tmp_supp += ',"serviceable_pincodes":"' + $('#txt-serviceable_pincodes').val() + '"';
	}
	//if(isAuction == false) {
		tmp_supp += ',"qty":"' + $("#txt-qty").val() + '"';
		tmp_supp += ',"stock_status":"' + $("#sel-availablity").val() + '"';
	//} else {
		//tmp_supp += ',"qty":"1"';
		//tmp_supp += ',"stock_status":"1"';
	//}
	tmp_supp += '}}';
	tmp_supp = $.parseJSON(tmp_supp);
	//tmp_supp = $.parseJSON(tmp_supp);
	//suppliersList =  $.concat(suppliersList, $.parseJSON(tmp_supp));
	//var concated = suppliersList.merge($.parseJSON(tmp_supp));
	var concated = $.extend({}, suppliersList, tmp_supp);
	var x = printObj(concated);

	var body = '';
	body += '<tr id="tr-supplier-'+upstream_contact+'">';
	for(var supplier_id in tmp_supp) {
		body += '<td class="text">' + master_data.merchant[tmp_supp[supplier_id].seller] + '</td>';
		body += '<td class="text">' + master_data.merchant[tmp_supp[supplier_id].upstream_contact] + '</td>';
		body += '<td class="text">' + tmp_supp[supplier_id].merchant_sku_id + '</td>';
		body += '<td class="text">' + tmp_supp[supplier_id].ean + '</td>';
		body += '<td class="text">' +  master_data.availablity[tmp_supp[supplier_id].stock_status] + '</td>';
		body += '<td class="numeric">' + tmp_supp[supplier_id].qty + '</td>';
		if (supplier_in_edit == false) {
			body += '<td class="text">' + tmp_supp[supplier_id].sku + '</td>';
		} else {
			body += '<td class="text">' + suppliersList[upstream_contact].sku + '</td>';
		}
		body += '<td class="text">' + master_data.dropship[tmp_supp[supplier_id].dropship] + '</td>';

		if("mpt_category" in tmp_supp[supplier_id]) {
			body += '<td style="display:none;" class="text">' + master_data.mpt_category[tmp_supp[supplier_id].mpt_category] + '</td>';
		} else {
			body += '<td style="display:none;" class="text">&nbsp;</td>';
		}
		/*body += '<td class="numeric">' + tmp_supp[supplier_id].cost_margin_perc + '</td>';
		body += '<td class="numeric">' + tmp_supp[supplier_id].cost_margin + '</td>';*/
		if("prc_code" in tmp_supp[supplier_id]) {
			body += '<td class="text">' + master_data.prc_code[tmp_supp[supplier_id].prc_code] + '</td>';
			body += '<td class="numeric">' + tmp_supp[supplier_id].cpt_fee + '</td>';
			body += '<td class="numeric">' + tmp_supp[supplier_id].pg_fee + '</td>';
			body += '<td class="numeric">' + tmp_supp[supplier_id].snh_fee + '</td>';
			body += '<td class="numeric">' + tmp_supp[supplier_id].af_value + '</td>';
		} else {
			body += '<td class="text">&nbsp;</td>';
			body += '<td class="numeric">&nbsp;</td>';
			body += '<td class="numeric">&nbsp;</td>';
			body += '<td class="numeric">&nbsp;</td>';
			body += '<td class="numeric">&nbsp;</td>';
		}

		body += '<td class="numeric">' + tmp_supp[supplier_id].cost + '</td>';

		if("cost_tax_type" in tmp_supp[supplier_id]) {
			body += '<td class="text">' + master_data.cost_tax_type[tmp_supp[supplier_id].cost_tax_type] + '</td>';
		} else {
			body += '<td class="text">&nbsp;</td>';
		}

		if("cost_tax_percentage" in tmp_supp[supplier_id]) {
			body += '<td class="text">' + master_data.cost_tax_percentage[tmp_supp[supplier_id].cost_tax_percentage] + '</td>';
		} else {
			body += '<td class="text">&nbsp;</td>';
		}
		body += '<td class="numeric">' + master_data.time_to_warehouse[tmp_supp[supplier_id].time_to_warehouse] + '</td>';
		if(typeof master_data.warehouse_turn_around_time[tmp_supp[supplier_id].warehouse_turn_around_time] !=='undefined'){
			body += '<td class="numeric">' + master_data.warehouse_turn_around_time[tmp_supp[supplier_id].warehouse_turn_around_time] + '</td>';
		}else{
			body += '<td class="numeric"></td>';
		}
		body += '<td class="text">' + master_data.location[tmp_supp[supplier_id].location] + '</td>';

		if($.trim(tmp_supp[supplier_id].serviceable_pincodes) != "") {
			body += '<td class="text">Ships selected</td>';
		} else {
			body += '<td class="text">Ships all</td>';
		}

		if(Object.size(suppliersList) == 0 || upstream_contact == default_supplier) {
			body += '<td class="text"><input type="radio" checked="checked" class="default_suppliers" value="'+ tmp_supp[supplier_id].upstream_contact +'" name="product[default_supplier]" /></td>';
		} else {
			body += '<td class="text"><input type="radio" class="default_suppliers" value="'+ tmp_supp[supplier_id].upstream_contact +'" name="product[default_supplier]" /></td>';
		}

		body += '<td>';
			body += '<a href="javascript://" onclick="editInventorySupplier('+upstream_contact+', this);" class="button btn_no_text btn ui-state-default ui-corner-all tooltip"><span class="ui-icon ui-icon-wrench"></span></a>';
		body += '</td>';

	}

	body += '</tr>';

	if(supplier_in_edit == true) {
		//$("#tr-supplier-" + upstream_contact).remove();
		$("#tr-supplier-" + upstream_contact).replaceWith(body);
	} else {
		$("#tbody-supplier-list").append(body);
	}
	suppliersList = $.parseJSON(x);

}



function clearSupplierTable() {
	var json = $.parseJSON(supplier_attributes);

	for(var i in json) {
		var ele = '';
		switch(json[i].frontend_input) {
			case "price":
			case "textarea":
			case "text":
			case "date":
				ele = 'txt-';
				ele += json[i].attribute_code;
				$("#" + ele).val('');
				break;
			case "boolean":
			case "select":
				ele = 'sel-';
				ele += json[i].attribute_code;
				$("#" + ele).val("");
				break;
		}
		$("#" + ele).removeClass("required error-border");
	}
	$("#txt-qty").val('');
	$("#txt-qty").removeClass("required error-border");

	$("#sel-availablity").val("");
	$("#sel-availablity").removeClass("required error-border");

	$("#sel-merchant").val("");
	$("#sel-merchant").removeClass("required error-border");
        $("#tr-merchant").hide();

	$("#sel-business_model").val("");
	$("#sel-business_model").removeClass("required error-border");
	//$("#tr-business-model").hide();

	$("#sel-upstream_contact").val("");
	$("#sel-upstream_contact").removeClass("required error-border");
	$("#sel-upstream_contact").remove;
	$("#tr-upstream-contact").hide();

	$("#sel-cost_tax_type").val("");
	$("#sel-cost_tax_type").removeClass("required error-border");
	$("#tr-cost-tax-type").hide();

	$("#sel-cost_tax_percentage").val("");
	$("#sel-cost_tax_percentage").removeClass("required error-border");
	//$("#tr-cost-tax-percentage").hide();

	$("#sel-mpt_category").val("");
	$("#sel-mpt_category").removeClass("required error-border");
	$("#sel-mpt_category").remove();
	$("#tr-mpt-cost").hide();

	//$("#sel-prc_code").removeClass("required error-border");
	$('#sel-prc_code option').remove();
	$('#sel-prc_code').html('<option value=\'\'>Please Select</option>');
	//$('#sel-prc_code').val('').trigger("liszt:updated");
	prc_af_val_obj.spinner('destroy');

	$("#txt-af_value").val("");
	$("#automatic_af_value").html("0");
	$("#auto_af_value_set").val(0);

	$("#span-cpt_fee").html("0");
	$("#span-snh_fee").html("0");
	//$("#txt-snh_fee").val("");
	//$("#txt-pg_fee").val("");
	$("#span-pg_fee").html("0");


}

function showDomesticShipping()
{
	var enableDomestingShipping = $('domestingshipping').value;
	if (enableDomestingShipping == 1) {
		$('domesticshippingcost').up('tr').show();

	} else {
		$('domesticshippingcost').up('tr').hide();
	}
}

function showInternationalShipping() {

	var enableInternationalShipping = document.getElementById('internationalshipping').value;

	if (enableInternationalShipping == 1) {
		document.getElementById('international_shipping_cost').disabled=false;
		document.getElementById('showinternationalshippingcost').style.display='';

	} else {
		document.getElementById('international_shipping_cost').disabled=true;
		document.getElementById('showinternationalshippingcost').style.display='none';
	}
}

function isNumberKey(evt)
{
  var charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode != 46 && charCode > 31
	&& (charCode < 48 || charCode > 57))
	 return false;

  return true;
}

function validatesupplier1()
{
	alert('Save Disabled'); return false;
	var myCars=new Array("cost","inventory_qty","cost_tax_type","cost_tax_percentage","seller","business_model","location","time_to_warehouse","sproduct_sku_id","s_product_sku_name");
	var error= new Array();
	for(var i=0;i<myCars.length;i++)
	{
	  if((document.getElementById(myCars[i]).value !='') && document.getElementById('supexit').value=='')
	  {
		  error[i]=myCars[i];
	  }
	}
	//alert(error);
	if(error.length>0)
	{
		alert('Please select a supplier before using a supplier related attribute.'+error );
		return false;

   	}
}


function setwarehousevalue()
{
	document.getElementById('category_warehouse_value').value=$.trim($("#category_warehouse_old option:selected").text());
}



function disablesku()
{
	var enablesku = $('sku').value;
	$('sku').disabled = true;
}
	//window.onload=showwherehouse();
function showWarehouse()
{
	var supplierid= '';
	supplierid=document.getElementById('supplier').value;
	 $.ajax({
		 url: ROOT_URL + "/product/getSupplierByID?id=" + supplierid,
		 success: function(transport) {
			document.getElementById('note_supplier').innerHTML="<span>"+transport+"</span>";
		 }
	 });
}

function showsupplier()
{
	var seller= '';
	seller=document.getElementById('seller').value;
	$.ajax({
		 url: ROOT_URL + "/product/getSupplier?id=" + seller,
		 success: function(transport) {

			 $('#supplier').html('');
			  $('#business_model').html('');
			 if(seller=="1")
			 {
				 document.getElementById('sidentifier').value='P';
			  $("#supplier").prepend("<option value='' selected='selected'>Please Select</option>");
			  $("#business_model").append("<option value='' selected='selected'>Please Select</option>");
			  $("#business_model").append("<option value='OD'>On Demand</option>");
			  $("#business_model").append("<option value='WH'>Warehouse</option>");
			  document.getElementById('showonlyforwh').style.display='';
			  document.getElementById('showonlyforwh1').style.display='';

			 }else
			 {
				 document.getElementById('sidentifier').value='S';
				$("#business_model").append("<option value='PM' selected='selected'>Marketplace</option>");
				 document.getElementById('showonlyforwh').style.display='none';
			  document.getElementById('showonlyforwh1').style.display='none';
			 }
			 var s = document.getElementById('supplier');
			 var json = $.parseJSON(transport);

			 for(var i=0; i<json.length; i++) {
			 	var option = document.createElement('option');
				option.text = json[i].supplier_name;
				option.value = json[i].supplier_id;
				s.options[s.options.length] = option;
			}
		}
	});
}
/////////////////////////////////////////////
function showODWH()
{
	var business_model= '';
	business_model=document.getElementById('business_model').value;
	if(business_model=='WH')
	{
		document.getElementById('inventory_qty').value='0';
		document.getElementById('inventory_qty').disabled=true;
	}else
	{
		document.getElementById('inventory_qty').disabled=false;
	}
	 $('#supplier').html('');
	if(business_model!='')
	{
	$.ajax({
		 url: ROOT_URL + "/product/getODWH?id=" + business_model,
		 success: function(transport) {
			 $("#supplier").append("<option value='' selected='selected'>Please Select</option>");
			 var s = document.getElementById('supplier');
			 var json = $.parseJSON(transport);

			 for(var i=0; i<json.length; i++) {
			 	var option = document.createElement('option');
				option.text = json[i].supplier_name;
				option.value = json[i].supplier_id;
				s.options[s.options.length] = option;
			}
		}
	});
  }
}

function CheckRefID()
{
	var ref_id= '';
	ref_id=document.getElementById('ref_id').value;
	if(ref_id!='')
	{
	$.ajax({
		 url: ROOT_URL + "/product/getRefID?refid=" + ref_id,
		 success: function(transport) {
			 if(transport!='')
			 {
				 alert('Ref ID all ready exist');
				 document.getElementById('ref_id').value='';
				 return false;
			 }

		}
	});
  }
}



function checkradio()
{
	var check_val=document.getElementById('supplier_label_row_1_default').checked;
	//alert(check_val);
	if(check_val!= null)
	{
		alert(document.getElementById('supplier_label_row_1_default').checked);
	}


}

function showbuyerid()
{
	buyerid=document.getElementById('buyerid').value;
	document.getElementById('note_buyerid').innerHTML="<span>"+buyerid+"</span>";
}

function addtadditionallabel()
{
	var  itemCount=document.getElementById('max_additional_label_row').value;
	var trCount=itemCount;
	document.getElementById('max_additional_label_row').value=parseInt(itemCount,10)+parseInt(1,10);
	var templateText =
		'<tr class="option-row' + itemCount + '" id="additional_label_table' + itemCount + '" >'+
			'<td><input type="text" id="additional_label_row_' + itemCount + '_attribute_id" name="product[additional_label][' + itemCount + '][attribute_id]" class="input-text required-entry" value="" /></td>'+
			'<td class="nobr"><textarea class="input-text required-entry" name="product[additional_label][' + itemCount + '][value]" id="additional_label_row_' + itemCount + '_value" ></textarea></td>'+
			'<td><button title="Delete Tier" type="button" class="scalable delete icon-btn delete-product-option" id="additional_label_row_' + itemCount + '_delete_button" onclick="return deleteadditionallabel(' + itemCount + ');"><span>Delete</span></button></td>'+
		'</tr>';
	//jsignup_home("").append(templateText);

	$("#additional_label_table").closest( "tr" ).after(templateText);
	$('#additional_label_row_' + itemCount + '_delete_button').button();
}

function deleteadditionallabel(element)
{
	$("#additional_label_table"+element+"").closest("tr").remove(); // remove row
	 //alert(element.id)
}

function addtsupplierlabel()
{

	var  itemCount=document.getElementById('max_supplier_label_row').value;
	var trCount=itemCount;
	var seller=$("#seller option:selected").text();
	var seller_val=$("#seller").val();
	var inventory_stock_availability=$("#inventory_stock_availability option:selected").val();
	var supplier_input=$("#supplier").val();
	var location=$("#location option:selected").text();
	var supplier_text=$("#supplier option:selected").text();
	var location_hidden=$("#location").val();
	var time_to_warehouse=$("#time_to_warehouse option:selected").text();
	var time_to_warehouse_hidden=$("#time_to_warehouse").val();
	var inventory_qty=$("#inventory_qty").val();
	var cost=$("#cost").val();
	var sproduct_sku_id=$("#sproduct_sku_id").val();
	var s_product_sku_name=$("#s_product_sku_name").val();
	var sproduct_sku_id=$("#sproduct_sku_id").val();
	var cost_tax_type=$("#cost_tax_type option:selected").text();
	var cost_tax_type_hidden=$("#cost_tax_type").val();
	var cost_tax_percentage=$("#cost_tax_percentage option:selected").text();
	var cost_tax_percentage_hidden=$("#cost_tax_percentage").val();
	var widentifier=$("#business_model").val();
	var sidentifier=$("#sidentifier").val();
	var product_type=$("#product_type").val();

	if(product_type=='simple')
	{

		 var supplierdetail=new Array("supplier","inventory_stock_availability","location","time_to_warehouse","cost_tax_type","cost_tax_percentage","cost","sproduct_sku_id","inventory_qty","s_product_sku_name");

	}else
	{

		var supplierdetail=new Array("supplier","inventory_stock_availability","location","time_to_warehouse","cost_tax_type","cost_tax_percentage");
	}


		var error= new Array();
	for(var i=0;i<supplierdetail.length;i++)
	{
		//alert(supplierdetail[i]);
	  if(document.getElementById(supplierdetail[i]).value=='')
	  {
		  error[i]=supplierdetail[i];
	  }
	}
	//alert(error);
	if(error.length>0)
	{
		alert('Please select a supplier related attribute.'+error );
		return false;

   	}
	else
	{
		//alert('true');
		document.getElementById('max_supplier_label_row').value=parseInt(itemCount,10)+parseInt(1,10);
		$("#seller").val('');
		$("#supplier").val('');
		$("#location").val('');
		$("#time_to_warehouse").val('');
		$("#cost").val('');
		$("#sproduct_sku_id").val('');
		$("#s_product_sku_name").val('');
		$("#sproduct_sku_id").val('');
		$("#cost_tax_type").val('');
		$("#cost_tax_type").val('');
		$("#cost_tax_percentage").val('');
		$("#inventory_qty").val('');
		$("#inventory_stock_availability").val('');
		$("#business_model").val('');
		$("#sidentifier").val('');

		var templateText =
		'<tr class="option-row' + itemCount + '" id="supplier_label_table' + itemCount + '" >'+
			'<td><label>'+seller+'</label><input type="hidden" id="supplier_label_row_' + itemCount + '_seller" name="product[supplier_label][' + itemCount + '][seller]" value="'+seller_val+'" /><input type="hidden" id="supplier_label_row_' + itemCount + '_upstream_contact" name="product[supplier_label][' + itemCount + '][upstream_contact]" value="'+supplier_input+'" /><input type="hidden" id="supplier_label_row_' + itemCount + '_is_in_stock" name="product[supplier_label][' + itemCount + '][is_in_stock]" class="input-text required-entry" value="'+inventory_stock_availability+'" /><input type="hidden" id="supplier_label_row_' + itemCount + '_widentifier" name="product[supplier_label][' + itemCount + '][widentifier]"  value="'+widentifier+'" /><input type="hidden" id="supplier_label_row_' + itemCount + '_sidentifier" name="product[supplier_label][' + itemCount + '][sidentifier]"  value="'+sidentifier+'" /></td>'+
			'<td><label>'+supplier_text+'</label></td>'+
			'<td><label></label></td>'+
			'<td><label>'+s_product_sku_name+'</label><input type="hidden" id="supplier_label_row_' + itemCount + '_s_product_sku_name" name="product[supplier_label][' + itemCount + '][s_product_sku_name]" value="'+s_product_sku_name+'" /></td>'+
			 '<td><label>'+inventory_qty+'</label><input type="hidden" id="supplier_label_row_' + itemCount + '_inventory_qty" name="product[supplier_label][' + itemCount + '][inventory_qty]" value="'+inventory_qty+'" /></td>'+
			  '<td><label>'+sproduct_sku_id+'</label><input type="hidden" id="supplier_label_row_' + itemCount + '_sproduct_sku_id" name="product[supplier_label][' + itemCount + '][sproduct_sku_id]" class="input-text required-entry" value="'+sproduct_sku_id+'" /></td>'+
			   '<td><label>'+cost+'</label><input type="hidden" id="supplier_label_row_' + itemCount + '_cost" name="product[supplier_label][' + itemCount + '][cost]"  value="'+cost+'" /></td>'+
				'<td><label>'+cost_tax_type+'</label><input type="hidden" id="supplier_label_row_' + itemCount + '_cost_tax_type" name="product[supplier_label][' + itemCount + '][cost_tax_type]" value="'+cost_tax_type_hidden+'" /></td>'+
				 '<td><label>'+cost_tax_percentage+'</label><input type="hidden" id="supplier_label_row_' + itemCount + '_cost_tax_percentage" name="product[supplier_label][' + itemCount + '][cost_tax_percentage]" class="input-text required-entry" value="'+cost_tax_percentage_hidden+'" /></td>'+

				  '<td><label>'+time_to_warehouse+'</label><input type="hidden" id="supplier_label_row_' + itemCount + '_time_to_warehouse" name="product[supplier_label][' + itemCount + '][time_to_warehouse]"  value="'+time_to_warehouse_hidden+'" /></td>'+
				   '<td><label>'+location+'</label><input type="hidden" id="supplier_label_row_' + itemCount + '_location" name="product[supplier_label][' + itemCount + '][location]"  value="'+location_hidden+'" /></td>'+
					'<td><input type="radio" id="supplier_label_row_' + itemCount + '_default" name="product[supplier_label][default]" class="input-text required-entry" value="'+supplier_input+'" /></td>'+
					 '<td><input type="radio" id="supplier_label_row_' + itemCount + '_priority" name="product[supplier_label][priority]" class="input-text required-entry"  /></td>'+

			'<td><button title="Delete Tier" type="button" class="scalable delete icon-btn delete-product-option" id="supplier_label_row_' + itemCount + '_delete_button" onclick="return deletesupplierlabel(' + itemCount + ');"><span>Delete</span></button></td>'+

		'</tr>';

		$("#supplier_label_table").closest( "tr" ).after(templateText);
		if(itemCount==1)
		{
			document.getElementById('supplier_label_row_1_default').checked=true;
		}
		$('#supplier_label_row_' + itemCount + '_delete_button').button();
		document.getElementById('supexit').value=1;
	}


}

function deletesupplierlabel(element)
{
	if(document.getElementById('supplier_label_row_'+element+'_default').checked==true)
	{
		alert('this is default supplier,please change default supplier to remove this');
		return false;
	}else
	{
		$("#supplier_label_table"+element+"").closest("tr").remove(); // remove row
	}


}

function addtireprice(t, edit)
{
	var CustomerGroup = master_data.customer_group;
	var  itemCount=document.getElementById('max_tire_row').value;
	var trCount=itemCount;
	document.getElementById('max_tire_row').value=parseInt(itemCount,10)+parseInt(1,10);
	var selected = '';
	var qty = '';
	var price = '';

	if(edit==true) {
		qty = Math.round(editTierPrices[t].price_qty,0);
		price = Math.round(editTierPrices[t].price,0);
	}

	if("product/marketing" in perms) {
	var templateText =
        '<tr class=" option-row' + itemCount + '" id="tiers_table' + itemCount + '" >'+
            '<td><select id="tier_price_row_' + itemCount + '_cust_group" name="product[tier_price][' + itemCount + '][cust_group]" class="input-text tier-group" style=\'width:151px;\'>';
			for(var c in CustomerGroup) {
				if($.trim(CustomerGroup[c]) != "") {
					if(edit==true) {
						if(c == editTierPrices[t].cust_group) {
							selected = 'selected=\'selected\'';
						} else {
							selected = '';
						}
					}
					templateText += '<option ' + selected + ' value=\''+ c +'\'>'	+ CustomerGroup[c] + '</option>';
				}
			}

	templateText += '</select><\/td>'+
            '<td class="nobr"><input autocomplete="off" type="text" class="input-text tier-qty dummy_prices" name="product[tier_price][' + itemCount + '][price_qty]" value="' + qty + '" id="tier_price_row_' + itemCount + '_qty"  style="width:20px;text-align:right;" /> <small class="nobr">and above</small></td>'+
            '<td><input autocomplete="off" type="text" class=" input-text tier-price dummy_prices" name="product[tier_price][' + itemCount + '][price]" value="' + price + '" id="tier_price_row_' + itemCount + '_price"  style="width:80px;text-align:right;" /><\/td>'+
            '<td><button title="Delete Tier" type="button" class="scalable delete icon-btn delete-product-option" id="tier_price_row_' + itemCount + '_delete_button" onclick="return deleteTireItem(' + itemCount + ');"><span>Delete</span></button><\/td>'+
        '<\/tr>';
	} else {
		var templateText = '<tr class=" option-row' + itemCount + '" id="tiers_table' + itemCount + '" >';
		templateText += '<td>'+CustomerGroup[editTierPrices[t].cust_group]+'</td>';
		templateText += '<td>'+qty+' <small>and above</small></td>';
		templateText += '<td>'+price+'</td>';
		templateText += '<td>&nbsp;</td>';
		templateText += '</tr>';
	}
		//jsignup_home("").append(templateText);

		//$("#tiers_table").closest( "tr" ).append(templateText);
		$("#tier_price_container").append(templateText);
		$('#tier_price_row_' + itemCount + '_delete_button').button();
		$(".dummy_prices").on('keydown', function(e){
			numcheck(e, false);
		});
 }

 function deleteTireItem(element){
	$("#tiers_table"+element+"").closest("tr").remove(); // remove row
}

function enableinput(id)
{
	var id;
	$("#"+id).each(function(){
	if($(this).find("input[type='checkbox']").attr('checked')=='checked')
	{
  //$(this).siblings('td.ms-vb-icon').css("visibility","hidden");
  $(this).find('input,select').attr('disabled', false);
  $(this).find("input[type='checkbox']").attr('disabled',false)
  // $(this).find('').attr('disabled', true);
	}else
	{
		$(this).find('input,select').attr('disabled', true);
 		 $(this).find("input[type='checkbox']").attr('disabled',false)
	}
});
}

var printObj = typeof JSON != "undefined" ? JSON.stringify : function(obj) {
	var arr = [];
	$.each(obj, function(key, val) {
		var next = key + ": ";
		next += $.isPlainObject(val) ? printObj(val) : val;
		arr.push( next );
	});
	return "{ " + arr.join(", ") + " }";
};

function str_replace (search, replace, subject, count) {
	var i = 0,
	  j = 0,
	  temp = '',
	  repl = '',
	  sl = 0,
	  fl = 0,
	  f = [].concat(search),
	  r = [].concat(replace),
	  s = subject,
	  ra = Object.prototype.toString.call(r) === '[object Array]',
	  sa = Object.prototype.toString.call(s) === '[object Array]';
	  s = [].concat(s);

  	if (count) {
  		this.window[count] = 0;
  	}

  	for (i = 0, sl = s.length; i < sl; i++) {
  		if (s[i] === '') {
  			continue;
  		}
  		for (j = 0, fl = f.length; j < fl; j++) {
  			temp = s[i] + '';
  			repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
  			s[i] = (temp).split(f[j]).join(repl);
  			if (count && s[i] !== temp) {
  				this.window[count] += (temp.length - s[i].length) / f[j].length;
  			}
  		}
  	}
  	return sa ? s : s[0];
}

function empty (mixed_var) {
	var undef, key, i, len;
	//var emptyValues = [undef, null, false, 0, "", "0"];
	var emptyValues = [undef, null, false, ""];

	for (i = 0, len = emptyValues.length; i < len; i++) {
		if (mixed_var === emptyValues[i]) {
			return true;
	    }
	}

	if (typeof mixed_var === "object") {
		for (key in mixed_var) {
	      // TODO: should we check for own properties only?
	      //if (mixed_var.hasOwnProperty(key)) {
	      return false;
	      //}
	    }
	    return true;
	}

	return false;
}
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function selectSeller(supplier_id) {
        setTimeout(function(){
                if($("#sel-merchant option[value='"+supplier_id+"']").length > 0) 
                {
                    $("#sel-merchant").val(supplier_id);
                    $("#sel-merchant").trigger('change');
                    //$("#sel-merchant").prop("disabled", true);
                }
		else 
                {
                    selectSeller(supplier_id);
		}
	},1000);
}

function checkIfGstMultiCodeExists(gstType, gstCode)
{
    var response = false;
    var $url    = ROOT_URL + "/product/checkGstCode";
    var data = {};
    data["gstCode"] = gstCode;
    data["gstType"] = gstType;
    $.ajax({
        type: "POST",
        url: $url,
        async: false,
        data: data,
        success: function(r){
            if (r == 2)
            {
                response = true;
            }
            else
            {
                response = false;
            }
        },
        error: function(r) {
            alert("Something went wrong. Please try again.");
            response = false;
        }
    });
    return response;
}

var supplier_in_edit = false;
var supplier_id_in_edit = 0;
function editInventorySupplier(supplier_id, e) {
	if($("#btn-add-supplier").is(':visible') == false) {
		if(supplier_in_edit == true) {
			alert('Please save or cancel the opened supplier before editing another');
		} else {
			alert('Please save or delete the opened supplier before editing another');
		}
		return false;
	}
	$("#btn-add-supplier").hide();
	var createChosen = false;
	if(supplier_id in suppliersList) {

		var s = suppliersList[supplier_id];
                var sku = s.sku;
		supplier_id_in_edit = supplier_id;
		if("prc_code" in s) {
			$("#txt-af_value").val(s.af_value);
			//prc_af_val_obj.spinner( "value", s.af_value );
			if($.trim(sku)!='') {
				var options = '<option value=\'\'>Please Select</option><option value=\''+s.prc_code+'\'>'+master_data.prc_code[s.prc_code]+'</option>';
				$("#sel-prc_code").html(options);
			}
			$("#sel-prc_code").val(s.prc_code);
			//$("#sel-prc_code").attr('disabled', true);
		}
		if($.trim(sku) != "") {
			supplier_in_edit = true;
		}
                
                $("#sel-location").val(s.location);
                $("#sel-merchant").val(s.seller);
                
                if(s.model=="marketplace") {
                        $("#sel-business_model").val(1);
                } else {
                        $("#sel-business_model").val(2);
                }
                $("#sel-business_model").trigger('change');
                
                selectUpstream(supplier_id, sku);//generate upsteam contact
                
                
                $("#txt-qty").val(Math.round(s.qty));
		$("#sel-availablity").val(s.stock_status);
		$("#txt-cost").val(Math.round(s.cost));
		$("#sel-dropship").val(s.dropship);
		$("#sel-time_to_warehouse").val(s.time_to_warehouse);
		$("#sel-warehouse_turn_around_time").val(s.warehouse_turn_around_time);

		$("#txt-cost_margin").val(Math.round(s.cost_margin));
		$("#txt-cost_margin_perc").val(Math.round(s.cost_margin_perc));
		$("#txt-merchant_sku_id").val(s.merchant_sku_id);
		$("#txt-merchant_sku_name").val(s.merchant_sku_name);
		$("#txt-ean").val(s.ean);
                $("#sel-part_payment").val(s.part_payment);
                $("#txt-part_percentage").val(s.part_percentage);
                $("#txt-furniture_status").val(s.furniture_status);
                $("#txt-base_cost").val(s.base_cost);
		$("#txt-old_sku_id").val(s.old_sku_id);
		if("cost_tax_type" in s) {
			$("#sel-cost_tax_type").val(s.cost_tax_type);
			$("#sel-cost_tax_percentage").val(s.cost_tax_percentage);
		}
                
                /* loading gst attr values - start */
                $("#sel-rental_location").val(s.rental_location);
                $("#sel-gst_type").val(s.gst_type);
                $("#txt-sac_code").val(s.sac_code);
                $("#txt-hsn_code").val(s.hsn_code);
                var gstType = $("#sel-gst_type option:selected").text();
                if (gstType === "HSN")
                {
                    $(".hsn_code").show();
                    $(".sac_code").hide();
                }
                else if (gstType === "SAC")
                {
                    $(".sac_code").show();
                    $(".hsn_code").hide();
                }
                else
                {
                    $(".hsn_code").hide();
                    $(".sac_code").hide();
                    $("#txt-hsn_code").val("");
                    $("#txt-sac_code").val("");
                }
                $("#sel-is_gst_exempt").val(s.is_gst_exempt);
                
                var gstCode = (gstType == "HSN" || gstType == "hsn") ? s.hsn_code : s.sac_code;
                if (typeof s.gst_multi_code !== 'undefined' && s.gst_multi_code != 'undefined' && s.gst_multi_code != null && s.gst_multi_code.length > 1 && checkIfGstMultiCodeExists(gstType, gstCode))
                {
                    $("#txt-gst_multi_code").val(s.gst_multi_code).show();
                    $('.gst_multi_code').show();
                }
                else if (gstCode != "undefined" && gstType != "undefined" && checkIfGstMultiCodeExists(gstType, gstCode))
                {
                    $('.gst_multi_code').val('').show();
                }
                else
                {
                    $('.gst_multi_code').val('').hide();
                }
                /* loading gst attr values - end */
                
		//$("#sel-merchant").prop("disabled", true);
		//$("#sel-merchant").trigger('change');
                selectSeller(s.seller);
                
		if($.trim(sku) != "") {
			//$("#sel-business_model").prop('disabled', true);
			//$("#sel-merchant").prop("disabled", true);
			supplier_in_edit = true;
			$("#btn-cancel-supplier").val("Cancel Supplier");
		} else {
			supplier_in_edit = false;
			supplier_id_in_edit = 0;
			$("#btn-cancel-supplier").val("Delete Supplier");

		}

		if(product_type=="configurable") {
			$("#txt-cost").prop("disabled", true);
		}

		if($.trim(sku)=='') {
			delete suppliersList[supplier_id];
			$("#tr-supplier-" + supplier_id).remove();
			createChosen = true;
			$('#sel-prc_code').trigger("liszt:updated");
		}
		$("#table_cataloginventory").show();
		$("#btn-save-supplier").show();
		$("#btn-cancel-supplier").show();
                //Disable WHTAT if drop ship is Yes
                if(s.is_direct_ship=='1'){
                    $("#sel-warehouse_turn_around_time option").filter(function() {
                        return this.text == '0'; 
                    }).attr('selected', true);
                    $("#sel-warehouse_turn_around_time").attr('disabled','disabled');
                }
                
                $("#sel-business_model").prop("disabled", true);
                
		createSpinner(createChosen);


	}
}

function selectUpstream(supplier_id, sku) {
	setTimeout(function(){
		if($("#sel-upstream_contact").is(':visible')) {
			//alert(supplier_id+'---'+sku);
			$("#sel-upstream_contact").val(supplier_id);
			if($.trim(sku) != "") {
				$("#sel-upstream_contact").prop("disabled", true);
                                //$("#sel-upstream_contact").trigger('change');
			} else {
				$("#sel_prc_code_chzn").trigger('click');
			}
		} else {
			//alert('nope');
			selectUpstream(supplier_id, sku);
		}
	},1000);
}

/*window.onbeforeunload = function() {
	if(supplier_in_edit || children_in_edit) {
	    return "Data will be lost if you leave the page, are you sure?";
	}
};*/

$(window).on("beforeunload", function(){
	if(supplier_in_edit || children_in_edit) {
	    return "Data will be lost if you leave the page, are you sure?";
	}
});

function pr(d) {
	console.log(d);
}

var prc_code_option_id = 0;
var prc_option_values = {};
$(document).on('click', "#sel_prc_code_chzn",  function(){
	if(prc_code_option_id > 0){
		getPrc($("#sel-upstream_contact").val());
	}
});

function clearAuction() {
	auction_in_edit = 0;
	$('#txt-auction_from_date').val('');
	$('#txt-auction_to_date').val('');
	$('#txt-auction_start_price').val('');
	$('#txt-auction_reserved_price').val('');
	$("#div-inner-error-messages").empty();
	$("#div-error-messages").hide();
}

$('#tr-auction-actions').on('click','#btn-clear-auction', function(){
	clearAuction();
});


$('#tr-auction-actions').on('click','#btn-create-auction', function(){
	var pro = true;
	var err = '';
	$(".auction_required").removeClass('error-border');
	var date_from = getTime($('#txt-auction_from_date').val(),'none');
	var date_to   = getTime($('#txt-auction_to_date').val(),'none');

	$(".auction_required").each(function(i){
		if(empty($.trim($(this).val()))) {
			$(this).addClass('error-border');
			pro = false;
		}
	});

	if(pro == false) {
		err += 'Please fill all the mandatoy fields.<br />';
	}

	if(date_from >= date_to) {
		$('#txt-auction_to_date').addClass('error-border');
		pro = false;
		err += 'Start date cannot be greater than or equal to the End date. <br />';
	}

	if(Object.size(auction_data) > 0) {
		//console.log(Object.size(auction_data));
		for(var i in auction_data) {
			if(auction_data[i].auction_id != auction_in_edit) {
				//console.log(auction_data[i]);
				//if(!empty(auction_data[i].auction_id)) {
					prev_from = getTime(auction_data[i].start_date,'none');
					prev_to = getTime(auction_data[i].end_date,'none');
					if(
						(
							(date_from <= prev_from && date_from <= prev_to) &&
							(date_to >= prev_from && date_to >= prev_to)
						)
						||
						(
								(
									(date_from >= prev_from || date_from <= prev_from)
									&&
									(date_from <= prev_to && date_from >= prev_from)
								)
								||
								(
									(date_to >= prev_from || date_to <= prev_to)
									&&
									(date_to <= prev_to && date_to >= prev_from)
								)
							)
					 ) {
						$('#txt-auction_from_date').addClass('error-border');
						$('#txt-auction_to_date').addClass('error-border');
						pro = false;
						err += 'Start date or End date intersects existing auction. <br />';
					}
				//}
			}
		}
	}

	if(parseInt($.trim($('#txt-auction_start_price').val())) < 1) {
		pro = false;
		err += 'Please enter proper start price. <br />';
	}

	if(pro == true) {
		var auction_pointer = 0;
		if(auction_in_edit > 0) {
			for(var i in auction_data) {
				if(auction_data[i].auction_id == auction_in_edit) {
					auction_pointer = i;
				}
			}
		} else {
			auction_pointer = Object.size(auction_data);
			if(auction_pointer == 0) {
				auction_pointer = 1;
			}
			auction_data[auction_pointer] = {};
			auction_data[auction_pointer].auction_id = auction_pointer;
			auction_data[auction_pointer].dummy_auction_id = auction_pointer;
			auction_data[auction_pointer].auction_status = 1;
			auction_data[auction_pointer].make_live = 0;
			auction_data[auction_pointer].status_name = 'Auction Not Started';
		}

		// has date been changed
		if(auction_data[auction_pointer].hasOwnProperty('dummy_auction_id') == false) {
			if(auction_data[auction_pointer].hasOwnProperty('start_date')) {
				if(getTime($.trim($('#txt-auction_from_date').val()),'php') != auction_data[auction_pointer].start_date) {
					auction_data[auction_pointer].dates_changed = 1;
				}
			}
			if(auction_data[auction_pointer].hasOwnProperty('end_date')) {
				if(getTime($.trim($('#txt-auction_to_date').val()),'php') != auction_data[auction_pointer].end_date) {
					auction_data[auction_pointer].dates_changed = 1;
				}
			}
		}

		auction_data[auction_pointer].start_price = $.trim($('#txt-auction_start_price').val());
		auction_data[auction_pointer].reserved_price = $.trim($('#txt-auction_reserved_price').val());
		auction_data[auction_pointer].start_date = getTime($.trim($('#txt-auction_from_date').val()),'php');
		auction_data[auction_pointer].end_date = getTime($.trim($('#txt-auction_to_date').val()),'php');
		//console.log(auction_data);
		buildAuctionTable();
		clearAuction();
	} else {
		$("#div-inner-error-messages").empty();
		$("#div-inner-error-messages").html(err);
		$("#div-error-messages").show();
	}

});

function buildAuctionTable() {
	//var struct = '<tr id="tr-auctions-13"><td class="date">{{from_date}}</td><td class="date">{{to_date}}</td><td class="numeric">500</td><td class="numeric">800</td><td class="text">Auction Not Started</td><td class="text"><a id="auction-edit-13" href="javascript://" class="dummy-auction-edit">Edit</a></td></tr>';
	var table = '';
	for(var i in auction_data) {
		var tmp = auction_data[i];
		table += '<tr id="tr-auction-' + tmp.auction_id + '">';
			table += '<td class="date">' + getTime(tmp.start_date,'js') + '</td>';
			table += '<td class="date">' + getTime(tmp.end_date,'js')+'</td>';
			table += '<td class="numeric">' + Math.round(tmp.start_price) + '</td>';
			table += '<td class="numeric">' + Math.round(tmp.reserved_price) + '</td>';
			table += '<td class="text">' + tmp.status_name + '</td>';
			if(tmp.auction_status == 1) {
				table += '<td class="text"><a id="auction-edit-' + tmp.auction_id + '" href="javascript://" class="dummy-auction-edit">Edit</a></td>';
			} else {
				table += '<td class="text">-</td>';
			}
		table += '</tr>';
	}
	$('#tbody-auctions-list').html(table);
	delete table;
	delete tmp;
}

function getTime(date, format) {
	var afternoon = {"12":"12","01":"13","02":"14","03":"15","04":"16","05":"17","06":"18","07":"19","08":"20","09":"21","10":"22","11":"23"};
	var dd = mm = yy = hh = ii = ss = 0;
	var dArray = date.split(' ');
	//alert(dArray.length);
	if(dArray.length > 1) {
		var dt = dArray[0].split('-');
		var dh = dArray[1].split(':');
		var ap = dArray[2];

		dd=dt[2]; mm=dt[1] - 1; yy=dt[0]; hh=dh[0]; ii=dh[1]; ss="00";
		if(dArray.length == 3) {
			// 12 hour clock
			if(ap == "pm") {
				hh = afternoon[dh[0]];
			} else {
				if(hh == '12') {
					hh = '00';
				}
			}
		}
	}
	var date = new Date(yy,mm,dd,hh,ii);
	if(format=='none') {
		return date;
	} else if(format=='php') {
		return date.format('yyyy-mm-dd HH:MM:ss');
	} else if(format == 'js') {
		return date.format('yyyy-mm-dd hh:MM:ss tt');
	}
}

var auction_in_edit = 0;
$('#tbody-auctions-list').on('click','.dummy-auction-edit', function() {
	if(Object.size(auction_data) > 0) {
		var e = this.id.split('-');
		var id = e[2];
		for(var i in auction_data) {
			if(auction_data[i].auction_id == id) {
				if(auction_data[i].auction_status == 1) {
					auction_in_edit = id;
					var dd = mm = yy = hh = ii = ss = 0;
					var dArray = auction_data[i].start_date.split(' ');
					var dt = dArray[0].split('-');
					var dh = dArray[1].split(':');

					dd=dt[2];
					mm=dt[1] - 1;
					yy=dt[0];
					hh=dh[0];
					ii=dh[1];
					ss=dh[2];
					var dt_from = new Date(yy,mm,dd,hh,ii);
					//$('#txt-auction_from_date').val(dt_from.toLocaleFormat('%F %H:%M:%S %p').toLowerCase());
					if($.trim(auction_data[i].start_date) != '0000-00-00 00:00:00') {
						$('#txt-auction_from_date').datetimepicker('setDate', dt_from);
					}

					dd = mm = yy = hh = ii = ss = 0;
					dArray = auction_data[i].end_date.split(' ');
					dt = dArray[0].split('-');
					dh = dArray[1].split(':');

					dd=dt[2];
					mm=dt[1] - 1;
					yy=dt[0];
					hh=dh[0];
					ii=dh[1];
					ss=dh[2];
					var dt_to = new Date(yy,mm,dd,hh,ii,ss);
					//$('#txt-auction_to_date').val(dt_to.toLocaleFormat('%F %H:%M:%S %p').toLowerCase());
					if($.trim(auction_data[i].end_date) != '0000-00-00 00:00:00') {
						$('#txt-auction_to_date').datetimepicker('setDate', dt_to);
					}

					$('#txt-auction_start_price').val(Math.round(auction_data[i].start_price));
					$('#txt-auction_reserved_price').val(Math.round(auction_data[i].reserved_price));
				} else {
					alert('Auction data cannot be edited');
				}
				return false;
			}
		}
	} else {
		alert('No Auction to Edit');
	}
});


var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};
/*validations for wardrobe*/
$("body").on('keydown', '.decimal-check',function(e){
	numcheck(e, true);
});

$("body").on('keydown','.number-check', function(e){
	numcheck(e, false);
});
//get new set of collections when brand is changed
$('#sel-brandsname').on('change',function(){
	var brand_id = $('#sel-brandsname').val();
	var option = $('<option></option>').attr("value", "").text("Please select");
	$('#sel-collections').empty().append(option);
	if(brand_id!=''){
		$.ajax({
	        url: ROOT_URL + "/product/getCollectionsByBrandId",
	        type: "POST",
	        data: {'brand_id':brand_id},
	        success: function(response){
	        	var result = $.parseJSON(response);
	        	if(result.message =='success'){
	        		options = result.data;
	        		if(options.length>0){
	        			$.each(options, function(key,val) {
							$('#sel-collections').append($("<option></option>").attr("value", val.option_id).text(val.value));
						});
	        		}
	        	}else{
	        		alert(result.message);
	        	}
	        }
		});
	}
});
$("#sel-location").on('change', function() {
	var ass_wh = $.trim(this.value);
        var business_model = $.trim($("#sel-business_model").val());
        
        if(business_model==2)
        {
            if(ass_wh!='')
            {
                $.ajax({
                        url: ROOT_URL + "/product/getTAlist?whid=" + ass_wh,
                        success: function(t) {
                                if(t!='') {
                                        $("#tr-merchant").show();
                                        $("#td-merchant").html(t);
                                        $("#sel-merchant").focus();
                                        //$("#sel-merchant").addClass("required");
                                } else {
                                        $("#tr-merchant").hide();
                                        //$("#sel-merchant").removeClass("required");
                                        $("#sel-merchant").val("");
                                }
                        }
                });
            }
            else
            {
                $("#tr-merchant").hide();
                $("#td-merchant").html("");
            }
        }
        else
        {
            //if marketplace is selected or nothing is selected
            $("#tr-merchant").hide();
            $("#td-merchant").html("");
        }
        
});

function checkGstCode(gstType, gstCode)
{
    if ((gstType.toLowerCase() !== 'hsn' && gstType.toLowerCase() !== 'sac') || (typeof gstCode === 'undefined' || gstCode === null || gstCode.length !== 8))
    {
        return false;
    }
    var response = false;
    var $url    = ROOT_URL + "/product/checkGstCode";
    var data = {};
    data["gstCode"] = gstCode;
    data["gstType"] = gstType;
    $.ajax({
        type: "POST",
        url: $url,
        async: false,
        data: data,
        success: function(r){
            if (r == 1 || r == 2)
            {
                response = true;
            }
            else
            {
                alert("Please enter a valid GST - " + gstType + " code");
                response = false;
            }
        },
        error: function(r) {
            alert("Something went wrong. Please enter GST code again.");
            response = false;
        }
    });
    return response;
}


$(document).ready(function(){
    $("body").on('keyup', "#txt-hsn_code,#txt-sac_code", function(){
        if ($("#txt-sac_code").is(":visible"))
        {
            var gstCode = $("#txt-sac_code").val();
        }
        else if ($("#txt-hsn_code").is(":visible"))
        {
            var gstCode = $("#txt-hsn_code").val();
        }
        
        var gstType = $("#sel-gst_type option:selected").text();
        if (gstCode.length === 8 && (gstType === "HSN" || gstType === "SAC"))
        {
            var $url    = ROOT_URL + "/product/checkGstCode";
            var data = {};
            data["gstCode"] = gstCode;
            data["gstType"] = gstType;
            $.ajax({
                    type: "POST",
                    url: $url,
                    data: data,
                    beforeSend: function() {
                        $("#div-inner-error-messages").empty();
                        $("#div-error-messages").hide();
                        $("#div-success-messages").empty();
                        $("#div-success-messages").hide();
                    },
                    success: function(r){
                        if (r == 1 || r == 2)
                        {
                            if ($("#txt-hsn_code").is(":visible"))
                            {
                                $('#txt-hsn_code').removeClass("error").removeClass("error-border").addClass("success");
                            }
                            else
                            {
                                $('#txt-sac_code').removeClass("error").removeClass("error-border").addClass("success");
                            }
                            if (r == 2)
                            {
                                $('#txt-gst_multi_code').val('');
                                $('.gst_multi_code').show();
                            }
                        }
                        else
                        {
                            $('#txt-hsn_code').removeClass("success").addClass("error").val("");
                            $('#txt-sac_code').removeClass("success").addClass("error").val("");
                            alert("Please enter a valid GST - " + gstType + " code");
                        }
                    },
                    error: function(r) {
                        alert("Something went wrong. Please enter GST code again.");
                    }
            });
        }
        else
        {
            $('#txt-gst_multi_code').val("");
            $('.gst_multi_code').hide();
            if ($("#txt-hsn_code").is(":visible"))
            {
                $('#txt-hsn_code').removeClass("success").addClass("error");
            }
            else
            {
                $('#txt-sac_code').removeClass("success").addClass("error");
            }
        }
    });
    
    function checkGstMultiCode(){
        var gstCode = "";
        if ($("#txt-sac_code").is(":visible"))
        {
            gstCode = $("#txt-sac_code").val();
        }
        else if ($("#txt-hsn_code").is(":visible"))
        {
            gstCode = $("#txt-hsn_code").val();
        }
        
        var gstMultiCode = $("#txt-gst_multi_code").val();
        
        var gstType = $("#sel-gst_type option:selected").text();
        if (gstCode.length === 8 && (gstType === "HSN" || gstType === "SAC"))
        {
            if (gstMultiCode.length > 0)
            {
                var $url    = ROOT_URL + "/product/checkGstTaxCode";
                var data = {};
                data["gstTaxCode"]  = gstMultiCode;
                data["gstType"]     = gstType;
                data["gstCode"]     = gstCode;
                $.ajax({
                        type: "POST",
                        url: $url,
                        data: data,
                        beforeSend: function() {
                            $("#div-inner-error-messages").empty();
                            $("#div-error-messages").hide();
                            $("#div-success-messages").empty();
                            $("#div-success-messages").hide();
                        },
                        success: function(r){
                            if (r == 1)
                            {
                                $('#txt-gst_multi_code').removeClass("error").removeClass("error-border").addClass("success");
                            }
                            else
                            {
                                $('#txt-gst_multi_code').removeClass("success").addClass("error");
                            }
                        },
                        error: function(r) {
                            alert("Something went wrong. Please enter GST code again.");
                        }
                });
            }
        }
        else
        {
            if ($("#txt-hsn_code").is(":visible"))
            {
                $('#txt-hsn_code').removeClass("success").addClass("error");
            }
            else
            {
                $('#txt-sac_code').removeClass("success").addClass("error");
            }
        }
    }
    
    var gst_multi_code_typing_interval = 500; // 3s
    var gst_multi_code_typing_timer;
    $("body").on('keyup', "#txt-gst_multi_code", function(){
        clearTimeout(gst_multi_code_typing_timer);
        gst_multi_code_typing_timer = setTimeout(checkGstMultiCode, gst_multi_code_typing_interval);
    });
    $("body").on('keydown', "#txt-gst_multi_code", function(){
        clearTimeout(gst_multi_code_typing_timer);
    });

    $("#sel-gst_type").on('change', function() {
        var gstType = $("#sel-gst_type option:selected").text();
        if (gstType === "HSN")
        {
            $('.sac_code').hide();
            $('#txt-hsn_code').removeClass("success");
            $('#txt-sac_code').removeClass("success").removeClass("error").removeClass("error-border");
            $('.hsn_code').show();
        }
        else if (gstType === "SAC")
        {
            $('.hsn_code').hide();
            $('#txt-sac_code').removeClass("success").val("");
            $('#txt-hsn_code').removeClass("success").removeClass("error").removeClass("error-border");
            $('.sac_code').show();
        }
        else
        {
            $('.hsn_code').hide();
            $('.sac_code').hide();
        }
    });

});