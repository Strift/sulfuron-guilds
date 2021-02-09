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
        <NavbarLink
          v-show="showBackButton"
          to="/"
          title="Accueil"
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
          Administration
        </NavbarLink>
        <NavbarLink
          v-show="showAccountButton && hasDraftGuild"
          to="/compte/guilde/"
          title="Votre page de guilde est activée !"
        >
          <BellIcon class="text-red-500" style="height: 24px; width: 24px" />
        </NavbarLink>
        <NavbarLink
          v-show="showAccountButton"
          :to="accountLinkUrl"
          title="Mon compte"
        >
          <span class="space-x-2 flex items-center justify-center bg-blue-900 bg-opacity-25 hover:bg-opacity-75 border border-blue-300 px-4 py-2 rounded-full shadow">
            <UserIcon />
            <span v-if="isGuest">Connexion</span>
            <span v-else>Mon compte</span>
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
