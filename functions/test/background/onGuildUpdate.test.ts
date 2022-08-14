// Mock config values here

import * as functions from '../../src/index'

const admin = require('firebase-admin')

process.env.FIREBASE_FIRESTORE_EMULATOR_HOST = 'localhost:8080'
process.env.FIREBASE_FUNCTIONS_EMULATOR_HOST = 'localhost:9099'

const test = require('firebase-functions-test')()

jest.setTimeout(6000)

describe('onGuildUpdate', () => {
  let wrapped: any

  beforeAll(() => {
    wrapped = test.wrap(functions.onGuildUpdate)
  })

  afterAll(() => {
    test.cleanup()
  })

  // TODO: improve tests
  it('adds an updatedAt to guilds', async () => {
    const guildId = 'some-guild-id'
    const guildRef = admin.firestore().collection('guilds').doc(guildId)

    await guildRef.set({ name: 'Some Guild' })
    await wrapped({
      before: {
        data: () => ({ name: 'Some Guild' })
      },
      after: {
        data: () => ({ name: 'Some Guild' }), // we don't updated the name because it's not really updated
        ref: guildRef
      }
    }, {
      params: { guildId }
    })

    const guild = await guildRef.get()
    expect(guild.data()).toMatchObject({ name: 'Some Guild', updatedAt: { } })
  })
})
