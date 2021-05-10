<template>
  <div
    class="absolute w-screen h-screen bg-black bg-opacity-75 p-3 flex"
  >
    <div
      v-click-outside="close"
      class="w-full overflow-y-scroll rounded-lg bg-cover bg-center"
      style="background-image: url('https://i.imgur.com/HM0AhUz.jpg')"
    >
      <div class="relative bg-gray-900 bg-opacity-50">
        <div class="sticky top-0 p-5">
          <button class="text-blue-300 hover:text-blue-200 text-shadow-sm text-lg space-x-2 flex items-center ml-auto" @click="close">
            <ArrowLeftIcon />
            <span>
              Retour au portail
            </span>
          </button>
        </div>
        <div style="margin-top: 10vh">
          <div class="-mb-8 relative">
            <GuildLogo
              :alt="`Logo ${name}`"
              :url="logoUrl"
              class="h-32 w-32 bg-gray-900 p-4 rounded overflow-hidden shadow flex-shrink-0 mx-auto"
            />
          </div>
          <div class="hidden md:flex items-center justify-between w-full ">
            <div class="text-3xl font-semibold leading-none text-shadow-md">
              {{ name }}
            </div>
            <div>
              <GuildContactButton :guild-id="id" />
            </div>
          </div>
          <div class="bg-black bg-opacity-50 pt-16 pb-12">
            <div class="px-5 space-y-8 text-gray-600 ">
              <div class="text-center text-2xl font-semibold text-gray-300">
                {{ name }}
              </div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque interdum rutrum sodales. Nullam mattis fermentum libero, non volutpa.
              </div>
              <div class="space-y-4">
                <div class="flex items-center space-x-4">
                  <CalendarIcon class="text-gray-700 flex-shrink-0" />
                  <div>{{ readableDays }}</div>
                </div>
                <div class="flex items-center space-x-4">
                  <ClockIcon class="text-gray-700 flex-shrink-0" />
                  <div>{{ timeRange }}</div>
                </div>
                <div v-if="websiteUrl && websiteUrl !== contactUrl" class="flex items-center space-x-4">
                  <GlobeIcon class="text-gray-700 flex-shrink-0" />
                  <a :href="websiteRedirectUrl" rel="noopener" target="_blank" class="hover:text-blue-300">
                    {{ readableWebsiteUrl }}
                  </a>
                </div>
              </div>
              <GuildRecruitment
                :recruitment="recruitment"
                :expanded="true"
              />
              <div class="text-center">
                <GuildContactButton :guild-id="id" />
              </div>
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
    isOpen () {
      return this.$store.state.openGuild !== null
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
