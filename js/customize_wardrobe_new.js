/* Media queries */
var mqSmall="360px", mqMedium="768px", mqMediumLandscape="1024px", mqLargeLandscape="1169px" ,mqLarge="1170px", mqLargeHD="1857px";
var customize_wardrobe = {
    divSkeletonSingle: '',
    divSkeletonDouble: '',
    divSkeletonOpenShelves: '',
    doubleDoorStyleDiv: '',
    doubleDoorLayoutDiv: '',
    singleDoorStyleDiv: '',
    singleDoorLayoutDiv: '',
    DoubleDoorStyleStr: '',
    DefaultDdColor: '',
    DefaultDdFrameColor: '',
    dim_flag: 0,
    mer_flag: 0,
    scrollDefaults: {cursorcolor:"#f44336",cursorwidth:"10px",cursorborderradius:"0"},
    DoubleDoorFrameLayOutContainer: {},
    DoubleDoorStyleContainer: {},
    styleContainer: {},
    openDoorSelection: function (t) {
        if($(t).hasClass('double-door')) {
            $("#wardrobeConfigure").append(this.divSkeletonDouble);
            $('#style_container').html(this.DoubleDoorStyleStr);
            $('#color_container').html(this.DoubleDoorStyleContainer[this.DefaultDdColor]);
            $('#frame_layout_contaier').html(this.DoubleDoorFrameLayOutStr);
            $('#frame_color_container').html(this.DoubleDoorFrameLayOutContainer[this.DefaultDdFrameColor]);
            debugger;
            this.inheritDoorSkeleton();
        }
        this.addSectionPostion();
        
        $('#wardrobeWorkArea, #wardrobeAddSelection').show();
        $('#wardrobeLandingContainer').hide();
        $('#wardrobeAddOn .wardrobe-add-on-container').css('visibility', 'visible');
        this.wardrobeWorkableInitialize();
    },
    initialize: function () {
        $('#wardrobeDesignSelectionContainer').on('click tap', '.single-door, .double-door, .open-shelves', function () {
            customize_wardrobe.openDoorSelection(this);
        });
        $(function () {
            //-----This will build various styles options of double door div. Start
            if (doors.double_door.custom_options != '') {
                var DoubleDoorStyleInnerStr = '';
                var DoubleDoorColorInnerStr = '';
                var doubleDoorCustOpts = doors.double_door.custom_options;
                var finAra = new Array();
                var doubulDoorInnerData = new Array();
                var tmpcntr = 0;
                var defCol = false;
                var imgConst = 1;
                for (var i in doubleDoorCustOpts) {
                    var def = doubleDoorCustOpts[i].is_default;
                    var custOptChTemp = doubleDoorCustOpts[i].custom_options_child;
                    var optData = new Array();
                    if (typeof custOptChTemp != undefined) {
                        for (var j in custOptChTemp) {
                            if (typeof optData[custOptChTemp[j].color_type] == 'undefined') {
                                optData[custOptChTemp[j].color_type] = new Array();
                            }
                            var tmepColor = (custOptChTemp[j].color != '' ? custOptChTemp[j].color : '5656');
                            optData[custOptChTemp[j].color_type].push([tmepColor, custOptChTemp[j].is_default, custOptChTemp[j].price]);
                        }
                    }
                    var colorTypeLi = '';
                    var colorDiv = '';
                       
                    if (optData.length > 0) {
                        var cnt = 0;
                        var ulContainer = ''; 
                        var colrConst = 1;
                        for (var k in optData) {
                            if(!isNaN(k)) {
                                var isActiveClass = '';
                                var isActiveAttr = '';
                                var colorInDiv = '';
                                cnt++;
                                
                                for (var l in optData[k]) {
                                    var appClass = '';
                                    if(optData[k][l][1] == 1) {
                                        appClass = 'default-door-color selected-option';
                                        isActiveClass = 'active-menu';
                                        isActiveAttr = 'default_color = "yes"';
                                    }
                                    colorInDiv += '<div class="wardrobe-option-content ' + appClass + '" style="background-image: url(\'images/door_color/'+ colrConst++ +'.jpg\')" >';//default-door-color selected-option
                                    colorInDiv += '<div class="wardrobe-option-content-img">&nbsp;';
                                    colorInDiv += '</div>';
                                    colorInDiv += '<div class="wardrobe-option-content-detail">';
                                    colorInDiv += '<p class="wardrobe-option-content-name">' + attributes[optData[k][l][0]].frontend_lable + '</p>';
                                    colorInDiv += '<p class="wardrobe-option-content-price">Rs <span>' + Math.round(optData[k][l][2]) + '</span></p>';
                                    colorInDiv += '</div>';
                                    colorInDiv += '</div>';
                                }
                                colorDiv += '<div id="wardrobeDoorDesignColor' + attributes[k].frontend_lable + 'Container" class="sub-tab-active wardrobe-content-scroll-area" '+ isActiveAttr +'>';
                                colorDiv += '<div class="wardrobe-option-container column-third">';
                                colorDiv += colorInDiv;
                                colorDiv += '</div>';
                                colorDiv += '</div>';
                                
                                colorTypeLi += '<li id="wardrobeDoorDesignColor' + attributes[k].frontend_lable + '" class="' + isActiveClass + '">' + attributes[k].frontend_lable + '</li>';//active-menu
                                
                            }
                        }
                        ulContainer = '<ul id="wardrobeDoorDesignColorTabSwitcher" class="clearfix">'+colorTypeLi+'<div id="nav-cursor-move"></div></ul>';

                    }
                    var tmpStr = '';
                    tmpStr += '<div id="wardrobeDoorDesignColorContainer" class="customize-wardrobe-option tab-active"  style="display:none">';
                    tmpStr += '<h4>Color</h4>';
                    tmpStr += '<div class="control-close" >&nbsp;</div>';
                    tmpStr += ulContainer;
                    tmpStr += colorDiv;
                    tmpStr += '</div>';
                    customize_wardrobe.DoubleDoorStyleContainer[doubleDoorCustOpts[i].option_id] = tmpStr;
                    finAra.push(optData);
                    
                    // Door styles
                    if(def) {
                        customize_wardrobe.DefaultDdColor = doubleDoorCustOpts[i].option_id;
                    }
                    var tmp = '<div class="wardrobe-option-content ' + (tmpcntr == 0 ? ' default-door-design selected-option' : '')+ '" id="double_door_' + doubleDoorCustOpts[i].option_id + '" opt_id="' + doubleDoorCustOpts[i].option_id + '" >';
                    tmp += '<div class="wardrobe-option-content-img">';
                    tmp += '<img src="images/D1_'+ imgConst++ +'_Frame_LH.png" />';
                    tmp += '<span class="door-handle-option-left" style="background-image:url(\'images/door_handle_1.png\')">&nbsp;</span>';
                    tmp += '</div>';
                    tmp += '<div class="wardrobe-option-content-detail">';
                    tmp += '<p class="wardrobe-option-content-name">' + doubleDoorCustOpts[i].title + '</p>';
                    tmp += '<p class="wardrobe-option-content-price">Rs <span>' + Math.round(doubleDoorCustOpts[i].price) + '</span></p>';
                    tmp += '</div>';
                    tmp += '</div>';
                    DoubleDoorStyleInnerStr = tmp + DoubleDoorStyleInnerStr;
                    // Door styles End
                    tmpcntr++
                }
                customize_wardrobe.DoubleDoorStyleStr = '<div id="wardrobeDoorDesignStyleContainer" class="tab-active customize-wardrobe-option" style="display:none;"><h4>Style</h4><div class="control-close" style="display:none;">&nbsp;</div><div class="wardrobe-content-scroll-area" tabindex="0"><div class="wardrobe-option-container column-split" id="double_door">' + DoubleDoorStyleInnerStr + '</div></div></div>';
                
                
            }

            //-----This will build various styles options of double door div. Start
            
            
            if (frames.double_door_frame.custom_options != '') {
                var defFrame = 0;
                var DefaultLayOut = '';
                var DoubleDoorFrameLayoutInnerStr = '';
                var DoubleDoorFrameColorInnerStr = '';
                var doubleDoorFrameCustOpts = frames.double_door_frame.custom_options;
                var finAra = new Array();
                var doubulDoorFrameInnerData = new Array();
                var tmpcntr = 0;
                var frameCntImg = 1;
                var colorDiv = '';
                var frameColorDefFlag = true;
                for (var i in doubleDoorFrameCustOpts) {
                    var custOptChTemp = doubleDoorFrameCustOpts[i].custom_options_child;
                    defFrame = doubleDoorFrameCustOpts[i].is_default;
                    var optData = new Array();
                    if (typeof custOptChTemp != undefined) {
                        var tmpFrameCol = 1;
                        for (var j in custOptChTemp) {
                            var tmpAppend = '';
                            if(frameColorDefFlag && custOptChTemp[j].is_default == 1) {
                                tmpAppend = ' default-wardrobe-color selected-option';
                                frameColorDefFlag = false;
                            }
                            colorDiv += '<div class="wardrobe-option-content'+ tmpAppend +'" style="background-image:url(\'images/frame_color/'+ tmpFrameCol++ +'.jpg\')">';
							colorDiv += '<div class="wardrobe-option-content-img">&nbsp;';
							colorDiv += '</div>';
							colorDiv += '<div class="wardrobe-option-content-detail">';
							colorDiv += '<p class="wardrobe-option-content-name">'+ (custOptChTemp[j].color != '' && typeof attributes[custOptChTemp[j].color].frontend_lable != 'undefined' ? attributes[custOptChTemp[j].color].frontend_lable : 'Not Found') +'</p>';
							colorDiv += '<p class="wardrobe-option-content-price">Rs <span>'+Math.round(custOptChTemp[j].price)+'</span></p>';
							colorDiv += '</div>';	
							colorDiv += '</div>';
                        }
                    }
                    
                    var tmpStr = '';
                    tmpStr += '<div id="wardrobeInternalDesignColorContainer"  class="tab-active customize-wardrobe-option"  style="display:none">';
                    tmpStr += '<h4>Color</h4>';
                    tmpStr += '<div class="control-close"  style="display: none">&nbsp;</div>';
                    tmpStr += '<div class="wardrobe-content-scroll-area">';
                    tmpStr += '<div class="wardrobe-option-container column-third">';
                    tmpStr += colorDiv;
                    tmpStr += '</div>';
                    tmpStr += '</div>';
                    tmpStr += '</div>';
                    
                    customize_wardrobe.DoubleDoorFrameLayOutContainer[doubleDoorFrameCustOpts[i].option_id] = tmpStr;

                    //customize_wardrobe.DefaultDdFrameColor = doubleDoorFrameCustOpts[i].option_id;
                    
                    var tmp = '<div class="wardrobe-option-content ' + (defFrame == 1 ? ' selected-option' : '')+ '" id="double_door_frame' + doubleDoorFrameCustOpts[i].option_id + '" opt_id = "'+ doubleDoorFrameCustOpts[i].option_id +'">';
                    tmp += '<div class="wardrobe-option-content-img">';
                    tmp += '<img src="images/S2_'+ frameCntImg++ +'_Frame.png" />';
                    tmp += '</div>';
                    tmp += '<div class="wardrobe-option-content-detail">';
                    tmp += '<p class="wardrobe-option-content-name">' + doubleDoorFrameCustOpts[i].title + '</p>';
                    tmp += '<p class="wardrobe-option-content-price">Rs <span>' + Math.round(doubleDoorFrameCustOpts[i].price) + '</span></p>';
                    tmp += '</div>';
                    tmp += '</div>';
                    DoubleDoorFrameLayoutInnerStr = tmp + DoubleDoorFrameLayoutInnerStr;
                    // Door styles End
                    if(defFrame == 1) {
                        customize_wardrobe.DefaultDdFrameColor = doubleDoorFrameCustOpts[i].option_id;
                        DefaultLayOut =  'images/S2_'+ (frameCntImg - 1) +'_Frame.png';
                    }
                    
                    tmpcntr++
                    
                }
                customize_wardrobe.DoubleDoorFrameLayOutStr = '<div id="wardrobeInternalDesignLayoutContainer" class="tab-active customize-wardrobe-option" style="display:none"><h4>Layout</h4><div class="control-close" style="display: none">&nbsp;</div><div class="wardrobe-content-scroll-area double-door-layout" style="display:none;"><div class="wardrobe-option-container column-split" id="double_door">' + DoubleDoorFrameLayoutInnerStr + '</div></div></div>';
                
                customize_wardrobe.divSkeletonDouble = 
                '<div class="wardrobe-configure-container double-door wt-door">'
                +'<div class="wardrobe-skeleton-container"><img data-dim="off" data-mer="off" src="images/S2_1_Frame.png"  /></div>'
                +'<div class="door-skeleton-container">'
                +'<div class="door-shutter-container"><div class="door-shutter-container-left"></div>'		
                +'<div class="door-shutter-container-right"></div></div>'
                +'</div></div>';
                
                
            }
            
            
        });
        
        
    },
    inheritDoorSkeleton: function() {
        /* default wardrobe */		
        dfwc = $('.default-wardrobe-color').attr('style');  				/* default wardrobe color */
        dfwdc =  $('.default-door-color').attr('style');
        dfwdd	= $('.default-door-design').find('img').attr('src');
        dfwdh =  $('.default-door-design').find('.door-handle-option-left').css('background-image');
        dfwdh = dfwdh.replace('url(','').replace(')','');
        dfosc = $('.default-open-shelves-color').attr('style');				/* default open shelves color */
        var lw, slw, slwc, slwdc, slwdd, slwdh;
        
        lw = $('#wardrobeConfigure .wardrobe-configure-container:last-child');  /* last appended wardrobe */	

        if ($('#wardrobeConfigure .wt-door').length > 1) {
            slw = $('#wardrobeConfigure .wt-door:nth-last-of-type(2)');		/* second last wardrobe */
            slwc = $(slw).find('.wardrobe-skeleton-container').attr('style');	/* second last wardrobe color */
            slwdc =  $(slw).find('.door-skeleton-container').attr('style');			/* second last wardrobe door color */
            slwdd =  $(slw).find('.door-shutter-container-right-d').attr('src');		/* second last wardrobe door design */
            slwdh =  $(slw).find('.door-shutter-container-right-h img').attr('src');		/* second last wardrobe door handle */

            $(lw).find('.wardrobe-skeleton-container').attr('style',slwc);
            $(lw).find('.door-skeleton-container').attr('style',slwdc);

            if($(lw).hasClass('double-door')) {
                if($(slw).hasClass('mirror-active')) {
                    $(lw).find('.door-shutter-container-left').append('<img class="door-shutter-container-left-d" src="'+dfwdd+'" data-image="'+dfwdd+'" /><span class="door-shutter-container-left-h"><img src="'+slwdh+'" /></span>');
                    $(lw).find('.door-shutter-container-right').append('<img class="door-shutter-container-right-d" src="'+dfwdd+'" data-image="'+dfwdd+'" /><span class="door-shutter-container-right-h"><img src="'+slwdh+'" /></span>');
                } else {
                    $(lw).find('.door-shutter-container-left').append('<img class="door-shutter-container-left-d" src="'+slwdd+'" data-image="'+slwdd+'" /><span class="door-shutter-container-left-h"><img src="'+slwdh+'" /></span>');
                    $(lw).find('.door-shutter-container-right').append('<img class="door-shutter-container-right-d" src="'+slwdd+'" data-image="'+slwdd+'" /><span class="door-shutter-container-right-h"><img src="'+slwdh+'" /></span>');
                }
            }

            else if ($(lw).hasClass('single-door')){
                if($(slw).hasClass('mirror-active')) {
                    $(lw).find('.door-shutter-container-right').append('<img class="door-shutter-container-right-d" src="'+dfwdd+'" data-image="'+dfwdd+'" />	<span class="door-shutter-container-right-h"><img src="'+slwdh+'" /></span>');
                } else {
                    $(lw).find('.door-shutter-container-right').append('<img class="door-shutter-container-right-d" src="'+slwdd+'" data-image="'+slwdd+'" />	<span class="door-shutter-container-right-h"><img src="'+slwdh+'" /></span>');
                }
            }
        }

        else {	

            $(lw).find('.wardrobe-skeleton-container').attr('style', dfwc);						
            $(lw).find('.door-skeleton-container').attr('style',dfwdc);

            if($(lw).hasClass('double-door')) {
                $(lw).find('.door-shutter-container-left').append('<img class="door-shutter-container-left-d" src="'+dfwdd+'" data-image="'+dfwdd+'" /><span class="door-shutter-container-left-h"><img src='+dfwdh+' /></span>');
                $(lw).find('.door-shutter-container-right').append('<img class="door-shutter-container-right-d" src="'+dfwdd+'" data-image="'+dfwdd+'" /><span class="door-shutter-container-right-h"><img src='+dfwdh+' /></span>');
            }
            if($(lw).hasClass('single-door')) {
                $(lw).find('.door-shutter-container-right').append('<img class="door-shutter-container-right-d" src="'+dfwdd+'"  data-image="'+dfwdd+'"/><span class="door-shutter-container-right-h"><img src='+dfwdh+' /></span>');
            }			

        }	/* apply default */		
        
    },
    addSectionPostion: function() {
        var addButton, positionLastWardrobe, widthLastWardrobe, newPosition, accum_width = 0;
        addButton = $('#wardrobeAddSelection');
        positionLastWardrobe = $('#wardrobeConfigure .wardrobe-configure-container:last-child').offset();
        widthLastWardrobe =  $('#wardrobeConfigure .wardrobe-configure-container:last-child').width();
        newPosition = positionLastWardrobe.left + widthLastWardrobe + 28;
        actualPostion = $('.wardrobe-horizontal-scroll-area').offset().left + $('#wardrobeConfigure').width() + 28;

        $('.wardrobe-configure-container').each(function(e) {
            var actualWidth = $(this).outerWidth();
           accum_width += parseInt(actualWidth) + 2;
        });

        if( accum_width > $('#wardrobeConfigure').width()) {
            addButton.css('left',actualPostion);	
        } else {
            addButton.css('left',newPosition);		
        }
    },
    wardrobeWorkableInitialize: function () {
        /* wardrobe work area start */	
        $('body').on('click tap', '#wardrobeWorkArea, #wardrobeAddOn',function() {
            if($('#wardrobeWorkArea').css("display")!="none") {
                $('#wardrobeConfigure .wardrobe-configure-container').stop( true, true );
                $('#customizeWardrobe').hide();		
                $('#wardrobeAddSelection').fadeIn('fast');
                $('#wardrobeWorkArea').find('.wardrobe-delete-btn').hide();
                $('#wardrobeAddOn .wardrobe-add-on-container').css('visibility','visible');	
                $('#wardrobeConfigure .wardrobe-configure-container').removeClass('selected-type');		
                $('#wardrobeConfigure .wardrobe-configure-container').animate({'transform': "scale(1)"}, { duration: 300});		
                $('#wardrobeConfigure .wardrobe-configure-container').css({'left':'auto','top':'auto','opacity':'1','position':'relative'});
                if(customize_wardrobe.dim_flag == 0 && customize_wardrobe.mer_flag == 0) {doorClose();}
                $( "#wardrobeConfigure" ).sortable( "enable" );
                $('.wardrobe-horizontal-scroll-area').niceScroll(customize_wardrobe.scrollDefaults);	
                costHide();
            }
        });

        $('#wardrobeAddOn').on('click tap','.wardrobe-add-on-container', function(event){
            event.stopPropagation();	
        });

        $('#wardrobeConfigure').on('click tap','.selected-type', function(event){
            event.stopPropagation();	
        });

        $('#wardrobeConfigure').on('click tap','.wardrobe-configure-container:not(.selected-type)', function(event){
            $('#wardrobeConfigure .wardrobe-configure-container').stop( true, true );
            if(!$('#wardrobeConfigure .wardrobe-configure-container').hasClass('selected-type')) {	
                event.stopPropagation();				
                $('#wardrobeAddSelection').fadeOut('fast');
                $('#wardrobeAddOn .wardrobe-add-on-container').css('visibility','hidden');
                $('#wardrobeConfigure .wardrobe-configure-container').css({'left':'auto','top':'auto','position':'relative'});	
                $('#wardrobeConfigure .wardrobe-configure-container').animate({'transform':'scale(1)','opacity':0.25},300);
                $('#wardrobeWorkArea').find('.wardrobe-delete-btn').hide();
                $(this).animate({'transform': 'scale(1.195)','opacity': 1},{ duration: 800, queue: false});
                $(this).addClass('selected-type').siblings().removeClass('selected-type');	
                //$( "#wardrobeConfigure" ).sortable( "disable" );			
                if($('.selected-type').length){
                    centerContent();				
                    $('.wardrobe-horizontal-scroll-area').getNiceScroll().remove();
                }
                resetWardrobe();
                //costShow();

                if($(this).hasClass('single-door')) {
                    $('#wardrobeInternalDesignLayoutContainer').find('.single-door-layout').show();
                    $('#wardrobeInternalDesignLayoutContainer').find('.double-door-layout').hide();
                    $('#wardrobeDoorDesignMirrorContainer').find('.left-mirror-container').hide();

                    if(Modernizr.mq("only screen and (max-width: "+mqLargeLandscape+")" )) {				
                        $('#wardrobeDoorDesignMirrorContainer').find('.right-mirror-container').css('width','250px');
                    }			
                    if(Modernizr.mq("only screen and (min-width: "+mqLarge+")" )) {				
                        $('#wardrobeDoorDesignMirrorContainer').find('.right-mirror-container').css('width','370px');
                    }			
                    $('#wardrobeDoorDesignMirrorContainer').find('.right-mirror-container .wardrobe-option-content-name').text('With Mirror');
                    $('#wardrobeDoorDesign, #wardrobeInternalDesign, #wardrobeDoorDesignHandle').show();
                    $('#wardrobeOpenShelvesInternalDesign, #wardrobeOpenShelvesExternalDesign').hide();
                }
                if($(this).hasClass('double-door')) {
                    $('#wardrobeInternalDesignLayoutContainer').find('.double-door-layout').show();
                    $('#wardrobeInternalDesignLayoutContainer').find('.single-door-layout').hide();
                    $('#wardrobeDoorDesignMirrorContainer').find('.left-mirror-container').show();

                    if(Modernizr.mq("only screen and (max-width: "+mqLargeLandscape+")" )) {				
                        $('#wardrobeDoorDesignMirrorContainer').find('.right-mirror-container').css('width','124px');
                    }			
                    if(Modernizr.mq("only screen and (min-width: "+mqLarge+")" )) {				
                        $('#wardrobeDoorDesignMirrorContainer').find('.right-mirror-container').css('width','184px');
                    }		

                    $('#wardrobeDoorDesignMirrorContainer').find('.right-mirror-container .wardrobe-option-content-name').text('Right Door with Mirror');
                    $('#wardrobeOpenShelvesInternalDesign, #wardrobeOpenShelvesExternalDesign, #wardrobeDoorDesignHandle').hide();
                    $('#wardrobeDoorDesign, #wardrobeInternalDesign').show();
                }
                if($(this).hasClass('open-shelves')) {
                    $('#wardrobeOpenShelvesInternalDesign, #wardrobeOpenShelvesExternalDesign').show();
                    $('#wardrobeDoorDesign, #wardrobeInternalDesign').hide();
                }		

                $('#wardrobeConfigure .wardrobe-skeleton-container img').each(function() {
                    var  divSrc = $(this).attr('src');
                    if(customize_wardrobe.dim_flag == 1) {			
                        $(this).attr('data-dim','off');  				
                        $(this).attr('src', divSrc.replace('_dim.png', '.png'));				
                    }
                    if(customize_wardrobe.mer_flag == 1) {
                        $(this).attr('data-mer','off'); 				
                        $(this).attr('src', divSrc.replace('_mer.png', '.png'));			
                    }		
                });
                customize_wardrobe.dim_flag = 0;
                customize_wardrobe.mer_flag = 0;
                $('.action-dimension').html('Show </br> Dimension');
                $('.action-merchandise').html('Show </br> Merchandise');
                $('.action-merchandise, .action-dimension').removeClass('active-btn');
                dimHide();
            }
            else {
                $('#wardrobeWorkArea').on('click tap');				
            }
        });			
        /* wardrobe work area end */
        
        
        /* wardrobe door design click function start */
        $('#wardrobeDoorDesignTabSwitcher').on('click tap', 'li', function(){
            var id = $(this).attr('id');
            $('.wardrobe-content-scroll-area').getNiceScroll().remove();
            $('#wardrobeInternalDesign').find('.tab-active').hide();
            $('#wardrobeDoorDesign').find('.control-close').hide();			
            $('#wardrobeInternalDesign').find('.control-close').hide();	
            $('#wardrobeInternalDesignTabSwitcher').fadeIn();
            //costShow();
            $('#wardrobeDoorDesign h2').css('border-bottom','2px solid red');
            $('#wardrobeDoorDesignTabSwitcher').fadeOut( 400, function(){			
                $('#'+id+"Container").show(     function(){
                    $('.wardrobe-content-scroll-area').niceScroll(customize_wardrobe.scrollDefaults);	
                    $('#wardrobeDoorDesign h2').css('border-bottom','none');									
                    //$('#wardrobeDoorDesignColorTabSwitcher li:first-child').addClass('active-menu').siblings().removeClass('active-menu');
                    //$('.sub-tab-active:not(:first)').hide();
                    //$('.sub-tab-active:first').show();
                    $('.sub-tab-active').each(function() {
                       
                        if($(this).attr('default_color')== 'yes') {
                            $(this).show();
                        }
                        else {
                            $(this).hide();
                        }
                        
                    });
                    $('#nav-cursor-move').animate({
                        left: $('#wardrobeDoorDesignColorTabSwitcher .active-menu').position().left,
                        width: $('#wardrobeDoorDesignColorTabSwitcher .active-menu').outerWidth()
                    }, {
                        duration: 350
                    });	
                    $('#'+id+"Container").find('.control-close').show();				
                });			
            });
            doorClose();
        });

        $('#wardrobeDoorDesign').on('click tap', '.control-close', function(){	
            $('.wardrobe-content-scroll-area').getNiceScroll().remove();
            $('#wardrobeDoorDesign h2').css('border-bottom','2px solid red');
            //costHide();
            $(this).hide();
            $(this).closest('.customize-wardrobe-option').hide('slide',{ direction: "right" },700, function(){			
                $('#wardrobeDoorDesignTabSwitcher').fadeIn();
                $('#wardrobeDoorDesign h2').css('border-bottom','none');						
            });		
        });

        $('#wardrobeDoorDesignColorTabSwitcher').on('click tap', 'li:not(.active-menu)', function(){
            var id = $(this).attr('id');
            var position = $(this).position();
            $('#wardrobeDoorDesign').find('.sub-tab-active').slideUp('fast');
            $('#'+id+"Container").slideDown('fast');		
            $(this).addClass('active-menu').siblings().removeClass('active-menu');
            $('#nav-cursor-move').animate({
                left: position.left,
                width: $(this).outerWidth()
            }, {
                duration: 350
            });
            return false;				
        });
        
        /* choose door skeleton or structure */	
        $('#wardrobeDoorDesignStyleContainer').on('click tap', '.wardrobe-option-content', function() {	
            $('#color_container').html('');
            $('#color_container').html(customize_wardrobe.DoubleDoorStyleContainer[$(this).attr('opt_id')]);
            customize_wardrobe.wardrobeWorkableInitialize();
            var doorSelected = 	$(this).find('.wardrobe-option-content-img img').attr('src');
            $(this).addClass('selected-option').siblings().removeClass('selected-option');
            $('#wardrobeDoorDesignMirrorContainer input[type="checkbox"]').attr('checked', false);

            $('.selected-type .door-shutter-container-left-d').removeData('image');		
            $('.selected-type .door-shutter-container-right-d').removeData('image');	

            $('.selected-type .door-shutter-container-left-d').attr({
                'src': doorSelected,
                'data-image': doorSelected
            });

            $('.selected-type .door-shutter-container-right-d').attr({
                'src': doorSelected,
                'data-image': doorSelected		
            });
        });	
        
        /* choose door texture or color */
        $('#wardrobeDoorDesignColorContainer').on('click tap', '.wardrobe-option-content', function() {            var doorBgSelected =  $(this).attr('style');	
            $(this).addClass('selected-option').siblings().removeClass('selected-option');				
            if($('.selected-type').length >= 1) {	
                $('.selected-type .door-skeleton-container').attr('style',doorBgSelected);		
            } 
        });
        
        /* wardrobe internal design click function start */	
        $('#wardrobeInternalDesignTabSwitcher').on('click tap', 'li', function(){
                var id = $(this).attr('id');
            $('.wardrobe-content-scroll-area').getNiceScroll().remove();
            $('#wardrobeDoorDesign').find('.tab-active').hide();	
            $('#wardrobeInternalDesign').find('.control-close').hide();	
            $('#wardrobeDoorDesign').find('.control-close').hide();	
            $('#wardrobeDoorDesignTabSwitcher').fadeIn();
            //costShow();
            $('#wardrobeInternalDesign h2').css('border-bottom','2px solid red');
            $('#wardrobeInternalDesignTabSwitcher').fadeOut( 400, function(){		
                $('#'+id+"Container").show( function(){			
                    $('.wardrobe-content-scroll-area').niceScroll(customize_wardrobe.scrollDefaults);	
                    $('#wardrobeInternalDesign h2').css('border-bottom','none');
                    $('#'+id+"Container").find('.control-close').show();
                });					
            });		
            $('#wardrobeConfigure .selected-type').find('.door-skeleton-container').hide();
        });

        $('#wardrobeInternalDesign').on('click tap', '.control-close', function(){
            $('.wardrobe-content-scroll-area').getNiceScroll().remove();
            $('#wardrobeInternalDesign h2').css('border-bottom','2px solid red');
            //costHide();
            $(this).hide();		
            $(this).closest('.customize-wardrobe-option').hide(function(){			
                $('#wardrobeInternalDesignTabSwitcher').fadeIn();
                $('#wardrobeInternalDesign h2').css('border-bottom','none');						
            });
            $('#wardrobeConfigure .selected-type').find('.door-skeleton-container').show();	/*new added for door*/		
        });
        
        /* choose wardrobe skeleton */		
        $('#wardrobeInternalDesignLayoutContainer').on('click tap', '.wardrobe-option-content', function(){		
            var skeletonSelected =  $(this).find('.wardrobe-option-content-img img').attr('src');		
            var elemContent = $('.selected-type .wardrobe-skeleton-container').find('img');
            $(this).addClass('selected-option').siblings().removeClass('selected-option');
            $(elemContent).attr('src',skeletonSelected);	

            $('.wardrobe-total-cost .wardrobe-cost-addition').css({'opacity':'1'});
            $('.wardrobe-total-cost .wardrobe-cost-addition').animate({ right: "0" },{ duration: 1000, queue: false, complete:function() {
                    $(this).css({'opacity':'0','right':'-75px'});
                    $('.wardrobe-total-cost-value span').text('Rs. 46000').css({'background-color': '#ffd5c4'}).animate({
                        backgroundColor: "transparent"}, {duration: 1000, queue: false} );
                } 
            });	
        });	

        /* choose wardrobe internal color */	
        $('#wardrobeInternalDesignColorContainer').on('click tap', '.wardrobe-option-content', function() {		
            var bgSelected =  $(this).attr('style');		
            $(this).addClass('selected-option').siblings().removeClass('selected-option');
            if($('.selected-type').length >= 1) {
                $('.selected-type .wardrobe-skeleton-container').attr('style',bgSelected);
            } 		

            $('.wardrobe-total-cost .wardrobe-cost-subtraction').css({'opacity':'1'});
            $('.wardrobe-total-cost .wardrobe-cost-subtraction').animate({ right: "-75px" },{ duration: 1000, queue: false, complete:function() {
                    $(this).css({'opacity':'0','right':'0'});
                    $('.wardrobe-total-cost-value span').text('Rs. 43000').css({'background-color': '#ffd5c4'}).animate({
                        backgroundColor: "transparent"},  {duration: 1000, queue: false} );
                } 
            });		
        });
    }
}
customize_wardrobe.initialize();




