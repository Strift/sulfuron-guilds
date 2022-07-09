<template>
  <div class="space-y-10">
    <RegisterGuildSection />
    <BaseHeader2>
      Battle.net
    </BaseHeader2>
    <div class="flex shadow-md">
      <div class="bg-gray-900 flex h-20 items-center rounded-l w-20">
        <BattleNetIcon class="h-10" />
      </div>
      <div class="bg-gray-300 flex flex-grow items-center p-6 rounded-r text-gray-800">
        <div>
          Connecté en tant que <span class="font-semibold">{{ username }}</span>.
        </div>
      </div>
    </div>
    <BaseDangerButton @click="logout">
      Déconnexion
    </BaseDangerButton>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RegisterGuildSection from '~/components/organisms/Account/RegisterGuildSection.vue'

export default {
  name: 'Settings',
  layout: 'account',
  components: {
    RegisterGuildSection
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
