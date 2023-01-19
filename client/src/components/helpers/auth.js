export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('daisy-shop')
}
export const getPayload = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload))
}