import firebase from 'firebase/app'
import useFirestore from './useFirestore'

type QueryOrCollectionReference = firebase.firestore.CollectionReference | firebase.firestore.Query

export default function useCollection<T extends firebase.firestore.DocumentData> (
  collectionPath: string,
  options?: { converter: firebase.firestore.FirestoreDataConverter<T> }
) {
  const firestore = useFirestore()

  // Collection & query with converter
  const collection = firestore.collection(collectionPath)
  const collectionQuery: QueryOrCollectionReference = options?.converter
    ? collection.withConverter(options.converter)
    : collection

  const add = (document: T) => {
    return collection.add(document)
  }

  const list = async (whereEquals: Record<string, any> = {}) => {
    const query =
      Object.entries(whereEquals)
        .reduce(
          (query, [key, value]) => query.where(key, '==', value),
          collectionQuery
        )

    const documentsSnapshot = await query.get()
    return documentsSnapshot.docs.map(document => document.data())
  }

  const findBy = async (key: string, value: any) => {
    const documentSnapshot = await collectionQuery
      .where(key, '==', value)
      .get()
    return documentSnapshot.empty
      ? null
      : documentSnapshot.docs[0].data()
  }

  const updateBy = async (key: string, value: any, payload: Partial<T>) => {
    const documentSnapshot = await collectionQuery
      .where(key, '==', value)
      .get()

    if (documentSnapshot.empty) {
      throw new Error(`No document found in ${collectionPath} where ${key} == ${value}`)
    }
    return documentSnapshot.docs[0].ref.update(payload)
  }

  const deleteById = (id: string) => {
    const documentRef = collection.doc(id)
    return documentRef.delete()
  }

  return {
    add,
    list,
    findBy,
    updateBy,
    deleteById
  }
}
