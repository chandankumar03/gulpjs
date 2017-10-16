var gulp    = require('gulp'),
      gutil    = require('gulp-util'),
      uglify  = require('gulp-uglify'),
     rename = require("gulp-rename"),
    concat  = require('gulp-concat');
//script paths
var clipjs =['/var/www/html/trendsutra3/js/flickity.pkgd.min.js','/var/www/html/trendsutra3/js/jquery.twbsPagination.js','/var/www/html/trendsutra3/js/listing.js','/var/www/html/trendsutra3/js/newclip.js'];
var core_min_js =['/var/www/html/trendsutra3/js/jquery.mCustomScrollbar.js','/var/www/html/trendsutra3/js/jquery-ui.custom.min.js','/var/www/html/trendsutra3/js/jquery.lazy.min.js','/var/www/html/trendsutra3/js/select2.min.js','/var/www/html/trendsutra3/js/slick.min.js','/var/www/html/trendsutra3/js/modernizr.custom.65968.min.js','/var/www/html/trendsutra3/js/notifier/socket.io-1.3.5.js','/var/www/html/trendsutra3/js/notifier/jquery.cookie.js'];
var lib_min_js =['/var/www/html/trendsutra3/js/utilities.js','/var/www/html/trendsutra3/js/newheader.js','/var/www/html/trendsutra3/js/common.js','/var/www/html/trendsutra3/js/notifier/notifier.js','/var/www/html/trendsutra3/js/recaptcha.js'];
var lib_secure_min_js =['/var/www/html/trendsutra3/js/utilities.js','/var/www/html/trendsutra3/js/newheader.js','/var/www/html/trendsutra3/js/common.js','/var/www/html/trendsutra3/js/customer/validate.js','/var/www/html/trendsutra3/js/notifier/notifier.js','/var/www/html/trendsutra3/js/recaptcha.js'];
var brand_min_js =['/var/www/html/trendsutra3/js/jquery.twbsPagination.js','/var/www/html/trendsutra3/js/newbrands.js'];
var static_min_js =['/var/www/html/trendsutra3/js/bespoke.ldp.js', '/var/www/html/trendsutra3/js/static_page.js','/var/www/html/trendsutra3/js/contactus.js'];
var sell_on_pf_min_js =['/var/www/html/trendsutra3/js/myaccount.js','/var/www/html/trendsutra3/js/merchant.js'];
var checkout_confirmation_min_js =['/var/www/html/trendsutra3/js/clipboard.min.js','/var/www/html/trendsutra3/js/confirm.js'];
var myaccount_min_js =['/var/www/html/trendsutra3/js/trackorder.js','/var/www/html/trendsutra3/js/static_page.js','/var/www/html/trendsutra3/js/myaccount.js','/var/www/html/trendsutra3/js/wardrobe/wardrobe-vip.js','/var/www/html/trendsutra3/js/jquery.twbsPagination.js'];
var vip_min_js =['/var/www/html/trendsutra3/js/newvip.js'];
var studio_min_js =['/var/www/html/trendsutra3/js/studio.js'];

var jsDest = '/var/www/html/trendsutra3/js';
//var jsDest = './scripts';

gulp.task('clip', function() {
    return gulp.src(clipjs)
        .pipe(concat('multi-section.temp.js'))
        .pipe(gulp.dest(jsDest))
	.pipe(rename('multi-section.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});
gulp.task('core_min_js', function() {
    return gulp.src(core_min_js)
        .pipe(concat('core.temp.js'))
        .pipe(gulp.dest(jsDest))
	.pipe(rename('core.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});
gulp.task('lib_min_js', function() {
    return gulp.src(lib_min_js)
        .pipe(concat('lib.temp.js'))
        .pipe(gulp.dest(jsDest))
	.pipe(rename('lib.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});
gulp.task('lib_secure_min_js', function() {
    return gulp.src(lib_secure_min_js)
        .pipe(concat('lib.secure.temp.js'))
        .pipe(gulp.dest(jsDest))
	.pipe(rename('lib.secure.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});
gulp.task('brand_min_js', function() {
    return gulp.src(brand_min_js)
        .pipe(concat('brand.temp.js'))
        .pipe(gulp.dest(jsDest))
	.pipe(rename('brand.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});
gulp.task('static_min_js', function() {
    return gulp.src(static_min_js)
        .pipe(concat('static.temp.js'))
        .pipe(gulp.dest(jsDest))
	.pipe(rename('static.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});
gulp.task('sell_on_pf_min_js', function() {
    return gulp.src(sell_on_pf_min_js)
        .pipe(concat('sell_on_pf.temp.js'))
        .pipe(gulp.dest(jsDest))
	.pipe(rename('sell_on_pf.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});
gulp.task('checkout_confirmation_min_js', function() {
    return gulp.src(checkout_confirmation_min_js)
        .pipe(concat('checkout_confirmation.temp.js'))
        .pipe(gulp.dest(jsDest))
	.pipe(rename('checkout_confirmation.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});
gulp.task('myaccount_min_js', function() {
    return gulp.src(myaccount_min_js)
        .pipe(concat('myaccount.temp.js'))
        .pipe(gulp.dest(jsDest))
	.pipe(rename('myaccount.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});
gulp.task('vip_min_js', function() {
    return gulp.src(vip_min_js)
        .pipe(concat('vip.temp.js'))
        .pipe(gulp.dest(jsDest))
	.pipe(rename('vip.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});
gulp.task('studio_min_js', function() {
    return gulp.src(studio_min_js)
        .pipe(concat('studio.temp.js'))
        .pipe(gulp.dest(jsDest))
	.pipe(rename('studio.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('default', function(){
    gulp.run('clip'); 
});

gulp.watch('/var/www/html/trendsutra3/js/*', function () {
     gulp.run(['clip','vip_min_js','studio_min_js','myaccount_min_js','static_min_js','checkout_confirmation_min_js']);
//     gulp.run('vip_min_js');
//     gulp.run('studio_min_js');
//     gulp.run('myaccount_min_js');
//     gulp.run('checkout_confirmation_min_js');
     
});

