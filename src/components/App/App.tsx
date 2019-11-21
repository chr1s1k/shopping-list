import React from 'react'
import { Route, Switch } from 'react-router-dom'

import ShoppingListReceivedView from '../../views/ShoppingListReceivedView'
import PageNotFoundView from '../../views/PageNotFoundView'
import ShoppingListCompletedView from '../../views/ShoppingListCompletedView'
import Form from '../Forms/Form'

const App: React.FC = () => (
	<div>
		<Switch>
			<Route exact path="/" component={Form} />
			<Route exact path="/nakup/:slid" component={ShoppingListReceivedView} />
			<Route path="/nakup" component={ShoppingListReceivedView} />
			<Route path="/diky" component={ShoppingListCompletedView} />
			<Route component={PageNotFoundView} />
		</Switch>
	</div>
)

export default App
