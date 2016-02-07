import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './containers/App'

function AlongApp(state = {}, action) {
  return state
}

let store = createStore(AlongApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
