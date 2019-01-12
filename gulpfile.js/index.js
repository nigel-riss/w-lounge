'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const bSync = require('browser-sync');

const dirs = {
  pug: './src/pug/**/*.pug',
  scss: './src/scss/**/*.scss',
  docs: './docs'
}


/**
 * Renders html from pug
 */
let pugRender = () => (
  gulp.src(dirs.pug)
    .pipe(pug())
    .pipe(gulp.dest(dirs.docs))
);


/**
 * Compiles scss files to styles.css
 */
let styles = () => (
  gulp.src(dirs.scss)
    .pipe(sass())
    .pipe(gulp.dest(dirs.docs))
    .pipe(bSync.stream())
);


/**
 * Runs browserSync server
 * @param {Function} done callback
 */
let browserSyncInit = (done) => {
  bSync.init({
    server: {
      baseDir: dirs.docs
    },
    port: 3000
  });
  done();
};


/**
 * Reloads browserSync server
 * @param {Function} done callback
 */
let browserSyncReload = (done) => {
  bSync.reload();
  done();
};


/**
 * Watches files for changes
 */
let watchFiles = () => {
  gulp.watch(dirs.pug, gulp.series(pugRender, browserSyncReload));
  gulp.watch(dirs.scss, gulp.series(styles));
};


const watch = gulp.parallel(watchFiles, browserSyncInit);

exports.watch = watch;
