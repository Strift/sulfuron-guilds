<template>
  <div class="space-y-10">
    <RegisterGuildCard />
    <Heading2>Battle.net</Heading2>
    <BattleNetCard />
    <BaseDangerButton @click="logout">
      Déconnexion
    </BaseDangerButton>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Heading2 from '~/components/atoms/Heading2.vue'
import RegisterGuildCard from '~/components/organisms/Account/RegisterGuildCard.vue'
import BattleNetCard from '~/components/organisms/Account/BattleNetCard.vue'

export default {
  name: 'Settings',
  layout: 'account',
  components: {
    Heading2,
    RegisterGuildCard,
    BattleNetCard
  },
  computed: {
    ...mapGetters('account', [
      'username',
      'isAGuildOwner'
    ])
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
