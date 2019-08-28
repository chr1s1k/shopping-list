import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import persistState, { mergePersistedState } from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import filter from 'redux-localstorage-filter'

import ShoppingListReducer from './reducers/ShoppingListReducer'

import App from './components/App/App'

const state = {
	slid: null,
	items: [],
	isLoading: true,
	hasErrored: false
}

const reducer = compose(mergePersistedState())(ShoppingListReducer)

// jaky objekt se ma ukladat do storage
const storage = compose(filter(['slid', 'items']))(
	adapter(window.localStorage)
)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// vytvori store s uvodnim stavem a moznosti prohlizet store pomoci devtools
const store = createStore(
	reducer,
	state,
	composeEnhancers(
		applyMiddleware(thunk),
		persistState(storage, 'ShoppingListStorage')
	)
)

// Provider zpristupni store App komponente
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('app-root')
)
