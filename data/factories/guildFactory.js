import faker from 'faker'

import WOW_CLASSES from '../classes.json'
import GUILD_TYPES from '../guildTypes.json'
import DAYS_OF_THE_WEEK from '../daysOfTheWeek.json'
import guildSlug from '../utils/guildSlug'

const timeFormattingOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
  timeZone: 'Europe/Paris'
}

export default function (props) {
  const name = faker.unique(faker.company.companyName)
  const begin = faker.datatype.datetime()
  const end = faker.datatype.datetime()
  return {
    name,
    slug: guildSlug(name),
    faction: faker.random.arrayElement(['Alliance', 'Horde']),
    type: faker.random.arrayElement(GUILD_TYPES).value,
    description: faker.lorem.text(),
    raidDays: DAYS_OF_THE_WEEK.map(day => ({
      day,
      playing: faker.datatype.boolean()
    })),
    startHour: begin.toLocaleTimeString('fr-FR', timeFormattingOptions),
    endHour: end.toLocaleTimeString('fr-FR', timeFormattingOptions),
    recruitment: WOW_CLASSES.map(({ value, specs }) => ({
      class: value,
      specs: specs.map(spec => ({
        value: spec.value,
        open: faker.datatype.boolean()
      }))
    })),
    logoUrl: faker.image.imageUrl(100, 100).replace('http://', 'https://'),
    websiteUrl: faker.internet.url(),
    contactUrl: faker.internet.url(),
    updatedAt: faker.date.recent(),
    published: false,
    ...props
  }
}
