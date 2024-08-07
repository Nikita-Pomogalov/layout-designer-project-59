const { src, dest, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const browsersync = () => {
  browserSync.init({
    server: { baseDir: 'docs/' },
    notify: false,
    online: true,
    open: false
  });

  watch('./app/**/*.js', scripts);
	watch('./app/**/*.scss', sass2css);
	watch('./app/**/*.pug', pug2html);
};

const scripts = () => {
  return src([
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js.map',
  ])
  .pipe(dest('./docs/js/'))
  .pipe(browserSync.stream())
};

const sass2css = () => {
  return src([
    './app/scss/main.scss'
  ])
  .pipe(sass())
  .pipe(concat('main.css'))
  .pipe(dest('./docs/styles/'))
  .pipe(browserSync.stream())
};

const pug2html = () => {
  return src([
    './app/**/*.pug',
  ])
  .pipe(pug())
  .pipe(dest('./docs/'))
  .pipe(browserSync.stream())
};

exports.build = parallel(scripts, sass2css, pug2html);
exports.default = browsersync;