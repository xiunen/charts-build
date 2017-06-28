require('babel-register')({
  plugins: [
    'transform-async-to-generator',
  ],
});

require('babel-polyfill');

const server = require('./app');
