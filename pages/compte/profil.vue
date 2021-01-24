<template>
  <div class="space-y-10">
    <h2 class="text-blue-100 text-2xl leading-none font-semibold text-shadow border-b border-gray-700 pb-5">
      Battle.net
    </h2>
    <div class="flex shadow-md">
      <div class="w-20 h-20 bg-gray-900 rounded-l flex items-center">
        <BattleNetIcon class="h-10" />
      </div>
      <div class="p-6 flex-grow flex items-center bg-gray-300 text-gray-800 rounded-r">
        <div>
          Connecté en tant que <span class="font-semibold">{{ username }}</span>.
        </div>
      </div>
    </div>
    <DangerButton @click="logout">
      Déconnexion
    </DangerButton>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DangerButton from '~/components/ui/DangerButton.vue'
import BattleNetIcon from '~/components/icons/BattleNetIcon.vue'

export default {
  name: 'Profile',
  layout: 'account',
  components: {
    DangerButton,
    BattleNetIcon
  },
  computed: {
    ...mapState('auth', [
      'user'
    ]),
    username () {
      return this.user?.name
    }
  },
  methods: {
    async logout () {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/connexion/')
    }
  }
}
</script>

<style>

</style>
