<template>
  <AccountSettings @logout="logout" />
</template>

<script>
import AccountSettings from '~/components/templates/AccountSettings.vue'

export default {
  name: 'Settings',
  layout: 'account',
  components: {
    AccountSettings
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
