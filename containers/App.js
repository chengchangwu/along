import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return <div>Hello World!</div>
  }
}

function select(state) {
  return state
}

export default connect(select)(App)
