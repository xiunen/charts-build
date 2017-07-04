import React, {Component, PropTypes} from 'react';
import {connect}  from 'react-redux';
import {push} from 'react-router-redux';
import cssModule from 'react-css-modules';

import homeActionDescriptor from '../../actions/home';

import style from './style.css';

class Home extends Component{
  static propTypes = {
  }

  constructor(props){
    super(props);
    this.handleLink = this.handleLink.bind(this);
    this.handleCounter = this.handleCounter.bind(this);
    this.handleFetchData = this.handleFetchData.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log('nextProps', nextProps);
  }

  handleLink(){
    const {dispatch} = this.props;
    dispatch(push('/category'))
  }

  handleCounter(){
    const {dispatch} = this.props;
    dispatch(homeActionDescriptor.counter())
  }

  handleFetchData(){
    const {dispatch} = this.props;
    dispatch(homeActionDescriptor.fetchHomeData());
  }

  render(){
    const {counter, data} = this.props;
    return (<div>
        <button onClick={this.handleLink}>Go To Category</button>
        <button onClick={this.handleCounter}>Sync Add Counter</button>
        <button onClick={this.handleFetchData}>Async fetch data</button>
        <div>Counter:{counter}</div>
        <div>fetched data: {JSON.stringify(data)}</div>
      </div>);
  }
}

export default connect(function(store){
  const {home, ...others} = store;
  return {...home, ...others};
})(
  cssModule(Home, style, { allowMultiple: true, errorWhenNotFound: false })
);
