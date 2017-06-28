const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
     path: path.join(__dirname, '/../dist'),
     filename: 'bundle.js'
  },
  resolve: {
      extensions: ['', '.js', '.jsx']
  },
  module: {
      loaders: [
          { test: /\.js|jsx$/, loaders: ['babel'] }
      ]
  }
};

module.exports = config;
