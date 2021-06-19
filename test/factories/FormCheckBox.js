import faker from 'faker'

export default function () {
  return {
    id: faker.lorem.word(),
    name: faker.lorem.words(2),
    checked: faker.datatype.boolean()
  }
}
