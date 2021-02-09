const firebase = require('firebase-admin')

const serviceAccount = require('../.service-account.json')

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://sulfuron-guilds.firebaseio.com'
  // databaseURL: 'http://localhost:9000/?ns=sulfuron-guilds'
})

module.exports = firebase
