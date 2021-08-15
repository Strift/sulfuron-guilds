<template>
  <div
    class="absolute bg-black bg-opacity-75 flex h-screen items-center p-3 w-screen"
  >
    <div
      v-click-outside="close"
      class="bg-center bg-cover max-h-full md:h-hd overflow-y-auto rounded-lg sm:container sm:mx-auto w-full"
      style="background-image: url('https://i.imgur.com/HM0AhUz.jpg')"
    >
      <div class="bg-gray-900 bg-opacity-50 flex flex-col min-h-full relative">
        <div class="lg:sticky p-5 top-0">
          <button class="flex hover:text-blue-200 items-center ml-auto space-x-2 text-blue-300 text-lg text-shadow-sm" @click="close">
            <ArrowLeftIcon />
            <span>
              Retour au portail
            </span>
          </button>
        </div>
        <div class="flex flex-col flex-grow" style="margin-top: 10vh">
          <div class="-mb-8 lg:max-w-screen-sm lg:mx-auto lg:w-full md:px-5 mt-auto relative sm:flex">
            <GuildLogo
              :alt="`Logo ${name}`"
              :url="logoUrl"
              class="bg-gray-900 flex-shrink-0 h-32 mx-auto overflow-hidden p-4 rounded shadow w-32"
            />
            <div class="hidden items-center justify-between ml-8 sm:flex w-full">
              <div class="font-semibold leading-none text-2xl text-gray-300 text-shadow-md">
                {{ name }}
              </div>
              <div>
                <GuildContactButton :guild-id="id" />
              </div>
            </div>
          </div>
          <div class="bg-black bg-opacity-50 pb-12 pt-16">
            <div class="font-semibold leading-none mb-8 md:hidden text-2xl text-center text-gray-300">
              {{ name }}
            </div>
            <div class="lg:max-w-screen-sm lg:mx-auto px-5 text-gray-600">
              <div class="mb-8">
                {{ description }}
              </div>
              <div class="sm:flex sm:items-start sm:space-y-0 space-y-8">
                <div class="sm:w-1/2 space-y-4">
                  <div class="flex items-center space-x-4">
                    <CalendarIcon class="flex-shrink-0 text-gray-700" />
                    <div>{{ readableDays }}</div>
                  </div>
                  <div class="flex items-center space-x-4">
                    <ClockIcon class="flex-shrink-0 text-gray-700" />
                    <div>{{ timeRange }}</div>
                  </div>
                  <div v-if="websiteUrl && websiteUrl !== contactUrl" class="flex items-center space-x-4">
                    <GlobeIcon class="flex-shrink-0 text-gray-700" />
                    <a :href="websiteRedirectUrl" rel="noopener" title="Site web" target="_blank" class="hover:text-blue-300">
                      {{ readableWebsiteUrl }}
                    </a>
                  </div>
                </div>
                <GuildRecruitment
                  :recruitment="recruitment"
                  :expanded="true"
                  class="sm:w-1/2"
                />
              </div>
              <GuildContactButton :guild-id="id" class="block md:hidden mt-8 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import GuildLogo from '~/components/ui/GuildLogo.vue'
import ClockIcon from '~/components/icons/solid/ClockIcon.vue'
import GlobeIcon from '~/components/icons/solid/GlobeIcon.vue'
import CalendarIcon from '~/components/icons/solid/CalendarIcon.vue'
import ArrowLeftIcon from '~/components/icons/solid/ArrowLeftIcon.vue'
import GuildRecruitment from '~/components/GuildRecruitment.vue'
import GuildContactButton from '~/components/GuildContactButton.vue'

export default {
  components: {
    GuildLogo,
    ClockIcon,
    GlobeIcon,
    CalendarIcon,
    ArrowLeftIcon,
    GuildRecruitment,
    GuildContactButton
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  props: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    raidDays: { type: Array, required: true },
    startHour: { type: String, required: true },
    endHour: { type: String, required: true },
    recruitment: { type: Array, required: true },
    logoUrl: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    contactUrl: { type: String, required: true }
    // activity: { type: Number, required: true },
    // supports: { type: Number, required: true }
  },
  computed: {
    isOpen () {
      return this.$store.state.openGuild !== null
    },
    timeRange () {
      return this.startHour + ' – ' + this.endHour
    },
    readableDays () {
      return this.raidDays
        .filter(({ playing }) => playing)
        .map(({ day }) => day.slice(0, 3))
        .join(', ')
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
    },
    websiteRedirectUrl () {
      return `${this.$config.baseURL}/redirect/?type=website&guild=${this.id}`
    }
  },
  methods: {
    close () {
      this.$store.commit('setOpenGuild', null)
    }
  }
}
</script>
