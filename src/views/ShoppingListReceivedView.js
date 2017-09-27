import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ShoppingList from '../components/ShoppingList/ShoppingList';
import DoneForm from '../components/Forms/DoneForm';
import { api } from '../config/api';

import * as shoppingListActions from '../actions/ShoppingListActions';

class ShoppingListReceivedView extends React.Component {
  constructor() {
    super();

    this.state = {
      itemsFetched: false
    };
  }

  componentDidMount() {
    if (this.props.match.params.id !== undefined) {
      const id = this.props.match.params.id,
        that = this;

      // perform request to get shopping list by ID
      axios.get(api.getUrl + id)
        .then(function (response) {
          that.props.setItems(response.data.items);
          that.setState({
            itemsFetched: true,
          });
        })
        .catch(function (error) {
          that.setState({
            itemsFetched: true
          });
      });
    } else {
      this.setState({
        itemsFetched: true
      });
    }
  }

  render() {
    const { itemsFetched } = this.state;
    const { items } = this.props;

    if (itemsFetched) {
      if (!items.length > 0) {
        return (
          <div className="alert alert-danger">
            <p className="text-center">Nákupní seznam se nepodařilo načíst nebo neexistuje.</p>
          </div>
        );
      }

      return (
        <div>
          <ShoppingList items={items}
                        listEditable={true} />
          <DoneForm removeAllItems={this.props.removeAllItems} />
        </div>
      );
    } else {
      return (
        <div className="loader"><span className="sr-only">Načítám...</span></div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(shoppingListActions, dispatch);
}

const shoppingListReceivedView = connect(mapStateToProps, mapDispatchToProps);

export default shoppingListReceivedView(ShoppingListReceivedView);