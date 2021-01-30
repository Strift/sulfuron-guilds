<template>
  <div class="space-y-10">
    <button class="bg-red-100" @click="test">
      test
    </button>
    <AccountPageTitle>
      Général
    </AccountPageTitle>
    <div class="flex justify-between">
      <div class="space-y-10">
        <FormInput
          name="name"
          label="Nom"
          disabled
          value="Les Croisés de Pandragon"
        />
        <FormInput
          name="logo-url"
          label="Lien du logo"
          value="https://astral.gg/logo.svg"
        />
        <FormInput
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
    <div class="flex">
      <FormInput
        name="start-hour"
        label="Heure de début"
        value="20h30"
        class="w-1/2"
      />
      <FormInput
        name="end-hour"
        label="Heure de fin"
        value="00h00"
        class="w-1/2"
      />
    </div>
    <FormCheckboxList
      v-model="selectDays"
      :checkbox-labels="days"
      name="days"
      label="Jours"
    />
    <AccountPageTitle>
      Recrutement
    </AccountPageTitle>
    <FormCheckboxList
      v-model="selectClasses"
      :checkbox-labels="classes"
      name="classes"
      label="Classes"
    />
    <AccountPageTitle>
      Contact
    </AccountPageTitle>
    <FormInput
      name="website-url"
      label="Site"
      value="https://astral.gg"
    />
    <FormInput
      name="contact-url"
      label="Contact"
      value="https://discord.gg/KFKJJdr"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { mapState } from 'vuex'
import FormInput from '~/components/ui/FormInput.vue'
import FormCheckboxList from '~/components/ui/FormCheckboxList.vue'
import AccountPageTitle from '~/components/ui/AccountPageTitle.vue'

export default {
  name: 'Guild',
  layout: 'account',
  components: {
    FormInput,
    FormCheckboxList,
    AccountPageTitle
  },
  data: () => ({
    selectDays: [false, false, false, false, false, false, false],
    selectClasses: [false, false, false, false, false, false, false, false, false],
    days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    classes: ['Druide', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Warlock', 'Warrior']
  }),
  computed: {
    ...mapState('account', [
      'guild'
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
    test () {
      this.$store.dispatch('account/updateGuild', { test: !this.guild.test })
    }
  }
}
</script>
