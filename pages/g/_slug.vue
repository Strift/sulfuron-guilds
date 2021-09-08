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
import { computed, defineComponent, useAsync, useContext, useRoute } from '@nuxtjs/composition-api'
import sortBy from 'lodash/sortBy'
import useGuilds from '~/composables/database/useGuilds'
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
  setup () {
    const context = useContext()
    const route = useRoute()
    const { findBySlug } = useGuilds()
    const guild = useAsync(
      () => findBySlug(route.value.params.slug), route.value.params.slug,
      route.value.fullPath
    )

    const timeRange = computed(() => guild.value.startHour + ' – ' + guild.value.endHour)
    const readableDays = computed(() => {
      return guild.value.raidDays
        .filter(({ playing }) => playing)
        .map(({ day }) => day)
        .join(', ')
    })
    const recruitmentStatuses = computed(() => {
      return sortBy(
        guild.value.recruitment
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
    })
    const readableWebsiteUrl = computed(() => {
      let hostname
      try {
        const url = new URL(guild.value.websiteUrl)
        hostname = url.hostname
      } catch (error) {
        hostname = guild.value.websiteUrl
      }
      return hostname
    })
    const websiteRedirectUrl = computed(() => {
      if (guild.value.websiteUrl && guild.value.websiteUrl !== guild.value.contactUrl) {
        return `${context.$config.baseURL}/redirect/?type=website&guild=${guild.value.id}`
      }
      return null
    })

    return {
      guild,
      timeRange,
      readableDays,
      recruitmentStatuses,
      getSpecName,
      getClassTextColorClass,
      readableWebsiteUrl,
      websiteRedirectUrl
    }
  }
})
</script>
