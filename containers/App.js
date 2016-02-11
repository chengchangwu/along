import React, { Component } from 'react'
import { connect } from 'react-redux'
import Editor from '../components/Editor'
import 'brace/mode/forth'
import 'brace/theme/github'
import Repl from '../components/Repl'
import '../assets/style.css'

function onChange(newValue) {
  console.log('change', newValue);
}

class App extends Component {
  render() {
    return <div>
      <Editor name="editor" mode="forth" theme="github" />
      <hr/>
      <Repl focus={true}/>
    </div>
  }
}

function select(state) {
  return state
}

export default connect(select)(App)
