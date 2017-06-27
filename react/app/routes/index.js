const Router = require('koa-router');
const router = Router();

const homeController = require('../controllers');

router.get('/', homeController.index);

module.exports = function routes(app) {
  app.use(router.routes()).use(router.allowedMethods());
}
