import faker from 'faker'

import WOW_CLASSES from '../classes.json'
import GUILD_TYPES from '../guildTypes.json'
import DAY_OF_THE_WEEK from '../daysOfTheWeek.json'

export default function (props) {
  return {
    name: faker.lorem.words(faker.datatype.number(4)),
    type: faker.random.arrayElement(GUILD_TYPES).value,
    description: faker.lorem.text(),
    raidDays: faker.random.arrayElements(DAY_OF_THE_WEEK, faker.datatype.number(7)),
    timeRange: faker.random.words(3),
    recruitment: faker.random.arrayElements(WOW_CLASSES, faker.datatype.number(9))
      .map(({ value, specs }) => ({
        class: value,
        specs: specs.map(spec => ({
          value: spec.value,
          open: faker.datatype.boolean()
        }))
      })),
    logoUrl: faker.image.imageUrl().replace('http://', 'https://'),
    websiteUrl: faker.internet.url(),
    contactUrl: faker.internet.url(),
    updatedAt: faker.date.recent(),
    ...props
  }
}
