var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cssnano = require('gulp-cssnano');

const scss = (cb) => {
    gulp.src(['src/**/*.mobile.scss','src/**/*.common.scss' ])
        .pipe(sass())
        .pipe(concat('mobile.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist'));

    gulp.src(['src/**/*.desktop.scss','src/**/*.common.scss' ])
        .pipe(sass())
        .pipe(concat('desktop.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist'));
    cb();
};

const watch = (cb) => {
    gulp.watch(['src/**/*.scss'], scss);
    cb();
};

gulp.task('watch', watch);
gulp.task('scss', scss);
