export default async function ({ store, $fire }) {
  const querySnapshot = await $fire.firestore
    .collection('guilds')
    .where('ownerUid', '==', $fire.auth.currentUser.uid)
    .get()

  if (querySnapshot.empty) {
    store.commit('account/setGuild', null)
    return
  }
  // There should be only one query result
  const guildRef = querySnapshot.docs[0].ref

  await store.dispatch('account/enableGuildSync', guildRef)
}
