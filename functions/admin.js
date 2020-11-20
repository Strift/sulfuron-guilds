const admin = require('firebase-admin')

const serviceAccount = require('./service-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'http://localhost:9000/?ns=sulfuron-guilds' // 'https://sulfuron-guilds.firebaseio.com'
})

module.exports = admin
