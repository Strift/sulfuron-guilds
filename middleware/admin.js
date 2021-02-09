export default async function ({ store }) {
  if (!store.getters['account/isAdmin']) {
    await store.dispatch('account/fetchAdmin')
  }
}
