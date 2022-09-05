import firebase from 'firebase-admin'
import config from '../config'
import serviceAccount from '../../.service-account.staging.json'

if (config.development) {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    // databaseURL: 'https://sulfuron-guilds.firebaseio.com'
    // databaseURL: 'https://sulfuron-guilds-staging.firebaseio.com'
    databaseURL: 'http://localhost:9000/?ns=sulfuron-guilds'
  })
} else {
  firebase.initializeApp()
}

export default firebase
