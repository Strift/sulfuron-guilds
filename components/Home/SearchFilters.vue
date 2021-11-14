<template>
  <div>
    <div class="grid grid-flow-row grid-cols-2 gap-5 lg:grid-cols-9 sm:grid-cols-5">
      <SelectCard
        v-for="wowClass in classFilters"
        :key="wowClass.class"
        :selected="hasOneSpecChecked(wowClass)"
        :selected-border-class="getClassBorderColorClass(wowClass.class)"
        :header-class="getClassTextColorClass(wowClass.class)"
      >
        <template slot="header">
          {{ wowClass.name }}
        </template>
        <template slot="default">
          <div class="flex justify-between space-x-3">
            <label
              v-for="spec in wowClass.specs"
              :key="spec.value"
              :title="spec.name"
              class="flex flex-col space-y-2"
            >
              <SpecIcon
                :specialization-slug="specializationSlug(wowClass.class, spec.value)"
                :alt-text="`Icone ${wowClass.name} spéciliasation ${spec.name}`"
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
        </template>
      </selectcard>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'
import SpecIcon from '~/components/Ui/SpecIcon.vue'
import SelectCard from '~/components/Ui/SelectCard.vue'
import useGuildsStore from '~/composables/useGuildsStore'
import specializationSlug from '~/data/utils/specializationSlug'
import getClassTextColorClass from '~/data/utils/getClassTextColorClass'
import getClassBorderColorClass from '~/data/utils/getClassBorderColorClass'

export default defineComponent({
  components: {
    SpecIcon,
    SelectCard
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
