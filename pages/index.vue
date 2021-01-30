<template>
  <div>
    <div class="flex flex-col md:flex-row items-start md:items-center md:justify-between space-y-5 md:space-y-0 text-gray-200 border-b border-gray-500 border-opacity-25 pb-6 mb-6">
      <FactionButton />
      <input
        v-model="textQuery"
        type="text"
        class="px-4 py-2 max-w-xs rounded-full text-gray-300 bg-gray-700 focus:bg-gray-600 bg-opacity-50 focus:bg-opacity-50 border border-gray-500 border-opacity-25 outline-none"
        placeholder="🔍 Nyk Trib..."
      >
    </div>
    <div class="hidden md:flex text-white mb-12 opacity-75 justify-end space-x-4">
      <label v-for="(wowClass) in wowClasses" :key="wowClass" class="flex items-center space-x-1">
        <input :id="wowClass" v-model="classQuery" type="checkbox" :name="wowClass" :value="wowClass">
        <ClassIcon :wow-class="wowClass" class="h-5" />
      </label>
    </div>

    <div class="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
      <GuildCard
        v-for="(guild, index) in filteredSearchResults"
        :key="index"
        :name="guild.name"
        :type="guild.type"
        :days="guild.days"
        :time-range="guild.timeRange"
        :recruitment="guild.recruitment"
        :image-url="guild.imageUrl"
        :website-url="guild.websiteUrl"
        :contact-url="guild.contactUrl"
        :activity="guild.activity"
        :supports="guild.supports"
        class="shadow-md"
      />
    </div>

    <div class="text-center mt-auto text-gray-300">
      {{ filteredSearchResults.length }} {{ resultText(filteredSearchResults.length) }}.
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Fuse from 'fuse.js'
import FactionButton from '~/components/FactionButton.vue'
import ClassIcon from '~/components/icons/ClassIcon.vue'
import GuildCard from '~/components/GuildCard.vue'

export default {
  name: 'Index',
  components: {
    FactionButton,
    ClassIcon,
    GuildCard
  },
  data: () => ({
    wowClasses: ['Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior'],
    fuse: null,
    textQuery: '',
    classQuery: []
  }),
  computed: {
    ...mapState({
      guilds: state => state.guilds.list
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
        return guild.recruitment.some(wowClass => this.classQuery.includes(wowClass))
      })
    }
  },
  async mounted () {
    // Performing data fetching in mounted hook because of NuxtFirebase issues with SSR
    await this.$store.dispatch('guilds/enableSync')
    this.fuse = new Fuse(this.guilds, {
      keys: ['name', 'type', 'days', 'recruitment']
    })
  },
  async beforeDestroy () {
    await this.$store.dispatch('guilds/disableSync')
  },
  methods: {
    resultText (count) {
      return count > 1 ? 'résultats' : 'résultat'
    }
  }
}
</script>
