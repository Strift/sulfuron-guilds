<template>
  <header
    class="bg-gray-900 bg-opacity-25 duration-150 mb-12 md:mb-16 shadow-lg transition-background"
    :class="{'bg-opacity-75 bg-blur ': false}"
  >
    <BaseContainer>
      <div class="flex h-24 items-center">
        <NuxtLink
          to="/"
          title="Accueil"
          class="md:ml-0 md:mr-auto"
        >
          <BaseLogo class="mx-auto" :navbar="true" />
        </NuxtLink>
        <nav>
          <ul class="flex items-center list-none md:space-x-12 space-x-5">
            <NavbarLink
              v-show="showAccountButton && hasDraftGuild"
              to="/compte/guilde/"
              title="Votre page de guilde est activée !"
            >
              <BellIcon class="text-red-500" style="height: 24px; width: 24px" />
            </NavbarLink>
            <BackButton
              v-show="showBackButton"
              class="hidden md:inline-flex"
            />
            <NavbarLink
              v-show="showAdminButton && isAdmin"
              to="/admin/guildes/"
              title="Administration"
            >
              Admin
            </NavbarLink>
            <NavbarLink
              v-show="showAccountButton"
              :to="accountLinkUrl"
              title="Mon compte"
            >
              <span class="bg-blue-900 bg-opacity-25 border border-blue-300 flex hover:bg-opacity-50 items-center justify-center px-4 py-2 rounded-full shadow-md space-x-2">
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
      </div>
    </BaseContainer>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import BellIcon from '~/components/icons/outline/BellIcon.vue'
import UserIcon from '~/components/icons/solid/UserIcon.vue'

export default {
  components: {
    BellIcon,
    UserIcon
  },
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
