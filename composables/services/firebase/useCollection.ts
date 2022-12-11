import firebase from 'firebase/app'
import useFirestore from './useFirestore'

type QueryOrCollectionReference = firebase.firestore.CollectionReference | firebase.firestore.Query

interface ListOptions {
  whereEquals?: Record<string, any>
  subCollections?: Array<string>
}

export default function useCollection<Type extends firebase.firestore.DocumentData> (
  collectionPath: string,
  options?: { converter: firebase.firestore.FirestoreDataConverter<Type> }
) {
  const firestore = useFirestore()

  // Collection & query with converter
  const collection = firestore.collection(collectionPath)
  const collectionQuery: QueryOrCollectionReference = options?.converter
    ? collection.withConverter(options.converter)
    : collection

  const add = async (document: Type): Promise<string> => {
    const documentRef = await collection.add(document)
    return documentRef.id
  }

  const list = async (options: ListOptions): Promise<Type[]> => {
    const query = options.whereEquals
      ? Object.entries(options.whereEquals)
        .reduce(
          (query, [key, value]) => query.where(key, '==', value),
          collectionQuery
        )
      : collectionQuery

    const documentsSnapshot = await query.get()

    if (options.subCollections === undefined) {
      return documentsSnapshot.docs.map(document => document.data() as Type)
    }

    return Promise.all(documentsSnapshot.docs.map(async (document) => {
      const subCollectionsData: Record<string, any> = {}

      for (const subCollectionPath of options.subCollections) {
        const subCollectionSnapshot = await document.ref.collection(subCollectionPath).get()
        subCollectionsData[subCollectionPath] = subCollectionSnapshot.docs.map(subDocument => subDocument.data())
      }

      return {
        ...subCollectionsData,
        ...document.data()
      } as Type
    }))
  }

  const findBy = async (key: string, value: any) => {
    const documentSnapshot = await collectionQuery
      .where(key, '==', value)
      .get()
    return documentSnapshot.empty
      ? null
      : documentSnapshot.docs[0].data()
  }

  const updateBy = async (key: string, value: any, payload: Partial<Type>) => {
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
