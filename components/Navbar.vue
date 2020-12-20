<template>
  <header class="flex flex-col md:flex-row items-center md:justify-between space-y-8 md:space-y-0 h-24">
    <nuxt-link to="/" title="Accueil">
      <img src="~/assets/images/logo.png" alt="sulfuron.eu" class="mx-auto md:mx-0 h-10">
    </nuxt-link>
    <nuxt-link v-if="isLoggedIn" to="/compte" class="px-4 py-1 rounded font-semibold text-yellow-600 border border-yellow-600 hover:bg-yellow-600 hover:text-gray-900 shadow-lg">
      Mon compte
    </nuxt-link>
    <nuxt-link v-else to="/connexion" class="px-4 py-1 rounded font-semibold bg-yellow-600 border border-yellow-600 text-gray-900 shadow-lg">
      Connexion
    </nuxt-link>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn () {
      return this.$store.state.auth.user !== null
    }
  }
}
</script>
