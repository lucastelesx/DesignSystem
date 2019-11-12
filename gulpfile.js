const gulp = require('gulp');
const { src, dest, parallel, watch, series} = require('gulp');
const
  pug =          require('gulp-pug'),
  autoprefixer = require('gulp-autoprefixer'),
  sass =         require('gulp-sass');
  
var paths = {
  styleSrcMain: {
    src: 'scss/main/main.scss',
    dest: 'css'
  },
  watchMain:{
    globSrc:'scss/**/*.scss'
  }
};

function html() {
  return src('pug/*.pug')
    .pipe(pug({pretty: true}))
    .pipe(dest('./'))
}

function scss() {
  return src(paths.styleSrcMain.src,{
    sourcemaps: true
  })
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(gulp.dest(paths.styleSrcMain.dest));
}

exports.default = function(){
  watch(
    [
      'pug/*.pug', paths.styleSrcMain.src, paths.watchMain.globSrc
    ],{ events: 'all' },
    parallel(html, scss)
    )
}