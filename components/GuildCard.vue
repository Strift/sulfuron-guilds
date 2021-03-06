<template>
  <button
    class="duration-150 ease-in-out focus:float focus:outline-none group hover:float hover:shadow-md shadow transition-transform w-full"
    @click="$emit('click')"
  >
    <div class="bg-gray-900 flex items-center p-5 rounded-t-lg">
      <GuildLogo
        :url="logoUrl"
        :alt="`Logo ${name}`"
        class="h-12 mr-6 overflow-hidden rounded w-12"
      />
      <div class="font-semibold group-focus:text-blue-300 group-hover:text-blue-300 leading-6 text-gray-400 text-left text-lg">
        {{ name }}
      </div>
      <div class="ml-auto text-gray-600 text-sm tracking-widest uppercase">
        {{ type }}
      </div>
    </div>
    <div class="bg-gray-900 bg-opacity-75 group-focus:bg-gray-800 group-focus:bg-opacity-50 group-focus:text-gray-600 group-hover:bg-gray-800 group-hover:bg-opacity-50 group-hover:text-gray-600 pb-0 pt-6 px-6 text-gray-700">
      <div class="flex items-center mb-4 space-x-4">
        <CalendarIcon class="flex-shrink-0 group-focus:text-gray-700 group-hover:text-gray-700 text-gray-800" />
        <div>{{ readableDays }}</div>
      </div>
      <div class="flex items-center space-x-4">
        <ClockIcon class="flex-shrink-0 group-focus:text-gray-700 group-hover:text-gray-700 text-gray-800" />
        <div>{{ timeRange }}</div>
      </div>
    </div>
    <div class="bg-gray-900 bg-opacity-75 group-focus:bg-gray-800 group-focus:bg-opacity-50 group-focus:text-gray-600 group-hover:bg-gray-800 group-hover:bg-opacity-50 group-hover:text-gray-600 p-3 rounded-b-lg text-gray-700">
      <GuildRecruitment
        :recruitment="recruitment"
        :expanded="expandGuildRecruitment"
        class="p-3"
        @click="expandGuildRecruitment = !expandGuildRecruitment"
      />
      <div class="group-hover:text-gray-600 italic mt-1 text-gray-800 text-right text-sm">
        {{ relativeUpdatedDate }}
      </div>
    </div>
  </button>
</template>

<script>
import { DateTime } from 'luxon'
import GuildLogo from './ui/GuildLogo.vue'
import GuildRecruitment from './GuildRecruitment.vue'
import CalendarIcon from '~/components/icons/solid/CalendarIcon.vue'
import ClockIcon from '~/components/icons/solid/ClockIcon.vue'

export default {
  name: 'GuildCard',
  components: {
    GuildLogo,
    ClockIcon,
    CalendarIcon,
    GuildRecruitment
  },
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    raidDays: { type: Array, required: true },
    timeRange: { type: String, required: true },
    recruitment: { type: Array, required: true },
    logoUrl: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    contactUrl: { type: String, required: true },
    // activity: { type: Number, required: true },
    // supports: { type: Number, required: true },
    updatedAt: {
      type: Date,
      default: null
    }
  },
  data: () => ({
    loadingError: false,
    expandGuildRecruitment: false
  }),
  computed: {
    readableDays () {
      return this.raidDays.map(day => day.slice(0, 3)).join(', ')
    },
    relativeUpdatedDate () {
      return this.updatedAt
        ? DateTime.fromJSDate(this.updatedAt).toRelative({ locale: 'fr' })
        : 'il y a un moment'
    }
  }
}
</script>
