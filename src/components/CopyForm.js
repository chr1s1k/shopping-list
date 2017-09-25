import React from 'react';
import PropTypes from 'prop-types';

class CopyForm extends React.Component {
  constructor() {
    super();

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event) {
    event.preventDefault();
    this.props.handleCreateNewList();
  }

  render() {
    return (
      <div>
        <div className="alert alert-success" role="alert">
          <p><i className="glyphicon glyphicon-ok"></i> Výborně! Nyní už stačí jen zkopírovat adresu nákupu a někomu poslat!</p>
        </div>
        <div className="action-zone form-group">
          <div className="input-group">
            <span className="input-group-btn">
              <button className="btn btn-primary btn-lg" id="copyListUrlBtn" data-clipboard-target="#shoppingListUrl" tabIndex="1">Zkopírovat</button>
            </span>
            <input type="text" name="shoppingListUrl" id="shoppingListUrl" className="form-control input-lg" value={this.props.listUrl} tabIndex="2" readOnly />
          </div>
          <a href="" className="btn btn-link btn-block-xxs" onClick={this.handleOnClick} role="button">Napsat nový nákup</a>
        </div>
      </div>
    );
  }
}

CopyForm.propTypes = {
  handleCreateNewList: PropTypes.func,
  listUrl: PropTypes.string
};

export default CopyForm;