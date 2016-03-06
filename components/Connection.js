import React, { PropTypes } from 'react'

var Connection = React.createClass({
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
      <button onClick={this.props.onClick}>Connect</button>
    </div>;
  }
});

Connection.propTypes = {
  connection: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Connection;
