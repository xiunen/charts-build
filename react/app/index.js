const Koa = require('koa');

const router = require('./routes');
const config = require('./config')

const app = new Koa();
const port = config.port || process.env.PORT || 8080;

router(app);
app.listen(port, ()=>{
  console.log('server started port %s', port);
})

module.exports = app;
