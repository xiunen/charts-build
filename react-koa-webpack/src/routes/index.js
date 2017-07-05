import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Layout from '../pages';
import Home from '../pages/Home';
import Category from '../pages/Category';

const routes = ()=>{
  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}/>
      <Route path='/category' component={Category}/>
    </Route>
  )
}

export default routes();
