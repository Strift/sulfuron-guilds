export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.getters['account/isAuthenticated']) {
    return redirect('/connexion/')
  }
}
