<template>
  <LoginCard class="mx-auto">
    <div v-if="isGuest" class="flex flex-col h-full">
      <h1 class="font-bold text-gray-900 text-4xl leading-none pb-8">
        Connectez-vous via Battle.net
      </h1>
      <p class="text-gray-700">
        La connexion est nécessaire uniquement pour administrer une guilde.
      </p>
      <div class="mt-auto text-center">
        <LoginButton class="shadow-md hover:shadow-lg mb-12" />
        <p class="text-gray-500 text-center">
          En cliquant sur Connexion, vous serez redirigé vers le site de Blizzard.
        </p>
      </div>
    </div>

    <div v-else class="flex flex-col h-full">
      <h1 class="font-bold text-gray-900 text-4xl leading-none pb-8">
        Connexion en cours...
      </h1>
      <OrbitSpinner
        :animation-duration="600"
        :size="120"
        class="m-auto"
        color="#4299E1"
      />
      <p class="text-gray-500 text-center mt-auto">
        Veuillez patienter.
      </p>
    </div>
  </LoginCard>
</template>

<script>
import { mapGetters } from 'vuex'
import OrbitSpinner from 'epic-spinners/src/components/lib/OrbitSpinner.vue'
import LoginCard from '~/components/LoginCard.vue'
import LoginButton from '~/components/LoginButton.vue'

const AUTH_TOKEN_QUERY = 'auth_token'

export default {
  components: {
    LoginCard,
    LoginButton,
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
