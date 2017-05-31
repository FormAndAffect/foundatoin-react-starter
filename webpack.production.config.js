import fs from 'fs';
import yaml from 'js-yaml';
// import webpack from 'webpack';

const absPath = require('path');
const webpack = require('webpack');

//Load settings from settings.yml
const { PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}


module.exports = {

      

      //context: __dirname,
      //configuration
      entry: './src/react-app/app.js',
      output: {
        // options related to how webpack emits results

        path: absPath.resolve(__dirname, PATHS.dist + '/assets/js'), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)

        //publicPath: './assets/',

        filename: "react.js", // string
        // the filename template for entry chunks

        //publicPath: "dist/", // string
        // // the url to the output directory resolved relative to the HTML page

      },
      // watch: true,
      module: {
        // rules for modules (configure loaders, parser options, etc.)
        rules: [
          {
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
          }
        ]
      },
      //just need this to concat to it in gulpfile
      // plugins: [],
      // plugins: [['transform-es2015-classes', {loose: true}]],
      //https://github.com/babel/babel/issues/3041
      plugins:[
      
      //   new webpack.DefinePlugin({
      //     'process.env':{
      //       'NODE_ENV': process.env.NODE_ENV
      //     }
      //   }),

        new webpack.DefinePlugin({
          "process.env": { 
             NODE_ENV: JSON.stringify("production") 
           }
        }),

        new webpack.optimize.UglifyJsPlugin({
          compress:{
            warnings: true
          }
        })
      ],

      devtool: "source-map",

      // devServer: {
      //   contentBase: absPath.resolve(__dirname, "dist"),
      //   compress: true,
      //   port: 8080,
      //   hot: true
      // },

      watch: true,


}