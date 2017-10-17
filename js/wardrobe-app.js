// Miscellaneous Javascript Calls start
var wardrobe_literal = {
	curUrlForBack: '',
    defaultWardrobeHtmlData: {},
    globalCount: 2,
    finalObj: {},
    wardrobeData: {},
    selected_door_style: '',
    selected_frame_layout: '',
    selected_open_layout: '',
    selected_loft_height: '',
    currentMaterialId: '',
    contentScaleWidth: '',
    contentWidthDiff: '',
    wardrobeCenterPos: '',
    wallColIndex: 0,
    dim_flag: 0,
    mer_flag: 0,
    selectedDoorStyleSku: '',
    selectedDoorColorSku: '',
    selectedFrameStyleSku: '',
    selectedFrameColorSku: '',
	lastDoorStyleSku: '',
	lastDoorColorSku: '',
    deletePosition: '',
    prevDoorStyle: '',
    prevDoorColor: '',
    prevFrameStyle: '',
    prevFrameColor: '',
    new_default_data: {},
	changedLoftDoorColorSku: '',
    materialFrameIdenticalFlag: false,
    wardrobeSepPrice: {},
    loftSepPrice: {},
    wardrobePrice: 0,
	mirrorPrice: 0,
	editProductId: '',
	old_json_tmp: '',
    small_loft_height:18,
    enableTracking: true,
    scrollDefaults: {cursorcolor: "#f44336", cursorwidth: "10px", cursorborderradius: "0",autohidemode:false},
    scrollDefaultsHide: {cursorcolor: "#f44336", cursorwidth: "10px", cursorborderradius: "0",autohidemode:"leave"},
    addProduct: function (data, type, extra, position) {
        var retObj = {};
        if (position == 1) {
            retObj = wardrobe_literal.arrangeProductForFirstAdd(data.default_data[type], type, position);
        }
		else {
			retObj = wardrobe_literal.arrangeProductForAdd(data, type, position);
		}
        return retObj;

    },
    arrangeProductForFirstAdd: function (data, type, position) {
        var retData = {};
        //deep copy (Just Google)
        var temp_data = $.extend(true, {}, data);
        var newData = {};
        var frameData = {};
        var doorData = {};
        //For door
        if (type != 'open_shelves') {
            doorData = {"pattern": temp_data.door.custom_options.def_opts, "product_id": temp_data.door.product_details.entity_id};
			wardrobe_literal.lastDoorStyleSku = temp_data.door.custom_options.def_opts.sku;
			wardrobe_literal.lastDoorColorSku = temp_data.door.custom_options.def_opts.def_color.sku;
			
        }
        //For Frames 
        frameData = {"pattern": temp_data.frames.custom_options.def_opts, "product_id": temp_data.frames.product_details.entity_id};

		if((type == 'single_door' || type == 'double_door') && wardrobe_literal.materialFrameIdenticalFlag) {
			frameData.pattern.custom_options_child = temp_data.door.custom_options.def_opts.custom_options_child;
		}
		
        if(type == 'single_door') {
			retData[type] = {"frames": frameData, "door": doorData, "handle_position":"left"};
		}
		else {
			retData[type] = {"frames": frameData, "door": doorData};
		}
        
        return retData;
    },
    arrangeProductForAdd: function (data, type, position) {
		var retData = {};
        //deep copy (Just Google)
        var def_data = $.extend(true, {}, data.default_data[type]);
        var all_data = $.extend(true, {}, data.all_data[type]);
        var newData = {};
        var frameData = {};
        var doorData = {};
        
		var lastDoorStyleSku = wardrobe_literal.lastDoorStyleSku;
		var lastDoorColorSku = wardrobe_literal.lastDoorColorSku;
		var foundMatch = false;
		
		frameData = {"pattern": def_data.frames.custom_options.def_opts, "product_id": def_data.frames.product_details.entity_id};
		
        if (type != 'open_shelves') {
			//For door
			
			var allDoorData = all_data.door.custom_options;
			doorData = {"pattern": def_data.door.custom_options.def_opts, "product_id": def_data.door.product_details.entity_id};
            if(lastDoorStyleSku != '') {
				for(var i in allDoorData) {
					if(allDoorData[i].sku == lastDoorStyleSku) {
						var allCurDoorColorData = allDoorData[i].custom_options_child;
						for(var j in allCurDoorColorData) {
							if(allCurDoorColorData[j].sku == lastDoorColorSku) {
								doorData.pattern = allDoorData[i];
								doorData.pattern.custom_options_child = allCurDoorColorData[j];
								
								if(typeof doorData.pattern.colors_data) {
									delete doorData.pattern.colors_data;
								}
								if(typeof doorData.pattern.custom_options_child_default) {
									delete doorData.pattern.custom_options_child_default;
								}
								if(typeof doorData.pattern.custom_options_child_default) {
									delete doorData.pattern.custom_options_child_default;
								}
								if(typeof doorData.pattern.def_color) {
									delete doorData.pattern.def_color;
								}
								foundMatch = true;
								break;
							}
						}
						break;
					}
				}
			}
			
			if(!foundMatch) {
				wardrobe_literal.lastDoorStyleSku = doorData.pattern.sku;
				wardrobe_literal.lastDoorColorSku = doorData.pattern.custom_options_child.sku;
				foundMatch = false;
				var curOptId = doorData.pattern.option_id;
				if(typeof allDoorData[curOptId].custom_options_child_sku[lastDoorColorSku] != 'undefined') {
					doorData.pattern.custom_options_child = allDoorData[curOptId].custom_options_child[allDoorData[curOptId].custom_options_child_sku[lastDoorColorSku]];
					wardrobe_literal.lastDoorColorSku = doorData.pattern.custom_options_child.sku;
				}
			}

			if((type == 'single_door' || type == 'double_door') && wardrobe_literal.materialFrameIdenticalFlag) {
				frameData.pattern.custom_options_child = doorData.pattern.custom_options_child;
			}
			
			if(type == 'single_door') {
				retData[type] = {"frames": frameData, "door": doorData, "handle_position":"left"};
			}
			else {
				retData[type] = {"frames": frameData, "door": doorData};
			}
        }
		else {
			var allFrameData = all_data.frames.custom_options;
			var curOptId = frameData.pattern.option_id;
			
			if(typeof allFrameData[curOptId].custom_options_child_sku[lastDoorColorSku] != 'undefined') {
				frameData.pattern.custom_options_child = allFrameData[curOptId].custom_options_child[allFrameData[curOptId].custom_options_child_sku[lastDoorColorSku]];
			}
			wardrobe_literal.lastDoorColorSku = frameData.pattern.custom_options_child.sku;
			retData[type] = {"frames": frameData, "door": doorData};
		}
		
        return retData;
	},
	addWardrobeToConfig: function (wardrobeType) {
            
		var tempType = '';
        switch (wardrobeType) {
            case 'double_defualt_wardrobe':
                tempType = 'double_door';
                break;
            case 'single_defualt_wardrobe':
                tempType = 'single_door';
                break;
            case 'open_defualt_wardrobe':
                tempType = 'open_shelves';
                break;
        }
        
        var materialText = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]['customOptionAttributes'][wardrobe_literal.currentMaterialId].frontend_lable;
        wardrobe_literal.addEventTracker('Click', materialText, 'event Click');
        wardrobe_literal.addEventTracker('Add Section|wardrobe|'+tempType, materialText, 'event Add Section|wardrobe|'+tempType);
        
        //deep copy (Just Google)
        var tmp = $.extend(true, {}, wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]);
		var curPos = wardrobe_literal.globalCount;
        wardrobe_literal.finalObj[wardrobe_literal.globalCount] = wardrobe_literal.addProduct(tmp, tempType, 'default', wardrobe_literal.globalCount);
		
		//Html Append
		var tempHtml = $('#' + wardrobeType).html().trim();
		$('#drawRough').html(tempHtml);
		switch (tempType) {
			case 'single_door': 
				/* wardrobe_literal.lastDoorStyleSku
				wardrobe_literal.lastDoorColorSku */
				var tmpDoorColor = 'background-image: url(\'' + root_url + '/' + wardrobe_image_dir + wardrobe_literal.lastDoorColorSku + '.jpg?v=0.'+wardrobeImageVersion+'\')';
				var tmpDoorStyle = root_url + '/' + wardrobe_image_dir + wardrobe_literal.lastDoorStyleSku + '.png?v=0.'+    wardrobeImageVersion;
				$('#drawRough').find('.door-skeleton-container').attr('style',tmpDoorColor);
				$('#drawRough').find('.door-skeleton-container').attr('data-door_color_sku',wardrobe_literal.lastDoorColorSku);
				$('#drawRough').find('.door-skeleton-container').attr('data-door_sku',wardrobe_literal.lastDoorStyleSku);
				$('#drawRough').find('.door-shutter-container-right-d').attr('src',tmpDoorStyle);
				$('#drawRough').find('.door-shutter-container-right-d').attr('data-image',tmpDoorStyle);
				
				if(wardrobe_literal.materialFrameIdenticalFlag) {
					$('#drawRough').find('.wardrobe-skeleton-container').attr('style',tmpDoorColor);
					$('#drawRough').find('.wardrobe-skeleton-container').attr('data-frame_color_sku',wardrobe_literal.lastDoorColorSku);
				}
				break;
			case 'double_door': 
				var tmpDoorColor = 'background-image: url(\'' + root_url + '/' + wardrobe_image_dir + wardrobe_literal.lastDoorColorSku + '.jpg?v=0.'+wardrobeImageVersion+'\')';
				var tmpDoorStyle = root_url + '/' + wardrobe_image_dir + wardrobe_literal.lastDoorStyleSku + '.png?v=0.'+wardrobeImageVersion+'';
				$('#drawRough').find('.door-skeleton-container').attr('style',tmpDoorColor);
				$('#drawRough').find('.door-skeleton-container').attr('data-door_color_sku',wardrobe_literal.lastDoorColorSku);
				$('#drawRough').find('.door-skeleton-container').attr('data-door_sku',wardrobe_literal.lastDoorStyleSku);
				$('#drawRough').find('.door-shutter-container-right-d').attr('src',tmpDoorStyle);
				$('#drawRough').find('.door-shutter-container-right-d').attr('data-image',tmpDoorStyle);
				$('#drawRough').find('.door-shutter-container-left-d').attr('src',tmpDoorStyle);
				$('#drawRough').find('.door-shutter-container-left-d').attr('data-image',tmpDoorStyle);
				if(wardrobe_literal.materialFrameIdenticalFlag) {
					$('#drawRough').find('.wardrobe-skeleton-container').attr('style',tmpDoorColor);
					$('#drawRough').find('.wardrobe-skeleton-container').attr('data-frame_color_sku',wardrobe_literal.lastDoorColorSku);
				}
				break;
			case 'open_shelves': 
				var tmpFrameColorSku = wardrobe_literal.finalObj[wardrobe_literal.globalCount].open_shelves.frames.pattern.custom_options_child.sku;
				var tmpFrameColorStyle = 'background-image: url(\'' + root_url + '/' + wardrobe_image_dir + tmpFrameColorSku + '.jpg?v=0.'+wardrobeImageVersion+'\')';
				$('#drawRough').find('.wardrobe-skeleton-container').attr('style',tmpFrameColorStyle);
				$('#drawRough').find('.wardrobe-skeleton-container').attr('data-frame_color_sku',tmpFrameColorSku);
				break;
		}
		//$('#drawRough').find('.wardrobe-configure-container').attr('data-wardrobe_position', wardrobe_literal.globalCount++);
		var appendHtml = $('#drawRough').html().trim();
		$('#wardrobeConfigure').append(appendHtml);
		$('#drawRough').html('');
		
		
		//Price Calculation
		var tmpPriceCalc = wardrobe_literal.calculateWardrobePrice({"position":curPos,"wardrobe_type":tempType});
		//Dimension Calculation
		var tmpDimCalc = wardrobe_literal.calculateDimension({type:"individual","position":curPos,"wardrobe_type":tempType});
                if($('.action-dimension').hasClass('active-btn')) {
                    wardrobe_literal.dimShow();
                }
		
        $($('#wardrobeConfigure .wardrobe-configure-container:last-child')).attr('data-wardrobe_position', wardrobe_literal.globalCount++);
        //$($('#wardrobeConfigure .wardrobe-configure-container:last-child')).attr('data-wardrobe_type', tempType);
		var tmpPrice = wardrobe_literal.roundToTwo(wardrobe_literal.wardrobePrice);
        $('#wardrobeAddOnPrice span').html(wardrobe_literal.formatPrice(tmpPrice));
        wardrobe_literal.addSectionPosition();
        $.modal.close();
        wardrobe_literal.wardRobeSort();
        return false;
    },
    addLoftToConfig: function (divObj) {
        var action = 'Loft '+$(divObj).data('loft_label');
        var label = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]['customOptionAttributes'][wardrobe_literal.currentMaterialId].frontend_lable;
        wardrobe_literal.addEventTracker(action, label);
        wardrobe_literal.addEventTracker('Add Section|loft|'+action, label, 'event Add Section|loft|'+action);
        
        var loftHeightId = $(divObj).data('loft_height_id');
        var loftHeightValue = $(divObj).data('loft_height_value');
		var loftHeightValue = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId].customOptionAttributes[loftHeightId].value;
        var addClass = '';
        var rmvClass = '';
		//Decide class to the container of loft in case of small and big loft 
		if(loftHeightValue > this.small_loft_height) {
			addClass = 'loft-fst-opt';
            rmvClass = 'loft-sec-opt';
		}
		else {
			addClass = 'loft-sec-opt';
            rmvClass = 'loft-fst-opt';
		}
        /* switch (loftHeightId) {
            case 5677 :
                addClass = 'loft-fst-opt';
                rmvClass = 'loft-sec-opt';
                break;
            case 5678 :
                addClass = 'loft-sec-opt';
                rmvClass = 'loft-fst-opt';
                break;
        } */
        var tmpFlag = true;
		
		var allLofts = $.extend(true, {}, wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId].all_data.lofts.arrangedData);
        //$.each(wardrobe_literal.finalObj, function( index, val ) {
        for (var index in wardrobe_literal.finalObj) {
            var temp_data = $.extend(true, {}, wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId].default_data.lofts[loftHeightId]);
			var wardrobDoorColorFound = false;
			var wardrobFrameColorFound = false;
            var bgColor = '';

            if (typeof wardrobe_literal.finalObj[index].double_door != 'undefined' && typeof wardrobe_literal.finalObj[index].double_door.loft == 'undefined') {
                    
				wardrobe_literal.finalObj[index].double_door.loft = 'Yes';
				wardrobe_literal.finalObj[index].double_door.loft_door = {"pattern": {}, "height": loftHeightId,"height_value":loftHeightValue};
				wardrobe_literal.finalObj[index].double_door.loft_frame = {"pattern": {}, "height": loftHeightId,"height_value":loftHeightValue};
				
				var wardrobeDoorColorSku = wardrobe_literal.finalObj[index].double_door.door.pattern.custom_options_child.sku;
				
				wardrobe_literal.finalObj[index].double_door.loft_door.pattern = temp_data.double_door.door.custom_options;
				wardrobe_literal.finalObj[index].double_door.loft_frame.pattern = temp_data.double_door.frames.custom_options;
				
				if(typeof allLofts.double_door[loftHeightId].door.custom_options.custom_options_child_sku[wardrobeDoorColorSku] != 'undefined') {
					wardrobe_literal.finalObj[index].double_door.loft_door.pattern.custom_options_child = allLofts.double_door[loftHeightId].door.custom_options.custom_options_child[allLofts.double_door[loftHeightId].door.custom_options.custom_options_child_sku[wardrobeDoorColorSku]];
					wardrobDoorColorFound = true;
				}
				
				if(wardrobe_literal.materialFrameIdenticalFlag) {
					wardrobe_literal.finalObj[index].double_door.loft_frame.pattern.custom_options_child = wardrobe_literal.finalObj[index].double_door.loft_door.pattern.custom_options_child;

					bgColor = wardrobe_literal.finalObj[index].double_door.loft_door.pattern.custom_options_child.sku;
				}
				else {
						wardrobe_literal.finalObj[index].double_door.loft_frame.pattern.custom_options_child = wardrobe_literal.finalObj[index].double_door.frames.pattern.custom_options_child;

					bgColor = wardrobe_literal.finalObj[index].double_door.frames.pattern.custom_options_child.sku;
				}
				
				$("#wardrobeConfigure .wardrobe-configure-container[data-wardrobe_position='" + index + "']").addClass(addClass).removeClass(rmvClass);
				
				if(wardrobDoorColorFound) {
					var tmpHtml = $('.double_door_loft_' + loftHeightId).html().trim();
					var tmpDoorStyle = 'background-image: url(\'' + root_url + '/' + wardrobe_image_dir + wardrobeDoorColorSku + '.jpg?v=0.'+wardrobeImageVersion+'\')';
					
					$('#drawRough').html(tmpHtml);
					
					
					$('#drawRough').find('.loft-door-container').attr('style', tmpDoorStyle);
					$('#drawRough').find('.loft-door-container').attr('data-color_sku', wardrobeDoorColorSku);
					$("#wardrobeConfigure .wardrobe-configure-container[data-wardrobe_position='" + index + "']").find('.wardrobe-loft-section-container').html($('#drawRough').html().trim());
					$('#drawRough').html('');
					wardrobDoorColorFound = false;
				}
				else {
					$("#wardrobeConfigure .wardrobe-configure-container[data-wardrobe_position='" + index + "']").find('.wardrobe-loft-section-container').html($('.double_door_loft_' + loftHeightId).html().trim());
				}
				tmpFlag = false;
				
				wardrobe_literal.finalObj[index].double_door.loft_frame.pattern.loft_type = "double_door";
				
				//Dimension Calculation
				var tmpDimCalc = wardrobe_literal.calculateDimension({type:"individual","position":index,"wardrobe_type":"double_door"});
            }

            if (typeof wardrobe_literal.finalObj[index].single_door != 'undefined' && typeof wardrobe_literal.finalObj[index].single_door.loft == 'undefined') {
				wardrobe_literal.finalObj[index].single_door.loft = 'Yes';
				wardrobe_literal.finalObj[index].single_door.loft_door = {"pattern": {}, "height": loftHeightId,"height_value":loftHeightValue};
				wardrobe_literal.finalObj[index].single_door.loft_frame = {"pattern": {}, "height": loftHeightId,"height_value":loftHeightValue};
				
				var wardrobeDoorColorSku = wardrobe_literal.finalObj[index].single_door.door.pattern.custom_options_child.sku;
				
				wardrobe_literal.finalObj[index].single_door.loft_door.pattern = temp_data.single_door.door.custom_options;
				wardrobe_literal.finalObj[index].single_door.loft_frame.pattern = temp_data.single_door.frames.custom_options;
				
				if(typeof allLofts.single_door[loftHeightId].door.custom_options.custom_options_child_sku[wardrobeDoorColorSku] != 'undefined') {
					wardrobe_literal.finalObj[index].single_door.loft_door.pattern.custom_options_child = allLofts.single_door[loftHeightId].door.custom_options.custom_options_child[allLofts.single_door[loftHeightId].door.custom_options.custom_options_child_sku[wardrobeDoorColorSku]];
					wardrobDoorColorFound = true;
				}
				
				if(wardrobe_literal.materialFrameIdenticalFlag) {
					wardrobe_literal.finalObj[index].single_door.loft_frame.pattern.custom_options_child = wardrobe_literal.finalObj[index].single_door.loft_door.pattern.custom_options_child;

					bgColor = wardrobe_literal.finalObj[index].single_door.loft_door.pattern.custom_options_child.sku;
				}
				else {
					wardrobe_literal.finalObj[index].single_door.loft_frame.pattern.custom_options_child = wardrobe_literal.finalObj[index].single_door.frames.pattern.custom_options_child;

					bgColor = wardrobe_literal.finalObj[index].single_door.frames.pattern.custom_options_child.sku;
				}
				
				
				$("#wardrobeConfigure .wardrobe-configure-container[data-wardrobe_position='" + index + "']").addClass(addClass).removeClass(rmvClass);
			   
			   
				if(wardrobDoorColorFound) {
					var tmpHtml = $('.single_door_loft_' + loftHeightId).html().trim();
					var tmpDoorStyle = 'background-image: url(\'' + root_url + '/' + wardrobe_image_dir + wardrobeDoorColorSku + '.jpg?v=0.'+wardrobeImageVersion+'\')';
					
					$('#drawRough').html(tmpHtml);
					
					
					$('#drawRough').find('.loft-door-container').attr('style', tmpDoorStyle);
					$('#drawRough').find('.loft-door-container').attr('data-color_sku', wardrobeDoorColorSku);
					$("#wardrobeConfigure .wardrobe-configure-container[data-wardrobe_position='" + index + "']").find('.wardrobe-loft-section-container').html($('#drawRough').html().trim());
					$('#drawRough').html('');
					wardrobDoorColorFound = false;
				}
				else {
					$("#wardrobeConfigure .wardrobe-configure-container[data-wardrobe_position='" + index + "']").find('.wardrobe-loft-section-container').html($('.single_door_loft_' + loftHeightId).html().trim());
				}
			   
				wardrobe_literal.finalObj[index].single_door.loft_frame.pattern.loft_type = "single_door";
			   
				//Dimension Calculation
				var tmpDimCalc = wardrobe_literal.calculateDimension({type:"individual","position":index,"wardrobe_type":"single_door"});

				tmpFlag = false;
					
            }

            if (typeof wardrobe_literal.finalObj[index].open_shelves != 'undefined' && typeof wardrobe_literal.finalObj[index].open_shelves.loft == 'undefined') {
				wardrobe_literal.finalObj[index].open_shelves.loft = 'Yes';
				wardrobe_literal.finalObj[index].open_shelves.loft_door = {"pattern": {}, "height": loftHeightId,"height_value":loftHeightValue};
				wardrobe_literal.finalObj[index].open_shelves.loft_frame = {"pattern": {}, "height": loftHeightId,"height_value":loftHeightValue};
				wardrobe_literal.finalObj[index].open_shelves.loft_door.pattern = temp_data.single_door.door.custom_options;
				wardrobe_literal.finalObj[index].open_shelves.loft_frame.pattern = temp_data.single_door.frames.custom_options;
                
                var wardrobeFrameColorSku = wardrobe_literal.finalObj[index].open_shelves.frames.pattern.custom_options_child.sku;
				
				if(typeof allLofts.single_door[loftHeightId].door.custom_options.custom_options_child_sku[wardrobeFrameColorSku] != 'undefined') {
					wardrobe_literal.finalObj[index].open_shelves.loft_door.pattern.custom_options_child = allLofts.single_door[loftHeightId].door.custom_options.custom_options_child[allLofts.single_door[loftHeightId].door.custom_options.custom_options_child_sku[wardrobeFrameColorSku]];
					wardrobFrameColorFound = true;
				}
                
				if(wardrobe_literal.materialFrameIdenticalFlag) {
					wardrobe_literal.finalObj[index].open_shelves.loft_frame.pattern.custom_options_child = wardrobe_literal.finalObj[index].open_shelves.loft_door.pattern.custom_options_child;

					bgColor = wardrobe_literal.finalObj[index].open_shelves.loft_door.pattern.custom_options_child.sku;
				}
				else {
					wardrobe_literal.finalObj[index].open_shelves.loft_frame.pattern.custom_options_child = wardrobe_literal.finalObj[index].open_shelves.frames.pattern.custom_options_child;

					bgColor = wardrobe_literal.finalObj[index].open_shelves.frames.pattern.custom_options_child.sku;
				}
				
                $("#wardrobeConfigure .wardrobe-configure-container[data-wardrobe_position='" + index + "']").addClass(addClass).removeClass(rmvClass);
                
                if(wardrobFrameColorFound) {
					var tmpHtml = $('.single_door_loft_' + loftHeightId).html().trim();
					var tmpDoorStyle = 'background-image: url(\'' + root_url + '/' + wardrobe_image_dir + wardrobeFrameColorSku + '.jpg?v=0.'+wardrobeImageVersion+'\')';
					
					$('#drawRough').html(tmpHtml);
					
					
					$('#drawRough').find('.loft-door-container').attr('style', tmpDoorStyle);
					$('#drawRough').find('.loft-door-container').attr('data-color_sku', wardrobeFrameColorSku);
					$("#wardrobeConfigure .wardrobe-configure-container[data-wardrobe_position='" + index + "']").find('.wardrobe-loft-section-container').html($('#drawRough').html().trim());
					$('#drawRough').html('');
					wardrobFrameColorFound = false;
				}
				else {
					$("#wardrobeConfigure .wardrobe-configure-container[data-wardrobe_position='" + index + "']").find('.wardrobe-loft-section-container').html($('.single_door_loft_' + loftHeightId).html().trim());
				}
                
                wardrobe_literal.finalObj[index].open_shelves.loft_frame.pattern.loft_type = "open_shelves";
				
				//Dimension Calculation
				var tmpDimCalc = wardrobe_literal.calculateDimension({type:"individual","position":index,"wardrobe_type":"open_shelves"});
				
				tmpFlag = false;
            }
			
			if( bgColor != '' ) {
				var tmpStyle = 'background-image: url(\'' + root_url + '/' + wardrobe_image_dir + bgColor + '.jpg?v=0.'+wardrobeImageVersion+'\')';
				$("#wardrobeConfigure .wardrobe-configure-container[data-wardrobe_position='" + index + "']").find('.loft-skeleton-container').attr('style', tmpStyle);
				bgColor = '';
				
				var wardrobeObjTmp = $("#wardrobeConfigure .wardrobe-configure-container[data-wardrobe_position='" + index + "'] .loft-skeleton-container img");
				var loftSrc = wardrobeObjTmp.attr('src');
				
				if (wardrobe_literal.dim_flag == 1) {
					wardrobeObjTmp.attr('data-dim', 'on');
					wardrobeObjTmp.attr('src', loftSrc.replace('.png', '-dim.png'));
					wardrobe_literal.doorOpen();
				}
				if (wardrobe_literal.mer_flag == 1) {
					wardrobeObjTmp.attr('data-mer', 'on');
					wardrobeObjTmp.attr('src', loftSrc.replace('.png', '-mer.png'));
					wardrobe_literal.doorOpen();
				}
			}
        }
		wardrobe_literal.calculateLoftPrice('add');
		if($('.action-dimension').hasClass('active-btn')) {
			wardrobe_literal.dimShow();
		}
        wardrobe_literal.addSectionPosition();
        $.modal.close();
        if (tmpFlag) {
            tmpFlag = true;
            //alert('Unchanged');
        }
    },
    updateWardrobeStyleSection: function (params) {
        var retSku = '';
        var defStyleColorId = '';
        var defStyleColorSku = '';
		var tempObj = $.extend(true, {}, wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]);
        if (typeof params != 'undefined' && typeof params['wardrobe_type'] != 'undefined' && typeof params['wardrobe_position'] != 'undefined' && typeof params['style_id'] != 'undefined' && typeof params['wardrobe_part'] != 'undefined' && typeof params['current_sku'] != 'undefined') {
			switch (params.wardrobe_part) {
                case 'door':
					wardrobe_literal.selectedDoorStyleSku = params['current_sku'];
					
					var selected_type_door_color_sku = $('#wardrobeConfigure .selected-type').find('.door-skeleton-container').data('door_color_sku');
					
                    //Checked Color with current selected style 
                    if (typeof wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId].all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params['style_id']].custom_options_child_sku[selected_type_door_color_sku] != 'undefined') {
                        retSku = selected_type_door_color_sku;
                    }
                    //Checked Color with global style constants
                    else if (typeof wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId].all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params['style_id']].custom_options_child_sku[wardrobe_literal.selectedDoorColorSku] != 'undefined') {
                        retSku = wardrobe_literal.selectedDoorColorSku;
                    }
                    //default color for selected style
                    else {
                        retSku = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId].all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params['style_id']].def_color.sku;
                    }
					
					var tmpColorId = typeof tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id].custom_options_child_sku[retSku] != 'undefined' ? tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id].custom_options_child_sku[retSku] : '';
					
					
					if (typeof tmpColorId != '') {
						//Update Final Json Object Start
						var tmpColorData = tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id].custom_options_child[tmpColorId];
						delete tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id].custom_options_child_sku;
						delete tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id].def_color;
						if (params.wardrobe_part == 'door') {
							delete tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id].color_data;
						}
						tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id].custom_options_child = tmpColorData;
						wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type][params.wardrobe_part].pattern = tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id];
						
						if(wardrobe_literal.materialFrameIdenticalFlag) {
							wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type]['frames'].pattern.custom_options_child = tmpColorData;
						}
						
						//Remove Mirror if previously applied
						if(typeof wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].mirror != 'undefined') {
							delete wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].mirror;
						}
						if(typeof wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].mirror_side != 'undefined') {
							delete wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].mirror_side;
						}
						
						//Updeate Default Values (To remember old style and color while adding new)
						if (params.wardrobe_part == 'door') {
							wardrobe_literal.lastDoorStyleSku = wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].door.pattern.sku;
							wardrobe_literal.lastDoorColorSku = wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].door.pattern.custom_options_child.sku;
						}
						
						//Update Final Json Object End
						
						//Price start
						var tmpPrice = wardrobe_literal.calculateWardrobePrice({"position": params['wardrobe_position'], "wardrobe_type": params['wardrobe_type'], "old_price": wardrobe_literal.wardrobePrice});
						
						if (typeof tmpPrice.difference != 0) {
							wardrobe_literal.showAmt(tmpPrice.price, tmpPrice.difference);
						}
						//Price End
						
						//Update selcted type data-door_sku
						$('#wardrobeConfigure .selected-type').find('.door-skeleton-container').removeData('door_sku');
						$('#wardrobeConfigure .selected-type').find('.door-skeleton-container').attr('data-door_sku', params['current_sku']);
						//Update selcted type data-door_color_sku
						$('#wardrobeConfigure .selected-type').find('.door-skeleton-container').removeData('door_color_sku');
						$('#wardrobeConfigure .selected-type').find('.door-skeleton-container').attr('data-door_color_sku', retSku);
						
						//Update selcted type data-frame_color_sku
						if(wardrobe_literal.materialFrameIdenticalFlag) {
							$('#wardrobeConfigure .selected-type').find('.wardrobe-skeleton-container').removeData('frame_color_sku');
							$('#wardrobeConfigure .selected-type').find('.wardrobe-skeleton-container').attr('data-frame_color_sku', retSku);
						}
					}
					else {
						retSku = '';
					}
					
                    break;
                case 'frames':
					wardrobe_literal.selectedFrameColorSku = params['current_sku'];
					if(!wardrobe_literal.materialFrameIdenticalFlag || params.wardrobe_type == 'open_shelves') {
						var selected_type_frame_color_sku = $('#wardrobeConfigure .selected-type').find('.wardrobe-skeleton-container').data('frame_color_sku');

						//Checked Color with current selected style 
						if (typeof wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId].all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params['style_id']].custom_options_child_sku[selected_type_frame_color_sku] != 'undefined') {
							retSku = selected_type_frame_color_sku;
						}
						//Checked Color with global style constants
						else if (typeof wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId].all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params['style_id']].custom_options_child_sku[wardrobe_literal.selectedFrameColorSku] != 'undefined') {
							retSku = wardrobe_literal.selectedFrameColorSku;
						}
						//default color for selected style
						else {
							retSku = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId].all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params['style_id']].def_color.sku;
						}
						
						var tmpColorId = typeof tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id].custom_options_child_sku[retSku] != 'undefined' ? tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id].custom_options_child_sku[retSku] : '';
						
						if (typeof tmpColorId != '') {
							//Update Final Json Object Start
							var tmpColorData = tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id].custom_options_child[tmpColorId];
							delete tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id].custom_options_child_sku;
							delete tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id].def_color;

							tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id].custom_options_child = tmpColorData;
							wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type][params.wardrobe_part].pattern = tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id];
							//Update Final Json Object End
							
							
							if(typeof wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].loft != 'undefined') {
								wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].loft_frame.pattern.custom_options_child = tmpColorData;
								
								var tmpStyle = 'background-image: url(\'' + root_url + '/' + wardrobe_image_dir + tmpColorData.sku + '.jpg?v=0.'+wardrobeImageVersion+'\')';
								
								$("#wardrobeConfigure .selected-type").find('.loft-skeleton-container').removeData('frame_color_sku');
								$("#wardrobeConfigure .selected-type").find('.loft-skeleton-container').attr('data-frame_color_sku',tmpColorData.sku);
					
								$("#wardrobeConfigure .selected-type").find('.loft-skeleton-container').attr('style', tmpStyle);
								
								wardrobe_literal.calculateLoftPrice('update','no');
							}
							
							//Price start
							var tmpPrice = wardrobe_literal.calculateWardrobePrice({"position": params['wardrobe_position'], "wardrobe_type": params['wardrobe_type'], "old_price": wardrobe_literal.wardrobePrice});
							
							if (typeof tmpPrice.difference != 0) {
								wardrobe_literal.showAmt(tmpPrice.price, tmpPrice.difference);
							}
							//Price End 
							
							//Update selcted type data-frame_sku
							$('#wardrobeConfigure .selected-type').find('.wardrobe-skeleton-container').removeData('frame_sku');
							$('#wardrobeConfigure .selected-type').find('.wardrobe-skeleton-container').attr('data-frame_sku', params['current_sku']);
							//Update selcted type data-frame_color_sku
							$('#wardrobeConfigure .selected-type').find('.wardrobe-skeleton-container').removeData('frame_color_sku');
							$('#wardrobeConfigure .selected-type').find('.wardrobe-skeleton-container').attr('data-frame_color_sku', retSku);
						}
						else {
							retSku = '';
						}
					}
					else {
						//Update Final Json Object Start
						var frameColorData = wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].frames.pattern.custom_options_child;
						
						tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id].custom_options_child = frameColorData;
						
						wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type][params.wardrobe_part].pattern = tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id];
						//Update Final Json Object End
						
						//Price start
						var tmpPrice = wardrobe_literal.calculateWardrobePrice({"position": params['wardrobe_position'], "wardrobe_type": params['wardrobe_type'], "old_price": wardrobe_literal.wardrobePrice});
						
						if (typeof tmpPrice.difference != 0) {
							wardrobe_literal.showAmt(tmpPrice.price, tmpPrice.difference);
						}
						//Price End 
						
						//Update selcted type data-frame_sku
						$('#wardrobeConfigure .selected-type').find('.wardrobe-skeleton-container').removeData('frame_sku');
						$('#wardrobeConfigure .selected-type').find('.wardrobe-skeleton-container').attr('data-frame_sku', params['current_sku']);
						
						retSku = 'same_door';
					}
                    break;
            }
        }
		return retSku;
    },
    updateWardrobeColorSection: function (params) {
        var retSku = '';
        if (typeof params != 'undefined' && typeof params['wardrobe_type'] != 'undefined' && typeof params['wardrobe_position'] != 'undefined' && typeof params['style_id'] != 'undefined' && typeof params['color_option_id'] != 'undefined' && typeof params['wardrobe_part'] != 'undefined' && typeof params['current_sku'] != 'undefined') {

            //Update Final Json Object
            var tempObj = $.extend(true, {}, wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]);

            var tmpColorId = typeof tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id].custom_options_child_sku[params.current_sku] != 'undefined' ? tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id].custom_options_child_sku[params.current_sku] : '';
            if (tmpColorId != '') {
                var tmpColorData = tempObj.all_data[params.wardrobe_type][params.wardrobe_part].custom_options[params.style_id].custom_options_child[tmpColorId];

                wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type][params.wardrobe_part].pattern.custom_options_child = tmpColorData;
				
				
				//In case of material having same frame color that of door
				if(params.wardrobe_type != 'open_shelves' && params.wardrobe_part == 'door' && wardrobe_literal.materialFrameIdenticalFlag) {
					wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type]['frames'].pattern.custom_options_child = tmpColorData;
				}
				
				if(typeof wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].loft != 'undefined' && !wardrobe_literal.materialFrameIdenticalFlag && params.wardrobe_part == 'frames'){

					wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].loft_frame.pattern.custom_options_child = tmpColorData;
								
					var tmpStyle = 'background-image: url(\'' + root_url + '/' + wardrobe_image_dir + tmpColorData.sku + '.jpg?v=0.'+wardrobeImageVersion+'\')';
					
					$("#wardrobeConfigure .selected-type").find('.loft-skeleton-container').removeData('frame_color_sku');
					$("#wardrobeConfigure .selected-type").find('.loft-skeleton-container').attr('data-frame_color_sku',tmpColorData.sku);
					
					$("#wardrobeConfigure .selected-type").find('.loft-skeleton-container').attr('style', tmpStyle);
					
					wardrobe_literal.calculateLoftPrice('update','show_no');
				}
				
                retSku = params.current_sku;

                //Price Calculation
				var tmpPrice = wardrobe_literal.calculateWardrobePrice({"position": params['wardrobe_position'], "wardrobe_type": params['wardrobe_type'], "old_price": wardrobe_literal.wardrobePrice});

                if (typeof tmpPrice.difference != 0) {
                    wardrobe_literal.showAmt(tmpPrice.price, tmpPrice.difference);
                }

                //Update selcted type data-door_color_sku
                if (params.wardrobe_part == 'door') {
					//Updeate Default Values (To remember old style and color while adding new)
					wardrobe_literal.lastDoorColorSku = wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].door.pattern.custom_options_child.sku;
                    $('#wardrobeConfigure .selected-type').find('.door-skeleton-container').removeData('door_color_sku');
					$('#wardrobeConfigure .selected-type').find('.door-skeleton-container').attr('data-door_color_sku', params['current_sku']);
					
					if(wardrobe_literal.materialFrameIdenticalFlag) {
						$('#wardrobeConfigure .selected-type').find('.door-skeleton-container').removeData('frame_color_sku');
						$('#wardrobeConfigure .selected-type').find('.wardrobe-skeleton-container').attr('data-frame_color_sku', retSku);
					}
                }
                else {
					$('#wardrobeConfigure .selected-type').find('.wardrobe-skeleton-container').removeData('frame_color_sku');
                    $('#wardrobeConfigure .selected-type').find('.wardrobe-skeleton-container').attr('data-frame_color_sku', params['current_sku']);
					if(params.wardrobe_type) {
						wardrobe_literal.lastDoorColorSku = wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].frames.pattern.custom_options_child.sku;
					}
                }
            }
        }
        return retSku;
    },
    updateLoftHeight: function (params) {
        var retSku = ''
        if (typeof params != 'undefined' && typeof params['wardrobe_type'] != 'undefined' && typeof params['wardrobe_position'] != 'undefined' && typeof params['style_id'] != 'undefined' && typeof params['wardrobe_part'] != 'undefined' && typeof params['current_sku'] != 'undefined' && typeof params['height_id'] != 'undefined') {
            var curColorSku = $('#wardrobeConfigure .selected-type').find('.loft-door-container').data('color_sku');
			var loftHeightValue = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId].customOptionAttributes[params.height_id].value;
            var tst = $.extend(true, {}, wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]);
				
			var tmpLoftType = params.wardrobe_type;
			if(params.wardrobe_type == 'open_shelves'){
				tmpLoftType = 'single_door';
			}
			
            //Checked Color with current selected style 
            if (typeof tst.all_data.lofts.arrangedData[tmpLoftType][params.height_id].door.custom_options.custom_options_child_sku[curColorSku] != 'undefined') {
                retSku = curColorSku;
            }
            else {
                retSku = tst.all_data.lofts.arrangedData[tmpLoftType][params.height_id].door.custom_options.def_color.sku;
            }

			if(wardrobe_literal.materialFrameIdenticalFlag) {
				var frameColorData = wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].frames.pattern.custom_options_child;
			}
            
			//var tmp = wardrobe_literal.finalObj[$('#wardrobeConfigure .selected-type').data('wardrobe_position')][params.wardrobe_type].loft_frame.pattern.custom_options_child;
            var wardrobePosition = $('#wardrobeConfigure .selected-type').data('wardrobe_position');

            var curColrId = tst.all_data.lofts.arrangedData[tmpLoftType][params.height_id].door.custom_options.custom_options_child_sku[retSku];
			
			if(wardrobe_literal.materialFrameIdenticalFlag ) {
				var frameColorData = tst.all_data.lofts.arrangedData[tmpLoftType][params.height_id].door.custom_options.custom_options_child[curColrId];
			}
			else {
				var frameColorData = wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].frames.pattern.custom_options_child;
			}
			
			
            //Update Frame
            wardrobe_literal.finalObj[wardrobePosition][params.wardrobe_type].loft_frame.height = params.height_id;
            wardrobe_literal.finalObj[wardrobePosition][params.wardrobe_type].loft_frame.height_value = loftHeightValue;
            wardrobe_literal.finalObj[wardrobePosition][params.wardrobe_type].loft_frame.pattern = tst.all_data.lofts.arrangedData[tmpLoftType][params.height_id].frames.custom_options;
            wardrobe_literal.finalObj[wardrobePosition][params.wardrobe_type].loft_frame.pattern.custom_options_child = frameColorData;
			

            //update selected type loft frame section data attributes
			$('#wardrobeConfigure .selected-type').find('.loft-skeleton-container').removeData('frame_sku');
            $('#wardrobeConfigure .selected-type').find('.loft-skeleton-container').attr('data-frame_sku', wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId].all_data.lofts.arrangedData[tmpLoftType][params.height_id].frames.custom_options.sku);
			
			$('#wardrobeConfigure .selected-type').find('.loft-skeleton-container').removeData('opt_id');
            $('#wardrobeConfigure .selected-type').find('.loft-skeleton-container').attr('data-opt_id', wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId].all_data.lofts.arrangedData[tmpLoftType][params.height_id].frames.custom_options.option_id);
            
			$('#wardrobeConfigure .selected-type').find('.loft-skeleton-container').removeData('height_id');
			$('#wardrobeConfigure .selected-type').find('.loft-skeleton-container').attr('data-height_id', params.height_id);
			
			$('#wardrobeConfigure .selected-type').find('.loft-skeleton-container').removeData('frame_color_sku');
			$('#wardrobeConfigure .selected-type').find('.loft-skeleton-container').attr('data-frame_color_sku',frameColorData.sku);
			

            //Update Door
            wardrobe_literal.finalObj[wardrobePosition][params.wardrobe_type].loft_door.height = params.height_id;
            wardrobe_literal.finalObj[wardrobePosition][params.wardrobe_type].loft_door.height_value = loftHeightValue;
            wardrobe_literal.finalObj[wardrobePosition][params.wardrobe_type].loft_door.pattern = tst.all_data.lofts.arrangedData[tmpLoftType][params.height_id].door.custom_options;

            wardrobe_literal.finalObj[wardrobePosition][params.wardrobe_type].loft_door.pattern.custom_options_child = tst.all_data.lofts.arrangedData[tmpLoftType][params.height_id].door.custom_options.custom_options_child[curColrId];

            //update selected type loft door section data attributes
			$('#wardrobeConfigure .selected-type').find('.loft-door-container').removeData('color_sku');
            $('#wardrobeConfigure .selected-type').find('.loft-door-container').attr('data-color_sku', retSku);
			
			$('#wardrobeConfigure .selected-type').find('.loft-door-container').removeData('height_id');
            $('#wardrobeConfigure .selected-type').find('.loft-door-container').attr('data-height_id', params.height_id);
            
			$('#wardrobeConfigure .selected-type').find('.loft-door-container').removeData('opt_id');
			$('#wardrobeConfigure .selected-type').find('.loft-door-container').attr('data-opt_id', wardrobe_literal.finalObj[wardrobePosition][params.wardrobe_type].loft_door.pattern.sku);
			
			wardrobe_literal.changedLoftDoorColorSku = wardrobe_literal.finalObj[wardrobePosition][params.wardrobe_type].loft_door.pattern.sku;
			
			$('#wardrobeConfigure .selected-type').find('.loft-skeleton-container').removeData('opt_id');
			$('#wardrobeConfigure .selected-type').find('.loft-skeleton-container').attr('data-opt_id', $(this).data('opt_id'));
			
			$('#wardrobeConfigure .selected-type').find('.loft-skeleton-container').removeData('frame_sku');
			$('#wardrobeConfigure .selected-type').find('.loft-skeleton-container').attr('data-frame_sku', $(this).data('sku'));

			
			wardrobe_literal.calculateLoftPrice('update');
			
			wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].loft_frame.pattern.loft_type = params.wardrobe_type;
			
			//Dimension Calculation
			var tmpDimCalc = wardrobe_literal.calculateDimension({type:"individual","position":params.wardrobe_position,"wardrobe_type":params.wardrobe_type});
        }
        return retSku;
    },
    updateLoftColor: function (params) {
        var retSku = '';
        if (typeof params != 'undefined' && typeof params['wardrobe_type'] != 'undefined' && typeof params['wardrobe_position'] != 'undefined' && typeof params['color_option_id'] != 'undefined' && typeof params['wardrobe_part'] != 'undefined' && typeof params['current_sku'] != 'undefined' && typeof params['height_id'] != 'undefined') {
            //Update Final Json Object
            var tempObj = $.extend(true, {}, wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]);
			var tmpLoftType = params.wardrobe_type;
			if(params.wardrobe_type == 'open_shelves'){
				tmpLoftType = 'single_door';
			}
			
			var tmpColorData = typeof tempObj.all_data.lofts.arrangedData[tmpLoftType][params.height_id].door.custom_options.custom_options_child[params.color_option_id] != 'undefined' ? tempObj.all_data.lofts.arrangedData[tmpLoftType][params.height_id].door.custom_options.custom_options_child[params.color_option_id] : '';
			
			
			if (tmpColorData != '') { 
				wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].loft_door.pattern.custom_options_child = tmpColorData;
				if(wardrobe_literal.materialFrameIdenticalFlag ) {
					wardrobe_literal.finalObj[params.wardrobe_position][params.wardrobe_type].loft_frame.pattern.custom_options_child = tmpColorData;
				}
				retSku = params.current_sku;
				//Update selected Type 
				$('#wardrobeConfigure .selected-type').find('.loft-door-container').removeData('color_sku');
				$('#wardrobeConfigure .selected-type').find('.loft-door-container').attr('data-color_sku', retSku);
			}
			wardrobe_literal.calculateLoftPrice('update');
        }
        return retSku;
    },
    addSectionPosition: function () {
        var addButton, positionLastWardrobe, widthLastWardrobe, newPosition, accum_width = 0;
        addButton = $('#wardrobeAddSelection');
        positionLastWardrobe = $('#wardrobeConfigure .wardrobe-configure-container:last-child').offset();
        widthLastWardrobe = $('#wardrobeConfigure .wardrobe-configure-container:last-child').width();
        newPosition = positionLastWardrobe.left + widthLastWardrobe + 28;
        actualPostion = $('.wardrobe-horizontal-scroll-area').offset().left + $('#wardrobeConfigure').width() + 28;

        $('.wardrobe-configure-container').each(function (e) {
            var actualWidth = $(this).outerWidth();
            accum_width += parseInt(actualWidth) + 2;
        });

        if (accum_width > $('#wardrobeConfigure').width()) {
            addButton.css('left', actualPostion);
        } else {
            addButton.css('left', newPosition);
        }
    },
    loadWardrobesToAdd: function (patternId) {
		this.checkLoftsToadd();
                var materialText = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]['customOptionAttributes'][wardrobe_literal.currentMaterialId].frontend_lable;
                wardrobe_literal.addEventTracker('Add Section|click', materialText, 'event Add Section|click');
                dataLayer.push({'event': 'Wardrobe_Add Section', 'page': 'Add Section Modal'});
		if (this.mer_flag == 1) {
			$('.action-merchandise').click();
			$('.action-door-toggle').click();
			
			
		}
		if (this.dim_flag == 1) {
			$('.action-dimension').click();
			$('.action-door-toggle').click();
		}
		var modalBody = $('#add_section_modal_body').html().trim();
        var modalFooter = '<a class="wardrobe-button control-close-modal" href="javascript:void(0);">Cancel</a>';
        this.buildModal("wardrobeAddSelectionContainer", "Choose a section to add", modalBody, modalFooter);
        this.addSectionPosition();
        return false;
    },
	showInfoModal: function () {
		var modalBody = $('#fd').html().trim();
		var modalFooter = '<h4>Total Cost: Rs. <span>'+wardrobe_literal.formatPrice(wardrobe_literal.roundToTwo(wardrobe_literal.wardrobePrice))+'</span> </h4>';
		wardrobe_literal.buildModal("wardrobePriceDetailInfo", "PRICING DETAIL OF YOUR WARDROBE",modalBody,modalFooter);
		$('.container-fluid').niceScroll(wardrobe_literal.scrollDefaults).resize();
	},
    buildModal: function (modalID, modalTitle, modalBody, modalFooter) {
        modalHTML = '<div id="' + modalID + '" class="modal"><div class="modal-header"><a href="javascript: void(null);" class="control-close control-close-modal"></a><p>' + modalTitle + '</p></div><div class="modal-body">' + modalBody + '</div><div class="modal-footer">' + modalFooter + '</div></div>';

        $.modal(modalHTML,
            {
                /* First, the functions we want to run when the dialog opens */
                onOpen: function (dialog) {
                    dialog.overlay.fadeIn('fast', function () {
                        dialog.container.slideDown('fast', function () {
                            dialog.data.fadeIn('fast',function() {
								$('body').addClass('active');
							});
                        });
                    });
                    return false;
                },
                /* Next, the functions we want to run when the dialog box is visible */
                onShow: function (dialog) {
                    return false;
                },
                /* We run these functions when the box is closed */
                onClose: function (dialog) {
					$('body').removeClass('active');
                    dialog.overlay.fadeOut('fast', function () {
                        $.modal.close();
                    });
                    
                    var materialText = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]['customOptionAttributes'][wardrobe_literal.currentMaterialId].frontend_lable;
                    wardrobe_literal.addEventTracker('Add section |Cancel', materialText, 'event Add section |Cancel');
                    
                    return false
                },
                autoPosition: true,
                closeClass: "control-close-modal",
                escClose: true,
                opacity: 100,
                overlayId: "modal-backdrop",
                overlayClose: true,
                persist: false,
                position: ["10%", ""]
            }
        );
    },
    appendToConfigure: function (html) {
        $('#wardrobeConfigure').append(html);
    },
    done: function () {
		$('#loaderOverlay').show();
		if($('.action-door-toggle').hasClass('active-btn')) {
                        wardrobe_literal.enableTracking = false;
			$('.action-door-toggle').click();
                        wardrobe_literal.enableTracking = true;
		}
		
		var html_data = $('#wardrobeConfigure').html().trim();
        //html_data = encodeURIComponent(JSON.stringify(html_data));
        html_data = window.btoa(JSON.stringify(html_data));
        var saveUrl = '/product_wardrobe/setDataForVip';
        var materialText = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]['customOptionAttributes'][wardrobe_literal.currentMaterialId].frontend_lable;
        var materialValue = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]['customOptionAttributes'][wardrobe_literal.currentMaterialId].value;
		var tmpDimCalc = wardrobe_literal.calculateDimension({type:"all"});
		wardrobe_literal.finalObj['height'] = tmpDimCalc.height;
		wardrobe_literal.finalObj['width'] = tmpDimCalc.width;
		wardrobe_literal.finalObj['depth'] = tmpDimCalc.depth;
		var wardrobe_data = window.btoa(JSON.stringify(wardrobe_literal.finalObj));
		var passData = {"wardrobe_data": wardrobe_data, "product_id": "1342571", "supplier_id": wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId].default_supplier, "material_id": wardrobe_literal.currentMaterialId, "primary_material": materialText,"material_value": materialValue, "html_data": html_data};
		if(wardrobe_literal.editProductId != '') {
			passData["old_product_id"] = wardrobe_literal.editProductId;
			passData["old_json_data"] = window.btoa(JSON.stringify(wardrobe_literal.old_json_tmp));
		}
                
        wardrobe_literal.addEventTracker('Done', materialText);        
        
        $.ajax({
            url: root_url + saveUrl,
            type: 'POST',
            data: passData,
            success: function (data) {
                var retData = $.parseJSON(data);
                if (typeof retData.status != 'undefined' && retData.status == 'success') {
                    if (typeof retData.createdProduct != 'undefined') {
                        wardrobe_literal.convertImage(retData.createdProduct,retData.imageName,retData.nod);
                    }
                }
            },
            error: function (xhr, error) {
            }
        });
    },
	convertImage: function(createdProduct,imageName,nod){
        /* var canvas = document.querySelector("canvas");
        var html = $('#wardrobeConfigure').html().trim();
        html2canvas(document.querySelector("#wardrobeConfigure"), {canvas: canvas}).then(function(canvas) {
            var dataURL = canvas.toDataURL("image/png");
            $.ajax({
                    url : root_url + '/product_wardrobe/createImage/',
                    type: 'post',
                    data:{dataUrl:dataURL,imageName:createdSku},
                    success:function(e){
                        location.href = root_url + '/site_wardrobe/getDataForVip/' + createdProduct;
                        //alert("success");
                    },
                    error: function(e){
                        console.log(e);
                        alert("error");
                    }
            }); 
        }); */
        wardrobe_literal.enableTracking = false;
	var totalWidth = 0 ;
        $("#wardrobeConfigure .wardrobe-configure-container").each(function () {
            totalWidth = totalWidth + $(this).width();
        })
        $("body, .wardrobe-horizontal-scroll-area").css({'width':totalWidth,'overflow':'auto !important'});
        $(".wardrobe-horizontal-scroll-area").css('max-width',totalWidth);

		$('#search-loader-container').show();
		var tmpGlob = {};
		
		var allImages = new Array(); 
		$("#wardrobeConfigure").find('img').each(function() {
            var srcTest = $(this).attr('src');
            allImages.push(srcTest);
		});
		
		wardrobe_literal.loadAllImage(allImages).completeLoading(function (images){
			$('.action-dimension').click();
			var allImages = new Array(); 
			$("#wardrobeConfigure").find('img').each(function() {
	var srcTest = $(this).attr('src');
			allImages.push(srcTest);
			});
			wardrobe_literal.loadAllImage(allImages).completeLoading(function (images){
				$('.action-merchandise').click();
				var allImages = new Array(); 
				$("#wardrobeConfigure").find('img').each(function() {
			var srcTest = $(this).attr('src');
				allImages.push(srcTest);
				});
				wardrobe_literal.loadAllImage(allImages).completeLoading(function (images){
					$('.action-merchandise').click();
					$('.action-door-toggle').click();
					
					
					//Create canvas object
					
					html2canvas($('#wardrobeConfigure'), { 
						onrendered: function (canvas1) {
							var imageChart = canvas1.toDataURL("image/png"); 
							tmpGlob['door']= imageChart;
							$('.action-dimension').click();
							html2canvas($('#wardrobeConfigure'), { 
								onrendered: function (canvas1) {
									var imageChart1 = canvas1.toDataURL("image/png"); 
									tmpGlob['dim']= imageChart1;
									$('.action-merchandise').click();
									html2canvas($('#wardrobeConfigure'), { 
										onrendered: function (canvas1) {
											var imageChart2 = canvas1.toDataURL("image/png"); 
											tmpGlob['mer']= imageChart2;
											$.ajax({
                                                                                                url : root_url + '/product_wardrobe/createImage/',
												type: 'post',
                                                                                                dataType:"html",
												data:{dataUrl:tmpGlob.door,dataDimURL:tmpGlob.dim,dataMerURL:tmpGlob.mer,imageName:imageName,nod:nod},
												success:function(e){
                                                                                                        
													$('.action-merchandise').click();
													$('.action-door-toggle').click();
													wardrobe_literal.enableTracking = true;
													
													location.href = root_url + '/site_wardrobe/getDataForVip/' + createdProduct;
													//alert("success");
												},
												error: function(e){
													$('.action-door-toggle').click();
													wardrobe_literal.enableTracking = true;
                                                                                                        $('#loaderOverlay').hide();
												}
											});
											$('.action-door-toggle').click();
										},
										width:totalWidth
									});
								},
								width:totalWidth
							});
						},
						width:totalWidth
					});
				
				});
			});
		});
		
		/* html2canvas($('#wardrobeConfigure'), { 
			onrendered: function (canvas1) {
				var imageChart = canvas1.toDataURL("image/png"); 
				tmpGlob['door']= imageChart;
				$('.action-dimension').click();
				html2canvas($('#wardrobeConfigure'), { 
					onrendered: function (canvas1) {
						var imageChart1 = canvas1.toDataURL("image/png"); 
						tmpGlob['dim']= imageChart1;
						$('.action-merchandise').click();
						html2canvas($('#wardrobeConfigure'), { 
							onrendered: function (canvas1) {
								var imageChart2 = canvas1.toDataURL("image/png"); 
								tmpGlob['mer']= imageChart2;
								$.ajax({
									url : root_url + '/product_wardrobe/createImage/',
									type: 'post',
									data:{dataUrl:tmpGlob.door,dataDimURL:tmpGlob.dim,dataMerURL:tmpGlob.mer,imageName:imageName},
									success:function(e){
										$('.action-merchandise').click();
										$('.action-door-toggle').click();
										
										
										location.href = root_url + '/site_wardrobe/getDataForVip/' + createdProduct;
										//alert("success");
									},
									error: function(e){
										$('.action-door-toggle').click();
										console.log(e);
										alert("error");
										$('#loaderOverlay').hide();
									}
								});
								$('.action-door-toggle').click();
							}
						});
					}
				});
			}
		});
     */
	},
	calculateDimension: function (data) {
		switch (data.type) {
			case 'individual':
				var wardrobeData = wardrobe_literal.finalObj[data.position][data.wardrobe_type];
				var prodHeight = 0;
				var prodDepth = 0;
				var prodWidth = 0;
				if(typeof wardrobeData.loft != 'undefined') {
					var loftHeightDim = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId].customOptionAttributes[wardrobeData.loft_frame.height].value;
					prodHeight = parseFloat(prodHeight) + parseFloat(loftHeightDim);
				}
				prodHeight = parseFloat(prodHeight) + parseFloat(wardrobeData.frames.pattern.height);
				prodDepth = parseFloat(prodDepth) + parseFloat(wardrobeData.frames.pattern.depth);
				prodWidth = parseFloat(prodWidth) + parseFloat(wardrobeData.frames.pattern.width);
				wardrobe_literal.finalObj[data.position]['height'] = prodHeight;
				wardrobe_literal.finalObj[data.position]['depth'] = prodDepth;
				wardrobe_literal.finalObj[data.position]['width'] = prodWidth;
				return ({height:prodHeight,depth:prodDepth,width:prodWidth});
				break;
			case 'all':
				var prodHeight = 0;
				var prodDepth = 0;
				var prodWidth = 0;
				var wardrobeData = wardrobe_literal.finalObj;
				for(var i in wardrobeData) {
					if(!isNaN(i) && i != 'height' && i != 'depth' && i != 'width' ) {
						if(parseFloat(wardrobeData[i].height) > parseFloat(prodHeight)) {
							prodHeight = parseFloat(wardrobeData[i].height);
						}
						if(parseFloat(wardrobeData[i].depth) > parseFloat(prodDepth)) {
							prodDepth = parseFloat(wardrobeData[i].depth);
						}
						prodWidth = parseFloat(prodWidth) + parseFloat(wardrobeData[i].width);
                    }    
				}
				return ({height:prodHeight,depth:prodDepth,width:prodWidth});
		}
	},
    roundToTwo: function (val,flag) {
		if(flag) {
			return (Math.round((val * 1) * 100) / 100);
		}
		else {
			return parseFloat((Math.round((val * 1) * 100) / 100)).toFixed(2);
		}
    },
	calculateWardrobePrice: function (data) {
		var internalPrice = 0;
        var externalPrice = 0;
        var internalPrice = 0;
        var newPrice = 0;
		var curUnitPrice = 0;
        var retData = {};
		if(typeof data.position != 'undefined' && typeof data.wardrobe_type != 'undefined') {
			if(typeof wardrobe_literal.finalObj[data.position][data.wardrobe_type] != 'undefined') {
				var tmpObj = $.extend(true, {}, wardrobe_literal.finalObj[data.position][data.wardrobe_type]);
				if(data.wardrobe_type == 'open_shelves') {
					var frameData = tmpObj.frames.pattern;
					
					//internalPrice = (wardrobe_literal.roundToTwo(frameData.internal_area) * wardrobe_literal.roundToTwo(frameData.custom_options_child.price)) + wardrobe_literal.roundToTwo(frameData.price);
					//internalPrice = Math.ceil((frameData.internal_area * frameData.custom_options_child.price) + frameData.price);
					internalPrice = (frameData.internal_area * frameData.custom_options_child.price) + frameData.price;
					
					//externalPrice = (wardrobe_literal.roundToTwo(frameData.external_area) * wardrobe_literal.roundToTwo(frameData.custom_options_child.price));
					//externalPrice = Math.ceil(frameData.external_area * frameData.custom_options_child.price);
					externalPrice = frameData.external_area * frameData.custom_options_child.price;
					
					//+ wardrobe_literal.roundToTwo(frameData.price);
				}
				else {
					var doorData = tmpObj.door.pattern;
					var frameData = tmpObj.frames.pattern;
					
					//internalPrice = ((wardrobe_literal.roundToTwo(doorData.internal_area) * wardrobe_literal.roundToTwo(frameData.custom_options_child.price)) + (wardrobe_literal.roundToTwo(frameData.internal_area) * wardrobe_literal.roundToTwo(frameData.custom_options_child.price))) + wardrobe_literal.roundToTwo(frameData.price);
					//internalPrice = Math.ceil(((doorData.internal_area * frameData.custom_options_child.price) + (frameData.internal_area * frameData.custom_options_child.price)) + (frameData.price));
					internalPrice = ((doorData.internal_area * frameData.custom_options_child.price) + (frameData.internal_area * frameData.custom_options_child.price)) + (frameData.price);
					
					//externalPrice = ((wardrobe_literal.roundToTwo(frameData.external_area) * wardrobe_literal.roundToTwo(doorData.custom_options_child.price)) + (wardrobe_literal.roundToTwo(doorData.external_area) * wardrobe_literal.roundToTwo(doorData.custom_options_child.price)) + wardrobe_literal.roundToTwo(doorData.price));
					externalPrice = (frameData.external_area * doorData.custom_options_child.price) + (doorData.external_area * doorData.custom_options_child.price) + doorData.price;
				}
				//var currentPrice = internalPrice + externalPrice;
				var currentPrice = wardrobe_literal.roundToTwo(internalPrice,true) + wardrobe_literal.roundToTwo(externalPrice,true);
				
				if (wardrobe_literal.wardrobePrice == 0) {// Add Very 1st
					wardrobe_literal.wardrobeSepPrice[data.position] = currentPrice;
					wardrobe_literal.wardrobePrice = currentPrice;
					return currentPrice;
				}
				else {
					if (typeof wardrobe_literal.wardrobeSepPrice[data.position] == 'undefined') {//New Addition
						wardrobe_literal.wardrobeSepPrice[data.position] = currentPrice;

						//wardrobe_literal.wardrobePrice = ((wardrobe_literal.roundToTwo(wardrobe_literal.wardrobePrice)) + (wardrobe_literal.roundToTwo(currentPrice)));
						wardrobe_literal.wardrobePrice = wardrobe_literal.wardrobePrice + currentPrice;
						return wardrobe_literal.wardrobePrice;

					}
					else {//Update old one
						var oldUnitPrice = wardrobe_literal.wardrobeSepPrice[data.position];
						
						if(typeof wardrobe_literal.loftSepPrice[data.position] != 'undefined') {
							curUnitPrice = currentPrice + wardrobe_literal.loftSepPrice[data.position];
						}
						else {
							curUnitPrice = currentPrice;
						}
						
						//newPrice = ((wardrobe_literal.roundToTwo(wardrobe_literal.wardrobePrice)) - (wardrobe_literal.roundToTwo(oldUnitPrice))) + curUnitPrice;
						newPrice = ((wardrobe_literal.wardrobePrice) - (oldUnitPrice)) + curUnitPrice;

						wardrobe_literal.wardrobeSepPrice[data.position] = curUnitPrice;
						if (typeof data.old_price != 'undefined') {
							wardrobe_literal.wardrobePrice = newPrice;
							retData['price'] = curUnitPrice;
							//retData['difference'] = (oldUnitPrice - curUnitPrice);
							retData['difference'] = (curUnitPrice - oldUnitPrice);
							return retData;
						}
						else {
							wardrobe_literal.wardrobePrice = newPrice;
							return wardrobe_literal.wardRobePrice;
						}
					}
				}
			}
		}
	},
    calculateLoftPrice: function (type,showAmt) {
		if(type == 'add') {
			var totalLoftPriceToaddFinalPrice = 0;
			var totalPrice = 0;
			for (var index in wardrobe_literal.finalObj) {
				var wardrobe_type = $("#wardrobeConfigure .wardrobe-configure-container[data-wardrobe_position='" + index + "']").data('wardrobe_type');
				var tmpObj = $.extend(true, {}, wardrobe_literal.finalObj[index][wardrobe_type]);
				if(typeof wardrobe_literal.loftSepPrice[index] == 'undefined' && typeof tmpObj.loft != 'undefined' && typeof tmpObj.loft_door != 'undefined' && typeof tmpObj.loft_frame != 'undefined' ) {
					var internalPrice = 0;
					var externalPrice = 0;
					var currentPrice = 0;
					var currentBuildPrice = 0;
					//internalPrice = ((wardrobe_literal.roundToTwo(tmpObj.loft_frame.pattern.internal_area) + wardrobe_literal.roundToTwo(tmpObj.loft_door.pattern.internal_area)) * (wardrobe_literal.roundToTwo(tmpObj.loft_frame.pattern.custom_options_child.price))) + wardrobe_literal.roundToTwo(tmpObj.loft_frame.pattern.price);
					//internalPrice = Math.ceil(((tmpObj.loft_frame.pattern.internal_area + tmpObj.loft_door.pattern.internal_area) * (tmpObj.loft_frame.pattern.custom_options_child.price)) + tmpObj.loft_frame.pattern.price);
					internalPrice = ((tmpObj.loft_frame.pattern.internal_area + tmpObj.loft_door.pattern.internal_area) * (tmpObj.loft_frame.pattern.custom_options_child.price)) + tmpObj.loft_frame.pattern.price;
					
					//externalPrice = ((wardrobe_literal.roundToTwo(tmpObj.loft_door.pattern.external_area) + wardrobe_literal.roundToTwo(tmpObj.loft_frame.pattern.external_area)) * (wardrobe_literal.roundToTwo(tmpObj.loft_door.pattern.custom_options_child.price))) + wardrobe_literal.roundToTwo(tmpObj.loft_door.pattern.price);
					//externalPrice = Math.ceil(((tmpObj.loft_door.pattern.external_area + tmpObj.loft_frame.pattern.external_area) * (tmpObj.loft_door.pattern.custom_options_child.price)) + tmpObj.loft_door.pattern.price);
					externalPrice = ((tmpObj.loft_door.pattern.external_area + tmpObj.loft_frame.pattern.external_area) * (tmpObj.loft_door.pattern.custom_options_child.price)) + tmpObj.loft_door.pattern.price;
					
					currentPrice = internalPrice + externalPrice;
					
					wardrobe_literal.loftSepPrice[index] = currentPrice;
					
					currentBuildPrice = wardrobe_literal.wardrobeSepPrice[index] + currentPrice;
					
					//totalPrice = totalPrice + currentBuildPrice;
					totalLoftPriceToaddFinalPrice = totalLoftPriceToaddFinalPrice + currentPrice;
					wardrobe_literal.wardrobeSepPrice[index] = currentBuildPrice;
				}
			}
			//wardrobe_literal.wardrobePrice = totalPrice;
			wardrobe_literal.wardrobePrice = wardrobe_literal.wardrobePrice +  totalLoftPriceToaddFinalPrice;
			//$('#wardrobeAddOnPrice span').html(wardrobe_literal.formatPrice(Math.ceil(parseInt(wardrobe_literal.wardrobePrice))));
			var tmpPrice = wardrobe_literal.roundToTwo(wardrobe_literal.wardrobePrice);
			$('#wardrobeAddOnPrice span').html(wardrobe_literal.formatPrice(tmpPrice));
		}
		else if(type == 'update'){
			var wardrobe_position = $("#wardrobeConfigure .selected-type").data('wardrobe_position');
			var wardrobe_type = $("#wardrobeConfigure .selected-type").data('wardrobe_type');
			
			var tmpObj = $.extend(true, {}, wardrobe_literal.finalObj[wardrobe_position][wardrobe_type]);
			if(typeof tmpObj.loft != 'undefined' && typeof tmpObj.loft_door != 'undefined' && typeof tmpObj.loft_frame != 'undefined' ) {
				var internalPrice = 0;
				var externalPrice = 0;
				var currentPrice = 0;
				var oldLoftPrice = 0;
				var oldBuildPrice = 0;
				var newBuildPrice = 0;
				var diff = 0;
				//internalPrice = ((wardrobe_literal.roundToTwo(tmpObj.loft_frame.pattern.internal_area) + wardrobe_literal.roundToTwo(tmpObj.loft_door.pattern.internal_area)) * (wardrobe_literal.roundToTwo(tmpObj.loft_frame.pattern.custom_options_child.price))) + wardrobe_literal.roundToTwo(tmpObj.loft_frame.pattern.price);
				internalPrice = ((tmpObj.loft_frame.pattern.internal_area + tmpObj.loft_door.pattern.internal_area) * (tmpObj.loft_frame.pattern.custom_options_child.price)) + tmpObj.loft_frame.pattern.price;
				
				//externalPrice = ((wardrobe_literal.roundToTwo(tmpObj.loft_door.pattern.external_area) + wardrobe_literal.roundToTwo(tmpObj.loft_frame.pattern.external_area)) * (wardrobe_literal.roundToTwo(tmpObj.loft_door.pattern.custom_options_child.price))) + wardrobe_literal.roundToTwo(tmpObj.loft_door.pattern.price);
				externalPrice = ((tmpObj.loft_door.pattern.external_area + tmpObj.loft_frame.pattern.external_area) * (tmpObj.loft_door.pattern.custom_options_child.price)) + tmpObj.loft_door.pattern.price;
				
				currentPrice = internalPrice + externalPrice;
				
				oldLoftPrice = wardrobe_literal.loftSepPrice[wardrobe_position];
				
				oldBuildPrice = wardrobe_literal.wardrobeSepPrice[wardrobe_position];
				
				newBuildPrice = (oldBuildPrice - oldLoftPrice) + currentPrice;
				
				diff = newBuildPrice - oldBuildPrice;
				
				wardrobe_literal.wardrobeSepPrice[wardrobe_position] = newBuildPrice;
				
				wardrobe_literal.loftSepPrice[wardrobe_position] = currentPrice;
				
				//Update Total wardrobe Price
				var newWardrobePrice = (wardrobe_literal.wardrobePrice - oldBuildPrice) + newBuildPrice;
				
				wardrobe_literal.wardrobePrice = newWardrobePrice;
				
				if(typeof showAmt == 'undefined') {
					wardrobe_literal.showAmt(newBuildPrice, diff);
				}
				
				
				
				
				
				/* totalPrice = totalPrice + currentBuildPrice;
				wardrobe_literal.wardrobeSepPrice[index] = currentBuildPrice;
				wardrobe_literal.loftSepPrice[index] = currentPrice; */
			}
		}
	},
	showAmt: function (newAmt, diff) {
		var tmpPrice = wardrobe_literal.roundToTwo(newAmt);
        var fP = wardrobe_literal.formatPrice(tmpPrice);
		if (diff < 0) {
			var diff = wardrobe_literal.formatPrice(wardrobe_literal.roundToTwo(diff * -1));
            $('#costSubtraction').html('- Rs. ' + diff);
            $('.wardrobe-total-cost .wardrobe-cost-subtraction').css({'opacity': '1'});
            $('.wardrobe-total-cost .wardrobe-cost-subtraction').animate({right: "-110px"}, {duration: 1500, queue: false, complete: function () {
                    $(this).css({'opacity': '0', 'right': '0'});
					$('.wardrobe-total-cost-value span').text('Rs. ' + fP).css({'border-bottom': '2px solid #f44336'}).animate({
                        borderBottomColor: "transparent"}, {duration: 1000, queue: false});
                }
            });
        }
        else if (diff > 0) {
			var diff = wardrobe_literal.formatPrice(wardrobe_literal.roundToTwo(diff));
            $('#costAddition').html('+ Rs. ' + diff);
            $('.wardrobe-total-cost .wardrobe-cost-addition').css({'opacity': '1'});
            $('.wardrobe-total-cost .wardrobe-cost-addition').animate({right: "0"}, {duration: 1500, queue: false, complete: function () {
                    $(this).css({'opacity': '0', 'right': '-110px'});
                    $('.wardrobe-total-cost-value span').text('Rs. ' + fP).css({'border-bottom': '2px solid #f44336'}).animate({
                        borderBottomColor: "transparent"}, {duration: 1000, queue: false});
                }
            });
        }
        var tmpPrice = wardrobe_literal.roundToTwo(wardrobe_literal.wardrobePrice);
        $('#wardrobeAddOnPrice span').html(wardrobe_literal.formatPrice(tmpPrice));
    },
    arrangePageElements: function () {
        if ($('#wardrobeConfigure .wardrobe-configure-container').length) {
            wardrobe_literal.addSectionPosition();
        }

        if ($('#wardrobeConfigure .wardrobe-configure-container.selected-type').length) {
            wardrobe_literal.centerContent();
        }
    },
	removeMirror: function (side) {
		var pos = $('#wardrobeConfigure .selected-type').data('wardrobe_position');
		var type = $('#wardrobeConfigure .selected-type').data('wardrobe_type');
		var oldPrice = wardrobe_literal.wardrobeSepPrice[pos];
		var mirrorPrice = wardrobe_literal.mirrorPrice;
		var newPrice = oldPrice-mirrorPrice;
		if(typeof wardrobe_literal.finalObj[pos][type].mirror == 'undefined') {
			delete wardrobe_literal.finalObj[pos][type].mirror;
			delete wardrobe_literal.finalObj[pos][type].mirror_side;
		}
		else {
			if(wardrobe_literal.finalObj[pos][type].mirror == 2) {
				wardrobe_literal.finalObj[pos][type].mirror = 1;				wardrobe_literal.finalObj[pos][type].mirror_side = side;
			}
			else if(wardrobe_literal.finalObj[pos][type].mirror == 1) {
				delete wardrobe_literal.finalObj[pos][type].mirror;
				delete wardrobe_literal.finalObj[pos][type].mirror_side;
			}
		}
		wardrobe_literal.wardrobePrice = wardrobe_literal.wardrobePrice - mirrorPrice;
		wardrobe_literal.showAmt(newPrice,(newPrice-oldPrice));
		wardrobe_literal.wardrobeSepPrice[pos] = newPrice;
	},
	addMirror: function (side) {
		var pos = $('#wardrobeConfigure .selected-type').data('wardrobe_position');
		var type = $('#wardrobeConfigure .selected-type').data('wardrobe_type');
		var oldPrice = wardrobe_literal.wardrobeSepPrice[pos];
		var mirrorPrice = wardrobe_literal.mirrorPrice;
		var newPrice = oldPrice+mirrorPrice;
		if(typeof wardrobe_literal.finalObj[pos][type].mirror == 'undefined') {
			wardrobe_literal.finalObj[pos][type].mirror = 1;
			wardrobe_literal.finalObj[pos][type].mirror_side = side;
		}
		else {
			if(wardrobe_literal.finalObj[pos][type].mirror == 1) {
				wardrobe_literal.finalObj[pos][type].mirror = 2;
				wardrobe_literal.finalObj[pos][type].mirror_side = 'both';
			}
			else {
				wardrobe_literal.finalObj[pos][type].mirror = 1;
				wardrobe_literal.finalObj[pos][type].mirror_side = side;
			}
		}
		wardrobe_literal.wardrobePrice = wardrobe_literal.wardrobePrice + mirrorPrice;
		wardrobe_literal.showAmt(newPrice,(newPrice-oldPrice));
		wardrobe_literal.wardrobeSepPrice[pos] = newPrice;
	},
    initialize: function () {
        dataLayer.push({'event': 'Wardrobe_Home_Page', 'page': 'Landing page'});
        
		//wardrobe_literal.wardRobeSort();
        $(window).on("debouncedresize", function (event) {
            wardrobe_literal.arrangePageElements();
        });
        wardrobe_literal.arrangePageElements();
        //Click Outside Configure Div Click Event Closes options and shows Final Product
        $('body').on('click tap', '#wardrobeWorkArea, #wardrobeAddOn', function () {
            if ($('#wardrobeWorkArea').css("display") != "none") {
                $('#wardrobeConfigure .wardrobe-configure-container').stop(true, true);
                $('#customizeWardrobe').hide();
                $('#wardrobeAddSelection').fadeIn('fast');
                $('#wardrobeWorkArea').find('.wardrobe-delete-btn').hide();
                $('#wardrobeAddOn .wardrobe-add-on-container').css('visibility', 'visible');
                $('#wardrobeConfigure .wardrobe-configure-container').removeClass('selected-type');
                $('#wardrobeConfigure .wardrobe-configure-container').animate({'transform': "scale(1)"}, {duration: 300});
                $('#wardrobeConfigure .wardrobe-configure-container').css({'left': 'auto', 'top': 'auto', 'opacity': '1', 'position': 'relative'});
                if (wardrobe_literal.dim_flag == 0 && wardrobe_literal.mer_flag == 0) {
                    wardrobe_literal.doorClose();
                }
                $( "#wardrobeConfigure" ).sortable( "enable" );
                $('.wardrobe-horizontal-scroll-area').niceScroll(wardrobe_literal.scrollDefaults).resize();
                wardrobe_literal.costHide();
            }
        });

        $('body').on('click tap', '#wardrobeAddOn .wardrobe-add-on-container', function (event) {
            event.stopPropagation();
        });

        $('body').on('click tap', '#wardrobeConfigure .selected-type', function (event) {
            event.stopPropagation();
        });
        
        /* wardrobe work area start */
        $('body').on('click tap', '#wardrobeConfigure .wardrobe-configure-container:not(.selected-type)', function (event) {
			event.stopPropagation();
            //$(this).find('.wardrobe-loft-section-container')
            $('#wardrobeConfigure .wardrobe-configure-container').stop(true, true);
            if (!$('#wardrobeConfigure .wardrobe-configure-container').hasClass('selected-type')) {
				var tmpShPrice = wardrobe_literal.roundToTwo(wardrobe_literal.wardrobeSepPrice[$(this).data('wardrobe_position')]);
				$('.wardrobe-total-cost-value span').html('Rs. ' + wardrobe_literal.formatPrice(tmpShPrice));
				
                $('#wardrobeAddSelection').fadeOut('fast');
                $('#wardrobeAddOn .wardrobe-add-on-container').css('visibility', 'hidden');
                $('#wardrobeConfigure .wardrobe-configure-container').css({'left': 'auto', 'top': 'auto', 'position': 'relative'});
                $('#wardrobeConfigure .wardrobe-configure-container').animate({'transform': 'scale(1)', 'opacity': 0.25}, 300);
                $('#wardrobeWorkArea').find('.wardrobe-delete-btn').hide();
                $(this).animate({'transform': 'scale(1.074)', 'opacity': 1}, {duration: 800, queue: false});
                $(this).addClass('selected-type').siblings().removeClass('selected-type');
                $( "#wardrobeConfigure" ).sortable( "disable" ); 		
                if ($('.selected-type').length) {
                    wardrobe_literal.centerContent();
                    $('.wardrobe-horizontal-scroll-area').getNiceScroll().remove();
                }
                wardrobe_literal.resetWardrobe();
                wardrobe_literal.costShow();
                if ($(this).hasClass('single-door')) {
                    $('#wardrobeLoftHeightContainer').find('.loft-single-door-layout').show();
                    $('#wardrobeLoftHeightContainer').find('.loft-double-door-layout').hide();
                    $('#wardrobeLoftColorDesign').find('.loft-single-door-color').show();
                    $('#wardrobeLoftColorDesign').find('.loft-double-door-color').hide();
                    $('#single_door_data').show();
                    $('#double_door_data, #open_shelves_data').hide();
                }
                if ($(this).hasClass('double-door')) {
                    $('#wardrobeLoftHeightContainer').find('.loft-double-door-layout').show();
                    $('#wardrobeLoftHeightContainer').find('.loft-single-door-layout').hide();
                    $('#wardrobeLoftColorDesign').find('.loft-double-door-color').show();
                    $('#wardrobeLoftColorDesign').find('.loft-single-door-color').hide();
                    $('#double_door_data').show();
                    $('#single_door_data, #open_shelves_data').hide();
                }
                if ($(this).hasClass('open-shelves')) {
                    $('#wardrobeLoftHeightContainer').find('.loft-single-door-layout').show();
                    $('#wardrobeLoftHeightContainer').find('.loft-double-door-layout').hide();
                    $('#wardrobeLoftColorDesign').find('.loft-single-door-color').show();
                    $('#wardrobeLoftColorDesign').find('.loft-double-door-color').hide();
                    $('#open_shelves_data').show();
                    $('#double_door_data, #single_door_data').hide();
                }

                if ($(this).hasClass('loft-fst-opt') || $(this).hasClass('loft-sec-opt')) {
                    $('#loft_opts_data').show();
                } else {
                    $('#loft_opts_data').hide();
                }

                $('#wardrobeConfigure .wardrobe-skeleton-container img, #wardrobeConfigure .loft-skeleton-container img').each(function () {
                    var divSrc = $(this).attr('src');
                    if (wardrobe_literal.dim_flag == 1) {
                        $(this).attr('data-dim', 'off');
                        $(this).attr('src', divSrc.replace('-dim.png', '.png'));
                    }
                    if (wardrobe_literal.mer_flag == 1) {
                        $(this).attr('data-mer', 'off');
                        $(this).attr('src', divSrc.replace('-mer.png', '.png'));
                    }
                });
                wardrobe_literal.dim_flag = 0;
                wardrobe_literal.mer_flag = 0;
                $('.action-dimension').html('Show </br> Dimension');
                $('.action-merchandise').html('Show </br> Merchandise');
                $('.action-merchandise, .action-dimension').removeClass('active-btn');
                wardrobe_literal.dimHide();
                if (!(typeof wardrobe_literal.finalObj[$(this).data('wardrobe_position')][$(this).data('wardrobe_type')].loft != 'undefined' && typeof wardrobe_literal.finalObj[$(this).data('wardrobe_position')][$(this).data('wardrobe_type')].loft != 'yes')) {
                    $('#wardrobeLoftDelete').hide();
                    /* delete wardrobe_literal.finalObj[$(this).data('wardrobe_position')][$(this).data('wardrobe_type')].loft;
                     delete wardrobe_literal.finalObj[$(this).data('wardrobe_position')][$(this).data('wardrobe_type')].loft_door;
                     delete wardrobe_literal.finalObj[$(this).data('wardrobe_position')][$(this).data('wardrobe_type')].loft_frame; */
                }
                else {
                    $('#wardrobeLoftDelete').show();
                }
				
				//Loft Section
				
				if(typeof wardrobe_literal.finalObj[$(this).data('wardrobe_position')][$(this).data('wardrobe_type')].loft != 'undefined') {
					var heightId = $(this).find('.loft-skeleton-container').data('height_id');
					var loftType = $(this).find('.loft-skeleton-container').data('loft_type');
					//Select loft Height in configure tab
					$('#wardrobeLoftHeightDesign .'+loftType).find('.wardrobe-option-content').each(function(){
						if($(this).hasClass(loftType+'_'+heightId)) {
							$(this).find('input[type=radio]').prop('checked', true);
							$(this).addClass('selected-option');
						}
						else {
							$(this).find('input[type=radio]').prop('checked', false);
							$(this).removeClass('selected-option');
						}
						
					});
				}
				//$('#wardrobeLoftHeightDesign .'+loftType)
				/* $('.'+loftType+'_'+heightId).addClass('selected-option');
				$('#'+loftType+'_'+heightId).find('input[type=radio]').prop('checked', true); */
            }
            else {
				$('#wardrobeWorkArea').click();
            }
        });
        /* wardrobe work area end */

        /* wardrobe door hide and show click event */
        $('body').on('click tap', '.action-door-toggle', function () {
            var materialText = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]['customOptionAttributes'][wardrobe_literal.currentMaterialId].frontend_lable;
            
			if ($(".wardrobe-configure-container .door-skeleton-container").css("display") == "block") {
                wardrobe_literal.addEventTracker('Hide Door', materialText);            
                wardrobe_literal.doorOpen();
            } else {
                wardrobe_literal.addEventTracker('Show Door', materialText);
                wardrobe_literal.doorClose();
            }
        });

        /*  dimension link click functionality  */
        $('body').on('click tap', '.action-dimension', function () {
            var action = 'Hide  Dimension';
            var materialText = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]['customOptionAttributes'][wardrobe_literal.currentMaterialId].frontend_lable;
			$('#wardrobeConfigure .wardrobe-skeleton-container img, #wardrobeConfigure .loft-skeleton-container img').each(function () {
                var src = $(this).attr('src');
                if (!$(this).attr('data-dim') || $(this).attr('data-dim') == 'off') {
                    action = 'Show  Dimension';
                    $(this).attr('data-dim', 'on');
                    wardrobe_literal.dim_flag = 1;
                    if ($(this).attr('data-mer') == 'on') {
                        $(this).attr('src', src.replace('-mer.png', '-dim.png'));
                        $(this).attr('data-mer', 'off');
                        wardrobe_literal.mer_flag = 0;
                        $('.action-merchandise').html('Show </br> Merchandise');
                        $('.action-dimension').html('Hide </br> Dimensions');
                        $('.action-merchandise').removeClass('active-btn');
                    } else {
                        $(this).attr('src', src.replace('.png', '-dim.png'));
                        $('.action-dimension').html('Hide </br> Dimensions');
                    }
                    $('.action-dimension').addClass('active-btn');
                    wardrobe_literal.dimShow();
                }
                else if ($(this).attr('data-dim') == 'on') {
                    $(this).attr('data-dim', 'off');
                    wardrobe_literal.dim_flag = 0;
                    $(this).attr('src', src.replace('-dim.png', '.png'));
                    $('.action-dimension').html('Show </br> Dimensions');
                    $('.action-dimension').removeClass('active-btn');
                    wardrobe_literal.dimHide();
                }
            });
            
            wardrobe_literal.addEventTracker(action,materialText);
            wardrobe_literal.doorOpen();
        });

        /* merchandise link click functionality */
        $('body').on('click tap', '.action-merchandise', function () { 
            var action = 'Hide Merchandise';
            var materialText = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]['customOptionAttributes'][wardrobe_literal.currentMaterialId].frontend_lable;
			
            $('#wardrobeConfigure .wardrobe-skeleton-container img, #wardrobeConfigure .loft-skeleton-container img').each(function () {
				var src = $(this).attr('src');
                if (!$(this).attr('data-mer') || $(this).attr('data-mer') == 'off') {
                    action = 'Show Merchandise';
                    $(this).attr('data-mer', 'on');
                    wardrobe_literal.mer_flag = 1;
                    if ($(this).attr('data-dim') == 'on') {
                        $(this).attr('src', src.replace('-dim.png', '-mer.png'));
                        $(this).attr('data-dim', 'off');
                        wardrobe_literal.dim_flag = 0;
                        $('.action-dimension').html('Show </br> Dimensions');
                        $('.action-merchandise').html('Hide </br> Merchandise');
                        $('.action-dimension').removeClass('active-btn');
                    } else {
                        $(this).attr('src', src.replace('.png', '-mer.png'));
                        $('.action-merchandise').html('Hide </br> Merchandise');
                    }
                    $('.action-merchandise').addClass('active-btn');
                    wardrobe_literal.dimHide();
                }
                else if ($(this).attr('data-mer') == 'on') {
                    $(this).attr('data-mer', 'off');
                    wardrobe_literal.mer_flag = 0;
                    $(this).attr('src', src.replace('-mer.png', '.png'));
                    $('.action-merchandise').html('Show </br> Merchandise');
                    $('.action-merchandise').removeClass('active-btn');
                }
            });
            
            wardrobe_literal.addEventTracker(action, materialText);            
            wardrobe_literal.doorOpen();
        });

        /* choose door Style */
        //Choosing Wardrobe Door Style Click Event (Applying Door Style)
        $('body').on('click tap', '.wardrobeDoorDesignStyleContainer .wardrobe-option-content', function (event) {
            var doorSelected = $(this).find('.wardrobe-option-content-img img').attr('src');
            var passData = {};
            passData['wardrobe_type'] = $('.selected-type').data('wardrobe_type');
            passData['wardrobe_position'] = $('.selected-type').data('wardrobe_position');
            passData['style_id'] = $(this).data('opt_id');
            passData['wardrobe_part'] = $(this).data('wardrobe_part');
            passData['current_sku'] = $(this).data('sku');
            if (passData['current_sku'] != $('#wardrobeConfigure .selected-type').find('.door-skeleton-container').data('door_sku')) {
                var resSku = wardrobe_literal.updateWardrobeStyleSection(passData);
                if (resSku == '') {
                    alert('Something Went Wrong');
                }
                else {
                    //Styling Part
                    $(this).addClass('selected-option').siblings().removeClass('selected-option');
                    $('.wardrobeDoorDesignMirrorContainer input[type="checkbox"]').attr('checked', false);

                    $('#wardrobeConfigure .selected-type .door-shutter-container-left-d').removeData('image');
                    $('.selected-type .door-shutter-container-right-d').removeData('image');

                    $('#wardrobeConfigure .selected-type .door-shutter-container-left-d').attr({
                        'src': doorSelected,
                        'data-image': doorSelected
                    });

                    $('#wardrobeConfigure .selected-type .door-shutter-container-right-d').attr({
                        'src': doorSelected,
                        'data-image': doorSelected,
                    });
                    $('#wardrobeConfigure .selected-type').find('.door-skeleton-container').attr({
                        'data-door_sku': passData['current_sku'],
                        'data-door_color_sku': resSku,
                    });
                    $('#' + $(this).data('id')).show().siblings().hide();
                    
					//Trigger click on color tab so that color according to selected style will be applied
					
					//To change color according to the Selected Style Start
					var tmpColorType = $("#" + $(this).data('id')).find(".wardrobe-option-content[data-sku='" + resSku + "']").data('color_type');
                    $("#" + $(this).data('id')).find("#"+passData['wardrobe_type']+"_colortype_"+tmpColorType).click();
					$("#" + $(this).data('id')).find('.wardrobe-option-content').removeClass('selected-option');
					$("#" + $(this).data('id')).find(".wardrobe-option-content[data-sku='" + resSku + "']").addClass('selected-option');
					
					var doorBgSelected = $("#" + $(this).data('id')).find(".wardrobe-option-content[data-sku='" + resSku + "']").attr('style');

					$('.selected-type .door-skeleton-container').attr('style', doorBgSelected);
					
					//$("#" + $(this).data('id')).find(".wardrobe-option-content[data-sku='" + resSku + "']").click();
					
					//In case of material having same frame color that of door
					if(wardrobe_literal.materialFrameIdenticalFlag) {
						$('.selected-type .wardrobe-skeleton-container').attr('style', doorBgSelected);
					}
					//To change color according to the Selected Style End
                }
            }
			
		});

        /* choose door texture or color */
        //Wardrobe Door Color Click Event (Applying Door Color)
        $('body').on('click tap', '.wardrobeDoorDesignColorContainer .wardrobe-option-content', function () {
            var passData = {};
            passData['wardrobe_type'] = $('.selected-type').data('wardrobe_type');
            passData['wardrobe_position'] = $('.selected-type').data('wardrobe_position');
            passData['wardrobe_part'] = $(this).data('wardrobe_part');
            passData['current_sku'] = $(this).data('sku');
            passData['color_option_id'] = $(this).data('color_option_id');
            passData['style_id'] = $(this).data('option_id');
            passData['color_type'] = $(this).data('color_type');
            if (passData['current_sku'] != $('#wardrobeConfigure .selected-type').find('.door-skeleton-container').data('door_color_sku')) {
                var resSku = wardrobe_literal.updateWardrobeColorSection(passData);
                if (typeof resSku != 'undefined' && resSku != '') {

                    //Styling Part
                    var doorBgSelected = $(this).attr('style');
                    /* switch (passData['wardrobe_type']) {
                        case 'single_door':
                            $('#open_single_door_color_' + passData['style_id']).find('.wardrobe-option-content').removeClass('selected-option');
                            break;
                        case 'double_door':
                            $('#open_double_door_color_' + passData['style_id']).find('.wardrobe-option-content').removeClass('selected-option');
                            break;
                    } */
					$('#open_'+passData.wardrobe_type+'_color_' + passData['style_id']).find('.wardrobe-option-content').removeClass('selected-option');
					
                    $(this).addClass('selected-option').siblings();
                    if ($('.selected-type').length >= 1) {
                        $('.selected-type .door-skeleton-container').attr('style', doorBgSelected);
                    }
					if(wardrobe_literal.materialFrameIdenticalFlag) {
						$('.selected-type .wardrobe-skeleton-container').attr('style', doorBgSelected);
					}
                }
                else {
                    alert('Something went wrong');
                }
            }
        });

        /* choose wardrobe skeleton (Frame) */
        //Choosing Wardrobe Inside(Frame) Layout Click Event (Applying Frame)	
        $('body').on('click tap', '.wardrobeInternalDesignLayoutContainer .wardrobe-option-content', function () {
            var passData = {};
            passData['wardrobe_type'] = $('.selected-type').data('wardrobe_type');
            passData['wardrobe_position'] = $('.selected-type').data('wardrobe_position');
            passData['style_id'] = $(this).data('opt_id');
            passData['wardrobe_part'] = $(this).data('wardrobe_part');
            passData['current_sku'] = $(this).data('sku');
            if (passData['current_sku'] != $('#wardrobeConfigure .selected-type').find('.wardrobe-skeleton-container').data('frame_sku')) {
                var resSku = wardrobe_literal.updateWardrobeStyleSection(passData);
                if (resSku == '') {
                    alert('Something Went Wrong');
                }
                else {
                    //Styling Part
                    var skeletonSelected = $(this).find('.wardrobe-option-content-img img').attr('src');
                    var elemContent = $('.selected-type .wardrobe-skeleton-container').find('img');
                    $(this).addClass('selected-option').siblings().removeClass('selected-option');
                    $(elemContent).attr('src', skeletonSelected);
                    $('#' + $(this).data('id')).show().siblings().hide();
					
					if(!wardrobe_literal.materialFrameIdenticalFlag) {
						$("#" + $(this).data('id')).find('.wardrobe-option-content').removeClass('selected-option');
						$("#" + $(this).data('id')).find(".wardrobe-option-content[data-sku='" + resSku + "']").addClass('selected-option');
						
						var doorBgSelected = $("#" + $(this).data('id')).find(".wardrobe-option-content[data-sku='" + resSku + "']").attr('style');

						$('.selected-type .wardrobe-skeleton-container').attr('style', doorBgSelected);
					}
					//Trigger click on color tab so that color according to selected style will be applied
                    //$("#" + $(this).data('id')).find(".wardrobe-option-content[data-sku='" + resSku + "']");
                }
            }
        });

        /* choose wardrobe internal color */
        //Wardrobe Frame Color Click Event (Applying Frame Color)
        $('body').on('click tap', '.wardrobeInternalDesignColorContainer .wardrobe-option-content', function () {

            var passData = {};
            passData['wardrobe_type'] = $('.selected-type').data('wardrobe_type');
            passData['wardrobe_position'] = $('.selected-type').data('wardrobe_position');
            passData['style_id'] = $(this).data('opt_id');
            passData['wardrobe_part'] = $(this).data('wardrobe_part');
            passData['color_option_id'] = $(this).data('child_opt_id');
            passData['current_sku'] = $(this).data('sku');
            if (passData['current_sku'] != $('#wardrobeConfigure .selected-type').find('.wardrobe-skeleton-container').data('frame_color_sku')) {
                var resSku = wardrobe_literal.updateWardrobeColorSection(passData);
                if (typeof resSku != 'undefined' && resSku != '') {
                    var bgSelected = $(this).attr('style');
                    $(this).addClass('selected-option').siblings().removeClass('selected-option');
                    if ($('.selected-type').length >= 1) {
                        $('.selected-type .wardrobe-skeleton-container').attr('style', bgSelected);
                    }
                }
                else {
                    alert('Something went wrong');
                }
            }
        });

        /* open shelves option functionality */
        //Choosing Wardrobe Inside(Frame) Layout Click Event (open-shelves) (Applying Frame)
        $('body').on('click tap', '#wardrobeOpenShelvesLayoutContainer .wardrobe-option-content', function () {

            var passData = {};
            passData['wardrobe_type'] = $('.selected-type').data('wardrobe_type');
            passData['wardrobe_position'] = $('.selected-type').data('wardrobe_position');
            passData['style_id'] = $(this).data('opt_id');
            passData['wardrobe_part'] = $(this).data('wardrobe_part');
            passData['current_sku'] = $(this).data('sku');
            if (passData['current_sku'] != $('#wardrobeConfigure .selected-type').find('.wardrobe-skeleton-container').data('frame_sku')) {
                var resSku = wardrobe_literal.updateWardrobeStyleSection(passData);

                if (resSku == '') {
                    alert('Something went wrong');
                }
                else {
                    //Styling Part
                    var skeletonSelected = $(this).find('.wardrobe-option-content-img img').attr('src');
                    var elemContent = $('.selected-type .wardrobe-skeleton-container').find('img');
                    $(this).addClass('selected-option').siblings().removeClass('selected-option');
                    $(elemContent).attr('src', skeletonSelected);
					
					
					//To change color according to the Selected Style Start
					var tmpColorType = $("#" + $(this).data('id')).find(".wardrobe-option-content[data-sku='" + resSku + "']").data('color_type');
                    //$("#" + $(this).data('id')).find("#"+passData['wardrobe_type']+"_colortype_"+tmpColorType).click();
					$("#" + $(this).data('id')).find('.wardrobe-option-content').removeClass('selected-option');
					$("#" + $(this).data('id')).find(".wardrobe-option-content[data-sku='" + resSku + "']").addClass('selected-option');
					
					var doorBgSelected = $("#" + $(this).data('id')).find(".wardrobe-option-content[data-sku='" + resSku + "']").attr('style');

					$('.selected-type .wardrobe-skeleton-container').attr('style', doorBgSelected);
                }
            }
        });

        $('body').on('click tap', '#wardrobeOpenShelvesExternalDesign .wardrobe-option-content', function () {
            var passData = {};
            passData['wardrobe_type'] = $('.selected-type').data('wardrobe_type');
            passData['wardrobe_position'] = $('.selected-type').data('wardrobe_position');
            passData['style_id'] = $(this).data('opt_id');
            passData['wardrobe_part'] = $(this).data('wardrobe_part');
            passData['color_option_id'] = $(this).data('child_opt_id');
            passData['current_sku'] = $(this).data('sku');
            if (passData['current_sku'] != $('#wardrobeConfigure .selected-type').find('.wardrobe-skeleton-container').data('frame_color_sku')) {
                var resSku = wardrobe_literal.updateWardrobeColorSection(passData);
                if (typeof resSku != 'undefined' && resSku != '') {
                    //Styling Part
                    var bgSelected = $(this).attr('style');
                    $('#open_open_frame_color_' + passData['style_id']).find('.wardrobe-option-content').removeClass('selected-option');

                    $(this).addClass('selected-option').siblings().removeClass('selected-option');
                    if ($('.selected-type').length >= 1) {
                        $('.selected-type .wardrobe-skeleton-container').attr('style', bgSelected);
                    }

                    //Trigger click on color tab so that color according to selected style will be applied
                    $("#" + $(this).data('id')).find(".wardrobe-option-content[data-sku='" + resSku + "']");
                }
                else {
                    alert('Something went wrong');
                }
            }
        });
        /* open shelves option end */

        /*  mirror functionality start */
        //Wardrobe Door Mirror Click Event (Applying Mirror on Door)
        $('body').on('click tap', '.wardrobeDoorDesignMirrorContainer .wardrobe-option-content, input', function () {
            var selectedMirror = $(this).find('.wardrobe-option-content-img img').attr('src');
            var doorStyleLeft = $('.selected-type .door-shutter-container-left-d').data('image');
            var doorStyleRight = $('.selected-type .door-shutter-container-right-d').data('image');
			if (!$(this).attr('data-toggled') || $(this).attr('data-toggled') == 'off') {//Add Mirror
				
                $(this).attr('data-toggled', 'on');
                $('.selected-type').addClass('mirror-active');
                $(this).find('input[type=checkbox]').prop('checked', true);
                if ($(this).hasClass('left-mirror-container')) {
                    $('.selected-type .door-shutter-container-left-d').attr('src', selectedMirror);
					wardrobe_literal.addMirror('left');
                }
                else if ($(this).hasClass('right-mirror-container')) {
                    $('.selected-type .door-shutter-container-right-d').attr('src', selectedMirror);
					wardrobe_literal.addMirror('right');
                }
            }
            else if ($(this).attr('data-toggled') == 'on') {//Remove Mirror
                $(this).attr('data-toggled', 'off');
                $(this).find('input[type=checkbox]').prop('checked', false);
                $('.selected-type').removeClass('mirror-active');
                if ($(this).hasClass('left-mirror-container')) {
                    $('.selected-type .door-shutter-container-left-d').attr('src', doorStyleLeft);
					wardrobe_literal.removeMirror('right');
                }
                else if ($(this).hasClass('right-mirror-container')) {
                    $('.selected-type .door-shutter-container-right-d').attr('src', doorStyleRight);
					wardrobe_literal.removeMirror('left');
                }
            }
        });

        $('body').on('change', '.wardrobeDoorDesignMirrorContainer input[type="checkbox"]', function () {
            $(this).closest('.wardrobe-option-content').click();
        });
        /* mirror functionality end */

        /* change handle functionality */
        //Wardrobe Door Handle Click Event (Applying Handle on Door)
        $('body').on('click tap', '#wardrobeSingleDoorDesignHandleContainer .wardrobe-option-content', function () {
			var pos = $('#wardrobeConfigure .selected-type').data('wardrobe_position');
			var type = $('#wardrobeConfigure .selected-type').data('wardrobe_type');
            if ($(this).hasClass('left-handle-container')) {
				wardrobe_literal.finalObj[pos][type].handle_position = "right";
                $('.selected-type .door-shutter-container-right-h').addClass('handle-reverse');
                $(this).find('input[type=radio]').prop('checked', true);
            }
            else if ($(this).hasClass('right-handle-container')) {
				wardrobe_literal.finalObj[pos][type].handle_position = "left";
                $('.selected-type .door-shutter-container-right-h').removeClass('handle-reverse');
                $(this).find('input[type=radio]').prop('checked', true);
            }
        });

        /* loft option click functionality start */
        $('body').on('click tap', '#wardrobeLoftHeightContainer .wardrobe-option-content', function () {


            if ($('#wardrobeConfigure .selected-type').find('.loft-skeleton-container').data('opt_id') != $(this).data('opt_id')) {

                var passData = {};
                passData['wardrobe_type'] = $('#wardrobeConfigure .selected-type').data('wardrobe_type');
                passData['wardrobe_position'] = $('#wardrobeConfigure .selected-type').data('wardrobe_position');
                passData['style_id'] = $(this).data('opt_id');
                passData['height_id'] = $(this).data('height_id');
                passData['wardrobe_part'] = $(this).data('wardrobe_part');
                passData['current_sku'] = $(this).data('sku');
                var resSku = wardrobe_literal.updateLoftHeight(passData);

                if (typeof resSku == 'undefined' || resSku == '') {
                    alert('Something went wrong');
                }
                else {
                    var skeletonSelected = $(this).find('.wardrobe-option-content-img img').attr('src');
                    var elemContent = $('.selected-type .loft-skeleton-container').find('img');
                    $(this).addClass('selected-option').siblings().removeClass('selected-option');
                    $(elemContent).attr('src', skeletonSelected);

                    if ($(this).hasClass('loft-fst-height-container')) {
                        $('.wardrobe-configure-container.selected-type').addClass('loft-fst-opt').removeClass('loft-sec-opt');
                        $(this).find('input[type=radio]').prop('checked', true);
                    }
                    else if ($(this).hasClass('loft-sec-height-container')) {
                        $('.wardrobe-configure-container.selected-type').addClass('loft-sec-opt').removeClass('loft-fst-opt');
                        $(this).find('input[type=radio]').prop('checked', true);
                    }
					
					//To change color according to the Selected Style Start
					var tmpColorType = $("#" + $(this).data('id')).find(".wardrobe-option-content[data-sku='" + resSku + "']").data('color_type');
                    //$("#" + $(this).data('id')).find("#"+passData['wardrobe_type']+"_colortype_"+tmpColorType).click();
                    $("#"+passData.wardrobe_type+'_loft_'+passData.height_id+'_colortype_'+tmpColorType).click();
					$("#" + $(this).data('id')).find('.wardrobe-option-content').removeClass('selected-option');
					$("#" + $(this).data('id')).find(".wardrobe-option-content[data-sku='" + resSku + "']").addClass('selected-option');
					
					
					
					
					var tmpStyle = 'background-image: url(\'' + root_url + '/' + wardrobe_image_dir + resSku + '.jpg?v=0.'+wardrobeImageVersion+'\')';
					
					var doorStyle = root_url + '/' + wardrobe_image_dir + wardrobe_literal.changedLoftDoorColorSku + '.png?v=0.'+wardrobeImageVersion;
					wardrobe_literal.changedLoftDoorColorSku = '';
					//$("#wardrobeConfigure .wardrobe-configure-container[data-wardrobe_position='" + index + "']").find('.loft-door-container').attr('style', tmpStyle);
					$('.selected-type .loft-door-container').attr('style', tmpStyle);
					
					if(passData.wardrobe_type == 'double_door') {
						$('.selected-type .loft-door-shutter-container-left-d').attr('src',doorStyle);
						$('.selected-type .loft-door-shutter-container-right-d').attr('src',doorStyle);
					}
					if(passData.wardrobe_type == 'single_door' || passData.wardrobe_type == 'open_shelves') {
						$('.selected-type .loft-door-shutter-container-right-d').attr('src',doorStyle);
					}
					
					if(wardrobe_literal.materialFrameIdenticalFlag) {
						$('.selected-type .loft-skeleton-container').attr('style', tmpStyle);
					}
					
					$('#wardrobeLoftHeightDesign h2').click();
					
                    /* $('#wardrobeConfigure .selected-type').find('.loft-skeleton-container').data('opt_id', $(this).data('opt_id'));
                    $('#wardrobeConfigure .selected-type').find('.loft-skeleton-container').data('frame_sku', $(this).data('sku'));

                    $("#" + $(this).data('id')).find(".wardrobe-option-content[data-sku='" + resSku + "']").click(); */
                }
            }
        });

        $('body').on('click tap', '#wardrobeLoftColorDesign .wardrobe-option-content', function () {

            var passData = {};
            passData['wardrobe_type'] = $('#wardrobeConfigure .selected-type').data('wardrobe_type');
            passData['wardrobe_position'] = $('#wardrobeConfigure .selected-type').data('wardrobe_position');
            passData['color_option_id'] = $(this).data('child_opt_id');
            passData['height_id'] = $(this).data('height_id');
            passData['wardrobe_part'] = $(this).data('loft_part');
            passData['current_sku'] = $(this).data('sku');
            if (passData['current_sku'] != $('#wardrobeConfigure .selected-type').find('.loft-door-container').data('color_sku')) {
                var resSku = wardrobe_literal.updateLoftColor(passData);

                if (resSku == 'undefined' || resSku == '') {
                    alert('Something went wrong');
                }
                else {
                    var bgSelected = $(this).attr('style');

                    switch (passData['wardrobe_type']) {
                        case 'single_door':
						case 'open_shelves':
                            $('#single_door_' + passData['height_id']).find('.wardrobe-option-content').removeClass('selected-option');
                            break;
                        case 'double_door':
                            $('#double_door_' + passData['height_id']).find('.wardrobe-option-content').removeClass('selected-option');
                            break;
                    }
                    $(this).addClass('selected-option');
                    if ($('.selected-type').length >= 1) {
                        $('.selected-type .loft-door-container').attr('style', bgSelected);
						if(wardrobe_literal.materialFrameIdenticalFlag) {
							$('.selected-type .loft-skeleton-container').attr('style', bgSelected);
						}
                    }
                }
            }




        });
        /* loft option click functionality end */


        /* wardrobe door click functionality start */
        // Wardrobe Door Click Event (Sng,Dbl)
        $('body').on('click tap', '.wardrobeDoorDesign h2', function () {
	    var materialText = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]['customOptionAttributes'][wardrobe_literal.currentMaterialId].frontend_lable;
            wardrobe_literal.addEventTracker('Selection|Click', materialText, 'event Selection|Click');
            
            $('.wardrobeInternalDesignTabSwitcher, #customizeWardrobe .tab-active').hide();
            $('.wardrobeDoorDesignTabSwitcher').fadeIn();
            $('#wardrobeLoftColorDesign, #wardrobeLoftHeightDesign').fadeOut();
            var openStyle = $(this).parent().attr('id');
            
			wardrobe_literal.showSelectedOptionsOfOpen(this,"door");
            $(this).css('pointer-events', 'none');
            $('.wardrobeInternalDesign h2').css('pointer-events', 'auto');
            $('#' + openStyle + 'Style').addClass('active-menu-main').siblings().removeClass('active-menu-main');
            $('.wardrobeDoorDesign .wardrobe-content-scroll-area').niceScroll(wardrobe_literal.scrollDefaultsHide).resize();
            
            wardrobe_literal.doorClose(); 
        });

        //Wardrobe Door First Menu Click Event(Style,Color,Mirror,Handle)(Sng,Dbl)
        $('body').on('click tap', '.wardrobeDoorDesignTabSwitcher li:not(.active-menu-main)', function () {
            
            var id = $(this).attr('id');
            var tabName = $(this).data('tab_name');
            if(typeof tabName !== "undefined") {
                var materialText = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]['customOptionAttributes'][wardrobe_literal.currentMaterialId].frontend_lable;
                wardrobe_literal.addEventTracker('Selection|Click', materialText, 'event Selection|Click');
            }
            $(this).addClass('active-menu-main').siblings().removeClass('active-menu-main');
			
            $('.wardrobeInternalDesign').find('.tab-active').hide();
            $('.wardrobeDoorDesign').find('.tab-active').stop(true, true).slideUp('fast');
			var tmpObj = wardrobe_literal.showSelectedOptionsOfOpen(this,'door',tabName);
            $('#' + id + "Container").stop(true, true).slideDown(700, function () {
				if(tabName == 'color') {
					tmpObj.click();
				}
				$('.wardrobeDoorDesign .wardrobe-content-scroll-area').niceScroll(wardrobe_literal.scrollDefaultsHide).resize();
                //$('#' + id + "Container").find('.wardrobeDoorDesignColorTabSwitcher li.active-menu').click();
                // $(this).parent().find('.nav-cursor-move').animate({
                 // left: $('.wardrobeDoorDesignColorTabSwitcher .active-menu').position().left,
                 // width: $('.wardrobeDoorDesignColorTabSwitcher .active-menu').outerWidth()
                 // }, {
                 // duration: 350
                 // });
            });
            wardrobe_literal.doorClose();
        });

        //Wardrobe Door Color Tab Submenu (Exclusive, Solid.. )click Event (Sng,Dbl)
        $('body').on('click', '.wardrobeDoorDesignColorTabSwitcher li', function () {
            var liIndex = $(this).index();
            var position = $(this).position();
            $(this).closest('.wardobe-door-color-builder').find('.wardrobe-door-color-switcher-container').children().hide();
            $(this).closest('.wardobe-door-color-builder').find('.wardrobe-door-color-switcher-container').children().eq(liIndex).show();
            $(this).addClass('active-menu').siblings().removeClass('active-menu');
            $(this).parent().find('.nav-cursor-move').animate({
                left: position.left,
                width: $(this).outerWidth()
            }, {
                duration: 350
            });

        });

        //Wardrobe Door Go Back Click Event (Sng,Dbl)
        $('body').on('click tap', '.wardrobeDoorDesign .wardrobe-go-back', function () {
            $('#customizeWardrobe .customize-wardrobe-option').hide(700, function () {
                $('.wardrobeDoorDesignTabSwitcher').fadeOut(700);
            });
            $('.wardrobeDoorDesign h2').css('pointer-events', 'auto');

            var elem = $('#wardrobeConfigure .wardrobe-configure-container.selected-type');
            if ($(elem).hasClass('loft-fst-opt') || $(elem).hasClass('loft-sec-opt')) {
                $('#wardrobeLoftColorDesign, #wardrobeLoftHeightDesign').fadeIn();
            }
        });
        /* wardrobe door click functionality end */

        /* wardrobe insides functionality start */
        // Wardrobe Inside Click Event (Sng,Dbl)
        $('body').on('click tap', '.wardrobeInternalDesign h2', function () {
            var materialText = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]['customOptionAttributes'][wardrobe_literal.currentMaterialId].frontend_lable;
            wardrobe_literal.addEventTracker('Selection|Click', materialText, 'event Selection|Click');
			wardrobe_literal.showSelectedOptionsOfOpen(this,"frame");
            
        });

        //Wardrobe Inside First Menu Click Event(Layout,Color)(Sng,Dbl)
        $('body').on('click tap', '.wardrobeInternalDesignTabSwitcher li:not(.active-menu-main)', function () {
            
            var materialText = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]['customOptionAttributes'][wardrobe_literal.currentMaterialId].frontend_lable;
            wardrobe_literal.addEventTracker('Selection|Click', materialText, 'event Selection|Click');
            
			//wardrobe_literal.showSelectedOptionsOfOpen(this,"frame","color");
            var obj = $(this);
			var id = obj.attr('id');
			$('.wardrobeDoorDesign').find('.tab-active').hide();
            $(this).addClass('active-menu-main').siblings().removeClass('active-menu-main');
            $('.wardrobeInternalDesign').find('.tab-active').stop(true, true).slideUp('fast');
			if(obj.data('tab_name') == 'color'){
				var selectedObj = $('#wardrobeConfigure .selected-type');
				var type = selectedObj.data('wardrobe_type');
				var position = selectedObj.data('wardrobe_position');
				var colorSku = wardrobe_literal.finalObj[position][type].frames.pattern.custom_options_child.sku;
				var frameId = wardrobe_literal.finalObj[position][type].frames.pattern.option_id;
				$("#open_"+type+"_frame_color_"+frameId+" .wardrobe-option-content").removeClass('selected-option');
				$("#open_"+type+"_frame_color_"+frameId+" .wardrobe-option-content[data-sku='" + colorSku + "']").addClass('selected-option');
			}
			$('#' + id + "Container").stop(true, true).slideDown(700, function () {
                $('.wardrobeInternalDesign .wardrobe-content-scroll-area').niceScroll(wardrobe_literal.scrollDefaultsHide).resize();
            });
			$('.wardrobeInternalDesign .wardrobe-content-scroll-area').niceScroll(wardrobe_literal.scrollDefaultsHide).resize();
        });

        //Wardrobe Inside Go Back Click Event (Sng,Dbl)
        $('body').on('click tap', '.wardrobeInternalDesign .wardrobe-go-back', function () {
            $('#customizeWardrobe .customize-wardrobe-option').hide(700, function () {
                $('.wardrobeInternalDesignTabSwitcher').fadeOut(700);
            });
            $('#wardrobeConfigure .selected-type').find('.door-skeleton-container').show();	/*new added for door*/
            $('.wardrobeInternalDesign h2').css('pointer-events', 'auto');
            var elem = $('#wardrobeConfigure .wardrobe-configure-container.selected-type');
            if ($(elem).hasClass('loft-fst-opt') || $(elem).hasClass('loft-sec-opt')) {
                $('#wardrobeLoftColorDesign, #wardrobeLoftHeightDesign').fadeIn();
            }
        });
        /* wardrobe insides functionality end */

        /* open shelves functionality start */
        $('body').on('click tap', '#wardrobeOpenShelvesInternalDesign h2', function () {
			
			var pos = $('#wardrobeConfigure .selected-type').data('wardrobe_position');
			var opt_id = wardrobe_literal.finalObj[pos].open_shelves.frames.pattern.option_id;
			$('#wardrobeOpenShelvesLayoutContainer').find('.wardrobe-option-content').removeClass('selected-option');
			$('#wardrobeOpenShelvesLayoutContainer').find(".wardrobe-option-content[data-opt_id='" + opt_id + "']").addClass('selected-option');
            $('.wardrobeOpenShelvesColorTabSwitcher, #customizeWardrobe .nav-tab-active').hide();
            $('#wardrobeOpenShelvesLayoutTabSwitcher').fadeIn();
            $('#wardrobeLoftColorDesign, #wardrobeLoftHeightDesign').fadeOut();
            $('#wardrobeOpenShelvesLayoutContainer').slideDown();
            $('#wardrobeOpenShelvesInternalDesign .wardrobe-content-scroll-area').niceScroll(wardrobe_literal.scrollDefaultsHide).resize();
        });

        $('body').on('click tap', '#wardrobeOpenShelvesInternalDesign .wardrobe-go-back', function () {
            $('#customizeWardrobe .customize-wardrobe-option').hide();
            $('#wardrobeOpenShelvesLayoutTabSwitcher').fadeOut(700);
            var elem = $('#wardrobeConfigure .wardrobe-configure-container.selected-type');
            if ($(elem).hasClass('loft-fst-opt') || $(elem).hasClass('loft-sec-opt')) {
                $('#wardrobeLoftColorDesign, #wardrobeLoftHeightDesign').fadeIn();
            }
        });
		
		//
        $('body').on('click tap', '#wardrobeOpenShelvesExternalDesign h2', function () {
			var pos = $('#wardrobeConfigure .selected-type').data('wardrobe_position');
			var opt_id = wardrobe_literal.finalObj[pos].open_shelves.frames.pattern.option_id;
			
			var color_opt_id = wardrobe_literal.finalObj[pos].open_shelves.frames.pattern.custom_options_child.option_type_id;
			var color_type_id = wardrobe_literal.finalObj[pos].open_shelves.frames.pattern.custom_options_child.color_type;
			
			
            $('#wardrobeOpenShelvesLayoutTabSwitcher, #wardrobeOpenShelvesLayoutContainer').hide();
            $('.wardrobeOpenShelvesColorTabSwitcher').fadeIn();
            $('#wardrobeLoftColorDesign, #wardrobeLoftHeightDesign').fadeOut();
            //$('#wardrobeOpenShelvesColorSolidContainer').slideDown(); //change			
            /* wardrobe_literal.selected_open_layout = $('#wardrobeOpenShelvesLayoutContainer').find('.selected-option').data('id');
            $('#wardrobeOpenShelvesExternalDesign').find('#' + wardrobe_literal.selected_open_layout).show().siblings().hide();
			$('#' + wardrobe_literal.selected_open_layout).find('li.active-menu').click(); */
			$('#wardrobeOpenShelvesExternalDesign').find('#open_open_frame_color_'+opt_id).show().siblings().hide();
			$('#wardrobeOpenShelvesExternalDesign #open_open_frame_color_'+opt_id).find('#open_shelves_colortype_'+color_type_id).click();
			$('#wardrobeOpenShelvesExternalDesign #open_open_frame_color_'+opt_id).find(".wardrobe-option-content").removeClass('selected-option');
			$('#wardrobeOpenShelvesExternalDesign #open_open_frame_color_'+opt_id).find(".wardrobe-option-content[data-child_opt_id='"+color_opt_id+"']").addClass('selected-option');
			
            $('#wardrobeOpenShelvesExternalDesign .wardrobe-content-scroll-area').niceScroll(wardrobe_literal.scrollDefaultsHide).resize();
        });

        $('body').on('click tap', '.wardrobeOpenShelvesColorTabSwitcher li', function () {
            var liIndex = $(this).index();
            var position = $(this).position();
            $(this).closest('.wardobe-door-color-builder').find('.wardrobe-door-color-switcher-container').children().hide();
            $(this).closest('.wardobe-door-color-builder').find('.wardrobe-door-color-switcher-container').children().eq(liIndex).show();
            $(this).addClass('active-menu').siblings().removeClass('active-menu');
            $(this).parent().find('.menu-cursor-move').animate({
                left: position.left,
                width: $(this).outerWidth()
            }, {
                duration: 350
            });
        });

        $('body').on('click tap', '#wardrobeOpenShelvesExternalDesign .wardrobe-go-back', function () {
            $('#customizeWardrobe .customize-wardrobe-option').hide();
            $('.wardrobeOpenShelvesColorTabSwitcher').fadeOut(700);
            var elem = $('#wardrobeConfigure .wardrobe-configure-container.selected-type');
            if ($(elem).hasClass('loft-fst-opt') || $(elem).hasClass('loft-sec-opt')) {
                $('#wardrobeLoftColorDesign, #wardrobeLoftHeightDesign').fadeIn();
            }
        });

        /* open shelves layout click functionality end */



        /* loft click functionality start */

        $('body').on('click tap', '#wardrobeLoftHeightDesign h2', function () {
            $('.wardrobeLoftColorTabSwitcher, #customizeWardrobe .loft-tab-active').hide();
            $('#wardrobeLoftHeightTabSwitcher').fadeIn();
            $('.wardrobeDoorDesign, .wardrobeInternalDesign, #wardrobeOpenShelvesInternalDesign, #wardrobeOpenShelvesExternalDesign').fadeOut();
            $('#wardrobeLoftHeightContainer').slideDown();
            $('#wardrobeLoftHeightDesign .wardrobe-content-scroll-area').niceScroll(wardrobe_literal.scrollDefaultsHide).resize();
            $('#wardrobeConfigure .selected-type').find('.loft-door-container').hide();
        });

        $('body').on('click tap', '#wardrobeLoftHeightDesign .wardrobe-go-back', function () {
            $('#customizeWardrobe .customize-wardrobe-option').hide();
            $('#wardrobeLoftHeightTabSwitcher').fadeOut(700);
            if ($('#wardrobeConfigure .wardrobe-configure-container.selected-type').hasClass('wt-door')) {
                $('.wardrobeDoorDesign, .wardrobeInternalDesign').fadeIn();
            }
            if ($('#wardrobeConfigure .wardrobe-configure-container.selected-type').hasClass('open-shelves')) {
                $('#wardrobeOpenShelvesInternalDesign, #wardrobeOpenShelvesExternalDesign').fadeIn();
            }
            $('#wardrobeConfigure .selected-type').find('.loft-door-container').show();
        });

		//Loft Color Initial Click
        $('body').on('click tap', '#wardrobeLoftColorDesign h2', function () {
			var pos = $('#wardrobeConfigure .selected-type').data('wardrobe_position');
			var type = $('#wardrobeConfigure .selected-type').data('wardrobe_type');
			var loft_height = wardrobe_literal.finalObj[pos][type].loft_door.height;
			
			var color_opt_id = wardrobe_literal.finalObj[pos][type].loft_door.pattern.custom_options_child.option_type_id;
			var color_type_id = wardrobe_literal.finalObj[pos][type].loft_door.pattern.custom_options_child.color_type;
			
			
			
            /* $('#wardrobeOpenShelvesLayoutTabSwitcher, #wardrobeOpenShelvesLayoutContainer').hide();
            $('.wardrobeOpenShelvesColorTabSwitcher').fadeIn();
            $('#wardrobeLoftColorDesign, #wardrobeLoftHeightDesign').fadeOut();
            
			$('#wardrobeOpenShelvesExternalDesign').find('#open_open_frame_color_'+opt_id).show().siblings().hide();
			$('#wardrobeOpenShelvesExternalDesign #open_open_frame_color_'+opt_id).find('#open_shelves_colortype_'+color_type_id).click();
			$('#wardrobeOpenShelvesExternalDesign #open_open_frame_color_'+opt_id).find(".wardrobe-option-content").removeClass('selected-option');
			$('#wardrobeOpenShelvesExternalDesign #open_open_frame_color_'+opt_id).find(".wardrobe-option-content[data-child_opt_id='"+color_opt_id+"']").addClass('selected-option'); */
			
			
			
			
			
			
			
            $('#wardrobeLoftHeightTabSwitcher, #wardrobeLoftHeightContainer').hide();
            $('.wardrobeLoftColorTabSwitcher').fadeIn();
            $('.wardrobeDoorDesign, .wardrobeInternalDesign, #wardrobeOpenShelvesInternalDesign, #wardrobeOpenShelvesExternalDesign').fadeOut();
            //$('#wardrobeLoftColorSolidContainer').slideDown();           
            wardrobe_literal.doorClose();
			var colorTabSelector = '';
			var wardrobeType = $('#wardrobeConfigure .selected-type').data('wardrobe_type');
			switch (wardrobeType) {
				case "double_door" :
					wardrobe_literal.selected_loft_height = $('#wardrobeLoftHeightContainer .loft-double-door-layout').find('.selected-option').data('id');
					colorTabSelector = 'double_door_loft_'+loft_height+'_colortype_'+color_type_id;
					break;
				case "open_shelves":
				case "single_door" :
					wardrobe_literal.selected_loft_height = $('#wardrobeLoftHeightContainer .loft-single-door-layout').find('.selected-option').data('id');
					colorTabSelector = 'single_door_loft_'+loft_height+'_colortype_'+color_type_id;
					break;
			}
			

			
            $('#wardrobeLoftColorDesign').find('#' + wardrobe_literal.selected_loft_height).show().siblings().hide();
            //$('#' + wardrobe_literal.selected_loft_height).find('li.active-menu').click();
			$('#wardrobeLoftColorDesign #' + wardrobe_literal.selected_loft_height).find('#'+colorTabSelector).click();
			$('#wardrobeLoftColorDesign #' + wardrobe_literal.selected_loft_height).find('.wardrobe-option-content').removeClass('selected-option');
			$('#wardrobeLoftColorDesign #' + wardrobe_literal.selected_loft_height).find(".wardrobe-option-content[data-child_opt_id='"+color_opt_id+"']").addClass('selected-option');
            $('#wardrobeLoftColorDesign .wardrobe-content-scroll-area').niceScroll(wardrobe_literal.scrollDefaultsHide).resize();
        });

        $('body').on('click tap', '.wardrobeLoftColorTabSwitcher li', function () {
            var liIndex = $(this).index();
            var position = $(this).position();
            $(this).closest('.wardobe-door-color-builder').find('.wardrobe-door-color-switcher-container').children().hide();
            $(this).closest('.wardobe-door-color-builder').find('.wardrobe-door-color-switcher-container').children().eq(liIndex).show();
            $(this).addClass('active-menu').siblings().removeClass('active-menu');
            $(this).parent().find('.loft-cursor-move').animate({
                left: position.left,
                width: $(this).outerWidth()
            }, {
                duration: 350
            });
        });

        $('body').on('click tap', '#wardrobeLoftColorDesign .wardrobe-go-back', function () {
            $('#customizeWardrobe .customize-wardrobe-option').hide();
            $('.wardrobeLoftColorTabSwitcher').fadeOut(700);
            if ($('#wardrobeConfigure .wardrobe-configure-container.selected-type').hasClass('wt-door')) {
                $('.wardrobeDoorDesign, .wardrobeInternalDesign').fadeIn();
            }
            if ($('#wardrobeConfigure .wardrobe-configure-container.selected-type').hasClass('open-shelves')) {
                $('#wardrobeOpenShelvesInternalDesign, #wardrobeOpenShelvesExternalDesign').fadeIn();
            }
        });

        /* loft click functionality end */


        /* delete loft click functionality start */
        $('body').on('click tap', '.action-delete-loft-selection', function (event) {
            event.stopPropagation();
            $('#wardrobeConfigure .selected-type').find('.wardrobe-loft-section-container').empty();
            $('#loft_opts_data').hide();
            $('#wardrobeConfigure .selected-type').removeClass('loft-fst-opt loft-sec-opt');
			
			var wardrobe_position = $('#wardrobeConfigure .selected-type').data('wardrobe_position');
			var wardrobe_type = $('#wardrobeConfigure .selected-type').data('wardrobe_type');
            //Update Json Start
            if (typeof wardrobe_literal.finalObj[wardrobe_position][wardrobe_type].loft != 'undefined' && typeof wardrobe_literal.finalObj[wardrobe_position][wardrobe_type].loft != 'yes') {
                delete wardrobe_literal.finalObj[wardrobe_position][wardrobe_type].loft;
                delete wardrobe_literal.finalObj[wardrobe_position][wardrobe_type].loft_door;
                delete wardrobe_literal.finalObj[wardrobe_position][wardrobe_type].loft_frame;
                $('#wardrobeLoftDelete').hide();
				
				//Price Update
				var oldPrice = wardrobe_literal.wardrobeSepPrice[wardrobe_position];
				var newPrice = oldPrice - wardrobe_literal.loftSepPrice[wardrobe_position];
				var diff = newPrice - oldPrice;
				
				//Update Total Price
				var wardrobeNewPrice = wardrobe_literal.wardrobePrice + diff;
				wardrobe_literal.wardrobePrice = wardrobeNewPrice;
				
				var tmpPrice = wardrobe_literal.roundToTwo(wardrobe_literal.wardrobePrice);
				$('#wardrobeAddOnPrice span').html(wardrobe_literal.formatPrice(tmpPrice));
				
				//Update Separate Unit price
				wardrobe_literal.wardrobeSepPrice[wardrobe_position] = newPrice;
				
				//Dimension Calculation
				var tmpDimCalc = wardrobe_literal.calculateDimension({type:"individual","position":wardrobe_position,"wardrobe_type":wardrobe_type});
				
				delete wardrobe_literal.loftSepPrice[wardrobe_position];
				
				wardrobe_literal.showAmt(newPrice, diff);
				
            }
            //Update Json End
        });

        /* delete loft click functionality end */


        /* delete wardrobe click functionality start */
        $('body').on('click tap', '.action-delete-selection', function (event) {
            event.stopPropagation();
            
            //set delete wardrobe node
            var deleteNode = $('#wardrobeConfigure .selected-type').data('wardrobe_position');
			wardrobe_literal.deletePosition = deleteNode;
            $('#wardrobeDeleteContainer, #page-backdrop').fadeIn('fast');
        });

        $('body').on('click tap', '#wardrobeDeleteContainer .action-delete-selection-confirm', function () {
            var materialText = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]['customOptionAttributes'][wardrobe_literal.currentMaterialId].frontend_lable;
            wardrobe_literal.addEventTracker('Remove Wardrobe', materialText, 'event Remove Wardrobe');
            
            if ($('.selected-type').length) {
				var wardrobe_type = $('#wardrobeConfigure .selected-type').data('wardrobe_type');
				var wardrobe_position = $('#wardrobeConfigure .selected-type').data('wardrobe_position');
				
				var unitPriceOld = wardrobe_literal.wardrobeSepPrice[wardrobe_position];
				var newPrice = wardrobe_literal.wardrobePrice - unitPriceOld;
				
				if(typeof wardrobe_literal.finalObj[wardrobe_position][wardrobe_type].loft != 'undefined' && wardrobe_literal.finalObj[wardrobe_position][wardrobe_type].loft == 'Yes') {
					$('.action-delete-loft-selection').click();
				}
                $('#wardrobeConfigure .selected-type').remove();
                $('#wardrobeDeleteContainer, #page-backdrop').fadeOut('fast');
                $('#wardrobeWorkArea').find('.wardrobe-delete-btn').hide();
                if ($('#wardrobeConfigure .wardrobe-configure-container').length) {
                    wardrobe_literal.addSectionPosition();
                }
            }
			
			//Update Json Start
			delete wardrobe_literal.wardrobeSepPrice[wardrobe_position];
			delete wardrobe_literal.finalObj[wardrobe_position];
			wardrobe_literal.wardrobePrice = newPrice;
			newPrice = wardrobe_literal.roundToTwo(newPrice);
			$('#wardrobeAddOnPrice span').html(wardrobe_literal.formatPrice(newPrice));
			//Update Json End
			
			
            if ($('#wardrobeConfigure .wardrobe-configure-container').length == 0) {
                $('#wardrobeLandingContainer').fadeIn('fast');
                $('#customizeWardrobe').hide();
                $('#wardrobeWorkArea').fadeOut('fast');
                $('#wardrobeAddOn .wardrobe-add-on-container').css('visibility', 'hidden');
                wardrobe_literal.wallColIndex = 0;
                $('#wardrobe #page').css('background-color', '#ffffff');
                $('#modalWallColor .wardrobe-option-content').eq(wardrobe_literal.wallColIndex).addClass('selected-option').siblings().removeClass('selected-option');
                $('.wardrobe-add-on-container .wall-color-index').css('background-image', 'url(\'images/colour_ic.png\')');
                location.reload();
            } else {
				wardrobe_literal.resetWardrobePositionDelete();
                $('#wardrobeConfigure').click();
				
            }
        });

        $('body').on('click tap', '#page-backdrop', function (event) {
            event.stopPropagation();
        });

        $('body').on('click tap', '#wardrobeDeleteContainer .action-delete-selection-cancel', function () {
            $('#wardrobeDeleteContainer, #page-backdrop').fadeOut('fast');
        });
        /* delete wardrobe click functionality end  */

        $('body').on('click tap', '#wardrobeAddOn .action-wall-color', function () {
            var materialText = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]['customOptionAttributes'][wardrobe_literal.currentMaterialId].frontend_lable;
            
            var modalBody = $('#wall-color-modal-body').html();
            var modalFooter = '<a class="wardrobe-button control-close-modal" href="javascript:void(0);">Cancel</a>';
            wardrobe_literal.buildModal("modalWallColor", "Choose a wall colour", modalBody, modalFooter);
            $('#modalWallColor .wardrobe-option-container').niceScroll(wardrobe_literal.scrollDefaults).resize();
            $('#modalWallColor .wardrobe-option-content').eq(wardrobe_literal.wallColIndex).addClass('selected-option').siblings().removeClass('selected-option');
            $('#modalWallColor').on('click tap', '.wardrobe-option-content', function () {
                var wallColor = $(this).css('background-color');
                wardrobe_literal.wallColIndex = $(this).index();
                $('#page').css('background-color', wallColor);
                if (wardrobe_literal.wallColIndex > 0) {
                    $('.wardrobe-add-on-container .wall-color-index').css({'background-color': wallColor, 'background-image': 'none'});
                } else if (wardrobe_literal.wallColIndex == 0) {
                    $('.wardrobe-add-on-container .wall-color-index').css('background-image', 'url(\'images/colour_ic.png\')')
                }
                $(this).addClass('selected-option').siblings().removeClass('selected-option');
                $.modal.close();
                
                var colour_name = $(this).find('.wardrobe-option-content-name').text();
                wardrobe_literal.addEventTracker('Wall Color', materialText+"|"+colour_name);
            });
        });
		
		/*adding hover class by shaily*/
        $('body').on('mouseenter','#wardrobe .wardrobe-material-selection-box',function(){
			if (!$(this).hasClass("disable-mat")) {
                $( this ).find('.wardrobe-material-listing').addClass( "active-material-hover" );
            }
        });
        $('body').on('mouseleave','#wardrobe .wardrobe-material-selection-box',function(){
            if (!$(this).hasClass("disable-mat")) {
                $(this).find('.wardrobe-material-listing').removeClass( "active-material-hover" );
            }
        });
        
        /*adding js by prashantkumar for pincode validation*/ //Relocate to literal
        $(document).on('click', '#wardrobePinButton', function (e) {
                e.stopImmediatePropagation();
                wardrobe_literal.wardrobeCheckPincode();
        });
        $(document).on('click', '#wardrobePinChange', function (e) {
                $('#wardrobePinFooter').html('<div class="wardrobe-delivery-check">'
                        + '<p>Check availability in your area:</p>'
                        + '<p><input type="text" id="wardrobePinVal" maxlength="6" placeholder="Enter pincode here" /><span id="wardrobePinButton">CHECK</span></p>'
                        + '</div>');
                e.preventDefault();
        });

        $(document).on('keypress', '#wardrobePinVal', function ( ) {
                $('#wardrobePinVal').removeClass('wardrobe-pin-error');
        });
        
        
        
                
		
    },
	resetWardrobePositionDelete: function () {
		var newObjKeys = {};
		var newFinalObj = {};
		var newWardrobeSepPrice = {};
		var newLoftSepPrice = {};
		var finalObjCopy = $.extend(true, {}, wardrobe_literal.finalObj);
		var wardrobeSepPriceCopy = $.extend(true, {}, wardrobe_literal.wardrobeSepPrice);
		var loftSepPriceCopy = $.extend(true, {}, wardrobe_literal.loftSepPrice);
		if(Object.getOwnPropertyNames(finalObjCopy).length != 0) {
			var newIndex = 1;
			for (var index in finalObjCopy) {
				newFinalObj[newIndex] = finalObjCopy[index];
				if(typeof wardrobeSepPriceCopy[index] != 'undefined') {
					newWardrobeSepPrice[newIndex] = wardrobeSepPriceCopy[index];
				}
				
				if(typeof loftSepPriceCopy[index] != 'undefined') {
					newLoftSepPrice[newIndex] = loftSepPriceCopy[index];
				}
				//$("#wardrobeConfigure .wardrobe-configure-container[data-wardrobe_position='" + index + "']").attr('data-wardrobe_position', newIndex );
				//$("#wardrobeConfigure .wardrobe-configure-container[data-wardrobe_position='" + index + "']").data('wardrobe_position', newIndex );
				newObjKeys[index] = newIndex++;
			}
			newIndex = 1;
			$("#wardrobeConfigure .wardrobe-configure-container").removeData('wardrobe_position');
			$("#wardrobeConfigure .wardrobe-configure-container").each(function() {
				$(this).attr('data-wardrobe_position',newIndex++);
			});
			wardrobe_literal.globalCount = newIndex;
			wardrobe_literal.finalObj = newFinalObj;
			wardrobe_literal.wardrobeSepPrice = newWardrobeSepPrice;
			wardrobe_literal.loftSepPrice = newLoftSepPrice;
		}
	},
    resetWardrobePositionSort:function() {
		var newObjKeys = {};
		var newFinalObj = {};
		var newWardrobeSepPrice = {};
		var newLoftSepPrice = {};
		var finalObjCopy = $.extend(true, {}, wardrobe_literal.finalObj);
		var wardrobeSepPriceCopy = $.extend(true, {}, wardrobe_literal.wardrobeSepPrice);
		var loftSepPriceCopy = $.extend(true, {}, wardrobe_literal.loftSepPrice);
		var curIndex = 1;
		$('#wardrobeConfigure .wardrobe-configure-container').each(function(index) {
			var updatedPosition = $(this).data('wardrobe_position');
			if(curIndex == updatedPosition) {
				newFinalObj[curIndex] = finalObjCopy[curIndex];
				if(typeof loftSepPriceCopy[curIndex] != 'undefined') {
					newLoftSepPrice[curIndex] = loftSepPriceCopy[curIndex];
				}
				newWardrobeSepPrice[curIndex] = wardrobeSepPriceCopy[curIndex];
			}
			else {
				newFinalObj[curIndex] = finalObjCopy[updatedPosition];
				if(typeof loftSepPriceCopy[updatedPosition] != 'undefined') {
					newLoftSepPrice[curIndex] = loftSepPriceCopy[updatedPosition];
				}
				newWardrobeSepPrice[curIndex] = wardrobeSepPriceCopy[updatedPosition];
			}
			curIndex++;
		});
		wardrobe_literal.finalObj = newFinalObj;
		wardrobe_literal.wardrobeSepPrice = newWardrobeSepPrice;
		wardrobe_literal.loftSepPrice = newLoftSepPrice;
		var newIndex = 1;
		$("#wardrobeConfigure .wardrobe-configure-container").removeData('wardrobe_position');
		$("#wardrobeConfigure .wardrobe-configure-container").each(function() {
			$(this).attr('data-wardrobe_position',newIndex++);
		});
		
	},
	checkLoftsToadd: function () {
		var noLoftToAddFlag = true;
		var tmpFinalObj = wardrobe_literal.finalObj;
		for (var i in tmpFinalObj) {
			if(!isNaN(i) && i != 'height' && i != 'depth' && i != 'width' ) {
				if(typeof tmpFinalObj[i].double_door != 'undefined' && typeof tmpFinalObj[i].double_door.loft == 'undefined') {
					noLoftToAddFlag = false;
					break;
				}
				if(typeof tmpFinalObj[i].single_door != 'undefined' && typeof tmpFinalObj[i].single_door.loft == 'undefined') {
					noLoftToAddFlag = false;
					break;
				}
				if(typeof tmpFinalObj[i].open_shelves != 'undefined' && typeof tmpFinalObj[i].open_shelves.loft == 'undefined') {
					noLoftToAddFlag = false;
					break;
				}
			}
		}
		if(noLoftToAddFlag) {
			if(!$('#addNewWardrobeContainer').hasClass('disabled')) {
				$('#addNewWardrobeContainer').addClass('disabled');
			}
		}
		else {
			if($('#addNewWardrobeContainer').hasClass('disabled')) {
				$('#addNewWardrobeContainer').removeClass('disabled');
			}
		}
		//$('#addNewWardrobeContainer').addClass('disabled');
		
	},
	centerContent: function () {
        /* variable for crenter position */
        var containerArea, contentSelected, contentSelectedPrev, contentTop, contentWidth, scaleValue;
        containerArea = $('#wardrobeWorkArea');
        contentSelected = $('#wardrobeWorkArea .selected-type');
        contentSelectedPrev = contentSelected.prev();
        contentTop = contentSelected.offset().top;
        scaleValue = 1.074;
        wardrobe_literal.contentScaleWidth = (contentSelected.outerWidth(true)) * scaleValue;
        contentWidth = contentSelected.outerWidth(true);
        wardrobe_literal.contentWidthDiff = wardrobe_literal.contentScaleWidth - contentWidth;
        wardrobe_literal.wardrobeCenterPos = (containerArea.width() - contentSelected.width()) / 2;

        contentSelected.css({'left': (contentSelected.offset().left), 'position': 'absolute'});
        $('.wardrobeDoorDesign, #wardrobeOpenShelvesInternalDesign, #wardrobeLoftColorDesign, .wardrobeInternalDesign, #wardrobeOpenShelvesExternalDesign, #wardrobeLoftHeightDesign').css({'z-index': '1'});
        $(".wardrobeDoorDesign, #wardrobeOpenShelvesInternalDesign, #wardrobeLoftColorDesign").css('right', (parseInt(wardrobe_literal.wardrobeCenterPos) - parseInt(wardrobe_literal.contentWidthDiff / 2)));
        $(".wardrobeInternalDesign, #wardrobeOpenShelvesExternalDesign, #wardrobeLoftHeightDesign").css('left', (parseInt(wardrobe_literal.wardrobeCenterPos) - parseInt(wardrobe_literal.contentWidthDiff / 2)));
        $(".wardrobeDoorDesign, #wardrobeOpenShelvesInternalDesign, .wardrobeInternalDesign, #wardrobeOpenShelvesExternalDesign").css('top', '170px');
        $("#wardrobeLoftColorDesign, #wardrobeLoftHeightDesign").css('top', '80px');
        $('#customizeWardrobe').hide();

        contentSelected.animate({"left": wardrobe_literal.wardrobeCenterPos}, {duration: 800, queue: false, complete: function () {
                wardrobe_literal.selectionRotate();
                $('#wardrobeWorkArea').find('.wardrobe-delete-btn').show();
            }
        });
    },
    selectionRotate: function () {
        $('#customizeWardrobe').show();
        var wardrobeExtOption = (parseInt(wardrobe_literal.wardrobeCenterPos) - parseInt(wardrobe_literal.contentWidthDiff / 2)) + wardrobe_literal.contentScaleWidth;
        var wardrobeInternalOption = (parseInt(wardrobe_literal.wardrobeCenterPos) - parseInt(wardrobe_literal.contentWidthDiff / 2)) + wardrobe_literal.contentScaleWidth;
        $('.wardrobeDoorDesign, #wardrobeOpenShelvesInternalDesign, #wardrobeLoftColorDesign').animate({'right': wardrobeExtOption}, 400, function () {
            $('.wardrobeDoorDesign, #wardrobeOpenShelvesInternalDesign, .wardrobeInternalDesign, #wardrobeOpenShelvesExternalDesign, #wardrobeLoftColorDesign, #wardrobeLoftHeightDesign').css('z-index', '6');
        });
        $('.wardrobeInternalDesign, #wardrobeOpenShelvesExternalDesign, #wardrobeLoftHeightDesign').animate({'left': wardrobeInternalOption}, 400);
    },
    doorOpen: function () {
        $(".wardrobe-configure-container .door-skeleton-container").hide();
        $(".wardrobe-configure-container .loft-door-container").hide();
        $(".action-door-toggle").html('Show </br> Doors');
        $(".action-door-toggle").addClass('active-btn');
    },
    doorClose: function () {
        $(".wardrobe-configure-container .door-skeleton-container").show();
        $(".wardrobe-configure-container .loft-door-container").show();
        $(".action-door-toggle").html('Hide </br> Doors');
        $(".action-door-toggle").removeClass('active-btn');
    },
    dimShow: function () {
		var tmpDimCalc = wardrobe_literal.calculateDimension({type:"all"});
		$('.wardrobe-total-dimension-width span').html(wardrobe_literal.roundToTwo(tmpDimCalc.width)+' inches');
		$('.wardrobe-total-dimension-height span').html(wardrobe_literal.roundToTwo(tmpDimCalc.height)+' inches');
        $('#wardrobeAdditionalInfo .wardrobe-total-dimension').stop(true, true);
        $('#wardrobeAdditionalInfo').find('.wardrobe-total-dimension').fadeIn('fast', function () {
            $(this).addClass('active-text', 500, "easeOutBounce");
        });
    },
    dimHide: function () {
		$('#wardrobeAdditionalInfo .wardrobe-total-dimension').stop(true, true);
        $('#wardrobeAdditionalInfo').find('.wardrobe-total-dimension').fadeOut('slow', function () {
            $(this).removeClass('active-text', 500);
        });
    },
    costShow: function () {
        $('#wardrobeAdditionalInfo .wardrobe-total-cost').stop(true, true);
        $('#wardrobeAdditionalInfo').find('.wardrobe-total-cost').fadeIn('fast', function () {
            $(this).addClass('active-text', 500, "easeOutBounce");
        });
    },
    costHide: function () {
        $('#wardrobeAdditionalInfo .wardrobe-total-cost').stop(true, true);
        $('#wardrobeAdditionalInfo').find('.wardrobe-total-cost').fadeOut('slow', function () {
            $(this).removeClass('active-text', 500);
        });
    },
    resetWardrobe: function () {
        $('#customizeWardrobe .wardrobe-go-back').click();
        wardrobe_literal.doorClose();
    },
	reloadOnNonRoute: function () {
		if(window.location.hash){
			location.reload();
		}
	},
	wardrobeCheckPincode: function () {
		var pincode = $('#wardrobePinVal').val();
		if (pincode === '') {
			$('#wardrobePinVal').val('').addClass('wardrobe-pin-error').attr('placeholder', 'Enter valid pincode');
			return false;
		}
		if (pincode.length < 6) {
			$('#wardrobePinVal').val('').addClass('wardrobe-pin-error').attr('placeholder', 'Enter valid pincode');
			return false;
		}
		if (pincode.length > 8) {
			$('#wardrobePinVal').val('').addClass('wardrobe-pin-error').attr('placeholder', 'Enter valid pincode');
			return false;
		}
		if (isNaN(pincode)) {
			$('#wardrobePinVal').val('').addClass('wardrobe-pin-error').attr('placeholder', 'Enter valid pincode');
			return false;
                        
		}
                
		$.ajax({                    
			url: '/pincode/checkWardrobeServiceable',
			data: 'pincode=' + pincode,
			type: 'post',
			success: function (data) {
				ajaxLoading = false;
				data = $.trim(data);
				try {                                    
                                        data = $.parseJSON(data);					
				} catch (e) {
					// not json
					if (data === 'pincode must be in digit' || data === 'not a valid pincode') {
						$('#wardrobePinVal').val('').addClass('wardrobe-pin-error').attr('placeholder', 'Enter valid pincode');
						return false;
					}
				}
				var cod_str = '';
				var serv_str = '';
				if (data.serviceable) {
					if (data.serviceable === 'not serviceable') {
						$('#wardrobePinFooter').html('<div class="wardrobe-delivery-failure" >'
							+ '<p>'
							+ 'Sorry, customizable wardrobes are currently not deliverable to your area <strong>' + pincode
							+ '</strong> (<a href="javascript: void(0)" id="wardrobePinChange">change</a>)'
							+ '</p>'
							+ '</div>');
                                                
                                                wardrobe_literal.addEventTracker('Pin code check', 'failed');
					} else if (data.serviceable === 'serviceable') {
						$('#wardrobePinFooter').html('<div class="wardrobe-delivery-success" >'
							+ '<p>'
							+ ' Happy to share that we can deliver customized wardrobes to your area'
							+ '<strong> ' + pincode + ' </strong> (<a href="javascript: void(0)" id="wardrobePinChange">change</a>)'
							+ '</p>'
							+ '</div>');
                                                
                                                wardrobe_literal.addEventTracker('Pin code check', 'verified');
					}
				}
			}, error: function () {
				alert('error');
			}
		});
		return false;
	},
	showSelectedOptionsOfOpen: function(obj,part,tabType) {
        if(!$(obj).hasClass('wardrobe-go-back')){
			var tmpId = '';
			
			if(typeof tabType == 'undefined') {
				var type = $('#wardrobeConfigure .selected-type').data('wardrobe_type');
				var pos = $('#wardrobeConfigure .selected-type').data('wardrobe_position');
				var openStyle = $(obj).parent().attr('id');
				switch(part){
					case "door":
						$('#' + openStyle + 'StyleContainer').slideDown();
						var opt_sku = wardrobe_literal.finalObj[pos][type].door.pattern.sku;
						$('#' + openStyle + 'StyleContainer').find(".wardrobe-option-content").removeClass('selected-option');
						$('#' + openStyle + 'StyleContainer').find(".wardrobe-option-content[data-sku='" + opt_sku + "']").addClass('selected-option');
						
						tmpId = $('#' + openStyle + 'StyleContainer').find('.selected-option').data('id');
						$('#' + openStyle + 'ColorContainer').find('#' + tmpId).show().siblings().hide();
						
						break;
					case "frame":
						var opt_sku = wardrobe_literal.finalObj[pos][type].frames.pattern.sku;
						var opt_color_sku = wardrobe_literal.finalObj[pos][type].frames.pattern.sku;
						
						if(type != 'open_shelves') {
							$(".wardrobeDoorDesignTabSwitcher, #customizeWardrobe .tab-active").hide();
							$(".wardrobeInternalDesignTabSwitcher").fadeIn();
							$('#wardrobeLoftColorDesign, #wardrobeLoftHeightDesign').fadeOut();
							var openLayout = $(this).parent().attr('id');
							$('#' + openStyle + 'LayoutContainer').slideDown();
							$(this).css('pointer-events', 'none');
							$('.wardrobeDoorDesign h2').css('pointer-events', 'auto');
							$('#' + openStyle + 'Layout').addClass('active-menu-main').siblings().removeClass('active-menu-main');
							$('#wardrobeConfigure .selected-type').find('.door-skeleton-container').hide();
							
							$('#' + openStyle + 'LayoutContainer').find(".wardrobe-option-content").removeClass('selected-option');
							$('#' + openStyle + 'LayoutContainer').find(".wardrobe-option-content[data-sku='" + opt_sku + "']").addClass('selected-option');
							
							wardrobe_literal.selected_frame_layout = $('#' + openStyle + 'LayoutContainer').find('.selected-option').data('id');
							$('#' + openStyle + 'ColorContainer').find('#' + wardrobe_literal.selected_frame_layout).show().siblings().hide();
							$('.wardrobeInternalDesign .wardrobe-content-scroll-area').niceScroll(wardrobe_literal.scrollDefaultsHide).resize();
						}
						
						
						
						break;
				}
				
			}
			else {
				var id = $(obj).attr('id');
				var type = $('#wardrobeConfigure .selected-type').data('wardrobe_type');
				var pos = $('#wardrobeConfigure .selected-type').data('wardrobe_position');
				if(!$(obj).hasClass('wardrobe-go-back')){
					switch(tabType) {
						case 'color' :
							var opt_id = wardrobe_literal.finalObj[pos][type].door.pattern.option_id;
							var color_opt_id = wardrobe_literal.finalObj[pos][type].door.pattern.custom_options_child.option_type_id;
							var color_type_id = wardrobe_literal.finalObj[pos][type].door.pattern.custom_options_child.color_type;
							var selectedSku = $('#wardrobeConfigure .selected-type').find('.door-skeleton-container').data('door_color_sku');
							
							
							//$('#' + id + 'Container #open_'+type+'_color_'+opt_id).find('#'+type+'_colortype_'+color_type_id).click();
							$('#' + id + 'Container #open_'+type+'_color_'+opt_id).find('.wardrobe-option-content').removeClass('selected-option');
							$('#' + id + 'Container #open_'+type+'_color_'+opt_id).find(".wardrobe-option-content[data-sku='" + selectedSku + "']").addClass('selected-option');
							return ($('#' + id + 'Container #open_'+type+'_color_'+opt_id).find('#'+type+'_colortype_'+color_type_id));
							break;
						case 'mirror':
							switch(type) {
								case 'double_door':
									if(typeof wardrobe_literal.finalObj[pos][type].mirror != 'undefined' && wardrobe_literal.finalObj[pos][type].mirror_side != 'undefined') {
										switch (wardrobe_literal.finalObj[pos][type].mirror_side) {
											case 'left':
												$('#' + id + "Container").find('.left-mirror-container').attr('data-toggled','on');
												$('#' + id + "Container .left-mirror-container").find('input[type=checkbox]').prop('checked', true);
												$('#' + id + "Container").find('.right-mirror-container').attr('data-toggled','');
												$('#' + id + "Container .right-mirror-container").find('input[type=checkbox]').prop('checked', false);
												break;
											case 'right':
												$('#' + id + "Container").find('.right-mirror-container').attr('data-toggled','on');
												$('#' + id + "Container .right-mirror-container").find('input[type=checkbox]').prop('checked', true);
												$('#' + id + "Container").find('.left-mirror-container').attr('data-toggled','');
												$('#' + id + "Container .left-mirror-container").find('input[type=checkbox]').prop('checked', false);
												
												break;
											case 'both':
												$('#' + id + "Container").find('.left-mirror-container').attr('data-toggled','on');
												$('#' + id + "Container").find('.right-mirror-container').attr('data-toggled','on');
												$('#' + id + "Container .left-mirror-container").find('input[type=checkbox]').prop('checked', true);
												$('#' + id + "Container .right-mirror-container").find('input[type=checkbox]').prop('checked', true);
												break;
										}
									}
									else {
										$('#' + id + "Container").find('.left-mirror-container').attr('data-toggled','');
										$('#' + id + "Container").find('.right-mirror-container').attr('data-toggled','');
										$('#' + id + "Container .left-mirror-container").find('input[type=checkbox]').prop('checked', false);
										$('#' + id + "Container .right-mirror-container").find('input[type=checkbox]').prop('checked', false);
									}
									break;
								case 'single_door':
									if(typeof wardrobe_literal.finalObj[pos][type].mirror != 'undefined') {
										$('#' + id + "Container").find('.right-mirror-container').attr('data-toggled','on');
										$('#' + id + "Container .right-mirror-container").find('input[type=checkbox]').prop('checked', true);
									}
									else {
										$('#' + id + "Container").find('.right-mirror-container').attr('data-toggled','');
										$('#' + id + "Container .right-mirror-container").find('input[type=checkbox]').prop('checked', false);
									}
									break;
							}
							break;
						case 'handle':
							switch(wardrobe_literal.finalObj[pos][type].handle_position) {
								case 'left':
									$('#' + id + "Container .right-handle-container").find('input[type=radio]').prop('checked', true);
									$('#' + id + "Container .left-mirror-container").find('input[type=radio]').prop('checked', false);
									break;
								case 'right':
									$('#' + id + "Container .left-handle-container").find('input[type=radio]').prop('checked', true);
									$('#' + id + "Container .right-mirror-container").find('input[type=radio]').prop('checked', false);
									break;
							}
							break;
					}
					
				}
				
			}
			
		}
	},
	wardRobeSort: function () {
		$(document).find( "#wardrobeConfigure" ).sortable({
			start: function(event, ui) {
				ui.item.bind("click.prevent",
                function(event) { event.stopImmediatePropagation(); });
			},
			stop: function(event, ui) {
				setTimeout(function(){ui.item.unbind("click.prevent");
					//wardrobe_literal.resetWardrobePositionSort();
				}, 300);
			},
			update: function(event, ui) {
				wardrobe_literal.resetWardrobePositionSort();
			},			
			cursor: "move",
			axis: "x",
			delay: 30
		});
		$(document).find("#wardrobeConfigure").disableSelection();	
	},
	afterAjax: function () {
		if($('#wardrobeConfigure').html().trim() == '') {
			setTimeout(function(){
				wardrobe_literal.afterAjax();
			}, 100);
			//this.afterAjax();
			//console.log(Math.floor((Math.random() * 1000) + 1));
		}
		else {
			var allImages = new Array(); 
			$("#wardrobeConfigure").find('img').each(function() {
	 	var srcTest = $(this).attr('src');
	 		allImages.push(srcTest);
			});
			
			wardrobe_literal.loadAllImage(allImages).completeLoading(function (images){
				$('#wardrobeAddSelection').show();
				wardrobe_literal.addSectionPosition();
				wardrobe_literal.wardRobeSort();
				//console.clear(); 
				$('#search-loader-container').hide();
				return false;
			});
		}
	},
	saveOnReload: function () {
		if(wardrobe_literal.editProductId == '') {
			if(PF.UTILITIES.readCookie('wardrobeExists') != 'undefined' ) {
				PF.UTILITIES.createCookie('wardrobeExists','yes',1);
			}
			localStorage.setItem('wardrobeFO', JSON.stringify(wardrobe_literal.finalObj));
			localStorage.setItem('wardrobeSP', JSON.stringify(wardrobe_literal.wardrobeSepPrice));
			localStorage.setItem('wardrobeLoftSP', JSON.stringify(wardrobe_literal.loftSepPrice));
			localStorage.setItem('wardrobeHtml', $('#wardrobeConfigure').html().trim());
			localStorage.setItem('wardrobeDC', wardrobe_literal.selectedDoorColorSku);
			localStorage.setItem('wardrobeDS', wardrobe_literal.selectedDoorStyleSku);
			localStorage.setItem('wardrobeGC', wardrobe_literal.globalCount);
			localStorage.setItem('wardrobeCM', wardrobe_literal.currentMaterialId);
			localStorage.setItem('wardrobePr', wardrobe_literal.wardrobePrice);
		}
	},
	loadAllImage: function (arr) {
		var newimages=[], loadedimages=0;
        var postaction=function(){};
        var arr=(typeof arr!="object")? [arr] : arr;
        function imageloadpost(){
            loadedimages++;
            if (loadedimages==arr.length){
                postaction(newimages); //call postaction and pass in newimages array as parameter
            }
        }
        for (var i=0; i<arr.length; i++){
            newimages[i]=new Image();
            newimages[i].src=arr[i];
            newimages[i].onload=function(){
                imageloadpost();
            }
            newimages[i].onerror=function(){
                imageloadpost();
            }
        }
        return { //return blank object with done() method
            completeLoading:function(f){
                postaction=f || postaction; //remember user defined callback functions to be called when images load
            }
        }
	},
    formatPrice: function(price) {
        var x = price;
        x=x.toString();
        var afterPoint = '';
        if(x.indexOf('.') > 0) {
            afterPoint = x.substring(x.indexOf('.'),x.length);
        }
        x = Math.floor(x);
        x=x.toString();
        var lastThree = x.substring(x.length-3);
        var otherNumbers = x.substring(0,x.length-3);
        if(otherNumbers != '') {
            lastThree = ',' + lastThree;
        }
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree + afterPoint;
        return res;
    },
    addEventTracker: function(action, label, event) {
        if(typeof event === "undefined") {
            var event = 'event Customized Wardrobe';
        }
        console.log(action, label, event);
        if(this.enableTracking) {
            dataLayer.push({
                'category': 'Customized Wardrobe',
                'action': action,
                'label': label,
                'event': event
            });
        }
        
    }
}
// Miscellaneous Javascript Calls End

