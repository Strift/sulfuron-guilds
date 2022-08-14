import express from 'express'
import config from '../config'
import logger from '../services/logger'
import firebase from '../services/firebase'
import passport from '../middlewares/passport'
import analytics from '../services/analytics'

const AUTH_PAGE_URL = `${config.hosting.app}/connexion/`

const server = express()

server.use(passport.initialize())

server.get('/auth/battlenet', passport.authorize('bnet', { session: false }))

server.get('/auth/battlenet/callback',
  passport.authorize('bnet', { failureRedirect: '/?auth_error', session: false }),
  (req, res) => {
    const { battletag: userId } = req.account
    analytics.signIn(userId)
    logger.info(`Auth: Successful battlenet login ${userId}`)

    firebase.auth().createCustomToken(userId)
      .then((token) => {
        logger.debug(`Successful token creation for ${userId}`)
        res.redirect(`${AUTH_PAGE_URL}?auth_token=${token}`)
      })
      .catch((error) => {
        logger.debug(`Failed to create token for ${userId}`, error)
      })
  })

export default server
