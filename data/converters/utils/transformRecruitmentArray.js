import WOW_CLASSES from '../../classes.json'

export default function (recruitment) {
  // Update from data format that doesn't handle specs to format that handles it
  if (recruitment[0].specs === undefined) {
    return recruitment.map((recruitmentState) => {
      const { specs } = WOW_CLASSES.find(wowClass => wowClass.value === recruitmentState.class)
      return {
        class: recruitmentState.class,
        specs: specs.map(spec => ({ value: spec.value, open: recruitmentState.open }))
      }
    })
  }
  return recruitment
}
