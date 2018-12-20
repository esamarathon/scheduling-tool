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
  } else {
    return res.json({})
  }
}
