const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../config');
const webpack = require('webpack');

const webpackConfig = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './client/index.js',
    common: [
      'vue',
      'vue-router'
    ]
  },
  output: {
    path: path.join(__dirname, '/../', config.distPath),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias:{
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {

        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'common' }),
    new ExtractTextPlugin({ filename: '[name].css',
      allChunks: true,
    }),
  ],
};

module.exports = webpackConfig;
