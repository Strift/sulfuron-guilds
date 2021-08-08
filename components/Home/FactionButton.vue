<template>
  <button
    class="flex focus:outline-none focus:text-blue-300 font-semibold hover:text-blue-300 overflow-hidden text-2xl text-left"
    @click="toggleFaction"
  >
    <transition name="slide" mode="out-in">
      <div v-if="isAlliance" key="alliance" class="flex items-center space-x-4 w-full">
        <client-only>
          <nuxt-img
            src="/images/crest-alliance.png"
            alt="Blason de l'Alliance"
            title="Alliance"
            height="40"
            width="40"
          />
        </client-only>
        <div>Guildes de l'Alliance</div>
        <SwitchIcon />
      </div>
      <div v-else key="horde" class="flex items-center space-x-4 w-full">
        <client-only>
          <nuxt-img
            src="/images/crest-horde.png"
            alt="Blason de la Horde"
            title="Horde"
            height="40"
            width="40"
          />
        </client-only>
        <div>Guildes de la Horde</div>
        <SwitchIcon />
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
