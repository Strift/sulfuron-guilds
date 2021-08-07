<template>
  <div
    class="flex items-baseline justify-between"
  >
    <BaseInformationCard>
      N'oubliez pas de cliquer sur publier une fois les informations de votre guilde renseignées.
    </BaseInformationCard>
    <PrimaryButton @click="$emit('publish')">
      Publier
    </PrimaryButton>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

import PrimaryButton from '~/components/ui/PrimaryButton.vue'

export default defineComponent({
  components: {
    PrimaryButton
  }
})
</script>
