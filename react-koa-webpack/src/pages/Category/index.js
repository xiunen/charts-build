import React, {Component, PropTypes} from 'react';
import cssModule from 'react-css-modules';

import style from './style.css';

class Category extends Component{
  static propTypes = {
  }

  constructor(props){
    super(props);
  }

  render(){
    return (<div>Category</div>);
  }
}

export default cssModule(Category, style, { allowMultiple: true, errorWhenNotFound: false });
