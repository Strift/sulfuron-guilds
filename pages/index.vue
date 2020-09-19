<template>
  <FactionLayout :alliance="true">
    <div class="container mx-auto font-sans">
      <Navbar class="py-12 mb-6" />

      <div class="mb-20 flex justify-center space-x-24">
        <div class="bg-gray-100 rounded-lg overflow-hidden flex shadow-md">
          <img src="https://astral.gg/images/astral-socials.png" alt="Astral logo" class="h-32">
          <div class="p-4 flex flex-col w-64">
            <div class="font-semibold text-2xl">
              Astral
            </div>
            <div class="text-gray-600 italic">
              Guilde la plus recommandée
            </div>
            <a href="#" class="text-blue-500 mt-auto">Discord</a>
          </div>
        </div>
      </div>

      <TableHeader :alliance="false" />
      <TableRow
        v-for="(guild, i) in guilds"
        :key="i"
        :name="guild.name"
        :type="guild.type"
        :playtime="guild.playtime"
        :recruitment="guild.recruitment"
        :activity="guild.activity"
        :support="guild.support"
        :class="{ 'border-t border-gray-700': i > 0 }"
      />
    </div>
  </FactionLayout>
</template>

<script>
import FactionLayout from '~/layouts/FactionLayout.vue'
import Navbar from '~/components/Navbar.vue'
import TableHeader from '~/components/TableHeader.vue'
import TableRow from '~/components/TableRow.vue'

export default {
  components: {
    FactionLayout,
    Navbar,
    TableHeader,
    TableRow
  },
  data: () => ({
    guilds: [{
      name: 'Astral',
      type: 'Classique',
      playtime: 'Mer, Jeu',
      recruitment: ['Rogue', 'Druid', 'Shaman'],
      activity: 30,
      support: 50
    }]
  })
}
</script>
