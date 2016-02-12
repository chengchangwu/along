import {REPL_FOCUS, REPL_DEFOCUS} from '../actions'
import "babel-polyfill"

// Reducers
function focus(state = {focus: false}, action) {
  switch (action.type) {
    case REPL_FOCUS:
      return Object.assign({}, state, {focus: true});
    case REPL_DEFOCUS:
      return Object.assign({}, state, {focus: false});
    default:
      return state;
  }
}

export default focus
