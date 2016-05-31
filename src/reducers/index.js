import {
  REPL_FOCUS, REPL_DEFOCUS,
  REPL_CHANGE, REPL_KEYDOWN, REPL_KEYUP, REPL_ENTER,
  REPL_OUTPUT,
  WS_CONNECT, WS_SET_URL } from '../actions'
import "babel-polyfill"
import { combineReducers } from 'redux'

/**
  @module Reducers REPL
*/

/** Focus reducer */
export function focus(state = {focus: false}, action) {
  switch (action.type) {
    case REPL_FOCUS:
      return Object.assign({}, state, {focus: true});
    case REPL_DEFOCUS:
      return Object.assign({}, state, {focus: false});
    default:
      return state;
  }
}

const KEY_UP = 38
const KEY_DOWN = 40

/** Input reducer */
export function input(state = {text: "", cursorX: 0, history: [], history_idx: 0}, action) {
  switch (action.type) {
    case REPL_KEYDOWN:
      switch (action.keyCode) {
        case KEY_UP: {
          if (state.history_idx === 0) {
            return state;
          } else {
            let idx = state.history_idx - 1;
            let text = state.history[idx];
            return Object.assign({}, state, {text: text, history_idx: idx});
          }
        }
        case KEY_DOWN: {
          if (state.history_idx === state.history.length) {
            return state;
          } else {
            let idx = state.history_idx + 1;
            let text = (idx === state.history.length) ? "" : state.history[idx];
            return Object.assign({}, state, {text: text, history_idx: idx});
          }
        }
        default:
          return state;
      }
    case REPL_KEYUP:
      return Object.assign({}, state, {cursorX: action.cursorX});
    case REPL_CHANGE:
      return Object.assign({}, state, {text: action.value, cursorX: action.cursorX, history_idx: state.history.length});
    case REPL_ENTER: {
      let history = [...state.history, state.text]
      console.log("Enter " + state.text)
      return Object.assign({}, state, {text: "", history: history, history_idx: history.length});
    }
    default:
      return state;
  }
}

/** Output reducer */
export function output(state = {history: []}, action) {
  console.log(action);
  switch(action.type) {
    case REPL_OUTPUT:
      let history = [...state.history, ...action.text.split('\n')];
      return Object.assign({}, state, {history: history});
    default:
      return state;
  }
}

/**
  @module Reducers Websocket
*/

/** Connection reducer */
export function connection(state = {url: "ws://127.0.0.1:3012", socket: null}, action) {
  switch (action.type) {
    case WS_CONNECT:
      return Object.assign({}, state, {socket: action.socket});
    case WS_SET_URL:
      return Object.assign({}, state, {url: action.url});
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  focus,
  input,
  output,
  connection
})

export default rootReducer
