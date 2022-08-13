const functions = require('firebase-functions')

const authController = require('./src/api/authController')
const listUsers = require('./src/api/listUsers')
const redirect = require('./src/api/redirect')

const onGuildUpdate = require('./background/onGuildUpdate')

exports.auth = functions.https.onRequest(authController)
exports.listUsers = functions.https.onCall(listUsers)
exports.redirect = functions.https.onRequest(redirect)

exports.onGuildUpdate = functions.firestore.document('guilds/{guildId}').onUpdate(onGuildUpdate)
