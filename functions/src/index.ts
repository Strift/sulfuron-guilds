import 'source-map-support/register'

import * as functions from 'firebase-functions'
import authController from './api/authController'
import listUsersController from './api/listUsers'
import redirectController from './api/redirect'
import onGuildUpdateListener from './background/onGuildUpdate'

export const auth = functions.https.onRequest(authController)
export const listUsers = functions.https.onCall(listUsersController)
export const redirect = functions.https.onRequest(redirectController)
export const onGuildUpdate = functions.firestore.document('guilds/{guildId}').onUpdate(onGuildUpdateListener)
