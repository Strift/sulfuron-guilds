<template>
  <InformationCard
    v-if="!isAGuildOwner"
  >
    <div class="flex font-semibold mb-4 space-x-4">
      <div>ℹ️</div>
      <div>
        Comment enregistrer ma guilde ?
      </div>
    </div>
    <p class="mb-2">
      Pour activer votre page de guilde, effectuez une demande auprès des <span class="font-semibold">modérateurs du Discord Sulfuron</span> en fournissant votre :
    </p>
    <ul class="list-disc list-inside space-y-1">
      <li>BattleTag&trade; <em>(avec les majuscules, si nécessaire)</em></li>
      <li>Nom de guilde</li>
    </ul>
  </InformationCard>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineComponent } from '@vue/composition-api'
import InformationCard from '~/components/atoms/InformationCard.vue'

export default defineComponent({
  components: {
    InformationCard
  },
  computed: {
    ...mapGetters('account', ['isAGuildOwner'])
  }
})
</script>
