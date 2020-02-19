const gulp = require('gulp');
const { src, dest, parallel, watch, series} = require('gulp');
const
  pug =          require('gulp-pug'),
  autoprefixer = require('gulp-autoprefixer'),
  sass =         require('gulp-sass');
  
var paths = {
  styleMain: {
    src: `./src/scss/main/main.scss`,
    dest: './src/css'
  },
  watchMain:{
    global:'./src/scss/**/*.scss'
  }
};

function html() {
  return src('./src/index.pug')
    .pipe(pug({pretty: true}))
    .pipe(dest('./src'))
}

function scss() {
  return src(paths.styleMain.src,{
    sourcemaps: true
  })
  .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(gulp.dest(paths.styleMain.dest));
}

exports.default = function(){
  watch(
    [paths.watchMain.global],{ events: 'all' },
    parallel(scss)
    )
}