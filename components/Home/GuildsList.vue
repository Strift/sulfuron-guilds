<template>
  <transition-group
    :duration="500"
    name="fade"
    tag="div"
    class="gap-12 grid grid-cols-1 grid-flow-row lg:grid-cols-2 xl:grid-cols-3"
  >
    <div
      v-for="guild in guilds"
      :key="guild.name"
    >
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
        @click="openGuild(guild)"
      />
    </div>
  </transition-group>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import useSearchStore from '~/composables/useSearchStore'

export default defineComponent({
  setup () {
    const { orderedResults } = useSearchStore()
    return {
      guilds: orderedResults
    }
  }
})
</script>
