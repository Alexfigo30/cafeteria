const { src, dest, watch, series, parallel } = require('gulp');


//css y sasss
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

//imagenes

function css(done) {
    src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe( sass() )
        .pipe( postcss ( [autoprefixer()]) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/css') )

        done();

}

function imagenes() {
      return src('src/img/**/*')
          .pipe(dest('build/img')) 
}


function dev() {
    watch( 'src/scss/**/*.scss', css );
    watch( 'src/img/**/*', imagenes );
}


exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series( imagenes, css, dev  );

// series - Se inicia una tarea, y hasta que finaliza, inicia la siguiente
// parallel - Todas inician al mismo tiempo