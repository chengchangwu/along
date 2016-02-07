import React, { Component } from 'react'
import { connect } from 'react-redux'
import AceEditor from 'react-ace'
import brace from 'brace';
import 'brace/mode/forth'
import 'brace/theme/github'

function onChange(newValue) {
  console.log('change', newValue);
}

class App extends Component {
  render() {
    return <div>
      <AceEditor
        mode="forth" theme="github" onChange={onChange}
        name="editor" editorProps={{$blockScrolling: true}}
      />
      <div>Hello Forth</div>
    </div>
  }
}

function select(state) {
  return state
}

export default connect(select)(App)
