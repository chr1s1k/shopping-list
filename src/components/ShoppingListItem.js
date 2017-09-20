import React from 'react';
import PropTypes from 'prop-types';

class ShoppingListItem extends React.Component {
  constructor() {
    super();

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event) {
    event.preventDefault();
    const {index} = this.props; // to same jako const index = this.props.index;
    this.props.handleOnClick(index);
  }

  render() {
    const itemValue = this.props.value;

    return (
      <a href="" className="list-group-item" title="Odstranit položku" onClick={this.handleOnClick}>{itemValue} <i className="glyphicon glyphicon-remove text-primary icon-remove" aria-hidden="true"></i></a>
    );
  }
}

ShoppingListItem.propTypes = {
  value: PropTypes.string,
  handleRemoveItem: PropTypes.func,
  index: PropTypes.number
};

export default ShoppingListItem;