<template>
  <div class="space-y-10">
    <BaseInformationCard
      v-if="!isAGuildOwner"
    >
      <div class="flex font-semibold mb-4 space-x-4">
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
    </BaseInformationCard>
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
