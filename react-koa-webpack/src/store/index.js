import {combineReducers, createStore, applyMiddleware} from 'redux';
import { browserHistory } from 'react-router';
import {routerMiddleware} from 'react-router-redux';

import reducers from "../reducers";
import middlewares from './middlewares';
import config from '../../config';

function getStore(preloadedState = {}) {
  const routeMiddlewares = routerMiddleware(browserHistory);
  const customMiddlewares = Object.keys(middlewares).map(key=>middlewares[key]());
  const store = createStore(
    combineReducers(reducers),
    preloadedState,
    applyMiddleware(routeMiddlewares, ...customMiddlewares)
  );
  return store;
}

export default getStore;
