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
    <div class="space-y-6 mb-6">
      <div class="border-b border-gray-700 pb-6">
        <FactionButton class="text-gray-200" />
      </div>
      <div class="flex space-x-5">
        <SearchBar />
        <SearchFiltersButton ref="searchFiltersButton" />
      </div>
      <SearchFiltersCard />
    </div>
    <div class="hidden md:flex text-white mb-16 opacity-75 justify-end space-x-4">
      <label v-for="(wowClass) in wowClasses" :key="wowClass.value" class="flex items-center space-x-1">
        <input :id="wowClass.value" v-model="classQuery" type="checkbox" :name="wowClass.name" :value="wowClass.value">
        <ClassIcon :wow-class="wowClass.value" class="h-5" />
      </label>
    </div>

    <transition-group :duration="500" name="fade" tag="div" class="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
      <GuildCard
        v-for="guild in filteredSearchResults"
        :key="guild.name"
        :name="guild.name"
        :type="guild.type"
        :raid-days="raidDays(guild)"
        :time-range="timeRange(guild)"
        :recruitment="recruitmentClasses(guild)"
        :logo-url="guild.logoUrl"
        :website-url="guild.websiteUrl"
        :contact-url="guild.contactUrl"
        class="shadow-md"
      />
    </transition-group>

    <div class="text-center mt-12 text-gray-500">
      {{ filteredSearchResults.length }} {{ resultText(filteredSearchResults.length) }} trouvées.
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
import Fuse from 'fuse.js'

import SearchFiltersButton from '~/components/SearchFiltersButton.vue'
import SearchFiltersCard from '~/components/SearchFiltersCard.vue'

import WOW_CLASSES from '~/data/classes.json'

const FUSE_OPTIONS = {
  threshold: 0.2,
  keys: ['name', 'type']
}

export default {
  name: 'Index',
  components: {
    SearchFiltersButton,
    SearchFiltersCard
  },
  data: () => ({
    wowClasses: WOW_CLASSES,
    fuse: new Fuse([], FUSE_OPTIONS),
    textQuery: '',
    classQuery: []
  }),
  computed: {
    ...mapGetters('guilds', {
      guilds: 'currentFactionGuilds'
    }),
    ...mapGetters('account', [
      'isGuest',
      'isAuthenticated'
    ]),
    fuzzySearchResults () {
      if (this.fuse == null || this.textQuery.length === 0) {
        return this.guilds
      }
      return this.fuse.search(this.textQuery).map(result => result.item)
    },
    filteredSearchResults () {
      if (this.classQuery.length === 0) {
        return this.fuzzySearchResults
      }
      return this.fuzzySearchResults.filter((guild) => {
        return guild.recruitment.some(recruitmentState => recruitmentState.open && this.classQuery.includes(recruitmentState.class))
      })
    }
  },
  watch: {
    guilds (updatedGuilds) {
      this.fuse.setCollection(updatedGuilds)
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
    resultText (count) {
      return count > 1 ? 'guildes' : 'guilde'
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
