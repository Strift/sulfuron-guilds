export default function ({ store, redirect }) {
  if (!store.getters['account/isAuthenticated']) {
    return redirect('/connexion/')
  }
}
