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
      class="font-semibold text-yellow-600 text-shadow-sm uppercase tracking-wide"
    >
      Retour au portail
    </nuxt-link>
    <nuxt-link
      v-show="!pathIs('/compte/') && isLoggedIn"
      to="/compte/"
      :title="accountLinkTitle"
      class="flex items-baseline space-x-2"
    >
      <span v-if="ownsUnpublishedGuild" class="bg-red-500 text-sm text-white font-semibold rounded-full h-5 w-5 inline-block text-center">
        1
      </span>
      <span class="font-semibold text-yellow-600 text-shadow-sm uppercase tracking-wide">
        Mon compte
      </span>
    </nuxt-link>
    <nuxt-link
      v-show="!pathIs('/connexion/') && !isLoggedIn"
      to="/connexion/"
      class="w-40 py-2 rounded-full text-center text-shadow-sm font-semibold bg-yellow-900 bg-opacity-25 border-2 border-yellow-500 text-yellow-500 hover:bg-opacity-50 hover:text-yellow-400 shadow-md hover:shadow-lg"
    >
      Connexion
    </nuxt-link>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('auth', ['isLoggedIn', 'ownsUnpublishedGuild']),
    accountLinkTitle () {
      return 'Mon compte' + (this.ownsUnpublishedGuild ? ' - 1 notification' : '')
    }
  },
  methods: {
    pathIs (path) {
      return this.$route.path === path
    }
  }
}
</script>
