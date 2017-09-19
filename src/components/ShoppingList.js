import React from 'react';

import ShoppingListItem from './ShoppingListItem';

class ShoppingList extends React.Component {
  render() {
    return (
      <div className="list-group list-items">
        <ShoppingListItem />
      </div>
    );
  }
}

export default ShoppingList;