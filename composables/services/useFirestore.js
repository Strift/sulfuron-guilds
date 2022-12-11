import { useContext } from '@nuxtjs/composition-api'

export default function useFirestore () {
  const { $fire } = useContext()
  return $fire.firestore
}
