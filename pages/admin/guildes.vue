<template>
  <div class="space-y-8">
    <PageSectionTitle class="flex items-baseline justify-between">
      Guildes publiées <span class="text-base text-gray-600">{{ publishedGuilds.length }} guildes</span>
    </PageSectionTitle>
    <FormCheckBox id="editionMode" name="editionMode" :checked="editionMode" @change="editionMode = $event">
      Je suis un ouf, laisse-moi tout casser.
    </FormCheckBox>
    <AdminGuildList
      v-if="publishedGuilds.length"
      :guilds="publishedGuilds"
      :editing="editionMode"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageSectionTitle from '~/components/ui/PageSectionTitle.vue'
import AdminGuildList from '~/components/AdminGuildList.vue'
import FormCheckBox from '~/components/ui/FormCheckBox.vue'

export default {
  layout: 'admin',
  components: {
    PageSectionTitle,
    AdminGuildList,
    FormCheckBox
  },
  data: () => ({
    editionMode: false
  }),
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
