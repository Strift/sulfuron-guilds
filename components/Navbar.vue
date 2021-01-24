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
      title="Accueil"
      class=" text-blue-300 text-shadow-sm text-lg flex items-center space-x-2"
    >
      <ArrowLeftIcon />
      <span>
        Retour au portail
      </span>
    </nuxt-link>
    <nuxt-link
      v-show="!pathIs('/compte/') && isLoggedIn"
      to="/compte/profil/"
      :title="accountLinkTitle"
      class="text-blue-300 text-shadow-sm text-lg flex items-center space-x-2"
    >
      <span v-if="ownsUnpublishedGuild" class="bg-red-500 text-sm text-white font-semibold rounded-full h-5 w-5 inline-block text-center">
        1
      </span>
      <UserIcon />
      <span>
        Mon compte
      </span>
    </nuxt-link>
    <nuxt-link
      v-show="!pathIs('/connexion/') && !isLoggedIn && !isAuthenticating"
      to="/connexion/"
      class="text-blue-300 hover:text-blue-200 bg-blue-900 bg-opacity-25 hover:bg-opacity-75 text-shadow-sm text-lg flex items-center space-x-2 border border-blue-300  px-4 py-2 rounded-full"
    >
      <UserIcon />
      <span>
        Connexion

      </span>
    </nuxt-link>
  </header>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import ArrowLeftIcon from './icons/ArrowLeftIcon.vue'
import UserIcon from './icons/UserIcon.vue'

export default {
  components: {
    ArrowLeftIcon,
    UserIcon
  },
  computed: {
    ...mapState('auth', {
      isAuthenticating: state => state.loading
    }),
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
