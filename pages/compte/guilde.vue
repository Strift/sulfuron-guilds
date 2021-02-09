<template>
  <div class="space-y-10">
    <div
      v-if="hasDraftGuild"
      class="flex items-baseline justify-between"
    >
      <InformationCard>
        Une fois les informations de votre guilde renseignées, n'oubliez pas de cliquer sur publier.
      </InformationCard>
      <PrimaryButton @click="publish">
        Publier
      </PrimaryButton>
    </div>
    <PageSectionTitle>
      Général
    </PageSectionTitle>
    <div class="flex justify-between">
      <div class="space-y-10 max-w-sm w-full">
        <FormInput
          name="name"
          label="Nom de guilde"
          disabled
          :value="name"
        />
        <FormInput
          v-model.trim="logoUrl"
          name="logo-url"
          label="Lien du logo"
        />
        <FormSelect
          v-model="type"
          name="type"
          label="Type de structure"
          :options="typeOptions"
        />
      </div>
      <div>
        <div class="font-semibold text-blue-400 block mb-4 leading-none text-shadow-sm">
          Logo
        </div>
        <div class="h-32 w-32 p-4 bg-gray-900 rounded-lg items-center justify-center flex shadow">
          <img :src="logoUrl" :alt="`Logo de votre guilde`">
        </div>
      </div>
    </div>
    <PageSectionTitle>
      Horaires
    </PageSectionTitle>
    <div class="flex justify-between">
      <FormInput
        v-model="startHour"
        name="start-hour"
        type="time"
        label="Heure de début"
        class="max-w-sm w-full"
      />
      <FormInput
        v-model="endHour"
        name="end-hour"
        type="time"
        label="Heure de fin"
        class="max-w-sm w-full"
      />
    </div>
    <FormCheckList
      v-model="raidDays"
      :options="daysOptions"
      name="days"
      label="Jours de raid"
    />
    <PageSectionTitle>
      Recrutement
    </PageSectionTitle>
    <FormCheckList
      v-model="recruitment"
      :options="classesOptions"
      name="classes"
      label="Classes recherchées"
    />
    <PageSectionTitle>
      Contact
    </PageSectionTitle>
    <FormInput
      v-model="websiteUrl"
      name="website-url"
      label="Lien du site"
      class="max-w-sm w-full"
    />
    <FormInput
      v-model="contactUrl"
      name="contact-url"
      label="Lien de contact"
      class="max-w-sm w-full"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { mapState, mapGetters } from 'vuex'

const DAYS_OF_THE_WEEK = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
const WOW_CLASSES = ['Druide', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Warlock', 'Warrior']

export default {
  name: 'Guild',
  layout: 'account',
  data: () => ({
    typeOptions: [
      { value: 'Classique', label: 'Classique (JcE)' },
      { value: 'Speedrun', label: 'Speedrun' }
    ],
    daysOptions: DAYS_OF_THE_WEEK,
    classesOptions: WOW_CLASSES
  }),
  computed: {
    ...mapGetters('account', ['hasDraftGuild']),
    ...mapState('account', ['guild']),
    name () {
      return this.guild.name
    },
    logoUrl: {
      get () {
        return this.guild.logoUrl
      },
      set (value) {
        this.$store.dispatch('account/updateGuild', { logoUrl: value })
      }
    },
    type: {
      get () {
        return this.guild.type
      },
      set (value) {
        this.$store.dispatch('account/updateGuild', { type: value })
      }
    },
    startHour: {
      get () {
        return this.guild.startHour
      },
      set (value) {
        this.$store.dispatch('account/updateGuild', { startHour: value })
      }
    },
    endHour: {
      get () {
        return this.guild.endHour
      },
      set (value) {
        this.$store.dispatch('account/updateGuild', { endHour: value })
      }
    },
    raidDays: {
      get () {
        // Checking for strict equality so that undefined (newly created) will mean playing=false
        return this.guild.raidDays.map(({ playing }) => playing === true)
      },
      set (value) {
        const raidDays = this.daysOptions.map((day, index) => ({ day, playing: value[index] }))
        this.$store.dispatch('account/updateGuild', { raidDays })
      }
    },
    recruitment: {
      get () {
        // Checking for strict equality so that undefined (newly created) will mean playing=false
        return this.guild.recruitment.map(({ open }) => open === true)
      },
      set (value) {
        const recruitment = this.classesOptions.map((className, index) => ({ class: className, open: value[index] }))
        this.$store.dispatch('account/updateGuild', { recruitment })
      }
    },
    websiteUrl: {
      get () {
        return this.guild.websiteUrl
      },
      set (value) {
        return this.$store.dispatch('account/updateGuild', { websiteUrl: value })
      }
    },
    contactUrl: {
      get () {
        return this.guild.contactUrl
      },
      set (value) {
        return this.$store.dispatch('account/updateGuild', { contactUrl: value })
      }
    }
  },
  watch: {
    guild: debounce(
      function () {
        this.$store.commit('addNotification', { type: 'auto-saved' })
      },
      500)
  },
  methods: {
    publish () {
      this.$store.dispatch('account/updateGuild', { published: true })
    }
  }
}
</script>
