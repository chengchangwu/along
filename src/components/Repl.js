import React, { PropTypes } from 'react'

function getTextWidth(text) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = "16px/normal'Monaco','Menlo','Ubuntu Mono','Consolas','source-code-pro',monospace";
    var metrics = context.measureText(text);
    return metrics.width;
};

var ReplTextArea = React.createClass({
    focus: function() {
      this.textarea.focus()
    },
    handleKeyPress: function(event) {
      let key=event.charCode || event.keyCode || 0;
      if (key === 13) {
        event.preventDefault()
        this.props.onEnter()
      }
    },
    handleChange: function() {
      this.props.onChange(this.textarea.value, this.textarea.selectionEnd)
    },
    handleKeyDown: function(event) {
      this.props.onKeyDown(event.keyCode)
    },
    handleKeyUp: function(event) {
      this.props.onKeyUp(this.textarea.selectionEnd)
    },
    render: function() {
      return <textarea className="repl-textarea"
        ref={ (c) => { this.textarea = c; }}
        wrap="off"
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        onKeyPress={this.handleKeyPress}
        onKeyUp={this.handleKeyUp}
        value={this.props.text}
        style={{
          opacity: 0,
          border: "none",
          height: "17px",
          width: "8px",
          left: "192px",
          top: this.props.y * 17 + "px",
          resize: "none",
      }}/>;
    }
});

const ReplActiveLine = ({y}) => (
  <div
    className="repl-active-line"
    style={{
      height: "17px",
      top: y * 17 + "px",
      left: "0",
      right: "0",
  }}/>
)

const ReplContent = ({text, history}) => (
  <div className="repl-content">
    {history.map((x) => (
      <div className="repl-line" key={x.id} style={{
        height: "17px"
      }}>{x}</div>
    ))}
    <div className="repl-line" style={{
      height: "17px"
    }}>{text}</div>
  </div>
)

const ReplCursor = ({x, y}) => (
  <div className="repl-cursor"
    style={{
      height: "17px",
      width: "8px",
      left: x + "px",
      top: y * 17 + "px",
      borderLeft: "2px solid",
  }}/>
)

var Repl = React.createClass({
  handleClick: function() {
    this.TextArea.focus();
  },
  render: function() {
    let y = this.props.output.history.length;
    return <div className={ this.props.focus? "repl repl-focus" : "repl" }
      onClick={ (event) => { this.handleClick (event); this.props.onClick(event); } }
      style={{
        fontSize: "16px",
        height: "272px",
    }}>
      <ReplTextArea ref={ (c) => { this.TextArea = c; }} y={y} text={this.props.input.text}
        onChange={this.props.onChange} onKeyDown={this.props.onKeyDown}
        onKeyUp={this.props.onKeyUp} onEnter={this.props.onEnter} />
      <ReplActiveLine y={y} />
      <ReplContent text={this.props.input.text} history={this.props.output.history} />
      <ReplCursor x={getTextWidth(this.props.input.text.substring(0, this.props.input.cursorX))} y={y} />
    </div>
  }
});

Repl.propTypes = {
  focus: PropTypes.bool.isRequired,
  input: PropTypes.object.isRequired,
  output: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyUp: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onEnter: PropTypes.func.isRequired
}

export default Repl
