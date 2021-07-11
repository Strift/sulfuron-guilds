const firebase = require('../services/firebase')
const FirestoreFieldValue = firebase.firestore.FieldValue

module.exports = (snap, context) => {
  // Only trigger this if something else than `updatedAt` was updated
  if (snap.before.data().updatedAt !== snap.after.data().updatedAt) {
    return Promise.resolve()
  } else {
    return snap.after.ref.set({
      updatedAt: FirestoreFieldValue.serverTimestamp()
    }, { merge: true })
  }
}
