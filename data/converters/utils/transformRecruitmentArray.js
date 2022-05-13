import WOW_CLASSES from '../../classes.json'

export default function (recruitment) {
  let data = recruitment
  // Update from data format that doesn't handle specs to format that handles it
  if (recruitment[0].specs === undefined) {
    data = recruitment.map((recruitmentState) => {
      const { specs } = WOW_CLASSES.find(wowClass => wowClass.value === recruitmentState.class)
      return {
        class: recruitmentState.class,
        specs: specs.map(spec => ({ value: spec.value, open: recruitmentState.open }))
      }
    })
  }
  // Update for guilds created before the death knight joined the list of classes
  if (recruitment.length === 9) {
    const dkClass = WOW_CLASSES.find(wowClass => wowClass.value === 'death-knight')
    const dkRecruitmentStatus = {
      class: dkClass.value,
      specs: dkClass.specs.map(spec => ({ value: spec.value, open: false }))
    }

    data.splice(0, 0, dkRecruitmentStatus) // insert in first position
  }

  return data
}
