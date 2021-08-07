<template>
  <div>
    <HomeHeader class="mb-20" />
    <div class="border-gray-700 mb-6 sm:border-b sm:flex sm:justify-between sm:pb-6 sm:space-y-0 space-y-6">
      <div class="border-b border-gray-700 pb-6 sm:border-0 sm:p-0">
        <HomeFactionButton class="text-gray-200" />
      </div>
      <div class="flex space-x-5">
        <SearchBar class="sm:w-auto w-full" @input="updateTextQuery" />
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
        <ResetFiltersButton v-show="classFilters.length" class="hidden sm:inline-flex" />
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

    <div>
      <div class="mb-10 sm:flex sm:justify-between sm:space-y-0 space-y-3">
        <div class="flex items-center space-x-2 text-gray-600">
          <SortAscendingIcon />
          <div>Guildes triées par {{ sortingText }}.</div>
        </div>
        <div>
          <label class="hover:text-blue-300 text-gray-600">
            <input v-model="removeOutdatedGuilds" type="checkbox" name="removeOutdatedGuilds">
            <span class="ml-2">Afficher uniquement les guildes à jour.</span>
          </label>
        </div>
      </div>
      <transition-group :duration="500" name="fade" tag="div" class="gap-12 grid grid-cols-1 grid-flow-row lg:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="guild in orderedSearchResults"
          :key="guild.name"
        >
          <GuildCard
            :id="guild.id"
            :name="guild.name"
            :type="guild.type"
            :raid-days="raidDays(guild)"
            :time-range="timeRange(guild)"
            :recruitment="guild.recruitment"
            :logo-url="guild.logoUrl"
            :website-url="guild.websiteUrl"
            :contact-url="guild.contactUrl"
            :updated-at="guild.updatedAt"
            @click="openGuild(guild)"
          />
        </div>
      </transition-group>
    </div>

    <div class="mt-12 text-center text-gray-500">
      {{ orderedSearchResults.length }} {{ resultsText }} trouvées.
    </div>

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
import sortBy from 'lodash/sortBy'
import { mapGetters } from 'vuex'

import FilterIcon from '~/components/icons/solid/FilterIcon.vue'
import SortAscendingIcon from '~/components/icons/solid/SortAscendingIcon.vue'
import SearchBar from '~/components/SearchBar.vue'
import GuildCard from '~/components/GuildCard.vue'
import SearchFilters from '~/components/SearchFilters.vue'
import ActiveClassFiltersList from '~/components/ActiveClassFiltersList.vue'
import ResetFiltersButton from '~/components/ResetFiltersButton.vue'
import ChevronDownIcon from '~/components/icons/solid/ChevronDownIcon.vue'

export default {
  name: 'Index',
  components: {
    FilterIcon,
    SortAscendingIcon,
    SearchBar,
    GuildCard,
    SearchFilters,
    ActiveClassFiltersList,
    ResetFiltersButton,
    ChevronDownIcon
  },
  data: () => ({
    showFiltersCard: false,
    expandFilters: false
  }),
  computed: {
    ...mapGetters('guilds', {
      searchResults: 'searchResults',
      classFilters: 'classFilters'
    }),
    ...mapGetters('account', [
      'isGuest',
      'isAuthenticated'
    ]),
    removeOutdatedGuilds: {
      get () {
        return this.$store.state.guilds.removeOutdatedGuilds
      },
      set (value) {
        this.$store.commit('guilds/setRemoveOutdatedGuilds', value)
      }
    },
    orderedSearchResults () {
      return sortBy(this.searchResults, [guild => guild.name.toLowerCase()])
    },
    resultsText () {
      return this.searchResults.length > 1 ? 'guildes' : 'guilde'
    },
    sortingText () {
      return 'ordre alphabétique'
    }
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
  methods: {
    updateTextQuery (textQuery) {
      this.$store.commit('guilds/setTextQuery', textQuery)
    },
    timeRange ({ startHour, endHour }) {
      return startHour + ' – ' + endHour
    },
    raidDays ({ raidDays }) {
      return raidDays
        .filter(({ playing }) => playing)
        .map(({ day }) => day)
    },
    recruitmentClasses ({ recruitment }) {
      return recruitment
        .filter(({ open }) => open)
        .map(recruitmentState => recruitmentState.class)
    },
    removeClassFilter (classValue, specValue) {
      this.$store.commit('guilds/removeClassFilter', { classValue, specValue })
    },
    openGuild (guild) {
      this.$store.commit('setOpenGuild', guild)
    }
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
