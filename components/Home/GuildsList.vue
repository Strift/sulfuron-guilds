<template>
  <div v-if="!guilds.length">
    <UiLoader class="mx-auto" />
  </div>
  <transition-group
    v-else
    :duration="500"
    name="fade"
    tag="div"
    class="grid grid-flow-row grid-cols-1 gap-12 lg:grid-cols-2 xl:grid-cols-3"
  >
    <div
      v-for="guild in guilds"
      :key="guild.name"
    >
      <NuxtLink :to="`/g/${guild.slug}/`">
        <HomeGuildsListItem
          :id="guild.id"
          :name="guild.name"
          :type="guild.type"
          :raid-days="guild.raidDays"
          :start-hour="guild.startHour"
          :end-hour="guild.endHour"
          :recruitment="guild.recruitment"
          :logo-url="guild.logoUrl"
          :website-url="guild.websiteUrl"
          :contact-url="guild.contactUrl"
          :updated-at="guild.updatedAt"
        />
      </NuxtLink>
    </div>
  </transition-group>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import useSearchStore from '~/composables/useSearchStore'
import useGuildModal from '~/composables/useGuildModal'

export default defineComponent({
  setup () {
    const { orderedResults } = useSearchStore()
    const { openGuild } = useGuildModal()
    return {
      guilds: orderedResults,
      openGuild
    }
  }
})
</script>
