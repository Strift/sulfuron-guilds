import config from '../config'
import express from 'express'

import logger from '../services/logger'
import firebase from '../services/firebase'
import passport from '../middlewares/passport'

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

export default server
