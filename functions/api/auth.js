const functions = require('firebase-functions')

const express = require('express')

// const session = require('../middlewares/session')
const passport = require('../middlewares/passport')

const server = express()

// Enable cookie-based sessions
// server.use(session)

server.use(passport.initialize())

const logRequest = (req, res, next) => {
  functions.logger.debug(req.hostname, req.method, req.path)
  functions.logger.debug(req.headers)
  next()
}

server.get('/auth/battlenet',
  [logRequest, passport.authenticate('bnet', { session: false })])

server.get('/auth/battlenet/callback',
  [logRequest, passport.authenticate('bnet', { failureRedirect: '/failure', session: false })],
  (req, res) => {
    functions.logger.debug('Authentication successful', req.headers)
    res.redirect('/success')
  })

module.exports = server
