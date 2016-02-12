import { REPL_FOCUS, REPL_DEFOCUS, REPL_CHANGE, REPL_KEYUP } from '../actions'
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

const REPL_BACKSPACE = 1
const REPL_DEL = 1
const REPL_ENTER = 1
const REPL_HOME = 1
const REPL_END = 1
const REPL_UP = 1
const REPL_DOWN = 1

// State: cursor position, last line in document,
export function key(state = {}, action) {
  switch (action.type) {
    case REPL_KEYUP:
      switch (action.char) {
        case REPL_BACKSPACE:
        case REPL_DEL:
        case REPL_HOME:
        case REPL_END:
        case REPL_ENTER:
        case REPL_UP:
        case REPL_DOWN:
        default:
          // insert char
          console.log(action.char)
          return state;
      }
    case REPL_CHANGE:
      console.log(action.value);
      return {input: action.value};
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  focus,
  key
})

export default rootReducer
