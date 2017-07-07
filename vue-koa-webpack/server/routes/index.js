import Router from 'koa-router';
import homeController from '../controllers';

const router = Router();

router.get('/', homeController.index)
.get('/category', homeController.index)
.get('/api', homeController.getData)
.post('./api', homeController.postData);
const routes = (app) => {
  app.use(router.routes()).use(router.allowedMethods());
}
export default routes;
