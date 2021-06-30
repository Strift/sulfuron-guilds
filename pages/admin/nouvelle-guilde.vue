<template>
  <div class="space-y-8">
    <PageSectionTitle>Créer une guilde</PageSectionTitle>
    <InformationCard class="space-y-2">
      <p class="font-semibold">
        ⚠ Attention
      </p>
      <p>
        Les GMs ne peuvent pas modifier le nom de leur guilde, faites bien attention à l'orthographe.
      </p>
    </InformationCard>
    <div class="max-w-sm space-y-10">
      <FormInput
        v-model="guild"
        label="Nom de la guilde"
        name="guild-name"
      />
      <FormSelect
        v-model="account"
        :options="usersOptions"
        label="Compte Battle.net du GM"
        :placeholder="usersPlaceholder"
        name="bnet-account"
      />
    </div>
    <InformationCard>
      🛠️ La liste déroulante bug un peu, n'hésitez pas à re-cliquer lorsque nécessaire.
    </InformationCard>
    <PrimaryButton @click="createGuild(account, guild)">
      Valider
    </PrimaryButton>
    <PageSectionTitle>Guildes non publiées</PageSectionTitle>
    <AdminGuildList
      v-if="draftGuilds.length"
      :guilds="draftGuilds"
      :advanced-mode="true"
      @remove="removeGuild"
    />
  </div>
</template>

<script>
import { ref, computed, defineComponent, useStore } from '@nuxtjs/composition-api'
import useUsers, {
  STATE_EMPTY as USERS_STATE_EMPTY,
  STATE_LOADING as USERS_STATE_LOADING,
  STATE_LOADED as USERS_STATE_LOADED
} from '~/composables/admin/useUsers'
import useCreateGuild from '~/composables/admin/useCreateGuild'

import FormInput from '~/components/ui/FormInput.vue'
import FormSelect from '~/components/ui/FormSelect.vue'
import PrimaryButton from '~/components/ui/PrimaryButton.vue'
import InformationCard from '~/components/ui/InformationCard.vue'
import PageSectionTitle from '~/components/ui/PageSectionTitle.vue'
import AdminGuildList from '~/components/AdminGuildList.vue'

export default defineComponent({
  layout: 'admin',
  components: {
    FormInput,
    FormSelect,
    PrimaryButton,
    InformationCard,
    PageSectionTitle,
    AdminGuildList
  },
  middleware: ['auth', 'admin'],
  setup () {
    const guild = ref('')
    const account = ref('')

    const store = useStore()
    const { users, state: usersState, fetchUsers } = useUsers()
    const createGuild = useCreateGuild()

    const usersOptions = computed(() => users.value.map(userId => ({ label: userId, value: userId })))
    const usersPlaceholder = computed(() => {
      if (usersState.value === USERS_STATE_EMPTY) { return 'Cliquez pour charger...' }
      if (usersState.value === USERS_STATE_LOADING) { return 'Chargement...' }
      if (usersState.value === USERS_STATE_LOADED) { return 'Sélectionnez le compte' }
      return 'Erreur'
    })
    const draftGuilds = computed(() => store.getters['admin/draftGuilds'])

    const removeGuild = (guild) => {
      const confirmed = confirm(`Voulez-vous supprimer ${guild.name} ?`)
      if (confirmed) {
        store.dispatch('admin/hardDeleteGuildById', guild.id)
        store.dispatch('admin/fetchGuilds')
      }
    }

    fetchUsers()
    return {
      guild,
      account,
      usersOptions,
      usersPlaceholder,
      draftGuilds,
      fetchUsers,
      createGuild,
      removeGuild
    }
  },
  head () {
    return {
      title: 'Nouvelle guilde'
    }
  }
})
</script>
