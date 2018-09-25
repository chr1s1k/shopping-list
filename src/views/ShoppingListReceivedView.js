import React from 'react';
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
      const requestedSlid = this.props.match.params.slid;
      const { items, slid } = this.props;

			// pokud je parametr slid dostupný z localstorage a odpovídá tomu, který přišel v URL a máme dostupné nějaké položky, tak se není potřeba dotazovat API a načti položky z localstorage
			if (slid !== undefined && slid === requestedSlid && items.length) {
				this.props.setLoading(false);
      } else {
				this.props.getItems(api.getUrl + requestedSlid);
      }
    } else {
			this.props.setItems([]); // pokud chybi SLID, nastav prazdne pole items
			this.props.errored(true)
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
          <DoneForm items={items} />
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
		slid: state.slid,
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