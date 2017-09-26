import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Form from '../components/Forms/Form';

import * as shoppingListActions from '../actions/ShoppingListActions';

class IndexView extends React.Component {
  render() {
    const { items, addItem, removeItem } = this.props;

    return (
      <Form items={items} addItem={addItem} removeItem={removeItem} />
    );
  }
}

// mapovani hlavniho stavu na props
function mapStateToProps(state) {
  return {
    items: state.items
  };
}

// mapovani
function mapDispatchToProps(dispatch) {
  return bindActionCreators(shoppingListActions, dispatch);
}

const indexView = connect(mapStateToProps, mapDispatchToProps);

export default indexView(IndexView);