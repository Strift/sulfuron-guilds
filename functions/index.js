const functions = require('firebase-functions')
// require('./admin')

const auth = require('./api/auth')

exports.auth = functions.https.onRequest(auth)
