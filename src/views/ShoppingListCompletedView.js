import React from 'react';
import { Link } from 'react-router-dom';

class ShoppingListCompletedView extends React.Component {
  render() {
    return (
      <div>
        <div className="alert alert-success" role="alert">
          <p>Díky, že používáš tuhle aplikaci! <i className="glyphicon glyphicon-heart"></i></p>
          <p>Jestli nevíš co dál, můžeš si napsat vlastní nákup ;)</p>
        </div>
        <div className="action-zone form-group">
          <Link to="/" className="btn btn-primary btn-block-xxs">Napsat vlastní nákup</Link>
        </div>
      </div>
    );
  }
}

export default ShoppingListCompletedView;