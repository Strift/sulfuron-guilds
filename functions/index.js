const functions = require('firebase-functions')

const authentication = require('./api/authentication')

exports.auth = functions.https.onRequest(authentication)
