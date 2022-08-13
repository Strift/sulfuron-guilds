// Mock config values here

import functions from '../../src/index'

const admin = require('firebase-admin')

process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099'

const test = require('firebase-functions-test')()

describe('listUsers', () => {
  let wrapped: any

  beforeAll(() => {
    wrapped = test.wrap(functions.listUsers)
  })

  afterAll(() => {
    test.cleanup()
  })

  it('returns an empty array when there are no users', async () => {
    const { users } = await wrapped()
    expect(users).toEqual([])
  })

  it('returns the list of Firebase Auth Users', async () => {
    const uid = 'fakeBnet#1234'
    admin.auth().createUser({ uid })

    const { users } = await wrapped()
    expect(users).toEqual([uid])
    admin.auth().deleteUser(uid)
  })
})
