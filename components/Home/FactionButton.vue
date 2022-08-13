<template>
  <button
    class="flex overflow-hidden text-2xl font-semibold text-left focus:outline-none focus:text-blue-300 hover:text-blue-300"
    @click="toggleFaction"
  >
    <transition name="slide" mode="out-in">
      <div v-if="isAlliance" key="alliance" class="flex items-center w-full space-x-4">
        <nuxt-img
          src="/images/crest-alliance.png"
          alt="Blason de l'Alliance"
          title="Alliance"
          height="40"
          width="40"
        />
        <div>Guildes de l'Alliance</div>
        <SwitchIcon />
      </div>
      <div v-else key="horde" class="flex items-center w-full space-x-4">
        <nuxt-img
          src="/images/crest-horde.png"
          alt="Blason de la Horde"
          title="Horde"
          height="40"
          width="40"
        />
        <div>Guildes de la Horde</div>
        <SwitchIcon />
      </div>
    </transition>
  </button>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import SwitchIcon from '~/components/atoms/icons/solid/SwitchIcon.vue'

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
