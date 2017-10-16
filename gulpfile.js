var gulp    = require('gulp'),
      gutil    = require('gulp-util'),
      uglify  = require('gulp-uglify'),
     rename = require("gulp-rename"),
    concat  = require('gulp-concat');
//script paths
var clipjs =['/var/www/html/trendsutra3/js/flickity.pkgd.min.js','/var/www/html/trendsutra3/js/jquery.twbsPagination.js','/var/www/html/trendsutra3/js/listing.js','/var/www/html/trendsutra3/js/newclip.js'],
    jsDest = './scripts';

gulp.task('clip', function() {
    return gulp.src(clipjs)
        .pipe(concat('multi-section.min.js'))
        .pipe(gulp.dest(jsDest))
	.pipe(rename('multi-section.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('default', function(){
    gulp.run('clip'); 
});

gulp.watch('/var/www/html/trendsutra3/js/*', function () {
     gulp.run('clip');
});

