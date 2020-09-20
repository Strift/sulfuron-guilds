<template>
  <FactionLayout>
    <div class="container mx-auto font-sans">
      <Navbar class="py-12 mb-6" />

      <div class="font-semibold text-gray-400 text-4xl mb-2">
        Recrutement <span class="italic">vraiment</span> actif
      </div>
      <div class="text-white mb-12 border-t border-white pt-3 opacity-75">
        Ces guildes mettent à jour leur recrutement très fréquemment.
      </div>

      <div class="grid grid-flow-row grid-cols-3 gap-12">
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
    </div>
  </FactionLayout>
</template>

<script>
import FactionLayout from '~/layouts/FactionLayout.vue'

import Navbar from '~/components/Navbar.vue'
import GuildCard from '~/components/GuildCard.vue'

export default {
  components: {
    FactionLayout,
    Navbar,
    GuildCard
  },
  data: () => ({
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
