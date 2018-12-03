import fs from 'fs'
import jwt from 'jsonwebtoken'
import settings from './settings'

export const publicKey = fs.readFileSync(settings.auth.publicKey)

export function decodeToken (token) {
  return jwt.verify(token, publicKey, { algorithms: [settings.auth.algorithm] })
}
