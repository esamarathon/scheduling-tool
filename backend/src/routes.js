import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import jwt from 'express-jwt'

import settings from './settings'
import {
  getEvents, getEvent, handleTransformation
} from './api'
import { publicKey } from './auth'

const app = express()
const server = http.Server(app)

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use(jwt({
  secret: publicKey,
  algorithms: ['RS256'],
  credentialsRequired: false,
  requestProperty: 'jwt'
}))

app.get('/events', getEvents)
app.get('/event/:eventId', getEvent)
app.post('/update', handleTransformation)

server.listen(settings.backend.api.port)
export { server, app }
