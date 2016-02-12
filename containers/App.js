import React, { Component } from 'react'
import { connect } from 'react-redux'
import Editor from '../components/Editor'
import 'brace/mode/forth'
import 'brace/theme/github'
import Repl from '../components/Repl'
import '../assets/style.css'
import { replFocus, replDefocus, replChange, replKeyup } from '../actions'


const App = ({focus, onReplClick, onReplClickOutside, onReplChange, onReplKeyUp}) => (
  <div onClick={onReplClickOutside}>
    <Editor name="editor" mode="forth" theme="github" />
    <hr/>
    <Repl focus={focus} onClick={onReplClick} onChange={onReplChange} onKeyUp={onReplKeyUp}/>
  </div>
)

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    onReplClick: (event) => {
      // Note: event.stopPropagation may not be a good solution. Google
      // 'react click outside' for better solutions.
      event.stopPropagation();
      dispatch(replFocus())
    },
    onReplClickOutside: (event) => {
      dispatch(replDefocus())
    },
    onReplChange: (event) => {
      console.log('onReplChange')
      dispatch(replChange(event.target.value))
    },
    onReplKeyUp: (event) => {
      dispatch(replKeyUp(event.charCode))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
