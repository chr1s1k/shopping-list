import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import ShoppingListReducer from './reducers/ShoppingListReducer';

import App from './components/App/App';

const state = {
  items: [],
  isLoading: true,
  hasErrored: false
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// vytvori store s uvodnim stavem a moznosti prohlizet store pomoci devtools
const store = createStore(
                ShoppingListReducer,
                state,
                composeEnhancers(applyMiddleware(thunk))
              );

// Provider zpristupni store App komponente
ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  ), document.getElementById('app-root')
);