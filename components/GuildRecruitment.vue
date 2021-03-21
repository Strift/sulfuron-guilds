<template>
  <button
    class="w-full p-3 rounded hover:bg-gray-800 group focus:outline-none"
    @click="$emit('click')"
  >
    <div class="flex justify-between mb-3 text-gray-600 group-focus:text-blue-300">
      <div class="font-semibold text-xs uppercase tracking-widest">
        Recrutement
      </div>
      <ChevronDownIcon
        class="transform transition-transform duration-200"
        :class="{ 'rotate-180': expanded }"
      />
    </div>
    <div
      :class="{ 'flex space-x-2': !expanded, 'space-y-2': expanded }"
      class="text-gray-600"
    >
      <div
        v-for="classRecruitment in openRecruitment"
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
  </button>
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
