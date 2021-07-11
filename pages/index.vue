<template>
  <div>
    <div class="mb-20">
      <h1 class="font-semibold leading-none mb-4 text-4xl text-blue-100 text-shadow-lg">
        Portail des guildes
      </h1>
      <p class="text-gray-400 text-lg text-shadow-md">
        Votre nouvelle plateforme dédiée au recrutement sur Sulfuron.
        <NuxtLink to="/en-savoir-plus/" class="font-semibold hover:text-blue-400 text-blue-300">
          En savoir plus.
        </NuxtLink>
      </p>
    </div>
    <div class="border-gray-700 mb-6 sm:border-b sm:flex sm:justify-between sm:pb-6 sm:space-y-0 space-y-6">
      <div class="border-b border-gray-700 pb-6 sm:border-0 sm:p-0">
        <FactionButton class="text-gray-200" />
      </div>
      <div class="flex space-x-5">
        <SearchBar class="sm:w-auto w-full" @input="updateTextQuery" />
        <SearchFiltersButton
          ref="searchFiltersButton"
          :active="showFiltersCard"
          @click="showFiltersCard = !showFiltersCard"
        />
      </div>
    </div>

    <SearchFiltersCard v-show="showFiltersCard" class="mb-6 shadow-xl" />

    <div v-if="classFilters.length" v-show="!showFiltersCard" class="mb-3">
      <div class="font-semibold mb-3 text-gray-500 text-sm tracking-wider uppercase">
        Filtres
      </div>
      <transition-group :duration="250" name="fade" tag="div" class="flex flex-row flex-wrap">
        <ClassFilter
          v-for="filter in classFilters"
          :key="`${filter.classValue}/${filter.specName}`"
          :wow-class="filter.classValue"
          class="mb-4 mr-4"
          @remove="removeClassFilter(filter.classValue, filter.specValue)"
        >
          {{ filter.specName }}
        </ClassFilter>
      </transition-group>
    </div>

    <div class="flex items-center space-x-2 text-gray-700">
      <SortAscendingIcon />
      <div>Guildes triées par {{ sortingText }}.</div>
    </div>

    <transition-group :duration="500" name="fade" tag="div" class="gap-12 grid grid-cols-1 grid-flow-row my-12 sm:grid-cols-2 xl:grid-cols-3">
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
          @click="openGuild(guild)"
        />
      </div>
    </transition-group>

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

import SearchBar from '~/components/SearchBar.vue'
import GuildCard from '~/components/GuildCard.vue'
import FactionButton from '~/components/FactionButton.vue'
import SortAscendingIcon from '~/components/icons/solid/SortAscendingIcon.vue'
import SearchFiltersButton from '~/components/SearchFiltersButton.vue'
import SearchFiltersCard from '~/components/SearchFiltersCard.vue'
import ClassFilter from '~/components/ClassFilter.vue'

export default {
  name: 'Index',
  components: {
    SearchBar,
    GuildCard,
    FactionButton,
    SortAscendingIcon,
    SearchFiltersButton,
    SearchFiltersCard,
    ClassFilter
  },
  data: () => ({
    showFiltersCard: false
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
      title: 'Portail des guildes'
    }
  }
}
</script>
