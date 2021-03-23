import faker from 'faker'

import WOW_CLASSES from '~/data/classes.json'
import GUILD_TYPES from '~/data/guildTypes.json'
import DAY_OF_THE_WEEK from '~/data/daysOfTheWeek.json'

export default function () {
  return {
    name: faker.lorem.words(faker.random.number(4)),
    type: faker.random.arrayElement(GUILD_TYPES).value,
    raidDays: faker.random.arrayElements(DAY_OF_THE_WEEK, faker.random.number(7)),
    timeRange: faker.random.words(3),
    recruitment: faker.random.arrayElements(WOW_CLASSES, faker.random.number(9))
      .map(({ value }) => value),
    logoUrl: faker.image.imageUrl(),
    websiteUrl: faker.internet.url(),
    contactUrl: faker.internet.url()
  }
}