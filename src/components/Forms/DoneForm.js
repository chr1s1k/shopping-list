import React from 'react';
import { Link } from 'react-router-dom';

class DoneForm extends React.Component {
  constructor() {
    super();

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(event) {
    this.props.removeAllItems();
  }

  render() {
    return (
      <div className="action-zone form-group">
        <Link to="/diky" className="btn btn-primary btn-block-xxs" onClick={this.handleOnClick}>Mám nakoupeno</Link>
      </div>
    );
  }
}

export default DoneForm;