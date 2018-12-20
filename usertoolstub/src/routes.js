import http from 'http'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import settings from './settings'
import {
  getUsers
} from './api'

const app = express()
const server = http.Server(app)

app.use(bodyParser.json())
app.use(cors())

app.get('/users/:eventId', getUsers)

server.listen(settings.usertool.api.port)
export { server, app }
