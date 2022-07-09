<template>
  <div>
    <div class="flex items-center space-x-2 text-gray-600">
      <SortAscendingIcon />
      <div class="flex items-baseline">
        <span>Guildes triées par</span>
        <select
          v-model="sortingOrder"
          class="bg-transparent focus:text-blue-400 hover:text-blue-400 outline-none pr-1 text-blue-300"
        >
          <option :value="SortingType.ALPHABETICAL" class="bg-gray-300 text-gray-900">
            ordre alphabétique
          </option>
          <option :value="SortingType.CHRONOLOGICAL" class="bg-gray-300 text-gray-900">
            date de mise-à-jour
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { SortingType } from '~/store/search'
import SortAscendingIcon from '~/components/atoms/icons/solid/SortAscendingIcon.vue'
import useSearchStore from '~/composables/useSearchStore'

export default defineComponent({
  components: { SortAscendingIcon },
  setup () {
    const { sorting, setSorting } = useSearchStore()

    const sortingOrder = computed({
      get: () => sorting.value,
      set: val => setSorting(val)
    })
    return {
      SortingType,
      sortingOrder
    }
  }
})
</script>
