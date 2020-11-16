const functions = require('firebase-functions')

const express = require('express')

const session = require('../middlewares/session')
const passport = require('../middlewares/passport')

const server = express()

server.use(session)

server.use(passport.initialize())
// app.use(passport.session())

passport.serializeUser(function (user, done) {
  functions.logger.debug(user)
  done(null, user.id)
})

// server.get('/', (req, res) => {
//   if (!req.session.views) {
//     req.session.views = 0
//   }
//   const views = req.session.views++
//   res.send(`Views ${views}`)
// })

const logRequest = (req, res, next) => {
  functions.logger.debug(req.hostname, req.method, req.path)
  functions.logger.debug(req.headers)
  next()
}

server.get('/',
  [logRequest, passport.authenticate('bnet')])

server.get('/callback',
  [logRequest, passport.authenticate('bnet', { failureRedirect: '/failure' })],
  (req, res) => {
    functions.logger.debug('Authentication successful')
    res.redirect('/success')
  })

// Create an app function to host all other top-level functions
// Necessary because hosting rewrites `/login` to `/login/login`
const functionApp = express()
functionApp.use('/login', server)
module.exports = functionApp
