const passport = require('passport')
const BattlenetStrategy = require('passport-bnet').Strategy

const config = require('../config')

const APP_HOST = config.hosting.app
// const AUTH_FUNCTION_HOST = config.hosting.authFunction
const BATTLENET_CLIENT_ID = config.battlenet.clientId
const BATTLENET_CLIENT_SECRET = config.battlenet.clientSecret

// Use the BnetStrategy within Passport.
passport.use(new BattlenetStrategy({
  clientID: BATTLENET_CLIENT_ID,
  clientSecret: BATTLENET_CLIENT_SECRET,
  callbackURL: `${APP_HOST}/auth/battlenet/callback`,
  region: 'eu'
}, function (accessToken, refreshToken, profile, done) {
  return done(null, profile)
}))

module.exports = passport
