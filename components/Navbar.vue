<template>
  <header
    class="mb-12 duration-150 bg-gray-900 bg-opacity-25 shadow-lg md:mb-16 transition-background"
    :class="{'bg-opacity-75 bg-blur ': false}"
  >
    <BaseContainer>
      <div class="flex items-center h-24">
        <NuxtLink
          to="/"
          title="Accueil"
          class="md:ml-0 md:mr-auto"
        >
          <Logo class="mx-auto" :compact="true" />
        </NuxtLink>
        <nav class="w-full">
          <ul class="flex items-center justify-end space-x-5 list-none md:space-x-12">
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
            <!-- <NavbarLink
              v-show="showAboutButton"
              to="/en-savoir-plus/"
              title="En savoir plus"
            >
              En savoir plus
            </NavbarLink> -->
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
              <span class="flex items-center justify-center px-4 py-2 space-x-2 bg-blue-900 bg-opacity-25 border border-blue-300 rounded-full shadow-md hover:bg-opacity-50">
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
import BaseContainer from '~/components/atoms/BaseContainer.vue'
import Logo from '~/components/Ui/Logo.vue'
import BellIcon from '~/components/icons/outline/BellIcon.vue'
import UserIcon from '~/components/icons/solid/UserIcon.vue'

export default {
  components: {
    BaseContainer,
    Logo,
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
      return this.$route.path !== '/' && !this.pathStartsWith('/g/')
    },
    showAboutButton () {
      return this.$route.path !== '/en-savoir-plus/'
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
