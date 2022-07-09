<template>
  <IllidanCard class="mx-auto">
    <div v-if="isGuest" class="flex flex-col h-full">
      <h1 class="font-bold leading-none pb-8 text-4xl text-gray-900">
        Connectez-vous via Battle.net
      </h1>
      <p class="text-gray-700">
        La connexion est nécessaire uniquement pour administrer une guilde.
      </p>
      <div class="mt-auto text-center">
        <BattleNetLoginButton
          :href="`${$config.baseURL}/auth/battlenet`"
          class="hover:shadow-lg mb-12 shadow-md"
          @click="startLoading"
        />
        <p class="text-center text-gray-500">
          En cliquant sur Connexion, vous serez redirigé vers le site de Blizzard.
        </p>
      </div>
    </div>

    <div v-else class="flex flex-col h-full">
      <h1 class="font-bold leading-none pb-8 text-4xl text-gray-900">
        Connexion en cours...
      </h1>
      <UiLoader class="m-auto" />
      <p class="mt-auto text-center text-gray-500">
        Veuillez patienter.
      </p>
    </div>
  </IllidanCard>
</template>

<script>
import { mapGetters } from 'vuex'
import IllidanCard from '~/components/molecules/IllidanCard.vue'
import BattleNetLoginButton from '~/components/molecules/BattleNetLoginButton.vue'

export default {
  components: {
    IllidanCard,
    BattleNetLoginButton
  },
  computed: {
    ...mapGetters('account', ['isGuest'])
  },
  methods: {
    startLoading () {
      this.$store.commit('account/startAuthLoading')
    }
  }
}
</script>
