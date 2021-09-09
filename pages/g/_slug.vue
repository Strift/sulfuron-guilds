<template>
  <div class="relative max-w-screen-md px-5 mx-auto text-gray-500 xl:px-0">
    <div class="mb-10">
      <NuxtLink
        to="/"
        title="Accueil"
        class="space-x-2 text-lg text-blue-300 hover:text-blue-400 text-shadow-sm"
      >
        <span class="flex items-center space-x-2">
          <ArrowLeftIcon />
          <span>
            Retour au portail
          </span>
        </span>
      </NuxtLink>
    </div>
    <div class="justify-end mb-10 sm:flex sm:flex-row-reverse">
      <div class="mb-8 text-center sm:ml-12 sm:mr-0 sm:my-auto sm:text-left">
        <h1 class="mb-2 text-4xl text-blue-100">
          {{ guild.name }}
        </h1>
        <div class="tracking-wider text-blue-300 uppercase">
          Guilde {{ guild.type }}
        </div>
      </div>
      <!-- use vibrant.js to get surrounding logo color -->
      <GuildLogo
        :alt="`Logo ${guild.name}`"
        :url="guild.logoUrl"
        class="flex-shrink-0 w-40 h-40 p-4 mx-auto overflow-hidden bg-gray-900 rounded shadow sm:mx-0"
      />
    </div>
    <GuildHeader2 class="mb-4">
      Présentation
    </GuildHeader2>
    <p class="mb-6 leading-7">
      {{ guild.description }}
    </p>
    <div class="mb-10">
      <div class="flex items-center mb-3 space-x-3">
        <CalendarIcon class="text-gray-600" />
        <p>{{ readableDays }}</p>
      </div>
      <div class="flex items-center mb-3 space-x-3">
        <ClockIcon class="text-gray-600" />
        <div>{{ timeRange }}</div>
      </div>
      <div v-if="websiteRedirectUrl" class="flex items-center space-x-3">
        <GlobeIcon class="flex-shrink-0 text-gray-600" />
        <a :href="websiteRedirectUrl" rel="noopener" title="Site web" target="_blank" class="hover:text-blue-300">
          {{ readableWebsiteUrl }}
        </a>
      </div>
    </div>
    <GuildHeader2 class="mb-4">
      Recrutement
    </GuildHeader2>
    <div class="grid grid-cols-1 pt-3 mb-10 gap-x-12 gap-y-8 sm:grid-cols-2">
      <GuildClassCard
        v-for="recruitmentStatus in recruitmentStatuses"
        :key="recruitmentStatus.classValue"
        :title="recruitmentStatus.className"
        :title-class="getClassTextColorClass(recruitmentStatus.classValue)"
        :specs="recruitmentStatus.specs"
        :border-color-class="recruitmentStatus.borderClass"
        class="shadow"
      >
        <div class="space-y-2">
          <div
            v-for="spec in recruitmentStatus.specs"
            :key="spec.value"
          >
            <SpecializationIcon
              :class-value="recruitmentStatus.classValue"
              :spec-value="spec.value"
              :alt="`Icone ${recruitmentStatus.className} spéciliasation ${getSpecName(recruitmentStatus.classValue, spec.value)}`"
              :title="getSpecName(recruitmentStatus.classValue, spec.value)"
              height="20"
              width="20"
              class="inline mr-2"
            />
            <span>{{ getSpecName(recruitmentStatus.classValue, spec.value) }}</span>
          </div>
        </div>
      </GuildClassCard>
    </div>
    <div class="sticky bottom-0 pb-8">
      <GuildContactButton
        :guild-id="guild.id"
        class="flex justify-center w-full py-2 shadow-lg"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import sortBy from 'lodash/sortBy'
import getClassName from '~/data/utils/getClassName'
import getSpecName from '~/data/utils/getSpecName'
import getClassTextColorClass from '~/data/utils/getClassTextColorClass'
import ClockIcon from '~/components/icons/solid/ClockIcon.vue'
import GlobeIcon from '~/components/icons/solid/GlobeIcon.vue'
import CalendarIcon from '~/components/icons/solid/CalendarIcon.vue'
import ArrowLeftIcon from '~/components/icons/solid/ArrowLeftIcon.vue'

export default defineComponent({
  components: {
    ClockIcon,
    GlobeIcon,
    CalendarIcon,
    ArrowLeftIcon
  },
  layout: 'default',
  scrollToTop: true,
  async asyncData ({ params, store, error, payload }) {
    if (payload) {
      return {
        guild: payload
      }
    }
    const guild = await store.dispatch('guilds/findBySlug', params.slug)
    if (guild === null) {
      error({ statusCode: 404, message: 'Hmm... on dirait que cette guilde n\'existe pas' })
    }
    return {
      guild
    }
  },
  head () {
    const title = `${this.guild.name} - Sulfuron-EU`
    const description = `Rejoignez la guilde ${this.guild.type} ${this.guild.name} sur le serveur Sulfuron (The Burning Crusade).`
    const pageUrl = `${this.$config.baseURL}${this.$route.path}`
    const imageUrl = '/images/new-logo.png'
    return {
      title,
      meta: [
        { name: 'description', content: description, hid: 'description' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: imageUrl },
        { property: 'og:url', content: pageUrl },
        { property: 'og:site_name', content: 'Sulfuron.EU' },
        { name: 'twitter:image:alt', content: imageUrl },
        { name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  },
  data: () => ({
  }),
  computed: {
    timeRange () {
      return this.guild.startHour + ' – ' + this.guild.endHour
    },
    readableDays () {
      return this.guild.raidDays
        .filter(({ playing }) => playing)
        .map(({ day }) => day)
        .join(', ')
    },
    recruitmentStatuses () {
      return sortBy(
        this.guild.recruitment
          .filter(({ specs }) => specs.some(({ open }) => open))
          .map((recruitmentStatus) => {
            return {
              classValue: recruitmentStatus.class,
              className: getClassName(recruitmentStatus.class),
              specs: recruitmentStatus.specs
                .filter(({ open }) => open)
            }
          }),
        ['className'])
    },
    readableWebsiteUrl () {
      let hostname
      try {
        const url = new URL(this.guild.websiteUrl)
        hostname = url.hostname
      } catch (error) {
        hostname = this.guild.websiteUrl
      }
      return hostname
    },
    websiteRedirectUrl () {
      if (this.guild.websiteUrl && this.guild.websiteUrl !== this.guild.contactUrl) {
        return `${this.$config.baseURL}/redirect/?type=website&guild=${this.guild.id}`
      }
      return null
    }
  },
  methods: {
    getSpecName,
    getClassTextColorClass
  }
})
</script>
