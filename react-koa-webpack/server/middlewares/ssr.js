import React from 'react';
import { renderToString } from 'react-dom/server';
import {createMemoryHistory } from 'react-router';
import config from '../../config';
import App from '../../src';

const middleware = () => async (ctx, next) => {
  if (!config.ssr) {
    return await next();
  }
  const req = ctx.request;
  const preloadedState = {};
  const memoryHistory = createMemoryHistory(ctx.url);
  const view = renderToString(<App defaultState={preloadedState} historyStore={memoryHistory} context={ctx}/>);
  ctx.state.pageContent = view;
  return await next();
}


export default middleware;
