const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const { render } = require('pug');
const marked = require('marked');

function buildPug() {
    return gulp.src([
        './docs/src/**/*.pug',
        '!./docs/src/layouts/*.pug',
        '!./docs/src/mixins.pug'
    ])
        .pipe(pug({
            basedir: './docs/src/',
            filename: 'index.pug',
            locals: {
                markdown: marked
            },
            filters: {
                code: function(text) {
                    return render(`include index.pug\n\nsection\n  ${text.trim().split('\n').join('\n  ')}\n\ndiv.code-block\n    pre\n      code.language-pug\n        | ${text.trim().split('\n').join('\n        | ')}`, {
                        filename: 'index.pug'
                    });
                },

                highlight: function(text, options) {
                    return render(`div\n    pre\n      code.language-${options.lang}\n        | ${text.trim().split('\n').join('\n        | ')}`);
                }
            }
        }))
        .pipe(gulp.dest('./docs'));
}

function buildSass() {
    return gulp.src('./docs/src/index.scss')
        .pipe(sass({
            includePaths: ['./node_modules/'],
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./docs'));
}

function copyJs() {
    return gulp.src('./index.js')
        .pipe(gulp.dest('./docs'));
}

gulp.watch('./docs/**/*.scss', buildSass);
gulp.watch('./docs/**/*.pug', buildPug);

module.exports.default = gulp.parallel(buildPug, buildSass, copyJs);