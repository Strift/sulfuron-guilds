<template>
  <div>
    <PageTitle>
      Admin zone 👀
    </PageTitle>
    <div class="space-y-10">
      <InformationCard class="space-y-2">
        <p class="font-semibold">
          Cette page est en construction. 🛠️
        </p>
        <p>
          Attention, il n'y a aucune vérification de l'existence des comptes !
        </p>
      </InformationCard>
      <PageSectionTitle>Créer une guilde</PageSectionTitle>
      <div class="max-w-sm space-y-10">
        <FormInput
          v-model="guild"
          label="Nom de la guilde"
          name="guild-name"
        />
        <FormInput
          v-model="account"
          label="Compte Battle.net du GM"
          name="bnet-account"
        />
        <PrimaryButton @click="createGuild">
          Valider
        </PrimaryButton>
      </div>
      <PageSectionTitle>Guildes (draft)</PageSectionTitle>
      <div v-if="listOfDraftGuilds.length" class="bg-gray-300 text-gray-800 p-6 rounded shadow">
        {{ listOfDraftGuilds }}
      </div>
      <PageSectionTitle>Guildes (publiques)</PageSectionTitle>
      <div v-if="listOfPublicGuilds.length" class="bg-gray-300 text-gray-800 p-6 rounded shadow">
        {{ listOfPublicGuilds }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: ['auth', 'admin'],
  data: () => ({
    guild: '',
    account: '',
    error: null
  }),
  computed: {
    ...mapState({
      guilds: state => state.guilds.list
    }),
    listOfDraftGuilds () {
      return this.guilds
        .filter(({ published }) => !published)
        .map(({ name, ownerUid }) => `${name} (${ownerUid})`)
        .sort()
        .join(', ')
    },
    listOfPublicGuilds () {
      return this.guilds
        .filter(({ published }) => published)
        .map(({ name, ownerUid }) => `${name} (${ownerUid})`)
        .sort()
        .join(', ')
    }
  },
  async mounted () {
    // Performing data fetching in mounted hook because of NuxtFirebase issues with SSR
    await this.$store.dispatch('guilds/enableSync')
  },
  async beforeDestroy () {
    await this.$store.dispatch('guilds/disableSync')
  },
  methods: {
    async createGuild () {
      try {
        await this.$fire.firestore
          .collection('guilds')
          .add({
            name: this.guild,
            ownerUid: this.account,
            published: false
          })
        this.guild = ''
        this.account = ''
      } catch (err) {
        this.error = err
      }
    }
  }
}
</script>
