'use strict';

/* eslint-env node */
//* eslint-disable */

'use strict';

const plugins = require('gulp-load-plugins');
const yargs = require('yargs');
const gulp = require('gulp');
const rimraf = require('rimraf');
const panini = require('panini');
const yaml = require('js-yaml');
const fs = require('fs');
//for react
const webpack = require('webpack');
const gutil = require('gulp-util');
const absPath = require('path');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');

const webpackConfig = require('./webpack.config.js');
const webpackProdConfig = require('./webpack.production.config.js');
const WebpackDevServer = require('webpack-dev-server');
//grab existing webpack config file
var configDevServer = Object.create(webpackConfig);
//myConfig.devtool = 'eval';
//myConfig.watch = true;
var swPrecache = require('sw-precache');

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

//outputs 'production' or 'development';
const ENV = PRODUCTION ? 'production' : 'development';

//for running shell scripts
const exec = require('child_process').exec;

// Load all Gulp plugins into one variable
const $ = plugins();

// Load settings from settings.yml
const { PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
  const ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

//for sw precache
const staticFileGlobs = [
   PATHS.dist + "/**.html",
   PATHS.dist + "/assets/css/**.css",
   PATHS.dist + "/assets/js/**.js",
   PATHS.dist + "/assets/img/icons/**.{svg,png,jpg,gif}",
   PATHS.dist + "/assets/img/placeholder-images/**.{svg,png,jpg,gif}",
]


//build
//--------------------------------------

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
 gulp.series(clean, gulp.parallel([pages, sass, javascript, vendorJavascript, headJavascript, webpackBuild, images, media, favicons]), generateServiceWorker));

// Build the site, run the server, then watch for file changes, and run webpack(with dev server)
gulp.task('default',
  gulp.series('build', gulp.parallel([watchPages, watch, devServer])));
  //gulp.series('build', gulp.parallel([devServer, watch])));

// Build the site, and watch for file (and ee file) changes then rsync
gulp.task('rsync',
  gulp.series('build', watchProduction));


function devServer() {
  // Start a webpack-dev-server
  // ** remember to include <script src="http://localhost:8080/webpack-dev-server.js"></script>
  // in index.html file to get hot reloading working properly
  const server = new WebpackDevServer(webpack(configDevServer), {
      //location of bundle in relation to index.html (to enable serve from memory)
      publicPath: '/assets/js/',
      inline: true,
      stats: {
          colors: true
      },
      hot: true,
      historyApiFallback: {
      rewrites: [
          // shows /index.html as the landing page
          { from: /^\/$/, to: '/index.html' },
          // shows /index.html for all routes starting with /test-rewrite
          { from: /^\/test-rewrite.*/, to: '/index.html' },
          // shows views/404.html on all other pages
          // { from: /./, to: '/views/404.html' }
        ]
      },
      contentBase: absPath.resolve(__dirname, PATHS.dist)
  });

  server.listen(8080, 'localhost', function(err) {
      if(err) throw new gutil.PluginError('webpack-dev-server', err);
      gutil.log('starting webpack dev server');
      //proxy.run();
  });
}

function webpackBuild() {
  //if production
  if(PRODUCTION) {
    return gulp.src(PATHS.react)
      .pipe(named())
      .pipe(webpackStream(webpackProdConfig, webpack))
      .pipe(gulp.dest(PATHS.dist + '/assets/js'));
  } else {
      return gulp.src(PATHS.react)
       .pipe(named())
       .pipe(webpackStream(webpackConfig, webpack))
       .pipe(gulp.dest(PATHS.dist + '/assets/js'));
  }
}

