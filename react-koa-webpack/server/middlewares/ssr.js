import React from 'react';
import { renderToString } from 'react-dom/server';
import {createMemoryHistory, match } from 'react-router';
import config from '../../config';
import App from '../../src';
import getStore from '../../src/store';

const middleware = () => async (ctx, next) => {
  if (!config.ssr) {
    return await next();
  }
  const req = ctx.request;
  const memoryHistory = createMemoryHistory(ctx.url);
  const store = getStore({});
  const preloadedState = store.getState();

  const view = <App defaultState={preloadedState} history={memoryHistory}/>;

  ctx.state.preloadedState = preloadedState;
  ctx.state.pageContent = renderToString(view);
  return await next();
}


export default middleware;
