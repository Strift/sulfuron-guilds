import git from 'git-rev-sync'
import guildConverter from './data/converters/guildConverter'
import firebaseConfig from './firebaseConfig'

const evalBool = (bool) => {
  if (bool === 'true') { return true } else if (bool === 'false') { return false }
  return bool
}
const isProduction = () => process.env.NODE_ENV === 'production'
const getHostname = () => isProduction() ? 'https://guildes.sulfuron.eu' : process.env.BASE_URL

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
    baseURL: getHostname(),
    features: {
      ENABLE_PARTNERS: evalBool(process.env.FEATURES_ENABLE_PARTNERS)
    }
  },
  /*
  ** Components config
  */
  components: true,
  /*
  ** Router config
  */
  router: {
    trailingSlash: true
  },
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
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
    '@nuxtjs/sentry',
    // Doc: https://image.nuxtjs.org/
    '@nuxt/image'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api/module',
    // Doc: https://firebase.nuxtjs.org/
    '@nuxtjs/firebase',
    // Doc: https://github.com/nuxt-community/robots-module
    '@nuxtjs/robots',
    // Doc: https://www.npmjs.com/package/nuxt-lazy-load
    ['nuxt-lazy-load', {
      directiveOnly: true
    }],
    // Doc: https://sitemap.nuxtjs.org/
    '@nuxtjs/sitemap'
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
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
    // async routes () {
    //   try {
    //     const { default: firebase } = await import('firebase/app')

    //     await import('firebase/firestore')
    //     if (!firebase.apps.length) {
    //       firebase.initializeApp(firebaseConfig)
    //     }
    //     const firestore = firebase.firestore()

    //     const querySnapshot = await firestore
    //       .collection('guilds')
    //       .withConverter(guildConverter)
    //       .where('published', '==', true)
    //       .get()

    //     return querySnapshot.docs.map((doc) => {
    //       const guild = doc.data()
    //       return {
    //         route: `/g/${guild.slug}/`,
    //         payload: guild
    //       }
    //     })
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },
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
    config: firebaseConfig,
    services: {
      auth: {
        emulatorPort: (process.env.NODE_ENV === 'development' && process.env.FIREBASE_EMULATOR_AUTH === 'true')
          ? 8080
          : undefined,
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
    },
    terminateDatabasesAfterGenerate: true
  },
  /*
  ** Sentry module configuration
  */
  sentry: {
    disabled: !isProduction(),
    dsn: 'https://c641e9d80e684743befafefdbe54d3d9@o571625.ingest.sentry.io/5720079',
    publishRelease: true,
    sourceMapStyle: 'hidden-source-map',
    tracing: true,
    config: {
      release: git.long(), // GIT_COMMIT_SHA
      environment: process.env.ENVIRONMENT || 'development'
    },
    // Options passed to @sentry/webpack-plugin.
    // Docs: https://github.com/getsentry/sentry-webpack-plugin/blob/master/README.md
    webpackConfig: {
      // Sentry CLI options
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'strift',
      project: 'sulfuron-guilds',
      // Sentry options
      include: ['.nuxt/dist/client'],
      ignore: [
        'node_modules',
        '.nuxt/dist/client/img'
      ]
    }
  },
  /*
  ** Site map
  */
  sitemap: {
    hostname: getHostname(),
    trailingSlash: true
  },
  /*
  ** Nuxt images
  */
  image: {
  },
  /*
  ** Storybook
  */
  storybook: {
    stories: [
      '~/stories/**/*.stories.js'
    ],
    parameters: {
      backgrounds: {
        default: 'gray-900',
        values: [
          { name: 'gray-900', value: '#1a202c' }
        ]
      }
    }
  }
}
