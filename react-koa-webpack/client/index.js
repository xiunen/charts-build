import React from 'react';
import {render} from 'react-dom';
import App from '../src';

const roolEl = document.getElementById('app');
const defaultState = window.preloadedState;

render(<App defaultState={defaultState}/>, roolEl);
