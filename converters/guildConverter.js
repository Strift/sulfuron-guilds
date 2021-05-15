import transformRecruitmentArray from '~/converters/utils/transformRecruitmentArray.js'

export default {
  toFirestore (guild) {
    return guild
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      ...data,
      // Add `description` string for guilds that don't have it
      description: data.description || '',
      // Transform `recruitment` array for guilds with old data structure
      recruitment: transformRecruitmentArray(data.recruitment)

    }
  }
}
