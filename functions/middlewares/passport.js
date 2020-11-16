const functions = require('firebase-functions')
const passport = require('passport')
const BnetStrategy = require('passport-bnet').Strategy

const HOSTNAME = functions.config().hostname
const BATTLENET_CLIENT_ID = functions.config().battlenet.client_id
const BATTLENET_CLIENT_SECRET = functions.config().battlenet.client_secret

// Use the BnetStrategy within Passport.
passport.use(new BnetStrategy({
  clientID: BATTLENET_CLIENT_ID,
  clientSecret: BATTLENET_CLIENT_SECRET,
  callbackURL: `${HOSTNAME}/login/callback`,
  region: 'eu'
}, function (accessToken, refreshToken, profile, done) {
  return done(null, profile)
}))

module.exports = passport
