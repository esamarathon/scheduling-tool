import esas18 from '../static/esas18'
import makeDefaultEvent from '../static/defaultevent'

export async function getEvents (req, res) {
  if (!req.jwt) return res.status(401).end('Not authenticated.')
  // ToDo, dummy
  return res.json([{ name: 'ESAS18', id: esas18.event._id }, { name: 'ESAW19', id: 'e8f8628f0650f04ad3aeea37' }, { name: 'ESAS19', id: '82d0ae30a08e03d2dc2c5e34' }])
}

export async function getEvent (req, res) {
  if (!req.jwt) return res.status(401).end('Not authenticated.')
  // load dummy debug events
  if (req.params.eventId === esas18.event._id) {
    return res.json(esas18)
  } else {
    return res.json(makeDefaultEvent(req.params.eventId))
  }
}

export async function handleTransformation (req, res) {
  if (!req.jwt) return res.status(401).end('Not authenticated.')
  // ToDo
  console.log(req.body)
  return res.json({})
}
