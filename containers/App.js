import React, { Component } from 'react'
import { connect } from 'react-redux'
import Editor from '../components/Editor'
import 'brace/mode/forth'
import 'brace/theme/github'

function onChange(newValue) {
  console.log('change', newValue);
}

class App extends Component {
  render() {
    return <div>
      <Editor name="editor" mode="forth" theme="github"
      />
      <hr/>
      <div
        style={{
          fontSize: "16px",
          height: "272px",
        }}
      >
        <textarea
          wrap="off"
          style={{
            border: "none",
            height: "17px",
            width: "8px",
            left: "0px",
            top:"0px",
            resize: "none",
          }}
        />
        <div
          className="active-line"
          style={{
            height: "17px",
            top: "0px",
            left: "0",
            right: "0",
            background: "rgb(245,245,245)",
          }}
        />
      </div>
    </div>
  }
}

function select(state) {
  return state
}

export default connect(select)(App)
