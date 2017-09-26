import React from 'react';
import { Link } from 'react-router-dom';

class DoneForm extends React.Component {
  render() {
    return (
      <div className="action-zone form-group">
        <Link to="/diky" className="btn btn-primary btn-lg btn-block-xxs">Mám nakoupeno</Link>
      </div>
    );
  }
}

export default DoneForm;