var containerArea, contentSelected, contentSelectedPrev, contentTop, contentScaleWidth, contentWidth, contentWidthDiff, scaleValue, wardrobeCenterPos;
function centerContent() {
	containerArea = $('#wardrobeWorkArea');
	contentSelected = $('#wardrobeWorkArea .selected-type');
	contentSelectedPrev = contentSelected.prev();
	contentTop = contentSelected.offset().top;
	scaleValue = 1.195;
	contentScaleWidth =  contentSelected.outerWidth(true) * scaleValue;
	contentWidth =  contentSelected.outerWidth(true);
	contentWidthDiff = contentScaleWidth - contentWidth;
	wardrobeCenterPos = (containerArea.width()-contentSelected.width())/2;
	
	contentSelected.css({'left':(contentSelected.offset().left),'position':'absolute'});
	$('#wardrobeDoorDesign, #wardrobeOpenShelvesInternalDesign, #wardrobeInternalDesign, #wardrobeOpenShelvesExternalDesign').css({'z-index':'1'});
	$("#wardrobeDoorDesign, #wardrobeOpenShelvesInternalDesign").css('right',(parseInt(wardrobeCenterPos)-parseInt(contentWidthDiff/2)));
	$("#wardrobeInternalDesign, #wardrobeOpenShelvesExternalDesign").css('left',(parseInt(wardrobeCenterPos)-parseInt(contentWidthDiff/2)));
	$("#wardrobeDoorDesign, #wardrobeOpenShelvesInternalDesign, #wardrobeInternalDesign, #wardrobeOpenShelvesExternalDesign").css('top','96px');
	$('#customizeWardrobe').hide();

	contentSelected.animate({"left": wardrobeCenterPos}, { duration: 800, queue: false, complete:function() {
			selectionRotate();
			$('#wardrobeWorkArea').find('.wardrobe-delete-btn').show();
		}
	});
}

