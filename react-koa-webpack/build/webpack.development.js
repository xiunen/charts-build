const baseConfig = require('./webpack.base');

const webpackConfig = {
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
};

module.exports = Object.assign({}, baseConfig, webpackConfig);
