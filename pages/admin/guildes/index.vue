<template>
  <div class="space-y-8">
    <Heading2 class="flex items-baseline justify-between">
      Guildes publiées <span class="text-base text-gray-600"><Promised :promise="publishedGuilds"><template #default="data">{{ data.length }}</template></Promised> guildes</span>
    </Heading2>
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
      <template #pending>
        <BaseLoader class="mx-auto" />
      </template>
    </Promised>
    <Heading2 class="flex items-baseline justify-between">
      Guildes supprimées <span class="text-base text-gray-600"><Promised :promise="deletedGuilds"><template #default="data">{{ data.length }}</template></Promised> guildes</span>
    </Heading2>
    <Promised :promise="deletedGuilds">
      <template #default="data">
        <AdminGuildList
          :guilds="data"
          :advanced-mode="editionMode"
          :search="searchText"
        />
      </template>
      <template #pending>
        <BaseLoader class="mx-auto" />
      </template>
    </Promised>
  </div>
</template>

<script lang="ts">
import { computed, ref } from '@nuxtjs/composition-api'
import { Promised } from 'vue-promised'
import * as Sentry from '@sentry/vue'
import Heading2 from '~/components/atoms/Heading2.vue'
import BaseLoader from '~/components/atoms/BaseLoader.vue'
import useGuilds from '~/composables/database/useGuilds'
import type { Guild } from '~/data/types'

export default {
  components: {
    Heading2,
    BaseLoader,
    Promised
  },
  layout: 'admin',
  setup () {
    const { list, deleteById } = useGuilds()
    const searchText = ref('')
    const editionMode = ref(false)

    const guilds = ref<Promise<Guild[]>>()
    const publishedGuilds = computed(() => {
      if (guilds.value) {
        return guilds.value.then(guilds => guilds.filter(guild => guild.published && !guild.deleted))
      }
      return []
    })
    const deletedGuilds = computed(() => {
      if (guilds.value) {
        return guilds.value.then(guilds => guilds.filter(guild => guild.deleted))
      }
      return []
    })

    const fetchGuilds = () => {
      guilds.value = list({ published: true })
    }

    const onGuildRemove = async (guild: Guild) => {
      try {
        const confirmed = confirm(`Voulez-vous supprimer ${guild.name} ?`)
        if (confirmed) {
          await deleteById(guild.id)
          fetchGuilds()
        }
      } catch (error: any) {
        let message
        if (error instanceof Error) {
          message = error.message
        } else {
          message = String(error)
        }
        alert(message)
        Sentry.captureException(error)
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
