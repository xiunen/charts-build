import Koa from 'koa';
import proxy from 'koa-proxy';

import router from './routes';
import config from'../config';
import logger from'./middlewares/logger';

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

export default app;
