import React from 'react';

class Message extends React.Component {
  render() {
    return (
      <div className={"alert alert-" + this.props.type} role="alert">
        <p className={this.props.type === 'danger' ? "text-center" : ""}>{this.props.text}</p>
      </div>
    );
  }
}

export default Message;