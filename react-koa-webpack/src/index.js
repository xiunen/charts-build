import React, {Component, PropTypes} from 'react';
import cssModule from 'react-css-modules';

import style from './style.css';

class App extends Component{
  static propTypes = {
    title: PropTypes.string
  }

  constructor(props){
    super(props);
  }

  render(){
    console.log('hello world');
    return (<div styleName="hello">world</div>);
  }
}

// export default App;
export default cssModule(App, style, { allowMultiple: true, errorWhenNotFound: false });
