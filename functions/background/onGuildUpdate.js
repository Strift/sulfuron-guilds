const logger = require('../services/logger')
const firebase = require('../services/firebase')
const FirestoreFieldValue = firebase.firestore.FieldValue

module.exports = (snap, context) => {
  logger.debug('Guild was updated', snap)
  // Only trigger this if something else than `updatedAt` was updated
  if (snap.before.data().updatedAt !== snap.after.data().updatedAt) {
    return Promise.resolve()
  } else {
    logger.info(`Updated updatedAt on ${snap}`)
    return snap.after.ref.set({
      updatedAt: FirestoreFieldValue.serverTimestamp()
    }, { merge: true })
  }
}
