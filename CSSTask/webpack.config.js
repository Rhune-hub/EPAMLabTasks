const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./src/static/index.html"
  }),new MiniCssExtractPlugin(),
new CopyWebpackPlugin({patterns:[
  {
    from: path.resolve(__dirname, './src/static/img'),
    to: 'static/img',
    force:true
  }
]})],
  mode: "development",
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
                loader: MiniCssExtractPlugin.loader,
            },

            "css-loader",
            {
              loader: "sass-loader",
              options: {
                 sassOptions: {
                    indentWidth: 6,
        
                 },
              },
           },
          ],
          
        },
      ],
    },
  };

  module.exports = config;