const express = require('express')
const logger = require('../logger')
const admin = require('../admin')
const passport = require('../middlewares/passport')

const server = express()

server.use(passport.initialize())

server.get('/auth/battlenet', passport.authorize('bnet', { session: false }))

server.get('/auth/battlenet/callback', passport.authorize('bnet', { failureRedirect: '/failure', session: false }),
  (req, res) => {
    const uid = req.account.battletag

    admin.auth().createCustomToken(uid)
      .then((token) => {
        res.redirect(`/login?auth_token=${token}`)
      })
      .catch((error) => {
        logger.debug('error', error)
      })
  })

module.exports = server
