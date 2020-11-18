const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
// const admin = require('../admin')
// const session = require('../middlewares/session')
const passport = require('../middlewares/passport')

const serviceAccount = require('../service-account.json')

// TODO
// I think firebase admin SDK does not handle the emulator configuration well, i need to try to initialize it with all the emulators refs
// supposedly fixed in firebase-admin v8.4, might need to upgrade

// functions.logger.debug('Service Account', serviceAccount)

// admin.initializeApp()

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'http://localhost:9000/?ns=sulfuron-guilds' // 'https://sulfuron-guilds.firebaseio.com'
})

// admin.initializeApp({
//   serviceAccountId: 'firebase-adminsdk-9wmsj@sulfuron-guilds.iam.gserviceaccount.com'
// })

functions.logger.debug('Initialized')

const server = express()

// server.use(session)
server.use(passport.initialize())

const logRequest = (req, res, next) => {
  functions.logger.debug(req.hostname, req.method, req.path)
  next()
}

server.get('/auth/battlenet',
  [logRequest, passport.authorize('bnet', { session: false })])

server.get('/auth/battlenet/callback',
  [logRequest, passport.authorize('bnet', { failureRedirect: '/failure', session: false })],
  (req, res) => {
    // Bnet authentication successful
    const accountId = req.account.id
    const accountToken = req.account.token

    admin.auth().createCustomToken(req.account.battletag)
      .then((token) => {
        functions.logger.debug('Token length', token.length)
        // TODO
        // we have the token, now send it to the client and make it log in with it
        functions.logger.debug('Created token for user', token)
        res.redirect(`/login?auth_token=${token}`)
      })
      .catch((error) => {
        functions.logger.debug('error', error)
      })

    //
  })

module.exports = server
