import firebase from 'firebase/app'
import transformRecruitmentArray from './utils/transformRecruitmentArray.js'
import { Guild } from '~/data/types'

const converter: firebase.firestore.FirestoreDataConverter<Guild> = {
  toFirestore (guild: Guild) {
    return guild
  },
  fromFirestore (snapshot, options): Guild {
    const data = snapshot.data(options)
    return {
      id: snapshot.id,
      ...data,
      updatedAt: data.updatedAt ? data.updatedAt.toDate() : undefined,
      // Add `description` string for guilds that don't have it
      description: data.description || '',
      // Transform `recruitment` array for guilds with old data structure
      recruitment: transformRecruitmentArray(data.recruitment)
    } as Guild
  }
}

export default converter
