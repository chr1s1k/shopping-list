import React from 'react';
import axios from 'axios';

import ShoppingList from '../ShoppingList/ShoppingList';
import CopyForm from './CopyForm';
import ErrorForm from './ErrorForm';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      formValue: '',
      items: [],
      isFormSubmitted: false,
      listSaved: false,
      listUrl: '/nakup'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSaveList = this.handleSaveList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleStartOver = this.handleStartOver.bind(this);
    this.setFocusOnMainInput = this.setFocusOnMainInput.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.formValue !== '') {
      this.setState(prevState => ({
        items: [...prevState.items, this.state.formValue], // na konec pole prevState.items prida this.state.formValue
        formValue: '' // vyresetuj uzivatelskej vstup
      }));
    }
  }

  handleSaveList(event) {
    const items = this.state.items.join('|'),
      that = this;

    const querystring = require('querystring');

    // axios normalne posila data jako JSON, stringify udela transformace, aby to nasledne slo precist pres $_POST
    axios.post('http://localhost/shopping-list/public/api/shopping-list/create/', querystring.stringify({ items: items }))
    .then(function (response) {
      const newListUrl = response.data.referer + that.state.listUrl + '/' + response.data.id;

      if (response.data.result === "success") {
        that.setState(prevState => ({
          isFormSubmitted: true,
          listSaved: true,
          listUrl: newListUrl
        }));
      } else {
        that.setState({
          isFormSubmitted: true
        });
      }
    })
    .catch(function (error) {
      that.setState({
        isFormSubmitted: true
      });
    });
  }

  handleChange(event) {
    this.setState({
      formValue: event.target.value
    });
  }

  handleRemoveItem(index) {
    this.setState(prevState => ({ // this.setState je asynchronni volani
      items: [
        ...prevState.items.slice(0, index), // na konec pole prevState.items prida polozky 0 az index
        ...prevState.items.slice(index + 1) // a nasledne prida vsechno dal od index+1
      ]
    }), () => {
      if (this.state.items.length === 0) { // pokud odeberu vsechny polozky => nastav focus na hlavni input
        this.setFocusOnMainInput();
      }
    });
  }

  handleStartOver(event) {
    event.preventDefault();
    var reset = window.confirm('Opravdu chceš smazat aktuální seznam a začít znova?');
    if (reset) {
      this.resetForm();
    }
  }

  setFocusOnMainInput() {
    this.mainInput.focus();
  }

  resetForm() {
    this.setState(prevState => ({
      formValue: '',
      items: [],
      isFormSubmitted: false,
      listSaved: false,
      listUrl: '/nakup'
    }), () => {
      this.setFocusOnMainInput();
    });
  }

  render() {
    const isFormSubmitted = this.state.isFormSubmitted;

    if (!isFormSubmitted) { // formular pro vytvoreni seznamu
      return (
        <form action="/" method="get" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="item" className="sr-only">Zadejte, co chcete nakoupit</label>
            <input type="text" name="item" id="item" value={this.state.formValue} className="form-control input-lg" placeholder="Co chceš nakoupit?" tabIndex="1" autoFocus onChange={this.handleChange} ref={(input) => { this.mainInput = input; }} />
          </div>

          <ShoppingList items={this.state.items}
                        handleRemoveItem={this.handleRemoveItem}
                        listReadOnly={this.state.isFormSubmitted} />

          {this.state.items.length > 0 &&
            <div className="action-zone form-group">
              <button type="button" className="btn btn-primary btn-lg btn-block-xxs" tabIndex="2" onClick={this.handleSaveList}>Hotovo</button>
              <a href="" className="btn btn-link btn-block-xxs" tabIndex="3" role="button" onClick={this.handleStartOver}>Začít znova</a>
            </div>
          }
        </form>
      );
    } else { // hotovy seznam + pro formular pro zkopirovani URL seznamu nebo pro opetovne ulozeni
      return (
        <div>
          <ShoppingList items={this.state.items}
                        handleRemoveItem={this.handleRemoveItem}
                        listReadOnly={isFormSubmitted} />
          {this.state.listSaved &&
            <CopyForm handleCreateNewList={this.resetForm}
                      listUrl={this.state.listUrl} />
          }
          {!this.state.listSaved &&
            <ErrorForm handleSaveList={this.handleSaveList}
                       handleStartOver={this.handleStartOver} />
          }
        </div>
      );
    }
  }
}

export default Form;