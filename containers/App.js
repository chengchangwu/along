import React, { Component } from 'react'
import { connect } from 'react-redux'
import Editor from '../components/Editor'

function onChange(newValue) {
  console.log('change', newValue);
}

class App extends Component {
  render() {
    return <div>
      <Editor name="editor" theme="github"/>
      <div>Hello Forth</div>
    </div>
  }
}

function select(state) {
  return state
}

export default connect(select)(App)
