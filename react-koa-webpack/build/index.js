const webpack = require('webpack');

const env = process.env.NODE_ENV;

const config = require(`./webpack.${env}.js`);

console.log(config);

webpack(config)
