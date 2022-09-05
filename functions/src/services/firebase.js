import * as firebase from 'firebase-admin'
import 'firebase-functions' // necessary for ServiceAccount when initializing in TypeScript
// Read more: https://firebase.google.com/docs/functions/config-env#automatically_populated_environment_variables
import config from '../config'
import serviceAccount from '../../.service-account.staging.json'

if (config.development) {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
    // databaseURL: config.hosting.databaseURL
  })
} else {
  firebase.initializeApp()
}

export default firebase
