const logger = require('../services/logger')
const firebase = require('../services/firebase')

const PAGE_SIZE = 1000

module.exports = async function (data, context) {
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
