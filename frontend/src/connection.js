import ESAS18 from './esas18.js'

export default function fetchEvent (eventID) {
  if (eventID === 'ESAS18') {
    return ESAS18
  }

  // This is just a stub
  return {
    eventID,
    name: eventID,
    tracker: {
      id: eventID,
      url: `https:\\\\tracker.esamarathon.com\\${eventID}`
    },
    start: 1535785200000,
    end: 1535871600000,
    schedules: [
      {
        name: 'Main Stream',
        id: 0,
        elements: [
          {
            id: 1000,
            parent: 0,
            people: [{ name: 'llcooldave' }],
            start: {
              type: 'absolute',
              time: 1535785200000
            },
            end: {
              type: 'duration',
              duration: 7200000
            },
            name: 'Baten Kaitos 100%'
          },
          {
            id: 1001,
            parent: 0,
            people: [{ name: 'S.' }, { name: 'Joshimuz' }],
            name: 'GTA V 100%',
            start: {
              type: 'endOf',
              ref: '1000',
              setup: 1800000
            },
            end: {
              type: 'duration',
              duration: 3600000
            }
          },
          {
            id: 1002,
            parent: 0,
            people: [{ name: 'Mikwuyama' }],
            name: 'Buying a $5 million villa on Hawaii',
            start: {
              type: 'endOf',
              ref: '1001',
              setup: 1200000
            },
            end: {
              type: 'duration',
              duration: 1200000
            }
          }
        ]
      },
      {
        name: 'Second Stream',
        id: 1,
        elements: [
          {
            id: 2000,
            parent: 1,
            people: [{ name: 'Fatzke' }],
            name: 'Vice City 53%',
            start: {
              type: 'startOf',
              ref: '1001',
              setup: 600000
            },
            end: {
              type: 'duration',
              duration: 3600000
            }
          },
          {
            id: 2001,
            parent: 1,
            people: [{ name: 'Pottoww' }],
            name: 'Quick & Crash',
            start: {
              type: 'absolute',
              time: 1535803200000
            },
            end: {
              type: 'duration',
              duration: 3600000
            }
          }
        ]
      }
    ]
  }
}
