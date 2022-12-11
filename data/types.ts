
type GuildType = 'Classique' | 'PvP' | 'Speedrun' | 'Beginners' | 'RP'

type FrenchWeekDay = 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche'

export interface Guild {
  id: string
  ownerUid: string
  name: string
  slug: string
  description: string
  published: boolean
  type: GuildType
  logoUrl: string
  startHour: string
  endHour: string
  raidDays: Array<{
    day: FrenchWeekDay
    playing: boolean
  }>
  recruitment: Array<{
    class: string
    specs: Array<{
      open: boolean
      value: string
    }>
  }>
  websiteUrl: string
  contactUrl: string
  updatedAt?: Date
}
