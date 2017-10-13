var gulp    = require('gulp'),
      gutil    = require('gulp-util'),
      uglify  = require('gulp-uglify'),
     rename = require("gulp-rename"),
    concat  = require('gulp-concat');
//script paths
var jsFiles = './js/*.js',
    jsDest = './scripts';

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
	.pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('default', function(){
    gulp.run('scripts'); 
});

gulp.watch('./js/*', function () {
     gulp.run('scripts');
});

