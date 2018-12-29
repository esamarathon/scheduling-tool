export async function getUsers (req, res) {
  if (req.params.eventId === 'ec01c36206450f5709c0c891') {
    return res.json({
      'e3ceed3b54b2627843698daf': {
        name: 'CBenni',
        twitch: 'CBenni',
        flag: 'de'
      },
      'e3ceed3b54b2627843698dbe': {
        name: 'AdamAK',
        twitch: 'AdamAK',
        flag: 'nl'
      }
    })
  } else if (req.params.eventId === 'e8f8628f0650f04ad3aeea37') { // ESAW19
    return res.json({
      'e3ceed3b54b2727843698daf': {
        name: 'Joshimuz',
        twitch: 'Joshimuz',
        flag: 'uk',
        availability: {
          from: 1535785200000,
          until: 1535799600000
        }
      }
    })
  } else {
    return res.json({})
  }
}
