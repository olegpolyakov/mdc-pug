const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const { render } = require('pug');

sass.compiler = require('sass');

function buildPug() {
    return gulp.src('./docs/**/*.pug')
        .pipe(pug({
            basedir: './',
            filename: 'index.pug',
            filters: {
                code: function(text) {
                    return render(`include index.pug\n\nsection\n  ${text.trim().split('\n').join('\n  ')}\n\nsection\n    pre\n      code.language-pug\n        | ${text.trim().split('\n').join('\n        | ')}`, {
                        filename: 'index.pug'
                    });
                }
            }
        }))
        .pipe(gulp.dest('./docs'));
}

function buildSass() {
    return gulp.src('./docs/index.scss')
        .pipe(sass({
            includePaths: ['./node_modules/'],
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./docs'));
}

function copyJs() {
    return gulp.src('./node_modules/material-components-web/dist/material-components-web.min.js')
        .pipe(gulp.dest('./docs'));
}

gulp.watch('./docs/**/*.scss', buildSass);
gulp.watch('./docs/**/*.pug', buildPug);

module.exports.default = gulp.parallel(buildPug, buildSass, copyJs);