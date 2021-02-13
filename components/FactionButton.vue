<template>
  <button class="flex items-center font-semibold text-left overflow-hidden w-40" @click="toggleFaction">
    <transition name="slide" mode="out-in">
      <div v-if="isAlliance" key="alliance" class="flex items-center w-full">
        <img src="~/assets/images/alliance-logo.png" alt="Blason de l'Alliance" title="Alliance" class="h-10 mr-4">
        <div>Alliance</div>
        <SwitchIcon class="h-5 ml-auto" />
      </div>
      <div v-else key="horde" class="flex items-center w-full">
        <img src="~/assets/images/horde-logo.png" alt="Blason de la Horde" title="Horde" class="h-10 mr-4">
        <div>Horde</div>
        <SwitchIcon class="h-5 ml-auto" />
      </div>
    </transition>
  </button>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import SwitchIcon from '~/components/icons/SwitchIcon.vue'

const DEFAULT_FACTION_COOKIE = 'default_faction'

export default {
  components: {
    SwitchIcon
  },
  computed: {
    ...mapState(['faction']),
    ...mapGetters(['isAlliance'])
  },
  watch: {
    faction (newFaction) {
      this.$cookies.set(DEFAULT_FACTION_COOKIE, newFaction)
    }
  },
  mounted () {
    const faction = this.$cookies.get(DEFAULT_FACTION_COOKIE)
    if (faction === null) {
      this.$cookies.set(DEFAULT_FACTION_COOKIE, this.faction)
    } else {
      this.$store.commit('setFaction', faction)
    }
  },
  methods: {
    ...mapMutations(['toggleFaction'])
  }
}
</script>
