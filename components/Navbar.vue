<template>
  <div class="flex items-center">
    <img src="~/assets/images/logo.png" alt="sulfuron.eu" class="h-12">
    <!-- <div class="text-4xl ml-6 text-white">
      Guildes
    </div> -->
    <div class="ml-auto text-gray-200 flex space-x-20">
      <button class="flex items-center space-x-4">
        <img src="~/assets/images/horde-logo.png" alt="Horde" class="h-10">
        <div class="font-semibold">
          Horde
        </div>
        <ExpandIcon class="h-5" />
      </button>
      <button class="flex py-2 px-4 border space-x-4" style="background-color: #005c99; border-color: #0e86ca">
        <BattleNetIcon class="h-8 w-8" />
        <div class="text-gray-200 my-auto">
          Connexion
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import ExpandIcon from '~/components/ExpandIcon'
import BattleNetIcon from '~/components/BattleNetIcon'

export default {
  components: {
    ExpandIcon,
    BattleNetIcon
  }
}
</script>

<style>

</style>
