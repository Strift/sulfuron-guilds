<template>
  <div>
    <HomeHeader class="mb-20" />

    <div class="border-gray-700 mb-6 sm:border-b sm:flex sm:justify-between sm:pb-6 sm:space-y-0 space-y-6">
      <div class="border-b border-gray-700 pb-6 sm:border-0 sm:p-0">
        <HomeFactionButton class="text-gray-200" />
      </div>
      <div class="flex space-x-5">
        <HomeSearchBar class="sm:w-auto w-full" />
      </div>
    </div>

    <div class="mb-10">
      <div class="flex items-center justify-between mb-6 text-gray-500">
        <div class="hidden items-center sm:flex space-x-2">
          <FilterIcon />
          <div class="font-semibold text-sm tracking-wider uppercase">
            Filtres de classe
          </div>
        </div>
        <button class="flex items-center sm:hidden space-x-2" @click="expandFilters = !expandFilters">
          <FilterIcon />
          <div class="font-semibold text-sm tracking-wider uppercase">
            Filtres de classe
          </div>
          <ChevronDownIcon class="duration-150 transform transition-transform" :class="{ 'rotate-180': expandFilters }" />
        </button>
        <div class="hidden sm:inline-flex">
          <ResetFiltersButton v-if="classFilters.length > 0" />
        </div>
      </div>
      <SearchFilters class="hidden sm:block" />
      <SearchFilters v-show="expandFilters" class="sm:hidden" />

      <div v-show="classFilters.length && !expandFilters" class="mt-6 sm:hidden">
        <div class="font-semibold mb-3 text-gray-600">
          Filtres actifs
        </div>
        <ActiveClassFiltersList />
      </div>
    </div>

    <div class="mb-10 sm:flex sm:justify-between sm:space-y-0 space-y-3">
      <HomeSorting />
      <div>
        <label class="hover:text-blue-300 text-gray-600">
          <input v-model="removeOutdatedResults" type="checkbox" name="removeOutdatedGuilds">
          <span class="ml-2">Afficher uniquement les guildes à jour.</span>
        </label>
      </div>
    </div>

    <HomeGuildsList />

    <HomeSearchSummary class="mt-12" />

    <div v-show="isGuest" class="mt-20 space-y-10">
      <p class="text-center text-gray-300 text-lg">
        Votre guilde n'y est pas ? Créez un compte pour pouvoir gérer votre guilde.
      </p>
      <NuxtLink to="/connexion/" class="bg-blue-900 bg-opacity-25 block border border-blue-300 hover:bg-opacity-75 hover:text-blue-200 max-w-xs mx-auto px-4 py-2 rounded-full shadow text-blue-300 text-center text-lg text-shadow-sm">
        Connexion
      </NuxtLink>
    </div>
    <div v-show="isAuthenticated" class="mt-20 space-y-10">
      <p class="text-center text-gray-300 text-lg">
        Votre guilde n'y est pas ? Contactez un modérateur du Discord pour créer celle-ci.
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import { computed, ref } from '@nuxtjs/composition-api'
import FilterIcon from '~/components/icons/solid/FilterIcon.vue'
import SearchFilters from '~/components/SearchFilters.vue'
import ActiveClassFiltersList from '~/components/ActiveClassFiltersList.vue'
import ResetFiltersButton from '~/components/ResetFiltersButton.vue'
import ChevronDownIcon from '~/components/icons/solid/ChevronDownIcon.vue'
import useSearchStore from '~/composables/useSearchStore'

export default {
  name: 'Index',
  components: {
    FilterIcon,
    SearchFilters,
    ActiveClassFiltersList,
    ResetFiltersButton,
    ChevronDownIcon
  },
  setup () {
    const { removeOutdatedGuilds, setRemoveOutdatedGuilds } = useSearchStore()

    const expandFilters = ref(false)
    const removeOutdatedResults = computed({
      get: () => removeOutdatedGuilds.value,
      set: value => setRemoveOutdatedGuilds(value)
    })

    return {
      expandFilters,
      removeOutdatedResults
    }
  },
  computed: {
    ...mapGetters('guilds', {
      classFilters: 'classFilters'
    }),
    ...mapGetters('account', [
      'isGuest',
      'isAuthenticated'
    ])
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
          content: 'Trouvez et rejoignez votre nouvelle guilde WoW Classic sur sur le serveur Sulfuron (The Burning Crusade).'
        }
      ]
    }
  }
}
</script>
