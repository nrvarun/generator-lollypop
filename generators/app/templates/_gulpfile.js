'use strict';
var gulp              = require('gulp');
var gutil             = require('gulp-util');
var browserSync       = require('browser-sync');
var sass              = require('gulp-sass');
var autoprefixer      = require('gulp-autoprefixer');
var rename            = require('gulp-rename');
var imagemin          = require('gulp-imagemin');
var jade              = require('gulp-jade');
var harp              = require('harp');
var cssmin            = require('gulp-cssmin');
var rename            = require('gulp-rename');

var reload            = browserSync.reload;

gulp.task('default',['sass','watch'], function(){
  gutil.log("Gulp is running");
});

gulp.task('serve', function () {
  harp.server('./src', {
    port: 9000
  }, function () {
    browserSync({
      proxy: "localhost:9000",
      open: true,
      /* Hide the notification. It gets annoying */
      notify: {
        styles: ['opacity: 0', 'position: absolute']
      }
    });
    /**
     * Watch for scss changes, tell BrowserSync to refresh main.css
     */
    gulp.watch(["./src/css/**/*.scss"], function () {
      reload("./src/css/main.css", {stream: true});
    });
    /**
     * Watch for all other changes, reload the whole page
     */
    gulp.watch(["src/index.jade", "./src/jade/**/*.jade"], function () {
      reload();
    });
  })
});

//Production Tasks
gulp.task('imagemin', function() {
    gulp.src('src/img/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

//Convert .jade to .html file
gulp.task('jade', function(){
	gulp.src('src/*.jade')
	.pipe(jade({
		pretty: true
	}))
	.pipe(gulp.dest('dist/'));
});

//Convert .scss file to .css
gulp.task('sass', function () {
  return gulp.src('./src/css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy_js', function(){
	gulp.src('src/js/**/*.js').pipe(gulp.dest('dist/js/'))
});

gulp.task('copy_img', function(){
	gulp.src('src/img/**/*').pipe(gulp.dest('dist/img/'))
});

gulp.task('copy_fonts', function(){
	gulp.src('src/fonts/*').pipe(gulp.dest('dist/fonts/'))
});

gulp.task('prod',['jade','sass','imagemin','copy_fonts','copy_js'], function(){
  console.log('Production work is almost done :)');
});