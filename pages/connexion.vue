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
        <LoginButton class="hover:shadow-lg mb-12 shadow-md" />
        <p class="text-center text-gray-500">
          En cliquant sur Connexion, vous serez redirigé vers le site de Blizzard.
        </p>
      </div>
    </div>

    <div v-else class="flex flex-col h-full">
      <h1 class="font-bold leading-none pb-8 text-4xl text-gray-900">
        Connexion en cours...
      </h1>
      <OrbitSpinner
        :animation-duration="600"
        :size="120"
        class="m-auto"
        color="#4299E1"
      />
      <p class="mt-auto text-center text-gray-500">
        Veuillez patienter.
      </p>
    </div>
  </LoginCard>
</template>

<script>
import { mapGetters } from 'vuex'
import OrbitSpinner from 'epic-spinners/src/components/lib/OrbitSpinner.vue'

const AUTH_TOKEN_QUERY = 'auth_token'

export default {
  components: {
    OrbitSpinner
  },
  scrollToTop: true,
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
    }
  },
  head () {
    return {
      title: 'Connexion'
    }
  }
}
</script>
