const functions = require('firebase-functions')

const login = require('./api/login')

exports.login = functions.https.onRequest(login)
