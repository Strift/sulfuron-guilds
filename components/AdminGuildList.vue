<template>
  <div class="bg-gray-300 p-6 rounded shadow text-gray-700">
    <table class="w-full">
      <tr class="h-10 text-gray-800 text-left">
        <th>Faction</th>
        <th>Nom</th>
        <th>GM</th>
        <th>Activité</th>
        <!-- <th>Clics site</th>
        <th>Clics contact</th> -->
      </tr>
      <tr
        v-for="(guild, i) in guilds"
        :key="guild.id"
        class="h-10"
        :class="{ 'border-t border-gray-400': i > 0 }"
      >
        <td>{{ guild.faction.charAt(0) }}</td>
        <td>{{ guild.name }}</td>
        <td>{{ guild.ownerUid }}</td>
        <td>100 %</td>
        <!-- <td>-</td>
        <td>-</td> -->
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
    }
  }
}
</script>
