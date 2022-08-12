<template>
  <div
    class="w-full overflow-hidden transition-transform duration-150 ease-in-out shadow focus:float focus:outline-none group hover:float hover:shadow-md"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="flex items-center p-5 bg-gray-900 rounded-t-lg">
      <GuildLogo
        :url="logoUrl"
        :alt="`Logo ${name}`"
        class="w-12 h-12 mr-6 overflow-hidden rounded"
      />
      <div class="text-lg font-semibold leading-6 text-left text-gray-400 group-focus:text-blue-300 group-hover:text-blue-300">
        {{ name }}
      </div>
      <div class="ml-auto text-sm tracking-widest text-gray-600 uppercase">
        {{ type }}
      </div>
    </div>
    <div class="px-6 pt-6 pb-0 text-gray-700 bg-gray-900 bg-opacity-75 group-focus:bg-gray-800 group-focus:bg-opacity-50 group-focus:text-gray-600 group-hover:bg-gray-800 group-hover:bg-opacity-50 group-hover:text-gray-600">
      <div class="flex items-center mb-4 space-x-4">
        <CalendarIcon class="flex-shrink-0 text-gray-800 group-focus:text-gray-700 group-hover:text-gray-700" />
        <div>{{ readableDays }}</div>
      </div>
      <div class="flex items-center space-x-4">
        <ClockIcon class="flex-shrink-0 text-gray-800 group-focus:text-gray-700 group-hover:text-gray-700" />
        <div>{{ timeRange }}</div>
      </div>
    </div>
    <div class="py-3 text-gray-700 bg-gray-900 bg-opacity-75 rounded-b-lg group-focus:bg-gray-800 group-focus:bg-opacity-50 group-focus:text-gray-600 group-hover:bg-gray-800 group-hover:bg-opacity-50 group-hover:text-gray-600">
      <GuildRecruitment
        :recruitment="recruitment"
        :expanded="expandGuildRecruitment"
        class="px-6 py-3"
        @click="expandGuildRecruitment = !expandGuildRecruitment"
      />
      <div class="flex justify-between">
        <div class="pl-6 mt-1 text-sm italic text-gray-800 group-hover:text-gray-600">
          {{ relativeUpdatedDate }}
        </div>
        <transition name="slideRight">
          <div
            v-show="isHovered"
            class="flex items-center pr-6 ml-6 space-x-2 text-sm font-semibold text-blue-300"
            style="animation-duration: 0.5s"
          >
            <span>Voir plus</span>
            <ArrowNarrowRightIcon />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import GuildLogo from '../Guild/Logo.vue'
import GuildRecruitment from '../GuildRecruitment.vue'
import ClockIcon from '~/components/atoms/icons/solid/ClockIcon.vue'
import CalendarIcon from '~/components/atoms/icons/solid/CalendarIcon.vue'
import ArrowNarrowRightIcon from '~/components/atoms/icons/solid/ArrowNarrowRightIcon.vue'

export default {
  name: 'GuildCard',
  components: {
    GuildLogo,
    ClockIcon,
    CalendarIcon,
    GuildRecruitment,
    ArrowNarrowRightIcon
  },
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    raidDays: { type: Array, required: true },
    startHour: { type: String, required: true },
    endHour: { type: String, required: true },
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
    expandGuildRecruitment: false,
    isHovered: false
  }),
  computed: {
    timeRange () {
      return this.startHour + ' – ' + this.endHour
    },
    readableDays () {
      return this.raidDays
        .filter(({ playing }) => playing)
        .map(({ day }) => day.slice(0, 3))
        .join(', ')
    },
    relativeUpdatedDate () {
      const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)
      return capitalize(this.updatedAt
        ? DateTime.fromJSDate(this.updatedAt).toRelative({ locale: 'fr' })
        : 'il y a longtemps'
      )
    }
  }
}
</script>
