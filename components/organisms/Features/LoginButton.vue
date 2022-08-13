<template>
  <NuxtLink
    :to="accountLinkUrl"
    class="bg-blue-900 bg-opacity-25 border border-blue-300 font-semibold hover:bg-opacity-75 hover:text-blue-200 md:mx-0 mx-auto px-4 py-2 rounded-full shadow-lg text-blue-300 text-center text-shadow-sm tracking-widest uppercase w-64"
  >
    <span v-show="isGuest">Connexion</span>
    <span v-show="isAuthenticated">Mon compte</span>
  </NuxtLink>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('account', ['isGuest', 'isAuthenticated', 'isAGuildOwner']),
    accountLinkUrl () {
      if (this.isGuest) {
        return '/connexion/'
      }

      if (this.isAGuildOwner) {
        return '/compte/guilde/'
      }

      return '/compte/parametres/'
    }
  }
}
</script>
