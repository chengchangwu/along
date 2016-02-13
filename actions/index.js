// Actions
export const REPL_FOCUS = 'REPL_FOCUS'
export const REPL_DEFOCUS = 'REPL_DEFOCUS'
export const REPL_CHANGE = 'REPL_CHANGE'
export const REPL_KEYDOWN = 'REPL_KEYDOWN'

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
  console.log("keydown: " + keyCode)
  return {
    type: REPL_KEYDOWN,
    keyCode: keyCode
  }
}
