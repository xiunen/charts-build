import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';

import getStore from './store';
// import Layout from './pages';
import routes from './routes';

const App = (props) => {
  const {store, history, state} = props;
  // const store = getStore(preloadedState);
  // const history = syncHistoryWithStore(historyStore, store);

  // state.meta = {title: 'gaoshi'};

  // const result = match({history, routes},(error, redirectLocation, renderProps)=>{
  //   console.log(renderProps);
  // });

  return (
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  );
}

export default App;
