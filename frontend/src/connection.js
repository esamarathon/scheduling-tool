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
    start: '2018-09-01T08:00:00Z',
    end: '2018-09-02T08:00:00Z',
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
              time: '2018-09-01T08:00:00Z'
            },
            end: {
              type: 'duration',
              duration: '02:00:00'
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
              setup: '00:30:00'
            },
            end: {
              type: 'duration',
              duration: '01:00:00'
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
              setup: '00:20:00'
            },
            end: {
              type: 'duration',
              duration: '00:20:00'
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
              setup: '00:10:00'
            },
            end: {
              type: 'duration',
              duration: '01:00:00'
            }
          },
          {
            id: 2001,
            parent: 1,
            people: [{ name: 'Pottoww' }],
            name: 'Quick & Crash',
            start: {
              type: 'absolute',
              time: '2018-09-01T13:00:00Z'
            },
            end: {
              type: 'duration',
              duration: '01:00:00'
            }
          }
        ]
      }
    ]
  }
}
