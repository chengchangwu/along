import { REPL_FOCUS, REPL_DEFOCUS, REPL_CHANGE, REPL_KEYDOWN, REPL_KEYUP, REPL_ENTER } from '../actions'
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
          // insert char
          return state;
      }
    case REPL_KEYUP:
      return Object.assign({}, state, {cursorX: action.cursorX});
    case REPL_CHANGE: {
      return Object.assign({}, state, {text: action.value, history_idx: state.history.length});
    }
    case REPL_ENTER: {
      let history = [...state.history, state.text];
      console.log("Enter " + state.text)
      return Object.assign({}, state, {text: "", history: history, history_idx: history.length});
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  focus,
  input
})

export default rootReducer