wardrobe_literal.initialize();
wardrobe_literal.reloadOnNonRoute();
/* function reloadOnNonRoute(){
    
    if(window.location.hash){
        window.location.assign(root_url + "/angular-wardrobe.html")
    }
}
reloadOnNonRoute(); */

var customizedWardrobe = angular.module('customizedWardrobe', []);

customizedWardrobe.run(function ($rootScope) {
    $rootScope.defaultWardrobe = '';
    $rootScope.defaultWardrobeHtml = {};
    $rootScope.currentMaterial = '';
    $rootScope.imageDirPath = root_url + '/' + wardrobe_image_dir;
});

//Factory
customizedWardrobe.factory('dataFactory', function ($http) {
    return {
        arrangeLoftProductData: function (data) {
            var retData = {};
            if (typeof data.all_data.lofts != 'undefined') {
                var tmpData = $.extend(true, {}, data.all_data.lofts);
                retData.single_door = {};
                retData.double_door = {};
                for (var i in tmpData) {
                    if (typeof tmpData[i].single_door != 'undefined') {
                        tmpData[i].single_door.door.custom_options = tmpData[i].single_door.door.custom_options[Object.keys(tmpData[i].single_door.door.custom_options)[0]];
                        retData.single_door[i] = tmpData[i].single_door;
                        tmpData[i].single_door.frames.custom_options = tmpData[i].single_door.frames.custom_options[Object.keys(tmpData[i].single_door.frames.custom_options)[0]];
                        retData.single_door[i] = tmpData[i].single_door;
                    }
                    if (typeof tmpData[i].double_door != 'undefined') {
                        tmpData[i].double_door.door.custom_options = tmpData[i].double_door.door.custom_options[Object.keys(tmpData[i].double_door.door.custom_options)[0]];
                        tmpData[i].double_door.frames.custom_options = tmpData[i].double_door.frames.custom_options[Object.keys(tmpData[i].double_door.frames.custom_options)[0]];
                        retData.double_door[i] = tmpData[i].double_door;
                    }
                }
            }
            return retData;
        },
		arrangeDefaultData: function (data,type) {
			var retData = {};
			var tmpData = $.extend(true, {}, data);
			if(type != 'open_shelves') {
				retData['door_style_sku'] = tmpData[type].door.custom_options.def_opts.sku;
				retData['door_color_sku'] = tmpData[type].door.custom_options.def_opts.sku;
				retData['door_internal_area'] = tmpData[type].door.custom_options.def_opts.internal_area;
				retData['door_external_area'] = tmpData[type].door.custom_options.def_opts.external_area;
				retData['door_price'] = tmpData[type].door.custom_options.def_opts.price;
				retData['door_color_price'] = tmpData[type].door.custom_options.def_opts.def_color.price;
			}
			retData['frame_style_sku'] = tmpData[type].frames.custom_options.def_opts.sku;
			retData['frame_color_sku'] = tmpData[type].frames.custom_options.def_opts.custom_options_child.sku;
			retData['frame_internal_area'] = tmpData[type].frames.custom_options.def_opts.internal_area;
			retData['frame_external_area'] = tmpData[type].frames.custom_options.def_opts.external_area;
			retData['frame_price'] = tmpData[type].frames.custom_options.def_opts.price;
			retData['frame_color_price'] = tmpData[type].frames.custom_options.def_opts.custom_options_child.price;
			retData['type'] = type;
			return retData;
		},
        getEditData: function (callback, rtData) {
            var psotData = {};
            if (typeof rtData.productId != 'undefined') {
                psotData['product_id'] = rtData.productId;
            }
            $http({
                method: 'POST',
                url: root_url + '/site_page/customize_wardrobe_edit_ajax_all',
                cache: false,
                data: psotData
            })
                .success(callback)
                .error(callback);
        }
    };
});

