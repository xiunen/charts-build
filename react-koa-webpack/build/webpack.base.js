const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../config');
const webpack = require('webpack');

const webpackConfig = {
  context: path.resolve(__dirname, '../'),
  entry: {
    common: [
      'react',
      'redux',
      'react-redux',
      'react-dom',
      'react-router',
      'react-css-modules',
      'react-router-redux'
    ],
    app: './client/index.js',
  },
  output: {
     path: path.join(__dirname, '/../', config.distPath),
     filename: '[name].js'
  },
  resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@actions': path.resolve('src/components'),
        '@components': path.resolve('src/components'),
        '@constant': path.resolve('src/constants'),
        '@pages': path.resolve('src/pages'),
        '@reducers': path.resolve('src/reducers'),
        '@routes': path.resolve('src/routes'),
        '@store':  path.resolve('src/store'),
        '@utils': path.resolve('utils')
      }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name:'common'}),
    new ExtractTextPlugin( {filename: "[name].css",
      allChunks: true,
    })
  ],

  module: {
      loaders: [
          {
            test: /\.js|jsx$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
          },
          {
            test: /\.css|scss$/,
            loader: ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader:'css-loader?minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
              + '!postcss-loader'
              }
            )
          }
      ]
  }
};

module.exports = webpackConfig;
