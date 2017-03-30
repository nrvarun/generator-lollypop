'use strict';
var gulp              = require('gulp');
var gutil             = require('gulp-util');
var browserSync       = require('browser-sync');
var sass              = require('gulp-sass');
var postcss           = require('gulp-postcss');
var uncss             = require('gulp-uncss');
var autoprefixer      = require('autoprefixer');
var cssnano           = require('cssnano');
var csso              = require('gulp-csso');
var stylefmt          = require('gulp-stylefmt');
var imagemin          = require('gulp-imagemin');
var htmlmin           = require('gulp-htmlmin');
var cssmin            = require('gulp-cssmin');
var rename            = require('gulp-rename');
var harp              = require('harp');
var reload            = browserSync.reload;
var paths             = {
                             html           : ['./**/*.html'],
                             sass           : ['./css/*.scss'],
                             javascript     : [
                                                 './js/*.js'
                                              ],
                             css            : './src/css/*.css'
                         };
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
    gulp.watch(["src/index.jade", "./jade/**/*.jade"], function () {
      reload();
    });
  })
});

gulp.task('sass', function () {
  return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(stylefmt())
    .pipe(gulp.dest('./dst/css'))
    .pipe(browserSync.stream());
});

gulp.task('watch',['browserSync'],function(){
  gulp.watch('./css/*.scss',['sass']);
  gulp.watch('./css/*.css', browserSync.reload);
  gulp.watch('./*.html', browserSync.reload); 
  gulp.watch('./js/*.js',browserSync.reload); 
});

//Production Setup
gulp.task('copy', function(){
  gulp.src([
            'src/**/*.html',
            'src/**/*.js',
            'src/**/*.jpg'
          ])
        .pipe(gulp.dest('dist'));
});
gulp.task('cssmin', function(){
    var processors = [
        cssnano()
    ];
     gulp.src('src/**/*.css')
          .pipe(postcss(processors))
          .pipe(csso())
          .pipe(cssmin())
          .pipe(rename({suffix: '.min'}))
          .pipe(gulp.dest('dist'));
});
gulp.task('imagemin', function() {
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});

gulp.task('htmlmin', function() {
  return gulp.src('src/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('uncss', function () {
    return gulp.src('src/css/*.css')
        .pipe(uncss({
            html: ['src/index.html']
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('prod',['copy','htmlmin','cssmin','imagemin'], function(){
  console.log('Production work is almost done :)');
});