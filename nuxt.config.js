
export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Runtime config
  */
  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'https://sulfuron-guilds.web.app'
  },
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/animations.css',
    '~/assets/css/fonts.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: false,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://firebase.nuxtjs.org/
    '@nuxtjs/firebase'
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  /*
  ** Generate configuration
  ** See https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-generate
  */
  generate: {
    /*
     * Do not re-generate when changes happen in these files or folders
     */
    cache: {
      ignore: [
        'functions',
        '*.log'
      ]
    },
    /*
     * Do not generate page for these routes, as they will be handled by Firebase hosting
     */
    exclude: [
      '/auth/battlenet'
    ]
  },
  /*
  ** Firebase module configuration
  */
  firebase: {
    config: {
      apiKey: 'AIzaSyDgCfIFFy-5Lw8rQ-HF3M--T-oT270LdpE',
      authDomain: 'sulfuron-guilds.firebaseapp.com',
      databaseURL: 'https://sulfuron-guilds.firebaseio.com',
      projectId: 'sulfuron-guilds',
      storageBucket: 'sulfuron-guilds.appspot.com',
      messagingSenderId: '229682010576',
      appId: '1:229682010576:web:db892c4df7f3ba3b1281d5'
    },
    services: {
      auth: {
        initialize: {
          onAuthStateChangedMutation: 'account/onAuthStateChanged'
        }
      },
      firestore: {
        emulatorPort: process.env.NODE_ENV === 'development' ? 8080 : undefined
      }
    }
  }
}
