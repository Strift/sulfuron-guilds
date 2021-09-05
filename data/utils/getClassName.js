import classes from '~/data/classes.json'

export default function getClassName (classValue) {
  const { name } = classes.find(({ value }) => value === classValue)
  return name
}
