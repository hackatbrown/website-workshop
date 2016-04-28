// gulpfile.js
// Grabbed from this browserify tutorial: https://scotch.io/tutorials/getting-started-with-browserify
// and modified to reflect Hack@Brown's stack
"use strict";

var     babelify   = require('babelify'),
        browserify = require('browserify'),
        buffer     = require('vinyl-buffer'),
        gulp       = require('gulp'),
        gutil      = require('gulp-util'),
        rename     = require('gulp-rename'),
        source     = require('vinyl-source-stream'),
        sourceMaps = require('gulp-sourcemaps'),
        colors = require('colors'),
        watchify   = require('watchify');

var config = {
    js: {
        src: 'js/src/pages/index.js',       // Entry point
        outputDir: '../static/js',  // Directory to save bundle to
        mapDir: '../maps',      // Subdirectory to save maps to
        outputFile: 'bundle.js' // Name to use for bundle
    },
};

// This method makes it easy to use common bundling options in different tasks
function bundle (bundler) {
    var startTime = new Date().getTime();

    // Add options to add to "base" bundler passed as parameter
    bundler
      .bundle()                                    // Start bundle
      .pipe(source(config.js.src))                 // Entry point
      .pipe(buffer())                              // Convert to gulp pipeline
      .pipe(rename(config.js.outputFile))          // Rename output from 'main.js'
      .pipe(sourceMaps.init({ loadMaps : true }))  // Strip inline source maps
      .pipe(sourceMaps.write(config.js.mapDir))    // Save source maps to their own directory
      .pipe(gulp.dest(config.js.outputDir))        // Save 'bundle' to outputDir/
      .on('end', function() {
        var time = (new Date().getTime() - startTime) / 1000;
        return console.log(config.js.outputFile.cyan + " was browserified: " + (time + 's').magenta);
      });
}

gulp.task('watch', function () {
    var bundler = browserify({
        entries: [config.js.src],
        cache: {},
        packageCache: {},
        plugin: [watchify],
      }).transform(babelify, { presets : [ 'react' ] });  // Then, babelify, with React preset

    bundler.on('update', function() {bundle(bundler)} );

    bundle(bundler);  // Chain other options -- sourcemaps, rename, etc.
});

gulp.task('build', function () {
    var bundler = browserify({
        entries: [config.js.src],
      }).transform(babelify, { presets : [ 'react' ] });  // Then, babelify, with React preset

    bundle(bundler);  // Chain other options -- sourcemaps, rename, etc.
});