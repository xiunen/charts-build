const baseConfig = require('./webpack.base');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    output: {
       path: path.join(__dirname, '/../dist'),
       filename: '[name]-[hash:8].js'
    },

    plugins: [
      new ExtractTextPlugin( {filename: "[name]-[contenthash:8].css",
        allChunks: true,
      })
    ],
};

module.exports = Object.assign({}, baseConfig, config);
