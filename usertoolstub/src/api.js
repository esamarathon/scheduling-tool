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
      },
      'e3ceed3b54b2727843698dad': {
        name: 'LLCoolDave',
        twitch: 'LLCoolDave',
        flag: 'de',
        availability: {
          from: 1535785200000,
          until: 1535799600000
        }
      },
      '33ceed3b54b2727843698dad': {
        name: 'S.',
        twitch: 'lotsofs',
        flag: 'whoknows',
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

const ESAWruns = {
  '12345': {
    event: 'e8f8628f0650f04ad3aeea37',
    user: 'e3ceed3b54b2727843698dad',
    game: 'Baten Kaitos',
    category: '100%',
    platform: 'N-Gage',
    estimate: 3600000,
    runType: 'solo',
    teams: [['e3ceed3b54b2727843698dad']],
    video: null,
    comment: 'why',
    description: 'New boredome skip found',
    status: 'accepted',
    notes: [],
    decisions: []
  },
  '12346': {
    event: 'e8f8628f0650f04ad3aeea37',
    user: 'e3ceed3b54b2727843698daf',
    game: 'GTA V',
    category: 'Any%',
    platform: 'PC',
    estimate: 3600000,
    runType: 'race',
    teams: [['33ceed3b54b2727843698dad'], ['e3ceed3b54b2727843698daf']],
    video: null,
    comment: 'why',
    description: 'New boredome skip found',
    status: 'accepted',
    notes: [],
    decisions: []
  },
  '12347': {
    event: 'e8f8628f0650f04ad3aeca37',
    user: 'e3ceed3b54b2727843698dad',
    game: 'Garbage Game',
    category: 'Any%',
    platform: 'PC',
    estimate: 7200000,
    runType: 'solo',
    teams: [['e3ceed3b54b2727843698dad']],
    video: null,
    comment: 'why',
    description: 'New boredome skip found',
    status: 'accepted',
    notes: [],
    decisions: []
  }
}

export async function getRun (req, res) {
  // ToDo
  return res.json(ESAWruns[req.params.runId] || { game: req.params.runId, category: '' })
}

export async function getSubmissions (req, res) {
  if (req.params.eventId === 'e8f8628f0650f04ad3aeea37') {
    return res.json(ESAWruns)
  } else {
    return res.json({})
  }
}
