<template>
  <button class="flex items-center font-semibold text-left overflow-hidden w-40 text-lg" @click="toggleFaction">
    <transition name="slide" mode="out-in">
      <div v-if="isAlliance" key="alliance" class="flex items-center w-full">
        <img src="~/assets/images/alliance-logo.png" alt="Blason de l'Alliance" title="Alliance" class="h-10 mr-4">
        <div>Alliance</div>
        <SwitchIcon class="ml-auto" />
      </div>
      <div v-else key="horde" class="flex items-center w-full">
        <img src="~/assets/images/horde-logo.png" alt="Blason de la Horde" title="Horde" class="h-10 mr-4">
        <div>Horde</div>
        <SwitchIcon class="ml-auto" />
      </div>
    </transition>
  </button>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import SwitchIcon from '~/components/icons/solid/SwitchIcon.vue'

export default {
  components: {
    SwitchIcon
  },
  computed: {
    ...mapGetters(['isAlliance'])
  },
  methods: {
    ...mapMutations(['toggleFaction'])
  }
}
</script>
