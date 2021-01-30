<template>
  <header class="flex items-center h-24">
    <nuxt-link
      to="/"
      title="Accueil"
      class="md:ml-0 md:mr-auto"
    >
      <img src="~/assets/images/logo.png" alt="sulfuron.eu" class="mx-auto h-10">
    </nuxt-link>
    <nav class="">
      <ul class="flex items-center space-x-12 list-none">
        <NavbarLink v-if="showBackButton" to="/">
          <span class="space-x-2 flex items-center">
            <ArrowLeftIcon />
            <span>
              Retour au portail
            </span>
          </span>
        </NavbarLink>
        <client-only>
          <NavbarLink
            v-if="showAccountButton"
            :to="(isLoggedIn || isAuthenticating) ? '/compte/profil/' : '/connexion/'"
          >
            <span class="space-x-2 flex items-center justify-center bg-blue-900 bg-opacity-25 hover:bg-opacity-75 border border-blue-300 px-4 py-2 rounded-full shadow">
              <UserIcon />
              <span v-if="isLoggedIn || isAuthenticating">Mon compte</span>
              <span v-else>Connexion</span>
            </span>
          </NavbarLink>
        </client-only>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ArrowLeftIcon from './icons/ArrowLeftIcon.vue'
import UserIcon from './icons/UserIcon.vue'
import NavbarLink from './NavbarLink.vue'

export default {
  components: {
    ArrowLeftIcon,
    UserIcon,
    NavbarLink
  },
  computed: {
    ...mapState('account', {
      isAuthenticating: state => state.loading
    }),
    ...mapGetters('account', ['isLoggedIn', 'ownsUnpublishedGuild']),
    accountLinkTitle () {
      return 'Mon compte' + (this.ownsUnpublishedGuild ? ' - 1 notification' : '')
    },
    showBackButton () {
      return this.$route.path !== '/'
    },
    showAccountButton () {
      return !this.pathStartsWith('/compte/') && !this.pathStartsWith('/connexion/')
    }
  },
  methods: {
    pathStartsWith (path) {
      return this.$route.path.startsWith(path)
    }
  }
}
</script>
