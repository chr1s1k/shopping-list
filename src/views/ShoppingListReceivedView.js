import React from 'react';

import ShoppingList from '../components/ShoppingList';
import DoneForm from '../components/DoneForm';

class ShoppingListReceivedView extends React.Component {
  render() {
    return (
      <div>
        <ShoppingList />
        <DoneForm />
      </div>
    );
  }
}

export default ShoppingListReceivedView;