<template>
  <div>
    <!-- <div v-show="user" class="flex space-x-4 items-center ">
      <BattleNetIcon class="h-8 w-8" />
      <div class="font-semibold">
        {{ username }}
      </div>
    </div>
    <LoginButton v-show="!user" class="shadow-lg" /> -->
  </div>
</template>

<script>
import LoginButton from '~/components/LoginButton.vue'
import BattleNetIcon from '~/components/icons/BattleNetIcon.vue'

export default {
  components: {
    BattleNetIcon,
    LoginButton
  }
}
</script>

<style>

</style>
