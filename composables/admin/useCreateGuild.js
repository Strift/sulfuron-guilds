import WOW_CLASSES from '~/data/classes.json'
import guildSlug from '~/data/utils/guildSlug'
import useGuilds from '~/composables/database/useGuilds'

const DAYS_OF_THE_WEEK = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

const newGuild = (ownerUid, name, slug) => ({
  ownerUid,
  name,
  slug,
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
  const { create, fetch, list } = useGuilds()

  const createGuild = async (ownerUid, name) => {
    const slug = guildSlug(name)
    if (list.value.some(guild => guild.slug === slug)) {
      alert(`Impossible de créer la guilde <${name}> car l'URL '${slug}' est déjà utilisé.`)
      return
    }
    const guild = newGuild(ownerUid, name, slug)
    await create(guild)
    fetch()
  }

  return {
    createGuild
  }
}
