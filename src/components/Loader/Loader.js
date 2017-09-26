import React from 'react';

class Loader extends React.Component {
  render() {
    if (this.props.showLoader) {
      return (
        <div>
          <div className="loader"></div>
          <div className="overlay"></div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Loader;