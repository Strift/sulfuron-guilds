export default {
  production: {
    apiKey: 'AIzaSyDgCfIFFy-5Lw8rQ-HF3M--T-oT270LdpE',
    authDomain: 'sulfuron-guilds.firebaseapp.com',
    databaseURL: 'https://sulfuron-guilds.firebaseio.com',
    projectId: process.env.FIREBASE_PROJECT_ID || 'sulfuron-guilds',
    storageBucket: 'sulfuron-guilds.appspot.com',
    messagingSenderId: '229682010576',
    appId: '1:229682010576:web:db892c4df7f3ba3b1281d5'
  },
  staging: {
    apiKey: 'AIzaSyA6JtdseEsctm9fmOkkSUg4VY3QHFbVglE',
    authDomain: 'sulfuron-guilds-staging.firebaseapp.com',
    projectId: 'sulfuron-guilds-staging',
    storageBucket: 'sulfuron-guilds-staging.appspot.com',
    messagingSenderId: '406027081529',
    appId: '1:406027081529:web:69a25de34dd3cd99787ae8'
  }
}
