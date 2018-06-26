const webpack = require('webpack');
const path = require('path');

const parentDir = path.join(__dirname, '../');

module.exports = {
  // define js entry point i.e. what will be loaded by our base template directly
  entry: [
    path.join(parentDir, 'main.js'),
  ],
  module: {
    rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader', // turn all .js and jsx files that are not in node_modules into the more compatible es5
    }, {
      test: /\.(css|scss)$/,
      loaders: [
        'style-loader', // creates style nodes from JS strings
        'css-loader', // translates CSS into CommonJS
        'sass-loader', // compiles Sass to CSS
      ],
    }],
  },
  // defines where all our js will be bundled for use by react
  output: {
    path: path.join(parentDir, 'build'),
    filename: 'main.bundle.js',
  },
  devServer: {
    contentBase: parentDir,
    historyApiFallback: true,
  },
};
