// Actions
export const REPL_FOCUS = 'REPL_FOCUS'
export const REPL_DEFOCUS = 'REPL_DEFOCUS'
export const REPL_CHANGE = 'REPL_CHANGE'
export const REPL_KEYDOWN = 'REPL_KEYDOWN'
export const REPL_KEYUP = 'REPL_KEYUP'
export const REPL_ENTER = 'REPL_ENTER'

// Action Creators
export function replFocus() {
  return {
    type: REPL_FOCUS
  }
}

export function replDefocus() {
  return {
    type: REPL_DEFOCUS
  }
}

export function replChange(value) {
  return {
    type: REPL_CHANGE,
    value: value
  }
}

export function replKeyDown(keyCode) {
  return {
    type: REPL_KEYDOWN,
    keyCode: keyCode
  }
}

export function replKeyUp(cursorX) {
  return {
    type: REPL_KEYUP,
    cursorX: cursorX,
  }
}

export function replEnter() {
  return {
    type: REPL_ENTER
  }
}
