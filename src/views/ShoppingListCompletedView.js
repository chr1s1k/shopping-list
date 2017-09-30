import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as shoppingListActions from '../actions/ShoppingListActions';

class ShoppingListCompletedView extends React.Component {

  componentDidMount() {
    this.props.removeAllItems();
  }

  render() {
    return (
      <div>
        <div className="alert alert-success" role="alert">
          <p>Díky, že používáš tuhle aplikaci! <i className="glyphicon glyphicon-heart"></i></p>
          <p>Jestli nevíš co dál, můžeš si napsat vlastní nákup ;)</p>
        </div>
        <div className="action-zone form-group">
          <Link to="/" className="btn btn-primary btn-lg btn-block-xxs">Napsat vlastní nákup</Link>
        </div>
      </div>
    );
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

const shoppingListCompletedView = connect(mapStateToProps, mapDispatchToProps);

export default shoppingListCompletedView(ShoppingListCompletedView);