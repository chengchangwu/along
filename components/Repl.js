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
    handleKeyUp: function() {
      this.props.onKeyUp(this.textarea.selectionEnd)
    },
    render: function() {
      return <textarea className="repl-textarea"
        ref={ (c) => { this.textarea = c; }}
        wrap="off"
        onChange={this.props.onChange}
        onKeyDown={this.props.onKeyDown}
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
    let y = this.props.input.history.length;
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
      <ReplContent text={this.props.input.text} history={this.props.input.history} />
      <ReplCursor x={getTextWidth(this.props.input.text.substring(0, this.props.input.selectionEnd))} y={y} />
    </div>
  }
});

Repl.propTypes = {
  focus: PropTypes.bool.isRequired,
}

export default Repl
