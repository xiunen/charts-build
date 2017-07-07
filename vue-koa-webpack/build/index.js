const webpack = require('webpack');
const fs = require('fs');
const config = require('../config')

const env = process.env.NODE_ENV;

const wepackConfig = require(`./webpack.${env}.js`);

// console.log(config);

const result = webpack(wepackConfig, (error, status) => {
  if (error) {
    console.error(error);
  } else {
    if (status.compilation.errors.length) {
      console.log(status.compilation.errors);
    } else {
      const assetsNames = Object.keys(status.compilation.assets);
      const assets = assetsNames.reduce((result, item) => {
        if (/\.js$/.test(item)) {
          if(/^common/.test(item)) {
            result.js.unshift(item);
          }else{
            result.js.push(item);
          }
        } else if (/\.css$/.test(item)) {
          result.css.push(item);
        }
        return result;
      }, {
        css: [],
        js: []
      })
      fs.writeFileSync(`${__dirname}/../${config.assetsMap}`, JSON.stringify(assets));
    }
  }
})
