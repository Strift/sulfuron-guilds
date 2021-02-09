const functions = require('firebase-functions')

const authController = require('./api/authController')

exports.auth = functions.https.onRequest(authController)
