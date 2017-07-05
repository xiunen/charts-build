import React from 'react';
import { renderToString } from 'react-dom/server';
import {createMemoryHistory, match } from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import config from '../../config';
import App from '../../src';
import routes from '../../src/routes';
import getStore from '../../src/store';

const middleware = () => async (ctx, next) => {
  if (!config.ssr) {
    return await next();
  }
  const req = ctx.request;
  const memoryHistory = createMemoryHistory(ctx.url);
  const preloadedState = {}
  const store = getStore(preloadedState);
  const history =syncHistoryWithStore(memoryHistory, store);

  // const result = new Promise((resolve, reject)=>{
    match({history, routes}, (error, redirectLocation, renderProps)=>{
      if(!renderProps) return;
      const {components} = renderProps;
      const promises = components.filter(component=>component).reduce((result, component)=>{
        // console.log(component);
        if(typeof component.fetchData==='function'){
          result = result.concat(component.fetchData(store.dispatch, renderProps.params));
        }
        return result;
      },[]);
      console.log(promises);
      Promise.all(promises)
    });
  // });

  const view = <App store={store} history={history}/>;
  ctx.state.pageContent = renderToString(view);
  ctx.state.preloadedState = store.getState();
  return await next();
}


export default middleware;