function selectionRotate() {	
	$('#customizeWardrobe').show();
	var wardrobeExtOption = (parseInt(wardrobeCenterPos)-parseInt(contentWidthDiff/2)) + contentScaleWidth;
	var wardrobeInternalOption = (parseInt(wardrobeCenterPos)-parseInt(contentWidthDiff/2)) + contentScaleWidth;
	$('#wardrobeDoorDesign, #wardrobeOpenShelvesInternalDesign').animate({'right': wardrobeExtOption}, 400, function(){
		$('#wardrobeDoorDesign, #wardrobeOpenShelvesInternalDesign, #wardrobeInternalDesign, #wardrobeOpenShelvesExternalDesign').css('z-index','6');
	});
	$('#wardrobeInternalDesign, #wardrobeOpenShelvesExternalDesign').animate({'left': wardrobeInternalOption},400);	
}	

function doorOpen() {
	$(".door-skeleton-container").hide(); 
	$(".action-door-toggle").html('Show </br> Doors');
	$(".action-door-toggle").addClass('active-btn');
}								

function doorClose() { 
	$(".door-skeleton-container").show();
	$(".action-door-toggle").html('Hide </br> Doors');
	$(".action-door-toggle").removeClass('active-btn');
}

function costShow() {
	$('#wardrobeAdditionalInfo .wardrobe-total-cost').stop( true, true );
	$('#wardrobeAdditionalInfo').find('.wardrobe-total-cost').fadeIn('fast', function(){
		$(this).addClass('active-text',500, "easeOutBounce");					
	});	
}
function costHide() {
	$('#wardrobeAdditionalInfo .wardrobe-total-cost').stop( true, true );
	$('#wardrobeAdditionalInfo').find('.wardrobe-total-cost').fadeOut('slow', function(){
		$(this).removeClass('active-text',500);					
	});
}

