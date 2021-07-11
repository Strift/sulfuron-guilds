const firebase = require('../services/firebase')
const FirestoreFieldValue = firebase.firestore.FieldValue

module.exports = (snap, context) => {
  return snap.ref.set({
    updatedAt: FirestoreFieldValue.serverTimestamp()
  })
}
