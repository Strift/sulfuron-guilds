import { useNuxtApp } from '#app'

export default function useFirestore () {
  const { $fire } = useNuxtApp()
  return $fire.firestore
}
