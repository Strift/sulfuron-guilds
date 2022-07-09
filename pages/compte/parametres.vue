<template>
  <AccountSettingsPage @logout="logout" />
</template>

<script>
import AccountSettingsPage from '~/components/templates/AccountSettingsPage.vue'

export default {
  name: 'Settings',
  layout: 'account',
  components: {
    AccountSettingsPage
  },
  methods: {
    async logout () {
      await this.$store.dispatch('account/logout')
      this.$router.push('/connexion/')
    }
  },
  head () {
    return {
      title: 'Paramètres - Sulfuron-EU'
    }
  }
}
</script>
