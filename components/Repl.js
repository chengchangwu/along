import React, { PropTypes } from 'react'

const ReplTextArea = () => (
  <textarea className="repl-textarea"
    wrap="off"
    style={{
      opacity: 0,
      border: "none",
      height: "17px",
      width: "8px",
      left: "192px",
      top: "34px",
      resize: "none",
  }}/>
)

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

const ReplContent = () => (
  <div className="repl-content">
    <div className="repl-line" style={{
      height: "17px"
    }}>: star 42 emit ;  ok</div>
    <div className="repl-line" style={{
      height: "17px"
    }}>star *  ok</div>
    <div className="repl-line" style={{
      height: "17px"
    }}>: stars 0 do star loop ;</div>
  </div>
)

const ReplCursor = () => (
  <div className="repl-cursor"
    style={{
      height: "17px",
      width: "8px",
      left: "192px",
      top: "34px",
      borderLeft: "2px solid",
  }}/>
)

const Repl = ({focus}) => (
  <div className={ focus? "repl repl-focus" : "repl" }
    style={{
      fontSize: "16px",
      height: "272px",
  }}>
    <ReplTextArea />
    <ReplActiveLine />
    <ReplContent />
    <ReplCursor />
  </div>
)

Repl.propTypes = {
  focus: PropTypes.bool.isRequired,
}

export default Repl
