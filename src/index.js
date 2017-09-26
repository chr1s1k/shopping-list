import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ShoppingListReducer from './reducers/ShoppingListReducer';

import App from './components/App/App';

const state = {
  items: []
};

// vytvori store s uvodnim stavem a moznosti prohlizet store pomoci devtools
const store = createStore(ShoppingListReducer, state, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Provider zpristupni store App komponente
ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ), document.getElementById('app-root')
);