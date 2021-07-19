import sortBy from 'lodash/sortBy'
import { ref } from '@nuxtjs/composition-api'
import WOW_CLASSES from '~/data/classes.json'

export default function () {
  const findClassIndex = (classes, classValue) => classes.findIndex(wowClass => wowClass.class === classValue)
  const findSpecIndex = (specs, specValue) => specs.findIndex(spec => spec.value === specValue)

  const filters = ref(
    sortBy(WOW_CLASSES, 'name')
      .map(wowClass => ({
        class: wowClass.value,
        specs: wowClass.specs.map(spec => ({ ...spec, checked: false }))
      }))
  )
  const setFilter = ({ classValue, specValue }, enabled) => {
    const classIndex = findClassIndex(filters.value, classValue)
    const specIndex = findSpecIndex(filters.value[classIndex].specs, specValue)
    filters.value[classIndex].specs[specIndex].checked = enabled
  }

  return {
    filters,
    setFilter
  }
}
