var gulp = require('gulp');
var fs   = require('fs');
var path = require('path');
var browserify = require('browserify');
var sass = require('gulp-sass');
var globbing = require('gulp-css-globbing');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var stream = require('gulp-streamify');
var buffer = require('vinyl-buffer');
var colors = require('colors');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var karma = require('karma').server;
var jshint = require('gulp-jshint');

var prod = gutil.env.prod;

var createBundle = function(options) {
  var buildOptions = {
    entries: options.input,
    extensions: options.extensions,
    debug: !prod
  };

  var bundler;
  if (!prod) {
    buildOptions.cache = {};
    buildOptions.packageCache = {};
    bundler = watchify(browserify(buildOptions));
  } else {
    bundler = browserify(buildOptions)
  }

  var rebundle = function() {
    var startTime = new Date().getTime();
    var work =  bundler.bundle()
    .on('error', function() {
      return console.log(arguments);
    })
    .pipe(source(options.output))
    .pipe(prod ? stream(uglify()) : gutil.noop())
    .pipe(gulp.dest(options.destination))
    .on('end', function() {
      var time = (new Date().getTime() - startTime) / 1000;
      return console.log(options.output.cyan + " was browserified: " + (time + 's').magenta);
    });
  };

  if (!prod) {
    bundler.on('update', rebundle);
  }
  return rebundle();
};

var createBundles = function(bundles) {
  return bundles.forEach(function(bundle) {
    var parts = bundle.split('/');
    var file = parts.pop();
    var destDir = parts.length > 0 ? parts.join('/') + '/' : ''

    return createBundle({
      input: 'js/src/views/' + bundle + '/' + file,
      output: file + '.js',
      extensions: ['.js', '.jsx'],
      destination: '../static/dist/js/views/' + destDir
    });
  });
};

gulp.task('js', function() {
  var js = 'js/src/views';
  var controllers = fs.readdirSync(js);
  var views = [];

  for (var i=0; i < controllers.length; i++) {
    var c = controllers[i];

    if (fs.statSync(path.join(js, c)).isDirectory()) {
      var potentials = fs.readdirSync(path.join(js, c));

      for (var j=0; j < potentials.length; j++) {
        var p = potentials[j];
        
        if (fs.statSync(path.join(js, c, p)).isDirectory()) {
          views.push(c + '/' + p)
        }
      }
    }
  };

  views = views.filter(function(file) {
    return fs.statSync(path.join(js, file)).isDirectory();
  });
  return createBundles(views);
});

gulp.task('jshint', function() {
  gulp.src(['js/src/views/**/*.js', 'js/spec/*.js', 'js/src/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'))
  .pipe(jshint.reporter('fail'));
})

gulp.task('css', function() {
  // main.scss
  gulp.src('./sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(globbing({
      extensions: ['.scss']
    }))
    .pipe(sass().on('error', function(e) {
      console.error(e);
    }))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../static/dist/css'));

  // Pages
  gulp.src('./sass/pages/*/*.scss')
    .pipe(sourcemaps.init())
    .pipe(globbing({
      extensions: ['.scss']
    }))
    .pipe(sass().on('error', function(e) {
      console.error(e);
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('../static/dist/css/pages'));
});

gulp.task('watch', function() {
  if (!prod) {
    gulp.watch('./sass/**', ['css']);
  }

  gulp.start('js');
  gulp.start('css');
});

gulp.task('default', ['watch']);

gulp.task('test', function () {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, function(karmaExitStatus) {
    if (karmaExitStatus) {
      process.exit(1);
    }
  });
});
