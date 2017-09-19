import React from 'react';

import ShoppingList from './ShoppingList';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      formValue: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSaveList = this.handleSaveList.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.formValue !== '') {
      
    }
  }

  handleSaveList(event) {
    
  }

  handleChange(event) {
    this.setState({
      formValue: event.target.value
    });
  }

  render() {
    return (
      <form action="/" method="get" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="item" className="sr-only">Zadejte, co chcete nakoupit</label>
          <input type="text" name="item" id="item" className="form-control input-lg" placeholder="Co chceš nakoupit?" onChange={this.handleChange} />
        </div>
        <ShoppingList />
        <div className="action-zone form-group">
          <button type="submit" className="btn btn-primary btn-block-xxs" onClick={this.handleSaveList}>Hotovo</button>
          <a href="" className="btn btn-link btn-block-xxs">Začít znova</a>
        </div>
      </form>
    );
  }
}

export default Form;