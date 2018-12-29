export default function createDefaultEvent (eventID) {
  return {
    event: {
      _id: eventID,
      usertoolRef: eventID,
      name: eventID,
      start: 1535785200000,
      end: 1535871600000,
      schedules: [
        '0',
        '1'
      ]
    },
    schedules: {
      '0': {
        name: 'Main Stream',
        _id: '0',
        elements: [
          '1000',
          '1001',
          '1002'
        ]
      },
      '1': {
        name: 'Second Stream',
        _id: '1',
        elements: [
          '2000',
          '2001'
        ]
      }
    },
    elements: {
      '1000': {
        _id: '1000',
        people: [[{ name: 'llcooldave' }]],
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
      '1001': {
        _id: '1001',
        people: [[{ name: 'S.' }], [{ userId: 'e3ceed3b54b2727843698daf' }]],
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
      '1002': {
        _id: '1002',
        people: [[{ name: 'Mikwuyama' }]],
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
      },
      '2000': {
        _id: '2000',
        people: [[{ userId: 'e3ceed3b54b2727843698daf' }]],
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
      '2001': {
        _id: '2001',
        people: [[{ name: 'Pottoww' }]],
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
    }
  }
}
