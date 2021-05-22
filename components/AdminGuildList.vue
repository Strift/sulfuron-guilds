<template>
  <div class="bg-gray-300 p-6 rounded shadow text-gray-700">
    <table class="w-full">
      <tr class="h-10 text-gray-800 text-left">
        <th v-if="advancedMode">
          ID
        </th>
        <th>Faction</th>
        <th>Nom</th>
        <th>GM</th>
        <th>Activité</th>
        <!-- <th>Clics site</th>
        <th>Clics contact</th> -->
        <th v-if="advancedMode">
          Actions
        </th>
      </tr>
      <tr
        v-for="(guild, i) in guilds"
        :key="guild.id"
        class="h-10"
        :class="{
          'border-t border-gray-400': i > 0,
          'text-red-800 italic': guild.deleted
        }"
      >
        <td v-if="advancedMode" class="text-gray-600">
          {{ guild.id }}
        </td>
        <td>{{ shortFaction(faction) }}</td>
        <td>{{ guild.name }}</td>
        <td>{{ guild.ownerUid }}</td>
        <td>
          <span v-if="guild.deleted">-</span>
          <span v-else>100 %</span>
        </td>
        <!-- <td>-</td>
        <td>-</td> -->
        <td v-if="advancedMode">
          <button
            v-if="!guild.deleted"
            class="bg-red-500 px-2 rounded-full text-red-100 text-xs"
            @click="remove(guild)"
          >
            Supprimer
          </button>
          <!-- <button
            v-else
            class="bg-blue-500 px-2 rounded-full text-red-100 text-xs"
            @click="restore(guild)"
          >
            Restorer
          </button> -->
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  props: {
    guilds: {
      type: Array,
      required: true
    },
    advancedMode: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    shortFaction (faction) {
      return faction
        ? faction.charAt(0)
        : '?'
    },
    remove (guild) {
      const confirmed = confirm(`Voulez-vous supprimer ${guild.name} ?`)
      if (confirmed) {
        this.$store.dispatch('admin/removeGuildById', guild.id)
      }
    },
    restore (guild) {
      this.$store.dispatch('admin/restoreGuildById', guild.id, false)
    }
  }
}
</script>
