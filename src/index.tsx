import 'core-js/stable'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { composeWithDevTools } from 'redux-devtools-extension'

import ShoppingListReducer from './reducers/ShoppingListReducer'

import App from './components/App/App'

const persistConfig = {
	key: 'ShoppingListStorage',
	whitelist: ['slid', 'items'],
	storage
}

const persistedReducer = persistReducer(persistConfig, ShoppingListReducer)

const enhancer = compose(
	composeWithDevTools(
		applyMiddleware(thunk)
	)
)

// vytvori store s uvodnim stavem a moznosti prohlizet store pomoci devtools
const store = createStore(
	persistedReducer,
	enhancer
)

const persistor = persistStore(store)

// Provider zpristupni store App komponente
ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</PersistGate>
	</Provider>,
	document.getElementById('app-root')
)
