var gallery_rem_width, gallery_width, scrollTop, step_sc_position, swatch_in_point,set_in_point,steps_in_point,steps_in_point_mid;
var curtain_1_ht,curtain_2_ht,curtain_3_ht,curtain_4_ht,curtain_5_ht,curtain_6_ht,curtain_7_ht,curtain_8_ht,anim_tout,anim_tout2,buynow_flag = 0,win_width;
var swatch_cnt = 0, set_cnt = 0;
var lava_def_left,lava_curr_left;
$(document).ready(function(){
        
        if($('.new_qty_ddown_1 ul li').length > 0){
                $('.new_qty_ddown_1').jScrollPane();
        }
        $('.new_qty_ddown,.new_qty_ddown_1').css({'visibility':'visible','display':'none'});
        
	/* Script for Image Gallery popup */
	$('.close_gallery,#black_overlay').click(function(){
		$('#image_gallery_popup,.combo_product_modal').fadeOut(250,function(){
			$('#black_overlay').fadeOut(200);
			$('.image_gallery_largeview img').addClass('popup_large_img');
		});
	});
	var gal_img_relid;
	$('.product_slides a').click(function(e){
		$('.product_slides a,.thumbsview_wrap a').removeClass('active');
		$(this).addClass('active');
		gal_img_relid = $(this).data('relid');
		$('.thumbsview_wrap,#product_slider').find('a[data-relid="'+gal_img_relid+'"]').addClass('active');
		$('.image_gallery_largeview img').attr('src',$(this).attr('href'));
		$('#black_overlay').fadeIn(220,function(){	
			$(".thumbsview_wrap img.lazy").each(function(){
				$(this).attr('src',$(this).data('src'));
			});
			$('#image_gallery_popup').fadeIn(250,function(){
				imagegallery_dimensions();
			});
		});
		e.preventDefault();
	});
	$('.vip_large_img_1').click(function(e){
		gal_img_relid = $(this).attr('data-relid');
		$('.thumbsview_wrap a,#product_slider a').removeClass('active');
		$('.thumbsview_wrap').find('a[data-relid="'+gal_img_relid+'"]').addClass('active');		
		$('#product_slider').find('a[data-relid="'+gal_img_relid+'"]').addClass('active');
		$('.image_gallery_largeview img').attr('src',$('.thumbsview_wrap').find('a[data-relid="'+gal_img_relid+'"]').attr('href'));
		$('#black_overlay').fadeIn(220,function(){			
			$('#image_gallery_popup').fadeIn(250,function(){
				imagegallery_dimensions();
			});
		});
                if ($(window).width() > 1140) {
                    $('.image_largeview_wrap img').removeClass('popup_large_img').unbind('click').css('cursor','default');
                    $('.image_gallery_largeview span.img_click_msg').hide();
                }
		e.preventDefault();
	});
	$('.thumbsview_wrap a').click(function(e){
		$('.product_slides a,.thumbsview_wrap a').removeClass('active');
		$(this).addClass('active');
		gal_img_relid = $(this).data('relid');
		$('.thumbsview_wrap,#product_slider').find('a[data-relid="'+gal_img_relid+'"]').addClass('active');
		$('.image_gallery_largeview img').attr('src',$(this).attr('href'));
		e.preventDefault();
	});
	$('.image_gallery_largeview img').click(function(){
		if($(this).hasClass('popup_large_img')){
			$(this).removeClass('popup_large_img');
			imagegallery_dimensions();
		}else{
			$(this).addClass('popup_large_img');
			imagegallery_dimensions();
		}
         if(Modernizr.touch){
            $('.image_largeview_wrap').css('overflow','auto'); 
         }
	});
	
	/* Script for Scroll stop event */
	$.fn.scrollStopped = function(callback) {
            $(this).scroll(function(){
                var self = this, $this = $(self);
                if ($this.data('scrollTimeout')) {
                  clearTimeout($this.data('scrollTimeout'));
                }
                $this.data('scrollTimeout', setTimeout(callback,250,self));
            });
        };
	
	var stp_win_pos, stp_tout;
	
	/*Script for Hiding Page slide navigation after some seconds*/
	var ptimeout, current_el, navshow_time;
        
	$(window).scrollStopped(function(){		
		clearTimeout(navshow_time);
		navshow_time = setTimeout(function(){ $('#page_slide_navigator').css('bottom','-30px'); 
			$('#step_nav_wrap.fixed_step_nav').addClass('bottom0');
		}, 3000);
	});
});

function setslidesheight(){
	var dataposition;
	$('.curtain').each(function(){
		dataposition = $(this).offset().top;
		dataheight = $(this).height();
		$(this).attr('data-position',dataposition);
	});
}
function imagegallery_dimensions(){
	var image_largeview_height = $('.image_gallery_largeview').height();
	var thumbsview_wrap_height = $('.thumbsview_wrap').height();
        $('.thumbsview_wrap').jScrollPane();
}
function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
	return pattern.test(emailAddress);
};