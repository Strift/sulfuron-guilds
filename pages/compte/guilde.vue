<template>
  <div class="space-y-10">
    <div
      v-if="hasDraftGuild"
      class="flex items-baseline justify-between"
    >
      <InformationCard>
        N'oubliez pas de cliquer sur publier une fois les informations de votre guilde renseignées.
      </InformationCard>
      <PrimaryButton @click="publish">
        Publier
      </PrimaryButton>
    </div>
    <PageSectionTitle>Général</PageSectionTitle>
    <div class="flex flex-col-reverse lg:flex-row justify-between">
      <div class="space-y-10 max-w-sm w-full">
        <FormInput :value="name" name="name" label="Nom de guilde" disabled />
        <div>
          <FormInput v-model.trim="logoUrl" :error-message="errorMessage(logoUrl)" name="logo-url" label="Lien du logo" placeholder="https://exemple.com/logo.png" />
          <div slot="hint" class="mt-3 text-gray-500 flex space-x-2 items-baseline">
            <div>ℹ️</div>
            <div>Utilisez un hébergeur comme <a href="https://imgur.com/" target="_blank" class="hover:underline text-blue-300">imgur</a>.</div>
          </div>
        </div>
        <FormSelect v-model="faction" :options="factionOptions" name="faction" label="Faction" placeholder="Sélectionnez votre faction" />
        <FormSelect v-model="type" :options="typeOptions" name="type" label="Type de structure" placeholder="Sélectionnez le type de guilde" />
      </div>
      <div class="mb-10">
        <div class="font-semibold text-blue-400 block mb-4 leading-none text-shadow-sm">
          Logo
        </div>
        <div class="h-32 w-32 p-4 bg-gray-900 rounded-lg items-center justify-center flex shadow">
          <img v-if="logoUrl" :src="logoUrl" alt="Votre logo" class="text-gray-700">
          <EmptyGuildLogo v-else class="text-gray-800" />
        </div>
      </div>
    </div>
    <PageSectionTitle>Horaires</PageSectionTitle>
    <div class="space-y-10 lg:space-y-0 lg:flex lg:space-x-12 xl:justify-between">
      <FormInput v-model="startHour" name="start-hour" type="time" label="Heure de début" class="max-w-sm w-full" />
      <FormInput v-model="endHour" name="end-hour" type="time" label="Heure de fin" class="max-w-sm w-full" />
    </div>
    <FormCheckList v-model="raidDays" :options="daysOptions" name="days" label="Jours de raid" />
    <PageSectionTitle>Recrutement</PageSectionTitle>
    <FormCheckList v-model="recruitment" :options="wowClasses.map(option => option.name)" name="classes" label="Classes recherchées" />
    <PageSectionTitle>Contact</PageSectionTitle>
    <FormInput
      v-model="websiteUrl"
      :error-message="errorMessage(websiteUrl)"
      name="website-url"
      label="Lien du site"
      placeholder="https://exemple.com/"
      class="max-w-sm w-full"
    />
    <FormInput
      v-model="contactUrl"
      :error-message="errorMessage(contactUrl)"
      name="contact-url"
      label="Lien de contact"
      placeholder="https://discord.gg/XXXXXXX"
      class="max-w-sm w-full"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { mapState, mapGetters } from 'vuex'
import isUrl from 'is-url'

import WOW_CLASSES from '~/data/classes.json'

const DAYS_OF_THE_WEEK = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

export default {
  name: 'Guild',
  layout: 'account',
  data: () => ({
    factionOptions: [
      { value: 'Alliance', label: 'Alliance' },
      { value: 'Horde', label: 'Horde' }
    ],
    typeOptions: [
      { value: 'Classique', label: 'Classique (PvE)' },
      { value: 'PvP', label: 'PvP' },
      { value: 'Speedrun', label: 'Speedrun' }
    ],
    daysOptions: DAYS_OF_THE_WEEK,
    wowClasses: WOW_CLASSES.sort((classA, classB) => (classA.name > classB.name) ? 1 : -1)
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
    faction: {
      get () {
        return this.guild.faction
      },
      set (value) {
        this.$store.dispatch('account/updateGuild', { faction: value })
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
        return this.guild.raidDays.map(({ playing }) => playing)
      },
      set (value) {
        const raidDays = this.daysOptions.map((day, index) => ({ day, playing: value[index] }))
        this.$store.dispatch('account/updateGuild', { raidDays })
      }
    },
    recruitment: {
      get () {
        return this.guild.recruitment.map(({ open }) => open)
      },
      set (checkedValues) {
        const recruitmentState = this.recruitmentState(checkedValues)
        this.$store.dispatch('account/updateGuild', { recruitment: recruitmentState })
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
    },
    recruitmentState (checkedValues) {
      return this.wowClasses.map(({ value }, index) => {
        return {
          class: value,
          open: checkedValues[index]
        }
      })
    },
    errorMessage (value) {
      if (isUrl(value)) {
        return null // no errors
      }
      return 'Ce lien n\'est pas valide.'
    }
  },
  head () {
    return {
      title: this.name
    }
  }
}
</script>
