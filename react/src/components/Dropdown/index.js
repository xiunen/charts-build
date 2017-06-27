import React, {Component, PropTypes} from 'react';
import cssModule from 'react-css-modules';

import style from './style.css';

class Dropdown extends Component{
  static propTypes = {
  }

  constructor(props){
    super(props);
  }

  render(){
    return (<div>...</div>);
  }
}

export default cssModule(Dropdown, style, { allowMultiple: true, errorWhenNotFound: false });
