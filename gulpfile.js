"use strict";

// Load plugins
const browsersync = require("browser-sync").create();
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const cssBeautify = require('gulp-cssbeautify');


// BrowserSync.
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 4000,
    startPath: './index.html'
  });
  done();
}

// BrowserSync reload.
function browserSyncReload(done) {
  browsersync.reload();
  done();
}


//Generating the Output CSS file.

function style() {

  // 1. Define the main SASS input file.
  return gulp.src('./scss/outsystems_theme.scss')

    // 2. Pass it through SASS compiler.
    .pipe(sass())
    .pipe(cleancss({
      level: 2,
      format: 'beautify'
    }))
    // 3. Save the compiled CSS.
    .pipe(autoprefixer({
      BrowserList: ['last 2 versions']
    }))
    .pipe(cssBeautify())
    .pipe(
      gulp.dest('./css')
    )
}

// Watch files.
function watchFiles() {
  gulp.watch("./**/*.css", browserSyncReload);
  gulp.watch("./**/*.html", browserSyncReload, style);
  gulp.watch('./scss/', style);
}

const watch = gulp.series(gulp.parallel(watchFiles, browserSync, style));

// Export tasks
exports.style = style;
exports.watch = watch;
exports.default = watch;