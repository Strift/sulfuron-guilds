import config from '../../config'
import { ampli } from './ampli'

const environment = config.amplitude.environment

ampli.load({ environment })

export default {
  battlenetAuthorized (userId: string) {
    ampli.identify(userId)
    ampli.battlenetAuthorized(userId)
  }
}
