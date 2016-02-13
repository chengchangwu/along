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
const KEY_LEFT = 37
const KEY_RIGHT = 39

// State: cursor position, last line in document,
export function input(state = {text: "", position: 0}, action) {
  switch (action.type) {
    case REPL_KEYDOWN:
      switch (action.keyCode) {
        case KEY_BACKSPACE:
          return state;
        case KEY_DEL:
          let position = Math.min(state.position + 1, state.text.length);
          return Object.assign({}, state, {position: position});
        case KEY_HOME:
          return Object.assign({}, state, {position: 0});
        case KEY_END:
          return Object.assign({}, state, {position: state.text.length});
        case KEY_UP:
          return state;
        case KEY_DOWN:
          return state;
        case KEY_LEFT:
          return Object.assign({}, state, {position: Math.max(state.position-1, 0)});
        case KEY_RIGHT:
          return Object.assign({}, state, {position: Math.min(state.position+1, state.text.length)});
        default:
          // insert char
          return state;
      }
    case REPL_CHANGE:
      let position = state.position + action.value.length - state.text.length
      return Object.assign({}, state, {text: action.value, position: position});
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
