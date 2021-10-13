const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            
          }
        }
      }
    ]
  }
};

module.exports = config;
