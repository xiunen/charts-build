import config from '../../config';

const getApi = url => config.apiHost + url;


const middleware = () => async (ctx, next) => {
  if (!config.ssr) {
    return await next();
  }
  //blabla...
  return await next();
};

export default middleware;
