<template>
  <div class="space-y-8">
    <PageSectionTitle class="flex items-baseline justify-between">
      Guildes publiées <span class="text-base text-gray-600">{{ publishedGuilds.length }} guildes</span>
    </PageSectionTitle>
    <div class="flex space-x-8">
      <div class="w-1/2">
        <FormInput v-model="searchText" name="Recherche" label="Recherche" placeholder="Nom de guilde, Battle.net" />
      </div>
      <div class="w-1/2">
        <div class="font-semibold mb-2 text-blue-400">
          Mode avancé
        </div>
        <FormCheckBox id="editionMode" name="editionMode" :checked="editionMode" @change="editionMode = $event">
          Je suis un ouf, laisse-moi tout casser.
        </FormCheckBox>
      </div>
    </div>
    <AdminGuildList
      v-if="publishedGuilds.length"
      :guilds="publishedGuilds"
      :advanced-mode="editionMode"
      :search="searchText"
      @remove="removeGuild"
    />
    <PageSectionTitle class="flex items-baseline justify-between">
      Guildes supprimées <span class="text-base text-gray-600">{{ deletedGuilds.length }} guildes</span>
    </PageSectionTitle>
    <AdminGuildList
      v-if="deletedGuilds.length"
      :guilds="deletedGuilds"
      :advanced-mode="editionMode"
      @remove="removeGuild"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageSectionTitle from '~/components/ui/PageSectionTitle.vue'
import AdminGuildList from '~/components/AdminGuildList.vue'
import FormInput from '~/components/ui/FormInput.vue'
import FormCheckBox from '~/components/ui/FormCheckBox.vue'

export default {
  layout: 'admin',
  components: {
    PageSectionTitle,
    AdminGuildList,
    FormInput,
    FormCheckBox
  },
  data: () => ({
    searchText: '',
    editionMode: false
  }),
  computed: {
    ...mapGetters('admin', [
      'publishedGuilds',
      'deletedGuilds'
    ])
  },
  methods: {
    removeGuild (guild) {
      const confirmed = confirm(`Voulez-vous supprimer ${guild.name} ?`)
      if (confirmed) {
        this.$store.dispatch('admin/softDeleteGuildById', guild.id)
      }
      this.$store.dispatch('admin/fetchGuilds')
    }
  },
  head () {
    return {
      title: 'Guildes'
    }
  }
}
</script>
