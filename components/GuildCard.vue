<template>
  <div>
    <div class="p-5 flex items-center rounded-t-lg bg-gray-800">
      <div class="h-12 w-12 mr-6 items-center justify-center flex rounded overflow-hidden">
        <img
          v-if="hasLogo && !loadingError"
          :src="logoUrl"
          :alt="`Logo ${name}`"
          class="w-full"
          @error="loadingError = true"
        >
        <MissingGuildLogo v-else class="text-gray-700" />
      </div>
      <div class="text-gray-400 font-semibold text-lg leading-6">
        {{ name }}
      </div>
      <div class="ml-auto uppercase tracking-widest text-gray-600 text-sm">
        {{ type }}
      </div>
    </div>
    <div class="bg-gray-900 text-gray-600 px-6 pt-6 pb-0">
      <div class="flex items-center space-x-4 mb-4">
        <CalendarIcon class="text-gray-700 flex-shrink-0" />
        <div>{{ readableDays }}</div>
      </div>
      <div class="flex items-center space-x-4">
        <ClockIcon class="text-gray-700 flex-shrink-0" />
        <div>{{ timeRange }}</div>
      </div>
    </div>
    <div class="bg-gray-900 p-3">
      <GuildRecruitment
        :recruitment="recruitment"
        :expanded="expandGuildRecruitment"
        @click="expandGuildRecruitment = !expandGuildRecruitment"
      />
    </div>
    <div class="px-6 bg-gray-900 text-gray-700 rounded-b-lg ">
      <div class="border-t py-2 border-gray-800 text-sm flex font-semibold space-x-2 justify-end">
        <a v-if="websiteUrl && websiteUrl !== contactUrl" :href="websiteUrl" rel="noopener" target="_blank" class="hover:text-blue-300">
          {{ readableWebsiteUrl }}
        </a>
        <span v-if="contactUrl && websiteUrl && websiteUrl !== contactUrl">&bull;</span>
        <a v-if="contactUrl" :href="contactUrl" target="_blank" rel="noopener" class="hover:text-blue-300">
          Contact
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import GuildRecruitment from './GuildRecruitment.vue'
import MissingGuildLogo from '~/components/MissingGuildLogo.vue'
import CalendarIcon from '~/components/icons/CalendarIcon.vue'
import ClockIcon from '~/components/icons/ClockIcon.vue'

export default {
  name: 'GuildCard',
  components: {
    MissingGuildLogo,
    CalendarIcon,
    ClockIcon,
    GuildRecruitment
  },
  props: {
    name: { type: String, required: true },
    type: { type: String, required: true },
    raidDays: { type: Array, required: true },
    timeRange: { type: String, required: true },
    recruitment: { type: Array, required: true },
    logoUrl: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    contactUrl: { type: String, required: true }
    // activity: { type: Number, required: true },
    // supports: { type: Number, required: true }
  },
  data: () => ({
    loadingError: false,
    expandGuildRecruitment: false
  }),
  computed: {
    hasLogo () {
      return this.logoUrl !== '' &&
        this.logoUrl != null
    },
    readableDays () {
      return this.raidDays.map(day => day.slice(0, 3)).join(', ')
    },
    readableWebsiteUrl () {
      let hostname
      try {
        const url = new URL(this.websiteUrl)
        hostname = url.hostname
      } catch (error) {
        hostname = this.websiteUrl
      }
      return hostname
    }
  }
}
</script>
