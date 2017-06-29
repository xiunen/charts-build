const webpack = require('webpack');

const env = process.env.NODE_ENV;

const config = require(`./webpack.${env}.js`);

// console.log(config);

webpack(config, (error, status)=>{
  if (error) {
    console.log(error);
  }else{
    console.log(status.compilation.errors);
    console.log(Object.keys(status.compilation.assets));
  }
})
