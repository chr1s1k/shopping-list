import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ShoppingListReducer from './reducers/ShoppingListReducer';

import App from './components/App/App';

const state = {};
const store = createStore(ShoppingListReducer, state);

// Provider zpristupni store App komponente
ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ), document.getElementById('app-root')
);