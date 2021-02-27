const express = require('express')
const config = require('../config')
const logger = require('../services/logger')
const firebase = require('../services/firebase')
const passport = require('../middlewares/passport')

const AUTH_PAGE_URL = `${config.hosting.app}/connexion/`

const server = express()

server.use(passport.initialize())

server.get('/auth/battlenet', passport.authorize('bnet', { session: false }))

server.get('/auth/battlenet/callback',
  passport.authorize('bnet', { failureRedirect: '/?auth_error', session: false }),
  (req, res) => {
    const uid = req.account.battletag
    logger.debug(`Successful battlenet authentication with account ${uid}`)
    firebase.auth().createCustomToken(uid)
      .then((token) => {
        logger.debug(`Successful token creation for ${uid}`)
        res.redirect(`${AUTH_PAGE_URL}?auth_token=${token}`)
      })
      .catch((error) => {
        logger.debug(`Failed to create token for ${uid}`, error)
      })
  })

module.exports = server
