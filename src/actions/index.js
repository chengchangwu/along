/**
  @module Actions REPL

*/

/** Action */
export const REPL_FOCUS = 'REPL_FOCUS'
/** Action */
export const REPL_DEFOCUS = 'REPL_DEFOCUS'
/** Action */
export const REPL_CHANGE = 'REPL_CHANGE'
/** Action */
export const REPL_KEYDOWN = 'REPL_KEYDOWN'
/** Action */
export const REPL_KEYUP = 'REPL_KEYUP'
/** Action */
export const REPL_ENTER = 'REPL_ENTER'
/** Action */
export const REPL_OUTPUT = 'REPL_OUTPUT'

/** Action creator */
export function replFocus() {
  return {
    type: REPL_FOCUS
  }
}

/** Action creator */
export function replDefocus() {
  return {
    type: REPL_DEFOCUS
  }
}

/** Action creator */
export function replChange(value, cursorX) {
  return {
    type: REPL_CHANGE,
    cursorX: cursorX,
    value: value
  }
}

/** Action creator */
export function replKeyDown(keyCode) {
  return {
    type: REPL_KEYDOWN,
    keyCode: keyCode
  }
}

/** Action creator */
export function replKeyUp(cursorX) {
  return {
    type: REPL_KEYUP,
    cursorX: cursorX,
  }
}

/** Action creator */
export function replEnter() {
  return {
    type: REPL_ENTER
  }
}

/** Action creator */
export function replOutput(text) {
  return {
    type: REPL_OUTPUT,
    text: text
  }
}

/**
  @module Actions Websocket
*/

/** Action */
export const WS_CONNECT = 'WS_CONNECT'
/** Action */
export const WS_SET_URL = 'WS_SET_URL'

/** Action creator */
export function connectWs(socket) {
  return {
    type: WS_CONNECT,
    socket: socket
  }
}

/** Action creator */
export function setUrl(url) {
  return {
    type: WS_SET_URL,
    url: url
  }
}
