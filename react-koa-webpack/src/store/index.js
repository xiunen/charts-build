import {combineReducers, createStore} from 'redux';
import { browserHistory } from 'react-router';
import reducers from "@reducers";

import config from '../../config';


const defaultState = typeof window === 'undefined'? {} :(window[config.storeName] || {});

function initStore(preloadedState = {}, history, ctx) {
  const store = createStore(
    combineReducers(reducers),
    preloadedState,
    //enhancers
  );
  return store;
}

const store = initStore(defaultState, browserHistory);

export default store;
