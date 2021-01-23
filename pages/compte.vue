<template>
  <div class="flex items-baseline text-gray-300">
    <div class="w-1/4 py-2">
      <h2 class="font-semibold text-2xl leading-none border border-transparent text-shadow">
        Compte
      </h2>
    </div>
    <div class="w-3/4 py-2 border-l border-gray-300 border-opacity-75 pl-10 space-y-8">
      <div class="text-2xl leading-none font-semibold text-shadow">
        Battle.net
      </div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DangerButton from '~/components/ui/DangerButton.vue'
import BattleNetIcon from '~/components/icons/BattleNetIcon.vue'

export default {
  name: 'Account',
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
