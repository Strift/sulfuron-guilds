import { useContext } from '@nuxtjs/composition-api'
import firebase from 'firebase/app'

export default function useFirestore () {
  const context: any = useContext()
  return context.$fire.firestore as firebase.firestore.Firestore
}
