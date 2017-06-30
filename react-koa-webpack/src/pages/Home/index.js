import React, {Component, PropTypes} from 'react';
import cssModule from 'react-css-modules';

import style from './style.css';

class Home extends Component{
  static propTypes = {
  }

  constructor(props){
    super(props);
  }

  render(){
    return (<div>Home</div>);
  }
}

export default cssModule(Home, style, { allowMultiple: true, errorWhenNotFound: false });
