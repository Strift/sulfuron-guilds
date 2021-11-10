<template>
  <div class="space-y-8">
    <BaseHeader2>Créer une guilde</BaseHeader2>
    <BaseInformationCard class="space-y-2">
      <p class="font-semibold">
        ⚠ Attention
      </p>
      <p>
        Les GMs ne peuvent pas modifier le nom de leur guilde, faites bien attention à l'orthographe.
      </p>
    </BaseInformationCard>
    <div class="max-w-sm space-y-10">
      <BaseInput
        v-model="guildName"
        label="Nom de la guilde"
        name="guild-name"
      />
      <AdminUserInput v-model="ownerUid" />
    </div>
    <BasePrimaryButton @click="onGuildCreate">
      Valider
    </BasePrimaryButton>
    <BaseHeader2>Guildes non publiées</BaseHeader2>
    <Promised :promise="draftGuilds">
      <template v-slot="data">
        <AdminGuildList
          :guilds="data"
          :advanced-mode="true"
          @remove="onGuildRemove"
        />
      </template>
      <template v-slot:pending>
        <BaseLoader class="mx-auto" />
      </template>
    </Promised>
  </div>
</template>

<script>
import { Promised } from 'vue-promised'
import { computed, defineComponent, ref } from '#app'
import useCreateGuild from '~/composables/admin/useCreateGuild'
import useGuilds from '~/composables/database/useGuilds'

export default defineComponent({
  layout: 'admin',
  middleware: ['auth', 'admin'],
  components: {
    Promised
  },
  setup () {
    const { name: guildName, ownerUid, createGuild } = useCreateGuild()
    const { list, deleteById } = useGuilds()

    const guilds = ref([])
    const draftGuilds = computed(() => {
      return guilds.value.then(guilds => guilds.filter(guild => guild.published === false))
    })

    const fetchGuilds = () => {
      guilds.value = list({ published: false })
    }

    const onGuildRemove = (guild) => {
      const confirmed = confirm(`Voulez-vous supprimer ${guild.name} ?`)
      if (confirmed) {
        deleteById(guild.id, { hardDelete: true })
        fetchGuilds()
      }
    }
    const onGuildCreate = async () => {
      const guildId = await createGuild()
      if (guildId) {
        fetchGuilds()
      }
    }

    fetchGuilds()
    return {
      guildName,
      ownerUid,
      draftGuilds,
      onGuildCreate,
      onGuildRemove
    }
  },
  head () {
    return {
      title: 'Nouvelle guilde - Sulfuron-EU'
    }
  }
})
</script>
