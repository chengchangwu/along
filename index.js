import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './containers/App'
import {focus} from './reducers'

let store = createStore(focus)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
