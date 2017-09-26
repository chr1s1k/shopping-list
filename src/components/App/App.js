import React from 'react';
import { Route, Switch } from 'react-router-dom';

import IndexView from '../../views/IndexView';
import ShoppingListReceivedView from '../../views/ShoppingListReceivedView';
import PageNotFoundView from '../../views/PageNotFoundView';
import ShoppingListCompletedView from '../../views/ShoppingListCompletedView';

class App extends React.Component {

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={IndexView} />
          <Route exact path='/nakup/:id' component={ShoppingListReceivedView} />
          <Route path='/nakup' component={ShoppingListReceivedView} />
          <Route path='/diky' component={ShoppingListCompletedView} />
          <Route component={PageNotFoundView} />
        </Switch>
      </div>
    );
  }
}

export default App;