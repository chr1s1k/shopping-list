import React from 'react';

class ShoppingListItem extends React.Component {
  render() {
    return (
      <a href="" className="list-group-item" title="Odstranit položku">rajčata <i className="glyphicon glyphicon-remove text-primary icon-remove" aria-hidden="true"></i></a>
    );
  }
}

export default ShoppingListItem;