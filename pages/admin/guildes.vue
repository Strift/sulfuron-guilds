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
    <Promised :promise="publishedGuilds">
      <template #default="data">
        <AdminGuildList
          :guilds="data"
          :advanced-mode="editionMode"
          :search="searchText"
          @remove="onGuildRemove"
        />
      </template>
      <template v-slot:pending>
        <BaseLoader class="mx-auto" />
      </template>
    </Promised>
    <BaseHeader2 class="flex items-baseline justify-between">
      Guildes supprimées <span class="text-base text-gray-600">{{ deletedGuilds.length }} guildes</span>
    </BaseHeader2>
    <Promised :promise="deletedGuilds">
      <template #default="data">
        <AdminGuildList
          :guilds="data"
          :advanced-mode="editionMode"
          :search="searchText"
        />
      </template>
      <template v-slot:pending>
        <BaseLoader class="mx-auto" />
      </template>
    </Promised>
  </div>
</template>

<script>
import { computed, ref } from '@nuxtjs/composition-api'
import { Promised } from 'vue-promised'
import useGuilds from '~/composables/database/useGuilds'

export default {
  layout: 'admin',
  components: { Promised },
  setup () {
    const { list, deleteById } = useGuilds()
    const searchText = ref('')
    const editionMode = ref(false)

    const guilds = ref([])
    const publishedGuilds = computed(() => {
      return guilds.value.then(guilds => guilds.filter(guild => guild.published && !guild.deleted))
    })
    const deletedGuilds = computed(() => {
      return guilds.value.then(guilds => guilds.filter(guild => guild.deleted))
    })

    const fetchGuilds = () => {
      guilds.value = list({ published: true })
    }

    const onGuildRemove = async (guild) => {
      const confirmed = confirm(`Voulez-vous supprimer ${guild.name} ?`)
      if (confirmed) {
        await deleteById(guild.id)
        fetchGuilds()
      }
    }

    fetchGuilds()
    return {
      searchText,
      editionMode,
      publishedGuilds,
      deletedGuilds,
      onGuildRemove
    }
  },
  head () {
    return {
      title: 'Guildes - Sulfuron-EU'
    }
  }
}
</script>
