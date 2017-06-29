const webpack = require('webpack');

const env = process.env.NODE_ENV;

const config = require(`./webpack.${env}.js`);

// console.log(config);

const result = webpack(config, (error, status)=>{
  if (error) {
    console.error(error);
  }else{
    if(status.compilation.errors.length){
      console.log(status.compilation.errors);
    }else{
      console.log(Object.keys(status.compilation.assets));
    }
  }
})
