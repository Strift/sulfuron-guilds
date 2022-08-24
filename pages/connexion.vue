<template>
  <LoginPage />
</template>

<script>
import LoginPage from '~/components/templates/LoginPage.vue'

const AUTH_TOKEN_QUERY = 'auth_token'

export default {
  components: {
    LoginPage
  },
  layout: 'default',
  scrollToTop: true,
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
  },
  computed: {
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
  }
}
</script>
