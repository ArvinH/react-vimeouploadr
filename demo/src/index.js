import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './app';

const target = document.querySelector('#demo')

render(
  <Provider store={store}>
    <App />
  </Provider>,
  target
)
