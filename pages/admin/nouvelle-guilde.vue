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
        v-model="guild"
        label="Nom de la guilde"
        name="guild-name"
      />
      <AdminUserInput v-model="account" />
    </div>
    <BasePrimaryButton @click="createGuild(account, guild)">
      Valider
    </BasePrimaryButton>
    <BaseHeader2>Guildes non publiées</BaseHeader2>
    <AdminGuildList
      v-if="draftGuilds.length"
      :guilds="draftGuilds"
      :advanced-mode="true"
      @remove="removeGuild"
    />
    <BaseLoader
      v-else
      class="mx-auto"
    />
  </div>
</template>

<script>
import { ref, computed, defineComponent, useStore } from '@nuxtjs/composition-api'
import useCreateGuild from '~/composables/admin/useCreateGuild'

export default defineComponent({
  layout: 'admin',
  middleware: ['auth', 'admin'],
  setup () {
    const guild = ref('')
    const account = ref('')

    const store = useStore()
    const { createGuild } = useCreateGuild()
    const draftGuilds = computed(() => store.getters['admin/draftGuilds'])

    const removeGuild = (guild) => {
      const confirmed = confirm(`Voulez-vous supprimer ${guild.name} ?`)
      if (confirmed) {
        store.dispatch('admin/hardDeleteGuildById', guild.id)
        store.dispatch('admin/fetchGuilds')
      }
    }
    return {
      guild,
      account,
      draftGuilds,
      createGuild,
      removeGuild
    }
  },
  head () {
    return {
      title: 'Nouvelle guilde - Sulfuron-EU'
    }
  }
})
</script>
