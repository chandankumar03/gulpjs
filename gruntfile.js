module.exports = function(grunt){	
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		concat: { 
			addfile:{
				files:{
					'js_min/core.min.js':[
						'/var/www/html/trendsutra3/js/jquery.mCustomScrollbar.js','/var/www/html/trendsutra3/js/jquery-ui.custom.min.js','/var/www/html/trendsutra3/js/jquery.lazy.min.js','/var/www/html/trendsutra3/js/select2.min.js','/var/www/html/trendsutra3/js/slick.min.js','/var/www/html/trendsutra3/js/modernizr.custom.65968.min.js','/var/www/html/trendsutra3/js/notifier/socket.io-1.3.5.js','/var/www/html/trendsutra3/js/notifier/jquery.cookie.js'],
					'js_min/lib.min.js':[
						'/var/www/html/trendsutra3/js/utilities.js','/var/www/html/trendsutra3/js/newheader.js','/var/www/html/trendsutra3/js/common.js','/var/www/html/trendsutra3/js/notifier/notifier.js','/var/www/html/trendsutra3/js/recaptcha.js'], 
					'js_min/lib.secure.min.js':
                                                ['/var/www/html/trendsutra3/js/utilities.js','/var/www/html/trendsutra3/js/newheader.js','/var/www/html/trendsutra3/js/common.js','/var/www/html/trendsutra3/js/customer/validate.js','/var/www/html/trendsutra3/js/notifier/notifier.js','/var/www/html/trendsutra3/js/recaptcha.js'],
					'js_min/multi-section.min.js':[
						'/var/www/html/trendsutra3/js/flickity.pkgd.min.js','/var/www/html/trendsutra3/js/jquery.twbsPagination.js','/var/www/html/trendsutra3/js/listing.js','/var/www/html/trendsutra3/js/newclip.js'],
					'js_min/brand.min.js':
                                                ['/var/www/html/trendsutra3/js/jquery.twbsPagination.js','/var/www/html/trendsutra3/js/newbrands.js'],
					'js_min/corporate.min.js':[
						'/var/www/html/trendsutra3/js/bespoke.ldp.js','/var/www/html/trendsutra3/js/flickity.pkgd.min.js','/var/www/html/trendsutra3/js/bulk-order.js'],
					'js_min/modular.min.js':[
						'/var/www/html/trendsutra3/js/mangiamo/mangiamo.js','/var/www/html/trendsutra3/js/css3-animate-it.js','/var/www/html/trendsutra3/js/modular_page.js','/var/www/html/trendsutra3/js/prim_wardrobe.js'],
					'js_min/static.min.js':
                                                ['/var/www/html/trendsutra3/js/bespoke.ldp.js', '/var/www/html/trendsutra3/js/static_page.js','/var/www/html/trendsutra3/js/contactus.js'],
					'js_min/sell_on_pf.min.js':
                                                ['/var/www/html/trendsutra3/js/myaccount.js','/var/www/html/trendsutra3/js/merchant.js'],					
					'js_min/checkout_confirmation.min.js':
                                                ['/var/www/html/trendsutra3/js/clipboard.min.js','/var/www/html/trendsutra3/js/confirm.js'],
					'js_min/myaccount.min.js':
                                                ['/var/www/html/trendsutra3/js/trackorder.js','/var/www/html/trendsutra3/js/static_page.js','/var/www/html/trendsutra3/js/myaccount.js','/var/www/html/trendsutra3/js/wardrobe/wardrobe-vip.js','/var/www/html/trendsutra3/js/jquery.twbsPagination.js'],
				}
			}
		},
		uglify: {
			options: {
			    mangle: false,			    
                sourceMap: true,
		        sourceMapIncludeSources: true,
			},
			minifyjs: {
				files: {
					'js_min/core.min.js':['js_min/core.min.js'],
					'js_min/lib.min.js':['js_min/lib.min.js'],
					'js_min/lib.secure.min.js':['js_min/lib.secure.min.js'],
					'js_min/home.min.js':['/var/www/html/trendsutra3/js/bespoke.ldp.js'],
					'js_min/multi-section.min.js':['js_min/multi-section.min.js'],
					'js_min/brand.min.js':['js_min/brand.min.js'],
					'js_min/vip.min.js':['/var/www/html/trendsutra3/js/newvip.js'],
					'js_min/studio.min.js':['/var/www/html/trendsutra3/js/studio.js'],
                    'js_min/corporate.min.js':['js_min/corporate.min.js'],
                    'js_min/modular.min.js':['js_min/modular.min.js'],
					'js_min/static.min.js':['js_min/static.min.js'],
					'js_min/gift_card.min.js':['/var/www/html/trendsutra3/js/gift_card.js'],
					'js_min/try_buy.min.js':['/var/www/html/trendsutra3/js/tryandbuy.js'],
					'js_min/sell_on_pf.min.js':['js_min/sell_on_pf.min.js'],
					'js_min/checkout.min.js':['/var/www/html/trendsutra3/js/checkout.js'],
					'js_min/checkout_confirmation.min.js':['js_min/checkout_confirmation.min.js'],
					'js_min/myaccount.min.js':['js_min/myaccount.min.js'],
				}
			}
		}
	});
	//Load the pluging
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');		
	
	//Do the Task
	grunt.registerTask("default", ['concat']);
};
