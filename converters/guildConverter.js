import transformRecruitmentArray from '~/converters/utils/transformRecruitmentArray.js'

export default {
  toFirestore (guild) {
    return guild
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return {
      ...data,
      recruitment: transformRecruitmentArray(data.recruitment)
    }
  }
}
