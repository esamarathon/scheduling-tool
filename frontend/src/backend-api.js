import _ from 'lodash'
import settings from './settings'
import { getJwtCookie } from './auth'

function bufferToHex (buffer) {
  return Array
    .from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export function generateID () {
  const u = crypto.getRandomValues(new Uint8Array(12))
  return bufferToHex(u)
}

export function objectToQueryString (url, obj) {
  const res = new URL(url)
  _.each(obj, (val, key) => {
    res.searchParams.append(key, val)
  })
  return res
}

export async function makeRequest (endpoint, options) {
  const optionsToUse = _.defaultsDeep({}, options, { headers: { accept: 'application/json' } })
  const jwtCookie = getJwtCookie()
  if (jwtCookie) {
    _.defaultsDeep(optionsToUse, { headers: { authorization: `Bearer ${jwtCookie}` } })
  }
  const response = await fetch(optionsToUse.query ? objectToQueryString(endpoint, optionsToUse.query) : endpoint, optionsToUse)
  if (response.status === 200) {
    return JSON.parse(await response.text())
  }
  throw new Error(`Call to ${endpoint} returned with status ${response.status}${response.body ? `: ${response.body}` : ''}`)
}

export function makePOST (endpoint, body, options) {
  const opts = _.merge({
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }, options)
  return makeRequest(endpoint, opts)
}

export function fetchEvents () {
  return makeRequest(`${settings.backend.api.baseurl}events`)
}

export function fetchEvent (eventId) {
  return makeRequest(`${settings.backend.api.baseurl}event/${eventId}`)
}

export function sendTransformation (transformation) {
  return makePOST(`${settings.backend.api.baseurl}update`, transformation)
}

export function fetchUsers (eventId) {
  return makeRequest(`${settings.usertool.api.baseurl}users/${eventId}`)
}

export function fetchSubmissions (eventId) {
  return makeRequest(`${settings.usertool.api.baseurl}submissions/${eventId}`)
}

export async function fetchForeignData (foreignDataModel, foreignDataKey) {
  switch (foreignDataModel) {
    case 'run':
      return {
        model: foreignDataModel,
        id: foreignDataKey,
        data: await makeRequest(`${settings.usertool.api.baseurl}run/${foreignDataKey}`)
      }
    default:
      break
  }
}
