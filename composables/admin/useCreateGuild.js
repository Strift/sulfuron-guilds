import WOW_CLASSES from '~/data/classes.json'
import guildSlug from '~/data/utils/guildSlug'
import useGuilds from '~/composables/database/useGuilds'

const DAYS_OF_THE_WEEK = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

const newGuild = (ownerUid, name) => ({
  ownerUid,
  name,
  slug: guildSlug(name),
  published: false,
  type: '',
  logoUrl: '',
  startHour: '',
  endHour: '',
  raidDays: DAYS_OF_THE_WEEK.map(day => ({ day, playing: false })),
  recruitment: WOW_CLASSES.map(({ value, specs }) => ({
    class: value,
    specs: specs.map(spec => ({
      value: spec.value,
      open: false
    }))
  })),
  websiteUrl: '',
  contactUrl: ''
})

export default function useCreateGuild () {
  const { create, fetch } = useGuilds()

  const createGuild = async (ownerUid, name) => {
    const guild = newGuild(ownerUid, name)
    await create(guild)
    fetch()
  }

  return {
    createGuild
  }
}
