<template>
  <button class="flex items-center text-gray-200 font-semibold text-left overflow-hidden w-40" @click="toggleFaction">
    <transition name="slide" mode="out-in">
      <div v-if="isAlliance" key="alliance" class="flex items-center space-x-4">
        <img src="~/assets/images/alliance-logo.png" alt="Alliance" title="Logo de l'Alliance" class="h-10">
        <div>Alliance</div>
      </div>
      <div v-else key="horde" class="flex items-center space-x-4">
        <img src="~/assets/images/horde-logo.png" alt="Horde" title="Logo de la Horde" class="h-10">
        <div>Horde</div>
      </div>
    </transition>
    <SwitchIcon class="h-5 ml-auto" />
  </button>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import SwitchIcon from '~/components/icons/SwitchIcon'

export default {
  components: {
    SwitchIcon
  },
  computed: {
    ...mapState(['faction']),
    ...mapGetters(['isAlliance'])
  },
  methods: {
    ...mapMutations(['toggleFaction'])
  }
}
</script>
