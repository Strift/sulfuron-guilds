import transformRecruitmentArray from './utils/transformRecruitmentArray.js'

export default {
  toFirestore (guild) {
    return guild
  },
  fromFirestore (snapshot, options) {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      ...data,
      updatedAt: data.updatedAt ? data.updatedAt.toDate() : undefined,
      // Add `description` string for guilds that don't have it
      description: data.description || '',
      // Transform `recruitment` array for guilds with old data structure
      recruitment: transformRecruitmentArray(data.recruitment)
    }
  }
}
