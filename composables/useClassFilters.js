import sortBy from 'lodash/sortBy'
import { ref } from '@nuxtjs/composition-api'
import findClassIndex from '~/data/utils/findClassIndex'
import findSpecIndex from '~/data/utils/findSpecIndex'
import WOW_CLASSES from '~/data/classes.json'

export default function () {
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

  const isChecked = ({ classValue, specValue }) => {
    const classIndex = findClassIndex(filters.value, classValue)
    const specIndex = findSpecIndex(filters.value[classIndex].specs, specValue)
    return filters.value[classIndex].specs[specIndex].checked
  }

  return {
    filters,
    setFilter,
    isChecked
  }
}
