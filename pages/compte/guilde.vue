<template>
  <div class="space-y-10">
    <AccountGuildPublish
      v-if="hasDraftGuild"
      @publish="publish"
    />
    <div class="space-y-10">
      <Heading2>Tableau de bord</Heading2>
      <AccountGuildOverview
        :website-redirects="websiteRedirectsCount"
        :contact-redirects="contactRedirectsCount"
      />
    </div>
    <Heading2>Général</Heading2>
    <div class="flex flex-col-reverse justify-between lg:flex-row">
      <div class="max-w-sm space-y-10 w-full">
        <BaseInput :value="name" name="name" label="Nom de guilde" disabled />
        <div>
          <BaseInput v-model.trim="logoUrl" :error-message="urlErrorMessage(logoUrl)" name="logo-url" label="Lien du logo" placeholder="https://exemple.com/logo.png" />
          <div class="flex items-baseline mt-3 space-x-2 text-gray-600">
            <div>ℹ️</div>
            <div>Utilisez un hébergeur comme <a href="https://imgur.com/" target="_blank" class="hover:underline text-blue-300">imgur</a>, puis <br><em>copiez l'adresse de l'image</em> (clic droit).</div>
          </div>
          <div
            v-if="logoUrl.startsWith('http:')"
            class="flex items-baseline mt-3 space-x-2 text-gray-600"
          >
            <div>⚠️</div>
            <div>Seules les images hébérgées sur un serveur sécurisé (https) sont affichées.</div>
          </div>
        </div>
        <BaseSelect v-model="faction" :options="factionOptions" name="faction" label="Faction" placeholder="Sélectionnez votre faction" />
        <AccountGuildTypeInput />
      </div>
      <div class="mb-10">
        <div class="block font-semibold leading-none mb-4 text-blue-400 text-shadow-sm">
          Logo
        </div>
        <div class="bg-gray-900 flex h-32 items-center justify-center p-4 rounded-lg shadow w-32">
          <nuxt-img v-if="logoUrl" :src="logoUrl" alt="Votre logo" class="text-gray-700" />
          <MissingGuildLogo v-else class="text-gray-800" />
        </div>
      </div>
    </div>
    <div>
      <BaseInput
        v-model="description"
        :max-length="144"
        name="description"
        label="Présentation"
        placeholder="Nous sommes une guilde de copains."
      />
    </div>
    <Heading2>Horaires</Heading2>
    <div class="lg:flex lg:space-x-12 lg:space-y-0 space-y-10 xl:justify-between">
      <BaseInput v-model="startHour" name="start-hour" type="time" label="Heure de début" class="max-w-sm w-full" />
      <BaseInput v-model="endHour" name="end-hour" type="time" label="Heure de fin" class="max-w-sm w-full" />
    </div>
    <BaseCheckList v-model="raidDays" :options="daysOptions" name="days" label="Jours de raid" />
    <Heading2>Recrutement</Heading2>
    <div>
      <div class="block font-semibold leading-none mb-4 text-blue-400 text-shadow-sm">
        Classes recherchées
      </div>
      <AccountSpecializationListInput
        v-model="recruitment"
        class="gap-x-6 gap-y-4 grid grid-cols-2 grid-flow-cols lg:grid-cols-5 md:grid-cols-3"
      />
    </div>
    <Heading2>Contact</Heading2>
    <BaseInput
      v-model="websiteUrl"
      :error-message="urlErrorMessage(websiteUrl)"
      name="website-url"
      label="Lien du site"
      placeholder="https://maguilde.fr/"
      class="max-w-sm w-full"
    />
    <div>
      <BaseInput
        v-model="contactUrl"
        :error-message="urlErrorMessage(contactUrl)"
        name="contact-url"
        label="Lien de contact"
        placeholder="https://discord.gg/XXXXXXX"
        class="max-w-sm w-full"
      />
      <div
        v-if="contactUrl.length === 0"
        class="flex items-baseline mt-3 space-x-2 text-gray-600"
      >
        <div>⚠️</div>
        <div>Lien de contact manquant. Votre guilde n'apparaîtra pas dans les résultats de recherche.</div>
      </div>
    </div>
    <AccountGuildPublish
      v-if="hasDraftGuild"
      @publish="publish"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { mapGetters, mapState } from 'vuex'
import isUrl from 'is-url'

import Heading2 from '~/components/atoms/Heading2.vue'
import MissingGuildLogo from '~/components/atoms/MissingGuildLogo.vue'

import WOW_CLASSES from '~/data/classes.json'
const DAYS_OF_THE_WEEK = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

export default {
  name: 'Guild',
  components: {
    Heading2,
    MissingGuildLogo
  },
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
    wowClasses: WOW_CLASSES.sort((classA, classB) => (classA.name > classB.name) ? 1 : -1),
    awaitingTyping: false
  }),
  computed: {
    ...mapGetters('account', ['hasDraftGuild', 'contactRedirectsCount', 'websiteRedirectsCount']),
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
    description: {
      get () {
        return this.guild.description
      },
      set: debounce(
        function (value) {
          this.$store.dispatch('account/updateGuild', { description: value })
        },
        1000)
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
        return this.getSpecsListPropsData(this.guild.recruitment)
      },
      set (checkedSpecs) {
        const recruitmentState = this.getRecruitmentState(checkedSpecs)
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
    getSpecsListPropsData (recruitmentState) {
      return recruitmentState.map(classRecruitment => ({
        class: classRecruitment.class,
        specs: classRecruitment.specs.map(spec => ({ value: spec.value, checked: spec.open }))
      }))
    },
    getRecruitmentState (specsListData) {
      return specsListData.map(classRecruitment => ({
        class: classRecruitment.class,
        specs: classRecruitment.specs.map(spec => ({ value: spec.value, open: spec.checked }))
      }))
    },
    urlErrorMessage (value) {
      if (isUrl(value)) {
        return null // no errors
      }
      return 'Ce lien n\'est pas valide.'
    }
  },
  head () {
    return {
      title: 'Ma guilde - Sulfuron-EU'
    }
  }
}
</script>
