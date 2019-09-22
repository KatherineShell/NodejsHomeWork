var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano');
  // rename = require("gulp-rename");

const scss = (cb) => {
    gulp.src(['scss/**/*.mobile.scss','scss/**/*.common.scss' ])
        .pipe(sass())
        .pipe(concat('mobile.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist'));

    gulp.src(['scss/**/*.desktop.scss','scss/**/*.common.scss' ])
        .pipe(sass())
        .pipe(concat('desktop.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist'));
    cb();
}

const watch = (cb) => {
    gulp.watch(['scss/**/*.scss'], scss);
    cb();
}

gulp.task('watch', watch);
gulp.task('scss', scss);
