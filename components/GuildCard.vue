<template>
  <div>
    <div class="bg-gray-900 p-5 flex items-center rounded-t-lg">
      <div
        class="h-12 w-12 mr-5 items-center justify-center flex rounded overflow-hidden"
      >
        <img
          v-if="hasLogo"
          :src="logoUrl"
          :alt="`Logo ${name}`"
          class="w-full"
        >
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="text-gray-800"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div class="text-gray-500 font-semibold text-lg leading-6">
        {{ name }}
      </div>
      <div class="ml-auto font-semibold uppercase tracking-wider text-gray-700 text-sm">
        {{ type }}
      </div>
    </div>
    <div class="bg-gray-800 text-gray-600">
      <div class="p-5">
        <div class="flex items-center space-x-2 mb-2">
          <CalendarIcon class="text-gray-700 flex-shrink-0" />
          <div>{{ readableDays }}</div>
        </div>
        <div class="flex items-center space-x-2 mb-4">
          <ClockIcon class="text-gray-700 flex-shrink-0" />
          <div>{{ timeRange }}</div>
        </div>
        <div class="font-semibold text-xs uppercase tracking-widest mb-2">
          Recrutement
        </div>
        <div class="flex space-x-2">
          <ClassIcon
            v-for="wowClass in recruitment"
            :key="wowClass"
            :wow-class="wowClass"
            class="h-6 opacity-75"
          />
        </div>
      </div>
    </div>
    <div class="px-5 py-2 bg-gray-700 text-gray-500 rounded-b-lg flex">
      <a :href="websiteUrl" target="_blank" class="flex items-center space-x-1 hover:text-blue-600 text-sm">
        <span class="text-sm font-semibold">{{ readableWebsiteUrl }}</span>
      </a>
      <a :href="contactUrl" target="_blank" class="flex items-center space-x-1 hover:text-blue-600 ml-auto text-sm">
        <span class="font-semibold">Contact</span>
      </a>
    </div>
  </div>
</template>

<script>
import ClassIcon from '~/components/icons/ClassIcon.vue'
import ClockIcon from '~/components/icons/ClockIcon.vue'
import CalendarIcon from '~/components/icons/CalendarIcon.vue'

export default {
  components: {
    ClassIcon,
    ClockIcon,
    CalendarIcon
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
  computed: {
    hasLogo () {
      return this.logoUrl !== null
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

<style>

</style>
