import React from 'react';
import {renderToString} from 'react-dom/server';
import {createMemoryHistory, match} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import config from '../../config';
import App from '../../src';
import routes from '../../src/routes';
import getStore from '../../src/store';

const getApi = (url) => {
  return config.apiHost + url;
}

const fetchData = async(ctx)=>{
  const memoryHistory = createMemoryHistory(ctx.url);
  return new Promise((resolve, reject)=>{
    const store = getStore({}, getApi);
    const history = syncHistoryWithStore(memoryHistory, store);
    match({ history,routes}, (error, redirectLocation, renderProps) => {
      if (!renderProps) {
        return;
      }
      const {components} = renderProps;
      const promises = components.filter(component => component).reduce((result, component) => {
        if (typeof component.fetchData === 'function') {
          result = result.concat(component.fetchData(store.dispatch, renderProps.params));
        }
        return result;
      }, []);
      Promise.all(promises).then(()=>{
        resolve({store, history})
      })
    });
  });
}

const middleware = () => async(ctx, next) => {
  if (!config.ssr) {
    return await next();
  }
  const {store, history} = await fetchData(ctx);
  const view = <App store={store} history={history}/>;
  const preloadedState = store.getState();

  ctx.state.pageContent = renderToString(view);
  ctx.state.preloadedState = preloadedState;
  ctx.state.meta = preloadedState.meta;

  return await next();
}

export default middleware;
