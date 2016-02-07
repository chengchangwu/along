import React, { Component } from 'react'

class ReplTextArea extends Component {
  render() {
    return <textarea className="repl-textarea"
      wrap="off"
      style={{
        opacity: 0,
        border: "none",
        height: "17px",
        width: "8px",
        left: "192px",
        top: "34px",
        resize: "none",
    }}/>;
  }
}

class ReplActiveLine extends Component {
  render() {
    return <div
      className="repl-active-line"
      style={{
        height: "17px",
        top: "34px",
        left: "0",
        right: "0",
    }}/>;
  }
}

class ReplContent extends Component {
  render() {
    return <div className="repl-content">
      <div className="repl-line" style={{
        height: "17px"
      }}>: star 42 emit ;  ok</div>
      <div className="repl-line" style={{
        height: "17px"
      }}>star *  ok</div>
      <div className="repl-line" style={{
        height: "17px"
      }}>: stars 0 do star loop ;</div>
    </div>;
  }
}

class ReplCursor extends Component {
  render() {
    return <div className="repl-cursor"
      style={{
        height: "17px",
        width: "8px",
        left: "192px",
        top: "34px",
        borderLeft: "2px solid",
    }}/>;
  }
}

export default class Repl extends Component {
  render() {
    return <div className="repl" style={{
        fontSize: "16px",
        height: "272px",
    }}>
      <ReplTextArea />
      <ReplActiveLine />
      <ReplContent />
      <ReplCursor />
    </div>
  }
}
