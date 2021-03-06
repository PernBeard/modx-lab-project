'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src(['assets/sass/**/*.scss', 'assets/sass/**/*.sass'])
  	.pipe(sass({
  		includePaths: ['node_modules/foundation-sites/scss']
	}).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9', 'Android >= 2.3', 'ios >= 7']
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('assets/css'))
    .pipe(notify('Sass task complete!'));
});

gulp.task('scripts', function () {
  return gulp.src([
      'node_modules/jquery/dist/jquery.js',
      'node_modules/jquery-placeholder/jquery.placeholder.js',
      'assets/scripts/vex.js',
      'assets/scripts/**/*.js'
    ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js'))
    .pipe(notify('Scripts task complete!'));
});

gulp.task('watch', function () {
  gulp.watch('assets/sass/**/*.scss', ['sass']);
  gulp.watch('assets/scripts/**/*.js', ['scripts']);
});