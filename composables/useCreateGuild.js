import { ref, useContext, useStore } from '@nuxtjs/composition-api'
import WOW_CLASSES from '~/data/classes.json'

const DAYS_OF_THE_WEEK = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

const newGuild = (ownerUid, name) => ({
  ownerUid,
  name,
  published: false,
  type: '',
  logoUrl: '',
  startHour: '',
  endHour: '',
  raidDays: DAYS_OF_THE_WEEK.map(day => ({ day, playing: false })),
  // TODO: create recruitment with new format
  recruitment: WOW_CLASSES.map(classObj => ({ class: classObj.value, open: false })),
  websiteUrl: '',
  contactUrl: ''
})

export default function useCreateGuild () {
  const { $fire } = useContext()
  const store = useStore()

  const createGuild = async (ownerUid, name) => {
    try {
      const guild = newGuild(ownerUid, name)
      await $fire.firestore.collection('guilds').add(guild)
      store.dispatch('admin/fetchGuilds')
    } catch (err) {
      // TODO: handle error
    }
  }

  return createGuild
}
