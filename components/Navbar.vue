<template>
  <header class="flex items-center h-24">
    <nuxt-link
      to="/"
      title="Accueil"
      class="md:ml-0 md:mr-auto"
    >
      <img src="~/assets/images/logo.png" alt="sulfuron.eu" class="mx-auto h-8 md:h-10">
    </nuxt-link>
    <nav>
      <ul class="flex items-center space-x-5 md:space-x-12 list-none">
        <NavbarLink
          v-show="showAccountButton && hasDraftGuild"
          to="/compte/guilde/"
          title="Votre page de guilde est activée !"
        >
          <BellIcon class="text-red-500" style="height: 24px; width: 24px" />
        </NavbarLink>
        <NavbarLink
          v-show="showBackButton"
          to="/"
          title="Accueil"
          class="hidden md:inline-flex"
        >
          <span class="space-x-2 flex items-center">
            <ArrowLeftIcon />
            <span>
              Retour au portail
            </span>
          </span>
        </NavbarLink>
        <NavbarLink
          v-show="showAdminButton && isAdmin"
          to="/admin/"
          title="Administration"
        >
          Admin
        </NavbarLink>
        <NavbarLink
          v-show="showAccountButton"
          :to="accountLinkUrl"
          title="Mon compte"
        >
          <span class="space-x-2 flex items-center justify-center bg-blue-900 bg-opacity-25 hover:bg-opacity-75 border border-blue-300 px-4 py-2 rounded-full shadow-md">
            <UserIcon />
            <span v-show="isGuest">Connexion</span>
            <span v-show="isAuthenticated">
              <span class="hidden lg:inline">Mon compte</span>
              <span class="lg:hidden">Compte</span>
            </span>
          </span>
        </NavbarLink>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import NavbarLink from './NavbarLink.vue'

export default {
  components: { NavbarLink },
  computed: {
    ...mapGetters('account', [
      'isGuest',
      'isAuthenticated',
      'isAdmin',
      'isAGuildOwner',
      'hasDraftGuild'
    ]),
    showBackButton () {
      return this.$route.path !== '/'
    },
    showAccountButton () {
      return !(this.pathStartsWith('/compte/') || this.pathStartsWith('/connexion/'))
    },
    showAdminButton () {
      return !this.pathStartsWith('/admin/')
    },
    accountLinkUrl () {
      if (this.isGuest) { return '/connexion/' }

      if (this.isAGuildOwner) { return '/compte/guilde/' }

      return '/compte/parametres/'
    }
  },
  methods: {
    pathStartsWith (path) {
      return this.$route.path.startsWith(path)
    }
  }
}
</script>
