<template>
  <div class="space-y-10">
    <div
      v-if="!isAGuildOwner"
      class="bg-blue-900 bg-opacity-50 text-gray-500 rounded px-6 py-4 shadow flex items-center space-x-4"
    >
      <div>
        ℹ️
      </div>
      <p>
        Pour créer une <span class="font-semibold">page de guilde</span>, effectuez une demande aux modérateurs du <span class="font-semibold">Discord Sulfuron</span>.
      </p>
    </div>
    <AccountPageTitle>
      Battle.net
    </AccountPageTitle>
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
import { mapGetters } from 'vuex'
import AccountPageTitle from '~/components/ui/AccountPageTitle.vue'
import DangerButton from '~/components/ui/DangerButton.vue'
import BattleNetIcon from '~/components/icons/BattleNetIcon.vue'

export default {
  name: 'Profile',
  layout: 'account',
  components: {
    AccountPageTitle,
    DangerButton,
    BattleNetIcon
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
  }
}
</script>

<style>

</style>
