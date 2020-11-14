<template>
  <FactionLayout>
    <div class="text-gray-400 flex flex-wrap border-b border-white mb-6 pb-6">
      <div class="font-semibold text-2xl mb-3 md:mb-0">
        Guildes
      </div>
      <input v-model="search" type="text" class="py-1 max-w-sm md:ml-auto px-3 rounded-full text-gray-700" placeholder="Nyk Trib">
    </div>
    <div class="hidden md:flex text-white mb-12 opacity-75 justify-end space-x-4">
      <label v-for="wowClass in wowClasses" :key="wowClass" class="flex items-center space-x-1">
        <input :id="wowClass" type="checkbox" :name="wowClass">
        <ClassIcon :wow-class="wowClass" class="h-5" />
      </label>
    </div>

    <div class="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
      <GuildCard
        v-for="guild in guilds.concat(guilds).concat(guilds)"
        :key="guild.name"
        :name="guild.name"
        :type="guild.type"
        :playtime="guild.playtime"
        :recruitment="guild.recruitment"
        :activity="guild.activity"
        :supports="guild.supports"
      />
    </div>
  </FactionLayout>
</template>

<script>
import FactionLayout from '~/layouts/FactionLayout.vue'

import ClassIcon from '~/components/icons/ClassIcon.vue'
import GuildCard from '~/components/GuildCard.vue'

export default {
  components: {
    FactionLayout,
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
  })
}
</script>
