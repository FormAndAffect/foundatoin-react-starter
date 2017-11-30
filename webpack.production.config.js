// import fs from 'fs';
// import yaml from 'js-yaml';
const fs = require('fs');
const yaml = require('js-yaml')

const absPath = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')


//Load settings from settings.yml
const { PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

//define packages, each string is name of package to include in vendor files
//that don't update very often
const VENDOR_LIBS = [ 
"foundation-sites",
"react",
"react-dom",
"react-redux",
"react-router-dom",
"react-router-redux",
"react-transition-group",
"redux",
"redux-form",
"redux-thunk",
"what-input"
 ]

module.exports = {
  //split up the entries
  entry: {
    react: './src/react-app/app.js',
    modules: VENDOR_LIBS
  },
  output: {
    path: absPath.resolve(__dirname, PATHS.dist + '/assets/js'),
    //location of bundle in relation to index.html
    publicPath: '/assets/js/',
    //output is: react.<hash>.js and modules.<hash>.js (hash to let know if file changed)
    filename: '[name].[chunkhash].js'
  },
  module: {
    // rules for modules (configure loaders, parser options, etc.)
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loaders: 'babel-loader',
        // options: { presets: ["react", "es2015"] },
        // exclude: absPath.resolve(__dirname, "node_modules")
        include: [
                    absPath.resolve(__dirname, "src/react-app"),
                    absPath.resolve(__dirname, 'node_modules/foundation-sites'),
                  ]
      }
    ]
  },
  externals: {
      // enable jQuery as an external script to use in imports
      jquery: "jQuery"
  },
  resolve: {
    // how imports are resolved, example import 'my-module' = import 'my-module.js'
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { 
         NODE_ENV: JSON.stringify("production"),
         TEST_VAR: JSON.stringify('http://yougotit')
       }
    }),
    //look at the total output of imports and pull out any duplicates to only
    //include in the 'modules[hash].js' bundle. Create a manifest.js file to let browser know if vendor file actually got changed
    new webpack.optimize.CommonsChunkPlugin({
      names: ['modules', 'manifest']
    }),
    new HtmlWebpackPlugin({
      //the template file to use
      template: './src/react-app/index.html',
      //two steps out of the bundle directory
      filename: '../../index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            // don't optimize comparisons or 
            //will cause error with mapbox
            comparisons: false,  
        },
    }),
    new webpack.ProvidePlugin({
      //for promises to work for ie11
      Promise: 'es6-promise-promise',
    }),
  ],
};