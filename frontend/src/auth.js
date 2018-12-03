import jsonwebtoken from 'jsonwebtoken'
import settings from './settings'

import publicKey from '../../shared/public-dev.pem'
import privateKey from '../../shared/private-dev.pem'

export function decodeToken (token) {
  return jsonwebtoken.verify(token, publicKey, { algorithms: [settings.auth.algorithm] })
}

export function getCookie (name) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return ''
}

let jwt
let cookie = getCookie(settings.auth.cookie)
try {
  jwt = decodeToken(cookie)
} catch (err) {
  // do nothing
}

export function getJwtCookie () {
  return cookie
}

export function getJwt () {
  return jwt
}

export function getLoggedInUser () {
  return jwt.user.id
}

export function deleteCookie (name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
  if (name === settings.auth.cookie) {
    jwt = undefined
    cookie = undefined
  }
}

/* development */
export function setCookie (payload) {
  jwt = payload
  cookie = jsonwebtoken.sign(payload, privateKey, { algorithm: settings.auth.algorithm })
  document.cookie = `${settings.auth.cookie}=${cookie};`
}
