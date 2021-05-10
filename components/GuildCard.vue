<template>
  <button
    class="w-full group shadow hover:shadow-md hover:float transition-transform duration-150 ease-in-out"
    @click="$emit('click')"
  >
    <div class="p-5 flex items-center rounded-t-lg bg-gray-900">
      <GuildLogo
        :url="logoUrl"
        :alt="`Logo ${name}`"
        class="h-12 w-12 mr-6 rounded overflow-hidden"
      />
      <div class="text-gray-400 group-hover:text-blue-300 font-semibold text-lg leading-6">
        {{ name }}
      </div>
      <div class="ml-auto uppercase tracking-widest text-gray-600 text-sm">
        {{ type }}
      </div>
    </div>
    <div class="bg-gray-900 group-hover:bg-gray-800 bg-opacity-75 group-hover:bg-opacity-50 text-gray-700 group-hover:text-gray-600 px-6 pt-6 pb-0">
      <div class="flex items-center space-x-4 mb-4">
        <CalendarIcon class="text-gray-800 group-hover:text-gray-700 flex-shrink-0" />
        <div>{{ readableDays }}</div>
      </div>
      <div class="flex items-center space-x-4">
        <ClockIcon class="text-gray-800 group-hover:text-gray-700 flex-shrink-0" />
        <div>{{ timeRange }}</div>
      </div>
    </div>
    <div class="bg-gray-900 group-hover:bg-gray-800 bg-opacity-75 group-hover:bg-opacity-50 text-gray-700 group-hover:text-gray-600 p-3 rounded-b-lg">
      <GuildRecruitment
        :recruitment="recruitment"
        :expanded="expandGuildRecruitment"
        class="p-3"
        @click="expandGuildRecruitment = !expandGuildRecruitment"
      />
    </div>
    <!-- <div class="px-6 bg-gray-900 bg-opacity-75 text-gray-700 group-hover:text-gray-600 rounded-b-lg h-0 group-hover:h-full overflow-hidden transition-all duration-150 ease-in-out">
      <div class="pb-3 text-sm flex font-semibold space-x-2 justify-end" :class="{ 'border-t border-gray-800': false }">
        <button class="font-semibold group-hover:text-blue-300 flex space-x-2">
          <div>Voir plus</div>
          <ArrowNarrowRightIcon />
        </button>
        <a v-if="websiteUrl && websiteUrl !== contactUrl" :href="websiteRedirectUrl" rel="noopener" target="_blank" class="hover:text-blue-300">
          {{ readableWebsiteUrl }}
        </a>
        <span v-if="contactUrl && websiteUrl && websiteUrl !== contactUrl">&bull;</span>
        <a v-if="contactUrl" :href="contactRedirectUrl" target="_blank" rel="noopener" class="hover:text-blue-300">
          Contact
        </a>
      </div>
    </div> -->
  </button>
</template>

<script>
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
    contactUrl: { type: String, required: true }
    // activity: { type: Number, required: true },
    // supports: { type: Number, required: true }
  },
  data: () => ({
    loadingError: false,
    expandGuildRecruitment: false
  }),
  computed: {
    readableDays () {
      return this.raidDays.map(day => day.slice(0, 3)).join(', ')
    }
  }
}
</script>
