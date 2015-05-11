'use strict';

let path = require('path');
let webpack = require('webpack');
let HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: {
    fortune: ['./app/application'],
    vendor: ['react'],
    webpack: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.[chunkhash].js',
      minChunks: Infinity
    }),
    new HTMLWebpackPlugin({
      template: 'app/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'app')
    }, {
      test: /\.css$/,
      loaders: ['style', 'css'],
      include: path.join(__dirname, 'app')
    }]
  }
};
