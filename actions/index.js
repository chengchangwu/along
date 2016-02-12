// Actions
export const REPL_FOCUS = 'REPL_FOCUS'
export const REPL_DEFOCUS = 'REPL_DEFOCUS'

// Action Creators
export function focus() {
  return {
    type: REPL_FOCUS
  }
}

export function defocus() {
  return {
    type: REPL_DEFOCUS
  }
}
