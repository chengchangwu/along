import React, { PropTypes } from 'react'

var Connection = React.createClass({
  handleConnect: function() {
    this.props.onConnect(this.props.connection.url);
  },
  handleChange: function() {
    this.props.onChange(this.input.value);
  },
  render: function() {
    return <div>
      <input
        ref={ (c) => { this.input = c; }}
        placeholder = "URL of Websocket to rtForth"
        value={this.props.connection.url}
        onChange={this.handleChange}
      ></input>
      <button onClick={this.handleConnect}>Connect</button>
    </div>;
  }
});

Connection.propTypes = {
  connection: PropTypes.object.isRequired,
  onConnect: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Connection;
