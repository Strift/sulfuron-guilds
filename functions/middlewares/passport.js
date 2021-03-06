const passport = require('passport')
const BattlenetStrategy = require('passport-bnet').Strategy

const config = require('../config')

const HOSTING_EMULATOR_HOST = 'http://localhost:5000'

const RUNNING_IN_DEV = config.development

const APP_HOST = RUNNING_IN_DEV ? HOSTING_EMULATOR_HOST : config.hosting.app
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
