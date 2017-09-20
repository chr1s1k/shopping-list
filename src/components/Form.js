import React from 'react';

import ShoppingList from './ShoppingList';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      formValue: '',
      items: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSaveList = this.handleSaveList.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleStartOver = this.handleStartOver.bind(this);
    this.setFocusOnMainInput = this.setFocusOnMainInput.bind(this);
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
      if (this.state.items.length == 0) { // pokud odeberu vsechny polozky => nastav focus na hlavni input
        this.setFocusOnMainInput();
      }
    });
  }

  handleStartOver(event) {
    event.preventDefault();
    var reset = window.confirm('Opravdu chceš smazat aktuální seznam a začít znova?');
    if (reset) {
      this.setState(prevState => ({
        formValue: '',
        items: []
      }));
      this.setFocusOnMainInput();
    }
  }

  setFocusOnMainInput() {
    this.mainInput.focus();
  }

  render() {
    return (
      <form action="/" method="get" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="item" className="sr-only">Zadejte, co chcete nakoupit</label>
          <input type="text" name="item" id="item" value={this.state.formValue} className="form-control input-lg" placeholder="Co chceš nakoupit?" tabIndex="1" autoFocus onChange={this.handleChange} ref={(input) => { this.mainInput = input; }} />
        </div>

        <ShoppingList items={this.state.items}
                      handleRemoveItem={this.handleRemoveItem} />

        {this.state.items.length > 0 &&
          <div className="action-zone form-group">
            <button type="submit" className="btn btn-primary btn-block-xxs" tabIndex="2" onClick={this.handleSaveList}>Hotovo</button>
            <a href="" className="btn btn-link btn-block-xxs" tabIndex="3" onClick={this.handleStartOver}>Začít znova</a>
          </div>
        }
      </form>
    );
  }
}

export default Form;