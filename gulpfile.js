'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var notify = require('gulp-notify');

gulp.task('sass', function () {
  return gulp.src('./assets/sass/**/*.scss')
  	.pipe(sass({
  		includePaths: ['./node_modules/foundation-sites/scss']
	}).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie >= 9', 'Android >= 2.3', 'ios >= 7']
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./assets/css'))
    .pipe(notify('Sass task complete!'));
});

gulp.task('watch', function () {
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
});