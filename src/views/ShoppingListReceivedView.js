import React from 'react';
import axios from 'axios';

import ShoppingList from '../components/ShoppingList';
import DoneForm from '../components/DoneForm';

class ShoppingListReceivedView extends React.Component {
  constructor() {
    super();

    this.state = {
      itemsFetched: false,
      items: []
    };
  }

  componentDidMount() {
    if (this.props.match.params.id !== undefined) {
      const id = this.props.match.params.id,
        that = this;

      // perform request to get shopping list by ID
      axios.get('http://localhost/shopping-list/public/api/shopping-list/get.php?id=' + id)
        .then(function (response) {
          that.setState({
            items: response.data.items,
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
    const {items, itemsFetched} = this.state;

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
          <DoneForm />
        </div>
      );
    } else {
      return (
        <div className="loader"><span className="sr-only">Načítám...</span></div>
      );
    }
  }
}

export default ShoppingListReceivedView;