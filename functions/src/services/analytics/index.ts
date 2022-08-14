import { ampli } from './ampli'

const environment = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'development'

ampli.load({ environment })

export default {
  battlenetAuthorized (userId: string) {
    ampli.identify(userId)
    ampli.battlenetAuthorized(userId)
  }
}
