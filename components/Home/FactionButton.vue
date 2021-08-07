<template>
  <button
    class="flex focus:outline-none focus:text-blue-300 font-semibold hover:text-blue-300 items-center overflow-hidden text-left text-lg w-40"
    @click="toggleFaction"
  >
    <transition name="slide" mode="out-in">
      <div v-if="isAlliance" key="alliance" class="flex items-center w-full">
        <nuxt-img
          src="/images/alliance-logo.png"
          alt="Blason de l'Alliance"
          title="Alliance"
          class="mr-4"
          height="40"
          width="40"
        />
        <div>Alliance</div>
        <SwitchIcon class="ml-auto" />
      </div>
      <div v-else key="horde" class="flex items-center w-full">
        <nuxt-img
          src="/images/horde-logo.png"
          alt="Blason de la Horde"
          title="Horde"
          class="mr-4"
          height="40"
          width="40"
        />
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
