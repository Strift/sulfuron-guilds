export default async function ({ $fire, store, error }) {
  const docRef = await $fire.firestore
    .collection('users')
    .doc(store.getters['account/username'])
    .get()

  if (!docRef.exists || docRef.data().admin !== true) {
    return error(403, 'Forbidden')
  }
}
