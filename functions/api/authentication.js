const express = require('express')
const config = require('../config')
const logger = require('../services/logger')
const admin = require('../services/admin')
const passport = require('../middlewares/passport')

const APP_HOST = config.hosting.app

const server = express()

server.use(passport.initialize())

server.get('/auth/battlenet', passport.authorize('bnet', { session: false }))

server.get('/auth/battlenet/callback',
  passport.authorize('bnet', { failureRedirect: '/?auth_error', session: false }),
  (req, res) => {
    const uid = req.account.battletag
    logger.debug(`Successful battlenet authentication with account ${uid}`)

    logger.debug(`Creating custom auth token for ${uid}`)
    admin.auth().createCustomToken(uid)
      .then((token) => {
        logger.debug(`Successful token creation for ${uid}: ${token}`)
        res.redirect(`${APP_HOST}/?auth_token=${token}`)
      })
      .catch((error) => {
        logger.debug(`Failed to create token for ${uid}`, error)
      })
  })

module.exports = server
