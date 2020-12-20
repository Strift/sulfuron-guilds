<template>
  <div>
    <div class="bg-gray-900 p-5 flex items-center rounded-t-lg">
      <img :src="imageUrl" alt="" class="h-12 mr-5">
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
    days: { type: Array, required: true },
    timeRange: { type: String, required: true },
    recruitment: { type: Array, required: true },
    imageUrl: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    contactUrl: { type: String, required: true },
    activity: { type: Number, required: true },
    supports: { type: Number, required: true }
  },
  computed: {
    readableDays () {
      return this.days.map(day => day.slice(0, 3)).join(', ')
    },
    readableWebsiteUrl () {
      return this.websiteUrl.replace(/(^\w+:|^)\/\//, '')
    }
  }
}
</script>

<style>

</style>
