export default async function ({ store }) {
  if (!store.getters['account/isAGuildOwner']) {
    await store.dispatch('account/fetchGuild')
  }
}
