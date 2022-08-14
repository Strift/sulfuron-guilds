import session from 'express-session'
import { Firestore } from '@google-cloud/firestore'
import { FirestoreStore } from '@google-cloud/connect-firestore'

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
