import { computed, ref } from '@nuxtjs/composition-api'
import WOW_CLASSES from '~/data/classes.json'
import guildSlug from '~/data/utils/guildSlug'
import useGuilds from '~/composables/database/useGuilds'

const DAYS_OF_THE_WEEK = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

const guildData = (ownerUid, name, slug) => ({
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
  const { create, findBySlug } = useGuilds()
  const name = ref('')
  const ownerUid = ref('')
  const slug = computed(() => guildSlug(name.value))

  const createGuild = async () => {
    const guildWithSameSlug = await findBySlug(slug.value)
    if (guildWithSameSlug) {
      alert(`Impossible de créer la guilde <${name.value}> car l'URL '${slug.value}' est déjà utilisée par <${guildWithSameSlug.name}.>`)
      return null
    }
    const guild = guildData(ownerUid.value, name.value, slug.value)
    const guildId = await create(guild)
    return guildId
  }

  return {
    name,
    ownerUid,
    createGuild
  }
}
