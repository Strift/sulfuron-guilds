import * as functions from 'firebase-functions'

export default {
  development: functions.config().development,
  hosting: {
    app: functions.config().hosting.app,
    authFunction: functions.config().hosting.auth_function,
    databaseURL: functions.config().hosting.database_url
  },
  battlenet: {
    clientId: functions.config().battlenet.client_id,
    clientSecret: functions.config().battlenet.client_secret
  },
  amplitude: {
    environment: functions.config().amplitude.environment,
    apiKey: functions.config().amplitude.api_key
  }
}
