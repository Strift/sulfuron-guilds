export default function findSpecIndex (specs, specValue) {
  return specs.findIndex(spec => spec.value === specValue)
}
