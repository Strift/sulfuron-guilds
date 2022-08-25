import config from '../../config'
import logger from '../logger'
import { ampli } from './ampli'

const environment = config.amplitude.environment

logger.debug('Loading amplitude environment', environment)

ampli.load({ environment })

export default {
  battlenetAuthorized (userId: string) {
    ampli.identify(userId)
    ampli.battlenetAuthorized(userId)
  }
}
