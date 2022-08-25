<template>
  <AccountSettingsPage @logout="logout" />
</template>

<script>
import AccountSettingsPage from '~/components/templates/AccountSettingsPage.vue'

export default {
  name: 'Settings',
  components: {
    AccountSettingsPage
  },
  layout: 'account',
  head () {
    return {
      title: 'Paramètres - Sulfuron-EU'
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('account/logout')
      this.$router.push('/connexion/')
    }
  }
}
</script>
