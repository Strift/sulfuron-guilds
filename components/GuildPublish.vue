<template>
  <div
    class="flex items-baseline justify-between"
  >
    <InformationCard>
      N'oubliez pas de cliquer sur publier une fois les informations de votre guilde renseignées.
    </InformationCard>
    <PrimaryButton @click="$emit('publish')">
      Publier
    </PrimaryButton>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import InformationCard from '~/components/ui/InformationCard.vue'
import PrimaryButton from '~/components/ui/PrimaryButton.vue'

export default defineComponent({
  components: {
    InformationCard,
    PrimaryButton
  }
})
</script>
