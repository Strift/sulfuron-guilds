const session = require('express-session')

const { Firestore } = require('@google-cloud/firestore')
const { FirestoreStore } = require('@google-cloud/connect-firestore')

const middleware = session({
  store: new FirestoreStore({
    dataset: new Firestore(),
    kind: 'express-sessions'
  }),
  secret: 'my-secret',
  resave: false,
  saveUninitialized: true
})

module.exports = middleware
