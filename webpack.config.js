'use strict';

var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: '[name].js',
  },
  output: {
    path: path.resolve(__dirname + './build'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.css$/, loader: 'style!css!autoprefixer'},
      {test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
      {test: /\.(html|tpl)$/, loader: 'html-loader'},
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'},
    ],
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime'],
  },
  resolve: {
    alias: {
      filter: path.join(__dirname, './src/filters'),
      components: path.join(__dirname, './src/components'),
    },
  },
  // 开启 source-map，webpack 有多种 source-map，在官网文档可以查到
  devtool: 'eval-source-map',
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }), new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }), new webpack.optimize.OccurenceOrderPlugin()];
} else {
  module.exports.devtool = '#inline-eval-cheap-source-map';
}
