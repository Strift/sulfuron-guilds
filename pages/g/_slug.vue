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
    <BaseLoader v-if="$fetchState.pending" class="mx-auto" />
    <div v-else-if="!$fetchState.error">
      <div class="justify-end mb-10 sm:flex sm:flex-row-reverse">
        <div class="mb-8 text-center sm:ml-12 sm:mr-0 sm:my-auto sm:text-left">
          <h1 class="mb-1 text-4xl text-blue-100">
            {{ guild.name }}
          </h1>
          <div class="tracking-wider text-blue-300 uppercase">
            Guilde {{ formatGuildType(guild.type) }}
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
          <p>{{ formatDays(guild.raidDays) }}</p>
        </div>
        <div class="flex items-center mb-3 space-x-3">
          <ClockIcon class="text-gray-600" />
          <div>{{ formatTimeRange(guild.startHour, guild.endHour) }}</div>
        </div>
        <div v-if="guild.websiteUrl && guild.websiteUrl !== guild.contactUrl" class="flex items-center space-x-3">
          <GlobeIcon class="flex-shrink-0 text-gray-600" />
          <a :href="websiteRedirectUrl(guild.id)" rel="noopener" title="Site web" target="_blank" class="hover:text-blue-300">
            {{ formatWebsiteUrl(guild.websiteUrl) }}
          </a>
        </div>
      </div>
      <GuildHeader2 class="mb-4">
        Recrutement
      </GuildHeader2>
      <div class="grid grid-cols-1 pt-3 mb-10 gap-x-12 gap-y-8 sm:grid-cols-2">
        <GuildClassCard
          v-for="recruitmentStatus in recruitmentStatuses(guild.recruitment)"
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
              <SpecIcon
                :specialization-slug="specializationSlug(recruitmentStatus.classValue, spec.value)"
                :alt-text="`Icone ${recruitmentStatus.className} spéciliasation ${getSpecName(recruitmentStatus.classValue, spec.value)}`"
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
      <div class="mt-10">
        <GuildContactButton
          :guild-id="guild.id"
          :is-discord="isDiscordUrl(guild.contactUrl)"
          class="flex justify-center w-full py-2 shadow-lg"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import sortBy from 'lodash/sortBy'
import getClassName from '~/data/utils/getClassName'
import getSpecName from '~/data/utils/getSpecName'
import getClassTextColorClass from '~/data/utils/getClassTextColorClass'
import BaseLoader from '~/components/atoms/BaseLoader.vue'
import SpecIcon from '~/components/atoms/icons/SpecIcon.vue'
import ClockIcon from '~/components/atoms/icons/solid/ClockIcon.vue'
import GlobeIcon from '~/components/atoms/icons/solid/GlobeIcon.vue'
import CalendarIcon from '~/components/atoms/icons/solid/CalendarIcon.vue'
import ArrowLeftIcon from '~/components/atoms/icons/solid/ArrowLeftIcon.vue'
import guildConverter from '~/data/converters/guildConverter'
import specializationSlug from '~/data/utils/specializationSlug'

export default defineComponent({
  components: {
    BaseLoader,
    SpecIcon,
    ClockIcon,
    GlobeIcon,
    CalendarIcon,
    ArrowLeftIcon
  },
  layout: 'default',
  scrollToTop: true,
  fetchOnServer: false,
  data: () => ({
    guild: null
  }),
  async fetch () {
    const guildSnapshot = await this.$fire.firestore
      .collection('guilds')
      .withConverter(guildConverter)
      .where('slug', '==', this.$route.params.slug)
      .get()

    if (guildSnapshot.empty) {
      this.$nuxt.context.error({
        statusCode: 404,
        message: 'Hmm... on dirait que cette guilde n\'existe pas'
      })
      this.$fetchState.error = new Error('Hmm... on dirait que cette guilde n\'existe pas')
      return
    }
    this.guild = guildSnapshot.docs[0].data()
  },
  // head () {
  //   const title = `${this.guild.name} - Sulfuron-EU`
  //   const description = `Rejoignez la guilde ${this.guildType} ${this.guild.name} sur le serveur The Burning Crusade, Sulfuron.`
  //   const pageUrl = `${this.$config.baseURL}${this.$route.path}`
  //   const imageUrl = '/images/new-logo.png'
  //   return {
  //     title,
  //     meta: [
  //       { name: 'description', content: description, hid: 'description' },
  //       { property: 'og:title', content: title },
  //       { property: 'og:description', content: description },
  //       { property: 'og:image', content: imageUrl },
  //       { property: 'og:url', content: pageUrl },
  //       { property: 'og:site_name', content: 'Sulfuron.EU' },
  //       { name: 'twitter:image:alt', content: imageUrl },
  //       { name: 'twitter:card', content: 'summary_large_image' }
  //     ]
  //   }
  // },
  methods: {
    getSpecName,
    getClassTextColorClass,
    specializationSlug,
    formatGuildType (type) {
      return type === 'Classique'
        ? 'PVE'
        : type
    },
    formatTimeRange (startHour, endHour) {
      return startHour + ' – ' + endHour
    },
    formatDays (raidDays) {
      return raidDays
        .filter(({ playing }) => playing)
        .map(({ day }) => day)
        .join(', ')
    },
    formatWebsiteUrl (websiteUrl) {
      let hostname
      try {
        const url = new URL(websiteUrl)
        hostname = url.hostname
      } catch (error) {
        hostname = websiteUrl
      }
      return hostname
    },
    websiteRedirectUrl (guildId) {
      return `${this.$config.baseURL}/redirect/?type=website&guild=${guildId}`
    },
    isDiscordUrl (contactUrl) {
      return contactUrl?.includes('https://discord.gg/')
    },
    recruitmentStatuses (recruitment) {
      return sortBy(
        recruitment
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
    }
  }
})
</script>
