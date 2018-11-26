export default {
  eventID: 'ESAS18',
  name: 'ESA Summer 2018',
  tracker: {
    id: 'ESAS18',
    url: `https:\\\\tracker.esamarathon.com\\ESAS18`
  },
  start: 1532185200000,
  end: 1532818800000,
  schedules: [
    {
      name: 'Main Stream',
      id: 'ESAS18Main',
      dataItems: [
        {
          name: 'Platform',
          type: String
        },
        {
          name: 'Category',
          type: String
        },
        {
          name: 'Note',
          type: String
        }
      ],
      elements: [
        {
          'name': 'Dark Souls III',
          'start': {
            'type': 'absolute',
            'time': 1532185200000
          },
          'end': {
            'duration': 7200000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Race',
            'Category': 'All Bosses'
          },
          'people': [
            {
              'name': 'Fudgecow'
            },
            {
              'name': 'SayviTV'
            }
          ],
          'id': '07394dbd-4ec1-4c18-bf41-d6f42fb7a4df',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'God of War',
          'start': {
            'setup': 600000,
            'ref': '07394dbd-4ec1-4c18-bf41-d6f42fb7a4df',
            'type': 'endOf'
          },
          'end': {
            'duration': 5400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PS3',
            'Note': null,
            'Category': 'Any% (NG+)'
          },
          'people': [
            {
              'name': 'ThaRixer'
            }
          ],
          'id': 'bea08b3b-cae8-4098-bea7-85ac4ae499f3',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Cuphead',
          'start': {
            'setup': 600000,
            'ref': 'bea08b3b-cae8-4098-bea7-85ac4ae499f3',
            'type': 'endOf'
          },
          'end': {
            'duration': 2100000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'All Bosses (Regular, Legacy)'
          },
          'people': [
            {
              'name': 'Kirthar'
            }
          ],
          'id': '287d3a01-64a1-4fa9-a096-ac1bbbf2d16e',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Super Mario Land 2: 6 Golden Coins',
          'start': {
            'setup': 600000,
            'ref': '287d3a01-64a1-4fa9-a096-ac1bbbf2d16e',
            'type': 'endOf'
          },
          'end': {
            'duration': 1800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'SNES (Super Game Boy 2)',
            'Note': 'Race',
            'Category': 'Any% (Glitchless)'
          },
          'people': [
            {
              'name': 'Oh_DeeR'
            },
            {
              'name': 'LateLearner'
            }
          ],
          'id': '62792f39-291e-496b-9dcb-32b32f410a7b',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Gremlins 2: The New Batch',
          'start': {
            'setup': 600000,
            'ref': '62792f39-291e-496b-9dcb-32b32f410a7b',
            'type': 'endOf'
          },
          'end': {
            'duration': 540000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'NES',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'EndySWE'
            }
          ],
          'id': '962d8b62-6520-4c2b-a431-c5e274827e64',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Darkwing Duck',
          'start': {
            'setup': 600000,
            'ref': '962d8b62-6520-4c2b-a431-c5e274827e64',
            'type': 'endOf'
          },
          'end': {
            'duration': 900000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'NES',
            'Note': 'Race',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'TheMexicanRunner'
            },
            {
              'name': 'Jokaah'
            }
          ],
          'id': '2c701a26-d293-44f2-953e-1e314de8875f',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Castle of Illusion HD',
          'start': {
            'setup': 600000,
            'ref': '2c701a26-d293-44f2-953e-1e314de8875f',
            'type': 'endOf'
          },
          'end': {
            'duration': 2400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'KrazyRasmus'
            }
          ],
          'id': '64e47127-06f1-493b-b230-4ec16f41ab38',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Hollow Knight',
          'start': {
            'setup': 600000,
            'ref': '64e47127-06f1-493b-b230-4ec16f41ab38',
            'type': 'endOf'
          },
          'end': {
            'duration': 2700000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any% (No Major Glitches)'
          },
          'people': [
            {
              'name': 'Ushebti'
            }
          ],
          'id': '26d2798a-4a62-407c-9e67-adfd49e5a25f',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Fable: The Lost Chapters',
          'start': {
            'setup': 600000,
            'ref': '26d2798a-4a62-407c-9e67-adfd49e5a25f',
            'type': 'endOf'
          },
          'end': {
            'duration': 13500000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': '100%'
          },
          'people': [
            {
              'name': 'Etem'
            }
          ],
          'id': '7e68ed36-e201-4755-8ffc-3e82b02440d5',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Ratchet & Clank',
          'start': {
            'setup': 600000,
            'ref': '7e68ed36-e201-4755-8ffc-3e82b02440d5',
            'type': 'endOf'
          },
          'end': {
            'duration': 4800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PS3',
            'Note': null,
            'Category': 'All Gold Bolts'
          },
          'people': [
            {
              'name': 'Janky'
            }
          ],
          'id': 'b911b75c-71fb-446c-862b-5a0e22be6651',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Warhammer 40,000: Dawn of War - Dark Crusade',
          'start': {
            'setup': 600000,
            'ref': 'b911b75c-71fb-446c-862b-5a0e22be6651',
            'type': 'endOf'
          },
          'end': {
            'duration': 5400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'All Strongholds (Necron)'
          },
          'people': [
            {
              'name': 'TheLaughingMax'
            }
          ],
          'id': '1a62dbc8-6e20-4c57-866b-60eea6b75e97',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Kingdom Hearts Dream Drop Distance HD',
          'start': {
            'setup': 600000,
            'ref': '1a62dbc8-6e20-4c57-866b-60eea6b75e97',
            'type': 'endOf'
          },
          'end': {
            'duration': 8100000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PS4',
            'Note': null,
            'Category': 'Any% (Beginner NG+)'
          },
          'people': [
            {
              'name': 'RebelDragon95'
            }
          ],
          'id': '3630d0b6-1e77-4e07-9e36-4b5b0295b758',
          'parent': 'ESAS18Main'
        },
        {
          'name': "Tony Hawk's American Wasteland",
          'start': {
            'setup': 600000,
            'ref': '3630d0b6-1e77-4e07-9e36-4b5b0295b758',
            'type': 'endOf'
          },
          'end': {
            'duration': 5100000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Story Mode (Normal)'
          },
          'people': [
            {
              'name': 'English_Ben'
            }
          ],
          'id': 'd84d8d58-6ebd-4ad0-bb2c-dba775cfa397',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Tomb Raider: Anniversary',
          'start': {
            'setup': 600000,
            'ref': 'd84d8d58-6ebd-4ad0-bb2c-dba775cfa397',
            'type': 'endOf'
          },
          'end': {
            'duration': 1800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Cadarev'
            }
          ],
          'id': 'a3e2e63b-4c7c-479d-8f2e-8be8fb8b977f',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'El Matador',
          'start': {
            'setup': 600000,
            'ref': 'a3e2e63b-4c7c-479d-8f2e-8be8fb8b977f',
            'type': 'endOf'
          },
          'end': {
            'duration': 1500000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Race',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'catalystz'
            },
            {
              'name': 'havrd'
            }
          ],
          'id': '23813030-01b0-4f69-926d-ee3d78c47997',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Max Payne',
          'start': {
            'setup': 600000,
            'ref': '23813030-01b0-4f69-926d-ee3d78c47997',
            'type': 'endOf'
          },
          'end': {
            'duration': 1500000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'GBP',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'tocaloni1'
            }
          ],
          'id': 'ff1274c0-c6f5-476e-944a-3bcac9b5af6a',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Beyblade VForce: Ultimate Blader Jam',
          'start': {
            'setup': 600000,
            'ref': 'ff1274c0-c6f5-476e-944a-3bcac9b5af6a',
            'type': 'endOf'
          },
          'end': {
            'duration': 1380000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'GBP',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'lennart_underscore'
            }
          ],
          'id': 'c732fe0e-925e-490c-979d-61b4dacaa70a',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Snake Pass',
          'start': {
            'setup': 600000,
            'ref': 'c732fe0e-925e-490c-979d-61b4dacaa70a',
            'type': 'endOf'
          },
          'end': {
            'duration': 2700000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any% (NG+)'
          },
          'people': [
            {
              'name': 'Jetsa (aka Flotsa)'
            }
          ],
          'id': 'fd7e5d31-faa1-43f0-b099-5674d61fe4c9',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Pikmin 3',
          'start': {
            'setup': 600000,
            'ref': 'fd7e5d31-faa1-43f0-b099-5674d61fe4c9',
            'type': 'endOf'
          },
          'end': {
            'duration': 2400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'Wii U',
            'Note': null,
            'Category': 'Collect Treasures (No DLC)'
          },
          'people': [
            {
              'name': '360Chrism'
            }
          ],
          'id': '2d780ea0-6475-4bc8-9475-3d54a06b4dcb',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'ibb & obb',
          'start': {
            'setup': 600000,
            'ref': '2d780ea0-6475-4bc8-9475-3d54a06b4dcb',
            'type': 'endOf'
          },
          'end': {
            'duration': 1800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Co-Op',
            'Category': 'Any% (Co-Op)'
          },
          'people': [
            {
              'name': 'emptysys'
            },
            {
              'name': 'OsZ_'
            }
          ],
          'id': 'aa431da6-4423-4790-a806-b0fdec081729',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Dust: An Elysian Tail',
          'start': {
            'setup': 600000,
            'ref': 'aa431da6-4423-4790-a806-b0fdec081729',
            'type': 'endOf'
          },
          'end': {
            'duration': 1380000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'acridstingray3'
            }
          ],
          'id': 'd6a70b76-7a06-4cf1-bf9d-bfd81374034f',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Solstice: Quest for the Staff of Demnos',
          'start': {
            'setup': 600000,
            'ref': 'd6a70b76-7a06-4cf1-bf9d-bfd81374034f',
            'type': 'endOf'
          },
          'end': {
            'duration': 600000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'NES',
            'Note': 'Intermission',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Niss3'
            }
          ],
          'id': '57cea955-160a-42fd-8e00-9d5034347e5f',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'BattleBlock Theater',
          'start': {
            'setup': 600000,
            'ref': '57cea955-160a-42fd-8e00-9d5034347e5f',
            'type': 'endOf'
          },
          'end': {
            'duration': 5160000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Solo vs. Co-Op',
            'Category': 'Any% (NLS)'
          },
          'people': [
            {
              'name': 'Paulister'
            },
            {
              'name': 'HaosEdge'
            },
            {
              'name': 'SeductiveSpatula'
            }
          ],
          'id': 'a04391b9-220f-46b4-b3d9-cc612f684c13',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Ori and the Blind Forest Definitive Edition',
          'start': {
            'setup': 600000,
            'ref': 'a04391b9-220f-46b4-b3d9-cc612f684c13',
            'type': 'endOf'
          },
          'end': {
            'duration': 3600000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'SETUP GAME',
            'Category': 'All Cells (No Restrictions)'
          },
          'people': [
            {
              'name': 'Jitaenow'
            }
          ],
          'id': '40c9dd38-c5c3-42f8-8ed1-5f9dc1ee377e',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'GeoGuessr',
          'start': {
            'setup': 480000,
            'ref': '40c9dd38-c5c3-42f8-8ed1-5f9dc1ee377e',
            'type': 'endOf'
          },
          'end': {
            'duration': 1800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Co-Op',
            'Category': 'Co-Op'
          },
          'people': [
            {
              'name': 'havrd'
            },
            {
              'name': 'Janmumrik'
            }
          ],
          'id': 'cf3c61a6-02e7-46b7-9406-79b90d60b2aa',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Halo 3',
          'start': {
            'setup': 60000,
            'ref': 'cf3c61a6-02e7-46b7-9406-79b90d60b2aa',
            'type': 'endOf'
          },
          'end': {
            'duration': 6000000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'XBOX 360',
            'Note': null,
            'Category': 'Legendary'
          },
          'people': [
            {
              'name': 'Sorix'
            }
          ],
          'id': 'e0d79ca9-3853-410e-bca1-bf32ebf70f39',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Daikatana',
          'start': {
            'setup': 600000,
            'ref': 'e0d79ca9-3853-410e-bca1-bf32ebf70f39',
            'type': 'endOf'
          },
          'end': {
            'duration': 3600000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'SphereMJ'
            }
          ],
          'id': '6441dc2b-d74b-47c2-9831-49221e721b22',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Serious Sam: The First Encounter',
          'start': {
            'setup': 600000,
            'ref': '6441dc2b-d74b-47c2-9831-49221e721b22',
            'type': 'endOf'
          },
          'end': {
            'duration': 2700000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any% (Tourist)'
          },
          'people': [
            {
              'name': 'Kykystas'
            }
          ],
          'id': '22c7678b-ccb0-4277-8dd4-6950e934d381',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Doom: Scythe',
          'start': {
            'setup': 240000,
            'ref': '22c7678b-ccb0-4277-8dd4-6950e934d381',
            'type': 'endOf'
          },
          'end': {
            'duration': 1260000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'UV-Speed'
          },
          'people': [
            {
              'name': '4shockblast'
            }
          ],
          'id': 'ff410ffc-4daa-45f8-b4a5-ef49233d19b0',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Outlast',
          'start': {
            'setup': 420000,
            'ref': 'ff410ffc-4daa-45f8-b4a5-ef49233d19b0',
            'type': 'endOf'
          },
          'end': {
            'duration': 600000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'catalystz'
            }
          ],
          'id': 'f68f23e1-944a-43b0-b6e4-5dcaa584b704',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Amnesia: The Dark Descent',
          'start': {
            'setup': 1080000,
            'ref': 'f68f23e1-944a-43b0-b6e4-5dcaa584b704',
            'type': 'endOf'
          },
          'end': {
            'duration': 1920000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'RabzZ'
            }
          ],
          'id': '8cf6c84a-bebe-4ff9-9840-7626b3c2d02a',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'S.T.A.L.K.E.R.: Shadow of Chernobyl',
          'start': {
            'setup': 600000,
            'ref': '8cf6c84a-bebe-4ff9-9840-7626b3c2d02a',
            'type': 'endOf'
          },
          'end': {
            'duration': 5400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'All Main Missions'
          },
          'people': [
            {
              'name': 'antidotsrd'
            }
          ],
          'id': '3e0a7275-7a69-44b7-a3cd-07b2206676ce',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Silent Hill 3',
          'start': {
            'setup': 600000,
            'ref': '3e0a7275-7a69-44b7-a3cd-07b2206676ce',
            'type': 'endOf'
          },
          'end': {
            'duration': 3300000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'NG (Easy)'
          },
          'people': [
            {
              'name': 'Punchi'
            }
          ],
          'id': 'ce3618a9-36fc-4342-a31c-ce0d7a8ef6ba',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Nioh',
          'start': {
            'setup': 600000,
            'ref': 'ce3618a9-36fc-4342-a31c-ce0d7a8ef6ba',
            'type': 'endOf'
          },
          'end': {
            'duration': 6600000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PS4',
            'Note': null,
            'Category': 'All Main Missions Vanilla'
          },
          'people': [
            {
              'name': 'AxelSaGo'
            }
          ],
          'id': 'd30b1ad9-226a-4150-a5af-dd27ae4619a2',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Horizon Zero Dawn',
          'start': {
            'setup': 600000,
            'ref': 'd30b1ad9-226a-4150-a5af-dd27ae4619a2',
            'type': 'endOf'
          },
          'end': {
            'duration': 8400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PS4',
            'Note': null,
            'Category': 'Any% (NG+ Ultra Hard)'
          },
          'people': [
            {
              'name': 'ElkjaerTV'
            }
          ],
          'id': '853d6e90-7b17-480f-81c8-c77bc5167b61',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Little Nightmares',
          'start': {
            'setup': 600000,
            'ref': '853d6e90-7b17-480f-81c8-c77bc5167b61',
            'type': 'endOf'
          },
          'end': {
            'duration': 2700000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Yajijy_'
            }
          ],
          'id': 'eaea7b8c-bd97-46a1-9898-577bce589c66',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Q.U.B.E. 2',
          'start': {
            'setup': 600000,
            'ref': 'eaea7b8c-bd97-46a1-9898-577bce589c66',
            'type': 'endOf'
          },
          'end': {
            'duration': 4800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any% (No Numpad Skips)'
          },
          'people': [
            {
              'name': 'Fatzke'
            },
            {
              'name': 'eTholon'
            }
          ],
          'id': '43a4dcfb-0f38-48e1-a3cc-35be04d23766',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Densha de D: Lightning Stage',
          'start': {
            'setup': 900000,
            'ref': '43a4dcfb-0f38-48e1-a3cc-35be04d23766',
            'type': 'endOf'
          },
          'end': {
            'duration': 1500000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Race',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Jugachi'
            },
            {
              'name': 'Lordmau5'
            }
          ],
          'id': '5973e067-52e3-4a77-a201-6a7ec207feb4',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Need for Speed: Most Wanted (2005)',
          'start': {
            'setup': 600000,
            'ref': '5973e067-52e3-4a77-a201-6a7ec207feb4',
            'type': 'endOf'
          },
          'end': {
            'duration': 13800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'KuruHS'
            }
          ],
          'id': '111b1146-0c47-4c07-8271-ddc70d0ac80c',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Bionic Commando Rearmed',
          'start': {
            'setup': 600000,
            'ref': '111b1146-0c47-4c07-8271-ddc70d0ac80c',
            'type': 'endOf'
          },
          'end': {
            'duration': 2400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'ViewtifulViktor'
            }
          ],
          'id': 'cc41ccff-b8ee-460a-9cc3-884ef6d2846b',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Sonic the Hedgehog 2',
          'start': {
            'setup': 420000,
            'ref': 'cc41ccff-b8ee-460a-9cc3-884ef6d2846b',
            'type': 'endOf'
          },
          'end': {
            'duration': 1500000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'Genesis',
            'Note': 'Race',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Oldclov'
            },
            {
              'name': 'linkboss'
            }
          ],
          'id': '913f0645-f4dd-4d87-aabf-e39d94043f5e',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Rot Gut',
          'start': {
            'setup': 1560000,
            'ref': '913f0645-f4dd-4d87-aabf-e39d94043f5e',
            'type': 'endOf'
          },
          'end': {
            'duration': 300000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Intermission',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Sajiki'
            }
          ],
          'id': 'bdb817c9-8293-45dd-83b5-2ed0d931aef0',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Mega Man 2',
          'start': {
            'setup': 600000,
            'ref': 'bdb817c9-8293-45dd-83b5-2ed0d931aef0',
            'type': 'endOf'
          },
          'end': {
            'duration': 2100000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'NES',
            'Note': 'Race',
            'Category': 'Any% (Difficult)'
          },
          'people': [
            {
              'name': 'COOLKID'
            },
            {
              'name': 'EndySWE'
            }
          ],
          'id': '4d9c9d4b-6de6-4acd-85f3-bfda5672c507',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Mega Man 5',
          'start': {
            'setup': 600000,
            'ref': '4d9c9d4b-6de6-4acd-85f3-bfda5672c507',
            'type': 'endOf'
          },
          'end': {
            'duration': 2400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'NES',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Jokaah'
            }
          ],
          'id': '9561b8fb-71bb-455c-be04-a95e6dda1f22',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Battletoads',
          'start': {
            'setup': 600000,
            'ref': '9561b8fb-71bb-455c-be04-a95e6dda1f22',
            'type': 'endOf'
          },
          'end': {
            'duration': 1020000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'NES',
            'Note': null,
            'Category': 'Any% (No Wrong Warp)'
          },
          'people': [
            {
              'name': 'TheMexicanRunner'
            }
          ],
          'id': 'f67f7199-7d34-4a7b-8f7b-3e4559cf05be',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Castlevania',
          'start': {
            'setup': 1200000,
            'ref': 'f67f7199-7d34-4a7b-8f7b-3e4559cf05be',
            'type': 'endOf'
          },
          'end': {
            'duration': 900000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'NES',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'EndySWE'
            }
          ],
          'id': 'bdf311b3-c569-4a18-aff1-13c80f4ffbe9',
          'parent': 'ESAS18Main'
        },
        {
          'name': "Castlevania II: Simon's Quest",
          'start': {
            'setup': 600000,
            'ref': 'bdf311b3-c569-4a18-aff1-13c80f4ffbe9',
            'type': 'endOf'
          },
          'end': {
            'duration': 2640000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'NES',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Burb__'
            }
          ],
          'id': '67b52fcc-1dda-4cf6-a6af-552d14a6acfa',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Firestriker',
          'start': {
            'setup': 120000,
            'ref': '67b52fcc-1dda-4cf6-a6af-552d14a6acfa',
            'type': 'endOf'
          },
          'end': {
            'duration': 1800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'SNES',
            'Note': 'Race',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'BroedgeMan'
            },
            {
              'name': 'joker_of_god'
            }
          ],
          'id': 'faadd23b-32ef-4dd5-9dba-305ada3aaa29',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Kung Fu',
          'start': {
            'setup': 120000,
            'ref': 'faadd23b-32ef-4dd5-9dba-305ada3aaa29',
            'type': 'endOf'
          },
          'end': {
            'duration': 300000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'NES',
            'Note': 'Intermission',
            'Category': 'Any% (Game A)'
          },
          'people': [
            {
              'name': 'Frippen'
            }
          ],
          'id': '78d6899a-cd2b-456e-a226-1a1df7b86378',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'The Binding of Isaac: Afterbirth+',
          'start': {
            'setup': 1020000,
            'ref': '78d6899a-cd2b-456e-a226-1a1df7b86378',
            'type': 'endOf'
          },
          'end': {
            'duration': 6600000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Race',
            'Category': 'Racing+ Season 3'
          },
          'people': [
            {
              'name': 'Shigan_'
            },
            {
              'name': 'Ceehe'
            },
            {
              'name': 'GamonymousRC'
            }
          ],
          'id': '1fd0f0c8-26de-475e-98c3-1820e80ac519',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Transistor',
          'start': {
            'setup': 1200000,
            'ref': '1fd0f0c8-26de-475e-98c3-1820e80ac519',
            'type': 'endOf'
          },
          'end': {
            'duration': 3600000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'SETUP GAME',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Cadarev'
            }
          ],
          'id': 'aaaf1e82-64e2-42c4-8508-da07f625075e',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Undertale',
          'start': {
            'setup': 600000,
            'ref': 'aaaf1e82-64e2-42c4-8508-da07f625075e',
            'type': 'endOf'
          },
          'end': {
            'duration': 6000000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'True Pacifist'
          },
          'people': [
            {
              'name': 'Firepaw'
            }
          ],
          'id': '2e4c69b7-fc1a-485f-84cb-b6f9640d5313',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'South Park: The Stick of Truth',
          'start': {
            'setup': 600000,
            'ref': '2e4c69b7-fc1a-485f-84cb-b6f9640d5313',
            'type': 'endOf'
          },
          'end': {
            'duration': 6300000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any% (Mage Current Patch)'
          },
          'people': [
            {
              'name': 'HardcoreYork'
            }
          ],
          'id': '433a5e0d-6b9b-4475-a54a-75aecdb4ac28',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Harry Potter and the Chamber of Secrets',
          'start': {
            'setup': 1200000,
            'ref': '433a5e0d-6b9b-4475-a54a-75aecdb4ac28',
            'type': 'endOf'
          },
          'end': {
            'duration': 6600000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': '100%'
          },
          'people': [
            {
              'name': 'Rasschla'
            }
          ],
          'id': '47a7a2c9-8d02-4445-8531-207ff2c0f251',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'The Legend of Zelda: Twilight Princess HD',
          'start': {
            'setup': 1200000,
            'ref': '47a7a2c9-8d02-4445-8531-207ff2c0f251',
            'type': 'endOf'
          },
          'end': {
            'duration': 14400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'Wii U',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Lolicry'
            }
          ],
          'id': 'bc83635a-3b50-4600-84ea-121e73dc9204',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Okami',
          'start': {
            'setup': 1200000,
            'ref': 'bc83635a-3b50-4600-84ea-121e73dc9204',
            'type': 'endOf'
          },
          'end': {
            'duration': 5400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PS3',
            'Note': null,
            'Category': 'Any% (NG+)'
          },
          'people': [
            {
              'name': 'Kinnin11'
            }
          ],
          'id': '84eff138-c76b-4b5c-8d46-0d1d19848a37',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Dissidia: Final Fantasy',
          'start': {
            'setup': 2100000,
            'ref': '84eff138-c76b-4b5c-8d46-0d1d19848a37',
            'type': 'endOf'
          },
          'end': {
            'duration': 6000000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PSP',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Leonis07'
            }
          ],
          'id': '38a9605d-fcb5-490b-ab32-e1ed6cb14203',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Jak and Daxter: The Precursor Legacy',
          'start': {
            'setup': 600000,
            'ref': '38a9605d-fcb5-490b-ab32-e1ed6cb14203',
            'type': 'endOf'
          },
          'end': {
            'duration': 4200000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PS2',
            'Note': null,
            'Category': 'Any% (No LTS (One-handed))'
          },
          'people': [
            {
              'name': 'SixRockFire'
            }
          ],
          'id': 'f74177cb-a59c-4893-95fc-2ec2afab2844',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Prince of Persia: Warrior Within',
          'start': {
            'setup': 600000,
            'ref': 'f74177cb-a59c-4893-95fc-2ec2afab2844',
            'type': 'endOf'
          },
          'end': {
            'duration': 1500000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any% (Normal)'
          },
          'people': [
            {
              'name': 'catalystz'
            }
          ],
          'id': 'bf9f7234-4540-4635-a36a-7b512668c637',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Darksiders',
          'start': {
            'setup': 0,
            'ref': 'bf9f7234-4540-4635-a36a-7b512668c637',
            'type': 'endOf'
          },
          'end': {
            'duration': 5400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'henyK'
            }
          ],
          'id': '7a5000a2-374a-4790-84e9-39c04307fb93',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'NieR: Automata',
          'start': {
            'setup': 0,
            'ref': '7a5000a2-374a-4790-84e9-39c04307fb93',
            'type': 'endOf'
          },
          'end': {
            'duration': 5400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Ending [A]'
          },
          'people': [
            {
              'name': 'Kanaris'
            }
          ],
          'id': '973e1365-c4ca-46aa-b0c5-ff364beb61df',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Dark Souls II',
          'start': {
            'setup': 0,
            'ref': '973e1365-c4ca-46aa-b0c5-ff364beb61df',
            'type': 'endOf'
          },
          'end': {
            'duration': 8400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Race',
            'Category': 'Reverse Boss Order'
          },
          'people': [
            {
              'name': 'Noobest'
            },
            {
              'name': 'Stennis'
            }
          ],
          'id': '313f56af-33c7-41dc-a8cb-f55305ee7738',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Shadow of the Colossus Remaster',
          'start': {
            'setup': 600000,
            'ref': '313f56af-33c7-41dc-a8cb-f55305ee7738',
            'type': 'endOf'
          },
          'end': {
            'duration': 6900000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PS4',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Elajjaz'
            }
          ],
          'id': '035559fb-bc9b-4ed5-a570-64a4cfcbe772',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Diablo II: Lord of Destruction',
          'start': {
            'setup': 600000,
            'ref': '035559fb-bc9b-4ed5-a570-64a4cfcbe772',
            'type': 'endOf'
          },
          'end': {
            'duration': 7200000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any% (Normal)'
          },
          'people': [
            {
              'name': 'Ellieceraptor'
            }
          ],
          'id': 'd51da5d7-2e4e-42db-9bd0-c47f8e4be633',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Deus Ex',
          'start': {
            'setup': 600000,
            'ref': 'd51da5d7-2e4e-42db-9bd0-c47f8e4be633',
            'type': 'endOf'
          },
          'end': {
            'duration': 3000000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Heinki'
            }
          ],
          'id': '6058c849-6f64-41d7-985c-8443553931a1',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Fallout 3',
          'start': {
            'setup': 600000,
            'ref': '6058c849-6f64-41d7-985c-8443553931a1',
            'type': 'endOf'
          },
          'end': {
            'duration': 6000000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'All Quests'
          },
          'people': [
            {
              'name': 'NoobSalmon'
            }
          ],
          'id': 'a8245c0c-1f13-42dd-9cf7-c6fc26f10a48',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Yakuza 6: The Song of Life',
          'start': {
            'setup': 600000,
            'ref': 'a8245c0c-1f13-42dd-9cf7-c6fc26f10a48',
            'type': 'endOf'
          },
          'end': {
            'duration': 11700000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PS4',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'FroobMcGuffin'
            }
          ],
          'id': 'c539a03a-5008-4602-aba3-710a11159495',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'LEGO Harry Potter: Years 5-7',
          'start': {
            'setup': 1440000,
            'ref': 'c539a03a-5008-4602-aba3-710a11159495',
            'type': 'endOf'
          },
          'end': {
            'duration': 7200000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any% (Replay Story)'
          },
          'people': [
            {
              'name': 'Ellaapiie'
            }
          ],
          'id': 'b36a31ef-0579-497f-bebb-de0425090a4e',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Grand Theft Auto IV',
          'start': {
            'setup': 960000,
            'ref': 'b36a31ef-0579-497f-bebb-de0425090a4e',
            'type': 'endOf'
          },
          'end': {
            'duration': 14400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'KyleDoesIt'
            }
          ],
          'id': 'c3e3927d-32f6-4fe9-8a94-bd11c6b8fab9',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Grand Theft Auto 2',
          'start': {
            'setup': 600000,
            'ref': 'c3e3927d-32f6-4fe9-8a94-bd11c6b8fab9',
            'type': 'endOf'
          },
          'end': {
            'duration': 2100000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Tezur0'
            }
          ],
          'id': '5a3788e0-4727-4409-b672-dae60c265035',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Final Fantasy IX',
          'start': {
            'setup': 600000,
            'ref': '5a3788e0-4727-4409-b672-dae60c265035',
            'type': 'endOf'
          },
          'end': {
            'duration': 19500000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PS2',
            'Note': 'Part 2 on Stream 2',
            'Category': 'Any% Part 1'
          },
          'people': [
            {
              'name': 'Metako'
            }
          ],
          'id': '8a1a1583-7993-452e-9040-b2624c23c0b2',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Awful Games',
          'start': {
            'setup': 1920000,
            'ref': '8a1a1583-7993-452e-9040-b2624c23c0b2',
            'type': 'endOf'
          },
          'end': {
            'duration': 1800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Relay',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'havrd'
            },
            {
              'name': 'Janmumrik'
            }
          ],
          'id': 'dcf06f90-e128-4e65-b3db-dde09c750679',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Arabian Nights',
          'start': {
            'setup': 600000,
            'ref': 'dcf06f90-e128-4e65-b3db-dde09c750679',
            'type': 'endOf'
          },
          'end': {
            'duration': 2400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any% (With Dialogue)'
          },
          'people': [
            {
              'name': 'Goost91'
            }
          ],
          'id': '44d8e883-bff7-402a-a366-a2b7149c8f3f',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Prince of Persia: The Sands of Time',
          'start': {
            'setup': 600000,
            'ref': '44d8e883-bff7-402a-a366-a2b7149c8f3f',
            'type': 'endOf'
          },
          'end': {
            'duration': 3900000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any% (Zipless) Segmented Reveal'
          },
          'people': [
            {
              'name': 'tocaloni1'
            }
          ],
          'id': '70053544-c075-47f1-ae83-111a18a7ceab',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'SUPERHOT',
          'start': {
            'setup': 600000,
            'ref': '70053544-c075-47f1-ae83-111a18a7ceab',
            'type': 'endOf'
          },
          'end': {
            'duration': 1380000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Jackintoshh'
            }
          ],
          'id': 'b2944f52-c59a-409c-bafa-27da03ce5664',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'I Wanna Kill The Kamilia 2',
          'start': {
            'setup': 600000,
            'ref': 'b2944f52-c59a-409c-bafa-27da03ce5664',
            'type': 'endOf'
          },
          'end': {
            'duration': 5400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'BBF_'
            }
          ],
          'id': '3512ae84-445d-4df3-bde8-7f943cb41ebf',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Family Guy: Back to the Multiverse',
          'start': {
            'setup': 600000,
            'ref': '3512ae84-445d-4df3-bde8-7f943cb41ebf',
            'type': 'endOf'
          },
          'end': {
            'duration': 3600000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'SETUP GAME',
            'Category': 'Any% (NG+ Co-Op)'
          },
          'people': [
            {
              'name': 'Geurge'
            },
            {
              'name': 'Hennejoe'
            }
          ],
          'id': '05138a34-a7ef-4610-8657-8b29c56269a7',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Lara Croft and the Guardian of Light',
          'start': {
            'setup': 600000,
            'ref': '05138a34-a7ef-4610-8657-8b29c56269a7',
            'type': 'endOf'
          },
          'end': {
            'duration': 1920000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Race',
            'Category': 'Any% (NG+)'
          },
          'people': [
            {
              'name': 'RandomPinkBunny'
            },
            {
              'name': 'SeductiveSpatula'
            }
          ],
          'id': '7593ede2-1866-4403-8173-c1b36b8180d7',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Tomb Raider III: Adventures of Lara Croft',
          'start': {
            'setup': 600000,
            'ref': '7593ede2-1866-4403-8173-c1b36b8180d7',
            'type': 'endOf'
          },
          'end': {
            'duration': 4800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'eidgod'
            }
          ],
          'id': '741a9eaf-69b8-4547-b198-8be2f5d665ca',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Tomb Raider: The Angel of Darkness',
          'start': {
            'setup': 600000,
            'ref': '741a9eaf-69b8-4547-b198-8be2f5d665ca',
            'type': 'endOf'
          },
          'end': {
            'duration': 1800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Cadarev'
            }
          ],
          'id': 'e94130e5-22ee-4273-a6fd-31706a32747d',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'BioShock Infinite',
          'start': {
            'setup': 600000,
            'ref': 'e94130e5-22ee-4273-a6fd-31706a32747d',
            'type': 'endOf'
          },
          'end': {
            'duration': 6600000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'henyK'
            }
          ],
          'id': '09d87570-cfbe-4dcb-a618-2c36574619a5',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'WarioWare: Smooth Moves',
          'start': {
            'setup': 600000,
            'ref': '09d87570-cfbe-4dcb-a618-2c36574619a5',
            'type': 'endOf'
          },
          'end': {
            'duration': 3180000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'Wii',
            'Note': 'Race',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'ChriSoofy'
            },
            {
              'name': 'Ellaapiie'
            }
          ],
          'id': '23d80b1f-6cfc-45f9-9887-83d75b5cdd3d',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Jak II',
          'start': {
            'setup': 1200000,
            'ref': '23d80b1f-6cfc-45f9-9887-83d75b5cdd3d',
            'type': 'endOf'
          },
          'end': {
            'duration': 4200000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PS3',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Boomer'
            }
          ],
          'id': 'a8e4f378-5bd1-427f-9d2c-68b95c02925a',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'The Legend of Zelda: A Link Between Worlds',
          'start': {
            'setup': 1200000,
            'ref': 'a8e4f378-5bd1-427f-9d2c-68b95c02925a',
            'type': 'endOf'
          },
          'end': {
            'duration': 12000000,
            'type': 'duration'
          },
          'data': {
            'Platform': '3DS',
            'Note': null,
            'Category': '100%'
          },
          'people': [
            {
              'name': 'Herreteman'
            }
          ],
          'id': 'f6fece85-bbdc-434c-a39f-0486b41a69d1',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Bastion',
          'start': {
            'setup': 960000,
            'ref': 'f6fece85-bbdc-434c-a39f-0486b41a69d1',
            'type': 'endOf'
          },
          'end': {
            'duration': 4500000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Race',
            'Category': 'Dreams and Challenges'
          },
          'people': [
            {
              'name': 'acridstingray3'
            },
            {
              'name': 'HaosEdge'
            },
            {
              'name': 'Kazzadan'
            },
            {
              'name': 'Leonmachar'
            }
          ],
          'id': '172f09a7-dc90-408f-a9e4-a1aec3027494',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Light Fall',
          'start': {
            'setup': 600000,
            'ref': '172f09a7-dc90-408f-a9e4-a1aec3027494',
            'type': 'endOf'
          },
          'end': {
            'duration': 2100000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any% (Normal)'
          },
          'people': [
            {
              'name': 'Dedew'
            }
          ],
          'id': 'a873a1ff-586c-4396-aa04-d290db02832b',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Run Invalid',
          'start': {
            'setup': 600000,
            'ref': 'a873a1ff-586c-4396-aa04-d290db02832b',
            'type': 'endOf'
          },
          'end': {
            'duration': 1800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Routing Competition',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'havrd'
            },
            {
              'name': 'Strife'
            }
          ],
          'id': 'b6c683aa-beeb-45d0-ae3d-660e99745165',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Celeste',
          'start': {
            'setup': 120000,
            'ref': 'b6c683aa-beeb-45d0-ae3d-660e99745165',
            'type': 'endOf'
          },
          'end': {
            'duration': 3000000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Punchi'
            }
          ],
          'id': '580f7e77-6617-4baf-982d-60cd4ab8ee39',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Donkey Kong 5: The Journey of Over Time and Space',
          'start': {
            'setup': 120000,
            'ref': '580f7e77-6617-4baf-982d-60cd4ab8ee39',
            'type': 'endOf'
          },
          'end': {
            'duration': 420000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'GBP',
            'Note': 'Intermission',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'CDRomatron'
            }
          ],
          'id': 'b343aecf-af36-4284-a915-d170f3a1b6bb',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'VVVVVV',
          'start': {
            'setup': 600000,
            'ref': 'b343aecf-af36-4284-a915-d170f3a1b6bb',
            'type': 'endOf'
          },
          'end': {
            'duration': 780000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Race',
            'Category': 'Any% (No Telejumping)'
          },
          'people': [
            {
              'name': 'mohoc'
            },
            {
              'name': 'tzann'
            },
            {
              'name': 'lennart_underscore'
            }
          ],
          'id': '77a94163-cc48-4bc4-ab63-e069c317ead7',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'I Wanna Be The Boshy',
          'start': {
            'setup': 120000,
            'ref': '77a94163-cc48-4bc4-ab63-e069c317ead7',
            'type': 'endOf'
          },
          'end': {
            'duration': 4200000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any% (Rage-Mode)'
          },
          'people': [
            {
              'name': 'BBF_'
            }
          ],
          'id': '31e06a79-bd52-4a53-82a6-6c18eb16b036',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Nitronic Rush',
          'start': {
            'setup': 120000,
            'ref': '31e06a79-bd52-4a53-82a6-6c18eb16b036',
            'type': 'endOf'
          },
          'end': {
            'duration': 600000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Intermission',
            'Category': 'Story Mode'
          },
          'people': [
            {
              'name': 'Lordmau5'
            }
          ],
          'id': '41657e12-9304-48c2-9b95-496310167309',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Tetris The Grand Master',
          'start': {
            'setup': 1680000,
            'ref': '41657e12-9304-48c2-9b95-496310167309',
            'type': 'endOf'
          },
          'end': {
            'duration': 2700000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'Arcade',
            'Note': null,
            'Category': 'Exhibition'
          },
          'people': [
            {
              'name': 'TC_Qlex'
            }
          ],
          'id': '5b693e91-e28c-4258-a2aa-9f7bb485e1ae',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Tekken 7',
          'start': {
            'setup': 600000,
            'ref': '5b693e91-e28c-4258-a2aa-9f7bb485e1ae',
            'type': 'endOf'
          },
          'end': {
            'duration': 2100000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any% (3 Stars)'
          },
          'people': [
            {
              'name': 'Shirdel'
            }
          ],
          'id': '83f40ef1-3d6a-4351-8f92-8cb4aa120620',
          'parent': 'ESAS18Main'
        },
        {
          'name': "Mike Tyson's Punch-Out!!",
          'start': {
            'setup': 600000,
            'ref': '83f40ef1-3d6a-4351-8f92-8cb4aa120620',
            'type': 'endOf'
          },
          'end': {
            'duration': 1500000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'NES',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'sinister1'
            }
          ],
          'id': 'df17589a-70e5-4a7c-a400-8250051fd355',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Adventure Island II',
          'start': {
            'setup': 600000,
            'ref': 'df17589a-70e5-4a7c-a400-8250051fd355',
            'type': 'endOf'
          },
          'end': {
            'duration': 1800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'NES',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'TheMexicanRunner'
            }
          ],
          'id': 'b7c98475-d68f-4de8-ac42-e1848ff1b53a',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Batman: The Video Game',
          'start': {
            'setup': 600000,
            'ref': 'b7c98475-d68f-4de8-ac42-e1848ff1b53a',
            'type': 'endOf'
          },
          'end': {
            'duration': 900000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'NES',
            'Note': 'Race',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Dxtr'
            },
            {
              'name': 'EndySWE'
            }
          ],
          'id': '550f7c03-2251-45b1-b436-909176784a38',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Strider',
          'start': {
            'setup': 600000,
            'ref': '550f7c03-2251-45b1-b436-909176784a38',
            'type': 'endOf'
          },
          'end': {
            'duration': 480000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'NES',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'COOLKID'
            }
          ],
          'id': '201002ea-aaa7-478a-8552-a8b2f978a34f',
          'parent': 'ESAS18Main'
        },
        {
          'name': "Demon's Crest",
          'start': {
            'setup': 300000,
            'ref': '201002ea-aaa7-478a-8552-a8b2f978a34f',
            'type': 'endOf'
          },
          'end': {
            'duration': 3000000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'SNES',
            'Note': null,
            'Category': '100%'
          },
          'people': [
            {
              'name': 'BroedgeMan'
            }
          ],
          'id': '5b5bef0f-28a2-4336-893d-d9d9c58b68e3',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Ratchet: Deadlocked',
          'start': {
            'setup': 0,
            'ref': '5b5bef0f-28a2-4336-893d-d9d9c58b68e3',
            'type': 'endOf'
          },
          'end': {
            'duration': 3300000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PS3',
            'Note': null,
            'Category': 'Any% (NG+ no EGS)'
          },
          'people': [
            {
              'name': 'Mucke1Man'
            }
          ],
          'id': 'c3567713-f075-4f57-b3ef-8e4a9d0bc134',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Dishonored 2',
          'start': {
            'setup': 120000,
            'ref': 'c3567713-f075-4f57-b3ef-8e4a9d0bc134',
            'type': 'endOf'
          },
          'end': {
            'duration': 2280000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Corvo Any%'
          },
          'people': [
            {
              'name': 'Scopii'
            }
          ],
          'id': '99448087-5767-41b0-8c78-0af381643b1e',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Dishonored: Death of the Outsider',
          'start': {
            'setup': 600000,
            'ref': '99448087-5767-41b0-8c78-0af381643b1e',
            'type': 'endOf'
          },
          'end': {
            'duration': 1080000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Scopii'
            }
          ],
          'id': '7ef1a633-abea-4743-8309-38af8047f91b',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'The Witness',
          'start': {
            'setup': 0,
            'ref': '7ef1a633-abea-4743-8309-38af8047f91b',
            'type': 'endOf'
          },
          'end': {
            'duration': 1200000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any% (Current Patch)'
          },
          'people': [
            {
              'name': 'tzann'
            }
          ],
          'id': 'a154a1e3-2f9e-448d-a023-3d69c6c1a82b',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Pok\u00e9mon Platinum',
          'start': {
            'setup': 600000,
            'ref': 'a154a1e3-2f9e-448d-a023-3d69c6c1a82b',
            'type': 'endOf'
          },
          'end': {
            'duration': 11700000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'DS',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Retrotato'
            }
          ],
          'id': '03ca0608-01bf-414b-b3fc-0e16fe5c4eab',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Solar Jetman',
          'start': {
            'setup': 600000,
            'ref': '03ca0608-01bf-414b-b3fc-0e16fe5c4eab',
            'type': 'endOf'
          },
          'end': {
            'duration': 2400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'NES',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'TheMotherBrain86'
            }
          ],
          'id': 'a57580e8-cb07-4a63-8ae8-e5374f818245',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Taz-Mania',
          'start': {
            'setup': 600000,
            'ref': 'a57580e8-cb07-4a63-8ae8-e5374f818245',
            'type': 'endOf'
          },
          'end': {
            'duration': 900000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'Master System',
            'Note': 'Race',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'COOLKID'
            },
            {
              'name': 'KrazyRasmus'
            }
          ],
          'id': '995fc44a-7c8b-45bb-b360-be0842b82dfa',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Yume Penguin Monogatari',
          'start': {
            'setup': 600000,
            'ref': '995fc44a-7c8b-45bb-b360-be0842b82dfa',
            'type': 'endOf'
          },
          'end': {
            'duration': 720000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'NES',
            'Note': 'Race',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'CartinaCow'
            },
            {
              'name': 'EndySWE'
            }
          ],
          'id': '43068dcd-4a3c-424a-81f6-0f63c48c09c0',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Super Metroid',
          'start': {
            'setup': 600000,
            'ref': '43068dcd-4a3c-424a-81f6-0f63c48c09c0',
            'type': 'endOf'
          },
          'end': {
            'duration': 5100000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'SNES',
            'Note': null,
            'Category': '100%'
          },
          'people': [
            {
              'name': 'Enmet'
            }
          ],
          'id': '807c5aaa-dda5-4f4b-8e6a-30e8f5a0a091',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Kirby Super Star Ultra',
          'start': {
            'setup': 1980000,
            'ref': '807c5aaa-dda5-4f4b-8e6a-30e8f5a0a091',
            'type': 'endOf'
          },
          'end': {
            'duration': 7800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'DS',
            'Note': null,
            'Category': '100%'
          },
          'people': [
            {
              'name': 'Kinnin11'
            }
          ],
          'id': 'b7ec8314-a15c-4cf6-a139-c5b9b8cc8308',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Super Mario 64',
          'start': {
            'setup': 2220000,
            'ref': 'b7ec8314-a15c-4cf6-a139-c5b9b8cc8308',
            'type': 'endOf'
          },
          'end': {
            'duration': 7200000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'Wii',
            'Note': null,
            'Category': '70 Star Relay Race'
          },
          'people': [
            {
              'name': 'Fuzzyness & Friends'
            }
          ],
          'id': 'bd76e212-6aad-4d30-8530-c68565fa8c15',
          'parent': 'ESAS18Main'
        },
        {
          'name': "Mirror's Edge",
          'start': {
            'setup': 600000,
            'ref': 'bd76e212-6aad-4d30-8530-c68565fa8c15',
            'type': 'endOf'
          },
          'end': {
            'duration': 3000000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': '100%'
          },
          'people': [
            {
              'name': 'Phillotrax'
            }
          ],
          'id': 'bf18058f-cc92-4e57-ae89-3efc7e41c8fd',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Dark Souls',
          'start': {
            'setup': 120000,
            'ref': 'bf18058f-cc92-4e57-ae89-3efc7e41c8fd',
            'type': 'endOf'
          },
          'end': {
            'duration': 5700000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'All Bosses'
          },
          'people': [
            {
              'name': 'Kahmul78'
            }
          ],
          'id': '3fdd248b-7fd5-4c94-af77-e20d0fb15176',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Dark Souls',
          'start': {
            'setup': 840000,
            'ref': '3fdd248b-7fd5-4c94-af77-e20d0fb15176',
            'type': 'endOf'
          },
          'end': {
            'duration': 1200000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Glitch Exhibition'
          },
          'people': [
            {
              'name': 'Kahmul78'
            }
          ],
          'id': '120504cc-c9df-48b5-a4cb-3aee53e8b037',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Dark Souls (Remastered)',
          'start': {
            'setup': 600000,
            'ref': '120504cc-c9df-48b5-a4cb-3aee53e8b037',
            'type': 'endOf'
          },
          'end': {
            'duration': 3600000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Race',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'SayviTV'
            },
            {
              'name': 'Elajjaz'
            }
          ],
          'id': '557f1a28-33d1-41ef-8c10-6b887200dd6f',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Star Wars Jedi Knight: Jedi Academy',
          'start': {
            'setup': 600000,
            'ref': '557f1a28-33d1-41ef-8c10-6b887200dd6f',
            'type': 'endOf'
          },
          'end': {
            'duration': 2100000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Race',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'praskOo_'
            },
            {
              'name': 'Savusukka'
            },
            {
              'name': 'AerO__'
            }
          ],
          'id': 'd7dcdb61-ff12-4849-9c71-8d946cbab31a',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Hitman: Blood Money',
          'start': {
            'setup': 600000,
            'ref': 'd7dcdb61-ff12-4849-9c71-8d946cbab31a',
            'type': 'endOf'
          },
          'end': {
            'duration': 2820000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Silent Assassin'
          },
          'people': [
            {
              'name': 'TheKotti'
            }
          ],
          'id': '69c17850-0172-47e6-87aa-7f3312853d4a',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Quake',
          'start': {
            'setup': 360000,
            'ref': '69c17850-0172-47e6-87aa-7f3312853d4a',
            'type': 'endOf'
          },
          'end': {
            'duration': 1200000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': 'Race',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'brainfluid'
            },
            {
              'name': 'praskOo_'
            }
          ],
          'id': '3aac6019-1d43-413b-a878-ad4608fbd469',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Half-Life',
          'start': {
            'setup': 360000,
            'ref': '3aac6019-1d43-413b-a878-ad4608fbd469',
            'type': 'endOf'
          },
          'end': {
            'duration': 2100000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any% Scriptless'
          },
          'people': [
            {
              'name': 'Maxam1337'
            }
          ],
          'id': 'c73d6eca-4bf5-4323-bbb8-418144347258',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Deus Ex: Human Revolution',
          'start': {
            'setup': 600000,
            'ref': 'c73d6eca-4bf5-4323-bbb8-418144347258',
            'type': 'endOf'
          },
          'end': {
            'duration': 3000000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Heinki'
            }
          ],
          'id': 'c4266377-0588-42b9-8b6e-dbb360ddf956',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Prey (2017)',
          'start': {
            'setup': 600000,
            'ref': 'c4266377-0588-42b9-8b6e-dbb360ddf956',
            'type': 'endOf'
          },
          'end': {
            'duration': 1200000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Janmumrik'
            }
          ],
          'id': '9fdbd9d1-827d-4da2-9ade-a9184e7aac81',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Dying Light',
          'start': {
            'setup': 600000,
            'ref': '9fdbd9d1-827d-4da2-9ade-a9184e7aac81',
            'type': 'endOf'
          },
          'end': {
            'duration': 7200000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'WolfE87'
            }
          ],
          'id': '3fb5e3ef-3c14-4788-8887-501d367177ca',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Minecraft: Java Edition',
          'start': {
            'setup': 600000,
            'ref': '3fb5e3ef-3c14-4788-8887-501d367177ca',
            'type': 'endOf'
          },
          'end': {
            'duration': 900000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any% (Glitchless Set Seed)'
          },
          'people': [
            {
              'name': 'SpoonTy'
            }
          ],
          'id': '01e78843-202b-4416-a904-e2f8647e36da',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Hearthstone: League of Explorers',
          'start': {
            'setup': 780000,
            'ref': '01e78843-202b-4416-a904-e2f8647e36da',
            'type': 'endOf'
          },
          'end': {
            'duration': 6000000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Heroic'
          },
          'people': [
            {
              'name': 'srd_27'
            }
          ],
          'id': '294d40ea-2662-48ee-9bab-e0780e5f6881',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Sonic Forces',
          'start': {
            'setup': 600000,
            'ref': '294d40ea-2662-48ee-9bab-e0780e5f6881',
            'type': 'endOf'
          },
          'end': {
            'duration': 3900000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Akaraien'
            }
          ],
          'id': 'cdb16df7-ace4-45d5-80b2-a0c6ff5313a4',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Sonic Mania',
          'start': {
            'setup': 600000,
            'ref': 'cdb16df7-ace4-45d5-80b2-a0c6ff5313a4',
            'type': 'endOf'
          },
          'end': {
            'duration': 3900000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'Sonic & Tails (All Emeralds)'
          },
          'people': [
            {
              'name': 'Argick'
            }
          ],
          'id': '881a5fcb-4f36-4adc-b8bd-094feb7d5bb1',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'The Legend of Spyro: The Eternal Night',
          'start': {
            'setup': 960000,
            'ref': '881a5fcb-4f36-4adc-b8bd-094feb7d5bb1',
            'type': 'endOf'
          },
          'end': {
            'duration': 2100000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'GBA',
            'Note': 'Race',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'CDRomatron'
            },
            {
              'name': 'LoveBot'
            }
          ],
          'id': 'b5228e47-b185-43bc-8dc8-c45a539e34b3',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Kingdom Hearts Birth by Sleep Final Mix HD',
          'start': {
            'setup': 780000,
            'ref': 'b5228e47-b185-43bc-8dc8-c45a539e34b3',
            'type': 'endOf'
          },
          'end': {
            'duration': 3600000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PS4',
            'Note': null,
            'Category': 'Any% (Terra Beginner)'
          },
          'people': [
            {
              'name': 'RebelDragon95'
            }
          ],
          'id': '9ca21dda-b721-49fd-be2b-39fd17969a64',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Kirby & The Amazing Mirror',
          'start': {
            'setup': 600000,
            'ref': '9ca21dda-b721-49fd-be2b-39fd17969a64',
            'type': 'endOf'
          },
          'end': {
            'duration': 1800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'GBP',
            'Note': 'Co-Op',
            'Category': 'Any% (Co-Op)'
          },
          'people': [
            {
              'name': 'Kinnin11'
            },
            {
              'name': 'Sniperwave'
            }
          ],
          'id': '9626b1a2-ba90-4e4f-8916-21499e2f2394',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'The Legend of Zelda: Ocarina of Time',
          'start': {
            'setup': 600000,
            'ref': '9626b1a2-ba90-4e4f-8916-21499e2f2394',
            'type': 'endOf'
          },
          'end': {
            'duration': 7800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'Wii',
            'Note': null,
            'Category': 'MST'
          },
          'people': [
            {
              'name': 'Amateseru'
            }
          ],
          'id': '0903ceb4-afa1-475a-b753-4a95d6608e5f',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'The Legend of Zelda: The Wind Waker HD',
          'start': {
            'setup': 1680000,
            'ref': '0903ceb4-afa1-475a-b753-4a95d6608e5f',
            'type': 'endOf'
          },
          'end': {
            'duration': 4500000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'Wii U',
            'Note': null,
            'Category': 'Any%'
          },
          'people': [
            {
              'name': 'Linkus7'
            }
          ],
          'id': 'f7278d0f-9e7e-426b-81f4-79cb9eca27d9',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Super Mario Odyssey',
          'start': {
            'setup': 600000,
            'ref': 'f7278d0f-9e7e-426b-81f4-79cb9eca27d9',
            'type': 'endOf'
          },
          'end': {
            'duration': 4800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'Switch',
            'Note': 'Race',
            'Category': 'Any%'
          },
          'people': [
            {
              'name': '360Chrism'
            },
            {
              'name': 'Isaia'
            },
            {
              'name': 'Yoshim_'
            }
          ],
          'id': '77491042-ab71-486a-b641-14f196b286cc',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Grand Theft Auto III',
          'start': {
            'setup': 0,
            'ref': '77491042-ab71-486a-b641-14f196b286cc',
            'type': 'endOf'
          },
          'end': {
            'duration': 11400000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'PC',
            'Note': null,
            'Category': 'All Missions'
          },
          'people': [
            {
              'name': 'UltimaOmega07'
            }
          ],
          'id': '76ca019c-0cf8-4336-b0b6-ec780bceda89',
          'parent': 'ESAS18Main'
        },
        {
          'name': 'Best of NES - BIG10',
          'start': {
            'setup': 600000,
            'ref': '76ca019c-0cf8-4336-b0b6-ec780bceda89',
            'type': 'endOf'
          },
          'end': {
            'duration': 10800000,
            'type': 'duration'
          },
          'data': {
            'Platform': 'NES',
            'Note': null,
            'Category': 'Various'
          },
          'people': [
            {
              'name': 'InfestedRiche'
            },
            {
              'name': 'COOLKID'
            },
            {
              'name': 'Yogidamonk'
            },
            {
              'name': 'JkL87'
            }
          ],
          'id': 'b427ee66-3c90-4aca-bc2f-0a57151fdf2e',
          'parent': 'ESAS18Main'
        }
      ]
    },
    {
      name: 'Second Stream',
      id: 'ESAS18Second',
      dataItems: [
        {
          name: 'Platform',
          type: String
        },
        {
          name: 'Category',
          type: String
        },
        {
          name: 'Note',
          type: String
        }
      ],
      elements: [
        {
          'end': {
            'type': 'duration',
            'duration': 18600000
          },
          'id': '39ac9bf5-952b-4a98-b8c7-d6606d1c769c',
          'parent': 'ESAS18Second',
          'start': {
            'time': 1532264400000,
            'type': 'absolute'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any% (NG)',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'FellVisage'
            }
          ],
          'name': 'Tales of Berseria'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 3900000
          },
          'id': '6ef9a638-a862-4e77-9edc-8d6dfe5d47b4',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '39ac9bf5-952b-4a98-b8c7-d6606d1c769c',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'All Bosses',
            'Platform': 'Switch'
          },
          'people': [
            {
              'name': 'Wiredwicky'
            }
          ],
          'name': 'Blossom Tales: The Sleeping King'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 2100000
          },
          'id': '4b8d9353-cb5a-4f3d-842c-2f3f138ecdb6',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '6ef9a638-a862-4e77-9edc-8d6dfe5d47b4',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'Any%',
            'Platform': 'Megadrive'
          },
          'people': [
            {
              'name': 'TC_Qlex'
            }
          ],
          'name': 'Ristar'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1800000
          },
          'id': '5343acf3-9e33-4673-85c9-9d852d4a23ee',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '4b8d9353-cb5a-4f3d-842c-2f3f138ecdb6',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': '100%',
            'Platform': 'N64'
          },
          'people': [
            {
              'name': 'DanteDoes'
            }
          ],
          'name': 'Pok\u00e9mon Snap'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 6900000
          },
          'id': '85f5e250-ffd8-41f0-88ee-8d9998e5cb51',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '5343acf3-9e33-4673-85c9-9d852d4a23ee',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'No Major Skips',
            'Platform': 'PS2'
          },
          'people': [
            {
              'name': 'zoton2'
            }
          ],
          'name': "Dog's Life"
        },
        {
          'end': {
            'type': 'duration',
            'duration': 6600000
          },
          'id': 'f2845ce3-acb7-4e75-9eac-676d674fdb78',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '85f5e250-ffd8-41f0-88ee-8d9998e5cb51',
            'setup': 0,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any% Legacy (Casual)',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'Chfou'
            }
          ],
          'name': 'Chroma Squad'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1200000
          },
          'id': '7e9f50f3-a37b-489c-9fa2-5cb60480575e',
          'parent': 'ESAS18Second',
          'start': {
            'time': 1532336400000,
            'type': 'absolute'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any% (60 Levels)',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'ZooKetra'
            }
          ],
          'name': 'Clumsy Fred'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 780000
          },
          'id': '116a92ec-a6ba-4482-b90a-0c5bf9b6454a',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '7e9f50f3-a37b-489c-9fa2-5cb60480575e',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': 'gba-1p',
            'Category': 'Story mode',
            'Platform': 'GBS (Emu)'
          },
          'people': [
            {
              'name': 'Mr_Brood'
            }
          ],
          'name': "Dora the Explorer: Dora's World Adventure"
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1200000
          },
          'id': '275b48f9-bfb9-41bd-a8e8-c2976cc83a17',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '116a92ec-a6ba-4482-b90a-0c5bf9b6454a',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'Any%',
            'Platform': 'Sega Master System'
          },
          'people': [
            {
              'name': 'KrazyRasmus'
            }
          ],
          'name': 'S\u00edtio do Picapau Amarelo'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 900000
          },
          'id': 'f3142b6a-af56-4b7d-ad1b-8312b0368435',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '275b48f9-bfb9-41bd-a8e8-c2976cc83a17',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': 'gb-1p',
            'Category': 'Any%',
            'Platform': 'GB'
          },
          'people': [
            {
              'name': 'linkboss'
            }
          ],
          'name': 'Pingu: Sekai de Ichiban Genki na Penguin'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1200000
          },
          'id': '6e67de45-7eb3-4861-b059-26788a219126',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'f3142b6a-af56-4b7d-ad1b-8312b0368435',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'All Cups',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'Shigan_'
            }
          ],
          'name': 'Wild Animal Racing'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 900000
          },
          'id': 'c9fff6f4-d530-45ba-baa0-8f109a9a9048',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '6e67de45-7eb3-4861-b059-26788a219126',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'Any%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'Janmumrik'
            }
          ],
          'name': 'Nikita: The Mystery of The Hidden Treasure'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 3000000
          },
          'id': '6c596177-bf2a-4d46-b97b-fd4253ca67bd',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'c9fff6f4-d530-45ba-baa0-8f109a9a9048',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'ZooKetra'
            }
          ],
          'name': "Gnomes Vs Fairies: Greckel's Quest"
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1500000
          },
          'id': 'f468fbfd-aa03-4478-89be-38b5c1a43311',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '6c596177-bf2a-4d46-b97b-fd4253ca67bd',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'Any%',
            'Platform': 'PS1'
          },
          'people': [
            {
              'name': 'zazztrain'
            }
          ],
          'name': 'The Land Before Time: Return To The Great Valley'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 4200000
          },
          'id': '5521ee0c-5c56-4e0e-ae38-b02d33a36ad2',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'f468fbfd-aa03-4478-89be-38b5c1a43311',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'Floubz'
            }
          ],
          'name': 'Ice Age: Dawn of the Dinosaurs'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 6300000
          },
          'id': 'ac54d584-e36c-4d05-a15b-3f063fe3ee43',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '5521ee0c-5c56-4e0e-ae38-b02d33a36ad2',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'Any%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'epicdudeguy'
            }
          ],
          'name': 'Prince of Persia 3D'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 6600000
          },
          'id': 'fdf92d77-27b9-418d-8b8c-5d95b5e2ddb5',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'ac54d584-e36c-4d05-a15b-3f063fe3ee43',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'Any%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'zoton2'
            }
          ],
          'name': 'XIII'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1800000
          },
          'id': 'bfe663b1-d50c-4f1e-8d5e-402572b9c547',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'fdf92d77-27b9-418d-8b8c-5d95b5e2ddb5',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any% Accessible Inbounds',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'brainfluid'
            }
          ],
          'name': 'DUSK'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 11700000
          },
          'id': '65170c40-7c4b-4c74-b932-ab41a6b7d471',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'bfe663b1-d50c-4f1e-8d5e-402572b9c547',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'PSTV'
          },
          'people': [
            {
              'name': 'Nozlar'
            }
          ],
          'name': 'Grand Theft Auto: Liberty City Stories'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 2880000
          },
          'id': '7e9821f4-7186-4680-9166-4ea90ae3f38d',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '65170c40-7c4b-4c74-b932-ab41a6b7d471',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Traffic Desk 5 Stars',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'SeductiveSpatula'
            }
          ],
          'name': 'L.A.Noire'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 5400000
          },
          'id': 'f99f6e47-9d5f-47c9-8758-523718b98256',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '7e9821f4-7186-4680-9166-4ea90ae3f38d',
            'setup': 0,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'Makkebakke'
            }
          ],
          'name': 'Br\u00fctal Legend'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1500000
          },
          'id': 'fe9981d0-5792-40ea-bc14-d8339392d8ba',
          'parent': 'ESAS18Second',
          'start': {
            'time': 1532422800000,
            'type': 'absolute'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'Any%',
            'Platform': 'SNES'
          },
          'people': [
            {
              'name': 'Enmet'
            }
          ],
          'name': 'Toy Story'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 2100000
          },
          'id': '0004f2c9-f6f4-41b1-9779-de84d4914cad',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'fe9981d0-5792-40ea-bc14-d8339392d8ba',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'Chfou'
            }
          ],
          'name': "Abobo's Big Adventure"
        },
        {
          'end': {
            'type': 'duration',
            'duration': 780000
          },
          'id': '92b222f9-7f55-4c29-a7a0-fceaf5ab0c3f',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '0004f2c9-f6f4-41b1-9779-de84d4914cad',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'KennyMan666'
            }
          ],
          'name': 'The Useful Dead'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 3300000
          },
          'id': '75f62b80-f375-4649-bcbf-7dd43f35c37c',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '92b222f9-7f55-4c29-a7a0-fceaf5ab0c3f',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'Zet'
            }
          ],
          'name': 'Mushroom 11'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 2100000
          },
          'id': '4cd8174d-2b65-41e1-8996-db8a8147c7d4',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '75f62b80-f375-4649-bcbf-7dd43f35c37c',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': '100%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'AEtienneTV'
            }
          ],
          'name': 'Rise & Shine'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 2400000
          },
          'id': '7c8de7cf-7eb4-4a5f-83a5-90a94d35372c',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '4cd8174d-2b65-41e1-8996-db8a8147c7d4',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': '10 Town Members (Casual)',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'MLSTRM'
            }
          ],
          'name': 'Rabi-Ribi'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 3000000
          },
          'id': '1b2b9af8-e923-403f-b8f9-6d89e4fe9068',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '7c8de7cf-7eb4-4a5f-83a5-90a94d35372c',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'YADO Epilogue',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'Harpa'
            }
          ],
          'name': 'LISA: The Joyful'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1560000
          },
          'id': '5ba9cd7d-9598-4975-99f4-2e5b131cad0f',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '1b2b9af8-e923-403f-b8f9-6d89e4fe9068',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any% No Skips',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'DonDoli'
            }
          ],
          'name': 'Knytt Stories (Saving Thalanill)'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1680000
          },
          'id': '62575c7f-8f01-47a5-a40a-b469a7ef40c3',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '5ba9cd7d-9598-4975-99f4-2e5b131cad0f',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'WarDrumsGaming'
            }
          ],
          'name': 'No Time to Explain Remastered'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 2280000
          },
          'id': 'b5b41960-c651-4f6d-bf4e-125c9b742b91',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '62575c7f-8f01-47a5-a40a-b469a7ef40c3',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'Knuckles',
            'Platform': 'Genesis'
          },
          'people': [
            {
              'name': 'Oldclov'
            }
          ],
          'name': 'Sonic 3 & Knuckles'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1320000
          },
          'id': 'c1593e4f-ff48-4a54-ad43-00161a855579',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'b5b41960-c651-4f6d-bf4e-125c9b742b91',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': 'gb-1p',
            'Category': 'Any%',
            'Platform': 'GB'
          },
          'people': [
            {
              'name': 'EndySWE'
            }
          ],
          'name': 'Mega Man II'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1920000
          },
          'id': '419adc7d-bd15-4e61-96b1-77a261d640d5',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'c1593e4f-ff48-4a54-ad43-00161a855579',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'Wii'
          },
          'people': [
            {
              'name': 'ShadowFrost'
            }
          ],
          'name': 'New Super Mario Bros. Wii'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 3600000
          },
          'id': '9eea5277-a5ba-44e0-9871-47ec7735697b',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '419adc7d-bd15-4e61-96b1-77a261d640d5',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': 'gb-1p',
            'Category': 'Any%',
            'Platform': 'GBP'
          },
          'people': [
            {
              'name': 'pr0te'
            }
          ],
          'name': 'Wario Land 3'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 18900000
          },
          'id': '0827f130-6022-4824-8063-2b13dc8db642',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '9eea5277-a5ba-44e0-9871-47ec7735697b',
            'setup': 0,
            'type': 'endOf'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'Any%',
            'Platform': 'GameCube'
          },
          'people': [
            {
              'name': 'Retrotato'
            }
          ],
          'name': 'Pok\u00e9mon XD: Gale of Darkness'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 19200000
          },
          'id': '78c8d606-2a9f-495e-8177-0ca9ba527877',
          'parent': 'ESAS18Second',
          'start': {
            'time': 1532509200000,
            'type': 'absolute'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'Story Mode (Easy)',
            'Platform': 'N64'
          },
          'people': [
            {
              'name': '360Chrism'
            }
          ],
          'name': 'Mario Party 3'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 2100000
          },
          'id': 'b3a34b1f-ca4f-473d-a3e9-522ae4cb2f13',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '78c8d606-2a9f-495e-8177-0ca9ba527877',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'Any%',
            'Platform': 'PS4'
          },
          'people': [
            {
              'name': 'charlottecutts'
            }
          ],
          'name': 'PaRappa the Rapper 2'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 2100000
          },
          'id': 'b64a4b05-702b-493b-92a9-68f49e702aa6',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'b3a34b1f-ca4f-473d-a3e9-522ae4cb2f13',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Exhibition',
            'Platform': 'PS4'
          },
          'people': [
            {
              'name': 'Chfou'
            }
          ],
          'name': 'Hatsune Miku Project Diva Future Tone'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1200000
          },
          'id': '4de0f8b6-d108-42c5-8381-bfbd66b47d39',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'b64a4b05-702b-493b-92a9-68f49e702aa6',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'UselessBrit'
            }
          ],
          'name': 'Jazzpunk'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 3300000
          },
          'id': '3b1bc623-0301-4afd-a044-3aeb599cf508',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '4de0f8b6-d108-42c5-8381-bfbd66b47d39',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any% (No Clip)',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'SeductiveSpatula'
            }
          ],
          'name': 'Hob'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 9600000
          },
          'id': 'fd69a17e-a691-4bf6-9dec-9875d77ff097',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '3b1bc623-0301-4afd-a044-3aeb599cf508',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'KuruHS'
            }
          ],
          'name': 'Blur'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 14400000
          },
          'id': '49ffff60-1d80-4a9a-b16e-6f3fdf85fee1',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'fd69a17e-a691-4bf6-9dec-9875d77ff097',
            'setup': 0,
            'type': 'endOf'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'Any% Part 2',
            'Platform': 'PS2'
          },
          'people': [
            {
              'name': 'Metako'
            }
          ],
          'name': 'Final Fantasy IX'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 18000000
          },
          'id': '91172f15-58c7-48ef-bf7f-9a331b19111f',
          'parent': 'ESAS18Second',
          'start': {
            'time': 1532595600000,
            'type': 'absolute'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any% (Offline)',
            'Platform': 'Wii U'
          },
          'people': [
            {
              'name': 'legrandgrand'
            }
          ],
          'name': 'Xenoblade Chronicles X'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 14700000
          },
          'id': '8655ae13-8672-4b26-b2c5-acd7c6626570',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '91172f15-58c7-48ef-bf7f-9a331b19111f',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'Any% (NMG (US))',
            'Platform': 'SNES'
          },
          'people': [
            {
              'name': 'Crrool'
            }
          ],
          'name': 'Lufia II: Rise of the Sinistrals'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 6600000
          },
          'id': '2c8dbd2d-1028-495d-9d9a-3c90da05d2b1',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '8655ae13-8672-4b26-b2c5-acd7c6626570',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'Der_Finger'
            }
          ],
          'name': "Sherlock Holmes: The Devil's Daughter"
        },
        {
          'end': {
            'type': 'duration',
            'duration': 660000
          },
          'id': '971f508e-10a9-4e4c-b4dc-16335c68370f',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '2c8dbd2d-1028-495d-9d9a-3c90da05d2b1',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any% (Normal)',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'ThatRumme'
            }
          ],
          'name': 'MEANDERS'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 2700000
          },
          'id': '79f5b4a1-aa41-469d-8fca-9a2ad951d2db',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '971f508e-10a9-4e4c-b4dc-16335c68370f',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any% (Speedrun Mode)',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'Jackintoshh'
            }
          ],
          'name': 'RUINER'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1200000
          },
          'id': 'ec955524-6b26-4811-9993-b20193028a07',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '79f5b4a1-aa41-469d-8fca-9a2ad951d2db',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'kungkobra'
            }
          ],
          'name': 'Fallout: New Vegas'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1500000
          },
          'id': 'b323201d-fa38-43dd-bb40-e5fc3f622980',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'ec955524-6b26-4811-9993-b20193028a07',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'Any%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'SphereMJ'
            }
          ],
          'name': 'Star Trek: Colony 7'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1920000
          },
          'id': 'ddb1c204-155a-4861-bd24-df02f7bf0129',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'b323201d-fa38-43dd-bb40-e5fc3f622980',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'WolfE87'
            }
          ],
          'name': 'Rise of the Triad (2013)'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 3600000
          },
          'id': 'cc156711-13ff-4eb3-b1f1-318b4964e542',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'ddb1c204-155a-4861-bd24-df02f7bf0129',
            'setup': 0,
            'type': 'endOf'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'Rookie',
            'Platform': 'SNES'
          },
          'people': [
            {
              'name': 'Enmet'
            }
          ],
          'name': "Rock n' Roll Racing"
        },
        {
          'end': {
            'type': 'duration',
            'duration': 16200000
          },
          'id': '0e802dc6-33d3-48cf-811b-0b5c2214d4fd',
          'parent': 'ESAS18Second',
          'start': {
            'time': 1532682000000,
            'type': 'absolute'
          },
          'data': {
            'Note': 'gba-1p',
            'Category': 'Any% GBA',
            'Platform': 'GBA'
          },
          'people': [
            {
              'name': 'Boxmeister'
            }
          ],
          'name': 'Final Fantasy V'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1080000
          },
          'id': 'b160d728-eed7-4b8d-b011-69dc47044711',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '0e802dc6-33d3-48cf-811b-0b5c2214d4fd',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': 'gba-1p',
            'Category': 'Any% (Normal)',
            'Platform': 'GBA (Emu)'
          },
          'people': [
            {
              'name': 'mohoc7'
            }
          ],
          'name': 'Kuru Kuru Kururin'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1800000
          },
          'id': '294626e0-d24e-4ac8-9e6f-e03bb8bcea3b',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'b160d728-eed7-4b8d-b011-69dc47044711',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any% (Rookie)',
            'Platform': 'PS4'
          },
          'people': [
            {
              'name': 'Nekolikegg'
            }
          ],
          'name': 'Nex Machina'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 1800000
          },
          'id': '6a2a7d8f-1387-43e0-a67d-d0f2e33c45ea',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '294626e0-d24e-4ac8-9e6f-e03bb8bcea3b',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': 'gba-1p',
            'Category': 'Any%',
            'Platform': 'GBP'
          },
          'people': [
            {
              'name': 'CDRomatron'
            }
          ],
          'name': 'Crash Bandicoot 2: N-Tranced'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 4680000
          },
          'id': 'c58fcbd0-2d0b-447c-8784-cf25a549a34b',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '6a2a7d8f-1387-43e0-a67d-d0f2e33c45ea',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'PSP'
          },
          'people': [
            {
              'name': 'Mergy'
            }
          ],
          'name': 'Yu-Gi-Oh! GX: Tag Force 2'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 5400000
          },
          'id': '4f1c2bd5-8313-4d11-9ae8-40e62be1aa84',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'c58fcbd0-2d0b-447c-8784-cf25a549a34b',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'Switch'
          },
          'people': [
            {
              'name': '360Chrism'
            }
          ],
          'name': 'Puyo Puyo Tetris'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 18000000
          },
          'id': 'a581a253-9fa5-4c9a-ab1d-7444f0a58d56',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '4f1c2bd5-8313-4d11-9ae8-40e62be1aa84',
            'setup': 0,
            'type': 'endOf'
          },
          'data': {
            'Note': null,
            'Category': 'TPK%',
            'Platform': 'Paper'
          },
          'people': [
            {
              'name': 'Ladaur'
            }
          ],
          'name': 'Dungeons And Dragons: 5th Edition'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 3000000
          },
          'id': 'e4b99151-eea3-4d99-b6da-774b7a57f78f',
          'parent': 'ESAS18Second',
          'start': {
            'time': 1532775600000,
            'type': 'absolute'
          },
          'data': {
            'Note': '4_3-1p',
            'Category': 'Any% (Easy)',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'Tezur0'
            }
          ],
          'name': 'Unreal'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 3600000
          },
          'id': '2d8f7da0-dda2-4da9-8c52-738fdf1c8505',
          'parent': 'ESAS18Second',
          'start': {
            'ref': 'e4b99151-eea3-4d99-b6da-774b7a57f78f',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'PC'
          },
          'people': [
            {
              'name': 'Brongle'
            }
          ],
          'name': 'Fallout 4'
        },
        {
          'end': {
            'type': 'duration',
            'duration': 10800000
          },
          'id': '514578fd-051c-48c3-a5f4-04d909622b84',
          'parent': 'ESAS18Second',
          'start': {
            'ref': '2d8f7da0-dda2-4da9-8c52-738fdf1c8505',
            'setup': 600000,
            'type': 'endOf'
          },
          'data': {
            'Note': '16_9-1p',
            'Category': 'Any%',
            'Platform': 'PS3'
          },
          'people': [
            {
              'name': 'Neviutz'
            }
          ],
          'name': 'Resonance of Fate'
        }
      ]
    }
  ]
}
