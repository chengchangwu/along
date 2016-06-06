import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { App, reducer } from '../lib/index'


let store = createStore(
  combineReducers({
    along: reducer
  })
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
