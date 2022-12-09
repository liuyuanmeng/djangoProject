export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('daisy-shop')
}
export const getPayload = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return
  const payload = token.split('.')[1]
  return JSON.parse(atob(payload))
}


// ? function that checks that user is authenticated
export const userIsAuthenticated = () => {
  // This function will get the payload for localstorage
  const payload = getPayload()
  // Check that payload exists
  if (!payload) return false
  // get todays time as a timestamp in seconds
  const currentTime = Math.floor(Date.now() / 1000)
  // Compare the token expiry and make sure the expiry is in the future
  // Return a boolean, true if valid, false if invalid
  return currentTime < payload.exp
}


// export const userIsOwner = (favourite ) => {
//   // get payload and check it has a value
//   // console.log('favourite  user owner', favourite .owner._id)
//   const payload = getPayload()
//   if (!payload) return
//   return favourite .owner === payload.sub
// }