const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('../config');

const webpackConfig = {
  context: path.resolve(__dirname, '../', config.sourcePath),
  entry: {
    app: './index.js',
  },
  output: {
     path: path.join(__dirname, '/../', config.distPath),
     filename: '[name].js'
  },
  resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '@constant': path.resolve('src/constants'),
        '@components': path.resolve('src/components'),
        '@actions': path.resolve('src/components'),
        '@reducers': path.resolve('src/reducers'),
        '@utils': path.resolve('utils')
      }
  },
  plugins: [
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
              loader:
              'css-loader?minimize&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
              + '!postcss-loader'
              }
            )
          }
      ]
  }
};

module.exports = webpackConfig;
