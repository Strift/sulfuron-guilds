const logger = require('../services/logger')
const firebase = require('../services/firebase')
const FirestoreFieldValue = firebase.firestore.FieldValue

module.exports = (snap, _context) => {
  const data = snap.after.data()
  const previousData = snap.before.data()

  logger.debug(`Guild ${data.name} was updated`)

  // Only trigger this if something else than `updatedAt` was updated
  if (previousData.updatedAt && !previousData.updatedAt.isEqual(data.updatedAt)) {
    return null
  } else {
    logger.info(`Touching ${data.name} updatedAt`)
    return snap.after.ref.set({
      updatedAt: FirestoreFieldValue.serverTimestamp()
    }, { merge: true })
  }
}
