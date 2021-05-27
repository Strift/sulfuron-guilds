const isProduction = () => process.env.NODE_ENV === 'production'
const evalBool = (bool) => {
  if (bool === 'true') { return true } else if (bool === 'false') { return false }
  return bool
}

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
    baseURL: isProduction() ? 'https://guildes.sulfuron.eu' : process.env.BASE_URL,
    features: {
      ENABLE_PARTNERS: evalBool(process.env.FEATURES_ENABLE_PARTNERS)
    }
  },
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    htmlAttrs: {
      lang: 'fr'
    },
    titleTemplate: '%s - Sulfuron.eu',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Votre nouvelle plateforme dédiée au recrutement des guildes sur le serveur WoW Classic Sulfuron' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/base.css',
    '~/assets/css/utilities.css',
    '~/assets/css/animations.css',
    '~/assets/css/fonts.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/vue-cookies.client.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://sentry.nuxtjs.org/
    '@nuxtjs/sentry'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://firebase.nuxtjs.org/
    '@nuxtjs/firebase',
    // Doc: https://github.com/nuxt-community/robots-module
    '@nuxtjs/robots'
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    extend (config, { isDev, isClient }) {
      if (!isDev) {
        if (isClient) {
          config.devtool = '#source-map'
        }

        const SentryWebpackPlugin = require('@sentry/webpack-plugin')

        config.plugins.push(new SentryWebpackPlugin({
        // sentry-cli configuration
          authToken: process.env.SENTRY_AUTH_TOKEN,
          org: 'laurent-cazanove',
          project: 'laurent-cazanove',
          // release: process.env.SENTRY_RELEASE,
          // Sentry options are required
          include: ['.nuxt/dist/client'],
          ignore: [
            'node_modules',
            '.nuxt/dist/client/img'
          ],
          configFile: '.sentryclirc',
          config: {
            environment: process.env.ENVIRONMENT || 'development'
          }
        }))
      }
    },
    // Enabled to fix the following issue
    // https://github.com/nuxt/nuxt.js/issues/5800#issuecomment-549404405
    html: {
      minify: {
        collapseWhitespace: true
      }
    }
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
    ],
    fallback: '404.html'
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
          onAuthStateChangedAction: 'account/onFirebaseAuthStateChanged'
        }
      },
      firestore: {
        emulatorPort: (process.env.NODE_ENV === 'development' && process.env.FIREBASE_EMULATOR_FIRESTORE === 'true')
          ? 8080
          : undefined
      },
      functions: {
        emulatorPort: (process.env.NODE_ENV === 'development' && process.env.FIREBASE_EMULATOR_FUNCTIONS === 'true')
          ? 5001
          : undefined
      },
      analytics: {
        collectionEnabled: isProduction()
      }
    }
  },
  /*
  ** Sentry module configuration
  */
  sentry: {
    dsn: 'https://c641e9d80e684743befafefdbe54d3d9@o571625.ingest.sentry.io/5720079',
    disabled: !isProduction(),
    config: {}
  }
}
