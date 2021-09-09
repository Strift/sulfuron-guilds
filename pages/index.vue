<template>
  <BaseContainer>
    <HomeHeader class="mb-20" />

    <div class="mb-6 space-y-6 border-gray-700 sm:border-b sm:flex sm:justify-between sm:pb-6 sm:space-y-0">
      <div class="pb-6 border-b border-gray-700 sm:border-0 sm:p-0">
        <HomeFactionButton class="text-gray-200" />
      </div>
      <div class="flex space-x-5">
        <HomeSearchBar class="w-full sm:w-auto" />
      </div>
    </div>

    <div class="mb-10">
      <div class="flex items-center justify-between mb-6 text-gray-500">
        <div class="items-center hidden space-x-2 sm:flex">
          <FilterIcon />
          <div class="text-sm font-semibold tracking-wider uppercase">
            Filtres de classe
          </div>
        </div>
        <button class="flex items-center space-x-2 sm:hidden" @click="expandFilters = !expandFilters">
          <FilterIcon />
          <div class="text-sm font-semibold tracking-wider uppercase">
            Filtres de classe
          </div>
          <ChevronDownIcon class="transition-transform duration-150 transform" :class="{ 'rotate-180': expandFilters }" />
        </button>
        <div class="hidden sm:inline-flex">
          <HomeSearchFiltersResetButton v-if="classFilters.length > 0" />
        </div>
      </div>
      <HomeSearchFilters class="hidden sm:block" />
      <HomeSearchFilters v-show="expandFilters" class="sm:hidden" />

      <div v-show="classFilters.length && !expandFilters" class="mt-6 sm:hidden">
        <div class="mb-3 font-semibold text-gray-600">
          Filtres actifs
        </div>
        <HomeSearchActiveFilters />
      </div>
    </div>

    <div class="mb-10 space-y-3 sm:flex sm:justify-between sm:space-y-0">
      <HomeSorting />
      <div>
        <label class="text-gray-600 hover:text-blue-300">
          <input v-model="removeOutdatedResults" type="checkbox" name="removeOutdatedGuilds">
          <span class="ml-2">Afficher uniquement les guildes à jour.</span>
        </label>
      </div>
    </div>

    <HomeGuildsList />

    <HomeSearchSummary class="mt-12" />

    <div v-show="isGuest" class="mt-20 space-y-10">
      <p class="text-lg text-center text-gray-300">
        Votre guilde n'y est pas ? Créez un compte pour pouvoir gérer votre guilde.
      </p>
      <NuxtLink to="/connexion/" class="block max-w-xs px-4 py-2 mx-auto text-lg text-center text-blue-300 bg-blue-900 bg-opacity-25 border border-blue-300 rounded-full shadow hover:bg-opacity-75 hover:text-blue-200 text-shadow-sm">
        Connexion
      </NuxtLink>
    </div>
    <div v-show="isAuthenticated" class="mt-20 space-y-10">
      <p class="text-lg text-center text-gray-300">
        Votre guilde n'y est pas ? Contactez un modérateur du Discord pour créer celle-ci.
      </p>
    </div>
  </BaseContainer>
</template>

<script>
import { mapGetters } from 'vuex'
import { computed, ref } from '@nuxtjs/composition-api'
import useSearchStore from '~/composables/useSearchStore'
import useAccountStore from '~/composables/useAccountStore'

import FilterIcon from '~/components/icons/solid/FilterIcon.vue'
import ChevronDownIcon from '~/components/icons/solid/ChevronDownIcon.vue'

export default {
  name: 'Index',
  layout: 'default',
  components: {
    FilterIcon,
    ChevronDownIcon
  },
  setup () {
    const { removeOutdatedGuilds, setRemoveOutdatedGuilds } = useSearchStore()
    const { isGuest, isAuthenticated } = useAccountStore()

    const expandFilters = ref(false)
    const removeOutdatedResults = computed({
      get: () => removeOutdatedGuilds.value,
      set: value => setRemoveOutdatedGuilds(value)
    })

    return {
      expandFilters,
      removeOutdatedResults,
      isGuest,
      isAuthenticated
    }
  },
  computed: {
    ...mapGetters('guilds', {
      classFilters: 'classFilters'
    })
  },
  created () {
    this.$store.commit('guilds/initializeClassFilters')
  },
  async mounted () {
    this.$store.commit('setFactionBackground')
    // Performing data fetching in mounted hook because of NuxtFirebase issues with SSR
    await this.$store.dispatch('guilds/enableSync')
  },
  async beforeDestroy () {
    await this.$store.dispatch('guilds/disableSync')
  },
  head () {
    return {
      title: 'Trouvez et rejoignez votre nouvelle guilde - Sulfuron-EU',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Trouvez et rejoignez votre nouvelle guilde WoW Classic sur le serveur Sulfuron (The Burning Crusade).'
        }
      ]
    }
  }
}
</script>
