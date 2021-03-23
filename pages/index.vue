<template>
  <div>
    <div class="mb-20">
      <h1 class="text-4xl text-blue-100 font-semibold mb-3 text-shadow-lg leading-none mb-4">
        Portail des guildes
      </h1>
      <p class="text-gray-400 text-lg text-shadow-md">
        Votre nouvelle plateforme dédiée au recrutement sur Sulfuron.
        <nuxt-link to="/en-savoir-plus/" class="text-blue-300 hover:text-blue-400 font-semibold">
          En savoir plus.
        </nuxt-link>
      </p>
    </div>
    <div class="space-y-6 mb-12">
      <div class="border-b border-gray-700 pb-6">
        <FactionButton class="text-gray-200" />
      </div>
      <div class="flex space-x-5">
        <SearchBar @input="updateTextQuery" />
        <SearchFiltersButton
          ref="searchFiltersButton"
          :active="showFiltersCard"
          @click="showFiltersCard = !showFiltersCard"
        />
      </div>
      <SearchFiltersCard v-show="showFiltersCard" class="shadow-xl" />
    </div>

    <transition-group :duration="500" name="fade" tag="div" class="grid grid-flow-row grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12 mb-12">
      <div
        v-for="guild in guildsSearchResults"
        :key="guild.name"
      >
        <GuildCard
          :name="guild.name"
          :type="guild.type"
          :raid-days="raidDays(guild)"
          :time-range="timeRange(guild)"
          :recruitment="guild.recruitment"
          :logo-url="guild.logoUrl"
          :website-url="guild.websiteUrl"
          :contact-url="guild.contactUrl"
          class="shadow-md"
        />
      </div>
    </transition-group>

    <div class="text-center mt-12 text-gray-500">
      {{ guildsSearchResults.length }} {{ resultsText }} trouvées.
    </div>

    <div v-show="isGuest" class="space-y-10 mt-20">
      <p class="text-center text-gray-300 text-lg">
        Votre guilde n'y est pas ? Créez un compte pour pouvoir gérer votre guilde.
      </p>
      <nuxt-link to="/connexion/" class="bg-blue-900 bg-opacity-25 hover:bg-opacity-75 border border-blue-300 text-blue-300 hover:text-blue-200 text-shadow-sm text-lg px-4 py-2 rounded-full shadow block max-w-xs mx-auto text-center">
        Connexion
      </nuxt-link>
    </div>
    <div v-show="isAuthenticated" class="space-y-10 mt-20">
      <p class="text-center text-gray-300 text-lg">
        Votre guilde n'y est pas ? Contactez un modérateur du Discord pour créer celle-ci.
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import SearchFiltersButton from '~/components/SearchFiltersButton.vue'
import SearchFiltersCard from '~/components/SearchFiltersCard.vue'

export default {
  name: 'Index',
  components: {
    SearchFiltersButton,
    SearchFiltersCard
  },
  data: () => ({
    showFiltersCard: false
  }),
  computed: {
    ...mapGetters('guilds', {
      guildsSearchResults: 'searchResults'
    }),
    ...mapGetters('account', [
      'isGuest',
      'isAuthenticated'
    ]),
    resultsText () {
      return this.guildsSearchResults.length > 1 ? 'guildes' : 'guilde'
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
    }
  },
  head () {
    return {
      title: 'Portail des guildes'
    }
  }
}
</script>
