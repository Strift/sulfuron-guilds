/* eslint-disable no-console */

import firebase from 'firebase-admin'
import guildFactory from '../factories/guildFactory'

const projectId = process.env.FIREBASE_PROJECT_ID

process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'

firebase.initializeApp({ projectId })

const firestore = firebase.firestore()

async function seed () {
  try {
    for (let guilds = 0; guilds < 50; guilds++) {
      const guild = guildFactory({ published: true })
      await firestore.collection('guilds').add(guild)
    }
    console.log('Seeded 50 guilds')
  } catch (err) {
    console.error(err)
  }
}

seed()
