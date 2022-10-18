interface IsValidResponse {
  isValid: boolean
  value?: string
  headers?: string
}

const SEPARATOR = '//**//'
const CACHE_INTERVAL = 0.3 * 60 * 1000

const store = (key: string, value: string, headers: string): void => {
  const finalValue = `${value}${SEPARATOR}${headers}${SEPARATOR}${Date.now().toString()}`
  localStorage.setItem(key, finalValue)
}

const isValid = (key: string): IsValidResponse => {
  const value = localStorage.getItem(key)
  if (value === null) {
    return {
      isValid: false
    }
  }
  const values = value.split(SEPARATOR)
  const timestamp = Number(values[2])
  if (Number.isNaN(timestamp)) {
    return {
      isValid: false
    }
  }
  const date = new Date(timestamp)
  if (date.toString() === 'Invalid Date') {
    return {
      isValid: false
    }
  }
  if ((Date.now() - date.getTime()) < CACHE_INTERVAL) {
    return {
      isValid: true,
      value: values[0],
      headers: values[1]
    }
  }
  localStorage.removeItem(key)
  return {
    isValid: false
  }
}

export const cache = {
  store, isValid
}
