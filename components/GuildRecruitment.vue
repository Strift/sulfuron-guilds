<template>
  <component
    :is="expandable ? 'button' : 'div'"
    class="w-full rounded group focus:outline-none"
    :class="{ 'hover:bg-gray-800': isOpen && expandable }"
    @click="expandable && $emit('click')"
  >
    <div class="flex justify-between mb-3 " :class="{ 'group-focus:text-blue-300': expandable }">
      <div class="font-semibold text-xs uppercase tracking-widest">
        Recrutement
      </div>
      <ChevronDownIcon
        v-if="isOpen && expandable"
        class="transform transition-transform duration-200"
        :class="{ 'rotate-180': expanded }"
      />
    </div>
    <div
      :class="{ 'flex space-x-2': !expanded, 'space-y-2': expanded }"
      class=""
    >
      <div v-if="!isOpen" class="text-gray-700">
        Clos
      </div>
      <div
        v-for="classRecruitment in openRecruitment"
        v-else
        :key="classRecruitment.class"
        class="flex space-x-2"
      >
        <ClassIcon
          :wow-class="classRecruitment.class"
          class="h-6 opacity-75"
        />
        <div v-show="expanded">
          <div v-if="allSpecsAreOpen(classRecruitment.specs)">
            Toutes spé.
          </div>
          <div v-else>
            {{ listOfOpenSpecsNames(classRecruitment.specs) }}
          </div>
        </div>
      </div>
    </div>
  </component>
</template>

<script>
import ClassIcon from '~/components/icons/ClassIcon.vue'
import ChevronDownIcon from '~/components/icons/ChevronDownIcon.vue'

import WOW_CLASSES from '~/data/classes.json'

const getSpecName = (classValue, specValue) => {
  const wowClass = WOW_CLASSES.find(wowClass => wowClass.value === classValue)
  const { name } = wowClass.specs.find(spec => spec.value === specValue)
  return name
}

export default {
  components: {
    ClassIcon,
    ChevronDownIcon
  },
  props: {
    recruitment: {
      type: Array,
      required: true
    },
    expanded: {
      type: Boolean,
      required: true
    },
    expandable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    openRecruitment () {
      return this.recruitment
        .filter((classRecruitment) => {
          const isOpen = classRecruitment.specs.some(({ open }) => open)
          return isOpen
        })
        .map((classRecruitment) => {
          return {
            class: classRecruitment.class,
            specs: classRecruitment.specs.map(spec => ({
              ...spec,
              name: getSpecName(classRecruitment.class, spec.value)
            }))
          }
        })
    },
    isOpen () {
      return this.openRecruitment.length > 0
    }
  },
  methods: {
    allSpecsAreOpen (specs) {
      return specs.every(({ open }) => open)
    },
    listOfOpenSpecsNames (specs) {
      return specs
        .filter(({ open }) => open)
        .map(({ name }) => name)
        .join(', ')
    }
  }
}
</script>

<style>

</style>
