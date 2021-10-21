// const webpack = require('webpack');
// const path = require('path');

// const config = {
//   entry: './index.js',//, './apiFunction.js','./apiCategories.js','./apiEntries.js'],
//   output: {
//     path: path.resolve(__dirname, 'bundle'),
//     filename: 'index.js', //'apiFunction.js', 'apiCategories', 'apiEntries.js']
//   },
//   mode: "development",
//   module: {
//     rules: [
//       {
//         test: /\.m?js$/,
//         exclude: /(node_modules|bower_components)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env'],
//             plugins: ["@babel/plugin-syntax-dynamic-import","@babel/plugin-transform-runtime"]            
//           }
//         }
//       }
//     ]
//   }
// };

// module.exports = config;
const webpack = require('webpack');
const path = require('path');

const config = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'index.js'
  },
  mode: 'development'
};

module.exports = config;