<template>
  <div class="p-6 text-gray-700 bg-gray-300 rounded shadow">
    <table class="w-full">
      <tr class="h-10 text-left text-gray-800">
        <th v-if="advancedMode">
          ID
        </th>
        <th>Guilde</th>
        <th>GM</th>
        <th v-if="!advancedMode">
          Visites
        </th>
        <th v-if="!advancedMode">
          Contacts
        </th>
        <th v-if="advancedMode">
          Actions
        </th>
      </tr>
      <tr
        v-for="(guild, i) in searchResults"
        :key="guild.id"
        class="h-10 group"
        :class="{
          'border-t border-gray-400': i > 0,
          'text-red-800 italic': guild.deleted,
        }"
      >
        <td v-if="advancedMode" class="text-gray-600 group-hover:text-blue-500">
          {{ guild.id }}
        </td>
        <td class="group-hover:text-blue-500">
          [{{ shortFaction(guild.faction) }}] <span class="font-semibold">{{ guild.name }}</span> <span class="text-sm text-gray-600">{{ guild.slug ? guild.slug : '⚠️' }}</span>
        </td>
        <td>
          <span v-if="guild.ownerUid">{{ guild.ownerUid }}</span>
          <span v-else>-</span>
        </td>
        <td v-if="!advancedMode" class="text-sm text-gray-600">
          {{ guild.redirects.filter(({ type }) => type === 'website').length }}
        </td>
        <td v-if="!advancedMode" class="text-sm text-gray-600">
          {{ guild.redirects.filter(({ type }) => type === 'contact').length }}
        </td>
        <td v-if="advancedMode">
          <div class="flex items-center space-x-2">
            <NuxtLink
              class="flex-shrink-0 px-2 text-xs text-red-100 bg-yellow-500 rounded-full"
              :to="`/admin/guildes/${guild.slug}/`"
            >
              Changer GM
            </NuxtLink>
            <button
              v-if="!guild.deleted"
              class="px-2 text-xs text-red-100 bg-red-500 rounded-full"
              @click="$emit('remove', guild)"
            >
              Supprimer
            </button>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { computed, defineComponent, ref, toRefs } from '@nuxtjs/composition-api'
import PropTypes from '@znck/prop-types'
import sortBy from 'lodash/sortBy'
import AdminUserInput from './UserInput.vue'

export default defineComponent({
  components: { AdminUserInput },
  props: {
    guilds: PropTypes.array.isRequired,
    advancedMode: PropTypes.bool.isRequired,
    search: PropTypes.string.defaultValue('')
  },
  setup (props) {
    const { guilds, search } = toRefs(props)

    const editedGuildId = ref(null)

    const searchResults = computed(() => {
      const text = search.value.toLowerCase()
      const matchingGuilds = guilds.value.filter((guild) => {
        return guild.name.toLowerCase().includes(text) || guild.ownerUid?.toLowerCase().includes(text)
      })
      return sortBy(matchingGuilds, [guild => guild.name.toLowerCase()])
    })

    const shortFaction = (faction) => {
      return faction && faction !== ''
        ? faction.charAt(0)
        : '?'
    }
    return {
      editedGuildId,
      searchResults,
      shortFaction
    }
  }
})
</script>
