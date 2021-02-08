<template>
  <div class="space-y-10">
    <div
      v-if="hasDraftGuild"
      class="flex items-baseline justify-between"
    >
      <InformationCard>
        <p>
          Une fois les informations de votre guilde renseignées, n'oubliez pas de cliquer sur publier.
        </p>
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
          v-model="logoUrl"
          name="logo-url"
          label="Lien du logo"
        />
        <FormInput
          v-model="type"
          name="type"
          label="Type de structure"
          value="Classique (JcE)"
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
        name="start-hour"
        label="Heure de début"
        value="20h30"
        class="max-w-sm w-full"
      />
      <FormInput
        name="end-hour"
        label="Heure de fin"
        value="00h00"
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
import { mapGetters } from 'vuex'

export default {
  name: 'Guild',
  layout: 'account',
  data: () => ({
    selectDays: [false, false, false, false, false, false, false],
    selectClasses: [false, false, false, false, false, false, false, false, false],
    days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    classes: ['Druide', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Warlock', 'Warrior']
  }),
  computed: {
    name () {
      return this.$store.state.account.guild.name
    },
    logoUrl: {
      get () {
        return this.$store.state.account.guild.logoUrl
      },
      set (value) {
        this.$store.dispatch('account/updateGuild', { logoUrl: value })
      }
    },
    type: {
      get () {
        return this.$store.state.account.guild.type
      },
      set (value) {
        this.$store.dispatch('account/updateGuild', { type: value })
      }
    },
    ...mapGetters('account', [
      'hasDraftGuild'
    ])
  },
  watch: {
    guild: debounce(
      function (newGuild) {
        this.$store.commit('addNotification', { type: 'auto-saved' })
      },
      500)
  },
  methods: {
    publish () {
      this.$store.dispatch('account/updateGuild', { published: true })
    },
    handle (value) {
      console.log(value)
    }
  }
}
</script>
