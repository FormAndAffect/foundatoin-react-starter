// import fs from 'fs';
// import yaml from 'js-yaml';
const fs = require('fs');
const yaml = require('js-yaml')

const absPath = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

//Load settings from settings.yml
const { PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

console.log('path: ', absPath.resolve(__dirname, PATHS.dist + '/index.html'))

module.exports = {
  //split up the entries
  entry: {
    react: './src/react-app/app.js'
  },
  output: {
    path: absPath.resolve(__dirname, PATHS.dist + '/assets/js'),
    //location of bundle in relation to index.html
    publicPath: '/assets/js/',
    filename: 'react.js'
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
         NODE_ENV: JSON.stringify("development"),
         // DEV_SERVER_SCRIPT: JSON.stringify('dev-server-script')
       }
    }),
    new HtmlWebpackPlugin({
      //the template file to use
      template: './src/react-app/index.html',
      //two steps out of the bundle directory
      filename: '../../index.html',
      inject: 'dev-server-script',
      // environment: process.env.DEV_SERVER_SCRIPT
    }),
    new webpack.ProvidePlugin({
      //for promises to work for ie11
      Promise: 'es6-promise-promise',
    }),
    // new BundleAnalyzerPlugin({
    //     analyzerMode: 'static'
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //         warnings: false,
    //         // don't optimize comparisons or 
    //         //will cause error with mapbox
    //         comparisons: false,  
    //     },
    // }),
  ],
  devServer: {
    //use the below to serve index.html in place of any 404s
    //historyApiFallback: true,
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
    //location of index.html file
    contentBase: absPath.resolve(__dirname, PATHS.dist),
    hot: true,
    //location of bundle in relation to index.html (to enable serve from memory)
    publicPath: '/assets/js/',
  },
  devtool: "source-map",
  // devtool: "eval",
};
