import { REPL_FOCUS, REPL_DEFOCUS, REPL_CHANGE, REPL_KEYDOWN, REPL_ENTER } from '../actions'
import "babel-polyfill"
import { combineReducers } from 'redux'

// Reducers
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

const KEY_BACKSPACE = 8
const KEY_DEL = 46
const KEY_HOME = 36
const KEY_END = 35
const KEY_UP = 38
const KEY_DOWN = 40

// State: cursor position, last line in document,
export function input(state = {text: ""}, action) {
  switch (action.type) {
    case REPL_KEYDOWN:
      switch (action.keyCode) {
        case KEY_BACKSPACE:
        case KEY_DEL:
        case KEY_HOME:
        case KEY_END:
        case KEY_UP:
        case KEY_DOWN:
        default:
          // insert char
          return state;
      }
    case REPL_CHANGE:
      return {text: action.value};
    case REPL_ENTER:
      console.log("Enter " + state.text)
      return state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  focus,
  input
})

export default rootReducer
