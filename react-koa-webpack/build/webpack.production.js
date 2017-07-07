const baseConfig = require('./webpack.base');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../config');
const webpack = require('webpack');

const webpackConfig = {
  output: {
    path: path.join(__dirname, '/../', config.distPath),
    filename: '[name]-[chunkhash:8].js',
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: '[name]-[chunkhash:8].js' }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin({ filename: '[name]-[contenthash:8].css',
      allChunks: true,
    }),
  ],
};

module.exports = Object.assign({}, baseConfig, webpackConfig);
