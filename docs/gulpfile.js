const path = require('path');
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');

function buildPug() {
    return gulp.src('./src/**/*.pug')
        .pipe(pug({
            basedir: '../'
        }))
        .pipe(gulp.dest('./build/'));
}

function buildSass() {
    return gulp.src('./src/index.scss')
        .pipe(sass({
            includePaths: ['../node_modules/'],
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./build/'));
}

function copyJs() {
    return gulp.src('../node_modules/material-components-web/dist/material-components-web.min.js')
        .pipe(gulp.dest('./build/'));
}

gulp.watch('./src/**/*.scss', buildSass);
gulp.watch('./src/**/*.pug', buildPug);

module.exports.default = gulp.parallel(buildPug, buildSass, copyJs);