import firebase from 'firebase-admin'
import serviceAccount from '../../.service-account.staging.json'

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://sulfuron-guilds-staging.firebaseio.com'
  // databaseURL: 'http://localhost:9000/?ns=sulfuron-guilds'
})

export default firebase
