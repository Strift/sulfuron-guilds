<script>
import { mapGetters } from 'vuex'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  computed: {
    ...mapGetters('account', ['username'])
  }
})
</script>

<template>
  <div class="flex shadow-md">
    <div class="bg-gray-900 flex h-20 items-center rounded-l w-20">
      <BattleNetIcon class="h-10" />
    </div>
    <div class="bg-gray-300 flex flex-grow items-center p-6 rounded-r text-gray-800">
      <div>
        Connecté en tant que <span class="font-semibold">{{ username }}</span>.
      </div>
    </div>
  </div>
</template>
