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
        :options="users"
        label="Compte Battle.net du GM"
        :placeholder="accountPlaceholder"
        name="bnet-account"
        @focus="fetchUsers"
      />
    </div>
    <InformationCard>
      🛠️ La liste déroulante bug un peu, n'hésitez pas à re-cliquer lorsque nécessaire.
    </InformationCard>
    <PrimaryButton @click="createGuild">
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
import { mapGetters } from 'vuex'
import FormInput from '~/components/ui/FormInput.vue'
import FormSelect from '~/components/ui/FormSelect.vue'
import PrimaryButton from '~/components/ui/PrimaryButton.vue'
import InformationCard from '~/components/ui/InformationCard.vue'
import PageSectionTitle from '~/components/ui/PageSectionTitle.vue'
import AdminGuildList from '~/components/AdminGuildList.vue'

import WOW_CLASSES from '~/data/classes.json'

const DAYS_OF_THE_WEEK = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

const USERS_STATE_EMPTY = 'empty'
const USERS_STATE_LOADING = 'loading'
const USERS_STATE_LOADED = 'loaded'
const USERS_STATE_ERROR = 'error'

export default {
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
  data: () => ({
    usersState: USERS_STATE_EMPTY,
    users: [],
    guild: '',
    account: '',
    error: null
  }),
  computed: {
    ...mapGetters('admin', [
      'draftGuilds'
    ]),
    accountPlaceholder () {
      if (this.usersState === USERS_STATE_EMPTY) { return 'Cliquez pour charger...' }

      if (this.usersState === USERS_STATE_LOADING) { return 'Chargement...' }

      if (this.usersState === USERS_STATE_LOADED) { return 'Sélectionnez le compte' }

      return 'Erreur'
    }
  },
  methods: {
    async fetchUsers () {
      this.usersState = USERS_STATE_LOADING
      try {
        const listUsers = this.$fire.functions.httpsCallable('listUsers')
        const { data } = await listUsers()
        this.users = data.users.map(userId => ({ label: userId, value: userId }))
        this.usersState = USERS_STATE_LOADED
      } catch (err) {
        this.usersState = USERS_STATE_ERROR
      }
    },
    async createGuild () {
      try {
        await this.$fire.firestore
          .collection('guilds')
          .add({
            ownerUid: this.account,
            name: this.guild,
            published: false,
            type: '',
            logoUrl: '',
            startHour: '',
            endHour: '',
            raidDays: DAYS_OF_THE_WEEK.map(day => ({ day, playing: false })),
            recruitment: WOW_CLASSES.map(classObj => ({ class: classObj.value, open: false })),
            websiteUrl: '',
            contactUrl: ''
          })
        this.guild = ''
        this.account = ''
        this.$store.dispatch('admin/fetchGuilds')
      } catch (err) {
        this.error = err
      }
    },
    guildName (guild) {
      if (guild.faction && guild.faction !== '') {
        return `[${guild.faction.charAt(0)}] ${guild.name}`
      }
      return `[?] ${guild.name}`
    },
    removeGuild (guild) {
      const confirmed = confirm(`Voulez-vous supprimer ${guild.name} ?`)
      if (confirmed) {
        this.$store.dispatch('admin/hardDeleteGuildById', guild.id)
      }
      this.$store.dispatch('admin/fetchGuilds')
    }
  },
  head () {
    return {
      title: 'Nouvelle guilde'
    }
  }
}
</script>
