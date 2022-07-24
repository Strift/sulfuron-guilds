const functions = require('firebase-functions')

module.exports = {
  development: functions.config().development,
  hosting: {
    app: functions.config().hosting.app,
    authFunction: functions.config().hosting.auth_function
  },
  battlenet: {
    clientId: functions.config().battlenet.client_id,
    clientSecret: functions.config().battlenet.client_secret
  },
  segment: {
    enabled: functions.config().segment.enabled
  }
}