//Controller
customizedWardrobe.controller('wardrobeDataNewController', function($scope, $rootScope, $sce, dataFactory) {
    $scope.wardRobeMaterialWiseDefaultData = {};
    $scope.wardRobeDataAll = {};
    $scope.wardRobeMaterialWiseDefaultDataFound = "No";
    $scope.imageVersion = wardrobeImageVersion;
    $scope.materialId = 0;
	
    //Design Part
    $scope.wardRobeMaterialWiseData = {};
    $scope.price = 0;
	$scope.materialFrameIdenticalFlag = false;
	wardrobe_literal.mirrorPrice = Math.ceil(wardrobeMirrorPrice);
	$scope.mirrorPrice = wardrobe_literal.mirrorPrice;
	//Smaller loft height
	$scope.smallLoftHeight = wardrobe_literal.small_loft_height;
	$scope.wardRobeDataAll = wardrobeDataFetched;
	
	//Edit Method
	$scope.openEditDesignArea = function() {
		
		$scope.materialId = editDataFound.material_id;
		wardrobe_literal.currentMaterialId = editDataFound.material_id;
        wardrobe_literal.materialFrameIdenticalFlag = wardrobeMaterialData[editDataFound.material_id].same_internal_color;
		$scope.materialFrameIdenticalFlag = wardrobe_literal.materialFrameIdenticalFlag;
		wardrobe_literal.editProductId = editDataFound.old_product_id;
		var newIndex = 1;
		
		for(var index in editDataFound.old_data) {
			if(!isNaN(index) && index != 'height' && index != 'depth' && index != 'width' ) {
				var tst = editDataFound.old_data[index];
				var cur_price = 0;
				if(typeof tst.loft_price != 'undefined' && !isNaN(tst.loft_price) && tst.loft_price > 0) {
					cur_price = tst.loft_price + tst.price;
					wardrobe_literal.loftSepPrice[index] = tst.loft_price;
					delete tst.loft_price;
					delete tst.loft_cost;
				}
				else {
					cur_price = tst.price;
				}
				wardrobe_literal.wardrobeSepPrice[index] = cur_price;
				wardrobe_literal.wardrobePrice = wardrobe_literal.wardrobePrice + cur_price;
				delete tst.price;
				delete tst.cost;
				if(typeof tst.single_door != 'undefined') {
					wardrobe_literal.selectedDoorStyleSku = tst.single_door.door.pattern.sku;
					wardrobe_literal.selectedDoorColorSku = tst.single_door.door.pattern.custom_options_child.sku;
				}
				if(typeof tst.double_door != 'undefined') {
					wardrobe_literal.selectedDoorStyleSku = tst.double_door.door.pattern.sku;
					wardrobe_literal.selectedDoorColorSku = tst.double_door.door.pattern.custom_options_child.sku;
				}
				if(typeof tst.open_shelves != 'undefined') {
					wardrobe_literal.selectedDoorStyleSku = '';
					wardrobe_literal.selectedDoorColorSku = tst.open_shelves.frames.pattern.custom_options_child.sku;
				}
				newIndex++;
			}
		}
		wardrobe_literal.globalCount = newIndex;
		$scope.price = wardrobe_literal.wardrobePrice;
		wardrobe_literal.currentMaterialId = editDataFound.material_id;
		$('#wardrobeWorkArea').show();
		$('#wardrobeAddSelection').attr("onclick","return wardrobe_literal.loadWardrobesToAdd();");
		$scope.wardRobeMaterialWiseData = $scope.wardRobeDataAll[editDataFound.material_id];
		 

		$scope.oldBuild = editDataFound.old_data;
		wardrobe_literal.wardrobeData[editDataFound.material_id] = $scope.wardRobeMaterialWiseData;
		wardrobe_literal.currentMaterialId = editDataFound.material_id;
		$scope.wardRobeMaterialWiseDefaultData = $scope.wardRobeMaterialWiseData.default_data;
		$scope.finalObj = editDataFound.old_data;
		var html_tmp = $.parseJSON(window.atob(editDataFound.html_data));
		$scope.html_data = $sce.trustAsHtml(html_tmp);
		wardrobe_literal.finalObj= editDataFound.old_data;

		if (typeof $scope.wardRobeMaterialWiseData.all_data.lofts != 'undefined') { 
			$scope.wardRobeMaterialWiseData.all_data.lofts.arrangedData = dataFactory.arrangeLoftProductData($scope.wardRobeMaterialWiseData);
			wardrobe_literal.wardrobeData[editDataFound.material_id].all_data.lofts.arrangedData = $scope.wardRobeMaterialWiseData.all_data.lofts.arrangedData;
		}
		delete wardrobe_literal.finalObj.height;
		delete wardrobe_literal.finalObj.width;
		delete wardrobe_literal.finalObj.depth;
		$scope.waFinalObj = wardrobe_literal.finalObj;
		wardrobe_literal.old_json_tmp = editDataFound.old_json_tmp;
		var tmpDimCalc = wardrobe_literal.calculateDimension({type:"all"});
		$scope.height = tmpDimCalc.height;
		$scope.width = tmpDimCalc.width;
		$('#wardrobeWorkArea').show();
		$('#wardrobeAddOn .wardrobe-add-on-container').css('visibility','visible');
		wardrobe_literal.afterAjax();
    }
    
	//show info
	$scope.showInfo = function () {
            var materialText = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]['customOptionAttributes'][wardrobe_literal.currentMaterialId].frontend_lable;
            wardrobe_literal.addEventTracker('Price Breakup', materialText);
            
		$scope.wardrobeFinalObj = wardrobe_literal.finalObj;
		setTimeout(function(){
			wardrobe_literal.showInfoModal();
		}, 100);
		
		//$scope.wardrobeDataAll = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId];
	}
	
    
	if(editDataFound != '') {
		$('#wardrobeWorkArea').show();
        $('#wardrobeAddOn').show();
		$('#wardrobeAddSelection').attr("onclick","return wardrobe_literal.loadWardrobesToAdd();");
		
		$scope.openEditDesignArea();
    }
	/* else if(PF.UTILITIES.readCookie('wardrobeExists') != 'undefined' && PF.UTILITIES.readCookie('wardrobeExists') == 'yes') {
		debugger;
		wardrobe_literal.finalObj = $.parseJSON(localStorage.getItem('wardrobeFO'));
		wardrobe_literal.wardrobeSepPrice = $.parseJSON(localStorage.getItem('wardrobeSP'));
		wardrobe_literal.loftSepPrice = $.parseJSON(localStorage.getItem('wardrobeLoftSP'));
		var html_data = localStorage.getItem('wardrobeHtml');
		wardrobe_literal.selectedDoorColorSku = localStorage.getItem('wardrobeDC');
		wardrobe_literal.selectedDoorStyleSku = localStorage.getItem('wardrobeDS');
		wardrobe_literal.globalCount = localStorage.getItem('wardrobeGC');
		wardrobe_literal.currentMaterialId = localStorage.getItem('wardrobeCM');
		var mat_id = wardrobe_literal.currentMaterialId;
		if(!$.isEmptyObject($scope.wardRobeDataAll) && !$.isEmptyObject($scope.wardRobeDataAll[mat_id])) {
			wardrobe_literal.wardrobeData[mat_id] = $scope.wardRobeDataAll[mat_id];
		
			$scope.wardRobeMaterialWiseData = $scope.wardRobeDataAll[mat_id];
			$scope.html_data = $sce.trustAsHtml(html_data);
			$scope.finalObj = wardrobe_literal.finalObj;
			if (typeof $scope.wardRobeMaterialWiseData.all_data.lofts != 'undefined') { 
				$scope.wardRobeMaterialWiseData.all_data.lofts.arrangedData = dataFactory.arrangeLoftProductData($scope.wardRobeMaterialWiseData);
				wardrobe_literal.wardrobeData[mat_id].all_data.lofts.arrangedData = $scope.wardRobeMaterialWiseData.all_data.lofts.arrangedData;
			}
			var tmpDimCalc = wardrobe_literal.calculateDimension({type:"all"});
			$scope.height = tmpDimCalc.height;
			$scope.width = tmpDimCalc.width;

			$('#wardrobeWorkArea').show();
			$('#wardrobeAddOn').show();
			$('#wardrobeAddOn .wardrobe-add-on-container').css('visibility', 'visible');
			$('#wardrobeAddSelection').attr("onclick","return wardrobe_literal.loadWardrobesToAdd();");
			
			wardrobe_literal.afterAjax();
		}
		else {
			$scope.wardRobeMaterialWiseDefaultData = {};   
            $scope.wardRobeMaterialWiseDefaultData['no_product'] = 'Products Not Found for this material.';
		} 
	} */
	else {
		$('#wardrobeLandingContainer').show();
		
		$scope.wardrobeMaterialData = wardrobeMaterialData;
	}
    
    $scope.openLanding = function ( material ) {
        var action  = this.material.frontend_lable;
        wardrobe_literal.addEventTracker(action,'click');
        
        var param = {"materialId":material};
		//$location.path( path);
        $scope.materialId = material;
		wardrobe_literal.currentMaterialId = material;

        wardrobe_literal.materialFrameIdenticalFlag = wardrobeMaterialData[material].same_internal_color;
		$scope.materialFrameIdenticalFlag = wardrobe_literal.materialFrameIdenticalFlag;
        if(!$.isEmptyObject($scope.wardRobeDataAll)) {
			if(typeof $scope.wardRobeDataAll[material] == 'undefined') {
				$scope.wardRobeMaterialWiseDefaultData = {};   
                $scope.wardRobeMaterialWiseDefaultData['no_product'] = 'Products Not Found for this material.';
            }
            else {
                $scope.wardRobeMaterialWiseDefaultData = {};
                $scope.wardRobeMaterialWiseData = {};
                
                delete $scope.wardRobeMaterialWiseDefaultData.no_product;
                $scope.wardRobeMaterialWiseDefaultDataFound = "Yes";
                //$scope.selectedMaterialId = material;

                $scope.wardRobeMaterialWiseDefaultData = $scope.wardRobeDataAll[material].default_data;
                $scope.wardRobeMaterialWiseData = $scope.wardRobeDataAll[material];

                wardrobe_literal.wardrobeData[material] = $scope.wardRobeDataAll[material];
            }
		}
		else {
			$scope.wardRobeMaterialWiseDefaultData = {};   
            $scope.wardRobeMaterialWiseDefaultData['no_product'] = 'Products Not Found for this material.';
		}
        $('#wardrobeLandingContainer').hide();
        $('#wardrobeLandingContainerNew').show();
		$scope.selectedMaterialId = material;
        $scope.materialId = material;

    };
    
    $scope.classDecideForHeight = function(htId,isDefault,doorType,heightValue) {
        var class_name = '';
        if(typeof htId != 'undefined' && typeof isDefault != 'undefined' && typeof heightValue != 'undefined') {
            if(heightValue > wardrobe_literal.small_loft_height) {
                if(isDefault == 1) {
                    class_name = 'wardrobe-option-content loft-fst-height-container selected-option ' + doorType + '_' + htId;
                }
                else {
                    class_name = 'wardrobe-option-content loft-fst-height-container ' + doorType + '_' + htId;
                }
            }
            else {
                if(isDefault == 1) {
                    class_name = 'wardrobe-option-content loft-sec-height-container selected-option ' + doorType + '_' + htId;
                }
                else {
                    class_name = 'wardrobe-option-content loft-sec-height-container ' + doorType + '_' + htId;
                }
            }
        }
        return class_name;
    }

    $scope.internalColorDecideForMaterial = function(frameColor,doorColor,imgPath) {
        if(wardrobe_literal.materialFrameIdenticalFlag == true) {
            var ret = doorColor;
        }
        else {
            var ret = frameColor;
        }
        if(imgPath) {
            ret = $scope.imageDirPath + ret + '.jpg?v=0.' + $scope.imageVersion;
            return ret;
        }
        else {
            return ret;
        }
        
    }
    $scope.getImgPath = function(imgName,imgExt) { 
        var ret = $scope.imageDirPath + imgName + '.' + imgExt + '?v=0.' + $scope.imageVersion;
        return ret;
    }

    $scope.internalColorDecideForDesign = function(frameColor,doorColor) {
        if(wardrobe_literal.materialFrameIdenticalFlag == true) {
            return doorColor;
        }
        else {
            return frameColor;
        }
    }
    
    $scope.formatPrice = function (price){
		if(price != '') {
			//return PF.UTILITIES.addSeparatorsNF(price);   
			return wardrobe_literal.formatPrice(price);
        }
        else {
            return '';
        }
    }
    
    
    $scope.openDesignArea = function(materialId,type) {
        var action = '';
        var label = wardrobe_literal.wardrobeData[wardrobe_literal.currentMaterialId]['customOptionAttributes'][wardrobe_literal.currentMaterialId].frontend_lable;
        if(type == 'single_door') {
            action = 'Single Door';
        } else if(type == 'double_door') {
            action = 'Double Door';
        } else if(type == 'open_shelves') {
            action = 'Open Shelves';
        }
        wardrobe_literal.addEventTracker(action, label);
        
        dataLayer.push({'event': 'Wardrobe_Selection', 'page': 'Starting Selection'});
        
        $('#wardrobeLandingContainerNew').hide();
        $('#wardrobeWorkArea').show();
        $('#wardrobeAddOn').show();
        $('#wardrobeAddOn .wardrobe-add-on-container').css('visibility', 'visible');
        
		$('#wardrobeAddSelection').attr("onclick","return wardrobe_literal.loadWardrobesToAdd();");
        
        
        $scope.defaultWardrobe = $('#'+type).html().trim();
        
        
        wardrobe_literal.finalObj[1]= wardrobe_literal.addProduct($scope.wardRobeMaterialWiseData,type,'default',1);
        var tmpPriceCalc = wardrobe_literal.calculateWardrobePrice({"type": "add","position":1,"wardrobe_type":type});
        var tmpDimCalc = wardrobe_literal.calculateDimension({type:"individual","position":1,"wardrobe_type":type});
        $scope.height = tmpDimCalc.height;
        $scope.width = tmpDimCalc.width;

        //$scope.html_data = $sce.trustAsHtml(wardrobe_literal.defaultWardrobeHtmlData[$routeParams.type]);
        $scope.html_data = $sce.trustAsHtml($scope.defaultWardrobe);

        $scope.finalObj = wardrobe_literal.finalObj;
        if (typeof $scope.wardRobeMaterialWiseData.all_data.lofts != 'undefined') { 
            $scope.wardRobeMaterialWiseData.all_data.lofts.arrangedData = dataFactory.arrangeLoftProductData($scope.wardRobeMaterialWiseData);
            wardrobe_literal.wardrobeData[materialId].all_data.lofts.arrangedData = $scope.wardRobeMaterialWiseData.all_data.lofts.arrangedData;
        }
        var temp = dataFactory.arrangeDefaultData($scope.wardRobeMaterialWiseData.default_data,type);
        $scope.price = wardrobe_literal.wardrobePrice;
        wardrobe_literal.selectedDoorStyleSku = temp.door_style_sku;
        wardrobe_literal.selectedDoorColorSku = temp.door_color_sku;
        wardrobe_literal.afterAjax();
    }
	$scope.roundTwo = function (val) {
		return wardrobe_literal.roundToTwo(val);
	}
    
});


//Filter to accept html data (material description)
customizedWardrobe.filter('unsafe',['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
}]);
//Filter to sort material data according to sort order
customizedWardrobe.filter('sortMaterial',['$sce', function ($sce) {
    return function (materialData) {
        var result = {};
        angular.forEach(materialData, function(val, key) {
            result[val.sort_order] = val;
        });
        return result;
    };
}]); 

