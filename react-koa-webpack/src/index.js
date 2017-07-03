import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import getStore from '@store';
import Home from '@pages/Home';
import Category from '@pages/Category';
import Layout from '@pages';

const App = (props)=>{
  const {defaultState} = props;
  const store = getStore(defaultState);
  const history = syncHistoryWithStore(browserHistory, store)
  return (
    <Layout>
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={Home}/>
          <Route path='/category' component={Category}/>
        </Router>
      </Provider>
    </Layout>
  );
}

export default App;
