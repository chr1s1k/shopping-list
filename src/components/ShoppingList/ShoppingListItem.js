import React from 'react';
import PropTypes from 'prop-types';

class ShoppingListItem extends React.Component {
  constructor() {
    super();

    this.state = {
      isActive: true
    };

    this.handleOnClick = this.handleOnClick.bind(this);
    this.changeItemState = this.changeItemState.bind(this);
  }

  handleOnClick(event) {
    event.preventDefault();
    const {index} = this.props; // to same jako const index = this.props.index;
    this.props.handleOnClick(index);
  }

  changeItemState(event) {
    event.preventDefault();
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }));
  }

  render() {
    const {value, readOnly, editable} = this.props;
    const isActive = this.state.isActive;

    if (readOnly !== undefined && !readOnly) {
      return (
        <a href="" className="list-group-item" title="Odstranit položku" onClick={this.handleOnClick}>{value} <i className="glyphicon glyphicon-remove icon-remove" aria-hidden="true"></i></a>
     );
    } else if (editable) {
      return (
        <a href="" className={"list-group-item item-" + (isActive ? 'active' : 'inactive')} onClick={this.changeItemState}>
          <span>{value}</span>
          <i className="glyphicon glyphicon-ok icon-done" aria-hidden="true"></i>
        </a>
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