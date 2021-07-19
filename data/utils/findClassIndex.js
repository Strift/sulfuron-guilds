export default function findClassIndex (classes, classValue) {
  return classes.findIndex(wowClass => wowClass.class === classValue)
}
