<template>
  <div>
    <div class="flex flex-col md:flex-row items-start md:items-center md:justify-between space-y-5 md:space-y-0 text-gray-400 border-b border-gray-200 pb-6 mb-6">
      <FactionButton />
      <input v-model="search" type="text" class="py-1 w-full md:max-w-xs px-3 rounded-full text-gray-700" placeholder="Nyk Trib">
    </div>
    <div class="hidden md:flex text-white mb-12 opacity-75 justify-end space-x-4">
      <label v-for="wowClass in wowClasses" :key="wowClass" class="flex items-center space-x-1">
        <input :id="wowClass" type="checkbox" :name="wowClass">
        <ClassIcon :wow-class="wowClass" class="h-5" />
      </label>
    </div>

    <div class="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
      <GuildCard
        v-for="(guild, index) in guilds"
        :key="index"
        :name="guild.name"
        :type="guild.type"
        :days="guild.days"
        :recruitment="guild.recruitment"
        :activity="guild.activity"
        :supports="guild.supports"
      />
    </div>

    <div class="text-center mt-auto">
      123 résultats.
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FactionButton from '~/components/FactionButton.vue'
import ClassIcon from '~/components/icons/ClassIcon.vue'
import GuildCard from '~/components/GuildCard.vue'

export default {
  components: {
    FactionButton,
    ClassIcon,
    GuildCard
  },
  async fetch () {
    await this.$store.dispatch('guilds/enableSync')
    // await this.$store.dispatch('guilds/add', {
    //   name: 'Astral',
    //   type: 'Classique',
    //   playtime: ['Mercredi', 'Jeudi'],
    //   recruitment: ['Rogue', 'Druid', 'Shaman'],
    //   activity: 30,
    //   supports: 50
    // })
  },
  data: () => ({
    search: '',
    wowClasses: ['Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior']
  }),
  computed: {
    ...mapState({
      guilds: state => state.guilds.list
    })
  }
}
</script>
