import * as functions from 'firebase-functions'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import authController from './api/authController'
import listUsers from './api/listUsers'
import redirect from './api/redirect'
import onGuildUpdate from './background/onGuildUpdate'

export default {
  auth: functions.https.onRequest(authController),
  listUsers: functions.https.onCall(listUsers),
  redirect: functions.https.onRequest(redirect),

  onGuildUpdate: functions.firestore.document('guilds/{guildId}').onUpdate(onGuildUpdate)
}

// exports.auth = functions.https.onRequest(authController)
// exports.listUsers = functions.https.onCall(listUsers)
// exports.redirect = functions.https.onRequest(redirect)

// exports.onGuildUpdate = functions.firestore.document('guilds/{guildId}').onUpdate(onGuildUpdate)
