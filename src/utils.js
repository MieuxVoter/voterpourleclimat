/**
 * Shuffles object in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export const shuffle = a => {
  const keys = Object.keys(a)
  for (let i = keys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[keys[i]], a[keys[j]]] = [a[keys[j]], a[keys[i]]]
  }
  return a
}

export const shuffleList = a => {
  const keys = Object.keys(a)
  for (let i = keys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[keys[i]], a[keys[j]]] = [a[keys[j]], a[keys[i]]]
  }
  return a
}

export const shuffleOutPlace = a => {
  const b = { ...a }
  return shuffle(b)
}
