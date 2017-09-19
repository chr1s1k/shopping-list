import React from 'react';

class CopyForm extends React.Component {
  render() {
    return (
      <p>Nyní už jen stačí zkopírovat adresu nákupu a někomu poslat!</p>
      <div className="action-zone form-group">
        <div className="input-group">
          <input type="text" name="shoppingListUrl" id="shoppingListUrl" className="form-control" value="/shopping-list-gui/public/" readonly="">
          <span className="input-group-btn">
            <button className="btn btn-primary" id="copyListUrlBtn" data-clipboard-target="#shoppingListUrl">Zkopírovat</button>
          </span>
        </div>
        <a href="" className="btn btn-link btn-block-xxs">Začít znova</a>
      </div>
    );
  }
}

export default CopyForm;