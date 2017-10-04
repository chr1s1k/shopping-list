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
    if (this.props.match.params.slid !== undefined) {
      const slid = this.props.match.params.slid,
        that = this;

      // perform request to get shopping list by SLID
      axios.get(api.getUrl + slid)
        .then(function (response) {
          let items = [];

          response.data.items.map((item, index) => {
            return items.push({
              value: item,
              active: true
            });
          });

          that.props.setItems(items);
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
                        listEditable={true}
                        toggleActive={this.props.toggleActive} />
          <DoneForm removeAllItems={this.props.removeAllItems}
                    items={items} />
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