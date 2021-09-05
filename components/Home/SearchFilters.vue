<template>
  <div>
    <div class="gap-5 grid grid-cols-2 grid-flow-row lg:grid-cols-9 sm:grid-cols-5">
      <div
        v-for="wowClass in classFilters"
        :key="wowClass.class"
        class="bg-gray-900 bg-opacity-75 border-t-4 px-5 py-4 rounded-b shadow"
        :class="hasOneSpecChecked(wowClass) ? getClassBorderColorClass(wowClass.class) : 'border-gray-900'"
      >
        <div class="mb-4" :class="[ getClassTextColorClass(wowClass.class) ]">
          {{ wowClass.name }}
        </div>
        <div class="flex justify-between space-x-3">
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
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import SpecializationIcon from '~/components/SpecializationIcon.vue'
import useGuildsStore from '~/composables/useGuildsStore'
import specializationSlug from '~/data/utils/specializationSlug'
import getClassTextColorClass from '~/data/utils/getClassTextColorClass'
import getClassBorderColorClass from '~/data/utils/getClassBorderColorClass'

export default defineComponent({
  components: {
    SpecializationIcon
  },
  setup () {
    const { classFilters, setClassFilter } = useGuildsStore()

    const hasOneSpecChecked = wowClass => wowClass.specs.some(({ checked }) => checked)

    return {
      classFilters,
      setClassFilter,
      hasOneSpecChecked,
      specializationSlug,
      getClassTextColorClass,
      getClassBorderColorClass
    }
  }
})
</script>
