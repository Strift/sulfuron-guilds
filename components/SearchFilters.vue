<template>
  <div class="flex flex-row flex-wrap justify-between">
    <div
      v-for="wowClass in classFilters"
      :key="wowClass.class"
      class="bg-gray-900 bg-opacity-75 border-t-4 px-5 py-4 rounded-b shadow"
      :class="`border-${wowClass.class}`"
    >
      <div class="mb-4" :class="`text-${wowClass.class}`">
        {{ wowClass.name }}
      </div>
      <div class="flex space-x-3">
        <label
          v-for="spec in wowClass.specs"
          :key="spec.value"
          :title="spec.name"
          class="flex flex-col space-y-2"
        >
          <SpecializationIcon
            :class-value="wowClass.class"
            :spec-value="spec.value"
            :alt="`Icone ${wowClass.name} spéciliasation ${spec.name}`"
            :title="spec.name"
            :grayscale="!spec.checked"
            height="20"
            width="20"
          />
          <input
            :id="specializationSlug(wowClass.class, spec.value)"
            :checked="spec.checked"
            :name="spec.name"
            type="checkbox"
            class="mx-auto"
            @change="setClassFilter({ classValue: wowClass.class, specValue: spec.value }, $event.target.checked)"
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import SpecializationIcon from '~/components/ui/SpecializationIcon.vue'
import ActiveClassFiltersList from '~/components/ActiveClassFiltersList.vue'
import ChevronDownIcon from '~/components/icons/solid/ChevronDownIcon.vue'
import useGuildsStore from '~/composables/useGuildsStore'
import specializationSlug from '~/data/utils/specializationSlug'

export default defineComponent({
  components: {
    SpecializationIcon,
    ActiveClassFiltersList,
    ChevronDownIcon
  },
  setup () {
    const { classFilters, setClassFilter } = useGuildsStore()
    return {
      classFilters,
      setClassFilter,
      specializationSlug
    }
  }
})
</script>
