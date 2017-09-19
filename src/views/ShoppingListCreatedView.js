import React from 'react';

import ShoppingList from '../components/ShoppingList';
import CopyForm from '../components/CopyForm';

class ShoppingListCreatedView extends React.Component {
  render() {
    return (
      <div>
        <ShoppingList />
        <CopyForm />
      </div>
    );
  }
}

export default ShoppingListCreatedView;