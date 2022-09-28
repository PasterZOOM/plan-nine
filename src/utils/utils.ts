export const saveToLocalStorage = (key: string, value: string = 'undefined') => {
  localStorage.setItem(key, value)
}

export const loadFromLocalStorage = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}
