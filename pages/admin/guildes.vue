<template>
  <div class="space-y-8">
    <BaseHeader2 class="flex items-baseline justify-between">
      Guildes publiées <span class="text-base text-gray-600">{{ publishedGuilds.length }} guildes</span>
    </BaseHeader2>
    <div class="flex space-x-8">
      <div class="w-1/2">
        <BaseInput v-model="searchText" name="Recherche" label="Recherche" placeholder="Nom de guilde, Battle.net" />
      </div>
      <div class="w-1/2">
        <div class="font-semibold mb-2 text-blue-400">
          Mode avancé
        </div>
        <BaseCheckListItem id="editionMode" name="editionMode" :checked="editionMode" @change="editionMode = $event">
          Je suis un ouf, laisse-moi tout casser.
        </BaseCheckListItem>
      </div>
    </div>
    <AdminGuildList
      v-if="publishedGuilds.length"
      :guilds="publishedGuilds"
      :advanced-mode="editionMode"
      :search="searchText"
      @remove="removeGuild"
    />
    <BaseHeader2 class="flex items-baseline justify-between">
      Guildes supprimées <span class="text-base text-gray-600">{{ deletedGuilds.length }} guildes</span>
    </BaseHeader2>
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
import AdminGuildList from '~/components/AdminGuildList.vue'

export default {
  layout: 'admin',
  components: {
    AdminGuildList
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
