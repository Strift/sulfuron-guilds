import { Plugin } from '@nuxt/types'
import { ampli } from './ampli'

interface Analytics {
  signIn (userId: string): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $analytics(): Analytics
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $analytics(): Analytics
  }
}

const analyticsPlugin: Plugin = (_context, inject) => {
  const environment = process.env.NODE_ENV === 'production'
    ? 'production'
    : 'development'
  ampli.load({ environment })

  const analytics: Analytics = {
    signIn (userId: string) {
      ampli.identify(userId)
      ampli.signIn()
    }
  }

  inject('analytics', analytics)

  console.log('Analytics plugin installed')
}

export default analyticsPlugin
