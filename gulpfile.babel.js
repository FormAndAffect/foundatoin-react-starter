/* eslint-env node */
//* eslint-disable */

'use strict';

import plugins from 'gulp-load-plugins';
import yargs from 'yargs';
import browser from 'browser-sync';
import gulp from 'gulp';
import panini from 'panini';
import rimraf from 'rimraf';
import sherpa from 'style-sherpa';
import yaml from 'js-yaml';
import fs from 'fs';

//for react
import webpack from 'webpack';
import gutil from 'gulp-util';
import webpackConfig from './webpack.config.js';
import WebpackDevServer from 'webpack-dev-server';

//for running shell scripts
const exec = require('child_process').exec;

// Load all Gulp plugins into one variable
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

// Load settings from settings.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS, FTP } = loadConfig();

function loadConfig() {
  const ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}


//build
//--------------------------------------

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
 gulp.series(clean, gulp.parallel([pages, sass, javascript, vendorJavascript, images, copy]), 
  styleGuide));

// Build the site, run the server, then watch for file changes, and run webpack(with dev server)
gulp.task('default',
  gulp.series('build', server, gulp.parallel([watch, reactJavascript])));

// Build the site, run the server, then watch for file changes, and run webpack(with dev server)
gulp.task('prod',
  gulp.series('build', server, gulp.parallel([watch, reactJavascript])));

// Build the site, and watch for file (and ee file) changes then rsync
gulp.task('rsync',
  gulp.series('build', watchProduction));


// // run webpack for react (without webpackStream version) 
function reactJavascript(done) {

  if(!PRODUCTION) {

      //dev version
      gutil.log('running dev webpack');
      //grab existing config file
      var myConfig = Object.create(webpackConfig);
      myConfig.watch = true;

      //run webpack
      webpack(myConfig,
      function(err, stats) {
          if(err) throw new gutil.PluginError("webpack", err);
          gutil.log("[webpack]", stats.toString({
              // output options
              colors: true
          }));

          gutil.log("webpack build complete");
          //still can't get browser to reload...
          //browser.reload;
          
      }); 

    } else {

      //dev version
      gutil.log('running production webpack');
      //grab existing config file
      let myConfig = Object.create(webpackProdConfig);
      // myConfig.watch = true;

      // var taskNum = 1; // A counter to track how many times the webpack task runs

      //run webpack
      webpack(myConfig,
      function(err, stats) {
          if(err) throw new gutil.PluginError("webpack", err);
          gutil.log("[webpack:build]", stats.toString({
              // output options
              colors: true
          }));

          gutil.log("webpack build complete");
          //still can't get browser to reload...
          browser.reload;
          
      }); 

    }

}

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Copy files out of the assets/media folder
function copy() {
  return gulp.src(PATHS.media)
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/media'));
}

// Copy assets/js/vendor.js
function vendorJavascript() {
  return gulp.src(PATHS.vendor)
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/js'))
}

// Copy page templates into finished HTML files
function pages() {
  return gulp.src('src/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      data: 'src/data/',
      helpers: 'src/helpers/'
    }))
    .pipe(gulp.dest(PATHS.dist));
}

// Load updated HTML templates and partials into Panini
function resetPages(done) {
  panini.refresh();
  done();
}

// Generate a style guide from the Markdown content and HTML template in styleguide/
function styleGuide(done) {
  sherpa('src/styleguide/index.md', {
    output: PATHS.dist + '/styleguide.html',
    template: 'src/styleguide/template.html'
  }, done);
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  return gulp.src('src/assets/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    // Comment in the pipe below to run UnCSS in production
    //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/css'))
    .pipe(browser.reload({ stream: true }));
}

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.babel({ignore: ['what-input.js']}))
    .pipe($.concat('app.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/js'));
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  return gulp.src('src/assets/img/**/*')
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/img'));
}

// Start a server with BrowserSync to preview the site in
function server(done) {
  browser.init({
    server: PATHS.dist, port: PORT
  });
  done();
}

// Reload the browser with BrowserSync
function reload(done) {
  browser.reload();
  done();
}

function rsyncAssets(done) {
  gutil.log("rsync assets...");
  let cmd1 = '/usr/bin/rsync -arv --exclude "*.html"  -e "ssh -i $HOME/.ssh/id_rsa_reifwinery -p 52802" ' + 
  PATHS.dist + '/' + ' reifwinery@159.203.37.121:' + PATHS.distServer
  exec(cmd1, function(error, stdout, stderr) { 
    console.log(stdout);
    console.log(stderr);
    done();
  });
}

function rsyncTemplates(done) {
  let cmd2 = '/usr/bin/rsync -arv  -e "ssh -i $HOME/.ssh/id_rsa_reifwinery -p 52802" ' + 
  PATHS.eeTemplates + '/' + ' reifwinery@159.203.37.121:' + PATHS.eeTemplatesServer;
  exec(cmd2, function(error, stdout, stderr) { 
    console.log(stdout);
    console.log(stderr);
    done();
  });
}

//watch for panini (html) changes
function watch() {
  gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, browser.reload));
  gulp.watch('src/{layouts,partials}/**/*.html').on('all', 
    gulp.series(resetPages, pages, browser.reload));
  watchAssets();
}


// Watch for changes to static assets, pages, Sass, and JavaScript
function watchAssets() {
  gulp.watch(PATHS.media, copy);
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(sass, browser.reload));
  gulp.watch('src/assets/js/app.js').on('all', 
    gulp.series(javascript, rsyncAssets, browser.reload));
  gulp.watch('src/assets/js/vendor.js').on('all', 
    gulp.series(vendorJavascript, rsyncAssets, browser.reload));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, rsyncAssets, browser.reload));
  gulp.watch('src/styleguide/**').on('all', gulp.series(styleGuide, rsyncAssets, browser.reload));
}

// Watch for changes to static assets, and ee templates then rsync
function watchProduction() {
  //watch ee templates
  gulp.watch(PATHS.eeTemplates).on('all', gulp.series(rsyncTemplates));
  //watch assets
  gulp.watch(PATHS.media, copy);
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(sass, rsyncAssets));
  gulp.watch('src/assets/js/app.js').on('all', gulp.series(javascript, rsyncAssets));
  gulp.watch('src/assets/js/vendor.js').on('all', gulp.series(vendorJavascript, rsyncAssets));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, rsyncAssets));
  gulp.watch('src/styleguide/**').on('all', gulp.series(styleGuide, rsyncAssets));
}
