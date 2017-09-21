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
    const {value, readOnly} = this.props;

    if (!readOnly) {
      return (
        <a href="" className="list-group-item" title="Odstranit položku" onClick={this.handleOnClick}>{value} <i className="glyphicon glyphicon-remove icon-remove" aria-hidden="true"></i></a>
     );
    } else {
      return (
        <div className="list-group-item">{value}</div>
      );
    }
  }
}

ShoppingListItem.propTypes = {
  value: PropTypes.string,
  handleOnClick: PropTypes.func,
  index: PropTypes.number,
  readOnly: PropTypes.bool
};

export default ShoppingListItem;