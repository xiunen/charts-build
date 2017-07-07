import React, { Component, PropTypes } from 'react';
import cssModule from 'react-css-modules';

import style from './style.css';

class Dropdown extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);
    console.log('i am constructor');
  }

  render() {
    return (
      <div styleName="dropdown">
        dropdown content
      </div>
    );
  }
}

export default cssModule(Dropdown, style, { allowMultiple: true, errorWhenNotFound: false });
