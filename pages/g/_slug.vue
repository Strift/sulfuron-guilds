<template>
  <div class="max-w-screen-md mx-auto px-5 relative space-y-12 text-gray-500 xl:px-0">
    <NuxtLink
      to="/"
      title="Accueil"
      class="hover:text-blue-400 space-x-2 text-blue-300 text-lg text-shadow-sm"
    >
      <span class="flex items-center space-x-2">
        <ArrowLeftIcon />
        <span>
          Retour au portail
        </span>
      </span>
    </NuxtLink>
    <div class="justify-end sm:flex sm:flex-row-reverse">
      <div class="mb-8 sm:ml-12 sm:mr-0 sm:my-auto text-center">
        <h1 class="mb-2 text-4xl text-blue-100">
          {{ guild.name }}
        </h1>
        <div class="text-blue-300  tracking-wider  uppercase">
          Guilde {{ guild.type }}
        </div>
      </div>
      <!-- use vibrant.js to get surrounding logo color -->
      <GuildLogo
        :alt="`Logo ${guild.name}`"
        :url="guild.logoUrl"
        class="bg-gray-900 flex-shrink-0 h-40 mx-auto overflow-hidden p-4 rounded shadow sm:mx-0 w-40"
      />
    </div>
    <GuildHeader2 class="mb-4">
      Disponibilités
    </GuildHeader2>
    <div class="mb-10">
      <div class="flex items-center mb-3 space-x-2">
        <CalendarIcon class="text-gray-600" />
        <p>{{ readableDays }}</p>
      </div>
      <div class="flex items-center mb-3 space-x-2">
        <ClockIcon class="text-gray-600" />
        <div>{{ timeRange }}</div>
      </div>
    </div>
    <GuildHeader2 class="mb-4">
      Présentation
    </GuildHeader2>
    <p class="leading-7 mb-10">
      {{ guild.description }}
    </p>
    <GuildHeader2 class="mb-4">
      Recrutement
    </GuildHeader2>
    <div class="gap-x-12 gap-y-8 grid grid-cols-1 mb-10 pt-3 sm:grid-cols-2">
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
    <div class="bottom-0 pb-8 sticky">
      <GuildContactButton :guild-id="guild.id" class="flex justify-center py-2 shadow-lg w-full" />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, useAsync, useRoute } from '@nuxtjs/composition-api'
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

    return {
      guild,
      timeRange,
      readableDays,
      recruitmentStatuses,
      getSpecName,
      getClassTextColorClass
    }
  }
})
</script>
