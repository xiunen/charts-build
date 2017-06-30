import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Routers from '@routes';
import store from '@store';

import style from './style.css';


const history = syncHistoryWithStore(browserHistory, store);

const App = (
  <Provider store={store}>
    <Routers history={history}/>
  </Provider>
);

export default App;
