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
        v-for="(guild, index) in guilds.concat(guilds).concat(guilds)"
        :key="index"
        :name="guild.name"
        :type="guild.type"
        :playtime="guild.playtime"
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

const AUTH_TOKEN_QUERY = 'auth_token'

export default {
  components: {
    FactionButton,
    ClassIcon,
    GuildCard
  },
  data: () => ({
    search: '',
    wowClasses: ['Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior'],
    guilds: [{
      name: 'Les Croisés de Pandragon',
      type: 'Classique',
      playtime: 'Lun, Mar, Mer, Jeu, Ven, Sam, Dim',
      recruitment: ['Rogue', 'Druid', 'Shaman'],
      activity: 30,
      supports: 50
    }, {
      name: 'Astral',
      type: 'Classique',
      playtime: 'Mer, Jeu',
      recruitment: ['Rogue', 'Druid', 'Shaman'],
      activity: 30,
      supports: 50
    }]
  }),
  computed: {
    ...mapState({
      authError: state => state.auth.error
    })
  },
  async mounted () {
    const token = this.$router.currentRoute.query[AUTH_TOKEN_QUERY]
    if (!token) {
      return
    }
    // console.log('Starting login')
    await this.$store.dispatch('auth/login', token)
    // console.log('Done login')
    this.$router.push('/')
  }
}
</script>
