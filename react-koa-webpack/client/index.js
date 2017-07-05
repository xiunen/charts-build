import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import App from '../src';
import getStore from '../src/store';

const roolEl = document.getElementById('app');
const defaultState = window.preloadedState;
const store = getStore(defaultState);
const history = syncHistoryWithStore(browserHistory, store);

render(<App store={store} history={history}/>, roolEl);
