import { Plugin } from '@nuxt/types'
import { ampli } from './ampli'

interface Analytics {
  signIn (userId: string): void
}

declare module 'vue/types/vue' {
  interface Vue {
    $analytics: Analytics
  }
}

declare module 'vuex/types/index' {
  /* eslint-disable-next-line */
  interface Store<S> {
    $analytics: Analytics
  }
}

const analyticsPlugin: Plugin = ({ $config: { amplitudeEnvironment } }, inject) => {
  const environment = amplitudeEnvironment
  ampli.load({ environment })

  const analytics = {
    signIn (userId: string) {
      ampli.identify(userId)
      ampli.signIn()
    },
    updateAdmin (userId: string, isAdmin: boolean) {
      ampli.identify(userId, {
        isAdmin
      })
    },
    updateGuild (userId: string, guildName: string) {
      ampli.identify(userId, {
        ownedGuildName: guildName
      })
    }
  }
  inject('analytics', analytics)
}

export default analyticsPlugin
