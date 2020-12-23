<template>
  <header class="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 space-x-12 h-24">
    <nuxt-link
      to="/"
      title="Accueil"
      class="md:ml-0 md:mr-auto"
    >
      <img src="~/assets/images/logo.png" alt="sulfuron.eu" class="mx-auto h-10">
    </nuxt-link>
    <nuxt-link
      v-show="!pathIs('/')"
      to="/"
      title="Portail des guildes"
      class="font-semibold text-blue-500 text-shadow-sm uppercase tracking-wide"
    >
      Retour au portail
    </nuxt-link>
    <nuxt-link
      v-show="!pathIs('/compte') && isLoggedIn"
      to="/compte"
      title="Mon compte"
      class="font-semibold text-blue-500 text-shadow-sm uppercase tracking-wide"
    >
      Mon compte
    </nuxt-link>
    <nuxt-link
      v-show="!pathIs('/connexion') && !isLoggedIn"
      to="/connexion"
      class="w-40 py-2 rounded-full text-center text-shadow-sm font-semibold bg-blue-900 bg-opacity-25 border-2 border-blue-500 text-blue-500 hover:bg-opacity-50 hover:text-blue-400 shadow-md hover:shadow-lg"
    >
      Connexion
    </nuxt-link>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  },
  methods: {
    pathIs (path) {
      return this.$route.path === path
    }
  }
}
</script>
