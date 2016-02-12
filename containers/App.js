import React, { Component } from 'react'
import { connect } from 'react-redux'
import Editor from '../components/Editor'
import 'brace/mode/forth'
import 'brace/theme/github'
import Repl from '../components/Repl'
import '../assets/style.css'
import { replFocus, replDefocus, replChange, replKeyDown, replKeyUp } from '../actions'


const App = ({focus, onReplClick, onReplClickOutside, onReplChange, onReplKeyDown, onReplKeyUp}) => (
  <div onClick={onReplClickOutside}>
    <Editor name="editor" mode="forth" theme="github" />
    <hr/>
    <Repl focus={focus} onClick={onReplClick} onChange={onReplChange} onKeyDown={onReplKeyDown} onKeyUp={onReplKeyUp}/>
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
      dispatch(replChange(event.target.value))
    },
    onReplKeyDown: (event) => {
      dispatch(replKeyDown(event.keyCode))
    },
    onReplKeyUp: (event) => {
      dispatch(replKeyUp())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
