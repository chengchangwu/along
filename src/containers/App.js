import React, { Component } from 'react'
import { connect } from 'react-redux'
import Editor from '../components/Editor'
import 'brace/mode/forth'
import 'brace/theme/github'
import Connection from '../components/Connection'
import Repl from '../components/Repl'
import '../../assets/style.css'
import { replFocus, replDefocus, replChange, replKeyDown, replKeyUp, replEnter,
  replOutput,
  connectWs, setUrl } from '../actions'


var App = React.createClass({
  handleReplEnter: function(text) {
    this.props.onReplEnter();
    this.props.onReplOutput(this.props.input.text);
    var socket = this.props.connection.socket;
    if((socket != null) && (socket.readyState == WebSocket.OPEN)) {
      socket.send(this.props.input.text);
    }
  },
  render: function() {
    return(
      <div onClick={this.props.onReplClickOutside}>
        <Editor name="editor" mode="forth" theme="github" />
        <hr/>
        <Connection connection={this.props.connection}
          onConnect={this.props.onConnect} onChange={this.props.setUrl}/>
        <hr/>
        <Repl input={this.props.input} output={this.props.output} focus={this.props.focus.focus}
          onClick={this.props.onReplClick} onChange={this.props.onReplChange}
          onKeyDown={this.props.onReplKeyDown}
          onKeyUp={this.props.onReplKeyUp} onEnter={this.handleReplEnter} />
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    onReplClick: (event) => {
      // Note: event.stopPropagation may not be a good solution. Google
      // 'react click outside' for better solutions.
      event.stopPropagation();
      dispatch(replFocus())
    },
    onReplClickOutside: () => {
      dispatch(replDefocus())
    },
    onReplChange: (value, cursorX) => {
      dispatch(replChange(value, cursorX))
    },
    onReplKeyDown: (keyCode) => {
      dispatch(replKeyDown(keyCode))
    },
    onReplKeyUp: (cursorX) => {
      dispatch(replKeyUp(cursorX))
    },
    onReplEnter: () => {
      dispatch(replEnter());
    },
    onReplOutput: (text) => {
      dispatch(replOutput(text));
    },
    onConnect: (url) => {
      var socket = new WebSocket(url);
      socket.onopen = function(ev) {};
      socket.onclose = function(ev) {};
      socket.onerror = function(ev) {};
      socket.onmessage = function(ev) {
        dispatch(replOutput(ev.data));
      };
      dispatch(connectWs(socket))
    },
    setUrl: (url) => {
      dispatch(setUrl(url))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
