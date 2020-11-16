const functions = require('firebase-functions')

const auth = require('./api/auth')

exports.auth = functions.https.onRequest(auth)
