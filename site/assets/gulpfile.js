"use strict";

var babelify     = require('babelify'),
    browserify   = require('browserify'),
    buffer       = require('vinyl-buffer'),
    gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    glob         = require('glob'),
    gutil        = require('gulp-util'),
    rename       = require('gulp-rename'),
    source       = require('vinyl-source-stream'),
    colors       = require('colors'),
    watchify     = require('watchify'),
    autoprefixer = require('gulp-autoprefixer');

var config = {
    js: {
        src: 'js/src/pages/*.*',       // Entry point
        outputDir: '../static/js',      // Directory to save bundle to
    },
    css: {
        main: './sass/main.scss',
        pages: './sass/pages/*.scss',
        outputDir: '../static/css'
    }
};

gulp.task('css', function() {
  // main.scss
  gulp.src(config.css.main)
    .pipe(sass().on('error', gutil.log))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
    }))
    .pipe(gulp.dest(config.css.outputDir));

  // pages
  gulp.src(config.css.pages)
    .pipe(sass().on('error', gutil.log))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
    }))
    .pipe(gulp.dest(config.css.outputDir + '/pages'));
});


function compileJS(watch) {
    var pages = glob.sync(config.js.src);

    pages.forEach(function(page) {                    // Each page will have its own bundle
        var bundleName = page.split('/').pop();       // This will be the filename of the output bundle

        var bundler = browserify({
            entries: [page],
            debug: watch,
            cache: {},                                // Watchify uses cache stuff in order to quickly
            packageCache: {},                         // regenerate the compiled files
            plugin: watch ? [watchify] : [],
          }).transform(babelify, { presets : [ 'react' ] });  // Then, babelify, with React preset


        // We declare this as a function because we are going to bind it to the update event.
        function bundle() {
            var startTime = new Date().getTime();

            // Add options to add to "base" bundler passed as parameter
            bundler
              .bundle()                                    // Start bundle
              .on('error', gutil.log)
              .pipe(source(page))                          // Entry point
              .pipe(buffer())                              // Convert to gulp pipeline
              .pipe(rename(bundleName.replace("jsx", "js")))
              .pipe(gulp.dest(config.js.outputDir))        // Save 'bundle' to output
              .on('end', function() {
                var time = (new Date().getTime() - startTime) / 1000;
                return console.log(bundleName.cyan + " was browserified: " + (time + 's').magenta);
              })
          }

        bundler.on('update', bundle);                      // This event comes from watchify
        bundle();
    });
}

gulp.task('watch', function () {
    compileJS(true);
    gulp.watch('./sass/**', ['css']);
});

gulp.task('build', function () {
    compileJS(false);
    gulp.start('css');
});

gulp.task('default', ['watch']);