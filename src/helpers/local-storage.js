export function saveLocalStorage(llave, valor) {
  localStorage.setItem(llave, JSON.stringify(valor))
}

export function getLocalStorage(llave) {
  return JSON.parse(localStorage.getItem(llave))
}

export function removeLocalStorage(llave) {
  localStorage.removeItem(llave)
}