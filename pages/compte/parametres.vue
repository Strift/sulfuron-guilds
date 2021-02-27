<template>
  <div class="space-y-10">
    <InformationCard
      v-if="!isAGuildOwner"
    >
      <div class="font-semibold mb-4 flex space-x-4">
        <div>ℹ️</div>
        <div>
          Comment enregistrer ma guilde ?
        </div>
      </div>
      <p class="mb-2">
        Pour activer votre page de guilde, effectuez une demande auprès des <span class="font-semibold">modérateurs du Discord Sulfuron</span> en fournissant votre :
      </p>
      <ul class="list-disc list-inside space-y-1">
        <li>BattleTag&trade; <em>(avec les majuscules, si nécessaire)</em></li>
        <li>Nom de guilde</li>
      </ul>
    </InformationCard>
    <PageSectionTitle>
      Battle.net
    </PageSectionTitle>
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

export default {
  name: 'Settings',
  layout: 'account',
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
      title: 'Paramètres'
    }
  }
}
</script>

<style>

</style>
