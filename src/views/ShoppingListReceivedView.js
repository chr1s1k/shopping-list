import React from 'react';
//import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ShoppingList from '../components/ShoppingList/ShoppingList';
import DoneForm from '../components/Forms/DoneForm';
import Message from '../components/Messages/Message';
import { api } from '../config/api';

import * as shoppingListActions from '../actions/ShoppingListActions';

class ShoppingListReceivedView extends React.Component {

  componentDidMount() {
    if (this.props.match.params.slid !== undefined) {
      const slid = this.props.match.params.slid;
      const { items } = this.props;

      // pokud jsme polozky nacetli z localstorage, tak neni potreba se dotazovat API
      if (!items.length > 0) {
        this.props.getItems(api.getUrl + slid);
      } else {
        this.props.setLoading(false);
      }
    } else {
      this.props.setItems([]); // pokud chybi SLID, nastav prazdne pole items
    }
  }

  render() {
    const { items, isLoading, hasErrored } = this.props;

    if (hasErrored) {
      return (
        <Message type="danger" text="Nákupní seznam se nepodařilo načíst nebo neexistuje." />
      );
    }

    if (isLoading) {
      return (
        <div className="loader"><span className="sr-only">Načítám...</span></div>
      );

    } else {
      if (!items.length > 0) {
        return (
          <Message type="danger" text="Nákupní seznam se nepodařilo načíst nebo neexistuje." />
        );
      }

      return (
        <div>
          <ShoppingList items={items}
                        listEditable={true}
                        toggleActive={this.props.toggleActive} />
          <DoneForm removeAllItems={this.props.removeAllItems}
                    items={items} />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    isLoading: state.isLoading,
    hasErrored: state.hasErrored
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(shoppingListActions, dispatch);
}

const shoppingListReceivedView = connect(mapStateToProps, mapDispatchToProps);

export default shoppingListReceivedView(ShoppingListReceivedView);