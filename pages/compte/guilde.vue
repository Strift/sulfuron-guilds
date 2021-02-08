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
    <AccountPageTitle>
      Général
    </AccountPageTitle>
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
          <img src="~assets/images/astral.svg" alt="">
        </div>
      </div>
    </div>
    <AccountPageTitle>
      Horaires
    </AccountPageTitle>
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
    <FormCheckboxList
      v-model="selectDays"
      :checkbox-labels="days"
      name="days"
      label="Jours de raid"
    />
    <AccountPageTitle>
      Recrutement
    </AccountPageTitle>
    <FormCheckboxList
      v-model="selectClasses"
      :checkbox-labels="classes"
      name="classes"
      label="Classes recherchées"
    />
    <AccountPageTitle>
      Contact
    </AccountPageTitle>
    <FormInput
      name="website-url"
      label="Lien du site"
      value="https://astral.gg"
      class="max-w-sm w-full"
    />
    <FormInput
      name="contact-url"
      label="Lien de contact"
      value="https://discord.gg/KFKJJdr"
      class="max-w-sm w-full"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Guild',
  layout: 'account',
  data: () => ({
    typeOptions: [
      { value: 'Classique', label: 'Classique (JcE)' },
      { value: 'Speedrun', label: 'Speedrun' }
    ],
    selectDays: [false, false, false, false, false, false, false],
    selectClasses: [false, false, false, false, false, false, false, false, false],
    days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    classes: ['Druide', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Warlock', 'Warrior']
  }),
  computed: {
    ...mapGetters('account', [
      'hasDraftGuild'
    ]),
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