function generateServiceWorker(done) {
  swPrecache.write(PATHS.dist + '/service-worker.js', {
    staticFileGlobs: staticFileGlobs,
    stripPrefix: PATHS.dist,
    verbose: true,
    // skipWaiting: false,
    //unresolved urls fallback to index page
    navigateFallback: '/index.html',
    //with runtime caching the sw-toolbox library configured with the caching strategies 
    //you specify will automatically be included in your generated service worker file
    runtimeCaching: [
    {
      urlPattern: /\/assets\//,
      handler: 'fastest',
      // options: {
      //   debug: true
      // }
    },
    {
      urlPattern: /\/api\//,
      handler: 'fastest',
    },
    {
      urlPattern: /googleapis/,
      handler: 'fastest',
    },
    {
      urlPattern: /mapbox/,
      handler: 'fastest',
    },
    {
      urlPattern: /gstatic/,
      handler: 'fastest',
    },
    {
      urlPattern: /typekit/,
      handler: 'fastest',
    },
    // {
    //   urlPattern: /(.*)/,
    //   handler: 'fastest',
    // },
    ]
  }, function() {
    gutil.log('service worker generated');
    done();
  });
}

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Copy files out of the assets/media folder
function media() {
  return gulp.src(PATHS.media)
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/media'));
}

// Copy files out of the assets/favicons folder
// * app manifest and browserconfig file is also included in there
function favicons() {
  return gulp.src(PATHS.favicons)
    .pipe(gulp.dest(PATHS.dist + '/'));
}

// Combine vendor js into one file
function vendorJavascript() {
  return gulp.src(PATHS.vendor)
    .pipe($.concat('vendor.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/js'))
}

// Combine head js into one file
function headJavascript() {
  return gulp.src(PATHS.head)
    .pipe($.concat('head.js'))
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

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  return gulp.src('src/assets/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer())
    // Comment in the pipe below to run UnCSS in production
    //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/css'))
}

//this is only for compiling the app (non react) javascript
let simpleWebpackConfig = {
  externals: {
      // enable jQuery as an external script to use in imports
      jquery: "jQuery"
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { 
         NODE_ENV: JSON.stringify(ENV),
       }
    })
  ],
}

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  return gulp.src(PATHS.javascript)
    //this makes sure the output js file isn't hashed
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(simpleWebpackConfig, webpack))
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

function rsyncAssets(done) {
  // gutil.log("rsync assets...");
  // let cmd1 = '/usr/bin/rsync -arv --exclude "*.html"  -e "ssh -i $HOME/.ssh/id_rsa_reifwinery -p 52802" ' + 
  // PATHS.dist + '/' + ' reifwinery@159.203.37.121:' + PATHS.distServer
  // exec(cmd1, function(error, stdout, stderr) { 
  //   console.log(stdout);
  //   console.log(stderr);
  //   done();
  // });
}

function rsyncTemplates(done) {
  // let cmd2 = '/usr/bin/rsync -arv  -e "ssh -i $HOME/.ssh/id_rsa_reifwinery -p 52802" ' + 
  // PATHS.eeTemplates + '/' + ' reifwinery@159.203.37.121:' + PATHS.eeTemplatesServer;
  // exec(cmd2, function(error, stdout, stderr) { 
  //   console.log(stdout);
  //   console.log(stderr);
  //   done();
  // });
}

//watch for html page changes
function watch() {
  gulp.watch(PATHS.media, media);
  gulp.watch(PATHS.favicons, favicons);
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(sass));
  gulp.watch('src/assets/js/app/**/*.js').on('all', gulp.series(javascript));
  gulp.watch('src/assets/js/vendor/**/*.js').on('all', gulp.series(vendorJavascript));
  gulp.watch('src/assets/js/head/**/*.js').on('all', gulp.series(headJavascript));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images));
}

function watchPages() {
  gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages));
  gulp.watch('src/{layouts,partials}/**/*.html').on('all', 
  gulp.series(resetPages, pages));
}

// Watch for changes to static assets, and ee templates then rsync
function watchProduction() {
  //watch assets
  //gulp.watch('src/pages/**/*.html').on('all', gulp.series(pages, rsyncTemplates)); 
  gulp.watch(PATHS.media, media);
  gulp.watch('src/assets/scss/**/*.scss').on('all', gulp.series(sass, rsyncAssets));
  gulp.watch('src/assets/js/app/**/*.js').on('all', gulp.series(javascript, rsyncAssets));
  gulp.watch('src/assets/js/vendor/**/*.js').on('all', gulp.series(vendorJavascript, rsyncAssets));
  gulp.watch('src/assets/js/head/**/*.js').on('all', gulp.series(headJavascript, rsyncAssets));
  gulp.watch('src/assets/img/**/*').on('all', gulp.series(images, rsyncAssets));
}
