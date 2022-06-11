/* eslint-disable no-console */

import firebase from 'firebase-admin'

const projectId = process.env.FIREBASE_PROJECT_ID

process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'

firebase.initializeApp({ projectId })

const firestore = firebase.firestore()

async function seed () {
  try {
    const userId = process.env.ADMIN_USER_UID

    if (!userId) {
      console.log('Missing environment variable: ADMIN_USER_UID')
      return
    }

    await firestore.collection('users')
      .doc(userId)
      .set({ admin: true })
    console.log('Seeded admin user')
  } catch (err) {
    console.error(err)
  }
}

seed()
