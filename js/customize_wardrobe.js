/*  global variable */
var dfwc, dfwcp, dfwdc, dfwdcp, dfwdd, dfwddp;

/* Media queries */
var mqSmall="360px", mqMedium="768px", mqMediumLandscape="1024px", mqLargeLandscape="1169px" ,mqLarge="1170px", mqLargeHD="1857px";

var scrollDefaults = {cursorcolor:"#f44336",cursorwidth:"10px",cursorborderradius:"0"};

function initializePage() {
	$(window).on("debouncedresize", function( event ) {
		arrangePageElements();
	});
	arrangePageElements();	
}

function buildModal(modalID, modalTitle, modalBody, modalFooter) {
	modalHTML = '<div id="' + modalID + '" class="modal"><div class="modal-header"><a href="javascript: void(null);" class="control-close control-close-modal"></a><p>' + modalTitle + '</p></div><div class="modal-body">' + modalBody + '</div><div class="modal-footer">' + modalFooter + '</div></div>';
	$.modal(modalHTML, 
	  {
		  /* First, the functions we want to run when the dialog opens */
		  onOpen: function (dialog) {
			dialog.overlay.fadeIn('fast', function () {
				dialog.container.slideDown('fast', function () {
					dialog.data.fadeIn('fast');										
				});
			});
		  },
		  /* Next, the functions we want to run when the dialog box is visible */
		  onShow: function (dialog) {			
		  },
		  /* We run these functions when the box is closed */
		  onClose: function (dialog) {
			dialog.overlay.fadeOut('fast', function () {
				$.modal.close();									
			});
			
		  },
		  autoPosition: true,
		  closeClass: "control-close-modal",
		  escClose: true,		  
		  opacity: 100, 
		  overlayId:"modal-backdrop",
		  overlayClose: true,
		  persist: false,
		  position: ["10%",""]
	  });
}

		
function wardrobeSorting() {
		$( "#wardrobeConfigure" ).sortable({
		 start: function(event, ui) {
            ui.item.bind("click.prevent",
                function(event) { event.stopImmediatePropagation(); });
        },
        stop: function(event, ui) {
            setTimeout(function(){ui.item.unbind("click.prevent");}, 300);
        },	
		cursor: "move",
		axis: "x",
		delay: 30
	});
    $("#wardrobeConfigure").disableSelection();	
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

function addSectionPosition() {
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
}

function priceCalculator() {
	
}

function inheritDoorSkeleton() {			
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
}

function inheritOpenShelves() {	
	var lw, slw, slwc;
	
	lw = $('#wardrobeConfigure .wardrobe-configure-container:last-child');  /* last appended wardrobe */	
	if ($('#wardrobeConfigure .wardrobe-configure-container').length > 1) {
		slw = $('#wardrobeConfigure .wardrobe-configure-container:nth-last-child(2)');		/* second last wardrobe */
		if(slw.hasClass('wt-door')){
			slwc = $(slw).find('.door-skeleton-container').css('background-image');		/* second last wardrobe door color */
			$(lw).find('.wardrobe-skeleton-container').css('background-image',slwc);			
		}
		else if(slw.hasClass('open-shelves')){
			slwc = $(slw).find('.wardrobe-skeleton-container').attr('style');
			$(lw).find('.wardrobe-skeleton-container').attr('style',slwc);	
		}		
	}
	else {					
		$(lw).find('.wardrobe-skeleton-container').attr('style', dfosc);			
	}	/* apply default */	
}	

function resetWardrobe() {
	$('#customizeWardrobe .control-close').click();
	doorClose();
	$('.sub-tab-active:not(:first)').hide();
	$('.sub-tab-active:first').show();	
	$('.nav-tab-active:not(:first)').hide();
	$('.nav-tab-active:first').show();
}

/* global variable for center position */
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
$(function($){
	/* variable defined */
	var dim_flag = 0, mer_flag = 0, finalPrice = 0, wallColIndex = 0; 
	
	var divSkeletonSingle = 	'<div class="wardrobe-configure-container single-door wt-door">'
								+'<div class="wardrobe-skeleton-container"><img data-dim="off" data-mer="off" src="images/S1_1_Frame.png"  /></div>'
								+'<div class="door-skeleton-container">'
								+'<div class="door-shutter-container">'					
								+'<div class="door-shutter-container-right"></div></div>'
								+'</div></div>';
								
	var divSkeletonDouble = 	'<div class="wardrobe-configure-container double-door wt-door">'
								+'<div class="wardrobe-skeleton-container"><img data-dim="off" data-mer="off" src="images/S2_1_Frame.png"  /></div>'
								+'<div class="door-skeleton-container">'
								+'<div class="door-shutter-container"><div class="door-shutter-container-left"></div>'		
								+'<div class="door-shutter-container-right"></div></div>'
								+'</div></div>';	

	var divSkeletonOpenShelves = 	'<ul class="wardrobe-configure-container open-shelves">'
									+'<li class="wardrobe-skeleton-container"><img data-dim="off" data-mer="off" src="images/O1_1_Frame.png" /></li></ul>';							
		
	/* default wardrobe */		
	dfwc = $('.default-wardrobe-color').attr('style');  				/* default wardrobe color */
	dfwdc =  $('.default-door-color').attr('style');
	dfwdd	= $('.default-door-design').find('img').attr('src');
	dfwdh =  $('.default-door-design').find('.door-handle-option-left').css('background-image');
	dfwdh = dfwdh.replace('url(','').replace(')','');
	dfosc = $('.default-open-shelves-color').attr('style');				/* default open shelves color */

	initializePage();
	wardrobeSorting();
	/* function declaration */
	
	
	/* landing page wardrobe click functionality start */
	/* $('#wardrobeDesignSelectionContainer').on('click tap','.single-door, .double-door, .open-shelves',function(){
		$('#wardrobeWorkArea, #wardrobeAddSelection').show();
		$('#wardrobeLandingContainer').hide();
		$('#wardrobeAddOn .wardrobe-add-on-container').css('visibility','visible');				
	}); */	
	$('#wardrobeDesignSelectionContainer').on('click tap','.single-door',function(){
		$("#wardrobeConfigure").append(divSkeletonSingle);
		inheritDoorSkeleton();
		addSectionPosition();
	});	
	$('#wardrobeDesignSelectionContainer').on('click tap','.double-door',function(){
		$("#wardrobeConfigure").append(divSkeletonDouble);
		inheritDoorSkeleton();
		addSectionPosition();
	}); 
	$('#wardrobeDesignSelectionContainer').on('click tap','.open-shelves',function(){
		$("#wardrobeConfigure").append(divSkeletonOpenShelves);
		inheritOpenShelves();	
		addSectionPosition();
	});
	/* landing page wardrobe click functionality end */
	
	
	/* delete wardrobe */	
	
	$('.action-delete-selection').on('click tap', function(event) {		
		event.stopPropagation();
		$('#wardrobeDeleteContainer, #page-backdrop').fadeIn('fast');
	});	
	
	$('#wardrobeDeleteContainer').on('click tap','.action-delete-selection-confirm', function() {
		if($('.selected-type').length){
			$('#wardrobeConfigure .selected-type').remove();
			$('#wardrobeDeleteContainer, #page-backdrop').fadeOut('fast');
			$('#wardrobeWorkArea').find('.wardrobe-delete-btn').hide();
			if($('#wardrobeConfigure .wardrobe-configure-container').length) {
				addSectionPosition();
			}			
		}			
		if($('#wardrobeConfigure .wardrobe-configure-container').length == 0){
			$('#wardrobeLandingContainer').fadeIn('fast');
			$('#customizeWardrobe').hide();
			$('#wardrobeWorkArea').fadeOut('fast');
			$('#wardrobeAddOn .wardrobe-add-on-container').css('visibility','hidden');		
		} else {
			$('#wardrobeConfigure').click();			
		}
	});
	
	$('#page-backdrop').on('click tap', function(e){
		event.preventDefault();
	});
	
	$('#wardrobeDeleteContainer').on('click tap','.action-delete-selection-cancel', function() {
		$('#wardrobeDeleteContainer, #page-backdrop').fadeOut('fast');
	});
	/* delete wardrobe end */	
	
	
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
			if(dim_flag == 0 && mer_flag == 0) {doorClose();}
			$( "#wardrobeConfigure" ).sortable( "enable" );
			$('.wardrobe-horizontal-scroll-area').niceScroll(scrollDefaults);	
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
			$( "#wardrobeConfigure" ).sortable( "disable" );			
			if($('.selected-type').length){
				centerContent();				
				$('.wardrobe-horizontal-scroll-area').getNiceScroll().remove();
			}
			resetWardrobe();
			costShow();
				
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
				if(dim_flag == 1) {			
					$(this).attr('data-dim','off');  				
					$(this).attr('src', divSrc.replace('_dim.png', '.png'));				
				}
				if(mer_flag == 1) {
					$(this).attr('data-mer','off'); 				
					$(this).attr('src', divSrc.replace('_mer.png', '.png'));			
				}		
			});
			dim_flag = 0;
			mer_flag = 0;
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
	
	/* choose door skeleton or structure */	
	$('#wardrobeDoorDesignStyleContainer').on('click tap', '.wardrobe-option-content', function() {	
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
		
	/*  mirror functionality start */
	$('#wardrobeDoorDesignMirrorContainer').on('click tap', '.wardrobe-option-content, input', function() {
		var selectedMirror = $(this).find('.wardrobe-option-content-img img').attr('src');
		var doorStyleLeft =  $('.selected-type .door-shutter-container-left-d').data('image');
		var doorStyleRight =  $('.selected-type .door-shutter-container-right-d').data('image');	
		
		if (!$(this).attr('data-toggled') || $(this).attr('data-toggled') == 'off'){					
			$(this).attr('data-toggled','on');		
			$('.selected-type').addClass('mirror-active');					
			$(this).find('input[type=checkbox]').prop('checked', true);					
			if($(this).hasClass('left-mirror-container')) {
				$('.selected-type .door-shutter-container-left-d').attr('src', selectedMirror);	
			}
			else if($(this).hasClass('right-mirror-container')) {
				$('.selected-type .door-shutter-container-right-d').attr('src', selectedMirror);
			}					
		}
		else if ($(this).attr('data-toggled') == 'on'){					
			$(this).attr('data-toggled','off');					
			$(this).find('input[type=checkbox]').prop('checked', false);
			$('.selected-type').removeClass('mirror-active');					
			if($(this).hasClass('left-mirror-container')) {
				$('.selected-type .door-shutter-container-left-d').attr('src', doorStyleLeft);	
			}
			else if($(this).hasClass('right-mirror-container')) {
				$('.selected-type .door-shutter-container-right-d').attr('src', doorStyleRight);
			}								
		}
	});
	
	$('#wardrobeDoorDesignMirrorContainer input[type="checkbox"]').on('change', function() {
		$(this).closest('.wardrobe-option-content').click();		
	});
	/* mirror functionality end */
	
	/* change handle functionality */
	$('#wardrobeDoorDesignHandleContainer').on('click tap', '.wardrobe-option-content', function() {
		if($(this).hasClass('left-handle-container')) {
			$('.selected-type .door-shutter-container-right-h').addClass('handle-reverse');	
			$(this).find('input[type=radio]').prop('checked', true);
		}
		else if($(this).hasClass('right-handle-container')) {
			$('.selected-type .door-shutter-container-right-h').removeClass('handle-reverse');	
			$(this).find('input[type=radio]').prop('checked', true);
		}					
	});
	
	
	/* choose door texture or color */
	$('#wardrobeDoorDesignColorContainer').on('click tap', '.wardrobe-option-content', function() {		
		var doorBgSelected =  $(this).attr('style');	
		$(this).addClass('selected-option').siblings().removeClass('selected-option');				
		if($('.selected-type').length >= 1) {	
			$('.selected-type .door-skeleton-container').attr('style',doorBgSelected);		
		} 
	});
	
	/* open shelves */
	$('#wardrobeOpenShelvesLayoutContainer').on('click tap', '.wardrobe-option-content', function(){		
		var skeletonSelected =  $(this).find('.wardrobe-option-content-img img').attr('src');		
		var elemContent = $('.selected-type .wardrobe-skeleton-container').find('img');
		$(this).addClass('selected-option').siblings().removeClass('selected-option');
		$(elemContent).attr('src',skeletonSelected);		
	});	
	
	$('#wardrobeOpenShelvesColorContainer').on('click tap', '.wardrobe-option-content', function() {		
		var bgSelected =  $(this).attr('style');		
		$(this).addClass('selected-option').siblings().removeClass('selected-option');
		if($('.selected-type').length >= 1) {
			$('.selected-type .wardrobe-skeleton-container').attr('style',bgSelected);				
		} 
	});
	/* open shelves end */ 
	
	

	
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
	
	$("#action-download").on('click tap', function() {
		downloadPdf();
	});
	
	
	/* wardrobe door design click function start */
	$('#wardrobeDoorDesignTabSwitcher').on('click tap', 'li', function(){
		var id = $(this).attr('id');
		$('.wardrobe-content-scroll-area').getNiceScroll().remove();
		$('#wardrobeInternalDesign').find('.tab-active').hide('slide',{ direction: "left" },700);
		$('#wardrobeDoorDesign').find('.control-close').hide();			
		$('#wardrobeInternalDesign').find('.control-close').hide();	
		$('#wardrobeInternalDesignTabSwitcher').fadeIn();
		//costShow();
		$('#wardrobeDoorDesign h2').css('border-bottom','2px solid red');
		$('#wardrobeDoorDesignTabSwitcher').fadeOut( 400, function(){			
			$('#'+id+"Container").show('slide',{ direction: "right" },700, function(){
				$('.wardrobe-content-scroll-area').niceScroll(scrollDefaults);	
				$('#wardrobeDoorDesign h2').css('border-bottom','none');									
				$('#wardrobeDoorDesignColorTabSwitcher li:first-child').addClass('active-menu').siblings().removeClass('active-menu');
				$('.sub-tab-active:not(:first)').hide();
				$('.sub-tab-active:first').show();	
				$('#nav-cursor-move').animate({
					left: $('#wardrobeDoorDesignColorSolid').position().left,
					width: $('#wardrobeDoorDesignColorSolid').outerWidth()
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
	
	/* wardrobe internal design click function start */	
	$('#wardrobeInternalDesignTabSwitcher').on('click tap', 'li', function(){
		var id = $(this).attr('id');
		$('.wardrobe-content-scroll-area').getNiceScroll().remove();
		$('#wardrobeDoorDesign').find('.tab-active').hide('slide',{ direction: "right" },700);	
		$('#wardrobeInternalDesign').find('.control-close').hide();	
		$('#wardrobeDoorDesign').find('.control-close').hide();	
		$('#wardrobeDoorDesignTabSwitcher').fadeIn();
		//costShow();
		$('#wardrobeInternalDesign h2').css('border-bottom','2px solid red');
		$('#wardrobeInternalDesignTabSwitcher').fadeOut( 400, function(){		
			$('#'+id+"Container").show('slide',{ direction: "left" },700, function(){			
				$('.wardrobe-content-scroll-area').niceScroll(scrollDefaults);	
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
		$(this).closest('.customize-wardrobe-option').hide('slide',{ direction: "left" },700, function(){			
			$('#wardrobeInternalDesignTabSwitcher').fadeIn();
			$('#wardrobeInternalDesign h2').css('border-bottom','none');						
		});
		$('#wardrobeConfigure .selected-type').find('.door-skeleton-container').show();	/*new added for door*/		
	});
	/* wardrobe internal design click function end */
		
	/* open shelves functionality start */
	$('#wardrobeOpenShelvesInternalDesign').on('click tap', 'h4', function(){				
		$('.wardrobe-content-scroll-area').getNiceScroll().remove();
		$('#wardrobeOpenShelvesColorContainer').hide('slide',{ direction: "left" },700); 
		$('#wardrobeOpenShelvesExternalDesign .control-close').hide();		
		$('#wardrobeOpenShelvesLayoutContainer').show('slide',{ direction: "right" },700, function(){
			$('.wardrobe-content-scroll-area').niceScroll(scrollDefaults);	
			//costShow();
		});
		$('#wardrobeOpenShelvesInternalDesign .control-close').show();		
	});
	
	$('#wardrobeOpenShelvesInternalDesign').on('click tap', '.control-close', function(){
		$('.wardrobe-content-scroll-area').getNiceScroll().remove();
		$(this).hide();
		//costHide();		
		$('#wardrobeOpenShelvesLayoutContainer').hide('slide',{ direction: "right" },700);		
	});	
	
	$('#wardrobeOpenShelvesColor').on('click tap', function(){	
		$('.wardrobe-content-scroll-area').getNiceScroll().remove();
		if($("#wardrobeOpenShelvesColorContainer").css("display")=="none") {			
			$('#wardrobeOpenShelvesLayoutContainer').hide('slide',{ direction: "right" },700); 
			$('#wardrobeOpenShelvesInternalDesign .control-close').hide();			
			$('#wardrobeOpenShelvesColorContainer').show('slide',{ direction: "left" },700, function(){				
				$('#wardrobeOpenShelvesColorTabSwitcher li:first-child').addClass('active-menu').siblings().removeClass('active-menu');
				//costShow();
				$('.wardrobe-content-scroll-area').niceScroll(scrollDefaults);	
				$('.nav-tab-active:not(:first)').hide();
				$('.nav-tab-active:first').show();				
				$('#menu-cursor-move').animate({
					left: $('#wardrobeOpenShelvesColorSolid').position().left,
					width: $('#wardrobeOpenShelvesColorSolid').outerWidth()
				}, {
					duration: 350
				});
				
			});	
			$('#wardrobeOpenShelvesExternalDesign .control-close').show();	
		}
	});
		
	$('#wardrobeOpenShelvesExternalDesign').on('click tap', '.control-close', function(){
		$('.wardrobe-content-scroll-area').getNiceScroll().remove();
		//costHide();
		$(this).hide();		
		$('#wardrobeOpenShelvesColorContainer').hide('slide',{ direction: "left" },700);		
	});

	$('#wardrobeOpenShelvesColorTabSwitcher').on('click tap', 'li:not(.active-menu)', function(){
		var id = $(this).attr('id');
		var position = $(this).position();
		$('#wardrobeOpenShelvesExternalDesign').find('.nav-tab-active').slideUp('fast');
		$('#'+id+"Container").slideDown('fast');
		$(this).addClass('active-menu').siblings().removeClass('active-menu');
		$('#menu-cursor-move').animate({
			left: position.left,
			width: $(this).outerWidth()
		}, {
			duration: 350
		});
		return false;		
	});
	
	/* open shelves layout click functionality end */
	
		
	
	$('#wardrobeAddSelection').on('click', function(){
		modalBody = '<div class="wardrobe-option-container">'
					+'<div class="wardrobe-option-content action-add-double-door"><div class="wardrobe-option-content-img"><img  src="images/S2_1_Frame.png" /></div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Double Door</p><p class="wardrobe-option-content-price">Rs <span>10000</span></p></div></div>'
					+'<div class="wardrobe-option-content action-add-single-door"><div class="wardrobe-option-content-img"><img  src="images/S1_1_Frame.png" /></div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Single Door</p><p class="wardrobe-option-content-price">Rs <span>2000</span></p></div></div>'
					+'<div class="wardrobe-option-content action-add-open-shelves"><div class="wardrobe-option-content-img"><img  src="images/O1_1_Frame.png" /></div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Open Shelves</p><p class="wardrobe-option-content-price">Rs <span>8000</span></p></div></div>'
					+'</div>'						
		modalFooter = '<a class="wardrobe-button control-close-modal" href="javascript:void(0);">Cancel</a>';
		buildModal("wardrobeAddSelectionContainer", "Choose a section to add",modalBody,modalFooter);
		
		/* add wardrobes */		
		$(".action-add-single-door").on('click tap', function() { 
			$("#wardrobeConfigure").append(divSkeletonSingle);	
			inheritDoorSkeleton();
			$.modal.close();
			addSectionPosition();
			//$('.wardrobe-horizontal-scroll-area').getNiceScroll(0).doScrollLeft(x, 500); 			
			$('#wardrobeConfigure .wardrobe-configure-container:last-child').animate({'transform':'scale(1.19)'} , {duration: 800, queue: false, complete:function(){
					$('.wardrobe-horizontal-scroll-area').getNiceScroll().doScrollPos($(this).position().left);
					$(this).animate({'transform':'scale(1)'});					
				}				
			});
			
		});
		
		$(".action-add-double-door").on('click tap', function() { 		
			$("#wardrobeConfigure").append(divSkeletonDouble);
			inheritDoorSkeleton();	
			$.modal.close();
			addSectionPosition();
			$('#wardrobeConfigure .wardrobe-configure-container:last-child').animate({'transform':'scale(1.19)'},500,function(){
				$(this).animate({'transform':'scale(1)'});
			});
		});
		
		$(".action-add-open-shelves").on('click tap', function() { 		
			$("#wardrobeConfigure").append(divSkeletonOpenShelves);
			inheritOpenShelves();	
			$.modal.close();
			addSectionPosition();	
			$('#wardrobeConfigure .wardrobe-configure-container:last-child').animate({'transform':'scale(1.19)'},500,function(){
				$(this).animate({'transform':'scale(1)'});
			});			
		});
		
		$(".action-add-single-door, .action-add-double-door, .action-add-open-shelves").on('click tap', function(){
			/*$('#wardrobeConfigure .wardrobe-skeleton-container img').each(function() {
				var  divSrc = $(this).attr('src');
				if(dim_flag == 1) {			
					$(this).attr('data-dim','off');  				
					$(this).attr('src', divSrc.replace('_dim.png', '.png'));				
				}
				if(mer_flag == 1) {
					$(this).attr('data-mer','off'); 				
					$(this).attr('src', divSrc.replace('_mer.png', '.png'));			
				}		
			});
			dim_flag = 0;
			mer_flag = 0;
			$('.action-dimension').text('Show </br> Dimension');
			$('.action-merchandise').text('Show </br> Merchandise');*/
			
			if(dim_flag == 1) {
				var divStructure = $("#wardrobeConfigure .wardrobe-configure-container:last-child").find('.wardrobe-skeleton-container img');
				var  src = divStructure.attr('src');
				divStructure.attr('data-dim','on');  
				divStructure.attr('src', src.replace('.png', '_dim.png'));			
			}
			if(mer_flag == 1) {
				var divStructure = $("#wardrobeConfigure .wardrobe-configure-container:last-child").find('.wardrobe-skeleton-container img');
				var  src = divStructure.attr('src');
				divStructure.attr('data-mer','on');  
				divStructure.attr('src', src.replace('.png', '_mer.png'));			
			}
		});
		
		$('.wardrobe-horizontal-scroll-area').niceScroll(scrollDefaults);	
		
	});
	
		
	//$('.wardrobe-content-scroll-area').niceScroll(scrollDefaults);	
	
	$('#wardrobeAddOnPrice').on('click tap', function() {

		modalBody = '<div class="container-fluid clearfix">'
					+'<div class="row-fluid row-split clearfix wardrobe-module-detail-container">'
					+'<div class="column"><div class="wardrobe-module-view">'
					+'<div class="wardrobe-configure-container double-door wt-door"><div class="wardrobe-skeleton-container" style="background-image: url(\'images/internal_color_1.jpg\');"><img data-dim="off" data-mer="off" src="images/S2_1_Frame.png"/></div><div class="door-skeleton-container" style="background-image: url(\'images/solids/greenlam_divine_yellow_207_MR_HG.jpg\')"><div class="door-shutter-container"><div class="door-shutter-container-left"><img class="door-shutter-container-left-d" src="images/D1_2_Frame_LH.png" data-image="images/D1_2_Frame_LH.png" /><span class="door-shutter-container-left-h"><img src="images/door_handle_1.png" /></span></div><div class="door-shutter-container-right"><img class="door-shutter-container-right-d" src="images/D1_2_Frame_LH.png" data-image="images/D1_2_Frame_LH.png" /><span class="door-shutter-container-right-h"><img src="images/door_handle_1.png" /></span></div></div></div></div></div></div>'
					+'<div class="column">'
					+'<div class="content-pane">'
					+'<div class="content-section wardrobe-module-base-frame"><div class="wardrobe-module-image"><img src="images/S2_2_Frame.png" /></div><div class="wardrobe-module-content"><div class="wardrobe-module-content-title">Double Door Wardrobe</div><div class="wardrobe-module-content-detail1">Layout Name</div><div class="wardrobe-module-content-detail2">Height: 71 inches, Width: 29 inches, Depth: 19 inches</div><div class="wardrobe-module-content-detail1">Rs. <span>2000</span></div></div></div>'
					+'<div class="content-section wardrobe-module-door-style"><div class="wardrobe-module-image"><img src="images/D1_2_Frame_LH.png" /><img src="images/D1_2_Frame_LH.png" /></div><div class="wardrobe-module-content"><div class="wardrobe-module-content-title">Door Style</div><div class="wardrobe-module-content-detail1">Layout Name</div><div class="wardrobe-module-content-detail2">Height: 71 inches, Width: 29 inches, Depth: 19 inches</div><div class="wardrobe-module-content-detail1">Rs. <span>2000</span></div></div></div>'
					+'<div class="content-section wardrobe-module-door-color"><div class="wardrobe-module-image"><img src="images/solids/greenlam_divine_yellow_207_MR_HG.jpg" /></div><div class="wardrobe-module-content"><div class="wardrobe-module-content-title">Door Color</div><div class="wardrobe-module-content-detail1">Layout Name</div><div class="wardrobe-module-content-detail1">Rs. <span>2000</span></div></div></div>'
					+'<div class="content-section wardrobe-module-internal-color"><div class="wardrobe-module-image"><img src="images/internal_color_1.jpg" /></div><div class="wardrobe-module-content"><div class="wardrobe-module-content-title">Internal Color</div><div class="wardrobe-module-content-detail1">Layout Name</div><div class="wardrobe-module-content-detail1">Rs. <span>2000</span></div></div></div>'
					+'</div></div></div>'
					+'<div class="row-fluid row-split clearfix wardrobe-module-detail-container">'
					+'<div class="column"><div class="wardrobe-module-view">'
					+'<div class="wardrobe-configure-container double-door wt-door"><div class="wardrobe-skeleton-container" style="background-image: url(\'images/internal_color_1.jpg\');"><img data-dim="off" data-mer="off" src="images/S2_1_Frame.png"/></div><div class="door-skeleton-container" style="background-image: url(\'images/solids/greenlam_divine_yellow_207_MR_HG.jpg\')"><div class="door-shutter-container"><div class="door-shutter-container-left"><img class="door-shutter-container-left-d" src="images/D1_2_Frame_LH.png" data-image="images/D1_2_Frame_LH.png" /><span class="door-shutter-container-left-h"><img src="images/door_handle_1.png" /></span></div><div class="door-shutter-container-right"><img class="door-shutter-container-right-d" src="images/D1_2_Frame_LH.png" data-image="images/D1_2_Frame_LH.png" /><span class="door-shutter-container-right-h"><img src="images/door_handle_1.png" /></span></div></div></div></div></div></div>'
					+'<div class="column">'
					+'<div class="content-pane">'
					+'<div class="content-section wardrobe-module-base-frame"><div class="wardrobe-module-image"><img src="images/S2_2_Frame.png" /></div><div class="wardrobe-module-content"><div class="wardrobe-module-content-title">Double Door Wardrobe</div><div class="wardrobe-module-content-detail1">Layout Name</div><div class="wardrobe-module-content-detail2">Height: 71 inches, Width: 29 inches, Depth: 19 inches</div><div class="wardrobe-module-content-detail1">Rs. <span>2000</span></div></div></div>'
					+'<div class="content-section wardrobe-module-door-style"><div class="wardrobe-module-image"><img src="images/D1_2_Frame_LH.png" /><img src="images/D1_2_Frame_LH.png" /></div><div class="wardrobe-module-content"><div class="wardrobe-module-content-title">Door Style</div><div class="wardrobe-module-content-detail1">Layout Name</div><div class="wardrobe-module-content-detail2">Height: 71 inches, Width: 29 inches, Depth: 19 inches</div><div class="wardrobe-module-content-detail1">Rs. <span>2000</span></div></div></div>'
					+'<div class="content-section wardrobe-module-door-color"><div class="wardrobe-module-image"><img src="images/solids/greenlam_divine_yellow_207_MR_HG.jpg" /></div><div class="wardrobe-module-content"><div class="wardrobe-module-content-title">Door Color</div><div class="wardrobe-module-content-detail1">Layout Name</div><div class="wardrobe-module-content-detail1">Rs. <span>2000</span></div></div></div>'
					+'<div class="content-section wardrobe-module-internal-color"><div class="wardrobe-module-image"><img src="images/internal_color_1.jpg" /></div><div class="wardrobe-module-content"><div class="wardrobe-module-content-title">Internal Color</div><div class="wardrobe-module-content-detail1">Layout Name</div><div class="wardrobe-module-content-detail1">Rs. <span>2000</span></div></div></div>'
					+'</div></div></div>'
					+'</div>'						
		modalFooter = '<h4>Total Cost: Rs. <span>45,000</span> </h4>';
		buildModal("wardrobePriceDetailInfo", "Detail Price",modalBody,modalFooter);
		$('.container-fluid').niceScroll(scrollDefaults);	
	});
	
	
	/* wall color functionality */
	
	$('#wardrobeAddOn').on('click tap', '.action-wall-color', function(){
		
		modalBody = '<div class="wardrobe-option-container column-third">'
					+'<div class="wardrobe-option-content" style="background-color:#ffffff"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">White</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:#ffffcc"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:pink"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:green"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:olive"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:red"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:orange"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:orangered"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:orchid"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:gold"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:rosybrown"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:gray"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:oldlace"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:plum"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:limegreen"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:navajowhite"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:navy"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:mediumaquamarine"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'<div class="wardrobe-option-content" style="background-color:highlight"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'					
					+'<div class="wardrobe-option-content" style="background-color:lime"><div class="wardrobe-option-content-img">&nbsp;</div><div class="wardrobe-option-content-detail"><p class="wardrobe-option-content-name">Solid Color 1</p></div></div>'
					+'</div>';
		modalFooter = '';
		buildModal("modalWallColor", "Choose a wall colour",modalBody,modalFooter);
		$('#modalWallColor .wardrobe-option-container').niceScroll(scrollDefaults);
		
		$('#modalWallColor .wardrobe-option-content').eq(wallColIndex).addClass('selected-option');
		
		$('#modalWallColor').on('click tap', '.wardrobe-option-content',function(){
			var wallColor = $(this).css('background-color');
			wallColIndex = $(this).index();
			$('#page').css('background-color',wallColor);	
			if(wallColIndex > 0) {
				$('.wardrobe-add-on-container .wall-color-index').css({'background-color':wallColor, 'background-image':'none'});
			} else if(wallColIndex == 0) {
				$('.wardrobe-add-on-container .wall-color-index').css('background-image','url(\'images/colour_ic.png\')')
			}
			
			//$('#modalWallColor .wardrobe-option-content').removeClass('selected-option');
			$(this).addClass('selected-option').siblings().removeClass('selected-option');
			$.modal.close();
		});
		//alert(wallColIndex);
	});
	
});


/* 
	PAGE REINIT
	
	Keep this at the bottom of the file so it can be accessed easily.
	
	Remember, the fewer functions this contains, the better our code is.
	
*/

function arrangePageElements() {
	 
	if($('#wardrobeConfigure .wardrobe-configure-container').length) {
		addSectionPosition();		
	}
	if($('#wardrobeConfigure .wardrobe-configure-container.selected-type').length) {
		centerContent();
	}
	 
}
