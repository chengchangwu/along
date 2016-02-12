import {assert} from "chai"
import reducer from "../reducers"
import {REPL_FOCUS, REPL_DEFOCUS, replFocus, replDefocus} from "../actions"
import { createStore } from 'redux'

describe('reducer', function() {
  it('should respond to REPL_FOCUS', function() {
    assert(reducer({}, {type: REPL_FOCUS}).focus.focus, "focused")
  })
  it('should respond to REPL_DEFOCUS', function() {
    assert(reducer({}, {type: REPL_DEFOCUS}).focus.focus === false, "defocused")
  })
  it('should initialize focus to false', function() {
    assert(reducer(undefined, {type: "ANY_ACTION"}).focus.focus === false, "undefined")
  })
})

describe('store', function() {
  let store = createStore(reducer);
  it('should initialize focus to true', function() {
    assert(store.getState().focus.focus===false, "initialized")
  })
  it('should respond to REPL_FOCUS with {focus: true}', function() {
    store.dispatch(replFocus())
    assert(store.getState().focus.focus, "focused")
  })
  it('should respond to REPL_DEFOCUS with {focus: false}', function() {
    store.dispatch(replDefocus())
    assert(store.getState().focus.focus===false, "defocused")
  })
})
