<template>
  <div>
    <div class="flex flex-col md:flex-row items-start md:items-center md:justify-between space-y-5 md:space-y-0 text-gray-200 border-b border-gray-700 pb-6 mb-6">
      <FactionButton />
      <input
        v-model="textQuery"
        type="text"
        class="px-3 max-w-xs rounded-full focus:border-blue-300 focus:border-opacity-75 focus:text-gray-400 focus:shadow bg-blue-900 bg-opacity-25 border border-gray-700 text-gray-500 placeholder-gray-700 h-10 outline-none shadow-sm block w-full"
        placeholder="🔍 Nyk Trib..."
      >
    </div>
    <div class="hidden md:flex text-white mb-12 opacity-75 justify-end space-x-4">
      <label v-for="(wowClass) in wowClasses" :key="wowClass.value" class="flex items-center space-x-1">
        <input :id="wowClass.value" v-model="classQuery" type="checkbox" :name="wowClass.name" :value="wowClass.value">
        <ClassIcon :wow-class="wowClass.value" class="h-5" />
      </label>
    </div>

    <div class="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
      <GuildCard
        v-for="(guild, index) in filteredSearchResults"
        :key="index"
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
    </div>

    <div class="text-center mt-auto text-gray-300">
      {{ filteredSearchResults.length }} {{ resultText(filteredSearchResults.length) }}.
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Fuse from 'fuse.js'

import WOW_CLASSES from '~/data/classes.json'

const FUSE_OPTIONS = {
  threshold: 0.2,
  keys: ['name', 'type']
}

export default {
  name: 'Index',
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
