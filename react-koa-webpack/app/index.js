import Koa from 'koa';
import proxy from 'koa-proxy';
import Pug from 'koa-pug';

import router from './routes';
import config from'../config';
import logger from'./middlewares/logger';

const app = new Koa();
const port = config.port || process.env.PORT || 8080;

const pug = new Pug({
  viewPath: './app/views',
  debug: process.env.NODE_ENV==='development',
  pretty: process.env.NODE_ENV==='development',
  locals: {
    meta:{
      title: 'Test',
      keywords: '',
      description: ''
    }
  }
});

app.use(pug.middleware);

app.use(proxy({
  host: 'http://api.example.com',
  match: '^/proxy'
}))

// app.use(views(config.template.path, config.template.options));

app.use(logger())
router(app);
app.listen(port, ()=>{
  console.log('server started port %s', port);
})

export default app;
