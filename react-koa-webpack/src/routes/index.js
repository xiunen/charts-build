// import Home from '@pages/Home';
//
// const routes = () => {
//   return {
//     path: '/',
//     component: Home,
//     // indexRoute: homeRouter(),
//     childRoutes: [
//
//     ]
//   }
// }
//
// export default routes

import {Router, Route} from 'react-router';
import Home from '@pages/Home';

const Routers = (props)=>{
  const {history} = props;
  return (
    <Router history={history}>
      <Route path='/' component={Home}/>
    </Router>
  )
}

export default Routers;
