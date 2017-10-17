$('document').ready(function(){
	vip_resizing();
	$(window).resize(function(){
		vip_resizing();
		if($('#mini_cart').length > 0){
			mcart_height = $(window).height() - 210;
			$('.minicart_tab_panel').css('height',mcart_height+'px');
		}
	});
});

var win_width;
function vip_resizing(){
	win_width = $(window).width();
	var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
    widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
    $outer.remove();
    var scwidth = 1321 - (100 - widthWithScroll);
	if(win_width < scwidth){
		$('.vip_details_wrapper').insertAfter('.vip_share_metabox').addClass('width_100_per');
	}else{
		$('.vip_details_wrapper').insertAfter('.vip_gallery').removeClass('width_100_per');
	}	

	if(win_width < (980 - (100 - widthWithScroll))){
		//$('.search_wrapper').insertBefore('.menu_wrapper ul');
		$('.header_right').addClass('drawer').insertAfter('#footer');
	}else{
		//$('.search_wrapper').insertBefore('.header_right');
		if($('.header_right').hasClass('active')){
			$('#popup_overlay').removeClass('active');
		}
		$('.header_right').removeClass('drawer').insertBefore('.header #white_overlay_2');
	}
	
	$('.v_scroll').each(function(){
		$(this).jScrollPane().data('jsp').reinitialise();
	});


}
