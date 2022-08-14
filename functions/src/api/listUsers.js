import firebase from '../services/firebase'

const PAGE_SIZE = 1000

export default async function (_data, _context) {
  let allUsers = []

  let { users, pageToken } = await firebase.auth().listUsers(PAGE_SIZE)
  do {
    allUsers = allUsers.concat(users.map(user => user.uid))
    if (pageToken) {
      ({ users, pageToken } = await firebase.auth().listUsers(PAGE_SIZE, pageToken))
    }
  } while (pageToken)

  return { users: allUsers }
}
