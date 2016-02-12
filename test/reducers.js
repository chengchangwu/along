import {assert} from "chai"
import reducer from "../reducers"
import {REPL_FOCUS, REPL_DEFOCUS, focus, defocus} from "../actions"
import { createStore } from 'redux'

describe('reducer', function() {
  it('should respond to REPL_FOCUS', function() {
    assert(reducer({}, {type: REPL_FOCUS}).focus, "focused")
  })
  it('should respond to REPL_DEFOCUS', function() {
    assert(reducer({}, {type: REPL_DEFOCUS}).focus === false, "defocused")
  })
  it('should initialize focus to false', function() {
    assert(reducer(undefined, {type: "ANY_ACTION"}).focus === false, "undefined")
  })
})

describe('store', function() {
  let store = createStore(reducer);
  it('should initialize focus to true', function() {
    assert(store.getState().focus===false, "initialized")
  })
  it('should respond to REPL_FOCUS with {focus: true}', function() {
    store.dispatch(focus())
    assert(store.getState().focus, "focused")
  })
  it('should respond to REPL_DEFOCUS with {focus: false}', function() {
    store.dispatch(defocus())
    assert(store.getState().focus===false, "defocused")
  })
})
