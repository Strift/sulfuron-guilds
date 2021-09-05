import WOW_CLASSES from '~/data/classes.json'

export default function (classValue, specValue) {
  const wowClass = WOW_CLASSES.find(wowClass => wowClass.value === classValue)
  const { name } = wowClass.specs.find(spec => spec.value === specValue)
  return name
}
