import React from 'react';

import ShoppingList from './ShoppingList';
import CopyForm from './CopyForm';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      formValue: '',
      items: [],
      isFormSubmitted: false
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
    this.setState({
      isFormSubmitted: true
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
      this.setFocusOnMainInput();
    }
  }

  setFocusOnMainInput() {
    this.mainInput.focus();
  }

  resetForm() {
    this.setState(prevState => ({
      formValue: '',
      items: [],
      isFormSubmitted: false
    }));
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
              <a href="" className="btn btn-link btn-block-xxs" tabIndex="3" onClick={this.handleStartOver}>Začít znova</a>
            </div>
          }
        </form>
      );
    } else { // hotovy seznam + pro formular pro zkopirovani URL seznamu
      return (
        <div>
          <ShoppingList items={this.state.items}
                        handleRemoveItem={this.handleRemoveItem}
                        listReadOnly={isFormSubmitted} />
          <CopyForm handleCreateNewList={this.resetForm} />
        </div>
      );
    }
  }
}

export default Form;