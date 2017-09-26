import React from 'react';
import PropTypes from 'prop-types';

import ShoppingListItem from './ShoppingListItem';

class ShoppingList extends React.Component {

  render() {
    const items = this.props.items;

    if (items === undefined || !items.length > 0) {
      return null; // v pripade prazdneho pole se tato komponenta ShoppingList vubec nevykresli
    }

    return (
      <div className="list-group list-items">
        {items.map((item, index) =>
          <ShoppingListItem key={index}
                            index={index}
                            value={item}
                            handleOnClick={this.props.handleRemoveItem}
                            readOnly={this.props.listReadOnly}
                            editable={this.props.listEditable} />
        )}
      </div>
    );
  }
}

// prop.items se ocekava jako pole
// prop.handleRemoveItem se ocekava jako funkce
ShoppingList.propTypes = {
  items: PropTypes.array,
  handleRemoveItem: PropTypes.func,
  listReadOnly: PropTypes.bool,
  listEditable: PropTypes.bool
};

export default ShoppingList;