import React, { Component } from 'react'
import { connect } from 'react-redux'
import Editor from '../components/Editor'
import 'brace/mode/forth'
import 'brace/theme/github'
import Repl from '../components/Repl'
import '../assets/style.css'
import { focus } from '../actions'

const App = ({focus, onReplClick}) => (
  <div>
    <Editor name="editor" mode="forth" theme="github" />
    <hr/>
    <Repl focus={focus} onClick={onReplClick}/>
  </div>
)

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    onReplClick: () => {
      dispatch(focus())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
