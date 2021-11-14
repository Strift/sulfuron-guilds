<template>
  <LoginCard class="mx-auto">
    <div v-if="isGuest" class="flex flex-col h-full">
      <h1 class="font-bold leading-none pb-8 text-4xl text-gray-900">
        Connectez-vous via Battle.net
      </h1>
      <p class="text-gray-700">
        La connexion est nécessaire uniquement pour administrer une guilde.
      </p>
      <div class="mt-auto text-center">
        <LoginButton
          :href="`${$config.baseURL}/auth/battlenet`"
          class="hover:shadow-lg mb-12 shadow-md"
          @click="startLoading"
        />
        <p class="text-center text-gray-500">
          En cliquant sur Connexion, vous serez redirigé vers le site de Blizzard.
        </p>
      </div>
    </div>

    <div v-else class="flex flex-col h-full">
      <h1 class="font-bold leading-none pb-8 text-4xl text-gray-900">
        Connexion en cours...
      </h1>
      <UiLoader class="m-auto" />
      <p class="mt-auto text-center text-gray-500">
        Veuillez patienter.
      </p>
    </div>
  </LoginCard>
</template>

<script>
import { mapGetters } from 'vuex'

const AUTH_TOKEN_QUERY = 'auth_token'

export default {
  scrollToTop: true,
  layout: 'default',
  computed: {
    ...mapGetters('account', [
      'isGuest'
    ]),
    authToken () {
      return this.$router.currentRoute.query[AUTH_TOKEN_QUERY]
    }
  },
  mounted () {
    if (this.authToken) {
      this.handleAuthRedirect()
    }
  },
  methods: {
    async handleAuthRedirect () {
      await this.$store.dispatch('account/login', this.authToken)
      this.$router.push('/')
    },
    startLoading () {
      this.$store.commit('account/startAuthLoading')
    }
  },
  head () {
    return {
      title: 'Connexion - Sulfuron-EU',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Inscrivez-vous au portail des guildes de Sulfuron-EU pour gérer le recrutement de votre guilde sur The Burning Crusade Classic.'
        }
      ]
    }
  }
}
</script>
