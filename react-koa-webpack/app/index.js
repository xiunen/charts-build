const Koa = require('koa');
const proxy = require('koa-proxy');

const router = require('./routes');
const config = require('../config');
const logger = require('./middlewares/logger')

const app = new Koa();
const port = config.port || process.env.PORT || 8080;

app.use(proxy({
  host: 'http://api.example.com',
  match: '^/proxy'
}))

app.use(logger())
router(app);
app.listen(port, ()=>{
  console.log('server started port %s', port);
})

module.exports = app;
