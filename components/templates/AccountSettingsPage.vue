<template>
  <div class="space-y-10">
    <RegisterGuildCard />
    <Heading2>Battle.net</Heading2>
    <BattleNetCard />
    <DangerButton @click="$emit('logout')">
      Déconnexion
    </DangerButton>
  </div>
</template>

<script>
import Heading2 from '~/components/atoms/Heading2.vue'
import DangerButton from '~/components/atoms/buttons/DangerButton.vue'
import RegisterGuildCard from '~/components/organisms/Account/RegisterGuildCard.vue'
import BattleNetCard from '~/components/organisms/Account/BattleNetCard.vue'

export default {
  components: {
    Heading2,
    DangerButton,
    RegisterGuildCard,
    BattleNetCard
  }
}
</script>
