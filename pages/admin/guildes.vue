<template>
  <div>
    <PageSectionTitle class="flex items-baseline justify-between">
      Guildes publiées <span class="text-base text-gray-600">{{ publishedGuilds.length }} guildes</span>
    </PageSectionTitle>
    <AdminGuildList
      v-if="publishedGuilds.length"
      :guilds="publishedGuilds"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageSectionTitle from '~/components/ui/PageSectionTitle.vue'
import AdminGuildList from '~/components/AdminGuildList.vue'

export default {
  layout: 'admin',
  components: {
    PageSectionTitle,
    AdminGuildList
  },
  computed: {
    ...mapGetters('admin', [
      'publishedGuilds'
    ])
  },
  head () {
    return {
      title: 'Guildes'
    }
  }
}
</script>
