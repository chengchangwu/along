import React, { PropTypes } from 'react'

var ReplTextArea = React.createClass({
    focus: function() {
      this.textarea.focus();
    },
    render: function() {
      return <textarea className="repl-textarea"
        ref={ (c) => { this.textarea = c; }}
        wrap="off"
        onChange={this.props.onChange}
        onKeyUp={this.props.onKeyUp}
        onKeyDown={this.props.onKeyDown}
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
});

const ReplActiveLine = () => (
  <div
    className="repl-active-line"
    style={{
      height: "17px",
      top: "34px",
      left: "0",
      right: "0",
  }}/>
)

const ReplContent = ({text}) => (
  <div className="repl-content">
    <div className="repl-line" style={{
      height: "17px"
    }}>: star 42 emit ;  ok</div>
    <div className="repl-line" style={{
      height: "17px"
    }}>star *  ok</div>
    <div className="repl-line" style={{
      height: "17px"
    }}>{text}</div>
  </div>
)

const ReplCursor = ({length}) => (
  <div className="repl-cursor"
    style={{
      height: "17px",
      width: "8px",
      left: length*8 + "px",
      top: "34px",
      borderLeft: "2px solid",
  }}/>
)

var Repl = React.createClass({
  handleClick: function() {
    this.TextArea.focus();
  },
  render: function() {
    return <div className={ this.props.focus? "repl repl-focus" : "repl" }
      onClick={ (event) => { this.handleClick (event); this.props.onClick(event); } }
      style={{
        fontSize: "16px",
        height: "272px",
    }}>
      <ReplTextArea ref={ (c) => { this.TextArea = c; }}
        onChange={this.props.onChange} onKeyDown={this.props.onKeyDown} onKeyUp={this.props.onKeyUp} />
      <ReplActiveLine />
      <ReplContent text={this.props.text}/>
      <ReplCursor length={this.props.text.length}/>
    </div>
  }
});

Repl.propTypes = {
  focus: PropTypes.bool.isRequired,
}

export default Repl
