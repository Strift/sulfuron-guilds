const functions = require('firebase-functions')

const authController = require('./api/authController')
const listUsers = require('./api/listUsers')

exports.auth = functions.https.onRequest(authController)
exports.listUsers = functions.https.onCall(listUsers)
