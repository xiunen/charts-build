import React, {Component, PropTypes} from 'react';
import cssModule from 'react-css-modules';

import style from './style.css';

class App extends Component{
  static propTypes = {
  }

  constructor(props){
    super(props);
  }

  render(){
    const {children} = this.props;

    return (
      <div>
        <header>
          <h1>This is my app</h1>
        </header>
        {children}
      </div>
    );
  }
}

export default cssModule(App, style, { allowMultiple: true, errorWhenNotFound: false });