function dimShow() {
	$('#wardrobeAdditionalInfo .wardrobe-total-dimension').stop( true, true );
	$('#wardrobeAdditionalInfo').find('.wardrobe-total-dimension').fadeIn('fast', function(){
		$(this).addClass('active-text',500, "easeOutBounce");					
	});	
}

function dimHide() {
	$('#wardrobeAdditionalInfo .wardrobe-total-dimension').stop( true, true );
	$('#wardrobeAdditionalInfo').find('.wardrobe-total-dimension').fadeOut('slow', function(){
		$(this).removeClass('active-text',500);					
	});	
}

function resetWardrobe() {
	$('#customizeWardrobe .control-close').click();
	doorClose();
	
    $('.sub-tab-active').each(function() {

        if($(this).attr('default_color')== 'yes') {
            $(this).show();
        }
        else {
            $(this).hide();
        }

    });
    
    $('.nav-tab-active').each(function() {

        if($(this).attr('default_color')== 'yes') {
            $(this).show();
        }
        else {
            $(this).hide();
        }

    });

}

/*  dimension functionality  */
	$('.action-dimension').on('click tap', function(){		
		$('#wardrobeConfigure .wardrobe-skeleton-container img').each(function() {			
			var  src = $(this).attr('src');			
			if (!$(this).attr('data-dim') || $(this).attr('data-dim') == 'off'){				
				$(this).attr('data-dim','on');  
				dim_flag = 1;
				if($(this).attr('data-mer') == 'on') {
					$(this).attr('src', src.replace('_mer.png', '_dim.png'));
					$(this).attr('data-mer','off');
					mer_flag = 0;
					$('.action-merchandise').html('Show </br> Merchandise');
					$('.action-dimension').html('Hide </br> Dimensions');
					$('.action-merchandise').removeClass('active-btn');
				} else {
					$(this).attr('src', src.replace('.png', '_dim.png'));
					$('.action-dimension').html('Hide </br> Dimensions');
				}	
				$('.action-dimension').addClass('active-btn');
				dimShow();
			}
			else if ($(this).attr('data-dim') == 'on'){				
				$(this).attr('data-dim','off');	
				dim_flag = 0;				
				$(this).attr('src', src.replace('_dim.png', '.png'));	
				$('.action-dimension').html('Show </br> Dimensions');
				$('.action-dimension').removeClass('active-btn');
				dimHide();
			}				
		});
		doorOpen();
	});	
	
	
	/* merchandise functionality */
	$('.action-merchandise').on('click tap', function(){		
		$('#wardrobeConfigure .wardrobe-skeleton-container img').each(function() {	
			var  src = $(this).attr('src');			
			if (!$(this).attr('data-mer') || $(this).attr('data-mer') == 'off'){				
				$(this).attr('data-mer','on');  
				mer_flag = 1;
				if($(this).attr('data-dim') == 'on') {		
					$(this).attr('src', src.replace('_dim.png', '_mer.png'));					
					$(this).attr('data-dim','off');
					dim_flag = 0;	
					$('.action-dimension').html('Show </br> Dimensions');	
					$('.action-merchandise').html('Hide </br> Merchandise');	
					$('.action-dimension').removeClass('active-btn');
				} else {
					$(this).attr('src', src.replace('.png', '_mer.png'));
					$('.action-merchandise').html('Hide </br> Merchandise');
				}	
				$('.action-merchandise').addClass('active-btn');
				dimHide();
			}
			else if ($(this).attr('data-mer') == 'on'){				
				$(this).attr('data-mer','off');	
				mer_flag = 0;				
				$(this).attr('src', src.replace('_mer.png', '.png'));			
				$('.action-merchandise').html('Show </br> Merchandise');	
				$('.action-merchandise').removeClass('active-btn');
			}				
		});
		doorOpen();		
	});	
    
    $(".action-door-toggle").on('click tap', function() {
		if($(".door-skeleton-container").css("display")=="block") {
			doorOpen();			
		} else {
			doorClose();
		}
	});