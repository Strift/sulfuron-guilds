<template>
  <div>
    <PageTitle>
      Admin zone 👀
    </PageTitle>
    <div class="space-y-10">
      <InformationCard class="space-y-2">
        <p class="font-semibold">
          🛠️ Cette page est en construction.
        </p>
      </InformationCard>
      <PageSectionTitle>🆕 Créer une guilde</PageSectionTitle>
      <InformationCard class="space-y-2">
        <p class="font-semibold">
          ⚠ Attention
        </p>
        <p>
          Il n'y a pas de vérification de l'existence des comptes Battle.net, faites attention aux minuscules et majuscules.
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
        <FormInput
          v-model="account"
          label="Compte Battle.net du GM"
          name="bnet-account"
        />
        <PrimaryButton @click="createGuild">
          Valider
        </PrimaryButton>
      </div>
      <PageSectionTitle>📝 Guildes non publiées</PageSectionTitle>
      <div v-if="draftGuilds.length" class="bg-gray-300 text-gray-800 p-6 rounded shadow">
        <ul class="list-disc list-inside">
          <li v-for="(guild, i) in draftGuilds" :key="i">
            {{ guildName(guild) }} <span class="text-sm text-gray-600">({{ guild.ownerUid }})</span>
          </li>
        </ul>
      </div>
      <PageSectionTitle class="flex justify-between items-baseline">
        ✅ Guildes publiées <span class="text-gray-600 text-base">{{ publishedGuilds.length }} guildes</span>
      </PageSectionTitle>
      <div v-if="publishedGuilds.length" class="bg-gray-300 text-gray-800 p-6 rounded shadow">
        <ul class="list-disc list-inside">
          <li v-for="(guild, i) in publishedGuilds" :key="i">
            {{ guildName(guild) }} <span class="text-sm text-gray-600">({{ guild.ownerUid }})</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import WOW_CLASSES from '~/data/classes.json'

const DAYS_OF_THE_WEEK = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

export default {
  middleware: ['auth', 'admin'],
  data: () => ({
    guild: '',
    account: '',
    error: null
  }),
  computed: {
    ...mapGetters('guilds', [
      'draftGuilds',
      'publishedGuilds'
    ])
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
      } catch (err) {
        this.error = err
      }
    },
    guildName (guild) {
      if (guild.faction && guild.faction !== '') {
        return `[${guild.faction.charAt(0)}] ${guild.name}`
      }
      return `[?] ${guild.name}`
    }
  },
  head () {
    return {
      title: 'Administration'
    }
  }
}
</script>
